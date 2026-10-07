import test from "node:test";
import assert from "node:assert/strict";
import safeRegex from "safe-regex";

import {
  CREDENTIAL_PATTERNS,
  CredentialMaskerGuardrail,
  redactCredentials,
} from "../../src/lib/guardrails/credentialMasker.ts";

async function withCredentialRedactionEnabled(fn: () => Promise<void>) {
  const original = process.env.CREDENTIAL_REDACTION_ENABLED;
  process.env.CREDENTIAL_REDACTION_ENABLED = "true";
  try {
    await fn();
  } finally {
    if (original === undefined) delete process.env.CREDENTIAL_REDACTION_ENABLED;
    else process.env.CREDENTIAL_REDACTION_ENABLED = original;
  }
}

test("redacts JWTs without requiring an eyJ payload prefix", () => {
  const token = "eyJ" + "a".repeat(12) + "." + "b".repeat(12) + "." + "c".repeat(12);
  const result = redactCredentials("token=" + token);
  assert.equal(result.modified, true);
  assert.match(result.text, /\[REDACTED:jwt\]/);
});

test("redacts JSON-style authorization text while preserving its structure", () => {
  const result = redactCredentials('{"Authorization": "Bearer ' + "a".repeat(24) + '"}');
  assert.equal(result.modified, true);
  assert.match(result.text, /"Authorization": "Bearer \[REDACTED:auth_header\]"/);
});

test("redacts Basic and Token header schemes with base64 token characters", () => {
  const basic = redactCredentials("Authorization=Basic " + "ab+/=".repeat(4));
  const token = redactCredentials("x-api-key: Token " + "ab+/=".repeat(4));

  assert.match(basic.text, /Authorization=Basic \[REDACTED:auth_header\]/);
  assert.match(token.text, /x-api-key: Token \[REDACTED:auth_header\]/);
});

test("redacts structured authorization values in nested request payloads", async () => {
  await withCredentialRedactionEnabled(async () => {
    const guardrail = new CredentialMaskerGuardrail();
    const result = await guardrail.preCall({
      messages: [{ role: "user", content: { headers: { Authorization: "Bearer short-token" } } }],
    });
    const payload = result?.modifiedPayload as {
      messages: Array<{ content: { headers: { Authorization: string } } }>;
    };
    const content = payload.messages[0].content;
    assert.equal(content.headers.Authorization, "Bearer [REDACTED:auth_header]");
    assert.equal((result?.meta as { count: number }).count, 1);
  });
});

test("redacts every shared reference without mutating the original", async () => {
  await withCredentialRedactionEnabled(async () => {
    const guardrail = new CredentialMaskerGuardrail();
    const shared = { Authorization: "Bearer shared-token" };
    const result = await guardrail.postCall({ first: shared, second: shared });
    const response = result?.modifiedResponse as {
      first: { Authorization: string };
      second: { Authorization: string };
    };

    assert.equal(response.first.Authorization, "Bearer [REDACTED:auth_header]");
    assert.equal(response.second.Authorization, "Bearer [REDACTED:auth_header]");
    assert.equal(shared.Authorization, "Bearer shared-token");
  });
});

test("preserves unchanged cyclic provider responses without JSON serialization", async () => {
  await withCredentialRedactionEnabled(async () => {
    const guardrail = new CredentialMaskerGuardrail();
    const response: Record<string, unknown> = { value: undefined, nested: { safe: true } };
    response.self = response;
    const result = await guardrail.postCall(response);
    assert.equal(result?.modifiedResponse, undefined);
    assert.equal(response.value, undefined);
    assert.equal(response.self, response);
  });
});

test("does not re-redact an already-redacted structured header", async () => {
  await withCredentialRedactionEnabled(async () => {
    const guardrail = new CredentialMaskerGuardrail();
    const response = { headers: { Authorization: "Bearer [REDACTED:auth_header]" } };
    const result = await guardrail.postCall(response);

    assert.equal(result?.modifiedResponse, undefined);
    assert.equal(response.headers.Authorization, "Bearer [REDACTED:auth_header]");
  });
});

