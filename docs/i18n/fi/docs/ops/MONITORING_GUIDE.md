# Monitoring & Observability Guide (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **Pähkinänkuoressa**: OmniRoute sisältää sisäänrakennetun kunnonvalvonnan, palveluntarjoajien autopilotin, kiintiöiden seurannan ja havainnoitavuuskytkennät. Tämä opas käsittelee hallintapaneelia, hälytyksiä ja vianmääritystä.

**Lähteet:**

- `src/lib/monitoring/observability.ts` — havainnoitavuuden tilannekuva
- `src/lib/monitoring/comboHealthAutopilot.ts` — yhdistelmien kunnon autopilotti
- `src/lib/monitoring/providerHealthAutopilot.ts` — palveluntarjoajien autopilotti
- `src/lib/monitoring/providerHealthMatrix.ts` — palveluntarjoajien kuntomatriisi
- `src/lib/localHealthCheck.ts` — paikallinen kuntotarkistus
- `src/lib/tokenHealthCheck.ts` — tunnisteiden uusimisen kunto
- `src/lib/proxyHealth.ts` — välityspalvelimen kuntovälimuisti (käsitellään tiedostossa PROXY_GUIDE.md)

---

## Hallintapaneelin sivut

OmniRoutessa on **3 valvontakerrosta**:

