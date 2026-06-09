# OmniRoute Documentation Overhaul Plan

> Goal: Make all docs accessible to non-tech users while preserving technical depth for developers.
> Strategy: Two-tier docs (User Guide + Technical Reference) with cross-links.

---

## Design Principles

1. **User Guide** (new files in `docs/guides/`)
   - Plain language, no jargon
   - "Why → What → How" structure
   - Tables for comparisons
   - Copy-paste examples
   - "What's next?" at the end

2. **Technical Reference** (existing files)
   - Keep as-is (already well-written)
   - Add "For Users" callout at top linking to user guide
   - Add "Prerequisites" section
   - Ensure consistent formatting

3. **Cross-Links**
   - User guides link to technical docs for "learn more"
   - Technical docs link to user guides for "quick start"

---

## Phase 1: User-Facing Quick Start Docs (Highest Impact)

### 1.1 `docs/guides/QUICK-START.md` — NEW
**Replaces**: Condensed version of README.md
**Content**:
- Install (npm, Docker, source)
- Connect a free provider (3 steps)
- Point your IDE to OmniRoute
- Verify it works
- "What's next?" → link to other guides

### 1.2 `docs/guides/AUTO-COMBO-GUIDE.md` — NEW
**Complements**: `docs/routing/AUTO-COMBO.md`
**Content**:
- What auto-combo does (30-second version)
- Which `auto` should I use? (table)
- How it picks providers (simple version)
- Common questions (FAQ)
- "Learn more" → link to technical reference

### 1.3 `docs/guides/PROVIDERS-GUIDE.md` — NEW
**Complements**: `docs/reference/PROVIDER_REFERENCE.md`
**Content**:
- What is a provider? (analogy)
- How to connect a provider (step-by-step)
- Free vs paid providers (table)
- OAuth vs API key (which do I need?)
- Troubleshooting connection issues
- "Learn more" → link to provider reference

### 1.4 `docs/guides/FREE-TIERS-GUIDE.md` — NEW
**Complements**: `docs/reference/FREE_TIERS.md`
**Content**:
- What are free tiers? (analogy)
- Best free providers (table with quotas)
- How to stack free tiers for unlimited usage
- Common questions (FAQ)
- "Learn more" → link to free tiers reference

### 1.5 `docs/guides/TROUBLESHOOTING.md` — REWRITE
**Current**: Technical, code-heavy
**New**: "I see X → Do Y" format
**Content**:
- Problem → Solution table
- Common error messages (with screenshots)
- "Still stuck?" → link to community

---

## Phase 2: Refine Existing User Docs

### 2.1 `docs/guides/USER_GUIDE.md` — UPDATE
**Changes**:
- Add "What you'll learn" section at top
- Remove jargon, explain terms
- Add step-by-step screenshots
- Add "Common mistakes" section

### 2.2 `docs/guides/SETUP_GUIDE.md` — UPDATE
**Changes**:
- Add "Prerequisites" section
- Simplify commands (one-liners)
- Add "Verify it works" step
- Add "Troubleshooting" section

### 2.3 `docs/guides/FEATURES.md` — UPDATE
**Changes**:
- Add "Why this matters" for each feature
- Add use-case examples
- Add "How to enable" for each feature
- Add screenshots

### 2.4 `docs/guides/DOCKER_GUIDE.md` — UPDATE
**Changes**:
- Add "Docker for beginners" section
- Simplify commands
- Add "Common Docker issues" section
- Add "What's next?" section

### 2.5 `docs/guides/ELECTRON_GUIDE.md` — UPDATE
**Changes**:
- Add "What is Electron?" explanation
- Add screenshots
- Add "Common issues" section

### 2.6 `docs/guides/TERMUX_GUIDE.md` — UPDATE
**Changes**:
- Add "What is Termux?" explanation
- Add step-by-step with screenshots
- Add "Common issues" section

### 2.7 `docs/guides/PWA_GUIDE.md` — UPDATE
**Changes**:
- Add "What is a PWA?" explanation
- Add step-by-step with screenshots
- Add "Common issues" section

