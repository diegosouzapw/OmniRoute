# Gamification & Leaderboard System (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **Isi mmalite nke eziokwu:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Emelitere ikpeazụ:** 2026-06-28 — v3.8.40

OmniRoute nwere oyi akwa gamification nke na-ebute nchekwa mpaghara ụzọ nke mbụ, nke na-enye ndị ọrụ ụgwọ maka
iji ikpo okwu ahụ emekọrịta ihe — ime arịrịọ, ịgbanwe ndị na-eweta ọrụ, imepụta
ngwakọta, ịkekọrịta token, na itinye aka na obodo. Steeti niile dị na
SQLite; ijikọ ya na sava obodo bụ nhọrọ nke onye ọrụ ma dabere n'ịkwaga data gaa na sava ndị ahụ.

E mere sistemụ ahụ ka ọ bụrụ nke nwere **oge nchere efu n'ụzọ ọrụ kachasị mkpa** — a na-eziga mmemme gamification
n'ebughị ụzọ chere ka ha gwụ site na usoro arịrịọ ahụ, ha anaghịkwa egbochi
nzaghachi LLM.

---

## Nchịkọta

### Ebumnuche

Ịbawanye mmekọrịta ndị ọrụ na ịnọgide ha site n'inye ọganihu a na-ahụ anya (XP,
ọkwa, baajị), ihe akaebe mmekọrịta mmadụ na ibe ya (bọọdụ ndị ndu), na ihe mkpali akụ na ụba (ịkekọrịta token,
ụgwọ ịkpọbata ndị ọzọ).

### Oke

| Njirimara           | Nkọwa                                                                                               |
| ------------------- | --------------------------------------------------------------------------------------------------- |
| XP & Ọkwa           | Nweta XP maka omume ọ bụla; rịgoro ọkwa n'usoro polynomial                                          |
| Baajị               | Ihe karịrị mmezu 20 n'ime ngalaba 5 nwere ọkwa ụkọ 4                                                |
| Usoro ụbọchị        | Nsochi ojiji kwa ụbọchị, gụnyere usoro dị ugbu a na nke kachasị ogologo                             |
| Bọọdụ ndị ndu       | Oke zuru ụwa ọnụ, kwa izu, kwa ọnwa, ịkekọrịta token, na ntinye aka                                 |
| Ịkekọrịta Token     | Nyefee kredit n'etiti ndị ọrụ site na ndekọ nwere ntinye abụọ                                       |
| Ịkpọbata & Ịgbapụta | Koodu ntụaka nwere nchekwa e ji SHA-256 mee hash                                                    |
| Sava Obodo          | Jikọọ na instance OmniRoute ndị dị n'èzí                                                            |
| Mgbochi Aghụghọ     | Ịgbakọ akara n'akụkụ sava, ịmachibido ugboro arịrịọ, nchọpụta ihe na-adịghị adịkarị site na z-score |

### Ụkpụrụ Nhazi

1. **Mpaghara-ụzọ-mbụ** — steeti niile dị na SQLite, achọghị ọrụ mpụga ọ bụla.
2. **Anaghị egbochi** — a na-eziga mmemme n'ebughị ụzọ chere ka ha gwụ; ụzọ nzaghachi LLM
   anaghị egbu oge n'ihi usoro gamification.
3. **Sava bụ onye ikike** — a na-agbakọ XP naanị n'akụkụ sava; ndị ahịa enweghị ike
   ịbawanye akara n'ụzọ aghụghọ.
4. **Na-asọpụrụ nzuzo** — isonye na bọọdụ ndị ndu bụ nhọrọ onye ọrụ; ndị ọrụ nwere ike
   izochi profaịlụ ha.
5. **Dị njikere maka njikọ sava** — sava obodo nwere ike iziga akara site na API e binyere aka na ya;
   mmekọrịta data na-edechi nke dịbu, ọ naghị atụkwasị na ya.

---

## Nhazi Sistemụ

### Usoro Ọrụ N'ogo Dị Elu

```
Arịrịọ Onye Ahịa
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (usoro ọrụ dịbu) ...
      → ezigaara onye ahịa nzaghachi sitere n'ọrụ dị n'elu
      → setImmediate (ziga ma echela):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

Ihe na-ezipụ mmemme bụ naanị otu ebe njikọta. `chatCore.ts` na-akpọ
`emitGamificationEvent()` mgbe e zigachara nzaghachi ahụ; modul mmemme ahụ na-ekesa ọrụ
gaa na sistemụ nta nke XP, usoro ụbọchị, baajị, bọọdụ ndị ndu, na mgbochi aghụghọ.

### Eserese Ndabere Modul

```
src/lib/gamification/
  events.ts          ← ebe mbata (a na-akpọ ya site na chatCore.ts)
    ├── xp.ts        ← mgbakọ XP & mkpebi ọkwa
    ├── streaks.ts   ← nsochi usoro ọrụ kwa ụbọchị
    ├── badges.ts    ← nyocha ụkpụrụ baajị
    ├── leaderboard.ts ← mgbakọ ọkwa & mgbasa SSE
    ├── antiCheat.ts ← mmachi ugboro arịrịọ & nchọpụta ihe na-adịghị adịkarị
    ├── sharing.ts   ← ndekọ nnyefe token
    ├── invites.ts   ← njikwa koodu ịkpọbata/ịgbapụta
    ├── servers.ts   ← njikọ sava obodo
    └── notifications.ts ← iyi ọkwa SSE

src/lib/db/
  gamification.ts    ← ọrụ CRUD niile (tebụl 8)

src/app/api/gamification/
  leaderboard/       ← GET ọkwa, POST mmelite aka
  leaderboard/stream ← mmelite ozugbo site na SSE
  transfer/          ← GET akụkọ ihe mere eme, POST iziga token
  invite/            ← koodu GET/POST, DELETE ịkagbu
  invite/redeem/     ← POST ịgbapụta koodu
  servers/           ← sava obodo GET/POST/DELETE
  federation/score/  ← POST ịkwaga akara na sava
  federation/leaderboard/ ← GET ibudata bọọdụ ndị ndu site na sava
  notifications/     ← ọkwa SSE maka baajị/ịrịgo ọkwa
  anomalies/         ← GET akụkọ ihe na-adịghị adịkarị (onye nchịkwa)
  rotate/            ← POST ịgbanwe ihe nzuzo token ịkpọbata
