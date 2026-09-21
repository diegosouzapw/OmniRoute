# Gamification & Leaderboard System (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **Sors awtorevoli:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Aġġornat l-aħħar:** 2026-06-28 — v3.8.40

OmniRoute jinkludi saff ta’ gamifikazzjoni li jaħdem primarjament lokalment u li jippremja lill-utenti talli
jinvolvu ruħhom mal-pjattaforma — billi jagħmlu talbiet, jaqilbu l-fornituri, joħolqu
kombinazzjonijiet, jaqsmu tokens, u jikkontribwixxu għall-komunità. L-istat kollu jinsab
f’SQLite; il-federazzjoni ma’ servers tal-komunità hija fakultattiva u bbażata fuq push.

Is-sistema hija mfassla biex ikollha **latenza żero fil-fluss kritiku** — l-avvenimenti tal-gamifikazzjoni
jintbagħtu mingħajr stennija mir-rotta tat-talbiet u qatt ma jimblukkaw
rispons ta’ LLM.

---

## Ħarsa Ġenerali

### Għan

Iżżid l-involviment u ż-żamma tal-utenti billi tipprovdi progress viżibbli (XP,
livelli, badges), prova soċjali (klassifiki), u inċentivi ekonomiċi (qsim ta’
tokens, premjijiet għall-istediniet).

### Ambitu

| Karatteristika       | Deskrizzjoni                                                                                             |
| -------------------- | -------------------------------------------------------------------------------------------------------- |
| XP u Livelli         | Ikseb XP għal kull azzjoni; itla’ fil-livelli skont kurva polinomjali                                    |
| Badges               | Aktar minn 20 kisba f’5 kategoriji b’4 livelli ta’ rarità                                                |
| Serje                | Traċċar tal-użu attiv ta’ kuljum bis-serje attwali/l-itwal                                               |
| Klassifiki           | Ambiti globali, ta’ kull ġimgħa, ta’ kull xahar, tal-qsim ta’ tokens, u tal-kontribuzzjonijiet           |
| Qsim ta’ Tokens      | Ittrasferixxi krediti bejn l-utenti permezz ta’ reġistru b’entrata doppja                                |
| Stieden u Ifdi       | Kodiċijiet ta’ riferiment b’ħażna bil-hash SHA-256                                                       |
| Servers tal-Komunità | Oħloq federazzjoni ma’ istanzi esterni ta’ OmniRoute                                                     |
| Kontra l-Qerq        | Punteġġ ikkalkulat mis-server, limitazzjoni tar-rata, identifikazzjoni ta’ anomaliji permezz ta’ z-score |

### Prinċipji tad-Disinn

1. **Primarjament lokali** — l-istat kollu jinsab f’SQLite, mingħajr il-ħtieġa ta’ servizzi esterni.
2. **Mhux imblukkanti** — l-avvenimenti jintbagħtu mingħajr stennija; ir-rotta tar-rispons tal-LLM
   qatt ma tittardja minħabba l-loġika tal-gamifikazzjoni.
3. **Is-server huwa l-awtorità** — l-XP jiġi kkalkulat biss min-naħa tas-server; il-klijenti ma jistgħux
   iżidu l-punteġġi b’mod artifiċjali.
4. **Jirrispetta l-privatezza** — il-parteċipazzjoni fil-klassifiki hija fakultattiva; l-utenti jistgħu
   jaħbu l-profil tagħhom.
5. **Lest għall-federazzjoni** — is-servers tal-komunità jistgħu jibagħtu punteġġi permezz ta’ API ffirmata;
   is-sinkronizzazzjoni tissostitwixxi d-data, mhux iżżid magħha.

---

## Arkitettura

### Fluss ta’ Livell Għoli

```
Talba tal-Klijent
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (fluss eżistenti) ...
      → rispons upstream mibgħut lill-klijent
      → setImmediate (mingħajr stennija):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

L-emittent tal-avvenimenti huwa l-punt uniku ta’ integrazzjoni. `chatCore.ts` isejjaħ
`emitGamificationEvent()` wara li jintbagħat ir-rispons; il-modulu tal-avvenimenti jqassam
ix-xogħol lis-sottosistemi tal-XP, tas-serje, tal-badges, tal-klassifika, u ta’ kontra l-qerq.

### Graff tad-Dipendenzi tal-Moduli

```
src/lib/gamification/
  events.ts          ← punt tad-dħul (imsejjaħ minn chatCore.ts)
    ├── xp.ts        ← kalkolu tal-XP u determinazzjoni tal-livell
    ├── streaks.ts   ← traċċar tas-serje ta’ attività ta’ kuljum
    ├── badges.ts    ← evalwazzjoni tal-kriterji tal-badges
    ├── leaderboard.ts ← kalkolu tal-pożizzjoni u xandir permezz ta’ SSE
    ├── antiCheat.ts ← limitazzjoni tar-rata u identifikazzjoni tal-anomaliji
    ├── sharing.ts   ← reġistru tat-trasferimenti tat-tokens
    ├── invites.ts   ← ġestjoni tal-kodiċijiet ta’ stedina/fidwa
    ├── servers.ts   ← federazzjoni tas-servers tal-komunità
    └── notifications.ts ← fluss ta’ notifiki SSE

src/lib/db/
  gamification.ts    ← l-operazzjonijiet CRUD kollha (8 tabelli)

src/app/api/gamification/
  leaderboard/       ← GET klassifiki, POST aġġornament manwali
  leaderboard/stream ← aġġornamenti SSE f’ħin reali
  transfer/          ← GET kronoloġija, POST ibgħat tokens
  invite/            ← GET/POST kodiċijiet, DELETE irrevoka
  invite/redeem/     ← POST ifdi kodiċi
  servers/           ← GET/POST/DELETE servers tal-komunità
  federation/score/  ← POST ibgħat punteġġ lis-server
  federation/leaderboard/ ← GET ġib il-klassifika mis-server
  notifications/     ← notifiki SSE ta’ badges/żieda fil-livell
  anomalies/         ← GET rapporti dwar anomaliji (amministratur)
  rotate/            ← POST dawwar is-sigrieti tat-tokens tal-istediniet
