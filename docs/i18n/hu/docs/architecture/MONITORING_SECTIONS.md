# Monitoring & Costs — Navigation Structure (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇰 [da](../../../da/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇪 [de](../../../de/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇸 [es](../../../es/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇪 [et](../../../et/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇩 [id](../../../id/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇹 [it](../../../it/docs/architecture/MONITORING_SECTIONS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇴 [no](../../../no/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇭 [th](../../../th/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/MONITORING_SECTIONS.md)

---

> A B csoportban (16. terv) megvalósítva. Lásd: `src/shared/constants/sidebarVisibility.ts`.

---

## Felső szintű navigáció

A vezérlőpult oldalsávja (a B csoport után) a következő felső szintű szakaszokat tartalmazza ebben a sorrendben:

```
Kezdőlap
Szolgáltatók
Kombinációk
API-kulcsok
Beállítások
Analitika
Költségek        ← ÚJ (B csoport, 16. terv)
Monitorozás       ← ÁTSZERVEZVE (B csoport, 16. terv)
...
```

---

## Költségek szakasz (új, 1. szint)

Útvonal-előtag: `/dashboard/costs/`

| Elem             | URL                                  | Leírás                                                      |
| ---------------- | ------------------------------------ | ----------------------------------------------------------- |
| Áttekintés       | `/dashboard/costs`                   | Összesített költségvezérlőpult (áthelyezve az Analitikából) |
| Díjszabás        | `/dashboard/costs/pricing`           | Modellenkénti díjszabási táblázat                           |
| Költségkeret     | `/dashboard/costs/budget`            | Költségkeret-küszöbértékek és riasztások                    |
| Kvótamegosztás   | `/dashboard/costs/quota-share`       | Kvótamegosztási készletek és használatuk                    |
| Tervkonfiguráció | `/dashboard/costs/quota-share/plans` | Szolgáltatónkénti tervfelülbírálások                        |

**Indoklás**: A Díjszabás, a Költségkeret és a Kvótamegosztás korábban a
`Monitorozás > Költségparaméterek` alatt szerepelt. Egy különálló felső szintű szakaszba
helyezve ezek az elemek a megfigyelhetőségi eszközökben való navigálás nélkül is könnyen megtalálhatók.

---

## Monitorozás szakasz (átszervezve)

A Monitorozás szakasz tetején most a **Tevékenység** található, amelyet **3 alcsoport** követ:

```
Monitorozás
├── Tevékenység          ← Idővonalas hírfolyam (felső szintű elem)
├── Naplók csoport
│   ├── Naplók (összes)
│   ├── Proxynaplók
│   └── Konzolnaplók
├── Auditálási csoport
│   ├── Auditnapló
│   ├── MCP-audit
│   └── A2A-audit
└── Rendszer csoport
    ├── Állapot
    └── Futásidejű környezet
```

### Mi változott a régi struktúrához képest?

| Korábban                                                                                                | Most                                                      |
| ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Tevékenység = a Naplók egyik lapja, amely az Auditnaplót jelenítette meg                                | Tevékenység = különálló hírfolyam (`/dashboard/activity`) |
| Költségparaméterek csoport a Monitorozáson belül                                                        | Áthelyezve a Költségek szakaszba                          |
| Egyszintű lista: Naplók, Tevékenység (naplók), Audit, Állapot, Futásidő, Díjszabás, Költségkeret, Kvóta | Strukturált 3 csoport és különálló Költségek szakasz      |

---

## Tevékenység és Auditnapló

A kettő mostantól különbözik:

| Szempont                    | Tevékenység (`/dashboard/activity`)                                    | Auditnapló (`/dashboard/audit`)                        |
| --------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------ |
| **Cél**                     | Felhasználóknak szánt eseményhírfolyam („mi történt nemrég”)           | Megfelelőségi/biztonsági napló                         |
| **Adatforrás**              | `GET /api/compliance/audit-log?level=high`                             | `GET /api/compliance/audit-log?level=all`              |
| **Formátum**                | Napok szerint csoportosított idővonal, közérthető igékkel és ikonokkal | Tömör, lapozható táblázat, oldalanként 50 bejegyzéssel |
| **Szűrők**                  | Eseménytípus-kategória                                                 | Művelet, súlyosság, végrehajtó, dátumtartomány         |
| **Exportálás**              | Nem érhető el                                                          | JSON-export                                            |
| **Végrehajtószűrő**         | Nem alkalmazható                                                       | Végrehajtó szerint szűrhető                            |
| **Megjelenített események** | Csak felső szintű műveletek (engedélyezési lista)                      | Minden auditesemény                                    |

### Felső szintű műveletek engedélyezési listája

A `src/lib/audit/highLevelActions.ts` fájlban van meghatározva. Ez szabályozza, hogy mely események jelenjenek meg
a Tevékenység hírfolyamban. Az engedélyezési lista a következőket tartalmazza:

- Szolgáltató hozzáadásával/eltávolításával/tesztelésével kapcsolatos események
- Kombináció létrehozása/frissítése/törlése
- API-kulcs életciklusa (létrehozás, visszavonás, rotáció)
- Költségkeret-küszöbérték elérése
- Bejelentkezés/kijelentkezés
- Felhőügynök-munkamenet létrehozása
- MCP-eszköz regisztrációja
- Webhook létrehozása/törlése
- Kvótakészlet-/tervmódosítások (`quota.*` műveletek, B csoport)
- Platformesemények (frissítés, üzembe helyezés)
- Képesség telepítése/eltávolítása

A listán nem szereplő események csak az Auditnaplóban jelennek meg.

### Új felső szintű művelet hozzáadása

Szerkeszd a `src/lib/audit/highLevelActions.ts` fájlt, és add hozzá a művelet karakterláncát a
`HIGH_LEVEL_ACTIONS` listához. Ehhez PR szükséges (a lista a kódban található, nem konfigurálható adatbázisból).
A hozzá tartozó ikon a `src/lib/audit/activityIcons.ts` fájlhoz adható hozzá.

---

## Átirányítás: `/dashboard/logs/activity`

A régi `/dashboard/logs/activity` útvonal véglegesen át van irányítva (HTTP 308) a
`/dashboard/activity` útvonalra a `permanentRedirect()` használatával, a
`src/app/(dashboard)/dashboard/logs/activity/page.tsx` fájlban.

A régi `logs-activity` oldalsávazonosító megmaradt a `HIDEABLE_SIDEBAR_ITEM_IDS`
listában (de el lett távolítva a `SIDEBAR_DEFINITIONS` listából), hogy ne sérüljenek azok a felhasználói előbeállítások,
amelyek a régi azonosítóra hivatkoznak.

---

## i18n

A B csoport által hozzáadott névterek:

| Névtérkulcs             | Lefedett terület                                                     |
| ----------------------- | -------------------------------------------------------------------- |
| `sidebar.costsSection`  | A Költségek szakasz címkéje                                          |
| `sidebar.activity`      | A Tevékenység oldalsáveleme                                          |
| `sidebar.logsGroup`     | A Naplók alcsoport címkéje                                           |
| `sidebar.systemGroup`   | A Rendszer alcsoport címkéje                                         |
| `sidebar.costsOverview` | A költségáttekintési elem                                            |
| `activity.*`            | A Tevékenység oldal összes szövege (cím, igék, szűrők, üres állapot) |

A hiteles forrásként szolgáló területi beállítások: `pt-BR` és `en`. A többi 40 területi beállítás az angolra áll vissza
a `next-intl` tartalékmechanizmusán keresztül (konfiguráció: `src/i18n/config.ts`).
