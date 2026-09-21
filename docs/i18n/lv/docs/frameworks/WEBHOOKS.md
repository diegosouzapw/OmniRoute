# Webhooks (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Patiesais avots:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Pēdējoreiz atjaunināts:** 2026-06-28 — v3.8.40

OmniRoute var nosūtīt HTTP tīmekļa aizķeres platformas notikumu gadījumā. Izmantojiet tās integrācijai ar
Slack, PagerDuty, Datadog, iekšējiem brīdinājumu pakalpojumiem vai jebkuru HTTP saņēmēju.

Dispečers katru piegādi paraksta ar HMAC-SHA256, īslaicīgu
kļūmju gadījumā veic atkārtotus mēģinājumus, izseko katras tīmekļa aizķeres piegādes stāvokli un automātiski atspējo galapunktus, kuru
darbība atkārtoti neizdodas.

## Atbalstītie notikumi

Tips `WebhookEvent` (`src/lib/webhooks/eventDescriptions.ts`, ko izmanto `src/lib/webhookDispatcher.ts`) pašlaik modelē tieši četrus notikumus:

| Notikums            | Aktivizējas, kad                                                                                |
| ------------------- | ----------------------------------------------------------------------------------------------- |
| `request.completed` | Starpniekots pieprasījums tiek sekmīgi pabeigts                                                 |
| `request.failed`    | Starpniekots pieprasījums neizdodas pēc visiem atkārtotajiem mēģinājumiem/rezerves risinājumiem |
| `quota.exceeded`    | API atslēga pārsniedz budžeta/kvotas slieksni                                                   |
| `test.ping`         | Testa galapunkta izmantots sintētisks notikums                                                  |

Abonementi pieņem literāli `"*"`, lai saņemtu visus notikumus. Nezināmi notikumu
nosaukumi laukā `events` nosūtīšanas laikā tiek ignorēti.

> Piezīme: dispečera API ir pieslēgta, taču dažu
> notikumu, kas nav `test.ping`, izsaukumu vietas produkcijas vidē joprojām tiek ieviestas. Pārbaudiet `grep dispatchEvent`, lai noskaidrotu,
> kuri ceļi pašlaik izsauc dispečeru jūsu laidienā.

## Arhitektūra

```
Izsaucējs (apstrādātājs, pakalpojums, pārraugs)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> filtrēt pēc webhook.events
    -> katrai atbilstībai (paralēli):
       deliverWebhook(url, payload, secret)
         izveidot lietderīgo slodzi { event, timestamp, data }
         parakstīt pamattekstu ar HMAC-SHA256 (ja norādīts secret)
         POST ar 10 s taimautu
         atkārtot līdz 3 reizēm 5xx / tīkla kļūdas gadījumā
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Izsaucējam nosūtīšana notiek, negaidot rezultātu: `Promise.allSettled` ignorē
atsevišķu tīmekļa aizķeru kļūdas, tāpēc viens problemātisks saņēmējs nevar bloķēt pārējos.

## HMAC parakstīšana

Ja tīmekļa aizķerei ir `secret`, OmniRoute paraksta JSON pamattekstu un nosūta:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Galveņu nosaukumi izmanto prefiksu `X-Webhook-*` (nevis `X-OmniRoute-*`). Paraksta
> vērtība ir `sha256=<hex>` — pārbaudiet pilno prefiksu.

Ja `createWebhook` tiek izsaukta bez noslēpuma, DB modulis to ģenerē
(`whsec_<48 hex>`), tāpēc pēc noklusējuma visas tīmekļa aizķeres tiek parakstītas.

### Pārbaude saņēmēja pusē

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Vienmēr pārbaudiet parakstu pret **neapstrādāto** pieprasījuma pamattekstu pirms jebkādas JSON parsēšanas.

## Atkārtotu mēģinājumu un kļūmju politika

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Katra mēģinājuma noildze ir 10 sekundes (`AbortController`).
- HTTP 2xx tiek uzskatīts par veiksmīgu rezultātu.
- HTTP 3xx/4xx tiek uzskatīts par galīgu statusu bez atkārtota mēģinājuma — piegāde tiek reģistrēta
  ar `success = res.ok`.
- HTTP 5xx un tīkla kļūdu gadījumā tiek veikti atkārtoti mēģinājumi ar eksponenciāli pieaugošu aizkavi:
  `2^attempt * 1000 ms` (1 s, 2 s, 4 s).
- Pēc `maxRetries` sasniegšanas piegāde tiek reģistrēta kā neveiksmīga.
- Katra piegāde atjaunina `last_triggered_at`, `last_status` un vai nu atiestata,
  vai palielina `failure_count`.
- Dispečers pēc katras izsūtīšanas izsauc `disableWebhooksWithHighFailures(10)`,
  tādēļ jebkurš tīmekļa aizķeres punkts ar `failure_count >= 10` tiek automātiski atspējots.

## Datubāze

Tabula `webhooks` (migrācija `011_webhooks.sql`):

| Kolonna             | Tips    | Piezīmes                                               |
| ------------------- | ------- | ------------------------------------------------------ |
| `id`                | TEXT PK | UUID                                                   |
| `url`               | TEXT    | Galamērķa URL                                          |
| `events`            | TEXT    | JSON masīvs; noklusējums `["*"]`                       |
| `secret`            | TEXT    | HMAC noslēpums (automātiski ģenerēts, ja nav norādīts) |
| `enabled`           | INT     | 0/1; noklusējums ir 1                                  |
| `description`       | TEXT    | Neobligāta cilvēklasāma etiķete                        |
| `created_at`        | TEXT    | `datetime('now')`                                      |
| `last_triggered_at` | TEXT    | Atjaunināts katrā piegādes mēģinājumā                  |
| `last_status`       | INT     | Pēdējā mēģinājuma HTTP statuss (0 = tīkls)             |
| `failure_count`     | INT     | Veiksmes gadījumā atiestatīts uz 0, kļūmes gadījumā +1 |

Piegāžu vēsture tiek glabāta īpašajā tabulā `webhook_deliveries`
(migrācija `069_webhook_deliveries.sql`, katrā mēģinājumā ierakstīta, izmantojot
`src/lib/db/webhookDeliveries.ts::insertDelivery`), papildus apkopotajiem
skaitītājiem tabulas `webhooks` rindā. Veida metadati (Slack / Discord /
Telegram / pielāgoti lietderīgās slodzes pārveidotāji) tika pievienoti ar `070_webhooks_kind_metadata.sql`.

## REST API

Visiem galapunktiem ir nepieciešama pārvaldības autentifikācija (`requireManagementAuth`).

| Galapunkts                      | Metode | Apraksts                                                  |
| ------------------------------- | ------ | --------------------------------------------------------- |
| `/api/webhooks`                 | GET    | Uzskaitīt tīmekļa aizķeres punktus (noslēpumi maskēti)    |
| `/api/webhooks`                 | POST   | Izveidot tīmekļa aizķeres punktu                          |
| `/api/webhooks/[id]`            | GET    | Tīmekļa aizķeres punkta informācija (pilns noslēpums)     |
| `/api/webhooks/[id]`            | PUT    | Atjaunināt laukus                                         |
| `/api/webhooks/[id]`            | DELETE | Noņemt                                                    |
| `/api/webhooks/[id]/test`       | POST   | Nosūtīt `test.ping` (bez atkārtotiem mēģinājumiem)        |
| `/api/webhooks/[id]/deliveries` | GET    | Viena tīmekļa aizķeres punkta nesenie piegādes mēģinājumi |
| `/api/webhooks/validate-url`    | POST   | Iepriekšēja URL validācija (SSRF aizsardzība)             |

`GET /api/webhooks` maskē noslēpumu formātā `<pirmās 10 rakstzīmes>...`, lai izvairītos no tā
nopludināšanas saraksta lapās. Izmantojiet `[id]` GET pieprasījumu, kad noslēpums patiešām ir nepieciešams.

### Tīmekļa aizķeres punkta izveide

```bash
curl -X POST http://localhost:20128/api/webhooks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://hooks.slack.com/services/...",
    "secret": "whsec_my_shared_secret",
    "events": ["quota.exceeded", "request.failed"],
    "description": "Slack alerts"
  }'
