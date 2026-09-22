# Gamification & Leaderboard System (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **Totuuden lähde:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Päivitetty viimeksi:** 2026-06-28 — v3.8.40

OmniRoute sisältää ensisijaisesti paikallisesti toimivan pelillistämiskerroksen, joka palkitsee käyttäjiä
alustan käytöstä — pyyntöjen tekemisestä, palveluntarjoajien vaihtamisesta, yhdistelmien
luomisesta, tokenien jakamisesta ja yhteisöön osallistumisesta. Kaikki tila sijaitsee
SQLitessa; federointi yhteisöpalvelimien kanssa on valinnaista ja perustuu tietojen lähettämiseen.

Järjestelmä on suunniteltu toimimaan **ilman viivettä kriittisellä suorituspolulla** — pelillistämistapahtumat
välitetään pyyntöputkesta asynkronisesti ilman vastauksen odottamista, eivätkä ne koskaan estä
LLM-vastausta.

---

## Yleiskatsaus

### Tarkoitus

Lisätä käyttäjien sitoutumista ja pysyvyyttä tarjoamalla näkyvää edistymistä (XP,
tasot, ansiomerkit), sosiaalista näyttöä (tulostaulukot) ja taloudellisia kannustimia (tokenien
jakaminen, kutsupalkkiot).

### Laajuus

| Ominaisuus                 | Kuvaus                                                                                                          |
| -------------------------- | --------------------------------------------------------------------------------------------------------------- |
| XP ja tasot                | Ansaitse XP:tä toimista ja nouse tasoilla polynomisen käyrän mukaisesti                                         |
| Ansiomerkit                | Yli 20 saavutusta 5 kategoriassa ja 4 harvinaisuustasolla                                                       |
| Käyttöputket               | Päivittäisen aktiivisen käytön seuranta sekä nykyinen ja pisin käyttöputki                                      |
| Tulostaulukot              | Globaalit, viikoittaiset, kuukausittaiset, tokenien jakamiseen perustuvat ja osallistumiseen perustuvat näkymät |
| Tokenien jakaminen         | Siirrä krediittejä käyttäjien välillä kahdenkertaisen kirjanpidon avulla                                        |
| Kutsuminen ja lunastaminen | Suosittelukoodit, jotka tallennetaan SHA-256-tiivisteinä                                                        |
| Yhteisöpalvelimet          | Federointi ulkoisten OmniRoute-instanssien kanssa                                                               |
| Huijausten esto            | Palvelinpuolen pisteytys, nopeusrajoitus ja z-pisteisiin perustuva poikkeamien tunnistus                        |

### Suunnitteluperiaatteet

1. **Ensisijaisesti paikallinen** — kaikki tila sijaitsee SQLitessa, eikä ulkoisia palveluita tarvita.
2. **Estämätön** — tapahtumat välitetään asynkronisesti ilman vastauksen odottamista; pelillistämislogiikka
   ei koskaan viivästytä LLM-vastauksen suorituspolkua.
3. **Palvelin määrää** — XP lasketaan vain palvelinpuolella; asiakkaat eivät voi
   kasvattaa pisteitä keinotekoisesti.
4. **Yksityisyyttä kunnioittava** — tulostaulukoihin osallistuminen on valinnaista; käyttäjät voivat
   piilottaa profiilinsa.
5. **Federointivalmis** — yhteisöpalvelimet voivat lähettää pisteitä allekirjoitetun API:n kautta;
   synkronointi korvaa tiedot eikä lisää niitä aiempiin.

---

## Arkkitehtuuri

### Ylätason kulku

```
Asiakaspyyntö
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (olemassa oleva käsittelyputki) ...
      → vastaus ulkoiselta palvelulta lähetetään asiakkaalle
      → setImmediate (asynkronisesti ilman vastauksen odottamista):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

Tapahtumien välitin on ainoa integrointipiste. `chatCore.ts` kutsuu
`emitGamificationEvent()`-funktiota vastauksen lähettämisen jälkeen; tapahtumamoduuli välittää tapahtuman
XP-, käyttöputki-, ansiomerkkien, tulostaulukon ja huijausten eston alijärjestelmille.

### Moduulien riippuvuuskaavio

```
src/lib/gamification/
  events.ts          ← aloituspiste (chatCore.ts kutsuu)
    ├── xp.ts        ← XP:n laskenta ja tason määritys
    ├── streaks.ts   ← päivittäisen aktiivisen käyttöputken seuranta
    ├── badges.ts    ← ansiomerkkien ehtojen arviointi
    ├── leaderboard.ts ← sijoitusten laskenta ja SSE-lähetykset
    ├── antiCheat.ts ← nopeusrajoitus ja poikkeamien tunnistus
    ├── sharing.ts   ← tokenien siirtokirjanpito
    ├── invites.ts   ← kutsu- ja lunastuskoodien hallinta
    ├── servers.ts   ← yhteisöpalvelimien federointi
    └── notifications.ts ← SSE-ilmoitusvirta

src/lib/db/
  gamification.ts    ← kaikki CRUD-toiminnot (8 taulua)

src/app/api/gamification/
  leaderboard/       ← GET sijoitukset, POST manuaalinen päivitys
  leaderboard/stream ← reaaliaikaiset SSE-päivitykset
  transfer/          ← GET historia, POST lähetä tokeneita
  invite/            ← GET/POST koodit, DELETE kumoa
  invite/redeem/     ← POST lunasta koodi
  servers/           ← GET/POST/DELETE yhteisöpalvelimet
  federation/score/  ← POST lähetä pisteet palvelimelle
  federation/leaderboard/ ← GET nouda tulostaulukko palvelimelta
  notifications/     ← SSE-ilmoitukset ansiomerkeistä ja tasojen nousuista
  anomalies/         ← GET poikkeamaraportit (ylläpitäjä)
  rotate/            ← POST kierrätä kutsutokenien salaisuudet
