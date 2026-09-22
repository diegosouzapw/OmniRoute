# Gamification & Leaderboard System (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **Foinse údaráis:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Nuashonraithe go deireanach:** 2026-06-28 — v3.8.40

Cuimsíonn OmniRoute sraith chearrbhachais áitiúil ar dtús a thugann luaíochtaí
d’úsáideoirí as idirghníomhú leis an ardán — iarrataí a dhéanamh, soláthraithe
a athrú, teaglamaí a chruthú, comharthaí a chomhroinnt, agus cur leis an bpobal.
Coinnítear an staid ar fad in SQLite; tá cónascadh le freastalaithe pobail
roghnach agus bunaithe ar bhrú.

Tá an córas deartha le bheith **gan aon mhoill ar an gconair the** — seoltar
teagmhais chearrbhachais ón bpíblíne iarrataí ar bhonn seol-agus-dearmad agus
ní chuireann siad bac riamh ar fhreagairt LLM.

---

## Forléargas

### Cuspóir

Rannpháirtíocht agus coinneáil úsáideoirí a mhéadú trí dhul chun cinn infheicthe
(XP, leibhéil, suaitheantais), cruthúnas sóisialta (cláir cheannaireachta), agus
dreasachtaí eacnamaíocha (comhroinnt comharthaí, luaíochtaí cuiridh) a chur ar fáil.

### Raon Feidhme

| Gné                   | Cur Síos                                                                            |
| --------------------- | ----------------------------------------------------------------------------------- |
| XP & Leibhéil         | XP a thuilleamh in aghaidh gach gnímh; ardú leibhéil feadh cuar iltéarmach          |
| Suaitheantais         | Breis agus 20 éacht i 5 chatagóir le 4 shraith tearcachta                           |
| Sraitheanna           | Rianú úsáide gníomhaí laethúla leis an tsraith reatha/is faide                      |
| Cláir Cheannaireachta | Raonta domhanda, seachtainiúla, míosúla, comhroinnte comharthaí, agus rannchuidithe |
| Comhroinnt Comharthaí | Creidmheasanna a aistriú idir úsáideoirí trí mhórleabhar iontrála dúbailte          |
| Cuireadh & Fuascailt  | Cóid atreoraithe le stóráil haiseáilte SHA-256                                      |
| Freastalaithe Pobail  | Cónascadh le háscanna seachtracha OmniRoute                                         |
| Frithchalaois         | Scóráil ar thaobh an fhreastalaí, teorannú ráta, aimsiú aimhrialtachtaí z-scóir     |

### Prionsabail Dearaidh

1. **Áitiúil ar dtús** — an staid ar fad in SQLite, gan aon ghá le seirbhísí seachtracha.
2. **Neamhbhacúil** — seoltar teagmhais ar bhonn seol-agus-dearmad; ní chuireann
   loighic chearrbhachais moill riamh ar chonair freagartha an LLM.
3. **Faoi údarás an fhreastalaí** — ríomhtar XP ar thaobh an fhreastalaí amháin;
   ní féidir le cliaint scóir a mhéadú go saorga.
4. **Meas ar phríobháideachas** — tá rannpháirtíocht i gcláir cheannaireachta
   roghnach; is féidir le húsáideoirí a bpróifíl a cheilt.
5. **Réidh don chónascadh** — is féidir le freastalaithe pobail scóir a bhrú trí
   API sínithe; forscríobh atá sa sioncronú, ní suimiú.

---

## Ailtireacht

### Sreabhadh Ardleibhéil

```
Iarratas Cliant
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (an phíblíne atá ann cheana) ...
      → freagairt réamhtheachtach seolta chuig an gcliant
      → setImmediate (seol-agus-dearmad):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

Is é an t-astóir teagmhas an t-aon phointe comhtháthaithe. Glaonn `chatCore.ts`
ar `emitGamificationEvent()` tar éis an fhreagairt a sheoladh; scaipeann modúl
na dteagmhas an obair ar fhochórais XP, sraitheanna, suaitheantas, cláir
cheannaireachta, agus frithchalaoise.

### Graf Spleáchais na Modúl

```
src/lib/gamification/
  events.ts          ← pointe iontrála (glaoite ó chatCore.ts)
    ├── xp.ts        ← ríomh XP & réiteach leibhéil
    ├── streaks.ts   ← rianú sraitheanna gníomhacha laethúla
    ├── badges.ts    ← measúnú critéar suaitheantas
    ├── leaderboard.ts ← ríomh céime & craoladh SSE
    ├── antiCheat.ts ← teorannú ráta & aimsiú aimhrialtachtaí
    ├── sharing.ts   ← mórleabhar aistrithe comharthaí
    ├── invites.ts   ← bainistiú cód cuiridh/fuascailte
    ├── servers.ts   ← cónascadh freastalaithe pobail
    └── notifications.ts ← sruth fógraí SSE

src/lib/db/
  gamification.ts    ← gach oibríocht CRUD (8 dtábla)

src/app/api/gamification/
  leaderboard/       ← GET ranguithe, POST athnuachan láimhe
  leaderboard/stream ← nuashonruithe fíor-ama SSE
  transfer/          ← GET stair, POST comharthaí a sheoladh
  invite/            ← GET/POST cóid, DELETE cúlghairm
  invite/redeem/     ← POST cód a fhuascailt
  servers/           ← GET/POST/DELETE freastalaithe pobail
  federation/score/  ← POST scór a bhrú chuig freastalaí
  federation/leaderboard/ ← GET clár ceannaireachta a tharraingt ó fhreastalaí
  notifications/     ← fógraí SSE maidir le suaitheantais/ardú leibhéil
  anomalies/         ← GET tuarascálacha aimhrialtachta (riarthóir)
  rotate/            ← POST rúin chomharthaí cuiridh a rothlú
