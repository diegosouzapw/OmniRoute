/**
 * Markdown boundary buffering for streaming text deltas.
 *
 * Upstream SSE chunks can split in the middle of Markdown tokens such as
 * fenced code blocks (```language) or bold markers (**). Emitting those
 * partial tokens as separate text_delta events causes clients to render the
 * stream with broken Markdown until the next delta arrives.
 *
 * This helper identifies a trailing suffix that is an *incomplete* Markdown
 * boundary token and defers it to the next chunk so the token is emitted in
 * one piece.
 *
 * Rules (held suffixes are bounded by MAX_HOLD_CHARS):
 *   - 1-2 trailing backticks in an "opener" context (start, whitespace, or
 *     punctuation before the run) are held.
 *   - Three trailing backticks followed by a non-empty fence info string are
 *     held; plain "```" is emitted so a closing fence is not accidentally
 *     merged with following text.
 *   - One to three trailing asterisks in an opener context are held. We never
 *     hold when preceded by an alphanumeric character (which indicates a
 *     closing delimiter).
 */

const MAX_HOLD_CHARS = 32;

function isOpenerContext(text: string, suffixStart: number): boolean {
  if (suffixStart <= 0) return true;
  const prev = text[suffixStart - 1];
  // Alphanumeric preceding characters usually mean the delimiter is closing
  // (e.g. "`code`" or "**bold**"), so do not hold those suffixes.
  return !/[A-Za-z0-9_]/.test(prev);
}

function scanBacktickState(
  text: string,
  initialRun: number,
  initialTrailingBackslash: boolean,
  initialFenceRun: number,
  initialFenceOpening: boolean,
  initialFenceClosingRun: number,
  initialLineIndent: number
): {
  backtickRun: number;
  trailingBackslash: boolean;
  fenceRun: number;
  fenceOpening: boolean;
  fenceClosingRun: number;
  lineIndent: number;
} {
  let openRun = initialRun;
  let fenceRun = initialFenceRun;
  let fenceOpening = initialFenceOpening;
  let fenceClosingRun = initialFenceClosingRun;
  let lineIndent = initialLineIndent;
  let backslashes = openRun === 0 && fenceRun === 0 && initialTrailingBackslash ? 1 : 0;

  for (let index = 0; index < text.length;) {
    const char = text[index];

    if (fenceOpening) {
      if (char === "\n" || char === "\r") {
        fenceOpening = false;
        lineIndent = 0;
      } else if (char === "`" && lineIndent === -1) {
        let runEnd = index + 1;
        while (runEnd < text.length && text[runEnd] === "`") runEnd++;
        fenceRun += runEnd - index;
        index = runEnd;
        continue;
      } else if (char === "`") {
        openRun = fenceRun;
        fenceRun = 0;
        fenceOpening = false;
        continue;
      } else lineIndent = 4;
      index++;
      continue;
    }

    if (fenceClosingRun) {
      if (char === "\n" || char === "\r") {
        fenceRun = 0;
        fenceClosingRun = 0;
        lineIndent = 0;
      } else if (char === "`" && lineIndent === -1) {
        let runEnd = index + 1;
        while (runEnd < text.length && text[runEnd] === "`") runEnd++;
        fenceClosingRun += runEnd - index;
        index = runEnd;
        continue;
      } else if (char === " " || char === "\t") {
        lineIndent = 4;
      } else if (char !== " " && char !== "\t") {
        fenceClosingRun = 0;
        lineIndent = 4;
      }
      index++;
      continue;
    }

    if (fenceRun) {
      if (char === "\n" || char === "\r") {
        lineIndent = 0;
        index++;
        continue;
      }
      if (char === " " && lineIndent < 4) {
        lineIndent++;
        index++;
        continue;
      }
      if (char === "`" && lineIndent <= 3) {
        let runEnd = index + 1;
        while (runEnd < text.length && text[runEnd] === "`") runEnd++;
        const runLength = runEnd - index;
        if (runLength >= fenceRun) {
          fenceClosingRun = runLength;
          lineIndent = -1;
        } else lineIndent = 4;
        index = runEnd;
        continue;
      }
      lineIndent = 4;
      index++;
      continue;
    }

    if (char !== "`") {
      if (char === "\n" || char === "\r") lineIndent = 0;
      else if (char === " " && lineIndent < 4) lineIndent++;
      else lineIndent = 4;
      if (openRun === 0) backslashes = char === "\\" ? backslashes + 1 : 0;
      index++;
      continue;
    }
    if (openRun === 0 && backslashes % 2 === 1) {
      backslashes = 0;
      lineIndent = 4;
      index++;
      continue;
    }
    let runEnd = index + 1;
    while (runEnd < text.length && text[runEnd] === "`") runEnd++;
    const runLength = runEnd - index;
    if (openRun === 0 && runLength >= 3 && lineIndent <= 3) {
      fenceRun = runLength;
      fenceOpening = true;
      lineIndent = -1;
    } else if (openRun === 0) openRun = runLength;
    else if (openRun === runLength) openRun = 0;
    if (!fenceOpening) lineIndent = 4;
    backslashes = 0;
    index = runEnd;
  }

  return {
    backtickRun: openRun,
    trailingBackslash: openRun === 0 && fenceRun === 0 && backslashes % 2 === 1,
    fenceRun,
    fenceOpening,
    fenceClosingRun,
    lineIndent,
  };
}

