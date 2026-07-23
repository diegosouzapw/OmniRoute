import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { syncChangelogSection } from "../../../scripts/release/sync-changelog-i18n.mjs";

function repo() {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "cl-i18n-"));
  fs.writeFileSync(
    path.join(root, "CHANGELOG.md"),
    "# Changelog\n\n## [Unreleased]\n\n---\n\n## [9.9.9] — 2026-01-01\n\n- **feat:** big new thing\n- **fix:** another\n\n---\n\n## [9.9.8] — 2025-12-01\n\n- old\n"
  );
  for (const loc of ["fr", "de"]) {
    fs.mkdirSync(path.join(root, "docs/i18n", loc), { recursive: true });
    fs.writeFileSync(
      path.join(root, "docs/i18n", loc, "CHANGELOG.md"),
      "# Changelog\n\n---\n\n## [9.9.9] — TBD\n\n_stub_\n\n---\n\n## [9.9.8] — 2025-12-01\n\n- old\n"
    );
  }
  return root;
}

test("replaces the version section in every mirror with the root section", () => {
  const root = repo();
  const n = syncChangelogSection(root, "9.9.9", "9.9.8");
  assert.equal(n, 2);
  const fr = fs.readFileSync(path.join(root, "docs/i18n/fr/CHANGELOG.md"), "utf8");
  assert.match(fr, /big new thing/);
  assert.doesNotMatch(fr, /_stub_/);
  fs.rmSync(root, { recursive: true, force: true });
});

test("inserts the section when a mirror lacks it", () => {
  const root = repo();
  // remove the 9.9.9 section from the fr mirror entirely
  fs.writeFileSync(
    path.join(root, "docs/i18n/fr/CHANGELOG.md"),
    "# Changelog\n\n---\n\n## [9.9.8] — 2025-12-01\n\n- old\n"
  );
  const n = syncChangelogSection(root, "9.9.9", "9.9.8");
  assert.equal(n, 2);
  const fr = fs.readFileSync(path.join(root, "docs/i18n/fr/CHANGELOG.md"), "utf8");
  assert.match(fr, /## \[9\.9\.9\]/);
  assert.match(fr, /big new thing/);
  fs.rmSync(root, { recursive: true, force: true });
});
