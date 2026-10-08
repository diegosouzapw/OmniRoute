# Gamification & Leaderboard System (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **Zdroj pravdy:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Poslední aktualizace:** 2026-06-28 — v3.8.40

OmniRoute obsahuje gamifikační vrstvu s přístupem local-first, která odměňuje uživatele za
používání platformy — odesílání požadavků, přepínání poskytovatelů, vytváření
kombinací, sdílení tokenů a přispívání komunitě. Veškerý stav je uložen v
SQLite; federace s komunitními servery je volitelná a založená na odesílání dat.

Systém je navržen tak, aby měl **nulovou latenci na kritické cestě** — gamifikační
události jsou zpracovávány asynchronně bez čekání v rámci pipeline požadavků a nikdy neblokují
odpověď LLM.

---

## Přehled

### Účel

Zvýšit zapojení a udržení uživatelů prostřednictvím viditelného postupu (XP,
úrovně, odznaky), sociálního potvrzení (žebříčky) a ekonomických pobídek (sdílení
tokenů, odměny za pozvání).

### Rozsah

| Funkce                  | Popis                                                                           |
| ----------------------- | ------------------------------------------------------------------------------- |
| XP a úrovně             | Získávání XP za jednotlivé akce; postup po polynomiální křivce úrovní           |
| Odznaky                 | Více než 20 úspěchů v 5 kategoriích se 4 úrovněmi vzácnosti                     |
| Série                   | Sledování každodenní aktivity s aktuální a nejdelší sérií                       |
| Žebříčky                | Globální, týdenní, měsíční, podle sdílení tokenů a příspěvků                    |
| Sdílení tokenů          | Převod kreditů mezi uživateli prostřednictvím podvojné účetní knihy             |
| Pozvání a uplatnění     | Doporučovací kódy ukládané jako hashe SHA-256                                   |
| Komunitní servery       | Federace s externími instancemi OmniRoute                                       |
| Ochrana proti podvádění | Bodování na straně serveru, omezení frekvence a detekce anomálií pomocí z-skóre |

### Principy návrhu

1. **Local-first** — veškerý stav je uložen v SQLite, nejsou vyžadovány žádné externí služby.
2. **Neblokující** — události jsou zpracovávány asynchronně bez čekání; cesta odpovědi LLM
   není gamifikační logikou nikdy zpožděna.
3. **Server jako autorita** — XP se vypočítává výhradně na straně serveru; klienti nemohou
   uměle navyšovat skóre.
4. **Respektování soukromí** — účast v žebříčku je volitelná; uživatelé mohou
   svůj profil skrýt.
5. **Připraveno na federaci** — komunitní servery mohou odesílat skóre prostřednictvím podepsaného API;
   synchronizace používá přepsání, nikoli sčítání.

---

## Architektura

### Tok na vysoké úrovni

```
Požadavek klienta
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (stávající pipeline) ...
      → upstream odpověď odeslána klientovi
      → setImmediate (asynchronně bez čekání):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

Emitor událostí představuje jediný integrační bod. `chatCore.ts` volá
`emitGamificationEvent()` po odeslání odpovědi; modul událostí ji distribuuje
do subsystémů XP, sérií, odznaků, žebříčků a ochrany proti podvádění.

### Graf závislostí modulů

```
src/lib/gamification/
  events.ts          ← vstupní bod (volaný z chatCore.ts)
    ├── xp.ts        ← výpočet XP a určení úrovně
    ├── streaks.ts   ← sledování série každodenní aktivity
    ├── badges.ts    ← vyhodnocení kritérií odznaků
    ├── leaderboard.ts ← výpočet pořadí a vysílání SSE
    ├── antiCheat.ts ← omezení frekvence a detekce anomálií
    ├── sharing.ts   ← účetní kniha převodů tokenů
    ├── invites.ts   ← správa kódů pro pozvání/uplatnění
    ├── servers.ts   ← federace komunitních serverů
    └── notifications.ts ← stream oznámení SSE

src/lib/db/
  gamification.ts    ← všechny operace CRUD (8 tabulek)

src/app/api/gamification/
  leaderboard/       ← GET pořadí, POST ruční obnovení
  leaderboard/stream ← aktualizace v reálném čase přes SSE
  transfer/          ← GET historie, POST odeslání tokenů
  invite/            ← GET/POST kódy, DELETE zneplatnění
  invite/redeem/     ← POST uplatnění kódu
  servers/           ← GET/POST/DELETE komunitní servery
  federation/score/  ← POST odeslání skóre na server
  federation/leaderboard/ ← GET načtení žebříčku ze serveru
  notifications/     ← oznámení SSE o odznacích/postupu na vyšší úroveň
  anomalies/         ← GET hlášení anomálií (správce)
  rotate/            ← POST rotace tajných klíčů tokenů pro pozvání
