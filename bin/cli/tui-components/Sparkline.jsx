import React from "react";
import { Text } from "ink";

const BARS = ["▁", "▂", "▃", "▄", "▅", "▆", "▇", "█"];

export function Sparkline({ data = [], color = "cyan", width = 10 }) {
  const slice = data.slice(-width);
  if (slice.length === 0) return <Text dimColor>{"─".repeat(width)}</Text>;
  const max = Math.max(...slice, 1);
  const chars = slice.map((v) => {
    const idx = Math.round((v / max) * (BARS.length - 1));
    return BARS[Math.min(Math.max(idx, 0), BARS.length - 1)];
  });
  return <Text color={color}>{chars.join("")}</Text>;
}
