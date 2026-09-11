- **fix(dashboard):** nine fixes on the Orchestration Canvas, all diagnosed in the Phase 2 reviews.
  A source that fails now keeps the timestamp of its FIRST failure instead of being re-stamped
  every poll — the stale line said "since the last poll" no matter how long the source had been
  down, and the churn also defeated the snapshot's stable identity (it serializes the source list),
  so the canvas re-rendered on every tick while anything was broken. A source that HAD data and
  only then started failing is flagged too: previously only a source with no node at all got the
  warning, so a source that went down mid-session kept a healthy-looking node forever. The rest are
  pointwise: clicking a filter chip cancels the pending search debounce (left armed, it fired
  ~300ms later and silently reverted the chip); the search input carries an accessible name;
  `?state=running, failed` parses like the unpadded form instead of dropping the padded value; the
  CSV toggle helper is defined once in `model/urlParams.ts` rather than twice; the agents tab tells
  "nothing running" apart from "the filter matched nothing", offering a clear-filters button
  instead of setup links that would be wrong advice there; edges stop emitting SMIL particles above
  40 simultaneously active edges, keeping the colored stroke; and the drawer's error banner clears
  when a retried action succeeds.

  Closes #12392
