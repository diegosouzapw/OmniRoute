import test from "node:test";
import assert from "node:assert/strict";

const { handleAudioTranscription } = await import("../../open-sse/handlers/audioTranscription.ts");

function buildFormData(): FormData {
  const formData = new FormData();
  formData.append("model", "kie/elevenlabs/speech-to-text");
  formData.append("file", new File([Buffer.from("audio")], "clip.wav", { type: "audio/wav" }));
  return formData;
}

test("Kie transcription returns text from every supported result envelope", async () => {
  const originalFetch = globalThis.fetch;
  const cases = [
    {
      name: "nested response",
      record: { data: { status: "SUCCESS", response: { text: "response text" } } },
      expected: "response text",
    },
    {
      name: "resultText fallback",
      record: {
        data: {
          status: "SUCCESS",
          response: { text: { malformed: true } },
          resultText: "result text",
        },
      },
      expected: "result text",
    },
    {
      name: "nested text fallback",
      record: { data: { status: "SUCCESS", text: "nested text" } },
      expected: "nested text",
    },
    {
      name: "top-level text fallback",
      record: { data: { status: "SUCCESS" }, text: "top-level text" },
      expected: "top-level text",
    },
  ];

  try {
    for (const testCase of cases) {
      const calls: string[] = [];
      globalThis.fetch = async (url, options = {}) => {
        const requestUrl = String(url);
        calls.push(requestUrl);

        if (requestUrl === "https://api.kie.ai/api/v1/jobs/createTask") {
          const payload = JSON.parse(String(options.body));
          assert.equal(payload.model, "elevenlabs/speech-to-text", testCase.name);
          return Response.json({ data: { taskId: "task-1" } });
        }

        assert.equal(
          requestUrl,
          "https://api.kie.ai/api/v1/jobs/recordInfo?taskId=task-1",
          testCase.name
        );
        return Response.json(testCase.record);
      };

      const response = await handleAudioTranscription({
        formData: buildFormData(),
        credentials: { apiKey: "kie-key" },
      });

      assert.equal(response.status, 200, testCase.name);
      assert.deepEqual(await response.json(), { text: testCase.expected }, testCase.name);
      assert.equal(calls.length, 2, testCase.name);
    }
  } finally {
    globalThis.fetch = originalFetch;
  }
});