```

---

## Saff tad-Data

### Tabelli tad-Database

It-tabelli kollha jinsabu fid-database SQLite prinċipali ta’ OmniRoute, maħluqa mill-migrazzjoni
`060_create_gamification.sql`. Il-ġurnalar WAL jintiret mis-singleton
`getDbInstance()` f’`src/lib/db/core.ts`.

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

### Modulu tad-Dominju: `src/lib/db/gamification.ts`

Isegwi l-mudell standard ta’ OmniRoute — jimporta `getDbInstance()` minn
`core.ts` u jesporta funzjonijiet CRUD bit-tipi definiti. Ma jintuża ebda SQL dirett fil-handlers tar-rotot.

Funzjonijiet ewlenin:

| Funzjoni                   | Deskrizzjoni                                                        |
| -------------------------- | ------------------------------------------------------------------- |
| `upsertLeaderboardEntry()` | Daħħal jew aġġorna l-punteġġ għal (api_key_id, scope, period)       |
| `getLeaderboard()`         | Klassifiki paġnati għal scope/period partikolari                    |
| `getUserLevel()`           | Ikseb jew oħloq rekord tal-livell tal-utent                         |
| `updateUserLevel()`        | Issettja XP, il-livell u t-titlu b’mod atomiku                      |
| `getBadgeDefinitions()`    | Id-definizzjonijiet kollha tal-badges (b’filtrazzjoni fakultattiva) |
| `getUserBadges()`          | Badges miksuba minn utent                                           |
| `awardBadge()`             | Daħħal kisba ta’ badge (idempotenti fuq badge_id)                   |
| `logXpAction()`            | Żid ma’ xp_audit_log                                                |
| `getXpAuditLog()`          | Kronoloġija paġnata tal-awditjar għal utent                         |
| `insertLedgerEntry()`      | Trasferiment b’entrata doppja (fi tranżazzjoni)                     |
| `getBalance()`             | Is-somma ta’ dak riċevut nieqes dak mibgħut għal utent              |
| `getTransferHistory()`     | Reġistru paġnat tat-trasferimenti                                   |
| `createInviteToken()`      | Daħħal kodiċi ta’ stedina + token bil-hash                          |
| `redeemInviteToken()`      | Fittex permezz tal-kodiċi, ivvalida u żid uses                      |
| `upsertCommunityServer()`  | Irreġistra jew aġġorna server ta’ federazzjoni                      |
| `getCommunityServers()`    | Elenka s-servers għal utent                                         |
| `deleteCommunityServer()`  | Neħħi reġistrazzjoni ta’ server                                     |

---

## Sistema ta’ XP / Livelli

**Fajl:** `src/lib/gamification/xp.ts`

### Kurva tal-Livelli

L-XP meħtieġ biex jintlaħaq il-livell `n` isegwi kurva polinomjali:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Livell | XP għal-Livell Li Jmiss | XP Kumulattiv | Titlu       |
| ------ | ----------------------- | ------------- | ----------- |
| 1      | 100                     | 100           | Prinċipjant |
| 5      | 1,118                   | 2,415         | Prinċipjant |
| 10     | 3,162                   | 10,523        | Esploratur  |
| 25     | 12,500                  | 86,024        | Esploratur  |
| 50     | 35,355                  | 345,529       | Espert      |
| 75     | 64,952                  | 948,683       | Mastru      |
| 100    | 100,000                 | 2,050,000     | Leġġenda    |

### Titli

| Firxa ta’ Livelli | Titlu       |
| ----------------- | ----------- |
| 1 – 9             | Prinċipjant |
| 10 – 24           | Esploratur  |
| 25 – 49           | Espert      |
| 50 – 74           | Mastru      |
| 75 – 100          | Leġġenda    |

### Premjijiet ta’ XP

| Azzjoni           | XP  | Deskrizzjoni                                                                |
| ----------------- | --- | --------------------------------------------------------------------------- |
| `request`         | 1   | Għal kull talba tal-API mgħoddija minn OmniRoute                            |
| `provider_switch` | 5   | Qlib għal fornitur differenti                                               |
| `model_switch`    | 3   | Qlib għal mudell differenti                                                 |
| `combo_create`    | 10  | Ħolqien ta’ combo ġdida                                                     |
| `combo_use`       | 2   | Użu ta’ combo għal talba                                                    |
| `token_share`     | 1   | Għal kull 1 000 token kondiviż ma’ utent ieħor                              |
| `invite_redeem`   | 50  | Użu ta’ kodiċi ta’ stedina                                                  |
| `daily_login`     | 5   | Użu attiv ta’ kuljum (darba kuljum)                                         |
| `streak_bonus`    | 2   | Għal kull jum konsekuttiv fis-sensiela (immultiplikat bit-tul tas-sensiela) |
| `badge_unlock`    | 10  | Ftuħ ta’ midalja                                                            |

### Fluss tal-Għoti

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. Fittex `XP_REWARDS[action]` biex tikseb l-ammont ta’ XP.
2. Għaddih minn `checkRateLimit()` (kontra l-qerq: massimu ta’ 1000 XP/min għal kull ċavetta).
3. Iftaħ tranżazzjoni:
   - Aqra r-ringiela attwali ta’ `user_levels`.
   - Żid l-XP; ikkalkula mill-ġdid il-livell permezz ta’ `levelFromXp(totalXp)`.
   - Jekk il-livell inbidel, issettja `levelUp = true`.
   - Aġġorna r-ringiela ta’ `user_levels`.
   - Daħħal rekord f’`xp_audit_log`.
4. Irritorna r-riżultat. Min isejjaħ jieħu ħsieb in-notifiki.

### Funzjoni Awżiljarja: `levelFromXp(totalXp)`

Tgħaddi mil-livelli 1..100, filwaqt li tgħodd `xp_for_level(n)` sakemm l-XP kumulattiv
jaqbeż `totalXp`. Tirritorna l-ogħla livell li l-limitu tiegħu jkun intlaħaq.
Dan huwa O(100) — aċċettabbli peress li l-livelli huma limitati għal 100.

---

## Sistema tal-Midalji

**Fajl:** `src/lib/gamification/badges.ts`

### Kategoriji

| Kategorija     | Deskrizzjoni                               | Eżempji ta’ Midalji                                 |
| -------------- | ------------------------------------------ | --------------------------------------------------- |
| `usage`        | Tragwardi bbażati fuq il-volum             | L-Ewwel Talba, 1K Talba, 100K                       |
| `sharing`      | Kondiviżjoni ta’ tokens u referenzi        | L-Ewwel Kondiviżjoni, Ġeneruż (10 kondiviżjonijiet) |
| `contribution` | Parteċipazzjoni fil-komunità               | Ħallieq ta’ Combo, Esploratur tal-Fornituri         |
| `streak`       | Konsistenza matul iż-żmien                 | Gwerrier tal-Ġimgħa, Devot ta’ Kull Xahar           |
| `rare`         | Kisbiet diffiċli biex jinkisbu jew moħbija | Utent Bikri, Rapportatur tal-Bugs                   |

### Raritajiet

| Rarità      | Kulur | Indikazzjoni tal-Probabbiltà |
| ----------- | ----- | ---------------------------- |
| `common`    | Griż  | Il-biċċa l-kbira tal-utenti  |
| `uncommon`  | Aħdar | Utenti attivi                |
| `rare`      | Blu   | Utenti ddedikati             |
| `legendary` | Deheb | L-aqwa 1%                    |

### Tipi ta’ Kriterji

| Tip            | Kamp         | Deskrizzjoni                                   |
| -------------- | ------------ | ---------------------------------------------- |
| `action_count` | `count`      | Wettaq azzjoni N darbiet (eż., 1000 talba)     |
| `streak`       | `days`       | Żomm sensiela għal N jum konsekuttiv           |
| `unique_count` | `field`, `n` | Uża N valur uniku (eż., 10 mudelli differenti) |
| `rank`         | `scope`, `n` | Ilħaq il-pożizzjoni N f’ambitu ta’ klassifika  |
| `first`        | —            | Kun l-ewwel wieħed li jwettaq azzjoni          |
| `hidden`       | (ivarja)     | Il-kriterji ma jintwerewx qabel ma jinkisbu    |

Id-definizzjonijiet tal-midalji jinħażnu f’`badge_definitions` bħala `criteria` f’format JSON:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Fluss tal-Evalwazzjoni

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # id-definizzjonijiet kollha
    → getUserBadges(apiKeyId)         # diġà miksuba (aqbeż)
    → għal kull midalja mhux miksuba:
       → matchesCriteria(badge, event, userState)
       → jekk taqbel: awardBadge(apiKeyId, badgeId)
         → irritorna l-payload tan-notifika
```

