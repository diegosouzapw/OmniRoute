# Gamification & Leaderboard System (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **Tõeallikas:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Viimati uuendatud:** 2026-06-28 — v3.8.40

OmniRoute sisaldab lokaalsusest lähtuvat mängustamiskihti, mis premeerib kasutajaid
platvormi kasutamise eest — päringute tegemise, teenusepakkujate vahetamise,
kombode loomise, tokenite jagamise ja kogukonda panustamise eest. Kogu olek asub
SQLite'is; liitmine kogukonnaserveritega on vabatahtlik ja põhineb andmete saatmisel.

Süsteem on loodud töötama **põhiteel null-latentsusega** — mängustamissündmused
saadetakse päringukonveierist välja saatmise ja unustamise põhimõttel ega blokeeri
kunagi LLM-i vastust.

---

## Ülevaade

### Eesmärk

Suurendada kasutajate kaasatust ja kasutajate püsimist, pakkudes nähtavat edenemist (XP,
tasemed, märgid), sotsiaalset tõestust (edetabelid) ja majanduslikke stiimuleid (tokenite
jagamine, kutsete preemiad).

### Ulatus

| Funktsioon               | Kirjeldus                                                                                            |
| ------------------------ | ---------------------------------------------------------------------------------------------------- |
| XP ja tasemed            | Iga tegevus annab XP-d; tasemed tõusevad polünoomse kõvera alusel                                    |
| Märgid                   | Üle 20 saavutuse 5 kategoorias ja 4 haruldusastmel                                                   |
| Seeriad                  | Igapäevase aktiivse kasutuse jälgimine koos praeguse ja pikima seeriaga                              |
| Edetabelid               | Üldised, nädalased, kuised, tokenite jagamise ja panustamise jaotised                                |
| Tokenite jagamine        | Krediidi ülekandmine kasutajate vahel kahekordse kirjendamisega pearaamatu kaudu                     |
| Kutsumine ja lunastamine | Soovituskoodid, mida talletatakse SHA-256 räsidena                                                   |
| Kogukonnaserverid        | Liitmine väliste OmniRoute'i eksemplaridega                                                          |
| Pettusevastane kaitse    | Serveripoolne punktiarvestus, päringusageduse piiramine ja z-skooril põhinev anomaaliate tuvastamine |

### Disainipõhimõtted

1. **Lokaalsusest lähtuv** — kogu olek asub SQLite'is, väliseid teenuseid pole vaja.
2. **Mitteblokeeriv** — sündmused saadetakse välja saatmise ja unustamise põhimõttel; LLM-i vastuse
   teed ei aeglustata kunagi mängustamisloogikaga.
3. **Server on autoriteetne** — XP arvutatakse ainult serveri poolel; kliendid ei saa
   punktisummasid kunstlikult suurendada.
4. **Privaatsust austav** — edetabelis osalemine on vabatahtlik; kasutajad saavad
   oma profiili peita.
5. **Liitmiseks valmis** — kogukonnaserverid saavad saata punktisummasid allkirjastatud API kaudu;
   sünkroonimine kirjutab andmed üle, mitte ei liida neid.

---

## Arhitektuur

### Kõrgetasemeline voog

```
Kliendi päring
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (olemasolev konveier) ...
      → ülesvoolu vastus saadetakse kliendile
      → setImmediate (saada ja unusta):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

Sündmuseemitter on ainus integratsioonipunkt. `chatCore.ts` kutsub pärast vastuse saatmist välja
`emitGamificationEvent()`; sündmusemoodul suunab sündmuse edasi
XP, seeriate, märkide, edetabeli ja pettusevastase kaitse alamsüsteemidele.

### Moodulite sõltuvusgraaf

```
src/lib/gamification/
  events.ts          ← sisendpunkt (kutsutakse failist chatCore.ts)
    ├── xp.ts        ← XP arvutamine ja taseme määramine
    ├── streaks.ts   ← igapäevase aktiivsusseeria jälgimine
    ├── badges.ts    ← märkide kriteeriumide hindamine
    ├── leaderboard.ts ← kohtade arvutamine ja SSE kaudu edastamine
    ├── antiCheat.ts ← päringusageduse piiramine ja anomaaliate tuvastamine
    ├── sharing.ts   ← tokenite ülekannete pearaamat
    ├── invites.ts   ← kutse- ja lunastuskoodide haldamine
    ├── servers.ts   ← kogukonnaserverite liitmine
    └── notifications.ts ← SSE teavitusvoog

src/lib/db/
  gamification.ts    ← kõik CRUD-toimingud (8 tabelit)

src/app/api/gamification/
  leaderboard/       ← GET kohad, POST käsitsi värskendamine
  leaderboard/stream ← SSE reaalajas uuendused
  transfer/          ← GET ajalugu, POST tokenite saatmine
  invite/            ← GET/POST koodid, DELETE tühistamine
  invite/redeem/     ← POST koodi lunastamine
  servers/           ← GET/POST/DELETE kogukonnaserverid
  federation/score/  ← POST punktisumma saatmine serverisse
  federation/leaderboard/ ← GET edetabeli toomine serverist
  notifications/     ← SSE märgi- ja tasemetõusuteavitused
  anomalies/         ← GET anomaaliate aruanded (administraator)
  rotate/            ← POST kutsetokenite saladuste roteerimine