### 2.8 `docs/guides/I18N.md` — UPDATE
**Changes**:
- Add "How to change language" (user perspective)
- Add "How to contribute translations" (contributor perspective)

### 2.9 `docs/guides/KIRO_SETUP.md` — UPDATE
**Changes**:
- Add "What is Kiro?" explanation
- Add step-by-step with screenshots
- Add "Common issues" section

### 2.10 `docs/guides/UNINSTALL.md` — UPDATE
**Changes**:
- Add "Why uninstall?" section (common reasons)
- Add "Before you uninstall" checklist
- Simplify commands

---

## Phase 3: Technical Docs (Add Cross-Links, Keep As-Is)

### 3.1 `docs/architecture/` (6 files)
**Changes**: Add "For Users" callout at top → link to user guide
- ARCHITECTURE.md
- AUTHZ_GUIDE.md
- CODEBASE_DOCUMENTATION.md
- MONITORING_SECTIONS.md
- REPOSITORY_MAP.md
- RESILIENCE_GUIDE.md

### 3.2 `docs/frameworks/` (16 files)
**Changes**: Add "For Users" callout at top → link to user guide
- A2A-SERVER.md
- AGENT-SKILLS.md
- AGENTBRIDGE.md
- AGENT_PROTOCOLS_GUIDE.md
- CLOUD_AGENT.md
- EMBEDDED-SERVICES.md
- EVALS.md
- GAMIFICATION.md
- MCP-SERVER.md
- MEMORY.md
- OPENCODE.md
- PLAYGROUND_STUDIO.md
- SEARCH_TOOLS_STUDIO.md
- SKILLS.md
- TRAFFIC_INSPECTOR.md
- WEBHOOKS.md

### 3.3 `docs/security/` (9 files)
**Changes**: Add "For Users" callout at top → link to user guide
- CLI_TOKEN.md
- CLI_TOKEN_AUTH.md
- COMPLIANCE.md
- ERROR_SANITIZATION.md
- GUARDRAILS.md
- PUBLIC_CREDS.md
- ROUTE_GUARD_TIERS.md
- SOCKET_DEV_FINDINGS.md
- STEALTH_GUIDE.md

### 3.4 `docs/ops/` (8 files)
**Changes**: Add "For Users" callout at top → link to user guide
- COVERAGE_PLAN.md
- E2E_DASHBOARD_SHAKEDOWN_v3.8.0.md
- FLY_IO_DEPLOYMENT_GUIDE.md
- PROXY_GUIDE.md
- RELEASE_CHECKLIST.md
- SQLITE_RUNTIME.md
- TUNNELS_GUIDE.md
- VM_DEPLOYMENT_GUIDE.md

### 3.5 `docs/compression/` (5 files)
**Changes**: Add "For Users" callout at top → link to user guide
- COMPRESSION_ENGINES.md
- COMPRESSION_GUIDE.md
- COMPRESSION_LANGUAGE_PACKS.md
- COMPRESSION_RULES_FORMAT.md
- RTK_COMPRESSION.md

### 3.6 `docs/routing/` (3 files)
**Changes**: Add "For Users" callout at top → link to user guide
- AUTO-COMBO.md (→ link to AUTO-COMBO-GUIDE.md)
- QUOTA_SHARE.md
- REASONING_REPLAY.md

### 3.7 `docs/reference/` (5 files)
**Changes**: Add "For Users" callout at top → link to user guide
- API_REFERENCE.md
- CLI-TOOLS.md
- ENVIRONMENT.md
- FREE_TIERS.md (→ link to FREE-TIERS-GUIDE.md)
- PROVIDER_REFERENCE.md (→ link to PROVIDERS-GUIDE.md)

