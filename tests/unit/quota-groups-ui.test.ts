/**
 * tests/unit/quota-groups-ui.test.ts
 *
 * Task B9 — source-level assertions for the group selector UI,
 * group-aware PoolWizard, and EditAllocationsModal group note.
 *
 * Pattern mirrors:
 *   tests/unit/quota-pool-log-route.test.ts (source-scan + i18n parity)
 *   tests/unit/quota-pool-wizard.test.ts    (source-scan structural)
 *
 * Node.js native test runner — no DOM setup required.
 */

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..", "..");

const PAGE_CLIENT_PATH = join(
  ROOT,
  "src/app/(dashboard)/dashboard/costs/quota-share/QuotaSharePageClient.tsx"
);

const WIZARD_PATH = join(
  ROOT,
  "src/app/(dashboard)/dashboard/costs/quota-share/components/PoolWizard.tsx"
);

const EN_PATH = join(ROOT, "src/i18n/messages/en.json");
const PT_PATH = join(ROOT, "src/i18n/messages/pt-BR.json");

const pageSrc = readFileSync(PAGE_CLIENT_PATH, "utf8");
const wizardSrc = readFileSync(WIZARD_PATH, "utf8");

// ── QuotaSharePageClient: group fetch ─────────────────────────────────────────

test("QuotaSharePageClient: fetches /api/quota/groups", () => {
  assert.ok(
    pageSrc.includes("/api/quota/groups"),
    "QuotaSharePageClient must fetch /api/quota/groups"
  );
});

test("QuotaSharePageClient: has a fetch for GET /api/quota/groups (list)", () => {
  // The fetchGroups function does a plain GET fetch
  const fetchGroupsIdx = pageSrc.indexOf("fetchGroups");
  assert.ok(fetchGroupsIdx >= 0, "fetchGroups function must exist");
  // The function body must call fetch('/api/quota/groups')
  const afterFetch = pageSrc.slice(fetchGroupsIdx);
  assert.ok(
    afterFetch.includes('"/api/quota/groups"') || afterFetch.includes("'/api/quota/groups'"),
    "fetchGroups must call fetch with /api/quota/groups"
  );
});

test("QuotaSharePageClient: has a POST to /api/quota/groups for group creation", () => {
  // handleCreateGroup does POST /api/quota/groups
  const createGroupIdx = pageSrc.indexOf("handleCreateGroup");
  assert.ok(createGroupIdx >= 0, "handleCreateGroup must be defined");
  const afterCreate = pageSrc.slice(createGroupIdx, createGroupIdx + 800);
  assert.ok(
    afterCreate.includes('method: "POST"') || afterCreate.includes("method: 'POST'"),
    "handleCreateGroup must use POST"
  );
  assert.ok(
    afterCreate.includes("/api/quota/groups"),
    "handleCreateGroup must POST to /api/quota/groups"
  );
});

test("QuotaSharePageClient: has a PATCH to /api/quota/groups/[id] for rename", () => {
  // handleRenameGroup does PATCH /api/quota/groups/${selectedGroupId}
  const renameIdx = pageSrc.indexOf("handleRenameGroup");
  assert.ok(renameIdx >= 0, "handleRenameGroup must be defined");
  const afterRename = pageSrc.slice(renameIdx, renameIdx + 800);
  assert.ok(
    afterRename.includes('method: "PATCH"') || afterRename.includes("method: 'PATCH'"),
    "handleRenameGroup must use PATCH"
  );
  assert.ok(
    afterRename.includes("/api/quota/groups/"),
    "handleRenameGroup must PATCH /api/quota/groups/[id]"
  );
});

// ── QuotaSharePageClient: group select in header ──────────────────────────────

test("QuotaSharePageClient: renders a group <select>", () => {
  // The group bar must include a <select> with value bound to selectedGroupId
  assert.ok(
    pageSrc.includes("selectedGroupId"),
    "QuotaSharePageClient must track selectedGroupId state"
  );
  assert.ok(
    pageSrc.includes("<select") && pageSrc.includes("selectedGroupId"),
    "QuotaSharePageClient must render a <select> for groups"
  );
});

