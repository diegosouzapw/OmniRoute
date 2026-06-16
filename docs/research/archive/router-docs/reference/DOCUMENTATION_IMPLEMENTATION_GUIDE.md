# Documentation Implementation Guide

## Quick Start

This guide shows how to consolidate and reorganize 1,039 markdown files into a clean hierarchical tree structure.

---

## Phase 1: Bifrost-Extensions (27 files → 8 directories)

### Step 1: Create Directory Structure
```bash
cd bifrost-extensions
mkdir -p docs/{architecture,cli,deployment,evaluation,guides}
mkdir -p services/promptadapter/docs
```

### Step 2: Move & Consolidate Files

**Architecture Docs**
```
docs/architecture/
├── PRINCIPLES.md (from ARCHITECTURE_PRINCIPLES.md)
├── EXTENSION_LAYER.md (from EXTENSION_LAYER_GUIDE.md)
└── CLEAN_LAYER.md (from CLEAN_EXTENSION_LAYER.md)
```

**CLI Docs** (consolidate 5 files)
```
docs/cli/
├── README.md (new index)
├── ARCHITECTURE.md (from CLI_ARCHITECTURE.md)
├── GUIDE.md (merge CLI_GUIDE.md + CLI_INTEGRATION.md)
├── QUICK_REFERENCE.md (from CLI_QUICK_REFERENCE.md)
└── SUMMARY.md (from CLI_SUMMARY.md)
```

**Deployment Docs** (consolidate 3 files)
```
docs/deployment/
├── README.md (new index)
├── SERVERLESS.md (from SERVERLESS_DEPLOYMENT.md)
├── QUICK_START.md (from DEPLOY_QUICK_START.md)
└── COMPARISON.md (from DEPLOYMENT_COMPARISON.md)
```

**Evaluation Docs** (consolidate 6 files)
```
docs/evaluation/
├── README.md (new index)
├── SUMMARY.md (from EVALUATION_SUMMARY.md)
├── GAPS.md (merge GAPS_AND_MISSING_FEATURES_EVALUATION.md + GAPS_QUICK_REFERENCE.md)
├── TECHNICAL_DETAILS.md (from TECHNICAL_GAPS_DETAILED.md)
├── ROADMAP.md (from IMPLEMENTATION_ROADMAP.md)
└── CURRENT_VS_DESIRED.md (from CURRENT_VS_DESIRED_STATE.md)
```

**Guides**
```
docs/guides/
├── USAGE_EXAMPLES.md (from USAGE_EXAMPLES.md)
├── DATASOURCES.md (from ENHANCED_DATASOURCES.md)
└── AGENTS.md (from AGENTS.md)
```

### Step 3: Create Index Files

**docs/README.md**
```markdown
# Bifrost Extensions Documentation

## Quick Links
- [Architecture](./architecture/) - Design & principles
- [CLI](./cli/) - Command-line interface
- [Deployment](./deployment/) - Deployment guides
- [Evaluation](./evaluation/) - Gap analysis & roadmap
- [Guides](./guides/) - Usage examples & tutorials

## Getting Started
1. Read [Architecture/Principles](./architecture/PRINCIPLES.md)
2. Follow [CLI Guide](./cli/GUIDE.md)
3. Deploy using [Deployment Guide](./deployment/QUICK_START.md)
```

**bifrost-extensions/README.md** (update)
```markdown
# Bifrost Extensions

[Link to docs/README.md]
```

### Step 4: Update Cross-References
- Search for links to old files
- Update to new paths
- Test all links

### Step 5: Cleanup
```bash
# Remove old top-level files
rm CLI_*.md DEPLOYMENT_*.md EVALUATION_*.md GAPS_*.md
rm ARCHITECTURE_*.md CLEAN_*.md EXTENSION_*.md
rm TECHNICAL_*.md CURRENT_*.md IMPLEMENTATION_*.md
rm USAGE_*.md ENHANCED_*.md COMPLETION_*.md
```

---

## Phase 2: VibeProxy (16 files → 5 directories)

