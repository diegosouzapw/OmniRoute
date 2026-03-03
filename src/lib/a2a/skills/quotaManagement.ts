/**
 * A2A Skill: Quota Management
 *
 * Handles natural-language queries about provider quotas and
 * returns structured responses with actionable data.
 */

import type { A2ATask, TaskArtifact } from "../taskManager";

const OMNIROUTE_BASE_URL = process.env.OMNIROUTE_BASE_URL || "http://localhost:20128";
const OMNIROUTE_API_KEY = process.env.OMNIROUTE_API_KEY || "";

async function quotaFetch(path: string): Promise<any> {
  const url = `${OMNIROUTE_BASE_URL}${path}`;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(OMNIROUTE_API_KEY ? { Authorization: `Bearer ${OMNIROUTE_API_KEY}` } : {}),
  };
  const res = await fetch(url, { headers, signal: AbortSignal.timeout(10000) });
  if (!res.ok) throw new Error(`API [${res.status}]`);
  return res.json();
}

export interface QuotaManagementResult {
  artifacts: TaskArtifact[];
  metadata: Record<string, unknown>;
}

export async function executeQuotaManagement(task: A2ATask): Promise<QuotaManagementResult> {
  const query = task.input.messages[task.input.messages.length - 1]?.content?.toLowerCase() || "";

  const [quotaRaw, combosRaw] = await Promise.allSettled([
    quotaFetch("/api/usage/quota"),
    quotaFetch("/api/combos"),
  ]);

  const quota = quotaRaw.status === "fulfilled" ? (quotaRaw.value as any) : {};
  const combos = combosRaw.status === "fulfilled" ? (combosRaw.value as any[]) : [];
  const providers: any[] = quota?.providers || (Array.isArray(quota) ? quota : []);

  // Query classification
  if (query.includes("ranking") || query.includes("most quota") || query.includes("best")) {
    const sorted = [...providers].sort(
      (a, b) => b.quotaTotal - b.quotaUsed - (a.quotaTotal - a.quotaUsed)
    );
    return {
      artifacts: [
        {
          type: "text",
          content: `**Quota Ranking (most available first):**\n${sorted.map((p, i) => `${i + 1}. **${p.provider}** — ${(p.quotaTotal - p.quotaUsed).toLocaleString()} remaining (${Math.round(((p.quotaTotal - p.quotaUsed) / (p.quotaTotal || 1)) * 100)}%)`).join("\n")}`,
        },
      ],
      metadata: { queryType: "ranking", providers: sorted.map((p) => p.provider) },
    };
  }

  if (query.includes("free") || query.includes("suggest")) {
    const freeCombos = combos.filter((c: any) => {
      const name = (c.name || "").toLowerCase();
      return name.includes("free") || name.includes("gratis");
    });
    return {
      artifacts: [
        {
          type: "text",
          content:
            freeCombos.length > 0
              ? `**Free combos available:**\n${freeCombos.map((c: any) => `- **${c.name}** (ID: ${c.id})`).join("\n")}`
              : "No free combos configured. Consider adding providers with free tiers (Gemini, Groq, etc.).",
        },
      ],
      metadata: { queryType: "free_suggestion", freeCombos: freeCombos.length },
    };
  }

  // Default: general quota summary
  const totalUsed = providers.reduce((sum, p) => sum + (p.quotaUsed || 0), 0);
  const totalAvailable = providers.reduce((sum, p) => sum + (p.quotaTotal || 0), 0);
  const warnings = providers.filter((p) => p.quotaTotal && p.quotaUsed / p.quotaTotal > 0.9);

  return {
    artifacts: [
      {
        type: "text",
        content: `**Quota Summary (${providers.length} providers):**\n- Total used: ${totalUsed.toLocaleString()} / ${totalAvailable.toLocaleString()}\n${providers.map((p) => `- **${p.provider}:** ${p.quotaUsed?.toLocaleString() || 0} / ${p.quotaTotal?.toLocaleString() || "∞"} (${p.tokenStatus || "ok"})`).join("\n")}${warnings.length > 0 ? `\n\n⚠️ **Warning:** ${warnings.map((w) => w.provider).join(", ")} above 90% usage` : ""}`,
      },
    ],
    metadata: { queryType: "summary", providerCount: providers.length, warnings: warnings.length },
  };
}
