/**
 * Claude Code fingerprint computation.
 *
 * The billing header includes a 3-char fingerprint derived from:
 *   SHA256(SALT + msg[4] + msg[7] + msg[20] + version)[:3]
 *
 * This fingerprint is computed from the first user message text and
 * included in cc_version=VERSION.FINGERPRINT in the billing header.
 */

import { createHash } from "node:crypto";

const FINGERPRINT_SALT = "59cf53e54c78";

export function computeFingerprint(firstUserMessageText: string, version: string): string {
  const indices = [4, 7, 20];
  const chars = indices.map((i) => firstUserMessageText[i] || "0").join("");
  const input = `${FINGERPRINT_SALT}${chars}${version}`;
  const hash = createHash("sha256").update(input).digest("hex");
  return hash.slice(0, 3);
}

export function extractFirstUserMessageText(
  messages: Array<{ role?: string; content?: unknown }> | undefined
): string {
  if (!Array.isArray(messages)) return "";
  for (const msg of messages) {
    if (String(msg?.role).toLowerCase() !== "user") continue;
    const content = msg?.content;
    if (typeof content === "string") return content;
    if (Array.isArray(content)) {
      for (const block of content) {
        if (
          block &&
          typeof block === "object" &&
          "text" in block &&
          typeof (block as Record<string, unknown>).text === "string"
        ) {
          return (block as Record<string, unknown>).text as string;
        }
      }
    }
    return "";
  }
  return "";
}
