# Windows EPERM Test Fix Documentation

## Issue

**GitHub Issue**: [#13290](https://github.com/diegosouzapw/OmniRoute/issues/13290)

~29 unit tests failed on Windows with `EPERM: Permission denied` during teardown. The root cause was that `test.after()` removed the temporary `DATA_DIR` without closing the SQLite database connection first. On Windows, a directory cannot be deleted while it contains open file handles (the main `storage.sqlite` plus WAL/SHM sidecars: `storage.sqlite-wal`, `storage.sqlite-shm`).

## Root Cause

Test files created isolated `DATA_DIR` using `fs.mkdtempSync()` and set `process.env.DATA_DIR`. During tests, importing database modules opened SQLite connections. The final `test.after()` called `fs.rmSync()` on the directory **without** calling `core.resetDbInstance()` to close the DB first.

```typescript
// BEFORE (fails on Windows)
test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});
```

Error:

```
Error: EPERM, Permission denied: \?\C:\Users\...\Temp\omniroute-executor-registry-CwqmB0
    at Object.rmSync (node:fs:1283:18)
    at TestContext.<anonymous> (tests/unit/executor-registry.test.ts:21:6)
```

## Solution

Created a shared teardown helper at `tests/_setup/withIsolatedDataDir.ts` that:

1. **Creates isolated temp `DATA_DIR`** with a unique prefix
2. **Provides `cleanupIsolatedTestEnv()`** that:
   - Calls `core.resetDbInstance()` to close the database connection
   - Waits 50ms for Windows to release file handles
   - Then removes the directory with retries
3. **Restores original `DATA_DIR`** environment variable

### Helper API

```typescript
import {
  createIsolatedTestEnvSync, // synchronous setup
  cleanupIsolatedTestEnv, // async cleanup (Windows-safe)
  createIsolatedTestEnv, // async setup + cleanup in one
  cleanupIsolatedTestEnvSync, // sync cleanup (less safe)
} from "../_setup/withIsolatedDataDir.ts";
```

### Usage Pattern

```typescript
import {
  createIsolatedTestEnvSync,
  cleanupIsolatedTestEnv,
} from "../_setup/withIsolatedDataDir.ts";

const { testDataDir, originalDataDir } = createIsolatedTestEnvSync("my-test-prefix-");

const core = await import("../../src/lib/db/core.ts");
// ... test setup

test.after(async () => {
  // Close DB, wait, then remove directory
  await cleanupIsolatedTestEnv(testDataDir, originalDataDir);
});
```

## Fixed Test Files

| Test File                                   | Status                                                     |
| ------------------------------------------- | ---------------------------------------------------------- |
| `tests/unit/executor-registry.test.ts`      | ✅ Fixed - 5 tests pass                                    |
| `tests/unit/api-key-lifecycle.test.ts`      | ✅ Fixed - 11 tests pass                                   |
| `tests/unit/provider-health-matrix.test.ts` | ✅ Fixed - No EPERM (2 pre-existing logic failures remain) |
| `tests/unit/reasoning-routing.test.ts`      | ✅ Fixed - No EPERM (1 pre-existing logic failure remains) |
| `tests/unit/zcode-executor.test.ts`         | ✅ Fixed - 3 tests pass                                    |

## Migration Guide for Other Test Files

For the 93 latent test files that set `DATA_DIR` manually, replace:

```typescript
// OLD PATTERN
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const TEST_DATA_DIR = fs.mkdtempSync(path.join(os.tmpdir(), "omniroute-my-test-"));
process.env.DATA_DIR = TEST_DATA_DIR;

test.after(() => {
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
});
```

With:

```typescript
// NEW PATTERN
import {
  createIsolatedTestEnvSync,
  cleanupIsolatedTestEnv,
} from "../_setup/withIsolatedDataDir.ts";

const { testDataDir, originalDataDir } = createIsolatedTestEnvSync("omniroute-my-test-");

// ... imports that use DATA_DIR ...

test.after(async () => {
  await cleanupIsolatedTestEnv(testDataDir, originalDataDir);
});
```

For tests with `resetStorage()` helpers called in `test.beforeEach()`:

```typescript
// OLD
async function resetStorage() {
  core.resetDbInstance();
  fs.rmSync(TEST_DATA_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  fs.mkdirSync(TEST_DATA_DIR, { recursive: true });
}

// NEW - just reset DB state, don't rmSync
async function resetStorage() {
  core.resetDbInstance();
  // other state resets (caches, etc.)
  // Directory cleanup happens in test.after() via cleanupIsolatedTestEnv()
}
```

## Why This Approach

1. **Single source of truth** - One correct Windows-safe implementation
2. **Opt-in** - Tests adopt the helper; no global behavior change
3. **Idempotent** - Safe to call multiple times
4. **Restores environment** - Preserves original `DATA_DIR` for other tests
5. **Minimal overhead** - 50ms delay only in teardown

## Related

- [PR #13289](https://github.com/diegosouzapw/OmniRoute/pull/13289) - Fixed the other EPERM cause (Chrome spawned under test runner)
- `tests/_setup/isolateDataDir.ts` - Global test DATA_DIR isolation (used when tests don't set DATA_DIR themselves)
