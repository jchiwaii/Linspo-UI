import type { Metadata } from "next";
import LinspoNavBar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Linspo UI - Open Source Visualization Components",
  description:
    "Linspo UI — elegant, open-source web visualization components for dashboards and data apps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LinspoNavBar />
        {children}
      </body>
    </html>
  );
}
