---
title: "System grywalizacji i rankingów"
version: 3.8.40
lastUpdated: 2026-06-28
---

# System grywalizacji i rankingów

> **Source of truth:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Last updated:** 2026-06-28 — v3.8.40

OmniRoute zawiera lokalną warstwę grywalizacji, która nagradza użytkowników za
aktywność na platformie — wysyłanie zapytań, przełączanie providerów, tworzenie
combo, udostępnianie tokenów i wkład w społeczność. Cały stan żyje w
SQLite; federacja z serwerami społecznościowymi jest opcjonalna i oparta na push.

System jest zaprojektowany tak, by zapewniać **zerowe opóźnienie na ścieżce gorącej** — zdarzenia
grywalizacji są wysyłane w trybie fire-and-forget z potoku żądań i nigdy nie blokują
odpowiedzi LLM.

---

## Przegląd

### Cel

Zwiększyć zaangażowanie i retencję użytkowników przez widoczny postęp (XP,
poziomy, odznaki), społeczny dowód (rankingi) oraz zachęty ekonomiczne (udostępnianie
tokenów, nagrody za zaproszenia).

### Zakres

| Feature           | Description                                                              |
| ----------------- | ------------------------------------------------------------------------ |
| XP & Levels       | Zdobywaj XP za akcje; awansuj wzdłuż krzywej wielomianowej               |
| Badges            | 20+ osiągnięć w 5 kategoriach z 4 poziomami rzadkości                    |
| Streaks           | Śledzenie codziennej aktywności z bieżącą/najdłuższą serią               |
| Leaderboards      | Zakresy: globalny, tygodniowy, miesięczny, udostępnianie tokenów i wkład |
| Token Sharing     | Transfer kredytów między użytkownikami przez księgę double-entry         |
| Invite & Redeem   | Kody polecające z przechowywaniem hashowanym SHA-256                     |
| Community Servers | Federacja z zewnętrznymi instancjami OmniRoute                           |
| Anti-Cheat        | Punktacja po stronie serwera, rate limiting, detekcja anomalii z-score   |

### Zasady projektowe

1. **Local-first** — cały stan w SQLite, bez wymaganych usług zewnętrznych.
2. **Non-blocking** — zdarzenia są fire-and-forget; ścieżka odpowiedzi LLM
   nigdy nie jest opóźniana przez logikę grywalizacji.
3. **Server-authoritative** — XP jest liczone wyłącznie po stronie serwera; klienci nie mogą
   zawyżać wyników.
4. **Privacy-respecting** — udział w rankingu jest opcjonalny; użytkownicy mogą
   ukryć profil.
5. **Federation-ready** — serwery społecznościowe mogą pushować wyniki przez podpisane API;
   synchronizacja jest nadpisująca, nie addytywna.

---

## Architektura

### Przepływ wysokopoziomowy

```
Client Request
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (existing pipeline) ...
      → upstream response sent to client
      → setImmediate (fire-and-forget):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

Emitter zdarzeń jest jedynym punktem integracji. `chatCore.ts` wywołuje
`emitGamificationEvent()` po wysłaniu odpowiedzi; moduł zdarzeń rozprowadza
wywołania do podsystemów XP, streak, badge, leaderboard i anti-cheat.

### Graf zależności modułów

```
src/lib/gamification/
  events.ts          ← entry point (called from chatCore.ts)
    ├── xp.ts        ← XP calculation & level resolution
    ├── streaks.ts   ← daily active streak tracking
    ├── badges.ts    ← badge criteria evaluation
    ├── leaderboard.ts ← rank computation & SSE broadcasting
    ├── antiCheat.ts ← rate limiting & anomaly detection
    ├── sharing.ts   ← token transfer ledger
    ├── invites.ts   ← invite/redeem code management
    ├── servers.ts   ← community server federation
    └── notifications.ts ← SSE notification stream

src/lib/db/
  gamification.ts    ← all CRUD operations (8 tables)

src/app/api/gamification/
  leaderboard/       ← GET rankings, POST manual refresh
  leaderboard/stream ← SSE real-time updates
  transfer/          ← GET history, POST send tokens
  invite/            ← GET/POST codes, DELETE revoke
  invite/redeem/     ← POST redeem a code
  servers/           ← GET/POST/DELETE community servers
  federation/score/  ← POST push score to server
  federation/leaderboard/ ← GET pull leaderboard from server
  notifications/     ← SSE badge/level-up notifications
  anomalies/         ← GET anomaly reports (admin)
  rotate/            ← POST rotate invite token secrets
