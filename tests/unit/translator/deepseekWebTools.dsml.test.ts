// Permanent tests for DeepSeek Web's native DSML dialect.
// Canonical project location: tests/unit/** (see package.json → test:unit).
// Run: node --import tsx --test tests/unit/translator/deepseekWebTools.dsml.test.ts
// (workdir = omniroute package root).
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { parseDeepSeekToolCalls } from "../../../open-sse/translator/deepseekWebTools.ts";

const bashTools = [
  {
    type: "function",
    function: {
      name: "bash",
      description: "run shell",
      parameters: {
        type: "object",
        properties: { command: { type: "string" } },
        required: ["command"],
      },
    },
  },
];

const multiTools = [
  {
    type: "function",
    function: {
      name: "write_file",
      description: "write",
      parameters: {
        type: "object",
        properties: {
          path: { type: "string" },
          content: { type: "string" },
        },
        required: ["path", "content"],
      },
    },
  },
];

const DSML_FREE = `<｜｜DSML｜｜ calls>
<｜｜DSML｜｜ invoke name="bash">
<｜｜DSML｜｜ parameter name="command" string="true">free -h</｜｜DSML｜｜ parameter>
<｜｜DSML｜｜ invoke>
</｜｜DSML｜｜ calls>`;

function argsOf(r: { toolCalls: Array<{ function: { arguments: string } }> | null }, i = 0) {
  assert.ok(r.toolCalls, "expected toolCalls, got null");
  return JSON.parse(r.toolCalls[i].function.arguments) as Record<string, unknown>;
}

