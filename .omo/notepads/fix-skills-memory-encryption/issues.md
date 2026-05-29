
## Task 6: Import Errors Blocking API Testing (2026-04-20)

### Issue: dataPaths Module Export Errors
**Severity**: High - Blocks server startup

**Error Messages**:
```
Attempted import error: 'resolveDataDir' is not exported from '../dataPaths'
Attempted import error: 'getLegacyDotDataDir' is not exported from '../dataPaths'
Attempted import error: 'isSamePath' is not exported from '../dataPaths'
[FATAL] Failed to start Next custom server
```

**Impact**:
- Dev server cannot start
- API endpoints untestable
- Memory settings endpoint verification blocked

**Location**: `src/lib/dataPaths` module

**Required Fix**: Export missing functions from dataPaths module
