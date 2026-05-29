# Work Plan: Separate Proxy Page with Sub-Tabs

## TL;DR
> Create a **new dedicated Proxy page** under the System section with **sub-tabs** for HTTP Proxy and MITM Proxy, replacing the current scattered proxy settings in Settings page.

**Deliverables:**
- New `/dashboard/system/proxy/page.tsx` with sub-tabs
- Updated sidebar navigation (add Proxy to System sections)
- Remove ProxyTab from Settings → Advanced tab
- Update i18n labels

**Estimated Effort:** Medium (1-2 days)
**Parallel Execution:** NO - sequential due to component reuse
**Critical Path:** Create page → Add navigation → Remove old → Test

---

## Context

### User Requirement
- Current proxy settings are scattered (HTTP Proxy in "advanced" tab, MITM Proxy in separate "mitm" tab)
- Both are complex and need clear separation
- User requested a "Separate Proxy page under System sections" with sub-tabs

### Current Structure
| Tab | Location | Proxy Type |
|-----|----------|----------|
| advanced | Settings | HTTP Proxy (ProxyTab) |
| mitm | Settings | MITM Proxy (MitmProxyTab) |

### Target Structure
```
Dashboard → System → Proxy (new page)
├── HTTP Proxy sub-tab    (moves from Settings → Advanced)
└── MITM Proxy sub-tab (moves from Settings → mitm)
```

---

## Work Objectives

### Core Objective
Create a new Proxy management page with clear sub-tab navigation for HTTP Proxy and MITM Proxy settings.

### Concrete Deliverables
1. New Proxy page: `/dashboard/system/proxy/page.tsx`
2. Sub-tab navigation with i18n labels
3. HTTP Proxy content (moved from ProxyTab.tsx)
4. MITM Proxy content (moved from MitmProxyTab.tsx)
5. **1proxy content (moved from OneproxyTab.tsx in Settings → Advanced)**
6. Updated sidebar navigation with Proxy entry under System
7. Remove ProxyTab from Settings → Advanced tab
8. Update Settings → mitm tab redirect or hide

### Must Have
- Sub-tab switching works correctly
- Both proxy types fully functional after move
- **1proxy sync works after move**
- **1proxy rotation works after move**
- Sidebar navigation updated

### Must NOT Have
- Duplicate proxy settings (must remove from old locations)
- Breaking existing functionality

---

## Verification Strategy

### Test Decision
- **Infrastructure exists**: YES
- **Automated tests**: NO - manual UI testing
- **Framework**: N/A

### QA Policy
All verification is agent-executed via UI testing.

**QA Scenarios:**
1. Navigate to new Proxy page via sidebar
2. Switch between HTTP Proxy, MITM Proxy, and 1proxy sub-tabs
3. Configure HTTP proxy settings and verify saved
4. Verify MITM proxy controls still work
5. **1proxy: Click Sync and verify proxies are fetched from https://1proxy-api.aitradepulse.com**
6. **1proxy: Test proxy rotation (get next proxy)**
7. **1proxy: Verify proxy list displays with quality scores**
8. Verify old locations removed/redirected

---

## Execution Strategy

### Task Breakdown

```
Task 1: Create /dashboard/system/proxy directory and page.tsx with sub-tabs
Task 2: Add HTTP Proxy content to sub-tab
Task 3: Add MITM Proxy content to sub-tab  
Task 4: Add Proxy to sidebar in sidebarVisibility.ts
Task 5: Add i18n labels for Proxy sidebar item
Task 6: Remove ProxyTab from Settings → Advanced tab
Task 7: Handle Settings mitm tab (redirect or remove)
Task 8: Test and verify
```

---

## TODOs

- [x] 1. Create Proxy page structure with sub-tabs

  **What to do**:
  - Create `/dashboard/system/proxy/page.tsx`
  - Create sub-tab navigation (HTTP Proxy | MITM Proxy)
  - Add i18n labels
  
  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: UI component with navigation
  - **Skills**: []
    - none needed

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Sequential with**: Task 2, Task 3
  - **Blocks**: Task 4

  **References**:
  - `src/app/(dashboard)/dashboard/settings/page.tsx:29-38` - tabs array pattern
  - `src/app/(dashboard)/dashboard/settings/components/ProxyTab.tsx` - existing proxy content

  **Acceptance Criteria**:
  - [ ] New Proxy page route works: /dashboard/system/proxy
  - [ ] Sub-tabs render correctly