```
┌──────────────────────────────────────────────────────────────┐
│  Kerros 1: Järjestelmän kunto (palvelintaso)                  │
│  ├─ localHealthCheck.ts — tietokanta, portit, natiiviriippuvuudet │
│  ├─ db/healthCheck.ts — eheys, viiteavaimet, irralliset artefaktit │
│  └─ Hallintapaneeli: /dashboard/health                        │
├──────────────────────────────────────────────────────────────┤
│  Kerros 2: Palveluntarjoajien kunto (palveluntarjoajakohtainen vikasietoisuus) │
│  ├─ providerHealthAutopilot.ts — katkaisija, jäähdytysajat    │
│  ├─ providerHealthMatrix.ts — palveluntarjoaja-/mallikohtaiset kuntopisteet │
│  └─ Hallintapaneeli: /dashboard/providers                     │
├──────────────────────────────────────────────────────────────┤
│  Kerros 3: Reaaliaikainen havainnoitavuus (ajonaikaiset tilannekuvat) │
│  ├─ observability.ts — katkaisijat, istunnot, kiintiö         │
│  ├─ tokenHealthCheck.ts — OAuth-tunnisteiden uusimisen kunto  │
│  └─ MCP-työkalut: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Hallintapaneelin sivut

### `/dashboard/health` (Järjestelmän kunto)

Ylimmän tason kuntohallintapaneeli näyttää:

| Osio                              | Mitä se näyttää                                                          |
| --------------------------------- | ------------------------------------------------------------------------ |
| **Palvelimen tila**               | Käyttöaika, versio, portti, aktiiviset yhteydet                          |
| **Tietokanta**                    | Yhteys, eheys, WAL-koko, viimeaikaiset migraatiot                        |
| **Palveluntarjoajien yhteenveto** | Aktiivisten määrä, kunnossa olevien määrä, avoimien katkaisijoiden määrä |
| **Kiintiövalvonnat**              | Aktiiviset istunnot, hälyttävät, loppuun käytetyt                        |
| **Viimeisimmät virheet**          | 10 viimeisintä virhettä pinojäljityksineen                               |
| **Resurssien käyttö**             | Muisti, CPU, kekomuistin paineen ilmaisin                                |

### `/dashboard/providers` (Palveluntarjoajien kunto)

Palveluntarjoajakohtainen hallintapaneeli:

| Sarake           | Kuvaus                                                          |
| ---------------- | --------------------------------------------------------------- |
| Palveluntarjoaja | Palveluntarjoajan tunnus + näyttönimi                           |
| Kunto            | Vihreä/keltainen/punainen tila                                  |
| Katkaisija       | Avoin/suljettu/puoliavoin tila                                  |
| Yhteydet         | Yhteyksien määrä, viimeisin päivitys                            |
| Mallit           | Saatavilla olevat mallit, mallikohtainen kunto                  |
| Kustannukset     | Tämän päivän kustannukset, 7 päivän trendi                      |
| Virheet          | Virheiden määrä viimeisen 24 tunnin aikana, yleisin virheluokka |

Napsauttamalla palveluntarjoajaa näet:

- Viimeaikaiset pyynnöt viive-erittelyineen
- Yhteyskohtaiset kuntopisteet
- Mallikohtaiset lukitukset
- Autopilotin suositukset

### `/dashboard/quota` (Kiintiöiden seuranta)

Kullekin API-avaimelle:

- Nykyinen käyttö suhteessa rajaan (edistymispalkki)
- Kiintiötrendi (30 päivän kaavio)
- Seuraavan nollauksen ajankohta
- Hälytyshistoria

### `/dashboard/combos` (Yhdistelmien kunto)

Yhdistelmäkohtaisesti:

- Strategia + kohteet
- Kohdekohtainen kunto
- Viimeaikaiset varakohteeseen siirtymiset
- Onnistumisaste (24 h, 7 pv, 30 pv)

---

## Kuntotarkistus-API

OmniRoute tarjoaa **kaksi** HTTP-kuntotarkistuspintaa. Ne eivät ole keskenään vaihdettavissa orkestrointijärjestelmissä.

| Polku                        | Tarkoitus                                                                                      | Kuormitus                                      | Käyttökohde                                                                              |
| ---------------------------- | ---------------------------------------------------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `GET /healthz`               | Elinkaaren elossaolo-/valmiustila (`ok` / `starting` / `stopping`)                             | Vähäinen (vain vaihetilan lippu)               | Kubernetesin **readiness**; kevyt **liveness**, jos HTTP:tä on pakko käyttää             |
| `GET /api/monitoring/health` | Syvällinen järjestelmän ja palveluntarjoajien yhteenveto (tietokanta, keko, luettelomäärät, …) | Raskas (synkronista tietokanta-/valvontatyötä) | Koontinäytöt, syvälliset blackbox-tarkistukset, Dockerin sisäänrakennettu kuntotarkistus |

> **Huomautus:** Palveluntarjoajien kuntomatriisit, autopilot-ongelmat, kiintiövalvonta, tunnisteiden kunto ja `/api/monitoring/health`-reittiä yksityiskohtaisemmat viivetiedot ovat käytettävissä **MCP-työkalulla** `observability_snapshot` tai **koontinäytön** sivuilla — niille ei ole erillisiä REST-reittejä.

Molemmat reitit suoritetaan **samassa Noden tapahtumasilmukassa** kuin pyyntöjen käsittely. Suoritinta kuormittava polku (suuren `GET /v1/models`-luettelon käsittely, pitkän kontekstin pakkaus / tunnisteiden laskenta) voi viivästyttää **kaikkia** HTTP-käsittelijöitä, myös `/healthz`-reittiä. Varattu tapahtumasilmukka ≠ kuollut prosessi. Korjaa ensisijaisesti kuormituksen aiheuttaja; tarkistusten säätäminen vain vähentää virheellisiä lopetuksia.

### Kevyt orkestrointitarkistus

```bash
GET /healthz
# tai HEAD /healthz
```

- **200** + runko `ok`, kun palvelimen elinkaarivaihe on valmis
- **503** + `starting` / `stopping` käynnistyksen tai sammutuksen aikana
- Toteutus: `src/app/healthz/route.ts` (ei tietokannan ping-tarkistusta)

### Järjestelmän kunto (syvällinen)

```bash
GET /api/monitoring/health
```

Vastaus:

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth`: tarkistusvälimuisti vs. SQLiten `test_status`

`GET /api/monitoring/health` → `credentialHealth` on **muistissa olevan tarkistusvälimuistin
mittari**, ei `provider_connections.test_status`-kentän reaaliaikainen vedos. Muutoksen #12532 jälkeen
pyyntöpolku lukee vain `getCachedCredentialHealthSummary()`-funktion; taustatarkistukset
päivittävät välimuistin tapahtumasilmukan ulkopuolella.

