# Gamification & Leaderboard System (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **Patiesības avots:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Pēdējoreiz atjaunināts:** 2026-06-28 — v3.8.40

OmniRoute ietver lokāli orientētu gamifikācijas slāni, kas atalgo lietotājus par
platformas izmantošanu — pieprasījumu veikšanu, pakalpojumu sniedzēju maiņu,
kombināciju izveidi, žetonu kopīgošanu un ieguldījumu kopienā. Viss stāvoklis
tiek glabāts SQLite; federācija ar kopienas serveriem ir brīvprātīga un balstīta
uz datu nosūtīšanu.

Sistēma ir izstrādāta tā, lai **kritiskajā izpildes ceļā neradītu aizkavi** —
gamifikācijas notikumi no pieprasījumu konveijera tiek nosūtīti pēc principa
“nosūti un aizmirsti” un nekad nebloķē LLM atbildi.

---

## Pārskats

### Mērķis

Palielināt lietotāju iesaisti un noturēšanu, nodrošinot redzamu progresu (XP,
līmeņus, nozīmītes), sociālo apliecinājumu (līderu tabulas) un ekonomiskus
stimulus (žetonu kopīgošanu, atlīdzības par uzaicinājumiem).

### Tvērums

| Funkcija                    | Apraksts                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------ |
| XP un līmeņi                | XP iegūšana par katru darbību; līmeņa paaugstināšana pēc polinomiālas līknes               |
| Nozīmītes                   | Vairāk nekā 20 sasniegumu 5 kategorijās ar 4 retuma pakāpēm                                |
| Sērijas                     | Ikdienas aktīvās lietošanas uzskaite ar pašreizējo un garāko sēriju                        |
| Līderu tabulas              | Globāls, nedēļas, mēneša, žetonu kopīgošanas un ieguldījumu tvērums                        |
| Žetonu kopīgošana           | Kredītpunktu pārskaitīšana starp lietotājiem, izmantojot divkāršā ieraksta virsgrāmatu     |
| Uzaicināšana un izmantošana | Ieteikumu kodi, kas tiek glabāti SHA-256 jaucējvērtību veidā                               |
| Kopienas serveri            | Federācija ar ārējām OmniRoute instancēm                                                   |
| Aizsardzība pret krāpšanos  | Punktu aprēķināšana servera pusē, ātruma ierobežošana un anomāliju noteikšana ar z-vērtību |

### Projektēšanas principi

1. **Lokāli orientēta darbība** — viss stāvoklis atrodas SQLite; ārēji
   pakalpojumi nav nepieciešami.
2. **Nebloķējoša darbība** — notikumi tiek nosūtīti pēc principa “nosūti un
   aizmirsti”; LLM atbildes ceļu gamifikācijas loģika nekad neaizkavē.
3. **Serveris ir autoritatīvs** — XP tiek aprēķināts tikai servera pusē;
   klienti nevar mākslīgi palielināt rezultātus.
4. **Privātuma ievērošana** — dalība līderu tabulās ir brīvprātīga; lietotāji
   var paslēpt savu profilu.
5. **Gatavība federācijai** — kopienas serveri var nosūtīt rezultātus,
   izmantojot parakstītu API; sinhronizācija pārraksta vērtības, nevis tās
   summē.

---

## Arhitektūra

### Augsta līmeņa plūsma

```
Klienta pieprasījums
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (esošais konveijers) ...
      → augšupstraumes atbilde nosūtīta klientam
      → setImmediate (nosūti un aizmirsti):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

Notikumu emitētājs ir vienīgais integrācijas punkts. `chatCore.ts` izsauc
`emitGamificationEvent()` pēc atbildes nosūtīšanas; notikumu modulis to izplata
XP, sēriju, nozīmīšu, līderu tabulu un krāpšanās novēršanas apakšsistēmām.

### Moduļu atkarību grafs

```
src/lib/gamification/
  events.ts          ← ieejas punkts (izsauc no chatCore.ts)
    ├── xp.ts        ← XP aprēķināšana un līmeņa noteikšana
    ├── streaks.ts   ← ikdienas aktivitātes sēriju uzskaite
    ├── badges.ts    ← nozīmīšu kritēriju izvērtēšana
    ├── leaderboard.ts ← vietu aprēķināšana un SSE apraide
    ├── antiCheat.ts ← ātruma ierobežošana un anomāliju noteikšana
    ├── sharing.ts   ← žetonu pārskaitījumu virsgrāmata
    ├── invites.ts   ← uzaicinājumu/izmantošanas kodu pārvaldība
    ├── servers.ts   ← kopienas serveru federācija
    └── notifications.ts ← SSE paziņojumu straume

src/lib/db/
  gamification.ts    ← visas CRUD darbības (8 tabulas)

src/app/api/gamification/
  leaderboard/       ← GET vietu sarakstu iegūšana, POST manuāla atsvaidzināšana
  leaderboard/stream ← SSE reāllaika atjauninājumi
  transfer/          ← GET vēstures iegūšana, POST žetonu nosūtīšana
  invite/            ← GET/POST kodi, DELETE atsaukšana
  invite/redeem/     ← POST koda izmantošana
  servers/           ← GET/POST/DELETE kopienas serveri
  federation/score/  ← POST rezultāta nosūtīšana serverim
  federation/leaderboard/ ← GET līderu tabulas iegūšana no servera
  notifications/     ← SSE paziņojumi par nozīmītēm/līmeņa paaugstināšanu
  anomalies/         ← GET anomāliju pārskati (administratoram)
  rotate/            ← POST uzaicinājumu žetonu noslēpumu rotācija
