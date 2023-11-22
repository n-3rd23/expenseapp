import { z } from "zod";

export const addExpenseSchema = z.object({
  expenseCategory: z
    .string({
      invalid_type_error: "invalid type",
      required_error: "expense type is required",
    })
    .min(1, "expense type is required"),
  expense: z
    .string({
      required_error: "expense is required",
    })
    .min(1, "expense is required"),
  date: z
    .string({
      required_error: "date is required",
      invalid_type_error: "invalid date",
    })
    .min(1, "date is required")
    .transform((str) => {
      console.log("STR : ", str);
      return new Date(str);
    }),
  amount: z
    .number({
      invalid_type_error: "invalid number",
      required_error: "amount is required",
    })
    .transform((value) => parseFloat(value.toString())),
});

export type TAddExpense = z.infer<typeof addExpenseSchema>;
