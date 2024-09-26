import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import InputControl from "./InputControl";

const PostVideo = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [postCaption, setPostCaption] = useState<string>("");
  const [videoFile, setVideoFile] = useState<File | null>(null);

  const HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ videoFile, postCaption });
  };

  return (
    <form
      className="h-full w-full flex flex-col justify-between items-center"
      onSubmit={HandleSubmit}
    >
      {/* post video file block */}
      <div
        className="file-upload-block"
        onClick={() => inputRef.current?.click()}
      >
        <p>Drag and drop your video here</p>
        <p>or</p>
        <p>Click to browse</p>
      </div>

      {/* add file input */}
      <input
        type="file"
        accept="video/*"
        hidden
        ref={inputRef}
        onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
      />

      {/* add caption block */}
      <div className="w-[30vw] my-3">
        <InputControl
          label="Caption"
          type="text"
          value={postCaption}
          setValue={setPostCaption}
          isRequired={true}
          showLabel={false}
        />
      </div>

      <Button
        className="bg-blue-600 text-white hover:bg-blue-700"
        type="submit"
      >
        Post Video
      </Button>
    </form>
  );
};

export default PostVideo;
