# Gamification & Leaderboard System (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **Pinagmumulan ng katotohanan:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Huling na-update:** 2026-06-28 — v3.8.40

Kabilang sa OmniRoute ang isang lokal-munang gamification layer na nagbibigay ng mga gantimpala sa mga user para sa
pakikipag-ugnayan sa platform — paggawa ng mga request, pagpapalit ng mga provider, paggawa ng
mga combo, pagbabahagi ng mga token, at pag-aambag sa komunidad. Nasa
SQLite ang lahat ng state; opsyonal at nakabatay sa push ang federation sa mga community server.

Idinisenyo ang system upang magkaroon ng **zero-latency sa hot path** — ipinapadala ang mga gamification
event mula sa request pipeline nang fire-and-forget at hindi kailanman hinaharangan
ang isang LLM response.

---

## Pangkalahatang-ideya

### Layunin

Palakihin ang pakikipag-ugnayan at pagpapanatili ng mga user sa pamamagitan ng pagbibigay ng nakikitang progreso (XP,
mga level, mga badge), social proof (mga leaderboard), at mga pang-ekonomiyang insentibo (pagbabahagi ng token,
mga gantimpala sa pag-imbita).

### Saklaw

| Feature                  | Paglalarawan                                                                               |
| ------------------------ | ------------------------------------------------------------------------------------------ |
| XP at Mga Level          | Kumita ng XP sa bawat pagkilos; umakyat ng level ayon sa isang polynomial curve            |
| Mga Badge                | 20+ achievement sa 5 kategorya na may 4 na antas ng rarity                                 |
| Mga Streak               | Pagsubaybay sa araw-araw na aktibong paggamit kasama ang kasalukuyan/pinakamahabang streak |
| Mga Leaderboard          | Mga saklaw na pandaigdigan, lingguhan, buwanan, pagbabahagi ng token, at kontribusyon      |
| Pagbabahagi ng Token     | Maglipat ng mga credit sa pagitan ng mga user sa pamamagitan ng double-entry ledger        |
| Pag-imbita at Pag-redeem | Mga referral code na may SHA-256 hashed storage                                            |
| Mga Community Server     | Makipag-federate sa mga external na instance ng OmniRoute                                  |
| Anti-Cheat               | Server-side na pagmamarka, rate limiting, at z-score anomaly detection                     |

### Mga Prinsipyo ng Disenyo

1. **Lokal-muna** — nasa SQLite ang lahat ng state, walang kinakailangang external service.
2. **Hindi nagba-block** — fire-and-forget ang mga event; ang LLM response path ay
   hindi kailanman naaantala ng gamification logic.
3. **Server ang awtoridad** — sa server side lamang kinakalkula ang XP; hindi maaaring
   artipisyal na pataasin ng mga client ang mga score.
4. **Gumagalang sa privacy** — opsyonal ang pagsali sa leaderboard; maaaring
   itago ng mga user ang kanilang profile.
5. **Handa para sa federation** — maaaring mag-push ng mga score ang mga community server sa pamamagitan ng signed API;
   overwrite ang pag-sync, hindi additive.

---

## Arkitektura

### Daloy sa Mataas na Antas

```
Request ng Client
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (kasalukuyang pipeline) ...
      → ipinadala sa client ang upstream response
      → setImmediate (fire-and-forget):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

Ang event emitter ang nag-iisang integration point. Tinatawag ng `chatCore.ts` ang
`emitGamificationEvent()` pagkatapos maipadala ang response; ipinapamahagi ng event module
ang mga ito sa mga subsystem ng XP, streak, badge, leaderboard, at anti-cheat.

### Graph ng mga Dependency ng Module

```
src/lib/gamification/
  events.ts          ← entry point (tinatawag mula sa chatCore.ts)
    ├── xp.ts        ← pagkalkula ng XP at pagtukoy ng level
    ├── streaks.ts   ← pagsubaybay sa araw-araw na aktibong streak
    ├── badges.ts    ← pagsusuri ng mga pamantayan ng badge
    ├── leaderboard.ts ← pagkalkula ng ranggo at SSE broadcasting
    ├── antiCheat.ts ← rate limiting at anomaly detection
    ├── sharing.ts   ← ledger ng paglilipat ng token
    ├── invites.ts   ← pamamahala ng invite/redeem code
    ├── servers.ts   ← federation ng community server
    └── notifications.ts ← stream ng SSE notification

src/lib/db/
  gamification.ts    ← lahat ng operasyon ng CRUD (8 table)

src/app/api/gamification/
  leaderboard/       ← GET ng mga ranggo, POST ng manu-manong pag-refresh
  leaderboard/stream ← SSE real-time na mga update
  transfer/          ← GET ng history, POST upang magpadala ng mga token
  invite/            ← GET/POST ng mga code, DELETE upang bawiin
  invite/redeem/     ← POST upang mag-redeem ng code
  servers/           ← GET/POST/DELETE ng mga community server
  federation/score/  ← POST upang mag-push ng score sa server
  federation/leaderboard/ ← GET upang kunin ang leaderboard mula sa server
  notifications/     ← mga SSE notification para sa badge/pag-akyat ng level
  anomalies/         ← GET ng mga anomaly report (admin)
  rotate/            ← POST upang i-rotate ang mga secret ng invite token
