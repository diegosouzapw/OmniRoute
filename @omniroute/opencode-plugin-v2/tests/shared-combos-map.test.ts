import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { mapComboToModelV2 } from "../src/shared/combos-map.js";

const member = (id: string, caps = {}) => ({
  id,
  context_length: 100000,
  max_output_tokens: 2000,
  capabilities: caps,
});

describe("mapComboToModelV2", () => {
  it("rolls up LCD: min context/output, AND of toolcall", () => {
    const m = mapComboToModelV2(
      {
        id: "combo-a",
        name: "A",
        models: [
          { kind: "model", model: "a" },
          { kind: "model", model: "b" },
        ],
      },
      [
        {
          ...member("a"),
          context_length: 100000,
          max_output_tokens: 2000,
          capabilities: { tool_calling: true },
        },
        {
          ...member("b"),
          context_length: 50000,
          max_output_tokens: 1000,
          capabilities: { tool_calling: false },
        },
      ],
      "omniroute",
      "https://gw.example.com"
    );
    assert.equal(m.limit.context, 50000);
    assert.equal(m.limit.output, 1000);
    assert.equal(m.capabilities.toolcall, false);
    assert.equal(m.api.id, "openai-compatible");
  });
  it("empty members short-circuit to all-false capabilities", () => {
    const m = mapComboToModelV2({ id: "combo-empty" }, [], "omniroute", "https://gw.example.com");
    assert.equal(m.capabilities.toolcall, false);
    assert.equal(m.capabilities.reasoning, false);
  });
  it("stamps the api block via resolveApiBlockV2 (openai-compatible by default)", () => {
    const m = mapComboToModelV2(
      { id: "combo-a", models: [{ kind: "model", model: "a" }] },
      [{ ...member("a") }],
      "omniroute",
      "https://gw.example.com"
    );
    assert.deepEqual(m.api, {
      id: "openai-compatible",
      url: "https://gw.example.com/v1",
      npm: "@ai-sdk/openai-compatible",
    });
  });
  it("routes an allowlisted combo id to anthropic even with mixed members", () => {
    const m = mapComboToModelV2(
      { id: "combo-a", models: [{ kind: "model", model: "gpt-x" }] },
      [{ ...member("gpt-x") }],
      "omniroute",
      "https://gw.example.com",
      { allowAnthropic: true, anthropicModels: ["combo-a"] }
    );
    assert.deepEqual(m.api, {
      id: "anthropic",
      url: "https://gw.example.com",
      npm: "@ai-sdk/anthropic",
    });
  });
  // Regression: combos must publish under the name the gateway advertises in
  // GET /v1/models (`id: combo.name`, src/app/api/v1/models/catalog.ts:986)
  // and routes in POST /v1/chat/completions (getComboByName,
  // open-sse/handlers/chatCore.ts:1439). `/api/combos` returns `id: <uuid>`
  // + `name: "<friendly>"`; keying off the uuid publishes an unselectable
  // `provider/<uuid>` model in the OpenCode picker and 400s at dispatch
  // ("Unable to determine provider"). The UUID must never leak into the id.
  it("uses the advertised combo NAME as the model id, not the internal id (uuid)", () => {
    const m = mapComboToModelV2(
      { id: "uuid-1234", name: "static-best-free", models: [{ kind: "model", model: "a" }] },
      [{ ...member("a") }],
      "omniroute",
      "https://gw.example.com"
    );
    assert.equal(m.id, "static-best-free");
    assert.equal(m.name, "static-best-free");
  });
  it("keeps names with spaces verbatim (the gateway routes the exact name)", () => {
    const m = mapComboToModelV2(
      { id: "uuid-5678", name: "Kimi Coding", models: [{ kind: "model", model: "a" }] },
      [{ ...member("a") }],
      "omniroute",
      "https://gw.example.com"
    );
    assert.equal(m.id, "Kimi Coding");
  });
  it("falls back to the combo id when the name is missing or blank", () => {
    const noName = mapComboToModelV2({ id: "combo-a" }, [], "omniroute", "https://gw.example.com");
    assert.equal(noName.id, "combo-a");
    const blankName = mapComboToModelV2(
      { id: "combo-b", name: "   " },
      [],
      "omniroute",
      "https://gw.example.com"
    );
    assert.equal(blankName.id, "combo-b");
  });
  it("trims surrounding whitespace from the name used as the model id", () => {
    const m = mapComboToModelV2(
      { id: "uuid-9", name: "  auto/best-coding  ", models: [{ kind: "model", model: "a" }] },
      [{ ...member("a") }],
      "omniroute",
      "https://gw.example.com"
    );
    assert.equal(m.id, "auto/best-coding");
  });
});