```

---

## Datová vrstva

### Databázové tabulky

Všechny tabulky se nacházejí v hlavní databázi SQLite OmniRoute, vytvořené migrací
`060_create_gamification.sql`. Žurnálování WAL se dědí ze singletonu
`getDbInstance()` v `src/lib/db/core.ts`.

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

### Doménový modul: `src/lib/db/gamification.ts`

Dodržuje standardní vzor OmniRoute — importuje `getDbInstance()` z
`core.ts` a exportuje typované funkce CRUD. Obslužné rutiny tras neobsahují žádné přímé SQL.

Klíčové funkce:

| Funkce                     | Popis                                                           |
| -------------------------- | --------------------------------------------------------------- |
| `upsertLeaderboardEntry()` | Vloží nebo aktualizuje skóre pro (api_key_id, scope, period)    |
| `getLeaderboard()`         | Stránkovaný žebříček pro daný rozsah/období                     |
| `getUserLevel()`           | Získá nebo vytvoří záznam úrovně uživatele                      |
| `updateUserLevel()`        | Atomicky nastaví XP, úroveň a titul                             |
| `getBadgeDefinitions()`    | Všechny definice odznaků (volitelně filtrované)                 |
| `getUserBadges()`          | Odznaky získané uživatelem                                      |
| `awardBadge()`             | Vloží získání odznaku (idempotentní podle badge_id)             |
| `logXpAction()`            | Přidá záznam do xp_audit_log                                    |
| `getXpAuditLog()`          | Stránkovaná historie auditu uživatele                           |
| `insertLedgerEntry()`      | Podvojný převod (v transakci)                                   |
| `getBalance()`             | Součet přijatých prostředků minus odeslané prostředky uživatele |
| `getTransferHistory()`     | Stránkovaný protokol převodů                                    |
| `createInviteToken()`      | Vloží zvací kód a hashovaný token                               |
| `redeemInviteToken()`      | Vyhledá podle kódu, ověří a zvýší počet použití                 |
| `upsertCommunityServer()`  | Zaregistruje nebo aktualizuje federační server                  |
| `getCommunityServers()`    | Vypíše servery uživatele                                        |
| `deleteCommunityServer()`  | Odebere registraci serveru                                      |

---

## Systém XP / úrovní

**Soubor:** `src/lib/gamification/xp.ts`

### Křivka úrovní

Počet XP potřebný k dosažení úrovně `n` se řídí polynomiální křivkou:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Úroveň | XP do další úrovně | Kumulativní XP | Titul      |
| ------ | ------------------ | -------------- | ---------- |
| 1      | 100                | 100            | Začátečník |
| 5      | 1,118              | 2,415          | Začátečník |
| 10     | 3,162              | 10,523         | Průzkumník |
| 25     | 12,500             | 86,024         | Průzkumník |
| 50     | 35,355             | 345,529        | Expert     |
| 75     | 64,952             | 948,683        | Mistr      |
| 100    | 100,000            | 2,050,000      | Legenda    |

### Tituly

| Rozsah úrovní | Titul      |
| ------------- | ---------- |
| 1 – 9         | Začátečník |
| 10 – 24       | Průzkumník |
| 25 – 49       | Expert     |
| 50 – 74       | Mistr      |
| 75 – 100      | Legenda    |

### Odměny XP

| Akce              | XP  | Popis                                                      |
| ----------------- | --- | ---------------------------------------------------------- |
| `request`         | 1   | Za každý požadavek API směrovaný prostřednictvím OmniRoute |
| `provider_switch` | 5   | Přepnutí na jiného poskytovatele                           |
| `model_switch`    | 3   | Přepnutí na jiný model                                     |
| `combo_create`    | 10  | Vytvoření nového komba                                     |
| `combo_use`       | 2   | Použití komba pro požadavek                                |
| `token_share`     | 1   | Za každých 1 000 tokenů sdílených s jiným uživatelem       |
| `invite_redeem`   | 50  | Uplatnění pozvánkového kódu                                |
| `daily_login`     | 5   | Denní aktivní používání (jednou denně)                     |
| `streak_bonus`    | 2   | Za každý po sobě jdoucí den série (násobeno délkou série)  |
| `badge_unlock`    | 10  | Odemknutí odznaku                                          |

### Průběh udělení

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. Vyhledejte `XP_REWARDS[action]` a získejte počet XP.
2. Předejte požadavek funkci `checkRateLimit()` (ochrana proti podvádění: maximálně 1000 XP/min na klíč).
3. Otevřete transakci:
   - Načtěte aktuální řádek `user_levels`.
   - Přičtěte XP; přepočítejte úroveň pomocí `levelFromXp(totalXp)`.
   - Pokud se úroveň změnila, nastavte `levelUp = true`.
   - Aktualizujte řádek `user_levels`.
   - Vložte záznam do `xp_audit_log`.
4. Vraťte výsledek. Volající zpracuje oznámení.

### Pomocná funkce: `levelFromXp(totalXp)`

Prochází úrovně 1..100 a sčítá `xp_for_level(n)`, dokud kumulativní XP
nepřekročí `totalXp`. Vrátí nejvyšší úroveň, jejíž prahová hodnota byla dosažena.
Složitost je O(100) — přijatelná, protože maximální úroveň je 100.

---

## Systém odznaků

**Soubor:** `src/lib/gamification/badges.ts`

### Kategorie

| Kategorie      | Popis                                  | Příklady odznaků                      |
| -------------- | -------------------------------------- | ------------------------------------- |
| `usage`        | Milníky založené na objemu             | První požadavek, 1K požadavků, 100K   |
| `sharing`      | Sdílení tokenů a doporučení            | První sdílení, Štědrý (10 sdílení)    |
| `contribution` | Zapojení do komunity                   | Tvůrce komb, Průzkumník poskytovatelů |
| `streak`       | Pravidelnost v průběhu času            | Týdenní bojovník, Měsíčně oddaný      |
| `rare`         | Obtížně získatelné nebo skryté úspěchy | Průkopník, Hlášení chyb               |

### Vzácnosti

| Vzácnost    | Barva  | Orientační pravděpodobnost |
| ----------- | ------ | -------------------------- |
| `common`    | Šedá   | Většina uživatelů          |
| `uncommon`  | Zelená | Aktivní uživatelé          |
| `rare`      | Modrá  | Oddaní uživatelé           |
| `legendary` | Zlatá  | Nejlepší 1 %               |

### Typy kritérií

| Typ            | Pole         | Popis                                           |
| -------------- | ------------ | ----------------------------------------------- |
| `action_count` | `count`      | Proveďte akci Nkrát (např. 1000 požadavků)      |
| `streak`       | `days`       | Udržujte sérii po N po sobě jdoucích dnů        |
| `unique_count` | `field`, `n` | Použijte N jedinečných hodnot (např. 10 modelů) |
| `rank`         | `scope`, `n` | Dosáhněte N. místa v určitém žebříčku           |
| `first`        | —            | Buďte první, kdo provede danou akci             |
| `hidden`       | (různé)      | Kritéria se zobrazí až po získání               |

Definice odznaků jsou uloženy v `badge_definitions` jako JSON `criteria`:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Průběh vyhodnocení

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # všechny definice
    → getUserBadges(apiKeyId)         # již získané (přeskočit)
    → pro každý dosud nezískaný odznak:
       → matchesCriteria(badge, event, userState)
       → při shodě: awardBadge(apiKeyId, badgeId)
         → vrátit datovou část oznámení
```