```

---

## Warstwa danych

### Tabele bazy danych

Wszystkie tabele żyją w głównej bazie SQLite OmniRoute, tworzonej przez migrację
`060_create_gamification.sql`. Journaling WAL jest dziedziczony z singletona
`getDbInstance()` w `src/lib/db/core.ts`.

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

### Moduł domenowy: `src/lib/db/gamification.ts`

Podąża za standardowym wzorcem OmniRoute — importuje `getDbInstance()` z
`core.ts`, eksportuje typowane funkcje CRUD. Bez surowego SQL w handlerach tras.

Kluczowe funkcje:

| Function                   | Description                                                        |
| -------------------------- | ------------------------------------------------------------------ |
| `upsertLeaderboardEntry()` | Wstawienie lub aktualizacja wyniku dla (api_key_id, scope, period) |
| `getLeaderboard()`         | Stronicowane rankingi dla danego scope/period                      |
| `getUserLevel()`           | Pobranie lub utworzenie rekordu poziomu użytkownika                |
| `updateUserLevel()`        | Atomowe ustawienie XP, poziomu i tytułu                            |
| `getBadgeDefinitions()`    | Wszystkie definicje odznak (opcjonalnie filtrowane)                |
| `getUserBadges()`          | Odznaki zdobyte przez użytkownika                                  |
| `awardBadge()`             | Wstawienie zdobycia odznaki (idempotentne na badge_id)             |
| `logXpAction()`            | Dopisanie do xp_audit_log                                          |
| `getXpAuditLog()`          | Stronicowana historia audytu użytkownika                           |
| `insertLedgerEntry()`      | Transfer double-entry (w transakcji)                               |
| `getBalance()`             | Suma otrzymanych minus wysłanych dla użytkownika                   |
| `getTransferHistory()`     | Stronicowany dziennik transferów                                   |
| `createInviteToken()`      | Wstawienie kodu zaproszenia + zahashowanego tokenu                 |
| `redeemInviteToken()`      | Wyszukanie po kodzie, walidacja, inkrementacja uses                |
| `upsertCommunityServer()`  | Rejestracja lub aktualizacja serwera federacji                     |
| `getCommunityServers()`    | Lista serwerów użytkownika                                         |
| `deleteCommunityServer()`  | Usunięcie rejestracji serwera                                      |

---

## System XP / poziomów

**File:** `src/lib/gamification/xp.ts`

### Krzywa poziomów

XP wymagane do osiągnięcia poziomu `n` podąża za krzywą wielomianową:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Level | XP to Next | Cumulative XP | Title    |
| ----- | ---------- | ------------- | -------- |
| 1     | 100        | 100           | Beginner |
| 5     | 1,118      | 2,415         | Beginner |
| 10    | 3,162      | 10,523        | Explorer |
| 25    | 12,500     | 86,024        | Explorer |
| 50    | 35,355     | 345,529       | Expert   |
| 75    | 64,952     | 948,683       | Master   |
| 100   | 100,000    | 2,050,000     | Legend   |

### Tytuły

| Level Range | Title    |
| ----------- | -------- |
| 1 – 9       | Beginner |
| 10 – 24     | Explorer |
| 25 – 49     | Expert   |
| 50 – 74     | Master   |
| 75 – 100    | Legend   |

### Nagrody XP

| Action             | XP  | Description                                                       |
| ------------------ | --- | ----------------------------------------------------------------- |
| `request`          | 1   | Za każde udane żądanie LLM                                        |
| `provider_switch`  | 5   | Przełączenie na innego providera                                  |
| `combo_create`     | 10  | Utworzenie nowej konfiguracji combo                               |
| `combo_use`        | 2   | Użycie combo (za każde trafienie targetu)                         |
| `badge_earned`     | 25  | Zdobycie dowolnej odznaki                                         |
| `streak_milestone` | 15  | Osiągnięcie milowego kamienia serii (7, 14, 30, 60, 90, 180, 365) |
| `referral`         | 50  | Udane polecenie nowego użytkownika                                |
| `token_share`      | 5   | Udostępnienie tokenów innemu użytkownikowi                        |
| `daily_login`      | 3   | Pierwsze żądanie dnia                                             |
| `model_diversity`  | 3   | Użycie modelu nieużywanego przez ostatnie 7 dni                   |
| `compression_use`  | 2   | Użycie kompresji promptu                                          |
| `skill_use`        | 2   | Wykonanie skillu przez MCP                                        |

### Przepływ przyznawania

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. Wyszukaj `XP_REWARDS[action]`, by uzyskać kwotę XP.
2. Przejdź przez `checkRateLimit()` (anti-cheat: max 1000 XP/min na klucz).
3. Otwórz transakcję:
   - Odczytaj bieżący wiersz `user_levels`.
   - Dodaj XP; przelicz poziom przez `levelFromXp(totalXp)`.
   - Jeśli poziom się zmienił, ustaw `levelUp = true`.
   - Zaktualizuj wiersz `user_levels`.
   - Wstaw do `xp_audit_log`.
4. Zwróć wynik. Caller obsługuje powiadomienia.

### Helper: `levelFromXp(totalXp)`

Iteruje poziomy 1..100, sumując `xp_for_level(n)`, aż skumulowane XP
przekroczy `totalXp`. Zwraca najwyższy poziom, którego próg został spełniony.
To jest O(100) — akceptowalne, bo poziomy są ograniczone do 100.

---

## System odznak

**File:** `src/lib/gamification/badges.ts`

### Kategorie

| Category       | Description                         | Example Badges                    |
| -------------- | ----------------------------------- | --------------------------------- |
| `usage`        | Kamienie milowe oparte na wolumenie | First Request, 1K Requests, 100K  |
| `sharing`      | Udostępnianie tokenów i polecenia   | First Share, Generous (10 shares) |
| `contribution` | Zaangażowanie społecznościowe       | Combo Creator, Provider Explorer  |
| `streak`       | Konsekwencja w czasie               | Week Warrior, Monthly Devoted     |
| `rare`         | Trudne lub ukryte osiągnięcia       | Early Adopter, Bug Reporter       |

### Rzadkości

| Rarity      | Color | Probability Hint         |
| ----------- | ----- | ------------------------ |
| `common`    | Gray  | Większość użytkowników   |
| `uncommon`  | Green | Aktywni użytkownicy      |
| `rare`      | Blue  | Zaangażowani użytkownicy |
| `legendary` | Gold  | Top 1%                   |

### Typy kryteriów

| Type           | Field        | Description                                        |
| -------------- | ------------ | -------------------------------------------------- |
| `action_count` | `count`      | Wykonaj akcję N razy (np. 1000 requestów)          |
| `streak`       | `days`       | Utrzymaj serię przez N kolejnych dni               |
| `unique_count` | `field`, `n` | Użyj N unikalnych wartości (np. 10 różnych modeli) |
| `rank`         | `scope`, `n` | Osiągnij rangę N w zakresie rankingu               |
| `first`        | —            | Bądź pierwszym, który wykona akcję                 |
| `hidden`       | (varies)     | Kryteria niewidoczne do momentu zdobycia           |

Definicje odznak są przechowywane w `badge_definitions` jako JSON `criteria`:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Przepływ ewaluacji

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # all definitions
    → getUserBadges(apiKeyId)         # already earned (skip)
    → for each unearned badge:
       → matchesCriteria(badge, event, userState)
       → if match: awardBadge(apiKeyId, badgeId)
         → return notification payload
```

