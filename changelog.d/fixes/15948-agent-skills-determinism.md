- Generated Agent Skill API examples now use the canonical local base URL unless a caller
  explicitly supplies another host, preventing ambient environment variables from changing
  committed documentation. Explicit configured-host examples remain supported, and
  regression tests cover both behaviors, including isolation and restoration of
  `NEXT_PUBLIC_BASE_URL`. (#15948 — thanks @BenjaminAronsson)
