import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  checkWebCookieConnectionIfNeeded,
  isWebCookieHealthProbeCandidate,
} from "../../src/lib/tokenHealthCheckWebCookie.ts";

const NOW = "2026-08-25T12:00:00.000Z";

type ProbeParams = Parameters<typeof checkWebCookieConnectionIfNeeded>[0];

function baseParams(over: Partial<ProbeParams> = {}): ProbeParams {
  const base: ProbeParams = {
    conn: {
      id: "conn-1",
      provider: "claude-web",
      apiKey: "sessionKey=sk-ant-sid01-x",
      lastHealthCheckAt: null,
    },
    now: NOW,
    intervalMin: 60,
    log: () => {},
    logWarn: () => {},
    getConnectionLogLabel: () => "claude-1",
    logPrefix: "[Test]",
  };
  return { ...base, ...over };
}
describe("web-cookie health probe (#11488)", () => {
  it("candidate detection matches catalogued cookie providers only", () => {
    assert.equal(isWebCookieHealthProbeCandidate("claude-web"), true);
    assert.equal(isWebCookieHealthProbeCandidate("chatgpt-web"), true);
    assert.equal(isWebCookieHealthProbeCandidate("chatgpt-web-codex"), true);
    assert.equal(isWebCookieHealthProbeCandidate("cgpt-web"), false);
    assert.equal(isWebCookieHealthProbeCandidate("openai"), false);
    assert.equal(isWebCookieHealthProbeCandidate(undefined), false);
    assert.equal(isWebCookieHealthProbeCandidate(""), false);
  });

  it("returns handled=false for non-cookie providers", async () => {
    let probed = false;
    const handled = await checkWebCookieConnectionIfNeeded(
      baseParams({
        conn: { id: "c1", provider: "openai" },
        probeFn: async () => {
          probed = true;
          return { valid: true, error: null, unsupported: false };
        },
      })
    );
    assert.equal(handled, false);
    assert.equal(probed, false);
  });

  it("valid probe stamps lastHealthCheckAt and keeps the row active", async () => {
    let persisted: Record<string, unknown> | null = null;
    const handled = await checkWebCookieConnectionIfNeeded(
      baseParams({
        probeFn: async () => ({ valid: true, error: null, unsupported: false }),
        persistFn: async (_id, data) => {
          persisted = data as Record<string, unknown>;
          return {};
        },
      })
    );
    assert.equal(handled, true);
    assert.deepEqual(persisted, { lastHealthCheckAt: NOW });
  });

  it("AUTH_007 / SESSION_EXPIRED flips the connection to terminal expired", async () => {
    let persisted: Record<string, unknown> | null = null;
    await checkWebCookieConnectionIfNeeded(
      baseParams({
        probeFn: async () => ({
          valid: false,
          error: "SESSION_EXPIRED",
          errorCode: "AUTH_007",
          unsupported: false,
        }),
        persistFn: async (_id, data) => {
          persisted = data as Record<string, unknown>;
          return {};
        },
      })
    );
    assert.ok(persisted);
    assert.equal(persisted!.testStatus, "expired");
    assert.equal(persisted!.errorCode, "session_expired");
    assert.equal(persisted!.lastErrorType, "session_expired");
    assert.equal(persisted!.lastErrorSource, "webcookie");
  });

  it("unsupported providers are stamped without any state flip", async () => {
    let persisted: Record<string, unknown> | null = null;
    await checkWebCookieConnectionIfNeeded(
      baseParams({
        conn: {
          id: "c1",
          provider: "poe-web",
          apiKey: "key",
        },
        probeFn: async () => ({
          valid: false,
          error: "Provider validation not supported",
          unsupported: true,
        }),
        persistFn: async (_id, data) => {
          persisted = data as Record<string, unknown>;
          return {};
        },
      })
    );
    assert.deepEqual(persisted, { lastHealthCheckAt: NOW });
  });

  it("ambiguous failures never terminal-state the connection", async () => {
    let persisted: Record<string, unknown> | null = null;
    await checkWebCookieConnectionIfNeeded(
      baseParams({
        probeFn: async () => ({
          valid: false,
          error: "validation network error: ECONNRESET",
          unsupported: false,
        }),
        persistFn: async (_id, data) => {
          persisted = data as Record<string, unknown>;
          return {};
        },
      })
    );
    assert.deepEqual(persisted, { lastHealthCheckAt: NOW });
  });

  it("honors the interval gate — recently checked rows are skipped silently", async () => {
    let probed = false;
    let persisted: Record<string, unknown> | null = null;
    const handled = await checkWebCookieConnectionIfNeeded(
      baseParams({
        conn: {
          id: "c1",
          provider: "claude-web",
          apiKey: "cookie",
          // Checked 5 minutes ago against a 60-minute interval.
          lastHealthCheckAt: new Date(new Date(NOW).getTime() - 5 * 60 * 1000).toISOString(),
        },
        probeFn: async () => {
          probed = true;
          return { valid: true, error: null, unsupported: false };
        },
        persistFn: async (_id, data) => {
          persisted = data as Record<string, unknown>;
          return {};
        },
      })
    );
    assert.equal(handled, true);
    assert.equal(probed, false);
    assert.equal(persisted, null);
  });

  it("stale rows are re-probed once the interval has elapsed", async () => {
    let probes = 0;
    let persisted: Record<string, unknown> | null = null;
    const handled = await checkWebCookieConnectionIfNeeded(
      baseParams({
        conn: {
          id: "c1",
          provider: "claude-web",
          apiKey: "cookie",
          // Checked 61 minutes ago against a 60-minute interval — gate must open.
          lastHealthCheckAt: new Date(new Date(NOW).getTime() - 61 * 60 * 1000).toISOString(),
        },
        probeFn: async () => {
          probes++;
          return { valid: true, error: null, unsupported: false };
        },
        persistFn: async (_id, data) => {
          persisted = data as Record<string, unknown>;
          return {};
        },
      })
    );
    assert.equal(handled, true);
    assert.equal(probes, 1);
    assert.deepEqual(persisted, { lastHealthCheckAt: NOW });
  });

  it("rows without any credential are stamped without probing", async () => {
    let probed = false;
    let persisted: Record<string, unknown> | null = null;
    const handled = await checkWebCookieConnectionIfNeeded(
      baseParams({
        conn: { id: "c1", provider: "grok-web", apiKey: "" },
        probeFn: async () => {
          probed = true;
          return { valid: true, error: null, unsupported: false };
        },
        persistFn: async (_id, data) => {
          persisted = data as Record<string, unknown>;
          return {};
        },
      })
    );
    assert.equal(handled, true);
    assert.equal(probed, false);
    assert.deepEqual(persisted, { lastHealthCheckAt: NOW });
  });

  it("falls back to providerSpecificData.cookie when apiKey is empty", async () => {
    let seenKey: string | null = null;
    await checkWebCookieConnectionIfNeeded(
      baseParams({
        conn: {
          id: "c1",
          provider: "grok-web",
          apiKey: "",
          providerSpecificData: { cookie: "token=abc" },
        },
        probeFn: async ({ apiKey }) => {
          seenKey = apiKey ?? null;
          return { valid: true, error: null, unsupported: false };
        },
        persistFn: async () => ({}),
      })
    );
    assert.equal(seenKey, "token=abc");
  });
});
