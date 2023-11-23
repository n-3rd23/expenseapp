import { body, param } from "express-validator";
import { EXPENSE_CATEGORIES } from "../../constants/expense-category.constants";
import { query } from "express";

export const addExpenseValidator = [
  body("expense_category").notEmpty().isString().isIn(EXPENSE_CATEGORIES),
  body("expense").isString(),
  body("date").isString(),
  body("amount").isNumeric().notEmpty(),
];

export const deleteExpenseValidator = [
  param("expenseId").notEmpty().isString(),
];
