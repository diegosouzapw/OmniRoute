# Gamification & Leaderboard System (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **Sursa adevărului:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Ultima actualizare:** 2026-06-28 — v3.8.40

OmniRoute include un strat de gamificare local-first care recompensează utilizatorii pentru
interacțiunea cu platforma — efectuarea solicitărilor, schimbarea furnizorilor, crearea
combinațiilor, partajarea tokenurilor și contribuțiile aduse comunității. Întreaga stare este păstrată în
SQLite; federarea cu serverele comunității este opțională și bazată pe trimiterea datelor.

Sistemul este proiectat pentru a avea **latență zero pe calea critică** — evenimentele de gamificare
sunt lansate fără a aștepta răspunsul din conducta de procesare a solicitărilor și nu blochează niciodată
un răspuns LLM.

---

## Prezentare generală

### Scop

Creșterea implicării și retenției utilizatorilor prin oferirea unui progres vizibil (XP,
niveluri, insigne), a validării sociale (clasamente) și a stimulentelor economice (partajarea
tokenurilor, recompense pentru invitații).

### Domeniu de aplicare

| Funcționalitate          | Descriere                                                                             |
| ------------------------ | ------------------------------------------------------------------------------------- |
| XP și niveluri           | Câștigarea de XP pentru fiecare acțiune; avansarea pe o curbă polinomială             |
| Insigne                  | Peste 20 de realizări din 5 categorii, cu 4 niveluri de raritate                      |
| Serii                    | Urmărirea utilizării active zilnice, cu seria curentă și cea mai lungă                |
| Clasamente               | Clasamente globale, săptămânale, lunare, pentru partajarea tokenurilor și contribuții |
| Partajarea tokenurilor   | Transferul creditelor între utilizatori printr-un registru în partidă dublă           |
| Invitare și valorificare | Coduri de recomandare stocate sub formă de hash SHA-256                               |
| Servere comunitare       | Federarea cu instanțe OmniRoute externe                                               |
| Prevenirea trișării      | Punctaj pe server, limitarea ratei, detectarea anomaliilor prin scor z                |

### Principii de proiectare

1. **Local-first** — întreaga stare se află în SQLite; nu sunt necesare servicii externe.
2. **Neblocant** — evenimentele sunt lansate fără a aștepta răspunsul; calea de răspuns LLM nu este
   întârziată niciodată de logica de gamificare.
3. **Server autoritar** — XP este calculat numai pe server; clienții nu pot
   mări artificial punctajele.
4. **Respectarea confidențialității** — participarea în clasamente este opțională; utilizatorii își pot
   ascunde profilul.
5. **Pregătit pentru federare** — serverele comunitare pot trimite punctaje printr-un API semnat;
   sincronizarea suprascrie valorile, nu le adună.

---

## Arhitectură

### Flux de nivel înalt

```
Solicitare client
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (conducta existentă) ...
      → răspunsul din amonte este trimis clientului
      → setImmediate (lansare fără a aștepta răspunsul):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

Emițătorul de evenimente este punctul unic de integrare. `chatCore.ts` apelează
`emitGamificationEvent()` după trimiterea răspunsului; modulul de evenimente distribuie
procesarea către subsistemele de XP, serii, insigne, clasamente și prevenire a trișării.

### Graful dependențelor modulelor

```
src/lib/gamification/
  events.ts          ← punct de intrare (apelat din chatCore.ts)
    ├── xp.ts        ← calcularea XP și stabilirea nivelului
    ├── streaks.ts   ← urmărirea seriilor de activitate zilnică
    ├── badges.ts    ← evaluarea criteriilor pentru insigne
    ├── leaderboard.ts ← calcularea poziției și difuzarea prin SSE
    ├── antiCheat.ts ← limitarea ratei și detectarea anomaliilor
    ├── sharing.ts   ← registrul transferurilor de tokenuri
    ├── invites.ts   ← gestionarea codurilor de invitare/valorificare
    ├── servers.ts   ← federarea serverelor comunitare
    └── notifications.ts ← flux de notificări SSE

src/lib/db/
  gamification.ts    ← toate operațiile CRUD (8 tabele)

src/app/api/gamification/
  leaderboard/       ← GET clasamente, POST reîmprospătare manuală
  leaderboard/stream ← actualizări SSE în timp real
  transfer/          ← GET istoric, POST trimitere tokenuri
  invite/            ← GET/POST coduri, DELETE revocare
  invite/redeem/     ← POST valorificarea unui cod
  servers/           ← GET/POST/DELETE servere comunitare
  federation/score/  ← POST trimiterea punctajului către server
  federation/leaderboard/ ← GET preluarea clasamentului de pe server
  notifications/     ← notificări SSE pentru insigne/avansări în nivel
  anomalies/         ← GET rapoarte de anomalii (administrator)
  rotate/            ← POST rotația secretelor tokenurilor de invitare
