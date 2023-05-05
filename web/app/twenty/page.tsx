"use client";

import { VStack, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { ChatMessage } from "../../api/api";
import { useRouter } from "next/navigation";
import NewChat from "../../components/Chat";

export default function Page() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  return (
    <Flex
      height="100vh"
      width="100%"
      justifyContent="center"
      alignItems="center"
    >
      <VStack spacing={4} width="80%">
        <NewChat messages={messages} setMessages={setMessages} />
      </VStack>
    </Flex>
  );
}
