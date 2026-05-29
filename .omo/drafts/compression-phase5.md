# Draft: Compression Phase 5 — Dashboard UI & Analytics

## Requirements (confirmed from issue #1590)
- `/dashboard/compression` page: dedicated settings page (issue lists this BUT settings already exist in Settings > AI tab via CompressionSettingsTab.tsx — needs clarification)
- Analytics tab on existing `/dashboard/analytics` page: compression savings charts, cumulative counter, per-provider table
- Combo builder: per-target compression mode dropdown
- Request log detail modal: compression stats inline (tokens saved, mode, techniques, latency)
- Compression Preview in Translator Playground: side-by-side original vs compressed
- `compression_analytics` DB table + migration 032
- `/api/analytics/compression` endpoint
- i18n all new keys (33 locale files)
- Responsive/mobile

## Technical Decisions
- [analytics table]: New migration `032_compression_analytics.sql` (next after 031)
- [settings page]: CompressionSettingsTab already exists in Settings > AI tab — Phase 5 adds analytics tab + combo override UI + log detail + playground preview (NOT duplicate settings page)
- [charts]: No new charting lib — use CSS bar/progress patterns matching existing SearchAnalyticsTab style (no recharts/chart.js)
- [ultra mode]: NOT in MODES array of CompressionSettingsTab yet — add it in Phase 5

## Research Findings
- Migration numbering: latest is `031_aggressive_compression.sql` → next is `032`
- Analytics API pattern: `src/app/api/usage/analytics/route.ts` — reads from SQLite directly
- Search analytics pattern: `SearchAnalyticsTab.tsx` — CSS-only charts (StatCard + ProviderBar), no external lib
- Settings tab pattern: tabs array in `settings/page.tsx` — add "compression" tab there OR add analytics to existing AI tab
- CompressionLogTab: already exists in logs page — Phase 5 adds ANALYTICS (aggregated) not raw logs
- Combo structure: `src/app/(dashboard)/dashboard/combos/` — 3 files only, BuilderIntelligentStep.tsx is the combo target editor
- Existing compression API: `GET/PUT /api/settings/compression` — full CRUD already done

## Open Questions
- [RESOLVED] CompressionSettingsTab already exists → Phase 5 scope = Analytics tab + combo override UI + log detail enhancement + playground preview
- [OPEN] Does the combo builder currently support per-target compression override fields? (need to read BuilderIntelligentStep.tsx)

## Scope Boundaries
- INCLUDE: CompressionAnalyticsTab component, analytics API endpoint, migration 032, combo builder compression dropdown, log detail modal enhancement, playground preview mode, i18n keys, ultra mode in settings tab
- EXCLUDE: Re-implementing CompressionSettingsTab (already done), new charting library, Phase 6 MCP tools
