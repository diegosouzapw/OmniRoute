# Gamification & Leaderboard System (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **Sannhetskilde:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Sist oppdatert:** 2026-06-28 — v3.8.40

OmniRoute inkluderer et lokal-først-gamifiseringslag som belønner brukere for
å engasjere seg i plattformen — ved å sende forespørsler, bytte leverandører,
opprette kombinasjoner, dele tokens og bidra til fellesskapet. All tilstand
lagres i SQLite; føderering med fellesskapsservere er valgfritt og push-basert.

Systemet er utformet for å ha **null forsinkelse i den kritiske flyten** —
gamifiseringshendelser sendes uten å vente på svar fra forespørselsflyten og
blokkerer aldri et LLM-svar.

---

## Oversikt

### Formål

Øke brukerengasjement og brukerlojalitet ved å tilby synlig fremgang (XP,
nivåer, merker), sosial bekreftelse (resultatlister) og økonomiske insentiver
(tokendeling, invitasjonsbelønninger).

### Omfang

| Funksjon                | Beskrivelse                                                                   |
| ----------------------- | ----------------------------------------------------------------------------- |
| XP og nivåer            | Tjen XP per handling; gå opp i nivå langs en polynomisk kurve                 |
| Merker                  | Over 20 prestasjoner fordelt på 5 kategorier med 4 sjeldenhetsnivåer          |
| Rekker                  | Daglig sporing av aktiv bruk med gjeldende og lengste rekke                   |
| Resultatlister          | Globale, ukentlige, månedlige, tokendelings- og bidragsbaserte omfang         |
| Tokendeling             | Overfør kreditter mellom brukere via et dobbelt bokføringsregister            |
| Invitasjon og innløsing | Henvisningskoder med SHA-256-hashet lagring                                   |
| Fellesskapsservere      | Føderer med eksterne OmniRoute-instanser                                      |
| Anti-juks               | Poengberegning på serversiden, frekvensbegrensning og z-score-avviksdeteksjon |

### Designprinsipper

1. **Lokal-først** — all tilstand lagres i SQLite, ingen eksterne tjenester er
   nødvendige.
2. **Ikke-blokkerende** — hendelser sendes uten å vente på svar; LLM-svarflyten
   forsinkes aldri av gamifiseringslogikk.
3. **Serverautoritativ** — XP beregnes kun på serversiden; klienter kan ikke
   blåse opp poengsummene.
4. **Personvernvennlig** — deltakelse på resultatlister er valgfritt; brukere kan
   skjule profilen sin.
5. **Klar for føderering** — fellesskapsservere kan sende poengsummer via et
   signert API; synkronisering overskriver og er ikke additiv.

---

## Arkitektur

### Overordnet flyt

```
Klientforespørsel
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (eksisterende flyt) ...
      → oppstrømssvar sendt til klienten
      → setImmediate (send og fortsett):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

Hendelsesutsenderen er det eneste integrasjonspunktet. `chatCore.ts` kaller
`emitGamificationEvent()` etter at svaret er sendt; hendelsesmodulen fordeler
videre til delsystemene for XP, rekker, merker, resultatlister og anti-juks.

### Modulavhengighetsgraf

```
src/lib/gamification/
  events.ts          ← inngangspunkt (kalles fra chatCore.ts)
    ├── xp.ts        ← XP-beregning og nivåfastsettelse
    ├── streaks.ts   ← sporing av daglige aktivitetsrekker
    ├── badges.ts    ← evaluering av merkekriterier
    ├── leaderboard.ts ← rangberegning og SSE-kringkasting
    ├── antiCheat.ts ← frekvensbegrensning og avviksdeteksjon
    ├── sharing.ts   ← register for tokenoverføringer
    ├── invites.ts   ← administrasjon av invitasjons-/innløsningskoder
    ├── servers.ts   ← føderering av fellesskapsservere
    └── notifications.ts ← SSE-varslingsstrøm

src/lib/db/
  gamification.ts    ← alle CRUD-operasjoner (8 tabeller)

src/app/api/gamification/
  leaderboard/       ← GET rangeringer, POST manuell oppdatering
  leaderboard/stream ← SSE-oppdateringer i sanntid
  transfer/          ← GET historikk, POST send tokens
  invite/            ← GET/POST koder, DELETE tilbakekall
  invite/redeem/     ← POST innløs en kode
  servers/           ← GET/POST/DELETE fellesskapsservere
  federation/score/  ← POST send poengsum til server
  federation/leaderboard/ ← GET hent resultatliste fra server
  notifications/     ← SSE-varsler om merker/nivåøkninger
  anomalies/         ← GET avviksrapporter (administrator)
  rotate/            ← POST roter hemmeligheter for invitasjonstokener