Ewaluacja jest **sterowana zdarzeniami** — uruchamia się po każdym zdarzeniu grywalizacji, ale
sprawdza tylko odznaki, których `criteria.type` pasuje do akcji zdarzenia. To
utrzymuje ewaluację szybką (< 5ms dla większości zdarzeń).

### `matchesCriteria(badge, event, userState)`

| Criteria Type  | Check                                                        |
| -------------- | ------------------------------------------------------------ |
| `action_count` | `getActionCount(apiKeyId, action) >= count`                  |
| `streak`       | `getCurrentStreak(apiKeyId) >= days`                         |
| `unique_count` | `getUniqueCount(apiKeyId, field) >= n`                       |
| `rank`         | `getRank(apiKeyId, scope) <= n`                              |
| `first`        | Brak wcześniejszego wpisu `xp_audit_log` dla tego typu akcji |
| `hidden`       | Deleguje do odpowiedniego pod-sprawdzenia                    |

### Wbudowane odznaki (20+)

<details>
<summary>Pełna lista odznak</summary>

| Badge               | Category     | Rarity    | Criteria                     |
| ------------------- | ------------ | --------- | ---------------------------- |
| First Steps         | usage        | common    | 1 request                    |
| Getting Warmed Up   | usage        | common    | 100 requests                 |
| Power User          | usage        | uncommon  | 1,000 requests               |
| Centurion           | usage        | rare      | 10,000 requests              |
| OmniPower           | usage        | legendary | 100,000 requests             |
| Provider Hopper     | contribution | common    | Use 5 different providers    |
| Provider Master     | contribution | uncommon  | Use 20 different providers   |
| Combo Architect     | contribution | uncommon  | Create 5 combos              |
| Combo Grandmaster   | contribution | rare      | Create 25 combos             |
| First Share         | sharing      | common    | 1 token transfer             |
| Generous            | sharing      | uncommon  | 10 token transfers           |
| Philanthropist      | sharing      | rare      | Transfer 10,000 tokens total |
| Referrer            | sharing      | common    | 1 successful referral        |
| Network Builder     | sharing      | uncommon  | 10 successful referrals      |
| Week Warrior        | streak       | uncommon  | 7-day streak                 |
| Monthly Devoted     | streak       | rare      | 30-day streak                |
| Unstoppable         | streak       | legendary | 365-day streak               |
| Early Adopter       | rare         | legendary | Join during beta period      |
| Compression Pioneer | rare         | uncommon  | Use compression 100 times    |
| Skill Collector     | rare         | rare      | Use 10 different skills      |
| Model Explorer      | contribution | uncommon  | Use 15 different models      |

