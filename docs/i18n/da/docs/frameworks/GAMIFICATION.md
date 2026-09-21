# Gamification & Leaderboard System (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **Sandhedskilde:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Senest opdateret:** 2026-06-28 — v3.8.40

OmniRoute indeholder et local-first-gamificationlag, der belønner brugere for
at interagere med platformen — ved at foretage forespørgsler, skifte udbydere, oprette
kombinationer, dele tokens og bidrage til fællesskabet. Al tilstand opbevares i
SQLite; føderation med fællesskabsservere er valgfri og push-baseret.

Systemet er designet til at have **nul latenstid på den kritiske sti** — gamification-
hændelser afsendes som fire-and-forget fra forespørgselspipelinen og blokerer aldrig
et LLM-svar.

---

## Oversigt

### Formål

Øg brugerengagement og -fastholdelse ved at tilbyde synlige fremskridt (XP,
niveauer, badges), social validering (ranglister) og økonomiske incitamenter (deling
af tokens, invitationsbelønninger).

### Omfang

| Funktion           | Beskrivelse                                                             |
| ------------------ | ----------------------------------------------------------------------- |
| XP og niveauer     | Optjen XP pr. handling; stig i niveau langs en polynomisk kurve         |
| Badges             | 20+ præstationer fordelt på 5 kategorier med 4 sjældenhedsniveauer      |
| Streaks            | Daglig sporing af aktiv brug med nuværende/længste streak               |
| Ranglister         | Globale, ugentlige, månedlige, token-delings- og bidragsområder         |
| Tokendeling        | Overfør kreditter mellem brugere via et dobbelt bogføringssystem        |
| Invitér og indløs  | Henvisningskoder med SHA-256-hashet lagring                             |
| Fællesskabsservere | Føderér med eksterne OmniRoute-instanser                                |
| Anti-snyd          | Scoring på serversiden, hastighedsbegrænsning, z-score-anomalidetektion |

### Designprincipper

1. **Local-first** — al tilstand opbevares i SQLite; ingen eksterne tjenester er påkrævet.
2. **Ikke-blokerende** — hændelser er fire-and-forget; LLM-svarstien
   forsinkes aldrig af gamification-logik.
3. **Serverautoritativ** — XP beregnes kun på serversiden; klienter kan ikke
   oppuste scorer.
4. **Respekt for privatliv** — deltagelse på ranglisten er valgfri; brugere kan
   skjule deres profil.
5. **Klar til føderation** — fællesskabsservere kan pushe scorer via et signeret API;
   synkronisering overskriver og er ikke additiv.

---

## Arkitektur

### Overordnet flow

```
Klientforespørgsel
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (eksisterende pipeline) ...
      → upstream-svar sendt til klienten
      → setImmediate (fire-and-forget):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

Hændelsesudsenderen er det eneste integrationspunkt. `chatCore.ts` kalder
`emitGamificationEvent()`, efter svaret er sendt; hændelsesmodulet fordeler
arbejdet til undersystemerne for XP, streaks, badges, ranglister og anti-snyd.

### Modulafhængighedsgraf

```
src/lib/gamification/
  events.ts          ← indgangspunkt (kaldes fra chatCore.ts)
    ├── xp.ts        ← XP-beregning og niveaubestemmelse
    ├── streaks.ts   ← sporing af daglige aktive streaks
    ├── badges.ts    ← evaluering af badgekriterier
    ├── leaderboard.ts ← beregning af placering og SSE-udsendelse
    ├── antiCheat.ts ← hastighedsbegrænsning og anomalidetektion
    ├── sharing.ts   ← bogføring af tokenoverførsler
    ├── invites.ts   ← administration af invitations-/indløsningskoder
    ├── servers.ts   ← føderation af fællesskabsservere
    └── notifications.ts ← SSE-notifikationsstrøm

src/lib/db/
  gamification.ts    ← alle CRUD-operationer (8 tabeller)

src/app/api/gamification/
  leaderboard/       ← GET placeringer, POST manuel opdatering
  leaderboard/stream ← SSE-opdateringer i realtid
  transfer/          ← GET historik, POST send tokens
  invite/            ← GET/POST koder, DELETE tilbagekald
  invite/redeem/     ← POST indløs en kode
  servers/           ← GET/POST/DELETE fællesskabsservere
  federation/score/  ← POST push score til server
  federation/leaderboard/ ← GET hent rangliste fra server
  notifications/     ← SSE-notifikationer om badges/niveauoprykninger
  anomalies/         ← GET anomalirapporter (administrator)
  rotate/            ← POST rotér hemmeligheder til invitationstokens
