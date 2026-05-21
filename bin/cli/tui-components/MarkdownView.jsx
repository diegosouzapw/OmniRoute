import React from "react";
import { Text } from "ink";

export function MarkdownView({ content = "" }) {
  // Render markdown as plain text with basic bold/italic stripping.
  // For rich rendering, use marked-terminal externally before passing content.
  const clean = content
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/`(.+?)`/g, "$1")
    .replace(/^#+\s+/gm, "");
  return <Text>{clean}</Text>;
}