</details>

---

## Tracker serii (streak)

**File:** `src/lib/gamification/streaks.ts`

### Model danych

Serie są przechowywane w tabeli `key_value` (współdzielona tabela narzędziowa) pod
kluczami w przestrzeni nazw:

| Key                           | Value                            | Description         |
| ----------------------------- | -------------------------------- | ------------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Dane aktywnej serii |

### Logika

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Odczytaj rekord serii z `key_value`.
2. Sparsuj `{current}`, `{longest}`, `{lastDate}` (ciąg daty ISO).
3. Jeśli `lastDate === today` — bez zmian (już policzone dziś).
4. Jeśli `lastDate === yesterday` — inkrementuj `current`; zaktualizuj `longest` w razie potrzeby.
5. Jeśli `lastDate < yesterday` — zresetuj `current = 1` (seria przerwana).
6. Zapisz zaktualizowany rekord.
7. Sprawdź kamienie milowe: 7, 14, 30, 60, 90, 180, 365 dni. Jeśli przekroczono, ustaw
   `milestone = true` (caller przyznaje XP i sprawdza odznaki).

### Przypadki brzegowe

- **Timezone**: serie używają dat UTC (`new Date().toISOString().slice(0, 10)`).
  To zamierzone — jedna kanoniczna strefa czasowa zapobiega nadużyciom przez
  skakanie między strefami.
- **New users**: brak rekordu serii; pierwsze żądanie tworzy go z
  `current=1, longest=1, lastDate=today`.
- **Multiple requests per day**: tylko pierwsze żądanie dnia UTC
  inkrementuje serię.

---

## Ranking (Leaderboard)

**File:** `src/lib/gamification/leaderboard.ts`

### Zakresy

| Scope           | Period  | Description                                      |
| --------------- | ------- | ------------------------------------------------ |
| `global`        | `all`   | Skumulowane XP wszech czasów                     |
| `weekly`        | `week`  | XP zdobyte w bieżącym tygodniu UTC (pn–nd)       |
| `monthly`       | `month` | XP zdobyte w bieżącym miesiącu UTC               |
| `tokens_shared` | `all`   | Suma tokenów przekazanych innym                  |
| `contributions` | `all`   | Utworzone combo + użyte providery + użyte skille |

### Obliczanie rangi

Rangi są **liczone w momencie odczytu**, nie przechowywane. To unika nieaktualnych danych rangi
i eliminuje potrzebę okresowych zadań przeliczania rang.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

Wzorzec zapytania:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### Rotacja okresów

Tygodniowe i miesięczne rankingi rotują automatycznie:

1. **Archive**: na granicy okresu skopiuj bieżące wpisy do
   `leaderboard_archive` z etykietą okresu.
2. **Reset**: usuń wpisy dla wygasłego okresu.
3. **Trigger**: sprawdzane przy każdym wywołaniu `updateLeaderboard()`; pierwsze żądanie
   nowego okresu uruchamia rotację.

To gwarantuje, że tablice tygodniowe resetują się w każdy poniedziałek o 00:00 UTC, a miesięczne

1. dnia każdego miesiąca.

### Aktualizacje SSE w czasie rzeczywistym

**Endpoint:** `GET /api/gamification/stream`

```
Client → GET /api/gamification/stream
  → SSE connection established
  → Server sends top-10 leaderboard snapshot immediately
  → Every 5 seconds: push updated top-10 if changed
  → Every 15 seconds: heartbeat comment (": heartbeat\n\n")
  → Client disconnects → cleanup (remove listener)
```

Format zdarzenia:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

Menedżer SSE śledzi podłączonych klientów per scope i wysyła aktualizacje
tylko wtedy, gdy dane rankingu faktycznie się zmieniły od ostatniego pusha.

---

## Udostępnianie tokenów

**File:** `src/lib/gamification/sharing.ts`

### Księga double-entry

Każdy transfer tworzy dwa wiersze w `token_ledger`:

| Row    | `from_key_id` | `to_key_id` | `amount` |
| ------ | ------------- | ----------- | -------- |
| Debit  | sender        | receiver    | +amount  |
| Credit | receiver      | sender      | -amount  |

Czekaj — konwencja jest taka:

| Row     | `from_key_id` | `to_key_id` | `amount` | Meaning            |
| ------- | ------------- | ----------- | -------- | ------------------ |
| Send    | sender        | receiver    | +amount  | Odpływ od nadawcy  |
| Receive | receiver      | sender      | +amount  | Dopływ do odbiorcy |

