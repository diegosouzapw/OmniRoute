import assert from "node:assert/strict";
import test from "node:test";

import {
  AudioBridgeGuardrail,
  type AudioBridgeDependencies,
} from "../../../src/lib/guardrails/audioBridge.ts";
import {
  registerDefaultGuardrails,
  resetGuardrailsForTests,
} from "../../../src/lib/guardrails/registry.ts";
import { buildModalityBridgeHeader } from "../../../src/lib/guardrails/modalityBridge/bridgeStats.ts";

const audioPayload = () => ({
  model: "example/text-only",
  messages: [
    {
      role: "user",
      content: [
        { type: "input_audio", input_audio: { data: "UklGRg==", format: "wav" } },
        { type: "text", text: "What was said?" },
      ],
    },
  ],
});

const twoAudioPayload = () => ({
  model: "example/text-only",
  messages: [
    {
      role: "user",
      content: [
        { type: "input_audio", input_audio: { data: "UklGRjE=", format: "wav" } },
        { type: "audio_url", audio_url: { url: "data:audio/wav;base64,UklGRjI=" } },
      ],
    },
  ],
});

function createGuardrail(overrides: Partial<AudioBridgeDependencies> = {}) {
  return new AudioBridgeGuardrail({
    deps: {
      getSettings: async () => ({
        modalityBridgeAudioEnabled: true,
        modalityBridgeAudioModel: "deepgram/nova-3",
      }),
      getCapabilities: () => ({ supportsAudio: false }),
      selectModel: async () => "deepgram/nova-3",
      callTranscription: async () => "hello from the clip",
      ...overrides,
    },
  });
}

test("AudioBridgeGuardrail has the approved name and priority", () => {
  const guardrail = createGuardrail();
  assert.equal(guardrail.name, "audio-bridge");
  assert.equal(guardrail.priority, 6);
});

test("native audio-capable targets bypass transcription", async () => {
  let calls = 0;
  const guardrail = createGuardrail({
    getCapabilities: () => ({ supportsAudio: true }),
    callTranscription: async () => {
      calls += 1;
      return "should not run";
    },
  });

  const result = await guardrail.preCall(audioPayload(), {});
  assert.equal(calls, 0);
  assert.equal(result.modifiedPayload, undefined);
});

test("disabled settings and per-request disable both bypass transcription", async () => {
  let calls = 0;
  const disabledBySetting = createGuardrail({
    getSettings: async () => ({ modalityBridgeAudioEnabled: false }),
    callTranscription: async () => {
      calls += 1;
      return "should not run";
    },
  });
  const enabled = createGuardrail({
    callTranscription: async () => {
      calls += 1;
      return "should not run";
    },
  });

  assert.equal((await disabledBySetting.preCall(audioPayload(), {})).modifiedPayload, undefined);
  assert.equal(
    (
      await enabled.preCall(audioPayload(), {
        disabledGuardrails: ["audio-bridge"],
      })
    ).modifiedPayload,
    undefined
  );
  assert.equal(calls, 0);
});

test("text-only targets receive the STT transcript in place of audio", async () => {
  const guardrail = createGuardrail();
  const result = await guardrail.preCall(audioPayload(), {});
  const modified = result.modifiedPayload as ReturnType<typeof audioPayload>;

  assert.deepEqual(modified.messages[0].content[0], {
    type: "text",
    text: "[Audio 1]: hello from the clip",
  });
  assert.equal(modified.messages[0].content[1].text, "What was said?");
  assert.equal(result.meta?.clipsProcessed, 1);
  assert.equal(result.meta?.sttModel, "deepgram/nova-3");
  assert.equal(typeof result.meta?.processingTimeMs, "number");
});

test("all STT failures become explicit stubs for a proven text-only target", async () => {
  const guardrail = createGuardrail({
    callTranscription: async () => {
      throw new Error("no STT connection");
    },
  });

  const result = await guardrail.preCall(twoAudioPayload(), {});
  const modified = result.modifiedPayload as ReturnType<typeof twoAudioPayload>;
  assert.deepEqual(
    modified.messages[0].content.map((part) => ("text" in part ? part.text : null)),
    [
      "[Audio 1]: (unavailable — no STT provider connected)",
      "[Audio 2]: (unavailable — no STT provider connected)",
    ]
  );
  assert.equal(result.meta?.clipsProcessed, 2);
});

