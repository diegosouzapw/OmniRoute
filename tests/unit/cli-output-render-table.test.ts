/**
 * Regression tests for renderTable (exposed via emit({ output: "table" })).
 * Verifies behaviour is preserved after replacing cli-table3 with the hand-rolled formatter.
 */
import test from "node:test";
import assert from "node:assert/strict";

function captureStdout(fn: () => void): string {
  const chunks: string[] = [];
  const originalWrite = process.stdout.write.bind(process.stdout);
  process.stdout.write = (chunk: string | Uint8Array) => {
    chunks.push(typeof chunk === "string" ? chunk : chunk.toString());
    return true;
  };
  try {
    fn();
  } finally {
    process.stdout.write = originalWrite;
  }
  return chunks.join("");
}

// ─── renderTable via emit ────────────────────────────────────────────────────

test("renderTable: header text appears in output", async () => {
  const { emit } = await import("../../bin/cli/output.mjs");
  const schema = [
    { key: "a", header: "A" },
    { key: "b", header: "B" },
  ];
  const out = captureStdout(() => emit([{ a: "foo", b: "bar" }], { output: "table" }, schema));
  assert.ok(out.includes("A"), `expected "A" in output, got: ${out}`);
  assert.ok(out.includes("B"), `expected "B" in output, got: ${out}`);
});

test("renderTable: row values appear in output", async () => {
  const { emit } = await import("../../bin/cli/output.mjs");
  const schema = [
    { key: "a", header: "A" },
    { key: "b", header: "B" },
  ];
  const out = captureStdout(() => emit([{ a: "foo", b: "bar" }], { output: "table" }, schema));
  assert.ok(out.includes("foo"), `expected "foo" in output, got: ${out}`);
  assert.ok(out.includes("bar"), `expected "bar" in output, got: ${out}`);
});

test("renderTable: output contains newline separation", async () => {
  const { emit } = await import("../../bin/cli/output.mjs");
  const schema = [{ key: "a", header: "A" }];
  const out = captureStdout(() => emit([{ a: "foo" }], { output: "table" }, schema));
  assert.ok(out.includes("\n"), "expected newline in output");
});

test("renderTable: empty rows prints (empty)", async () => {
  const { emit } = await import("../../bin/cli/output.mjs");
  const schema = [{ key: "a", header: "A" }];
  const out = captureStdout(() => emit([], { output: "table" }, schema));
  assert.ok(out.includes("empty"), `expected "(empty)" in output, got: ${out}`);
});

test("renderTable: quiet:true suppresses headers", async () => {
  const { emit } = await import("../../bin/cli/output.mjs");
  const schema = [
    { key: "a", header: "Alpha" },
    { key: "b", header: "Beta" },
  ];
  const out = captureStdout(() =>
    emit([{ a: "val1", b: "val2" }], { output: "table", quiet: true }, schema),
  );
  // headers must NOT appear in quiet mode
  assert.ok(!out.includes("Alpha"), `header "Alpha" should be hidden in quiet mode, got: ${out}`);
  assert.ok(!out.includes("Beta"), `header "Beta" should be hidden in quiet mode, got: ${out}`);
  // data rows still present
  assert.ok(out.includes("val1"), `expected "val1" in quiet output, got: ${out}`);
  assert.ok(out.includes("val2"), `expected "val2" in quiet output, got: ${out}`);
});

test("renderTable: multiple rows all appear", async () => {
  const { emit } = await import("../../bin/cli/output.mjs");
  const schema = [{ key: "name", header: "Name" }];
  const data = [{ name: "alice" }, { name: "bob" }, { name: "charlie" }];
  const out = captureStdout(() => emit(data, { output: "table" }, schema));
  assert.ok(out.includes("alice"), "expected 'alice'");
  assert.ok(out.includes("bob"), "expected 'bob'");
  assert.ok(out.includes("charlie"), "expected 'charlie'");
});

test("renderTable: infers schema from data keys when no schema given", async () => {
  const { emit } = await import("../../bin/cli/output.mjs");
  const data = [{ id: "x1", status: "ok" }];
  const out = captureStdout(() => emit(data, { output: "table" }));
  assert.ok(out.includes("id"), "expected key 'id' as header");
  assert.ok(out.includes("status"), "expected key 'status' as header");
  assert.ok(out.includes("x1"), "expected value 'x1'");
  assert.ok(out.includes("ok"), "expected value 'ok'");
});

test("renderTable: column separator characters present", async () => {
  const { emit } = await import("../../bin/cli/output.mjs");
  const schema = [
    { key: "col1", header: "Col1" },
    { key: "col2", header: "Col2" },
  ];
  const out = captureStdout(() => emit([{ col1: "a", col2: "b" }], { output: "table" }, schema));
  // Output must contain some column delimiter — either "|" (hand-rolled) or "│" (cli-table3 box-drawing)
  const hasSeparator = out.includes("|") || out.includes("│");
  assert.ok(hasSeparator, `expected column separator in output, got: ${out}`);
});

test("renderTable: ANSI-wrapped formatter value does not bleed — reset code always present", async () => {
  const { emit } = await import("../../bin/cli/output.mjs");
  // Formatter wraps each value in green ANSI codes.
  const GREEN = "\x1b[32m";
  const RESET_CODE = "\x1b[0m";
  const schema = [
    {
      key: "status",
      header: "Status",
      // Column width (4) is smaller than the raw ANSI string length (e.g. "\x1b[32mok\x1b[0m" = 12 bytes)
      // but the visible content "ok" is only 2 chars — no truncation needed.
      // We use a longer visible value to force truncation and verify the reset is preserved.
      width: 4,
      formatter: (v: string) => `${GREEN}${v}${RESET_CODE}`,
    },
  ];
  // "active" (6 visible chars) exceeds the column width of 4, triggering truncation.
  const out = captureStdout(() => emit([{ status: "active" }], { output: "table" }, schema));

  // The rendered output must always contain the ANSI reset code — never a bleed.
  assert.ok(
    out.includes(RESET_CODE),
    `expected ANSI reset code (\\x1b[0m) in output to prevent color bleed, got: ${JSON.stringify(out)}`,
  );
});
