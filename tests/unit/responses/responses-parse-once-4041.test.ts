import test, { after } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const dataDir = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-responses-parse-once-"));
process.env.DATA_DIR = dataDir;
after(() => fs.rmSync(dataDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 }));

// #4041: AI routes must parse each JSON body at most once and thread the parsed value
// through model resolution and handleChat. /v1/responses now parses after raw-body admission;
// withInjectionGuard retains the same preParsedBody contract for routes that still wrap it.

// ─── Part A: withInjectionGuard threads the parsed body ──────────────────────

const { withInjectionGuard } = await import("../../../src/middleware/promptInjectionGuard.ts");

test("#4041 withInjectionGuard passes the parsed body as 3rd arg to the inner handler", async () => {
  let receivedPreParsed: unknown = undefined;

  const innerHandler = async (_request: Request, _context: unknown, preParsedBody: unknown) => {
    receivedPreParsed = preParsedBody;
    return new Response("ok");
  };

  const wrapped = withInjectionGuard(innerHandler, { mode: "warn" });
  const payload = { messages: [{ role: "user", content: "Hello world" }] };

  const request = new Request("http://localhost/v1/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  await wrapped(request, {});

  assert.deepEqual(
    receivedPreParsed,
    payload,
    "withInjectionGuard must thread the body it already parsed into the inner handler as 3rd arg"
  );
});

test("#4041 withInjectionGuard passes null as 3rd arg when body cannot be parsed", async () => {
  let receivedPreParsed: unknown = "sentinel";

  const innerHandler = async (_request: Request, _context: unknown, preParsedBody: unknown) => {
    receivedPreParsed = preParsedBody;
    return new Response("ok");
  };

  const wrapped = withInjectionGuard(innerHandler, { mode: "warn" });

  // A GET request skips the guard entirely — 3rd arg is NOT forwarded (handler gets 2 args)
  // A POST with non-JSON body: body is null, still calls handler with null as 3rd arg
  const request = new Request("http://localhost/v1/responses", {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: "not json",
  });

  await wrapped(request, {});

  assert.equal(
    receivedPreParsed,
    null,
    "withInjectionGuard must pass null (not undefined) when body could not be parsed"
  );
});

// ─── Part B: withCodexPreferredModel reuses pre-parsed body ──────────────────

test("#4041 withCodexPreferredModel accepts a pre-parsed body and avoids re-cloning the request", async () => {
  const { withCodexPreferredModel } = await import("../../../src/app/api/v1/responses/route.ts");
  const body = { model: "openai/gpt-4o", input: "hello" };
  const request = new Request("http://localhost/v1/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  let cloneCount = 0;
  const originalClone = request.clone.bind(request);
  Object.defineProperty(request, "clone", {
    value: () => {
      cloneCount += 1;
      return originalClone();
    },
  });

  const result = await withCodexPreferredModel(request, body);

  assert.equal(cloneCount, 0);
  assert.equal(result.body, body);
});

// ─── Part C: wrapped routes parse once before invoking their handler ─────────

test("#4041 the body is parsed AT MOST ONCE through withInjectionGuard + inner handler", async () => {
  let jsonParseCount = 0;

  // Build a request where we count every .json() call (including on clones)
  const payload = { model: "gpt-4o", messages: [{ role: "user", content: "hi" }] };
  const bodyStr = JSON.stringify(payload);

  // We create a real Request but intercept .clone() to return a spy-wrapped clone
  const origRequest = new Request("http://localhost/v1/responses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: bodyStr,
  });

  function wrapWithJsonSpy(req: Request): Request {
    const origJson = req.json.bind(req);
    const origClone = req.clone.bind(req);
    Object.defineProperty(req, "json", {
      value: async () => {
        jsonParseCount++;
        return origJson();
      },
      writable: true,
    });
    Object.defineProperty(req, "clone", {
      value: () => {
        const cloned = origClone();
        return wrapWithJsonSpy(cloned);
      },
      writable: true,
    });
    return req;
  }

  const spyRequest = wrapWithJsonSpy(origRequest);

  let preParsedBodyReceived: unknown = undefined;
  const innerHandler = async (_req: Request, _ctx: unknown, preParsedBody: unknown) => {
    preParsedBodyReceived = preParsedBody;
    return new Response("ok");
  };

  const wrapped = withInjectionGuard(innerHandler, { mode: "warn" });
  await wrapped(spyRequest, {});

  assert.ok(
    jsonParseCount <= 1,
    `Expected at most 1 JSON parse through withInjectionGuard, got ${jsonParseCount}`
  );
  assert.deepEqual(
    preParsedBodyReceived,
    payload,
    "inner handler must receive the pre-parsed body as 3rd arg"
  );
});
