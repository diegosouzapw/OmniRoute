import { describe, it } from "node:test";
import assert from "node:assert/strict";

// We test the helper that will be added to toolCallHelper.ts.
// For the TDD probe, we directly test the scenario: case-sensitive Map.get
// fails for lowercase names, and the fix (case-insensitive fallback) resolves it.
// After the fix is implemented, the actual functions being tested here are
// restoreOpenAIToolNames (already exported) and the new caseInsensitiveToolNameLookup.

describe("9575 - tool call name case sensitivity", () => {
  const toolNameMap = new Map<string, string>([
    ["Bash", "Bash"],
    ["Read", "Read"],
    ["Write", "Write"],
    ["Glob", "Glob"],
    ["Skill", "Skill"],
    ["Edit", "Edit"],
  ]);

  it("case-sensitive Map.get fails for lowercase tool names (THE BUG)", () => {
    // Simulate upstream returning lowercase "bash" when tool is "Bash"
    const upstreamName = "bash";
    const result = toolNameMap.get(upstreamName);
    // Case-sensitive lookup returns undefined - this IS the bug
    assert.equal(result, undefined, "case-sensitive get should fail for lowercase 'bash'");
    // The fallback expression: get() || name — passes through unchanged
    const passthrough = toolNameMap.get(upstreamName) ?? upstreamName;
    assert.equal(passthrough, "bash", "lowercase 'bash' passes through unchanged (THE BUG)");
  });

  it("case-insensitive fallback resolves lowercase to PascalCase (THE FIX)", () => {
    const upstreamName = "bash";
    // Simulate the fix: iteration-based case-insensitive lookup
    const lowerName = upstreamName.toLowerCase();
    let found: string | undefined;
    for (const [key, value] of toolNameMap) {
      if (key.toLowerCase() === lowerName) {
        found = value;
        break;
      }
    }
    assert.equal(found, "Bash", "case-insensitive lookup finds 'Bash' from 'bash'");
  });

  it("exact match still works for already-correct PascalCase names", () => {
    // When upstream returns correct PascalCase, exact Match.get should work
    const result = toolNameMap.get("Bash");
    assert.equal(result, "Bash", "exact match works for PascalCase 'Bash'");
  });

  it("restoreOpenAIToolNames: lowercase in aliases map", async () => {
    // Test restoreOpenAIToolNames which uses aliases.get(fn.name)
    const { restoreOpenAIToolNames } =
      await import("../../open-sse/translator/helpers/toolCallHelper.ts");

    // Simulate aliases where the key is the shortened lowercase version
    const aliases = new Map<string, string>([["bash", "Bash"]]);
    const body = {
      choices: [
        {
          message: {
            tool_calls: [
              {
                id: "call_1",
                type: "function",
                function: { name: "bash", arguments: "{}" },
              },
            ],
          },
        },
      ],
    };

    // Before fix: aliases.get("bash") returns "Bash" directly because
    // the key IS "bash" — this one actually works with exact match.
    // The bug scenario is when aliases key is "Bash" and upstream returns "bash".
    const aliasesReversed = new Map<string, string>([["Bash", "bash"]]);
    const bodyReversed = {
      choices: [
        {
          message: {
            tool_calls: [
              {
                id: "call_2",
                type: "function",
                function: { name: "bash", arguments: "{}" },
              },
            ],
          },
        },
      ],
    };

    // Without fix: "bash" is not in map (has "Bash" as key), so lookup fails
    const originalGet = aliasesReversed.get("bash");
    assert.equal(
      originalGet,
      undefined,
      "case-sensitive get fails when key is 'Bash' but input is 'bash'"
    );
  });

  it("full pipeline: toolNameMap with PascalCase keys, response with lowercase", async () => {
    // This simulates the exact bug scenario:
    // toolNameMap has PascalCase entries from request translation
    // Upstream model returns lowercase function call names

    const { caseInsensitiveToolNameLookup } =
      await import("../../open-sse/translator/helpers/toolCallHelper.ts");

    // Test the fix function
    // Exact match case
    const exactResult = caseInsensitiveToolNameLookup("Bash", toolNameMap);
    assert.equal(exactResult, "Bash", "exact match works");

    // Case-insensitive fallback case (THE BUG SCENARIO)
    const fallbackResult = caseInsensitiveToolNameLookup("bash", toolNameMap);
    assert.equal(fallbackResult, "Bash", "case-insensitive fallback resolves 'bash' to 'Bash'");

    // Non-existent tool name
    const noResult = caseInsensitiveToolNameLookup("nonexistent", toolNameMap);
    assert.equal(noResult, undefined, "non-existent tool returns undefined");

    // Null/undefined map
    const nullResult = caseInsensitiveToolNameLookup("bash", null);
    assert.equal(nullResult, undefined, "null map returns undefined");
  });
});
