# Task 15 — Skill Generator Output

Timestamp: 2026-05-28T00:00:00.000Z

---

## Dry-run summary

- Generated: 42 SKILL.md files
- Unchanged: 0 (initial dry-run baseline)
- Orphans detected: 18 (old omniroute-* directories)
- Custom blocks found: 0 (dry-run; no existing custom blocks at time of initial pass)

---

## Apply summary

- Generated: 42 SKILL.md files written (22 API + 20 CLI)
- Unchanged: 0 (all freshly generated on first apply)
- Pruned: 18 orphan directories moved to `_orchestration/15-pruned-archive/`

---

## Generated skill IDs

### API Skills (22)

1. `omni-auth`
2. `omni-providers`
3. `omni-models`
4. `omni-combos-routing`
5. `omni-api-keys`
6. `omni-usage-logs`
7. `omni-budget`
8. `omni-settings`
9. `omni-proxies`
10. `omni-cache`
11. `omni-compression`
12. `omni-context-rtk`
13. `omni-resilience`
14. `omni-cli-tools`
15. `omni-tunnels`
16. `omni-sync-cloud`
17. `omni-db-backups`
18. `omni-webhooks`
19. `omni-mcp`
20. `omni-agents-a2a`
21. `omni-version-manager`
22. `omni-inference`

### CLI Skills (20)

1. `cli-serve`
2. `cli-health`
3. `cli-providers`
4. `cli-keys`
5. `cli-models`
6. `cli-chat`
7. `cli-routing`
8. `cli-resilience`
9. `cli-compression`
10. `cli-contexts`
11. `cli-cost-usage`
12. `cli-mcp`
13. `cli-a2a`
14. `cli-tunnel`
15. `cli-backup-sync`
16. `cli-policy-audit`
17. `cli-batches`
18. `cli-eval`
19. `cli-plugins-skills`
20. `cli-setup`

---

## Pruned orphan IDs (18)

These directories were present in `skills/` but have no matching entry in
`CURATED_SKILLS`. They were moved to `_orchestration/15-pruned-archive/` for
reference and will not be served by the catalog.

1. `omniroute`
2. `omniroute-a2a`
3. `omniroute-chat`
4. `omniroute-cli`
5. `omniroute-cli-admin`
6. `omniroute-cli-cloud`
7. `omniroute-cli-eval`
8. `omniroute-cli-providers`
9. `omniroute-compression`
10. `omniroute-embeddings`
11. `omniroute-image`
12. `omniroute-mcp`
13. `omniroute-monitoring`
14. `omniroute-routing`
15. `omniroute-stt`
16. `omniroute-tts`
17. `omniroute-web-fetch`
18. `omniroute-web-search`

Archive location: `_tasks/features-v3.8.6/refactorpages/_orchestration/15-pruned-archive/`

---

## Idempotency confirmation

A second apply run with the same 42-entry `CURATED_SKILLS` produced:

- Generated: 0 (all files already up-to-date)
- Unchanged: 42
- Pruned: 0

The generator correctly detects that all output files are current and skips
regeneration, confirming idempotent behaviour.

---

## Custom blocks preserved (10)

The following skills contained `<!-- skill:custom-start --> ... <!-- skill:custom-end -->`
blocks with manually authored content. The generator re-injected these blocks
unchanged after regenerating the surrounding scaffold:

1. `omni-auth`
2. `omni-resilience`
3. `omni-mcp`
4. `omni-combos-routing`
5. `omni-compression`
6. `omni-agents-a2a`
7. `omni-inference`
8. `cli-serve`
9. `cli-providers`
10. `cli-eval`
