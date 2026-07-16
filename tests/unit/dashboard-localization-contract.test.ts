import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

function readSource(path: string): string {
  return readFileSync(path, "utf8");
}

test("shared provider playground uses localized visible copy", () => {
  const source = readSource(
    "src/app/(dashboard)/dashboard/media-providers/components/LlmChatCard.tsx"
  );
  for (const rawText of [
    "Send a message to start the conversation",
    "Shift+Enter for newline",
    ">Clear<",
    'title="Stop"',
  ]) {
    assert.equal(source.includes(rawText), false, `raw playground copy: ${rawText}`);
  }
});

test("CLI guide fallback checks key existence before translating", () => {
  const source = readSource(
    "src/app/(dashboard)/dashboard/cli-code/components/DefaultToolCard.tsx"
  );
  assert.match(source, /if \(!t\.has\(key\)\) return fallback;/);
});

test("known provider PNGs resolve locally before the external CDN", () => {
  const source = readSource("src/shared/components/ProviderIcon.tsx");
  assert.match(source, /"poe-web": "poe"/);
  assert.match(source, /"opencode-go": "opencode"/);
  assert.match(source, /"opencode-zen": "opencode"/);
  assert.ok(source.indexOf("if (hasPng && !pngFailed)") < source.indexOf("if (!theSvgFailed)"));
});

test("provider onboarding renders provider logos instead of treating catalog ids as glyphs", () => {
  const source = readSource(
    "src/app/(dashboard)/dashboard/providers/components/onboarding/ProviderOnboardingWizard.tsx"
  );
  assert.match(source, /<ProviderIcon/);
  assert.equal(source.includes("{option.icon}"), false);
});

test("shared empty states render Material Symbol ids as icons", () => {
  const source = readSource("src/shared/components/EmptyState.tsx");
  assert.match(source, /usesMaterialSymbol/);
  assert.match(source, /className="material-symbols-outlined"/);
});

test("compression engine pages localize API-driven labels and normalize icon ids", () => {
  const source = readSource("src/shared/components/compression/EngineConfigPage.tsx");
  assert.match(source, /useTranslations\("compressionEngineConfig"\)/);
  assert.match(source, /brain: "psychology"/);
  assert.equal(source.includes(">Last 7 days<"), false);
  assert.equal(source.includes("Turn this layer on/off"), false);
});

test("budget management does not expose deferred English-only states", () => {
  const source = readSource("src/app/(dashboard)/dashboard/usage/components/BudgetTab.tsx");
  for (const rawText of [
    ">Budget<",
    ">Templates:<",
    ">Projection<",
    ">Cost breakdown (30d)<",
    ">Limits<",
    ">Daily<",
    "No keys selected",
    "Failed to apply template",
  ]) {
    assert.equal(source.includes(rawText), false, `raw budget copy: ${rawText}`);
  }
});

test("feature-flag descriptions are localized without changing flag values", () => {
  const card = readSource("src/app/(dashboard)/dashboard/settings/components/FeatureFlagCard.tsx");
  const messages = JSON.parse(readSource("src/i18n/messages/vi.json"));
  assert.match(card, /enumValues\.\$\{val\}/);
  assert.ok(messages.featureFlags.definitions.REQUIRE_API_KEY.description.includes("khóa API"));
  assert.ok(
    messages.featureFlags.definitions.OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES.description.includes(
      "Claude Code"
    )
  );
});

test("analytics charts localize calendar, account, and diversity labels", () => {
  const sources = [
    readSource("src/shared/components/analytics/charts.tsx"),
    readSource("src/shared/components/analytics/rechartsDonuts.tsx"),
    readSource("src/app/(dashboard)/dashboard/analytics/components/DiversityScoreCard.tsx"),
  ].join("\n");
  for (const rawText of [
    ">Less<",
    ">More<",
    ">Most Active Day<",
    ">By Account<",
    ">By API Key<",
    '"Healthy Distribution"',
  ]) {
    assert.equal(sources.includes(rawText), false, `raw analytics copy: ${rawText}`);
  }
});

