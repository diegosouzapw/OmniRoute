# Monitoring & Costs — Navigation Structure (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇰 [da](../../../da/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇪 [de](../../../de/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇸 [es](../../../es/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇪 [et](../../../et/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇩 [id](../../../id/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇹 [it](../../../it/docs/architecture/MONITORING_SECTIONS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇴 [no](../../../no/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇭 [th](../../../th/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/MONITORING_SECTIONS.md)

---

> Implementováno ve skupině B (plán 16). Viz `src/shared/constants/sidebarVisibility.ts`.

---

## Navigace na nejvyšší úrovni

Postranní panel řídicího panelu (po skupině B) obsahuje následující sekce nejvyšší úrovně v tomto pořadí:

```
Domů
Poskytovatelé
Kombinace
Klíče API
Nastavení
Analytika
Náklady       ← NOVÉ (skupina B, plán 16)
Monitorování  ← REORGANIZOVÁNO (skupina B, plán 16)
...
```

---

## Sekce Náklady (nová, úroveň 1)

Prefix cesty: `/dashboard/costs/`

| Položka           | URL                                  | Popis                                            |
| ----------------- | ------------------------------------ | ------------------------------------------------ |
| Přehled           | `/dashboard/costs`                   | Souhrnný přehled nákladů (přesunuto z Analytiky) |
| Ceny              | `/dashboard/costs/pricing`           | Tabulka cen jednotlivých modelů                  |
| Rozpočet          | `/dashboard/costs/budget`            | Prahové hodnoty rozpočtu + upozornění            |
| Sdílení kvóty     | `/dashboard/costs/quota-share`       | Fondy sdílení kvóty + využití                    |
| Konfigurace plánu | `/dashboard/costs/quota-share/plans` | Přepsání plánu pro jednotlivé poskytovatele      |

**Odůvodnění**: Ceny, Rozpočet a Sdílení kvóty se dříve nacházely v části
`Monitorování > Parametry nákladů`. Přesunutím do samostatné sekce nejvyšší úrovně
jsou snadno dostupné bez nutnosti procházet nástroje pro observabilitu.

---

## Sekce Monitorování (reorganizována)

Sekce Monitorování nyní obsahuje **Aktivitu nahoře** následovanou **3 podskupinami**:

```
Monitorování
├── Aktivita             ← Kanál časové osy (položka nejvyšší úrovně)
├── Skupina Protokoly
│   ├── Protokoly (všechny)
│   ├── Protokoly proxy
│   └── Protokoly konzole
├── Skupina Audit
│   ├── Protokol auditu
│   ├── Audit MCP
│   └── Audit A2A
└── Skupina Systém
    ├── Stav
    └── Běhové prostředí
```

### Co se změnilo oproti staré struktuře

| Předtím                                                                                              | Nyní                                                |
| ---------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| Aktivita = karta uvnitř Protokolů, která zobrazovala Protokol auditu                                 | Aktivita = samostatný kanál (`/dashboard/activity`) |
| Skupina Parametry nákladů v Monitorování                                                             | Přesunuto do sekce Náklady                          |
| Plochý seznam: Protokoly, Aktivita (protokoly), Audit, Stav, Běhové prostředí, Ceny, Rozpočet, Kvóta | Struktura se 3 skupinami + samostatná sekce Náklady |

---

## Aktivita vs. Protokol auditu

Tyto dvě položky jsou nyní odlišné:

| Dimenze                | Aktivita (`/dashboard/activity`)                             | Protokol auditu (`/dashboard/audit`)                 |
| ---------------------- | ------------------------------------------------------------ | ---------------------------------------------------- |
| **Účel**               | Uživatelský kanál událostí („co se nedávno stalo“)           | Protokol pro účely souladu s předpisy / zabezpečení  |
| **Zdroj dat**          | `GET /api/compliance/audit-log?level=high`                   | `GET /api/compliance/audit-log?level=all`            |
| **Formát**             | Časová osa seskupená podle dnů, srozumitelná slovesa + ikony | Kompaktní stránkovaná tabulka, 50 položek na stránku |
| **Filtry**             | Kategorie typu události                                      | Akce, závažnost, aktér, rozsah dat                   |
| **Export**             | Není k dispozici                                             | Export JSON                                          |
| **Filtr aktéra**       | Nelze použít                                                 | Lze filtrovat podle aktéra                           |
| **Zobrazené události** | Pouze akce vysoké úrovně (seznam povolených akcí)            | Všechny události auditu                              |

### Seznam povolených akcí vysoké úrovně

Je definován v `src/lib/audit/highLevelActions.ts`. Určuje, které události se zobrazí
v kanálu Aktivity. Seznam povolených akcí zahrnuje:

- Události přidání/odebrání/testování poskytovatele
- Vytvoření/aktualizaci/odstranění kombinace
- Životní cyklus klíče API (vytvoření, odvolání, rotace)
- Dosažení prahové hodnoty rozpočtu
- Přihlášení/odhlášení v rámci autentizace
- Vytvoření relace cloudového agenta
- Registraci nástroje MCP
- Vytvoření/odstranění webhooku
- Změny fondu/plánu kvóty (akce `quota.*`, skupina B)
- Události platformy (aktualizace, nasazení)
- Instalaci/odebrání dovednosti

Události, které nejsou na tomto seznamu, se zobrazují pouze v Protokolu auditu.

### Přidání nové akce vysoké úrovně

Upravte `src/lib/audit/highLevelActions.ts` a přidejte řetězec akce do
`HIGH_LEVEL_ACTIONS`. To vyžaduje PR (seznam je součástí kódu a nelze jej konfigurovat
prostřednictvím databáze). Odpovídající ikonu lze přidat do `src/lib/audit/activityIcons.ts`.

---

## Přesměrování: `/dashboard/logs/activity`

Stará cesta `/dashboard/logs/activity` je trvale přesměrována (HTTP 308) na
`/dashboard/activity` prostřednictvím `permanentRedirect()` v souboru
`src/app/(dashboard)/dashboard/logs/activity/page.tsx`.

Starší ID postranního panelu `logs-activity` je zachováno v `HIDEABLE_SIDEBAR_ITEM_IDS`
(ale odstraněno ze `SIDEBAR_DEFINITIONS`), aby nedošlo k narušení uživatelských předvoleb,
které odkazují na staré ID.

---

## i18n

Jmenné prostory přidané skupinou B:

| Klíč jmenného prostoru  | Pokrývá                                                                 |
| ----------------------- | ----------------------------------------------------------------------- |
| `sidebar.costsSection`  | Popisek sekce Náklady                                                   |
| `sidebar.activity`      | Položku Aktivita v postranním panelu                                    |
| `sidebar.logsGroup`     | Popisek podskupiny Protokoly                                            |
| `sidebar.systemGroup`   | Popisek podskupiny Systém                                               |
| `sidebar.costsOverview` | Položku přehledu nákladů                                                |
| `activity.*`            | Všechny řetězce stránky Aktivita (název, slovesa, filtry, prázdný stav) |

Zdrojovými lokalizacemi jsou `pt-BR` a `en`. Všech dalších 40 lokalizací používá
angličtinu jako záložní jazyk prostřednictvím mechanismu fallback knihovny `next-intl`
(nakonfigurovaného v `src/i18n/config.ts`).
