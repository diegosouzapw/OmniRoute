/**
 * scripts/ad-hoc/backfill-servicekinds.mjs
 *
 * PR A (gate hardening, #10513): make `serviceKinds` REQUIRED on every provider
 * in the catalog, backfilling the ~320 entries that never declared it.
 *
 * Design (pacocartones #10267): serviceKinds distinguishes a canonical provider
 * that legitimately has no REGISTRY entry (search/audio/media/local/cloud-agent)
 * from a half-removed provider whose catalog entry outlived its registry entry.
 * Making the field mandatory turns "canonical provider with no REGISTRY entry"
 * into a checkable invariant for `provider:remove --dry-run`.
 *
 * Rule:
 *   - LLM chat providers          -> ["llm"]
 *   - Search providers            -> ["webSearch"] (+["webFetch"] where known)
 *   - Pure-media providers        -> [] (kinds derived from media registries)
 *   - Cloud agents / system / proxy-> [] (no direct chat registry path)
 *
 * Media kinds are NOT declared here — open-sse/config/mediaServiceKinds.ts
 * derives them from the audio/video/music/image/embedding/ocr registries, so
 * declaring them would duplicate (and drift from) that source of truth.
 *
 * USAGE: node --import tsx/esm scripts/ad-hoc/backfill-servicekinds.mjs
 * Idempotent: only inserts where serviceKinds is absent.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

// ── Section membership from the REAL catalog modules ────────────────────────
import { SEARCH_PROVIDERS } from "../../src/shared/constants/providers/search.ts";
import { AUDIO_ONLY_PROVIDERS } from "../../src/shared/constants/providers/audio.ts";
import { CLOUD_AGENT_PROVIDERS } from "../../src/shared/constants/providers/cloud-agent.ts";
import { SYSTEM_PROVIDERS } from "../../src/shared/constants/providers/system.ts";
import { UPSTREAM_PROXY_PROVIDERS } from "../../src/shared/constants/providers/upstream-proxy.ts";
import { OAUTH_PROVIDERS } from "../../src/shared/constants/providers/oauth.ts";
import { WEB_COOKIE_PROVIDERS } from "../../src/shared/constants/providers/web-cookie.ts";
import { LOCAL_PROVIDERS } from "../../src/shared/constants/providers/local.ts";
import { APIKEY_PROVIDERS_GATEWAYS } from "../../src/shared/constants/providers/apikey/gateways.ts";
import { APIKEY_PROVIDERS_FRONTIER } from "../../src/shared/constants/providers/apikey/frontier-labs.ts";
import { APIKEY_PROVIDERS_INFERENCE } from "../../src/shared/constants/providers/apikey/inference-hosts.ts";
import { APIKEY_PROVIDERS_ENTERPRISE } from "../../src/shared/constants/providers/apikey/enterprise-cloud.ts";
import { APIKEY_PROVIDERS_REGIONAL } from "../../src/shared/constants/providers/apikey/regional.ts";
import { APIKEY_PROVIDERS_SPECIALTY } from "../../src/shared/constants/providers/apikey/specialty-media.ts";

const SEARCH_IDS = new Set(Object.keys(SEARCH_PROVIDERS));
const AUDIO_IDS = new Set(Object.keys(AUDIO_ONLY_PROVIDERS));
const CLOUD_AGENT_IDS = new Set(Object.keys(CLOUD_AGENT_PROVIDERS));
const SYSTEM_IDS = new Set(Object.keys(SYSTEM_PROVIDERS));
const UPSTREAM_PROXY_IDS = new Set(Object.keys(UPSTREAM_PROXY_PROVIDERS));

// Search providers that ALSO fetch pages (declared webFetch today).
const SEARCH_WEBFETCH = new Set(["exa-search", "tavily-search", "firecrawl"]);

// Pure-media / no-direct-chat providers -> [] (kinds come from registries).
// web-cookie image/video generators + local image runtimes + specialty-media
// image/embedding/music/video set members that have no chat facade.
const NO_LLM = new Set([
  // web-cookie image/video generators
  "microsoft-designer-web",
  "adobe-firefly",
  // local image runtimes
  "sdwebui",
  "comfyui",
  // specialty-media pure media (image/embedding/music/video, no chat facade)
  "runwayml",
  "ideogram",
  "freepik",
  // freepik foi renomeado para magnific na migration 160 — ambos os ids
  // permanecem aqui para que uma re-execução não volte a marcá-lo como llm.
  "magnific",
  "suno",
  "udio",
  "voyage-ai",
  "jina-ai",
  "fal-ai",
  "stability-ai",
  "black-forest-labs",
  "recraft",
  "topaz",
  "segmind",
  "nomic",
  "mixedbread",
  "leonardo",
  "haiper",
  "kie",
  "deepai",
]);

/** Compute declared serviceKinds for a provider id (media kinds NOT included). */
export function computeDeclaredServiceKinds(providerId) {
  if (SEARCH_IDS.has(providerId)) {
    return SEARCH_WEBFETCH.has(providerId) ? ["webSearch", "webFetch"] : ["webSearch"];
  }
  if (NO_LLM.has(providerId)) return [];
  if (AUDIO_IDS.has(providerId)) return [];
  if (CLOUD_AGENT_IDS.has(providerId)) return [];
  if (SYSTEM_IDS.has(providerId)) return [];
  if (UPSTREAM_PROXY_IDS.has(providerId)) return [];
  return ["llm"];
}

