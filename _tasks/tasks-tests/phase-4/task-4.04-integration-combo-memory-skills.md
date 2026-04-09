# Task 4.04 — Test: Combo Routing + Memory + Skills Integration

## Metadata
- **Phase**: 4
- **Test files to create**: `tests/integration/combo-routing-e2e.test.mjs`, `tests/integration/memory-pipeline.test.mjs`, `tests/integration/skills-pipeline.test.mjs`
- **Estimated assertions**: ~25

## Pre-requisites
1. Read combo service: `open-sse/services/combo.ts`
2. Read memory modules: `src/lib/memory/`
3. Read skills modules: `src/lib/skills/`
4. Check existing: `src/lib/skills/__tests__/integration.test.ts`

## Test Scenarios

### Combo Routing Integration (~8)
```
1. Create combo → set active → route request → verify provider selected
2. Round-robin: 3 requests → 3 different accounts
3. Priority: primary available → always primary
4. Priority: primary down → fallback to secondary
5. Model mapping: request model X → combo maps to provider/modelY
6. Wildcard combo: any model → resolved provider
7. No matching combo → error
8. Strategy change mid-session
```

### Memory Pipeline Integration (~8)
```
1. First request → no memory → proceed normally
2. Response → extraction → store in memory
3. Second request → memory retrieved → injected into messages
4. Memory search relevance scoring
5. Memory injection with context window limits
6. Memory disabled → no injection/extraction
7. Memory clear → empty store
8. Multi-session memory isolation
```

### Skills Pipeline Integration (~9)
```
1. Skill registry → list available skills
2. Enable skill → active in pipeline
3. Request matching skill trigger → skill executed
4. Skill result returned to client
5. Skill not matching → normal pipeline
6. Skill sandbox execution (mocked)
7. Skill error → graceful fallback to normal pipeline
8. Disable skill → removed from pipeline
9. Built-in vs custom skills
```

## Acceptance Criteria
- [ ] All 25 assertions pass
- [ ] Covers cross-module interactions
