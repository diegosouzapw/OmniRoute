import { extractContent, capitalize, truncateMiddle } from "./content.ts";
import type { OpenAIMessage } from "./types.ts";

/**
 * Smart multi-turn truncation: keeps system + latest user + most recent
 * messages within `maxChars`, dropping oldest first. Mirrors the Python
 * `truncate_conversation` algorithm byte-for-byte.
 */
export function truncateConversation(messages: OpenAIMessage[], maxChars: number): string {
  const systemMessages = messages.filter((m) => m.role === "system");
  const nonSystem = messages.filter((m) => m.role !== "system");
  const latestUser = findLatestUser(nonSystem);
  const recent = nonSystem.filter((m) => m !== latestUser).reverse();

  const parts: string[] = [];
  for (const m of systemMessages) {
    const text = extractContent(m.content).trim();
    if (text) parts.push(`[System]\n${text}`);
  }
  let budget = maxChars - parts.join("\n\n").length;

  const latestLine = formatLatestUserLine(latestUser);
  if (latestLine) budget -= latestLine.length + 4;

  const recentParts = packRecentParts(recent, budget);
  const result = [...parts, ...recentParts];
  if (latestLine) result.push(latestLine);
  let joined = result.join("\n\n");
  if (joined.length > maxChars) joined = truncateMiddle(joined, maxChars);
  return joined;
}

function findLatestUser(nonSystem: OpenAIMessage[]): OpenAIMessage | null {
  for (let i = nonSystem.length - 1; i >= 0; i -= 1) {
    const m = nonSystem[i];
    if (m && m.role === "user") return m;
  }
  return null;
}

function formatLatestUserLine(latestUser: OpenAIMessage | null): string {
  if (!latestUser) return "";
  const role = capitalize(latestUser.role || "");
  const content = extractContent(latestUser.content).trim();
  return `[${role}]\n${content}`;
}

function packRecentParts(recent: OpenAIMessage[], budget: number): string[] {
  const recentParts: string[] = [];
  let remaining = budget;
  for (const m of recent) {
    if (remaining <= 100) break;
    const packed = packOneRecent(m, remaining);
    if (!packed) continue;
    recentParts.unshift(packed.line);
    remaining -= packed.cost;
    if (packed.done) break;
  }
  return recentParts;
}

function packOneRecent(
  m: OpenAIMessage,
  budget: number
): { line: string; cost: number; done: boolean } | null {
  const role = capitalize(m.role || "");
  const name = typeof m.name === "string" ? m.name : undefined;
  const tag = name ? `${role}(${name})` : role;
  const content = extractContent(m.content).trim();
  if (!content) return null;
  const line = `[${tag}]\n${content}`;
  if (line.length <= budget) return { line, cost: line.length + 4, done: false };
  const keep = budget - 30;
  if (keep <= 80) return null;
  const head = Math.floor(keep * 0.6);
  const tail = Math.floor(keep * 0.4);
  const truncated = `${content.slice(0, head)}\n[…truncated…]\n${content.slice(content.length - tail)}`;
  return { line: `[${tag}]\n${truncated}`, cost: 0, done: true };
}
