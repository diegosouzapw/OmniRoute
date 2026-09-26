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
const accessEditorClientPath = path.join(
  repoRoot,
  "src/app/(dashboard)/dashboard/api-manager/[id]/access/ApiKeyAccessEditorClient.tsx"
);
const accessFormPath = path.join(
  repoRoot,
  "src/app/(dashboard)/dashboard/api-manager/[id]/access/useApiKeyAccessForm.ts"
);
const generalTabPath = path.join(
  repoRoot,
  "src/app/(dashboard)/dashboard/api-manager/[id]/access/tabs/GeneralTab.tsx"
);
const modelsTabPath = path.join(
  repoRoot,
  "src/app/(dashboard)/dashboard/api-manager/[id]/access/tabs/ModelsTab.tsx"
);
const connectionsTabPath = path.join(
  repoRoot,
  "src/app/(dashboard)/dashboard/api-manager/[id]/access/tabs/ConnectionsTab.tsx"
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

function readAccessEditorClient() {
  return fs.readFileSync(accessEditorClientPath, "utf8");
}

function readAccessForm() {
  return fs.readFileSync(accessFormPath, "utf8");
}

function readGeneralTab() {
  return fs.readFileSync(generalTabPath, "utf8");
}

function readModelsTab() {
  return fs.readFileSync(modelsTabPath, "utf8");
}

function readConnectionsTab() {
  return fs.readFileSync(connectionsTabPath, "utf8");
}

test("general tab uses i18n for management access description", () => {
  const source = readGeneralTab();
  const managementBlock = source.slice(
    source.indexOf("{/* Management Access */}"),
    source.indexOf("{/* Self-service Visibility */}")
  );

  assert.match(managementBlock, /\{t\("managementAccessDesc"\)\}/);
  assert.doesNotMatch(managementBlock, /Allow this API key to manage OmniRoute configuration\./);
});

test("API manager page renders purpose-first header", () => {
  const source = readApiManagerPage();
  const headerBlock = source.slice(
    source.indexOf('<h1 className="text-3xl'),
    source.indexOf("{/* Filter Bar", source.indexOf('<h1 className="text-3xl'))
  );

  assert.match(headerBlock, /\{t\("keyManagement"\)\}/);
  assert.match(headerBlock, /\{t\("keyManagementDesc"\)\}/);
  assert.match(headerBlock, /aria-label=\{t\("requestFlowAria"\)\}/);
  assert.match(headerBlock, /\{t\("requestFlowYourApp"\)\}/);
  assert.match(headerBlock, /\{t\("requestFlowApiKey"\)\}/);
  assert.match(headerBlock, /\{t\("requestFlowOmniRoute"\)\}/);
  assert.doesNotMatch(headerBlock, />\s*Your app\s*</);
  assert.doesNotMatch(headerBlock, />\s*API key\s*</);
  assert.doesNotMatch(headerBlock, />\s*OmniRoute\s*</);
  assert.match(headerBlock, /setShowAddModal\(true\)/);
  assert.match(headerBlock, /\{t\("createKey"\)\}/);
});

test("general tab converts API key expiration ISO timestamps to local datetime input values", () => {
  const source = readGeneralTab();
  const expirationBlock = source.slice(
    source.indexOf("{/* Expiration Date */}"),
    source.indexOf("{/* Management Access */}")
  );

  assert.match(expirationBlock, /value=\{toLocalDateTimeInputValue\(formState\.expiresAt\)\}/);
  assert.match(expirationBlock, /const date = new Date\(val\)/);
  assert.match(expirationBlock, /setExpiresAt\(date\.toISOString\(\)\)/);
  assert.match(expirationBlock, /onClick=\{\(\) => setExpiresAt\(""\)\}/);
  assert.match(expirationBlock, /\{tc\("clear"\)\}/);
  assert.doesNotMatch(expirationBlock, /expiresAt\.slice\(0, 16\)/);
});

test("access editor switch buttons declare button type", () => {
  const source = readGeneralTab();
  const visibilityStart = source.indexOf("{/* Self-service Visibility */}");
  const visibilityEnd = source.indexOf("{/* Allowed Endpoints Section */}", visibilityStart);
  const selfServiceBlock = source.slice(visibilityStart, visibilityEnd);
  const switchButtonCount = (selfServiceBlock.match(/role="switch"/g) ?? []).length;
  const typedSwitchButtonCount = (
    selfServiceBlock.match(/<button\s+type="button"\s+role="switch"/g) ?? []
  ).length;

  // Self-service Visibility block in GeneralTab has 2 inline switches: own-usage visibility
  // and shared-account quota visibility.
  assert.equal(switchButtonCount, 2);
  assert.equal(typedSwitchButtonCount, 2);

  // The extracted toggle components keep the same invariant.
  for (const rel of [
    "src/app/(dashboard)/dashboard/api-manager/components/BypassProviderQuotaToggle.tsx",
    "src/app/(dashboard)/dashboard/api-manager/components/ChaosModeAccessToggle.tsx",
    "src/app/(dashboard)/dashboard/api-manager/components/ApiKeyCompressionToggle.tsx",
  ]) {
    const componentSource = fs.readFileSync(path.join(repoRoot, rel), "utf8");
    const compSwitches = (componentSource.match(/role="switch"/g) ?? []).length;
    const compTyped = (componentSource.match(/<button\s+type="button"\s+role="switch"/g) ?? [])
      .length;
    assert.ok(compSwitches >= 1, `${rel} must render a switch`);
    assert.equal(compTyped, compSwitches, `${rel}: every switch declares type="button"`);
  }
});

test("access form serializes All and empty Restrict Combo access distinctly", () => {
  const source = readAccessForm();

  assert.match(
    source,
    /import \{ ALL_COMBOS_ACCESS_RULE \} from "@\/shared\/constants\/comboAccess";/
  );
  assert.match(
    source,
    /allowAllCombos: apiKey\?\.allowedCombos\?\.includes\(ALL_COMBOS_ACCESS_RULE\) === true/
  );
  assert.match(
    source,
    /allowAllCombos\s*\?\s*\[ALL_COMBOS_ACCESS_RULE\]\s*:\s*formState\.selectedCombos/
  );
});

test("behaviour tab persists the per-key prompt-compression switch", () => {
  const source = fs.readFileSync(
    path.join(
      repoRoot,
      "src/app/(dashboard)/dashboard/api-manager/[id]/access/tabs/BehaviourTab.tsx"
    ),
    "utf8"
  );
  const component = fs.readFileSync(
    path.join(
      repoRoot,
      "src/app/(dashboard)/dashboard/api-manager/components/ApiKeyCompressionToggle.tsx"
    ),
    "utf8"
  );

  assert.match(source, /formState\.compressionEnabled/);
  assert.match(source, /setCompressionEnabled/);
  assert.match(source, /<ApiKeyCompressionToggle/);
  assert.match(component, /useTranslations\("settings"\)/);
  assert.match(component, /tSettings\("compressionTitle"\)/);
  assert.match(component, /tSettings\("compressionDesc"\)/);
  assert.match(component, /aria-checked=\{enabled\}/);
});

test("access editor exposes Claude Code default wildcard model", () => {
  const source = readAccessForm();
  const modelListSource = fs.readFileSync(providerModelPermissionListPath, "utf8");

  assert.match(source, /export const CLAUDE_CODE_DEFAULT_MODEL_ID = "cc\/\*";/);
  assert.match(source, /export const CLAUDE_CODE_DEFAULT_MODEL_NAME = "Claude Code default";/);
  assert.match(source, /withClaudeCodeDefaultModel/);
  assert.match(modelListSource, /getModelDisplayName\(model\.id\)/);
});

test("models tab expands Claude Code default families in selected models summary", () => {
  const source = readModelsTab();
  const formSource = readAccessForm();

  assert.match(formSource, /export const CLAUDE_CODE_DEFAULT_FAMILIES = \[/);
  assert.match(formSource, /id: "other", label: "other"/);
  assert.match(formSource, /id: "fable", label: "fable"/);
  assert.match(formSource, /id: "opus", label: "opus"/);
  assert.match(formSource, /id: "sonnet", label: "sonnet"/);
  assert.match(formSource, /id: "haiku", label: "haiku"/);
  assert.match(source, /const orderedSelectedProviderScopes = useMemo/);
  assert.match(source, /scope === CLAUDE_CODE_DEFAULT_MODEL_ID/);
  assert.match(source, /setClaudeCodeFamiliesExpanded/);
  assert.match(
    source,
    /const \[claudeCodeFamiliesExpanded,\s*setClaudeCodeFamiliesExpanded\] = useState\(false\)/
  );
  assert.doesNotMatch(source, /setClaudeCodeFamiliesExpanded\(true\)/);
  assert.match(source, /aria-expanded=\{claudeCodeFamiliesExpanded\}/);
  assert.match(source, /bg-primary\/25/);
  assert.match(source, /blockClaudeCodeFamily/);
  assert.match(formSource, /blockedModels: validBlockedModels/);
  assert.match(
    formSource,
    /blockedModels\.push\(\.\.\.CLAUDE_CODE_FAMILY_BLOCK_PATTERNS\[familyId\]\)/
  );
});

test("API-key model fallback preserves combo pseudo-models", () => {
  const source = readAccessEditorClient();
  const fallbackBlock = source.slice(
    source.indexOf("const [fallbackRes, combosRes] = await Promise.all"),
    source.indexOf(
      "} catch (err)",
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
  assert.match(source, /formatProviderModelPermissionSummary\(\s*providerCount,/);
  assert.doesNotMatch(source, /modelsCount\", \{ count: key\.allowedModels!\.length \}/);

  const modelsTabSource = readModelsTab();
  const summaryStart = modelsTabSource.indexOf("{/* Selected Models Summary");
  const summaryEnd = modelsTabSource.indexOf("{/* Model Selection List", summaryStart);
  const summary = modelsTabSource.slice(summaryStart, summaryEnd);
  assert.match(summary, /\{tc\("providers"\)\}/);
  assert.match(summary, /\{tc\("models"\)\}/);
  assert.match(summary, /\{selectedPermissionSummary\}/);
  assert.match(summary, /orderedSelectedProviderScopes\.map/);
  assert.match(summary, /selectedExactModels\.map/);
  assert.doesNotMatch(summary, /orderedSelectedModels\.map/);

  const infoBannerStart = modelsTabSource.indexOf("{/* Info Banner */}");
  const infoBannerEnd = modelsTabSource.indexOf("{/* Catalog Scope */}", infoBannerStart);
  const infoBanner = modelsTabSource.slice(infoBannerStart, infoBannerEnd);
  assert.match(
    infoBanner,
    /selectedProviderCount > 0\s*\? selectedPermissionSummary\s*:\s*totalModels === 0/
  );
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

test("exclusive lease badge and notice use i18n translation keys", () => {
  const source = readApiManagerPage();
  const rowBadgesStart = source.indexOf("{/* Existing badges */}");
  const rowBadgesEnd = source.indexOf("{/* Actions column */}", rowBadgesStart);
  const rowBadges = source.slice(rowBadgesStart, rowBadgesEnd);

  assert.match(rowBadges, /hasExclusiveLeaseScope &&/);
  assert.match(rowBadges, /\{t\("exclusiveLease"\)\}/);
  assert.doesNotMatch(rowBadges, />\s*Exclusive Lease\s*</);

  const generalTabSource = readGeneralTab();
  const noticeStart = generalTabSource.indexOf("{/* Exclusive Lease Notice */}");
  const noticeEnd = generalTabSource.indexOf("{/* Key Active Toggle */}", noticeStart);
  const notice = generalTabSource.slice(noticeStart, noticeEnd);

  assert.match(notice, /hasExclusiveLeaseScope &&/);
  assert.match(notice, /\{t\("exclusiveLeaseNoticeTitle"\)\}/);
  assert.match(notice, /\{t\("exclusiveLeaseNoticeDesc"\)\}/);
});

test("connections tab and validation use i18n translation keys", () => {
  const formSource = readAccessForm();
  assert.match(
    formSource,
    /!formState\.allowAllConnections && formState\.selectedConnections\.length === 0/
  );
  assert.match(formSource, /errors\.connections\.push\(tr\("selectAtLeastOneConnection"\)\)/);

  const connectionsSection = readConnectionsTab();
  assert.match(connectionsSection, /\{t\("allConnections"\)\}/);
  assert.match(connectionsSection, /\{t\("onlySelectedConnections"\)\}/);
  assert.match(connectionsSection, /t\("selectAtLeastOneConnection"\)/);
  assert.match(connectionsSection, /t\("allConnectionsDesc"\)/);
  assert.match(connectionsSection, /t\("restrictedToConnections"/);
});
