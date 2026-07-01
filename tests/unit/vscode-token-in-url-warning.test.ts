import test from "node:test";
import assert from "node:assert/strict";

const tokenizedRequest = await import(
  "../../src/app/api/v1/vscode/raw/[token]/tokenizedRequest.ts"
);

function captureWarn<T>(fn: () => T): { result: T; warnings: string[] } {
  const warnings: string[] = [];
  const original = console.warn;
  console.warn = (...args: unknown[]) => {
    warnings.push(args.map((a) => String(a)).join(" "));
  };
  try {
    return { result: fn(), warnings };
  } finally {
    console.warn = original;
  }
}

test.beforeEach(() => {
  tokenizedRequest.__vscodeRawInternals.resetTokenInUrlWarning();
});

test("warns once when a path token is used, then stays quiet (Seg4)", () => {
  const makeReq = () =>
    new Request("http://localhost/api/v1/vscode/raw/sk-secret-token/models");

  const first = captureWarn(() => tokenizedRequest.withPathTokenApiKey(makeReq()));
  assert.equal(
    first.warnings.some((line) => line.includes("[VSCODE][SECURITY]")),
    true,
    "expected a security warning on the first path-token request"
  );

  const second = captureWarn(() => tokenizedRequest.withPathTokenApiKey(makeReq()));
  assert.equal(second.warnings.length, 0, "must not warn again within the same process");
});

test("propagates the path token into x-api-key / authorization headers", () => {
  const request = new Request("http://localhost/api/v1/vscode/raw/sk-secret-token/models");
  const { result } = captureWarn(() => tokenizedRequest.withPathTokenApiKey(request));

  assert.equal(result.headers.get("x-api-key"), "sk-secret-token");
  assert.equal(result.headers.get("authorization"), "Bearer sk-secret-token");
});

test("does not warn when there is no resolvable token", () => {
  // No /vscode segment → inferTokenFromVscodePath returns null and the request passes through.
  const request = new Request("http://localhost/api/v1/models");
  const { result, warnings } = captureWarn(() =>
    tokenizedRequest.withPathTokenApiKey(request)
  );

  assert.equal(warnings.length, 0);
  assert.equal(result.headers.get("x-api-key"), null);
});