```

---

## Datalag

### Databasetabeller

Alle tabeller ligger i OmniRoutes primære SQLite-database, opprettet av migreringen
`060_create_gamification.sql`. WAL-loggføring arves fra singleton-instansen
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

### Domenemodul: `src/lib/db/gamification.ts`

Følger OmniRoutes standardmønster — importerer `getDbInstance()` fra
`core.ts` og eksporterer typede CRUD-funksjoner. Ingen rå SQL i rutehåndterere.

Nøkkelfunksjoner:

| Funksjon                   | Beskrivelse                                                         |
| -------------------------- | ------------------------------------------------------------------- |
| `upsertLeaderboardEntry()` | Sett inn eller oppdater poengsummen for (api_key_id, scope, period) |
| `getLeaderboard()`         | Sideinndelte rangeringer for et gitt omfang/en gitt periode         |
| `getUserLevel()`           | Hent eller opprett brukerens nivåoppføring                          |
| `updateUserLevel()`        | Angi XP, nivå og tittel atomisk                                     |
| `getBadgeDefinitions()`    | Alle merkedefinisjoner (eventuelt filtrert)                         |
| `getUserBadges()`          | Merker opptjent av en bruker                                        |
| `awardBadge()`             | Registrer opptjening av merke (idempotent for badge_id)             |
| `logXpAction()`            | Legg til i xp_audit_log                                             |
| `getXpAuditLog()`          | Sideinndelt revisjonshistorikk for en bruker                        |
| `insertLedgerEntry()`      | Dobbeltsidig overføring (i en transaksjon)                          |
| `getBalance()`             | Summen av mottatt minus sendt for en bruker                         |
| `getTransferHistory()`     | Sideinndelt overføringslogg                                         |
| `createInviteToken()`      | Sett inn invitasjonskode og hashet token                            |
| `redeemInviteToken()`      | Slå opp etter kode, valider og øk antall bruk                       |
| `upsertCommunityServer()`  | Registrer eller oppdater en føderasjonsserver                       |
| `getCommunityServers()`    | List opp servere for en bruker                                      |
| `deleteCommunityServer()`  | Fjern en serverregistrering                                         |

---

## XP-/nivåsystem

**Fil:** `src/lib/gamification/xp.ts`

### Nivåkurve

XP-mengden som kreves for å nå nivå `n`, følger en polynomisk kurve:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Nivå | XP til neste | Akkumulert XP | Tittel     |
| ---- | ------------ | ------------- | ---------- |
| 1    | 100          | 100           | Nybegynner |
| 5    | 1,118        | 2,415         | Nybegynner |
| 10   | 3,162        | 10,523        | Utforsker  |
| 25   | 12,500       | 86,024        | Utforsker  |
| 50   | 35,355       | 345,529       | Ekspert    |
| 75   | 64,952       | 948,683       | Mester     |
| 100  | 100,000      | 2,050,000     | Legende    |

### Titler

| Nivåområde | Tittel     |
| ---------- | ---------- |
| 1 – 9      | Nybegynner |
| 10 – 24    | Utforsker  |
| 25 – 49    | Ekspert    |
| 50 – 74    | Mester     |
| 75 – 100   | Legende    |

### XP-belønninger

| Handling          | XP  | Beskrivelse                                                 |
| ----------------- | --- | ----------------------------------------------------------- |
| `request`         | 1   | Per API-forespørsel rutet gjennom OmniRoute                 |
| `provider_switch` | 5   | Bytte til en annen leverandør                               |
| `model_switch`    | 3   | Bytte til en annen modell                                   |
| `combo_create`    | 10  | Opprette en ny kombinasjon                                  |
| `combo_use`       | 2   | Bruke en kombinasjon for en forespørsel                     |
| `token_share`     | 1   | Per 1 000 tokener delt med en annen bruker                  |
| `invite_redeem`   | 50  | Løse inn en invitasjonskode                                 |
| `daily_login`     | 5   | Daglig aktiv bruk (én gang per dag)                         |
| `streak_bonus`    | 2   | Per sammenhengende aktivitetsdag (multiplisert med lengden) |
| `badge_unlock`    | 10  | Låse opp et merke                                           |

### Tildelingsflyt

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. Slå opp `XP_REWARDS[action]` for å hente XP-mengden.
2. Send gjennom `checkRateLimit()` (beskyttelse mot juks: maks. 1000 XP/min per nøkkel).
3. Åpne en transaksjon:
   - Les gjeldende rad i `user_levels`.
   - Legg til XP, og beregn nivået på nytt via `levelFromXp(totalXp)`.
   - Hvis nivået er endret, sett `levelUp = true`.
   - Oppdater raden i `user_levels`.
   - Sett inn i `xp_audit_log`.
4. Returner resultatet. Kalleren håndterer varsler.

### Hjelpefunksjon: `levelFromXp(totalXp)`

Itererer gjennom nivå 1..100 og summerer `xp_for_level(n)` frem til akkumulert XP
overstiger `totalXp`. Returnerer det høyeste nivået der terskelen er nådd.
Dette er O(100) – akseptabelt siden nivåene er begrenset til 100.

---

## Merkesystem

**Fil:** `src/lib/gamification/badges.ts`

### Kategorier

| Kategori       | Beskrivelse                           | Eksempler på merker                       |
| -------------- | ------------------------------------- | ----------------------------------------- |
| `usage`        | Volumbaserte milepæler                | Første forespørsel, 1K forespørsler, 100K |
| `sharing`      | Tokendeling og verveprogrammer        | Første deling, Sjenerøs (10 delinger)     |
| `contribution` | Samfunnsengasjement                   | Kombinasjonsskaper, Leverandørutforsker   |
| `streak`       | Kontinuitet over tid                  | Ukekriger, Månedlig dedikert              |
| `rare`         | Vanskelige eller skjulte prestasjoner | Tidlig bruker, Feilrapporterer            |

### Sjeldenhetsgrader

| Sjeldenhetsgrad | Farge | Sannsynlighetsindikasjon |
| --------------- | ----- | ------------------------ |
| `common`        | Grå   | De fleste brukere        |
| `uncommon`      | Grønn | Aktive brukere           |
| `rare`          | Blå   | Dedikerte brukere        |
| `legendary`     | Gull  | Topp 1 %                 |

### Kriterietyper

| Type           | Felt         | Beskrivelse                                            |
| -------------- | ------------ | ------------------------------------------------------ |
| `action_count` | `count`      | Utfør en handling N ganger (f.eks. 1000 forespørsler)  |
| `streak`       | `days`       | Oppretthold aktivitet i N sammenhengende dager         |
| `unique_count` | `field`, `n` | Bruk N unike verdier (f.eks. 10 forskjellige modeller) |
| `rank`         | `scope`, `n` | Oppnå rangering N innenfor et ledertavleområde         |
| `first`        | —            | Vær den første til å utføre en handling                |
| `hidden`       | (varierer)   | Kriteriene vises ikke før merket er opptjent           |

Merkedefinisjoner lagres i `badge_definitions` som JSON-`criteria`:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Evalueringsflyt

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # alle definisjoner
    → getUserBadges(apiKeyId)         # allerede opptjent (hopp over)
    → for hvert merke som ikke er opptjent:
       → matchesCriteria(badge, event, userState)
       → ved treff: awardBadge(apiKeyId, badgeId)
         → returner varslingsdata
```

