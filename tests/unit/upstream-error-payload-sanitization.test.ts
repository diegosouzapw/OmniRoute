/**
 * Hard Rule #12 regression guard for `toJsonErrorPayload` (#15159 wave 1.1).
 *
 * The helper has 21 call sites across 13 production files and every one of them
 * serializes its return value straight into an HTTP response body. Before this
 * guard it had NO sanitizer on any of its five branches, so an upstream
 * provider controlled every byte of the client-visible payload:
 *
 *   | branch                          | leak                                     |
 *   | ------------------------------- | ---------------------------------------- |
 *   | `return rawError`               | entire envelope, no field allow-list    |
 *   | `error` as string               | raw string as `message`                  |
 *   | `...errorRecord` spread         | whole nested object                      |
 *   | `details: rawErrorRecord`       | whole raw object nested under `details`  |
 *   | non-JSON string                 | raw string (a pasted stack passes through) |
 *
 * The proof below is the hostile envelope from the audit: it came back with the
 * key, the server path AND unrelated fields (`token`, `internal_path`) intact.
 *
 * Every assertion is a *property* (`never contains the secret / the path`)
 * rather than a golden string wherever the sanitizer's exact rewrite is an
 * implementation detail, so this guard does not rot when redaction formatting
 * changes — but it still fails if the leak comes back.
 */
import test from "node:test";
import assert from "node:assert/strict";

const { toJsonErrorPayload } = await import("../../src/shared/utils/upstreamError.ts");

/** The audit's proof-of-leak envelope. Nothing here may survive verbatim. */
const HOSTILE_SECRET = "sk-live-SECRET123";
const HOSTILE_SECRET_2 = "sk-live-XYZ";
const HOSTILE_PATH = "/srv/app/dist/client.js";
const HOSTILE_INTERNAL_PATH = "/srv/app/internal";

const HOSTILE_ENVELOPE = {
  error: {
    message: `boom at ${HOSTILE_PATH}:44:12 api_key=${HOSTILE_SECRET}`,
    token: HOSTILE_SECRET_2,
    internal_path: HOSTILE_INTERNAL_PATH,
  },
};

/**
 * The property the whole file exists to enforce: nothing the helper returns
 * may carry an upstream credential, a server filesystem path, or a stack frame.
 */
