import React, { useState, useEffect } from "react";
import { Box, Text, useInput } from "ink";

const MAX_LINES = 40;

export default function Logs({ baseUrl, apiKey }) {
  const [lines, setLines] = useState([]);
  const [paused, setPaused] = useState(false);

  useInput((input, key) => {
    if (input === "p") setPaused((v) => !v);
    if (input === "c") setLines([]);
  });

  useEffect(() => {
    if (paused) return;
    let cancelled = false;
    const headers = { Accept: "text/event-stream" };
    if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

    fetch(`${baseUrl}/api/v1/logs/stream?limit=50`, { headers })
      .then(async (res) => {
        if (!res.ok || !res.body) return;
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        while (!cancelled) {
          const { done, value } = await reader.read();
          if (done) break;
          const text = decoder.decode(value);
          for (const line of text.split("\n")) {
            if (line.startsWith("data:")) {
              const payload = line.slice(5).trim();
              if (payload && !cancelled) {
                setLines((prev) => [...prev.slice(-(MAX_LINES - 1)), payload]);
              }
            }
          }
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [baseUrl, apiKey, paused]);

  return (
    <Box flexDirection="column">
      <Box flexDirection="column" flexGrow={1}>
        {lines.length === 0 && <Text dimColor>Waiting for log events…</Text>}
        {lines.map((line, i) => (
          <Text key={i}>{line}</Text>
        ))}
      </Box>
      <Box marginTop={1}>
        <Text dimColor>{paused ? "[PAUSED]" : "[LIVE]"} [p] pause/resume [c] clear</Text>
      </Box>
    </Box>
  );
}
