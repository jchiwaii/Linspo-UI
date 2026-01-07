"use client";

import { usePathname } from "next/navigation";
import LinspoNavBar from "@/components/Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();

  // Show navbar on all pages - it's fixed and consistent
  // The layout handles proper spacing with pt-16 on content
  return <LinspoNavBar currentPage={getCurrentPage(pathname)} />;
}

function getCurrentPage(pathname: string): string | undefined {
  if (pathname === "/components" || pathname.startsWith("/components/")) {
    return "components";
  }
  if (pathname === "/demo") {
    return "demo";
  }
  if (pathname === "/docs" || pathname.startsWith("/docs/")) {
    return "docs";
  }
  return undefined;
}
