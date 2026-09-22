# Monitoring & Costs — Navigation Structure (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇰 [da](../../../da/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇪 [de](../../../de/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇸 [es](../../../es/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇪 [et](../../../et/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇩 [id](../../../id/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇹 [it](../../../it/docs/architecture/MONITORING_SECTIONS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇴 [no](../../../no/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇭 [th](../../../th/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/MONITORING_SECTIONS.md)

---

> Implementirano v skupini B (načrt 16). Glejte `src/shared/constants/sidebarVisibility.ts`.

---

## Navigacija na visoki ravni

Stranska vrstica nadzorne plošče (po skupini B) vsebuje naslednje razdelke najvišje ravni v tem vrstnem redu:

```
Domov
Ponudniki
Kombinacije
Ključi API
Nastavitve
Analitika
Stroški          ← NOVO (skupina B, načrt 16)
Spremljanje      ← PREUREJENO (skupina B, načrt 16)
...
```

---

## Razdelek Stroški (nov, 1. raven)

Predpona poti: `/dashboard/costs/`

| Element               | URL                                  | Opis                                                         |
| --------------------- | ------------------------------------ | ------------------------------------------------------------ |
| Pregled               | `/dashboard/costs`                   | Združena nadzorna plošča stroškov (premaknjena iz Analitike) |
| Cene                  | `/dashboard/costs/pricing`           | Tabela cen po modelih                                        |
| Proračun              | `/dashboard/costs/budget`            | Proračunski pragovi + opozorila                              |
| Deljenje kvot         | `/dashboard/costs/quota-share`       | Skupine za deljenje kvot + uporaba                           |
| Konfiguracija načrtov | `/dashboard/costs/quota-share/plans` | Preglasitve načrtov po ponudnikih                            |

**Utemeljitev**: Cene, Proračun in Deljenje kvot so bili prej v razdelku
`Spremljanje > Parametri stroškov`. Če jih premaknemo v namenski razdelek najvišje ravni,
jih je mogoče najti brez krmarjenja po orodjih za opazljivost.

---

## Razdelek Spremljanje (preurejen)

Razdelek Spremljanje ima zdaj **Dejavnost na vrhu**, ki ji sledijo **3 podskupine**:

```
Spremljanje
├── Dejavnost             ← Časovnica dogodkov (element najvišje ravni)
├── Skupina Dnevniki
│   ├── Dnevniki (vsi)
│   ├── Dnevniki posredniškega strežnika
│   └── Dnevniki konzole
├── Skupina Revizija
│   ├── Revizijski dnevnik
│   ├── Revizija MCP
│   └── Revizija A2A
└── Skupina Sistem
    ├── Stanje
    └── Izvajalno okolje
```

### Kaj se je spremenilo glede na staro strukturo

| Prej                                                                                                     | Zdaj                                                      |
| -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Dejavnost = zavihek znotraj Dnevnikov, ki je prikazoval Revizijski dnevnik                               | Dejavnost = namenski vir dogodkov (`/dashboard/activity`) |
| Skupina Parametri stroškov v razdelku Spremljanje                                                        | Premaknjeno v razdelek Stroški                            |
| Ploski seznam: Dnevniki, Dejavnost (dnevniki), Revizija, Stanje, Izvajalno okolje, Cene, Proračun, Kvota | Strukturirano v 3 skupine + namenski razdelek Stroški     |

---

## Dejavnost v primerjavi z Revizijskim dnevnikom

Zdaj sta jasno ločena:

| Vidik                 | Dejavnost (`/dashboard/activity`)                                   | Revizijski dnevnik (`/dashboard/audit`)      |
| --------------------- | ------------------------------------------------------------------- | -------------------------------------------- |
| **Namen**             | Uporabniku namenjen vir dogodkov (»kaj se je zgodilo pred kratkim«) | Dnevnik skladnosti/varnosti                  |
| **Vir podatkov**      | `GET /api/compliance/audit-log?level=high`                          | `GET /api/compliance/audit-log?level=all`    |
| **Oblika**            | Časovnica, združena po dnevih, človeku razumljivi glagoli + ikone   | Strnjena oštevilčena tabela, 50/stran        |
| **Filtri**            | Kategorija vrste dogodka                                            | Dejanje, resnost, izvajalec, datumski razpon |
| **Izvoz**             | Ni na voljo                                                         | Izvoz JSON                                   |
| **Filter izvajalca**  | Ni relevantno                                                       | Filtriranje po izvajalcu                     |
| **Prikazani dogodki** | Samo dejanja na visoki ravni (seznam dovoljenih)                    | Vsi revizijski dogodki                       |

### Seznam dovoljenih dejanj na visoki ravni

Določen je v `src/lib/audit/highLevelActions.ts`. Nadzira, kateri dogodki so prikazani v
viru Dejavnost. Seznam dovoljenih vključuje:

- Dogodke dodajanja/odstranjevanja/preizkušanja ponudnikov
- Ustvarjanje/posodabljanje/brisanje kombinacij
- Življenjski cikel ključev API (ustvarjanje, preklic, rotacija)
- Dosežen proračunski prag
- Prijavo/odjavo pri preverjanju pristnosti
- Ustvarjanje seje agenta v oblaku
- Registracijo orodja MCP
- Ustvarjanje/brisanje spletnih kavljev
- Spremembe skupin/načrtov kvot (dejanja `quota.*`, skupina B)
- Dogodke platforme (posodobitev, uvedba)
- Namestitev/odstranitev veščin

Dogodki, ki niso na tem seznamu, so prikazani samo v Revizijskem dnevniku.

### Dodajanje novega dejanja na visoki ravni

Uredite `src/lib/audit/highLevelActions.ts` in dodajte niz dejanja v
`HIGH_LEVEL_ACTIONS`. Za to je potreben PR (seznam je del kode in ga ni mogoče
konfigurirati prek zbirke podatkov). Ustrezno ikono lahko dodate v `src/lib/audit/activityIcons.ts`.

---

## Preusmeritev: `/dashboard/logs/activity`

Stara pot `/dashboard/logs/activity` je trajno preusmerjena (HTTP 308) na
`/dashboard/activity` prek `permanentRedirect()` v
`src/app/(dashboard)/dashboard/logs/activity/page.tsx`.

Podedovani ID stranske vrstice `logs-activity` je ohranjen v `HIDEABLE_SIDEBAR_ITEM_IDS`
(vendar odstranjen iz `SIDEBAR_DEFINITIONS`), da se prepreči okvara uporabniških prednastavitev,
ki se sklicujejo na stari ID.

---

## i18n

Imenski prostori, ki jih je dodala skupina B:

| Ključ imenskega prostora | Zajema                                                             |
| ------------------------ | ------------------------------------------------------------------ |
| `sidebar.costsSection`   | Oznako razdelka Stroški                                            |
| `sidebar.activity`       | Element Dejavnost v stranski vrstici                               |
| `sidebar.logsGroup`      | Oznako podskupine Dnevniki                                         |
| `sidebar.systemGroup`    | Oznako podskupine Sistem                                           |
| `sidebar.costsOverview`  | Element pregleda stroškov                                          |
| `activity.*`             | Vse nize strani Dejavnost (naslov, glagoli, filtri, prazno stanje) |

Izvorno veljavni področni nastavitvi sta `pt-BR` in `en`. Vseh drugih 40 področnih nastavitev se prek
mehanizma za nadomestni jezik `next-intl` vrne na angleščino (konfigurirano v `src/i18n/config.ts`).
