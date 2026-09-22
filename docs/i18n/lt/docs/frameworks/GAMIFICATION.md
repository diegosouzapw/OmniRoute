# Gamification & Leaderboard System (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **Tiesos šaltinis:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Paskutinį kartą atnaujinta:** 2026-06-28 — v3.8.40

OmniRoute apima pirmiausia vietinį žaidybinimo sluoksnį, kuris apdovanoja naudotojus už
naudojimąsi platforma — užklausų teikimą, paslaugų teikėjų keitimą, derinių kūrimą,
žetonų dalijimąsi ir indėlį į bendruomenę. Visa būsena saugoma
SQLite; federacija su bendruomenės serveriais yra pasirenkama ir pagrįsta duomenų siuntimu.

Sistema sukurta taip, kad **kritiniame vykdymo kelyje nebūtų delsos** — žaidybinimo
įvykiai iš užklausų apdorojimo sekos perduodami asinchroniškai, nelaukiant rezultato, ir niekada neblokuoja
LLM atsako.

---

## Apžvalga

### Paskirtis

Didinti naudotojų įsitraukimą ir išlaikymą suteikiant matomą pažangą (XP,
lygius, ženklelius), socialinį patvirtinimą (lyderių lenteles) ir ekonomines paskatas (žetonų
dalijimąsi, apdovanojimus už pakvietimus).

### Apimtis

| Funkcija                         | Aprašymas                                                                               |
| -------------------------------- | --------------------------------------------------------------------------------------- |
| XP ir lygiai                     | XP gaunami už kiekvieną veiksmą; lygiai keliami pagal polinominę kreivę                 |
| Ženkleliai                       | Daugiau nei 20 pasiekimų 5 kategorijose su 4 retumo pakopomis                           |
| Aktyvumo serijos                 | Kasdienio aktyvaus naudojimo stebėjimas, fiksuojant esamą ir ilgiausią seriją           |
| Lyderių lentelės                 | Bendroji, savaitinė, mėnesinė, žetonų dalijimosi ir indėlio sritys                      |
| Žetonų dalijimasis               | Kreditų pervedimas tarp naudotojų naudojant dvejybinio įrašo apskaitą                   |
| Pakvietimas ir kodų panaudojimas | Rekomendacijų kodai, saugomi kaip SHA-256 maišos reikšmės                               |
| Bendruomenės serveriai           | Federacija su išoriniais OmniRoute egzemplioriais                                       |
| Apsauga nuo sukčiavimo           | Vertinimas serverio pusėje, užklausų dažnio ribojimas, anomalijų aptikimas pagal z balą |

### Projektavimo principai

1. **Pirmiausia vietinis veikimas** — visa būsena saugoma SQLite, išorinės paslaugos nereikalingos.
2. **Neblokuojantis veikimas** — įvykiai perduodami asinchroniškai, nelaukiant rezultato; LLM atsako kelias
   niekada nevėlinamas dėl žaidybinimo logikos.
3. **Serveris yra autoritetingas** — XP apskaičiuojami tik serverio pusėje; klientai negali
   dirbtinai padidinti rezultatų.
4. **Privatumo užtikrinimas** — dalyvavimas lyderių lentelėje yra pasirenkamas; naudotojai gali
   paslėpti savo profilį.
5. **Parengta federacijai** — bendruomenės serveriai gali siųsti rezultatus per pasirašytą API;
   sinchronizuojant duomenys perrašomi, o ne sumuojami.

---

## Architektūra

### Aukšto lygio eiga

```
Kliento užklausa
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (esama apdorojimo seka) ...
      → ankstesnės sistemos atsakas išsiunčiamas klientui
      → setImmediate (asinchroniškai, nelaukiant rezultato):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

Įvykių skleidiklis yra vienintelis integravimo taškas. `chatCore.ts` iškviečia
`emitGamificationEvent()` po to, kai išsiunčiamas atsakas; įvykių modulis paskirsto įvykį
XP, aktyvumo serijų, ženklelių, lyderių lentelės ir apsaugos nuo sukčiavimo posistemėms.

### Modulių priklausomybių grafas

```
src/lib/gamification/
  events.ts          ← įėjimo taškas (iškviečiamas iš chatCore.ts)
    ├── xp.ts        ← XP skaičiavimas ir lygio nustatymas
    ├── streaks.ts   ← kasdienio aktyvumo serijų stebėjimas
    ├── badges.ts    ← ženklelių kriterijų įvertinimas
    ├── leaderboard.ts ← reitingų skaičiavimas ir SSE transliavimas
    ├── antiCheat.ts ← užklausų dažnio ribojimas ir anomalijų aptikimas
    ├── sharing.ts   ← žetonų pervedimų apskaita
    ├── invites.ts   ← pakvietimų ir panaudojimo kodų valdymas
    ├── servers.ts   ← bendruomenės serverių federacija
    └── notifications.ts ← SSE pranešimų srautas

src/lib/db/
  gamification.ts    ← visos CRUD operacijos (8 lentelės)

src/app/api/gamification/
  leaderboard/       ← GET reitingai, POST rankinis atnaujinimas
  leaderboard/stream ← SSE atnaujinimai realiuoju laiku
  transfer/          ← GET istorija, POST žetonų siuntimas
  invite/            ← GET/POST kodai, DELETE atšaukimas
  invite/redeem/     ← POST kodo panaudojimas
  servers/           ← GET/POST/DELETE bendruomenės serveriai
  federation/score/  ← POST rezultato siuntimas į serverį
  federation/leaderboard/ ← GET lyderių lentelės gavimas iš serverio
  notifications/     ← SSE pranešimai apie ženklelius ir lygio pakėlimą
  anomalies/         ← GET anomalijų ataskaitos (administratoriams)
  rotate/            ← POST pakvietimų prieigos raktų paslapčių keitimas
