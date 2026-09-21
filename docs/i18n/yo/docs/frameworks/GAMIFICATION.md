# Gamification & Leaderboard System (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **Orísun òtítọ́:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Ìmúdójúìwọ̀n tó kẹ́yìn:** 2026-06-28 — v3.8.40

OmniRoute ní ìpele ìmúṣeré tó kọ́kọ́ dá lórí ẹ̀rọ agbègbè, èyí tó ń san àwọn aṣàmúlò lẹ́san fún
lílo pẹpẹ náà — ṣíṣe àwọn ìbéèrè, yíyan olùpèsè mìíràn, ṣíṣẹ̀dá
àwọn àkójọpọ̀, pínpín àwọn token, àti ṣíṣe àfikún sí àwùjọ. Gbogbo ipò wà nínú
SQLite; ìṣọ̀kan pẹ̀lú àwọn server àwùjọ jẹ́ ohun tí a lè yàn láti kópa nínú rẹ̀, ó sì dá lórí ìfìránṣẹ́.

A ṣe ètò náà láti jẹ́ **aláìní ìdádúró lójú ọ̀nà tó ń ṣiṣẹ́ jù lọ** — àwọn ìṣẹ̀lẹ̀ ìmúṣeré
ni a ń fi ránṣẹ́ láì dúró de èsì láti inú ọ̀nà ìṣètò ìbéèrè, wọn kì í sì í dí
èsì LLM kan lọ́wọ́ láéláé.

---

## Àkíyèsí Gbogbogbò

### Ète

Mú ìkópa àti ìdúróṣinṣin àwọn aṣàmúlò pọ̀ sí i nípa pípèsè ìlọsíwájú tí a lè rí (XP,
àwọn ìpele, àwọn àmì-ẹ̀yẹ), ẹ̀rí láwùjọ (àwọn tábìlì ipò), àti àwọn ìmúnilọ́kànlẹ̀ ọrọ̀-ajé (pínpín
token, àwọn ẹ̀san ìpè).

### Ibi Tó Kàn

| Ẹ̀yà               | Àpèjúwe                                                                   |
| ----------------- | ------------------------------------------------------------------------- |
| XP & Àwọn Ìpele   | Gba XP fún ìgbésẹ̀ kọ̀ọ̀kan; gòkè ìpele nípasẹ̀ ìlà ìdàgbàsókè polynomial     |
| Àwọn Àmì-ẹ̀yẹ      | Àṣeyọrí 20+ káàkiri ẹ̀ka 5 pẹ̀lú ìpele àìmọ́pọ̀ 4                             |
| Ìtẹ̀síwájú         | Ìtọ́pinpin lílo ojoojúmọ́ pẹ̀lú ìtẹ̀síwájú lọ́wọ́lọ́wọ́/tó gùn jù lọ              |
| Àwọn Tábìlì Ipò   | Àgbáyé, ọ̀sọ̀ọ̀sẹ̀, oṣooṣù, pínpín token, àti àwọn ibi àfikún                 |
| Pínpín Token      | Gbé kirẹditi láàárín àwọn aṣàmúlò nípasẹ̀ ìwé ìṣírò aláwọlé méjì           |
| Ìpè & Ìràpadà     | Àwọn kóòdù ìtọ́kasí pẹ̀lú ìpamọ́ hash SHA-256                                |
| Àwọn Server Àwùjọ | Ṣe ìṣọ̀kan pẹ̀lú àwọn instance OmniRoute ti òde                             |
| Ìdènà Ẹ̀tàn        | Ìṣírò àmì ní ẹ̀gbẹ́ server, dídín ìwọ̀n ìbéèrè kù, ìṣàwárí àìṣedéédé z-score |

### Àwọn Ìlànà Ìṣètò

1. **Agbègbè-lákọ̀ọ́kọ́** — gbogbo ipò wà nínú SQLite, kò sí iṣẹ́ ìta tí a nílò.
2. **Aláìdènà** — àwọn ìṣẹ̀lẹ̀ ni a ń fi ránṣẹ́ láì dúró de èsì; ọ̀nà èsì LLM
   kì í ní ìdádúró rárá nítorí ọgbọ́n ìmúṣeré.
3. **Server ló ní àṣẹ** — ẹ̀gbẹ́ server nìkan ni a ti ń ṣírò XP; àwọn client kò lè
   fi ẹ̀tàn mú àwọn àmì wọn pọ̀ sí i.
4. **Bíbọ̀wọ̀ fún àṣírí** — ìkópa nínú tábìlì ipò jẹ́ ohun tí a lè yàn láti ṣe; àwọn aṣàmúlò lè
   fi prófáìlì wọn pamọ́.
5. **Ṣíṣe tán fún ìṣọ̀kan** — àwọn server àwùjọ lè fi àwọn àmì ránṣẹ́ nípasẹ̀ API tí a fọwọ́ sí;
   ìmúṣiṣẹ́pọ̀ jẹ́ kíkọ lórí èyí tó wà tẹ́lẹ̀, kì í ṣe àfikún.

---

## Ìkọ́lé Ètò

### Ìṣàn Ìpele Gíga

```
Ìbéèrè Client
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (ọ̀nà ìṣètò tó ti wà tẹ́lẹ̀) ...
      → a fi èsì upstream ránṣẹ́ sí client
      → setImmediate (firánṣẹ́-láì-dúró):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

Olùfiránṣẹ́ ìṣẹ̀lẹ̀ ni ojú-òpó ìṣọ̀kan kan ṣoṣo. `chatCore.ts` ń pe
`emitGamificationEvent()` lẹ́yìn tí a bá ti fi èsì ránṣẹ́; module ìṣẹ̀lẹ̀ náà ń pín iṣẹ́
sí àwọn ètò abẹ́ XP, ìtẹ̀síwájú, àmì-ẹ̀yẹ, tábìlì ipò, àti ìdènà ẹ̀tàn.

### Àwòrán Ìgbẹ́kẹ̀lé Module

```
src/lib/gamification/
  events.ts          ← ojú-òpó ìbẹ̀rẹ̀ (chatCore.ts ló ń pè é)
    ├── xp.ts        ← ìṣírò XP & ìpinnu ìpele
    ├── streaks.ts   ← ìtọ́pinpin ìtẹ̀síwájú ojoojúmọ́
    ├── badges.ts    ← àyẹ̀wò àwọn àbùdá àmì-ẹ̀yẹ
    ├── leaderboard.ts ← ìṣírò ipò & ìfìgbóhùnsáfẹ́fẹ́ SSE
    ├── antiCheat.ts ← dídín ìwọ̀n ìbéèrè kù & ìṣàwárí àìṣedéédé
    ├── sharing.ts   ← ìwé ìṣírò ìgbé-síwájú token
    ├── invites.ts   ← ìṣàkóso kóòdù ìpè/ìràpadà
    ├── servers.ts   ← ìṣọ̀kan server àwùjọ
    └── notifications.ts ← ìṣàn ìfitónilétí SSE

src/lib/db/
  gamification.ts    ← gbogbo àwọn iṣẹ́ CRUD (tábìlì 8)

src/app/api/gamification/
  leaderboard/       ← GET àwọn ipò, POST ìmúdójúìwọ̀n afọwọ́ṣe
  leaderboard/stream ← àwọn ìmúdójúìwọ̀n SSE ní àkókò gidi
  transfer/          ← GET ìtàn, POST fi àwọn token ránṣẹ́
  invite/            ← GET/POST àwọn kóòdù, DELETE fagilé
  invite/redeem/     ← POST ra kóòdù kan padà
  servers/           ← GET/POST/DELETE àwọn server àwùjọ
  federation/score/  ← POST fi àmì ránṣẹ́ sí server
  federation/leaderboard/ ← GET gba tábìlì ipò láti server
  notifications/     ← àwọn ìfitónilétí àmì-ẹ̀yẹ/ìgòkè-ìpele SSE
  anomalies/         ← GET àwọn ìròyìn àìṣedéédé (alábòójútó)
  rotate/            ← POST yí àwọn àṣírí token ìpè padà
