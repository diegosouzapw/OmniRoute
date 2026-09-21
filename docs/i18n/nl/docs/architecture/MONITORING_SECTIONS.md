# Monitoring & Costs — Navigation Structure (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇰 [da](../../../da/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇪 [de](../../../de/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇸 [es](../../../es/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇪 [et](../../../et/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇩 [id](../../../id/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇹 [it](../../../it/docs/architecture/MONITORING_SECTIONS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇴 [no](../../../no/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇭 [th](../../../th/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/MONITORING_SECTIONS.md)

---

> Geïmplementeerd in Groep B (plan 16). Zie `src/shared/constants/sidebarVisibility.ts`.

---

## Navigatie op hoofdniveau

De zijbalk van het dashboard (na Groep B) bevat deze secties op hoofdniveau, in de volgende volgorde:

```
Start
Providers
Combo's
API-sleutels
Instellingen
Analyses
Kosten          ← NIEUW (Groep B, plan 16)
Monitoring      ← GEREORGANISEERD (Groep B, plan 16)
...
```

---

## Sectie Kosten (nieuw, niveau 1)

Padprefix: `/dashboard/costs/`

| Item             | URL                                  | Beschrijving                                           |
| ---------------- | ------------------------------------ | ------------------------------------------------------ |
| Overzicht        | `/dashboard/costs`                   | Geaggregeerd kostenoverzicht (verplaatst uit Analyses) |
| Prijzen          | `/dashboard/costs/pricing`           | Prijstabel per model                                   |
| Budget           | `/dashboard/costs/budget`            | Budgetdrempels + meldingen                             |
| Quotum delen     | `/dashboard/costs/quota-share`       | Quotumdelingspools + gebruik                           |
| Planconfiguratie | `/dashboard/costs/quota-share/plans` | Planoverschrijvingen per provider                      |

**Reden**: Prijzen, Budget en Quotum delen stonden voorheen onder
`Monitoring > Kostenparameters`. Door ze naar een afzonderlijke sectie op hoofdniveau
te verplaatsen, zijn ze vindbaar zonder door observability-tools te hoeven navigeren.

---

## Sectie Monitoring (gereorganiseerd)

De sectie Monitoring heeft nu **Activiteit bovenaan**, gevolgd door **3 subgroepen**:

```
Monitoring
├── Activiteit            ← Tijdlijnfeed (item op hoofdniveau)
├── Groep Logboeken
│   ├── Logboeken (alle)
│   ├── Proxylogboeken
│   └── Consolelogboeken
├── Groep Audit
│   ├── Auditlogboek
│   ├── MCP-audit
│   └── A2A-audit
└── Groep Systeem
    ├── Status
    └── Runtime
```

### Wat er is veranderd ten opzichte van de oude structuur

| Voorheen                                                                                    | Nu                                                      |
| ------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| Activiteit = tabblad in Logboeken dat het auditlogboek weergaf                              | Activiteit = afzonderlijke feed (`/dashboard/activity`) |
| Groep Kostenparameters in Monitoring                                                        | Verplaatst naar de sectie Kosten                        |
| Platte lijst: Logboeken, Activiteit (logs), Audit, Status, Runtime, Prijzen, Budget, Quotum | 3 gestructureerde groepen + afzonderlijke sectie Kosten |

---

## Activiteit versus Auditlogboek

Deze twee zijn nu afzonderlijk:

| Dimensie                       | Activiteit (`/dashboard/activity`)                                 | Auditlogboek (`/dashboard/audit`)         |
| ------------------------------ | ------------------------------------------------------------------ | ----------------------------------------- |
| **Doel**                       | Gebruikersgerichte gebeurtenisfeed ("wat is er onlangs gebeurd")   | Compliance-/beveiligingslogboek           |
| **Gegevensbron**               | `GET /api/compliance/audit-log?level=high`                         | `GET /api/compliance/audit-log?level=all` |
| **Indeling**                   | Tijdlijn, gegroepeerd per dag, leesbare werkwoorden + pictogrammen | Compacte gepagineerde tabel, 50/pagina    |
| **Filters**                    | Gebeurtenistypecategorie                                           | Actie, ernst, actor, datumbereik          |
| **Exporteren**                 | Niet beschikbaar                                                   | JSON-export                               |
| **Actorfilter**                | Niet van toepassing                                                | Filterbaar op actor                       |
| **Weergegeven gebeurtenissen** | Alleen acties op hoog niveau (toelatingslijst)                     | Alle auditgebeurtenissen                  |

### Toelatingslijst voor acties op hoog niveau

Gedefinieerd in `src/lib/audit/highLevelActions.ts`. Bepaalt welke gebeurtenissen in
de Activiteitsfeed verschijnen. De toelatingslijst bevat:

- Gebeurtenissen voor het toevoegen, verwijderen en testen van providers
- Combo's maken, bijwerken en verwijderen
- Levenscyclus van API-sleutels (maken, intrekken, roteren)
- Budgetdrempel bereikt
- Aanmelden/afmelden voor authenticatie
- Cloudagentsessie maken
- MCP-toolregistratie
- Webhooks maken/verwijderen
- Wijzigingen aan quotumpools/-plannen (`quota.*`-acties, Groep B)
- Platformgebeurtenissen (bijwerken, implementeren)
- Skills installeren/verwijderen

Gebeurtenissen die niet in deze lijst staan, verschijnen alleen in het Auditlogboek.

### Een nieuwe actie op hoog niveau toevoegen

Bewerk `src/lib/audit/highLevelActions.ts` en voeg de actietekenreeks toe aan
`HIGH_LEVEL_ACTIONS`. Hiervoor is een PR vereist (de lijst staat in de code en kan niet
via de database worden geconfigureerd). Het bijbehorende pictogram kan worden toegevoegd
aan `src/lib/audit/activityIcons.ts`.

---

## Omleiding: `/dashboard/logs/activity`

Het oude pad `/dashboard/logs/activity` wordt permanent omgeleid (HTTP 308) naar
`/dashboard/activity` via `permanentRedirect()` in
`src/app/(dashboard)/dashboard/logs/activity/page.tsx`.

De verouderde zijbalk-ID `logs-activity` blijft behouden in `HIDEABLE_SIDEBAR_ITEM_IDS`
(maar is verwijderd uit `SIDEBAR_DEFINITIONS`) om te voorkomen dat gebruikerspresets
die naar de oude ID verwijzen, niet meer werken.

---

## i18n

Namespaces toegevoegd door Groep B:

| Namespace-sleutel       | Omvat                                                                                 |
| ----------------------- | ------------------------------------------------------------------------------------- |
| `sidebar.costsSection`  | Label van de sectie Kosten                                                            |
| `sidebar.activity`      | Zijbalkitem Activiteit                                                                |
| `sidebar.logsGroup`     | Label van de subgroep Logboeken                                                       |
| `sidebar.systemGroup`   | Label van de subgroep Systeem                                                         |
| `sidebar.costsOverview` | Item Kostenoverzicht                                                                  |
| `activity.*`            | Alle tekenreeksen van de Activiteitspagina (titel, werkwoorden, filters, lege status) |

De bronlocales zijn `pt-BR` en `en`. Alle overige 40 locales vallen terug op
Engels via het fallbackmechanisme van `next-intl` (geconfigureerd in `src/i18n/config.ts`).
