# GAMIFICATION (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

# Sistem gamifikacije i rang-lista

> **Izvor istine:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Posljednje ažurirano:** 2026-06-28 — v3.8.40

OmniRoute uključuje lokalni sloj gamifikacije koji nagrađuje korisnike za angažman na platformi — slanje zahtjeva, prebacivanje provajdera, kreiranje kombinacija, dijeljenje tokena i doprinos zajednici. Svo stanje se nalazi u SQLite-u; federacija sa serverima zajednice je opciona i zasnovana na push modelu.

Sistem je dizajniran da ima **nultu latenciju na kritičnoj putanji** — događaji gamifikacije se šalju po principu 'fire-and-forget' iz cjevovoda zahtjeva i nikada ne blokiraju LLM odgovor.

---

## Pregled

### Svrha

Povećanje angažmana i zadržavanja korisnika pružanjem vidljivog napretka (XP, nivoi, značke), društvenog dokaza (rang-liste) i ekonomskih podsticaja (dijeljenje tokena, nagrade za pozivnice).

### Obim

| Funkcionalnost             | Opis                                                                                 |
| -------------------------- | ------------------------------------------------------------------------------------ |
| XP i nivoi                 | Zaradite XP po akciji; napredujte kroz nivoe duž polinomske krive                    |
| Značke                     | 20+ dostignuća u 5 kategorija sa 4 nivoa rijetkosti                                  |
| Nizovi (Streaks)           | Praćenje dnevne aktivne upotrebe sa trenutnim/najdužim nizom                         |
| Rang-liste                 | Globalni, sedmični, mjesečni, dijeljenje tokena i opsezi doprinosa                   |
| Dijeljenje tokena          | Prenos kredita između korisnika putem knjige sa dvostrukim unosom                    |
| Pozivnice i iskorištavanje | Kodovi za preporuku sa SHA-256 heširanim skladištenjem                               |
| Serveri zajednice          | Federacija sa eksternim OmniRoute instancama                                         |
| Anti-cheat                 | Bodovanje na strani servera, ograničavanje brzine, detekcija anomalija putem z-skora |

### Principi dizajna

1. **Lokalno-prvo (Local-first)** — svo stanje u SQLite-u, nisu potrebni eksterni servisi.
2. **Bez blokiranja** — događaji su 'fire-and-forget'; putanja LLM odgovora nikada nije odgođena logikom gamifikacije.
3. **Server-autoritativno** — XP se računa samo na strani servera; klijenti ne mogu naduvati rezultate.
4. **Poštovanje privatnosti** — učešće u rang-listi je opciono; korisnici mogu sakriti svoj profil.
5. **Spremno za federaciju** — serveri zajednice mogu gurati rezultate putem potpisanog API-ja; sinhronizacija je prepisivanje, a ne aditivna.

---

## Arhitektura

### Tok visokog nivoa

```
Client Request
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (postojeći cjevovod) ...
      → upstream odgovor poslat klijentu
      → setImmediate (fire-and-forget):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

Emitovanje događaja je jedina tačka integracije. `chatCore.ts` poziva `emitGamificationEvent()` nakon što je odgovor poslat; modul događaja se širi na XP, nizove, značke, rang-liste i anti-cheat podsisteme.

### Graf zavisnosti modula

```
src/lib/gamification/
  events.ts          ← ulazna tačka (pozvana iz chatCore.ts)
    ├── xp.ts        ← XP proračun i rezolucija nivoa
    ├── streaks.ts   ← praćenje dnevnog aktivnog niza
    ├── badges.ts    ← evaluacija kriterijuma za značke
    ├── leaderboard.ts ← proračun ranga i SSE emitovanje
    ├── antiCheat.ts ← ograničavanje brzine i detekcija anomalija
    ├── sharing.ts   ← knjiga prenosa tokena
    ├── invites.ts   ← upravljanje kodovima za pozivnice/iskorištavanje
    ├── servers.ts   ← federacija servera zajednice
    └── notifications.ts ← SSE tok obavještenja

src/lib/db/
  gamification.ts    ← sve CRUD operacije (8 tabela)

src/app/api/gamification/
  leaderboard/       ← GET rangiranja, POST ručno osvježavanje
  leaderboard/stream ← SSE ažuriranja u realnom vremenu
  transfer/          ← GET istorija, POST slanje tokena
  invite/            ← GET/POST kodovi, DELETE opoziv
  invite/redeem/     ← POST iskorištavanje koda
  servers/           ← GET/POST/DELETE serveri zajednice
  federation/score/  ← POST guranje rezultata na server
  federation/leaderboard/ ← GET povlačenje rang-liste sa servera
  notifications/     ← SSE obavještenja o značkama/napredovanju nivoa
  anomalies/         ← GET izvještaji o anomalijama (admin)
  rotate/            ← POST rotacija tajni tokena za pozivnice
