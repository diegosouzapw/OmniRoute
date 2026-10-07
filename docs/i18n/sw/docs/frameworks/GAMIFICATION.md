# Gamification & Leaderboard System (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **Chanzo rasmi:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Ilisasishwa mara ya mwisho:** 2026-06-28 — v3.8.40

OmniRoute inajumuisha safu ya uhamasishaji inayotanguliza uhifadhi wa ndani ambayo huwatuza watumiaji kwa
kushirikiana na jukwaa — kutuma maombi, kubadilisha watoa huduma, kuunda
michanganyiko, kushiriki tokeni, na kuchangia katika jumuiya. Hali yote huhifadhiwa katika
SQLite; ushirikiano na seva za jumuiya ni wa hiari na unategemea utumaji wa data.

Mfumo umeundwa kuwa na **ukawia sifuri kwenye njia kuu** — matukio ya uhamasishaji
hutumwa bila kusubiri majibu kutoka kwenye mkondo wa maombi na kamwe hayazuii
jibu la LLM.

---

## Muhtasari

### Madhumuni

Kuongeza ushiriki na udumishaji wa watumiaji kwa kutoa maendeleo yanayoonekana (XP,
viwango, beji), uthibitisho wa kijamii (bao za wanaoongoza), na motisha za kiuchumi (kushiriki
tokeni, zawadi za mialiko).

### Upeo

| Kipengele           | Maelezo                                                                            |
| ------------------- | ---------------------------------------------------------------------------------- |
| XP na Viwango       | Pata XP kwa kila kitendo; panda kiwango kupitia mfululizo wa kipolinomia           |
| Beji                | Mafanikio 20+ katika kategoria 5 yenye madaraja 4 ya adimu                         |
| Misururu            | Ufuatiliaji wa matumizi amilifu ya kila siku wenye msururu wa sasa/mrefu zaidi     |
| Bao za Wanaoongoza  | Upeo wa kimataifa, kila wiki, kila mwezi, ushiriki wa tokeni, na michango          |
| Kushiriki Tokeni    | Hamisha salio kati ya watumiaji kupitia leja ya miingizo miwili                    |
| Mwaliko na Ukombozi | Misimbo ya rufaa yenye hifadhi iliyohashiwa kwa SHA-256                            |
| Seva za Jumuiya     | Shirikiana na mifumo ya nje ya OmniRoute                                           |
| Kuzuia Udanganyifu  | Uwekaji alama upande wa seva, uzuiaji wa kiwango, utambuzi wa hitilafu kwa z-score |

### Kanuni za Usanifu

1. **Uhifadhi wa ndani kwanza** — hali yote iko katika SQLite, hakuna huduma za nje zinazohitajika.
2. **Isiyozuia** — matukio hutumwa bila kusubiri majibu; njia ya jibu la LLM
   haicheleweshwi kamwe na mantiki ya uhamasishaji.
3. **Seva ndiyo yenye mamlaka** — XP huhesabiwa upande wa seva pekee; wateja hawawezi
   kuongeza alama kwa njia isiyo halali.
4. **Inayoheshimu faragha** — ushiriki katika bao la wanaoongoza ni wa hiari; watumiaji wanaweza
   kuficha wasifu wao.
5. **Tayari kwa ushirikiano** — seva za jumuiya zinaweza kutuma alama kupitia API iliyotiwa saini;
   usawazishaji huandika juu ya data iliyopo, si kujumlisha.

---

## Usanifu

### Mtiririko wa Kiwango cha Juu

```
Ombi la Mteja
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (mkondo uliopo) ...
      → jibu la mfumo wa juu latumwa kwa mteja
      → setImmediate (tuma-bila-kusubiri):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

Kitoa matukio ndicho kiunganishi pekee cha ujumuishaji. `chatCore.ts` huita
`emitGamificationEvent()` baada ya jibu kutumwa; moduli ya matukio husambaza
kwa mifumo midogo ya XP, misururu, beji, bao la wanaoongoza, na kuzuia udanganyifu.

### Grafu ya Utegemezi wa Moduli

```
src/lib/gamification/
  events.ts          ← sehemu ya kuingilia (inaitwa kutoka chatCore.ts)
    ├── xp.ts        ← ukokotoaji wa XP na utatuzi wa kiwango
    ├── streaks.ts   ← ufuatiliaji wa msururu amilifu wa kila siku
    ├── badges.ts    ← tathmini ya vigezo vya beji
    ├── leaderboard.ts ← ukokotoaji wa nafasi na utangazaji wa SSE
    ├── antiCheat.ts ← uzuiaji wa kiwango na utambuzi wa hitilafu
    ├── sharing.ts   ← leja ya uhamishaji wa tokeni
    ├── invites.ts   ← usimamizi wa misimbo ya mwaliko/ukombozi
    ├── servers.ts   ← ushirikiano wa seva za jumuiya
    └── notifications.ts ← mtiririko wa arifa za SSE

src/lib/db/
  gamification.ts    ← operesheni zote za CRUD (majendwali 8)

src/app/api/gamification/
  leaderboard/       ← GET viwango, POST uonyeshaji upya wa mikono
  leaderboard/stream ← masasisho ya papo hapo ya SSE
  transfer/          ← GET historia, POST tuma tokeni
  invite/            ← GET/POST misimbo, DELETE batilisha
  invite/redeem/     ← POST komboa msimbo
  servers/           ← GET/POST/DELETE seva za jumuiya
  federation/score/  ← POST tuma alama kwa seva
  federation/leaderboard/ ← GET vuta bao la wanaoongoza kutoka kwa seva
  notifications/     ← arifa za beji/kupanda kiwango za SSE
  anomalies/         ← GET ripoti za hitilafu (msimamizi)
  rotate/            ← POST badilisha siri za tokeni za mwaliko
