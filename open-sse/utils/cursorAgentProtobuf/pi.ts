import {
  decodeFields,
  decodeStringField,
  decodeVarintField,
  encodeMessage,
  encodeString,
  encodeUInt32Field,
} from "./wire.ts";

type BasePiExec = { execMsgId: number; execId: string };

export type PiExecEvent = BasePiExec &
  (
    | { kind: "exec_pi_read"; path: string; offset: number; limit: number }
    | { kind: "exec_pi_bash"; command: string; timeout: number }
    | {
        kind: "exec_pi_edit";
        path: string;
        edits: Array<{ oldText: string; newText: string }>;
      }
    | { kind: "exec_pi_write"; path: string; content: string }
    | {
        kind: "exec_pi_grep";
        pattern: string;
        path: string;
        glob: string;
        ignoreCase: boolean;
        literal: boolean;
        context: number;
        limit: number;
      }
    | { kind: "exec_pi_find"; pattern: string; path: string; limit: number }
    | { kind: "exec_pi_ls"; path: string; limit: number }
  );

export const PI_EXEC_SERVER_FIELDS = [45, 46, 47, 48, 49, 50, 51] as const;

/** Field numbers and arguments from the Cursor CLI's agent.v1 PI exec schemas. */
export function decodePiExecEvent(
  field: number,
  { execMsgId, execId, variantBytes }: BasePiExec & { variantBytes: Buffer }
): PiExecEvent {
  const base = { execMsgId, execId };
  switch (field) {
    case 45:
      return {
        ...base,
        kind: "exec_pi_read",
        path: decodeStringField(variantBytes, 1),
        offset: decodeVarintField(variantBytes, 2),
        limit: decodeVarintField(variantBytes, 3),
      };
    case 46:
      return {
        ...base,
        kind: "exec_pi_bash",
        command: decodeStringField(variantBytes, 1),
        timeout: decodeVarintField(variantBytes, 2),
      };
    case 47:
      return {
        ...base,
        kind: "exec_pi_edit",
        path: decodeStringField(variantBytes, 1),
        edits: decodeFields(variantBytes).flatMap((part) =>
          part.fieldNumber === 2 && part.wireType === 2
            ? [
                {
                  oldText: decodeStringField(part.bytes, 1),
                  newText: decodeStringField(part.bytes, 2),
                },
              ]
            : []
        ),
      };
    case 48:
      return {
        ...base,
        kind: "exec_pi_write",
        path: decodeStringField(variantBytes, 1),
        content: decodeStringField(variantBytes, 2),
      };
    case 49:
      return {
        ...base,
        kind: "exec_pi_grep",
        pattern: decodeStringField(variantBytes, 1),
        path: decodeStringField(variantBytes, 2),
        glob: decodeStringField(variantBytes, 3),
        ignoreCase: decodeVarintField(variantBytes, 4) !== 0,
        literal: decodeVarintField(variantBytes, 5) !== 0,
        context: decodeVarintField(variantBytes, 6),
        limit: decodeVarintField(variantBytes, 7),
      };
    case 50:
      return {
        ...base,
        kind: "exec_pi_find",
        pattern: decodeStringField(variantBytes, 1),
        path: decodeStringField(variantBytes, 2),
        limit: decodeVarintField(variantBytes, 3),
      };
    case 51:
      return {
        ...base,
        kind: "exec_pi_ls",
        path: decodeStringField(variantBytes, 1),
        limit: decodeVarintField(variantBytes, 2),
      };
    default:
      throw new RangeError(`Unknown PI exec variant field ${field}`);
  }
}

export function isPiExecEvent(event: { kind: string }): event is PiExecEvent {
  return PI_EXEC_SERVER_FIELDS.some((_, index) => event.kind === PI_EXEC_KINDS[index]);
}

const PI_EXEC_KINDS = [
  "exec_pi_read",
  "exec_pi_bash",
  "exec_pi_edit",
  "exec_pi_write",
  "exec_pi_grep",
  "exec_pi_find",
  "exec_pi_ls",
] as const;

/** ExecClientMessage PI result fields start one later than server PI args. */
export function encodePiExecResult(
  event: Pick<PiExecEvent, "kind" | "execMsgId" | "execId">,
  output: string,
  isError = false
): Buffer {
  const index = PI_EXEC_KINDS.indexOf(event.kind);
  const result = encodeMessage(isError ? 2 : 1, [encodeString(1, output)]);
  const payload = encodeMessage(2, [
    encodeUInt32Field(1, event.execMsgId),
    encodeString(15, event.execId),
    encodeMessage(46 + index, [result]),
  ]);
  const header = Buffer.alloc(5);
  header.writeUInt32BE(payload.length, 1);
  return Buffer.concat([header, payload]);
}
