# Resilience Guide (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoutessa on kolme erillistä mutta toisiinsa liittyvää vikasietoisuusmekanismia. Jokaisella niistä on eri laajuus ja tarkoitus. Pidä ne erillään reitityksen toimintaa selvittäessäsi.

![Kolmikerroksinen vikasietoisuusmalli](../diagrams/exported/resilience-3layers.svg)

> Lähde: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Palveluntarjoajan katkaisija

**Laajuus:** koko palveluntarjoaja (esim. `glm`, `openai`, `anthropic`).

**Tarkoitus:** lopettaa liikenteen lähettäminen palveluntarjoajalle, joka epäonnistuu toistuvasti taustapalvelun tai palvelun tasolla.

**Toteutus:**

- Ydinluokka: `src/shared/utils/circuitBreaker.ts`
- Kytkentä: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Tila-API: `GET /api/monitoring/health`
- Nollaus-API: `POST /api/resilience/reset`
- Kääreet: `open-sse/services/accountFallback.ts`
- Tietokantataulu: `domain_circuit_breakers`

**Tilat:**

- `CLOSED` — normaali liikenne sallitaan
- `DEGRADED` — liikenne sallitaan edelleen, mutta palveluntarjoajan lisääntyneitä virheitä seurataan
- `OPEN` — palveluntarjoaja on väliaikaisesti estetty; yhdistelmäreititys ohittaa sen
- `HALF_OPEN` — nollauksen aikakatkaisu on kulunut; koepyyntö sallitaan

**Määritettävät oletusarvot (`open-sse/config/constants.ts`, käytettävissä kohdassa Hallintapaneeli → Asetukset → Vikasietoisuus):**

| Luokka      | Heikentyy kohdassa | Avautuu kohdassa | Nollauksen aikakatkaisu |
| ----------- | ------------------ | ---------------- | ----------------------- |
| OAuth       | 5 virhettä         | 8 virhettä       | 60s                     |
| API-avain   | 7 virhettä         | 12 virhettä      | 30s                     |
| Paikallinen | johdettu           | 2 virhettä       | 15s                     |

`degradationThreshold` määrittää, milloin palveluntarjoaja siirtyy tilaan `DEGRADED`; `failureThreshold` määrittää, milloin katkaisija avautuu ja palveluntarjoaja ohitetaan. Paikallisten palveluntarjoajien profiileja ei vielä näytetä vikasietoisuusasetusten sivulla.

**Laukaisukoodit:** vain palveluntarjoajatason tilakoodit `[408, 500, 502, 503, 504]`. ÄLÄ laukaise katkaisijaa tilitason virheistä (useimmat 401/403/429 — ne kuuluvat jäähdytyksen tai lukituksen käsiteltäviksi).

**Laiska palautuminen:** kun `OPEN` vanhenee, `getStatus()`, `canExecute()` ja `getRetryAfterMs()` päivittävät tilaksi `HALF_OPEN`. Tausta-ajastinta ei tarvita.

---

### Erikseen käyttöön otettava yleinen palveluntarjoajan jäähdytys (aikaikkunaportti)

Neljäs, **erikseen käyttöön otettava** kerros (`PROVIDER_COOLDOWN_ENABLED`, oletuksena **pois käytöstä**) ylläpitää
pyyntöjen välillä muistia epäonnistuvista palveluntarjoajista tiedostossa
`open-sse/services/providerCooldownTracker.ts`. Yhdistelmäkohteen
määritys käyttää sitä, jotta peräkkäiset yhdistelmäpyynnöt eivät käy uudelleen läpi juuri
epäonnistunutta palveluntarjoajaa. Palveluntarjoajatason merkinnät noudattavat `PROVIDER_PROFILES`-aikaikkunaporttia:

| Profiili  | laukeaa (`providerFailureThreshold`) jälkeen | aikavälillä (`providerFailureWindowMs`) | jäähdytysaika (`providerCooldownMs`) |
| --------- | -------------------------------------------: | --------------------------------------: | -----------------------------------: |
| OAuth     |                                         `10` |                                 `15min` |                               `5min` |
| API-avain |                                         `15` |                                 `30min` |                              `10min` |

Kynnyksen alapuolella palveluntarjoajaa **ei** katsota jäähdytettäväksi; onnistuminen tyhjentää
aikaikkunan. Yhteystason merkinnät (`provider:connectionId`) käyttävät sen sijaan edelleen
eksponentiaalista `minRetryCooldownMs → maxRetryCooldownMs`-viivettä. Ohitukset:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
Regressiosuojaus: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. Yhteyden jäähdytysaika

**Laajuus:** yksittäinen palveluntarjoajan yhteys/tili/avain.

**Tarkoitus:** ohittaa yksi viallinen avain samalla, kun muut saman palveluntarjoajan yhteydet jatkavat palvelemista.

**Toteutus:**

- Merkitse ei-käytettäväksi: `src/sse/services/auth.ts::markAccountUnavailable()`
- Valinta: `getProviderCredentials*` samassa tiedostossa
- Jäähdytysajan laskenta: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Asetukset: `src/lib/resilience/settings.ts`

**Yhteyskohtaiset kentät:**

- `rateLimitedUntil` — aikaleima, johon asti jäähdytysaika kestää
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — eksponentiaalisen viiveen laskuri

**Oletusjäähdytysajat:**

- OAuth-perusaika: 5 s
- API-avaimen perusaika: 3 s
- API-avaimen 429: käyttää ensisijaisesti ylävirran `Retry-After`-/nollausotsakkeita tai jäsennettävissä olevaa nollausaikatekstiä
- Viive: `baseCooldownMs * 2 ** failureIndex`

**Samanaikaisten pyyntöryöppyjen esto:** estää samanaikaisia virheitä pidentämästä jäähdytysaikaa liikaa tai kasvattamasta `backoffLevel`-arvoa kahdesti.

**Lopulliset tilat (EIVÄT jäähdytysaikoja):**

- `banned` — asetetaan kielletyn avainsanan / tilin eston tunnistuksen perusteella (katso [BAN_DETECTION](../security/BAN_DETECTION.md)) sekä kolmen peräkkäisen ylävirran pyyntökohtaisen hylkäyksen jälkeen (`request_rejected`, esim. Anthropic OAuth 403 "Pyyntöä ei sallita" — `open-sse/services/requestRejectedStreak.ts`); yksittäinen hylkäys vain asettaa yhteyden jäähdytystilaan
- `expired` (siirtyy lopulliseen tilaan rajatun määrän uudelleenyrityksiä jälkeen — `EXPIRED_RETRY_MAX = 3` eksponentiaalisella viiveellä — jotta tilapäiset OAuth-virheet voivat korjaantua itsestään ennen tilin pysyvää deaktivointia)
- `credits_exhausted`

Nämä säilyvät, kunnes tunnistetiedot muuttuvat tai operaattori nollaa ne. Älä korvaa lopullisia tiloja tilapäisellä jäähdytystilalla.

**Laiska palautuminen:** kun `rateLimitedUntil` on menneisyydessä, yhteys voidaan jälleen valita. Onnistuneen käytön yhteydessä `clearAccountError()` tyhjentää kaikki virhekentät.

### Claude OAuthin käyttöraja: alemman prioriteetin kaista + istuntorajan nollaus

**Laajuus:** yksi Claude-tilauksen (OAuth) yhteys. Molemmat ominaisuudet ovat **yhteyskohtaisesti valinnaisia**
(Muokkaa yhteyttä → Claude-osio → `lowPriorityMode` / `autoLimitReset` kohteessa
`providerSpecificData`, molemmat oletusarvoisesti poissa käytöstä), ja ne vastaavat Claude Coden `/low-priority`- ja
`/limit-reset`-komentoja (siirtosopimus tallennettu Claude Code 2.1.263:sta).

**Toteutus:**

- Tilakone + vastausten luokittelu: `open-sse/services/claudeLowPriority.ts`
- Nollaustilan/-varauksen asiakasohjelma: `open-sse/services/claudeLimitReset.ts`
- Suorittimen kytkentäkohta (otsakkeen lisäys + uudelleenyritys samalla tilillä): `open-sse/executors/base.ts::execute()`
- Valinnan pysyvä tallennus: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Laukaisin:** viiden tunnin käyttöraja — `429`, jonka otsakkeissa on
`anthropic-ratelimit-unified-status: rejected` ja, kun tili on kelvollinen,
`anthropic-ratelimit-unified-slow-offer: treatment`. Mitään ei lähetetä ennen ensimmäistä käyttörajan
429-vastausta; 429-ryöppy ilman yhtenäisiä otsakkeita käsitellään normaalin jäähdytyspolun kautta.

