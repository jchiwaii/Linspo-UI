"use client";

import { usePathname } from "next/navigation";
import LinspoNavBar from "@/components/Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();

  // Hide navbar on individual component pages
  // Show navbar on home page, components listing page, and demo page
  const shouldShowNavbar =
    pathname === "/" ||
    pathname === "/components" ||
    pathname === "/demo" ||
    pathname.startsWith("/components/[");

  // Don't show navbar on individual component showcase pages
  const isComponentPage =
    pathname.startsWith("/components/") && pathname !== "/components";

  if (isComponentPage) {
    return null;
  }

  return <LinspoNavBar />;
}
