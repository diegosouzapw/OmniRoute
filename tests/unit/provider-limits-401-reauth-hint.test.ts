/**
 * (C) The quota page must make a genuine 401 actionable.
 *
 * After the on-demand path attempts a forced serialized re-mint (B), a 401 that
 * still reaches the client means the token is genuinely dead. The card must show
 * a re-authenticate hint and flag the connection as errored — not render a
 * silent empty card (which read as "force revalidate does nothing").
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const indexPath = path.join(
  repoRoot,
  "src/app/(dashboard)/dashboard/usage/components/ProviderLimits/index.tsx"
);
const source = fs.readFileSync(indexPath, "utf8");

test("ProviderLimits surfaces a re-authenticate hint and error state on 401", () => {
  const start = source.indexOf("if (response.status === 401)");
  const block = source.slice(start, source.indexOf("throw new Error(`HTTP", start));
  assert.ok(block.length > 0, "expected to find the 401 handling block");
  assert.match(block, /re-?authenticate this account/i, "401 must add a re-authenticate hint");
  assert.match(block, /setErrors\(/, "401 must flag the connection as errored, not just a message");
});
