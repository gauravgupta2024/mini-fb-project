import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "./BASE_URL";
import {
  AddCommentRequestType,
  AddCommentResponseType,
  GetPostCommentsResponseType,
} from "./types-service";

export const CommentsAPI = createApi({
  reducerPath: "CommentsAPI",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/comments`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getPostComments: builder.query<GetPostCommentsResponseType, void>({
      query: (postId) => {
        // console.log({ postId });
        // console.log({ user }); // This will log the user object
        return {
          url: `/${postId}`,
          method: "GET",
        };
      },
    }),
    addComment: builder.mutation<AddCommentResponseType, AddCommentRequestType>(
      {
        query: ({ postId, comment_text }) => {
          return {
            url: `/${postId}`,
            method: "POST",
            body: { comment_text },
          };
        },
      }
    ),
  }),
});

export const { useGetPostCommentsQuery, useAddCommentMutation } = CommentsAPI;