```

---

## Datalag

### Databasetabeller

Alle tabeller findes i OmniRoutes primære SQLite-database, som oprettes af migreringen
`060_create_gamification.sql`. WAL-journalføring nedarves fra singleton-instansen
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

### Domænemodul: `src/lib/db/gamification.ts`

Følger OmniRoutes standardmønster — importerer `getDbInstance()` fra
`core.ts` og eksporterer typeangivne CRUD-funktioner. Ingen rå SQL i route-handlere.

Nøglefunktioner:

| Funktion                   | Beskrivelse                                                 |
| -------------------------- | ----------------------------------------------------------- |
| `upsertLeaderboardEntry()` | Indsæt eller opdater scoren for (api_key_id, scope, period) |
| `getLeaderboard()`         | Sideinddelte rangeringer for et givent scope/period         |
| `getUserLevel()`           | Hent eller opret en brugers level-post                      |
| `updateUserLevel()`        | Angiv XP, level og titel atomisk                            |
| `getBadgeDefinitions()`    | Alle badge-definitioner (eventuelt filtreret)               |
| `getUserBadges()`          | Badges optjent af en bruger                                 |
| `awardBadge()`             | Indsæt optjening af badge (idempotent for badge_id)         |
| `logXpAction()`            | Tilføj til xp_audit_log                                     |
| `getXpAuditLog()`          | Sideinddelt revisionshistorik for en bruger                 |
| `insertLedgerEntry()`      | Dobbelt bogført overførsel (i en transaktion)               |
| `getBalance()`             | Summen af modtaget minus sendt for en bruger                |
| `getTransferHistory()`     | Sideinddelt overførselslog                                  |
| `createInviteToken()`      | Indsæt invitationskode + hashet token                       |
| `redeemInviteToken()`      | Slå op efter kode, valider, og øg uses                      |
| `upsertCommunityServer()`  | Registrer eller opdater en føderationsserver                |
| `getCommunityServers()`    | Vis servere for en bruger                                   |
| `deleteCommunityServer()`  | Fjern en serverregistrering                                 |

---

## XP-/niveausystem

**Fil:** `src/lib/gamification/xp.ts`

### Niveaukurve

Den XP, der kræves for at nå niveau `n`, følger en polynomiel kurve:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Niveau | XP til næste | Akkumuleret XP | Titel              |
| ------ | ------------ | -------------- | ------------------ |
| 1      | 100          | 100            | Begynder           |
| 5      | 1,118        | 2,415          | Begynder           |
| 10     | 3,162        | 10,523         | Opdagelsesrejsende |
| 25     | 12,500       | 86,024         | Opdagelsesrejsende |
| 50     | 35,355       | 345,529        | Ekspert            |
| 75     | 64,952       | 948,683        | Mester             |
| 100    | 100,000      | 2,050,000      | Legende            |

### Titler

| Niveauinterval | Titel              |
| -------------- | ------------------ |
| 1 – 9          | Begynder           |
| 10 – 24        | Opdagelsesrejsende |
| 25 – 49        | Ekspert            |
| 50 – 74        | Mester             |
| 75 – 100       | Legende            |

### XP-belønninger

| Handling          | XP  | Beskrivelse                                                 |
| ----------------- | --- | ----------------------------------------------------------- |
| `request`         | 1   | Pr. API-anmodning dirigeret gennem OmniRoute                |
| `provider_switch` | 5   | Skift til en anden udbyder                                  |
| `model_switch`    | 3   | Skift til en anden model                                    |
| `combo_create`    | 10  | Oprettelse af en ny kombination                             |
| `combo_use`       | 2   | Brug af en kombination til en anmodning                     |
| `token_share`     | 1   | Pr. 1 000 tokens delt med en anden bruger                   |
| `invite_redeem`   | 50  | Indløsning af en invitationskode                            |
| `daily_login`     | 5   | Daglig aktiv brug (én gang om dagen)                        |
| `streak_bonus`    | 2   | Pr. sammenhængende dag i serien (ganget med seriens længde) |
| `badge_unlock`    | 10  | Oplåsning af et badge                                       |

### Tildelingsforløb

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. Slå `XP_REWARDS[action]` op for at hente XP-mængden.
2. Send gennem `checkRateLimit()` (beskyttelse mod snyd: maks. 1000 XP/min. pr. nøgle).
3. Åbn en transaktion:
   - Læs den aktuelle række i `user_levels`.
   - Tilføj XP; genberegn niveauet via `levelFromXp(totalXp)`.
   - Hvis niveauet er ændret, skal `levelUp = true` angives.
   - Opdater rækken i `user_levels`.
   - Indsæt i `xp_audit_log`.
4. Returner resultatet. Kalderen håndterer notifikationer.

### Hjælpefunktion: `levelFromXp(totalXp)`

Gennemløber niveau 1..100 og summerer `xp_for_level(n)`, indtil den akkumulerede XP
overstiger `totalXp`. Returnerer det højeste niveau, hvis tærskel er nået.
Dette er O(100) — acceptabelt, da niveauerne har en øvre grænse på 100.

---

## Badgesystem

**Fil:** `src/lib/gamification/badges.ts`

### Kategorier

| Kategori       | Beskrivelse                                | Eksempler på badges                    |
| -------------- | ------------------------------------------ | -------------------------------------- |
| `usage`        | Mængdebaserede milepæle                    | Første anmodning, 1K anmodninger, 100K |
| `sharing`      | Deling af tokens og henvisninger           | Første deling, Generøs (10 delinger)   |
| `contribution` | Engagement i fællesskabet                  | Kombinationsskaber, Udbyderopdager     |
| `streak`       | Kontinuitet over tid                       | Ugekriger, Månedligt dedikeret         |
| `rare`         | Svært opnåelige eller skjulte præstationer | Tidlig bruger, Fejlrapportør           |

### Sjældenhedsgrader

| Sjældenhedsgrad | Farve | Sandsynlighedsindikation |
| --------------- | ----- | ------------------------ |
| `common`        | Grå   | De fleste brugere        |
| `uncommon`      | Grøn  | Aktive brugere           |
| `rare`          | Blå   | Dedikerede brugere       |
| `legendary`     | Guld  | Øverste 1 %              |

### Kriterietyper

| Type           | Felt         | Beskrivelse                                            |
| -------------- | ------------ | ------------------------------------------------------ |
| `action_count` | `count`      | Udfør handlingen N gange (f.eks. 1000 anmodninger)     |
| `streak`       | `days`       | Oprethold en serie i N sammenhængende dage             |
| `unique_count` | `field`, `n` | Brug N unikke værdier (f.eks. 10 forskellige modeller) |
| `rank`         | `scope`, `n` | Opnå placering N på en rangliste inden for et omfang   |
| `first`        | —            | Vær den første til at udføre en handling               |
| `hidden`       | (varierer)   | Kriterier vises ikke, før de er opfyldt                |

Badge-definitioner gemmes i `badge_definitions` som JSON-`criteria`:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Evalueringsforløb

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # alle definitioner
    → getUserBadges(apiKeyId)         # allerede optjent (spring over)
    → for hvert badge, der ikke er optjent:
       → matchesCriteria(badge, event, userState)
       → hvis match: awardBadge(apiKeyId, badgeId)
         → returner notifikationsdata
```