Saldo jest liczone jako:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Przepływ transferu

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Validate**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **Idempotency**: sprawdź, czy `idempotency_key` już istnieje w księdze.
   Jeśli tak, zwróć wynik z cache.
3. **Transaction** (pojedyncza transakcja SQLite):
   a. Policz saldo nadawcy.
   b. Jeśli `balance < amount`, przerwij (niewystarczające środki).
   c. Wstaw wiersz send (`from=sender, to=receiver, amount`).
   d. Wstaw wiersz receive (`from=receiver, to=sender, amount`).
4. **Rate limit**: sprawdź limit transferów nadawcy (max 10 transferów/min).
5. **Event**: wyemituj zdarzenie grywalizacji `token_share` dla XP + ewaluacji odznak.
6. Zwróć `{ success: true, balance: newBalance }`.

### Ograniczenia częstotliwości

- Max 10 transferów na minutę na klucz API.
- Max 10 000 tokenów na pojedynczy transfer.
- Max 100 000 tokenów przelanych dziennie na klucz API.

---

## Tokeny zaproszeń i redeem

**File:** `src/lib/gamification/invites.ts`

### Format kodu

- **Code**: 8-znakowy alfanumeryczny (np. `A3K9-X7M2`), czytelny dla człowieka,
  wyświetlany użytkownikowi.
- **Token**: 32-bajtowy losowy token, przechowywany jako hash SHA-256. Używany do
  programowego redeem (np. linki URL).

### Przechowywanie

| Column       | Value                        |
| ------------ | ---------------------------- |
| `code`       | `A3K9X7M2` (unique, indexed) |
| `token_hash` | SHA-256(raw_token)           |

Surowy token jest zwracany użytkownikowi dokładnie raz w momencie utworzenia. OmniRoute
nigdy go potem nie przechowuje ani nie wyświetla — pozostaje tylko hash.

### Zapobieganie self-referral

Gdy użytkownik redeemuje kod, system sprawdza:

1. Kod należy do innego `api_key_id`.
2. Redeemujący użytkownik nie redeemował wcześniej żadnego kodu od tego samego
   polecającego (join na `invite_tokens` + dziennik redeemów).

Jeśli którekolwiek sprawdzenie zawiedzie, redeem jest odrzucany z jasnym komunikatem błędu.

### Wygaśnięcie i limity

- Domyślne `max_uses`: 10 (konfigurowalne przy tworzeniu).
- Domyślne `expires_at`: 30 dni od utworzenia.
- Wygasłe lub wyczerpane kody zwracają HTTP 410 Gone.

---

## Federacja serwerów społecznościowych

**File:** `src/lib/gamification/servers.ts`

### Połączenie

Serwer społecznościowy jest rejestrowany przez token zaproszenia wystawiony przez zdalny
serwer. Lokalna instancja:

1. Odbiera token zaproszenia (np. wklejony w dashboard).
2. Wywołuje `POST /api/gamification/federation/leaderboard` na zdalnym serwerze,
   by zwalidować token i pobrać bieżący ranking.
3. Zapisuje rekord serwera ze `status: connected`.

### Model synchronizacji

Federacja używa **overwrite sync**, nie addytywnej:

```
Local Instance                Community Server
      │                              │
      ├── push score ───────────────►│  POST /federation/score
      │   { api_key_id, score }      │  (server validates token hash)
      │                              │
      ├── pull leaderboard ─────────►│  GET /federation/leaderboard
      │◄── top-N entries ────────────┤  (overwrites local cache)
      │                              │
      └── health check ─────────────►│  GET /federation/health
          (every 60s, timeout 5s)    │
```

### Auth

Żądania federacji zawierają:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

Zdalny serwer haszuje token i wyszukuje pasujący
wiersz `community_servers`. To unika przesyłania przechowywanego hasha.

### Monitorowanie zdrowia

Każdy rekord serwera śledzi:

