import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "Mentor — AI Coding Mentor That Teaches You to Think",
  description:
    "An AI coding mentor that teaches, not just generates code. Active prediction, progressive server-controlled hints, and explain-back comprehension.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#0a0e1a] text-[#f1f5f9]">
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
