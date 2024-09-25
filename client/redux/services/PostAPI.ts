import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./BASE_URL";
import { PostResponseType, PostRequestType } from "./types-service";

export const PostAPI = createApi({
  reducerPath: "PostAPI",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/posts`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createPost: builder.mutation<PostResponseType, { postCaption: string }>({
      query: (user) => {
        // console.log({ user }); // This will log the user object
        return {
          url: "/text",
          method: "POST",
          body: user,
        };
      },
    }),
  }),
});

export const {} = PostAPI;
