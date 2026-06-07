# Submitting a Pull Request

Step-by-step for contributors who already have a fork and a working fix.

---

## 1 — Set up your fork

```bash
# Clone your fork
git clone https://github.com/<your-username>/OmniRoute.git
cd OmniRoute

# Add the upstream repo so you can sync
git remote add upstream https://github.com/diegosouzapw/OmniRoute.git

# Install dependencies (.env is auto-created from .env.example)
npm install
```

---

## 2 — Sync with the current release branch

PRs go to **`release/v3.8.3`**, not `main`.

```bash
git fetch upstream
git checkout -b fix/your-description upstream/release/v3.8.3
```

If you already made your changes on another branch, rebase on top of it:

```bash
git fetch upstream
git rebase upstream/release/v3.8.3
```

---

## 3 — Branch naming

| Prefix      | Use for                                 |
| ----------- | --------------------------------------- |
| `feat/`     | new feature                             |
| `fix/`      | bug fix                                 |
| `refactor/` | code restructuring (no behavior change) |
| `docs/`     | documentation only                      |
| `test/`     | tests only                              |
| `chore/`    | tooling, deps, CI                       |

Examples: `fix/codex-token-refresh`, `feat/provider-xyz`, `docs/update-readme`

---

## 4 — Validate before committing

```bash
npm run lint          # must pass (0 errors)
npm run typecheck:core  # must pass
npm run test:unit     # must pass
npm run test:coverage # coverage gate: 75/75/75/70
```

If you changed production code in `src/`, `open-sse/`, `electron/`, or `bin/`, include or update tests in the same PR.

---

## 5 — Commit

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(dashboard): add provider search filter
fix(combo): resolve pending request leak on timeout
docs(readme): update installation steps
test(auth): add JWT expiry edge case
```

Common scopes: `api`, `dashboard`, `db`, `sse`, `oauth`, `providers`, `combo`, `mcp`, `cli`, `i18n`

---

## 6 — Push and open the PR

```bash
git push -u origin fix/your-description
```

Then open a PR on GitHub targeting **`diegosouzapw/OmniRoute`** → **`release/v3.8.3`**.

PR description checklist:

- [ ] What the change does (1–3 bullets)
- [ ] How to test it
- [ ] Test files added or updated (if production code changed)

---

## 7 — After opening the PR

- CI runs lint + typecheck + tests automatically.
- Address review comments with new commits (do not force-push after review starts).
- If the base branch advances, sync with:

```bash
git fetch upstream
git rebase upstream/release/v3.8.3
git push --force-with-lease
```

---

## Quick reference

```bash
# Full validation in one command
npm run lint && npm run typecheck:core && npm run test:coverage

# Run a single test file
node --import tsx/esm --test tests/unit/your-file.test.ts

# Start dev server
npm run dev   # http://localhost:20128
```

For the full contributor guide see [CONTRIBUTING.md](../CONTRIBUTING.md).
