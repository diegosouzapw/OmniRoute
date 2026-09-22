# Gamification & Leaderboard System (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **Vir resnice:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Nazadnje posodobljeno:** 2026-06-28 — v3.8.40

OmniRoute vključuje lokalno usmerjeno plast igrifikacije, ki uporabnike nagrajuje za
uporabo platforme — pošiljanje zahtev, preklapljanje ponudnikov, ustvarjanje
kombinacij, deljenje žetonov in prispevanje skupnosti. Celotno stanje je shranjeno v
SQLite; povezovanje s strežniki skupnosti je izbirno in temelji na potisnem pošiljanju.

Sistem je zasnovan tako, da zagotavlja **ničelno zakasnitev na kritični poti** — dogodki
igrifikacije se iz cevovoda zahtev sprožijo po načelu »sproži in pozabi« ter nikoli ne
blokirajo odgovora LLM.

---

## Pregled

### Namen

Povečati vključenost in zadržanje uporabnikov z zagotavljanjem vidnega napredka (XP,
ravni, značke), družbenega dokaza (lestvice najboljših) in ekonomskih spodbud (deljenje
žetonov, nagrade za povabila).

### Obseg

| Funkcionalnost         | Opis                                                                                      |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| XP in ravni            | Pridobivanje XP za posamezno dejanje; napredovanje po polinomski krivulji                 |
| Značke                 | Več kot 20 dosežkov v 5 kategorijah s 4 stopnjami redkosti                                |
| Nizi aktivnosti        | Spremljanje dnevne aktivne uporabe s trenutnim/najdaljšim nizom                           |
| Lestvice najboljših    | Globalni, tedenski, mesečni, za deljenje žetonov in prispevke                             |
| Deljenje žetonov       | Prenos dobroimetja med uporabniki prek dvostavnega registra                               |
| Povabila in unovčenje  | Referenčne kode, shranjene kot zgoščene vrednosti SHA-256                                 |
| Strežniki skupnosti    | Povezovanje z zunanjimi primerki OmniRoute                                                |
| Preprečevanje goljufij | Točkovanje na strani strežnika, omejevanje hitrosti in zaznavanje anomalij z z-vrednostjo |

### Načela zasnove

1. **Lokalno usmerjeno** — celotno stanje je v SQLite; zunanje storitve niso potrebne.
2. **Neblokirajoče** — dogodki se izvajajo po načelu »sproži in pozabi«; logika
   igrifikacije nikoli ne zakasni poti odgovora LLM.
3. **Strežnik je avtoritativen** — XP se izračunava izključno na strani strežnika; odjemalci
   ne morejo umetno zvišati rezultatov.
4. **Spoštovanje zasebnosti** — sodelovanje na lestvicah najboljših je izbirno; uporabniki lahko
   skrijejo svoj profil.
5. **Pripravljeno na federacijo** — strežniki skupnosti lahko pošiljajo rezultate prek podpisanega API-ja;
   sinhronizacija prepiše vrednosti in jih ne prišteva.

---

## Arhitektura

### Tok na visoki ravni

```
Zahteva odjemalca
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (obstoječi cevovod) ...
      → odgovor nadrejene storitve, poslan odjemalcu
      → setImmediate (sproži in pozabi):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

Oddajnik dogodkov je enotna integracijska točka. `chatCore.ts` po poslanem odgovoru
pokliče `emitGamificationEvent()`; modul dogodkov nato razpošlje obdelavo
podsistemom za XP, nize aktivnosti, značke, lestvice najboljših in preprečevanje goljufij.

### Graf odvisnosti modulov

```
src/lib/gamification/
  events.ts          ← vstopna točka (klic iz chatCore.ts)
    ├── xp.ts        ← izračun XP in določanje ravni
    ├── streaks.ts   ← spremljanje dnevnih nizov aktivnosti
    ├── badges.ts    ← vrednotenje meril za značke
    ├── leaderboard.ts ← izračun uvrstitev in oddajanje prek SSE
    ├── antiCheat.ts ← omejevanje hitrosti in zaznavanje anomalij
    ├── sharing.ts   ← register prenosov žetonov
    ├── invites.ts   ← upravljanje kod za povabila/unovčenje
    ├── servers.ts   ← federacija strežnikov skupnosti
    └── notifications.ts ← tok obvestil SSE

src/lib/db/
  gamification.ts    ← vse operacije CRUD (8 tabel)

src/app/api/gamification/
  leaderboard/       ← GET uvrstitve, POST ročna osvežitev
  leaderboard/stream ← posodobitve SSE v realnem času
  transfer/          ← GET zgodovina, POST pošiljanje žetonov
  invite/            ← GET/POST kode, DELETE preklic
  invite/redeem/     ← POST unovčenje kode
  servers/           ← GET/POST/DELETE strežniki skupnosti
  federation/score/  ← POST potisno pošiljanje rezultata strežniku
  federation/leaderboard/ ← GET pridobivanje lestvice najboljših iz strežnika
  notifications/     ← obvestila SSE o značkah/napredovanju na višjo raven
  anomalies/         ← GET poročila o anomalijah (skrbnik)
  rotate/            ← POST zamenjava skrivnosti žetonov za povabila