```

---

## Ìpele Dátà

### Àwọn Tábìlì Àkójọpọ̀ Dátà

Gbogbo àwọn tábìlì wà nínú àkójọpọ̀ dátà SQLite àkọ́kọ́ ti OmniRoute, tí migration
`060_create_gamification.sql` ṣẹ̀dá. WAL journaling jẹ́ ogún láti ọ̀dọ̀ singleton
`getDbInstance()` nínú `src/lib/db/core.ts`.

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

### Módùlù Àgbègbè: `src/lib/db/gamification.ts`

Ó tẹ̀lé àpẹẹrẹ boṣewa OmniRoute — ó ń ṣàgbéwọlé `getDbInstance()` láti
`core.ts`, ó sì ń kó àwọn iṣẹ́ CRUD onírúurú jáde. Kò sí SQL aláìlábòsí nínú àwọn route handler.

Àwọn iṣẹ́ pàtàkì:

| Iṣẹ́                        | Àpèjúwe                                                           |
| -------------------------- | ----------------------------------------------------------------- |
| `upsertLeaderboardEntry()` | Fi score sílẹ̀ tàbí ṣe é dójú ìwọ̀n fún (api_key_id, scope, period) |
| `getLeaderboard()`         | Àwọn ipò tí a pín sí ojú-ìwé fún scope/period kan                 |
| `getUserLevel()`           | Gba tàbí ṣẹ̀dá àkọsílẹ̀ level olumulo                               |
| `updateUserLevel()`        | Ṣètò XP, level, àti title papọ̀ gẹ́gẹ́ bí ìṣẹ̀lẹ̀ kan                  |
| `getBadgeDefinitions()`    | Gbogbo àwọn ìtumọ̀ badge (pẹ̀lú àṣàyàn láti ṣe àlẹ̀mọ́)               |
| `getUserBadges()`          | Àwọn badge tí olumulo kan ti rí gbà                               |
| `awardBadge()`             | Fi ìrígbà badge sílẹ̀ (idempotent lórí badge_id)                   |
| `logXpAction()`            | Ṣàfikún sí xp_audit_log                                           |
| `getXpAuditLog()`          | Ìtàn àyẹ̀wò tí a pín sí ojú-ìwé fún olumulo kan                    |
| `insertLedgerEntry()`      | Ìfiránṣẹ́ àkọsílẹ̀-méjì (nínú transaction)                          |
| `getBalance()`             | Àpapọ̀ ohun tí olumulo gbà, yọ ohun tí ó fi ránṣẹ́                  |
| `getTransferHistory()`     | Àkọsílẹ̀ ìfiránṣẹ́ tí a pín sí ojú-ìwé                              |
| `createInviteToken()`      | Fi invite code + token tí a ti ṣe hash sílẹ̀                       |
| `redeemInviteToken()`      | Wá pẹ̀lú code, fìdí rẹ̀ múlẹ̀, kí o sì mú uses pọ̀ sí i               |
| `upsertCommunityServer()`  | Forúkọsílẹ̀ tàbí ṣe federation server kan dójú ìwọ̀n                |
| `getCommunityServers()`    | Ṣàkójọ àwọn server fún olumulo kan                                |
| `deleteCommunityServer()`  | Yọ ìforúkọsílẹ̀ server kan kúrò                                    |

---

## Ètò XP / Ìpele

**Fáìlì:** `src/lib/gamification/xp.ts`

### Ìlà Ìdàgbàsókè Ìpele

XP tí a nílò láti dé ìpele `n` ń tẹ̀lé ìlà polynomial:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Ìpele | XP sí Èyí Tó Kàn | Àpapọ̀ XP  | Àkọlé   |
| ----- | ---------------- | --------- | ------- |
| 1     | 100              | 100       | Olùbẹ̀rẹ̀ |
| 5     | 1,118            | 2,415     | Olùbẹ̀rẹ̀ |
| 10    | 3,162            | 10,523    | Aṣàwárí |
| 25    | 12,500           | 86,024    | Aṣàwárí |
| 50    | 35,355           | 345,529   | Amòye   |
| 75    | 64,952           | 948,683   | Ọ̀gá     |
| 100   | 100,000          | 2,050,000 | Àròsọ   |

### Àwọn Àkọlé

| Ààlà Ìpele | Àkọlé   |
| ---------- | ------- |
| 1 – 9      | Olùbẹ̀rẹ̀ |
| 10 – 24    | Aṣàwárí |
| 25 – 49    | Amòye   |
| 50 – 74    | Ọ̀gá     |
| 75 – 100   | Àròsọ   |

### Àwọn Ẹ̀bùn XP

| Ìṣe               | XP  | Àpèjúwe                                                           |
| ----------------- | --- | ----------------------------------------------------------------- |
| `request`         | 1   | Fún ìbéèrè API kọ̀ọ̀kan tí a darí gba inú OmniRoute                 |
| `provider_switch` | 5   | Yíyípadà sí olupèsè mìíràn                                        |
| `model_switch`    | 3   | Yíyípadà sí àwòṣe mìíràn                                          |
| `combo_create`    | 10  | Ṣíṣe combo tuntun                                                 |
| `combo_use`       | 2   | Lílo combo fún ìbéèrè kan                                         |
| `token_share`     | 1   | Fún token 1 000 kọ̀ọ̀kan tí a pín pẹ̀lú aṣàmúlò mìíràn               |
| `invite_redeem`   | 50  | Lílo kóòdù ìpè                                                    |
| `daily_login`     | 5   | Ìlò ojoojúmọ́ tó ń ṣiṣẹ́ (ẹ̀ẹ̀kan lójúmọ́)                             |
| `streak_bonus`    | 2   | Fún ọjọ́ streak kọ̀ọ̀kan tó tẹ̀ léra (a sọ di púpọ̀ pẹ̀lú gígùn streak) |
| `badge_unlock`    | 10  | Ṣíṣí badge kan                                                    |

### Ìṣàn Fífún Ẹ̀bùn

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. Wa `XP_REWARDS[action]` láti gba iye XP náà.
2. Gbé e kọjá `checkRateLimit()` (ààbò lòdì sí ẹ̀tàn: XP 1000/min ní ọ̀pọ̀ jù lọ fún kọ́kọ́rọ́ kọ̀ọ̀kan).
3. Ṣí transaction kan:
   - Ka row `user_levels` lọ́wọ́lọ́wọ́.
   - Ṣàfikún XP; tún ìpele ṣe nípasẹ̀ `levelFromXp(totalXp)`.
   - Bí ìpele bá yí padà, ṣètò `levelUp = true`.
   - Ṣe ìmúdójúìwọ̀n row `user_levels`.
   - Fi sí inú `xp_audit_log`.
4. Dá àbájáde padà. Olùpè ló ń bójú tó àwọn ìfitónilétí.

### Olùrànlọ́wọ́: `levelFromXp(totalXp)`

Ó ń yí ká láti ìpele 1..100, ní ṣíṣàpapọ̀ `xp_for_level(n)` títí tí àpapọ̀ XP
yóò fi kọjá `totalXp`. Ó dá ìpele tó ga jù lọ tí a ti pé ààlà rẹ̀ padà.
Èyí jẹ́ O(100) — ó ṣeé gbà nítorí pé ìpele dúró ní 100 gẹ́gẹ́ bí òpin.

---

## Ètò Badge

**Fáìlì:** `src/lib/gamification/badges.ts`

### Àwọn Ẹ̀ka

| Ẹ̀ka            | Àpèjúwe                                       | Àwọn Àpẹẹrẹ Badge                |
| -------------- | --------------------------------------------- | -------------------------------- |
| `usage`        | Àwọn àmì-àṣeyọrí tó dá lórí iye ìlò           | Ìbéèrè Àkọ́kọ́, Ìbéèrè 1K, 100K    |
| `sharing`      | Pípín token àti àwọn ìtọ́kasí                  | Pípín Àkọ́kọ́, Ọ̀làwọ́ (pípín 10)    |
| `contribution` | Ìkópa nínú àwùjọ                              | Olùṣẹ̀dá Combo, Aṣàwárí Olùpèsè   |
| `streak`       | Ìdúróṣinṣin bí àkókò ti ń lọ                  | Akíkanjú Ọ̀sẹ̀, Olùfọkànsìn Oṣooṣù |
| `rare`         | Àwọn àṣeyọrí tó ṣòro láti rí tàbí tó farapamọ́ | Olùgbà Tètè, Olùjábọ̀ Bug         |

### Àwọn Ìwọ̀n Àìwọ́pọ̀

| Ìwọ̀n Àìwọ́pọ̀ | Àwọ̀     | Àmì Ìṣeeṣe               |
| ----------- | ------- | ------------------------ |
| `common`    | Eérú    | Ọ̀pọ̀ jù lọ àwọn aṣàmúlò   |
| `uncommon`  | Àwọ̀ ewé | Àwọn aṣàmúlò tó ń ṣiṣẹ́   |
| `rare`      | Búlúù   | Àwọn aṣàmúlò olùfọkànsìn |
| `legendary` | Gòòlù   | 1% tó ga jù lọ           |

### Àwọn Irú Àmúyẹ

| Irú            | Field        | Àpèjúwe                                            |
| -------------- | ------------ | -------------------------------------------------- |
| `action_count` | `count`      | Ṣe ìṣe náà ní ìgbà N (fún àpẹẹrẹ, ìbéèrè 1000)     |
| `streak`       | `days`       | Pa streak mọ́ fún ọjọ́ N tó tẹ̀ léra                  |
| `unique_count` | `field`, `n` | Lo àwọn iye ọ̀tọ̀ọ̀tọ̀ N (fún àpẹẹrẹ, àwòṣe ọ̀tọ̀ọ̀tọ̀ 10) |
| `rank`         | `scope`, `n` | Dé ipò N lórí scope leaderboard kan                |
| `first`        | —            | Jẹ́ ẹni àkọ́kọ́ láti ṣe ìṣe kan                       |
| `hidden`       | (ó yàtọ̀)     | Àwọn àmúyẹ kì í hàn títí tí a ó fi rí wọn gbà      |

Àwọn ìtumọ̀ badge ni a tọ́jú sínú `badge_definitions` gẹ́gẹ́ bí JSON `criteria`:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Ìṣàn Ìṣàyẹ̀wò

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # gbogbo àwọn ìtumọ̀
    → getUserBadges(apiKeyId)         # èyí tí a ti rí gbà tẹ́lẹ̀ (fojú kọ)
    → fún badge kọ̀ọ̀kan tí a kò tíì rí gbà:
       → matchesCriteria(badge, event, userState)
       → bí ó bá bá mu: awardBadge(apiKeyId, badgeId)
         → dá payload ìfitónilétí padà
```