L-evalwazzjoni hija **mmexxija mill-avvenimenti** — titħaddem wara kull avveniment ta’ gamification, iżda
tiċċekkja biss il-midalji li `criteria.type` tagħhom jaqbel mal-azzjoni tal-avveniment. Dan
iżomm l-evalwazzjoni veloċi (< 5ms għall-biċċa l-kbira tal-avvenimenti).

### `matchesCriteria(badge, event, userState)`

| Tip ta’ Kriterju | Verifika                                                               |
| ---------------- | ---------------------------------------------------------------------- |
| `action_count`   | `getActionCount(apiKeyId, action) >= count`                            |
| `streak`         | `getCurrentStreak(apiKeyId) >= days`                                   |
| `unique_count`   | `getUniqueCount(apiKeyId, field) >= n`                                 |
| `rank`           | `getRank(apiKeyId, scope) <= n`                                        |
| `first`          | L-ebda entrata preċedenti f’`xp_audit_log` għal dan it-tip ta’ azzjoni |
| `hidden`         | Jiddelega lis-sottokontroll xieraq                                     |

### Midalji Integrati (20+)

<details>
<summary>Lista sħiħa tal-midalji</summary>

| Badge                            | Kategorija     | Rarità      | Kriterji                             |
| -------------------------------- | -------------- | ----------- | ------------------------------------ |
| L-Ewwel Passi                    | użu            | komuni      | Talba waħda                          |
| Qed Tissaħħan                    | użu            | komuni      | 100 talba                            |
| Utent Avvanzat                   | użu            | mhux komuni | 1,000 talba                          |
| Ċenturjun                        | użu            | rari        | 10,000 talba                         |
| OmniPower                        | użu            | leġġendarju | 100,000 talba                        |
| Qbiż bejn il-Fornituri           | kontribuzzjoni | komuni      | Uża 5 fornituri differenti           |
| Espert tal-Fornituri             | kontribuzzjoni | mhux komuni | Uża 20 fornitur differenti           |
| Arkitett tal-Kombinazzjonijiet   | kontribuzzjoni | mhux komuni | Oħloq 5 kombinazzjonijiet            |
| Granmastru tal-Kombinazzjonijiet | kontribuzzjoni | rari        | Oħloq 25 kombinazzjoni               |
| L-Ewwel Kondiviżjoni             | kondiviżjoni   | komuni      | Trasferiment wieħed ta’ tokens       |
| Ġeneruż                          | kondiviżjoni   | mhux komuni | 10 trasferimenti ta’ tokens          |
| Filantropu                       | kondiviżjoni   | rari        | Ittrasferixxi total ta’ 10,000 token |
| Referent                         | kondiviżjoni   | komuni      | Referenza waħda b’suċċess            |
| Bennej tan-Netwerk               | kondiviżjoni   | mhux komuni | 10 referenzi b’suċċess               |
| Gwerrier tal-Ġimgħa              | sensiela       | mhux komuni | Sensiela ta’ 7 ijiem                 |
| Devot ta’ Kull Xahar             | sensiela       | rari        | Sensiela ta’ 30 jum                  |
| Bla Waqfien                      | sensiela       | leġġendarju | Sensiela ta’ 365 jum                 |
| Utent Bikri                      | rari           | leġġendarju | Ingħaqad matul il-perjodu beta       |
| Pijunier tal-Kompressjoni        | rari           | mhux komuni | Uża l-kompressjoni 100 darba         |
| Kollezzjonist tal-Ħiliet         | rari           | rari        | Uża 10 ħiliet differenti             |
| Esploratur tal-Mudelli           | kontribuzzjoni | mhux komuni | Uża 15-il mudell differenti          |

