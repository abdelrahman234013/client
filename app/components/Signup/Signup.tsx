"use client";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { inputStyles } from "@/app/utils/styles";
import { FcGoogle } from "react-icons/fc";
import { useRegisterMutation } from "@/app/redux/features/auth/authApi";
import { redirect } from "next/navigation";
import Link from "next/link";
import { signIn } from "next-auth/react";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [Register, { error, isSuccess }] = useRegisterMutation();

  useEffect(() => {
    if (isSuccess) {
      reset();
      toast.success("Register success!");
      redirect("/");
    }

    if (error) {
      if ("data" in error) {
        const errorData = error as any;

        toast.error(errorData.data.message);
      }
    }
  }, [error, isSuccess]);

  const onSubmit = ({ name, email, password }: any) => {
    const userData = {
      name,
      email,
      password,
    };
    
    Register(userData);
  };

  return (
    <div className="md:w-[70%] px-7 md:px-0 mx-auto flex-center pt-10 pb-16 text-white">
      <form
        className="flex flex-col gap-4 w-full items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-white text-[32px]">Signup</h2>

        <div
          className="flex-center gap-3 border mt-3 border-white px-2 py-2 md:w-[50%] w-full cursor-pointer"
          onClick={() => signIn("google", { redirect: true, callbackUrl: "/" })}
        >
          <FcGoogle size={20} />
          <span className="text-secondary">Signup with Google</span>
        </div>

        <div className=" h-[1px] bg-secondary mt-2  md:w-[50%] w-full" />

        {/* Name */}

        <div className="flex-col md:w-[50%] w-full flex gap-1">
          <label
            htmlFor="name"
            className={`${errors.name ? "text-rose-400 " : "text-secondary"}`}
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "Username is required" })}
            className={`${inputStyles} ${
              errors.name
                ? "border-rose-400 focus:border-rose-400"
                : "border-slate-200 focus:border-slate-400"
            }`}
          />
        </div>

        {/* Email */}

        <div className="flex-col md:w-[50%] w-full flex gap-1">
          <label
            htmlFor="email"
            className={`${errors.email ? "text-rose-400 " : "text-secondary"}`}
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            {...register("email", { required: "Email is required" })}
            className={`${inputStyles} ${
              errors.email
                ? "border-rose-400 focus:border-rose-400"
                : "border-slate-200 focus:border-slate-400"
            }`}
          />
        </div>

        {/* Password */}

        <div className="flex-col md:w-[50%] w-full flex gap-1">
          <label
            htmlFor="password"
            className={`${
              errors.password ? "text-rose-400 " : "text-secondary"
            }`}
          >
            Password
          </label>
          <input
            type="text"
            id="password"
            {...register("password", { required: "Password is required" })}
            className={`${inputStyles} ${
              errors.password
                ? "border-rose-400 focus:border-rose-400"
                : "border-slate-200 focus:border-slate-400"
            }`}
          />
        </div>

        <button
          className="text-white md:w-[50%] mt-2 w-full hover:text-secondary border border-white rounded-sm hover:border-secondary px-2 py-[8px] flex-center"
          disabled={isSubmitting}
        >
          Signup
        </button>
        <p className="text-sm  flex justify-center">
          Already have an account?{" "}
          <Link className="underline ml-1 cursor-pointer" href={"/login"}>
            login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