```

---

## Safu ya Data

### Majedwali ya Hifadhidata

Majedwali yote yanapatikana katika hifadhidata kuu ya SQLite ya OmniRoute, iliyoundwa na uhamishaji
`060_create_gamification.sql`. Uandishi wa jarida wa WAL unarithiwa kutoka kwa singleton
`getDbInstance()` katika `src/lib/db/core.ts`.

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

### Moduli ya Kikoa: `src/lib/db/gamification.ts`

Inafuata muundo wa kawaida wa OmniRoute — huingiza `getDbInstance()` kutoka
`core.ts`, na kusafirisha vitendaji vya CRUD vilivyoainishwa aina. Hakuna SQL ghafi katika vishughulikiaji vya njia.

Vitendaji muhimu:

| Kitendaji                  | Maelezo                                                       |
| -------------------------- | ------------------------------------------------------------- |
| `upsertLeaderboardEntry()` | Ingiza au sasisha alama kwa (api_key_id, scope, period)       |
| `getLeaderboard()`         | Viwango vilivyogawanywa katika kurasa kwa scope/period fulani |
| `getUserLevel()`           | Pata au unda rekodi ya kiwango cha mtumiaji                   |
| `updateUserLevel()`        | Weka XP, kiwango na cheo kwa njia atomiki                     |
| `getBadgeDefinitions()`    | Ufafanuzi wote wa beji (unaweza kuchujwa)                     |
| `getUserBadges()`          | Beji zilizopatikana na mtumiaji                               |
| `awardBadge()`             | Ingiza upatikanaji wa beji (idempotent kwa badge_id)          |
| `logXpAction()`            | Ongeza kwenye xp_audit_log                                    |
| `getXpAuditLog()`          | Historia ya ukaguzi iliyogawanywa katika kurasa kwa mtumiaji  |
| `insertLedgerEntry()`      | Uhamisho wa maingizo mawili (ndani ya muamala)                |
| `getBalance()`             | Jumla ya vilivyopokelewa ukiondoa vilivyotumwa kwa mtumiaji   |
| `getTransferHistory()`     | Kumbukumbu ya uhamisho iliyogawanywa katika kurasa            |
| `createInviteToken()`      | Ingiza msimbo wa mwaliko + tokeni iliyohashiwa                |
| `redeemInviteToken()`      | Tafuta kwa msimbo, thibitisha, ongeza idadi ya matumizi       |
| `upsertCommunityServer()`  | Sajili au sasisha seva ya shirikisho                          |
| `getCommunityServers()`    | Orodhesha seva za mtumiaji                                    |
| `deleteCommunityServer()`  | Ondoa usajili wa seva                                         |

---

## Mfumo wa XP / Viwango

**Faili:** `src/lib/gamification/xp.ts`

### Mkondo wa Viwango

XP inayohitajika kufikia kiwango cha `n` hufuata mkondo wa polinomi:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Kiwango | XP hadi Kinachofuata | Jumla ya XP | Cheo      |
| ------- | -------------------- | ----------- | --------- |
| 1       | 100                  | 100         | Anayeanza |
| 5       | 1,118                | 2,415       | Anayeanza |
| 10      | 3,162                | 10,523      | Mgunduzi  |
| 25      | 12,500               | 86,024      | Mgunduzi  |
| 50      | 35,355               | 345,529     | Mtaalamu  |
| 75      | 64,952               | 948,683     | Bingwa    |
| 100     | 100,000              | 2,050,000   | Nguli     |

### Vyeo

| Masafa ya Viwango | Cheo      |
| ----------------- | --------- |
| 1 – 9             | Anayeanza |
| 10 – 24           | Mgunduzi  |
| 25 – 49           | Mtaalamu  |
| 50 – 74           | Bingwa    |
| 75 – 100          | Nguli     |

### Zawadi za XP

| Kitendo           | XP  | Maelezo                                                     |
| ----------------- | --- | ----------------------------------------------------------- |
| `request`         | 1   | Kwa kila ombi la API linaloelekezwa kupitia OmniRoute       |
| `provider_switch` | 5   | Kubadilisha kwenda kwa mtoa huduma tofauti                  |
| `model_switch`    | 3   | Kubadilisha kwenda kwa modeli tofauti                       |
| `combo_create`    | 10  | Kuunda mchanganyiko mpya                                    |
| `combo_use`       | 2   | Kutumia mchanganyiko kwa ombi                               |
| `token_share`     | 1   | Kwa kila tokeni 1 000 zinazoshirikiwa na mtumiaji mwingine  |
| `invite_redeem`   | 50  | Kutumia msimbo wa mwaliko                                   |
| `daily_login`     | 5   | Matumizi amilifu ya kila siku (mara moja kwa siku)          |
| `streak_bonus`    | 2   | Kwa kila siku mfululizo (huzidishwa kwa urefu wa mfululizo) |
| `badge_unlock`    | 10  | Kufungua beji                                               |

### Mtiririko wa Utoaji

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. Tafuta `XP_REWARDS[action]` ili kupata kiasi cha XP.
2. Pitisha kupitia `checkRateLimit()` (kuzuia udanganyifu: XP zisizozidi 1000 kwa dakika kwa kila ufunguo).
3. Fungua muamala:
   - Soma safu ya sasa ya `user_levels`.
   - Ongeza XP; hesabu upya kiwango kupitia `levelFromXp(totalXp)`.
   - Ikiwa kiwango kimebadilika, weka `levelUp = true`.
   - Sasisha safu ya `user_levels`.
   - Ingiza kwenye `xp_audit_log`.
4. Rudisha matokeo. Mw 호출aji hushughulikia arifa.

### Kisaidizi: `levelFromXp(totalXp)`

Hupitia viwango vya 1..100, ikijumlisha `xp_for_level(n)` hadi jumla ya XP
izidi `totalXp`. Hurejesha kiwango cha juu zaidi ambacho kizingiti chake kimetimizwa.
Hii ni O(100) — inakubalika kwa kuwa viwango huishia 100.

---

## Mfumo wa Beji

**Faili:** `src/lib/gamification/badges.ts`

### Kategoria

| Kategoria      | Maelezo                                 | Mifano ya Beji                                     |
| -------------- | --------------------------------------- | -------------------------------------------------- |
| `usage`        | Hatua muhimu zinazotegemea kiasi        | Ombi la Kwanza, Maombi 1K, 100K                    |
| `sharing`      | Kushiriki tokeni na rufaa               | Ushirikishaji wa Kwanza, Mkarimu (10)              |
| `contribution` | Ushiriki wa jumuiya                     | Muundaji wa Mchanganyiko, Mgunduzi wa Watoa Huduma |
| `streak`       | Uthabiti kwa muda                       | Shujaa wa Wiki, Mwaminifu wa Kila Mwezi            |
| `rare`         | Mafanikio magumu kupata au yaliyofichwa | Mtumiaji wa Mapema, Mripoti wa Hitilafu            |

### Viwango vya Uadimu

| Uadimu      | Rangi   | Kidokezo cha Uwezekano |
| ----------- | ------- | ---------------------- |
| `common`    | Kijivu  | Watumiaji wengi        |
| `uncommon`  | Kijani  | Watumiaji amilifu      |
| `rare`      | Bluu    | Watumiaji waliojitolea |
| `legendary` | Dhahabu | 1% ya juu              |

### Aina za Vigezo

| Aina           | Sehemu         | Maelezo                                              |
| -------------- | -------------- | ---------------------------------------------------- |
| `action_count` | `count`        | Tekeleza kitendo mara N (k.m., maombi 1000)          |
| `streak`       | `days`         | Dumisha mfululizo kwa siku N zinazofuatana           |
| `unique_count` | `field`, `n`   | Tumia thamani N za kipekee (k.m., modeli 10 tofauti) |
| `rank`         | `scope`, `n`   | Fikia nafasi ya N katika upeo wa ubao wa wanaoongoza |
| `first`        | —              | Kuwa wa kwanza kutekeleza kitendo                    |
| `hidden`       | (hutofautiana) | Vigezo havionyeshwi hadi beji ipatikane              |

Ufafanuzi wa beji huhifadhiwa katika `badge_definitions` kama `criteria` ya JSON:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Mtiririko wa Tathmini

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # ufafanuzi wote
    → getUserBadges(apiKeyId)         # ambazo tayari zimepatikana (ruka)
    → kwa kila beji ambayo haijapatikana:
       → matchesCriteria(badge, event, userState)
       → ikiwa inalingana: awardBadge(apiKeyId, badgeId)
         → rejesha data ya arifa
```

