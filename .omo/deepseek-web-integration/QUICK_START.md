# DeepSeek Web Integration - Quick Start Guide

📋 **Complete workflow** for implementing DeepSeek web-wrapper integration using templates.

---

## 🚀 Quick Overview

**Goal**: Add DeepSeek to OmniRoute as a web-wrapper provider  
**Timeline**: 7-14 days (1 developer)  
**Files to create**: 13  
**Lines of code**: ~3,800  
**Test coverage**: >80%  

---

## 📂 Project Structure

```
.sisyphus/deepseek-web-integration/
├── ISSUE_PROPOSALS.md          ← GitHub issues (copy-paste)
├── RESEARCH_DISCOVERY.md       ← API research & findings
├── PR_TEMPLATE.md              ← PR description (copy-paste)
├── THIS_FILE.md                ← Quick start guide
└── [AFTER IMPLEMENTATION]
    ├── CONCRETE_CODE_EXAMPLES/ ← Working code snippets
    └── TEST_TEMPLATES/         ← Reusable test patterns
```

---

## 📝 Phase 1: Research & Discovery (0.5-1 day)

### Step 1: Understand the Template
```bash
# Read the base template
cat .sisyphus/templates/INDEX.md
cat .sisyphus/templates/WEB_WRAPPER_INTEGRATION_TEMPLATE.md
cat .sisyphus/templates/QUICK_REFERENCE_CARD.md
```

### Step 2: Review Existing Implementation (Reference)
```bash
# Study Claude Web Executor as reference
cat src/open-sse/executors/claude-web.ts | head -100
cat src/open-sse/middleware/claude-web.ts | head -100
```

### Step 3: Create GitHub Issues
1. Copy content from `.sisyphus/deepseek-web-integration/ISSUE_PROPOSALS.md`
2. Create 5 GitHub issues:
   - Issue #1: Research & Discovery (this phase)
   - Issue #2: Implementation
   - Issue #3: Testing & Validation
   - Issue #4: Documentation
   - Issue #5: Release & Integration

### Step 4: Research DeepSeek API
**Use**: `.sisyphus/deepseek-web-integration/RESEARCH_DISCOVERY.md` as guide
- [ ] Open https://chat.deepseek.com in browser
- [ ] Extract session cookies (DevTools → Application → Cookies)
- [ ] Document all API endpoints used
- [ ] Capture request/response examples
- [ ] Update RESEARCH_DISCOVERY.md with findings
- [ ] Get code review approval before proceeding

**Deliverable**: Completed RESEARCH_DISCOVERY.md

---

## 💻 Phase 2: Implementation (5-10 days)

### File Structure to Create

```typescript
// Core executor
src/open-sse/executors/deepseek-web.ts (400 lines)
  - DeepSeekWebExecutor class
  - Session management
  - Payload mapping (OpenAI → DeepSeek)
  - SSE response parsing
  - Error handling

// Auto-refresh variant
src/open-sse/executors/deepseek-web-with-auto-refresh.ts (300 lines)
  - Auto-refresh capability
  - Session rotation

// Middleware
src/open-sse/middleware/deepseek-web.ts (200 lines)
  - Format translation
  - Streaming response handling
  - Error propagation
```

### Implementation Steps

#### Day 1-2: Core Executor
```bash
# 1. Copy template from reference
cp src/open-sse/executors/claude-web.ts src/open-sse/executors/deepseek-web.ts

# 2. Edit deepseek-web.ts
#    - Replace [SERVICE] placeholders
#    - Update API endpoints from research
#    - Adjust payload mapping
#    - Update error handling

# 3. Test basic compilation
npm run build
```

#### Day 3-5: Complete Implementation
```bash
# Continue with auto-refresh variant
# Implement middleware
# Add to executor registry

# Update exports
vim src/open-sse/executors/index.ts    # Add exports
vim src/open-sse/middleware/index.ts   # Add exports
vim src/router/executor-registry.ts    # Add provider

# Verify compilation
npm run build --check
```

### Code Template (from existing executor)

