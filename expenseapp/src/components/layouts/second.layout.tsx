import { Outlet } from "react-router-dom";

export function SecondLayout() {
  return (
    <div>
      <h1>Header 2</h1>
      <Outlet />
      <h1>Footer 2</h1>
    </div>
  );
}
