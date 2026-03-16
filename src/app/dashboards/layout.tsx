import { type ReactNode } from "react";
import { Sidebar } from "@/components/shell/sidebar";
import { ShellHeader } from "@/components/shell/header";

export default function DashboardsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <ShellHeader />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
