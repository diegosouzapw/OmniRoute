# Quota Sharing Engine (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Dokumenttiviite**: `docs/routing/QUOTA_SHARE.md`
> Osa ryhmää B (suunnitelmat 16 + 22).

---

## Yleiskatsaus

Kiintiönjakojärjestelmä jakaa palveluntarjoajan aikaperusteisen kiintiön (esim. Codexin
5 tunnin ikkuna, Kimin 1500 pyyntöä/h) oikeudenmukaisesti useille API-avaimille, jotka käyttävät
samaa yhteyttä.

**Ratkaistava ongelma:** OmniRoute välittää useiden API-avainten pyynnöt samalle ulkoisen
palveluntarjoajan tilille. Ilman jakologiikkaa avaimen A aiheuttama kuormituspiikki voi kuluttaa
palveluntarjoajan koko tuntikiintiön, jolloin avaimet B ja C estetään, kunnes ikkuna nollautuu.
Järjestelmä estää tämän seuraavasti:

1. Se seuraa kunkin avaimen liukuvaa kulutusta ulottuvuuksittain (%, pyynnöt, tokenit, $).
2. Se käyttää työtä säästävää oikeudenmukaisen jaon algoritmia: avain voi lainata käyttämättömistä
   osuuksista niin kauan kuin globaali varanto ei ole ylikuormittunut.
3. Se panee tuloksen täytäntöön suorituskykykriittisellä polulla (`chatCore.ts`) ennen kuin pyyntö
   saavuttaa ulkoisen suorittajan.

---

## Algoritmi: työtä säästävä oikeudenmukainen jako

Toteutettu tiedostossa `src/lib/quota/fairShare.ts`.

### Tilat

| Ehto                                       | Tila         | Toiminta                                                                   |
| ------------------------------------------ | ------------ | -------------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Antelias** | Avain voi lainata globaaliin rajaan asti vähennettynä kokonaiskulutuksella |
| `globalUsedPercent >= saturationThreshold` | **Tiukka**   | Yksilöllistä oikeudenmukaista osuutta noudatetaan tiukasti                 |

Oletusarvo on `saturationThreshold = 0.5` (ympäristömuuttuja `QUOTA_SATURATION_THRESHOLD`).

### Ulottuvuuskohtainen päätös

