#!/usr/bin/env node
// Generates docs/reference/PROVIDER_REFERENCE.md from src/shared/constants/providers.ts.
// Run: node --import tsx/esm scripts/docs/gen-provider-reference.ts

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  FREE_PROVIDERS,
  OAUTH_PROVIDERS,
  WEB_COOKIE_PROVIDERS,
  APIKEY_PROVIDERS,
  LOCAL_PROVIDERS,
  SEARCH_PROVIDERS,
  AUDIO_ONLY_PROVIDERS,
  UPSTREAM_PROXY_PROVIDERS,
  CLOUD_AGENT_PROVIDERS,
  SYSTEM_PROVIDERS,
  IMAGE_ONLY_PROVIDER_IDS,
  AGGREGATOR_PROVIDER_IDS,
  ENTERPRISE_CLOUD_PROVIDER_IDS,
  VIDEO_PROVIDER_IDS,
  EMBEDDING_RERANK_PROVIDER_IDS,
  SELF_HOSTED_CHAT_PROVIDER_IDS,
} from "../../src/shared/constants/providers.ts";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..", "..");
const OUT_FILE = path.join(ROOT, "docs", "reference", "PROVIDER_REFERENCE.md");

type ProviderRecord = {
  id: string;
  alias?: string | undefined;
  name: string;
  icon?: string;
  color?: string;
  textIcon?: string;
  website?: string;
  authHint?: string;
  freeNote?: string;
  hasFree?: boolean;
  deprecated?: boolean;
  deprecationReason?: string;
  [k: string]: unknown;
};

function asRecords(map: Record<string, ProviderRecord>): ProviderRecord[] {
  return Object.values(map).map((p) => ({ ...p }));
}

