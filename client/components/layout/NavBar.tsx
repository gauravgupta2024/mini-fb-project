import React from "react";
import { League_Spartan } from "next/font/google";
import Link from "next/link";

const font = League_Spartan({
  subsets: ["latin"],
  weight: "500",
});

const NavBar = () => {
  return (
    <header className="flex justify-between items-center w-full p-2 px-8 shadow-md">
      <div className="logo-container">
        <Link href="/" className={`${font.className} font-medium text-lg`}>
          FB-Mini
        </Link>
      </div>

      <div className="nav-links-container flex justify-end items-center w-[30%]">
        <Link href="/login" className="mr-3 colored-btn-link px-4 py-1">
          LogIn
        </Link>
        <Link className="outlined-btn-link px-4 py-1" href="/register">
          SignUp
        </Link>
      </div>
    </header>
  );
};

export default NavBar;
