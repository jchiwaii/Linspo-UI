import { notFound } from "next/navigation";
import { getDashboard } from "@/lib/dashboard-library";
import DashboardViewer from "@/components/library/dashboard-viewer";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function DashboardPage({ params }: Props) {
  const { slug } = await params;
  const dashboard = getDashboard(slug);
  if (!dashboard) notFound();
  return <DashboardViewer dashboard={dashboard} />;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const dashboard = getDashboard(slug);
  if (!dashboard) return {};
  return {
    title: `${dashboard.name} · Linspo UI`,
    description: dashboard.description,
  };
}