- [x] 2. Add HTTP Proxy content to sub-tab

  **What to do**:
  - Import ProxyTab component into new page
  - Render in HTTP Proxy sub-tab
  
  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Component reuse, not new UI
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 3)
  - **Parallel Group**: Tasks 2-3
  - **Blocks**: Task 7

  **References**:
  - `src/app/(dashboard)/dashboard/settings/components/ProxyTab.tsx`

  **Acceptance Criteria**:
  - [ ] HTTP Proxy sub-tab shows proxy settings
  - [ ] Global proxy config works

- [x] 3. Add MITM Proxy content to sub-tab

  **What to do**:
  - Import MitmProxyTab component into new page
  - Render in MITM Proxy sub-tab
  
  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Component reuse
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: YES (with Task 2)
  - **Parallel Group**: Tasks 2-3
  - **Blocks**: Task 7

  **References**:
  - `src/app/(dashboard)/dashboard/settings/components/MitmProxyTab.tsx`

  **Acceptance Criteria**:
  - [ ] MITM Proxy sub-tab shows MITM settings
  - [ ] Start/stop controls work

- [x] 4. Add Proxy to sidebar (sidebarVisibility.ts, NOT Sidebar.tsx)

  **What to do**:
  - Add Proxy item to SYSTEM_SIDEBAR_ITEMS array in sidebarVisibility.ts
  - NOT Sidebar.tsx - it's data-driven
  
  **Correct file path**: `src/shared/constants/sidebarVisibility.ts:83-89`
  ```typescript
  const SYSTEM_SIDEBAR_ITEMS: readonly SidebarItemDefinition[] = [
    { id: "logs", href: "/dashboard/logs", i18nKey: "logs", icon: "description" },
    { id: "audit", href: "/dashboard/audit", i18nKey: "auditLog", icon: "policy" },
    { id: "webhooks", href: "/dashboard/webhooks", i18nKey: "webhooks", icon: "webhook" },
    { id: "health", href: "/dashboard/health", i18nKey: "health", icon: "health_and_safety" },
    // ADD NEW: { id: "proxy", href: "/dashboard/system/proxy", i18nKey: "proxy", icon: "vpn" },
    { id: "settings", href: "/dashboard/settings", i18nKey: "settings", icon: "settings" },
  ];
  ```
  
  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Data array addition only
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **After**: Task 1
  - **Blocks**: Task 8

  **References**:
  - `src/shared/constants/sidebarVisibility.ts:83-89` - SYSTEM_SIDEBAR_ITEMS location
  - `src/shared/constants/sidebarVisibility.ts:103-136` - SIDEBAR_SECTIONS structure

  **Acceptance Criteria**:
  - [ ] Proxy entry added to System section
  - [ ] Click navigates to /dashboard/system/proxy

- [x] 6. Remove ProxyTab from Settings

  **What to do**:
  - Remove ProxyTab from Settings → Advanced tab rendering
  - Remove from imports
  
  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple removal
  - **Skills**: []

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **After**: Tasks 2-4
  - **Blocks**: Task 7

  **References**:
  - `src/app/(dashboard)/dashboard/settings/page.tsx:125-131`

  **Acceptance Criteria**:
  - [ ] ProxyTab no longer in Settings → Advanced
  - [ ] Page loads without error

- [x] 7. Clean up Settings mitm tab

  **What to do**:
  - Option A: Remove mitm tab from settings/page.tsx tabs array
  - Option B: Keep but show redirect message to /dashboard/system/proxy
  - Recommend Option A (clean migration)
  
  **Recommended Agent Profile**:
  - **Category**: `quick`
    - Reason: Simple removal
  - **Skills**: []

  **Acceptance Criteria**:
  - [ ] mitm tab removed from Settings (migrated)

- [x] 8. Test and verify

  **What to do**:
  - Run full functional test
  - Verify build passes
  
  **Recommended Agent Profile**:
  - **Category**: `unspecified-high`
    - Reason: Overall verification
  - **Skills**: []

  **Acceptance Criteria**:
  - [ ] npm run build succeeds
  - [ ] All proxy features work

---

## Final Verification Wave

- [x] F1. Plan compliance check (oracle)
- [x] F2. Code quality check
- [x] F3. Manual UI test
- [x] F4. Scope check

---

## Commit Strategy

- **1**: `feat(ui): add dedicated Proxy page with HTTP/MITM sub-tabs` 
  - Files: system proxy page, sidebar update, settings cleanup

---

## Success Criteria

### Verification Commands
```bash
npm run build  # Must pass
```

### Final Checklist
- [x] New /dashboard/system/proxy page works
- [x] HTTP Proxy sub-tab functional
- [x] MITM Proxy sub-tab functional
- [x] Sidebar shows Proxy under System
- [x] Old locations cleaned up