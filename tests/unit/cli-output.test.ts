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

test("emit json format outputs valid JSON", async () => {
  const { emit } = await import("../../bin/cli/output.mjs");
  const data = [{ id: "m1", provider: "openai" }];
  const out = captureStdout(() => emit(data, { output: "json" }));
  const parsed = JSON.parse(out);
  assert.deepEqual(parsed, data);
});

test("emit jsonl format outputs one JSON per line", async () => {
  const { emit } = await import("../../bin/cli/output.mjs");
  const data = [{ id: "m1" }, { id: "m2" }];
  const out = captureStdout(() => emit(data, { output: "jsonl" }));
  const lines = out.trim().split("\n").filter(Boolean);
  assert.equal(lines.length, 2);
  assert.equal(JSON.parse(lines[0]).id, "m1");
  assert.equal(JSON.parse(lines[1]).id, "m2");
});

test("emit csv format outputs header + rows", async () => {
  const { emit } = await import("../../bin/cli/output.mjs");
  const schema = [
    { key: "id", header: "Model" },
    { key: "provider", header: "Provider" },
  ];
  const data = [{ id: "gpt-4", provider: "openai" }];
  const out = captureStdout(() => emit(data, { output: "csv" }, schema));
  const lines = out.trim().split("\n");
  assert.equal(lines[0], "Model,Provider");
  assert.equal(lines[1], "gpt-4,openai");
});

test("emit table format outputs non-empty content", async () => {
  const { emit } = await import("../../bin/cli/output.mjs");
  const data = [{ id: "m1", provider: "anthropic" }];
  const out = captureStdout(() => emit(data, { output: "table" }));
  assert.ok(out.length > 0);
  assert.ok(out.includes("m1"));
  assert.ok(out.includes("anthropic"));
});

test("emit auto-detects json when stdout is not TTY", async () => {
  const { emit } = await import("../../bin/cli/output.mjs");
  const data = [{ id: "x" }];
  const origIsTTY = process.stdout.isTTY;
  // @ts-ignore
  process.stdout.isTTY = false;
  const out = captureStdout(() => emit(data, {}));
  // @ts-ignore
  process.stdout.isTTY = origIsTTY;
  const parsed = JSON.parse(out);
  assert.ok(Array.isArray(parsed));
});

test("emit empty array outputs (empty) for table", async () => {
  const { emit } = await import("../../bin/cli/output.mjs");
  const out = captureStdout(() => emit([], { output: "table" }));
  assert.ok(out.includes("empty"));
});

test("maskSecret redacts sk- keys", async () => {
  const { maskSecret } = await import("../../bin/cli/output.mjs");
  const masked = maskSecret("prefix sk-abcdefgh1234 suffix");
  assert.ok(!masked.includes("sk-abcdefgh1234"));
  assert.ok(masked.includes("sk-ab***1234"));
});
