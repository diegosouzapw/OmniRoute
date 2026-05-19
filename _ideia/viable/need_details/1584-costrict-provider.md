---
issue: 1584
last_synced_at: 2026-05-19T12:30:00Z
last_synced_comment_id: 0
snapshot:
  thumbs: 0
  age_days: 23
  labels: ["enhancement"]
  state: open
  classified_at: 2026-05-01T10:53:16Z
---

# Feature: [Feature] CoStrict provider

> GitHub Issue: #1584 — opened by @uwuclxdy on 2026-04-25T11:46:48Z
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

### Problem / Use Case

I'm trying to connect [CoStrict](https://zgsm.sangfor.com) to omniroute but it uses oauth.

### Proposed Solution

Add support for CoStrict provider

### Alternatives Considered

_No response_

### Acceptance Criteria

- being able to authenticate with costrict account
- token refresh, multiple accounts (all features as the other oauth providers)

### Area

Provider Support

### Related Provider(s)

_No response_

### Additional Context

read https://claude.ai/share/5d01e7b2-5771-4a96-9067-9c7fe1b4ba7a

### Expected Test Plan

_No response_

## 💬 Community Discussion

**@diegosouzapw** (2026-04-25T15:03:30Z):
Thank you for the suggestion, @uwuclxdy. CoStrict (Sangfor's coding assistant) is an interesting OAuth-based provider.

We reviewed the shared analysis and the provider appears to use a standard OAuth 2.0 flow. Adding CoStrict would follow our existing OAuth provider pattern:
1. OAuth constants in `src/lib/oauth/constants/oauth.ts`
2. Executor in `open-sse/executors/` (likely extending the Claude Code-compatible executor given the Anthropic-style API)
3. Token refresh flow in `open-sse/services/tokenRefresh.ts`

We'll track this for a future provider onboarding wave. If you have access to the actual OAuth client endpoints and API documentation beyond the shared analysis, that would help accelerate the integration.

Keeping open for tracking.
---


### Participants

- @diegosouzapw
- @uwuclxdy

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
