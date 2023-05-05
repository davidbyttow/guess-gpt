"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Flex } from "@chakra-ui/react";

export default function Page() {
  const router = useRouter();
  if (typeof window !== "undefined") {
    router.push("/twenty");
  }

  return <Flex height="100vh"></Flex>;
}
