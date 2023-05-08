"use client";

import React from "react";
import { useRouter } from "next/navigation";
import CreatePage from "./create/page";
import GuessPage from "./guess/page";

export default function Page() {
  const router = useRouter();
  const params = new URLSearchParams(window.location.search);
  const key = params.get("key");
  if (key) {
    return <GuessPage></GuessPage>;
  }
  return <CreatePage></CreatePage>;
}