```

---

## Oyi Data

### Tebụl Ebe Nchekwa Data

Tebụl niile dị na ebe nchekwa data SQLite bụ isi nke OmniRoute, nke migration
`060_create_gamification.sql` mepụtara. A na-eketa ndekọ WAL site na singleton
`getDbInstance()` dị na `src/lib/db/core.ts`.

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

### Modul Ngalaba: `src/lib/db/gamification.ts`

Ọ na-agbaso usoro ọkọlọtọ OmniRoute — ọ na-ebubata `getDbInstance()` site na
`core.ts`, ma na-ebupụ ọrụ CRUD nwere ụdị akọwapụtara. Enweghị SQL a na-ede ozugbo n'ime ndị njikwa route.

Ọrụ ndị bụ isi:

| Ọrụ                        | Nkọwa                                                       |
| -------------------------- | ----------------------------------------------------------- |
| `upsertLeaderboardEntry()` | Tinye ma ọ bụ melite akara maka (api_key_id, scope, period) |
| `getLeaderboard()`         | Nhazi ọkwa e kewara n'ibe maka scope/period enyere          |
| `getUserLevel()`           | Nweta ma ọ bụ mepụta ndekọ ọkwa onye ọrụ                    |
| `updateUserLevel()`        | Tọọ XP, ọkwa, na aha n'otu ọrụ atomik                       |
| `getBadgeDefinitions()`    | Nkọwapụta baajị niile (enwere ike ihicha ha)                |
| `getUserBadges()`          | Baajị onye ọrụ nwetara                                      |
| `awardBadge()`             | Tinye ndekọ inweta baajị (idempotent na badge_id)           |
| `logXpAction()`            | Tinye ihe ọhụrụ na xp_audit_log                             |
| `getXpAuditLog()`          | Akụkọ nyocha e kewara n'ibe maka onye ọrụ                   |
| `insertLedgerEntry()`      | Nnyefe ndekọ-abụọ (n'ime transaction)                       |
| `getBalance()`             | Nchịkọta nke ihe anatara ewepụ nke ezipụrụ maka onye ọrụ    |
| `getTransferHistory()`     | Ndekọ nnyefe e kewara n'ibe                                 |
| `createInviteToken()`      | Tinye koodu ọkpụkpọ òkù + token e mere hash                 |
| `redeemInviteToken()`      | Jiri koodu chọọ ya, kwado ya, ma mụbaa uses                 |
| `upsertCommunityServer()`  | Debanye aha ma ọ bụ melite sava federation                  |
| `getCommunityServers()`    | Depụta sava ndị nke onye ọrụ                                |
| `deleteCommunityServer()`  | Wepụ ndebanye aha sava                                      |

---

## Sistemụ XP / Ọkwa

**Faịlụ:** `src/lib/gamification/xp.ts`

### Usoro Mmụba Ọkwa

XP achọrọ iji ruo ọkwa `n` na-agbaso usoro polynomial:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Ọkwa | XP ruo Ọkwa Ọzọ | XP Mkpokọta | Utu aha        |
| ---- | --------------- | ----------- | -------------- |
| 1    | 100             | 100         | Onye Mmalite   |
| 5    | 1,118           | 2,415       | Onye Mmalite   |
| 10   | 3,162           | 10,523      | Onye Nchọgharị |
| 25   | 12,500          | 86,024      | Onye Nchọgharị |
| 50   | 35,355          | 345,529     | Ọkachamara     |
| 75   | 64,952          | 948,683     | Nna Ukwu       |
| 100  | 100,000         | 2,050,000   | Ọkaibe         |

### Utu aha

| Oke Ọkwa | Utu aha        |
| -------- | -------------- |
| 1 – 9    | Onye Mmalite   |
| 10 – 24  | Onye Nchọgharị |
| 25 – 49  | Ọkachamara     |
| 50 – 74  | Nna Ukwu       |
| 75 – 100 | Ọkaibe         |

### Ụgwọ Ọrụ XP

| Omume             | XP  | Nkọwa                                                                            |
| ----------------- | --- | -------------------------------------------------------------------------------- |
| `request`         | 1   | Maka arịrịọ API ọ bụla e zigara site na OmniRoute                                |
| `provider_switch` | 5   | Ịgbanwe gaa na provider ọzọ                                                      |
| `model_switch`    | 3   | Ịgbanwe gaa na model ọzọ                                                         |
| `combo_create`    | 10  | Ịmepụta combo ọhụrụ                                                              |
| `combo_use`       | 2   | Iji combo maka arịrịọ                                                            |
| `token_share`     | 1   | Maka token 1 000 ọ bụla e kesara onye ọrụ ọzọ                                    |
| `invite_redeem`   | 50  | Iji koodu ọkpụkpọ                                                                |
| `daily_login`     | 5   | Ojiji kwa ụbọchị (otu ugboro n'ụbọchị)                                           |
| `streak_bonus`    | 2   | Maka ụbọchị streak ọ bụla na-esochi ibe ya (a na-amụba ya site n'ogologo streak) |
| `badge_unlock`    | 10  | Imeghe baajị                                                                     |

### Usoro Inye

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. Chọọ `XP_REWARDS[action]` iji nweta ọnụọgụ XP.
2. Nyefee ya na `checkRateLimit()` (mgbochi aghụghọ: XP kacha elu bụ 1000 kwa nkeji maka key ọ bụla).
3. Mepee transaction:
   - Gụọ row `user_levels` dị ugbu a.
   - Tinye XP; jiri `levelFromXp(totalXp)` gbakọọ ọkwa ọzọ.
   - Ọ bụrụ na ọkwa agbanweela, tọọ `levelUp = true`.
   - Melite row `user_levels`.
   - Tinye n'ime `xp_audit_log`.
4. Weghachite nsonaazụ ahụ. Caller na-ahụ maka ọkwa ọkwa.

### Onye Enyemaka: `levelFromXp(totalXp)`

Ọ na-agafe ọkwa 1..100, na-achịkọta `xp_for_level(n)` ruo mgbe XP mkpokọta
gafere `totalXp`. Ọ na-eweghachite ọkwa kachasị elu e mezuru oke ya.
Nke a bụ O(100) — ọ dị mma ebe ọ bụ na ọkwa na-akwụsị na 100.

---

## Sistemụ Baajị

**Faịlụ:** `src/lib/gamification/badges.ts`

### Otu Dị Iche Iche

| Otu            | Nkọwa                                          | Ọmụmaatụ Baajị                                 |
| -------------- | ---------------------------------------------- | ---------------------------------------------- |
| `usage`        | Ihe mgbaru ọsọ dabere n'oke ojiji              | Arịrịọ Mbụ, Arịrịọ 1K, 100K                    |
| `sharing`      | Ịkekọrịta token na ntụnye                      | Nkekọrịta Mbụ, Onye Mmesapụ Aka (nkekọrịta 10) |
| `contribution` | Ntinye aka n'obodo                             | Onye Mepụtara Combo, Onye Nchọgharị Provider   |
| `streak`       | Ịnọgide na-eme ihe ka oge na-aga               | Dike Izu, Onye Raara Onwe Ya Kwa Ọnwa          |
| `rare`         | Mmezu ndị siri ike inweta ma ọ bụ ndị zoro ezo | Onye Mbụ Nabata, Onye Kọọrọ Bug                |

### Ọkwa Ịdị Ụkọ

| Ịdị Ụkọ     | Agba        | Ntuziaka Ihe Pụrụ Ime     |
| ----------- | ----------- | ------------------------- |
| `common`    | Ntụ ntụ     | Ọtụtụ ndị ọrụ             |
| `uncommon`  | Akwụkwọ ndụ | Ndị ọrụ na-arụsi ọrụ ike  |
| `rare`      | Anụnụ anụnụ | Ndị ọrụ raara onwe ha nye |
| `legendary` | Ọla edo     | 1% kachasị elu            |

### Ụdị Ntụle

| Ụdị            | Field             | Nkọwa                                                       |
| -------------- | ----------------- | ----------------------------------------------------------- |
| `action_count` | `count`           | Mee omume ugboro N (dịka ọmụmaatụ, arịrịọ 1000)             |
| `streak`       | `days`            | Debe streak ruo ụbọchị N na-esochi ibe ha                   |
| `unique_count` | `field`, `n`      | Jiri uru pụrụ iche N (dịka ọmụmaatụ, model 10 dị iche iche) |
| `rank`         | `scope`, `n`      | Ruo rank N n'ime scope leaderboard                          |
| `first`        | —                 | Bụrụ onye mbụ mere otu omume                                |
| `hidden`       | (na-adịgasị iche) | Anaghị egosi ntụle ahụ ruo mgbe enwetara ya                 |

A na-echekwa nkọwa baajị na `badge_definitions` dịka JSON `criteria`:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Usoro Ntụle

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # nkọwa niile
    → getUserBadges(apiKeyId)         # ndị enwetarala (gafee)
    → maka baajị ọ bụla a na-enwetabeghị:
       → matchesCriteria(badge, event, userState)
       → ọ bụrụ na ọ dabara: awardBadge(apiKeyId, badgeId)
         → weghachite payload ọkwa ọkwa
```