```

---

## Andmekiht

### Andmebaasitabelid

Kõik tabelid asuvad OmniRoute’i peamises SQLite’i andmebaasis ja luuakse migratsiooniga
`060_create_gamification.sql`. WAL-logimine pärineb üksikeksemplarilt
`getDbInstance()` failis `src/lib/db/core.ts`.

```
┌─────────────────────────┐     ┌──────────────────────────┐
│      leaderboard        │     │      user_levels         │
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
│     user_badges         │     │    badge_definitions     │
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

### Domeenimoodul: `src/lib/db/gamification.ts`

Järgib standardset OmniRoute’i mustrit — impordib `getDbInstance()` failist
`core.ts` ja ekspordib tüübistatud CRUD-funktsioonid. Marsruudikäitlejates ei kasutata SQL-i otse.

Põhifunktsioonid:

| Funktsioon                 | Kirjeldus                                                              |
| -------------------------- | ---------------------------------------------------------------------- |
| `upsertLeaderboardEntry()` | Lisab või uuendab kombinatsiooni (api_key_id, scope, period) skoori    |
| `getLeaderboard()`         | Lehekülgede kaupa edetabel määratud ulatuse ja perioodi jaoks          |
| `getUserLevel()`           | Hangib või loob kasutaja tasemekirje                                   |
| `updateUserLevel()`        | Määrab XP, taseme ja tiitli atomaarselt                                |
| `getBadgeDefinitions()`    | Kõik märgimääratlused (soovi korral filtreeritud)                      |
| `getUserBadges()`          | Kasutaja teenitud märgid                                               |
| `awardBadge()`             | Lisab märgi teenimise kirje (badge_id suhtes idempotentne)             |
| `logXpAction()`            | Lisab kirje tabelisse xp_audit_log                                     |
| `getXpAuditLog()`          | Kasutaja lehekülgede kaupa auditiajalugu                               |
| `insertLedgerEntry()`      | Kahekordse kirjendamisega ülekanne (tehingu sees)                      |
| `getBalance()`             | Kasutaja saadud summade kogusumma, millest lahutatakse saadetud summad |
| `getTransferHistory()`     | Lehekülgede kaupa ülekandelogi                                         |
| `createInviteToken()`      | Lisab kutsekoodi ja räsitud loa                                        |
| `redeemInviteToken()`      | Otsib koodi järgi, valideerib ja suurendab kasutuskordade arvu         |
| `upsertCommunityServer()`  | Registreerib või uuendab föderatsiooniserverit                         |
| `getCommunityServers()`    | Loetleb kasutaja serverid                                              |
| `deleteCommunityServer()`  | Eemaldab serveri registreeringu                                        |

---

## XP / tasemete süsteem

**Fail:** `src/lib/gamification/xp.ts`

### Tasemekõver

Taseme `n` saavutamiseks vajalik XP järgib polünoomkõverat:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Tase | XP järgmise tasemeni | Kumulatiivne XP | Tiitel   |
| ---- | -------------------- | --------------- | -------- |
| 1    | 100                  | 100             | Algaja   |
| 5    | 1,118                | 2,415           | Algaja   |
| 10   | 3,162                | 10,523          | Avastaja |
| 25   | 12,500               | 86,024          | Avastaja |
| 50   | 35,355               | 345,529         | Ekspert  |
| 75   | 64,952               | 948,683         | Meister  |
| 100  | 100,000              | 2,050,000       | Legend   |

### Tiitlid

| Tasemevahemik | Tiitel   |
| ------------- | -------- |
| 1 – 9         | Algaja   |
| 10 – 24       | Avastaja |
| 25 – 49       | Ekspert  |
| 50 – 74       | Meister  |
| 75 – 100      | Legend   |

### XP-preemiad

| Tegevus           | XP  | Kirjeldus                                                        |
| ----------------- | --- | ---------------------------------------------------------------- |
| `request`         | 1   | Iga OmniRoute’i kaudu suunatud API-päringu eest                  |
| `provider_switch` | 5   | Teisele teenusepakkujale lülitumine                              |
| `model_switch`    | 3   | Teisele mudelile lülitumine                                      |
| `combo_create`    | 10  | Uue kombinatsiooni loomine                                       |
| `combo_use`       | 2   | Kombinatsiooni kasutamine päringu jaoks                          |
| `token_share`     | 1   | Iga teise kasutajaga jagatud 1 000 sõne eest                     |
| `invite_redeem`   | 50  | Kutsekoodi lunastamine                                           |
| `daily_login`     | 5   | Igapäevane aktiivne kasutus (üks kord päevas)                    |
| `streak_bonus`    | 2   | Iga järjestikuse aktiivsuspäeva eest (korrutatud jada pikkusega) |
| `badge_unlock`    | 10  | Märgi avamine                                                    |

### Preemia määramise voog

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. XP koguse saamiseks otsi väärtus `XP_REWARDS[action]`.
2. Suuna läbi `checkRateLimit()` (pettusevastane meede: maksimaalselt 1000 XP-d minutis võtme kohta).
3. Ava transaktsioon:
   - Loe praegune `user_levels` rida.
   - Lisa XP; arvuta tase uuesti funktsiooniga `levelFromXp(totalXp)`.
   - Kui tase muutus, määra `levelUp = true`.
   - Uuenda `user_levels` rida.
   - Lisa kirje tabelisse `xp_audit_log`.
4. Tagasta tulemus. Teavituste eest vastutab väljakutsuja.

### Abifunktsioon: `levelFromXp(totalXp)`

