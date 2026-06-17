import test from "node:test";
import assert from "node:assert/strict";

const { sanitizeVscodeRequestBody, sanitizeVscodeRequest } =
  await import("../../src/app/api/v1/vscode/contextSanitizer.ts");

delete process.env.OMNIROUTE_VSCODE_SANITIZE_CONTEXT;

type FileAttachment = {
  filePath: string;
  content: string;
};

type TestMessage = {
  role: string;
  content: string;
};

type TestPayload = {
  attachments?: FileAttachment[];
  editorContext?: FileAttachment;
  messages?: TestMessage[];
};

test("vscode sanitizer preserves explicit attachments and strips implicit editor context", () => {
  const result = sanitizeVscodeRequestBody({
    messages: [
      {
        role: "user",
        content: "Review the attached Dockerfile.hermes.",
      },
    ],
    attachments: [
      {
        filePath: "/repo/Dockerfile.hermes",
        content: "FROM nousresearch/hermes-agent:latest",
      },
    ],
    editorContext: {
      filePath: "/repo/hermes-bootstrap.sh",
      content: "#!/usr/bin/env bash\necho should-not-forward",
    },
  });

  assert.equal(result.changed, true);
  const sanitizedBody = result.body as TestPayload;
  assert.equal(sanitizedBody.attachments?.[0].filePath, "/repo/Dockerfile.hermes");
  assert.equal(sanitizedBody.attachments?.[0].content.includes("nousresearch"), true);
  assert.equal("editorContext" in sanitizedBody, false);
  assert.deepEqual(result.audit.removedImplicitKeys, ["editorContext"]);
});

test("vscode sanitizer redacts sensitive explicit file contents", () => {
  const result = sanitizeVscodeRequestBody({
    attachments: [
      {
        filePath: "/repo/local-docs/server-access.md",
        content: "ssh password and production host details",
      },
    ],
  });

  assert.equal(result.changed, true);
  const sanitizedBody = result.body as TestPayload;
  assert.equal(sanitizedBody.attachments?.[0].filePath, "/repo/local-docs/server-access.md");
  assert.equal(sanitizedBody.attachments?.[0].content, "[REDACTED SENSITIVE CONTEXT]");
  assert.deepEqual(result.audit.redactedSensitivePaths, ["/repo/local-docs/server-access.md"]);
});

test("vscode sanitizer removes implicit editor text blocks unless they reference explicit files", () => {
  const result = sanitizeVscodeRequestBody({
    attachments: [
      {
        filePath: "/repo/Dockerfile.hermes",
        content: "FROM alpine",
      },
    ],
    messages: [
      {
        role: "user",
        content:
          "Current file:\n/repo/hermes-bootstrap.sh\nsecret bootstrap content\n\nUser request:\nReview the Dockerfile.hermes",
      },
    ],
  });

  assert.equal(result.changed, true);
  const sanitizedBody = result.body as TestPayload;
  assert.equal(sanitizedBody.messages?.[0].content.includes("hermes-bootstrap.sh"), false);
  assert.equal(sanitizedBody.messages?.[0].content.includes("User request:"), true);
});

test("vscode sanitizer leaves ordinary chat payloads unchanged", () => {
  const payload = {
    model: "gpt-5.5-medium",
    messages: [{ role: "user", content: "Explain Dockerfile best practices." }],
    stream: true,
  };
  const result = sanitizeVscodeRequestBody(payload);

  assert.equal(result.changed, false);
  assert.equal(result.body, payload);
  assert.deepEqual(result.audit.removedImplicitKeys, []);
  assert.deepEqual(result.audit.redactedSensitivePaths, []);
});

test("vscode request sanitizer rewrites JSON body and keeps auth headers", async () => {
  const request = new Request("http://localhost/api/v1/vscode/token/chat/completions", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-api-key": "test-key",
    },
    body: JSON.stringify({
      messages: [{ role: "user", content: "Analyze attachment" }],
      editorContext: { filePath: "/repo/open-file.ts", content: "not explicit" },
    }),
  });

  const sanitizedRequest = await sanitizeVscodeRequest(request);
  const body = (await sanitizedRequest.json()) as TestPayload;

  assert.equal(sanitizedRequest.headers.get("x-api-key"), "test-key");
  assert.equal("editorContext" in body, false);
});
