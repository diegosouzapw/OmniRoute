import test from "node:test";
import assert from "node:assert/strict";
import { createCipheriv, randomBytes, scryptSync } from "node:crypto";
import path from "node:path";
import { pathToFileURL } from "node:url";

// #11500 — the #9927 fix deduped raw decrypt-failure logging only inside
// decryptConnectionFields(). The lazy-decrypt rollout (createLazyRowProxy /
// createLazyConnectionView in src/lib/db/providers/lazyConnectionView.ts,
// used by getProviderConnections() on every CredentialHealth/model-sync
// cycle) called decrypt() directly with no quiet option and no dedup
// tracking, so the raw "[Encryption] Decryption failed..." line re-fired on
// every cycle for the same corrupt/stale-key credential.

const ORIGINAL_STORAGE_KEY = process.env.STORAGE_ENCRYPTION_KEY;

async function importFresh(modulePath: string) {
  const url = pathToFileURL(path.resolve(modulePath)).href;
  return import(`${url}?test=${Date.now()}-${Math.random().toString(16).slice(2)}`);
}

function encryptWithStaticSalt(secret: string, salt: string, plaintext: string): string {
  const key = scryptSync(secret, salt, 32);
  const iv = randomBytes(16);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  let encrypted = cipher.update(plaintext, "utf8", "hex");
  encrypted += cipher.final("hex");
  const authTag = cipher.getAuthTag().toString("hex");
  return `enc:v1:${iv.toString("hex")}:${encrypted}:${authTag}`;
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
    logs.push(args.map(String).join(" "));
  };
  try {
    fn();
  } finally {
    console.error = original;
  }
  return logs;
}

test("#11500 — createLazyRowProxy dedupes decrypt-failure logging across sync cycles", async () => {
  process.env.STORAGE_ENCRYPTION_KEY = "probe-11500-current-key";

  const { createLazyRowProxy } = await importFresh("src/lib/db/providers/lazyConnectionView.ts");

  // Credential encrypted with a DIFFERENT key than the one currently
  // configured (stale STORAGE_ENCRYPTION_KEY / corrupted row) — produces
  // exactly "Auth tag validation likely failed."
  const staleCiphertext = encryptWithStaticSalt(
    "some-other-key-that-was-rotated-away",
    "omniroute-field-encryption-v1",
    "sk-super-secret-api-key"
  );

  const rawRow = {
    id: "conn-zai-1",
    provider: "zai",
    apiKey: staleCiphertext,
    accessToken: null,
    refreshToken: null,
    idToken: null,
  };

  const capturedLines = captureConsoleError(() => {
    // Simulate 3 separate CredentialHealth / model-sync cycles, each of
    // which calls getProviderConnections() fresh and gets a brand-new
    // createLazyRowProxy() over a brand-new row object for the SAME
    // underlying corrupt DB row.
    for (let cycle = 0; cycle < 3; cycle++) {
      const view = createLazyRowProxy({ ...rawRow });
      void view.apiKey;
    }
  });

  const rawDecryptFailureLines = capturedLines.filter((line) =>
    line.includes("[Encryption] Decryption failed. Ciphertext prefix:")
  );

  assert.equal(
    rawDecryptFailureLines.length,
    1,
    `expected the raw decrypt-failure line to be logged at most once across 3 sync cycles for the ` +
      `same corrupt credential, but it was logged ${rawDecryptFailureLines.length} times: ` +
      JSON.stringify(rawDecryptFailureLines, null, 2)
  );
});

test("#11500 — createLazyConnectionView dedupes decrypt-failure logging across sync cycles", async () => {
  process.env.STORAGE_ENCRYPTION_KEY = "probe-11500-current-key-view";

  const { createLazyConnectionView } = await importFresh(
    "src/lib/db/providers/lazyConnectionView.ts"
  );

  const staleCiphertext = encryptWithStaticSalt(
    "some-other-key-that-was-rotated-away-view",
    "omniroute-field-encryption-v1",
    "sk-super-secret-api-key-view"
  );

  const rawRow = {
    id: "conn-glm-1",
    provider: "glm",
    apiKey: staleCiphertext,
    accessToken: null,
    refreshToken: null,
  };

  const capturedLines = captureConsoleError(() => {
    for (let cycle = 0; cycle < 3; cycle++) {
      const view = createLazyConnectionView({ ...rawRow });
      void view.apiKey;
    }
  });

  const rawDecryptFailureLines = capturedLines.filter((line) =>
    line.includes("[Encryption] Decryption failed. Ciphertext prefix:")
  );

  assert.equal(
    rawDecryptFailureLines.length,
    1,
    `expected the raw decrypt-failure line to be logged at most once across 3 sync cycles for the ` +
      `same corrupt credential, but it was logged ${rawDecryptFailureLines.length} times: ` +
      JSON.stringify(rawDecryptFailureLines, null, 2)
  );
});
