import { BASE_URL } from "@/redux/services/BASE_URL";
import { PostType } from "@/redux/services/types-service";
import { useGetUserPostsQuery } from "@/redux/services/UserAPI";
import { FaPlay } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { FaRegCommentAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa6";

import React from "react";

const UserPosts = () => {
  const { data, isLoading } = useGetUserPostsQuery();

  if (isLoading) {
    return <div className="mt-10 text-xl font-medium">Loading...</div>;
  }

  if (data?.success && data?.posts?.length > 0) {
    return (
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-[80%] gap-2 my-8">
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
  createdAt,
  comments,
}: PostType) => {
  const postDate = new Date(createdAt);

  return (
    <div className="single-post-container flex flex-col justify-between items-center w-full shadow-lg hover:shadow-xl border-[1px] border-black rounded-sm overflow-hidden  h-[60vh] xl:h-[70vh]">
      {/* post content */}
      <div
        className={`post-content flex flex-col justify-start items-center w-full h-full overflow-hidden relative  `}
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
              autoPlay
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
        <div
          className={
            contentType === "text"
              ? "w-full h-full flex justify-center items-center text-center text-xl bg-slate-800 text-white font-semibold p-2"
              : "w-full text-[0.7rem] font-medium text-left py-1 px-2 bg-[#0000007c] text-white absolute bottom-0"
          }
        >
          <i> "{postCaption}"</i>
        </div>
      </div>

      {/* post info */}
      <div className="post-info-container flex justify-center items-center w-full px-2 py-1">
        <p>
          <FaEye />
          <span>123</span>
        </p>
        <p>
          <BiLike />
          <span>123</span>
        </p>
        <p>
          <FaRegCommentAlt />
          <span>{comments?.length}</span>
        </p>
      </div>
    </div>
  );
};
