import { Button, Card, Progress, Skeleton } from "@nextui-org/react";
import FlowerImg from "@/assets/flower.png";
import BoxImg from "@/assets/box.png";
import { useEffect, useState } from "react";
import fetcher from "@/lib/utils/fetcher";
import {
  EXPENSE_CATEGORIES,
  EXPENSE_CATEGORIES_ARRAY,
} from "@/constants/expense-categories";

type TSummaryType = {
  _id: string;
  count: number;
  totalSpending: number;
};

function Sidebar() {
  // const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<unknown>(null);
  const [data, setData] = useState<TSummaryType[] | null>(null);

  const getSummary = async () => {
    try {
      const response = await fetcher.get("/expenses/summary");
      if (response?.status === 200) {
        setData(response?.data?.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSummary();
  }, []);

  return (
    <div className="bg-gray-400 h-full w-full lg:w-[300px] py-10 px-5">
      <h1 className="text-center font-semibold text-xl text-typography-400">
        Where your money go?
      </h1>
      <div className="max-w-[350px] mx-auto lg:w-full">
        <div>
          {data ? (
            <>
              {data?.length ? (
                data.map((item) => {
                  return (
                    <div className="mt-10" key={item._id}>
                      <div className="flex justify-between text-sm font-medium">
                        <span>{EXPENSE_CATEGORIES[item._id]}</span>
                        <span>{item.totalSpending}</span>
                      </div>
                      <Progress
                        aria-label="food-drinks"
                        value={item.count}
                        className="max-w-md mt-2"
                        color="success"
                        classNames={{
                          base: "h-2",
                        }}
                      />
                    </div>
                  );
                })
              ) : (
                <>
                  {EXPENSE_CATEGORIES_ARRAY.map((item) => {
                    return (
                      <div className="mt-10" key={item}>
                        <div className="flex justify-between text-sm font-medium">
                          <span>{EXPENSE_CATEGORIES[item]}</span>
                          <span>0</span>
                        </div>
                        <Progress
                          aria-label="food-drinks"
                          value={0}
                          className="max-w-md mt-2"
                          color="success"
                          classNames={{
                            base: "h-2",
                          }}
                        />
                      </div>
                    );
                  })}
                </>
              )}
            </>
          ) : (
            <>
              <div className="mt-10">
                <Skeleton className="h-3 w-full rounded-lg" />
              </div>
              <div className="mt-10">
                <Skeleton className="h-3 w-full rounded-lg" />
              </div>
              <div className="mt-10">
                <Skeleton className="h-3 w-full rounded-lg" />
              </div>
              <div className="mt-10">
                <Skeleton className="h-3 w-full rounded-lg" />
              </div>
            </>
          )}
        </div>
        <div className="mt-40">
          <Card className="p-4 shadow-none bg-gray relative overflow-visible">
            <img
              src={BoxImg}
              alt="box"
              className="h-[80px] w-[80px] absolute -top-4"
            />
            <img
              src={FlowerImg}
              alt="flower"
              className="h-[100px] w-[70px] absolute -top-10 right-5"
            />
            <div className="mt-28">
              <h4 className="font-semibold text-[16px] text-center">
                Save more money
              </h4>
              <div className="text-gray-500 text-sm">
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim.
              </div>
            </div>
            <Button color="secondary" className="mt-5">
              VIEW TIPS
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
