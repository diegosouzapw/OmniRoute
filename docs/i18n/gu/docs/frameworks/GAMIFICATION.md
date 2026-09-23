# Gamification & Leaderboard System (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **સત્યનો સ્રોત:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **છેલ્લે અપડેટ કરેલું:** 2026-06-28 — v3.8.40

OmniRoute સ્થાનિક-પ્રથમ ગેમિફિકેશન સ્તર ધરાવે છે, જે વપરાશકર્તાઓને
પ્લેટફોર્મ સાથે જોડાવા બદલ પુરસ્કાર આપે છે — વિનંતીઓ કરવા, પ્રદાતાઓ બદલવા,
કોમ્બો બનાવવા, ટોકન શેર કરવા અને સમુદાયમાં યોગદાન આપવા બદલ. તમામ સ્થિતિ
SQLiteમાં રહે છે; સમુદાય સર્વરો સાથેનું ફેડરેશન વૈકલ્પિક અને પુશ-આધારિત છે.

આ સિસ્ટમને **મુખ્ય કાર્યપથ પર શૂન્ય-વિલંબતા** માટે ડિઝાઇન કરવામાં આવી છે —
ગેમિફિકેશન ઇવેન્ટ્સ રિક્વેસ્ટ પાઇપલાઇનમાંથી મોકલીને ભૂલી જવાની રીતે ડિસ્પેચ
થાય છે અને ક્યારેય LLM પ્રતિસાદને અવરોધતી નથી.

---

## અવલોકન

### હેતુ

દૃશ્યમાન પ્રગતિ (XP, લેવલ, બેજ), સામાજિક પ્રમાણ (લીડરબોર્ડ) અને આર્થિક
પ્રોત્સાહનો (ટોકન શેરિંગ, આમંત્રણ પુરસ્કારો) આપીને વપરાશકર્તાની સંલગ્નતા
અને જાળવણી વધારવી.

### કાર્યક્ષેત્ર

| સુવિધા                     | વર્ણન                                                             |
| -------------------------- | ----------------------------------------------------------------- |
| XP અને લેવલ                | દરેક ક્રિયા માટે XP મેળવો; બહુપદીય વક્ર અનુસાર લેવલ વધારો         |
| બેજ                        | 4 દુર્લભતા સ્તરો સાથે 5 શ્રેણીઓમાં 20+ સિદ્ધિઓ                    |
| સતત શ્રેણીઓ                | વર્તમાન/સૌથી લાંબી સતત શ્રેણી સાથે દૈનિક સક્રિય વપરાશનું ટ્રેકિંગ |
| લીડરબોર્ડ                  | વૈશ્વિક, સાપ્તાહિક, માસિક, ટોકન-શેરિંગ અને યોગદાન કાર્યક્ષેત્રો   |
| ટોકન શેરિંગ                | ડબલ-એન્ટ્રી લેજર દ્વારા વપરાશકર્તાઓ વચ્ચે ક્રેડિટ ટ્રાન્સફર કરો   |
| આમંત્રિત કરો અને રિડીમ કરો | SHA-256 હેશ કરેલા સંગ્રહ સાથે રેફરલ કોડ                           |
| સમુદાય સર્વરો              | બાહ્ય OmniRoute ઇન્સ્ટન્સ સાથે ફેડરેટ કરો                         |
| છેતરપિંડી-વિરોધી           | સર્વર-સાઇડ સ્કોરિંગ, દર મર્યાદા, z-score વિસંગતિ શોધ              |

### ડિઝાઇન સિદ્ધાંતો

1. **સ્થાનિક-પ્રથમ** — તમામ સ્થિતિ SQLiteમાં, કોઈ બાહ્ય સેવાઓ જરૂરી નથી.
2. **અવરોધ-રહિત** — ઇવેન્ટ્સ મોકલીને ભૂલી જવાની રીતની છે; LLM પ્રતિસાદ પથમાં
   ગેમિફિકેશન લોજિકને કારણે ક્યારેય વિલંબ થતો નથી.
3. **સર્વર-અધિકૃત** — XPની ગણતરી માત્ર સર્વર-સાઇડ થાય છે; ક્લાયન્ટ સ્કોર
   કૃત્રિમ રીતે વધારી શકતા નથી.
4. **ગોપનીયતાનો આદર કરતી** — લીડરબોર્ડમાં ભાગીદારી વૈકલ્પિક છે; વપરાશકર્તાઓ
   પોતાની પ્રોફાઇલ છુપાવી શકે છે.
5. **ફેડરેશન માટે તૈયાર** — સમુદાય સર્વરો સહી કરેલ API દ્વારા સ્કોર પુશ કરી શકે છે;
   સિંક ઓવરરાઇટ કરે છે, ઉમેરો નહીં.

---

## આર્કિટેક્ચર

### ઉચ્ચ-સ્તરીય પ્રવાહ

```
ક્લાયન્ટ વિનંતી
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (હાલની પાઇપલાઇન) ...
      → અપસ્ટ્રીમ પ્રતિસાદ ક્લાયન્ટને મોકલાયો
      → setImmediate (મોકલીને ભૂલી જવું):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

ઇવેન્ટ એમિટર એકમાત્ર એકીકરણ બિંદુ છે. પ્રતિસાદ મોકલાઈ ગયા પછી `chatCore.ts`
`emitGamificationEvent()`ને કૉલ કરે છે; ઇવેન્ટ મોડ્યુલ XP, સતત શ્રેણી, બેજ,
લીડરબોર્ડ અને છેતરપિંડી-વિરોધી ઉપપ્રણાલીઓમાં વિતરણ કરે છે.

### મોડ્યુલ નિર્ભરતા ગ્રાફ

```
src/lib/gamification/
  events.ts          ← પ્રવેશ બિંદુ (chatCore.tsમાંથી કૉલ થાય છે)
    ├── xp.ts        ← XP ગણતરી અને લેવલ નિર્ધારણ
    ├── streaks.ts   ← દૈનિક સક્રિય સતત શ્રેણીનું ટ્રેકિંગ
    ├── badges.ts    ← બેજ માપદંડનું મૂલ્યાંકન
    ├── leaderboard.ts ← રેન્કની ગણતરી અને SSE બ્રોડકાસ્ટિંગ
    ├── antiCheat.ts ← દર મર્યાદા અને વિસંગતિ શોધ
    ├── sharing.ts   ← ટોકન ટ્રાન્સફર લેજર
    ├── invites.ts   ← આમંત્રણ/રિડીમ કોડ વ્યવસ્થાપન
    ├── servers.ts   ← સમુદાય સર્વર ફેડરેશન
    └── notifications.ts ← SSE સૂચના સ્ટ્રીમ

src/lib/db/
  gamification.ts    ← તમામ CRUD કામગીરી (8 કોષ્ટકો)

src/app/api/gamification/
  leaderboard/       ← GET રેન્કિંગ, POST મેન્યુઅલ રિફ્રેશ
  leaderboard/stream ← SSE રીઅલ-ટાઇમ અપડેટ્સ
  transfer/          ← GET ઇતિહાસ, POST ટોકન મોકલો
  invite/            ← GET/POST કોડ, DELETE રદ કરો
  invite/redeem/     ← POST કોડ રિડીમ કરો
  servers/           ← GET/POST/DELETE સમુદાય સર્વરો
  federation/score/  ← POST સર્વર પર સ્કોર પુશ કરો
  federation/leaderboard/ ← GET સર્વર પરથી લીડરબોર્ડ મેળવો
  notifications/     ← SSE બેજ/લેવલ-અપ સૂચનાઓ
  anomalies/         ← GET વિસંગતિ અહેવાલો (એડમિન)
  rotate/            ← POST આમંત્રણ ટોકન સિક્રેટ્સ રોટેટ કરો
