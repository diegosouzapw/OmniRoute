# API VALIDATION PLAN

## OBJECTIVE
Validate that the claude.ai API is accessible, functional, and suitable for integration via cookie authentication before committing to full implementation.

## TIMELINE
2-4 hours

## DELIVERABLES
- `docs/API_VALIDATION.md` - Comprehensive API documentation
- `tests/e2e/webWrappers/api-validation.test.ts` - Automated validation tests
- `evidence/api-validation/` - Screenshots, curl outputs, test results

## PHASE 0: API VALIDATION STEPS

### Step 1: Cookie Acquisition (30 min)
**Goal**: Obtain a valid session cookie from claude.ai

**Steps**:
1. Visit https://claude.ai in browser
2. Open DevTools (F12) → Application → Cookies
3. Locate cookies for claude.ai domain
4. Find `__Secure-next-auth.session-token` (or similar)
5. Copy the value to clipboard
6. Save to `.env.local`:
   ```
   TEST_CLAUDE_COOKIE=your_cookie_here
   ```

**Validation**:
- [ ] Cookie value saved to `.env.local`
- [ ] Cookie length > 100 characters (indicates valid session)
- [ ] Cookie not expired (check via browser)

**Tools**: Browser DevTools

### Step 2: Basic Connectivity Test (15 min)
**Goal**: Verify cookie can be used to make authenticated requests

**Steps**:
```bash
# Test 1: Get user profiles
curl -H "Authorization: Bearer $TEST_CLAUDE_COOKIE" \
  https://api.claude.ai/v1/profiles \
  2>&1 | head -20

# Test 2: Check model availability
curl -H "Authorization: Bearer $TEST_CLAUDE_COOKIE" \
  https://api.claude.ai/v1/models \
  2>&1 | head -20

# Test 3: Test streaming endpoint (if available)
curl -H "Authorization: Bearer $TEST_CLAUDE_COOKIE" \
  -H "Content-Type: application/json" \
  -d '{"model": "claude-3-opus-20240229", "messages": [{"content": "Hello!"}], "max_tokens": 100}' \
  https://api.claude.ai/v1/chat/completions \
  2>&1 | head -40
```

**Validation**:
- [ ] All endpoints return 2xx status
- [ ] Responses contain expected data structures
- [ ] Streaming works (if applicable)

**Outputs**:
- Save curl outputs to `evidence/api-validation/curl-tests.txt`
- Take screenshots of successful responses

### Step 3: Endpoint Discovery (60 min)
**Goal**: Map all available API endpoints and their requirements

**Steps**:
1. Use browser DevTools to capture all API requests during normal usage
2. Document each endpoint:
   - URL
   - HTTP method
   - Required headers
   - Request body format
   - Response format
   - Rate limits (if visible)
3. Test each endpoint with curl
4. Document authentication requirements

**Endpoints to investigate**:
- `GET /v1/profiles` - User profiles
- `GET /v1/models` - Available models
- `POST /v1/chat/completions` - Chat completions (streaming?)
- `POST /v1/chat/message` - Alternative endpoint?
- `GET /v1/usage` - Usage statistics

**Validation**:
- [ ] All endpoints documented in `docs/API_VALIDATION.md`
- [ ] Authentication requirements clear
- [ ] Rate limits identified
- [ ] Request/response schemas documented

**Tools**: Browser DevTools, curl, Postman (optional)

### Step 4: Streaming Analysis (30 min)
**Goal**: Understand streaming behavior and requirements

**Steps**:
1. Test streaming endpoint with large prompt
2. Capture network traffic:
   ```bash
   curl -N -H "Authorization: Bearer $TEST_CLAUDE_COOKIE" \
     -H "Content-Type: application/json" \
     -d '{"model": "claude-3-opus-20240229", "messages": [{"content": "Generate a long story..."}], "max_tokens": 1000}' \
     https://api.claude.ai/v1/chat/completions 2>&1 | tee evidence/api-validation/streaming-output.txt
   ```
3. Analyze response format:
   - Is it chunked transfer encoding?
   - What's the message format?
   - How are errors handled during stream?
4. Test with different models and token counts

**Validation**:
- [ ] Streaming mechanism identified
- [ ] Message format documented
- [ ] Error handling during stream documented
- [ ] Performance characteristics noted

**Outputs**:
- `evidence/api-validation/streaming-analysis.md`
- Network capture files

### Step 5: Error Handling Test (30 min)
**Goal**: Understand error types and handling requirements

**Steps**:
1. Test with expired cookie
2. Test with invalid cookie
3. Test rate limiting
4. Test invalid requests
5. Document error responses:
   ```bash
   # Expired cookie test
   export EXPIRED_COOKIE=invalid_cookie
   curl -H "Authorization: Bearer $EXPIRED_COOKIE" https://api.claude.ai/v1/profiles
   
   # Invalid request test
   curl -H "Authorization: Bearer $TEST_CLAUDE_COOKIE" \
     -H "Content-Type: application/json" \
     -d '{"invalid": "data"}' \
     https://api.claude.ai/v1/chat/completions
   ```

**Validation**:
- [ ] Error codes documented (4xx, 5xx)
- [ ] Error message formats documented
- [ ] Rate limit headers documented
- [ ] Recovery strategies identified

**Outputs**:
- `docs/API_VALIDATION.md` - Error handling section
- `evidence/api-validation/error-tests.txt`

