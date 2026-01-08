"use client";

import { ComponentDoc } from "@/components/docs/ComponentDoc";
import CalendarWidget from "@/components/CalendarWidget";

const code = `"use client";

import React, { useState } from "react";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Event {
  date: Date;
  title: string;
  type?: "default" | "success" | "warning" | "danger";
}

interface CalendarWidgetProps {
  events?: Event[];
  className?: string;
}

const defaultEvents: Event[] = [
  { date: new Date(2024, 11, 5), title: "Team Meeting", type: "default" },
  { date: new Date(2024, 11, 10), title: "Product Launch", type: "success" },
  { date: new Date(2024, 11, 15), title: "Deadline", type: "warning" },
  { date: new Date(2024, 11, 20), title: "Review", type: "default" },
];

const typeColors = {
  default: "bg-chart-1",
  success: "bg-chart-2",
  warning: "bg-chart-3",
  danger: "bg-chart-5",
};

export function CalendarWidget({
  events = defaultEvents,
  className,
}: CalendarWidgetProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const getEventsForDate = (day: number) => events.filter((e) =>
    e.date.getFullYear() === year && e.date.getMonth() === month && e.date.getDate() === day
  );
  const isToday = (day: number) =>
    today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;

  return (
    <div className={cn("bg-card border border-border rounded-xl shadow-sm", className)}>
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
            <Calendar size={20} className="text-chart-1" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{monthNames[month]} {year}</h3>
            <p className="text-sm text-muted-foreground">{events.length} events</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={prevMonth} className="w-9 h-9 rounded-lg border border-border hover:bg-accent flex items-center justify-center transition-colors">
            <ChevronLeft size={18} />
          </button>
          <button onClick={nextMonth} className="w-9 h-9 rounded-lg border border-border hover:bg-accent flex items-center justify-center transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-7 mb-2">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">{day}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: firstDay }).map((_, index) => (
            <div key={\`empty-\${index}\`} className="aspect-square" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, index) => {
            const day = index + 1;
            const dayEvents = getEventsForDate(day);
            const isTodayDate = isToday(day);

            return (
              <div
                key={day}
                className={cn(
                  "aspect-square p-1 rounded-lg cursor-pointer transition-colors hover:bg-accent",
                  isTodayDate && "bg-primary/10 ring-1 ring-primary"
                )}
              >
                <div className="h-full flex flex-col">
                  <span className={cn("text-sm", isTodayDate ? "font-semibold text-primary" : "text-foreground")}>
                    {day}
                  </span>
                  {dayEvents.length > 0 && (
                    <div className="flex gap-0.5 mt-auto">
                      {dayEvents.slice(0, 3).map((event, i) => (
                        <div key={i} className={\`w-1.5 h-1.5 rounded-full \${typeColors[event.type || "default"]}\`} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-4 border-t border-border">
        <h4 className="text-sm font-medium text-foreground mb-3">Upcoming Events</h4>
        <div className="space-y-2">
          {events.slice(0, 3).map((event, index) => (
            <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-accent/50 transition-colors">
              <div className={\`w-2 h-2 rounded-full \${typeColors[event.type || "default"]}\`} />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{event.title}</p>
                <p className="text-xs text-muted-foreground">
                  {event.date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`;

const props = [
  {
    name: "events",
    type: "Event[]",
    description: "Array of events with date, title, and optional type for color coding.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes to apply.",
  },
];

export default function CalendarWidgetPage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <ComponentDoc
          title="Calendar Widget"
          description="Date-based data visualization and event timeline component with interactive navigation, event indicators, and upcoming events list."
          code={code}
          category="Widgets"
          dependencies={["lucide-react"]}
          installCommand="npx linspo-ui add calendar-widget"
          props={props}
        >
          <div className="w-full max-w-md">
            <CalendarWidget />
          </div>
        </ComponentDoc>
      </div>
    </div>
  );
}