test("QuotaSharePageClient: group bar renders 'New group' action", () => {
  assert.ok(
    pageSrc.includes("newGroup") || pageSrc.includes("showNewGroupInput"),
    "QuotaSharePageClient must render a New group action (uses newGroup i18n key or showNewGroupInput state)"
  );
});

test("QuotaSharePageClient: group bar renders 'Rename group' action", () => {
  assert.ok(
    pageSrc.includes("renameGroup"),
    "QuotaSharePageClient must render a Rename group action using renameGroup i18n key"
  );
});

// ── QuotaSharePageClient: pool list filtered by group ────────────────────────

test("QuotaSharePageClient: filters pool list by selectedGroupId (filteredPools)", () => {
  assert.ok(
    pageSrc.includes("filteredPools"),
    "QuotaSharePageClient must derive filteredPools from the group selection"
  );
});

test("QuotaSharePageClient: renders group heading above pool grid", () => {
  // The group heading shows the group name and pool count.
  // Task 4 replaced the single-group heading (filteredPools.length) with
  // per-group headings using groupPools.length — one section per group.
  assert.ok(
    pageSrc.includes("groupPools.length") || pageSrc.includes("filteredPools.length"),
    "QuotaSharePageClient must show pool count in the group heading (groupPools.length or filteredPools.length)"
  );
});

// ── QuotaSharePageClient: passes groups/selectedGroupId to PoolWizard ─────────

test("QuotaSharePageClient: passes groups prop to PoolWizard", () => {
  assert.ok(
    pageSrc.includes("groups={groups}"),
    "QuotaSharePageClient must pass groups={groups} to PoolWizard"
  );
});

test("QuotaSharePageClient: passes selectedGroupId prop to PoolWizard", () => {
  assert.ok(
    pageSrc.includes("selectedGroupId={selectedGroupId}"),
    "QuotaSharePageClient must pass selectedGroupId={selectedGroupId} to PoolWizard"
  );
});

// ── PoolWizard: groupId in POST body ──────────────────────────────────────────

test("PoolWizard: includes groupId in the POST /api/quota/pools body", () => {
  // The POST body JSON must include groupId
  assert.ok(
    wizardSrc.includes("groupId"),
    "PoolWizard must include groupId in the create POST body"
  );
  // Find the POST body JSON.stringify call
  const postIdx = wizardSrc.indexOf('method: "POST"');
  assert.ok(postIdx >= 0, "POST method call must exist in PoolWizard");
  const postSection = wizardSrc.slice(postIdx, postIdx + 400);
  assert.ok(
    postSection.includes("groupId"),
    "groupId must be in the POST body JSON.stringify"
  );
});

// ── PoolWizard: group picker UI in step 1 ────────────────────────────────────

test("PoolWizard: accepts groups prop in PoolWizardProps", () => {
  assert.ok(
    wizardSrc.includes("groups?:") || wizardSrc.includes("groups ?: ") || wizardSrc.includes("groups?: "),
    "PoolWizardProps must include optional groups prop"
  );
});

test("PoolWizard: renders a group picker <select> in step 1", () => {
  // The group picker is in step 1 (between step === 1 and step === 2 blocks)
  const step1Idx = wizardSrc.indexOf("step === 1");
  const step2Idx = wizardSrc.indexOf("step === 2");
  assert.ok(step1Idx >= 0, "step === 1 block must exist");
  assert.ok(step2Idx > step1Idx, "step === 2 block must come after step === 1");
  const step1Block = wizardSrc.slice(step1Idx, step2Idx);
  assert.ok(
    step1Block.includes("groupId") && step1Block.includes("<select"),
    "step 1 must include a group picker <select> with groupId binding"
  );
});

// ── PoolWizard: default pool name does NOT use raw connection label/email ──────

