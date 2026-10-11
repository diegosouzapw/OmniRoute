/**
 * Hermetic contract tests for the Claude reset-credit list / redeem flow, driven through the
 * real entry points (listClaudeResetCredits, consumeClaudeResetCredit, the
 * /api/usage/codex-reset-credit route) down to the network boundary, where `fetch` is stubbed.
 *
 * Request / response shapes asserted here come from this PR's own implementation and its
 * author's captured evidence (PR #14728): `GET /api/oauth/usage?at_wall=1&cedar_ember=1&skip_spend=1`
 * with the Claude Code CLI headers, `POST /api/organizations/<org>/reset_rate_limits` with
 * `{program: "cedar_ember", grant_id, request_id}` or `{program: "juniper_tide"}`, and the
 * `cedar_ember.grants[]` / `juniper_tide` blocks of the usage body. These tests prove the code
 * matches that shape; they do not prove Anthropic still answers that way.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-claude-reset-contract-"));
process.env.DATA_DIR = dataDir;
process.env.API_KEY_SECRET = "claude-reset-contract-test-secret";

const { createProviderConnection, getProviderConnectionById } =
  await import("../../src/lib/db/providers.ts");
const { listClaudeResetCredits, consumeClaudeResetCredit } =
  await import("../../src/lib/usage/claudeResetCredits.ts");
const { getClaudeCodeVersion } = await import("../../open-sse/executors/claudeIdentity.ts");
const { getCredentialRefreshExecutor } = await import("../../open-sse/executors/credential.ts");
const resetCreditMemo = await import("../../open-sse/services/claudeResetCreditCount.ts");
const { _resetClaudeLimitResetMemo } = await import("../../open-sse/services/claudeLimitReset.ts");
const route = await import("../../src/app/api/usage/codex-reset-credit/route.ts");
const { resetDbInstance } = await import("../../src/lib/db/core.ts");

const LIST_URL = "https://api.anthropic.com/api/oauth/usage?at_wall=1&cedar_ember=1&skip_spend=1";
const BOOTSTRAP_URL = "https://api.anthropic.com/api/claude_cli/bootstrap";
const claimUrl = (org: string) =>
  `https://api.anthropic.com/api/organizations/${org}/reset_rate_limits`;
const CLI_UA = `claude-cli/${getClaudeCodeVersion()} (external, cli)`;

type Recorded = {
  url: string;
  method: string;
  headers: Record<string, string>;
  body: string | null;
};
type Handler = (req: Recorded) => Response | Promise<Response>;

const originalFetch = globalThis.fetch;
let requests: Recorded[] = [];

/** Route `fetch` by `METHOD url`; any unrouted call fails loudly with a 599. */
function stubUpstream(routes: Record<string, Handler>) {
  requests = [];
  globalThis.fetch = (async (input: unknown, init?: RequestInit) => {
    const rec: Recorded = {
      url: String(input),
      method: init?.method ?? "GET",
      headers: { ...((init?.headers as Record<string, string>) ?? {}) },
      body: typeof init?.body === "string" ? init.body : null,
    };
    requests.push(rec);
    const handler = routes[`${rec.method} ${rec.url}`];
    return handler ? handler(rec) : new Response("unrouted", { status: 599 });
  }) as typeof fetch;
}

const callsTo = (key: string) => requests.filter((r) => `${r.method} ${r.url}` === key);

const GRANT_A = {
  id: "grant-a",
  label: "Bonus Reset Card",
  resets_total: 2,
  resets_left: 2,
  starts_at: "2026-09-20T00:00:00Z",
  ends_at: "2026-10-30T00:00:00Z",
  clears: ["five_hour", "seven_day"],
  usable_now: true,
};
const GRANT_SPENT = { id: "grant-spent", label: "Spent", resets_total: 1, resets_left: 0 };

let seq = 0;
async function makeConnection(overrides: Record<string, unknown> = {}) {
  seq += 1;
  const connection = await createProviderConnection({
    provider: "claude",
    authType: "oauth",
    name: `Contract ${seq}`,
    email: `contract-${seq}@example.com`,
    accessToken: `access-${seq}`,
    refreshToken: `refresh-${seq}`,
    isActive: true,
    expiresAt: "2099-01-01T00:00:00Z",
    providerSpecificData: { organizationUUID: "org-1" },
    ...overrides,
  });
  return { id: String(connection.id), n: seq };
}