Evalueringen er **hendelsesdrevet** – den kjøres etter hver spillifiseringshendelse, men
kontrollerer bare merker der `criteria.type` samsvarer med hendelseshandlingen. Dette
sørger for rask evaluering (< 5 ms for de fleste hendelser).

### `matchesCriteria(badge, event, userState)`

| Kriterietype   | Kontroll                                                            |
| -------------- | ------------------------------------------------------------------- |
| `action_count` | `getActionCount(apiKeyId, action) >= count`                         |
| `streak`       | `getCurrentStreak(apiKeyId) >= days`                                |
| `unique_count` | `getUniqueCount(apiKeyId, field) >= n`                              |
| `rank`         | `getRank(apiKeyId, scope) <= n`                                     |
| `first`        | Ingen tidligere oppføring i `xp_audit_log` for denne handlingstypen |
| `hidden`       | Delegerer til den relevante underkontrollen                         |

### Innebygde merker (20+)

<details>
<summary>Fullstendig liste over merker</summary>

| Merke                  | Kategori | Sjeldenhet  | Kriterier                         |
| ---------------------- | -------- | ----------- | --------------------------------- |
| Første steg            | bruk     | vanlig      | 1 forespørsel                     |
| Kommer i gang          | bruk     | vanlig      | 100 forespørsler                  |
| Superbruker            | bruk     | uvanlig     | 1,000 forespørsler                |
| Centurion              | bruk     | sjelden     | 10,000 forespørsler               |
| OmniPower              | bruk     | legendarisk | 100,000 forespørsler              |
| Leverandørhopper       | bidrag   | vanlig      | Bruk 5 forskjellige leverandører  |
| Leverandørmester       | bidrag   | uvanlig     | Bruk 20 forskjellige leverandører |
| Kombinasjonsarkitekt   | bidrag   | uvanlig     | Opprett 5 kombinasjoner           |
| Kombinasjonsstormester | bidrag   | sjelden     | Opprett 25 kombinasjoner          |
| Første deling          | deling   | vanlig      | 1 tokenoverføring                 |
| Gavmild                | deling   | uvanlig     | 10 tokenoverføringer              |
| Filantrop              | deling   | sjelden     | Overfør totalt 10,000 tokens      |
| Verver                 | deling   | vanlig      | 1 vellykket verving               |
| Nettverksbygger        | deling   | uvanlig     | 10 vellykkede vervinger           |
| Ukeskriger             | rekke    | uvanlig     | 7-dagers rekke                    |
| Månedlig dedikert      | rekke    | sjelden     | 30-dagers rekke                   |
| Ustoppelig             | rekke    | legendarisk | 365-dagers rekke                  |
| Tidlig bruker          | sjelden  | legendarisk | Bli med i betaperioden            |
| Komprimeringspioner    | sjelden  | uvanlig     | Bruk komprimering 100 ganger      |
| Ferdighetssamler       | sjelden  | sjelden     | Bruk 10 forskjellige ferdigheter  |
| Modellutforsker        | bidrag   | uvanlig     | Bruk 15 forskjellige modeller     |

