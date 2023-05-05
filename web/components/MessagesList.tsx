import React from "react";
import { Box, Text } from "@chakra-ui/react";

const MessagesList = ({ messages }) => {
  return (
    <>
      {messages.map((message, index) => (
        <Box
          key={index}
          alignSelf="flex-start"
          color="gray.700"
          px={2}
          borderLeftWidth={2}
          borderLeftColor={message.role === "user" ? "whatsapp.500" : "gray"}
          alignContent={message.role === "user" ? "flex-end" : "flex-start"}
          borderRadius={0}
        >
          <Text wordBreak="break-word">{message.content}</Text>
        </Box>
      ))}
    </>
  );
};

export default MessagesList;
