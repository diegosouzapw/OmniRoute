// #4759 / #4745 — the /home dashboard crashed in production builds with
// "ReferenceError: useLiveRequests is not defined" because HomePageClient.tsx called the
// hook but never imported it (and the binding was unused). typecheck:core does not cover
// the Next dashboard .tsx files and ESLint's no-undef is off (TS owns that), so nothing
// but `next build` caught it.
//
// #4596 — that same top-level useLiveRequests() call opened the live-dashboard WebSocket
// unconditionally, even when Provider Topology was hidden. The live feed is owned by the
// settings-gated <HomeProviderTopologySection> (useLiveRequests({ enabled })), so
// HomePageClient must not open its own unconditional socket.
//
// Fix: remove the dead, unconditional useLiveRequests() call from HomePageClient. These
// static guards lock both regressions down.
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const src = readFileSync(
  fileURLToPath(
    new URL("../../src/app/(dashboard)/dashboard/HomePageClient.tsx", import.meta.url)
  ),
  "utf8"
);

function collect(re: RegExp, group = 1): Set<string> {
  return new Set([...src.matchAll(re)].map((m) => m[group]));
}

const called = collect(/\b(use[A-Z]\w*)\s*\(/g);
const importedNames = new Set(
  [...src.matchAll(/import\s+(?:type\s+)?\{([^}]*)\}/g)].flatMap((m) =>
    m[1].split(",").map((s) => s.trim().split(/\s+as\s+/).pop()!.trim())
  )
);
const declared = collect(/(?:function|const|let|var)\s+(use[A-Z]\w*)/g);

test("every hook called in HomePageClient.tsx is imported or declared (#4759/#4745)", () => {
  const missing = [...called].filter((h) => !importedNames.has(h) && !declared.has(h));
  assert.deepEqual(
    missing,
    [],
    `hooks used without import (ReferenceError in production build): ${missing.join(", ")}`
  );
});

test("HomePageClient does not open its own unconditional live socket (#4596)", () => {
  // The live feed belongs to the settings-gated <HomeProviderTopologySection>. A bare
  // useLiveRequests( call at the page level would open the WebSocket even when topology
  // is hidden — exactly the regression #4596 reports (and the dead binding behind #4759).
  assert.ok(
    !/\buseLiveRequests\s*\(/.test(src),
    "HomePageClient.tsx must not call useLiveRequests directly; delegate it to HomeProviderTopologySection"
  );
});
