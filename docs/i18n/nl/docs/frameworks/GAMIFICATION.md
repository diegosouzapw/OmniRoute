# Gamification & Leaderboard System (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **Bron van waarheid:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Laatst bijgewerkt:** 2026-06-28 — v3.8.40

OmniRoute bevat een local-first-gamificatielaag die gebruikers beloont voor
interactie met het platform — door aanvragen te doen, van provider te wisselen,
combo's te maken, tokens te delen en bij te dragen aan de community. Alle status
wordt opgeslagen in SQLite; federatie met communityservers is optioneel en
gebaseerd op push.

Het systeem is ontworpen voor **nul latentie in het kritieke pad** —
gamificatiegebeurtenissen worden fire-and-forget vanuit de aanvraagpijplijn
verzonden en blokkeren nooit een LLM-respons.

---

## Overzicht

### Doel

De betrokkenheid en retentie van gebruikers vergroten door zichtbare voortgang
(XP, niveaus, badges), sociale bewijskracht (klassementen) en economische
prikkels (tokens delen, uitnodigingsbeloningen) te bieden.

### Reikwijdte

| Functie                  | Beschrijving                                                                  |
| ------------------------ | ----------------------------------------------------------------------------- |
| XP en niveaus            | Verdien XP per actie; stijg in niveau volgens een polynomiale curve           |
| Badges                   | Meer dan 20 prestaties in 5 categorieën met 4 zeldzaamheidsniveaus            |
| Reeksen                  | Dagelijkse activiteit bijhouden met huidige/langste reeks                     |
| Klassementen             | Globale, wekelijkse, maandelijkse, tokendeel- en bijdragescopes               |
| Tokens delen             | Draag tegoeden over tussen gebruikers via een dubbel boekhoudkundig grootboek |
| Uitnodigen en inwisselen | Verwijzingscodes met via SHA-256 gehashte opslag                              |
| Communityservers         | Federeer met externe OmniRoute-instanties                                     |
| Anticheat                | Scores aan serverzijde, snelheidsbeperking en anomaliedetectie met z-scores   |

### Ontwerpprincipes

1. **Local-first** — alle status wordt opgeslagen in SQLite; er zijn geen
   externe diensten vereist.
2. **Niet-blokkerend** — gebeurtenissen zijn fire-and-forget; het responspad
   van de LLM wordt nooit vertraagd door gamificatielogica.
3. **Serverautoritair** — XP wordt uitsluitend aan serverzijde berekend;
   clients kunnen scores niet kunstmatig verhogen.
4. **Privacyvriendelijk** — deelname aan klassementen is optioneel; gebruikers
   kunnen hun profiel verbergen.
5. **Klaar voor federatie** — communityservers kunnen scores via een
   ondertekende API pushen; synchronisatie overschrijft en is niet additief.

---

## Architectuur

### Globale stroom

```
Clientaanvraag
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (bestaande pijplijn) ...
      → upstream-respons verzonden naar client
      → setImmediate (fire-and-forget):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

De event-emitter is het enige integratiepunt. `chatCore.ts` roept
`emitGamificationEvent()` aan nadat de respons is verzonden; de
gebeurtenismodule distribueert deze vervolgens naar de subsystemen voor XP,
reeksen, badges, klassementen en anticheat.

### Moduleafhankelijkheidsgrafiek

```
src/lib/gamification/
  events.ts          ← toegangspunt (aangeroepen vanuit chatCore.ts)
    ├── xp.ts        ← XP-berekening en niveaubepaling
    ├── streaks.ts   ← dagelijkse actieve reeksen bijhouden
    ├── badges.ts    ← evaluatie van badgecriteria
    ├── leaderboard.ts ← rangberekening en SSE-uitzendingen
    ├── antiCheat.ts ← snelheidsbeperking en anomaliedetectie
    ├── sharing.ts   ← grootboek voor tokenoverdrachten
    ├── invites.ts   ← beheer van uitnodigings- en inwisselcodes
    ├── servers.ts   ← federatie van communityservers
    └── notifications.ts ← SSE-meldingenstroom

src/lib/db/
  gamification.ts    ← alle CRUD-bewerkingen (8 tabellen)

src/app/api/gamification/
  leaderboard/       ← GET-klassementen, POST voor handmatig vernieuwen
  leaderboard/stream ← realtime-updates via SSE
  transfer/          ← GET-geschiedenis, POST om tokens te verzenden
  invite/            ← GET/POST-codes, DELETE om in te trekken
  invite/redeem/     ← POST om een code in te wisselen
  servers/           ← GET/POST/DELETE-communityservers
  federation/score/  ← POST om score naar server te pushen
  federation/leaderboard/ ← GET om klassement van server op te halen
  notifications/     ← SSE-meldingen voor badges/niveaustijgingen
  anomalies/         ← GET-anomalierapporten (beheerder)
  rotate/            ← POST om geheimen van uitnodigingstokens te roteren
