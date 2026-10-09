import test from "node:test";
import assert from "node:assert/strict";

const { assertEncryptionKeyConfiguredForProduction } =
  await import("../../src/lib/db/encryption.ts");

function withoutTestFlags<T>(fn: () => T): T {
  const savedEnv = {
    NODE_ENV: process.env.NODE_ENV,
    VITEST: process.env.VITEST,
    NODE_TEST_CONTEXT: process.env.NODE_TEST_CONTEXT,
  };
  const savedExec = process.execArgv.slice();
  const savedArgv = process.argv.slice();
  const strip = (list: string[]) => list.filter((arg) => arg !== "--test");
  try {
    delete process.env.NODE_ENV;
    delete process.env.VITEST;
    delete process.env.NODE_TEST_CONTEXT;
    process.execArgv.length = 0;
    process.execArgv.push(...strip(savedExec));
    process.argv.length = 0;
    process.argv.push(...strip(savedArgv));
    return fn();
  } finally {
    for (const [key, value] of Object.entries(savedEnv)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
    process.execArgv.length = 0;
    process.execArgv.push(...savedExec);
    process.argv.length = 0;
    process.argv.push(...savedArgv);
  }
}

test("production without STORAGE_ENCRYPTION_KEY warns and does not exit", () => {
  const realExit = process.exit;
  let exitCode: number | null = null;
  process.exit = ((code?: number) => {
    exitCode = code ?? 0;
    throw new Error(`process.exit:${exitCode}`);
  }) as typeof process.exit;
  try {
    const lines: string[] = [];
    const logger = { error: (...args: unknown[]) => lines.push(args.map(String).join(" ")) };
    withoutTestFlags(() => {
      assertEncryptionKeyConfiguredForProduction({ NODE_ENV: "production" }, logger, () => false);
    });
    assert.equal(exitCode, null);
    assert.match(lines.join("\n"), /STORAGE_ENCRYPTION_KEY/);
    assert.match(lines.join("\n"), /startup continues/i);
  } finally {
    process.exit = realExit;
  }
});

test("production with encryption enabled does not warn", () => {
  const lines: string[] = [];
  const logger = { error: (...args: unknown[]) => lines.push(args.map(String).join(" ")) };
  withoutTestFlags(() => {
    assertEncryptionKeyConfiguredForProduction({ NODE_ENV: "production" }, logger, () => true);
  });
  assert.deepEqual(lines, []);
});

test("non-production without a key does not warn", () => {
  const lines: string[] = [];
  const logger = { error: (...args: unknown[]) => lines.push(args.map(String).join(" ")) };
  withoutTestFlags(() => {
    assertEncryptionKeyConfiguredForProduction({ NODE_ENV: "development" }, logger, () => false);
  });
  assert.deepEqual(lines, []);
});
