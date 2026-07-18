/**
 * LMArena Split Supabase SSR Cookie — Regression Tests (issue #4271)
 *
 * LMArena migrated to Supabase SSR chunked auth cookies. The single
 * `arena-auth-prod-v1` cookie is now empty; the real session value is split
 * across `arena-auth-prod-v1.0`, `arena-auth-prod-v1.1`, … (ascending). We must
 * reconstruct the single cookie from its chunks (plain `values.join("")`, the
 * `@supabase/ssr` `combineChunks` rule — NO base64-decode, NO JSON-parse) before
 * forwarding the Cookie header upstream.
 *
 * Run:
 *   npx cross-env DISABLE_SQLITE_AUTO_BACKUP=true node --import tsx \
 *     --import ./open-sse/utils/setupPolyfill.ts \
 *     --import ./tests/_setup/isolateDataDir.ts \
 *     --test --test-force-exit tests/unit/lmarena-split-cookie-4271.test.ts
 */

import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { LMArenaExecutor, reconstructLMArenaCookie } from "../../open-sse/executors/lmarena.ts";
import { getWebSessionCredentialRequirement } from "../../src/shared/providers/webSessionCredentials.ts";

function cookieHeaderFor(credentials: unknown): string | undefined {
  const executor = new LMArenaExecutor();
  const headers = (executor as any).buildHeaders("gpt-4", credentials, {});
  return headers.Cookie;
}

describe("LMArena split Supabase SSR cookie (#4271)", () => {
  it("reconstructs the single cookie from ascending chunks (no decode)", () => {
    // The single base cookie is empty; the session lives in .0 + .1
    const raw =
      "arena-auth-prod-v1=; arena-auth-prod-v1.0=base64-eyJABC; arena-auth-prod-v1.1=DEF.ghi";
    const reconstructed = reconstructLMArenaCookie(raw);

    // Ascending concat of the chunk values, used verbatim (base64- prefix kept).
    assert.ok(
      reconstructed.includes("arena-auth-prod-v1=base64-eyJABCDEF.ghi"),
      `expected reconstructed cookie to carry the joined session, got: ${reconstructed}`
    );

    // And it must flow through to the forwarded Cookie header.
    const header = cookieHeaderFor({ cookie: raw });
    assert.ok(header, "should set a Cookie header");
    assert.ok(
      header!.includes("arena-auth-prod-v1=base64-eyJABCDEF.ghi"),
      `Cookie header should carry the reconstructed session, got: ${header}`
    );
  });

  it("leaves a non-empty single cookie unchanged (back-compat)", () => {
    const raw = "arena-auth-prod-v1=base64-xyz";
    const reconstructed = reconstructLMArenaCookie(raw);
    assert.ok(
      reconstructed.includes("arena-auth-prod-v1=base64-xyz"),
      `back-compat cookie should be preserved, got: ${reconstructed}`
    );

    const header = cookieHeaderFor({ cookie: raw });
    assert.equal(header, "arena-auth-prod-v1=base64-xyz");
  });

  it("concatenates chunks in ascending numeric order even when pasted out of order", () => {
    const raw =
      "arena-auth-prod-v1.1=DEF.ghi; arena-auth-prod-v1.0=base64-eyJABC; arena-auth-prod-v1=";
    const reconstructed = reconstructLMArenaCookie(raw);
    assert.ok(
      reconstructed.includes("arena-auth-prod-v1=base64-eyJABCDEF.ghi"),
      `expected .0 then .1 regardless of paste order, got: ${reconstructed}`
    );
  });

  it("preserves other cookies in the jar while injecting the reconstructed session", () => {
    const raw =
      "cf_clearance=abc; arena-auth-prod-v1=; arena-auth-prod-v1.0=base64-eyJABC; arena-auth-prod-v1.1=DEF.ghi; sidebar=open";
    const reconstructed = reconstructLMArenaCookie(raw);
    assert.ok(
      reconstructed.includes("arena-auth-prod-v1=base64-eyJABCDEF.ghi"),
      `session should be reconstructed, got: ${reconstructed}`
    );
    assert.ok(reconstructed.includes("cf_clearance=abc"), "should keep cf_clearance");
    assert.ok(reconstructed.includes("sidebar=open"), "should keep sidebar");
  });

  it("reconstructs from separately stored providerSpecificData chunk keys", () => {
    const header = cookieHeaderFor({
      providerSpecificData: {
        "arena-auth-prod-v1.0": "base64-eyJABC",
        "arena-auth-prod-v1.1": "DEF.ghi",
      },
    });

    assert.ok(header, "should set a Cookie header");
    assert.equal(header, "arena-auth-prod-v1=base64-eyJABCDEF.ghi");
  });

  it("reconstructs from separately stored top-level chunk keys", () => {
    const header = cookieHeaderFor({
      "arena-auth-prod-v1.0": "base64-eyJABC",
      "arena-auth-prod-v1.1": "DEF.ghi",
    });

    assert.ok(header, "should set a Cookie header");
    assert.equal(header, "arena-auth-prod-v1=base64-eyJABCDEF.ghi");
  });

  it("treats an empty base with no chunks as no usable session (returned as-is)", () => {
    const raw = "arena-auth-prod-v1=";
    const reconstructed = reconstructLMArenaCookie(raw);
    // No usable value to inject — return as-is so the existing missing-cookie path fires.
    assert.equal(reconstructed, raw);

    const header = cookieHeaderFor({ cookie: raw });
    // The empty base cookie is still forwarded verbatim (non-empty string), but it
    // carries no session value.
    assert.ok(
      !/arena-auth-prod-v1=[^;\s]/.test(header ?? ""),
      `should not fabricate a session value, got: ${header}`
    );
  });
});

describe("LMArena split-cookie credential storage keys (#4271)", () => {
  it("knows about the chunked .0 / .1 storage keys", () => {
    const req = getWebSessionCredentialRequirement("lmarena");
    assert.ok(req, "should have a credential requirement");
    assert.ok(
      req!.storageKeys.includes("arena-auth-prod-v1.0"),
      "storageKeys should include arena-auth-prod-v1.0"
    );
    assert.ok(
      req!.storageKeys.includes("arena-auth-prod-v1.1"),
      "storageKeys should include arena-auth-prod-v1.1"
    );
  });

  it("instructs pasting the full Cookie header in the placeholder", () => {
    const req = getWebSessionCredentialRequirement("lmarena");
    assert.ok(req, "should have a credential requirement");
    assert.ok(
      /full cookie header/i.test(req!.placeholder),
      `placeholder should instruct pasting the full Cookie header, got: ${req!.placeholder}`
    );
  });
});