test.beforeEach(() => {
  resetCreditMemo._resetClaudeResetCreditCountCache();
  _resetClaudeLimitResetMemo();
});

test.afterEach(() => {
  globalThis.fetch = originalFetch;
});

test.after(() => {
  resetDbInstance();
  fs.rmSync(dataDir, { recursive: true, force: true });
});

test("list: GET with the query string, CLI headers and the connection's bearer; grants parsed", async () => {
  const { id, n } = await makeConnection();
  stubUpstream({
    [`GET ${LIST_URL}`]: () =>
      Response.json({
        cedar_ember: { grants: [GRANT_A, GRANT_SPENT] },
        juniper_tide: { eligible: true, arm: "reset", available: true },
      }),
  });

  const list = await listClaudeResetCredits(id);

  assert.equal(requests.length, 1);
  const req = requests[0];
  assert.equal(req.method, "GET");
  assert.equal(req.url, LIST_URL);
  assert.equal(req.body, null);
  assert.deepEqual(req.headers, {
    Accept: "application/json, text/plain, */*",
    Authorization: `Bearer access-${n}`,
    "Content-Type": "application/json",
    "User-Agent": CLI_UA,
    "x-app": "cli",
    "anthropic-beta": "oauth-2025-04-20",
  });
  // The exhausted grant is not offered; the weekly session reset is appended.
  assert.deepEqual(
    list.credits.map((c) => c.selectionToken),
    ["grant:grant-a", "session_reset"]
  );
  assert.equal(list.availableCount, 3);
  assert.equal(list.credits[0].resetsLeft, 2);
  assert.equal(list.credits[0].usableNow, true);
});

test("list: grant exhaustion — spent grants are not offered and the count is an authoritative 0", async () => {
  const { id } = await makeConnection();
  stubUpstream({
    [`GET ${LIST_URL}`]: () =>
      Response.json({ cedar_ember: { grants: [GRANT_SPENT] }, juniper_tide: null }),
  });

  assert.deepEqual(await listClaudeResetCredits(id), { credits: [], availableCount: 0 });
  assert.equal(resetCreditMemo.peekClaudeResetCreditCount(id), 0);

  // A weekly session reset that is eligible but not available yet is listed as cooling down,
  // not redeemable, and adds nothing to the count.
  stubUpstream({
    [`GET ${LIST_URL}`]: () =>
      Response.json({
        cedar_ember: { grants: [GRANT_SPENT] },
        juniper_tide: { eligible: true, arm: "reset", available: false },
      }),
  });
  const cooling = await listClaudeResetCredits(id);
  assert.equal(cooling.availableCount, 0);
  assert.deepEqual(
    cooling.credits.map((c) => [c.selectionToken, c.status, c.usableNow]),
    [["session_reset", "cooling_down", false]]
  );
});

test("list: upstream 401/403/429/5xx map to ClaudeResetCreditError and only a refusal makes the count unknown", async () => {
  const { id } = await makeConnection();
  const cases = [
    { upstream: 401, status: 502, code: "claude_usage_failed", count: null },
    { upstream: 403, status: 502, code: "claude_usage_failed", count: null },
    { upstream: 429, status: 429, code: "rate_limited", count: 3 },
    { upstream: 500, status: 502, code: "claude_usage_failed", count: 3 },
  ] as const;
  for (const c of cases) {
    stubUpstream({
      [`GET ${LIST_URL}`]: () =>
        Response.json({
          cedar_ember: { grants: [GRANT_A] },
          juniper_tide: { eligible: true, arm: "reset", available: true },
        }),
    });
    await listClaudeResetCredits(id);
    stubUpstream({
      [`GET ${LIST_URL}`]: () =>
        Response.json({ message: `upstream said ${c.upstream}` }, { status: c.upstream }),
    });
    await assert.rejects(listClaudeResetCredits(id), {
      name: "ClaudeResetCreditError",
      status: c.status,
      code: c.code,
      message: `Failed to fetch Claude usage: upstream said ${c.upstream}`,
    });
    assert.equal(resetCreditMemo.peekClaudeResetCreditCount(id), c.count, `HTTP ${c.upstream}`);
  }
});