```

---

## ડેટા લેયર

### ડેટાબેઝ કોષ્ટકો

તમામ કોષ્ટકો મુખ્ય OmniRoute SQLite ડેટાબેઝમાં હોય છે, જે માઇગ્રેશન
`060_create_gamification.sql` દ્વારા બનાવવામાં આવે છે. WAL જર્નલિંગ `src/lib/db/core.ts` માં રહેલા સિંગલટન
`getDbInstance()` પાસેથી વારસામાં મળે છે.

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

### ડોમેન મોડ્યુલ: `src/lib/db/gamification.ts`

આ માનક OmniRoute પેટર્નને અનુસરે છે — `core.ts` માંથી `getDbInstance()` આયાત કરે છે અને
ટાઇપ કરેલા CRUD ફંક્શન્સ નિકાસ કરે છે. રૂટ હેન્ડલર્સમાં કોઈ રૉ SQL નથી.

મુખ્ય ફંક્શન્સ:

| ફંક્શન                     | વર્ણન                                                          |
| -------------------------- | -------------------------------------------------------------- |
| `upsertLeaderboardEntry()` | (api_key_id, scope, period) માટે સ્કોર દાખલ અથવા અપડેટ કરે છે  |
| `getLeaderboard()`         | આપેલ scope/period માટે પેજિનેટેડ રેન્કિંગ્સ                    |
| `getUserLevel()`           | વપરાશકર્તાનો લેવલ રેકોર્ડ મેળવે અથવા બનાવે છે                  |
| `updateUserLevel()`        | XP, લેવલ અને શીર્ષક એટોમિક રીતે સેટ કરે છે                     |
| `getBadgeDefinitions()`    | તમામ બેજ વ્યાખ્યાઓ (વૈકલ્પિક રીતે ફિલ્ટર કરેલી)                |
| `getUserBadges()`          | વપરાશકર્તાએ મેળવેલા બેજ                                        |
| `awardBadge()`             | મેળવેલો બેજ દાખલ કરે છે (badge_id પર આઇડેમ્પોટન્ટ)             |
| `logXpAction()`            | xp_audit_log માં ઉમેરે છે                                      |
| `getXpAuditLog()`          | વપરાશકર્તા માટે પેજિનેટેડ ઑડિટ ઇતિહાસ                          |
| `insertLedgerEntry()`      | ડબલ-એન્ટ્રી ટ્રાન્સફર (ટ્રાન્ઝેક્શનની અંદર)                    |
| `getBalance()`             | વપરાશકર્તા માટે પ્રાપ્ત થયેલામાંથી મોકલેલાનો સરવાળો બાદ કરે છે |
| `getTransferHistory()`     | પેજિનેટેડ ટ્રાન્સફર લૉગ                                        |
| `createInviteToken()`      | આમંત્રણ કોડ + હેશ કરેલું ટોકન દાખલ કરે છે                      |
| `redeemInviteToken()`      | કોડ દ્વારા શોધે છે, માન્યતા તપાસે છે અને uses વધારે છે         |
| `upsertCommunityServer()`  | ફેડરેશન સર્વર નોંધણી કરે અથવા અપડેટ કરે છે                     |
| `getCommunityServers()`    | વપરાશકર્તા માટેના સર્વરોની સૂચિ આપે છે                         |
| `deleteCommunityServer()`  | સર્વરની નોંધણી દૂર કરે છે                                      |

---

## XP / લેવલ સિસ્ટમ

**ફાઇલ:** `src/lib/gamification/xp.ts`

### લેવલ કર્વ

લેવલ `n` સુધી પહોંચવા માટે જરૂરી XP પોલિનોમિયલ કર્વને અનુસરે છે:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| લેવલ | આગળના લેવલ માટે XP | સંચિત XP  | ઉપાધિ     |
| ---- | ------------------ | --------- | --------- |
| 1    | 100                | 100       | પ્રારંભિક |
| 5    | 1,118              | 2,415     | પ્રારંભિક |
| 10   | 3,162              | 10,523    | અન્વેષક   |
| 25   | 12,500             | 86,024    | અન્વેષક   |
| 50   | 35,355             | 345,529   | નિષ્ણાત   |
| 75   | 64,952             | 948,683   | માસ્ટર    |
| 100  | 100,000            | 2,050,000 | દંતકથા    |

### ઉપાધિઓ

| લેવલ શ્રેણી | ઉપાધિ     |
| ----------- | --------- |
| 1 – 9       | પ્રારંભિક |
| 10 – 24     | અન્વેષક   |
| 25 – 49     | નિષ્ણાત   |
| 50 – 74     | માસ્ટર    |
| 75 – 100    | દંતકથા    |

### XP પુરસ્કારો

| ક્રિયા            | XP  | વર્ણન                                                        |
| ----------------- | --- | ------------------------------------------------------------ |
| `request`         | 1   | OmniRoute મારફતે રૂટ થતી દરેક API વિનંતી દીઠ                 |
| `provider_switch` | 5   | અલગ પ્રદાતા પર સ્વિચ કરવા માટે                               |
| `model_switch`    | 3   | અલગ મોડેલ પર સ્વિચ કરવા માટે                                 |
| `combo_create`    | 10  | નવું કોમ્બો બનાવવા માટે                                      |
| `combo_use`       | 2   | વિનંતી માટે કોમ્બોનો ઉપયોગ કરવા માટે                         |
| `token_share`     | 1   | અન્ય વપરાશકર્તા સાથે શેર કરેલા દર 1 000 ટોકન દીઠ             |
| `invite_redeem`   | 50  | આમંત્રણ કોડ રિડીમ કરવા માટે                                  |
| `daily_login`     | 5   | દૈનિક સક્રિય ઉપયોગ (દિવસમાં એકવાર)                           |
| `streak_bonus`    | 2   | સતત સ્ટ્રીકના દરેક દિવસ દીઠ (સ્ટ્રીકની લંબાઈથી ગુણાકાર કરેલ) |
| `badge_unlock`    | 10  | બેજ અનલૉક કરવા માટે                                          |

### પુરસ્કાર પ્રવાહ

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. XPની માત્રા મેળવવા માટે `XP_REWARDS[action]` શોધો.
2. `checkRateLimit()`માંથી પસાર કરો (છેતરપિંડી-વિરોધી: પ્રતિ કી મહત્તમ 1000 XP/મિનિટ).
3. ટ્રાન્ઝેક્શન ખોલો:
   - વર્તમાન `user_levels` પંક્તિ વાંચો.
   - XP ઉમેરો; `levelFromXp(totalXp)` દ્વારા લેવલની પુનઃગણતરી કરો.
   - જો લેવલ બદલાયો હોય, તો `levelUp = true` સેટ કરો.
   - `user_levels` પંક્તિ અપડેટ કરો.
   - `xp_audit_log`માં દાખલ કરો.
4. પરિણામ પરત કરો. કૉલર સૂચનાઓ સંભાળે છે.

### સહાયક: `levelFromXp(totalXp)`

લેવલ 1..100 પર પુનરાવર્તન કરે છે અને સંચિત XP `totalXp` કરતાં વધી જાય ત્યાં સુધી `xp_for_level(n)`નો સરવાળો કરે છે. જેનું થ્રેશોલ્ડ પૂર્ણ થયું હોય તે સર્વોચ્ચ લેવલ પરત કરે છે.
આ O(100) છે — લેવલની મહત્તમ મર્યાદા 100 હોવાથી સ્વીકાર્ય છે.

---

## બેજ સિસ્ટમ

**ફાઇલ:** `src/lib/gamification/badges.ts`

### શ્રેણીઓ

| શ્રેણી         | વર્ણન                                   | ઉદાહરણ બેજ                      |
| -------------- | --------------------------------------- | ------------------------------- |
| `usage`        | વોલ્યુમ-આધારિત સીમાચિહ્નો               | પ્રથમ વિનંતી, 1K વિનંતીઓ, 100K  |
| `sharing`      | ટોકન શેરિંગ અને રેફરલ                   | પ્રથમ શેર, ઉદાર (10 શેર)        |
| `contribution` | સમુદાય સહભાગિતા                         | કોમ્બો સર્જક, પ્રદાતા અન્વેષક   |
| `streak`       | સમય જતાં સાતત્ય                         | સાપ્તાહિક યોદ્ધા, માસિક સમર્પિત |
| `rare`         | મેળવવામાં મુશ્કેલ અથવા છુપાયેલી સિદ્ધિઓ | પ્રારંભિક અપનાવનાર, બગ રિપોર્ટર |

### દુર્લભતાઓ

| દુર્લભતા    | રંગ    | સંભાવનાનો સંકેત       |
| ----------- | ------ | --------------------- |
| `common`    | રાખોડી | મોટાભાગના વપરાશકર્તાઓ |
| `uncommon`  | લીલો   | સક્રિય વપરાશકર્તાઓ    |
| `rare`      | વાદળી  | સમર્પિત વપરાશકર્તાઓ   |
| `legendary` | સોનેરી | ટોચના 1%              |

### માપદંડના પ્રકારો

| પ્રકાર         | ફીલ્ડ        | વર્ણન                                                |
| -------------- | ------------ | ---------------------------------------------------- |
| `action_count` | `count`      | ક્રિયા N વખત કરો (દા.ત., 1000 વિનંતીઓ)               |
| `streak`       | `days`       | સતત N દિવસ સુધી સ્ટ્રીક જાળવો                        |
| `unique_count` | `field`, `n` | N અનન્ય મૂલ્યોનો ઉપયોગ કરો (દા.ત., 10 અલગ મોડેલ)     |
| `rank`         | `scope`, `n` | લીડરબોર્ડના સ્કોપમાં Nમો રેન્ક મેળવો                 |
| `first`        | —            | કોઈ ક્રિયા કરનાર પ્રથમ વ્યક્તિ બનો                   |
| `hidden`       | (બદલાય છે)   | મેળવવામાં ન આવે ત્યાં સુધી માપદંડ બતાવવામાં આવતા નથી |

બેજની વ્યાખ્યાઓ `badge_definitions`માં JSON `criteria` તરીકે સંગ્રહિત થાય છે:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### મૂલ્યાંકન પ્રવાહ

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # બધી વ્યાખ્યાઓ
    → getUserBadges(apiKeyId)         # પહેલેથી મેળવેલા (છોડી દો)
    → દરેક ન મેળવેલા બેજ માટે:
       → matchesCriteria(badge, event, userState)
       → જો મેળ ખાય: awardBadge(apiKeyId, badgeId)
         → સૂચના પેલોડ પરત કરો
```