```

---

## Duomenų sluoksnis

### Duomenų bazės lentelės

Visos lentelės yra pagrindinėje „OmniRoute“ SQLite duomenų bazėje, sukurtoje naudojant migraciją
`060_create_gamification.sql`. WAL žurnalų rašymas paveldimas iš vienetinio egzemplioriaus
`getDbInstance()`, esančio `src/lib/db/core.ts`.

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

### Domeno modulis: `src/lib/db/gamification.ts`

Atitinka standartinį „OmniRoute“ šabloną — importuoja `getDbInstance()` iš
`core.ts` ir eksportuoja tipizuotas CRUD funkcijas. Maršrutų apdorojimo funkcijose nėra neapdorotų SQL užklausų.

Pagrindinės funkcijos:

| Funkcija                   | Aprašymas                                                           |
| -------------------------- | ------------------------------------------------------------------- |
| `upsertLeaderboardEntry()` | Įterpia arba atnaujina (api_key_id, scope, period) balą             |
| `getLeaderboard()`         | Puslapiais suskirstytas nurodytos apimties ir laikotarpio reitingas |
| `getUserLevel()`           | Gauna arba sukuria naudotojo lygio įrašą                            |
| `updateUserLevel()`        | Atomiškai nustato XP, lygį ir titulą                                |
| `getBadgeDefinitions()`    | Visi ženklelių aprašai (pasirinktinai filtruojami)                  |
| `getUserBadges()`          | Naudotojo pelnyti ženkleliai                                        |
| `awardBadge()`             | Įterpia ženklelio pelnymo įrašą (idempotentiškai pagal badge_id)    |
| `logXpAction()`            | Prideda įrašą prie xp_audit_log                                     |
| `getXpAuditLog()`          | Puslapiais suskirstyta naudotojo audito istorija                    |
| `insertLedgerEntry()`      | Dvigubo įrašo pervedimas (transakcijoje)                            |
| `getBalance()`             | Apskaičiuoja naudotojo gautų ir išsiųstų sumų skirtumą              |
| `getTransferHistory()`     | Puslapiais suskirstytas pervedimų žurnalas                          |
| `createInviteToken()`      | Įterpia kvietimo kodą ir maišos reikšme užkoduotą prieigos raktą    |
| `redeemInviteToken()`      | Ieško pagal kodą, patikrina ir padidina panaudojimų skaičių         |
| `upsertCommunityServer()`  | Užregistruoja arba atnaujina federacijos serverį                    |
| `getCommunityServers()`    | Pateikia naudotojo serverių sąrašą                                  |
| `deleteCommunityServer()`  | Pašalina serverio registraciją                                      |

---

## XP / lygių sistema

**Failas:** `src/lib/gamification/xp.ts`

### Lygių kreivė

XP kiekis, reikalingas `n` lygiui pasiekti, apskaičiuojamas pagal polinominę kreivę:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Lygis | XP iki kito lygio | Sukaupta XP | Titulas       |
| ----- | ----------------- | ----------- | ------------- |
| 1     | 100               | 100         | Pradedantysis |
| 5     | 1,118             | 2,415       | Pradedantysis |
| 10    | 3,162             | 10,523      | Tyrinėtojas   |
| 25    | 12,500            | 86,024      | Tyrinėtojas   |
| 50    | 35,355            | 345,529     | Ekspertas     |
| 75    | 64,952            | 948,683     | Meistras      |
| 100   | 100,000           | 2,050,000   | Legenda       |

### Titulai

| Lygių intervalas | Titulas       |
| ---------------- | ------------- |
| 1 – 9            | Pradedantysis |
| 10 – 24          | Tyrinėtojas   |
| 25 – 49          | Ekspertas     |
| 50 – 74          | Meistras      |
| 75 – 100         | Legenda       |

### XP apdovanojimai

| Veiksmas          | XP  | Aprašymas                                                                 |
| ----------------- | --- | ------------------------------------------------------------------------- |
| `request`         | 1   | Už kiekvieną per OmniRoute nukreiptą API užklausą                         |
| `provider_switch` | 5   | Už perjungimą į kitą teikėją                                              |
| `model_switch`    | 3   | Už perjungimą į kitą modelį                                               |
| `combo_create`    | 10  | Už naujo derinio sukūrimą                                                 |
| `combo_use`       | 2   | Už derinio naudojimą užklausai                                            |
| `token_share`     | 1   | Už kiekvieną 1 000 su kitu naudotoju bendrinamų žetonų                    |
| `invite_redeem`   | 50  | Už kvietimo kodo panaudojimą                                              |
| `daily_login`     | 5   | Už kasdienį aktyvų naudojimą (kartą per dieną)                            |
| `streak_bonus`    | 2   | Už kiekvieną nepertraukiamos serijos dieną (dauginama iš serijos trukmės) |
| `badge_unlock`    | 10  | Už ženklelio atrakinimą                                                   |

### Apdovanojimo eiga

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. Rasti `XP_REWARDS[action]`, kad būtų gautas XP kiekis.
2. Perduoti per `checkRateLimit()` (apsauga nuo sukčiavimo: daugiausia 1000 XP/min. vienam raktui).
3. Pradėti operaciją:
   - Nuskaityti dabartinį `user_levels` įrašą.
   - Pridėti XP; perskaičiuoti lygį naudojant `levelFromXp(totalXp)`.
   - Jei lygis pasikeitė, nustatyti `levelUp = true`.
   - Atnaujinti `user_levels` įrašą.
   - Įterpti į `xp_audit_log`.
4. Grąžinti rezultatą. Kvietėjas apdoroja pranešimus.

### Pagalbinė funkcija: `levelFromXp(totalXp)`

Pereina per lygius nuo 1 iki 100, sumuodama `xp_for_level(n)`, kol sukauptas XP
viršija `totalXp`. Grąžina aukščiausią lygį, kurio slenkstis pasiektas.
Sudėtingumas yra O(100) — tai priimtina, nes didžiausias lygis yra 100.

---

## Ženklelių sistema

**Failas:** `src/lib/gamification/badges.ts`

### Kategorijos

| Kategorija     | Aprašymas                                | Ženklelių pavyzdžiai                            |
| -------------- | ---------------------------------------- | ----------------------------------------------- |
| `usage`        | Naudojimo apimtimi pagrįsti etapai       | Pirmoji užklausa, 1 tūkst. užklausų, 100 tūkst. |
| `sharing`      | Žetonų bendrinimas ir rekomendacijos     | Pirmasis bendrinimas, Dosnusis (10 bendrinimų)  |
| `contribution` | Įsitraukimas į bendruomenę               | Derinių kūrėjas, Teikėjų tyrinėtojas            |
| `streak`       | Nuoseklumas bėgant laikui                | Savaitės karys, Atsidavęs mėnesio dalyvis       |
| `rare`         | Sunkiai gaunami arba paslėpti pasiekimai | Ankstyvasis naudotojas, Klaidų pranešėjas       |

### Retumo lygiai

| Retumas     | Spalva  | Tikimybės užuomina  |
| ----------- | ------- | ------------------- |
| `common`    | Pilka   | Dauguma naudotojų   |
| `uncommon`  | Žalia   | Aktyvūs naudotojai  |
| `rare`      | Mėlyna  | Atsidavę naudotojai |
| `legendary` | Auksinė | Geriausias 1 %      |

### Kriterijų tipai

| Tipas          | Laukas       | Aprašymas                                                |
| -------------- | ------------ | -------------------------------------------------------- |
| `action_count` | `count`      | Atlikti veiksmą N kartų (pvz., 1000 užklausų)            |
| `streak`       | `days`       | Išlaikyti seriją N dienų iš eilės                        |
| `unique_count` | `field`, `n` | Naudoti N unikalių reikšmių (pvz., 10 skirtingų modelių) |
| `rank`         | `scope`, `n` | Pasiekti N vietą nurodytos apimties lyderių lentelėje    |
| `first`        | —            | Pirmajam atlikti veiksmą                                 |
| `hidden`       | (įvairūs)    | Kriterijai nerodomi, kol ženklelis neuždirbtas           |

Ženklelių apibrėžtys saugomos `badge_definitions` kaip JSON `criteria`:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Vertinimo eiga

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # visos apibrėžtys
    → getUserBadges(apiKeyId)         # jau uždirbti (praleisti)
    → kiekvienam neuždirbtam ženkleliui:
       → matchesCriteria(badge, event, userState)
       → jei atitinka: awardBadge(apiKeyId, badgeId)
         → grąžinti pranešimo duomenis
```

