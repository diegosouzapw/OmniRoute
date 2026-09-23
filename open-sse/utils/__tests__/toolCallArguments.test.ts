import { describe, it, expect } from "vitest";
import { appendToolCallArgumentDelta } from "../toolCallArguments.ts";

describe("appendToolCallArgumentDelta", () => {
  it("concatenates incremental string deltas verbatim", () => {
    // Repeated chars must survive: "ls -ll" must not become "ls -l".
    let buf = "";
    buf = appendToolCallArgumentDelta(buf, '{"ci');
    buf = appendToolCallArgumentDelta(buf, 'ty":"par');
    buf = appendToolCallArgumentDelta(buf, 'is", "cmd":"ls -ll"}');
    expect(buf).toBe('{"city":"paris", "cmd":"ls -ll"}');
  });

  it("dedupes identical snapshot repeats", () => {
    const buf = appendToolCallArgumentDelta('{"a":1}', '{"a":1}');
    expect(buf).toBe('{"a":1}');
  });

  it("collapses prefix-growth snapshots to the new tail", () => {
    const buf = appendToolCallArgumentDelta('{"a":1', '{"a":1,"b":2');
    expect(buf).toBe('{"a":1,"b":2');
  });

  it("normalizes object fragments instead of dropping them (issue #14668)", () => {
    // Bedrock ConverseStream may deliver toolUse.input as a parsed object.
    // Silently dropping it left tool calls with empty arguments.
    expect(appendToolCallArgumentDelta("", { city: "paris" })).toBe('{"city":"paris"}');
    expect(appendToolCallArgumentDelta("", [1, 2])).toBe("[1,2]");
  });

  it("treats null/undefined/empty fragments as no-ops", () => {
    expect(appendToolCallArgumentDelta('{"a":1}', null)).toBe('{"a":1}');
    expect(appendToolCallArgumentDelta('{"a":1}', undefined)).toBe('{"a":1}');
    expect(appendToolCallArgumentDelta('{"a":1}', "")).toBe('{"a":1}');
    expect(appendToolCallArgumentDelta("", null)).toBe("");
  });
});
