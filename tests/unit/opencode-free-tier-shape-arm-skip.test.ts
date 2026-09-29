/**
 * #14977: the #14313 free-tier pause is provider-global, so arming it on a thin or
 * synthetic request blacks out every later contract-shaped request for the whole TTL.
 * Keyless `opencode` has no keyed connections, so a single thin refusal must not park
 * the provider.
 *
 * The arm site now judges the refused request on the RAW client body
 * (`clientRawRequest?.body ?? body` — the post-processing `body` carries OmniRoute's own
 * synthesis) and the client-derived headers, and arms the pause only when the refusal did
 * NOT already carry the OpenCode client contract. A contract-shaped refusal is a
 * per-shape verdict, already handled by the per-shape retry (#14405).
 */
import test from "node:test";
import assert from "node:assert/strict";

const { carriesFreeTierRequestContract, DEFAULT_PLACEHOLDER_TOOL_NAME } =
  await import("../../open-sse/executors/opencodeFreeTierContract.ts");

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
  const armIndex = source.indexOf("noteOpencodeFreeTierSkip(provider");
  assert.notEqual(armIndex, -1, "the #14313 arm site must still exist");

  // The guard must sit between the refusal test and the arm, on the RAW client body.
  const window = source.slice(Math.max(0, armIndex - 1200), armIndex);
  assert.match(
    window,
    /carriesFreeTierRequestContract\(\s*clientRawRequest\?\.body\s*\?\?\s*body/,
    "the pause must be armed only when the refused request did not carry the client contract"
  );
  assert.match(window, /getExecutorClientHeaders\(\)/, "headers must come from the client");
});
