/**
 * #14313: the shipped OpenCode Free catalog copy must disclose that the public
 * free tier only answers requests that match the OpenCode client contract —
 * otherwise the dashboard promises keyless access that upstream will refuse.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const { NOAUTH_PROVIDERS } = await import("../../src/shared/constants/providers/noauth.ts");

test("opencode freeNote / authHint / notice mention the OpenCode-only free-tier gate", () => {
  const opencode = NOAUTH_PROVIDERS.opencode as {
    authHint: string;
    freeNote: string;
    notice: { text: string };
  };
  const haystack =
    `${opencode.authHint}\n${opencode.freeNote}\n${opencode.notice.text}`.toLowerCase();
  assert.match(
    haystack,
    /free tier can only be used from within opencode|only.*within opencode|opencode client/,
    "copy must state that the free tier only works from within OpenCode"
  );
  assert.match(haystack, /rate limit|rate-limit/, "copy must keep the rate-limit caveat");
});

test("FREE_TIERS.md documents the OpenCode free-tier client-contract restriction", () => {
  const doc = fs.readFileSync(path.join(root, "docs/reference/FREE_TIERS.md"), "utf8");
  assert.match(
    doc,
    /free tier can only be used from within OpenCode|only.*within OpenCode|OpenCode client contract/i,
    "FREE_TIERS.md must document #14313's refusal so operators are not surprised"
  );
});
