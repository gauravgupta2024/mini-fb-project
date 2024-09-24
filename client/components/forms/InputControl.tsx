import React, { HTMLInputTypeAttribute } from "react";
import { Input } from "../ui/input";

interface InputControlProps {
  label: string;
  type: HTMLInputTypeAttribute | undefined;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  isRequired?: boolean;
}

const InputControl = ({
  label,
  type,
  value,
  setValue,
  isRequired = false,
}: InputControlProps) => {
  return (
    <div>
      <label className="font-semibold text-[0.9rem]">
        {label.charAt(0).toUpperCase() + label.slice(1)} :{" "}
      </label>
      <Input
        type={type}
        placeholder={`Enter your ${label}`}
        className="bg-blue-50 text-black"
        required={isRequired}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default InputControl;
