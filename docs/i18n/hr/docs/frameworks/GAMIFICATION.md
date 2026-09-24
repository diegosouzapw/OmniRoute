# Gamification & Leaderboard System (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **Izvor istine:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Posljednje ažuriranje:** 2026-06-28 — v3.8.40

OmniRoute uključuje sloj gamifikacije s lokalnim pristupom koji nagrađuje korisnike za
interakciju s platformom — slanje zahtjeva, promjenu pružatelja usluga, stvaranje
kombinacija, dijeljenje tokena i doprinos zajednici. Cjelokupno stanje pohranjeno je u
bazi SQLite; povezivanje s poslužiteljima zajednice opcionalno je i temelji se na prosljeđivanju podataka.

Sustav je osmišljen tako da ima **nultu latenciju na kritičnom putu** — događaji
gamifikacije odašilju se bez čekanja iz cjevovoda zahtjeva i nikada ne blokiraju
odgovor LLM-a.

---

## Pregled

### Svrha

Povećati angažman i zadržavanje korisnika pružanjem vidljivog napretka (XP,
razine, značke), društvene potvrde (ljestvice poretka) i ekonomskih poticaja (dijeljenje
tokena, nagrade za pozivanje).

### Opseg

| Značajka                   | Opis                                                                                                    |
| -------------------------- | ------------------------------------------------------------------------------------------------------- |
| XP i razine                | Stjecanje XP-a po radnji; napredovanje po polinomnoj krivulji                                           |
| Značke                     | Više od 20 postignuća u 5 kategorija s 4 razine rijetkosti                                              |
| Nizovi                     | Dnevno praćenje aktivne uporabe s trenutačnim/najduljim nizom                                           |
| Ljestvice poretka          | Globalni, tjedni, mjesečni, dijeljenje tokena i doprinosi                                               |
| Dijeljenje tokena          | Prijenos kredita između korisnika putem dvojnog knjigovodstva                                           |
| Pozivanje i iskorištavanje | Kodovi preporuke s pohranom sažetaka SHA-256                                                            |
| Poslužitelji zajednice     | Federiranje s vanjskim instancama OmniRoutea                                                            |
| Zaštita od varanja         | Bodovanje na strani poslužitelja, ograničavanje učestalosti i otkrivanje anomalija pomoću z-vrijednosti |

### Načela dizajna

1. **Lokalni pristup** — cjelokupno stanje nalazi se u bazi SQLite, bez potrebe za vanjskim uslugama.
2. **Neblokirajuće** — događaji se odašilju bez čekanja; put odgovora LLM-a
   nikada nije usporen logikom gamifikacije.
3. **Mjerodavnost poslužitelja** — XP se izračunava isključivo na strani poslužitelja; klijenti ne mogu
   umjetno povećavati rezultate.
4. **Poštovanje privatnosti** — sudjelovanje na ljestvici poretka opcionalno je; korisnici mogu
   sakriti svoj profil.
5. **Spremno za federiranje** — poslužitelji zajednice mogu slati rezultate putem potpisanog API-ja;
   sinkronizacija prepisuje podatke umjesto da ih pribraja.

---

## Arhitektura

### Tijek visoke razine

```
Zahtjev klijenta
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (postojeći cjevovod) ...
      → odgovor nadređenog poslužitelja poslan klijentu
      → setImmediate (bez čekanja):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

Odašiljač događaja jedinstvena je integracijska točka. `chatCore.ts` poziva
`emitGamificationEvent()` nakon slanja odgovora; modul događaja zatim ga
prosljeđuje podsustavima za XP, nizove, značke, ljestvice poretka i zaštitu od varanja.

### Graf ovisnosti modula

```
src/lib/gamification/
  events.ts          ← ulazna točka (poziva se iz chatCore.ts)
    ├── xp.ts        ← izračun XP-a i određivanje razine
    ├── streaks.ts   ← praćenje dnevnog niza aktivnosti
    ├── badges.ts    ← provjera kriterija za značke
    ├── leaderboard.ts ← izračun poretka i SSE emitiranje
    ├── antiCheat.ts ← ograničavanje učestalosti i otkrivanje anomalija
    ├── sharing.ts   ← evidencija prijenosa tokena
    ├── invites.ts   ← upravljanje kodovima za pozivanje/iskorištavanje
    ├── servers.ts   ← federiranje poslužitelja zajednice
    └── notifications.ts ← SSE tok obavijesti

src/lib/db/
  gamification.ts    ← sve CRUD operacije (8 tablica)

src/app/api/gamification/
  leaderboard/       ← GET rang-lista, POST ručno osvježavanje
  leaderboard/stream ← SSE ažuriranja u stvarnom vremenu
  transfer/          ← GET povijest, POST slanje tokena
  invite/            ← GET/POST kodovi, DELETE opoziv
  invite/redeem/     ← POST iskorištavanje koda
  servers/           ← GET/POST/DELETE poslužitelji zajednice
  federation/score/  ← POST slanje rezultata poslužitelju
  federation/leaderboard/ ← GET dohvaćanje ljestvice poretka s poslužitelja
  notifications/     ← SSE obavijesti o značkama/napredovanju razine
  anomalies/         ← GET izvješća o anomalijama (administrator)
  rotate/            ← POST rotacija tajni tokena za pozivanje
