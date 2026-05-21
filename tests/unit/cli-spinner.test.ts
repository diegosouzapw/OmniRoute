import test from "node:test";
import assert from "node:assert/strict";

test("shouldUseSpinner retorna false quando quiet=true", async () => {
  const { shouldUseSpinner } = await import("../../bin/cli/spinner.mjs");
  assert.equal(shouldUseSpinner({ quiet: true }), false);
});

test("shouldUseSpinner retorna false quando output=json", async () => {
  const { shouldUseSpinner } = await import("../../bin/cli/spinner.mjs");
  assert.equal(shouldUseSpinner({ output: "json" }), false);
  assert.equal(shouldUseSpinner({ output: "jsonl" }), false);
  assert.equal(shouldUseSpinner({ output: "csv" }), false);
});

test("shouldUseSpinner retorna false quando NO_COLOR definido", async () => {
  const { shouldUseSpinner } = await import("../../bin/cli/spinner.mjs");
  const orig = process.env.NO_COLOR;
  process.env.NO_COLOR = "1";
  try {
    assert.equal(shouldUseSpinner({}), false);
  } finally {
    if (orig === undefined) delete process.env.NO_COLOR;
    else process.env.NO_COLOR = orig;
  }
});

test("shouldUseSpinner retorna false quando CI=1", async () => {
  const { shouldUseSpinner } = await import("../../bin/cli/spinner.mjs");
  const orig = process.env.CI;
  process.env.CI = "1";
  try {
    assert.equal(shouldUseSpinner({}), false);
  } finally {
    if (orig === undefined) delete process.env.CI;
    else process.env.CI = orig;
  }
});

test("withSpinner executa fn e retorna resultado", async () => {
  const { withSpinner } = await import("../../bin/cli/spinner.mjs");
  const result = await withSpinner("test", async () => 42, { quiet: true });
  assert.equal(result, 42);
});

test("withSpinner propaga erros da fn", async () => {
  const { withSpinner } = await import("../../bin/cli/spinner.mjs");
  await assert.rejects(
    () =>
      withSpinner(
        "test",
        async () => {
          throw new Error("boom");
        },
        { quiet: true }
      ),
    /boom/
  );
});

test("withSpinner aceita update callback sem erro", async () => {
  const { withSpinner } = await import("../../bin/cli/spinner.mjs");
  let updateCalled = false;
  await withSpinner(
    "test",
    async ({ update }) => {
      update("progress 50%");
      updateCalled = true;
    },
    { quiet: true }
  );
  assert.ok(updateCalled);
});

test("spinner.mjs pode ser importado sem erro", async () => {
  const mod = await import("../../bin/cli/spinner.mjs");
  assert.equal(typeof mod.withSpinner, "function");
  assert.equal(typeof mod.shouldUseSpinner, "function");
});