| Field       | Description                                        |
| ----------- | -------------------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable`             |
| `last_sync` | Znacznik czasu ISO ostatniej udanej synchronizacji |
| `failures`  | Kolejne nieudane health checki                     |

Po 5 kolejnych niepowodzeniach status zmienia się na `unreachable` i synchronizacja jest
wstrzymana do udanego ręcznego health checka.

---

## Anti-Cheat

**File:** `src/lib/gamification/antiCheat.ts`

### Punktacja po stronie serwera

Wszystkie obliczenia XP dzieją się w `src/lib/gamification/xp.ts`. Klienci nigdy
nie przesyłają wyniku — przesyłają akcje, a serwer liczy XP.
Kolumna `leaderboard.score` jest zapisywalna tylko przez kod serwerowy.

### Rate limiting

| Limit                 | Value   | Scope        |
| --------------------- | ------- | ------------ |
| Max XP per minute     | 1,000   | Per API key  |
| Max transfers per min | 10      | Per API key  |
| Max transfer amount   | 10,000  | Per transfer |
| Max daily transfers   | 100,000 | Per API key  |

Limity używają okna przesuwnego w pamięci (ten sam wzorzec co
`RateLimitManager` w `open-sse/services/`). Przy restarcie procesu fallbackiem są
liczniki oparte na SQLite.

### Detekcja anomalii z-score

Dla każdego klucza API system utrzymuje rollingowe 7-dniowe okno XP zdobytego na
godzinę. Przy każdym przyznaniu XP:

1. Policz bieżącą godzinową stopę XP użytkownika.
2. Policz średnią populacji i odchylenie standardowe.
3. Oblicz `z = (user_rate - mean) / stddev`.
4. Jeśli `z > 3.0` (3 odchylenia standardowe), oznacz jako anomalię.

Anomalie są logowane do `xp_audit_log` z `action = 'anomaly_detected'`
i prezentowane na dashboardzie admina.

### Ślad audytu

Każde przyznanie XP, transfer, zdobycie odznaki i detekcja anomalii są logowane do
`xp_audit_log` z:

| Field        | Description                                   |
| ------------ | --------------------------------------------- |
| `api_key_id` | Kto                                           |
| `action`     | Co się stało (xp_award, transfer, anomaly, …) |
| `xp_awarded` | Kwota (0 dla zdarzeń nie-XP)                  |
| `metadata`   | JSON z kontekstem (typ akcji, target, …)      |
| `created_at` | Kiedy (ISO 8601)                              |

Admini mogą odpytać pełny ślad audytu przez `GET /api/gamification/anomalies`.

---

## Trasy API

Wszystkie trasy podążają za standardowym wzorcem OmniRoute:

```
Route → CORS preflight → Body validation (Zod) → Auth (extractApiKey)
  → Handler
