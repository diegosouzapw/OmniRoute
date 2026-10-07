# #7778 hierarchical admission cleanup plan

1. Lock the existing single-key semaphore contract and the new atomic multi-key
   contract with focused tests: no partial reservations, FIFO queueing, abort,
   timeout, queue-full, idempotent release, stats, and cleanup.
2. Generalize the existing account semaphore in place. Keep `acquire()` as a
   compatibility wrapper around `acquireMany()`; do not add a second scheduler
   or a dependency.
3. Replace the account-only acquisition in `chatCore` with one cumulative
   global/provider/account acquisition immediately before `withRateLimit`.
   Reacquire the whole set whenever account rotation changes the connection,
   and retain the release through streaming completion.
4. Extend the existing resilience settings pipeline (types, defaults,
   normalization, schema, API response, UI, and translations) with the global
   and provider caps. Relabel the old Bottleneck concurrency control as
   connection/quota-scope concurrency so its real scope is explicit.
5. Run focused tests, lint, typecheck, static checks, and the full test suite;
   document the behavioral change in the changelog.

Behavior intentionally preserved: zero/null concurrency bypasses a gate,
account-only callers keep using `acquire()`, blocked-account controls retain
their key format and API, and provider rate-limit queue behavior remains
unchanged.