Tathmini **huendeshwa na matukio** — huendeshwa baada ya kila tukio la uchezeshaji, lakini
hukagua tu beji ambazo `criteria.type` yake inalingana na kitendo cha tukio. Hii
hudumisha kasi ya tathmini (< 5ms kwa matukio mengi).

### `matchesCriteria(badge, event, userState)`

| Aina ya Kigezo | Ukaguzi                                                          |
| -------------- | ---------------------------------------------------------------- |
| `action_count` | `getActionCount(apiKeyId, action) >= count`                      |
| `streak`       | `getCurrentStreak(apiKeyId) >= days`                             |
| `unique_count` | `getUniqueCount(apiKeyId, field) >= n`                           |
| `rank`         | `getRank(apiKeyId, scope) <= n`                                  |
| `first`        | Hakuna ingizo la awali la `xp_audit_log` kwa aina hii ya kitendo |
| `hidden`       | Hukabidhi kwa ukaguzi mdogo unaofaa                              |

### Beji Zilizojengewa Ndani (20+)

<details>
<summary>Orodha kamili ya beji</summary>

| Beji                         | Kategoria | Adimu      | Kigezo                            |
| ---------------------------- | --------- | ---------- | --------------------------------- |
| Hatua za Kwanza              | matumizi  | kawaida    | ombi 1                            |
| Kuanza Kupata Moto           | matumizi  | kawaida    | maombi 100                        |
| Mtumiaji Mahiri              | matumizi  | si kawaida | maombi 1,000                      |
| Jemadari wa Mia              | matumizi  | adimu      | maombi 10,000                     |
| Nguvu Zote                   | matumizi  | kishujaa   | maombi 100,000                    |
| Mrukaji wa Watoa Huduma      | mchango   | kawaida    | Tumia watoa huduma 5 tofauti      |
| Bingwa wa Watoa Huduma       | mchango   | si kawaida | Tumia watoa huduma 20 tofauti     |
| Mbunifu wa Michanganyiko     | mchango   | si kawaida | Unda michanganyiko 5              |
| Bingwa Mkuu wa Michanganyiko | mchango   | adimu      | Unda michanganyiko 25             |
| Shiriki ya Kwanza            | kushiriki | kawaida    | uhamisho 1 wa tokeni              |
| Mkarimu                      | kushiriki | si kawaida | uhamisho 10 wa tokeni             |
| Mfadhili                     | kushiriki | adimu      | Hamisha jumla ya tokeni 10,000    |
| Mrejeleaji                   | kushiriki | kawaida    | rufaa 1 iliyofaulu                |
| Mjenzi wa Mtandao            | kushiriki | si kawaida | rufaa 10 zilizofaulu              |
| Shujaa wa Wiki               | mfululizo | si kawaida | mfululizo wa siku 7               |
| Mwaminifu wa Mwezi           | mfululizo | adimu      | mfululizo wa siku 30              |
| Asiyezuilika                 | mfululizo | kishujaa   | mfululizo wa siku 365             |
| Mtumiaji wa Mapema           | adimu     | kishujaa   | Jiunge wakati wa kipindi cha beta |
| Mwanzilishi wa Mfinyazo      | adimu     | si kawaida | Tumia mfinyazo mara 100           |
| Mkusanyaji wa Ujuzi          | adimu     | adimu      | Tumia ujuzi 10 tofauti            |
| Mgunduzi wa Modeli           | mchango   | si kawaida | Tumia modeli 15 tofauti           |

</details>

---

## Kifuatiliaji cha Mfululizo

**Faili:** `src/lib/gamification/streaks.ts`

### Muundo wa Data

