import React from "react";
import { Box, Text } from "ink";

export function TokenCounter({ tokensIn = 0, tokensOut = 0, costUsd = 0, model }) {
  return (
    <Box flexDirection="column">
      <Box>
        <Text bold>In: </Text>
        <Text>{tokensIn.toLocaleString()}</Text>
        <Text bold> Out: </Text>
        <Text>{tokensOut.toLocaleString()}</Text>
        <Text bold> Cost: </Text>
        <Text color="yellow">${costUsd.toFixed(4)}</Text>
      </Box>
      {model && <Text dimColor>Model: {model}</Text>}
    </Box>
  );
}
