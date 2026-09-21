# Monitoring & Costs — Navigation Structure (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇰 [da](../../../da/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇪 [de](../../../de/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇸 [es](../../../es/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇪 [et](../../../et/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇩 [id](../../../id/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇹 [it](../../../it/docs/architecture/MONITORING_SECTIONS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇭 [th](../../../th/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/MONITORING_SECTIONS.md)

---

> Implementert i Gruppe B (plan 16). Se `src/shared/constants/sidebarVisibility.ts`.

---

## Navigasjon på øverste nivå

Sidefeltet i kontrollpanelet (etter Gruppe B) har følgende seksjoner på øverste nivå, i denne rekkefølgen:

```
Hjem
Leverandører
Kombinasjoner
API-nøkler
Innstillinger
Analyse
Kostnader      ← NY (Gruppe B, plan 16)
Overvåking     ← OMORGANISERT (Gruppe B, plan 16)
...
```

---

## Kostnadsseksjonen (ny, nivå 1)

Baneprefiks: `/dashboard/costs/`

| Element           | URL                                  | Beskrivelse                                   |
| ----------------- | ------------------------------------ | --------------------------------------------- |
| Oversikt          | `/dashboard/costs`                   | Samlet kostnadsoversikt (flyttet fra Analyse) |
| Priser            | `/dashboard/costs/pricing`           | Pristabell per modell                         |
| Budsjett          | `/dashboard/costs/budget`            | Budsjettgrenser + varsler                     |
| Kvotedeling       | `/dashboard/costs/quota-share`       | Kvotedelingsgrupper + bruk                    |
| Plankonfigurasjon | `/dashboard/costs/quota-share/plans` | Plantilpasninger per leverandør               |

**Begrunnelse**: Priser, Budsjett og Kvotedeling lå tidligere under
`Overvåking > Kostnadsparametere`. Ved å flytte dem til en egen seksjon på øverste nivå
blir de enklere å finne uten å måtte navigere gjennom observabilitetsverktøy.

---

## Overvåkingsseksjonen (omorganisert)

Overvåkingsseksjonen har nå **Aktivitet øverst**, etterfulgt av **3 undergrupper**:

```
Overvåking
├── Aktivitet             ← Tidslinjestrøm (element på øverste nivå)
├── Logggruppe
│   ├── Logger (alle)
│   ├── Proxy-logger
│   └── Konsollogger
├── Revisjonsgruppe
│   ├── Revisjonslogg
│   ├── MCP-revisjon
│   └── A2A-revisjon
└── Systemgruppe
    ├── Tilstand
    └── Kjøretid
```

### Hva som er endret fra den gamle strukturen

| Før                                                                                           | Etter                                          |
| --------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| Aktivitet = fane i Logger som viste revisjonsloggen                                           | Aktivitet = egen strøm (`/dashboard/activity`) |
| Gruppen Kostnadsparametere under Overvåking                                                   | Flyttet til Kostnadsseksjonen                  |
| Flat liste: Logger, Aktivitet (logger), Revisjon, Tilstand, Kjøretid, Priser, Budsjett, Kvote | Strukturert i 3 grupper + egen Kostnadsseksjon |

---

## Aktivitet kontra Revisjonslogg

Disse to er nå atskilt:

| Dimensjon           | Aktivitet (`/dashboard/activity`)                    | Revisjonslogg (`/dashboard/audit`)               |
| ------------------- | ---------------------------------------------------- | ------------------------------------------------ |
| **Formål**          | Brukerrettet hendelsesstrøm («hva skjedde nylig»)    | Samsvars-/sikkerhetslogg                         |
| **Datakilde**       | `GET /api/compliance/audit-log?level=high`           | `GET /api/compliance/audit-log?level=all`        |
| **Format**          | Tidslinje, gruppert etter dag, lesbare verb + ikoner | Kompakt paginert tabell, 50/side                 |
| **Filtre**          | Hendelsestypekategori                                | Handling, alvorlighetsgrad, aktør, datointervall |
| **Eksport**         | Ikke tilgjengelig                                    | JSON-eksport                                     |
| **Aktørfilter**     | Ikke aktuelt                                         | Kan filtreres etter aktør                        |
| **Viste hendelser** | Kun handlinger på høyt nivå (tillatelsesliste)       | Alle revisjonshendelser                          |

### Tillatelsesliste for handlinger på høyt nivå

Definert i `src/lib/audit/highLevelActions.ts`. Styrer hvilke hendelser som vises i
Aktivitetsstrømmen. Tillatelseslisten omfatter:

- Hendelser for tillegging, fjerning og testing av leverandører
- Oppretting, oppdatering og sletting av kombinasjoner
- Livssyklusen til API-nøkler (oppretting, tilbakekalling, rotering)
- Nådd budsjettgrense
- Pålogging/utlogging
- Oppretting av skyagentøkter
- Registrering av MCP-verktøy
- Oppretting/sletting av webhooks
- Endringer i kvotegrupper/-planer (`quota.*`-handlinger, Gruppe B)
- Plattformhendelser (oppdatering, utrulling)
- Installering/fjerning av ferdigheter

Hendelser som ikke finnes i denne listen, vises bare i Revisjonsloggen.

### Legge til en ny handling på høyt nivå

Rediger `src/lib/audit/highLevelActions.ts` og legg til handlingsstrengen i
`HIGH_LEVEL_ACTIONS`. Dette krever en PR (listen er kode og kan ikke konfigureres i databasen).
Det tilhørende ikonet kan legges til i `src/lib/audit/activityIcons.ts`.

---

## Omdirigering: `/dashboard/logs/activity`

Den gamle banen `/dashboard/logs/activity` omdirigeres permanent (HTTP 308) til
`/dashboard/activity` via `permanentRedirect()` i
`src/app/(dashboard)/dashboard/logs/activity/page.tsx`.

Den eldre sidefelt-ID-en `logs-activity` er bevart i `HIDEABLE_SIDEBAR_ITEM_IDS`
(men fjernet fra `SIDEBAR_DEFINITIONS`) for å unngå å ødelegge brukerforhåndsinnstillinger som
refererer til den gamle ID-en.

---

## i18n

Navnerom lagt til av Gruppe B:

| Navneromnøkkel          | Omfatter                                                              |
| ----------------------- | --------------------------------------------------------------------- |
| `sidebar.costsSection`  | Etikett for Kostnadsseksjonen                                         |
| `sidebar.activity`      | Aktivitetselement i sidefeltet                                        |
| `sidebar.logsGroup`     | Etikett for Logg-undergruppen                                         |
| `sidebar.systemGroup`   | Etikett for System-undergruppen                                       |
| `sidebar.costsOverview` | Element for kostnadsoversikt                                          |
| `activity.*`            | Alle strenger på Aktivitetssiden (tittel, verb, filtre, tom tilstand) |

Autoritative lokaliteter: `pt-BR` og `en`. Alle de øvrige 40 lokalitetene faller tilbake til
engelsk via reservemekanismen i `next-intl` (konfigurert i `src/i18n/config.ts`).
