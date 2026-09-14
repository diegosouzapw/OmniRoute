import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const barrelPath = path.resolve(here, "../../../open-sse/handlers/chatCore.ts");
const leafPath = path.resolve(here, "../../../open-sse/handlers/chatCore/translateAndDedup.ts");

test("translateAndDedup leaf exists", () => {
  assert.equal(fs.existsSync(leafPath), true);
});

test("barrel no longer inlines translatedBody assignment", () => {
  const src = fs.readFileSync(barrelPath, "utf8");
  assert.equal(
    src.includes("let translatedBody = body;"),
    false,
    "request translation must leave the barrel"
  );
});

test("barrel rebinds persistAttemptLogs compressed tokens before send", () => {
  const src = fs.readFileSync(barrelPath, "utf8");
  const sliceCall = src.indexOf("runTranslateAndDedup(");
  const sendIdx = src.indexOf("const executeProviderRequest");
  assert.notEqual(sliceCall, -1, "barrel must call runTranslateAndDedup");
  assert.notEqual(sendIdx, -1, "executeProviderRequest wrapper must remain");
  assert.ok(sliceCall < sendIdx, "translation must run before send");
  const between = src.slice(sliceCall, sendIdx);
  const bindAt = between.indexOf("persistAttemptLogsFor(");
  assert.notEqual(bindAt, -1, "rebind must call persistAttemptLogsFor after translation");
  const objStart = between.indexOf("{", bindAt);
  const objEnd = between.indexOf("});", objStart);
  assert.notEqual(objStart, -1, "rebind object must open");
  assert.notEqual(objEnd, -1, "rebind object must close");
  const bindObj = between.slice(objStart, objEnd);
  assert.equal(
    bindObj.includes("body: translatedBody"),
    true,
    "rebind must persist translatedBody, not the pre-translation body"
  );
  assert.equal(
    bindObj.includes("tokensCompressed"),
    true,
    "rebind object must include live tokensCompressed"
  );
});