Järjestelmä laskee jokaiselle varannon aktiiviselle ulottuvuudelle:

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = tämän avaimen nykyinen liukuva arvo (lähteestä QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Tämän jälkeen:

- **`policy = hard`**: jos `consumed > fairShareAllowed` ja tila on tiukka → **estä**.
- **`policy = soft`**: jos `consumed > fairShareAllowed` ja tila on tiukka → **rankaise** (laske yhdistelmän prioriteettia; älä koskaan estä kokonaan).
- **`policy = burst`**: salli oikeudenmukaisesta osuudesta riippumatta niin kauan kuin globaalissa varannossa on kapasiteettia.

### Absoluuttinen yläraja

Kohdistuksen `capValue` + `capUnit` muodostavat kiinteän ylärajan tilasta tai
käytännöstä riippumatta. Pyyntö **estetään** aina, jos missä tahansa ulottuvuudessa
`consumed >= capValue`.

### Moniulotteinen tarkistus

Pyyntö estetään, jos **mikä tahansa** varannon ulottuvuus edellyttää sen estämistä. Ulottuvuudet
ovat toisistaan riippumattomia — 5h%-ulottuvuuden ehtyminen ei vaikuta weekly%-ulottuvuuteen.

### Lainaaminen

Anteliaassa tilassa avain, jonka kohdistus on alikäytetty, voi hyödyntää muiden
avainten kohdistamattomien osuuksien ylijäämää. Kaava on:

```
maxAllowed = globalLimit - consumedByOtherKeys
```

missä `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Globaali yläraja
(varannon kyseisen ulottuvuuden `limit`) on aina ehdoton yläraja.

---

## Liukuvan ikkunan laskuri

Toteutettu tiedostoissa `src/lib/quota/sqliteQuotaStore.ts` ja `redisQuotaStore.ts`.

Kaksi säiliötä kutakin `(apiKeyId, dimensionKey)`-paria kohden:

- `curr`: nykyinen säiliö (`floor(nowMs / windowMs)`)
- `prev`: edellinen säiliö (`curr - 1`)

Efektiivinen liukuva arvo:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Tarkkuus**: noin 99 %. Virhe on enintään 1 % ikkunan koosta säiliöiden
rajalla (2 säiliön approksimaatiolle luontainen ominaisuus).

### Samanaikaisuus

SQLite-ajuri: muistissa oleva mutex-lukko kutakin `(apiKeyId | dimensionKey)`-avainta kohden estää
luku–muokkaus–kirjoitus-kilpatilanteen. Malli vastaa tiedoston `src/sse/services/auth.ts` ruuhkapiikkien vastaista toteutusta.

Redis-ajuri: Lua EVAL -komentosarja atomiseen kasvatukseen — suoritetaan yhtenä Redis-komentona.

---

## Ajurit

### SQLite (oletus, ei asennusta)

- Taulu: `quota_consumption` (katso migraatiot `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Soveltuu parhaiten yhden instanssin käyttöönottoihin.
- Kaikki pysyväistallennus tapahtuu nykyisessä OmniRoute SQLite -tietokannassa (`DATA_DIR/storage.sqlite`).

### Redis (valinnainen, useita instansseja)

- Edellyttää `ioredis`-npm-pakettia.
- Laskurit tallennetaan Redisiin; metatiedot (poolit/kiintiövaraukset) säilyvät edelleen SQLitessä.
- Soveltuu parhaiten usean replikan käyttöönottoihin, joissa laskurit on jaettava.

### Ajurin vaihtaminen

Asetuskäyttöliittymän kautta (`/dashboard/settings` → Kiintiötallennus) tai ympäristömuuttujilla:

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Tietokanta-asetus ohittaa ympäristömuuttujan. Jos `driver=redis`, mutta URL-osoite puuttuu tai
`ioredis` ei ole asennettuna, tehdas palautuu SQLiteen ja kirjaa varoituksen.

Ajurin valintajärjestys:

1. Tietokanta-asetus `quotaStore.driver`
2. Ympäristömuuttuja `QUOTA_STORE_DRIVER`
3. Oletus: `sqlite`

---

## Moniulotteisuus

Poolilla voi olla useita ulottuvuuksia. Jokainen ulottuvuus on itsenäinen:

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // poolin globaali yläraja tälle ulottuvuudelle
}
```

**Esimerkki: Codex-paketti** (5h% + viikoittainen %):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Pyynnön on täytettävä kaikkien ulottuvuuksien ehdot, jotta se sallitaan.

---

## Paketin selvittäjä

Toteutettu tiedostossa `src/lib/quota/planResolver.ts`.

Prioriteettijärjestys (korkeimmasta matalimpaan):

1. **Manuaalinen tietokantaohitus** — `provider_plans`-taulu, `connectionId`-kohtaisesti.
2. **Tunnettu luettelo** — `src/lib/quota/planRegistry.ts` (vain dataa).
3. **Tyhjä paketti** — ei ulottuvuuksia, manuaalinen määritys vaaditaan.

### Tunnettu luettelo

| Palveluntarjoaja      | Ulottuvuudet                                                  |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, tuntematon), `tokens/weekly`            |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Ei oletusta — manuaalinen määritys vaaditaan                  |

---

## Integrointi käsittelyputkeen

### PRE-koukku (`open-sse/handlers/chatCore.ts`)

Suoritetaan ennen ylävirran suorittajaa todennuksen ja käytäntötarkistusten jälkeen:

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() ulottuvuuskohtaisesti
      → fairShare.decideFairShare()
      → jos estetään → palauta 429 (buildErrorBody, ehdoton sääntö #12)
      → jos sallitaan + prioriteettia alennetaan → aseta ehdokkaalle quotaSoftPenalty=true
  → executor.execute()
```

**Salli virhetilanteessa**: jos `enforceQuotaShare` aiheuttaa poikkeuksen, pyyntö sallitaan
ja tapahtuma kirjataan `pino.warn`-lokimerkintänä. Tämä estää kiintiömoottorin virhettä estämästä kaikkea
liikennettä.

### POST-koukku (kulutuksen kirjaaminen)

Onnistuneen vastauksen jälkeen:

