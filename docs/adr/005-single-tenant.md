# ADR-005: Single-Tenant Architecture

**Date:** 2025-10-01  
**Status:** Accepted  
**Deciders:** @diegosouzapw

## Context

OmniRoute needs to decide between single-tenant and multi-tenant architecture. The primary use case is individuals and small teams running their own proxy instance.

## Decision

Adopt a **single-tenant architecture** where each deployment serves one user/team.

- One SQLite database per instance
- One set of API keys and credentials per instance
- Password-based login (single admin user)
- No user management, roles, or permissions beyond admin
- Settings stored in a single `settings` table

## Consequences

### Positive

- Dramatically simpler codebase (no tenant isolation, RBAC, or data partitioning)
- SQLite is perfectly suited (no concurrent multi-tenant writes)
- Easy deployment: one Docker container = one instance
- Complete data isolation between users (separate deployments)

### Negative

- Not suitable for SaaS or shared hosting without running multiple instances
- No built-in multi-user collaboration features
- Scaling requires deploying separate instances

### Neutral

- Cloud worker mode exists as a separate deployment target with different constraints
- Future multi-tenant support would require a PostgreSQL migration (see ADR-001)
