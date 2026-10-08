# Webhooks (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **სიმართლის წყარო:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **ბოლო განახლება:** 2026-06-28 — v3.8.40

OmniRoute-ს შეუძლია პლატფორმის მოვლენებზე HTTP ვებჰუკების გააქტიურება. გამოიყენეთ ისინი
Slack-თან, PagerDuty-სთან, Datadog-თან, შიდა შეტყობინებების სერვისებთან ან ნებისმიერ HTTP მიმღებთან ინტეგრაციისთვის.

დისპეტჩერი თითოეულ მიწოდებას HMAC-SHA256-ით ხელს აწერს, დროებითი
შეცდომების შემთხვევაში ხელახლა ცდილობს, თითოეული ვებჰუკის მიწოდების მდგომარეობას აკონტროლებს და ავტომატურად თიშავს იმ საბოლოო წერტილებს,
რომლებიც გამუდმებით წარუმატებელია.

## მხარდაჭერილი მოვლენები

`WebhookEvent` ტიპი (`src/lib/webhooks/eventDescriptions.ts`, რომელსაც იყენებს `src/lib/webhookDispatcher.ts`) ამჟამად ზუსტად ოთხ მოვლენას მოდელირებს:

| მოვლენა             | როდის აქტიურდება                                                                             |
| ------------------- | -------------------------------------------------------------------------------------------- |
| `request.completed` | პროქსირებული მოთხოვნა წარმატებით სრულდება                                                    |
| `request.failed`    | პროქსირებული მოთხოვნა ყველა განმეორებითი მცდელობის/სათადარიგო ვარიანტის შემდეგ წარუმატებელია |
| `quota.exceeded`    | API გასაღები ბიუჯეტის/კვოტის ზღვარს გადაკვეთს                                                |
| `test.ping`         | ტესტის საბოლოო წერტილის მიერ გამოყენებული სინთეზური მოვლენა                                  |

გამოწერებში შესაძლებელია ლიტერალის `"*"` მითითება ყველა მოვლენის მისაღებად. `events`-ში
უცნობი მოვლენების სახელები დისპეტჩერიზაციის დროს იგნორირდება.

> შენიშვნა: დისპეტჩერის API დაკავშირებულია, თუმცა ზოგიერთი არა-`test.ping`
> მოვლენის საწარმოო გამოძახების ადგილები ჯერ კიდევ ინერგება. შეამოწმეთ `grep dispatchEvent`, რათა ნახოთ,
> თქვენს გამოშვებაში რომელი გზები იძახებს ამჟამად დისპეტჩერს.

## არქიტექტურა