```
suorittaja palauttaa onnistumisen
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() ulottuvuuskohtaisesti
      → salli virhetilanteessa: virheet kirjataan pino.warn-merkintöinä, eikä niitä koskaan välitetä asiakkaalle
```

**Poikkeamahuomautus**: jos `consume` epäonnistuu vastauksen jälkeen, liukuva laskuri aliarvioi kulutuksen.
Palveluntarjoajan kyllästymissignaali (esim. `anthropic-ratelimit-unified-5h-utilization`)
korjaa globaalin arvion seuraavan pyynnön yhteydessä.

### Yhdistelmän pehmeä rangaistus (`open-sse/services/combo.ts`)

Kun `decision.deprioritize === true`:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // oletus 0.7
}
```

Rangaistus otetaan käyttöön kaikkien muiden pisteytystekijöiden jälkeen. Se pienentää kyllästyneen avaimen
valintatodennäköisyyttä automaattisessa yhdistelmässä estämättä sitä kokonaan.

---

## Käyttöliittymän läpikäynti

### `/dashboard/costs/quota-share` — Poolien pääsivu

Komponentit (kaikki hakemistossa `src/app/(dashboard)/dashboard/costs/quota-share/`):

| Komponentti            | Tarkoitus                                                                                 |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Johdantokortti, joka selittää kiintiöiden jakamisen uusille käyttäjille                   |
| `CreatePoolModal`      | Luo uusi kiintiöpooli (yhteys + nimi + alkujaot)                                          |
| `PoolCard`             | Poolikohtainen yhteenveto: nimi, yhteys, jakojen määrä                                    |
| `DimensionBar`         | Ulottuvuuskohtainen pinottu palkki: kunkin avaimen osuus + kokonaiskäyttö                 |
| `AllocationTable`      | Taulukko, jossa näkyvät kulutus, oikeudenmukainen osuus, vaje/ylijäämä ja lainauksen tila |
| `BurnRateChart`        | EMA-kulutusnopeuden viivakaavio (laiskasti ladattu Recharts `dynamic()`-funktion avulla)  |
| `EditAllocationsModal` | Muokkaa poolin jakojen painotuksia, rajoja ja käytäntöjä                                  |

Sivun hookit:

- `usePools` — hakee `GET /api/quota/pools` 30 sekunnin välein.
- `usePoolUsage` — hakee pyydettäessä `GET /api/quota/pools/[id]/usage`.
- `useLocalStoragePoolMigration` — suoritetaan kerran mounttauksen yhteydessä vanhojen LS-tietojen siirtämiseksi.

### `/dashboard/costs/quota-share/plans` — Palveluntarjoajan paketin määritys

- `ProviderPlanConfigClient.tsx`: pudotusvalikko palveluntarjoajan valitsemiseen, ratkaistun
  paketin tarkasteluun (automaattisesti luettelosta tai manuaalinen ohitus) ja ulottuvuuksien muokkaamiseen.
- Muutokset kirjoitetaan osoitteeseen `PUT /api/quota/plans/[connectionId]`.
- Poistaminen palauttaa käyttöön luettelon paketin tai tyhjän paketin.

---

## Ympäristömuuttujat

| Muuttuja                           | Oletusarvo | Kuvaus                                                                     |
| ---------------------------------- | ---------- | -------------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`               | `sqlite`   | Käytettävä ajuri: `sqlite` tai `redis`                                     |
| `QUOTA_STORE_REDIS_URL`            | _(tyhjä)_  | Redis-URL, esim. `redis://localhost:6379`                                  |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`      | 0..1; `>= threshold` aktivoi tiukan tilan                                  |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`      | 0..1; pehmeän käytännön yhdistelmäpisteiden kerroin                        |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`       | Päivien määrä, jonka jälkeen GC poistaa vanhat `quota_consumption`-säiliöt |

Tietokanta-asetukset (`quotaStore.*`) ohittavat ympäristömuuttujat.

---

## Vianmääritys

### Redis on määritetty, mutta yhteyttä ei muodosteta

Tarkista, että `ioredis` on asennettu (`npm ls ioredis`) ja että `QUOTA_STORE_REDIS_URL`
on saavutettavissa. Jos yhteyden muodostaminen epäonnistuu, tehdas käyttää SQLitea
varajärjestelmänä (kirjataan `warn`-tasolla).

### `peek` palauttaa vanhentuneen tuloksen / sallii virhetilanteessa

Jos `peek` heittää poikkeuksen, `enforceQuotaShare` käsittelee tuloksen "sallittuna"
(virhetilanteessa salliva toiminta). Selvitä perimmäinen syy tarkistamalla `pino`-lokien
`quota:enforce`- ja `quota:factory`-merkinnät.

### Kulutuslaskurin poikkeama

Jos palveluntarjoajan todellinen käyttö poikkeaa laskureista, se on odotettua —
kahden säiliön liukuvassa ikkunassa on noin 1 %:n virhe ikkunan rajoilla, ja `consume`
suoritetaan vastauksen jälkeen asynkronisesti ilman tuloksen odottamista. Kyllästymissignaali (`saturationSignals.ts`)
lukee palveluntarjoajan todellisen käyttöasteen 30 sekunnin TTL-arvolla ja säätää `globalUsedPercent`-arvoa
sen mukaisesti.

### Poolissa näkyy kulutusnopeudelle "ei tietoja"

`computeBurnRate` edellyttää vähintään kahta historiallista näytettä. Uusissa pooleissa, joissa
`consume`-kutsuja ei ole tehty aiemmin, näkyy `tokensPerSecond: 0` ja `timeToExhaustionMs: null`.

---

## Siirtyminen localStoragesta

Kun `/dashboard/costs/quota-share` ladataan ensimmäisen kerran, koukku `useLocalStoragePoolMigration`
tarkistaa seuraavat ehdot:

1. `localStorage.getItem("omniroute:quota-share:pools")` ei ole tyhjä.
2. `GET /api/quota/pools` palauttaa arvon `[]` (tietokanta on tyhjä).

Jos molemmat ehdot täyttyvät, jokainen vanha pooli lähetetään eräajona osoitteeseen
`POST /api/quota/pools`, minkä jälkeen localStorage-avain poistetaan. Siirtyminen on idempotentti:
ehto 2 estää siirtymisen suorittamisen uudelleen.

---

## Sisäisen strategian luokittelu

`quota-share` on **vain sisäiseen käyttöön tarkoitettu** reititysstrategia (`INTERNAL_ROUTING_STRATEGY_VALUES`
tiedostossa `src/shared/constants/routingStrategies.ts`). Sitä käyttävät yksinomaan järjestelmän
luomat `qtSd/`-pooliyhdistelmät, ja se on tarkoituksella jätetty pois `ROUTING_STRATEGY_VALUES`-arvoista,
jotta se ei koskaan näy käyttäjän valittavissa olevana vaihtoehtona käyttöliittymässä tai API:ssa.

---

## Testikattavuus

Quota-share-moottorin mukana toimitetaan kaksi automaattisen testikattavuuden tasoa:

| Testisarja          | Komento                                                                | Mitä se kattaa                                                                                                                                                                                                                                                    |
| :------------------ | :--------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Yksikkö (29 testiä) | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR-ajastin, saturaatioportitus, rinnakkaisuusrajat, fairShare-laskenta, käsittelyjonoon asettaminen                                                                                                                                                              |
| Integraatiomatriisi | `npm run test:combo:matrix`                                            | Reitityspäätös päästä päähän todellisen yhdistelmäputken kautta; DRR-oikeudenmukaisuus ja saturoituneiden kohteiden prioriteetin alentaminen reaaliaikaisten liityntäkohtien avulla (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

Integraatiomatriisi suoritetaan CI:ssä kaikkien 19 julkisen strategian rinnalla. Yksikkötestisarja
voidaan suorittaa itsenäisesti.

---

## Yhteenveto tietokantaskeemasta

Migraatioissa `078`, `079` ja `085` lisättiin kolme taulua:

- `quota_pools` + `quota_allocations` — poolien määritelmät ja avainkohtaiset allokaatiot.
- `quota_consumption` — liukuvat kahden jakson laskurit kullekin `(apiKeyId, dimensionKey)`-parille.
- `provider_plans` — manuaaliset palveluntarjoajan pakettien ohitukset (ulottuvuudet JSON-muodossa kutakin connectionId-arvoa kohden).

Kaikki taulut lisätään idempotenteilla `CREATE TABLE IF NOT EXISTS`-migraatioilla.