Läbib tasemed 1..100, summeerides `xp_for_level(n)`, kuni kumulatiivne XP
ületab väärtuse `totalXp`. Tagastab kõrgeima taseme, mille lävend on saavutatud.
Selle keerukus on O(100) — see on vastuvõetav, sest maksimaalne tase on 100.

---

## Märgisüsteem

**Fail:** `src/lib/gamification/badges.ts`

### Kategooriad

| Kategooria     | Kirjeldus                                 | Märkide näited                           |
| -------------- | ----------------------------------------- | ---------------------------------------- |
| `usage`        | Mahupõhised verstapostid                  | Esimene päring, 1K päringut, 100K        |
| `sharing`      | Sõnede jagamine ja soovitused             | Esimene jagamine, Helde (10 jagamist)    |
| `contribution` | Kogukonnas osalemine                      | Kombinatsiooni looja, Pakkujate avastaja |
| `streak`       | Järjepidevus aja jooksul                  | Nädalasõdalane, Pühendunud kuuks         |
| `rare`         | Raskesti saadavad või peidetud saavutused | Varajane kasutuselevõtja, Veateavitaja   |

### Haruldusastmed

| Haruldusaste | Värv     | Tõenäosuse vihje     |
| ------------ | -------- | -------------------- |
| `common`     | Hall     | Enamik kasutajaid    |
| `uncommon`   | Roheline | Aktiivsed kasutajad  |
| `rare`       | Sinine   | Pühendunud kasutajad |
| `legendary`  | Kuldne   | Parim 1%             |

### Kriteeriumide tüübid

| Tüüp           | Väli         | Kirjeldus                                             |
| -------------- | ------------ | ----------------------------------------------------- |
| `action_count` | `count`      | Soorita tegevus N korda (nt 1000 päringut)            |
| `streak`       | `days`       | Säilita jada N järjestikuse päeva jooksul             |
| `unique_count` | `field`, `n` | Kasuta N unikaalset väärtust (nt 10 erinevat mudelit) |
| `rank`         | `scope`, `n` | Saavuta edetabeli ulatuses koht N                     |
| `first`        | —            | Ole esimene, kes tegevuse sooritab                    |
| `hidden`       | (varieerub)  | Kriteeriume ei näidata enne nende täitmist            |

Märkide definitsioonid salvestatakse tabelisse `badge_definitions` JSON-väljana `criteria`:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Hindamisvoog

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # kõik definitsioonid
    → getUserBadges(apiKeyId)         # juba teenitud (jäta vahele)
    → iga teenimata märgi puhul:
       → matchesCriteria(badge, event, userState)
       → vaste korral: awardBadge(apiKeyId, badgeId)
         → tagasta teavituse andmed
