"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from 'axios';

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast"
import { SignupSchema } from "@/schema/SignupSchema/signupSchema"
import Link from "next/link";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function SignupPage() {
    const { toast } = useToast()

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof SignupSchema>>({
        resolver: zodResolver(SignupSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
        }
    });

    const { reset } = form;

    const onSubmit = async (data: z.infer<typeof SignupSchema>) => {
        setLoading(true)
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, data);
            console.log("response", response);
            reset();
            toast({
                title: "Success!",
                description: response.data.message
            })
        } catch (error: any) {
            if (error.response) {
                toast({
                    title: `Error Code ${error.response.status}`,
                    description: error.response.data.message || "Something went wrong",
                    variant: "destructive"
                })
            } else if (error.request) {
                toast({
                    title: "Error",
                    description: "No response received from the server.",
                    variant: "destructive"
                })
            } else {
                toast({
                    title: "Error",
                    description: error.message || "Something went wrong",
                    variant: "destructive"
                })
            }

        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold text-center mb-6">Sign Up</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="name">Full Name</FormLabel>
                                    <FormControl>
                                        <Input id="name" placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <FormControl>
                                        <Input id="email" type="email" placeholder="example@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel htmlFor="password">Password</FormLabel>
                                    <FormControl>
                                        <Input id="password" type="password" placeholder="••••••••" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <p>have an account <Link href={"/signin"} className="text-blue-500 underline">Login</Link></p>
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? (<><AiOutlineLoading3Quarters className="animate-spin" /> <span className="pl-3">Wait</span> </>) : "Sign Up"}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}