Ntụle ahụ bụ **nke event na-akpalite** — ọ na-arụ ọrụ mgbe event gamification ọ bụla gachara, mana
ọ na-enyocha naanị baajị ndị `criteria.type` ha kwekọrọ na omume event ahụ. Nke a
na-eme ka ntụle dị ngwa (< 5ms maka ọtụtụ event).

### `matchesCriteria(badge, event, userState)`

| Ụdị Ntụle      | Nnyocha                                                |
| -------------- | ------------------------------------------------------ |
| `action_count` | `getActionCount(apiKeyId, action) >= count`            |
| `streak`       | `getCurrentStreak(apiKeyId) >= days`                   |
| `unique_count` | `getUniqueCount(apiKeyId, field) >= n`                 |
| `rank`         | `getRank(apiKeyId, scope) <= n`                        |
| `first`        | Enweghị entry `xp_audit_log` gara aga maka ụdị omume a |
| `hidden`       | Ọ na-enyefe ọrụ ahụ na sub-check kwesịrị ekwesị        |

### Baajị Ndị E Wụnyere N'ime Sistemụ (20+)

<details>
<summary>Ndepụta baajị zuru ezu</summary>

| Baajị                        | Ụdị       | Ọkwa ụkọ   | Ihe achọrọ                        |
| ---------------------------- | --------- | ---------- | --------------------------------- |
| Nzọụkwụ Mbụ                  | ojiji     | nkịtị      | arịrịọ 1                          |
| Ịmalite Ịkpo Ọkụ             | ojiji     | nkịtị      | arịrịọ 100                        |
| Ọka Ojiarụ                   | ojiji     | adịkebeghị | arịrịọ 1,000                      |
| Onye Ọchịagha Narị           | ojiji     | dị ụkọ     | arịrịọ 10,000                     |
| Ike Niile                    | ojiji     | akụkọ ifo  | arịrịọ 100,000                    |
| Onye Na-agbanwe Ndị Na-eweta | onyinye   | nkịtị      | Jiri ndị na-eweta 5 dị iche iche  |
| Ọka Ndị Na-eweta             | onyinye   | adịkebeghị | Jiri ndị na-eweta 20 dị iche iche |
| Onye Nrụpụta Ngwakọta        | onyinye   | adịkebeghị | Mepụta ngwakọta 5                 |
| Nnukwu Ọka Ngwakọta          | onyinye   | dị ụkọ     | Mepụta ngwakọta 25                |
| Nkekọrịta Mbụ                | nkekọrịta | nkịtị      | mbufe token 1                     |
| Onye Mmesapụ Aka             | nkekọrịta | adịkebeghị | mbufe token 10                    |
| Onye Ọrụ Ebere               | nkekọrịta | dị ụkọ     | Nyefee token 10,000 n'ozuzu       |
| Onye Ntụtụaka                | nkekọrịta | nkịtị      | ntụgharịaka 1 gara nke ọma        |
| Onye Nrụpụta Netwọkụ         | nkekọrịta | adịkebeghị | ntụgharịaka 10 gara nke ọma       |
| Dike Izu                     | usoro     | adịkebeghị | usoro ụbọchị 7                    |
| Onye Raara Onwe Ya Kwa Ọnwa  | usoro     | dị ụkọ     | usoro ụbọchị 30                   |
| Onye A Na-apụghị Ịkwụsị      | usoro     | akụkọ ifo  | usoro ụbọchị 365                  |
| Onye Nabata Ya N'Isi         | pụrụ iche | akụkọ ifo  | Soro n'oge beta                   |
| Onye Mbụ n'Mkpakọ            | pụrụ iche | adịkebeghị | Jiri mkpakọ ugboro 100            |
| Onye Nchịkọta Nka            | pụrụ iche | dị ụkọ     | Jiri nka 10 dị iche iche          |
| Onye Nnyocha Model           | onyinye   | adịkebeghị | Jiri model 15 dị iche iche        |