Vyhodnocení je **řízené událostmi** — probíhá po každé gamifikační události, ale
kontroluje pouze odznaky, jejichž `criteria.type` odpovídá akci události. Díky tomu
zůstává vyhodnocení rychlé (< 5 ms pro většinu událostí).

### `matchesCriteria(badge, event, userState)`

| Typ kritéria   | Kontrola                                                   |
| -------------- | ---------------------------------------------------------- |
| `action_count` | `getActionCount(apiKeyId, action) >= count`                |
| `streak`       | `getCurrentStreak(apiKeyId) >= days`                       |
| `unique_count` | `getUniqueCount(apiKeyId, field) >= n`                     |
| `rank`         | `getRank(apiKeyId, scope) <= n`                            |
| `first`        | Žádný předchozí záznam v `xp_audit_log` pro tento typ akce |
| `hidden`       | Deleguje na příslušnou dílčí kontrolu                      |

### Vestavěné odznaky (20+)

<details>
<summary>Úplný seznam odznaků</summary>

| Odznak                | Kategorie  | Vzácnost   | Kritéria                        |
| --------------------- | ---------- | ---------- | ------------------------------- |
| První kroky           | používání  | běžný      | 1 požadavek                     |
| Zahřívací kolo        | používání  | běžný      | 100 požadavků                   |
| Pokročilý uživatel    | používání  | neobvyklý  | 1 000 požadavků                 |
| Centurion             | používání  | vzácný     | 10 000 požadavků                |
| OmniPower             | používání  | legendární | 100 000 požadavků               |
| Střídač poskytovatelů | přispívání | běžný      | Použít 5 různých poskytovatelů  |
| Mistr poskytovatelů   | přispívání | neobvyklý  | Použít 20 různých poskytovatelů |
| Architekt kombinací   | přispívání | neobvyklý  | Vytvořit 5 kombinací            |
| Velmistr kombinací    | přispívání | vzácný     | Vytvořit 25 kombinací           |
| První sdílení         | sdílení    | běžný      | 1 převod tokenů                 |
| Štědrý                | sdílení    | neobvyklý  | 10 převodů tokenů               |
| Filantrop             | sdílení    | vzácný     | Převést celkem 10 000 tokenů    |
| Doporučitel           | sdílení    | běžný      | 1 úspěšné doporučení            |
| Budovatel sítě        | sdílení    | neobvyklý  | 10 úspěšných doporučení         |
| Týdenní bojovník      | série      | neobvyklý  | 7denní série                    |
| Měsíční oddanost      | série      | vzácný     | 30denní série                   |
| Nezastavitelný        | série      | legendární | 365denní série                  |
| Průkopník             | vzácné     | legendární | Připojit se během beta období   |
| Průkopník komprese    | vzácné     | neobvyklý  | Použít kompresi 100krát         |
| Sběratel dovedností   | vzácné     | vzácný     | Použít 10 různých dovedností    |
| Průzkumník modelů     | přispívání | neobvyklý  | Použít 15 různých modelů        |

