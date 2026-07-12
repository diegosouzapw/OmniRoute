# changelog.d/ — changelog fragments

**A PR never edits `CHANGELOG.md` directly during the cycle.** Instead it adds ONE new
file here — its changelog entry as a *fragment*. Two PRs never touch the same file, so
changelog merge conflicts (the "CHANGELOG-eat" cascade that forced a re-sync push + full
CI re-run after every sibling merge) are structurally impossible.

## Convention

| Directory      | Aggregates under        |
| -------------- | ----------------------- |
| `features/`    | `### ✨ New Features`   |
| `fixes/`       | `### 🐛 Bug Fixes`      |
| `maintenance/` | `### 📝 Maintenance`    |

- **Filename**: `<PR-number>-<short-slug>.md` (e.g. `fixes/6700-dockerfile-better-sqlite3.md`).
  The PR number prefix keeps aggregation order deterministic.
- **Content**: the exact bullet line(s) that should land in `CHANGELOG.md`, starting with
  `- `. Multi-line (continuation) bullets are fine. Keep the repo's credit format:
  `(#PR — thanks @user)`.
- One fragment per PR (rarely more, e.g. a PR that both fixes and adds).

## Example

`changelog.d/fixes/6496-cloudflare-relay-worker-syntax.md`:

```markdown
- **fix(providers):** Cloudflare relay Worker deploys use Service Worker syntax with `body_part` metadata ([#6496](https://github.com/diegosouzapw/OmniRoute/pull/6496)) — thanks @SeaXen
```

## Aggregation

The release captain (or `/generate-release`) folds all fragments into `CHANGELOG.md` and
deletes them:

```bash
node scripts/release/aggregate-changelog.mjs            # write + delete fragments
node scripts/release/aggregate-changelog.mjs --dry-run  # preview only
```

Fragment well-formedness is enforced by `npm run check:changelog-integrity` (the same
gate that guards against CHANGELOG-eat for legacy direct edits).
