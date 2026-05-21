import React from "react";
import { Box, Text } from "ink";

export function ProgressBar({ value = 0, max = 100, width = 20, color = "green" }) {
  const pct = Math.min(1, Math.max(0, value / max));
  const filled = Math.round(pct * width);
  const empty = width - filled;
  return (
    <Box>
      <Text color={color}>{"█".repeat(filled)}</Text>
      <Text dimColor>{"░".repeat(empty)}</Text>
      <Text> {Math.round(pct * 100)}%</Text>
    </Box>
  );
}