```

---

## Datu slānis

### Datubāzes tabulas

Visas tabulas atrodas galvenajā OmniRoute SQLite datubāzē, kas izveidota ar migrāciju
`060_create_gamification.sql`. WAL žurnalēšana tiek mantota no vienīgās
`getDbInstance()` instances failā `src/lib/db/core.ts`.

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

### Domēna modulis: `src/lib/db/gamification.ts`

Atbilst standarta OmniRoute paraugam — importē `getDbInstance()` no
`core.ts` un eksportē tipizētas CRUD funkcijas. Maršrutu apstrādātājos netiek izmantots neapstrādāts SQL.

Galvenās funkcijas:

| Funkcija                   | Apraksts                                                    |
| -------------------------- | ----------------------------------------------------------- |
| `upsertLeaderboardEntry()` | Ievieto vai atjaunina rezultātu (api_key_id, scope, period) |
| `getLeaderboard()`         | Lapotas vietas reitingā norādītajam tvērumam/periodam       |
| `getUserLevel()`           | Iegūst vai izveido lietotāja līmeņa ierakstu                |
| `updateUserLevel()`        | Atomāri iestata XP, līmeni un titulu                        |
| `getBadgeDefinitions()`    | Visas nozīmīšu definīcijas (pēc izvēles filtrētas)          |
| `getUserBadges()`          | Lietotāja nopelnītās nozīmītes                              |
| `awardBadge()`             | Ievieto nopelnīto nozīmīti (idempotenti pēc badge_id)       |
| `logXpAction()`            | Pievieno ierakstu xp_audit_log                              |
| `getXpAuditLog()`          | Lapota lietotāja audita vēsture                             |
| `insertLedgerEntry()`      | Divkāršā ieraksta pārskaitījums (transakcijā)               |
| `getBalance()`             | Lietotājam saņemto un nosūtīto līdzekļu summu starpība      |
| `getTransferHistory()`     | Lapots pārskaitījumu žurnāls                                |
| `createInviteToken()`      | Ievieto uzaicinājuma kodu un jaucējvērtības pilnvaru        |
| `redeemInviteToken()`      | Atrod pēc koda, validē un palielina lietojumu skaitu        |
| `upsertCommunityServer()`  | Reģistrē vai atjaunina federācijas serveri                  |
| `getCommunityServers()`    | Uzskaita lietotāja serverus                                 |
| `deleteCommunityServer()`  | Noņem servera reģistrāciju                                  |

---

## XP / līmeņu sistēma

**Fails:** `src/lib/gamification/xp.ts`

### Līmeņu līkne

XP daudzums, kas nepieciešams, lai sasniegtu līmeni `n`, atbilst polinoma līknei:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Līmenis | XP līdz nākamajam līmenim | Kopējais XP | Tituls   |
| ------- | ------------------------- | ----------- | -------- |
| 1       | 100                       | 100         | Iesācējs |
| 5       | 1,118                     | 2,415       | Iesācējs |
| 10      | 3,162                     | 10,523      | Pētnieks |
| 25      | 12,500                    | 86,024      | Pētnieks |
| 50      | 35,355                    | 345,529     | Eksperts |
| 75      | 64,952                    | 948,683     | Meistars |
| 100     | 100,000                   | 2,050,000   | Leģenda  |

### Tituli

| Līmeņu diapazons | Tituls   |
| ---------------- | -------- |
| 1 – 9            | Iesācējs |
| 10 – 24          | Pētnieks |
| 25 – 49          | Eksperts |
| 50 – 74          | Meistars |
| 75 – 100         | Leģenda  |

### XP atlīdzības

| Darbība           | XP  | Apraksts                                                     |
| ----------------- | --- | ------------------------------------------------------------ |
| `request`         | 1   | Par katru API pieprasījumu, kas maršrutēts caur OmniRoute    |
| `provider_switch` | 5   | Pārslēgšanās uz citu pakalpojuma sniedzēju                   |
| `model_switch`    | 3   | Pārslēgšanās uz citu modeli                                  |
| `combo_create`    | 10  | Jaunas kombinācijas izveide                                  |
| `combo_use`       | 2   | Kombinācijas izmantošana pieprasījumam                       |
| `token_share`     | 1   | Par katriem 1 000 marķieriem, kas kopīgoti ar citu lietotāju |
| `invite_redeem`   | 50  | Ielūguma koda izmantošana                                    |
| `daily_login`     | 5   | Aktīva lietošana ik dienu (vienreiz dienā)                   |
| `streak_bonus`    | 2   | Par katru secīgo sērijas dienu (reizināts ar sērijas ilgumu) |
| `badge_unlock`    | 10  | Nozīmītes atbloķēšana                                        |

### Piešķiršanas plūsma

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. Atrodiet `XP_REWARDS[action]`, lai iegūtu XP daudzumu.
2. Nododiet to funkcijai `checkRateLimit()` (aizsardzība pret krāpšanos: ne vairāk kā 1000 XP/min katrai atslēgai).
3. Atveriet transakciju:
   - Nolasiet pašreizējo `user_levels` rindu.
   - Pievienojiet XP; pārrēķiniet līmeni, izmantojot `levelFromXp(totalXp)`.
   - Ja līmenis ir mainījies, iestatiet `levelUp = true`.
   - Atjauniniet `user_levels` rindu.
   - Ievietojiet ierakstu tabulā `xp_audit_log`.
4. Atgrieziet rezultātu. Izsaucējs apstrādā paziņojumus.

### Palīgfunkcija: `levelFromXp(totalXp)`

Iterē caur līmeņiem 1..100, summējot `xp_for_level(n)`, līdz kopējais XP
pārsniedz `totalXp`. Atgriež augstāko līmeni, kura slieksnis ir sasniegts.
Sarežģītība ir O(100) — pieņemami, jo maksimālais līmenis ir 100.

---

## Nozīmīšu sistēma

**Fails:** `src/lib/gamification/badges.ts`

### Kategorijas

| Kategorija     | Apraksts                              | Nozīmīšu piemēri                                      |
| -------------- | ------------------------------------- | ----------------------------------------------------- |
| `usage`        | Uz apjomu balstīti atskaites punkti   | Pirmais pieprasījums, 1K pieprasījumu, 100K           |
| `sharing`      | Marķieru kopīgošana un ieteikumi      | Pirmā kopīgošana, Dāsnais (10 kopīgošanas)            |
| `contribution` | Iesaistīšanās kopienā                 | Kombināciju veidotājs, pakalpojumu sniedzēju pētnieks |
| `streak`       | Konsekvence laika gaitā               | Nedēļas cīnītājs, uzticīgais mēneša lietotājs         |
| `rare`         | Grūti iegūstami vai slēpti sasniegumi | Agrīnais lietotājs, kļūdu ziņotājs                    |

### Retuma pakāpes

| Retums      | Krāsa  | Varbūtības norāde      |
| ----------- | ------ | ---------------------- |
| `common`    | Pelēka | Lielākā daļa lietotāju |
| `uncommon`  | Zaļa   | Aktīvi lietotāji       |
| `rare`      | Zila   | Uzticīgi lietotāji     |
| `legendary` | Zelta  | Labākais 1%            |

### Kritēriju tipi

| Tips           | Lauks        | Apraksts                                                 |
| -------------- | ------------ | -------------------------------------------------------- |
| `action_count` | `count`      | Veikt darbību N reizes (piem., 1000 pieprasījumu)        |
| `streak`       | `days`       | Uzturēt sēriju N secīgas dienas                          |
| `unique_count` | `field`, `n` | Izmantot N unikālas vērtības (piem., 10 dažādus modeļus) |
| `rank`         | `scope`, `n` | Sasniegt N vietu līderu saraksta tvērumā                 |
| `first`        | —            | Būt pirmajam, kas veic darbību                           |
| `hidden`       | (atšķiras)   | Kritēriji netiek rādīti, kamēr nozīmīte nav iegūta       |

Nozīmīšu definīcijas tiek glabātas tabulā `badge_definitions` kā JSON `criteria`:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Novērtēšanas plūsma

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # visas definīcijas
    → getUserBadges(apiKeyId)         # jau iegūtās (izlaist)
    → katrai neiegūtajai nozīmītei:
       → matchesCriteria(badge, event, userState)
       → ja atbilst: awardBadge(apiKeyId, badgeId)
         → atgriezt paziņojuma datus
```