**Alemman prioriteetin kaista** (`lowPriorityMode`):

- Käyttörajan 429-vastauksen yhteydessä suoritin hyväksyy tarjouksen ja yrittää välittömästi uudelleen **samalla**
  tilillä käyttäen otsaketta `anthropic-usage-limit: slow`; kaista pysyy aktiivisena ilmoitettuun
  `anthropic-ratelimit-unified-reset`-ajankohtaan saakka (+60 s lisäaika), ja jokainen tämän aikaikkunan pyyntö sisältää
  otsakkeen. Siepattu 429-vastaus ei koskaan saavuta `handleChatCore`-käsittelijää, joten yhteyttä
  **ei** aseteta jäähdytystilaan eikä vaihdeta pois.
- Myöhempien vastausten `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed`
  säilyttävät kaistan; `slot_busy` (429) tai `529` odottavat palvelimen
  `anthropic-ratelimit-unified-slow-retry-after`-ajan (oletus 20 s, rajaus 5–600 s, ±30 % satunnaisvaihtelu)
  ja yrittävät uudelleen `anthropic-ratelimit-unified-slow-max-wait`-arvon rajoissa (oletus 20 min, rajaus
  1 min–6 h) — tämän jälkeen kaista päättyy ja 10 minuutin odotusaika estää tarjouksen hyväksymisen uudelleen. Odotus
  rajataan lisäksi pyynnön oman ylävirran aloituksen aikakatkaisun jäljellä olevaan aikaan
  (`resolveFetchStartTimeout`, oletuksena 10 min), josta vähennetään 5 s:n marginaali: ilman tätä rajausta
  20 minuutin oletusenimmäisodotus jatkuisi pyyntöä pidempään ja lepo keskeytyisi
  odotuksen aikana, jolloin näkyviin tulisi `TimeoutError` hallitun `max_wait`-päättymisen ja odotusajan sijaan.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, viiden tunnin aikaikkunan vaihtuminen tai
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (joka päättää kaistan tilaan
  `extra_usage` missä tahansa tilassa, koska maksullinen ylitys kattaa nyt käyttörajan) päättävät kaistan;
  vastaus siirtyy tämän jälkeen normaaliin jäähdytyspolkuun. `budget_exhausted` muistetaan ilmoitettuun
  budjetin nollaukseen asti (≤ 8 päivää).
- Käyttörajan tarkistus suoritetaan suorittimen omien 400-vastauksesta käynnistyvien yrityksen sisäisten uudelleenyritysten jälkeen (kontekstin
  muokkaus, ajattelun/ponnistuksen rajaukset, parametrien automaattinen oppiminen), joten vain yhden tällaisen uudelleenyrityksen aikana
  ilmenevä käyttörajan 429-vastaus siepataan edelleen sen sijaan, että se päätyisi jäähdytyspolkuun.
- Tila säilytetään muistissa yhteyskohtaisesti (uudelleenkäynnistys aiheuttaa yhden ylimääräisen käyttörajan 429-vastauksen ennen uutta hyväksyntää).

**Istuntorajan nollaus** (`autoLimitReset`, kokeillaan ennen kaistaa, kun molemmat ovat käytössä):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`-
  lohko; kun `arm: "reset"` ja `available: true`,
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` käyttäen
  `{ "program": "juniper_tide" }` (organisaation UUID kentästä
  `providerSpecificData.organizationUUID`, alustuksen varavaihtoehto).
- `result: reset|not_limited` → pyyntöä yritetään uudelleen täydellä nopeudella (ei hidastusotsaketta).
  `already_used` / `not_offered` tallentavat `next_available_at`-arvon (oletus yksi viikko);
  mikä tahansa virhe aiheuttaa 15 minuutin viiveen. Nollaus voidaan tehdä kerran viikossa, ja se lasketaan edelleen
  mukaan viikkorajaan.