test("list: a transport failure surfaces as 502 and never as a fake empty list", async () => {
  const { id } = await makeConnection();
  stubUpstream({
    [`GET ${LIST_URL}`]: () => {
      throw new TypeError("fetch failed");
    },
  });
  await assert.rejects(listClaudeResetCredits(id), {
    status: 502,
    code: "claude_usage_failed",
    message: "Failed to fetch Claude usage: request failed",
  });
  assert.equal(resetCreditMemo.peekClaudeResetCreditCount(id), null);
});

test("redeem a grant: POST body is cedar_ember + grant_id + request_id = the caller's idempotency key", async () => {
  const { id, n } = await makeConnection();
  stubUpstream({
    [`POST ${claimUrl("org-1")}`]: () => Response.json({ result: "reset", resets_left: 1 }),
    [`GET ${LIST_URL}`]: () => Response.json({}),
  });

  const redeemed = await consumeClaudeResetCredit(id, "idem-grant-1", "grant:grant-a");

  assert.equal(redeemed.outcome, "reset");
  const posts = callsTo(`POST ${claimUrl("org-1")}`);
  assert.equal(posts.length, 1);
  assert.deepEqual(JSON.parse(posts[0].body ?? "null"), {
    program: "cedar_ember",
    grant_id: "grant-a",
    request_id: "idem-grant-1",
  });
  assert.deepEqual(posts[0].headers, {
    Accept: "application/json, text/plain, */*",
    Authorization: `Bearer access-${n}`,
    "Content-Type": "application/json",
    "User-Agent": CLI_UA,
    "x-app": "cli",
    "anthropic-beta": "oauth-2025-04-20",
  });
});

test("redeem the weekly session reset: POST body is exactly {program: juniper_tide}", async () => {
  const { id } = await makeConnection();
  stubUpstream({
    [`POST ${claimUrl("org-1")}`]: () => Response.json({ result: "reset" }),
  });

  for (const creditId of ["session_reset", undefined]) {
    requests = [];
    const redeemed = await consumeClaudeResetCredit(id, "idem-session", creditId);
    assert.equal(redeemed.outcome, "reset");
    const posts = callsTo(`POST ${claimUrl("org-1")}`);
    assert.equal(posts.length, 1);
    assert.deepEqual(JSON.parse(posts[0].body ?? "null"), { program: "juniper_tide" });
  }
});

test("redeem: every claim result maps to a stable status/code and no result leaves a stale count", async () => {
  const { id } = await makeConnection();
  const table: Array<{
    name: string;
    reply: () => Response;
    ok?: boolean;
    status?: number;
    code?: string;
    messageIncludes?: string;
  }> = [
    { name: "reset", reply: () => Response.json({ result: "reset" }), ok: true },
    { name: "not_limited", reply: () => Response.json({ result: "not_limited" }), ok: true },
    {
      name: "already_used",
      reply: () => Response.json({ result: "already_used" }),
      status: 409,
      code: "already_used",
    },
    {
      name: "cooldown",
      reply: () => Response.json({ result: "cooldown", cooldown_until: "2026-10-09T00:00:00Z" }),
      status: 429,
      code: "cooldown_active",
      messageIncludes: "2026-10-09T00:00:00Z",
    },
    {
      name: "ineligible",
      reply: () => Response.json({ result: "ineligible" }),
      status: 403,
      code: "ineligible",
    },
    {
      name: "unavailable",
      reply: () => Response.json({ result: "unexpected-value" }),
      status: 502,
      code: "claim_unavailable",
    },
    {
      name: "HTTP 401",
      reply: () => new Response("{}", { status: 401 }),
      status: 502,
      code: "claim_auth_error",
    },
    {
      name: "HTTP 403",
      reply: () => new Response("{}", { status: 403 }),
      status: 502,
      code: "claim_auth_error",
    },
    {
      name: "HTTP 429",
      reply: () => new Response("{}", { status: 429 }),
      status: 502,
      code: "claim_rate_limited",
    },
    {
      name: "HTTP 500",
      reply: () => new Response("{}", { status: 500 }),
      status: 502,
      code: "claim_error",
    },
  ];

  for (const row of table) {
    // Seed a count so "forgotten after any outcome" is observable.
    stubUpstream({
      [`GET ${LIST_URL}`]: () =>
        Response.json({ cedar_ember: { grants: [GRANT_A] }, juniper_tide: null }),
    });
    await listClaudeResetCredits(id);
    assert.equal(resetCreditMemo.peekClaudeResetCreditCount(id), 2, row.name);

    stubUpstream({
      [`POST ${claimUrl("org-1")}`]: row.reply,
      [`GET ${LIST_URL}`]: () => Response.json({}),
    });
    if (row.ok) {
      const redeemed = await consumeClaudeResetCredit(id, `idem-${row.name}`, "grant:grant-a");
      assert.equal(redeemed.outcome, "reset", row.name);
    } else {
      await assert.rejects(
        consumeClaudeResetCredit(id, `idem-${row.name}`, "grant:grant-a"),
        (error: unknown) => {
          const e = error as { name: string; status: number; code: string; message: string };
          assert.equal(e.name, "ClaudeResetCreditError", row.name);
          assert.equal(e.status, row.status, row.name);
          assert.equal(e.code, row.code, row.name);
          if (row.messageIncludes) assert.ok(e.message.includes(row.messageIncludes), row.name);
          return true;
        }
      );
    }
    assert.equal(callsTo(`POST ${claimUrl("org-1")}`).length, 1, `${row.name}: one claim only`);
    assert.equal(
      resetCreditMemo.peekClaudeResetCreditCount(id),
      null,
      `${row.name}: the redeem must leave the count unknown`
    );
  }
});

