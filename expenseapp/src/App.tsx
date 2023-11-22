import { Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import { MainLayout } from "@/components/layouts/main.layout";
import Home from "./pages/home";
// import { Home } from "lucide-react";
// import Register from "@/pages/register";
// const Home = lazy(() => import("./pages/home"));
const NotFound = lazy(() => import("./pages/not-found"));
const Login = lazy(() => import("./pages/login"));
const Register = lazy(() => import("@/pages/register"));
const AddExpense = lazy(() => import("@/pages/add-expense"));

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path="/"
          element={
            <Suspense
              fallback={<p className="bg-green-400 text-black">loading...</p>}
            >
              <Home />
            </Suspense>
          }
          errorElement={<p className="bg-red-500 text-white">Error..</p>}
        />
        <Route
          path="/add-expense"
          element={
            <Suspense
              fallback={<p className="bg-green-400 text-black">loading...</p>}
            >
              <AddExpense />
            </Suspense>
          }
          errorElement={<p className="bg-red-500 text-white">Error..</p>}
        />
      </Route>
      <Route
        path="/login"
        element={
          <Suspense>
            <Login />
          </Suspense>
        }
      />
      <Route
        path="/register"
        element={
          <Suspense>
            <Register />
          </Suspense>
        }
      />
      <Route
        path="*"
        element={
          <Suspense fallback={<p>loading...</p>}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;