```

### Endpointy

| Method | Path                                       | Description                                     | Auth       |
| ------ | ------------------------------------------ | ----------------------------------------------- | ---------- |
| GET    | `/api/gamification/leaderboard`            | Pobierz ranking (scope, period, stronicowanie)  | Optional   |
| POST   | `/api/gamification/leaderboard`            | Wymuś odświeżenie cache rankingu                | Required   |
| GET    | `/api/gamification/stream`                 | Aktualizacje rankingu SSE w czasie rzeczywistym | Optional   |
| GET    | `/api/gamification/transfer`               | Historia transferów (stronicowanie)             | Required   |
| POST   | `/api/gamification/transfer`               | Wyślij tokeny do innego użytkownika             | Required   |
| GET    | `/api/gamification/invite`                 | Lista moich kodów zaproszeń                     | Required   |
| POST   | `/api/gamification/invite`                 | Wygeneruj nowy kod zaproszenia                  | Required   |
| DELETE | `/api/gamification/invite`                 | Unieważnij kod zaproszenia                      | Required   |
| POST   | `/api/gamification/invite/redeem`          | Redeemuj kod zaproszenia                        | Required   |
| GET    | `/api/gamification/servers`                | Lista serwerów społecznościowych                | Required   |
| POST   | `/api/gamification/servers`                | Połącz z serwerem społecznościowym              | Required   |
| DELETE | `/api/gamification/servers`                | Rozłącz z serwerem społecznościowym             | Required   |
| POST   | `/api/gamification/federation/score`       | Push wyniku na zdalny serwer                    | Federation |
| GET    | `/api/gamification/federation/leaderboard` | Pull rankingu ze zdalnego serwera               | Federation |
| GET    | `/api/gamification/notifications`          | Powiadomienia SSE o odznakach/level-up          | Required   |
| GET    | `/api/gamification/anomalies`              | Raporty anomalii (admin)                        | Admin      |
| POST   | `/api/gamification/rotate`                 | Rotacja sekretów tokenów zaproszeń              | Required   |

### Przykłady request/response

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

// Response 400 (insufficient funds)
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

## Narzędzia MCP (8)

Zarejestrowane w `open-sse/mcp-server/` obok istniejących narzędzi. W zakresie
uprawnień `gamification`.

| Tool | Description | Input Schema |
| -------------------------- | ------------------------------------- | ---------------------------- | --------- |
| `gamification_leaderboard` | Pobierz ranking dla scope/period | `{ scope, period?, limit? }` |
| `gamification_rank` | Pobierz rangę wywołującego i sąsiadów | `{ scope }` |
| `gamification_profile` | Pobierz podsumowanie XP, poziomu, tytułu, serii | `{}` |
| `gamification_badges` | Lista zdobytych odznak lub wszystkich definicji | `{ earned?: boolean }` |
| `gamification_transfer` | Wyślij tokeny do innego użytkownika | `{ to, amount }` |
| `gamification_invite` | Generuj lub listuj kody zaproszeń | `{ action: "create"          | "list" }` |
| `gamification_servers` | Listuj lub połącz serwery społecznościowe | `{ action, token? }` |
| `gamification_anomalies` | Raporty anomalii (zakres admin) | `{ limit?, since? }` |

---

## Strony dashboardu

### `/dashboard/leaderboard`

- Wyświetlanie podium (top 3 z awatarami i XP).
- Selektor zakresu: Global / Weekly / Monthly / Tokens Shared / Contributions.
- Stronicowana tabela (25 na stronę) z rangą, nazwą, wynikiem, poziomem, tytułem.
- Aktualizacje SSE w czasie rzeczywistym — zmiany rang animują się.
- Bieżący użytkownik podświetlony w tabeli ze sticky wierszem „Your Rank”.

### `/dashboard/profile`

- Pasek postępu XP z bieżącym poziomem i progiem następnego poziomu.
- Odznaka tytułu wyświetlana w sposób wyróżniony.
- Galeria odznak — zdobyte z datą, niezdobyte wyszarzone
  (ukryte odznaki pokazują „???” do momentu zdobycia).
- Licznik serii z ikoną płomienia; kalendarz serii (ostatnie 30 dni).
- Wykres historii XP (dzienne XP z ostatnich 30 dni).

### `/dashboard/tokens`

- Saldo tokenów (wyróżnione, na górze strony).
- Formularz transferu: odbiorca, kwota, dialog potwierdzenia.
- Tabela historii transferów z filtrami (sent/received/all).
- Sekcja zaproszeń: aktywne kody, generowanie nowych, link do udostępnienia.
- Serwery społecznościowe: lista ze statusem zdrowia, connect/disconnect.

### `/dashboard/gamification/admin`

- Lista anomalii z severity, użytkownikiem, znacznikiem czasu, z-score.
- Przeglądarka dziennika audytu z filtrami (typ akcji, użytkownik, zakres dat).
- Statystyki systemu: łączne przyznane XP, aktywni użytkownicy, stopy zdobywania odznak.
- Przegląd zdrowia serwerów federacji.

---

## Integracja z potokiem

### Punkt integracji

Grywalizacja podpina się do potoku żądań w jednym punkcie w
`open-sse/handlers/chatCore.ts`:

```typescript
// After response is sent to client:
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
    // Fire-and-forget: log but never propagate to client
  });
});
```

### Typy zdarzeń

| Event Type          | When Emitted                                   |
| ------------------- | ---------------------------------------------- |
| `request.completed` | Wysłano udaną odpowiedź LLM                    |
| `provider.switch`   | Zmieniono providera (liczy się fallback combo) |
| `combo.created`     | Zapisano nową konfigurację combo               |
| `combo.used`        | Udana obsługa targetu combo                    |
| `badge.earned`      | Ewaluacja odznak znalazła dopasowanie          |
| `streak.milestone`  | Przekroczono próg serii                        |
| `transfer.sent`     | Ukończono transfer tokenów                     |
| `referral.redeemed` | Udany redeem kodu zaproszenia                  |
| `compression.used`  | Zastosowano kompresję promptu                  |
| `skill.executed`    | Ukończono wykonanie skillu                     |
| `model.first_use`   | Model nieużywany przez ostatnie 7 dni          |

### Gwarancja non-blocking

Wzorzec `setImmediate` + `.catch(() => {})` gwarantuje:

1. Odpowiedź jest w pełni wysłana, zanim uruchomi się grywalizacja.
2. Błędy grywalizacji nigdy nie wychodzą do klienta.
3. Przetwarzanie zdarzeń działa w następnym microtasku, nie inline.

---

## Bezpieczeństwo

### Model zagrożeń

| Threat                   | Mitigation                                                              |
| ------------------------ | ----------------------------------------------------------------------- |
| Score inflation          | XP liczone tylko po stronie serwera; klienci wysyłają akcje, nie wyniki |
| Replay attacks           | Klucze idempotencji na transferach; dedup dziennika audytu              |
| Transfer fraud           | Księga double-entry; atomowe transakcje; rate limits                    |
| Self-referral            | Cross-check `api_key_id` przy redeemie                                  |
| Leaderboard manipulation | Detekcja anomalii z-score; dashboard anomalii admina                    |
| Federation token theft   | Przechowywanie hashowane SHA-256; surowy token pokazywany tylko raz     |
| Brute force invite codes | Rate limiting na endpoincie redeem; entropia 8 znaków                   |
| XSS in display names     | Sanityzacja display names; escapowanie wpisów rankingu                  |
| Timing attacks on hashes | `crypto.timingSafeEqual` przy porównaniu hashy tokenów                  |

### Wymagania auth

- **Public** (bez auth): `GET /leaderboard`, `GET /stream` (rankingi
  tylko do odczytu).
- **API key required**: wszystkie operacje zapisu, profil, transfery, zaproszenia.
- **Admin only**: dashboard anomalii, przeglądarka dziennika audytu.
- **Federation**: osobna ścieżka auth z surowym tokenem w nagłówku `Authorization`,
  walidowanym względem przechowywanego hasha SHA-256.

---

## Testowanie

### Pliki testowe

Wszystkie testy używają natywnego test runnera Node.js (`node --import tsx/esm --test`).

| Test File                                     | Covers                                        | Tests |
| --------------------------------------------- | --------------------------------------------- | ----- |
| `tests/unit/gamification/xp.test.ts`          | Obliczanie XP, krzywa poziomów, tytuły        | 8     |
| `tests/unit/gamification/badges.test.ts`      | Dopasowanie kryteriów odznak, przyznawanie    | 10    |
| `tests/unit/gamification/streaks.test.ts`     | Logika serii, kamienie milowe, edge case'y    | 7     |
| `tests/unit/gamification/leaderboard.test.ts` | Obliczanie rang, stronicowanie, rotacja       | 8     |
| `tests/unit/gamification/sharing.test.ts`     | Transfery, saldo, idempotencja                | 9     |
| `tests/unit/gamification/invites.test.ts`     | Tworzenie, redeem, wygaśnięcie, self-referral | 7     |
| `tests/unit/gamification/antiCheat.test.ts`   | Rate limity, z-score, logowanie audytu        | 6     |
| `tests/unit/gamification/events.test.ts`      | Emisja zdarzeń, fan-out, obsługa błędów       | 5     |

### Uruchamianie testów

```bash
# All gamification tests
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# Single test file
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Wymagania pokrycia

