"use client";

import { ReactNode } from "react";

export default function Page({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full min-h-screen bg-background p-3">
      {children}
    </div>
  );
}
