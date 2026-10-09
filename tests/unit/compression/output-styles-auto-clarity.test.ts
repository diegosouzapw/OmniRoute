import assert from "node:assert/strict";
import test from "node:test";

import { OUTPUT_STYLE_MARKER } from "../../../open-sse/services/compression/outputStyles/apply.ts";
import type { OutputStyleSelectionEntry } from "../../../open-sse/services/compression/types.ts";
import { createChatPipelineHarness } from "../../integration/_chatPipelineHarness.ts";

// Drives the full chat handler, so the Auto-Clarity toggle is checked where chatCore reads it.
const {
  buildOpenAIResponse,
  buildRequest,
  cleanup,
  combosDb,
  handleChat,
  resetStorage,
  seedConnection,
} = await createChatPipelineHarness("output-styles-auto-clarity");
const compressionDb = await import("../../../src/lib/db/compression.ts");
const compressionCombosDb = await import("../../../src/lib/db/compressionCombos.ts");

const PANEL_STYLES: OutputStyleSelectionEntry[] = [
  { id: "terse-prose", level: "full" },
  { id: "less-code", level: "full" },
];
const ROUTING_COMBO = "auto-clarity-combo";
const SECURITY_TURN = "Explain this security vulnerability in detail.";
const BENIGN_TURN = "Explain how a for loop works.";
const STYLE_SOURCES = [
  "legacy caveman switch",
  "Output Styles panel",
  "combo with an assigned compression combo",
] as const;
type StyleSource = (typeof STYLE_SOURCES)[number];

test.beforeEach(resetStorage);
test.after(cleanup);

// A write fills an undefined autoClarity from the stored row, or the shipped default on a fresh
// DB. resetStorage gives every case a fresh DB, so the "left unset" rows check the default.
async function styleInstructionReachesUpstream(
  autoClarity: boolean | undefined,
  source: StyleSource,
  userTurn: string
) {
  await compressionDb.updateCompressionSettings({
    enabled: true,
    defaultMode: "off",
    autoTriggerTokens: 0,
    ...(source === "Output Styles panel" ? { outputStyles: PANEL_STYLES } : {}),
    cavemanOutputMode: {
      enabled: source === "legacy caveman switch",
      intensity: "full",
      autoClarity,
    },
  });
  await seedConnection("openai");
  const viaCombo = source === "combo with an assigned compression combo";
  if (viaCombo) {
    const routingCombo = await combosDb.createCombo({
      name: ROUTING_COMBO,
      strategy: "priority",
      models: ["openai/gpt-4o-mini"],
    });
    const compressionCombo = compressionCombosDb.createCompressionCombo({
      pipeline: [{ engine: "caveman", intensity: "lite" }],
      outputMode: true,
    });
    assert.equal(
      compressionCombosDb.assignRoutingCombo(compressionCombo.id, routingCombo.id as string),
      true
    );
  }

  const upstreamBodies: Array<{ messages?: Array<{ role?: string; content?: string }> }> = [];
  globalThis.fetch = async (url: string | URL | Request, init: RequestInit = {}) => {
    // The compression combo turns on a pipeline that posts compression events to the live
    // dashboard (/__omniroute_event), so keep only the chat call.
    if (String(url).endsWith("/chat/completions")) {
      upstreamBodies.push(JSON.parse(String(init.body)));
    }
    return buildOpenAIResponse("ok");
  };

  const response = await handleChat(
    buildRequest({
      body: {
        model: viaCombo ? ROUTING_COMBO : "openai/gpt-4o-mini",
        stream: false,
        messages: [{ role: "user", content: userTurn }],
      },
    })
  );

  assert.equal(response.status, 200);
  assert.equal(upstreamBodies.length, 1, "exactly one upstream chat request");
  return (upstreamBodies[0].messages ?? []).some(
    (message) => message.role === "system" && (message.content ?? "").includes(OUTPUT_STYLE_MARKER)
  );
}

for (const source of STYLE_SOURCES) {
  test(`${source}: Auto-Clarity off keeps the styles on a security-topic turn`, async () => {
    assert.equal(await styleInstructionReachesUpstream(false, source, SECURITY_TURN), true);
  });

  // Right after the "off" case, so a stored row leaking between cases would fail this one.
  test(`${source}: Auto-Clarity left unset skips the styles on a security-topic turn`, async () => {
    assert.equal(await styleInstructionReachesUpstream(undefined, source, SECURITY_TURN), false);
  });

  test(`${source}: Auto-Clarity on skips the styles on a security-topic turn`, async () => {
    assert.equal(await styleInstructionReachesUpstream(true, source, SECURITY_TURN), false);
  });

  // The bypass is security-topic-scoped, so with the toggle on a benign turn keeps the styles.
  test(`${source}: Auto-Clarity on keeps the styles on a benign turn`, async () => {
    assert.equal(await styleInstructionReachesUpstream(true, source, BENIGN_TURN), true);
  });
}
