import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  GetAllFriendsResponseType,
  GetAllPostsResponseType,
  UserResponseType,
} from "./types-service";
import { BASE_URL } from "./BASE_URL";

// Define a service using a base URL and expected endpoints
export const UserAPI = createApi({
  reducerPath: "UserAPI",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}`, credentials: "include" }),
  endpoints: (builder) => ({
    loadUser: builder.query<UserResponseType, void>({
      query: () => "/me",
    }),
    getUserPosts: builder.query<GetAllPostsResponseType, void>({
      query: () => "/posts/me",
    }),
    getUserFriends: builder.query<GetAllFriendsResponseType, void>({
      query: () => "/me/friends",
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useLoadUserQuery,
  useGetUserPostsQuery,
  useGetUserFriendsQuery,
} = UserAPI;
