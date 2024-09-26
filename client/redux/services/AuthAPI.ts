import {
  BaseQueryFn,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./BASE_URL";
import {
  LoginRequestType,
  LoginResponseType,
  RegisterRequestType,
  RegisterResponseType,
} from "./types-service";

export const AuthAPI = createApi({
  reducerPath: "AuthAPI",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/auth`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation<RegisterResponseType, RegisterRequestType>({
      query: (user) => {
        // console.log({ user }); // This will log the user object
        return {
          url: "/register",
          method: "POST",
          body: user,
        };
      },
    }),

    loginUser: builder.mutation<LoginResponseType, LoginRequestType>({
      query: (user) => {
        // console.log({ user }); // This will log the user object
        return {
          url: "/login",
          method: "POST",
          body: user,
        };
      },
    }),
  }),
});

export const { useRegisterUserMutation, useLoginUserMutation } = AuthAPI;