Vertinimas yra **pagrįstas įvykiais** — jis vykdomas po kiekvieno žaidybinimo įvykio, tačiau
tikrina tik tuos ženklelius, kurių `criteria.type` atitinka įvykio veiksmą. Taip
vertinimas išlieka greitas (< 5 ms daugumai įvykių).

### `matchesCriteria(badge, event, userState)`

| Kriterijaus tipas | Patikra                                               |
| ----------------- | ----------------------------------------------------- |
| `action_count`    | `getActionCount(apiKeyId, action) >= count`           |
| `streak`          | `getCurrentStreak(apiKeyId) >= days`                  |
| `unique_count`    | `getUniqueCount(apiKeyId, field) >= n`                |
| `rank`            | `getRank(apiKeyId, scope) <= n`                       |
| `first`           | Nėra ankstesnio šio veiksmo tipo `xp_audit_log` įrašo |
| `hidden`          | Perduoda atitinkamai papildomai patikrai              |

### Integruoti ženkleliai (20+)

<details>
<summary>Visas ženklelių sąrašas</summary>

| Ženklelis               | Kategorija  | Retumas    | Kriterijai                     |
| ----------------------- | ----------- | ---------- | ------------------------------ |
| Pirmieji žingsniai      | naudojimas  | dažnas     | 1 užklausa                     |
| Apšilimas               | naudojimas  | dažnas     | 100 užklausų                   |
| Patyręs naudotojas      | naudojimas  | nedažnas   | 1,000 užklausų                 |
| Šimtininkas             | naudojimas  | retas      | 10,000 užklausų                |
| Visagalis               | naudojimas  | legendinis | 100,000 užklausų               |
| Teikėjų keitėjas        | indėlis     | dažnas     | Naudoti 5 skirtingus teikėjus  |
| Teikėjų meistras        | indėlis     | nedažnas   | Naudoti 20 skirtingų teikėjų   |
| Derinių architektas     | indėlis     | nedažnas   | Sukurti 5 derinius             |
| Derinių didmeistris     | indėlis     | retas      | Sukurti 25 derinius            |
| Pirmasis pasidalijimas  | dalijimasis | dažnas     | 1 žetonų pervedimas            |
| Dosnusis                | dalijimasis | nedažnas   | 10 žetonų pervedimų            |
| Filantropas             | dalijimasis | retas      | Iš viso pervesti 10,000 žetonų |
| Rekomenduotojas         | dalijimasis | dažnas     | 1 sėkminga rekomendacija       |
| Tinklo kūrėjas          | dalijimasis | nedažnas   | 10 sėkmingų rekomendacijų      |
| Savaitės karys          | serija      | nedažnas   | 7 dienų serija                 |
| Mėnesio ištikimasis     | serija      | retas      | 30 dienų serija                |
| Nesustabdomasis         | serija      | legendinis | 365 dienų serija               |
| Ankstyvasis naudotojas  | retas       | legendinis | Prisijungti beta laikotarpiu   |
| Glaudinimo pradininkas  | retas       | nedažnas   | Naudoti glaudinimą 100 kartų   |
| Įgūdžių kolekcionierius | retas       | retas      | Naudoti 10 skirtingų įgūdžių   |
| Modelių tyrinėtojas     | indėlis     | nedažnas   | Naudoti 15 skirtingų modelių   |

