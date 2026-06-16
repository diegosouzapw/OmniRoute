# Documentation File Mapping

## Bifrost-Extensions (27 files)

### Architecture (3 files)
```
ARCHITECTURE_PRINCIPLES.md
  → docs/architecture/PRINCIPLES.md

EXTENSION_LAYER_GUIDE.md
  → docs/architecture/EXTENSION_LAYER.md

CLEAN_EXTENSION_LAYER.md
  → docs/architecture/CLEAN_LAYER.md
```

### CLI (5 files)
```
CLI_ARCHITECTURE.md
  → docs/cli/ARCHITECTURE.md

CLI_GUIDE.md + CLI_INTEGRATION.md
  → docs/cli/GUIDE.md (MERGE)

CLI_QUICK_REFERENCE.md
  → docs/cli/QUICK_REFERENCE.md

CLI_SUMMARY.md
  → docs/cli/SUMMARY.md

CLI_INDEX.md
  → docs/cli/README.md (RENAME)
```

### Deployment (3 files)
```
SERVERLESS_DEPLOYMENT.md
  → docs/deployment/SERVERLESS.md

DEPLOY_QUICK_START.md
  → docs/deployment/QUICK_START.md

DEPLOYMENT_COMPARISON.md
  → docs/deployment/COMPARISON.md

SERVERLESS_INDEX.md + SERVERLESS_SUMMARY.md
  → docs/deployment/README.md (MERGE)
```

### Evaluation (6 files)
```
EVALUATION_SUMMARY.md
  → docs/evaluation/SUMMARY.md

GAPS_AND_MISSING_FEATURES_EVALUATION.md + GAPS_QUICK_REFERENCE.md
  → docs/evaluation/GAPS.md (MERGE)

TECHNICAL_GAPS_DETAILED.md
  → docs/evaluation/TECHNICAL_DETAILS.md

IMPLEMENTATION_ROADMAP.md
  → docs/evaluation/ROADMAP.md

CURRENT_VS_DESIRED_STATE.md
  → docs/evaluation/CURRENT_VS_DESIRED.md

EVALUATION_INDEX.md
  → docs/evaluation/README.md (RENAME)
```

### Guides (3 files)
```
USAGE_EXAMPLES.md
  → docs/guides/USAGE_EXAMPLES.md

ENHANCED_DATASOURCES.md
  → docs/guides/DATASOURCES.md

AGENTS.md
  → docs/guides/AGENTS.md
```

### Services (2 files)
```
services/promptadapter/DATASETS.md
  → services/promptadapter/docs/DATASETS.md

docs/AI_ML_ARCHITECTURE.md
  → services/promptadapter/docs/AI_ML_ARCHITECTURE.md
```

### Root Level (5 files - DELETE)
```
COMPLETION_SUMMARY.md → DELETE (duplicate)
CLAUDE.md → DELETE (duplicate)
README_CLI.md → DELETE (moved to docs/cli/)
WARP.md → DELETE (duplicate)
(1 more) → DELETE
```

---

## VibeProxy (16 files)

### Setup (4 files)
```
INSTALLATION.md → docs/setup/INSTALLATION.md
DEV_SETUP.md → docs/setup/DEV_SETUP.md
FACTORY_SETUP.md → docs/setup/FACTORY_SETUP.md
INJECT_SETUP.md → docs/setup/INJECT_SETUP.md
```

### Architecture (3 files)
```
MONOREPO_MIGRATION.md → docs/architecture/MONOREPO_MIGRATION.md
SERVICES_CONFIG.md → docs/architecture/SERVICES_CONFIG.md
WINDOWS_UI_COMPLETE.md → docs/architecture/WINDOWS_UI.md
```

### Guides (2 files)
```
DUAL_ROUTER_IMPLEMENTATION_PLAN.md → docs/guides/DUAL_ROUTER.md
MIGRATION_COMPLETE.md → docs/guides/MIGRATION.md
```

### Reference (3 files)
```
CHANGELOG.md → docs/reference/CHANGELOG.md
FORK_ATTRIBUTION.md → docs/reference/FORK_ATTRIBUTION.md
COMPLETION_SUMMARY.md → docs/reference/COMPLETION_SUMMARY.md
```

### Root Level (4 files - DELETE)
```
AGENTS.md → DELETE (duplicate)
CLAUDE.md → DELETE (duplicate)
WARP.md → DELETE (duplicate)
README.md → KEEP (main entry)
```