### Step 6: Documentation Compilation (45 min)
**Goal**: Create comprehensive API documentation

**Steps**:
1. Compile findings from Steps 1-5
2. Create `docs/API_VALIDATION.md` with:
   - Overview and authentication
   - Endpoints reference
   - Request/response schemas
   - Streaming implementation guide
   - Error handling
   - Rate limits
   - Model availability
3. Add code examples for each endpoint
4. Include curl commands for testing
5. Document any limitations or issues found

**Validation**:
- [ ] Documentation complete and accurate
- [ ] All endpoints covered
- [ ] Examples work with test cookie
- [ ] Limitations clearly documented

**Outputs**:
- `docs/API_VALIDATION.md` (final version)

## PHASE 0: CHECKLIST

### Before Starting
- [ ] Valid session cookie obtained
- [ ] .env.local configured with TEST_CLAUDE_COOKIE
- [ ] Feature branch created: `feature/web-wrapper-providers`

### During Validation
- [ ] Step 1: Cookie acquisition complete
- [ ] Step 2: Basic connectivity test complete
- [ ] Step 3: Endpoint discovery complete
- [ ] Step 4: Streaming analysis complete
- [ ] Step 5: Error handling test complete
- [ ] Step 6: Documentation compilation complete

### Success Criteria
- [ ] All endpoints return 2xx with valid cookie
- [ ] Streaming works and is usable
- [ ] Error handling understood
- [ ] Rate limits acceptable
- [ ] Documentation complete
- [ ] Go/no-go decision made

## GO/NO-GO DECISION

### GO CRITERIA
- API accessible with session cookie
- Streaming works reliably
- Rate limits sufficient for intended use
- Error handling manageable
- No blocking legal/terms issues

### NO-GO CRITERIA
- API requires account login (not cookie)
- Streaming not available or unreliable
- Rate limits too restrictive
- API changes frequently or unstable
- Legal/terms prohibit this usage

### Decision Process
1. Review API_VALIDATION.md documentation
2. Evaluate against GO/NO-GO criteria
3. Make decision:
   - ✅ GO: Proceed to Phase 1 implementation
   - ❌ NO-GO: Consider alternatives (Playwright, etc.)

## TOOLS & RESOURCES

### Required Tools
- curl (for API testing)
- Browser (Chrome/Firefox) with DevTools
- Text editor
- Git

### Helpful Resources
- claude.ai website (for observation)
- Postman (optional for API testing)
- Wireshark (optional for deep packet inspection)

### Reference Documentation
- OmniRoute planning docs: `/tmp/planning/`
- Web AI Wrapper Plan: `WEB_AI_WRAPPER_PLAN.md`
- Implementation Checklist: `IMPLEMENTATION_CHECKLIST.md`

## RISK ASSESSMENT

### Technical Risks
- **API changes**: claude.ai API may change, breaking integration
  - Mitigation: Document thoroughly, implement abstraction layer
- **Cookie expiration**: Session cookies expire
  - Mitigation: Implement cookie validation and refresh mechanism
- **Rate limiting**: May be too restrictive for intended use
  - Mitigation: Implement request queuing and retry logic
- **Legal issues**: Terms of service may prohibit this usage
  - Mitigation: Review terms, limit usage, consider legal consultation

### Timeline Risks
- **API discovery takes longer than expected**: 2-4 hours estimate may be optimistic
  - Mitigation: Timebox each step, document issues as they arise
- **API not suitable**: May require fallback to Playwright
  - Mitigation: Have Playwright research ready as backup

### Mitigation Strategies
1. **Timeboxing**: Strict time limits per step
2. **Parallel work**: While waiting for API responses, document findings
3. **Fallback planning**: Prepare Playwright alternative if API fails
4. **Incremental validation**: Validate each step before proceeding

## EVIDENCE COLLECTION

### Required Evidence
- [ ] Cookie acquisition screenshot
- [ ] curl output for each endpoint
- [ ] Streaming output capture
- [ ] Error test outputs
- [ ] Final documentation

### Storage Locations
- `evidence/api-validation/` - Raw evidence files
- `docs/API_VALIDATION.md` - Compiled documentation
- `.env.local` - Test cookie (DO NOT COMMIT)

### Evidence Format
- Text files: `curl-output-<endpoint>.txt`
- Screenshots: `screenshot-<step>.png`
- Documentation: Markdown files

## NEXT STEPS AFTER VALIDATION

### If GO Decision
1. Proceed to Phase 1: Foundation implementation
2. Create feature branch if not already created
3. Start with Task 1.1: Add provider constants
4. Follow quick start guide for implementation

### If NO-GO Decision
1. Research Playwright alternative
2. Create fallback plan
3. Re-evaluate timeline and resources
4. Present options to stakeholders

## CONTACT & SUPPORT

### Questions?
- Review API_VALIDATION.md documentation
- Check OmniRoute planning docs: `/tmp/planning/`
- Consult with team members

### Issues?
- Document in issues log
- Escalate blocking issues immediately
- Consider fallback options

---
## READY TO START?

Begin with Step 1: Cookie Acquisition ⬇️

### Additional Manual Playwright Test (MCP)
- After cookie acquisition, run a Playwright MCP script to verify the web UI flow works with the provided cookie.
- Script will launch a headless browser, set the cookie, navigate to claude.ai, and ensure the dashboard loads without login prompts.
- Capture screenshot and console logs as evidence.
- Store results in `evidence/api-validation/playwright/`.
