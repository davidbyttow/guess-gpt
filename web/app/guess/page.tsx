"use client";

import { Spacer } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { chat, ChatMessage } from "../../api/api";
import { useRouter } from "next/navigation";
import FullScreen from "../../components/FullScreen";
import Chat from "../../components/Chat";
import useWindowHeight from "../../hooks/useWindowHeight";

export default function Page() {
  const router = useRouter();
  const windowHeight = useWindowHeight();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uuidv4(),
      role: "assistant",
      content:
        "Let's play a game. I'm a public figure and have to guess who I am by only asking 'Yes/No' questions. You can ask me up to ten questions. You can guess at any time, but if you're wrong, the game is over. Hint: I may not be alive today",
    },
  ]);

  return (
    <FullScreen>
      <Spacer></Spacer>
      <Chat
        messages={messages}
        setMessages={setMessages}
        placeholder="Ask or guess who"
        chatApi={chat}
      />
    </FullScreen>
  );
}
