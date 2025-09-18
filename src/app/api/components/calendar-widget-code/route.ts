import { NextResponse } from "next/server";

export async function GET() {
  const code = `"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar, Clock, MapPin } from "lucide-react";

interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  location?: string;
  type: "meeting" | "deadline" | "event" | "reminder";
}

interface CalendarWidgetProps {
  events?: Event[];
  title?: string;
  subtitle?: string;
  className?: string;
}

const defaultEvents: Event[] = [
  {
    id: "1",
    title: "Team Standup",
    date: new Date(2025, 0, 15),
    time: "09:00",
    location: "Conference Room A",
    type: "meeting",
  },
  {
    id: "2",
    title: "Project Deadline",
    date: new Date(2025, 0, 18),
    time: "17:00",
    type: "deadline",
  },
  {
    id: "3",
    title: "Client Presentation",
    date: new Date(2025, 0, 22),
    time: "14:30",
    location: "Zoom",
    type: "meeting",
  },
  {
    id: "4",
    title: "Design Review",
    date: new Date(2025, 0, 25),
    time: "11:00",
    location: "Design Studio",
    type: "event",
  },
];

export default function CalendarWidget({
  events = defaultEvents,
  title = "Calendar",
  subtitle = "Upcoming events and deadlines",
  className = "",
}: CalendarWidgetProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.getDate() === date.getDate() &&
      event.date.getMonth() === date.getMonth() &&
      event.date.getFullYear() === date.getFullYear()
    );
  };

  const getEventTypeColor = (type: Event["type"]) => {
    switch (type) {
      case "meeting": return "bg-blue-500";
      case "deadline": return "bg-red-500";
      case "event": return "bg-green-500";
      case "reminder": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={\`empty-\${i}\`} className="h-10"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const dayEvents = getEventsForDate(date);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = selectedDate?.toDateString() === date.toDateString();

      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(date)}
          className={\`relative h-10 w-full rounded-lg text-sm font-medium transition-all duration-200 hover:bg-gray-100 \${
            isToday ? "bg-gray-900 text-white hover:bg-gray-800" : ""
          } \${
            isSelected ? "ring-2 ring-gray-400" : ""
          }\`}
        >
          {day}
          {dayEvents.length > 0 && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {dayEvents.slice(0, 3).map((event, index) => (
                <div
                  key={index}
                  className={\`w-1 h-1 rounded-full \${getEventTypeColor(event.type)}\`}
                />
              ))}
            </div>
          )}
        </button>
      );
    }

    return days;
  };

  const upcomingEvents = events
    .filter(event => event.date >= new Date())
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 4);

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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar */}
          <div className="bg-white/60 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-6 hover:bg-white/80 hover:border-gray-300/60 hover:shadow-xl transition-all duration-500">
            {/* Calendar Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
              </h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => navigateMonth("prev")}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => navigateMonth("next")}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Days of week */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map(day => (
                <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-gray-500">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1">
              {renderCalendarDays()}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white/60 backdrop-blur-sm border border-gray-200/60 rounded-2xl p-6 hover:bg-white/80 hover:border-gray-300/60 hover:shadow-xl transition-all duration-500">
            <div className="flex items-center space-x-2 mb-6">
              <Calendar size={20} className="text-gray-700" />
              <h3 className="text-xl font-semibold text-gray-900">Upcoming Events</h3>
            </div>

            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50/80 transition-colors duration-200"
                  style={{ animationDelay: \`\${index * 100}ms\` }}
                >
                  <div className={\`w-3 h-3 rounded-full \${getEventTypeColor(event.type)} mt-2 flex-shrink-0\`} />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {event.title}
                    </h4>
                    <div className="flex items-center space-x-4 mt-1 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Clock size={12} />
                        <span>{event.time}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center space-x-1">
                          <MapPin size={12} />
                          <span className="truncate">{event.location}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {event.date.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
