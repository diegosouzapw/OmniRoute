---
name: quality-scan
description: Run a scoped, read-only quality scan and report exact-candidate evidence, failures and frozen debt. Use for an ad-hoc gate sweep or release preparation; a static scan is not full release acceptance.
---

# Quality scan

## Choose the scope

Read `../_shared/base-green.md` before interpreting base or PR health.

- Default: the static `quality-scan` profile.
- Fast: `quality-scan-fast`; explicitly report omitted gates.
- A named npm alias: that alias only.
- Base status: inspect remote evidence; no local suite is implied.
- Full release/PR acceptance: inspect the applicable workflow lanes and use
  `../validate-release-green/SKILL.md` for the local observer's limited scope.

When present, `config/quality/gate-manifest.json` owns static profile membership
and the npm-alias inventory. `package.json` owns commands and runtimes.
Use `npm run check:gate-manifest` and the scan's `--list` mode to measure the
current inventory. An alias, workflow job, matrix instance and test case are
different units. Never substitute a remembered count for this inventory.

If the candidate predates the manifest, inspect its actual package scripts,
aggregator and workflows; label the inventory provisional. Do not invent a
missing command or claim manifest enforcement on an older branch.

## Execute and preserve evidence

Pin the base and candidate SHAs in an isolated worktree. Run the actual npm
entrypoints: direct file invocation can change the required Node/Bun runtime.
Record command, cwd, versions, start/end, exit/signal, selected scope and log path.
Use the gate process supervisor when the candidate provides it. Otherwise capture
the command's own exit before displaying a summary, for example:

```bash
scan_log=$(mktemp)
if npm run quality:scan >"$scan_log" 2>&1; then
  scan_exit=0
else
  scan_exit=$?
fi
tail -n 30 "$scan_log"
printf 'scan_exit=%s log=%s\n' "$scan_exit" "$scan_log"
```

Missing dependencies, timeout, cancellation and unavailable artifacts are
incomplete evidence, not PASS. A scan may write logs/reports; it does not update
baselines, mutate product code or contact live providers unless explicitly scoped.

## Report the result

Report the selected profile and SHA, executed/failed/not-run counts, raw logs and
the remaining acceptance lanes. PASS applies only to the executed scope.
List frozen debt separately from new findings. A nonzero exit proves a failed
execution, not that the contributor introduced it: use the causal comparison in
the shared base-green protocol.

If the tracked skill-contract checker exists, `npm run check:quality-skill-contract`
compares these private instructions with the versioned templates. Missing private
skills are NOT_INSTALLED, not evidence that their instructions were validated.

Stop after the report for scan-only requests. Fixes require a change request;
baseline changes require their own reviewed justification. Preserve existing
thresholds and assertions throughout recovery.
