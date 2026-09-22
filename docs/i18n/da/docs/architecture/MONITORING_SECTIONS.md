# Monitoring & Costs — Navigation Structure (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇪 [de](../../../de/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇸 [es](../../../es/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇪 [et](../../../et/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇩 [id](../../../id/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇹 [it](../../../it/docs/architecture/MONITORING_SECTIONS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇴 [no](../../../no/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇭 [th](../../../th/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/MONITORING_SECTIONS.md)

---

> Implementeret i Gruppe B (plan 16). Se `src/shared/constants/sidebarVisibility.ts`.

---

## Navigation på højt niveau

Dashboardets sidebjælke (efter Gruppe B) har følgende sektioner på øverste niveau i denne rækkefølge:

```
Hjem
Udbydere
Kombinationer
API-nøgler
Indstillinger
Analyse
Omkostninger    ← NY (Gruppe B, plan 16)
Overvågning      ← OMORGANISERET (Gruppe B, plan 16)
...
```

---

## Sektionen Omkostninger (ny, niveau 1)

Stipræfiks: `/dashboard/costs/`

| Element           | URL                                  | Beskrivelse                                       |
| ----------------- | ------------------------------------ | ------------------------------------------------- |
| Oversigt          | `/dashboard/costs`                   | Samlet omkostningsdashboard (flyttet fra Analyse) |
| Priser            | `/dashboard/costs/pricing`           | Pristabel pr. model                               |
| Budget            | `/dashboard/costs/budget`            | Budgetgrænser + advarsler                         |
| Kvotedeling       | `/dashboard/costs/quota-share`       | Kvotedelingspuljer + forbrug                      |
| Plankonfiguration | `/dashboard/costs/quota-share/plans` | Plantilpasninger pr. udbyder                      |

**Begrundelse**: Priser, Budget og Kvotedeling lå tidligere under
`Overvågning > Omkostningsparametre`. Ved at flytte dem til en dedikeret sektion
på øverste niveau bliver de nemmere at finde uden at skulle navigere gennem
observerbarhedsværktøjer.

---

## Sektionen Overvågning (omorganiseret)

Sektionen Overvågning har nu **Aktivitet øverst** efterfulgt af **3 undergrupper**:

```
Overvågning
├── Aktivitet             ← Tidslinjefeed (element på øverste niveau)
├── Loggruppe
│   ├── Logfiler (alle)
│   ├── Proxylogfiler
│   └── Konsollogfiler
├── Revisionsgruppe
│   ├── Revisionslog
│   ├── MCP-revision
│   └── A2A-revision
└── Systemgruppe
    ├── Helbred
    └── Kørselstid
```

### Hvad der er ændret fra den gamle struktur

| Før                                                                                              | Efter                                                         |
| ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------- |
| Aktivitet = fane i Logfiler, der viste Revisionsloggen                                           | Aktivitet = dedikeret feed (`/dashboard/activity`)            |
| Gruppen Omkostningsparametre under Overvågning                                                   | Flyttet til sektionen Omkostninger                            |
| Flad liste: Logfiler, Aktivitet (logfiler), Revision, Helbred, Kørselstid, Priser, Budget, Kvote | Struktureret i 3 grupper + dedikeret sektion til Omkostninger |

---

## Aktivitet kontra Revisionslog

Disse to er nu adskilte:

| Dimension           | Aktivitet (`/dashboard/activity`)                       | Revisionslog (`/dashboard/audit`)          |
| ------------------- | ------------------------------------------------------- | ------------------------------------------ |
| **Formål**          | Brugervendt hændelsesfeed ("hvad skete der for nylig")  | Compliance-/sikkerhedslog                  |
| **Datakilde**       | `GET /api/compliance/audit-log?level=high`              | `GET /api/compliance/audit-log?level=all`  |
| **Format**          | Tidslinje, grupperet efter dag, læsbare verber + ikoner | Kompakt sideinddelt tabel, 50/side         |
| **Filtre**          | Hændelsestypekategori                                   | Handling, alvorlighed, aktør, datointerval |
| **Eksport**         | Ikke tilgængelig                                        | JSON-eksport                               |
| **Aktørfilter**     | Ikke relevant                                           | Kan filtreres efter aktør                  |
| **Viste hændelser** | Kun handlinger på højt niveau (tilladelsesliste)        | Alle revisionshændelser                    |

### Tilladelsesliste for handlinger på højt niveau

Defineret i `src/lib/audit/highLevelActions.ts`. Styrer, hvilke hændelser der vises i
Aktivitetsfeedet. Tilladelseslisten omfatter:

- Hændelser for tilføjelse/fjernelse/test af udbydere
- Oprettelse/opdatering/sletning af kombinationer
- API-nøglers livscyklus (oprettelse, tilbagekaldelse, rotation)
- Budgetgrænse nået
- Login/logout for godkendelse
- Oprettelse af cloudagentsession
- Registrering af MCP-værktøj
- Oprettelse/sletning af webhook
- Ændringer af kvotepuljer/-planer (`quota.*`-handlinger, Gruppe B)
- Platformshændelser (opdatering, udrulning)
- Installation/fjernelse af færdighed

Hændelser, der ikke er på denne liste, vises kun i Revisionsloggen.

### Tilføjelse af en ny handling på højt niveau

Rediger `src/lib/audit/highLevelActions.ts`, og føj handlingsstrengen til
`HIGH_LEVEL_ACTIONS`. Dette kræver en PR (listen er kode og kan ikke konfigureres
via databasen). Det tilsvarende ikon kan føjes til `src/lib/audit/activityIcons.ts`.

---

## Omdirigering: `/dashboard/logs/activity`

Den gamle sti `/dashboard/logs/activity` omdirigeres permanent (HTTP 308) til
`/dashboard/activity` via `permanentRedirect()` i
`src/app/(dashboard)/dashboard/logs/activity/page.tsx`.

Det ældre sidebjælke-ID `logs-activity` er bevaret i `HIDEABLE_SIDEBAR_ITEM_IDS`
(men fjernet fra `SIDEBAR_DEFINITIONS`) for at undgå at ødelægge brugerforudindstillinger,
der henviser til det gamle ID.

---

## i18n

Namespaces tilføjet af Gruppe B:

| Namespace-nøgle         | Omfatter                                                              |
| ----------------------- | --------------------------------------------------------------------- |
| `sidebar.costsSection`  | Etiket for sektionen Omkostninger                                     |
| `sidebar.activity`      | Elementet Aktivitet i sidebjælken                                     |
| `sidebar.logsGroup`     | Etiket for undergruppen Logfiler                                      |
| `sidebar.systemGroup`   | Etiket for undergruppen System                                        |
| `sidebar.costsOverview` | Elementet Omkostningsoversigt                                         |
| `activity.*`            | Alle strenge på Aktivitetssiden (titel, verber, filtre, tom tilstand) |

De autoritative landestandarder er `pt-BR` og `en`. Alle øvrige 40 landestandarder
falder tilbage til engelsk via fallback-mekanismen i `next-intl` (konfigureret i
`src/i18n/config.ts`).
