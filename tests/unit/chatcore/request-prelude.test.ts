import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const barrelPath = path.resolve(here, "../../../open-sse/handlers/chatCore.ts");
const leafPath = path.resolve(here, "../../../open-sse/handlers/chatCore/requestPrelude.ts");

test("requestPrelude leaf exists", () => {
  assert.equal(fs.existsSync(leafPath), true);
});

test("barrel no longer inlines handleBypassRequest", () => {
  const src = fs.readFileSync(barrelPath, "utf8");
  assert.equal(
    src.includes("handleBypassRequest(body, model, userAgent)"),
    false,
    "front-door bypass must leave barrel"
  );
});

test("prelude stamps clientRequestedResponsesStream before forcing stream false", () => {
  const src = fs.readFileSync(leafPath, "utf8");
  assert.match(src, /let clientRequestedResponsesStream = false/);
  const stamp = src.search(/^\s*clientRequestedResponsesStream = true;/m);
  const force = src.indexOf(".stream = false", stamp + 1);
  assert.ok(stamp >= 0 && force > stamp, "stamp must precede stream=false");
  assert.match(src, /clientRequestedResponsesStream,/);
});

test("barrel takes clientRequestedResponsesStream from prelude continue", () => {
  const src = fs.readFileSync(barrelPath, "utf8");
  assert.match(src, /clientRequestedResponsesStream,/);
  assert.equal(src.includes("let clientRequestedResponsesStream"), false);
});

test("prelude continue carries tip-only trustedEffortContext", () => {
  const src = fs.readFileSync(leafPath, "utf8");
  assert.match(src, /trustedEffortContext,/);
  assert.match(src, /getManagedLeaseFenceErrorCode,/);
  assert.match(src, /reasoningRuleDirective,/);
});

test("barrel rebinds persistAttemptLogs after translation", () => {
  const src = fs.readFileSync(barrelPath, "utf8");
  const rebind = src.indexOf("body: translatedBody");
  const send = src.indexOf("const executeProviderRequest =");
  assert.ok(rebind >= 0 && send > rebind, "persist rebind must precede send");
  assert.match(src, /persistAttemptLogsPrelude/);
});

test("persistFailureUsage is declared after endpointPath", () => {
  const src = fs.readFileSync(leafPath, "utf8");
  const endpoint = src.search(/^\s*endpointPath,/m);
  const helper = src.indexOf("const persistFailureUsage =");
  assert.ok(endpoint >= 0 && helper > endpoint, "persistFailureUsage must follow endpointPath");
});

test("persistAttemptLogs is declared after reqLogger", () => {
  const src = fs.readFileSync(leafPath, "utf8");
  const logger = src.indexOf("const reqLogger =");
  const helper = src.indexOf("const persistAttemptLogs =");
  assert.ok(logger >= 0 && helper > logger, "persistAttemptLogs must follow reqLogger");
});