### Directory Structure
```
vibeproxy/
├── docs/
│   ├── README.md
│   ├── setup/ (4 files)
│   ├── architecture/ (3 files)
│   ├── guides/ (2 files)
│   └── reference/ (3 files)
```

### File Mapping
```
setup/:
  INSTALLATION.md
  DEV_SETUP.md
  FACTORY_SETUP.md
  INJECT_SETUP.md

architecture/:
  MONOREPO_MIGRATION.md
  SERVICES_CONFIG.md
  WINDOWS_UI.md

guides/:
  DUAL_ROUTER_IMPLEMENTATION.md
  MIGRATION.md

reference/:
  CHANGELOG.md
  FORK_ATTRIBUTION.md
  COMPLETION_SUMMARY.md
```

---

## Phase 3: CLIProxyAPI (75 files → 8 directories)

### Directory Structure
```
CLIProxyAPI/
├── docs/
│   ├── README.md
│   ├── getting-started/
│   ├── architecture/
│   ├── implementation/
│   ├── deployment/
│   ├── integration/
│   ├── sdk/
│   └── reference/
```

### Consolidation Strategy
- Merge multiple PHASE_*_STATUS.md → phases/README.md
- Consolidate IMPLEMENTATION_* files → implementation/
- Merge DEPLOYMENT_* files → deployment/
- Organize SDK docs → sdk/

---

## Phase 4: SmartCP Router (233 files → 8 directories)

### Directory Structure
```
smartcp/router/
├── docs/
│   ├── README.md
│   ├── architecture/
│   ├── implementation/
│   ├── deployment/
│   ├── migration/
│   ├── testing/
│   ├── sdk/
│   └── reference/
```

### Consolidation Strategy
- Move 51 docs/README.md files → docs/
- Consolidate 30 fix_output/ files → archive/
- Organize 31 work-prompts/ → guides/
- Merge multiple SUMMARY/INDEX files

---

## Root Level Consolidation

### Current (29 files)
```
AGENTS.md, CLAUDE.md, WARP.md (duplicates)
COMPLETE_*.md (5 files)
FINAL_*.md (3 files)
IMPLEMENTATION_*.md (2 files)
GOOSE_*.md (5 files)
START_HERE.md
... 6 more
```

### Proposed (1 file)
```
README.md (master index)
├── Bifrost Extensions
├── VibeProxy
├── CLIProxyAPI
├── SmartCP Router
├── Goose
└── Research & Planning
```

---

## Validation Checklist

- [ ] All files moved to correct directories
- [ ] No duplicate files remain
- [ ] All internal links updated
- [ ] README.md created for each directory
- [ ] Master README.md at root
- [ ] No broken links
- [ ] Consistent naming conventions
- [ ] <5 files per directory (except large projects)
- [ ] Clear navigation hierarchy
- [ ] All projects have docs/ subdirectory

---

## Tools & Commands

### Find Duplicate Files
```bash
find . -name "*.md" | sort | uniq -d
```

### Find Broken Links
```bash
grep -r "\[.*\](.*\.md)" --include="*.md" | grep -v "^Binary"
```

### Count Files by Directory
```bash
find . -name "*.md" | sed 's|/[^/]*$||' | sort | uniq -c
```

### Move Files Safely
```bash
# Preview
find . -name "CLI_*.md" -type f

# Move
find . -name "CLI_*.md" -type f -exec mv {} docs/cli/ \;
```

---

## Rollback Plan

If issues occur:
1. Git commit before each phase
2. Tag each phase completion
3. Can revert to previous state
4. Keep old structure in archive/ temporarily

---

## Success Metrics

✅ 1,039 files organized into hierarchy
✅ 0 duplicate files
✅ 0 broken links
✅ <5 files per directory
✅ Clear navigation
✅ Consistent naming
✅ All projects have README.md
✅ Master README.md at root

---

## Next Steps

1. Review this guide
2. Start Phase 1 (bifrost-extensions)
3. Validate structure
4. Continue with remaining phases
5. Update CI/CD if needed
6. Announce new structure to team