```

---

## Gegevenslaag

### Databasetabellen

Alle tabellen bevinden zich in de centrale OmniRoute SQLite-database, aangemaakt door migratie
`060_create_gamification.sql`. WAL-journaling wordt overgenomen van de singleton
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

### Domeinmodule: `src/lib/db/gamification.ts`

Volgt het standaard OmniRoute-patroon — importeert `getDbInstance()` uit
`core.ts` en exporteert getypeerde CRUD-functies. Geen onbewerkte SQL in routehandlers.

Belangrijkste functies:

| Functie                    | Beschrijving                                                    |
| -------------------------- | --------------------------------------------------------------- |
| `upsertLeaderboardEntry()` | Score invoegen of bijwerken voor (api_key_id, scope, period)    |
| `getLeaderboard()`         | Gepagineerde ranglijst voor een bepaald bereik/periode          |
| `getUserLevel()`           | Gebruikersniveaurecord ophalen of aanmaken                      |
| `updateUserLevel()`        | XP, niveau en titel atomair instellen                           |
| `getBadgeDefinitions()`    | Alle badge-definities (optioneel gefilterd)                     |
| `getUserBadges()`          | Door een gebruiker verdiende badges                             |
| `awardBadge()`             | Behaalde badge invoegen (idempotent op badge_id)                |
| `logXpAction()`            | Toevoegen aan xp_audit_log                                      |
| `getXpAuditLog()`          | Gepagineerde auditgeschiedenis voor een gebruiker               |
| `insertLedgerEntry()`      | Dubbel geboekte overdracht (binnen een transactie)              |
| `getBalance()`             | Som van ontvangen minus verzonden voor een gebruiker            |
| `getTransferHistory()`     | Gepagineerd overdrachtslogboek                                  |
| `createInviteToken()`      | Uitnodigingscode en gehashte token invoegen                     |
| `redeemInviteToken()`      | Opzoeken op code, valideren en aantal gebruiksmomenten verhogen |
| `upsertCommunityServer()`  | Een federatieserver registreren of bijwerken                    |
| `getCommunityServers()`    | Servers voor een gebruiker weergeven                            |
| `deleteCommunityServer()`  | Een serverregistratie verwijderen                               |

---

## XP-/levelsysteem

**Bestand:** `src/lib/gamification/xp.ts`

### Levelcurve

De XP die nodig is om level `n` te bereiken, volgt een polynomiale curve:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Level | XP tot volgende | Cumulatieve XP | Titel               |
| ----- | --------------- | -------------- | ------------------- |
| 1     | 100             | 100            | Beginner            |
| 5     | 1,118           | 2,415          | Beginner            |
| 10    | 3,162           | 10,523         | Ontdekkingsreiziger |
| 25    | 12,500          | 86,024         | Ontdekkingsreiziger |
| 50    | 35,355          | 345,529        | Expert              |
| 75    | 64,952          | 948,683        | Meester             |
| 100   | 100,000         | 2,050,000      | Legende             |

### Titels

| Levelbereik | Titel               |
| ----------- | ------------------- |
| 1 – 9       | Beginner            |
| 10 – 24     | Ontdekkingsreiziger |
| 25 – 49     | Expert              |
| 50 – 74     | Meester             |
| 75 – 100    | Legende             |

### XP-beloningen

| Actie             | XP  | Beschrijving                                                              |
| ----------------- | --- | ------------------------------------------------------------------------- |
| `request`         | 1   | Per API-verzoek dat via OmniRoute wordt gerouteerd                        |
| `provider_switch` | 5   | Overschakelen naar een andere provider                                    |
| `model_switch`    | 3   | Overschakelen naar een ander model                                        |
| `combo_create`    | 10  | Een nieuwe combo maken                                                    |
| `combo_use`       | 2   | Een combo gebruiken voor een verzoek                                      |
| `token_share`     | 1   | Per 1 000 tokens die met een andere gebruiker worden gedeeld              |
| `invite_redeem`   | 50  | Een uitnodigingscode inwisselen                                           |
| `daily_login`     | 5   | Dagelijks actief gebruik (eenmaal per dag)                                |
| `streak_bonus`    | 2   | Per opeenvolgende streakdag (vermenigvuldigd met de lengte van de streak) |
| `badge_unlock`    | 10  | Een badge ontgrendelen                                                    |

### Toekenningsproces

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. Zoek `XP_REWARDS[action]` op om het XP-aantal te verkrijgen.
2. Leid dit door `checkRateLimit()` (anti-cheat: maximaal 1000 XP/min per sleutel).
3. Open een transactie:
   - Lees de huidige rij uit `user_levels`.
   - Voeg XP toe; bereken het level opnieuw via `levelFromXp(totalXp)`.
   - Stel `levelUp = true` in als het level is gewijzigd.
   - Werk de rij in `user_levels` bij.
   - Voeg een rij toe aan `xp_audit_log`.
4. Retourneer het resultaat. De aanroeper verwerkt meldingen.

### Hulpfunctie: `levelFromXp(totalXp)`

Doorloopt de levels 1..100 en telt `xp_for_level(n)` op totdat de cumulatieve XP
hoger is dan `totalXp`. Retourneert het hoogste level waarvan de drempel is bereikt.
Dit is O(100) — acceptabel omdat levels zijn begrensd op 100.

---

## Badgesysteem

**Bestand:** `src/lib/gamification/badges.ts`

### Categorieën

| Categorie      | Beschrijving                                | Voorbeeldbadges                     |
| -------------- | ------------------------------------------- | ----------------------------------- |
| `usage`        | Op volume gebaseerde mijlpalen              | Eerste verzoek, 1K verzoeken, 100K  |
| `sharing`      | Tokens delen en verwijzingen                | Eerste deling, Gul (10 delingen)    |
| `contribution` | Betrokkenheid bij de community              | Combomaker, Providerverkenner       |
| `streak`       | Consistentie in de loop van de tijd         | Weekstrijder, Maandelijks toegewijd |
| `rare`         | Moeilijk te behalen of verborgen prestaties | Vroege gebruiker, Bugmelder         |

### Zeldzaamheden

| Zeldzaamheid | Kleur | Waarschijnlijkheidsindicatie |
| ------------ | ----- | ---------------------------- |
| `common`     | Grijs | De meeste gebruikers         |
| `uncommon`   | Groen | Actieve gebruikers           |
| `rare`       | Blauw | Toegewijde gebruikers        |
| `legendary`  | Goud  | Top 1%                       |

### Criteriumtypen

| Type           | Veld         | Beschrijving                                               |
| -------------- | ------------ | ---------------------------------------------------------- |
| `action_count` | `count`      | Voer een actie N keer uit (bijv. 1000 verzoeken)           |
| `streak`       | `days`       | Behoud een streak gedurende N opeenvolgende dagen          |
| `unique_count` | `field`, `n` | Gebruik N unieke waarden (bijv. 10 verschillende modellen) |
| `rank`         | `scope`, `n` | Bereik rang N binnen een leaderboardbereik                 |
| `first`        | —            | Wees de eerste die een actie uitvoert                      |
| `hidden`       | (varieert)   | Criteria worden pas na het behalen weergegeven             |

Badgedefinities worden als JSON-`criteria` opgeslagen in `badge_definitions`:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Evaluatieproces

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # alle definities
    → getUserBadges(apiKeyId)         # al behaald (overslaan)
    → voor elke nog niet behaalde badge:
       → matchesCriteria(badge, event, userState)
       → bij een match: awardBadge(apiKeyId, badgeId)
         → retourneer de meldingspayload
```

