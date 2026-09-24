# Gamification & Leaderboard System (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **Hiteles forrás:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Legutóbb frissítve:** 2026-06-28 — v3.8.40

Az OmniRoute egy helyi működést előnyben részesítő gamifikációs réteget tartalmaz, amely
a platform használatáért jutalmazza a felhasználókat — kérések indításáért, szolgáltatóváltásért,
kombinációk létrehozásáért, tokenek megosztásáért és a közösség támogatásáért. Minden állapot
SQLite-adatbázisban található; a közösségi szerverekkel való föderáció opcionális és push-alapú.

A rendszert úgy tervezték, hogy **nulla késleltetést okozzon a kritikus útvonalon** — a gamifikációs
események „küldd és felejtsd el” módon indulnak el a kérésfeldolgozási folyamatból, és soha nem
blokkolják az LLM válaszát.

---

## Áttekintés

### Cél

A felhasználói aktivitás és megtartás növelése látható előrehaladás (XP,
szintek, jelvények), társadalmi megerősítés (ranglisták) és gazdasági ösztönzők
(tokenmegosztás, meghívási jutalmak) biztosításával.

### Hatókör

| Funkció              | Leírás                                                                    |
| -------------------- | ------------------------------------------------------------------------- |
| XP és szintek        | XP szerzése műveletenként; szintlépés polinomiális görbe mentén           |
| Jelvények            | Több mint 20 eredmény 5 kategóriában, 4 ritkasági szinttel                |
| Sorozatok            | Napi aktív használat követése az aktuális és leghosszabb sorozattal       |
| Ranglisták           | Globális, heti, havi, tokenmegosztási és hozzájárulási hatókörök          |
| Tokenmegosztás       | Kreditek átvitele felhasználók között kettős könyvelésű főkönyvvel        |
| Meghívás és beváltás | Ajánlói kódok SHA-256-kivonattal történő tárolással                       |
| Közösségi szerverek  | Föderáció külső OmniRoute-példányokkal                                    |
| Csalásvédelem        | Szerveroldali pontozás, sebességkorlátozás, z-pontszámos anomáliaészlelés |

### Tervezési alapelvek

1. **Helyi működés az első** — minden állapot SQLite-adatbázisban található, nincs szükség külső szolgáltatásokra.
2. **Nem blokkoló** — az események „küldd és felejtsd el” módon működnek; az LLM válaszútvonalát
   a gamifikációs logika soha nem késlelteti.
3. **A szerver a mérvadó** — az XP kiszámítása kizárólag szerveroldalon történik; a kliensek nem
   növelhetik mesterségesen a pontszámokat.
4. **Adatvédelem-központú** — a ranglistán való részvétel opcionális; a felhasználók
   elrejthetik profiljukat.
5. **Föderációra kész** — a közösségi szerverek aláírt API-n keresztül küldhetnek pontszámokat;
   a szinkronizálás felülírást végez, nem összeadást.

---

## Architektúra

### Magas szintű folyamat

```
Klienskérés
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (meglévő feldolgozási folyamat) ...
      → upstream válasz elküldése a kliensnek
      → setImmediate („küldd és felejtsd el”):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

Az eseménykibocsátó az egyetlen integrációs pont. A `chatCore.ts` a válasz elküldése után
meghívja az `emitGamificationEvent()` függvényt; az eseménymodul továbbítja az eseményt
az XP-, sorozat-, jelvény-, ranglista- és csalásvédelmi alrendszerekhez.

### Modulfüggőségi gráf

```
src/lib/gamification/
  events.ts          ← belépési pont (a chatCore.ts hívja meg)
    ├── xp.ts        ← XP-számítás és szintmeghatározás
    ├── streaks.ts   ← napi aktivitási sorozatok követése
    ├── badges.ts    ← jelvényfeltételek kiértékelése
    ├── leaderboard.ts ← helyezések kiszámítása és SSE-közvetítés
    ├── antiCheat.ts ← sebességkorlátozás és anomáliaészlelés
    ├── sharing.ts   ← tokenátviteli főkönyv
    ├── invites.ts   ← meghívó- és beváltási kódok kezelése
    ├── servers.ts   ← közösségi szerverek föderációja
    └── notifications.ts ← SSE-értesítési adatfolyam

src/lib/db/
  gamification.ts    ← minden CRUD-művelet (8 tábla)

src/app/api/gamification/
  leaderboard/       ← GET rangsorok, POST kézi frissítés
  leaderboard/stream ← SSE valós idejű frissítések
  transfer/          ← GET előzmények, POST tokenek küldése
  invite/            ← GET/POST kódok, DELETE visszavonás
  invite/redeem/     ← POST kód beváltása
  servers/           ← GET/POST/DELETE közösségi szerverek
  federation/score/  ← POST pontszám küldése a szervernek
  federation/leaderboard/ ← GET ranglista lekérése a szerverről
  notifications/     ← SSE jelvény- és szintlépési értesítések
  anomalies/         ← GET anomáliajelentések (rendszergazda)
  rotate/            ← POST meghívási tokenek titkos értékeinek cseréje
```

---

## Adatréteg

### Adatbázistáblák

Minden tábla a fő OmniRoute SQLite-adatbázisban található, amelyet a
`060_create_gamification.sql` migráció hoz létre. A WAL-naplózás a
`src/lib/db/core.ts` fájlban található egyke `getDbInstance()` példánytól öröklődik.

```
┌─────────────────────────┐     ┌──────────────────────────┐
│      leaderboard        │     │      user_levels          │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ api_key_id    TEXT PK    │
│ api_key_id    TEXT      │     │ xp            INTEGER    │
│ scope         TEXT      │     │ level         INTEGER    │
│ score         INTEGER   │     │ title         TEXT       │
│ period        TEXT      │     │ updated_at    TEXT       │
│ updated_at    TEXT      │     └──────────────────────────┘
└─────────────────────────┘
                │
                │ 1:N
                ▼
