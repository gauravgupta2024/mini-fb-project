import { BASE_URL } from "@/redux/services/BASE_URL";
import { PostType } from "@/redux/services/types-service";
import { useGetUserPostsQuery } from "@/redux/services/UserAPI";
import { FaPlay } from "react-icons/fa";

import React from "react";

const UserPosts = () => {
  const { data } = useGetUserPostsQuery();

  if (data?.success && data?.posts?.length > 0) {
    return (
      <div className="grid grid-cols-3 w-[80%] gap-2 my-8">
        {data?.posts?.map((item) => (
          <SinglePost key={item._id} {...item} />
        ))}
      </div>
    );
  } else {
    return (
      <div className="mt-10 text-xl font-medium">You have no posts yet!</div>
    );
  }
};

export default UserPosts;

const SinglePost = ({
  postCaption,
  postDataUploads,
  contentType,
}: PostType) => {
  return (
    <div className="single-post-container flex flex-col justify-between items-center w-full shadow-lg border-[1px] border-black rounded-md overflow-hidden h-[30vh] ">
      <div
        className={` ${
          contentType === "text"
            ? "hidden"
            : "post-content flex justify-center items-center w-full h-[90%] overflow-hidden"
        }`}
      >
        {contentType === "images" ? (
          <img
            src={`http://localhost:4000/posts/${postDataUploads[0].url
              .split("/")
              .pop()}`}
            alt="post"
            key={postDataUploads[0].public_id}
            className="w-full h-full object-cover"
          />
        ) : (
          postDataUploads.map((item) => (
            <video
              key={postDataUploads[0].public_id}
              muted
              loop
              controls={false}
              className="w-full h-full object-cover relative"
            >
              <source
                src={`http://localhost:4000/posts/${postDataUploads[0].url
                  .split("/")
                  .pop()}`}
                type="video/mp4"
              />
            </video>
          ))
        )}
      </div>

      <div
        className={
          contentType === "text"
            ? "w-full h-full flex justify-center items-center text-center text-xl bg-slate-800 text-white font-semibold p-2"
            : "w-full text-[0.8rem] font-medium text-left p-2 bg-slate-100"
        }
      >
        <p>
          <i> "{postCaption}"</i>
        </p>
      </div>
    </div>
  );
};
