import assert from "node:assert/strict";
import test from "node:test";

import {
  classifyComboOutcome,
  formatComboOutcomes,
  resolveComboTerminalCode,
  resolveComboTerminalStatus,
  type ComboErrorEntry,
} from "../../open-sse/services/combo/comboErrorAggregation.ts";

import { projectPublicErrorIdentifier } from "../../open-sse/utils/publicErrorIdentifiers.ts";

const refusal = "OpenCode's free tier can only be used from within OpenCode.";

function outcome(model: string, error = refusal, status = 403, code?: string): ComboErrorEntry {
  return { model, status, error, kind: classifyComboOutcome(status, error), code };
}

test(
  "OpenCode free-tier refusal is displayed as a restriction without reclassifying the outcome",
  { timeout: 5_000 },
  () => {
    const outcome = {
      model: "oc/mimo-v2.6-flash-free",
      status: 403,
      error: refusal,
      kind: classifyComboOutcome(403, refusal),
    };
    assert.equal(
      formatComboOutcomes([outcome]),
      `oc/mimo-v2.6-flash-free: access restriction — ${refusal} (HTTP 403)`
    );
    assert.equal(outcome.kind, "auth");
    assert.equal(resolveComboTerminalStatus([outcome], 502), 403);
  }
);

test("known refusal identity survives the bounded public projector", { timeout: 5_000 }, () => {
  for (const identifier of ["FreeTierError", "freetiererror", "FREETIERERROR"]) {
    assert.equal(projectPublicErrorIdentifier(identifier, "permission_denied"), identifier);
  }
});

test("public identifier fallback stays bounded and case preserving", { timeout: 5_000 }, () => {
  for (const identifier of [
    "403",
    "599",
    "HTTP_451",
    "http_403",
    "INVALID_API_KEY",
    "kiro_tool_call_repair_retry_failed",
  ]) {
    assert.equal(projectPublicErrorIdentifier(identifier, "error"), identifier);
  }
  for (const identifier of [
    "private_account_identifier",
    "FreeTierError\n",
    "FreeTierError/secret",
    "x".repeat(129),
    "access_token=fixture-secret",
    "sk-fixture-private-identifier",
    "099",
    "600",
    null,
    403,
  ]) {
    assert.equal(
      projectPublicErrorIdentifier(identifier, "permission_denied"),
      "permission_denied"
    );
    assert.equal(projectPublicErrorIdentifier(identifier, ""), "");
    assert.equal(projectPublicErrorIdentifier(identifier, "private_fallback"), "error");
  }
});

test("homogeneous explicit refusals retain the known terminal identity", { timeout: 5_000 }, () => {
  const outcomes: ComboErrorEntry[] = [
    { model: "oc/mimo-v2.6-flash-free", status: 403, error: refusal, kind: "auth" },
    { model: "opencode-zen/mimo-v2.6-flash-free", status: 403, error: refusal, kind: "auth" },
  ];
  assert.equal(resolveComboTerminalCode(outcomes, 403), "FreeTierError");
  assert.equal(resolveComboTerminalStatus(outcomes, 502), 403);
});

test(
  "known OpenCode aliases and refusal representations share the restriction label",
  { timeout: 5_000 },
  () => {
    const reasons = [
      refusal,
      JSON.stringify({ error: { type: "FreeTierError", message: refusal } }),
      "FREE TIER CAN ONLY BE USED FROM WITHIN OPENCODE",
    ];
    for (const provider of ["oc", "opencode", "opencode-zen", "opencode-go", "OPENCODE"]) {
      for (const status of [403, 451]) {
        for (const error of reasons) {
          const entry = outcome(`${provider}/mimo-v2.6-flash-free`, error, status);
          assert.equal(
            formatComboOutcomes([entry]),
            `${entry.model}: access restriction — ${error} (HTTP ${status})`
          );
          assert.equal(entry.kind, status === 403 ? "auth" : "model");
          assert.equal(resolveComboTerminalStatus([entry], 502), status);
        }
      }
    }
  }
);

test(
  "foreign, missing-provider and specific refusal controls retain their labels",
  { timeout: 5_000 },
  () => {
    const controls = [
      outcome("openai/model", refusal),
      outcome("mimo-v2.6-flash-free", refusal),
      outcome("oc/model", "Invalid API key"),
      outcome("oc/model", refusal, 401),
      outcome("oc/model", `${refusal} This model is not available in your country.`),
      outcome("oc/model", `${refusal} user_blocked`),
      outcome("oc/model", `${refusal} fingerprint_rejection`),
      outcome("oc/model", `${refusal} Cloudflare error code 1010`),
      outcome("opencode/model", "Rate limit exceeded", 429),
      outcome("opencode/model", "Service unavailable", 503),
    ];
    for (const entry of controls) {
      const kind = entry.status === 429 ? "rate limit" : entry.status === 503 ? "provider" : "auth";
      assert.equal(
        formatComboOutcomes([entry]),
        `${entry.model}: ${kind} — ${entry.error} (HTTP ${entry.status})`
      );
    }
  }
);

test(
  "restriction labels preserve redaction, truncation and sibling reasons",
  { timeout: 5_000 },
  () => {
    const id = "12345678-1234-1234-1234-123456789abc";
    const entry = outcome(`oc/${id}`, `${refusal} connection ${id}`);
    const siblings = Array.from({ length: 5 }, (_, i) =>
      outcome(`openai/model-${i}`, "Invalid API key")
    );
    const message = formatComboOutcomes([entry, ...siblings]);
    assert.equal(
      message,
      `oc/conn:12345678: access restriction — ${refusal} connection conn:12345678 (HTTP 403); ` +
        siblings
          .slice(0, 4)
          .map((e) => `${e.model}: auth — Invalid API key (HTTP 403)`)
          .join("; ") +
        "... (+1 more)"
    );
    assert.ok(!message.includes(id));
    assert.equal(
      formatComboOutcomes([entry], { redact: false }),
      `${entry.model}: access restriction — ${entry.error} (HTTP 403)`
    );
    assert.equal(formatComboOutcomes([]), "");
    assert.equal(
      formatComboOutcomes([{ model: "openai/model", status: 503, error: "" }]),
      "openai/model: HTTP 503 (HTTP 503)"
    );
  }
);

test(
  "mixed failures keep aggregate status and do not acquire a restriction code",
  { timeout: 5_000 },
  () => {
    const restricted = outcome("oc/model", refusal, 403, "FreeTierError");
    for (const sibling of [
      outcome("openai/model", "Invalid API key", 401, "invalid_api_key"),
      outcome("opencode/model", "Invalid API key", 403),
      outcome("openai/model", refusal, 403),
      outcome("oc/model", `${refusal} user_blocked`, 403),
    ]) {
      assert.equal(resolveComboTerminalCode([restricted, sibling], sibling.status), sibling.code);
      assert.equal(resolveComboTerminalCode([sibling, restricted], 403), undefined);
    }
    assert.equal(resolveComboTerminalCode([restricted], 502), undefined);
    assert.equal(resolveComboTerminalCode([], 403), undefined);
    assert.equal(
      resolveComboTerminalStatus([restricted, outcome("openai/model", "Outage", 503)], 403),
      502
    );
    assert.equal(
      resolveComboTerminalStatus([restricted, outcome("openai/model", "Timed out", 408)], 403),
      504
    );
    assert.equal(
      resolveComboTerminalStatus([restricted, outcome("openai/model", "Invalid key", 401)], 502),
      401
    );
  }
);
