"use client";
import ChatForm from "@/components/ChatForm";
import ChatMessage from "@/components/ChatMessage";
import React, { useEffect, useState } from "react";
import { socket } from "@/lib/socketClient";

const Home = () => {
  const [room, setRoom] = useState("");
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState<
    { sender: string; message: string }[]
  >([]);
  const [userName, setUserName] = useState("");
  const handleSendMessage = (message: string) => console.log(message);

  useEffect(() => {
    socket.on("user_joined", (message) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "System", message },
      ]);
    });

    return () => {
      socket.off("user_joined");
      socket.off("message");
    };
  }, []);
  const handleJoinRoom = () => {
    if (room && userName) {
      socket.emit("join_room", { room, username: userName });
      setJoined(true);
    }
  };

  return (
    <div className="flex mt-24 justify-center w-full flex-col px-20">
      {!joined ? (
        <div className="flex w-full max-w-3xl mx-auto flex-col items-center">
          <h1 className="mb-4 text-2xl font-bold">Join Room</h1>
          <input
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            type="text"
            className="px-4 py-2 rounded border-2 flex-1"
            placeholder="Enter your username"
          />
          <input
            onChange={(e) => setRoom(e.target.value)}
            value={room}
            type="text"
            className="px-4 py-2 rounded border-2 flex-1"
            placeholder="Enter room name/code"
          />
          <button
            onClick={handleJoinRoom}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Join
          </button>
        </div>
      ) : (
        <div className="w-full max-w-3xl mx-auto">
          <h1 className="mb-4 text-2xl font-bold">Room : 1</h1>

          <div className="h-[500px] overflow-y-auto p-4 mb-4 bg-gray-200 border-2 rounded-lg">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                message={message.message}
                sender={message.sender}
                isOwnMessage={message.sender === userName}
              />
            ))}
          </div>
          <ChatForm onSendMessage={handleSendMessage} />
        </div>
      )}
    </div>
  );
};

export default Home;
