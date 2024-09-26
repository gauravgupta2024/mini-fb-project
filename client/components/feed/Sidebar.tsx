import React from "react";
import CreatePostModal from "./sidebar/CreatePostModal";
import { IoSearchOutline } from "react-icons/io5";
import { FaRegCompass } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { MdAccountBox } from "react-icons/md";

const Sidebar = () => {
  return (
    <ul className="flex flex-col justify-start items-start w-full h-full bg-blue-100">
      <CreatePostModal />
      <li className="sidebar-list-item text-left">
        <IoSearchOutline className="mr-3 text-[1.6rem]" /> Search Post
      </li>
      <li className="sidebar-list-item text-left">
        <FaRegCompass className="mr-3 text-[1.6rem]" /> My Feed
      </li>
      <li className="sidebar-list-item text-left">
        <MdAccountBox className="mr-3 text-[1.6rem]" /> My Account
      </li>
      <li className="sidebar-list-item text-left">
        <FiEdit2 className="mr-3 text-[1.6rem]" /> Edit Account
      </li>
    </ul>
  );
};

export default Sidebar;