```

Ja `secret` nav norādīts, serveris ģenerē `whsec_<hex>` noslēpumu un atgriež
to atbildē.

### Tīmekļa aizķeres punkta testēšana

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Atgriež `{ delivered, status, error }`. Atkārtoti mēģinājumi netiek veikti — tas ir noderīgi,
lai ātri pārbaudītu, vai saņēmējs pieņem lietderīgo slodzi un parakstu.

## Informācijas panelis

Informācijas paneļa lapa `/dashboard/webhooks` (skatiet
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) nodrošina:

- Tīmekļa aizķeru izveidi un rediģēšanu ar notikumu atlasītāju
- Statusa indikatoru (aktīvs / neaktīvs / ar kļūdu), kura pamatā ir `enabled`,
  `failure_count` un `last_status`
- Testa piegādi ar vienu klikšķi
- Manuālu ieslēgšanas/izslēgšanas slēdzi

## Derīgo datu piemēri

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

Lauku struktūras notikumiem, kas nav `test.ping`, nosaka izsaukuma vietas, kuras
tos emitē; uzskatiet objektu `data` par turpmāk saderīgu (pievienojiet laukus,
nepaļaujieties uz to neesamību).

## Labākā prakse

- **Pārbaudiet parakstu katrai piegādei**, izmantojot neapstrādāto pieprasījuma pamattekstu, — tas novērš
  viltotus POST pieprasījumus no ikviena, kurš uzmin jūsu tīmekļa aizķeres URL.
- **Atbildiet ar 2xx aptuveni 5 sekunžu laikā** — dispečera noildze ir 10 s. Lēni
  saņēmēji iztērēs atkārtotos mēģinājumus un palielinās `failure_count`.
- **Veidojiet apdarinātājus idempotentus** — atkārtoti mēģinājumi un piegādes semantika
  «vismaz vienreiz» nozīmē, ka iespējami dublikāti.
- **Abonējiet minimāli** — norādiet tikai tos notikumus, kurus faktiski patērējat; `"*"`
  palielinās izmaksas saņēmējiem, kurus jūs nekontrolējat.
- **Uzraugiet `failure_count`** — galapunkti tiek automātiski atspējoti pēc 10 secīgām
  kļūmēm; pēc saņēmēja salabošanas atiestatiet to, izsaucot `PUT /api/webhooks/[id]`
  ar `enabled: true`.
- **Periodiski mainiet noslēpumus** — ar `PUT` iestatiet jaunu `secret`, izvietojiet jauno vērtību
  saņēmējā un apstipriniet to, izmantojot testa galapunktu.

## Skatiet arī

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — pilna pārvaldības API saskarne
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — ķēdes pārtraucēja / nogaidīšanas perioda
  semantika pakalpojumu sniedzēju kļūmēm, kas tiek parādītas, izmantojot `request.failed`
- Pirmkods: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
