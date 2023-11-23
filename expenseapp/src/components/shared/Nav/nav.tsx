import { RootState } from "@/redux/store";
import { Avatar } from "@nextui-org/react";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

function Nav() {
  const [isNavOpen, setIsNavOpen] = useState<boolean>(false);
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user);
  // console.log("Sidebar user : ", user);
  // const dispatch = useDispatch();
  // const getUser = async () => {
  //   try {
  //     const response = await fetcher.get("/auth/user");
  //     if (response.status === 200) {
  //       dispatch(setUser(response.data?.data));
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  useEffect(() => {
    setIsNavOpen(false);
  }, [location.pathname]);

  // useEffect(() => {
  //   getUser();
  // }, []);

  return (
    <>
      <div
        onClick={() => setIsNavOpen(!isNavOpen)}
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </div>

      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform md:translate-x-0 ${
          isNavOpen ? "" : "-translate-x-full"
        }`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-secondary relative">
          <div
            onClick={() => setIsNavOpen(false)}
            className="absolute right-10 inline-flex items-center p-2 mt-2 ms-3 text-sm text-white rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <X />
          </div>
          <div className="mt-10">
            <div className="relative h-[90px] w-[90px]">
              <div className="bg-red-500 h-[30px] w-[30px] rounded-full flex items-center justify-center text-white font-medium text-sm absolute z-50 -right-4 -top-4">
                4
              </div>
              <Avatar
                src="https://i.pravatar.cc/150?u=a04258114e29026708c"
                radius="sm"
                size="lg"
                classNames={{
                  // icon: "h-[100px] w-[100px]",
                  base: "h-full w-full",
                }}
              />
            </div>
            <div>
              <h1 className="font-semibold text-3xl text-white mt-3">
                {user?.name}
              </h1>
              <div className="text-sm text-gray-400">{user?.email}</div>
            </div>
          </div>
          <ul className="space-y-2 font-medium mt-16">
            <li className="py-4">
              <NavLink
                to="/"
                className={(navData) =>
                  navData?.isActive
                    ? "text-white"
                    : "text-gray-500 hover:text-white"
                }
              >
                <span className="flex items-center rounded-lg group text-lg font-medium">
                  Dashboard
                </span>
              </NavLink>
            </li>
            <li className="py-4">
              <NavLink
                to="/expenses"
                className={(navData) =>
                  navData?.isActive
                    ? "text-white"
                    : "text-gray-500 hover:text-white"
                }
              >
                <span className="flex items-center rounded-lg group text-lg font-medium">
                  Expenses
                </span>
              </NavLink>
            </li>
            <li className="py-4">
              <NavLink
                to="/add-expense"
                className={(navData) =>
                  navData?.isActive
                    ? "text-white"
                    : "text-gray-500 hover:text-white"
                }
              >
                <span className="flex items-center rounded-lg group text-lg font-medium">
                  Add Expense
                </span>
              </NavLink>
            </li>
            <li className="py-4">
              <NavLink
                to="/summary"
                className={(navData) =>
                  navData?.isActive
                    ? "text-white"
                    : "text-gray-500 hover:text-white"
                }
              >
                <span className="flex items-center rounded-lg group text-lg font-medium">
                  Summary
                </span>
              </NavLink>
            </li>
            <li className="py-4">
              <NavLink
                to="/accounts"
                className={(navData) =>
                  navData?.isActive
                    ? "text-white"
                    : "text-gray-500 hover:text-white"
                }
              >
                <span className="flex items-center rounded-lg group text-lg font-medium">
                  Accounts
                </span>
              </NavLink>
            </li>
            <li className="py-4">
              <NavLink
                to="/settings"
                className={(navData) =>
                  navData?.isActive
                    ? "text-white"
                    : "text-gray-500 hover:text-white"
                }
              >
                <span className="flex items-center rounded-lg group text-lg font-medium">
                  Settings
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}

export default Nav;
