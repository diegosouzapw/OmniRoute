// Composer thinking-as-content decoding for the Cursor executor (verbatim, no host imports).

// ─── Composer thinking-as-content decoding ─────────────────────────────────
//
// The Cursor `composer-*` family encodes its visible reply inside the
// `thinking` field, marked off from the (private) chain-of-thought by a
// final `</think>` sentinel. Everything AFTER the last `</think>` is the
// user-facing reply; the prefix must stay hidden.
//
// Ported from decolua/9router#1310 by Noé Rivera. Same algorithm, adapted
// to OmniRoute's StreamCtx-based pipeline so streaming + non-streaming
// share the accumulation path.

const COMPOSER_THINK_END = "</think>";

export function isComposerModel(model: string | undefined | null): boolean {
  const id = String(model ?? "")
    .split("/")
    .pop();
  return /^composer(?:-|$)/i.test(id ?? "");
}

// Composer's protobuf sometimes wraps the visible suffix in sentinel tags:
// `<｜final｜>` (full-width pipes) or `<|final|>` (ASCII), optionally closed
// with a matching `<｜/final｜>` / `<|/final|>`. These are protocol-internal
// and must never leak to OpenAI-compatible clients (decolua/9router#1316).
const COMPOSER_OPEN_MARKER = /^\s*<[｜|]\s*final\s*[｜|]>\s*/i;
const COMPOSER_CLOSE_MARKER = /\s*<[｜|]\s*\/\s*final\s*[｜|]>\s*$/i;
const COMPOSER_PARTIAL_OPEN = /^\s*<(?![｜|/])/;
const COMPOSER_PARTIAL_OPEN_PIPE = /^\s*<[｜|][^>]*$/;

export function visibleComposerContentFromThinking(thinking: string): string {
  if (!thinking) return "";
  const endIdx = thinking.lastIndexOf(COMPOSER_THINK_END);
  if (endIdx < 0) return "";
  let visible = thinking.slice(endIdx + COMPOSER_THINK_END.length).trimStart();
  if (COMPOSER_OPEN_MARKER.test(visible)) {
    visible = visible.replace(COMPOSER_OPEN_MARKER, "");
  } else if (COMPOSER_PARTIAL_OPEN.test(visible) || COMPOSER_PARTIAL_OPEN_PIPE.test(visible)) {
    // A streamed chunk delivered only a partial opening marker (e.g. `<` or
    // `<｜fin`). Hold back everything until more data arrives so the marker
    // fragment never leaks as content.
    return "";
  }
  return visible.replace(COMPOSER_CLOSE_MARKER, "").trim();
}

export function composerReasoningRemainder(thinking: string): string {
  if (!thinking) return "";
  const endIdx = thinking.lastIndexOf(COMPOSER_THINK_END);
  if (endIdx < 0) return thinking;
  return thinking.slice(0, endIdx);
}
