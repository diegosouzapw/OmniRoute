---
issue: 1594
last_synced_at: 2026-05-19T12:30:00Z
last_synced_comment_id: 0
snapshot:
  thumbs: 0
  age_days: 23
  labels: ["enhancement"]
  state: open
  classified_at: 2026-05-01T10:53:13Z
---

# Feature: [Feature] permanent provider or the internal key inside the provider

> GitHub Issue: #1594 — opened by @newbe36524 on 2026-04-25T13:58:11Z
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

### Problem / Use Case

My upstream provider is an account pool. It occasionally returns temporary error messages due to exceptions, such as 403, 401 and other similar status codes.I want to retain and return these original errors without automatically downgrading the provider.The provider is still fully valid, and the issue can be resolved simply by retrying at the downstream level.

### Proposed Solution

I want to exclude specific providers or their keys from the break mechanism, so that they remain permanently enabled and will never be downgraded under any circumstances.
Currently, I rely on an external standalone process to check every second whether these providers have been downgraded, and re-enable them automatically if so. This workaround is cumbersome and inconvenient.

### Alternatives Considered

_No response_

### Acceptance Criteria

Provider can be set as permanent alive

### Area

Proxy / Routing

### Related Provider(s)

Custom provider

### Additional Context

_No response_

### Expected Test Plan

_No response_

## 💬 Community Discussion

**@diegosouzapw** (2026-04-25T15:03:31Z):
Thank you for the feature request, @newbe36524. This is a valid use case — account pool providers where transient 403/401 errors are expected and should be retried by the downstream client rather than triggering the circuit breaker.

OmniRoute v3.7.0 already made progress in this direction:
- **Removed 429 from `PROVIDER_FAILURE_ERROR_CODES`** — rate limits no longer trigger the provider-wide circuit breaker
- **Configurable failure thresholds** via `PROVIDER_PROFILES` — different provider types can have different tolerance levels

What you're describing would be a natural extension: a per-provider or per-connection **`circuitBreakerEnabled: false`** flag that completely bypasses the circuit breaker for specific connections, letting all errors pass through as-is for the downstream client to handle.

Implementation would touch:
- `open-sse/services/accountFallback.ts` — skip `markProviderFailure()` when flag is set
- Provider `providerSpecificData` schema — add `circuitBreakerBypass: boolean`
- Dashboard UI — toggle in the provider connection settings

Keeping open for tracking. This is a clean, scoped feature that could land in a near-term release.
---


### Participants

- @newbe36524
- @diegosouzapw

### Key Points

- Needs detailed analysis

## 🎯 Refined Feature Description

Feature needs manual refinement and interpretation to fill logical gaps and outline high-level technical scope.

### What it solves

- TBD

### How it should work (high level)

1. TBD
2. TBD

### Affected areas

- TBD

## 📎 Attachments & References

- Check issue body for references

## 🔗 Related Ideas

- None yet