function escapeCell(value: string | undefined): string {
  if (!value) return "—";
  return value.replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function row(p: ProviderRecord, category: string): string {
  const alias = p.alias ? `\`${p.alias}\`` : "—";
  const hint = p.deprecated
    ? `⚠️ **DEPRECATED.** ${escapeCell(p.deprecationReason)}`
    : escapeCell(p.authHint || p.freeNote);
  const link = p.website ? `[link](${p.website})` : "—";
  return `| \`${p.id}\` | ${alias} | ${escapeCell(p.name)} | ${category} | ${link} | ${hint} |`;
}

function categoryTags(id: string): string[] {
  const tags: string[] = [];
  if (IMAGE_ONLY_PROVIDER_IDS.has(id)) tags.push("image");
  if (VIDEO_PROVIDER_IDS.has(id)) tags.push("video");
  if (AGGREGATOR_PROVIDER_IDS.has(id)) tags.push("aggregator");
  if (ENTERPRISE_CLOUD_PROVIDER_IDS.has(id)) tags.push("enterprise");
  if (EMBEDDING_RERANK_PROVIDER_IDS.has(id)) tags.push("embed/rerank");
  if (SELF_HOSTED_CHAT_PROVIDER_IDS.has(id)) tags.push("self-hosted");
  return tags;
}

function sortById(rows: ProviderRecord[]): ProviderRecord[] {
  return [...rows].sort((a, b) => a.id.localeCompare(b.id));
}

function buildSection(title: string, rows: ProviderRecord[], category: string): string {
  if (rows.length === 0) return "";
  const lines: string[] = [];
  lines.push(`## ${title} (${rows.length})\n`);
  lines.push("| ID | Alias | Name | Tags | Website | Notes |");
  lines.push("|----|-------|------|------|---------|-------|");
  for (const p of sortById(rows)) {
    const tags = [category, ...categoryTags(p.id)].join(", ");
    lines.push(row(p, tags));
  }
  lines.push("");
  return lines.join("\n");
}

function buildHeader(total: number): string {
  const date = new Date().toISOString().slice(0, 10);
  return [
    "# Provider Reference",
    "",
    `> **Auto-generated** from \`src/shared/constants/providers.ts\` — do not edit by hand.`,
    `> Regenerate with: \`npm run gen:provider-reference\``,
    `> **Last generated:** ${date}`,
    "",
    `Total providers: **${total}**. See category breakdown below.`,
    "",
    "## Categories",
    "",
    "- **Free** — free tier with API key (configured via dashboard)",
    "- **OAuth** — sign-in flow handled by OmniRoute, no API key needed",
    "- **Web cookie** — wraps the provider's web app via cookie auth",
    "- **API key** — paid provider configured via API key (free credits may apply)",
    "- **Local** — runs on the user's machine (Ollama, LM Studio, vLLM, etc.)",
    "- **Search** — web search providers",
    "- **Audio** — audio-only providers (TTS/STT)",
    "- **Upstream proxy** — providers that proxy to other providers",
    "- **Cloud agent** — long-running coding agents (Codex Cloud, Devin, Jules)",
    "- **System** — OmniRoute-internal providers (loopback, etc.)",
    "",
    "Additional tags: `image`, `video`, `aggregator`, `enterprise`, `embed/rerank`, `self-hosted`.",
    "",
    "Use the dashboard at `/dashboard/providers` to enable, configure, and test each provider.",
    "",
    "---",
    "",
  ].join("\n");
}

function main() {
  const free = asRecords(FREE_PROVIDERS);
  const oauth = asRecords(OAUTH_PROVIDERS);
  const webCookie = asRecords(WEB_COOKIE_PROVIDERS);
  const apiKey = asRecords(APIKEY_PROVIDERS);
  const local = asRecords(LOCAL_PROVIDERS);
  const search = asRecords(SEARCH_PROVIDERS);
  const audio = asRecords(AUDIO_ONLY_PROVIDERS);
  const upstreamProxy = asRecords(UPSTREAM_PROXY_PROVIDERS);
  const cloudAgent = asRecords(CLOUD_AGENT_PROVIDERS);
  const system = asRecords(SYSTEM_PROVIDERS);

  const allIds = new Set<string>([
    ...free.map((p) => p.id),
    ...oauth.map((p) => p.id),
    ...webCookie.map((p) => p.id),
    ...apiKey.map((p) => p.id),
    ...local.map((p) => p.id),
    ...search.map((p) => p.id),
    ...audio.map((p) => p.id),
    ...upstreamProxy.map((p) => p.id),
    ...cloudAgent.map((p) => p.id),
    ...system.map((p) => p.id),
  ]);

  const sections = [
    buildSection("Free Tier (OAuth-first or no-key)", free, "Free"),
    buildSection("OAuth Providers", oauth, "OAuth"),
    buildSection("Web Cookie Providers", webCookie, "Web cookie"),
    buildSection("API Key Providers (paid / paid-with-free-credits)", apiKey, "API key"),
    buildSection("Local Providers", local, "Local"),
    buildSection("Search Providers", search, "Search"),
    buildSection("Audio-only Providers", audio, "Audio"),
    buildSection("Upstream Proxy Providers", upstreamProxy, "Upstream proxy"),
    buildSection("Cloud Agent Providers", cloudAgent, "Cloud agent"),
    buildSection("System Providers", system, "System"),
  ];

  const footer = [
    "## Sources of truth",
    "",
    "- Catalog: [`src/shared/constants/providers.ts`](../src/shared/constants/providers.ts)",
    "- Registry (per-model details): [`open-sse/config/providerRegistry.ts`](../open-sse/config/providerRegistry.ts)",
    "- Executors: [`open-sse/executors/`](../open-sse/executors/) (31 files)",
    "- Translators: [`open-sse/translator/`](../open-sse/translator/)",
    "",
    "## See Also",
    "",
    "- [FREE_TIERS.md](./FREE_TIERS.md) — curated free-tier guide",
    "- [USER_GUIDE.md](./USER_GUIDE.md) — provider setup walkthrough",
    "- [ARCHITECTURE.md](./ARCHITECTURE.md) — overall architecture",
    "",
  ].join("\n");

  const content = buildHeader(allIds.size) + sections.join("\n") + "\n" + footer;
  fs.writeFileSync(OUT_FILE, content);
  console.log(`✓ Wrote ${OUT_FILE}`);
  console.log(`  Providers: ${allIds.size} unique IDs`);
  console.log(
    `  Sections: free=${free.length}, oauth=${oauth.length}, web=${webCookie.length}, ` +
      `apikey=${apiKey.length}, local=${local.length}, search=${search.length}, ` +
      `audio=${audio.length}, proxy=${upstreamProxy.length}, cloud=${cloudAgent.length}, system=${system.length}`
  );
}

main();