De evaluatie is **eventgestuurd** — deze wordt na elke gamificatiegebeurtenis uitgevoerd, maar
controleert alleen badges waarvan `criteria.type` overeenkomt met de gebeurtenisactie. Hierdoor
blijft de evaluatie snel (< 5ms voor de meeste gebeurtenissen).

### `matchesCriteria(badge, event, userState)`

| Criteriumtype  | Controle                                                     |
| -------------- | ------------------------------------------------------------ |
| `action_count` | `getActionCount(apiKeyId, action) >= count`                  |
| `streak`       | `getCurrentStreak(apiKeyId) >= days`                         |
| `unique_count` | `getUniqueCount(apiKeyId, field) >= n`                       |
| `rank`         | `getRank(apiKeyId, scope) <= n`                              |
| `first`        | Geen eerdere vermelding in `xp_audit_log` voor dit actietype |
| `hidden`       | Delegeert naar de toepasselijke subcontrole                  |

### Ingebouwde badges (20+)

<details>
<summary>Volledige badgelijst</summary>

| Badge                   | Categorie | Zeldzaamheid | Criteria                              |
| ----------------------- | --------- | ------------ | ------------------------------------- |
| Eerste stappen          | gebruik   | algemeen     | 1 verzoek                             |
| Op weg                  | gebruik   | algemeen     | 100 verzoeken                         |
| Hoofdgebruiker          | gebruik   | ongewoon     | 1,000 verzoeken                       |
| Centurio                | gebruik   | zeldzaam     | 10,000 verzoeken                      |
| OmniPower               | gebruik   | legendarisch | 100,000 verzoeken                     |
| Providerhopper          | bijdrage  | algemeen     | Gebruik 5 verschillende providers     |
| Providermaster          | bijdrage  | ongewoon     | Gebruik 20 verschillende providers    |
| Comboarchitect          | bijdrage  | ongewoon     | Maak 5 combo's                        |
| Combo-grootmeester      | bijdrage  | zeldzaam     | Maak 25 combo's                       |
| Eerste overdracht       | delen     | algemeen     | 1 tokenoverdracht                     |
| Gul                     | delen     | ongewoon     | 10 tokenoverdrachten                  |
| Filantroop              | delen     | zeldzaam     | Draag in totaal 10,000 tokens over    |
| Verwijzer               | delen     | algemeen     | 1 succesvolle verwijzing              |
| Netwerkbouwer           | delen     | ongewoon     | 10 succesvolle verwijzingen           |
| Weekstrijder            | reeks     | ongewoon     | Reeks van 7 dagen                     |
| Maandlang toegewijd     | reeks     | zeldzaam     | Reeks van 30 dagen                    |
| Onstuitbaar             | reeks     | legendarisch | Reeks van 365 dagen                   |
| Vroege gebruiker        | zeldzaam  | legendarisch | Word lid tijdens de bètaperiode       |
| Compressiepionier       | zeldzaam  | ongewoon     | Gebruik compressie 100 keer           |
| Vaardighedenverzamelaar | zeldzaam  | zeldzaam     | Gebruik 10 verschillende vaardigheden |
| Modelverkenner          | bijdrage  | ongewoon     | Gebruik 15 verschillende modellen     |

