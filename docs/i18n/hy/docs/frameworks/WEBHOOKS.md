# Webhooks (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **Ճշմարտության աղբյուրը՝** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **Վերջին թարմացումը՝** 2026-06-28 — v3.8.40

OmniRoute-ը կարող է HTTP վեբհուկներ գործարկել հարթակի իրադարձությունների դեպքում։ Օգտագործեք դրանք՝
Slack-ի, PagerDuty-ի, Datadog-ի, ներքին ահազանգման ծառայությունների կամ ցանկացած HTTP ստացողի հետ ինտեգրվելու համար։

Դիսպետչերը յուրաքանչյուր առաքում ստորագրում է HMAC-SHA256-ով, կրկին փորձում է անցողիկ
ձախողումների դեպքում, հետևում է յուրաքանչյուր վեբհուկի առաքման վիճակին և ինքնաշխատ կերպով անջատում է
շարունակաբար ձախողվող վերջնակետերը։

## Աջակցվող իրադարձություններ

`WebhookEvent` տիպը (`src/lib/webhooks/eventDescriptions.ts`, որն օգտագործվում է `src/lib/webhookDispatcher.ts`-ի կողմից) ներկայումս սահմանում է ճիշտ չորս իրադարձություն.

| Իրադարձություն      | Երբ է գործարկվում                                                              |
| ------------------- | ------------------------------------------------------------------------------ |
| `request.completed` | Փոխանցված հարցումը հաջողությամբ ավարտվում է                                    |
| `request.failed`    | Փոխանցված հարցումը ձախողվում է բոլոր կրկնափորձերից/պահուստային տարբերակից հետո |
| `quota.exceeded`    | API բանալին հատում է բյուջեի/քվոտայի շեմը                                      |
| `test.ping`         | Թեստային վերջնակետի կողմից օգտագործվող սինթետիկ իրադարձություն                 |

Բաժանորդագրություններն ընդունում են `"*"` բառացի արժեքը՝ բոլոր իրադարձությունները ստանալու համար։ `events`-ում
անհայտ իրադարձությունների անունները դիսպետչման ժամանակ անտեսվում են։

> Նշում․ դիսպետչերի API-ն միացված է, սակայն որոշ ոչ-`test.ping`
> իրադարձությունների արտադրական կանչի վայրերը դեռ ավելացվում են։ Ստուգեք `grep dispatchEvent`-ը՝ տեսնելու համար,
> թե ձեր թողարկման որ ուղիներն են ներկայումս կանչում դիսպետչերը։

## Ճարտարապետություն

