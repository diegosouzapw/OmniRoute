import React, { useState } from "react";
import { Box, Text, useInput } from "ink";
import { theme } from "./theme.jsx";

function formatCell(v, col) {
  if (v == null) return "-";
  if (col.formatter) return col.formatter(v);
  return String(v);
}

export function DataTable({ rows = [], schema = [], selectable = false, onSelect }) {
  const [selectedIdx, setSelectedIdx] = useState(0);

  useInput((input, key) => {
    if (!selectable || rows.length === 0) return;
    if (key.upArrow) setSelectedIdx((i) => Math.max(0, i - 1));
    if (key.downArrow) setSelectedIdx((i) => Math.min(rows.length - 1, i + 1));
    if (key.return && onSelect) onSelect(rows[selectedIdx]);
  });

  if (rows.length === 0) {
    return <Text dimColor>No data.</Text>;
  }

  return (
    <Box flexDirection="column">
      <Box>
        {schema.map((col) => (
          <Box key={col.key} width={col.width ?? 16} marginRight={1}>
            <Text bold color={theme.header}>
              {col.header}
            </Text>
          </Box>
        ))}
      </Box>
      {rows.map((row, idx) => (
        <Box
          key={idx}
          backgroundColor={selectable && idx === selectedIdx ? theme.selected : undefined}
        >
          {schema.map((col) => (
            <Box key={col.key} width={col.width ?? 16} marginRight={1}>
              <Text>{formatCell(row[col.key], col)}</Text>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
}
