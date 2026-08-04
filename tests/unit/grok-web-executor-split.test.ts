import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Split-guard for the grok-web executor extraction.
// Pure clusters live in 4 leaves: types.ts (stream types), tool-bridge.ts (OpenAI<->Grok
// tool translation), native-tools.ts (native-tool selection + mapping), text-cleanup.ts
// (markup cleanup). All are module-private (no host re-export). No leaf imports the host.
const HERE = dirname(fileURLToPath(import.meta.url));
const DIR = join(HERE, "../../open-sse/executors/grok-web");
const HOST = join(HERE, "../../open-sse/executors/grok-web.ts");

test("leaves are acyclic: none imports the host, layered types<-tool-bridge<-native-tools", () => {
  for (const f of ["types", "tool-bridge", "native-tools", "text-cleanup"]) {
    const src = readFileSync(join(DIR, `${f}.ts`), "utf8");
    assert.doesNotMatch(src, /from "\.\.\/grok-web\.ts"/, `${f} must not import the host`);
  }
  assert.doesNotMatch(readFileSync(join(DIR, "types.ts"), "utf8"), /^import /m);
  assert.match(readFileSync(join(DIR, "native-tools.ts"), "utf8"), /from "\.\/tool-bridge\.ts"/);
});

test("host imports the tool-bridge + native-tools + text-cleanup helpers", () => {
  const host = readFileSync(HOST, "utf8");
  assert.match(host, /from "\.\/grok-web\/tool-bridge\.ts"/);
  assert.match(host, /from "\.\/grok-web\/native-tools\.ts"/);
  assert.match(host, /from "\.\/grok-web\/text-cleanup\.ts"/);
});

test("text-cleanup strips Grok markup", async () => {
  const { cleanGrokContentText } =
    await import("../../open-sse/executors/grok-web/text-cleanup.ts");
  assert.equal(typeof cleanGrokContentText, "function");
  assert.equal(typeof cleanGrokContentText("plain text"), "string");
});
