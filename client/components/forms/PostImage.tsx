import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import InputControl from "./InputControl";

const PostImage = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [postCaption, setPostCaption] = useState<string>("");

  const HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      className="h-full w-full flex flex-col justify-between items-center"
      onSubmit={HandleSubmit}
    >
      {/* post Image file block */}
      <div
        className="file-upload-block"
        onClick={() => inputRef.current?.click()}
      >
        <p>Drag and drop your Image here</p>
        <p>or</p>
        <p>Click to browse</p>
      </div>

      {/* add file input */}
      <input type="file" accept="Image/*" hidden ref={inputRef} />

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
        Post Image
      </Button>
    </form>
  );
};

export default PostImage;