</details>

---

## Traċċar tas-Sensiela

**Fajl:** `src/lib/gamification/streaks.ts`

### Mudell tad-Data

Is-sensiliet jinħażnu fit-tabella `key_value` (tabella ta’ utilità kondiviża) taħt
ċwievet b’namespace:

| Ċavetta                       | Valur                            | Deskrizzjoni             |
| ----------------------------- | -------------------------------- | ------------------------ |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Data tas-sensiela attiva |

### Loġika

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Aqra r-rekord tas-sensiela minn `key_value`.
2. Ipparsja `{current}`, `{longest}`, `{lastDate}` (string ta’ data ISO).
3. Jekk `lastDate === today` — l-ebda bidla (diġà ngħadd illum).
4. Jekk `lastDate === yesterday` — żid `current`; aġġorna `longest` jekk meħtieġ.
5. Jekk `lastDate < yesterday` — issettja mill-ġdid `current = 1` (is-sensiela nkisret).
6. Ikteb ir-rekord aġġornat.
7. Iċċekkja l-istadji importanti: 7, 14, 30, 60, 90, 180, 365 jum. Jekk wieħed jinqabeż, issettja
   `milestone = true` (min isejjaħ il-funzjoni jagħti XP u jiċċekkja l-badges).

### Każijiet Speċjali

- **Żona tal-ħin**: is-sensiliet jużaw dati UTC (`new Date().toISOString().slice(0, 10)`).
  Dan huwa intenzjonat — żona tal-ħin kanonika waħda tipprevjeni l-manipulazzjoni permezz
  tal-bdil bejn iż-żoni tal-ħin.
- **Utenti ġodda**: ma jeżisti l-ebda rekord tas-sensiela; l-ewwel talba toħolqu b’
  `current=1, longest=1, lastDate=today`.
- **Talbiet multipli kuljum**: l-ewwel talba biss tal-jum UTC
  iżżid is-sensiela.

---

## Klassifika

**Fajl:** `src/lib/gamification/leaderboard.ts`

### Ambiti

| Ambitu          | Perjodu | Deskrizzjoni                                    |
| --------------- | ------- | ----------------------------------------------- |
| `global`        | `all`   | XP kumulattiv ta’ kull żmien                    |
| `weekly`        | `week`  | XP miksub fil-ġimgħa UTC attwali (Tnejn-Ħadd)   |
| `monthly`       | `month` | XP miksub fix-xahar UTC attwali                 |
| `tokens_shared` | `all`   | Total ta’ tokens ittrasferiti lil oħrajn        |
| `contributions` | `all`   | Combos maħluqa + providers użati + skills użati |

### Kalkolu tal-Pożizzjoni

Il-pożizzjonijiet jiġu **kkalkulati waqt il-qari**, mhux maħżuna. Dan jevita data tal-pożizzjonijiet skaduta
u jelimina l-ħtieġa għal xogħlijiet perjodiċi ta’ kalkolu mill-ġdid tal-pożizzjonijiet.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

Mudell tal-query:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### Rotazzjoni tal-Perjodu

Il-klassifiki ta’ kull ġimgħa u ta’ kull xahar jinbidlu awtomatikament:

1. **Arkivjar**: fil-konfini tal-perjodu, ikkopja l-entrati attwali għal
   `leaderboard_archive` bit-tikketta tal-perjodu.
2. **Irrisettjar**: ħassar l-entrati għall-perjodu li skada.
3. **Attivazzjoni**: tiġi ċċekkjata ma’ kull sejħa lil `updateLeaderboard()`; l-ewwel talba
   ta’ perjodu ġdid tattiva r-rotazzjoni.

Dan jiżgura li l-klassifiki ta’ kull ġimgħa jiġu rrisettjati kull nhar ta’ Tnejn f’00:00 UTC u dawk ta’ kull xahar
jiġu rrisettjati fl-1 ta’ kull xahar.

### Aġġornamenti SSE f’Ħin Reali

**Endpoint:** `GET /api/gamification/stream`

```
Klijent → GET /api/gamification/stream
  → Tiġi stabbilita konnessjoni SSE
  → Is-server jibgħat minnufih stampa tal-ewwel 10 fil-klassifika
  → Kull 5 sekondi: jibgħat l-ewwel 10 aġġornati jekk ikun hemm bidla
  → Kull 15-il sekonda: kumment heartbeat (": heartbeat\n\n")
  → Il-klijent jiskonnettja → tindif (jitneħħa l-listener)
```

Format tal-event:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

Il-maniġer SSE jsegwi l-klijenti konnessi għal kull ambitu u jibgħat aġġornamenti biss
meta d-data tal-klassifika tkun effettivament inbidlet mill-aħħar darba li ntbagħtet.

---

## Kondiviżjoni tat-Tokens

**Fajl:** `src/lib/gamification/sharing.ts`

### Reġistru bi Dħul Doppju

Kull trasferiment joħloq żewġ ringieli f’`token_ledger`:

| Ringiela | `from_key_id` | `to_key_id` | `amount` |
| -------- | ------------- | ----------- | -------- |
| Debitu   | mittent       | riċevitur   | +amount  |
| Kreditu  | riċevitur     | mittent     | -amount  |

Stenna — il-konvenzjoni hija:

| Ringiela | `from_key_id` | `to_key_id` | `amount` | Tifsira                  |
| -------- | ------------- | ----------- | -------- | ------------------------ |
| Tibgħat  | mittent       | riċevitur   | +amount  | Ħruġ mingħand il-mittent |
| Tirċievi | riċevitur     | mittent     | +amount  | Dħul għand ir-riċevitur  |

Il-bilanċ jiġi kkalkolat hekk:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Fluss tat-Trasferiment

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Ivvalida**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **Idempotenza**: iċċekkja jekk `idempotency_key` diġà teżistix fir-reġistru.
   Jekk iva, irritorna r-riżultat maħżun fil-cache.