Zgodnie z `CONTRIBUTING.md` — wszystkie nowe moduły muszą mieć:

- Pokrycie gałęzi >= 80%.
- Każda publiczna funkcja przetestowana co najmniej raz.
- Przetestowane ścieżki błędów (niewystarczające saldo, wygasłe kody, rate limity).

---

## Struktura plików

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # All 8 tables + indexes
      gamification.ts                  # Domain CRUD module
    gamification/
      xp.ts                           # XP calculation, level curve, titles
      badges.ts                       # Badge definitions, criteria, evaluation
      streaks.ts                      # Daily streak tracking
      leaderboard.ts                  # Rank computation, SSE, rotation
      antiCheat.ts                    # Rate limiting, z-score, audit
      sharing.ts                      # Token transfer ledger
      invites.ts                      # Invite/redeem codes
      servers.ts                      # Community server federation
      events.ts                       # Event emitter (integration point)
      notifications.ts                # SSE notification stream
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST leaderboard
        leaderboard/stream/route.ts   # SSE real-time updates
        transfer/route.ts             # GET/POST transfers
        invite/route.ts               # GET/POST/DELETE invite codes
        invite/redeem/route.ts        # POST redeem code
        servers/route.ts              # GET/POST/DELETE servers
        federation/score/route.ts     # POST push score
        federation/leaderboard/route.ts # GET pull leaderboard
        notifications/route.ts        # SSE notifications
        anomalies/route.ts            # GET anomaly reports
        rotate/route.ts               # POST rotate secrets
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Rankings page
        profile/page.tsx               # XP/badges/streaks page
        tokens/page.tsx                # Balance/transfers/invites page
        gamification/admin/page.tsx    # Admin anomaly monitoring
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
    GAMIFICATION.md                    # This document
```

---

## Strategia migracji

### Faza 1: Backend core (PR 1)

- Migracja `060_create_gamification.sql` (8 tabel).
- `src/lib/db/gamification.ts` (moduł domenowy).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- Punkt integracji w `chatCore.ts`.
- Testy jednostkowe XP, serii, zdarzeń.

### Faza 2: Odznaki i ranking (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Definicje odznak w constants.
- Trasy API rankingu + strumień SSE.
- Testy jednostkowe odznak i rankingu.

### Faza 3: Udostępnianie i zaproszenia (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- Trasy API transferów i zaproszeń.
- Testy jednostkowe sharing, invites, anti-cheat.

### Faza 4: Federacja i dashboard (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- Trasy API federacji.
- Strony dashboardu (leaderboard, profile, tokens, admin).
- Rejestracja narzędzi MCP.

---

## Przyszłe rozważania

- **Seasonal events**: ograniczone czasowo zestawy odznak i sezony rankingów.
- **Team leaderboards**: grupowanie użytkowników według organizacji lub combo.
- **XP multipliers**: boost XP w okresach promocyjnych.
- **Achievement sharing**: generowanie udostępnialnych kart odznak (obrazy OpenGraph).
- **Mobile push**: powiadomienia webhook o zdarzeniach odznak/poziomów.
- **Leaderboard API**: publiczne API dla integracji zewnętrznych.