</details>

---

## Sledování sérií

**Soubor:** `src/lib/gamification/streaks.ts`

### Datový model

Série jsou uloženy v tabulce `key_value` (sdílené pomocné tabulce) pod
klíči s jmenným prostorem:

| Klíč                          | Hodnota                          | Popis              |
| ----------------------------- | -------------------------------- | ------------------ |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Data aktivní série |

### Logika

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Načíst záznam série z tabulky `key_value`.
2. Analyzovat `{current}`, `{longest}`, `{lastDate}` (řetězec data ve formátu ISO).
3. Pokud `lastDate === today` — beze změny (dnešek již byl započítán).
4. Pokud `lastDate === yesterday` — zvýšit `current`; v případě potřeby aktualizovat `longest`.
5. Pokud `lastDate < yesterday` — nastavit `current = 1` (série byla přerušena).
6. Zapsat aktualizovaný záznam.
7. Zkontrolovat milníky: 7, 14, 30, 60, 90, 180, 365 dní. Pokud byl některý překročen, nastavit
   `milestone = true` (volající udělí XP a zkontroluje odznaky).

### Okrajové případy

- **Časové pásmo**: série používají data v UTC (`new Date().toISOString().slice(0, 10)`).
  Je to záměrné — jednotné kanonické časové pásmo zabraňuje manipulaci prostřednictvím
  přepínání časových pásem.
- **Noví uživatelé**: záznam série neexistuje; první požadavek jej vytvoří s
  `current=1, longest=1, lastDate=today`.
- **Více požadavků za den**: sérii zvýší pouze první požadavek daného dne podle UTC.

---

## Žebříček

**Soubor:** `src/lib/gamification/leaderboard.ts`

### Rozsahy

| Rozsah          | Období  | Popis                                                            |
| --------------- | ------- | ---------------------------------------------------------------- |
| `global`        | `all`   | Kumulativní XP za celou dobu                                     |
| `weekly`        | `week`  | XP získané v aktuálním týdnu UTC (po–ne)                         |
| `monthly`       | `month` | XP získané v aktuálním měsíci UTC                                |
| `tokens_shared` | `all`   | Celkový počet tokenů převedených ostatním                        |
| `contributions` | `all`   | Vytvořené kombinace + použití poskytovatelé + použité dovednosti |

### Výpočet pořadí

Pořadí se **vypočítává při načítání**, není uloženo. Tím se zabrání zastaralým údajům
o pořadí a odpadá potřeba pravidelných úloh pro přepočítávání pořadí.

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

### Střídání období

Týdenní a měsíční žebříčky se střídají automaticky:

1. **Archivace**: na hranici období zkopírovat aktuální položky do
   `leaderboard_archive` s označením období.
2. **Resetování**: odstranit položky pro ukončené období.
3. **Spuštění**: kontrola probíhá při každém volání `updateLeaderboard()`; první požadavek
   nového období spustí střídání.

Tím je zajištěno, že se týdenní žebříčky resetují každé pondělí v 00:00 UTC a měsíční žebříčky
se resetují první den každého měsíce.

### Aktualizace SSE v reálném čase

**Koncový bod:** `GET /api/gamification/stream`

```
Klient → GET /api/gamification/stream
  → Navázáno připojení SSE
  → Server okamžitě odešle snímek 10 nejlepších položek žebříčku
  → Každých 5 sekund: odeslat aktualizovaných 10 nejlepších položek, pokud došlo ke změně
  → Každých 15 sekund: komentář heartbeat (": heartbeat\n\n")
  → Klient se odpojí → vyčištění (odebrání listeneru)
```

Formát události:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

Správce SSE sleduje připojené klienty pro každý rozsah a aktualizace odesílá pouze tehdy,
když se data žebříčku od posledního odeslání skutečně změnila.

---

## Sdílení tokenů

**Soubor:** `src/lib/gamification/sharing.ts`

### Podvojné účetnictví

Každý převod vytvoří dva řádky v tabulce `token_ledger`:

| Řádek   | `from_key_id` | `to_key_id` | `amount` |
| ------- | ------------- | ----------- | -------- |
| Má dáti | odesílatel    | příjemce    | +částka  |
| Dal     | příjemce      | odesílatel  | -částka  |

Pozor — platí následující konvence:

| Řádek    | `from_key_id` | `to_key_id` | `amount` | Význam               |
| -------- | ------------- | ----------- | -------- | -------------------- |
| Odeslání | odesílatel    | příjemce    | +částka  | Odtok od odesílatele |
| Přijetí  | příjemce      | odesílatel  | +částka  | Příjem pro příjemce  |

