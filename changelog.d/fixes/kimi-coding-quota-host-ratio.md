- **fix(quota):** Moonshot connections pointed at `api.kimi.com/coding` now
  fetch Kimi Coding `/usages` instead of falling back to Open Platform
  `users/me/balance`, and membership `usages.limit_*` `used_ratio` windows
  are mapped onto Code 7d/5h for dashboard and reset-aware scoring.