Regressiosuojaukset: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Istuntokohtainen affiniteetti (#7274)

**Laajuus:** yksi asiakasistunto (`X-Session-Id`- / `x-codex-session-id`- / `x-omniroute-session`-otsake), joka on sidottu yhteen yhteyteen **millä tahansa** palveluntarjoajalla.

**Tarkoitus:** pitää monivaiheinen agentti (Claude Code, aider, mukautetut agentit) samalla tilillä pyyntöjen välillä, mikä vähentää tilien välisestä kontekstin menetyksestä aiheutuvia ongelmia ja toistuvia kylmäkäynnistyksen 429-virheitä palveluntarjoajilla, joilla istunnon tila on tilikohtainen.

**Toteutus:**

- TTL:n määritys: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Kiinnityksen valinta/luonti: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Otsakkeen poiminta (yleinen, mikä tahansa palveluntarjoaja): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Pysyvä kiinnitystaulu: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Asetus: `sessionAffinityTtlMs` (yleinen TTL millisekunteina, `0` poistaa käytöstä) — `src/lib/db/settings.ts`. Nimi muutettiin vain Codexia koskeneesta asetuksesta `codexSessionAffinityTtlMs` migraatiolla `124_generic_session_affinity_ttl.sql`, joka siirtää aiemmin määritetyn Codexin TTL-arvon uudeksi oletusarvoksi.

Ennen muutosta #7274 `resolveSessionAffinityTtlMs()` palautti välittömästi arvon `0` kaikille muille palveluntarjoajille paitsi `codex`, joten TTL-asetuksella (ja istunto-otsakkeilla) ei ollut vaikutusta muualla, vaikka kiinnitysmekanismi ja otsakkeiden poiminta olivat jo palveluntarjoajasta riippumattomia. Korjaus poisti tämän aikaisen palautuksen; TTL koskee nyt yhdenmukaisesti kaikkia palveluntarjoajia, kun sen yleiseksi arvoksi on asetettu enemmän kuin `0`.

Kolmea istunnon affiniteettiotsaketta ei koskaan välitetä eteenpäin ylävirtaan — suorittimet muodostavat omat ylävirran otsakkeensa alusta alkaen sen sijaan, että ne välittäisivät asiakkaan otsakkeet, joten tunniste säilyy vain sisäisenä korrelaatiotunnuksena.

### Hallittujen istuntoyhteyksien yksinomaiset vuokraukset

**Soveltamisala:** yksi aktiivinen hallittu HTTP-asiakas tai -istunto omistaa yhden kelvollisen OmniRoute-yhteyden.

**Tarkoitus:** tarjota pysyvä ja yksinomainen yhteyden omistajuus asiakkaille, jotka tarvitsevat tiukan reititysrajan
pyyntöjen välillä. Tämä eroaa istunnon affiniteetista, joka on pehmeä jatkuvuuspreferenssi:
yksinomainen vuokraus säilyttää elinkaaren tilan SQLitessä, varmistaa aktiivisen omistajan ja
aktiivisen yhteyden maailmanlaajuisen yksilöllisyyden sekä hylkää vanhentuneen sukupolven ennen palveluntarjoajalle välittämistä.

Ominaisuus otetaan käyttöön erikseen kullekin API-avaimelle. Hallitulla avaimella on oltava `lease:exclusive`-käyttöalue ja
eksplisiittinen, ei-tyhjä `allowedConnections`-luettelo. Mikä tahansa HTTP-asiakas voi käyttää elinkaaripäätepistettä;
asiakkaan nimeä, user-agent-arvoa, palveluntarjoajaa, OAuth-menetelmää tai mallia ei vaadita. Vuokraus omistaa yhteyden,
ei mallia, joten mallin vaihtaminen säilyttää sidoksen niin kauan kuin yhteys pysyy tavanomaisesti
kelvollisena. Tavanomaiset mallia, kiintiötä, toimintakuntoa, jäähtymisaikaa ja sallittujen kohteiden luetteloa koskevat säännöt pysyvät määräävinä ja voivat
siirtää saman sukupolven toiseen vapaaseen, kelvolliseen yhteyteen.

Elinkaaripäätepiste on `POST /api/v1/session-leases`, ja sen JSON-toiminnot ovat `acquire`, `renew` ja `release`.
Hallitut päättelypyynnöt välittävät läpinäkymättömän `X-OmniRoute-Lease-Owner`-arvon ja täsmällisen
`X-OmniRoute-Lease-Generation`-arvon. Omistajatunnus alkaa merkkijonolla `vlo_`, jota seuraa 43 base64url-merkkiä; vain
sen SHA-256-tiiviste tallennetaan. Jokainen lopullinen välitysraja sitoo myös todennetun API-avaimen tunnuksen ja
aktiivisen yhteyden tunnuksen. Vuokrauksen hallintaotsakkeet poistetaan lokeista, säilytetyistä pyyntövedoksista ja
ylävirran suorittimien otsakkeista.

Jos tavallisessa reitityksessä on kelvollisia hallittuja ehdokkaita mutta jokainen vapaa ehdokas on
vieraan aktiivisen vuokrauksen varaama, OmniRoute palauttaa HTTP-tilan `429`, koodin lease-capacity-unavailable,
kapasiteetin odotustilan ja rajatun `Retry-After`-arvon, joka johdetaan aikaisimmasta asiaankuuluvasta vanhentumisajasta.
Tavallinen tyhjä kelpoisuusjoukko ei ole vuokrauskiista, vaan säilyttää nykyisen reititysvirhesemantiikkansa.

Aiheeseen liittyvät mekanismit pysyvät erillisinä:

- OAuth-istunnon käyttöaste on prosessikohtaista pehmeää kuormanjakoa OAuth-tileille.
- Tilikohtaiset semaforit myöntävät pyyntöjen samanaikaisuusluvat ja päättyvät pyynnön valmistuessa.
- Hallittujen istuntoyhteyksien yksinomaiset vuokraukset tarjoavat pysyvän elinkaaren omistajuuden sukupolvirajalla.

---

## 3. Mallin lukitus

**Kattavuus:** palveluntarjoajan, yhteyden ja mallin muodostama kolmikko.

**Avaimen kattavuus tilan mukaan:** virhetilakoodi määrittää, mihin avaimeen lukitus
kirjoitetaan (`resolveLockoutScope()` tiedostossa `open-sse/services/accountFallback/exactModelLock.ts`):

- `429` / `403` / `402` — kiintiö- tai käyttöoikeussignaali — lukitsee **kiintiöperheen**:
  codexin tapauksessa yhteyden koko `codex`- / `spark`-alueen (kaikki yhteyden
  `gpt-5*`-mallit), muilla palveluntarjoajilla `getQuotaScopedModelForProvider()`.
- `404` lukitsee yksittäisen mallin (`getModelLockKey()` rajaa `not_found`-tilanteen).
- Mikä tahansa muu tila — `5xx`-siirto-/palvelinvirheet ja OmniRouten laadun
  validoinnista itse muodostama `502` — lukitsee vain **tarkan**
  palveluntarjoaja/yhteys/malli-kolmikon. Yhden mallin virheellinen tietovirta ei
  ole näyttöä tilin kiintiöstä; ennen tätä sääntöä yksi tyhjä vastaus mallilta
  `codex/gpt-5.6-luna` poisti yhteyden kaikki `gpt-5*`-mallit
  reitityksestä 2–30 minuutiksi (pitenevästi), vaikka sen kiintiöön ei ollut koskettu.
- Kutsujan eksplisiittinen `scope`-valinta on aina etusijalla (Antigravity välittää arvon `"exact"`).

**Tarkoitus:** estää koko yhteyden poistaminen käytöstä, kun vain yksi malli ei ole käytettävissä tai sen kiintiö on rajoitettu.

**Esimerkkejä:**

- Mallikohtaisten kiintiöiden palveluntarjoajat, jotka palauttavat tilan 429
- Paikalliset palveluntarjoajat, jotka palauttavat tilan 404 yhdestä puuttuvasta mallista
- Palveluntarjoajakohtaiset tila-/mallikohtaiset käyttöoikeusvirheet (esim. Grok-tilat)

**Toteutus:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### Mallien jäähyjen hallintapaneeli (v3.8.0)

Käyttöliittymä: Asetukset → Mallien jäähyt (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Luettelee aktiiviset lukitukset ja näyttää seuraavat tiedot: provider, connection, model, reason, expiresAt. Ylläpitäjät voivat ottaa mallin manuaalisesti uudelleen käyttöön kortista.

**REST-rajapinta:**

- `GET /api/resilience/model-cooldowns` — luettelee aktiiviset lukitukset
- `DELETE /api/resilience/model-cooldowns` — manuaalinen uudelleenkäyttöönotto. Runko: `{provider, connection, model}`. Todennus: hallinta.

### Lukitusasetusten käyttöliittymä + onnistumisiin perustuva palautuminen (v3.8.23)

Mallin lukitus muuttui aina käytössä olleesta, kovakoodatusta toiminnasta täysin
määritettäväksi, erikseen käyttöön otettavaksi ominaisuudeksi, jolla on oma asetuskorttinsa ja itsekorjautuva palautumispolku.

**Asetuskortti:** Asetukset → Mallin lukitus
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
Tämä **eroaa** yllä olevasta vain luku -muotoisesta `ModelCooldownsCard`-kortista
(joka ainoastaan _luettelee_ aktiiviset lukitukset) — uusi kortti _määrittää parametrit_. Oletusarvot
ovat `DEFAULT_MODEL_LOCKOUT_SETTINGS`-vakiossa
(`src/lib/resilience/modelLockoutSettings.ts`):

| Asetus                  | Oletusarvo                       | Merkitys                                                          |
| ----------------------- | -------------------------------- | ----------------------------------------------------------------- |
| `enabled`               | `false`                          | Pääkytkin — mallin lukitus on **oletusarvoisesti pois käytöstä**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Ylävirran tilakoodit, jotka lasketaan mallikohtaisiksi virheiksi. |
| `baseCooldownMs`        | `120_000` (120 s)                | Ensimmäisen virheen alkuperäinen lukitusaika.                     |
| `maxCooldownMs`         | `1_800_000` (30 min)             | Pidentyneen jäähyn yläraja.                                       |
| `maxBackoffSteps`       | `10`                             | Eksponentiaalisen viiveen pidennyksen enimmäisvaiheiden määrä.    |
| `useExponentialBackoff` | `true`                           | Pidentävätkö toistuvat virheet jäähyä eksponentiaalisesti.        |

Asetukset säilytetään normaalissa asetussäilössä ja validoidaan
resilienssiasetusten skeemalla; kortti rajoittaa arvoja `baseCooldownMs`/`maxCooldownMs`
(ehdolla `maxCooldownMs ≥ baseCooldownMs`) ja `maxBackoffSteps`.

**Onnistumisiin perustuva palautuminen:** palautuminen **ei** perustu pelkästään ajastimen umpeutumiseen. Toimiva
vastaus pienentää mallin virhelaskuria, joten kesken aikajakson palautuneen mallin
lukitusaika lakkaa pitenemästä (ja lukitus poistuu) ennen ajastimen umpeutumista. Kun yhdistelmäkohde
onnistuu, `open-sse/services/combo.ts` kutsuu funktiota `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`), joka **puolittaa** tallennetun
`failureCount`-arvon (`Math.floor(failureCount / 2)`); kun se saavuttaa arvon `0`, lukitusmerkintä
poistetaan kokonaan. Vastinpari `recordModelLockoutFailure()`
kasvattaa laskuria (ja pidentää jäähyä), kun virheitä tapahtuu
pidennysikkunan aikana. Tämä onnistumisiin perustuva palautuminen täydentää tavallista ajastimen umpeutumista —
kumpi tahansa polku voi ottaa mallin uudelleen käyttöön.

**Tila:** lukituksia säilytetään **muistissa** (prosessikohtaiset `Map`-rakenteet,
joissa `ModelLockoutEntry`-arvot on avaimettu muodossa `provider:connectionId:model` ja tarkan kattavuuden lukitukset muodossa
`provider:connectionId:exact:model`), eikä niitä tallenneta
tietokantaan — ne menetetään uudelleenkäynnistyksen yhteydessä. _Asetukset_ säilytetään pysyvästi; aktiivinen
lukitus_tila_ on tilapäinen.

---

## 4. Kiintiönjaon rinnakkaisuuden hallinta (v3.8.36)

Tilauspohjaiset tilit (GLM, MiniMax jne.) hyväksyvät usein vain noin 1–3 samanaikaista
pyyntöä; tämän rajan ylittäminen aiheuttaa 429-virheitä ja jäähdytysjaksoja. Tämä korostuu
**kiintiönjako-** (`qtSd/…`)yhdistelmissä, joissa useat API-avaimet jakavat saman ulkoisen
tilin. Kolme tasoa estää jaetun tilin kuormittamisen liiallisilla pyynnöillä.

### Yhteyskohtainen rinnakkaisuusraja (`max_concurrent`)

Kullekin palveluntarjoajayhteydelle voidaan määrittää `max_concurrent`-yläraja
(`provider_connections.max_concurrent`, määritetään yhteyden valintaikkunassa / API:ssa / tietokannassa).
Jätä se tyhjäksi, jos et halua rajoitusta. Tämä on ainoa asetus, joka ohjaa alla olevaa
sarjallistamiskerrosta — aseta arvoksi tilin todellinen rinnakkaisuusraja (esim. GLM noin 1, MiniMax noin 2).

### Kiintiönjakopyyntöjen sarjallistaminen

Kun kiintiönjakovälitys kohdistuu yhteyteen, jolle on määritetty positiivinen
`max_concurrent`-arvo, kyseiselle **tilille** lähetettävät samanaikaiset pyynnöt sarjallistetaan
yhteyskohtaisen semaforin kautta (avain `qsconn:<connectionId>`): ylimääräiset pyynnöt **odottavat
jonossa** sen sijaan, että ne kuormittaisivat tiliä liikaa. Toiminta on **häiriötilanteessa salliva**:
täysi jono tai aikakatkaisu johtaa jatkamiseen ilman paikkaa sen sijaan, että välityskelpoinen
pyyntö koskaan hylättäisiin. Ota toiminto käyttöön tai poista se käytöstä kohdassa **Asetukset → Häiriönsietokyky → Kiintiönjaon yhteyskohtainen
rinnakkaisuus** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, oletusarvoisesti
käytössä). Ilman `max_concurrent`-rajaa toiminta säilyy ennallaan.