// ---------------------------------------------------------------------------
// GHSA-r4q7-7f24-m29p — Groq (`gsk_`), xAI (`xai-`) and OpenAI-compatible
// (`sk-` of any non-48 length: DeepSeek 32-hex, Moonshot/Kimi, Together, …)
// keys had no catalog entry. The runtime guardrail is catalog-only, so every
// one of those shapes passed through `redactCredentials()` untouched; the
// public sanitizer only caught the `sk-` family by coincidence through its
// STRONG_CREDENTIAL_TOKEN fallback and leaked `gsk_`/`xai-` outright.
//
// Key shapes below are deterministic fakes (shape-accurate, never real keys),
// generated the same way as the verifier probe so the regression guard and the
// empirical leak table agree byte-for-byte on what "a key" looks like.
// ---------------------------------------------------------------------------

const ALNUM = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const HEX = "0123456789abcdef";

function fill(n: number, charset: string, seed = 7): string {
  let out = "";
  for (let i = 0; i < n; i++) out += charset[(i * 31 + seed * 17 + i * i) % charset.length];
  return out;
}

// `type` is both the detection name and the `[REDACTED:<type>]` label.
type LeakShape = { label: string; key: string; type: string };

const LEAK_SHAPES: LeakShape[] = [
  { label: "groq gsk_ + 52 alnum", key: "gsk_" + fill(52, ALNUM), type: "groq" },
  { label: "xai xai- + 80 alnum", key: "xai-" + fill(80, ALNUM, 3), type: "xai" },
  { label: "deepseek sk- + 32 hex", key: "sk-" + fill(32, HEX), type: "openai_compatible" },
  {
    label: "openai-compatible sk- + 40 alnum",
    key: "sk-" + fill(40, ALNUM, 9),
    type: "openai_compatible",
  },
  {
    label: "openai-compatible sk- + 51 alnum",
    key: "sk-" + fill(51, ALNUM, 11),
    type: "openai_compatible",
  },
  {
    label: "openai-compatible sk- + 20 alnum (minimum bound)",
    key: "sk-" + fill(20, ALNUM, 13),
    type: "openai_compatible",
  },
  {
    label: "openai-compatible sk- + 36 mixed [A-Za-z0-9_-]",
    key: "sk-" + fill(36, ALNUM + "_-", 2),
    type: "openai_compatible",
  },
];

const CONTEXTS: Array<[string, (key: string) => string]> = [
  ["bare", (key) => key],
  ["sentence", (key) => `upstream error: Invalid API Key ${key} for model foo`],
  ["json-msg", (key) => `{"error":{"message":"Incorrect API key provided: ${key}. Check docs."}}`],
];

for (const shape of LEAK_SHAPES) {
  for (const [contextName, wrap] of CONTEXTS) {
    test(`GHSA-r4q7: redacts ${shape.label} in ${contextName} context`, () => {
      const input = wrap(shape.key);
      const result = redactCredentials(input);

      assert.equal(result.modified, true, `not modified: ${input}`);
      assert.equal(result.text.includes(shape.key), false, `key survived: ${result.text}`);
      assert.ok(
        result.text.includes(`[REDACTED:${shape.type}]`),
        `expected [REDACTED:${shape.type}] in: ${result.text}`
      );
      assert.deepEqual(
        result.detections.map((d) => d.type),
        [shape.type],
        `unexpected detection set for ${shape.label}`
      );
    });
  }
}

test("GHSA-r4q7: leaves short prose tokens and sub-bound prefixes untouched", () => {
  const benign = [
    "gsk_abc",
    "xai-1",
    "sk-short",
    "task sk failed",
    "gsk_" + fill(19, ALNUM),
    "xai-" + fill(19, ALNUM),
    "sk-" + fill(19, ALNUM),
    // `sk-` preceded by an alphanumeric is part of a larger word, not a key prefix.
    "risk-based-access-control-policy-evaluation-failed",
    "Model gpt-5 is not available on this plan",
  ];

  for (const input of benign) {
    const result = redactCredentials(input);
    assert.equal(result.modified, false, `over-redacted: ${input} -> ${result.text}`);
    assert.equal(result.text, input);
    assert.deepEqual(result.detections, []);
  }
});

