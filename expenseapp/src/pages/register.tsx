import RegisterForm from "@/components/pages/register/register-form";
import { Card, CardBody } from "@nextui-org/react";

function Register() {
  return (
    <div className="bg-secondary min-h-screen text-white flex items-center justify-center px-5">
      <Card className="p-10 min-w-full sm:min-w-[450px]">
        <CardBody>
          <h1 className="font-semibold text-4xl">Register</h1>
          <RegisterForm />
        </CardBody>
      </Card>
    </div>
  );
}

export default Register;
