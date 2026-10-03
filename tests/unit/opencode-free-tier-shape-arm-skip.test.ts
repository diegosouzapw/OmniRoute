/**
 * #14977: the #14313 free-tier pause is provider-global, so arming it on a thin or
 * synthetic request blacks out every later contract-shaped request for the whole TTL.
 * Keyless `opencode` has no keyed connections, so a single thin refusal must not park
 * the provider.
 *
 * The arm site now hands the refused request to `armOpencodeFreeTierSkipAfterRefusal`,
 * which judges it on the RAW client body (`clientRawRequest?.body ?? body` — the
 * post-processing `body` carries OmniRoute's own synthesis) and the client-derived headers,
 * and arms the pause only when the refusal did NOT already carry the OpenCode client
 * contract. A contract-shaped refusal is a per-shape verdict, already handled by the
 * per-shape retry (`open-sse/executors/opencodeFreeTierRetry.ts`).
 */
import test from "node:test";
import assert from "node:assert/strict";

const {
  carriesFreeTierRequestContract,
  armOpencodeFreeTierSkipAfterRefusal,
  DEFAULT_PLACEHOLDER_TOOL_NAME,
} = await import("../../open-sse/executors/opencodeFreeTierContract.ts");
const { isOpencodeFreeTierSkipped, clearOpencodeFreeTierSkips } =
  await import("../../open-sse/services/opencodeFreeTierSkip.ts");

const CLI_USER_AGENT = "opencode/1.18.31";
const SESSION_ID = "ses_0123456789abcdefghijklmn";

/** A request that already satisfies the upstream contract in every respect. */
function contractBody(overrides: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    model: "big-pickle",
    stream: true,
    tools: [{ type: "function", function: { name: "bash" } }],
    ...overrides,
  };
}

const CLI_HEADERS = { "user-agent": CLI_USER_AGENT };
const SESSION_HEADERS = { "x-opencode-session": SESSION_ID };

test("a full native contract shape is recognised", () => {
  assert.equal(
    carriesFreeTierRequestContract(contractBody(), { ...CLI_HEADERS, ...SESSION_HEADERS }),
    true
  );
});

test("a non-streaming request is not the contract shape", () => {
  assert.equal(
    carriesFreeTierRequestContract(contractBody({ stream: false }), {
      ...CLI_HEADERS,
      ...SESSION_HEADERS,
    }),
    false,
    "stream must be true; the contract forces it, a client that never asked for it is not evidence"
  );
});

test("a request declaring only the placeholder tool is not the contract shape", () => {
  assert.equal(
    carriesFreeTierRequestContract(
      contractBody({ tools: [{ type: "function", function: { name: "_noop" } }] }),
      { ...CLI_HEADERS, ...SESSION_HEADERS }
    ),
    false,
    "the placeholder is OmniRoute synthesis, never client evidence"
  );
  assert.equal(DEFAULT_PLACEHOLDER_TOOL_NAME, "_noop");
});

test("a request declaring only an operator-configured placeholder tool is not the contract shape", () => {
  const previous = process.env.OPENCODE_FREE_TIER_PLACEHOLDER_TOOLS;
  process.env.OPENCODE_FREE_TIER_PLACEHOLDER_TOOLS = "zen_noop";
  try {
    assert.equal(
      carriesFreeTierRequestContract(
        contractBody({ tools: [{ type: "function", function: { name: "zen_noop" } }] }),
        { ...CLI_HEADERS, ...SESSION_HEADERS }
      ),
      false,
      "configured placeholder names are synthesis too, and must not read as a real tool"
    );
  } finally {
    if (previous === undefined) delete process.env.OPENCODE_FREE_TIER_PLACEHOLDER_TOOLS;
    else process.env.OPENCODE_FREE_TIER_PLACEHOLDER_TOOLS = previous;
  }
});

test("a request with neither a session nor a CLI user-agent is a foreign shape", () => {
  assert.equal(
    carriesFreeTierRequestContract(contractBody(), { "user-agent": "curl/8.5.0" }),
    false
  );
  assert.equal(carriesFreeTierRequestContract(contractBody(), null), false);
  assert.equal(carriesFreeTierRequestContract(contractBody(), undefined), false);
});