```

---

## Stratul de date

### Tabelele bazei de date

Toate tabelele se află în baza de date SQLite principală OmniRoute, creată prin migrarea
`060_create_gamification.sql`. Jurnalizarea WAL este moștenită de la instanța singleton
`getDbInstance()` din `src/lib/db/core.ts`.

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

### Modul de domeniu: `src/lib/db/gamification.ts`

Urmează modelul standard OmniRoute — importă `getDbInstance()` din
`core.ts` și exportă funcții CRUD tipizate. Nu există SQL brut în gestionarii de rute.

Funcții principale:

| Funcție                    | Descriere                                                            |
| -------------------------- | -------------------------------------------------------------------- |
| `upsertLeaderboardEntry()` | Inserează sau actualizează scorul pentru (api_key_id, scope, period) |
| `getLeaderboard()`         | Clasamente paginate pentru un anumit domeniu/o anumită perioadă      |
| `getUserLevel()`           | Obține sau creează înregistrarea nivelului utilizatorului            |
| `updateUserLevel()`        | Setează atomic XP-ul, nivelul și titlul                              |
| `getBadgeDefinitions()`    | Toate definițiile insignelor (filtrate opțional)                     |
| `getUserBadges()`          | Insignele obținute de un utilizator                                  |
| `awardBadge()`             | Inserează obținerea unei insigne (idempotentă pentru badge_id)       |
| `logXpAction()`            | Adaugă în xp_audit_log                                               |
| `getXpAuditLog()`          | Istoricul de audit paginat al unui utilizator                        |
| `insertLedgerEntry()`      | Transfer cu înregistrare dublă (într-o tranzacție)                   |
| `getBalance()`             | Suma primită minus suma trimisă pentru un utilizator                 |
| `getTransferHistory()`     | Jurnalul paginat al transferurilor                                   |
| `createInviteToken()`      | Inserează codul de invitație + tokenul cu hash                       |
| `redeemInviteToken()`      | Caută după cod, validează și incrementează utilizările               |
| `upsertCommunityServer()`  | Înregistrează sau actualizează un server de federație                |
| `getCommunityServers()`    | Listează serverele unui utilizator                                   |
| `deleteCommunityServer()`  | Elimină înregistrarea unui server                                    |

---

## Sistem XP / Nivel

**Fișier:** `src/lib/gamification/xp.ts`

### Curba nivelurilor

XP-ul necesar pentru a ajunge la nivelul `n` urmează o curbă polinomială:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Nivel | XP până la următorul nivel | XP cumulativ | Titlu      |
| ----- | -------------------------- | ------------ | ---------- |
| 1     | 100                        | 100          | Începător  |
| 5     | 1,118                      | 2,415        | Începător  |
| 10    | 3,162                      | 10,523       | Explorator |
| 25    | 12,500                     | 86,024       | Explorator |
| 50    | 35,355                     | 345,529      | Expert     |
| 75    | 64,952                     | 948,683      | Maestru    |
| 100   | 100,000                    | 2,050,000    | Legendă    |

### Titluri

| Interval de niveluri | Titlu      |
| -------------------- | ---------- |
| 1 – 9                | Începător  |
| 10 – 24              | Explorator |
| 25 – 49              | Expert     |
| 50 – 74              | Maestru    |
| 75 – 100             | Legendă    |

### Recompense XP

| Acțiune           | XP  | Descriere                                                             |
| ----------------- | --- | --------------------------------------------------------------------- |
| `request`         | 1   | Pentru fiecare solicitare API direcționată prin OmniRoute             |
| `provider_switch` | 5   | Trecerea la un furnizor diferit                                       |
| `model_switch`    | 3   | Trecerea la un model diferit                                          |
| `combo_create`    | 10  | Crearea unei combinații noi                                           |
| `combo_use`       | 2   | Utilizarea unei combinații pentru o solicitare                        |
| `token_share`     | 1   | Pentru fiecare 1 000 de tokenuri partajate cu alt utilizator          |
| `invite_redeem`   | 50  | Valorificarea unui cod de invitație                                   |
| `daily_login`     | 5   | Utilizare activă zilnică (o dată pe zi)                               |
| `streak_bonus`    | 2   | Pentru fiecare zi consecutivă din serie (înmulțit cu lungimea seriei) |
| `badge_unlock`    | 10  | Deblocarea unei insigne                                               |

### Fluxul de acordare

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. Consultă `XP_REWARDS[action]` pentru a obține valoarea XP.
2. Trece prin `checkRateLimit()` (anti-trișare: maximum 1000 XP/min per cheie).
3. Deschide o tranzacție:
   - Citește rândul curent din `user_levels`.
   - Adaugă XP; recalculează nivelul prin `levelFromXp(totalXp)`.
   - Dacă nivelul s-a schimbat, setează `levelUp = true`.
   - Actualizează rândul din `user_levels`.
   - Inserează în `xp_audit_log`.
4. Returnează rezultatul. Apelantul gestionează notificările.

### Funcție auxiliară: `levelFromXp(totalXp)`

Iterează prin nivelurile 1..100, însumând `xp_for_level(n)` până când XP-ul cumulativ
depășește `totalXp`. Returnează cel mai înalt nivel al cărui prag este atins.
Complexitatea este O(100) — acceptabilă, deoarece nivelurile sunt limitate la 100.

---

## Sistemul de insigne

**Fișier:** `src/lib/gamification/badges.ts`

### Categorii

| Categorie      | Descriere                             | Exemple de insigne                          |
| -------------- | ------------------------------------- | ------------------------------------------- |
| `usage`        | Repere bazate pe volum                | Prima solicitare, 1K solicitări, 100K       |
| `sharing`      | Partajarea tokenurilor și recomandări | Prima partajare, Generos (10 partajări)     |
| `contribution` | Implicarea în comunitate              | Creator de combinații, Explorator furnizori |
| `streak`       | Consecvență în timp                   | Războinicul săptămânii, Devotat lunar       |
| `rare`         | Realizări greu de obținut sau ascunse | Adoptator timpuriu, Raportor de erori       |

### Rarități

| Raritate    | Culoare  | Indiciu privind probabilitatea |
| ----------- | -------- | ------------------------------ |
| `common`    | Gri      | Majoritatea utilizatorilor     |
| `uncommon`  | Verde    | Utilizatori activi             |
| `rare`      | Albastru | Utilizatori dedicați           |
| `legendary` | Auriu    | Primii 1%                      |

### Tipuri de criterii

| Tip            | Câmp         | Descriere                                              |
| -------------- | ------------ | ------------------------------------------------------ |
| `action_count` | `count`      | Efectuează acțiunea de N ori (de ex., 1000 solicitări) |
| `streak`       | `days`       | Menține o serie timp de N zile consecutive             |
| `unique_count` | `field`, `n` | Utilizează N valori unice (de ex., 10 modele diferite) |
| `rank`         | `scope`, `n` | Atinge poziția N într-un clasament                     |
| `first`        | —            | Fii primul care efectuează o acțiune                   |
| `hidden`       | (variază)    | Criteriile nu sunt afișate până la obținerea insignei  |

Definițiile insignelor sunt stocate în `badge_definitions` sub formă de `criteria` JSON:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Fluxul de evaluare

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # toate definițiile
    → getUserBadges(apiKeyId)         # deja obținute (omitere)
    → pentru fiecare insignă neobținută:
       → matchesCriteria(badge, event, userState)
       → dacă există o potrivire: awardBadge(apiKeyId, badgeId)
         → returnează datele notificării
```