</details>

---

## Ndekọ Usoro Ụbọchị Na-aga n’Ihu

**Faịlụ:** `src/lib/gamification/streaks.ts`

### Nhazi Data

A na-echekwa usoro ụbọchị na-aga n’ihu na tebụl `key_value` (tebụl akụrụngwa a na-ekekọrịta) n’okpuru
igodo ndị nwere namespace:

| Igodo                         | Uru                              | Nkọwa                                 |
| ----------------------------- | -------------------------------- | ------------------------------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Data usoro ụbọchị na-aga n’ihu ugbu a |

### Usoro Ọrụ

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Gụọ ndekọ usoro ụbọchị na-aga n’ihu site na `key_value`.
2. Nyochaa `{current}`, `{longest}`, `{lastDate}` (eriri ụbọchị ISO).
3. Ọ bụrụ na `lastDate === today` — enweghị mgbanwe (agụọlarị ya taa).
4. Ọ bụrụ na `lastDate === yesterday` — bulie `current`; melite `longest` ma ọ bụrụ na ọ dị mkpa.
5. Ọ bụrụ na `lastDate < yesterday` — tọgharịa `current = 1` (usoro ahụ akwụsịla).
6. Dee ndekọ emelitere.
7. Lelee ihe mgbaru ọsọ ndị a: ụbọchị 7, 14, 30, 60, 90, 180, 365. Ọ bụrụ na a gafere otu,
   tọọ `milestone = true` (onye kpọrọ ya na-enye XP ma na-enyocha baajị).

### Ọnọdụ Pụrụ Iche

- **Mpaghara oge**: usoro ndị a na-eji ụbọchị UTC (`new Date().toISOString().slice(0, 10)`).
  Nke a bụ ụma — otu mpaghara oge ọkọlọtọ na-egbochi iji
  ịgbanwe mpaghara oge ghọgbuo usoro ahụ.
- **Ndị ọrụ ọhụrụ**: ndekọ usoro ụbọchị adịghị; arịrịọ mbụ na-emepụta ya nwere
  `current=1, longest=1, lastDate=today`.
- **Ọtụtụ arịrịọ kwa ụbọchị**: naanị arịrịọ mbụ n’ụbọchị UTC
  na-ebuli usoro ahụ.

---

## Tebụl Ndị Ndu

**Faịlụ:** `src/lib/gamification/leaderboard.ts`

### Oke

| Oke             | Oge     | Nkọwa                                             |
| --------------- | ------- | ------------------------------------------------- |
| `global`        | `all`   | Ngụkọta XP nke oge niile                          |
| `weekly`        | `week`  | XP enwetara n’izu UTC ugbu a (Mọnde-Ratọde)       |
| `monthly`       | `month` | XP enwetara n’ọnwa UTC ugbu a                     |
| `tokens_shared` | `all`   | Ngụkọta token e zigara ndị ọzọ                    |
| `contributions` | `all`   | Combo e mepụtara + provider e jiri + skill e jiri |

### Mgbakọ Ọkwa

A na-**agbakọ ọkwa mgbe a na-agụ data**, anaghị echekwa ha. Nke a na-egbochi data ọkwa
ịka nká ma wepụ mkpa ọrụ ndị na-agbakọgharị ọkwa n’oge ụfọdụ.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

Ụkpụrụ ajụjụ:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### Ntughari Oge

Tebụl ndị ndu kwa izu na kwa ọnwa na-atụgharị onwe ha:

1. **Debe n’ebe nchekwa**: mgbe oge ruru njedebe, detuo ntinye ndị dị ugbu a na
   `leaderboard_archive` tinyere akara oge ahụ.
2. **Tọgharịa**: hichapụ ntinye ndị nke oge gwụrụ.
3. **Ihe na-akpalite ya**: a na-enyocha ya na oku `updateLeaderboard()` ọ bụla; arịrịọ mbụ
   nke oge ọhụrụ na-akpalite ntụgharị ahụ.

Nke a na-eme ka tebụl kwa izu tọgharịa na Mọnde ọ bụla n’elekere 00:00 UTC, ebe tebụl
kwa ọnwa na-atọgharịa n’ụbọchị mbụ nke ọnwa ọ bụla.

### Mmelite SSE Ozugbo

**Endpoint:** `GET /api/gamification/stream`

```
Klient → GET /api/gamification/stream
  → E guzobere njikọ SSE
  → Sava na-ezipụ snapshot nke ndị ndu 10 kachasị ozugbo
  → Kwa sekọnd 5: zipụ ndị ndu 10 kachasị emelitere ma ọ bụrụ na ha gbanwere
  → Kwa sekọnd 15: nkwupụta heartbeat (": heartbeat\n\n")
  → Klient kwụsịrị njikọ → nhicha (wepụ listener)
```

Ụdị event:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

Onye njikwa SSE na-edekọ klient ndị ejikọrọ n’okpuru oke nke ọ bụla ma na-ezipụ naanị mmelite
mgbe data tebụl ndị ndu gbanwere n’ezie kemgbe ezipụrụ ya ikpeazụ.

---

## Ịkekọrịta Token

**Faịlụ:** `src/lib/gamification/sharing.ts`

### Akwụkwọ Ndekọ Ntinye Abụọ

Nyefe ọ bụla na-emepụta ahịrị abụọ na `token_ledger`:

| Ahịrị  | `from_key_id` | `to_key_id`   | `amount` |
| ------ | ------------- | ------------- | -------- |
| Debit  | onye na-eziga | onye na-anata | +amount  |
| Credit | onye na-anata | onye na-eziga | -amount  |

Chere — usoro a na-eji bụ:

