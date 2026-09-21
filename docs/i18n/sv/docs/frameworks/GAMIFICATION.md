# Gamification & Leaderboard System (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **Sanningskälla:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Senast uppdaterad:** 2026-06-28 — v3.8.40

OmniRoute innehåller ett local-first-baserat gamification-lager som belönar användare för att
interagera med plattformen — genom att göra förfrågningar, byta leverantörer, skapa
kombinationer, dela tokens och bidra till communityn. Allt tillstånd lagras i
SQLite; federering med communityservrar är valfri och pushbaserad.

Systemet är utformat för att ge **noll latens på den kritiska exekveringsvägen** — gamification-
händelser skickas enligt principen fire-and-forget från förfrågningsflödet och blockerar aldrig
ett LLM-svar.

---

## Översikt

### Syfte

Öka användarengagemang och användarretention genom att erbjuda synliga framsteg (XP,
nivåer, märken), social bekräftelse (topplistor) och ekonomiska incitament (token-
delning, inbjudningsbelöningar).

### Omfattning

| Funktion           | Beskrivning                                                                               |
| ------------------ | ----------------------------------------------------------------------------------------- |
| XP och nivåer      | Tjäna XP per åtgärd; gå upp i nivå längs en polynomkurva                                  |
| Märken             | Över 20 prestationer i 5 kategorier med 4 sällsynthetsnivåer                              |
| Svitserier         | Spårning av daglig aktiv användning med aktuell/längsta svit                              |
| Topplistor         | Globala, veckovisa, månatliga, tokendelnings- och bidragsomfattningar                     |
| Tokendelning       | Överför krediter mellan användare via dubbel bokföring                                    |
| Bjud in och lös in | Värvningskoder med SHA-256-hashad lagring                                                 |
| Communityservrar   | Federera med externa OmniRoute-instanser                                                  |
| Antifusk           | Poängberäkning på serversidan, hastighetsbegränsning och avvikelsedetektering med z-poäng |

### Designprinciper

1. **Local-first** — allt tillstånd finns i SQLite; inga externa tjänster krävs.
2. **Icke-blockerande** — händelser följer principen fire-and-forget; LLM-svarets exekveringsväg
   fördröjs aldrig av gamification-logik.
3. **Serverauktoritativt** — XP beräknas endast på serversidan; klienter kan inte
   blåsa upp poängen.
4. **Integritetsbevarande** — deltagande i topplistor är valfritt; användare kan
   dölja sin profil.
5. **Federeringsklart** — communityservrar kan skicka poäng via ett signerat API;
   synkronisering skriver över och adderar inte.

---

## Arkitektur

### Övergripande flöde

```
Klientförfrågan
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (befintligt flöde) ...
      → uppströmssvar skickas till klienten
      → setImmediate (fire-and-forget):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

Händelseemittern är den enda integrationspunkten. `chatCore.ts` anropar
`emitGamificationEvent()` efter att svaret har skickats; händelsemodulen fördelar
vidare till undersystemen för XP, sviter, märken, topplistor och antifusk.

### Modulberoendediagram

```
src/lib/gamification/
  events.ts          ← startpunkt (anropas från chatCore.ts)
    ├── xp.ts        ← XP-beräkning och nivåbestämning
    ├── streaks.ts   ← spårning av dagliga aktivitetssviter
    ├── badges.ts    ← utvärdering av märkeskriterier
    ├── leaderboard.ts ← rankningsberäkning och SSE-utsändning
    ├── antiCheat.ts ← hastighetsbegränsning och avvikelsedetektering
    ├── sharing.ts   ← transaktionsregister för tokenöverföringar
    ├── invites.ts   ← hantering av inbjudnings-/inlösningskoder
    ├── servers.ts   ← federering av communityservrar
    └── notifications.ts ← SSE-aviseringsström

src/lib/db/
  gamification.ts    ← alla CRUD-åtgärder (8 tabeller)

src/app/api/gamification/
  leaderboard/       ← GET rankningar, POST manuell uppdatering
  leaderboard/stream ← SSE-uppdateringar i realtid
  transfer/          ← GET historik, POST skicka tokens
  invite/            ← GET/POST koder, DELETE återkalla
  invite/redeem/     ← POST lös in en kod
  servers/           ← GET/POST/DELETE communityservrar
  federation/score/  ← POST skicka poäng till servern
  federation/leaderboard/ ← GET hämta topplista från servern
  notifications/     ← SSE-aviseringar om märken/nivåhöjningar
  anomalies/         ← GET avvikelserapporter (administratör)
  rotate/            ← POST rotera hemligheter för inbjudningstokens
