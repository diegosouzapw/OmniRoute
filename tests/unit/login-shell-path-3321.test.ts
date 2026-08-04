import test from "node:test";
import assert from "node:assert/strict";
import {
  getCachedLoginShellPath,
  getLoginShellPath,
  mergeShellPath,
  parseShellPathOutput,
} from "../../src/shared/services/loginShellPath.ts";
import * as loginShellPath from "../../src/shared/services/loginShellPath.ts";

// Regression guards for #3321: macOS GUI/Electron apps don't inherit the login-shell PATH,
// so Homebrew/nvm/volta CLIs were reported "not installed". We recover the real PATH from
// the login shell and merge it into the lookup env. The pure helpers are tested here with
// an injected shell runner (no macOS / no real shell needed).

test("login shell path public surface excludes removed cache reset helper", () => {
  assert.equal(Object.hasOwn(loginShellPath, "__resetLoginShellPathCacheForTesting"), false);
  assert.equal(typeof getCachedLoginShellPath, "function");
  assert.equal(typeof getLoginShellPath, "function");
});

test("mergeShellPath unions and de-dupes, keeping base entries first", () => {
  assert.equal(
    mergeShellPath("/usr/bin:/bin", "/opt/homebrew/bin:/usr/bin", ":"),
    "/usr/bin:/bin:/opt/homebrew/bin"
  );
});

test("mergeShellPath ignores empty/whitespace segments", () => {
  assert.equal(
    mergeShellPath("/usr/bin::", "  :/opt/homebrew/bin", ":"),
    "/usr/bin:/opt/homebrew/bin"
  );
});

test("parseShellPathOutput extracts only the PATH= line", () => {
  const out = "SHELL=/bin/zsh\nPATH=/opt/homebrew/bin:/usr/bin\nHOME=/Users/x\n";
  assert.equal(parseShellPathOutput(out), "/opt/homebrew/bin:/usr/bin");
});

test("parseShellPathOutput returns null when no PATH line is present", () => {
  assert.equal(parseShellPathOutput("HOME=/Users/x\n"), null);
  assert.equal(parseShellPathOutput(""), null);
});

test("getLoginShellPath returns null on non-darwin platforms (no-op on Linux/Windows)", () => {
  let called = false;
  const result = getLoginShellPath({
    platform: "linux",
    runShell: () => {
      called = true;
      return "PATH=/should/not/be/used";
    },
  });
  assert.equal(result, null);
  assert.equal(called, false, "must not spawn the shell on non-darwin");
});

test("getLoginShellPath returns the login-shell PATH on darwin (#3321)", () => {
  const result = getLoginShellPath({
    platform: "darwin",
    shell: "/bin/zsh",
    runShell: (sh) => {
      assert.equal(sh, "/bin/zsh");
      return "PATH=/opt/homebrew/bin:/usr/bin:/Users/x/.volta/bin\n";
    },
  });
  assert.equal(result, "/opt/homebrew/bin:/usr/bin:/Users/x/.volta/bin");
});

test("getLoginShellPath is fail-safe — returns null if the shell probe throws", () => {
  const result = getLoginShellPath({
    platform: "darwin",
    shell: "/bin/zsh",
    runShell: () => {
      throw new Error("shell exploded");
    },
  });
  assert.equal(result, null);
});

test("getLoginShellPath rejects a non-shell-like $SHELL value (no spawn)", () => {
  let called = false;
  const result = getLoginShellPath({
    platform: "darwin",
    shell: "/bin/zsh; rm -rf /",
    runShell: () => {
      called = true;
      return "PATH=/x";
    },
  });
  assert.equal(result, null);
  assert.equal(called, false, "must not run a shell value that fails the charset guard");
});
