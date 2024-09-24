"use client";

import React, { useState } from "react";
import InputControl from "@/components/forms/InputControl";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRegisterUserMutation } from "@/redux/services/AuthAPI";

const RegisterPage = () => {
  const [username, setUsername] = useState<string>("abcd");
  const [email, setEmail] = useState<string>("abcd@gmail.com");
  const [password, setPassword] = useState<string>("123456789");

  const [RegisterUser] = useRegisterUserMutation();

  const HandleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log({ username, email, password });
    const { data, error } = await RegisterUser({ username, email, password });

    console.log({ data, error });

    if (data?.success) {
      toast.success(data.msg || "registerd successfully !!");
    }

    // console.log({ data });
  };

  return (
    <div className="w-full flex justify-between items-center h-screen">
      {/*  */}
      <div className="h-full w-full xl:w-[40%]  flex flex-col justify-start items-center p-10">
        <h1 className="text-xl font-semibold text-center mt-10">
          Join FB-Mini and Connect with the World!
        </h1>
        <p className="text-center text-[0.9rem] mt-2 w-[80%]">
          Create an account to share your moments, discover new friends, and
          stay connected with the things you love.{" "}
        </p>

        <form
          className="auth-form w-[70%] mt-8"
          onSubmit={HandleRegisterSubmit}
        >
          <InputControl
            label="username"
            type="text"
            value={username}
            setValue={setUsername}
          />

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
            Create Account
          </Button>
          <Link
            href="/login"
            className="w-full block text-center outlined-btn-link mt-2 py-1"
          >
            Log In
          </Link>
        </form>
      </div>

      {/*  */}
      <div className="h-full  w-0 overflow-hidden xl:w-[60%]  flex justify-center items-start">
        <div className="gradient-background rounded-3xl shadow-xl w-[95%] h-[95%] mt-5 bg-gradient-to-t from-black via-purple-950 to-blue-300"></div>
      </div>
    </div>
  );
};

export default RegisterPage;
