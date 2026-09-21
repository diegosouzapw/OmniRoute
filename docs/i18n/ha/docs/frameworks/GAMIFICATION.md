# Gamification & Leaderboard System (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **Tushen ingantaccen bayani:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Sabuntawa na ƙarshe:** 2026-06-28 — v3.8.40

OmniRoute ya ƙunshi tsarin mayar da amfani ya zama wasa wanda ke fifita bayanan cikin na’ura, yana ba masu amfani lada saboda
mu’amala da dandamali — yin buƙatu, sauya masu samarwa, ƙirƙirar
haɗe-haɗe, raba token, da ba da gudummawa ga al’umma. Duk bayanan yanayi suna cikin
SQLite; haɗa kai da sabar al’umma zaɓi ne kuma yana gudana ne ta hanyar turawa.

An tsara tsarin ya kasance mai **rashin jinkiri kwata-kwata a muhimmin hanyar aiki** — ana aika
abubuwan da suka faru na mayar da amfani ya zama wasa ba tare da jiran sakamako ba daga jerin matakan sarrafa buƙata, kuma ba sa taɓa hana
amsar LLM gudana.

---

## Bayani Gabaɗaya

### Manufa

Ƙara mu’amalar masu amfani da ci gaba da amfani da tsarin ta hanyar samar da ci gaba mai ganuwa (XP,
matakai, bajuna), shaidar zamantakewa (allon jagoranci), da ƙarfafawar tattalin arziki (raba
token, ladan gayyata).

### Iyaka

| Fasali            | Bayani                                                                                  |
| ----------------- | --------------------------------------------------------------------------------------- |
| XP & Matakai      | Samun XP ga kowane aiki; hawa mataki bisa lanƙwasar polynomial                          |
| Bajuna            | Nasarori sama da 20 a cikin rukuni 5 masu matakan ƙaranci 4                             |
| Jerin Kwanaki     | Bibiyar amfani mai aiki na yau da kullum tare da jerin yanzu/mafi tsawo                 |
| Allunan Jagoranci | Iyakokin duniya baki ɗaya, na mako-mako, na wata-wata, raba token, da gudummawa         |
| Raba Token        | Tura credits tsakanin masu amfani ta kundin lissafin shigarwa-biyu                      |
| Gayyata & Karɓa   | Lambobin tura aboki tare da ma’ajiyar da aka yi wa hash na SHA-256                      |
| Sabar Al’umma     | Haɗa kai da wasu instances na OmniRoute na waje                                         |
| Yaƙi da Maguɗi    | Ƙididdigar ɓangaren saba, iyakance yawan buƙatu, gano abubuwan da suka kauce ta z-score |

### Ƙa’idojin Tsarawa

1. **Fifita na cikin na’ura** — duk bayanan yanayi suna cikin SQLite, ba a buƙatar sabis na waje.
2. **Marar toshewa** — ana aika abubuwan da suka faru ba tare da jiran sakamako ba; hanyar amsar LLM
   ba ta taɓa samun jinkiri saboda dabarun mayar da amfani ya zama wasa.
3. **Saba ce mai iko** — ana lissafa XP ne kawai a ɓangaren saba; clients ba za su iya
   ƙara maki ta hanyar yaudara ba.
4. **Mutunta sirri** — shiga allon jagoranci zaɓi ne; masu amfani za su iya
   ɓoye profile ɗinsu.
5. **Shirye don haɗin gwiwa** — sabar al’umma za su iya tura maki ta API mai sa hannu;
   sync yana maye gurbin bayanai ne, ba ya tarawa.

---

## Gine-ginen Tsari

### Babban Gudanarwar Aiki

```
Buƙatar Client
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (jerin matakan aiki na yanzu) ...
      → an aika amsar upstream zuwa client
      → setImmediate (aika ba tare da jiran sakamako ba):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

Mai fitar da events shi ne wurin haɗawa guda ɗaya. `chatCore.ts` yana kiran
`emitGamificationEvent()` bayan an aika amsa; module ɗin event yana rarraba aiki
zuwa ƙananan tsarin XP, jerin kwanaki, baju, allon jagoranci, da yaƙi da maguɗi.

### Jadawalin Dogaro Tsakanin Modules

```
src/lib/gamification/
  events.ts          ← wurin shiga (ana kira daga chatCore.ts)
    ├── xp.ts        ← lissafin XP & tantance mataki
    ├── streaks.ts   ← bibiyar jerin kwanakin aiki na yau da kullum
    ├── badges.ts    ← tantance sharuɗɗan baju
    ├── leaderboard.ts ← lissafin matsayi & watsa SSE
    ├── antiCheat.ts ← iyakance yawan buƙatu & gano abubuwan da suka kauce
    ├── sharing.ts   ← kundin lissafin tura token
    ├── invites.ts   ← sarrafa lambobin gayyata/karɓa
    ├── servers.ts   ← haɗin gwiwar sabar al’umma
    └── notifications.ts ← rafin sanarwar SSE

src/lib/db/
  gamification.ts    ← duk ayyukan CRUD (tables 8)

src/app/api/gamification/
  leaderboard/       ← GET jeri bisa matsayi, POST sabuntawa da hannu
  leaderboard/stream ← sabuntawar SSE na ainihin lokaci
  transfer/          ← GET tarihin aiki, POST aika tokens
  invite/            ← lambobin GET/POST, DELETE sokewa
  invite/redeem/     ← POST karɓar lamba
  servers/           ← sabar al’umma ta GET/POST/DELETE
  federation/score/  ← POST tura maki zuwa saba
  federation/leaderboard/ ← GET ɗauko allon jagoranci daga saba
  notifications/     ← sanarwar SSE ta baju/hawan mataki
  anomalies/         ← GET rahotannin abubuwan da suka kauce (admin)
  rotate/            ← POST sauya sirrin token na gayyata
