import React from "react";
import { Box, Text, VStack, Flex } from "@chakra-ui/react";

const MessagesList = ({ messages }) => {
  return (
    <>
      {messages.map((message, index) => (
        <Flex key={index} alignSelf="flex-start" flexDirection="column">
          <Text
            fontSize="sm"
            fontWeight={message.role === "user" ? "bold" : "medium"}
            color={message.role === "user" ? "whatsapp.500" : "red.500"}
          >
            {message.role === "user" ? "Me" : "Someone"}
          </Text>
          <Box
            key={index}
            color="gray.700"
            px={2}
            borderLeftWidth={2}
            borderLeftColor={
              message.role === "user" ? "whatsapp.500" : "red.500"
            }
            alignContent={message.role === "user" ? "flex-end" : "flex-start"}
            borderRadius={0}
          >
            <Text wordBreak="break-word">{message.content}</Text>
          </Box>
        </Flex>
      ))}
    </>
  );
};

export default MessagesList;
