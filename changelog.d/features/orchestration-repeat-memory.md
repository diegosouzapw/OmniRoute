- **feat(dashboard):** the orchestration detail drawer gained a "Repeat" action for Cloud Agent,
  A2A and Conductor tasks — a two-click confirm (click once to arm, click again within the
  confirm window to fire) re-submits the original prompt/input as a new run. The button is
  disabled with an explanatory tooltip whenever the original input can't be recovered from the
  loaded task detail (e.g. it never carried a prompt, or the detail failed to load).
  Two limitations of the A2A variant, by design: it targets the `/a2a` JSON-RPC endpoint, which
  authenticates with an API key only (`REQUIRE_API_KEY=true` or a configured `OMNIROUTE_API_KEY`
  makes a dashboard-session repeat answer `HTTP 400` — surfaced verbatim in the drawer's error
  line, never as a success), and the `message/send` call is SYNCHRONOUS: the POST blocks for the
  whole skill run, so the success confirmation only appears once the repeated task finishes.
  A dashboard-authenticated A2A creation path is deliberately left to a follow-up — widening the
  endpoint's auth posture is an operator decision, not a side effect of this feature.
- **feat(a2a):** A2A task execution now records which memories were consulted for the task's
  last user message as `metadata.memoryHits` (id/key/type/content-snippet) plus a `memory_hits`
  history event, purely for observability — the retrieved memory is never injected into a
  skill's prompt or behavior. Gated by the `OMNIROUTE_A2A_MEMORY_HITS` kill-switch (default
  enabled; set to `0` to skip the recall lookup entirely). The drawer's new "Memory used"
  section lists these hits for a2a tasks and is omitted whenever there are none. Known
  limitation: recall only resolves under the keyless posture — a keyed caller's task owner is a
  SHA-256 prefix of the API key, while memory rows are keyed by the database api-key id, and no
  hash→id lookup exists today, so the hit list stays empty for keyed callers. The recorded hits
  are also kept out of the task's own `input` (and therefore out of the persisted input and of
  the "Repeat" request body), so repeating a task never re-sends the previous run's memory
  snippets.