```

---

## Matakin Bayanai

### Jadawalin Rumbun Bayanai

Dukkan jadawalan suna cikin babban rumbun bayanan SQLite na OmniRoute, wanda migration
`060_create_gamification.sql` ya ƙirƙira. Ana gādon rajistar WAL daga singleton
`getDbInstance()` da ke cikin `src/lib/db/core.ts`.

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

### Modulin Yanki: `src/lib/db/gamification.ts`

Yana bin daidaitaccen tsarin OmniRoute — yana shigo da `getDbInstance()` daga
`core.ts`, sannan yana fitar da ayyukan CRUD masu nau'i. Babu ɗanyen SQL a cikin masu sarrafa route.

Muhimman ayyuka:

| Aiki                       | Bayani                                                           |
| -------------------------- | ---------------------------------------------------------------- |
| `upsertLeaderboardEntry()` | Saka ko sabunta maki na (api_key_id, scope, period)              |
| `getLeaderboard()`         | Matsayi mai shafuka don scope/period da aka bayar                |
| `getUserLevel()`           | Samo ko ƙirƙiri rikodin matakin mai amfani                       |
| `updateUserLevel()`        | Saita XP, mataki, da take ta atomatik                            |
| `getBadgeDefinitions()`    | Dukkan ma’anonin badge (tare da tacewa idan ana so)              |
| `getUserBadges()`          | Badge da mai amfani ya samu                                      |
| `awardBadge()`             | Saka samun badge (idempotent bisa badge_id)                      |
| `logXpAction()`            | Ƙara rikodi zuwa xp_audit_log                                    |
| `getXpAuditLog()`          | Tarihin dubawa mai shafuka na mai amfani                         |
| `insertLedgerEntry()`      | Canja wurin shigarwa-biyu (a cikin transaction)                  |
| `getBalance()`             | Jimillar abin da aka karɓa a rage abin da aka aika na mai amfani |
| `getTransferHistory()`     | Rajistar canja wuri mai shafuka                                  |
| `createInviteToken()`      | Saka lambar gayyata + token mai hash                             |
| `redeemInviteToken()`      | Nemo ta code, tabbatar da inganci, ƙara uses                     |
| `upsertCommunityServer()`  | Yi rajista ko sabunta federation server                          |
| `getCommunityServers()`    | Jera servers na mai amfani                                       |
| `deleteCommunityServer()`  | Cire rajistar server                                             |

---

## Tsarin XP / Mataki

**Fayil:** `src/lib/gamification/xp.ts`

### Lanƙwasar Mataki

XP da ake buƙata don kaiwa mataki `n` yana bin lanƙwasar polynomial:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Mataki | XP zuwa Na Gaba | Jimillar XP | Laƙabi      |
| ------ | --------------- | ----------- | ----------- |
| 1      | 100             | 100         | Mafari      |
| 5      | 1,118           | 2,415       | Mafari      |
| 10     | 3,162           | 10,523      | Mai Bincike |
| 25     | 12,500          | 86,024      | Mai Bincike |
| 50     | 35,355          | 345,529     | Gogagge     |
| 75     | 64,952          | 948,683     | Gwani       |
| 100    | 100,000         | 2,050,000   | Fitacce     |

### Laƙabai

| Kewayon Mataki | Laƙabi      |
| -------------- | ----------- |
| 1 – 9          | Mafari      |
| 10 – 24        | Mai Bincike |
| 25 – 49        | Gogagge     |
| 50 – 74        | Gwani       |
| 75 – 100       | Fitacce     |

### Ladan XP

| Aiki              | XP  | Bayani                                               |
| ----------------- | --- | ---------------------------------------------------- |
| `request`         | 1   | Ga kowace buƙatar API da aka bi da ita ta OmniRoute  |
| `provider_switch` | 5   | Sauyawa zuwa wani mai samarwa na daban               |
| `model_switch`    | 3   | Sauyawa zuwa wani samfurin daban                     |
| `combo_create`    | 10  | Ƙirƙirar sabon haɗin aiki                            |
| `combo_use`       | 2   | Amfani da haɗin aiki don wata buƙata                 |
| `token_share`     | 1   | Ga kowane token 1 000 da aka raba wa wani mai amfani |
| `invite_redeem`   | 50  | Amfani da lambar gayyata                             |
| `daily_login`     | 5   | Amfani na yau da kullum (sau ɗaya a rana)            |
| `streak_bonus`    | 2   | Ga kowace rana a jere (ana ninkawa da tsawon jerin)  |
| `badge_unlock`    | 10  | Buɗe lamba                                           |

### Gudanar da Bayarwa

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. Nemo `XP_REWARDS[action]` don samun adadin XP.
2. Wuce ta `checkRateLimit()` (hana maguɗi: iyakar XP 1000/min ga kowace maɓalli).
3. Buɗe wata ma'amala:
   - Karanta layin `user_levels` na yanzu.
   - Ƙara XP; sake lissafa mataki ta `levelFromXp(totalXp)`.
   - Idan matakin ya canza, saita `levelUp = true`.
   - Sabunta layin `user_levels`.
   - Saka bayanai cikin `xp_audit_log`.
4. Mayar da sakamakon. Mai kira ne ke kula da sanarwa.

### Mai Taimako: `levelFromXp(totalXp)`

Yana bi ta matakai 1..100, yana tara `xp_for_level(n)` har sai jimillar XP
ta zarce `totalXp`. Yana mayar da mataki mafi girma wanda aka cika sharaɗinsa.
Wannan O(100) ne — abin karɓa ne domin iyakar matakai ita ce 100.

---

## Tsarin Lambobi

**Fayil:** `src/lib/gamification/badges.ts`

### Rukunoni

| Rukuni         | Bayani                                | Misalan Lambobi                                    |
| -------------- | ------------------------------------- | -------------------------------------------------- |
| `usage`        | Muhimman nasarori bisa yawan amfani   | Buƙata ta Farko, Buƙatu 1K, 100K                   |
| `sharing`      | Raba token da tura gayyata            | Rabawa ta Farko, Mai Karimci (rabawa 10)           |
| `contribution` | Shiga cikin harkokin al'umma          | Mai Ƙirƙirar Haɗin Aiki, Mai Binciken Masu Samarwa |
| `streak`       | Daidaiton ci gaba na tsawon lokaci    | Gwarzon Mako, Mai Sadaukarwar Wata                 |
| `rare`         | Nasarori masu wahalar samu ko ɓoyayyu | Mai Fara Amfani da Wuri, Mai Ba da Rahoton Matsala |

### Matakan Wuya

| Matakin Wuya | Launi     | Alamar Yiwuwar Samu         |
| ------------ | --------- | --------------------------- |
| `common`     | Toka-toka | Yawancin masu amfani        |
| `uncommon`   | Kore      | Masu amfani masu himma      |
| `rare`       | Shuɗi     | Masu amfani masu sadaukarwa |
| `legendary`  | Zinariya  | Manyan 1%                   |

### Nau'ikan Sharuɗɗa

| Nau'i          | Fili            | Bayani                                                             |
| -------------- | --------------- | ------------------------------------------------------------------ |
| `action_count` | `count`         | Yi aiki sau N (misali, buƙatu 1000)                                |
| `streak`       | `days`          | Ci gaba da jeri na kwanaki N a jere                                |
| `unique_count` | `field`, `n`    | Yi amfani da ƙimomi N na musamman (misali, samfura daban-daban 10) |
| `rank`         | `scope`, `n`    | Kai matsayi N a wani ɓangaren jadawalin jagoranci                  |
| `first`        | —               | Kasance na farko da ya yi wani aiki                                |
| `hidden`       | (yana bambanta) | Ba a nuna sharuɗɗan sai an samu lambar                             |

Ana adana ma'anar lambobi a cikin `badge_definitions` a matsayin JSON `criteria`:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Gudanar da Tantancewa

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # dukkan ma'anoni
    → getUserBadges(apiKeyId)         # waɗanda aka riga aka samu (tsallake)
    → ga kowace lambar da ba a samu ba:
       → matchesCriteria(badge, event, userState)
       → idan ta dace: awardBadge(apiKeyId, badgeId)
         → mayar da bayanan sanarwa
```