```

---

## Sloj podataka

### Tabele baze podataka

Sve tabele se nalaze u glavnoj OmniRoute SQLite bazi podataka, kreiranoj migracijom `060_create_gamification.sql`. WAL žurnalizacija je naslijeđena od singletona `getDbInstance()` u `src/lib/db/core.ts`.

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

### Domenski modul: `src/lib/db/gamification.ts`

Prati standardni OmniRoute obrazac — uvozi `getDbInstance()` iz `core.ts`, izvozi tipizirane CRUD funkcije. Nema sirovog SQL-a u rukovaocima ruta (route handlers).

Ključne funkcije:

| Funkcija                   | Opis                                                             |
| -------------------------- | ---------------------------------------------------------------- |
| `upsertLeaderboardEntry()` | Umetanje ili ažuriranje rezultata za (api_key_id, scope, period) |
| `getLeaderboard()`         | Paginizirano rangiranje za dati scope/period                     |
| `getUserLevel()`           | Dobavljanje ili kreiranje zapisa nivoa korisnika                 |
| `updateUserLevel()`        | Atomsko postavljanje XP-a, nivoa i titule                        |
| `getBadgeDefinitions()`    | Sve definicije znački (opcionalno filtrirane)                    |
| `getUserBadges()`          | Značke koje je korisnik zaradio                                  |
| `awardBadge()`             | Umetanje zarađene značke (idempotentno na badge_id)              |
| `logXpAction()`            | Dodavanje u xp_audit_log                                         |
| `getXpAuditLog()`          | Paginizirana revizijska historija za korisnika                   |
| `insertLedgerEntry()`      | Transfer sa dvojnim knjigovodstvom (u transakciji)               |
| `getBalance()`             | Zbir primljenog minus poslato za korisnika                       |
| `getTransferHistory()`     | Paginizirani dnevnik transfera                                   |
| `createInviteToken()`      | Umetanje pozivnog koda + heširanog tokena                        |
| `redeemInviteToken()`      | Pretraga po kodu, validacija, povećanje broja upotreba           |
| `upsertCommunityServer()`  | Registracija ili ažuriranje servera federacije                   |
| `getCommunityServers()`    | Lista servera za korisnika                                       |
| `deleteCommunityServer()`  | Uklanjanje registracije servera                                  |

---

## XP / Sistem nivoa

**File:** `src/lib/gamification/xp.ts`

### Kriva nivoa

XP potreban za dostizanje nivoa `n` prati polinomsku krivu:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Nivo | XP do sljedećeg | Kumulativni XP | Titula     |
| ---- | --------------- | -------------- | ---------- |
| 1    | 100             | 100            | Početnik   |
| 5    | 1,118           | 2,415          | Početnik   |
| 10   | 3,162           | 10,523         | Istraživač |
| 25   | 12,500          | 86,024         | Istraživač |
| 50   | 35,355          | 345,529        | Ekspert    |
| 75   | 64,952          | 948,683        | Majstor    |
| 100  | 100,000         | 2,050,000      | Legenda    |

### Titule

| Raspon nivoa | Titula     |
| ------------ | ---------- |
| 1 – 9        | Početnik   |
| 10 – 24      | Istraživač |
| 25 – 49      | Ekspert    |
| 50 – 74      | Majstor    |
| 75 – 100     | Legenda    |

### XP nagrade

| Akcija            | XP  | Opis                                                     |
| ----------------- | --- | -------------------------------------------------------- |
| `request`         | 1   | Po API zahtjevu usmjerenom kroz OmniRoute                |
| `provider_switch` | 5   | Prebacivanje na drugog provajdera                        |
| `model_switch`    | 3   | Prebacivanje na drugi model                              |
| `combo_create`    | 10  | Kreiranje nove kombinacije                               |
| `combo_use`       | 2   | Korištenje kombinacije za zahtjev                        |
| `token_share`     | 1   | Na svakih 1 000 tokena podijeljenih sa drugim korisnikom |
| `invite_redeem`   | 50  | Iskorištavanje pozivnog koda                             |
| `daily_login`     | 5   | Dnevna aktivna upotreba (jednom dnevno)                  |
| `streak_bonus`    | 2   | Po uzastopnom danu niza (pomnoženo sa dužinom niza)      |
| `badge_unlock`    | 10  | Otključavanje značke                                     |

### Tok dodjeljivanja

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. Potražite `XP_REWARDS[action]` da dobijete iznos XP-a.
2. Prođite kroz `checkRateLimit()` (anti-cheat: maksimalno 1000 XP/min po ključu).
3. Otvorite transakciju:
   - Pročitajte trenutni red `user_levels`.
   - Dodajte XP; ponovo izračunajte nivo putem `levelFromXp(totalXp)`.
   - Ako se nivo promijenio, postavite `levelUp = true`.
   - Ažurirajte red `user_levels`.
   - Umetnite u `xp_audit_log`.
4. Vratite rezultat. Pozivalac upravlja obavještenjima.

### Pomoćna funkcija: `levelFromXp(totalXp)`

Iterira nivoe 1..100, sabirajući `xp_for_level(n)` dok kumulativni XP ne premaši `totalXp`. Vraća najviši nivo čiji je prag ispunjen.
Ovo je O(100) — prihvatljivo pošto su nivoi ograničeni na 100.

---

## Sistem znački

**File:** `src/lib/gamification/badges.ts`

### Kategorije

| Kategorija     | Opis                                   | Primjeri znački                              |
| -------------- | -------------------------------------- | -------------------------------------------- |
| `usage`        | Prekretnice zasnovane na obimu         | Prvi zahtjev, 1K zahtjeva, 100K              |
| `sharing`      | Dijeljenje tokena i preporuke          | Prvo dijeljenje, Velikodušan (10 dijeljenja) |
| `contribution` | Angažman zajednice                     | Kreator kombinacija, Istraživač provajdera   |
| `streak`       | Dosljednost tokom vremena              | Sedmični ratnik, Mjesečno posvećen           |
| `rare`         | Teško dostižna ili skrivena dostignuća | Rani korisnik, Prijavljivač grešaka          |

### Rijetkosti

| Rijetkost   | Boja   | Nagovještaj vjerovatnoće |
| ----------- | ------ | ------------------------ |
| `common`    | Siva   | Većina korisnika         |
| `uncommon`  | Zelena | Aktivni korisnici        |
| `rare`      | Plava  | Posvećeni korisnici      |
| `legendary` | Zlatna | Top 1%                   |

### Tipovi kriterijuma

| Tip            | Polje        | Opis                                                             |
| -------------- | ------------ | ---------------------------------------------------------------- |
| `action_count` | `count`      | Izvršite akciju N puta (npr. 1000 zahtjeva)                      |
| `streak`       | `days`       | Održavajte niz N uzastopnih dana                                 |
| `unique_count` | `field`, `n` | Koristite N jedinstvenih vrijednosti (npr. 10 različitih modela) |
| `rank`         | `scope`, `n` | Dostignite rang N u opsegu rang-liste                            |
| `first`        | —            | Budite prvi koji će izvršiti akciju                              |
| `hidden`       | (varies)     | Kriterijumi se ne prikazuju dok se ne zarade                     |

Definicije znački su pohranjene u `badge_definitions` kao JSON `criteria`:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Tok evaluacije

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # sve definicije
    → getUserBadges(apiKeyId)         # već zarađeno (preskoči)
    → for each unearned badge:
       → matchesCriteria(badge, event, userState)
       → if match: awardBadge(apiKeyId, badgeId)
         → return notification payload
```