```

---

## Podatkovna plast

### Tabele zbirke podatkov

Vse tabele so v glavni zbirki podatkov SQLite OmniRoute in so ustvarjene z migracijo
`060_create_gamification.sql`. Beleženje WAL je podedovano iz singletona
`getDbInstance()` v `src/lib/db/core.ts`.

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

Sledi standardnemu vzorcu OmniRoute — uvozi `getDbInstance()` iz
`core.ts` in izvozi tipizirane funkcije CRUD. V obdelovalnikih poti ni surovega SQL-a.

Ključne funkcije:

| Funkcija                   | Opis                                                        |
| -------------------------- | ----------------------------------------------------------- |
| `upsertLeaderboardEntry()` | Vstavi ali posodobi rezultat za (api_key_id, scope, period) |
| `getLeaderboard()`         | Ostranjene uvrstitve za podani obseg/obdobje                |
| `getUserLevel()`           | Pridobi ali ustvari zapis ravni uporabnika                  |
| `updateUserLevel()`        | Atomsko nastavi XP, raven in naziv                          |
| `getBadgeDefinitions()`    | Vse definicije značk (izbirno filtrirane)                   |
| `getUserBadges()`          | Značke, ki jih je pridobil uporabnik                        |
| `awardBadge()`             | Vstavi pridobitev značke (idempotentno glede na badge_id)   |
| `logXpAction()`            | Doda zapis v xp_audit_log                                   |
| `getXpAuditLog()`          | Ostranjena zgodovina revizijskega dnevnika uporabnika       |
| `insertLedgerEntry()`      | Dvostavni prenos (v transakciji)                            |
| `getBalance()`             | Vsota prejetega, zmanjšana za poslano, za uporabnika        |
| `getTransferHistory()`     | Ostranjen dnevnik prenosov                                  |
| `createInviteToken()`      | Vstavi kodo povabila in zgoščeni žeton                      |
| `redeemInviteToken()`      | Poišče po kodi, preveri veljavnost in poveča število uporab |
| `upsertCommunityServer()`  | Registrira ali posodobi federacijski strežnik               |
| `getCommunityServers()`    | Navede strežnike uporabnika                                 |
| `deleteCommunityServer()`  | Odstrani registracijo strežnika                             |

---

## Sistem XP / ravni

**Datoteka:** `src/lib/gamification/xp.ts`

### Krivulja ravni

XP, potreben za dosego ravni `n`, sledi polinomski krivulji:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Raven | XP do naslednje ravni | Skupni XP | Naziv        |
| ----- | --------------------- | --------- | ------------ |
| 1     | 100                   | 100       | Začetnik     |
| 5     | 1,118                 | 2,415     | Začetnik     |
| 10    | 3,162                 | 10,523    | Raziskovalec |
| 25    | 12,500                | 86,024    | Raziskovalec |
| 50    | 35,355                | 345,529   | Strokovnjak  |
| 75    | 64,952                | 948,683   | Mojster      |
| 100   | 100,000               | 2,050,000 | Legenda      |

### Nazivi

| Razpon ravni | Naziv        |
| ------------ | ------------ |
| 1 – 9        | Začetnik     |
| 10 – 24      | Raziskovalec |
| 25 – 49      | Strokovnjak  |
| 50 – 74      | Mojster      |
| 75 – 100     | Legenda      |

### Nagrade XP

| Dejanje           | XP  | Opis                                                   |
| ----------------- | --- | ------------------------------------------------------ |
| `request`         | 1   | Za vsako zahtevo API, usmerjeno prek OmniRoute         |
| `provider_switch` | 5   | Preklop na drugega ponudnika                           |
| `model_switch`    | 3   | Preklop na drug model                                  |
| `combo_create`    | 10  | Ustvarjanje nove kombinacije                           |
| `combo_use`       | 2   | Uporaba kombinacije za zahtevo                         |
| `token_share`     | 1   | Za vsakih 1 000 žetonov, deljenih z drugim uporabnikom |
| `invite_redeem`   | 50  | Unovčenje kode povabila                                |
| `daily_login`     | 5   | Dnevna aktivna uporaba (enkrat na dan)                 |
| `streak_bonus`    | 2   | Za vsak zaporedni dan niza (pomnoženo z dolžino niza)  |
| `badge_unlock`    | 10  | Odklep značke                                          |

### Potek dodeljevanja

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. Poiščite `XP_REWARDS[action]`, da pridobite količino XP.
2. Posredujte skozi `checkRateLimit()` (zaščita pred goljufanjem: največ 1000 XP/min na ključ).
3. Odprite transakcijo:
   - Preberite trenutno vrstico `user_levels`.
   - Dodajte XP in znova izračunajte raven prek `levelFromXp(totalXp)`.
   - Če se je raven spremenila, nastavite `levelUp = true`.
   - Posodobite vrstico `user_levels`.
   - Vstavite zapis v `xp_audit_log`.
4. Vrnite rezultat. Klicatelj poskrbi za obvestila.

### Pomožna funkcija: `levelFromXp(totalXp)`

Iterira po ravneh 1..100 in sešteva `xp_for_level(n)`, dokler skupni XP
ne preseže `totalXp`. Vrne najvišjo raven, katere prag je dosežen.
Časovna zahtevnost je O(100) — sprejemljivo, saj je najvišja raven 100.

---

## Sistem značk

**Datoteka:** `src/lib/gamification/badges.ts`

### Kategorije

| Kategorija     | Opis                                | Primeri značk                                   |
| -------------- | ----------------------------------- | ----------------------------------------------- |
| `usage`        | Mejniki na podlagi obsega           | Prva zahteva, 1K zahtev, 100K                   |
| `sharing`      | Deljenje žetonov in priporočila     | Prva delitev, Radodaren (10 delitev)            |
| `contribution` | Sodelovanje v skupnosti             | Ustvarjalec kombinacij, Raziskovalec ponudnikov |
| `streak`       | Doslednost skozi čas                | Tedenski bojevnik, Mesečno predan               |
| `rare`         | Težko dosegljivi ali skriti dosežki | Zgodnji uporabnik, Prijavitelj napak            |

### Redkosti

| Redkost     | Barva  | Namig glede verjetnosti |
| ----------- | ------ | ----------------------- |
| `common`    | Siva   | Večina uporabnikov      |
| `uncommon`  | Zelena | Aktivni uporabniki      |
| `rare`      | Modra  | Predani uporabniki      |
| `legendary` | Zlata  | Najboljši 1 %           |

### Vrste meril

| Vrsta          | Polje        | Opis                                                          |
| -------------- | ------------ | ------------------------------------------------------------- |
| `action_count` | `count`      | Izvedite dejanje N-krat (npr. 1000 zahtev)                    |
| `streak`       | `days`       | Ohranite niz N zaporednih dni                                 |
| `unique_count` | `field`, `n` | Uporabite N edinstvenih vrednosti (npr. 10 različnih modelov) |
| `rank`         | `scope`, `n` | Dosezite uvrstitev N v obsegu lestvice                        |
| `first`        | —            | Bodite prvi, ki izvede dejanje                                |
| `hidden`       | (različno)   | Merila niso prikazana, dokler značka ni pridobljena           |

Definicije značk so shranjene v `badge_definitions` kot JSON `criteria`:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Potek vrednotenja

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # vse definicije
    → getUserBadges(apiKeyId)         # že pridobljene (preskoči)
    → za vsako še nepridobljeno značko:
       → matchesCriteria(badge, event, userState)
       → ob ujemanju: awardBadge(apiKeyId, badgeId)
         → vrni vsebino obvestila
```

