# Comprehensive Test Coverage Plan

## Current Status

### Overall Coverage: ~5% (estimated)
- CLI Tests: ✅ 85% (just fixed)
- Other Packages: ❌ 0-10%

### Test Files: 18 / 116 source files (15.5%)

## Priority-Based Test Implementation Plan

### 🔴 CRITICAL (Week 1) - Production Blockers

#### 1. Server Package (0% → 80%)
**Files to Test:**
- `server/server.go`
- `server/handlers.go`

**Test Files to Create:**
- `server/server_test.go`
- `server/handlers_test.go`

**Coverage Goals:**
- Server startup/shutdown
- Request handling
- Error handling
- Middleware
- Health checks

**Estimated Effort:** 2-3 days

#### 2. Account Package (0% → 80%)
**Files to Test:**
- `account/account.go`

**Test Files to Create:**
- `account/account_test.go`

**Coverage Goals:**
- Account creation
- Key management
- Provider configuration
- Enhanced account features

**Estimated Effort:** 1-2 days

#### 3. Database Package (0% → 70%)
**Files to Test:**
- `db/db.go`
- `db/migrate.go`
- `db/fuzzysearch/search.go`

**Test Files to Create:**
- `db/db_test.go`
- `db/migrate_test.go`
- `db/fuzzysearch/search_test.go`

**Coverage Goals:**
- Connection management
- Query execution
- Migration up/down
- Fuzzy search

**Estimated Effort:** 2-3 days

### 🟡 IMPORTANT (Week 2) - Core Functionality

#### 4. Providers Package (0% → 75%)
**Files to Test:**
- `providers/oauthproxy/provider.go`
- `providers/agentcli/provider.go`
- All provider implementations

**Test Files to Create:**
- `providers/oauthproxy/provider_test.go`
- `providers/agentcli/provider_test.go`
- `providers/provider_test.go` (integration)

**Coverage Goals:**
- Provider initialization
- Authentication flows
- Request handling
- Error handling

**Estimated Effort:** 2-3 days

#### 5. API Package (0% → 70%)
**Files to Test:**
- `api/server.go`
- `api/rest_handlers.go`
- `api/connect/server.go`
- `api/graphql/resolvers/`

**Test Files to Create:**
- `api/server_test.go`
- `api/rest_handlers_test.go`
- `api/connect/server_test.go`
- `api/graphql/resolvers/resolver_test.go`

**Coverage Goals:**
- HTTP handlers
- GraphQL resolvers
- Connect/gRPC services
- Request/response validation

**Estimated Effort:** 3-4 days

#### 6. Infrastructure Package (0% → 70%)
**Files to Test:**
- `infra/redis/client.go`
- `infra/neo4j/client.go`
- `infra/nats/client.go`
- `infra/hatchet/client.go`

**Test Files to Create:**
- `infra/redis/client_test.go`
- `infra/neo4j/client_test.go`
- `infra/nats/client_test.go`
- `infra/hatchet/client_test.go`

**Coverage Goals:**
- Client initialization
- Connection management
- Error handling
- Retry logic

**Estimated Effort:** 2-3 days

### 🟢 NICE-TO-HAVE (Week 3) - Polish & Edge Cases

#### 7. Plugins Package (Partial → 80%)
**Files to Test:**
- `plugins/intelligentrouter/router.go`
- `plugins/promptadapter/plugin.go`
- `plugins/researchintel/plugin.go`
- Remaining plugins

**Test Files to Create:**
- `plugins/intelligentrouter/router_test.go`
- `plugins/promptadapter/plugin_test.go`
- `plugins/researchintel/plugin_test.go`
- Additional plugin tests

**Coverage Goals:**
- Plugin initialization
- Request processing
- Error handling
- Plugin chaining

**Estimated Effort:** 3-4 days

#### 8. Wrappers Package (0% → 70%)
**Files to Test:**
- `wrappers/cliproxy/client.go`
- All wrapper implementations

**Test Files to Create:**
- `wrappers/cliproxy/client_test.go`
- `wrappers/wrapper_test.go` (integration)