Zůstatek se vypočítá takto:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Průběh převodu

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Ověření**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **Idempotence**: zkontrolovat, zda již v účetní knize existuje `idempotency_key`.
   Pokud ano, vrátit výsledek z mezipaměti.
3. **Transakce** (jediná transakce SQLite):
   a. Vypočítat zůstatek odesílatele.
   b. Pokud `balance < amount`, operaci zrušit (nedostatek prostředků).
   c. Vložit řádek odeslání (`from=sender,`.

### Omezení frekvence

- Max. 10 převodů za minutu pro každý klíč API.
- Max. 10 000 tokenů v jednom převodu.
- Max. 100 000 převedených tokenů za den pro každý klíč API.

---

## Pozvánky a uplatnění tokenů

**Soubor:** `src/lib/gamification/invites.ts`

### Formát kódu

- **Kód**: 8znakový alfanumerický kód (např. `A3K9-X7M2`), čitelný pro člověka
  a zobrazovaný uživateli.
- **Token**: 32bajtový náhodný token uložený jako hash SHA-256. Používá se k
  programovému uplatnění (např. prostřednictvím odkazů URL).

### Úložiště

| Sloupec      | Hodnota                            |
| ------------ | ---------------------------------- |
| `code`       | `A3K9X7M2` (jedinečný, indexovaný) |
| `token_hash` | SHA-256(raw_token)                 |

Nezpracovaný token je uživateli vrácen právě jednou při vytvoření. OmniRoute
jej už nikdy neukládá ani nezobrazuje — uchovává se pouze hash.

### Zamezení doporučení sebe sama

Když uživatel uplatní kód, systém zkontroluje:

1. Kód patří jinému `api_key_id`.
2. Uplatňující uživatel dříve neuplatnil žádný kód od stejného
   doporučitele (propojení `invite_tokens` se záznamem uplatnění).

Pokud některá z kontrol selže, uplatnění je zamítnuto s jasnou chybovou zprávou.

### Platnost a limity

- Výchozí hodnota `max_uses`: 10 (lze nastavit při vytvoření).
- Výchozí hodnota `expires_at`: 30 dní od vytvoření.
- U kódů s vypršenou platností nebo vyčerpaným limitem se vrací HTTP 410 Gone.

---

## Federace komunitních serverů

**Soubor:** `src/lib/gamification/servers.ts`

### Připojení

Komunitní server se registruje pomocí zvacího tokenu vydaného vzdáleným
serverem. Místní instance:

1. Přijme zvací token (např. vložený do řídicího panelu).
2. Zavolá `POST /api/gamification/federation/leaderboard` na vzdáleném serveru,
   aby ověřila token a načetla aktuální žebříček.
3. Uloží záznam serveru se `status: connected`.

### Model synchronizace

Federace používá **synchronizaci přepsáním**, nikoli přičítáním:

```
Místní instance                Komunitní server
     │                              │
     ├── odeslání skóre ──────────►│  POST /federation/score
     │   { api_key_id, score }      │  (server ověří hash tokenu)
     │                              │
     ├── načtení žebříčku ────────►│  GET /federation/leaderboard
     │◄── prvních N záznamů ───────┤  (přepíše místní mezipaměť)
     │                              │
     └── kontrola stavu ──────────►│  GET /federation/health
         (každých 60 s, časový limit 5 s) │
```

### Ověřování

Požadavky federace obsahují:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

Vzdálený server vytvoří hash tokenu a vyhledá odpovídající řádek
`community_servers`. Tím se zabrání přenosu uloženého hashe.

### Monitorování stavu

Každý záznam serveru sleduje:

| Pole        | Popis                                             |
| ----------- | ------------------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable`            |
| `last_sync` | Časové razítko ISO poslední úspěšné synchronizace |
| `failures`  | Počet po sobě jdoucích neúspěšných kontrol stavu  |

Po 5 po sobě jdoucích selháních se stav změní na `unreachable` a synchronizace
se pozastaví, dokud nebude úspěšná ruční kontrola stavu.

---

## Ochrana proti podvádění

**Soubor:** `src/lib/gamification/antiCheat.ts`

### Výpočet skóre na straně serveru

Všechny výpočty XP probíhají v `src/lib/gamification/xp.ts`. Klienti nikdy
neodesílají skóre — odesílají akce a server vypočítá XP. Do sloupce
`leaderboard.score` může zapisovat pouze kód na straně serveru.

### Omezení frekvence

| Limit                     | Hodnota | Rozsah      |
| ------------------------- | ------- | ----------- |
| Maximum XP za minutu      | 1,000   | Na klíč API |
| Maximum převodů za minutu | 10      | Na klíč API |
| Maximální částka převodu  | 10,000  | Na převod   |
| Maximum denních převodů   | 100,000 | Na klíč API |

Omezení frekvence používají klouzavé okno v paměti (stejný vzor jako
`RateLimitManager` v `open-sse/services/`). Pokud se proces restartuje,
použijí se jako záložní řešení čítače uložené v SQLite.

### Detekce anomálií pomocí Z-skóre

Pro každý klíč API systém udržuje klouzavé 7denní okno XP získaných za
hodinu. Při každém udělení XP:

1. Vypočítá aktuální hodinovou míru získávání XP uživatele.
2. Vypočítá průměr a směrodatnou odchylku populace.
3. Vypočítá `z = (user_rate - mean) / stddev`.
4. Pokud `z > 3.0` (3 směrodatné odchylky), označí událost jako anomálii.

Anomálie se zaznamenávají do `xp_audit_log` s `action = 'anomaly_detected'`
a zobrazují se v řídicím panelu správce.

### Auditní stopa

Každé udělení XP, převod, získání odznaku a detekce anomálie se zaznamenává do
`xp_audit_log` s následujícími údaji:

| Pole         | Popis                                        |
| ------------ | -------------------------------------------- |
| `api_key_id` | Kdo                                          |
| `action`     | Co se stalo (xp_award, transfer, anomaly, …) |
| `xp_awarded` | Množství (0 pro události bez XP)             |
| `metadata`   | JSON s kontextem (typ akce, cíl, …)          |
| `created_at` | Kdy (ISO 8601)                               |

Správci mohou dotazovat úplnou auditní stopu prostřednictvím `GET /api/gamification/anomalies`.

---

## Trasy API

Všechny trasy používají standardní vzor OmniRoute:

```
Trasa → Předběžný požadavek CORS → Ověření těla požadavku (Zod) → Autentizace (extractApiKey)
  → Obslužná rutina
```

### Koncové body

| Metoda | Cesta                                      | Popis                                              | Autentizace |
| ------ | ------------------------------------------ | -------------------------------------------------- | ----------- |
| GET    | `/api/gamification/leaderboard`            | Získání žebříčku (rozsah, období, stránkování)     | Volitelná   |
| POST   | `/api/gamification/leaderboard`            | Vynucení aktualizace mezipaměti žebříčku           | Povinná     |
| GET    | `/api/gamification/stream`                 | Aktualizace žebříčku v reálném čase pomocí SSE     | Volitelná   |
| GET    | `/api/gamification/transfer`               | Získání historie převodů (stránkování)             | Povinná     |
| POST   | `/api/gamification/transfer`               | Odeslání tokenů jinému uživateli                   | Povinná     |
| GET    | `/api/gamification/invite`                 | Výpis mých zvacích kódů                            | Povinná     |
| POST   | `/api/gamification/invite`                 | Vygenerování nového zvacího kódu                   | Povinná     |
| DELETE | `/api/gamification/invite`                 | Zrušení zvacího kódu                               | Povinná     |
| POST   | `/api/gamification/invite/redeem`          | Uplatnění zvacího kódu                             | Povinná     |
| GET    | `/api/gamification/servers`                | Výpis komunitních serverů                          | Povinná     |
| POST   | `/api/gamification/servers`                | Připojení ke komunitnímu serveru                   | Povinná     |
| DELETE | `/api/gamification/servers`                | Odpojení od komunitního serveru                    | Povinná     |
| POST   | `/api/gamification/federation/score`       | Odeslání skóre na vzdálený server                  | Federace    |
| GET    | `/api/gamification/federation/leaderboard` | Načtení žebříčku ze vzdáleného serveru             | Federace    |
| GET    | `/api/gamification/notifications`          | Oznámení SSE o odznacích a postupu na další úroveň | Povinná     |
| GET    | `/api/gamification/anomalies`              | Zobrazení hlášení anomálií (správce)               | Správce     |
| POST   | `/api/gamification/rotate`                 | Rotace tajných klíčů zvacích tokenů                | Povinná     |

### Příklady požadavků a odpovědí

**POST /api/gamification/transfer**

```json
// Požadavek
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// Odpověď 200
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

// Odpověď 400 (nedostatek prostředků)
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

Registrovány v `open-sse/mcp-server/` společně se stávajícími nástroji. Omezeny na
rozsah oprávnění `gamification`.

| Nástroj                    | Popis                                          | Vstupní schéma               |           |
| -------------------------- | ---------------------------------------------- | ---------------------------- | --------- |
| `gamification_leaderboard` | Získá žebříček pro rozsah/období               | `{ scope, period?, limit? }` |
| `gamification_rank`        | Získá pořadí volajícího a jeho sousedy         | `{ scope }`                  |
| `gamification_profile`     | Získá souhrn XP, úrovně, titulu a série        | `{}`                         |
| `gamification_badges`      | Vypíše získané odznaky nebo všechny definice   | `{ earned?: boolean }`       |
| `gamification_transfer`    | Odešle tokeny jinému uživateli                 | `{ to, amount }`             |
| `gamification_invite`      | Vygeneruje nebo vypíše pozvánkové kódy         | `{ action: "create"          | "list" }` |
| `gamification_servers`     | Vypíše komunitní servery nebo se k nim připojí | `{ action, token? }`         |
| `gamification_anomalies`   | Zobrazí hlášení anomálií (rozsah správce)      | `{ limit?, since? }`         |

---

## Stránky řídicího panelu

### `/dashboard/leaderboard`

- Zobrazení stupňů vítězů (3 nejlepší s avatary a XP).
- Výběr rozsahu: Globální / Týdenní / Měsíční / Sdílené tokeny / Příspěvky.
- Stránkovaná tabulka (25 položek na stránku) s pořadím, jménem, skóre, úrovní a titulem.
- Aktualizace v reálném čase přes SSE — změny pořadí jsou animované.
- Aktuální uživatel je v tabulce zvýrazněn pomocí připnutého řádku „Vaše pořadí“.

### `/dashboard/profile`

- Ukazatel postupu XP s aktuální úrovní a hranicí další úrovně.
- Odznak titulu je zobrazen na výrazném místě.
- Galerie odznaků — získané odznaky s datem získání, nezískané odznaky jsou zobrazeny šedě
  (skryté odznaky zobrazují „???“, dokud nejsou získány).
- Počítadlo série s ikonou plamene; kalendář série (posledních 30 dní).
- Graf historie XP (denní XP za posledních 30 dní).

### `/dashboard/tokens`

- Zůstatek tokenů (výrazně, v horní části stránky).
- Formulář převodu: příjemce, částka, potvrzovací dialog.
- Tabulka historie převodů s filtry (odeslané/přijaté/všechny).
- Sekce pozvánek: aktivní kódy, vygenerování nového, odkaz ke sdílení.
- Komunitní servery: seznam se stavem dostupnosti, připojení/odpojení.

### `/dashboard/gamification/admin`

- Seznam anomálií se závažností, uživatelem, časovým razítkem a z-skóre.
- Prohlížeč auditního protokolu s filtry (typ akce, uživatel, rozsah dat).
- Systémové statistiky: celkový počet udělených XP, aktivní uživatelé, míry získávání odznaků.
- Přehled stavu federačních serverů.

---

## Integrace do zpracovatelského řetězce

### Bod integrace

Gamifikace se zapojuje do řetězce zpracování požadavků v jediném bodě v souboru
`open-sse/handlers/chatCore.ts`:

```typescript
// Po odeslání odpovědi klientovi:
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
    // Spustit a dále nečekat: zaznamenat, ale nikdy nepřenášet klientovi
  });
});
```

### Typy událostí

| Typ události        | Kdy je vyvolána                                              |
| ------------------- | ------------------------------------------------------------ |
| `request.completed` | Úspěšná odpověď LLM byla odeslána                            |
| `provider.switch`   | Poskytovatel byl změněn (počítá se i záložní varianta komba) |
| `combo.created`     | Nová konfigurace komba byla uložena                          |
| `combo.used`        | Cíl komba byl úspěšně zasažen                                |
| `badge.earned`      | Vyhodnocení odznaku našlo shodu                              |
| `streak.milestone`  | Byla překročena hranice série                                |
| `transfer.sent`     | Převod tokenů byl dokončen                                   |
| `referral.redeemed` | Pozvánkový kód byl úspěšně uplatněn                          |
| `compression.used`  | Byla použita komprese promptu                                |
| `skill.executed`    | Spuštění dovednosti bylo dokončeno                           |
| `model.first_use`   | Model nebyl během posledních 7 dní použit                    |

### Záruka neblokujícího zpracování

Vzor `setImmediate` + `.catch(() => {})` zajišťuje:

1. Odpověď je před spuštěním gamifikace zcela odeslána.
2. Chyby gamifikace se klientovi nikdy nezobrazí.
3. Zpracování události proběhne v další mikroúloze, nikoli přímo.

## Zabezpečení

### Model hrozeb

| Hrozba                      | Zmírnění                                                              |
| --------------------------- | --------------------------------------------------------------------- |
| Umělé navyšování skóre      | Výpočet XP pouze na serveru; klienti odesílají akce, nikoli skóre     |
| Útoky opakováním            | Klíče idempotence u převodů; deduplikace protokolu auditu             |
| Podvody při převodech       | Podvojné účetnictví; atomické transakce; omezení četnosti požadavků   |
| Doporučení sebe sama        | Křížová kontrola `api_key_id` při uplatnění                           |
| Manipulace žebříčku         | Detekce anomálií pomocí Z-skóre; administrátorský panel anomálií      |
| Krádež federačního tokenu   | Úložiště hashů SHA-256; nezpracovaný token se zobrazí pouze jednou    |
| Hrubá síla na zvací kódy    | Omezení četnosti na koncovém bodu pro uplatnění; entropie 8 znaků     |
| XSS v zobrazovaných jménech | Zobrazovaná jména jsou sanitizována; položky žebříčku jsou escapovány |
| Časovací útoky na hashe     | `crypto.timingSafeEqual` pro porovnání hashů tokenů                   |

### Požadavky na ověřování

- **Veřejné** (bez ověřování): `GET /leaderboard`, `GET /stream` (žebříčky
  pouze pro čtení).
- **Vyžadován klíč API**: všechny operace zápisu, profil, převody, pozvánky.
- **Pouze správce**: panel anomálií, prohlížeč protokolu auditu.
- **Federace**: samostatná cesta ověřování používající nezpracovaný token v
  hlavičce `Authorization`, ověřovaný vůči uloženému hashi SHA-256.

---

## Testování

### Testovací soubory

Všechny testy používají nativní spouštěč testů Node.js (`node --import tsx/esm --test`).

| Testovací soubor                              | Pokrývá                                         | Testy |
| --------------------------------------------- | ----------------------------------------------- | ----- |
| `tests/unit/gamification/xp.test.ts`          | Výpočet XP, křivku úrovní, tituly               | 8     |
| `tests/unit/gamification/badges.test.ts`      | Vyhodnocení kritérií odznaků, udělování         | 10    |
| `tests/unit/gamification/streaks.test.ts`     | Logiku sérií, milníky, okrajové případy         | 7     |
| `tests/unit/gamification/leaderboard.test.ts` | Výpočet pořadí, stránkování, rotaci             | 8     |
| `tests/unit/gamification/sharing.test.ts`     | Převody, zůstatek, idempotenci                  | 9     |
| `tests/unit/gamification/invites.test.ts`     | Vytvoření, uplatnění, vypršení, sebedoporučení  | 7     |
| `tests/unit/gamification/antiCheat.test.ts`   | Omezení četnosti, Z-skóre, protokolování auditu | 6     |
| `tests/unit/gamification/events.test.ts`      | Vyvolání událostí, fan-out, zpracování chyb     | 5     |

### Spouštění testů

```bash
# Všechny testy gamifikace
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# Jeden testovací soubor
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Požadavky na pokrytí

Podle `CONTRIBUTING.md` — všechny nové moduly musí mít:

- Pokrytí větví >= 80 %.
- Každou veřejnou funkci otestovanou alespoň jednou.
- Otestované chybové cesty (nedostatečný zůstatek, kódy s vypršenou platností, omezení četnosti).

---

## Struktura souborů

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # Všech 8 tabulek + indexy
      gamification.ts                  # Doménový modul CRUD
    gamification/
      xp.ts                           # Výpočet XP, křivka úrovní, tituly
      badges.ts                       # Definice odznaků, kritéria, vyhodnocování
      streaks.ts                      # Sledování denních sérií
      leaderboard.ts                  # Výpočet pořadí, SSE, rotace
      antiCheat.ts                    # Omezení frekvence, z-skóre, audit
      sharing.ts                      # Účetní kniha převodů tokenů
      invites.ts                      # Zvací/uplatňovací kódy
      servers.ts                      # Federace komunitních serverů
      events.ts                       # Emitor událostí (integrační bod)
      notifications.ts                # Proud oznámení SSE
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST žebříčku
        leaderboard/stream/route.ts   # Aktualizace v reálném čase přes SSE
        transfer/route.ts             # GET/POST převodů
        invite/route.ts               # GET/POST/DELETE zvacích kódů
        invite/redeem/route.ts        # POST uplatňovacího kódu
        servers/route.ts              # GET/POST/DELETE serverů
        federation/score/route.ts     # POST odeslání skóre
        federation/leaderboard/route.ts # GET načtení žebříčku
        notifications/route.ts        # Oznámení přes SSE
        anomalies/route.ts            # GET hlášení anomálií
        rotate/route.ts               # POST rotace tajných klíčů
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Stránka pořadí
        profile/page.tsx               # Stránka XP/odznaků/sérií
        tokens/page.tsx                # Stránka zůstatku/převodů/pozvánek
        gamification/admin/page.tsx    # Administrátorské monitorování anomálií
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

## Strategie migrace

### Fáze 1: Jádro backendu (PR 1)

- Migrace `060_create_gamification.sql` (8 tabulek).
- `src/lib/db/gamification.ts` (doménový modul).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- Integrační bod v `chatCore.ts`.
- Jednotkové testy pro XP, série a události.

### Fáze 2: Odznaky a žebříček (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Definice odznaků v konstantách.
- Trasy API žebříčku + proud SSE.
- Jednotkové testy pro odznaky a žebříček.

### Fáze 3: Sdílení a pozvánky (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- Trasy API pro převody a pozvánky.
- Jednotkové testy pro sdílení, pozvánky a ochranu proti podvádění.

### Fáze 4: Federace a ovládací panel (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- Trasy federačního API.
- Stránky ovládacího panelu (žebříček, profil, tokeny, administrace).
- Registrace nástrojů MCP.

---

## Budoucí možnosti

- **Sezónní události**: časově omezené sady odznaků a sezóny žebříčků.
- **Týmové žebříčky**: seskupení uživatelů podle organizace nebo komba.
- **Násobitele XP**: navýšení XP během propagačních období.
- **Sdílení úspěchů**: generování sdílitelných karet s odznaky (obrázky OpenGraph).
- **Mobilní push notifikace**: upozornění založená na webhooku pro události odznaků/úrovní.
- **API žebříčku**: veřejné API pro integrace třetích stran.
