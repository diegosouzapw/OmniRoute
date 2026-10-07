/* Adapted from miuuyy/codex-chatgpt-web commit 09877fa21ffdbf20979623ef501046fc02a750d7 (MIT). */
import TurndownService from "turndown";
import { gfm } from "turndown-plugin-gfm";

const turndown = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
  fence: "```",
  emDelimiter: "*",
  strongDelimiter: "**",
  linkStyle: "inlined",
});

turndown.use(gfm);
turndown.remove(["button", "script", "style"]);
turndown.addRule("removeImages", {
  filter: (node) => ["IMG", "PICTURE", "SOURCE"].includes(node.nodeName),
  replacement: () => "",
});
turndown.addRule("removeSvg", {
  filter: (node) => node.nodeName === "SVG",
  replacement: () => "",
});
turndown.addRule("compactListItem", {
  filter: "li",
  replacement: (content, node, options) => {
    const parent = node.parentNode as HTMLElement | null;
    let prefix = `${options.bulletListMarker} `;
    if (parent?.nodeName === "OL") {
      const start = Number(parent.getAttribute("start") ?? "1");
      const index = Array.prototype.indexOf.call(parent.children, node) as number;
      prefix = `${start + index}. `;
    }
    const normalized = content
      .replace(/^\n+|\n+$/g, "")
      .replace(/\n/g, `\n${" ".repeat(prefix.length)}`);
    return `${prefix}${normalized}${node.nextSibling ? "\n" : ""}`;
  },
});

function preserveObsidianWikiLinks(markdown: string): string {
  // Turndown escapes literal brackets, but Codex interprets the resulting `\[` as LaTeX.
  // Double-bracket wiki links are already plain GFM text, so preserve only that exact syntax.
  return markdown.replace(/\\\[\\\[([^\r\n]*?)\\\]\\\]/g, "[[$1]]");
}

export function chatGptHtmlToMarkdown(html: string): string {
  return html.trim() ? preserveObsidianWikiLinks(turndown.turndown(html)).trim() : "";
}

export interface ChatGptMarkdownSegment {
  key: string;
  tag?: string;
  html: string;
  text: string;
  group?: string;
  sourceStart?: number;
  sourceEnd?: number;
  streamable: boolean;
}

interface ChatGptMarkdownCandidate extends ChatGptMarkdownSegment {
  changedAt: number;
  streamableAt?: number;
}

interface CommittedChatGptMarkdownSegment {
  key: string;
  tag?: string;
  text: string;
  sourceStart?: number;
  sourceEnd?: number;
}

export class ChatGptMarkdownConsistencyError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ChatGptMarkdownConsistencyError";
  }
}

/**
 * Converts structurally completed ChatGPT DOM blocks into an append-only Markdown stream.
 *
 * ChatGPT can rewrite old HTML while hydrating citations and controls, so a character prefix is
 * not a safe commit boundary. It can also virtualize an already-rendered prefix, so later DOM
 * snapshots are partial observations rather than the response ledger. The browser supplies source
 * ranges for semantic blocks and marks a block streamable only after a following block exists.
 * Once committed, a missing prefix is harmless; changing text at a committed source range remains
 * an explicit protocol error because Responses deltas cannot be retracted.
 */
export class ChatGptMarkdownBuffer {
  private readonly candidates = new Map<string, ChatGptMarkdownCandidate>();
  private readonly committed: CommittedChatGptMarkdownSegment[] = [];
  private latest: ChatGptMarkdownSegment[] = [];
  private markdown = "";
  private lastGroup: string | undefined;
  private consistencyError: ChatGptMarkdownConsistencyError | undefined;

  constructor(
    private readonly transform: (markdown: string) => string = (markdown) => markdown,
    private readonly stabilityMs = 750
  ) {
    if (!Number.isFinite(stabilityMs) || stabilityMs < 0) {
      throw new Error("ChatGPT Markdown stability window must be a non-negative finite number");
    }
  }

  observe(segments: ChatGptMarkdownSegment[], now = Date.now()): string {
    const reconciled = this.reconcile(segments);
    if (reconciled instanceof ChatGptMarkdownConsistencyError) {
      this.consistencyError = reconciled;
      return "";
    }
    this.consistencyError = undefined;
    this.latest = reconciled.map((segment) => ({ ...segment }));

    const visibleCandidates = new Set<string>();
    for (const segment of reconciled) {
      const candidateId = this.candidateId(segment);
      visibleCandidates.add(candidateId);
      const previous = this.candidates.get(candidateId);
      const unchanged =
        previous &&
        previous.key === segment.key &&
        previous.tag === segment.tag &&
        previous.html === segment.html &&
        previous.text === segment.text &&
        previous.group === segment.group &&
        previous.sourceStart === segment.sourceStart &&
        previous.sourceEnd === segment.sourceEnd;
      this.candidates.set(candidateId, {
        ...segment,
        changedAt: unchanged ? previous.changedAt : now,
        ...(segment.streamable
          ? {
              streamableAt:
                unchanged && previous.streamableAt !== undefined ? previous.streamableAt : now,
            }
          : {}),
      });
    }
    for (const candidateId of this.candidates.keys()) {
      if (!visibleCandidates.has(candidateId)) this.candidates.delete(candidateId);
    }

    let delta = "";
    let committedCount = 0;
    while (committedCount < reconciled.length) {
      const segment = reconciled[committedCount]!;
      const candidateId = this.candidateId(segment);
      const candidate = this.candidates.get(candidateId);
      if (!candidate?.streamable || candidate.streamableAt === undefined) break;
      if (now - Math.max(candidate.changedAt, candidate.streamableAt) < this.stabilityMs) break;
      delta += this.commit(candidate);
      this.committed.push(this.committedSegment(candidate));
      this.candidates.delete(candidateId);
      committedCount += 1;
    }
    this.latest = this.latest.slice(committedCount);
    return delta;
  }

