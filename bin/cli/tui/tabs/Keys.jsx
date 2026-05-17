import React from "react";
import { Box, Text } from "ink";
import { HeaderSwr } from "../../tui-components/HeaderSwr.jsx";
import { DataTable } from "../../tui-components/DataTable.jsx";
import { KeyMaskedDisplay } from "../../tui-components/KeyMaskedDisplay.jsx";

const SCHEMA = [
  { key: "label", header: "Label", width: 20 },
  { key: "key", header: "Key", width: 24 },
  { key: "scope", header: "Scope", width: 12 },
  { key: "active", header: "Active", width: 8, formatter: (v) => (v ? "✓" : "✗") },
];

export default function Keys({ baseUrl, apiKey }) {
  const fetcher = React.useCallback(async () => {
    const res = await fetch(`${baseUrl}/api/v1/registered-keys`, {
      headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : {},
    });
    return res.ok ? res.json() : [];
  }, [baseUrl, apiKey]);

  return (
    <Box flexDirection="column">
      <HeaderSwr
        fetcher={fetcher}
        interval={15000}
        render={(data) => {
          const rows = Array.isArray(data) ? data : (data?.keys ?? []);
          return (
            <DataTable
              rows={rows.map((k) => ({
                label: k.label ?? k.id,
                key: k.key ? `${k.key.slice(0, 6)}***${k.key.slice(-4)}` : "***",
                scope: k.scope ?? "all",
                active: k.active !== false,
              }))}
              schema={SCHEMA}
              selectable
            />
          );
        }}
      />
      <Box marginTop={1}>
        <Text dimColor>[↑↓] select [a] add [r] revoke [R] reveal [c] copy</Text>
      </Box>
    </Box>
  );
}