Vrednotenje temelji na **dogodkih** — izvede se po vsakem igrifikacijskem dogodku, vendar
preveri samo značke, katerih `criteria.type` ustreza dejanju dogodka. Tako
vrednotenje ostane hitro (< 5ms za večino dogodkov).

### `matchesCriteria(badge, event, userState)`

| Vrsta merila   | Preverjanje                                               |
| -------------- | --------------------------------------------------------- |
| `action_count` | `getActionCount(apiKeyId, action) >= count`               |
| `streak`       | `getCurrentStreak(apiKeyId) >= days`                      |
| `unique_count` | `getUniqueCount(apiKeyId, field) >= n`                    |
| `rank`         | `getRank(apiKeyId, scope) <= n`                           |
| `first`        | Za to vrsto dejanja ni predhodnega vnosa v `xp_audit_log` |
| `hidden`       | Preverjanje prepusti ustreznemu podpreverjanju            |

### Vgrajene značke (20+)

<details>
<summary>Celoten seznam značk</summary>

| Značka                 | Kategorija | Redkost    | Merilo                            |
| ---------------------- | ---------- | ---------- | --------------------------------- |
| Prvi koraki            | uporaba    | običajna   | 1 zahteva                         |
| Začetno ogrevanje      | uporaba    | običajna   | 100 zahtev                        |
| Napredni uporabnik     | uporaba    | neobičajna | 1,000 zahtev                      |
| Centurion              | uporaba    | redka      | 10,000 zahtev                     |
| OmniPower              | uporaba    | legendarna | 100,000 zahtev                    |
| Menjalec ponudnikov    | prispevek  | običajna   | Uporabite 5 različnih ponudnikov  |
| Mojster ponudnikov     | prispevek  | neobičajna | Uporabite 20 različnih ponudnikov |
| Arhitekt kombinacij    | prispevek  | neobičajna | Ustvarite 5 kombinacij            |
| Velemojster kombinacij | prispevek  | redka      | Ustvarite 25 kombinacij           |
| Prva delitev           | deljenje   | običajna   | 1 prenos žetonov                  |
| Radodarnež             | deljenje   | neobičajna | 10 prenosov žetonov               |
| Filantrop              | deljenje   | redka      | Skupno prenesite 10,000 žetonov   |
| Priporočitelj          | deljenje   | običajna   | 1 uspešna napotitev               |
| Graditelj omrežja      | deljenje   | neobičajna | 10 uspešnih napotitev             |
| Tedenski bojevnik      | niz        | neobičajna | 7-dnevni niz                      |
| Mesečni privrženec     | niz        | redka      | 30-dnevni niz                     |
| Neustavljivi           | niz        | legendarna | 365-dnevni niz                    |
| Zgodnji uporabnik      | redka      | legendarna | Pridružite se v obdobju beta      |
| Pionir stiskanja       | redka      | neobičajna | Uporabite stiskanje 100-krat      |
| Zbiratelj veščin       | redka      | redka      | Uporabite 10 različnih veščin     |
| Raziskovalec modelov   | prispevek  | neobičajna | Uporabite 15 različnih modelov    |

