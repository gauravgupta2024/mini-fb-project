import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa6";

const HomePage = () => {
  return (
    <div className="flex flex-col justify-start items-center w-full h-[84vh] pt-24   overflow-hidden">
      <h1 className="text-[2rem] font-bold flex justify-center items-center">
        {" "}
        <FaQuoteLeft className="mr-2 translate-y-[-30px]" />
        <span>Connect, Share, and Grow</span>
        <FaQuoteRight className="ml-2 translate-y-[-30px]" />
      </h1>

      <h4 className="w-[40%] text-center mb-8 text-[1.2rem] font-semibold">
        Where your moments turn into meaningful connections. <br /> Join the
        community that amplifies your voice.
      </h4>

      <p className="text-[0.9rem] w-[60%] text-center font-medium">
        This captures the essence of engagement, connection, and personal
        growth—key elements for social media platforms. <br /> You can tweak it
        depending on the tone or focus of your app!
      </p>

      <a href="/register" className="mt-5 colored-btn-link px-8 py-2">
        Get Started
      </a>
    </div>
  );
};

export default HomePage;