</details>

---

## Rekkesporing

**Fil:** `src/lib/gamification/streaks.ts`

### Datamodell

Rekker lagres i tabellen `key_value` (delt verktøytabell) under
navneromsbaserte nøkler:

| Nøkkel                        | Verdi                            | Beskrivelse          |
| ----------------------------- | -------------------------------- | -------------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Data for aktiv rekke |

### Logikk

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Les rekkeposten fra `key_value`.
2. Tolk `{current}`, `{longest}`, `{lastDate}` (ISO-datostreng).
3. Hvis `lastDate === today` — ingen endring (allerede registrert i dag).
4. Hvis `lastDate === yesterday` — øk `current`; oppdater `longest` ved behov.
5. Hvis `lastDate < yesterday` — tilbakestill `current = 1` (rekken er brutt).
6. Skriv den oppdaterte posten.
7. Kontroller milepæler: 7, 14, 30, 60, 90, 180, 365 dager. Hvis en milepæl passeres, sett
   `milestone = true` (kalleren tildeler XP og kontrollerer merker).

### Spesialtilfeller

- **Tidssone**: rekker bruker UTC-datoer (`new Date().toISOString().slice(0, 10)`).
  Dette er tilsiktet — én kanonisk tidssone forhindrer manipulering ved å
  bytte tidssone.
- **Nye brukere**: ingen rekkepost finnes; den første forespørselen oppretter den med
  `current=1, longest=1, lastDate=today`.
- **Flere forespørsler per dag**: bare den første forespørselen i UTC-døgnet
  øker rekken.

---

## Resultatliste

**Fil:** `src/lib/gamification/leaderboard.ts`

### Omfang

| Omfang          | Periode | Beskrivelse                                                      |
| --------------- | ------- | ---------------------------------------------------------------- |
| `global`        | `all`   | Samlet XP gjennom alle tider                                     |
| `weekly`        | `week`  | XP opptjent i inneværende UTC-uke (man.–søn.)                    |
| `monthly`       | `month` | XP opptjent i inneværende UTC-måned                              |
| `tokens_shared` | `all`   | Totalt antall tokener overført til andre                         |
| `contributions` | `all`   | Opprettede kombinasjoner + brukte tilbydere + brukte ferdigheter |

### Beregning av plassering

Plasseringer **beregnes ved lesing** og lagres ikke. Dette unngår utdaterte plasseringsdata
og eliminerer behovet for periodiske jobber som beregner plasseringer på nytt.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

Spørringsmønster:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### Perioderotasjon

Ukentlige og månedlige resultatlister roteres automatisk:

1. **Arkivering**: ved periodeslutt kopieres gjeldende oppføringer til
   `leaderboard_archive` med periodeetiketten.
2. **Tilbakestilling**: slett oppføringer for den utløpte perioden.
3. **Utløser**: kontrolleres ved hvert kall til `updateLeaderboard()`; den første forespørselen
   i en ny periode utløser rotasjonen.

Dette sikrer at ukentlige resultatlister tilbakestilles hver mandag kl. 00:00 UTC, og at månedlige resultatlister
tilbakestilles den 1. i hver måned.

### SSE-oppdateringer i sanntid

**Endepunkt:** `GET /api/gamification/stream`

```
Klient → GET /api/gamification/stream
  → SSE-forbindelse opprettes
  → Serveren sender umiddelbart et øyeblikksbilde av de 10 beste på resultatlisten
  → Hvert 5. sekund: send oppdaterte topp 10 hvis de er endret
  → Hvert 15. sekund: livstegnkommentar (": heartbeat\n\n")
  → Klienten kobler fra → opprydding (fjern lytter)
```

Hendelsesformat:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

SSE-behandleren sporer tilkoblede klienter per omfang og sender bare oppdateringer
når resultatlistedataene faktisk er endret siden forrige utsending.

---

## Tokendeling

**Fil:** `src/lib/gamification/sharing.ts`

### Dobbelt bokføring

Hver overføring oppretter to rader i `token_ledger`:

| Rad    | `from_key_id` | `to_key_id` | `amount` |
| ------ | ------------- | ----------- | -------- |
| Debet  | avsender      | mottaker    | +amount  |
| Kredit | mottaker      | avsender    | -amount  |

Vent — konvensjonen er:

| Rad     | `from_key_id` | `to_key_id` | `amount` | Betydning              |
| ------- | ------------- | ----------- | -------- | ---------------------- |
| Sending | avsender      | mottaker    | +amount  | Utgående fra avsender  |
| Mottak  | mottaker      | avsender    | +amount  | Inngående til mottaker |

