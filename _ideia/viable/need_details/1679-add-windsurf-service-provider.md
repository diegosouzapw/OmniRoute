# Feature: [Feature] Add Windsurf service provider

> GitHub Issue: #1679 — opened by @tranduykhanh030 on 2026-04-27T13:26:01Z
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

### Problem / Use Case

The service is offering a 15-day free trial, which is a great way for us to save costs.

### Proposed Solution

It’s great that we already have Cursor, and even better now that we have another option with Windsurf via https://windsurf.com/show-auth-token

### Alternatives Considered

_No response_

### Acceptance Criteria

<img width="505" height="716" alt="Image" src="https://github.com/user-attachments/assets/728e42e2-e24c-4fd5-83ab-7f06818c2590" />

I’ve integrated it into your project and it works very well with Opus 4–7. However, it’s not performing well with OpenAI yet—I hope you can improve it for the official release.

### Area

Provider Support

### Related Provider(s)

Windsurf

### Additional Context

_No response_

### Expected Test Plan

_No response_

## 💬 Community Discussion

**@crakindee2k-a11y** (2026-04-27T15:58:31Z):
This!
---
**@DIMFLIX** (2026-04-27T19:47:46Z):
bump
---
**@diegosouzapw** (2026-04-28T02:12:06Z):
Thank you for the feature request, @tranduykhanh030! Windsurf is an interesting OAuth-based coding assistant provider.

Adding Windsurf would follow our existing OAuth provider pattern:
1. OAuth constants in `src/lib/oauth/constants/oauth.ts` (using the `show-auth-token` endpoint)
2. Executor in `open-sse/executors/` (likely extending the base executor with Windsurf-specific auth flow)
3. Token refresh flow in `open-sse/services/tokenRefresh.ts`

We note your mention that it works well with Claude Opus 4–7 but not with OpenAI yet — that's valuable feedback for prioritizing the integration. Tracking this for a future provider onboarding wave.
---
**@wtf403** (2026-04-29T00:14:35Z):
bump
---


### Participants

- @wtf403
- @crakindee2k-a11y
- @diegosouzapw
- @tranduykhanh030
- @DIMFLIX

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
