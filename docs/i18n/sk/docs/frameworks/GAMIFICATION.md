# Gamification & Leaderboard System (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **Zdroj pravdy:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Posledná aktualizácia:** 2026-06-28 — v3.8.40

OmniRoute obsahuje gamifikačnú vrstvu s lokálnym prístupom, ktorá odmeňuje používateľov za
interakciu s platformou — vytváranie požiadaviek, prepínanie poskytovateľov, vytváranie
kombinácií, zdieľanie tokenov a prispievanie do komunity. Všetky údaje sa uchovávajú v
SQLite; federácia s komunitnými servermi je voliteľná a založená na odosielaní údajov.

Systém je navrhnutý tak, aby mal **nulovú latenciu na kritickej ceste** — gamifikačné
udalosti sa z pipeline požiadaviek odosielajú bez čakania na výsledok a nikdy neblokujú
odpoveď LLM.

---

## Prehľad

### Účel

Zvýšiť zapojenie a udržanie používateľov poskytovaním viditeľného pokroku (XP,
úrovne, odznaky), sociálneho dôkazu (rebríčky) a ekonomických stimulov (zdieľanie
tokenov, odmeny za pozvania).

### Rozsah

| Funkcia                   | Popis                                                                                    |
| ------------------------- | ---------------------------------------------------------------------------------------- |
| XP a úrovne               | Získavanie XP za každú akciu; postup po polynomiálnej krivke                             |
| Odznaky                   | Viac než 20 úspechov v 5 kategóriách so 4 úrovňami vzácnosti                             |
| Série                     | Sledovanie dennej aktivity s aktuálnou a najdlhšou sériou                                |
| Rebríčky                  | Globálny, týždenný, mesačný, podľa zdieľania tokenov a príspevkov                        |
| Zdieľanie tokenov         | Prevod kreditov medzi používateľmi cez podvojné účtovníctvo                              |
| Pozvanie a uplatnenie     | Referenčné kódy ukladané ako hashe SHA-256                                               |
| Komunitné servery         | Federácia s externými inštanciami OmniRoute                                              |
| Ochrana proti podvádzaniu | Bodovanie na strane servera, obmedzovanie frekvencie a detekcia anomálií pomocou z-skóre |

### Princípy návrhu

1. **Lokálny prístup** — všetky údaje sú v SQLite, nie sú potrebné žiadne externé služby.
2. **Neblokujúce spracovanie** — udalosti sa odosielajú bez čakania na výsledok; cesta odpovede LLM
   nie je gamifikačnou logikou nikdy oneskorená.
3. **Server ako autorita** — XP sa počíta výhradne na strane servera; klienti nemôžu
   umelo navyšovať skóre.
4. **Rešpektovanie súkromia** — účasť v rebríčku je voliteľná; používatelia môžu
   skryť svoj profil.
5. **Pripravenosť na federáciu** — komunitné servery môžu odosielať skóre prostredníctvom podpísaného API;
   synchronizácia údaje prepisuje, nesčítava ich.

---

## Architektúra

### Tok na vysokej úrovni

```
Požiadavka klienta
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (existujúca pipeline) ...
      → upstream odpoveď odoslaná klientovi
      → setImmediate (bez čakania na výsledok):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

Emitor udalostí je jediným integračným bodom. `chatCore.ts` volá
`emitGamificationEvent()` po odoslaní odpovede; modul udalostí distribuuje
spracovanie do podsystémov XP, sérií, odznakov, rebríčkov a ochrany proti podvádzaniu.

### Graf závislostí modulov

```
src/lib/gamification/
  events.ts          ← vstupný bod (volaný z chatCore.ts)
    ├── xp.ts        ← výpočet XP a určenie úrovne
    ├── streaks.ts   ← sledovanie série denných aktivít
    ├── badges.ts    ← vyhodnocovanie kritérií odznakov
    ├── leaderboard.ts ← výpočet poradia a vysielanie cez SSE
    ├── antiCheat.ts ← obmedzovanie frekvencie a detekcia anomálií
    ├── sharing.ts   ← účtovná kniha prevodov tokenov
    ├── invites.ts   ← správa pozývacích a uplatniteľných kódov
    ├── servers.ts   ← federácia komunitných serverov
    └── notifications.ts ← stream oznámení SSE

src/lib/db/
  gamification.ts    ← všetky operácie CRUD (8 tabuliek)

src/app/api/gamification/
  leaderboard/       ← GET poradia, POST manuálne obnovenie
  leaderboard/stream ← aktualizácie v reálnom čase cez SSE
  transfer/          ← GET história, POST odoslanie tokenov
  invite/            ← GET/POST kódy, DELETE zrušenie platnosti
  invite/redeem/     ← POST uplatnenie kódu
  servers/           ← GET/POST/DELETE komunitné servery
  federation/score/  ← POST odoslanie skóre na server
  federation/leaderboard/ ← GET načítanie rebríčka zo servera
  notifications/     ← oznámenia SSE o odznakoch/postupe na vyššiu úroveň
  anomalies/         ← GET hlásenia anomálií (správca)
  rotate/            ← POST rotácia tajných kľúčov pozývacích tokenov
