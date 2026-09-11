- **feat(dashboard):** the orchestration History tab gained a "Compare runs" mode — toggling it
  turns each grid cell into a 2-item selection queue (a 3rd click drops the oldest pick), and
  picking two cells opens a side-by-side comparison panel instead of the usual detail drawer.
  The panel fetches both runs' detail the same way the drawer does (falling back to persisted
  history once a run leaves the live TTL window) and shows, per side: identity/source/state,
  start time, a signed `right - left` delta for duration/cost/event count, the event timeline
  aligned by index, and any memory hits. One side's fetch failing never blocks the other, and a
  delta is only ever computed when both sides have a finite value — otherwise it renders "—",
  never `NaN`. Comparing two runs from different sources or skills still works; a banner marks
  the deltas as informational rather than hiding them, since the two runs aren't a strict
  apples-to-apples pair.
