// Guards the commit-identity gate (scripts/check/check-git-identity.sh): a stale
// identity override left behind by an automated session must not be able to sign
// commits with the maintainer's e-mail under someone else's name.
//
// Two real incidents motivate this (see .mailmap at the repo root):
//   1. 2026-08-13..26 — name "Xiangzhe" + @backryun's e-mail (237 commits)
//   2. 2026-08-29..09-02 — name "Markus Hartung" + the maintainer's e-mail (59 commits)
import { test } from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const SCRIPT_PATH = fileURLToPath(
  new URL("../../scripts/check/check-git-identity.sh", import.meta.url)
);

const OWNER_NAME = "diegosouzapw";
const OWNER_EMAIL = "8016841+diegosouzapw@users.noreply.github.com";
const LEGACY_EMAIL = "diegosouzapw@users.noreply.github.com";

/** Runs the gate with a synthetic git identity. `configured` toggles the opt-in. */
function runGate(
  identity: {
    authorName: string;
    authorEmail: string;
    committerName: string;
    committerEmail: string;
  },
  configured = true
) {
  const env: Record<string, string> = {
    ...process.env,
    // The gate reads its opt-in from git config, so the ambient global/system
    // config has to be neutralised: on a machine that HAS opted in (the
    // maintainer's own boxes) the "not opted in" case is otherwise impossible
    // to simulate and the test fails there while passing on a clean CI runner.
    GIT_CONFIG_GLOBAL: "/dev/null",
    GIT_CONFIG_SYSTEM: "/dev/null",
    GIT_AUTHOR_NAME: identity.authorName,
    GIT_AUTHOR_EMAIL: identity.authorEmail,
    GIT_COMMITTER_NAME: identity.committerName,
    GIT_COMMITTER_EMAIL: identity.committerEmail,
  };
  if (configured) {
    // GIT_CONFIG_* is inherited by every child `git` call the script makes,
    // unlike `git -c`, which would only apply to a single invocation.
    Object.assign(env, {
      GIT_CONFIG_COUNT: "3",
      GIT_CONFIG_KEY_0: "omniroute.expectedName",
      GIT_CONFIG_VALUE_0: OWNER_NAME,
      GIT_CONFIG_KEY_1: "omniroute.expectedEmail",
      GIT_CONFIG_VALUE_1: OWNER_EMAIL,
      GIT_CONFIG_KEY_2: "omniroute.legacyEmail",
      GIT_CONFIG_VALUE_2: LEGACY_EMAIL,
    });
  }
  const r = spawnSync("sh", [SCRIPT_PATH], { env, encoding: "utf8" });
  return { status: r.status, stderr: r.stderr ?? "" };
}

const owner = {
  authorName: OWNER_NAME,
  authorEmail: OWNER_EMAIL,
  committerName: OWNER_NAME,
  committerEmail: OWNER_EMAIL,
};

test("stays inert when the machine has not opted in", () => {
  // A contributor who cloned the repo must never be blocked by the maintainer's gate.
  const r = runGate(
    {
      authorName: "Some Contributor",
      authorEmail: "someone@example.com",
      committerName: "Some Contributor",
      committerEmail: "someone@example.com",
    },
    false
  );
  assert.equal(r.status, 0);
});

test("accepts the maintainer's own identity", () => {
  assert.equal(runGate(owner).status, 0);
});

test("rejects the maintainer's e-mail carrying another person's name", () => {
  const r = runGate({
    authorName: "Markus Hartung",
    authorEmail: OWNER_EMAIL,
    committerName: "Markus Hartung",
    committerEmail: OWNER_EMAIL,
  });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /AUTHOR combina o e-mail do mantenedor/);
  assert.match(r.stderr, /COMMITTER não é a identidade desta máquina/);
});

test("rejects the retired legacy e-mail — the 2026-08-29 window's exact signature", () => {
  const r = runGate({
    authorName: "Markus Hartung",
    authorEmail: LEGACY_EMAIL,
    committerName: "Markus Hartung",
    committerEmail: LEGACY_EMAIL,
  });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /e-mail aposentado/);
});

test("allows crediting a contributor through their OWN e-mail", () => {
  // `git commit --author="Name <their@email>"` is the sanctioned credit path and
  // must keep working — the gate targets the maintainer's e-mail, not the name.
  const r = runGate({
    authorName: "Markus Hartung",
    authorEmail: "mail@hartmark.se",
    committerName: OWNER_NAME,
    committerEmail: OWNER_EMAIL,
  });
  assert.equal(r.status, 0);
});

test("rejects a committer that is not this machine's identity", () => {
  // The committer is whoever RAN the commit, so on the maintainer's machine it is
  // always them. A forgotten identity override surfaces here first.
  const r = runGate({
    authorName: OWNER_NAME,
    authorEmail: OWNER_EMAIL,
    committerName: "Bob.Hou",
    committerEmail: "houminxi@gmail.com",
  });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /COMMITTER não é a identidade desta máquina/);
});

test("rejects the 2026-08-13 window: neither name nor e-mail is the maintainer's", () => {
  // Name "Xiangzhe" (@xz-dev) + @backryun's e-mail. Checking only the maintainer's
  // e-mail would MISS this window entirely — hence the committer-identity rule.
  const r = runGate({
    authorName: "Xiangzhe",
    authorEmail: "bakryun0718@proton.me",
    committerName: "Xiangzhe",
    committerEmail: "bakryun0718@proton.me",
  });
  assert.equal(r.status, 1);
  assert.match(r.stderr, /COMMITTER não é a identidade desta máquina/);
});
