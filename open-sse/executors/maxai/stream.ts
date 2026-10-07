/**
 * MaxAI SSE stream handling — frame parsing, incremental `<think>` split, and
 * token estimation. Ported from the MaxAI v3 Python client (translation/sse.py,
 * translation/stream.py, translation/think_split.py, translation/token_usage.py).
 *
 * MaxAI's `/gpt/cwc/chat` response is `text/event-stream`: `data: {json}` frames
 * separated by blank lines. A text delta is a frame with
 * `data_key === "text" && need_merge` truthy; its content is `frame.text`.
 * Reasoning is emitted inline wrapped in `<think>…</think>`; everything inside is
 * reasoning, everything after the close tag is the visible answer. MaxAI returns
 * no usage frame, so tokens are estimated (~4 chars/token).
 */

/** Parse the text deltas out of a raw SSE body (batch). */
export function parseMaxaiSseText(raw: string): string {
  let out = "";
  for (const line of raw.split("\n")) {
    const s = line.trim();
    if (!s.startsWith("data:")) continue;
    const js = s.slice(5).trim();
    if (!js || js === "[DONE]") continue;
    try {
      const frame = JSON.parse(js) as { data_key?: unknown; need_merge?: unknown; text?: unknown };
      if (frame.data_key === "text" && frame.need_merge) {
        out += typeof frame.text === "string" ? frame.text : "";
      }
    } catch {
      /* ignore non-JSON keepalive frames */
    }
  }
  return out;
}

/** True when a decoded SSE frame is a mergeable text delta. */
export function isMaxaiTextFrame(
  frame: unknown
): frame is { data_key: "text"; need_merge: true; text: string } {
  const f = frame as { data_key?: unknown; need_merge?: unknown; text?: unknown };
  return f?.data_key === "text" && Boolean(f?.need_merge) && typeof f?.text === "string";
}

const OPEN = "<think>";
const CLOSE = "</think>";
const HOLD = Math.max(OPEN.length, CLOSE.length) - 1;

/**
 * Stateful streaming classifier of text into (reasoning, answer). Handles a tag
 * split across frames by holding a short tail. Before `<think>` opens, text is
 * answer; if no `<think>` ever appears the whole stream is answer.
 */
export class ThinkSplitter {
  private buf = "";
  private inThink = false;

  feed(delta: string): { reasoning: string; answer: string } {
    this.buf += delta;
    let reasoning = "";
    let answer = "";
    for (;;) {
      const tag = this.inThink ? CLOSE : OPEN;
      const idx = this.buf.indexOf(tag);
      if (idx === -1) break;
      const before = this.buf.slice(0, idx);
      if (this.inThink) reasoning += before;
      else answer += before;
      this.buf = this.buf.slice(idx + tag.length);
      this.inThink = !this.inThink;
    }
    // Emit everything except a short tail that might begin a tag.
    const safe = this.buf.length > HOLD ? this.buf.slice(0, this.buf.length - HOLD) : "";
    if (safe) {
      this.buf = this.buf.slice(safe.length);
      if (this.inThink) reasoning += safe;
      else answer += safe;
    }
    return { reasoning, answer };
  }

  flush(): { reasoning: string; answer: string } {
    const tail = this.buf;
    this.buf = "";
    if (!tail) return { reasoning: "", answer: "" };
    return this.inThink ? { reasoning: tail, answer: "" } : { reasoning: "", answer: tail };
  }
}

/** Split a fully-collected answer into { reasoning, answer } (batch/non-stream). */
export function splitThink(full: string): { reasoning: string; answer: string } {
  const splitter = new ThinkSplitter();
  const a = splitter.feed(full);
  const b = splitter.flush();
  return {
    reasoning: a.reasoning + b.reasoning,
    answer: a.answer + b.answer,
  };
}

/** MaxAI returns no token counts; estimate ~4 chars/token. */
export function estimateMaxaiTokens(text: string): number {
  return Math.max(0, Math.ceil((text?.length ?? 0) / 4));
}
