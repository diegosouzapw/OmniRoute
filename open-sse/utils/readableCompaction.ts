import { unsupportedFeature } from "../translator/request/openai-responses/helpers.ts";
import {
  BRIDGE_COMPACTION_PREFIX,
  SUMMARY_PREFIX,
} from "../vendor/codex-chatgpt-web/responses/compaction.ts";

const COMPACTION_TYPES = new Set(["compaction", "compaction_summary", "context_compaction"]);
const STRICT_BASE64 = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
type JsonRecord = Record<string, unknown>;

export function isEmptyContextCompactionMarker(value: unknown): boolean {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const item = value as JsonRecord;
  return (
    item.type === "context_compaction" &&
    (item.id === undefined || typeof item.id === "string") &&
    Object.keys(item).every((key) => key === "type" || key === "id")
  );
}

function decodeSummary(payload: string): string {
  try {
    if (!payload || !STRICT_BASE64.test(payload)) throw new Error("Invalid base64");
    const bytes = Buffer.from(payload, "base64");
    if (bytes.toString("base64") !== payload) throw new Error("Noncanonical base64");
    const summary = new TextDecoder("utf-8", { fatal: true, ignoreBOM: true }).decode(bytes);
    if (!summary.trim()) throw new Error("Empty summary");
    return summary;
  } catch {
    throw unsupportedFeature(
      "Invalid readable Responses compaction summary; resend a plaintext summary."
    );
  }
}

export function restoreReadableCompactionItem(item: JsonRecord): JsonRecord | null {
  const type = typeof item.type === "string" ? item.type : "";
  const content = item.encrypted_content;
  if (
    !COMPACTION_TYPES.has(type) ||
    typeof content !== "string" ||
    !content.startsWith(BRIDGE_COMPACTION_PREFIX)
  )
    return null;
  const summary = decodeSummary(content.slice(BRIDGE_COMPACTION_PREFIX.length));
  return {
    type: "message",
    role: "user",
    content: [{ type: "input_text", text: `${SUMMARY_PREFIX}\n\n${summary}` }],
  };
}