| Ahịrị | `from_key_id` | `to_key_id`   | `amount` | Ihe ọ pụtara                     |
| ----- | ------------- | ------------- | -------- | -------------------------------- |
| Zipụ  | onye na-eziga | onye na-anata | +amount  | Ọpụpụ sitere n'aka onye na-eziga |
| Nnata | onye na-anata | onye na-eziga | +amount  | Mbata nye onye na-anata          |

A na-agbakọ ego fọdụrụ dị ka:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Usoro Nyefe

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Nyochaa**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **Idempotency**: lelee ma `idempotency_key` adịlarị n'akwụkwọ ndekọ ahụ.
   Ọ bụrụ ee, weghachite nsonaazụ echekwara.
3. **Azụmahịa** (otu azụmahịa SQLite):
   a. Gbakọọ ego fọdụrụ nke onye na-eziga.
   b. Ọ bụrụ na `balance < amount`, kwụsị ya (ego ezughị).
   c. Tinye ahịrị izipu (`from=sender,`.

### Mmachi Ọsọ

- Nyefe kachasị bụ 10 kwa nkeji maka API key ọ bụla.
- Token kachasị bụ 10,000 maka otu nyefe.
- Token kachasị a ga-enyefe kwa ụbọchị bụ 100,000 maka API key ọ bụla.

---

## Token Ịkpọ Òkù & Ịgbapụta

**Faịlụ:** `src/lib/gamification/invites.ts`

### Ọdịdị Koodu

- **Koodu**: mkpụrụedemede na ọnụọgụ 8 (dịka ọmụmaatụ, `A3K9-X7M2`), nke mmadụ nwere ike ịgụ,
  nke a na-egosi onye ọrụ.
- **Token**: token enweghị usoro nke nwere byte 32, echekwara dị ka hash SHA-256. A na-eji ya maka
  mgbapụta site na mmemme (dịka ọmụmaatụ, njikọ URL).

### Nchekwa

| Kọlụm        | Uru                                     |
| ------------ | --------------------------------------- |
| `code`       | `A3K9X7M2` (pụrụ iche, e tinyere index) |
| `token_hash` | SHA-256(raw_token)                      |

A na-eweghachiri onye ọrụ raw token naanị otu ugboro kpọmkwem n'oge e kere ya. OmniRoute
anaghị echekwa ma ọ bụ gosi ya ọzọ — ọ bụ naanị hash ka na-adịgide.

### Mgbochi Ịkpọ Onwe Onye Òkù

Mgbe onye ọrụ gbapụtara koodu, sistemụ ahụ na-enyocha:

1. Koodu ahụ bụ nke `api_key_id` ọzọ.
2. Onye ọrụ na-agbapụta ya agbapụtabeghị koodu ọ bụla sitere n'aka otu
   onye kpọrọ ya òkù (na-ejikọta na `invite_tokens` + ndekọ mgbapụta).

Ọ bụrụ na otu n'ime nyocha ndị a ada, a ga-ajụ mgbapụta ahụ ma nye ozi njehie doro anya.

### Oge Mmebi & Mmachi

- `max_uses` ndabara: 10 (enwere ike ịhazi ya n'oge okike).
- `expires_at` ndabara: ụbọchị 30 site n'oge okike.
- Koodu ndị kubiri ume ma ọ bụ ndị ejirila ruo oke na-eweghachi HTTP 410 Gone.

---

## Njikọ Sava Ndị Obodo

**Faịlụ:** `src/lib/gamification/servers.ts`

### Jikọọ

A na-edebanye sava obodo site na token ịkpọ òkù nke sava dị anya nyere.
Ihe atụ dị n’ógbè a:

1. Na-anata token ịkpọ òkù ahụ (dịka ọmụmaatụ, nke e tinyere na dashboard).
2. Na-akpọ `POST /api/gamification/federation/leaderboard` na sava dị anya
   iji nyochaa token ahụ ma nweta leaderboard dị ugbu a.
3. Na-echekwa ndekọ sava ahụ na `status: connected`.

### Usoro Mmekọrịta

Njikọ sava na-eji **mmekọrịta nke idechi data dịbu**, ọ bụghị ịgbakwụnye:

```
Ihe Atụ Dị n’Ógbè              Sava Obodo
     │                              │
     ├── zipu akara ───────────────►│  POST /federation/score
     │   { api_key_id, score }      │  (sava na-enyocha hash token)
     │                              │
     ├── nweta leaderboard ────────►│  GET /federation/leaderboard
     │◄── ndenye top-N ─────────────┤  (na-edechi cache dị n’ógbè)
     │                              │
     └── nyocha ahụike ────────────►│  GET /federation/health
         (sekọnd 60 ọ bụla, timeout sekọnd 5) │
```

### Nkwenye Njirimara

Arịrịọ njikọ sava na-agụnye:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

Sava dị anya na-eme hash token ahụ ma chọọ ahịrị `community_servers`
dabara na ya. Nke a na-egbochi izipu hash echekwara.

### Nlekota Ahụike

Ndekọ sava ọ bụla na-edekọ:

| Ubi         | Nkọwa                                            |
| ----------- | ------------------------------------------------ |
| `status`    | `connected`, `degraded`, `unreachable`           |
| `last_sync` | Timestamp ISO nke mmekọrịta ikpeazụ gara nke ọma |
| `failures`  | Ọdịda nyocha ahụike ndị sochiri ibe ha           |

Mgbe ọdịda ise sochiri ibe ha gasịrị, status na-agbanwe gaa na `unreachable`,
a na-akwụsịkwa mmekọrịta ruo mgbe nyocha ahụike e ji aka mee gara nke ọma.

---

## Mgbochi Aghụghọ

**Faịlụ:** `src/lib/gamification/antiCheat.ts`

### Ịgbakọ Akara n’Akụkụ Sava

Ngụkọta XP niile na-eme na `src/lib/gamification/xp.ts`. Ndị ahịa anaghị
eziga akara — ha na-eziga omume, sava ahụ wee gbakọọ XP. Naanị koodu
dị n’akụkụ sava nwere ike ide na kọlụm `leaderboard.score`.

### Ịmachi Ọnụọgụ Arịrịọ

| Oke                      | Uru     | Mpaghara      |
| ------------------------ | ------- | ------------- |
| XP kachasị kwa nkeji     | 1,000   | Kwa igodo API |
| Nfefe kachasị kwa nkeji  | 10      | Kwa igodo API |
| Ọnụ ego nfefe kachasị    | 10,000  | Kwa nfefe     |
| Nfefe kachasị kwa ụbọchị | 100,000 | Kwa igodo API |

Oke arịrịọ na-eji windo na-amịgharị nke dị na ebe nchekwa (otu usoro ahụ
`RateLimitManager` na-eji na `open-sse/services/`). Ọ na-eji counters
nke SQLite na-akwado ma ọ bụrụ na process ahụ amalitegharịa.

### Nchọpụta Ihe Na-adịghị Adịkarị site na Z-Score

Maka igodo API ọ bụla, sistemụ ahụ na-edobe windo ụbọchị 7 na-amịgharị nke XP
a nwetara kwa elekere. Mgbe ọ bụla e nyere XP:

1. Gbakọọ ọsọ XP onye ọrụ ahụ nwetara n’elekere dị ugbu a.
2. Gbakọọ mean na standard deviation nke ndị niile.
3. Gbakọọ `z = (user_rate - mean) / stddev`.
4. Ọ bụrụ na `z > 3.0` (standard deviations 3), kaa ya dịka ihe na-adịghị adịkarị.

A na-edekọ ihe ndị na-adịghị adịkarị na `xp_audit_log` site na
`action = 'anomaly_detected'`, ma gosipụta ha na dashboard admin.

### Ndekọ Nyocha

A na-edekọ inye XP ọ bụla, nfefe, inweta baajị, na nchọpụta ihe na-adịghị
adịkarị na `xp_audit_log` yana:

| Ubi          | Nkọwa                                            |
| ------------ | ------------------------------------------------ |
| `api_key_id` | Onye                                             |
| `action`     | Ihe mere (xp_award, transfer, anomaly, …)        |
| `xp_awarded` | Ọnụọgụ (0 maka ihe omume ndị na-abụghị XP)       |
| `metadata`   | JSON nwere nkọwa ọnọdụ (ụdị omume, ebumnuche, …) |
| `created_at` | Oge (ISO 8601)                                   |

Ndị admin nwere ike ịjụ ndekọ nyocha zuru ezu site na
`GET /api/gamification/anomalies`.

---

## Ụzọ API

Ụzọ niile na-agbaso ụkpụrụ OmniRoute ọkọlọtọ:

```
Ụzọ → Nnyocha mbido CORS → Nnyocha ahụ arịrịọ (Zod) → Nyocha ikike (extractApiKey)
  → Onye njikwa
```

### Ebe njedebe

| Usoro  | Ụzọ                                        | Nkọwa                                            | Nyocha ikike |
| ------ | ------------------------------------------ | ------------------------------------------------ | ------------ |
| GET    | `/api/gamification/leaderboard`            | Nweta bọọdụ ndị ndu (oke, oge, nkewa peeji)      | Nhọrọ        |
| POST   | `/api/gamification/leaderboard`            | Manye ka e mee ka cache bọọdụ ndị ndu dị ọhụrụ   | Achọrọ       |
| GET    | `/api/gamification/stream`                 | Mmelite bọọdụ ndị ndu ozugbo site na SSE         | Nhọrọ        |
| GET    | `/api/gamification/transfer`               | Nweta akụkọ mbufe (nkewa peeji)                  | Achọrọ       |
| POST   | `/api/gamification/transfer`               | Zigara onye ọrụ ọzọ token                        | Achọrọ       |
| GET    | `/api/gamification/invite`                 | Depụta koodu ọkpụkpọ m                           | Achọrọ       |
| POST   | `/api/gamification/invite`                 | Mepụta koodu ọkpụkpọ ọhụrụ                       | Achọrọ       |
| DELETE | `/api/gamification/invite`                 | Kagbuo koodu ọkpụkpọ                             | Achọrọ       |
| POST   | `/api/gamification/invite/redeem`          | Jiri koodu ọkpụkpọ nweta uru                     | Achọrọ       |
| GET    | `/api/gamification/servers`                | Depụta sava ndị obodo                            | Achọrọ       |
| POST   | `/api/gamification/servers`                | Jikọọ na sava obodo                              | Achọrọ       |
| DELETE | `/api/gamification/servers`                | Kwụsị njikọ na sava obodo                        | Achọrọ       |
| POST   | `/api/gamification/federation/score`       | Ziga akara na sava dị anya                       | Njikọ sava   |
| GET    | `/api/gamification/federation/leaderboard` | Nweta bọọdụ ndị ndu site na sava dị anya         | Njikọ sava   |
| GET    | `/api/gamification/notifications`          | Ọkwa SSE maka baajị/mmụba ọkwa                   | Achọrọ       |
| GET    | `/api/gamification/anomalies`              | Lelee akụkọ ihe na-adịghị ahụkebe (onye nchịkwa) | Onye nchịkwa |
| POST   | `/api/gamification/rotate`                 | Gbanwee ihe nzuzo token ọkpụkpọ                  | Achọrọ       |

### Ọmụmaatụ Arịrịọ/Nzaghachi

**POST /api/gamification/transfer**

```json
// Arịrịọ
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// Nzaghachi 200
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

// Nzaghachi 400 (ego ezughị)
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

## Ngwaọrụ MCP (8)

Edebanyere ha na `open-sse/mcp-server/` n'akụkụ ngwaọrụ ndị dịbu. A kpachibidoro ha n'okpuru
ikike `gamification`.

| Ngwaọrụ                    | Nkọwa                                               | Atụmatụ Ntinye               |           |
| -------------------------- | --------------------------------------------------- | ---------------------------- | --------- |
| `gamification_leaderboard` | Nweta tebụl ndị ndu maka oke/oge                    | `{ scope, period?, limit? }` |
| `gamification_rank`        | Nweta ọkwa onye kpọrọ ya na ndị gbara ya gburugburu | `{ scope }`                  |
| `gamification_profile`     | Nweta nchịkọta XP, ọkwa, aha, na usoro ụbọchị       | `{}`                         |
| `gamification_badges`      | Depụta baajị ndị enwetara ma ọ bụ nkọwa niile       | `{ earned?: boolean }`       |
| `gamification_transfer`    | Zigara onye ọrụ ọzọ token                           | `{ to, amount }`             |
| `gamification_invite`      | Mepụta ma ọ bụ depụta koodu ịkpọ òkù                | `{ action: "create"          | "list" }` |
| `gamification_servers`     | Depụta ma ọ bụ jikọọ sava obodo                     | `{ action, token? }`         |
| `gamification_anomalies`   | Lelee akụkọ ihe ndị na-adịghị ahụkebe (ikike admin) | `{ limit?, since? }`         |

---

## Peeji Dashboard

### `/dashboard/leaderboard`

- Ngosipụta podium (ndị atọ kachasị elu, tinyere avatar na XP ha).
- Nhọrọ oke: Zuru ụwa ọnụ / Kwa izu / Kwa ọnwa / Token ndị e kekọrịtara / Onyinye.
- Tebụl e kewara n'ime peeji (25 n'otu peeji) nke nwere ọkwa, aha, akara, level, na title.
- Mmelite ozugbo site na SSE — mgbanwe ọkwa na-emegharị n'anya.
- A na-eme ka onye ọrụ ugbu a pụta ìhè na tebụl, tinyere ahịrị "Ọkwa Gị" nke na-anọgide n'ọnọdụ ya.

### `/dashboard/profile`

- Ogwe ọganihu XP nwere level dị ugbu a na oke achọrọ maka level na-esote.
- A na-egosipụta baajị title nke ọma.
- Ebe ngosi baajị — baajị ndị enwetara nwere ụbọchị e nwetara ha, ebe a na-eme ka ndị a na-enwetabeghị bụrụ ntụ ntụ
  (baajị ezoro ezo na-egosi "???" ruo mgbe e nwetara ha).
- Ihe ngosi usoro ụbọchị nwere akara ọkụ; kalenda usoro ụbọchị (ụbọchị 30 gara aga).
- Chaatị akụkọ XP (XP kwa ụbọchị n'ime ụbọchị 30 gara aga).

### `/dashboard/tokens`

- Ego token fọdụrụ (pụtara ìhè n'elu peeji).
- Fọm mbufe: onye nnata, ego ole, mkparịta ụka nkwenye.
- Tebụl akụkọ mbufe nwere ihe nzacha (ezitere/anatara/niile).
- Ngalaba ịkpọ òkù: koodu ndị na-arụ ọrụ, mepụta nke ọhụrụ, kesaa njikọ.
- Sava obodo: ndepụta nwere ọnọdụ ahụike, jikọọ/kwụsị njikọ.

### `/dashboard/gamification/admin`

- Ndepụta ihe ndị na-adịghị ahụkebe nwere ogo ịdị njọ, onye ọrụ, akara oge, na z-score.
- Ihe nlele ndekọ audit nwere ihe nzacha (ụdị omume, onye ọrụ, oke ụbọchị).
- Ọnụ ọgụgụ sistemụ: XP niile e nyere, ndị ọrụ na-arụ ọrụ, ọnụego inweta baajị.
- Nchịkọta ọnọdụ ahụike sava federation.

---

## Njikọ Pipeline

### Ebe Njikọ

Gamification na-ejikọta na pipeline arịrịọ n'otu ebe n'ime
`open-sse/handlers/chatCore.ts`:

```typescript
// Mgbe e zigachara nzaghachi nye client:
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
    // Ziga-ma-chefu: dekọọ ya mana ekwela ka ọ ruo client
  });
});
```

### Ụdị Event

| Ụdị Event           | Mgbe A Na-ewepụta Ya                         |
| ------------------- | -------------------------------------------- |
| `request.completed` | E zigara nzaghachi LLM gara nke ọma          |
| `provider.switch`   | Provider gbanwere (fallback combo na-agụnye) |
| `combo.created`     | Echekwara nhazi combo ọhụrụ                  |
| `combo.used`        | E rutere ebe combo lekwasịrị anya nke ọma    |
| `badge.earned`      | Nyocha baajị chọtara ihe dakọtara            |
| `streak.milestone`  | A gafere oke usoro ụbọchị                    |
| `transfer.sent`     | E mechara mbufe token                        |
| `referral.redeemed` | E jiri koodu ịkpọ òkù mee ihe nke ọma        |
| `compression.used`  | E tinyere mkpakọ prompt                      |
| `skill.executed`    | E mechara mmezu skill                        |
| `model.first_use`   | Ejighị model ahụ n'ime ụbọchị 7 gara aga     |

### Nkwenye Na Ọ Gaghị Egbochi Ọrụ

Usoro `setImmediate` + `.catch(() => {})` na-eme ka o doo anya na:

1. A na-eziga nzaghachi ahụ kpamkpam tupu gamification amalite.
2. Njehie gamification anaghị apụta nye client.
3. Nhazi event na-arụ ọrụ na microtask na-esote, ọ bụghị ozugbo n'ime usoro ahụ.

---

## Nchekwa

### Ụdị Ihe Iyi Egwu

| Ihe iyi egwu                      | Usoro mgbochi                                                                |
| --------------------------------- | ---------------------------------------------------------------------------- |
| Ịkwalite akara n'ụzọ aghụghọ      | Ọ bụ naanị sava na-agbakọ XP; ndị ahịa na-eziga omume, ọ bụghị akara         |
| Mwakpo imegharị arịrịọ            | Igodo idempotency na nnyefe; iwepụ ndekọ ugboro abụọ n'ime audit log         |
| Aghụghọ nnyefe                    | Ledger ntinye abụọ; azụmahịa atomic; oke ọnụego                              |
| Ịkpọ onwe onye òkù                | Nyochaa `api_key_id` n'etiti ibe ha mgbe a na-eji ya                         |
| Ịgbanwe leaderboard n'ụzọ aghụghọ | Nchọpụta ihe na-adịghị ahụkebe site na Z-score; dashboard admin maka anomaly |
| Izu token federation              | Nchekwa hash SHA-256; a na-egosi raw token naanị otu ugboro                  |
| Ịnwale koodu ọkpụkpọ n'ike        | Mmachi ọnụego na endpoint iji koodu; entropy mkpụrụedemede 8                 |
| XSS n'aha ngosi                   | A na-asachapụ aha ngosi; a na-eme escape nye ntinye leaderboard              |
| Mwakpo timing na hash             | `crypto.timingSafeEqual` maka ntụnyere hash token                            |

### Ihe Nchọpụta Njirimara Chọrọ

- **Ọha** (auth adịghị mkpa): `GET /leaderboard`, `GET /stream` (leaderboard
  ndị a na-agụ naanị).
- **Achọrọ API key**: ọrụ ide niile, profaịlụ, nnyefe, na ọkpụkpọ.
- **Naanị admin**: dashboard anomaly, ihe nlele audit log.
- **Federation**: ụzọ auth dị iche nke na-eji raw token n'ime header
  `Authorization`, ma na-enyocha ya megide hash SHA-256 echekwara.

---

## Nnwale

### Faịlụ Nnwale

Nnwale niile na-eji ngwa nnwale izizi nke Node.js (`node --import tsx/esm --test`).

| Faịlụ Nnwale                                  | Ihe Ọ Na-ekpuchi                             | Nnwale |
| --------------------------------------------- | -------------------------------------------- | ------ |
| `tests/unit/gamification/xp.test.ts`          | Mgbakọ XP, usoro ọkwa, aha                   | 8      |
| `tests/unit/gamification/badges.test.ts`      | Ndakọrịta ụkpụrụ baajị, inye baajị           | 10     |
| `tests/unit/gamification/streaks.test.ts`     | Lọjik streak, milestone, ọnọdụ ndị pụrụ iche | 7      |
| `tests/unit/gamification/leaderboard.test.ts` | Mgbakọ rank, pagination, rotation            | 8      |
| `tests/unit/gamification/sharing.test.ts`     | Nnyefe, balance, idempotency                 | 9      |
| `tests/unit/gamification/invites.test.ts`     | Mepụta, jiri, ngafe oge, ịkpọ onwe onye òkù  | 7      |
| `tests/unit/gamification/antiCheat.test.ts`   | Oke ọnụego, z-score, ndekọ audit             | 6      |
| `tests/unit/gamification/events.test.ts`      | Mwepụta event, fan-out, njikwa mperi         | 5      |

### Ịgba Nnwale

```bash
# Nnwale gamification niile
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# Otu faịlụ nnwale
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Ihe Coverage Chọrọ

