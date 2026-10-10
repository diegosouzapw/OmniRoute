---
title: "Release Strategy — LTS rail, channels and labels"
lastUpdated: 2026-10-09
---

# Release Strategy: LTS rail, channels and labels

> **Status: dormant.** Everything on this page describes the branch/channel model that
> starts with **v3.9.0 LTS**. Until then the day-to-day model is unchanged: PRs target the
> active `release/vX.Y.Z` branch, as described in [BRANCHING_MODEL.md](./BRANCHING_MODEL.md).
> The labels and PR templates below exist now so the switch is a configuration flip, not a
> scramble. The version-by-version plan lives in the [ROADMAP](../../ROADMAP.md).

## The rail

```
3.8.50 ─ 3.8.54   PREPARE   non-breaking structural prep (all PRs welcome)
3.8.55 ─ 3.8.59   VALIDATE  fixes / docs / i18n / providers only; features get `v4-feature`
3.9.0             LTS       creates stable/v3 · develop · main (v4)
4.0.0-nightly/rc  v4        modular platform, built on develop, candidates on main
4.0.0             GA        npm `latest` switches to v4 · v3 stays supported as LTS
```

There is no 3.8.60: after 3.8.59 the next version is 3.9.0.

## Branches (from 3.9.0)

| Branch      | Line            | What lands there                                                                           | Publishes                        |
| ----------- | --------------- | ------------------------------------------------------------------------------------------ | -------------------------------- |
| `stable/v3` | v3 LTS (3.9.x)  | Bug fixes, security patches, provider updates, docs, i18n. No new features.                | `latest` until 4.0 GA            |
| `develop`   | v4 development  | New features (including held `v4-feature` PRs), the modular refactor, forward-ported fixes | `nightly`                        |
| `main`      | v4 release line | v4 release candidates, then 4.0 GA                                                         | `next` (rc), then `latest` at GA |

Until 3.9.0 ships, none of these three branches carries the new meaning: `main` is still the
published v3 line and `release/vX.Y.Z` is still the integration branch.

## Where should my PR go?

| You are sending…   | Until 3.8.54            | 3.8.55 → 3.8.59                  | After 3.9.0 |
| ------------------ | ----------------------- | -------------------------------- | ----------- |
| Bug fix / security | active `release/v3.8.x` | same                             | `stable/v3` |
| Provider update    | active `release/v3.8.x` | same                             | `stable/v3` |
| Docs / i18n        | active `release/v3.8.x` | same                             | `stable/v3` |
| New feature        | active `release/v3.8.x` | held with the `v4-feature` label | `develop`   |

