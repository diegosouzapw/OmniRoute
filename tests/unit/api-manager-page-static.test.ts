import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const pagePath = path.join(
  repoRoot,
  "src/app/(dashboard)/dashboard/api-manager/ApiManagerPageClient.tsx"
);
const providerModelPermissionListPath = path.join(
  repoRoot,
  "src/app/(dashboard)/dashboard/api-manager/components/ProviderModelPermissionList.tsx"
);
const messagesDir = path.join(repoRoot, "src/i18n/messages");

const selfServiceScopeMessageKeys = [
  "selfServiceVisibility",
  "selfServiceVisibilityDesc",
  "ownUsageVisibility",
  "ownUsageVisibilityDesc",
  "sharedAccountQuotaVisibility",
  "sharedAccountQuotaVisibilityDesc",
];

function readApiManagerPage() {
  return fs.readFileSync(pagePath, "utf8");
}

test("permissions modal uses i18n for management access description", () => {
  const source = readApiManagerPage();
  const managementBlock = source.slice(
    source.indexOf("{/* Management Access */}", source.indexOf("const PermissionsModal")),
    source.indexOf("{/* Self-service Visibility */}", source.indexOf("const PermissionsModal"))
  );

  assert.match(managementBlock, /\{t\("managementAccessDesc"\)\}/);
  assert.doesNotMatch(managementBlock, /Allow this API key to manage OmniRoute configuration\./);
});

test("permissions modal converts API key expiration ISO timestamps to local datetime input values", () => {
  const source = readApiManagerPage();
  const expirationBlock = source.slice(
    source.indexOf("{/* Expiration Date */}", source.indexOf("const PermissionsModal")),
    source.indexOf("{/* Management Access */}", source.indexOf("const PermissionsModal"))
  );

  assert.match(expirationBlock, /value=\{toLocalDateTimeInputValue\(expiresAt\)\}/);
  assert.match(expirationBlock, /const date = new Date\(val\)/);
  assert.match(expirationBlock, /setExpiresAt\(date\.toISOString\(\)\)/);
  assert.match(expirationBlock, /onClick=\{\(\) => setExpiresAt\(""\)\}/);
  assert.match(expirationBlock, /\{tc\("clear"\)\}/);
  assert.doesNotMatch(expirationBlock, /expiresAt\.slice\(0, 16\)/);
});

test("permissions modal switch buttons declare button type", () => {
  const source = readApiManagerPage();
  const modalStart = source.indexOf("const PermissionsModal");
  const visibilityStart = source.indexOf("{/* Self-service Visibility */}", modalStart);
  const visibilityEnd = source.indexOf("{/* Selected Models Summary", visibilityStart);
  const selfServiceBlock = source.slice(visibilityStart, visibilityEnd);
  const switchButtonCount = (selfServiceBlock.match(/role="switch"/g) ?? []).length;
  const typedSwitchButtonCount = (
    selfServiceBlock.match(/<button\s+type="button"\s+role="switch"/g) ?? []
  ).length;

  // Self-service Visibility block has 4 inline switches: own-usage visibility,
  // shared-account quota visibility, disable-non-public-models (#3041), and the
  // per-key local usage command allowance (#4034). The API-key provider
  // quota-policy bypass scope (#5731) and the Chaos Mode access scope (#6728)
  // were extracted into dedicated toggle components (asserted below).
  // The invariant is that every switch declares type="button"
  // (typedSwitchButtonCount === switchButtonCount) to avoid implicit submit.
  assert.equal(switchButtonCount, 4);
  assert.equal(typedSwitchButtonCount, 4);

  // The extracted toggle components keep the same invariant.
  for (const rel of [
    "src/app/(dashboard)/dashboard/api-manager/components/BypassProviderQuotaToggle.tsx",
    "src/app/(dashboard)/dashboard/api-manager/components/ChaosModeAccessToggle.tsx",
  ]) {
    const componentSource = fs.readFileSync(path.join(repoRoot, rel), "utf8");
    const compSwitches = (componentSource.match(/role="switch"/g) ?? []).length;
    const compTyped = (componentSource.match(/<button\s+type="button"\s+role="switch"/g) ?? [])
      .length;
    assert.ok(compSwitches >= 1, `${rel} must render a switch`);
    assert.equal(compTyped, compSwitches, `${rel}: every switch declares type="button"`);
  }
});

test("permissions modal exposes Claude Code default wildcard model", () => {
  const source = readApiManagerPage();
  const modelListSource = fs.readFileSync(providerModelPermissionListPath, "utf8");

  assert.match(source, /const CLAUDE_CODE_DEFAULT_MODEL_ID = "cc\/\*";/);
  assert.match(source, /const CLAUDE_CODE_DEFAULT_MODEL_NAME = "Claude Code default";/);
  assert.match(source, /withClaudeCodeDefaultModel\(allModels\)/);
  assert.match(modelListSource, /getModelDisplayName\(model\.id\)/);
  assert.match(
    source,
    /modelId === CLAUDE_CODE_DEFAULT_MODEL_ID\s+\?\s+CLAUDE_CODE_DEFAULT_MODEL_NAME\s+:\s+modelId/
  );
  assert.doesNotMatch(source, /modelById\.get\(modelId\)\?\.name/);
});

