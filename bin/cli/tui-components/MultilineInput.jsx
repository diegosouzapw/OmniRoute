import React from "react";
import { Box, Text } from "ink";
import TextInput from "ink-text-input";

export function MultilineInput({ label, value, onChange, placeholder }) {
  return (
    <Box flexDirection="column">
      {label && (
        <Text bold dimColor>
          {label}
        </Text>
      )}
      <Box borderStyle="single" borderColor="gray" paddingX={1}>
        <TextInput value={value} onChange={onChange} placeholder={placeholder} />
      </Box>
    </Box>
  );
}
