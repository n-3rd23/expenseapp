import AddExpenseFrom from "@/components/pages/add-expense/add-expense-form";
import { MONTHS } from "@/constants/months.constant";
import { Avatar, AvatarGroup } from "@nextui-org/react";

function AddExpense() {
  const CURRENT_DATE = new Date();

  return (
    <div className="px-5 md:px-10">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="font-semibold text-4xl text-typography">
            Add Expense
          </h1>
          <div className="flex gap-2">
            <AvatarGroup isBordered={true}>
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
              <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
              <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
            </AvatarGroup>
            <Avatar name="+" />
          </div>
        </div>
        <div className="text-gray-500 text-sm mt-2">{`${CURRENT_DATE.getDate()} ${
          MONTHS[CURRENT_DATE.getMonth() + 1]
        } ${CURRENT_DATE.getFullYear()}`}</div>
      </div>
      <div className="mt-16">
        <AddExpenseFrom />
      </div>
    </div>
  );
}

export default AddExpense;