```

---

## Podatkovni sloj

### Tablice baze podataka

Sve tablice nalaze se u glavnoj SQLite bazi podataka OmniRoute, stvorenoj migracijom
`060_create_gamification.sql`. WAL vođenje dnevnika nasljeđuje se iz singletona
`getDbInstance()` u datoteci `src/lib/db/core.ts`.

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

### Domenski modul: `src/lib/db/gamification.ts`

Slijedi standardni obrazac OmniRoute — uvozi `getDbInstance()` iz
`core.ts` i izvozi tipizirane CRUD funkcije. U obrađivačima ruta nema sirovog SQL-a.

Ključne funkcije:

| Funkcija                   | Opis                                                             |
| -------------------------- | ---------------------------------------------------------------- |
| `upsertLeaderboardEntry()` | Umeće ili ažurira rezultat za (api_key_id, scope, period)        |
| `getLeaderboard()`         | Straničene ljestvice za zadani opseg/razdoblje                   |
| `getUserLevel()`           | Dohvaća ili stvara zapis o razini korisnika                      |
| `updateUserLevel()`        | Atomski postavlja XP, razinu i titulu                            |
| `getBadgeDefinitions()`    | Sve definicije znački (uz opcionalno filtriranje)                |
| `getUserBadges()`          | Značke koje je korisnik osvojio                                  |
| `awardBadge()`             | Umeće zapis o osvajanju značke (idempotentno prema badge_id)     |
| `logXpAction()`            | Dodaje zapis u xp_audit_log                                      |
| `getXpAuditLog()`          | Straničena povijest revizije za korisnika                        |
| `insertLedgerEntry()`      | Prijenos s dvostrukim knjiženjem (unutar transakcije)            |
| `getBalance()`             | Zbroj primljenih sredstava umanjen za poslana sredstva korisnika |
| `getTransferHistory()`     | Straničeni dnevnik prijenosa                                     |
| `createInviteToken()`      | Umeće pozivni kod i sažetak tokena                               |
| `redeemInviteToken()`      | Traži prema kodu, provjerava valjanost i povećava broj upotreba  |
| `upsertCommunityServer()`  | Registrira ili ažurira poslužitelj federacije                    |
| `getCommunityServers()`    | Navodi poslužitelje korisnika                                    |
| `deleteCommunityServer()`  | Uklanja registraciju poslužitelja                                |

---

## Sustav XP-a / razina

**Datoteka:** `src/lib/gamification/xp.ts`

### Krivulja razina

XP potreban za dosezanje razine `n` slijedi polinomnu krivulju:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Razina | XP do sljedeće razine | Kumulativni XP | Titula     |
| ------ | --------------------- | -------------- | ---------- |
| 1      | 100                   | 100            | Početnik   |
| 5      | 1,118                 | 2,415          | Početnik   |
| 10     | 3,162                 | 10,523         | Istraživač |
| 25     | 12,500                | 86,024         | Istraživač |
| 50     | 35,355                | 345,529        | Stručnjak  |
| 75     | 64,952                | 948,683        | Majstor    |
| 100    | 100,000               | 2,050,000      | Legenda    |

### Titule

| Raspon razina | Titula     |
| ------------- | ---------- |
| 1 – 9         | Početnik   |
| 10 – 24       | Istraživač |
| 25 – 49       | Stručnjak  |
| 50 – 74       | Majstor    |
| 75 – 100      | Legenda    |

### XP nagrade

| Radnja            | XP  | Opis                                                    |
| ----------------- | --- | ------------------------------------------------------- |
| `request`         | 1   | Za svaki API zahtjev usmjeren kroz OmniRoute            |
| `provider_switch` | 5   | Prebacivanje na drugog pružatelja usluge                |
| `model_switch`    | 3   | Prebacivanje na drugi model                             |
| `combo_create`    | 10  | Stvaranje nove kombinacije                              |
| `combo_use`       | 2   | Upotreba kombinacije za zahtjev                         |
| `token_share`     | 1   | Za svakih 1 000 tokena podijeljenih s drugim korisnikom |
| `invite_redeem`   | 50  | Iskorištavanje pozivnog koda                            |
| `daily_login`     | 5   | Dnevna aktivna upotreba (jednom dnevno)                 |
| `streak_bonus`    | 2   | Za svaki uzastopni dan niza (pomnoženo s duljinom niza) |
| `badge_unlock`    | 10  | Otključavanje značke                                    |

### Tijek dodjele

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. Potražite `XP_REWARDS[action]` kako biste dobili količinu XP-a.
2. Proslijedite kroz `checkRateLimit()` (zaštita od varanja: najviše 1000 XP-a/min po ključu).
3. Otvorite transakciju:
   - Pročitajte trenutačni redak `user_levels`.
   - Dodajte XP; ponovno izračunajte razinu putem `levelFromXp(totalXp)`.
   - Ako se razina promijenila, postavite `levelUp = true`.
   - Ažurirajte redak `user_levels`.
   - Umetnite zapis u `xp_audit_log`.
4. Vratite rezultat. Pozivatelj obrađuje obavijesti.

### Pomoćna funkcija: `levelFromXp(totalXp)`

Iterira kroz razine 1..100, zbrajajući `xp_for_level(n)` sve dok kumulativni XP
ne premaši `totalXp`. Vraća najvišu razinu čiji je prag dosegnut.
Složenost je O(100) — prihvatljivo jer su razine ograničene na 100.

---

## Sustav znački

**Datoteka:** `src/lib/gamification/badges.ts`

### Kategorije

| Kategorija     | Opis                                      | Primjeri znački                              |
| -------------- | ----------------------------------------- | -------------------------------------------- |
| `usage`        | Ključne prekretnice temeljene na količini | Prvi zahtjev, 1K zahtjeva, 100K              |
| `sharing`      | Dijeljenje tokena i preporuke             | Prvo dijeljenje, Velikodušan (10 dijeljenja) |
| `contribution` | Sudjelovanje u zajednici                  | Kreator kombinacija, Istraživač pružatelja   |
| `streak`       | Dosljednost tijekom vremena               | Tjedni ratnik, Mjesečno posvećen             |
| `rare`         | Teško dostupna ili skrivena postignuća    | Rani korisnik, Prijavitelj pogrešaka         |

### Rijetkosti

| Rijetkost   | Boja   | Okvirna vjerojatnost |
| ----------- | ------ | -------------------- |
| `common`    | Siva   | Većina korisnika     |
| `uncommon`  | Zelena | Aktivni korisnici    |
| `rare`      | Plava  | Predani korisnici    |
| `legendary` | Zlatna | Najboljih 1 %        |

### Vrste kriterija

| Vrsta          | Polje          | Opis                                                                |
| -------------- | -------------- | ------------------------------------------------------------------- |
| `action_count` | `count`        | Izvršite radnju N puta (npr. 1000 zahtjeva)                         |
| `streak`       | `days`         | Održavajte niz tijekom N uzastopnih dana                            |
| `unique_count` | `field`, `n`   | Upotrijebite N jedinstvenih vrijednosti (npr. 10 različitih modela) |
| `rank`         | `scope`, `n`   | Dosegnite N. mjesto u zadanom opsegu ljestvice                      |
| `first`        | —              | Budite prvi koji je izvršio radnju                                  |
| `hidden`       | (razlikuje se) | Kriteriji se ne prikazuju dok se značka ne osvoji                   |

Definicije znački pohranjuju se u `badge_definitions` kao JSON `criteria`:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Tijek evaluacije

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # sve definicije
    → getUserBadges(apiKeyId)         # već osvojene (preskoči)
    → za svaku neosvojenu značku:
       → matchesCriteria(badge, event, userState)
       → ako odgovara: awardBadge(apiKeyId, badgeId)
         → vrati podatke obavijesti
```