મૂલ્યાંકન **ઇવેન્ટ-આધારિત** છે — તે દરેક ગેમિફિકેશન ઇવેન્ટ પછી ચાલે છે, પરંતુ માત્ર એવા બેજ તપાસે છે જેમનો `criteria.type` ઇવેન્ટ ક્રિયા સાથે સંરેખિત હોય. આ મૂલ્યાંકનને ઝડપી રાખે છે (મોટાભાગની ઇવેન્ટ માટે < 5ms).

### `matchesCriteria(badge, event, userState)`

| માપદંડનો પ્રકાર | તપાસ                                                           |
| --------------- | -------------------------------------------------------------- |
| `action_count`  | `getActionCount(apiKeyId, action) >= count`                    |
| `streak`        | `getCurrentStreak(apiKeyId) >= days`                           |
| `unique_count`  | `getUniqueCount(apiKeyId, field) >= n`                         |
| `rank`          | `getRank(apiKeyId, scope) <= n`                                |
| `first`         | આ ક્રિયાના પ્રકાર માટે અગાઉની કોઈ `xp_audit_log` એન્ટ્રી ન હોય |
| `hidden`        | યોગ્ય પેટા-તપાસને સોંપે છે                                     |

### બિલ્ટ-ઇન બેજ (20+)

<details>
<summary>બેજની સંપૂર્ણ સૂચિ</summary>

| બૅજ                | શ્રેણી  | દુર્લભતા   | માપદંડ                          |
| ------------------ | ------- | ---------- | ------------------------------- |
| પ્રથમ પગલાં        | ઉપયોગ   | સામાન્ય    | 1 વિનંતી                        |
| શરૂઆતની તૈયારી     | ઉપયોગ   | સામાન્ય    | 100 વિનંતીઓ                     |
| પાવર યુઝર          | ઉપયોગ   | અસામાન્ય   | 1,000 વિનંતીઓ                   |
| શતાધિપતિ           | ઉપયોગ   | દુર્લભ     | 10,000 વિનંતીઓ                  |
| સર્વશક્તિ          | ઉપયોગ   | દંતકથાસમાન | 100,000 વિનંતીઓ                 |
| પ્રદાતા પરિવર્તક   | યોગદાન  | સામાન્ય    | 5 અલગ-અલગ પ્રદાતાઓનો ઉપયોગ કરો  |
| પ્રદાતા નિષ્ણાત    | યોગદાન  | અસામાન્ય   | 20 અલગ-અલગ પ્રદાતાઓનો ઉપયોગ કરો |
| કોમ્બો રચનાકાર     | યોગદાન  | અસામાન્ય   | 5 કોમ્બો બનાવો                  |
| કોમ્બો મહાનિષ્ણાત  | યોગદાન  | દુર્લભ     | 25 કોમ્બો બનાવો                 |
| પ્રથમ વહેંચણી      | વહેંચણી | સામાન્ય    | 1 ટોકન ટ્રાન્સફર                |
| ઉદાર               | વહેંચણી | અસામાન્ય   | 10 ટોકન ટ્રાન્સફર               |
| પરોપકારી           | વહેંચણી | દુર્લભ     | કુલ 10,000 ટોકન ટ્રાન્સફર કરો   |
| ભલામણકર્તા         | વહેંચણી | સામાન્ય    | 1 સફળ ભલામણ                     |
| નેટવર્ક નિર્માતા   | વહેંચણી | અસામાન્ય   | 10 સફળ ભલામણો                   |
| સપ્તાહ યોદ્ધા      | સાતત્ય  | અસામાન્ય   | 7 દિવસનું સાતત્ય                |
| માસિક સમર્પિત      | સાતત્ય  | દુર્લભ     | 30 દિવસનું સાતત્ય               |
| અણનમ               | સાતત્ય  | દંતકથાસમાન | 365 દિવસનું સાતત્ય              |
| પ્રારંભિક અપનાવનાર | દુર્લભ  | દંતકથાસમાન | બીટા સમયગાળા દરમિયાન જોડાઓ      |
| કમ્પ્રેશન પ્રણેતા  | દુર્લભ  | અસામાન્ય   | કમ્પ્રેશનનો 100 વખત ઉપયોગ કરો   |
| કૌશલ્ય સંગ્રાહક    | દુર્લભ  | દુર્લભ     | 10 અલગ-અલગ કૌશલ્યોનો ઉપયોગ કરો  |
| મોડેલ અન્વેષક      | યોગદાન  | અસામાન્ય   | 15 અલગ-અલગ મોડેલોનો ઉપયોગ કરો   |

</details>

---

## સ્ટ્રીક ટ્રેકર

**ફાઇલ:** `src/lib/gamification/streaks.ts`

### ડેટા મોડલ

સ્ટ્રીક્સને `key_value` ટેબલમાં (શેર કરેલ યુટિલિટી ટેબલ) નેમસ્પેસવાળી કીઝ હેઠળ સંગ્રહિત કરવામાં આવે છે:

