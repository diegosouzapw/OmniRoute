# Runbook 05 — Combo DAG Cycle (COMBO_005)

**Severity**: SEV-3 (single bad combo update; doesn't affect production traffic unless the bad combo is on the hot path).
**Owner**: routing on-call (with the combo author if the update came from a customer).
**Last verified**: 2026-06-25.
**Related**: `src/shared/constants/errorCodes.ts` (COMBO_005); `src/lib/api/comboErrorResponse.ts`; `src/app/api/combos/[id]/route.ts`.

When a `POST /api/combos/{id}` or `PUT /api/combos/{id}` request returns
`400` with `error.code = "COMBO_005"`, OmniRoute's combo DAG validator
detected either:

1. **A cycle** in the combo reference graph (combo A references combo B,
   which references combo A). The validator walks the graph with a
   `Set` of visited nodes and trips on the first revisit.
2. **A depth overflow** — the chain of nested combo references exceeds
   `config.maxComboDepth` (the default in `clampComboDepth` is small,
   typically 4-6).

Both cases surface as `COMBO_005` with a `reason` field in the response
body: `"cycle-detected"` or `"max-depth-exceeded"`. The error code is
defined in `src/shared/constants/errorCodes.ts:172` and rendered by
`comboErrorResponse` in `src/lib/api/comboErrorResponse.ts:66`.

---

## 1. Detect

### 1.1 Alert payload

```
Alert:  ComboValidationFailure
Labels: { combo_id="...", reason="cycle-detected", code="COMBO_005" }
Value:  failures > 5/min for 10 consecutive minutes
```

### 1.2 Confirm via the failing request

```bash
# Re-run the failing update and capture the error response
curl -i -X PUT http://localhost:20128/api/combos/COMBO_ID \
  -H "Authorization: Bearer $MGMT_TOKEN" \
  -H "Content-Type: application/json" \
  -d @failing-update.json | head -30
```

Expect a body shaped like:

```json
{
  "error": {
    "code": "COMBO_005",
    "message": "Combo reference graph is invalid (cycle or excessive depth)",
    "category": "COMBO",
    "details": {
      "comboName": "always-on",
      "reason": "cycle-detected"
    },
    "requestId": "req_abc123"
  }
}
```

The `reason` field tells you whether it's a cycle or a depth issue. The
`requestId` correlates to the server log line where the raw `dagError`
is preserved (full internal combo names are NOT returned to the client,
see `src/app/api/combos/[id]/route.ts:219-228`).

### 1.3 Server-side log

```bash
grep -h "Combo DAG validation failed" /var/log/omniroute/*.log | tail -5
```

The full error (including internal combo names) is logged via
`console.warn` at `src/app/api/combos/[id]/route.ts:222`.

---

## 2. Classify

| Symptom | Cause | Go to |
|---|---|---|
| `reason: cycle-detected` | A references B references A (or longer cycle) | § 3 (break the cycle) |
| `reason: max-depth-exceeded` | Chain > `config.maxComboDepth` | § 4 (flatten the chain or raise the limit) |
| `reason: invalid-graph` (rare) | Self-reference, missing combo in chain, or duplicate edges | § 5 |

---

## 3. Mitigate (cycle)

### 3.1 Find the cycle

The cycle lives in the combo definition. To find it, dump all combos
and run a quick graph analysis. The validator lives in
`open-sse/services/combo/comboStructure.ts::validateComboDAG` (callable
directly):

```bash
node --import tsx -e "
  import('./open-sse/services/combo/comboStructure.ts').then(m => {
    const combos = JSON.parse(require('fs').readFileSync('/tmp/combos.json', 'utf8'));
    for (const c of combos) {
      try {
        m.validateComboDAG(c.name, combos, new Set(), 0, 6);
      } catch (e) {
        console.log('FAIL:', c.name, '->', e.message);
      }
    }
  });
"
```

The exception message includes the path that revisits, e.g.:

```
Combo reference cycle detected: always-on -> fast-fallback -> always-on
```

### 3.2 Break the cycle

Two options:

**Option A — remove the back-reference.** Open the combo whose update
included the offending edge and remove it.

```bash
# Find the offending combo's ID
curl -s http://localhost:20128/api/combos | jq '.[] | select(.name == "always-on")'

# Update it via the dashboard UI (recommended — JSON editing is error-prone)
# Or via API: PUT /api/combos/{id} with the cleaned combo definition
```

**Option B — disable the broken combo temporarily** (if the customer
needs the rest of the update to land immediately):

```bash
curl -X POST http://localhost:20128/api/combos/COMBO_ID/disable \
  -H "Authorization: Bearer $MGMT_TOKEN"
```

The combo will be excluded from routing. To re-enable, fix the cycle and
remove the disable flag.

---

## 4. Mitigate (depth)

If the chain is legitimately long (not a cycle) but exceeds the
configured `maxComboDepth`, you can either:

### 4.1 Flatten the chain

Combine intermediate combos into a single combo with multiple targets. A
target combo that just exists to "chain" can usually be inlined.

### 4.2 Raise the limit

`maxComboDepth` is read from `(nextComboState as { config?: { maxComboDepth?: unknown } }).config?.maxComboDepth` at `src/app/api/combos/[id]/route.ts:213`. To raise it:

```bash
# Via the settings DB
sqlite3 ~/.omniroute/storage.sqlite \
  "UPDATE settings SET value = '12' WHERE key = 'comboMaxDepth';"
```

The default cap is hard-coded in `clampComboDepth`. Verify:

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT value FROM settings WHERE key='comboMaxDepth';"
```

> **Caution**: depth > 12 makes the validator slow (O(n) per request). If
> you legitimately need deeper chains, profile first.

---

## 5. Investigate (invalid-graph)

The `"invalid-graph"` reason covers anything the cycle and depth checks
miss — typically:

- A combo references itself by ID (single-node self-loop, which the cycle check catches but logs differently).
- A referenced combo ID does not exist (typo in `parentComboId`).
- A duplicate edge in the `models` array.

```bash
# Pull the offending combo definition (server-side, with internal names)
grep -h "Combo DAG validation failed" /var/log/omniroute/*.log | tail -1
```

The full message after `"Combo DAG validation failed:"` includes the raw
exception. Compare against the combo definitions in
`GET /api/combos` to spot the bad edge.

---

## 6. After the fix

Once the cycle / depth issue is resolved:

1. Re-run the failing request — expect a `200` with the updated combo.
2. Verify the combo appears in the combo health dashboard:
   ```bash
   curl -s http://localhost:20128/api/monitoring/health | jq '.checks.combos'
   ```
3. If the broken combo was disabled in § 3.2, re-enable it:
   ```bash
   curl -X POST http://localhost:20128/api/combos/COMBO_ID/enable \
     -H "Authorization: Bearer $MGMT_TOKEN"
   ```

---

## 7. Prevent recurrence

- **Validator in CI**: add a unit test against `validateComboDAG` for
  every combo the dashboard ships. Pattern:
  `tests/unit/combo-strategy-fallbacks.test.ts` covers the
  strategy-validator path; add a sibling for the DAG validator.
- **Cycle-prevention in the UI**: when the dashboard combo editor adds a
  nested combo reference, run `validateComboDAG` client-side before
  allowing the save.
- **Lint check**: a `validateComboDAG` smoke-test can run as part of the
  release pipeline against the seed combos in `src/lib/seed-combos.ts`.

---

## 8. Smoke test (run quarterly)

```bash
# Confirm the validator still throws the right error code
node --import tsx -e "
  import('./open-sse/services/combo/comboStructure.ts').then(async m => {
    const v = await m.validateComboDAG;
    const combos = [
      { id: 'a', name: 'a', models: [{ combo: 'b' }] },
      { id: 'b', name: 'b', models: [{ combo: 'a' }] },
    ];
    try { v('a', combos, new Set(), 0, 6); }
    catch (e) { console.log('OK: cycle detected:', e.message); }
  });
"

# Confirm the route still returns COMBO_005
node --test tests/unit/api/combo-error-response.test.ts
```

---

## 9. References

- `src/shared/constants/errorCodes.ts` — `COMBO_005` definition (line 172)
- `src/lib/api/comboErrorResponse.ts` — `comboErrorResponse` (line 66)
- `src/app/api/combos/[id]/route.ts` — validator invocation (line 217), error mapping (line 229)
- `open-sse/services/combo/comboStructure.ts` — `validateComboDAG` implementation
- `open-sse/services/combo/comboData.ts` — combo persistence
- `open-sse/services/combo/validateQuality.ts` — sibling validator (strategy checks)
- `tests/unit/api/combo-error-response.test.ts` — error shape test
- `tests/unit/composite-tiers-validation.test.ts` — composite-tier sibling