import React from "react";
import { Text } from "ink";

export function KeyMaskedDisplay({ apiKey, revealed = false }) {
  if (!apiKey) return <Text dimColor>(none)</Text>;
  const display = revealed
    ? apiKey
    : apiKey.length <= 8
      ? "***"
      : `${apiKey.slice(0, 6)}***${apiKey.slice(-4)}`;
  return <Text>{display}</Text>;
}