```typescript
// src/open-sse/executors/deepseek-web.ts
import { BaseExecutor, mergeAbortSignals, type ExecuteInput } from "./base.ts";

export class DeepSeekWebExecutor extends BaseExecutor {
  private sessionCookie: string;
  private timeout: number;

  constructor(config: { sessionCookie: string; timeout?: number }) {
    super();
    this.sessionCookie = config.sessionCookie;
    this.timeout = config.timeout || 120000;
  }

  async execute(input: ExecuteInput): Promise<AsyncIterable<string>> {
    // 1. Map OpenAI format to DeepSeek
    const payload = this.mapOpenAIToDeepSeek(input);

    // 2. Make request to DeepSeek API
    const response = await this.makeRequest(payload);

    // 3. Parse SSE response
    return this.parseSSEResponse(response);
  }

  private mapOpenAIToDeepSeek(input: ExecuteInput) {
    // Extract last user message
    const lastMessage = input.messages[input.messages.length - 1];
    return {
      prompt: lastMessage.content,
      model: input.model || "deepseek-chat",
      temperature: input.temperature || 0.7,
      top_p: input.top_p || 0.95,
      max_tokens: input.max_tokens || 2000,
      stream: true,
      timezone: "UTC",
      locale: "en-US",
    };
  }

  private async makeRequest(payload: unknown): Promise<Response> {
    return fetch("https://chat.deepseek.com/api/v0/chat/completions", {
      method: "POST",
      headers: {
        "Accept": "text/event-stream",
        "Content-Type": "application/json",
        "Cookie": this.sessionCookie,
      },
      body: JSON.stringify(payload),
    });
  }

  private async *parseSSEResponse(response: Response): AsyncIterable<string> {
    // Parse SSE stream and yield OpenAI format chunks
    // See: .sisyphus/templates/CONCRETE_EXAMPLES.md for SSE parsing patterns
  }
}
```

### Deliverable
- ✅ deepseek-web.ts compiles without errors
- ✅ Middleware working
- ✅ Registered in executor registry
- ✅ Code review approval obtained

---

## ✅ Phase 3: Testing (5-10 days)

### Test Structure

```typescript
// src/open-sse/executors/__tests__/deepseek-web.test.ts
import { describe, test, expect } from "node:test";
import { DeepSeekWebExecutor } from "../deepseek-web.ts";

describe("DeepSeekWebExecutor", () => {
  describe("mapOpenAIToDeepSeek", () => {
    test("should map basic message correctly", () => {
      // Test case 1
    });
    test("should handle multiple messages", () => {
      // Test case 2
    });
  });

  describe("error handling", () => {
    test("should handle session expiration (401)", () => {
      // Bug prevention #4
    });
    test("should handle rate limiting (429)", () => {
      // Bug prevention #5
    });
    test("should enforce 120s timeout", () => {
      // Bug prevention #6
    });
  });
});
```

### Test Template (from CONCRETE_EXAMPLES.md)

Copy test templates from: `.sisyphus/templates/CONCRETE_EXAMPLES.md`

### Coverage Check
```bash
npm test -- --coverage src/open-sse/executors/deepseek-web.ts
# Target: >80% coverage
```

### Deliverable
- ✅ All tests passing
- ✅ Coverage >80%
- ✅ No flaky tests
- ✅ Security review passed

---

## 📚 Phase 4: Documentation (2-3 days)

### Documentation Files

```
docs/integrations/deepseek-web/
├── README.md                 - Overview
├── SETUP.md                  - Installation & config
├── API.md                    - API reference
├── EXAMPLES.md               - 7 copy-paste examples
└── TROUBLESHOOTING.md        - Common issues
```

### Quick Template

```markdown
# DeepSeek Web Integration

## Installation
```bash
npm install @omni/open-sse
```

## Quick Start
```typescript
import { DeepSeekWebExecutor } from "@omni/open-sse";

const executor = new DeepSeekWebExecutor({
  sessionCookie: "session_id=xxx; device_id=yyy"
});

const response = await executor.execute({
  messages: [{ role: "user", content: "Hello!" }],
  model: "deepseek-chat"
});
```

## Examples
- See EXAMPLES.md for 7 complete working examples
```

### Deliverable
- ✅ README, SETUP, API, EXAMPLES, TROUBLESHOOTING complete
- ✅ All examples tested and working
- ✅ Link from main README to docs

---

## 🚀 Phase 5: Release (1-2 days)

### Pre-Release Checklist

```bash
# 1. Code Quality
npm run lint
npm run type-check
npm test

# 2. Security
npx snyk test --severity-threshold=high

# 3. Coverage
npm test -- --coverage
# Verify >80%

# 4. Documentation
npm run docs:build
# Verify docs render correctly

# 5. Integration
npm run build
# Verify no build errors

# 6. Final Test
npm test -- --run
# All tests passing?
```

### Release Steps