┌─────────────────────────┐     ┌──────────────────────────┐
│     user_badges         │     │    badge_definitions      │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ name          TEXT       │
│ badge_id      TEXT FK   │     │ category      TEXT       │
│ earned_at     TEXT      │     │ rarity        TEXT       │
│ notified      INTEGER   │     │ criteria_type TEXT       │
└─────────────────────────┘     │ criteria      TEXT(JSON) │
                                │ description   TEXT       │
                                │ icon          TEXT       │
                                │ hidden        INTEGER    │
                                └──────────────────────────┘

┌─────────────────────────┐     ┌──────────────────────────┐
│     xp_audit_log        │     │     token_ledger         │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ from_key_id   TEXT       │
│ action        TEXT      │     │ to_key_id     TEXT       │
│ xp_awarded    INTEGER   │     │ amount        INTEGER    │
│ metadata      TEXT(JSON)│     │ idempotency_key TEXT UQ  │
│ created_at    TEXT      │     │ created_at    TEXT       │
└─────────────────────────┘     └──────────────────────────┘

┌─────────────────────────┐     ┌──────────────────────────┐
│    invite_tokens        │     │   community_servers      │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ name          TEXT       │
│ code          TEXT UQ   │     │ url           TEXT       │
│ token_hash    TEXT      │     │ token_hash    TEXT       │
│ uses          INTEGER   │     │ status        TEXT       │
│ max_uses      INTEGER   │     │ last_sync     TEXT       │
│ created_at    TEXT      │     │ created_at    TEXT       │
│ expires_at    TEXT      │     └──────────────────────────┘
└─────────────────────────┘
```

### Tartománymodul: `src/lib/db/gamification.ts`

A szabványos OmniRoute-mintát követi — importálja a `getDbInstance()` függvényt a
`core.ts` fájlból, és típusos CRUD-függvényeket exportál. Az útvonalkezelőkben nincs nyers SQL.

Főbb függvények:

| Függvény                   | Leírás                                                                       |
| -------------------------- | ---------------------------------------------------------------------------- |
| `upsertLeaderboardEntry()` | Pontszám beszúrása vagy frissítése az (api_key_id, scope, period) értékekhez |
| `getLeaderboard()`         | Lapozott rangsor egy adott hatókörhöz/időszakhoz                             |
| `getUserLevel()`           | Felhasználói szintrekord lekérése vagy létrehozása                           |
| `updateUserLevel()`        | Az XP, a szint és a cím atomi beállítása                                     |
| `getBadgeDefinitions()`    | Minden jelvénydefiníció (opcionálisan szűrve)                                |
| `getUserBadges()`          | Egy felhasználó által megszerzett jelvények                                  |
| `awardBadge()`             | Jelvény megszerzésének beszúrása (idempotens a badge_id alapján)             |
| `logXpAction()`            | Bejegyzés hozzáfűzése az xp_audit_log naplóhoz                               |
| `getXpAuditLog()`          | Egy felhasználó lapozott auditálási előzményei                               |
| `insertLedgerEntry()`      | Kettős könyvelésű átutalás (tranzakcióban)                                   |
| `getBalance()`             | Egy felhasználó fogadott és elküldött összegeinek különbsége                 |
| `getTransferHistory()`     | Lapozott átutalási napló                                                     |
| `createInviteToken()`      | Meghívókód és kivonatolt token beszúrása                                     |
| `redeemInviteToken()`      | Keresés kód alapján, ellenőrzés, majd a felhasználások számának növelése     |
| `upsertCommunityServer()`  | Föderációs kiszolgáló regisztrálása vagy frissítése                          |
| `getCommunityServers()`    | Egy felhasználó kiszolgálóinak listázása                                     |
| `deleteCommunityServer()`  | Kiszolgáló-regisztráció eltávolítása                                         |

---

## XP- / szintrendszer

**Fájl:** `src/lib/gamification/xp.ts`

### Szintgörbe

Az `n`. szint eléréséhez szükséges XP egy polinomiális görbét követ:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Szint | XP a következő szintig | Összesített XP | Cím       |
| ----- | ---------------------- | -------------- | --------- |
| 1     | 100                    | 100            | Kezdő     |
| 5     | 1,118                  | 2,415          | Kezdő     |
| 10    | 3,162                  | 10,523         | Felfedező |
| 25    | 12,500                 | 86,024         | Felfedező |
| 50    | 35,355                 | 345,529        | Szakértő  |
| 75    | 64,952                 | 948,683        | Mester    |
| 100   | 100,000                | 2,050,000      | Legenda   |

### Címek

| Szinttartomány | Cím       |
| -------------- | --------- |
| 1 – 9          | Kezdő     |
| 10 – 24        | Felfedező |
| 25 – 49        | Szakértő  |
| 50 – 74        | Mester    |
| 75 – 100       | Legenda   |

### XP-jutalmak

| Művelet           | XP  | Leírás                                                               |
| ----------------- | --- | -------------------------------------------------------------------- |
| `request`         | 1   | Minden, az OmniRoute-on keresztül irányított API-kérés után          |
| `provider_switch` | 5   | Másik szolgáltatóra váltás                                           |
| `model_switch`    | 3   | Másik modellre váltás                                                |
| `combo_create`    | 10  | Új kombináció létrehozása                                            |
| `combo_use`       | 2   | Kombináció használata egy kéréshez                                   |
| `token_share`     | 1   | Másik felhasználóval megosztott minden 1 000 token után              |
| `invite_redeem`   | 50  | Meghívókód beváltása                                                 |
| `daily_login`     | 5   | Napi aktív használat (naponta egyszer)                               |
| `streak_bonus`    | 2   | Minden egymást követő sorozatnap után (a sorozat hosszával szorozva) |
| `badge_unlock`    | 10  | Jelvény feloldása                                                    |

### Odaítélési folyamat

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. Az XP-mennyiség lekéréséhez keresd ki az `XP_REWARDS[action]` értékét.
2. Add át a `checkRateLimit()` függvénynek (csalásvédelem: kulcsonként legfeljebb 1000 XP/perc).
3. Nyiss egy tranzakciót:
   - Olvasd be az aktuális `user_levels` sort.
   - Add hozzá az XP-t; számítsd újra a szintet a `levelFromXp(totalXp)` segítségével.
   - Ha a szint megváltozott, állítsd a `levelUp = true` értéket.
   - Frissítsd a `user_levels` sort.
   - Szúrj be egy bejegyzést az `xp_audit_log` táblába.
4. Add vissza az eredményt. Az értesítéseket a hívó kezeli.

### Segédfüggvény: `levelFromXp(totalXp)`

Végigiterál az 1..100 szinteken, és összegzi az `xp_for_level(n)` értékeit, amíg az összesített XP
meg nem haladja a `totalXp` értékét. Azt a legmagasabb szintet adja vissza, amelynek küszöbértéke teljesült.
Ennek komplexitása O(100) — elfogadható, mivel a szintek felső határa 100.

---

## Jelvényrendszer

**Fájl:** `src/lib/gamification/badges.ts`

### Kategóriák

| Kategória      | Leírás                                        | Példajelvények                           |
| -------------- | --------------------------------------------- | ---------------------------------------- |
| `usage`        | Mennyiségen alapuló mérföldkövek              | Első kérés, 1K kérés, 100K               |
| `sharing`      | Tokenmegosztás és ajánlások                   | Első megosztás, Nagylelkű (10 megosztás) |
| `contribution` | Közösségi részvétel                           | Kombinációkészítő, Szolgáltató-felfedező |
| `streak`       | Hosszú távú következetesség                   | Heti harcos, Havi elkötelezett           |
| `rare`         | Nehezen megszerezhető vagy rejtett eredmények | Korai alkalmazó, Hibabejelentő           |

### Ritkasági szintek

| Ritkaság    | Szín   | Valószínűségi iránymutatás |
| ----------- | ------ | -------------------------- |
| `common`    | Szürke | A legtöbb felhasználó      |
| `uncommon`  | Zöld   | Aktív felhasználók         |
| `rare`      | Kék    | Elkötelezett felhasználók  |
| `legendary` | Arany  | Felső 1%                   |

### Feltételtípusok

| Típus          | Mező         | Leírás                                                 |
| -------------- | ------------ | ------------------------------------------------------ |
| `action_count` | `count`      | Egy művelet N-szeri végrehajtása (pl. 1000 kérés)      |
| `streak`       | `days`       | Sorozat fenntartása N egymást követő napon             |
| `unique_count` | `field`, `n` | N egyedi érték használata (pl. 10 különböző modell)    |
| `rank`         | `scope`, `n` | Az N. helyezés elérése egy ranglista adott hatókörében |
| `first`        | —            | Elsőként végrehajtani egy műveletet                    |
| `hidden`       | (változó)    | A megszerzésig nem megjelenített feltételek            |

A jelvénydefiníciókat a `badge_definitions` tárolja JSON-formátumú `criteria` mezőként:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Kiértékelési folyamat

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # minden definíció
    → getUserBadges(apiKeyId)         # már megszerzettek (kihagyás)
    → minden még meg nem szerzett jelvénynél:
       → matchesCriteria(badge, event, userState)
       → ha egyezik: awardBadge(apiKeyId, badgeId)
         → az értesítési adatstruktúra visszaadása
```