```

---

## Datakerros

### Tietokantataulut

Kaikki taulut sijaitsevat OmniRouten SQLite-päätietokannassa, jonka migraatio
`060_create_gamification.sql` luo. WAL-lokin käyttö periytyy singleton-funktiolta
`getDbInstance()`, joka sijaitsee tiedostossa `src/lib/db/core.ts`.

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

### Toimialamoduuli: `src/lib/db/gamification.ts`

Noudattaa OmniRouten vakiintunutta mallia — tuo funktion `getDbInstance()`
tiedostosta `core.ts` ja vie tyypitetyt CRUD-funktiot. Reittikäsittelijöissä ei käytetä raakaa SQL:ää.

Keskeiset funktiot:

| Funktio                    | Kuvaus                                                              |
| -------------------------- | ------------------------------------------------------------------- |
| `upsertLeaderboardEntry()` | Lisää tai päivitä pisteet yhdistelmälle (api_key_id, scope, period) |
| `getLeaderboard()`         | Sivutetut sijoitukset annetulle laajuudelle ja ajanjaksolle         |
| `getUserLevel()`           | Hae tai luo käyttäjän tasotietue                                    |
| `updateUserLevel()`        | Aseta XP, taso ja titteli atomisesti                                |
| `getBadgeDefinitions()`    | Kaikki merkkien määrittelyt (valinnaisesti suodatettuina)           |
| `getUserBadges()`          | Käyttäjän ansaitsemat merkit                                        |
| `awardBadge()`             | Lisää ansaittu merkki (idempotentti badge_id:n perusteella)         |
| `logXpAction()`            | Lisää tietue kohteeseen xp_audit_log                                |
| `getXpAuditLog()`          | Käyttäjän sivutettu tarkastushistoria                               |
| `insertLedgerEntry()`      | Kahdenkertainen siirto (transaktion sisällä)                        |
| `getBalance()`             | Käyttäjän vastaanottamien ja lähettämien määrien erotus             |
| `getTransferHistory()`     | Sivutettu siirtoloki                                                |
| `createInviteToken()`      | Lisää kutsukoodi ja hajautettu tunniste                             |
| `redeemInviteToken()`      | Hae koodilla, validoi ja kasvata käyttökertojen määrää              |
| `upsertCommunityServer()`  | Rekisteröi tai päivitä federaatiopalvelin                           |
| `getCommunityServers()`    | Listaa käyttäjän palvelimet                                         |
| `deleteCommunityServer()`  | Poista palvelimen rekisteröinti                                     |

---

## XP- / tasojärjestelmä

**Tiedosto:** `src/lib/gamification/xp.ts`

### Tasokäyrä

Tasolle `n` pääsemiseen vaadittava XP noudattaa polynomikäyrää:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Taso | XP seuraavalle tasolle | Kumulatiivinen XP | Arvonimi           |
| ---- | ---------------------- | ----------------- | ------------------ |
| 1    | 100                    | 100               | Aloittelija        |
| 5    | 1,118                  | 2,415             | Aloittelija        |
| 10   | 3,162                  | 10,523            | Tutkimusmatkailija |
| 25   | 12,500                 | 86,024            | Tutkimusmatkailija |
| 50   | 35,355                 | 345,529           | Asiantuntija       |
| 75   | 64,952                 | 948,683           | Mestari            |
| 100  | 100,000                | 2,050,000         | Legenda            |

### Arvonimet

| Tasoalue | Arvonimi           |
| -------- | ------------------ |
| 1 – 9    | Aloittelija        |
| 10 – 24  | Tutkimusmatkailija |
| 25 – 49  | Asiantuntija       |
| 50 – 74  | Mestari            |
| 75 – 100 | Legenda            |

### XP-palkinnot

| Toiminto          | XP  | Kuvaus                                                                |
| ----------------- | --- | --------------------------------------------------------------------- |
| `request`         | 1   | Jokaisesta OmniRouten kautta reititetystä API-pyynnöstä               |
| `provider_switch` | 5   | Vaihtamisesta toiseen palveluntarjoajaan                              |
| `model_switch`    | 3   | Vaihtamisesta toiseen malliin                                         |
| `combo_create`    | 10  | Uuden yhdistelmän luomisesta                                          |
| `combo_use`       | 2   | Yhdistelmän käyttämisestä pyynnössä                                   |
| `token_share`     | 1   | Jokaista toiselle käyttäjälle jaettua 1 000 tokenia kohden            |
| `invite_redeem`   | 50  | Kutsukoodin lunastamisesta                                            |
| `daily_login`     | 5   | Päivittäisestä aktiivisesta käytöstä (kerran päivässä)                |
| `streak_bonus`    | 2   | Jokaisesta peräkkäisestä putkipäivästä (kerrottuna putken pituudella) |
| `badge_unlock`    | 10  | Merkin avaamisesta                                                    |

### Myöntämisprosessi

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. Hae XP-määrä kohteesta `XP_REWARDS[action]`.
2. Suorita `checkRateLimit()` (huijausten esto: enintään 1000 XP/min avainta kohden).
3. Avaa transaktio:
   - Lue nykyinen `user_levels`-rivi.
   - Lisää XP; laske taso uudelleen funktiolla `levelFromXp(totalXp)`.
   - Jos taso muuttui, aseta `levelUp = true`.
   - Päivitä `user_levels`-rivi.
   - Lisää tietue tauluun `xp_audit_log`.
4. Palauta tulos. Kutsuja käsittelee ilmoitukset.

### Apufunktio: `levelFromXp(totalXp)`

Käy läpi tasot 1..100 ja laskee `xp_for_level(n)`-arvot yhteen, kunnes kumulatiivinen XP
ylittää arvon `totalXp`. Palauttaa korkeimman tason, jonka kynnysarvo täyttyy.
Aikavaativuus on O(100) — hyväksyttävä, sillä tasojen yläraja on 100.

---

## Merkkijärjestelmä

**Tiedosto:** `src/lib/gamification/badges.ts`

### Luokat

| Luokka         | Kuvaus                                        | Esimerkkimerkit                               |
| -------------- | --------------------------------------------- | --------------------------------------------- |
| `usage`        | Käyttömäärään perustuvat virstanpylväät       | Ensimmäinen pyyntö, 1K pyyntöä, 100K          |
| `sharing`      | Tokenien jakaminen ja suosittelut             | Ensimmäinen jako, Antelias (10 jakoa)         |
| `contribution` | Yhteisöön osallistuminen                      | Yhdistelmän luoja, Palveluntarjoajien tutkija |
| `streak`       | Pitkäaikainen säännöllisyys                   | Viikkosoturi, Kuukauden omistautuja           |
| `rare`         | Vaikeasti saatavat tai piilotetut saavutukset | Varhainen omaksuja, Virheraportoija           |

### Harvinaisuusasteet

| Harvinaisuus | Väri    | Todennäköisyysvihje     |
| ------------ | ------- | ----------------------- |
| `common`     | Harmaa  | Useimmat käyttäjät      |
| `uncommon`   | Vihreä  | Aktiiviset käyttäjät    |
| `rare`       | Sininen | Omistautuneet käyttäjät |
| `legendary`  | Kulta   | Paras 1 %               |

### Ehtotyypit

| Tyyppi         | Kenttä       | Kuvaus                                                 |
| -------------- | ------------ | ------------------------------------------------------ |
| `action_count` | `count`      | Suorita toiminto N kertaa (esim. 1000 pyyntöä)         |
| `streak`       | `days`       | Ylläpidä putkea N peräkkäisen päivän ajan              |
| `unique_count` | `field`, `n` | Käytä N:ää yksilöllistä arvoa (esim. 10:tä eri mallia) |
| `rank`         | `scope`, `n` | Saavuta sijoitus N tulostaulukon rajauksessa           |
| `first`        | —            | Ole ensimmäinen toiminnon suorittaja                   |
| `hidden`       | (vaihtelee)  | Ehtoja ei näytetä ennen niiden täyttymistä             |

Merkkien määritelmät tallennetaan tauluun `badge_definitions` JSON-muotoisina `criteria`-arvoina:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Arviointiprosessi

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # kaikki määritelmät
    → getUserBadges(apiKeyId)         # jo ansaitut (ohita)
    → jokaiselle ansaitsemattomalle merkille:
       → matchesCriteria(badge, event, userState)
       → jos täsmää: awardBadge(apiKeyId, badgeId)
         → palauta ilmoituksen tietosisältö
```