</details>

---

## Sledilnik nizov

**Datoteka:** `src/lib/gamification/streaks.ts`

### Podatkovni model

Nizi so shranjeni v tabeli `key_value` (skupna pomožna tabela) pod imensko omejenimi ključi:

| Ključ                         | Vrednost                         | Opis                   |
| ----------------------------- | -------------------------------- | ---------------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Podatki aktivnega niza |

### Logika

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Preberite zapis niza iz `key_value`.
2. Razčlenite `{current}`, `{longest}`, `{lastDate}` (datumski niz ISO).
3. Če velja `lastDate === today` — brez spremembe (danes je že bilo upoštevano).
4. Če velja `lastDate === yesterday` — povečajte `current`; po potrebi posodobite `longest`.
5. Če velja `lastDate < yesterday` — ponastavite `current = 1` (niz je prekinjen).
6. Zapišite posodobljeni zapis.
7. Preverite mejnike: 7, 14, 30, 60, 90, 180 in 365 dni. Če je mejnik dosežen, nastavite
   `milestone = true` (klicatelj dodeli XP in preveri značke).

### Robni primeri

- **Časovni pas**: nizi uporabljajo datume UTC (`new Date().toISOString().slice(0, 10)`).
  To je namerno — en sam kanonični časovni pas preprečuje izkoriščanje sistema s
  preklapljanjem med časovnimi pasovi.
- **Novi uporabniki**: zapis niza ne obstaja; prva zahteva ga ustvari z vrednostmi
  `current=1, longest=1, lastDate=today`.
- **Več zahtev na dan**: niz poveča samo prva zahteva v dnevu UTC.

---

## Lestvica najboljših

**Datoteka:** `src/lib/gamification/leaderboard.ts`

### Obsegi

| Obseg           | Obdobje | Opis                                                                 |
| --------------- | ------- | -------------------------------------------------------------------- |
| `global`        | `all`   | Skupni XP vseh časov                                                 |
| `weekly`        | `week`  | XP, pridobljen v trenutnem tednu UTC (pon.–ned.)                     |
| `monthly`       | `month` | XP, pridobljen v trenutnem mesecu UTC                                |
| `tokens_shared` | `all`   | Skupno število žetonov, prenesenih drugim                            |
| `contributions` | `all`   | Ustvarjene kombinacije + uporabljeni ponudniki + uporabljene veščine |

### Izračun uvrstitve

Uvrstitve se **izračunajo ob branju** in niso shranjene. S tem se preprečijo zastareli podatki o uvrstitvah
in odpravi potreba po periodičnih opravilih za njihov ponovni izračun.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

Vzorec poizvedbe:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### Menjava obdobij

Tedenske in mesečne lestvice se menjavajo samodejno:

1. **Arhiviranje**: ob prehodu v novo obdobje kopirajte trenutne vnose v
   `leaderboard_archive` z oznako obdobja.
2. **Ponastavitev**: izbrišite vnose za poteklo obdobje.
3. **Sprožitev**: preverjanje se izvede ob vsakem klicu `updateLeaderboard()`; prva zahteva
   v novem obdobju sproži menjavo.

Tako se tedenske lestvice ponastavijo vsak ponedeljek ob 00:00 UTC, mesečne lestvice pa
prvega dne vsakega meseca.

### Posodobitve SSE v realnem času

**Končna točka:** `GET /api/gamification/stream`

```
Odjemalec → GET /api/gamification/stream
  → Vzpostavljena je povezava SSE
  → Strežnik takoj pošlje posnetek prvih 10 mest lestvice
  → Vsakih 5 sekund: pošlji posodobljenih prvih 10 mest, če so se spremenila
  → Vsakih 15 sekund: komentar za ohranjanje povezave (": heartbeat\n\n")
  → Odjemalec prekine povezavo → čiščenje (odstrani poslušalca)
```

Oblika dogodka:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

Upravljalnik SSE spremlja povezane odjemalce za vsak obseg in pošilja posodobitve samo,
ko so se podatki lestvice od zadnjega pošiljanja dejansko spremenili.

---

## Deljenje žetonov

**Datoteka:** `src/lib/gamification/sharing.ts`

### Dvostavno knjigovodstvo

Vsak prenos ustvari dve vrstici v `token_ledger`:

| Vrstica | `from_key_id` | `to_key_id` | `amount` |
| ------- | ------------- | ----------- | -------- |
| Breme   | pošiljatelj   | prejemnik   | +znesek  |
| Dobro   | prejemnik     | pošiljatelj | -znesek  |

Toda dogovor je naslednji:

| Vrstica    | `from_key_id` | `to_key_id` | `amount` | Pomen                 |
| ---------- | ------------- | ----------- | -------- | --------------------- |
| Pošiljanje | pošiljatelj   | prejemnik   | +znesek  | Odliv od pošiljatelja |
| Prejemanje | prejemnik     | pošiljatelj | +znesek  | Priliv k prejemniku   |

Stanje se izračuna tako:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Potek prenosa

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Preverjanje veljavnosti**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **Idempotentnost**: preveri, ali `idempotency_key` že obstaja v evidenci.
   Če obstaja, vrni predpomnjeni rezultat.