```

Hindamine on **sündmuspõhine** — see käivitub pärast iga mängustamise sündmust, kuid
kontrollib ainult märke, mille `criteria.type` vastab sündmuse tegevusele. See
hoiab hindamise kiire (< 5 ms enamiku sündmuste puhul).

### `matchesCriteria(badge, event, userState)`

| Kriteeriumi tüüp | Kontroll                                                     |
| ---------------- | ------------------------------------------------------------ |
| `action_count`   | `getActionCount(apiKeyId, action) >= count`                  |
| `streak`         | `getCurrentStreak(apiKeyId) >= days`                         |
| `unique_count`   | `getUniqueCount(apiKeyId, field) >= n`                       |
| `rank`           | `getRank(apiKeyId, scope) <= n`                              |
| `first`          | Selle tegevustüübi kohta puudub varasem `xp_audit_log` kirje |
| `hidden`         | Delegeerib sobivale alamkontrollile                          |

### Sisseehitatud märgid (20+)

<details>
<summary>Täielik märkide loend</summary>

| Märgis                   | Kategooria  | Haruldus    | Kriteeriumid                   |
| ------------------------ | ----------- | ----------- | ------------------------------ |
| Esimesed sammud          | kasutamine  | tavaline    | 1 päring                       |
| Hoo sissesaamine         | kasutamine  | tavaline    | 100 päringut                   |
| Vilunud kasutaja         | kasutamine  | ebatavaline | 1,000 päringut                 |
| Tsentuurio               | kasutamine  | haruldane   | 10,000 päringut                |
| OmniPower                | kasutamine  | legendaarne | 100,000 päringut               |
| Pakkujate vahel hüppaja  | panustamine | tavaline    | Kasuta 5 erinevat pakkujat     |
| Pakkujate meister        | panustamine | ebatavaline | Kasuta 20 erinevat pakkujat    |
| Kombode arhitekt         | panustamine | ebatavaline | Loo 5 kombot                   |
| Kombode suurmeister      | panustamine | haruldane   | Loo 25 kombot                  |
| Esimene jagamine         | jagamine    | tavaline    | 1 tokeni ülekanne              |
| Heldemeelne              | jagamine    | ebatavaline | 10 tokeni ülekannet            |
| Filantroop               | jagamine    | haruldane   | Kanna kokku üle 10,000 tokenit |
| Soovitaja                | jagamine    | tavaline    | 1 edukas soovitus              |
| Võrgustiku rajaja        | jagamine    | ebatavaline | 10 edukat soovitust            |
| Nädalasõdalane           | seeria      | ebatavaline | 7-päevane seeria               |
| Pühendunud kuu           | seeria      | haruldane   | 30-päevane seeria              |
| Peatamatu                | seeria      | legendaarne | 365-päevane seeria             |
| Varajane kasutuselevõtja | haruldane   | legendaarne | Liitu beetaperioodil           |
| Tihendamise teerajaja    | haruldane   | ebatavaline | Kasuta tihendamist 100 korda   |
| Oskuste koguja           | haruldane   | haruldane   | Kasuta 10 erinevat oskust      |
| Mudelite avastaja        | panustamine | ebatavaline | Kasuta 15 erinevat mudelit     |

</details>

---

## Seeria jälgija

**Fail:** `src/lib/gamification/streaks.ts`

### Andmemudel

Seeriaid hoitakse tabelis `key_value` (jagatud utiliiditabel) nimeruumiga
võtmete all:

| Võti                          | Väärtus                          | Kirjeldus              |
| ----------------------------- | -------------------------------- | ---------------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Aktiivse seeria andmed |

### Loogika

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Loe seeria kirje tabelist `key_value`.
2. Sõelu `{current}`, `{longest}`, `{lastDate}` (ISO-kuupäevastring).
3. Kui `lastDate === today` — muudatusi pole (tänane päev on juba arvestatud).
4. Kui `lastDate === yesterday` — suurenda väärtust `current`; vajaduse korral uuenda väärtust `longest`.
5. Kui `lastDate < yesterday` — lähtesta `current = 1` (seeria katkes).
6. Kirjuta uuendatud kirje.
7. Kontrolli verstaposte: 7, 14, 30, 60, 90, 180, 365 päeva. Kui verstapost
   ületati, määra `milestone = true` (väljakutsuja annab XP-d ja kontrollib märke).

### Erijuhud

- **Ajavöönd**: seeriad kasutavad UTC-kuupäevi (`new Date().toISOString().slice(0, 10)`).
  See on taotluslik — üks kanooniline ajavöönd hoiab ära süsteemi ärakasutamise
  ajavööndite vahetamise kaudu.
- **Uued kasutajad**: seeria kirjet ei ole; esimene päring loob selle väärtustega
  `current=1, longest=1, lastDate=today`.
- **Mitu päringut päevas**: seeriat suurendab ainult UTC-päeva esimene
  päring.

---

## Edetabel

**Fail:** `src/lib/gamification/leaderboard.ts`

### Ulatused

| Ulatus          | Periood | Kirjeldus                                             |
| --------------- | ------- | ----------------------------------------------------- |
| `global`        | `all`   | Kogu aja kumulatiivne XP                              |
| `weekly`        | `week`  | Käesoleval UTC-nädalal (E–P) teenitud XP              |
| `monthly`       | `month` | Käesoleval UTC-kuul teenitud XP                       |
| `tokens_shared` | `all`   | Teistele edastatud tokenite koguarv                   |
| `contributions` | `all`   | Loodud kombinatsioonid + kasutatud pakkujad + oskused |

### Koha arvutamine

Kohad **arvutatakse lugemise ajal**, mitte ei salvestata. See väldib aegunud
kohaandmeid ja kõrvaldab vajaduse perioodiliste kohtade ümberarvutamise tööde järele.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

Päringumuster:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### Perioodi vahetamine

Nädala- ja kuu edetabelid vahetuvad automaatselt:

1. **Arhiveerimine**: perioodi piiril kopeeri praegused kirjed koos perioodi
   sildiga tabelisse `leaderboard_archive`.
2. **Lähtestamine**: kustuta lõppenud perioodi kirjed.
3. **Käivitamine**: kontrollitakse iga `updateLeaderboard()` väljakutse korral;
   uue perioodi esimene päring käivitab vahetamise.

See tagab, et nädala edetabelid lähtestatakse igal esmaspäeval kell 00:00 UTC
ja kuu edetabelid iga kuu 1. kuupäeval.

### SSE reaalajas uuendused

**Lõpp-punkt:** `GET /api/gamification/stream`

```
Klient → GET /api/gamification/stream
  → SSE-ühendus on loodud
  → Server saadab kohe edetabeli esikümne hetktõmmise
  → Iga 5 sekundi järel: saada uuendatud esikümme, kui see on muutunud
  → Iga 15 sekundi järel: elusoleku kommentaar (": heartbeat\n\n")
  → Klient katkestab ühenduse → puhastus (kuulaja eemaldamine)