Evalueringen er **hændelsesdrevet** — den kører efter hver gamification-hændelse, men
kontrollerer kun badges, hvis `criteria.type` stemmer overens med hændelsens handling. Dette
holder evalueringen hurtig (< 5 ms for de fleste hændelser).

### `matchesCriteria(badge, event, userState)`

| Kriterietype   | Kontrol                                                       |
| -------------- | ------------------------------------------------------------- |
| `action_count` | `getActionCount(apiKeyId, action) >= count`                   |
| `streak`       | `getCurrentStreak(apiKeyId) >= days`                          |
| `unique_count` | `getUniqueCount(apiKeyId, field) >= n`                        |
| `rank`         | `getRank(apiKeyId, scope) <= n`                               |
| `first`        | Ingen tidligere post i `xp_audit_log` for denne handlingstype |
| `hidden`       | Uddelegerer til den relevante underkontrol                    |

### Indbyggede badges (20+)

<details>
<summary>Komplet liste over badges</summary>

| Badge                  | Kategori        | Sjældenhed  | Kriterier                       |
| ---------------------- | --------------- | ----------- | ------------------------------- |
| Første skridt          | brug            | almindelig  | 1 anmodning                     |
| Godt i gang            | brug            | almindelig  | 100 anmodninger                 |
| Superbruger            | brug            | ualmindelig | 1.000 anmodninger               |
| Centurion              | brug            | sjælden     | 10.000 anmodninger              |
| OmniPower              | brug            | legendarisk | 100.000 anmodninger             |
| Udbydershopper         | bidrag          | almindelig  | Brug 5 forskellige udbydere     |
| Udbydermester          | bidrag          | ualmindelig | Brug 20 forskellige udbydere    |
| Kombinationarkitekt    | bidrag          | ualmindelig | Opret 5 kombinationer           |
| Kombinationsstormester | bidrag          | sjælden     | Opret 25 kombinationer          |
| Første deling          | deling          | almindelig  | 1 tokenoverførsel               |
| Gavmild                | deling          | ualmindelig | 10 tokenoverførsler             |
| Filantrop              | deling          | sjælden     | Overfør i alt 10.000 tokens     |
| Henviser               | deling          | almindelig  | 1 vellykket henvisning          |
| Netværksbygger         | deling          | ualmindelig | 10 vellykkede henvisninger      |
| Ugekriger              | aktivitetsrække | ualmindelig | Aktivitetsrække på 7 dage       |
| Månedligt engageret    | aktivitetsrække | sjælden     | Aktivitetsrække på 30 dage      |
| Ustoppelig             | aktivitetsrække | legendarisk | Aktivitetsrække på 365 dage     |
| Tidlig bruger          | sjælden         | legendarisk | Tilmeld dig i betaperioden      |
| Komprimeringspioner    | sjælden         | ualmindelig | Brug komprimering 100 gange     |
| Færdighedssamler       | sjælden         | sjælden     | Brug 10 forskellige færdigheder |
| Modeludforsker         | bidrag          | ualmindelig | Brug 15 forskellige modeller    |