```

---

## Datalager

### Databastabeller

Alla tabeller finns i OmniRoutes huvudsakliga SQLite-databas och skapas av migreringen
`060_create_gamification.sql`. WAL-loggning ärvs från singleton-instansen
`getDbInstance()` i `src/lib/db/core.ts`.

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

### Domänmodul: `src/lib/db/gamification.ts`

Följer OmniRoutes standardmönster – importerar `getDbInstance()` från
`core.ts` och exporterar typade CRUD-funktioner. Ingen rå SQL i route-hanterare.

Nyckelfunktioner:

| Funktion                   | Beskrivning                                                  |
| -------------------------- | ------------------------------------------------------------ |
| `upsertLeaderboardEntry()` | Infoga eller uppdatera poäng för (api_key_id, scope, period) |
| `getLeaderboard()`         | Sidindelad rankning för ett angivet scope/period             |
| `getUserLevel()`           | Hämta eller skapa en användarnivåpost                        |
| `updateUserLevel()`        | Ange XP, nivå och titel atomärt                              |
| `getBadgeDefinitions()`    | Alla märkesdefinitioner (valfritt filtrerade)                |
| `getUserBadges()`          | Märken som en användare har tilldelats                       |
| `awardBadge()`             | Infoga märkestilldelning (idempotent för badge_id)           |
| `logXpAction()`            | Lägg till i xp_audit_log                                     |
| `getXpAuditLog()`          | Sidindelad granskningshistorik för en användare              |
| `insertLedgerEntry()`      | Dubbel bokföring av överföring (i en transaktion)            |
| `getBalance()`             | Summan av mottaget minus skickat för en användare            |
| `getTransferHistory()`     | Sidindelad överföringslogg                                   |
| `createInviteToken()`      | Infoga inbjudningskod och hashad token                       |
| `redeemInviteToken()`      | Slå upp via kod, validera och öka uses                       |
| `upsertCommunityServer()`  | Registrera eller uppdatera en federationsserver              |
| `getCommunityServers()`    | Lista servrar för en användare                               |
| `deleteCommunityServer()`  | Ta bort en serverregistrering                                |

---

## XP-/nivåsystem

**Fil:** `src/lib/gamification/xp.ts`

### Nivåkurva

Den XP som krävs för att nå nivå `n` följer en polynomkurva:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Nivå | XP till nästa | Kumulativ XP | Titel      |
| ---- | ------------- | ------------ | ---------- |
| 1    | 100           | 100          | Nybörjare  |
| 5    | 1,118         | 2,415        | Nybörjare  |
| 10   | 3,162         | 10,523       | Utforskare |
| 25   | 12,500        | 86,024       | Utforskare |
| 50   | 35,355        | 345,529      | Expert     |
| 75   | 64,952        | 948,683      | Mästare    |
| 100  | 100,000       | 2,050,000    | Legend     |

### Titlar

| Nivåintervall | Titel      |
| ------------- | ---------- |
| 1 – 9         | Nybörjare  |
| 10 – 24       | Utforskare |
| 25 – 49       | Expert     |
| 50 – 74       | Mästare    |
| 75 – 100      | Legend     |

### XP-belöningar

| Åtgärd            | XP  | Beskrivning                                                  |
| ----------------- | --- | ------------------------------------------------------------ |
| `request`         | 1   | Per API-anrop som dirigeras genom OmniRoute                  |
| `provider_switch` | 5   | Byte till en annan leverantör                                |
| `model_switch`    | 3   | Byte till en annan modell                                    |
| `combo_create`    | 10  | Skapande av en ny kombination                                |
| `combo_use`       | 2   | Användning av en kombination för ett anrop                   |
| `token_share`     | 1   | Per 1 000 token som delas med en annan användare             |
| `invite_redeem`   | 50  | Inlösen av en inbjudningskod                                 |
| `daily_login`     | 5   | Daglig aktiv användning (en gång per dag)                    |
| `streak_bonus`    | 2   | Per sammanhängande svitdag (multiplicerat med svitens längd) |
| `badge_unlock`    | 10  | Upplåsning av ett märke                                      |

### Tilldelningsflöde

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. Slå upp `XP_REWARDS[action]` för att hämta XP-mängden.
2. Skicka genom `checkRateLimit()` (skydd mot fusk: högst 1 000 XP/min per nyckel).
3. Öppna en transaktion:
   - Läs den aktuella raden i `user_levels`.
   - Lägg till XP och beräkna nivån på nytt via `levelFromXp(totalXp)`.
   - Om nivån ändrades, ange `levelUp = true`.
   - Uppdatera raden i `user_levels`.
   - Infoga i `xp_audit_log`.
4. Returnera resultatet. Anroparen hanterar aviseringar.

### Hjälpfunktion: `levelFromXp(totalXp)`

Itererar genom nivå 1..100 och summerar `xp_for_level(n)` tills den kumulativa XP:n
överstiger `totalXp`. Returnerar den högsta nivån vars tröskel har uppnåtts.
Detta är O(100) – acceptabelt eftersom nivåerna är begränsade till 100.

---

## Märkessystem

**Fil:** `src/lib/gamification/badges.ts`

### Kategorier

| Kategori       | Beskrivning                           | Exempel på märken                          |
| -------------- | ------------------------------------- | ------------------------------------------ |
| `usage`        | Volymbaserade milstolpar              | Första anropet, 1 000 anrop, 100 000       |
| `sharing`      | Tokendelning och värvningar           | Första delningen, Generös (10 delningar)   |
| `contribution` | Engagemang i gemenskapen              | Kombinationsskapare, Leverantörsutforskare |
| `streak`       | Kontinuitet över tid                  | Veckokrigare, Månadstrogen                 |
| `rare`         | Svåruppnådda eller dolda prestationer | Tidig användare, Felrapportör              |

### Sällsynthetsgrader

| Sällsynthetsgrad | Färg | Sannolikhetsindikation |
| ---------------- | ---- | ---------------------- |
| `common`         | Grå  | De flesta användare    |
| `uncommon`       | Grön | Aktiva användare       |
| `rare`           | Blå  | Hängivna användare     |
| `legendary`      | Guld | Topp 1 %               |

### Kriterietyper

| Typ            | Fält         | Beskrivning                                      |
| -------------- | ------------ | ------------------------------------------------ |
| `action_count` | `count`      | Utför en åtgärd N gånger (t.ex. 1 000 anrop)     |
| `streak`       | `days`       | Upprätthåll en svit i N dagar i följd            |
| `unique_count` | `field`, `n` | Använd N unika värden (t.ex. 10 olika modeller)  |
| `rank`         | `scope`, `n` | Nå placering N inom en topplistas omfattning     |
| `first`        | —            | Var först med att utföra en åtgärd               |
| `hidden`       | (varierar)   | Kriterier visas inte förrän märket har erhållits |

Märkesdefinitioner lagras i `badge_definitions` som JSON-`criteria`:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Utvärderingsflöde

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # alla definitioner
    → getUserBadges(apiKeyId)         # redan erhållna (hoppa över)
    → för varje märke som inte har erhållits:
       → matchesCriteria(badge, event, userState)
       → vid träff: awardBadge(apiKeyId, badgeId)
         → returnera aviseringsdata
```