Mifululizo huhifadhiwa katika jedwali la `key_value` (jedwali la pamoja la huduma) chini ya
funguo zilizo na nafasi ya majina:

| Ufunguo                       | Thamani                          | Maelezo                       |
| ----------------------------- | -------------------------------- | ----------------------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Data ya mfululizo unaoendelea |

### Mantiki

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Soma rekodi ya mfululizo kutoka `key_value`.
2. Changanua `{current}`, `{longest}`, `{lastDate}` (mfuatano wa tarehe wa ISO).
3. Ikiwa `lastDate === today` — hakuna mabadiliko (tayari imehesabiwa leo).
4. Ikiwa `lastDate === yesterday` — ongeza `current`; sasisha `longest` ikihitajika.
5. Ikiwa `lastDate < yesterday` — weka upya `current = 1` (mfululizo umekatika).
6. Andika rekodi iliyosasishwa.
7. Kagua hatua muhimu: siku 7, 14, 30, 60, 90, 180, 365. Ikiwa imevukwa, weka
   `milestone = true` (mwitaji hutoa XP na kukagua beji).

### Hali Maalum

- **Ukanda wa saa**: mifululizo hutumia tarehe za UTC (`new Date().toISOString().slice(0, 10)`).
  Hii imekusudiwa — ukanda mmoja rasmi wa saa huzuia udanganyifu kupitia
  kubadilisha kanda za saa.
- **Watumiaji wapya**: hakuna rekodi ya mfululizo iliyopo; ombi la kwanza huiunda ikiwa na
  `current=1, longest=1, lastDate=today`.
- **Maombi mengi kwa siku**: ni ombi la kwanza tu la siku ya UTC
  linaloongeza mfululizo.

---

## Jedwali la Vinara

**Faili:** `src/lib/gamification/leaderboard.ts`

### Mawanda

| Wigo            | Kipindi | Maelezo                                                         |
| --------------- | ------- | --------------------------------------------------------------- |
| `global`        | `all`   | Jumla ya XP ya wakati wote                                      |
| `weekly`        | `week`  | XP iliyopatikana katika wiki ya sasa ya UTC (Jtn-Jpl)           |
| `monthly`       | `month` | XP iliyopatikana katika mwezi wa sasa wa UTC                    |
| `tokens_shared` | `all`   | Jumla ya tokeni zilizohamishwa kwa wengine                      |
| `contributions` | `all`   | Combo zilizoundwa + watoa huduma waliotumiwa + ujuzi uliotumiwa |

### Ukokotoaji wa Nafasi

Nafasi **hukokotolewa wakati wa usomaji**, hazihifadhiwi. Hii huepuka data ya nafasi iliyopitwa na wakati
na kuondoa hitaji la kazi za mara kwa mara za kukokotoa upya nafasi.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

Muundo wa hoja:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### Mzunguko wa Kipindi

Majedwali ya vinara ya kila wiki na kila mwezi hubadilika kiotomatiki:

1. **Hifadhi kwenye kumbukumbu**: kwenye mpaka wa kipindi, nakili maingizo ya sasa kwenda
   `leaderboard_archive` yakiwa na lebo ya kipindi.
2. **Weka upya**: futa maingizo ya kipindi kilichoisha.
3. **Kichochezi**: hukaguliwa kwenye kila mwito wa `updateLeaderboard()`; ombi la kwanza
   la kipindi kipya huchochea mzunguko.

Hii huhakikisha majedwali ya kila wiki yanawekwa upya kila Jumatatu saa 00:00 UTC na majedwali ya kila mwezi
yanawekwa upya tarehe 1 ya kila mwezi.

### Masasisho ya Wakati Halisi ya SSE

**Endpoint:** `GET /api/gamification/stream`

```
Mteja → GET /api/gamification/stream
  → Muunganisho wa SSE unaanzishwa
  → Seva hutuma muhtasari wa vinara 10 wa kwanza mara moja
  → Kila sekunde 5: tuma vinara 10 wa kwanza waliosasishwa ikiwa wamebadilika
  → Kila sekunde 15: maoni ya heartbeat (": heartbeat\n\n")
  → Mteja anatenganisha muunganisho → usafishaji (ondoa kisikilizaji)
```

Muundo wa tukio:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

Kidhibiti cha SSE hufuatilia wateja waliounganishwa kwa kila wigo na hutuma masasisho tu
wakati data ya jedwali la vinara imebadilika kwa kweli tangu utumaji wa mwisho.

---

## Kushiriki Tokeni

**Faili:** `src/lib/gamification/sharing.ts`

### Leja ya Ingizo Maradufu

Kila uhamisho huunda safu mlalo mbili katika `token_ledger`:

| Safu mlalo | `from_key_id` | `to_key_id` | `amount` |
| ---------- | ------------- | ----------- | -------- |
| Debiti     | mtumaji       | mpokeaji    | +kiasi   |
| Krediti    | mpokeaji      | mtumaji     | -kiasi   |

Subiri — utaratibu unaotumika ni:

| Safu mlalo | `from_key_id` | `to_key_id` | `amount` | Maana                           |
| ---------- | ------------- | ----------- | -------- | ------------------------------- |
| Tuma       | mtumaji       | mpokeaji    | +kiasi   | Kiasi kinachotoka kwa mtumaji   |
| Pokea      | mpokeaji      | mtumaji     | +kiasi   | Kiasi kinachoingia kwa mpokeaji |

Salio huhesabiwa kama ifuatavyo:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Mtiririko wa Uhamisho

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Thibitisha**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **Idempotensi**: angalia ikiwa `idempotency_key` tayari ipo katika leja.
   Ikiwa ndiyo, rudisha matokeo yaliyohifadhiwa kwenye akiba.
