"use client";

import { VStack, Flex, Box, Spacer } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useWindowHeight from "../hooks/useWindowHeight";

const FullScreen = ({ children }) => {
  const windowHeight = useWindowHeight();

  return (
    <Flex
      minH={`${windowHeight}px`}
      w="100%"
      justifyContent="center"
      alignItems="center"
    >
      <VStack
        w="80%"
        h={`${windowHeight * 0.8}px`}
        maxW={800}
        justifyContent="flex-end"
      >
        {children}
      </VStack>
    </Flex>
  );
};

export default FullScreen;
