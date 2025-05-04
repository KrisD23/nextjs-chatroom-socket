"use client";
import React, { useState } from "react";

const ChatForm = ({
  onSendMessage,
}: {
  onSendMessage: (message: string) => void;
}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mt-4">
      <input
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        value={message}
        type="text"
        className="px-4 py-2 rounded border-2 flex-1"
        placeholder="Type your message..."
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Send
      </button>
    </form>
  );
};

export default ChatForm;
