/**
 * `usage/fetcherProviders.ts` says of itself that it exists "so the registration
 * list can't drift from the dispatcher's switch statement", and asks whoever adds
 * a case to remember to add it here too. Nothing enforced that, and it drifted:
 * #8006 added `adobe-firefly`/`firefly` to the switch and to
 * `USAGE_SUPPORTED_PROVIDERS` but not to this list, so three consumers
 * (`genericQuotaFetcher.ts`, `freeAccessQuota.ts`, the provider-plugin manifest)
 * were told those providers had no usage fetcher when in fact they do.
 *
 * This test is the enforcement the comment asked for.
 */
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

import { USAGE_FETCHER_PROVIDERS } from "../../open-sse/services/usage/fetcherProviders.ts";
import { USAGE_SUPPORTED_PROVIDERS } from "../../src/shared/constants/providers.ts";

const here = path.dirname(fileURLToPath(import.meta.url));

/**
 * The provider ids `getUsageForProvider` actually dispatches on. Read from the
 * source rather than by calling the function: importing the dispatcher pulls in
 * its whole fetcher graph (DB, sockets, child_process), which is precisely the
 * weight `fetcherProviders.ts` was extracted to avoid.
 */
function dispatchedProviderIds(): string[] {
  const source = fs.readFileSync(path.resolve(here, "../../open-sse/services/usage.ts"), "utf8");

  // Anchor on the dispatcher itself, not on the first occurrence of the word
  // "switch" -- that one is in a doc comment twenty lines above it. Then stop at
  // the closing brace of that switch, so a second switch added later in the file
  // cannot contribute cases to an invariant that is only about this one.
  const start = source.indexOf("switch (provider) {");
  assert.notEqual(start, -1, "could not find `switch (provider) {` in services/usage.ts");
  assert.equal(
    source.indexOf("switch (provider) {", start + 1),
    -1,
    "more than one `switch (provider)` — this reader would merge them"
  );

  let depth = 0;
  let end = start;
  for (let i = source.indexOf("{", start); i < source.length; i += 1) {
    if (source[i] === "{") depth += 1;
    else if (source[i] === "}") {
      depth -= 1;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }
  assert.ok(end > start, "unbalanced braces in the dispatcher switch");

  const body = source.slice(start, end);
  const ids = [...body.matchAll(/^\s*case ["']([^"']+)["']:/gm)].map((match) => match[1]);
  assert.ok(ids.length > 0, "parsed no cases out of the dispatcher — the reader is broken");
  return [...new Set(ids)];
}

test("every provider the dispatcher handles is declared as having a fetcher", () => {
  const undeclared = dispatchedProviderIds().filter(
    (id) => !(USAGE_FETCHER_PROVIDERS as readonly string[]).includes(id)
  );
  assert.deepEqual(
    undeclared,
    [],
    "these providers have a usage fetcher the dispatcher will happily call, but nothing " +
      "declares it — so genericQuotaFetcher, freeAccessQuota and the plugin manifest all " +
      "report them as having no usage support: " +
      undeclared.join(", ")
  );
});

test("nothing is declared that the dispatcher would not handle", () => {
  const dispatched = dispatchedProviderIds();
  const phantom = (USAGE_FETCHER_PROVIDERS as readonly string[]).filter(
    (id) => !dispatched.includes(id)
  );
  assert.deepEqual(
    phantom,
    [],
    `declared but unreachable, so a quota fetch would silently return nothing: ${phantom.join(", ")}`
  );
});

/**
 * The fetcher list and the "usage supported" connection list are not the same
 * set, and should not be forced to converge — but every difference needs a
 * reason on record, or the next drift hides among the ones we accepted.
 */
const ACCEPTED_DIVERGENCE: Record<string, string> = {
  // Aggregators: a usage fetcher exists, but a connection to them is not itself
  // presented as a usage-reporting account in the UI.
  opencode: "aggregator — fetcher exists, not surfaced as a usage-reporting connection",
  "opencode-zen": "aggregator — same as opencode",
  xai: "reached through xai-oauth for connection purposes",
  // Declared supported, no fetcher: a real gap, left alone here on purpose so
  // this PR stays about the two providers whose fetcher already exists.
  "xiaomi-mimo-token-plan": "declared supported with no fetcher — open question, not fixed here",
};

test("every difference between the two lists is one we have written down", () => {
  const fetcher = new Set<string>(USAGE_FETCHER_PROVIDERS as readonly string[]);
  const supported = new Set<string>(USAGE_SUPPORTED_PROVIDERS as readonly string[]);
  const unexplained = [
    ...[...fetcher].filter((id) => !supported.has(id)),
    ...[...supported].filter((id) => !fetcher.has(id)),
  ].filter((id) => !(id in ACCEPTED_DIVERGENCE));

  assert.deepEqual(
    unexplained,
    [],
    "the two lists differ here for no recorded reason — either wire it up, or add it to " +
      `ACCEPTED_DIVERGENCE with why: ${unexplained.join(", ")}`
  );
});

test("the recorded divergences are still real, so the list does not rot", () => {
  const fetcher = new Set<string>(USAGE_FETCHER_PROVIDERS as readonly string[]);
  const supported = new Set<string>(USAGE_SUPPORTED_PROVIDERS as readonly string[]);
  const stale = Object.keys(ACCEPTED_DIVERGENCE).filter(
    (id) => fetcher.has(id) === supported.has(id)
  );
  assert.deepEqual(
    stale,
    [],
    `these no longer differ; drop them from ACCEPTED_DIVERGENCE: ${stale.join(", ")}`
  );
});
