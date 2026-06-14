"use client";

import type { NormalizedBlock } from "@/mitm/inspector/types";
import { ToolCallBlock } from "./ToolCallBlock";
import { ToolResultBlock } from "./ToolResultBlock";

interface MessageContentProps {
  blocks: NormalizedBlock[];
}

export function MessageContent({ blocks }: MessageContentProps) {
  return (
    <div className="space-y-2">
      {blocks.map((block, i) => {
        if (block.type === "text") {
          return (
            <p key={i} className="text-sm text-text-main whitespace-pre-wrap break-words">
              {block.text}
            </p>
          );
        }
        if (block.type === "tool_use") {
          return (
            <ToolCallBlock key={i} id={block.id} name={block.name} input={block.input} />
          );
        }
        if (block.type === "tool_result") {
          return (
            <ToolResultBlock
              key={i}
              toolUseId={block.tool_use_id}
              content={block.content}
            />
          );
        }
        return null;
      })}
    </div>
  );
}