> Kiintiönjaon reititysportti (`selectQuotaShareTarget`, DRR + P2C) on itsessään
> häiriötilanteessa salliva ja vain _alentaa prioriteettia_ yhteydeltä, joka on saavuttanut rajansa — yhden
> yhteyden varannossa se ei voi asettaa ehdotonta rajaa, joten juuri tämä semafori
> estää pyyntötulvan.

### Yhdistelmän jäähdytysjakson huomioiva uudelleenyritys

Kun toiminto on käytössä, jokaisessa yhdistelmästrategiassa pyyntö, joka muutoin johtaisi lopulliseen 429-virheeseen
LYHYEN tilapäisen jäähdytysjakson vuoksi, odottaa jakson päättymistä ja välitetään uudelleen sen sijaan, että
429-virhe palautettaisiin — tämä kattaa Gemini-tyyppiset TPM/RPM-aikaikkunat (noin 60 sekunnin retry-after)
usean mallin yhdistelmissä, esimerkiksi kun kaksimallisen yhdistelmän molemmat kohteet saavuttavat mallikohtaisen
nopeusrajoituksen. Toimintaa rajoittaa **Asetukset → Häiriönsietokyky** -kohdan `comboCooldownWait`
(`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`). Se ei koskaan odota syyn ollessa `quota_exhausted`
(lukittu keskiyöhön asti) eikä todennukseen tai puuttuvaan resurssiin liittyvissä tapauksissa.

---

## 5. Pyyntöjonon sisäänpääsyn hallinta (v3.8.49 · issue #6593)

**Laajuus**: paikallinen palveluntarjoaja- ja yhteyskohtainen nopeusrajoitusjono (`open-sse/services/rateLimitManager.ts`,
jonka taustalla toimii Bottleneck), yksi taso yllä mainittujen kolmen mekanismin alapuolella.

**`maxWaitMs` rajaa jonotusajan; `executionMaxWaitMs` rajaa suorituksen.**
Nämä kaksi on tarkoituksella erotettu toisistaan, eikä kumpikaan vaikuta toiseen.

`resilienceSettings.requestQueue.maxWaitMs` on **jonotusajan budjetti**: se
kattaa palveluntarjoajan vapaan paikan odottamisen ja sen jälkeisen QUEUED-tilassa
olemisen, ja sen ajastin tyhjennetään heti, kun työ poistuu QUEUED-tilasta ja
alkaa suorittua (`rateLimitManager.ts`, `wrappedFn`). Sen ylittävä pyyntö ei
koskaan saavuta ylävirran palvelua. Oletusarvo on 30000ms, ja sen antaa
`DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS` tiedostossa
`src/lib/resilience/settings.ts`. Arvo on lukittu testillä
`tests/unit/ratelimit-admission-control-6593.test.ts`, joten sen muuttaminen
rikkoo testin sen sijaan, että tämä kappale jäisi huomaamatta vanhentuneeksi.

`resilienceSettings.requestQueue.executionMaxWaitMs` on arvo, jonka Bottleneck
saa työn `expiration`-arvoksi ja jonka ajastin käynnistyy vasta lähettämisen
jälkeen. Se toimii varmistuksena suorittajille, joilla ei ole omaa ylävirran
aikakatkaisua, ja se nostetaan suorittajan oman noudon aloituksen aikakatkaisun
tasolle, jos tämä on pidempi, joten se ei voi katkaista toimivaa, parhaillaan
käsiteltävää vastausta. Oletusarvo on 600000ms (10 min).

Jonotusbudjetin syöttäminen `expiration`-arvoksi aiheutti aiemmin sen, että
ei-inkrementaaliset yhdyskäytävät keskeytyivät kesken suorituksen — ne voivat
perustellusti toimia useita minuutteja ennen ensimmäisiä tavuja — ja tämän
vuoksi vanheneminen ilmoitetaan muodossa `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), kun taas jonotusbudjetti käyttää
jonon aikakatkaisukoodia. Ohita kumpi tahansa ympäristömuuttujalla
`RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) tai
hallintapaneelista (**Settings → Resilience**). Molemmat rajataan välille
1ms–24h normalisoinnin yhteydessä.

**Prioriteettijärjestys kummallekin:** ympäristömuuttuja määrittää vain
_oletusarvon_. Kohteeseen `resilienceSettings.requestQueue` tallennettu arvo
(hallintapaneelin / API-korjauksen kautta, tallennettuna kohteeseen `key_value`)
ohittaa sen, ja yhteyskohtainen `rateLimitOverrides.maxWaitMs` /
`.executionMaxWaitMs` ohittaa tämänkin. Ympäristömuuttujan asettaminen
käyttöönotossa, jossa on jo tallennettu arvo, ei siis muuta mitään — tyhjennä
tai päivitä tallennettu asetus sen sijaan.

Jonossa oloa rajaa `maxWaitMs`; alla kuvattu `maxQueueDepth` rajaa sen, kuinka
monta kutsujaa voi olla jonossa samanaikaisesti.

**`maxQueueDepth` — valinnainen sisäänpääsyraja (uusi).** `resilienceSettings.requestQueue.maxQueueDepth`
rajaa, kuinka monta pyyntöä voi olla samanaikaisesti jonossa (ei vielä
lähetettynä) yhdelle palveluntarjoaja- ja yhteysyhdistelmälle. Kun jonossa on
jo `maxQueueDepth` pyyntöä, uusi pyyntö hylätään välittömästi tyypitetyllä
`code: "RATE_LIMIT_QUEUE_FULL"` -virheellä **ennen** kuin se koskaan saavuttaa
kutsun `limiter.schedule()` — hylkäys on siis kevyt ja tapahtuu ennen pyynnölle
tehtävää myöhempää kehotteen pakkaus- tai käännöstyötä. Oletusarvo `0` =
pois käytöstä, mikä säilyttää nykyisen rajoittamattoman jonon toiminnan;
sallittu väli on 0–100000. Ohita ympäristömuuttujalla
`RATE_LIMIT_MAX_QUEUE_DEPTH` (env) tai asetuksella
`resilienceSettings.requestQueue.maxQueueDepth` (hallintapaneeli/API-korjaus).

Sisäänpääsyn tarkistus on itsessään puhdas funktio
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), joten
sitä voidaan yksikkötestata ilman todellista Bottleneck-rajoitinta.

