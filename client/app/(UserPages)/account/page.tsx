"use client";

import UserFriendsList from "@/components/user_profile/UserFriendsList";
import UserPosts from "@/components/user_profile/UserPosts";
import { useAuth } from "@/Utils/Auth";
import ProtectedRoute from "@/Utils/ProtectedRoute";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";

const UserAccountPage = () => {
  const { user } = useAuth();
  const [showPosts, setshowPosts] = useState(true);

  console.log({ user });

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col justify-start items-center w-full">
        {/* cover image container */}
        <div className="info-container w-[90%] lg:w-[60%] sm:h-[20vh] md:h-[30vh] lg:h-[35vh] flex justify-center items-end relative rounded-xl mt-5 shadow-md border-2 border-gray-300 bg-gradient-to-r from-red-700 to-orange-500">
          {/* <img
            src=""
            alt="cover image"
            className="w-full h-full object-cover rounded-xl brightness-75"
          /> */}
          {/* avatar container */}
          <div className="avatar-container absolute left-0 bottom-[-3rem] w-28 h-28">
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

          {/* edit button */}
          <Link
            href="/account/update"
            className="absolute right-5 top-5 text-black bg-white rounded-full p-2 shadow-lg text-xl border-2 border-black"
          >
            <FiEdit2 />
          </Link>
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
