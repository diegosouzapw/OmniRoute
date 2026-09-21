# Monitoring & Costs — Navigation Structure (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇰 [da](../../../da/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇪 [de](../../../de/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇸 [es](../../../es/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇪 [et](../../../et/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇩 [id](../../../id/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇹 [it](../../../it/docs/architecture/MONITORING_SECTIONS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇴 [no](../../../no/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇭 [th](../../../th/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/MONITORING_SECTIONS.md)

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

Przestrzenie nazw dodane przez grupę B:

| Klucz przestrzeni nazw  | Obejmuje                                                                    |
| ----------------------- | --------------------------------------------------------------------------- |
| `sidebar.costsSection`  | Etykieta sekcji kosztów                                                     |
| `sidebar.activity`      | Element „Aktywność” na pasku bocznym                                        |
| `sidebar.logsGroup`     | Etykieta podgrupy dzienników                                                |
| `sidebar.systemGroup`   | Etykieta podgrupy systemowej                                                |
| `sidebar.costsOverview` | Element przeglądu kosztów                                                   |
| `activity.*`            | Wszystkie teksty strony „Aktywność” (tytuł, czasowniki, filtry, stan pusty) |

Źródłowe ustawienia regionalne: `pt-BR` i `en`. Wszystkie pozostałe 40 ustawień regionalnych korzystają z zapasowego
języka angielskiego za pośrednictwem mechanizmu awaryjnego `next-intl` (skonfigurowanego w `src/i18n/config.ts`).