> RFC, jolla #6593 avattiin, ehdotti myös `bypassCompressionOnRateLimit`-
> lippua. Tämän repositorion `open-sse/services/compression/`-putki tekee
> lähtevän LLM-pyynnön kehotteen/kontekstin pakkausta (`chatCore.ts`,
> `resolveCompressionSettings`/`selectCompressionStrategy`-lohkon ympärillä),
> ei syntetisoitujen 429-vastausten HTTP-vastauspakkausta — kirjaimelliselle
> ohituslipulle ei ole vastaavaa koodipolkua. Tämä kehotteen pakkausvaihe
> suoritetaan myös tällä hetkellä _ennen_ `withRateLimit()`-kutsua
> pyyntöputkessa, joten sen järjestyksen muuttaminen siten, että vaihe
> ohitettaisiin jonon täyttymisestä johtuvan hylkäyksen yhteydessä, on tämän
> issuen laajuutta erillinen ja suurempi muutos; sitä **ei** tarkoituksella
> toteutettu tässä, vaan se jätettiin jatkotoimeksi siltä varalta, että
> suorittimen käytön säästö on järjestyksen muuttamiseen liittyvän riskin
> arvoinen.

---

## 6. Hitaan tietovirran läpäisykyvyn valvontamekanismi (#9709)

Valinnainen `resilienceSettings.streamRecovery.throughputWatchdog`-suoja tunnistaa
ylävirran, joka lähettää edelleen osia mutta tuottaa avustajan tulostetta alle
määritetyn hyödyllisen tulosteen nopeuden. Se on tarkoituksellisesti erillinen
joutoaikakatkaisusta: sykepaketit ja metatiedot eivät nollaa kumpaakaan ajastinta
eikä niitä lasketa edistymiseksi. Se on myös erillinen yrityksen ehdottomasta
määräajasta (#9153), joka säilyy absoluuttisena turvarajana tulosteen laadusta
riippumatta.

Valvontamekanismi edellyttää lämpenemisjaksoa ja sen jälkeen kokonaista liukuvaa
aikaikkunaa ennen kuin se voi keskeyttää. Se laskee Chat Completions- ja Responses
API -tulostetapahtumien tekstimuutokset (konservatiivisena UTF-8-tavujen
likimääräisenä mittana), ohittaa vain käyttöä koskevat ja tyhjät tapahtumat sekä
keskeyttää arvioinnin työkalukutsu- tai päättelytapahtumien ollessa käynnissä. Se on
oletusarvoisesti poistettu käytöstä ja voidaan ottaa käyttöön asetuksella
`STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`; ikkunaa, lämpenemisaikaa,
vähimmäisnopeutta ja mitattavissa olevan tulosteen vähimmäismäärää rajoittaa
normaali häiriönsietoasetusten normalisointikerros.

Kun valvontamekanismi on käytössä, sen tekemä keskeytys kohdistetaan vain aktiiviseen
ylävirtayritykseen. Ennen kuin asiakkaalle näkyviä tavuja on lähetetty, olemassa
oleva saman tilin varhainen palautuspolku voi avata yrityksen uudelleen. Vahvistuksen
jälkeen tietovirtaa ei koskaan toisteta sokeasti; vain olemassa oleva turvallinen
tietovirran keskeltä jatkamisen sopimus voi liittää loppuosan. Viimeistely tehdään
edelleen vain kerran, joten käytön laskentaa ja semaforin vapautusta ei tehdä
kahteen kertaan.

---

## 7. Ylävirran tilan uudelleenmäärittely (virheellisesti ilmoitetut kiintiövirheet)

**Soveltamisala:** yksi ylävirran yhdyskäytävä, joka ilmoittaa tilapäisestä kiintiön loppumisesta väärällä HTTP-tilalla.

**Tarkoitus:** korjata harhaanjohtava tila ENNEN luokittelua, jotta alavirran kuluttajat (varajärjestelmä, yhdistelmäkoonti ja asiakkaalle annettava vastaus) näkevät virheen todellisen, uudelleenyrityksen sallivan luonteen.

Jotkin yhdyskäytävät ilmoittavat TILAPÄISESTÄ kiintiön loppumisesta HTTP-tilalla,
joka ei salli uudelleenyritystä. `agentrouter.org` palauttaa tilan `403` (joskus
`400`) ja kiinankielisen rungon (`用户额度不足` / `额度不足`) normaalin tilan `429`
sijaan. Claude Coden kaltaiset asiakkaat käsittelevät tilan `403` pysyvänä ja
keskeyttävät istunnon, ja ilman korjausta varajärjestelmä luokittelisi sen
`AUTH_ERROR`-virheeksi kiintiötapahtuman sijaan.

**Toteutus:**

- Rekisteri + täsmäytin: `open-sse/config/upstreamStatusRestatement.ts` —
  palveluntarjoajakohtainen sääntöluettelo (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), joka täsmäytetään funktiolla `applyStatusRestatement()`.
- Kutsukohta: `providerFailure:`-lohko tiedostossa `open-sse/handlers/chatCore.ts`
  (noin rivillä 3654), heti sen jälkeen, kun `parseUpstreamError()` on jäsentänyt
  virheellisen HTTP-tilan sisältävän ylävirran vastauksen (`!providerResponse.ok`),
  ja ennen minkään luokittelun suorittamista, jotta jokainen alavirran kuluttaja
  näkee korjatun tilan. `200` SSE -tietovirran sisään upotetut virheet kulkevat
  erillistä, myöhempää tietovirran jäsennyspolkua, eikä tämä koukku **kata** niitä
  tällä hetkellä — kyseessä on tunnettu rajoitus, jota ei vielä tarvita
  agentrouterin virheellisesti ilmoittamaan tilaan (joka ilmenee virheellisenä
  HTTP-tilana).
- Uudelleenyrityksen kelpoisuus: `429` sisältyy joukkoon
  `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`), joten uudelleenmääritetty
  virhe sisältää todellisen uudelleenyritysikkunan sen sijaan, että se näkyisi
  käyttökelvottomana `403`-tilana.
- Synteettinen `60s`-arvo `defaultRetryAfterMs` (`upstreamStatusRestatement.ts`)
  kertoo ainoastaan sen, mitä uudelleenmääritetty vastaus ilmoittaa
  **asiakkaalle**; se ei itsessään ole yhteyden sisäisen jäähdytys- tai
  lukitusjakson kesto — sitä hallitsee erikseen mekanismi, joka tosiasiallisesti
  käsittelee uudelleenmääritetyn virheen (yhteyden jäähdytyksen kasvava
  eksponentiaalinen viive, §2, perusarvo `3s` API-avainpohjaisille
  palveluntarjoajille; tai mallin lukitus, §3, agentrouterin kaltaisille
  mallikohtaista kiintiötä käyttäville palveluntarjoajille). Reititin voi tulla
  sisäisesti uudelleenyrityskelpoiseksi aiemmin kuin asiakkaalle ilmoitettu 60s:n
  ikkuna — tämä on tarkoituksellista pelivaraa, ei ohjelmavirhe.