```

Sündmuse vorming:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

SSE-haldur jälgib ühendatud kliente ulatuse kaupa ja saadab uuendusi ainult
siis, kui edetabeli andmed on pärast viimast saatmist tegelikult muutunud.

---

## Tokenite jagamine

**Fail:** `src/lib/gamification/sharing.ts`

### Kahekordne kirjendamine

Iga ülekanne loob tabelis `token_ledger` kaks rida:

| Rida    | `from_key_id` | `to_key_id` | `amount` |
| ------- | ------------- | ----------- | -------- |
| Deebet  | saatja        | saaja       | +summa   |
| Kreedit | saaja         | saatja      | -summa   |

Oot — kasutatav tava on järgmine:

| Rida         | `from_key_id` | `to_key_id` | `amount` | Tähendus           |
| ------------ | ------------- | ----------- | -------- | ------------------ |
| Saatmine     | saatja        | saaja       | +summa   | Väljavool saatjalt |
| Vastuvõtmine | saaja         | saatja      | +summa   | Sissevool saajale  |

Saldo arvutatakse järgmiselt:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Ülekandevoog

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Valideerimine**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **Idempotentsus**: kontrollitakse, kas `idempotency_key` on pearaamatus juba olemas.
   Kui jah, tagastatakse vahemällu salvestatud tulemus.
3. **Tehing** (üks SQLite'i tehing):
   a. Arvutatakse saatja saldo.
   b. Kui `balance < amount`, katkestatakse toiming (raha pole piisavalt).
   c. Lisatakse saatmisrida (`from=saatja,`.

### Sageduse piiramine

- Ühe API-võtme kohta kuni 10 ülekannet minutis.
- Ühe ülekandega kuni 10 000 tokenit.
- Ühe API-võtme kohta kuni 100 000 ülekantud tokenit päevas.

---

## Kutse- ja lunastustokenid

**Fail:** `src/lib/gamification/invites.ts`

### Koodi vorming

- **Kood**: 8-kohaline tähtnumbriline kood (nt `A3K9-X7M2`), mis on inimesele loetav
  ja mida kuvatakse kasutajale.
- **Token**: 32-baidine juhuslik token, mida talletatakse SHA-256 räsina. Kasutatakse
  programmiliseks lunastamiseks (nt URL-i linkides).

### Talletamine

| Veerg        | Väärtus                               |
| ------------ | ------------------------------------- |
| `code`       | `A3K9X7M2` (unikaalne, indekseeritud) |
| `token_hash` | SHA-256(raw_token)                    |

Toortoken tagastatakse kasutajale loomise ajal täpselt ühe korra. OmniRoute
ei talleta ega kuva seda enam kunagi — säilib ainult räsi.

### Enese kaudu soovitamise vältimine

Kui kasutaja lunastab koodi, kontrollib süsteem järgmist:

1. Kood kuulub mõnele teisele `api_key_id`-le.
2. Lunastav kasutaja ei ole varem lunastanud ühtegi sama soovitaja
   koodi (ühendatakse `invite_tokens` ja lunastamislogi).

Kui kumbki kontroll ebaõnnestub, lükatakse lunastamine tagasi selge veateatega.

### Aegumine ja piirangud

- Vaikimisi `max_uses`: 10 (seadistatav loomisel).
- Vaikimisi `expires_at`: 30 päeva pärast loomist.
- Aegunud või kasutuskordade piiri saavutanud koodid tagastavad HTTP 410 Gone.

---

## Kogukonnaserverite föderatsioon

**Fail:** `src/lib/gamification/servers.ts`

### Ühendamine

Kogukonnaserver registreeritakse kaugserveri väljastatud kutsetõendi abil. Kohalik eksemplar:

1. Võtab vastu kutsetõendi (nt juhtpaneelile kleebituna).
2. Kutsub kaugserveris välja `POST /api/gamification/federation/leaderboard`, et tõend valideerida ja hankida praegune edetabel.
3. Salvestab serveri kirje väärtusega `status: connected`.

### Sünkroonimismudel

Föderatsioon kasutab **ülekirjutavat sünkroonimist**, mitte liitvat:

```
Kohalik eksemplar             Kogukonnaserver
     │                              │
     ├── tulemuse saatmine ────────►│  POST /federation/score
     │   { api_key_id, score }      │  (server valideerib tõendi räsi)
     │                              │
     ├── edetabeli pärimine ───────►│  GET /federation/leaderboard
     │◄── top-N kirjet ─────────────┤  (kirjutab kohaliku vahemälu üle)
     │                              │
     └── tervisekontroll ──────────►│  GET /federation/health
         (iga 60 s järel,           │
          ajalõpp 5 s)
```

### Autentimine

Föderatsioonipäringud sisaldavad järgmisi päiseid:

```
Authorization: Bearer <toortõend>
X-Federation-Version: 1
```

Kaugserver räsib tõendi ja otsib üles vastava rea tabelist `community_servers`. Nii välditakse salvestatud räsi edastamist.

### Seisundi jälgimine

Iga serverikirje jälgib järgmisi välju:

| Väli        | Kirjeldus                                     |
| ----------- | --------------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable`        |
| `last_sync` | Viimase eduka sünkroonimise ISO-ajatempel     |
| `failures`  | Järjestikuste nurjunud tervisekontrollide arv |

Pärast viit järjestikust nurjumist muutub olek väärtuseks `unreachable` ja sünkroonimine peatatakse, kuni käsitsi käivitatud tervisekontroll õnnestub.

---

## Pettusevastane kaitse

**Fail:** `src/lib/gamification/antiCheat.ts`

### Serveripoolne punktiarvestus

Kõik XP-arvutused tehakse failis `src/lib/gamification/xp.ts`. Kliendid ei saada kunagi tulemust — nad saadavad toiminguid ja server arvutab XP. Veergu `leaderboard.score` saab kirjutada ainult serveripoolne kood.

### Päringusageduse piiramine

| Piirang                          | Väärtus | Ulatus          |
| -------------------------------- | ------- | --------------- |
| Maksimaalne XP minutis           | 1,000   | API-võtme kohta |
| Maksimaalselt ülekandeid minutis | 10      | API-võtme kohta |
| Maksimaalne ülekandesumma        | 10,000  | Ülekande kohta  |
| Maksimaalselt ülekandeid päevas  | 100,000 | API-võtme kohta |

Päringusageduse piirangud kasutavad mälus hoitavat libisevat akent (sama muster nagu `RateLimitManager` kaustas `open-sse/services/`). Protsessi taaskäivitumise korral kasutatakse varuvariandina SQLite’il põhinevaid loendureid.

