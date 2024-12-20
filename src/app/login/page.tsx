"use client";
import React from "react";
import { useState } from "react";
import { axiosInstence } from "@/utils/fetch";
import { toast } from "react-hot-toast";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { ArrowLeft, Github, GithubIcon } from "lucide-react";

type Inputs = {
  email: string;
  password: string;
};

interface succesResponse {
  data: {
    access_token: string;
    refresh_token: string;
  };
  message: string;
  success: boolean;
  error: any;
}

export default function LoginPage() {
  const [loginWait, setLoginWait] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (form) => {
    setLoginWait(true);
    try {
      const { data } = await axiosInstence.post("/v1/auth/login", form);
      const result = data as succesResponse;

      if (!result.success) {
        throw new Error(result.message || "Login failed");
      }

      const expire = new Date();
      expire.setDate(expire.getDate() + 3);

      setCookie("token", result.data.access_token, {
        expires: expire,
        sameSite: "strict",
      });
      setLoginWait(false);
      router.push("/");
    } catch (error) {
      toast.error("Invalid username or password. Please try again.");
      setLoginWait(false);
    }
  };

  function oauthGithub() {
    window.location.href = "https://hono.pilput.dev/auth/oauth/github";
  }

  return (
    <main className="dark:bg-gray-800 relative overflow-hidden h-screen">
      <Link
        className="fixed top-5 left-5 flex gap-2 items-center bg-white dark:bg-slate-900 rounded-md p-2 hover:bg-slate-200 dark:hover:bg-slate-800"
        href="/"
      >
        <ArrowLeft />
        Back to home
      </Link>
      <div className="min-h-screen flex justify-center items-center">
        <div className="py-12 px-12 bg-white dark:bg-slate-900 rounded-2xl shadow-xl z-20 border">
          <div>
            <h1 className="text-3xl font-bold text-center text-gray-700 mb-4">
              Sign in
            </h1>
            <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide">
              Why You so interested to read
              <br />
            </p>
          </div>
          {(errors.email || errors.password) && (
            <div className="py-3">
              <ol className="text-sm">
                {errors.email?.type == "required" && (
                  <li className="text-red-500">The Email field is required</li>
                )}
                {errors.password?.type == "required" && (
                  <li className="text-red-500">
                    The Password field is required
                  </li>
                )}
              </ol>
            </div>
          )}
          <div>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                placeholder="Username or Email"
                {...register("email", { required: true })}
                aria-invalid={errors.email ? "true" : "false"}
                className={errors.email ? "border text-red-400 border-red-400" : ""}
              />

              <Input
                {...register("password", { required: true, minLength: 8 })}
                type="password"
                placeholder="Password"
                aria-invalid={errors.password ? "true" : "false"}
                className={errors.password ? "border text-red-400 border-red-400" : ""}
              />

              <div className="flex justify-center mt-6">
                {loginWait ? (
                  <Button disabled type="submit" size={"lg"} className="w-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-loader mr-2 h-4 w-4 animate-spin"
                    >
                      <line x1="12" y1="2" x2="12" y2="6"></line>
                      <line x1="12" y1="18" x2="12" y2="22"></line>
                      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                      <line x1="2" y1="12" x2="6" y2="12"></line>
                      <line x1="18" y1="12" x2="22" y2="12"></line>
                      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                    </svg>
                    Please Wait
                  </Button>
                ) : (
                  <Button type="submit" size={"lg"} className="w-full">
                    Login
                  </Button>
                )}
              </div>
            </form>
            <center className="py-3">Or</center>
            <div className="">
              <Button
                onClick={oauthGithub}
                type="button"
                className="w-full border border-red-500"
                size={"lg"}
                variant={"outline"}
              >
                <GithubIcon />
                Continue with Github
                <div></div>
              </Button>
            </div>
            <div className="text-center mt-4 text-sm">
              <p>dont have an account?</p>
              <Link
                href="/register"
                className="underline text-blue-500 hover:text-blue-600 hover:font-medium"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
