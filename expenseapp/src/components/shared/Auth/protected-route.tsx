import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoute = () => {
  const authenticatedUser = useSelector((state: RootState) => state.user);
  console.log("is authenticated : ", authenticatedUser);
  if (!authenticatedUser) {
    return <Navigate to="/login" replace={true} />;
  }
  return <Outlet />;
};