3. **Tranżazzjoni** (tranżazzjoni SQLite waħda):
   a. Ikkalkola l-bilanċ tal-mittent.
   b. Jekk `balance < amount`, waqqaf (fondi insuffiċjenti).
   c. Daħħal ir-ringiela tat-trażmissjoni (`from=sender,`.

### Limitazzjoni tar-Rata

- Massimu ta’ 10 trasferimenti kull minuta għal kull ċavetta API.
- Massimu ta’ 10,000 token fi trasferiment wieħed.
- Massimu ta’ 100,000 token trasferiti kuljum għal kull ċavetta API.

---

## Tokens ta’ Stedina u Fidwa

**Fajl:** `src/lib/gamification/invites.ts`

### Format tal-Kodiċi

- **Kodiċi**: alfanumeriku ta’ 8 karattri (eż., `A3K9-X7M2`), li jinqara faċilment,
  u jintwera lill-utent.
- **Token**: token aleatorju ta’ 32 byte, maħżun bħala hash SHA-256. Jintuża għal
  fidi programmatika (eż., links tal-URL).

### Ħażna

| Kolonna      | Valur                        |
| ------------ | ---------------------------- |
| `code`       | `A3K9X7M2` (uniku, indiċjat) |
| `token_hash` | SHA-256(raw_token)           |

It-token mhux ipproċessat jintbagħat lura lill-utent darba biss fil-ħin tal-ħolqien. OmniRoute
qatt ma jerġa’ jaħżnu jew jurih — jippersisti biss il-hash.

### Prevenzjoni tal-Awto-Riferiment

Meta utent jifdi kodiċi, is-sistema tiċċekkja:

1. Il-kodiċi jappartjeni għal `api_key_id` differenti.
2. L-utent li qed jifdi ma jkunx diġà feda xi kodiċi mingħand l-istess
   riferent (joins fuq `invite_tokens` + ir-reġistru tal-fidwa).

Jekk xi wieħed minn dawn il-kontrolli jfalli, il-fidwa tiġi miċħuda b’messaġġ ta’ żball ċar.

### Skadenza u Limiti

- `max_uses` predefinit: 10 (konfigurabbli waqt il-ħolqien).
- `expires_at` predefinit: 30 jum mill-ħolqien.
- Kodiċijiet skaduti jew eżawriti jirritornaw HTTP 410 Gone.

---

## Federazzjoni tas-Servers tal-Komunità

**Fajl:** `src/lib/gamification/servers.ts`

### Konnessjoni

Server tal-komunità jiġi rreġistrat permezz ta’ token ta’ stedina maħruġ mis-server remot. L-istanza lokali:

1. Tirċievi t-token ta’ stedina (eż., imwaħħal fid-dashboard).
2. Tagħmel sejħa lil `POST /api/gamification/federation/leaderboard` fuq is-server remot biex tivvalida t-token u tikseb il-klassifika attwali.
3. Taħżen ir-rekord tas-server bi `status: connected`.

### Mudell ta’ Sinkronizzazzjoni

Il-federazzjoni tuża **sinkronizzazzjoni b’sovrascrittura**, mhux addittiva:

```
Istanza Lokali                 Server tal-Komunità
     │                              │
     ├── tibgħat il-punteġġ ──────►│  POST /federation/score
     │   { api_key_id, score }      │  (is-server jivvalida l-hash tat-token)
     │                              │
     ├── tiġbed il-klassifika ─────►│  GET /federation/leaderboard
     │◄── l-aqwa N entrati ─────────┤  (jissovrascrivi l-cache lokali)
     │                              │
     └── kontroll tas-saħħa ───────►│  GET /federation/health
         (kull 60s, timeout ta’ 5s) │
```

### Awtentikazzjoni

It-talbiet tal-federazzjoni jinkludu:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

Is-server remot joħloq hash tat-token u jfittex ir-ringiela korrispondenti f’`community_servers`. Dan jevita li jintbagħat il-hash maħżun.

### Monitoraġġ tas-Saħħa

Kull rekord ta’ server isegwi:

| Qasam       | Deskrizzjoni                                        |
| ----------- | --------------------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable`              |
| `last_sync` | Timestamp ISO tal-aħħar sinkronizzazzjoni b’suċċess |
| `failures`  | Kontrolli tas-saħħa konsekuttivi li fallew          |

Wara 5 fallimenti konsekuttivi, l-istatus jinbidel għal `unreachable` u s-sinkronizzazzjoni titwaqqaf sakemm jirnexxi kontroll manwali tas-saħħa.

---

## Kontra l-Qerq

**Fajl:** `src/lib/gamification/antiCheat.ts`

### Kalkolu tal-Punteġġ fuq in-Naħa tas-Server

Il-kalkoli kollha tal-XP isiru f’`src/lib/gamification/xp.ts`. Il-klijenti qatt ma jibagħtu punteġġ — jibagħtu azzjonijiet, u s-server jikkalkula l-XP. Il-kolonna `leaderboard.score` tista’ tinkiteb biss minn kodiċi fuq in-naħa tas-server.

### Limitazzjoni tar-Rata

| Limitu                            | Valur   | Ambitu                 |
| --------------------------------- | ------- | ---------------------- |
| XP massimu kull minuta            | 1,000   | Għal kull API key      |
| Trasferimenti massimi kull minuta | 10      | Għal kull API key      |
| Ammont massimu ta’ trasferiment   | 10,000  | Għal kull trasferiment |
| Trasferimenti massimi kuljum      | 100,000 | Għal kull API key      |

Il-limiti tar-rata jużaw tieqa progressiva fil-memorja (l-istess mudell bħal `RateLimitManager` f’`open-sse/services/`). Jintużaw counters ibbażati fuq SQLite bħala alternattiva jekk il-proċess jerġa’ jibda.

### Sejbien ta’ Anomaliji permezz ta’ Z-Score

Għal kull API key, is-sistema żżomm tieqa kontinwa ta’ 7 ijiem tal-XP miksub kull siegħa. Ma’ kull għoti ta’ XP:

1. Ikkalkula r-rata attwali ta’ XP fis-siegħa tal-utent.
2. Ikkalkula l-medja tal-popolazzjoni u d-devjazzjoni standard.
3. Ikkalkula `z = (user_rate - mean) / stddev`.
4. Jekk `z > 3.0` (3 devjazzjonijiet standard), immarkaha bħala anomalija.

L-anomaliji jiġu rreġistrati f’`xp_audit_log` b’`action = 'anomaly_detected'` u jintwerew fid-dashboard tal-amministratur.

### Rekord tal-Awditjar

Kull għoti ta’ XP, trasferiment, kisba ta’ badge, u sejbien ta’ anomalija jiġi rreġistrat f’`xp_audit_log` b’dan li ġej:

| Qasam        | Deskrizzjoni                                  |
| ------------ | --------------------------------------------- |
| `api_key_id` | Min                                           |
| `action`     | X’ġara (xp_award, transfer, anomaly, …)       |
| `xp_awarded` | Ammont (0 għal avvenimenti li mhumiex tal-XP) |
| `metadata`   | JSON bil-kuntest (tip ta’ azzjoni, mira, …)   |
| `created_at` | Meta (ISO 8601)                               |

L-amministraturi jistgħu jikkonsultaw ir-rekord sħiħ tal-awditjar permezz ta’ `GET /api/gamification/anomalies`.

---

## Rotot tal-API

Ir-rotot kollha jsegwu l-mudell standard OmniRoute:

```
Rotta → Talba preliminari CORS → Validazzjoni tal-korp (Zod) → Awtentikazzjoni (extractApiKey)
  → Maniġġatur
```

### Punti ta' aċċess

| Metodu | Mogħdija                                   | Deskrizzjoni                                        | Awtentikazzjoni |
| ------ | ------------------------------------------ | --------------------------------------------------- | --------------- |
| GET    | `/api/gamification/leaderboard`            | Ikseb il-klassifika (ambitu, perjodu, paġinazzjoni) | Fakultattiva    |
| POST   | `/api/gamification/leaderboard`            | Ġiegħel l-aġġornament tal-cache tal-klassifika      | Meħtieġa        |
| GET    | `/api/gamification/stream`                 | Aġġornamenti SSE tal-klassifika f'ħin reali         | Fakultattiva    |
| GET    | `/api/gamification/transfer`               | Ikseb l-istorja tat-trasferimenti (paġinazzjoni)    | Meħtieġa        |
| POST   | `/api/gamification/transfer`               | Ibgħat tokens lil utent ieħor                       | Meħtieġa        |
| GET    | `/api/gamification/invite`                 | Elenka l-kodiċijiet tal-istedina tiegħi             | Meħtieġa        |
| POST   | `/api/gamification/invite`                 | Iġġenera kodiċi tal-istedina ġdid                   | Meħtieġa        |
| DELETE | `/api/gamification/invite`                 | Irrevoka kodiċi tal-istedina                        | Meħtieġa        |
| POST   | `/api/gamification/invite/redeem`          | Ifdi kodiċi tal-istedina                            | Meħtieġa        |
| GET    | `/api/gamification/servers`                | Elenka s-servers tal-komunità                       | Meħtieġa        |
| POST   | `/api/gamification/servers`                | Qabbad ma' server tal-komunità                      | Meħtieġa        |
| DELETE | `/api/gamification/servers`                | Skonnettja minn server tal-komunità                 | Meħtieġa        |
| POST   | `/api/gamification/federation/score`       | Ibgħat il-punteġġ lil server remot                  | Federazzjoni    |
| GET    | `/api/gamification/federation/leaderboard` | Iġbed il-klassifika minn server remot               | Federazzjoni    |
| GET    | `/api/gamification/notifications`          | Notifiki SSE dwar badges/tlugħ fil-livell           | Meħtieġa        |
| GET    | `/api/gamification/anomalies`              | Ara r-rapporti dwar anomaliji (amministratur)       | Amministratur   |
| POST   | `/api/gamification/rotate`                 | Ibdel is-sigrieti tat-token tal-istedina            | Meħtieġa        |

### Eżempji ta' Talbiet/Tweġibiet

**POST /api/gamification/transfer**

```json
// Talba
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// Tweġiba 200
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

// Tweġiba 400 (fondi insuffiċjenti)
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

## Għodod MCP (8)

Irreġistrati f’`open-sse/mcp-server/` flimkien mal-għodod eżistenti. Limitati għall-ambitu tal-permess
`gamification`.

| Għodda                     | Deskrizzjoni                                           | Skema tal-Input              |           |
| -------------------------- | ------------------------------------------------------ | ---------------------------- | --------- |
| `gamification_leaderboard` | Ikseb il-klassifika għal ambitu/perjodu                | `{ scope, period?, limit? }` |
| `gamification_rank`        | Ikseb il-grad tal-utent u dawk ta’ madwaru             | `{ scope }`                  |
| `gamification_profile`     | Ikseb sommarju tal-XP, livell, titlu u sensiela        | `{}`                         |
| `gamification_badges`      | Elenka l-badges miksuba jew id-definizzjonijiet kollha | `{ earned?: boolean }`       |
| `gamification_transfer`    | Ibgħat tokens lil utent ieħor                          | `{ to, amount }`             |
| `gamification_invite`      | Iġġenera jew elenka kodiċijiet ta’ stedina             | `{ action: "create"          | "list" }` |
| `gamification_servers`     | Elenka jew qabbad servers tal-komunità                 | `{ action, token? }`         |
| `gamification_anomalies`   | Ara rapporti dwar anomaliji (ambitu ta’ amministratur) | `{ limit?, since? }`         |

---

## Paġni tad-Dashboard

### `/dashboard/leaderboard`

- Wirja tal-podju (l-ewwel 3 bl-avatars u l-XP).
- Selettur tal-ambitu: Globali / Ta’ Kull Ġimgħa / Ta’ Kull Xahar / Tokens Kondiviżi / Kontribuzzjonijiet.
- Tabella b’paġinazzjoni (25 għal kull paġna) bil-grad, l-isem, il-punteġġ, il-livell u t-titlu.
- Aġġornamenti SSE f’ħin reali — il-bidliet fil-grad jiġu animati.
- L-utent attwali jiġi enfasizzat fit-tabella b’ringiela fissa "Il-Grad Tiegħek".

### `/dashboard/profile`

- Żbarra tal-progress tal-XP bil-livell attwali u l-limitu tal-livell li jmiss.
- Il-badge tat-titlu jintwera b’mod prominenti.
- Gallerija tal-badges — badges miksuba bid-data tal-kisba, filwaqt li l-badges mhux miksuba jintwerew bil-griż
  (il-badges moħbija juru "???" sakemm jinkisbu).
- Għadd tas-sensiela b’ikona ta’ fjamma; kalendarju tas-sensiela (l-aħħar 30 jum).
- Grafika tal-istorja tal-XP (XP ta’ kuljum matul l-aħħar 30 jum).

### `/dashboard/tokens`

- Bilanċ tat-tokens (prominenti, fin-naħa ta’ fuq tal-paġna).
- Formola tat-trasferiment: riċevitur, ammont, djalogu ta’ konferma.
- Tabella tal-istorja tat-trasferimenti b’filtri (mibgħuta/riċevuti/kollha).
- Taqsima tal-istediniet: kodiċijiet attivi, iġġenera wieħed ġdid, ikkondividi l-link.
- Servers tal-komunità: lista bl-istatus tas-saħħa, qabbad/skonnettja.

### `/dashboard/gamification/admin`

- Lista tal-anomaliji bis-severità, l-utent, it-timbru tal-ħin u z-score.
- Viżwalizzatur tar-reġistru tal-awditjar b’filtri (tip ta’ azzjoni, utent, medda ta’ dati).
- Statistika tas-sistema: XP totali mogħti, utenti attivi, rati tal-kisba tal-badges.
- Ħarsa ġenerali lejn is-saħħa tas-servers tal-federazzjoni.

---

## Integrazzjoni tal-Pipeline

### Punt ta’ Integrazzjoni

Il-gamifikazzjoni tintegra fil-pipeline tat-talbiet f’punt wieħed f’
`open-sse/handlers/chatCore.ts`:

```typescript
// Wara li r-rispons jintbagħat lill-klijent:
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
    // Eżegwixxi u tinsieħ: irreġistra iżda qatt tgħaddi lill-klijent
  });
});
```

### Tipi ta’ Avvenimenti

| Tip ta’ Avveniment  | Meta Jiġi Emess                                    |
| ------------------- | -------------------------------------------------- |
| `request.completed` | Intbagħat rispons LLM b’suċċess                    |
| `provider.switch`   | Inbidel il-fornitur (il-fallback tal-combo jgħodd) |
| `combo.created`     | Ġiet issejvjata konfigurazzjoni ġdida tal-combo    |
| `combo.used`        | Il-mira tal-combo intlaħqet b’suċċess              |
| `badge.earned`      | L-evalwazzjoni tal-badge sabet taqbila             |
| `streak.milestone`  | Inqabeż il-limitu tas-sensiela                     |
| `transfer.sent`     | Tlesta t-trasferiment tat-tokens                   |
| `referral.redeemed` | Il-kodiċi tal-istedina ġie mifdi b’suċċess         |
| `compression.used`  | Ġiet applikata l-kompressjoni tal-prompt           |
| `skill.executed`    | Tlestiet l-eżekuzzjoni tal-ħila                    |
| `model.first_use`   | Il-mudell ma ntużax matul l-aħħar 7 ijiem          |

### Garanzija ta’ Nuqqas ta’ Imblukkar

Il-mudell `setImmediate` + `.catch(() => {})` jiżgura:

1. Ir-rispons jintbagħat kompletament qabel ma titħaddem il-gamifikazzjoni.
2. L-iżbalji tal-gamifikazzjoni qatt ma jintwerew lill-klijent.
3. L-ipproċessar tal-avveniment jitħaddem fil-mikrokompitu li jmiss, mhux inline.

---

## Sigurtà

### Mudell tat-Theddid

| Theddida                                              | Mitigazzjoni                                                                               |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| Żieda artifiċjali tal-punteġġ                         | Il-kalkolu tal-XP isir biss fuq is-server; il-klijenti jibagħtu azzjonijiet, mhux punteġġi |
| Attakki ta’ ripetizzjoni                              | Ċwievet tal-idempotenza fuq it-trasferimenti; deduplikazzjoni tar-reġistru tal-awditjar    |
| Frodi fit-trasferimenti                               | Reġistru b’entrati doppji; tranżazzjonijiet atomiċi; limiti tar-rata                       |
| Awtoriferiment                                        | Verifika inkroċjata ta’ `api_key_id` waqt it-tisrif                                        |
| Manipulazzjoni tal-klassifika                         | Sejbien ta’ anomaliji permezz ta’ Z-score; dashboard tal-anomaliji għall-amministraturi    |
| Serq tat-token tal-federazzjoni                       | Ħażna bil-hashing SHA-256; it-token mhux ipproċessat jintwera darba biss                   |
| Tentattivi bi forza bruta fuq kodiċijiet tal-istedina | Limitazzjoni tar-rata fuq l-endpoint tat-tisrif; entropija ta’ 8 karattri                  |
| XSS fl-ismijiet għall-wiri                            | L-ismijiet għall-wiri jiġu sanitizzati; l-entrati tal-klassifika jiġu escaped              |
| Attakki taż-żmien fuq il-hashes                       | `crypto.timingSafeEqual` għat-tqabbil tal-hash tat-token                                   |

### Rekwiżiti tal-Awtentikazzjoni

- **Pubbliku** (mingħajr awtentikazzjoni): `GET /leaderboard`, `GET /stream` (klassifiki
  għall-qari biss).
- **API key meħtieġa**: l-operazzjonijiet kollha ta’ kitba, il-profil, it-trasferimenti u l-istediniet.
- **Għall-amministraturi biss**: dashboard tal-anomaliji, viżwalizzatur tar-reġistru tal-awditjar.
- **Federazzjoni**: perkors ta’ awtentikazzjoni separat li juża t-token mhux ipproċessat fil-header
  `Authorization`, ivvalidat mal-hash SHA-256 maħżun.

---

## Ittestjar

### Fajls tat-Testijiet

It-testijiet kollha jużaw l-eżekutur nattiv tat-testijiet ta’ Node.js (`node --import tsx/esm --test`).

| Fajl tat-Test                                 | Ikopri                                                      | Testijiet |
| --------------------------------------------- | ----------------------------------------------------------- | --------- |
| `tests/unit/gamification/xp.test.ts`          | Kalkolu tal-XP, kurva tal-livelli, titli                    | 8         |
| `tests/unit/gamification/badges.test.ts`      | Tqabbil tal-kriterji tal-badges, għoti                      | 10        |
| `tests/unit/gamification/streaks.test.ts`     | Loġika tas-sensiliet, stadji importanti, każijiet estremi   | 7         |
| `tests/unit/gamification/leaderboard.test.ts` | Kalkolu tal-klassifika, paġinazzjoni, rotazzjoni            | 8         |
| `tests/unit/gamification/sharing.test.ts`     | Trasferimenti, bilanċ, idempotenza                          | 9         |
| `tests/unit/gamification/invites.test.ts`     | Ħolqien, tisrif, skadenza, awtoriferiment                   | 7         |
| `tests/unit/gamification/antiCheat.test.ts`   | Limiti tar-rata, z-score, reġistrazzjoni tal-awditjar       | 6         |
| `tests/unit/gamification/events.test.ts`      | Emissjoni ta’ avvenimenti, fan-out, immaniġġjar tal-iżbalji | 5         |

### Eżekuzzjoni tat-Testijiet

```bash
# It-testijiet kollha tal-gamifikazzjoni
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# Fajl wieħed tat-test
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Rekwiżiti tal-Kopertura

Skont `CONTRIBUTING.md` — il-moduli ġodda kollha għandu jkollhom:

- Kopertura tal-fergħat >= 80%.
- Kull funzjoni pubblika ttestjata mill-inqas darba.
- Perkorsi tal-iżbalji ttestjati (bilanċ insuffiċjenti, kodiċijiet skaduti, limiti tar-rata).

---

## Struttura tal-Fajls

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # It-8 tabelli kollha + indiċijiet
      gamification.ts                  # Modulu CRUD tad-dominju
    gamification/
      xp.ts                           # Kalkolu tal-XP, kurva tal-livelli, titli
      badges.ts                       # Definizzjonijiet tal-badges, kriterji, evalwazzjoni
      streaks.ts                      # Traċċar tas-serje ta' kuljum
      leaderboard.ts                  # Kalkolu tal-klassifika, SSE, rotazzjoni
      antiCheat.ts                    # Limitazzjoni tar-rata, z-score, awditjar
      sharing.ts                      # Reġistru tat-trasferimenti tat-tokens
      invites.ts                      # Kodiċijiet ta' stedina/fidwa
      servers.ts                      # Federazzjoni ta' servers tal-komunità
      events.ts                       # Emettitur tal-avvenimenti (punt ta' integrazzjoni)
      notifications.ts                # Fluss SSE tan-notifiki
  app/
    api/
      gamification/
        leaderboard/route.ts          # Klassifika GET/POST
        leaderboard/stream/route.ts   # Aġġornamenti SSE f'ħin reali
        transfer/route.ts             # Trasferimenti GET/POST
        invite/route.ts               # Kodiċijiet ta' stedina GET/POST/DELETE
        invite/redeem/route.ts        # Fidwa ta' kodiċi permezz ta' POST
        servers/route.ts              # Servers GET/POST/DELETE
        federation/score/route.ts     # Tibgħat punteġġ permezz ta' POST
        federation/leaderboard/route.ts # Tikseb il-klassifika permezz ta' GET
        notifications/route.ts        # Notifiki SSE
        anomalies/route.ts            # Rapporti dwar anomaliji permezz ta' GET
        rotate/route.ts               # Rotazzjoni tas-sigrieti permezz ta' POST
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Paġna tal-klassifiki
        profile/page.tsx               # Paġna tal-XP/badges/serje
        tokens/page.tsx                # Paġna tal-bilanċ/trasferimenti/istediniet
        gamification/admin/page.tsx    # Monitoraġġ tal-anomaliji għall-amministraturi
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
    GAMIFICATION.md                    # Dan id-dokument
```

---

## Strateġija tal-Migrazzjoni

### Fażi 1: Qalba tal-Backend (PR 1)

- Migrazzjoni `060_create_gamification.sql` (8 tabelli).
- `src/lib/db/gamification.ts` (modulu tad-dominju).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- Punt ta' integrazzjoni f'`chatCore.ts`.
- Testijiet unitarji għall-XP, is-serje, u l-avvenimenti.

### Fażi 2: Badges u Klassifika (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Definizzjonijiet tal-badges fil-kostanti.
- Rotot API tal-klassifika + fluss SSE.
- Testijiet unitarji għall-badges u l-klassifika.

### Fażi 3: Kondiviżjoni u Stediniet (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- Rotot API għat-trasferimenti u l-istediniet.
- Testijiet unitarji għall-kondiviżjoni, l-istediniet, u l-prevenzjoni tal-qerq.

### Fażi 4: Federazzjoni u Dashboard (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- Rotot API tal-federazzjoni.
- Paġni tad-dashboard (klassifika, profil, tokens, amministrazzjoni).
- Reġistrazzjoni tal-għodod MCP.

---

## Kunsiderazzjonijiet Futuri

- **Avvenimenti staġjonali**: settijiet ta’ badges għal żmien limitat u staġuni tal-klassifika.
- **Klassifiki tat-timijiet**: raggruppa lill-utenti skont l-organizzazzjoni jew il-kombinazzjoni.
- **Multiplikaturi tal-XP**: żid l-XP matul perjodi promozzjonali.
- **Kondiviżjoni tal-kisbiet**: iġġenera karti tal-badges li jistgħu jiġu kondiviżi (immaġnijiet OpenGraph).
- **Notifiki push fuq il-mowbajl**: notifiki bbażati fuq webhooks għal avvenimenti ta’ badges/livelli.
- **API tal-klassifika**: API pubblika għal integrazzjonijiet ma’ partijiet terzi.