A kiértékelés **eseményvezérelt** — minden gamifikációs esemény után lefut, de
csak azokat a jelvényeket ellenőrzi, amelyek `criteria.type` értéke illeszkedik az esemény műveletéhez. Ez
gyorsan tartja a kiértékelést (a legtöbb eseménynél < 5ms).

### `matchesCriteria(badge, event, userState)`

| Feltételtípus  | Ellenőrzés                                                     |
| -------------- | -------------------------------------------------------------- |
| `action_count` | `getActionCount(apiKeyId, action) >= count`                    |
| `streak`       | `getCurrentStreak(apiKeyId) >= days`                           |
| `unique_count` | `getUniqueCount(apiKeyId, field) >= n`                         |
| `rank`         | `getRank(apiKeyId, scope) <= n`                                |
| `first`        | Nincs korábbi `xp_audit_log`-bejegyzés ehhez a művelettípushoz |
| `hidden`       | Átadja a megfelelő részellenőrzésnek                           |

### Beépített jelvények (20+)

<details>
<summary>Teljes jelvénylista</summary>

| Jelvény               | Kategória    | Ritkaság    | Feltétel                                      |
| --------------------- | ------------ | ----------- | --------------------------------------------- |
| Első lépések          | használat    | gyakori     | 1 kérés                                       |
| Bemelegítés           | használat    | gyakori     | 100 kérés                                     |
| Kiemelt felhasználó   | használat    | nem gyakori | 1,000 kérés                                   |
| Centurió              | használat    | ritka       | 10,000 kérés                                  |
| OmniPower             | használat    | legendás    | 100,000 kérés                                 |
| Szolgáltató-váltogató | hozzájárulás | gyakori     | 5 különböző szolgáltató használata            |
| Szolgáltatómester     | hozzájárulás | nem gyakori | 20 különböző szolgáltató használata           |
| Kombóépítész          | hozzájárulás | nem gyakori | 5 kombó létrehozása                           |
| Kombónagymester       | hozzájárulás | ritka       | 25 kombó létrehozása                          |
| Első megosztás        | megosztás    | gyakori     | 1 tokenátutalás                               |
| Nagylelkű             | megosztás    | nem gyakori | 10 tokenátutalás                              |
| Emberbarát            | megosztás    | ritka       | Összesen 10,000 token átutalása               |
| Ajánló                | megosztás    | gyakori     | 1 sikeres ajánlás                             |
| Hálózatépítő          | megosztás    | nem gyakori | 10 sikeres ajánlás                            |
| Heti harcos           | sorozat      | nem gyakori | 7 napos sorozat                               |
| Havi elkötelezett     | sorozat      | ritka       | 30 napos sorozat                              |
| Megállíthatatlan      | sorozat      | legendás    | 365 napos sorozat                             |
| Korai alkalmazó       | ritka        | legendás    | Csatlakozás a bétaidőszak alatt               |
| Tömörítési úttörő     | ritka        | nem gyakori | A tömörítés 100 alkalommal történő használata |
| Képességgyűjtő        | ritka        | ritka       | 10 különböző képesség használata              |
| Modellfelfedező       | hozzájárulás | nem gyakori | 15 különböző modell használata                |