```

---

## Layer ng Data

### Mga Talahanayan ng Database

Nasa pangunahing OmniRoute SQLite database ang lahat ng talahanayan, na ginawa ng migration na
`060_create_gamification.sql`. Ang WAL journaling ay minana mula sa singleton na
`getDbInstance()` sa `src/lib/db/core.ts`.

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

### Module ng Domain: `src/lib/db/gamification.ts`

Sinusunod nito ang karaniwang pattern ng OmniRoute — ini-import ang `getDbInstance()` mula sa
`core.ts` at nag-e-export ng mga naka-type na CRUD function. Walang raw SQL sa mga route handler.

Mga pangunahing function:

| Function                   | Paglalarawan                                                       |
| -------------------------- | ------------------------------------------------------------------ |
| `upsertLeaderboardEntry()` | Maglagay o mag-update ng score para sa (api_key_id, scope, period) |
| `getLeaderboard()`         | Mga naka-page na ranggo para sa ibinigay na scope/period           |
| `getUserLevel()`           | Kunin o gawin ang record ng level ng user                          |
| `updateUserLevel()`        | Itakda nang atomiko ang XP, level, at title                        |
| `getBadgeDefinitions()`    | Lahat ng kahulugan ng badge (maaaring i-filter)                    |
| `getUserBadges()`          | Mga badge na nakuha ng isang user                                  |
| `awardBadge()`             | Ilagay ang pagkakakuha ng badge (idempotent sa badge_id)           |
| `logXpAction()`            | Idagdag sa xp_audit_log                                            |
| `getXpAuditLog()`          | Naka-page na audit history para sa isang user                      |
| `insertLedgerEntry()`      | Double-entry na paglilipat (sa loob ng transaction)                |
| `getBalance()`             | Kabuuan ng natanggap na binawasan ng ipinadala para sa isang user  |
| `getTransferHistory()`     | Naka-page na talaan ng paglilipat                                  |
| `createInviteToken()`      | Ilagay ang invite code at na-hash na token                         |
| `redeemInviteToken()`      | Hanapin ayon sa code, patunayan, at dagdagan ang uses              |
| `upsertCommunityServer()`  | Irehistro o i-update ang isang federation server                   |
| `getCommunityServers()`    | Ilista ang mga server para sa isang user                           |
| `deleteCommunityServer()`  | Alisin ang rehistrasyon ng server                                  |

---

## Sistema ng XP / Level

**File:** `src/lib/gamification/xp.ts`

### Kurba ng Level

Ang XP na kinakailangan upang maabot ang level `n` ay sumusunod sa isang polynomial na kurba:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Level | XP sa Susunod | Kabuuang XP | Titulo      |
| ----- | ------------- | ----------- | ----------- |
| 1     | 100           | 100         | Baguhan     |
| 5     | 1,118         | 2,415       | Baguhan     |
| 10    | 3,162         | 10,523      | Manlalakbay |
| 25    | 12,500        | 86,024      | Manlalakbay |
| 50    | 35,355        | 345,529     | Eksperto    |
| 75    | 64,952        | 948,683     | Dalubhasa   |
| 100   | 100,000       | 2,050,000   | Alamat      |

### Mga Titulo

| Saklaw ng Level | Titulo      |
| --------------- | ----------- |
| 1 – 9           | Baguhan     |
| 10 – 24         | Manlalakbay |
| 25 – 49         | Eksperto    |
| 50 – 74         | Dalubhasa   |
| 75 – 100        | Alamat      |

### Mga Gantimpalang XP

| Aksyon            | XP  | Paglalarawan                                                            |
| ----------------- | --- | ----------------------------------------------------------------------- |
| `request`         | 1   | Bawat API request na niruruta sa pamamagitan ng OmniRoute               |
| `provider_switch` | 5   | Paglipat sa ibang provider                                              |
| `model_switch`    | 3   | Paglipat sa ibang model                                                 |
| `combo_create`    | 10  | Paglikha ng bagong combo                                                |
| `combo_use`       | 2   | Paggamit ng combo para sa isang request                                 |
| `token_share`     | 1   | Bawat 1 000 token na ibinabahagi sa ibang user                          |
| `invite_redeem`   | 50  | Paggamit ng invite code                                                 |
| `daily_login`     | 5   | Aktibong paggamit araw-araw (isang beses bawat araw)                    |
| `streak_bonus`    | 2   | Bawat magkakasunod na araw ng streak (minumultiplika sa haba ng streak) |
| `badge_unlock`    | 10  | Pag-unlock ng badge                                                     |

### Daloy ng Pagbibigay

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. Hanapin ang `XP_REWARDS[action]` upang makuha ang halaga ng XP.
2. Idaan sa `checkRateLimit()` (panlaban sa pandaraya: maximum na 1000 XP/min bawat key).
3. Magbukas ng transaction:
   - Basahin ang kasalukuyang row ng `user_levels`.
   - Idagdag ang XP; kalkulahin muli ang level sa pamamagitan ng `levelFromXp(totalXp)`.
   - Kung nagbago ang level, itakda ang `levelUp = true`.
   - I-update ang row ng `user_levels`.
   - Mag-insert sa `xp_audit_log`.
4. Ibalik ang resulta. Ang caller ang nangangasiwa sa mga notification.

### Helper: `levelFromXp(totalXp)`

Ini-iterate ang level 1..100, na pinagsasama-sama ang `xp_for_level(n)` hanggang
lumampas ang kabuuang XP sa `totalXp`. Ibinabalik nito ang pinakamataas na level
na naabot ang threshold. Ito ay O(100) — katanggap-tanggap dahil limitado sa 100 ang mga level.

---

## Sistema ng Badge

**File:** `src/lib/gamification/badges.ts`

### Mga Kategorya

| Kategorya      | Paglalarawan                                | Mga Halimbawang Badge                           |
| -------------- | ------------------------------------------- | ----------------------------------------------- |
| `usage`        | Mga milestone batay sa dami                 | Unang Request, 1K Request, 100K                 |
| `sharing`      | Pagbabahagi ng token at mga referral        | Unang Pagbabahagi, Bukas-palad (10 pagbabahagi) |
| `contribution` | Pakikilahok sa komunidad                    | Tagalikha ng Combo, Tag探索 ng Provider         |
| `streak`       | Pagiging konsistent sa paglipas ng panahon  | Mandirigma ng Linggo, Buwanang Deboto           |
| `rare`         | Mahirap makuha o mga nakatagong achievement | Maagang Gumamit, Tagapag-ulat ng Bug            |

### Mga Rarity

| Rarity      | Kulay | Pahiwatig sa Probabilidad |
| ----------- | ----- | ------------------------- |
| `common`    | Gray  | Karamihan sa mga user     |
| `uncommon`  | Berde | Mga aktibong user         |
| `rare`      | Asul  | Mga dedikadong user       |
| `legendary` | Ginto | Nangungunang 1%           |

### Mga Uri ng Criteria

| Uri            | Field        | Paglalarawan                                                 |
| -------------- | ------------ | ------------------------------------------------------------ |
| `action_count` | `count`      | Isagawa ang aksyon nang N beses (hal., 1000 request)         |
| `streak`       | `days`       | Panatilihin ang streak sa loob ng N magkakasunod na araw     |
| `unique_count` | `field`, `n` | Gumamit ng N natatanging value (hal., 10 magkakaibang model) |
| `rank`         | `scope`, `n` | Abutin ang rank N sa isang scope ng leaderboard              |
| `first`        | —            | Maging unang magsagawa ng isang aksyon                       |
| `hidden`       | (nag-iiba)   | Hindi ipinapakita ang criteria hanggang makamit              |

Ang mga depinisyon ng badge ay iniimbak sa `badge_definitions` bilang JSON `criteria`:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Daloy ng Pagsusuri

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # lahat ng depinisyon
    → getUserBadges(apiKeyId)         # nakuha na (laktawan)
    → para sa bawat badge na hindi pa nakukuha:
       → matchesCriteria(badge, event, userState)
       → kung tugma: awardBadge(apiKeyId, badgeId)
         → ibalik ang notification payload
```

