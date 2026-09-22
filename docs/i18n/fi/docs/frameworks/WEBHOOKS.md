# Webhooks (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Totuuden lähde:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Päivitetty viimeksi:** 2026-06-28 — v3.8.40

OmniRoute voi lähettää HTTP-webhookeja alustan tapahtumien yhteydessä. Niiden avulla voit integroida
Slackin, PagerDutyn, Datadogin, sisäisiä hälytyspalveluita tai minkä tahansa HTTP-vastaanottimen.

Välityskomponentti allekirjoittaa jokaisen toimituksen HMAC-SHA256:lla, yrittää toimitusta uudelleen tilapäisten
virheiden yhteydessä, seuraa toimitusten toimivuutta webhook-kohtaisesti ja poistaa automaattisesti käytöstä
toistuvasti epäonnistuvat päätepisteet.

## Tuetut tapahtumat

`WebhookEvent`-tyyppi (`src/lib/webhooks/eventDescriptions.ts`, käytössä tiedostossa `src/lib/webhookDispatcher.ts`) mallintaa tällä hetkellä täsmälleen neljä tapahtumaa:

| Tapahtuma           | Laukeaa, kun                                                                                              |
| ------------------- | --------------------------------------------------------------------------------------------------------- |
| `request.completed` | Välityspalvelimen kautta kulkeva pyyntö valmistuu onnistuneesti                                           |
| `request.failed`    | Välityspalvelimen kautta kulkeva pyyntö epäonnistuu kaikkien uudelleenyritysten/varavaihtoehtojen jälkeen |
| `quota.exceeded`    | API-avain ylittää budjetti- tai kiintiörajan                                                              |
| `test.ping`         | Testipäätepisteen käyttämä synteettinen tapahtuma                                                         |

Tilauksissa voi käyttää literaalia `"*"` kaikkien tapahtumien vastaanottamiseen. Tuntemattomat tapahtumien
nimet `events`-kentässä ohitetaan välityksen aikana.

> Huomautus: välityskomponentin API on kytketty käyttöön, mutta joidenkin muiden kuin
> `test.ping`-tapahtumien tuotantokutsukohteita otetaan vielä käyttöön. Tarkista komennolla `grep dispatchEvent`,
> mitkä polut kutsuvat välityskomponenttia käytössä olevassa julkaisussasi.

## Arkkitehtuuri

```
Kutsuja (käsittelijä, palvelu, valvontakomponentti)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> suodata webhook.events-kentän perusteella
    -> kullekin vastaavuudelle (rinnakkain):
       deliverWebhook(url, payload, secret)
         muodosta hyötykuorma { event, timestamp, data }
         allekirjoita runko HMAC-SHA256:lla (jos salaisuus on määritetty)
         POST 10 sekunnin aikakatkaisulla
         yritä uudelleen enintään 3 kertaa 5xx-virheen / verkkovirheen yhteydessä
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Välitys tapahtuu kutsujan näkökulmasta taustalla ilman odotusta: `Promise.allSettled` käsittelee
webhook-kohtaiset virheet niin, ettei yksi viallinen vastaanotin voi estää muita.

## HMAC-allekirjoitus

Kun webhookilla on `secret`, OmniRoute allekirjoittaa JSON-rungon ja lähettää seuraavat otsakkeet:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <tapahtuma>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<heksadesimaalinen HMAC-SHA256(secret, body)>
```

> Otsakkeiden nimissä käytetään `X-Webhook-*`-etuliitettä (ei `X-OmniRoute-*`). Allekirjoituksen
> arvo on `sha256=<hex>` — tarkista koko etuliite.

Jos `createWebhook`-funktiota kutsutaan ilman salaisuutta, tietokantamoduuli luo sellaisen
(`whsec_<48 hex>`), joten kaikki webhookit allekirjoitetaan oletusarvoisesti.

### Tarkistaminen vastaanottimessa

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Tarkista allekirjoitus aina **raakaa** pyyntörunkoa vasten ennen JSON-jäsennystä.

