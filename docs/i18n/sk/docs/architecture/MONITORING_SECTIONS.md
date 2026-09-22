# Monitoring & Costs — Navigation Structure (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇰 [da](../../../da/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇪 [de](../../../de/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇸 [es](../../../es/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇪 [et](../../../et/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇩 [id](../../../id/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇹 [it](../../../it/docs/architecture/MONITORING_SECTIONS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇴 [no](../../../no/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇭 [th](../../../th/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/MONITORING_SECTIONS.md)

---

> Implementované v skupine B (plán 16). Pozrite si `src/shared/constants/sidebarVisibility.ts`.

---

## Navigácia na vysokej úrovni

Bočný panel ovládacieho panela (po skupine B) obsahuje tieto sekcie najvyššej úrovne v uvedenom poradí:

```
Domov
Poskytovatelia
Kombinácie
Kľúče API
Nastavenia
Analytika
Náklady          ← NOVÉ (skupina B, plán 16)
Monitorovanie     ← REORGANIZOVANÉ (skupina B, plán 16)
...
```

---

## Sekcia Náklady (nová, úroveň 1)

Prefix cesty: `/dashboard/costs/`

| Položka            | URL                                  | Popis                                          |
| ------------------ | ------------------------------------ | ---------------------------------------------- |
| Prehľad            | `/dashboard/costs`                   | Súhrnný panel nákladov (presunutý z Analytiky) |
| Ceny               | `/dashboard/costs/pricing`           | Tabuľka cien podľa modelov                     |
| Rozpočet           | `/dashboard/costs/budget`            | Rozpočtové limity + upozornenia                |
| Zdieľanie kvóty    | `/dashboard/costs/quota-share`       | Fondy zdieľania kvóty + využitie               |
| Konfigurácia plánu | `/dashboard/costs/quota-share/plans` | Individuálne úpravy plánov podľa poskytovateľa |

**Odôvodnenie**: Ceny, Rozpočet a Zdieľanie kvóty sa predtým nachádzali v sekcii
`Monitorovanie > Parametre nákladov`. Ich presunutím do samostatnej sekcie najvyššej úrovne
ich možno nájsť bez prechádzania nástrojmi na pozorovateľnosť.

---

## Sekcia Monitorovanie (reorganizovaná)

Sekcia Monitorovanie má teraz **Aktivitu navrchu**, za ktorou nasledujú **3 podskupiny**:

```
Monitorovanie
├── Aktivita             ← Časová os udalostí (položka najvyššej úrovne)
├── Skupina Protokoly
│   ├── Protokoly (všetky)
│   ├── Protokoly proxy
│   └── Konzolové protokoly
├── Skupina Audit
│   ├── Protokol auditu
│   ├── Audit MCP
│   └── Audit A2A
└── Skupina Systém
    ├── Stav
    └── Beh systému
```

### Čo sa zmenilo oproti starej štruktúre

| Predtým                                                                                         | Teraz                                                 |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| Aktivita = karta v Protokoloch, ktorá zobrazovala Protokol auditu                               | Aktivita = samostatný prehľad (`/dashboard/activity`) |
| Skupina Parametre nákladov v Monitorovaní                                                       | Presunutá do sekcie Náklady                           |
| Plochý zoznam: Protokoly, Aktivita (protokoly), Audit, Stav, Beh systému, Ceny, Rozpočet, Kvóta | Štruktúra s 3 skupinami + samostatná sekcia Náklady   |

---

## Aktivita verzus Protokol auditu

Teraz ide o dve odlišné funkcie:

| Dimenzia               | Aktivita (`/dashboard/activity`)                            | Protokol auditu (`/dashboard/audit`)       |
| ---------------------- | ----------------------------------------------------------- | ------------------------------------------ |
| **Účel**               | Prehľad udalostí pre používateľa („čo sa nedávno stalo“)    | Protokol súladu s predpismi / zabezpečenia |
| **Zdroj údajov**       | `GET /api/compliance/audit-log?level=high`                  | `GET /api/compliance/audit-log?level=all`  |
| **Formát**             | Časová os zoskupená podľa dní, zrozumiteľné slovesá + ikony | Hustá stránkovaná tabuľka, 50/strana       |
| **Filtre**             | Kategória typu udalosti                                     | Akcia, závažnosť, aktér, rozsah dátumov    |
| **Export**             | Nie je k dispozícii                                         | Export vo formáte JSON                     |
| **Filter aktéra**      | Neuplatňuje sa                                              | Možnosť filtrovania podľa aktéra           |
| **Zobrazené udalosti** | Iba akcie vysokej úrovne (zoznam povolených položiek)       | Všetky udalosti auditu                     |

### Zoznam povolených akcií vysokej úrovne

Definovaný v `src/lib/audit/highLevelActions.ts`. Určuje, ktoré udalosti sa zobrazia v
prehľade Aktivita. Zoznam povolených položiek zahŕňa:

- Udalosti pridania/odstránenia/testovania poskytovateľa
- Vytvorenie/aktualizáciu/odstránenie kombinácie
- Životný cyklus kľúča API (vytvorenie, odvolanie, rotácia)
- Dosiahnutie rozpočtového limitu
- Prihlásenie/odhlásenie pri overovaní
- Vytvorenie relácie cloudového agenta
- Registráciu nástroja MCP
- Vytvorenie/odstránenie webhooku
- Zmeny fondu/plánu kvóty (akcie `quota.*`, skupina B)
- Udalosti platformy (aktualizácia, nasadenie)
- Inštaláciu/odstránenie zručnosti

Udalosti, ktoré nie sú v tomto zozname, sa zobrazujú iba v Protokole auditu.

### Pridanie novej akcie vysokej úrovne

Upravte `src/lib/audit/highLevelActions.ts` a pridajte reťazec akcie do
`HIGH_LEVEL_ACTIONS`. Vyžaduje si to PR (zoznam je súčasťou kódu a nedá sa konfigurovať cez DB).
Príslušnú ikonu možno pridať do `src/lib/audit/activityIcons.ts`.

---

## Presmerovanie: `/dashboard/logs/activity`

Stará cesta `/dashboard/logs/activity` je natrvalo presmerovaná (HTTP 308) na
`/dashboard/activity` prostredníctvom `permanentRedirect()` v
`src/app/(dashboard)/dashboard/logs/activity/page.tsx`.

Pôvodné ID bočného panela `logs-activity` je zachované v `HIDEABLE_SIDEBAR_ITEM_IDS`
(ale odstránené zo `SIDEBAR_DEFINITIONS`), aby sa predišlo narušeniu používateľských predvolieb,
ktoré odkazujú na staré ID.

---

## i18n

Menné priestory pridané skupinou B:

| Kľúč menného priestoru  | Zahŕňa                                                                 |
| ----------------------- | ---------------------------------------------------------------------- |
| `sidebar.costsSection`  | Označenie sekcie Náklady                                               |
| `sidebar.activity`      | Položku Aktivita na bočnom paneli                                      |
| `sidebar.logsGroup`     | Označenie podskupiny Protokoly                                         |
| `sidebar.systemGroup`   | Označenie podskupiny Systém                                            |
| `sidebar.costsOverview` | Položku prehľadu nákladov                                              |
| `activity.*`            | Všetky reťazce stránky Aktivita (názov, slovesá, filtre, prázdny stav) |

Zdrojové lokality: `pt-BR` a `en`. Všetkých ostatných 40 lokalít používa ako náhradný jazyk
angličtinu prostredníctvom mechanizmu náhradného jazyka `next-intl` (nakonfigurovaného v `src/i18n/config.ts`).