Ìṣàyẹ̀wò náà jẹ́ èyí tí **event ń darí** — ó máa ń ṣiṣẹ́ lẹ́yìn event gamification kọ̀ọ̀kan, ṣùgbọ́n
ó ń ṣàyẹ̀wò kìkì àwọn badge tí `criteria.type` wọn bá ìṣe event náà mu. Èyí
ń jẹ́ kí ìṣàyẹ̀wò yára (< 5ms fún ọ̀pọ̀ jù lọ àwọn event).

### `matchesCriteria(badge, event, userState)`

| Irú Àmúyẹ      | Ìṣàyẹ̀wò                                           |
| -------------- | ------------------------------------------------- |
| `action_count` | `getActionCount(apiKeyId, action) >= count`       |
| `streak`       | `getCurrentStreak(apiKeyId) >= days`              |
| `unique_count` | `getUniqueCount(apiKeyId, field) >= n`            |
| `rank`         | `getRank(apiKeyId, scope) <= n`                   |
| `first`        | Kò sí àkọsílẹ̀ `xp_audit_log` tẹ́lẹ̀ fún irú ìṣe yìí |
| `hidden`       | Ó fi í lé ìṣàyẹ̀wò abẹ́ tó yẹ lọ́wọ́                  |

### Àwọn Badge Tí A Kọ́ Sínú Ètò (20+)

<details>
<summary>Àkójọ badge kíkún</summary>

| Àmì Ẹ̀yẹ            | Ẹ̀ka       | Ìṣọ̀wọ́n  | Àwọn Àǹfààní              |
| ------------------ | --------- | ------- | ------------------------- |
| Ìgbésẹ̀ Àkọ́kọ́       | lílò      | wọ́pọ̀    | ìbéèrè 1                  |
| Bíbẹ̀rẹ̀ Sí Ní Múra  | lílò      | wọ́pọ̀    | ìbéèrè 100                |
| Olùlò Alágbára     | lílò      | kò wọ́pọ̀ | ìbéèrè 1,000              |
| Ọ̀gágun Ọgọ́rùn-ún   | lílò      | ṣọ̀wọ́n   | ìbéèrè 10,000             |
| Agbára Gbogbo      | lílò      | àròsọ   | ìbéèrè 100,000            |
| Olùyí Olùpèsè      | ìkópa     | wọ́pọ̀    | Lo olùpèsè oríṣìíríṣìí 5  |
| Ọ̀gá Olùpèsè        | ìkópa     | kò wọ́pọ̀ | Lo olùpèsè oríṣìíríṣìí 20 |
| Oníṣẹ̀dá Àpapọ̀      | ìkópa     | kò wọ́pọ̀ | Ṣẹ̀dá àpapọ̀ 5              |
| Àgbà Ọ̀gá Àpapọ̀     | ìkópa     | ṣọ̀wọ́n   | Ṣẹ̀dá àpapọ̀ 25             |
| Pípín Àkọ́kọ́        | pípín     | wọ́pọ̀    | ìfìjísí àmì 1             |
| Ọ̀làwọ́              | pípín     | kò wọ́pọ̀ | ìfìjísí àmì 10            |
| Olùṣeun            | pípín     | ṣọ̀wọ́n   | Fi àpapọ̀ àmì 10,000 jíṣẹ́  |
| Olùtọ́kasí          | pípín     | wọ́pọ̀    | ìtọ́kasí aláṣeyọrí 1       |
| Olùkọ́ Nẹ́tíwọ́ọ̀kì    | pípín     | kò wọ́pọ̀ | ìtọ́kasí aláṣeyọrí 10      |
| Akọni Ọ̀sẹ̀          | ìtẹ̀síwájú | kò wọ́pọ̀ | ìtẹ̀síwájú ọjọ́ 7           |
| Olùfọkànsìn Oṣooṣù | ìtẹ̀síwájú | ṣọ̀wọ́n   | ìtẹ̀síwájú ọjọ́ 30          |
| Aláìṣeédúró        | ìtẹ̀síwájú | àròsọ   | ìtẹ̀síwájú ọjọ́ 365         |
| Olùgbà Tètè        | ṣọ̀wọ́n     | àròsọ   | Darapọ̀ ní àkókò beta      |
| Aṣáájú Ìfúnpọ̀      | ṣọ̀wọ́n     | kò wọ́pọ̀ | Lo ìfúnpọ̀ ní ìgbà 100     |
| Alákójọpọ̀ Ọgbọ́n    | ṣọ̀wọ́n     | ṣọ̀wọ́n   | Lo ọgbọ́n oríṣìíríṣìí 10   |
| Olùṣàwárí Àwòṣe    | ìkópa     | kò wọ́pọ̀ | Lo àwòṣe oríṣìíríṣìí 15   |

</details>

---

