import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../../util/ErrorResponse";
import { ExpenseModel } from "../../db/models/expenses.model";
import mongoose from "mongoose";

export const addExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { expense_category, expense, date, amount } = req.body;
    const newExpense = new ExpenseModel({
      amount,
      date: new Date(date),
      expense,
      expense_category,
      createdBy: req.user.id,
    });
    const createdExpense = await newExpense.save();
    return res.status(201).json({
      data: createdExpense,
    });
  } catch (err: any) {
    console.log("Error while adding expense : ", err);
    next(new ErrorResponse(err, 500));
  }
};

export const getExpenses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;
    const userExpenses = await ExpenseModel.find({
      createdBy: userId,
    });
    return res.status(200).json({
      data: userExpenses,
    });
  } catch (err: any) {
    console.log("error while getting expense : ", err);
    next(new ErrorResponse(err, 500));
  }
};

export const deleteExpense = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;
    const { expenseId } = req.params;
    const deletedExpense = await ExpenseModel.deleteOne({
      createdBy: userId,
      _id: expenseId,
    });
    return res.status(200).json({
      data: {
        message: "Expense Deleted",
      },
    });
  } catch (err: any) {
    console.log("error while deleting expense : ", err);
    next(new ErrorResponse(err, 500));
  }
};

export const getExpenseSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;
    const expenseSummary = await ExpenseModel.aggregate([
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: "$expense_category",
          count: { $sum: 1 },
        },
      },
    ]);
    return res.status(200).json({
      data: expenseSummary,
    });
  } catch (err: any) {
    console.log("error while getting expense summary", err);
    next(new ErrorResponse(err, 500));
  }
};
