import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Linspo UI · Dashboard Library",
  description: "Browse production-ready dashboard layouts for React and Next.js. Preview live, copy full source or individual components.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