test("redeem: grant exhaustion — a second redeem of a spent grant is refused as already_used", async () => {
  const { id } = await makeConnection();
  let first = true;
  stubUpstream({
    [`POST ${claimUrl("org-1")}`]: () => {
      const reply = first ? { result: "reset", resets_left: 0 } : { result: "already_used" };
      first = false;
      return Response.json(reply);
    },
    [`GET ${LIST_URL}`]: () => Response.json({}),
  });

  const redeemed = await consumeClaudeResetCredit(id, "idem-a", "grant:grant-a");
  assert.equal(redeemed.outcome, "reset");
  await assert.rejects(consumeClaudeResetCredit(id, "idem-b", "grant:grant-a"), {
    status: 409,
    code: "already_used",
  });
});

test("redeem: without a persisted organization the bootstrap supplies it (CLI UA); without either nothing is claimed", async () => {
  const noOrg = await makeConnection({ providerSpecificData: {} });
  stubUpstream({
    [`GET ${BOOTSTRAP_URL}`]: () =>
      Response.json({ oauth_account: { organization_uuid: "org-from-bootstrap" } }),
    [`POST ${claimUrl("org-from-bootstrap")}`]: () => Response.json({ result: "reset" }),
    [`GET ${LIST_URL}`]: () => Response.json({}),
  });

  const redeemed = await consumeClaudeResetCredit(noOrg.id, "idem-boot", "grant:grant-a");
  assert.equal(redeemed.outcome, "reset");
  // Only the bootstrap can have produced this organization, so the claim URL proves its use.
  const postAt = requests.findIndex((r) => r.method === "POST");
  assert.equal(requests[postAt].url, claimUrl("org-from-bootstrap"));
  const bootAt = requests.findIndex((r) => r.url === BOOTSTRAP_URL);
  assert.ok(bootAt >= 0 && bootAt < postAt, "the bootstrap is read before the claim");
  assert.equal(requests[bootAt].headers.Authorization, `Bearer access-${noOrg.n}`);
  assert.equal(requests[bootAt].headers["User-Agent"], CLI_UA);

  // Bootstrap refused: the redeem stops before any POST. (A fresh connection — the first
  // redeem's usage refresh may already have persisted the organization on `noOrg`.)
  const stillNoOrg = await makeConnection({ providerSpecificData: {} });
  stubUpstream({ [`GET ${BOOTSTRAP_URL}`]: () => new Response("{}", { status: 401 }) });
  await assert.rejects(consumeClaudeResetCredit(stillNoOrg.id, "idem-boot-2", "grant:grant-a"), {
    status: 400,
    code: "claude_organization_uuid_missing",
  });
  assert.equal(requests.filter((r) => r.method === "POST").length, 0);
});

test("redeem with a persisted organization resolves it without the bootstrap", async () => {
  const { id } = await makeConnection();
  stubUpstream({
    [`POST ${claimUrl("org-1")}`]: () => Response.json({ result: "reset" }),
    [`GET ${LIST_URL}`]: () => Response.json({}),
  });
  await consumeClaudeResetCredit(id, "idem-persisted", "grant:grant-a");
  // The follow-up usage refresh may probe the bootstrap on its own; the claim must not wait on it.
  const postAt = requests.findIndex((r) => r.method === "POST");
  assert.equal(requests[postAt].url, claimUrl("org-1"));
  assert.equal(
    requests.slice(0, postAt).filter((r) => r.url === BOOTSTRAP_URL).length,
    0,
    "no bootstrap request before the claim"
  );
});

