# Feature Proposal: Batch Delete Provider Accounts

## Summary

Add **batch delete** functionality for provider accounts (connections) in the provider detail page (`/dashboard/providers/[id]`). Users select multiple accounts via checkboxes and delete them in a single action, replacing the current one-by-one delete workflow.

## Problem Statement

Users managing multiple provider accounts (e.g., 20+ API keys or OAuth connections) have to delete accounts individually. Each deletion requires:

1. Finding the account
2. Clicking the delete button
3. Confirming via browser `confirm()` dialog
4. Waiting for the API call
5. Repeating for every account

This is:
- **Time-consuming**: O(n) confirm dialogs and API calls for n accounts
- **Error-prone**: Easy to accidentally click the wrong account
- **Tedious**: No way to quickly clean up stale or duplicate accounts

## Solution

Add a checkbox-based selection UI to the provider connections list:

```
┌────────────────────────────────────────────────────────────────┐
│  [x] Account #1 (kiro-prod)         [Delete Selected (3)]     │
│  [x] Account #2 (kiro-staging)                                │
│  [ ] Account #3 (kiro-backup)                                  │
└────────────────────────────────────────────────────────────────┘
```

## Detailed PR Specification

### Files to Modify

| File | Change |
|------|--------|
| `src/app/(dashboard)/dashboard/providers/[id]/page.tsx` | Add batch delete state, select-all + per-row checkboxes, batch delete handler |
| `src/app/api/providers/route.ts` | Add `DELETE /api/providers` with `POST` body `ids: string[]` for batch delete |
| `src/lib/db/providers.ts` | Add `deleteProviderConnections(ids: string[])` batch DB function |
| `src/i18n/messages/en.json` | Add i18n keys: `batchDeleteSelected`, `batchDeleteConfirm`, `batchDeleteSuccess` |
| `src/i18n/messages/*.json` | Add i18n keys to all locale files |
| `tests/unit/db-providers-crud.test.ts` | Add unit tests for batch delete DB function |
| `tests/integration/api-routes-critical.test.ts` | Add integration test for batch delete API endpoint |

### 1. DB Layer (`src/lib/db/providers.ts`)

```typescript
export async function deleteProviderConnections(ids: string[]): Promise<number> {
  const db = getDbInstance() as unknown as DbLike;
  if (ids.length === 0) return 0;

  // Delete quota snapshots for each connection first
  const deleteSnapshots = db.prepare("DELETE FROM quota_snapshots WHERE connection_id = ?");
  for (const id of ids) {
    deleteSnapshots.run(id);
  }

  // Batch delete connections
  const placeholders = ids.map(() => "?").join(",");
  const result = db.prepare(
    `DELETE FROM provider_connections WHERE id IN (${placeholders})`
  ).run(...ids);

  backupDbFile("pre-write");
  invalidateDbCache("connections");
  return result.changes ?? 0;
}
```

### 2. API Route (`src/app/api/providers/route.ts`)

Add a new route handler for batch delete. The existing `/api/providers/[id]` only handles single-id operations. The main providers route file (`/api/providers/route.ts`) should be extended:

```typescript
// DELETE /api/providers — Batch delete connections
// Body: { ids: string[] }
export async function DELETE(request: Request) {
  const authError = await requireManagementAuth(request);
  if (authError) return authError;

  let body: { ids?: string[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!Array.isArray(body.ids) || body.ids.length === 0) {
    return NextResponse.json(
      { error: "ids must be a non-empty array of connection IDs" },
      { status: 400 }
    );
  }

  if (body.ids.length > 100) {
    return NextResponse.json(
      { error: "Cannot delete more than 100 connections at once" },
      { status: 400 }
    );
  }

  try {
    const deleted = await deleteProviderConnections(body.ids);
    await syncToCloudIfEnabled();

    logAuditEvent({
      action: "provider.credentials.batch_revoked",
      actor: "admin",
      resourceType: "provider_credentials",
      status: "success",
      metadata: { count: deleted, ids: body.ids },
    });

    return NextResponse.json({ message: `Deleted ${deleted} connection(s)`, deleted });
  } catch (error) {
    console.log("Error batch deleting connections:", error);
    return NextResponse.json({ error: "Failed to batch delete connections" }, { status: 500 });
  }
}
```

### 3. UI Layer (`src/app/(dashboard)/dashboard/providers/[id]/page.tsx`)

#### New State Variables

```typescript
// Batch selection state
const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
const [batchDeleting, setBatchDeleting] = useState(false);
```

#### New Functions

```typescript
const handleToggleSelectAll = useCallback(() => {
  setSelectedIds((prev) =>
    prev.size === connections.length ? new Set() : new Set(connections.map((c) => c.id))
  );
}, [connections]);

const handleToggleSelectOne = useCallback((id: string) => {
  setSelectedIds((prev) => {
    const next = new Set(prev);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    return next;
  });
}, []);

const handleBatchDelete = async () => {
  if (selectedIds.size === 0) return;
  if (!confirm(t("batchDeleteConfirm", { count: selectedIds.size }))) return;

  setBatchDeleting(true);
  try {
    const res = await fetch("/api/providers", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: Array.from(selectedIds) }),
    });

    if (res.ok) {
      setSelectedIds(new Set());
      await fetchConnections();
      notify.success(t("batchDeleteSuccess", { count: selectedIds.size }));
    } else {
      const data = await res.json();
      notify.error(data.error || "Batch delete failed");
    }
  } catch (error) {
    notify.error("Network error during batch delete");
  } finally {
    setBatchDeleting(false);
  }
};
```

