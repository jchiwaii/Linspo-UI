"use client";

import { ComponentDoc } from "@/components/docs/ComponentDoc";
import DataVisualization from "@/components/DataVisualization";

const code = `"use client";

import React, { useState } from "react";
import { Table2, ChevronUp, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface DataRow {
  id: number;
  name: string;
  email: string;
  status: "Active" | "Inactive" | "Pending";
  revenue: number;
  date: string;
}

interface DataVisualizationProps {
  data?: DataRow[];
  className?: string;
}

const defaultData: DataRow[] = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", status: "Active", revenue: 12450, date: "2024-01-15" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", status: "Active", revenue: 8920, date: "2024-01-14" },
  { id: 3, name: "Carol Davis", email: "carol@example.com", status: "Pending", revenue: 15680, date: "2024-01-13" },
  { id: 4, name: "David Wilson", email: "david@example.com", status: "Inactive", revenue: 5430, date: "2024-01-12" },
  { id: 5, name: "Eva Martinez", email: "eva@example.com", status: "Active", revenue: 21350, date: "2024-01-11" },
];

const statusStyles = {
  Active: "bg-chart-2/10 text-chart-2",
  Inactive: "bg-muted text-muted-foreground",
  Pending: "bg-chart-3/10 text-chart-3",
};

export function DataVisualization({ data = defaultData, className }: DataVisualizationProps) {
  const [sortKey, setSortKey] = useState<keyof DataRow>("id");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [search, setSearch] = useState("");

  const handleSort = (key: keyof DataRow) => {
    if (sortKey === key) { setSortDir(sortDir === "asc" ? "desc" : "asc"); }
    else { setSortKey(key); setSortDir("asc"); }
  };

  const filteredData = data.filter((row) =>
    row.name.toLowerCase().includes(search.toLowerCase()) ||
    row.email.toLowerCase().includes(search.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    const aVal = a[sortKey], bVal = b[sortKey];
    if (typeof aVal === "string" && typeof bVal === "string")
      return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    return sortDir === "asc" ? Number(aVal) - Number(bVal) : Number(bVal) - Number(aVal);
  });

  const SortIcon = ({ columnKey }: { columnKey: keyof DataRow }) => {
    if (sortKey !== columnKey) return null;
    return sortDir === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  return (
    <div className={cn("bg-card border border-border rounded-xl shadow-sm overflow-hidden", className)}>
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-chart-1/10 flex items-center justify-center">
            <Table2 size={20} className="text-chart-1" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Users</h3>
            <p className="text-sm text-muted-foreground">{filteredData.length} records</p>
          </div>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 bg-background border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {[
                { key: "name" as const, label: "Name" },
                { key: "email" as const, label: "Email" },
                { key: "status" as const, label: "Status" },
                { key: "revenue" as const, label: "Revenue" },
                { key: "date" as const, label: "Date" },
              ].map(({ key, label }) => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors"
                >
                  <div className="flex items-center gap-1">{label}<SortIcon columnKey={key} /></div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData.map((row) => (
              <tr key={row.id} className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors">
                <td className="px-4 py-3"><span className="font-medium text-foreground">{row.name}</span></td>
                <td className="px-4 py-3 text-muted-foreground">{row.email}</td>
                <td className="px-4 py-3">
                  <span className={\`px-2 py-0.5 rounded-full text-xs font-medium \${statusStyles[row.status]}\`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3"><span className="font-mono text-foreground">\${row.revenue.toLocaleString()}</span></td>
                <td className="px-4 py-3 text-muted-foreground">{row.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="px-4 py-3 border-t border-border bg-muted/30">
        <p className="text-sm text-muted-foreground">Showing {sortedData.length} of {data.length} entries</p>
      </div>
    </div>
  );
}`;

const props = [
  {
    name: "data",
    type: "DataRow[]",
    description: "Array of data rows with id, name, email, status, revenue, and date fields.",
  },
  {
    name: "className",
    type: "string",
    description: "Additional CSS classes to apply.",
  },
];

export default function DataVisualizationPage() {
  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <ComponentDoc
          title="Data Table"
          description="Interactive data tables with sorting, filtering, search, and clean modern styling for displaying structured data."
          code={code}
          category="Widgets"
          dependencies={["lucide-react"]}
          installCommand="npx linspo-ui add data-table"
          props={props}
        >
          <div className="w-full">
            <DataVisualization />
          </div>
        </ComponentDoc>
      </div>
    </div>
  );
}
