### Video Bridge: connect consented frame drill-down to the request path

- Publish already-derived JPEG frames through a shared tenant-bound lifecycle only with
  explicit operator and authenticated per-part consent; keep raw videos out of retention.
- Return bounded opaque handles on JSON/SSE responses and expose independent retention/
  remote-read controls and aggregate-only usage in Video settings.
- Support authenticated preview/standard/detail reads, isolated idempotent deletion,
  cancellation, TTL/quota cleanup and actual-content variant provenance.
- Enforce bounded queries, sanitized errors and the 32 MiB serialized response limit.
  Defaults remain off; real-model promotion and deployment require separate evidence.
