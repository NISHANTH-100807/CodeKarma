"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "./Sidebar";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  if (isLandingPage) {
    return <main className="min-h-screen bg-[#0a0e1a] text-slate-100">{children}</main>;
  }

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#0a0e1a] text-slate-100">
      <Sidebar />
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#0a0e1a]">
        {children}
      </main>
    </div>
  );
}