## Uudelleenyritys- ja virhekäytäntö

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 10 sekunnin aikakatkaisu yritystä kohden (`AbortController`).
- HTTP 2xx katsotaan onnistumiseksi.
- HTTP 3xx/4xx katsotaan lopulliseksi tilaksi, jota ei yritetä uudelleen — toimitus kirjataan
  arvolla `success = res.ok`.
- HTTP 5xx -vastauksia ja verkkovirheitä yritetään uudelleen eksponentiaalisella viiveellä:
  `2^attempt * 1000 ms` (1 s, 2 s, 4 s).
- Kun `maxRetries` on saavutettu, toimitus kirjataan epäonnistuneeksi.
- Jokainen toimitus päivittää kentät `last_triggered_at` ja `last_status` sekä joko nollaa
  kentän `failure_count` tai kasvattaa sen arvoa.
- Välittäjä kutsuu funktiota `disableWebhooksWithHighFailures(10)` jokaisen rinnakkaisjakelun jälkeen,
  joten kaikki webhookit, joiden `failure_count >= 10`, poistetaan automaattisesti käytöstä.

## Tietokanta

Taulu `webhooks` (migraatio `011_webhooks.sql`):

| Sarake              | Tyyppi  | Huomautukset                                                 |
| ------------------- | ------- | ------------------------------------------------------------ |
| `id`                | TEXT PK | UUID                                                         |
| `url`               | TEXT    | Kohde-URL                                                    |
| `events`            | TEXT    | JSON-taulukko; oletus `["*"]`                                |
| `secret`            | TEXT    | HMAC-salaisuus (luodaan automaattisesti, jos sitä ei anneta) |
| `enabled`           | INT     | 0/1; oletusarvo 1                                            |
| `description`       | TEXT    | Valinnainen käyttäjän määrittämä nimi                        |
| `created_at`        | TEXT    | `datetime('now')`                                            |
| `last_triggered_at` | TEXT    | Päivitetään jokaisella toimitusyrityksellä                   |
| `last_status`       | INT     | Viimeisimmän yrityksen HTTP-tila (0 = verkkovirhe)           |
| `failure_count`     | INT     | Nollataan onnistumisen yhteydessä, +1 epäonnistumisesta      |

Toimitushistoria tallennetaan erilliseen `webhook_deliveries`-tauluun
(migraatio `069_webhook_deliveries.sql`, kirjoitus
`src/lib/db/webhookDeliveries.ts::insertDelivery` jokaisella yrityksellä) `webhooks`-rivin
koostelaskureiden lisäksi. Tyyppimetatiedot (Slackin / Discordin /
Telegramin / mukautetun hyötykuorman muuntimet) lisättiin migraatiossa `070_webhooks_kind_metadata.sql`.

## REST-rajapinta

Kaikki päätepisteet edellyttävät hallinnan todennusta (`requireManagementAuth`).

| Päätepiste                      | Menetelmä | Kuvaus                                         |
| ------------------------------- | --------- | ---------------------------------------------- |
| `/api/webhooks`                 | GET       | Listaa webhookit (salaisuudet peitettyinä)     |
| `/api/webhooks`                 | POST      | Luo webhook                                    |
| `/api/webhooks/[id]`            | GET       | Webhookin tiedot (koko salaisuus)              |
| `/api/webhooks/[id]`            | PUT       | Päivitä kenttiä                                |
| `/api/webhooks/[id]`            | DELETE    | Poista                                         |
| `/api/webhooks/[id]/test`       | POST      | Lähetä `test.ping` (ei uudelleenyrityksiä)     |
| `/api/webhooks/[id]/deliveries` | GET       | Yhden webhookin viimeisimmät toimitusyritykset |
| `/api/webhooks/validate-url`    | POST      | URL-osoitteen ennakkotarkistus (SSRF-suojaus)  |

`GET /api/webhooks` peittää salaisuuden muotoon `<ensimmäiset 10 merkkiä>...`, jotta se ei vuoda
listaussivuilla. Käytä `[id]`-GET-pyyntöä, kun todella tarvitset salaisuuden.

