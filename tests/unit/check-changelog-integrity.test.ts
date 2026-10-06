// Guards the anti CHANGELOG-eat gate (scripts/check/check-changelog-integrity.mjs):
// a merge auto-resolve that drops sibling bullets must be detected by comparing
// the merge result against the base branch's CHANGELOG (incident 2026-07-05,
// PR #6193: 212 lines / 130 bullets eaten).
import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const { extractBullets, findLostBullets } =
  await import("../../scripts/check/check-changelog-integrity.mjs");

const SCRIPT_PATH = fileURLToPath(
  new URL("../../scripts/check/check-changelog-integrity.mjs", import.meta.url)
);
const LEDGER_PATH = "config/release/changelog-reconciliations.json";

const BASE = `# Changelog

## [Unreleased]

### Bug Fixes

- **fix(a):** first bullet ([#1](https://x/1))
- **fix(b):** second bullet ([#2](https://x/2))

## [3.8.44] — TBD

- **feat(c):** shipped bullet ([#3](https://x/3))
`;

test("extractBullets collects trimmed bullet lines only", () => {
  const b = extractBullets(BASE);
  assert.equal(b.size, 3);
  assert.ok(b.has("- **fix(a):** first bullet ([#1](https://x/1))"));
});

test("no loss when head is a superset (normal additive merge)", () => {
  const head = BASE + "- **fix(d):** new bullet ([#4](https://x/4))\n";
  assert.deepEqual(findLostBullets(BASE, head), []);
});

test("detects an eaten sibling bullet", () => {
  const head = BASE.replace("- **fix(b):** second bullet ([#2](https://x/2))\n", "");
  const lost = findLostBullets(BASE, head);
  assert.deepEqual(lost, ["- **fix(b):** second bullet ([#2](https://x/2))"]);
});

test("detects a whole eaten version section (#6193 pattern)", () => {
  const head = BASE.split("## [3.8.44]")[0];
  const lost = findLostBullets(BASE, head);
  assert.deepEqual(lost, ["- **feat(c):** shipped bullet ([#3](https://x/3))"]);
});

test("detects one lost occurrence when an identical bullet still exists elsewhere", () => {
  const duplicate = "- **fix(repeated):** same rendered bullet ([#9](https://x/9))";
  const base = `${BASE}${duplicate}\n${duplicate}\n`;
  const head = `${BASE}${duplicate}\n`;

  assert.deepEqual(findLostBullets(base, head), [duplicate]);
});

test("bullets moved between sections are NOT reported (line content preserved)", () => {
  const head = BASE.replace("- **fix(a):** first bullet ([#1](https://x/1))\n", "").replace(
    "- **feat(c):** shipped bullet ([#3](https://x/3))",
    "- **feat(c):** shipped bullet ([#3](https://x/3))\n- **fix(a):** first bullet ([#1](https://x/1))"
  );
  assert.deepEqual(findLostBullets(BASE, head), []);
});

function makeCliRepo(baseText = BASE) {
  const root = mkdtempSync(join(tmpdir(), "changelog-integrity-cli-"));
  const script = join(root, "scripts/check/check-changelog-integrity.mjs");
  mkdirSync(dirname(script), { recursive: true });
  mkdirSync(join(root, "changelog.d/features"), { recursive: true });
  mkdirSync(join(root, "changelog.d/fixes"), { recursive: true });
  mkdirSync(join(root, "changelog.d/maintenance"), { recursive: true });
  mkdirSync(join(root, "config/release"), { recursive: true });
  writeFileSync(script, readFileSync(SCRIPT_PATH, "utf8"));
  writeFileSync(join(root, "CHANGELOG.md"), baseText);
  writeLedger(root, []);
  execFileSync("git", ["init", "--quiet"], { cwd: root });
  execFileSync("git", ["add", "."], { cwd: root });
  execFileSync(
    "git",
    [
      "-c",
      "user.name=Changelog Integrity Test",
      "-c",
      "user.email=changelog-integrity@example.invalid",
      "commit",
      "--quiet",
      "-m",
      "base",
    ],
    { cwd: root }
  );
  const baseRef = execFileSync("git", ["rev-parse", "HEAD"], {
    cwd: root,
    encoding: "utf8",
  }).trim();
  return { root, baseRef };
}

