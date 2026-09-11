- **chore(tests):** 51 test files that had been excluded from Vitest are running again, restoring
  roughly 350 assertions to the blocking suite. Each was measured individually first: of the 62
  files parked behind the `// #8618 — pre-existing failure` comment, 51 pass against the current
  tree with no source change, so the exclusions had outlived the failures they were added for.
  The 11 that genuinely still fail stay excluded, but now point at a live tracker (#13204) rather
  than at #8618, which was closed in August while the list it tracked kept growing.