Arviointi on **tapahtumapohjaista** — se suoritetaan jokaisen pelillistämistapahtuman jälkeen, mutta
tarkistaa vain merkit, joiden `criteria.type` vastaa tapahtuman toimintoa. Tämä
pitää arvioinnin nopeana (< 5 ms useimmille tapahtumille).

### `matchesCriteria(badge, event, userState)`

| Ehtotyyppi     | Tarkistus                                                      |
| -------------- | -------------------------------------------------------------- |
| `action_count` | `getActionCount(apiKeyId, action) >= count`                    |
| `streak`       | `getCurrentStreak(apiKeyId) >= days`                           |
| `unique_count` | `getUniqueCount(apiKeyId, field) >= n`                         |
| `rank`         | `getRank(apiKeyId, scope) <= n`                                |
| `first`        | Tälle toimintotyypille ei ole aiempaa `xp_audit_log`-merkintää |
| `hidden`       | Delegoi asianmukaiselle alitarkistukselle                      |

### Sisäänrakennetut merkit (20+)

<details>
<summary>Täydellinen merkkiluettelo</summary>

| Merkki                  | Luokka         | Harvinaisuus      | Kriteerit                       |
| ----------------------- | -------------- | ----------------- | ------------------------------- |
| Ensiaskeleet            | käyttö         | yleinen           | 1 pyyntö                        |
| Vauhtiin pääsy          | käyttö         | yleinen           | 100 pyyntöä                     |
| Tehokäyttäjä            | käyttö         | melko harvinainen | 1,000 pyyntöä                   |
| Sadanpäämies            | käyttö         | harvinainen       | 10,000 pyyntöä                  |
| OmniPower               | käyttö         | legendaarinen     | 100,000 pyyntöä                 |
| Tarjoajalta toiselle    | osallistuminen | yleinen           | Käytä viittä eri tarjoajaa      |
| Tarjoajamestari         | osallistuminen | melko harvinainen | Käytä 20:tä eri tarjoajaa       |
| Yhdistelmäarkkitehti    | osallistuminen | melko harvinainen | Luo 5 yhdistelmää               |
| Yhdistelmäsuurmestari   | osallistuminen | harvinainen       | Luo 25 yhdistelmää              |
| Ensimmäinen jako        | jakaminen      | yleinen           | 1 tunnuksen siirto              |
| Antelias                | jakaminen      | melko harvinainen | 10 tunnuksen siirtoa            |
| Hyväntekijä             | jakaminen      | harvinainen       | Siirrä yhteensä 10,000 tunnusta |
| Suosittelija            | jakaminen      | yleinen           | 1 onnistunut suosittelu         |
| Verkoston rakentaja     | jakaminen      | melko harvinainen | 10 onnistunutta suosittelua     |
| Viikkosoturi            | putki          | melko harvinainen | 7 päivän putki                  |
| Kuukauden omistautuja   | putki          | harvinainen       | 30 päivän putki                 |
| Pysäyttämätön           | putki          | legendaarinen     | 365 päivän putki                |
| Varhainen omaksuja      | harvinainen    | legendaarinen     | Liity betavaiheen aikana        |
| Pakkauksen edelläkävijä | harvinainen    | melko harvinainen | Käytä pakkausta 100 kertaa      |
| Taitojen keräilijä      | harvinainen    | harvinainen       | Käytä 10:tä eri taitoa          |
| Mallien tutkija         | osallistuminen | melko harvinainen | Käytä 15:tä eri mallia          |