  finish(): { markdown: string; delta: string } {
    if (this.consistencyError) throw this.consistencyError;
    let delta = "";
    for (const segment of this.latest) {
      delta += this.commit(segment);
      this.committed.push(this.committedSegment(segment));
    }
    this.candidates.clear();
    this.latest = [];
    return { markdown: this.markdown, delta };
  }

  currentSnapshotIsConsistent(): boolean {
    return this.consistencyError === undefined;
  }

  private reconcile(
    segments: ChatGptMarkdownSegment[]
  ): ChatGptMarkdownSegment[] | ChatGptMarkdownConsistencyError {
    if (this.committed.length === 0 || segments.length === 0) return segments;

    const pending: ChatGptMarkdownSegment[] = [];
    const lastCommittedEnd = this.committed
      .map((segment) => segment.sourceEnd)
      .filter((end): end is number => end !== undefined)
      .at(-1);
    let highestCommittedIndex = -1;
    let sawPending = false;
    let previousSourceStart: number | undefined;

    for (const segment of segments) {
      if (segment.sourceStart !== undefined) {
        if (previousSourceStart !== undefined && segment.sourceStart <= previousSourceStart) {
          return new ChatGptMarkdownConsistencyError(
            "ChatGPT final DOM exposed non-monotonic source ranges"
          );
        }
        previousSourceStart = segment.sourceStart;
      }
      const committedIndex = this.committedIndex(segment);
      if (committedIndex !== undefined) {
        const committed = this.committed[committedIndex]!;
        if (
          sawPending ||
          committedIndex < highestCommittedIndex ||
          committed.text !== segment.text
        ) {
          return this.changedCommittedBlockError();
        }
        highestCommittedIndex = committedIndex;
        continue;
      }

      if (segment.sourceStart !== undefined && lastCommittedEnd !== undefined) {
        if (segment.sourceStart <= lastCommittedEnd) return this.changedCommittedBlockError();
        sawPending = true;
        pending.push(segment);
        continue;
      }

      const followsVisibleCommittedTail = highestCommittedIndex === this.committed.length - 1;
      if (!followsVisibleCommittedTail && !this.matchesLatestPending(segment)) {
        return new ChatGptMarkdownConsistencyError(
          "ChatGPT final DOM could not be aligned with text already streamed to Codex"
        );
      }
      sawPending = true;
      pending.push(segment);
    }

    return pending;
  }

  private committedIndex(segment: ChatGptMarkdownSegment): number | undefined {
    const exact = this.committed.findIndex((committed) =>
      segment.sourceStart !== undefined && committed.sourceStart !== undefined
        ? segment.sourceStart === committed.sourceStart && segment.tag === committed.tag
        : segment.key === committed.key
    );
    if (exact >= 0) return exact;

    if (segment.sourceStart !== undefined) return undefined;
    if (!segment.tag) return undefined;
    const semanticMatches = this.committed
      .map((committed, index) => ({ committed, index }))
      .filter(({ committed }) => committed.tag === segment.tag && committed.text === segment.text);
    return semanticMatches.length === 1 ? semanticMatches[0]!.index : undefined;
  }

  private matchesLatestPending(segment: ChatGptMarkdownSegment): boolean {
    const exact = this.latest.filter((candidate) =>
      segment.sourceStart !== undefined && candidate.sourceStart !== undefined
        ? segment.sourceStart === candidate.sourceStart && segment.tag === candidate.tag
        : segment.key === candidate.key
    );
    if (exact.length === 1) return true;
    if (segment.sourceStart !== undefined) return false;
    if (!segment.tag) return false;
    return (
      this.latest.filter(
        (candidate) => candidate.tag === segment.tag && candidate.text === segment.text
      ).length === 1
    );
  }

  private candidateId(segment: ChatGptMarkdownSegment): string {
    return segment.sourceStart !== undefined
      ? `source:${segment.sourceStart}:${segment.tag ?? ""}`
      : `key:${segment.key}`;
  }

  private committedSegment(segment: ChatGptMarkdownSegment): CommittedChatGptMarkdownSegment {
    return {
      key: segment.key,
      ...(segment.tag ? { tag: segment.tag } : {}),
      text: segment.text,
      ...(segment.sourceStart !== undefined ? { sourceStart: segment.sourceStart } : {}),
      ...(segment.sourceEnd !== undefined ? { sourceEnd: segment.sourceEnd } : {}),
    };
  }

  private changedCommittedBlockError(): ChatGptMarkdownConsistencyError {
    return new ChatGptMarkdownConsistencyError(
      "ChatGPT changed a completed text block that was already streamed to Codex"
    );
  }

  private commit(segment: ChatGptMarkdownSegment): string {
    const block = this.transform(chatGptHtmlToMarkdown(segment.html));
    if (!block) return "";
    const separator = this.markdown
      ? segment.group !== undefined && segment.group === this.lastGroup
        ? "\n"
        : "\n\n"
      : "";
    const delta = `${separator}${block}`;
    this.markdown += delta;
    this.lastGroup = segment.group;
    return delta;
  }
}
