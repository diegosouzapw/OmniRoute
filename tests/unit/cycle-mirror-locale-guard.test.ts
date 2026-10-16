import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { assertMirrorRepairRejectsUnsafeLocale } from "../_helpers/mirrorRepairLocaleGuard.ts";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

test("cycle mirror repair rejects a locale traversal before opening any target", async () => {
  const previous =
    "| `check:cycles` | Bare = advisory. `check:cycles:ratchet` remains blocking. | yes |\n";
  const current = previous.replace(
    "Bare = advisory.",
    "Bare exits 1 whenever any cycle exists (fail-closed since #15281)."
  );
  await assertMirrorRepairRejectsUnsafeLocale({
    script: path.join(root, "scripts/ad-hoc/relay-cycle-mirrors-15682.mjs"),
    relativeSource: "docs/architecture/QUALITY_GATES.md",
    previous,
    current,
  });
});