</details>

---

## Reeksentracker

**Bestand:** `src/lib/gamification/streaks.ts`

### Datamodel

Reeksen worden opgeslagen in de tabel `key_value` (gedeelde hulptabel) onder
sleutels met een namespace:

| Sleutel                       | Waarde                           | Beschrijving               |
| ----------------------------- | -------------------------------- | -------------------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Gegevens van actieve reeks |

### Logica

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Lees het reeksrecord uit `key_value`.
2. Parse `{current}`, `{longest}`, `{lastDate}` (ISO-datumtekenreeks).
3. Als `lastDate === today` — geen wijziging (vandaag al meegeteld).
4. Als `lastDate === yesterday` — verhoog `current`; werk `longest` zo nodig bij.
5. Als `lastDate < yesterday` — stel `current = 1` opnieuw in (reeks onderbroken).
6. Schrijf het bijgewerkte record.
7. Controleer mijlpalen: 7, 14, 30, 60, 90, 180, 365 dagen. Indien gepasseerd,
   stel `milestone = true` in (de aanroeper kent XP toe en controleert badges).

### Randgevallen

- **Tijdzone**: reeksen gebruiken UTC-datums (`new Date().toISOString().slice(0, 10)`).
  Dit is bewust — één canonieke tijdzone voorkomt manipulatie door tussen
  tijdzones te wisselen.
- **Nieuwe gebruikers**: er bestaat geen reeksrecord; het eerste verzoek maakt
  dit aan met `current=1, longest=1, lastDate=today`.
- **Meerdere verzoeken per dag**: alleen het eerste verzoek van de UTC-dag
  verhoogt de reeks.

---

## Klassement

**Bestand:** `src/lib/gamification/leaderboard.ts`

### Bereiken

| Bereik          | Periode | Beschrijving                                              |
| --------------- | ------- | --------------------------------------------------------- |
| `global`        | `all`   | Cumulatieve XP aller tijden                               |
| `weekly`        | `week`  | XP verdiend in de huidige UTC-week (ma-zo)                |
| `monthly`       | `month` | XP verdiend in de huidige UTC-maand                       |
| `tokens_shared` | `all`   | Totaal aantal tokens overgedragen aan anderen             |
| `contributions` | `all`   | Gemaakte combo's + gebruikte providers + gebruikte skills |

### Rangberekening

Rangen worden **tijdens het lezen berekend** en niet opgeslagen. Dit voorkomt
verouderde ranggegevens en maakt periodieke taken voor het herberekenen van
rangen overbodig.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

Querypatroon:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### Perioderotatie

Wekelijkse en maandelijkse klassementen worden automatisch geroteerd:

1. **Archiveren**: kopieer bij de periodegrens de huidige vermeldingen naar
   `leaderboard_archive` met het periodelabel.
2. **Opnieuw instellen**: verwijder vermeldingen voor de verlopen periode.
3. **Trigger**: wordt bij elke aanroep van `updateLeaderboard()` gecontroleerd;
   het eerste verzoek van een nieuwe periode activeert de rotatie.

Dit zorgt ervoor dat wekelijkse klassementen elke maandag om 00:00 UTC opnieuw
worden ingesteld en maandelijkse klassementen op de 1e van elke maand.

### SSE-updates in realtime

**Endpoint:** `GET /api/gamification/stream`

```
Client → GET /api/gamification/stream
  → SSE-verbinding tot stand gebracht
  → Server verzendt onmiddellijk een momentopname van de top 10 van het klassement
  → Elke 5 seconden: bijgewerkte top 10 pushen indien gewijzigd
  → Elke 15 seconden: heartbeat-opmerking (": heartbeat\n\n")
  → Client verbreekt verbinding → opschonen (listener verwijderen)
```

Gebeurtenisindeling:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

De SSE-manager houdt verbonden clients per bereik bij en verzendt alleen
updates wanneer de klassementsgegevens daadwerkelijk zijn gewijzigd sinds
de laatste push.

---

## Tokens delen

**Bestand:** `src/lib/gamification/sharing.ts`

### Dubbel boekhouden

Elke overdracht maakt twee rijen aan in `token_ledger`:

| Rij    | `from_key_id` | `to_key_id` | `amount` |
| ------ | ------------- | ----------- | -------- |
| Debet  | verzender     | ontvanger   | +bedrag  |
| Credit | ontvanger     | verzender   | -bedrag  |

Wacht — de conventie is:

| Rij       | `from_key_id` | `to_key_id` | `amount` | Betekenis                  |
| --------- | ------------- | ----------- | -------- | -------------------------- |
| Verzenden | verzender     | ontvanger   | +bedrag  | Uitstroom van de verzender |
| Ontvangen | ontvanger     | verzender   | +bedrag  | Instroom naar de ontvanger |

