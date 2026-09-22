# Monitoring & Costs — Navigation Structure (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇰 [da](../../../da/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇪 [de](../../../de/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇸 [es](../../../es/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇪 [et](../../../et/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇩 [id](../../../id/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇹 [it](../../../it/docs/architecture/MONITORING_SECTIONS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇴 [no](../../../no/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇭 [th](../../../th/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/MONITORING_SECTIONS.md)

---

> Implementerat i Grupp B (plan 16). Se `src/shared/constants/sidebarVisibility.ts`.

---

## Övergripande navigering

Instrumentpanelens sidofält (efter Grupp B) har följande avsnitt på översta nivån, i denna ordning:

```
Hem
Leverantörer
Kombinationer
API-nycklar
Inställningar
Analys
Kostnader       ← NYTT (Grupp B, plan 16)
Övervakning     ← OMORGANISERAT (Grupp B, plan 16)
...
```

---

## Avsnittet Kostnader (nytt, nivå 1)

Sökvägsprefix: `/dashboard/costs/`

| Objekt            | URL                                  | Beskrivning                                         |
| ----------------- | ------------------------------------ | --------------------------------------------------- |
| Översikt          | `/dashboard/costs`                   | Sammanställd kostnadsöversikt (flyttad från Analys) |
| Prissättning      | `/dashboard/costs/pricing`           | Pristabell per modell                               |
| Budget            | `/dashboard/costs/budget`            | Budgettrösklar + aviseringar                        |
| Kvotdelning       | `/dashboard/costs/quota-share`       | Kvotdelningspooler + användning                     |
| Plankonfiguration | `/dashboard/costs/quota-share/plans` | Planspecifika åsidosättningar per leverantör        |

**Motivering**: Prissättning, Budget och Kvotdelning låg tidigare under
`Övervakning > Kostnadsparametrar`. Genom att flytta dem till ett eget avsnitt
på översta nivån blir de lättare att hitta utan att behöva navigera genom
observerbarhetsverktygen.

---

## Avsnittet Övervakning (omorganiserat)

Avsnittet Övervakning har nu **Aktivitet överst**, följt av **3 undergrupper**:

```
Övervakning
├── Aktivitet             ← Tidslinjeflöde (objekt på översta nivån)
├── Gruppen Loggar
│   ├── Loggar (alla)
│   ├── Proxyloggar
│   └── Konsolloggar
├── Gruppen Granskning
│   ├── Granskningslogg
│   ├── MCP-granskning
│   └── A2A-granskning
└── Gruppen System
    ├── Hälsa
    └── Körning
```

### Vad som har ändrats jämfört med den gamla strukturen

| Före                                                                                            | Efter                                                    |
| ----------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| Aktivitet = flik inuti Loggar som visade granskningsloggen                                      | Aktivitet = separat flöde (`/dashboard/activity`)        |
| Gruppen Kostnadsparametrar i Övervakning                                                        | Flyttad till avsnittet Kostnader                         |
| Platt lista: Loggar, Aktivitet (loggar), Granskning, Hälsa, Körning, Prissättning, Budget, Kvot | Strukturerad i 3 grupper + separat avsnitt för Kostnader |

---

## Aktivitet jämfört med Granskningslogg

Dessa två är nu separata:

| Dimension            | Aktivitet (`/dashboard/activity`)                     | Granskningslogg (`/dashboard/audit`)             |
| -------------------- | ----------------------------------------------------- | ------------------------------------------------ |
| **Syfte**            | Användarinriktat händelseflöde ("vad hände nyligen")  | Efterlevnads-/säkerhetslogg                      |
| **Datakälla**        | `GET /api/compliance/audit-log?level=high`            | `GET /api/compliance/audit-log?level=all`        |
| **Format**           | Tidslinje, grupperad per dag, lättlästa verb + ikoner | Kompakt sidindelad tabell, 50/sida               |
| **Filter**           | Händelsetypskategori                                  | Åtgärd, allvarlighetsgrad, aktör, datumintervall |
| **Export**           | Inte tillgänglig                                      | JSON-export                                      |
| **Aktörsfilter**     | Inte tillämpligt                                      | Kan filtreras efter aktör                        |
| **Visade händelser** | Endast åtgärder på hög nivå (tillåtelselista)         | Alla granskningshändelser                        |

### Tillåtelselista för åtgärder på hög nivå

Definieras i `src/lib/audit/highLevelActions.ts`. Styr vilka händelser som visas i
aktivitetsflödet. Tillåtelselistan innehåller:

- Händelser för att lägga till, ta bort och testa leverantörer
- Skapande, uppdatering och borttagning av kombinationer
- API-nycklars livscykel (skapa, återkalla, rotera)
- Uppnådd budgettröskel
- Inloggning/utloggning för autentisering
- Skapande av molnagentssessioner
- Registrering av MCP-verktyg
- Skapande/borttagning av webhooks
- Ändringar av kvotpooler/-planer (`quota.*`-åtgärder, Grupp B)
- Plattformshändelser (uppdatering, driftsättning)
- Installation/borttagning av färdigheter

Händelser som inte finns i denna lista visas endast i Granskningsloggen.

### Lägga till en ny åtgärd på hög nivå

Redigera `src/lib/audit/highLevelActions.ts` och lägg till åtgärdssträngen i
`HIGH_LEVEL_ACTIONS`. Detta kräver en PR (listan är kod och kan inte konfigureras
via databasen). Motsvarande ikon kan läggas till i `src/lib/audit/activityIcons.ts`.

---

## Omdirigering: `/dashboard/logs/activity`

Den gamla sökvägen `/dashboard/logs/activity` omdirigeras permanent (HTTP 308) till
`/dashboard/activity` via `permanentRedirect()` i
`src/app/(dashboard)/dashboard/logs/activity/page.tsx`.

Det äldre sidofälts-ID:t `logs-activity` bevaras i `HIDEABLE_SIDEBAR_ITEM_IDS`
(men har tagits bort från `SIDEBAR_DEFINITIONS`) för att undvika att befintliga
användarförinställningar som refererar till det gamla ID:t slutar fungera.

---

## i18n

Namnrymder som lagts till av Grupp B:

| Namnrymdsnyckel         | Omfattar                                                               |
| ----------------------- | ---------------------------------------------------------------------- |
| `sidebar.costsSection`  | Etikett för avsnittet Kostnader                                        |
| `sidebar.activity`      | Sidofältsobjektet Aktivitet                                            |
| `sidebar.logsGroup`     | Etikett för undergruppen Loggar                                        |
| `sidebar.systemGroup`   | Etikett för undergruppen System                                        |
| `sidebar.costsOverview` | Objektet Kostnadsöversikt                                              |
| `activity.*`            | Alla strängar på Aktivitetssidan (titel, verb, filter, tomt tillstånd) |

Referensspråken är `pt-BR` och `en`. Alla övriga 40 språk använder engelska som
reservspråk via reservmekanismen i `next-intl` (konfigurerad i `src/i18n/config.ts`).
