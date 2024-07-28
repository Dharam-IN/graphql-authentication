import { z } from 'zod';

export const SignUpSchema = z.object({
    name: z.string().min(3, "Please Enter Full Name"),
    email: z.string().email(),
    password: z.string().min(6, "Password Must be At Least 6 Characters"),
    phoneNumber: z.string()
        .length(10, "Please Enter a Valid 10-Digit Mobile Number")
        .regex(/^\d+$/, "Phone Number must only contain digits")
});
