# Monitoring & Costs — Navigation Structure (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇰 [da](../../../da/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇪 [de](../../../de/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇸 [es](../../../es/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇩 [id](../../../id/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇹 [it](../../../it/docs/architecture/MONITORING_SECTIONS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇴 [no](../../../no/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇭 [th](../../../th/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/MONITORING_SECTIONS.md)

---

> Rakendatud rühmas B (plaan 16). Vt `src/shared/constants/sidebarVisibility.ts`.

---

## Kõrgtaseme navigeerimine

Juhtpaneeli külgribal (pärast rühma B muudatusi) on järgmised ülataseme jaotised selles järjekorras:

```
Avaleht
Teenusepakkujad
Kombod
API võtmed
Seaded
Analüütika
Kulud          ← UUS (rühm B, plaan 16)
Jälgimine      ← ÜMBER KORRALDATUD (rühm B, plaan 16)
...
```

---

## Kulude jaotis (uus, 1. tase)

Tee prefiks: `/dashboard/costs/`

| Üksus            | URL                                  | Kirjeldus                                              |
| ---------------- | ------------------------------------ | ------------------------------------------------------ |
| Ülevaade         | `/dashboard/costs`                   | Koondatud kulude juhtpaneel (teisaldatud analüütikast) |
| Hinnastamine     | `/dashboard/costs/pricing`           | Mudelipõhine hinnatabel                                |
| Eelarve          | `/dashboard/costs/budget`            | Eelarve piirmäärad + hoiatused                         |
| Kvoodi jagamine  | `/dashboard/costs/quota-share`       | Kvoodijagamise kogumid + kasutus                       |
| Plaani seadistus | `/dashboard/costs/quota-share/plans` | Teenusepakkujapõhised plaani alistused                 |

**Põhjendus**: hinnastamine, eelarve ja kvoodi jagamine asusid varem jaotises
`Jälgimine > Kulude parameetrid`. Nende teisaldamine eraldi ülataseme jaotisse
muudab need leitavaks, ilma et peaks navigeerima jälgitavuse tööriistade kaudu.

---

## Jälgimise jaotis (ümber korraldatud)

Jälgimise jaotises on nüüd **Tegevused kõige ülal**, millele järgneb **3 alamrühma**:

```
Jälgimine
├── Tegevused             ← Ajajoone voog (ülataseme üksus)
├── Logide rühm
│   ├── Logid (kõik)
│   ├── Puhverserveri logid
│   └── Konsoolilogid
├── Auditi rühm
│   ├── Auditilogi
│   ├── MCP audit
│   └── A2A audit
└── Süsteemi rühm
    ├── Seisund
    └── Käituskeskkond
```

### Mis võrreldes vana struktuuriga muutus

| Enne                                                                                         | Pärast                                                |
| -------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Tegevused = logides olev vahekaart, mis kuvas auditilogi                                     | Tegevused = eraldiseisev voog (`/dashboard/activity`) |
| Kulude parameetrite rühm jälgimise all                                                       | Teisaldatud kulude jaotisse                           |
| Lame loend: logid, tegevused (logid), audit, seisund, käituskeskkond, hinnad, eelarve, kvoot | Struktureeritud 3 rühma + eraldiseisev kulude jaotis  |

---

## Tegevused vs. auditilogi

Need kaks on nüüd eraldiseisvad:

| Mõõde                 | Tegevused (`/dashboard/activity`)                               | Auditilogi (`/dashboard/audit`)                 |
| --------------------- | --------------------------------------------------------------- | ----------------------------------------------- |
| **Eesmärk**           | Kasutajale suunatud sündmuste voog („mis hiljuti juhtus“)       | Vastavus- / turvalogi                           |
| **Andmeallikas**      | `GET /api/compliance/audit-log?level=high`                      | `GET /api/compliance/audit-log?level=all`       |
| **Vorming**           | Ajajoon, päevade kaupa rühmitatud, loetavad tegusõnad + ikoonid | Tihe lehekülgedeks jaotatud tabel, 50/lehekülg  |
| **Filtrid**           | Sündmuse tüübi kategooria                                       | Toiming, raskusaste, tegutseja, kuupäevavahemik |
| **Eksport**           | Pole saadaval                                                   | JSON-eksport                                    |
| **Tegutseja filter**  | Ei kohaldu                                                      | Filtreeritav tegutseja järgi                    |
| **Kuvatud sündmused** | Ainult kõrgtaseme toimingud (lubatud loend)                     | Kõik auditisündmused                            |

### Kõrgtaseme toimingute lubatud loend

Määratletud failis `src/lib/audit/highLevelActions.ts`. Juhib seda, millised sündmused
tegevuste voos kuvatakse. Lubatud loend sisaldab järgmist:

- Teenusepakkuja lisamise/eemaldamise/testimise sündmused
- Kombo loomine/uuendamine/kustutamine
- API võtme elutsükkel (loomine, tühistamine, roteerimine)
- Eelarve piirmäära saavutamine
- Autentimisel sisse-/väljalogimine
- Pilveagendi seansi loomine
- MCP tööriista registreerimine
- Veebihaagi loomine/kustutamine
- Kvoodikogumi/-plaani muudatused (`quota.*` toimingud, rühm B)
- Platvormisündmused (uuendamine, juurutamine)
- Oskuse installimine/eemaldamine

Sündmused, mida selles loendis pole, kuvatakse ainult auditilogis.

### Uue kõrgtaseme toimingu lisamine

Muutke faili `src/lib/audit/highLevelActions.ts` ja lisage toimingu string muutujasse
`HIGH_LEVEL_ACTIONS`. See nõuab PR-i (loend asub koodis ega ole andmebaasi kaudu seadistatav).
Vastava ikooni saab lisada faili `src/lib/audit/activityIcons.ts`.

---

## Ümbersuunamine: `/dashboard/logs/activity`

Vana tee `/dashboard/logs/activity` suunatakse faili
`src/app/(dashboard)/dashboard/logs/activity/page.tsx` funktsiooni `permanentRedirect()`
kaudu püsivalt (HTTP 308) teele `/dashboard/activity`.

Pärandkülgriba ID `logs-activity` on säilitatud muutujas `HIDEABLE_SIDEBAR_ITEM_IDS`
(kuid eemaldatud muutujast `SIDEBAR_DEFINITIONS`), et vältida vanale ID-le
viitavate kasutaja eelseadistuste rikkumist.

---

## i18n

Rühma B lisatud nimeruumid:

| Nimeruumi võti          | Hõlmab                                                                 |
| ----------------------- | ---------------------------------------------------------------------- |
| `sidebar.costsSection`  | Kulude jaotise silt                                                    |
| `sidebar.activity`      | Külgriba tegevuste üksus                                               |
| `sidebar.logsGroup`     | Logide alamrühma silt                                                  |
| `sidebar.systemGroup`   | Süsteemi alamrühma silt                                                |
| `sidebar.costsOverview` | Kulude ülevaate üksus                                                  |
| `activity.*`            | Kõik tegevuste lehe stringid (pealkiri, tegusõnad, filtrid, tühi olek) |

Lähtetõe lokaadid: `pt-BR` ja `en`. Kõik ülejäänud 40 lokaati kasutavad
`next-intl` varumehhanismi kaudu inglise keelt (seadistatud failis `src/i18n/config.ts`).