## Olùtọpa Ìtẹ̀síwájú Ọjọ́

**Fáìlì:** `src/lib/gamification/streaks.ts`

### Àwòṣe Dátà

A máa ń tọ́jú ìtẹ̀síwájú ọjọ́ sínú tábìlì `key_value` (tábìlì ohun èlò tí a jọ ń lò) lábẹ́ àwọn kọ́kọ́rọ́ tí a pín sí ààyè-orúkọ:

| Kọ́kọ́rọ́                        | Iye                              | Àpèjúwe                  |
| ----------------------------- | -------------------------------- | ------------------------ |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Dátà ìtẹ̀síwájú tó ń ṣiṣẹ́ |

### Ìlànà Ìṣiṣẹ́

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Ka àkọsílẹ̀ ìtẹ̀síwájú láti inú `key_value`.
2. Túmọ̀ `{current}`, `{longest}`, `{lastDate}` (okùn ọjọ́ ISO).
3. Tí `lastDate === today` — kò sí ìyípadà (a ti kà á fún òní).
4. Tí `lastDate === yesterday` — fi ọ̀kan kún `current`; ṣàfikún `longest` bí ó bá yẹ.
5. Tí `lastDate < yesterday` — tún `current = 1` ṣètò (ìtẹ̀síwájú ti dáwọ́ dúró).
6. Kọ àkọsílẹ̀ tí a ti ṣàfikún.
7. Ṣàyẹ̀wò àwọn àmì-ìpele: ọjọ́ 7, 14, 30, 60, 90, 180, 365. Tí a bá kọjá ọ̀kan, ṣètò
   `milestone = true` (olùpè yóò fúnni ní XP, yóò sì ṣàyẹ̀wò àwọn báàjì).

### Àwọn Ìṣẹ̀lẹ̀ Pàtàkì

- **Àgbègbè àkókò**: àwọn ìtẹ̀síwájú máa ń lo àwọn ọjọ́ UTC (`new Date().toISOString().slice(0, 10)`).
  Èyí jẹ́ ìmọ̀ọ́mọ̀ — àgbègbè àkókò àṣẹ kan ṣoṣo ń dènà lílo yíyí àgbègbè
  àkókò láti fọwọ́ ṣe ètò náà.
- **Àwọn aṣàmúlò tuntun**: kò sí àkọsílẹ̀ ìtẹ̀síwájú; ìbéèrè àkọ́kọ́ máa dá a sílẹ̀ pẹ̀lú
  `current=1, longest=1, lastDate=today`.
- **Ọ̀pọ̀ ìbéèrè lójúmọ́**: ìbéèrè àkọ́kọ́ nìkan ní ọjọ́ UTC ni
  yóò fi ọ̀kan kún ìtẹ̀síwájú náà.

---

## Tábìlì Àwọn Olórí

**Fáìlì:** `src/lib/gamification/leaderboard.ts`

### Àwọn Ààlà

| Ààlà            | Àkókò   | Àpèjúwe                                                |
| --------------- | ------- | ------------------------------------------------------ |
| `global`        | `all`   | Àpapọ̀ XP láti ìbẹ̀rẹ̀                                    |
| `weekly`        | `week`  | XP tí a rí gbà ní ọ̀sẹ̀ UTC lọ́wọ́lọ́wọ́ (Ajé-Àìkú)          |
| `monthly`       | `month` | XP tí a rí gbà ní oṣù UTC lọ́wọ́lọ́wọ́                     |
| `tokens_shared` | `all`   | Àpapọ̀ àwọn token tí a fi ránṣẹ́ sí àwọn ẹlòmíràn        |
| `contributions` | `all`   | Àwọn combo tí a ṣẹ̀dá + àwọn provider àti skill tí a lò |

### Ìṣírò Ipò

A máa ń **ṣírò àwọn ipò ní àkókò kíkà**, a kì í tọ́jú wọn. Èyí ń yẹra fún dátà ipò
tí ó ti pé, ó sì mú kí iṣẹ́ àtúnṣírò ipò lẹ́ẹ̀kọ̀ọ̀kan má ṣe pọndandan.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

Àpẹẹrẹ ìbéèrè:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### Yíyí Àkókò Padà

Àwọn tábìlì olórí ọ̀sẹ̀ àti oṣù máa ń yí padà fúnra wọn:

1. **Pamọ́ sínú àpamọ́**: ní ààlà àkókò, ṣàdá àwọn ìkọ̀sílẹ̀ lọ́wọ́lọ́wọ́ sínú
   `leaderboard_archive` pẹ̀lú àmì àkókò náà.
2. **Tún ṣètò**: pa àwọn ìkọ̀sílẹ̀ fún àkókò tí ó ti parí rẹ́.
3. **Ìmúṣiṣẹ́**: a máa ń ṣàyẹ̀wò rẹ̀ ní gbogbo ìgbà tí a bá pe `updateLeaderboard()`; ìbéèrè àkọ́kọ́
   ti àkókò tuntun máa ń mú yíyí náà ṣiṣẹ́.

Èyí ń rí i dájú pé àwọn tábìlì ọ̀sẹ̀ máa ń tún bẹ̀rẹ̀ ní gbogbo ọjọ́ Ajé ní 00:00 UTC, àwọn tábìlì
oṣù sì máa ń tún bẹ̀rẹ̀ ní ọjọ́ kìíní oṣù kọ̀ọ̀kan.

### Àwọn Àfikún SSE Ní Àkókò Gidi

**Ojú-òpó:** `GET /api/gamification/stream`

```
Oníbàárà → GET /api/gamification/stream
  → Ìsopọ̀ SSE ti bẹ̀rẹ̀
  → Server fi àwòrán lẹ́sẹ̀kẹsẹ̀ ti àwọn mẹ́wàá tó ga jù lọ nínú tábìlì olórí ránṣẹ́
  → Ní gbogbo ìṣẹ́jú-àáyá 5: fi àwọn mẹ́wàá tó ga jù lọ tí a ti ṣàfikún ránṣẹ́ bí wọ́n bá yí padà
  → Ní gbogbo ìṣẹ́jú-àáyá 15: àlàyé àmì pé ìsopọ̀ ṣì wà (": heartbeat\n\n")
  → Oníbàárà já ìsopọ̀ → ṣèwẹ̀fà (yọ olùgbọ́ kúrò)
```

Ìrísí ìṣẹ̀lẹ̀:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

Olùṣàkóso SSE ń tọpinpin àwọn oníbàárà tó sopọ̀ fún ààlà kọ̀ọ̀kan, ó sì máa ń fi àwọn àfikún
ránṣẹ́ nìkan nígbà tí dátà tábìlì olórí bá ti yí padà ní tòótọ́ látìgbà tí a ti fi í ránṣẹ́ kẹ́yìn.

---

## Pípín Token

**Fáìlì:** `src/lib/gamification/sharing.ts`

### Ìwé-Àkọsílẹ̀ Ẹnu-Ọ̀nà Méjì

Gbogbo ìfiránṣẹ́ ṣẹ̀dá ìlà méjì nínú `token_ledger`:

| Ìlà      | `from_key_id` | `to_key_id` | `amount` |
| -------- | ------------- | ----------- | -------- |
| Dẹ́bítì   | olùránṣẹ́      | olùgbà      | +amount  |
| Kírẹ́dítì | olùgbà        | olùránṣẹ́    | -amount  |

Dúró — àṣà tí a ń lò ni:

| Ìlà     | `from_key_id` | `to_key_id` | `amount` | Ìtumọ̀                       |
| ------- | ------------- | ----------- | -------- | --------------------------- |
| Firanṣẹ́ | olùránṣẹ́      | olùgbà      | +amount  | Ìṣàn jáde láti ọ̀dọ̀ olùránṣẹ́ |
| Gba     | olùgbà        | olùránṣẹ́    | +amount  | Ìṣàn wọlé sí ọ̀dọ̀ olùgbà     |

