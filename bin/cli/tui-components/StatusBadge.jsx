import React from "react";
import { Text } from "ink";

const STATUS_MAP = {
  running: { label: "● running", color: "green" },
  stopped: { label: "● stopped", color: "red" },
  starting: { label: "◌ starting", color: "yellow" },
  error: { label: "✗ error", color: "red" },
  unknown: { label: "? unknown", color: "gray" },
  ok: { label: "✓ ok", color: "green" },
  warn: { label: "⚠ warn", color: "yellow" },
};

export function StatusBadge({ status = "unknown" }) {
  const s = STATUS_MAP[status] ?? { label: status, color: "gray" };
  return <Text color={s.color}>{s.label}</Text>;
}