test("no-auth provider controls contain no raw English headings", () => {
  const sources = [
    readSource("src/shared/components/NoAuthAccountCard.tsx"),
    readSource("src/shared/components/NoAuthProviderCard.tsx"),
  ].join("\n");
  assert.equal(sources.includes(">No authentication required<"), false);
  assert.equal(sources.includes(">Configure proxy<"), false);
  assert.equal(sources.includes(">Remove account<"), false);
});

test("Vietnamese navigation preserves engine and product names", () => {
  const messages = JSON.parse(readSource("src/i18n/messages/vi.json"));
  assert.equal(messages.sidebar.contextLite, "Lite");
  assert.equal(messages.sidebar.contextAggressive, "Aggressive");
  assert.equal(messages.sidebar.contextHeadroom, "Headroom");
  assert.equal(messages.sidebar.contextSessionDedup, "Session Dedup");
  assert.equal(messages.sidebar.compressionStudio, "Compression Studio");
  assert.equal(messages.sidebar.cliCode, "CLI Code");
  assert.equal(messages.sidebar.trafficInspector, "Traffic Inspector");
});

test("CLI cards use packaged brand icons whenever an asset exists", () => {
  const catalog = readSource("src/shared/constants/cliTools.ts");
  for (const image of [
    "/providers/claude.svg",
    "/providers/codex.svg",
    "/providers/cline.svg",
    "/providers/qwen.svg",
    "/providers/cursor.svg",
    "/providers/roocode.svg",
    "/providers/deepseek.svg",
  ]) {
    assert.ok(catalog.includes(`image: "${image}"`), `missing CLI icon mapping: ${image}`);
  }

  const card = readSource("src/shared/components/cli/CliToolCard.tsx");
  assert.match(card, /tool\.imageDark \|\| tool\.imageLight/);
  assert.match(card, /tool\.imageLight \|\| tool\.imageDark/);
});

test("changelog and settings breadcrumbs use localized labels", () => {
  const changelog = [
    readSource("src/app/(dashboard)/dashboard/changelog/page.tsx"),
    readSource("src/app/(dashboard)/dashboard/changelog/components/NewsViewer.tsx"),
    readSource("src/app/(dashboard)/dashboard/changelog/components/ChangelogViewer.tsx"),
  ].join("\n");
  for (const rawText of [
    'label: "News"',
    'label: "Changelog"',
    "No new announcements at this time.",
    "Could not load the changelog.",
    "View Full History on GitHub",
  ]) {
    assert.equal(changelog.includes(rawText), false, `raw changelog copy: ${rawText}`);
  }

  const breadcrumbs = readSource("src/shared/components/Breadcrumbs.tsx");
  assert.match(breadcrumbs, /general: "general"/);
  assert.match(breadcrumbs, /"feature-flags": "featureFlags"/);
});

test("production audit regressions stay localized and provider icons stay bounded", () => {
  const costs = readSource("src/app/(dashboard)/dashboard/costs/CostOverviewTab.tsx");
  assert.match(costs, /formatWeekdayLabel\(row\.day, locale\)/);
  assert.equal(costs.includes("} tokens`"), false);

  const storage = [
    readSource("src/app/(dashboard)/dashboard/settings/components/SystemStorageTab.tsx"),
    readSource("src/app/(dashboard)/dashboard/settings/components/DatabaseBackupRetentionCard.tsx"),
  ].join("\n");
  for (const rawText of [
    ">Database Statistics<",
    "Automatic SQLite backups are stored",
    ">Keep latest backups<",
    ">Save retention<",
  ]) {
    assert.equal(storage.includes(rawText), false, `raw storage copy: ${rawText}`);
  }

  const endpoint = readSource("src/app/(dashboard)/dashboard/endpoint/EndpointPageClient.tsx");
  for (const rawText of [
    'label: "Context Sources"',
    ">Active Endpoints<",
    ">Running<",
    ">Tunnels<",
    ">Not configured<",
  ]) {
    assert.equal(endpoint.includes(rawText), false, `raw endpoint copy: ${rawText}`);
  }

  const security = readSource("src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx");
  assert.match(security, /<ProviderIcon/);
  assert.equal(security.includes('{isBlocked ? "block" : provider.icon}'), false);
});
