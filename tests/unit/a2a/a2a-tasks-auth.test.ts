import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TASKS_ROUTE = path.resolve(__dirname, "../../../src/app/api/a2a/tasks/route.ts");
// GHSA-jcm5-6wpp-wjj8: the constant-time token comparison moved out of
// src/app/a2a/route.ts into the shared helper both surfaces now use.
const A2A_AUTH_HELPER = path.resolve(__dirname, "../../../src/lib/a2a/authenticate.ts");

const source = fs.readFileSync(TASKS_ROUTE, "utf-8");

const { tokensMatch, authenticateA2A } = await import("../../../src/app/api/a2a/tasks/route.ts");

function hasImport(src: string, name: string, from: string): boolean {
  const pattern = new RegExp(
    `import\\s+\\{[^}]*\\b${name}\\b[^}]*\\}\\s+from\\s+["']${from}["']`
  );
  return pattern.test(src);
}

test("tasks route uses the same constant-time contract as the shared A2A auth helper", () => {
  const a2aSource = fs.readFileSync(A2A_AUTH_HELPER, "utf-8");
  assert.ok(
    hasImport(a2aSource, "timingSafeEqual", "crypto"),
    "shared auth helper imports timingSafeEqual"
  );

  assert.ok(
    hasImport(source, "timingSafeEqual", "node:crypto"),
    "tasks route imports timingSafeEqual"
  );
  assert.ok(
    /\btokensMatch\s*\(\s*token\s*,\s*configuredKey\s*\)/.test(source),
    "tasks route authenticates with tokensMatch(token, configuredKey)"
  );
  assert.ok(
    !/return\s+token\s*===\s*configuredKey\s*;/.test(source),
    "tasks route no longer uses a plain === bearer compare"
  );
});

test("tokensMatch behaves like the helper in src/app/a2a/route.ts", () => {
  assert.equal(tokensMatch("omniroute-a2a-test-key", "omniroute-a2a-test-key"), true);
  assert.equal(
    tokensMatch("x".repeat("omniroute-a2a-test-key".length), "omniroute-a2a-test-key"),
    false,
    "same-length different token is rejected"
  );
  assert.equal(tokensMatch("", "omniroute-a2a-test-key"), false, "empty token is rejected");
  assert.equal(
    tokensMatch("short", "omniroute-a2a-test-key"),
    false,
    "different-length token is rejected without throwing"
  );
});

test("authenticateA2A preserves the documented semantics", () => {
  const API_KEY = "omniroute-a2a-test-key";

  function makeRequest(token?: string): Request {
    return {
      headers: {
        get(name: string) {
          if (name.toLowerCase() !== "authorization") return null;
          return token === undefined ? null : `Bearer ${token}`;
        },
      },
    } as unknown as Request;
  }

  delete process.env.OMNIROUTE_API_KEY;
  assert.equal(
    authenticateA2A(makeRequest()),
    true,
    "when OMNIROUTE_API_KEY is not set the route is open"
  );

  process.env.OMNIROUTE_API_KEY = API_KEY;
  assert.equal(authenticateA2A(makeRequest(API_KEY)), true, "a valid bearer token passes auth");
  assert.equal(
    authenticateA2A(makeRequest("x".repeat(API_KEY.length))),
    false,
    "a same-length but different token is rejected"
  );
  assert.equal(authenticateA2A(makeRequest("")), false, "an empty bearer token is rejected");

  delete process.env.OMNIROUTE_API_KEY;
});
