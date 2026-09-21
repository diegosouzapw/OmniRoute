- **fix(sse):** the Antigravity account picked for a request can now be reserved for that
  request's streaming lifecycle, so a concurrent retry or the credential handoff cannot re-pick
  an account already committed to an in-flight stream; a fully leased pool answers with a
  structured 503 `antigravity_pool_busy` carrying a bounded `Retry-After`. Opt-in behind the
  new `ANTIGRAVITY_ACCOUNT_LEASE_ENABLED` flag (default off) (#10011) — thanks @Ardem2025
