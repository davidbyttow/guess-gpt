"use client";

import { Spacer } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { chat, ChatMessage } from "../../api/api";
import FullScreen from "../../components/FullScreen";
import Chat from "../../components/Chat";
import { useRouter } from "next/navigation";

const Page = () => {
  const params = new URLSearchParams(window.location.search);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: uuidv4(),
      role: "assistant",
      content:
        "I'd like to play a game. I'm a publicly known person (dead or alive) and must guess who I am by only asking 'Yes' or 'No' questions. You can ask me up to ten questions. You can guess at any time, but if you're wrong, the game is over.",
    },
  ]);
  const encryptedPerson = params.get("key");
  console.log(encryptedPerson);
  if (!encryptedPerson) {
    const router = useRouter();
    router.push("/");
    return <></>;
  }

  return (
    <FullScreen>
      <Spacer></Spacer>
      <Chat
        messages={messages}
        setMessages={setMessages}
        placeholder="Ask or guess who"
        chatApi={chat}
        person="Someone"
        encryptedPerson={encryptedPerson}
      />
    </FullScreen>
  );
};

export default Page;
