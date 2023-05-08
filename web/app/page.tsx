"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  // TODO(d): I don't know why this was necessary and always rendering
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      router.push("/create");
    }
  }, []);
  return <></>;
}