Saldoen beregnes slik:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Overføringsflyt

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Validering**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **Idempotens**: kontroller om `idempotency_key` allerede finnes i hovedboken.
   Hvis ja, returner det bufrede resultatet.
3. **Transaksjon** (én enkelt SQLite-transaksjon):
   a. Beregn avsenderens saldo.
   b. Hvis `balance < amount`, avbryt (utilstrekkelige midler).
   c. Sett inn senderaden (`from=sender,`.

### Hastighetsbegrensning

- Maks. 10 overføringer per minutt per API-nøkkel.
- Maks. 10 000 tokens per enkelt overføring.
- Maks. 100 000 tokens overført per dag per API-nøkkel.

---

## Invitasjons- og innløsningstokens

**Fil:** `src/lib/gamification/invites.ts`

### Kodeformat

- **Kode**: 8-tegns alfanumerisk kode (f.eks. `A3K9-X7M2`), lesbar for mennesker,
  som vises til brukeren.
- **Token**: tilfeldig token på 32 byte, lagret som SHA-256-hash. Brukes til
  programmatisk innløsning (f.eks. URL-lenker).

### Lagring

| Kolonne      | Verdi                        |
| ------------ | ---------------------------- |
| `code`       | `A3K9X7M2` (unik, indeksert) |
| `token_hash` | SHA-256(raw_token)           |

Det rå tokenet returneres til brukeren nøyaktig én gang ved opprettelse. OmniRoute
lagrer eller viser det aldri igjen — bare hashen beholdes.

### Forhindring av selvhenvisning

Når en bruker løser inn en kode, kontrollerer systemet følgende:

1. Koden tilhører en annen `api_key_id`.
2. Brukeren som løser inn koden, har ikke tidligere løst inn noen kode fra samme
   henviser (kobling på `invite_tokens` + innløsningslogg).

Hvis én av kontrollene mislykkes, avvises innløsningen med en tydelig feilmelding.

### Utløp og grenser

- Standardverdi for `max_uses`: 10 (kan konfigureres ved opprettelse).
- Standardverdi for `expires_at`: 30 dager etter opprettelse.
- Utløpte eller oppbrukte koder returnerer HTTP 410 Gone.

---

## Føderasjon av fellesskapsservere

**Fil:** `src/lib/gamification/servers.ts`

### Tilkobling

En fellesskapsserver registreres via et invitasjonstoken utstedt av den eksterne
serveren. Den lokale instansen:

1. Mottar invitasjonstokenet (f.eks. limt inn i kontrollpanelet).
2. Kaller `POST /api/gamification/federation/leaderboard` på den eksterne serveren
   for å validere tokenet og hente den gjeldende resultatlisten.
3. Lagrer serveroppføringen med `status: connected`.

### Synkroniseringsmodell

Føderasjonen bruker **overskrivende synkronisering**, ikke additiv synkronisering:

```
Lokal instans                  Fellesskapsserver
     │                              │
     ├── send poengsum ────────────►│  POST /federation/score
     │   { api_key_id, score }      │  (serveren validerer token-hashen)
     │                              │
     ├── hent resultatliste ───────►│  GET /federation/leaderboard
     │◄── topp-N-oppføringer ───────┤  (overskriver lokal hurtigbuffer)
     │                              │
     └── tilstandskontroll ────────►│  GET /federation/health
         (hvert 60. sekund,         │
          tidsavbrudd etter 5 s)    │
```

### Autentisering

Føderasjonsforespørsler inkluderer:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

Den eksterne serveren hasher tokenet og slår opp den samsvarende raden i
`community_servers`. Dette unngår overføring av den lagrede hashen.

### Tilstandsovervåking

Hver serveroppføring sporer:

| Felt        | Beskrivelse                                         |
| ----------- | --------------------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable`              |
| `last_sync` | ISO-tidsstempel for siste vellykkede synkronisering |
| `failures`  | Påfølgende mislykkede tilstandskontroller           |

Etter 5 påfølgende feil endres statusen til `unreachable`, og synkroniseringen
settes på pause til en manuell tilstandskontroll lykkes.

---

## Beskyttelse mot juks

**Fil:** `src/lib/gamification/antiCheat.ts`

### Poengberegning på serversiden

Alle XP-beregninger utføres i `src/lib/gamification/xp.ts`. Klienter sender aldri
inn en poengsum – de sender inn handlinger, og serveren beregner XP. Kolonnen
`leaderboard.score` kan bare skrives til av kode på serversiden.

### Hastighetsbegrensning

| Grense                        | Verdi   | Omfang         |
| ----------------------------- | ------- | -------------- |
| Maks. XP per minutt           | 1,000   | Per API-nøkkel |
| Maks. overføringer per minutt | 10      | Per API-nøkkel |
| Maks. overføringsbeløp        | 10,000  | Per overføring |
| Maks. daglige overføringer    | 100,000 | Per API-nøkkel |

Hastighetsgrensene bruker et glidende vindu i minnet (samme mønster som
`RateLimitManager` i `open-sse/services/`). Ved omstart av prosessen brukes
SQLite-baserte tellere som reserveløsning.

### Z-skårbasert avviksdeteksjon

For hver API-nøkkel opprettholder systemet et rullerende 7-dagersvindu med XP
opptjent per time. Ved hver XP-tildeling:

1. Beregn brukerens gjeldende XP-rate per time.
2. Beregn populasjonens gjennomsnitt og standardavvik.
3. Beregn `z = (user_rate - mean) / stddev`.
4. Hvis `z > 3.0` (3 standardavvik), marker det som et avvik.

Avvik logges i `xp_audit_log` med `action = 'anomaly_detected'`
og vises i administrasjonskontrollpanelet.

### Revisjonsspor

Hver XP-tildeling, overføring, opptjening av merke og avviksdeteksjon logges i
`xp_audit_log` med:

| Felt         | Beskrivelse                                      |
| ------------ | ------------------------------------------------ |
| `api_key_id` | Hvem                                             |
| `action`     | Hva som skjedde (xp_award, transfer, anomaly, …) |
| `xp_awarded` | Beløp (0 for hendelser som ikke gjelder XP)      |
| `metadata`   | JSON med kontekst (handlingstype, mål, …)        |
| `created_at` | Når (ISO 8601)                                   |

Administratorer kan spørre etter hele revisjonssporet via `GET /api/gamification/anomalies`.

---

## API-ruter

Alle ruter følger standardmønsteret for OmniRoute:

```
Rute → CORS-preflight → Validering av forespørselskropp (Zod) → Autentisering (extractApiKey)
  → Håndterer
```

### Endepunkter

| Metode | Bane                                       | Beskrivelse                                      | Autentisering |
| ------ | ------------------------------------------ | ------------------------------------------------ | ------------- |
| GET    | `/api/gamification/leaderboard`            | Hent resultatliste (omfang, periode, paginering) | Valgfri       |
| POST   | `/api/gamification/leaderboard`            | Tving oppdatering av resultatlistebufferen       | Påkrevd       |
| GET    | `/api/gamification/stream`                 | SSE-oppdateringer av resultatlisten i sanntid    | Valgfri       |
| GET    | `/api/gamification/transfer`               | Hent overføringshistorikk (paginering)           | Påkrevd       |
| POST   | `/api/gamification/transfer`               | Send tokens til en annen bruker                  | Påkrevd       |
| GET    | `/api/gamification/invite`                 | Vis mine invitasjonskoder                        | Påkrevd       |
| POST   | `/api/gamification/invite`                 | Generer en ny invitasjonskode                    | Påkrevd       |
| DELETE | `/api/gamification/invite`                 | Tilbakekall en invitasjonskode                   | Påkrevd       |
| POST   | `/api/gamification/invite/redeem`          | Løs inn en invitasjonskode                       | Påkrevd       |
| GET    | `/api/gamification/servers`                | Vis fellesskapsservere                           | Påkrevd       |
| POST   | `/api/gamification/servers`                | Koble til en fellesskapsserver                   | Påkrevd       |
| DELETE | `/api/gamification/servers`                | Koble fra en fellesskapsserver                   | Påkrevd       |
| POST   | `/api/gamification/federation/score`       | Send poengsum til ekstern server                 | Føderasjon    |
| GET    | `/api/gamification/federation/leaderboard` | Hent resultatliste fra ekstern server            | Føderasjon    |
| GET    | `/api/gamification/notifications`          | SSE-varsler om merker/nivåøkning                 | Påkrevd       |
| GET    | `/api/gamification/anomalies`              | Vis avviksrapporter (administrator)              | Administrator |
| POST   | `/api/gamification/rotate`                 | Roter hemmeligheter for invitasjonstokens        | Påkrevd       |

### Eksempler på forespørsler/svar

**POST /api/gamification/transfer**

```json
// Forespørsel
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

// Svar 400 (utilstrekkelig saldo)
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

## MCP-verktøy (8)

Registrert i `open-sse/mcp-server/` sammen med eksisterende verktøy. Avgrenset til
tilgangsområdet `gamification`.

| Verktøy                    | Beskrivelse                                  | Inndataskjema                |           |
| -------------------------- | -------------------------------------------- | ---------------------------- | --------- |
| `gamification_leaderboard` | Hent poengtavlen for et område/en periode    | `{ scope, period?, limit? }` |
| `gamification_rank`        | Hent innringerens rangering og naboer        | `{ scope }`                  |
| `gamification_profile`     | Hent sammendrag av XP, nivå, tittel og rekke | `{}`                         |
| `gamification_badges`      | Vis opptjente merker eller alle definisjoner | `{ earned?: boolean }`       |
| `gamification_transfer`    | Send tokener til en annen bruker             | `{ to, amount }`             |
| `gamification_invite`      | Generer eller vis invitasjonskoder           | `{ action: "create"          | "list" }` |
| `gamification_servers`     | Vis eller koble til fellesskapsservere       | `{ action, token? }`         |
| `gamification_anomalies`   | Vis avviksrapporter (administratortilgang)   | `{ limit?, since? }`         |

---

## Dashbordsider

### `/dashboard/leaderboard`

- Pallvisning (de tre beste med avatarer og XP).
- Områdevelger: Globalt / Ukentlig / Månedlig / Delte tokener / Bidrag.
- Paginert tabell (25 per side) med rangering, navn, poengsum, nivå og tittel.
- SSE-oppdateringer i sanntid — rangeringsendringer animeres.
- Gjeldende bruker fremheves i tabellen med en festet «Din rangering»-rad.

### `/dashboard/profile`

- XP-fremdriftslinje med gjeldende nivå og terskelen for neste nivå.
- Tittelmerket vises fremtredende.
- Merkegalleri — opptjente merker med opptjeningsdato, merker som ikke er opptjent, vises nedtonet
  (skjulte merker viser «???» frem til de er opptjent).
- Rekketeller med flammeikon; rekkekalender (de siste 30 dagene).
- Diagram over XP-historikk (daglig XP de siste 30 dagene).

### `/dashboard/tokens`

- Tokenbeholdning (fremtredende, øverst på siden).
- Overføringsskjema: mottaker, beløp og bekreftelsesdialog.
- Tabell over overføringshistorikk med filtre (sendt/mottatt/alle).
- Invitasjonsdel: aktive koder, generer nye, del lenke.
- Fellesskapsservere: liste med helsestatus, koble til/fra.

### `/dashboard/gamification/admin`

- Avviksliste med alvorlighetsgrad, bruker, tidsstempel og z-verdi.
- Visning av revisjonslogg med filtre (handlingstype, bruker, datointervall).
- Systemstatistikk: samlet tildelt XP, aktive brukere og opptjeningsfrekvens for merker.
- Oversikt over helsetilstanden til fødererte servere.

---

## Pipeline-integrasjon

### Integrasjonspunkt

Gamification kobles inn i forespørselspipelinen på ett enkelt punkt i
`open-sse/handlers/chatCore.ts`:

```typescript
// Etter at svaret er sendt til klienten:
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
    // Start og glem: logg, men videresend aldri til klienten
  });
});
```

### Hendelsestyper

| Hendelsestype       | Når den utløses                                   |
| ------------------- | ------------------------------------------------- |
| `request.completed` | Vellykket LLM-svar sendt                          |
| `provider.switch`   | Leverandør endret (combo-reserveløsninger telles) |
| `combo.created`     | Ny combo-konfigurasjon lagret                     |
| `combo.used`        | Combo-mål nådd                                    |
| `badge.earned`      | Merkeevaluering fant et treff                     |
| `streak.milestone`  | Terskel for rekke passert                         |
| `transfer.sent`     | Tokenoverføring fullført                          |
| `referral.redeemed` | Invitasjonskode innløst                           |
| `compression.used`  | Ledetekstkomprimering brukt                       |
| `skill.executed`    | Ferdighetskjøring fullført                        |
| `model.first_use`   | Modellen har ikke vært brukt de siste 7 dagene    |

### Garanti om ikke-blokkerende kjøring

Mønsteret `setImmediate` + `.catch(() => {})` sikrer følgende:

1. Svaret er fullstendig sendt før gamification kjører.
2. Gamification-feil vises aldri for klienten.
3. Hendelsesbehandlingen kjører i neste mikrooppgave, ikke direkte i samme kjøring.

---

## Sikkerhet

### Trusselmodell

| Trussel                         | Mottiltak                                                                  |
| ------------------------------- | -------------------------------------------------------------------------- |
| Kunstig økning av poengsum      | XP beregnes kun på serversiden; klienter sender inn handlinger, ikke poeng |
| Repetisjonsangrep               | Idempotensnøkler ved overføringer; deduplisering av revisjonslogg          |
| Overføringssvindel              | Dobbelt bokholderi; atomiske transaksjoner; hastighetsbegrensninger        |
| Selvhenvisning                  | Kryssjekk `api_key_id` ved innløsning                                      |
| Manipulering av resultatliste   | Avviksdeteksjon med z-skår; administrasjonspanel for avvik                 |
| Tyveri av fødereringstoken      | Lagring med SHA-256-hash; råtokenet vises kun én gang                      |
| Brute force av invitasjonskoder | Hastighetsbegrensning på innløsningsendepunktet; entropi på 8 tegn         |
| XSS i visningsnavn              | Visningsnavn renses; oppføringer på resultatlisten escapes                 |
| Tidsangrep mot hasher           | `crypto.timingSafeEqual` for sammenligning av tokenhasher                  |

### Autentiseringskrav

- **Offentlig** (ingen autentisering): `GET /leaderboard`, `GET /stream` (skrivebeskyttede
  resultatlister).
- **API-nøkkel kreves**: alle skriveoperasjoner, profil, overføringer og invitasjoner.
- **Kun administrator**: avvikspanel, visning av revisjonslogg.
- **Føderering**: separat autentiseringsflyt som bruker råtoken i `Authorization`-
  headeren, validert mot lagret SHA-256-hash.

---

## Testing

### Testfiler

Alle tester bruker den innebygde testkjøreren i Node.js (`node --import tsx/esm --test`).

| Testfil                                       | Dekker                                         | Tester |
| --------------------------------------------- | ---------------------------------------------- | ------ |
| `tests/unit/gamification/xp.test.ts`          | XP-beregning, nivåkurve, titler                | 8      |
| `tests/unit/gamification/badges.test.ts`      | Samsvar med merkekriterier, tildeling          | 10     |
| `tests/unit/gamification/streaks.test.ts`     | Logikk for rekker, milepæler, grensetilfeller  | 7      |
| `tests/unit/gamification/leaderboard.test.ts` | Rangeringsberegning, paginering, rotasjon      | 8      |
| `tests/unit/gamification/sharing.test.ts`     | Overføringer, saldo, idempotens                | 9      |
| `tests/unit/gamification/invites.test.ts`     | Opprettelse, innløsning, utløp, selvhenvisning | 7      |
| `tests/unit/gamification/antiCheat.test.ts`   | Hastighetsgrenser, z-skår, revisjonslogging    | 6      |
| `tests/unit/gamification/events.test.ts`      | Hendelsesutsending, fan-out, feilhåndtering    | 5      |

### Kjøre tester

```bash
# Alle gamification-tester
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# Én testfil
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Krav til testdekning

I henhold til `CONTRIBUTING.md` må alle nye moduler ha:

- Gren-dekning >= 80 %.
- Hver offentlig funksjon testet minst én gang.
- Feilforløp testet (utilstrekkelig saldo, utløpte koder, hastighetsgrenser).

---

## Filstruktur

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # Alle 8 tabeller + indekser
      gamification.ts                  # CRUD-modul for domenet
    gamification/
      xp.ts                           # XP-beregning, nivåkurve, titler
      badges.ts                       # Merkedefinisjoner, kriterier, evaluering
      streaks.ts                      # Sporing av daglige aktivitetsrekker
      leaderboard.ts                  # Beregning av rangering, SSE, rotasjon
      antiCheat.ts                    # Hastighetsbegrensning, z-verdi, revisjon
      sharing.ts                      # Hovedbok for overføring av tokens
      invites.ts                      # Invitasjons-/innløsningskoder
      servers.ts                      # Føderasjon av fellesskapsservere
      events.ts                       # Hendelsesgenerator (integrasjonspunkt)
      notifications.ts                # SSE-strøm for varsler
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST-rangering
        leaderboard/stream/route.ts   # SSE-oppdateringer i sanntid
        transfer/route.ts             # GET/POST-overføringer
        invite/route.ts               # GET/POST/DELETE-invitasjonskoder
        invite/redeem/route.ts        # POST-innløsningskode
        servers/route.ts              # GET/POST/DELETE-servere
        federation/score/route.ts     # POST-send poengsum
        federation/leaderboard/route.ts # GET-hent rangering
        notifications/route.ts        # SSE-varsler
        anomalies/route.ts            # GET-avviksrapporter
        rotate/route.ts               # POST-roter hemmeligheter
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Rangeringsside
        profile/page.tsx               # Side for XP/merker/aktivitetsrekker
        tokens/page.tsx                # Side for saldo/overføringer/invitasjoner
        gamification/admin/page.tsx    # Administratorovervåking av avvik
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
    GAMIFICATION.md                    # Dette dokumentet
```

---

## Migreringsstrategi

### Fase 1: Backend-kjerne (PR 1)

- Migrering `060_create_gamification.sql` (8 tabeller).
- `src/lib/db/gamification.ts` (domenemodul).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- Integrasjonspunkt i `chatCore.ts`.
- Enhetstester for XP, aktivitetsrekker og hendelser.

### Fase 2: Merker og rangering (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Merkedefinisjoner i konstanter.
- API-ruter for rangering + SSE-strøm.
- Enhetstester for merker og rangering.

### Fase 3: Deling og invitasjoner (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- API-ruter for overføringer og invitasjoner.
- Enhetstester for deling, invitasjoner og jukseforebygging.

### Fase 4: Føderasjon og kontrollpanel (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- API-ruter for føderasjon.
- Kontrollpanelsider (rangering, profil, tokens, administrasjon).
- Registrering av MCP-verktøy.

---

## Fremtidige vurderinger

- **Sesongbaserte arrangementer**: tidsbegrensede merkepakker og ledertavlesesonger.
- **Lagbaserte ledertavler**: grupper brukere etter organisasjon eller kombinasjon.
- **XP-multiplikatorer**: øk XP i kampanjeperioder.
- **Deling av prestasjoner**: generer delbare merkekort (OpenGraph-bilder).
- **Mobilvarsler**: webhook-baserte varsler for merke-/nivåhendelser.
- **Ledertavle-API**: offentlig API for tredjepartsintegrasjoner.