| Kerros                         | Sijainti                                                              | Merkitys                                                                                                                                                                                                                     |
| ------------------------------ | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tarkistusvälimuistin mittari   | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Viimeisimmät tunnistetietojen kuntotarkistustulokset, jotka ovat edelleen prosessin muistissa. `source` on aina `probe-cache`.                                                                                               |
| Epäonnistuneen yhteyden tiedot | `credentialHealth.failedConnections`                                  | Mukana **vain, kun `failed > 0`**. Rajattu luettelo välimuistiriveistä, joilla on `status=error` (`connectionId`, `status`, puhdistettu `lastError` / `lastErrorType`). `failedOmitted` asetetaan, kun luetteloa on rajattu. |
| SQLiten pysyvä tila            | `credentialHealth.staleDbNonOkCount`                                  | Niiden **aktiivisten** (`is_active=1`) yhteysrivien määrä, joiden tallennettu `test_status` on tunnettu ei-hyvä tila (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).                      |

Nämä kaksi kerrosta voivat tarkoituksella olla ristiriidassa:

- Mittarin `failed=0`, kun `staleDbNonOkCount>0` — SQLitessa on edelleen pysyvä
  `test_status` (esimerkiksi `expired` tai `credits_exhausted`), jota viimeisin
  tarkistusvälimuistin tilannevedos ei laske tilaksi `status=error`.
- Mittarin `failed>0`, vaikka SQLite näyttää terveeltä — äskettäinen tarkistus epäonnistui ja tulos on
  välimuistissa; tietokantariviä ei ole päivitetty tai se on myöhemmin tyhjennetty.

Älä muodosta hälytystä pelkästään `provider_connections.test_status`-kentän perusteella, kun keräät tietoja tästä
päätepisteestä. Käytä arvoja `failed` + `failedConnections` reaaliaikaisiin tarkistusvirheisiin ja
arvoa `staleDbNonOkCount`, kun tarvitset tallennettujen pysyvien tilojen määrän.

### Kubernetes-tarkistusten suositukset

OmniRoute on **yksi Node-prosessi** (yksi tapahtumasilmukka). Dockerin vakio-`HEALTHCHECK` kohdistuu kevyeen `/healthz`-reittiin. `/api/monitoring/health` on **liian raskas** kubeletin liveness-tarkistusväleille.

