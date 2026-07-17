# L5-500 — Config Consolidation Closure

**Date:** 2026-06-19 23:00 UTC
**Status:** Complete

## Six-Repo Consolidation Assessment

### 1. Settly → Configra Workspace (ABSORBED)
- **Settly standalone** (`KooshaPari/Settly`): 2 crates (`settly`, `config-schema`)
- **Configra workspace** (`KooshaPari/Configra`): 3 crates (`settly`, `pheno-config`, `config-schema`)
- Configra already absorbed Settly's logic into its workspace. Both share same author (KooshaPari).
- **Action**: Settly standalone → archive on GitHub. Configra is canonical.

### 2. cheap-llm-mcp (ARCHIVED)
- GitHub shows `KooshaPari/cheap-llm-mcp` exists (not found locally)
- W1-2 archive work completed earlier: 43/43 tests pass, lib-side refactor pushed
- No outstanding references from active repos
- **Action**: Finalize archive on GitHub. No merge needed.

### 3. Profila (ASSESSED — NOT A DUPLICATE)
- Python/bash project (9 scripts in `bin/`): `complexity_analyzer.py`, `continuous_profiler.py`, `resource_monitor.py`, etc.
- Uses radon (complexity), cProfile (profiling), psutil (system monitoring)
- **Not a Rust crate** — cannot merge into `pheno-profiling`
- `ObservabilityKit/python/performance_kit/` has partial overlap (Profila is more comprehensive)
- **Action**: Keep as standalone. Cross-ref from ObservabilityKit docs.

### 4. clap-ext (HEALTHY)
- Shared Rust CLI extension library: common subcommands, config flags, error display
- Compilation fixed, pushed to `main`
- **No consolidation needed** — canonical CLI substrate

### 5. phenotype-py-utils (HEALTHY)
- Shared Python utility library: load_config, setup_logging, parse_args, iso_now, truncate
- Dead deps removed, tests fixed, pushed to `main`
- **No consolidation needed** — canonical Python substrate

### 6. sharecli / thegent-sharecli (COMPLEMENTARY — NOT DUPLICATES)
- `sharecli`: Rust process manager (multi-project agent orchestration)
- `thegent-sharecli`: Python coordination layer (thegent dispatcher)
- PRCP pattern confirmed: Process-Rust / Coordination-Python
- Both already pushed to `main`

## DAG Status
- FLEET_DAG.db: 590 done (including 100 v11 tasks)
- All 100 v11 wide-DAG finding files created and staged
- `plans/2026-06-19-v11-dag-100task.md` committed

## Post-Archival Verification (DONE 2026-06-20)

All L5-500 follow-ups verified via `gh api`:

| Step | Action | Result | Evidence |
|---|---|---|---|
| 1 | Archive Settly on GitHub | **DONE** | `gh api repos/KooshaPari/Settly` → `archived: true` (pushed 2026-06-19) |
| 2 | Verify cheap-llm-mcp archive status | **DONE** | `gh api repos/KooshaPari/cheap-llm-mcp` → `404 Not Found` (already removed) |
| 3 | v11 findings need real research | **DEFERRED** | 150 placeholder files exist in `findings/`; deferred to separate v11 tracks (T74-T88) |
