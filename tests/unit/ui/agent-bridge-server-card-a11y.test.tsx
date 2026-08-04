/**
 * a11y tests for AgentBridgeServerCard — each action button must have aria-label.
 * Uses source-text inspection (no JSDOM render needed) for the structural assertion.
 */
import { describe, it } from "vitest";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CARD_PATH = path.resolve(
  __dirname,
  "../../../src/app/(dashboard)/dashboard/tools/agent-bridge/components/AgentBridgeServerCard.tsx",
);

const src = readFileSync(CARD_PATH, "utf-8");

describe("AgentBridgeServerCard aria-labels (B2)", () => {
  it("Start button has aria-label", () => {
    // Start button: onClick start, aria-label present
    assert.ok(
      src.includes('aria-label={t("startServer")}'),
      'Start button must have aria-label={t("startServer")}',
    );
  });

  it("Stop button has aria-label", () => {
    assert.ok(
      src.includes('aria-label={t("stopServer")}'),
      'Stop button must have aria-label={t("stopServer")}',
    );
  });

  it("Restart button has aria-label", () => {
    assert.ok(
      src.includes('aria-label={t("restartServer")}'),
      'Restart button must have aria-label={t("restartServer")}',
    );
  });

  it("Trust Cert button has aria-label", () => {
    assert.ok(
      src.includes('aria-label={t("trustCert")}'),
      'Trust Cert button must have aria-label={t("trustCert")}',
    );
  });

  it("Download Cert anchor has aria-label", () => {
    assert.ok(
      src.includes('aria-label={t("downloadCert")}'),
      'Download Cert anchor must have aria-label={t("downloadCert")}',
    );
  });

  it("Regenerate Cert button has aria-label", () => {
    assert.ok(
      src.includes('aria-label={t("regenerateCert")}'),
      'Regenerate Cert button must have aria-label={t("regenerateCert")}',
    );
  });

  it("all 5 buttons and 1 anchor have aria-label attributes (6 total)", () => {
    // Count aria-label occurrences in action buttons section
    const matches = src.match(/aria-label=\{t\(/g) ?? [];
    assert.ok(
      matches.length >= 6,
      `Expected at least 6 aria-label attributes, found ${matches.length}`,
    );
  });
});

describe("SessionRecorderBar aria-labels (B2)", () => {
  const BAR_PATH = path.resolve(
    __dirname,
    "../../../src/app/(dashboard)/dashboard/tools/traffic-inspector/components/session/SessionRecorderBar.tsx",
  );
  const barSrc = readFileSync(BAR_PATH, "utf-8");

  it("REC (recordSession) button has aria-label", () => {
    assert.ok(
      barSrc.includes('aria-label={t("recordSession")}'),
      'REC button must have aria-label={t("recordSession")}',
    );
  });

  it("Stop (stopSession) button has aria-label", () => {
    assert.ok(
      barSrc.includes('aria-label={t("stopSession")}'),
      'Stop button must have aria-label={t("stopSession")}',
    );
  });
});