Dịka `CONTRIBUTING.md` si kwuo — modul ọhụrụ niile ga-enwerịrị:

- Branch coverage >= 80%.
- A ga-anwale function ọhaneze ọ bụla opekata mpe otu ugboro.
- A ga-anwale ụzọ mperi (balance ezughị ezu, koodu kubiela, oke ọnụego).

---

## Nhazi Faịlụ

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # Tebụl 8 niile + ndeksi
      gamification.ts                  # Modul CRUD nke ngalaba
    gamification/
      xp.ts                           # Mgbakọ XP, usoro ọkwa, utu aha
      badges.ts                       # Nkọwa baajị, ụkpụrụ, nnyocha
      streaks.ts                      # Nsochi usoro ụbọchị ndị na-aga n'ihu
      leaderboard.ts                  # Mgbakọ ọkwa, SSE, ntụgharị
      antiCheat.ts                    # Mmachi ọsọ, z-score, nyocha ndekọ
      sharing.ts                      # Akwụkwọ ndekọ mbufe token
      invites.ts                      # Koodu ịkpọ òkù/ịgbapụta
      servers.ts                      # Njikọ sava obodo
      events.ts                       # Onye na-ezipụ mmemme (ebe njikọta)
      notifications.ts                # Iyi ọkwa SSE
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST bọọdụ ndị isi
        leaderboard/stream/route.ts   # Mmelite ozugbo nke SSE
        transfer/route.ts             # GET/POST mbufe
        invite/route.ts               # GET/POST/DELETE koodu ịkpọ òkù
        invite/redeem/route.ts        # POST gbapụta koodu
        servers/route.ts              # GET/POST/DELETE sava
        federation/score/route.ts     # POST zipụ akara
        federation/leaderboard/route.ts # GET nweta bọọdụ ndị isi
        notifications/route.ts        # Ọkwa SSE
        anomalies/route.ts            # GET akụkọ ihe ndị na-adịghị ahụkebe
        rotate/route.ts               # POST tụgharịa ihe nzuzo
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Peeji ọkwa
        profile/page.tsx               # Peeji XP/baajị/usoro na-aga n'ihu
        tokens/page.tsx                # Peeji ego fọdụrụ/mbufe/ịkpọ òkù
        gamification/admin/page.tsx    # Nlekota ihe ndị na-adịghị ahụkebe nke onye nchịkwa
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
    GAMIFICATION.md                    # Akwụkwọ a
