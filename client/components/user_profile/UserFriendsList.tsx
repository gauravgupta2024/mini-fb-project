import { UserType } from "@/redux/services/types-service";
import { useGetUserFriendsQuery } from "@/redux/services/UserAPI";
import React from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

const UserFriendsList = () => {
  const { data, isLoading } = useGetUserFriendsQuery();

  if (isLoading) {
    return <div className="mt-10 text-xl font-medium">Loading...</div>;
  }

  if (data?.success && data?.friends?.length > 0) {
    return (
      <div className="flex flex-col justify-start items-start w-[80%] md:w-[60%] lg:w-[50%] xl:w-[40%] h-screen overflow-y-scroll my-8 border-2 border-black">
        {data?.friends.map((friend) => (
          <FriendCard key={friend._id} friend={friend} />
        ))}
      </div>
    );
  } else {
    return (
      <div className="mt-10 text-xl font-medium">You have no friends yet!</div>
    );
  }
};

export default UserFriendsList;

const FriendCard = ({ friend }: { friend: UserType }) => {
  const HandleRemoveFriend = () => {
    console.log("remove friend");
  };

  return (
    <div className="w-full h-[10vh] flex justify-between items-center bg-red-50 border-b-2 border-black p-5">
      <div className="flex justify-start items-center w-[50%]">
        <Avatar className="w-14 h-14">
          <AvatarImage
            src={
              friend?.avatar.url === "sample url"
                ? "/default_avatar.png"
                : friend?.avatar.url
            }
          />
          <AvatarFallback>
            {friend.username.substring(0, 2).toUpperCase() || "FR"}
          </AvatarFallback>
        </Avatar>
        <p className="text-lg font-medium ml-5">{friend.username}</p>
      </div>
      <Button
        variant="outline"
        className="text-red-700 border-black"
        onClick={HandleRemoveFriend}
      >
        Remove
      </Button>
    </div>
  );
};