Tantancewar tana **samun motsawa daga aukuwa** — tana gudana bayan kowace aukuwar gamification, amma
tana duba lambobin da `criteria.type` ɗinsu kawai ya yi daidai da aikin aukuwar. Wannan
yana sa tantancewar ta kasance cikin sauri (< 5ms ga yawancin aukuwa).

### `matchesCriteria(badge, event, userState)`

| Nau'in Sharaɗi | Dubawa                                                            |
| -------------- | ----------------------------------------------------------------- |
| `action_count` | `getActionCount(apiKeyId, action) >= count`                       |
| `streak`       | `getCurrentStreak(apiKeyId) >= days`                              |
| `unique_count` | `getUniqueCount(apiKeyId, field) >= n`                            |
| `rank`         | `getRank(apiKeyId, scope) <= n`                                   |
| `first`        | Babu shigarwar `xp_audit_log` da ta gabata don wannan nau'in aiki |
| `hidden`       | Yana miƙa aikin zuwa ƙaramin dubawa da ya dace                    |

### Lambobin da Aka Gina Ciki (20+)

<details>
<summary>Cikakken jerin lambobi</summary>

| Lamba                    | Rukuni      | Matsayin wuya   | Sharuɗɗa                                 |
| ------------------------ | ----------- | --------------- | ---------------------------------------- |
| Matakan Farko            | amfani      | gama-gari       | Buƙata 1                                 |
| Fara Sabawa              | amfani      | gama-gari       | Buƙatu 100                               |
| Gogaggen Mai Amfani      | amfani      | ba gama-gari ba | Buƙatu 1,000                             |
| Jarumin Ɗari             | amfani      | mai wuya        | Buƙatu 10,000                            |
| OmniPower                | amfani      | na almara       | Buƙatu 100,000                           |
| Mai Sauya Masu Bayarwa   | gudummawa   | gama-gari       | Yi amfani da masu bayarwa 5 daban-daban  |
| Gwanin Masu Bayarwa      | gudummawa   | ba gama-gari ba | Yi amfani da masu bayarwa 20 daban-daban |
| Mai Tsara Combo          | gudummawa   | ba gama-gari ba | Ƙirƙiri combo 5                          |
| Babban Gwanin Combo      | gudummawa   | mai wuya        | Ƙirƙiri combo 25                         |
| Rabawa ta Farko          | rabawa      | gama-gari       | Canja token sau 1                        |
| Mai Karimci              | rabawa      | ba gama-gari ba | Canja token sau 10                       |
| Mai Taimakon Jama'a      | rabawa      | mai wuya        | Canja jimillar token 10,000              |
| Mai Gayyata              | rabawa      | gama-gari       | Gayyata 1 mai nasara                     |
| Mai Gina Cibiyar Sadarwa | rabawa      | ba gama-gari ba | Gayyata 10 masu nasara                   |
| Jarumin Mako             | jere        | ba gama-gari ba | Jere na kwanaki 7                        |
| Mai Sadaukarwar Wata     | jere        | mai wuya        | Jere na kwanaki 30                       |
| Marar Tsayawa            | jere        | na almara       | Jere na kwanaki 365                      |
| Mai Shiga da Wuri        | na musamman | na almara       | Shiga a lokacin beta                     |
| Majagaban Matsawa        | na musamman | ba gama-gari ba | Yi amfani da matsawa sau 100             |
| Mai Tara Ƙwarewa         | na musamman | mai wuya        | Yi amfani da ƙwarewa 10 daban-daban      |
| Mai Binciken Model       | gudummawa   | ba gama-gari ba | Yi amfani da model 15 daban-daban        |

