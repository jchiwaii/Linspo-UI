import { NextResponse } from "next/server";

export async function GET() {
  const code = `"use client";

import React, { useState } from "react";
import { Home, User, Briefcase, Code, Mail, Menu, X } from "lucide-react";

interface NavLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

interface ModernNavBarProps {
  brandName?: string;
  brandInitials?: string;
  navLinks?: NavLink[];
  ctaText?: string;
  ctaHref?: string;
  className?: string;
}

const defaultNavLinks: NavLink[] = [
  { href: "#home", label: "Home", icon: <Home size={18} /> },
  { href: "#about", label: "About", icon: <User size={18} /> },
  { href: "#projects", label: "Projects", icon: <Briefcase size={18} /> },
  { href: "#skills", label: "Skills", icon: <Code size={18} /> },
  { href: "#contact", label: "Contact", icon: <Mail size={18} /> },
];

export default function ModernNavBar({
  brandName = "John Doe",
  brandInitials = "J",
  navLinks = defaultNavLinks,
  ctaText = "Let's Talk",
  ctaHref = "#contact",
  className = "fixed top-0 left-0 right-0", // Set fixed positioning by default
}: ModernNavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("#home");

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavClick = (href: string) => {
    setActiveSection(href);
    setIsOpen(false);
  };

  return (
    <nav
      className={\`z-50 bg-gradient-to-r from-white via-gray-50/80 to-white backdrop-blur-sm border-b border-gray-200/60 shadow-lg \${className}\`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <div className="group relative">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-900 to-black rounded-lg flex items-center justify-center shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105">
                <span className="text-white font-bold text-sm transition-transform duration-300 group-hover:scale-110">
                  {brandInitials}
                </span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-gray-900/20 to-black/20 rounded-lg opacity-0 group-hover:opacity-100 blur-md transition-all duration-300"></div>
            </div>
            {brandName && (
              <span className="font-semibold text-gray-900 hidden sm:block transition-colors duration-200 hover:text-black">
                {brandName}
              </span>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={\`group relative flex items-center space-x-1 px-4 py-2 text-sm font-medium transition-all duration-300 rounded-lg \${
                  activeSection === link.href
                    ? "text-black bg-white/80 shadow-md backdrop-blur-sm"
                    : "text-gray-600 hover:text-black hover:bg-white/60 hover:shadow-sm hover:backdrop-blur-sm"
                }\`}
              >
                <span
                  className={\`transition-all duration-300 \${
                    activeSection === link.href
                      ? "opacity-100 scale-110"
                      : "opacity-70 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-12"
                  }\`}
                >
                  {link.icon}
                </span>
                <span className="transition-all duration-200 group-hover:translate-x-0.5">
                  {link.label}
                </span>

                {/* Active indicator with glow */}
                {activeSection === link.href && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-black rounded-full shadow-sm"></div>
                )}

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/40 via-white/60 to-white/40 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm -z-10"></div>
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href={ctaHref}
              className="group relative inline-flex items-center px-6 py-2 text-sm font-medium text-white bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-800 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl overflow-hidden"
            >
              <span className="relative z-10 transition-all duration-200 group-hover:scale-105">
                {ctaText}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden group p-2 text-gray-600 hover:text-black transition-all duration-300 rounded-lg hover:bg-white/60 hover:shadow-sm"
          >
            <div className="relative w-6 h-6">
              {isOpen ? (
                <X
                  size={20}
                  className="absolute inset-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-90"
                />
              ) : (
                <Menu
                  size={20}
                  className="absolute inset-0 transition-all duration-300 group-hover:scale-110"
                />
              )}
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-b from-white via-gray-50/90 to-white backdrop-blur-sm border-t border-gray-200/60 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={\`group flex items-center space-x-3 px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg \${
                  activeSection === link.href
                    ? "text-black bg-white/80 shadow-md backdrop-blur-sm"
                    : "text-gray-600 hover:text-black hover:bg-white/60 hover:shadow-sm"
                }\`}
              >
                <span
                  className={\`transition-all duration-300 \${
                    activeSection === link.href
                      ? "opacity-100 scale-110"
                      : "opacity-70 group-hover:opacity-100 group-hover:scale-110 group-hover:rotate-12"
                  }\`}
                >
                  {link.icon}
                </span>
                <span className="transition-all duration-200 group-hover:translate-x-1">
                  {link.label}
                </span>

                {/* Active indicator */}
                {activeSection === link.href && (
                  <div className="ml-auto w-2 h-2 bg-black rounded-full shadow-sm"></div>
                )}
              </a>
            ))}

            <div className="pt-3 mt-3 border-t border-gray-200/60">
              <a
                href={ctaHref}
                onClick={() => handleNavClick(ctaHref)}
                className="group flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-gray-900 to-black hover:from-black hover:to-gray-800 transition-all duration-300 rounded-lg shadow-lg"
              >
                <Mail
                  size={16}
                  className="transition-all duration-300 group-hover:scale-110 group-hover:-rotate-12"
                />
                <span className="transition-all duration-200 group-hover:scale-105">
                  {ctaText}
                </span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}`;

  return NextResponse.json({ code });
}
