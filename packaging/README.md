# Packaging

Distribution formats for OmniRoute. Each subdirectory holds the artifacts
for one channel; conventions live in the sub-README.

- `homebrew/` — Homebrew formula (`Formula/omniroute.rb`)

## Adding a new channel

1. Create `packaging/<channel>/` with a `README.md` describing the install
   path and bump procedure.
2. Keep generated artifacts (tarballs, sha256 sums) out of the repo —
   reference them by URL only.
3. If the channel needs a release-time CI job, add a workflow under
   `.github/workflows/` and reference it from the sub-README.