</details>

---

## Mai Bibiyar Jerin Kwanaki

**Fayil:** `src/lib/gamification/streaks.ts`

### Tsarin Bayanai

Ana adana jerin kwanaki a cikin teburin `key_value` (teburin kayan aiki na bai ɗaya) a ƙarƙashin maɓallan da aka raba ta sararin suna:

| Maɓalli                       | Ƙima                             | Bayani                            |
| ----------------------------- | -------------------------------- | --------------------------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Bayanai na jerin kwanaki mai aiki |

### Tsarin Aiki

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Karanta rikodin jerin kwanaki daga `key_value`.
2. Fassarawa `{current}`, `{longest}`, `{lastDate}` (kirtanin kwanan wata na ISO).
3. Idan `lastDate === today` — babu canji (an riga an ƙirga yau).
4. Idan `lastDate === yesterday` — ƙara `current`; sabunta `longest` idan ya zama dole.
5. Idan `lastDate < yesterday` — sake saita `current = 1` (jerin kwanakin ya yanke).
6. Rubuta rikodin da aka sabunta.
7. Duba matakan nasara: kwanaki 7, 14, 30, 60, 90, 180, 365. Idan an tsallake wani, saita
   `milestone = true` (mai kira zai bayar da XP kuma ya bincika bajojin nasara).

### Lamurra na Musamman

- **Yankin lokaci**: jerin kwanaki suna amfani da kwanakin UTC (`new Date().toISOString().slice(0, 10)`).
  An yi wannan da gangan — amfani da yankin lokaci guda na bai ɗaya yana hana yin magudi ta
  hanyar sauya yankunan lokaci.
- **Sabbin masu amfani**: babu rikodin jerin kwanaki; buƙatar farko tana ƙirƙirar shi da
  `current=1, longest=1, lastDate=today`.
- **Buƙatu da yawa a rana**: buƙatar farko kaɗai ta ranar UTC ce
  ke ƙara jerin kwanakin.

---

## Teburin Matsayi

**Fayil:** `src/lib/gamification/leaderboard.ts`

### Iyakoki

| Iyaka           | Lokaci  | Bayani                                                                                   |
| --------------- | ------- | ---------------------------------------------------------------------------------------- |
| `global`        | `all`   | Jimillar XP ta dukkan lokaci                                                             |
| `weekly`        | `week`  | XP da aka samu a makon UTC na yanzu (Litinin-Lahadi)                                     |
| `monthly`       | `month` | XP da aka samu a watan UTC na yanzu                                                      |
| `tokens_shared` | `all`   | Jimillar token da aka tura wa wasu                                                       |
| `contributions` | `all`   | Combos da aka ƙirƙira + providers da aka yi amfani da su + skills da aka yi amfani da su |

### Lissafin Matsayi

Ana **lissafa matsayi a lokacin karantawa**, ba a adana shi ba. Wannan yana hana bayanan matsayi zama tsofaffi
kuma yana kawar da buƙatar ayyukan sake lissafa matsayi lokaci-lokaci.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

Tsarin tambaya:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### Juyawar Lokaci

Teburan matsayi na mako-mako da na wata-wata suna juyawa ta atomatik:

1. **Adanawa a taska**: a iyakar lokaci, kwafi bayanan yanzu zuwa
   `leaderboard_archive` tare da alamar lokacin.
2. **Sake saiti**: share bayanan lokacin da ya ƙare.
3. **Mai tayar da aiki**: ana dubawa a kowane kiran `updateLeaderboard()`; buƙatar farko
   ta sabon lokaci ce ke tayar da juyawar.

Wannan yana tabbatar da cewa teburan mako-mako suna sake saiti kowace Litinin da ƙarfe 00:00 UTC, yayin da teburan wata-wata
suke sake saiti a ranar 1 ga kowane wata.

### Sabuntawar Lokaci-Gaskiya ta SSE

**Endpoint:** `GET /api/gamification/stream`

```
Abokin hulɗa → GET /api/gamification/stream
  → An kafa haɗin SSE
  → Sabar tana aika hoton bayanai na manyan matsayi 10 nan take
  → Kowane daƙiƙa 5: tura sabbin manyan matsayi 10 idan sun canza
  → Kowane daƙiƙa 15: sharhin heartbeat (": heartbeat\n\n")
  → Abokin hulɗa ya yanke haɗi → tsaftacewa (cire mai sauraro)
```

Tsarin aukuwa:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

Manajan SSE yana bibiyar abokan hulɗa masu haɗi bisa ga kowane iyaka kuma yana aika sabuntawa ne kawai
idan bayanan teburin matsayi sun canza da gaske tun bayan turawa ta ƙarshe.

---

## Raba Token

**Fayil:** `src/lib/gamification/sharing.ts`

### Littafin Lissafi Mai Shigarwa Biyu

Kowane canja wuri yana ƙirƙirar layuka biyu a cikin `token_ledger`:

| Layi      | `from_key_id` | `to_key_id` | `amount` |
| --------- | ------------- | ----------- | -------- |
| Cire kuɗi | mai aikawa    | mai karɓa   | +amount  |
| Ƙara kuɗi | mai karɓa     | mai aikawa  | -amount  |

Dakata — ƙa'idar ita ce:

| Layi   | `from_key_id` | `to_key_id` | `amount` | Ma'ana                     |
| ------ | ------------- | ----------- | -------- | -------------------------- |
| Aikawa | mai aikawa    | mai karɓa   | +amount  | Fitar kuɗi daga mai aikawa |
| Karɓa  | mai karɓa     | mai aikawa  | +amount  | Shigar kuɗi ga mai karɓa   |