Ang pagsusuri ay **event-driven** — tumatakbo ito pagkatapos ng bawat gamification event, ngunit
sinusuri lamang ang mga badge na ang `criteria.type` ay naaayon sa aksyon ng event. Pinananatili
nitong mabilis ang pagsusuri (< 5ms para sa karamihan ng mga event).

### `matchesCriteria(badge, event, userState)`

| Uri ng Criteria | Pagsusuri                                                         |
| --------------- | ----------------------------------------------------------------- |
| `action_count`  | `getActionCount(apiKeyId, action) >= count`                       |
| `streak`        | `getCurrentStreak(apiKeyId) >= days`                              |
| `unique_count`  | `getUniqueCount(apiKeyId, field) >= n`                            |
| `rank`          | `getRank(apiKeyId, scope) <= n`                                   |
| `first`         | Walang naunang entry sa `xp_audit_log` para sa uri ng aksyong ito |
| `hidden`        | Ipinapasa sa naaangkop na sub-check                               |

### Mga Built-in na Badge (20+)

<details>
<summary>Kumpletong listahan ng badge</summary>

| Badge                      | Kategorya    | Bihira       | Pamantayan                            |
| -------------------------- | ------------ | ------------ | ------------------------------------- |
| Mga Unang Hakbang          | paggamit     | karaniwan    | 1 kahilingan                          |
| Nagsisimula Nang Uminit    | paggamit     | karaniwan    | 100 kahilingan                        |
| Dalubhasang Gumagamit      | paggamit     | di-karaniwan | 1,000 kahilingan                      |
| Senturyon                  | paggamit     | bihira       | 10,000 kahilingan                     |
| OmniPower                  | paggamit     | maalamat     | 100,000 kahilingan                    |
| Palipat-lipat ng Provider  | kontribusyon | karaniwan    | Gumamit ng 5 magkakaibang provider    |
| Dalubhasa sa Provider      | kontribusyon | di-karaniwan | Gumamit ng 20 magkakaibang provider   |
| Arkitekto ng Combo         | kontribusyon | di-karaniwan | Gumawa ng 5 combo                     |
| Punong Maestro ng Combo    | kontribusyon | bihira       | Gumawa ng 25 combo                    |
| Unang Pagbabahagi          | pagbabahagi  | karaniwan    | 1 paglilipat ng token                 |
| Mapagbigay                 | pagbabahagi  | di-karaniwan | 10 paglilipat ng token                |
| Pilantropo                 | pagbabahagi  | bihira       | Maglipat ng kabuuang 10,000 token     |
| Tagapag-refer              | pagbabahagi  | karaniwan    | 1 matagumpay na referral              |
| Tagabuo ng Network         | pagbabahagi  | di-karaniwan | 10 matagumpay na referral             |
| Mandirigma ng Linggo       | sunod-sunod  | di-karaniwan | 7-araw na sunod-sunod                 |
| Buwanang Deboto            | sunod-sunod  | bihira       | 30-araw na sunod-sunod                |
| Hindi Mapipigilan          | sunod-sunod  | maalamat     | 365-araw na sunod-sunod               |
| Maagang Gumamit            | bihira       | maalamat     | Sumali sa panahon ng beta             |
| Tagapanguna sa Compression | bihira       | di-karaniwan | Gumamit ng compression nang 100 beses |
| Kolektor ng Skill          | bihira       | bihira       | Gumamit ng 10 magkakaibang skill      |
| Eksplorador ng Model       | kontribusyon | di-karaniwan | Gumamit ng 15 magkakaibang model      |