### Webhookin luominen

```bash
curl -X POST http://localhost:20128/api/webhooks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://hooks.slack.com/services/...",
    "secret": "whsec_my_shared_secret",
    "events": ["quota.exceeded", "request.failed"],
    "description": "Slack-hälytykset"
  }'
```

Jos `secret` jätetään pois, palvelin luo `whsec_<hex>`-salaisuuden ja palauttaa
sen vastauksessa.

### Webhookin testaaminen

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Palauttaa arvon `{ delivered, status, error }`. Uudelleenyrityksiä ei tehdä — tämä on hyödyllistä,
kun halutaan tarkistaa nopeasti, että vastaanottaja hyväksyy hyötykuorman ja allekirjoituksen.

## Hallintapaneeli

Hallintapaneelin sivu polussa `/dashboard/webhooks` (katso
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) tarjoaa seuraavat toiminnot:

- Webhookien luominen ja muokkaaminen tapahtumavalitsimella
- Tilan ilmaisin (aktiivinen / ei-aktiivinen / virhetilassa), joka perustuu arvoihin `enabled`,
  `failure_count` ja `last_status`
- Testitoimitus yhdellä napsautuksella
- Manuaalinen käyttöönotto- ja käytöstäpoistokytkin

## Hyötykuormaesimerkit

### request.completed

```json
{
  "event": "request.completed",
  "timestamp": "2026-05-13T20:30:00.123Z",
  "data": {
    "trace_id": "...",
    "api_key_id": "...",
    "provider": "openai",
    "model": "gpt-5",
    "status": 200,
    "tokens_in": 142,
    "tokens_out": 350,
    "cost_usd": 0.0042
  }
}
```

### test.ping

```json
{
  "event": "test.ping",
  "timestamp": "2026-05-13T20:32:00.000Z",
  "data": {
    "message": "Test webhook delivery from OmniRoute",
    "webhookId": "<uuid>"
  }
}
```

Muiden kuin `test.ping`-tapahtumien kenttien rakenteet määräytyvät ne lähettävien
kutsukohtien mukaan. Käsittele `data`-objektia eteenpäin yhteensopivana (kenttiä
voidaan lisätä, älä luota niiden puuttumiseen).

## Parhaat käytännöt

- **Vahvista allekirjoitus jokaisella toimituskerralla** raakaa runkoa vasten — tämä estää
  väärennetyt POST-pyynnöt henkilöiltä, jotka arvaavat webhookisi URL-osoitteen.
- **Vastaa 2xx-koodilla noin 5 sekunnin kuluessa** — lähetin aikakatkaisee pyynnön 10 sekunnin
  kuluttua. Hitaat vastaanottajat kuluttavat uudelleenyrityksiä ja kasvattavat `failure_count`-arvoa.
- **Tee käsittelijöistä idempotentteja** — uudelleenyritykset ja vähintään kerran tapahtuvan
  toimituksen semantiikka tarkoittavat, että kaksoiskappaleet ovat mahdollisia.
- **Tilaa vain välttämättömät tapahtumat** — luettele ainoastaan tapahtumat, joita todella käytät;
  `"*"` lisää kuormitusta vastaanottajille, joita et hallitse.
- **Seuraa `failure_count`-arvoa** — päätepisteet poistetaan automaattisesti käytöstä 10 peräkkäisen
  epäonnistumisen jälkeen. Nollaa laskuri korjattuasi vastaanottajan kutsumalla
  `PUT /api/webhooks/[id]` arvolla `enabled: true`.
- **Vaihda salaisuudet säännöllisesti** — aseta uusi `secret` `PUT`-pyynnöllä, ota uusi arvo
  käyttöön vastaanottajassa ja vahvista toimivuus testipäätepisteen kautta.

## Katso myös

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — hallinta-API:n koko rajapinta
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — palveluntarjoajien virheiden taustalla
  oleva piirikatkaisimen ja jäähdytysajan semantiikka, joka näkyy `request.failed`-tapahtumina
- Lähdekoodi: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