A ń ṣírò ìwọ̀ntúnwọ̀nsì báyìí:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Ìṣàn Ìfiránṣẹ́

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Ṣe ìfọwọ́sí**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **Àìyípadà-àbájáde**: ṣàyẹ̀wò bóyá `idempotency_key` ti wà tẹ́lẹ̀ nínú ìwé-àkọsílẹ̀.
   Tó bá rí bẹ́ẹ̀, dá àbájáde tí a fi pamọ́ padà.
3. **Ìdúnàádúrà** (ìdúnàádúrà SQLite kan ṣoṣo):
   a. Ṣírò ìwọ̀ntúnwọ̀nsì olùránṣẹ́.
   b. Tí `balance < amount`, fòpin sí i (owó kò tó).
   c. Ṣàfikún ìlà ìfiránṣẹ́ (`from=olùránṣẹ́,` padà.

### Dídín Ìwọ̀n Kù

- Ó pọ̀jù ìfiránṣẹ́ 10 fún ìṣẹ́jú kan fún kọ́kọ́rọ́ API kọ̀ọ̀kan.
- Ó pọ̀jù token 10,000 fún ìfiránṣẹ́ kan ṣoṣo.
- Ó pọ̀jù token 100,000 tí a lè fi ránṣẹ́ fún ọjọ́ kan fún kọ́kọ́rọ́ API kọ̀ọ̀kan.

---

## Àwọn Token Ìpè & Ìràpadà

**Fáìlì:** `src/lib/gamification/invites.ts`

### Ìrísí Kóòdù

- **Kóòdù**: àkójọpọ̀ lẹ́tà àti nọ́ńbà oníàmì 8 (fún àpẹẹrẹ, `A3K9-X7M2`), tí ènìyàn lè kà,
  tí a sì ń fi hàn sí olumulo.
- **Token**: token aláìlẹ́sẹ̀-n-tẹ̀ 32-byte, tí a tọ́jú gẹ́gẹ́ bí hash SHA-256. A ń lò ó fún
  ìràpadà ètò (fún àpẹẹrẹ, àwọn ìjápọ̀ URL).

### Ìtọ́jú

| Kọ́lámù       | Iye                             |
| ------------ | ------------------------------- |
| `code`       | `A3K9X7M2` (aláìlẹ́gbẹ́, indexed) |
| `token_hash` | SHA-256(raw_token)              |

A máa dá token àìṣẹ̀dá padà sí olumulo lẹ́ẹ̀kan ṣoṣo ní àkókò ìṣẹ̀dá. OmniRoute
kì í tọ́jú tàbí fi hàn mọ́ láé — hash nìkan ló máa ń wà títí.

### Ìdènà Ìtọ́kasí Ara-Ẹni

Nígbà tí olumulo bá rà kóòdù kan padà, ẹ̀rọ náà máa ń ṣàyẹ̀wò pé:

1. Kóòdù náà jẹ́ ti `api_key_id` mìíràn.
2. Olumulo tó ń rà á padà kò tíì ra kóòdù kankan láti ọ̀dọ̀
   olùtọ́kasí kan náà rí (joins lórí `invite_tokens` + àkọsílẹ̀ ìràpadà).

Tí èyíkéyìí nínú àwọn àyẹ̀wò náà bá kùnà, a ó kọ ìràpadà náà pẹ̀lú ìfiránṣẹ́ àṣìṣe tó ṣe kedere.

### Ìparí Àkókò & Àwọn Ààlà

- `max_uses` àìyípadà: 10 (a lè ṣètò rẹ̀ nígbà ìṣẹ̀dá).
- `expires_at` àìyípadà: ọjọ́ 30 láti ìgbà ìṣẹ̀dá.
- Àwọn kóòdù tí àkókò wọn ti parí tàbí tí a ti lò tán máa dá HTTP 410 Gone padà.

---

## Ìsopọ̀ Àwọn Sẹ́ńfà Àwùjọ

**Fáìlì:** `src/lib/gamification/servers.ts`

### Ìsopọ̀

A forúkọ sílẹ̀ sẹ́ńfà àwùjọ nípasẹ̀ àmì ìpè tí sẹ́ńfà jíjìnnà náà fúnni. Ẹ̀dà agbègbè náà:

1. Gba àmì ìpè náà (fún àpẹẹrẹ, èyí tí a lẹ̀ mọ́ inú pánẹ́ẹ̀lì ìṣàkóso).
2. Pe `POST /api/gamification/federation/leaderboard` lórí sẹ́ńfà jíjìnnà náà láti fìdí àmì náà múlẹ̀ àti láti gba àtòjọ àwọn olórí lọ́wọ́lọ́wọ́.
3. Fi àkọsílẹ̀ sẹ́ńfà náà pamọ́ pẹ̀lú `status: connected`.

### Àwòṣe Ìṣiṣẹ́pọ̀

Ìsopọ̀ náà ń lo **ìṣiṣẹ́pọ̀ àtúnkọ**, kì í ṣe àfikún:

```
Ẹ̀dà Agbègbè                 Sẹ́ńfà Àwùjọ
     │                              │
     ├── fi àmì ránṣẹ́ ────────────►│  POST /federation/score
     │   { api_key_id, score }      │  (sẹ́ńfà ń fìdí háṣì àmì múlẹ̀)
     │                              │
     ├── gba àtòjọ olórí ──────────►│  GET /federation/leaderboard
     │◄── àwọn àkọsílẹ̀ top-N ──────┤  (ó tún kàṣe agbègbè kọ)
     │                              │
     └── àyẹ̀wò ìlera ─────────────►│  GET /federation/health
         (ní gbogbo 60s, àsìkò ìdádúró 5s) │
```

### Ìfàṣẹsí

Àwọn ìbéèrè ìsopọ̀ náà ní:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

Sẹ́ńfà jíjìnnà náà ń ṣe háṣì àmì náà, ó sì ń wá ìlà `community_servers` tó bá a mu. Èyí ń yẹra fún fífi háṣì tí a ti tọ́jú ránṣẹ́.

### Àbójútó Ìlera

Àkọsílẹ̀ sẹ́ńfà kọ̀ọ̀kan ń tọpinpin:

| Pápá        | Àpèjúwe                                       |
| ----------- | --------------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable`        |
| `last_sync` | Àmì-àkókò ISO ti ìṣiṣẹ́pọ̀ àṣeyọrí tó ṣẹ̀ṣẹ̀ wáyé |
| `failures`  | Àwọn ìkùnà àyẹ̀wò ìlera tó tẹ̀léra              |

Lẹ́yìn ìkùnà márùn-ún tó tẹ̀léra, ipò náà yí padà sí `unreachable`, a sì dá ìṣiṣẹ́pọ̀ dúró títí àyẹ̀wò ìlera afọwọ́ṣe yóò fi ṣàṣeyọrí.

---

## Ìdènà Ìjẹ́jẹ̀ẹ́

**Fáìlì:** `src/lib/gamification/antiCheat.ts`

### Ìṣírò Àmì Ní Ẹ̀gbẹ́ Sẹ́ńfà

Gbogbo ìṣírò XP ń wáyé nínú `src/lib/gamification/xp.ts`. Àwọn oníbàárà kì í fi àmì ránṣẹ́ láé — wọ́n ń fi àwọn ìgbésẹ̀ ránṣẹ́, sẹ́ńfà náà sì ń ṣírò XP. Kóòdù ẹ̀gbẹ́ sẹ́ńfà nìkan ló lè kọ sínú kọ́lámù `leaderboard.score`.

### Dídín Ìwọ̀n Ìbéèrè Kù

| Òpin                              | Iye     | Ààlà                  |
| --------------------------------- | ------- | --------------------- |
| XP tó pọ̀ jù lọ ní ìṣẹ́jú kan       | 1,000   | Fún kọ́kọ́rọ́ API kọ̀ọ̀kan |
| Ìfiránṣẹ́ tó pọ̀ jù lọ ní ìṣẹ́jú kan | 10      | Fún kọ́kọ́rọ́ API kọ̀ọ̀kan |
| Iye ìfiránṣẹ́ tó pọ̀ jù lọ          | 10,000  | Fún ìfiránṣẹ́ kọ̀ọ̀kan   |
| Ìfiránṣẹ́ ojoojúmọ́ tó pọ̀ jù lọ     | 100,000 | Fún kọ́kọ́rọ́ API kọ̀ọ̀kan |

Àwọn òpin ìbéèrè ń lo fèrèsé yíyọ inú ìrántí (àwòṣe kan náà bí `RateLimitManager` nínú `open-sse/services/`). Ó máa ń lo àwọn òǹkà tí SQLite ń ṣe àtìlẹ́yìn fún bí iṣẹ́ náà bá tún bẹ̀rẹ̀.

### Ìṣàwárí Àìṣe-déédé Pẹ̀lú Z-Score

Fún kọ́kọ́rọ́ API kọ̀ọ̀kan, ètò náà ń tọ́jú fèrèsé yíyọ ọlọ́jọ́ méje ti XP tí a rí gbà ní wákàtí kọ̀ọ̀kan. Ní gbogbo ìgbà tí a bá fúnni ní XP:

1. Ṣírò ìwọ̀n XP olùlò lọ́wọ́lọ́wọ́ fún wákàtí kan.
2. Ṣírò ìtumọ̀ àárín àti ìyapa boṣewa gbogbo àkójọpọ̀ náà.
3. Ṣírò `z = (user_rate - mean) / stddev`.
4. Bí `z > 3.0` (ìyapa boṣewa mẹ́ta), sàmì sí i gẹ́gẹ́ bí àìṣe-déédé.

A ń ṣe àkọsílẹ̀ àwọn àìṣe-déédé sínú `xp_audit_log` pẹ̀lú `action = 'anomaly_detected'`, a sì ń fi wọ́n hàn lórí pánẹ́ẹ̀lì ìṣàkóso alábòójútó.

### Ọ̀nà Àyẹ̀wò

Gbogbo fífúnni ní XP, ìfiránṣẹ́, rírí báàjì, àti ìṣàwárí àìṣe-déédé ni a ń ṣe àkọsílẹ̀ rẹ̀ sínú `xp_audit_log` pẹ̀lú:

| Pápá         | Àpèjúwe                                       |
| ------------ | --------------------------------------------- |
| `api_key_id` | Ta ni                                         |
| `action`     | Ohun tó ṣẹlẹ̀ (xp_award, transfer, anomaly, …) |
| `xp_awarded` | Iye (0 fún àwọn ìṣẹ̀lẹ̀ tí kì í ṣe XP)          |
| `metadata`   | JSON pẹ̀lú àyíká (irú ìgbésẹ̀, ibi àfojúsùn, …) |
| `created_at` | Ìgbà wo (ISO 8601)                            |

Àwọn alábòójútó lè ṣe ìbéèrè gbogbo ọ̀nà àyẹ̀wò náà nípasẹ̀ `GET /api/gamification/anomalies`.

---

## Àwọn Ọ̀nà API

Gbogbo ọ̀nà ń tẹ̀lé àpẹẹrẹ boṣewa OmniRoute:

```
Ọ̀nà → Àyẹ̀wò ìbẹ̀rẹ̀ CORS → Ìfọwọ́sí body (Zod) → Ìfàṣẹsí (extractApiKey)
  → Olùṣàkóso
```

### Àwọn Endpoint

| Ọ̀nà    | Path                                       | Àpèjúwe                                        | Ìfàṣẹsí    |
| ------ | ------------------------------------------ | ---------------------------------------------- | ---------- |
| GET    | `/api/gamification/leaderboard`            | Gba leaderboard (scope, period, pagination)    | Àṣàyàn     |
| POST   | `/api/gamification/leaderboard`            | Fipá mú cache leaderboard sọtun                | Dandan     |
| GET    | `/api/gamification/stream`                 | Àwọn ìmúdójúìwọ̀n leaderboard SSE ní àkókò gidi | Àṣàyàn     |
| GET    | `/api/gamification/transfer`               | Gba ìtàn transfer (pagination)                 | Dandan     |
| POST   | `/api/gamification/transfer`               | Fi token ránṣẹ́ sí olumulo mìíràn               | Dandan     |
| GET    | `/api/gamification/invite`                 | Ṣàkójọ àwọn code ìpè mi                        | Dandan     |
| POST   | `/api/gamification/invite`                 | Ṣẹ̀dá code ìpè tuntun                           | Dandan     |
| DELETE | `/api/gamification/invite`                 | Fagilé code ìpè kan                            | Dandan     |
| POST   | `/api/gamification/invite/redeem`          | Lo code ìpè kan                                | Dandan     |
| GET    | `/api/gamification/servers`                | Ṣàkójọ àwọn server àwùjọ                       | Dandan     |
| POST   | `/api/gamification/servers`                | Sopọ̀ mọ́ server àwùjọ kan                       | Dandan     |
| DELETE | `/api/gamification/servers`                | Já ìsopọ̀ kúrò lọ́dọ̀ server àwùjọ kan            | Dandan     |
| POST   | `/api/gamification/federation/score`       | Fi score ránṣẹ́ sí server jíjìnnà               | Federation |
| GET    | `/api/gamification/federation/leaderboard` | Fa leaderboard láti ibi jíjìnnà                | Federation |
| GET    | `/api/gamification/notifications`          | Àwọn ìfitónilétí badge/ìlọsíwájú-level SSE     | Dandan     |
| GET    | `/api/gamification/anomalies`              | Wo àwọn ìjábọ̀ àìbójúmu (admin)                 | Admin      |
| POST   | `/api/gamification/rotate`                 | Yí àwọn àṣírí token ìpè padà                   | Dandan     |

### Àwọn Àpẹẹrẹ Request/Response

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

// Response 400 (owó kò tó)
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

## Àwọn Irinṣẹ́ MCP (8)

A forúkọsílẹ̀ sínú `open-sse/mcp-server/` pẹ̀lú àwọn irinṣẹ́ tó ti wà tẹ́lẹ̀. A fi wọ́n sábẹ́
ààyè ìyọ̀ǹda `gamification`.

| Irinṣẹ́                     | Àpèjúwe                                        | Ètò Ìwọlé                    |           |
| -------------------------- | ---------------------------------------------- | ---------------------------- | --------- |
| `gamification_leaderboard` | Gba tábìlì aṣáájú fún ààyè/àsìkò kan           | `{ scope, period?, limit? }` |
| `gamification_rank`        | Gba ipò olùpè àti àwọn tó wà lẹ́gbẹ̀ẹ́ rẹ̀         | `{ scope }`                  |
| `gamification_profile`     | Gba àkótán XP, ipele, oyè, àti ọ̀wọ̀ọ̀wọ́ ọjọ́      | `{}`                         |
| `gamification_badges`      | Ṣàkójọ àwọn báàjì tí a ti rí tàbí gbogbo ìtumọ̀ | `{ earned?: boolean }`       |
| `gamification_transfer`    | Fi àwọn token ránṣẹ́ sí aṣàmúlò mìíràn          | `{ to, amount }`             |
| `gamification_invite`      | Ṣẹ̀dá tàbí ṣàkójọ àwọn kóòdù ìpè                | `{ action: "create"          | "list" }` |
| `gamification_servers`     | Ṣàkójọ tàbí sopọ̀ mọ́ àwọn server àwùjọ          | `{ action, token? }`         |
| `gamification_anomalies`   | Wo àwọn ìròyìn àìbáradé (ààyè admin)           | `{ limit?, since? }`         |

---

## Àwọn Ojú-ìwé Dashboard

### `/dashboard/leaderboard`

- Ìfihàn pódíọ́mù (àwọn mẹ́ta tó ga jù pẹ̀lú avatar àti XP).
- Olùyan ààyè: Àgbáyé / Ọ̀sọ̀ọ̀sẹ̀ / Oṣooṣù / Àwọn Token Tí A Pín / Àwọn Àfikún.
- Tábìlì oníṣojú-ìwé (25 ní ojú-ìwé kọ̀ọ̀kan) pẹ̀lú ipò, orúkọ, àmì, ipele, àti oyè.
- Àwọn ìmúdójúìwọ̀n SSE ní àsìkò gidi — àwọn ìyípadà ipò máa ń rìn lọ́nà àwòrán.
- A ṣe àmì sí aṣàmúlò lọ́wọ́lọ́wọ́ nínú tábìlì pẹ̀lú ìlà alámọ̀ọ́mọ́ "Ipò Rẹ".

### `/dashboard/profile`

- Ọ̀pá ìlọsíwájú XP pẹ̀lú ipele lọ́wọ́lọ́wọ́ àti ààlà ipele tó kàn.
- A fi báàjì oyè hàn ní gbangba.
- Àkójọpọ̀ báàjì — àwọn báàjì tí a ti rí pẹ̀lú ọjọ́ tí a rí wọn, àwọn tí a kò tíì rí sì dúdú-fẹ́ẹ́
  (àwọn báàjì tó farapamọ́ máa ń fi "???" hàn títí a fi rí wọn).
- Ẹ̀rọ kíkà ọ̀wọ̀ọ̀wọ́ ọjọ́ pẹ̀lú àmì iná; kàlẹ́ńdà ọ̀wọ̀ọ̀wọ́ ọjọ́ (ọjọ́ 30 tó kọjá).
- Àwòrán ìtàn XP (XP ojoojúmọ́ láàárín ọjọ́ 30 tó kọjá).

### `/dashboard/tokens`

- Ìwọ̀ntúnwọ̀nsì token (ní gbangba, ní òkè ojú-ìwé).
- Fọ́ọ̀mù ìfiránṣẹ́: olùgbà, iye, àpótí ìjíròrò ìmúdájú.
- Tábìlì ìtàn ìfiránṣẹ́ pẹ̀lú àwọn àsẹ̀ (tí a fi ránṣẹ́/tí a gbà/gbogbo rẹ̀).
- Abala ìpè: àwọn kóòdù tó ń ṣiṣẹ́, ṣẹ̀dá tuntun, pín ìjápọ̀.
- Àwọn server àwùjọ: àkójọ pẹ̀lú ipò ìlera, sopọ̀/yọ ìsopọ̀.

### `/dashboard/gamification/admin`

- Àkójọ àìbáradé pẹ̀lú bí ó ṣe le tó, aṣàmúlò, àmì àkókò, àti z-score.
- Ẹ̀rọ ìwòye àkọsílẹ̀ àyẹ̀wò pẹ̀lú àwọn àsẹ̀ (irú ìgbésẹ̀, aṣàmúlò, àárín ọjọ́).
- Àwọn ìṣirò ètò: àpapọ̀ XP tí a fúnni, àwọn aṣàmúlò tó ń ṣiṣẹ́, ìwọ̀n gbígba báàjì.
- Àkótán ìlera server àjọṣepọ̀.

---

## Ìṣọ̀kan Pipeline

### Ibi Ìṣọ̀kan

Gamification darapọ̀ mọ́ pipeline ìbéèrè ní ibi kan ṣoṣo nínú
`open-sse/handlers/chatCore.ts`:

```typescript
// Lẹ́yìn tí a bá fi ìdáhùn ránṣẹ́ sí client:
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
    // Ṣe é láìdúró de èsì: kọ ọ́ sínú àkọsílẹ̀, ṣùgbọ́n má ṣe tan án dé ọ̀dọ̀ client
  });
});
```

### Àwọn Irú Ìṣẹ̀lẹ̀

| Irú Ìṣẹ̀lẹ̀           | Ìgbà Tí A Máa Ń Ṣe É                                 |
| ------------------- | ---------------------------------------------------- |
| `request.completed` | Tí a bá ti fi ìdáhùn LLM tó ṣàṣeyọrí ránṣẹ́           |
| `provider.switch`   | Tí provider bá yípadà (combo fallback wà nínú ìṣirò) |
| `combo.created`     | Tí a bá fi àtòjọ combo tuntun pamọ́                   |
| `combo.used`        | Tí a bá dé ibi àfojúsùn combo ní àṣeyọrí             |
| `badge.earned`      | Tí àyẹ̀wò báàjì bá rí ohun tó bá a mu                 |
| `streak.milestone`  | Tí a bá kọjá ààlà ọ̀wọ̀ọ̀wọ́ ọjọ́                         |
| `transfer.sent`     | Tí ìfiránṣẹ́ token bá parí                            |
| `referral.redeemed` | Tí a bá lo kóòdù ìpè ní àṣeyọrí                      |
| `compression.used`  | Tí a bá lo ìfúnpọ̀ prompt                             |
| `skill.executed`    | Tí ìmúlò ọgbọ́n bá parí                               |
| `model.first_use`   | Tí a kò bá ti lo model láàárín ọjọ́ 7 tó kọjá         |

### Ìdánilójú Àìdènà

Àpẹẹrẹ `setImmediate` + `.catch(() => {})` ń rí i dájú pé:

1. A fi gbogbo ìdáhùn ránṣẹ́ tán kí gamification tó ṣiṣẹ́.
2. Àwọn àṣìṣe gamification kò lè hàn sí client láéláé.
3. Ṣíṣe ìṣẹ̀lẹ̀ náà máa ń ṣiṣẹ́ nínú microtask tó kàn, kì í ṣe ní ìlà kan náà.

---

## Ààbò

### Àwòṣe Ìhalẹ̀

| Ìhalẹ̀                              | Ọ̀nà Ìdènà                                                                         |
| ---------------------------------- | --------------------------------------------------------------------------------- |
| Ìmú iye score ga ju bó ṣe yẹ lọ    | Ìṣírò XP ní ẹ̀gbẹ́ server nìkan; àwọn client ń fi àwọn ìṣe ránṣẹ́, kì í ṣe score     |
| Àwọn ìkọlù àtúnṣe                  | Àwọn idempotency key lórí àwọn transfer; yíyọ àkọsílẹ̀ àdáwòkọ kúrò nínú audit log |
| Jìbìtì transfer                    | Ledger àkọsílẹ̀-méjì; àwọn transaction aláìlépin; àwọn rate limit                  |
| Ìtọ́kasí-ara-ẹni                    | Ṣàyẹ̀wò `api_key_id` nígbà redemption                                              |
| Ìfọwọ́yí leaderboard                | Ìṣàwárí ohun àjèjì pẹ̀lú Z-score; dashboard ohun àjèjì fún admin                   |
| Olè jíjí token federation          | Ìfipamọ́ tí a ti hash pẹ̀lú SHA-256; token raw ni a máa fi hàn lẹ́ẹ̀kan ṣoṣo          |
| Ìkọlù brute force sí àwọn code ìpè | Rate limiting lórí endpoint redemption; entropy oní-character 8                   |
| XSS nínú àwọn orúkọ àfihàn         | A ti sọ àwọn orúkọ àfihàn di mímọ́; a ti escape àwọn àkọsílẹ̀ leaderboard           |
| Àwọn ìkọlù timing sí àwọn hash     | `crypto.timingSafeEqual` fún ìfiwéra hash token                                   |

### Àwọn Ìbéèrè Ìfàṣẹsí

- **Gbogbo ènìyàn** (kò nílò ìfàṣẹsí): `GET /leaderboard`, `GET /stream` (àwọn leaderboard
  tí a lè kà nìkan).
- **API key jẹ́ dandan**: gbogbo àwọn iṣẹ́ ìkọ̀wé, profile, àwọn transfer, àwọn ìpè.
- **Admin nìkan**: dashboard ohun àjèjì, ohun ìwò audit log.
- **Federation**: ọ̀nà ìfàṣẹsí ọ̀tọ̀ tí ó ń lo token raw nínú header `Authorization`,
  tí a sì ń fìdí rẹ̀ múlẹ̀ pẹ̀lú hash SHA-256 tí a fipamọ́.

---

## Ìdánwò

### Àwọn Fáìlì Ìdánwò

Gbogbo àwọn ìdánwò ń lo test runner abinibi Node.js (`node --import tsx/esm --test`).

| Fáìlì Ìdánwò                                  | Ohun Tí Ó Kárí                               | Àwọn Ìdánwò |
| --------------------------------------------- | -------------------------------------------- | ----------- |
| `tests/unit/gamification/xp.test.ts`          | Ìṣírò XP, curve level, àwọn title            | 8           |
| `tests/unit/gamification/badges.test.ts`      | Ìbámu àwọn criteria badge, fífúnni ní badge  | 10          |
| `tests/unit/gamification/streaks.test.ts`     | Logic streak, àwọn milestone, àwọn edge case | 7           |
| `tests/unit/gamification/leaderboard.test.ts` | Ìṣírò rank, pagination, rotation             | 8           |
| `tests/unit/gamification/sharing.test.ts`     | Àwọn transfer, balance, idempotency          | 9           |
| `tests/unit/gamification/invites.test.ts`     | Ṣíṣẹ̀dá, redemption, expiry, ìtọ́kasí-ara-ẹni  | 7           |
| `tests/unit/gamification/antiCheat.test.ts`   | Àwọn rate limit, z-score, audit logging      | 6           |
| `tests/unit/gamification/events.test.ts`      | Ìtújáde event, fan-out, ìṣàkóso error        | 5           |

### Ṣíṣe Àwọn Ìdánwò

```bash
# Gbogbo àwọn ìdánwò gamification
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# Fáìlì ìdánwò kan ṣoṣo
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Àwọn Ìbéèrè Coverage