Het saldo wordt als volgt berekend:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Overdrachtsproces

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Valideren**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **Idempotentie**: controleer of `idempotency_key` al in het grootboek bestaat.
   Zo ja, retourneer het gecachte resultaat.
3. **Transactie** (één SQLite-transactie):
   a. Bereken het saldo van de verzender.
   b. Als `balance < amount`, breek dan af (onvoldoende saldo).
   c. Voeg de verzendrij toe (`from=sender,`.

### Frequentiebeperking

- Maximaal 10 overdrachten per minuut per API-sleutel.
- Maximaal 10.000 tokens per afzonderlijke overdracht.
- Maximaal 100.000 tokens per dag overgedragen per API-sleutel.

---

## Tokens uitnodigen en inwisselen

**Bestand:** `src/lib/gamification/invites.ts`

### Code-indeling

- **Code**: alfanumerieke code van 8 tekens (bijvoorbeeld `A3K9-X7M2`), leesbaar voor mensen
  en weergegeven aan de gebruiker.
- **Token**: willekeurig token van 32 bytes, opgeslagen als SHA-256-hash. Wordt gebruikt voor
  programmatisch inwisselen (bijvoorbeeld via URL-links).

### Opslag

| Kolom        | Waarde                          |
| ------------ | ------------------------------- |
| `code`       | `A3K9X7M2` (uniek, geïndexeerd) |
| `token_hash` | SHA-256(raw_token)              |

Het onbewerkte token wordt bij het aanmaken exact één keer aan de gebruiker geretourneerd. OmniRoute
slaat het daarna nooit meer op en geeft het ook nooit meer weer — alleen de hash blijft behouden.

### Preventie van zelfverwijzing

Wanneer een gebruiker een code inwisselt, controleert het systeem het volgende:

1. De code behoort toe aan een andere `api_key_id`.
2. De gebruiker die de code inwisselt, heeft niet eerder een code van dezelfde
   verwijzer ingewisseld (join op `invite_tokens` + inwisselingslogboek).

Als een van beide controles mislukt, wordt de inwisseling geweigerd met een duidelijke foutmelding.

### Vervaldatum en limieten

- Standaardwaarde voor `max_uses`: 10 (configureerbaar bij het aanmaken).
- Standaardwaarde voor `expires_at`: 30 dagen na het aanmaken.
- Verlopen of opgebruikte codes retourneren HTTP 410 Gone.

---

## Federatie van communityservers

**Bestand:** `src/lib/gamification/servers.ts`

### Verbinden

Een communityserver wordt geregistreerd via een uitnodigingstoken dat door de externe server is uitgegeven. De lokale instantie:

1. Ontvangt het uitnodigingstoken (bijvoorbeeld geplakt in het dashboard).
2. Roept `POST /api/gamification/federation/leaderboard` op de externe server aan om het token te valideren en het huidige klassement op te halen.
3. Slaat de serverrecord op met `status: connected`.

### Synchronisatiemodel

Federatie gebruikt **synchronisatie door overschrijven**, niet door optellen:

```
Lokale instantie               Communityserver
     │                              │
     ├── score pushen ─────────────►│  POST /federation/score
     │   { api_key_id, score }      │  (server valideert tokenhash)
     │                              │
     ├── klassement ophalen ───────►│  GET /federation/leaderboard
     │◄── top-N-vermeldingen ───────┤  (overschrijft lokale cache)
     │                              │
     └── statuscontrole ────────────►│  GET /federation/health
         (elke 60s, time-out 5s)    │
```

### Authenticatie

Federatieverzoeken bevatten:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

De externe server hasht het token en zoekt de overeenkomende rij in `community_servers` op. Hiermee wordt voorkomen dat de opgeslagen hash wordt verzonden.

### Statusbewaking

Elke serverrecord houdt het volgende bij:

| Veld        | Beschrijving                                            |
| ----------- | ------------------------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable`                  |
| `last_sync` | ISO-tijdstempel van de laatste geslaagde synchronisatie |
| `failures`  | Opeenvolgende mislukte statuscontroles                  |

Na 5 opeenvolgende fouten verandert de status in `unreachable` en wordt de synchronisatie gepauzeerd totdat een handmatige statuscontrole slaagt.

---

## Fraudepreventie

**Bestand:** `src/lib/gamification/antiCheat.ts`

### Serverside scoreberekening

Alle XP-berekeningen vinden plaats in `src/lib/gamification/xp.ts`. Clients dienen nooit een score in — ze dienen acties in en de server berekent de XP. De kolom `leaderboard.score` kan alleen door serversidecode worden beschreven.

### Snelheidsbeperking

| Limiet                           | Waarde  | Bereik          |
| -------------------------------- | ------- | --------------- |
| Maximale XP per minuut           | 1,000   | Per API-sleutel |
| Maximale overdrachten per minuut | 10      | Per API-sleutel |
| Maximaal overdrachtsbedrag       | 10,000  | Per overdracht  |
| Maximale dagelijkse overdrachten | 100,000 | Per API-sleutel |

Snelheidslimieten gebruiken een schuivend tijdvenster in het geheugen (hetzelfde patroon als `RateLimitManager` in `open-sse/services/`). Als het proces opnieuw wordt gestart, wordt teruggevallen op tellers die door SQLite worden ondersteund.

### Detectie van anomalieën met Z-scores

Voor elke API-sleutel houdt het systeem een voortschrijdend venster van 7 dagen bij met de per uur verdiende XP. Bij elke toekenning van XP:

1. Bereken de huidige XP-snelheid per uur van de gebruiker.
2. Bereken het populatiegemiddelde en de standaardafwijking.
3. Bereken `z = (user_rate - mean) / stddev`.
4. Als `z > 3.0` (3 standaardafwijkingen), markeer dit als een anomalie.

Anomalieën worden vastgelegd in `xp_audit_log` met `action = 'anomaly_detected'` en weergegeven op het beheerdersdashboard.

### Audittrail

Elke XP-toekenning, overdracht, verdiende badge en gedetecteerde anomalie wordt vastgelegd in `xp_audit_log` met:

| Veld         | Beschrijving                                       |
| ------------ | -------------------------------------------------- |
| `api_key_id` | Wie                                                |
| `action`     | Wat er is gebeurd (xp_award, transfer, anomaly, …) |
| `xp_awarded` | Hoeveelheid (0 voor gebeurtenissen zonder XP)      |
| `metadata`   | JSON met context (actietype, doel, …)              |
| `created_at` | Wanneer (ISO 8601)                                 |

Beheerders kunnen de volledige audittrail opvragen via `GET /api/gamification/anomalies`.

---

## API-routes

Alle routes volgen het standaard OmniRoute-patroon:

```
Route → CORS-preflight → Validatie van body (Zod) → Authenticatie (extractApiKey)
  → Handler
```

### Eindpunten

| Methode | Pad                                        | Beschrijving                                    | Authenticatie |
| ------- | ------------------------------------------ | ----------------------------------------------- | ------------- |
| GET     | `/api/gamification/leaderboard`            | Ranglijst ophalen (bereik, periode, paginering) | Optioneel     |
| POST    | `/api/gamification/leaderboard`            | Vernieuwen van ranglijstcache afdwingen         | Vereist       |
| GET     | `/api/gamification/stream`                 | Realtime SSE-updates van de ranglijst           | Optioneel     |
| GET     | `/api/gamification/transfer`               | Overdrachtsgeschiedenis ophalen (paginering)    | Vereist       |
| POST    | `/api/gamification/transfer`               | Tokens naar een andere gebruiker verzenden      | Vereist       |
| GET     | `/api/gamification/invite`                 | Mijn uitnodigingscodes weergeven                | Vereist       |
| POST    | `/api/gamification/invite`                 | Een nieuwe uitnodigingscode genereren           | Vereist       |
| DELETE  | `/api/gamification/invite`                 | Een uitnodigingscode intrekken                  | Vereist       |
| POST    | `/api/gamification/invite/redeem`          | Een uitnodigingscode inwisselen                 | Vereist       |
| GET     | `/api/gamification/servers`                | Communityservers weergeven                      | Vereist       |
| POST    | `/api/gamification/servers`                | Verbinding maken met een communityserver        | Vereist       |
| DELETE  | `/api/gamification/servers`                | Verbinding met een communityserver verbreken    | Vereist       |
| POST    | `/api/gamification/federation/score`       | Score naar externe server pushen                | Federatie     |
| GET     | `/api/gamification/federation/leaderboard` | Ranglijst van externe server ophalen            | Federatie     |
| GET     | `/api/gamification/notifications`          | SSE-meldingen voor badges en hogere niveaus     | Vereist       |
| GET     | `/api/gamification/anomalies`              | Anomalierapporten bekijken (beheerder)          | Beheerder     |
| POST    | `/api/gamification/rotate`                 | Geheimen van uitnodigingstokens roteren         | Vereist       |

### Voorbeelden van aanvragen/antwoorden

**POST /api/gamification/transfer**

```json
// Aanvraag
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// Antwoord 200
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

// Antwoord 400 (onvoldoende saldo)
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

## MCP-tools (8)

Geregistreerd in `open-sse/mcp-server/` naast bestaande tools. Beperkt tot
het machtigingsbereik `gamification`.

| Tool                       | Beschrijving                                        | Invoerschema                 |           |
| -------------------------- | --------------------------------------------------- | ---------------------------- | --------- |
| `gamification_leaderboard` | Ranglijst voor een bereik/periode ophalen           | `{ scope, period?, limit? }` |
| `gamification_rank`        | Rang en aangrenzende posities van aanroeper ophalen | `{ scope }`                  |
| `gamification_profile`     | Samenvatting van XP, niveau, titel en reeks ophalen | `{}`                         |
| `gamification_badges`      | Behaalde badges of alle definities weergeven        | `{ earned?: boolean }`       |
| `gamification_transfer`    | Tokens naar een andere gebruiker sturen             | `{ to, amount }`             |
| `gamification_invite`      | Uitnodigingscodes genereren of weergeven            | `{ action: "create"          | "list" }` |
| `gamification_servers`     | Communityservers weergeven of ermee verbinden       | `{ action, token? }`         |
| `gamification_anomalies`   | Afwijkingsrapporten bekijken (adminbereik)          | `{ limit?, since? }`         |

---

## Dashboardpagina's

### `/dashboard/leaderboard`

- Podiumweergave (top 3 met avatars en XP).
- Bereikselector: Globaal / Wekelijks / Maandelijks / Gedeelde tokens / Bijdragen.
- Gepagineerde tabel (25 per pagina) met rang, naam, score, niveau en titel.
- Realtime-updates via SSE — wijzigingen in de ranglijst worden geanimeerd.
- De huidige gebruiker wordt in de tabel gemarkeerd met een vastgezette rij "Jouw rang".

### `/dashboard/profile`

- XP-voortgangsbalk met het huidige niveau en de drempel voor het volgende niveau.
- Titelbadge wordt prominent weergegeven.
- Badgegalerij — behaalde badges met de datum waarop ze zijn behaald, niet-behaalde badges grijs weergegeven
  (verborgen badges tonen "???" totdat ze zijn behaald).
- Reeksteller met vlampictogram; reekskalender (afgelopen 30 dagen).
- Grafiek met XP-geschiedenis (dagelijkse XP over de afgelopen 30 dagen).

### `/dashboard/tokens`

- Tokensaldo (prominent, bovenaan de pagina).
- Overdrachtsformulier: ontvanger, bedrag, bevestigingsvenster.
- Tabel met overdrachtsgeschiedenis en filters (verzonden/ontvangen/alles).
- Uitnodigingssectie: actieve codes, nieuwe genereren, link delen.
- Communityservers: lijst met gezondheidsstatus, verbinden/verbinding verbreken.

### `/dashboard/gamification/admin`

- Lijst met afwijkingen, inclusief ernst, gebruiker, tijdstempel en z-score.
- Auditlogviewer met filters (actietype, gebruiker, datumbereik).
- Systeemstatistieken: totaal toegekende XP, actieve gebruikers, percentages behaalde badges.
- Overzicht van de gezondheidsstatus van federatieservers.

---

## Pipeline-integratie

### Integratiepunt

Gamification haakt op één punt in op de aanvraagpipeline in
`open-sse/handlers/chatCore.ts`:

```typescript
// Nadat het antwoord naar de client is verzonden:
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
    // Starten en vergeten: loggen, maar nooit doorgeven aan de client
  });
});
```

### Gebeurtenistypen

| Gebeurtenistype     | Wanneer uitgezonden                             |
| ------------------- | ----------------------------------------------- |
| `request.completed` | Succesvol LLM-antwoord verzonden                |
| `provider.switch`   | Provider gewijzigd (combo-fallbacks tellen mee) |
| `combo.created`     | Nieuwe combo-configuratie opgeslagen            |
| `combo.used`        | Combo-doel succesvol bereikt                    |
| `badge.earned`      | Badge-evaluatie heeft een overeenkomst gevonden |
| `streak.milestone`  | Reeksdrempel overschreden                       |
| `transfer.sent`     | Tokenoverdracht voltooid                        |
| `referral.redeemed` | Uitnodigingscode succesvol ingewisseld          |
| `compression.used`  | Promptcompressie toegepast                      |
| `skill.executed`    | Uitvoering van vaardigheid voltooid             |
| `model.first_use`   | Model niet gebruikt in de afgelopen 7 dagen     |

### Garantie van niet-blokkerende verwerking

Het patroon `setImmediate` + `.catch(() => {})` zorgt ervoor dat:

1. Het antwoord volledig is verzonden voordat gamification wordt uitgevoerd.
2. Gamification-fouten nooit zichtbaar worden voor de client.
3. De gebeurtenisverwerking in de volgende microtaak wordt uitgevoerd, niet inline.

---

## Beveiliging

### Dreigingsmodel

| Dreiging                                  | Maatregel                                                                               |
| ----------------------------------------- | --------------------------------------------------------------------------------------- |
| Opdrijven van scores                      | XP wordt uitsluitend aan de serverzijde berekend; clients dienen acties in, geen scores |
| Replay-aanvallen                          | Idempotentiesleutels voor overdrachten; deduplicatie van auditlogboeken                 |
| Overdrachtsfraude                         | Dubbel boekhoudkundig grootboek; atomaire transacties; frequentielimieten               |
| Zelfverwijzing                            | `api_key_id` bij verzilvering kruislings controleren                                    |
| Manipulatie van ranglijsten               | Anomaliedetectie met Z-scores; anomaliedashboard voor beheerders                        |
| Diefstal van federatietokens              | Opslag met SHA-256-hashes; onbewerkte token wordt slechts eenmaal getoond               |
| Brute-forceaanvallen op uitnodigingscodes | Frequentielimiet voor het verzilveringsendpoint; entropie van 8 tekens                  |
| XSS in weergavenamen                      | Weergavenamen worden opgeschoond; ranglijstvermeldingen worden geëscapet                |
| Timingaanvallen op hashes                 | `crypto.timingSafeEqual` voor het vergelijken van tokenhashes                           |

### Authenticatievereisten

- **Openbaar** (geen authenticatie): `GET /leaderboard`, `GET /stream` (alleen-lezenranglijsten).
- **API-sleutel vereist**: alle schrijfbewerkingen, profiel, overdrachten, uitnodigingen.
- **Alleen voor beheerders**: anomaliedashboard, auditlogboekviewer.
- **Federatie**: afzonderlijk authenticatiepad dat de onbewerkte token in de
  `Authorization`-header gebruikt, gevalideerd aan de hand van de opgeslagen SHA-256-hash.

---

## Testen

### Testbestanden

Alle tests gebruiken de ingebouwde testrunner van Node.js (`node --import tsx/esm --test`).

| Testbestand                                   | Dekt                                               | Tests |
| --------------------------------------------- | -------------------------------------------------- | ----- |
| `tests/unit/gamification/xp.test.ts`          | XP-berekening, niveaucurve, titels                 | 8     |
| `tests/unit/gamification/badges.test.ts`      | Vergelijking en toekenning van badgecriteria       | 10    |
| `tests/unit/gamification/streaks.test.ts`     | Reekslogica, mijlpalen, randgevallen               | 7     |
| `tests/unit/gamification/leaderboard.test.ts` | Rangberekening, paginering, rotatie                | 8     |
| `tests/unit/gamification/sharing.test.ts`     | Overdrachten, saldo, idempotentie                  | 9     |
| `tests/unit/gamification/invites.test.ts`     | Aanmaken, verzilveren, vervaldatum, zelfverwijzing | 7     |
| `tests/unit/gamification/antiCheat.test.ts`   | Frequentielimieten, Z-score, auditregistratie      | 6     |
| `tests/unit/gamification/events.test.ts`      | Gebeurtenisemissie, fan-out, foutafhandeling       | 5     |

### Tests uitvoeren

```bash
# Alle gamificatietests
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# Eén testbestand
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Vereisten voor testdekking

Volgens `CONTRIBUTING.md` moeten alle nieuwe modules aan het volgende voldoen:

- Vertakkingsdekking >= 80%.
- Elke openbare functie wordt ten minste eenmaal getest.
- Foutpaden worden getest (onvoldoende saldo, verlopen codes, frequentielimieten).

---

## Bestandsstructuur

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # Alle 8 tabellen + indexen
      gamification.ts                  # CRUD-module voor het domein
    gamification/
      xp.ts                           # XP-berekening, niveaucurve, titels
      badges.ts                       # Badgedefinities, criteria, evaluatie
      streaks.ts                      # Dagelijkse reeks bijhouden
      leaderboard.ts                  # Rangberekening, SSE, rotatie
      antiCheat.ts                    # Frequentiebeperking, z-score, audit
      sharing.ts                      # Grootboek voor tokenoverdrachten
      invites.ts                      # Uitnodigings-/inwisselcodes
      servers.ts                      # Federatie van communityservers
      events.ts                       # Event-emitter (integratiepunt)
      notifications.ts                # SSE-notificatiestream
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST-klassement
        leaderboard/stream/route.ts   # Realtime-updates via SSE
        transfer/route.ts             # GET/POST-overdrachten
        invite/route.ts               # GET/POST/DELETE-uitnodigingscodes
        invite/redeem/route.ts        # POST-code inwisselen
        servers/route.ts              # GET/POST/DELETE-servers
        federation/score/route.ts     # POST-score pushen
        federation/leaderboard/route.ts # GET-klassement ophalen
        notifications/route.ts        # SSE-notificaties
        anomalies/route.ts            # GET-anomalierapporten
        rotate/route.ts               # POST-geheimen roteren
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Ranglijstpagina
        profile/page.tsx               # Pagina voor XP/badges/reeksen
        tokens/page.tsx                # Pagina voor saldo/overdrachten/uitnodigingen
        gamification/admin/page.tsx    # Beheerdersmonitoring van anomalieën
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
    GAMIFICATION.md                    # Dit document
```

---

## Migratiestrategie

### Fase 1: Backendkern (PR 1)

- Migratie `060_create_gamification.sql` (8 tabellen).
- `src/lib/db/gamification.ts` (domeinmodule).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- Integratiepunt in `chatCore.ts`.
- Unittests voor XP, reeksen en events.

### Fase 2: Badges en klassement (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Badgedefinities in constanten.
- API-routes voor het klassement + SSE-stream.
- Unittests voor badges en het klassement.

### Fase 3: Delen en uitnodigingen (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- API-routes voor overdrachten en uitnodigingen.
- Unittests voor delen, uitnodigingen en fraudepreventie.

### Fase 4: Federatie en dashboard (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- API-routes voor federatie.
- Dashboardpagina's (klassement, profiel, tokens, beheer).
- Registratie van MCP-tools.

---

## Toekomstige overwegingen

- **Seizoensevenementen**: tijdelijke badgesets en leaderboardseizoenen.
- **Teamleaderboards**: groepeer gebruikers op organisatie of combo.
- **XP-vermenigvuldigers**: verhoog XP tijdens promotieperiodes.
- **Prestaties delen**: genereer deelbare badgekaarten (OpenGraph-afbeeldingen).
- **Mobiele pushmeldingen**: webhookgebaseerde meldingen voor badge-/levelgebeurtenissen.
- **Leaderboard-API**: openbare API voor integraties van derden.
