import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { test } from "node:test";
import { setTimeout as delay } from "node:timers/promises";
import { gzipSync } from "node:zlib";
import assert from "node:assert/strict";

import {
  DevinDesktopExecutor,
  encodeDevinDesktopRequest,
  resolveDevinDesktopExtensionVersion,
  resolveDevinDesktopVersion,
} from "../../../open-sse/executors/devin-desktop.ts";

function varint(value: number): Uint8Array {
  const bytes: number[] = [];
  let remaining = value;
  while (remaining >= 0x80) {
    bytes.push((remaining % 0x80) | 0x80);
    remaining = Math.floor(remaining / 0x80);
  }
  bytes.push(remaining);
  return Uint8Array.from(bytes);
}

function concat(...arrays: Uint8Array[]): Uint8Array {
  const result = new Uint8Array(arrays.reduce((total, bytes) => total + bytes.length, 0));
  let offset = 0;
  for (const bytes of arrays) {
    result.set(bytes, offset);
    offset += bytes.length;
  }
  return result;
}

function connectEnvelope(payload: Uint8Array, flags = 0): Uint8Array {
  const header = Buffer.alloc(5);
  header[0] = flags;
  header.writeUInt32BE(payload.length, 1);
  return concat(header, payload);
}

function bytesField(fieldNumber: number, payload: Uint8Array): Uint8Array {
  return concat(varint((fieldNumber << 3) | 2), varint(payload.length), payload);
}

function stringField(fieldNumber: number, value: string): Uint8Array {
  return bytesField(fieldNumber, new TextEncoder().encode(value));
}

function varintField(fieldNumber: number, value: number): Uint8Array {
  return concat(varint(fieldNumber << 3), varint(value));
}

function readVarint(bytes: Uint8Array, start: number): [number, number] {
  let value = 0;
  let multiplier = 1;
  let offset = start;
  while (offset < bytes.length) {
    const byte = bytes[offset++];
    value += (byte & 0x7f) * multiplier;
    if ((byte & 0x80) === 0) return [value, offset];
    multiplier *= 0x80;
  }
  throw new Error("truncated test protobuf");
}

function protobufFields(bytes: Uint8Array): Map<number, Array<number | Uint8Array>> {
  const fields = new Map<number, Array<number | Uint8Array>>();
  let offset = 0;
  while (offset < bytes.length) {
    let tag: number;
    [tag, offset] = readVarint(bytes, offset);
    const fieldNumber = Math.floor(tag / 8);
    const wireType = tag & 7;
    let value: number | Uint8Array;
    if (wireType === 0) {
      [value, offset] = readVarint(bytes, offset);
    } else if (wireType === 2) {
      let length: number;
      [length, offset] = readVarint(bytes, offset);
      value = bytes.slice(offset, offset + length);
      offset += length;
    } else {
      throw new Error(`unsupported test protobuf wire type ${wireType}`);
    }
    const entries = fields.get(fieldNumber) ?? [];
    entries.push(value);
    fields.set(fieldNumber, entries);
  }
  return fields;
}

function bytesValue(fields: Map<number, Array<number | Uint8Array>>, field: number): Uint8Array {
  const value = fields.get(field)?.[0];
  assert.ok(value instanceof Uint8Array);
  return value;
}

async function listen(
  handler: (request: IncomingMessage, response: ServerResponse) => void
): Promise<{ origin: string; close: () => Promise<void> }> {
  const server = createServer(handler);
  await new Promise<void>((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", () => {
      server.off("error", reject);
      resolve();
    });
  });
  const address = server.address();
  assert.ok(address && typeof address === "object");
  return {
    origin: `http://127.0.0.1:${address.port}`,
    close: () =>
      new Promise<void>((resolve, reject) => {
        server.close((error) => (error ? reject(error) : resolve()));
      }),
  };
}

