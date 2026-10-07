# Monitoring & Costs — Navigation Structure (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇰 [da](../../../da/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇪 [de](../../../de/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇸 [es](../../../es/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇪 [et](../../../et/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇩 [id](../../../id/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇹 [it](../../../it/docs/architecture/MONITORING_SECTIONS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇴 [no](../../../no/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇭 [th](../../../th/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/MONITORING_SECTIONS.md)

---

> Ieviests B grupā (16. plāns). Skatiet `src/shared/constants/sidebarVisibility.ts`.

---

## Augsta līmeņa navigācija

Informācijas paneļa sānjoslā (pēc B grupas izmaiņām) ir šādas augšējā līmeņa sadaļas norādītajā secībā:

```
Sākums
Pakalpojumu sniedzēji
Kombinācijas
API atslēgas
Iestatījumi
Analītika
Izmaksas        ← JAUNS (B grupa, 16. plāns)
Uzraudzība      ← PĀRKĀRTOTS (B grupa, 16. plāns)
...
```

---

## Izmaksu sadaļa (jauna, 1. līmenis)

Ceļa prefikss: `/dashboard/costs/`

| Vienums             | URL                                  | Apraksts                                                         |
| ------------------- | ------------------------------------ | ---------------------------------------------------------------- |
| Pārskats            | `/dashboard/costs`                   | Apkopots izmaksu informācijas panelis (pārvietots no analītikas) |
| Cenas               | `/dashboard/costs/pricing`           | Cenu tabula katram modelim                                       |
| Budžets             | `/dashboard/costs/budget`            | Budžeta sliekšņi un brīdinājumi                                  |
| Kvotu koplietošana  | `/dashboard/costs/quota-share`       | Quota Share kopfondi un lietojums                                |
| Plānu konfigurācija | `/dashboard/costs/quota-share/plans` | Plānu pārrakstīšana katram pakalpojumu sniedzējam                |

**Pamatojums**: cenas, budžets un kvotu koplietošana iepriekš atradās sadaļā
`Uzraudzība > Izmaksu parametri`. Pārvietojot tos uz atsevišķu augšējā līmeņa sadaļu,
tos var atrast bez nepieciešamības pārvietoties pa novērojamības rīkiem.

---

## Uzraudzības sadaļa (pārkārtota)

Uzraudzības sadaļas **augšdaļā tagad atrodas aktivitātes**, kam seko **3 apakšgrupas**:

```
Uzraudzība
├── Aktivitātes           ← Laika skalas plūsma (augšējā līmeņa vienums)
├── Žurnālu grupa
│   ├── Žurnāli (visi)
│   ├── Starpniekservera žurnāli
│   └── Konsoles žurnāli
├── Audita grupa
│   ├── Audita žurnāls
│   ├── MCP audits
│   └── A2A audits
└── Sistēmas grupa
    ├── Darbspēja
    └── Izpildlaiks
```

### Kas mainījies salīdzinājumā ar iepriekšējo struktūru

| Iepriekš                                                                                                 | Tagad                                                  |
| -------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| Aktivitātes = cilne žurnālos, kurā tika attēlots audita žurnāls                                          | Aktivitātes = atsevišķa plūsma (`/dashboard/activity`) |
| Izmaksu parametru grupa uzraudzības sadaļā                                                               | Pārvietota uz izmaksu sadaļu                           |
| Plakans saraksts: žurnāli, aktivitātes (žurnāli), audits, darbspēja, izpildlaiks, cenas, budžets, kvotas | Strukturēts 3 grupās un atsevišķā izmaksu sadaļā       |

---

## Aktivitātes un audita žurnāls

Tagad tie ir divi atšķirīgi elementi:

| Aspekts              | Aktivitātes (`/dashboard/activity`)                                                | Audita žurnāls (`/dashboard/audit`)                    |
| -------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------ |
| **Mērķis**           | Lietotājam paredzēta notikumu plūsma („kas nesen notika”)                          | Atbilstības/drošības žurnāls                           |
| **Datu avots**       | `GET /api/compliance/audit-log?level=high`                                         | `GET /api/compliance/audit-log?level=all`              |
| **Formāts**          | Laika skala, grupēta pa dienām, ar cilvēkam saprotamiem darbības vārdiem un ikonām | Blīva tabula ar lapošanu, 50 vienumi lapā              |
| **Filtri**           | Notikuma tipa kategorija                                                           | Darbība, nopietnības pakāpe, veicējs, datumu diapazons |
| **Eksportēšana**     | Nav pieejama                                                                       | JSON eksportēšana                                      |
| **Veicēja filtrs**   | Nav piemērojams                                                                    | Filtrēšana pēc veicēja                                 |
| **Rādītie notikumi** | Tikai augsta līmeņa darbības (atļauto darbību saraksts)                            | Visi audita notikumi                                   |

### Augsta līmeņa darbību atļauto vērtību saraksts

Definēts failā `src/lib/audit/highLevelActions.ts`. Tas nosaka, kuri notikumi tiek parādīti
aktivitāšu plūsmā. Atļauto vērtību sarakstā ir ietverti:

- Pakalpojumu sniedzēja pievienošanas/noņemšanas/testēšanas notikumi
- Kombināciju izveide/atjaunināšana/dzēšana
- API atslēgas dzīves cikls (izveide, atsaukšana, rotācija)
- Budžeta sliekšņa sasniegšana
- Autentifikācijas pieteikšanās/atteikšanās
- Mākoņa aģenta sesijas izveide
- MCP rīka reģistrēšana
- Tīmekļa aizķeres izveide/dzēšana
- Kvotu kopfonda/plāna izmaiņas (`quota.*` darbības, B grupa)
- Platformas notikumi (atjaunināšana, izvietošana)
- Prasmju instalēšana/noņemšana

Notikumi, kas nav iekļauti šajā sarakstā, tiek parādīti tikai audita žurnālā.

### Jaunas augsta līmeņa darbības pievienošana

Rediģējiet `src/lib/audit/highLevelActions.ts` un pievienojiet darbības virkni
`HIGH_LEVEL_ACTIONS`. Tam nepieciešams PR (saraksts ir definēts kodā, nevis konfigurējams DB).
Atbilstošo ikonu var pievienot failā `src/lib/audit/activityIcons.ts`.

---

## Novirzīšana: `/dashboard/logs/activity`

Vecais ceļš `/dashboard/logs/activity` tiek neatgriezeniski novirzīts (HTTP 308) uz
`/dashboard/activity`, izmantojot `permanentRedirect()` failā
`src/app/(dashboard)/dashboard/logs/activity/page.tsx`.

Mantotais sānjoslas ID `logs-activity` ir saglabāts `HIDEABLE_SIDEBAR_ITEM_IDS`
(bet noņemts no `SIDEBAR_DEFINITIONS`), lai nesabojātu lietotāju sākotnējos iestatījumus,
kuros ir atsauce uz veco ID.

---

## i18n

B grupas pievienotās nosaukumvietas:

| Nosaukumvietas atslēga  | Aptver                                                                                 |
| ----------------------- | -------------------------------------------------------------------------------------- |
| `sidebar.costsSection`  | Izmaksu sadaļas etiķeti                                                                |
| `sidebar.activity`      | Aktivitāšu sānjoslas vienumu                                                           |
| `sidebar.logsGroup`     | Žurnālu apakšgrupas etiķeti                                                            |
| `sidebar.systemGroup`   | Sistēmas apakšgrupas etiķeti                                                           |
| `sidebar.costsOverview` | Izmaksu pārskata vienumu                                                               |
| `activity.*`            | Visas aktivitāšu lapas virknes (virsraksts, darbības vārdi, filtri, tukšais stāvoklis) |

Patiesā avota lokalizācijas ir `pt-BR` un `en`. Visas pārējās 40 lokalizācijas izmanto
angļu valodu kā atkāpšanās variantu, izmantojot `next-intl` atkāpšanās mehānismu (konfigurēts failā `src/i18n/config.ts`).
