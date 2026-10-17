const HEADER_SIZE = 13;
let input = Buffer.alloc(0);
let handshaken = false;

function vql(value) {
  if (!Number.isSafeInteger(value) || value < 0) throw new Error("invalid vql value");
  const bytes = [];
  let remaining = value;
  do {
    let next = remaining % 128;
    remaining = Math.floor(remaining / 128);
    if (remaining > 0) next |= 0x80;
    bytes.push(next);
  } while (remaining > 0);
  return Buffer.from(bytes);
}

function encode(value) {
  if (value === undefined) return Buffer.from([0]);
  if (typeof value === "string") {
    const bytes = Buffer.from(value, "utf8");
    return Buffer.concat([Buffer.from([1]), vql(bytes.length), bytes]);
  }
  if (Buffer.isBuffer(value) || value instanceof Uint8Array) {
    const bytes = Buffer.from(value);
    return Buffer.concat([Buffer.from([2]), vql(bytes.length), bytes]);
  }
  if (Array.isArray(value)) {
    return Buffer.concat([Buffer.from([4]), vql(value.length), ...value.map(encode)]);
  }
  if (typeof value === "number" && Number.isSafeInteger(value) && value >= 0) {
    return Buffer.concat([Buffer.from([6]), vql(value)]);
  }
  const bytes = Buffer.from(JSON.stringify(value), "utf8");
  return Buffer.concat([Buffer.from([5]), vql(bytes.length), bytes]);
}

function readVql(data, state) {
  let value = 0;
  let multiplier = 1;
  for (let i = 0; i < 8; i += 1) {
    if (state.offset >= data.length) throw new Error("truncated vql");
    const next = data[state.offset++];
    value += (next & 0x7f) * multiplier;
    if ((next & 0x80) === 0) return value;
    multiplier *= 128;
  }
  throw new Error("invalid vql");
}

function decode(data, state) {
  const type = data[state.offset++];
  if (type === 0) return undefined;
  if (type === 1 || type === 2) {
    const length = readVql(data, state);
    const end = state.offset + length;
    if (end > data.length) throw new Error("truncated bytes");
    const bytes = data.subarray(state.offset, end);
    state.offset = end;
    return type === 1 ? bytes.toString("utf8") : bytes;
  }
  if (type === 4) {
    const length = readVql(data, state);
    return Array.from({ length }, () => decode(data, state));
  }
  if (type === 5) {
    const length = readVql(data, state);
    const end = state.offset + length;
    const value = JSON.parse(data.subarray(state.offset, end).toString("utf8"));
    state.offset = end;
    return value;
  }
  if (type === 6) return readVql(data, state);
  throw new Error(`unknown type ${type}`);
}

function frame(body) {
  const result = Buffer.alloc(HEADER_SIZE + body.length);
  result.writeUInt8(1, 0);
  result.writeUInt32BE(0, 1);
  result.writeUInt32BE(0, 5);
  result.writeUInt32BE(body.length, 9);
  body.copy(result, HEADER_SIZE);
  return result;
}

function send(header, payload) {
  const packet = frame(Buffer.concat([encode(header), encode(payload)]));
  process.stdout.write(packet.subarray(0, 5));
  setTimeout(() => process.stdout.write(packet.subarray(5)), 1);
}

function response(id, payload) {
  send([201, id], payload);
}

function handleFrame(body) {
  const state = { offset: 0 };
  const header = decode(body, state);
  const args = decode(body, state);
  const id = Array.isArray(header) ? header[1] : undefined;
  const method = Array.isArray(header) ? header[3] : undefined;
  const request = Array.isArray(args) && args[0] && typeof args[0] === "object" ? args[0] : {};

  switch (method) {
    case "getView":
      response(id, {
        providers: [
          {
            providerId: "account:zai-individual-coding-plan",
            models: [
              { modelId: "GLM-5.2", config: { enabled: true } },
              {
                modelId: "GLM-5.3-Flash",
                config: {
                  enabled: true,
                  optionSpecs: { reasoningLevel: { values: ["low", "high", "max"] } },
                },
              },
            ],
          },
        ],
      });
      break;
    case "initialize":
      response(id, {
        available: true,
        protocolName: "ZCode Protocol",
        protocolVersion: 1,
        transportKind: "stdio",
      });
      break;
    case "generateWorkspaceText":
      if (
        request.selection?.providerId !== "account:zai-individual-coding-plan" ||
        !Array.isArray(request.messages)
      )
        process.exit(2);
      response(id, {
        text: request.messages.some(
          (message) =>
            Array.isArray(message.content) &&
            message.content.some(
              (part) =>
                part.type === "image" &&
                part.dataUrl === "data:image/png;base64,aGVsbG8=" &&
                part.mediaType === "image/png"
            )
        )
          ? "native image received"
          : request.messages.some((message) => message.role === "tool")
            ? "tool result consumed"
            : request.tools?.length
              ? ""
              : "fake zcode response",
        selection: request.selection,
        ...(request.tools?.length && !request.messages.some((message) => message.role === "tool")
          ? {
              toolCalls: [
                { id: "call_lookup", name: request.tools[0].name, input: { key: "bridge-check" } },
              ],
              finishReason: "tool-calls",
            }
          : { finishReason: "stop" }),
        usage: {
          inputTokens: 100,
          outputTokens: 12,
          totalTokens: 112,
          cacheReadTokens: 30,
          reasoningTokens: 4,
        },
      });
      break;
    case "createSession":
    case "sendPrompt":
    case "setModel":
    case "readSession":
      send([202, id], { message: "Inference must not launch an autonomous coding session" });
      break;
    default:
      response(id, { ok: true });
      break;
  }
}

function consumeFrames() {
  while (input.length >= HEADER_SIZE) {
    const length = input.readUInt32BE(9);
    const total = HEADER_SIZE + length;
    if (input.length < total) return;
    const body = input.subarray(HEADER_SIZE, total);
    input = input.subarray(total);
    handleFrame(body);
  }
}

process.stdout.write(
  `${JSON.stringify({ type: "zcode-hello", version: "fixture", platform: "test", arch: "test", pid: process.pid })}\n`
);

process.stdin.on("data", (chunk) => {
  input = Buffer.concat([input, chunk]);
  if (!handshaken) {
    const newline = input.indexOf(0x0a);
    if (newline < 0) return;
    const ack = JSON.parse(input.subarray(0, newline).toString("utf8"));
    if (ack.type !== "zcode-hello-ack") throw new Error("missing ZCode hello ack");
    input = input.subarray(newline + 1);
    handshaken = true;
    send([200], undefined);
  }
  consumeFrames();
});

process.stdin.on("end", () => process.exit(0));