</details>

---

## Putkilaskuri

**Tiedosto:** `src/lib/gamification/streaks.ts`

### Tietomalli

Putket tallennetaan `key_value`-tauluun (jaettu aputoimintotaulu) nimiavaruudellisilla avaimilla:

| Avain                         | Arvo                             | Kuvaus                   |
| ----------------------------- | -------------------------------- | ------------------------ |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Aktiivisen putken tiedot |

### Logiikka

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Lue putkitietue `key_value`-taulusta.
2. Jäsennä `{current}`, `{longest}` ja `{lastDate}` (ISO-päivämäärämerkkijono).
3. Jos `lastDate === today` — ei muutosta (tämä päivä on jo laskettu).
4. Jos `lastDate === yesterday` — kasvata `current`-arvoa; päivitä `longest` tarvittaessa.
5. Jos `lastDate < yesterday` — nollaa asettamalla `current = 1` (putki katkesi).
6. Kirjoita päivitetty tietue.
7. Tarkista virstanpylväät: 7, 14, 30, 60, 90, 180 ja 365 päivää. Jos virstanpylväs saavutettiin, aseta
   `milestone = true` (kutsuja myöntää XP-pisteet ja tarkistaa ansiomerkit).

### Erikoistapaukset

- **Aikavyöhyke**: putket käyttävät UTC-päivämääriä (`new Date().toISOString().slice(0, 10)`).
  Tämä on tarkoituksellista — yksi kanoninen aikavyöhyke estää järjestelmän manipuloinnin
  aikavyöhykettä vaihtamalla.
- **Uudet käyttäjät**: putkitietuetta ei ole; ensimmäinen pyyntö luo sen arvoilla
  `current=1, longest=1, lastDate=today`.
- **Useita pyyntöjä päivässä**: vain UTC-päivän ensimmäinen pyyntö
  kasvattaa putkea.

---

## Tulostaulukko

**Tiedosto:** `src/lib/gamification/leaderboard.ts`

### Laajuudet

| Laajuus         | Ajanjakso | Kuvaus                                                       |
| --------------- | --------- | ------------------------------------------------------------ |
| `global`        | `all`     | Kaikkien aikojen kumulatiiviset XP-pisteet                   |
| `weekly`        | `week`    | Kuluvalla UTC-viikolla (ma–su) ansaitut XP-pisteet           |
| `monthly`       | `month`   | Kuluvana UTC-kuukautena ansaitut XP-pisteet                  |
| `tokens_shared` | `all`     | Muille siirrettyjen tokenien kokonaismäärä                   |
| `contributions` | `all`     | Luodut kombot + käytetyt palveluntarjoajat + käytetyt taidot |

### Sijoituksen laskenta

Sijoitukset **lasketaan lukuhetkellä**, eikä niitä tallenneta. Tämä estää sijoitustietojen
vanhentumisen ja poistaa säännöllisten sijoitusten uudelleenlaskentatöiden tarpeen.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

Kyselymalli:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### Ajanjakson vaihtuminen

Viikoittaiset ja kuukausittaiset tulostaulukot vaihtuvat automaattisesti:

1. **Arkistointi**: kopioi ajanjakson vaihtuessa nykyiset tietueet
   `leaderboard_archive`-tauluun ajanjakson tunnisteen kanssa.
2. **Nollaus**: poista päättyneen ajanjakson tietueet.
3. **Laukaisu**: tarkistetaan jokaisella `updateLeaderboard()`-kutsulla; uuden ajanjakson ensimmäinen pyyntö
   käynnistää vaihtamisen.

Näin viikoittaiset tulostaulukot nollautuvat joka maanantai klo 00.00 UTC ja kuukausittaiset tulostaulukot
jokaisen kuukauden ensimmäisenä päivänä.

### Reaaliaikaiset SSE-päivitykset

**Päätepiste:** `GET /api/gamification/stream`

```
Asiakas → GET /api/gamification/stream
  → SSE-yhteys muodostetaan
  → Palvelin lähettää välittömästi tulostaulukon 10 parhaan tilannekuvan
  → 5 sekunnin välein: lähetä päivitetty 10 parhaan lista, jos se on muuttunut
  → 15 sekunnin välein: keepalive-kommentti (": heartbeat\n\n")
  → Asiakas katkaisee yhteyden → siivous (poista kuuntelija)
```

Tapahtumamuoto:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

SSE-hallinta seuraa yhdistettyjä asiakkaita laajuuskohtaisesti ja lähettää päivityksiä vain,
kun tulostaulukon tiedot ovat todella muuttuneet edellisen lähetyksen jälkeen.

---

## Tokenien jakaminen

**Tiedosto:** `src/lib/gamification/sharing.ts`

### Kahdenkertainen kirjanpito

Jokainen siirto luo kaksi riviä `token_ledger`-tauluun:

| Rivi     | `from_key_id` | `to_key_id`   | `amount` |
| -------- | ------------- | ------------- | -------- |
| Veloitus | lähettäjä     | vastaanottaja | +amount  |
| Hyvitys  | vastaanottaja | lähettäjä     | -amount  |

Hetkinen — käytäntö on seuraava:

| Rivi        | `from_key_id` | `to_key_id`   | `amount` | Merkitys                       |
| ----------- | ------------- | ------------- | -------- | ------------------------------ |
| Lähetys     | lähettäjä     | vastaanottaja | +amount  | Ulosvirtaus lähettäjältä       |
| Vastaanotto | vastaanottaja | lähettäjä     | +amount  | Sisäänvirtaus vastaanottajalle |

