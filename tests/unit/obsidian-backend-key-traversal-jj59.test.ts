import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { ObsidianBackend } from "../../src/lib/memory/obsidianBackend.ts";
import { MemoryType } from "../../src/lib/memory/types.ts";

const root = fs.mkdtempSync(path.join(os.tmpdir(), "obsidian-jj59-"));
const vault = path.join(root, "vault");
fs.mkdirSync(vault);

test.after(() => fs.rmSync(root, { recursive: true, force: true }));

function input(key: string) {
  return {
    apiKeyId: "k1",
    sessionId: "s1",
    type: MemoryType.FACTUAL,
    key,
    content: "payload",
    metadata: {},
  };
}

test("create rejects a key that escapes the vault (GHSA-jj59-hx95-569p)", async () => {
  const backend = new ObsidianBackend(vault);
  for (const key of ["../escaped", "../../escaped-deep", "nested/../../escaped-mixed"]) {
    await assert.rejects(backend.create(input(key)), /invalid memory key/i, key);
  }
  assert.deepEqual(
    fs.readdirSync(root).sort(),
    ["vault"],
    "no file may be written next to the vault"
  );
  assert.deepEqual(fs.readdirSync(vault), [], "nothing is written for a rejected key");
});

test("create rejects keys with path separators or NUL bytes", async () => {
  const backend = new ObsidianBackend(vault);
  for (const key of ["sub/dir", "sub\\dir", "a\0b", "", ".", ".."]) {
    await assert.rejects(backend.create(input(key)), /invalid memory key/i, JSON.stringify(key));
  }
});

test("create still writes a plain key inside the vault", async () => {
  const backend = new ObsidianBackend(vault);
  const memory = await backend.create(input("user.preference-1"));
  assert.equal(memory.key, "user.preference-1");
  assert.ok(fs.existsSync(path.join(vault, "user.preference-1.md")));
});
