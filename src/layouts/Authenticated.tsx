"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

export const Authenticated = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLoading = status === "loading";

  useEffect(() => {
    if (!isLoading && !session) {
      router.push("/").catch(console.error);
    }
  }, [isLoading, session, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    // The component will return null initially, but the redirection will occur in useEffect.
    return null;
  }

  return <>{children}</>;
};