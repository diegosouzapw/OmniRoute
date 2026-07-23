import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// The dev server runs Next's bundler in-process via `node scripts/dev/run-next.mjs`.
// `--max-old-space-size` can only be set at process startup (not from inside the
// running process), so the heap ceiling has to live on the `node` invocation in
// the `dev` npm script. Without it, the dev bundler runs on V8's ~4GB default and
// OOMs while compiling heavy dashboard routes (e.g. /dashboard/providers, which
// pulls monaco / recharts / @lobehub/icons / xyflow / mermaid). The unit test
// suite already runs with 8192; the dev server must match.
const here = path.dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(fs.readFileSync(path.resolve(here, "../../package.json"), "utf8"));

test("dev script raises the Node heap limit (matches the test suite's 8192)", () => {
  const dev = pkg.scripts?.dev ?? "";
  assert.match(
    dev,
    /node\s+--max-old-space-size=8192\b/,
    `dev script must launch node with --max-old-space-size=8192; got: ${dev}`
  );
  // Guard ordering: the flag must precede the script path so node (not the script)
  // receives it.
  const flagIdx = dev.indexOf("--max-old-space-size");
  const scriptIdx = dev.indexOf("run-next.mjs");
  assert.ok(scriptIdx !== -1, "dev script must still launch run-next.mjs");
  assert.ok(
    flagIdx !== -1 && flagIdx < scriptIdx,
    "the heap flag must come before run-next.mjs so node receives it"
  );
});