Ana ƙididdige ma'auni kamar haka:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Tsarin Canja Wuri

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Tabbatarwa**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **Rashin maimaituwar aiki**: bincika ko `idempotency_key` ya riga ya kasance a cikin littafin lissafi.
   Idan haka ne, mayar da sakamakon da aka adana.
3. **Mu'amala** (mu'amalar SQLite guda ɗaya):
   a. Ƙididdige ma'aunin mai aikawa.
   b. Idan `balance < amount`, dakatar (kuɗi ba su isa ba).
   c. Saka layin aikawa (`from=sender,`.

### Iyakance Ƙima

- Mafi yawa canja wuri 10 a minti ga kowane API key.
- Mafi yawa token 10,000 a canja wuri guda.
- Mafi yawa token 100,000 da aka canja a rana ga kowane API key.

---

## Gayyata da Fansar Token

**Fayil:** `src/lib/gamification/invites.ts`

### Tsarin Lamba

- **Lamba**: haruffa da lambobi 8 (misali, `A3K9-X7M2`), mai sauƙin karantawa ga mutum,
  ana nuna shi ga mai amfani.
- **Token**: token bazuwar mai byte 32, ana adana shi a matsayin hash na SHA-256. Ana amfani da shi don
  fansa ta shirye-shirye (misali, hanyoyin URL).

### Ma'ajiya

| Ginshiƙi     | Ƙima                                   |
| ------------ | -------------------------------------- |
| `code`       | `A3K9X7M2` (na musamman, mai fihirisa) |
| `token_hash` | SHA-256(raw_token)                     |

Ana mayar da ɗanyen token ga mai amfani sau ɗaya tak a lokacin ƙirƙirawa. OmniRoute
ba ya sake adanawa ko nuna shi — hash ɗin kawai ne yake wanzuwa.

### Hana Gayyatar Kai

Lokacin da mai amfani ya fanshi lamba, tsarin yana bincika:

1. Lambar mallakar wani `api_key_id` ne daban.
2. Mai amfani da ke fansa bai taɓa fansar kowace lamba daga mai gayyata ɗaya ba
   (ana haɗawa a kan `invite_tokens` + rajistar fansa).

Idan ɗaya daga cikin binciken ya gaza, ana ƙin fansar tare da saƙon kuskure bayyananne.

### Karewa da Iyakoki

- `max_uses` na asali: 10 (ana iya saita shi lokacin ƙirƙirawa).
- `expires_at` na asali: kwanaki 30 daga lokacin ƙirƙirawa.
- Lambobin da suka ƙare ko suka kai iyakar amfani suna mayar da HTTP 410 Gone.

---

## Haɗa Sabar Al'umma

**Fayil:** `src/lib/gamification/servers.ts`

### Haɗawa

Ana rajistar sabar al'umma ta hanyar token ɗin gayyata da sabar nesa ta bayar. Tsarin gida:

1. Yana karɓar token ɗin gayyata (misali, wanda aka liƙa a dashboard).
2. Yana kiran `POST /api/gamification/federation/leaderboard` a sabar nesa don tabbatar da token ɗin da kuma ɗauko jadawalin shugabanni na yanzu.
3. Yana adana rikodin sabar tare da `status: connected`.

### Samfurin Aiki Tare

Haɗin sabobi yana amfani da **daidaitawar sake rubutawa**, ba ta tarawa ba:

```
Tsarin Gida                   Sabar Al'umma
     │                              │
     ├── tura maki ────────────────►│  POST /federation/score
     │   { api_key_id, score }      │  (sabar tana tabbatar da hash ɗin token)
     │                              │
     ├── ɗauko jadawalin ──────────►│  GET /federation/leaderboard
     │◄── bayanan top-N ────────────┤  (yana sake rubuta cache na gida)
     │                              │
     └── binciken lafiya ──────────►│  GET /federation/health
         (kowane 60s, timeout 5s)   │
```

### Tantancewa

Buƙatun haɗin sabobi sun haɗa da:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

Sabar nesa tana yin hash na token ɗin sannan ta nemo layin `community_servers` da ya dace. Wannan yana kauce wa aika hash ɗin da aka adana.

### Sa-ido kan Lafiya

Kowane rikodin saba yana bibiyar:

| Filin       | Bayani                                                        |
| ----------- | ------------------------------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable`                        |
| `last_sync` | Hatimin lokaci na ISO na daidaitawa ta ƙarshe da ta yi nasara |
| `failures`  | Gazawar binciken lafiya a jere                                |

Bayan gazawa 5 a jere, matsayi yana canzawa zuwa `unreachable`, sannan a dakatar da daidaitawa har sai binciken lafiya da aka yi da hannu ya yi nasara.

---

## Hana Maguɗi

**Fayil:** `src/lib/gamification/antiCheat.ts`

### Ƙididdige Maki a Gefen Saba

Dukkan lissafin XP yana faruwa a cikin `src/lib/gamification/xp.ts`. Klantoci ba sa taɓa aika maki — suna aika ayyuka ne, sannan saba ta ƙididdige XP. Shafin `leaderboard.score` lambar da ke gefen saba ce kawai za ta iya rubuta shi.

### Iyakance Yawan Buƙatu

| Iyaka                        | Ƙima    | Fanni                  |
| ---------------------------- | ------- | ---------------------- |
| Matsakaicin XP a minti       | 1,000   | Ga kowane maɓallin API |
| Matsakaicin turawa a minti   | 10      | Ga kowane maɓallin API |
| Matsakaicin adadin turawa    | 10,000  | Ga kowace turawa       |
| Matsakaicin turawa na kullum | 100,000 | Ga kowane maɓallin API |

Iyakokin yawan buƙatu suna amfani da taga mai motsi da ke cikin ma’adanar ƙwaƙwalwa (irin tsarin `RateLimitManager` da ke cikin `open-sse/services/`). Idan tsarin ya sake farawa, yana koma amfani da ƙididdigogi masu tushen SQLite.

### Gano Abin da ya Kauce wa Ka'ida ta Z-Score

Ga kowane maɓallin API, tsarin yana kula da taga mai motsi ta kwanaki 7 na XP da aka samu a kowace awa. A duk lokacin bayar da XP:

1. Ƙididdige adadin XP na mai amfani na awa ta yanzu.
2. Ƙididdige matsakaicin jama'a da karkacewar ma'auni.
3. Ƙididdige `z = (user_rate - mean) / stddev`.
4. Idan `z > 3.0` (karkacewar ma'auni 3), a yi masa alamar abin da ya kauce wa ka'ida.

Ana shigar da abubuwan da suka kauce wa ka'ida cikin `xp_audit_log` tare da `action = 'anomaly_detected'`, sannan a nuna su a dashboard na mai gudanarwa.

### Tarihin Bincike

Ana shigar da kowace bayar da XP, turawa, samun lamba, da gano abin da ya kauce wa ka'ida cikin `xp_audit_log` tare da:

| Filin        | Bayani                                                     |
| ------------ | ---------------------------------------------------------- |
| `api_key_id` | Wane ne                                                    |
| `action`     | Abin da ya faru (xp_award, transfer, anomaly, …)           |
| `xp_awarded` | Adadi (0 ga abubuwan da ba na XP ba)                       |
| `metadata`   | JSON mai ɗauke da mahallin bayani (nau'in aiki, manufa, …) |
| `created_at` | Lokaci (ISO 8601)                                          |

Masu gudanarwa za su iya tambayar cikakken tarihin bincike ta hanyar `GET /api/gamification/anomalies`.

---

## Hanyoyin API

Duk hanyoyi suna bin daidaitaccen tsarin OmniRoute:

```
Hanya → Binciken farko na CORS → Tabbatar da jiki (Zod) → Tantancewa (extractApiKey)
  → Mai sarrafawa
```

### Wuraren shiga

| Hanya  | Path                                       | Bayani                                                    | Tantancewa    |
| ------ | ------------------------------------------ | --------------------------------------------------------- | ------------- |
| GET    | `/api/gamification/leaderboard`            | Sami jadawalin jagoranci (scope, period, pagination)      | Na zaɓi       |
| POST   | `/api/gamification/leaderboard`            | Tilasta sabunta ma'ajiyar jadawalin jagoranci             | Wajibi        |
| GET    | `/api/gamification/stream`                 | Sabuntawar jadawalin jagoranci na ainihin lokaci ta SSE   | Na zaɓi       |
| GET    | `/api/gamification/transfer`               | Sami tarihin turawa (pagination)                          | Wajibi        |
| POST   | `/api/gamification/transfer`               | Aika token ga wani mai amfani                             | Wajibi        |
| GET    | `/api/gamification/invite`                 | Jera lambobin gayyata na                                  | Wajibi        |
| POST   | `/api/gamification/invite`                 | Ƙirƙiri sabon lambar gayyata                              | Wajibi        |
| DELETE | `/api/gamification/invite`                 | Soke lambar gayyata                                       | Wajibi        |
| POST   | `/api/gamification/invite/redeem`          | Yi amfani da lambar gayyata                               | Wajibi        |
| GET    | `/api/gamification/servers`                | Jera sabar al'umma                                        | Wajibi        |
| POST   | `/api/gamification/servers`                | Haɗa zuwa sabar al'umma                                   | Wajibi        |
| DELETE | `/api/gamification/servers`                | Cire haɗi daga sabar al'umma                              | Wajibi        |
| POST   | `/api/gamification/federation/score`       | Tura maki zuwa sabar nesa                                 | Tarayya       |
| GET    | `/api/gamification/federation/leaderboard` | Ɗauko jadawalin jagoranci daga sabar nesa                 | Tarayya       |
| GET    | `/api/gamification/notifications`          | Sanarwar bajis/haɓaka mataki ta SSE                       | Wajibi        |
| GET    | `/api/gamification/anomalies`              | Duba rahotannin abubuwan da ba su saba ba (mai gudanarwa) | Mai gudanarwa |
| POST   | `/api/gamification/rotate`                 | Sauya sirrin token na gayyata                             | Wajibi        |

### Misalan Buƙata/Amsa

**POST /api/gamification/transfer**

```json
// Buƙata
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// Amsa 200
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

// Amsa 400 (rashin isassun kuɗi)
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

## Kayan Aikin MCP (8)

An yi rijistarsu a cikin `open-sse/mcp-server/` tare da kayan aikin da ake da su. An iyakance su ƙarƙashin
izinin `gamification`.

| Kayan Aiki                 | Bayani                                         | Tsarin Shigarwa              |           |
| -------------------------- | ---------------------------------------------- | ---------------------------- | --------- |
| `gamification_leaderboard` | Samu jadawalin jagoranci na iyaka/lokaci       | `{ scope, period?, limit? }` |
| `gamification_rank`        | Samu matsayin mai kira da maƙwabtansa          | `{ scope }`                  |
| `gamification_profile`     | Samu taƙaitaccen XP, mataki, take, da jere     | `{}`                         |
| `gamification_badges`      | Jera bajojin da aka samu ko duk ma’anoninsu    | `{ earned?: boolean }`       |
| `gamification_transfer`    | Aika token ga wani mai amfani                  | `{ to, amount }`             |
| `gamification_invite`      | Ƙirƙira ko jera lambobin gayyata               | `{ action: "create"          | "list" }` |
| `gamification_servers`     | Jera ko haɗa sabar al’umma                     | `{ action, token? }`         |
| `gamification_anomalies`   | Duba rahotannin rashin daidaito (izinin admin) | `{ limit?, since? }`         |

---

## Shafukan Dashboard

### `/dashboard/leaderboard`

- Nunin mumbari (manyan 3 tare da hotunan avatar da XP).
- Mai zaɓin iyaka: Na Duniya / Na Mako-mako / Na Wata-wata / Token da Aka Raba / Gudummawa.
- Tebur mai shafuka (25 a kowane shafi) tare da matsayi, suna, maki, mataki, da take.
- Sabuntawar SSE na ainihin lokaci — sauye-sauyen matsayi suna motsawa.
- Ana haskaka mai amfani na yanzu a cikin tebur tare da tsayayyen layin "Matsayinka".

### `/dashboard/profile`

- Sandar ci gaban XP tare da mataki na yanzu da iyakar mataki na gaba.
- Ana nuna bajon take a fili.
- Kundin baji — bajojin da aka samu tare da ranar samun su, yayin da waɗanda ba a samu ba suke dusashe
  (ɓoyayyun baji suna nuna "???" har sai an same su).
- Ma’aunin jere tare da alamar harshen wuta; kalandar jere (kwanaki 30 da suka gabata).
- Jadawalin tarihin XP (XP na kowace rana cikin kwanaki 30 da suka gabata).

### `/dashboard/tokens`

- Ragowar token (a bayyane, a saman shafi).
- Fom ɗin turawa: mai karɓa, adadi, akwatin tabbatarwa.
- Teburin tarihin turawa tare da matattara (an aika/an karɓa/duk).
- Sashen gayyata: lambobi masu aiki, ƙirƙiri sabo, raba hanyar haɗi.
- Sabar al’umma: jeri tare da matsayin lafiya, haɗawa/cire haɗi.

### `/dashboard/gamification/admin`

- Jerin rashin daidaito tare da tsanani, mai amfani, hatimin lokaci, da z-score.
- Mai duba kundin bincike tare da matattara (nau’in aiki, mai amfani, zangon kwanan wata).
- Ƙididdigar tsarin: jimillar XP da aka bayar, masu amfani masu aiki, ƙimar samun baji.
- Bayanin lafiyar sabar tarayya.

---

## Haɗawa da Pipeline

### Wurin Haɗawa

Gamification yana shiga cikin pipeline na buƙata a wuri guda a cikin
`open-sse/handlers/chatCore.ts`:

```typescript
// Bayan an aika amsa ga abokin hulɗa:
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
    // Aika-ba-tare-da-jira-ba: rubuta a kundi amma kada a taɓa isar da shi ga abokin hulɗa
  });
});
```

### Nau’ikan Event

| Nau’in Event        | Lokacin da Ake Fitar da Shi                               |
| ------------------- | --------------------------------------------------------- |
| `request.completed` | An aika amsar LLM cikin nasara                            |
| `provider.switch`   | An canza provider (komawa ga combo ma na ƙirga)           |
| `combo.created`     | An adana sabon saitin combo                               |
| `combo.used`        | An kai ga manufar combo cikin nasara                      |
| `badge.earned`      | Tantance baji ta sami daidaito                            |
| `streak.milestone`  | An tsallake iyakar jere                                   |
| `transfer.sent`     | An kammala tura token                                     |
| `referral.redeemed` | An yi amfani da lambar gayyata cikin nasara               |
| `compression.used`  | An yi amfani da matse prompt                              |
| `skill.executed`    | An kammala aiwatar da skill                               |
| `model.first_use`   | Ba a yi amfani da model cikin kwanaki 7 da suka gabata ba |

### Tabbacin Rashin Toshewa

Tsarin `setImmediate` + `.catch(() => {})` yana tabbatar da cewa:

1. Ana aika amsar gaba ɗaya kafin gamification ya fara aiki.
2. Kurakuran gamification ba sa taɓa bayyana ga abokin hulɗa.
3. Sarrafa event yana gudana a microtask na gaba, ba a layi ɗaya ba.

---

## Tsaro

### Samfurin Barazana

| Barazana                           | Matakin kariya                                                                        |
| ---------------------------------- | ------------------------------------------------------------------------------------- |
| Ƙara maki ta yaudara               | Ana ƙididdige XP a ɓangaren uwar garke kawai; kwastomomi suna aika ayyuka, ba maki ba |
| Hare-haren maimaitawa              | Maɓallan idempotency a kan turawa; cire maimaituwa daga kundin bincike                |
| Damfarar turawa                    | Kundin lissafi mai shigarwa biyu; mu'amaloli na atomik; iyakokin ƙima                 |
| Gayyatar kai                       | Sake duba `api_key_id` yayin fansa                                                    |
| Yin katsalandan ga teburin matsayi | Gano sabanin Z-score; allon sa ido kan sabani na mai gudanarwa                        |
| Satar token na federation          | Ajiya mai hash na SHA-256; ana nuna ɗanyen token sau ɗaya kawai                       |
| Gwajin ƙarfi kan lambobin gayyata  | Iyakance ƙima a maƙurar fansa; entropy mai haruffa 8                                  |
| XSS a sunayen nuni                 | An tsaftace sunayen nuni; an kubutar da shigarwar teburin matsayi                     |
| Hare-haren lokaci kan hashes       | `crypto.timingSafeEqual` don kwatanta hash na token                                   |

### Bukatun Tabbatar da Shaida

- **Na jama'a** (ba tare da tabbatar da shaida ba): `GET /leaderboard`, `GET /stream` (teburorin matsayi na karantawa kawai).
- **Ana buƙatar maɓallin API**: duk ayyukan rubutawa, bayanin martaba, turawa, gayyata.
- **Mai gudanarwa kawai**: allon sa ido kan sabani, mai duba kundin bincike.
- **Federation**: wata hanyar tabbatar da shaida ta daban da ke amfani da ɗanyen token a cikin kanun `Authorization`, ana inganta shi ta hanyar kwatantawa da hash na SHA-256 da aka adana.

---

## Gwaji

### Fayilolin Gwaji

Dukkan gwaje-gwaje suna amfani da mai gudanar da gwaji na asali na Node.js (`node --import tsx/esm --test`).

| Fayil ɗin Gwaji                               | Abubuwan da ya ƙunsa                         | Gwaje-gwaje |
| --------------------------------------------- | -------------------------------------------- | ----------- |
| `tests/unit/gamification/xp.test.ts`          | Ƙididdigar XP, lanƙwasar mataki, laƙabobi    | 8           |
| `tests/unit/gamification/badges.test.ts`      | Daidaita ƙa'idojin bajoji, bayarwa           | 10          |
| `tests/unit/gamification/streaks.test.ts`     | Ka'idar jere, manyan matakai, yanayi na gefe | 7           |
| `tests/unit/gamification/leaderboard.test.ts` | Ƙididdigar matsayi, rarraba shafuka, juyawa  | 8           |
| `tests/unit/gamification/sharing.test.ts`     | Turawa, ma'auni, idempotency                 | 9           |
| `tests/unit/gamification/invites.test.ts`     | Ƙirƙira, fansa, ƙarewar wa'adi, gayyatar kai | 7           |
| `tests/unit/gamification/antiCheat.test.ts`   | Iyakokin ƙima, z-score, yin rajistar bincike | 6           |
| `tests/unit/gamification/events.test.ts`      | Fitar da aukuwa, fan-out, sarrafa kurakurai  | 5           |

### Gudanar da Gwaje-gwaje

```bash
# Dukkan gwaje-gwajen gamification
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# Fayil ɗin gwaji guda ɗaya
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Bukatun Ɗaukar Gwaji

Bisa ga `CONTRIBUTING.md` — dole ne duk sabbin modules su kasance da:

- Ɗaukar rassa >= 80%.
- An gwada kowace public function aƙalla sau ɗaya.
- An gwada hanyoyin kurakurai (rashin isasshen ma'auni, lambobin da wa'adinsu ya ƙare, iyakokin ƙima).

---

## Tsarin Fayiloli

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # Duk tebura 8 + fihirisa
      gamification.ts                  # Manhajar CRUD ta fanni
    gamification/
      xp.ts                           # Lissafin XP, lanƙwasar mataki, laƙabobi
      badges.ts                       # Ma'anar bajuna, ƙa'idoji, tantancewa
      streaks.ts                      # Bibiyar jerin kwanaki na yau da kullum
      leaderboard.ts                  # Lissafin matsayi, SSE, juyawa
      antiCheat.ts                    # Ƙayyade adadin buƙatu, z-score, binciken rajista
      sharing.ts                      # Kundin canja wurin token
      invites.ts                      # Lambobin gayyata/fansa
      servers.ts                      # Tarayyar sabar al'umma
      events.ts                       # Mai fitar da aukuwar lamura (wurin haɗawa)
      notifications.ts                # Kwararar sanarwar SSE
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST na jadawalin shugabanni
        leaderboard/stream/route.ts   # Sabuntawar SSE kai-tsaye
        transfer/route.ts             # Canja wurin GET/POST
        invite/route.ts               # Lambobin gayyata na GET/POST/DELETE
        invite/redeem/route.ts        # POST na fansar lamba
        servers/route.ts              # Sabar GET/POST/DELETE
        federation/score/route.ts     # POST na tura maki
        federation/leaderboard/route.ts # GET na ɗauko jadawalin shugabanni
        notifications/route.ts        # Sanarwar SSE
        anomalies/route.ts            # GET na rahotannin abubuwan da ba su saba ba
        rotate/route.ts               # POST na juya sirrika
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Shafin martabobi
        profile/page.tsx               # Shafin XP/bajuna/jerin kwanaki
        tokens/page.tsx                # Shafin ma'auni/canja wuri/gayyata
        gamification/admin/page.tsx    # Sa-ido kan abubuwan da ba su saba ba na mai gudanarwa
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
    GAMIFICATION.md                    # Wannan takarda
```

---

## Dabarar Ƙaura

### Mataki na 1: Jigon Backend (PR 1)

- Ƙaura `060_create_gamification.sql` (tebura 8).
- `src/lib/db/gamification.ts` (manhajar fanni).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- Wurin haɗawa a cikin `chatCore.ts`.
- Gwaje-gwajen raka'a don XP, jerin kwanaki, da aukuwar lamura.

### Mataki na 2: Bajuna da Jadawalin Shugabanni (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Ma'anar bajuna a cikin constants.
- Hanyoyin API na jadawalin shugabanni + kwararar SSE.
- Gwaje-gwajen raka'a don bajuna da jadawalin shugabanni.

### Mataki na 3: Rabawa da Gayyata (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- Hanyoyin API na canja wuri + gayyata.
- Gwaje-gwajen raka'a don rabawa, gayyata, da hana maguɗi.

### Mataki na 4: Tarayya da Dashboard (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- Hanyoyin API na tarayya.
- Shafukan dashboard (jadawalin shugabanni, bayanan martaba, tokens, mai gudanarwa).
- Rijistar kayan aikin MCP.

---

## Abubuwan da Za a Yi La’akari da Su a Nan Gaba

- **Abubuwan da ke faruwa na yanayi**: tarin bajojin da aka iyakance lokacinsu da lokutan jadawalin jagoranci.
- **Jadawalin jagorancin ƙungiyoyi**: haɗa masu amfani rukuni-rukuni bisa ƙungiya ko combo.
- **Masu ninka XP**: ƙara XP a lokutan tallatawa.
- **Raba nasarori**: samar da katunan bajo da za a iya rabawa (hotunan OpenGraph).
- **Sanarwar turawa ta wayar hannu**: sanarwa masu amfani da webhook don abubuwan da suka shafi bajo/mataki.
- **API na jadawalin jagoranci**: API na jama'a don haɗin kai da wasu ɓangarori na uku.