</details>

---

## Sorozatkövető

**Fájl:** `src/lib/gamification/streaks.ts`

### Adatmodell

A sorozatok a `key_value` táblában (megosztott segédtábla), névtérrel ellátott
kulcsok alatt vannak tárolva:

| Kulcs                         | Érték                            | Leírás               |
| ----------------------------- | -------------------------------- | -------------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Aktív sorozat adatai |

### Logika

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. A sorozatrekord beolvasása a `key_value` táblából.
2. A `{current}`, `{longest}`, `{lastDate}` (ISO-dátumkarakterlánc) értékek feldolgozása.
3. Ha `lastDate === today` — nincs változás (a mai nap már számításba lett véve).
4. Ha `lastDate === yesterday` — a `current` növelése; szükség esetén a `longest` frissítése.
5. Ha `lastDate < yesterday` — a `current = 1` visszaállítása (a sorozat megszakadt).
6. A frissített rekord mentése.
7. Mérföldkövek ellenőrzése: 7, 14, 30, 60, 90, 180, 365 nap. Mérföldkő elérésekor a
   `milestone = true` beállítása (a hívó XP-t ad, és ellenőrzi a jelvényeket).

### Szélsőséges esetek

- **Időzóna**: a sorozatok UTC-dátumokat használnak (`new Date().toISOString().slice(0, 10)`).
  Ez szándékos — egyetlen kanonikus időzóna használata megakadályozza az
  időzónák közötti váltással történő visszaélést.
- **Új felhasználók**: nem létezik sorozatrekord; az első kérés létrehozza azt
  `current=1, longest=1, lastDate=today` értékekkel.
- **Naponta több kérés**: csak az adott UTC-nap első kérése
  növeli a sorozatot.

---

## Ranglista

**Fájl:** `src/lib/gamification/leaderboard.ts`

### Hatókörök

| Hatókör         | Időszak | Leírás                                                          |
| --------------- | ------- | --------------------------------------------------------------- |
| `global`        | `all`   | Mindenkori összesített XP                                       |
| `weekly`        | `week`  | Az aktuális UTC-héten (hétfőtől vasárnapig) szerzett XP         |
| `monthly`       | `month` | Az aktuális UTC-hónapban szerzett XP                            |
| `tokens_shared` | `all`   | Másoknak átadott tokenek teljes száma                           |
| `contributions` | `all`   | Létrehozott kombók + használt szolgáltatók + használt készségek |

### Helyezések kiszámítása

A helyezések **olvasáskor kerülnek kiszámításra**, nincsenek tárolva. Ez
elkerüli az elavult helyezési adatokat, és szükségtelenné teszi az időszakos
helyezés-újraszámítási feladatokat.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

Lekérdezési minta:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### Időszakváltás

A heti és havi ranglisták automatikusan váltanak:

1. **Archiválás**: az időszak határán az aktuális bejegyzések átmásolása a
   `leaderboard_archive` táblába az időszak címkéjével.
2. **Visszaállítás**: a lejárt időszak bejegyzéseinek törlése.
3. **Aktiválás**: minden `updateLeaderboard()` híváskor ellenőrzés történik; az új időszak
   első kérése aktiválja a váltást.

Ez biztosítja, hogy a heti ranglisták minden hétfőn 00:00 UTC-kor, a havi
ranglisták pedig minden hónap első napján visszaálljanak.

### Valós idejű SSE-frissítések

**Végpont:** `GET /api/gamification/stream`

```
Kliens → GET /api/gamification/stream
  → SSE-kapcsolat létrejön
  → A szerver azonnal elküldi a ranglista első 10 helyezettjének pillanatképét
  → 5 másodpercenként: a frissített első 10 helyezett elküldése, ha változás történt
  → 15 másodpercenként: életjel-megjegyzés (": heartbeat\n\n")
  → A kliens bontja a kapcsolatot → tisztítás (figyelő eltávolítása)
```

Eseményformátum:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

Az SSE-kezelő hatókörönként követi a csatlakoztatott klienseket, és csak akkor
küld frissítéseket, ha a ranglista adatai ténylegesen megváltoztak a legutóbbi
küldés óta.

---

## Tokenek megosztása

**Fájl:** `src/lib/gamification/sharing.ts`

### Kettős könyvelésű főkönyv

Minden átutalás két sort hoz létre a `token_ledger` táblában:

| Sor      | `from_key_id` | `to_key_id` | `amount` |
| -------- | ------------- | ----------- | -------- |
| Terhelés | küldő         | fogadó      | +összeg  |
| Jóváírás | fogadó        | küldő       | -összeg  |

Várjunk — a konvenció a következő:

| Sor     | `from_key_id` | `to_key_id` | `amount` | Jelentés              |
| ------- | ------------- | ----------- | -------- | --------------------- |
| Küldés  | küldő         | fogadó      | +összeg  | Kiáramlás a küldőtől  |
| Fogadás | fogadó        | küldő       | +összeg  | Beáramlás a fogadóhoz |