test("missing STT credentials become stubs for a proven text-only target", async () => {
  let calls = 0;
  const guardrail = createGuardrail({
    selectModel: async () => null,
    callTranscription: async () => {
      calls += 1;
      return "should not run";
    },
  });

  const result = await guardrail.preCall(audioPayload(), {});
  const modified = result.modifiedPayload as ReturnType<typeof audioPayload>;
  assert.equal(calls, 0);
  assert.deepEqual(modified.messages[0].content[0], {
    type: "text",
    text: "[Audio 1]: (unavailable — no STT provider connected)",
  });
  assert.equal(result.meta?.sttModel, "unavailable");
});

test("partial STT failure preserves only the failed audio part", async () => {
  const original = twoAudioPayload();
  const guardrail = createGuardrail({
    getSettings: async () => ({
      modalityBridgeAudioEnabled: true,
      modalityBridgeAudioModel: "deepgram/nova-3",
      modalityBridgeCacheEnabled: false,
    }),
    callTranscription: async (part) => {
      if (part.partIndex === 0) throw new Error("first failed");
      return "second succeeded";
    },
  });

  const result = await guardrail.preCall(original, {});
  const modified = result.modifiedPayload as ReturnType<typeof twoAudioPayload>;
  assert.deepEqual(modified.messages[0].content[0], original.messages[0].content[0]);
  assert.deepEqual(modified.messages[0].content[1], {
    type: "text",
    text: "[Audio 2]: second succeeded",
  });
  assert.equal(result.meta?.clipsProcessed, 1);
});

test("unknown target capability preserves audio when every STT call fails", async () => {
  const original = audioPayload();
  original.messages[0].content[0].input_audio.data = "dW5rbm93bi1hdWRpbw==";
  const snapshot = structuredClone(original);
  const guardrail = createGuardrail({
    getCapabilities: () => ({ supportsAudio: null }),
    getSettings: async () => ({
      modalityBridgeAudioEnabled: true,
      modalityBridgeAudioModel: "deepgram/nova-3",
      modalityBridgeCacheEnabled: false,
    }),
    callTranscription: async () => {
      throw new Error("temporary STT failure");
    },
  });

  const result = await guardrail.preCall(original, {});
  assert.equal(result.modifiedPayload, undefined);
  assert.deepEqual(original, snapshot, "the input object must not be mutated");
});

test("successful transcripts are reused from the shared cache", async () => {
  let calls = 0;
  const payload = audioPayload();
  payload.messages[0].content[0].input_audio.data = "Y2FjaGUtdW5pcXVl";
  const guardrail = createGuardrail({
    callTranscription: async () => {
      calls += 1;
      return "cached transcript";
    },
  });

  await guardrail.preCall(payload, {});
  await guardrail.preCall(payload, {});
  assert.equal(calls, 1);
});

test("maxClips limits work without dropping later audio parts", async () => {
  const original = twoAudioPayload();
  const guardrail = createGuardrail({
    getSettings: async () => ({
      modalityBridgeAudioEnabled: true,
      modalityBridgeAudioModel: "deepgram/nova-3",
      modalityBridgeAudioMaxClips: 1,
      modalityBridgeCacheEnabled: false,
    }),
  });

  const result = await guardrail.preCall(original, {});
  const modified = result.modifiedPayload as ReturnType<typeof twoAudioPayload>;
  assert.deepEqual(modified.messages[0].content[0], {
    type: "text",
    text: "[Audio 1]: hello from the clip",
  });
  assert.deepEqual(modified.messages[0].content[1], original.messages[0].content[1]);
});

test("default registry places Audio Bridge after Vision Bridge", () => {
  resetGuardrailsForTests({ registerDefaults: false });
  const names = registerDefaultGuardrails()
    .list()
    .map((guardrail) => guardrail.name);
  assert.deepEqual(names.slice(0, 2), ["vision-bridge", "audio-bridge"]);
  resetGuardrailsForTests();
});

test("audio transparency header is emitted only for transformed clips", () => {
  assert.equal(
    buildModalityBridgeHeader([
      {
        guardrail: "audio-bridge",
        meta: { clipsProcessed: 2, sttModel: "deepgram/nova-3" },
      },
    ]),
    "audio->text;model=deepgram/nova-3;parts=2"
  );
  assert.equal(
    buildModalityBridgeHeader([
      {
        guardrail: "audio-bridge",
        meta: { clipsProcessed: 2, sttModel: "deepgram/nova-3", rerouted: true },
      },
    ]),
    null
  );
  assert.equal(
    buildModalityBridgeHeader([
      {
        guardrail: "audio-bridge",
        meta: {
          clipsProcessed: 1,
          sttModel: "deepgram/nova-3\r\nx-injected: yes",
        },
      },
    ]),
    "audio->text;model=deepgram/nova-3__x-injected__yes;parts=1"
  );
});
