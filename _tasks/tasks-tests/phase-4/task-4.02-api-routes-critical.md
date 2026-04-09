# Task 4.02 — Test: Critical API Routes (Proxies, Models, Settings)

## Metadata
- **Phase**: 4
- **Source files**:
  - `src/app/api/v1/management/proxies/route.ts` (40.39%)
  - `src/app/api/v1/models/route.ts` (52.45%)
  - `src/app/api/settings/proxy/route.ts` (51.27%)
  - `src/app/api/v1/embeddings/route.ts` (58.84%)
- **Test files to create**: One per route group in `tests/integration/`
- **Estimated assertions**: ~30

## Pre-requisites
1. Read each route file
2. Read data layer modules they depend on

## Test Scenarios

### Proxies Management (~8): CRUD; bulk assign; health check; auth required; invalid proxy URL; assignment to non-existent connection; list with filters

### Models (~8): List all models; filter by provider; model format response; catalog sync; search by name; pagination; unknown provider filter; edge: empty catalog

### Settings/Proxy (~7): Get proxy settings; update proxy; test proxy connection; invalid proxy URL → validation error; clear proxy; proxy with auth; edge: timeout

### Embeddings (~7): Provider dispatch; input normalization; response format; error: unsupported provider; dimension parameter; model resolution; auth validation

## Acceptance Criteria
- [ ] All 30 assertions pass
- [ ] Each route group coverage ≥ 65%