Evaluacija se **pokreće događajima** — izvršava se nakon svakog gamifikacijskog događaja, ali
provjerava samo značke čiji je `criteria.type` usklađen s radnjom događaja. Time
evaluacija ostaje brza (< 5 ms za većinu događaja).

### `matchesCriteria(badge, event, userState)`

| Vrsta kriterija | Provjera                                                   |
| --------------- | ---------------------------------------------------------- |
| `action_count`  | `getActionCount(apiKeyId, action) >= count`                |
| `streak`        | `getCurrentStreak(apiKeyId) >= days`                       |
| `unique_count`  | `getUniqueCount(apiKeyId, field) >= n`                     |
| `rank`          | `getRank(apiKeyId, scope) <= n`                            |
| `first`         | Nema prethodnog unosa u `xp_audit_log` za ovu vrstu radnje |
| `hidden`        | Delegira odgovarajućoj potprovjeri                         |

### Ugrađene značke (20+)

<details>
<summary>Potpuni popis znački</summary>

| Značka                   | Kategorija | Rijetkost    | Kriteriji                             |
| ------------------------ | ---------- | ------------ | ------------------------------------- |
| Prvi koraci              | korištenje | uobičajena   | 1 zahtjev                             |
| Zagrijavanje             | korištenje | uobičajena   | 100 zahtjeva                          |
| Napredni korisnik        | korištenje | neuobičajena | 1.000 zahtjeva                        |
| Centurion                | korištenje | rijetka      | 10.000 zahtjeva                       |
| OmniPower                | korištenje | legendarna   | 100.000 zahtjeva                      |
| Skakač među pružateljima | doprinos   | uobičajena   | Upotrijebite 5 različitih pružatelja  |
| Majstor pružatelja       | doprinos   | neuobičajena | Upotrijebite 20 različitih pružatelja |
| Arhitekt kombinacija     | doprinos   | neuobičajena | Izradite 5 kombinacija                |
| Velemajstor kombinacija  | doprinos   | rijetka      | Izradite 25 kombinacija               |
| Prvo dijeljenje          | dijeljenje | uobičajena   | 1 prijenos tokena                     |
| Velikodušan              | dijeljenje | neuobičajena | 10 prijenosa tokena                   |
| Filantrop                | dijeljenje | rijetka      | Prenesite ukupno 10.000 tokena        |
| Preporučitelj            | dijeljenje | uobičajena   | 1 uspješna preporuka                  |
| Graditelj mreže          | dijeljenje | neuobičajena | 10 uspješnih preporuka                |
| Tjedni ratnik            | niz        | neuobičajena | Niz od 7 dana                         |
| Mjesečno posvećen        | niz        | rijetka      | Niz od 30 dana                        |
| Nezaustavljiv            | niz        | legendarna   | Niz od 365 dana                       |
| Rani korisnik            | rijetka    | legendarna   | Pridružite se tijekom beta-razdoblja  |
| Pionir kompresije        | rijetka    | neuobičajena | Upotrijebite kompresiju 100 puta      |
| Sakupljač vještina       | rijetka    | rijetka      | Upotrijebite 10 različitih vještina   |
| Istraživač modela        | doprinos   | neuobičajena | Upotrijebite 15 različitih modela     |