```

---

## Sraith Sonraí

### Táblaí Bunachair Sonraí

Tá na táblaí go léir i bpríomhbhunachar sonraí SQLite OmniRoute, arna chruthú leis an imirce
`060_create_gamification.sql`. Faightear iriseoireacht WAL le hoidhreacht ón singilton
`getDbInstance()` in `src/lib/db/core.ts`.

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

### Modúl Fearainn: `src/lib/db/gamification.ts`

Leanann sé gnáthphatrún OmniRoute — iompórtálann sé `getDbInstance()` ó
`core.ts` agus easpórtálann sé feidhmeanna CRUD clóscríofa. Níl aon SQL amh i láimhseálaithe bealaigh.

Príomhfheidhmeanna:

| Feidhm                     | Cur síos                                                                  |
| -------------------------- | ------------------------------------------------------------------------- |
| `upsertLeaderboardEntry()` | Cuir isteach nó nuashonraigh scór le haghaidh (api_key_id, scope, period) |
| `getLeaderboard()`         | Ranguithe le huimhriú leathanach do scope/period ar leith                 |
| `getUserLevel()`           | Faigh nó cruthaigh taifead leibhéil úsáideora                             |
| `updateUserLevel()`        | Socraigh XP, level, agus title go hadamhach                               |
| `getBadgeDefinitions()`    | Gach sainmhíniú suaitheantais (scagtha go roghnach)                       |
| `getUserBadges()`          | Suaitheantais atá tuillte ag úsáideoir                                    |
| `awardBadge()`             | Cuir tuilleamh suaitheantais isteach (iادamhach ar badge_id)              |
| `logXpAction()`            | Cuir le xp_audit_log                                                      |
| `getXpAuditLog()`          | Stair iniúchta le huimhriú leathanach d’úsáideoir                         |
| `insertLedgerEntry()`      | Aistriú iontrála dúbailte (in idirbheart)                                 |
| `getBalance()`             | Suim an mhéid a fuarthas lúide an méid a seoladh d’úsáideoir              |
| `getTransferHistory()`     | Loga aistrithe le huimhriú leathanach                                     |
| `createInviteToken()`      | Cuir cód cuiridh + comhartha haiseáilte isteach                           |
| `redeemInviteToken()`      | Cuardaigh de réir cóid, bailíochtaigh, agus méadaigh uses                 |
| `upsertCommunityServer()`  | Cláraigh nó nuashonraigh freastalaí cónaidhmithe                          |
| `getCommunityServers()`    | Liostaigh freastalaithe d’úsáideoir                                       |
| `deleteCommunityServer()`  | Bain clárúchán freastalaí                                                 |

---

## Córas XP / Leibhéal

**Comhad:** `src/lib/gamification/xp.ts`

### Cuar Leibhéil

Leanann an XP is gá chun leibhéal `n` a bhaint amach cuar iltéarmach:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Leibhéal | XP go dtí an Chéad Leibhéal Eile | XP Carnach | Teideal     |
| -------- | -------------------------------- | ---------- | ----------- |
| 1        | 100                              | 100        | Tosaitheoir |
| 5        | 1,118                            | 2,415      | Tosaitheoir |
| 10       | 3,162                            | 10,523     | Taiscéalaí  |
| 25       | 12,500                           | 86,024     | Taiscéalaí  |
| 50       | 35,355                           | 345,529    | Saineolaí   |
| 75       | 64,952                           | 948,683    | Máistir     |
| 100      | 100,000                          | 2,050,000  | Finscéal    |

### Teidil

| Raon Leibhéal | Teideal     |
| ------------- | ----------- |
| 1 – 9         | Tosaitheoir |
| 10 – 24       | Taiscéalaí  |
| 25 – 49       | Saineolaí   |
| 50 – 74       | Máistir     |
| 75 – 100      | Finscéal    |

### Luaíochtaí XP

| Gníomh            | XP  | Cur Síos                                                              |
| ----------------- | --- | --------------------------------------------------------------------- |
| `request`         | 1   | In aghaidh gach iarratais API a threoraítear trí OmniRoute            |
| `provider_switch` | 5   | Aistriú chuig soláthraí eile                                          |
| `model_switch`    | 3   | Aistriú chuig samhail eile                                            |
| `combo_create`    | 10  | Teaglaim nua a chruthú                                                |
| `combo_use`       | 2   | Teaglaim a úsáid le haghaidh iarratais                                |
| `token_share`     | 1   | In aghaidh gach 1 000 comhartha a roinntear le húsáideoir eile        |
| `invite_redeem`   | 50  | Cód cuiridh a fhuascailt                                              |
| `daily_login`     | 5   | Úsáid ghníomhach laethúil (uair amháin sa lá)                         |
| `streak_bonus`    | 2   | In aghaidh gach lá leantach sa stríoc (iolraithe faoi fhad na stríce) |
| `badge_unlock`    | 10  | Suaitheantas a dhíghlasáil                                            |

### Sreabhadh Bronnta

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. Cuardaigh `XP_REWARDS[action]` chun méid an XP a fháil.
2. Cuir trí `checkRateLimit()` é (frithchalaois: uasmhéid 1000 XP/nóiméad in aghaidh na heochrach).
3. Oscail idirbheart:
   - Léigh an ró reatha in `user_levels`.
   - Cuir XP leis; athríomh an leibhéal trí `levelFromXp(totalXp)`.
   - Má d'athraigh an leibhéal, socraigh `levelUp = true`.
   - Nuashonraigh an ró in `user_levels`.
   - Ionsáigh in `xp_audit_log`.
4. Tabhair an toradh ar ais. Láimhseálann an glaoiteoir fógraí.

### Feidhm Chúnta: `levelFromXp(totalXp)`

Téann sí trí leibhéil 1..100, ag suimiú `xp_for_level(n)` go dtí go sáraíonn
an XP carnach `totalXp`. Tugann sí ar ais an leibhéal is airde ar comhlíonadh a thairseach.
Is O(100) é seo — inghlactha ós é 100 uasteorainn na leibhéal.

---

## Córas Suaitheantas

**Comhad:** `src/lib/gamification/badges.ts`

### Catagóirí

| Catagóir       | Cur Síos                             | Suaitheantais Shamplacha                        |
| -------------- | ------------------------------------ | ----------------------------------------------- |
| `usage`        | Clocha míle bunaithe ar mhéid úsáide | An Chéad Iarraidh, 1K Iarratas, 100K            |
| `sharing`      | Comharthaí a roinnt agus atreoruithe | An Chéad Chomhroinnt, Fial (10 gcomhroinnt)     |
| `contribution` | Rannpháirtíocht sa phobal            | Cruthaitheoir Teaglama, Taiscéalaí Soláthraithe |
| `streak`       | Comhsheasmhacht thar thréimhse ama   | Trodaí Seachtaine, Díograiseoir Míosúil         |
| `rare`         | Éachtaí deacra nó folaithe           | Luath-Uchtaitheoir, Tuairisceoir Fabhtanna      |

### Ganntanais

| Ganntanas   | Dath  | Leid Dóchúlachta         |
| ----------- | ----- | ------------------------ |
| `common`    | Liath | Formhór na n-úsáideoirí  |
| `uncommon`  | Glas  | Úsáideoirí gníomhacha    |
| `rare`      | Gorm  | Úsáideoirí díograiseacha |
| `legendary` | Órga  | An 1% is fearr           |

### Cineálacha Critéar

| Cineál         | Réimse       | Cur Síos                                                 |
| -------------- | ------------ | -------------------------------------------------------- |
| `action_count` | `count`      | Déan gníomh N uair (m.sh., 1000 iarratas)                |
| `streak`       | `days`       | Coinnigh stríoc ar bun ar feadh N lá as a chéile         |
| `unique_count` | `field`, `n` | Úsáid N luach uathúla (m.sh., 10 samhail dhifriúla)      |
| `rank`         | `scope`, `n` | Bain rang N amach i scóip cláir ceannairí                |
| `first`        | —            | Bí ar an gcéad duine a dhéanann gníomh                   |
| `hidden`       | (athraíonn)  | Ní thaispeántar na critéir go dtí go mbaintear amach iad |

Stóráiltear sainmhínithe suaitheantas in `badge_definitions` mar `criteria` JSON:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Sreabhadh Meastóireachta

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # na sainmhínithe uile
    → getUserBadges(apiKeyId)         # bainte amach cheana féin (scipeáil)
    → i gcás gach suaitheantais nár baineadh amach:
       → matchesCriteria(badge, event, userState)
       → má tá meaitseáil ann: awardBadge(apiKeyId, badgeId)
         → tabhair pálasta an fhógra ar ais
```

