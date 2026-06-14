import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, it } from "node:test";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "../..");
const BROWSER_POOL_PATH = path.join(REPO_ROOT, "open-sse/services/browserPool.ts");

describe("browserPool optional cloakbrowser import", () => {
  it("keeps cloakbrowser out of static dynamic import resolution", () => {
    const source = readFileSync(BROWSER_POOL_PATH, "utf8");

    assert.equal(
      /import\(\s*["']cloakbrowser["']\s*\)/.test(source),
      false,
      "cloakbrowser must remain runtime-optional; static dynamic import triggers Turbopack resolution"
    );
    assert.match(
      source,
      /Turbopack resolve it during route compilation/,
      "the computed import rationale should stay documented near the helper"
    );
    assert.match(source, /return \["cloak", "browser"\]\.join\(""\);/);
  });
});
