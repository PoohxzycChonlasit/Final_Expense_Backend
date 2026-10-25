import z from "zod";

const passwordSchema = z
  .string("Password must be a string")
  .regex(
    /^[0-9a-zA-Z]{6,}$/,
    "Password must have at least 6 characters and contain only letter and number",
  );

export const registerSchema = z.object({
  email: z.email(),
  password: passwordSchema,
  name: z.string().optional().nullable(),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z
    .string("Password must be a string")
    .min(1, "Password is required"),
});