Tá an mheastóireacht **tiomáinte ag teagmhais** — ritheann sí tar éis gach teagmhais cearrbhachais, ach
ní sheiceálann sí ach suaitheantais a bhfuil a `criteria.type` ag teacht le gníomh an teagmhais. Coinníonn sé seo
an mheastóireacht tapa (< 5ms i gcás fhormhór na dteagmhas).

### `matchesCriteria(badge, event, userState)`

| Cineál Critéir | Seiceáil                                                            |
| -------------- | ------------------------------------------------------------------- |
| `action_count` | `getActionCount(apiKeyId, action) >= count`                         |
| `streak`       | `getCurrentStreak(apiKeyId) >= days`                                |
| `unique_count` | `getUniqueCount(apiKeyId, field) >= n`                              |
| `rank`         | `getRank(apiKeyId, scope) <= n`                                     |
| `first`        | Gan aon iontráil roimhe seo in `xp_audit_log` don chineál gnímh seo |
| `hidden`       | Tarmligeann chuig an bhfo-sheiceáil chuí                            |

### Suaitheantais Insuite (20+)

<details>
<summary>Liosta iomlán na suaitheantas</summary>

| Suaitheantas            | Catagóir    | Tearcacht       | Critéir                              |
| ----------------------- | ----------- | --------------- | ------------------------------------ |
| Na Chéad Chéimeanna     | úsáid       | coitianta       | 1 iarratas                           |
| Ag Téamh Suas           | úsáid       | coitianta       | 100 iarratas                         |
| Sárúsáideoir            | úsáid       | neamhchoitianta | 1,000 iarratas                       |
| Céadshlua               | úsáid       | tearc           | 10,000 iarratas                      |
| Uilechumhacht           | úsáid       | finscéalach     | 100,000 iarratas                     |
| Léimneoir Soláthraithe  | rannchuidiú | coitianta       | Úsáid 5 sholáthraí éagsúla           |
| Máistir Soláthraithe    | rannchuidiú | neamhchoitianta | Úsáid 20 soláthraí éagsúla           |
| Ailtire Teaglamaí       | rannchuidiú | neamhchoitianta | Cruthaigh 5 theaglaim                |
| Ard-Mháistir Teaglamaí  | rannchuidiú | tearc           | Cruthaigh 25 theaglaim               |
| An Chéad Chomhroinnt    | comhroinnt  | coitianta       | 1 aistriú comharthaí                 |
| Fial                    | comhroinnt  | neamhchoitianta | 10 n-aistriú comharthaí              |
| Daonchara               | comhroinnt  | tearc           | Aistrigh 10,000 comhartha san iomlán |
| Atreoraí                | comhroinnt  | coitianta       | 1 atreorú rathúil                    |
| Tógálaí Líonra          | comhroinnt  | neamhchoitianta | 10 n-atreorú rathúla                 |
| Gaiscíoch na Seachtaine | sraith      | neamhchoitianta | Sraith 7 lá                          |
| Díograiseoir Míosúil    | sraith      | tearc           | Sraith 30 lá                         |
| Dosháraithe             | sraith      | finscéalach     | Sraith 365 lá                        |
| Luath-Uchtaitheoir      | tearc       | finscéalach     | Glac páirt le linn na tréimhse béite |
| Ceannródaí Comhbhrúite  | tearc       | neamhchoitianta | Úsáid comhbhrú 100 uair              |
| Bailitheoir Scileanna   | tearc       | tearc           | Úsáid 10 scil éagsúla                |
| Taiscéalaí Samhlacha    | rannchuidiú | neamhchoitianta | Úsáid 15 shamhail éagsúla            |

