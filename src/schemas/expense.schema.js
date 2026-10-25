import z from "zod";

export const createExpenseSchema = z.object({
  title: z.string("Title must be a string").trim().min(1, "Title is required"),
  amount: z.coerce
    .number("Amount must be a number")
    .positive("Amount must be a positive value"),
  type: z.enum(["INCOME", "EXPENSE"]),
  transactionDate: z.iso.date("Invalid ISO date format"),
  note: z.string().optional().nullable(),
});

export const updateExpenseSchema = createExpenseSchema.partial();
