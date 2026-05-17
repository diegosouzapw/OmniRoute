import React, { useState } from "react";
import { render, Box, Text, useInput } from "ink";
import { MenuSelect } from "../tui-components/MenuSelect.jsx";

function InterfaceMenuApp({ version, baseUrl, hasUpdate, latestVersion, onChoice }) {
  return (
    <Box flexDirection="column" paddingX={2} paddingY={1}>
      <Box borderStyle="double" borderColor="cyan" paddingX={2} paddingY={1} flexDirection="column">
        <Text bold color="cyan">
          ⚡ OmniRoute {version ? `v${version}` : ""}
        </Text>
        <Text dimColor>{baseUrl}</Text>
      </Box>
      {hasUpdate && (
        <Box marginTop={1}>
          <Text color="yellow">
            ↑ Update available: v{latestVersion} (run `omniroute update --apply`)
          </Text>
        </Box>
      )}
      <Box marginTop={1}>
        <MenuSelect
          items={[
            { label: "🌐 Open Web UI in Browser", hint: "(default)" },
            { label: "💻 Interactive TUI Dashboard" },
            { label: "🔔 Start in Background (daemon)" },
            { label: "📊 Show Live Logs" },
            { label: "🚪 Exit" },
          ]}
          onSelect={(item) => onChoice(item.label)}
        />
      </Box>
      <Box marginTop={1}>
        <Text dimColor>[↑↓] navigate [Enter] select [1-5] shortcut [q] exit</Text>
      </Box>
    </Box>
  );
}

export async function showInterfaceMenu({ version, baseUrl, hasUpdate, latestVersion } = {}) {
  return new Promise((resolve) => {
    const { unmount } = render(
      <InterfaceMenuApp
        version={version}
        baseUrl={baseUrl}
        hasUpdate={hasUpdate}
        latestVersion={latestVersion}
        onChoice={(choice) => {
          unmount();
          resolve(choice);
        }}
      />
    );
  });
}