```
გამომძახებელი (დამმუშავებელი, სერვისი, მონიტორი)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> გაფილტვრა webhook.events-ის მიხედვით
    -> თითოეული დამთხვევისთვის (პარალელურად):
       deliverWebhook(url, payload, secret)
         payload-ის აგება { event, timestamp, data }
         body-ზე ხელმოწერა HMAC-SHA256-ით (თუ secret არსებობს)
         POST 10-წამიანი დროის ამოწურვით
         მაქსიმუმ 3 ხელახალი მცდელობა 5xx / ქსელის შეცდომის შემთხვევაში
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

გამომძახებლისთვის დისპეტჩერიზაცია გაშვებისა და დავიწყების პრინციპით მუშაობს: `Promise.allSettled`
თითოეული ვებჰუკის შეცდომას შთანთქავს, რათა ერთმა გაუმართავმა მიმღებმა სხვები ვერ დაბლოკოს.

## HMAC ხელმოწერა

როდესაც ვებჰუკს აქვს `secret`, OmniRoute JSON სხეულს ხელს აწერს და აგზავნის:

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <მოვლენა>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> სათაურების სახელები იყენებს `X-Webhook-*` პრეფიქსს (და არა `X-OmniRoute-*`-ს). ხელმოწერის
> მნიშვნელობაა `sha256=<hex>` — გადაამოწმეთ სრული პრეფიქსი.

თუ `createWebhook` გამოძახებულია საიდუმლოს გარეშე, DB მოდული თავად აგენერირებს მას
(`whsec_<48 hex>`), ამიტომ ყველა ვებჰუკს ნაგულისხმევად აქვს ხელმოწერა.

### მიმღებზე გადამოწმება

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

ყოველთვის გადაამოწმეთ მოთხოვნის **დაუმუშავებელი** სხეული, JSON-ის ნებისმიერ გარჩევამდე.

## განმეორებითი მცდელობებისა და წარუმატებლობის პოლიტიკა

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- თითოეული მცდელობისთვის განსაზღვრულია 10-წამიანი ტაიმაუტი (`AbortController`).
- HTTP 2xx წარმატებად ითვლება.
- HTTP 3xx/4xx ითვლება საბოლოო სტატუსად, რომლისთვისაც განმეორებითი მცდელობა არ სრულდება — მიწოდება რეგისტრირდება
  `success = res.ok` მნიშვნელობით.
- HTTP 5xx პასუხებისა და ქსელური შეცდომების შემთხვევაში მცდელობა მეორდება ექსპონენციალური დაყოვნებით:
  `2^attempt * 1000 ms` (1წმ, 2წმ, 4წმ).
- `maxRetries` მცდელობის შემდეგ მიწოდება წარუმატებლად რეგისტრირდება.
- ყოველი მიწოდება განაახლებს `last_triggered_at`-ს, `last_status`-ს და ან ანულებს,
  ან ზრდის `failure_count`-ს.
- დისპეტჩერი ყოველი ერთიდან მრავალზე გაგზავნის შემდეგ იძახებს `disableWebhooksWithHighFailures(10)`-ს,
  ამიტომ ნებისმიერი webhook, რომლის `failure_count >= 10`, ავტომატურად ითიშება.

## მონაცემთა ბაზა

ცხრილი `webhooks` (მიგრაცია `011_webhooks.sql`):

| სვეტი               | ტიპი    | შენიშვნები                                                     |
| ------------------- | ------- | -------------------------------------------------------------- |
| `id`                | TEXT PK | UUID                                                           |
| `url`               | TEXT    | დანიშნულების URL                                               |
| `events`            | TEXT    | JSON მასივი; ნაგულისხმევია `["*"]`                             |
| `secret`            | TEXT    | HMAC საიდუმლო (ავტომატურად გენერირდება, თუ არ არის მითითებული) |
| `enabled`           | INT     | 0/1; ნაგულისხმევია 1                                           |
| `description`       | TEXT    | არასავალდებულო, ადამიანისთვის გასაგები ეტიკეტი                 |
| `created_at`        | TEXT    | `datetime('now')`                                              |
| `last_triggered_at` | TEXT    | ახლდება მიწოდების ყოველი მცდელობისას                           |
| `last_status`       | INT     | ბოლო მცდელობის HTTP სტატუსი (0 = ქსელი)                        |
| `failure_count`     | INT     | წარმატებისას ნულდება, წარუმატებლობისას +1                      |

მიწოდების ისტორია ინახება სპეციალურ `webhook_deliveries` ცხრილში
(მიგრაცია `069_webhook_deliveries.sql`, თითოეულ მცდელობაზე იწერება
`src/lib/db/webhookDeliveries.ts::insertDelivery`-ის მეშვეობით), `webhooks`-ის სტრიქონში არსებულ
აგრეგირებულ მრიცხველებთან ერთად. ტიპის მეტამონაცემები (Slack / Discord /
Telegram / მორგებული payload-ის გარდამქმნელები) დაემატა `070_webhooks_kind_metadata.sql`-ით.

## REST API

ყველა endpoint მოითხოვს მართვის ავტორიზაციას (`requireManagementAuth`).

| Endpoint                        | მეთოდი | აღწერა                                                    |
| ------------------------------- | ------ | --------------------------------------------------------- |
| `/api/webhooks`                 | GET    | webhook-ების სია (საიდუმლოები შენიღბულია)                 |
| `/api/webhooks`                 | POST   | webhook-ის შექმნა                                         |
| `/api/webhooks/[id]`            | GET    | webhook-ის დეტალები (სრული საიდუმლო)                      |
| `/api/webhooks/[id]`            | PUT    | ველების განახლება                                         |
| `/api/webhooks/[id]`            | DELETE | წაშლა                                                     |
| `/api/webhooks/[id]/test`       | POST   | `test.ping`-ის გაგზავნა (განმეორებითი მცდელობების გარეშე) |
| `/api/webhooks/[id]/deliveries` | GET    | ერთი webhook-ის მიწოდების ბოლო მცდელობები                 |
| `/api/webhooks/validate-url`    | POST   | URL-ის წინასწარი ვალიდაცია (SSRF-ისგან დაცვა)             |

`GET /api/webhooks` სიების გვერდებზე გაჟონვის თავიდან ასაცილებლად საიდუმლოს
`<first 10 chars>...` ფორმატში ნიღბავს. როდესაც საიდუმლო ნამდვილად გჭირდებათ, გამოიყენეთ `[id]` GET.

### webhook-ის შექმნა

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

თუ `secret` გამოტოვებულია, სერვერი ქმნის `whsec_<hex>` საიდუმლოს და მას
პასუხში აბრუნებს.

### webhook-ის ტესტირება

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

აბრუნებს `{ delivered, status, error }`-ს. განმეორებითი მცდელობები არ სრულდება — ეს სასარგებლოა
იმის სწრაფად შესამოწმებლად, მიმღები იღებს თუ არა payload-სა და ხელმოწერას.

## მართვის პანელი

მართვის პანელის გვერდი მისამართზე `/dashboard/webhooks` (იხილეთ
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) უზრუნველყოფს:

- ვებჰუკების შექმნას/რედაქტირებას მოვლენების ამრჩევით
- სტატუსის ინდიკატორს (აქტიური / არააქტიური / შეცდომიანი), რომელიც ეფუძნება `enabled`,
  `failure_count` და `last_status` მნიშვნელობებს
- სატესტო მიწოდებას ერთი დაწკაპუნებით
- ხელით ჩართვის/გამორთვის გადამრთველს

## სასარგებლო დატვირთვის მაგალითები

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
    "message": "სატესტო ვებჰუკის მიწოდება OmniRoute-იდან",
    "webhookId": "<uuid>"
  }
}
```

