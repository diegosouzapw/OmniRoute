import test from "node:test";
import assert from "node:assert/strict";
import { isUnifiedChatSourceModelSelectable } from "../../src/app/api/v1/models/catalogModelPolicy.ts";

test("#16929: public /v1/models does not advertise unsupported Gemini audio", () => {
  assert.equal(isUnifiedChatSourceModelSelectable("gemini", {
    id: "gemini-3.5-transcribe", supportedEndpoints: ["audio-transcriptions"],
    endpointCapabilitySource: "inferred",
  }), false);
  assert.equal(isUnifiedChatSourceModelSelectable("gemini", {
    id: "lyria-exp", supportedEndpoints: ["music"],
    endpointCapabilitySource: "inferred",
  }), false);
});

test("#16929: runnable, multi-endpoint and unknown models remain in the catalog", () => {
  assert.equal(isUnifiedChatSourceModelSelectable("vertex", {
    id: "lyria-002", supportedEndpoints: ["music"],
    endpointCapabilitySource: "declared",
  }), true);
  assert.equal(isUnifiedChatSourceModelSelectable("gemini", {
    id: "gemini-3.8-flash", supportedEndpoints: ["chat"],
    endpointCapabilitySource: "defaulted",
  }), true);
  assert.equal(isUnifiedChatSourceModelSelectable("unregistered-16929", {
    id: "model-x", supportedEndpoints: ["audio-transcriptions"],
    endpointCapabilitySource: "declared",
  }), true);
});
