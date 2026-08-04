/**
 * Regression guard: /dashboard/cli-code must NOT contain MITM UI.
 * MITM setup now lives exclusively in AgentBridge (plan 11 §12 #10, R5-2).
 *
 * Uses source-text inspection — no JSDOM render needed.
 */
import { describe, it } from "vitest";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAGE_PATH = path.resolve(
  __dirname,
  "../../../src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx"
);

const src = readFileSync(PAGE_PATH, "utf-8");

describe("CliCodePageClient — no MITM duplication (R5-2)", () => {
  it("MITM_TOOL_IDS constant is not defined", () => {
    assert.ok(
      !src.includes("MITM_TOOL_IDS"),
      "MITM_TOOL_IDS must be removed from CliCodePageClient.tsx"
    );
  });

  it("mitm tab value is not present in SegmentedControl options", () => {
    assert.ok(
      !src.includes('value: "mitm"'),
      'Tab entry { value: "mitm" } must be removed from CliCodePageClient.tsx'
    );
  });

  it("mitmClientsTab i18n key is not referenced in render", () => {
    assert.ok(
      !src.includes('t("mitmClientsTab")'),
      "mitmClientsTab must not be called in CliCodePageClient.tsx"
    );
  });

  it("AntigravityToolCard is not imported", () => {
    assert.ok(
      !src.includes("AntigravityToolCard"),
      "AntigravityToolCard import must be removed from CLIToolsPageClient.tsx"
    );
  });
});