Evaluacija je **vođena događajima** — pokreće se nakon svakog gejmifikacijskog događaja, ali provjerava samo značke čiji se `criteria.type` poklapa sa akcijom događaja. Ovo održava evaluaciju brzom (< 5ms za većinu događaja).

### `matchesCriteria(badge, event, userState)`

| Tip kriterijuma | Provjera                                                  |
| --------------- | --------------------------------------------------------- |
| `action_count`  | `getActionCount(apiKeyId, action) >= count`               |
| `streak`        | `getCurrentStreak(apiKeyId) >= days`                      |
| `unique_count`  | `getUniqueCount(apiKeyId, field) >= n`                    |
| `rank`          | `getRank(apiKeyId, scope) <= n`                           |
| `first`         | Nema prethodnog unosa u `xp_audit_log` za ovaj tip akcije |
| `hidden`        | Delegira odgovarajućoj pod-provjeri                       |

### Ugrađene značke (20+)

<details>
<summary>Potpuna lista znački</summary>

| Značka                  | Kategorija | Rijetkost    | Kriterij                           |
| ----------------------- | ---------- | ------------ | ---------------------------------- |
| Prvi koraci             | upotreba   | uobičajeno   | 1 zahtjev                          |
| Zagrijavanje            | upotreba   | uobičajeno   | 100 zahtjeva                       |
| Napredni korisnik       | upotreba   | neuobičajeno | 1.000 zahtjeva                     |
| Centurion               | upotreba   | rijetko      | 10.000 zahtjeva                    |
| OmniPower               | upotreba   | legendarno   | 100.000 zahtjeva                   |
| Mijenjač provajdera     | doprinos   | uobičajeno   | Koristite 5 različitih provajdera  |
| Majstor provajdera      | doprinos   | neuobičajeno | Koristite 20 različitih provajdera |
| Arhitekta kombinacija   | doprinos   | neuobičajeno | Kreirajte 5 kombinacija            |
| Velemajstor kombinacija | doprinos   | rijetko      | Kreirajte 25 kombinacija           |
| Prvo dijeljenje         | dijeljenje | uobičajeno   | 1 prijenos tokena                  |
| Darežljiv               | dijeljenje | neuobičajeno | 10 prijenosa tokena                |
| Filantrop               | dijeljenje | rijetko      | Prijenos ukupno 10.000 tokena      |
| Preporučitelj           | dijeljenje | uobičajeno   | 1 uspješna preporuka               |
| Graditelj mreže         | dijeljenje | neuobičajeno | 10 uspješnih preporuka             |
| Sedmični ratnik         | niz        | neuobičajeno | Niz od 7 dana                      |
| Mjesečno posvećen       | niz        | rijetko      | Niz od 30 dana                     |
| Nezaustavljiv           | niz        | legendarno   | Niz od 365 dana                    |
| Rani korisnik           | rijetko    | legendarno   | Pridružite se tokom beta perioda   |
| Pionir kompresije       | rijetko    | neuobičajeno | Koristite kompresiju 100 puta      |
| Sakupljač vještina      | rijetko    | rijetko      | Koristite 10 različitih vještina   |
| Istraživač modela       | doprinos   | neuobičajeno | Koristite 15 različitih modela     |

