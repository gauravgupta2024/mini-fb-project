import React from "react";

const RegisterPage = () => {
  return (
    <div className="w-full flex justify-between items-center h-screen">
      <form className="h-full w-[33%]">
        <div>
          <label>Enter email : </label>
          <input type="text" placeholder="Enter email here..." />
        </div>
      </form>
      <div className="h-full w-[67%] border-l-2 border-black"></div>
    </div>
  );
};

export default RegisterPage;