Pysyviä virheitä (agentrouterin `无权访问模型` — ei käyttöoikeutta tähän malliin) ei
KOSKAAN määritellä uudelleen: `excludeMarkers` estää säännön, vaikka
`textMarkers` täsmäisi, joten virhe säilyttää alkuperäisen tilansa eikä mikään yritä
sitä uudelleen loputtomasti. Vastaavaa palveluntarjoajan luokittelusääntöä
(`agentrouter-model-access-denied` tiedostossa `open-sse/config/providerErrorRules.ts`:
`reason: "auth_error"`, `scope: "model"`, ilmoitettu `6h`:n perusjäähdytys)
käyttää `checkFallbackError` (`open-sse/services/accountFallback.ts`)
_ennen_ yleistä apikey-luokan `FORBIDDEN`-varhaispalautusta, ehdollisesti funktion
`honorsRuleLockScope(provider)` perusteella (#10334 — tällä hetkellä vain
agentrouterille sallittu tiedoston `providerErrorRules.ts`
`HONORS_RULE_LOCK_SCOPE_PROVIDERS`-sallittujen luettelon kautta). Säännön ilmoitettu
6h:n jäähdytys välittyy arvona `fallbackResult.baseCooldownMs`, mutta se syötetään
edelleen ennestään olemassa olevaan mallikohtaisen kiintiön lukituspolkuun
(`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, jota #10334 ei
muuttanut jäähdytyksen lähdettä lukuun ottamatta): se rajataan alaspäin
operaattorin `mlSettings.maxCooldownMs`-arvoon (oletuksena `1_800_000ms` / 30min)
kuten kaikki muutkin mallilukitukset, ja _tallennettu lukituksen syy_ säilyy
ennestään kovakoodattuna arvona `"forbidden"`, ei säännön arvona `"auth_error"` —
vain jäähdytyksen kesto huomioidaan päästä päähän, ei syymerkkijonoa. Itse yhteys
pysyy aktiivisena; tämä ei vaikuta saman yhteyden rinnakkaisiin malleihin.

Uudelleen ilmaistut kiintiövirheet (`额度不足`) osuvat tuotannossa palveluntarjoajasääntöön
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, ei omaa määritettyä jäähdytysaikaa — pysyvyyskerroksen
skaalatun viiveen oletusarvoa käytetään). Muutoksesta #10334 lähtien
`ProviderErrorRuleMatch`-objektin `scope` välitetään koko käsittelyketjun läpi,
mutta **vain** `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-sallittujen palveluntarjoajien
osalta (`providerErrorRules.ts` — tällä hetkellä vain `"agentrouter"`,
rajattuna funktion `honorsRuleLockScope()` kautta). Kaikilla muilla
palveluntarjoajilla `scope` on edelleen vain informatiivinen, aivan kuten
ennen muutosta #10334. `checkFallbackError` tuo täsmänneen säännön vaikutusalueen
saataville kentässä `fallbackResult.ruleScope`;
`isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`) on yhteinen suojatarkistus, joka vahvistaa, että
`ruleScope` on aidosti turvallista tulkita koko yhteyttä koskevaksi,
itsestään palautuvaksi signaaliksi (vaikutusalue `"connection"`, syy
`quota_exhausted`, ei koskaan `permanent`, ei koskaan `creditsExhausted` —
suoja siltä varalta, että tuleva sääntö yhdistäisi vaikutusalueen
`"connection"` pysyvään tilin tilaan). Sitä kutsuu kaksi kuluttajaa:

- **Pysyvyys** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  sen sijaan, että käsittely siirtyisi läpivientipalveluntarjoajan
  **mallikohtaiseen** lukitushaaraan (agentrouter käyttää asetusta
  `passthroughModels: true` → `hasPerModelQuota()` palauttaa arvon `true`),
  se ottaa käyttöön **väliaikaisen yhteyden jäähdytysajan** —
  `testStatus: "unavailable"` + `rateLimitedUntil`, ei koskaan lopullista tilaa
  (`credits_exhausted`/`banned`/`expired`) — joten yhteys palautuu itsestään
  jäähdytysajan päätyttyä eikä edellytä tunnistetietojen manuaalista
  nollaamista. Tämä ohitetaan yhteyksillä, joilla on `disableCooling: true`
  (#2997): kyseinen poiskytkentä siirtää käsittelyn sen sijaan mallikohtaiseen
  lukitukseen (dokumentoitu kompromissi — katso haaran yläpuolella oleva
  koodikommentti).
- **Saman pyynnön yhdistelmäreititys** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): sama suojatarkistus lisää
  yhteyden muistissa olevaan `exhaustedConnections`-joukkoon avaimella
  `${provider}:${connectionId}`. Tämä ohittaa vain jäljellä olevan SAMAN PYYNNÖN
  kohteen, jolla _itsellään on jo täsmälleen sama `connectionId`_ omassa
  kohdeobjektissaan (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)` ennen `exhaustedConnections`-hakua) — pelkkä malliluettelon
  yhdistelmä, jossa rinnakkaiskohteilla ei ole omaa kiinnitettyä
  `connectionId`-arvoa ja sellainen ratkaistaan lähetyskohtaisesti vain
  vastauksen `X-OmniRoute-Selected-Connection-Id`-otsakkeesta, ei koskaan
  täsmää tähän avaimeen. Tässä yleisessä tapauksessa todellinen suoja sitä
  vastaan, että jäljellä oleva vaihe käyttäisi uudelleen juuri loppuun
  kulunutta tiliä, EI ole tämä Set — vaan yllä kuvattu pysyvyyskerros
  (yhteyden `rateLimitedUntil` on nyt tulevaisuudessa) yhdessä sen kanssa,
  että sama suojatarkistus estää arvon `transientRateLimitedProviders`
  asettamisen tälle virheelle (katso ”Kaksivaiheinen rakenne” ja
  `targetExhaustion.ts`-tiedoston `isAgentrouterConnectionQuotaScope`-haaran
  koodikommentti): kun kyseinen Set jätetään merkitsemättä, `combo.ts`-tiedoston
  `allowRateLimitedConnection`-pakko-ohitus
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) EI aktivoidu
  palveluntarjoajan jäljellä oleville vaiheille, joten tunnistetietojen
  valinnan `rateLimitedUntil`-suodatinta (`src/sse/services/auth.ts:1238`)
  noudatetaan normaalisti ja jäljellä oleva vaihe joko valitsee toisen,
  edelleen kelvollisen agentrouter-yhteyden tai epäonnistuu, koska
  tunnistetietoja ei ole saatavilla — se ei pakota itseään takaisin yhteyteen,
  jonka tämä haara juuri asetti jäähdytystilaan.

### Kaksivaiheinen rakenne: tilan uudelleenilmaisu ja sitten luokittelu

Tilan uudelleenilmaisun (`upstreamStatusRestatement.ts`) ja palveluntarjoajan
luokittelusääntöjen (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) rekisterit ovat erillisiä. Molemmat käyttävät avaimina
palveluntarjoajan tunnusta ja tekstimerkkejä, mutta ne suoritetaan eri paikoissa
ja palvelevat eri tarkoituksia: uudelleenilmaisu kirjoittaa HTTP-tilan uudelleen
varhaisessa vaiheessa tiedostossa `chatCore.ts`; luokittelusäännöt valitsevat
varareitityksen `reason`-arvon ja lukituksen `scope`-arvon
(`model` / `provider` / `connection`) funktion `checkFallbackError()` sisällä
(`open-sse/services/accountFallback.ts`).

Luokittelusäännöt näkevät täydellisen virheen **tekstin** (jota tarvitaan
rungon merkkien, kuten `额度不足`, täsmäyttämiseen) vain
`providerErrorRules.ts`-tiedoston `FULL_TEXT_RULE_PROVIDERS`-sallittujen
palveluntarjoajien osalta — tällä hetkellä vain `"agentrouter"`. Jokaisen muun
**sisäänrakennetun luettelon** palveluntarjoajan kohdalla `checkFallbackError`
välittää funktiolle `getProviderErrorRuleMatch` vain rakenteisen virheen
(`{code, type}`), mikä riittää otsake-, tila- ja koodipohjaisille säännöille,
mutta ei näe rungon tekstimerkkejä. Apufunktio `resolveRuleMatchBody()` tekee
tämän valinnan: täydellinen virheteksti sallituille palveluntarjoajille,
muutoin rakenteinen virhe. **Sisäänrakennetun** palveluntarjoajan lisääminen
joukkoon `FULL_TEXT_RULE_PROVIDERS` on nimenomainen palveluntarjoajakohtainen
käyttöönotto — sen tarkoituksena on varmistaa, että oletuspolku pysyy
tavu tavulta muuttumattomana jokaiselle palveluntarjoajalle, jota luettelossa
ei ole.

Säännön `scope` (`model` / `provider` / `connection`) on erillinen
käyttöönotto verrattuna luetteloon `FULL_TEXT_RULE_PROVIDERS`:
`checkFallbackError` tuo sen saataville vain kentässä
`fallbackResult.ruleScope`, ja myöhemmät kuluttajat käsittelevät sitä muuna
kuin informatiivisena selitteenä vain saman tiedoston
`HONORS_RULE_LOCK_SCOPE_PROVIDERS`-sallittujen palveluntarjoajien osalta
(`gated via honorsRuleLockScope()` — tällä hetkellä vain `"agentrouter"`).
Katso yllä olevasta kohdasta ”Uudelleen ilmaistut kiintiövirheet”, mitä
`scope: "connection"` -täsmäys käytännössä tekee sen jälkeen, kun
palveluntarjoaja on lisätty kyseiseen sallittujen luetteloon.

**#11104 — operaattorin määrittämät säännöt ohittavat molemmat sallittujen luettelot.** Operaattori voi
määrittää palveluntarjoajakohtaisen säännön ajon aikana asetuksella `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)
muokkaamatta tätä tiedostoa. Operaattorin säännön rajaaminen
`FULL_TEXT_RULE_PROVIDERS`-/`HONORS_RULE_LOCK_SCOPE_PROVIDERS`-sallittujen luetteloiden taakse —
joiden tarkoituksena on suojata sisäänrakennettujen katalogisääntöjen **oletusarvoista**
toimintaa — tekisi asetusmekanismista toimimattoman kaikille muille paitsi jo
luetteloissa oleville palveluntarjoajille, koska säännön määrittäminen on jo itsessään operaattorin
nimenomainen hyväksyntä. `resolveRuleMatchBody()` ja `honorsRuleLockScope()` tarkistavat
molemmat ensin `hasOperatorRuleForProvider()`-funktion: operaattorin säännön saanut palveluntarjoaja saa
raakamuotoisen virhetekstin, ja sen määrittämää `scope`-arvoa noudatetaan riippumatta siitä,
esiintyykö palveluntarjoaja lisäksi kummassakaan sallittujen luettelossa.

