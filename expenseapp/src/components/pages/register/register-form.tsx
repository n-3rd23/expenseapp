import FacebookAuth from "@/components/shared/Auth/facebook-auth";
import GoogleAuth from "@/components/shared/Auth/google-auth";
import fetcher from "@/lib/utils/fetcher";
import { TRegister, registerSchema } from "@/schema/register.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TRegister>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
  });
  console.log(errors);
  const onSubmit: SubmitHandler<TRegister> = async (data) => {
    try {
      const response = await fetcher.post("/auth/register", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      if (response?.status === 201) {
        navigate("/");
      }
    } catch (err: unknown) {
      console.log(err);
    } finally {
      setLoading(false);
    }
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-14">
        <Input
          {...register("name")}
          isInvalid={errors?.name?.message ? true : false}
          errorMessage={errors?.name?.message}
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
          type="password"
        />
      </div>
      <div className="mt-14">
        <Input
          {...register("confirmPassword")}
          isInvalid={errors?.confirmPassword?.message ? true : false}
          errorMessage={errors?.confirmPassword?.message}
          label="Confirm Password"
          placeholder="confirm password"
          labelPlacement="outside"
          size="lg"
          classNames={{
            label: "text-sm text-gray",
            inputWrapper: "border border-gray rounded-xl shadow-none bg-white",
            input: "text-sm",
          }}
          type="password"
        />
      </div>
      <div className="mt-8">
        <Button
          variant="solid"
          color="primary"
          type="submit"
          fullWidth
          size="lg"
        >
          SIGN UP
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