test("permissions modal expands Claude Code default families in selected models summary", () => {
  const source = readApiManagerPage();

  assert.match(source, /const CLAUDE_CODE_DEFAULT_FAMILIES = \[/);
  assert.match(source, /id: "other",\s+label: "other"/);
  assert.match(source, /id: "fable",\s+label: "fable"/);
  assert.match(source, /id: "opus",\s+label: "opus"/);
  assert.match(source, /id: "sonnet",\s+label: "sonnet"/);
  assert.match(source, /id: "haiku",\s+label: "haiku"/);
  assert.match(source, /const orderedSelectedProviderScopes = useMemo/);
  assert.match(source, /modelId === CLAUDE_CODE_DEFAULT_MODEL_ID/);
  assert.match(source, /setClaudeCodeFamiliesExpanded/);
  assert.match(
    source,
    /const \[claudeCodeFamiliesExpanded,\s*setClaudeCodeFamiliesExpanded\] = useState\(false\)/
  );
  assert.doesNotMatch(source, /setClaudeCodeFamiliesExpanded\(true\)/);
  assert.match(source, /aria-expanded=\{claudeCodeFamiliesExpanded\}/);
  assert.match(source, /bg-primary\/25/);
  assert.match(source, /handleBlockClaudeCodeFamily/);
  assert.match(source, /blockedModels: validBlockedModels/);
  assert.match(
    source,
    /blockedModels\.push\(\.\.\.CLAUDE_CODE_FAMILY_BLOCK_PATTERNS\[familyId\]\)/
  );
  assert.doesNotMatch(source, /Block Fable family/);
});

test("API-key model fallback preserves combo pseudo-models", () => {
  const source = readApiManagerPage();
  const fallbackBlock = source.slice(
    source.indexOf("const [fallbackRes, combosRes] = await Promise.all"),
    source.indexOf(
      "} catch (error)",
      source.indexOf("const [fallbackRes, combosRes] = await Promise.all")
    )
  );

  assert.match(fallbackBlock, /fetch\("\/api\/models\?all=true"\)/);
  assert.match(fallbackBlock, /fetch\("\/api\/combos"\)/);
  assert.match(fallbackBlock, /owned_by: "combo"/);
  assert.match(fallbackBlock, /\[\.\.\.comboModels, \.\.\.modelEntries\]/);
  assert.match(fallbackBlock, /seen\.has\(m\.id\)/);
});

test("provider wildcard permissions render separately from exact models", () => {
  const source = readApiManagerPage();

  assert.match(
    source,
    /const \{ providerWildcards, exactModels \} = restoreProviderScopeSelection\(/,
    "the API-key row must split provider wildcards from exact model selections"
  );
  assert.match(source, /const isModelRestricted =/);
  assert.match(source, /const providerCount = providerWildcards\.length;/);
  assert.match(source, /const modelCount = exactModels\.length;/);
  assert.match(source, /formatProviderModelPermissionCount\(\s*providerCount,/);
  assert.match(source, /providerCount === 1 \? "provider" : "providers"/);
  assert.doesNotMatch(source, /modelsCount\", \{ count: key\.allowedModels!\.length \}/);

  const summaryStart = source.indexOf("{/* Selected Models Summary");
  const summaryEnd = source.indexOf("{/* Search and Model Selection", summaryStart);
  const summary = source.slice(summaryStart, summaryEnd);
  assert.match(summary, /\{tc\("providers"\)\}/);
  assert.match(summary, /\{tc\("models"\)\}/);
  assert.match(summary, /\{selectedPermissionCount\}/);
  assert.match(summary, /orderedSelectedProviderScopes\.map/);
  assert.match(summary, /selectedExactModels\.map/);
  assert.doesNotMatch(summary, /orderedSelectedModels\.map/);
});

test("self-service API key scope labels do not expose missing placeholders", () => {
  const messageFiles = fs.readdirSync(messagesDir).filter((file) => file.endsWith(".json"));

  for (const file of messageFiles) {
    const messages = JSON.parse(fs.readFileSync(path.join(messagesDir, file), "utf8"));

    for (const key of selfServiceScopeMessageKeys) {
      const value = messages.apiManager?.[key];

      assert.equal(typeof value, "string", `${file}: apiManager.${key} should exist`);
      assert.ok(value.length > 0, `${file}: apiManager.${key} should not be empty`);
      assert.ok(
        !value.startsWith("__MISSING__:"),
        `${file}: apiManager.${key} should not expose a missing placeholder`
      );
    }
  }
});
