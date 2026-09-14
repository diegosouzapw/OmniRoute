import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const barrelPath = path.resolve(here, "../../../open-sse/handlers/chatCore.ts");
const leafPath = path.resolve(here, "../../../open-sse/handlers/chatCore/requestPrelude.ts");
const pipelinePath = path.resolve(
  here,
  "../../../open-sse/handlers/chatCore/providerExecutionPipeline.ts"
);

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
  assert.match(src, /clientRequestedResponsesStream = true/);
  const stamp = src.indexOf("clientRequestedResponsesStream = true");
  const force = src.indexOf(".stream = false");
  assert.ok(stamp >= 0 && force > stamp, "stamp must precede stream=false");
  assert.match(src, /clientRequestedResponsesStream,/);
});

test("barrel takes clientRequestedResponsesStream from prelude continue", () => {
  const src = fs.readFileSync(barrelPath, "utf8");
  assert.match(src, /clientRequestedResponsesStream,/);
  assert.equal(src.includes("let clientRequestedResponsesStream"), false);
  assert.equal(src.includes("const recordKeyHealthStatus"), false);
});

test("pipeline retry-same follows refresh-credentials with two closers", () => {
  const src = fs.readFileSync(pipelinePath, "utf8");
  const refresh = src.indexOf('decision.dispatch.action === "refresh-credentials"');
  const retry = src.indexOf('decision.dispatch.action === "retry-same"');
  assert.ok(refresh >= 0 && retry > refresh);
  const between = src.slice(refresh, retry);
  const afterContinue = between.slice(between.lastIndexOf("continue;"));
  const closers = [...afterContinue.matchAll(/}/g)].length;
  assert.equal(closers, 2, "inner-if closer plus else-if closer; extra rebase brace is 3");
});
