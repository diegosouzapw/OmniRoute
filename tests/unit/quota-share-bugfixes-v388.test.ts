/**
 * tests/unit/quota-share-bugfixes-v388.test.ts
 *
 * Source-level assertions for the v3.8.8 Quota Share bug fixes reported from
 * Local-VPS testing. Pattern mirrors quota-share-layout-v2.test.ts (source-scan
 * + i18n parity) — no DOM setup required.
 *
 *   B1  pools created "in a group" persisted with the "all" sentinel → hidden,
 *       uneditable, undeletable. Fix: wizard never persists "all"; page shows an
 *       "Ungrouped" recovery bucket for orphan pools.
 *   B3  one-connection-per-pool made explicit (member set + "already used" pool name).
 *   B4  delete-group control wired in the UI (backend already existed).
 *   B5a native Anthropic POST /v1/messages surfaced in the endpoints card.
 *   B5b endpoints card collapse/minimize toggle.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const QS = "src/app/(dashboard)/dashboard/costs/quota-share";

const pageSrc = readFileSync(join(ROOT, QS, "QuotaSharePageClient.tsx"), "utf8");
const wizardSrc = readFileSync(join(ROOT, QS, "components/PoolWizard.tsx"), "utf8");
const endpointsSrc = readFileSync(join(ROOT, QS, "components/QuotaEndpointsCard.tsx"), "utf8");
const en = JSON.parse(readFileSync(join(ROOT, "src/i18n/messages/en.json"), "utf8")) as {
  quotaShare: Record<string, string>;
};
const pt = JSON.parse(readFileSync(join(ROOT, "src/i18n/messages/pt-BR.json"), "utf8")) as {
  quotaShare: Record<string, string>;
};

// ── B1 — wizard never persists the "all" sentinel as a real group ────────────

test("B1: PoolWizard resolves groupId away from 'all' before persisting", () => {
  assert.ok(
    wizardSrc.includes("const resolvedGroupId ="),
    "wizard must compute a resolvedGroupId before saving"
  );
  assert.ok(
    /resolvedGroupId\s*=[\s\S]*?groupId\s*!==\s*"all"/.test(wizardSrc),
    "resolvedGroupId must guard against the 'all' sentinel"
  );
  // Both the create POST body and the edit PATCH body must send the resolved id,
  // never the raw groupId state.
  const groupIdSends = wizardSrc.match(/groupId:\s*resolvedGroupId/g) ?? [];
  assert.ok(
    groupIdSends.length >= 2,
    `both create + edit bodies must send groupId: resolvedGroupId (found ${groupIdSends.length})`
  );
  assert.ok(
    !/\n\s*groupId,\n/.test(wizardSrc),
    "wizard must not send the bare groupId shorthand in a request body"
  );
});

// ── B1 — page surfaces orphan pools so stuck pools stay actionable ───────────

test("B1: QuotaSharePageClient renders an Ungrouped bucket for orphan pools", () => {
  assert.ok(pageSrc.includes("const orphanPools = useMemo"), "must compute orphanPools");
  assert.ok(
    pageSrc.includes('t("ungroupedTitle")'),
    "must render the ungrouped section heading"
  );
  // Orphan pools must reuse the same card with edit/remove wiring.
  const orphanBlock = pageSrc.slice(pageSrc.indexOf('t("ungroupedTitle")'));
  assert.ok(
    orphanBlock.includes("orphanPools.map") &&
      orphanBlock.includes("onEdit") &&
      orphanBlock.includes("onRemove"),
    "orphan pools must render PoolCard with edit + remove controls"
  );
});

// ── B3 — one connection per pool, made explicit ──────────────────────────────

test("B3: connection→pool membership is explicit (all members, not just primary)", () => {
  assert.ok(
    pageSrc.includes("const connectionPoolName = useMemo"),
    "page must build a connectionId→pool-name map"
  );
  assert.ok(
    pageSrc.includes("connectionPoolName={connectionPoolName}"),
    "page must pass connectionPoolName into the wizard"
  );
  // existingPoolConnectionIds must include every member connection, not only the primary.
  assert.ok(
    pageSrc.includes("flatMap((p) => p.connectionIds ?? [p.connectionId])"),
    "existingPoolConnectionIds must span all member connections"
  );
  assert.ok(
    wizardSrc.includes("connectionPoolName[c.id]"),
    "wizard must show which pool an already-used connection belongs to"
  );
});

// ── B4 — delete-group control wired in the UI ────────────────────────────────

test("B4: QuotaSharePageClient wires a delete-group control (protecting the seed)", () => {
  assert.ok(pageSrc.includes("const handleDeleteGroup = useCallback"), "must define handleDeleteGroup");
  assert.ok(
    pageSrc.includes('method: "DELETE" }') && pageSrc.includes("/api/quota/groups/"),
    "handleDeleteGroup must DELETE the group via the API"
  );
  assert.ok(
    pageSrc.includes('res.status === 409') && pageSrc.includes('t("deleteGroupHasPools")'),
    "must handle the 409 (group still has pools) response"
  );
  assert.ok(
    pageSrc.includes('selectedGroupId !== "all" && selectedGroupId !== "group-demo"'),
    "delete control must be hidden for 'all' and the protected seed group"
  );
});

// ── B5a — native Anthropic endpoint ──────────────────────────────────────────

test("B5a: endpoints card surfaces POST /v1/messages for Anthropic providers", () => {
  assert.ok(endpointsSrc.includes("const hasAnthropic"), "must detect Anthropic providers in scope");
  assert.ok(endpointsSrc.includes("POST /v1/messages"), "must show the native Anthropic endpoint");
  assert.ok(
    /isAnthropicProvider[\s\S]*?startsWith\("claude"\)/.test(endpointsSrc),
    "Anthropic detection must cover claude* providers"
  );
});

// ── B5b — collapse toggle ────────────────────────────────────────────────────

test("B5b: endpoints card has a collapse/expand toggle", () => {
  assert.ok(endpointsSrc.includes("const [collapsed, setCollapsed]"), "must hold a collapsed state");
  assert.ok(
    endpointsSrc.includes("{!collapsed && ("),
    "the card body must be hidden while collapsed"
  );
  assert.ok(
    endpointsSrc.includes('t("endpointsCollapse")') && endpointsSrc.includes('t("endpointsExpand")'),
    "toggle must use collapse/expand labels"
  );
});

// ── B5 default view shows REAL combos, not model-a/b/c placeholders ──────────

test("B5: endpoints default view uses real minted qtSd combos (not placeholders)", () => {
  assert.ok(
    endpointsSrc.includes('fetch("/api/combos")'),
    "card must fetch real combos for the default view"
  );
  assert.ok(
    endpointsSrc.includes("isQuotaModelName") && endpointsSrc.includes("parseQuotaModelName"),
    "must filter+parse real qtSd combo names"
  );
  assert.ok(
    endpointsSrc.includes("const realByGroup") &&
      endpointsSrc.includes("realByGroup ?? defaultByGroup") &&
      endpointsSrc.includes("viewByGroup.map"),
    "default view must prefer real combos (realByGroup) over the placeholder map"
  );
});

// ── Responses API endpoint in the card ──────────────────────────────────────

test("endpoints card surfaces POST /v1/responses for codex/github providers", () => {
  assert.ok(endpointsSrc.includes("const hasResponses"), "must detect Responses providers in scope");
  assert.ok(endpointsSrc.includes("POST /v1/responses"), "must show the Responses endpoint");
  assert.ok(
    /isResponsesProvider[\s\S]*?"codex"[\s\S]*?"github"/.test(endpointsSrc),
    "Responses detection must cover canonical codex + github slugs"
  );
});

// ── planRegistry defaults for no-balance-API providers ───────────────────────

test("planRegistry seeds xiaomi-mimo (4.1B lite cap) and kimi-coding for manual fair-share", async () => {
  const { getKnownPlan } = await import("../../src/lib/quota/planRegistry.ts");
  const xiaomi = getKnownPlan("xiaomi-mimo");
  assert.ok(xiaomi, "xiaomi-mimo must have a known plan so the wizard pre-fills");
  assert.ok(
    xiaomi!.dimensions.some((d) => d.unit === "tokens" && d.window === "monthly" && d.limit === 4_100_000_000),
    "xiaomi-mimo must seed the 4.1B-token monthly lite cap"
  );
  const kimiCoding = getKnownPlan("kimi-coding");
  assert.ok(kimiCoding, "kimi-coding (the coding-plan slug) must have a known plan entry");
  // claude (Claude Code) is percent-based like codex.
  const claude = getKnownPlan("claude");
  assert.ok(
    claude && claude.dimensions.some((d) => d.unit === "percent"),
    "claude must seed a percent plan preset"
  );
  // deepseek is prepaid USD → set the fair-share limit by USD value.
  const deepseek = getKnownPlan("deepseek");
  assert.ok(
    deepseek && deepseek.dimensions.some((d) => d.unit === "usd"),
    "deepseek must seed a usd (dollar-value) plan preset"
  );
});

// ── i18n parity for every new key ────────────────────────────────────────────

test("i18n: new quotaShare keys exist in both en and pt-BR", () => {
  const keys = [
    "deleteGroup",
    "deleteGroupConfirm",
    "deleteGroupHasPools",
    "ungroupedTitle",
    "ungroupedHint",
    "endpointsCollapse",
    "endpointsExpand",
    "endpointsAnthropicNote",
    "endpointsResponsesNote",
  ];
  for (const k of keys) {
    assert.ok(en.quotaShare[k], `en.json quotaShare.${k} must exist`);
    assert.ok(pt.quotaShare[k], `pt-BR.json quotaShare.${k} must exist`);
  }
});
