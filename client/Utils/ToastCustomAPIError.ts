import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";

// Define your custom error type
interface CustomError {
  msg?: string;
}

// Type guard to check if error is FetchBaseQueryError
const isFetchBaseQueryError = (error: any): error is FetchBaseQueryError => {
  return error && typeof error === "object" && "data" in error;
};

// Type guard to check if error is SerializedError
const isSerializedError = (error: any): error is SerializedError => {
  return error && typeof error === "object" && "message" in error;
};

export const ToastCustomAPIError = (
  error: FetchBaseQueryError | SerializedError | undefined
) => {
  let errorMsg = "Something went wrong !!";

  if (isFetchBaseQueryError(error)) {
    // Handle FetchBaseQueryError
    const errorData = error.data as CustomError; // Type assertion
    errorMsg = errorData.msg || "Something went wrong !!";
  } else if (isSerializedError(error)) {
    // Handle SerializedError
    errorMsg = error.message || "An unexpected error occurred";
  }

  console.log({ errorMsg });
  toast.error(errorMsg);
};
