import { describe, it, before, after, beforeEach } from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-test-flag-loop-"));
process.env.DATA_DIR = tmpDir;

const { FEATURE_FLAG_DEFINITIONS } =
  await import("../../../src/shared/constants/featureFlagDefinitions.ts");
const { setFeatureFlagOverride, clearAllFeatureFlagOverrides } =
  await import("../../../src/lib/db/featureFlags.ts");
const { isServerOwnedToolLoopEnabled } = await import("../../../src/shared/utils/featureFlags.ts");

describe("SERVER_OWNED_TOOL_LOOP_ENABLED flag definition", () => {
  it("exists in FEATURE_FLAG_DEFINITIONS", () => {
    const def = FEATURE_FLAG_DEFINITIONS.find((d) => d.key === "SERVER_OWNED_TOOL_LOOP_ENABLED");
    assert.ok(def, "SERVER_OWNED_TOOL_LOOP_ENABLED should exist");
    assert.equal(def.category, "runtime");
    assert.equal(def.defaultValue, "false");
    assert.equal(def.requiresRestart, false);
    assert.equal(def.descriptionI18nKey, "featureFlagServerOwnedToolLoopDescription");
  });
});

describe("isServerOwnedToolLoopEnabled wrapper", () => {
  beforeEach(() => {
    clearAllFeatureFlagOverrides();
  });

  it("returns false when no override is set (default)", () => {
    assert.equal(isServerOwnedToolLoopEnabled(), false);
  });

  it("returns true when DB override is set to true", () => {
    setFeatureFlagOverride("SERVER_OWNED_TOOL_LOOP_ENABLED", "true");
    assert.equal(isServerOwnedToolLoopEnabled(), true);
  });

  it("returns false and logs when injected reader throws", () => {
    const logs: unknown[] = [];
    const origError = console.error;
    console.error = (...args: unknown[]) => {
      logs.push(args);
    };
    try {
      const throwingReader = () => {
        throw new Error("flag read failed");
      };
      const result = isServerOwnedToolLoopEnabled(throwingReader);
      assert.equal(result, false);
      assert.ok(logs.length >= 1, "console.error should be called at least once");
      assert.ok(
        logs.some((args) =>
          String(args).includes("Failed to resolve SERVER_OWNED_TOOL_LOOP_ENABLED")
        ),
        "error log should mention the flag key"
      );
    } finally {
      console.error = origError;
    }
  });
});

describe("feature-flags-settings count update", () => {
  it("flag count matches updated expected value", () => {
    assert.equal(FEATURE_FLAG_DEFINITIONS.length, 55);
  });
});

describe("i18n key parity for SERVER_OWNED_TOOL_LOOP_ENABLED", () => {
  let enMessages: Record<string, unknown>;
  let ptBrMessages: Record<string, unknown>;

  before(async () => {
    const enRaw = fs.readFileSync(
      path.resolve(__dirname, "../../../src/i18n/messages/en.json"),
      "utf8"
    );
    enMessages = JSON.parse(enRaw);
    const ptBrRaw = fs.readFileSync(
      path.resolve(__dirname, "../../../src/i18n/messages/pt-BR.json"),
      "utf8"
    );
    ptBrMessages = JSON.parse(ptBrRaw);
  });

  it("en.json has nested featureFlags.definitions.SERVER_OWNED_TOOL_LOOP_ENABLED.label", () => {
    const defs = enMessages.featureFlags as Record<string, unknown> | undefined;
    assert.ok(defs, "en.json should have featureFlags section");
    const definitions = (defs as Record<string, unknown>).definitions as
      Record<string, unknown> | undefined;
    assert.ok(definitions, "en.json featureFlags should have definitions");
    const flagDef = definitions.SERVER_OWNED_TOOL_LOOP_ENABLED as
      Record<string, unknown> | undefined;
    assert.ok(flagDef, "definitions should contain SERVER_OWNED_TOOL_LOOP_ENABLED");
    assert.equal(flagDef.label, "Server-Owned Tool Loop");
    assert.equal(
      flagDef.description,
      "Continue non-streaming server-owned tool calls until the model returns a client-usable response."
    );
  });

  it("pt-BR.json has nested featureFlags.definitions.SERVER_OWNED_TOOL_LOOP_ENABLED.label", () => {
    const defs = ptBrMessages.featureFlags as Record<string, unknown> | undefined;
    assert.ok(defs, "pt-BR.json should have featureFlags section");
    const definitions = (defs as Record<string, unknown>).definitions as
      Record<string, unknown> | undefined;
    assert.ok(definitions, "pt-BR.json featureFlags should have definitions");
    const flagDef = definitions.SERVER_OWNED_TOOL_LOOP_ENABLED as
      Record<string, unknown> | undefined;
    assert.ok(flagDef, "definitions should contain SERVER_OWNED_TOOL_LOOP_ENABLED");
    assert.equal(flagDef.label, "Server-Owned Tool Loop");
    assert.equal(typeof flagDef.description, "string");
    assert.ok(
      ((flagDef.description as string) || "").length > 0,
      "description should be non-empty"
    );
  });

  it("en.json does NOT have stale top-level featureFlagServerOwnedToolLoopDescription", () => {
    assert.equal(
      (enMessages as Record<string, unknown>).featureFlagServerOwnedToolLoopDescription,
      undefined,
      "top-level key should be removed"
    );
  });
});

after(() => {
  try {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  } catch {
    // ignore
  }
});