Utvärderingen är **händelsestyrd** – den körs efter varje spelifieringshändelse, men
kontrollerar endast märken vars `criteria.type` stämmer överens med händelsens åtgärd. Detta
gör utvärderingen snabb (< 5 ms för de flesta händelser).

### `matchesCriteria(badge, event, userState)`

| Kriterietyp    | Kontroll                                                  |
| -------------- | --------------------------------------------------------- |
| `action_count` | `getActionCount(apiKeyId, action) >= count`               |
| `streak`       | `getCurrentStreak(apiKeyId) >= days`                      |
| `unique_count` | `getUniqueCount(apiKeyId, field) >= n`                    |
| `rank`         | `getRank(apiKeyId, scope) <= n`                           |
| `first`        | Ingen tidigare post i `xp_audit_log` för denna åtgärdstyp |
| `hidden`       | Delegerar till lämplig underkontroll                      |

### Inbyggda märken (20+)

<details>
<summary>Fullständig lista över märken</summary>

| Märke                   | Kategori   | Sällsynthet  | Kriterier                      |
| ----------------------- | ---------- | ------------ | ------------------------------ |
| Första stegen           | användning | vanligt      | 1 förfrågan                    |
| Börjar bli varm         | användning | vanligt      | 100 förfrågningar              |
| Avancerad användare     | användning | ovanligt     | 1,000 förfrågningar            |
| Centurion               | användning | sällsynt     | 10,000 förfrågningar           |
| OmniPower               | användning | legendariskt | 100,000 förfrågningar          |
| Leverantörshoppare      | bidrag     | vanligt      | Använd 5 olika leverantörer    |
| Leverantörsmästare      | bidrag     | ovanligt     | Använd 20 olika leverantörer   |
| Kombinationsarkitekt    | bidrag     | ovanligt     | Skapa 5 kombinationer          |
| Kombinationsstormästare | bidrag     | sällsynt     | Skapa 25 kombinationer         |
| Första delningen        | delning    | vanligt      | 1 tokenöverföring              |
| Generös                 | delning    | ovanligt     | 10 tokenöverföringar           |
| Filantrop               | delning    | sällsynt     | Överför totalt 10,000 tokens   |
| Värvare                 | delning    | vanligt      | 1 lyckad värvning              |
| Nätverksbyggare         | delning    | ovanligt     | 10 lyckade värvningar          |
| Veckokrigare            | svit       | ovanligt     | 7 dagars svit                  |
| Månadstrogen            | svit       | sällsynt     | 30 dagars svit                 |
| Ostoppbar               | svit       | legendariskt | 365 dagars svit                |
| Tidig användare         | sällsynt   | legendariskt | Gå med under betaperioden      |
| Komprimeringspionjär    | sällsynt   | ovanligt     | Använd komprimering 100 gånger |
| Färdighetssamlare       | sällsynt   | sällsynt     | Använd 10 olika färdigheter    |
| Modellutforskare        | bidrag     | ovanligt     | Använd 15 olika modeller       |

