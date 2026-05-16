import React from "react";
import { Box, Text } from "ink";
import { HeaderSwr } from "../../tui-components/HeaderSwr.jsx";
import { StatusBadge } from "../../tui-components/StatusBadge.jsx";

export default function Health({ baseUrl, apiKey }) {
  const fetcher = React.useCallback(async () => {
    const res = await fetch(`${baseUrl}/api/monitoring/health?detail=true`, {
      headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : {},
    });
    return res.ok ? res.json() : null;
  }, [baseUrl, apiKey]);

  return (
    <HeaderSwr
      fetcher={fetcher}
      interval={5000}
      render={(data) => {
        const components = data?.components ?? {};
        const alerts = data?.alerts ?? [];
        return (
          <Box flexDirection="column" gap={1}>
            <Box flexDirection="column">
              <Text bold>Components</Text>
              {Object.entries(components).map(([name, status]) => (
                <Box key={name} gap={2}>
                  <Box width={20}>
                    <Text>{name}</Text>
                  </Box>
                  <StatusBadge
                    status={typeof status === "string" ? status : (status?.status ?? "unknown")}
                  />
                </Box>
              ))}
            </Box>
            {alerts.length > 0 && (
              <Box flexDirection="column">
                <Text bold color="red">
                  Alerts ({alerts.length})
                </Text>
                {alerts.map((a, i) => (
                  <Text key={i} color="red">
                    ⚠ {a.message ?? a}
                  </Text>
                ))}
              </Box>
            )}
          </Box>
        );
      }}
    />
  );
}