</details>

---

## Praćenje niza

**Datoteka:** `src/lib/gamification/streaks.ts`

### Model podataka

Nizovi se pohranjuju u tablici `key_value` (zajednička pomoćna tablica) pod
ključevima s prostorom imena:

| Ključ                         | Vrijednost                       | Opis                   |
| ----------------------------- | -------------------------------- | ---------------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Podaci o aktivnom nizu |

### Logika

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Pročitajte zapis niza iz tablice `key_value`.
2. Raščlanite `{current}`, `{longest}`, `{lastDate}` (datumski niz u ISO formatu).
3. Ako je `lastDate === today` — nema promjene (današnji je dan već uračunat).
4. Ako je `lastDate === yesterday` — povećajte `current`; po potrebi ažurirajte `longest`.
5. Ako je `lastDate < yesterday` — vratite `current = 1` (niz je prekinut).
6. Zapišite ažurirani zapis.
7. Provjerite prekretnice: 7, 14, 30, 60, 90, 180, 365 dana. Ako je neka prijeđena, postavite
   `milestone = true` (pozivatelj dodjeljuje XP i provjerava značke).

### Rubni slučajevi

- **Vremenska zona**: nizovi upotrebljavaju UTC datume (`new Date().toISOString().slice(0, 10)`).
  To je namjerno — jedna kanonska vremenska zona sprječava manipuliranje
  promjenom vremenskih zona.
- **Novi korisnici**: zapis niza ne postoji; prvi ga zahtjev stvara s vrijednostima
  `current=1, longest=1, lastDate=today`.
- **Više zahtjeva dnevno**: samo prvi zahtjev u UTC danu
  povećava niz.

---

## Ljestvica poretka

**Datoteka:** `src/lib/gamification/leaderboard.ts`

### Opsezi

| Opseg           | Razdoblje | Opis                                                             |
| --------------- | --------- | ---------------------------------------------------------------- |
| `global`        | `all`     | Ukupni XP svih vremena                                           |
| `weekly`        | `week`    | XP zarađen u trenutačnom UTC tjednu (pon–ned)                    |
| `monthly`       | `month`   | XP zarađen u trenutačnom UTC mjesecu                             |
| `tokens_shared` | `all`     | Ukupan broj tokena prenesenih drugima                            |
| `contributions` | `all`     | Stvorene kombinacije + korišteni pružatelji + korištene vještine |

### Izračun ranga

Rangovi se **izračunavaju pri čitanju**, a ne pohranjuju. Time se izbjegavaju zastarjeli podaci o rangu
i uklanja potreba za periodičnim zadacima ponovnog izračunavanja rangova.

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

### Rotacija razdoblja

Tjedne i mjesečne ljestvice automatski se rotiraju:

1. **Arhiviranje**: na granici razdoblja kopirajte trenutačne unose u
   `leaderboard_archive` s oznakom razdoblja.
2. **Ponovno postavljanje**: izbrišite unose za isteklo razdoblje.
3. **Okidač**: provjerava se pri svakom pozivu funkcije `updateLeaderboard()`; prvi zahtjev
   u novom razdoblju pokreće rotaciju.

Time se osigurava da se tjedne ljestvice ponovno postavljaju svakog ponedjeljka u 00:00 UTC, a mjesečne ljestvice
prvog dana svakog mjeseca.

### SSE ažuriranja u stvarnom vremenu

**Krajnja točka:** `GET /api/gamification/stream`

```
Klijent → GET /api/gamification/stream
  → Uspostavljena je SSE veza
  → Poslužitelj odmah šalje snimku 10 najboljih na ljestvici
  → Svakih 5 sekundi: šalje ažuriranih 10 najboljih ako je došlo do promjene
  → Svakih 15 sekundi: komentar za održavanje veze (": heartbeat\n\n")
  → Klijent prekida vezu → čišćenje (uklanjanje slušatelja)
```

Format događaja:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

Upravitelj SSE-a prati povezane klijente po opsegu i šalje ažuriranja samo
kada su se podaci ljestvice stvarno promijenili od posljednjeg slanja.

---

## Dijeljenje tokena

**Datoteka:** `src/lib/gamification/sharing.ts`

### Dvojno knjigovodstvo

Svaki prijenos stvara dva retka u tablici `token_ledger`:

| Redak           | `from_key_id` | `to_key_id` | `amount` |
| --------------- | ------------- | ----------- | -------- |
| Dugovna stavka  | pošiljatelj   | primatelj   | +iznos   |
| Potražna stavka | primatelj     | pošiljatelj | -iznos   |

Čekajte — konvencija je:

| Redak    | `from_key_id` | `to_key_id` | `amount` | Značenje               |
| -------- | ------------- | ----------- | -------- | ---------------------- |
| Slanje   | pošiljatelj   | primatelj   | +iznos   | Odljev od pošiljatelja |
| Primanje | primatelj     | pošiljatelj | +iznos   | Priljev primatelju     |

