import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./BASE_URL";
import {
  ErrorResponse,
  RegisterRequestBodyType,
  RegisterResponseBodySuccessType,
} from "./service";

export const AuthAPI = createApi({
  reducerPath: "AuthAPI",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/auth`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<
      RegisterResponseBodySuccessType,
      RegisterRequestBodyType
    >({
      query: (user) => {
        console.log({ user }); // This will log the user object

        return {
          url: "/register",
          method: "POST",
          body: user,
        };
      },
    }),
  }),
});

export const { useRegisterUserMutation } = AuthAPI;
