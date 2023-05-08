"use client";

import { VStack, Flex, Box, Spacer } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { create, ChatMessage } from "../../api/api";
import FullScreen from "../../components/FullScreen";
import Chat from "../../components/Chat";

export default function Page() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uuidv4(),
      role: "assistant",
      content:
        "To create a new game for someone, name a public figure, alive or dead, that's well-known enough to be guessed.",
    },
  ]);

  return (
    <FullScreen>
      <Spacer></Spacer>
      <Chat
        messages={messages}
        setMessages={setMessages}
        placeholder="Name a person"
        chatApi={create}
      />
    </FullScreen>
  );
}