</details>

---

## Lorgaire Sraithe

**Comhad:** `src/lib/gamification/streaks.ts`

### Samhail Sonraí

Stóráiltear sraitheanna sa tábla `key_value` (tábla comhroinnte fóntais) faoi
eochracha a bhfuil ainmspás acu:

| Eochair                       | Luach                            | Cur síos                |
| ----------------------------- | -------------------------------- | ----------------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Sonraí sraithe gníomhaí |

### Loighic

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Léigh taifead na sraithe ó `key_value`.
2. Parsáil `{current}`, `{longest}`, `{lastDate}` (teaghrán dáta ISO).
3. Más `lastDate === today` — gan athrú (comhairíodh inniu cheana é).
4. Más `lastDate === yesterday` — méadaigh `current`; nuashonraigh `longest` más gá.
5. Más `lastDate < yesterday` — athshocraigh `current = 1` (briseadh an tsraith).
6. Scríobh an taifead nuashonraithe.
7. Seiceáil garspriocanna: 7, 14, 30, 60, 90, 180, 365 lá. Má sáraítear ceann,
   socraigh `milestone = true` (bronnann an glaoiteoir XP agus seiceálann sé suaitheantais).

### Cásanna Imeallacha

- **Crios ama**: úsáideann sraitheanna dátaí UTC (`new Date().toISOString().slice(0, 10)`).
  Tá sé seo d'aon ghnó — cuireann crios ama canónach aonair cosc ar chúbláil trí
  léim idir criosanna ama.
- **Úsáideoirí nua**: níl aon taifead sraithe ann; cruthaíonn an chéad iarratas é le
  `current=1, longest=1, lastDate=today`.
- **Iarratais iolracha in aghaidh an lae**: ní mhéadaíonn ach an chéad iarratas den lá UTC
  an tsraith.

---

## Clár Ceannairí

**Comhad:** `src/lib/gamification/leaderboard.ts`

### Scóipeanna

| Scóip           | Tréimhse | Cur síos                                                        |
| --------------- | -------- | --------------------------------------------------------------- |
| `global`        | `all`    | XP carnach ó thús ama                                           |
| `weekly`        | `week`   | XP a gnóthaíodh sa tseachtain UTC reatha (Luan-Domhnach)        |
| `monthly`       | `month`  | XP a gnóthaíodh sa mhí UTC reatha                               |
| `tokens_shared` | `all`    | Líon iomlán na dtócan a aistríodh chuig daoine eile             |
| `contributions` | `all`    | Teaglamaí cruthaithe + soláthraithe úsáidte + scileanna úsáidte |

### Ríomh Rangaithe

**Ríomhtar ranganna tráth na léitheoireachta**, ní stóráiltear iad. Seachnaíonn sé seo sonraí rangaithe atá as dáta
agus cuireann sé deireadh leis an ngá atá le tascanna tréimhsiúla chun ranganna a athríomh.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

Patrún iarratais:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### Rothlú Tréimhse

Rothlaíonn cláir cheannairí sheachtainiúla agus mhíosúla go huathoibríoch:

1. **Cartlannaigh**: ag teorainn na tréimhse, cóipeáil na hiontrálacha reatha chuig
   `leaderboard_archive` le lipéad na tréimhse.
2. **Athshocraigh**: scrios iontrálacha don tréimhse atá imithe in éag.
3. **Truicear**: seiceáiltear é ar gach glao `updateLeaderboard()`; truiceálann an chéad iarratas
   de thréimhse nua an rothlú.

Cinntíonn sé seo go n-athshocraítear cláir sheachtainiúla gach Luan ag 00:00 UTC agus go
n-athshocraítear cláir mhíosúla ar an 1ú lá de gach mí.

### Nuashonruithe Fíor-Ama SSE

**Críochphointe:** `GET /api/gamification/stream`

```
Cliant → GET /api/gamification/stream
  → Bunaítear nasc SSE
  → Seolann an freastalaí léargas ar na 10 n-iontráil is airde sa chlár ceannairí láithreach
  → Gach 5 shoicind: brúigh na 10 n-iontráil is airde atá nuashonraithe má tá athrú orthu
  → Gach 15 shoicind: nóta croíbhuille (": heartbeat\n\n")
  → Dícheanglaíonn an cliant → glantachán (bain an t-éisteoir)
```

Formáid teagmhais:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

Rianaíonn bainisteoir SSE cliaint nasctha de réir scóipe agus ní sheolann sé nuashonruithe
ach amháin nuair atá athrú iarbhír tagtha ar shonraí an chláir ceannairí ón mbrú deireanach.

---

## Comhroinnt Comharthaí

**Comhad:** `src/lib/gamification/sharing.ts`

### Mórleabhar Iontrála Dúbailte

Cruthaíonn gach aistriú dhá ró in `token_ledger`:

| Ró         | `from_key_id` | `to_key_id` | `amount` |
| ---------- | ------------- | ----------- | -------- |
| Dochar     | seoltóir      | faighteoir  | +méid    |
| Creidmheas | faighteoir    | seoltóir    | -méid    |

Fan — seo é an coinbhinsiún:

| Ró      | `from_key_id` | `to_key_id` | `amount` | Brí                               |
| ------- | ------------- | ----------- | -------- | --------------------------------- |
| Seoladh | seoltóir      | faighteoir  | +méid    | Eis-sreabhadh ón seoltóir         |
| Fáil    | faighteoir    | seoltóir    | +méid    | Insreabhadh chuig an bhfaighteoir |

