import Sidebar from "@/components/shared/Sidebar/sidebar";
import { Outlet } from "react-router-dom";
import Nav from "../shared/Nav/nav";
export function MainLayout() {
  return (
    <main className="bg-secondary">
      <Nav />
      <div className="p-4 md:ml-64">
        <div className="flex flex-col  lg:flex-row justify-between bg-white min-h-screen rounded-3xl overflow-hidden">
          <div className="bg-white py-10 w-full">
            <Outlet />
          </div>
          <div className="bg-white">
            <Sidebar />
          </div>
        </div>
      </div>
    </main>
  );
}
