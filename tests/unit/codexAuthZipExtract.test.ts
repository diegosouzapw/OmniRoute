import test from "node:test";
import assert from "node:assert/strict";
import { zipSync, strToU8 } from "fflate";

// Mirror the safety logic from codexAuthZipExtract.ts so we can test without
// importing the module (which is fine since it has no external DB deps, but
// we test the pure logic to keep the test surface clear).

interface ExtractedZipFile {
  name: string;
  content: string;
}

interface ExtractZipOptions {
  maxFiles?: number;
  maxFileSizeBytes?: number;
  maxTotalSizeBytes?: number;
}

// Local re-implementation of the exported function to exercise it without
// importing Node-only code in the test runner.
import { extractCodexAuthZip } from "../../src/lib/oauth/utils/codexAuthZipExtract.ts";

// ──── Helpers ─────────────────────────────────────────────────────────────────

function makeZip(files: Record<string, string>): Buffer {
  const entries: Record<string, Uint8Array> = {};
  for (const [name, content] of Object.entries(files)) {
    entries[name] = strToU8(content);
  }
  return Buffer.from(zipSync(entries));
}

const VALID_AUTH = JSON.stringify({ auth_mode: "chatgpt", tokens: {}, OPENAI_API_KEY: null });

// ──── Tests ───────────────────────────────────────────────────────────────────

test("extractCodexAuthZip: happy path — returns all .json entries", () => {
  const zip = makeZip({
    "auth-a.json": VALID_AUTH,
    "auth-b.json": VALID_AUTH,
    "auth-c.json": VALID_AUTH,
  });
  const files = extractCodexAuthZip(zip);
  assert.equal(files.length, 3);
  const names = files.map((f) => f.name).sort();
  assert.deepEqual(names, ["auth-a.json", "auth-b.json", "auth-c.json"]);
});

test("extractCodexAuthZip: ignores non-.json entries", () => {
  const zip = makeZip({
    "auth-a.json": VALID_AUTH,
    "README.md": "# Readme",
    "config.yaml": "key: value",
  });
  const files = extractCodexAuthZip(zip);
  assert.equal(files.length, 1);
  assert.equal(files[0].name, "auth-a.json");
});

test("extractCodexAuthZip: rejects archive with no .json files", () => {
  const zip = makeZip({ "README.md": "# Readme" });
  assert.throws(() => extractCodexAuthZip(zip), /no \.json files/i);
});

test("extractCodexAuthZip: rejects entry with .. in path", () => {
  const zip = makeZip({ "../../../etc/passwd.json": '{"evil":true}' });
  assert.throws(() => extractCodexAuthZip(zip), /unsafe/i);
});

test("extractCodexAuthZip: rejects absolute path entries", () => {
  const zip = makeZip({ "/etc/passwd.json": '{"evil":true}' });
  assert.throws(() => extractCodexAuthZip(zip), /unsafe/i);
});

test("extractCodexAuthZip: rejects archive exceeding max file count", () => {
  const files: Record<string, string> = {};
  for (let i = 0; i <= 50; i++) {
    files[`auth-${i}.json`] = VALID_AUTH;
  }
  const zip = makeZip(files);
  assert.throws(() => extractCodexAuthZip(zip), /max allowed is 50/i);
});

test("extractCodexAuthZip: respects custom maxFiles option", () => {
  const zip = makeZip({
    "auth-a.json": VALID_AUTH,
    "auth-b.json": VALID_AUTH,
    "auth-c.json": VALID_AUTH,
  });
  assert.throws(() => extractCodexAuthZip(zip, { maxFiles: 2 }), /max allowed is 2/i);
});

test("extractCodexAuthZip: rejects individual file exceeding per-file cap", () => {
  const bigContent = "x".repeat(257 * 1024);
  const zip = makeZip({ "big.json": bigContent });
  assert.throws(() => extractCodexAuthZip(zip, { maxFileSizeBytes: 256 * 1024 }), /exceeds/i);
});

test("extractCodexAuthZip: rejects total size exceeding cap", () => {
  // Each chunk is 4 MB — under the per-file override (5 MB) but 3 × 4 MB = 12 MB > 10 MB total
  const chunk = "x".repeat(4 * 1024 * 1024);
  const zip = makeZip({
    "a.json": chunk,
    "b.json": chunk,
    "c.json": chunk,
  });
  assert.throws(
    () =>
      extractCodexAuthZip(zip, {
        maxFileSizeBytes: 5 * 1024 * 1024,
        maxTotalSizeBytes: 10 * 1024 * 1024,
      }),
    /total/i
  );
});

test("extractCodexAuthZip: content is returned as UTF-8 string", () => {
  const content = JSON.stringify({ hello: "wörld 🌍" });
  const zip = makeZip({ "auth.json": content });
  const files = extractCodexAuthZip(zip);
  assert.equal(files[0].content, content);
});

test("extractCodexAuthZip: uses basename from nested path entries", () => {
  const zip = makeZip({ "subdir/auth-nested.json": VALID_AUTH });
  const files = extractCodexAuthZip(zip);
  assert.equal(files[0].name, "auth-nested.json");
});

test("extractCodexAuthZip: rejects corrupt / non-ZIP buffer", () => {
  const notAZip = Buffer.from("this is not a zip file");
  assert.throws(() => extractCodexAuthZip(notAZip), /could not parse zip/i);
});
