# Documentation Consolidation Execution Checklist

## Pre-Execution

- [ ] Review DOCUMENTATION_CONSOLIDATION_PLAN.md
- [ ] Review DOCUMENTATION_IMPLEMENTATION_GUIDE.md
- [ ] Review DOCUMENTATION_FILE_MAPPING.md
- [ ] Review DOCUMENTATION_STRUCTURE_DIAGRAMS.md
- [ ] Understand consolidation strategy
- [ ] Backup current documentation (git commit)
- [ ] Create feature branch: `docs/consolidation`
- [ ] Notify team of upcoming changes

---

## Phase 1: Bifrost-Extensions (27 files)

### Create Directory Structure
- [ ] `mkdir -p bifrost-extensions/docs/{architecture,cli,deployment,evaluation,guides}`
- [ ] `mkdir -p bifrost-extensions/services/promptadapter/docs`

### Move Architecture Files
- [ ] Move ARCHITECTURE_PRINCIPLES.md → docs/architecture/PRINCIPLES.md
- [ ] Move EXTENSION_LAYER_GUIDE.md → docs/architecture/EXTENSION_LAYER.md
- [ ] Move CLEAN_EXTENSION_LAYER.md → docs/architecture/CLEAN_LAYER.md

### Move & Consolidate CLI Files
- [ ] Move CLI_ARCHITECTURE.md → docs/cli/ARCHITECTURE.md
- [ ] Merge CLI_GUIDE.md + CLI_INTEGRATION.md → docs/cli/GUIDE.md
- [ ] Move CLI_QUICK_REFERENCE.md → docs/cli/QUICK_REFERENCE.md
- [ ] Move CLI_SUMMARY.md → docs/cli/SUMMARY.md
- [ ] Rename CLI_INDEX.md → docs/cli/README.md

### Move & Consolidate Deployment Files
- [ ] Move SERVERLESS_DEPLOYMENT.md → docs/deployment/SERVERLESS.md
- [ ] Move DEPLOY_QUICK_START.md → docs/deployment/QUICK_START.md
- [ ] Move DEPLOYMENT_COMPARISON.md → docs/deployment/COMPARISON.md
- [ ] Merge SERVERLESS_INDEX.md + SERVERLESS_SUMMARY.md → docs/deployment/README.md

### Move & Consolidate Evaluation Files
- [ ] Move EVALUATION_SUMMARY.md → docs/evaluation/SUMMARY.md
- [ ] Merge GAPS_AND_MISSING_FEATURES_EVALUATION.md + GAPS_QUICK_REFERENCE.md → docs/evaluation/GAPS.md
- [ ] Move TECHNICAL_GAPS_DETAILED.md → docs/evaluation/TECHNICAL_DETAILS.md
- [ ] Move IMPLEMENTATION_ROADMAP.md → docs/evaluation/ROADMAP.md
- [ ] Move CURRENT_VS_DESIRED_STATE.md → docs/evaluation/CURRENT_VS_DESIRED.md
- [ ] Rename EVALUATION_INDEX.md → docs/evaluation/README.md

### Move Guides
- [ ] Move USAGE_EXAMPLES.md → docs/guides/USAGE_EXAMPLES.md
- [ ] Move ENHANCED_DATASOURCES.md → docs/guides/DATASOURCES.md
- [ ] Move AGENTS.md → docs/guides/AGENTS.md

### Move Services
- [ ] Move services/promptadapter/DATASETS.md → services/promptadapter/docs/DATASETS.md
- [ ] Move docs/AI_ML_ARCHITECTURE.md → services/promptadapter/docs/AI_ML_ARCHITECTURE.md

### Create Index Files
- [ ] Create docs/README.md (index for all docs)
- [ ] Create docs/architecture/README.md (if needed)
- [ ] Create docs/cli/README.md (if needed)
- [ ] Create docs/deployment/README.md (if needed)
- [ ] Create docs/evaluation/README.md (if needed)
- [ ] Create docs/guides/README.md (if needed)

### Update Root README
- [ ] Update bifrost-extensions/README.md to link to docs/

### Delete Old Files
- [ ] Delete COMPLETION_SUMMARY.md
- [ ] Delete CLAUDE.md
- [ ] Delete README_CLI.md
- [ ] Delete WARP.md
- [ ] Delete any other old top-level files