| Koetin                    | Suositeltu kohde                                                                             | Huomautukset                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Käynnistys**            | HTTP `GET /healthz` pitkällä `failureThreshold`-arvolla (tai suurella `startPeriod`-arvolla) | Kylmäkäynnistys + SQLite-migraatio voivat kestää useita sekunteja                                                                                                                                                                                                                                                                                                                                                     |
| **Valmius**               | HTTP `GET /healthz`                                                                          | Elinkaaren tila `ok` / `starting` / `stopping` (200 vs 503). Tila vaihtelee silti, jos silmukka estyy suorittimeen sidotun työn vuoksi. **Useita sekunteja kestävä 200-vastaus ei merkitse tervettä tilaa** (#10303) — tapahtumasilmukka ei saanut suoritusaikaa ennen kuin 3 tavun käsittelijä suoritettiin                                                                                                          |
| **Elossaolo**             | HTTP `GET /livez` **tai TCP** pääpalveluportissa (`PORT`, oletus `20128`)                    | `/livez` ilmaisee vain prosessin olevan käynnissä (aina 200, jos käsittelijä suoritetaan). Se käyttää silti samaa tapahtumasilmukkaa — varattu ≠ kuollut, eikä se havaitse tapahtumasilmukan suoritusaikapulaa (#10303) TCP:tä paremmin. Suosi **TCP:tä**, jos HTTP-koettimet aikakatkaistaan luettelo- tai pakkauskuormassa; älä kummassakaan tapauksessa lopeta podia lyhyiden tapahtumasilmukan pysähdysten vuoksi |
| **Syvä terveystarkistus** | `GET /api/monitoring/health` ulkoisesta tarkistuspalvelusta                                  | Ei kubeletin `livenessProbe`-koettimeksi tai tiukaksi `readinessProbe`-koettimeksi                                                                                                                                                                                                                                                                                                                                    |

Esimerkkirakenne (säädä raja-arvot kylmäkäynnistyksen ja pakkauskuorman mukaan):

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # Tapahtumasilmukan pysähtyessä myös HTTP /livez voi aikakatkaista. TCP on
  # varovaisempi vaihtoehto:
  # tcpSocket:
  #   port: http
```

**Älä** kohdista kubeletin **elossaolotarkistusta** polkuun `/api/monitoring/health`. Kyseinen polku tekee todellista tietokanta- ja valvontatyötä ja aiheuttaa kuormituksessa vääriä hälytyksiä.

Aiheeseen liittyvät: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (koettimet tapahtumasilmukan ollessa varattu), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (luettelohinnoittelun resurssien ylikulutus), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (pakkauksen tokenien laskennan resurssien ylikulutus).

### Valinnainen pyyntöpolun työ (muisti, taidot, tokenien päivitys)

Muistin poiminta, taitojen lisääminen ja OAuth-tokenien päivitys jakavat **Node-päätapahtumasilmukan** `/healthz`-polun kanssa. Ne ovat hallintapaneelista käyttöön otettavia ominaisuuksia (`memoryEnabled`, `skillsEnabled`), eivät työntekijäsäiepooli. Katso [Ympäristö — tapahtumasilmukan kuormitus](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Palveluntarjoajan terveystila

> **Ei REST-päätepistettä.** Palveluntarjoajien terveystiedot ovat saatavilla MCP-työkalulla `observability_snapshot` tai hallintapaneelin `/dashboard/providers`-sivulla.

### Palveluntarjoajan tiedot

> **Ei REST-päätepistettä.** Palveluntarjoajakohtaiset tiedot ovat saatavilla hallintapaneelin `/dashboard/providers`-sivulla.

---

## Palveluntarjoajan kunnon autopilotti

`providerHealthAutopilot.ts`-moduuli on **itsekorjautuva järjestelmä**, joka:

1. Havaitsee palveluntarjoajan ongelmat (avoin katkaisija, jäähdytysajat, lukitukset ja kiintiövaroitukset)
2. Luo **suositeltuja toimia** niiden ratkaisemiseksi
3. Voi haluttaessa **suorittaa automaattisesti** vähäriskisiä toimia

### Havaitut ongelmatyypit

| Ongelman tyyppi              | Vakavuus   | Esimerkkitilanne                                       |
| ---------------------------- | ---------- | ------------------------------------------------------ |
| `provider_circuit_open`      | kriittinen | Katkaisija avautuu 5 epäonnistumisen jälkeen           |
| `provider_circuit_half_open` | varoitus   | Katkaisija testaa palautumista                         |
| `connection_cooldown`        | varoitus   | Yhteys on jäähdytystilassa 429-virheen jälkeen         |
| `stale_connection_error`     | varoitus   | Viimeisin päivitys epäonnistui yli 30 minuuttia sitten |
| `terminal_connection_error`  | kriittinen | OAuth-käyttöoikeus peruttu tai avain on virheellinen   |
| `inactive_connection`        | tieto      | Yhteys on poistettu käytöstä asetuksissa               |
| `model_lockout`              | varoitus   | Tietty malli on karanteenissa                          |
| `quota_monitor_warning`      | varoitus   | Kiintiöstä on käytetty vähintään 80 %                  |

### Luodut toimintotyypit

| Toiminto                       | Riski     | Kuvaus                                             |
| ------------------------------ | --------- | -------------------------------------------------- |
| `clear_provider_breaker`       | keskitaso | Palauta katkaisija suljettuun tilaan               |
| `clear_connection_cooldown`    | matala    | Poista yhteyden jäähdytystila                      |
| `clear_stale_connection_error` | matala    | Tyhjennä vanhentuneen virheen merkintä             |
| `clear_model_lockout`          | matala    | Ota karanteeniin asetettu malli uudelleen käyttöön |
| `reactivate_connection`        | keskitaso | Ota käytöstä poistettu yhteys uudelleen käyttöön   |
| `deactivate_connection`        | korkea    | Poista ongelmallinen yhteys käytöstä               |

### API

> **Ei REST-päätepistettä.** Autopilotin ongelmat ovat saatavilla MCP-työkalun `observability_snapshot` tai hallintapaneelin kautta. Autopilotti suoritetaan sisäisesti. Sen toiminta määritetään asetustietokannassa yhteyskohtaisen `autopilotMode`-kentän avulla, ei ympäristömuuttujilla — autopilottitilan ympäristömuuttujan etsiminen komennolla `grep -rn` ei tuota yhtään osumaa.

### Autopilottitila

Autopilotti toimii oletusarvoisesti **manuaalisessa tilassa** — se havaitsee ongelmat ja luo suositeltuja toimia, mutta ei ota niitä käyttöön automaattisesti. Toiminnot voidaan ottaa käyttöön hallintapaneelin kautta.

---

## Yhdistelmien kunnon autopilotti

`comboHealthAutopilot.ts` on palveluntarjoajan autopilotin **yhdistelmäkohtainen** vastine. Se:

- Havaitsee epäkuntoiset yhdistelmät
- Suosittelee kohteiden järjestyksen muuttamista
- Ehdottaa viallisten kohteiden poistamista käytöstä
- Poistaa toimimattomat kohteet automaattisesti N epäonnistumisen jälkeen

### Esimerkkejä yhdistelmien ongelmista

```
Yhdistelmä "always-on" (prioriteettistrategia)
├─ Kohde 1: openai/gpt-5 (kunnossa)
├─ Kohde 2: anthropic/claude-opus-4-6 (⚠️ malli lukittu klo 14.00 asti)
└─ Kohde 3: kiro/claude-sonnet-4-5 (kunnossa)

Suositeltu toiminto: Muuta järjestystä — siirrä kiro anthropicin edelle, kunnes lukitus päättyy
```

---

## Kiintiömonitorit

`observability.ts` tarjoaa **istuntokohtaiset kiintiömonitorit** tilauspohjaisille palveluntarjoajille (Claude Code, Codex, GitHub Copilot):

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0–100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### Tilojen merkitykset

| Tila        | Ajankohta                       | Käyttöliittymän toiminto                                |
| ----------- | ------------------------------- | ------------------------------------------------------- |
| `starting`  | Ensimmäinen kysely on käynnissä | Latausilmaisin                                          |
| `idle`      | Ei viimeaikaista toimintaa      | Piilotetaan hallintapaneelista                          |
| `healthy`   | Kiintiöstä on jäljellä > 50 %   | Vihreä piste                                            |
| `warning`   | Kiintiöstä on jäljellä < 50 %   | Keltainen varoitus                                      |
| `exhausted` | Kiintiö = 0 %                   | Punainen esto, reititys seuraavalle palveluntarjoajalle |
| `error`     | Kysely epäonnistui              | Punainen piste, uusi yritys pian                        |

### API

> **Ei REST-päätepistettä.** Kiintiömonitorien tiedot ovat saatavilla MCP-työkalun `observability_snapshot` tai hallintapaneelin kautta.

---

## Havainnoitavuuden tilannekuva

MCP-työkalu `observability_snapshot` palauttaa tekoälyagenteille **täydellisen järjestelmän tilannekuvan**:

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* katso yllä */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Agentit käyttävät tätä **reitityspäätösten** tekemiseen — esimerkiksi: "jos openai-palvelun piiri on avoinna, reititä ensin anthropic-palveluun".

---

## Tokenin kuntotarkistus

OAuth-palveluntarjoajat (Claude Code, GitHub Copilot, Cursor) tarvitsevat **säännöllistä tokenin päivittämistä**. `src/lib/tokenHealthCheck.ts` suorittaa tausta-ajastinta:

- **Tarkistusjakso**: 60 sekunnin välein (tarkistus kohdassa `TICK_MS = 60 * 1000` tiedostossa `src/lib/tokenHealthCheck.ts:30`)
- **Yhteyskohtainen kuntotarkistusväli**: oletusarvoisesti 60 minuuttia (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); määritettävissä asetustietokannan kautta
- **Ennakoiva päivitys 401-virheen yhteydessä**: yhteyskohtainen sieppaaja käsittelee tämän

### Tokenin kuntotila

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### Määritykset

`tokenHealthCheck.ts` käsittelee tokenin kuntotarkistuksen määritykset sisäisesti.

### Tokenin kunto

> **Ei REST-päätepistettä.** Tokenin kuntotiedot ovat saatavilla hallintapaneelissa tai MCP-työkalulla `observability_snapshot`.

---

## Hälytykset

### Sisäänrakennetut kanavat

OmniRoute tukee **kolmea hälytyskanavaa**:

| Kanava                   | Käyttöönotto  | Käyttötapaus                       |
| ------------------------ | ------------- | ---------------------------------- |
| Hallintapaneelin banneri | Aina käytössä | Sovelluksen sisäiset ilmoitukset   |
| Webhook                  | Määritä URL   | Slack, Discord, PagerDuty          |
| Loki                     | Oletus        | Ulkoista lokien koostamista varten |

### Webhook-määritykset

> **Huomautus:** Webhook-hälytysten määrityksiä hallitaan hallintapaneelin Asetukset-sivulla. Katso webhook-URL-osoite, tapahtumien suodatus ja hyötykuorman mukautus Asetukset-käyttöliittymästä.

### Hälytystyypit

| Hälytys                      | Milloin                                           | Oletusvakavuus |
| ---------------------------- | ------------------------------------------------- | -------------- |
| `provider_circuit_open`      | Piiri avautuu                                     | kriittinen     |
| `provider_circuit_half_open` | Piirin palautumista testataan                     | tieto          |
| `quota_warning`              | Kiintiöstä käytetty vähintään 80 %                | varoitus       |
| `quota_exhausted`            | Kiintiöstä käytetty 100 %                         | kriittinen     |
| `token_refresh_failed`       | Vähintään 3 peräkkäistä päivitysvirhettä          | varoitus       |
| `token_expired`              | Token on vanhentunut                              | kriittinen     |
| `combo_target_unhealthy`     | Yhdistelmäkohde jäähtymistilassa vähintään tunnin | varoitus       |
| `db_integrity_warning`       | Viiteavainrikkomuksia yli 0                       | varoitus       |
| `heap_pressure`              | Keon käyttö ylittää 80 % kynnysarvosta            | varoitus       |

---

## Suorituskykymittarit

### Seurattavat mittarit

| Mittari                 | Tyyppi      | Lähde                           |
| ----------------------- | ----------- | ------------------------------- |
| `request_count`         | laskuri     | `services/usage.ts`             |
| `request_latency_ms`    | histogrammi | `services/usage.ts`             |
| `tokens_consumed`       | laskuri     | `services/usage.ts`             |
| `cost_usd`              | laskuri     | `services/usage.ts`             |
| `provider_errors`       | laskuri     | `services/errorClassifier.ts`   |
| `circuit_state_changes` | laskuri     | `services/resilience.ts`        |
| `cache_hits`            | laskuri     | `services/signatureCache.ts`    |
| `compression_savings`   | histogrammi | `services/compression/stats.ts` |
| `quota_used`            | mittari     | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | mittari     | `observability.ts`              |

### Viiveen prosenttipisteet (p50/p95/p99)

> **Ei REST-päätepistettä.** Viiveen prosenttipistetiedot ovat saatavilla hallintapaneelin `/dashboard/health`-sivulla. Prometheus/OpenTelemetry-vienti on suunniteltu versioon v3.9.

### Prometheus-/OpenTelemetry-vienti (vaihe 2)

Versioon v3.9 on suunniteltu natiivi vienti Prometheukseen, OpenTelemetryyn ja Datadogiin.

Toistaiseksi kerää tiedot päätepisteestä `/api/monitoring/health` millä tahansa HTTP-pohjaisella valvontajärjestelmällä (Prometheus blackbox exporter, Datadog HTTP check jne.).

---

## Hälytysratkaisut

### Slack

> **Huomautus:** Webhook-hälytykset määritetään hallintapaneelin Asetukset-sivulla — niille ei ole erillisiä webhook-ympäristömuuttujia (`grep -rn` ei löydä yhtään osumaa). Katso webhook-URL-osoitteen, tapahtumien suodatuksen ja hyötykuorman mukauttamisen asetukset Asetukset-käyttöliittymästä.

### Discord

> Webhook-hälytykset määritetään samalla Asetukset-käyttöliittymän työnkululla kuin Slackissa. Discord hyväksyy samanmuotoisen JSON-hyötykuorman.

### PagerDuty

> Webhook-hälytykset määritetään samalla Asetukset-käyttöliittymän työnkululla. PagerDuty Events API v2:n reititysavaimet määritetään Asetukset-käyttöliittymässä.

### Mukautettu webhook (JSON)

> Mikä tahansa HTTP-päätepiste, joka hyväksyy JSON-rungon sisältävän POST-pyynnön, toimii. Määritä URL-osoite Asetukset-käyttöliittymässä.

---

## Hallintapaneelin määritys

### Kuntotilapaneelin mukauttaminen

Luo tiedosto `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Palveluntarjoajan kiinnittäminen ylimmäksi

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Vianmääritys

### "Palveluntarjoaja ilmoittaa olevansa kunnossa, mutta pyynnöt epäonnistuvat"

1. Tarkista **autopilot-ongelmat** — jokin malli voi olla lukittu pois käytöstä
2. Tarkista kyseisen virheluokan tiedot kohdasta **viimeaikaiset virheet**
3. Kokeile palveluntarjoajakortin **yhteystestiä**
4. Tarkista, onko palveluntarjoajan **nopeutta rajoitettu ylävirrassa** (ei näy paikallisesti)

### "Kiintiö näyttää olevan kunnossa, mutta saan 429-virheitä"

- 429 tarkoittaa, että palveluntarjoajan mukaan olet käyttänyt kiintiösi
- OmniRouten kiintiöseuranta voi olla **vanhentunut** — palveluntarjoajan ylävirran tieto on ratkaiseva
- Kiintiötiedot päivittyvät automaattisesti sisäisen kiintiövalvonnan kautta

### "Yhdistelmä epäonnistuu, vaikka kaikki kohteet näyttävät olevan kunnossa"

- Tarkista **yhdistelmän kunto** -hallintapaneelista kohteiden järjestykseen liittyvät ongelmat
- Tarkista **varajärjestelytapahtumat** — yhdistelmä saattaa käydä vaihtoehdot läpi liian nopeasti
- Varmista, että **strategia** vastaa käyttötapaustasi (prioriteetti, vuorottelu tai automaattinen)

### "Tietokannan kuntotarkistus epäonnistuu"

- Suorita `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"`
- Jos tulos on "ok" — kyseessä on väärä hälytys, ja kuntotarkistus on liian tiukka
- Jos tulos on jokin muu — **pysäytä OmniRoute** ja noudata [katastrofipalautusopasta](./DATABASE_GUIDE.md#disaster-recovery)

### "Muistikeon paine on kriittinen"

```bash
# Tarkista nykyinen keko
node -e "console.log(process.memoryUsage())"

# Käynnistä roskienkeruu manuaalisesti (jos --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Vähennä samanaikaisten pyyntöjen määrää (määritä hallintapaneelin Asetukset-sivulla, ei ympäristömuuttujalla)
# `MAX_CONCURRENT_REQUESTS`-ympäristömuuttujaa ei ole — määritä asetus kohdassa Asetukset → Samanaikaisuus.
```

---

## Katso myös

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — käytön ja kustannusten seuranta
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — tietokantaskeema ja kunto
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — välityspalvelimen kunto (erillinen välimuisti)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — järjestelmäarkkitehtuuri
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — katkaisijan yksityiskohdat
- Lähdekoodi: `src/lib/monitoring/` (4 tiedostoa, 2121 koodiriviä)
