import test from "node:test";
import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import http from "node:http";
import { WebSocketServer } from "ws";

const { AUDIO_TRANSCRIPTION_PROVIDERS, parseTranscriptionModel } =
  await import("../../open-sse/config/audioRegistry.ts");
const { extractPcmFrom16kWav, resolveLiveWsUrlAndHeaders, geminiLiveTranscribe } =
  await import("../../open-sse/executors/geminiLiveTranscribe.ts");
const { handleAudioTranscription } = await import("../../open-sse/handlers/audioTranscription.ts");

/**
 * Build a synthetic 16kHz 16-bit mono PCM WAV buffer for testing.
 */
function createSyntheticPcm16kWav(durationSec = 0.5): Buffer {
  const sampleRate = 16000;
  const numChannels = 1;
  const bitsPerSample = 16;
  const numSamples = Math.floor(sampleRate * durationSec);
  const dataSize = numSamples * (bitsPerSample / 8);

  const header = Buffer.alloc(44);
  header.write("RIFF", 0);
  header.writeUInt32LE(36 + dataSize, 4);
  header.write("WAVE", 8);
  header.write("fmt ", 12);
  header.writeUInt32LE(16, 16); // fmt chunk size
  header.writeUInt16LE(1, 20); // PCM
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE((sampleRate * numChannels * bitsPerSample) / 8, 28);
  header.writeUInt16LE((numChannels * bitsPerSample) / 8, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write("data", 36);
  header.writeUInt32LE(dataSize, 40);

  const pcmData = Buffer.alloc(dataSize);
  for (let i = 0; i < numSamples; i++) {
    // 440 Hz sine wave
    const sample = Math.sin((2 * Math.PI * 440 * i) / sampleRate) * 10000;
    pcmData.writeInt16LE(Math.floor(sample), i * 2);
  }

  return Buffer.concat([header, pcmData]);
}

/**
 * Spin up a mock Gemini Live WebSocket server on an ephemeral loopback port.
 */
function startMockLiveServer(): Promise<{
  server: http.Server;
  wss: WebSocketServer;
  url: string;
  close: () => Promise<void>;
}> {
  return new Promise((resolve) => {
    const server = http.createServer();
    const wss = new WebSocketServer({ server });

    server.listen(0, "127.0.0.1", () => {
      const addr = server.address();
      const port = typeof addr === "object" && addr ? addr.port : 0;
      const url = `ws://127.0.0.1:${port}`;
      resolve({
        server,
        wss,
        url,
        close: () =>
          new Promise((done) => {
            wss.close(() => {
              server.close(() => done());
            });
          }),
      });
    });
  });
}

test("audioRegistry registers gemini provider with gemini-3.5-transcribe-live model", () => {
  assert.ok(AUDIO_TRANSCRIPTION_PROVIDERS.gemini, "gemini provider must be registered");
  assert.equal(AUDIO_TRANSCRIPTION_PROVIDERS.gemini.id, "gemini");
  assert.equal(AUDIO_TRANSCRIPTION_PROVIDERS.gemini.format, "gemini-live");
  assert.equal(AUDIO_TRANSCRIPTION_PROVIDERS.gemini.authType, "apikey");
  assert.ok(
    AUDIO_TRANSCRIPTION_PROVIDERS.gemini.models.some((m) => m.id === "gemini-3.5-transcribe-live"),
    "must register gemini-3.5-transcribe-live"
  );
});

test("parseTranscriptionModel resolves gemini/gemini-3.5-transcribe-live and bare model", () => {
  assert.deepEqual(parseTranscriptionModel("gemini/gemini-3.5-transcribe-live"), {
    provider: "gemini",
    model: "gemini-3.5-transcribe-live",
  });
  assert.deepEqual(parseTranscriptionModel("gemini-3.5-transcribe-live"), {
    provider: "gemini",
    model: "gemini-3.5-transcribe-live",
  });
});

test("extractPcmFrom16kWav extracts raw PCM from 16kHz mono WAV", () => {
  const wav = createSyntheticPcm16kWav(0.1);
  const pcm = extractPcmFrom16kWav(wav);
  assert.ok(pcm, "should extract PCM buffer");
  assert.equal(pcm.length, 16000 * 0.1 * 2); // 3200 bytes
});

test("resolveLiveWsUrlAndHeaders handles apiKey and accessToken", () => {
  const withKey = resolveLiveWsUrlAndHeaders(
    { apiKey: "test-gemini-key" },
    "ws://localhost:9999/ws"
  );
  assert.ok(withKey.url.includes("key=test-gemini-key"));
  assert.equal(withKey.headers["x-goog-api-key"], "test-gemini-key");

  const withToken = resolveLiveWsUrlAndHeaders(
    { accessToken: "test-oauth-token" },
    "ws://localhost:9999/ws"
  );
  assert.ok(withToken.url.includes("access_token=test-oauth-token"));
  assert.equal(withToken.headers.Authorization, "Bearer test-oauth-token");

  assert.throws(() => {
    resolveLiveWsUrlAndHeaders({}, "ws://localhost:9999/ws");
  }, /No credentials/);
});

test("geminiLiveTranscribe transcribes file via mock Live WebSocket session", async () => {
  const mockServer = await startMockLiveServer();
  const captured: {
    setup?: Record<string, unknown>;
    chunks: string[];
    ended?: boolean;
    queryKey?: string;
  } = { chunks: [] };

  mockServer.wss.on("connection", (ws, req) => {
    const reqUrl = new URL(req.url || "", "ws://localhost");
    captured.queryKey = reqUrl.searchParams.get("key") || undefined;

    ws.on("message", (msg) => {
      const data = JSON.parse(msg.toString());
      if (data.setup) {
        captured.setup = data.setup;
        // Respond with setupComplete
        ws.send(JSON.stringify({ setupComplete: {} }));
      } else if (data.realtimeInput?.audio) {
        captured.chunks.push(data.realtimeInput.audio.data);
      } else if (data.realtimeInput?.audioStreamEnd) {
        captured.ended = true;
        // Emit input transcription then turn complete
        ws.send(
          JSON.stringify({
            serverContent: {
              inputTranscription: { text: "Testing gemini live transcription" },
            },
          })
        );
        ws.send(
          JSON.stringify({
            serverContent: {
              turnComplete: true,
            },
          })
        );
      }
    });
  });

  try {
    const wav = createSyntheticPcm16kWav(0.2);
    const text = await geminiLiveTranscribe(
      { apiKey: "secret-key" },
      {
        model: "gemini-3.5-transcribe-live",
        audioBuffer: wav,
        baseUrl: mockServer.url,
        prompt: "System instruction verbatim",
        language: "en",
      }
    );

    assert.equal(text, "Testing gemini live transcription");
    assert.equal(captured.queryKey, "secret-key");
    assert.equal(captured.setup?.model, "models/gemini-3.5-transcribe-live");
    assert.deepEqual(
      (captured.setup?.generationConfig as Record<string, unknown>)?.responseModalities,
      ["TEXT"]
    );
    assert.deepEqual(
      (captured.setup?.inputAudioTranscription as Record<string, unknown>)?.languageCodes,
      ["en"]
    );
    assert.ok(captured.chunks.length > 0, "should have sent audio chunks");
    assert.equal(captured.ended, true, "should have sent audioStreamEnd");
  } finally {
    await mockServer.close();
  }
});

test("geminiLiveTranscribe accumulates multiple inputTranscription chunks", async () => {
  const mockServer = await startMockLiveServer();

  mockServer.wss.on("connection", (ws) => {
    ws.on("message", (msg) => {
      const data = JSON.parse(msg.toString());
      if (data.setup) {
        ws.send(JSON.stringify({ setupComplete: {} }));
      } else if (data.realtimeInput?.audioStreamEnd) {
        ws.send(
          JSON.stringify({
            serverContent: {
              inputTranscription: { text: "Hello," },
            },
          })
        );
        ws.send(
          JSON.stringify({
            serverContent: {
              inputTranscription: { text: "this is segment two." },
              turnComplete: true,
            },
          })
        );
      }
    });
  });

  try {
    const wav = createSyntheticPcm16kWav(0.1);
    const text = await geminiLiveTranscribe(
      { apiKey: "test-key" },
      {
        model: "gemini-3.5-transcribe-live",
        audioBuffer: wav,
        baseUrl: mockServer.url,
      }
    );

    assert.equal(text, "Hello, this is segment two.");
  } finally {
    await mockServer.close();
  }
});

test("geminiLiveTranscribe returns empty text for music-only audio without error", async () => {
  const mockServer = await startMockLiveServer();

  mockServer.wss.on("connection", (ws) => {
    ws.on("message", (msg) => {
      const data = JSON.parse(msg.toString());
      if (data.setup) {
        ws.send(JSON.stringify({ setupComplete: {} }));
      } else if (data.realtimeInput?.audioStreamEnd) {
        // Music only: turn completes without any inputTranscription text
        ws.send(
          JSON.stringify({
            serverContent: {
              turnComplete: true,
            },
          })
        );
      }
    });
  });

  try {
    const wav = createSyntheticPcm16kWav(0.1);
    const text = await geminiLiveTranscribe(
      { apiKey: "test-key" },
      {
        model: "gemini-3.5-transcribe-live",
        audioBuffer: wav,
        baseUrl: mockServer.url,
      }
    );

    assert.equal(text, "");
  } finally {
    await mockServer.close();
  }
});

test("geminiLiveTranscribe surfaces upstream 429 quota error", async () => {
  const mockServer = await startMockLiveServer();

  mockServer.wss.on("connection", (ws) => {
    ws.on("message", (msg) => {
      const data = JSON.parse(msg.toString());
      if (data.setup) {
        ws.send(
          JSON.stringify({
            error: {
              code: 429,
              message: "Resource has been exhausted (check quota).",
            },
          })
        );
      }
    });
  });

  try {
    const wav = createSyntheticPcm16kWav(0.1);
    await assert.rejects(
      async () => {
        await geminiLiveTranscribe(
          { apiKey: "test-key" },
          {
            model: "gemini-3.5-transcribe-live",
            audioBuffer: wav,
            baseUrl: mockServer.url,
          }
        );
      },
      (err: unknown) => {
        const error = err as Error & { status?: number };
        assert.equal(error.status, 429);
        assert.match(error.message, /exhausted/);
        return true;
      }
    );
  } finally {
    await mockServer.close();
  }
});

test("handleAudioTranscription end-to-end dispatch for gemini/gemini-3.5-transcribe-live", async () => {
  const mockServer = await startMockLiveServer();

  mockServer.wss.on("connection", (ws) => {
    ws.on("message", (msg) => {
      const data = JSON.parse(msg.toString());
      if (data.setup) {
        ws.send(JSON.stringify({ setupComplete: {} }));
      } else if (data.realtimeInput?.audioStreamEnd) {
        ws.send(
          JSON.stringify({
            serverContent: {
              inputTranscription: { text: "Facade in, WebSocket out." },
              turnComplete: true,
            },
          })
        );
      }
    });
  });

  try {
    const wav = createSyntheticPcm16kWav(0.1);
    const file = new File([wav], "clip.wav", { type: "audio/wav" });
    const formData = new FormData();
    formData.append("model", "gemini/gemini-3.5-transcribe-live");
    formData.append("file", file);

    const response = await handleAudioTranscription({
      formData,
      credentials: {
        apiKey: "gemini-key-test",
        providerSpecificData: { baseUrl: mockServer.url },
      },
    });

    assert.equal(response.status, 200);
    const payload = (await response.json()) as { text: string };
    assert.equal(payload.text, "Facade in, WebSocket out.");
  } finally {
    await mockServer.close();
  }
});

test("handleAudioTranscription returns 200 with empty text for music-only on gemini-live", async () => {
  const mockServer = await startMockLiveServer();

  mockServer.wss.on("connection", (ws) => {
    ws.on("message", (msg) => {
      const data = JSON.parse(msg.toString());
      if (data.setup) {
        ws.send(JSON.stringify({ setupComplete: {} }));
      } else if (data.realtimeInput?.audioStreamEnd) {
        ws.send(
          JSON.stringify({
            serverContent: {
              turnComplete: true,
            },
          })
        );
      }
    });
  });

  try {
    const wav = createSyntheticPcm16kWav(0.1);
    const file = new File([wav], "music.wav", { type: "audio/wav" });
    const formData = new FormData();
    formData.append("model", "gemini/gemini-3.5-transcribe-live");
    formData.append("file", file);

    const response = await handleAudioTranscription({
      formData,
      credentials: {
        apiKey: "gemini-key-test",
        providerSpecificData: { baseUrl: mockServer.url },
      },
    });

    assert.equal(response.status, 200);
    const payload = (await response.json()) as { text: string };
    assert.equal(payload.text, "");
  } finally {
    await mockServer.close();
  }
});
