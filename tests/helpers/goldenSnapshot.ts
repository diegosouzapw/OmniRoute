import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const DEFAULT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../snapshots");

/** Stable JSON serialization: object keys sorted recursively. */
function stable(v: unknown): string {
  return JSON.stringify(
    v,
    (_k, val) =>
      val && typeof val === "object" && !Array.isArray(val)
        ? Object.fromEntries(
            Object.keys(val as Record<string, unknown>)
              .sort()
              .map((k) => [k, (val as Record<string, unknown>)[k]])
          )
        : val,
    2
  );
}

class GoldenMismatchError extends Error {
  constructor(name: string, expected: string, actual: string) {
    super(
      `golden mismatch for "${name}". Run with UPDATE_GOLDEN=1 to regenerate.\n--- expected\n${expected}\n--- actual\n${actual}`
    );
    this.name = "GoldenMismatchError";
  }
}

/**
 * Compare `value` with a stable JSON snapshot at `tests/snapshots/<name>.json`.
 * - First run (file missing): writes the file and passes.
 * - UPDATE_GOLDEN=1: rewrites the file and passes.
 * - Mismatch: throws GoldenMismatchError with a diff-friendly message.
 *
 * @param name - Slash-separated path under tests/snapshots/ (e.g. "translation/openai-to-claude/basic-chat")
 * @param value - The value to serialize and compare.
 * @param dir - Optional override for snapshot root directory (used in tests to isolate to tmpdir).
 */
export function goldenSnapshot(name: string, value: unknown, dir = DEFAULT_DIR): void {
  const file = path.join(dir, `${name}.json`);
  const serialized = stable(value);

  if (process.env.UPDATE_GOLDEN === "1" || !fs.existsSync(file)) {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, serialized + "\n");
    return;
  }

  const expected = fs.readFileSync(file, "utf8").trimEnd();
  if (serialized !== expected) {
    throw new GoldenMismatchError(name, expected, serialized);
  }
}
