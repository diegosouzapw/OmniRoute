import assert from "node:assert/strict";
import { test } from "node:test";

import {
  buildStreamingResponseHeaders,
  type StreamingResponseHeadersMeta,
} from "@omniroute/open-sse/handlers/chatCore/responseHeaders.ts";

// Regression guard for issue #14116:
// When combo/pool routing serves a request through a Codex connection that is
// NOT the one the caller requested/authenticated with (a "foreign" account
// within the combo's target pool), the upstream x-codex-*-used-percent /
// -reset / -window / -credits / -plan-type quota headers must NOT be
// forwarded to the caller — they describe a different account's quota, not
// the caller's own. On the direct path (#10315), the same headers must keep
// being forwarded, since there the caller unambiguously owns the response.
//
// buildStreamingResponseHeaders() is the single chokepoint that decides which
// upstream headers reach the client (see the forwarding allowlist in
// responseHeaders.ts).

function getHeaderValue(headers: Record<string, string>, name: string): string | undefined {
  const entry = Object.entries(headers).find(([key]) => key.toLowerCase() === name.toLowerCase());
  return entry?.[1];
}

function codexQuotaUpstream(): Headers {
  const upstream = new Headers();
  upstream.set("x-codex-primary-used-percent", "41");
  upstream.set("x-codex-primary-reset-after-seconds", "120");
  upstream.set("x-codex-credits-has-credits", "true");
  upstream.set("x-codex-plan-type", "team");
  upstream.set("x-request-id", "req-codex-quota-14116");
  return upstream;
}

test("#14116: direct path (no combo) keeps forwarding Codex quota headers — #10315 must stay intact", () => {
  const out = buildStreamingResponseHeaders(codexQuotaUpstream(), {
    isCombo: false,
    requestedConnectionId: "conn-mine",
    selectedConnectionId: "conn-mine",
  } satisfies StreamingResponseHeadersMeta);

  assert.equal(getHeaderValue(out, "x-codex-primary-used-percent"), "41");
  assert.equal(getHeaderValue(out, "x-codex-plan-type"), "team");
});

test("#14116: combo/pool path where the selected account IS the caller's own keeps forwarding quota headers", () => {
  const out = buildStreamingResponseHeaders(codexQuotaUpstream(), {
    isCombo: true,
    requestedConnectionId: "conn-mine",
    selectedConnectionId: "conn-mine",
  } satisfies StreamingResponseHeadersMeta);

  assert.equal(getHeaderValue(out, "x-codex-primary-used-percent"), "41");
  assert.equal(getHeaderValue(out, "x-codex-plan-type"), "team");
});

test("#14116 (BUG): combo/pool path where the selected account is a FOREIGN account must NOT leak its quota headers", () => {
  // The caller pinned/requested one connection ("conn-mine"), but combo/pool
  // routing actually served the response through a different sibling account
  // ("conn-other-user") registered in the same provider's connection pool.
  const out = buildStreamingResponseHeaders(codexQuotaUpstream(), {
    isCombo: true,
    requestedConnectionId: "conn-mine",
    selectedConnectionId: "conn-other-user",
  } satisfies StreamingResponseHeadersMeta);

  // Non-quota headers are unaffected.
  assert.equal(getHeaderValue(out, "x-request-id"), "req-codex-quota-14116");

  // The foreign account's quota must not reach the caller.
  assert.equal(
    getHeaderValue(out, "x-codex-primary-used-percent"),
    undefined,
    "x-codex-primary-used-percent leaked a foreign combo account's quota to the caller"
  );
  assert.equal(
    getHeaderValue(out, "x-codex-primary-reset-after-seconds"),
    undefined,
    "x-codex-primary-reset-after-seconds leaked a foreign combo account's quota to the caller"
  );
  assert.equal(
    getHeaderValue(out, "x-codex-credits-has-credits"),
    undefined,
    "x-codex-credits-has-credits leaked a foreign combo account's quota to the caller"
  );
  assert.equal(
    getHeaderValue(out, "x-codex-plan-type"),
    undefined,
    "x-codex-plan-type leaked a foreign combo account's quota to the caller"
  );
});