3. **Muamala** (muamala mmoja wa SQLite):
   a. Hesabu salio la mtumaji.
   b. Ikiwa `balance < amount`, sitisha (fedha hazitoshi).
   c. Ingiza safu mlalo ya kutuma (`from=sender,`.

### Uwekaji wa Vikomo vya Kasi

- Kiwango cha juu ni uhamisho 10 kwa dakika kwa kila ufunguo wa API.
- Kiwango cha juu ni tokeni 10,000 kwa uhamisho mmoja.
- Kiwango cha juu ni tokeni 100,000 zinazohamishwa kwa siku kwa kila ufunguo wa API.

---

## Tokeni za Mwaliko na Ukombozi

**Faili:** `src/lib/gamification/invites.ts`

### Muundo wa Msimbo

- **Msimbo**: herufi na tarakimu 8 (k.m., `A3K9-X7M2`), unaosomeka na binadamu,
  unaoonyeshwa kwa mtumiaji.
- **Tokeni**: tokeni nasibu ya baiti 32, iliyohifadhiwa kama hashi ya SHA-256. Hutumika kwa
  ukombozi wa kiprogramu (k.m., viungo vya URL).

### Hifadhi

| Safu wima    | Thamani                                     |
| ------------ | ------------------------------------------- |
| `code`       | `A3K9X7M2` (ya kipekee, imewekewa faharasa) |
| `token_hash` | SHA-256(raw_token)                          |

Tokeni ghafi hurudishwa kwa mtumiaji mara moja tu wakati wa uundaji. OmniRoute
haihifadhi wala kuionyesha tena — ni hashi pekee inayodumu.

### Kuzuia Kujirejelea Mwenyewe

Mtumiaji anapokomboa msimbo, mfumo hukagua:

1. Msimbo ni wa `api_key_id` tofauti.
2. Mtumiaji anayekomboa hajawahi kukomboa msimbo wowote kutoka kwa
   mrejeleaji huyo huyo (huunganisha `invite_tokens` + kumbukumbu ya ukombozi).

Ikiwa mojawapo ya ukaguzi huo itashindwa, ukombozi hukataliwa pamoja na ujumbe wazi wa hitilafu.

### Muda wa Kuisha na Vikomo

- `max_uses` chaguomsingi: 10 (inaweza kusanidiwa wakati wa uundaji).
- `expires_at` chaguomsingi: siku 30 tangu kuundwa.
- Misimbo iliyoisha muda au iliyotumika kikamilifu hurejesha HTTP 410 Gone.

---

## Shirikisho la Seva za Jumuiya

**Faili:** `src/lib/gamification/servers.ts`

### Kuunganisha

Seva ya jumuiya husajiliwa kupitia tokeni ya mwaliko iliyotolewa na seva ya mbali. Instansi ya ndani:

1. Hupokea tokeni ya mwaliko (kwa mfano, iliyobandikwa kwenye dashibodi).
2. Huita `POST /api/gamification/federation/leaderboard` kwenye seva ya mbali ili kuthibitisha tokeni na kuleta ubao wa wanaoongoza wa sasa.
3. Huhifadhi rekodi ya seva ikiwa na `status: connected`.

### Muundo wa Usawazishaji

Shirikisho hutumia **usawazishaji wa kubatilisha**, si wa kujumlisha:

```
Instansi ya Ndani              Seva ya Jumuiya
     │                              │
     ├── tuma alama ───────────────►│  POST /federation/score
     │   { api_key_id, score }      │  (seva inathibitisha hashi ya tokeni)
     │                              │
     ├── leta ubao wa wanaoongoza ─►│  GET /federation/leaderboard
     │◄── maingizo N ya juu ────────┤  (hubatilisha akiba ya ndani)
     │                              │
     └── ukaguzi wa afya ──────────►│  GET /federation/health
         (kila sekunde 60, muda wa kusubiri sekunde 5) │
```

### Uthibitishaji

Maombi ya shirikisho yanajumuisha:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

Seva ya mbali huhashi tokeni na kutafuta safu inayolingana ya `community_servers`. Hii huepuka kutuma hashi iliyohifadhiwa.

### Ufuatiliaji wa Afya

Kila rekodi ya seva hufuatilia:

| Sehemu      | Maelezo                                                      |
| ----------- | ------------------------------------------------------------ |
| `status`    | `connected`, `degraded`, `unreachable`                       |
| `last_sync` | Muhuri wa muda wa ISO wa usawazishaji wa mwisho uliofanikiwa |
| `failures`  | Kushindwa mfululizo kwa ukaguzi wa afya                      |

Baada ya kushindwa mara 5 mfululizo, hali hubadilika kuwa `unreachable` na usawazishaji husitishwa hadi ukaguzi wa afya unaofanywa kwa mikono ufanikiwe.

---

## Kuzuia Udanganyifu

**Faili:** `src/lib/gamification/antiCheat.ts`

### Ukokotoaji wa Alama Upande wa Seva

Ukokotoaji wote wa XP hufanyika katika `src/lib/gamification/xp.ts`. Wateja kamwe hawawasilishi alama — huwasilisha vitendo, na seva hukokotoa XP. Safu ya `leaderboard.score` inaweza kuandikwa na msimbo wa upande wa seva pekee.

### Uwekaji wa Vikomo vya Kasi

| Kikomo                     | Thamani | Upeo                    |
| -------------------------- | ------- | ----------------------- |
| XP ya juu kwa dakika       | 1,000   | Kwa kila ufunguo wa API |
| Uhamisho wa juu kwa dakika | 10      | Kwa kila ufunguo wa API |
| Kiasi cha juu cha uhamisho | 10,000  | Kwa kila uhamisho       |
| Uhamisho wa juu kwa siku   | 100,000 | Kwa kila ufunguo wa API |

Vikomo vya kasi hutumia dirisha linalosogea lililo kwenye kumbukumbu (muundo sawa na `RateLimitManager` katika `open-sse/services/`). Ikiwa mchakato utaanzishwa upya, mfumo hutumia vihesabio vinavyohifadhiwa kwenye SQLite kama mbadala.

### Ugunduzi wa Hitilafu kwa Z-Score

Kwa kila ufunguo wa API, mfumo hudumisha dirisha linalosogea la siku 7 la XP inayopatikana kwa saa. Kila XP inapotolewa:

1. Kokotoa kasi ya sasa ya XP ya mtumiaji kwa saa.
2. Kokotoa wastani na mkengeuko sanifu wa kundi.
3. Kokotoa `z = (user_rate - mean) / stddev`.
4. Ikiwa `z > 3.0` (mikengeuko sanifu 3), weka alama kuwa hitilafu.

Hitilafu hurekodiwa kwenye `xp_audit_log` ikiwa na `action = 'anomaly_detected'` na huonyeshwa kwenye dashibodi ya msimamizi.

### Rekodi ya Ukaguzi

Kila utoaji wa XP, uhamisho, upatikanaji wa beji na ugunduzi wa hitilafu hurekodiwa kwenye `xp_audit_log` ikiwa na:

| Sehemu       | Maelezo                                         |
| ------------ | ----------------------------------------------- |
| `api_key_id` | Nani                                            |
| `action`     | Kilichotokea (xp_award, transfer, anomaly, …)   |
| `xp_awarded` | Kiasi (0 kwa matukio yasiyo ya XP)              |
| `metadata`   | JSON yenye muktadha (aina ya kitendo, lengo, …) |
| `created_at` | Lini (ISO 8601)                                 |

Wasimamizi wanaweza kuuliza rekodi kamili ya ukaguzi kupitia `GET /api/gamification/anomalies`.

---

## Njia za API

Njia zote hufuata muundo wa kawaida wa OmniRoute:

```
Njia → Ukaguzi wa awali wa CORS → Uthibitishaji wa mwili (Zod) → Uthibitishaji (extractApiKey)
  → Kishughulikiaji
```

### Vituo vya Ufikiaji

| Mbinu  | Njia                                       | Maelezo                                                       | Uthibitishaji |
| ------ | ------------------------------------------ | ------------------------------------------------------------- | ------------- |
| GET    | `/api/gamification/leaderboard`            | Pata ubao wa wanaoongoza (wigo, kipindi, upangaji wa kurasa)  | Si lazima     |
| POST   | `/api/gamification/leaderboard`            | Lazimisha kuonyeshwa upya kwa akiba ya ubao wa wanaoongoza    | Unahitajika   |
| GET    | `/api/gamification/stream`                 | Masasisho ya wakati halisi ya ubao wa wanaoongoza kupitia SSE | Si lazima     |
| GET    | `/api/gamification/transfer`               | Pata historia ya uhamisho (upangaji wa kurasa)                | Unahitajika   |
| POST   | `/api/gamification/transfer`               | Tuma tokeni kwa mtumiaji mwingine                             | Unahitajika   |
| GET    | `/api/gamification/invite`                 | Orodhesha misimbo yangu ya mwaliko                            | Unahitajika   |
| POST   | `/api/gamification/invite`                 | Tengeneza msimbo mpya wa mwaliko                              | Unahitajika   |
| DELETE | `/api/gamification/invite`                 | Batilisha msimbo wa mwaliko                                   | Unahitajika   |
| POST   | `/api/gamification/invite/redeem`          | Tumia msimbo wa mwaliko                                       | Unahitajika   |
| GET    | `/api/gamification/servers`                | Orodhesha seva za jumuiya                                     | Unahitajika   |
| POST   | `/api/gamification/servers`                | Unganisha kwenye seva ya jumuiya                              | Unahitajika   |
| DELETE | `/api/gamification/servers`                | Kata muunganisho na seva ya jumuiya                           | Unahitajika   |
| POST   | `/api/gamification/federation/score`       | Tuma alama kwenye seva ya mbali                               | Shirikisho    |
| GET    | `/api/gamification/federation/leaderboard` | Pakua ubao wa wanaoongoza kutoka seva ya mbali                | Shirikisho    |
| GET    | `/api/gamification/notifications`          | Arifa za SSE za beji/kupanda kiwango                          | Unahitajika   |
| GET    | `/api/gamification/anomalies`              | Tazama ripoti za hitilafu (msimamizi)                         | Msimamizi     |
| POST   | `/api/gamification/rotate`                 | Badilisha siri za tokeni za mwaliko                           | Unahitajika   |

### Mifano ya Ombi/Jibu

**POST /api/gamification/transfer**

```json
// Ombi
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// Jibu 200
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

// Jibu 400 (salio halitoshi)
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

## Zana za MCP (8)

Zimesajiliwa katika `open-sse/mcp-server/` pamoja na zana zilizopo. Zimewekewa mipaka chini ya
wigo wa ruhusa wa `gamification`.

| Zana                       | Maelezo                                          | Muundo wa Ingizo             |           |
| -------------------------- | ------------------------------------------------ | ---------------------------- | --------- |
| `gamification_leaderboard` | Pata ubao wa wanaoongoza kwa wigo/kipindi        | `{ scope, period?, limit? }` |
| `gamification_rank`        | Pata nafasi ya mwombaji na walio karibu naye     | `{ scope }`                  |
| `gamification_profile`     | Pata muhtasari wa XP, kiwango, cheo na mfululizo | `{}`                         |
| `gamification_badges`      | Orodhesha beji zilizopatikana au fasili zote     | `{ earned?: boolean }`       |
| `gamification_transfer`    | Tuma tokeni kwa mtumiaji mwingine                | `{ to, amount }`             |
| `gamification_invite`      | Tengeneza au orodhesha misimbo ya mialiko        | `{ action: "create"          | "list" }` |
| `gamification_servers`     | Orodhesha au unganisha seva za jumuiya           | `{ action, token? }`         |
| `gamification_anomalies`   | Tazama ripoti za hitilafu (wigo wa msimamizi)    | `{ limit?, since? }`         |

---

## Kurasa za Dashibodi

### `/dashboard/leaderboard`

- Onyesho la jukwaa la washindi (3 bora wakiwa na avatari na XP).
- Kiteuzi cha wigo: Kimataifa / Kila Wiki / Kila Mwezi / Tokeni Zilizoshirikiwa / Michango.
- Jedwali lenye kurasa (25 kwa kila ukurasa) likiwa na nafasi, jina, alama, kiwango na cheo.
- Masasisho ya wakati halisi kupitia SSE — mabadiliko ya nafasi huonyeshwa kwa uhuishaji.
- Mtumiaji wa sasa huangaziwa katika jedwali kwa safu tuli ya "Nafasi Yako".

### `/dashboard/profile`

- Upau wa maendeleo ya XP wenye kiwango cha sasa na kiwango cha chini kinachohitajika kwa kiwango kinachofuata.
- Beji ya cheo huonyeshwa kwa uwazi.
- Matunzio ya beji — beji zilizopatikana zikiwa na tarehe ya kupatikana, na beji ambazo hazijapatikana zikiwa zimefifishwa
  (beji zilizofichwa huonyesha "???" hadi zipatikane).
- Kihesabu cha mfululizo chenye ikoni ya mwali; kalenda ya mfululizo (siku 30 zilizopita).
- Chati ya historia ya XP (XP ya kila siku katika siku 30 zilizopita).

### `/dashboard/tokens`

- Salio la tokeni (linaonekana wazi, juu ya ukurasa).
- Fomu ya uhamisho: mpokeaji, kiasi, kisanduku cha uthibitishaji.
- Jedwali la historia ya uhamisho lenye vichujio (zilizotumwa/zilizopokewa/zote).
- Sehemu ya mialiko: misimbo inayotumika, tengeneza mpya, kiungo cha kushiriki.
- Seva za jumuiya: orodha yenye hali ya utendaji, unganisha/tenganisha.

### `/dashboard/gamification/admin`

- Orodha ya hitilafu yenye kiwango cha uzito, mtumiaji, muhuri wa muda na z-score.
- Kitazamaji cha kumbukumbu za ukaguzi chenye vichujio (aina ya kitendo, mtumiaji, kipindi cha tarehe).
- Takwimu za mfumo: jumla ya XP iliyotolewa, watumiaji wanaotumika na viwango vya kupatikana kwa beji.
- Muhtasari wa hali ya utendaji wa seva za shirikisho.

---

## Ujumuishaji wa Pipeline

### Sehemu ya Ujumuishaji

Gamification huunganishwa kwenye pipeline ya maombi katika sehemu moja ndani ya
`open-sse/handlers/chatCore.ts`:

```typescript
// Baada ya jibu kutumwa kwa mteja:
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
    // Anzisha bila kusubiri: rekodi lakini usiwahi kueneza kwa mteja
  });
});
```

### Aina za Matukio

| Aina ya Tukio       | Wakati Linapotolewa                                      |
| ------------------- | -------------------------------------------------------- |
| `request.completed` | Jibu la LLM lenye mafanikio limetumwa                    |
| `provider.switch`   | Mtoa huduma amebadilishwa (urejeaji wa combo huhesabiwa) |
| `combo.created`     | Usanidi mpya wa combo umehifadhiwa                       |
| `combo.used`        | Lengo la combo limefikiwa kwa mafanikio                  |
| `badge.earned`      | Tathmini ya beji imepata ulinganifu                      |
| `streak.milestone`  | Kiwango muhimu cha mfululizo kimevukwa                   |
| `transfer.sent`     | Uhamisho wa tokeni umekamilika                           |
| `referral.redeemed` | Msimbo wa mwaliko umetumika kwa mafanikio                |
| `compression.used`  | Mfinyazo wa prompt umetumika                             |
| `skill.executed`    | Utekelezaji wa ujuzi umekamilika                         |
| `model.first_use`   | Modeli haikutumika katika siku 7 zilizopita              |

### Dhamana ya Kutokuzuia

Muundo wa `setImmediate` + `.catch(() => {})` huhakikisha:

1. Jibu linatumwa kikamilifu kabla ya gamification kuendeshwa.
2. Hitilafu za gamification haziwahi kuonekana kwa mteja.
3. Uchakataji wa tukio huendeshwa katika microtask inayofuata, si ndani ya mchakato wa sasa.

---

## Usalama

### Muundo wa Vitisho

| Tishio                            | Hatua ya kupunguza hatari                                                               |
| --------------------------------- | --------------------------------------------------------------------------------------- |
| Kuongezwa kwa alama               | XP huhesabiwa upande wa seva pekee; wateja hutuma vitendo, si alama                     |
| Mashambulizi ya marudio           | Funguo za kutorudia kwenye uhamisho; kuondoa nakala rudufu kwenye kumbukumbu ya ukaguzi |
| Udanganyifu wa uhamisho           | Leja ya miingizo miwili; miamala atomiki; vikomo vya kasi                               |
| Kujirejelea mwenyewe              | Kuhakiki `api_key_id` wakati wa ukombozi                                                |
| Udanganyifu wa ubao wa vinara     | Kugundua hitilafu kwa Z-score; dashibodi ya hitilafu ya msimamizi                       |
| Wizi wa tokeni ya shirikisho      | Hifadhi iliyohashiwa kwa SHA-256; tokeni ghafi huonyeshwa mara moja pekee               |
| Kulazimisha misimbo ya mwaliko    | Kuweka kikomo cha kasi kwenye sehemu ya mwisho ya ukombozi; entropia ya herufi 8        |
| XSS katika majina ya kuonyesha    | Majina ya kuonyesha husafishwa; maingizo ya ubao wa vinara huepukwa                     |
| Mashambulizi ya muda kwenye hashi | `crypto.timingSafeEqual` kwa kulinganisha hashi ya tokeni                               |

### Mahitaji ya Uthibitishaji

- **Umma** (bila uthibitishaji): `GET /leaderboard`, `GET /stream` (mbao za vinara za
  kusoma pekee).
- **Ufunguo wa API unahitajika**: shughuli zote za kuandika, wasifu, uhamisho, mialiko.
- **Msimamizi pekee**: dashibodi ya hitilafu, kionyeshi cha kumbukumbu ya ukaguzi.
- **Shirikisho**: njia tofauti ya uthibitishaji inayotumia tokeni ghafi kwenye kichwa cha
  `Authorization`, inayothibitishwa dhidi ya hashi ya SHA-256 iliyohifadhiwa.

---

## Majaribio

### Faili za Majaribio

Majaribio yote hutumia kiendesha majaribio asilia cha Node.js (`node --import tsx/esm --test`).

| Faili ya Jaribio                              | Inachoshughulikia                                         | Majaribio |
| --------------------------------------------- | --------------------------------------------------------- | --------- |
| `tests/unit/gamification/xp.test.ts`          | Ukokotoaji wa XP, mkunjo wa kiwango, vyeo                 | 8         |
| `tests/unit/gamification/badges.test.ts`      | Ulinganishaji wa vigezo vya beji, utoaji                  | 10        |
| `tests/unit/gamification/streaks.test.ts`     | Mantiki ya mfululizo, hatua muhimu, hali za ukingoni      | 7         |
| `tests/unit/gamification/leaderboard.test.ts` | Ukokotoaji wa nafasi, ugawaji wa kurasa, mzunguko         | 8         |
| `tests/unit/gamification/sharing.test.ts`     | Uhamisho, salio, kutorudia                                | 9         |
| `tests/unit/gamification/invites.test.ts`     | Kuunda, kukomboa, kuisha muda, kujirejelea mwenyewe       | 7         |
| `tests/unit/gamification/antiCheat.test.ts`   | Vikomo vya kasi, Z-score, uwekaji kumbukumbu za ukaguzi   | 6         |
| `tests/unit/gamification/events.test.ts`      | Utoaji wa matukio, usambazaji, ushughulikiaji wa hitilafu | 5         |

### Kuendesha Majaribio

```bash
# Majaribio yote ya uchezeshaji
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# Faili moja ya jaribio
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Mahitaji ya Ufunikaji