/**
 * Swap the Claude credential-refresh executor's network step for a stub (the same seam the
 * other provider-limits tests use), so the PR's consumption of a rotated credential is what is
 * asserted. The real refresh endpoint is not exercised here.
 */
async function withClaudeRefreshStub<T>(
  stub: (credentials: { refreshToken?: string }) => Promise<Record<string, unknown> | null>,
  run: (calls: Array<{ refreshToken?: string }>) => Promise<T>
): Promise<T> {
  const executor = await getCredentialRefreshExecutor("claude");
  const original = executor.refreshCredentials;
  const calls: Array<{ refreshToken?: string }> = [];
  executor.refreshCredentials = (async (credentials: { refreshToken?: string }) => {
    calls.push({ refreshToken: credentials.refreshToken });
    return stub(credentials);
  }) as typeof executor.refreshCredentials;
  try {
    return await run(calls);
  } finally {
    executor.refreshCredentials = original;
  }
}

test("token rotation: an expired access token is refreshed first and list + redeem use the NEW bearer", async () => {
  const { id, n } = await makeConnection({ expiresAt: "2000-01-01T00:00:00Z" });
  await withClaudeRefreshStub(
    async () => ({
      accessToken: "rotated-access",
      refreshToken: "rotated-refresh",
      expiresIn: 3600,
    }),
    async (refreshCalls) => {
      stubUpstream({
        [`GET ${LIST_URL}`]: () =>
          Response.json({ cedar_ember: { grants: [GRANT_A] }, juniper_tide: null }),
      });
      await listClaudeResetCredits(id);

      assert.deepEqual(refreshCalls, [{ refreshToken: `refresh-${n}` }]);
      assert.equal(callsTo(`GET ${LIST_URL}`)[0].headers.Authorization, "Bearer rotated-access");
      const stored = await getProviderConnectionById(id);
      assert.equal(stored?.accessToken, "rotated-access");
      assert.equal(
        stored?.refreshToken,
        "rotated-refresh",
        "the rotated refresh token is persisted"
      );

      // The persisted token is fresh now: the redeem must not refresh again and still signs with it.
      stubUpstream({
        [`POST ${claimUrl("org-1")}`]: () => Response.json({ result: "reset" }),
        [`GET ${LIST_URL}`]: () => Response.json({}),
      });
      await consumeClaudeResetCredit(id, "idem-rotated", "grant:grant-a");
      assert.equal(refreshCalls.length, 1, "no second refresh for a fresh credential");
      assert.equal(
        callsTo(`POST ${claimUrl("org-1")}`)[0].headers.Authorization,
        "Bearer rotated-access"
      );
    }
  );
});

test("token rotation: a refresh that yields nothing falls back to the stored token and persists nothing", async () => {
  const { id, n } = await makeConnection({ expiresAt: "2000-01-01T00:00:00Z" });
  await withClaudeRefreshStub(
    async () => null,
    async (refreshCalls) => {
      stubUpstream({
        [`GET ${LIST_URL}`]: () =>
          Response.json({ cedar_ember: { grants: [] }, juniper_tide: null }),
      });
      await listClaudeResetCredits(id);

      assert.equal(refreshCalls.length, 1);
      assert.equal(callsTo(`GET ${LIST_URL}`)[0].headers.Authorization, `Bearer access-${n}`);
      const stored = await getProviderConnectionById(id);
      assert.equal(stored?.accessToken, `access-${n}`);
      assert.equal(stored?.refreshToken, `refresh-${n}`);
    }
  );
});

test("guards: wrong provider, non-OAuth and unknown connections fail before any upstream call", async () => {
  const apikey = await createProviderConnection({
    provider: "claude",
    authType: "apikey",
    name: "Claude key",
    apiKey: "sk-ant-api-key",
  });
  const codex = await createProviderConnection({
    provider: "codex",
    authType: "oauth",
    name: "Codex acct",
    accessToken: "codex-token",
    expiresAt: "2099-01-01T00:00:00Z",
  });
  stubUpstream({});
  for (const [connectionId, status, code] of [
    [String(apikey.id), 400, "claude_oauth_required"],
    [String(codex.id), 400, "claude_provider_required"],
    ["does-not-exist", 404, "connection_not_found"],
  ] as const) {
    await assert.rejects(listClaudeResetCredits(connectionId), { status, code });
    await assert.rejects(consumeClaudeResetCredit(connectionId, "idem-guard", "grant:x"), {
      status,
      code,
    });
  }
  assert.deepEqual(requests, []);
});

