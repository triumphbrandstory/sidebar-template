import { z } from "zod";
export const signUpFormSchema = z
  .object({
    name: z.string().min(3, "Names (for validation purposes) must be at least 3 characters").max(50, "Names may have up to 50 characters"),
    email: z.string().email(),
    password: z.string().min(6, "Passwords should have at least 6 characters"),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, { message: "Passwords should be identical", path: ["repeatPassword"] });

export type TSignUpFormSchema = z.infer<typeof signUpFormSchema>;

export const SignUpDbSchema = z.object({
  name: z.string().min(3, "Names (for validation purposes) must be at least 3 characters").max(50, "Names may have up to 50 characters"),
  email: z.string().email(),
  hashedPassword: z.string(),
});