Saldo lasketaan seuraavasti:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Siirron kulku

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Validointi**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **Idempotenssi**: tarkista, onko `idempotency_key` jo olemassa kirjanpidossa.
   Jos on, palauta välimuistiin tallennettu tulos.
3. **Transaktio** (yksi SQLite-transaktio):
   a. Laske lähettäjän saldo.
   b. Jos `balance < amount`, keskeytä (saldo ei riitä).
   c. Lisää lähetysrivi (`from=sender,`.

### Nopeusrajoitukset

- Enintään 10 siirtoa minuutissa API-avainta kohden.
- Enintään 10 000 tokenia yhdessä siirrossa.
- Enintään 100 000 siirrettyä tokenia päivässä API-avainta kohden.

---

## Kutsu- ja lunastustokenit

**Tiedosto:** `src/lib/gamification/invites.ts`

### Koodin muoto

- **Koodi**: 8-merkkinen aakkosnumeerinen koodi (esim. `A3K9-X7M2`), helposti luettava
  ja käyttäjälle näytettävä.
- **Token**: 32 tavun satunnainen token, joka tallennetaan SHA-256-tiivisteenä. Käytetään
  ohjelmalliseen lunastamiseen (esim. URL-linkkien kautta).

### Tallennus

| Sarake       | Arvo                                  |
| ------------ | ------------------------------------- |
| `code`       | `A3K9X7M2` (yksilöllinen, indeksoitu) |
| `token_hash` | SHA-256(raw_token)                    |

Raakatoken palautetaan käyttäjälle tasan kerran sen luomisen yhteydessä. OmniRoute
ei koskaan tallenna tai näytä sitä uudelleen — vain tiiviste säilytetään.

### Itseviittauksen estäminen

Kun käyttäjä lunastaa koodin, järjestelmä tarkistaa seuraavat asiat:

1. Koodi kuuluu eri `api_key_id`-tunnukselle.
2. Lunastava käyttäjä ei ole aiemmin lunastanut mitään saman
   suosittelijan koodia (liitos `invite_tokens`-taulun ja lunastuslokin välillä).

Jos jompikumpi tarkistus epäonnistuu, lunastus hylätään selkeällä virheilmoituksella.

### Vanhentuminen ja rajoitukset

- `max_uses`-oletusarvo: 10 (määritettävissä luonnin yhteydessä).
- `expires_at`-oletusarvo: 30 päivää luonnista.
- Vanhentuneet tai loppuun käytetyt koodit palauttavat HTTP 410 Gone -vastauksen.

---

## Yhteisöpalvelinten federaatio

**Tiedosto:** `src/lib/gamification/servers.ts`

### Yhdistäminen

Yhteisöpalvelin rekisteröidään etäpalvelimen myöntämällä kutsutunnuksella. Paikallinen instanssi:

1. Vastaanottaa kutsutunnuksen (esim. hallintapaneeliin liitettynä).
2. Kutsuu etäpalvelimen päätepistettä `POST /api/gamification/federation/leaderboard`
   vahvistaakseen tunnuksen ja hakeakseen nykyisen tulostaulukon.
3. Tallentaa palvelintietueen arvolla `status: connected`.

### Synkronointimalli

Federaatio käyttää **korvaavaa synkronointia**, ei kumulatiivista synkronointia:

```
Paikallinen instanssi           Yhteisöpalvelin
     │                              │
     ├── lähetä pisteet ───────────►│  POST /federation/score
     │   { api_key_id, score }      │  (palvelin vahvistaa tunnuksen tiivisteen)
     │                              │
     ├── hae tulostaulukko ────────►│  GET /federation/leaderboard
     │◄── parhaat N merkintää ──────┤  (korvaa paikallisen välimuistin)
     │                              │
     └── kuntotarkistus ───────────►│  GET /federation/health
         (60 s:n välein, aikakatkaisu 5 s) │
```

### Todennus

Federaatiopyynnöt sisältävät:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

Etäpalvelin laskee tunnuksen tiivisteen ja etsii sitä vastaavan
`community_servers`-rivin. Näin tallennettua tiivistettä ei tarvitse lähettää.

### Kunnon valvonta

Kussakin palvelintietueessa seurataan seuraavia tietoja:

| Kenttä      | Kuvaus                                                |
| ----------- | ----------------------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable`                |
| `last_sync` | Viimeisimmän onnistuneen synkronoinnin ISO-aikaleima  |
| `failures`  | Peräkkäisten epäonnistuneiden kuntotarkistusten määrä |

Viiden peräkkäisen epäonnistumisen jälkeen tilaksi vaihtuu `unreachable` ja synkronointi
keskeytetään, kunnes manuaalinen kuntotarkistus onnistuu.

---

## Huijausten esto

**Tiedosto:** `src/lib/gamification/antiCheat.ts`

### Palvelinpuolen pisteytys

Kaikki XP-laskelmat tehdään tiedostossa `src/lib/gamification/xp.ts`. Asiakkaat eivät koskaan
lähetä pistemäärää — ne lähettävät toimintoja, joiden perusteella palvelin laskee XP:n.
`leaderboard.score`-sarakkeeseen voi kirjoittaa vain palvelinpuolen koodi.

### Kutsutiheyden rajoittaminen

| Rajoitus                              | Arvo    | Soveltamisala      |
| ------------------------------------- | ------- | ------------------ |
| XP:n enimmäismäärä minuutissa         | 1,000   | API-avainta kohden |
| Siirtoja enintään minuutissa          | 10      | API-avainta kohden |
| Siirron enimmäismäärä                 | 10,000  | Siirtoa kohden     |
| Päivittäisten siirtojen enimmäismäärä | 100,000 | API-avainta kohden |

Kutsutiheyden rajoitukset käyttävät muistissa olevaa liukuvaa aikaikkunaa (sama malli kuin
`RateLimitManager` hakemistossa `open-sse/services/`). Jos prosessi käynnistyy uudelleen,
järjestelmä käyttää varalla SQLite-pohjaisia laskureita.

### Z-pistemäärään perustuva poikkeamien tunnistus

Järjestelmä ylläpitää kullekin API-avaimelle liukuvaa seitsemän päivän ikkunaa tunneittain
ansaitusta XP:stä. Jokaisen XP-myönnön yhteydessä:

1. Lasketaan käyttäjän nykyinen XP-määrä tunnissa.
2. Lasketaan populaation keskiarvo ja keskihajonta.
3. Lasketaan `z = (user_rate - mean) / stddev`.
4. Jos `z > 3.0` (3 keskihajontaa), tapahtuma merkitään poikkeamaksi.

Poikkeamat kirjataan `xp_audit_log`-lokiin arvolla `action = 'anomaly_detected'`
ja näytetään ylläpitäjän hallintapaneelissa.

### Kirjausketju

Jokainen XP-myöntö, siirto, ansaittu merkki ja poikkeaman tunnistus kirjataan
`xp_audit_log`-lokiin seuraavin tiedoin:

| Kenttä       | Kuvaus                                                 |
| ------------ | ------------------------------------------------------ |
| `api_key_id` | Kuka                                                   |
| `action`     | Mitä tapahtui (xp_award, transfer, anomaly, …)         |
| `xp_awarded` | Määrä (0 muissa kuin XP-tapahtumissa)                  |
| `metadata`   | Kontekstin sisältävä JSON (toiminnon tyyppi, kohde, …) |
| `created_at` | Ajankohta (ISO 8601)                                   |

Ylläpitäjät voivat hakea koko kirjausketjun päätepisteen `GET /api/gamification/anomalies` kautta.

---

## API-reitit

Kaikki reitit noudattavat OmniRoute-vakiomallia:

```
Reitti → CORS-esitarkistus → Rungon validointi (Zod) → Todennus (extractApiKey)
  → Käsittelijä
```

### Päätepisteet

| Menetelmä | Polku                                      | Kuvaus                                         | Todennus    |
| --------- | ------------------------------------------ | ---------------------------------------------- | ----------- |
| GET       | `/api/gamification/leaderboard`            | Hae tulostaulu (laajuus, jakso, sivutus)       | Valinnainen |
| POST      | `/api/gamification/leaderboard`            | Pakota tulostaulun välimuistin päivitys        | Pakollinen  |
| GET       | `/api/gamification/stream`                 | Tulostaulun reaaliaikaiset SSE-päivitykset     | Valinnainen |
| GET       | `/api/gamification/transfer`               | Hae siirtohistoria (sivutus)                   | Pakollinen  |
| POST      | `/api/gamification/transfer`               | Lähetä tokeneita toiselle käyttäjälle          | Pakollinen  |
| GET       | `/api/gamification/invite`                 | Listaa omat kutsukoodini                       | Pakollinen  |
| POST      | `/api/gamification/invite`                 | Luo uusi kutsukoodi                            | Pakollinen  |
| DELETE    | `/api/gamification/invite`                 | Mitätöi kutsukoodi                             | Pakollinen  |
| POST      | `/api/gamification/invite/redeem`          | Lunasta kutsukoodi                             | Pakollinen  |
| GET       | `/api/gamification/servers`                | Listaa yhteisöpalvelimet                       | Pakollinen  |
| POST      | `/api/gamification/servers`                | Yhdistä yhteisöpalvelimeen                     | Pakollinen  |
| DELETE    | `/api/gamification/servers`                | Katkaise yhteys yhteisöpalvelimeen             | Pakollinen  |
| POST      | `/api/gamification/federation/score`       | Lähetä pisteet etäpalvelimelle                 | Federointi  |
| GET       | `/api/gamification/federation/leaderboard` | Hae tulostaulu etäpalvelimelta                 | Federointi  |
| GET       | `/api/gamification/notifications`          | SSE-ilmoitukset merkeistä ja tasojen nousuista | Pakollinen  |
| GET       | `/api/gamification/anomalies`              | Tarkastele poikkeamaraportteja (ylläpitäjä)    | Ylläpitäjä  |
| POST      | `/api/gamification/rotate`                 | Kierrätä kutsutokenien salaisuudet             | Pakollinen  |

### Pyyntö- ja vastausesimerkit

**POST /api/gamification/transfer**

```json
// Pyyntö
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// Vastaus 200
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

// Vastaus 400 (riittämätön saldo)
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

## MCP-työkalut (8)

Rekisteröity hakemistossa `open-sse/mcp-server/` olemassa olevien työkalujen rinnalle. Rajattu
`gamification`-käyttöoikeusalueeseen.

| Työkalu                    | Kuvaus                                                        | Syöteskeema                  |           |
| -------------------------- | ------------------------------------------------------------- | ---------------------------- | --------- |
| `gamification_leaderboard` | Hae tulostaulukko käyttöalueelle/ajanjaksolle                 | `{ scope, period?, limit? }` |
| `gamification_rank`        | Hae kutsujan sijoitus ja viereiset sijoitukset                | `{ scope }`                  |
| `gamification_profile`     | Hae XP-, taso-, titteli- ja putkiyhteenveto                   | `{}`                         |
| `gamification_badges`      | Listaa ansaitut merkit tai kaikki määritelmät                 | `{ earned?: boolean }`       |
| `gamification_transfer`    | Lähetä tokeneita toiselle käyttäjälle                         | `{ to, amount }`             |
| `gamification_invite`      | Luo tai listaa kutsukoodeja                                   | `{ action: "create"          | "list" }` |
| `gamification_servers`     | Listaa yhteisöpalvelimia tai muodosta yhteys niihin           | `{ action, token? }`         |
| `gamification_anomalies`   | Tarkastele poikkeamaraportteja (ylläpitäjän käyttöoikeusalue) | `{ limit?, since? }`         |

---

## Koontinäytön sivut

### `/dashboard/leaderboard`

- Palkintokorokenäkymä (kolme parasta avatarien ja XP-määrien kanssa).
- Käyttöalueen valitsin: maailmanlaajuinen / viikoittainen / kuukausittainen / jaetut tokenit / kontribuutiot.
- Sivutettu taulukko (25 per sivu), jossa näkyvät sijoitus, nimi, pistemäärä, taso ja titteli.
- Reaaliaikaiset SSE-päivitykset — sijoitusmuutokset animoidaan.
- Nykyinen käyttäjä korostetaan taulukossa kiinnitetyllä "Sijoituksesi"-rivillä.

### `/dashboard/profile`

- XP-edistymispalkki, jossa näkyvät nykyinen taso ja seuraavan tason kynnys.
- Tittelimerkki näytetään näkyvästi.
- Merkkigalleria — ansaitut merkit ansaintapäivineen ja ansaitsemattomat merkit harmaina
  (piilotetuissa merkeissä näkyy "???", kunnes ne on ansaittu).
- Putkilaskuri liekkikuvakkeella; putkikalenteri (viimeiset 30 päivää).
- XP-historiakaavio (päivittäinen XP viimeisten 30 päivän ajalta).

### `/dashboard/tokens`

- Tokensaldo (näkyvästi sivun yläosassa).
- Siirtolomake: vastaanottaja, määrä ja vahvistusikkuna.
- Siirtohistoriataulukko suodattimilla (lähetetyt/vastaanotetut/kaikki).
- Kutsuosio: aktiiviset koodit, uuden luominen ja jakolinkki.
- Yhteisöpalvelimet: luettelo, jossa näkyy toimintakunto sekä yhteyden muodostamis- ja katkaisutoiminnot.

### `/dashboard/gamification/admin`

- Poikkeamaluettelo, jossa näkyvät vakavuus, käyttäjä, aikaleima ja z-arvo.
- Tarkastuslokin katseluohjelma suodattimilla (toimintotyyppi, käyttäjä, päivämääräväli).
- Järjestelmätilastot: myönnetyn XP:n kokonaismäärä, aktiiviset käyttäjät ja merkkien ansainta-asteet.
- Federaatiopalvelinten toimintakunnon yleiskatsaus.

---

## Integrointi käsittelyputkeen

### Integrointipiste

Pelillistäminen kytkeytyy pyyntöjen käsittelyputkeen yhdessä kohdassa tiedostossa
`open-sse/handlers/chatCore.ts`:

```typescript
// Kun vastaus on lähetetty asiakkaalle:
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
    // Käynnistä ja unohda: kirjaa lokiin, mutta älä koskaan välitä asiakkaalle
  });
});
```

### Tapahtumatyypit

| Tapahtumatyyppi     | Milloin lähetetään                                                  |
| ------------------- | ------------------------------------------------------------------- |
| `request.completed` | Onnistunut LLM-vastaus lähetetty                                    |
| `provider.switch`   | Palveluntarjoaja vaihdettu (combon varavaihtoehto lasketaan mukaan) |
| `combo.created`     | Uusi combo-määritys tallennettu                                     |
| `combo.used`        | Combo-kohdetta käytetty onnistuneesti                               |
| `badge.earned`      | Merkin arviointi löysi osuman                                       |
| `streak.milestone`  | Putken kynnys ylitetty                                              |
| `transfer.sent`     | Token-siirto suoritettu                                             |
| `referral.redeemed` | Kutsukoodi lunastettu onnistuneesti                                 |
| `compression.used`  | Kehotteen pakkausta käytetty                                        |
| `skill.executed`    | Taidon suoritus valmistui                                           |
| `model.first_use`   | Mallia ei ole käytetty viimeisten 7 päivän aikana                   |

### Estämättömyystakuu

`setImmediate` + `.catch(() => {})` -malli varmistaa seuraavat asiat:

1. Vastaus lähetetään kokonaisuudessaan ennen pelillistämisen suorittamista.
2. Pelillistämisvirheet eivät koskaan välity asiakkaalle.
3. Tapahtuman käsittely suoritetaan seuraavassa mikrotehtävässä, ei suoraan samalla suorituspolulla.

---

## Tietoturva

### Uhkamalli

| Uhka                                            | Lievennys                                                                           |
| ----------------------------------------------- | ----------------------------------------------------------------------------------- |
| Pisteiden paisuttaminen                         | XP lasketaan vain palvelinpuolella; asiakkaat lähettävät toimintoja, eivät pisteitä |
| Uusintahyökkäykset                              | Siirroissa käytetään idempotenssiavaimia; valvontalokin kaksoiskappaleet poistetaan |
| Siirtopetokset                                  | Kahdenkertainen kirjanpito; atomiset transaktiot; nopeusrajoitukset                 |
| Itseviittaus                                    | `api_key_id` ristiintarkistetaan lunastuksen yhteydessä                             |
| Tulostaulukon manipulointi                      | Z-pisteisiin perustuva poikkeamien tunnistus; ylläpitäjän poikkeamanäkymä           |
| Federaatiotunnuksen varkaus                     | Tallennus SHA-256-tiivisteenä; raakatunnus näytetään vain kerran                    |
| Kutsukoodien raakavoimahyökkäykset              | Lunastuspäätepisteen nopeusrajoitus; 8 merkin entropia                              |
| XSS näyttönimissä                               | Näyttönimet puhdistetaan; tulostaulukon merkinnät suojataan                         |
| Hajautusarvoihin kohdistuvat ajoitushyökkäykset | Tunnuksen hajautusarvojen vertailuun käytetään `crypto.timingSafeEqual`-funktiota   |

### Todennusvaatimukset

- **Julkinen** (ei todennusta): `GET /leaderboard`, `GET /stream` (vain luku
  -muotoiset tulostaulukot).
- **API-avain vaaditaan**: kaikki kirjoitustoiminnot, profiili, siirrot ja kutsut.
- **Vain ylläpitäjille**: poikkeamanäkymä ja valvontalokin katselu.
- **Federaatio**: erillinen todennuspolku, jossa raakatunnus annetaan
  `Authorization`-otsakkeessa ja validoidaan tallennettua SHA-256-tiivistettä vasten.

---

## Testaus

### Testitiedostot

Kaikki testit käyttävät Node.js:n sisäänrakennettua testisuoritinta (`node --import tsx/esm --test`).

| Testitiedosto                                 | Kattaa                                                  | Testejä |
| --------------------------------------------- | ------------------------------------------------------- | ------- |
| `tests/unit/gamification/xp.test.ts`          | XP-laskenta, tasokäyrä, nimikkeet                       | 8       |
| `tests/unit/gamification/badges.test.ts`      | Merkkikriteerien täsmäytys ja myöntäminen               | 10      |
| `tests/unit/gamification/streaks.test.ts`     | Putkilogiikka, virstanpylväät, reunatapaukset           | 7       |
| `tests/unit/gamification/leaderboard.test.ts` | Sijoituksen laskenta, sivutus, kierto                   | 8       |
| `tests/unit/gamification/sharing.test.ts`     | Siirrot, saldo, idempotenssi                            | 9       |
| `tests/unit/gamification/invites.test.ts`     | Luonti, lunastus, vanheneminen, itseviittaus            | 7       |
| `tests/unit/gamification/antiCheat.test.ts`   | Nopeusrajoitukset, z-pisteet, valvontalokikirjaus       | 6       |
| `tests/unit/gamification/events.test.ts`      | Tapahtumien lähetys, rinnakkaisjakelu, virheenkäsittely | 5       |

### Testien suorittaminen

```bash
# Kaikki pelillistämistestit
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# Yksittäinen testitiedosto
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Kattavuusvaatimukset

Tiedoston `CONTRIBUTING.md` mukaisesti kaikilla uusilla moduuleilla on oltava:

- Haarautumiskattavuus >= 80 %.
- Jokainen julkinen funktio testattuna vähintään kerran.
- Virhepolut testattuina (riittämätön saldo, vanhentuneet koodit, nopeusrajoitukset).

---

## Tiedostorakenne

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # Kaikki 8 taulua ja indeksit
      gamification.ts                  # Toimialueen CRUD-moduuli
    gamification/
      xp.ts                           # XP:n laskenta, tasokäyrä ja arvonimet
      badges.ts                       # Merkkien määritelmät, ehdot ja arviointi
      streaks.ts                      # Päivittäisten putkien seuranta
      leaderboard.ts                  # Sijoitusten laskenta, SSE ja kierrätys
      antiCheat.ts                    # Nopeusrajoitus, z-pisteet ja auditointi
      sharing.ts                      # Token-siirtojen tilikirja
      invites.ts                      # Kutsu- ja lunastuskoodit
      servers.ts                      # Yhteisöpalvelinten federaatio
      events.ts                       # Tapahtumien lähettäjä (integraatiopiste)
      notifications.ts                # SSE-ilmoitusvirta
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST-tulostaulu
        leaderboard/stream/route.ts   # Reaaliaikaiset SSE-päivitykset
        transfer/route.ts             # GET/POST-siirrot
        invite/route.ts               # GET/POST/DELETE-kutsukoodit
        invite/redeem/route.ts        # POST-koodin lunastus
        servers/route.ts              # GET/POST/DELETE-palvelimet
        federation/score/route.ts     # POST-pisteiden lähetys
        federation/leaderboard/route.ts # GET-tulostaulun nouto
        notifications/route.ts        # SSE-ilmoitukset
        anomalies/route.ts            # GET-poikkeamaraportit
        rotate/route.ts               # POST-salaisuuksien kierrätys
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Sijoitussivu
        profile/page.tsx               # XP-, merkki- ja putkisivu
        tokens/page.tsx                # Saldo-, siirto- ja kutsusivu
        gamification/admin/page.tsx    # Poikkeamien ylläpitovalvonta
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
    GAMIFICATION.md                    # Tämä asiakirja
```

---

## Migraatiostrategia

### Vaihe 1: Taustajärjestelmän ydin (PR 1)

- Migraatio `060_create_gamification.sql` (8 taulua).
- `src/lib/db/gamification.ts` (toimialuemoduuli).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- Integraatiopiste tiedostossa `chatCore.ts`.
- Yksikkötestit XP:lle, putkille ja tapahtumille.

### Vaihe 2: Merkit ja tulostaulu (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Merkkien määritelmät vakioissa.
- Tulostaulun API-reitit ja SSE-virta.
- Yksikkötestit merkeille ja tulostaululle.

### Vaihe 3: Jakaminen ja kutsut (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- Siirtojen ja kutsujen API-reitit.
- Yksikkötestit jakamiselle, kutsuille ja huijausten estolle.

### Vaihe 4: Federaatio ja hallintapaneeli (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- Federaation API-reitit.
- Hallintapaneelin sivut (tulostaulu, profiili, tokenit ja ylläpito).
- MCP-työkalujen rekisteröinti.

---

## Tulevaisuuden kehityskohteet

- **Kausitapahtumat**: määräaikaiset merkkisarjat ja tulostaulujen kaudet.
- **Tiimien tulostaulut**: käyttäjien ryhmittely organisaation tai yhdistelmän mukaan.
- **XP-kertoimet**: XP:n tehostaminen kampanjajaksojen aikana.
- **Saavutusten jakaminen**: jaettavien merkkikorttien luominen (OpenGraph-kuvat).
- **Mobiilipush-ilmoitukset**: webhook-pohjaiset ilmoitukset merkki- ja tasotapahtumista.
- **Tulostaulu-API**: julkinen API kolmansien osapuolten integraatioita varten.
