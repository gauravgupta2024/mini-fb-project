import { BsFillSendFill } from "react-icons/bs";
import SingleCommentBlock from "./SingleCommentBlock";
import { FaEye, FaRegComment } from "react-icons/fa6";
import { BiLike } from "react-icons/bi";
import { ToastCustomAPIError } from "@/Utils/ToastCustomAPIError";
import { toast } from "react-toastify";
import {
  useAddCommentMutation,
  useGetPostCommentsQuery,
} from "@/redux/services/CommentsAPI";
import { useEffect, useState } from "react";
import { PostType } from "@/redux/services/types-service";

// Single Feed Card
const SingleFeedCard = ({
  _id,
  postCaption,
  postDataUploads,
  contentType,
  comments,
  createdAt,
  refetch,
}: PostType & { refetch: () => void }) => {
  const today = new Date();
  const givenDate = new Date(createdAt);
  const dateDiff = today.getTime() - givenDate.getTime();
  const diffInMinutes = Math.floor(dateDiff / (1000 * 60));
  const diffInHours = Math.floor(dateDiff / (1000 * 60 * 60));
  const diffInDays = Math.floor(dateDiff / (1000 * 60 * 60 * 24));

  const [showAllComments, setShowAllComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const { data, refetch: refetchComments } = useGetPostCommentsQuery(
    _id as any
  );

  const [addComment, { isLoading, isSuccess }] = useAddCommentMutation();

  const HandleAddComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await addComment({
      postId: _id,
      comment_text: newComment,
    });
    console.log({ data, error });

    if (data) {
      setNewComment("");
      toast.success("Comment added successfully");
      refetch();
      refetchComments();
    }
    if (error) {
      ToastCustomAPIError(error);
    }
  };

  useEffect(() => {
    refetchComments();
  }, [refetchComments, isSuccess]);

  return (
    <div className="flex flex-col justify-start items-center w-[70%] mb-5 bg-white rounded-md shadow-lg">
      {/* Content Block */}
      <div className="single-feed-content-block h-[50vh] w-full flex justify-center items-center bg-slate-950 overflow-hidden">
        {contentType === "images" && (
          <img
            src={`http://localhost:4000/posts/${postDataUploads[0].url
              .split("/")
              .pop()}`}
            alt="post-image"
            className="w-full h-full object-contain"
          />
        )}

        {contentType === "videos" && (
          <video
            className="w-full h-full object-contain"
            key={postDataUploads[0].public_id}
            muted
            autoPlay
            controls
          >
            <source
              src={`http://localhost:4000/posts/${postDataUploads[0].url
                .split("/")
                .pop()}`}
              type="video/mp4"
            />
          </video>
        )}

        {contentType === "text" && (
          <div className="w-full h-full flex justify-center items-center text-center text-white">
            <i>"{postCaption}"</i>
          </div>
        )}
      </div>

      {/* Info Block */}
      <div className="single-feed-info-block w-full flex justify-between items-center px-5 py-2">
        <div className="post-counts-container flex justify-start items-center w-[50%]">
          <p>
            <FaEye />
            <span>100</span>
          </p>
          <p>
            <BiLike />
            <span>100</span>
          </p>
          <p>
            <FaRegComment />
            <span>{comments.length}</span>
          </p>
        </div>
        <p className="post-time-container font-medium text-[0.8rem]">
          {diffInDays
            ? `${diffInDays}d`
            : diffInHours
            ? `${diffInHours}h`
            : `${diffInMinutes}m`}{" "}
          ago
        </p>
      </div>

      {/* Caption Block */}
      {contentType !== "text" && (
        <div className="w-full text-left italic py-1 px-5 text-[0.8rem] flex justify-between items-center">
          <p>"{postCaption}"</p>
          {comments.length > 1 && (
            <button
              className="text-blue-500 font-medium text-[0.8rem] cursor-pointer"
              onClick={() => setShowAllComments(!showAllComments)}
            >
              {showAllComments ? "Hide Comments" : "View All Comments"}
            </button>
          )}
        </div>
      )}

      {/* add comment block */}
      <form
        className="w-full flex justify-between items-center px-5 py-2"
        onSubmit={HandleAddComment}
      >
        <input
          type="text"
          placeholder="Add a comment"
          className="w-[95%] p-2 border border-gray-300 rounded-md outline-blue-800 text-[0.8rem]"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          type="submit"
          className="ml-2 bg-blue-600 text-white p-2 rounded-md"
          disabled={isLoading}
        >
          <BsFillSendFill />
        </button>
      </form>

      {/* show Comments Block */}
      <div className="w-full flex flex-col justify-start items-start max-h-[30vh] overflow-y-scroll">
        {data?.comments.map((item, index) => {
          if (!showAllComments && index < 1) {
            return <SingleCommentBlock key={item.comment._id} {...item} />;
          } else if (showAllComments) {
            return <SingleCommentBlock key={item.comment._id} {...item} />;
          }
        })}
      </div>
    </div>
  );
};

export default SingleFeedCard;