// The fixed bytes below were transcribed from the relevant protobuf field numbers in the
// read-only descriptors bundled with Devin Desktop 3.6.27 (app commit 0becb483). They are not
// generated from the executor's encoder at test runtime.
test("Devin Desktop request encoder has a deterministic installed-schema golden", () => {
  const payload = encodeDevinDesktopRequest({
    apiKey: "key",
    model: "model-x",
    systemPrompt: "system",
    prompts: [
      { messageId: "u1", source: 1, prompt: "hello" },
      { messageId: "a1", source: 2, prompt: "answer" },
      { messageId: "t1", source: 4, prompt: "result", toolCallId: "call-1" },
    ],
    sessionId: "session",
    cascadeId: "cascade",
    userJwt: "jwt",
    ideVersion: "3.6.27",
    extensionVersion: "1.48.2",
  });

  assert.equal(
    Buffer.from(payload).toString("hex"),
    "0a3f0a0877696e64737572661206312e34382e321a036b65792205656e2d55533a06332e362e3237520773657373696f6e620877696e6473757266aa01036a7774120673797374656d1a0d0a02753110011a0568656c6c6f1a0e0a02613110021a06616e737765721a160a02743110041a06726573756c743a0663616c6c2d31380572076d6f64656c2d7882010763617363616465aa01076d6f64656c2d78"
  );
  const request = protobufFields(payload);
  assert.equal(new TextDecoder().decode(bytesValue(request, 2)), "system");
  assert.deepEqual(
    (request.get(3) ?? []).map((value) => {
      assert.ok(value instanceof Uint8Array);
      return protobufFields(value).get(2)?.[0];
    }),
    [1, 2, 4]
  );
  assert.equal(request.get(7)?.[0], 5);
});

test("Devin Desktop tool fixture uses only the proven request fields", () => {
  const payload = encodeDevinDesktopRequest({
    apiKey: "key",
    userJwt: "jwt",
    model: "model-x",
    systemPrompt: "",
    prompts: [
      { messageId: "u1", source: 1, prompt: "use tool" },
      {
        messageId: "a1",
        source: 2,
        prompt: "",
        toolCalls: [{ id: "history-call", name: "lookup", argumentsJson: '{"value":"old"}' }],
      },
    ],
    sessionId: "session",
    cascadeId: "cascade",
    tools: [
      {
        name: "lookup",
        description: "Look up a value",
        jsonSchemaString: '{"type":"object"}',
        strict: true,
      },
    ],
    disableParallelToolCalls: true,
    toolChoice: { toolName: "lookup" },
  });
  const request = protobufFields(payload);
  assert.equal(request.get(7)?.[0], 5);
  const tool = protobufFields(bytesValue(request, 10));
  assert.equal(new TextDecoder().decode(bytesValue(tool, 1)), "lookup");
  assert.equal(new TextDecoder().decode(bytesValue(tool, 2)), "Look up a value");
  assert.equal(new TextDecoder().decode(bytesValue(tool, 3)), '{"type":"object"}');
  assert.equal(tool.get(12)?.[0], 1);
  assert.equal(request.get(11)?.[0], 1);
  const choice = protobufFields(bytesValue(request, 12));
  assert.equal(new TextDecoder().decode(bytesValue(choice, 2)), "lookup");
  const assistantPromptValue = request.get(3)?.[1];
  assert.ok(assistantPromptValue instanceof Uint8Array);
  const assistantPrompt = protobufFields(assistantPromptValue);
  assert.equal(assistantPrompt.get(2)?.[0], 2);
  const historyCall = protobufFields(bytesValue(assistantPrompt, 6));
  assert.equal(new TextDecoder().decode(bytesValue(historyCall, 1)), "history-call");
  assert.equal(new TextDecoder().decode(bytesValue(historyCall, 2)), "lookup");
  assert.equal(new TextDecoder().decode(bytesValue(historyCall, 3)), '{"value":"old"}');
});

test("Devin Desktop and bundled extension versions remain distinct validated values", () => {
  const oldDesktop = process.env.DEVIN_DESKTOP_VERSION;
  const oldExtension = process.env.DEVIN_DESKTOP_EXTENSION_VERSION;
  try {
    process.env.DEVIN_DESKTOP_VERSION = "9.8.7";
    process.env.DEVIN_DESKTOP_EXTENSION_VERSION = "2.3.4";
    assert.equal(resolveDevinDesktopVersion(), "9.8.7");
    assert.equal(resolveDevinDesktopExtensionVersion(), "2.3.4");

    process.env.DEVIN_DESKTOP_VERSION = "not-a-version";
    process.env.DEVIN_DESKTOP_EXTENSION_VERSION = "3.6.27-beta";
    assert.equal(resolveDevinDesktopVersion(), "3.6.27");
    assert.equal(resolveDevinDesktopExtensionVersion(), "1.48.2");
  } finally {
    if (oldDesktop === undefined) delete process.env.DEVIN_DESKTOP_VERSION;
    else process.env.DEVIN_DESKTOP_VERSION = oldDesktop;
    if (oldExtension === undefined) delete process.env.DEVIN_DESKTOP_EXTENSION_VERSION;
    else process.env.DEVIN_DESKTOP_EXTENSION_VERSION = oldExtension;
  }
});