---

## CLIProxyAPI (75 files)

### Getting Started (5 files)
```
QUICK_START.md → docs/getting-started/QUICK_START.md
INSTALLATION.md → docs/getting-started/INSTALLATION.md
FORK_GUIDE.md → docs/getting-started/FORK_GUIDE.md
CONTRIBUTING.md → docs/getting-started/CONTRIBUTING.md
SECURITY.md → docs/getting-started/SECURITY.md
```

### Architecture (8 files)
```
COMPLETE_ARCHITECTURE_100.md → docs/architecture/COMPLETE.md
SIMPLIFIED_ARCHITECTURE.md → docs/architecture/SIMPLIFIED.md
INFRASTRUCTURE_SUMMARY.md → docs/architecture/INFRASTRUCTURE.md
MICROSERVICE_DEPLOYMENT.md → docs/architecture/MICROSERVICE.md
FULL_STACK_IMPLEMENTATION_PLAN.md → docs/architecture/FULL_STACK.md
INTELLIGENT_ROUTER_PROPOSAL.md → docs/architecture/INTELLIGENT_ROUTER.md
DUAL_ROUTER_*.md (5 files) → docs/architecture/DUAL_ROUTER.md (MERGE)
```

### Implementation (12 files)
```
IMPLEMENTATION_GUIDE.md → docs/implementation/GUIDE.md
IMPLEMENTATION_SUMMARY.md → docs/implementation/SUMMARY.md
COMPLETE_DELIVERY_INDEX.md → docs/implementation/DELIVERY_INDEX.md
COMPLETE_PROJECT_INDEX.md → docs/implementation/PROJECT_INDEX.md
COMPLETE_GAP_ANALYSIS_AND_FIXES.md → docs/implementation/GAP_ANALYSIS.md
CUSTOM_IMPLEMENTATION_BREAKDOWN.md → docs/implementation/CUSTOM_BREAKDOWN.md
CUSTOM_VS_LIBRARY_DETAILED.md → docs/implementation/CUSTOM_VS_LIBRARY.md
DELIVERY_MANIFEST.md → docs/implementation/DELIVERY_MANIFEST.md
FINAL_DELIVERY_SUMMARY.md → docs/implementation/FINAL_DELIVERY.md
FINAL_REMAINING_GAPS_FIXED.md → docs/implementation/FINAL_GAPS.md
SESSION_COMPLETION_REPORT.md → docs/implementation/SESSION_REPORT.md
VALIDATION_AGAINST_INITIAL_ASK.md → docs/implementation/VALIDATION.md
```

### Deployment (5 files)
```
DEPLOYMENT_GUIDE.md → docs/deployment/GUIDE.md
FULL_STACK_DEPLOYMENT_GUIDE.md → docs/deployment/FULL_STACK.md
PULUMI_GUIDE.md → docs/deployment/PULUMI.md
PHASE_*_STATUS.md (5 files) → docs/deployment/PHASES.md (MERGE)
```

### Integration (4 files)
```
docs/integration/BIFROST_GATEWAY_INTEGRATION_FINAL.md → docs/integration/BIFROST_GATEWAY.md
docs/integration/DYNAMIC_SERVICE_DISCOVERY_IMPLEMENTATION.md → docs/integration/DYNAMIC_DISCOVERY.md
MLX_BIFROST_INTEGRATION.md → docs/integration/MLX_BIFROST.md
AUGMENT_INTEGRATION_CLARIFICATION.md → docs/integration/AUGMENT.md
```

### SDK (6 files)
```
docs/sdk-*.md (6 files) → docs/sdk/GUIDE.md (MERGE)
SDK_IMPLEMENTATION_REPORT.md → docs/sdk/IMPLEMENTATION.md
```

### Reference (10 files)
```
API_REFERENCE.md → docs/reference/API.md
CHANGELOG.md → docs/reference/CHANGELOG.md
RELEASE_NOTES.md → docs/reference/RELEASE_NOTES.md
FALLBACK_RULES_REFERENCE.md → docs/reference/FALLBACK_RULES.md
TOOLS_*.md (5 files) → docs/reference/TOOLS.md (MERGE)
RESEARCH_EXISTING_LIBRARIES.md → docs/reference/RESEARCH.md
```

