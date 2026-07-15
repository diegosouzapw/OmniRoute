# Mobile Strategy

> Decision record: Mobile access strategy for OmniRoute.

## Status

**Draft** — 2026-07-09

## Context

OmniRoute is primarily a server-side AI gateway with a web dashboard.
Users want to:
1. Check usage/quota on the go
2. Switch routing combos from mobile
3. Receive push notifications for quota limits

## Options

### Option A: Responsive Web (Recommended for v4.0)

Continue with the existing Next.js dashboard. The dashboard is already responsive.
Add PWA support (already partially configured) for offline-capable usage.

**Pros:**
- No native development cost
- Single codebase
- PWA installable on iOS and Android
- Push notifications via Web Push API

**Cons:**
- Limited access to device APIs
- No App Store presence

### Option B: React Native Wrapper (v4.5+)

Use React Native WebView to wrap the existing dashboard with native enhancements.

**Pros:**
- Native push notifications
- App Store presence
- Biometric auth

**Cons:**
- Separate build pipeline
- Maintenance overhead
- ~2 month sprint

### Option C: Native (v5.0+)

Swift + Kotlin native apps.

**Pros:**
- Full device API access
- Best UX
- App Store discoverability

**Cons:**
- 2 separate codebases
- 6+ month development
- High maintenance cost

## Decision

**Adopt Option A (Responsive Web + PWA) for v4.0**.
Re-evaluate for native in v5.0 based on user adoption.

## Implementation Plan

1. ✅ Responsive dashboard (existing)
2. ✅ PWA manifest (existing)
3. [ ] Add service worker for offline access
4. [ ] Add Web Push notification support
5. [ ] Add mobile-specific layouts for key flows
6. [ ] Test on iOS Safari and Android Chrome