Kulingana na `CONTRIBUTING.md` — moduli zote mpya lazima ziwe na:

- Ufunikaji wa matawi >= 80%.
- Kila kitendakazi cha umma kijaribiwe angalau mara moja.
- Njia za hitilafu zijaribiwe (salio lisilotosha, misimbo iliyoisha muda, vikomo vya kasi).

---

## Muundo wa Faili

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # Majedwali yote 8 pamoja na faharasa
      gamification.ts                  # Moduli ya CRUD ya kikoa
    gamification/
      xp.ts                           # Ukokotoaji wa XP, mzunguko wa viwango, vyeo
      badges.ts                       # Ufafanuzi wa beji, vigezo, tathmini
      streaks.ts                      # Ufuatiliaji wa mfululizo wa kila siku
      leaderboard.ts                  # Ukokotoaji wa nafasi, SSE, mzunguko
      antiCheat.ts                    # Uzuiaji wa kiwango, z-score, ukaguzi
      sharing.ts                      # Leja ya uhamishaji wa tokeni
      invites.ts                      # Misimbo ya mwaliko/ukomboaji
      servers.ts                      # Shirikisho la seva za jumuiya
      events.ts                       # Kitoa matukio (sehemu ya ujumuishaji)
      notifications.ts                # Mtiririko wa arifa wa SSE
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST ubao wa wanaoongoza
        leaderboard/stream/route.ts   # Masasisho ya wakati halisi ya SSE
        transfer/route.ts             # GET/POST uhamishaji
        invite/route.ts               # GET/POST/DELETE misimbo ya mwaliko
        invite/redeem/route.ts        # POST komboa msimbo
        servers/route.ts              # GET/POST/DELETE seva
        federation/score/route.ts     # POST tuma alama
        federation/leaderboard/route.ts # GET pata ubao wa wanaoongoza
        notifications/route.ts        # Arifa za SSE
        anomalies/route.ts            # GET ripoti za hitilafu
        rotate/route.ts               # POST badilisha siri kwa mzunguko
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Ukurasa wa nafasi
        profile/page.tsx               # Ukurasa wa XP/beji/mifululizo
        tokens/page.tsx                # Ukurasa wa salio/uhamishaji/mialiko
        gamification/admin/page.tsx    # Ufuatiliaji wa hitilafu wa msimamizi
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
    GAMIFICATION.md                    # Hati hii