</details>

---

## Serijų stebėjimas

**Failas:** `src/lib/gamification/streaks.ts`

### Duomenų modelis

Serijos saugomos lentelėje `key_value` (bendro naudojimo pagalbinėje lentelėje), naudojant
vardų sritimis suskirstytus raktus:

| Raktas                        | Reikšmė                          | Aprašymas                 |
| ----------------------------- | -------------------------------- | ------------------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Aktyvios serijos duomenys |

### Logika

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Nuskaityti serijos įrašą iš `key_value`.
2. Išanalizuoti `{current}`, `{longest}`, `{lastDate}` (ISO datos eilutę).
3. Jei `lastDate === today` — nieko nekeisti (šiandien jau įskaityta).
4. Jei `lastDate === yesterday` — padidinti `current`; prireikus atnaujinti `longest`.
5. Jei `lastDate < yesterday` — nustatyti `current = 1` iš naujo (serija nutrūko).
6. Įrašyti atnaujintą įrašą.
7. Patikrinti etapus: 7, 14, 30, 60, 90, 180, 365 dienos. Jei etapas pasiektas,
   nustatyti `milestone = true` (kvietėjas skiria XP ir tikrina ženklelius).

### Kraštiniai atvejai

- **Laiko juosta**: serijoms naudojamos UTC datos (`new Date().toISOString().slice(0, 10)`).
  Tai daroma sąmoningai — viena kanoninė laiko juosta neleidžia sukčiauti
  keičiant laiko juostas.
- **Nauji naudotojai**: serijos įrašo nėra; pirmoji užklausa jį sukuria su
  `current=1, longest=1, lastDate=today`.
- **Kelios užklausos per dieną**: seriją padidina tik pirmoji UTC dienos
  užklausa.

---

## Lyderių lentelė

**Failas:** `src/lib/gamification/leaderboard.ts`

### Aprėptys

| Aprėptis        | Laikotarpis | Aprašymas                                              |
| --------------- | ----------- | ------------------------------------------------------ |
| `global`        | `all`       | Visų laikų sukaupti XP                                 |
| `weekly`        | `week`      | Per dabartinę UTC savaitę (Pr–Sk) gauti XP             |
| `monthly`       | `month`     | Per dabartinį UTC mėnesį gauti XP                      |
| `tokens_shared` | `all`       | Bendras kitiems perduotų žetonų skaičius               |
| `contributions` | `all`       | Sukurti deriniai + naudoti teikėjai + naudoti įgūdžiai |

### Vietos apskaičiavimas

Vietos **apskaičiuojamos skaitymo metu**, o ne saugomos. Taip išvengiama pasenusių vietų duomenų
ir nebereikia periodinių vietų perskaičiavimo užduočių.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

Užklausos šablonas:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### Laikotarpių keitimas

Savaitinės ir mėnesinės lyderių lentelės keičiamos automatiškai:

1. **Archyvavimas**: pasibaigus laikotarpiui, dabartinius įrašus nukopijuoti į
   `leaderboard_archive` su laikotarpio žyma.
2. **Nustatymas iš naujo**: pašalinti pasibaigusio laikotarpio įrašus.
3. **Aktyvinimas**: tikrinama per kiekvieną `updateLeaderboard()` iškvietimą; pirmoji naujo
   laikotarpio užklausa aktyvina keitimą.

Taip užtikrinama, kad savaitinės lentelės būtų nustatomos iš naujo kiekvieną pirmadienį 00:00 UTC, o mėnesinės —
kiekvieno mėnesio 1 dieną.

### SSE atnaujinimai realiuoju laiku

**Galinis taškas:** `GET /api/gamification/stream`

```
Klientas → GET /api/gamification/stream
  → Užmezgamas SSE ryšys
  → Serveris iš karto išsiunčia 10 geriausių lyderių lentelės momentinę kopiją
  → Kas 5 sekundes: jei pasikeitė, siunčiamas atnaujintas 10 geriausių sąrašas
  → Kas 15 sekundžių: aktyvumo komentaras (": heartbeat\n\n")
  → Klientas atsijungia → išvalymas (pašalinamas klausytojas)
```

Įvykio formatas:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

SSE tvarkytuvė seka prijungtus kiekvienos aprėpties klientus ir siunčia atnaujinimus tik tada,
kai lyderių lentelės duomenys iš tikrųjų pasikeitė nuo paskutinio išsiuntimo.

---

## Žetonų bendrinimas

**Failas:** `src/lib/gamification/sharing.ts`

### Dvejybinio įrašo apskaita

Kiekvienas pervedimas sukuria dvi eilutes lentelėje `token_ledger`:

| Eilutė   | `from_key_id` | `to_key_id` | `amount` |
| -------- | ------------- | ----------- | -------- |
| Debetas  | siuntėjas     | gavėjas     | +suma    |
| Kreditas | gavėjas       | siuntėjas   | -suma    |

Palaukite — naudojamas toks susitarimas:

| Eilutė    | `from_key_id` | `to_key_id` | `amount` | Reikšmė                   |
| --------- | ------------- | ----------- | -------- | ------------------------- |
| Siuntimas | siuntėjas     | gavėjas     | +suma    | Lėšų išėjimas iš siuntėjo |
| Gavimas   | gavėjas       | siuntėjas   | +suma    | Lėšų įėjimas gavėjui      |