**Coverage Goals:**
- Wrapper initialization
- Request proxying
- Error handling

**Estimated Effort:** 1-2 days

#### 9. Cost Engine (0% → 70%)
**Files to Test:**
- `costengine/calculator.go`
- `costengine/engine.go`

**Test Files to Create:**
- `costengine/calculator_test.go`
- `costengine/engine_test.go`

**Coverage Goals:**
- Cost calculation
- Pricing models
- Edge cases

**Estimated Effort:** 1-2 days

## Test Coverage Goals by Package

| Package | Current | Target | Priority | Effort |
|---------|---------|--------|----------|--------|
| CLI | 85% | 90% | ✅ Done | - |
| Server | 0% | 80% | 🔴 Critical | 2-3d |
| Account | 0% | 80% | 🔴 Critical | 1-2d |
| Database | 0% | 70% | 🔴 Critical | 2-3d |
| Providers | 0% | 75% | 🟡 Important | 2-3d |
| API | 0% | 70% | 🟡 Important | 3-4d |
| Infrastructure | 0% | 70% | 🟡 Important | 2-3d |
| Plugins | 20% | 80% | 🟢 Nice | 3-4d |
| Wrappers | 0% | 70% | 🟢 Nice | 1-2d |
| Cost Engine | 0% | 70% | 🟢 Nice | 1-2d |
| Config | 50% | 80% | 🟢 Nice | 1d |
| SLM | 0% | 60% | 🟢 Nice | 1-2d |

## Overall Coverage Targets

### Phase 1: MVP (Week 1-2)
- **Target:** 50% overall coverage
- **Focus:** Critical packages (Server, Account, Database)
- **Status:** Production-ready for core functionality

### Phase 2: Production (Week 2-3)
- **Target:** 70% overall coverage
- **Focus:** Important packages (Providers, API, Infrastructure)
- **Status:** Production-ready for all features

### Phase 3: Enterprise (Week 3-4)
- **Target:** 85% overall coverage
- **Focus:** All packages, edge cases, integration tests
- **Status:** Enterprise-ready with comprehensive testing

## Test Infrastructure

### Test Utilities Needed
- [x] CLI test utilities (`testutil`)
- [ ] Server test utilities (mock server, test clients)
- [ ] Database test utilities (test DB, migrations)
- [ ] Provider test utilities (mock providers)
- [ ] API test utilities (HTTP test client)

### Test Fixtures Needed
- [ ] Test database schema
- [ ] Sample API keys (test values)
- [ ] Mock provider responses
- [ ] Test configuration files

### Integration Test Setup
- [ ] Docker compose for test services
- [ ] Test database setup/teardown
- [ ] Mock external services
- [ ] CI/CD test pipeline

## Implementation Strategy

### Week 1: Critical Tests
1. Fix remaining CLI test issues
2. Server package tests
3. Account package tests
4. Database package tests

### Week 2: Core Functionality
5. Providers package tests
6. API package tests
7. Infrastructure package tests

### Week 3: Polish
8. Plugins package tests
9. Wrappers package tests
10. Cost engine tests
11. Integration tests

### Week 4: Enterprise
12. Edge case coverage
13. Performance tests
14. Security tests
15. Documentation

## Success Metrics

### Coverage Metrics
- **Current:** ~5% overall
- **Week 1 Target:** 50% overall
- **Week 2 Target:** 70% overall
- **Week 3 Target:** 85% overall
- **Final Target:** 90%+ overall

### Quality Metrics
- All critical paths tested
- All error paths tested
- Integration tests passing
- Performance benchmarks established
- Security tests in place

## Next Steps

1. ✅ **DONE:** Fix CLI tests
2. ⏭️ **NEXT:** Create server package tests
3. ⏭️ **NEXT:** Create account package tests
4. ⏭️ **NEXT:** Create database package tests
5. ⏭️ **NEXT:** Set up test infrastructure
6. ⏭️ **NEXT:** Create integration test suite

---

**Total Estimated Effort:** 18-28 person-days (3-4 weeks)
**Team Size:** 1-2 developers
**Timeline:** 3-4 weeks to 85%+ coverage
