import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { VStack } from "@chakra-ui/react";

import { chat, ChatMessage } from "../api/api";
import MessagesList from "./MessagesList";
import InputBox from "./InputBox";

const Chat = ({ messages, setMessages }) => {
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (message: ChatMessage) => {
    setMessages((prevMessages: [ChatMessage]) => [...prevMessages, message]);
  };

  const handleInputMessageChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (inputMessage.trim() === "") return;
    if (isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage("");
    await handleChat(userMessage);
  };

  const handleChat = async (message: string) => {
    setMessages([
      ...messages,
      { id: uuidv4(), role: "user", content: message },
    ]);

    try {
      setIsLoading(true);
      const chatResponse = await chat({
        messages: [
          ...messages,
          { id: uuidv4(), role: "user", content: message },
        ],
      });

      const newMessages = chatResponse.messages.filter(
        (responseMessage) =>
          responseMessage.role === "assistant" &&
          !messages.some(
            (existingMessage) => existingMessage.id === responseMessage.id
          )
      );
      newMessages.forEach((m) => addMessage(m));
    } catch (error) {
      console.error("Error in handling conversation: ", error);
      console.error("Error details: ", error.response.data);
      addMessage({
        id: uuidv4(),
        role: "assistant",
        content: "Sorry, something went wrong. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <VStack spacing={3} width="80%" maxWidth={800} overflowY="auto">
      <MessagesList messages={messages} />
      <InputBox
        inputMessage={inputMessage}
        isLoading={isLoading}
        onInputChange={handleInputMessageChange}
        onKeyDown={handleKeyDown}
        onSubmit={handleSubmit}
        placeholder={"Ask a yes/no question or guess who I am..."}
      />
    </VStack>
  );
};

export default Chat;
