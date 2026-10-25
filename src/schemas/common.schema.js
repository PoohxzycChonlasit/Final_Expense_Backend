import z from "zod";

export const intIdSchema = z.object({
  id: z.coerce
    .number("Id must be a number")
    .int("Id must be an integer")
    .positive("Id must be a positive value"),
});

export const queryStringSchema = z.object({
  search: z.string().optional(),
  page: z.coerce
    .number("Page must be a number")
    .int("Page must be an integer")
    .positive("Id must be a positive value")
    .optional(),
  limit: z.coerce
    .number("Limit must be a number")
    .int("Limit must be an integer")
    .positive("Limit must be a positive value")
    .optional(),
  type: z.enum(["INCOME", "EXPENSE"]).optional(),
});
