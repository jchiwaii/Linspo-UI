import ChartDocsScreen from "@/components/library/chart-docs-screen";

export default async function CatchAllComponentPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug?.[0] ?? "";

  return <ChartDocsScreen slug={slug} />;
}
