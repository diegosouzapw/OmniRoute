---
title: "Removed Providers"
version: 3.8.51
lastUpdated: 2026-09-03
---

# Providers removed at their operator's request

Some services were integrated into OmniRoute and later removed because the people who run
them asked for it. This page is the durable record of those removals. Its only purpose is to
keep them from coming back by accident: a contributor who finds an old fork, a cached npm
tarball, an archived issue or a "restore provider X" request needs one place that says **do
not reintroduce**.

This page is **not** a list of dead or discontinued services. Those are tracked in
[`FREE_TIERS.md`](FREE_TIERS.md) ("Removed / no free tier") and can come back if the service
does. The entries below can only come back with written permission from the operator named in
the request, and that permission must be linked from the entry.

## Policy

1. **A takedown request from a service operator is honored, not negotiated.** OmniRoute is
   not affiliated with any upstream service. When the operator of a service asks for the
   integration to go, it goes, whether the integration used an official API or not.
2. **"Removed" means every surface OmniRoute controls.** Executor, registry entry, provider
   id and alias, model list, endpoints, environment variables, icon, dashboard cards, the
   generated provider reference, `FREE_TIERS.md`, the environment reference, README counts,
   `llm.txt` mirrors, dedicated tests and golden snapshots, code comments, CHANGELOG bullets
   (with a ledgered reconciliation, see `config/release/changelog-reconciliations.json`),
   GitHub Releases notes, the wiki, and the GitHub issues, discussions and pull requests whose
   subject was that provider (issues and discussions deleted; pull requests retitled, their
   description replaced and the thread locked, because GitHub cannot delete pull requests).
3. **Never reintroduce an entry on this page without written permission.** That includes
   adding the id or alias back to any provider catalog, adding the domains to an executor,
   accepting a contributor PR that "restores" it, adding it to the free-model catalog, or
   documenting a manual way to reach it through OmniRoute. Close such PRs and issues with a
   link to this page.
4. **Keep the entry minimal.** Record only what a reviewer needs to recognize a
   reintroduction: identifiers, domains, dates and the pull request that did the removal.
   Do not describe how the integration worked.
5. **The regression guard is `tests/unit/removed-providers-blocklist.test.ts`.** It fails when
   any identifier or domain below shows up again in the provider catalogs, the executor map or
   the provider registry sources. Add the new identifiers to that test in the same PR that
   adds a row here.

## Register

| Removed on | Provider id | Alias  | Domains                                 | Requested by                         | Removal PR                                                     | Notes                                                                                                         |
| ---------- | ----------- | ------ | --------------------------------------- | ------------------------------------ | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| 2026-08-12 | `puter`     | `pu`   | `puter.com`                             | Puter's owner (Nariman Jelveh)       | [#10210](https://github.com/diegosouzapw/OmniRoute/pull/10210) | API-key provider. Migration `152_remove_puter_provider.sql` cleans stored config.                             |
| 2026-09-02 | `theoldllm` | `tllm` | `theoldllm.com`, `theoldllm.vercel.app` | The service operator (support email) | [#12440](https://github.com/diegosouzapw/OmniRoute/pull/12440) | Keyless provider. Written request received 2026-08-30. Dedicated issues and discussion deleted, PRs retitled. |

## Adding an entry

When a new takedown request arrives:

1. Confirm the request comes from the operator of the service (their support address or a
   domain they control), and keep the message privately.
2. Remove the integration following the checklist in policy item 2. Use
   [#12440](https://github.com/diegosouzapw/OmniRoute/pull/12440) as the reference for a
   keyless provider and [#10210](https://github.com/diegosouzapw/OmniRoute/pull/10210) for an
   API-key provider with stored connections (add a migration).
3. Add one row to the table above and the identifiers to
   `tests/unit/removed-providers-blocklist.test.ts`, in the same PR.
4. Reply to the operator once the PR is merged, listing what was removed and what OmniRoute
   cannot change (already-published npm and Docker versions, git history, third-party forks).