Evaluarea este **bazată pe evenimente** — rulează după fiecare eveniment de gamificare, dar
verifică numai insignele al căror `criteria.type` corespunde acțiunii evenimentului. Acest lucru
menține evaluarea rapidă (< 5ms pentru majoritatea evenimentelor).

### `matchesCriteria(badge, event, userState)`

| Tipul criteriului | Verificare                                                             |
| ----------------- | ---------------------------------------------------------------------- |
| `action_count`    | `getActionCount(apiKeyId, action) >= count`                            |
| `streak`          | `getCurrentStreak(apiKeyId) >= days`                                   |
| `unique_count`    | `getUniqueCount(apiKeyId, field) >= n`                                 |
| `rank`            | `getRank(apiKeyId, scope) <= n`                                        |
| `first`           | Nicio intrare anterioară în `xp_audit_log` pentru acest tip de acțiune |
| `hidden`          | Delegă verificarea secundară corespunzătoare                           |

### Insigne încorporate (20+)

<details>
<summary>Lista completă de insigne</summary>

| Insignă                       | Categorie   | Raritate  | Criterii                              |
| ----------------------------- | ----------- | --------- | ------------------------------------- |
| Primii pași                   | utilizare   | comună    | 1 solicitare                          |
| Începutul încălzirii          | utilizare   | comună    | 100 de solicitări                     |
| Utilizator avansat            | utilizare   | necomună  | 1.000 de solicitări                   |
| Centurion                     | utilizare   | rară      | 10.000 de solicitări                  |
| OmniPower                     | utilizare   | legendară | 100.000 de solicitări                 |
| Navigator de furnizori        | contribuție | comună    | Folosește 5 furnizori diferiți        |
| Maestru al furnizorilor       | contribuție | necomună  | Folosește 20 de furnizori diferiți    |
| Arhitect de combinații        | contribuție | necomună  | Creează 5 combinații                  |
| Mare maestru al combinațiilor | contribuție | rară      | Creează 25 de combinații              |
| Prima distribuire             | partajare   | comună    | 1 transfer de tokenuri                |
| Generos                       | partajare   | necomună  | 10 transferuri de tokenuri            |
| Filantrop                     | partajare   | rară      | Transferă în total 10.000 de tokenuri |
| Recomandator                  | partajare   | comună    | 1 recomandare reușită                 |
| Constructor de rețele         | partajare   | necomună  | 10 recomandări reușite                |
| Războinicul săptămânii        | serie       | necomună  | Serie de 7 zile                       |
| Devotat lunar                 | serie       | rară      | Serie de 30 de zile                   |
| De neoprit                    | serie       | legendară | Serie de 365 de zile                  |
| Adoptator timpuriu            | rară        | legendară | Se alătură în perioada beta           |
| Pionier al compresiei         | rară        | necomună  | Folosește compresia de 100 de ori     |
| Colecționar de abilități      | rară        | rară      | Folosește 10 abilități diferite       |
| Explorator de modele          | contribuție | necomună  | Folosește 15 modele diferite          |

