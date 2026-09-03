import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";

const REPO_ROOT = join(import.meta.dirname, "..", "..", "..");

/**
 * Regression guards for the CodeQL alerts triaged on 2026-08-12.
 *
 * Both are source-level invariants rather than behavioral round-trips: the functions they
 * protect are module-private (`decodeXmlText`) or only reachable through a live upstream
 * handshake (`tinycms` nonce), so the guard asserts the property on the source itself.
 */

test("decodeXmlText decodes &amp; last so encoded entities do not double-unescape", () => {
  const source = readFileSync(
    join(REPO_ROOT, "open-sse/vendor/codex-chatgpt-web/adapters/chatgpt-web/environment.ts"),
    "utf8"
  );
  const body = /function decodeXmlText\(value: string\): string \{([\s\S]*?)\n\}/.exec(source)?.[1];
  assert.ok(body, "decodeXmlText not found — update this guard if the helper was renamed");

  const order = [...body.matchAll(/replaceAll\("(&[^"]+;)"/g)].map((match) => match[1]);
  assert.ok(order.length >= 2, `expected several entity replacements, got ${order.length}`);
  assert.equal(
    order.at(-1),
    "&amp;",
    `"&amp;" must be the LAST entity decoded, otherwise "&amp;quot;" decodes to '"' instead ` +
      `of the literal "&quot;". Current order: ${order.join(" -> ")}`
  );

  // Mirror the implementation to document the property the ordering buys us.
  const decode = (value: string) =>
    order.reduce((acc, entity) => {
      const plain = { "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'", "&amp;": "&" }[entity];
      return plain === undefined ? acc : acc.replaceAll(entity, plain);
    }, value);
  assert.equal(decode("&amp;quot;"), "&quot;");
  assert.equal(decode("&amp;#39;"), "&#39;");
  assert.equal(decode("&amp;lt;"), "&lt;");
});

test("tinycms signs its anti-replay nonce with a CSPRNG, never Math.random", () => {
  const source = readFileSync(join(REPO_ROOT, "open-sse/executors/tinycms.ts"), "utf8");

  assert.match(
    source,
    /const nonceJs = randomUUID\(\)/,
    "the tinycms nonce must come from node:crypto randomUUID"
  );
  assert.doesNotMatch(
    source,
    /Math\.random\(\)/,
    "Math.random() is not a CSPRNG — the nonce is signed into the anti-replay payload"
  );
});