function sha256(text) {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

function writeLedger(root, reconciliations) {
  writeFileSync(
    join(root, LEDGER_PATH),
    `${JSON.stringify({ schemaVersion: 1, reconciliations }, null, 2)}\n`
  );
}

function runCli(root, baseRef, extraEnv = {}) {
  return spawnSync(process.execPath, ["scripts/check/check-changelog-integrity.mjs"], {
    cwd: root,
    encoding: "utf8",
    env: { ...process.env, CHANGELOG_BASE_REF: baseRef, ...extraEnv },
  });
}

test("CLI rejects an unledgered loss", () => {
  const { root, baseRef } = makeCliRepo();
  try {
    writeFileSync(
      join(root, "CHANGELOG.md"),
      BASE.replace("- **fix(b):** second bullet ([#2](https://x/2))\n", "")
    );

    const result = runCli(root, baseRef);

    assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);
    assert.match(result.stderr, /1 bullet\(s\).*MISSING/s);
    assert.doesNotMatch(result.stderr, /reporting only, not failing/);
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("CLI fails closed when the removed legacy bypass is still configured", () => {
  const { root, baseRef } = makeCliRepo();
  try {
    const result = runCli(root, baseRef, { ALLOW_CHANGELOG_REMOVALS: "1" });

    assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);
    assert.match(result.stderr, /ALLOW_CHANGELOG_REMOVALS.*removed/);
    assert.match(result.stderr, /changelog-reconciliations\.json/);
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("CLI accepts only an exact, reviewable ledgered reconciliation", () => {
  const { root, baseRef } = makeCliRepo();
  try {
    const removed = "- **fix(b):** second bullet ([#2](https://x/2))";
    const added = "- **fix(b):** clarified replacement bullet ([#2](https://x/2))";
    const resultText = BASE.replace(removed, added);
    writeFileSync(join(root, "CHANGELOG.md"), resultText);
    writeLedger(root, [
      {
        id: "clarify-fix-b",
        reason: "Clarify the wording while preserving the original fix and pull request reference.",
        baseChangelogSha256: sha256(BASE),
        resultChangelogSha256: sha256(resultText),
        removedBullets: [removed],
        addedBullets: [added],
      },
    ]);

    const result = runCli(root, baseRef);

    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
    assert.match(result.stdout, /OK.*ledgered reconciliation "clarify-fix-b"/s);
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("CLI keeps an additional loss RED after an approved result is tampered with", () => {
  const { root, baseRef } = makeCliRepo();
  try {
    const removed = "- **fix(b):** second bullet ([#2](https://x/2))";
    const added = "- **fix(b):** clarified replacement bullet ([#2](https://x/2))";
    const approvedResult = BASE.replace(removed, added);
    writeLedger(root, [
      {
        id: "clarify-fix-b",
        reason: "Clarify the wording while preserving the original fix and pull request reference.",
        baseChangelogSha256: sha256(BASE),
        resultChangelogSha256: sha256(approvedResult),
        removedBullets: [removed],
        addedBullets: [added],
      },
    ]);
    const tamperedResult = approvedResult.replace(
      "- **fix(a):** first bullet ([#1](https://x/1))\n",
      ""
    );
    writeFileSync(join(root, "CHANGELOG.md"), tamperedResult);

    const result = runCli(root, baseRef);

    assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);
    assert.match(result.stderr, /2 bullet\(s\).*MISSING/s);
    assert.doesNotMatch(result.stdout, /ledgered reconciliation/);
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("CLI rejects exact file hashes when the ledger omits one removed occurrence", () => {
  const { root, baseRef } = makeCliRepo();
  try {
    const removedA = "- **fix(a):** first bullet ([#1](https://x/1))";
    const removedB = "- **fix(b):** second bullet ([#2](https://x/2))";
    const added = "- **fix(ab):** consolidated replacement ([#2](https://x/2))";
    const resultText = BASE.replace(`${removedA}\n${removedB}`, added);
    writeFileSync(join(root, "CHANGELOG.md"), resultText);
    writeLedger(root, [
      {
        id: "incomplete-removed-multiset",
        reason: "Deliberately incomplete fixture that must not authorize the full transition.",
        baseChangelogSha256: sha256(BASE),
        resultChangelogSha256: sha256(resultText),
        removedBullets: [removedB],
        addedBullets: [added],
      },
    ]);

    const result = runCli(root, baseRef);

    assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);
    assert.match(result.stderr, /2 bullet\(s\).*MISSING/s);
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("CLI rejects exact file hashes when the ledger omits one removed duplicate", () => {
  const duplicate = "- **fix(repeated):** same rendered bullet ([#9](https://x/9))";
  const baseText = `${BASE}${duplicate}\n${duplicate}\n`;
  const { root, baseRef } = makeCliRepo(baseText);
  try {
    const added = "- **fix(repeated):** consolidated duplicate ([#9](https://x/9))";
    const resultText = `${BASE}${added}\n`;
    writeFileSync(join(root, "CHANGELOG.md"), resultText);
    writeLedger(root, [
      {
        id: "incomplete-duplicate-multiset",
        reason: "Deliberately omit one identical occurrence from the declared transition.",
        baseChangelogSha256: sha256(baseText),
        resultChangelogSha256: sha256(resultText),
        removedBullets: [duplicate],
        addedBullets: [added],
      },
    ]);

    const result = runCli(root, baseRef);

    assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);
    assert.match(result.stderr, /2 bullet\(s\).*MISSING/s);
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("CLI rejects exact bullet deltas when the ledger base hash is wrong", () => {
  const { root, baseRef } = makeCliRepo();
  try {
    const removed = "- **fix(b):** second bullet ([#2](https://x/2))";
    const added = "- **fix(b):** clarified replacement bullet ([#2](https://x/2))";
    const resultText = BASE.replace(removed, added);
    writeFileSync(join(root, "CHANGELOG.md"), resultText);
    writeLedger(root, [
      {
        id: "wrong-base-hash",
        reason: "Deliberately stale base digest that must not authorize this transition.",
        baseChangelogSha256: "0".repeat(64),
        resultChangelogSha256: sha256(resultText),
        removedBullets: [removed],
        addedBullets: [added],
      },
    ]);

    const result = runCli(root, baseRef);

    assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);
    assert.match(result.stderr, /1 bullet\(s\).*MISSING/s);
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("CLI validates a new fragment without treating it as a reconciliation", () => {
  const { root, baseRef } = makeCliRepo();
  try {
    writeFileSync(
      join(root, "changelog.d/fixes/11326-new-valid-fragment.md"),
      "- **fix(kie):** preserve a newly added valid fragment ([#11326](https://x/11326)).\n"
    );

    const result = runCli(root, baseRef);

    assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
    assert.match(result.stdout, /OK — no base bullets lost/);
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("CLI fails closed on a malformed reconciliation ledger", () => {
  const { root, baseRef } = makeCliRepo();
  try {
    writeFileSync(join(root, LEDGER_PATH), '{"schemaVersion":1,"reconciliations":"all"}\n');

    const result = runCli(root, baseRef);

    assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);
    assert.match(result.stderr, /invalid reconciliation ledger/);
    assert.match(result.stderr, /reconciliations must be an array/);
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});

test("CLI fails closed when an explicit base ref is unreadable", () => {
  const { root } = makeCliRepo();
  try {
    const result = runCli(root, "missing-explicit-base");

    assert.equal(result.status, 1, `${result.stdout}\n${result.stderr}`);
    assert.match(result.stderr, /FAIL.*CHANGELOG\.md.*missing-explicit-base/s);
  } finally {
    rmSync(root, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
});