```

---

## Dátová vrstva

### Databázové tabuľky

Všetky tabuľky sa nachádzajú v hlavnej databáze SQLite systému OmniRoute, ktorú vytvára migrácia
`060_create_gamification.sql`. Režim žurnálu WAL sa dedí zo singletonu
`getDbInstance()` v súbore `src/lib/db/core.ts`.

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

### Doménový modul: `src/lib/db/gamification.ts`

Dodržiava štandardný vzor OmniRoute — importuje `getDbInstance()` z
`core.ts` a exportuje typované funkcie CRUD. V obslužných rutinách trás sa nenachádza žiadny priamy SQL kód.

Kľúčové funkcie:

| Funkcia                    | Popis                                                         |
| -------------------------- | ------------------------------------------------------------- |
| `upsertLeaderboardEntry()` | Vloží alebo aktualizuje skóre pre (api_key_id, scope, period) |
| `getLeaderboard()`         | Stránkované poradie pre daný rozsah/obdobie                   |
| `getUserLevel()`           | Získa alebo vytvorí záznam úrovne používateľa                 |
| `updateUserLevel()`        | Atómovo nastaví XP, úroveň a titul                            |
| `getBadgeDefinitions()`    | Všetky definície odznakov (voliteľne filtrované)              |
| `getUserBadges()`          | Odznaky získané používateľom                                  |
| `awardBadge()`             | Vloží získanie odznaku (idempotentné podľa badge_id)          |
| `logXpAction()`            | Pridá záznam do xp_audit_log                                  |
| `getXpAuditLog()`          | Stránkovaná história auditu používateľa                       |
| `insertLedgerEntry()`      | Podvojný prevod (v rámci transakcie)                          |
| `getBalance()`             | Súčet prijatých prostriedkov mínus súčet odoslaných           |
| `getTransferHistory()`     | Stránkovaný denník prevodov                                   |
| `createInviteToken()`      | Vloží pozývací kód a hašovaný token                           |
| `redeemInviteToken()`      | Vyhľadá podľa kódu, overí platnosť a zvýši počet použití      |
| `upsertCommunityServer()`  | Zaregistruje alebo aktualizuje federačný server               |
| `getCommunityServers()`    | Vypíše servery používateľa                                    |
| `deleteCommunityServer()`  | Odstráni registráciu servera                                  |

---

## Systém XP / úrovní

**Súbor:** `src/lib/gamification/xp.ts`

### Krivka úrovní

Počet XP potrebných na dosiahnutie úrovne `n` sa riadi polynomiálnou krivkou:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Úroveň | XP do ďalšej úrovne | Kumulatívne XP | Titul       |
| ------ | ------------------- | -------------- | ----------- |
| 1      | 100                 | 100            | Začiatočník |
| 5      | 1,118               | 2,415          | Začiatočník |
| 10     | 3,162               | 10,523         | Prieskumník |
| 25     | 12,500              | 86,024         | Prieskumník |
| 50     | 35,355              | 345,529        | Expert      |
| 75     | 64,952              | 948,683        | Majster     |
| 100    | 100,000             | 2,050,000      | Legenda     |

### Tituly

| Rozsah úrovní | Titul       |
| ------------- | ----------- |
| 1 – 9         | Začiatočník |
| 10 – 24       | Prieskumník |
| 25 – 49       | Expert      |
| 50 – 74       | Majster     |
| 75 – 100      | Legenda     |

### Odmeny XP

| Akcia             | XP  | Popis                                                      |
| ----------------- | --- | ---------------------------------------------------------- |
| `request`         | 1   | Za každú požiadavku API smerovanú cez OmniRoute            |
| `provider_switch` | 5   | Prepnutie na iného poskytovateľa                           |
| `model_switch`    | 3   | Prepnutie na iný model                                     |
| `combo_create`    | 10  | Vytvorenie nového komba                                    |
| `combo_use`       | 2   | Použitie komba pre požiadavku                              |
| `token_share`     | 1   | Za každých 1 000 tokenov zdieľaných s iným používateľom    |
| `invite_redeem`   | 50  | Uplatnenie pozývacieho kódu                                |
| `daily_login`     | 5   | Denné aktívne používanie (raz denne)                       |
| `streak_bonus`    | 2   | Za každý po sebe idúci deň série (vynásobené dĺžkou série) |
| `badge_unlock`    | 10  | Odomknutie odznaku                                         |

### Priebeh udeľovania

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. Vyhľadajte `XP_REWARDS[action]`, aby ste získali počet XP.
2. Spracujte ho prostredníctvom `checkRateLimit()` (ochrana proti podvádzaniu: max. 1000 XP/min na kľúč).
3. Otvorte transakciu:
   - Načítajte aktuálny riadok `user_levels`.
   - Pridajte XP; prepočítajte úroveň prostredníctvom `levelFromXp(totalXp)`.
   - Ak sa úroveň zmenila, nastavte `levelUp = true`.
   - Aktualizujte riadok `user_levels`.
   - Vložte záznam do `xp_audit_log`.
4. Vráťte výsledok. Volajúci spracuje oznámenia.

### Pomocná funkcia: `levelFromXp(totalXp)`

Prechádza úrovne 1..100 a sčítava `xp_for_level(n)`, kým kumulatívne XP
neprekročia `totalXp`. Vráti najvyššiu úroveň, ktorej prah bol dosiahnutý.
Má zložitosť O(100) — čo je prijateľné, keďže maximálna úroveň je 100.

---

## Systém odznakov

**Súbor:** `src/lib/gamification/badges.ts`

### Kategórie

| Kategória      | Popis                                 | Príklady odznakov                             |
| -------------- | ------------------------------------- | --------------------------------------------- |
| `usage`        | Míľniky založené na objeme            | Prvá požiadavka, 1 tis. požiadaviek, 100 tis. |
| `sharing`      | Zdieľanie tokenov a odporúčania       | Prvé zdieľanie, Štedrý (10 zdieľaní)          |
| `contribution` | Zapojenie do komunity                 | Tvorca komb, Prieskumník poskytovateľov       |
| `streak`       | Pravidelnosť v priebehu času          | Týždenný bojovník, Mesačne oddaný             |
| `rare`         | Ťažko získateľné alebo skryté úspechy | Prvý používateľ, Nahlasovateľ chýb            |

### Vzácnosti

| Vzácnosť    | Farba  | Orientačná pravdepodobnosť |
| ----------- | ------ | -------------------------- |
| `common`    | Sivá   | Väčšina používateľov       |
| `uncommon`  | Zelená | Aktívni používatelia       |
| `rare`      | Modrá  | Oddaní používatelia        |
| `legendary` | Zlatá  | Najlepšie 1 %              |

### Typy kritérií

| Typ            | Pole         | Popis                                                  |
| -------------- | ------------ | ------------------------------------------------------ |
| `action_count` | `count`      | Vykonať akciu N-krát (napr. 1000 požiadaviek)          |
| `streak`       | `days`       | Udržať sériu N po sebe idúcich dní                     |
| `unique_count` | `field`, `n` | Použiť N jedinečných hodnôt (napr. 10 rôznych modelov) |
| `rank`         | `scope`, `n` | Dosiahnuť poradie N v rámci rebríčka                   |
| `first`        | —            | Vykonať akciu ako prvý                                 |
| `hidden`       | (rôzne)      | Kritériá sa nezobrazia, kým nie sú splnené             |

Definície odznakov sú uložené v `badge_definitions` ako JSON `criteria`:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Priebeh vyhodnocovania

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # všetky definície
    → getUserBadges(apiKeyId)         # už získané (preskočiť)
    → pre každý nezískaný odznak:
       → matchesCriteria(badge, event, userState)
       → ak sa zhoduje: awardBadge(apiKeyId, badgeId)
         → vrátiť údaje oznámenia
```

