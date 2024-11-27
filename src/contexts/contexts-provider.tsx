"use client";
import React from "react";
import { ReactQueryProvider } from "./query-provider";
import { UserProvider } from "./user-context";

const contexts = [UserProvider, ReactQueryProvider];

export default function ContextsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return contexts.reduce((acc, Context) => {
    return <Context>{acc}</Context>;
  }, children);
}