Novērtēšana ir **notikumu vadīta** — tā tiek izpildīta pēc katra spēliskošanas notikuma, taču
pārbauda tikai tās nozīmītes, kuru `criteria.type` atbilst notikuma darbībai. Tas
nodrošina ātru novērtēšanu (< 5ms lielākajai daļai notikumu).

### `matchesCriteria(badge, event, userState)`

| Kritērija tips | Pārbaude                                                   |
| -------------- | ---------------------------------------------------------- |
| `action_count` | `getActionCount(apiKeyId, action) >= count`                |
| `streak`       | `getCurrentStreak(apiKeyId) >= days`                       |
| `unique_count` | `getUniqueCount(apiKeyId, field) >= n`                     |
| `rank`         | `getRank(apiKeyId, scope) <= n`                            |
| `first`        | Nav iepriekšēja `xp_audit_log` ieraksta šim darbības tipam |
| `hidden`       | Deleģē attiecīgajai apakšpārbaudei                         |

### Iebūvētās nozīmītes (20+)

<details>
<summary>Pilns nozīmīšu saraksts</summary>

| Žetons                   | Kategorija  | Retums    | Kritēriji                          |
| ------------------------ | ----------- | --------- | ---------------------------------- |
| Pirmie soļi              | lietojums   | parasts   | 1 pieprasījums                     |
| Iesildīšanās             | lietojums   | parasts   | 100 pieprasījumi                   |
| Aktīvs lietotājs         | lietojums   | neparasts | 1,000 pieprasījumi                 |
| Centurions               | lietojums   | rets      | 10,000 pieprasījumi                |
| Omnispēks                | lietojums   | leģendārs | 100,000 pieprasījumi               |
| Nodrošinātāju mainītājs  | ieguldījums | parasts   | Izmantot 5 dažādus nodrošinātājus  |
| Nodrošinātāju meistars   | ieguldījums | neparasts | Izmantot 20 dažādus nodrošinātājus |
| Kombināciju arhitekts    | ieguldījums | neparasts | Izveidot 5 kombinācijas            |
| Kombināciju lielmeistars | ieguldījums | rets      | Izveidot 25 kombinācijas           |
| Pirmā kopīgošana         | kopīgošana  | parasts   | 1 žetonu pārskaitījums             |
| Dāsnais                  | kopīgošana  | neparasts | 10 žetonu pārskaitījumi            |
| Filantrops               | kopīgošana  | rets      | Kopā pārskaitīt 10,000 žetonu      |
| Ieteicējs                | kopīgošana  | parasts   | 1 veiksmīgs ieteikums              |
| Tīkla veidotājs          | kopīgošana  | neparasts | 10 veiksmīgi ieteikumi             |
| Nedēļas cīnītājs         | sērija      | neparasts | 7 dienu sērija                     |
| Mēneša uzticamais        | sērija      | rets      | 30 dienu sērija                    |
| Neapturamais             | sērija      | leģendārs | 365 dienu sērija                   |
| Agrīnais lietotājs       | rets        | leģendārs | Pievienoties beta periodā          |
| Saspiešanas celmlauzis   | rets        | neparasts | Izmantot saspiešanu 100 reizes     |
| Prasmju kolekcionārs     | rets        | rets      | Izmantot 10 dažādas prasmes        |
| Modeļu pētnieks          | ieguldījums | neparasts | Izmantot 15 dažādus modeļus        |