</details>

---

## Streak-tracker

**Fil:** `src/lib/gamification/streaks.ts`

### Datamodel

Streaks gemmes i tabellen `key_value` (delt hjælpetabel) under
navneområdespecifikke nøgler:

| Nøgle                         | Værdi                            | Beskrivelse       |
| ----------------------------- | -------------------------------- | ----------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Aktive streakdata |

### Logik

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Læs streak-posten fra `key_value`.
2. Fortolk `{current}`, `{longest}`, `{lastDate}` (ISO-datostreng).
3. Hvis `lastDate === today` — ingen ændring (allerede registreret i dag).
4. Hvis `lastDate === yesterday` — øg `current`; opdater `longest` om nødvendigt.
5. Hvis `lastDate < yesterday` — nulstil `current = 1` (streaken blev brudt).
6. Skriv den opdaterede post.
7. Kontrollér milepæle: 7, 14, 30, 60, 90, 180, 365 dage. Hvis en milepæl passeres, sættes
   `milestone = true` (den kaldende kode tildeler XP og kontrollerer badges).

### Særtilfælde

- **Tidszone**: streaks bruger UTC-datoer (`new Date().toISOString().slice(0, 10)`).
  Dette er tilsigtet — én fælles kanonisk tidszone forhindrer manipulation via
  skift mellem tidszoner.
- **Nye brugere**: der findes ingen streak-post; den første anmodning opretter den med
  `current=1, longest=1, lastDate=today`.
- **Flere anmodninger pr. dag**: kun den første anmodning på UTC-dagen
  øger streaken.

---

## Rangliste

**Fil:** `src/lib/gamification/leaderboard.ts`

### Omfang

| Omfang          | Periode | Beskrivelse                                                        |
| --------------- | ------- | ------------------------------------------------------------------ |
| `global`        | `all`   | Samlet XP gennem tiden                                             |
| `weekly`        | `week`  | XP optjent i den aktuelle UTC-uge (man.-søn.)                      |
| `monthly`       | `month` | XP optjent i den aktuelle UTC-måned                                |
| `tokens_shared` | `all`   | Samlet antal tokens overført til andre                             |
| `contributions` | `all`   | Oprettede kombinationer + anvendte udbydere + anvendte færdigheder |

### Beregning af placering

Placeringer **beregnes ved læsning** og gemmes ikke. Det forhindrer forældede placeringsdata
og eliminerer behovet for periodiske jobs til genberegning af placeringer.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

Forespørgselsmønster:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### Perioderotation

Ugentlige og månedlige ranglister roterer automatisk:

1. **Arkivér**: Ved periodeskift kopieres de aktuelle poster til
   `leaderboard_archive` med periodeetiketten.
2. **Nulstil**: Slet posterne for den udløbne periode.
3. **Udløser**: Kontrolleres ved hvert kald til `updateLeaderboard()`; den første anmodning
   i en ny periode udløser rotationen.

Dette sikrer, at ugentlige ranglister nulstilles hver mandag kl. 00.00 UTC, og at månedlige ranglister
nulstilles den 1. i hver måned.

### SSE-opdateringer i realtid

**Slutpunkt:** `GET /api/gamification/stream`

```
Klient → GET /api/gamification/stream
  → SSE-forbindelse oprettet
  → Serveren sender øjeblikkeligt et øjebliksbillede af top-10-ranglisten
  → Hvert 5. sekund: send den opdaterede top-10, hvis den er ændret
  → Hvert 15. sekund: heartbeat-kommentar (": heartbeat\n\n")
  → Klienten afbryder forbindelsen → oprydning (fjern lytter)
```

Hændelsesformat:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

SSE-manageren holder styr på tilsluttede klienter pr. omfang og sender kun opdateringer,
når ranglistedataene faktisk er ændret siden sidste udsendelse.

---

## Deling af tokens

**Fil:** `src/lib/gamification/sharing.ts`

### Dobbelt bogføring

Hver overførsel opretter to rækker i `token_ledger`:

| Række  | `from_key_id` | `to_key_id` | `amount` |
| ------ | ------------- | ----------- | -------- |
| Debet  | afsender      | modtager    | +beløb   |
| Kredit | modtager      | afsender    | -beløb   |

Vent — konventionen er:

| Række  | `from_key_id` | `to_key_id` | `amount` | Betydning              |
| ------ | ------------- | ----------- | -------- | ---------------------- |
| Send   | afsender      | modtager    | +beløb   | Udgående fra afsender  |
| Modtag | modtager      | afsender    | +beløb   | Indgående til modtager |