/** Insert `serviceKinds` after the `id:` line of a provider entry, if absent. */
function insertIntoFile(filePath, providerId, kinds) {
  const abs = path.join(ROOT, filePath);
  const src = readFileSync(abs, "utf8");

  const escaped = providerId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Multi-line entry `  \"provider-id\": {\n ...  },` — full block capture. The
  // whole-block capture makes the idempotency check see serviceKinds wherever it
  // sits (before OR after the id line) without a file-global `includes` that
  // would short-circuit every later entry after the first insert.
  const entryRe = new RegExp(`^( {2})"?${escaped}"?(: \\{)([\\s\\S]*?)^( {2})},$`, "m");
  const match = entryRe.exec(src);
  if (!match) {
    console.error(`  ✗ could not locate entry for ${providerId} in ${filePath}`);
    return false;
  }
  // Per-entry idempotency: refuse when THIS entry already declares serviceKinds.
  const block = match[0];
  if (/serviceKinds\s*:/.test(block)) return null;
  // Insert after the `id: \"provider-id\",` line (4-space indent inside the block).
  const idLineRe = new RegExp(`( {4}id: \"${escaped}\",)`);
  const idMatch = idLineRe.exec(block);
  if (!idMatch) {
    console.error(`  ✗ entry for ${providerId} in ${filePath} has no id line`);
    return false;
  }
  const idLineEnd = match.index + idMatch.index + idMatch[1].length;
  const insert = `\n    serviceKinds: ${JSON.stringify(kinds)},`;
  writeFileSync(abs, src.slice(0, idLineEnd) + insert + src.slice(idLineEnd));
  return true;
}

// ── Files to process, derived from the section modules themselves ───────────
const FILES = [
  ["src/shared/constants/providers/oauth.ts", OAUTH_PROVIDERS],
  ["src/shared/constants/providers/web-cookie.ts", WEB_COOKIE_PROVIDERS],
  ["src/shared/constants/providers/local.ts", LOCAL_PROVIDERS],
  ["src/shared/constants/providers/search.ts", SEARCH_PROVIDERS],
  ["src/shared/constants/providers/audio.ts", AUDIO_ONLY_PROVIDERS],
  ["src/shared/constants/providers/upstream-proxy.ts", UPSTREAM_PROXY_PROVIDERS],
  ["src/shared/constants/providers/cloud-agent.ts", CLOUD_AGENT_PROVIDERS],
  ["src/shared/constants/providers/system.ts", SYSTEM_PROVIDERS],
  ["src/shared/constants/providers/apikey/gateways.ts", APIKEY_PROVIDERS_GATEWAYS],
  ["src/shared/constants/providers/apikey/frontier-labs.ts", APIKEY_PROVIDERS_FRONTIER],
  ["src/shared/constants/providers/apikey/inference-hosts.ts", APIKEY_PROVIDERS_INFERENCE],
  ["src/shared/constants/providers/apikey/enterprise-cloud.ts", APIKEY_PROVIDERS_ENTERPRISE],
  ["src/shared/constants/providers/apikey/regional.ts", APIKEY_PROVIDERS_REGIONAL],
  ["src/shared/constants/providers/apikey/specialty-media.ts", APIKEY_PROVIDERS_SPECIALTY],
];

let inserted = 0;
let skipped = 0;
let failed = 0;
for (const [file, sectionMap] of FILES) {
  for (const id of Object.keys(sectionMap)) {
    if (sectionMap[id]?.serviceKinds !== undefined) {
      skipped += 1;
      continue;
    }
    const kinds = computeDeclaredServiceKinds(id);
    const result = insertIntoFile(file, id, kinds);
    if (result === true) inserted += 1;
    else if (result === false) failed += 1;
  }
}
console.log(
  `[backfill] inserted=${inserted} skipped(already-declared)=${skipped} failed=${failed}`
);