</details>

---

## Tagasubaybay ng Sunod-sunod na Araw

**File:** `src/lib/gamification/streaks.ts`

### Modelo ng Data

Ang mga sunod-sunod na araw ay iniimbak sa talahanayang `key_value` (nakabahaging utility table) sa ilalim ng mga key na may namespace:

| Key                           | Value                            | Paglalarawan                         |
| ----------------------------- | -------------------------------- | ------------------------------------ |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Data ng aktibong sunod-sunod na araw |

### Lohika

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Basahin ang rekord ng sunod-sunod na araw mula sa `key_value`.
2. I-parse ang `{current}`, `{longest}`, `{lastDate}` (ISO date string).
3. Kung `lastDate === today` — walang pagbabago (nabilang na ngayong araw).
4. Kung `lastDate === yesterday` — dagdagan ang `current`; i-update ang `longest` kung kinakailangan.
5. Kung `lastDate < yesterday` — i-reset ang `current = 1` (naputol ang sunod-sunod na araw).
6. Isulat ang na-update na rekord.
7. Suriin ang mga milestone: 7, 14, 30, 60, 90, 180, 365 araw. Kung nalampasan, itakda ang
   `milestone = true` (ang tumatawag ang magbibigay ng XP at susuri sa mga badge).

### Mga Natatanging Kaso

- **Timezone**: gumagamit ang mga sunod-sunod na araw ng mga petsang UTC (`new Date().toISOString().slice(0, 10)`).
  Sinadya ito — pinipigilan ng iisang canonical timezone ang pandaraya sa pamamagitan ng
  pagpapalit-palit ng timezone.
- **Mga bagong user**: walang umiiral na rekord ng sunod-sunod na araw; ginagawa ito ng unang request na may
  `current=1, longest=1, lastDate=today`.
- **Maraming request bawat araw**: ang unang request lamang sa araw na UTC
  ang nagdadagdag sa sunod-sunod na araw.

---

## Leaderboard

**File:** `src/lib/gamification/leaderboard.ts`

### Mga Saklaw

| Saklaw          | Panahon | Paglalarawan                                         |
| --------------- | ------- | ---------------------------------------------------- |
| `global`        | `all`   | Pinagsama-samang XP sa lahat ng panahon              |
| `weekly`        | `week`  | XP na nakuha sa kasalukuyang linggo ng UTC (Lun-Lin) |
| `monthly`       | `month` | XP na nakuha sa kasalukuyang buwan ng UTC            |
| `tokens_shared` | `all`   | Kabuuang token na inilipat sa iba                    |
| `contributions` | `all`   | Mga combo na ginawa + provider at skill na ginamit   |

### Pagkuwenta ng Ranggo

Ang mga ranggo ay **kinukuwenta sa oras ng pagbasa**, hindi iniimbak. Iniiwasan nito ang lipas na data ng ranggo
at inaalis ang pangangailangan para sa mga pana-panahong trabaho ng muling pagkukuwenta ng ranggo.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

Pattern ng query:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### Pag-ikot ng Panahon

Awtomatikong umiikot ang mga lingguhan at buwanang leaderboard:

1. **I-archive**: sa hangganan ng panahon, kopyahin ang mga kasalukuyang entry sa
   `leaderboard_archive` kasama ang label ng panahon.
2. **I-reset**: burahin ang mga entry para sa nag-expire na panahon.
3. **Trigger**: sinusuri sa bawat tawag sa `updateLeaderboard()`; ang unang request
   ng bagong panahon ang nagti-trigger sa pag-ikot.

Tinitiyak nito na nare-reset ang mga lingguhang board tuwing Lunes 00:00 UTC at ang mga buwanang board
sa ika-1 ng bawat buwan.

### Mga Real-Time na Update sa SSE

**Endpoint:** `GET /api/gamification/stream`

```
Client → GET /api/gamification/stream
  → Na-establish ang koneksyon sa SSE
  → Agad na ipinapadala ng server ang snapshot ng nangungunang 10 sa leaderboard
  → Bawat 5 segundo: ipadala ang na-update na nangungunang 10 kung may pagbabago
  → Bawat 15 segundo: heartbeat comment (": heartbeat\n\n")
  → Nadiskonekta ang client → cleanup (alisin ang listener)
```

Format ng event:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

Sinusubaybayan ng SSE manager ang mga nakakonektang client ayon sa saklaw at nagpapadala lamang ng mga update
kapag talagang nagbago ang data ng leaderboard mula noong huling pagpapadala.

---

## Pagbabahagi ng Token

**File:** `src/lib/gamification/sharing.ts`

### Double-Entry Ledger

Bawat paglilipat ay lumilikha ng dalawang row sa `token_ledger`:

| Row    | `from_key_id` | `to_key_id` | `amount` |
| ------ | ------------- | ----------- | -------- |
| Debit  | nagpadala     | tumanggap   | +amount  |
| Credit | tumanggap     | nagpadala   | -amount  |

Sandali — ang sinusunod na kumbensiyon ay:

| Row     | `from_key_id` | `to_key_id` | `amount` | Kahulugan                  |
| ------- | ------------- | ----------- | -------- | -------------------------- |
| Padala  | nagpadala     | tumanggap   | +amount  | Paglabas mula sa nagpadala |
| Tanggap | tumanggap     | nagpadala   | +amount  | Pagpasok para sa tumanggap |

