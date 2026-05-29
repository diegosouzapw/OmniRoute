# Decisions — Phase 3

- DB: key_value store, no dedicated table. Migration 031 = SELECT 1 no-op
- CompressionMode union already has "aggressive" — don't re-add
- AggressiveConfig stored as JSON in key_value(namespace='compression', key='aggressiveConfig')
- Rule-based only — no LLM calls in shipped code
- Summarizer interface for future LLM drop-in
- Progressive aging: 4 configurable thresholds (defaults 5/3/2/2)
- Recursion guard: [COMPRESSED:*] marker, 1-level only
- Downgrade chain: aggressive → caveman → lite → raw