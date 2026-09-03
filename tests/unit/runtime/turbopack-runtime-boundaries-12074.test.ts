import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { pathToFileURL } from "node:url";

const repoRoot = process.cwd();

test("#12074: Turbopack keeps the WASM-backed tiktoken package external", async () => {
  const configUrl = `${pathToFileURL(path.join(repoRoot, "next.config.mjs")).href}?phase5=${Date.now()}`;
  const { default: nextConfig } = await import(configUrl);

  assert.ok(
    new Set(nextConfig.serverExternalPackages).has("tiktoken"),
    "bundling tiktoken selects its ESM WASM entry and makes /api/providers fail with Missing tiktoken_bg.wasm"
  );
  assert.ok(
    nextConfig.outputFileTracingIncludes?.["/*"]?.includes(
      "./node_modules/tiktoken/tiktoken_bg.wasm"
    ),
    "the external tokenizer must retain its runtime WASM asset in standalone output"
  );
});

test("#12074: the ESM SQLite loader stays outside Turbopack's module resolver", () => {
  const source = fs.readFileSync(
    path.join(repoRoot, "src/lib/db/adapters/runtimeRequire.ts"),
    "utf8"
  );

  assert.doesNotMatch(source, /createRequire\(import\.meta\.url\)/);
  assert.match(source, /createRequire\(process\.argv\[1\] \|\| process\.cwd\(\)\)/);
  assert.match(source, /Reflect\.apply\(/);
});