### Update Links
- [ ] Search for links to old CLI_*.md files
- [ ] Update to new docs/cli/ paths
- [ ] Search for links to old DEPLOYMENT_*.md files
- [ ] Update to new docs/deployment/ paths
- [ ] Search for links to old EVALUATION_*.md files
- [ ] Update to new docs/evaluation/ paths
- [ ] Test all links

### Validate Phase 1
- [ ] No files left in root (except README.md)
- [ ] All files in proper directories
- [ ] All links working
- [ ] No broken references
- [ ] Git commit: "docs: consolidate bifrost-extensions"

---

## Phase 2: VibeProxy (16 files)

### Create Directory Structure
- [ ] `mkdir -p vibeproxy/docs/{setup,architecture,guides,reference}`

### Move Setup Files
- [ ] Move INSTALLATION.md → docs/setup/INSTALLATION.md
- [ ] Move DEV_SETUP.md → docs/setup/DEV_SETUP.md
- [ ] Move FACTORY_SETUP.md → docs/setup/FACTORY_SETUP.md
- [ ] Move INJECT_SETUP.md → docs/setup/INJECT_SETUP.md

### Move Architecture Files
- [ ] Move MONOREPO_MIGRATION.md → docs/architecture/MONOREPO_MIGRATION.md
- [ ] Move SERVICES_CONFIG.md → docs/architecture/SERVICES_CONFIG.md
- [ ] Move WINDOWS_UI_COMPLETE.md → docs/architecture/WINDOWS_UI.md

### Move Guides
- [ ] Move DUAL_ROUTER_IMPLEMENTATION_PLAN.md → docs/guides/DUAL_ROUTER.md
- [ ] Move MIGRATION_COMPLETE.md → docs/guides/MIGRATION.md

### Move Reference
- [ ] Move CHANGELOG.md → docs/reference/CHANGELOG.md
- [ ] Move FORK_ATTRIBUTION.md → docs/reference/FORK_ATTRIBUTION.md
- [ ] Move COMPLETION_SUMMARY.md → docs/reference/COMPLETION_SUMMARY.md

### Create Index Files
- [ ] Create docs/README.md
- [ ] Create docs/setup/README.md (if needed)
- [ ] Create docs/architecture/README.md (if needed)
- [ ] Create docs/guides/README.md (if needed)
- [ ] Create docs/reference/README.md (if needed)

### Delete Old Files
- [ ] Delete AGENTS.md
- [ ] Delete CLAUDE.md
- [ ] Delete WARP.md

### Update Links
- [ ] Search for all links to moved files
- [ ] Update to new paths
- [ ] Test all links

### Validate Phase 2
- [ ] No files left in root (except README.md)
- [ ] All files in proper directories
- [ ] All links working
- [ ] Git commit: "docs: consolidate vibeproxy"

---

## Phase 3: CLIProxyAPI (75 files)

### Create Directory Structure
- [ ] `mkdir -p CLIProxyAPI/docs/{getting-started,architecture,implementation,deployment,integration,sdk,reference}`

### Organize Files
- [ ] Move getting-started files to docs/getting-started/
- [ ] Move architecture files to docs/architecture/
- [ ] Move implementation files to docs/implementation/
- [ ] Move deployment files to docs/deployment/
- [ ] Move integration files to docs/integration/
- [ ] Move SDK files to docs/sdk/
- [ ] Move reference files to docs/reference/

### Create Index Files
- [ ] Create docs/README.md
- [ ] Create subdirectory README.md files

### Delete Old Files
- [ ] Delete AGENTS.md
- [ ] Delete CLAUDE.md
- [ ] Delete WARP.md
- [ ] Delete duplicate/old files

### Update Links
- [ ] Search for all links to moved files
- [ ] Update to new paths
- [ ] Test all links

### Validate Phase 3
- [ ] All files organized
- [ ] All links working
- [ ] Git commit: "docs: consolidate CLIProxyAPI"

---

## Phase 4: SmartCP Router (233 files)

### Create Directory Structure
- [ ] `mkdir -p smartcp/router/docs/{architecture,implementation,deployment,migration,testing,sdk,reference}`

