import { TAddExpense, addExpenseSchema } from "@/schema/add-expense.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { SubmitHandler, useForm } from "react-hook-form";

function AddExpenseFrom() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<TAddExpense>({
    resolver: zodResolver(addExpenseSchema),
    mode: "onChange",
  });

  const EXPENSES = [
    {
      value: "GROCERY",
      label: "grocery",
    },
    {
      value: "FOOD_DRINKS",
      label: "food",
    },
  ];

  const onSubmit: SubmitHandler<TAddExpense> = (value) => {
    console.log(value);
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
            {EXPENSES.map((animal) => (
              <SelectItem key={animal.value} value={animal.value}>
                {animal.label}
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
          <Button type="submit" color="primary" className="w-full" size="lg">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddExpenseFrom;
