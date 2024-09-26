import React, { useRef, useState } from "react";
import { Button } from "../ui/button";
import InputControl from "./InputControl";

const PostText = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [postCaption, setPostCaption] = useState<string>("");

  const HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form
      className="h-full w-full flex justify-around items-center"
      onSubmit={HandleSubmit}
    >
      {/* add caption block */}
      <div className="w-[80%]">
        <InputControl
          label="Add your feeling or activity"
          type="text"
          value={postCaption}
          setValue={setPostCaption}
          isRequired={true}
        />
      </div>

      <Button
        className="bg-blue-600 text-white hover:bg-blue-700 mt-6"
        type="submit"
      >
        Post Blog
      </Button>
    </form>
  );
};

export default PostText;
