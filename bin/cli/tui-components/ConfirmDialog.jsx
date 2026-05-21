import React, { useState } from "react";
import { Box, Text, useInput } from "ink";

export function ConfirmDialog({ message, onConfirm, onCancel }) {
  const [selected, setSelected] = useState(1); // 0=yes, 1=no (default no)

  useInput((input, key) => {
    if (key.leftArrow || input === "y") setSelected(0);
    if (key.rightArrow || input === "n") setSelected(1);
    if (key.return) {
      if (selected === 0) onConfirm?.();
      else onCancel?.();
    }
    if (key.escape) onCancel?.();
  });

  return (
    <Box flexDirection="column" borderStyle="round" borderColor="yellow" padding={1}>
      <Text bold color="yellow">
        {message}
      </Text>
      <Box marginTop={1} gap={2}>
        <Text
          bold={selected === 0}
          color={selected === 0 ? "green" : undefined}
          inverse={selected === 0}
        >
          Yes
        </Text>
        <Text
          bold={selected === 1}
          color={selected === 1 ? "red" : undefined}
          inverse={selected === 1}
        >
          No
        </Text>
      </Box>
    </Box>
  );
}