არა-`test.ping` მოვლენების ველების სტრუქტურა განისაზღვრება მათი გამომგზავნი გამოძახების ადგილებით;
`data` ობიექტი განიხილეთ, როგორც მომავალ ცვლილებებთან თავსებადი (დაამატეთ ველები და ნუ დაეყრდნობით
მათ არარსებობას).

## საუკეთესო პრაქტიკები

- **ყოველი მიწოდებისას გადაამოწმეთ ხელმოწერა** დაუმუშავებელ სხეულთან მიმართებით — ეს ხელს უშლის
  ყალბ POST მოთხოვნებს ნებისმიერი პირისგან, ვინც თქვენს ვებჰუკის URL-ს გამოიცნობს.
- **დააბრუნეთ 2xx პასუხი დაახლოებით 5 წამში** — დისპეტჩერის მოლოდინის ვადა 10 წამში იწურება. ნელი
  მიმღებები განმეორებით მცდელობებს დახარჯავენ და `failure_count` მნიშვნელობას გაზრდიან.
- **ჰენდლერები იდემპოტენტური გახადეთ** — განმეორებითი მცდელობები და სულ მცირე ერთხელ მიწოდების სემანტიკა
  ნიშნავს, რომ დუბლიკატები შესაძლებელია.
- **გამოიწერეთ მინიმალურად** — ჩამოთვალეთ მხოლოდ ის მოვლენები, რომლებსაც რეალურად ამუშავებთ; `"*"`
  დამატებით ხარჯს წარმოშობს მიმღებებზე, რომლებსაც თქვენ არ აკონტროლებთ.
- **თვალი ადევნეთ `failure_count`-ს** — ენდპოინტები ზედიზედ 10 წარუმატებლობის შემდეგ ავტომატურად
  ითიშება; მიმღების გამოსწორების შემდეგ მრიცხველი გაანულეთ `PUT /api/webhooks/[id]` გამოძახებით,
  სადაც მითითებულია `enabled: true`.
- **პერიოდულად განაახლეთ საიდუმლოები** — `PUT` მოთხოვნით დააყენეთ ახალი `secret`, ახალი მნიშვნელობა
  განათავსეთ მიმღებზე და სატესტო ენდპოინტის მეშვეობით დაადასტურეთ.

## აგრეთვე იხილეთ

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — მართვის API-ის სრული ზედაპირი
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — პროვაიდერის იმ შეფერხებების უკან არსებული circuit breaker / cooldown
  სემანტიკა, რომლებიც `request.failed`-ის მეშვეობით არის წარმოდგენილი
- წყარო: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