### Z-skoori põhine anomaaliate tuvastamine

Iga API-võtme puhul säilitab süsteem tunnis teenitud XP kohta jooksvat seitsmepäevast akent. Iga XP määramise korral:

1. Arvutatakse kasutaja praegune tunnipõhine XP teenimise määr.
2. Arvutatakse populatsiooni keskmine ja standardhälve.
3. Arvutatakse `z = (user_rate - mean) / stddev`.
4. Kui `z > 3.0` (3 standardhälvet), märgitakse see anomaaliaks.

Anomaaliad logitakse tabelisse `xp_audit_log` väärtusega `action = 'anomaly_detected'` ja kuvatakse administraatori juhtpaneelil.

### Auditijälg

Iga XP määramine, ülekanne, märgi teenimine ja anomaalia tuvastamine logitakse tabelisse `xp_audit_log` järgmiste väljadega:

| Väli         | Kirjeldus                                        |
| ------------ | ------------------------------------------------ |
| `api_key_id` | Kes                                              |
| `action`     | Mis juhtus (xp_award, transfer, anomaly, …)      |
| `xp_awarded` | Kogus (mitte-XP-sündmuste puhul 0)               |
| `metadata`   | Konteksti sisaldav JSON (toimingu tüüp, siht, …) |
| `created_at` | Millal (ISO 8601)                                |

Administraatorid saavad täielikku auditijälge pärida lõpp-punkti `GET /api/gamification/anomalies` kaudu.

---

## API marsruudid

Kõik marsruudid järgivad standardset OmniRoute'i mustrit:

```
Marsruut → CORS-i eelkontroll → Keha valideerimine (Zod) → Autentimine (extractApiKey)
  → Töötleja
```

### Lõpp-punktid

| Meetod | Tee                                        | Kirjeldus                                             | Autentimine    |
| ------ | ------------------------------------------ | ----------------------------------------------------- | -------------- |
| GET    | `/api/gamification/leaderboard`            | Edetabeli hankimine (ulatus, periood, lehekülgjaotus) | Valikuline     |
| POST   | `/api/gamification/leaderboard`            | Edetabeli vahemälu sunnitud värskendamine             | Nõutav         |
| GET    | `/api/gamification/stream`                 | Edetabeli reaalajas SSE-värskendused                  | Valikuline     |
| GET    | `/api/gamification/transfer`               | Ülekannete ajaloo hankimine (lehekülgjaotus)          | Nõutav         |
| POST   | `/api/gamification/transfer`               | Tokenite saatmine teisele kasutajale                  | Nõutav         |
| GET    | `/api/gamification/invite`                 | Minu kutsekoodide loetlemine                          | Nõutav         |
| POST   | `/api/gamification/invite`                 | Uue kutsekoodi genereerimine                          | Nõutav         |
| DELETE | `/api/gamification/invite`                 | Kutsekoodi tühistamine                                | Nõutav         |
| POST   | `/api/gamification/invite/redeem`          | Kutsekoodi lunastamine                                | Nõutav         |
| GET    | `/api/gamification/servers`                | Kogukonnaserverite loetlemine                         | Nõutav         |
| POST   | `/api/gamification/servers`                | Kogukonnaserveriga ühenduse loomine                   | Nõutav         |
| DELETE | `/api/gamification/servers`                | Kogukonnaserverist ühenduse katkestamine              | Nõutav         |
| POST   | `/api/gamification/federation/score`       | Skoori saatmine kaugserverisse                        | Föderatsioon   |
| GET    | `/api/gamification/federation/leaderboard` | Edetabeli toomine kaugserverist                       | Föderatsioon   |
| GET    | `/api/gamification/notifications`          | Märkide/tasemetõusu SSE-teavitused                    | Nõutav         |
| GET    | `/api/gamification/anomalies`              | Anomaaliaraportite vaatamine (administraator)         | Administraator |
| POST   | `/api/gamification/rotate`                 | Kutsetokenite saladuste roteerimine                   | Nõutav         |

### Päringu/vastuse näited

**POST /api/gamification/transfer**