Saldoen beregnes således:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Overførselsforløb

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Validér**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **Idempotens**: Kontrollér, om `idempotency_key` allerede findes i journalen.
   Hvis ja, returneres det cachelagrede resultat.
3. **Transaktion** (enkelt SQLite-transaktion):
   a. Beregn afsenderens saldo.
   b. Hvis `balance < amount`, afbrydes transaktionen (utilstrækkelige midler).
   c. Indsæt afsendelsesrækken (`from=sender,`.

### Hastighedsbegrænsning

- Maks. 10 overførsler pr. minut pr. API-nøgle.
- Maks. 10.000 tokens pr. enkelt overførsel.
- Maks. 100.000 overførte tokens pr. dag pr. API-nøgle.

---

## Invitations- og indløsningstokens

**Fil:** `src/lib/gamification/invites.ts`

### Kodeformat

- **Kode**: Alfanumerisk kode på 8 tegn (f.eks. `A3K9-X7M2`), læsevenlig og
  vist til brugeren.
- **Token**: Tilfældigt token på 32 byte, gemt som en SHA-256-hash. Bruges til
  programmatisk indløsning (f.eks. URL-links).

### Lagring

| Kolonne      | Værdi                         |
| ------------ | ----------------------------- |
| `code`       | `A3K9X7M2` (unik, indekseret) |
| `token_hash` | SHA-256(raw_token)            |

Det rå token returneres til brugeren præcis én gang på oprettelsestidspunktet. OmniRoute
gemmer eller viser det aldrig igen — kun hashen bevares.

### Forhindring af selvhenvisning

Når en bruger indløser en kode, kontrollerer systemet:

1. Koden tilhører et andet `api_key_id`.
2. Den indløsende bruger har ikke tidligere indløst nogen kode fra den samme
   henviser (join på `invite_tokens` + indløsningslog).

Hvis en af kontrollerne mislykkes, afvises indløsningen med en tydelig fejlmeddelelse.

### Udløb og grænser

- Standardværdi for `max_uses`: 10 (kan konfigureres ved oprettelse).
- Standardværdi for `expires_at`: 30 dage efter oprettelse.
- Udløbne eller opbrugte koder returnerer HTTP 410 Gone.

---

## Føderation af communityservere

**Fil:** `src/lib/gamification/servers.ts`

### Forbindelse

En communityserver registreres via et invitationstoken, der er udstedt af fjernserveren. Den lokale instans:

1. Modtager invitationstokenet (f.eks. indsat i kontrolpanelet).
2. Kalder `POST /api/gamification/federation/leaderboard` på fjernserveren for at validere tokenet og hente den aktuelle rangliste.
3. Gemmer serverposten med `status: connected`.

### Synkroniseringsmodel

Føderation bruger **overskrivningssynkronisering**, ikke additiv synkronisering:

```
Lokal instans                  Communityserver
     │                              │
     ├── send score ───────────────►│  POST /federation/score
     │   { api_key_id, score }      │  (serveren validerer token-hashen)
     │                              │
     ├── hent rangliste ───────────►│  GET /federation/leaderboard
     │◄── top-N-poster ─────────────┤  (overskriver lokal cache)
     │                              │
     └── tilstandskontrol ─────────►│  GET /federation/health
         (hvert 60. sek., timeout 5 sek.) │
```

### Godkendelse

Føderationsanmodninger inkluderer:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

Fjernserveren hasher tokenet og slår den matchende række i `community_servers` op. Dette undgår overførsel af den gemte hash.

### Tilstandsovervågning

Hver serverpost registrerer:

| Felt        | Beskrivelse                                           |
| ----------- | ----------------------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable`                |
| `last_sync` | ISO-tidsstempel for seneste vellykkede synkronisering |
| `failures`  | På hinanden følgende mislykkede tilstandskontroller   |

Efter 5 på hinanden følgende fejl ændres status til `unreachable`, og synkroniseringen sættes på pause, indtil en manuel tilstandskontrol lykkes.

---

## Beskyttelse mod snyd

**Fil:** `src/lib/gamification/antiCheat.ts`

### Scoring på serversiden

Alle XP-beregninger udføres i `src/lib/gamification/xp.ts`. Klienter indsender aldrig en score — de indsender handlinger, og serveren beregner XP. Kolonnen `leaderboard.score` kan kun skrives af kode på serversiden.

### Hastighedsbegrænsning

| Grænse                      | Værdi   | Omfang         |
| --------------------------- | ------- | -------------- |
| Maks. XP pr. minut          | 1,000   | Pr. API-nøgle  |
| Maks. overførsler pr. minut | 10      | Pr. API-nøgle  |
| Maks. overførselsbeløb      | 10,000  | Pr. overførsel |
| Maks. daglige overførsler   | 100,000 | Pr. API-nøgle  |

Hastighedsgrænser bruger et glidende vindue i hukommelsen (samme mønster som `RateLimitManager` i `open-sse/services/`). Hvis processen genstarter, bruges SQLite-baserede tællere som reserve.

### Registrering af anomalier med Z-score

For hver API-nøgle vedligeholder systemet et rullende 7-dages vindue over optjente XP pr. time. Ved hver XP-tildeling:

1. Beregn brugerens aktuelle XP-rate pr. time.
2. Beregn populationens gennemsnit og standardafvigelse.
3. Beregn `z = (user_rate - mean) / stddev`.
4. Hvis `z > 3.0` (3 standardafvigelser), markeres det som en anomali.

Anomalier logges i `xp_audit_log` med `action = 'anomaly_detected'` og vises i administratorkontrolpanelet.

### Revisionsspor

Hver XP-tildeling, overførsel, optjening af badge og registrering af anomali logges i `xp_audit_log` med:

| Felt         | Beskrivelse                                     |
| ------------ | ----------------------------------------------- |
| `api_key_id` | Hvem                                            |
| `action`     | Hvad der skete (xp_award, transfer, anomaly, …) |
| `xp_awarded` | Mængde (0 for hændelser uden XP)                |
| `metadata`   | JSON med kontekst (handlingstype, mål, …)       |
| `created_at` | Hvornår (ISO 8601)                              |

Administratorer kan forespørge på hele revisionssporet via `GET /api/gamification/anomalies`.

---

## API-ruter

Alle ruter følger OmniRoutes standardmønster:

```
Rute → CORS-preflight → Validering af body (Zod) → Godkendelse (extractApiKey)
  → Handler
```

### Endpoints

| Metode | Sti                                        | Beskrivelse                                    | Godkendelse   |
| ------ | ------------------------------------------ | ---------------------------------------------- | ------------- |
| GET    | `/api/gamification/leaderboard`            | Hent rangliste (omfang, periode, paginering)   | Valgfri       |
| POST   | `/api/gamification/leaderboard`            | Gennemtving opdatering af ranglistens cache    | Påkrævet      |
| GET    | `/api/gamification/stream`                 | SSE-opdateringer af ranglisten i realtid       | Valgfri       |
| GET    | `/api/gamification/transfer`               | Hent overførselshistorik (paginering)          | Påkrævet      |
| POST   | `/api/gamification/transfer`               | Send tokens til en anden bruger                | Påkrævet      |
| GET    | `/api/gamification/invite`                 | Vis mine invitationskoder                      | Påkrævet      |
| POST   | `/api/gamification/invite`                 | Generér en ny invitationskode                  | Påkrævet      |
| DELETE | `/api/gamification/invite`                 | Tilbagekald en invitationskode                 | Påkrævet      |
| POST   | `/api/gamification/invite/redeem`          | Indløs en invitationskode                      | Påkrævet      |
| GET    | `/api/gamification/servers`                | Vis community-servere                          | Påkrævet      |
| POST   | `/api/gamification/servers`                | Opret forbindelse til en community-server      | Påkrævet      |
| DELETE | `/api/gamification/servers`                | Afbryd forbindelsen til en community-server    | Påkrævet      |
| POST   | `/api/gamification/federation/score`       | Send score til en ekstern server               | Føderation    |
| GET    | `/api/gamification/federation/leaderboard` | Hent rangliste fra en ekstern server           | Føderation    |
| GET    | `/api/gamification/notifications`          | SSE-notifikationer om badges/niveauoprykninger | Påkrævet      |
| GET    | `/api/gamification/anomalies`              | Vis anomalirapporter (administrator)           | Administrator |
| POST   | `/api/gamification/rotate`                 | Rotér hemmeligheder til invitationstokens      | Påkrævet      |

### Eksempler på anmodninger/svar

**POST /api/gamification/transfer**

```json
// Anmodning
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

// Svar 400 (utilstrækkelige midler)
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

## MCP-værktøjer (8)

Registreret i `open-sse/mcp-server/` sammen med eksisterende værktøjer. Afgrænset under
rettighedsområdet `gamification`.

| Værktøj                    | Beskrivelse                                        | Inputskema                   |           |
| -------------------------- | -------------------------------------------------- | ---------------------------- | --------- |
| `gamification_leaderboard` | Hent rangliste for et område/en periode            | `{ scope, period?, limit? }` |
| `gamification_rank`        | Hent kalderens placering og nærmeste placeringer   | `{ scope }`                  |
| `gamification_profile`     | Hent oversigt over XP, niveau, titel og stime      | `{}`                         |
| `gamification_badges`      | Vis optjente badges eller alle definitioner        | `{ earned?: boolean }`       |
| `gamification_transfer`    | Send tokens til en anden bruger                    | `{ to, amount }`             |
| `gamification_invite`      | Generér eller vis invitationskoder                 | `{ action: "create"          | "list" }` |
| `gamification_servers`     | Vis eller opret forbindelse til fællesskabsservere | `{ action, token? }`         |
| `gamification_anomalies`   | Se anomalirapporter (administratorrettighed)       | `{ limit?, since? }`         |

---

## Dashboardsider

### `/dashboard/leaderboard`

- Podievisning (top 3 med avatarer og XP).
- Områdevælger: Global / Ugentlig / Månedlig / Delte tokens / Bidrag.
- Sideinddelt tabel (25 pr. side) med placering, navn, score, niveau og titel.
- SSE-opdateringer i realtid — ændringer i placering animeres.
- Den aktuelle bruger fremhæves i tabellen med en fastgjort række med teksten "Din placering".

### `/dashboard/profile`

- XP-statuslinje med aktuelt niveau og grænse for næste niveau.
- Titelbadge vises tydeligt.
- Badgegalleri — optjente badges med optjeningsdato, ikke-optjente badges nedtonet
  (skjulte badges viser "???" indtil de er optjent).
- Stimetæller med flammeikon; stimekalender (seneste 30 dage).
- Diagram over XP-historik (daglig XP i de seneste 30 dage).

### `/dashboard/tokens`

- Tokenbeholdning (fremtrædende øverst på siden).
- Overførselsformular: modtager, beløb, bekræftelsesdialog.
- Tabel over overførselshistorik med filtre (sendt/modtaget/alle).
- Invitationssektion: aktive koder, generér ny, del link.
- Fællesskabsservere: liste med driftstilstand, opret/afbryd forbindelse.

### `/dashboard/gamification/admin`

- Anomaliliste med alvorlighedsgrad, bruger, tidsstempel og z-score.
- Visning af revisionslog med filtre (handlingstype, bruger, datointerval).
- Systemstatistik: samlet tildelt XP, aktive brugere, optjeningsrater for badges.
- Oversigt over federationsserveres driftstilstand.

---

## Pipelineintegration

### Integrationspunkt

Gamification kobles på request-pipelinen ét enkelt sted i
`open-sse/handlers/chatCore.ts`:

```typescript
// Efter svaret er sendt til klienten:
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
    // Start og glem: Log, men videresend aldrig til klienten
  });
});
```

### Hændelsestyper

| Hændelsestype       | Hvornår den udsendes                           |
| ------------------- | ---------------------------------------------- |
| `request.completed` | Vellykket LLM-svar sendt                       |
| `provider.switch`   | Udbyder ændret (combo-fallbacks tæller med)    |
| `combo.created`     | Ny combo-konfiguration gemt                    |
| `combo.used`        | Combo-mål ramt                                 |
| `badge.earned`      | Badgeevaluering fandt et match                 |
| `streak.milestone`  | Grænseværdi for stime passeret                 |
| `transfer.sent`     | Tokenoverførsel gennemført                     |
| `referral.redeemed` | Invitationskode indløst                        |
| `compression.used`  | Promptkomprimering anvendt                     |
| `skill.executed`    | Udførelse af færdighed gennemført              |
| `model.first_use`   | Model ikke anvendt inden for de seneste 7 dage |

### Garanti for ikke-blokerende afvikling

Mønsteret `setImmediate` + `.catch(() => {})` sikrer:

1. Svaret sendes fuldt ud, før gamification kører.
2. Gamification-fejl vises aldrig for klienten.
3. Hændelsesbehandlingen kører i den næste mikrotask og ikke inline.

---

## Sikkerhed

### Trusselsmodel

| Trussel                         | Afhjælpning                                                               |
| ------------------------------- | ------------------------------------------------------------------------- |
| Kunstigt oppustede point        | XP beregnes kun på serversiden; klienter indsender handlinger, ikke point |
| Replay-angreb                   | Idempotensnøgler på overførsler; deduplikering af revisionslog            |
| Overførselsbedrageri            | Dobbelt bogholderi; atomare transaktioner; hastighedsbegrænsninger        |
| Selvhenvisning                  | Krydstjek af `api_key_id` ved indløsning                                  |
| Manipulation af rangliste       | Z-score-baseret anomalidetektion; administrationspanel for anomalier      |
| Tyveri af føderationstoken      | SHA-256-hashet lagring; råt token vises kun én gang                       |
| Brute force af invitationskoder | Hastighedsbegrænsning på indløsningsendepunktet; entropi på 8 tegn        |
| XSS i visningsnavne             | Visningsnavne renses; poster på ranglisten escapes                        |
| Timingangreb på hashes          | `crypto.timingSafeEqual` til sammenligning af token-hashes                |

### Godkendelseskrav

- **Offentlig** (ingen godkendelse): `GET /leaderboard`, `GET /stream`
  (skrivebeskyttede ranglister).
- **API-nøgle påkrævet**: alle skrivehandlinger, profil, overførsler og invitationer.
- **Kun administratorer**: administrationspanel for anomalier og visning af revisionslog.
- **Føderation**: separat godkendelsessti med råt token i `Authorization`-headeren,
  som valideres mod den gemte SHA-256-hash.

---

## Test

### Testfiler

Alle test bruger Node.js' indbyggede testkørsel (`node --import tsx/esm --test`).

| Testfil                                       | Dækker                                             | Test |
| --------------------------------------------- | -------------------------------------------------- | ---- |
| `tests/unit/gamification/xp.test.ts`          | XP-beregning, niveaukurve, titler                  | 8    |
| `tests/unit/gamification/badges.test.ts`      | Matchning af badgekriterier, tildeling             | 10   |
| `tests/unit/gamification/streaks.test.ts`     | Serie-logik, milepæle, grænsetilfælde              | 7    |
| `tests/unit/gamification/leaderboard.test.ts` | Beregning af placering, sideinddeling, rotation    | 8    |
| `tests/unit/gamification/sharing.test.ts`     | Overførsler, saldo, idempotens                     | 9    |
| `tests/unit/gamification/invites.test.ts`     | Oprettelse, indløsning, udløb, selvhenvisning      | 7    |
| `tests/unit/gamification/antiCheat.test.ts`   | Hastighedsbegrænsninger, z-score, revisionslogning | 6    |
| `tests/unit/gamification/events.test.ts`      | Udsendelse af hændelser, fan-out, fejlhåndtering   | 5    |

### Kørsel af test

```bash
# Alle gamification-test
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# En enkelt testfil
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Krav til testdækning

Ifølge `CONTRIBUTING.md` skal alle nye moduler have:

- Gren-dækning >= 80 %.
- Hver offentlig funktion testet mindst én gang.
- Fejlforløb testet (utilstrækkelig saldo, udløbne koder, hastighedsbegrænsninger).

---

## Filstruktur

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # Alle 8 tabeller + indekser
      gamification.ts                  # Domænemodul til CRUD
    gamification/
      xp.ts                           # XP-beregning, niveaukurve, titler
      badges.ts                       # Badgedefinitioner, kriterier, evaluering
      streaks.ts                      # Sporing af daglige aktivitetsserier
      leaderboard.ts                  # Rangberegning, SSE, rotation
      antiCheat.ts                    # Hastighedsbegrænsning, z-score, revision
      sharing.ts                      # Hovedbog for tokenoverførsler
      invites.ts                      # Invitations-/indløsningskoder
      servers.ts                      # Føderation af communityservere
      events.ts                       # Hændelsesudsender (integrationspunkt)
      notifications.ts                # SSE-notifikationsstrøm
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST-rangliste
        leaderboard/stream/route.ts   # SSE-opdateringer i realtid
        transfer/route.ts             # GET/POST-overførsler
        invite/route.ts               # GET/POST/DELETE-invitationskoder
        invite/redeem/route.ts        # POST-indløsningskode
        servers/route.ts              # GET/POST/DELETE-servere
        federation/score/route.ts     # POST-send score
        federation/leaderboard/route.ts # GET-hent rangliste
        notifications/route.ts        # SSE-notifikationer
        anomalies/route.ts            # GET-anomalirapporter
        rotate/route.ts               # POST-rotér hemmeligheder
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Ranglisteside
        profile/page.tsx               # Side med XP/badges/aktivitetsserier
        tokens/page.tsx                # Side med saldo/overførsler/invitationer
        gamification/admin/page.tsx    # Administratorovervågning af anomalier
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
    GAMIFICATION.md                    # Dette dokument
```

---

## Migreringsstrategi

### Fase 1: Backend-kerne (PR 1)

- Migrering `060_create_gamification.sql` (8 tabeller).
- `src/lib/db/gamification.ts` (domænemodul).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- Integrationspunkt i `chatCore.ts`.
- Enhedstests for XP, aktivitetsserier og hændelser.

### Fase 2: Badges og rangliste (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Badgedefinitioner i konstanter.
- API-ruter til ranglisten + SSE-strøm.
- Enhedstests for badges og ranglisten.

### Fase 3: Deling og invitationer (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- API-ruter til overførsler og invitationer.
- Enhedstests for deling, invitationer og snydebeskyttelse.

### Fase 4: Føderation og kontrolpanel (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- API-ruter til føderation.
- Kontrolpanelsider (rangliste, profil, tokens, administration).
- Registrering af MCP-værktøjer.

---

## Fremtidige overvejelser

- **Sæsonbestemte begivenheder**: tidsbegrænsede badgesæt og ranglistesæsoner.
- **Holdranglister**: gruppér brugere efter organisation eller kombination.
- **XP-multiplikatorer**: øg XP i kampagneperioder.
- **Deling af præstationer**: generér badgekort, der kan deles (OpenGraph-billeder).
- **Mobile push-notifikationer**: webhook-baserede notifikationer om badge-/niveaubegivenheder.
- **Rangliste-API**: offentligt API til tredjepartsintegrationer.
