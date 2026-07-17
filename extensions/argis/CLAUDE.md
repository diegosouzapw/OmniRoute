# Claude AI Agent Guide

This repository is designed to work seamlessly with Claude (and other advanced AI agents) as an autonomous software engineer.

**Authority and Scope**
- This file is the canonical contract for all agent behavior in this repository.
- Act autonomously; only pause when blocked by missing secrets, external access, or truly destructive actions.

---

## Table of Contents

1. [Core Expectations for Agents](#1-core-expectations-for-agents)
2. [Repository Mental Model](#2-repository-mental-model)
3. [File Size & Modularity Mandate](#3-file-size--modularity-mandate)
4. [Standard Operating Loop (SWE Autopilot)](#4-standard-operating-loop-swe-autopilot)
5. [CLI Usage](#5-cli-usage)
6. [Test File Naming & Organization](#6-test-file-naming--organization)
7. [File Naming & Organization](#7-file-naming--organization)
8. [Session Documentation Management](#8-session-documentation-management)
9. [Architecture Mandates](#9-architecture-mandates)
10. [Project-Specific Patterns](#10-project-specific-patterns)
11. [Security & Secrets](#11-security--secrets)
12. [Common Workflows](#12-common-workflows)
13. [Troubleshooting](#13-troubleshooting)
14. [Performance Metrics](#14-performance-metrics)
15. [MCP Integration Patterns](#15-mcp-integration-patterns)
16. [Multi-Model Orchestration](#16-multi-model-orchestration)

---

## 1. Core Expectations for Agents

### Autonomous Operation (Critical - Minimal Human Intervention)

Agents MUST operate with **maximum autonomy**:

**When to proceed without asking:**
- Implementation details and technical approach decisions
- Library/framework choices aligned with existing patterns
- Code structure and organization
- Test strategies and coverage approaches
- Refactoring and optimization decisions
- Bug fixes and performance improvements
- Documentation updates
- Decomposition of large files
- Consolidation of duplicate code
- Removing dead code and legacy patterns

**Only ask when truly blocked by:**
- Missing credentials/secrets (cannot be inferred from environment)
- External service access permissions
- Genuine product ambiguity (behavior not determinable from specs/code/tests)
- Destructive operations (production data deletion, forced pushes)

**Default behavior: Research → Decide → Implement → Validate → Continue**

### Research-First Development (CRITICAL)

Before implementing ANY feature or fix, agents MUST conduct comprehensive research:

**1. Codebase Research (Always Required):**
```bash
# Find similar implementations
rg "pattern_name" --type py -A 5 -B 5

# Trace call chains
rg "function_name\(" --type py

# Find test patterns
rg "def test_.*pattern" tests/ -A 10

# Check architecture patterns
rg "class.*Adapter\|class.*Factory\|class.*Service" --type py

# Find all usages of a module
rg "from.*module_name import" --type py

# Check for existing abstractions
rg "class.*Base\|class.*Abstract\|class.*Interface" --type py

# Find configuration patterns
rg "Settings\|Config\|Environment" --type py -A 3

# Locate error handling patterns
rg "raise.*Error\|except.*:" --type py -A 2
```

**2. Web Research (When Needed):**
- External API documentation
- Library usage patterns (when introducing new dependencies)
- Best practices for performance/security patterns
- Debugging rare errors or edge cases
- Framework-specific patterns (FastAPI, FastMCP, Pydantic)
- Cloud service integration patterns (Supabase, Vercel, etc.)

**3. Research Documentation:**
- Document findings in `docs/sessions/<session-id>/01_RESEARCH.md`
- Include URLs, code examples, and decision rationale
- Update continuously as new information discovered
- Reference findings in implementation decisions

### Autonomous SWE Loop

Follow continuous loop: **research → plan → execute → validate → polish → repeat**

- Do not ask for step-by-step guidance unless blocked
- Make decisions based on:
  - Existing codebase patterns
  - This contract file
  - Research findings
  - Test results and validation

### Environment & Tooling

```bash
# Always activate project environment first
source .venv/bin/activate

# Prefer uv for Python execution
uv run <command>
uv pip install <package>

# Use project CLI when available (CRITICAL)
# See CLI Reference section below
```

### Aggressive Change Policy (CRITICAL)

**NO backwards compatibility. NO gentle migrations. NO MVP-grade implementations.**

- **Avoid ANY backwards compatibility shims or legacy fallbacks**
- **Always perform FULL, COMPLETE changes** when refactoring
- **Do NOT preserve deprecated patterns** for transition periods
- **Remove old code paths entirely** when replacing them
- **Update ALL callers simultaneously** when changing signatures

**Forward-Only Progression:**
- NO `git revert` or `git reset` (fix forward instead)
- NO haphazard delete-and-rewrite cycles
- Push forward to clean, working states via incremental fixes
- Document issues in `05_KNOWN_ISSUES.md`, resolve systematically

**Full Production-Grade Implementation:**
- NO minimal implementations or MVPs
- NO "we'll add this later" placeholder code
- Every feature: production-ready, fully tested, documented
- Complete error handling, edge cases, logging
- Full test coverage (unit + integration where applicable)

---

## 2. Repository Mental Model

Understand these as first-class constraints before editing:

### Runtime & Framework
- **Python**: 3.10+ (async-first)
- **Framework**: FastAPI/FastMCP
- **Package Manager**: uv preferred
- **Type System**: Pydantic models, strict typing

### Key Modules
```
src/<package>/
  main.py              # Application entrypoint
  app.py               # ASGI entrypoint for Vercel/stateless HTTP
  server.py            # Core MCP server wiring, auth, rate limiting
  api/                 # API routes/endpoints
    routes/            # Route handlers by domain
  services/            # Business logic layer
    embedding/         # Embedding factory and services
    auth/              # Authentication helpers
  infrastructure/      # External adapters (DB, auth, storage)
    supabase_adapter.py    # Database operations
    auth_adapter.py        # Auth integration
    storage_adapter.py     # File storage
    rate_limiter.py        # Rate limiting
  models/              # Data models (Pydantic, ORM)
  tools/               # MCP tools (workspace, entity, relationship, workflow, query)
  auth/                # Session, middleware, hybrid auth provider
  utils/               # Shared utilities
  cli/                 # CLI commands (Typer)
tests/
  unit/                # Unit tests
  integration/         # Integration tests
  e2e/                 # End-to-end tests
  performance/         # Performance tests
  conftest.py          # Shared fixtures
config/                # Configuration files
  settings.yml         # Application settings
  secrets.yml          # Secrets (gitignored)
docs/
  sessions/            # Session-based work docs
  architecture/        # Architecture documentation
```

### Style Constraints
- **Line length**: 100 characters
- **Formatter**: Ruff/Black
- **Type checker**: mypy/pyright
- **Linter**: Ruff
- **File size**: ≤500 lines hard limit, ≤350 target
- **Typing**: typed where practical, explicit error handling
- **Logging**: clear, structured logging

### Agent Must:
- Reuse existing layers instead of bypassing them
- Keep changes minimal, composable, and driven by tests
- Proactively decompose files approaching 350 lines
- Never introduce real secrets; use env vars and placeholders
- Prefer consolidated tools over direct DB/HTTP where adapters exist
- Match existing coding style, respect typing and logging conventions

---

## 3. File Size & Modularity Mandate

**Hard constraint: All modules ≤500 lines (target ≤350)**

### Before Adding Features

```bash
# Check line count
wc -l src/<package>/services/<file>.py

# If approaching 350+ lines, decompose immediately

# Find all files exceeding limit
find src/ -name "*.py" -exec wc -l {} + | awk '$1 > 350'
```

### Decomposition Decision Process

Before adding features to any file, check its current line count. If it approaches 350+ lines:

1. **Identify cohesive responsibilities** (caching, validation, adapters, domain logic)
2. **Extract into separate modules** following the hierarchy below
3. **Update imports** in all callers; test each change
4. **Keep interfaces narrow**: expose only what's needed; hide internals

### Decomposition Patterns

**Pattern 1: Service Submodule**
```
# Before: services/embedding_factory.py (400+ lines)
# After:
services/embedding/
  __init__.py        (exports public API)
  factory.py         (core creation logic)
  cache.py           (caching layer)
  validators.py      (input validation)
  types.py           (shared types)
```

**Pattern 2: Adapter Extraction**
```
# Before: infrastructure/adapters.py (500+ lines)
# After:
infrastructure/
  supabase_adapter.py      (DB operations)
  auth_adapter.py          (auth integration)
  rate_limiter_adapter.py  (rate limiting)
  storage_adapter.py       (file storage)
```

**Pattern 3: Tool Decomposition**
```
# Before: tools/entity.py (400+ lines)
# After:
tools/entity/
  __init__.py        (exports tool)
  handler.py         (main tool logic)
  validators.py      (entity validation)
  queries.py         (DB query helpers)
```

**Pattern 4: API Route Splitting**
```
# Before: api/routes/users.py (500+ lines)
# After:
api/routes/users/
  __init__.py        (router registration)
  crud.py            (CRUD operations)
  auth.py            (auth-related endpoints)
  admin.py           (admin endpoints)
```

**Pattern 5: Test Consolidation**
```
# Before: Multiple test files for same concern
# After: Single file with fixtures/markers
tests/unit/services/
  test_user.py       (all user service tests)
  conftest.py        (shared fixtures)
```

**Pattern 6: Database Models**
```
# Before: db/models.py (600+ lines)
# After:
db/models/
  __init__.py      (exports all models)
  chat.py          (chat-related models)
  mcp.py           (MCP-related models)
  auth.py          (auth-related models)
```

### Aggressive Change Policy for Decomposition

- **When refactoring, update ALL callers and code paths simultaneously.** No partial migrations.
- **Remove old implementations entirely.** Don't leave deprecated code behind with conditional logic.
- **No feature flags, shims, or backwards compatibility layers.** Clean breaks enable clarity and performance.
- **All tests must pass after refactoring.** No "this part is still migrating."

---

## 4. Standard Operating Loop (SWE Autopilot)

For every task (bug, feature, infra, test):

### 1. Review
- Read the issue/error, relevant code, and existing tests
- Use search (`rg`, Glob/Read tools) to map usages before editing
- Check line counts on affected files; note decomposition needs
- Identify all callers and dependencies

### 2. Research
- Check related modules and patterns in-repo
- When external APIs/libraries are involved, consult their official docs via web search
- Reference this contract for architectural constraints
- Document findings in session folder

### 3. Plan
- Formulate a short, concrete plan (in your reasoning, keep user-facing text concise)
- Ensure the plan aligns with existing abstractions and auth/infra patterns
- If any file will exceed 350 lines, include decomposition in the plan
- Identify test coverage requirements

### 4. Execute
- Implement in small, verifiable increments
- Match coding style, respect typing and logging conventions
- Decompose proactively; don't wait until a file hits 500 lines
- Update all callers simultaneously

### 5. Size-Check
- If any edited file nears 350 lines, plan decomposition
- Identify ALL callers/dependencies before changes—no partial updates
- Verify interfaces remain narrow and clear

### 6. Test
- Run targeted tests via CLI or `uv run pytest …` relevant to the change
- Start with focused suites; only widen scope if risk is broader
- Verify decomposed modules have equivalent test coverage
- For new test files: follow canonical naming (see Test File Naming section)

### 7. Review & Polish
- Re-read diffs mentally; simplify, remove dead code, align naming with repo norms
- Verify all files stay ≤500 lines (ideally ≤350)
- Ensure no backwards compatibility shims remain

### 8. Repeat
- If tests or behavior fail, loop without waiting for user direction
- Continue until clean; pause only when blocked

---

## 5. CLI Usage

### CLI is REQUIRED - Primary Interface

**CRITICAL:** Always use the project CLI for operations instead of direct tool invocation.

```bash
# Environment setup (always first)
source .venv/bin/activate

# ✅ REQUIRED: Use project CLI for all operations
python cli.py test run --scope unit              # Run unit tests
python cli.py test run --scope integration       # Run integration tests
python cli.py test run --coverage                # Run with coverage
python cli.py lint check                         # Check code quality
python cli.py lint fix                           # Auto-fix linting issues
python cli.py format                             # Format code (black + ruff)
python cli.py db migrate                         # Run database migrations
python cli.py server start                       # Start MCP server
python cli.py tools list                         # List available MCP tools

# ❌ AVOID: Direct tool invocation (only for debugging CLI itself)
uv run pytest -q                                 # Don't use directly
uv run ruff check                                # Don't use directly
uv run black .                                   # Don't use directly
```

### Why CLI is Required

- ✅ **Consistent interface** across all operations
- ✅ **Hook integration** (Factory hooks run automatically when enabled)
- ✅ **Better error messages** and recovery
- ✅ **Type-safe** argument validation via Typer
- ✅ **Self-documenting** via `--help` flags
- ✅ **Standardized** across team and CI/CD
- ✅ **Future-proof** (CLI evolves without changing workflow)

### CLI Discovery

```bash
# Explore available commands
python cli.py --help

# Get command-specific help
python cli.py test --help
python cli.py lint --help
python cli.py db --help
python cli.py server --help
python cli.py tools --help
```

### CLI Command Reference

| Operation | CLI Command | Direct Command (avoid) |
|-----------|-------------|------------------------|
| **Testing** | `python cli.py test run` | `uv run pytest` |
| **Unit Tests** | `python cli.py test run --scope unit` | `uv run pytest tests/unit` |
| **Integration** | `python cli.py test run --scope integration` | `uv run pytest tests/integration` |
| **Coverage** | `python cli.py test run --coverage` | `uv run pytest --cov` |
| **Linting** | `python cli.py lint check` | `uv run ruff check` |
| **Lint Fix** | `python cli.py lint fix` | `uv run ruff check --fix` |
| **Formatting** | `python cli.py format` | `uv run ruff format` |
| **Type Check** | `python cli.py types check` | `uv run mypy` |
| **Server** | `python cli.py server start` | `uvicorn app:app` |
| **DB Migrate** | `python cli.py db migrate` | Manual SQL |

### Fallback Commands (Only When CLI Unavailable)

**Only use these when CLI doesn't support the operation yet:**

```bash
# Environment
source .venv/bin/activate

# Core checks (fallback only)
uv run pytest -q                                 # Quick validation
uv run pytest tests/unit                         # Unit-only
uv run pytest tests/integration                  # Integration
uv run pytest tests/e2e                          # E2E tests

# Quality gates (fallback only)
uv run ruff check                                # Linting check
uv run ruff check --fix                          # Auto-fix
uv run ruff format src/                          # Format
uv run mypy src/                                 # Type checking

# Line count verification
wc -l <file>                                     # Show total lines
find src/ -name "*.py" -exec wc -l {} +          # All Python files

# Server / runtime (fallback only)
uv run python app.py                             # ASGI / Vercel entry
uv run python server.py                          # Direct server start
uvicorn <package>.main:app --reload --port 8000  # Development server
```

### Agent Behavior for CLI

1. **Always try CLI first** - Check `python cli.py --help`
2. **Use fallback only if necessary** - CLI doesn't support operation yet
3. **Suggest CLI enhancements** - If you find gaps, note for future improvement
4. **Document usage** - Include CLI commands in commit messages and documentation

---

## 6. Test File Naming & Organization

### Critical Principle

**Test files must use canonical naming that reflects their content's concern, not speed, variant, or development phase.**

The name of a test file should answer: **"What component/concern does this test?"** not **"How fast is it?" or "What variant is it?"**

### Naming Rules with Detailed Rationale

✅ **Good (canonical - concern-based):**
- `test_entity.py` – tests the entity tool; any implementation detail for entity operations belongs here
- `test_entity_crud.py` – tests CREATE/READ/UPDATE/DELETE operations; separated by operation domain
- `test_entity_validation.py` – tests entity validation logic; separated by technical concern (validation)
- `test_auth_supabase.py` – tests Supabase-specific auth; separated by provider (integration point)
- `test_auth_authkit.py` – tests AuthKit integration; different provider, different concern
- `test_auth_jwt.py` – tests JWT auth (different mechanism)
- `test_relationship_member.py` – tests member relationship type; separated by relationship domain
- `test_relationship_assignment.py` – tests assignment relationship type; separate domain, can be merged if overlap grows
- `test_database_adapter.py` – all database adapter tests; adapter is the concern
- `test_embedding_factory.py` – all embedding factory tests; factory is the component

**Why each is canonical:**
- Each name describes *what's being tested* (the component, tool, domain, or integration point)
- Two files with same test names would indicate duplication → consolidate
- File name and implementation are tightly coupled; changing implementation invites consolidation review

❌ **Bad (not canonical - metadata-based):**
- `test_entity_fast.py` – ❌ "fast" describes *speed*, not *content*. Use `@pytest.mark.performance` or `@pytest.mark.smoke` instead
- `test_entity_slow.py` – ❌ "slow" describes *duration*, not *concern*. Use markers in the same file
- `test_entity_unit.py` – ❌ "unit" describes *execution scope*, not *what's tested*. Use conftest fixtures (`mcp_client_inmemory`)
- `test_entity_integration.py` – ❌ "integration" describes *client type*, not *component*. Use fixture parametrization
- `test_entity_e2e.py` – ❌ "e2e" describes *test stage*, not *concern*. Use fixtures and markers instead
- `test_auth_final.py` – ❌ "final" is vague and temporal; adds no semantic information. Remove or name by concern
- `test_auth_v2.py` – ❌ Versioning belongs in git history (branch/tag), not file names. If truly different code, name by concern
- `test_entity_old.py`, `test_entity_new.py` – ❌ Temporal metadata. Refactor, merge, or delete instead
- `test_api_integration.py` – ❌ "integration" is redundant; file is in `tests/`. Name by *which API* is integrated
- `test_api_complete.py` – ❌ "complete" is vague; what's incomplete?
- `test_api_2.py` – ❌ Arbitrary numbering; merge or name by concern

**How to recognize bad naming:**
- Does the suffix describe *how* to run the test? → Bad (use markers/fixtures)
- Does the suffix describe *when* it was written? → Bad (belongs in commit message)
- Does the suffix describe *temporal state*? (old/new/final/draft) → Bad (refactor instead)
- Does the suffix describe *test execution speed*? → Bad (use markers)
- Could two files have the same test name if they tested slightly different concerns? → They should consolidate

### Why Canonical Naming Matters

1. **Prevents accidental duplication**: When two test files have *nearly canonical* names, it signals they should be merged.
   - Example: `test_entity_unit.py` + `test_entity_integration.py` both test entity → merge, parametrize with fixtures
   - Non-canonical names hide duplication: `test_entity_fast.py` + `test_entity_comprehensive.py` might test the same thing but you won't notice

2. **Aids discovery**: File name immediately tells what's being tested without opening the file.
   - Maintainer looking at `test_auth_supabase.py` knows: "ah, this is Supabase auth integration"
   - Maintainer looking at `test_auth_v2.py` knows: ???

3. **Supports consolidation**: When refactoring, canonical names make it obvious which files should merge.
   - Same component? → Same concern → Same file. If `test_entity.py` and `test_entity_crud.py` both exist, merge.
   - Different components? → Different concerns → Different files. `test_auth_supabase.py` and `test_auth_authkit.py` have different integration points, keep separate (unless they converge later)

4. **Reduces clutter**: No `_old`, `_new`, `_backup`, `_temp`, `_draft` suffixes cluttering the tree.
   - Canonical names → code review → merge or delete. Not: save old versions as separate files
   - One source of truth per concern

5. **Enables automation**: Tools and scripts can scan test/ directory and understand structure.
   - CI/CD can identify which tests to run based on changed component (if naming is consistent)
   - Agents (like Claude) can suggest consolidation automatically (if naming is canonical)

### Variant Testing (Unit/Integration/E2E)

**Core principle**: Use **fixtures and markers**, NOT separate files, to handle test variants.

**Why?**
- One file = one concern = one source of truth
- Fixtures parametrize execution without duplication
- Markers categorize tests for selective runs
- Reduces code duplication dramatically

#### Pattern 1: Fixture Parametrization (Recommended)

```python
# ✅ GOOD: One file, fixture parametrization determines variant
# tests/unit/tools/test_entity.py

@pytest.fixture(params=["unit", "integration", "e2e"])
def mcp_client(request):
    """Parametrized client fixture.

    Provides different clients based on test location:
    - tests/unit/ → unit (in-memory client)
    - tests/integration/ → integration (HTTP client)
    - tests/e2e/ → e2e (full deployment client)

    All tests in this file run 3 times, once per variant.
    """
    if request.param == "unit":
        return InMemoryMcpClient()  # Fast, deterministic
    elif request.param == "integration":
        return HttpMcpClient(...)   # Live database
    elif request.param == "e2e":
        return DeploymentMcpClient(...)  # Production setup

    return get_client(request.param)

async def test_entity_creation(mcp_client):
    """Test entity creation across all variants.

    This test runs 3 times:
    1. With in-memory client (unit)
    2. With HTTP client (integration)
    3. With deployment client (e2e)
    """
    result = await mcp_client.call_tool("entity_tool", {...})
    assert result.success
```

**Benefits:**
- Single file, not three
- Same test logic runs across variants automatically
- Adding new variant only requires updating fixture
- Test collection finds all variants at once

#### Pattern 2: Markers (For Test Categorization)

```python
# ✅ GOOD: Markers for categorizing tests within one file

@pytest.mark.asyncio
@pytest.mark.performance
async def test_entity_creation_performance(mcp_client):
    """Performance test: measure entity creation speed.

    Run with: pytest -m performance
    Skip with: pytest -m "not performance"
    """
    ...

@pytest.mark.asyncio
@pytest.mark.smoke
async def test_entity_basic_creation(mcp_client):
    """Smoke test: quick sanity check.

    Run with: pytest -m smoke  # <1 second
    """
    ...

@pytest.mark.asyncio
@pytest.mark.integration
async def test_entity_with_real_database(mcp_client):
    """Integration test: requires real database.

    Run with: pytest -m integration
    Skip in CI with: pytest -m "not integration"
    """
    ...

@pytest.mark.asyncio
@pytest.mark.slow
async def test_entity_large_dataset(mcp_client):
    """Slow test: processes large dataset.

    Run with: pytest -m slow
    Skip for quick runs: pytest -m "not slow"
    """
    ...
```

**CI/CD Usage:**
```bash
# Quick smoke tests only
pytest -m smoke  # 5 seconds

# All unit + smoke tests
pytest tests/unit -m "not integration and not performance"  # 30 seconds

# Full suite including integration + performance
pytest tests/ -m ""  # 5 minutes

# Only performance tests
pytest -m performance  # 2 minutes (run separately)

# Skip slow tests
pytest -m "not slow"  # Fast feedback
```

#### ❌ BAD Pattern: Separate Files for Variants

```python
# ❌ BAD: Three files with redundant test code
# tests/unit/tools/test_entity.py
async def test_entity_creation(mcp_client_inmemory):
    ...

# tests/integration/tools/test_entity.py
async def test_entity_creation(mcp_client_http):  # Same test name!
    ...

# tests/e2e/tools/test_entity.py
async def test_entity_creation(mcp_client_e2e):  # Same test name again!
    ...
```

**Problems:**
- Code duplication (test logic repeated 3 times)
- Maintenance burden (change test → update in 3 places)
- Confusing directory structure
- Easy to miss a variant when adding tests
- Larger code footprint = harder to maintain

### Consolidation Checklist

When multiple test files cover overlapping concerns, use this decision tree:

**Question 1: Do they test the same component/tool?**
- **Yes** → They should be one file
- **No** → Proceed to Q2

**Question 2: Do they use different clients?**
- **Yes** → Use fixture parametrization (see Pattern 1 above), same file
- **No** → Proceed to Q3

**Question 3: Are they fundamentally different test types?**
- **Yes** (e.g., slow perf tests vs quick unit tests) → Use markers (see Pattern 2), same file
- **No** → Proceed to Q4

**Question 4: Do they test genuinely different subsystems?**
- **Yes** → Split by subsystem concern, keep separate
- **No** → Merge them; they have duplicate concerns

**Action Items:**
| Scenario | Decision | Implementation |
|----------|----------|-----------------|
| Same tool, different clients | Merge | Use `@pytest.fixture(params=[...])` |
| Same tool, different speeds | Merge | Use `@pytest.mark.performance`, `@pytest.mark.smoke` |
| Same tool, same everything | Definitely merge | Delete duplicate, consolidate |
| Different tools, same concern | Merge by concern | Rename file canonically by concern |
| Different tools, different concerns | Keep separate | Ensure each file has canonical name |

### Test File Organization

**Organize test files by:** what's being tested (module/component concern)

**Do NOT organize test files by:** speed, variant, version, or other metadata

```
tests/
  unit/
    tools/
      test_entity.py                    # All entity tool tests (canonical)
      test_query.py                     # All query tool tests
      test_relationship.py              # All relationship tool tests
      test_workspace.py                 # All workspace tool tests
      test_workflow.py                  # All workflow tool tests
    infrastructure/
      test_auth_adapter.py              # All auth adapter tests
      test_database_adapter.py          # All database adapter tests
      test_storage_adapter.py           # All storage adapter tests
      test_rate_limiter.py              # All rate limiter tests
    services/
      test_embedding_factory.py         # All embedding factory tests
      test_auth_service.py              # All auth service tests
    api/
      test_routes_openai.py             # OpenAI-compatible API tests
      test_routes_mcp.py                # MCP API tests
      test_routes_health.py             # Health check tests
  integration/
    test_supabase.py                    # Supabase integration
    test_auth_flow.py                   # Auth flow integration
  e2e/
    test_full_workflow.py               # Full workflow tests
  conftest.py                           # Shared fixtures
```

**Markers and fixtures** handle variants within files; file names describe content only.

### Real-World Example: How We Fixed test_relationship.py

| Aspect | Before | After | Action |
|--------|--------|-------|--------|
| **Lines** | 3,245 | 228 | Removed 3-variant duplication |
| **Test Classes** | 14 | 8 | Consolidated redundant classes |
| **Variants** | 3 (unit/integration/e2e) | 1 (unit via fixtures) | Removed file duplication, used fixtures |
| **Errors** | "too many open files" | None | Smaller file, no resource exhaustion |
| **Readability** | Complex | Clear | Focused on core functionality |

**Key insight**: The original file had the *same test logic* repeated across 3 variants. By using fixtures instead of separate files, we eliminated duplication while maintaining variant coverage.

---

## 7. File Naming & Organization

### Canonical Naming Rules

- **NO prefixes/suffixes that don't describe decomposition**
- **ONE file per concern**; merge when two files address same concern
- **Descriptive names** indicating single responsibility
- **Test files mirror production structure** with `test_` prefix only

### Goal: NO duplicate concerns, NO meaningless prefixes/suffixes

1. **ONE file per concern** - If two files address the same concern, merge them
2. **Descriptive names only** - Name must clearly indicate single responsibility
3. **NO generic suffixes** - No `_fast`, `_slow`, `_v2`, `_new`, `_old`, `_complete`, `_final`
4. **Test files mirror structure** - `tests/test_<module>.py` or `tests/<module>/test_<aspect>.py`

### Valid vs Invalid Patterns

**✅ GOOD - Clear decomposition:**
```
services/auth/password.py          # Password operations
services/auth/session.py           # Session management
services/auth/jwt.py               # JWT handling
tests/auth/test_password.py        # Password tests
tests/auth/test_session.py         # Session tests
tests/auth/test_jwt.py             # JWT tests

# Clear decomposition by different concerns
services/claude/client.py          # Core client logic
services/claude/streaming.py       # SSE streaming
services/claude/tools.py           # Tool execution

# Test scenarios describing different behaviors
tests/auth/test_password_valid.py      # Valid password tests
tests/auth/test_password_invalid.py    # Invalid password tests
tests/auth/test_session_expired.py     # Expired session tests

# Different implementations of same interface
storage/local.py                   # Local file storage
storage/s3.py                      # S3 storage
```

**❌ BAD - Meaningless suffixes (MERGE IMMEDIATELY):**
```
services/auth_fast.py              # Merge into auth.py
services/auth_v2.py                # Use git history
services/auth_helper.py            # Merge into auth.py
tests/test_auth_complete.py        # What's incomplete?
tests/test_auth_2.py               # Arbitrary numbering
tests/test_auth_final.py           # What makes it "final"?

# DON'T: Arbitrary suffixes
api/routes/user.py
api/routes/user_endpoints.py       # Merge into user.py

# DON'T: Version numbers
services/claude_client.py
services/claude_client_v2.py        # Delete old, keep new

# DON'T: Generic quality markers
tests/test_api.py
tests/test_api_complete.py          # What's incomplete?
tests/test_api_2.py                 # Arbitrary numbering

# DON'T: Helper/utils without clear purpose
db/models.py
db/models_helper.py                 # Merge into models.py

# DON'T: Redundant naming
mcp/mcp_server.py                   # Just mcp/server.py
api/api_routes.py                   # Just api/routes.py
```

### Before Creating ANY File

Ask these questions:
1. ✅ **Does this concern already have a file?** → Add to existing
2. ✅ **Can I name it with ONE clear noun/verb?** → If no, rethink
3. ✅ **Does the name describe a decomposition?** → If no, probably wrong
4. ✅ **Is existing file <350 lines?** → Add there instead of new file
5. ✅ **Will this split be obvious in 6 months?** → If no, don't split

### Consolidation Process

When you find overlapping files:

```bash
# 1. Search for similar files
rg -l "claude" --glob "*.py" src/

# 2. Check line counts
wc -l src/<package>/services/claude*.py

# 3. Identify true concerns
# - Are they different aspects? Keep both
# - Same concern? Merge immediately

# 4. Merge files
cat services/claude_helper.py >> services/claude.py
rm services/claude_helper.py

# 5. Update ALL imports
rg "from.*claude_helper" -l | xargs sed -i '' 's/claude_helper/claude/g'

# 6. Test everything
uv run pytest tests/
```

### Naming Patterns Reference

| Type | Pattern | Good Example | Bad Example |
|------|---------|--------------|-------------|
| Module | `<noun>.py` | `auth.py` | `auth_module.py` |
| Submodule | `<feature>/<aspect>.py` | `auth/password.py` | `auth/password_utils.py` |
| Test | `test_<module>.py` | `test_auth.py` | `test_auth_suite.py` |
| Test variant | `test_<module>_<scenario>.py` | `test_auth_expired.py` | `test_auth_2.py` |
| Implementation | `<interface>_<impl>.py` | `storage_s3.py` | `storage_s3_final.py` |

### Real-World Examples

**Scenario 1: Found duplicate files**
```bash
# BEFORE
src/<package>/services/chat.py              # 200 lines
src/<package>/services/chat_handler.py      # 150 lines

# ACTION: Merge (same concern)
cat chat_handler.py >> chat.py
rm chat_handler.py
# Update imports everywhere

# AFTER
src/<package>/services/chat.py              # 350 lines
```

**Scenario 2: Need to split large file**
```bash
# BEFORE
src/<package>/services/claude_client.py     # 600 lines

# ACTION: Split by clear concerns
mkdir -p src/<package>/services/claude/
# Move streaming logic → claude/streaming.py
# Move tool execution → claude/tools.py
# Keep core client → claude/client.py
# Create __init__.py with exports

# AFTER
src/<package>/services/claude/
  __init__.py           # 20 lines (exports)
  client.py             # 250 lines
  streaming.py          # 180 lines
  tools.py              # 170 lines
```

**Scenario 3: Multiple test files for same thing**
```bash
# BEFORE
tests/test_auth.py                 # Basic tests
tests/test_auth_complete.py        # More tests
tests/auth_test.py                 # Even more tests

# ACTION: Consolidate by aspect
mkdir -p tests/auth/
# Group by what they test
tests/auth/test_password.py       # Password tests
tests/auth/test_session.py        # Session tests
tests/auth/test_token.py          # Token tests

# AFTER
tests/auth/
  test_password.py
  test_session.py
  test_token.py
```

---

## 8. Session Documentation Management

### Problem

Agent-generated docs accumulate rapidly, creating noise and obscuring current information. Files like `SUMMARY.md`, `STATUS.md`, `COMPLETE.md`, `GUIDE.md` proliferate in repo roots and subdirectories.

### Solution

Strict session-based documentation with aggressive consolidation.

### Session Documentation Structure

All agent work artifacts MUST go in:

```
docs/sessions/<YYYYMMDD-descriptive-name>/
```

**Required session documents (living docs, continuously updated):**

1. **`00_SESSION_OVERVIEW.md`**
   - Session goals and success criteria
   - Key decisions with rationale
   - Links to PRs, issues, discussions

2. **`01_RESEARCH.md`**
   - External API/documentation research
   - Precedents from codebase
   - Third-party library patterns discovered
   - URLs and references

3. **`02_SPECIFICATIONS.md`**
   - Full feature specifications
   - Acceptance criteria
   - **ARUs (Assumptions, Risks, Uncertainties)** with mitigation plans
   - API contracts and data models

4. **`03_DAG_WBS.md`**
   - Dependency graph (DAG) showing task dependencies
   - Work breakdown structure (WBS) with estimates
   - Critical path analysis
   - Blockers and their resolutions

5. **`04_IMPLEMENTATION_STRATEGY.md`**
   - Technical approach and design patterns
   - Architecture decisions and alternatives considered
   - Code organization rationale
   - Performance and security considerations

6. **`05_KNOWN_ISSUES.md`**
   - Current bugs and their severity/impact
   - Workarounds applied
   - Technical debt introduced
   - Future work recommendations

7. **`06_TESTING_STRATEGY.md`**
   - Test plan and coverage goals
   - Testing approach (unit/integration/e2e)
   - Test data strategies
   - Acceptance test scenarios

### Documentation Update Protocol

**When to update (prefer updating over creating new files):**
- Discovery → update `01_RESEARCH.md`
- Requirements change → update `02_SPECIFICATIONS.md` + `03_DAG_WBS.md`
- Implementation pivot → update `04_IMPLEMENTATION_STRATEGY.md`
- Bug found/fixed → update `05_KNOWN_ISSUES.md`
- Test added/changed → update `06_TESTING_STRATEGY.md`

**Frequency:**
- After significant discoveries
- Before context switches
- When blocked by uncertainty (document in ARUs)

**Never create:** Files with `FINAL`, `COMPLETE`, `V2`, `_NEW`, `_OLD`, `_DRAFT` suffixes.

### Documentation Consolidation Policy (Aggressive)

**When encountering doc proliferation (anywhere in repo):**

1. **Detect orphaned docs**
   ```bash
   find . -name "*.md" -type f | grep -E "(SUMMARY|STATUS|REPORT|COMPLETE|FINAL|CHECKLIST|V[0-9]|_OLD|_NEW|_DRAFT)"
   ```

2. **Apply decision tree**
   ```
   Is doc still relevant?
   ├─ NO  → Delete immediately (after reviewing for unique info)
   └─ YES → Is it session-specific?
          ├─ YES → Move to docs/sessions/<session-id>/
          └─ NO  → Is it canonical repo doc?
                 ├─ YES → Keep in docs/ (README, ARCHITECTURE, etc.)
                 └─ NO  → Merge into canonical doc or delete
   ```

3. **Consolidation actions**
   - Extract unique information from temporal docs
   - Merge into appropriate session document
   - Delete redundant files without hesitation
   - Update session folder structure if needed

**Examples:**
```bash
# Session-specific, still relevant → move to session
mv OAUTH_COMPLETION_SUMMARY.md docs/sessions/20251110-oauth-impl/06_COMPLETION.md

# Temporal doc, info now in 05_KNOWN_ISSUES.md → delete
rm TEST_STATUS_FINAL.md

# Three overlapping guides → consolidate
cat GUIDE_V1.md GUIDE_V2.md GUIDE_FINAL.md > docs/GUIDE.md
rm GUIDE_V1.md GUIDE_V2.md GUIDE_FINAL.md
```

### Canonical Repository Documentation (Exceptions)

These live in `docs/` root and persist across sessions:
- `docs/README.md` - Project overview, getting started
- `docs/ARCHITECTURE.md` - System architecture, design patterns
- `docs/API_REFERENCE.md` - Tool/API documentation
- `docs/DEPLOYMENT.md` - Deployment guides, infrastructure
- `docs/TESTING.md` - Testing philosophy, frameworks
- `docs/TROUBLESHOOTING.md` - Common issues, debugging

**Update protocol:**
- Session details → session folder
- Permanent architectural changes → canonical docs
- Uncertain → start in session folder, promote if universally relevant

### Agent Behavioral Rules for Documentation

**Session start:**
1. Create `docs/sessions/<session-id>/` directory
2. Initialize `00_SESSION_OVERVIEW.md` with goals
3. Reference (don't duplicate) canonical docs

**During session:**
1. Update session docs continuously (living documents)
2. Never create temporal suffixed docs
3. Consolidate new findings into existing session docs
4. When creating diagrams/artifacts → save to `artifacts/` subdirectory

**Before ending session:**
1. Review all session docs for completeness
2. Scan repo for orphaned docs created during work
3. Move/consolidate docs outside session folder
4. Update canonical docs if permanent changes made

**When finding doc proliferation:**
1. Immediately flag for consolidation
2. Apply decision tree (above)
3. Delete temporal/redundant docs aggressively
4. Move relevant session-specific docs to appropriate session folder

### Cleanup Commands

```bash
# Find markdown creep
find . -name "*.md" -not -path "./docs/*" -not -name "README.md" -not -name "CHANGELOG.md"

# Find temporal suffixes (candidates for deletion)
find docs/ -name "*_v[0-9]*.md" -o -name "*_new.md" -o -name "*_old.md"

# Find status/summary files (likely orphaned)
find . -name "*.md" | grep -E "(SUMMARY|STATUS|FINAL|V[0-9]|_OLD|_NEW)"

# Count markdown files by location
find . -name "*.md" -type f | sed 's|/[^/]*$||' | sort | uniq -c | sort -rn
```

### Benefits

- **Discoverability**: All session work in one place
- **Context preservation**: Full history without clutter
- **Easy cleanup**: Archive/delete old sessions cleanly
- **Prevents duplication**: Clear home for session-specific docs
- **Living documents**: Update instead of versioning
- **Reduced noise**: Root/tests/ stay clean

### Real-World Impact

**Before:**
- Root: 37 .md files (various STATUS, SUMMARY, FINAL docs)
- tests/: 49 .md files (GUIDE, REPORT, CHECKLIST docs)
- Difficult to find current information

**After:**
- Root: ~4 .md files (AGENTS.md, CLAUDE.md, WARP.md, README.md)
- tests/: 1 .md file (README.md)
- All session work in `docs/sessions/<date-name>/`
- Clear, discoverable, maintainable

---

## 9. Architecture Mandates

### Directory Structure (Typical Python Project)

```
<project>/
├── src/<package>/
│   ├── api/                    # HTTP routes and handlers
│   │   ├── routes/             # Route handlers by domain
│   │   │   ├── openai.py       # OpenAI-compatible endpoints
│   │   │   ├── mcp.py          # MCP endpoints
│   │   │   ├── files.py        # File endpoints
│   │   │   └── health.py       # Health check endpoints
│   │   └── middleware/         # API middleware
│   ├── services/               # Business logic
│   │   ├── embedding/          # Embedding services
│   │   ├── auth/               # Auth helpers
│   │   └── prompts/            # Prompt management
│   ├── infrastructure/         # External adapters (DB, auth, storage)
│   │   ├── supabase_adapter.py
│   │   ├── auth_adapter.py
│   │   ├── storage_adapter.py
│   │   └── rate_limiter.py
│   ├── tools/                  # MCP tools
│   │   ├── workspace/
│   │   ├── entity/
│   │   ├── relationship/
│   │   ├── workflow/
│   │   └── query/
│   ├── auth/                   # Session, middleware, hybrid auth
│   ├── models/                 # Data models
│   ├── cli/                    # CLI commands
│   ├── main.py                 # Application entrypoint
│   ├── app.py                  # ASGI entrypoint
│   └── server.py               # MCP server wiring
├── config/                     # Configuration files
│   ├── settings.yml
│   └── secrets.yml             # (gitignored)
├── tests/                      # Test suite
│   ├── unit/
│   ├── integration/
│   ├── e2e/
│   └── conftest.py
└── docs/                       # Documentation
    ├── sessions/               # Session-based work docs
    └── architecture/           # Architecture docs
```

### Layer Boundaries (CRITICAL)

- **API Layer**: Only route handling, validation, response formatting
  - Receives HTTP requests
  - Validates input with Pydantic
  - Calls service layer
  - Formats responses

- **Service Layer**: Business logic, orchestration, external API calls
  - Contains domain logic
  - Orchestrates multiple operations
  - Calls infrastructure layer for data
  - Never accesses DB directly

- **Infrastructure Layer**: Database queries, external service clients
  - Supabase adapter for DB
  - Auth adapter for authentication
  - Storage adapter for files
  - Rate limiter for throttling

- **No Cross-Layer Bypass**: Always go through proper abstractions
  - Services don't query DB directly
  - Routes don't call infrastructure directly
  - Tools use services for logic

- **Stateless Design**: Pass context explicitly; avoid global state
  - Request context passed through call stack
  - No module-level mutable state
  - Configuration via dependency injection

### Key Architectural Patterns

1. **Adapter Pattern**: All external services wrapped in adapters
2. **Repository Pattern**: Data access through repositories
3. **Dependency Injection**: Services receive dependencies
4. **Factory Pattern**: Complex object creation via factories
5. **Middleware Pattern**: Cross-cutting concerns in middleware

---

## 10. Project-Specific Patterns

### API Patterns

```python
# Standard endpoint structure
@router.post("/v1/<resource>")
async def create_resource(
    request: CreateResourceRequest,
    service: ResourceService = Depends(get_service)
) -> ResourceResponse:
    """Create a new resource."""
    result = await service.create(request)
    return ResourceResponse.from_model(result)

# With authentication
@router.get("/v1/<resource>/{id}")
async def get_resource(
    id: str,
    user: User = Depends(get_current_user),
    service: ResourceService = Depends(get_service)
) -> ResourceResponse:
    """Get a resource by ID."""
    result = await service.get(id, user_id=user.id)
    if not result:
        raise HTTPException(status_code=404, detail="Resource not found")
    return ResourceResponse.from_model(result)

# OpenAI-compatible endpoint
@router.post("/v1/chat/completions")
async def chat_completions(
    request: ChatCompletionRequest,
    claude_client: ClaudeClient = Depends(get_claude_client)
) -> ChatCompletionResponse:
    """OpenAI-compatible chat completions endpoint."""
    # Convert OpenAI format to Claude format
    # Call Claude via Vertex AI
    # Convert Claude response back to OpenAI format
    ...
```

### Service Layer

```python
class ResourceService:
    """Service for resource operations."""

    def __init__(self, repository: ResourceRepository):
        self.repository = repository

    async def create(self, data: CreateResourceRequest) -> Resource:
        """Create a new resource."""
        # Validation
        self._validate_create(data)

        # Business logic
        resource = Resource.from_request(data)

        # Persistence via repository
        return await self.repository.save(resource)

    async def get(self, id: str, user_id: str) -> Resource | None:
        """Get a resource by ID."""
        resource = await self.repository.get(id)
        if resource and resource.user_id != user_id:
            raise PermissionError("Access denied")
        return resource

    def _validate_create(self, data: CreateResourceRequest) -> None:
        """Validate creation data."""
        if not data.name:
            raise ValueError("Name is required")
```

### Repository Pattern

```python
class ResourceRepository:
    """Repository for resource data access."""

    def __init__(self, db: Database):
        self.db = db

    async def save(self, resource: Resource) -> Resource:
        """Save a resource."""
        # Never bypass this layer for DB access
        result = await self.db.table("resources").insert(
            resource.model_dump()
        ).execute()
        return Resource.model_validate(result.data[0])

    async def get(self, id: str) -> Resource | None:
        """Get a resource by ID."""
        result = await self.db.table("resources").select("*").eq("id", id).execute()
        if not result.data:
            return None
        return Resource.model_validate(result.data[0])

    async def list(self, user_id: str, limit: int = 100) -> list[Resource]:
        """List resources for a user."""
        result = await self.db.table("resources").select("*").eq(
            "user_id", user_id
        ).limit(limit).execute()
        return [Resource.model_validate(r) for r in result.data]
```

### Configuration

```python
from pydantic_settings import BaseSettings
from pydantic import Field

class Settings(BaseSettings):
    """Application settings."""

    # Database
    database_url: str = Field(..., env="DATABASE_URL")
    supabase_url: str = Field(..., env="SUPABASE_URL")
    supabase_key: str = Field(..., env="SUPABASE_KEY")

    # Auth
    jwt_secret: str = Field(..., env="JWT_SECRET")
    jwt_algorithm: str = "HS256"
    jwt_expiration: int = 3600

    # API
    api_key: str = Field(default="", env="API_KEY")
    rate_limit: int = 100

    # Features
    enable_caching: bool = True
    log_level: str = "INFO"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

# Usage
settings = Settings()
```

### MCP Tool Pattern

```python
from fastmcp import FastMCP

mcp = FastMCP("my-server")

@mcp.tool
async def my_tool(
    param: str,
    optional_param: int = 10,
    context: Context = None
) -> dict:
    """Tool description for Claude.

    Args:
        param: Required parameter description
        optional_param: Optional parameter with default
        context: MCP context (injected)

    Returns:
        Dictionary with results
    """
    # Validate input
    if not param:
        raise ValueError("param is required")

    # Get authenticated user from context
    user_id = context.user_id if context else None

    # Perform operation
    result = await perform_operation(param, optional_param, user_id)

    # Return structured result
    return {
        "success": True,
        "data": result,
        "metadata": {
            "param": param,
            "optional_param": optional_param
        }
    }
```

### MCP Configuration Management

```python
# In services/mcp_registry.py
async def register_mcp_server(
    org_id: str,
    config: MCPServerConfig
) -> MCPServer:
    """Register new MCP server configuration."""
    # Validate config
    validate_mcp_config(config)

    # Store in Supabase
    server = await mcp_repository.create(org_id, config)

    # Initialize MCP client if auto-connect enabled
    if config.auto_connect:
        await initialize_mcp_client(server)

    return server
```

### Multi-Level Prompts

```python
# In services/prompts.py
async def build_prompt_stack(
    org_id: str,
    user_id: str | None = None,
    workflow_id: str | None = None
) -> list[Message]:
    """Build layered prompt stack."""
    messages = []

    # Platform-level system prompt
    messages.append(get_platform_prompt())

    # Organization-level customizations
    org_prompt = await get_org_prompt(org_id)
    if org_prompt:
        messages.append(org_prompt)

    # User-level preferences
    if user_id:
        user_prompt = await get_user_prompt(user_id)
        if user_prompt:
            messages.append(user_prompt)

    # Workflow-specific context
    if workflow_id:
        workflow_prompt = await get_workflow_prompt(workflow_id)
        if workflow_prompt:
            messages.append(workflow_prompt)

    return messages
```

### Error Handling Pattern

```python
from fastapi import HTTPException
from typing import TypeVar, Generic
from pydantic import BaseModel

T = TypeVar("T")

class Result(BaseModel, Generic[T]):
    """Generic result wrapper."""
    success: bool
    data: T | None = None
    error: str | None = None
    error_code: str | None = None

class AppError(Exception):
    """Base application error."""
    def __init__(self, message: str, code: str = "UNKNOWN_ERROR"):
        self.message = message
        self.code = code
        super().__init__(message)

class NotFoundError(AppError):
    """Resource not found error."""
    def __init__(self, resource: str, id: str):
        super().__init__(f"{resource} with id {id} not found", "NOT_FOUND")

class ValidationError(AppError):
    """Validation error."""
    def __init__(self, message: str):
        super().__init__(message, "VALIDATION_ERROR")

class PermissionError(AppError):
    """Permission denied error."""
    def __init__(self, message: str = "Permission denied"):
        super().__init__(message, "PERMISSION_DENIED")

# Error handler middleware
@app.exception_handler(AppError)
async def app_error_handler(request: Request, exc: AppError):
    status_codes = {
        "NOT_FOUND": 404,
        "VALIDATION_ERROR": 400,
        "PERMISSION_DENIED": 403,
    }
    return JSONResponse(
        status_code=status_codes.get(exc.code, 500),
        content={
            "success": False,
            "error": exc.message,
            "error_code": exc.code
        }
    )
```

### Logging Pattern

```python
import structlog
from functools import wraps

logger = structlog.get_logger()

def log_operation(operation_name: str):
    """Decorator for logging operations."""
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            log = logger.bind(operation=operation_name)
            log.info("operation_started", args=str(args)[:100], kwargs=str(kwargs)[:100])
            try:
                result = await func(*args, **kwargs)
                log.info("operation_completed", success=True)
                return result
            except Exception as e:
                log.error("operation_failed", error=str(e), error_type=type(e).__name__)
                raise
        return wrapper
    return decorator

# Usage
@log_operation("create_entity")
async def create_entity(data: EntityCreate) -> Entity:
    ...
```

---

## 11. Security & Secrets

### Never:
- Add real credentials or tokens to code
- Hardcode secrets in configuration
- Log sensitive information (API keys, passwords, tokens)
- Commit `.env` files or `secrets.yml`
- Store secrets in test files
- Include secrets in error messages

### Always:
```bash
# Use environment variables
export API_KEY="your-key"
export DATABASE_URL="postgresql://..."
export JWT_SECRET="your-secret"

# Use config files (gitignored)
config/secrets.yml

# Check for secrets before commit
rg -i "api[_-]?key|secret|password|token|bearer" src/ config/ tests/

# Use secret scanning in CI
# - GitHub secret scanning
# - gitleaks
# - trufflehog
```

### Secret Management Patterns

```python
# Good: Use environment variables
import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    api_key: str = Field(..., env="API_KEY")
    database_url: str = Field(..., env="DATABASE_URL")

    class Config:
        env_file = ".env"  # .env is gitignored

# Good: Use secret manager for production
from google.cloud import secretmanager

def get_secret(secret_id: str) -> str:
    client = secretmanager.SecretManagerServiceClient()
    name = f"projects/{project_id}/secrets/{secret_id}/versions/latest"
    response = client.access_secret_version(request={"name": name})
    return response.payload.data.decode("UTF-8")

# Bad: Hardcoded secrets
API_KEY = "sk-1234567890"  # ❌ Never do this
```

### Authentication Patterns

```python
# JWT validation
from jose import jwt, JWTError

async def validate_token(token: str) -> dict:
    """Validate JWT token."""
    try:
        payload = jwt.decode(
            token,
            settings.jwt_secret,
            algorithms=[settings.jwt_algorithm]
        )
        return payload
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# API key validation
async def validate_api_key(api_key: str) -> bool:
    """Validate API key."""
    # Use constant-time comparison to prevent timing attacks
    return secrets.compare_digest(api_key, settings.api_key)

# Dependency for protected routes
async def get_current_user(
    authorization: str = Header(None)
) -> User:
    """Get current authenticated user."""
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing authorization")

    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization format")

    token = authorization.replace("Bearer ", "")
    payload = await validate_token(token)

    user = await user_repository.get(payload["sub"])
    if not user:
        raise HTTPException(status_code=401, detail="User not found")

    return user
```

### Rate Limiting

```python
from fastapi import Request
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

@router.post("/v1/chat/completions")
@limiter.limit("60/minute")
async def chat_completions(request: Request, ...):
    ...
```

### Input Validation

```python
from pydantic import BaseModel, Field, validator
import re

class UserCreate(BaseModel):
    """User creation model with validation."""

    email: str = Field(..., max_length=255)
    password: str = Field(..., min_length=8, max_length=128)
    name: str = Field(..., min_length=1, max_length=100)

    @validator("email")
    def validate_email(cls, v):
        if not re.match(r"^[\w\.-]+@[\w\.-]+\.\w+$", v):
            raise ValueError("Invalid email format")
        return v.lower()

    @validator("password")
    def validate_password(cls, v):
        if not re.search(r"[A-Z]", v):
            raise ValueError("Password must contain uppercase letter")
        if not re.search(r"[a-z]", v):
            raise ValueError("Password must contain lowercase letter")
        if not re.search(r"\d", v):
            raise ValueError("Password must contain digit")
        return v
```

---

## 12. Common Workflows

### Adding a New API Endpoint
```bash
# 1. Define route in api/routes/
# Create new file or add to existing router

# 2. Create Pydantic schemas
# In schemas/<domain>.py or models/

# 3. Implement service logic
# In services/<domain>.py

# 4. Add repository if needed
# In infrastructure/<domain>_repository.py

# 5. Write tests
# In tests/unit/api/test_routes_<domain>.py
# In tests/integration/test_<domain>.py

# 6. Run tests
python cli.py test run

# 7. Verify quality
python cli.py lint check
python cli.py types check
```

### Adding a New MCP Tool
```bash
# 1. Define tool in tools/<domain>.py or tools/<domain>/
@mcp.tool
async def my_new_tool(param: str) -> dict:
    """Tool description."""
    # Implementation

# 2. Write tests
# In tests/unit/tools/test_<domain>.py

# 3. Test with MCP Inspector
python cli.py mcp inspect

# 4. Update documentation
# Document in docs/tools/<domain>.md
```

### Adding a New Service
```bash
# 1. Create service in services/<domain>.py
# If >350 lines, create services/<domain>/ submodule

# 2. Add repository if needed in infrastructure/
# <domain>_repository.py or <domain>_adapter.py

# 3. Wire up dependencies
# In main.py or deps.py

# 4. Write tests
# In tests/unit/services/test_<domain>.py

# 5. Check line counts; decompose if needed
wc -l src/<package>/services/<domain>.py
```

### Refactoring Large File
```bash
# 1. Check current size
wc -l src/<file>.py

# 2. Identify cohesive responsibilities
# - What are the distinct concerns?
# - What can be extracted?

# 3. Create submodule directory
mkdir src/<package>/<module>/

# 4. Create __init__.py with exports
touch src/<package>/<module>/__init__.py

# 5. Extract pieces with clear interfaces
# Move related functions/classes to separate files

# 6. Update __init__.py exports
# Maintain backward compatibility during transition

# 7. Update ALL imports simultaneously
rg "from.*<module> import" -l

# 8. Run full test suite
python cli.py test run

# 9. Verify no legacy code remains
# Remove old file, update all references
```

### Updating Database Schema
```bash
# 1. Update schema in Supabase or migration file

# 2. Regenerate models (if using auto-generation)
python cli.py db generate-models

# 3. Update repositories if needed

# 4. Run tests to verify
python cli.py test run --scope integration

# 5. Update documentation
```

### Debugging a Test Failure
```bash
# 1. Run the specific failing test with verbose output
uv run pytest tests/path/to/test.py::test_name -v --tb=long

# 2. Add debugging output if needed
# Use pytest's -s flag to see print statements
uv run pytest tests/path/to/test.py::test_name -v -s

# 3. Check test fixtures
# Review conftest.py for fixture issues

# 4. Isolate the issue
# Run test in isolation vs with other tests

# 5. Fix and verify
python cli.py test run
```

---

## 13. Troubleshooting

### Common Issues

**Import errors:**
```bash
# Ensure venv is activated
source .venv/bin/activate

# Reinstall dependencies
uv pip install -e ".[dev]"

# Check Python path
python -c "import sys; print(sys.path)"

# Verify package is installed
uv pip list | grep <package>
```

**Type errors:**
```bash
# Run mypy for details
uv run mypy src/<package>

# Check specific file
uv run mypy src/<package>/services/<file>.py

# Ignore specific errors temporarily
# type: ignore[error-code]
```

**Test failures:**
```bash
# Run with verbose output
uv run pytest tests/ -v

# Run specific failing test
uv run pytest tests/test_<module>.py::<test_name> -v

# Show full traceback
uv run pytest tests/ -v --tb=long

# Show print statements
uv run pytest tests/ -v -s

# Run with debugger
uv run pytest tests/test_<module>.py::<test_name> -v --pdb
```

**Database connection issues:**
```bash
# Check environment variables
echo $DATABASE_URL
echo $SUPABASE_URL

# Test connection
python -c "from infrastructure.supabase_adapter import get_client; print(get_client())"

# Check Supabase status
curl $SUPABASE_URL/rest/v1/ -H "apikey: $SUPABASE_KEY"
```

**Rate limiting issues:**
```bash
# Check rate limit status
# Review logs for rate limit errors

# Adjust rate limits in config
# config/settings.yml: rate_limit: 100

# Use exponential backoff in clients
```

**Memory issues:**
```bash
# Profile memory usage
python -m memory_profiler src/<package>/main.py

# Check for memory leaks
# Use tracemalloc for debugging
```

### Recovery Commands

```bash
# Clean Python cache
find . -type d -name __pycache__ -exec rm -rf {} +
find . -type f -name "*.pyc" -delete

# Clear test cache
rm -rf .pytest_cache

# Clear mypy cache
rm -rf .mypy_cache

# Reinstall everything
uv pip install -e ".[dev]" --force-reinstall

# Reset virtual environment
rm -rf .venv
python -m venv .venv
source .venv/bin/activate
uv pip install -e ".[dev]"

# Clear all caches
rm -rf .pytest_cache .mypy_cache .ruff_cache __pycache__
find . -type d -name __pycache__ -exec rm -rf {} +
```

### Debugging Patterns

```python
# Add temporary debugging
import logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# In function
logger.debug(f"Variable state: {variable}")

# Use breakpoint for interactive debugging
def problematic_function():
    breakpoint()  # Drops into pdb
    ...

# Profile slow code
import cProfile
import pstats

profiler = cProfile.Profile()
profiler.enable()
# ... code to profile ...
profiler.disable()
stats = pstats.Stats(profiler)
stats.sort_stats('cumulative')
stats.print_stats(10)
```

---

## 14. Performance Metrics

### Key Indicators
- **API Response Time**: <500ms for typical requests
- **Database Query Time**: <100ms for simple queries
- **Test Execution**: <30s for unit suite, <5min for full suite
- **Code Coverage**: >80% for critical paths
- **File Size**: All modules ≤500 lines

### Optimization Targets
- Use async/await for all I/O operations
- Cache expensive computations (embeddings, queries)
- Optimize database queries with proper indexes
- Stream responses for long-running operations
- Use connection pooling for database
- Implement rate limiting and backpressure

### Performance Monitoring

```python
# Add timing to critical paths
import time
from functools import wraps

def timed(func):
    @wraps(func)
    async def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = await func(*args, **kwargs)
        duration = time.perf_counter() - start
        logger.info(f"{func.__name__} took {duration:.3f}s")
        return result
    return wrapper

@timed
async def slow_operation():
    ...
```

### Caching Patterns

```python
from functools import lru_cache
from cachetools import TTLCache
import asyncio

# Simple LRU cache for sync functions
@lru_cache(maxsize=100)
def get_config(key: str) -> str:
    ...

# TTL cache for async functions
cache = TTLCache(maxsize=1000, ttl=300)  # 5 minute TTL

async def get_cached_data(key: str) -> dict:
    if key in cache:
        return cache[key]

    data = await fetch_data(key)
    cache[key] = data
    return data
```

---

## 15. MCP Integration Patterns

### Basic MCP Server Setup

```python
from fastmcp import FastMCP

mcp = FastMCP(
    name="my-mcp-server",
    version="1.0.0",
    description="My MCP Server"
)

@mcp.tool
async def my_tool(param: str) -> dict:
    """Tool description."""
    return {"result": param}

@mcp.resource("resource://{id}")
async def get_resource(id: str) -> str:
    """Get resource by ID."""
    return f"Resource {id}"

@mcp.prompt
async def my_prompt(context: str) -> str:
    """Generate a prompt."""
    return f"Context: {context}"
```

### MCP with Authentication

```python
from fastmcp import FastMCP, Context

mcp = FastMCP("authenticated-server")

@mcp.tool
async def protected_tool(
    param: str,
    context: Context
) -> dict:
    """Protected tool requiring authentication."""
    # Get user from context
    user = context.user
    if not user:
        raise PermissionError("Authentication required")

    # Check permissions
    if not user.has_permission("use_tool"):
        raise PermissionError("Permission denied")

    return {"result": param, "user": user.id}
```

### MCP Tool with Database

```python
@mcp.tool
async def create_entity(
    name: str,
    description: str,
    context: Context
) -> dict:
    """Create a new entity."""
    # Get user context
    user_id = context.user.id
    workspace_id = context.workspace_id

    # Create entity via service
    entity = await entity_service.create(
        name=name,
        description=description,
        user_id=user_id,
        workspace_id=workspace_id
    )

    return {
        "success": True,
        "entity": entity.model_dump()
    }
```

### MCP Error Handling

```python
from fastmcp import FastMCP, MCPError

@mcp.tool
async def risky_tool(param: str) -> dict:
    """Tool with error handling."""
    try:
        result = await perform_risky_operation(param)
        return {"success": True, "result": result}
    except ValidationError as e:
        raise MCPError(f"Validation failed: {e}", code="VALIDATION_ERROR")
    except NotFoundError as e:
        raise MCPError(f"Not found: {e}", code="NOT_FOUND")
    except Exception as e:
        logger.exception("Unexpected error in risky_tool")
        raise MCPError("Internal error", code="INTERNAL_ERROR")
```

---

## 16. Multi-Model Orchestration

### Model Selection Strategies

```python
# Automatic model selection based on task
def select_model(task_type: str, context_size: int) -> str:
    """Select optimal model for task."""
    if context_size > 100_000:
        return "gemini-2.5-pro"  # Large context
    elif task_type == "code_review":
        return "claude-sonnet-4"  # Good for code
    elif task_type == "quick_analysis":
        return "gemini-flash"  # Fast and cheap
    else:
        return "claude-sonnet-4"  # Default

# Explicit model selection
async def analyze_with_model(
    content: str,
    model: str = "auto"
) -> dict:
    """Analyze content with specified model."""
    if model == "auto":
        model = select_model(
            task_type="analysis",
            context_size=len(content)
        )

    return await call_model(model, content)
```

### Consensus Pattern

```python
async def get_consensus(
    prompt: str,
    models: list[str] = ["claude-sonnet-4", "gemini-2.5-pro"]
) -> dict:
    """Get consensus from multiple models."""
    responses = await asyncio.gather(*[
        call_model(model, prompt)
        for model in models
    ])

    # Synthesize responses
    consensus = synthesize_responses(responses)

    return {
        "consensus": consensus,
        "individual_responses": responses,
        "models_used": models
    }
```

### Context Management

```python
class ConversationContext:
    """Manage conversation context across models."""

    def __init__(self, max_tokens: int = 100_000):
        self.messages: list[Message] = []
        self.max_tokens = max_tokens

    def add_message(self, role: str, content: str) -> None:
        """Add message to context."""
        self.messages.append(Message(role=role, content=content))
        self._trim_if_needed()

    def _trim_if_needed(self) -> None:
        """Trim old messages if context too large."""
        total_tokens = sum(len(m.content) // 4 for m in self.messages)
        while total_tokens > self.max_tokens and len(self.messages) > 1:
            self.messages.pop(0)
            total_tokens = sum(len(m.content) // 4 for m in self.messages)

    def get_messages(self) -> list[Message]:
        """Get all messages."""
        return self.messages.copy()
```

### Workflow Templates

```python
# Code review workflow
async def code_review_workflow(
    files: list[str],
    models: list[str] = ["claude-sonnet-4", "gemini-2.5-pro"]
) -> dict:
    """Multi-model code review workflow."""
    # Step 1: Parallel analysis
    analyses = await asyncio.gather(*[
        analyze_code(files, model)
        for model in models
    ])

    # Step 2: Synthesize findings
    synthesis = await synthesize_findings(analyses)

    # Step 3: Prioritize issues
    prioritized = await prioritize_issues(synthesis)

    # Step 4: Generate action plan
    plan = await generate_action_plan(prioritized)

    return {
        "analyses": analyses,
        "synthesis": synthesis,
        "prioritized_issues": prioritized,
        "action_plan": plan
    }

# Debugging workflow
async def debug_workflow(
    error: str,
    context: str
) -> dict:
    """Multi-model debugging workflow."""
    # Use different models for different aspects
    root_cause = await call_model("o3", f"Analyze root cause: {error}\n{context}")
    patterns = await call_model("gemini-flash", f"Check common patterns: {error}")
    solution = await call_model("claude-sonnet-4", f"Propose solution: {error}\n{root_cause}")

    return {
        "root_cause": root_cause,
        "patterns": patterns,
        "solution": solution
    }
```

---

## 17. Behavioral Constraints for Agents

### Autonomous Operation
- Do NOT ask user what to do next unless blocked
- Loop through SWE cycle until clean
- Only pause for: missing secrets, true ambiguity, destructive ops

### Code Quality
- Never introduce security vulnerabilities (OWASP top 10)
- Always respect file size limits (350/500)
- Match existing patterns; don't invent new ones
- Remove dead code; don't comment it out
- Maintain or improve test coverage

### When to Ask

Only pause for user input when:
- Credentials, API keys, or external IDs are required and cannot be inferred
- There is a genuine product/behavior ambiguity not answered by code/tests/docs
- An operation may be destructive (data deletion, production migrations, forced pushes)

### Communication Style
- Keep explanations concise; focus tokens on accurate code and commands
- Document decisions in session folder, not in chat
- Provide actionable next steps, not vague suggestions

---

## 18. Quick Reference Commands

### Testing
```bash
python cli.py test run                    # All tests via CLI
python cli.py test run --scope unit       # Unit tests
python cli.py test run --coverage         # With coverage
uv run pytest -q                          # Quick all tests
uv run pytest tests/unit/ -v              # Unit tests verbose
uv run pytest -m smoke                    # Smoke tests only
uv run pytest -m "not slow"               # Skip slow tests
```

### Quality
```bash
python cli.py lint check                  # Lint via CLI
python cli.py lint fix                    # Auto-fix via CLI
uv run ruff check src/                    # Lint
uv run ruff check --fix src/              # Auto-fix
uv run ruff format src/                   # Format
uv run mypy src/                          # Type check
```

### Git
```bash
git status                                # Status
git diff                                  # Changes
git add -p                                # Interactive staging
git commit -m "msg"                       # Commit
git log --oneline -10                     # Recent history
```

### Files
```bash
wc -l <file>                              # Line count
find src/ -name "*.py" -exec wc -l {} +   # All Python files
find src/ -name "*.py" -exec wc -l {} + | awk '$1 > 350'  # Files over limit
rg "pattern" src/                         # Search code
rg "pattern" --type py -A 5 -B 5          # With context
```

### Documentation
```bash
# Find markdown creep
find . -name "*.md" -not -path "./docs/*" -not -name "README.md"

# Find temporal suffixes
find . -name "*.md" | grep -E "(SUMMARY|STATUS|FINAL|V[0-9])"

# Create session folder
mkdir -p docs/sessions/$(date +%Y%m%d)-description
```

---

## 19. Database Patterns

### Supabase Integration

```python
from supabase import create_client, Client
from typing import Optional
import os

class SupabaseAdapter:
    """Adapter for Supabase database operations."""

    def __init__(self):
        self.url = os.environ["SUPABASE_URL"]
        self.key = os.environ["SUPABASE_KEY"]
        self._client: Optional[Client] = None

    @property
    def client(self) -> Client:
        """Lazy initialization of Supabase client."""
        if self._client is None:
            self._client = create_client(self.url, self.key)
        return self._client

    async def get_by_id(self, table: str, id: str) -> Optional[dict]:
        """Get a record by ID."""
        result = self.client.table(table).select("*").eq("id", id).execute()
        return result.data[0] if result.data else None

    async def list_all(
        self,
        table: str,
        filters: dict = None,
        limit: int = 100,
        offset: int = 0
    ) -> list[dict]:
        """List records with optional filters."""
        query = self.client.table(table).select("*")

        if filters:
            for key, value in filters.items():
                query = query.eq(key, value)

        result = query.range(offset, offset + limit - 1).execute()
        return result.data

    async def create(self, table: str, data: dict) -> dict:
        """Create a new record."""
        result = self.client.table(table).insert(data).execute()
        return result.data[0]

    async def update(self, table: str, id: str, data: dict) -> dict:
        """Update an existing record."""
        result = self.client.table(table).update(data).eq("id", id).execute()
        return result.data[0]

    async def delete(self, table: str, id: str) -> bool:
        """Delete a record."""
        self.client.table(table).delete().eq("id", id).execute()
        return True

    async def upsert(self, table: str, data: dict) -> dict:
        """Insert or update a record."""
        result = self.client.table(table).upsert(data).execute()
        return result.data[0]
```

### Query Builder Pattern

```python
class QueryBuilder:
    """Fluent query builder for database operations."""

    def __init__(self, adapter: SupabaseAdapter, table: str):
        self.adapter = adapter
        self.table = table
        self._filters: list[tuple] = []
        self._order: Optional[tuple] = None
        self._limit: int = 100
        self._offset: int = 0
        self._select: str = "*"

    def select(self, columns: str) -> "QueryBuilder":
        """Select specific columns."""
        self._select = columns
        return self

    def where(self, column: str, value: any) -> "QueryBuilder":
        """Add equality filter."""
        self._filters.append(("eq", column, value))
        return self

    def where_in(self, column: str, values: list) -> "QueryBuilder":
        """Add IN filter."""
        self._filters.append(("in", column, values))
        return self

    def where_like(self, column: str, pattern: str) -> "QueryBuilder":
        """Add LIKE filter."""
        self._filters.append(("like", column, pattern))
        return self

    def where_gt(self, column: str, value: any) -> "QueryBuilder":
        """Add greater than filter."""
        self._filters.append(("gt", column, value))
        return self

    def where_lt(self, column: str, value: any) -> "QueryBuilder":
        """Add less than filter."""
        self._filters.append(("lt", column, value))
        return self

    def order_by(self, column: str, ascending: bool = True) -> "QueryBuilder":
        """Set ordering."""
        self._order = (column, ascending)
        return self

    def limit(self, limit: int) -> "QueryBuilder":
        """Set result limit."""
        self._limit = limit
        return self

    def offset(self, offset: int) -> "QueryBuilder":
        """Set result offset."""
        self._offset = offset
        return self

    async def execute(self) -> list[dict]:
        """Execute the query."""
        query = self.adapter.client.table(self.table).select(self._select)

        for filter_type, column, value in self._filters:
            if filter_type == "eq":
                query = query.eq(column, value)
            elif filter_type == "in":
                query = query.in_(column, value)
            elif filter_type == "like":
                query = query.like(column, value)
            elif filter_type == "gt":
                query = query.gt(column, value)
            elif filter_type == "lt":
                query = query.lt(column, value)

        if self._order:
            query = query.order(self._order[0], desc=not self._order[1])

        query = query.range(self._offset, self._offset + self._limit - 1)

        result = query.execute()
        return result.data

    async def first(self) -> Optional[dict]:
        """Get first result."""
        self._limit = 1
        results = await self.execute()
        return results[0] if results else None

    async def count(self) -> int:
        """Get result count."""
        query = self.adapter.client.table(self.table).select("*", count="exact")

        for filter_type, column, value in self._filters:
            if filter_type == "eq":
                query = query.eq(column, value)

        result = query.execute()
        return result.count

# Usage
async def get_user_entities(user_id: str) -> list[dict]:
    return await (
        QueryBuilder(adapter, "entities")
        .select("id, name, created_at")
        .where("user_id", user_id)
        .where("deleted_at", None)
        .order_by("created_at", ascending=False)
        .limit(50)
        .execute()
    )
```

### Transaction Pattern

```python
from contextlib import asynccontextmanager

class TransactionManager:
    """Manage database transactions."""

    def __init__(self, adapter: SupabaseAdapter):
        self.adapter = adapter
        self._operations: list[callable] = []

    def add_operation(self, operation: callable) -> None:
        """Add operation to transaction."""
        self._operations.append(operation)

    @asynccontextmanager
    async def transaction(self):
        """Execute operations in transaction."""
        try:
            yield self
            # Execute all operations
            results = []
            for operation in self._operations:
                result = await operation()
                results.append(result)
            return results
        except Exception as e:
            # Rollback logic here if needed
            raise
        finally:
            self._operations.clear()

# Usage
async def create_entity_with_relationships(
    entity_data: dict,
    relationships: list[dict]
) -> dict:
    tx = TransactionManager(adapter)

    async with tx.transaction():
        # Create entity
        tx.add_operation(lambda: adapter.create("entities", entity_data))

        # Create relationships
        for rel in relationships:
            tx.add_operation(lambda r=rel: adapter.create("relationships", r))

    return entity_data
```

### Migration Patterns

```python
# migrations/001_create_entities.py
"""Create entities table."""

UP = """
CREATE TABLE IF NOT EXISTS entities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id),
    user_id UUID NOT NULL REFERENCES users(id),
    name TEXT NOT NULL,
    description TEXT,
    entity_type TEXT NOT NULL DEFAULT 'generic',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_entities_workspace ON entities(workspace_id);
CREATE INDEX idx_entities_user ON entities(user_id);
CREATE INDEX idx_entities_type ON entities(entity_type);
CREATE INDEX idx_entities_created ON entities(created_at);
"""

DOWN = """
DROP TABLE IF EXISTS entities;
"""

# migrations/002_create_relationships.py
"""Create relationships table."""

UP = """
CREATE TABLE IF NOT EXISTS relationships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    workspace_id UUID NOT NULL REFERENCES workspaces(id),
    source_id UUID NOT NULL REFERENCES entities(id),
    target_id UUID NOT NULL REFERENCES entities(id),
    relationship_type TEXT NOT NULL,
    properties JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ,

    CONSTRAINT no_self_reference CHECK (source_id != target_id)
);

CREATE INDEX idx_relationships_workspace ON relationships(workspace_id);
CREATE INDEX idx_relationships_source ON relationships(source_id);
CREATE INDEX idx_relationships_target ON relationships(target_id);
CREATE INDEX idx_relationships_type ON relationships(relationship_type);
"""

DOWN = """
DROP TABLE IF EXISTS relationships;
"""
```

---

## 20. API Design Patterns

### RESTful Endpoint Design

```python
from fastapi import APIRouter, Depends, HTTPException, Query, Path
from typing import Optional
from pydantic import BaseModel, Field
from uuid import UUID

router = APIRouter(prefix="/v1/entities", tags=["entities"])

# Request/Response Models
class EntityCreate(BaseModel):
    """Create entity request."""
    name: str = Field(..., min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=2000)
    entity_type: str = Field("generic", pattern="^[a-z_]+$")
    metadata: dict = Field(default_factory=dict)

class EntityUpdate(BaseModel):
    """Update entity request."""
    name: Optional[str] = Field(None, min_length=1, max_length=255)
    description: Optional[str] = Field(None, max_length=2000)
    metadata: Optional[dict] = None

class EntityResponse(BaseModel):
    """Entity response."""
    id: UUID
    workspace_id: UUID
    name: str
    description: Optional[str]
    entity_type: str
    metadata: dict
    created_at: datetime
    updated_at: datetime

class EntityListResponse(BaseModel):
    """Paginated entity list response."""
    items: list[EntityResponse]
    total: int
    page: int
    page_size: int
    has_more: bool

# Endpoints
@router.post("", response_model=EntityResponse, status_code=201)
async def create_entity(
    data: EntityCreate,
    workspace_id: UUID = Query(..., description="Workspace ID"),
    user: User = Depends(get_current_user),
    service: EntityService = Depends(get_entity_service)
) -> EntityResponse:
    """Create a new entity."""
    entity = await service.create(
        workspace_id=workspace_id,
        user_id=user.id,
        data=data
    )
    return EntityResponse.model_validate(entity)

@router.get("/{entity_id}", response_model=EntityResponse)
async def get_entity(
    entity_id: UUID = Path(..., description="Entity ID"),
    user: User = Depends(get_current_user),
    service: EntityService = Depends(get_entity_service)
) -> EntityResponse:
    """Get an entity by ID."""
    entity = await service.get(entity_id, user_id=user.id)
    if not entity:
        raise HTTPException(status_code=404, detail="Entity not found")
    return EntityResponse.model_validate(entity)

@router.get("", response_model=EntityListResponse)
async def list_entities(
    workspace_id: UUID = Query(..., description="Workspace ID"),
    entity_type: Optional[str] = Query(None, description="Filter by type"),
    search: Optional[str] = Query(None, description="Search in name"),
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(20, ge=1, le=100, description="Items per page"),
    user: User = Depends(get_current_user),
    service: EntityService = Depends(get_entity_service)
) -> EntityListResponse:
    """List entities with pagination and filters."""
    result = await service.list(
        workspace_id=workspace_id,
        user_id=user.id,
        entity_type=entity_type,
        search=search,
        page=page,
        page_size=page_size
    )
    return EntityListResponse(
        items=[EntityResponse.model_validate(e) for e in result.items],
        total=result.total,
        page=page,
        page_size=page_size,
        has_more=result.total > page * page_size
    )

@router.patch("/{entity_id}", response_model=EntityResponse)
async def update_entity(
    entity_id: UUID = Path(..., description="Entity ID"),
    data: EntityUpdate = ...,
    user: User = Depends(get_current_user),
    service: EntityService = Depends(get_entity_service)
) -> EntityResponse:
    """Update an entity."""
    entity = await service.update(
        entity_id=entity_id,
        user_id=user.id,
        data=data
    )
    if not entity:
        raise HTTPException(status_code=404, detail="Entity not found")
    return EntityResponse.model_validate(entity)

@router.delete("/{entity_id}", status_code=204)
async def delete_entity(
    entity_id: UUID = Path(..., description="Entity ID"),
    user: User = Depends(get_current_user),
    service: EntityService = Depends(get_entity_service)
) -> None:
    """Delete an entity (soft delete)."""
    success = await service.delete(entity_id=entity_id, user_id=user.id)
    if not success:
        raise HTTPException(status_code=404, detail="Entity not found")
```

### Error Response Pattern

```python
from fastapi import Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional, Any

class ErrorResponse(BaseModel):
    """Standard error response."""
    success: bool = False
    error: str
    error_code: str
    details: Optional[dict[str, Any]] = None
    request_id: Optional[str] = None

class ErrorCodes:
    """Standard error codes."""
    VALIDATION_ERROR = "VALIDATION_ERROR"
    NOT_FOUND = "NOT_FOUND"
    PERMISSION_DENIED = "PERMISSION_DENIED"
    RATE_LIMITED = "RATE_LIMITED"
    INTERNAL_ERROR = "INTERNAL_ERROR"
    AUTHENTICATION_REQUIRED = "AUTHENTICATION_REQUIRED"
    INVALID_TOKEN = "INVALID_TOKEN"
    RESOURCE_CONFLICT = "RESOURCE_CONFLICT"
    SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE"

# Error handlers
@app.exception_handler(ValidationError)
async def validation_error_handler(request: Request, exc: ValidationError):
    return JSONResponse(
        status_code=400,
        content=ErrorResponse(
            error=str(exc),
            error_code=ErrorCodes.VALIDATION_ERROR,
            request_id=request.state.request_id
        ).model_dump()
    )

@app.exception_handler(NotFoundError)
async def not_found_handler(request: Request, exc: NotFoundError):
    return JSONResponse(
        status_code=404,
        content=ErrorResponse(
            error=str(exc),
            error_code=ErrorCodes.NOT_FOUND,
            request_id=request.state.request_id
        ).model_dump()
    )

@app.exception_handler(PermissionDeniedError)
async def permission_denied_handler(request: Request, exc: PermissionDeniedError):
    return JSONResponse(
        status_code=403,
        content=ErrorResponse(
            error=str(exc),
            error_code=ErrorCodes.PERMISSION_DENIED,
            request_id=request.state.request_id
        ).model_dump()
    )

@app.exception_handler(RateLimitError)
async def rate_limit_handler(request: Request, exc: RateLimitError):
    return JSONResponse(
        status_code=429,
        content=ErrorResponse(
            error="Rate limit exceeded",
            error_code=ErrorCodes.RATE_LIMITED,
            details={"retry_after": exc.retry_after},
            request_id=request.state.request_id
        ).model_dump(),
        headers={"Retry-After": str(exc.retry_after)}
    )
```

### Pagination Pattern

```python
from pydantic import BaseModel
from typing import Generic, TypeVar, Optional
from dataclasses import dataclass

T = TypeVar("T")

@dataclass
class PaginationParams:
    """Pagination parameters."""
    page: int = 1
    page_size: int = 20
    sort_by: Optional[str] = None
    sort_order: str = "asc"

    @property
    def offset(self) -> int:
        return (self.page - 1) * self.page_size

    @property
    def limit(self) -> int:
        return self.page_size

class PaginatedResponse(BaseModel, Generic[T]):
    """Generic paginated response."""
    items: list[T]
    total: int
    page: int
    page_size: int
    total_pages: int
    has_next: bool
    has_prev: bool

    @classmethod
    def create(
        cls,
        items: list[T],
        total: int,
        params: PaginationParams
    ) -> "PaginatedResponse[T]":
        total_pages = (total + params.page_size - 1) // params.page_size
        return cls(
            items=items,
            total=total,
            page=params.page,
            page_size=params.page_size,
            total_pages=total_pages,
            has_next=params.page < total_pages,
            has_prev=params.page > 1
        )

# Dependency for pagination
def get_pagination_params(
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(20, ge=1, le=100, description="Items per page"),
    sort_by: Optional[str] = Query(None, description="Sort field"),
    sort_order: str = Query("asc", pattern="^(asc|desc)$", description="Sort order")
) -> PaginationParams:
    return PaginationParams(
        page=page,
        page_size=page_size,
        sort_by=sort_by,
        sort_order=sort_order
    )

# Usage in endpoint
@router.get("", response_model=PaginatedResponse[EntityResponse])
async def list_entities(
    pagination: PaginationParams = Depends(get_pagination_params),
    service: EntityService = Depends(get_entity_service)
):
    items, total = await service.list_paginated(
        offset=pagination.offset,
        limit=pagination.limit,
        sort_by=pagination.sort_by,
        sort_order=pagination.sort_order
    )
    return PaginatedResponse.create(items, total, pagination)
```

### Filtering Pattern

```python
from pydantic import BaseModel
from typing import Optional, Any
from enum import Enum

class FilterOperator(str, Enum):
    """Filter operators."""
    EQ = "eq"
    NE = "ne"
    GT = "gt"
    GTE = "gte"
    LT = "lt"
    LTE = "lte"
    IN = "in"
    LIKE = "like"
    IS_NULL = "is_null"
    IS_NOT_NULL = "is_not_null"

class Filter(BaseModel):
    """Single filter condition."""
    field: str
    operator: FilterOperator
    value: Any

class FilterSet(BaseModel):
    """Collection of filters."""
    filters: list[Filter] = []
    logic: str = "and"  # "and" or "or"

def parse_filters(filter_string: Optional[str]) -> FilterSet:
    """Parse filter string into FilterSet.

    Format: field:op:value,field:op:value
    Example: status:eq:active,created_at:gt:2024-01-01
    """
    if not filter_string:
        return FilterSet()

    filters = []
    for part in filter_string.split(","):
        field, op, value = part.split(":", 2)
        filters.append(Filter(
            field=field,
            operator=FilterOperator(op),
            value=value
        ))
    return FilterSet(filters=filters)

def apply_filters(query, filters: FilterSet):
    """Apply filters to query builder."""
    for f in filters.filters:
        if f.operator == FilterOperator.EQ:
            query = query.eq(f.field, f.value)
        elif f.operator == FilterOperator.NE:
            query = query.neq(f.field, f.value)
        elif f.operator == FilterOperator.GT:
            query = query.gt(f.field, f.value)
        elif f.operator == FilterOperator.GTE:
            query = query.gte(f.field, f.value)
        elif f.operator == FilterOperator.LT:
            query = query.lt(f.field, f.value)
        elif f.operator == FilterOperator.LTE:
            query = query.lte(f.field, f.value)
        elif f.operator == FilterOperator.IN:
            query = query.in_(f.field, f.value.split("|"))
        elif f.operator == FilterOperator.LIKE:
            query = query.like(f.field, f.value)
        elif f.operator == FilterOperator.IS_NULL:
            query = query.is_(f.field, None)
        elif f.operator == FilterOperator.IS_NOT_NULL:
            query = query.not_.is_(f.field, None)
    return query
```

---

## 21. Async Patterns

### Async Context Managers

```python
from contextlib import asynccontextmanager
from typing import AsyncGenerator

@asynccontextmanager
async def db_session() -> AsyncGenerator[Database, None]:
    """Provide database session with cleanup."""
    session = await Database.connect()
    try:
        yield session
    finally:
        await session.disconnect()

@asynccontextmanager
async def http_client() -> AsyncGenerator[httpx.AsyncClient, None]:
    """Provide HTTP client with cleanup."""
    async with httpx.AsyncClient(timeout=30.0) as client:
        yield client

# Usage
async def fetch_and_store(url: str):
    async with http_client() as client, db_session() as db:
        response = await client.get(url)
        await db.execute("INSERT INTO cache (url, data) VALUES ($1, $2)", url, response.text)
```

### Async Iterators

```python
from typing import AsyncIterator

async def stream_large_dataset(
    query: str,
    batch_size: int = 100
) -> AsyncIterator[dict]:
    """Stream large dataset in batches."""
    offset = 0
    while True:
        batch = await db.fetch_all(
            f"{query} LIMIT {batch_size} OFFSET {offset}"
        )
        if not batch:
            break

        for record in batch:
            yield dict(record)

        offset += batch_size

# Usage
async def process_all_entities():
    async for entity in stream_large_dataset("SELECT * FROM entities"):
        await process_entity(entity)
```

### Concurrent Execution

```python
import asyncio
from typing import TypeVar, Callable, Awaitable

T = TypeVar("T")

async def gather_with_limit(
    tasks: list[Callable[[], Awaitable[T]]],
    limit: int = 10
) -> list[T]:
    """Execute tasks concurrently with concurrency limit."""
    semaphore = asyncio.Semaphore(limit)

    async def limited_task(task: Callable[[], Awaitable[T]]) -> T:
        async with semaphore:
            return await task()

    return await asyncio.gather(*[limited_task(t) for t in tasks])

async def map_async(
    func: Callable[[T], Awaitable[any]],
    items: list[T],
    concurrency: int = 10
) -> list[any]:
    """Map function over items with concurrency limit."""
    return await gather_with_limit(
        [lambda i=i: func(i) for i in items],
        limit=concurrency
    )

# Usage
async def enrich_entities(entities: list[Entity]) -> list[Entity]:
    async def enrich(entity: Entity) -> Entity:
        entity.metadata = await fetch_metadata(entity.id)
        return entity

    return await map_async(enrich, entities, concurrency=5)
```

### Retry Pattern

```python
import asyncio
from functools import wraps
from typing import Type

def retry_async(
    max_retries: int = 3,
    delay: float = 1.0,
    backoff: float = 2.0,
    exceptions: tuple[Type[Exception], ...] = (Exception,)
):
    """Decorator for async retry with exponential backoff."""
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            last_exception = None
            current_delay = delay

            for attempt in range(max_retries):
                try:
                    return await func(*args, **kwargs)
                except exceptions as e:
                    last_exception = e
                    if attempt < max_retries - 1:
                        await asyncio.sleep(current_delay)
                        current_delay *= backoff

            raise last_exception

        return wrapper
    return decorator

# Usage
@retry_async(max_retries=3, delay=1.0, exceptions=(httpx.RequestError,))
async def fetch_external_api(url: str) -> dict:
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        response.raise_for_status()
        return response.json()
```

### Timeout Pattern

```python
import asyncio
from functools import wraps

def timeout_async(seconds: float):
    """Decorator for async timeout."""
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            try:
                return await asyncio.wait_for(
                    func(*args, **kwargs),
                    timeout=seconds
                )
            except asyncio.TimeoutError:
                raise TimeoutError(f"{func.__name__} timed out after {seconds}s")
        return wrapper
    return decorator

# Usage
@timeout_async(30.0)
async def slow_operation():
    await asyncio.sleep(60)  # Will raise TimeoutError
```

---

## 22. Embedding and Vector Search

### Embedding Service

```python
from typing import Protocol
from abc import abstractmethod
import numpy as np

class EmbeddingProvider(Protocol):
    """Protocol for embedding providers."""

    @abstractmethod
    async def embed(self, text: str) -> list[float]:
        """Generate embedding for text."""
        ...

    @abstractmethod
    async def embed_batch(self, texts: list[str]) -> list[list[float]]:
        """Generate embeddings for multiple texts."""
        ...

class OpenAIEmbeddingProvider:
    """OpenAI embedding provider."""

    def __init__(self, api_key: str, model: str = "text-embedding-3-small"):
        self.api_key = api_key
        self.model = model

    async def embed(self, text: str) -> list[float]:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.openai.com/v1/embeddings",
                headers={"Authorization": f"Bearer {self.api_key}"},
                json={"input": text, "model": self.model}
            )
            return response.json()["data"][0]["embedding"]

    async def embed_batch(self, texts: list[str]) -> list[list[float]]:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                "https://api.openai.com/v1/embeddings",
                headers={"Authorization": f"Bearer {self.api_key}"},
                json={"input": texts, "model": self.model}
            )
            return [d["embedding"] for d in response.json()["data"]]

class EmbeddingService:
    """Service for managing embeddings."""

    def __init__(
        self,
        provider: EmbeddingProvider,
        cache: Optional[EmbeddingCache] = None
    ):
        self.provider = provider
        self.cache = cache

    async def get_embedding(self, text: str) -> list[float]:
        """Get embedding, using cache if available."""
        if self.cache:
            cached = await self.cache.get(text)
            if cached:
                return cached

        embedding = await self.provider.embed(text)

        if self.cache:
            await self.cache.set(text, embedding)

        return embedding

    async def similarity_search(
        self,
        query: str,
        collection: str,
        limit: int = 10,
        threshold: float = 0.7
    ) -> list[dict]:
        """Search for similar items."""
        query_embedding = await self.get_embedding(query)

        # Use pgvector for similarity search
        results = await db.fetch_all(f"""
            SELECT *, 1 - (embedding <=> $1::vector) as similarity
            FROM {collection}
            WHERE 1 - (embedding <=> $1::vector) > $2
            ORDER BY embedding <=> $1::vector
            LIMIT $3
        """, query_embedding, threshold, limit)

        return [dict(r) for r in results]
```

### Vector Store Integration

```python
class VectorStore:
    """Vector store for semantic search."""

    def __init__(self, adapter: SupabaseAdapter, embedding_service: EmbeddingService):
        self.adapter = adapter
        self.embedding_service = embedding_service

    async def add_document(
        self,
        collection: str,
        document: dict,
        text_field: str = "content"
    ) -> dict:
        """Add document with embedding."""
        text = document.get(text_field, "")
        embedding = await self.embedding_service.get_embedding(text)

        document["embedding"] = embedding
        return await self.adapter.create(collection, document)

    async def add_documents(
        self,
        collection: str,
        documents: list[dict],
        text_field: str = "content"
    ) -> list[dict]:
        """Add multiple documents with embeddings."""
        texts = [d.get(text_field, "") for d in documents]
        embeddings = await self.embedding_service.provider.embed_batch(texts)

        for doc, emb in zip(documents, embeddings):
            doc["embedding"] = emb

        results = []
        for doc in documents:
            result = await self.adapter.create(collection, doc)
            results.append(result)
        return results

    async def search(
        self,
        collection: str,
        query: str,
        limit: int = 10,
        filters: dict = None
    ) -> list[dict]:
        """Semantic search."""
        query_embedding = await self.embedding_service.get_embedding(query)

        sql = f"""
            SELECT *, 1 - (embedding <=> $1::vector) as similarity
            FROM {collection}
            WHERE deleted_at IS NULL
        """

        params = [query_embedding]

        if filters:
            for i, (key, value) in enumerate(filters.items(), start=2):
                sql += f" AND {key} = ${i}"
                params.append(value)

        sql += f" ORDER BY embedding <=> $1::vector LIMIT ${len(params) + 1}"
        params.append(limit)

        results = await self.adapter.client.rpc("vector_search", {
            "query_embedding": query_embedding,
            "match_count": limit
        }).execute()

        return results.data

    async def hybrid_search(
        self,
        collection: str,
        query: str,
        limit: int = 10,
        keyword_weight: float = 0.3,
        semantic_weight: float = 0.7
    ) -> list[dict]:
        """Hybrid search combining keyword and semantic."""
        # Semantic search
        semantic_results = await self.search(collection, query, limit * 2)

        # Full-text search
        keyword_results = await self.adapter.client.table(collection).select("*").textSearch(
            "content",
            query,
            type="websearch"
        ).limit(limit * 2).execute()

        # Combine and re-rank
        combined = self._combine_results(
            semantic_results,
            keyword_results.data,
            keyword_weight,
            semantic_weight
        )

        return combined[:limit]

    def _combine_results(
        self,
        semantic: list[dict],
        keyword: list[dict],
        kw_weight: float,
        sem_weight: float
    ) -> list[dict]:
        """Combine and rank results."""
        scores = {}

        for i, r in enumerate(semantic):
            scores[r["id"]] = {"doc": r, "score": sem_weight * (1 - i / len(semantic))}

        for i, r in enumerate(keyword):
            if r["id"] in scores:
                scores[r["id"]]["score"] += kw_weight * (1 - i / len(keyword))
            else:
                scores[r["id"]] = {"doc": r, "score": kw_weight * (1 - i / len(keyword))}

        ranked = sorted(scores.values(), key=lambda x: x["score"], reverse=True)
        return [r["doc"] for r in ranked]
```

---

## 23. Workflow Orchestration

### Workflow Definition

```python
from dataclasses import dataclass
from typing import Callable, Awaitable, Any, Optional
from enum import Enum

class StepStatus(str, Enum):
    PENDING = "pending"
    RUNNING = "running"
    COMPLETED = "completed"
    FAILED = "failed"
    SKIPPED = "skipped"

@dataclass
class WorkflowStep:
    """Single step in a workflow."""
    name: str
    handler: Callable[..., Awaitable[Any]]
    depends_on: list[str] = None
    retry_count: int = 3
    timeout: float = 300.0
    condition: Optional[Callable[[dict], bool]] = None

@dataclass
class WorkflowResult:
    """Result of workflow execution."""
    success: bool
    steps: dict[str, StepStatus]
    outputs: dict[str, Any]
    errors: dict[str, str]
    duration: float

class Workflow:
    """Workflow orchestrator."""

    def __init__(self, name: str):
        self.name = name
        self.steps: dict[str, WorkflowStep] = {}

    def step(
        self,
        name: str,
        depends_on: list[str] = None,
        retry_count: int = 3,
        timeout: float = 300.0,
        condition: Optional[Callable[[dict], bool]] = None
    ):
        """Decorator to register workflow step."""
        def decorator(func: Callable[..., Awaitable[Any]]):
            self.steps[name] = WorkflowStep(
                name=name,
                handler=func,
                depends_on=depends_on or [],
                retry_count=retry_count,
                timeout=timeout,
                condition=condition
            )
            return func
        return decorator

    async def execute(self, context: dict = None) -> WorkflowResult:
        """Execute the workflow."""
        import time
        start_time = time.time()

        context = context or {}
        statuses: dict[str, StepStatus] = {name: StepStatus.PENDING for name in self.steps}
        outputs: dict[str, Any] = {}
        errors: dict[str, str] = {}

        # Topological sort for execution order
        execution_order = self._get_execution_order()

        for step_name in execution_order:
            step = self.steps[step_name]

            # Check dependencies
            deps_completed = all(
                statuses[dep] == StepStatus.COMPLETED
                for dep in step.depends_on
            )
            if not deps_completed:
                statuses[step_name] = StepStatus.SKIPPED
                continue

            # Check condition
            if step.condition and not step.condition(context):
                statuses[step_name] = StepStatus.SKIPPED
                continue

            # Execute step
            statuses[step_name] = StepStatus.RUNNING
            try:
                result = await asyncio.wait_for(
                    self._execute_with_retry(step, context, outputs),
                    timeout=step.timeout
                )
                outputs[step_name] = result
                statuses[step_name] = StepStatus.COMPLETED
            except Exception as e:
                errors[step_name] = str(e)
                statuses[step_name] = StepStatus.FAILED

        duration = time.time() - start_time
        success = all(s in (StepStatus.COMPLETED, StepStatus.SKIPPED) for s in statuses.values())

        return WorkflowResult(
            success=success,
            steps=statuses,
            outputs=outputs,
            errors=errors,
            duration=duration
        )

    async def _execute_with_retry(
        self,
        step: WorkflowStep,
        context: dict,
        outputs: dict
    ) -> Any:
        """Execute step with retries."""
        last_error = None
        for attempt in range(step.retry_count):
            try:
                return await step.handler(context=context, outputs=outputs)
            except Exception as e:
                last_error = e
                if attempt < step.retry_count - 1:
                    await asyncio.sleep(2 ** attempt)
        raise last_error

    def _get_execution_order(self) -> list[str]:
        """Get topological order of steps."""
        visited = set()
        order = []

        def visit(name: str):
            if name in visited:
                return
            visited.add(name)
            for dep in self.steps[name].depends_on:
                visit(dep)
            order.append(name)

        for name in self.steps:
            visit(name)

        return order

# Usage
workflow = Workflow("data_processing")

@workflow.step("fetch_data")
async def fetch_data(context: dict, outputs: dict) -> dict:
    """Fetch data from source."""
    return await fetch_from_api(context["source_url"])

@workflow.step("transform_data", depends_on=["fetch_data"])
async def transform_data(context: dict, outputs: dict) -> dict:
    """Transform fetched data."""
    data = outputs["fetch_data"]
    return transform(data)

@workflow.step("store_data", depends_on=["transform_data"])
async def store_data(context: dict, outputs: dict) -> dict:
    """Store transformed data."""
    data = outputs["transform_data"]
    return await store_in_db(data)

# Execute
result = await workflow.execute({"source_url": "https://api.example.com/data"})
```

---

## 24. References

- See `CLAUDE.md` for Claude-specific guide
- See `WARP.md` for Warp Terminal integration
- See `docs/` for detailed guides
- See `docs/architecture/` for architecture documentation
- See `docs/sessions/` for session work

---

This guide should be updated as the project evolves and new patterns are established.
