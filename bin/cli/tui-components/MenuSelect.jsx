import React, { useState } from "react";
import { Box, Text, useInput } from "ink";

export function MenuSelect({ items = [], onSelect, initial = 0 }) {
  const [idx, setIdx] = useState(Math.min(initial, Math.max(0, items.length - 1)));

  useInput((input, key) => {
    if (items.length === 0) return;
    if (key.upArrow) setIdx((i) => (i - 1 + items.length) % items.length);
    if (key.downArrow) setIdx((i) => (i + 1) % items.length);
    if (key.return && onSelect) onSelect(items[idx]);
    const n = parseInt(input, 10);
    if (!isNaN(n) && n >= 1 && n <= items.length) {
      const newIdx = n - 1;
      setIdx(newIdx);
      if (onSelect) onSelect(items[newIdx]);
    }
  });

  return (
    <Box flexDirection="column">
      {items.map((item, i) => (
        <Box key={i}>
          <Text bold={i === idx} color={i === idx ? "yellow" : undefined} dimColor={item.disabled}>
            {i === idx ? "▶ " : "  "}
            {item.label}
          </Text>
          {item.hint && (
            <Text dimColor>
              {"  "}
              {item.hint}
            </Text>
          )}
        </Box>
      ))}
    </Box>
  );
}
