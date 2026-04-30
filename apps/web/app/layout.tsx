import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pany Kids Studio",
  description:
    "5-Year Family Learning System · 2026—2031 · Tech, English, Finance, Critical Thinking, Business, Life Experience for kids 6-16.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
