import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { PROVIDERS } from "../../open-sse/config/constants.ts";
import {
  buildProviderHeaders,
  buildProviderUrl,
  getTargetFormat,
} from "../../open-sse/services/provider.ts";
import { goldenSnapshot } from "../helpers/goldenSnapshot.ts";

// A1 GOLDEN LOCK: freeze the OUTPUT of services/provider.ts on the translate route
// path — buildProviderUrl / buildProviderHeaders / getTargetFormat — across every
// registered provider. This runs in PARALLEL to the executor URL/header builders.
// Goal: before merging the translate-path with the executor builders, lock the
// current translate-path behavior so any drift is caught as a snapshot diff.
//
// Ported from decolua/9router golden-provider-service test (JS/vitest) — adapted to
// OmniRoute's TS provider service + node:test goldenSnapshot helper.

const API_KEY_CRED = { apiKey: "sk-test-APIKEY", providerSpecificData: {} };
const OAUTH_CRED = { accessToken: "tok-test-ACCESS", providerSpecificData: {} };

// Strip tokens + dynamic fields (github x-request-id uuid, kimi device-id) so the
// snapshot is stable run-to-run.
// Live Node version leaks into headers (e.g. X-PLATFORM-VERSION = process.version)
// and varies by environment/patch (local v24.16 vs CI v24.17), so it must be
// normalized away — otherwise the golden is only stable on the exact Node patch it
// was generated on. Both `vX.Y.Z` (process.version) and `X.Y.Z`
// (process.versions.node) forms are collapsed to <NODE>.
const NODE_VERSION = typeof process !== "undefined" ? process.version : "";
const NODE_VERSION_BARE = typeof process !== "undefined" ? (process.versions?.node ?? "") : "";

function sanitize(headers: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(headers)) {
    if (typeof v !== "string") {
      out[k] = v;
      continue;
    }
    let s = v
      .replace(/Bearer .+/, "Bearer <TOK>")
      .replace(/sk-test-APIKEY|tok-test-ACCESS/g, "<CRED>")
      .replace(/kimi-\d{10,}/g, "kimi-<TS>")
      .replace(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i, "<UUID>");
    if (NODE_VERSION) s = s.split(NODE_VERSION).join("<NODE>");
    if (NODE_VERSION_BARE) s = s.split(NODE_VERSION_BARE).join("<NODE>");
    out[k] = s;
  }
  return out;
}

function safe<T>(fn: () => T): T | string {
  try {
    return fn();
  } catch (e) {
    return `THROW: ${(e as Error).message}`;
  }
}

const providerIds = Object.keys(PROVIDERS).sort();

type ProviderTranslatePathEntry = {
  url: { stream: unknown; nonStream: unknown };
  headers: { apiKey: unknown; oauth: unknown; nonStream: unknown };
  format: unknown;
};

export function buildProviderTranslatePathSnapshot(): Record<string, ProviderTranslatePathEntry> {
  const snapshot: Record<string, ProviderTranslatePathEntry> = {};
  for (const pid of providerIds) {
    const noAuth = Boolean((PROVIDERS as Record<string, { noAuth?: boolean }>)[pid]?.noAuth);
    const cred = noAuth ? {} : API_KEY_CRED;
    const credOauth = noAuth ? {} : OAUTH_CRED;
    snapshot[pid] = {
      url: {
        stream: safe(() => buildProviderUrl(pid, "test-model", true, {})),
        nonStream: safe(() => buildProviderUrl(pid, "test-model", false, {})),
      },
      headers: {
        apiKey: safe(() => sanitize(buildProviderHeaders(pid, cred, true))),
        oauth: safe(() => sanitize(buildProviderHeaders(pid, credOauth, true))),
        nonStream: safe(() => sanitize(buildProviderHeaders(pid, cred, false))),
      },
      format: safe(() => getTargetFormat(pid)),
    };
  }
  return snapshot;
}

test("GOLDEN provider.ts translate-path is stable across all providers", () => {
  const snapshot = buildProviderTranslatePathSnapshot();
  // Sanity: the snapshot must cover every registered provider.
  assert.equal(Object.keys(snapshot).length, providerIds.length);
  assert.ok(providerIds.length > 0, "expected at least one provider");
  goldenSnapshot("provider/translate-path", snapshot);
});

test("GOLDEN provider.ts translate-path snapshot is deterministic", () => {
  // The sanitizer must remove all run-to-run variance (github UUID, kimi device-id).
  const a = JSON.stringify(buildProviderTranslatePathSnapshot());
  const b = JSON.stringify(buildProviderTranslatePathSnapshot());
  assert.equal(a, b, "translate-path snapshot must be deterministic after sanitize");
});

test("GOLDEN guard catches translate-path drift", () => {
  // Prove the golden lock is a real regression guard: a mutated entry must be
  // detected by goldenSnapshot via the committed golden file. Uses an isolated
  // tmp dir so the real golden is never touched.
  const snapshot = buildProviderTranslatePathSnapshot();
  const firstId = providerIds[0];

  // Write a baseline golden into a tmp dir, then assert a mutated copy diverges.
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "provider-golden-"));
  try {
    process.env.UPDATE_GOLDEN = "1";
    goldenSnapshot("provider/translate-path", snapshot, tmpDir);
    delete process.env.UPDATE_GOLDEN;

    // Same value → passes.
    assert.doesNotThrow(() => goldenSnapshot("provider/translate-path", snapshot, tmpDir));

    // Mutated value → must throw (drift detected).
    const mutated = JSON.parse(JSON.stringify(snapshot)) as typeof snapshot;
    mutated[firstId].format = "DRIFTED-FORMAT";
    assert.throws(() => goldenSnapshot("provider/translate-path", mutated, tmpDir));
  } finally {
    delete process.env.UPDATE_GOLDEN;
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});
