# Task 4.05 — Test: E2E UI Flows (Playwright)

## Metadata
- **Phase**: 4 (E2E)
- **Test files to create**:
  - `tests/e2e/providers-management.spec.ts`
  - `tests/e2e/api-keys-flow.spec.ts`
  - `tests/e2e/skills-marketplace.spec.ts`
  - `tests/e2e/memory-settings.spec.ts`
- **Framework**: Playwright
- **Estimated assertions**: ~30

## Pre-requisites
1. Read existing E2E tests in `tests/e2e/` for patterns
2. Read `playwright.config.ts` for configuration
3. Ensure `npm run dev` can start the server

## Test Scenarios

### providers-management.spec.ts (~8)
```
1. Navigate to Providers page
2. Add new provider via UI (fill form, submit)
3. Provider appears in list
4. Edit provider connection
5. Test provider connection (mock test)
6. Delete provider
7. Provider removed from list
8. Error state: invalid API key
```

### api-keys-flow.spec.ts (~8)
```
1. Navigate to API Keys page
2. Create new API key
3. Key appears in list (masked)
4. Copy key to clipboard
5. Reveal full key
6. Revoke key
7. Key removed from list
8. Empty state display
```

### skills-marketplace.spec.ts (~8)
```
1. Navigate to Skills page
2. Marketplace tab loads
3. Search skills
4. Enable a skill
5. Skill appears in enabled list
6. Configure skill settings
7. Disable skill
8. Skills list pagination/scroll
```

### memory-settings.spec.ts (~6)
```
1. Navigate to Settings → Memory
2. Toggle memory on
3. Configure retention settings
4. Save settings → success toast
5. Toggle memory off
6. Clear memory data
```

## Testing Approach

Use Playwright page objects and `page.goto()`, `page.click()`, `page.fill()`, `page.waitForSelector()`. Mock API responses where needed using `page.route()`.

## Acceptance Criteria
- [ ] All 30 assertions pass
- [ ] Tests run with `npm run test:e2e`
- [ ] No real provider API calls (route interception)
- [ ] Screenshots on failure (configured in playwright.config.ts)
