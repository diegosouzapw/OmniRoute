# Implementation Plan: Mask Email Addresses in Dashboard and Logs

> Issue: #1025
> Idea: [_ideia/viable/1025-mask-email-dashboard.md](../../_ideia/viable/1025-mask-email-dashboard.md)
> Branch: `release/v3.5.6`

## Overview

Create a `maskEmail()` utility function and apply it to all dashboard locations that display OAuth email addresses. Add a "reveal" toggle for authorized users.

## Pre-Implementation Checklist

- [x] Read provider detail page (`src/app/(dashboard)/dashboard/providers/[id]/page.tsx`)
- [x] Identified email display locations: lines 2439, 2548, 4167, 5079-5082

## Implementation Steps

### Step 1: Create `maskEmail` utility

**Files:**
- `src/shared/utils/maskEmail.ts` — NEW

**Details:**
```typescript
/**
 * Masks an email address for privacy display.
 * Example: diego.souza@gmail.com → di*********@g*****.com
 */
export function maskEmail(email: string, visibleChars = 2): string {
  if (!email || !email.includes("@")) return email;
  const [username, domain] = email.split("@");
  const [domainName, ...tld] = domain.split(".");
  const maskedUser = username.slice(0, visibleChars) + "*".repeat(Math.max(1, username.length - visibleChars));
  const maskedDomain = domainName.slice(0, 1) + "*".repeat(Math.max(1, domainName.length - 1));
  return `${maskedUser}@${maskedDomain}.${tld.join(".")}`;
}
```

### Step 2: Apply to Provider Detail Page

**Files:**
- `src/app/(dashboard)/dashboard/providers/[id]/page.tsx` — MODIFY

**Locations to update:**
1. Line ~2439: `label: conn.name || conn.email || conn.id` → `label: conn.name || maskEmail(conn.email) || conn.id`
2. Line ~2548: same pattern
3. Line ~4167: `connection.name || connection.email || connection.displayName` → use maskEmail
4. Lines ~5079-5082: Direct email display → wrap with maskEmail + optional reveal button

### Step 3: Apply to Log/HealthCheck Components

**Files:**
- Search and update any other components displaying emails in logs/health views

### Step 4: Tests

**New test files:**
- `tests/unit/mask-email.test.mjs`

**Test cases:**
- [ ] Masks standard email correctly
- [ ] Handles short usernames (1-2 chars)
- [ ] Handles missing email (returns empty/null safely)
- [ ] Handles malformed strings without @
- [ ] Preserves multi-part TLDs (e.g., .co.uk)

## Verification Plan

1. Run `npm run build` — must pass
2. Run `node --import tsx/esm --test tests/unit/mask-email.test.mjs` — all pass
3. Visual check in dashboard

## Commit Plan

```
feat: mask email addresses in dashboard for privacy (#1025)
```