</details>

---

## Praćenje nizova

**Datoteka:** `src/lib/gamification/streaks.ts`

### Model podataka

Nizovi se pohranjuju u `key_value` tabelu (zajednička pomoćna tabela) pod ključevima sa imenskim prostorom (namespaced keys):

| Ključ                         | Vrijednost                       | Opis                   |
| ----------------------------- | -------------------------------- | ---------------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Podaci o aktivnom nizu |

### Logika

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Pročitaj zapis niza iz `key_value`.
2. Parsiraj `{current}`, `{longest}`, `{lastDate}` (ISO string datuma).
3. Ako je `lastDate === today` — bez promjena (već uračunato za danas).
4. Ako je `lastDate === yesterday` — uvećaj `current`; ažuriraj `longest` ako je potrebno.
5. Ako je `lastDate < yesterday` — resetuj `current = 1` (niz prekinut).
6. Zapiši ažurirani zapis.
7. Provjeri prekretnice: 7, 14, 30, 60, 90, 180, 365 dana. Ako su pređene, postavi `milestone = true` (pozivalac dodjeljuje XP i provjerava značke).

### Granični slučajevi

- **Vremenska zona**: nizovi koriste UTC datume (`new Date().toISOString().slice(0, 10)`). Ovo je namjerno — jedna kanonska vremenska zona sprječava manipulaciju putem promjene vremenske zone.
- **Novi korisnici**: ne postoji zapis o nizu; prvi zahtjev ga kreira sa `current=1, longest=1, lastDate=today`.
- **Višestruki zahtjevi dnevno**: samo prvi zahtjev u UTC danu uvećava niz.

---

## Tabela lidera

**Datoteka:** `src/lib/gamification/leaderboard.ts`

### Opsezi

| Opseg           | Period  | Opis                                                             |
| --------------- | ------- | ---------------------------------------------------------------- |
| `global`        | `all`   | Kumulativni XP svih vremena                                      |
| `weekly`        | `week`  | XP zarađen u trenutnoj UTC sedmici (pon-ned)                     |
| `monthly`       | `month` | XP zarađen u trenutnom UTC mjesecu                               |
| `tokens_shared` | `all`   | Ukupno tokena prenesenih drugima                                 |
| `contributions` | `all`   | Kreirane kombinacije + korišteni provajderi + korištene vještine |

### Izračunavanje ranga

Rangovi se **izračunavaju u vrijeme čitanja**, a ne pohranjuju. Ovo izbjegava zastarjele podatke o rangu i eliminiše potrebu za periodičnim poslovima ponovnog izračunavanja ranga.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

Obrazac upita:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### Rotacija perioda

Sedmične i mjesečne tabele lidera se automatski rotiraju:

1. **Arhiviranje**: na granici perioda, kopiraj trenutne unose u `leaderboard_archive` sa oznakom perioda.
2. **Resetovanje**: obriši unose za istekli period.
3. **Okidač**: provjerava se pri svakom pozivu `updateLeaderboard()`; prvi zahtjev novog perioda pokreće rotaciju.

Ovo osigurava da se sedmične tabele resetuju svakog ponedjeljka u 00:00 UTC, a mjesečne tabele prvog dana u mjesecu.

### SSE ažuriranja u realnom vremenu

**Krajnja tačka (Endpoint):** `GET /api/gamification/stream`

```
Client → GET /api/gamification/stream
  → SSE konekcija uspostavljena
  → Server odmah šalje snimak top-10 tabele lidera
  → Svakih 5 sekundi: pošalji ažuriranu top-10 listu ako je promijenjena
  → Svakih 15 sekundi: komentar otkucaja srca (heartbeat) (": heartbeat\n\n")
  → Klijent se diskonektuje → čišćenje (ukloni osluškivač)
```

Format događaja:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

SSE menadžer prati povezane klijente po opsegu i šalje ažuriranja samo kada su se podaci tabele lidera zaista promijenili od posljednjeg slanja.

---

## Dijeljenje tokena

**Datoteka:** `src/lib/gamification/sharing.ts`

### Dvojno knjigovodstvo

Svaki prijenos kreira dva reda u `token_ledger`:

| Red       | `from_key_id` | `to_key_id` | `amount` |
| --------- | ------------- | ----------- | -------- |
| Duguje    | pošiljatelj   | primatelj   | +iznos   |
| Potražuje | primatelj     | pošiljatelj | -iznos   |

Čekaj — konvencija je:

| Red      | `from_key_id` | `to_key_id` | `amount` | Značenje               |
| -------- | ------------- | ----------- | -------- | ---------------------- |
| Slanje   | pošiljatelj   | primatelj   | +iznos   | Odljev od pošiljatelja |
| Primanje | primatelj     | pošiljatelj | +iznos   | Priljev primatelju     |

