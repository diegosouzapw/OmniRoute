import React from "react";
import { Box, Text } from "ink";

export function CodeBlock({ code = "", language }) {
  return (
    <Box flexDirection="column" borderStyle="single" borderColor="gray" paddingX={1}>
      {language && (
        <Text dimColor bold>
          {language}
        </Text>
      )}
      <Text>{code}</Text>
    </Box>
  );
}