Ríomhtar an t-iarmhéid mar seo:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Sreabhadh Aistrithe

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Bailíochtú**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **Idéimpitéinseacht**: seiceáil an bhfuil `idempotency_key` sa mhórleabhar cheana féin.
   Má tá, tabhair an toradh taiscthe ar ais.
3. **Idirbheart** (idirbheart aonair SQLite):
   a. Ríomh iarmhéid an tseoltóra.
   b. Má tá `balance < amount`, cuir deireadh leis (cistí neamhleora).
   c. Ionsáigh ró seolta (`from=sender,` ar ais.

### Teorannú Ráta

- Uasmhéid 10 n-aistriú in aghaidh an nóiméid do gach eochair API.
- Uasmhéid 10,000 comhartha in aghaidh an aistrithe aonair.
- Uasmhéid 100,000 comhartha aistrithe in aghaidh an lae do gach eochair API.

---

## Comharthaí Cuireadh & Fuascailte

**Comhad:** `src/lib/gamification/invites.ts`

### Formáid an Chóid

- **Cód**: 8 gcarachtar alfa-uimhriúla (m.sh., `A3K9-X7M2`), inléite ag daoine,
  ar taispeáint don úsáideoir.
- **Comhartha**: comhartha randamach 32 beart, stóráilte mar hais SHA-256. Úsáidtear é le haghaidh
  fuascailte ríomhchláraithe (m.sh., naisc URL).

### Stóráil

| Colún        | Luach                              |
| ------------ | ---------------------------------- |
| `code`       | `A3K9X7M2` (uathúil, innéacsaithe) |
| `token_hash` | SHA-256(raw_token)                 |

Tugtar an comhartha amh ar ais don úsáideoir uair amháin go díreach tráth a chruthaithe. Ní
stórálann ná ní thaispeánann OmniRoute arís é — ní mhaireann ach an hais.

### Féinatreorú a Chosc

Nuair a fhuasclaíonn úsáideoir cód, seiceálann an córas:

1. Gur le `api_key_id` eile an cód.
2. Nach bhfuil aon chód ón atreoraí céanna fuascailte ag an úsáideoir fuascailte cheana
   (comhcheangal ar `invite_tokens` + loga fuascailte).

Má theipeann ar cheachtar seiceáil, diúltaítear don fhuascailt le teachtaireacht earráide shoiléir.

### Dul in Éag & Teorainneacha

- `max_uses` réamhshocraithe: 10 (inchumraithe tráth a chruthaithe).
- `expires_at` réamhshocraithe: 30 lá ón gcruthú.
- Tugann cóid atá imithe in éag nó ídithe HTTP 410 Gone ar ais.

---

## Cónascadh Freastalaithe Pobail

**Comhad:** `src/lib/gamification/servers.ts`

### Ceangal

Cláraítear freastalaí pobail trí chomhartha cuiridh arna eisiúint ag an gcianfhreastalaí. Déanann an t-ásc logánta na nithe seo a leanas:

1. Faigheann sé an comhartha cuiridh (m.sh., greamaithe sa deais).
2. Glaonn sé `POST /api/gamification/federation/leaderboard` ar an gcianfhreastalaí chun an comhartha a bhailíochtú agus an clár ceannairí reatha a fháil.
3. Stórálann sé taifead an fhreastalaí le `status: connected`.

### Samhail Sioncronaithe

Úsáideann an cónascadh **sioncronú forscríofa**, ní sioncronú suimitheach:

```
Ásc Logánta                    Freastalaí Pobail
     │                              │
     ├── scór a bhrú ──────────────►│  POST /federation/score
     │   { api_key_id, score }      │  (bailíochtaíonn an freastalaí hais an chomhartha)
     │                              │
     ├── clár ceannairí a tharraingt►│  GET /federation/leaderboard
     │◄── iontrálacha barr-N ───────┤  (forscríobhann sé an taisce logánta)
     │                              │
     └── seiceáil sláinte ─────────►│  GET /federation/health
         (gach 60s, teorainn ama 5s)│
```

### Fíordheimhniú

Áirítear iad seo a leanas le hiarratais chónasctha:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

Déanann an cianfhreastalaí hais den chomhartha agus aimsíonn sé an ró meaitseála in `community_servers`. Seachnaíonn sé seo tarchur na haise stóráilte.

### Monatóireacht Sláinte

Rianaíonn gach taifead freastalaí na nithe seo a leanas:

| Réimse      | Cur Síos                                           |
| ----------- | -------------------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable`             |
| `last_sync` | Stampa ama ISO an tsioncronaithe rathúil is déanaí |
| `failures`  | Teipeanna comhleanúnacha seiceála sláinte          |

Tar éis 5 theip chomhleanúnacha, athraíonn an stádas go `unreachable` agus cuirtear an sioncronú ar sos go dtí go n-éiríonn le seiceáil sláinte de láimh.

---

## Frith-Chaimiléireacht

**Comhad:** `src/lib/gamification/antiCheat.ts`

### Scóráil ar Thaobh an Fhreastalaí

Déantar gach ríomh XP in `src/lib/gamification/xp.ts`. Ní chuireann cliaint scór isteach riamh — cuireann siad gníomhartha isteach, agus ríomhann an freastalaí XP. Ní féidir ach le cód ar thaobh an fhreastalaí scríobh sa cholún `leaderboard.score`.

### Teorannú Ráta

| Teorainn                                 | Luach   | Raon Feidhme                |
| ---------------------------------------- | ------- | --------------------------- |
| Uasmhéid XP in aghaidh an nóiméid        | 1,000   | In aghaidh na heochrach API |
| Uasmhéid aistrithe in aghaidh an nóiméid | 10      | In aghaidh na heochrach API |
| Uasmhéid aistrithe                       | 10,000  | In aghaidh an aistrithe     |
| Uasmhéid aistrithe laethúla              | 100,000 | In aghaidh na heochrach API |

Úsáideann teorainneacha ráta fuinneog shleamhnáin sa chuimhne (an patrún céanna le `RateLimitManager` in `open-sse/services/`). Mura mbíonn sé sin ar fáil de bharr atosú an phróisis, úsáidtear áiritheoirí le tacaíocht SQLite.

### Brath Aimhrialtachtaí Z-Scóir

I gcás gach eochrach API, coinníonn an córas fuinneog rollach 7 lá den XP a tuilleadh in aghaidh na huaire. Gach uair a bhronntar XP:

1. Ríomh ráta reatha XP in aghaidh na huaire an úsáideora.
2. Ríomh meán agus diall caighdeánach an daonra.
3. Ríomh `z = (user_rate - mean) / stddev`.
4. Más `z > 3.0` (3 dhiall chaighdeánacha), marcáil mar aimhrialtacht é.

Logáiltear aimhrialtachtaí in `xp_audit_log` le `action = 'anomaly_detected'` agus taispeántar iad ar dheais an riarthóra.

### Rian Iniúchta

Logáiltear gach bronnadh XP, aistriú, suaitheantas a ghnóthaítear agus brath aimhrialtachta in `xp_audit_log` leis na nithe seo a leanas:

| Réimse       | Cur Síos                                           |
| ------------ | -------------------------------------------------- |
| `api_key_id` | Cé hé/hí                                           |
| `action`     | Cad a tharla (xp_award, transfer, anomaly, …)      |
| `xp_awarded` | Méid (0 i gcás imeachtaí nach mbaineann le XP)     |
| `metadata`   | JSON leis an gcomhthéacs (cineál gnímh, sprioc, …) |
| `created_at` | Cathain (ISO 8601)                                 |

Is féidir le riarthóirí an rian iniúchta iomlán a fhiosrú trí `GET /api/gamification/anomalies`.

---

## Bealaí API

Leanann gach bealach patrún caighdeánach OmniRoute:

```
Bealach → Réamheitilt CORS → Bailíochtú an choirp (Zod) → Fíordheimhniú (extractApiKey)
  → Láimhseálaí
```

### Críochphointí

| Modh   | Conair                                     | Cur síos                                               | Fíordheimhniú |
| ------ | ------------------------------------------ | ------------------------------------------------------ | ------------- |
| GET    | `/api/gamification/leaderboard`            | Faigh an clár ceannairí (scóip, tréimhse, leathanachú) | Roghnach      |
| POST   | `/api/gamification/leaderboard`            | Cuir iallach ar athnuachan thaisce an chláir ceannairí | Riachtanach   |
| GET    | `/api/gamification/stream`                 | Nuashonruithe fíor-ama SSE ar an gclár ceannairí       | Roghnach      |
| GET    | `/api/gamification/transfer`               | Faigh stair na n-aistrithe (leathanachú)               | Riachtanach   |
| POST   | `/api/gamification/transfer`               | Seol comharthaí chuig úsáideoir eile                   | Riachtanach   |
| GET    | `/api/gamification/invite`                 | Liostaigh mo chóid chuiridh                            | Riachtanach   |
| POST   | `/api/gamification/invite`                 | Gin cód cuiridh nua                                    | Riachtanach   |
| DELETE | `/api/gamification/invite`                 | Cúlghair cód cuiridh                                   | Riachtanach   |
| POST   | `/api/gamification/invite/redeem`          | Fuascail cód cuiridh                                   | Riachtanach   |
| GET    | `/api/gamification/servers`                | Liostaigh freastalaithe pobail                         | Riachtanach   |
| POST   | `/api/gamification/servers`                | Ceangail le freastalaí pobail                          | Riachtanach   |
| DELETE | `/api/gamification/servers`                | Dícheangail ó fhreastalaí pobail                       | Riachtanach   |
| POST   | `/api/gamification/federation/score`       | Brúigh scór chuig cianfhreastalaí                      | Cónaidhm      |
| GET    | `/api/gamification/federation/leaderboard` | Tarraing an clár ceannairí ón gcianfhreastalaí         | Cónaidhm      |
| GET    | `/api/gamification/notifications`          | Fógraí SSE maidir le suaitheantais/ardú leibhéil       | Riachtanach   |
| GET    | `/api/gamification/anomalies`              | Féach ar thuairiscí aimhrialtachtaí (riarthóir)        | Riarthóir     |
| POST   | `/api/gamification/rotate`                 | Rothlaigh rúin chomharthaí cuiridh                     | Riachtanach   |

### Samplaí d'Iarratais/Fhreagraí

**POST /api/gamification/transfer**

```json
// Iarratas
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// Freagra 200
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

// Freagra 400 (cistí neamhleora)
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

## Uirlisí MCP (8)

Cláraithe in `open-sse/mcp-server/` in éineacht leis na huirlisí atá ann cheana. Faoi raon feidhme
an cheada `gamification`.

| Uirlis                     | Cur síos                                                     | Scéimre Ionchuir             |           |
| -------------------------- | ------------------------------------------------------------ | ---------------------------- | --------- |
| `gamification_leaderboard` | Faigh clár ceannairí do raon/tréimhse                        | `{ scope, period?, limit? }` |
| `gamification_rank`        | Faigh rang an ghlaoiteora agus a chomharsana                 | `{ scope }`                  |
| `gamification_profile`     | Faigh achoimre ar XP, leibhéal, teideal agus sraith          | `{}`                         |
| `gamification_badges`      | Liostaigh suaitheantais tuillte nó gach sainmhíniú           | `{ earned?: boolean }`       |
| `gamification_transfer`    | Seol comharthaí chuig úsáideoir eile                         | `{ to, amount }`             |
| `gamification_invite`      | Gin nó liostaigh cóid chuiridh                               | `{ action: "create"          | "list" }` |
| `gamification_servers`     | Liostaigh nó ceangail freastalaithe pobail                   | `{ action, token? }`         |
| `gamification_anomalies`   | Féach ar thuairiscí aimhrialtachtaí (raon feidhme riarthóra) | `{ limit?, since? }`         |

---

## Leathanaigh an Deais

### `/dashboard/leaderboard`

- Taispeáint phóidiam (an 3 is fearr le habhatáir agus XP).
- Roghnóir raoin feidhme: Domhanda / Seachtainiúil / Míosúil / Comharthaí Comhroinnte / Rannchuidithe.
- Tábla le huimhriú leathanach (25 in aghaidh an leathanaigh) ina bhfuil rang, ainm, scór, leibhéal agus teideal.
- Nuashonruithe fíor-ama SSE — déantar athruithe ranga a bheochan.
- Aibhsítear an t-úsáideoir reatha sa tábla le ró greamaitheach "Do Rang".

### `/dashboard/profile`

- Barra dul chun cinn XP leis an leibhéal reatha agus tairseach an chéad leibhéil eile.
- Taispeántar suaitheantas an teidil go feiceálach.
- Gailearaí suaitheantas — suaitheantais thuillte le dáta tuillimh, suaitheantais nár tuilleadh léirithe i liath
  (taispeánann suaitheantais fholaithe "???" go dtí go dtuilltear iad).
- Áiritheoir sraithe le deilbhín lasrach; féilire sraithe (na 30 lá deiridh).
- Cairt stair XP (XP laethúil le 30 lá anuas).

### `/dashboard/tokens`

- Iarmhéid comharthaí (feiceálach, ag barr an leathanaigh).
- Foirm aistrithe: faighteoir, méid, dialóg deimhnithe.
- Tábla staire aistrithe le scagairí (seolta/faighte/uile).
- Rannán cuiridh: cóid ghníomhacha, gin cód nua, comhroinn nasc.
- Freastalaithe pobail: liosta le stádas sláinte, ceangail/dícheangail.

### `/dashboard/gamification/admin`

- Liosta aimhrialtachtaí le déine, úsáideoir, stampa ama agus z-scór.
- Amharcóir loga iniúchóireachta le scagairí (cineál gnímh, úsáideoir, raon dátaí).
- Staitisticí córais: XP iomlán bronnta, úsáideoirí gníomhacha, rátaí tuillimh suaitheantas.
- Forbhreathnú ar shláinte freastalaithe cónasctha.

---

## Comhtháthú Píblíne

### Pointe Comhtháthaithe

Nascann an géimniú leis an bpíblíne iarratais ag pointe amháin in
`open-sse/handlers/chatCore.ts`:

```typescript
// Tar éis an freagra a sheoladh chuig an gcliant:
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
    // Seol agus déan dearmad: logáil é ach ná cuir ar aghaidh chuig an gcliant riamh
  });
});
```

### Cineálacha Teagmhas

| Cineál Teagmhais    | Cathain a Astaítear                                |
| ------------------- | -------------------------------------------------- |
| `request.completed` | Freagra rathúil LLM seolta                         |
| `provider.switch`   | Soláthraí athraithe (áirítear cúltitim teaglama)   |
| `combo.created`     | Cumraíocht nua teaglama sábháilte                  |
| `combo.used`        | Sprioc teaglama bainte amach go rathúil            |
| `badge.earned`      | Meaitseáil aimsithe ag meastóireacht suaitheantais |
| `streak.milestone`  | Tairseach sraithe sáraithe                         |
| `transfer.sent`     | Aistriú comharthaí curtha i gcrích                 |
| `referral.redeemed` | Cód cuiridh fuascailte go rathúil                  |
| `compression.used`  | Comhbhrú leid curtha i bhfeidhm                    |
| `skill.executed`    | Rith scile curtha i gcrích                         |
| `model.first_use`   | Samhail nár úsáideadh le 7 lá anuas                |

### Ráthaíocht Neamhbhlocála

Cinntíonn an patrún `setImmediate` + `.catch(() => {})`:

1. Seoltar an freagra ina iomláine sula ritear an géimniú.
2. Ní nochtar earráidí géimniúcháin don chliant riamh.
3. Ritheann próiseáil an teagmhais sa chéad mhicreathasc eile, ní go hinlíne.

---

## Slándáil

### Samhail Bagairtí

| Bagairt                             | Maolú                                                                                    |
| ----------------------------------- | ---------------------------------------------------------------------------------------- |
| Boilsciú scóir                      | Ríomh XP ar thaobh an fhreastalaí amháin; cuireann cliaint gníomhartha isteach, ní scóir |
| Ionsaithe athsheinnte               | Eochracha idéimheachta ar aistrithe; dí-dhúbailt sa loga iniúchta                        |
| Calaois aistrithe                   | Mórleabhar iontrála dúbailte; idirbhearta adamhacha; teorainneacha ráta                  |
| Féin-atreorú                        | Cros-seiceáil `api_key_id` tráth fuascailte                                              |
| Cúbláil an chláir ceannairí         | Brath aimhrialtachtaí Z-scóir; deais aimhrialtachtaí don riarthóir                       |
| Goid comhartha cónasctha            | Stóráil haisithe SHA-256; ní thaispeántar an comhartha amh ach uair amháin               |
| Triail bhrúidiúil ar chóid chuiridh | Teorannú ráta ar an gcríochphointe fuascailte; eantrópacht 8 gcarachtar                  |
| XSS in ainmneacha taispeána         | Glantar ainmneacha taispeána; éalaítear iontrálacha an chláir ceannairí                  |
| Ionsaithe ama ar haiseanna          | `crypto.timingSafeEqual` chun haiseanna comharthaí a chur i gcomparáid                   |

### Riachtanais Fíordheimhnithe

- **Poiblí** (gan fíordheimhniú): `GET /leaderboard`, `GET /stream` (cláir
  cheannairí inléite amháin).
- **Eochair API riachtanach**: gach oibríocht scríofa, próifíl, aistrithe, cuirí.
- **Riarthóir amháin**: deais aimhrialtachtaí, amharcóir an loga iniúchta.
- **Cónascadh**: conair fíordheimhnithe ar leith a úsáideann comhartha amh sa
  cheanntásc `Authorization`, arna bhailíochtú i gcoinne na hais SHA-256 stóráilte.

---

## Tástáil

### Comhaid Tástála

Úsáideann gach tástáil reathaí tástála dúchasach Node.js (`node --import tsx/esm --test`).

| Comhad Tástála                                | Ábhar a chumhdaítear                               | Tástálacha |
| --------------------------------------------- | -------------------------------------------------- | ---------- |
| `tests/unit/gamification/xp.test.ts`          | Ríomh XP, cuar leibhéil, teidil                    | 8          |
| `tests/unit/gamification/badges.test.ts`      | Meaitseáil critéar suaitheantais, bronnadh         | 10         |
| `tests/unit/gamification/streaks.test.ts`     | Loighic sraithe, garspriocanna, cásanna imeallacha | 7          |
| `tests/unit/gamification/leaderboard.test.ts` | Ríomh céime, uimhriú leathanach, rothlú            | 8          |
| `tests/unit/gamification/sharing.test.ts`     | Aistrithe, iarmhéid, idéimheacht                   | 9          |
| `tests/unit/gamification/invites.test.ts`     | Cruthú, fuascailt, dul in éag, féin-atreorú        | 7          |
| `tests/unit/gamification/antiCheat.test.ts`   | Teorainneacha ráta, Z-scór, logáil iniúchta        | 6          |
| `tests/unit/gamification/events.test.ts`      | Astú teagmhas, leathadh amach, láimhseáil earráidí | 5          |

### Tástálacha a Rith

```bash
# Gach tástáil chearrbhachais
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# Comhad tástála aonair
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Riachtanais Chumhdaigh

De réir `CONTRIBUTING.md` — ní mór do gach modúl nua na nithe seo a bheith aige:

- Cumhdach brainsí >= 80%.
- Gach feidhm phoiblí tástáilte uair amháin ar a laghad.
- Conairí earráide tástáilte (iarmhéid neamhleor, cóid atá imithe in éag, teorainneacha ráta).

---

## Struchtúr Comhad

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # Na 8 dtábla ar fad + innéacsanna
      gamification.ts                  # Modúl CRUD fearainn
    gamification/
      xp.ts                           # Ríomh XP, cuar leibhéal, teidil
      badges.ts                       # Sainmhínithe suaitheantas, critéir, measúnú
      streaks.ts                      # Rianú sraitheanna laethúla
      leaderboard.ts                  # Ríomh céime, SSE, rothlú
      antiCheat.ts                    # Teorannú ráta, z-scór, iniúchadh
      sharing.ts                      # Mórleabhar aistrithe comharthaí
      invites.ts                      # Cóid chuiridh/fhuascailte
      servers.ts                      # Cónaidhm freastalaithe pobail
      events.ts                       # Astaire teagmhas (pointe comhtháthaithe)
      notifications.ts                # Sruth fógraí SSE
  app/
    api/
      gamification/
        leaderboard/route.ts          # Clár ceannairí GET/POST
        leaderboard/stream/route.ts   # Nuashonruithe fíor-ama SSE
        transfer/route.ts             # Aistrithe GET/POST
        invite/route.ts               # Cóid chuiridh GET/POST/DELETE
        invite/redeem/route.ts        # Cód fuascailte POST
        servers/route.ts              # Freastalaithe GET/POST/DELETE
        federation/score/route.ts     # Scór brúite POST
        federation/leaderboard/route.ts # Clár ceannairí tarraingthe GET
        notifications/route.ts        # Fógraí SSE
        anomalies/route.ts            # Tuairiscí aimhrialtachta GET
        rotate/route.ts               # Rúin a rothlú le POST
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Leathanach ranguithe
        profile/page.tsx               # Leathanach XP/suaitheantas/sraitheanna
        tokens/page.tsx                # Leathanach iarmhéid/aistrithe/cuirí
        gamification/admin/page.tsx    # Monatóireacht riaracháin ar aimhrialtachtaí
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
    GAMIFICATION.md                    # An cháipéis seo
```

---

## Straitéis Imirce

### Céim 1: Croí an Inneall Cúil (PR 1)

- Imirce `060_create_gamification.sql` (8 dtábla).
- `src/lib/db/gamification.ts` (modúl fearainn).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- Pointe comhtháthaithe in `chatCore.ts`.
- Tástálacha aonaid le haghaidh XP, sraitheanna agus teagmhas.

### Céim 2: Suaitheantais & Clár Ceannairí (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Sainmhínithe suaitheantas sna tairisigh.
- Bealaí API an chláir ceannairí + sruth SSE.
- Tástálacha aonaid le haghaidh suaitheantas agus an chláir ceannairí.

### Céim 3: Comhroinnt & Cuirí (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- Bealaí API le haghaidh aistrithe + cuirí.
- Tástálacha aonaid le haghaidh comhroinnte, cuirí agus frithchalaoise.

### Céim 4: Cónaidhm & Deais (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- Bealaí API cónaidhme.
- Leathanaigh deaise (clár ceannairí, próifíl, comharthaí, riarachán).
- Uirlisí MCP a chlárú.

---

## Breithnithe don Todhchaí

- **Imeachtaí séasúracha**: tacair suaitheantas a bheidh ar fáil ar feadh tréimhse theoranta agus séasúir cláir ceannairí.
- **Cláir cheannairí foirne**: úsáideoirí a ghrúpáil de réir eagraíochta nó teaglaim.
- **Iolraitheoirí XP**: XP a mhéadú le linn tréimhsí bolscaireachta.
- **Éachtaí a chomhroinnt**: cártaí suaitheantas inroinnte a ghiniúint (íomhánna OpenGraph).
- **Fógraí brú soghluaiste**: fógraí bunaithe ar webhook le haghaidh imeachtaí suaitheantais/leibhéil.
- **API an chláir ceannairí**: API poiblí le haghaidh comhtháthuithe tríú páirtí.
