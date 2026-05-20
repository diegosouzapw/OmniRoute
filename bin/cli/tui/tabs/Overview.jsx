import React from "react";
import { Box, Text } from "ink";
import { HeaderSwr } from "../../tui-components/HeaderSwr.jsx";
import { Sparkline } from "../../tui-components/Sparkline.jsx";
import { StatusBadge } from "../../tui-components/StatusBadge.jsx";

function formatUptime(seconds) {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (d > 0) return `${d}d ${h}h`;
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function OverviewContent({ data }) {
  const reqs = data?.requests24h ?? 0;
  const cost = (data?.cost24h ?? 0).toFixed(4);
  const uptimeSecs = data?.uptimeSeconds ?? 0;
  const sparkData = data?.requestsSparkline ?? [];

  return (
    <Box flexDirection="column" gap={1}>
      <Box gap={4}>
        <Box flexDirection="column">
          <Text bold>Server</Text>
          <StatusBadge status={data?.status ?? "unknown"} />
        </Box>
        <Box flexDirection="column">
          <Text bold>Uptime</Text>
          <Text>{formatUptime(uptimeSecs)}</Text>
        </Box>
        <Box flexDirection="column">
          <Text bold>Requests/24h</Text>
          <Box>
            <Text>{reqs.toLocaleString()} </Text>
            <Sparkline data={sparkData} width={12} />
          </Box>
        </Box>
        <Box flexDirection="column">
          <Text bold>Cost/24h</Text>
          <Text color="yellow">${cost}</Text>
        </Box>
      </Box>
      {data?.recentActivity?.length > 0 && (
        <Box flexDirection="column" marginTop={1}>
          <Text bold dimColor>
            Recent Activity
          </Text>
          {data.recentActivity.slice(0, 5).map((r, i) => (
            <Box key={i} gap={2}>
              <Text dimColor>{r.time}</Text>
              <Text color={r.status < 400 ? "green" : "red"}>{r.status < 400 ? "✓" : "✗"}</Text>
              <Text>{r.path}</Text>
              <Text dimColor>{r.model}</Text>
              <Text dimColor>{r.duration}ms</Text>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default function Overview({ baseUrl, apiKey }) {
  const fetcher = React.useCallback(async () => {
    const res = await fetch(`${baseUrl}/api/monitoring/health`, {
      headers: apiKey ? { Authorization: `Bearer ${apiKey}` } : {},
    });
    return res.ok ? res.json() : null;
  }, [baseUrl, apiKey]);

  return (
    <HeaderSwr
      fetcher={fetcher}
      interval={5000}
      render={(data) => <OverviewContent data={data} />}
    />
  );
}