| કી                            | મૂલ્ય                            | વર્ણન                 |
| ----------------------------- | -------------------------------- | --------------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | સક્રિય સ્ટ્રીકનો ડેટા |

### લોજિક

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. `key_value`માંથી સ્ટ્રીક રેકોર્ડ વાંચો.
2. `{current}`, `{longest}`, `{lastDate}` (ISO તારીખ સ્ટ્રિંગ) પાર્સ કરો.
3. જો `lastDate === today` હોય — કોઈ ફેરફાર નહીં (આજ માટે પહેલેથી ગણતરી થઈ ચૂકી છે).
4. જો `lastDate === yesterday` હોય — `current` વધારો; જરૂર હોય તો `longest` અપડેટ કરો.
5. જો `lastDate < yesterday` હોય — `current = 1` પર રીસેટ કરો (સ્ટ્રીક તૂટી ગઈ).
6. અપડેટ થયેલ રેકોર્ડ લખો.
7. માઇલસ્ટોન્સ તપાસો: 7, 14, 30, 60, 90, 180, 365 દિવસ. જો કોઈ માઇલસ્ટોન પાર થયો હોય, તો
   `milestone = true` સેટ કરો (કૉલર XP આપે છે અને બેજ તપાસે છે).

### વિશિષ્ટ પરિસ્થિતિઓ

- **ટાઇમઝોન**: સ્ટ્રીક્સ UTC તારીખોનો ઉપયોગ કરે છે (`new Date().toISOString().slice(0, 10)`).
  આ ઇરાદાપૂર્વક છે — એક જ પ્રમાણભૂત ટાઇમઝોન ટાઇમઝોન બદલતા રહીને સિસ્ટમનો દુરુપયોગ થતો અટકાવે છે.
- **નવા વપરાશકર્તાઓ**: કોઈ સ્ટ્રીક રેકોર્ડ અસ્તિત્વમાં હોતો નથી; પ્રથમ રિક્વેસ્ટ તેને
  `current=1, longest=1, lastDate=today` સાથે બનાવે છે.
- **દરરોજ બહુવિધ રિક્વેસ્ટ્સ**: UTC દિવસની માત્ર પ્રથમ રિક્વેસ્ટ જ
  સ્ટ્રીક વધારે છે.

---

## લીડરબોર્ડ

**ફાઇલ:** `src/lib/gamification/leaderboard.ts`

### સ્કોપ્સ

| સ્કોપ           | અવધિ    | વર્ણન                                                     |
| --------------- | ------- | --------------------------------------------------------- |
| `global`        | `all`   | અત્યાર સુધીનો સંચિત XP                                    |
| `weekly`        | `week`  | વર્તમાન UTC અઠવાડિયામાં મેળવેલ XP (સોમ-રવિ)               |
| `monthly`       | `month` | વર્તમાન UTC મહિનામાં મેળવેલ XP                            |
| `tokens_shared` | `all`   | અન્ય લોકોને ટ્રાન્સફર કરેલા કુલ ટોકન્સ                    |
| `contributions` | `all`   | બનાવેલા કોમ્બોઝ + વપરાયેલા પ્રોવાઇડર્સ + વપરાયેલી સ્કિલ્સ |

### રેન્કની ગણતરી

રેન્ક્સ સંગ્રહિત થતી નથી, પરંતુ **વાંચવાના સમયે ગણવામાં આવે છે**. આનાથી જૂનો થઈ ગયેલો રેન્ક ડેટા ટળે છે
અને સમયાંતરે રેન્કની પુનઃગણતરી કરવા માટેની જોબ્સની જરૂરિયાત દૂર થાય છે.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

ક્વેરી પેટર્ન:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### અવધિનું રોટેશન

સાપ્તાહિક અને માસિક લીડરબોર્ડ્સ આપમેળે રોટેટ થાય છે:

1. **આર્કાઇવ**: અવધિની સીમા પર, વર્તમાન એન્ટ્રીઝને અવધિના લેબલ સાથે
   `leaderboard_archive`માં કૉપી કરો.
2. **રીસેટ**: સમાપ્ત થયેલી અવધિ માટેની એન્ટ્રીઝ ડિલીટ કરો.
3. **ટ્રિગર**: દરેક `updateLeaderboard()` કૉલ પર તપાસ કરવામાં આવે છે; નવી અવધિની પ્રથમ રિક્વેસ્ટ
   રોટેશન ટ્રિગર કરે છે.

આનાથી સાપ્તાહિક બોર્ડ્સ દર સોમવારે 00:00 UTC પર અને માસિક બોર્ડ્સ
દર મહિનાની પહેલી તારીખે રીસેટ થાય છે.

### SSE રીઅલ-ટાઇમ અપડેટ્સ

**એન્ડપોઇન્ટ:** `GET /api/gamification/stream`

```
ક્લાયન્ટ → GET /api/gamification/stream
  → SSE કનેક્શન સ્થાપિત થાય છે
  → સર્વર તરત જ ટોચના 10 લીડરબોર્ડનો સ્નૅપશૉટ મોકલે છે
  → દર 5 સેકન્ડે: જો ફેરફાર થયો હોય તો અપડેટ થયેલ ટોચના 10 મોકલો
  → દર 15 સેકન્ડે: હાર્ટબીટ ટિપ્પણી (": heartbeat\n\n")
  → ક્લાયન્ટ ડિસ્કનેક્ટ થાય છે → ક્લીનઅપ (લિસનર દૂર કરો)
```

ઇવેન્ટ ફોર્મેટ:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

SSE મેનેજર દરેક સ્કોપ દીઠ કનેક્ટેડ ક્લાયન્ટ્સને ટ્રૅક કરે છે અને છેલ્લી પુશ પછી
લીડરબોર્ડ ડેટા ખરેખર બદલાયો હોય ત્યારે જ અપડેટ્સ મોકલે છે.

---

## ટોકન શેરિંગ

**ફાઇલ:** `src/lib/gamification/sharing.ts`

### ડબલ-એન્ટ્રી લેજર

દરેક ટ્રાન્સફર `token_ledger`માં બે પંક્તિઓ બનાવે છે:

| પંક્તિ  | `from_key_id` | `to_key_id`  | `amount` |
| ------- | ------------- | ------------ | -------- |
| ડેબિટ   | મોકલનાર       | પ્રાપ્તકર્તા | +amount  |
| ક્રેડિટ | પ્રાપ્તકર્તા  | મોકલનાર      | -amount  |

થોભો — પ્રચલિત પદ્ધતિ આ છે:

| પંક્તિ        | `from_key_id` | `to_key_id`  | `amount` | અર્થ                  |
| ------------- | ------------- | ------------ | -------- | --------------------- |
| મોકલવું       | મોકલનાર       | પ્રાપ્તકર્તા | +amount  | મોકલનાર પાસેથી જાવક   |
| પ્રાપ્ત કરવું | પ્રાપ્તકર્તા  | મોકલનાર      | +amount  | પ્રાપ્તકર્તા માટે આવક |

બેલેન્સની ગણતરી આ રીતે થાય છે:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### ટ્રાન્સફર પ્રવાહ

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **માન્યતા ચકાસો**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **આઇડેમ્પોટેન્સી**: લેજરમાં `idempotency_key` પહેલેથી અસ્તિત્વમાં છે કે કેમ તે તપાસો.
   જો હા, તો કૅશ કરેલું પરિણામ પરત કરો.
