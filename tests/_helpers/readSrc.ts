// Shared reader for tests that assert against project source read as text.
//
// Why this throws instead of returning "" on a missing/empty file:
// static source scanners frequently carry NEGATIVE guards, e.g.
//   assert.equal(src.includes(">Active Endpoints<"), false)
// A negative guard passes trivially against an empty string. So if the source is
// moved, renamed, or split into a new component file, a silently-empty read keeps
// the assertion green while it guards nothing at all — the regression coverage is
// deleted without a single test turning red. Failing loudly at read time makes
// that class of silent coverage loss impossible.
//
// The companion hard gate is tests/unit/source-scanner-guards.test.ts, which
// requires every source-bound variable to carry at least one positive anchor.
import { readFileSync } from "node:fs";
import { dirname, isAbsolute, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Repo root, derived from this file's location (tests/_helpers/) — never from cwd, so
 * the reader behaves identically however the test runner was invoked.
 */
const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");

/**
 * Read a project source file as UTF-8 text, relative to the repository root.
 *
 * @param relPath Repo-relative path, e.g. "open-sse/executors/claude-web.ts".
 * @throws If the file does not exist or its content is empty/whitespace-only.
 */
export function readSrc(relPath: string): string {
  const absPath = isAbsolute(relPath) ? relPath : join(REPO_ROOT, relPath);

  let content: string;
  try {
    content = readFileSync(absPath, "utf8");
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    throw new Error(
      `readSrc("${relPath}"): cannot read source file at ${absPath}. ` +
        `The file was probably moved, renamed, or split — update the test to point at ` +
        `its new location instead of letting the assertions guard nothing. (${reason})`
    );
  }

  if (!content.trim()) {
    throw new Error(
      `readSrc("${relPath}"): source file at ${absPath} is empty or whitespace-only. ` +
        `Negative guards (assert.doesNotMatch / .includes(...) === false) pass trivially ` +
        `against empty content, so an empty read would silently disable this test.`
    );
  }

  return content;
}

/** The repository root this helper resolves against. Exposed for tests that need it. */
export { REPO_ROOT };