</details>

---

## Monitorizarea seriilor

**Fișier:** `src/lib/gamification/streaks.ts`

### Model de date

Seriile sunt stocate în tabelul `key_value` (tabel utilitar partajat), folosind
chei cu spații de nume:

| Cheie                         | Valoare                          | Descriere            |
| ----------------------------- | -------------------------------- | -------------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Datele seriei active |

### Logică

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Citește înregistrarea seriei din `key_value`.
2. Parsează `{current}`, `{longest}`, `{lastDate}` (șir de caractere cu data în format ISO).
3. Dacă `lastDate === today` — nicio modificare (deja contorizată astăzi).
4. Dacă `lastDate === yesterday` — incrementează `current`; actualizează `longest` dacă este necesar.
5. Dacă `lastDate < yesterday` — resetează `current = 1` (seria a fost întreruptă).
6. Scrie înregistrarea actualizată.
7. Verifică pragurile: 7, 14, 30, 60, 90, 180, 365 de zile. Dacă un prag este depășit, setează
   `milestone = true` (apelantul acordă XP și verifică insignele).

### Cazuri-limită

- **Fus orar**: seriile folosesc date UTC (`new Date().toISOString().slice(0, 10)`).
  Acest lucru este intenționat — un singur fus orar canonic previne manipularea prin
  schimbarea repetată a fusului orar.
- **Utilizatori noi**: nu există nicio înregistrare a seriei; prima solicitare o creează cu
  `current=1, longest=1, lastDate=today`.
- **Solicitări multiple pe zi**: numai prima solicitare din ziua UTC
  incrementează seria.

---

## Clasament

**Fișier:** `src/lib/gamification/leaderboard.ts`

### Domenii

| Domeniu         | Perioadă | Descriere                                                     |
| --------------- | -------- | ------------------------------------------------------------- |
| `global`        | `all`    | XP cumulativ din toate timpurile                              |
| `weekly`        | `week`   | XP obținut în săptămâna UTC curentă (luni-duminică)           |
| `monthly`       | `month`  | XP obținut în luna UTC curentă                                |
| `tokens_shared` | `all`    | Numărul total de tokenuri transferate altora                  |
| `contributions` | `all`    | Combinații create + furnizori utilizați + abilități utilizate |

### Calcularea poziției

Pozițiile sunt **calculate în momentul citirii**, nu sunt stocate. Astfel se evită datele
perimate privind pozițiile și se elimină necesitatea sarcinilor periodice de recalculare a acestora.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

Model de interogare:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### Rotirea perioadelor

Clasamentele săptămânale și lunare se rotesc automat:

1. **Arhivare**: la limita perioadei, copiază intrările curente în
   `leaderboard_archive`, împreună cu eticheta perioadei.
2. **Resetare**: șterge intrările pentru perioada expirată.
3. **Declanșare**: se verifică la fiecare apel `updateLeaderboard()`; prima solicitare
   dintr-o perioadă nouă declanșează rotirea.

Acest lucru asigură resetarea clasamentelor săptămânale în fiecare luni la 00:00 UTC, iar a celor lunare
în prima zi a fiecărei luni.

### Actualizări SSE în timp real

**Endpoint:** `GET /api/gamification/stream`

```
Client → GET /api/gamification/stream
  → Conexiunea SSE este stabilită
  → Serverul trimite imediat un instantaneu al primelor 10 poziții din clasament
  → La fiecare 5 secunde: trimite clasamentul actualizat cu primele 10 poziții, dacă s-a modificat
  → La fiecare 15 secunde: comentariu heartbeat (": heartbeat\n\n")
  → Clientul se deconectează → curățare (eliminarea listenerului)
```

Formatul evenimentului:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

Managerul SSE urmărește clienții conectați pentru fiecare domeniu și trimite actualizări numai
atunci când datele clasamentului s-au modificat efectiv de la ultima trimitere.

---

## Partajarea tokenurilor

**Fișier:** `src/lib/gamification/sharing.ts`

### Registru în partidă dublă

Fiecare transfer creează două rânduri în `token_ledger`:

| Rând   | `from_key_id` | `to_key_id` | `amount` |
| ------ | ------------- | ----------- | -------- |
| Debit  | expeditor     | destinatar  | +sumă    |
| Credit | destinatar    | expeditor   | -sumă    |

Stați — convenția este:

| Rând      | `from_key_id` | `to_key_id` | `amount` | Semnificație              |
| --------- | ------------- | ----------- | -------- | ------------------------- |
| Trimitere | expeditor     | destinatar  | +sumă    | Ieșire de la expeditor    |
| Primire   | destinatar    | expeditor   | +sumă    | Intrare pentru destinatar |

Soldul este calculat astfel:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Fluxul transferului

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Validare**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **Idempotență**: verificați dacă `idempotency_key` există deja în registru.
   Dacă da, returnați rezultatul din cache.