**Tunnettu puute — `providerRuleRegistry`-rekisteriä ei koskaan käytetä HTTP 400 -virheille.**
`checkFallbackError`-funktion `BAD_REQUEST`-haara luokittelee tilan 400 kokonaan
omien mallitaulukoidensa kautta (`MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` jne. tiedostossa `accountFallback.ts`) ja palauttaa tuloksen ennen kuin
sen yläpuolella oleva `configuredRule`-/`getProviderErrorRuleMatch`-haara saavutetaan.
Sisäänrakennettu katalogisääntö (tai operaattorin sääntö), jonka `status: 400`, on
syntaktisesti kelvollinen, mutta sitä ei koskaan suoriteta. Mikään nykyinen sääntö ei kohdistu tilaan 400,
joten tämä ei vaikuta mihinkään tuotannossa — tuleva 400-sääntö edellyttää kuitenkin ensin
tämän haaran muuttamista, mikä on suurempi muutos kuin säännön lisääminen (se
luokittelee tilan 400 uudelleen jokaiselle palveluntarjoajalle, joka jo käyttää mallitaulukoihin perustuvaa
toimintaa), eikä kuulu yksittäisen palveluntarjoajan säännön lisäämisen laajuuteen.

### Uuden kiintiön väärin ilmoittavan yhdyskäytävän lisääminen

1. Rekisteröi yksi sääntötaulukko rekisteriin `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`). Pidä `textMarkers`
   palveluntarjoajakohtaisina; älä koskaan käytä uudelleen yleisiä englanninkielisiä ilmauksia, jotka ovat ristiriidassa
   `CREDITS_EXHAUSTED_SIGNALS`-arvojen kanssa (`open-sse/services/accountFallback.ts`).
2. Rekisteröi halutessasi luokittelusäännöt tiedostossa
   `open-sse/config/providerErrorRules.ts` (`providerRuleRegistry`) oikean
   lukituksen laajuuden valitsemiseksi (`connection` tilikohtaiselle kiintiölle, `model`
   mallikohtaisille virheille). Tämä vaihe vaikuttaa tuotannossa vain niihin
   palveluntarjoajiin, joiden säännöt tarvitsevat koko virhetekstin (rungon merkkijonot): lisää
   palveluntarjoajan tunnus saman tiedoston `FULL_TEXT_RULE_PROVIDERS`-luetteloon — muutoin
   `checkFallbackError` välittää säännölle aina vain jäsennellyn
   `{code, type}`-virheen, eikä rungon tekstiin perustuva sääntö koskaan vastaa tuotantoliikenteessä.
   Säännöt, jotka vastaavat pelkästään `status`-/`headers`-tietojen perusteella (kuten Opencoden tai
   Minimaxin säännöt), eivät tarvitse tätä käyttöönottoa. Jos sääntö lisäksi määrittää
   `scope: "connection"` ja tarkoituksena on varsinainen yhteydenlaajuinen jäähdytysjakso
   sekä saman pyynnön yhdistelmän ohittaminen (ei vain informatiivinen tunniste), lisää
   palveluntarjoajan tunnus saman tiedoston `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-luetteloon — tämä
   rajaa `isAgentrouterConnectionQuotaScope()`-tyylisen käsittelyn käytön funktiossa
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) ja funktiossa
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`); ilman sitä `scope`
   välitetään edelleen `fallbackResult.ruleScope`-arvon kautta, mutta mikään ei reagoi siihen.
3. Lisää yksikkötestit tiedostojen `tests/unit/upstream-status-restatement.test.ts`
   ja `tests/unit/agentrouter-error-rules.test.ts` mallin mukaisesti (mukaan lukien
   not-permanent- / not-creditsExhausted-suojaukset sekä — jos palveluntarjoaja tarvitsee
   sallittujen luetteloa — testi, joka varmistaa `resolveRuleMatchBody()`-funktion palauttavan
   koko tekstin vain kyseiselle palveluntarjoajalle).

Muutoksia tiedostoihin `chatCore.ts`, `classifyError` tai yhdistelmälogiikkaan ei tarvita.

