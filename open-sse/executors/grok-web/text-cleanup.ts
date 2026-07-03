// Grok markup cleanup (pure). Extracted verbatim from grok-web.ts.
import type { GrokStreamResponse } from "./types.ts";

// ─── Grok markup cleanup ────────────────────────────────────────────────────

export const BLOCKED_GROK_MARKUP = [
  { start: "<xai:tool_usage_card", end: "</xai:tool_usage_card>" },
] as const;

export const PARTIAL_GROK_MARKER_KEEP = 32;

export function stripLooseGrokMarkup(text: string): string {
  return text
    .replace(/<\/?xai:[^>]*>/g, "")
    .replace(/<\/?grok:[^>]*>/g, "")
    .replace(/<\/?argument\b[^>]*>/g, "")
    .replace(/<!\[CDATA\[/g, "")
    .replace(/\]\]>/g, "");
}

export class GrokMarkupFilter {
  private buffer = "";
  private suppressedUntil: string | null = null;

  feed(text: string): string {
    if (!text) return "";
    this.buffer += text;
    return this.drain(false);
  }

  flush(): string {
    const out = this.drain(true);
    this.buffer = "";
    this.suppressedUntil = null;
    return out;
  }

  private drain(flush: boolean): string {
    let out = "";

    while (this.buffer) {
      if (this.suppressedUntil) {
        const endIdx = this.buffer.indexOf(this.suppressedUntil);
        if (endIdx < 0) {
          this.buffer = this.buffer.slice(this.longestEndPrefixStart(this.suppressedUntil));
          return out;
        }
        this.buffer = this.buffer.slice(endIdx + this.suppressedUntil.length);
        this.suppressedUntil = null;
        continue;
      }

      let nextStart = -1;
      let nextEnd = "";
      for (const marker of BLOCKED_GROK_MARKUP) {
        const idx = this.buffer.indexOf(marker.start);
        if (idx >= 0 && (nextStart < 0 || idx < nextStart)) {
          nextStart = idx;
          nextEnd = marker.end;
        }
      }

      if (nextStart < 0) {
        if (!flush) {
          const lastLt = this.buffer.lastIndexOf("<");
          if (lastLt >= 0 && this.buffer.length - lastLt <= PARTIAL_GROK_MARKER_KEEP) {
            out += stripLooseGrokMarkup(this.buffer.slice(0, lastLt));
            this.buffer = this.buffer.slice(lastLt);
            return out;
          }
        }
        out += stripLooseGrokMarkup(this.buffer);
        this.buffer = "";
        return out;
      }

      out += stripLooseGrokMarkup(this.buffer.slice(0, nextStart));
      this.buffer = this.buffer.slice(nextStart);
      const endIdx = this.buffer.indexOf(nextEnd);
      const openTagEndIdx = this.buffer.indexOf(">");
      if (openTagEndIdx >= 0 && /\/\s*>$/.test(this.buffer.slice(0, openTagEndIdx + 1))) {
        this.buffer = this.buffer.slice(openTagEndIdx + 1);
        continue;
      }
      if (endIdx < 0) {
        this.suppressedUntil = nextEnd;
        this.buffer = this.buffer.slice(this.longestEndPrefixStart(nextEnd));
        return out;
      }
      this.buffer = this.buffer.slice(endIdx + nextEnd.length);
    }

    return out;
  }

  private longestEndPrefixStart(end: string): number {
    const max = Math.min(this.buffer.length, end.length - 1);
    for (let len = max; len > 0; len--) {
      if (this.buffer.slice(-len) === end.slice(0, len)) return this.buffer.length - len;
    }
    return this.buffer.length;
  }
}

export function cleanGrokText(text: string): string {
  const filter = new GrokMarkupFilter();
  return filter.feed(text) + filter.flush();
}

export function cleanGrokContentText(text: string): string {
  return cleanGrokText(text);
}

export function cleanGrokThinkingText(resp: GrokStreamResponse): string {
  const text = resp.token || "";
  const cleaned = cleanGrokText(text);
  const trimmed = cleaned.trim();
  if (!trimmed) return "";
  const isGenericOpeningHeader =
    resp.messageTag === "header" &&
    resp.messageStepId === 0 &&
    /^(?:\.{3}|thinking(?: about your request)?)$/i.test(trimmed);
  if (isGenericOpeningHeader) return "";
  if (resp.messageTag === "header") return `${trimmed}\n`;
  if (resp.messageTag === "summary") return `${trimmed}\n`;
  return cleaned;
}

export function extractStructuredReasoning(value: object | undefined): string {
  if (!value) return "";
  const record = value as Record<string, unknown>;
  for (const key of ["reasoning", "reasoningContent", "reasoning_content", "thinking", "thought"]) {
    const candidate = record[key];
    if (typeof candidate === "string" && candidate.trim()) return cleanGrokText(candidate);
  }
  return "";
}
