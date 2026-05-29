# Web Wrapper Integration Templates - Index

> Everything you need to build production-grade web wrapper integrations without flaws

## 📚 TEMPLATE FILES

### 1. **WEB_WRAPPER_INTEGRATION_TEMPLATE.md** (Main)
   - **Length**: ~2000 lines
   - **Purpose**: Complete step-by-step guide for building web wrappers
   - **Covers**: All 5 phases (Research → Release)
   - **Use When**: Starting a new web wrapper integration
   - **Time to Read**: 2-3 hours
   - **Key Sections**:
     - Phase 1: Research & Discovery (API mapping, auth flow)
     - Phase 2: Implementation (executor, middleware, solver)
     - Phase 3: Testing (unit tests, integration tests)
     - Phase 4: Verification (zero-flaw checklist)
     - Phase 5: Release (PR, issue creation)

### 2. **QUICK_REFERENCE_CARD.md** (Cheat Sheet)
   - **Length**: ~400 lines
   - **Purpose**: Quick lookup during development
   - **Use When**: You need a quick answer while coding
   - **Time to Read**: 15-30 minutes
   - **Key Sections**:
     - Phases overview (visual)
     - File structure
     - Critical success factors (DO/DON'T table)
     - Zero-flaw checklist
     - Common mistakes
     - Command reference
     - Timeline estimate

### 3. **CONCRETE_EXAMPLES.md** (Copy-Paste Code)
   - **Length**: ~800 lines
   - **Purpose**: Production-ready code examples
   - **Use When**: Implementing specific features
   - **Time to Read**: 1-2 hours (skim as needed)
   - **Key Sections**:
     - Cookie normalization (all formats)
     - Format transformation (OpenAI ↔ Target)
     - Error handling (all error types)
     - UUID resolution (critical bug prevention)
     - SSE response parsing
     - Unit test template
     - Live test setup

---

## 🚀 QUICK START

### For New Integration (First Time)

1. **Read**: `WEB_WRAPPER_INTEGRATION_TEMPLATE.md` (full)
2. **Reference**: `QUICK_REFERENCE_CARD.md` (while coding)
3. **Copy**: Code from `CONCRETE_EXAMPLES.md` (as needed)

**Timeline**: 7-14 days

### For Quick Lookup (During Development)

1. **Check**: `QUICK_REFERENCE_CARD.md` (30 seconds)
2. **If needed**: Find exact code in `CONCRETE_EXAMPLES.md`
3. **If needed**: Refer to section in `WEB_WRAPPER_INTEGRATION_TEMPLATE.md`

**Timeline**: 5-30 minutes

### For Specific Problem

| Problem | File | Section |
|---------|------|---------|
| Cookie format issues | CONCRETE_EXAMPLES.md | Example 1 |
| Format transformation | CONCRETE_EXAMPLES.md | Example 2 |
| Error handling | CONCRETE_EXAMPLES.md | Example 3 |
| UUID vs ID bug | CONCRETE_EXAMPLES.md | Example 4 |
| SSE parsing | CONCRETE_EXAMPLES.md | Example 5 |
| Test structure | CONCRETE_EXAMPLES.md | Example 6 |
| Live test setup | CONCRETE_EXAMPLES.md | Example 7 |
| TypeScript errors | QUICK_REFERENCE_CARD.md | Common Mistakes |
| Timeline estimate | QUICK_REFERENCE_CARD.md | Timeline Estimate |
| Checklist | QUICK_REFERENCE_CARD.md | Zero-Flaw Checklist |

---

## 📋 PHASES AT A GLANCE

```
PHASE 1: RESEARCH (2-4 hours)
├─ Open DevTools Network tab
├─ Capture API endpoints
├─ Identify auth method
├─ Document rate limits
└─ Collect request/response samples

PHASE 2: IMPLEMENTATION (1-2 weeks)
├─ Create executor class (500-800 lines)
├─ Implement format transformation
├─ Add auto-refresh middleware
├─ Implement Turnstile solver
└─ Register in providers

PHASE 3: TESTING (1-2 weeks)
├─ Write 20+ unit tests
├─ Test all error paths
├─ Test edge cases
├─ Run live integration test
└─ Verify no flaky tests

PHASE 4: VERIFICATION (1-2 weeks)
├─ TypeScript strict: 0 errors
├─ Security scan: Snyk + Semgrep
├─ Code review: Zero-flaw checklist
├─ Live test: Real API response
└─ Documentation: Complete

PHASE 5: RELEASE (1-2 days)
├─ Create branch from release/
├─ Detailed commit message
├─ Create issue on upstream
├─ Create PR with evidence
└─ Ready for merge
```

---

## ✅ ZERO-FLAW CHECKLIST

Before submitting PR, verify ALL:

```
CODE QUALITY
☐ TypeScript --noEmit: 0 errors
☐ No `any` types
☐ All functions typed
☐ JSDoc on all functions
☐ Error handling complete
☐ Resource cleanup implemented

SECURITY
☐ No hardcoded credentials
☐ No credential logging
☐ Input validation present
☐ Snyk: 0 vulnerabilities
☐ Semgrep: 0 issues

TESTING
☐ 20+ unit tests passing
☐ All error paths tested
☐ Edge cases covered
☐ Live test verified
☐ No flaky tests

FUNCTIONALITY
☐ testConnection() works
☐ execute() transforms correctly
☐ SSE parsing correct
☐ Error responses match OpenAI

DOCUMENTATION
☐ File headers explain architecture
☐ Functions have JSDoc
☐ Cookie format documented
☐ Live test evidence attached
```

---

## 🔴 CRITICAL BUGS TO PREVENT

These bugs will break everything:

### 1. Using `.id` instead of `.uuid`
```typescript
❌ const uuid = data[0].id;        // 400 error
✅ const uuid = data[0].uuid;      // Correct
```

### 2. Not handling 403/401 errors
```typescript
❌ if (!response.ok) return response;
✅ if (response.status === 403) { /* auto-refresh */ }
```

### 3. Buffering entire response
```typescript
❌ const text = await response.text();
✅ return { response };  // Stream it
```

### 4. Hardcoding device IDs
```typescript
❌ const deviceId = "12345-67890";
✅ const deviceId = extractFromSession(cookie);
```

### 5. Not handling empty messages
```typescript
❌ const prompt = messages[0].content;
✅ let prompt = ""; for (msg of messages) if (msg.role === "user") prompt = msg.content;
```

### 6. Using `parameters` instead of `input_schema`
```typescript
❌ { "parameters": {...} }
✅ { "input_schema": {...} }
```

---

## 📊 METRICS TARGET

| Metric | Target | How to Verify |
|--------|--------|---------------|
| TypeScript Errors | 0 | `tsc --noEmit` |
| Test Coverage | >90% | `nyc report` |
| `any` Types | 0 | `grep -r "any"` |
| Hardcoded Creds | 0 | `grep -r "sk-"` |
| Unit Tests | 20+ | `npm run test:unit` |
| Passing Tests | 100% | CI/CD output |
| Live Test | PASS | Manual run |

---

## 🎯 SUCCESS INDICATORS

You're on track when:
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

---

## 📞 TROUBLESHOOTING

### "400 Bad Request"
→ Check `.uuid` vs `.id` (UUID required)
→ See: CONCRETE_EXAMPLES.md → Example 4

### "403 Forbidden"
→ Auto-refresh triggered (Turnstile solve, cf_clearance inject)
→ See: WEB_WRAPPER_INTEGRATION_TEMPLATE.md → Phase 2.3

### "Tests passing locally, failing in CI"
→ Add timeouts, avoid Date.now(), use headless flags
→ See: QUICK_REFERENCE_CARD.md → Common Mistakes

### "Turnstile solve fails"
→ Intentional - request continues anyway, API returns 403, retry happens
→ See: CONCRETE_EXAMPLES.md → Example 3

### "Response buffered instead of streamed"
→ Return full response object, don't call .text()
→ See: CONCRETE_EXAMPLES.md → Example 5

---

## 🔗 RELATED FILES IN REPO

```
.sisyphus/
├─ templates/
│  ├─ WEB_WRAPPER_INTEGRATION_TEMPLATE.md  ← Main guide
│  ├─ QUICK_REFERENCE_CARD.md              ← Cheat sheet
│  ├─ CONCRETE_EXAMPLES.md                 ← Code samples
│  └─ INDEX.md                             ← This file
├─ plans/
│  └─ claude-web-wrapper-plan.md           ← Real example plan
└─ evidence/
   └─ claude-web-live-test/                ← Real example evidence
```

---

## 📈 TIMELINE ESTIMATE

| Phase | Days | FTE | Effort |
|-------|------|-----|--------|
| 1. Research | 0.5-1 | 1 | Low |
| 2. Implementation | 5-10 | 1 | High |
| 3. Testing | 5-10 | 1 | High |
| 4. Verification | 5-10 | 1 | Medium |
| 5. Release | 1-2 | 1 | Low |
| **TOTAL** | **7-14 days** | **1 FTE** | **High** |

---

## 🎓 LEARNING PATH

### Beginner (First web wrapper)
1. Read: WEB_WRAPPER_INTEGRATION_TEMPLATE.md (full)
2. Reference: QUICK_REFERENCE_CARD.md (while coding)
3. Copy: CONCRETE_EXAMPLES.md (as needed)
4. Time: 7-14 days

### Intermediate (Second web wrapper)
1. Skim: WEB_WRAPPER_INTEGRATION_TEMPLATE.md (30 min)
2. Reference: QUICK_REFERENCE_CARD.md (while coding)
3. Copy: CONCRETE_EXAMPLES.md (as needed)
4. Time: 5-7 days

### Advanced (Third+ web wrapper)
1. Reference: QUICK_REFERENCE_CARD.md (quick lookup)
2. Copy: CONCRETE_EXAMPLES.md (as needed)
3. Time: 3-5 days

---

## 💡 TIPS FOR SUCCESS

1. **Follow the phases in order** - Don't skip research
2. **Write tests first** - Catch bugs early
3. **Use live tests** - Verify with real API
4. **Check the checklist** - Before submitting PR
5. **Copy examples** - Don't reinvent the wheel
6. **Reference the card** - Keep it on your desk
7. **Learn from mistakes** - Read anti-patterns section
8. **Ask for help** - These templates are battle-tested

---

## 🚀 YOU'RE READY!

This template is based on production implementation of Claude Web Executor.
It has been battle-tested and refined through real-world usage.

**Everything you need is here. No flaws. No surprises. Just success.** ✅

---

**Last Updated**: 2026-05-15
**Based On**: Claude Web Executor (PR #2283)
**Status**: Production Ready
**Tested**: ✅ 26/26 tests passing, Live verified