test("PoolWizard: effectivePoolName uses provider slug, not connLabel", () => {
  // Before fix: effectivePoolName = poolName.trim() || connLabel(selectedConn)
  // After fix:  effectivePoolName = poolName.trim() || selectedConn.provider
  // The old connLabel call in effectivePoolName must be gone
  const effectiveIdx = wizardSrc.indexOf("effectivePoolName");
  assert.ok(effectiveIdx >= 0, "effectivePoolName must be defined");
  const effectiveLine = wizardSrc.slice(effectiveIdx, effectiveIdx + 200);
  assert.ok(
    !effectiveLine.includes("connLabel(selectedConn)"),
    "effectivePoolName must NOT use connLabel(selectedConn) — that exposes email"
  );
  assert.ok(
    effectiveLine.includes("selectedConn.provider") || effectiveLine.includes(".provider"),
    "effectivePoolName must fall back to provider slug"
  );
});

test("PoolWizard: pool name placeholder uses provider, not connLabel", () => {
  // placeholder={selectedConn ? selectedConn.provider : t("wizardPoolNamePlaceholder")}
  const placeholderIdx = wizardSrc.indexOf("placeholder={");
  assert.ok(placeholderIdx >= 0, "placeholder attribute must exist in pool name input");
  // Find ALL placeholder occurrences within the pool name input area (step 1)
  let idx = 0;
  let foundProviderPlaceholder = false;
  while (true) {
    const pos = wizardSrc.indexOf("placeholder={", idx);
    if (pos < 0) break;
    const chunk = wizardSrc.slice(pos, pos + 120);
    if (chunk.includes(".provider") || chunk.includes("selectedConn?.provider")) {
      foundProviderPlaceholder = true;
      break;
    }
    idx = pos + 1;
  }
  assert.ok(
    foundProviderPlaceholder,
    "Pool name input placeholder must use selectedConn.provider (not connLabel/email)"
  );
});

// ── PoolWizard: group allocation note (EditAllocationsModal retired Task 6) ───
// EditAllocationsModal was retired in Task 6. The groupAllocationNote key is kept
// in the i18n bundle for backwards compat but the wizard covers allocation editing.

// ── i18n parity ───────────────────────────────────────────────────────────────

const GROUP_KEYS = [
  "groupLabel",
  "newGroup",
  "renameGroup",
  "groupSelectHint",
  "groupAllocationNote",
  "groupNamePrompt",
  "wizardGroupLabel",
] as const;

test("i18n: all group keys present in en.json quotaShare namespace", () => {
  const en = JSON.parse(readFileSync(EN_PATH, "utf8")) as Record<string, Record<string, string>>;
  for (const k of GROUP_KEYS) {
    assert.equal(
      typeof en["quotaShare"]?.[k],
      "string",
      `en.json missing quotaShare.${k}`
    );
  }
});

test("i18n: all group keys present in pt-BR.json quotaShare namespace", () => {
  const pt = JSON.parse(readFileSync(PT_PATH, "utf8")) as Record<string, Record<string, string>>;
  for (const k of GROUP_KEYS) {
    assert.equal(
      typeof pt["quotaShare"]?.[k],
      "string",
      `pt-BR.json missing quotaShare.${k}`
    );
  }
});

test("i18n: parity — en and pt-BR have exactly the same group keys", () => {
  const en = JSON.parse(readFileSync(EN_PATH, "utf8")) as Record<string, Record<string, string>>;
  const pt = JSON.parse(readFileSync(PT_PATH, "utf8")) as Record<string, Record<string, string>>;
  for (const k of GROUP_KEYS) {
    assert.ok(k in (en["quotaShare"] ?? {}), `en.json missing quotaShare.${k}`);
    assert.ok(k in (pt["quotaShare"] ?? {}), `pt-BR.json missing quotaShare.${k}`);
  }
});

test("i18n: no group keys are present in en but missing from pt-BR (full parity)", () => {
  const en = JSON.parse(readFileSync(EN_PATH, "utf8")) as Record<string, Record<string, string>>;
  const pt = JSON.parse(readFileSync(PT_PATH, "utf8")) as Record<string, Record<string, string>>;
  const enKeys = new Set(Object.keys(en["quotaShare"] ?? {}));
  const ptKeys = new Set(Object.keys(pt["quotaShare"] ?? {}));
  const missingInPt = GROUP_KEYS.filter((k) => enKeys.has(k) && !ptKeys.has(k));
  assert.deepEqual(missingInPt, [], `pt-BR.json missing quotaShare keys: ${missingInPt.join(", ")}`);
});
