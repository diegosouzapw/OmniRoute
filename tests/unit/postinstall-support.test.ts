import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

import { hasStandaloneAppBundle, isTermux } from "../../scripts/build/postinstallSupport.mjs";

test("hasStandaloneAppBundle returns false for source checkout without standalone app", () => {
  const root = mkdtempSync(join(tmpdir(), "omniroute-postinstall-src-"));

  try {
    mkdirSync(join(root, "src", "app"), { recursive: true });
    assert.equal(hasStandaloneAppBundle(root), false);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

test("hasStandaloneAppBundle returns true for published standalone app bundle", () => {
  const root = mkdtempSync(join(tmpdir(), "omniroute-postinstall-standalone-"));

  try {
    mkdirSync(join(root, "app"), { recursive: true });
    writeFileSync(join(root, "app", "server.js"), "export {};\n");
    assert.equal(hasStandaloneAppBundle(root), true);
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});

// isTermux detection
test("isTermux returns false when no termux signals present", () => {
  assert.equal(isTermux({}), false);
});

test("isTermux returns true when TERMUX_VERSION is set", () => {
  assert.equal(isTermux({ TERMUX_VERSION: "0.119" }), true);
});

test("isTermux returns true when PREFIX contains com.termux", () => {
  assert.equal(isTermux({ PREFIX: "/data/data/com.termux/files/usr" }), true);
});

test("isTermux returns false for non-termux PREFIX", () => {
  assert.equal(isTermux({ PREFIX: "/usr/local" }), false);
});