```

---

## Atụmatụ Mbugharị

### Agba 1: Isi Backend (PR 1)

- Mbugharị `060_create_gamification.sql` (tebụl 8).
- `src/lib/db/gamification.ts` (modul ngalaba).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- Ebe njikọta dị na `chatCore.ts`.
- Nnwale nkeji maka XP, usoro na-aga n'ihu, na mmemme.

### Agba 2: Baajị & Bọọdụ Ndị Isi (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Nkọwa baajị dị na constants.
- Ụzọ API nke bọọdụ ndị isi + iyi SSE.
- Nnwale nkeji maka baajị na bọọdụ ndị isi.

### Agba 3: Ịkekọrịta & Ịkpọ Òkù (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- Ụzọ API maka mbufe + ịkpọ òkù.
- Nnwale nkeji maka ịkekọrịta, ịkpọ òkù, na mgbochi aghụghọ.

### Agba 4: Njikọ Sava & Dashboard (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- Ụzọ API nke njikọ sava.
- Peeji dashboard (bọọdụ ndị isi, profaịlụ, token, onye nchịkwa).
- Ndebanye aha ngwaọrụ MCP.

---

## Ihe Ndị A Ga-atụle N’Ọdịnihu

- **Mmemme oge pụrụ iche**: nchịkọta baajị ndị a na-enweta naanị n’ime oge a kara aka na oge asọmpi bọọdụ ndị-ndú.
- **Bọọdụ ndị-ndú otu**: chịkọta ndị ọrụ dịka nzukọ ma ọ bụ ngwakọta ha si dị.
- **Ihe na-amụba XP**: bulie XP n’oge mgbasa ozi nkwado.
- **Ịkekọrịta mmezu**: mepụta kaadị baajị ndị a pụrụ ịkekọrịta (onyonyo OpenGraph).
- **Ọkwa mkpanaka**: ọkwa ndị dabere na webhook maka mmemme baajị/ọkwa.
- **API bọọdụ ndị-ndú**: API ọha maka njikọ ya na sistemụ ndị ọzọ.
