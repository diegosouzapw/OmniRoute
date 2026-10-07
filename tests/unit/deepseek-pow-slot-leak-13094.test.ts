import test from "node:test";
import assert from "node:assert/strict";
import { tmpdir } from "node:os";
import { mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";

const { solveDeepSeekPowAsync } = await import("../../open-sse/lib/deepseek-pow.ts");

// A valid challenge: the failure under test happens at worker construction,
// long after validation, so these values just have to pass validateChallenge().
const ALGORITHM = "DeepSeekHashV1";
const CHALLENGE = "a".repeat(64);
const SALT = "test-salt";
const DIFFICULTY = 1;

function futureExpiry() {
  return Date.now() + 60_000;
}

test("a failed worker spawn does not consume a permanent concurrency slot (#13094)", async () => {
  // resolveWorkerPath() resolves the worker script against process.cwd(), so
  // running from a directory without it makes construction throw -- the same
  // condition users hit when the process starts from an unexpected cwd.
  const originalCwd = process.cwd();
  const emptyDir = mkdtempSync(join(tmpdir(), "deepseek-pow-nocwd-"));
  process.chdir(emptyDir);

  try {
    // MAX_CONCURRENT_WORKERS is 2, so two leaked slots exhaust the budget.
    for (let i = 0; i < 2; i++) {
      await assert.rejects(
        () => solveDeepSeekPowAsync(ALGORITHM, CHALLENGE, SALT, DIFFICULTY, futureExpiry()),
        /worker script not found/i,
        `attempt ${i + 1} should fail on the missing worker script`
      );
    }

    // The third attempt must still report the real cause. Before the fix the
    // counter had been incremented twice without ever being released, so this
    // rejected with "capacity reached" and the solver stayed dead until restart.
    await assert.rejects(
      () => solveDeepSeekPowAsync(ALGORITHM, CHALLENGE, SALT, DIFFICULTY, futureExpiry()),
      (error: Error) => {
        assert.doesNotMatch(
          error.message,
          /capacity reached/i,
          "a spawn failure must not be reported as exhausted capacity"
        );
        assert.match(error.message, /worker script not found/i);
        return true;
      }
    );
  } finally {
    process.chdir(originalCwd);
    rmSync(emptyDir, { recursive: true, force: true });
  }
});

test("the slot is released again once spawning works (#13094)", async () => {
  const originalCwd = process.cwd();
  const emptyDir = mkdtempSync(join(tmpdir(), "deepseek-pow-nocwd-"));

  try {
    process.chdir(emptyDir);
    await assert.rejects(
      () => solveDeepSeekPowAsync(ALGORITHM, CHALLENGE, SALT, DIFFICULTY, futureExpiry()),
      /worker script not found/i
    );

    // Back in a working directory the solver has to be usable again: a leaked
    // slot would eventually surface here as a spurious capacity rejection.
    process.chdir(originalCwd);
    const answer = await solveDeepSeekPowAsync(
      ALGORITHM,
      CHALLENGE,
      SALT,
      DIFFICULTY,
      futureExpiry()
    );
    assert.equal(typeof answer, "number", "a real solve should still succeed");
  } finally {
    process.chdir(originalCwd);
    rmSync(emptyDir, { recursive: true, force: true });
  }
});
