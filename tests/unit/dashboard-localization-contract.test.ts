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
  assert.ok(source.indexOf("if (hasPng && !pngFailed)") < source.indexOf("if (!theSvgFailed)"));
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
