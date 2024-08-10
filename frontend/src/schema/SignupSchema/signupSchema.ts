import {z} from 'zod';

export const SignupSchema = z.object({
    name: z.string().min(2, "Name must be At Least 2 Characters"),
    email: z.string().email(),
    password: z.string().min(6, 'Password Must be At Least 6 Characters')
});