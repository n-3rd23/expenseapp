import { MoreHorizontal, Trash } from "lucide-react";
import GroceryImg from "@/assets/grocery.png";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Skeleton,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import fetcher from "@/lib/utils/fetcher";
import { EXPENSE_CATEGORIES } from "@/constants/expense-categories";

type TExpenses = {
  _id: string;
  expense_category: string;
  expense: string;
  date: Date;
  amount: 100;
  createdBy: string;
  id: string;
};

function ExpenseList() {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<TExpenses[] | null>(null);
  const getExpenseList = async () => {
    try {
      setLoading(true);
      const response = await fetcher.get("/expenses");
      if (response?.status === 200) {
        setData(response.data?.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      setIsDeleting(true);
      const response = await fetcher.delete(`expenses/${id}`);
      if (response.status === 200) {
        getExpenseList();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    getExpenseList();
  }, []);
  return (
    <div>
      <div className="flex items-center justify-between border-b-1 border-b-steel-400 pb-3">
        <span className="font-semibold text-xl text-typography-400">Today</span>
        <span>
          <MoreHorizontal className="text-gray-500" />
        </span>
      </div>
      {isLoading ? (
        <>
          <Skeleton className="h-5 full rounded-lg mt-3" />
          <Skeleton className="h-5 full rounded-lg mt-3" />
          <Skeleton className="h-5 full rounded-lg mt-3" />
          <Skeleton className="h-5 full rounded-lg mt-3" />
        </>
      ) : data && data.length ? (
        data.map((item) => {
          return (
            <div className="mt-3" key={item._id}>
              <div className="grid grid-cols-4 py-3 place-items-stretch">
                <div className="flex items-center gap-5 col-span-2">
                  <img
                    src={GroceryImg}
                    alt="grocery"
                    className="h-[50px] w-[50px]"
                  />
                  <div>
                    <div className="text-typography font-medium">
                      {EXPENSE_CATEGORIES[item.expense_category]}
                    </div>
                    <small className="block text-xs text-gray-500">
                      {new Date(item.date).getHours()} :{" "}
                      {new Date(item.date).getMinutes()} {item.expense}
                    </small>
                  </div>
                </div>
                <div className="text-right flex justify-end items-center">
                  <Popover placement="bottom" showArrow={true}>
                    <PopoverTrigger>
                      <Trash className="text-primary" />
                    </PopoverTrigger>
                    <PopoverContent>
                      <div className="px-1 py-2">
                        <div className="text-small font-medium text-center mb-1">
                          Confirm
                        </div>
                        <div className="text-tiny flex gap-1">
                          <Button
                            isDisabled={isDeleting}
                            isLoading={isDeleting}
                            color="primary"
                            size="sm"
                            onClick={() => deleteExpense(item._id)}
                          >
                            Yes
                          </Button>
                          <Button color="secondary" size="sm">
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="text-right text-lg text-typography-400 font-semibold flex items-center justify-end">
                  - {item.amount}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="text-center mt-5 text-typography">No Expenses...</div>
      )}
    </div>
  );
}

export default ExpenseList;