Kinukuwenta ang balanse bilang:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Daloy ng Paglilipat

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Pagpapatunay**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **Idempotency**: tingnan kung mayroon nang `idempotency_key` sa ledger.
   Kung mayroon, ibalik ang naka-cache na resulta.
3. **Transaksyon** (iisang transaksyon sa SQLite):
   a. Kuwentahin ang balanse ng nagpadala.
   b. Kung `balance < amount`, ihinto (kulang ang pondo).
   c. Ipasok ang row ng pagpapadala (`from=nagpadala,`.

### Paglilimita sa Rate

- Maximum na 10 paglilipat bawat minuto para sa bawat API key.
- Maximum na 10,000 token sa isang paglilipat.
- Maximum na 100,000 token na inililipat bawat araw para sa bawat API key.

---

## Mga Token para sa Pag-imbita at Pag-redeem

**File:** `src/lib/gamification/invites.ts`

### Format ng Code

- **Code**: 8-character na alphanumeric (hal., `A3K9-X7M2`), madaling basahin ng tao,
  ipinapakita sa user.
- **Token**: 32-byte na random token, iniimbak bilang SHA-256 hash. Ginagamit para sa
  programmatic na pag-redeem (hal., mga URL link).

### Imbakan

| Column       | Value                              |
| ------------ | ---------------------------------- |
| `code`       | `A3K9X7M2` (natatangi, naka-index) |
| `token_hash` | SHA-256(raw_token)                 |

Isang beses lamang ibinabalik sa user ang raw token sa oras ng paggawa. Hindi na ito
kailanman iniimbak o ipinapakita muli ng OmniRoute — ang hash lamang ang nananatili.

### Pag-iwas sa Self-Referral

Kapag nag-redeem ng code ang isang user, sinusuri ng system ang sumusunod:

1. Ang code ay pagmamay-ari ng ibang `api_key_id`.
2. Ang nagre-redeem na user ay hindi pa dating nag-redeem ng anumang code mula sa parehong
   referrer (nagjo-join sa `invite_tokens` + redemption log).

Kung mabigo ang alinman sa mga pagsusuri, tatanggihan ang pag-redeem na may malinaw na mensahe ng error.

### Pag-expire at mga Limitasyon

- Default na `max_uses`: 10 (maaaring i-configure sa paggawa).
- Default na `expires_at`: 30 araw mula sa paggawa.
- Ang mga nag-expire o naubos nang code ay nagbabalik ng HTTP 410 Gone.

---

## Pederasyon ng Community Server

**File:** `src/lib/gamification/servers.ts`

### Pagkonekta

Inirerehistro ang isang community server gamit ang invite token na ibinigay ng remote
server. Ang lokal na instansya ay:

1. Tumatanggap ng invite token (hal., ini-paste sa dashboard).
2. Tumatawag sa `POST /api/gamification/federation/leaderboard` sa remote server
   upang patunayan ang token at kunin ang kasalukuyang leaderboard.
3. Iniimbak ang tala ng server na may `status: connected`.

### Modelo ng Pag-sync

Gumagamit ang pederasyon ng **overwrite sync**, hindi additive:

```
Lokal na Instansya             Community Server
     │                              │
     ├── mag-push ng score ────────►│  POST /federation/score
     │   { api_key_id, score }      │  (pinapatunayan ng server ang token hash)
     │                              │
     ├── kunin ang leaderboard ────►│  GET /federation/leaderboard
     │◄── top-N na entry ───────────┤  (ino-overwrite ang lokal na cache)
     │                              │
     └── pagsusuri sa kalagayan ───►│  GET /federation/health
         (bawat 60s, timeout 5s)    │
```

### Awtorisasyon

Kasama sa mga kahilingan sa pederasyon ang:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

Hina-hash ng remote server ang token at hinahanap ang katugmang
row sa `community_servers`. Naiiwasan nito ang pagpapadala ng nakaimbak na hash.

### Pagsubaybay sa Kalagayan

Sinusubaybayan ng bawat tala ng server ang:

| Field       | Paglalarawan                                        |
| ----------- | --------------------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable`              |
| `last_sync` | ISO timestamp ng huling matagumpay na pag-sync      |
| `failures`  | Magkakasunod na pagkabigo sa pagsusuri sa kalagayan |

Pagkatapos ng 5 magkakasunod na pagkabigo, magbabago ang status sa `unreachable` at
ihihinto ang pag-sync hanggang sa magtagumpay ang manu-manong pagsusuri sa kalagayan.

---

## Pagpigil sa Pandaraya

**File:** `src/lib/gamification/antiCheat.ts`

### Pagkalkula ng Score sa Server-Side

Isinasagawa ang lahat ng pagkalkula ng XP sa `src/lib/gamification/xp.ts`. Hindi kailanman
nagsusumite ng score ang mga client — nagsusumite sila ng mga aksyon, at kinakalkula ng
server ang XP. Maaari lamang sulatan ng server-side code ang column na
`leaderboard.score`.

### Paglilimita ng Rate

| Limitasyon                          | Halaga  | Saklaw         |
| ----------------------------------- | ------- | -------------- |
| Pinakamataas na XP kada minuto      | 1,000   | Bawat API key  |
| Pinakamaraming transfer kada minuto | 10      | Bawat API key  |
| Pinakamataas na halaga ng transfer  | 10,000  | Bawat transfer |
| Pinakamataas na transfer kada araw  | 100,000 | Bawat API key  |

Gumagamit ang mga rate limit ng in-memory sliding window (kaparehong pattern ng
`RateLimitManager` sa `open-sse/services/`). Gumagamit ito bilang fallback ng mga
counter na sinusuportahan ng SQLite kapag nag-restart ang proseso.

### Pagtukoy ng Anomalya gamit ang Z-Score

Para sa bawat API key, nagpapanatili ang system ng gumugulong na 7-araw na window ng XP
na nakukuha bawat oras. Sa bawat pagbibigay ng XP:

1. Kalkulahin ang kasalukuyang hourly XP rate ng user.
2. Kalkulahin ang mean at standard deviation ng population.
3. Kalkulahin ang `z = (user_rate - mean) / stddev`.
4. Kung `z > 3.0` (3 standard deviation), markahan ito bilang anomalya.

Itinatala ang mga anomalya sa `xp_audit_log` na may `action = 'anomaly_detected'`
at ipinapakita sa admin dashboard.

### Audit Trail

Ang bawat pagbibigay ng XP, transfer, pagkamit ng badge, at pagtukoy ng anomalya ay
itinatala sa `xp_audit_log` na may:

| Field        | Paglalarawan                                      |
| ------------ | ------------------------------------------------- |
| `api_key_id` | Sino                                              |
| `action`     | Ano ang nangyari (xp_award, transfer, anomaly, …) |
| `xp_awarded` | Halaga (0 para sa mga event na hindi XP)          |
| `metadata`   | JSON na may konteksto (uri ng aksyon, target, …)  |
| `created_at` | Kailan (ISO 8601)                                 |

Maaaring i-query ng mga admin ang buong audit trail sa pamamagitan ng `GET /api/gamification/anomalies`.

---

## Mga API Route

Sinusunod ng lahat ng route ang karaniwang pattern ng OmniRoute:

```
Route → CORS preflight → Pagpapatunay ng body (Zod) → Auth (extractApiKey)
  → Handler
```

### Mga Endpoint

| Paraan | Path                                       | Paglalarawan                                        | Auth       |
| ------ | ------------------------------------------ | --------------------------------------------------- | ---------- |
| GET    | `/api/gamification/leaderboard`            | Kunin ang leaderboard (saklaw, panahon, pagination) | Opsyonal   |
| POST   | `/api/gamification/leaderboard`            | Sapilitang i-refresh ang cache ng leaderboard       | Kailangan  |
| GET    | `/api/gamification/stream`                 | Mga real-time na update ng leaderboard sa SSE       | Opsyonal   |
| GET    | `/api/gamification/transfer`               | Kunin ang kasaysayan ng transfer (pagination)       | Kailangan  |
| POST   | `/api/gamification/transfer`               | Magpadala ng mga token sa ibang user                | Kailangan  |
| GET    | `/api/gamification/invite`                 | Ilista ang aking mga invite code                    | Kailangan  |
| POST   | `/api/gamification/invite`                 | Bumuo ng bagong invite code                         | Kailangan  |
| DELETE | `/api/gamification/invite`                 | Bawiin ang isang invite code                        | Kailangan  |
| POST   | `/api/gamification/invite/redeem`          | Gamitin ang isang invite code                       | Kailangan  |
| GET    | `/api/gamification/servers`                | Ilista ang mga community server                     | Kailangan  |
| POST   | `/api/gamification/servers`                | Kumonekta sa isang community server                 | Kailangan  |
| DELETE | `/api/gamification/servers`                | Kumalas sa isang community server                   | Kailangan  |
| POST   | `/api/gamification/federation/score`       | Ipadala ang score sa remote server                  | Federation |
| GET    | `/api/gamification/federation/leaderboard` | Kunin ang leaderboard mula sa remote                | Federation |
| GET    | `/api/gamification/notifications`          | Mga notification sa SSE para sa badge/pag-level up  | Kailangan  |
| GET    | `/api/gamification/anomalies`              | Tingnan ang mga ulat ng anomalya (admin)            | Admin      |
| POST   | `/api/gamification/rotate`                 | I-rotate ang mga secret ng invite token             | Kailangan  |

### Mga Halimbawa ng Request/Response

**POST /api/gamification/transfer**

```json
// Request
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// Response 200
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

// Response 400 (hindi sapat ang pondo)
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

## Mga MCP Tool (8)

Nakarehistro sa `open-sse/mcp-server/` kasama ng mga umiiral na tool. Nasasaklaw ng
saklaw ng pahintulot na `gamification`.

| Tool                       | Paglalarawan                                        | Input Schema                 |           |
| -------------------------- | --------------------------------------------------- | ---------------------------- | --------- |
| `gamification_leaderboard` | Kunin ang leaderboard para sa saklaw/panahon        | `{ scope, period?, limit? }` |
| `gamification_rank`        | Kunin ang ranggo at mga katabi ng tumatawag         | `{ scope }`                  |
| `gamification_profile`     | Kunin ang buod ng XP, level, title, streak          | `{}`                         |
| `gamification_badges`      | Ilista ang mga nakuhang badge o lahat ng depinisyon | `{ earned?: boolean }`       |
| `gamification_transfer`    | Magpadala ng mga token sa ibang user                | `{ to, amount }`             |
| `gamification_invite`      | Bumuo o maglista ng mga invite code                 | `{ action: "create"          | "list" }` |
| `gamification_servers`     | Ilista o ikonekta ang mga community server          | `{ action, token? }`         |
| `gamification_anomalies`   | Tingnan ang mga ulat ng anomalya (saklaw ng admin)  | `{ limit?, since? }`         |

---

## Mga Page ng Dashboard

### `/dashboard/leaderboard`

- Podium display (nangungunang 3 na may mga avatar at XP).
- Selector ng saklaw: Global / Lingguhan / Buwanan / Mga Ibinahaging Token / Mga Kontribusyon.
- May pagination na table (25 bawat page) na may ranggo, pangalan, score, level, at title.
- Mga real-time na update sa SSE — gumagalaw ang mga pagbabago sa ranggo.
- Naka-highlight sa table ang kasalukuyang user, na may sticky row na "Iyong Ranggo."

### `/dashboard/profile`

- Progress bar ng XP na may kasalukuyang level at threshold ng susunod na level.
- Kitang-kitang ipinapakita ang badge ng title.
- Gallery ng badge — mga nakuhang badge na may petsa ng pagkakuha, at naka-gray ang mga hindi pa nakukuha
  (ipinapakita ng mga nakatagong badge ang "???" hanggang sa makuha).
- Counter ng streak na may icon na apoy; kalendaryo ng streak (nakaraang 30 araw).
- Chart ng kasaysayan ng XP (araw-araw na XP sa nakaraang 30 araw).

### `/dashboard/tokens`

- Balanse ng token (kitang-kita, sa itaas ng page).
- Form ng paglilipat: recipient, halaga, dialog ng kumpirmasyon.
- Table ng kasaysayan ng paglilipat na may mga filter (ipinadala/natanggap/lahat).
- Seksyon ng invite: mga aktibong code, bumuo ng bago, link para sa pagbabahagi.
- Mga community server: listahan na may status ng kalagayan, ikonekta/idiskonekta.

### `/dashboard/gamification/admin`

- Listahan ng anomalya na may severity, user, timestamp, at z-score.
- Viewer ng audit log na may mga filter (uri ng aksyon, user, saklaw ng petsa).
- Mga istatistika ng system: kabuuang XP na iginawad, mga aktibong user, mga rate ng pagkakuha ng badge.
- Pangkalahatang-ideya ng kalagayan ng federation server.

---

## Integrasyon sa Pipeline

### Punto ng Integrasyon

Kumokonekta ang gamification sa request pipeline sa iisang punto sa
`open-sse/handlers/chatCore.ts`:

```typescript
// Pagkatapos maipadala ang response sa client:
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
    // Fire-and-forget: i-log ngunit huwag kailanman ipasa sa client
  });
});
```

### Mga Uri ng Event

| Uri ng Event        | Kailan Ipinapadala                                 |
| ------------------- | -------------------------------------------------- |
| `request.completed` | Naipadala ang matagumpay na response ng LLM        |
| `provider.switch`   | Nagbago ang provider (kabilang ang combo fallback) |
| `combo.created`     | Na-save ang bagong configuration ng combo          |
| `combo.used`        | Matagumpay na naabot ang target ng combo           |
| `badge.earned`      | Nakakita ng tugma ang pagsusuri ng badge           |
| `streak.milestone`  | Nalampasan ang threshold ng streak                 |
| `transfer.sent`     | Nakumpleto ang paglilipat ng token                 |
| `referral.redeemed` | Matagumpay na na-redeem ang invite code            |
| `compression.used`  | Inilapat ang prompt compression                    |
| `skill.executed`    | Nakumpleto ang pagpapatupad ng skill               |
| `model.first_use`   | Hindi nagamit ang model sa nakaraang 7 araw        |

### Garantiya ng Hindi Pag-block

Tinitiyak ng pattern na `setImmediate` + `.catch(() => {})` na:

1. Ganap nang naipadala ang response bago tumakbo ang gamification.
2. Hindi kailanman lumilitaw sa client ang mga error sa gamification.
3. Tumatakbo ang pagproseso ng event sa susunod na microtask, hindi inline.

---

## Seguridad

### Modelo ng Banta

| Banta                          | Paraan ng Pag-iwas                                                                              |
| ------------------------------ | ----------------------------------------------------------------------------------------------- |
| Pagpapataas ng score           | Sa server lamang kinakalkula ang XP; mga aksyon, hindi mga score, ang isinusumite ng mga client |
| Mga replay attack              | Mga idempotency key sa mga transfer; deduplication ng audit log                                 |
| Panloloko sa transfer          | Double-entry ledger; mga atomic transaction; mga limitasyon sa rate                             |
| Self-referral                  | I-cross-check ang `api_key_id` sa pag-redeem                                                    |
| Pagmamanipula ng leaderboard   | Pagtukoy ng anomalya gamit ang Z-score; dashboard ng anomalya para sa admin                     |
| Pagnanakaw ng federation token | Storage na naka-hash gamit ang SHA-256; isang beses lamang ipinapakita ang raw token            |
| Brute force sa mga invite code | Paglilimita ng rate sa redemption endpoint; 8-character na entropy                              |
| XSS sa mga display name        | Sini-sanitize ang mga display name; ini-escape ang mga entry sa leaderboard                     |
| Mga timing attack sa mga hash  | `crypto.timingSafeEqual` para sa paghahambing ng token hash                                     |

### Mga Kinakailangan sa Awtentikasyon

- **Pampubliko** (walang awtentikasyon): `GET /leaderboard`, `GET /stream` (read-only na
  mga leaderboard).
- **Kailangan ang API key**: lahat ng write operation, profile, transfer, at invite.
- **Para sa admin lamang**: dashboard ng anomalya, viewer ng audit log.
- **Federation**: hiwalay na landas ng awtentikasyon gamit ang raw token sa `Authorization`
  header, na bine-validate laban sa naka-store na SHA-256 hash.

---

## Pagsubok

### Mga Test File

Ginagamit ng lahat ng pagsubok ang native test runner ng Node.js (`node --import tsx/esm --test`).

| Test File                                     | Saklaw                                         | Mga Pagsubok |
| --------------------------------------------- | ---------------------------------------------- | ------------ |
| `tests/unit/gamification/xp.test.ts`          | Pagkalkula ng XP, level curve, mga titulo      | 8            |
| `tests/unit/gamification/badges.test.ts`      | Pagtutugma ng pamantayan ng badge, paggawad    | 10           |
| `tests/unit/gamification/streaks.test.ts`     | Lohika ng streak, mga milestone, mga edge case | 7            |
| `tests/unit/gamification/leaderboard.test.ts` | Pagkalkula ng ranggo, pagination, rotation     | 8            |
| `tests/unit/gamification/sharing.test.ts`     | Mga transfer, balanse, idempotency             | 9            |
| `tests/unit/gamification/invites.test.ts`     | Paggawa, pag-redeem, pag-expire, self-referral | 7            |
| `tests/unit/gamification/antiCheat.test.ts`   | Mga limitasyon sa rate, z-score, audit logging | 6            |
| `tests/unit/gamification/events.test.ts`      | Pag-emit ng event, fan-out, paghawak ng error  | 5            |

### Pagpapatakbo ng mga Pagsubok

```bash
# Lahat ng pagsubok sa gamification
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# Isang test file
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Mga Kinakailangan sa Coverage

Ayon sa `CONTRIBUTING.md` — dapat taglayin ng lahat ng bagong module ang sumusunod:

- Branch coverage >= 80%.
- Nasubok nang kahit isang beses ang bawat public function.
- Nasubok ang mga error path (hindi sapat na balanse, mga expired na code, mga limitasyon sa rate).

---

## Estruktura ng File

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # Lahat ng 8 talahanayan + mga index
      gamification.ts                  # CRUD module ng domain
    gamification/
      xp.ts                           # Pagkalkula ng XP, kurba ng antas, mga titulo
      badges.ts                       # Mga depinisyon, pamantayan, at pagsusuri ng badge
      streaks.ts                      # Pagsubaybay ng pang-araw-araw na streak
      leaderboard.ts                  # Pagkalkula ng ranggo, SSE, pag-ikot
      antiCheat.ts                    # Paglilimita ng rate, z-score, pag-audit
      sharing.ts                      # Ledger ng paglilipat ng token
      invites.ts                      # Mga code sa pag-imbita/pag-redeem
      servers.ts                      # Pederasyon ng server ng komunidad
      events.ts                       # Event emitter (punto ng integrasyon)
      notifications.ts                # Stream ng notification sa SSE
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST ng leaderboard
        leaderboard/stream/route.ts   # Mga real-time na update sa SSE
        transfer/route.ts             # GET/POST ng mga paglilipat
        invite/route.ts               # GET/POST/DELETE ng mga code sa pag-imbita
        invite/redeem/route.ts        # POST para mag-redeem ng code
        servers/route.ts              # GET/POST/DELETE ng mga server
        federation/score/route.ts     # POST para mag-push ng score
        federation/leaderboard/route.ts # GET para mag-pull ng leaderboard
        notifications/route.ts        # Mga notification sa SSE
        anomalies/route.ts            # GET ng mga ulat ng anomalya
        rotate/route.ts               # POST para magpalit ng mga secret
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Pahina ng mga ranggo
        profile/page.tsx               # Pahina ng XP/mga badge/mga streak
        tokens/page.tsx                # Pahina ng balanse/mga paglilipat/mga imbitasyon
        gamification/admin/page.tsx    # Pagsubaybay ng admin sa mga anomalya
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
    GAMIFICATION.md                    # Ang dokumentong ito
```

---

## Estratehiya sa Migration

### Yugto 1: Pangunahing Backend (PR 1)

- Migration na `060_create_gamification.sql` (8 talahanayan).
- `src/lib/db/gamification.ts` (module ng domain).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- Punto ng integrasyon sa `chatCore.ts`.
- Mga unit test para sa XP, mga streak, at mga event.

### Yugto 2: Mga Badge at Leaderboard (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Mga depinisyon ng badge sa mga constant.
- Mga API route ng leaderboard + SSE stream.
- Mga unit test para sa mga badge at leaderboard.

### Yugto 3: Pagbabahagi at Mga Imbitasyon (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- Mga API route para sa paglilipat + imbitasyon.
- Mga unit test para sa pagbabahagi, mga imbitasyon, at anti-cheat.

### Yugto 4: Pederasyon at Dashboard (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- Mga API route ng pederasyon.
- Mga pahina ng dashboard (leaderboard, profile, mga token, admin).
- Pagpaparehistro ng mga MCP tool.

---

## Mga Pagsasaalang-alang sa Hinaharap

- **Mga pana-panahong event**: mga badge set at season ng leaderboard na may takdang panahon.
- **Mga leaderboard ng team**: pagpangkatin ang mga user ayon sa organisasyon o combo.
- **Mga multiplier ng XP**: dagdagan ang XP sa panahon ng mga promosyon.
- **Pagbabahagi ng achievement**: bumuo ng mga badge card na maaaring ibahagi (mga OpenGraph image).
- **Mobile push**: mga notification na nakabatay sa webhook para sa mga event ng badge/level.
- **Leaderboard API**: pampublikong API para sa mga third-party integration.
