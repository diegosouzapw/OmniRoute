import path from "node:path";
import os from "node:os";

export interface DoctorCheckResult {
  name: string;
  status: "ok" | "warn" | "fail";
  message: string;
  details: Record<string, unknown>;
}

export async function collectCliToolChecks(): Promise<DoctorCheckResult[]> {
  const { detectAllTools } = await import("../tool-detector.js");
  const tools = await detectAllTools();

  return tools.map((tool) => {
    if (!tool.installed) {
      return {
        name: `CLI: ${tool.name}`,
        status: "warn" as const,
        message: `${tool.name} not installed`,
        details: { id: tool.id, installed: false },
      };
    }

    if (!tool.configured) {
      return {
        name: `CLI: ${tool.name}`,
        status: "warn" as const,
        message: `${tool.name} not configured for OmniRoute`,
        details: { id: tool.id, configured: false },
      };
    }

    return {
      name: `CLI: ${tool.name}`,
      status: "ok" as const,
      message: `${tool.name} configured`,
      details: { id: tool.id, configured: true },
    };
  });
}