### Organize Files
- [ ] Move architecture files to docs/architecture/
- [ ] Move implementation files to docs/implementation/
- [ ] Move deployment files to docs/deployment/
- [ ] Move migration files to docs/migration/
- [ ] Move testing files to docs/testing/
- [ ] Move SDK files to docs/sdk/
- [ ] Move reference files to docs/reference/

### Create Index Files
- [ ] Create docs/README.md
- [ ] Create subdirectory README.md files

### Delete Old Files
- [ ] Delete AGENTS.md
- [ ] Delete CLAUDE.md
- [ ] Delete WARP.md
- [ ] Delete duplicate/old files

### Update Links
- [ ] Search for all links to moved files
- [ ] Update to new paths
- [ ] Test all links

### Validate Phase 4
- [ ] All files organized
- [ ] All links working
- [ ] Git commit: "docs: consolidate smartcp/router"

---

## Phase 5: Root Level Consolidation

### Create Root Structure
- [ ] Create /docs/ directory
- [ ] Create /docs/research/ directory
- [ ] Create /docs/sessions/ directory

### Move Root Files
- [ ] Move GOOSE_*.md files to docs/research/
- [ ] Move research files to docs/research/
- [ ] Move session files to docs/sessions/

### Create Master README
- [ ] Create /README.md (master index)
- [ ] Use DOCUMENTATION_MASTER_README_TEMPLATE.md as template
- [ ] Update with actual project links
- [ ] Add navigation sections
- [ ] Add quick links

### Delete Old Files
- [ ] Delete AGENTS.md
- [ ] Delete CLAUDE.md
- [ ] Delete WARP.md
- [ ] Delete duplicate/old files
- [ ] Keep START_HERE.md (update to point to README.md)

### Update Links
- [ ] Search for all links to moved files
- [ ] Update to new paths
- [ ] Test all links

### Validate Phase 5
- [ ] Master README.md at root
- [ ] All projects have README.md
- [ ] All projects have docs/ directory
- [ ] All links working
- [ ] Git commit: "docs: consolidate root level"

---

## Final Validation

### Link Checking
- [ ] Run link checker on all MDs
- [ ] Fix any broken links
- [ ] Test navigation from root to all projects
- [ ] Test navigation within each project

### Structure Verification
- [ ] Verify no duplicate files
- [ ] Verify <5 files per directory
- [ ] Verify consistent naming
- [ ] Verify all projects have README.md
- [ ] Verify all projects have docs/ directory

### Documentation Quality
- [ ] All index files have proper navigation
- [ ] All index files have "See also" links
- [ ] All merged files have clear sections
- [ ] All merged files have table of contents

### Team Communication
- [ ] Update team on new structure
- [ ] Share master README.md
- [ ] Provide navigation guide
- [ ] Update any CI/CD that references docs

### Final Commit
- [ ] Create final commit: "docs: complete consolidation"
- [ ] Create tag: "docs-v1.0"
- [ ] Push to main branch
- [ ] Announce completion to team

---

## Rollback Procedures

If issues occur at any phase:

### Rollback Phase 1
```bash
git revert <commit-hash>
```

### Rollback Phase 2
```bash
git revert <commit-hash>
```

### Rollback All
```bash
git reset --hard <tag>
```

---

## Success Criteria

- [ ] 1 master README.md at root
- [ ] All projects have README.md
- [ ] All projects have docs/ directory
- [ ] No duplicate files
- [ ] No broken links
- [ ] <5 files per directory
- [ ] Consistent naming conventions
- [ ] Clear navigation hierarchy
- [ ] Team informed of changes
- [ ] All tests passing

---

## Timeline

- **Phase 1**: 2-3 hours
- **Phase 2**: 1-2 hours
- **Phase 3**: 3-4 hours
- **Phase 4**: 4-5 hours
- **Phase 5**: 2-3 hours
- **Validation**: 1-2 hours

**Total**: 13-19 hours

---

## Notes

- Work on feature branch: `docs/consolidation`
- Commit after each phase
- Test links frequently
- Keep old structure in git history
- Can rollback if needed

---

**Status**: Ready for execution
**Next Step**: Start Phase 1

