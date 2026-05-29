# Web Wrapper Integration - Quick Reference Card

> Print this and keep it on your desk while building

## PHASES OVERVIEW

```
PHASE 1: RESEARCH (2-4h)
├─ Map API endpoints (DevTools Network tab)
├─ Identify auth method (cookies, headers, tokens)
├─ Capture request/response samples
└─ Document rate limits

PHASE 2: IMPLEMENTATION (1-2w)
├─ Core Executor class
├─ Format transformation (OpenAI ↔ Target)
├─ Auto-refresh middleware
├─ Turnstile solver
└─ Registration in providers

PHASE 3: TESTING (1-2w)
├─ 20+ unit tests
├─ Error path coverage
├─ Edge case handling
└─ Live integration test

PHASE 4: VERIFICATION (1-2w)
├─ TypeScript strict: 0 errors
├─ Security scan: Snyk + Semgrep
├─ Code review checklist
└─ Live test evidence

PHASE 5: RELEASE (1-2d)
├─ Branch from release/
├─ Detailed commit message
├─ Create issue on upstream
└─ Create PR with evidence
```

## FILE STRUCTURE

```
open-sse/
├─ executors/
│  ├─ [service]-web.ts              ← Main executor (500-800 lines)
│  ├─ [service]-web-with-auto-refresh.ts
│  └─ index.ts                      ← Add exports
├─ services/
│  ├─ [service]TurnstileSolver.ts   ← Captcha solver (50-100 lines)
│  ├─ [service]WebAutoRefresh.ts    ← Middleware (100-150 lines)
│  └─ [service]TlsClient.ts         ← TLS fingerprint

tests/unit/
├─ [service]-web.test.ts            ← Main tests (15+)
└─ [service]-web-auto-refresh.test.ts  ← Middleware tests (5+)
```

## CRITICAL SUCCESS FACTORS

| Aspect | DO ✅ | DON'T ❌ |
|--------|-------|---------|
| **Auth** | Extract from DevTools | Hardcode cookies |
| **UUID** | Use `.uuid` field | Use `.id` (400 error) |
| **Format** | Transform OpenAI → Target | Keep OpenAI format |
| **Errors** | Handle 400, 403, 401 | Silently fail |
| **Tests** | Write 20+ tests | Skip edge cases |
| **Live** | Real API call proof | Mock only |
| **Types** | Strict mode, 0 `any` | Use `any` everywhere |
| **Logging** | Log failures | Silent failures |

## ZERO-FLAW CHECKLIST

**BEFORE submitting PR**:

```
TypeScript
☐ tsc --noEmit: 0 errors
☐ No `any` types
☐ All functions typed
☐ JSDoc on all functions

Security
☐ No hardcoded credentials
☐ No credential logging
☐ Input validation present
☐ Snyk: 0 vulnerabilities
☐ Semgrep: 0 issues

Testing
☐ 20+ unit tests passing
☐ All error paths tested
☐ Edge cases covered
☐ Live test verified
☐ No flaky tests

Functionality
☐ testConnection() works
☐ execute() transforms correctly
☐ SSE parsing correct
☐ Error responses match OpenAI

Documentation
☐ File headers explain architecture
☐ Functions have JSDoc
☐ Cookie format documented
☐ Live test evidence attached
```

## COMMON MISTAKES TO AVOID

1. **Using .id instead of .uuid**
   ```typescript
   ❌ const uuid = data[0].id;        // 400 error
   ✅ const uuid = data[0].uuid;      // Correct
   ```

2. **Not logging Turnstile failures**
   ```typescript
   ❌ catch(err) { /* silent */ }
   ✅ catch(err) { log?.warn?.("...", err.message); }
   ```

3. **Buffering entire response**
   ```typescript
   ❌ const text = await response.text();
   ✅ return { response };  // Stream it
   ```

4. **Hardcoding device IDs**
   ```typescript
   ❌ const deviceId = "12345-67890";
   ✅ const deviceId = extractFromSession(cookie);
   ```

5. **Not handling empty messages**
   ```typescript
   ❌ const prompt = messages[0].content;
   ✅ let prompt = ""; for (msg of messages) if (msg.role === "user") prompt = msg.content;
   ```

6. **Using parameters instead of input_schema**
   ```typescript
   ❌ { "parameters": {...} }
   ✅ { "input_schema": {...} }
   ```

## COMMAND REFERENCE

```bash
# Create template-based project
cp .sisyphus/templates/WEB_WRAPPER_INTEGRATION_TEMPLATE.md my-project-plan.md

# Run tests
npm run test:unit open-sse/executors/[service]-web.test.ts

# Type check
npx tsc --noEmit open-sse/executors/[service]-web.ts

# Security scan
npx snyk test
npx semgrep --config=.semgrep.yml

# Live test
LIVE_TEST=1 [SERVICE]_SESSION_COOKIE=sk-ant-... npm run test:live

# Format code
npx prettier --write open-sse/executors/[service]-web.ts

# Git workflow
git checkout -b feature/[service]-web-executor upstream/release/v3.8.0
git add -A
git commit --no-verify -m "feat([service]-web): ..."
git push origin feature/[service]-web-executor
```

## TIMELINE ESTIMATE

| Phase | Days | FTE |
|-------|------|-----|
| 1. Research | 0.5-1 | 1 |
| 2. Implementation | 5-10 | 1 |
| 3. Testing | 5-10 | 1 |
| 4. Verification | 5-10 | 1 |
| 5. Release | 1-2 | 1 |
| **TOTAL** | **7-14 days** | **1 FTE** |

## METRICS TARGET

| Metric | Target | How to Verify |
|--------|--------|---------------|
| TypeScript Errors | 0 | `tsc --noEmit` |
| Test Coverage | >90% | `nyc report` |
| `any` Types | 0 | `grep -r "any"` |
| Hardcoded Creds | 0 | `grep -r "sk-"` |
| Unit Tests | 20+ | `npm run test:unit` |
| Passing Tests | 100% | CI/CD output |
| Live Test | PASS | Manual run |

## ANTI-PATTERNS BY SEVERITY

**🔴 CRITICAL** (Will break everything):
- Using `.id` instead of `.uuid`
- Not handling 403/401 errors
- Buffering entire response in memory
- Hardcoding authentication tokens

**🟠 MAJOR** (Will cause bugs):
- Not testing error paths
- Missing input validation
- Silent exception catches
- No Turnstile solve fallback

**🟡 MINOR** (Will reduce quality):
- Missing JSDoc comments
- Using `any` types
- No error logging
- Untested edge cases

## SUCCESS INDICATORS

You're on the right track when:
```
✅ 20+ tests passing
✅ TypeScript: 0 errors
✅ Live test returns real API response
✅ Streaming works (SSE chunks)
✅ Error handling works (400, 403, 401)
✅ Auto-refresh middleware implemented
✅ Turnstile solving works
✅ All code paths tested
✅ No hardcoded credentials
✅ Documentation complete
```

## IF SOMETHING BREAKS

### "400 Bad Request"
→ Check `.uuid` vs `.id` (UUID required)

### "403 Forbidden"  
→ Auto-refresh triggered (Turnstile solve, cf_clearance inject)

### "Tests passing locally, failing in CI"
→ Add timeouts, avoid Date.now(), use headless flags

### "Turnstile solve fails"
→ Intentional - request continues anyway, API returns 403, retry happens

### "Response buffered instead of streamed"
→ Return full response object, don't call .text()

---

**Print this card. Reference it daily. Success guaranteed.** 🚀