describe("deepseekWebTools DSML", () => {
  it("1. canonical <tool> + bash + echo HOLA (regression)", () => {
    const r = parseDeepSeekToolCalls(
      `<tool>{"name":"bash","arguments":{"command":"echo HOLA"}}</tool>`,
      "t1",
      bashTools
    );
    assert.equal(r.toolCalls?.length, 1);
    assert.equal(r.toolCalls![0].function.name, "bash");
    assert.deepEqual(argsOf(r), { command: "echo HOLA" });
    assert.equal(r.content.trim(), "");
  });

  it("2. DSML + bash + free -h", () => {
    const r = parseDeepSeekToolCalls(DSML_FREE, "t2", bashTools);
    assert.equal(r.toolCalls?.length, 1);
    assert.equal(r.toolCalls![0].type, "function");
    assert.equal(r.toolCalls![0].function.name, "bash");
    assert.deepEqual(argsOf(r), { command: "free -h" });
    assert.equal(r.content.trim(), "");
  });

  it("3. DSML + bash + uname -a", () => {
    const r = parseDeepSeekToolCalls(
      DSML_FREE.replace("free -h", "uname -a"),
      "t3",
      bashTools
    );
    assert.deepEqual(argsOf(r), { command: "uname -a" });
  });

  it("4. DSML with multiple parameters", () => {
    const r = parseDeepSeekToolCalls(
      `<｜｜DSML｜｜ calls>\n<｜｜DSML｜｜ invoke name="write_file">\n` +
        `<｜｜DSML｜｜ parameter name="path" string="true">/tmp/x.txt</｜｜DSML｜｜ parameter>\n` +
        `<｜｜DSML｜｜ parameter name="content" string="true">hola mundo</｜｜DSML｜｜ parameter>\n` +
        `<｜｜DSML｜｜ invoke>\n</｜｜DSML｜｜ calls>`,
      "t4",
      multiTools
    );
    assert.equal(r.toolCalls?.length, 1);
    assert.equal(r.toolCalls![0].function.name, "write_file");
    assert.deepEqual(argsOf(r), { path: "/tmp/x.txt", content: "hola mundo" });
  });

  it("5. DSML with multiple invokes", () => {
    const r = parseDeepSeekToolCalls(
      `<｜｜DSML｜｜ calls>\n` +
        `<｜｜DSML｜｜ invoke name="bash">\n<｜｜DSML｜｜ parameter name="command">free -h</｜｜DSML｜｜ parameter>\n<｜｜DSML｜｜ invoke>\n` +
        `<｜｜DSML｜｜ invoke name="bash">\n<｜｜DSML｜｜ parameter name="command">uname -a</｜｜DSML｜｜ parameter>\n<｜｜DSML｜｜ invoke>\n` +
        `</｜｜DSML｜｜ calls>`,
      "t5",
      bashTools
    );
    assert.equal(r.toolCalls?.length, 2);
    assert.equal(r.toolCalls![0].id, "t5_0");
    assert.equal(r.toolCalls![1].id, "t5_1");
    assert.deepEqual(argsOf(r, 0), { command: "free -h" });
    assert.deepEqual(argsOf(r, 1), { command: "uname -a" });
    assert.equal(r.content.trim(), "");
  });

  it("6. DSML multiline values", () => {
    const script = "echo línea1\necho línea2\necho fin";
    const r = parseDeepSeekToolCalls(
      `<｜｜DSML｜｜ calls>\n<｜｜DSML｜｜ invoke name="bash">\n` +
        `<｜｜DSML｜｜ parameter name="command" string="true">${script}</｜｜DSML｜｜ parameter>\n` +
        `<｜｜DSML｜｜ invoke>\n</｜｜DSML｜｜ calls>`,
      "t6",
      bashTools
    );
    assert.deepEqual(argsOf(r), { command: script });
  });

  it("7. plain text without tools → null", () => {
    const r = parseDeepSeekToolCalls("Tienes 14 GiB de RAM.", "t7", bashTools);
    assert.equal(r.toolCalls, null);
    assert.equal(r.content, "Tienes 14 GiB de RAM.");
  });

  it("8. unknown tool: DSML ↔ canonical parity", () => {
    const canon = parseDeepSeekToolCalls(
      `<tool>{"name":"frobnicate","arguments":{"x":1}}</tool>`,
      "t8a",
      bashTools
    );
    const dsml = parseDeepSeekToolCalls(
      `<｜｜DSML｜｜ calls>\n<｜｜DSML｜｜ invoke name="frobnicate">\n` +
        `<｜｜DSML｜｜ parameter name="x" string="true">1</｜｜DSML｜｜ parameter>\n` +
        `<｜｜DSML｜｜ invoke>\n</｜｜DSML｜｜ calls>`,
      "t8b",
      bashTools
    );
    // Paridad con el path <tool>: el nombre desconocido se propaga tal cual.
    assert.equal(dsml.toolCalls?.[0]?.function?.name, canon.toolCalls?.[0]?.function?.name);
    assert.equal(dsml.toolCalls?.length, 1);
  });

  it("9. DSML + <tool> coexistence in document order", () => {
    const r = parseDeepSeekToolCalls(
      `${DSML_FREE}\n<tool>{"name":"bash","arguments":{"command":"echo HOLA"}}</tool>`,
      "t9",
      bashTools
    );
    assert.equal(r.toolCalls?.length, 2);
    assert.deepEqual(argsOf(r, 0), { command: "free -h" });
    assert.deepEqual(argsOf(r, 1), { command: "echo HOLA" });
    assert.equal(r.content.trim(), "");
  });

  it("10. JSON escaping in values", () => {
    const cmd = `echo "hola \\ mundo" && ls 'C:\\tmp'`;
    const r = parseDeepSeekToolCalls(
      `<｜｜DSML｜｜ calls>\n<｜｜DSML｜｜ invoke name="bash">\n` +
        `<｜｜DSML｜｜ parameter name="command" string="true">${cmd}</｜｜DSML｜｜ parameter>\n` +
        `<｜｜DSML｜｜ invoke>\n</｜｜DSML｜｜ calls>`,
      "t10",
      bashTools
    );
    // Debe sobrevivir como JSON válido y redondo.
    assert.deepEqual(argsOf(r), { command: cmd });
    assert.doesNotThrow(() => JSON.parse(r.toolCalls![0].function.arguments));
  });

  it("11. ASCII marker variant", () => {
    const ascii = DSML_FREE.replace(/｜/g, "|");
    assert.ok(ascii.includes("<||DSML|| calls>"));
    const r = parseDeepSeekToolCalls(ascii, "t11", bashTools);
    assert.equal(r.toolCalls?.length, 1);
    assert.deepEqual(argsOf(r), { command: "free -h" });
  });

  it("12. hybrid <tool>{json} + DSML closers (observed live)", () => {
    const hybrid =
      `<tool>{"name": "bash", "arguments": {"command": "uname -a"}}` +
      `</｜｜DSML｜｜ parameter>\n</｜｜DSML｜｜ invoke>\n</｜｜DSML｜｜ calls>`;
    const r = parseDeepSeekToolCalls(hybrid, "t12", bashTools);
    assert.equal(r.toolCalls?.length, 1);
    assert.equal(r.toolCalls![0].function.name, "bash");
    assert.deepEqual(argsOf(r), { command: "uname -a" });
    assert.ok(!r.content.includes("DSML"), r.content);
  });

  it("13. DSML invoke without <calls> envelope", () => {
    const r = parseDeepSeekToolCalls(
      `<｜｜DSML｜｜ invoke name="bash">\n` +
        `<｜｜DSML｜｜ parameter name="command" string="true">echo DOS</｜｜DSML｜｜ parameter>\n` +
        `<｜｜DSML｜｜ invoke>`,
      "t13",
      bashTools
    );
    assert.equal(r.toolCalls?.length, 1);
    assert.equal(r.toolCalls![0].function.name, "bash");
    assert.deepEqual(argsOf(r), { command: "echo DOS" });
    assert.ok(!r.content.includes("DSML"), r.content);
  });

  it("14. envelopeless DSML + <tool> in order", () => {
    const r = parseDeepSeekToolCalls(
      `<｜｜DSML｜｜ invoke name="bash">\n` +
        `<｜｜DSML｜｜ parameter name="command" string="true">echo DOS</｜｜DSML｜｜ parameter>\n` +
        `<｜｜DSML｜｜ invoke>\n` +
        `<tool>{"name":"bash","arguments":{"command":"echo UNO"}}</tool>`,
      "t14",
      bashTools
    );
    assert.equal(r.toolCalls?.length, 2);
    assert.deepEqual(argsOf(r, 0), { command: "echo DOS" });
    assert.deepEqual(argsOf(r, 1), { command: "echo UNO" });
    assert.equal(r.content.trim(), "");
  });

  it("15. <tool> + envelopeless DSML in reverse order", () => {
    const r = parseDeepSeekToolCalls(
      `<tool>{"name":"bash","arguments":{"command":"echo UNO"}}</tool>\n` +
        `<｜｜DSML｜｜ invoke name="bash">\n` +
        `<｜｜DSML｜｜ parameter name="command" string="true">echo DOS</｜｜DSML｜｜ parameter>\n` +
        `<｜｜DSML｜｜ invoke>`,
      "t15",
      bashTools
    );
    assert.equal(r.toolCalls?.length, 2);
    assert.deepEqual(argsOf(r, 0), { command: "echo UNO" });
    assert.deepEqual(argsOf(r, 1), { command: "echo DOS" });
    assert.equal(r.content.trim(), "");
  });

  it("16. invoke without valid parameters → no tool call (L2 fail-safe)", () => {
    const r = parseDeepSeekToolCalls(
      `<｜｜DSML｜｜ calls>\n<｜｜DSML｜｜ invoke name="bash">\n<｜｜DSML｜｜ invoke>\n</｜｜DSML｜｜ calls>`,
      "t16",
      bashTools
    );
    assert.equal(r.toolCalls, null);
  });

  it("17. parameter without name → no tool call for that invoke (L2 fail-safe)", () => {
    const r = parseDeepSeekToolCalls(
      `<｜｜DSML｜｜ calls>\n<｜｜DSML｜｜ invoke name="bash">\n` +
        `<｜｜DSML｜｜ parameter string="true">echo HOLA</｜｜DSML｜｜ parameter>\n` +
        `<｜｜DSML｜｜ invoke>\n</｜｜DSML｜｜ calls>`,
      "t17",
      bashTools
    );
    assert.equal(r.toolCalls, null);
  });

  it("18. empty parameter → fail-safe, no tool call (L2)", () => {
    const r = parseDeepSeekToolCalls(
      `<｜｜DSML｜｜ calls>\n<｜｜DSML｜｜ invoke name="bash">\n` +
        `<｜｜DSML｜｜ parameter name="command"></｜｜DSML｜｜ parameter>\n` +
        `<｜｜DSML｜｜ invoke>\n</｜｜DSML｜｜ calls>`,
      "t18",
      bashTools
    );
    assert.equal(r.toolCalls, null);
  });

  it("19. envelope + root invoke coexist in order", () => {
    const r = parseDeepSeekToolCalls(
      `${DSML_FREE}\n` +
        `<｜｜DSML｜｜ invoke name="bash">\n` +
        `<｜｜DSML｜｜ parameter name="command" string="true">uname -a</｜｜DSML｜｜ parameter>\n` +
        `<｜｜DSML｜｜ invoke>`,
      "t19",
      bashTools
    );
    assert.equal(r.toolCalls?.length, 2);
    assert.deepEqual(argsOf(r, 0), { command: "free -h" });
    assert.deepEqual(argsOf(r, 1), { command: "uname -a" });
    assert.equal(r.content.trim(), "");
  });

  it("20. unclosed root invoke keeps trailing text (audit C)", () => {
    const r = parseDeepSeekToolCalls(
      `<｜｜DSML｜｜ invoke name="bash">\n` +
        `<｜｜DSML｜｜ parameter name="command">echo X</｜｜DSML｜｜ parameter>\n` +
        `Texto legítimo después.`,
      "t20",
      bashTools
    );
    assert.equal(r.toolCalls?.length, 1);
    assert.deepEqual(argsOf(r), { command: "echo X" });
    assert.equal(r.content.trim(), "Texto legítimo después.");
  });
});
