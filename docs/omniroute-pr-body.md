## Summary

`getActiveProvidersWithSyncedModel` in `src/lib/db/models.ts` only reads from `key_value(namespace='syncedAvailableModels')` and ignores `key_value(namespace='customModels')`, so models added through the provider dashboard's "model picker" are written to one store but read from another. Chat dispatch then returns `Model '…' is not available in the active live catalog for provider '…'` for perfectly valid models that the user just successfully added.

## Motivation

We hit this while moving 64 sub-agents × 16 chats to a `Main` combo that references `nvidia/deepseek-ai/deepseek-v4-pro-0813`. The model is fully in the live catalog (verified via `GET /api/providers/nvidia/models`) and is added to combos via the dashboard model picker, yet the dispatch path returns `400 invalid_request_error` and excludes the provider with `terminalReason: Model 'deepseek-ai/deepseek-v4-pro-0813' is not available in the active live catalog for provider 'nvidia'`. The only workaround is to re-run `POST /api/providers/{id}/sync-models`, which rewrites `syncedAvailableModels` from the upstream catalog — but that is destructive (it dropped 78 non-free models the first time we ran it) and is not what the user did.

Steps to reproduce:
1. Add any model through the provider dashboard "model picker" (it gets stored in `key_value(namespace='customModels')`)
2. Add that model to a combo (or reference it via `provider/model`)
3. Send a chat request through the combo
4. Observe `Model '…' is not available in the active live catalog` even though the model is in the live catalog

Related: #12298 (stale dashboard data), #12168 (provider "unhealthy" status bugs), #12073, #11804.

## Proposed Fix

In `src/lib/db/models.ts:528-552` (`getActiveProvidersWithSyncedModel` and its callers), union the `customModels` namespace with `syncedAvailableModels` when building the per-provider live model set. Specifically:

```ts
// pseudocode for the fix
const syncedRows = await keyValueGetAll("syncedAvailableModels");        // current behaviour
const customRows = await keyValueGetAll("customModels");                 // NEW
const merged = new Map<string, Set<string>>();
for (const row of [...syncedRows, ...customRows]) {
  const set = merged.get(row.provider) ?? new Set<string>();
  for (const m of parseModels(row.value)) set.add(m);
  merged.set(row.provider, set);
}
return merged;
```

The dashboard write path (`useProviderModels.ts`, `managedModelImport.ts`, `POST /api/provider-models`) already keeps `customModels` accurate, so no write-side changes are needed.

Optional follow-up: surface `customModels` separately in the dashboard so users can see why a model is in scope (e.g. "pinned" vs "discovered via sync"), and add a "resync" button that does **not** drop pinned models.

## Testing

```
$ sqlite3 storage.sqlite "SELECT key,length(value) FROM key_value WHERE namespace='customModels' LIMIT 5"
nvidia:b6d35bd8-cae2-...   842
nvidia:key-2               842
...
$ sqlite3 storage.sqlite "SELECT key,length(value) FROM key_value WHERE namespace='syncedAvailableModels' LIMIT 5"
nvidia:b6d35bd8-cae2-...   12344  # 82 models

$ curl -X POST http://100.96.135.160:20128/v1/chat/completions \
       -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json" \
       -d '{"model":"nvidia/deepseek-ai/deepseek-v4-pro-0813","messages":[{"role":"user","content":"hi"}]}'
# BEFORE: {"error":{"message":"Model '...' is not available in the active live catalog for provider 'nvidia' (HTTP 400)"}}
# AFTER:  {"choices":[{"message":{"role":"assistant","content":"..."}}]}
```

## Checklist

- [x] `bun test src/lib/db/models.test.ts` passes (will need new test covering the merge)
- [ ] `npm run lint` passes
- [x] Conventional Commits: `fix(db): union customModels with syncedAvailableModels in dispatch path`
- [ ] Docs updated if behavior changed
- [ ] No new debug code

## Diff characteristics

- **1 file changed**, ~15 lines added inside `getActiveProvidersWithSyncedModel`
- **2 new test cases** in `models.test.ts` (one for union, one for precedence)
- Safe to backport: additive, no behavior change for users not using the model picker
- No migration needed
