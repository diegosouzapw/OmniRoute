# Documentation Consolidation & Reorganization Plan

## Executive Summary

**Total Markdown Files: 1,039**
- bifrost-extensions: 27 files
- vibeproxy: 16 files  
- CLIProxyAPI: 75 files
- smartcp/router: 233 files
- goose: 100+ files
- Top-level: 29 files
- Other projects: 500+ files

**Goal**: Create a hierarchical documentation tree rooted at README files with proper subdirectories and indexes.

---

## Current State Analysis

### Problem Areas
1. **Flat Structure**: 29 top-level MDs at root (should be 1-2)
2. **Duplicate Indexes**: Multiple INDEX/SUMMARY/QUICK_REFERENCE files per project
3. **Scattered Docs**: Related docs in multiple locations
4. **No Clear Hierarchy**: No parent-child relationships between docs
5. **Naming Chaos**: Similar names across projects (AGENTS.md, CLAUDE.md, WARP.md)

### Distribution
```
smartcp/router:     233 files (22%)
CLIProxyAPI:         75 files (7%)
goose:              100+ files (10%)
bifrost-extensions:  27 files (3%)
vibeproxy:           16 files (2%)
Top-level:           29 files (3%)
Other:              500+ files (53%)
```

---

## Proposed Structure

### Root Level (1 README)
```
/README.md (Master index)
├── /docs/
│   ├── README.md (Documentation hub)
│   ├── /bifrost/
│   ├── /vibeproxy/
│   ├── /cliproxy/
│   ├── /smartcp/
│   ├── /goose/
│   └── /research/
├── /bifrost-extensions/
│   ├── README.md
│   ├── /docs/
│   └── /guides/
├── /vibeproxy/
│   ├── README.md
│   ├── /docs/
│   └── /guides/
└── /CLIProxyAPI/
    ├── README.md
    ├── /docs/
    └── /guides/
```

---

## Phase 1: Bifrost-Extensions (27 files)

### Current Files (27)
- 5 CLI docs (CLI_*.md)
- 3 Evaluation docs (EVALUATION_*, GAPS_*)
- 3 Deployment docs (DEPLOY_*, SERVERLESS_*)
- 3 Architecture docs (ARCHITECTURE_*, CLEAN_*, EXTENSION_*)
- 13 other docs

### Proposed Structure
```
bifrost-extensions/
├── README.md (main entry)
├── /docs/
│   ├── README.md (index)
│   ├── /architecture/
│   │   ├── PRINCIPLES.md
│   │   ├── EXTENSION_LAYER.md
│   │   └── CLEAN_LAYER.md
│   ├── /cli/
│   │   ├── README.md
│   │   ├── ARCHITECTURE.md
│   │   ├── GUIDE.md
│   │   ├── QUICK_REFERENCE.md
│   │   └── INTEGRATION.md
│   ├── /deployment/
│   │   ├── README.md
│   │   ├── SERVERLESS.md
│   │   ├── QUICK_START.md
│   │   └── COMPARISON.md
│   ├── /evaluation/
│   │   ├── README.md
│   │   ├── SUMMARY.md
│   │   ├── GAPS.md
│   │   ├── TECHNICAL_DETAILS.md
│   │   ├── ROADMAP.md
│   │   └── CURRENT_VS_DESIRED.md
│   └── /guides/
│       ├── USAGE_EXAMPLES.md
│       ├── DATASOURCES.md
│       └── AGENTS.md
└── /services/
    └── promptadapter/
        └── /docs/
            ├── DATASETS.md
            └── AI_ML_ARCHITECTURE.md
```

---

## Phase 2: VibeProxy (16 files)