Likutis apskaičiuojamas taip:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Pervedimo eiga

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Patikrinimas**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **Idempotentiškumas**: patikrinama, ar `idempotency_key` jau yra apskaitos žurnale.
   Jei taip, grąžinamas podėlyje išsaugotas rezultatas.
3. **Operacija** (viena SQLite operacija):
   a. Apskaičiuojamas siuntėjo likutis.
   b. Jei `balance < amount`, operacija nutraukiama (nepakanka lėšų).
   c. Įterpiama siuntimo eilutė (`from=sender,`.

### Dažnio ribojimas

- Daugiausia 10 pervedimų per minutę vienam API raktui.
- Daugiausia 10 000 žetonų vienu pervedimu.
- Daugiausia 100 000 per dieną pervedamų žetonų vienam API raktui.

---

## Kvietimų ir žetonų panaudojimas

**Failas:** `src/lib/gamification/invites.ts`

### Kodo formatas

- **Kodas**: 8 simbolių raidinis-skaitinis kodas (pvz., `A3K9-X7M2`), lengvai perskaitomas,
  rodomas naudotojui.
- **Žetonas**: atsitiktinis 32 baitų žetonas, saugomas kaip SHA-256 maiša. Naudojamas
  programiniam panaudojimui (pvz., URL nuorodose).

### Saugojimas

| Stulpelis    | Reikšmė                            |
| ------------ | ---------------------------------- |
| `code`       | `A3K9X7M2` (unikalus, indeksuotas) |
| `token_hash` | SHA-256(raw_token)                 |

Neapdorotas žetonas naudotojui grąžinamas tik vieną kartą, jį sukuriant. OmniRoute
daugiau niekada jo nesaugo ir nerodo — išlieka tik maiša.

### Kvietimo sau prevencija

Kai naudotojas panaudoja kodą, sistema patikrina:

1. Kodas priklauso kitam `api_key_id`.
2. Kodą panaudojantis naudotojas anksčiau nėra panaudojęs jokio to paties
   kvietėjo kodo (sujungiamos `invite_tokens` ir panaudojimų žurnalo lentelės).

Jei kuris nors patikrinimas nepavyksta, panaudojimas atmetamas pateikiant aiškų klaidos pranešimą.

### Galiojimas ir apribojimai

- Numatytoji `max_uses` reikšmė: 10 (konfigūruojama kuriant).
- Numatytoji `expires_at` reikšmė: 30 dienų nuo sukūrimo.
- Pasibaigusio galiojimo arba išnaudoti kodai grąžina HTTP 410 Gone.

---

## Bendruomenės serverių federacija

**Failas:** `src/lib/gamification/servers.ts`

### Prisijungimas

Bendruomenės serveris užregistruojamas naudojant nuotolinio serverio išduotą kvietimo prieigos raktą. Vietinis egzempliorius:

1. Gauna kvietimo prieigos raktą (pvz., įklijuotą valdymo skydelyje).
2. Iškviečia `POST /api/gamification/federation/leaderboard` nuotoliniame serveryje, kad patikrintų prieigos raktą ir gautų esamą lyderių lentelę.
3. Išsaugo serverio įrašą su `status: connected`.

### Sinchronizavimo modelis

Federacija naudoja **perrašomąjį sinchronizavimą**, o ne papildomąjį:

```
Vietinis egzempliorius          Bendruomenės serveris
     │                              │
     ├── siunčia rezultatą ────────►│  POST /federation/score
     │   { api_key_id, score }      │  (serveris patikrina prieigos rakto maišą)
     │                              │
     ├── gauna lyderių lentelę ────►│  GET /federation/leaderboard
     │◄── top-N įrašų ──────────────┤  (perrašo vietinę podėlio kopiją)
     │                              │
     └── būklės patikra ───────────►│  GET /federation/health
         (kas 60 s, skirtasis        │
          laikas – 5 s)             │
```

### Autentifikavimas

Federacijos užklausose pateikiama:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

Nuotolinis serveris apskaičiuoja prieigos rakto maišą ir suranda atitinkamą `community_servers` eilutę. Taip išvengiama išsaugoto maišo perdavimo.

### Būklės stebėjimas

Kiekviename serverio įraše stebima:

| Laukas      | Aprašas                                            |
| ----------- | -------------------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable`             |
| `last_sync` | Paskutinio sėkmingo sinchronizavimo ISO laiko žyma |
| `failures`  | Iš eilės nepavykusių būklės patikrų skaičius       |

Po 5 iš eilės nepavykusių patikrų būsena pakeičiama į `unreachable`, o sinchronizavimas pristabdomas, kol rankinė būklės patikra pavyksta.

---

## Apsauga nuo sukčiavimo

**Failas:** `src/lib/gamification/antiCheat.ts`

### Rezultatų skaičiavimas serveryje

Visi XP skaičiavimai atliekami faile `src/lib/gamification/xp.ts`. Klientai niekada nepateikia rezultato — jie pateikia veiksmus, o serveris apskaičiuoja XP. Į stulpelį `leaderboard.score` gali rašyti tik serverio kodas.

### Užklausų dažnio ribojimas

| Ribojimas                           | Reikšmė | Taikymo sritis    |
| ----------------------------------- | ------- | ----------------- |
| Didžiausias XP per minutę           | 1,000   | Vienam API raktui |
| Daugiausia pervedimų per min.       | 10      | Vienam API raktui |
| Didžiausia pervedimo suma           | 10,000  | Vienam pervedimui |
| Didžiausia pervedimų suma per dieną | 100,000 | Vienam API raktui |

Užklausų dažnio ribojimui naudojamas atmintyje laikomas slankusis langas (toks pats modelis kaip `RateLimitManager`, esantis `open-sse/services/`). Procesui paleidus iš naujo, naudojami SQLite pagrįsti skaitikliai.

### Anomalijų aptikimas pagal Z įvertį

Kiekvienam API raktui sistema palaiko slankųjį 7 dienų langą, kuriame fiksuojamas per valandą uždirbtas XP. Kiekvieną kartą skiriant XP:

1. Apskaičiuojamas dabartinis naudotojo XP gavimo per valandą rodiklis.
2. Apskaičiuojamas populiacijos vidurkis ir standartinis nuokrypis.
3. Apskaičiuojama `z = (user_rate - mean) / stddev`.
4. Jei `z > 3.0` (3 standartiniai nuokrypiai), įvykis pažymimas kaip anomalija.

Anomalijos registruojamos `xp_audit_log` su `action = 'anomaly_detected'` ir rodomos administratoriaus valdymo skydelyje.

### Audito seka

Kiekvienas XP skyrimas, pervedimas, ženklelio gavimas ir anomalijos aptikimas registruojamas `xp_audit_log`, nurodant:

| Laukas       | Aprašas                                       |
| ------------ | --------------------------------------------- |
| `api_key_id` | Kas                                           |
| `action`     | Kas įvyko (xp_award, transfer, anomaly, …)    |
| `xp_awarded` | Kiekis (0 ne XP įvykiams)                     |
| `metadata`   | JSON su kontekstu (veiksmo tipas, tikslas, …) |
| `created_at` | Kada (ISO 8601)                               |

Administratoriai gali gauti visą audito seką per `GET /api/gamification/anomalies`.

---

## API maršrutai

Visi maršrutai atitinka standartinį OmniRoute šabloną:

```
Maršrutas → CORS išankstinė patikra → Užklausos turinio validavimas (Zod) → Autentifikavimas (extractApiKey)
  → Apdorojimo funkcija
```

### Galiniai taškai

| Metodas | Kelias                                     | Aprašymas                                                        | Autentifikavimas |
| ------- | ------------------------------------------ | ---------------------------------------------------------------- | ---------------- |
| GET     | `/api/gamification/leaderboard`            | Gauti lyderių lentelę (sritis, laikotarpis, puslapių numeracija) | Neprivalomas     |
| POST    | `/api/gamification/leaderboard`            | Priverstinai atnaujinti lyderių lentelės podėlį                  | Privalomas       |
| GET     | `/api/gamification/stream`                 | Lyderių lentelės atnaujinimai realiuoju laiku per SSE            | Neprivalomas     |
| GET     | `/api/gamification/transfer`               | Gauti pervedimų istoriją (puslapių numeracija)                   | Privalomas       |
| POST    | `/api/gamification/transfer`               | Siųsti žetonus kitam naudotojui                                  | Privalomas       |
| GET     | `/api/gamification/invite`                 | Pateikti mano kvietimų kodų sąrašą                               | Privalomas       |
| POST    | `/api/gamification/invite`                 | Sugeneruoti naują kvietimo kodą                                  | Privalomas       |
| DELETE  | `/api/gamification/invite`                 | Atšaukti kvietimo kodą                                           | Privalomas       |
| POST    | `/api/gamification/invite/redeem`          | Panaudoti kvietimo kodą                                          | Privalomas       |
| GET     | `/api/gamification/servers`                | Pateikti bendruomenės serverių sąrašą                            | Privalomas       |
| POST    | `/api/gamification/servers`                | Prisijungti prie bendruomenės serverio                           | Privalomas       |
| DELETE  | `/api/gamification/servers`                | Atsijungti nuo bendruomenės serverio                             | Privalomas       |
| POST    | `/api/gamification/federation/score`       | Nusiųsti rezultatą į nuotolinį serverį                           | Federacija       |
| GET     | `/api/gamification/federation/leaderboard` | Gauti lyderių lentelę iš nuotolinio serverio                     | Federacija       |
| GET     | `/api/gamification/notifications`          | SSE ženklelių / lygio pakėlimo pranešimai                        | Privalomas       |
| GET     | `/api/gamification/anomalies`              | Peržiūrėti anomalijų ataskaitas (administratorius)               | Administratorius |
| POST    | `/api/gamification/rotate`                 | Keisti kvietimų prieigos raktų paslaptis                         | Privalomas       |

### Užklausų / atsakymų pavyzdžiai

**POST /api/gamification/transfer**

```json
// Užklausa
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// Atsakymas 200
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

// Atsakymas 400 (nepakanka lėšų)
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

## MCP įrankiai (8)

Užregistruoti `open-sse/mcp-server/` kartu su esamais įrankiais. Apriboti
`gamification` leidimų sritimi.

| Įrankis                    | Aprašymas                                                  | Įvesties schema              |           |
| -------------------------- | ---------------------------------------------------------- | ---------------------------- | --------- |
| `gamification_leaderboard` | Gauti srities / laikotarpio lyderių lentelę                | `{ scope, period?, limit? }` |
| `gamification_rank`        | Gauti kvietėjo vietą ir gretimas vietas                    | `{ scope }`                  |
| `gamification_profile`     | Gauti XP, lygio, titulo ir serijos suvestinę               | `{}`                         |
| `gamification_badges`      | Rodyti pelnytus ženklelius arba visas apibrėžtis           | `{ earned?: boolean }`       |
| `gamification_transfer`    | Siųsti žetonus kitam naudotojui                            | `{ to, amount }`             |
| `gamification_invite`      | Generuoti arba rodyti kvietimų kodus                       | `{ action: "create"          | "list" }` |
| `gamification_servers`     | Rodyti arba prijungti bendruomenės serverius               | `{ action, token? }`         |
| `gamification_anomalies`   | Peržiūrėti anomalijų ataskaitas (administratoriaus sritis) | `{ limit?, since? }`         |

---

## Valdymo skydelio puslapiai

### `/dashboard/leaderboard`

- Podiumo rodinys (3 geriausi su avatarais ir XP).
- Srities parinkiklis: pasaulinė / savaitinė / mėnesinė / bendrinti žetonai / indėliai.
- Puslapiais suskirstyta lentelė (po 25 puslapyje) su vieta, vardu, rezultatu, lygiu ir titulu.
- SSE naujiniai realiuoju laiku — vietų pokyčiai animuojami.
- Dabartinis naudotojas lentelėje paryškinamas prilipusia eilute „Jūsų vieta“.

### `/dashboard/profile`

- XP eigos juosta su dabartiniu lygiu ir kito lygio slenksčiu.
- Titulą žymintis ženklelis rodomas gerai matomoje vietoje.
- Ženklelių galerija — pelnyti ženkleliai su pelnymo data, nepelnyti ženkleliai rodomi pilkai
  (paslėptiems ženkleliams iki jų pelnymo rodoma „???“).
- Serijos skaitiklis su liepsnos piktograma; serijos kalendorius (pastarosios 30 dienų).
- XP istorijos diagrama (dienos XP per pastarąsias 30 dienų).

### `/dashboard/tokens`

- Žetonų likutis (gerai matomas puslapio viršuje).
- Pervedimo forma: gavėjas, suma, patvirtinimo dialogo langas.
- Pervedimų istorijos lentelė su filtrais (išsiųsti / gauti / visi).
- Kvietimų skiltis: aktyvūs kodai, naujo kodo generavimas, bendrinimo nuoroda.
- Bendruomenės serveriai: sąrašas su būklės būsena, prijungimas / atjungimas.

### `/dashboard/gamification/admin`

- Anomalijų sąrašas su svarbumu, naudotoju, laiko žyma ir z įverčiu.
- Audito žurnalo peržiūros priemonė su filtrais (veiksmo tipas, naudotojas, datų intervalas).
- Sistemos statistika: bendras suteiktų XP kiekis, aktyvūs naudotojai, ženklelių pelnymo rodikliai.
- Federacijos serverių būklės apžvalga.

---

## Integracija į apdorojimo seką

### Integravimo taškas

Žaidybinimo funkcijos prijungiamos prie užklausų apdorojimo sekos viename
`open-sse/handlers/chatCore.ts` taške:

```typescript
// Kai atsakymas išsiunčiamas klientui:
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
    // Paleidžiama ir pamirštama: registruoti žurnale, bet niekada neperduoti klientui
  });
});
```

### Įvykių tipai

| Įvykio tipas        | Kada sugeneruojamas                                           |
| ------------------- | ------------------------------------------------------------- |
| `request.completed` | Išsiuntus sėkmingą LLM atsakymą                               |
| `provider.switch`   | Pakeitus teikėją (įskaitomas atsarginio derinio panaudojimas) |
| `combo.created`     | Išsaugojus naują derinio konfigūraciją                        |
| `combo.used`        | Sėkmingai pasiekus derinio paskirties tašką                   |
| `badge.earned`      | Ženklelio vertinimui aptikus atitiktį                         |
| `streak.milestone`  | Peržengus serijos slenkstį                                    |
| `transfer.sent`     | Užbaigus žetonų pervedimą                                     |
| `referral.redeemed` | Sėkmingai panaudojus kvietimo kodą                            |
| `compression.used`  | Pritaikius užklausos glaudinimą                               |
| `skill.executed`    | Užbaigus gebėjimo vykdymą                                     |
| `model.first_use`   | Modelio nenaudojus pastarąsias 7 dienas                       |

### Neblokuojančio veikimo garantija

Šablonas `setImmediate` + `.catch(() => {})` užtikrina, kad:

1. Atsakymas visiškai išsiunčiamas prieš paleidžiant žaidybinimo funkcijas.
2. Žaidybinimo klaidos niekada neparodomos klientui.
3. Įvykis apdorojamas kitoje mikroužduotyje, o ne tame pačiame vykdymo sraute.

---

## Saugumas

### Grėsmių modelis

| Grėsmė                             | Rizikos mažinimo priemonė                                                                 |
| ---------------------------------- | ----------------------------------------------------------------------------------------- |
| Dirbtinis taškų didinimas          | XP skaičiuojami tik serverio pusėje; klientai pateikia veiksmus, o ne taškus              |
| Pakartojimo atakos                 | Perdavimams naudojami idempotentiškumo raktai; audito žurnalo dublikatų šalinimas         |
| Perdavimų sukčiavimas              | Dvejybinio įrašo apskaitos registras; atominės operacijos; dažnio apribojimai             |
| Savęs rekomendavimas               | Panaudojant pakvietimą atliekamas kryžminis `api_key_id` patikrinimas                     |
| Lyderių lentelės manipuliavimas    | Anomalijų aptikimas pagal Z įvertį; administratoriaus anomalijų skydelis                  |
| Federacijos prieigos rakto vagystė | Saugojimas naudojant SHA-256 maišą; neapdorotas prieigos raktas parodomas tik vieną kartą |
| Pakvietimo kodų parinkimas jėga    | Pakvietimo panaudojimo galinio taško dažnio ribojimas; 8 simbolių entropija               |
| XSS rodomuose varduose             | Rodomi vardai išvalomi; lyderių lentelės įrašai apsaugomi                                 |
| Laiko matavimo atakos prieš maišas | `crypto.timingSafeEqual` naudojamas prieigos rakto maišams palyginti                      |

### Autentifikavimo reikalavimai

- **Vieša** (be autentifikavimo): `GET /leaderboard`, `GET /stream` (tik skaitomos
  lyderių lentelės).
- **Reikalingas API raktas**: visos rašymo operacijos, profilis, perdavimai, pakvietimai.
- **Tik administratoriams**: anomalijų skydelis, audito žurnalo peržiūros priemonė.
- **Federacija**: atskiras autentifikavimo kelias, naudojantis neapdorotą prieigos raktą
  `Authorization` antraštėje, patikrintą pagal saugomą SHA-256 maišą.

---

## Testavimas

### Testų failai

Visuose testuose naudojama įtaisytoji Node.js testų vykdymo priemonė (`node --import tsx/esm --test`).

| Testo failas                                  | Tikrinama                                                        | Testai |
| --------------------------------------------- | ---------------------------------------------------------------- | ------ |
| `tests/unit/gamification/xp.test.ts`          | XP skaičiavimas, lygių kreivė, titulai                           | 8      |
| `tests/unit/gamification/badges.test.ts`      | Ženklelių kriterijų atitiktis, skyrimas                          | 10     |
| `tests/unit/gamification/streaks.test.ts`     | Serijų logika, etapai, kraštiniai atvejai                        | 7      |
| `tests/unit/gamification/leaderboard.test.ts` | Vietų skaičiavimas, puslapiavimas, rotacija                      | 8      |
| `tests/unit/gamification/sharing.test.ts`     | Perdavimai, likutis, idempotentiškumas                           | 9      |
| `tests/unit/gamification/invites.test.ts`     | Sukūrimas, panaudojimas, galiojimo pabaiga, savęs rekomendavimas | 7      |
| `tests/unit/gamification/antiCheat.test.ts`   | Dažnio apribojimai, Z įvertis, audito žurnalo pildymas           | 6      |
| `tests/unit/gamification/events.test.ts`      | Įvykių generavimas, išplatinimas, klaidų apdorojimas             | 5      |

### Testų vykdymas

```bash
# Visi žaidybinimo testai
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# Vienas testo failas
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Testų aprėpties reikalavimai

Pagal `CONTRIBUTING.md` visi nauji moduliai privalo turėti:

- Šakų aprėptį >= 80%.
- Kiekviena viešoji funkcija turi būti išbandyta bent vieną kartą.
- Turi būti išbandyti klaidų scenarijai (nepakankamas likutis, nebegaliojantys kodai, dažnio apribojimai).

---

## Failų struktūra

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # Visos 8 lentelės ir indeksai
      gamification.ts                  # Domeno CRUD modulis
    gamification/
      xp.ts                           # XP skaičiavimas, lygių kreivė, titulai
      badges.ts                       # Ženklelių apibrėžtys, kriterijai, vertinimas
      streaks.ts                      # Kasdienių serijų stebėjimas
      leaderboard.ts                  # Reitingų skaičiavimas, SSE, rotacija
      antiCheat.ts                    # Užklausų dažnio ribojimas, z įvertis, auditas
      sharing.ts                      # Žetonų perdavimo registras
      invites.ts                      # Pakvietimų ir panaudojimo kodai
      servers.ts                      # Bendruomenės serverių federacija
      events.ts                       # Įvykių skleidiklis (integracijos taškas)
      notifications.ts                # SSE pranešimų srautas
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST lyderių lentelė
        leaderboard/stream/route.ts   # SSE naujiniai realiuoju laiku
        transfer/route.ts             # GET/POST perdavimai
        invite/route.ts               # GET/POST/DELETE pakvietimų kodai
        invite/redeem/route.ts        # POST panaudojimo kodas
        servers/route.ts              # GET/POST/DELETE serveriai
        federation/score/route.ts     # POST rezultato siuntimas
        federation/leaderboard/route.ts # GET lyderių lentelės gavimas
        notifications/route.ts        # SSE pranešimai
        anomalies/route.ts            # GET anomalijų ataskaitos
        rotate/route.ts               # POST paslapčių rotacija
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Reitingų puslapis
        profile/page.tsx               # XP, ženklelių ir serijų puslapis
        tokens/page.tsx                # Balanso, perdavimų ir pakvietimų puslapis
        gamification/admin/page.tsx    # Administratoriaus anomalijų stebėjimas
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
    GAMIFICATION.md                    # Šis dokumentas
```

---

## Perėjimo strategija

### 1 etapas: pagrindinė serverio dalis (PR 1)

- Migracija `060_create_gamification.sql` (8 lentelės).
- `src/lib/db/gamification.ts` (domeno modulis).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- Integracijos taškas faile `chatCore.ts`.
- XP, serijų ir įvykių vienetų testai.

### 2 etapas: ženkleliai ir lyderių lentelė (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Ženklelių apibrėžtys konstantose.
- Lyderių lentelės API maršrutai ir SSE srautas.
- Ženklelių ir lyderių lentelės vienetų testai.

### 3 etapas: dalijimasis ir pakvietimai (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- Perdavimo ir pakvietimų API maršrutai.
- Dalijimosi, pakvietimų ir apsaugos nuo sukčiavimo vienetų testai.

### 4 etapas: federacija ir valdymo skydelis (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- Federacijos API maršrutai.
- Valdymo skydelio puslapiai (lyderių lentelė, profilis, žetonai, administravimas).
- MCP įrankių registracija.

---

## Ateities planai

- **Sezoniniai renginiai**: ribotą laiką prieinami ženklelių rinkiniai ir lyderių lentelės sezonai.
- **Komandų lyderių lentelės**: naudotojų grupavimas pagal organizaciją arba derinį.
- **XP daugikliai**: XP padidinimas reklaminių laikotarpių metu.
- **Pasiekimų bendrinimas**: bendrinamų ženklelių kortelių generavimas (OpenGraph vaizdai).
- **Mobilieji tiesioginiai pranešimai**: webhook pagrįsti pranešimai apie ženklelių / lygių įvykius.
- **Lyderių lentelės API**: viešoji API trečiųjų šalių integracijoms.
