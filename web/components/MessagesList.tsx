import React from "react";
import { useRouter } from "next/navigation";
import { Button, Box, Text, VStack, Flex, Link } from "@chakra-ui/react";

const MessagesList = ({ messages, assistantName }) => {
  const router = useRouter();
  return (
    <>
      {messages.map((message, index) => (
        <Flex key={index} alignSelf="flex-start" flexDirection="column">
          <Text
            fontSize="sm"
            fontWeight={message.role === "user" ? "bold" : "medium"}
            color={message.role === "user" ? "whatsapp.500" : "red.500"}
          >
            {message.role === "user" ? "Me" : assistantName}
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
          {message.link && (
            <Button
              colorScheme="whatsapp"
              size="sm"
              alignSelf={"flex-start"}
              type="submit"
              borderRadius={2}
              margin={2}
              onClick={() => router.push(message.link)}
            >
              {message.data["linkText"] ? message.data["linkText"] : "Play"}
            </Button>
          )}
        </Flex>
      ))}
    </>
  );
};

export default MessagesList;