Stanje se izračunava na sljedeći način:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Tijek prijenosa

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Provjera valjanosti**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **Idempotentnost**: provjerite postoji li `idempotency_key` već u glavnoj knjizi.
   Ako postoji, vratite predmemorirani rezultat.
3. **Transakcija** (jedna SQLite transakcija):
   a. Izračunajte stanje pošiljatelja.
   b. Ako je `balance < amount`, prekinite transakciju (nedovoljno sredstava).
   c. Umetnite redak slanja (`from=sender,`.

### Ograničavanje učestalosti

- Najviše 10 prijenosa u minuti po API ključu.
- Najviše 10.000 tokena po pojedinačnom prijenosu.
- Najviše 100.000 prenesenih tokena dnevno po API ključu.

---

## Tokeni za pozivanje i iskorištavanje

**Datoteka:** `src/lib/gamification/invites.ts`

### Format koda

- **Kod**: alfanumerički kod od 8 znakova (npr. `A3K9-X7M2`), čitljiv ljudima,
  prikazuje se korisniku.
- **Token**: nasumični token od 32 bajta, pohranjen kao SHA-256 sažetak. Upotrebljava se za
  programsko iskorištavanje (npr. putem URL poveznica).

### Pohrana

| Stupac       | Vrijednost                          |
| ------------ | ----------------------------------- |
| `code`       | `A3K9X7M2` (jedinstven, indeksiran) |
| `token_hash` | SHA-256(raw_token)                  |

Neobrađeni token vraća se korisniku samo jednom, u trenutku stvaranja. OmniRoute
ga više nikada ne pohranjuje niti prikazuje — zadržava se samo sažetak.

### Sprječavanje samopreporuke

Kada korisnik iskoristi kod, sustav provjerava:

1. Pripada li kod drugom `api_key_id`.
2. Je li korisnik koji iskorištava kod prethodno iskoristio neki kod istog
   preporučitelja (spajanje tablica `invite_tokens` i zapisnika iskorištavanja).

Ako bilo koja provjera ne uspije, iskorištavanje se odbija uz jasnu poruku o pogrešci.

### Istek i ograničenja

- Zadani `max_uses`: 10 (može se konfigurirati pri stvaranju).
- Zadani `expires_at`: 30 dana od stvaranja.
- Istekli ili u potpunosti iskorišteni kodovi vraćaju HTTP 410 Gone.

---

## Federacija poslužitelja zajednice

**Datoteka:** `src/lib/gamification/servers.ts`

### Povezivanje

Poslužitelj zajednice registrira se putem pozivnog tokena koji izdaje udaljeni
poslužitelj. Lokalna instanca:

1. Prima pozivni token (npr. zalijepljen na nadzornu ploču).
2. Poziva `POST /api/gamification/federation/leaderboard` na udaljenom poslužitelju
   kako bi provjerila valjanost tokena i dohvatila trenutačnu ljestvicu.
3. Sprema zapis poslužitelja sa `status: connected`.

### Model sinkronizacije

Federacija upotrebljava **sinkronizaciju prepisivanjem**, a ne zbrajanjem:

```
Lokalna instanca               Poslužitelj zajednice
     │                              │
     ├── slanje rezultata ─────────►│  POST /federation/score
     │   { api_key_id, score }      │  (poslužitelj provjerava sažetak tokena)
     │                              │
     ├── dohvaćanje ljestvice ─────►│  GET /federation/leaderboard
     │◄── prvih N unosa ───────────┤  (prepisuje lokalnu predmemoriju)
     │                              │
     └── provjera dostupnosti ─────►│  GET /federation/health
         (svakih 60 s, istek 5 s)   │
```

### Autentifikacija

Zahtjevi federacije uključuju:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

Udaljeni poslužitelj izračunava sažetak tokena i traži odgovarajući redak u
`community_servers`. Time se izbjegava prijenos pohranjenog sažetka.

### Praćenje dostupnosti

Svaki zapis poslužitelja prati:

| Polje       | Opis                                                |
| ----------- | --------------------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable`              |
| `last_sync` | ISO vremenska oznaka zadnje uspješne sinkronizacije |
| `failures`  | Uzastopni neuspjesi provjere dostupnosti            |

Nakon 5 uzastopnih neuspjeha status se mijenja u `unreachable`, a sinkronizacija
se pauzira sve dok ručna provjera dostupnosti ne uspije.

---

## Zaštita od varanja

**Datoteka:** `src/lib/gamification/antiCheat.ts`

### Izračun bodova na strani poslužitelja

Svi izračuni XP-a odvijaju se u `src/lib/gamification/xp.ts`. Klijenti nikada
ne šalju rezultat — šalju radnje, a poslužitelj izračunava XP. U stupac
`leaderboard.score` može pisati samo kôd na strani poslužitelja.

### Ograničavanje učestalosti

| Ograničenje               | Vrijednost | Opseg         |
| ------------------------- | ---------- | ------------- |
| Maks. XP-a po minuti      | 1,000      | Po API ključu |
| Maks. prijenosa po minuti | 10         | Po API ključu |
| Maks. iznos prijenosa     | 10,000     | Po prijenosu  |
| Maks. dnevnih prijenosa   | 100,000    | Po API ključu |

Ograničenja učestalosti upotrebljavaju klizni prozor u memoriji (isti obrazac kao
`RateLimitManager` u `open-sse/services/`). Ako se proces ponovno pokrene,
upotrebljavaju se brojači pohranjeni u SQLiteu.

### Otkrivanje anomalija Z-rezultatom

Za svaki API ključ sustav održava pomični sedmodnevni prozor XP-a zarađenog po
satu. Pri svakoj dodjeli XP-a:

1. Izračunava trenutačnu korisnikovu satnu stopu XP-a.
2. Izračunava aritmetičku sredinu i standardnu devijaciju populacije.
3. Izračunava `z = (user_rate - mean) / stddev`.
4. Ako je `z > 3.0` (3 standardne devijacije), označava događaj kao anomaliju.

Anomalije se zapisuju u `xp_audit_log` uz `action = 'anomaly_detected'`
i prikazuju na administratorskoj nadzornoj ploči.

### Revizijski trag

Svaka dodjela XP-a, prijenos, osvajanje značke i otkrivanje anomalije zapisuju se
u `xp_audit_log` sa sljedećim podacima:

| Polje        | Opis                                             |
| ------------ | ------------------------------------------------ |
| `api_key_id` | Tko                                              |
| `action`     | Što se dogodilo (xp_award, transfer, anomaly, …) |
| `xp_awarded` | Iznos (0 za događaje koji nisu povezani s XP-om) |
| `metadata`   | JSON s kontekstom (vrsta radnje, cilj, …)        |
| `created_at` | Kada (ISO 8601)                                  |

Administratori mogu dohvatiti cijeli revizijski trag putem
`GET /api/gamification/anomalies`.

---

## API rute

Sve rute slijede standardni OmniRoute obrazac:

```
Ruta → CORS preliminarni zahtjev → Provjera tijela zahtjeva (Zod) → Autentikacija (extractApiKey)
  → Rukovatelj
```

### Krajnje točke

| Metoda | Putanja                                    | Opis                                                | Autentikacija |
| ------ | ------------------------------------------ | --------------------------------------------------- | ------------- |
| GET    | `/api/gamification/leaderboard`            | Dohvaćanje ljestvice (opseg, razdoblje, paginacija) | Neobavezna    |
| POST   | `/api/gamification/leaderboard`            | Prisilno osvježavanje predmemorije ljestvice        | Obavezna      |
| GET    | `/api/gamification/stream`                 | SSE ažuriranja ljestvice u stvarnom vremenu         | Neobavezna    |
| GET    | `/api/gamification/transfer`               | Dohvaćanje povijesti prijenosa (paginacija)         | Obavezna      |
| POST   | `/api/gamification/transfer`               | Slanje tokena drugom korisniku                      | Obavezna      |
| GET    | `/api/gamification/invite`                 | Popis mojih pozivnih kodova                         | Obavezna      |
| POST   | `/api/gamification/invite`                 | Generiranje novog pozivnog koda                     | Obavezna      |
| DELETE | `/api/gamification/invite`                 | Opozivanje pozivnog koda                            | Obavezna      |
| POST   | `/api/gamification/invite/redeem`          | Iskorištavanje pozivnog koda                        | Obavezna      |
| GET    | `/api/gamification/servers`                | Popis poslužitelja zajednice                        | Obavezna      |
| POST   | `/api/gamification/servers`                | Povezivanje s poslužiteljem zajednice               | Obavezna      |
| DELETE | `/api/gamification/servers`                | Prekid veze s poslužiteljem zajednice               | Obavezna      |
| POST   | `/api/gamification/federation/score`       | Slanje rezultata udaljenom poslužitelju             | Federacija    |
| GET    | `/api/gamification/federation/leaderboard` | Dohvaćanje ljestvice s udaljenog poslužitelja       | Federacija    |
| GET    | `/api/gamification/notifications`          | SSE obavijesti o značkama/napredovanju razine       | Obavezna      |
| GET    | `/api/gamification/anomalies`              | Pregled izvješća o anomalijama (administrator)      | Administrator |
| POST   | `/api/gamification/rotate`                 | Rotacija tajni pozivnih tokena                      | Obavezna      |

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

Registrirani u `open-sse/mcp-server/` zajedno s postojećim alatima. Ograničeni su
na opseg dopuštenja `gamification`.

| Alat                       | Opis                                                      | Ulazna shema                 |           |
| -------------------------- | --------------------------------------------------------- | ---------------------------- | --------- |
| `gamification_leaderboard` | Dohvati ljestvicu za opseg/razdoblje                      | `{ scope, period?, limit? }` |
| `gamification_rank`        | Dohvati rang pozivatelja i susjedne rangove               | `{ scope }`                  |
| `gamification_profile`     | Dohvati sažetak XP-a, razine, titule i niza               | `{}`                         |
| `gamification_badges`      | Navedi osvojene značke ili sve definicije                 | `{ earned?: boolean }`       |
| `gamification_transfer`    | Pošalji tokene drugom korisniku                           | `{ to, amount }`             |
| `gamification_invite`      | Generiraj ili navedi pozivne kodove                       | `{ action: "create"          | "list" }` |
| `gamification_servers`     | Navedi ili poveži poslužitelje zajednice                  | `{ action, token? }`         |
| `gamification_anomalies`   | Pregledaj izvješća o anomalijama (administratorski opseg) | `{ limit?, since? }`         |

---

## Stranice nadzorne ploče

### `/dashboard/leaderboard`

- Prikaz pobjedničkog postolja (prva 3 mjesta s avatarima i XP-om).
- Odabir opsega: Globalno / Tjedno / Mjesečno / Podijeljeni tokeni / Doprinosi.
- Tablica sa straničenjem (25 po stranici) s rangom, imenom, rezultatom, razinom i titulom.
- Ažuriranja u stvarnom vremenu putem SSE-a — promjene ranga su animirane.
- Trenutačni korisnik istaknut je u tablici ljepljivim retkom "Vaš rang".

### `/dashboard/profile`

- Traka napretka XP-a s trenutačnom razinom i pragom sljedeće razine.
- Značka titule prikazana je na istaknutom mjestu.
- Galerija znački — osvojene značke s datumom osvajanja, neosvojene značke prikazane su sivo
  (skrivene značke prikazuju "???" dok se ne osvoje).
- Brojač niza s ikonom plamena; kalendar niza (posljednjih 30 dana).
- Grafikon povijesti XP-a (dnevni XP tijekom posljednjih 30 dana).

### `/dashboard/tokens`

- Saldo tokena (istaknut na vrhu stranice).
- Obrazac za prijenos: primatelj, iznos, dijaloški okvir za potvrdu.
- Tablica povijesti prijenosa s filtrima (poslano/primljeno/sve).
- Odjeljak s pozivnicama: aktivni kodovi, generiranje novih, poveznica za dijeljenje.
- Poslužitelji zajednice: popis sa zdravstvenim stanjem, povezivanje/prekid veze.

### `/dashboard/gamification/admin`

- Popis anomalija s ozbiljnošću, korisnikom, vremenskom oznakom i z-rezultatom.
- Preglednik zapisnika revizije s filtrima (vrsta radnje, korisnik, raspon datuma).
- Statistika sustava: ukupno dodijeljeni XP, aktivni korisnici, stope osvajanja znački.
- Pregled zdravstvenog stanja federacijskih poslužitelja.

---

## Integracija s procesnim tokom

### Točka integracije

Gamifikacija se uključuje u procesni tok zahtjeva na jednoj točki u
`open-sse/handlers/chatCore.ts`:

```typescript
// Nakon što se odgovor pošalje klijentu:
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
    // Pokreni i zaboravi: zabilježi, ali nikada ne prosljeđuj klijentu
  });
});
```

### Vrste događaja

| Vrsta događaja      | Kada se emitira                                                   |
| ------------------- | ----------------------------------------------------------------- |
| `request.completed` | Poslan je uspješan odgovor LLM-a                                  |
| `provider.switch`   | Pružatelj je promijenjen (računa se zamjenski odabir kombinacije) |
| `combo.created`     | Spremljena je nova konfiguracija kombinacije                      |
| `combo.used`        | Cilj kombinacije uspješno je pogođen                              |
| `badge.earned`      | Evaluacijom značke pronađeno je podudaranje                       |
| `streak.milestone`  | Dosegnut je prag niza                                             |
| `transfer.sent`     | Prijenos tokena je dovršen                                        |
| `referral.redeemed` | Pozivni kod uspješno je iskorišten                                |
| `compression.used`  | Primijenjena je kompresija upita                                  |
| `skill.executed`    | Izvršavanje vještine je dovršeno                                  |
| `model.first_use`   | Model nije korišten u posljednjih 7 dana                          |

### Jamstvo neblokirajućeg izvršavanja

Uzorak `setImmediate` + `.catch(() => {})` osigurava:

1. Odgovor je u potpunosti poslan prije pokretanja gamifikacije.
2. Pogreške gamifikacije nikada se ne prikazuju klijentu.
3. Obrada događaja izvršava se u sljedećem mikrozadatku, a ne izravno.

## Sigurnost

### Model prijetnji

| Prijetnja                     | Ublažavanje                                                                           |
| ----------------------------- | ------------------------------------------------------------------------------------- |
| Umjetno povećavanje bodova    | Izračun XP-a samo na poslužitelju; klijenti šalju radnje, a ne bodove                 |
| Napadi ponavljanjem           | Ključevi idempotentnosti za prijenose; deduplikacija zapisnika nadzora                |
| Prijevara s prijenosima       | Dvojno knjigovodstvo; atomske transakcije; ograničenja učestalosti zahtjeva           |
| Samostalna preporuka          | Unakrsna provjera `api_key_id` pri iskorištavanju                                     |
| Manipulacija ljestvicom       | Otkrivanje anomalija Z-vrijednosti; administratorska nadzorna ploča anomalija         |
| Krađa federacijskog tokena    | Pohrana sa SHA-256 sažetkom; neobrađeni token prikazuje se samo jednom                |
| Grubo pogađanje kodova poziva | Ograničavanje učestalosti na krajnjoj točki za iskorištavanje; entropija od 8 znakova |
| XSS u imenima za prikaz       | Imena za prikaz su sanitizirana; unosi ljestvice pravilno su escapeani                |
| Vremenski napadi na sažetke   | `crypto.timingSafeEqual` za usporedbu sažetaka tokena                                 |

### Zahtjevi za autentikaciju

- **Javno** (bez autentikacije): `GET /leaderboard`, `GET /stream` (ljestvice
  samo za čitanje).
- **Potreban API ključ**: sve operacije pisanja, profil, prijenosi i pozivi.
- **Samo za administratore**: nadzorna ploča anomalija, preglednik zapisnika nadzora.
- **Federacija**: zaseban put autentikacije koji upotrebljava neobrađeni token u
  zaglavlju `Authorization`, provjeren u odnosu na pohranjeni SHA-256 sažetak.

---

## Testiranje

### Datoteke testova

Svi testovi upotrebljavaju izvorni Node.js pokretač testova (`node --import tsx/esm --test`).

| Datoteka testa                                | Obuhvaća                                                   | Testovi |
| --------------------------------------------- | ---------------------------------------------------------- | ------- |
| `tests/unit/gamification/xp.test.ts`          | Izračun XP-a, krivulju razina, titule                      | 8       |
| `tests/unit/gamification/badges.test.ts`      | Podudaranje kriterija znački, dodjeljivanje                | 10      |
| `tests/unit/gamification/streaks.test.ts`     | Logiku nizova, ključne točke, rubne slučajeve              | 7       |
| `tests/unit/gamification/leaderboard.test.ts` | Izračun ranga, straničenje, rotaciju                       | 8       |
| `tests/unit/gamification/sharing.test.ts`     | Prijenose, stanje, idempotentnost                          | 9       |
| `tests/unit/gamification/invites.test.ts`     | Stvaranje, iskorištavanje, istek, samostalne preporuke     | 7       |
| `tests/unit/gamification/antiCheat.test.ts`   | Ograničenja učestalosti, Z-vrijednost, zapisivanje nadzora | 6       |
| `tests/unit/gamification/events.test.ts`      | Emitiranje događaja, distribuciju, obradu pogrešaka        | 5       |

### Pokretanje testova

```bash
# Svi testovi gamifikacije
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# Jedna datoteka testa
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Zahtjevi za pokrivenost