Az egyenleg kiszámítása:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Az átutalás folyamata

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Ellenőrzés**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **Idempotencia**: ellenőrizni kell, hogy az `idempotency_key` már létezik-e a főkönyvben.
   Ha igen, a gyorsítótárazott eredményt kell visszaadni.
3. **Tranzakció** (egyetlen SQLite-tranzakció):
   a. A küldő egyenlegének kiszámítása.
   b. Ha `balance < amount`, megszakítás (nincs elegendő fedezet).
   c. A küldési sor beszúrása (`from=sender,` érték visszaadása.

### Sebességkorlátozás

- API-kulcsonként percenként legfeljebb 10 átutalás.
- Egyetlen átutalással legfeljebb 10 000 token küldhető.
- API-kulcsonként naponta legfeljebb 100 000 token utalható át.

---

## Meghívó- és beváltási tokenek

**Fájl:** `src/lib/gamification/invites.ts`

### Kódformátum

- **Kód**: 8 karakteres alfanumerikus kód (például `A3K9-X7M2`), ember által olvasható,
  és megjelenik a felhasználónak.
- **Token**: 32 bájtos véletlenszerű token, SHA-256-kivonatként tárolva. Programozott
  beváltásra szolgál (például URL-hivatkozásokban).

### Tárolás

| Oszlop       | Érték                         |
| ------------ | ----------------------------- |
| `code`       | `A3K9X7M2` (egyedi, indexelt) |
| `token_hash` | SHA-256(raw_token)            |

A nyers tokent a rendszer pontosan egyszer, a létrehozáskor adja vissza a felhasználónak. Az OmniRoute
soha többé nem tárolja és nem jeleníti meg — kizárólag a kivonat marad meg.

### Az önajánlás megakadályozása

Amikor egy felhasználó bevált egy kódot, a rendszer ellenőrzi a következőket:

1. A kód egy másik `api_key_id` értékhez tartozik.
2. A beváltó felhasználó korábban még nem váltott be kódot ugyanattól
   az ajánlótól (összekapcsolás az `invite_tokens` és a beváltási napló alapján).

Ha bármelyik ellenőrzés sikertelen, a rendszer egyértelmű hibaüzenettel elutasítja a beváltást.

### Lejárat és korlátozások

- Alapértelmezett `max_uses`: 10 (létrehozáskor konfigurálható).
- Alapértelmezett `expires_at`: a létrehozástól számított 30 nap.
- A lejárt vagy felhasználási korlátjukat elért kódok HTTP 410 Gone választ eredményeznek.

---

## Közösségi szerverek föderációja

**Fájl:** `src/lib/gamification/servers.ts`

### Csatlakozás

Egy közösségi szerver regisztrációja a távoli szerver által kiadott meghívási tokennel történik. A helyi példány:

1. Fogadja a meghívási tokent (például az irányítópultra beillesztve).
2. Meghívja a távoli szerver `POST /api/gamification/federation/leaderboard` végpontját a token ellenőrzéséhez és az aktuális ranglista lekéréséhez.
3. `status: connected` értékkel tárolja a szerver rekordját.

### Szinkronizálási modell

A föderáció **felülíró szinkronizálást** használ, nem összeadót:

```
Helyi példány                 Közösségi szerver
     │                              │
     ├── pontszám küldése ─────────►│  POST /federation/score
     │   { api_key_id, score }      │  (a szerver ellenőrzi a token hashét)
     │                              │
     ├── ranglista lekérése ───────►│  GET /federation/leaderboard
     │◄── első N bejegyzés ─────────┤  (felülírja a helyi gyorsítótárat)
     │                              │
     └── állapotellenőrzés ────────►│  GET /federation/health
         (60 másodpercenként,       │
          5 másodperces időtúllépés)
```

### Hitelesítés

A föderációs kérések a következőket tartalmazzák:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

A távoli szerver hasheli a tokent, és megkeresi a hozzá tartozó
`community_servers` sort. Így nem kell továbbítani a tárolt hasht.

### Állapotfigyelés

Minden szerverrekord a következőket követi nyomon:

| Mező        | Leírás                                          |
| ----------- | ----------------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable`          |
| `last_sync` | Az utolsó sikeres szinkronizálás ISO-időbélyege |
| `failures`  | Egymást követő sikertelen állapotellenőrzések   |

5 egymást követő sikertelen ellenőrzés után az állapot `unreachable` értékre
változik, és a szinkronizálás szünetel, amíg egy kézi állapotellenőrzés sikerrel
nem jár.

---

## Csalás elleni védelem

**Fájl:** `src/lib/gamification/antiCheat.ts`

### Szerveroldali pontszámítás

Minden XP-számítás a `src/lib/gamification/xp.ts` fájlban történik. A kliensek
soha nem küldenek be pontszámot — műveleteket küldenek be, az XP-t pedig a
szerver számítja ki. A `leaderboard.score` oszlopot kizárólag szerveroldali kód
írhatja.

### Sebességkorlátozás

| Korlát                       | Érték   | Hatókör         |
| ---------------------------- | ------- | --------------- |
| Maximális XP percenként      | 1,000   | API-kulcsonként |
| Maximális átvitel percenként | 10      | API-kulcsonként |
| Maximális átviteli összeg    | 10,000  | Átvitelenként   |
| Maximális napi átvitel       | 100,000 | API-kulcsonként |

A sebességkorlátozások memóriában tárolt csúszó időablakot használnak
(ugyanazt a mintát, mint az `open-sse/services/` könyvtárban található
`RateLimitManager`). Ha a folyamat újraindul, a rendszer SQLite-alapú
számlálókra vált vissza.

### Z-pontszámos anomáliaészlelés

A rendszer minden API-kulcshoz gördülő, 7 napos ablakban tartja nyilván az
óránként megszerzett XP-t. Minden XP-jóváíráskor:

1. Kiszámítja a felhasználó aktuális óránkénti XP-rátáját.
2. Kiszámítja a sokasági átlagot és szórást.
3. Kiszámítja a `z = (user_rate - mean) / stddev` értéket.
4. Ha `z > 3.0` (3 szórás), anomáliaként jelöli meg.

Az anomáliák az `xp_audit_log` naplóba kerülnek
`action = 'anomaly_detected'` értékkel, és megjelennek az adminisztrátori
irányítópulton.

### Auditnapló

Minden XP-jóváírás, átvitel, jelvényszerzés és anomáliaészlelés bekerül az
`xp_audit_log` naplóba a következőkkel:

| Mező         | Leírás                                            |
| ------------ | ------------------------------------------------- |
| `api_key_id` | Ki                                                |
| `action`     | Mi történt (xp_award, transfer, anomaly, …)       |
| `xp_awarded` | Mennyiség (nem XP-eseményeknél 0)                 |
| `metadata`   | Kontextust tartalmazó JSON (művelettípus, cél, …) |
| `created_at` | Mikor (ISO 8601)                                  |

Az adminisztrátorok a teljes auditnaplót a
`GET /api/gamification/anomalies` végponton kérdezhetik le.

---

## API-útvonalak

Minden útvonal a szabványos OmniRoute mintát követi:

```
Útvonal → CORS előzetes kérés → Törzs ellenőrzése (Zod) → Hitelesítés (extractApiKey)
  → Kiszolgáló
```

### Végpontok

| Metódus | Útvonal                                    | Leírás                                               | Hitelesítés    |
| ------- | ------------------------------------------ | ---------------------------------------------------- | -------------- |
| GET     | `/api/gamification/leaderboard`            | Ranglista lekérése (hatókör, időszak, lapozás)       | Opcionális     |
| POST    | `/api/gamification/leaderboard`            | A ranglista gyorsítótárának kényszerített frissítése | Kötelező       |
| GET     | `/api/gamification/stream`                 | Valós idejű ranglistafrissítések SSE-n keresztül     | Opcionális     |
| GET     | `/api/gamification/transfer`               | Átutalási előzmények lekérése (lapozás)              | Kötelező       |
| POST    | `/api/gamification/transfer`               | Tokenek küldése egy másik felhasználónak             | Kötelező       |
| GET     | `/api/gamification/invite`                 | Saját meghívókódok listázása                         | Kötelező       |
| POST    | `/api/gamification/invite`                 | Új meghívókód létrehozása                            | Kötelező       |
| DELETE  | `/api/gamification/invite`                 | Meghívókód visszavonása                              | Kötelező       |
| POST    | `/api/gamification/invite/redeem`          | Meghívókód beváltása                                 | Kötelező       |
| GET     | `/api/gamification/servers`                | Közösségi szerverek listázása                        | Kötelező       |
| POST    | `/api/gamification/servers`                | Csatlakozás egy közösségi szerverhez                 | Kötelező       |
| DELETE  | `/api/gamification/servers`                | Leválasztás egy közösségi szerverről                 | Kötelező       |
| POST    | `/api/gamification/federation/score`       | Pontszám továbbítása távoli szerverre                | Föderáció      |
| GET     | `/api/gamification/federation/leaderboard` | Ranglista lekérése távoli szerverről                 | Föderáció      |
| GET     | `/api/gamification/notifications`          | SSE-jelvény- és szintlépési értesítések              | Kötelező       |
| GET     | `/api/gamification/anomalies`              | Anomáliajelentések megtekintése (adminisztrátor)     | Adminisztrátor |
| POST    | `/api/gamification/rotate`                 | Meghívási tokenek titkos kulcsainak rotálása         | Kötelező       |

### Kérés- és válaszpéldák

**POST /api/gamification/transfer**

```json
// Kérés
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// 200-as válasz
{
  "success": true,
  "transfer": {
    "id": "txn-uuid",
    "from": "sender-api-key-id",
    "to": "recipient-api-key-id",
    "amount": 500,
    "createdAt": "2026-05-19T12:00:00.000Z"
  },
  "balance": 2500
}

// 400-as válasz (elégtelen fedezet)
{
  "error": "Insufficient balance",
  "balance": 200,
  "requested": 500
}
```

**GET /api/gamification/leaderboard?scope=weekly&limit=10**

```json
{
  "scope": "weekly",
  "period": "2026-W20",
  "entries": [
    {
      "rank": 1,
      "apiKeyId": "key-uuid",
      "displayName": "User***1234",
      "score": 15230,
      "level": 42,
      "title": "Expert"
    }
  ],
  "total": 847,
  "updatedAt": "2026-05-19T12:00:00.000Z"
}
```

---

## MCP-eszközök (8)

A meglévő eszközök mellett, az `open-sse/mcp-server/` könyvtárban regisztrálva. A
`gamification` jogosultsági hatókör alá tartoznak.

| Eszköz                     | Leírás                                                    | Bemeneti séma                |           |
| -------------------------- | --------------------------------------------------------- | ---------------------------- | --------- |
| `gamification_leaderboard` | Ranglista lekérése egy hatókörre/időszakra                | `{ scope, period?, limit? }` |
| `gamification_rank`        | A hívó rangjának és szomszédainak lekérése                | `{ scope }`                  |
| `gamification_profile`     | XP-, szint-, cím- és sorozatösszesítő lekérése            | `{}`                         |
| `gamification_badges`      | Megszerzett jelvények vagy összes definíció               | `{ earned?: boolean }`       |
| `gamification_transfer`    | Tokenek küldése egy másik felhasználónak                  | `{ to, amount }`             |
| `gamification_invite`      | Meghívókódok létrehozása vagy listázása                   | `{ action: "create"          | "list" }` |
| `gamification_servers`     | Közösségi szerverek listázása vagy csatlakoztatása        | `{ action, token? }`         |
| `gamification_anomalies`   | Anomáliajelentések megtekintése (adminisztrátori hatókör) | `{ limit?, since? }`         |

---

## Irányítópultoldalak

### `/dashboard/leaderboard`

- Dobogós megjelenítés (az első 3 helyezett avatarral és XP-vel).
- Hatókörválasztó: Globális / Heti / Havi / Megosztott tokenek / Hozzájárulások.
- Lapozható táblázat (oldalanként 25 bejegyzés) ranggal, névvel, pontszámmal, szinttel és címmel.
- SSE-alapú valós idejű frissítések — a rangváltozások animálva jelennek meg.
- Az aktuális felhasználó kiemelve jelenik meg a táblázatban egy rögzített „Saját rang” sorral.

### `/dashboard/profile`

- XP-folyamatjelző az aktuális szinttel és a következő szint küszöbértékével.
- A címjelvény kiemelten jelenik meg.
- Jelvénygaléria — a megszerzett jelvények a megszerzés dátumával, a meg nem szerzett jelvények pedig kiszürkítve jelennek meg
  (a rejtett jelvényeken megszerzésükig „???” látható).
- Sorozatszámláló lángikonnal; sorozatnaptár (az elmúlt 30 nap).
- XP-előzménydiagram (napi XP az elmúlt 30 napban).

### `/dashboard/tokens`

- Tokenegyenleg (kiemelten, az oldal tetején).
- Átutalási űrlap: címzett, összeg, megerősítő párbeszédpanel.
- Átutalási előzmények táblázata szűrőkkel (elküldött/fogadott/összes).
- Meghívási szakasz: aktív kódok, új létrehozása, hivatkozás megosztása.
- Közösségi szerverek: lista állapotjelzővel, csatlakozás/leválasztás.

### `/dashboard/gamification/admin`

- Anomáliák listája súlyossággal, felhasználóval, időbélyeggel és z-pontszámmal.
- Auditnapló-megjelenítő szűrőkkel (művelettípus, felhasználó, dátumtartomány).
- Rendszerstatisztikák: összes kiosztott XP, aktív felhasználók, jelvényszerzési arányok.
- Az összevont szerverek állapotának áttekintése.

---

## Integráció a feldolgozási folyamatba

### Integrációs pont

A gamifikáció egyetlen ponton kapcsolódik be a kérésfeldolgozási folyamatba az
`open-sse/handlers/chatCore.ts` fájlban:

```typescript
// Miután a válasz elküldésre került az ügyfélnek:
setImmediate(() => {
  emitGamificationEvent({
    type: "request.completed",
    apiKeyId,
    metadata: {
      provider: selectedProvider,
      model: selectedModel,
      comboId: resolvedCombo?.id,
      compressionUsed: compressionStats?.applied,
      skillUsed: skillExecution?.name,
    },
  }).catch(() => {
    // Elindítás és elfelejtés: naplózza, de soha ne továbbítsa az ügyfélnek
  });
});
```

### Eseménytípusok

| Eseménytípus        | Kibocsátás időpontja                                             |
| ------------------- | ---------------------------------------------------------------- |
| `request.completed` | A sikeres LLM-válasz elküldésekor                                |
| `provider.switch`   | Szolgáltatóváltáskor (a kombináció tartalékra váltása is számít) |
| `combo.created`     | Új kombinációkonfiguráció mentésekor                             |
| `combo.used`        | A kombináció céljának sikeres elérésekor                         |
| `badge.earned`      | Amikor a jelvényértékelés egyezést talál                         |
| `streak.milestone`  | Egy sorozatküszöb átlépésekor                                    |
| `transfer.sent`     | Tokenátutalás befejezésekor                                      |
| `referral.redeemed` | Meghívókód sikeres beváltásakor                                  |
| `compression.used`  | Prompttömörítés alkalmazásakor                                   |
| `skill.executed`    | Készségvégrehajtás befejezésekor                                 |
| `model.first_use`   | Ha a modellt az elmúlt 7 napban nem használták                   |

### Blokkolásmentességi garancia

A `setImmediate` + `.catch(() => {})` minta biztosítja, hogy:

1. A válasz teljes egészében elküldésre kerüljön a gamifikáció futása előtt.
2. A gamifikációs hibák soha ne jelenjenek meg az ügyfélnél.
3. Az eseményfeldolgozás a következő mikrofelsadatban fusson, ne közvetlenül a kódsorban.

---

## Biztonság

### Fenyegetési modell

| Fenyegetés                                  | Védekezés                                                                               |
| ------------------------------------------- | --------------------------------------------------------------------------------------- |
| Pontszám mesterséges növelése               | Kizárólag szerveroldali XP-számítás; az ügyfelek műveleteket, nem pontszámokat küldenek |
| Visszajátszási támadások                    | Idempotenciakulcsok az átutalásoknál; az auditnapló deduplikálása                       |
| Átutalási csalás                            | Kettős könyvelésű főkönyv; atomi tranzakciók; sebességkorlátok                          |
| Önmeghívás                                  | Az `api_key_id` keresztellenőrzése beváltáskor                                          |
| Ranglista manipulálása                      | Z-pontszám-alapú anomáliaészlelés; adminisztrátori anomália-irányítópult                |
| Föderációs token ellopása                   | SHA-256-kivonattal történő tárolás; a nyers token csak egyszer jelenik meg              |
| Meghívókódok nyers erővel történő feltörése | Sebességkorlátozás a beváltási végponton; 8 karakteres entrópia                         |
| XSS a megjelenítési nevekben                | A megjelenítési nevek tisztítva; a ranglistabejegyzések escape-elve                     |
| Időzítési támadások a kivonatok ellen       | `crypto.timingSafeEqual` használata a tokenkivonatok összehasonlításához                |

### Hitelesítési követelmények

- **Nyilvános** (nincs hitelesítés): `GET /leaderboard`, `GET /stream` (csak olvasható
  ranglisták).
- **API-kulcs szükséges**: minden írási művelethez, profilhoz, átutaláshoz és meghíváshoz.
- **Csak adminisztrátoroknak**: anomália-irányítópult, auditnapló-megjelenítő.
- **Föderáció**: külön hitelesítési útvonal az `Authorization` fejlécben megadott nyers
  token használatával, amelyet a tárolt SHA-256-kivonattal szemben ellenőriznek.

---

## Tesztelés

### Tesztfájlok

Minden teszt a Node.js natív tesztfuttatóját használja (`node --import tsx/esm --test`).

| Tesztfájl                                     | Lefedett terület                            | Tesztek |
| --------------------------------------------- | ------------------------------------------- | ------- |
| `tests/unit/gamification/xp.test.ts`          | XP-számítás, szintgörbe, címek              | 8       |
| `tests/unit/gamification/badges.test.ts`      | Jelvényfeltételek egyeztetése, odaítélés    | 10      |
| `tests/unit/gamification/streaks.test.ts`     | Sorozatlogika, mérföldkövek, szélső esetek  | 7       |
| `tests/unit/gamification/leaderboard.test.ts` | Helyezésszámítás, lapozás, rotáció          | 8       |
| `tests/unit/gamification/sharing.test.ts`     | Átutalások, egyenleg, idempotencia          | 9       |
| `tests/unit/gamification/invites.test.ts`     | Létrehozás, beváltás, lejárat, önmeghívás   | 7       |
| `tests/unit/gamification/antiCheat.test.ts`   | Sebességkorlátok, Z-pontszám, auditnaplózás | 6       |
| `tests/unit/gamification/events.test.ts`      | Eseménykibocsátás, szétosztás, hibakezelés  | 5       |

### Tesztek futtatása

```bash
# Minden gamifikációs teszt
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# Egyetlen tesztfájl
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Lefedettségi követelmények

A `CONTRIBUTING.md` szerint minden új modulnak rendelkeznie kell a következőkkel:

- Áglefedettség >= 80%.
- Minden nyilvános függvényt legalább egyszer tesztelni kell.
- A hibautakat tesztelni kell (elégtelen egyenleg, lejárt kódok, sebességkorlátok).

---

## Fájlstruktúra

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # Mind a 8 tábla és az indexek
      gamification.ts                  # Tartományi CRUD-modul
    gamification/
      xp.ts                           # XP-számítás, szintgörbe, címek
      badges.ts                       # Jelvénydefiníciók, feltételek, kiértékelés
      streaks.ts                      # Napi sorozatok követése
      leaderboard.ts                  # Helyezésszámítás, SSE, rotáció
      antiCheat.ts                    # Sebességkorlátozás, z-pontszám, auditálás
      sharing.ts                      # Tokenátviteli főkönyv
      invites.ts                      # Meghívó-/beváltókódok
      servers.ts                      # Közösségi szerverek föderációja
      events.ts                       # Eseménykibocsátó (integrációs pont)
      notifications.ts                # SSE-értesítési adatfolyam
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST ranglista
        leaderboard/stream/route.ts   # Valós idejű SSE-frissítések
        transfer/route.ts             # GET/POST átvitelek
        invite/route.ts               # GET/POST/DELETE meghívókódok
        invite/redeem/route.ts        # POST kódbeváltás
        servers/route.ts              # GET/POST/DELETE szerverek
        federation/score/route.ts     # POST pontszám küldése
        federation/leaderboard/route.ts # GET ranglista lekérése
        notifications/route.ts        # SSE-értesítések
        anomalies/route.ts            # GET anomáliajelentések
        rotate/route.ts               # POST titkok rotációja
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Helyezési oldal
        profile/page.tsx               # XP-/jelvény-/sorozatoldal
        tokens/page.tsx                # Egyenleg-/átvitel-/meghívóoldal
        gamification/admin/page.tsx    # Adminisztrátori anomáliafigyelés
  shared/
    constants/
      gamification.ts                  # XP_REWARDS, TITLES, BADGE_DEFS, LIMITS

tests/
  unit/
    gamification/
      xp.test.ts
      badges.test.ts
      streaks.test.ts
      leaderboard.test.ts
      sharing.test.ts
      invites.test.ts
      antiCheat.test.ts
      events.test.ts

docs/
  frameworks/
    GAMIFICATION.md                    # Ez a dokumentum
```

---

## Migrációs stratégia

### 1. fázis: Alapvető háttérrendszer (PR 1)

- `060_create_gamification.sql` migráció (8 tábla).
- `src/lib/db/gamification.ts` (tartományi modul).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- Integrációs pont a `chatCore.ts` fájlban.
- Egységtesztek az XP-hez, a sorozatokhoz és az eseményekhez.

### 2. fázis: Jelvények és ranglista (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Jelvénydefiníciók a konstansok között.
- Ranglista-API-útvonalak és SSE-adatfolyam.
- Egységtesztek a jelvényekhez és a ranglistához.

### 3. fázis: Megosztás és meghívók (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- Átviteli és meghívási API-útvonalak.
- Egységtesztek a megosztáshoz, a meghívókhoz és a csalás elleni védelemhez.

### 4. fázis: Föderáció és irányítópult (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- Föderációs API-útvonalak.
- Irányítópultoldalak (ranglista, profil, tokenek, adminisztráció).
- MCP-eszközök regisztrációja.

---

## Jövőbeli megfontolások

- **Szezonális események**: időben korlátozott jelvénykészletek és ranglistaszezonok.
- **Csapatranglisták**: felhasználók csoportosítása szervezet vagy kombó szerint.
- **XP-szorzók**: az XP növelése promóciós időszakokban.
- **Eredmények megosztása**: megosztható jelvénykártyák generálása (OpenGraph-képek).
- **Mobilos push értesítések**: webhookalapú értesítések jelvény- és szintemelkedési eseményekről.
- **Ranglista-API**: nyilvános API harmadik felek integrációihoz.
