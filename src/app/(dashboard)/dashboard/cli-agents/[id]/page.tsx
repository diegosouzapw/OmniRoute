import { CLI_TOOLS } from "@/shared/constants/cliTools";
import { notFound } from "next/navigation";
import ToolDetailClient from "../../cli-code/components/ToolDetailClient";

export default async function CliAgentsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tool = CLI_TOOLS[id];
  if (!tool || tool.category !== "agent") notFound();
  return <ToolDetailClient toolId={id} category="agent" />;
}
