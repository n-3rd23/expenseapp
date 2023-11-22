import FacebookAuth from "@/components/shared/Auth/facebook-auth";
import GoogleAuth from "@/components/shared/Auth/google-auth";
import fetcher from "@/lib/utils/fetcher";
import { TLogin, loginSchema } from "@/schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const [responseDate, setResponseData] = useState<unknown>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });
  console.log(errors);
  const onSubmit: SubmitHandler<TLogin> = async (data) => {
    try {
      const response = await fetcher.post("/auth/login", {
        email: data.email,
        password: data.password,
      });
      if (response?.status === 200) {
        console.log("success");
        setIsLoading(false);
        setResponseData(response?.data?.data);
        navigate("/");
      }
    } catch (err) {
      console.log("Error while login : ", err);
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-14">
        <Input
          {...register("email")}
          isInvalid={errors?.email?.message ? true : false}
          errorMessage={errors?.email?.message}
          label="Email"
          placeholder="foo@gmail.com"
          labelPlacement="outside"
          size="lg"
          classNames={{
            label: "text-sm text-gray",
            inputWrapper: "border border-gray rounded-xl shadow-none bg-white",
            input: "text-sm",
          }}
        />
      </div>
      <div className="mt-14">
        <Input
          {...register("password")}
          isInvalid={errors?.password?.message ? true : false}
          errorMessage={errors?.password?.message}
          label="Password"
          placeholder="password"
          labelPlacement="outside"
          size="lg"
          classNames={{
            label: "text-sm text-gray",
            inputWrapper: "border border-gray rounded-xl shadow-none bg-white",
            input: "text-sm",
          }}
        />
      </div>
      <div className="mt-8">
        <Button
          variant="solid"
          color="primary"
          type="submit"
          fullWidth
          size="lg"
          disabled={isLoading}
          disableAnimation={isLoading}
          isLoading={isLoading}
        >
          SIGN IN
        </Button>
      </div>
      <div className="text-center mt-5">OR</div>
      <div className="flex items-center gap-3 justify-center mt-5">
        <GoogleAuth />
        <FacebookAuth />
      </div>
    </form>
  );
}

export default LoginForm;