</details>

---

## Sēriju uzskaite

**Fails:** `src/lib/gamification/streaks.ts`

### Datu modelis

Sērijas tiek glabātas tabulā `key_value` (koplietojama palīgtabula), izmantojot
nosaukumvietu atslēgas:

| Atslēga                       | Vērtība                          | Apraksts             |
| ----------------------------- | -------------------------------- | -------------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Aktīvās sērijas dati |

### Loģika

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Nolasīt sērijas ierakstu no `key_value`.
2. Parsēt `{current}`, `{longest}`, `{lastDate}` (ISO datuma virkne).
3. Ja `lastDate === today` — bez izmaiņām (šodien jau ieskaitīts).
4. Ja `lastDate === yesterday` — palielināt `current`; vajadzības gadījumā atjaunināt `longest`.
5. Ja `lastDate < yesterday` — atiestatīt `current = 1` (sērija pārtraukta).
6. Ierakstīt atjaunināto ierakstu.
7. Pārbaudīt atskaites punktus: 7, 14, 30, 60, 90, 180, 365 dienas. Ja kāds ir sasniegts, iestatīt
   `milestone = true` (izsaucējs piešķir XP un pārbauda nozīmītes).

### Īpašie gadījumi

- **Laika josla**: sērijās tiek izmantoti UTC datumi (`new Date().toISOString().slice(0, 10)`).
  Tas ir apzināti — viena kanoniska laika josla novērš manipulācijas, pārslēdzot
  laika joslas.
- **Jauni lietotāji**: sērijas ieraksts nepastāv; pirmais pieprasījums to izveido ar
  `current=1, longest=1, lastDate=today`.
- **Vairāki pieprasījumi dienā**: sēriju palielina tikai pirmais pieprasījums attiecīgajā UTC dienā.

---

## Līderu tabula

**Fails:** `src/lib/gamification/leaderboard.ts`

### Tvērumi

| Tvērums         | Periods | Apraksts                                                                |
| --------------- | ------- | ----------------------------------------------------------------------- |
| `global`        | `all`   | Visā laikā uzkrātais XP                                                 |
| `weekly`        | `week`  | Pašreizējā UTC nedēļā (pirmd.–svētd.) nopelnītais XP                    |
| `monthly`       | `month` | Pašreizējā UTC mēnesī nopelnītais XP                                    |
| `tokens_shared` | `all`   | Citiem kopā pārsūtīto marķieru skaits                                   |
| `contributions` | `all`   | Izveidotās kombinācijas + izmantotie nodrošinātāji + izmantotās prasmes |

### Vietas aprēķināšana

Vietas tiek **aprēķinātas nolasīšanas laikā**, nevis saglabātas. Tas ļauj izvairīties no novecojušiem vietu datiem
un novērš nepieciešamību pēc periodiskiem vietu pārrēķināšanas uzdevumiem.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

Vaicājuma paraugs:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### Periodu maiņa

Nedēļas un mēneša līderu tabulas tiek mainītas automātiski:

1. **Arhivēšana**: perioda beigās kopēt pašreizējos ierakstus uz
   `leaderboard_archive` ar perioda etiķeti.
2. **Atiestatīšana**: dzēst beigušā perioda ierakstus.
3. **Aktivizēšana**: pārbaude tiek veikta katrā `updateLeaderboard()` izsaukumā; pirmais jaunā perioda pieprasījums
   aktivizē maiņu.

Tas nodrošina, ka nedēļas tabulas tiek atiestatītas katru pirmdienu plkst. 00:00 UTC un mēneša tabulas
tiek atiestatītas katra mēneša 1. datumā.

### SSE reāllaika atjauninājumi

**Galapunkts:** `GET /api/gamification/stream`

```
Klients → GET /api/gamification/stream
  → Izveidots SSE savienojums
  → Serveris nekavējoties nosūta līderu tabulas pirmā desmitnieka momentuzņēmumu
  → Ik pēc 5 sekundēm: nosūta atjaunināto pirmo desmitnieku, ja tas ir mainījies
  → Ik pēc 15 sekundēm: kontrolsignāla komentārs (": heartbeat\n\n")
  → Klients atvienojas → tīrīšana (klausītāja noņemšana)
```

Notikuma formāts:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

SSE pārvaldnieks uzskaita pievienotos klientus katram tvērumam un nosūta atjauninājumus tikai tad,
ja līderu tabulas dati kopš pēdējās nosūtīšanas ir faktiski mainījušies.

---

## Tokenu kopīgošana

**Fails:** `src/lib/gamification/sharing.ts`

### Divkāršā ieraksta virsgrāmata

Katrs pārskaitījums izveido divas rindas tabulā `token_ledger`:

| Rinda   | `from_key_id` | `to_key_id` | `amount` |
| ------- | ------------- | ----------- | -------- |
| Debets  | sūtītājs      | saņēmējs    | +summa   |
| Kredīts | saņēmējs      | sūtītājs    | -summa   |

Pagaidiet — izmantotā pieeja ir šāda:

| Rinda   | `from_key_id` | `to_key_id` | `amount` | Nozīme               |
| ------- | ------------- | ----------- | -------- | -------------------- |
| Nosūtīt | sūtītājs      | saņēmējs    | +summa   | Aizplūde no sūtītāja |
| Saņemt  | saņēmējs      | sūtītājs    | +summa   | Ieplūde saņēmējam    |

Atlikums tiek aprēķināts šādi:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Pārskaitījuma plūsma

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Validācija**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **Idempotence**: pārbaudīt, vai `idempotency_key` jau pastāv virsgrāmatā.
   Ja pastāv, atgriezt kešoto rezultātu.
