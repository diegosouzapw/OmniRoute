import React from "react";
import { Box, Text } from "ink";
import { HeaderSwr } from "../../tui-components/HeaderSwr.jsx";
import { DataTable } from "../../tui-components/DataTable.jsx";
import { StatusBadge } from "../../tui-components/StatusBadge.jsx";

const SCHEMA = [
  { key: "name", header: "Provider", width: 16 },
  { key: "status", header: "Status", width: 12, formatter: (v) => v },
  { key: "accounts", header: "Accounts", width: 10 },
  { key: "models", header: "Models", width: 8 },
];

export default function Providers({ baseUrl, apiKey }) {
  const fetcher = React.useCallback(async () => {
    const res = await fetch(`${baseUrl}/api/providers`, {
      headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : {},
    });
    return res.ok ? res.json() : [];
  }, [baseUrl, apiKey]);

  return (
    <Box flexDirection="column">
      <HeaderSwr
        fetcher={fetcher}
        interval={10000}
        render={(data) => {
          const rows = Array.isArray(data) ? data : (data?.providers ?? []);
          return (
            <DataTable
              rows={rows.map((p) => ({
                name: p.name ?? p.id,
                status: p.status ?? "unknown",
                accounts: p.accountCount ?? 0,
                models: p.modelCount ?? 0,
              }))}
              schema={SCHEMA}
              selectable
            />
          );
        }}
      />
      <Box marginTop={1}>
        <Text dimColor>[↑↓] select [Enter] details [t] test [r] refresh</Text>
      </Box>
    </Box>
  );
}