```json
// Päring
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// Vastus 200
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

// Vastus 400 (ebapiisavad vahendid)
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

## MCP tööriistad (8)

Registreeritud kataloogis `open-sse/mcp-server/` koos olemasolevate tööriistadega. Piiratud
õiguste ulatusega `gamification`.

| Tööriist                   | Kirjeldus                                             | Sisendskeem                  |           |
| -------------------------- | ----------------------------------------------------- | ---------------------------- | --------- |
| `gamification_leaderboard` | Hangi ulatuse/perioodi edetabel                       | `{ scope, period?, limit? }` |
| `gamification_rank`        | Hangi kutsuja koht ja naaberkohad                     | `{ scope }`                  |
| `gamification_profile`     | Hangi XP, tase, tiitel ja seeria kokkuvõte            | `{}`                         |
| `gamification_badges`      | Loetle teenitud märgid või kõik definitsioonid        | `{ earned?: boolean }`       |
| `gamification_transfer`    | Saada teisele kasutajale tokeneid                     | `{ to, amount }`             |
| `gamification_invite`      | Loo või loetle kutsekoode                             | `{ action: "create"          | "list" }` |
| `gamification_servers`     | Loetle kogukonnaservereid või loo nendega ühendus     | `{ action, token? }`         |
| `gamification_anomalies`   | Vaata anomaaliate aruandeid (administraatori õigused) | `{ limit?, since? }`         |

---

## Töölaua lehed

### `/dashboard/leaderboard`

- Poodiumivaade (kolm parimat koos avataride ja XP-ga).
- Ulatuse valik: üldine / nädalane / kuine / jagatud tokenid / panused.
- Lehekülgedeks jaotatud tabel (25 kirjet lehel), mis sisaldab kohta, nime, punktisummat, taset ja tiitlit.
- SSE reaalajavärskendused — kohamuutused animeeritakse.
- Praegune kasutaja on tabelis esile tõstetud kleepuva reaga „Sinu koht“.

### `/dashboard/profile`

- XP edenemisriba praeguse taseme ja järgmise taseme lävendiga.
- Tiitlimärk kuvatakse silmapaistvalt.
- Märkide galerii — teenitud märgid koos teenimise kuupäevaga, teenimata märgid hallina
  (peidetud märkide puhul kuvatakse kuni teenimiseni „???“).
- Seerialoendur leegiikooniga; seeriakalender (viimased 30 päeva).
- XP ajaloo graafik (päevane XP viimase 30 päeva jooksul).

### `/dashboard/tokens`

- Tokenite saldo (silmapaistvalt lehe ülaosas).
- Ülekandevorm: saaja, summa, kinnitusdialoog.
- Ülekannete ajaloo tabel filtritega (saadetud / saadud / kõik).
- Kutsete jaotis: aktiivsed koodid, uue loomine, jagamislink.
- Kogukonnaserverid: loend koos seisundiga, ühendamine/ühenduse katkestamine.

### `/dashboard/gamification/admin`

- Anomaaliate loend koos tõsiduse, kasutaja, ajatempli ja z-skooriga.
- Auditilogi vaatur filtritega (toimingu tüüp, kasutaja, kuupäevavahemik).
- Süsteemi statistika: antud XP kogusumma, aktiivsed kasutajad, märkide teenimise määrad.
- Föderatsiooniserverite seisundi ülevaade.

---

## Konveieriga integreerimine

### Integratsioonipunkt

Mängustamine ühendatakse päringukonveieriga ühes punktis failis
`open-sse/handlers/chatCore.ts`:

```typescript
// Pärast vastuse saatmist kliendile:
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
    // Käivita ja unusta: logi, kuid ära edasta kunagi kliendile
  });
});
```

### Sündmuste tüübid

| Sündmuse tüüp       | Millal väljastatakse                               |
| ------------------- | -------------------------------------------------- |
| `request.completed` | Edukas LLM-i vastus on saadetud                    |
| `provider.switch`   | Pakkuja muutus (arvestatakse ka combo varuvalikut) |
| `combo.created`     | Uus combo konfiguratsioon on salvestatud           |
| `combo.used`        | Combo sihtmärki tabati edukalt                     |
| `badge.earned`      | Märgi hindamisel leiti vaste                       |
| `streak.milestone`  | Seeria lävend ületati                              |
| `transfer.sent`     | Tokenite ülekanne lõpetati                         |
| `referral.redeemed` | Kutsekood lunastati edukalt                        |
| `compression.used`  | Rakendati viiba tihendamist                        |
| `skill.executed`    | Oskuse käivitamine lõpetati                        |
| `model.first_use`   | Mudelit pole viimase 7 päeva jooksul kasutatud     |

### Mitteblokeerimise garantii

Muster `setImmediate` + `.catch(() => {})` tagab järgmise:

1. Vastus saadetakse täielikult ära enne mängustamise käivitamist.
2. Mängustamise vead ei jõua kunagi kliendini.
3. Sündmuse töötlemine toimub järgmises mikrotoimingus, mitte samas täitmisvoos.

---

## Turvalisus

### Ohumudel

| Oht                         | Leevendus                                                                      |
| --------------------------- | ------------------------------------------------------------------------------ |
| Punktisumma paisutamine     | XP arvutatakse ainult serveris; kliendid edastavad tegevusi, mitte punkte      |
| Taasesitusründed            | Ülekannetel idempotentsusvõtmed; auditilogi duplikaatide eemaldamine           |
| Ülekandepettus              | Kahekordse kirjendamisega pearaamat; atomaarsed tehingud; sageduspiirangud     |
| Enese suunamine             | Lunastamisel kontrollitakse ristviitega `api_key_id`                           |
| Edetabeliga manipuleerimine | Z-skooril põhinev anomaaliate tuvastamine; administraatori anomaaliate töölaud |
| Föderatsioonitõendi vargus  | SHA-256 räsiga salvestamine; töötlemata tõendit näidatakse ainult üks kord     |
| Kutsekoodide jõurünne       | Lunastamise lõpp-punktil rakendatakse sageduspiirangut; 8 märgi entroopia      |
| XSS kuvatavates nimedes     | Kuvatavad nimed puhastatakse; edetabelikirjed paotatakse                       |
| Räsiväärtuste ajastusründed | Tõendi räsi võrdlemiseks kasutatakse `crypto.timingSafeEqual`                  |

### Autentimisnõuded

- **Avalik** (autentimine puudub): `GET /leaderboard`, `GET /stream` (kirjutuskaitstud
  edetabelid).
- **API-võti nõutav**: kõik kirjutustoimingud, profiil, ülekanded ja kutsed.
- **Ainult administraatorile**: anomaaliate töölaud, auditilogi vaatur.
- **Föderatsioon**: eraldi autentimistee, mis kasutab `Authorization`
  päises töötlemata tõendit, mida valideeritakse salvestatud SHA-256 räsi suhtes.

---

## Testimine

### Testifailid

Kõik testid kasutavad Node.js-i sisseehitatud testikäitajat (`node --import tsx/esm --test`).

| Testifail                                     | Hõlmab                                           | Teste |
| --------------------------------------------- | ------------------------------------------------ | ----- |
| `tests/unit/gamification/xp.test.ts`          | XP arvutamine, tasemekõver, tiitlid              | 8     |
| `tests/unit/gamification/badges.test.ts`      | Märgikriteeriumide sobitamine ja määramine       | 10    |
| `tests/unit/gamification/streaks.test.ts`     | Seerialoogika, verstapostid, piirjuhud           | 7     |
| `tests/unit/gamification/leaderboard.test.ts` | Koha arvutamine, lehekülgjaotus, vaheldumine     | 8     |
| `tests/unit/gamification/sharing.test.ts`     | Ülekanded, saldo, idempotentsus                  | 9     |
| `tests/unit/gamification/invites.test.ts`     | Loomine, lunastamine, aegumine, enese suunamine  | 7     |
| `tests/unit/gamification/antiCheat.test.ts`   | Sageduspiirangud, z-skoor, auditilogi pidamine   | 6     |
| `tests/unit/gamification/events.test.ts`      | Sündmuste väljastamine, hargedastus, veakäsitlus | 5     |

### Testide käitamine

```bash
# Kõik mängustamise testid
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# Üks testifail
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Testkatvuse nõuded

