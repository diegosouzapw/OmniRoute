import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

/**
 * Regression test for issue #13679 (PR D, item #4) — `contrib/podman/omniroute.container`
 * used to ship copy-pasteable placeholder secrets:
 *   JWT_SECRET=change-me-to-a-random-base64-string
 *   API_KEY_SECRET=change-me-to-a-random-base64-string
 *   INITIAL_PASSWORD=change-me-to-a-random-hex-string
 *
 * An operator who forgot to replace them ran production with a public, guessable
 * JWT/API-key secret and dashboard password (anyone can find these literals on GitHub).
 * The fix removes the literal `Environment=` lines for these three variables and
 * documents generating real values via `contrib/podman/README.md` before first start.
 */

const MANIFEST_PATH = path.join(
  import.meta.dirname,
  "..",
  "..",
  "contrib",
  "podman",
  "omniroute.container"
);
const README_PATH = path.join(import.meta.dirname, "..", "..", "contrib", "podman", "README.md");

test("omniroute.container no longer ships a literal placeholder secret value", () => {
  const content = fs.readFileSync(MANIFEST_PATH, "utf8");

  assert.ok(
    !/change-me-to-a-random/i.test(content),
    "the Quadlet unit must not ship a copy-pasteable placeholder secret literal"
  );

  for (const varName of ["JWT_SECRET", "API_KEY_SECRET", "INITIAL_PASSWORD"]) {
    const literalAssignment = new RegExp(`^Environment=${varName}=\\S+`, "m");
    assert.ok(
      !literalAssignment.test(content),
      `${varName} must not be assigned a literal value directly in the checked-in unit file`
    );
  }
});

test("podman README documents generating secrets before first start", () => {
  const readme = fs.readFileSync(README_PATH, "utf8");
  assert.match(
    readme,
    /Generate secrets before first start/i,
    "README must document the generate-secrets step referenced by the unit file's comments"
  );
  assert.match(readme, /openssl rand/, "README must give a concrete generation command");
});
