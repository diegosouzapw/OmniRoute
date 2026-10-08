// node:test regression for #15294. The dashboard test next to EndpointPageClient
// mounts the page under vitest/jsdom. This file is the runner the fix is
// required to pass with `node --import tsx/esm --test`: the same object body
// the route guard returns, formatted the way the tunnel notice formats it.
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { extractApiErrorMessage } from "../../src/shared/http/apiErrorMessage.ts";

const LOCAL_ONLY_BODY = {
  error: {
    code: "LOCAL_ONLY",
    message: "This endpoint requires localhost access",
    correlation_id: "633dd230-033a-40e7-865f-db8048cb12d9",
  },
};

const FALLBACK = "Failed to update Cloudflare tunnel";

function tunnelNoticeText(body: unknown): string {
  return new Error(extractApiErrorMessage(body, FALLBACK)).message;
}

const source = readFileSync(
  resolve(
    dirname(fileURLToPath(import.meta.url)),
    "../../src/app/(dashboard)/dashboard/endpoint/EndpointPageClient.tsx"
  ),
  "utf8"
);

test("a LOCAL_ONLY object body renders its message, not [object Object] (#15294)", () => {
  const before = new Error(LOCAL_ONLY_BODY.error as unknown as string).message;
  assert.equal(before, "[object Object]");

  const rendered = tunnelNoticeText(LOCAL_ONLY_BODY);
  assert.equal(rendered, "This endpoint requires localhost access");
  assert.equal(rendered.includes("[object Object]"), false);
});

test("a string error body is still shown as that string (#15294)", () => {
  assert.equal(
    tunnelNoticeText({ error: "cloudflared is not installed" }),
    "cloudflared is not installed"
  );
  assert.equal(tunnelNoticeText({}), FALLBACK);
  assert.equal(tunnelNoticeText(null), FALLBACK);
});

test("the cloudflared action formats the body through extractApiErrorMessage (#15294)", () => {
  const start = source.indexOf("const handleCloudflaredAction");
  const end = source.indexOf("const handleNgrokAction");
  const action = source.slice(start, end);
  assert.match(action, /extractApiErrorMessage\(\s*data,/);
  assert.doesNotMatch(action, /data\?\.error\s*\|\|/);
});