Vyhodnocovanie je **riadené udalosťami** — spúšťa sa po každej gamifikačnej udalosti, ale
kontroluje iba odznaky, ktorých `criteria.type` zodpovedá akcii udalosti. Vďaka tomu
zostáva vyhodnocovanie rýchle (< 5 ms pre väčšinu udalostí).

### `matchesCriteria(badge, event, userState)`

| Typ kritéria   | Kontrola                                                          |
| -------------- | ----------------------------------------------------------------- |
| `action_count` | `getActionCount(apiKeyId, action) >= count`                       |
| `streak`       | `getCurrentStreak(apiKeyId) >= days`                              |
| `unique_count` | `getUniqueCount(apiKeyId, field) >= n`                            |
| `rank`         | `getRank(apiKeyId, scope) <= n`                                   |
| `first`        | Žiadny predchádzajúci záznam v `xp_audit_log` pre tento typ akcie |
| `hidden`       | Deleguje na príslušnú čiastkovú kontrolu                          |

### Vstavané odznaky (20+)

<details>
<summary>Úplný zoznam odznakov</summary>

| Odznak                  | Kategória    | Vzácnosť   | Kritériá                              |
| ----------------------- | ------------ | ---------- | ------------------------------------- |
| Prvé kroky              | používanie   | bežný      | 1 požiadavka                          |
| Zahrievanie             | používanie   | bežný      | 100 požiadaviek                       |
| Pokročilý používateľ    | používanie   | neobvyklý  | 1 000 požiadaviek                     |
| Stotník                 | používanie   | vzácny     | 10 000 požiadaviek                    |
| OmniPower               | používanie   | legendárny | 100 000 požiadaviek                   |
| Striedač poskytovateľov | prispievanie | bežný      | Použiť 5 rôznych poskytovateľov       |
| Majster poskytovateľov  | prispievanie | neobvyklý  | Použiť 20 rôznych poskytovateľov      |
| Architekt kombinácií    | prispievanie | neobvyklý  | Vytvoriť 5 kombinácií                 |
| Veľmajster kombinácií   | prispievanie | vzácny     | Vytvoriť 25 kombinácií                |
| Prvé zdieľanie          | zdieľanie    | bežný      | 1 prevod tokenov                      |
| Štedrý                  | zdieľanie    | neobvyklý  | 10 prevodov tokenov                   |
| Filantrop               | zdieľanie    | vzácny     | Previesť celkovo 10 000 tokenov       |
| Odporúčateľ             | zdieľanie    | bežný      | 1 úspešné odporúčanie                 |
| Budovateľ siete         | zdieľanie    | neobvyklý  | 10 úspešných odporúčaní               |
| Týždenný bojovník       | séria        | neobvyklý  | 7-dňová séria                         |
| Mesačne oddaný          | séria        | vzácny     | 30-dňová séria                        |
| Nezastaviteľný          | séria        | legendárny | 365-dňová séria                       |
| Skorý používateľ        | vzácne       | legendárny | Pripojiť sa počas obdobia beta verzie |
| Priekopník kompresie    | vzácne       | neobvyklý  | Použiť kompresiu 100-krát             |
| Zberateľ zručností      | vzácne       | vzácny     | Použiť 10 rôznych zručností           |
| Prieskumník modelov     | prispievanie | neobvyklý  | Použiť 15 rôznych modelov             |