</details>

---

## Svitspårare

**Fil:** `src/lib/gamification/streaks.ts`

### Datamodell

Sviter lagras i tabellen `key_value` (delad hjälptabell) under namnrymdsindelade nycklar:

| Nyckel                        | Värde                            | Beskrivning         |
| ----------------------------- | -------------------------------- | ------------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Data för aktiv svit |

### Logik

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Läs svitposten från `key_value`.
2. Tolka `{current}`, `{longest}`, `{lastDate}` (ISO-datumsträng).
3. Om `lastDate === today` – ingen ändring (redan räknad i dag).
4. Om `lastDate === yesterday` – öka `current`; uppdatera `longest` vid behov.
5. Om `lastDate < yesterday` – återställ `current = 1` (sviten bruten).
6. Skriv den uppdaterade posten.
7. Kontrollera milstolpar: 7, 14, 30, 60, 90, 180, 365 dagar. Om en milstolpe passeras, sätt
   `milestone = true` (anroparen tilldelar XP och kontrollerar märken).

### Specialfall

- **Tidszon**: sviter använder UTC-datum (`new Date().toISOString().slice(0, 10)`).
  Detta är avsiktligt – en enda kanonisk tidszon förhindrar manipulation genom
  byte av tidszon.
- **Nya användare**: ingen svitpost finns; den första begäran skapar den med
  `current=1, longest=1, lastDate=today`.
- **Flera begäranden per dag**: endast den första begäran under UTC-dygnet
  ökar sviten.

---

## Topplista

**Fil:** `src/lib/gamification/leaderboard.ts`

### Omfattningar

| Omfattning      | Period  | Beskrivning                                                        |
| --------------- | ------- | ------------------------------------------------------------------ |
| `global`        | `all`   | Sammanlagd XP genom tiderna                                        |
| `weekly`        | `week`  | XP som tjänats in under aktuell UTC-vecka (mån–sön)                |
| `monthly`       | `month` | XP som tjänats in under aktuell UTC-månad                          |
| `tokens_shared` | `all`   | Totalt antal token som överförts till andra                        |
| `contributions` | `all`   | Skapade kombinationer + använda leverantörer + använda färdigheter |

### Beräkning av placering

Placeringar **beräknas vid läsning** och lagras inte. Detta förhindrar inaktuella placeringsdata
och eliminerar behovet av periodiska jobb för att räkna om placeringar.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

Frågemönster:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### Periodrotation

Vecko- och månadstopplistor roteras automatiskt:

1. **Arkivera**: vid periodgränsen kopieras aktuella poster till
   `leaderboard_archive` med periodetiketten.
2. **Återställ**: ta bort poster för den utgångna perioden.
3. **Utlösare**: kontrolleras vid varje anrop till `updateLeaderboard()`; den första begäran
   under en ny period utlöser rotationen.

Detta säkerställer att veckotopplistor återställs varje måndag kl. 00:00 UTC och att månadstopplistor
återställs den första dagen i varje månad.

### SSE-uppdateringar i realtid

**Slutpunkt:** `GET /api/gamification/stream`

```
Klient → GET /api/gamification/stream
  → SSE-anslutning upprättas
  → Servern skickar omedelbart en ögonblicksbild av topp 10 på topplistan
  → Var 5:e sekund: skicka uppdaterad topp 10 om den har ändrats
  → Var 15:e sekund: pulsslagskommentar (": heartbeat\n\n")
  → Klienten kopplar från → rensning (ta bort lyssnare)
```

Händelseformat:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

SSE-hanteraren spårar anslutna klienter per omfattning och skickar endast uppdateringar
när topplistans data faktiskt har ändrats sedan den senaste utskicket.

---

## Tokendelning

**Fil:** `src/lib/gamification/sharing.ts`

### Dubbel bokföring

Varje överföring skapar två rader i `token_ledger`:

| Rad    | `from_key_id` | `to_key_id` | `amount` |
| ------ | ------------- | ----------- | -------- |
| Debet  | avsändare     | mottagare   | +belopp  |
| Kredit | mottagare     | avsändare   | -belopp  |

Vänta — konventionen är:

| Rad     | `from_key_id` | `to_key_id` | `amount` | Betydelse              |
| ------- | ------------- | ----------- | -------- | ---------------------- |
| Skicka  | avsändare     | mottagare   | +belopp  | Utflöde från avsändare |
| Ta emot | mottagare     | avsändare   | +belopp  | Inflöde till mottagare |