#### Per-Row Checkbox (inside `ConnectionRow`)

Add a checkbox as the first element of each row:

```tsx
// In ConnectionRow interface, add:
interface ConnectionRowProps {
  isSelected?: boolean;
  onToggleSelect?: () => void;
  // ... existing props
}

// In ConnectionRow render, before priority arrows:
<div className="flex items-center gap-3 flex-1 min-w-0">
  <input
    type="checkbox"
    checked={isSelected}
    onChange={onToggleSelect}
    className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30 cursor-pointer"
  />
  {/* Priority arrows */}
  ...
```

#### Header Row (above connections list)

```tsx
<div className="flex items-center justify-between px-3 py-2 bg-muted/50 rounded-t-lg border border-b-0 border-border">
  <label className="flex items-center gap-2 cursor-pointer select-none">
    <input
      type="checkbox"
      checked={selectedIds.size === connections.length && connections.length > 0}
      ref={(el) => { if (el) el.indeterminate = selectedIds.size > 0 && selectedIds.size < connections.length; }}
      onChange={handleToggleSelectAll}
      className="w-4 h-4 rounded border-border text-primary focus:ring-primary/30"
    />
    <span className="text-sm font-medium text-text-muted">
      {selectedIds.size > 0
        ? `${selectedIds.size} selected`
        : `${connections.length} accounts`}
    </span>
  </label>

  {selectedIds.size > 0 && (
    <Button
      variant="destructive"
      size="sm"
      icon="delete"
      loading={batchDeleting}
      onClick={handleBatchDelete}
    >
      {t("batchDeleteSelected", { count: selectedIds.size })}
    </Button>
  )}
</div>
```

### 4. i18n Keys (to add to all locale files)

```json
{
  "batchDeleteSelected": "Delete Selected ({count})",
  "batchDeleteConfirm": "Delete {count} connection(s)? This action cannot be undone.",
  "batchDeleteSuccess": "Deleted {count} connection(s)"
}
```

### 5. Testing

#### Unit Test (`tests/unit/db-providers-crud.test.ts`)

```typescript
test("deleteProviderConnections deletes multiple connections", async () => {
  const ids = [
    (await createProviderConnection({ provider: "openai", name: "test-1", authType: "apikey" })).id!,
    (await createProviderConnection({ provider: "openai", name: "test-2", authType: "apikey" })).id!,
  ];

  const deleted = await deleteProviderConnections(ids);
  expect(deleted).toBe(2);

  for (const id of ids) {
    const conn = await getProviderConnectionById(id);
    expect(conn).toBeNull();
  }
});

test("deleteProviderConnections with empty array returns 0", async () => {
  const deleted = await deleteProviderConnections([]);
  expect(deleted).toBe(0);
});
```

#### Integration Test (`tests/integration/api-routes-critical.test.ts`)

```typescript
test("DELETE /api/providers — batch delete", async () => {
  const ids = [conn1.id, conn2.id];
  const res = await fetch("http://localhost:20128/api/providers", {
    method: "DELETE",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
    body: JSON.stringify({ ids }),
  });

  expect(res.status).toBe(200);
  const data = await res.json();
  expect(data.deleted).toBe(2);
});
```

### UX Details

1. **Indeterminate select-all**: When some (but not all) rows are selected, the select-all checkbox shows as indeterminate (dash)
2. **Confirmation**: Shows `confirm()` with count ("Delete 3 connections?")
3. **Optimistic update**: Immediately clears selected IDs and removes deleted connections from list on success
4. **Error handling**: Shows error notification; connections remain in list if delete fails
5. **Loading state**: Button shows spinner during delete; row checkboxes disabled
6. **Empty state**: No "Delete Selected" button when nothing selected
7. **Audit logging**: Each batch delete logged as `provider.credentials.batch_revoked`

### Non-Goals

- Bulk enable/disable (separate feature)
- Moving selected accounts (separate feature)
- Batch rename/edit (separate feature)
- Deleting across different providers (each provider page operates independently)

### Risks & Mitigations

| Risk | Mitigation |
|------|------------|
| User accidentally deletes wrong accounts | Require confirmation dialog with count |
| Too many connections selected | Cap at 100 per batch; show error if exceeded |
| Partial failure on batch delete | DB runs in transaction; all-or-nothing semantics |
| Performance with large selections | Batch SQL with `IN (...)` clause is efficient up to 100 |

### Coverage

Per repository rules, this change affects production code in `src/` → automated tests required:
- Unit test for `deleteProviderConnections()` in `tests/unit/db-providers-crud.test.ts`
- Integration test for `DELETE /api/providers` batch endpoint in `tests/integration/api-routes-critical.test.ts`
- Run `npm run test:coverage` — all 4 metrics must meet 60% minimum

---

## Related Issues

- Closes this issue on merge