```
Կանչող (մշակիչ, ծառայություն, մոնիտոր)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> զտել ըստ webhook.events-ի
    -> յուրաքանչյուր համապատասխանության համար (զուգահեռաբար).
       deliverWebhook(url, payload, secret)
         կառուցել payload-ը՝ { event, timestamp, data }
         ստորագրել body-ն HMAC-SHA256-ով (եթե secret-ն առկա է)
         POST՝ 10 վրկ. ժամանակային սահմանափակմամբ
         կատարել մինչև 3 կրկնափորձ 5xx-ի / ցանցային սխալի դեպքում
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

Դիսպետչումը կանչողի համար «գործարկել և չսպասել» սկզբունքով է․ `Promise.allSettled`-ը կլանում է
յուրաքանչյուր վեբհուկի սխալները, որպեսզի մեկ անսարք ստացող չկարողանա արգելափակել մյուսներին։

## HMAC ստորագրում

Երբ վեբհուկն ունի `secret`, OmniRoute-ը ստորագրում է JSON մարմինը և ուղարկում՝

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> Վերնագրերի անուններն օգտագործում են `X-Webhook-*` նախածանցը (ոչ թե `X-OmniRoute-*`)։ Ստորագրության
> արժեքը `sha256=<hex>` է․ ստուգեք ամբողջ նախածանցը։

Եթե `createWebhook`-ը կանչվում է առանց secret-ի, DB մոդուլը ստեղծում է այն
(`whsec_<48 hex>`), ուստի բոլոր վեբհուկները լռելյայն ստորագրվում են։

### Ստուգում ստացողի կողմում

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

Միշտ ստուգեք հարցման **չմշակված** մարմնի հիման վրա՝ նախքան JSON-ի որևէ վերլուծում։

## Կրկնափորձերի և ձախողումների քաղաքականություն

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- Յուրաքանչյուր փորձի համար սահմանված է 10 վայրկյան սպասաժամանակ (`AbortController`)։
- HTTP 2xx պատասխանը համարվում է հաջողություն։
- HTTP 3xx/4xx պատասխանը համարվում է վերջնական կարգավիճակ, որի դեպքում կրկնափորձ չի կատարվում․ առաքումը գրանցվում է որպես կատարված՝
  `success = res.ok` արժեքով։
- HTTP 5xx պատասխանների և ցանցային սխալների դեպքում կատարվում են կրկնափորձեր՝ էքսպոնենցիալ հետաձգմամբ․
  `2^attempt * 1000 ms` (1վ, 2վ, 4վ)։
- `maxRetries`-ից հետո առաքումը գրանցվում է որպես ձախողված։
- Յուրաքանչյուր առաքում թարմացնում է `last_triggered_at`, `last_status` դաշտերը և կամ զրոյացնում,
  կամ ավելացնում է `failure_count`-ը։
- Յուրաքանչյուր բազմակի առաքումից հետո դիսպետչերը կանչում է `disableWebhooksWithHighFailures(10)`,
  ուստի `failure_count >= 10` ունեցող ցանկացած webhook ինքնաշխատ կերպով անջատվում է։

## Տվյալների բազա

`webhooks` աղյուսակ (միգրացիա՝ `011_webhooks.sql`)․

| Սյունակ             | Տեսակ   | Նշումներ                                               |
| ------------------- | ------- | ------------------------------------------------------ |
| `id`                | TEXT PK | UUID                                                   |
| `url`               | TEXT    | Նպատակակետ URL                                         |
| `events`            | TEXT    | JSON զանգված․ լռելյայն՝ `["*"]`                        |
| `secret`            | TEXT    | HMAC գաղտնիք (ինքնաշխատ գեներացվում է, եթե նշված չէ)   |
| `enabled`           | INT     | 0/1․ լռելյայն՝ 1                                       |
| `description`       | TEXT    | Մարդու համար նախատեսված կամընտիր պիտակ                 |
| `created_at`        | TEXT    | `datetime('now')`                                      |
| `last_triggered_at` | TEXT    | Թարմացվում է առաքման յուրաքանչյուր փորձի ժամանակ       |
| `last_status`       | INT     | Վերջին փորձի HTTP կարգավիճակը (0 = ցանց)               |
| `failure_count`     | INT     | Հաջողության դեպքում զրոյացվում է, ձախողման դեպքում՝ +1 |

Առաքումների պատմությունը պահպանվում է հատուկ `webhook_deliveries` աղյուսակում
(միգրացիա՝ `069_webhook_deliveries.sql`, յուրաքանչյուր փորձի ժամանակ գրանցվում է
`src/lib/db/webhookDeliveries.ts::insertDelivery`-ի միջոցով), ի լրումն
`webhooks` տողի ագրեգացված հաշվիչների։ Տեսակի մետատվյալները (Slack / Discord /
Telegram / հատուկ payload փոխակերպիչներ) ավելացվել են `070_webhooks_kind_metadata.sql`-ով։

## REST API

Բոլոր վերջնակետերը պահանջում են կառավարման նույնականացում (`requireManagementAuth`)։

| Վերջնակետ                       | Մեթոդ  | Նկարագրություն                                    |
| ------------------------------- | ------ | ------------------------------------------------- |
| `/api/webhooks`                 | GET    | Ցուցադրել webhook-ները (գաղտնիքները քողարկված են) |
| `/api/webhooks`                 | POST   | Ստեղծել webhook                                   |
| `/api/webhooks/[id]`            | GET    | Webhook-ի մանրամասները (ամբողջական գաղտնիքով)     |
| `/api/webhooks/[id]`            | PUT    | Թարմացնել դաշտերը                                 |
| `/api/webhooks/[id]`            | DELETE | Հեռացնել                                          |
| `/api/webhooks/[id]/test`       | POST   | Ուղարկել `test.ping` (առանց կրկնափորձերի)         |
| `/api/webhooks/[id]/deliveries` | GET    | Մեկ webhook-ի առաքման վերջին փորձերը              |
| `/api/webhooks/validate-url`    | POST   | URL-ի նախնական վավերացում (SSRF պաշտպանություն)   |

`GET /api/webhooks`-ը քողարկում է գաղտնիքը՝ որպես `<առաջին 10 նիշը>...`, որպեսզի
ցուցակների էջերում այն չարտահոսի։ Երբ գաղտնիքն իսկապես անհրաժեշտ է, օգտագործեք
`[id]` GET-ը։

### Webhook-ի ստեղծում

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

Եթե `secret`-ը բաց է թողնված, սերվերը գեներացնում է `whsec_<hex>` գաղտնիք և
վերադարձնում այն պատասխանում։

### Webhook-ի փորձարկում

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

Վերադարձնում է `{ delivered, status, error }`։ Կրկնափորձեր չեն կատարվում․ սա օգտակար է
արագ ստուգելու համար, թե արդյոք ստացողն ընդունում է payload-ը և ստորագրությունը։

## Կառավարման վահանակ

`/dashboard/webhooks` հասցեում գտնվող կառավարման վահանակի էջը (տե՛ս
`src/app/(dashboard)/dashboard/webhooks/page.tsx`) տրամադրում է՝

- Իրադարձությունների ընտրիչով վեբհուքերի ստեղծում/խմբագրում
- Կարգավիճակի ցուցիչ (ակտիվ / ոչ ակտիվ / սխալով)՝ հիմնված `enabled`,
  `failure_count` և `last_status` դաշտերի վրա
- Թեստային առաքում մեկ սեղմումով
- Ձեռքով միացնելու/անջատելու փոխարկիչ

## Օգտակար բեռի օրինակներ

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

Ոչ `test.ping` իրադարձությունների դաշտերի կառուցվածքները սահմանվում են դրանք
արձակող կանչի վայրերով․ `data` օբյեկտը դիտարկեք որպես հետագա փոփոխությունների
հետ համատեղելի (դաշտեր ավելացրեք, մի՛ հիմնվեք դրանց բացակայության վրա)։

## Լավագույն գործելակերպեր

- **Յուրաքանչյուր առաքման ժամանակ ստուգեք ստորագրությունը**՝ համեմատելով այն
  չմշակված մարմնի հետ․ սա կանխում է կեղծված POST հարցումները յուրաքանչյուրից,
  ով կռահել է ձեր վեբհուքի URL-ը։
- **Պատասխանեք 2xx կոդով մոտավորապես 5 վայրկյանի ընթացքում**․ դիսպետչերի
  սպասման ժամանակը սպառվում է 10 վրկ անց։ Դանդաղ ընդունիչները կսպառեն
  կրկնափորձերը և կմեծացնեն `failure_count`-ը։
- **Մշակիչները դարձրեք իդեմպոտենտ**․ կրկնափորձերը և առնվազն մեկ անգամ
  առաքման սեմանտիկան նշանակում են, որ կրկնօրինակներ հնարավոր են։
- **Բաժանորդագրվեք նվազագույն ծավալով**․ նշեք միայն այն իրադարձությունները,
  որոնք իրականում օգտագործում եք․ `"*"`-ը ծախս կավելացնի ձեր կողմից
  չվերահսկվող ընդունիչների վրա։
- **Հետևեք `failure_count`-ին**․ վերջնակետերն ավտոմատ անջատվում են 10
  հաջորդական ձախողումից հետո։ Ընդունիչը շտկելուց հետո զրոյացրեք այն՝ կանչելով
  `PUT /api/webhooks/[id]`՝ `enabled: true` արժեքով։
- **Պարբերաբար փոխեք գաղտնիքները**․ `PUT` հարցմամբ սահմանեք նոր `secret`,
  նոր արժեքը տեղակայեք ընդունիչում և հաստատեք թեստային վերջնակետի միջոցով։

## Տե՛ս նաև

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — կառավարման API-ի ամբողջական մակերեսը
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — մատակարարի ձախողումների հիմքում ընկած circuit breaker / cooldown
  սեմանտիկան, որը ցուցադրվում է `request.failed`-ի միջոցով
- Աղբյուր՝ `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
