import { CommentType, UserType } from "@/redux/services/types-service";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const SingleCommentBlock = ({
  comment,
  user,
}: {
  comment: CommentType;
  user: UserType;
}) => {
  return (
    <div className="flex justify-start items-center w-full bg-stone-200 px-5 py-2 hover:bg-blue-200 duration-150 border-b border-gray-300">
      <div className="avatar-block h-8 w-8">
        <Avatar>
          <AvatarImage
            src={
              user?.avatar.url === "sample url"
                ? "/default_avatar.png"
                : user?.avatar.url
            }
          />
          <AvatarFallback>{user.username.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
      </div>

      <div className="comment-block ml-2 flex flex-col justify-start items-start w-[90%]">
        <p className="comment-user-name font-semibold text-[0.7rem] w-full">
          {user.username}
        </p>
        <p className="comment-text font-medium text-[0.9rem] ml-3 w-full break-words">
          {comment.comment_text}
        </p>
      </div>
    </div>
  );
};

export default SingleCommentBlock;