export function splitMarkdownBoundary(
  text: string,
  priorBacktickRun = 0,
  priorTrailingBackslash = false,
  priorFenceRun = 0,
  priorFenceOpening = false,
  priorFenceClosingRun = 0,
  priorLineIndent = 0
): {
  emit: string;
  hold: string;
  backtickRun?: number;
  trailingBackslash?: boolean;
  fenceRun?: number;
  fenceOpening?: boolean;
  fenceClosingRun?: number;
  lineIndent?: number;
} {
  if (!text) return { emit: "", hold: "" };

  // 1) Incomplete fenced code block opener or inline code opener:
  //    - ` or `` (incomplete delimiter)
  //    - `code or ``code (incomplete inline code run)
  //    - ```info (fence delimiter + partial info string; any non-backtick,
  //      non-line-ending CommonMark info character)
  //    Do NOT hold plain "```" by itself to avoid gluing a closing fence to
  //    the next line of normal text.
  const fenceMatch = text.match(/(?<!`)(`{1,2}[A-Za-z0-9_+#-]*|`{3,}[^`\r\n]+)$/);
  if (fenceMatch) {
    const suffix = fenceMatch[0];
    const suffixStart = text.length - suffix.length;
    const runLength = suffix.match(/^`+/)?.[0].length ?? 0;
    const { backtickRun: openRun, fenceRun } = scanBacktickState(
      text.slice(0, suffixStart),
      priorBacktickRun,
      priorTrailingBackslash,
      priorFenceRun,
      priorFenceOpening,
      priorFenceClosingRun,
      priorLineIndent
    );
    const closesKnownRun = openRun === runLength;
    const mayCompleteKnownRun = openRun > runLength;
    if (
      suffix.length <= MAX_HOLD_CHARS &&
      fenceRun === 0 &&
      !closesKnownRun &&
      (mayCompleteKnownRun || isOpenerContext(text, suffixStart))
    ) {
      const emit = text.slice(0, -suffix.length);
      return {
        emit,
        hold: suffix,
        ...scanBacktickState(
          emit,
          priorBacktickRun,
          priorTrailingBackslash,
          priorFenceRun,
          priorFenceOpening,
          priorFenceClosingRun,
          priorLineIndent
        ),
      };
    }
  }

  // 2) Incomplete emphasis/bold opener: 1 to 3 asterisks in an opener context.
  const emphMatch = text.match(/(?<!\*)\*{1,3}$/);
  if (emphMatch) {
    const suffix = emphMatch[0];
    if (isOpenerContext(text, text.length - suffix.length)) {
      const emit = text.slice(0, -suffix.length);
      return {
        emit,
        hold: suffix,
        ...scanBacktickState(
          emit,
          priorBacktickRun,
          priorTrailingBackslash,
          priorFenceRun,
          priorFenceOpening,
          priorFenceClosingRun,
          priorLineIndent
        ),
      };
    }
  }

  return {
    emit: text,
    hold: "",
    ...scanBacktickState(
      text,
      priorBacktickRun,
      priorTrailingBackslash,
      priorFenceRun,
      priorFenceOpening,
      priorFenceClosingRun,
      priorLineIndent
    ),
  };
}
