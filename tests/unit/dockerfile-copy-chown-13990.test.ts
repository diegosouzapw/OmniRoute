/**
 * #13990 — the published image stored the app twice. The `runner-base` stage
 * COPY'd the standalone build as root and then ran `RUN chown -R node:node /app`.
 * On an overlay filesystem a chown rewrites every touched file into the new
 * layer, so the ~2 GB standalone tree landed in two layers with identical
 * content (the registry manifest showed two ~565 MB compressed layers back to
 * back).
 *
 * Fix: every COPY into /app in `runner-base` carries `--chown=node:node`, so the
 * files are written with the right owner in their own layer, and the recursive
 * chown is gone. `/app` itself (created root-owned by `WORKDIR /app` in the
 * `base` stage) and `/app/data` still get a non-recursive chown so the runtime
 * user can write there when no volume is mounted.
 *
 * The real proof is the image size (see the PR's `docker history` output); this
 * guards the mechanism so the duplicate layer does not creep back in.
 */
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const dockerfile = fs.readFileSync(path.join(repoRoot, "Dockerfile"), "utf-8");
const lines = dockerfile.split("\n");

/** Non-comment instruction lines of the `runner-base` stage (FROM to next FROM). */
function runnerBaseStage(): string[] {
  const start = lines.findIndex((l) => /^FROM\s+\S+\s+AS\s+runner-base\b/i.test(l.trim()));
  assert.ok(start >= 0, "Dockerfile must declare a `runner-base` stage");
  const after = lines.slice(start + 1).findIndex((l) => /^FROM\s+/i.test(l.trim()));
  const end = after === -1 ? lines.length : start + 1 + after;
  return lines.slice(start, end).filter((l) => !l.trim().startsWith("#"));
}

test("#13990 runner-base copies the app with --chown=node:node instead of a second chown layer", () => {
  const stage = runnerBaseStage();

  const copiesFromBuilder = stage.filter((l) => /^COPY\b.*--from=builder\b/.test(l));
  assert.ok(
    copiesFromBuilder.length >= 3,
    "runner-base must COPY the standalone build, better-sqlite3 and healthcheck.mjs from the builder"
  );
  for (const line of copiesFromBuilder) {
    assert.match(line, /--chown=node:node\b/, `COPY must set node ownership at copy time: ${line}`);
  }

  assert.ok(
    !stage.some((l) => /^RUN\b.*chown\s+-R\b/.test(l)),
    "runner-base must not run a recursive chown: it rewrites the whole standalone tree into a duplicate layer"
  );
});

test("#13990 runner-base still hands /app and /app/data to the node user", () => {
  const stage = runnerBaseStage();
  assert.ok(
    stage.some((l) =>
      /^RUN\b.*mkdir -p \/app\/data\s*&&\s*chown node:node \/app \/app\/data\b/.test(l)
    ),
    "runner-base must create /app/data and chown /app and /app/data (non-recursively) to node"
  );
});
