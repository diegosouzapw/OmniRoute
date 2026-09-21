- **fix(api):** `GET /api/logs/export` now streams rows from the database itself (a
  cursor for `proxy-logs`, a LIMIT-bounded generator for `call-logs`/`request-logs`)
  instead of buffering every matching row in memory before serializing, fixing a V8
  heap OOM on large tables ([#13428](https://github.com/diegosouzapw/OmniRoute/pull/13428),
  [#13123](https://github.com/diegosouzapw/OmniRoute/issues/13123)) — thanks @KooshaPari.
  **Breaking:** the `limit` query param now defaults to 10,000 rows (max 50,000) — exports
  that previously returned every matching row are silently truncated (with
  `"capped":true,"totalAvailable":<n>` in the response) unless the caller passes a larger
  explicit `limit`.
