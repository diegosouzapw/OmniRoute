---
title: "Monitoring & Costs — Navigation Structure"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Monitoring & Costs — Struktura nawigacji

> Zaimplementowane w Group B (plan 16). Zobacz `src/shared/constants/sidebarVisibility.ts`.

---

## Nawigacja wysokopoziomowa

Pasek boczny dashboardu (po Group B) ma następujące sekcje najwyższego poziomu w kolejności:

```
Home
Providers
Combos
API Keys
Settings
Analytics
Costs          ← NEW (Group B, plan 16)
Monitoring     ← REORGANIZED (Group B, plan 16)
...
```

---

## Sekcja Costs (nowa, poziom 1)

Prefiks ścieżki: `/dashboard/costs/`

| Element       | URL                                  | Opis                                                     |
| ------------- | ------------------------------------ | -------------------------------------------------------- |
| Overview      | `/dashboard/costs`                   | Zagregowany dashboard kosztów (przeniesiony z Analytics) |
| Pricing       | `/dashboard/costs/pricing`           | Tabela cen per model                                     |
| Budget        | `/dashboard/costs/budget`            | Progi budżetu + alerty                                   |
| Quota Sharing | `/dashboard/costs/quota-share`       | Pule Quota Share + użycie                                |
| Plan Config   | `/dashboard/costs/quota-share/plans` | Nadpisania planów per provider                           |

**Uzasadnienie**: Pricing, Budget i Quota Sharing były wcześniej pod
`Monitoring > Costs Parameters`. Przeniesienie ich do dedykowanej sekcji
najwyższego poziomu sprawia, że są odkrywalne bez nawigowania przez narzędzia
obserwowalności.

---

## Sekcja Monitoring (zreorganizowana)

Sekcja Monitoring ma teraz **Activity na górze**, a następnie **3 podgrupy**:

```
Monitoring
├── Activity             ← Timeline feed (top-level item)
├── Logs group
│   ├── Logs (all)
│   ├── Proxy Logs
│   └── Console Logs
├── Audit group
│   ├── Audit Log
│   ├── MCP Audit
│   └── A2A Audit
└── System group
    ├── Health
    └── Runtime
```

### Co się zmieniło względem starej struktury

| Przed                                                                               | Po                                                 |
| ----------------------------------------------------------------------------------- | -------------------------------------------------- |
| Activity = zakładka wewnątrz Logs renderująca Audit Log                             | Activity = dedykowany feed (`/dashboard/activity`) |
| Grupa Costs Parameters w Monitoring                                                 | Przeniesiona do sekcji Costs                       |
| Płaska lista: Logs, Activity (logs), Audit, Health, Runtime, Pricing, Budget, Quota | Ustrukturyzowane 3 grupy + dedykowana sekcja Costs |

---

## Activity vs Audit Log

Te dwa elementy są teraz rozdzielone:

| Wymiar                   | Activity (`/dashboard/activity`)                             | Audit Log (`/dashboard/audit`)            |
| ------------------------ | ------------------------------------------------------------ | ----------------------------------------- |
| **Cel**                  | Feed zdarzeń dla użytkownika („co się ostatnio działo”)      | Dziennik compliance / security            |
| **Źródło danych**        | `GET /api/compliance/audit-log?level=high`                   | `GET /api/compliance/audit-log?level=all` |
| **Format**               | Oś czasu, grupowana według dnia, czytelne czasowniki + ikony | Gęsta tabela stronicowana, 50/stronę      |
| **Filtry**               | Kategoria typu zdarzenia                                     | Action, severity, actor, zakres dat       |
| **Eksport**              | Niedostępny                                                  | Eksport JSON                              |
| **Filtr actora**         | Nie dotyczy                                                  | Filtrowalny według actora                 |
| **Pokazywane zdarzenia** | Tylko akcje wysokopoziomowe (allowlist)                      | Wszystkie zdarzenia audytu                |

### Allowlista akcji wysokopoziomowych

Zdefiniowana w `src/lib/audit/highLevelActions.ts`. Kontroluje, które zdarzenia
pojawiają się w feedzie Activity. Allowlista obejmuje:

- Zdarzenia provider add/remove/test
- Combo create/update/delete
- Cykl życia klucza API (create, revoke, rotate)
- Osiągnięcie progu budżetu
- Auth login/logout
- Tworzenie sesji cloud agent
- Rejestracja narzędzia MCP
- Webhook create/delete
- Zmiany puli/planu quota (`quota.*` actions, Group B)
- Zdarzenia platformy (update, deploy)
- Skill install/remove

Zdarzenia spoza tej listy pojawiają się tylko w Audit Log.

### Dodawanie nowej akcji wysokopoziomowej

Edytuj `src/lib/audit/highLevelActions.ts` i dodaj ciąg akcji do
`HIGH_LEVEL_ACTIONS`. Wymaga to PR (lista jest w kodzie, nie konfigurowalna w DB).
Odpowiednią ikonę można dodać w `src/lib/audit/activityIcons.ts`.

---

## Przekierowanie: `/dashboard/logs/activity`

Stara ścieżka `/dashboard/logs/activity` jest trwale przekierowywana (HTTP 308) do
`/dashboard/activity` przez `permanentRedirect()` w
`src/app/(dashboard)/dashboard/logs/activity/page.tsx`.

Legacy ID paska bocznego `logs-activity` jest zachowane w `HIDEABLE_SIDEBAR_ITEM_IDS`
(ale usunięte z `SIDEBAR_DEFINITIONS`), aby nie psuć presetów użytkownika, które
odwołują się do starego ID.

---

## i18n

Przestrzenie nazw dodane przez Group B:

| Klucz namespace         | Obejmuje                                                               |
| ----------------------- | ---------------------------------------------------------------------- |
| `sidebar.costsSection`  | Etykieta sekcji Costs                                                  |
| `sidebar.activity`      | Element paska bocznego Activity                                        |
| `sidebar.logsGroup`     | Etykieta podgrupy Logs                                                 |
| `sidebar.systemGroup`   | Etykieta podgrupy System                                               |
| `sidebar.costsOverview` | Element overview Costs                                                 |
| `activity.*`            | Wszystkie stringi strony Activity (title, verbs, filters, empty state) |

Locale źródła prawdy: `pt-BR` i `en`. Pozostałe 39 locale'i wraca do
angielskiego przez mechanizm fallback `next-intl` (skonfigurowany w `src/i18n/config.ts`).
