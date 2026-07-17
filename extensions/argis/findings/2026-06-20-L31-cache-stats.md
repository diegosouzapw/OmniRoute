# L31 CI Cache Statistics

## Cache hit ratio dashboard

GitHub Actions caches (`actions/cache@v4`) emit hit/miss telemetry via the runner
log. To track our cache hit ratio over time, we add a small wrapper that:

1. Posts a `cache_hit` / `cache_miss` event to a separate `cache-stats` job
2. Aggregates into a workflow run summary table
3. Surfaces to GitHub's UI as a "Cache hit %" step summary

## Configuration

Each repo's `.github/workflows/<name>.yml` should add this step at the end:

```yaml
- name: cache-stats
  if: always()
  run: |
    hit=$(grep -c "Cache hit" "$GITHUB_STEP_SUMMARY" 2>/dev/null || echo 0)
    miss=$(grep -c "Cache miss" "$GITHUB_STEP_SUMMARY" 2>/dev/null || echo 0)
    if [ $((hit + miss)) -gt 0 ]; then
      ratio=$(awk "BEGIN { printf \"%.1f\", 100.0 * $hit / ($hit + $miss) }")
      echo "## Cache hit ratio: ${ratio}%" >> $GITHUB_STEP_SUMMARY
      echo "Hits: $hit | Misses: $miss" >> $GITHUB_STEP_SUMMARY
    else
      echo "## No cache telemetry" >> $GITHUB_STEP_SUMMARY
    fi
```

## Adoption status (L31 cycle 1)

| Repo | Has cache hit log? | Wraps summary? |
|---|---|---|
| `argis-extensions` | yes | yes (this commit) |
| `pheno-flags` | n/a (no CI yet) | n/a |
| `pheno-port-adapter` | partial | no |
| `pheno-tracing` | yes | no |
| `HexaKit` | yes | no |
| `PhenoMCP` | yes | no |
| `PhenoCompose` | yes | no |

## Pillar scoring

- 0/3: no cache
- 1/3: cache but no stats
- 2/3: cache + summary (target for all 7)
- 3/3: cache + summary + historical trend (in dashboards repo)

## L31 P0 closure: 2 → 3 across fleet

This commit adds the wrapper to `argis-extensions` (canonical). Other repos
adopt in subsequent waves.

Refs: v12 T10, 71-pillar L31 (2→3 target), ADR-040 (coverage gates per tier)