</details>

---

## Sledovanie série

**Súbor:** `src/lib/gamification/streaks.ts`

### Dátový model

Série sa ukladajú v tabuľke `key_value` (zdieľaná pomocná tabuľka) pod kľúčmi s mennými priestormi:

| Kľúč                          | Hodnota                          | Popis                |
| ----------------------------- | -------------------------------- | -------------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Údaje aktívnej série |

### Logika

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Načítať záznam série z tabuľky `key_value`.
2. Analyzovať `{current}`, `{longest}`, `{lastDate}` (reťazec dátumu vo formáte ISO).
3. Ak `lastDate === today` — bez zmeny (dnešok už bol započítaný).
4. Ak `lastDate === yesterday` — zvýšiť `current`; v prípade potreby aktualizovať `longest`.
5. Ak `lastDate < yesterday` — nastaviť `current = 1` (séria bola prerušená).
6. Zapísať aktualizovaný záznam.
7. Skontrolovať míľniky: 7, 14, 30, 60, 90, 180, 365 dní. Ak bol niektorý dosiahnutý, nastaviť
   `milestone = true` (volajúci pridelí XP a skontroluje odznaky).

### Hraničné prípady

- **Časové pásmo**: série používajú dátumy UTC (`new Date().toISOString().slice(0, 10)`).
  Je to zámerné — jedno kanonické časové pásmo zabraňuje manipulácii prostredníctvom
  prepínania časových pásiem.
- **Noví používatelia**: záznam série neexistuje; prvá požiadavka ho vytvorí s hodnotami
  `current=1, longest=1, lastDate=today`.
- **Viaceré požiadavky za deň**: sériu zvýši iba prvá požiadavka daného dňa UTC.

---

## Rebríček

**Súbor:** `src/lib/gamification/leaderboard.ts`

### Rozsahy

| Rozsah          | Obdobie | Popis                                                             |
| --------------- | ------- | ----------------------------------------------------------------- |
| `global`        | `all`   | Kumulatívne XP za celé obdobie                                    |
| `weekly`        | `week`  | XP získané v aktuálnom týždni UTC (Po–Ne)                         |
| `monthly`       | `month` | XP získané v aktuálnom mesiaci UTC                                |
| `tokens_shared` | `all`   | Celkový počet tokenov prevedených iným                            |
| `contributions` | `all`   | Vytvorené kombinácie + použití poskytovatelia + použité zručnosti |

### Výpočet poradia

Poradie sa **počíta v čase čítania**, neukladá sa. Tým sa predchádza neaktuálnym údajom o poradí
a odstraňuje sa potreba pravidelných úloh na prepočítavanie poradia.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

Vzor dotazu:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### Rotácia období

Týždenné a mesačné rebríčky sa automaticky rotujú:

1. **Archivácia**: na hranici obdobia skopírovať aktuálne záznamy do
   `leaderboard_archive` s označením obdobia.
2. **Resetovanie**: odstrániť záznamy pre skončené obdobie.
3. **Spúšťač**: kontroluje sa pri každom volaní `updateLeaderboard()`; rotáciu
   spustí prvá požiadavka nového obdobia.

Tým sa zabezpečí, že sa týždenné rebríčky resetujú každý pondelok o 00:00 UTC a mesačné rebríčky
sa resetujú v prvý deň každého mesiaca.

### Aktualizácie SSE v reálnom čase

**Koncový bod:** `GET /api/gamification/stream`

```
Klient → GET /api/gamification/stream
  → Vytvorí sa pripojenie SSE
  → Server okamžite odošle snímku 10 najlepších položiek rebríčka
  → Každých 5 sekúnd: odoslať aktualizovaných 10 najlepších položiek, ak sa zmenili
  → Každých 15 sekúnd: komentár heartbeat (": heartbeat\n\n")
  → Klient sa odpojí → vyčistenie (odstránenie listenera)
```

Formát udalosti:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

Správca SSE sleduje pripojených klientov podľa rozsahu a aktualizácie odosiela
iba vtedy, keď sa údaje rebríčka od posledného odoslania skutočne zmenili.

---

## Zdieľanie tokenov

**Súbor:** `src/lib/gamification/sharing.ts`

### Podvojné účtovníctvo

Každý prevod vytvorí dva riadky v tabuľke `token_ledger`:

| Riadok | `from_key_id` | `to_key_id` | `amount` |
| ------ | ------------- | ----------- | -------- |
| Debet  | odosielateľ   | príjemca    | +suma    |
| Kredit | príjemca      | odosielateľ | -suma    |

Počkať — konvencia je:

| Riadok    | `from_key_id` | `to_key_id` | `amount` | Význam                    |
| --------- | ------------- | ----------- | -------- | ------------------------- |
| Odoslanie | odosielateľ   | príjemca    | +suma    | Odtok od odosielateľa     |
| Prijatie  | príjemca      | odosielateľ | +suma    | Príjem na strane príjemcu |