3. **Transakcija** (viena SQLite transakcija):
   a. Aprēķināt sūtītāja atlikumu.
   b. Ja `balance < amount`, pārtraukt darbību (nepietiek līdzekļu).
   c. Ievietot nosūtīšanas rindu (`from=sūtītājs,`.

### Biežuma ierobežošana

- Ne vairāk kā 10 pārskaitījumi minūtē katrai API atslēgai.
- Ne vairāk kā 10 000 tokenu vienā pārskaitījumā.
- Ne vairāk kā 100 000 pārskaitītu tokenu dienā katrai API atslēgai.

---

## Ielūgumu un izpirkšanas tokeni

**Fails:** `src/lib/gamification/invites.ts`

### Koda formāts

- **Kods**: 8 rakstzīmju burtciparu virkne (piemēram, `A3K9-X7M2`), cilvēkam salasāma un
  parādīta lietotājam.
- **Tokens**: nejaušs 32 baitu tokens, kas tiek glabāts kā SHA-256 jaucējvērtība. Izmanto
  programmatiskai izpirkšanai (piemēram, URL saitēs).

### Glabāšana

| Kolonna      | Vērtība                         |
| ------------ | ------------------------------- |
| `code`       | `A3K9X7M2` (unikāls, indeksēts) |
| `token_hash` | SHA-256(raw_token)              |

Neapstrādātais tokens tiek atgriezts lietotājam tieši vienu reizi tā izveides laikā. OmniRoute
to vairs nekad neglabā un neparāda — tiek saglabāta tikai jaucējvērtība.

### Pašieteikšanās novēršana

Kad lietotājs izpērk kodu, sistēma pārbauda:

1. Kods pieder citam `api_key_id`.
2. Lietotājs, kurš izpērk kodu, iepriekš nav izpircis nevienu tā paša
   ieteicēja kodu (savienojums ar `invite_tokens` un izpirkšanas žurnālu).

Ja kāda no pārbaudēm neizdodas, izpirkšana tiek noraidīta ar skaidru kļūdas ziņojumu.

### Derīguma termiņš un ierobežojumi

- Noklusējuma `max_uses`: 10 (konfigurējams izveides laikā).
- Noklusējuma `expires_at`: 30 dienas no izveides brīža.
- Kodi, kuru derīguma termiņš ir beidzies vai kuru lietojumu limits ir sasniegts, atgriež HTTP 410 Gone.

---

## Kopienas serveru federācija

**Fails:** `src/lib/gamification/servers.ts`

### Savienošana

Kopienas serveris tiek reģistrēts, izmantojot attālā servera izsniegtu uzaicinājuma pilnvaru. Lokālā instance:

1. Saņem uzaicinājuma pilnvaru (piemēram, ielīmētu informācijas panelī).
2. Izsauc `POST /api/gamification/federation/leaderboard` attālajā serverī, lai validētu pilnvaru un iegūtu pašreizējo līderu sarakstu.
3. Saglabā servera ierakstu ar `status: connected`.

### Sinhronizācijas modelis

Federācija izmanto **pārrakstīšanas sinhronizāciju**, nevis summēšanu:

```
Lokālā instance                Kopienas serveris
     │                              │
     ├── nosūta rezultātu ─────────►│  POST /federation/score
     │   { api_key_id, score }      │  (serveris validē pilnvaras jaucējvērtību)
     │                              │
     ├── pieprasa līderu sarakstu ─►│  GET /federation/leaderboard
     │◄── top-N ieraksti ───────────┤  (pārraksta lokālo kešatmiņu)
     │                              │
     └── darbspējas pārbaude ──────►│  GET /federation/health
         (ik pēc 60 s, noildze 5 s) │
```

### Autentifikācija

Federācijas pieprasījumos ir iekļauts:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

Attālais serveris aprēķina pilnvaras jaucējvērtību un atrod atbilstošo `community_servers` rindu. Tādējādi nav jāpārsūta saglabātā jaucējvērtība.

### Darbspējas uzraudzība

Katrs servera ieraksts izseko:

| Lauks       | Apraksts                                            |
| ----------- | --------------------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable`              |
| `last_sync` | Pēdējās veiksmīgās sinhronizācijas ISO laikspiedols |
| `failures`  | Secīgu neveiksmīgu darbspējas pārbaužu skaits       |

Pēc 5 secīgām neveiksmēm statuss mainās uz `unreachable`, un sinhronizācija tiek apturēta, līdz manuāla darbspējas pārbaude ir veiksmīga.

---

## Aizsardzība pret krāpšanos

**Fails:** `src/lib/gamification/antiCheat.ts`

### Punktu aprēķināšana servera pusē

Visi XP aprēķini tiek veikti failā `src/lib/gamification/xp.ts`. Klienti nekad neiesniedz rezultātu — tie iesniedz darbības, un serveris aprēķina XP. Kolonnā `leaderboard.score` datus var ierakstīt tikai servera puses kods.

### Pieprasījumu biežuma ierobežošana

| Ierobežojums               | Vērtība | Tvērums               |
| -------------------------- | ------- | --------------------- |
| Maksimālais XP minūtē      | 1,000   | Katrai API atslēgai   |
| Maks. pārskaitījumu minūtē | 10      | Katrai API atslēgai   |
| Maks. pārskaitījuma summa  | 10,000  | Katram pārskaitījumam |
| Maks. pārskaitījumi dienā  | 100,000 | Katrai API atslēgai   |

Pieprasījumu biežuma ierobežojumi izmanto atmiņā glabātu slīdošo logu (tādu pašu modeli kā `RateLimitManager` mapē `open-sse/services/`). Ja process tiek restartēts, tiek izmantoti SQLite glabāti skaitītāji.

### Anomāliju noteikšana, izmantojot Z vērtību

Katrai API atslēgai sistēma uztur slīdošu 7 dienu logu ar stundā nopelnīto XP apjomu. Piešķirot XP:

1. Aprēķina lietotāja pašreizējo XP iegūšanas ātrumu stundā.
2. Aprēķina populācijas vidējo vērtību un standartnovirzi.
3. Aprēķina `z = (user_rate - mean) / stddev`.
4. Ja `z > 3.0` (3 standartnovirzes), atzīmē to kā anomāliju.

Anomālijas tiek reģistrētas žurnālā `xp_audit_log` ar `action = 'anomaly_detected'` un parādītas administratora informācijas panelī.

### Audita pieraksti

Katra XP piešķiršana, pārskaitījums, nozīmītes iegūšana un anomālijas noteikšana tiek reģistrēta žurnālā `xp_audit_log` ar:

| Lauks        | Apraksts                                        |
| ------------ | ----------------------------------------------- |
| `api_key_id` | Kas                                             |
| `action`     | Kas notika (xp_award, transfer, anomaly, …)     |
| `xp_awarded` | Daudzums (0 notikumiem, kas nav saistīti ar XP) |
| `metadata`   | JSON ar kontekstu (darbības veids, mērķis, …)   |
| `created_at` | Kad (ISO 8601)                                  |

Administratori var pieprasīt pilnus audita pierakstus, izmantojot `GET /api/gamification/anomalies`.

---

## API maršruti

Visi maršruti atbilst standarta OmniRoute paraugam:

```
Maršruts → CORS priekšpieprasījums → Pamatdaļas validācija (Zod) → Autentifikācija (extractApiKey)
  → Apstrādātājs
```

### Galapunkti

| Metode | Ceļš                                       | Apraksts                                              | Autentifikācija |
| ------ | ------------------------------------------ | ----------------------------------------------------- | --------------- |
| GET    | `/api/gamification/leaderboard`            | Iegūt līderu tabulu (tvērums, periods, lapošana)      | Neobligāta      |
| POST   | `/api/gamification/leaderboard`            | Piespiedu kārtā atsvaidzināt līderu tabulas kešatmiņu | Obligāta        |
| GET    | `/api/gamification/stream`                 | SSE līderu tabulas atjauninājumi reāllaikā            | Neobligāta      |
| GET    | `/api/gamification/transfer`               | Iegūt pārskaitījumu vēsturi (lapošana)                | Obligāta        |
| POST   | `/api/gamification/transfer`               | Nosūtīt žetonus citam lietotājam                      | Obligāta        |
| GET    | `/api/gamification/invite`                 | Uzskaitīt manus uzaicinājumu kodus                    | Obligāta        |
| POST   | `/api/gamification/invite`                 | Ģenerēt jaunu uzaicinājuma kodu                       | Obligāta        |
| DELETE | `/api/gamification/invite`                 | Atsaukt uzaicinājuma kodu                             | Obligāta        |
| POST   | `/api/gamification/invite/redeem`          | Izmantot uzaicinājuma kodu                            | Obligāta        |
| GET    | `/api/gamification/servers`                | Uzskaitīt kopienas serverus                           | Obligāta        |
| POST   | `/api/gamification/servers`                | Izveidot savienojumu ar kopienas serveri              | Obligāta        |
| DELETE | `/api/gamification/servers`                | Atvienoties no kopienas servera                       | Obligāta        |
| POST   | `/api/gamification/federation/score`       | Nosūtīt rezultātu attālajam serverim                  | Federācija      |
| GET    | `/api/gamification/federation/leaderboard` | Iegūt līderu tabulu no attālā servera                 | Federācija      |
| GET    | `/api/gamification/notifications`          | SSE emblēmu/līmeņa paaugstināšanas paziņojumi         | Obligāta        |
| GET    | `/api/gamification/anomalies`              | Skatīt anomāliju pārskatus (administrators)           | Administrators  |
| POST   | `/api/gamification/rotate`                 | Rotēt uzaicinājumu žetonu noslēpumus                  | Obligāta        |

### Pieprasījumu/atbilžu piemēri

**POST /api/gamification/transfer**

```json
// Pieprasījums
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// Atbilde 200
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

// Atbilde 400 (nepietiek līdzekļu)
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

## MCP rīki (8)

Reģistrēti mapē `open-sse/mcp-server/` kopā ar esošajiem rīkiem. Ierobežoti ar
`gamification` atļauju tvērumu.

| Rīks                       | Apraksts                                                     | Ievades shēma                |           |
| -------------------------- | ------------------------------------------------------------ | ---------------------------- | --------- |
| `gamification_leaderboard` | Iegūt līderu tabulu tvērumam/periodam                        | `{ scope, period?, limit? }` |
| `gamification_rank`        | Iegūt izsaucēja vietu un blakus esošos dalībniekus           | `{ scope }`                  |
| `gamification_profile`     | Iegūt XP, līmeņa, titula un sērijas kopsavilkumu             | `{}`                         |
| `gamification_badges`      | Uzskaitīt iegūtās nozīmītes vai visas definīcijas            | `{ earned?: boolean }`       |
| `gamification_transfer`    | Nosūtīt žetonus citam lietotājam                             | `{ to, amount }`             |
| `gamification_invite`      | Ģenerēt vai uzskaitīt ielūgumu kodus                         | `{ action: "create"          | "list" }` |
| `gamification_servers`     | Uzskaitīt kopienas serverus vai izveidot ar tiem savienojumu | `{ action, token? }`         |
| `gamification_anomalies`   | Skatīt anomāliju pārskatus (administratora tvērums)          | `{ limit?, since? }`         |

---

## Informācijas paneļa lapas

### `/dashboard/leaderboard`

- Pjedestāla attēlojums (3 labākie ar avatāriem un XP).
- Tvēruma atlasītājs: Globālais / Nedēļas / Mēneša / Kopīgotie žetoni / Ieguldījumi.
- Tabula ar lappušu dalījumu (25 ieraksti lapā), kurā norādīta vieta, vārds, rezultāts, līmenis un tituls.
- SSE reāllaika atjauninājumi — vietu izmaiņas tiek animētas.
- Pašreizējais lietotājs tabulā ir izcelts ar piespraustu rindu „Jūsu vieta”.

### `/dashboard/profile`

- XP progresa josla ar pašreizējo līmeni un nākamā līmeņa slieksni.
- Titula nozīmīte tiek attēlota pamanāmā vietā.
- Nozīmīšu galerija — iegūtās nozīmītes ar iegūšanas datumu, neiegūtās nozīmītes attēlotas pelēkā krāsā
  (slēptajām nozīmītēm līdz to iegūšanai tiek rādīts „???”).
- Sērijas skaitītājs ar liesmas ikonu; sērijas kalendārs (pēdējās 30 dienas).
- XP vēstures diagramma (dienas XP pēdējās 30 dienās).

### `/dashboard/tokens`

- Žetonu atlikums (pamanāmā vietā lapas augšdaļā).
- Pārskaitījuma veidlapa: saņēmējs, summa, apstiprināšanas dialoglodziņš.
- Pārskaitījumu vēstures tabula ar filtriem (nosūtītie/saņemtie/visi).
- Ielūgumu sadaļa: aktīvie kodi, jauna koda ģenerēšana, kopīgošanas saite.
- Kopienas serveri: saraksts ar darbspējas statusu, savienošana/atvienošana.

### `/dashboard/gamification/admin`

- Anomāliju saraksts ar nopietnības pakāpi, lietotāju, laikspiedolu un z-vērtējumu.
- Audita žurnāla skatītājs ar filtriem (darbības veids, lietotājs, datumu diapazons).
- Sistēmas statistika: kopējais piešķirtais XP, aktīvie lietotāji, nozīmīšu iegūšanas rādītāji.
- Federācijas serveru darbspējas pārskats.

---

## Integrācija konveijerā

### Integrācijas punkts

Spēliskošana tiek pievienota pieprasījumu konveijeram vienā punktā failā
`open-sse/handlers/chatCore.ts`:

```typescript
// Pēc atbildes nosūtīšanas klientam:
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
    // Palaist un negaidīt: reģistrēt žurnālā, bet nekad nenodot klientam
  });
});
```

### Notikumu veidi

| Notikuma veids      | Kad tiek emitēts                                                            |
| ------------------- | --------------------------------------------------------------------------- |
| `request.completed` | Veiksmīga LLM atbilde nosūtīta                                              |
| `provider.switch`   | Pakalpojumu sniedzējs mainīts (tiek ieskaitīta arī kombinācijas atkāpšanās) |
| `combo.created`     | Saglabāta jauna kombinācijas konfigurācija                                  |
| `combo.used`        | Kombinācijas mērķis veiksmīgi sasniegts                                     |
| `badge.earned`      | Nozīmītes izvērtēšanā atrasta atbilstība                                    |
| `streak.milestone`  | Pārsniegts sērijas slieksnis                                                |
| `transfer.sent`     | Žetonu pārskaitījums pabeigts                                               |
| `referral.redeemed` | Ielūguma kods veiksmīgi izmantots                                           |
| `compression.used`  | Lietota uzvednes saspiešana                                                 |
| `skill.executed`    | Prasmes izpilde pabeigta                                                    |
| `model.first_use`   | Modelis nav izmantots pēdējo 7 dienu laikā                                  |

### Nebloķējošas darbības garantija

Modelis `setImmediate` + `.catch(() => {})` nodrošina:

1. Atbilde tiek pilnībā nosūtīta pirms spēliskošanas izpildes.
2. Spēliskošanas kļūdas nekad netiek parādītas klientam.
3. Notikuma apstrāde notiek nākamajā mikrouzdevumā, nevis iekļauti pašreizējā izpildē.

---

## Drošība

### Apdraudējumu modelis

| Apdraudējums                            | Riska mazināšana                                                                              |
| --------------------------------------- | --------------------------------------------------------------------------------------------- |
| Punktu mākslīga palielināšana           | XP aprēķināšana tikai servera pusē; klienti iesniedz darbības, nevis punktus                  |
| Atkārtošanas uzbrukumi                  | Idempotences atslēgas pārskaitījumiem; audita žurnāla ierakstu deduplicēšana                  |
| Krāpniecība ar pārskaitījumiem          | Divkāršā ieraksta virsgrāmata; atomāras transakcijas; ātruma ierobežojumi                     |
| Pašnovirzīšana                          | `api_key_id` savstarpēja pārbaude izmantošanas laikā                                          |
| Līderu tabulas manipulēšana             | Anomāliju noteikšana ar Z-vērtību; administratora anomāliju informācijas panelis              |
| Federācijas marķiera zādzība            | Glabāšana SHA-256 jaucējvērtības veidā; neapstrādātais marķieris tiek parādīts tikai vienreiz |
| Ielūguma kodu pilnās pārlases uzbrukumi | Ātruma ierobežošana izmantošanas galapunktā; 8 rakstzīmju entropija                           |
| XSS attēlojamajos vārdos                | Attēlojamie vārdi tiek sanitizēti; līderu tabulas ieraksti tiek ekranēti                      |
| Laika uzbrukumi jaucējvērtībām          | `crypto.timingSafeEqual` marķieru jaucējvērtību salīdzināšanai                                |

### Autentifikācijas prasības

- **Publiski** (bez autentifikācijas): `GET /leaderboard`, `GET /stream` (tikai
  lasāmas līderu tabulas).
- **Nepieciešama API atslēga**: visas rakstīšanas darbības, profils, pārskaitījumi, ielūgumi.
- **Tikai administratoriem**: anomāliju informācijas panelis, audita žurnāla skatītājs.
- **Federācija**: atsevišķs autentifikācijas ceļš, izmantojot neapstrādātu marķieri
  `Authorization` galvenē un validējot to pret saglabāto SHA-256 jaucējvērtību.

---

## Testēšana

### Testu faili

Visos testos tiek izmantots Node.js iebūvētais testu izpildītājs (`node --import tsx/esm --test`).

| Testa fails                                   | Pārbauda                                                      | Testi |
| --------------------------------------------- | ------------------------------------------------------------- | ----- |
| `tests/unit/gamification/xp.test.ts`          | XP aprēķināšanu, līmeņu līkni, titulus                        | 8     |
| `tests/unit/gamification/badges.test.ts`      | Žetonu kritēriju atbilstību, piešķiršanu                      | 10    |
| `tests/unit/gamification/streaks.test.ts`     | Sēriju loģiku, atskaites punktus, robežgadījumus              | 7     |
| `tests/unit/gamification/leaderboard.test.ts` | Vietu aprēķināšanu, lapošanu, rotāciju                        | 8     |
| `tests/unit/gamification/sharing.test.ts`     | Pārskaitījumus, bilanci, idempotenci                          | 9     |
| `tests/unit/gamification/invites.test.ts`     | Izveidi, izmantošanu, derīguma termiņa beigas, pašnovirzīšanu | 7     |
| `tests/unit/gamification/antiCheat.test.ts`   | Ātruma ierobežojumus, Z-vērtību, audita reģistrēšanu          | 6     |
| `tests/unit/gamification/events.test.ts`      | Notikumu izraisīšanu, izplatīšanu, kļūdu apstrādi             | 5     |

### Testu palaišana

```bash
# Visi spēliskošanas testi
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# Atsevišķs testa fails
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Koda pārklājuma prasības

Saskaņā ar `CONTRIBUTING.md` visiem jaunajiem moduļiem jānodrošina:

- Zaru pārklājums >= 80%.
- Katra publiskā funkcija ir pārbaudīta vismaz vienu reizi.
- Ir pārbaudīti kļūdu scenāriji (nepietiekams atlikums, kodi ar beigušos derīguma termiņu, ātruma ierobežojumi).

---

## Failu struktūra

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # Visas 8 tabulas un indeksi
      gamification.ts                  # Domēna CRUD modulis
    gamification/
      xp.ts                           # XP aprēķināšana, līmeņu līkne, tituli
      badges.ts                       # Nozīmīšu definīcijas, kritēriji, novērtēšana
      streaks.ts                      # Ikdienas sēriju uzskaite
      leaderboard.ts                  # Vietu aprēķināšana, SSE, rotācija
      antiCheat.ts                    # Ātruma ierobežošana, z-vērtība, audits
      sharing.ts                      # Žetonu pārskaitījumu virsgrāmata
      invites.ts                      # Ielūgumu un izmantošanas kodi
      servers.ts                      # Kopienas serveru federācija
      events.ts                       # Notikumu izstarotājs (integrācijas punkts)
      notifications.ts                # SSE paziņojumu straume
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST līderu saraksts
        leaderboard/stream/route.ts   # SSE reāllaika atjauninājumi
        transfer/route.ts             # GET/POST pārskaitījumi
        invite/route.ts               # GET/POST/DELETE ielūgumu kodi
        invite/redeem/route.ts        # POST koda izmantošana
        servers/route.ts              # GET/POST/DELETE serveri
        federation/score/route.ts     # POST rezultāta nosūtīšana
        federation/leaderboard/route.ts # GET līderu saraksta izgūšana
        notifications/route.ts        # SSE paziņojumi
        anomalies/route.ts            # GET anomāliju pārskati
        rotate/route.ts               # POST noslēpumu rotācija
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Reitingu lapa
        profile/page.tsx               # XP/nozīmīšu/sēriju lapa
        tokens/page.tsx                # Bilances/pārskaitījumu/ielūgumu lapa
        gamification/admin/page.tsx    # Anomāliju administratīvā uzraudzība
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
    GAMIFICATION.md                    # Šis dokuments
```

---

## Migrācijas stratēģija

### 1. posms: aizmugursistēmas kodols (PR 1)

- Migrācija `060_create_gamification.sql` (8 tabulas).
- `src/lib/db/gamification.ts` (domēna modulis).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- Integrācijas punkts failā `chatCore.ts`.
- XP, sēriju un notikumu vienībtesti.

### 2. posms: nozīmītes un līderu saraksts (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Nozīmīšu definīcijas konstantēs.
- Līderu saraksta API maršruti un SSE straume.
- Nozīmīšu un līderu saraksta vienībtesti.

### 3. posms: kopīgošana un ielūgumi (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- Pārskaitījumu un ielūgumu API maršruti.
- Kopīgošanas, ielūgumu un krāpšanas novēršanas vienībtesti.

### 4. posms: federācija un informācijas panelis (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- Federācijas API maršruti.
- Informācijas paneļa lapas (līderu saraksts, profils, žetoni, administrēšana).
- MCP rīku reģistrācija.

---

## Nākotnes iespējas

- **Sezonāli pasākumi**: ierobežota laika nozīmīšu komplekti un līderu tabulu sezonas.
- **Komandu līderu tabulas**: lietotāju grupēšana pēc organizācijas vai kombinācijas.
- **XP reizinātāji**: XP palielināšana reklāmas kampaņu periodos.
- **Sasniegumu kopīgošana**: kopīgojamu nozīmīšu kartīšu ģenerēšana (OpenGraph attēli).
- **Mobilie pašpiegādes paziņojumi**: uz tīmekļa aizķerēm balstīti paziņojumi par nozīmīšu/līmeņu notikumiem.
- **Līderu tabulas API**: publiska API trešo pušu integrācijām.
