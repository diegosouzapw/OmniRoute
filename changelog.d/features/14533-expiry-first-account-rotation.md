- **feat(providers):** add `expiry-first`, a per-provider account fallback strategy that spends the
  quota closest to being lost. It ranks each account by how much it must burn per hour to avoid
  wasting its leftover at the next reset (`usable / hoursUntilNearestReset`), so a full account
  whose window closes soon outranks an equally full one that holds for days, while a nearly empty
  account never wins on its near reset alone. `fill-first` drains the top-priority account and lets
  the rest roll over unspent; on a four-account Codex pool that left an 88% account untouched
  through a reset. Distinct from `reset-aware`, whose `resetUrgency * (1 - remaining)` term is a
  recovery signal and saturates to zero outside the nominal window length. Session stickiness and
  prompt-cache affinity are untouched; accounts within `expiryFirstTieBandPercent` rotate
  least-recently-used.