Vastavalt dokumendile `CONTRIBUTING.md` peavad kõik uued moodulid vastama järgmistele nõuetele:

- Harude katvus >= 80%.
- Iga avalikku funktsiooni on testitud vähemalt üks kord.
- Veateed on testitud (ebapiisav saldo, aegunud koodid, sageduspiirangud).

---

## Failistruktuur

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # Kõik 8 tabelit + indeksid
      gamification.ts                  # Domeeni CRUD-moodul
    gamification/
      xp.ts                           # XP arvutamine, tasemekõver, tiitlid
      badges.ts                       # Märkide definitsioonid, kriteeriumid, hindamine
      streaks.ts                      # Igapäevaste seeriate jälgimine
      leaderboard.ts                  # Kohtade arvutamine, SSE, rotatsioon
      antiCheat.ts                    # Päringusageduse piiramine, z-skoor, audit
      sharing.ts                      # Tokenite ülekannete pearaamat
      invites.ts                      # Kutse-/lunastuskoodid
      servers.ts                      # Kogukonnaserverite föderatsioon
      events.ts                       # Sündmuste emiteerija (integratsioonipunkt)
      notifications.ts                # SSE-teavituste voog
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST edetabel
        leaderboard/stream/route.ts   # SSE reaalajavärskendused
        transfer/route.ts             # GET/POST ülekanded
        invite/route.ts               # GET/POST/DELETE kutsekoodid
        invite/redeem/route.ts        # POST lunastuskood
        servers/route.ts              # GET/POST/DELETE serverid
        federation/score/route.ts     # POST tulemuse edastamine
        federation/leaderboard/route.ts # GET edetabeli hankimine
        notifications/route.ts        # SSE-teavitused
        anomalies/route.ts            # GET anomaaliaruanded
        rotate/route.ts               # POST saladuste roteerimine
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Edetabelileht
        profile/page.tsx               # XP/märkide/seeriate leht
        tokens/page.tsx                # Saldo/ülekannete/kutsete leht
        gamification/admin/page.tsx    # Anomaaliate administraatoriseire
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
    GAMIFICATION.md                    # See dokument
```

---

## Migratsioonistrateegia

### 1. etapp: tagasüsteemi tuumik (PR 1)

- Migratsioon `060_create_gamification.sql` (8 tabelit).
- `src/lib/db/gamification.ts` (domeenimoodul).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- Integratsioonipunkt failis `chatCore.ts`.
- XP, seeriate ja sündmuste ühiktestid.

### 2. etapp: märgid ja edetabel (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Märkide definitsioonid konstantides.
- Edetabeli API-marsruudid + SSE-voog.
- Märkide ja edetabeli ühiktestid.

### 3. etapp: jagamine ja kutsed (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- Ülekannete ja kutsete API-marsruudid.
- Jagamise, kutsete ja pettusevastaste mehhanismide ühiktestid.

### 4. etapp: föderatsioon ja töölauavaade (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- Föderatsiooni API-marsruudid.
- Töölaualehed (edetabel, profiil, tokenid, haldus).
- MCP-tööriistade registreerimine.

---

## Tulevikukaalutlused

- **Hooajalised sündmused**: piiratud aja jooksul saadaval olevad märgikomplektid ja edetabelihooajad.
- **Meeskondade edetabelid**: kasutajate rühmitamine organisatsiooni või kombo alusel.
- **XP kordajad**: XP suurendamine kampaaniaperioodidel.
- **Saavutuste jagamine**: jagatavate märgikaartide loomine (OpenGraphi pildid).
- **Mobiilsed tõuketeavitused**: webhook-põhised teavitused märgi- ja tasemesündmuste kohta.
- **Edetabeli API**: avalik API kolmandate osapoolte integratsioonide jaoks.
