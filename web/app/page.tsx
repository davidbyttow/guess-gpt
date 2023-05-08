"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  if (typeof window !== "undefined") {
    router.push("/create");
  }

  return <></>;
}