Saldot beräknas så här:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Överföringsflöde

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Validering**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **Idempotens**: kontrollera om `idempotency_key` redan finns i liggaren.
   Om den gör det returneras det cachelagrade resultatet.
3. **Transaktion** (en enda SQLite-transaktion):
   a. Beräkna avsändarens saldo.
   b. Om `balance < amount`, avbryt (otillräckligt saldo).
   c. Infoga sändningsrad (`from=sender,`.

### Hastighetsbegränsning

- Högst 10 överföringar per minut och API-nyckel.
- Högst 10 000 tokens per enskild överföring.
- Högst 100 000 överförda tokens per dag och API-nyckel.

---

## Inbjudnings- och inlösningstokens

**Fil:** `src/lib/gamification/invites.ts`

### Kodformat

- **Kod**: 8 tecken, alfanumerisk (t.ex. `A3K9-X7M2`), läsbar för människor,
  visas för användaren.
- **Token**: slumpmässig token på 32 byte, lagrad som en SHA-256-hash. Används för
  programmatisk inlösen (t.ex. URL-länkar).

### Lagring

| Kolumn       | Värde                        |
| ------------ | ---------------------------- |
| `code`       | `A3K9X7M2` (unik, indexerad) |
| `token_hash` | SHA-256(raw_token)           |

Den råa token returneras till användaren exakt en gång när den skapas. OmniRoute
lagrar eller visar den aldrig igen — endast hashen bevaras.

### Förhindrande av självreferering

När en användare löser in en kod kontrollerar systemet följande:

1. Koden tillhör ett annat `api_key_id`.
2. Den inlösande användaren har inte tidigare löst in någon kod från samma
   hänvisare (sammankoppling av `invite_tokens` och inlösningsloggen).

Om någon av kontrollerna misslyckas avvisas inlösningen med ett tydligt felmeddelande.

### Giltighetstid och gränser

- Standardvärde för `max_uses`: 10 (konfigurerbart vid skapandet).
- Standardvärde för `expires_at`: 30 dagar från skapandet.
- Utgångna eller förbrukade koder returnerar HTTP 410 Gone.

---

## Federering av communityservrar

**Fil:** `src/lib/gamification/servers.ts`

### Anslutning

En communityserver registreras via en inbjudningstoken som utfärdas av fjärrservern. Den lokala instansen:

1. Tar emot inbjudningstoken (t.ex. när den klistras in på kontrollpanelen).
2. Anropar `POST /api/gamification/federation/leaderboard` på fjärrservern för att validera token och hämta den aktuella topplistan.
3. Lagrar serverposten med `status: connected`.

### Synkroniseringsmodell

Federering använder **överskrivande synkronisering**, inte additiv:

```
Lokal instans                  Communityserver
     │                              │
     ├── skicka poäng ─────────────►│  POST /federation/score
     │   { api_key_id, score }      │  (servern validerar tokenhashen)
     │                              │
     ├── hämta topplista ──────────►│  GET /federation/leaderboard
     │◄── topp-N-poster ────────────┤  (skriver över lokal cache)
     │                              │
     └── hälsokontroll ────────────►│  GET /federation/health
         (var 60:e s, timeout 5 s)  │
```

### Autentisering

Federeringsbegäranden innehåller:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

Fjärrservern hashberäknar token och söker efter den matchande raden i `community_servers`. Detta undviker att den lagrade hashen överförs.

### Hälsoövervakning

Varje serverpost spårar:

| Fält        | Beskrivning                                   |
| ----------- | --------------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable`        |
| `last_sync` | ISO-tidsstämpel för senaste lyckade synkning  |
| `failures`  | Antal hälsokontroller i följd som misslyckats |

Efter 5 misslyckanden i följd ändras statusen till `unreachable` och synkroniseringen pausas tills en manuell hälsokontroll lyckas.

---

## Fuskskydd

**Fil:** `src/lib/gamification/antiCheat.ts`

### Poängberäkning på serversidan

Alla XP-beräkningar sker i `src/lib/gamification/xp.ts`. Klienter skickar aldrig in poäng — de skickar in åtgärder, och servern beräknar XP. Kolumnen `leaderboard.score` kan endast skrivas av kod på serversidan.

### Hastighetsbegränsning

| Gräns                             | Värde   | Omfattning     |
| --------------------------------- | ------- | -------------- |
| Maximalt XP per minut             | 1,000   | Per API-nyckel |
| Maximalt antal överföringar/minut | 10      | Per API-nyckel |
| Maximalt överföringsbelopp        | 10,000  | Per överföring |
| Maximala dagliga överföringar     | 100,000 | Per API-nyckel |

Hastighetsbegränsningar använder ett glidande fönster i minnet (samma mönster som `RateLimitManager` i `open-sse/services/`). Vid omstart av processen används SQLite-baserade räknare som reservlösning.

### Avvikelsedetektering med z-poäng

För varje API-nyckel upprätthåller systemet ett rullande 7-dagarsfönster med intjänad XP per timme. Vid varje XP-tilldelning:

1. Beräkna användarens aktuella XP-takt per timme.
2. Beräkna populationens medelvärde och standardavvikelse.
3. Beräkna `z = (user_rate - mean) / stddev`.
4. Om `z > 3.0` (3 standardavvikelser), flagga det som en avvikelse.

Avvikelser loggas i `xp_audit_log` med `action = 'anomaly_detected'` och visas på administratörens kontrollpanel.

### Granskningslogg

Varje XP-tilldelning, överföring, intjänat märke och upptäckt av en avvikelse loggas i `xp_audit_log` med:

| Fält         | Beskrivning                                    |
| ------------ | ---------------------------------------------- |
| `api_key_id` | Vem                                            |
| `action`     | Vad som hände (xp_award, transfer, anomaly, …) |
| `xp_awarded` | Belopp (0 för händelser som inte gäller XP)    |
| `metadata`   | JSON med kontext (åtgärdstyp, mål, …)          |
| `created_at` | När (ISO 8601)                                 |

Administratörer kan söka i hela granskningsloggen via `GET /api/gamification/anomalies`.

---

## API-rutter

Alla rutter följer OmniRoutes standardmönster:

```
Rutt → CORS-preflight → Validering av brödtext (Zod) → Autentisering (extractApiKey)
  → Hanterare
```

### Ändpunkter

| Metod  | Sökväg                                     | Beskrivning                                        | Autentisering |
| ------ | ------------------------------------------ | -------------------------------------------------- | ------------- |
| GET    | `/api/gamification/leaderboard`            | Hämta topplista (omfattning, period, sidindelning) | Valfritt      |
| POST   | `/api/gamification/leaderboard`            | Framtvinga uppdatering av topplistans cache        | Obligatorisk  |
| GET    | `/api/gamification/stream`                 | Topplisteuppdateringar i realtid via SSE           | Valfritt      |
| GET    | `/api/gamification/transfer`               | Hämta överföringshistorik (sidindelning)           | Obligatorisk  |
| POST   | `/api/gamification/transfer`               | Skicka tokens till en annan användare              | Obligatorisk  |
| GET    | `/api/gamification/invite`                 | Lista mina inbjudningskoder                        | Obligatorisk  |
| POST   | `/api/gamification/invite`                 | Generera en ny inbjudningskod                      | Obligatorisk  |
| DELETE | `/api/gamification/invite`                 | Återkalla en inbjudningskod                        | Obligatorisk  |
| POST   | `/api/gamification/invite/redeem`          | Lös in en inbjudningskod                           | Obligatorisk  |
| GET    | `/api/gamification/servers`                | Lista communityservrar                             | Obligatorisk  |
| POST   | `/api/gamification/servers`                | Anslut till en communityserver                     | Obligatorisk  |
| DELETE | `/api/gamification/servers`                | Koppla från en communityserver                     | Obligatorisk  |
| POST   | `/api/gamification/federation/score`       | Skicka poäng till en fjärrserver                   | Federation    |
| GET    | `/api/gamification/federation/leaderboard` | Hämta topplistan från en fjärrserver               | Federation    |
| GET    | `/api/gamification/notifications`          | SSE-aviseringar om märken/nivåhöjningar            | Obligatorisk  |
| GET    | `/api/gamification/anomalies`              | Visa avvikelserapporter (administratör)            | Administratör |
| POST   | `/api/gamification/rotate`                 | Rotera hemligheter för inbjudningstokens           | Obligatorisk  |

### Exempel på begäran/svar

**POST /api/gamification/transfer**

```json
// Begäran
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// Svar 200
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

// Svar 400 (otillräckligt saldo)
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

## MCP-verktyg (8)

Registrerade i `open-sse/mcp-server/` tillsammans med befintliga verktyg. Begränsade till
behörighetsomfånget `gamification`.

| Verktyg                    | Beskrivning                                      | Indataschema                 |           |
| -------------------------- | ------------------------------------------------ | ---------------------------- | --------- |
| `gamification_leaderboard` | Hämta topplista för ett omfång/en period         | `{ scope, period?, limit? }` |
| `gamification_rank`        | Hämta anroparens placering och närliggande       | `{ scope }`                  |
| `gamification_profile`     | Hämta sammanfattning av XP, nivå, titel och svit | `{}`                         |
| `gamification_badges`      | Lista intjänade märken eller alla definitioner   | `{ earned?: boolean }`       |
| `gamification_transfer`    | Skicka tokens till en annan användare            | `{ to, amount }`             |
| `gamification_invite`      | Generera eller lista inbjudningskoder            | `{ action: "create"          | "list" }` |
| `gamification_servers`     | Lista eller anslut communityservrar              | `{ action, token? }`         |
| `gamification_anomalies`   | Visa avvikelserapporter (administratörsomfång)   | `{ limit?, since? }`         |

---

## Dashboardsidor

### `/dashboard/leaderboard`

- Podievisning (de tre främsta med avatarer och XP).
- Omfångsväljare: Globalt / Veckovis / Månadsvis / Delade tokens / Bidrag.
- Sidindelad tabell (25 per sida) med placering, namn, poäng, nivå och titel.
- SSE-uppdateringar i realtid — placeringsändringar animeras.
- Den aktuella användaren markeras i tabellen med en fäst rad med texten "Din placering".

### `/dashboard/profile`

- XP-förloppsindikator med aktuell nivå och tröskelvärde för nästa nivå.
- Titelmärke visas framträdande.
- Märkesgalleri — intjänade märken med intjänandedatum, ej intjänade märken nedtonade
  (dolda märken visar "???" tills de har tjänats in).
- Svitmätare med flamikon; svitkalender (de senaste 30 dagarna).
- Diagram över XP-historik (daglig XP under de senaste 30 dagarna).

### `/dashboard/tokens`

- Tokensaldo (framträdande, högst upp på sidan).
- Överföringsformulär: mottagare, belopp, bekräftelsedialogruta.
- Tabell över överföringshistorik med filter (skickade/mottagna/alla).
- Inbjudningsavsnitt: aktiva koder, generera ny, dela länk.
- Communityservrar: lista med hälsostatus, anslut/koppla från.

### `/dashboard/gamification/admin`

- Avvikelselista med allvarlighetsgrad, användare, tidsstämpel och z-poäng.
- Granskare för revisionslogg med filter (åtgärdstyp, användare, datumintervall).
- Systemstatistik: totalt tilldelad XP, aktiva användare, andel intjänade märken.
- Översikt över federationsservrarnas hälsostatus.

---

## Pipeline-integration

### Integrationspunkt

Gamification kopplas in i pipeline för förfrågningar vid en enda punkt i
`open-sse/handlers/chatCore.ts`:

```typescript
// Efter att svaret har skickats till klienten:
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
    // Starta och glöm: logga, men vidarebefordra aldrig till klienten
  });
});
```

### Händelsetyper

| Händelsetyp         | När den genereras                              |
| ------------------- | ---------------------------------------------- |
| `request.completed` | Ett lyckat LLM-svar har skickats               |
| `provider.switch`   | Leverantören har ändrats (combo-reserv räknas) |
| `combo.created`     | En ny combo-konfiguration har sparats          |
| `combo.used`        | Combo-målet har nåtts                          |
| `badge.earned`      | Märkesutvärderingen hittade en matchning       |
| `streak.milestone`  | Ett tröskelvärde för en svit har passerats     |
| `transfer.sent`     | Tokenöverföringen har slutförts                |
| `referral.redeemed` | Inbjudningskoden har lösts in                  |
| `compression.used`  | Promptkomprimering har tillämpats              |
| `skill.executed`    | Färdighetsexekveringen har slutförts           |
| `model.first_use`   | Modellen har inte använts de senaste 7 dagarna |

### Garanti om icke-blockering

Mönstret `setImmediate` + `.catch(() => {})` säkerställer:

1. Svaret skickas i sin helhet innan gamification körs.
2. Gamification-fel visas aldrig för klienten.
3. Händelsebearbetningen körs i nästa mikrouppgift, inte direkt.

---

## Säkerhet

### Hotmodell

| Hot                             | Riskreducering                                                           |
| ------------------------------- | ------------------------------------------------------------------------ |
| Uppblåsta poäng                 | XP beräknas endast på serversidan; klienter skickar åtgärder, inte poäng |
| Replay-attacker                 | Idempotensnycklar för överföringar; deduplicering av granskningsloggen   |
| Överföringsbedrägeri            | Dubbel bokföring; atomära transaktioner; frekvensbegränsningar           |
| Självreferering                 | Dubbelkontroll av `api_key_id` vid inlösen                               |
| Manipulering av topplistan      | Z-poängsbaserad avvikelsedetektering; administratörsvy för avvikelser    |
| Stöld av federationstoken       | Lagring av SHA-256-hash; rå token visas endast en gång                   |
| Brute force av inbjudningskoder | Frekvensbegränsning på slutpunkten för inlösen; entropi med 8 tecken     |
| XSS i visningsnamn              | Visningsnamn saneras; poster i topplistan skyddskodas                    |
| Tidsattacker mot hashar         | `crypto.timingSafeEqual` för jämförelse av tokenhashar                   |

### Autentiseringskrav

- **Offentlig** (ingen autentisering): `GET /leaderboard`, `GET /stream` (skrivskyddade
  topplistor).
- **API-nyckel krävs**: alla skrivåtgärder, profiler, överföringar och inbjudningar.
- **Endast administratörer**: avvikelsepanel, visning av granskningslogg.
- **Federation**: separat autentiseringssökväg som använder en rå token i
  `Authorization`-huvudet, validerad mot den lagrade SHA-256-hashen.

---

## Testning

### Testfiler

Alla tester använder Node.js inbyggda testkörare (`node --import tsx/esm --test`).

| Testfil                                       | Omfattar                                            | Tester |
| --------------------------------------------- | --------------------------------------------------- | ------ |
| `tests/unit/gamification/xp.test.ts`          | XP-beräkning, nivåkurva, titlar                     | 8      |
| `tests/unit/gamification/badges.test.ts`      | Matchning av märkeskriterier, tilldelning           | 10     |
| `tests/unit/gamification/streaks.test.ts`     | Svitlogik, milstolpar, gränsfall                    | 7      |
| `tests/unit/gamification/leaderboard.test.ts` | Beräkning av placering, sidnumrering, rotation      | 8      |
| `tests/unit/gamification/sharing.test.ts`     | Överföringar, saldo, idempotens                     | 9      |
| `tests/unit/gamification/invites.test.ts`     | Skapande, inlösen, utgång, självreferering          | 7      |
| `tests/unit/gamification/antiCheat.test.ts`   | Frekvensbegränsningar, z-poäng, granskningsloggning | 6      |
| `tests/unit/gamification/events.test.ts`      | Händelseutskick, fan-out, felhantering              | 5      |

### Köra tester

```bash
# Alla gamification-tester
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# En enskild testfil
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Krav på kodtäckning

Enligt `CONTRIBUTING.md` måste alla nya moduler ha:

- Grentäckning >= 80 %.
- Varje offentlig funktion testad minst en gång.
- Testade felsökvägar (otillräckligt saldo, utgångna koder, frekvensbegränsningar).

---

## Filstruktur

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # Alla 8 tabeller + index
      gamification.ts                  # Domänmodul för CRUD
    gamification/
      xp.ts                           # XP-beräkning, nivåkurva, titlar
      badges.ts                       # Definitioner, kriterier och utvärdering för märken
      streaks.ts                      # Spårning av dagliga sviter
      leaderboard.ts                  # Beräkning av placering, SSE, rotation
      antiCheat.ts                    # Frekvensbegränsning, z-poäng, granskning
      sharing.ts                      # Huvudbok för tokenöverföringar
      invites.ts                      # Inbjudnings-/inlösningskoder
      servers.ts                      # Federering av communityservrar
      events.ts                       # Händelseutsändare (integrationspunkt)
      notifications.ts                # SSE-ström för aviseringar
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST för topplista
        leaderboard/stream/route.ts   # SSE-uppdateringar i realtid
        transfer/route.ts             # GET/POST för överföringar
        invite/route.ts               # GET/POST/DELETE för inbjudningskoder
        invite/redeem/route.ts        # POST för att lösa in kod
        servers/route.ts              # GET/POST/DELETE för servrar
        federation/score/route.ts     # POST för att skicka poäng
        federation/leaderboard/route.ts # GET för att hämta topplista
        notifications/route.ts        # SSE-aviseringar
        anomalies/route.ts            # GET för avvikelserapporter
        rotate/route.ts               # POST för att rotera hemligheter
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Sida för placeringar
        profile/page.tsx               # Sida för XP/märken/sviter
        tokens/page.tsx                # Sida för saldo/överföringar/inbjudningar
        gamification/admin/page.tsx    # Administratörsövervakning av avvikelser
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
    GAMIFICATION.md                    # Det här dokumentet
```

---

## Migreringsstrategi

### Fas 1: Backendkärna (PR 1)

- Migrering `060_create_gamification.sql` (8 tabeller).
- `src/lib/db/gamification.ts` (domänmodul).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- Integrationspunkt i `chatCore.ts`.
- Enhetstester för XP, sviter och händelser.

### Fas 2: Märken och topplista (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Märkesdefinitioner i konstanter.
- API-rutter för topplistan + SSE-ström.
- Enhetstester för märken och topplista.

### Fas 3: Delning och inbjudningar (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- API-rutter för överföringar och inbjudningar.
- Enhetstester för delning, inbjudningar och fuskbekämpning.

### Fas 4: Federering och kontrollpanel (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- API-rutter för federering.
- Sidor i kontrollpanelen (topplista, profil, tokens, administration).
- Registrering av MCP-verktyg.

---

## Framtida överväganden

- **Säsongsevenemang**: tidsbegränsade märkesuppsättningar och topplistesäsonger.
- **Lagtopplistor**: gruppera användare efter organisation eller kombination.
- **XP-multiplikatorer**: öka XP under kampanjperioder.
- **Delning av prestationer**: generera delningsbara märkeskort (OpenGraph-bilder).
- **Mobila pushnotiser**: webhook-baserade aviseringar för märkes-/nivåhändelser.
- **Toppliste-API**: offentligt API för tredjepartsintegrationer.
