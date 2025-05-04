"use client";
import ChatForm from "@/components/ChatForm";
import React from "react";

const Home = () => {
  const handleSendMessage = (message: string) => console.log(message);
  return (
    <div className="flex mt-24 justify-center w-full flex-col px-20">
      <div className="text-center">
        <h1 className="text-3xl">Room : 1</h1>
      </div>
      <div>TODO : Add chat room</div>
      <ChatForm onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Home;