### 3.8 Other Docs (keep as-is)
- `docs/comparison/OMNIROUTE_VS_ALTERNATIVES.md` — Already user-friendly
- `docs/marketing/TIERS.md` — Already user-friendly
- `docs/diagrams/README.md` — Keep as-is
- `docs/dev/plugins.md` — Developer-only
- `docs/plugins/PLUGIN_SDK.md` — Developer-only
- `docs/providers/ZED-DOCKER.md` — Provider-specific
- `docs/AGENTROUTER.md` — Provider-specific
- `docs/PROVIDERS.md` — Provider-specific
- `docs/README.md` — Keep as-is
- `docs/SUBMIT_PR.md` — Contributor-only
- `docs/releases/v3.8.0.md` — Release notes
- `docs/research/` — Internal research
- `docs/specs/` — Internal specs
- `docs/openspec/` — Internal specs
- `docs/superpowers/` — Internal plans

---

## Phase 4: Update Main README.md

**Changes**:
- Add "Quick Start" section (3 steps)
- Add "Which `auto` should I use?" table
- Add "Free providers" table
- Add "Common questions" section
- Link to user guides

---

## Execution Order

### Week 1: Phase 1 (User-Facing Quick Start Docs)
1. `docs/guides/QUICK-START.md` — NEW
2. `docs/guides/AUTO-COMBO-GUIDE.md` — NEW
3. `docs/guides/PROVIDERS-GUIDE.md` — NEW
4. `docs/guides/FREE-TIERS-GUIDE.md` — NEW
5. `docs/guides/TROUBLESHOOTING.md` — REWRITE

### Week 2: Phase 2 (Refine Existing User Docs)
1. `docs/guides/USER_GUIDE.md` — UPDATE
2. `docs/guides/SETUP_GUIDE.md` — UPDATE
3. `docs/guides/FEATURES.md` — UPDATE
4. `docs/guides/DOCKER_GUIDE.md` — UPDATE
5. `docs/guides/ELECTRON_GUIDE.md` — UPDATE
6. `docs/guides/TERMUX_GUIDE.md` — UPDATE
7. `docs/guides/PWA_GUIDE.md` — UPDATE
8. `docs/guides/I18N.md` — UPDATE
9. `docs/guides/KIRO_SETUP.md` — UPDATE
10. `docs/guides/UNINSTALL.md` — UPDATE

### Week 3: Phase 3 (Technical Docs Cross-Links)
1. `docs/architecture/` — Add cross-links
2. `docs/frameworks/` — Add cross-links
3. `docs/security/` — Add cross-links
4. `docs/ops/` — Add cross-links
5. `docs/compression/` — Add cross-links
6. `docs/routing/` — Add cross-links
7. `docs/reference/` — Add cross-links

### Week 4: Phase 4 (Update Main README.md)
1. Update README.md with user-friendly sections

---

## Success Metrics

- [ ] User can install OmniRoute in < 5 minutes (QUICK-START.md)
- [ ] User can connect a provider in < 3 minutes (PROVIDERS-GUIDE.md)
- [ ] User can use auto-combo in < 1 minute (AUTO-COMBO-GUIDE.md)
- [ ] User can find free providers in < 2 minutes (FREE-TIERS-GUIDE.md)
- [ ] User can troubleshoot common issues in < 5 minutes (TROUBLESHOOTING.md)
- [ ] All technical docs link to user guides
- [ ] All user guides link to technical docs

---

## File Naming Convention

- User guides: `docs/guides/[FEATURE]-GUIDE.md` (e.g., `AUTO-COMBO-GUIDE.md`)
- Technical docs: Keep existing names (e.g., `docs/routing/AUTO-COMBO.md`)
- Cross-links: "For Users" callout at top of technical docs

---

## Template for User Guides

```markdown
# [Feature Name]: [One-Line Description]

## What It Does
[2-3 sentences explaining what the feature does in plain language]

## Quick Start
[Step-by-step instructions to get started]

## [Main Section]
[Detailed explanation with tables, examples, screenshots]

## Common Questions
[FAQ section with common questions and answers]

## What's Next?
[Links to related guides and technical docs]
```

---

## Template for Technical Doc Cross-Links

```markdown
> **For Users**: Looking for a quick start? See the [User Guide](../guides/[FEATURE]-GUIDE.md).

> **Prerequisites**: [List prerequisites]
```