Prema `CONTRIBUTING.md` — svi novi moduli moraju imati:

- Pokrivenost grana >= 80%.
- Svaka javna funkcija mora biti testirana barem jednom.
- Putovi pogrešaka moraju biti testirani (nedovoljno stanje, istekli kodovi, ograničenja učestalosti).

---

## Struktura datoteka

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # Svih 8 tablica + indeksi
      gamification.ts                  # Domenski CRUD modul
    gamification/
      xp.ts                           # Izračun XP-a, krivulja razina, titule
      badges.ts                       # Definicije znački, kriteriji, evaluacija
      streaks.ts                      # Praćenje dnevnog niza aktivnosti
      leaderboard.ts                  # Izračun ranga, SSE, rotacija
      antiCheat.ts                    # Ograničavanje učestalosti, z-vrijednost, revizija
      sharing.ts                      # Glavna knjiga prijenosa tokena
      invites.ts                      # Kodovi za poziv i iskorištavanje
      servers.ts                      # Federacija poslužitelja zajednice
      events.ts                       # Emiter događaja (integracijska točka)
      notifications.ts                # SSE tok obavijesti
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST ljestvica
        leaderboard/stream/route.ts   # SSE ažuriranja u stvarnom vremenu
        transfer/route.ts             # GET/POST prijenosi
        invite/route.ts               # GET/POST/DELETE pozivni kodovi
        invite/redeem/route.ts        # POST iskorištavanje koda
        servers/route.ts              # GET/POST/DELETE poslužitelji
        federation/score/route.ts     # POST slanje rezultata
        federation/leaderboard/route.ts # GET dohvaćanje ljestvice
        notifications/route.ts        # SSE obavijesti
        anomalies/route.ts            # GET izvješća o anomalijama
        rotate/route.ts               # POST rotiranje tajni
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Stranica s rangiranjem
        profile/page.tsx               # Stranica XP-a/znački/nizova aktivnosti
        tokens/page.tsx                # Stranica stanja/prijenosa/pozivnica
        gamification/admin/page.tsx    # Administratorski nadzor anomalija
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

