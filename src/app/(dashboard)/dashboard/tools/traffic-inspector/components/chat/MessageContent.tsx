"use client";

import type { NormalizedBlock } from "@/mitm/inspector/types";
import { ToolCallBlock } from "./ToolCallBlock";
import { ToolResultBlock } from "./ToolResultBlock";
import MarkdownMessage from "@/app/(dashboard)/dashboard/playground/components/MarkdownMessage";

interface MessageContentProps {
  blocks: NormalizedBlock[];
}

export function MessageContent({ blocks }: MessageContentProps) {
  return (
    <div className="space-y-2">
      {blocks.map((block, i) => {
        if (block.type === "text") {
          // Most LLMs reply in Markdown — render it instead of plain text.
          return (
            <MarkdownMessage key={i} content={block.text} className="text-sm text-text-main" />
          );
        }
        if (block.type === "tool_use") {
          return <ToolCallBlock key={i} id={block.id} name={block.name} input={block.input} />;
        }
        if (block.type === "tool_result") {
          return <ToolResultBlock key={i} toolUseId={block.tool_use_id} content={block.content} />;
        }
        if (block.type === "pending") {
          return (
            <div
              key={i}
              className="flex items-center gap-2 text-xs text-text-muted italic px-1 py-0.5"
            >
              <span className="inline-block h-3 w-3 rounded-full border-2 border-current border-t-transparent animate-spin shrink-0" />
              loading...
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