```

---

## Mkakati wa Uhamishaji

### Awamu ya 1: Kiini cha Sehemu ya Nyuma (PR 1)

- Uhamishaji `060_create_gamification.sql` (majedwali 8).
- `src/lib/db/gamification.ts` (moduli ya kikoa).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- Sehemu ya ujumuishaji katika `chatCore.ts`.
- Majaribio ya kitengo kwa XP, mifululizo na matukio.

### Awamu ya 2: Beji na Ubao wa Wanaoongoza (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Ufafanuzi wa beji katika thamani zisizobadilika.
- Njia za API za ubao wa wanaoongoza pamoja na mtiririko wa SSE.
- Majaribio ya kitengo kwa beji na ubao wa wanaoongoza.

### Awamu ya 3: Kushiriki na Mialiko (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- Njia za API za uhamishaji na mwaliko.
- Majaribio ya kitengo kwa kushiriki, mialiko na kuzuia udanganyifu.

### Awamu ya 4: Shirikisho na Dashibodi (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- Njia za API za shirikisho.
- Kurasa za dashibodi (ubao wa wanaoongoza, wasifu, tokeni, usimamizi).
- Usajili wa zana za MCP.

---

## Mambo ya Kuzingatia Katika Siku Zijazo

- **Matukio ya msimu**: seti za beji zinazopatikana kwa muda mfupi na misimu ya jedwali la wanaoongoza.
- **Jedwali la wanaoongoza la timu**: panga watumiaji katika vikundi kulingana na shirika au mchanganyiko.
- **Vizidishi vya XP**: ongeza XP katika vipindi vya matangazo.
- **Kushiriki mafanikio**: tengeneza kadi za beji zinazoweza kushirikiwa (picha za OpenGraph).
- **Arifa za simu**: arifa zinazotegemea webhook kwa matukio ya beji/kiwango.
- **API ya jedwali la wanaoongoza**: API ya umma kwa miunganisho ya wahusika wengine.
