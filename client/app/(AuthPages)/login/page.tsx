"use client";

import InputControl from "@/components/forms/InputControl";
import { Button } from "@/components/ui/button";
import { useLoginUserMutation } from "@/redux/services/AuthAPI";
import { useAuth } from "@/Utils/Auth";
import { ToastCustomAPIError } from "@/Utils/ToastCustomAPIError";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const LoginPage = () => {
  const router = useRouter();
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [LoginUser] = useLoginUserMutation();

  const HandleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, error } = await LoginUser({ email, password });

    console.log({ data, error });

    if (data?.success) {
      setIsAuthenticated(true);
      toast.success(data.msg || "Register successfully.");
      router.push("/account");
    }
    if (error) {
      ToastCustomAPIError(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/account");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="w-full flex justify-between items-center h-screen">
      {/*  */}
      <div className="h-full w-full xl:w-[40%] flex flex-col justify-start items-center p-10">
        <h1 className="text-xl font-semibold text-center mt-10">
          Welcome back
        </h1>
        <p className="text-center text-[0.9rem] w-[80%]">
          Log in to continue sharing, discovering, and connecting with your
          friends.
        </p>

        <form className="auth-form w-[70%] mt-8" onSubmit={HandleLoginSubmit}>
          <InputControl
            label="email"
            type="email"
            value={email}
            setValue={setEmail}
          />

          <InputControl
            label="password"
            type="password"
            value={password}
            setValue={setPassword}
          />

          <Button className="w-full mt-10" type="submit">
            Log in
          </Button>
          <Link
            href="/register"
            className="w-full block text-center outlined-btn-link mt-2 py-1"
          >
            Sign Up
          </Link>
        </form>
      </div>

      {/*  */}
      <div className="h-full w-0 overflow-hidden xl:w-[60%] flex justify-center items-start">
        <div className="gradient-background rounded-3xl shadow-xl w-[95%] h-[95%] mt-5 bg-gradient-to-t from-black via-purple-950 to-blue-300"></div>
      </div>
    </div>
  );
};

export default LoginPage;
