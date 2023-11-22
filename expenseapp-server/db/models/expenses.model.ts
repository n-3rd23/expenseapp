import { Schema, model, now } from "mongoose";
import { EXPENSE_CATEGORIES } from "../../constants/expense-category.constants";

const expenseSchema = new Schema({
  expense_category: { type: String, enum: EXPENSE_CATEGORIES, require: true },
  expense: { type: String, require: true },
  date: { type: Date, require: true, default: now },
  amount: { type: Number, require: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", require: true },
});

expenseSchema.set("toJSON", {
  virtuals: true,
});

export const ExpenseModel = model("Expense", expenseSchema);