3. **Transakcija** (ena sama transakcija SQLite):
   a. Izračunaj stanje pošiljatelja.
   b. Če je `balance < amount`, prekini (nezadostna sredstva).
   c. Vstavi vrstico za pošiljanje (`from=sender,`.

### Omejevanje hitrosti

- Največ 10 prenosov na minuto na ključ API.
- Največ 10.000 žetonov na posamezen prenos.
- Največ 100.000 prenesenih žetonov na dan na ključ API.

---

## Žetoni za povabilo in unovčenje

**Datoteka:** `src/lib/gamification/invites.ts`

### Oblika kode

- **Koda**: 8-mestna alfanumerična koda (npr. `A3K9-X7M2`), berljiva za ljudi in
  prikazana uporabniku.
- **Žeton**: 32-bajtni naključni žeton, shranjen kot zgoščena vrednost SHA-256. Uporablja se za
  programsko unovčenje (npr. povezave URL).

### Shranjevanje

| Stolpec      | Vrednost                           |
| ------------ | ---------------------------------- |
| `code`       | `A3K9X7M2` (enolična, indeksirana) |
| `token_hash` | SHA-256(raw_token)                 |

Neobdelani žeton se uporabniku vrne natanko enkrat ob ustvarjanju. OmniRoute
ga nikoli več ne shrani ali prikaže — ohrani se samo zgoščena vrednost.

### Preprečevanje samonapotitev

Ko uporabnik unovči kodo, sistem preveri:

1. Koda pripada drugemu `api_key_id`.
2. Uporabnik, ki unovčuje kodo, pred tem ni unovčil nobene kode istega
   napotitelja (združevanje tabel `invite_tokens` in dnevnika unovčitev).

Če kateri koli pogoj ni izpolnjen, se unovčenje zavrne z jasnim sporočilom o napaki.

### Potek veljavnosti in omejitve

- Privzeta vrednost `max_uses`: 10 (nastavljivo ob ustvarjanju).
- Privzeta vrednost `expires_at`: 30 dni od ustvarjanja.
- Potekle ali izčrpane kode vrnejo HTTP 410 Gone.

---

## Federacija strežnikov skupnosti

**Datoteka:** `src/lib/gamification/servers.ts`

### Povezava

Strežnik skupnosti se registrira z žetonom za povabilo, ki ga izda oddaljeni strežnik. Lokalna instanca:

1. Prejme žeton za povabilo (npr. prilepljen v nadzorno ploščo).
2. Pokliče `POST /api/gamification/federation/leaderboard` na oddaljenem strežniku, da preveri veljavnost žetona in pridobi trenutno lestvico.
3. Shrani zapis strežnika z `status: connected`.

### Model sinhronizacije

Federacija uporablja **sinhronizacijo s prepisovanjem**, ne seštevalne sinhronizacije:

```
Lokalna instanca               Strežnik skupnosti
     │                              │
     ├── pošlji rezultat ─────────►│  POST /federation/score
     │   { api_key_id, score }      │  (strežnik preveri zgoščeno vrednost žetona)
     │                              │
     ├── pridobi lestvico ─────────►│  GET /federation/leaderboard
     │◄── prvih N vnosov ──────────┤  (prepiše lokalni predpomnilnik)
     │                              │
     └── preverjanje zdravja ──────►│  GET /federation/health
         (vsakih 60 s, časovna      │
          omejitev 5 s)             │
```

### Preverjanje pristnosti

Federacijske zahteve vključujejo:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

Oddaljeni strežnik izračuna zgoščeno vrednost žetona in poišče ujemajočo se vrstico v `community_servers`. S tem se prepreči prenos shranjene zgoščene vrednosti.

### Spremljanje zdravja

Vsak zapis strežnika spremlja:

| Polje       | Opis                                          |
| ----------- | --------------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable`        |
| `last_sync` | Časovni žig ISO zadnje uspešne sinhronizacije |
| `failures`  | Zaporedna neuspešna preverjanja zdravja       |

Po 5 zaporednih neuspehih se stanje spremeni v `unreachable`, sinhronizacija pa se začasno ustavi, dokler ročno preverjanje zdravja ne uspe.

---

## Preprečevanje goljufanja

**Datoteka:** `src/lib/gamification/antiCheat.ts`

### Izračun točk na strani strežnika

Vsi izračuni XP se izvajajo v `src/lib/gamification/xp.ts`. Odjemalci nikoli ne pošljejo rezultata — pošljejo dejanja, strežnik pa izračuna XP. V stolpec `leaderboard.score` lahko zapisuje samo strežniška koda.

### Omejevanje hitrosti

| Omejitev                  | Vrednost | Obseg        |
| ------------------------- | -------- | ------------ |
| Največ XP na minuto       | 1,000    | Na ključ API |
| Največ prenosov na minuto | 10       | Na ključ API |
| Največji znesek prenosa   | 10,000   | Na prenos    |
| Največ prenosov na dan    | 100,000  | Na ključ API |

Omejitve hitrosti uporabljajo drseče časovno okno v pomnilniku (enak vzorec kot `RateLimitManager` v `open-sse/services/`). Če se proces znova zažene, sistem uporabi števce, shranjene v SQLite.

### Zaznavanje anomalij z Z-vrednostjo

Sistem za vsak ključ API vzdržuje drseče 7-dnevno okno XP, pridobljenih na uro. Ob vsaki dodelitvi XP:

1. Izračuna uporabnikovo trenutno urno stopnjo pridobivanja XP.
2. Izračuna povprečje populacije in standardni odklon.
3. Izračuna `z = (user_rate - mean) / stddev`.
4. Če je `z > 3.0` (3 standardni odkloni), dogodek označi kot anomalijo.

Anomalije se zabeležijo v `xp_audit_log` z `action = 'anomaly_detected'` in prikažejo na skrbniški nadzorni plošči.

### Revizijska sled

Vsaka dodelitev XP, prenos, pridobitev značke in zaznava anomalije se zabeleži v `xp_audit_log` z naslednjimi podatki:

| Polje        | Opis                                               |
| ------------ | -------------------------------------------------- |
| `api_key_id` | Kdo                                                |
| `action`     | Kaj se je zgodilo (xp_award, transfer, anomaly, …) |
| `xp_awarded` | Količina (0 za dogodke, ki niso povezani z XP)     |
| `metadata`   | JSON s kontekstom (vrsta dejanja, cilj, …)         |
| `created_at` | Kdaj (ISO 8601)                                    |

Skrbniki lahko poizvedujejo po celotni revizijski sledi prek `GET /api/gamification/anomalies`.

---

## Poti API-ja

Vse poti sledijo standardnemu vzorcu OmniRoute:

```
Pot → Predhodna zahteva CORS → Preverjanje telesa (Zod) → Avtentikacija (extractApiKey)
  → Obdelovalnik
```

### Končne točke

| Metoda | Pot                                        | Opis                                          | Avtentikacija |
| ------ | ------------------------------------------ | --------------------------------------------- | ------------- |
| GET    | `/api/gamification/leaderboard`            | Pridobi lestvico (obseg, obdobje, paginacija) | Izbirna       |
| POST   | `/api/gamification/leaderboard`            | Vsili osvežitev predpomnilnika lestvice       | Obvezna       |
| GET    | `/api/gamification/stream`                 | Posodobitve lestvice v realnem času prek SSE  | Izbirna       |
| GET    | `/api/gamification/transfer`               | Pridobi zgodovino prenosov (paginacija)       | Obvezna       |
| POST   | `/api/gamification/transfer`               | Pošlji žetone drugemu uporabniku              | Obvezna       |
| GET    | `/api/gamification/invite`                 | Prikaži moje kode povabil                     | Obvezna       |
| POST   | `/api/gamification/invite`                 | Ustvari novo kodo povabila                    | Obvezna       |
| DELETE | `/api/gamification/invite`                 | Prekliči kodo povabila                        | Obvezna       |
| POST   | `/api/gamification/invite/redeem`          | Unovči kodo povabila                          | Obvezna       |
| GET    | `/api/gamification/servers`                | Prikaži strežnike skupnosti                   | Obvezna       |
| POST   | `/api/gamification/servers`                | Poveži se s strežnikom skupnosti              | Obvezna       |
| DELETE | `/api/gamification/servers`                | Prekini povezavo s strežnikom skupnosti       | Obvezna       |
| POST   | `/api/gamification/federation/score`       | Pošlji rezultat oddaljenemu strežniku         | Federacija    |
| GET    | `/api/gamification/federation/leaderboard` | Pridobi lestvico z oddaljenega strežnika      | Federacija    |
| GET    | `/api/gamification/notifications`          | Obvestila SSE o značkah/napredovanju ravni    | Obvezna       |
| GET    | `/api/gamification/anomalies`              | Prikaži poročila o nepravilnostih (skrbnik)   | Skrbnik       |
| POST   | `/api/gamification/rotate`                 | Zamenjaj skrivnosti žetonov povabil           | Obvezna       |

### Primeri zahtev/odgovorov

**POST /api/gamification/transfer**

```json
// Zahteva
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

// Odgovor 400 (nezadostna sredstva)
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

## Orodja MCP (8)

Registrirana v `open-sse/mcp-server/` poleg obstoječih orodij. Omejena na
obseg dovoljenj `gamification`.

| Orodje                     | Opis                                             | Vhodna shema                 |           |
| -------------------------- | ------------------------------------------------ | ---------------------------- | --------- |
| `gamification_leaderboard` | Pridobi lestvico za obseg/obdobje                | `{ scope, period?, limit? }` |
| `gamification_rank`        | Pridobi uvrstitev klicatelja in njegove sosede   | `{ scope }`                  |
| `gamification_profile`     | Pridobi povzetek XP, ravni, naziva in niza       | `{}`                         |
| `gamification_badges`      | Navedi pridobljene značke ali vse definicije     | `{ earned?: boolean }`       |
| `gamification_transfer`    | Pošlji žetone drugemu uporabniku                 | `{ to, amount }`             |
| `gamification_invite`      | Ustvari ali navedi kode povabil                  | `{ action: "create"          | "list" }` |
| `gamification_servers`     | Navedi strežnike skupnosti ali se poveži z njimi | `{ action, token? }`         |
| `gamification_anomalies`   | Prikaži poročila o anomalijah (skrbniški obseg)  | `{ limit?, since? }`         |

---

## Strani nadzorne plošče

### `/dashboard/leaderboard`

- Prikaz zmagovalnega odra (prvi 3 z avatarji in XP).
- Izbirnik obsega: globalno / tedensko / mesečno / deljeni žetoni / prispevki.
- Oštevilčena tabela (25 na stran) z uvrstitvijo, imenom, rezultatom, ravnjo in nazivom.
- Posodobitve v realnem času prek SSE — spremembe uvrstitev so animirane.
- Trenutni uporabnik je označen v tabeli s pripeto vrstico »Vaša uvrstitev«.

### `/dashboard/profile`

- Vrstica napredka XP s trenutno ravnjo in pragom naslednje ravni.
- Značka naziva je vidno izpostavljena.
- Galerija značk — pridobljene značke z datumom pridobitve, nepridobljene značke so zatemnjene
  (skrite značke prikazujejo »???«, dokler niso pridobljene).
- Števec niza z ikono plamena; koledar niza (zadnjih 30 dni).
- Graf zgodovine XP (dnevni XP v zadnjih 30 dneh).

### `/dashboard/tokens`

- Stanje žetonov (izpostavljeno na vrhu strani).
- Obrazec za prenos: prejemnik, količina, potrditveno pogovorno okno.
- Tabela zgodovine prenosov s filtri (poslano/prejeto/vse).
- Razdelek s povabili: aktivne kode, ustvarjanje novih, povezava za deljenje.
- Strežniki skupnosti: seznam s stanjem delovanja, povezava/prekinitev povezave.

### `/dashboard/gamification/admin`

- Seznam anomalij z resnostjo, uporabnikom, časovnim žigom in z-vrednostjo.
- Pregledovalnik dnevnika revizij s filtri (vrsta dejanja, uporabnik, časovno obdobje).
- Sistemska statistika: skupno število dodeljenih XP, aktivni uporabniki, stopnje pridobivanja značk.
- Pregled stanja strežnikov federacije.

---

## Integracija v cevovod

### Točka integracije

Igrifikacija se vključi v cevovod zahtev na eni sami točki v
`open-sse/handlers/chatCore.ts`:

```typescript
// Ko je odgovor poslan odjemalcu:
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
    // Sproži in pozabi: zabeleži, vendar nikoli ne posreduj odjemalcu
  });
});
```

### Vrste dogodkov

| Vrsta dogodka       | Kdaj se sproži                                              |
| ------------------- | ----------------------------------------------------------- |
| `request.completed` | Uspešen odgovor LLM je poslan                               |
| `provider.switch`   | Ponudnik je zamenjan (upoštevajo se nadomestne kombinacije) |
| `combo.created`     | Nova konfiguracija kombinacije je shranjena                 |
| `combo.used`        | Cilj kombinacije je uspešno dosežen                         |
| `badge.earned`      | Ocenjevanje značk je našlo ujemanje                         |
| `streak.milestone`  | Prag niza je presežen                                       |
| `transfer.sent`     | Prenos žetonov je zaključen                                 |
| `referral.redeemed` | Koda povabila je uspešno unovčena                           |
| `compression.used`  | Uporabljeno je stiskanje poziva                             |
| `skill.executed`    | Izvajanje veščine je zaključeno                             |
| `model.first_use`   | Model v zadnjih 7 dneh ni bil uporabljen                    |

### Zagotovilo neblokirnega izvajanja

Vzorec `setImmediate` + `.catch(() => {})` zagotavlja:

1. Odgovor je v celoti poslan, preden se izvede igrifikacija.
2. Napake igrifikacije se nikoli ne prikažejo odjemalcu.
3. Obdelava dogodka se izvede v naslednjem mikroopravilu, ne neposredno.

---

## Varnost

### Model groženj

| Grožnja                              | Blažitev                                                                          |
| ------------------------------------ | --------------------------------------------------------------------------------- |
| Umetno zviševanje točk               | Izračun XP samo na strani strežnika; odjemalci pošiljajo dejanja, ne točk         |
| Napadi s ponovitvijo                 | Idempotentnostni ključi pri prenosih; odstranjevanje dvojnikov v dnevniku revizij |
| Goljufije pri prenosih               | Dvostavno knjigovodstvo; atomske transakcije; omejitve hitrosti                   |
| Samonapotitev                        | Navzkrižno preverjanje `api_key_id` ob unovčenju                                  |
| Manipulacija lestvice                | Odkrivanje anomalij z Z-vrednostjo; skrbniška nadzorna plošča anomalij            |
| Kraja federacijskega žetona          | Shranjevanje zgoščene vrednosti SHA-256; neobdelani žeton se prikaže samo enkrat  |
| Groba sila nad kodami povabil        | Omejevanje hitrosti na končni točki za unovčenje; 8-znakovna entropija            |
| XSS v prikaznih imenih               | Prikazna imena so prečiščena; vnosi na lestvici so ubežani                        |
| Časovni napadi na zgoščene vrednosti | `crypto.timingSafeEqual` za primerjavo zgoščenih vrednosti žetonov                |

### Zahteve za avtentikacijo

- **Javno** (brez avtentikacije): `GET /leaderboard`, `GET /stream` (lestvice
  samo za branje).
- **Zahtevan ključ API**: vse operacije pisanja, profil, prenosi, povabila.
- **Samo skrbnik**: nadzorna plošča anomalij, pregledovalnik dnevnika revizij.
- **Federacija**: ločena pot avtentikacije z uporabo neobdelanega žetona v glavi
  `Authorization`, preverjenega glede na shranjeno zgoščeno vrednost SHA-256.

---

## Testiranje

### Testne datoteke

Vsi testi uporabljajo izvorni izvajalnik testov Node.js (`node --import tsx/esm --test`).

| Testna datoteka                               | Pokriva                                          | Testi |
| --------------------------------------------- | ------------------------------------------------ | ----- |
| `tests/unit/gamification/xp.test.ts`          | Izračun XP, krivuljo ravni, nazive               | 8     |
| `tests/unit/gamification/badges.test.ts`      | Ujemanje meril značk, podeljevanje               | 10    |
| `tests/unit/gamification/streaks.test.ts`     | Logiko nizov, mejnike, robne primere             | 7     |
| `tests/unit/gamification/leaderboard.test.ts` | Izračun uvrstitve, ostranjevanje, rotacijo       | 8     |
| `tests/unit/gamification/sharing.test.ts`     | Prenose, stanje, idempotentnost                  | 9     |
| `tests/unit/gamification/invites.test.ts`     | Ustvarjanje, unovčenje, potek, samonapotitev     | 7     |
| `tests/unit/gamification/antiCheat.test.ts`   | Omejitve hitrosti, Z-vrednost, beleženje revizij | 6     |
| `tests/unit/gamification/events.test.ts`      | Oddajanje dogodkov, razpršitev, obravnavo napak  | 5     |

### Izvajanje testov

```bash
# Vsi testi igrifikacije
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# Posamezna testna datoteka
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Zahteve glede pokritosti

V skladu z `CONTRIBUTING.md` morajo vsi novi moduli imeti:

- Pokritost vej >= 80 %.
- Vsaka javna funkcija mora biti preizkušena vsaj enkrat.
- Poti napak morajo biti preizkušene (nezadostno stanje, potekle kode, omejitve hitrosti).

---

## Struktura datotek

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # Vseh 8 tabel + indeksi
      gamification.ts                  # Domenski modul CRUD
    gamification/
      xp.ts                           # Izračun XP, krivulja ravni, nazivi
      badges.ts                       # Definicije značk, merila, vrednotenje
      streaks.ts                      # Spremljanje dnevnih nizov
      leaderboard.ts                  # Izračun uvrstitev, SSE, rotacija
      antiCheat.ts                    # Omejevanje pogostosti, z-vrednost, revizija
      sharing.ts                      # Evidenca prenosov žetonov
      invites.ts                      # Kode za povabila/unovčenje
      servers.ts                      # Federacija strežnikov skupnosti
      events.ts                       # Oddajnik dogodkov (integracijska točka)
      notifications.ts                # Tok obvestil SSE
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST lestvice
        leaderboard/stream/route.ts   # Posodobitve v realnem času prek SSE
        transfer/route.ts             # GET/POST prenosov
        invite/route.ts               # GET/POST/DELETE kod za povabila
        invite/redeem/route.ts        # POST unovčenja kode
        servers/route.ts              # GET/POST/DELETE strežnikov
        federation/score/route.ts     # POST pošiljanja rezultata
        federation/leaderboard/route.ts # GET pridobivanja lestvice
        notifications/route.ts        # Obvestila SSE
        anomalies/route.ts            # GET poročil o anomalijah
        rotate/route.ts               # POST rotacije skrivnosti
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Stran z uvrstitvami
        profile/page.tsx               # Stran z XP/značkami/nizi
        tokens/page.tsx                # Stran s stanjem/prenosi/povabili
        gamification/admin/page.tsx    # Skrbniško spremljanje anomalij
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
    GAMIFICATION.md                    # Ta dokument
```

---

## Strategija migracije

### 1. faza: Jedro zalednega sistema (PR 1)

- Migracija `060_create_gamification.sql` (8 tabel).
- `src/lib/db/gamification.ts` (domenski modul).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- Integracijska točka v `chatCore.ts`.
- Testi enot za XP, nize in dogodke.

### 2. faza: Značke in lestvica (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Definicije značk v konstantah.
- Poti API za lestvico + tok SSE.
- Testi enot za značke in lestvico.

### 3. faza: Deljenje in povabila (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- Poti API za prenose in povabila.
- Testi enot za deljenje, povabila in preprečevanje goljufanja.

### 4. faza: Federacija in nadzorna plošča (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- Poti API za federacijo.
- Strani nadzorne plošče (lestvica, profil, žetoni, skrbništvo).
- Registracija orodij MCP.

---

## Prihodnji vidiki

- **Sezonski dogodki**: časovno omejeni nabori značk in sezone lestvic.
- **Ekipne lestvice**: združevanje uporabnikov glede na organizacijo ali combo.
- **Množitelji XP**: povečanje XP v promocijskih obdobjih.
- **Deljenje dosežkov**: ustvarjanje kartic značk za deljenje (slike OpenGraph).
- **Mobilna potisna obvestila**: obvestila prek webhookov za dogodke značk/ravni.
- **API lestvice**: javni API za integracije tretjih ponudnikov.
