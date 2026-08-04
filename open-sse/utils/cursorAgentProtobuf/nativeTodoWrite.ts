// Pure decoder for Cursor's native TodoWrite completion envelope. Kept separate
// from the main Agent codec so the frozen host remains below its file-size
// ceiling and TodoWrite's fail-closed wire semantics stay independently auditable.

import { WT_LEN, WT_VARINT, decodeFields, type Field } from "./wire.ts";

export type NativeTodoWriteCompletion = {
  kind: "native_todo_write";
  toolCallId: string;
  merge: boolean;
  todos: Array<{
    content: string;
    status: "pending" | "in_progress" | "completed" | "cancelled";
  }>;
};

// ToolCallCompletedUpdate { tool_call_id (1), tool_call (2) }
// ToolCall.todo_write (9) -> TodoWriteDetails.args (1)
// TodoWriteArgs { todos (1 repeated), merge (2) }
// TodoItem { content (2), status (3) }
const TCCU_TOOL_CALL_ID = 1;
const TCCU_TOOL_CALL = 2;
const TOOL_CALL_TODO_WRITE = 9;
const TODO_WRITE_ARGS = 1;
const TODO_ARGS_TODOS = 1;
const TODO_ARGS_MERGE = 2;
const TODO_ITEM_CONTENT = 2;
const TODO_ITEM_STATUS = 3;

function decodeNativeTodoStatus(
  value: bigint
): "pending" | "in_progress" | "completed" | "cancelled" | null {
  switch (value) {
    case 1n:
      return "pending";
    case 2n:
      return "in_progress";
    case 3n:
      return "completed";
    case 4n:
      return "cancelled";
    default:
      return null;
  }
}

function uniqueLenField(
  fields: Field[],
  fieldNumber: number
): Extract<Field, { wireType: 2 }> | null {
  const matches = fields.filter((field) => field.fieldNumber === fieldNumber);
  if (matches.length !== 1) return null;
  const field = matches[0];
  return field.wireType === WT_LEN ? field : null;
}

function uniqueVarintField(
  fields: Field[],
  fieldNumber: number
): Extract<Field, { wireType: 0 }> | null {
  const matches = fields.filter((field) => field.fieldNumber === fieldNumber);
  if (matches.length !== 1) return null;
  const field = matches[0];
  return field.wireType === WT_VARINT ? field : null;
}

function decodeNonEmptyUtf8(bytes: Buffer): string | null {
  const value = bytes.toString("utf8");
  if (!value || !Buffer.from(value, "utf8").equals(bytes)) return null;
  return value;
}

export function decodeNativeTodoWriteCompletion(payload: Buffer): NativeTodoWriteCompletion | null {
  const completedFields = decodeFields(payload);
  const toolCallIdField = uniqueLenField(completedFields, TCCU_TOOL_CALL_ID);
  const toolCallField = uniqueLenField(completedFields, TCCU_TOOL_CALL);
  if (!toolCallIdField || !toolCallField) return null;
  const toolCallId = decodeNonEmptyUtf8(toolCallIdField.bytes);
  if (!toolCallId) return null;

  const todoWriteField = uniqueLenField(decodeFields(toolCallField.bytes), TOOL_CALL_TODO_WRITE);
  if (!todoWriteField) return null;
  const argsField = uniqueLenField(decodeFields(todoWriteField.bytes), TODO_WRITE_ARGS);
  if (!argsField) return null;

  const argsFields = decodeFields(argsField.bytes);
  const todos: NativeTodoWriteCompletion["todos"] = [];
  const mergeFields = argsFields.filter((field) => field.fieldNumber === TODO_ARGS_MERGE);
  if (mergeFields.length > 1) return null;
  const mergeField =
    mergeFields.length === 1 ? uniqueVarintField(argsFields, TODO_ARGS_MERGE) : null;
  if (mergeFields.length === 1 && !mergeField) return null;
  const merge = mergeField ? mergeField.varint !== 0n : false;

  for (const field of argsFields) {
    if (field.fieldNumber === TODO_ARGS_MERGE) continue;
    if (field.fieldNumber !== TODO_ARGS_TODOS) continue;
    if (field.wireType !== WT_LEN) return null;
    const itemFields = decodeFields(field.bytes);
    const contentField = uniqueLenField(itemFields, TODO_ITEM_CONTENT);
    const statusField = uniqueVarintField(itemFields, TODO_ITEM_STATUS);
    if (!contentField || !statusField) return null;
    const content = decodeNonEmptyUtf8(contentField.bytes);
    const status = decodeNativeTodoStatus(statusField.varint);
    if (!content || !status) return null;
    todos.push({ content, status });
  }

  return { kind: "native_todo_write", toolCallId, merge, todos };
}