#### Lähtöliikennekohtaisesti ryhmitelty lukitus (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS`-luettelon palveluntarjoajia (opencode-perhe) käsitellään
lähtö-IP:n mukaan ryhmiteltyinä ylävirtapalveluina (opencoden ilmaistaso on ryhmitelty IP-osoitteen eikä
tilin mukaan — katso #9611): tilan 429 luokittelu arvoksi `quota_exhausted`
**tai** `rate_limit_exceeded` asettaa jäähdytysjakson jokaiselle sallitun perheen yhteydelle,
jonka viimeksi tunnettu lähtö-IP vastaa epäonnistuneen yhteyden IP-osoitetta, ennen kuin
kierto voi yrittää niitä
— näin vältetään N-1 varmasti epäonnistuvaa ylävirtakutsua (sama rakenne kuin tapauksissa #10460/#10525).
`rate_limit_exceeded` on mukana tarkoituksella: `markAccountUnavailable`-polulla
opencode-kohtaiset säännöt eivät koskaan vastaa (otsakkeita/runkoa ei välitetä
`checkFallbackError`-funktiolle, eikä opencode ole `FULL_TEXT_RULE_PROVIDERS`-luettelossa), joten 429,
jonka runko sisältää tilauskiintiön tekstin ("monthly usage limit
reached"), luokitellaan arvoksi `quota_exhausted` kiintiötekstin varatoiminnon avulla
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1 tunnin jäähdytysjakso) ennen kuin
`status_429`-sääntö edes saavutetaan — kun taas 429 ilman kiintiötekstiä (tavallinen
nopeusrajoitus) luokitellaan `status_429`-säännön kautta arvoksi `rate_limit_exceeded`
ja asettaa silti IP-perheen jäähdytysjaksolle. Sallitun luettelon palveluntarjoajalle IP-kohtainen
nopeusrajoitus on sama signaali kuin loppuun käytetty kiintiö. Tiedossa olevat rajoitteet:

- **Parhaan yrityksen periaate**: lukitus selvittää yhteyden viimeksi tunnetun `egress_ip`-arvon
  `proxy_logs`-taulusta (24 tunnin ikkuna, synkroninen, ei välimuistia). Jos välimuisti on kylmä (lähtevää
  IP-osoitetta ei ole koskaan tarkistettu) tai riviä ei löydy → epäonnistunut yhteys asetetaan silti
  haaran määrittämälle jäähdytysjaksolle (kirjataan kuten nykyään), mutta sisaryhteyttä ei lukita.
- **Ei koskaan lopullinen**: jäähdytysjakso on uusiutuva kiintiöikkuna
  (`testStatus: "unavailable"`); pysyvää tilaa ei koskaan johdeta
  IP-tason signaalista. `disableCooling`-yhteydet ohittavat haaran kokonaan.
- **Lukituksen rakeisuus muuttuu sallittujen palveluntarjoajien perheelle**: tämä on laajuuden
  muutos, ei pelkästään sisaryhteyksiä koskeva optimointi. opencode on `passthroughModels`-
  palveluntarjoaja, joten ennen tätä haaraa 429 tuotti mallikohtaisen lukituksen; nyt se
  tuottaa yhteyden jäähdytysjakson — myös operaattorille, jolla on käytössä vain yksi
  yhteys eikä lainkaan sisaryhteyksiä. Tämä on rakeisuus, jonka opencoden sääntötaulukko
  on jo määrittänyt oikeaksi (`scope: "connection"`,
  `providerErrorRules.ts`), mutta jota ei ole tähän asti noudatettu, koska opencode ei kuulu
  joukkoon `HONORS_RULE_LOCK_SCOPE_PROVIDERS`. Haara kirjoittaa epäonnistuneen
  yhteyden jäähdytysjakson + `backoffLevel`-arvon itse, yhteyskohtaisen
  agentrouter-haaran tapaan, ja palaa — alla olevaan mallikohtaiseen estoon ja
  yleiseen polkuun ei koskaan päädytä.
- **Yhdistelmä mukana**: agentrouter-haaran tavoin laajuus ohittaa tarkoituksella
  `persistUnavailableState`/`isCombo`-lievennyksen, jonka yhdistelmäkutsuja
  soveltaa 429-virheeseen. Mallikohtainen lukitus ei ole tämän laajuuden lievempi
  muoto, vaan väärä yksikkö: se ei kerro mitään kiintiönsä käyttäneestä IP-osoitteesta, joten yhdistelmän
  kierrätys kuluttaisi edelleen yhden varmasti epäonnistuvan kutsun jokaista sisaryhteyttä kohden.
- **Sisaryhteyksien turvallisuus**: sisaryhteyttä, joka on jo lopullisessa tilassa (banned/credits_exhausted)
  tai jo pidemmällä jäähdytysjaksolla, ei koskaan korvata uudella tilalla.
- **Eksklusiivinen sallittujen luettelo**: `EGRESS_BUCKETED_LOCK_PROVIDERS`-joukon laajentaminen on
  nimenomainen omistajan päätös; ei yleistä kytkentää (malli #10334/#10419). Sisaryhteyskysely
  käyttää sidontaan samaa sallittujen luetteloa sen sijaan, että se toistettaisiin SQL-
  literaalina, joten sen laajentaminen säilyy yhden rivin muutoksena.
- **Lähtevän IP-osoitteen kierto kumpaankin suuntaan**: hakuikkuna (24 tuntia) on paljon
  pidempi kuin lähtevän IP-osoitteen välimuistin TTL (5 min), joten ”viimeksi tunnettu IP” on historiatietoa,
  ei nykyinen tila. Jos yhteyden välityspalvelimen IP-osoite on vaihtunut ikkunan aikana,
  lukitus voi **ohittaa** aidosti jaetun IP-osoitteen (tallennettu IP-osoite on uusi,
  eikä sen kiintiötä ole käytetty loppuun) — ja vastaavasti se voi **asettaa jäähdytysjaksolle sisaryhteyden, joka on sittemmin
  siirtynyt pois** kiintiönsä käyttäneestä IP-osoitteesta. Jälkimmäinen tapaus maksaa sisaryhteydelle yhden
  jäähdytysjakson; molemmat hyväksytään historiapohjaisen
  haun parhaan yrityksen periaatteeseen kuuluvina rajoitteina.
- **Kustannus**: kaksi rajattua `proxy_logs`-taulun läpikäyntiä (aikaikkunalla suodatettuina
  `idx_pl_timestamp`-indeksin avulla), vain 429-virheiden esiintymistiheydellä. Ei uutta indeksiä (migraatio 134,
  YAGNI). Mitattu kohtuullisen kokoisella todellisen liikenteen tietokantakopiolla;
  suuren suorituskyvyn instanssi sisältää suhteellisesti enemmän rivejä samassa ikkunassa.

---

## Muut häiriönsieto-ominaisuudet

- **19 reititysstrategiaa** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — katso [AUTO-COMBO.md](../routing/AUTO-COMBO.md).
- **Nollausajan huomioiva reititys** (v3.8.0) — priorisoi yhteydet kiintiön nollausajan perusteella.
- **Taustatilan hallittu heikentäminen** — Responses API -asetuksen `background: true` toiminta heikennetään synkroniseksi ja siitä annetaan varoitus.
- **Dynaaminen työkalurajan tunnistus** — vähentää palveluntarjoajien käyttöä, kun työkalumäärän rajat saavutetaan.
- **Hätävarajärjestelmä** — hallitaan muuttujalla `OMNIROUTE_EMERGENCY_FALLBACK`; operaattorit voivat ohittaa sen Feature Flags -sivulla ilman uudelleenkäynnistystä.

---

## Vianmääritys

- Painotettu yhdistelmä vastaa `503 all_targets_cooling_down` (`Retry-After` on asetettu, ja `diagnostics.excluded` luettelee kaikki kohteet syyllä `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`) → pooli on määritetty ja yhdistetty, mutta jokainen kohde on suljettu pois palautumiseen liittyvän ajastimen vuoksi; varoitus `[COMBO] Weighted selection: every target excluded before dispatch — …` ilmoittaa syyt ja jäljellä olevat sekunnit. Saman yhdistelmän palauttama `404 no_executable_targets` tarkoittaa, ettei palautumisajastimia ollut mukana (mitään suoritettavaa ei ole tai jokainen tili epäonnistui saatavuustarkistuksessa). Toteutus on tiedostossa `open-sse/services/combo/pinRecovery.ts`, ja se perustuu tiedostossa `targetResolution.ts` kerättyihin poissulkemisiin.
- Kaikki palveluntarjoajan avaimet ohitetaan → tarkista sekä piirikatkaisijan tila ETTÄ kunkin yhteyden `rateLimitedUntil`/`testStatus`.
- Palveluntarjoaja pysyy pysyvästi poissuljettuna nollausjakson jälkeen → koodi lukee raakaa `state`-arvoa metodin `getStatus()`/`canExecute()` sijaan.
- Yksi avain epäonnistuu, mutta muiden pitäisi toimia → suosi yhteyskohtaista jäähdytysaikaa piirikatkaisijan sijaan.
- Vain yksi malli epäonnistuu → suosi mallikohtaista lukitusta yhteyskohtaisen jäähdytysajan sijaan.
- Tilan pitäisi palautua itsestään, mutta niin ei tapahdu → tarkista tulevaisuuteen asetettu aikaleima sekä lukupolku, joka päivittää vanhentuneen tilan. Pysyvät tilat edellyttävät manuaalisia muutoksia.

---

## TLS-sormenjäljet ja häivetekniikat

Palveluntarjoajakohtaiset häivetekniikat (JA3/JA4, CCH, obfuscation) on dokumentoitu erikseen — katso `docs/security/STEALTH_GUIDE.md` (git; ei käännetä osaksi `/docs`-hakemistoa).

---

## Häiriönsietotestaus (vaihe 8 · lohko C)

Häiriönsietologiikan yksikkötestien lisäksi kolme testiä kuormittaa suoritusympäristöä
todellisissa rasitus- ja vikatilanteissa (kaikki ovat integraatio-/yötestejä — mikään niistä ei estä PR:iä):

| Testi         | Mitä                                                                                                                                                                                                                                                          | Suoritus                               |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| Kaaos         | Väärennetty upstream-solmu aiheuttaa todellista viivettä, nollauksia, aikakatkaisuja ja 503-virheitä; varmistaa, että katkaisija avautuu ja palautuu sekä että `checkFallbackError` luokittelee 503-virheen palautumiskelpoiseksi varajärjestelmätilanteeksi. | `RUN_CHAOS_INT=1 npm run test:chaos`   |
| Keon kasvu    | ~500 suoratoistoa kutakin `createSSEStream`-kutsua kohden asetuksella `--expose-gc`; epäonnistuu, jos keko kasvaa enimmäisrajan yli (OOM-suojaus #3069).                                                                                                      | `npm run test:heap`                    |
| k6-kestotesti | Jatkuva kuormitus kohteeseen `/api/monitoring/health`; p95-/virhekynnykset.                                                                                                                                                                                   | `k6 run tests/load/k6-soak.js` (yöajo) |

Orkestroinnin hoitaa `.github/workflows/nightly-resilience.yml` (cron + dispatch). Oletusarvoisessa
`test:integration`-ajossa kaaos- ja kekotestit ohittavat itsensä (ilman `RUN_CHAOS_INT`/`--expose-gc`-asetusta).

---

## Katso myös

- [Arkkitehtuuriopas](./ARCHITECTURE.md) — Järjestelmäarkkitehtuuri ja sisäinen toiminta
- [Käyttöopas](../guides/USER_GUIDE.md) — Palveluntarjoajat, yhdistelmät ja CLI-integraatio
- [Automaattinen yhdistelmämoottori](../routing/AUTO-COMBO.md) — 16 tekijän pisteytys ja tilapaketit