Zostatok sa vypočíta takto:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Priebeh prevodu

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Overenie**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **Idempotencia**: skontrolujte, či už `idempotency_key` existuje v účtovnej knihe.
   Ak áno, vráťte výsledok z vyrovnávacej pamäte.
3. **Transakcia** (jedna transakcia SQLite):
   a. Vypočítajte zostatok odosielateľa.
   b. Ak `balance < amount`, operáciu prerušte (nedostatok prostriedkov).
   c. Vložte riadok odoslania (`from=sender,`.

### Obmedzenie frekvencie

- Maximálne 10 prevodov za minútu na jeden kľúč API.
- Maximálne 10 000 tokenov v jednom prevode.
- Maximálne 100 000 prevedených tokenov za deň na jeden kľúč API.

---

## Pozvanie a uplatnenie tokenov

**Súbor:** `src/lib/gamification/invites.ts`

### Formát kódu

- **Kód**: 8-znakový alfanumerický reťazec (napr. `A3K9-X7M2`), ľahko čitateľný,
  zobrazovaný používateľovi.
- **Token**: 32-bajtový náhodný token uložený ako hash SHA-256. Používa sa na
  programové uplatnenie (napr. odkazy URL).

### Úložisko

| Stĺpec       | Hodnota                            |
| ------------ | ---------------------------------- |
| `code`       | `A3K9X7M2` (jedinečný, indexovaný) |
| `token_hash` | SHA-256(raw_token)                 |

Nespracovaný token sa používateľovi vráti presne raz pri vytvorení. OmniRoute
ho už nikdy neuloží ani nezobrazí — uchováva sa iba hash.

### Zabránenie odporúčaniu seba samého

Keď používateľ uplatní kód, systém skontroluje:

1. Kód patrí inému `api_key_id`.
2. Používateľ, ktorý kód uplatňuje, predtým neuplatnil žiadny kód od rovnakého
   odporúčateľa (spojenie cez `invite_tokens` + denník uplatnení).

Ak niektorá z kontrol zlyhá, uplatnenie sa zamietne s jasnou chybovou správou.

### Platnosť a limity

- Predvolená hodnota `max_uses`: 10 (konfigurovateľná pri vytvorení).
- Predvolená hodnota `expires_at`: 30 dní od vytvorenia.
- Kódy po uplynutí platnosti alebo vyčerpaní vrátia HTTP 410 Gone.

---

## Federácia komunitných serverov

**Súbor:** `src/lib/gamification/servers.ts`

### Pripojenie

Komunitný server sa registruje pomocou pozývacieho tokenu vydaného vzdialeným serverom. Lokálna inštancia:

1. Prijme pozývací token (napr. vložený do ovládacieho panela).
2. Zavolá `POST /api/gamification/federation/leaderboard` na vzdialenom serveri, aby overila token a načítala aktuálny rebríček.
3. Uloží záznam servera so `status: connected`.

### Model synchronizácie

Federácia používa **synchronizáciu prepísaním**, nie pripočítavaním:

```
Lokálna inštancia             Komunitný server
     │                              │
     ├── odoslanie skóre ─────────►│  POST /federation/score
     │   { api_key_id, score }      │  (server overí hash tokenu)
     │                              │
     ├── načítanie rebríčka ──────►│  GET /federation/leaderboard
     │◄── prvých N záznamov ───────┤  (prepíše lokálnu vyrovnávaciu pamäť)
     │                              │
     └── kontrola stavu ──────────►│  GET /federation/health
         (každých 60 s, časový limit 5 s)│
```

### Overovanie

Požiadavky federácie obsahujú:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

Vzdialený server vytvorí hash tokenu a vyhľadá zodpovedajúci riadok v tabuľke `community_servers`. Tým sa zabráni prenosu uloženého hashu.

### Monitorovanie stavu

Každý záznam servera sleduje:

| Pole        | Popis                                                 |
| ----------- | ----------------------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable`                |
| `last_sync` | Časová pečiatka ISO poslednej úspešnej synchronizácie |
| `failures`  | Počet po sebe nasledujúcich neúspešných kontrol stavu |

Po 5 po sebe nasledujúcich zlyhaniach sa stav zmení na `unreachable` a synchronizácia sa pozastaví, kým nebude úspešná manuálna kontrola stavu.

---

## Ochrana proti podvádzaniu

**Súbor:** `src/lib/gamification/antiCheat.ts`

### Výpočet skóre na strane servera

Všetky výpočty XP sa vykonávajú v `src/lib/gamification/xp.ts`. Klienti nikdy neposielajú skóre — posielajú akcie a server vypočíta XP. Do stĺpca `leaderboard.score` môže zapisovať iba kód na strane servera.

### Obmedzenie frekvencie

| Limit                              | Hodnota | Rozsah použitia   |
| ---------------------------------- | ------- | ----------------- |
| Maximálny počet XP za minútu       | 1,000   | Na jeden kľúč API |
| Maximálny počet prevodov za minútu | 10      | Na jeden kľúč API |
| Maximálna suma prevodu             | 10,000  | Na jeden prevod   |
| Maximálne denné prevody            | 100,000 | Na jeden kľúč API |

Obmedzenia frekvencie používajú posuvné okno v pamäti (rovnaký vzor ako `RateLimitManager` v `open-sse/services/`). Ak sa proces reštartuje, použijú sa počítadlá uložené v SQLite.

### Detekcia anomálií pomocou Z-skóre

Pre každý kľúč API systém udržiava pohyblivé 7-dňové okno XP získaných za hodinu. Pri každom udelení XP:

1. Vypočíta aktuálnu hodinovú mieru XP používateľa.
2. Vypočíta priemer populácie a štandardnú odchýlku.
3. Vypočíta `z = (user_rate - mean) / stddev`.
4. Ak `z > 3.0` (3 štandardné odchýlky), označí udalosť ako anomáliu.

Anomálie sa zaznamenávajú do `xp_audit_log` s `action = 'anomaly_detected'` a zobrazujú sa na ovládacom paneli správcu.

### Auditný záznam

Každé udelenie XP, prevod, získanie odznaku a detekcia anomálie sa zaznamenávajú do `xp_audit_log` s nasledujúcimi údajmi:

| Pole         | Popis                                          |
| ------------ | ---------------------------------------------- |
| `api_key_id` | Kto                                            |
| `action`     | Čo sa stalo (udelenie XP, prevod, anomália, …) |
| `xp_awarded` | Množstvo (0 pre udalosti nesúvisiace s XP)     |
| `metadata`   | JSON s kontextom (typ akcie, cieľ, …)          |
| `created_at` | Kedy (ISO 8601)                                |

Správcovia môžu získať úplný auditný záznam prostredníctvom `GET /api/gamification/anomalies`.

---

## Trasy API

Všetky trasy používajú štandardný vzor OmniRoute:

```
Trasa → predbežná požiadavka CORS → overenie tela (Zod) → autentifikácia (extractApiKey)
  → obslužná funkcia
```

### Koncové body

| Metóda | Cesta                                      | Popis                                           | Autentifikácia |
| ------ | ------------------------------------------ | ----------------------------------------------- | -------------- |
| GET    | `/api/gamification/leaderboard`            | Získať rebríček (rozsah, obdobie, stránkovanie) | Voliteľná      |
| POST   | `/api/gamification/leaderboard`            | Vynútiť obnovenie vyrovnávacej pamäte rebríčka  | Povinná        |
| GET    | `/api/gamification/stream`                 | Aktualizácie rebríčka v reálnom čase cez SSE    | Voliteľná      |
| GET    | `/api/gamification/transfer`               | Získať históriu prevodov (stránkovanie)         | Povinná        |
| POST   | `/api/gamification/transfer`               | Odoslať tokeny inému používateľovi              | Povinná        |
| GET    | `/api/gamification/invite`                 | Zobraziť moje pozývacie kódy                    | Povinná        |
| POST   | `/api/gamification/invite`                 | Vygenerovať nový pozývací kód                   | Povinná        |
| DELETE | `/api/gamification/invite`                 | Zrušiť platnosť pozývacieho kódu                | Povinná        |
| POST   | `/api/gamification/invite/redeem`          | Uplatniť pozývací kód                           | Povinná        |
| GET    | `/api/gamification/servers`                | Zobraziť komunitné servery                      | Povinná        |
| POST   | `/api/gamification/servers`                | Pripojiť sa ku komunitnému serveru              | Povinná        |
| DELETE | `/api/gamification/servers`                | Odpojiť sa od komunitného servera               | Povinná        |
| POST   | `/api/gamification/federation/score`       | Odoslať skóre na vzdialený server               | Federácia      |
| GET    | `/api/gamification/federation/leaderboard` | Načítať rebríček zo vzdialeného servera         | Federácia      |
| GET    | `/api/gamification/notifications`          | Oznámenia SSE o odznakoch/zvýšení úrovne        | Povinná        |
| GET    | `/api/gamification/anomalies`              | Zobraziť hlásenia anomálií (správca)            | Správca        |
| POST   | `/api/gamification/rotate`                 | Obmeniť tajné kľúče pozývacích tokenov          | Povinná        |

### Príklady požiadaviek/odpovedí

**POST /api/gamification/transfer**

```json
// Požiadavka
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// Odpoveď 200
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

// Odpoveď 400 (nedostatok prostriedkov)
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

## Nástroje MCP (8)

Registrované v `open-sse/mcp-server/` spolu s existujúcimi nástrojmi. Obmedzené na
rozsah oprávnení `gamification`.

| Nástroj                    | Popis                                          | Vstupná schéma               |           |
| -------------------------- | ---------------------------------------------- | ---------------------------- | --------- |
| `gamification_leaderboard` | Získa rebríček pre rozsah/obdobie              | `{ scope, period?, limit? }` |
| `gamification_rank`        | Získa poradie volajúceho a susedné umiestnenia | `{ scope }`                  |
| `gamification_profile`     | Získa súhrn XP, úrovne, titulu a série         | `{}`                         |
| `gamification_badges`      | Zobrazí získané odznaky alebo všetky definície | `{ earned?: boolean }`       |
| `gamification_transfer`    | Odošle tokeny inému používateľovi              | `{ to, amount }`             |
| `gamification_invite`      | Vygeneruje alebo zobrazí pozývacie kódy        | `{ action: "create"          | "list" }` |
| `gamification_servers`     | Zobrazí alebo pripojí komunitné servery        | `{ action, token? }`         |
| `gamification_anomalies`   | Zobrazí hlásenia anomálií (rozsah správcu)     | `{ limit?, since? }`         |

---

## Stránky ovládacieho panela

### `/dashboard/leaderboard`

- Zobrazenie pódia (3 najlepší používatelia s avatarmi a XP).
- Výber rozsahu: Globálne / Týždenné / Mesačné / Zdieľané tokeny / Príspevky.
- Stránkovaná tabuľka (25 položiek na stranu) s poradím, menom, skóre, úrovňou a titulom.
- Aktualizácie v reálnom čase prostredníctvom SSE — zmeny poradia sú animované.
- Aktuálny používateľ je v tabuľke zvýraznený pomocou pripnutého riadka „Vaše poradie“.

### `/dashboard/profile`

- Ukazovateľ priebehu XP s aktuálnou úrovňou a hranicou ďalšej úrovne.
- Odznak titulu zobrazený na výraznom mieste.
- Galéria odznakov — získané odznaky s dátumom získania, nezískané odznaky sú zobrazené sivou
  (skryté odznaky zobrazujú „???“, kým nie sú získané).
- Počítadlo série s ikonou plameňa; kalendár série (posledných 30 dní).
- Graf histórie XP (denné XP za posledných 30 dní).

### `/dashboard/tokens`

- Zostatok tokenov (výrazne zobrazený v hornej časti stránky).
- Formulár prevodu: príjemca, suma, potvrdzovacie dialógové okno.
- Tabuľka histórie prevodov s filtrami (odoslané/prijaté/všetky).
- Sekcia pozvánok: aktívne kódy, vygenerovanie nového kódu, odkaz na zdieľanie.
- Komunitné servery: zoznam so stavom funkčnosti, pripojenie/odpojenie.

### `/dashboard/gamification/admin`

- Zoznam anomálií so závažnosťou, používateľom, časovou pečiatkou a z-skóre.
- Prehliadač protokolu auditu s filtrami (typ akcie, používateľ, rozsah dátumov).
- Systémové štatistiky: celkový počet udelených XP, aktívni používatelia, miery získavania odznakov.
- Prehľad funkčnosti federačných serverov.

---

## Integrácia do pipeline

### Bod integrácie

Gamifikácia sa pripája k pipeline požiadaviek v jednom bode v
`open-sse/handlers/chatCore.ts`:

```typescript
// Po odoslaní odpovede klientovi:
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
    // Spustiť bez čakania: zaprotokolovať, ale nikdy nepreniesť ku klientovi
  });
});
```

### Typy udalostí

| Typ udalosti        | Kedy sa emituje                                    |
| ------------------- | -------------------------------------------------- |
| `request.completed` | Odoslaná úspešná odpoveď LLM                       |
| `provider.switch`   | Zmena poskytovateľa (započítava sa náhradné combo) |
| `combo.created`     | Uložená nová konfigurácia comba                    |
| `combo.used`        | Cieľ comba úspešne dosiahnutý                      |
| `badge.earned`      | Vyhodnotenie odznaku našlo zhodu                   |
| `streak.milestone`  | Prekročená hranica série                           |
| `transfer.sent`     | Dokončený prevod tokenov                           |
| `referral.redeemed` | Pozývací kód úspešne uplatnený                     |
| `compression.used`  | Použitá kompresia promptu                          |
| `skill.executed`    | Dokončené vykonanie zručnosti                      |
| `model.first_use`   | Model nebol použitý počas posledných 7 dní         |

### Záruka neblokujúceho spracovania

Vzor `setImmediate` + `.catch(() => {})` zabezpečuje:

1. Odpoveď sa úplne odošle pred spustením gamifikácie.
2. Chyby gamifikácie sa nikdy nezobrazia klientovi.
3. Spracovanie udalosti prebehne v ďalšej mikroúlohe, nie priamo.

---

## Bezpečnosť

### Model hrozieb

| Hrozba                              | Zmiernenie                                                                       |
| ----------------------------------- | -------------------------------------------------------------------------------- |
| Umelé zvyšovanie skóre              | Výpočet XP iba na strane servera; klienti odosielajú akcie, nie skóre            |
| Útoky opakovaním požiadaviek        | Kľúče idempotencie pri prevodoch; deduplikácia denníka auditu                    |
| Podvody pri prevodoch               | Podvojné účtovníctvo; atomické transakcie; obmedzenia frekvencie požiadaviek     |
| Vlastné odporúčanie                 | Krížová kontrola `api_key_id` pri uplatnení                                      |
| Manipulácia rebríčka                | Detekcia anomálií pomocou Z-skóre; panel anomálií pre správcu                    |
| Krádež federačného tokenu           | Úložisko hashované pomocou SHA-256; nespracovaný token sa zobrazí iba raz        |
| Útok hrubou silou na pozývacie kódy | Obmedzenie frekvencie požiadaviek na koncovom bode uplatnenia; entropia 8 znakov |
| XSS v zobrazovaných menách          | Zobrazované mená sú sanitizované; položky rebríčka sú escapované                 |
| Časovacie útoky na hashe            | `crypto.timingSafeEqual` na porovnanie hashov tokenov                            |

### Požiadavky na autentifikáciu

- **Verejné** (bez autentifikácie): `GET /leaderboard`, `GET /stream` (rebríčky
  iba na čítanie).
- **Vyžaduje sa kľúč API**: všetky operácie zápisu, profil, prevody, pozvánky.
- **Iba správca**: panel anomálií, prehliadač denníka auditu.
- **Federácia**: samostatný spôsob autentifikácie používajúci nespracovaný token
  v hlavičke `Authorization`, overený voči uloženému hashu SHA-256.

---

## Testovanie

### Testovacie súbory

Všetky testy používajú natívny spúšťač testov Node.js (`node --import tsx/esm --test`).

| Testovací súbor                               | Pokrýva                                                           | Testy |
| --------------------------------------------- | ----------------------------------------------------------------- | ----- |
| `tests/unit/gamification/xp.test.ts`          | Výpočet XP, krivka úrovní, tituly                                 | 8     |
| `tests/unit/gamification/badges.test.ts`      | Vyhodnocovanie kritérií odznakov, udeľovanie                      | 10    |
| `tests/unit/gamification/streaks.test.ts`     | Logika sérií, míľniky, hraničné prípady                           | 7     |
| `tests/unit/gamification/leaderboard.test.ts` | Výpočet poradia, stránkovanie, rotácia                            | 8     |
| `tests/unit/gamification/sharing.test.ts`     | Prevody, zostatok, idempotencia                                   | 9     |
| `tests/unit/gamification/invites.test.ts`     | Vytvorenie, uplatnenie, vypršanie platnosti, vlastné odporúčanie  | 7     |
| `tests/unit/gamification/antiCheat.test.ts`   | Obmedzenia frekvencie požiadaviek, Z-skóre, zaznamenávanie auditu | 6     |
| `tests/unit/gamification/events.test.ts`      | Emitovanie udalostí, distribúcia, spracovanie chýb                | 5     |

### Spúšťanie testov

```bash
# Všetky testy gamifikácie
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# Jeden testovací súbor
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Požiadavky na pokrytie

Podľa `CONTRIBUTING.md` musia všetky nové moduly spĺňať:

- Pokrytie vetiev >= 80 %.
- Každá verejná funkcia musí byť otestovaná aspoň raz.
- Musia byť otestované chybové scenáre (nedostatočný zostatok, kódy s vypršanou platnosťou, obmedzenia frekvencie požiadaviek).

---

## Štruktúra súborov

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # Všetkých 8 tabuliek + indexy
      gamification.ts                  # Doménový modul CRUD
    gamification/
      xp.ts                           # Výpočet XP, krivka úrovní, tituly
      badges.ts                       # Definície odznakov, kritériá, vyhodnocovanie
      streaks.ts                      # Sledovanie denných sérií
      leaderboard.ts                  # Výpočet poradia, SSE, rotácia
      antiCheat.ts                    # Obmedzovanie frekvencie, z-skóre, audit
      sharing.ts                      # Účtovná kniha prevodov tokenov
      invites.ts                      # Pozývacie/uplatniteľné kódy
      servers.ts                      # Federácia komunitných serverov
      events.ts                       # Emitor udalostí (integračný bod)
      notifications.ts                # Prúd oznámení SSE
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST rebríčka
        leaderboard/stream/route.ts   # Aktualizácie v reálnom čase cez SSE
        transfer/route.ts             # GET/POST prevodov
        invite/route.ts               # GET/POST/DELETE pozývacích kódov
        invite/redeem/route.ts        # POST na uplatnenie kódu
        servers/route.ts              # GET/POST/DELETE serverov
        federation/score/route.ts     # POST na odoslanie skóre
        federation/leaderboard/route.ts # GET na načítanie rebríčka
        notifications/route.ts        # Oznámenia cez SSE
        anomalies/route.ts            # GET hlásení anomálií
        rotate/route.ts               # POST na rotáciu tajných kľúčov
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Stránka poradia
        profile/page.tsx               # Stránka XP/odznakov/sérií
        tokens/page.tsx                # Stránka zostatku/prevodov/pozvánok
        gamification/admin/page.tsx    # Administrátorské monitorovanie anomálií
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
    GAMIFICATION.md                    # Tento dokument
```

---

## Stratégia migrácie

### Fáza 1: Jadro backendu (PR 1)

- Migrácia `060_create_gamification.sql` (8 tabuliek).
- `src/lib/db/gamification.ts` (doménový modul).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- Integračný bod v `chatCore.ts`.
- Jednotkové testy pre XP, série a udalosti.

### Fáza 2: Odznaky a rebríček (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Definície odznakov v konštantách.
- Trasy API rebríčka + prúd SSE.
- Jednotkové testy pre odznaky a rebríček.

### Fáza 3: Zdieľanie a pozvánky (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- Trasy API pre prevody a pozvánky.
- Jednotkové testy pre zdieľanie, pozvánky a ochranu proti podvádzaniu.

### Fáza 4: Federácia a ovládací panel (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- Trasy API federácie.
- Stránky ovládacieho panela (rebríček, profil, tokeny, administrácia).
- Registrácia nástrojov MCP.

---

## Budúce možnosti

- **Sezónne udalosti**: časovo obmedzené sady odznakov a sezóny rebríčkov.
- **Tímové rebríčky**: zoskupovanie používateľov podľa organizácie alebo kombinácie.
- **Násobiče XP**: zvýšenie XP počas propagačných období.
- **Zdieľanie úspechov**: generovanie zdieľateľných kariet odznakov (obrázkov OpenGraph).
- **Mobilné push notifikácie**: upozornenia založené na webhookoch pre udalosti súvisiace s odznakmi alebo úrovňami.
- **API rebríčka**: verejné API pre integrácie tretích strán.
