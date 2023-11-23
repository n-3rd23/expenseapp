import ExpenseList from "@/components/pages/home/expense-list";
import { MONTHS } from "@/constants/months.constant";
import fetcher from "@/lib/utils/fetcher";
import { Avatar, AvatarGroup } from "@nextui-org/react";
import { useEffect } from "react";
import ChartImg from "@/assets/chart.png";

const CURRENT_DATE = new Date();

function Home() {
  const getExpenses = async () => {
    await fetcher.get("/expenses?page=0&perPage=10");
  };

  useEffect(() => {
    getExpenses();
  }, []);

  return (
    <div className="px-5 md:px-10">
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h1 className="font-semibold text-4xl text-typography">Expenses</h1>
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
          MONTHS[CURRENT_DATE.getMonth()]
        } ${CURRENT_DATE.getFullYear()}`}</div>
      </div>
      <div className="mt-10">
        {/* 
          // TODO: replace it with chart
         */}
        <img src={ChartImg} alt="chart" className="w-full" />
      </div>
      <div className="mt-10">
        <ExpenseList />
      </div>
    </div>
  );
}

export default Home;
