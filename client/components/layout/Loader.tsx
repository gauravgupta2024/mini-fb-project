import React from "react";
import "./loader.css";

export const Loader = () => {
  return (
    <div className="loader-container flex flex-col justify-center items-center h-screen">
      <span className="loader">Load&nbsp;ng</span>
      <span className="loader-text text-lg font-medium">Please wait...</span>
    </div>
  );
};
