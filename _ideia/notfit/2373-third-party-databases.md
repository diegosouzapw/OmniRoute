# Feature: Request support for third-party databases, such as Supabase.

> GitHub Issue: #2373 — opened by @ohyoxo on 2026-05-18T13:58:32Z
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

### Problem / Use Case

I want to deploy this project to a cloud platform like Render, but the free plan doesn't support persistent storage. We can achieve persistence by connecting to a third-party database.

### Proposed Solution

Request support for third-party databases, such as Supabase.

### Alternatives Considered

_No response_

### Acceptance Criteria

Request support for third-party databases, such as Supabase.

### Area

Docker / Deployment

### Related Provider(s)

_No response_

### Additional Context

_No response_

### Expected Test Plan

_No response_

## 💬 Community Discussion

No comments yet.

## 🎯 Refined Feature Description

The user wants to connect OmniRoute to a third-party PostgreSQL database like Supabase because cloud platforms like Render don't support persistent storage for SQLite.
However, OmniRoute is heavily built around `better-sqlite3`, utilizing its synchronous nature for extreme performance, and has over 45+ domain modules directly interacting with it. Migrating to an asynchronous Postgres/Supabase driver would be a massive rewrite of the entire data layer and is outside the core scope of OmniRoute which values simple self-hosted setups.

### What it solves
- Enables serverless/ephemeral container deployments.

### How it should work (high level)
- N/A - Too complex/out of scope.

### Affected areas
- `src/lib/db/*` (45+ files)

## 📎 Attachments & References
- None

## 🔗 Related Ideas
- None