The "active" release branch is the highest open `release/v*` branch. If a
[release freeze](./BRANCHING_MODEL.md#release-freeze-parallel-cycles) is open, that is the
branch announced in the freeze issue.

## npm dist-tags

| Dist-tag  | Meaning                                                | Install                         |
| --------- | ------------------------------------------------------ | ------------------------------- |
| `latest`  | v3 (3.8.x, then 3.9.x LTS) — **until 4.0 GA**, then v4 | `npm install omniroute`         |
| `next`    | v4 release candidates (`4.0.0-rc.N`)                   | `npm install omniroute@next`    |
| `nightly` | v4 builds from `develop` (`4.0.0-nightly.*`)           | `npm install omniroute@nightly` |

`npm install omniroute` keeps installing v3 for the whole v4 cycle. Only 4.0 GA moves
`latest`.

What is wired today, in `.github/workflows/npm-publish.yml`: the `tag` input accepts
`auto`, `latest`, `next` and `historic`. With `auto`, a version carrying an `-rc`, `-alpha`,
`-beta`, `-pre` or `-next` identifier goes to `next`; a stable version goes to `latest` only
when it is the highest stable `v*` tag, otherwise to `historic` (so an old line never steals
`latest`).

Not wired yet (planned before the first v4 publish, rehearsed in 3.8.58):

- A `nightly` dist-tag. `-nightly` is not in the `auto` pre-release list today, so a
  `4.0.0-nightly.*` build must not go through `auto` until the workflow learns it.
- A dedicated dist-tag for 3.9.x patches published **after** 4.0 GA (by then they are no
  longer the highest stable tag, so `auto` would resolve them to `historic`).

## Forward-port with credit

Fixes land on the oldest supported line first and move forward:

1. The fix merges into `stable/v3`.
2. It is cherry-picked onto `develop` in a forward-port PR labeled `forward-port`.
3. The forward-port keeps the original author's credit with a standard
   `Co-authored-by: Name <email>` trailer for every human author of the original change.
   Crediting human contributors is required; crediting an AI assistant or bot is forbidden
   (`AGENTS.md`, Hard Rule #16).
4. If the code moved during the v4 refactor and the cherry-pick does not apply, the
   forward-port is rewritten by hand — the credit trailer still goes on it.

The forward-port is meant to be automated from 3.9.0 on; the 3.8.58 dry-run rehearses it.
Until then there is nothing to forward-port, because there is only one line.

## The validation window (3.8.55 → 3.8.59)

These five versions stabilize the code that becomes the LTS line. Fixes, docs, i18n and
provider updates keep flowing; new features wait.

| Version | Focus                                                                                 |
| ------- | ------------------------------------------------------------------------------------- |
| 3.8.55  | Characterization tests for every extraction candidate · coupling re-measurement       |
| 3.8.56  | Extended canary · performance baselines (heap, TTFB, build)                           |
| 3.8.57  | Security & compliance sweep · publish provenance (OIDC) rehearsal                     |
| 3.8.58  | Full dry-run of the 3.9.0 cut: branches, channels, forward-port, PR preview artifacts |
| 3.8.59  | Final freeze · full-suite audit · GO/NO-GO for 3.9.0                                  |

## The `v4-feature` rule

From **3.8.55** on, a third-party PR that adds a feature (rather than fixing a bug, updating
a provider, or changing docs/i18n):

1. Gets the `v4-feature` label. It is **not closed** — the contribution is kept.
2. Stays open, without merging into the v3 release branch.
3. Is re-targeted to `develop` when the v4 channel opens at 3.9.0, then reviewed and merged
   there with the author's credit intact.

Maintainers apply and move it with:

```bash
gh pr edit <N> --add-label v4-feature
# when develop exists:
gh pr edit <N> --base develop
gh pr view <N> --json baseRefName   # verify: `gh pr edit --base` can fail silently
```

Not sure whether your change is a fix or a feature? Open it anyway and say so in the PR
body; a maintainer decides the label.

## Labels

The rail labels are declared in `.github/labels.yml` and synced to GitHub by
`scripts/release/sync-labels.mjs`:

| Label              | Use                                                                       |
| ------------------ | ------------------------------------------------------------------------- |
| `v4-feature`       | Feature PR held for the v4 channel (`develop`)                            |
| `lts`              | Change that belongs to the v3 LTS line (`stable/v3`)                      |
| `forward-port`     | Fix forward-ported from `stable/v3` to `develop`, with credit             |
| `channel:latest`   | Ships on the npm `latest` dist-tag                                        |
| `channel:next`     | Ships on the npm `next` dist-tag                                          |
| `channel:nightly`  | Ships on the npm `nightly` dist-tag                                       |
| `preview-artifact` | Requests a PR preview build artifact (dormant until the 3.8.58 rehearsal) |

```bash
npm run labels:sync              # dry-run: print what would change
npm run labels:sync -- --apply   # create missing labels, update divergent ones
```

The sync never deletes a label and never touches labels that are not in `labels.yml`.
Operational labels such as `queue`, `release-freeze` and `base-red` keep their existing
meaning and are deliberately left out of the file.

## PR templates

The default template is `.github/pull_request_template.md`. Two focused templates live in
`.github/PULL_REQUEST_TEMPLATE/` and are selected with a query parameter on the
compare URL:

- Feature: `…/compare/<base>...<branch>?template=feature.md`
- Bug fix: `…/compare/<base>...<branch>?template=bugfix.md` — requires a failing-then-passing
  test or a recorded VPS validation (`AGENTS.md`, Hard Rule #18).

## Related docs

- [BRANCHING_MODEL.md](./BRANCHING_MODEL.md) — the current parallel-cycle model
- [CONTRIBUTION_GOLDEN_PATH.md](./CONTRIBUTION_GOLDEN_PATH.md) — focused checks per change type
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — pre-ship validation
- [MERGE_TRAIN.md](./MERGE_TRAIN.md) — merge queue and fallback train
- [ROADMAP](../../ROADMAP.md) — the 3.8.50 → 4.0 plan
