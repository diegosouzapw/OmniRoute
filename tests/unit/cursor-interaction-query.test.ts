import type { ClientHttp2Stream } from "node:http2";
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  decodeInteractionQuery,
  encodeInteractionResponseFrame,
  iterateConnectFrames,
} from "../../open-sse/utils/cursorAgentProtobuf.ts";
import {
  encodeMessage,
  encodeUInt32Field,
  encodeString,
  decodeFields,
  findField,
  decodeStringField,
} from "../../open-sse/utils/cursorAgentProtobuf/wire.ts";
import { processFrame, type StreamCtx } from "../../open-sse/executors/cursor.ts";

describe("Part B - Cursor interaction_query auto-response", () => {
  it("decodes interaction_query with id and variantField", () => {
    // AgentServerMessage: field 7 = interaction_query
    // interaction_query: id = 1, webFetch (variant 9)
    const innerQuery = encodeMessage(7, [
      encodeUInt32Field(1, 42),
      encodeMessage(9, [encodeString(1, "https://example.com")]),
    ]);

    const decoded = decodeInteractionQuery(innerQuery);
    assert.ok(decoded);
    assert.equal(decoded.id, 42);
    assert.equal(decoded.variantField, 9);
  });

  it("encodes interaction_response frame for approval variant (webFetch = 9)", () => {
    const frame = encodeInteractionResponseFrame(42, 9);
    assert.ok(frame);

    // Frame is Connect-RPC wrapped
    const frames = Array.from(iterateConnectFrames(frame));
    assert.equal(frames.length, 1);
    const payload = frames[0].payload;

    // AgentClientMessage: field 6 = interaction_response
    const acmFields = decodeFields(payload);
    const irField = findField(acmFields, 6);
    assert.ok(irField && irField.wireType === 2, "has interaction_response field 6");

    // Inside interaction_response: field 1 = id (42), field 9 = webFetchRequestResponse
    const irFields = decodeFields(irField.bytes);
    const idField = findField(irFields, 1);
    assert.ok(idField && idField.wireType === 0);
    assert.equal(Number(idField.varint), 42);

    const variantField = findField(irFields, 9);
    assert.ok(variantField && variantField.wireType === 2, "has variant field 9");
    // WebFetchRequestResponse: approved = 1 (empty message)
    const variantFields = decodeFields(variantField.bytes);
    const approvedField = findField(variantFields, 1);
    assert.ok(approvedField && approvedField.wireType === 2);
    assert.equal(approvedField.bytes.length, 0);
  });

  it("encodes interaction_response frame for reject variant (askQuestion = 3)", () => {
    const frame = encodeInteractionResponseFrame(101, 3);
    assert.ok(frame);

    const frames = Array.from(iterateConnectFrames(frame));
    assert.equal(frames.length, 1);
    const payload = frames[0].payload;

    const acmFields = decodeFields(payload);
    const irField = findField(acmFields, 6);
    assert.ok(irField && irField.wireType === 2);

    const irFields = decodeFields(irField.bytes);
    const idField = findField(irFields, 1);
    assert.equal(Number(idField?.varint), 101);

    const variantField = findField(irFields, 3);
    assert.ok(variantField && variantField.wireType === 2);

    // AskQuestionInteractionResponse: result = 1 -> rejected = 3 -> reason = 1
    // result (field 1)
    const resField = findField(decodeFields(variantField.bytes), 1);
    assert.ok(resField && resField.wireType === 2);
    // rejected (field 3)
    const rejField = findField(decodeFields(resField.bytes), 3);
    assert.ok(rejField && rejField.wireType === 2);
    // reason (field 1)
    const reason = decodeStringField(rejField.bytes, 1);
    assert.equal(reason, "not implemented by this client");
  });

  it("encodes interaction_response frame for switchMode (4) and createPlan (7), returns null for setupVm (8)", () => {
    // switchMode (4): rejected = 2 -> reason = 1
    const frame4 = encodeInteractionResponseFrame(202, 4);
    assert.ok(frame4);
    const p4 = Array.from(iterateConnectFrames(frame4))[0].payload;
    const ir4 = findField(decodeFields(p4), 6);
    assert.ok(ir4 && ir4.wireType === 2);
    const vf4 = findField(decodeFields(ir4.bytes), 4);
    assert.ok(vf4 && vf4.wireType === 2);
    const rej4 = findField(decodeFields(vf4.bytes), 2);
    assert.ok(rej4 && rej4.wireType === 2);
    assert.equal(decodeStringField(rej4.bytes, 1), "not implemented by this client");

    // createPlan (7): result = 1 -> error = 2 -> error = 1
    const frame7 = encodeInteractionResponseFrame(203, 7);
    assert.ok(frame7);
    const p7 = Array.from(iterateConnectFrames(frame7))[0].payload;
    const ir7 = findField(decodeFields(p7), 6);
    assert.ok(ir7 && ir7.wireType === 2);
    const vf7 = findField(decodeFields(ir7.bytes), 7);
    assert.ok(vf7 && vf7.wireType === 2);
    const res7 = findField(decodeFields(vf7.bytes), 1);
    assert.ok(res7 && res7.wireType === 2);
    const err7 = findField(decodeFields(res7.bytes), 2);
    assert.ok(err7 && err7.wireType === 2);
    assert.equal(decodeStringField(err7.bytes, 1), "not implemented by this client");

    // setupVm (8): returns null
    const frame8 = encodeInteractionResponseFrame(204, 8);
    assert.equal(frame8, null);
  });

  it("processFrame responds to interaction_query and idempotently avoids duplicate writes", () => {
    const writtenFrames: Buffer[] = [];
    const mockH2Req = {
      write(buf: Buffer) {
        writtenFrames.push(buf);
      },
    } as unknown as ClientHttp2Stream;

    const ctx: StreamCtx = {
      controller: {
        enqueue() {},
        close() {},
        error() {},
      } as unknown as ReadableStreamDefaultController<Uint8Array>,
      encoder: new TextEncoder(),
      created: 12345,
      model: "cursor-fast",
      totalText: "",
      thinkingText: "",
      receivedText: false,
      emittedRoleChunk: false,
      endReason: null,
      toolCalls: [],
      toolCallArgBuffers: new Map(),
      toolCallIndexMap: new Map(),
      requiresColdResume: false,
    };

    const acked = new Set<string>();

    const queryPayload = encodeMessage(7, [
      encodeUInt32Field(1, 555),
      encodeMessage(2, []), // webSearch (2)
    ]);

    processFrame(queryPayload, ctx, acked, { h2Req: mockH2Req });
    assert.equal(writtenFrames.length, 1);
    assert.ok(acked.has("iq:555"));

    // Second call with same query should be deduped
    processFrame(queryPayload, ctx, acked, { h2Req: mockH2Req });
    assert.equal(writtenFrames.length, 1);
  });
});