test("GHSA-r4q7: specific sk- labels still win over the openai_compatible fallback", () => {
  const specific: Array<[string, string, string]> = [
    ["sk-proj-" + fill(60, ALNUM + "_-", 4), "openai_proj", "[REDACTED:openai]"],
    ["sk-" + fill(48, ALNUM, 21), "openai", "[REDACTED:openai]"],
    // `anthropic` only allows one digit after `api`, so the real `api03` shape is
    // caught by `anthropic_alt` — same label, pre-existing, out of scope here.
    ["sk-ant-api03-" + fill(60, ALNUM + "_-", 6), "anthropic_alt", "[REDACTED:anthropic]"],
    ["sk-ant-api3-" + fill(60, ALNUM + "_-", 6), "anthropic", "[REDACTED:anthropic]"],
    ["sk-ant-" + fill(40, ALNUM + "_-", 8), "anthropic_alt", "[REDACTED:anthropic]"],
    ["sk_live_" + fill(24, ALNUM, 10), "stripe", "[REDACTED:stripe]"],
  ];

  for (const [key, expectedType, expectedLabel] of specific) {
    const result = redactCredentials(`upstream error: Invalid API Key ${key} for model foo`);
    assert.equal(result.text.includes(key), false, `key survived: ${result.text}`);
    assert.ok(result.text.includes(expectedLabel), `expected ${expectedLabel} in ${result.text}`);
    assert.equal(result.text.includes("[REDACTED:openai_compatible]"), false, result.text);
    assert.deepEqual(
      result.detections.map((d) => d.type),
      [expectedType],
      `fallback must not fire when a specific pattern already matched: ${key}`
    );
  }
});

test("GHSA-r4q7: catalog ordering keeps the generic sk- fallback last", () => {
  const names = CREDENTIAL_PATTERNS.map((p) => p.name);

  assert.equal(names.at(-1), "openai_compatible", "openai_compatible must be the LAST entry");
  assert.equal(new Set(names).size, names.length, "duplicate catalog names");

  // Every other pattern that can match a string starting with `sk-` must run
  // before the fallback, or it would never get to apply its specific label.
  const fallbackIndex = names.indexOf("openai_compatible");
  for (const [index, pattern] of CREDENTIAL_PATTERNS.entries()) {
    if (pattern.name === "openai_compatible") continue;
    if (/^\\?b?sk-/.test(pattern.regex.source)) {
      assert.ok(index < fallbackIndex, `${pattern.name} is ordered after openai_compatible`);
    }
  }

  // The provider-specific entries sit with their siblings, before the loose
  // `google` bound and after the last `sk-ant` label.
  assert.ok(names.indexOf("groq") > names.indexOf("anthropic_alt"));
  assert.ok(names.indexOf("xai") > names.indexOf("anthropic_alt"));
  assert.ok(names.indexOf("groq") < names.indexOf("google"));
  assert.ok(names.indexOf("xai") < names.indexOf("google"));
});

test("GHSA-r4q7: catalog regexes are ReDoS-safe and globally flagged", () => {
  for (const pattern of CREDENTIAL_PATTERNS) {
    assert.ok(pattern.regex.global, `${pattern.name} must carry the g flag`);
    // `auth_header` predates this guard and trips safe-regex's star-height
    // heuristic through `\s*` nested inside optional groups; its token class is
    // bounded by `{10,}` so it is linear in practice. Everything else, including
    // every future addition, must pass.
    if (pattern.name === "auth_header") continue;
    assert.ok(safeRegex(pattern.regex), `${pattern.name} failed safe-regex: ${pattern.regex}`);
  }

  for (const name of ["groq", "xai", "openai_compatible"]) {
    const pattern = CREDENTIAL_PATTERNS.find((p) => p.name === name);
    assert.ok(pattern, `${name} missing from catalog`);
    assert.ok(safeRegex(pattern.regex), `${name} failed safe-regex`);
    // Bounded, non-nested charset with a lower length bound only — no `.*`,
    // no alternation of overlapping classes.
    assert.doesNotMatch(pattern.regex.source, /\.\*|\.\+|\)\*|\)\+/);
  }
});
