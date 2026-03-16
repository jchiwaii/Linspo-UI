import { redirect } from "next/navigation";
import { dashboardLibrary } from "@/lib/dashboard-library";

export default function DashboardsIndex() {
  const first = dashboardLibrary[0];
  if (first) redirect(`/dashboards/${first.slug}`);
  return null;
}
