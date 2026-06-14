import { CLI_TOOLS } from "@/shared/constants/cliTools";
import { notFound } from "next/navigation";
import ToolDetailClient from "../components/ToolDetailClient";

export default async function CliCodeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tool = CLI_TOOLS[id];
  if (!tool || tool.category !== "code") notFound();
  return <ToolDetailClient toolId={id} category="code" />;
}
