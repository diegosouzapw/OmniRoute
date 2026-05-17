import React from "react";
import { Box, Text } from "ink";
import { HeaderSwr } from "../../tui-components/HeaderSwr.jsx";
import { Sparkline } from "../../tui-components/Sparkline.jsx";

export default function Cost({ baseUrl, apiKey }) {
  const fetcher = React.useCallback(async () => {
    const res = await fetch(`${baseUrl}/api/usage?period=7d&breakdown=provider`, {
      headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : {},
    });
    return res.ok ? res.json() : null;
  }, [baseUrl, apiKey]);

  return (
    <HeaderSwr
      fetcher={fetcher}
      interval={30000}
      render={(data) => {
        const byProvider = data?.byProvider ?? {};
        const dailyCosts = data?.dailyCosts ?? [];
        const totalCost = data?.totalCost ?? 0;
        return (
          <Box flexDirection="column" gap={1}>
            <Box gap={4}>
              <Box flexDirection="column">
                <Text bold>Total (7d)</Text>
                <Text color="yellow">${totalCost.toFixed(4)}</Text>
              </Box>
              <Box flexDirection="column">
                <Text bold>Daily Trend</Text>
                <Sparkline data={dailyCosts} width={14} color="yellow" />
              </Box>
            </Box>
            {Object.keys(byProvider).length > 0 && (
              <Box flexDirection="column">
                <Text bold>By Provider</Text>
                {Object.entries(byProvider).map(([provider, cost]) => (
                  <Box key={provider} gap={2}>
                    <Box width={16}>
                      <Text>{provider}</Text>
                    </Box>
                    <Text color="yellow">${Number(cost).toFixed(4)}</Text>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        );
      }}
    />
  );
}