Gẹ́gẹ́ bí `CONTRIBUTING.md` — gbogbo àwọn module tuntun gbọ́dọ̀ ní:

- Branch coverage >= 80%.
- A gbọ́dọ̀ dán gbogbo public function wò ó kéré tán lẹ́ẹ̀kan.
- A gbọ́dọ̀ dán àwọn error path wò (balance tí kò tó, àwọn code tí ó ti parí, àwọn rate limit).

---

## Ètò Àwọn Fáìlì

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # Gbogbo tábìlì 8 náà àti àwọn atọ́ka
      gamification.ts                  # Módùlù CRUD ti ibùdó iṣẹ́
    gamification/
      xp.ts                           # Ìṣírò XP, ìlà ìpele, àwọn àkọ́lé
      badges.ts                       # Àwọn ìtumọ̀ báàjì, àwọn ààyèdá, ìṣàyẹ̀wò
      streaks.ts                      # Títọpa ìtẹ̀síwájú ojoojúmọ́
      leaderboard.ts                  # Ìṣírò ipò, SSE, yíyípadà
      antiCheat.ts                    # Ìdíwọ̀n iye ìbéèrè, z-score, àyẹ̀wò
      sharing.ts                      # Àkọsílẹ̀ ìfiránṣẹ́ tọ́kìn
      invites.ts                      # Àwọn kóòdù ìkésíni/ìràpadà
      servers.ts                      # Ìṣọ̀kan àwọn olupín àwùjọ
      events.ts                       # Olùtan ìṣẹ̀lẹ̀ (ojú-ọ̀nà ìsopọ̀)
      notifications.ts                # Ṣísàn ìfitónilétí SSE
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST àtòjọ ipò
        leaderboard/stream/route.ts   # Àwọn ìmúdójúìwọ̀n SSE ní àkókò gidi
        transfer/route.ts             # Àwọn ìfiránṣẹ́ GET/POST
        invite/route.ts               # Àwọn kóòdù ìkésíni GET/POST/DELETE
        invite/redeem/route.ts        # POST láti lo kóòdù
        servers/route.ts              # Àwọn olupín GET/POST/DELETE
        federation/score/route.ts     # POST láti fi àbájáde ránṣẹ́
        federation/leaderboard/route.ts # GET láti gba àtòjọ ipò
        notifications/route.ts        # Àwọn ìfitónilétí SSE
        anomalies/route.ts            # GET fún àwọn ìjábọ̀ àìbáramu
        rotate/route.ts               # POST láti yí àwọn àṣírí padà
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Ojú-ìwé àwọn ipò
        profile/page.tsx               # Ojú-ìwé XP/àwọn báàjì/àwọn ìtẹ̀síwájú
        tokens/page.tsx                # Ojú-ìwé iye tó kù/àwọn ìfiránṣẹ́/àwọn ìkésíni
        gamification/admin/page.tsx    # Ìṣàkóso àbójútó àìbáramu
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
    GAMIFICATION.md                    # Ìwé yìí
