Add an opt-in, immutable Git-based test-selection policy for three Node segments across eight explicit-file shards and both Vitest lanes, with rejection of missing, extra, duplicate or self-reduced selections. Existing CI runners and coverage floors remain unchanged pending shadow and wiring validation.

Use the native Node glob matcher only for Node lanes and a direct, pinned picomatch dependency for Vitest lanes, preserving route-group parentheses semantics. Explicitly allowlist verified coverage dependencies without re-resolving the lockfile or relaxing dependency checks.

Include hidden paths in Vitest selection, matching the installed runner's `dot: true` discovery option; Node discovery keeps its native semantics.
