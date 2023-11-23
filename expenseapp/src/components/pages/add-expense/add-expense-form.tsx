import {
  EXPENSE_CATEGORIES,
  EXPENSE_CATEGORIES_ARRAY,
} from "@/constants/expense-categories";
import fetcher from "@/lib/utils/fetcher";
import { TAddExpense, addExpenseSchema } from "@/schema/add-expense.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function AddExpenseFrom() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TAddExpense>({
    resolver: zodResolver(addExpenseSchema),
    mode: "onChange",
  });
  const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<unknown>(null);
  // const [data, setData] = useState<unknown>(null);
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<TAddExpense> = async (value) => {
    try {
      setLoading(true);
      const response = await fetcher.post("/expenses", {
        expense_category: value.expenseCategory,
        expense: value.expense,
        date: new Date(value.date),
        amount: value.amount,
      });
      if (response?.status === 201) {
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full sm:max-w-[500px]">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-14">
          <Select
            {...register("expenseCategory")}
            isInvalid={errors?.expenseCategory?.message ? true : false}
            errorMessage={errors?.expenseCategory?.message}
            label="Expense Category"
            placeholder="Expense category"
            className="bg-white w-full"
            labelPlacement="outside"
            classNames={{
              label: "text-sm text-gray",
              trigger: "bg-white border",
            }}
          >
            {EXPENSE_CATEGORIES_ARRAY.map((item) => (
              <SelectItem key={item} value={item}>
                {EXPENSE_CATEGORIES[item]}
              </SelectItem>
            ))}
          </Select>
        </div>
        <div className="mt-14">
          <Input
            {...register("expense")}
            isInvalid={errors?.expense?.message ? true : false}
            errorMessage={errors?.expense?.message}
            label="Expense"
            placeholder="expense"
            labelPlacement="outside"
            size="lg"
            classNames={{
              label: "text-sm text-gray",
              inputWrapper:
                "border border-gray rounded-xl shadow-none bg-white",
              input: "text-sm",
            }}
          />
        </div>
        <div className="mt-14">
          <Input
            {...register("date")}
            type="date"
            isInvalid={errors?.date?.message ? true : false}
            errorMessage={errors?.date?.message}
            label="Date"
            placeholder="date"
            labelPlacement="outside"
            size="lg"
            classNames={{
              label: "text-sm text-gray",
              inputWrapper:
                "border border-gray rounded-xl shadow-none bg-white",
              input: "text-sm",
            }}
          />
        </div>
        <div className="mt-14">
          <Input
            {...register("amount", {
              setValueAs: (v) => (v === "" ? undefined : parseInt(v)),
            })}
            isInvalid={errors?.amount?.message ? true : false}
            errorMessage={errors?.amount?.message}
            label="Amount [₹]"
            placeholder="amount"
            labelPlacement="outside"
            size="lg"
            classNames={{
              label: "text-sm text-gray",
              inputWrapper:
                "border border-gray rounded-xl shadow-none bg-white",
              input: "text-sm",
            }}
          />
        </div>
        <div className="mt-5">
          <Button
            type="submit"
            color="primary"
            className="w-full"
            size="lg"
            disableAnimation={loading}
            disabled={loading}
            isLoading={loading}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddExpenseFrom;