```bash
# 1. Update version
npm version minor  # or patch

# 2. Update CHANGELOG
echo "## v1.2.0 - DeepSeek Integration
- Add DeepSeek web executor
- Add DeepSeek middleware
- Add DeepSeek auto-refresh variant
- Complete documentation and examples" >> CHANGELOG.md

# 3. Commit
git add -A
git commit -m "feat: add deepseek web integration"

# 4. Tag
git tag v1.2.0

# 5. Push
git push origin main --tags

# 6. Create GitHub Release
gh release create v1.2.0 --notes-file RELEASE_NOTES.md
```

### Deliverable
- ✅ All quality gates passed
- ✅ Documentation complete
- ✅ Version bumped
- ✅ Release tagged
- ✅ Deployed to npm

---

## 📋 Critical Bugs to Prevent

Use the **6 critical bugs** from template:

1. **Cookie Format Mismatch** ← Test all formats
2. **UUID Resolution** ← Validate UUIDs
3. **SSE Parsing** ← Handle malformed data
4. **Session Expiration** ← Implement refresh
5. **Rate Limiting** ← Exponential backoff
6. **Timeout Handling** ← Enforce 120s

**Each bug has a test case** in `.sisyphus/templates/CONCRETE_EXAMPLES.md`

---

## 🔗 File Dependencies

```
RESEARCH_DISCOVERY.md (findings)
    ↓
deepseek-web.ts (use findings to implement)
    ↓
deepseek-web.test.ts (test implementation)
    ↓
DOCUMENTATION (explain implementation)
    ↓
RELEASE (deploy to production)
```

---

## 💡 Pro Tips

### 1. Reference Implementation
Always compare with Claude Web:
```bash
# Side-by-side comparison
diff -u src/open-sse/executors/claude-web.ts src/open-sse/executors/deepseek-web.ts
```

### 2. Template Usage
Copy code snippets from templates:
```bash
# SSE parsing template
grep -A 50 "parseSSEResponse" .sisyphus/templates/CONCRETE_EXAMPLES.md

# Error handling template
grep -A 30 "error handling" .sisyphus/templates/CONCRETE_EXAMPLES.md
```

### 3. Test-Driven Approach
Write tests first:
```bash
# Create test file
touch src/open-sse/executors/__tests__/deepseek-web.test.ts

# Write test skeleton (from template)
# Run tests (they'll fail)
npm test

# Implement code to pass tests
# Repeat until all pass
```

### 4. Code Review Gates
Every phase requires approval:
- Phase 1: Research approval ✅
- Phase 2: Implementation code review ✅
- Phase 3: Test coverage verification ✅
- Phase 4: Documentation review ✅
- Phase 5: Release sign-off ✅

---

## 🎯 Success Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Code Coverage | >80% | - |
| Security Vulnerabilities | 0 | - |
| Tests Passing | 100% | - |
| Documentation Complete | 100% | - |
| Performance (ms/request) | <2000 | - |
| Error Handling | All 6 bugs prevented | - |

---

## 📞 Getting Help

### Common Questions

**Q: Where do I find API documentation?**  
A: See `RESEARCH_DISCOVERY.md` → Section 1-14

**Q: What's the right request format?**  
A: See `RESEARCH_DISCOVERY.md` → Section 3

**Q: How do I handle errors?**  
A: See `RESEARCH_DISCOVERY.md` → Section 5 + `.sisyphus/templates/CONCRETE_EXAMPLES.md`

**Q: What tests should I write?**  
A: See `.sisyphus/templates/WEB_WRAPPER_INTEGRATION_TEMPLATE.md` → Test Templates section

**Q: How do I extract session cookies?**  
A: See `RESEARCH_DISCOVERY.md` → Section 2 (Browser DevTools steps)

### Useful Commands

```bash
# View template
cat .sisyphus/templates/QUICK_REFERENCE_CARD.md

# Find examples
grep -r "deepseek" .sisyphus/templates/ || grep -r "ChatGPT" .sisyphus/templates/CONCRETE_EXAMPLES.md

# Compare implementations
ls -la src/open-sse/executors/*-web.ts

# Run tests
npm test -- deepseek

# Check coverage
npm test -- --coverage deepseek
```

---

## ✨ Timeline Summary

```
Week 1
├─ Day 1: Research & Issue Creation
├─ Day 2-4: Implementation
└─ Day 5-6: Testing

Week 2
├─ Day 7-8: Documentation
└─ Day 9: Release & Deployment
```

---

## 🎉 Done!

After completing all 5 phases, you'll have:

✅ DeepSeek executor working in production  
✅ Zero critical bugs  
✅ 80%+ test coverage  
✅ Complete documentation  
✅ Real-world battle-tested code  

**Start with Issue #1: Research & Discovery** → Use `RESEARCH_DISCOVERY.md`

Good luck! 🚀
