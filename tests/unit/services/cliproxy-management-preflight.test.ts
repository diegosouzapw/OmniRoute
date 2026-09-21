import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  isCliproxyBackedConnection,
  resolveCliproxyBackendFamily,
  evaluateCliproxyTargetHealth,
  CliproxyManagementHealthCache,
  evaluateCliproxyPreflightGate,
} from "../../../src/lib/services/cliproxyManagementPreflight.ts";
import type { CliproxyAccountHealth } from "../../../src/lib/services/cliproxyAccountHealth.ts";

describe("CLIProxy Management Preflight - Pure Decision Logic", () => {
  describe("isCliproxyBackedConnection", () => {
    it("recognizes cliproxy host or imported connection prefix", () => {
      assert.equal(isCliproxyBackedConnection({ baseUrl: "http://cliproxy:8317/v1" }), true);
      assert.equal(
        isCliproxyBackedConnection({ baseUrl: "http://my-cliproxyapi.internal:9000/v1" }),
        true
      );
      assert.equal(
        isCliproxyBackedConnection({
          prefix: "cliproxy",
          baseUrl: "http://models-cliproxy:8317/v1",
        }),
        true
      );
    });

    it("requires explicit marker for port 8317 if host does not contain cliproxy", () => {
      // Bare port 8317 on arbitrary host without marker is NOT assumed to be cliproxy
      assert.equal(isCliproxyBackedConnection({ baseUrl: "http://127.0.0.1:8317/v1" }), false);
      assert.equal(isCliproxyBackedConnection({ baseUrl: "http://10.0.0.5:8317/v1" }), false);
      // With explicit marker, port 8317 is recognized
      assert.equal(
        isCliproxyBackedConnection({
          baseUrl: "http://127.0.0.1:8317/v1",
          isCliproxy: true,
        }),
        true
      );
      assert.equal(
        isCliproxyBackedConnection({
          baseUrl: "http://127.0.0.1:8317/v1",
          cliproxy: true,
        }),
        true
      );
      assert.equal(
        isCliproxyBackedConnection({
          baseUrl: "http://127.0.0.1:8317/v1",
          backend: "cliproxy",
        }),
        true
      );
      assert.equal(
        isCliproxyBackedConnection({
          baseUrl: "http://127.0.0.1:8317/v1",
          cliproxyapiMode: "claude-native",
        }),
        true
      );
    });

    it("recognizes explicit cliproxy/management fields even without baseUrl match", () => {
      assert.equal(isCliproxyBackedConnection({ isCliproxy: true }), true);
      assert.equal(isCliproxyBackedConnection({ cliproxy: true }), true);
      assert.equal(isCliproxyBackedConnection({ cliproxyapiMode: "claude-native" }), true);
      assert.equal(isCliproxyBackedConnection({ managementKey: "sec" }), true);
      assert.equal(isCliproxyBackedConnection({ managementPort: 8317 }), true);
    });

    it("rejects generic OpenAI-compatible connections", () => {
      assert.equal(isCliproxyBackedConnection({ baseUrl: "https://api.openai.com/v1" }), false);
      assert.equal(isCliproxyBackedConnection({ baseUrl: "http://127.0.0.1:11434/v1" }), false);
      assert.equal(isCliproxyBackedConnection({ baseUrl: "https://openrouter.ai/api/v1" }), false);
      assert.equal(isCliproxyBackedConnection(null), false);
      assert.equal(isCliproxyBackedConnection(undefined), false);
      assert.equal(isCliproxyBackedConnection({}), false);
    });
  });

  describe("resolveCliproxyBackendFamily", () => {
    it("classifies claude models", () => {
      assert.equal(resolveCliproxyBackendFamily("claude-3-7-sonnet"), "claude");
      assert.equal(resolveCliproxyBackendFamily("claude/claude-opus-4-6"), "claude");
      assert.equal(resolveCliproxyBackendFamily("anthropic/claude-3-5-haiku"), "claude");
    });

    it("classifies antigravity and gemini models", () => {
      assert.equal(resolveCliproxyBackendFamily("gemini-2.5-pro"), "gemini");
      assert.equal(resolveCliproxyBackendFamily("google/gemini-flash"), "gemini");
      assert.equal(resolveCliproxyBackendFamily("antigravity-claude-3-7-sonnet"), "antigravity");
      assert.equal(resolveCliproxyBackendFamily("agy/gemini-2.5-pro"), "antigravity");
    });

    it("classifies codex and openai/gpt models", () => {
      assert.equal(resolveCliproxyBackendFamily("gpt-4o"), "codex");
      assert.equal(resolveCliproxyBackendFamily("gpt-5"), "codex");
      assert.equal(resolveCliproxyBackendFamily("openai/o3-mini"), "codex");
      assert.equal(resolveCliproxyBackendFamily("codex/gpt-5"), "codex");
    });

    it("classifies xai and grok models", () => {
      assert.equal(resolveCliproxyBackendFamily("grok-3"), "xai");
      assert.equal(resolveCliproxyBackendFamily("xai/grok-beta"), "xai");
    });

    it("respects explicit providerSpecificData family hint", () => {
      assert.equal(
        resolveCliproxyBackendFamily("custom-model-1", { cliproxyFamily: "claude" }),
        "claude"
      );
      assert.equal(resolveCliproxyBackendFamily("custom-model-2", { backendFamily: "xai" }), "xai");
      assert.equal(
        resolveCliproxyBackendFamily("custom-model-3", { upstreamProvider: "gemini" }),
        "gemini"
      );
    });

    it("returns unknown for unclassified models", () => {
      assert.equal(resolveCliproxyBackendFamily("llama-3.3-70b"), "unknown");
      assert.equal(resolveCliproxyBackendFamily("deepseek-v3"), "unknown");
      assert.equal(resolveCliproxyBackendFamily(null), "unknown");
    });
  });

  describe("evaluateCliproxyTargetHealth", () => {
    const makeAccount = (
      provider: string,
      overrides: Partial<CliproxyAccountHealth> = {}
    ): CliproxyAccountHealth => ({
      authIndex: `idx-${Math.random()}`,
      provider,
      type: provider,
      label: `Account-${provider}`,
      status: "active",
      disabled: false,
      unavailable: false,
      createdAt: "2026-08-20T00:00:00Z",
      updatedAt: "2026-08-20T00:00:00Z",
      nextRetryAfter: null,
      success: 10,
      failed: 0,
      recentRequests: [],
      modelQuotas: {},
      ...overrides,
    });

    it("skips Claude when all Claude accounts are unavailable, but allows Gemini and Codex", () => {
      const now = Date.parse("2026-09-20T11:00:00Z");
      const accounts: CliproxyAccountHealth[] = [
        makeAccount("claude", { unavailable: true, nextRetryAfter: "2026-09-20T12:00:00Z" }),
        makeAccount("claude", { disabled: true }),
        makeAccount("gemini", { unavailable: false }),
        makeAccount("codex", { unavailable: false }),
      ];

      const claudeEval = evaluateCliproxyTargetHealth({
        modelStr: "claude-3-7-sonnet",
        accounts,
        now,
      });
      assert.equal(claudeEval.shouldSkip, true);
      assert.match(claudeEval.reason ?? "", /all 2 claude accounts are unavailable/i);

      const geminiEval = evaluateCliproxyTargetHealth({
        modelStr: "gemini-2.5-pro",
        accounts,
        now,
      });
      assert.equal(geminiEval.shouldSkip, false);

      const codexEval = evaluateCliproxyTargetHealth({
        modelStr: "gpt-4o",
        accounts,
        now,
      });
      assert.equal(codexEval.shouldSkip, false);
    });

    it("uses Antigravity credentials as the Gemini-family backend", () => {
      const accounts: CliproxyAccountHealth[] = [makeAccount("antigravity", { unavailable: true })];

      assert.equal(
        evaluateCliproxyTargetHealth({ modelStr: "gemini-3.6-flash-high", accounts }).shouldSkip,
        true
      );
      assert.equal(
        evaluateCliproxyTargetHealth({ modelStr: "agy/gemini-3.6-flash-high", accounts })
          .shouldSkip,
        true
      );
    });

    it("does not skip Claude if at least one Claude account is healthy", () => {
      const accounts: CliproxyAccountHealth[] = [
        makeAccount("claude", { unavailable: true }),
        makeAccount("claude", { unavailable: false, disabled: false }),
      ];

      const claudeEval = evaluateCliproxyTargetHealth({
        modelStr: "claude-3-7-sonnet",
        accounts,
      });
      assert.equal(claudeEval.shouldSkip, false);
    });

    it("skips when every Claude account is blocked by a mixed unavailable or model-quota state", () => {
      const now = Date.parse("2026-09-19T10:30:00Z");
      const accounts: CliproxyAccountHealth[] = [
        makeAccount("claude", { unavailable: true }),
        makeAccount("claude", {
          modelQuotas: {
            "claude-opus-4-6": {
              observedAt: "2026-09-19T10:00:00Z",
              signals: {
                "Anthropic-Ratelimit-Unified-Status": "rejected",
                "Retry-After": "3600",
              },
            },
          },
        }),
      ];

      const claudeEval = evaluateCliproxyTargetHealth({
        modelStr: "claude-opus-4-6",
        accounts,
        now,
      });
      assert.equal(claudeEval.shouldSkip, true);
    });

    it("skips only Opus when Opus quota is rejected while Sonnet is healthy", () => {
      const now = Date.parse("2026-09-19T10:30:00Z");
      const accounts: CliproxyAccountHealth[] = [
        makeAccount("claude", {
          modelQuotas: {
            "claude-opus-4-6": {
              observedAt: "2026-09-19T10:00:00Z",
              signals: {
                "Anthropic-Ratelimit-Unified-Status": "rejected",
                "Retry-After": "3600",
              },
            },
            "claude-sonnet-4-6": {
              observedAt: "2026-09-19T10:00:00Z",
              signals: {
                "Anthropic-Ratelimit-Unified-Status": "allowed",
              },
            },
          },
        }),
      ];

      const opusEval = evaluateCliproxyTargetHealth({
        modelStr: "claude-opus-4-6",
        accounts,
        now,
      });
      assert.equal(opusEval.shouldSkip, true);
      assert.match(opusEval.reason ?? "", /quota rejected/i);

      const sonnetEval = evaluateCliproxyTargetHealth({
        modelStr: "claude-sonnet-4-6",
        accounts,
        now,
      });
      assert.equal(sonnetEval.shouldSkip, false);
    });

    it("#14206: ignores a stale per-model rejected flag on a recovered account", () => {
      // Live shape from 2026-09-21: the account recovered (unavailable
      // cleared, next_retry_after gone) while model_quotas still carried a
      // leftover rejected=true with a zeroed Retry-After. The credential
      // served 68 consecutive HTTP 200s; the gate must not skip it.
      const now = Date.parse("2026-09-21T05:00:00Z");
      const accounts: CliproxyAccountHealth[] = [
        makeAccount("claude", {
          unavailable: false,
          nextRetryAfter: null,
          modelQuotas: {
            "claude-opus-5": {
              observedAt: "2026-09-19T10:00:00Z",
              signals: {
                "Anthropic-Ratelimit-Unified-Status": "rejected",
                "Retry-After": "0",
              },
            },
          },
        }),
      ];

      assert.equal(
        evaluateCliproxyTargetHealth({ modelStr: "claude-opus-5", accounts, now }).shouldSkip,
        false
      );
    });

    it("#14206: elapsed retry window no longer rejects a healthy account", () => {
      const now = Date.parse("2026-09-21T05:00:00Z");
      const accounts: CliproxyAccountHealth[] = [
        makeAccount("claude", {
          modelQuotas: {
            "claude-opus-5": {
              observedAt: "2026-09-20T04:00:00Z",
              signals: {
                "Anthropic-Ratelimit-Unified-Status": "rejected",
                "Retry-After": "3600",
              },
            },
          },
        }),
      ];

      assert.equal(
        evaluateCliproxyTargetHealth({ modelStr: "claude-opus-5", accounts, now }).shouldSkip,
        false
      );
    });

    it("#14206: stale rejected flag without a retry window is ignored once the account recovers", () => {
      const now = Date.parse("2026-09-21T05:00:00Z");
      const accounts: CliproxyAccountHealth[] = [
        makeAccount("claude", {
          modelQuotas: {
            "claude-opus-5": {
              observedAt: "2026-09-19T10:00:00Z",
              signals: { "Anthropic-Ratelimit-Unified-Status": "rejected" },
            },
          },
        }),
      ];

      assert.equal(
        evaluateCliproxyTargetHealth({ modelStr: "claude-opus-5", accounts, now }).shouldSkip,
        false
      );
    });

    it("#14206: a live unexpired per-model rejection still skips only that model on a recovered account", () => {
      const now = Date.parse("2026-09-21T05:00:00Z");
      const accounts: CliproxyAccountHealth[] = [
        makeAccount("claude", {
          modelQuotas: {
            "claude-opus-5": {
              observedAt: "2026-09-19T10:00:00Z",
              signals: {
                "Anthropic-Ratelimit-Unified-Status": "rejected",
                "Retry-After": "0",
              },
            },
            "claude-sonnet-5": {
              observedAt: "2026-09-21T04:55:00Z",
              signals: {
                "Anthropic-Ratelimit-Unified-Status": "rejected",
                "Retry-After": "3600",
              },
            },
          },
        }),
      ];

      assert.equal(
        evaluateCliproxyTargetHealth({ modelStr: "claude-opus-5", accounts, now }).shouldSkip,
        false
      );
      assert.equal(
        evaluateCliproxyTargetHealth({ modelStr: "claude-sonnet-5", accounts, now }).shouldSkip,
        true
      );
    });

    it("#14206: per-model rejection is honored while the account-level cooldown is still active", () => {
      const now = Date.parse("2026-09-21T05:00:00Z");
      const accounts: CliproxyAccountHealth[] = [
        makeAccount("claude", {
          unavailable: true,
          nextRetryAfter: "2026-09-21T06:00:00Z",
          modelQuotas: {
            "claude-opus-5": {
              observedAt: "2026-09-19T10:00:00Z",
              signals: {
                "Anthropic-Ratelimit-Unified-Status": "rejected",
                "Retry-After": "0",
              },
            },
          },
        }),
      ];

      assert.equal(
        evaluateCliproxyTargetHealth({ modelStr: "claude-opus-5", accounts, now }).shouldSkip,
        true
      );
    });

    it("fails open for unknown models", () => {
      const accounts: CliproxyAccountHealth[] = [
        makeAccount("claude", { unavailable: true }),
        makeAccount("gemini", { unavailable: true }),
      ];

      const unknownEval = evaluateCliproxyTargetHealth({
        modelStr: "custom-unmapped-llm-v1",
        accounts,
      });
      assert.equal(unknownEval.shouldSkip, false);
    });

    it("fails open when no accounts exist for that provider family", () => {
      // CLIProxy might not have grok accounts configured, but maybe it proxies or routes differently
      const accounts: CliproxyAccountHealth[] = [makeAccount("claude", { unavailable: true })];

      const grokEval = evaluateCliproxyTargetHealth({
        modelStr: "grok-3",
        accounts,
      });
      assert.equal(grokEval.shouldSkip, false);
    });
  });

  describe("CliproxyManagementHealthCache (TTL + singleflight + fail-open)", () => {
    it("deduplicates concurrent fetches with singleflight and caches for TTL", async () => {
      let fetchCount = 0;
      const cache = new CliproxyManagementHealthCache({
        ttlMs: 50,
        fetcher: async () => {
          fetchCount++;
          await new Promise((r) => setTimeout(r, 10));
          return {
            state: "ready",
            accounts: [
              {
                authIndex: "1",
                provider: "claude",
                type: "claude",
                label: "C1",
                status: "active",
                disabled: false,
                unavailable: false,
                createdAt: null,
                updatedAt: null,
                nextRetryAfter: null,
                success: 1,
                failed: 0,
                recentRequests: [],
                modelQuotas: {},
              },
            ],
            version: "1.0",
          };
        },
      });

      // Concurrent calls trigger singleflight
      const [res1, res2, res3] = await Promise.all([
        cache.getHealth("http://127.0.0.1:8317", "key1"),
        cache.getHealth("http://127.0.0.1:8317", "key1"),
        cache.getHealth("http://127.0.0.1:8317", "key1"),
      ]);

      assert.equal(fetchCount, 1);
      assert.equal(res1.state, "ready");
      assert.equal(res2.state, "ready");
      assert.equal(res3.state, "ready");

      // Immediate subsequent call hits TTL cache
      const resCached = await cache.getHealth("http://127.0.0.1:8317", "key1");
      assert.equal(fetchCount, 1);
      assert.equal(resCached.state, "ready");

      // Wait for TTL expiration
      await new Promise((r) => setTimeout(r, 60));
      const resAfterTTL = await cache.getHealth("http://127.0.0.1:8317", "key1");
      assert.equal(fetchCount, 2);
      assert.equal(resAfterTTL.state, "ready");
    });

    it("fails open on management errors and never causes a skip", async () => {
      const errorStates = [
        "missing_key",
        "unauthorized",
        "unsupported",
        "invalid_response",
        "unreachable",
      ] as const;

      for (const errState of errorStates) {
        const cache = new CliproxyManagementHealthCache({
          ttlMs: 1000,
          fetcher: async () => ({
            state: errState,
            accounts: [],
            version: null,
          }),
        });

        const health = await cache.getHealth("http://127.0.0.1:8317", "bad-key");
        assert.equal(health.state, errState);

        const gate = await evaluateCliproxyPreflightGate({
          connection: {
            id: "conn-1",
            provider: "openai-compatible-cliproxy",
            providerSpecificData: {
              baseUrl: "http://127.0.0.1:8317/v1",
              isCliproxy: true,
            },
          },
          modelStr: "claude-3-7-sonnet",
          healthCache: cache,
        });

        assert.equal(gate.shouldSkip, false, `Failed open for state ${errState}`);
      }
    });

    it("normalizes cache keys so URL spelling variants share one snapshot", async () => {
      let fetchCount = 0;
      const cache = new CliproxyManagementHealthCache({
        ttlMs: 1000,
        fetcher: async () => {
          fetchCount++;
          return { state: "ready", accounts: [], version: null };
        },
      });

      await cache.getHealth("http://Cliproxy.internal:8317/v1/", "key");
      await cache.getHealth("http://cliproxy.internal:8317", "key");
      assert.equal(fetchCount, 1, "path/case variants must share one cache entry");
    });

    it("canonicalizes localhost variants onto 127.0.0.1", async () => {
      let fetchCount = 0;
      const cache = new CliproxyManagementHealthCache({
        ttlMs: 1000,
        fetcher: async () => {
          fetchCount++;
          return { state: "ready", accounts: [], version: null };
        },
      });

      await cache.getHealth("http://localhost:8317", "key");
      await cache.getHealth("http://127.0.0.1:8317/v1", "key");
      assert.equal(fetchCount, 1, "localhost and 127.0.0.1 must share one cache entry");
    });
  });

  describe("trusted management endpoint hardening (SSRF guard)", () => {
    const ENV_KEYS = [
      "CLIPROXYAPI_HOST",
      "CLIPROXYAPI_PORT",
      "CLIPROXYAPI_MANAGEMENT_KEY",
    ] as const;
    type EnvKey = (typeof ENV_KEYS)[number];

    async function withEnv(
      values: Partial<Record<EnvKey, string>>,
      fn: () => Promise<void>
    ): Promise<void> {
      const saved = new Map<string, string | undefined>();
      for (const key of ENV_KEYS) {
        saved.set(key, process.env[key]);
        if (values[key] === undefined) {
          delete process.env[key];
        } else {
          process.env[key] = values[key];
        }
      }
      try {
        await fn();
      } finally {
        for (const [key, value] of saved) {
          if (value === undefined) delete process.env[key];
          else process.env[key] = value;
        }
      }
    }

    it("never probes a connection-controlled cliproxy baseUrl and fails open", async () => {
      await withEnv({ CLIPROXYAPI_MANAGEMENT_KEY: "secret" }, async () => {
        const probed: string[] = [];
        const cache = new CliproxyManagementHealthCache({
          fetcher: async (opts) => {
            probed.push(`${opts.host}:${opts.port}`);
            return { state: "ready", accounts: [], version: null };
          },
        });

        const gate = await evaluateCliproxyPreflightGate({
          connection: {
            id: "conn-ssrf",
            provider: "openai-compatible",
            providerSpecificData: { baseUrl: "http://evil-cliproxy.attacker.example:8317/v1" },
          },
          modelStr: "claude-3-7-sonnet",
          healthCache: cache,
        });

        assert.equal(gate.shouldSkip, false, "foreign cliproxy baseUrl must fail open");
        assert.deepEqual(probed, [], "no management probe may target the connection baseUrl");
      });
    });

    it("probes the operator-configured endpoint, not the connection baseUrl", async () => {
      await withEnv(
        {
          CLIPROXYAPI_HOST: "10.1.2.3",
          CLIPROXYAPI_PORT: "9000",
          CLIPROXYAPI_MANAGEMENT_KEY: "secret",
        },
        async () => {
          const probed: string[] = [];
          const cache = new CliproxyManagementHealthCache({
            fetcher: async (opts) => {
              probed.push(`${opts.host}:${opts.port}`);
              return { state: "ready", accounts: [], version: null };
            },
          });

          const gate = await evaluateCliproxyPreflightGate({
            connection: {
              id: "conn-trusted",
              provider: "openai-compatible",
              providerSpecificData: { isCliproxy: true, baseUrl: "http://10.1.2.3:9000/v1" },
            },
            modelStr: "claude-3-7-sonnet",
            healthCache: cache,
          });

          assert.deepEqual(probed, ["10.1.2.3:9000"]);
          assert.equal(gate.shouldSkip, false, "empty accounts fail open");
        }
      );
    });

    it("fails open when the connection baseUrl points at a different healthy instance", async () => {
      await withEnv(
        { CLIPROXYAPI_HOST: "cliproxy-a.internal", CLIPROXYAPI_MANAGEMENT_KEY: "secret" },
        async () => {
          const cache = new CliproxyManagementHealthCache({
            fetcher: async () => ({
              state: "ready",
              accounts: [
                {
                  authIndex: "1",
                  provider: "claude",
                  type: "claude",
                  label: "A1",
                  status: "active",
                  disabled: false,
                  unavailable: true,
                  createdAt: null,
                  updatedAt: null,
                  nextRetryAfter: "2099-01-01T00:00:00Z",
                  success: 0,
                  failed: 5,
                  recentRequests: [],
                  modelQuotas: {},
                },
              ],
              version: "1.0",
            }),
          });

          const gate = await evaluateCliproxyPreflightGate({
            connection: {
              id: "conn-other-instance",
              provider: "openai-compatible",
              providerSpecificData: { baseUrl: "http://cliproxy-b.internal:8317/v1" },
            },
            modelStr: "claude-3-7-sonnet",
            healthCache: cache,
          });

          assert.equal(
            gate.shouldSkip,
            false,
            "instance A health must not decide instance B targets"
          );
        }
      );
    });

    it("marker-only connection without baseUrl reuses trusted default health", async () => {
      await withEnv({ CLIPROXYAPI_MANAGEMENT_KEY: "secret" }, async () => {
        let fetchCount = 0;
        const cache = new CliproxyManagementHealthCache({
          fetcher: async () => {
            fetchCount++;
            return { state: "ready", accounts: [], version: null };
          },
        });

        const gate = await evaluateCliproxyPreflightGate({
          connection: {
            id: "conn-marker-only",
            provider: "openai-compatible",
            providerSpecificData: { isCliproxy: true },
          },
          modelStr: "claude-3-7-sonnet",
          healthCache: cache,
        });

        assert.equal(gate.shouldSkip, false, "empty accounts fail open");
        assert.equal(fetchCount, 1, "marker-only connection probes trusted default once");
      });
    });

    it("deep-mode native baseUrl still probes the trusted operator endpoint", async () => {
      await withEnv({ CLIPROXYAPI_MANAGEMENT_KEY: "secret" }, async () => {
        const probed: string[] = [];
        const cache = new CliproxyManagementHealthCache({
          fetcher: async (opts) => {
            probed.push(`${opts.host}:${opts.port}`);
            return { state: "ready", accounts: [], version: null };
          },
        });

        const gate = await evaluateCliproxyPreflightGate({
          connection: {
            id: "conn-deep-mode-native-url",
            provider: "anthropic",
            providerSpecificData: {
              cliproxyapiMode: "claude-native",
              baseUrl: "https://api.anthropic.com",
            },
          },
          modelStr: "claude-3-7-sonnet",
          healthCache: cache,
        });

        assert.equal(gate.shouldSkip, false, "empty accounts fail open");
        assert.deepEqual(
          probed,
          ["127.0.0.1:8317"],
          "deep-mode native baseUrl still uses the trusted operator endpoint"
        );
      });
    });

    it("does not call management API for non-CLIProxy generic OpenAI-compatible connections", async () => {
      let fetchCount = 0;
      const cache = new CliproxyManagementHealthCache({
        fetcher: async () => {
          fetchCount++;
          return { state: "ready", accounts: [], version: null };
        },
      });

      const gate = await evaluateCliproxyPreflightGate({
        connection: {
          id: "conn-generic",
          provider: "openai-compatible-custom",
          providerSpecificData: {
            baseUrl: "https://my-vllm.internal:8000/v1",
          },
        },
        modelStr: "claude-3-7-sonnet",
        healthCache: cache,
      });

      assert.equal(gate.shouldSkip, false);
      assert.equal(fetchCount, 0, "No management fetch for non-cliproxy connection");
    });
  });
});
