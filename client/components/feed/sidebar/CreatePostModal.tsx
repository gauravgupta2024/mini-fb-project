import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import React from "react";
import { TabsList, TabsTrigger, TabsContent, Tabs } from "../../ui/tabs";
import PostText from "../../forms/PostText";
import PostImage from "../../forms/PostImage";
import PostVideo from "../../forms/PostVideo";
import { MdAddPhotoAlternate } from "react-icons/md";

const CreatePostModal = () => {
  return (
    <Dialog>
      <DialogTrigger className="w-full">
        <li className="sidebar-list-item text-left">
          <MdAddPhotoAlternate className="mr-2 text-[1.7rem]" /> Create Post
        </li>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black rounded-md border-2 border-gray-300 p-4 shadow-lg w-[90%] lg:w-[70%] xl:w-[40%] min-h-[20vh] flex flex-col justify-start items-center">
        <Tabs
          defaultValue="video"
          className="w-full h-full flex flex-col justify-between items-center"
        >
          <TabsList className="bg-slate-800 mb-2">
            <TabsTrigger value="video">Post Video</TabsTrigger>
            <TabsTrigger value="photo">Post Photo</TabsTrigger>
            <TabsTrigger value="text">Feeling/Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="video" className="w-full h-full">
            <PostVideo />
          </TabsContent>

          <TabsContent value="photo" className="w-full h-full">
            <PostImage />
          </TabsContent>

          <TabsContent value="text" className="w-full h-full">
            <PostText />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostModal;
