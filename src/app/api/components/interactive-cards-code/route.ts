import { NextResponse } from "next/server";

export async function GET() {
  const code = `"use client";

import React, { useState } from "react";
import { ArrowRight, Star, Heart, Share2, Bookmark } from "lucide-react";

interface Card {
  id: string;
  title: string;
  description: string;
  category: string;
  image?: string;
  stats?: {
    likes: number;
    shares: number;
    bookmarks: number;
  };
}

interface InteractiveCardsProps {
  cards?: Card[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const defaultCards: Card[] = [
  {
    id: "design-system",
    title: "Modern Design System",
    description: "A comprehensive design system built for scalability and consistency across all platforms.",
    category: "Design",
    stats: { likes: 124, shares: 32, bookmarks: 89 },
  },
  {
    id: "api-architecture",
    title: "API Architecture",
    description: "Robust and scalable API design patterns for modern web applications and microservices.",
    category: "Development",
    stats: { likes: 98, shares: 45, bookmarks: 67 },
  },
  {
    id: "user-experience",
    title: "User Experience Research",
    description: "Data-driven insights into user behavior and interaction patterns for optimal UX design.",
    category: "Research",
    stats: { likes: 156, shares: 28, bookmarks: 112 },
  },
  {
    id: "performance",
    title: "Performance Optimization",
    description: "Advanced techniques for optimizing web performance and delivering exceptional user experiences.",
    category: "Engineering",
    stats: { likes: 203, shares: 67, bookmarks: 145 },
  },
];

export default function InteractiveCards({
  cards = defaultCards,
  title = "Featured Projects",
  subtitle = "Explore our latest work and innovative solutions",
  className = "",
}: InteractiveCardsProps) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [likedCards, setLikedCards] = useState<Set<string>>(new Set());
  const [bookmarkedCards, setBookmarkedCards] = useState<Set<string>>(new Set());

  const handleLike = (cardId: string) => {
    setLikedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const handleBookmark = (cardId: string) => {
    setBookmarkedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  return (
    <section
      className={\`relative bg-gradient-to-br from-white via-gray-50/80 to-white py-24 \${className}\`}
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:60px_60px] opacity-30"></div>

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4 text-gray-900">
            {title}
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className={\`group relative bg-white/60 backdrop-blur-sm border border-gray-200/60 rounded-2xl overflow-hidden hover:bg-white/80 hover:border-gray-300/60 hover:shadow-2xl transition-all duration-500 \${
                hoveredCard === card.id ? "scale-[1.02]" : ""
              }\`}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                transitionDelay: \`\${index * 100}ms\`,
              }}
            >
              {/* Category Badge */}
              <div className="absolute top-6 left-6 z-10">
                <span className="px-3 py-1 bg-gray-900/80 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                  {card.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="mb-6">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-black transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {card.description}
                  </p>
                </div>

                {/* Stats and Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200/60">
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => handleLike(card.id)}
                      className={\`flex items-center space-x-2 text-sm transition-all duration-300 \${
                        likedCards.has(card.id)
                          ? "text-red-600"
                          : "text-gray-500 hover:text-red-600"
                      }\`}
                    >
                      <Heart
                        size={16}
                        className={\`transition-all duration-300 \${
                          likedCards.has(card.id) ? "fill-current scale-110" : ""
                        }\`}
                      />
                      <span>{card.stats?.likes || 0}</span>
                    </button>

                    <button className="flex items-center space-x-2 text-sm text-gray-500 hover:text-blue-600 transition-colors duration-300">
                      <Share2 size={16} />
                      <span>{card.stats?.shares || 0}</span>
                    </button>

                    <button
                      onClick={() => handleBookmark(card.id)}
                      className={\`flex items-center space-x-2 text-sm transition-all duration-300 \${
                        bookmarkedCards.has(card.id)
                          ? "text-yellow-600"
                          : "text-gray-500 hover:text-yellow-600"
                      }\`}
                    >
                      <Bookmark
                        size={16}
                        className={\`transition-all duration-300 \${
                          bookmarkedCards.has(card.id) ? "fill-current scale-110" : ""
                        }\`}
                      />
                      <span>{card.stats?.bookmarks || 0}</span>
                    </button>
                  </div>

                  <button className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-black transition-all duration-300 group-hover:translate-x-1">
                    <span>View Details</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-gray-300/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Bottom accent */}
        <div className="mt-16 flex justify-center">
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gray-400/60 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}`;

  return NextResponse.json({ code });
}
