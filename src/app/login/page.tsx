"use client";
import React from "react";
import { useState } from "react";
import { axiosIntence } from "@/utils/fetch";
import { toast } from "react-hot-toast";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apibaseurl, dashbaseurl } from "@/utils/fetch";

export default function Login() {
  const router = useRouter();
  const [email, setemail] = useState("guest@pilput.dev");
  const [password, setpassword] = useState("guestguest");
  const [loginwait, setloginwait] = useState(false);

  function oauthgoogle() {
    window.location.href = apibaseurl + "/auth/oauth";
  }

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const id = toast.loading("Loading...");
    setloginwait(true);
    const data = {
      email: email,
      password: password,
    };
    try {
      const response = await axiosIntence.post("/auth/login", data);
      toast.success("Success login", { id });
      const expire = new Date();

      expire.setDate(expire.getDate() + 3);

      setCookie("token", response.data.access_token, {
        domain: `.${process.env.NEXT_PUBLIC_DOMAIN}`,
        expires: expire,
        sameSite: "strict",
      });
      setloginwait(false);
      router.push(dashbaseurl);
    } catch (error) {
      toast.error("Wrong username or password", { id });
      setloginwait(false);
    }
  }

  return (
    <main className="dark:bg-gray-800 relative overflow-hidden h-screen ">
      <div className="min-h-screen flex justify-center items-center">
        <div className="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
          <div>
            <h1 className="text-3xl font-bold text-center text-gray-700 mb-4 cursor-pointer">
              Sign in
            </h1>
            <p className="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer">
              Why You so interested to read
              <br />
            </p>
          </div>
          <div>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />

              <Input
                value={password}
                onChange={(e) =>
                  setpassword(e.target.value)
                }
                type="password"
                placeholder="Password"
              />

              <div className="flex justify-center mt-6">
                {loginwait ? (
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
                onClick={oauthgoogle}
                type="button"
                className="w-full border border-red-500"
                size={"lg"}
                variant={"outline"}
              >
                <svg
                  className="mr-2 -ml-1 w-4 h-4"
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fab"
                  data-icon="google"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 488 512"
                >
                  <path
                    fill="currentColor"
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
                Continue with Google
                <div></div>
              </Button>
            </div>
            <div className="text-center">
              <Link href="/">
                <Button variant={"link"}>Back to home</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
