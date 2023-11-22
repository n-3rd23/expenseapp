import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import { validator } from "../../middleware/validation.middleware";
import {
  addExpense,
  deleteExpense,
  getExpenseSummary,
  getExpenses,
} from "../../controller/expenses";
import {
  addExpenseValidator,
  deleteExpenseValidator,
} from "../../validator/expenses/expenses.validatory";

export const router = Router();

router
  .route("/")
  .post(authMiddleware, addExpenseValidator, validator, addExpense);

router.route("/").get(authMiddleware, getExpenses);

router.route("/summary").get(authMiddleware, getExpenseSummary);

router
  .route("/:expenseId")
  .delete(authMiddleware, deleteExpenseValidator, validator, deleteExpense);