function assertNoDisclosures(payload: unknown, context: string) {
  const serialized = JSON.stringify(payload) ?? "";
  assert.doesNotMatch(serialized, /sk-live-/, `${context}: leaked an upstream credential`);
  assert.doesNotMatch(serialized, /\/srv\/app/, `${context}: leaked a server filesystem path`);
  assert.doesNotMatch(serialized, /\bat \w+ \(/, `${context}: leaked a stack frame`);
  assert.doesNotMatch(
    serialized,
    /"(?:__proto__|constructor|prototype)"/,
    `${context}: prototype key`
  );
}

test("#15159: the nested-error-object branch drops unrelated upstream fields", () => {
  const payload = toJsonErrorPayload(HOSTILE_ENVELOPE) as {
    error: { message: string; token?: unknown; internal_path?: unknown };
  };

  assertNoDisclosures(payload, "nested error object");

  // The bug in #15159 was the FULL-OBJECT PASSTHROUGH: sibling fields of
  // `message` reached the client untouched. They must be gone.
  assert.equal(
    Object.hasOwn(payload.error, "token"),
    false,
    "token must not be forwarded from the upstream error object"
  );
  assert.equal(
    Object.hasOwn(payload.error, "internal_path"),
    false,
    "internal_path must not be forwarded from the upstream error object"
  );

  // ...but the message itself survives, redacted and path-stripped.
  assert.match(payload.error.message, /boom/);
  assert.match(payload.error.message, /\[REDACTED\]/);
});

test("#15159: top-level siblings of `error` are not forwarded verbatim", () => {
  const payload = toJsonErrorPayload({
    error: { message: "quota exhausted", code: "quota_exceeded" },
    internal_debug: `stack at ${HOSTILE_PATH} token=${HOSTILE_SECRET_2}`,
    request_body: { prompt: "leak me" },
  }) as { error: { message: string } } & Record<string, unknown>;

  assertNoDisclosures(payload, "top-level siblings");

  assert.equal(
    Object.hasOwn(payload, "internal_debug"),
    false,
    "internal_debug must not pass through"
  );
  assert.equal(Object.hasOwn(payload, "request_body"), false, "request_body must not pass through");
  assert.equal(payload.error.message, "quota exhausted");
});

test("#15159: a string `error` is redacted rather than forwarded verbatim", () => {
  const payload = toJsonErrorPayload({
    error: `failed at ${HOSTILE_PATH}:12 api_key=${HOSTILE_SECRET}`,
  }) as { error: { message: string } };

  assertNoDisclosures(payload, "string error");
  assert.match(payload.error.message, /failed/);
  assert.match(payload.error.message, /\[REDACTED\]/);
});

test("#15159: the `errors`-array spread branch does not leak sibling fields", () => {
  const payload = toJsonErrorPayload({
    error: {
      errors: [`bad at ${HOSTILE_PATH}:1 key=${HOSTILE_SECRET_2}`],
      api_key: HOSTILE_SECRET,
      provider_internal: HOSTILE_INTERNAL_PATH,
    },
  }) as { error: { message: string; api_key?: unknown; provider_internal?: unknown } };

  assertNoDisclosures(payload, "errors-array spread");

  assert.equal(
    Object.hasOwn(payload.error, "api_key"),
    false,
    "api_key must not be spread through"
  );
  assert.equal(
    Object.hasOwn(payload.error, "provider_internal"),
    false,
    "provider_internal must not be spread through"
  );
  assert.match(payload.error.message, /bad/);
});

test("#15159: `details` is sanitized, not the raw upstream object", () => {
  const payload = toJsonErrorPayload({
    errors: [`rejected at ${HOSTILE_PATH}:9 token=${HOSTILE_SECRET_2}`],
    name: "bad request",
    api_key: HOSTILE_SECRET,
  }) as { error: { message: string; details?: Record<string, unknown> } };

  assertNoDisclosures(payload, "nested details");

  assert.equal(
    Object.hasOwn(payload.error.details ?? {}, "api_key"),
    false,
    "details must not carry a raw api_key field"
  );
  // Safe, non-credential context is still useful and is preserved.
  assert.equal(payload.error.details?.name, "bad request");
});

test("#15159: a pasted stack trace in a non-JSON string is stripped to its first line", () => {
  const payload = toJsonErrorPayload(
    `Error: upstream exploded\n    at createTask (${HOSTILE_PATH}/kie.ts:57:5)\n    at async handler (${HOSTILE_PATH}/route.ts:12:3)`
  ) as { error: { message: string } };

  assertNoDisclosures(payload, "pasted stack trace");
  assert.equal(payload.error.message, "Error: upstream exploded");
});

test("#15159: an upstream body with no message-shaped field still yields the fallback message", () => {
  // Guarantee for every one of the 21 call sites: a serialized response body
  // ALWAYS has `error.message`. Before the fix the `{ error: rawErrorRecord }`
  // branch returned whatever the provider sent, so a body with no
  // message/detail/errors/name reached the client with no message at all.
  const payload = toJsonErrorPayload(
    { trace_id: `abc at ${HOSTILE_PATH}` },
    "Search provider error"
  ) as {
    error: { message?: string };
  };

  assertNoDisclosures(payload, "no message-shaped field");
  assert.equal(payload.error.message, "Search provider error");
});

test("#15159: a wholly-credential message is redacted, not echoed", () => {
  const payload = toJsonErrorPayload(`api_key=${HOSTILE_SECRET}`, "Search provider error") as {
    error: { message: string };
  };

  assertNoDisclosures(payload, "wholly-credential message");
  assert.equal(payload.error.message.includes(HOSTILE_SECRET), false);
});

test("#15159: prototype-control keys in an upstream body cannot pollute Object.prototype", () => {
  // The audit's hostile envelope is not the only shape that matters: an upstream
  // body is attacker-influenced JSON, so `__proto__` / `constructor` /
  // `prototype` must never survive into the payload — whether as a key that
  // reaches the client, or as a prototype that gets ASSIGNED somewhere.
  const hostile = JSON.parse(
    '{"__proto__":{"polluted":"yes"},"constructor":{"x":1},"prototype":{"y":2},"name":"bad request"}'
  );

  const payload = toJsonErrorPayload(hostile) as { error: { details?: Record<string, unknown> } };
  const serialized = JSON.stringify(payload);

  assert.equal(({} as Record<string, unknown>).polluted, undefined, "Object.prototype polluted");
  assert.doesNotMatch(serialized, /__proto__|constructor|prototype/);
  // Safe non-control context is still preserved.
  assert.equal(payload.error.details?.name, "bad request");
});

test("#15159: a deeply nested hostile body cannot smuggle a credential through details", () => {
  // sanitizeUpstreamDetails is depth- and count-capped, so nesting past the cap
  // must truncate rather than recurse into the secret.
  const deep: Record<string, unknown> = { name: "bad request" };
  let node = deep;
  for (let i = 0; i < 12; i++) {
    const child: Record<string, unknown> = {};
    node.nested = child;
    node = child;
  }
  node.api_key = HOSTILE_SECRET;
  node.message = `deep at ${HOSTILE_PATH}`;

  assertNoDisclosures(toJsonErrorPayload(deep, "fallback"), "deeply nested hostile body");
});

test("#15159: every branch is disclosure-free for the audit's hostile envelope", () => {
  // One input, every entry point into the helper — the branch table's rows.
  const cases: [string, unknown][] = [
    ["object with nested error object", HOSTILE_ENVELOPE],
    ["object with string error", { error: `boom api_key=${HOSTILE_SECRET}` }],
    ["object with errors array", { error: { errors: [`boom api_key=${HOSTILE_SECRET}`] } }],
    ["object with message only", { message: `boom at ${HOSTILE_PATH} api_key=${HOSTILE_SECRET}` }],
    ["JSON string", JSON.stringify(HOSTILE_ENVELOPE)],
    ["non-JSON string", `boom at ${HOSTILE_PATH}:44 api_key=${HOSTILE_SECRET}`],
  ];

  for (const [label, input] of cases) {
    assertNoDisclosures(toJsonErrorPayload(input, "fallback"), label);
  }
});