3. **Tranzacție** (o singură tranzacție SQLite):
   a. Calculați soldul expeditorului.
   b. Dacă `balance < amount`, abandonați operațiunea (fonduri insuficiente).
   c. Inserați rândul de trimitere (`from=sender,`.

### Limitarea frecvenței

- Maximum 10 transferuri pe minut pentru fiecare cheie API.
- Maximum 10.000 de tokenuri per transfer.
- Maximum 100.000 de tokenuri transferate pe zi pentru fiecare cheie API.

---

## Tokenuri de invitație și revendicare

**Fișier:** `src/lib/gamification/invites.ts`

### Formatul codului

- **Cod**: 8 caractere alfanumerice (de exemplu, `A3K9-X7M2`), ușor de citit,
  afișat utilizatorului.
- **Token**: token aleatoriu de 32 de octeți, stocat sub forma unui hash SHA-256. Utilizat pentru
  revendicare programatică (de exemplu, linkuri URL).

### Stocare

| Coloană      | Valoare                    |
| ------------ | -------------------------- |
| `code`       | `A3K9X7M2` (unic, indexat) |
| `token_hash` | SHA-256(raw_token)         |

Tokenul brut îi este returnat utilizatorului o singură dată, la momentul creării. OmniRoute
nu îl mai stochează și nu îl mai afișează niciodată — doar hashul persistă.

### Prevenirea auto-recomandării

Când un utilizator revendică un cod, sistemul verifică:

1. Codul aparține unui alt `api_key_id`.
2. Utilizatorul care efectuează revendicarea nu a revendicat anterior niciun cod de la același
   referent (îmbinare între `invite_tokens` + jurnalul de revendicări).

Dacă oricare dintre verificări eșuează, revendicarea este respinsă cu un mesaj de eroare clar.

### Expirare și limite

- Valoarea implicită pentru `max_uses`: 10 (configurabilă la creare).
- Valoarea implicită pentru `expires_at`: 30 de zile de la creare.
- Codurile expirate sau epuizate returnează HTTP 410 Gone.

---

## Federarea serverelor comunitare

**Fișier:** `src/lib/gamification/servers.ts`

### Conectare

Un server comunitar este înregistrat prin intermediul unui token de invitație emis de serverul la distanță. Instanța locală:

1. Primește tokenul de invitație (de exemplu, introdus în panoul de control).
2. Apelează `POST /api/gamification/federation/leaderboard` pe serverul la distanță pentru a valida tokenul și a prelua clasamentul curent.
3. Stochează înregistrarea serverului cu `status: connected`.

### Modelul de sincronizare

Federarea utilizează **sincronizare prin suprascriere**, nu cumulativă:

```
Instanța locală                Serverul comunitar
     │                              │
     ├── trimite scorul ───────────►│  POST /federation/score
     │   { api_key_id, score }      │  (serverul validează hashul tokenului)
     │                              │
     ├── preia clasamentul ────────►│  GET /federation/leaderboard
     │◄── primele N înregistrări ───┤  (suprascrie memoria cache locală)
     │                              │
     └── verificarea stării ───────►│  GET /federation/health
         (la fiecare 60s,           │
          expirare după 5s)         │
```

### Autentificare

Cererile de federare includ:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

Serverul la distanță calculează hashul tokenului și caută rândul corespunzător din `community_servers`. Astfel se evită transmiterea hashului stocat.

### Monitorizarea stării

Fiecare înregistrare de server urmărește:

| Câmp        | Descriere                                             |
| ----------- | ----------------------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable`                |
| `last_sync` | Marcajul temporal ISO al ultimei sincronizări reușite |
| `failures`  | Verificări consecutive nereușite ale stării           |

După 5 eșecuri consecutive, starea se schimbă în `unreachable`, iar sincronizarea este întreruptă până când o verificare manuală a stării reușește.

---

## Prevenirea trișării

**Fișier:** `src/lib/gamification/antiCheat.ts`

### Calcularea scorului pe server

Toate calculele XP au loc în `src/lib/gamification/xp.ts`. Clienții nu trimit niciodată un scor — aceștia trimit acțiuni, iar serverul calculează XP. Coloana `leaderboard.score` poate fi modificată numai de codul executat pe server.

### Limitarea ratei

| Limită                         | Valoare | Domeniu de aplicare |
| ------------------------------ | ------- | ------------------- |
| XP maxim pe minut              | 1,000   | Per cheie API       |
| Transferuri maxime pe minut    | 10      | Per cheie API       |
| Valoarea maximă a transferului | 10,000  | Per transfer        |
| Transferuri zilnice maxime     | 100,000 | Per cheie API       |

Limitele de rată utilizează o fereastră glisantă în memorie (același model ca `RateLimitManager` din `open-sse/services/`). Dacă procesul repornește, se revine la contoare stocate în SQLite.

### Detectarea anomaliilor prin scorul Z

Pentru fiecare cheie API, sistemul menține o fereastră glisantă de 7 zile pentru XP câștigat pe oră. La fiecare acordare de XP:

1. Calculează rata orară curentă de XP a utilizatorului.
2. Calculează media populației și abaterea standard.
3. Calculează `z = (user_rate - mean) / stddev`.
4. Dacă `z > 3.0` (3 abateri standard), marchează cazul drept anomalie.

Anomaliile sunt înregistrate în `xp_audit_log` cu `action = 'anomaly_detected'` și sunt afișate în panoul de administrare.

### Jurnalul de audit

Fiecare acordare de XP, transfer, obținere a unei insigne și detectare a unei anomalii este înregistrată în `xp_audit_log` cu:

| Câmp         | Descriere                                         |
| ------------ | ------------------------------------------------- |
| `api_key_id` | Cine                                              |
| `action`     | Ce s-a întâmplat (xp_award, transfer, anomaly, …) |
| `xp_awarded` | Cantitatea (0 pentru evenimentele fără XP)        |
| `metadata`   | JSON cu context (tipul acțiunii, ținta, …)        |
| `created_at` | Când (ISO 8601)                                   |

Administratorii pot interoga întregul jurnal de audit prin `GET /api/gamification/anomalies`.

---

## Rute API

Toate rutele urmează modelul standard OmniRoute:

```
Rută → Verificare preliminară CORS → Validarea corpului (Zod) → Autentificare (extractApiKey)
  → Gestionar
```

### Endpointuri

| Metodă | Cale                                       | Descriere                                         | Autentificare |
| ------ | ------------------------------------------ | ------------------------------------------------- | ------------- |
| GET    | `/api/gamification/leaderboard`            | Obține clasamentul (domeniu, perioadă, paginare)  | Opțională     |
| POST   | `/api/gamification/leaderboard`            | Forțează reîmprospătarea cache-ului clasamentului | Obligatorie   |
| GET    | `/api/gamification/stream`                 | Actualizări SSE în timp real ale clasamentului    | Opțională     |
| GET    | `/api/gamification/transfer`               | Obține istoricul transferurilor (paginare)        | Obligatorie   |
| POST   | `/api/gamification/transfer`               | Trimite tokenuri unui alt utilizator              | Obligatorie   |
| GET    | `/api/gamification/invite`                 | Listează codurile mele de invitație               | Obligatorie   |
| POST   | `/api/gamification/invite`                 | Generează un nou cod de invitație                 | Obligatorie   |
| DELETE | `/api/gamification/invite`                 | Revocă un cod de invitație                        | Obligatorie   |
| POST   | `/api/gamification/invite/redeem`          | Revendică un cod de invitație                     | Obligatorie   |
| GET    | `/api/gamification/servers`                | Listează serverele comunității                    | Obligatorie   |
| POST   | `/api/gamification/servers`                | Se conectează la un server al comunității         | Obligatorie   |
| DELETE | `/api/gamification/servers`                | Se deconectează de la un server al comunității    | Obligatorie   |
| POST   | `/api/gamification/federation/score`       | Trimite scorul către serverul la distanță         | Federație     |
| GET    | `/api/gamification/federation/leaderboard` | Preia clasamentul de la serverul la distanță      | Federație     |
| GET    | `/api/gamification/notifications`          | Notificări SSE pentru insigne/creșteri de nivel   | Obligatorie   |
| GET    | `/api/gamification/anomalies`              | Vizualizează rapoartele de anomalii (admin)       | Administrator |
| POST   | `/api/gamification/rotate`                 | Rotește secretele tokenurilor de invitație        | Obligatorie   |

### Exemple de cereri/răspunsuri

**POST /api/gamification/transfer**

```json
// Cerere
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// Răspuns 200
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

// Răspuns 400 (fonduri insuficiente)
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

## Instrumente MCP (8)

Înregistrate în `open-sse/mcp-server/` alături de instrumentele existente. Limitate la
domeniul de permisiuni `gamification`.

| Instrument                 | Descriere                                                  | Schemă de intrare            |           |
| -------------------------- | ---------------------------------------------------------- | ---------------------------- | --------- |
| `gamification_leaderboard` | Obține clasamentul pentru un domeniu/o perioadă            | `{ scope, period?, limit? }` |
| `gamification_rank`        | Obține poziția apelantului și vecinii săi                  | `{ scope }`                  |
| `gamification_profile`     | Obține rezumatul XP-ului, nivelului, titlului și seriei    | `{}`                         |
| `gamification_badges`      | Listează insignele obținute sau toate definițiile          | `{ earned?: boolean }`       |
| `gamification_transfer`    | Trimite tokenuri unui alt utilizator                       | `{ to, amount }`             |
| `gamification_invite`      | Generează sau listează codurile de invitație               | `{ action: "create"          | "list" }` |
| `gamification_servers`     | Listează sau conectează servere ale comunității            | `{ action, token? }`         |
| `gamification_anomalies`   | Afișează rapoartele de anomalii (domeniu de administrator) | `{ limit?, since? }`         |

---

## Pagini ale panoului de control

### `/dashboard/leaderboard`

- Afișare pe podium (primii 3, cu avatare și XP).
- Selector de domeniu: Global / Săptămânal / Lunar / Tokenuri partajate / Contribuții.
- Tabel paginat (25 pe pagină) cu poziție, nume, scor, nivel și titlu.
- Actualizări SSE în timp real — schimbările de poziție sunt animate.
- Utilizatorul curent este evidențiat în tabel printr-un rând fix „Poziția ta”.

### `/dashboard/profile`

- Bară de progres XP cu nivelul curent și pragul nivelului următor.
- Insigna titlului este afișată în mod vizibil.
- Galerie de insigne — insignele obținute împreună cu data obținerii, iar cele neobținute sunt estompate
  (insignele ascunse afișează „???” până la obținere).
- Contor al seriei cu pictograma unei flăcări; calendar al seriei (ultimele 30 de zile).
- Grafic al istoricului XP (XP zilnic în ultimele 30 de zile).

### `/dashboard/tokens`

- Soldul de tokenuri (afișat vizibil în partea de sus a paginii).
- Formular de transfer: destinatar, sumă, dialog de confirmare.
- Tabel cu istoricul transferurilor și filtre (trimise/primite/toate).
- Secțiune de invitații: coduri active, generarea unuia nou, link de partajare.
- Servere ale comunității: listă cu starea de funcționare, conectare/deconectare.

### `/dashboard/gamification/admin`

- Listă de anomalii cu severitate, utilizator, marcaj temporal și scor z.
- Vizualizator al jurnalului de audit cu filtre (tip de acțiune, utilizator, interval de date).
- Statistici de sistem: XP total acordat, utilizatori activi, rate de obținere a insignelor.
- Prezentare generală a stării serverelor federate.

---

## Integrarea în fluxul de procesare

### Punct de integrare

Gamificarea este conectată la fluxul de procesare a solicitărilor într-un singur punct din
`open-sse/handlers/chatCore.ts`:

```typescript
// După ce răspunsul este trimis clientului:
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
    // Lansare fără așteptarea rezultatului: se înregistrează în jurnal, dar nu se propagă niciodată către client
  });
});
```

### Tipuri de evenimente

| Tip de eveniment    | Momentul emiterii                                                            |
| ------------------- | ---------------------------------------------------------------------------- |
| `request.completed` | Răspuns LLM trimis cu succes                                                 |
| `provider.switch`   | Furnizor schimbat (se ia în calcul revenirea la o alternativă a combinației) |
| `combo.created`     | Noua configurație de combinație a fost salvată                               |
| `combo.used`        | Ținta combinației a fost atinsă cu succes                                    |
| `badge.earned`      | Evaluarea insignelor a găsit o potrivire                                     |
| `streak.milestone`  | Pragul seriei a fost depășit                                                 |
| `transfer.sent`     | Transferul de tokenuri a fost finalizat                                      |
| `referral.redeemed` | Codul de invitație a fost valorificat cu succes                              |
| `compression.used`  | A fost aplicată comprimarea promptului                                       |
| `skill.executed`    | Execuția abilității a fost finalizată                                        |
| `model.first_use`   | Modelul nu a fost utilizat în ultimele 7 zile                                |

### Garanția execuției neblocante

Modelul `setImmediate` + `.catch(() => {})` garantează:

1. Răspunsul este trimis integral înainte de executarea gamificării.
2. Erorile de gamificare nu sunt niciodată expuse clientului.
3. Procesarea evenimentului rulează în următoarea micro-sarcină, nu în linie.

---

## Securitate

### Model de amenințări

| Amenințare                                             | Măsură de protecție                                                         |
| ------------------------------------------------------ | --------------------------------------------------------------------------- |
| Creșterea artificială a scorului                       | Calcularea XP exclusiv pe server; clienții trimit acțiuni, nu scoruri       |
| Atacuri de reluare                                     | Chei de idempotentă pentru transferuri; deduplicarea jurnalului de audit    |
| Fraude la transferuri                                  | Registru contabil în partidă dublă; tranzacții atomice; limite de frecvență |
| Auto-recomandare                                       | Verificarea încrucișată a `api_key_id` la revendicare                       |
| Manipularea clasamentului                              | Detectarea anomaliilor prin scor Z; panou de administrare pentru anomalii   |
| Furtul tokenului de federare                           | Stocare cu hash SHA-256; tokenul în clar este afișat o singură dată         |
| Atacuri prin forță brută asupra codurilor de invitație | Limitarea frecvenței la endpointul de revendicare; entropie de 8 caractere  |
| XSS în numele afișate                                  | Numele afișate sunt igienizate; intrările din clasament sunt escapate       |
| Atacuri de temporizare asupra hashurilor               | `crypto.timingSafeEqual` pentru compararea hashurilor tokenurilor           |

### Cerințe de autentificare

- **Public** (fără autentificare): `GET /leaderboard`, `GET /stream` (clasamente
  doar pentru citire).
- **Cheie API obligatorie**: toate operațiunile de scriere, profilul, transferurile și invitațiile.
- **Doar pentru administratori**: panoul de anomalii, vizualizatorul jurnalului de audit.
- **Federare**: cale de autentificare separată care utilizează tokenul în clar în antetul
  `Authorization`, validat în raport cu hashul SHA-256 stocat.

---

## Testare

### Fișiere de testare

Toate testele utilizează executorul de teste nativ din Node.js (`node --import tsx/esm --test`).

| Fișier de testare                             | Acoperă                                                   | Teste |
| --------------------------------------------- | --------------------------------------------------------- | ----- |
| `tests/unit/gamification/xp.test.ts`          | Calcularea XP, curba nivelurilor, titluri                 | 8     |
| `tests/unit/gamification/badges.test.ts`      | Verificarea criteriilor insignelor, acordarea lor         | 10    |
| `tests/unit/gamification/streaks.test.ts`     | Logica seriilor, praguri, cazuri-limită                   | 7     |
| `tests/unit/gamification/leaderboard.test.ts` | Calcularea poziției, paginare, rotație                    | 8     |
| `tests/unit/gamification/sharing.test.ts`     | Transferuri, sold, idempotentă                            | 9     |
| `tests/unit/gamification/invites.test.ts`     | Creare, revendicare, expirare, auto-recomandare           | 7     |
| `tests/unit/gamification/antiCheat.test.ts`   | Limite de frecvență, scor Z, jurnalizarea auditului       | 6     |
| `tests/unit/gamification/events.test.ts`      | Emiterea evenimentelor, distribuire, gestionarea erorilor | 5     |

### Rularea testelor

```bash
# Toate testele de gamificare
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# Un singur fișier de testare
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Cerințe privind acoperirea

Conform `CONTRIBUTING.md` — toate modulele noi trebuie să aibă:

- Acoperirea ramificațiilor >= 80%.
- Fiecare funcție publică testată cel puțin o dată.
- Căile de eroare testate (sold insuficient, coduri expirate, limite de frecvență).

---

## Structura fișierelor

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # Toate cele 8 tabele + indecși
      gamification.ts                  # Modul CRUD pentru domeniu
    gamification/
      xp.ts                           # Calcularea XP, curba nivelurilor, titluri
      badges.ts                       # Definiții pentru insigne, criterii, evaluare
      streaks.ts                      # Urmărirea seriilor zilnice
      leaderboard.ts                  # Calcularea clasamentului, SSE, rotație
      antiCheat.ts                    # Limitarea frecvenței, scor z, audit
      sharing.ts                      # Registrul transferurilor de tokenuri
      invites.ts                      # Coduri de invitație/valorificare
      servers.ts                      # Federarea serverelor comunității
      events.ts                       # Emițător de evenimente (punct de integrare)
      notifications.ts                # Flux SSE de notificări
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST clasament
        leaderboard/stream/route.ts   # Actualizări SSE în timp real
        transfer/route.ts             # Transferuri GET/POST
        invite/route.ts               # Coduri de invitație GET/POST/DELETE
        invite/redeem/route.ts        # POST pentru valorificarea codului
        servers/route.ts              # Servere GET/POST/DELETE
        federation/score/route.ts     # POST pentru trimiterea scorului
        federation/leaderboard/route.ts # GET pentru preluarea clasamentului
        notifications/route.ts        # Notificări SSE
        anomalies/route.ts            # GET pentru rapoartele de anomalii
        rotate/route.ts               # POST pentru rotirea secretelor
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Pagina clasamentului
        profile/page.tsx               # Pagina pentru XP/insigne/serii
        tokens/page.tsx                # Pagina pentru sold/transferuri/invitații
        gamification/admin/page.tsx    # Monitorizarea administrativă a anomaliilor
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
    GAMIFICATION.md                    # Acest document
```

---

## Strategia de migrare

### Faza 1: Nucleul backendului (PR 1)

- Migrarea `060_create_gamification.sql` (8 tabele).
- `src/lib/db/gamification.ts` (modulul domeniului).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- Punct de integrare în `chatCore.ts`.
- Teste unitare pentru XP, serii și evenimente.

### Faza 2: Insigne și clasament (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Definițiile insignelor în constante.
- Rute API pentru clasament + flux SSE.
- Teste unitare pentru insigne și clasament.

### Faza 3: Partajare și invitații (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- Rute API pentru transferuri + invitații.
- Teste unitare pentru partajare, invitații și prevenirea trișării.

### Faza 4: Federație și panou de control (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- Rute API pentru federație.
- Pagini ale panoului de control (clasament, profil, tokenuri, administrare).
- Înregistrarea instrumentelor MCP.

---

## Considerații viitoare

- **Evenimente sezoniere**: seturi de insigne disponibile pentru o perioadă limitată și sezoane ale clasamentului.
- **Clasamente pe echipe**: grupați utilizatorii după organizație sau combo.
- **Multiplicatori XP**: creșteți XP-ul în perioadele promoționale.
- **Partajarea realizărilor**: generați carduri cu insigne care pot fi distribuite (imagini OpenGraph).
- **Notificări push pe mobil**: notificări bazate pe webhook pentru evenimente legate de insigne/niveluri.
- **API pentru clasament**: API public pentru integrări cu terțe părți.
