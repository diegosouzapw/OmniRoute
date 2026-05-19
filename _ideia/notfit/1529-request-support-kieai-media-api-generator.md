# Feature: [Feature] Request: Support Kie.ai Media API Generator

> GitHub Issue: #1529 — opened by @wauputr4 on 2026-04-23T10:42:35Z
> Status: 📋 Cataloged | Priority: TBD

## 📝 Original Request

### Summary
Support Kie.ai as a provider for the Media API Generator. Kie.ai offers a unified API for various AI models including video, image, and music generation.

### Details
- **Provider:** Kie.ai
- **Documentation:** https://docs.kie.ai
- **Base URL:** https://api.kie.ai
- **Capabilities:**
  - **Video:** Veo 3.1, Runway Aleph, Sora2
  - **Image:** Flux.1, Midjourney, etc.
  - **Music:** Suno (V3.5, V4, V4.5 Plus)
- **Workflow:** Asynchronous task model (Submit task -> Task ID -> Poll status -> Download URL).

### Benefits
Integrating Kie.ai would allow OmniRoute users to access multiple state-of-the-art media generation models through a single provider integration.

## 💬 Community Discussion

**@edwardsconnects90** (2026-04-23T19:46:38Z):
+++ I also like this provider, I hope there will be a possibility to add it
---
**@diegosouzapw** (2026-04-25T15:03:03Z):
Thank you for the suggestion, @wauputr4! Kie.ai looks like a strong candidate for the media generation pipeline — its async task-based model (submit → poll → download) is similar to our existing RunwayML integration, so the executor pattern would translate well.

We'll track this as a provider onboarding candidate for a future release cycle. The key implementation pieces would be:
1. A task-based executor in `open-sse/executors/` with polling logic
2. Provider registration in `src/shared/constants/providers.ts`
3. Coverage for video, image, and music modalities

Keeping this open for tracking.
---


### Participants

- @edwardsconnects90
- @diegosouzapw
- @wauputr4

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
