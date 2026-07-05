# Phase 3 Cutover Runbook (W15-W16)

## Goal

Flip the production OmniRoute dashboard from Next.js to Svelte 5 + SvelteKit 2 + Hono 4 BFF + Tauri 2 native shell, behind a per-route feature flag, with 1-2w soak and zero-downtime rollback.

## Pre-cutover checklist (W14)

- [ ] All 47 dashboard subroutes shipped in Svelte 5 (audit shows 27+ shipped; remaining 20+ are sub-detail/edit variants)
- [ ] CI green: `pnpm typecheck`, `pnpm lint` (oxlint), `pnpm test:unit`, `pnpm test:e2e`, `pnpm build`, `cargo check`, `cargo clippy -- -D warnings`, `playwright test`, `axe-core test`
- [ ] Staging perf: Lighthouse score > 90 on /, /dashboard, /login
- [ ] Bundle budget enforced in CI (size-limit OK)
- [ ] OpenAI-compatible `/v1/*` regression test green against staging
- [ ] Webhook + audit log entries recorded during staging soak
- [ ] Code signing certs ready (macOS Developer ID + Windows EV)
- [ ] Cutover Slack channel set up; on-call rotated

## Cutover commands

### Day 1: 1% rollout

```bash
# In production env
export OMNI_WEB_STACK_ROLLOUT=1
export OMNI_WEB_STACK=svelte
# Watch error rate for 4h
```

If error rate < 0.5% and p95 latency < 600ms: continue.

### Day 2: 10% rollout

```bash
export OMNI_WEB_STACK_ROLLOUT=10
```

### Day 3-5: 50% rollout

```bash
export OMNI_WEB_STACK_ROLLOUT=50
```

### Day 6-7: 100% rollout

```bash
export OMNI_WEB_STACK_ROLLOUT=100
```

### Day 8+: cleanup

- Remove `electron/` from desktop builds (replaced by Tauri 2)
- Archive `desktop-electrobun/` to a frozen branch
- Remove Next.js dependency from monorepo root
- Update README and docs to reference Svelte stack
- Set `OMNI_WEB_STACK_ROLLOUT=100` as the default (no env override needed)

## Rollback

```bash
# Immediate rollback (< 1s) - all users to Next.js
export OMNI_WEB_STACK_ROLLOUT=0
# Or per-user via cookie:
# Set-Cookie: web_stack=next; Path=/
```

## Per-route force flag

Users can opt-in to the new dashboard early:

```
# Try the new dashboard
https://omniroute.online/dashboard?web=svelte

# Force back to Next.js (debugging)
https://omniroute.online/dashboard?web=next
```

These set a 1-year `web_stack` cookie. The flag affects both the SvelteKit server and the Hono BFF.

## SLOs

- p50 latency: < 150ms
- p95 latency: < 500ms (was 800ms on Next.js)
- p99 latency: < 1.5s
- Error rate: < 0.5%
- Bundle size: < 300KB gz main route, < 1.5s TTI on M2

## Risks + mitigations

| Risk | Mitigation |
|---|---|
| Routes we forgot to port | SvelteKit hooks.server.ts redirects to Next.js for 404s |
| Cookie edge cases (stale state) | 1-year expiry; users can manually flip via ?web= |
| Mobile (iOS/Android) regressions | Out of scope (deferred to v4.2); web PWA covers |
| Code signing delays | Ship unsigned for v4.0-beta, signed for v4.0-GA |
| OpenAI client compat | Same wire format; existing SDK clients keep working |
| Performance regression on slow networks | Lighthouse CI gates; size-limit budget |
| Tauri 2 Linux GTK webview quirks | Smoke test on Ubuntu-24.04 in CI matrix |

## Post-cutover monitoring (W16+)

- Watch Sentry / OTel for 1w post-cutover
- Track per-route error rate by `route = cookies.web_stack`
- Hold rollback ready for 2w minimum
