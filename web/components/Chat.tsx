import React, { useState, useRef, useLayoutEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { VStack } from "@chakra-ui/react";

import { ChatMessage } from "../api/api";
import MessagesList from "./MessagesList";
import InputBox from "./InputBox";

const Chat = ({
  messages,
  setMessages,
  chatApi,
  person = "AI",
  placeholder,
  encryptedPerson = "",
}) => {
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useLayoutEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages]);

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
      const chatResponse = await chatApi({
        messages: [
          ...messages,
          {
            id: uuidv4(),
            role: "user",
            content: message,
            data: { encryptedPerson },
          },
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
    <VStack width="100%" maxH="100%">
      <VStack width="100%" overflowY="scroll" ref={scrollRef}>
        <MessagesList messages={messages} assistantName={person} />
      </VStack>
      <InputBox
        ref={inputRef}
        inputMessage={inputMessage}
        isLoading={isLoading}
        onInputChange={handleInputMessageChange}
        onKeyDown={handleKeyDown}
        onSubmit={handleSubmit}
        placeholder={placeholder}
      />
    </VStack>
  );
};

export default Chat;
