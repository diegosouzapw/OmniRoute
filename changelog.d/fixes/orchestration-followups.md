- **fix(dashboard):** five follow-ups from the Phase 2 Orchestration Canvas review. The History
  drawer now shows the memory section for runs that already left the live TTL window: the
  persisted `memory_hits` event is parsed into `metadata.memoryHits` with the same defensive
  validation the drawer applies, and — because that event is observability rather than a state
  transition — it no longer leaks into the timeline, where it had been inheriting the task's
  state and rendering as a duplicate transition. The A2A memory recall runs against its own 1.5s
  deadline instead of inheriting the memory backend's 30s one; overshooting degrades exactly like
  any other recall failure (no hits, task proceeds), and the timer is cleared on both paths.
  Repeating a Conductor run carries its `requirements.cli`/`requirements.model` forward, so the
  new run is pinned to the same runner profile and model rather than drifting to whatever the
  fleet picks. A successful repeat from the Agents tab now focuses the run it created, instead of
  leaving the operator on the finished one. And the auth test for `POST /api/conductor/tasks`
  moved into the shared `ROUTES` array rather than restating the pattern.

  Closes #12639
