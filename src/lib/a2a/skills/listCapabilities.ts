/**
 * A2A Skill: List Capabilities
 *
 * Returns the full catalog of 42 OmniRoute agent skills (22 API + 20 CLI)
 * as a markdown table with raw SKILL.md URLs for orchestrating agents.
 */

import type { A2ATask, TaskArtifact } from "../taskManager";
import { getCatalog, computeCoverage } from "@/lib/agentSkills/catalog";
import type { AgentSkill } from "@/lib/agentSkills/types";

export interface ListCapabilitiesResult {
  artifacts: TaskArtifact[];
  metadata: {
    coverage: {
      api: { have: number; total: 22 };
      cli: { have: number; total: 20 };
    };
    totalSkills: 42;
    generatedAt: string;
    source: "agent-skills-catalog";
  };
}

function buildMarkdownTable(skills: AgentSkill[]): string {
  const header = "| ID | Name | Category | Area | Endpoints/Commands | Raw URL |";
  const separator = "| --- | --- | --- | --- | --- | --- |";

  const rows = skills.map((skill) => {
    const endpointsOrCommands =
      skill.category === "api"
        ? (skill.endpoints ?? []).join(", ") || "—"
        : (skill.cliCommands ?? []).join(", ") || "—";

    return `| ${skill.id} | ${skill.name} | ${skill.category} | ${skill.area} | ${endpointsOrCommands} | ${skill.rawUrl} |`;
  });

  return [header, separator, ...rows].join("\n");
}

export async function executeListCapabilities(_task: A2ATask): Promise<ListCapabilitiesResult> {
  const catalog = getCatalog();
  const coverage = computeCoverage();

  const table = buildMarkdownTable(catalog);

  const content = [
    `# OmniRoute Agent Skills Catalog`,
    ``,
    `Total: ${catalog.length} skills (${coverage.api.total} API + ${coverage.cli.total} CLI)`,
    ``,
    table,
  ].join("\n");

  return {
    artifacts: [
      {
        type: "text",
        content,
      },
    ],
    metadata: {
      coverage: {
        api: { have: coverage.api.have, total: 22 },
        cli: { have: coverage.cli.have, total: 20 },
      },
      totalSkills: 42,
      generatedAt: coverage.generatedAt,
      source: "agent-skills-catalog",
    },
  };
}
