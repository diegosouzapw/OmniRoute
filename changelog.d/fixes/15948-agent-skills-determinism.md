- Generated Agent Skill API examples now use the canonical local base URL unless a caller
  explicitly supplies another host, preventing ambient environment variables from changing
  committed documentation. Explicit configured-host examples remain supported, and
  regression tests cover both behaviors. (#15948 — thanks @BenjaminAronsson)
