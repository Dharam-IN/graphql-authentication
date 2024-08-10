"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {useRouter} from 'next/navigation';
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { axiosInstance } from "@/axios/axiosInstance";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const router = useRouter();

  const handleLogin = () => {
    router.push("/signin")
  };

  const handleSignup = () => {
    router.push("/signup")
  };

  const handleLogout = async () => {
    console.log("Logout");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-2xl font-semibold mb-4">Hello From Home Page</h1>
      <div className="space-x-4">
        {!isLoggedIn ? (
          <>
            <Button onClick={handleLogin} className="px-4 py-2 bg-blue-500 text-white rounded">Login</Button>
            <Button onClick={handleSignup} className="px-4 py-2 bg-green-500 text-white rounded">Sign Up</Button>
          </>
        ) : (
          <Button onClick={handleLogout} className="px-4 py-2 bg-red-500 text-white rounded">Logout</Button>
        )}
      </div>
    </div>
  );
}