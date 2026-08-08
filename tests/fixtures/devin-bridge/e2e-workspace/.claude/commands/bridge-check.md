---
description: Exercise the isolated Claude-to-Devin agentic bridge
allowed-tools: Skill, Read, Edit, Bash
---

`COMMAND_BRIDGE_ACTIVE`

Use the bridge-proof skill. Locate and read the implementation. Correct it if needed, run its test,
and diagnose and fix any real failure. If it is already correct, do not introduce a regression.
End with `BRIDGE_E2E_COMPLETE` only after `npm test` passes.