### Faza 1: Jezgra pozadinskog sustava (PR 1)

- Migracija `060_create_gamification.sql` (8 tablica).
- `src/lib/db/gamification.ts` (domenski modul).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- Integracijska točka u `chatCore.ts`.
- Jedinični testovi za XP, nizove aktivnosti i događaje.

### Faza 2: Značke i ljestvica (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Definicije znački u konstantama.
- API rute ljestvice + SSE tok.
- Jedinični testovi za značke i ljestvicu.

### Faza 3: Dijeljenje i pozivnice (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- API rute za prijenose i pozivnice.
- Jedinični testovi za dijeljenje, pozivnice i sprječavanje varanja.

### Faza 4: Federacija i nadzorna ploča (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- API rute federacije.
- Stranice nadzorne ploče (ljestvica, profil, tokeni, administracija).
- Registracija MCP alata.

---

## Buduća razmatranja

- **Sezonski događaji**: vremenski ograničeni skupovi znački i sezone ljestvice najboljih.
- **Timske ljestvice najboljih**: grupiranje korisnika prema organizaciji ili kombinaciji.
- **XP množitelji**: povećanje XP-a tijekom promotivnih razdoblja.
- **Dijeljenje postignuća**: generiranje djeljivih kartica znački (OpenGraph slike).
- **Mobilne push obavijesti**: obavijesti temeljene na webhookovima za događaje povezane sa značkama/razinama.
- **API ljestvice najboljih**: javni API za integracije trećih strana.