### Proposed Structure
```
vibeproxy/
├── README.md (main entry)
├── /docs/
│   ├── README.md (index)
│   ├── /setup/
│   │   ├── INSTALLATION.md
│   │   ├── DEV_SETUP.md
│   │   ├── FACTORY_SETUP.md
│   │   └── INJECT_SETUP.md
│   ├── /architecture/
│   │   ├── MONOREPO_MIGRATION.md
│   │   ├── SERVICES_CONFIG.md
│   │   └── WINDOWS_UI.md
│   ├── /guides/
│   │   ├── DUAL_ROUTER_IMPLEMENTATION.md
│   │   └── MIGRATION.md
│   └── /reference/
│       ├── CHANGELOG.md
│       ├── FORK_ATTRIBUTION.md
│       └── COMPLETION_SUMMARY.md
└── /apps/
    ├── macos/
    ├── windows/
    └── linux/
```

---

## Phase 3: CLIProxyAPI (75 files)

### Proposed Structure
```
CLIProxyAPI/
├── README.md (main entry)
├── /docs/
│   ├── README.md (index)
│   ├── /getting-started/
│   ├── /architecture/
│   ├── /implementation/
│   ├── /deployment/
│   ├── /integration/
│   ├── /phases/
│   ├── /sdk/
│   ├── /guides/
│   └── /reference/
└── /openspec/
    └── /changes/
```

---

## Phase 4: SmartCP Router (233 files)

### Proposed Structure
```
smartcp/router/
├── README.md (main entry)
├── /docs/
│   ├── README.md (index)
│   ├── /architecture/
│   ├── /implementation/
│   ├── /deployment/
│   ├── /migration/
│   ├── /testing/
│   ├── /sdk/
│   ├── /guides/
│   └── /reference/
└── /router_core/
    └── /docs/
```

---

## Consolidation Rules

### 1. Merge Similar Docs
- Combine multiple INDEX/SUMMARY files → single README.md per directory
- Merge QUICK_REFERENCE + GUIDE → single GUIDE.md
- Consolidate ARCHITECTURE + PRINCIPLES → ARCHITECTURE.md

### 2. Eliminate Duplicates
- Remove duplicate AGENTS.md, CLAUDE.md, WARP.md (keep only in project root)
- Consolidate multiple EVALUATION files → /evaluation/ directory

### 3. Organize by Purpose
- **Getting Started**: Installation, setup, quick start
- **Architecture**: Design, principles, patterns
- **Implementation**: Guides, examples, tutorials
- **Deployment**: Deployment guides, configurations
- **Reference**: API docs, changelogs, troubleshooting

### 4. Naming Conventions
- README.md: Directory index
- ARCHITECTURE.md: Design & principles
- GUIDE.md: How-to guides
- QUICK_START.md: Quick reference
- REFERENCE.md: API/technical reference
- TROUBLESHOOTING.md: Problem solving

---

## Implementation Steps

### Step 1: Create Directory Structure
- Create /docs subdirectories for each project
- Create category subdirectories (architecture, guides, etc.)

### Step 2: Move & Consolidate Files
- Move files to appropriate directories
- Merge duplicate/similar files
- Update cross-references

### Step 3: Create Index Files
- Create README.md for each directory
- Create master README.md at root
- Link all documents in hierarchy

### Step 4: Update Links
- Update all internal links
- Update navigation in README files
- Test all links

### Step 5: Cleanup
- Remove old top-level files
- Remove duplicate files
- Archive old structure

---

## Success Criteria

✅ Single root README.md
✅ All docs in hierarchical tree
✅ No duplicate files
✅ Clear navigation between docs
✅ Consistent naming conventions
✅ All links working
✅ <5 files per directory (except large projects)

---

## Timeline

- **Phase 1 (bifrost-extensions)**: 2-3 hours
- **Phase 2 (vibeproxy)**: 1-2 hours
- **Phase 3 (CLIProxyAPI)**: 3-4 hours
- **Phase 4 (smartcp/router)**: 4-5 hours
- **Phase 5 (cleanup & validation)**: 2-3 hours

**Total: 12-17 hours**

---

## Next Steps

1. Review this plan
2. Approve structure
3. Execute Phase 1 (bifrost-extensions)
4. Validate and iterate
5. Continue with remaining phases