Stanje se računa kao:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Tok prijenosa

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Validacija**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **Idempotencija**: provjeri postoji li `idempotency_key` već u knjizi.
   Ako da, vrati keširani rezultat.
3. **Transakcija** (pojedinačna SQLite transakcija):
   a. Izračunaj stanje pošiljatelja.
   b. Ako je `balance < amount`, prekini (nedovoljno sredstava).
   c. Umetni red za slanje (`from=sender,`.

### Ograničenje stope (Rate Limiting)

- Maks. 10 prijenosa u minuti po API ključu.
- Maks. 10.000 tokena po jednom prijenosu.
- Maks. 100.000 tokena prenesenih dnevno po API ključu.

---

## Pozivnice i iskorištavanje tokena

**Datoteka:** `src/lib/gamification/invites.ts`

### Format koda

- **Kod**: 8-znakovni alfanumerički (npr. `A3K9-X7M2`), čitljiv ljudima,
  prikazan korisniku.
- **Token**: 32-bajtni nasumični token, pohranjen kao SHA-256 hash. Koristi se za
  programsko iskorištavanje (npr. URL poveznice).

### Pohrana

| Stupac       | Vrijednost                          |
| ------------ | ----------------------------------- |
| `code`       | `A3K9X7M2` (jedinstven, indeksiran) |
| `token_hash` | SHA-256(raw_token)                  |

Sirovi token se vraća korisniku točno jednom prilikom kreiranja. OmniRoute
ga nikada više ne pohranjuje niti prikazuje — samo hash ostaje.

### Sprječavanje samopozivanja

Kada korisnik iskoristi kod, sustav provjerava:

1. Kod pripada drugom `api_key_id`.
2. Korisnik koji iskupljuje kod prethodno nije iskoristio nijedan kod od istog
   preporučitelja (spajanje na `invite_tokens` + zapisnik o iskorištavanju).

Ako bilo koja provjera ne uspije, iskorištavanje se odbija uz jasnu poruku o pogrešci.

### Istek i ograničenja

- Zadano `max_uses`: 10 (konfigurabilno pri kreiranju).
- Zadano `expires_at`: 30 dana od kreiranja.
- Istekli ili iscrpljeni kodovi vraćaju HTTP 410 Gone.

---

## Federacija servera zajednice

**Datoteka:** `src/lib/gamification/servers.ts`

### Povezivanje

Server zajednice se registruje putem tokena za pozivnicu koji izdaje udaljeni server. Lokalna instanca:

1. Prima token za pozivnicu (npr. zalijepljen u kontrolnu ploču).
2. Poziva `POST /api/gamification/federation/leaderboard` na udaljenom serveru radi validacije tokena i preuzimanja trenutne rang-liste.
3. Pohranjuje zapis o serveru sa `status: connected`.

### Model sinhronizacije

Federacija koristi **sinhronizaciju prepisivanjem** (overwrite sync), a ne aditivnu:

```
Lokalna instanca              Server zajednice
     │                              │
     ├── pošalji rezultat ─────────►│  POST /federation/score
     │   { api_key_id, score }      │  (server validira hash tokena)
     │                              │
     ├── povuci rang-listu ────────►│  GET /federation/leaderboard
     │◄── top-N unosa ──────────────┤  (prepisuje lokalnu keš memoriju)
     │                              │
     └── provjera ispravnosti ─────►│  GET /federation/health
         (svakih 60s, timeout 5s)   │
```

### Autentifikacija

Zahtjevi federacije uključuju:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

Udaljeni server hešira token i traži odgovarajući red u `community_servers`. Ovo izbjegava prenos pohranjenog heša.

### Nadzor ispravnosti

Svaki zapis servera prati:

| Polje       | Opis                                                    |
| ----------- | ------------------------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable`                  |
| `last_sync` | ISO vremenska oznaka posljednje uspješne sinhronizacije |
| `failures`  | Uzastopni neuspjesi provjere ispravnosti                |

Nakon 5 uzastopnih neuspjeha, status se mijenja u `unreachable` i sinhronizacija se pauzira dok ručna provjera ispravnosti ne bude uspješna.

---

## Anti-Cheat

**Datoteka:** `src/lib/gamification/antiCheat.ts`

### Bodovanje na strani servera

Svi proračuni XP-a se dešavaju u `src/lib/gamification/xp.ts`. Klijenti nikada ne šalju rezultat — oni šalju akcije, a server izračunava XP. Kolona `leaderboard.score` je upisiva samo od strane koda na strani servera.

### Ograničenje stope (Rate Limiting)

| Ograničenje                    | Vrijednost | Opseg         |
| ------------------------------ | ---------- | ------------- |
| Maksimalno XP po minuti        | 1,000      | Po API ključu |
| Maksimalno transfera po minuti | 10         | Po API ključu |
| Maksimalni iznos transfera     | 10,000     | Po transferu  |
| Maksimalno dnevnih transfera   | 100,000    | Po API ključu |

Ograničenja stope koriste klizni prozor u memoriji (isti obrazac kao `RateLimitManager` u `open-sse/services/`). Vraća se na brojače zasnovane na SQLite-u ako se proces ponovo pokrene.

### Z-Score detekcija anomalija

Za svaki API ključ, sistem održava klizni prozor od 7 dana zarađenog XP-a po satu. Pri svakoj dodjeli XP-a:

1. Izračunaj trenutnu korisnikovu satnu stopu XP-a.
2. Izračunaj srednju vrijednost populacije i standardnu devijaciju.
3. Izračunaj `z = (user_rate - mean) / stddev`.
4. Ako je `z > 3.0` (3 standardne devijacije), označi kao anomaliju.

Anomalije se bilježe u `xp_audit_log` sa `action = 'anomaly_detected'` i prikazuju na administratorskoj kontrolnoj ploči.

### Revizijski trag

Svaka dodjela XP-a, transfer, zarađena značka i detekcija anomalije se bilježe u `xp_audit_log` sa:

| Polje        | Opis                                           |
| ------------ | ---------------------------------------------- |
| `api_key_id` | Ko                                             |
| `action`     | Šta se desilo (xp_award, transfer, anomaly, …) |
| `xp_awarded` | Iznos (0 za događaje bez XP-a)                 |
| `metadata`   | JSON sa kontekstom (tip akcije, cilj, …)       |
| `created_at` | Kada (ISO 8601)                                |

Administratori mogu pretraživati cijeli revizijski trag putem `GET /api/gamification/anomalies`.

## API rute

Sve rute prate standardni OmniRoute obrazac:

```
Route → CORS preflight → Body validation (Zod) → Auth (extractApiKey)
  → Handler
```

### Krajnje tačke

| Metoda | Putanja                                    | Opis                                           | Autorizacija |
| ------ | ------------------------------------------ | ---------------------------------------------- | ------------ |
| GET    | `/api/gamification/leaderboard`            | Dohvati rang listu (opseg, period, paginacija) | Opcionalno   |
| POST   | `/api/gamification/leaderboard`            | Prisilno osvježi keš rang liste                | Obavezno     |
| GET    | `/api/gamification/stream`                 | SSE ažuriranja rang liste u realnom vremenu    | Opcionalno   |
| GET    | `/api/gamification/transfer`               | Dohvati historiju transfera (paginacija)       | Obavezno     |
| POST   | `/api/gamification/transfer`               | Pošalji tokene drugom korisniku                | Obavezno     |
| GET    | `/api/gamification/invite`                 | Izlistaj moje pozivne kodove                   | Obavezno     |
| POST   | `/api/gamification/invite`                 | Generiši novi pozivni kod                      | Obavezno     |
| DELETE | `/api/gamification/invite`                 | Opozovi pozivni kod                            | Obavezno     |
| POST   | `/api/gamification/invite/redeem`          | Iskoristi pozivni kod                          | Obavezno     |
| GET    | `/api/gamification/servers`                | Izlistaj servere zajednice                     | Obavezno     |
| POST   | `/api/gamification/servers`                | Poveži se na server zajednice                  | Obavezno     |
| DELETE | `/api/gamification/servers`                | Prekini vezu sa serverom zajednice             | Obavezno     |
| POST   | `/api/gamification/federation/score`       | Pošalji rezultat na udaljeni server            | Federacija   |
| GET    | `/api/gamification/federation/leaderboard` | Povuci rang listu sa udaljenog servera         | Federacija   |
| GET    | `/api/gamification/notifications`          | SSE obavještenja o značkama/napredovanju nivoa | Obavezno     |
| GET    | `/api/gamification/anomalies`              | Pregledaj izvještaje o anomalijama (admin)     | Admin        |
| POST   | `/api/gamification/rotate`                 | Rotiraj tajne pozivnih tokena                  | Obavezno     |

### Primjeri zahtjeva/odgovora

**POST /api/gamification/transfer**

```json
// Zahtjev
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// Odgovor 200
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

// Odgovor 400 (nedovoljno sredstava)
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

## MCP alati (8)

Registrovani u `open-sse/mcp-server/` pored postojećih alata. Obuhvaćeni `gamification` dozvolom.

| Alat                       | Opis                                            | Ulazna šema                  |           |
| -------------------------- | ----------------------------------------------- | ---------------------------- | --------- |
| `gamification_leaderboard` | Dobavi rang-listu za opseg/period               | `{ scope, period?, limit? }` |
| `gamification_rank`        | Dobavi rang pozivaoca i susede                  | `{ scope }`                  |
| `gamification_profile`     | Dobavi XP, nivo, titulu, sažetak niza           | `{}`                         |
| `gamification_badges`      | Izlistaj zarađene bedževe ili sve definicije    | `{ earned?: boolean }`       |
| `gamification_transfer`    | Pošalji tokene drugom korisniku                 | `{ to, amount }`             |
| `gamification_invite`      | Generiši ili izlistaj kodove za pozivnice       | `{ action: "create"          | "list" }` |
| `gamification_servers`     | Izlistaj ili poveži se na servere zajednice     | `{ action, token? }`         |
| `gamification_anomalies`   | Pregledaj izveštaje o anomalijama (admin opseg) | `{ limit?, since? }`         |

---

## Stranice kontrolne table

### `/dashboard/leaderboard`

- Prikaz podijuma (top 3 sa avatarima i XP-om).
- Selektor opsega: Globalno / Nedeljno / Mesečno / Razmenjeni tokeni / Doprinosi.
- Tabela sa paginacijom (25 po stranici) sa rangom, imenom, rezultatom, nivoom, titulom.
- SSE ažuriranja u realnom vremenu — promene ranga se animiraju.
- Trenutni korisnik istaknut u tabeli sa lepljivim redom „Vaš rang“.

### `/dashboard/profile`

- Traka napretka XP-a sa trenutnim nivoom i pragom za sledeći nivo.
- Bedž titule istaknut na vidnom mestu.
- Galerija bedževa — zarađeni bedževi sa datumom sticanja, nezarađeni bedževi zasivljeni (skriveni bedževi prikazuju „???“ dok se ne zarade).
- Brojač nizova sa ikonicom plamena; kalendar nizova (poslednjih 30 dana).
- Grafikon istorije XP-a (dnevni XP tokom poslednjih 30 dana).

### `/dashboard/tokens`

- Stanje tokena (istaknuto, vrh stranice).
- Forma za transfer: primalac, iznos, dijalog za potvrdu.
- Tabela istorije transfera sa filterima (poslato/primljeno/sve).
- Sekcija za pozivnice: aktivni kodovi, generisanje novih, link za deljenje.
- Serveri zajednice: lista sa statusom ispravnosti, povezivanje/prekid veze.

### `/dashboard/gamification/admin`

- Lista anomalija sa ozbiljnošću, korisnikom, vremenskom oznakom, z-skorom.
- Pregledač revizorskog dnevnika sa filterima (tip akcije, korisnik, opseg datuma).
- Sistemska statistika: ukupno dodeljen XP, aktivni korisnici, stope sticanja bedževa.
- Pregled ispravnosti servera federacije.

---

## Integracija toka obrade

### Tačka integracije

Gejmifikacija se povezuje sa tokom obrade zahteva na jednoj tački u `open-sse/handlers/chatCore.ts`:

```typescript
// Nakon što je odgovor poslat klijentu:
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
    // "Fire-and-forget" (pali i zaboravi): evidentiraj, ali nikada ne prosleđuj klijentu
  });
});
```

### Tipovi događaja

| Tip događaja        | Kada se emituje                                                 |
| ------------------- | --------------------------------------------------------------- |
| `request.completed` | Uspešno poslat LLM odgovor                                      |
| `provider.switch`   | Provajder promenjen (računa se kao rezervna opcija kombinacije) |
| `combo.created`     | Sačuvana nova konfiguracija kombinacije                         |
| `combo.used`        | Uspešno pogođen cilj kombinacije                                |
| `badge.earned`      | Evaluacija bedža pronašla podudaranje                           |
| `streak.milestone`  | Pređen prag niza                                                |
| `transfer.sent`     | Transfer tokena završen                                         |
| `referral.redeemed` | Kod za pozivnicu uspešno iskorišćen                             |
| `compression.used`  | Primenjena kompresija prompta                                   |
| `skill.executed`    | Izvršenje veštine završeno                                      |
| `model.first_use`   | Model nije korišćen u poslednjih 7 dana                         |

### Garancija neblokiranja

Obrazac `setImmediate` + `.catch(() => {})` osigurava:

1. Odgovor je u potpunosti poslat pre nego što se gejmifikacija pokrene.
2. Greške u gejmifikaciji nikada ne izlaze na površinu klijentu.
3. Obrada događaja se pokreće u sledećem mikro-zadatku, a ne u liniji (inline).

## Sigurnost

### Model prijetnji

| Prijetnja                                 | Ublažavanje                                                                       |
| ----------------------------------------- | --------------------------------------------------------------------------------- |
| Inflacija bodova                          | XP se računa isključivo na strani servera; klijenti šalju radnje, ne bodove       |
| Replay napadi                             | Idempotencijski ključevi pri transferima; deduplikacija revizijskog dnevnika      |
| Prevara pri transferu                     | Knjiga dvojnog knjigovodstva; atomske transakcije; ograničenja stope              |
| Samoreferenciranje                        | Unakrsna provjera `api_key_id` pri iskoristivosti                                 |
| Manipulacija rang-listom                  | Detekcija anomalija pomoću Z-skora; administratorska kontrolna ploča za anomalije |
| Krađa federacijskog tokena                | Pohrana hashirana SHA-256 algoritmom; sirovi token se prikazuje samo jednom       |
| Brute force napadi na kodove za pozivnice | Ograničenje stope na endpointu za iskoristivost; entropija od 8 znakova           |
| XSS u prikazanim imenima                  | Prikazana imena sanitizirana; unosi na rang-listi eskapirani                      |
| Timing napadi na hashove                  | `crypto.timingSafeEqual` za usporedbu hashova tokena                              |

### Zahtjevi za autentifikaciju

- **Javno** (bez autentifikacije): `GET /leaderboard`, `GET /stream` (rang-liste samo za čitanje).
- **Potreban API ključ**: sve operacije pisanja, profil, transferi, pozivnice.
- **Samo za administratore**: kontrolna ploča za anomalije, preglednik revizijskog dnevnika.
- **Federacija**: zasebna putanja za autentifikaciju koristeći sirovi token u `Authorization` zaglavlju, validiran prema pohranjenom SHA-256 hash-u.

---

## Testiranje

### Testne datoteke

Svi testovi koriste izvorni Node.js test runner (`node --import tsx/esm --test`).

| Testna datoteka                               | Pokriva                                              | Testovi |
| --------------------------------------------- | ---------------------------------------------------- | ------- |
| `tests/unit/gamification/xp.test.ts`          | XP kalkulacija, krivulja nivoa, titule               | 8       |
| `tests/unit/gamification/badges.test.ts`      | Podudaranje kriterija za značke, dodjeljivanje       | 10      |
| `tests/unit/gamification/streaks.test.ts`     | Logika nizova, prekretnice, rubni slučajevi          | 7       |
| `tests/unit/gamification/leaderboard.test.ts` | Izračun ranga, paginacija, rotacija                  | 8       |
| `tests/unit/gamification/sharing.test.ts`     | Transferi, stanje, idempotencija                     | 9       |
| `tests/unit/gamification/invites.test.ts`     | Kreiranje, iskoristivost, isteka, samoreferenciranje | 7       |
| `tests/unit/gamification/antiCheat.test.ts`   | Ograničenja stope, z-skor, revizijsko logiranje      | 6       |
| `tests/unit/gamification/events.test.ts`      | Emitiranje događaja, fan-out, rukovanje greškama     | 5       |

### Pokretanje testova

```bash
# Svi testovi za gamifikaciju
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# Pojedinačna testna datoteka
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Zahtjevi za pokrivenost

Prema `CONTRIBUTING.md` — svi novi moduli moraju imati:

- Pokrivenost grana >= 80%.
- Svaka javna funkcija testirana barem jednom.
- Testirane putanje grešaka (nedovoljno stanje, istekli kodovi, ograničenja stope).

---

## Struktura datoteka

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # Svih 8 tabela + indeksi
      gamification.ts                  # Domenski CRUD modul
    gamification/
      xp.ts                           # XP proračun, kriva nivoa, titule
      badges.ts                       # Definicije bedževa, kriterijumi, evaluacija
      streaks.ts                      # Praćenje dnevnih nizova
      leaderboard.ts                  # Izračunavanje ranga, SSE, rotacija
      antiCheat.ts                    # Ograničavanje stope, z-score, revizija
      sharing.ts                      # Glavna knjiga transfera tokena
      invites.ts                      # Pozivni/iskoristivi kodovi
      servers.ts                      # Federacija servera zajednice
      events.ts                       # Emitovanje događaja (tačka integracije)
      notifications.ts                # SSE tok obavještenja
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST rang lista
        leaderboard/stream/route.ts   # SSE ažuriranja u realnom vremenu
        transfer/route.ts             # GET/POST transferi
        invite/route.ts               # GET/POST/DELETE pozivni kodovi
        invite/redeem/route.ts        # POST iskoristi kod
        servers/route.ts              # GET/POST/DELETE serveri
        federation/score/route.ts     # POST push rezultat
        federation/leaderboard/route.ts # GET pull rang lista
        notifications/route.ts        # SSE obavještenja
        anomalies/route.ts            # GET izvještaji o anomalijama
        rotate/route.ts               # POST rotiraj tajne
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Stranica sa rang listama
        profile/page.tsx               # Stranica za XP/bedževe/nizove
        tokens/page.tsx                # Stranica za stanje/transfere/pozivnice
        gamification/admin/page.tsx    # Administratorsko praćenje anomalija
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
    GAMIFICATION.md                    # Ovaj dokument
```

---

## Strategija migracije

### Faza 1: Backend jezgro (PR 1)

- Migracija `060_create_gamification.sql` (8 tabela).
- `src/lib/db/gamification.ts` (domenski modul).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- Tačka integracije u `chatCore.ts`.
- Jedinični testovi za XP, nizove, događaje.

### Faza 2: Bedževi i rang lista (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Definicije bedževa u konstantama.
- API rute za rang listu + SSE tok.
- Jedinični testovi za bedževe, rang listu.

### Faza 3: Dijeljenje i pozivnice (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- API rute za transfer + pozivnice.
- Jedinični testovi za dijeljenje, pozivnice, anti-cheat.

### Faza 4: Federacija i kontrolna tabla (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- API rute za federaciju.
- Stranice kontrolne table (rang lista, profil, tokeni, admin).
- Registracija MCP alata.

---

## Buduća razmatranja

- **Sezonski događaji**: vremenski ograničeni setovi znački i sezone rang-lista.
- **Rang-liste timova**: grupisanje korisnika po organizaciji ili kombinaciji.
- **XP multiplikatori**: povećanje XP-a tokom promotivnih perioda.
- **Dijeljenje postignuća**: generisanje kartica sa značkama koje se mogu dijeliti (OpenGraph slike).
- **Mobilne push notifikacije**: notifikacije zasnovane na webhookovima za događaje vezane za značke/nivoe.
- **API za rang-liste**: javni API za integracije trećih strana.
