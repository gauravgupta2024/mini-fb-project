import { useGetUserFriendsQuery } from "@/redux/services/UserAPI";
import React from "react";

const UserFriendsList = () => {
  const { data } = useGetUserFriendsQuery();

  if (data?.success && data?.friends?.length > 0) {
    return <div>UserFriends</div>;
  } else {
    return (
      <div className="mt-10 text-xl font-medium">You have no friends yet!</div>
    );
  }
};

export default UserFriendsList;
