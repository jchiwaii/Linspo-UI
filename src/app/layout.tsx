import type { Metadata } from "next";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Linspo UI · Chart Component Library",
  description:
    "A chart-only UI library for React and Next.js. Clean, minimal, and copy-paste friendly data visualization components.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ConditionalNavbar />
        {children}
      </body>
    </html>
  );
}
