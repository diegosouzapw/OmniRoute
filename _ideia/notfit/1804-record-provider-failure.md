# Feature: Record Provider Failure for Circuit Breaker

> GitHub Issue: #1804 — opened by @matteoantoci on 2026-04-30T07:17:59Z
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

`recordProviderFailure()` is dead code — circuit breaker never activates.

## 💬 Community Discussion
None

## 🎯 Refined Feature Description

Integrate `recordProviderFailure()` in `combo.ts` to properly trip circuit breakers on provider failure.

> ℹ️ This issue has already been resolved in a previous PR/commit and exists in `release/v3.7.6`.
