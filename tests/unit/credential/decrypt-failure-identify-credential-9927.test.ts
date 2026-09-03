import test from "node:test";
import assert from "node:assert/strict";
import path from "node:path";
import { pathToFileURL } from "node:url";

// #9927 — A credential that no longer decrypts (e.g. STORAGE_ENCRYPTION_KEY
// changed between restarts) must emit a single, enriched error naming the
// provider + connection id + failing field(s) and a recovery path, instead of
// the generic low-level `[Encryption] Decryption failed … Auth tag validation
// likely failed` line that carries no identity and is re-printed every sweep.

const ORIGINAL_STORAGE_KEY = process.env.STORAGE_ENCRYPTION_KEY;

// Cache-busted fresh import so the encryption module re-derives its key from
// the current STORAGE_ENCRYPTION_KEY and resets module-level dedupe state.
async function importFresh(modulePath: string) {
  const url = pathToFileURL(path.resolve(modulePath)).href;
  return import(`${url}?test=${Date.now()}-${Math.random().toString(16).slice(2)}`);
}

test.after(() => {
  if (ORIGINAL_STORAGE_KEY === undefined) {
    delete process.env.STORAGE_ENCRYPTION_KEY;
  } else {
    process.env.STORAGE_ENCRYPTION_KEY = ORIGINAL_STORAGE_KEY;
  }
});

function captureConsoleError(fn: () => void): string[] {
  const original = console.error;
  const logs: string[] = [];
  console.error = (...args: unknown[]) => {
    logs.push(args.join(" "));
  };
  try {
    fn();
  } finally {
    console.error = original;
  }
  return logs;
}

test("decryptConnectionFields logs failed credential identity + recovery path (#9927)", async () => {
  // 1. Encrypt an apiKey under key A.
  process.env.STORAGE_ENCRYPTION_KEY = "stale-key-9927-A";
  const encA = await importFresh("src/lib/db/encryption.ts");
  const ciphertext = encA.encrypt("sk-real-secret-key");
  assert.match(ciphertext, /^enc:v1:/, "expected a real enc:v1 ciphertext");

  // 2. Read it back under a DIFFERENT key B (simulating a changed key).
  process.env.STORAGE_ENCRYPTION_KEY = "stale-key-9927-B";
  const encB = await importFresh("src/lib/db/encryption.ts");

  const logs = captureConsoleError(() => {
    encB.decryptConnectionFields({
      id: "conn-9927",
      provider: "openai",
      apiKey: ciphertext,
    });
  });

  // Must flag the failure so callers can surface the cause.
  const decrypted = encB.decryptConnectionFields({
    id: "conn-9927",
    provider: "openai",
    apiKey: ciphertext,
  });
  assert.equal(decrypted.credentialDecryptFailed, true);

  // The generic low-level log must NOT fire (quiet:true); instead ONE enriched
  // message names provider + connection id + recovery path.
  assert.equal(
    logs.some((l) => /Auth tag validation likely failed/.test(l)),
    false,
    "generic low-level decrypt log must be suppressed on the connection path"
  );

  const enriched = logs.find((l) => l.includes("Failed to decrypt credential(s)"));
  assert.ok(enriched, "expected an enriched credential-decrypt-failure log");
  assert.match(enriched, /provider "openai"/, "log must name the provider");
  assert.match(enriched, /conn-9927/, "log must name the connection id");
  assert.match(enriched, /apiKey/, "log must name the failing field");
  assert.match(
    enriched,
    /STORAGE_ENCRYPTION_KEY matches the key used to store it/,
    "log must include the recovery path"
  );
});

test("credential-decrypt failure is logged once per connection (dedupe #9927)", async () => {
  process.env.STORAGE_ENCRYPTION_KEY = "stale-key-9927-dedupe-A";
  const encA = await importFresh("src/lib/db/encryption.ts");
  const ciphertext = encA.encrypt("sk-dedupe-key");

  process.env.STORAGE_ENCRYPTION_KEY = "stale-key-9927-dedupe-B";
  const encB = await importFresh("src/lib/db/encryption.ts");

  const row = { id: "conn-dedupe", provider: "openai", apiKey: ciphertext };
  const logs = captureConsoleError(() => {
    // Simulate the health sweep re-decrypting the same corrupt row repeatedly.
    for (let i = 0; i < 5; i++) {
      encB.decryptConnectionFields(row);
    }
  });

  const enriched = logs.filter((l) => l.includes("Failed to decrypt credential(s)"));
  assert.equal(enriched.length, 1, "identical failure must be logged once per connection");
});
