import assert from "node:assert/strict";
import test from "node:test";

import { enrichModel, parseLatestModelList } from "@/lib/providers/volcenginePlanModelDiscovery";

test("Agent Plan discovery keeps all ListAgentPlanLatestModel entries", () => {
  // `ListAgentPlanLatestModel` returns the same shape as Coding Plan's
  // `ListArkCodeLatestModel`: ModelId / OutputName / Enabled / Description.
  // We keep ALL entries — `Enabled` only reflects console visibility, not
  // API availability. Previously disabled-but-callable models like
  // kimi-k3 must be retained.
  const models = parseLatestModelList({
    Result: {
      Data: [
        {
          ModelId: "doubao-seed-evolving-latest-version",
          OutputName: "doubao-seed-evolving",
          Enabled: false,
          EnabledThinking: true,
        },
        {
          ModelId: "kimi-k3-260701",
          OutputName: "kimi-k3",
          Enabled: false,
          EnabledThinking: true,
        },
        {
          ModelId: "auto",
          OutputName: "auto",
          Enabled: true,
        },
        {
          ModelId: "minimax-m3-modelhub",
          OutputName: "minimax-m3",
          Enabled: false,
          EnabledThinking: true,
        },
      ],
    },
  });

  assert.deepEqual(
    models.map((model) => model.id),
    ["doubao-seed-evolving-latest-version", "kimi-k3-260701", "auto", "minimax-m3-modelhub"]
  );
  // OutputName is used as the canonical family name for enrichment.
  assert.equal(models[1].name, "kimi-k3");
  assert.equal(models[1].enabledThinking, true);
});

test("enrichment maps context/vision/tools from the OutputName family", () => {
  const kimi = enrichModel({ id: "kimi-k3-260701", name: "kimi-k3" });

  assert.equal(kimi.inputTokenLimit, 1048576);
  assert.equal(kimi.supportsVision, true);
  assert.equal(kimi.supportsTools, true);
  assert.equal(kimi.supportsThinking, true);

  const glm = enrichModel({ id: "glm-5-3-260801", name: "glm-5.3" });
  assert.equal(glm.inputTokenLimit, 1048576);
  assert.equal(glm.supportsVision, false);

  const doubao = enrichModel({
    id: "doubao-seed-evolving-latest-version",
    name: "doubao-seed-evolving",
  });
  assert.equal(doubao.inputTokenLimit, 1048576);
  assert.equal(doubao.supportsVision, true);
});