test("route: GET lists and POST redeems for a Claude connection with the documented JSON shape", async () => {
  const { id } = await makeConnection();
  stubUpstream({
    [`GET ${LIST_URL}`]: () =>
      Response.json({ cedar_ember: { grants: [GRANT_A] }, juniper_tide: null }),
    [`POST ${claimUrl("org-1")}`]: () => Response.json({ result: "reset" }),
  });

  const getRes = await route.GET(
    new Request(`http://localhost/api/usage/codex-reset-credit?connectionId=${id}`)
  );
  assert.equal(getRes.status, 200);
  const listed = await getRes.json();
  assert.equal(listed.ok, true);
  assert.deepEqual(
    listed.credits.map((c: { selectionToken: string }) => c.selectionToken),
    ["grant:grant-a"]
  );
  assert.equal(listed.availableCount, 2);

  const postRes = await route.POST(
    new Request("http://localhost/api/usage/codex-reset-credit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        connectionId: id,
        idempotencyKey: "idem-route",
        creditId: "grant:grant-a",
      }),
    })
  );
  const redeemed = await postRes.json();
  assert.equal(postRes.status, 200, JSON.stringify(redeemed));
  assert.equal(redeemed.ok, true);
  assert.equal(redeemed.outcome, "reset");
  assert.deepEqual(JSON.parse(callsTo(`POST ${claimUrl("org-1")}`)[0].body ?? "null"), {
    program: "cedar_ember",
    grant_id: "grant-a",
    request_id: "idem-route",
  });
});

test("route: bad input is rejected by Zod before any upstream call", async () => {
  stubUpstream({});
  const noId = await route.GET(new Request("http://localhost/api/usage/codex-reset-credit"));
  assert.equal(noId.status, 400);
  assert.equal((await noId.json()).code, "invalid_connection_id");

  const badBody = await route.POST(
    new Request("http://localhost/api/usage/codex-reset-credit", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ connectionId: "x" }),
    })
  );
  assert.equal(badBody.status, 400);
  assert.equal((await badBody.json()).code, "invalid_request_body");
  assert.deepEqual(requests, []);
});

test("route: upstream errors reach the client with their status and never leak a stack trace", async () => {
  const { id } = await makeConnection();
  const leaky =
    "boom at /srv/omniroute/open-sse/services/x.ts:12:34\n    at async run (/srv/a.js:1:2)";
  const errors: Array<[Handler, number, string]> = [
    [() => Response.json({ message: leaky }, { status: 500 }), 502, "claude_usage_failed"],
    [() => new Response("{}", { status: 429 }), 429, "rate_limited"],
  ];
  const originalConsoleError = console.error;
  console.error = () => {};
  try {
    for (const [handler, status, code] of errors) {
      stubUpstream({ [`GET ${LIST_URL}`]: handler });
      const res = await route.GET(
        new Request(`http://localhost/api/usage/codex-reset-credit?connectionId=${id}`)
      );
      const body = await res.json();
      assert.equal(res.status, status);
      assert.equal(body.ok, false);
      assert.equal(body.code, code);
      assert.ok(!body.error.includes("at /"), `stack path leaked: ${body.error}`);
      assert.ok(!body.error.includes("/srv/"), `filesystem path leaked: ${body.error}`);
    }
  } finally {
    console.error = originalConsoleError;
  }
});

test("route: a non-Claude provider is not routed to the Claude flow", async () => {
  const other = await createProviderConnection({
    provider: "openai",
    authType: "apikey",
    name: "OpenAI key",
    apiKey: "sk-test",
  });
  stubUpstream({});
  const res = await route.GET(
    new Request(`http://localhost/api/usage/codex-reset-credit?connectionId=${other.id}`)
  );
  assert.equal(res.status, 400);
  assert.equal((await res.json()).code, "unsupported_reset_credit_provider");
  assert.deepEqual(requests, []);
});