test("either identity half alone is enough — the test is OR, not AND", () => {
  // OmniRoute synthesizes the other half anyway, so demanding both would reject requests
  // the native client legitimately makes.
  assert.equal(
    carriesFreeTierRequestContract(contractBody(), SESSION_HEADERS),
    true,
    "a session identity alone is sufficient"
  );
  assert.equal(
    carriesFreeTierRequestContract(contractBody(), CLI_HEADERS),
    true,
    "a CLI user-agent alone is sufficient"
  );
  assert.equal(
    carriesFreeTierRequestContract(contractBody(), { "user-agent": "opencode/0.9.0" }),
    false,
    "a user-agent below the contract minimum is not CLI evidence"
  );
});

test("the arm site gates the pause behind the predicate (#14977 regression guard)", async () => {
  const { readFile } = await import("node:fs/promises");
  const { fileURLToPath } = await import("node:url");
  const source = await readFile(
    fileURLToPath(new URL("../../open-sse/handlers/chatCore.ts", import.meta.url)),
    "utf8"
  );
  const armIndex = source.indexOf("armOpencodeFreeTierSkipAfterRefusal(");
  assert.notEqual(armIndex, -1, "the #14313 arm site must still exist");

  // The gate must be handed the RAW client body and the client headers, and must not be
  // inlined back into chatCore — that is the shape the fix is about.
  const window = source.slice(armIndex, armIndex + 400);
  assert.match(
    window,
    /clientRawRequest\?\.body\s*\?\?\s*body/,
    "the pause must be judged on the RAW client body, not the contract-processed one"
  );
  assert.match(window, /getExecutorClientHeaders\(\)/, "headers must come from the client");
  assert.doesNotMatch(
    window,
    /noteOpencodeFreeTierSkip\(/,
    "the arm must be delegated, not re-inlined around a raw noteOpencodeFreeTierSkip call"
  );
});

const REFUSAL_MESSAGE = "FreeTierError: free tier can only be used with an OpenCode client shape";
const REFUSAL_STATUS = 403;

/** Arm the pause the way the arm site does, and report whether it took. */
function armed(
  connectionId: string,
  body: unknown,
  headers: Record<string, string> | null
): boolean {
  clearOpencodeFreeTierSkips();
  armOpencodeFreeTierSkipAfterRefusal(
    connectionId,
    "opencode",
    REFUSAL_STATUS,
    REFUSAL_MESSAGE,
    body,
    headers
  );
  return isOpencodeFreeTierSkipped("opencode");
}

test("a thin noauth refusal still arms the pause (#14313 preserved)", () => {
  assert.equal(
    armed("noauth", { model: "big-pickle", messages: [] }, { "user-agent": "curl/8.5.0" }),
    true,
    "a request that did not carry the client contract is exactly what the pause is for"
  );
});

test("a contract-shaped refusal does NOT arm the pause (#14977)", () => {
  assert.equal(
    armed("noauth", contractBody(), { ...CLI_HEADERS, ...SESSION_HEADERS }),
    false,
    "the provider-global pause must not be armed by a refusal that judges one request shape"
  );
});

test("a contract-shaped refusal is still a pause for the shapes that need it", () => {
  // Same request shape, but the client sent no stream: nothing about the provider changed,
  // so the pause must still arm — the gate judges the request, not the outcome.
  assert.equal(
    armed("noauth", contractBody({ stream: false }), { ...CLI_HEADERS, ...SESSION_HEADERS }),
    true
  );
});

test("the pause is armed only on the keyless path", () => {
  assert.equal(armed("conn-42", { model: "big-pickle" }, CLI_HEADERS), false);
});

test("a non-free-tier refusal never arms the pause", () => {
  clearOpencodeFreeTierSkips();
  armOpencodeFreeTierSkipAfterRefusal(
    "noauth",
    "opencode",
    401,
    "CreditsError: insufficient credits",
    { model: "big-pickle" },
    CLI_HEADERS
  );
  assert.equal(isOpencodeFreeTierSkipped("opencode"), false);
});

test("a foreign provider echoing the refusal is out of scope", () => {
  clearOpencodeFreeTierSkips();
  armOpencodeFreeTierSkipAfterRefusal("noauth", "openai", REFUSAL_STATUS, REFUSAL_MESSAGE, {
    model: "gpt-5",
  });
  assert.equal(isOpencodeFreeTierSkipped("openai"), false);
});