3. **ટ્રાન્ઝેક્શન** (એક જ SQLite ટ્રાન્ઝેક્શન):
   a. મોકલનારના બેલેન્સની ગણતરી કરો.
   b. જો `balance < amount` હોય, તો રદ કરો (અપૂરતું ભંડોળ).
   c. મોકલવાની પંક્તિ દાખલ કરો (`from=sender,` પરત કરો.

### રેટ મર્યાદા

- પ્રતિ API કી પ્રતિ મિનિટ મહત્તમ 10 ટ્રાન્સફર.
- એક જ ટ્રાન્સફરમાં મહત્તમ 10,000 ટોકન.
- પ્રતિ API કી પ્રતિ દિવસ મહત્તમ 100,000 ટોકન ટ્રાન્સફર કરી શકાય.

---

## આમંત્રણ અને ટોકન રિડીમ કરવા

**ફાઇલ:** `src/lib/gamification/invites.ts`

### કોડ ફોર્મેટ

- **કોડ**: 8-અક્ષરનો આલ્ફાન્યૂમેરિક કોડ (દા.ત., `A3K9-X7M2`), માનવ-વાંચનીય,
  વપરાશકર્તાને દર્શાવવામાં આવે છે.
- **ટોકન**: 32-બાઇટનું રેન્ડમ ટોકન, SHA-256 હૅશ તરીકે સંગ્રહિત થાય છે. તેનો ઉપયોગ
  પ્રોગ્રામેટિક રિડેમ્પશન માટે થાય છે (દા.ત., URL લિંક્સ).

### સંગ્રહ

| કૉલમ         | મૂલ્ય                          |
| ------------ | ------------------------------ |
| `code`       | `A3K9X7M2` (અનન્ય, ઇન્ડેક્સ્ડ) |
| `token_hash` | SHA-256(raw_token)             |

બનાવતી વખતે રૉ ટોકન વપરાશકર્તાને માત્ર એક જ વાર પરત કરવામાં આવે છે. OmniRoute
તેને ફરી ક્યારેય સંગ્રહિત કે પ્રદર્શિત કરતું નથી — માત્ર હૅશ જ સચવાયેલો રહે છે.

### સ્વ-રેફરલ નિવારણ

જ્યારે કોઈ વપરાશકર્તા કોડ રિડીમ કરે છે, ત્યારે સિસ્ટમ તપાસે છે:

1. કોડ કોઈ અલગ `api_key_id`નો છે.
2. રિડીમ કરનાર વપરાશકર્તાએ અગાઉ એ જ
   રેફરરનો કોઈ કોડ રિડીમ કર્યો નથી (`invite_tokens` + રિડેમ્પશન લૉગ પર joins).

જો કોઈપણ તપાસ નિષ્ફળ જાય, તો સ્પષ્ટ ભૂલ સંદેશ સાથે રિડેમ્પશન નકારવામાં આવે છે.

### સમાપ્તિ અને મર્યાદાઓ

- ડિફૉલ્ટ `max_uses`: 10 (બનાવતી વખતે ગોઠવી શકાય છે).
- ડિફૉલ્ટ `expires_at`: બનાવ્યાના 30 દિવસ પછી.
- સમાપ્ત થયેલા અથવા સંપૂર્ણપણે વપરાઈ ગયેલા કોડ HTTP 410 Gone પરત કરે છે.

---

## કોમ્યુનિટી સર્વર ફેડરેશન

**ફાઇલ:** `src/lib/gamification/servers.ts`

### કનેક્ટ કરવું

રિમોટ સર્વર દ્વારા જારી કરાયેલા આમંત્રણ ટોકન મારફતે કોમ્યુનિટી સર્વરની નોંધણી થાય છે. સ્થાનિક ઇન્સ્ટન્સ:

1. આમંત્રણ ટોકન મેળવે છે (દા.ત., ડૅશબોર્ડમાં પેસ્ટ કરેલું).
2. ટોકનની માન્યતા ચકાસવા અને વર્તમાન લીડરબોર્ડ મેળવવા માટે રિમોટ સર્વર પર `POST /api/gamification/federation/leaderboard` કૉલ કરે છે.
3. `status: connected` સાથે સર્વર રેકોર્ડ સંગ્રહિત કરે છે.

### સિંક મોડેલ

ફેડરેશન **ઓવરરાઇટ સિંક**નો ઉપયોગ કરે છે, ઍડિટિવ સિંકનો નહીં:

```
સ્થાનિક ઇન્સ્ટન્સ               કોમ્યુનિટી સર્વર
     │                              │
     ├── સ્કોર પુશ કરો ────────────►│  POST /federation/score
     │   { api_key_id, score }      │  (સર્વર ટોકન હૅશની માન્યતા ચકાસે છે)
     │                              │
     ├── લીડરબોર્ડ પુલ કરો ────────►│  GET /federation/leaderboard
     │◄── ટોચની-N એન્ટ્રીઓ ────────┤  (સ્થાનિક કૅશને ઓવરરાઇટ કરે છે)
     │                              │
     └── હેલ્થ ચેક ────────────────►│  GET /federation/health
         (દર 60 સેકન્ડે, ટાઇમઆઉટ 5 સેકન્ડ) │
```

### પ્રમાણીકરણ

ફેડરેશન વિનંતીઓમાં આનો સમાવેશ થાય છે:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

રિમોટ સર્વર ટોકનને હૅશ કરે છે અને મેળ ખાતી `community_servers` રો શોધે છે. આનાથી સંગ્રહિત હૅશને ટ્રાન્સમિટ કરવાનું ટળે છે.

### હેલ્થ મોનિટરિંગ

દરેક સર્વર રેકોર્ડ આ બાબતોને ટ્રૅક કરે છે:

| ફીલ્ડ       | વર્ણન                                  |
| ----------- | -------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable` |
| `last_sync` | છેલ્લી સફળ સિંકનો ISO ટાઇમસ્ટૅમ્પ      |
| `failures`  | સળંગ નિષ્ફળ ગયેલા હેલ્થ ચેકની સંખ્યા   |

સળંગ 5 નિષ્ફળતાઓ પછી, સ્થિતિ `unreachable`માં બદલાય છે અને મૅન્યુઅલ હેલ્થ ચેક સફળ ન થાય ત્યાં સુધી સિંક થોભાવવામાં આવે છે.

---

## છેતરપિંડી-વિરોધી વ્યવસ્થા

**ફાઇલ:** `src/lib/gamification/antiCheat.ts`

### સર્વર-સાઇડ સ્કોરિંગ

બધી XP ગણતરીઓ `src/lib/gamification/xp.ts`માં થાય છે. ક્લાયન્ટ્સ ક્યારેય સ્કોર સબમિટ કરતા નથી — તેઓ ઍક્શન્સ સબમિટ કરે છે અને સર્વર XPની ગણતરી કરે છે. `leaderboard.score` કૉલમમાં માત્ર સર્વર-સાઇડ કોડ દ્વારા જ લખી શકાય છે.

### રેટ લિમિટિંગ

| મર્યાદા                      | મૂલ્ય   | વ્યાપ           |
| ---------------------------- | ------- | --------------- |
| પ્રતિ મિનિટ મહત્તમ XP        | 1,000   | પ્રતિ API કી    |
| પ્રતિ મિનિટ મહત્તમ ટ્રાન્સફર | 10      | પ્રતિ API કી    |
| મહત્તમ ટ્રાન્સફર રકમ         | 10,000  | પ્રતિ ટ્રાન્સફર |
| મહત્તમ દૈનિક ટ્રાન્સફર       | 100,000 | પ્રતિ API કી    |

રેટ લિમિટ્સ ઇન-મેમરી સ્લાઇડિંગ વિન્ડોનો ઉપયોગ કરે છે (`open-sse/services/`માં `RateLimitManager` જેવી જ પૅટર્ન). પ્રોસેસ રીસ્ટાર્ટ થાય તો SQLite-આધારિત કાઉન્ટર્સનો વિકલ્પ તરીકે ઉપયોગ થાય છે.

### Z-સ્કોર વિસંગતિ શોધ

દરેક API કી માટે, સિસ્ટમ પ્રતિ કલાક મેળવેલા XPની રોલિંગ 7-દિવસની વિન્ડો જાળવે છે. દરેક XP પુરસ્કાર વખતે:

1. વપરાશકર્તાનો વર્તમાન કલાકદીઠ XP દર ગણો.
2. પોપ્યુલેશન મીન અને સ્ટાન્ડર્ડ ડિવિએશન ગણો.
3. `z = (user_rate - mean) / stddev`ની ગણતરી કરો.
4. જો `z > 3.0` (3 સ્ટાન્ડર્ડ ડિવિએશન) હોય, તો તેને વિસંગતિ તરીકે ફ્લૅગ કરો.

વિસંગતિઓ `action = 'anomaly_detected'` સાથે `xp_audit_log`માં લૉગ થાય છે અને ઍડમિન ડૅશબોર્ડ પર દર્શાવવામાં આવે છે.

### ઑડિટ ટ્રેઇલ

દરેક XP પુરસ્કાર, ટ્રાન્સફર, બૅજ પ્રાપ્તિ અને વિસંગતિ શોધને નીચેની વિગતો સાથે `xp_audit_log`માં લૉગ કરવામાં આવે છે:

| ફીલ્ડ        | વર્ણન                                         |
| ------------ | --------------------------------------------- |
| `api_key_id` | કોણ                                           |
| `action`     | શું બન્યું (xp_award, transfer, anomaly, …)   |
| `xp_awarded` | રકમ (બિન-XP ઇવેન્ટ્સ માટે 0)                  |
| `metadata`   | સંદર્ભ સાથેનું JSON (ઍક્શન પ્રકાર, લક્ષ્ય, …) |
| `created_at` | ક્યારે (ISO 8601)                             |

ઍડમિન્સ `GET /api/gamification/anomalies` મારફતે સંપૂર્ણ ઑડિટ ટ્રેઇલની ક્વેરી કરી શકે છે.

---

## API રૂટ્સ

બધા રૂટ્સ પ્રમાણભૂત OmniRoute પેટર્નને અનુસરે છે:

```
રૂટ → CORS પ્રીફ્લાઇટ → બોડી માન્યતા (Zod) → પ્રમાણીકરણ (extractApiKey)
  → હેન્ડલર
```

### એન્ડપોઇન્ટ્સ

| પદ્ધતિ | પાથ                                        | વર્ણન                                      | પ્રમાણીકરણ |
| ------ | ------------------------------------------ | ------------------------------------------ | ---------- |
| GET    | `/api/gamification/leaderboard`            | લીડરબોર્ડ મેળવો (વ્યાપ, સમયગાળો, પેજિનેશન) | વૈકલ્પિક   |
| POST   | `/api/gamification/leaderboard`            | લીડરબોર્ડ કૅશને બળપૂર્વક રિફ્રેશ કરો       | આવશ્યક     |
| GET    | `/api/gamification/stream`                 | SSE રીઅલ-ટાઇમ લીડરબોર્ડ અપડેટ્સ            | વૈકલ્પિક   |
| GET    | `/api/gamification/transfer`               | ટ્રાન્સફર ઇતિહાસ મેળવો (પેજિનેશન)          | આવશ્યક     |
| POST   | `/api/gamification/transfer`               | અન્ય વપરાશકર્તાને ટોકન્સ મોકલો             | આવશ્યક     |
| GET    | `/api/gamification/invite`                 | મારા આમંત્રણ કોડ્સની સૂચિ મેળવો            | આવશ્યક     |
| POST   | `/api/gamification/invite`                 | નવો આમંત્રણ કોડ બનાવો                      | આવશ્યક     |
| DELETE | `/api/gamification/invite`                 | આમંત્રણ કોડ રદ કરો                         | આવશ્યક     |
| POST   | `/api/gamification/invite/redeem`          | આમંત્રણ કોડ રિડીમ કરો                      | આવશ્યક     |
| GET    | `/api/gamification/servers`                | સમુદાય સર્વર્સની સૂચિ મેળવો                | આવશ્યક     |
| POST   | `/api/gamification/servers`                | સમુદાય સર્વર સાથે કનેક્ટ થાઓ               | આવશ્યક     |
| DELETE | `/api/gamification/servers`                | સમુદાય સર્વરથી ડિસ્કનેક્ટ થાઓ              | આવશ્યક     |
| POST   | `/api/gamification/federation/score`       | રિમોટ સર્વર પર સ્કોર પુશ કરો               | ફેડરેશન    |
| GET    | `/api/gamification/federation/leaderboard` | રિમોટ સર્વરમાંથી લીડરબોર્ડ પુલ કરો         | ફેડરેશન    |
| GET    | `/api/gamification/notifications`          | SSE બૅજ/લેવલ-અપ સૂચનાઓ                     | આવશ્યક     |
| GET    | `/api/gamification/anomalies`              | વિસંગતતા અહેવાલો જુઓ (એડમિન)               | એડમિન      |
| POST   | `/api/gamification/rotate`                 | આમંત્રણ ટોકન સિક્રેટ્સ રોટેટ કરો           | આવશ્યક     |

### વિનંતી/પ્રતિસાદનાં ઉદાહરણો

**POST /api/gamification/transfer**

```json
// વિનંતી
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// પ્રતિસાદ 200
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

// પ્રતિસાદ 400 (અપૂરતું બેલેન્સ)
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

## MCP ટૂલ્સ (8)

હાલના ટૂલ્સની સાથે `open-sse/mcp-server/` માં નોંધાયેલા છે. `gamification`
પરવાનગીના સ્કોપ હેઠળ મર્યાદિત છે.

| ટૂલ                        | વર્ણન                                    | ઇનપુટ સ્કીમા                 |           |
| -------------------------- | ---------------------------------------- | ---------------------------- | --------- |
| `gamification_leaderboard` | સ્કોપ/સમયગાળા માટે લીડરબોર્ડ મેળવો       | `{ scope, period?, limit? }` |
| `gamification_rank`        | કૉલ કરનારનો રેન્ક અને પડોશીઓ મેળવો       | `{ scope }`                  |
| `gamification_profile`     | XP, લેવલ, ઉપાધિ, સ્ટ્રીક સારાંશ મેળવો    | `{}`                         |
| `gamification_badges`      | મેળવેલા બેજ અથવા બધી વ્યાખ્યાઓની સૂચિ    | `{ earned?: boolean }`       |
| `gamification_transfer`    | અન્ય વપરાશકર્તાને ટોકન્સ મોકલો           | `{ to, amount }`             |
| `gamification_invite`      | આમંત્રણ કોડ બનાવો અથવા સૂચિબદ્ધ કરો      | `{ action: "create"          | "list" }` |
| `gamification_servers`     | કમ્યુનિટી સર્વર્સની સૂચિ અથવા કનેક્ટ કરો | `{ action, token? }`         |
| `gamification_anomalies`   | વિસંગતિ અહેવાલો જુઓ (એડમિન સ્કોપ)        | `{ limit?, since? }`         |

---

## ડૅશબોર્ડ પૃષ્ઠો

### `/dashboard/leaderboard`

- પોડિયમ ડિસ્પ્લે (અવતાર અને XP સાથે ટોચના 3).
- સ્કોપ પસંદગીકાર: વૈશ્વિક / સાપ્તાહિક / માસિક / શેર કરેલા ટોકન્સ / યોગદાન.
- રેન્ક, નામ, સ્કોર, લેવલ અને ઉપાધિ સાથે પૃષ્ઠાંકિત કોષ્ટક (પૃષ્ઠ દીઠ 25).
- SSE રીઅલ-ટાઇમ અપડેટ્સ — રેન્કમાં થતા ફેરફારો એનિમેટ થાય છે.
- કોષ્ટકમાં વર્તમાન વપરાશકર્તાને "તમારો રેન્ક" સ્ટિકી પંક્તિ સાથે હાઇલાઇટ કરવામાં આવે છે.

### `/dashboard/profile`

- વર્તમાન લેવલ અને આગલા લેવલની સીમા સાથે XP પ્રગતિ પટ્ટી.
- ઉપાધિ બેજને મુખ્ય રીતે દર્શાવવામાં આવે છે.
- બેજ ગૅલેરી — મેળવ્યાની તારીખ સાથે મેળવેલા બેજ, ન મેળવેલા બેજ ઝાંખા દર્શાવવામાં આવે છે
  (છુપાયેલા બેજ મેળવવામાં ન આવે ત્યાં સુધી "???" દર્શાવે છે).
- જ્વાળા આઇકન સાથે સ્ટ્રીક કાઉન્ટર; સ્ટ્રીક કૅલેન્ડર (છેલ્લા 30 દિવસ).
- XP ઇતિહાસ ચાર્ટ (છેલ્લા 30 દિવસનો દૈનિક XP).

### `/dashboard/tokens`

- ટોકન બેલેન્સ (મુખ્ય રીતે, પૃષ્ઠની ટોચે).
- ટ્રાન્સફર ફોર્મ: પ્રાપ્તકર્તા, રકમ, પુષ્ટિ સંવાદ.
- ફિલ્ટર્સ સાથે ટ્રાન્સફર ઇતિહાસ કોષ્ટક (મોકલેલ/પ્રાપ્ત/બધા).
- આમંત્રણ વિભાગ: સક્રિય કોડ્સ, નવો બનાવો, લિંક શેર કરો.
- કમ્યુનિટી સર્વર્સ: સ્વાસ્થ્ય સ્થિતિ સાથે સૂચિ, કનેક્ટ/ડિસ્કનેક્ટ.

### `/dashboard/gamification/admin`

- ગંભીરતા, વપરાશકર્તા, સમયમુદ્રા અને z-સ્કોર સાથે વિસંગતિ સૂચિ.
- ફિલ્ટર્સ સાથે ઑડિટ લૉગ વ્યૂઅર (ક્રિયાનો પ્રકાર, વપરાશકર્તા, તારીખ શ્રેણી).
- સિસ્ટમ આંકડા: આપવામાં આવેલ કુલ XP, સક્રિય વપરાશકર્તાઓ, બેજ મેળવવાના દર.
- ફેડરેશન સર્વરના સ્વાસ્થ્યનું અવલોકન.

---

## પાઇપલાઇન એકીકરણ

### એકીકરણ બિંદુ

ગેમિફિકેશન `open-sse/handlers/chatCore.ts` માં એક જ બિંદુએ વિનંતી
પાઇપલાઇનમાં જોડાય છે:

```typescript
// ક્લાયન્ટને પ્રતિસાદ મોકલ્યા પછી:
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
    // ફાયર-એન્ડ-ફર્ગેટ: લૉગ કરો પરંતુ ક્યારેય ક્લાયન્ટ સુધી પ્રસારિત ન કરો
  });
});
```

### ઇવેન્ટના પ્રકારો

| ઇવેન્ટનો પ્રકાર     | ક્યારે ઉત્સર્જિત થાય છે                            |
| ------------------- | -------------------------------------------------- |
| `request.completed` | સફળ LLM પ્રતિસાદ મોકલવામાં આવ્યો હોય ત્યારે        |
| `provider.switch`   | પ્રદાતા બદલાયો હોય ત્યારે (કૉમ્બો ફૉલબૅક ગણાય છે)  |
| `combo.created`     | નવું કૉમ્બો કન્ફિગરેશન સાચવવામાં આવ્યું હોય ત્યારે |
| `combo.used`        | કૉમ્બો લક્ષ્ય સફળતાપૂર્વક પ્રાપ્ત થયું હોય ત્યારે  |
| `badge.earned`      | બેજ મૂલ્યાંકનમાં મેળ મળ્યો હોય ત્યારે              |
| `streak.milestone`  | સ્ટ્રીકની સીમા પાર થઈ હોય ત્યારે                   |
| `transfer.sent`     | ટોકન ટ્રાન્સફર પૂર્ણ થયું હોય ત્યારે               |
| `referral.redeemed` | આમંત્રણ કોડ સફળતાપૂર્વક રિડીમ થયો હોય ત્યારે       |
| `compression.used`  | પ્રોમ્પ્ટ કમ્પ્રેશન લાગુ કરવામાં આવ્યું હોય ત્યારે |
| `skill.executed`    | સ્કિલનું અમલીકરણ પૂર્ણ થયું હોય ત્યારે             |
| `model.first_use`   | છેલ્લા 7 દિવસમાં મોડેલનો ઉપયોગ ન થયો હોય ત્યારે    |

### નૉન-બ્લૉકિંગ ખાતરી

`setImmediate` + `.catch(() => {})` પેટર્ન સુનિશ્ચિત કરે છે:

1. ગેમિફિકેશન ચાલે તે પહેલાં પ્રતિસાદ સંપૂર્ણપણે મોકલાઈ જાય છે.
2. ગેમિફિકેશનની ભૂલો ક્યારેય ક્લાયન્ટ સમક્ષ પ્રગટ થતી નથી.
3. ઇવેન્ટ પ્રોસેસિંગ ઇનલાઇન નહીં, પરંતુ આગલા માઇક્રોટાસ્કમાં ચાલે છે.

---

## સુરક્ષા

### જોખમ મોડેલ

| જોખમ                       | નિવારણ                                                                |
| -------------------------- | --------------------------------------------------------------------- |
| સ્કોરમાં કૃત્રિમ વધારો     | ફક્ત સર્વર-સાઇડ XP ગણતરી; ક્લાયન્ટ્સ સ્કોર નહીં, ક્રિયાઓ સબમિટ કરે છે |
| રીપ્લે હુમલા               | ટ્રાન્સફર પર આઇડેમ્પોટેન્સી કી; ઑડિટ લૉગ ડિડુપ્લિકેશન                 |
| ટ્રાન્સફર છેતરપિંડી        | ડબલ-એન્ટ્રી લેજર; એટોમિક ટ્રાન્ઝેક્શન; દર મર્યાદાઓ                    |
| સ્વ-રેફરલ                  | રિડીમ કરતી વખતે `api_key_id` ની ક્રોસ-ચકાસણી                          |
| લીડરબોર્ડમાં હેરફેર        | Z-સ્કોર વિસંગતિ શોધ; એડમિન વિસંગતિ ડૅશબોર્ડ                           |
| ફેડરેશન ટોકનની ચોરી        | SHA-256 હૅશ્ડ સ્ટોરેજ; મૂળ ટોકન ફક્ત એક જ વાર બતાવવામાં આવે છે        |
| ઇન્વાઇટ કોડ પર બ્રૂટ ફોર્સ | રિડેમ્પ્શન એન્ડપોઇન્ટ પર દર મર્યાદા; 8-અક્ષરની એન્ટ્રોપી              |
| ડિસ્પ્લે નામોમાં XSS       | ડિસ્પ્લે નામો સેનિટાઇઝ કરેલા; લીડરબોર્ડ એન્ટ્રીઓ એસ્કેપ કરેલી         |
| હૅશ પર ટાઇમિંગ હુમલા       | ટોકન હૅશની સરખામણી માટે `crypto.timingSafeEqual`                      |

### પ્રમાણીકરણ આવશ્યકતાઓ

- **સાર્વજનિક** (પ્રમાણીકરણ નહીં): `GET /leaderboard`, `GET /stream` (ફક્ત વાંચવા માટેનાં
  લીડરબોર્ડ).
- **API કી આવશ્યક**: તમામ લેખન કામગીરી, પ્રોફાઇલ, ટ્રાન્સફર, ઇન્વાઇટ.
- **ફક્ત એડમિન**: વિસંગતિ ડૅશબોર્ડ, ઑડિટ લૉગ વ્યૂઅર.
- **ફેડરેશન**: `Authorization` હેડરમાં મૂળ ટોકનનો ઉપયોગ કરતો અલગ પ્રમાણીકરણ
  પાથ, જે સંગ્રહિત SHA-256 હૅશ સામે માન્ય કરવામાં આવે છે.

---

## પરીક્ષણ

### પરીક્ષણ ફાઇલો

તમામ પરીક્ષણો Node.js ના મૂળ ટેસ્ટ રનર (`node --import tsx/esm --test`) નો ઉપયોગ કરે છે.

| પરીક્ષણ ફાઇલ                                  | આવરી લેવાતી બાબતો                        | પરીક્ષણો |
| --------------------------------------------- | ---------------------------------------- | -------- |
| `tests/unit/gamification/xp.test.ts`          | XP ગણતરી, લેવલ કર્વ, ઉપાધિઓ              | 8        |
| `tests/unit/gamification/badges.test.ts`      | બૅજ માપદંડ મેળવણી, એનાયત                 | 10       |
| `tests/unit/gamification/streaks.test.ts`     | સ્ટ્રીક લોજિક, માઇલસ્ટોન, એજ કેસ         | 7        |
| `tests/unit/gamification/leaderboard.test.ts` | રેન્ક ગણતરી, પેજિનેશન, રોટેશન            | 8        |
| `tests/unit/gamification/sharing.test.ts`     | ટ્રાન્સફર, બેલેન્સ, આઇડેમ્પોટેન્સી       | 9        |
| `tests/unit/gamification/invites.test.ts`     | બનાવવું, રિડીમ કરવું, સમાપ્તિ, સ્વ-રેફરલ | 7        |
| `tests/unit/gamification/antiCheat.test.ts`   | દર મર્યાદા, z-સ્કોર, ઑડિટ લૉગિંગ         | 6        |
| `tests/unit/gamification/events.test.ts`      | ઇવેન્ટ ઉત્સર્જન, ફૅન-આઉટ, ભૂલ સંચાલન     | 5        |

### પરીક્ષણો ચલાવવા

```bash
# તમામ ગેમિફિકેશન પરીક્ષણો
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# એક પરીક્ષણ ફાઇલ
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### કવરેજ આવશ્યકતાઓ

`CONTRIBUTING.md` મુજબ — બધા નવા મોડ્યુલમાં નીચેનું હોવું આવશ્યક છે:

- બ્રાન્ચ કવરેજ >= 80%.
- દરેક સાર્વજનિક ફંક્શનનું ઓછામાં ઓછું એક વાર પરીક્ષણ થયેલું હોવું જોઈએ.
- ભૂલ પાથનું પરીક્ષણ થયેલું હોવું જોઈએ (અપૂરતું બેલેન્સ, સમાપ્ત થયેલા કોડ, દર મર્યાદાઓ).

---

## ફાઇલ માળખું

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # તમામ 8 કોષ્ટકો + ઇન્ડેક્સ
      gamification.ts                  # ડોમેન CRUD મોડ્યુલ
    gamification/
      xp.ts                           # XP ગણતરી, સ્તર વક્ર, ઉપાધિઓ
      badges.ts                       # બેજની વ્યાખ્યાઓ, માપદંડ, મૂલ્યાંકન
      streaks.ts                      # દૈનિક સિલસિલાનું ટ્રેકિંગ
      leaderboard.ts                  # ક્રમની ગણતરી, SSE, રોટેશન
      antiCheat.ts                    # દર મર્યાદા, z-સ્કોર, ઑડિટ
      sharing.ts                      # ટોકન ટ્રાન્સફર લેજર
      invites.ts                      # આમંત્રણ/રિડીમ કોડ
      servers.ts                      # સમુદાય સર્વર ફેડરેશન
      events.ts                       # ઇવેન્ટ એમિટર (એકીકરણ બિંદુ)
      notifications.ts                # SSE સૂચના સ્ટ્રીમ
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST લીડરબોર્ડ
        leaderboard/stream/route.ts   # SSE રીઅલ-ટાઇમ અપડેટ્સ
        transfer/route.ts             # GET/POST ટ્રાન્સફર
        invite/route.ts               # GET/POST/DELETE આમંત્રણ કોડ
        invite/redeem/route.ts        # POST રિડીમ કોડ
        servers/route.ts              # GET/POST/DELETE સર્વર્સ
        federation/score/route.ts     # POST સ્કોર પુશ
        federation/leaderboard/route.ts # GET લીડરબોર્ડ પુલ
        notifications/route.ts        # SSE સૂચનાઓ
        anomalies/route.ts            # GET વિસંગતિ અહેવાલો
        rotate/route.ts               # POST સિક્રેટ્સ રોટેટ કરો
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # રેન્કિંગ્સ પેજ
        profile/page.tsx               # XP/બેજ/સિલસિલા પેજ
        tokens/page.tsx                # બેલેન્સ/ટ્રાન્સફર/આમંત્રણ પેજ
        gamification/admin/page.tsx    # એડમિન વિસંગતિ મોનિટરિંગ
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
    GAMIFICATION.md                    # આ દસ્તાવેજ
```

---

## માઇગ્રેશન વ્યૂહરચના

### તબક્કો 1: બૅકએન્ડ કોર (PR 1)

- માઇગ્રેશન `060_create_gamification.sql` (8 કોષ્ટકો).
- `src/lib/db/gamification.ts` (ડોમેન મોડ્યુલ).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- `chatCore.ts`માં એકીકરણ બિંદુ.
- XP, સિલસિલા અને ઇવેન્ટ્સ માટે યુનિટ ટેસ્ટ.

### તબક્કો 2: બેજ અને લીડરબોર્ડ (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- કોન્સ્ટન્ટ્સમાં બેજની વ્યાખ્યાઓ.
- લીડરબોર્ડ API રૂટ્સ + SSE સ્ટ્રીમ.
- બેજ અને લીડરબોર્ડ માટે યુનિટ ટેસ્ટ.

### તબક્કો 3: શેરિંગ અને આમંત્રણો (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- ટ્રાન્સફર + આમંત્રણ API રૂટ્સ.
- શેરિંગ, આમંત્રણો અને એન્ટિ-ચીટ માટે યુનિટ ટેસ્ટ.

### તબક્કો 4: ફેડરેશન અને ડૅશબોર્ડ (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- ફેડરેશન API રૂટ્સ.
- ડૅશબોર્ડ પેજ (લીડરબોર્ડ, પ્રોફાઇલ, ટોકન્સ, એડમિન).
- MCP ટૂલ્સની નોંધણી.

---

## ભાવિ વિચારણાઓ

- **મોસમી ઇવેન્ટ્સ**: મર્યાદિત સમય માટેના બેજ સેટ્સ અને લીડરબોર્ડ સીઝન્સ.
- **ટીમ લીડરબોર્ડ્સ**: વપરાશકર્તાઓને સંસ્થા અથવા કોમ્બો અનુસાર જૂથબદ્ધ કરો.
- **XP ગુણકો**: પ્રમોશનલ સમયગાળા દરમિયાન XP વધારો.
- **સિદ્ધિ શેરિંગ**: શેર કરી શકાય તેવા બેજ કાર્ડ્સ (OpenGraph છબીઓ) બનાવો.
- **મોબાઇલ પુશ**: બેજ/લેવલ ઇવેન્ટ્સ માટે webhook-આધારિત સૂચનાઓ.
- **લીડરબોર્ડ API**: તૃતીય-પક્ષ સંકલનો માટે જાહેર API.
