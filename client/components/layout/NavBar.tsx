"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { League_Spartan } from "next/font/google";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/Utils/Auth";
import { Button } from "../ui/button";
import axios from "axios";
import { BASE_URL } from "@/redux/services/BASE_URL";
import { toast } from "react-toastify";
import { UserType } from "@/redux/services/types-service";
import {
  TooltipTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
} from "../ui/tooltip";

const font = League_Spartan({
  subsets: ["latin"],
  weight: "500",
});

const NavBar = () => {
  const router = useRouter();
  const { isAuthenticated, user, setIsAuthenticated } = useAuth();

  const HandleLogout = async () => {
    const result = await axios
      .get(`${BASE_URL}/auth/logout`, {
        withCredentials: true,
      })
      .catch((err) => {
        toast(err.response.data.msg || "something went wrong !!");
      });

    if (result?.data?.success) {
      setIsAuthenticated(false);
      toast(result.data.msg);

      router.push("/");
    }
  };

  return (
    <header className="flex justify-between items-center w-full p-2 px-8 shadow-lg">
      <div className="logo-container">
        <Link href="/" className={`${font.className} font-medium text-lg`}>
          FB-Mini
        </Link>
      </div>

      {isAuthenticated ? (
        <div className="flex justify-end items-center w-[30%]">
          <Button onClick={HandleLogout} className="mr-3">
            Logout
          </Button>

          <NavAvatarLink user={user} />
        </div>
      ) : (
        <div className="nav-links-container flex justify-end items-center w-[30%]">
          <Link href="/login" className="mr-3 colored-btn-link px-4 py-1">
            LogIn
          </Link>
          <Link className="outlined-btn-link px-4 py-1" href="/register">
            SignUp
          </Link>
        </div>
      )}
    </header>
  );
};

export default NavBar;

const NavAvatarLink = ({ user }: { user: UserType | undefined }) => {
  return (
    <Link href="/account" className="block">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Avatar>
              <AvatarImage
                src={
                  user?.avatar.url === "sample url"
                    ? "/default_avatar.png"
                    : user?.avatar.url
                }
              />
              <AvatarFallback>
                {user?.username.substring(0, 2).toUpperCase() || "Account"}
              </AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>
            {user?.username && user?.username.length > 6
              ? `${user?.username.substring(0, 6)}...`
              : user?.username || "Account"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Link>
  );
};
