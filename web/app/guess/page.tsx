"use client";

import { VStack, Flex, Box } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { ChatMessage } from "../../api/api";
import { useRouter } from "next/navigation";
import Chat from "../../components/Chat";

export default function Page() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uuidv4(),
      role: "assistant",
      content:
        "Can you guess who I am? You can ask me Yes/No questions or guess who I am. If you guess wrong or ask more than 10 questions, the game is over.",
    },
  ]);

  return (
    <Flex h="100vh" w="100%" justifyContent="center" alignItems="center">
      <VStack w="80%" h="80%" maxW={800} justifyContent="flex-end">
        <Chat messages={messages} setMessages={setMessages} />
      </VStack>
    </Flex>
  );
}
