import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();

function read(rel: string): string {
  return fs.readFileSync(path.join(root, rel), "utf8");
}

test("quota batch registration is not a module-load side effect", () => {
  const batch = read("open-sse/services/quotaTrackersBatch.ts");
  const fn = batch.indexOf("export function registerQuotaTrackersBatch");
  assert.ok(fn >= 0, "registerQuotaTrackersBatch must stay exported");
  const tail = batch.slice(batch.lastIndexOf("}"));
  assert.doesNotMatch(
    tail,
    /registerQuotaTrackersBatch\s*\(/,
    "a top-level call races webpack's async registerQuotaFetcher binding"
  );
  assert.doesNotMatch(batch, /^registerQuotaTrackersBatch\s*\(/m);
});

test("chat route calls the batch registrar after imports, before generic", () => {
  const chat = read("src/sse/handlers/chat.ts");
  assert.match(
    chat,
    /import\s*\{\s*registerQuotaTrackersBatch\s*\}\s*from\s*"@omniroute\/open-sse\/services\/quotaTrackersBatch\.ts"/
  );
  assert.doesNotMatch(chat, /import\s*"@omniroute\/open-sse\/services\/quotaTrackersBatch\.ts"/);
  const body = chat.slice(chat.lastIndexOf('from "../services/leaseContext"'));
  const call = body.indexOf("registerQuotaTrackersBatch()");
  const generic = body.indexOf("registerGenericQuotaFetchers()");
  assert.ok(call > 0, "chat.ts module body must call registerQuotaTrackersBatch()");
  assert.ok(generic > call, "batch registrars must run before the generic registrar");
});

test("node instrumentation calls the batch registrar after the dynamic import resolves", () => {
  const source = read("src/instrumentation-node.ts");
  // contract changed by #13330: Prettier reflowed the dynamic import onto one line, so match
  // the awaited import independent of whitespace instead of a hard-coded line break.
  const importMatch =
    /await\s+import\(\s*"@omniroute\/open-sse\/services\/quotaTrackersBatch\.ts"/.exec(source);
  const imported = importMatch ? importMatch.index : -1;
  const called = source.indexOf("registerQuotaTrackersBatch()");
  assert.ok(imported >= 0, "instrumentation must await the batch module");
  assert.ok(called > imported, "the call must follow the resolved import");
});
