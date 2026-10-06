import test from "node:test";
import assert from "node:assert/strict";
import { SafeOutboundFetchError } from "../../src/shared/network/safeOutboundFetch.ts";
import { normalizeNvidiaValidationFailure } from "../../src/lib/providers/validation/specialtyInline.ts";
import {
  classifyOAuthProbeInconclusive,
  OAUTH_TEST_CONFIG,
} from "../../src/app/api/providers/[id]/test/oauthTestConfig.ts";
import {
  isCredentialProbeInconclusive,
  resolveInconclusiveProbeRecheckDelayMs,
} from "../../src/lib/credentialHealth/probePolicy.ts";

test("NVIDIA timeout probe is credential-inconclusive instead of an auth failure", () => {
  const error = new SafeOutboundFetchError(
    "Request to https://integrate.api.nvidia.com/v1/chat/completions timed out after 20000ms",
    {
      code: "TIMEOUT",
      url: "https://integrate.api.nvidia.com/v1/chat/completions",
      method: "POST",
      attempts: 1,
      isRetryable: true,
      timeoutMs: 20_000,
    }
  );

  const result = normalizeNvidiaValidationFailure(error) as {
    valid: boolean;
    error: string | null;
    method?: string;
    warning?: string;
  };

  assert.equal(result.valid, true);
  assert.equal(result.error, null);
  assert.equal(result.method, "chat_probe_inconclusive");
  assert.match(String(result.warning), /credential validity is inconclusive/i);
  assert.equal(isCredentialProbeInconclusive(result), true);
});

test("NVIDIA non-timeout network failures remain failures", () => {
  const error = new SafeOutboundFetchError("fetch failed", {
    code: "NETWORK_ERROR",
    url: "https://integrate.api.nvidia.com/v1/chat/completions",
    method: "POST",
    attempts: 1,
    isRetryable: true,
  });

  const result = normalizeNvidiaValidationFailure(error);

  assert.equal(result.valid, false);
  assert.equal(result.error, "fetch failed");
  assert.equal(isCredentialProbeInconclusive(result), false);
});

test("inconclusive probes back off without changing ordinary successful probes", () => {
  assert.equal(
    isCredentialProbeInconclusive({ valid: true, warning: "ordinary provider warning" }),
    false
  );
  assert.equal(
    isCredentialProbeInconclusive({
      valid: false,
      warning: "credential validity is inconclusive",
    }),
    false
  );
  assert.equal(resolveInconclusiveProbeRecheckDelayMs(300_000), 1_800_000);
  assert.equal(resolveInconclusiveProbeRecheckDelayMs(600_000), 3_600_000);
});

test("Antigravity and AGY keep generic HTTP 400 inconclusive while preserving geo-block failures", () => {
  for (const provider of ["antigravity", "agy"] as const) {
    const config = OAUTH_TEST_CONFIG[provider];

    assert.deepEqual(config?.inconclusiveStatuses, [400]);
    assert.ok(!config?.acceptStatuses?.includes(400));

    const generic = classifyOAuthProbeInconclusive(config, provider, 400, "");

    assert.ok(generic);
    assert.equal(generic.diagnosisCode, "probe_inconclusive");
    assert.match(generic.warning, /credential validity is inconclusive/i);
    assert.equal(
      isCredentialProbeInconclusive({
        valid: true,
        warning: generic.warning,
      }),
      true
    );

    assert.equal(
      classifyOAuthProbeInconclusive(
        config,
        provider,
        400,
        '{"error":"User location is not supported for the API use."}'
      ),
      null,
      "explicit Google geo-blocks must fall through to upstream availability handling"
    );

    assert.equal(classifyOAuthProbeInconclusive(config, provider, 401, ""), null);
    assert.equal(classifyOAuthProbeInconclusive(config, provider, 403, ""), null);
  }
});
