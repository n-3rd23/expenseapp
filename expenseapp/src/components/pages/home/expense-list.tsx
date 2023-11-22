import { MoreHorizontal, Trash } from "lucide-react";
import GroceryImg from "@/assets/grocery.png";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { useState } from "react";

function ExpenseList() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div>
      <div className="flex items-center justify-between border-b-1 border-b-steel-400 pb-3">
        <span className="font-semibold text-xl text-typography-400">Today</span>
        <span>
          <MoreHorizontal className="text-gray-500" />
        </span>
      </div>
      <div className="mt-3">
        <div className="grid grid-cols-4 py-3 place-items-stretch">
          <div className="flex items-center gap-5 col-span-2">
            <img src={GroceryImg} alt="grocery" className="h-[50px] w-[50px]" />
            <div>
              <div className="text-typography font-medium">Grocery</div>
              <small className="block text-xs text-gray-500">
                5:12 PM . Koratty Trhissur
              </small>
            </div>
          </div>
          <div className="text-right flex justify-end items-center">
            <Popover
              placement="bottom"
              showArrow={true}
              isOpen={isOpen}
              onOpenChange={(open) => setIsOpen(open)}
            >
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
                      color="primary"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                    >
                      Yes
                    </Button>
                    <Button
                      color="secondary"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
          <div className="text-right text-lg text-typography-400 font-semibold flex items-center justify-end">
            - 123.44
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseList;
