"use client";

import React, { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalendarWidgetProps {
  initialDate?: Date;
  events?: { date: Date; title: string; type: "meeting" | "deadline" | "reminder" }[];
  className?: string;
}

const defaultEvents = [
  { date: new Date(2024, 11, 15), title: "Team Meeting", type: "meeting" as const },
  { date: new Date(2024, 11, 20), title: "Project Deadline", type: "deadline" as const },
  { date: new Date(2024, 11, 25), title: "Holiday", type: "reminder" as const },
];

export default function CalendarWidget({
  initialDate = new Date(),
  events = defaultEvents,
  className,
}: CalendarWidgetProps) {
  const [currentDate, setCurrentDate] = useState(initialDate);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December",
  ];

  const navigateMonth = (direction: number) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1)
    );
  };

  const hasEvent = (day: number) => {
    return events.some(
      (event) =>
        event.date.getDate() === day &&
        event.date.getMonth() === currentDate.getMonth() &&
        event.date.getFullYear() === currentDate.getFullYear()
    );
  };

  const getEventType = (day: number) => {
    const event = events.find(
      (e) =>
        e.date.getDate() === day &&
        e.date.getMonth() === currentDate.getMonth() &&
        e.date.getFullYear() === currentDate.getFullYear()
    );
    return event?.type;
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const eventColors = {
    meeting: "bg-chart-1",
    deadline: "bg-chart-2",
    reminder: "bg-chart-3",
  };

  return (
    <div className={cn("bg-card border border-border rounded-xl p-6 shadow-sm", className)}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
            <Calendar size={20} className="text-chart-1" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            <p className="text-sm text-muted-foreground">
              {events.length} events this month
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ChevronLeft size={20} className="text-muted-foreground" />
          </button>
          <button
            onClick={() => navigateMonth(1)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <ChevronRight size={20} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-muted-foreground py-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {blanks.map((_, index) => (
          <div key={`blank-${index}`} className="aspect-square" />
        ))}
        {days.map((day) => (
          <button
            key={day}
            onClick={() =>
              setSelectedDate(
                new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
              )
            }
            className={cn(
              "aspect-square rounded-lg flex flex-col items-center justify-center text-sm relative transition-all",
              isToday(day)
                ? "bg-primary text-primary-foreground font-semibold"
                : selectedDate?.getDate() === day &&
                  selectedDate?.getMonth() === currentDate.getMonth()
                ? "bg-muted text-foreground"
                : "hover:bg-muted text-foreground"
            )}
          >
            {day}
            {hasEvent(day) && (
              <div
                className={cn(
                  "w-1.5 h-1.5 rounded-full absolute bottom-1",
                  eventColors[getEventType(day) || "reminder"]
                )}
              />
            )}
          </button>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-chart-1" />
            <span className="text-muted-foreground">Meeting</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-chart-2" />
            <span className="text-muted-foreground">Deadline</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-chart-3" />
            <span className="text-muted-foreground">Reminder</span>
          </div>
        </div>
      </div>
    </div>
  );
}
