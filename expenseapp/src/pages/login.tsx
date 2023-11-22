import LoginForm from "@/components/pages/login/login-form";
import { Card, CardBody } from "@nextui-org/react";

function Login() {
  return (
    <div className="bg-secondary min-h-screen text-white flex items-center justify-center px-5">
      <Card className="p-10 min-w-full sm:min-w-[450px]">
        <CardBody>
          <h1 className="font-semibold text-4xl">Login</h1>
          <LoginForm />
        </CardBody>
      </Card>
    </div>
  );
}

export default Login;