### Root Level (25 files - DELETE)
```
AGENTS.md → DELETE
CLAUDE.md → DELETE
WARP.md → DELETE
(22 more duplicates/old files)
```

---

## SmartCP Router (233 files)

### Architecture (20 files)
```
docs/architecture/*.md → docs/architecture/
HEXAGONAL_ARCHITECTURE.md → docs/architecture/HEXAGONAL.md
POLICY_ENGINE_ARCHITECTURE.md → docs/architecture/POLICY_ENGINE.md
UNIFIED_TYPES_ARCHITECTURE.md → docs/architecture/UNIFIED_TYPES.md
(17 more)
```

### Implementation (40 files)
```
docs/implementation/*.md → docs/implementation/
IMPLEMENTATION_*.md (10 files) → docs/implementation/
ROUTER_IMPLEMENTATION_GUIDE.md → docs/implementation/GUIDE.md
(27 more)
```

### Deployment (15 files)
```
docs/deployment/*.md → docs/deployment/
M1_DEPLOYMENT_*.md (10 files) → docs/deployment/M1.md (MERGE)
(5 more)
```

### Migration (9 files)
```
docs/migration/*.md → docs/migration/
MIGRATION_*.md (5 files) → docs/migration/
(4 more)
```

### Testing (20 files)
```
docs/test_*.md → docs/testing/
tests/benchmarks/*.md → docs/testing/BENCHMARKS.md (MERGE)
tests/validation/*.md → docs/testing/VALIDATION.md (MERGE)
(14 more)
```

### SDK (8 files)
```
docs/sdk/*.md → docs/sdk/
SDK_*.md (3 files) → docs/sdk/
(5 more)
```

### Reference (30 files)
```
docs/reference/*.md → docs/reference/
ROUTER_*.md (15 files) → docs/reference/
MONITORING_*.md (5 files) → docs/reference/MONITORING.md (MERGE)
(10 more)
```

### Root Level (91 files - DELETE)
```
AGENTS.md → DELETE
CLAUDE.md → DELETE
WARP.md → DELETE
(88 more duplicates/old files)
```

---

## Root Level Consolidation (29 files)

### Keep (1 file)
```
README.md → Master index (UPDATE)
```

### Move to /docs/research/
```
GOOSE_*.md (5 files)
PYTHON_DSL_SPECIFICATION.md
ANALYTICS_SYSTEM_ARCHITECTURE.md
BI_DIRECTIONAL_GRAPHQL_IMPLEMENTATION.md
ROUTER_BENCHMARK_ARCHITECTURE.md
DEEP_COMPARISON_ANALYSIS.md
CRITICAL_GAPS_ANALYSIS.md
TOOL_CALL_OPTIMIZATION.md
TOOL_DISCOVERY_COLD_START.md
UNIFIED_ARCHITECTURE.md
COMPLETE_FINDINGS.md
COMPLETE_IMPLEMENTATION_PLAN.md
CONSOLIDATION_PLAN.md
FINAL_ARCHITECTURE.md
GO_PLUGIN_OPTIMIZATION.md
MERGE_IMPLEMENTATION_PLAN.md
SMARTCP_INTERNAL_API.md
```

### Delete (3 files - duplicates)
```
AGENTS.md
CLAUDE.md
WARP.md
```

### Keep at Root (1 file)
```
START_HERE.md (update to point to README.md)
```

---

## Summary

| Project | Files | Directories | Consolidation |
|---------|-------|-------------|---|
| bifrost-extensions | 27 | 8 | 5 merges |
| vibeproxy | 16 | 5 | 2 merges |
| CLIProxyAPI | 75 | 8 | 12 merges |
| smartcp/router | 233 | 8 | 40+ merges |
| Root level | 29 | 1 | 26 deletions |
| **TOTAL** | **1,039** | **~50** | **85+ merges** |

---

## Merge Strategy

When merging files:
1. Keep all content (no reduction)
2. Create clear sections with headers
3. Add table of contents
4. Update cross-references
5. Add "See also" links
6. Maintain original file names in comments

Example:
```markdown
# Combined Guide

## Section 1: From CLI_GUIDE.md
[content]

## Section 2: From CLI_INTEGRATION.md
[content]

## See Also
- [Architecture](./ARCHITECTURE.md)
- [Quick Reference](./QUICK_REFERENCE.md)
```

