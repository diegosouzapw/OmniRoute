/* Adapted from miuuyy/codex-chatgpt-web commit 55592fca0ba19a27f1b769cec8fff61ff340a785 (MIT). */
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

export function chatGptHtmlToMarkdown(html: string): string {
  return html.trim() ? turndown.turndown(html).trim() : "";
}

/**
 * Converts append-only rendered ChatGPT blocks into Responses text deltas.
 * A stable prefix must be observed twice before it is committed. The final unstable block is
 * emitted only by `finish`, so already-streamed Markdown never needs a retraction.
 */
export class ChatGptMarkdownStream {
  private candidate = "";
  private committed = "";

  constructor(private readonly transform: (markdown: string) => string = (markdown) => markdown) {}

  observeStableHtml(html: string): string {
    const next = this.transform(chatGptHtmlToMarkdown(html));
    if (!next.startsWith(this.committed)) {
      throw new Error("ChatGPT changed Markdown that was already streamed to Codex");
    }
    if (next !== this.candidate) {
      this.candidate = next;
      return "";
    }
    const delta = next.slice(this.committed.length);
    this.committed = next;
    return delta;
  }

  finish(html: string): { markdown: string; delta: string } {
    const markdown = this.transform(chatGptHtmlToMarkdown(html));
    if (!markdown.startsWith(this.committed)) {
      throw new Error("ChatGPT final Markdown does not extend the streamed stable prefix");
    }
    const delta = markdown.slice(this.committed.length);
    this.committed = markdown;
    this.candidate = markdown;
    return { markdown, delta };
  }
}