```

---

## Ètò Ìṣílọ

### Ìpele 1: Kókó Ẹ̀yìn-Ètò (PR 1)

- Ìṣílọ `060_create_gamification.sql` (tábìlì 8).
- `src/lib/db/gamification.ts` (módùlù ibùdó iṣẹ́).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- Ojú-ọ̀nà ìsopọ̀ nínú `chatCore.ts`.
- Àwọn àdánwò ẹyọ fún XP, àwọn ìtẹ̀síwájú, àti àwọn ìṣẹ̀lẹ̀.

### Ìpele 2: Àwọn Báàjì àti Àtòjọ Ipò (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Àwọn ìtumọ̀ báàjì nínú àwọn iye àìyípadà.
- Àwọn ipa-ọ̀nà API àtòjọ ipò àti ṣísàn SSE.
- Àwọn àdánwò ẹyọ fún àwọn báàjì àti àtòjọ ipò.

### Ìpele 3: Pínpín àti Àwọn Ìkésíni (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- Àwọn ipa-ọ̀nà API ìfiránṣẹ́ àti ìkésíni.
- Àwọn àdánwò ẹyọ fún pínpín, àwọn ìkésíni, àti ìdènà ìjẹ́jẹ̀ẹ́.

### Ìpele 4: Ìṣọ̀kan àti Pátákó Ìṣàkóso (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- Àwọn ipa-ọ̀nà API ìṣọ̀kan.
- Àwọn ojú-ìwé pátákó ìṣàkóso (àtòjọ ipò, prófáìlì, àwọn tọ́kìn, ìṣàkóso).
- Ìforúkọsílẹ̀ àwọn irinṣẹ́ MCP.

---

## Àwọn Ohun Tí A Ó Gbé Yẹ̀ Wò Lọ́jọ́ Iwájú

- **Àwọn ìṣẹ̀lẹ̀ àsìkò**: àkójọpọ̀ báàjì tó ní àkókò tó lopin àti àwọn àsìkò tábìlì àwọn olórí.
- **Tábìlì àwọn olórí ẹgbẹ́**: ṣe àkójọpọ̀ àwọn aṣàmúlò ní ìbámu pẹ̀lú àjọ tàbí combo.
- **Àwọn olùsọdipúpọ̀ XP**: mú XP pọ̀ sí i lákòókò ìpolówó.
- **Pínpín àṣeyọrí**: ṣẹ̀dá àwọn káàdì báàjì tí a lè pín (àwọn àwòrán OpenGraph).
- **Ìfitónilétí alágbèéká**: àwọn ìfitónilétí tó dá lórí webhook fún àwọn ìṣẹ̀lẹ̀ báàjì/ìpele.
- **API tábìlì àwọn olórí**: API gbogbogbò fún ìṣọ̀kan pẹ̀lú àwọn ẹ̀gbẹ́ kẹta.
