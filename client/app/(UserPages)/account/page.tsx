"use client";

import UserFriendsList from "@/components/user/UserFriendsList";
import UserPosts from "@/components/user/UserPosts";
import { useAuth } from "@/Utils/Auth";
import ProtectedRoute from "@/Utils/ProtectedRoute";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import React, { useState } from "react";

const UserAccountPage = () => {
  const { user } = useAuth();
  const [showPosts, setshowPosts] = useState(true);

  console.log({ user });

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col justify-start items-center w-full">
        <div className="info-container w-[60%] sm:h-[20vh] md:h-[30vh] lg:h-[35vh] flex justify-center items-end relative rounded-xl mt-5">
          <img
            src="https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="cover image"
            className="w-full h-full object-cover rounded-xl brightness-75"
          />
          <div className="avatar-container absolute left-0 bottom-[-3rem] w-28   h-28 ">
            <Avatar>
              <AvatarImage
                src={
                  user?.avatar.url === "sample url"
                    ? "/default_avatar.png"
                    : user?.avatar.url
                }
              />
              <AvatarFallback>
                {user?.username.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        <div className="post-container mt-3 w-full flex flex-col justify-start items-center">
          <div className="post-info-block bg-gray-200 flex justify-center items-center rounded-xl border-2 border-black overflow-hidden">
            <button
              className={`border-r-2 border-black ${
                showPosts ? "bg-slate-900 text-white" : ""
              }`}
              onClick={() => setshowPosts(true)}
            >
              <p>{user?.posts?.length}</p> Posts
            </button>

            <button
              className={`${!showPosts && "bg-slate-900 text-white"}`}
              onClick={() => setshowPosts(false)}
            >
              <p>{user?.friends?.length}</p> Friends
            </button>
          </div>

          {showPosts ? <UserPosts /> : <UserFriendsList />}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default UserAccountPage;
