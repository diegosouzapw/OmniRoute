/**
 * Regression test for upstream 9router#2132 (ported): "Token saver Headroom ruins plan mode
 * in Codex CLI".
 *
 * Root cause: SmartCrusher's system-message guard only checked `role === "system"`. Codex CLI
 * (open-sse/executors/codex.ts) sends its instructions/tool-schema turn with role "developer"
 * (the Responses-API equivalent of "system" used by newer models). Every other guard in this
 * codebase that excludes "system" also excludes "developer" (see roleNormalizer.ts,
 * contextManager.ts, claudeUpstreamMessages.ts, etc.) — SmartCrusher was the exception, so it
 * happily tabular-compacted JSON arrays (e.g. the update_plan tool schema/examples) embedded in
 * the developer-role turn, corrupting the instructions the model needs to call the plan tool.
 */

import { describe, it, before } from "node:test";
import assert from "node:assert/strict";

let crushMessages: typeof import("../../../open-sse/services/compression/engines/headroom/smartcrusher.ts").crushMessages;
let collectCompactableArrays: typeof import("../../../open-sse/services/compression/engines/headroom/smartcrusher.ts").collectCompactableArrays;
let headroomEngine: import("../../../open-sse/services/compression/engines/headroom/index.ts").headroomEngine;

before(async () => {
  const mod = await import("../../../open-sse/services/compression/engines/headroom/smartcrusher.ts");
  crushMessages = mod.crushMessages;
  collectCompactableArrays = mod.collectCompactableArrays;

  const engineMod = await import("../../../open-sse/services/compression/engines/headroom/index.ts");
  headroomEngine = engineMod.headroomEngine;
});

/** A homogeneous array big enough (>= default minRows=8) to trigger compaction. */
function makePlanSchemaExample(): Record<string, unknown>[] {
  return Array.from({ length: 10 }, (_, i) => ({
    step: `step-${i + 1}`,
    status: i === 0 ? "in_progress" : "pending",
  }));
}

describe("headroom SmartCrusher — developer-role guard (9router#2132)", () => {
  it("does NOT compact JSON arrays embedded in a developer-role message (crushMessages)", () => {
    const json = JSON.stringify(makePlanSchemaExample());
    const messages = [
      {
        role: "developer",
        content: `Use the update_plan tool. Example plan:\n\`\`\`json\n${json}\n\`\`\``,
      },
      { role: "user", content: "Refactor the auth module." },
    ];

    const { messages: result, changed } = crushMessages(messages, 8);

    assert.equal(changed, false, "developer-role content must not be touched");
    assert.equal(result[0].content, messages[0].content);
  });

  it("still compacts the same payload when placed under role: system (control case)", () => {
    // Sanity check: this proves the array itself WOULD be compactable — the guard, not the
    // shape of the payload, is what must change.
    const json = JSON.stringify(makePlanSchemaExample());
    const messages = [{ role: "user", content: `\`\`\`json\n${json}\n\`\`\`` }];

    const { changed } = crushMessages(messages, 8);
    assert.equal(changed, true, "control case: user-role content of the same shape IS compacted");
  });

  it("collectCompactableArrays does not surface arrays from developer-role messages", () => {
    const json = JSON.stringify(makePlanSchemaExample());
    const messages = [
      { role: "developer", content: `\`\`\`json\n${json}\n\`\`\`` },
    ];
    const found = collectCompactableArrays(messages, 8);
    assert.equal(found.length, 0);
  });

  it("headroomEngine.apply leaves a Codex-CLI-shaped developer turn untouched end-to-end", () => {
    const json = JSON.stringify(makePlanSchemaExample());
    const body: Record<string, unknown> = {
      model: "gpt-5-codex",
      messages: [
        {
          role: "developer",
          content: `Instructions with an embedded schema example:\n\`\`\`json\n${json}\n\`\`\``,
        },
        { role: "user", content: "Implement the feature." },
      ],
    };

    const result = headroomEngine.apply(body);
    assert.equal(result.compressed, false);
    assert.deepEqual(result.body, body);
  });
});