test("Devin Desktop performs raw-key auth then preserves Connect stream output", async () => {
  const requestPaths: string[] = [];
  let authHeaders: IncomingMessage["headers"] = {};
  let chatHeaders: IncomingMessage["headers"] = {};
  let authBody = Buffer.alloc(0);
  let chatBody = Buffer.alloc(0);
  const mock = await listen((request, response) => {
    const chunks: Buffer[] = [];
    request.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    request.on("end", () => {
      const body = Buffer.concat(chunks);
      const path = request.url ?? "";
      requestPaths.push(path);
      if (path === "/exa.auth_pb.AuthService/GetUserJwt") {
        authHeaders = request.headers;
        authBody = body;
        response.writeHead(200, { "Content-Type": "application/proto" });
        response.end(
          concat(stringField(1, "jwt-value"), stringField(2, "https://enterprise.example.invalid"))
        );
        return;
      }

      chatHeaders = request.headers;
      chatBody = body;
      const usage = concat(
        varintField(2, 11),
        varintField(3, 4),
        varintField(4, 2),
        varintField(5, 3)
      );
      const toolCall = concat(
        stringField(1, "call-1"),
        stringField(2, "lookup"),
        stringField(3, '{"value":"x"}')
      );
      const responseMessage = concat(
        stringField(3, "hello"),
        varintField(5, 10),
        bytesField(6, toolCall),
        bytesField(7, usage),
        stringField(9, "thinking")
      );
      const dataFrame = connectEnvelope(responseMessage);
      const endFrame = connectEnvelope(new TextEncoder().encode("{}"), 0x02);
      response.writeHead(200, { "Content-Type": "application/connect+proto" });
      response.write(dataFrame.slice(0, 3));
      response.write(dataFrame.slice(3));
      response.end(endFrame);
    });
  });

  try {
    const result = await new DevinDesktopExecutor().execute({
      model: "model-x",
      body: {
        messages: [
          { role: "system", content: "system" },
          { role: "user", content: "hello" },
          {
            role: "assistant",
            content: "",
            tool_calls: [
              {
                id: "history-call",
                type: "function",
                function: { name: "lookup", arguments: '{"value":"old"}' },
              },
            ],
          },
          { role: "tool", content: "old result", tool_call_id: "history-call" },
          { role: "user", content: "continue" },
        ],
        conversation_id: "cascade-fixed",
        tools: [
          {
            type: "function",
            function: {
              name: "lookup",
              description: "Look up a value",
              parameters: { type: "object" },
              strict: true,
            },
          },
        ],
        parallel_tool_calls: false,
        tool_choice: { type: "function", function: { name: "lookup" } },
      },
      stream: true,
      credentials: {
        accessToken: "raw-imported-key",
        providerSpecificData: { baseUrl: mock.origin },
      },
    });
    const sse = await result.response.text();

    assert.deepEqual(requestPaths, [
      "/exa.auth_pb.AuthService/GetUserJwt",
      "/exa.api_server_pb.ApiServerService/GetChatMessage",
    ]);
    assert.equal(authHeaders["content-type"], "application/proto");
    assert.equal(authHeaders["connect-protocol-version"], "1");
    assert.equal(authHeaders.accept, "*/*");
    assert.equal(authHeaders.authorization, undefined);
    const authRequest = protobufFields(authBody);
    const authMetadata = protobufFields(bytesValue(authRequest, 1));
    assert.equal(new TextDecoder().decode(bytesValue(authMetadata, 3)), "raw-imported-key");

    assert.equal(chatHeaders["content-type"], "application/connect+proto");
    assert.equal(chatHeaders["connect-protocol-version"], "1");
    assert.equal(chatHeaders.authorization, undefined);
    assert.equal(chatBody[0], 0);
    assert.equal(chatBody.readUInt32BE(1), chatBody.length - 5);
    const chatRequest = protobufFields(chatBody.subarray(5));
    const chatMetadata = protobufFields(bytesValue(chatRequest, 1));
    assert.equal(new TextDecoder().decode(bytesValue(chatMetadata, 3)), "raw-imported-key");
    assert.equal(new TextDecoder().decode(bytesValue(chatMetadata, 21)), "jwt-value");
    assert.equal(new TextDecoder().decode(bytesValue(chatRequest, 14)), "model-x");
    assert.equal(new TextDecoder().decode(bytesValue(chatRequest, 21)), "model-x");
    assert.equal(chatRequest.get(7)?.[0], 5);
    const historyPrompts = (chatRequest.get(3) ?? []).map((value) => {
      assert.ok(value instanceof Uint8Array);
      return protobufFields(value);
    });
    const sentAssistant = historyPrompts.find((prompt) => prompt.get(2)?.[0] === 2);
    assert.ok(sentAssistant);
    const sentHistoryCall = protobufFields(bytesValue(sentAssistant, 6));
    assert.equal(new TextDecoder().decode(bytesValue(sentHistoryCall, 1)), "history-call");
    assert.equal(new TextDecoder().decode(bytesValue(sentHistoryCall, 2)), "lookup");
    assert.equal(new TextDecoder().decode(bytesValue(sentHistoryCall, 3)), '{"value":"old"}');
    const sentToolResult = historyPrompts.find((prompt) => prompt.get(2)?.[0] === 4);
    assert.ok(sentToolResult);
    assert.equal(new TextDecoder().decode(bytesValue(sentToolResult, 7)), "history-call");
    assert.equal(chatRequest.get(11)?.[0], 1);
    const sentTool = protobufFields(bytesValue(chatRequest, 10));
    assert.equal(new TextDecoder().decode(bytesValue(sentTool, 1)), "lookup");
    assert.equal(sentTool.get(12)?.[0], 1);
    const sentChoice = protobufFields(bytesValue(chatRequest, 12));
    assert.equal(new TextDecoder().decode(bytesValue(sentChoice, 2)), "lookup");
    assert.ok(Buffer.from(result.transformedBody as Uint8Array).includes(Buffer.from("model-x")));
    assert.match(sse, /"reasoning_content":"thinking"/);
    assert.match(sse, /"content":"hello"/);
    assert.match(sse, /"prompt_tokens":11/);
    assert.match(sse, /"completion_tokens":4/);
    assert.match(sse, /"cached_tokens":3/);
    assert.match(sse, /"cache_write_tokens":2/);
    assert.match(sse, /"tool_calls":\[\{"index":0,"id":"call-1","type":"function"/);
    assert.match(sse, /"name":"lookup","arguments":"\{\\"value\\":\\"x\\"\}"/);
    assert.match(sse, /"finish_reason":"tool_calls"/);
    assert.match(sse, /data: \[DONE\]/);
  } finally {
    await mock.close();
  }
});

test("Devin Desktop stops reading when the terminal Connect envelope arrives", async () => {
  let resolveChatClosed: (() => void) | undefined;
  const chatClosed = new Promise<void>((resolve) => {
    resolveChatClosed = resolve;
  });
  const mock = await listen((request, response) => {
    request.resume();
    request.on("end", () => {
      if (request.url === "/exa.auth_pb.AuthService/GetUserJwt") {
        response.writeHead(200, { "Content-Type": "application/proto" });
        response.end(stringField(1, "jwt-value"));
        return;
      }
      response.on("close", () => resolveChatClosed?.());
      response.writeHead(200, { "Content-Type": "application/connect+proto" });
      response.write(connectEnvelope(stringField(3, "hello")));
      response.write(connectEnvelope(new TextEncoder().encode("{}"), 0x02));
      // Intentionally keep the HTTP response open. END_STREAM is the protocol terminal.
    });
  });

  try {
    const result = await new DevinDesktopExecutor().execute({
      model: "model-x",
      body: { messages: [{ role: "user", content: "hello" }] },
      stream: true,
      credentials: {
        accessToken: "test-imported-key",
        providerSpecificData: { baseUrl: mock.origin },
      },
    });
    const timeout = delay(500).then(() => {
      throw new Error("terminal Connect envelope did not finish promptly");
    });
    const sse = await Promise.race([result.response.text(), timeout]);
    await Promise.race([chatClosed, timeout]);
    assert.match(sse, /"content":"hello"/);
    assert.match(sse, /data: \[DONE\]/);
  } finally {
    await mock.close();
  }
});

test("Devin Desktop bounds decompressed Connect frames", async () => {
  const oversized = gzipSync(Buffer.alloc(16 * 1024 * 1024 + 1, 0x61));
  const mock = await listen((request, response) => {
    request.resume();
    request.on("end", () => {
      if (request.url === "/exa.auth_pb.AuthService/GetUserJwt") {
        response.writeHead(200, { "Content-Type": "application/proto" });
        response.end(stringField(1, "jwt-value"));
        return;
      }
      response.writeHead(200, { "Content-Type": "application/connect+proto" });
      response.write(connectEnvelope(new Uint8Array(oversized), 0x01));
      // Keep the upstream open so the decoder error must cancel its reader/socket.
    });
  });

  try {
    const result = await new DevinDesktopExecutor().execute({
      model: "model-x",
      body: { messages: [{ role: "user", content: "hello" }] },
      stream: true,
      credentials: {
        accessToken: "test-imported-key",
        providerSpecificData: { baseUrl: mock.origin },
      },
    });
    const sse = await result.response.text();
    assert.match(sse, /devin_desktop_error/);
    assert.match(sse, /data: \[DONE\]/);
    assert.ok(sse.length < 4096, "oversized decompressed content must not reach the SSE output");
  } finally {
    await mock.close();
  }
});

test("Devin Desktop sanitizes Connect end-stream errors before emitting SSE", async () => {
  const mock = await listen((request, response) => {
    request.resume();
    request.on("end", () => {
      if (request.url === "/exa.auth_pb.AuthService/GetUserJwt") {
        response.writeHead(200, { "Content-Type": "application/proto" });
        response.end(stringField(1, "jwt-value"));
        return;
      }
      const trailer = JSON.stringify({
        error: {
          code: "internal",
          message: "failure at /Users/private/project/file.ts\n    at secret stack",
        },
      });
      response.writeHead(200, { "Content-Type": "application/connect+proto" });
      response.end(connectEnvelope(new TextEncoder().encode(trailer), 0x02));
    });
  });

  try {
    const result = await new DevinDesktopExecutor().execute({
      model: "model-x",
      body: { messages: [{ role: "user", content: "hello" }] },
      stream: true,
      credentials: {
        accessToken: "test-imported-key",
        providerSpecificData: { baseUrl: mock.origin },
      },
    });
    const sse = await result.response.text();
    assert.match(sse, /devin_desktop_error/);
    assert.match(sse, /<path>/);
    assert.doesNotMatch(sse, /\/Users\/private/);
    assert.doesNotMatch(sse, /secret stack/);
    assert.match(sse, /data: \[DONE\]/);
  } finally {
    await mock.close();
  }
});

test("Devin Desktop sanitizes auth failures and never issues chat", async () => {
  const paths: string[] = [];
  const mock = await listen((request, response) => {
    paths.push(request.url ?? "");
    request.resume();
    request.on("end", () => {
      response.writeHead(401, { "Content-Type": "text/plain" });
      response.end("auth failure at /Users/private/token.txt\n    at leaked stack");
    });
  });

  try {
    const result = await new DevinDesktopExecutor().execute({
      model: "model-x",
      body: { messages: [{ role: "user", content: "hello" }] },
      stream: true,
      credentials: {
        accessToken: "raw-imported-key",
        providerSpecificData: { baseUrl: mock.origin },
      },
    });
    const body = await result.response.text();
    assert.equal(result.response.status, 401);
    assert.deepEqual(paths, ["/exa.auth_pb.AuthService/GetUserJwt"]);
    assert.match(body, /Devin Desktop authentication returned HTTP 401/);
    assert.doesNotMatch(body, /\/Users\/private/);
    assert.doesNotMatch(body, /leaked stack/);
  } finally {
    await mock.close();
  }
});
