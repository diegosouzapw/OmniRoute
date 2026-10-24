# Resilience Guide (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute-ն ունի երեք տարբեր, բայց փոխկապակցված դիմացկունության մեխանիզմ։ Յուրաքանչյուրն ունի տարբեր շրջանակ և նպատակ։ Երթուղավորման վարքագիծը վրիպազերծելիս դրանք առանձին պահեք։

![3-շերտ դիմացկունության մոդել](../diagrams/exported/resilience-3layers.svg)

> Աղբյուր՝ [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. Պրովայդերի Circuit Breaker

**Շրջանակ՝** ամբողջ պրովայդերը (օր.՝ `glm`, `openai`, `anthropic`)։

**Նպատակ՝** դադարեցնել տրաֆիկի ուղարկումը պրովայդերին, որը կրկնվող ձախողումներ է ունենում upstream/ծառայության մակարդակում։

**Իրականացում՝**

- Հիմնական դասը՝ `src/shared/utils/circuitBreaker.ts`
- Կապակցումը՝ `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Կարգավիճակի API՝ `GET /api/monitoring/health`
- Վերակայման API՝ `POST /api/resilience/reset`
- Փաթեթավորողներ՝ `open-sse/services/accountFallback.ts`
- Տվյալների բազայի աղյուսակը՝ `domain_circuit_breakers`

**Վիճակները՝**

- `CLOSED` — թույլատրվում է նորմալ տրաֆիկ
- `DEGRADED` — տրաֆիկը դեռ թույլատրվում է, բայց գրանցվում են պրովայդերի բարձրացած ձախողումները. վերադառնում է `CLOSED`-ի բավարար հաջողությունների դեպքում, վավեր կապի թեստի դեպքում, կամ վերջին ձախողման տեսակի համար ամենաերկար `OPEN` պահման ժամկետը լրանալուց հետո (նրա `cooldownByKind` արժեքը, հակառակ դեպքում՝ `resetTimeout`, × `maxBackoffMultiplier`, առնվազն մեկ cooldown) առանց նոր ձախողման
- `OPEN` — պրովայդերը ժամանակավորապես արգելափակված է. combo երթուղավորումը շրջանցում է այն
- `HALF_OPEN` — վերակայման ժամկետը լրացել է. թույլատրվում է փորձնական հարցում

**Կարգավորվող լռելյայն արժեքներ (`open-sse/config/constants.ts`, ցուցադրվում են Dashboard → Settings → Resilience-ում)՝**

| Դաս     | Դեգրադացում | Բացում      | Վերակայման ժամկետ |
| ------- | ----------- | ----------- | ----------------- |
| OAuth   | 5 ձախողում  | 8 ձախողում  | 60 վրկ            |
| API-key | 7 ձախողում  | 12 ձախողում | 30 վրկ            |
| Local   | ածանցյալ    | 2 ձախողում  | 15 վրկ            |

`degradationThreshold`-ը կառավարում է, թե երբ պրովայդերը մտնում է `DEGRADED`. `failureThreshold`-ը կառավարում է, թե երբ այն բացվում է և շրջանցվում։ Տեղական (Local) պրովայդերի պրոֆիլները դեռևս ցուցադրված չեն Resilience կարգավորումների էջում։

**Գործարկման կոդեր՝** միայն պրովայդերի մակարդակի կարգավիճակներ՝ `[408, 500, 502, 503, 504]`։ ՄԻ գործարկեք հաշվի մակարդակի սխալների համար (401/403/429-ի մեծ մասը — դրանք պատկանում են cooldown-ին կամ lockout-ին)։

**Ծույլ վերականգնում՝** երբ `OPEN`-ը լրանում է, `getStatus()`, `canExecute()`, `getRetryAfterMs()`-ը թարմացնում են վիճակը `HALF_OPEN`-ի։ Նույն ընթերցումները (և հաջորդ ձախողումը) հնացած `DEGRADED`-ը հետ են իջեցնում `CLOSED`-ի։ Ֆոնային ժամաչափ պետք չէ։

---

### Օպտ-ին գլոբալ Պրովայդերի Cooldown (պատուհանի դարպաս)

Չորրորդ, **օպտ-ին** շերտը (`PROVIDER_COOLDOWN_ENABLED`, լռելյայն՝ **անջատված**) պահում է
ձախողվող պրովայդերների միջհարցումային հիշողություն
`open-sse/services/providerCooldownTracker.ts`-ում, որին դիմում է combo-ի թիրախի
որոշումը, որպեսզի հաջորդական combo հարցումները չշարունակեն նորից անցնել հենց նոր
ձախողված պրովայդերով։ Պրովայդերի մակարդակի գրառումները ենթարկվում են `PROVIDER_PROFILES` պատուհանի դարպասին՝

| Պրոֆիլ  | Գործարկվում է հետո (`providerFailureThreshold`) | Պատուհանի ընթացքում (`providerFailureWindowMs`) | Սառչում է (`providerCooldownMs`) |
| ------- | ----------------------------------------------: | ----------------------------------------------: | -------------------------------: |
| OAuth   |                                            `10` |                                         `15min` |                           `5min` |
| API key |                                            `15` |                                         `30min` |                          `10min` |

Շեմից ցածր պրովայդերը **չի** համարվում սառեցվող. հաջողությունը մաքրում է
պատուհանը։ Կապի մակարդակի գրառումները (`provider:connectionId`) փոխարենը պահպանում են
էքսպոնենցիալ `minRetryCooldownMs → maxRetryCooldownMs` հետաճը։ Վերասահմանումներ՝
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`։
Ռեգրեսիայի պաշտպան՝ `tests/unit/provider-cooldown-window-gate.test.ts`։

## 2. Կապի սառեցում (connection cooldown)

**Ծածկույթ:** մեկ պրովայդերի կապ/հաշիվ/բանալի։

**Նպատակ:** բաց թողնել մեկ վատ բանալի, քանի դեռ նույն պրովայդերի մյուս կապերը շարունակում են սպասարկել։

**Իրականացում:**

- Նշել անհասանելի որպես՝ `src/sse/services/auth.ts::markAccountUnavailable()`
- Ընտրություն՝ `getProviderCredentials*` նույն ֆայլում
- Սառեցման հաշվարկ՝ `open-sse/services/accountFallback.ts::checkFallbackError()`
- Կարգավորումներ՝ `src/lib/resilience/settings.ts`

**Դաշտեր յուրաքանչյուր կապի համար՝**

- `rateLimitedUntil` — ժամանականշան, մինչև սառեցման ավարտը
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — էքսպոնենցիալ հետընթացի հաշվիչ

**Լռելյայն սառեցումներ՝**

- OAuth հիմք՝ 5s
- API-key հիմք՝ 3s
- API-key 429՝ նախապատվությունը տալիս է upstream `Retry-After`/reset վերնագրերին/վերլուծելի reset տեքստին
- Հետընթաց (backoff)՝ `baseCooldownMs * 2 ** failureIndex`

**Հակաթնդացող-հոտի պաշտպանություն (anti-thundering-herd):** կանխում է զուգահեռ ձախողումներից սառեցման չափից ավելի երկարաձգումը կամ `backoffLevel`-ի կրկնակի աճը։

**Զուգահեռության սահմանի 429-երը չեն բարձրանում backoff սանդղակով։** `429`-ը, որի մարմինը հաղորդում է
զուգահեռության սահմանի մասին ("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`), նշանակում է, որ հաշիվը առողջ է, բայց զբաղված։
`checkFallbackError()`-ը վերադարձնում է `concurrency_limited` պատճառը՝ այժմ անցում կատարել հաջորդ
կապին, այս մեկը սառեցնել ֆիքսված `CONCURRENCY_LIMIT_COOLDOWN_MS`-ով (1s) կամ
upstream-ի retry հուշումով, `backoffLevel`-ը թողնել անփոփոխ և սահմանել `skipProviderBreaker`։
Բացահայտ քվոտայի մարմինը դեռ գերակայում է, այնպես որ մարմինը, որը նաև համապատասխանում է քվոտայի օրինակին, մնում է քվոտայի
վճիռ։ Հայտնաբերում՝ `looksLikeConcurrencyLimit()` `src/shared/utils/classify429.ts`-ում;
վճիռ՝ `open-sse/services/accountFallback/concurrencyLimit429.ts`։ `classify429()`-ը (breaker-ի `FailureKind`-ը) անփոփոխ է և այս մարմինների համար դեռ կարդում է `rate_limit`։

**Հոսքի բովանդակության կանգերը չեն սառեցնում հաշիվը։** Երբ բովանդակության կանգի հսկիչը
(`open-sse/utils/streamHandler.ts`) հրաժարվում է հոսքից, որը ժամանակին չի ուղարկել մոդելի ելք,
`markAccountUnavailable()`-ը գրանցում է սխալը կապի վրա, բայց սառեցում չի սահմանում.
կանգը պատկանում է այդ հարցմանը, ամենից հաճախ երկար reasoning փուլ է՝ առանց ելքի։ Օպերատորները
կարող են նորից միացնել `resilienceSettings.streamStallCooldown.enabled`-ով
(լռելյայն `false`)։

**Reasoning շրջանակները վերագործարկում են բովանդակության կանգի բյուջեն։** Reasoning մոդելը կարող է մտածել
րոպեներ շարունակ իր առաջին տեսանելի token-ից առաջ. Claude-ը հոսքով ուղարկում է `thinking_delta` շրջանակներ, որոնց
մտածողության տեքստը կարող է դատարկ լինել, իսկ Responses API-ն ուղարկում է մեկ reasoning տարր մյուսի հետևից։
`isReasoningProgressFrame()`-ը (`open-sse/utils/streamReadiness.ts`) ճանաչում է
այս շրջանակները, և հսկիչը վերագործարկում է իր բյուջեն յուրաքանչյուրի վրա՝ հերթափոխը չեղարկելու փոխարեն։
Դրանք դեռ մոդելի ելք չեն, այնպես որ հերթափոխը, որն ավարտվում է միայն reasoning-ով, դեռ հաղորդվում է որպես դատարկ,
և հերթափոխը, որը դադարում է reasoning-ը և ուղարկում է միայն heartbeat-ներ, դեռ բռնվում է
հսկիչի կողմից։

Kiro-ի բինար `reasoningContentEvent` շրջանակները ոչ դատարկ ստորագրությամբ (signature) պահպանում են այս
reasoning ակտիվությունը executor-ի միջով որպես դատարկ `reasoning_content` delta։ Ստորագրությունը
չի փոխանցվում։ Մետատվյալները, թերի շրջանակները և դատարկ ստորագրությունները չեն վերագործարկում
բովանդակության բյուջեն. անկախ ակտիվ հոսքի ժամանակավոր սահմանաչափը և հաճախորդի չեղարկումը դեռ
կիրառվում են (`open-sse/executors/kiro/reasoning.ts`)։

**Վերջնական վիճակներ (ՈՉ սառեցումներ)՝**

- `banned` — սահմանվում է banned-keyword / հաշվի արգելափակման հայտնաբերմամբ (տես [BAN_DETECTION](../security/BAN_DETECTION.md)), և երեք հաջորդական upstream հարցում-մերժումներով (`request_rejected`, օրինակ՝ Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`); մեկ մերժումը միայն սառեցնում է կապը
- `expired` (սահմանափակ փորձերից հետո անցնում է վերջնականի — `EXPIRED_RETRY_MAX = 3` էքսպոնենցիալ հետընթացով — այնպես որ անցողիկ OAuth սխալները կարող են ինքնաբուժվել նախքան հաշվի ընդմիշտ ապաակտիվացումը)
- `credits_exhausted`

Սրանք պահպանվում են մինչև հավատարմագրերի փոփոխությունը կամ օպերատորի կողմից դրանց վերակայումը։ Մի՛ փոխարինեք վերջնական վիճակները անցողիկ սառեցման վիճակով։

**Ծույլ վերականգնում (lazy recovery)՝** երբ `rateLimitedUntil`-ը անցել է, կապը նորից դառնում է պիտանի։ Հաջող օգտագործման դեպքում `clearAccountError()`-ը մաքրում է բոլոր սխալի դաշտերը։

### Claude OAuth օգտագործման պատ (usage wall). ավելի ցածր առաջնահերթության գիծ + սեսիայի սահմանի վերակայում

**Ծածկույթ:** մեկ Claude բաժանորդագրության (OAuth) կապ։ Երկու հատկանիշներն էլ **ընտրովի են յուրաքանչյուր
կապի համար** (Խմբագրել կապը → Claude բաժին → `lowPriorityMode` / `autoLimitReset`
`providerSpecificData`-ում, երկուսն էլ լռելյայն անջատված) և կրկնօրինակում են Claude Code-ի `/low-priority` և
`/limit-reset` հրամանները (wire պայմանագիրը գրավված Claude Code 2.1.263-ից)։

**Իրականացում:**

- Վիճակի մեքենա + պատասխանի դասակարգում՝ `open-sse/services/claudeLowPriority.ts`
- Վերակայման կարգավիճակի/claim-ի հաճախորդ՝ `open-sse/services/claudeLimitReset.ts`
- Executor-ի կեռիկ (վերնագրի ներարկում + նույն հաշվի վրա կրկնափորձ)՝ `open-sse/executors/base.ts::execute()`
- Ընտրովի պահպանում՝ `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**Գործարկիչ:** 5-ժամյա օգտագործման պատը — `429`, որի վերնագրերը կրում են
`anthropic-ratelimit-unified-status: rejected` և, երբ հաշիվը պիտանի է,
`anthropic-ratelimit-unified-slow-offer: treatment`։ Առաջին պատի 429-ից առաջ ոչինչ չի ուղարկվում. պոռթկումային 429-ը առանց unified վերնագրերի անցնում է սովորական սառեցման ուղով։

**Ավելի ցածր առաջնահերթության գիծ** (`lowPriorityMode`).

- «Պատի» 429-ի դեպքում executor-ը ընդունում է առաջարկը և անմիջապես կրկնփորձում է
  **նույն** հաշիվը `anthropic-usage-limit: slow`-ով. lane-ը ակտիվ է մնում մինչև հայտարարված
  `anthropic-ratelimit-unified-reset`-ը (+60 վ grace), և այդ պատուհանի յուրաքանչյուր հարցում
  կրում է այդ header-ը: Ընդհատված 429-ը երբեք չի հասնում `handleChatCore`-ին, ուստի
  connection-ը **չի** դրվում cooldown-ի մեջ և չի rotat-վում:
- Հետագա պատասխանների վրա `anthropic-ratelimit-unified-slow-status`-ը. `active` / `not_needed`-ը
  պահպանում են lane-ը. `slot_busy` (429) կամ `529` դեպքում սպասվում է սերվերի
  `anthropic-ratelimit-unified-slow-retry-after`-ին (լռակյաց 20 վ, սահմանափակում 5–600 վ, ±30% jitter)
  և կատարվում է կրկնփորձ՝ սահմանափակված `anthropic-ratelimit-unified-slow-max-wait`-ով (լռակյաց 20 ր,
  սահմանափակում 1 ր–6 ժ) — դրանից հետո lane-ը ավարտվում է, և 10 րոպեանոց cool-off-ը արգելափակում է
  վերաընդունումը: Սպասումը լրացուցիչ սահմանափակված է հարցման սեփական upstream-մեկնարկի
  timeout-ի մնացորդով (`resolveFetchStartTimeout`, լռակյաց 10 ր)՝ հանած 5 վ մարգա. առանց այդ
  սահմանափակման 20 րոպեանոց լռակյաց max-wait-ը կգերազանցեր հարցման կյանքի տևողությունը, և
  sleep-ը կընդհատվեր սպասման կեսին՝ առաջացնելով `TimeoutError`՝ grace-ով ավարտվող `max_wait`-ի
  - cool-off-ի փոխարեն:
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5-ժամյա պատուհանի rollover-ը կամ
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true` (որը ավարտում է lane-ը որպես
  `extra_usage` ցանկացած status-ի դեպքում, քանի որ վճարովի overage-ն այժմ ծածկում է «պատը»)
  ավարտում են lane-ը. պատասխանն այնուհետև անցնում է սովորական cooldown ուղով:
  `budget_exhausted`-ը հիշվում է մինչև հայտարարված բյուջեի վերակայումը (≤ 8 օր):
- «Պատի» ստուգումը կատարվում է executor-ի սեփական 400-ով պայմանավորված փորձի ներսի
  կրկնություններից (context-ի խմբագրում, thinking/effort սահմանափակումներ, param auto-learn)
  հետո, ուստի «պատի» 429-ը, որը երևում է միայն այդ կրկնություններից մեկում, դեռևս
  ընդհատվում է՝ cooldown ուղի չհասնելով:
- Վիճակը պահվում է հիշողության մեջ՝ ըստ connection-ի (վերամեկնարկը վերաընդունման համար
  արժե մեկ լրացուցիչ «պատի» 429):

**Սեսիայի սահմանի վերակայում** (`autoLimitReset`, փորձարկվում է lane-ից առաջ, երբ երկուսն էլ միացած են).

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  բլոկ; երբ `arm: "reset"` և `available: true`, ապա
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits` `{ "program": "juniper_tide" }`-ով
  (organization UUID-ն՝ `providerSpecificData.organizationUUID`-ից, bootstrap fallback):
- `result: reset|not_limited` → հարցումը կրկնփորձվում է լրիվ արագությամբ (առանց slow header-ի):
  `already_used` / `not_offered`-ը memoize են անում `next_available_at`-ը (լռակյաց մեկ շաբաթ).
  ցանկացած ձախողում անում է 15 րոպե backoff: Վերակայումը կատարվում է շաբաթը մեկ անգամ և
  դեռևս հաշվարկվում է շաբաթական սահմանի մեջ:

Ռեգրեսիայի պաշտպանության թեստեր՝ `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### Սեսիայի affinity (#7274)

**Շրջանակը՝** մեկ client սեսիա (`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` header) ամրացված է մեկ connection-ին, **ցանկացած** provider-ի համար:

**Նպատակը՝** բազմաքայլ (multi-turn) agent-ը (Claude Code, aider, custom agent-ներ) պահել նույն
հաշվի վրա հարցումների ընթացքում՝ նվազեցնելով հաշիվների միջև context-ի կորուստը և կրկնվող
cold-start 429-ները per-account session state ունեցող provider-ների մոտ:

**Իրականացումը՝**

- TTL-ի որոշում՝ `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- Pin-ի ընտրություն/ստեղծում՝ `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- Header-ի հանում (ընդհանուր, ցանկացած provider)՝ `src/sse/services/auth.ts::extractSessionAffinityKey()`
- Պերսիստենտ pin աղյուսակ՝ `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- Կարգավորում՝ `sessionAffinityTtlMs` (գլոբալ TTL մվ-ով, `0`-ն անջատում է) — `src/lib/db/settings.ts`: Վերանվանվել է միայն Codex-ի համար նախատեսված `codexSessionAffinityTtlMs`-ից `124_generic_session_affinity_ttl.sql` միգրացիայով, որը փոխանցում է ցանկացած նախկինում կարգավորված Codex TTL որպես նոր լռակյաց:

Մինչև #7274-ը `resolveSessionAffinityTtlMs()`-ը կոշտ կերպով վերադարձնում էր `0` բոլոր provider-ների համար՝ բացի `codex`-ից, ուստի TTL կարգավորումը (և սեսիայի header-ները) որևէ ազդեցություն չունեին այլուր, թեպետ ամրացման մեխանիզմը և header-ի հանումը արդեն provider-անկախ էին: Ուղղումը հեռացրեց այդ վաղ վերադարձը. TTL-ն այժմ միատեսակ կիրառվում է բոլոր provider-ների նկատմամբ, երբ գլոբալ կերպով սահմանված է `0`-ից բարձր:

Սեսիայի affinity-ի երեք header-ները երբեք չեն փոխանցվում upstream — executor-ները կառուցում են իրենց սեփական upstream header-ները զրոյից, այլ ոչ թե փոխանցում client-ի header-ները, ուստի սա մնում է միայն ներքին correlation id:

### Բացառիկ կառավարվող սեսիայի connection lease-ներ

**Շրջանակը՝** մեկ ակտիվ կառավարվող HTTP client/սեսիա տիրում է մեկ որակավորվող OmniRoute connection-ի:

**Նպատակը՝** ապահովել կայուն բացառիկ connection-ի սեփականություն այն client-ների համար, որոնք
պահանջում են կոշտ routing ցանկապատ հարցումների միջև: Սա տարբերվում է session affinity-ից,
որը փափուկ շարունակականության նախապատվություն է. բացառիկ lease-ը պահպանում է lifecycle
վիճակը SQLite-ում, ապահովում է գլոբալ active-owner և active-connection եզակիություն և
մերժում է հնացած generation-ը provider-ին ուղարկելուց առաջ:

Հնարավորությունը միացվում է ըստ API բանալու (opt-in): Կառավարվող բանալին պետք է ունենա
`lease:exclusive` scope և հստակ ոչ դատարկ `allowedConnections` ցուցակ: Ցանկացած HTTP client
կարող է օգտագործել lifecycle endpoint-ը. client-ի անուն, user-agent, provider, OAuth մեթոդ
կամ մոդել պարտադիր չէ: Lease-ը տիրում է connection-ի, ոչ թե մոդելի, ուստի մոդելի փոփոխությունը
պահպանում է կապը, քանի դեռ connection-ը մնում է սովորաբար որակավորվող: Սովորական մոդելի,
քվոտայի, առողջական վիճակի, cooldown-ի և allowlist-ի կանոնները մնում են հեղինակային և կարող են
նույն generation-ը տեղափոխել մեկ այլ ազատ որակավորվող connection:

Կյանքի ցիկլն է `POST /api/v1/session-leases`՝ JSON `acquire`, `renew` և `release` գործողություններով։
Կառավարվվող inference հարցումները ներկայացնում են անթափանց `X-OmniRoute-Lease-Owner` արժեքը և ճշգրիտ
`X-OmniRoute-Lease-Generation`-ը։ Owner-ը կազմված է `vlo_`-ից, որին հաջորդում են 43 base64url նիշեր.
պահվում է միայն նրա SHA-256 հեշը։ Յուրաքանչյուր վերջնական dispatch fence կապում է նաև վավերացված API բանալու ID-ն և
ակտիվ միացման ID-ն։ Lease-ի կառավարման header-ները հեռացվում են log-երից, պահպանված հարցումների snapshot-ներից և
upstream executor-ի header-ներից։

Եթե սովորական routing-ն ունի իրավասու կառավարվվող թեկնածուներ, սակայն յուրաքանչյուր ազատ թեկնածու զբաղված է
օտար ակտիվ lease-ով, OmniRoute-ը վերադարձնում է HTTP `429`, lease-capacity-unavailable կոդ,
waiting-for-capacity վիճակ և սահմանափակված `Retry-After`՝ ածանցված ամենավաղ համապատասխան ժամկետի ավարտից։
Սովորական դատարկ eligibility-ն lease-ի մրցակցություն չէ և պահպանում է իր առկա routing սխալների սեմանտիկան։

Կապակցված մեխանիզմները մնում են առանձին․

- OAuth session-ի զբաղվածությունը OAuth հաշիվների համար պրոցես-լոկալ (process-local) փափուկ բաշխում է։
- Հաշվի semafor-ները տրամադրում են հարցումների զուգահեռության թույլտվություններ և ավարտվում են հարցման ավարտին։
- Բացառիկ կառավարվվող session lease-ները durable կյանքի ցիկլի սեփականություն են՝ generation fence-ով։

---

## 3. Մոդելի արգելափակում

**Շրջանակ.** մատակարար + միացում + մոդել եռյակ։

**Բանալու շրջանակը ըստ կարգավիճակի.** ձախողված կարգավիճակն է որոշում, թե որ բանալու վրա է արգելափակումը գրվում (`resolveLockoutScope()` `open-sse/services/accountFallback/exactModelLock.ts`-ում).

- `429` / `403` / `402` — քվոտայի կամ իրավունքի ազդանշան — արգելափակում է **քվոտայի ընտանիքը**.
  codex-ի համար՝ ամբողջ `codex` / `spark` շրջանակը (միացման բոլոր `gpt-5*` մոդելները), մյուս մատակարարների համար՝ `getQuotaScopedModelForProvider()`:
- `404`-ը արգելափակում է միայն մոդելը (`getModelLockKey()`-ը նեղացնում է `not_found`-ը)։
- Ցանկացած այլ կարգավիճակ — `5xx` տրանսպորտային/սերվերային ձախողումներ և OmniRoute-ի կողմից որակի վավերացումից սինթեզված `502` — արգելափակում է միայն **կոնկրետ** մատակարար/միացում/մոդել եռյակը։ Մեկ մոդելի վատ հոսքը ապացույց չէ հաշվի քվոտայի մասին. մինչև այս կանոնը `codex/gpt-5.6-luna`-ի վրա մեկ դատարկ պատասխանը հեռացնում էր տվյալ միացման բոլոր `gpt-5*` մոդելները երթուղավորումից 2–30 րոպեով (աճող), թեև դրա քվոտան անառիկ էր։
- Կանչողի հստակ `scope` ընտրանքը միշտ գերակշռում է (Antigravity-ը փոխանցում է `"exact"`)։

**Նպատակ.** խուսափել ամբողջ միացման անջատումից, երբ անհասանելի կամ քվոտայով սահմանափակված է միայն մեկ մոդել։

**Օրինակներ.**

- Յուրաքանչյուր մոդելի համար քվոտա ունեցող մատակարարներ, որոնք վերադարձնում են 429
- Տեղական մատակարարներ, որոնք վերադարձնում են 404 մեկ բացակայող մոդելի համար
- Մատակարարին հատուկ ռեժիմի/մոդելի թույլտվության ձախողումներ (օր.՝ Grok-ի ռեժիմները)

**Իրականացում.** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`։

### Մոդելի սառեցումների վահանակ (v3.8.0)

UI. Կարգավորումներ → Մոդելի սառեցումներ (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

Ցուցակում է ակտիվ արգելափակումները՝ մատակարար, միացում, մոդել, պատճառ, expiresAt դաշտերով։ Օպերատորները կարող են ձեռքով վերամիացնել մոդելը քարտից։

**REST API.**

- `GET /api/resilience/model-cooldowns` — ակտիվ արգելափակումների ցանկ
- `DELETE /api/resilience/model-cooldowns` — ձեռքով վերամիացում։ Մարմին՝ `{provider, connection, model}`։ Նույնականացում՝ management։

### Սառեցումների կառավարիչ

UI. Մոնիտորինգ → Սառեցումների կառավարիչ (`src/app/(dashboard)/dashboard/resilience/cooldowns/`)։

Մեկ էջ բոլոր այն միացումների համար, որոնք ժամանակավոր պատճառով դուրս են երթուղավորումից՝ յուրաքանչյուր մատակարարի էջը առանձին բացելու փոխարեն։ Այն ցուցակում է միացումների սառեցումները, մոդելի արգելափակումները և վերջնական վիճակները, մաքրում է դրանք ըստ միացման, ընտրվածների համար կամ մատակարարի բոլոր միացումների համար, և խմբագրում է ամենահաճախ կարգավորվող սառեցման կանոնները՝ `streamStallCooldown.enabled` և OAuth / API-բանալու `connectionCooldown` բազային սառեցումը և հետաձգման առավելագույն քայլերը (պահպանվում են `PATCH /api/resilience`-ի միջոցով)։ Վերջնական վիճակները (`banned`, `expired`, `credits_exhausted`) ցուցակվում են, բայց այստեղ երբեք չեն մաքրվում։

**REST API** (`src/lib/resilience/cooldownManager.ts`, նույնականացում՝ management).

- `GET /api/resilience/cooldowns[?provider=]` — միացումներ կարգավիճակով, մնացորդային սառեցմամբ, հետաձգման մակարդակով, վերջին սխալի տեսակով և մոդելի արգելափակումներով (առանց հավատարմագրերի)
- `POST /api/resilience/cooldowns` — մարմինը `{connectionIds: string[]}` կամ `{all: true, provider?}`; վերադարձնում է `{cleared, unchanged, skippedTerminal, lockoutsCleared}`

### Արգելափակման կարգավորումների UI + վերականգնում հաջողության քայքայմամբ (v3.8.23)

Մոդելի արգելափակումը միշտ միացված, կոդի մեջ ամրագրված վարքագծից դարձավ լիովին կարգավորելի, ըստ ցանկության միացվող հնարավորություն՝ իր սեփական կարգավորումների քարտով և ինքնավերականգնվող ուղով։

**Կարգավորումների քարտ.** Կարգավորումներ → Մոդելի արգելափակում
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`)։
Սա **տարբերվում է** վերևի միայն-կարդացվող `ModelCooldownsCard`-ից (որը միայն _ցուցակում է_ ակտիվ արգելափակումները) — նոր քարտը _կարգավորում է պարամետրերը_։ Լռելյայն արժեքները գտնվում են `DEFAULT_MODEL_LOCKOUT_SETTINGS`-ում
(`src/lib/resilience/modelLockoutSettings.ts`).

| Կարգավորում             | Լռելյայն                         | Նշանակություն                                                        |
| ----------------------- | -------------------------------- | -------------------------------------------------------------------- |
| `enabled`               | `false`                          | Գլխավոր անջատիչ — մոդելի արգելափակումը **լռելյայն անջատված է**։      |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | Արտաքին կարգավիճակներ, որոնք համարվում են մոդելի շրջանակով ձախողում։ |
| `baseCooldownMs`        | `120_000` (120 վրկ)              | Առաջին ձախողման սկզբնական արգելափակման տևողություն։                  |
| `maxCooldownMs`         | `1_800_000` (30 ր)               | Աճացված սառեցման վերին սահման։                                       |
| `maxBackoffSteps`       | `10`                             | Ցուցչային հետաձգման էսկալացիայի առավելագույն քայլեր։                 |
| `useExponentialBackoff` | `true`                           | Կրկնվող ձախողումները ցուցչային աճացնու՞մ են սառեցումը։               |

Կարգավորումները պահպանվում են սովորական կարգավորումների պահոցի միջոցով և վավերացվում resilience կարգավորումների սխեմայով; քարտը սահմանափակում է (clamp) `baseCooldownMs`/`maxCooldownMs`-ը
(այնպես, որ `maxCooldownMs ≥ baseCooldownMs`) և `maxBackoffSteps`-ը։

**Վերականգնում հաջողության քայքայմամբ.** վերականգնումը **ոչ** միայն ժամաչափի ավարտն է։ Առողջ պատասխանը հետ է իջեցնում մոդելի ձախողումների հաշվիչը, այնպես որ պատուհանի կեսին վերականգնված մոդելը դադարում է էսկալացվել (և մաքրվում է) նախքան իր ժամաչափի ավարտը։ Հաջողված combo թիրախի դեպքում `open-sse/services/combo.ts`-ը կանչում է `decayModelFailureCount()`-ը
(`open-sse/services/accountFallback.ts`), որը **կեսում է** պահված
`failureCount`-ը (`Math.floor(failureCount / 2)`); երբ այն հասնում է `0`-ի, արգելափակման գրառումը ամբողջությամբ ջնջվում է։ Հակադիր `recordModelLockoutFailure()`-ը մեծացնում է հաշվիչը (և աճացնում սառեցումը) էսկալացիայի պատուհանի ներսում տեղի ունեցած ձախողումների դեպքում։ Հաջողության այս քայքայումը լրացուցիչ է սովորական ժամաչափի ավարտին — երկու ուղիներից յուրաքանչյուրը կարող է վերամիացնել մոդելը։

**Վիճակ.** արգելափակումները պահվում են **հիշողության մեջ** (յուրաքանչյուր պրոցեսի `Map`-եր `ModelLockoutEntry`-ներով՝ `provider:connectionId:model` բանալիով, exact-scope կողպեքները՝ `provider:connectionId:exact:model` բանալիով), և չեն պահպանվում տվյալների բազայում — դրանք կորչում են վերագործարկման ժամանակ։ _Կարգավորումները_ պահպանվում են; ակտիվ արգելափակման _վիճակը_ անցողիկ է։

---

## 4. Quota-Share միաժամանակության կառավարում (v3.8.36)

Բաժանորդագրության հաշիվները (GLM, MiniMax և այլն) հաճախ ընդունում են միայն ~1–3 միաժամանակ հարցում. սա գերազանցելը հանգեցնում է 429 սխալների և cooldown-ների։ Սա հատկապես սուր է **quota-share** (`qtSd/…`) կոմբոների դեպքում, որտեղ մի քանի API բանալի կիսում են մեկ upstream հաշիվ։ Երեք շերտեր կանխում են կիսվող հաշվի ծանրաբեռնումը։

### Յուրաքանչյուր կապի միաժամանակության սահմանաչափ (`max_concurrent`)

Յուրաքանչյուր մատակարարի կապ կարող է հայտարարել `max_concurrent` առավելագույն սահման (`provider_connections.max_concurrent`, սահմանվում է կապի մոդալում / API-ում / DB-ում)։ Թողեք դատարկ՝ սահմանափակում չունենալու համար։ Սա միակ կարգավորիչն է, որը վարում է ստորև նկարագրված սերիականացման շերտը — սահմանեք այն հաշվի իրական միաժամանակությանը համապատասխան (օր.՝ GLM ~1, MiniMax ~2)։

### Յուրաքանչյուր մոդելի միաժամանակության սահմանաչափեր (`modelConcurrency`)

Կապը կարող է լրացուցիչ հայտարարել յուրաքանչյուր մոդելի ճշգրիտ միաժամանակության առավելագույն սահմաններ իր `rateLimitOverrides` քարտեզի ներսում՝

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

Սահմանեք այն կապի մոդալում (**Rate limit-ի վերասահմանումներ → Յուրաքանչյուր մոդելի միաժամանակության սահմանաչափեր**, մեկ `model=cap` յուրաքանչյուր տողում) կամ `PATCH /api/providers/[id]`-ի միջոցով՝ նույն JSON ձևաչափով։ Հիմնական սեմանտիկան.

- **Կապի ընդհանուր ընդդեմ մոդելին հատուկ.** `maxConcurrent`-ը մնում է կապի ընդհանուր բաժանված առավելագույն սահմանը։ Երբ երկուսն էլ կիրառելի են, երկու դարպասներն էլ ձեռք են բերվում ատոմար ձևով նույն կոմպոզիտ դարպասի շրջանակում (`global → provider → account → model`). արդյունավետ վարքագիծը ավելի խիստ կիրառելի սահմանն է։
- **Մոդելի բանալու ճշգրիտ համընկնում.** բանալին executor-ին փոխանցված մոդելի տողն է routing-ի լուծումից հետո — սովորաբար մաքուր upstream մոդելի id-ն (`glm-5`), ոչ թե client-side `provider/model` մականունը (`zai/glm-5`-ը չի համընկնում `glm-5`-ի հետ)։ Արժեքները դրական ամբողջ թվով միաժամանակ հարցումների առավելագույն սահմաններ են։
- **Տեղային հերթագրում, առանց հայտնաբերման.** ավելցուկային հարցումները հերթագրվում են տեղայնորեն՝ գոյություն ունեցող հերթի/timeout-ի սեմանտիկայով (տիպավորված `SEMAPHORE_TIMEOUT` / `SEMAPHORE_QUEUE_FULL` ընդունման սխալներ)։ OmniRoute-ը չի հայտնաբերում և չի եզրակացնում upstream քաղաքականություն — այն կիրառում է օպերատորի կարգավորած ճշգրիտ սահմանները։ Հագեցած մոդելի դարպասը երբեք չի անջատում մատակարարին և երբեք չի ստեղծում մոդելի մշտական արգելափակում. upstream 429/cooldown/fallback վարքագիծը մնում է սխալների ետնապահը։
- **Յուրաքանչյուր կապի, յուրաքանչյուր պրոցեսի շրջանակ.** սահմանաչափերը յուրաքանչյուր տվյալների բազայի կապի համար են և պահվում են հիշողության մեջ, ուստի նույն upstream API բանալին վերաօգտագործող երկու կապեր միմյանց հետ չեն համակարգվում։
- **Չկարգավորված նշանակում է անփոփոխ.** քարտեզը բաց թողնելը (կամ վահանակի դաշտը դատարկ թողնելը) չի ավելացնում մոդելի դարպաս։ Կարգավորման օրինակ՝ առանց որևէ ունիվերսալ մատակարարի սահման պնդելու.

```text
glm-5=1
glm-4.7=3
```

### Quota-share հարցումների սերիականացում

Երբ quota-share ուղարկումը (dispatch) թիրախավորում է դրական `max_concurrent` հայտարարող կապ, այդ **հաշվին** միաժամանակ հարցումները սերիականացվում են յուրաքանչյուր կապի սեմաֆորի միջոցով (բանալի `qsconn:<connectionId>`). ավելցուկային հարցումները **սպասում են հերթում**՝ հաշիվը ծանրաբեռնելու փոխարեն։ Այն **fail-open** է — հագեցած հերթը կամ timeout-ը շարունակվում է առանց slot-ի, այլ ոչ թե երբևէ մերժում է ուղարկելի հարցումը։ Միացումը/անջատումը՝ **Կարգավորումներ → Դիմացկունություն → Quota-share յուրաքանչյուր կապի միաժամանակություն** (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, լռելյայն միացված)։ Առանց `max_concurrent` սահմանաչափի վարքագիծը անփոփոխ է։

> Quota-share routing դարպասը (`selectQuotaShareTarget`, DRR + P2C) ինքնին fail-open է և միայն _իջեցնում է առաջնահերթությունը_ սահմանաչափին հասած կապի համար — մեկ կապից բաղկացած pool-ի դեպքում այն չի կարող կոշտ սահմանափակել, ուստի հենց այս սեմաֆորն է, որ իրականում զսպում է հոսքը։

### Կոմբոի cooldown-գիտակ կրկնափորձ

Յուրաքանչյուր կոմբո ռազմավարության համար (երբ միացված է) հարցումը, որը ԿԱՐՃ ժամանակավոր cooldown-ի համար կձևավորեր 429, սպասում է դրա ավարտին և վերաուղարկվում է՝ 429 վերադարձնելու փոխարեն — սա ընդգրկում է Gemini-դասի TPM/RPM պատուհանները (~60վ retry-after) բազմամոդել կոմբոներում, օր.՝ երբ 2-մոդել կոմբոի երկու թիրախներն էլ հարվածում են մոդելի մակարդակի rate limit-ի։ Սահմանափակված է `comboCooldownWait`-ով (`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`) **Կարգավորումներ → Դիմացկունություն** բաժնում։ Այն երբեք չի սպասում `quota_exhausted`-ին (արգելափակված մինչև կեսգիշեր) կամ auth/not-found պատճառների։

Նույն դարպասը ընդգրկում է նաև նախաուղարկման դեպքը (#16319). երբ կոմբոի բոլոր թիրախները բաց են թողնվում ցանկացած փորձից առաջ, քանի որ նրանց մոդելը կարճ ժամանակավոր արգելափակման մեջ է, զրո-փորձային ուղին սպասում է արգելափակման ավարտին նույն սահմանների ներքո և վերաուղարկվում է՝ հուշում չպարունակող `503 ALL_TARGETS_SKIPPED` պատասխանելու փոխարեն։ Երբ սպասումը թույլատրված չէ (սահմանաչափը, փորձերի թիվը կամ բյուջեն սպառված են, կամ հնարավորությունն անջատված է), վերջնական պատասխանը բարձրացվում է `429 rate_limit_error`-ի՝ կրելով `retry_after` / `reset_at` արժեքները ամենավաղ ժամանակավոր արգելափակման ավարտից. quota, auth և not-found արգելափակումները պահպանում են հուշում չպարունակող 503-ը։

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. Հարցումների հերթի ընդունման կառավարում (v3.8.49 · issue #6593)

**Շրջանակ**. լոկալ per-provider+connection rate-limit հերթը (`open-sse/services/rateLimitManager.ts`,
հիմնված Bottleneck-ի վրա), վերը նշված երեք մեխանիզմներից մեկ շերտ ներքև։

**`maxWaitMs`-ը սահմանափակում է հերթի սպասումը. `executionMaxWaitMs`-ը՝ կատարմանը։**
Այս երկուսը դիտավորյալ առանձին են, և ոչ մեկը մյուսին չի սնուցում։

`resilienceSettings.requestQueue.maxWaitMs`-ը **հերթի սպասման բյուջեն** է. այն
ծածկում է մատակարարի սլոտի սպասումը և հետո QUEUED վիճակում մնալը, և դրա
ժամաչափը մաքրվում է հենց այն պահին, երբ job-ը լքում է QUEUED վիճակը և սկսում
կատարվել (`rateLimitManager.ts`, `wrappedFn`)։ Այն գերազանցող հարցումը երբեք
չի հասնում upstream-ին։ Լռելյայն 30000ms, տրամադրվում է
`DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`-ի կողմից `src/lib/resilience/settings.ts`-ում
և ամրագրված է
`tests/unit/ratelimit-admission-control-6593.test.ts`-ով, այնպես որ դրա փոփոխությունը
կդարձնի այդ թեստը կարմիր՝ այն փոխարեն, որ լուռ թողնի այս պարբերությունը հնացած։

`resilienceSettings.requestQueue.executionMaxWaitMs`-ը այն է, ինչ Bottleneck-ը
ստանում է որպես job-ի `expiration`, որի ժամաչափը մեկնարկում է միայն dispatch-ից
հետո։ Դա եզրափակիչ ապահովագրական սահմանափակում է այն կատարողների համար, որոնք
չունեն իրենց սեփական upstream timeout-ը, և այն բարձրացվում է մինչև կատարողի
սեփական fetch-մեկնարկի timeout-ը, երբ վերջինս ավելի երկար է, այնպես որ այն չի
կարող կտրել առողջ in-flight պատասխանը։ Լռելյայն 600000ms (10 րոպե)։

Հերթի բյուջեն `expiration`-ին փոխանցելն է հենց այն, ինչ նախկինում կիսատ էր
սպանում ոչ ինկրեմենտալ gateway-ները. դրանք օրինականորեն աշխատում են րոպեներ
շարունակ մինչև առաջին բայթերը, և սա է պատճառը, որ expiration-ը երևում է որպես
`code: "RATE_LIMIT_EXECUTION_TIMEOUT"` (HTTP 504), մինչ հերթի բյուջեն կրում է
հերթի-timeout կոդը։ Դրանցից յուրաքանչյուրը վերասահմանեք
`RATE_LIMIT_MAX_WAIT_MS` / `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` (env) փոփոխականների կամ
վահանակի միջոցով (**Կարգավորումներ → Դիմացկունություն**)։ Երկուսն էլ նորմալացման
ժամանակ սեղմվում են 1ms–24h միջակայքի մեջ։

**Գերակայությունը երկուսի համար էլ.** env փոփոխականը միայն _լռելյայն_ արժեք է
տրամադրում։ `resilienceSettings.requestQueue`-ում պահպանված արժեքը (վահանակ /
API patch, պահվում է `key_value`-ում) գերակշռում է դրան, իսկ per-connection
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs`-ը գերակշռում է վերջինիս։
Ուստի env փոփոխականը սահմանելը այն տեղակայման վրա, որն արդեն ունի պահպանված
արժեք, ոչինչ չի փոխում. փոխարենը մաքրեք կամ թարմացրեք պահպանված կարգավորումը։

Հերթում մնալը սահմանափակված է `maxWaitMs`-ով. ստորև նկարագրված `maxQueueDepth`-ը
սահմանափակում է, թե քանի կանչող կարող է միաժամանակ հերթում գտնվել։

**Պատասխանի մարմնում նշված կրկնփորձեր. տեմպակարգավորումը ընդդեմ կողպման։**
429 պատասխանի մարմինը կարող է նշել իր սեփական սպասումը (Gemini
`RetryInfo.retryDelay`, "retry after Ns" տեքստ), որը կարդում է
`updateFromResponseBody`-ն։ Կապի `maxWaitMs`-ի մեջ տեղավորվող սպասումը
տեմպակարգավորում է. լիմիտերը այդքան ժամանակով դատարկում է իր պահուստը, և
հերթում գտնվող կանչերը dispatch են արվում, երբ այն կրկին լրանա։
`maxWaitMs`-ից երկար սպասումը այն բանը չէ, որը հերթը կարող է նստած սպասել.
Gemini-ն սպառված օրական քվոտային պատասխանում է `retryDelay: "86399s"`-ով։
Վերակառուցված 429-ի վրա փոխանցված `Retry-After`-ը (#16528) արդեն ստիպում է
fallback շարժիչին կողպել մոդելը այդ պատուհանի համար, բայց լիմիտերը դրա համար էլ
դադարեցնելը դեռ կկանգնեցներ ցանկացած կանչ, որը բանալուն հասնում է վաղ
(օրինակ, դիմացկունության զրոյացումից հետո), ամբողջ `maxWaitMs` ժամանակով։ Երբ նման
սպասումը գալիս է տիպավորված Google `RetryInfo` մանրամասնությունից
(`google_rpc_retry_info` ծագումնաբանությունը) և բանալու լիմիտերն արդեն
սահմանափակված է մոդելով (տես `getLimiterKey`), 429-ը դրա փոխարեն դառնում է
մոդելի կողպում այդ կապի վրա (`lockModelForLongBodyRetry`
`open-sse/services/rateLimitManager/bodyRetryPause.ts`-ում, առավելագույնը 24 ժամ),
և լիմիտերը մնում է չդադարեցված։ Հաշվի ընտրությունը բաց է թողնում այդ
կողպումը `isModelLocked()`-ի միջոցով, և նույնն անում է նաև combo նախա-dispatch
դարպասը կապին ամրացված թիրախների համար։ Antigravity-ի վրա, որի լիմիտերը ըստ
քվոտայի ընտանիքի է, կողպումը ճշգրիտ մոդելի վրա է, ինչպես նրա մյուս քվոտայի
կողպումները։ Հաճախորդի խնդրած անունը նույնպես կողպվում է, երբ alias-ը լուծել է
այն այդ մոդելի, քանի որ այդ ստուգումները օգտագործում են խնդրած անունը. այն
կողպվում է ճշգրտորեն (`lockExactModel`), այնպես որ alias-ը, որը հատում է
antigravity քվոտայի ընտանիք կամ codex տիրույթ, երբեք չի կողպում իր սեփականը։
Արձակ ակնարկը, չտիպավորված `retryDelay`-ը կամ ամբողջ կապի կիսած լիմիտերը
պահպանում են դադարը։ Երբ լիմիտերը, որը 429 ուղին հենց նոր վերակառուցեց,
իսկապես դադարում է, կանչողը, որի հերթի մնացած ժամանակն ավարտվում է դադարից
առաջ, անմիջապես մերժվում է հերթի-timeout կոդով (`checkLimiterPause`)՝ այն
փոխարեն, որ սպասի այդ ժամանակի լրանալուն. գրանցված ավարտը ամրացվում է նախքան
լիմիտերի կառուցումը, որտեղ Bottleneck-ը մեկնարկում է իր թարմացման ժամացույցը,
և պահուստի ցանկացած հետագա փոփոխություն մոռանում է այն։ Ծածկված է
`tests/unit/rate-limit-long-body-retry-lockout.test.ts`-ով և
`tests/unit/rate-limit-body-retry-pause.test.ts`-ով։

**`maxQueueDepth` — opt-in ընդունման սահման (նոր)։**
`resilienceSettings.requestQueue.maxQueueDepth`-ը սահմանափակում է, թե քանի
հարցում կարող է միաժամանակ հերթում մնալ (դեռ չdispatch-ված) մեկ
provider+connection-ի համար։ Երբ հերթն արդեն պարունակում է `maxQueueDepth`
հարցում, նոր հարցումը արագ մերժվում է տիպավորված `code: "RATE_LIMIT_QUEUE_FULL"`
սխալով **նախքան** `limiter.schedule()`-ին հասնելը, այնպես որ մերժումը էժան է
և տեղի է ունենում այդ հարցման համար նախատեսված ցանկացած downstream
prompt-սեղմման / թարգմանության աշխատանքից առաջ։ Լռելյայն `0` = անջատված,
պահպանելով գոյություն ունեցող անսահմանափակ հերթի վարքագիծը. սահմանափակված է
0–100000։ Վերասահմանեք `RATE_LIMIT_MAX_QUEUE_DEPTH` (env) կամ
`resilienceSettings.requestQueue.maxQueueDepth` (վահանակ/API patch) միջոցով։

Ընդունման ստուգումն ինքը մաքուր ֆունկցիա է
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`), այնպես
որ այն հնարավոր է միավոր-թեստավորել առանց իրական Bottleneck լիմիտերի։

> #6593-ը բացած RFC-ն նաև առաջարկել էր `bypassCompressionOnRateLimit`
> դրոշակ։ Այս պահոցի `open-sse/services/compression/` pipeline-ը
> ելքային LLM հարցման վրա prompt/context սեղմումն է (`chatCore.ts`,
> `resolveCompressionSettings`/`selectCompressionStrategy` բլոկի մոտ),
> ոչ թե HTTP պատասխանի սեղմումը սինթեզված 429 մարմինների վրա — բառացի
> bypass դրոշակի համար համապատասխան կոդային ուղի գոյություն չունի։ Այդ
> prompt-սեղմման քայլը ներկայումս նաև կատարվում է հարցման pipeline-ում
> `withRateLimit()`-ից _առաջ_, ուստի հերթի լրացման պատճառով մերժման դեպքում
> այն բաց թողնելու համար վերադասավորումը առանձին, ավելի մեծ փոփոխություն է,
> քան այս issue-ի շրջանակը. այն դիտավորյալ **չի** իրականացվել այստեղ և
> թողնվել է որպես հետագա աշխատանք, եթե CPU-ի խնայողության օգուտը արժե
> վերադասավորման ռիսկին։

### Rate-Limit-ի ավտոմատ միացման անվտանգության ցանց և կապի պաշտպանություն (`rateLimitProtection`)

**Ավտոմատ միացման անվտանգության ցանց** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, լռելյայն `true`):
Լռելյայնորեն OmniRoute-ն ավտոմատ կերպով միացնում է rate-limit հերթի պաշտպանությունը բոլոր ակտիվ API-key պրովայդերների կապերի համար (`getProviderCategory(provider) === "apikey"`)։ Սա ապահովում է, որ rate-limit-ի նկատմամբ զգայուն upstream API բանալիներին ուղղված մուտքային հարցումները հերթագրվեն և սահմանափակվեն Bottleneck-ի միջոցով, այլ ոչ թե կտրուկ հոսքով հանգեցնեն upstream 429 սխալների։ Անվտանգության ցանցը կարող է վերասահմանվել `RATE_LIMIT_AUTO_ENABLE` միջավայրի փոփոխականի միջոցով (`false`/`0`/`off` անջատում է, `true`/`1`/`on` հարկադրաբար միացնում է), որը գերակշռում է dashboard-ում պահպանված կարգավորման նկատմամբ (**Կարգավորումներ → Դիմադրողականություն** / `PATCH /api/resilience`)։

**Յուրաքանչյուր կապի `rateLimitProtection`-ի սեմանտիկան.**
Յուրաքանչյուր կապի rate-limit պաշտպանությունը հետևվում է պրովայդերի կապերի `rateLimitProtection` բուլյան դաշտի միջոցով (պահպանվում է որպես `rate_limit_protection` SQLite-ում).

- **Հստակ միացված (`rateLimitProtection === true`)**: Rate-limit պաշտպանությունը հստակ միացված է այս կապի համար՝ անկախ պրովայդերի կատեգորիայից կամ այն հանգամանքից, թե արդյոք ավտոմատ միացման անվտանգության ցանցը միացված է։
- **Հստակ անջատված (`rateLimitProtection === false`)**: Անջատում է հստակ պաշտպանությունը, բայց **չի** դուրս բերում ակտիվ API-key կապը գլոբալ ավտոմատ միացման անվտանգության ցանցից։ `reconcileEnabledConnections`-ում (`open-sse/services/rateLimitManager.ts`) `false`-ը և `undefined`-ը համարժեք են. միայն `rateLimitProtection === true`-ն է դիտարկվում որպես հստակ վերասահմանում։ Եթե `rateLimitProtection`-ը `false` է (կամ սահմանված չէ), ակտիվ API-key կապը դեռևս համապատասխանում է ավտոմատ միացման պայմանին և մնում է rate-limit պաշտպանված։
- **Յուրաքանչյուր կապի opt-out չկա**: Օպերատորը ներկայումս չի կարող արտահայտել «այս մեկ ակտիվ API-key կապը պետք է աշխատի առանց rate-limit հերթի պաշտպանության», միաժամանակ պահպանելով ավտոմատ միացումն ակտիվ մյուսների համար։ API-key կապերը ամբողջությամբ առանց rate-limit հերթերի աշխատեցնելու համար անվտանգության ցանցը պետք է անջատվի գլոբալ կերպով (`RATE_LIMIT_AUTO_ENABLE=false` կամ `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`)։

**Աջակցվող գրառման ուղիներ.**

- **`POST /api/rate-limits`**: Կապի համար `rateLimitProtection`-ը փոխարկելու աջակցվող կառավարման գրառման ուղին (`{ connectionId: string, enabled: boolean }`)։ Սա `enabled: true`-ով կանչելը միացնում է հստակ պաշտպանությունը. `enabled: false`-ով կանչելը հեռացնում է հստակ պաշտպանությունը (թեև ակտիվ API-key կապերը մնում են գլոբալ անվտանգության ցանցի ծածկույթի տակ, եթե ավտոմատ միացումը միացված է)։
- **`PUT /api/providers/[id]`**: Դիտավորյալ **չի** ընդունում կամ փոխարկում `rateLimitProtection`-ը (#11278)։ Պրովայդերի կապի մետատվյալների թարմացումը `PUT /api/providers/[id]`-ի միջոցով երբեք չի փոխի պահպանված rate-limit պաշտպանության վիճակը։

---

## 6. Դանդաղ հոսքի թողունակության հսկիչ (#9709)

Ոչ պարտադիր `resilienceSettings.streamRecovery.throughputWatchdog` պաշտպանիչը հայտնաբերում է այնպիսի upstream, որը դեռ ուղարկում է chunk-եր, բայց արտադրում է assistant-ի ելք՝ կազմաձևված օգտակար ելքի արագությունից ցածր։ Այն դիտավորյալ տարբերվում է անգործության ժամկետից (idle timeout). heartbeat-ները և մետատվյալները չեն զրոյացնում ոչ մի ժամաչափ և չեն համարվում առաջընթաց։ Այն նաև տարբերվում է փորձի կոշտ վերջնաժամկետից (#9153), որը մնում է բացարձակ անվտանգության առաստաղ՝ անկախ ելքի որակից։

Հսկիչը պահանջում է տաքացման (warm-up) շրջան, որին հաջորդում է ամբողջական սահող պատուհան, նախքան այն կարողանա ընդհատել։ Այն հաշվում է տեքստային delta-ները Chat Completions-ի և Responses API-ի ելքային իրադարձություններից (UTF-8 բայթերի պահպանողական մոտարկում), անտեսում է միայն usage պարունակող և դատարկ իրադարձությունները և հետաձգում է որոշումը, մինչև tool-call կամ reasoning իրադարձությունները ընթացքի մեջ են։ Այն լռելյայն անջատված է և կարող է միացվել `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`-ով. պատուհանը, տաքացումը, նվազագույն արագությունը և նվազագույն չափելի ելքը սահմանափակված են resilience կարգավորումների սովորական նորմալացման շերտով։

Միացված լինելիս հսկիչի ընդհատումը կիրառվում է միայն ակտիվ upstream փորձի նկատմամբ։ Օգտագործողին երևացող ցանկացած բայթից առաջ գոյություն ունեցող նույն հաշվի վաղ վերականգնման ուղին կարող է վերաբացել փորձը։ Commit-ից հետո հոսքը երբեք կույրորեն չի կրկնվում. միայն գոյություն ունեցող ապահով mid-stream շարունակման պայմանագիրը կարող է միացնել վերջածանց։ Finalization-ը մնում է միանգամյա, ուստի usage-ի հաշվառումը և սեմաֆորի ազատումը չեն կրկնվում։

---

## 7. Upstream կարգավիճակի վերաձևակերպում (սխալ ներկայացված քվոտայի սխալներ)

**Ծածկույթ:** մեկ upstream gateway, որը սխալ HTTP կարգավիճակով է հայտնում ժամանակավոր քվոտայի սպառումը։

**Նպատակ:** ուղղել մոլորեցնող կարգավիճակը ՆԱԽՔԱՆ դասակարգումը, որպեսզի downstream սպառողները (fallback շարժիչը, combo ագրեգացիան, կլիենտին ուղղված պատասխանը) տեսնեն ձախողման իսկական վերափորձելի բնույթը։

Որոշ gateway-ներ ԺԱՄԱՆԱԿԱՎՈՐ քվոտայի սպառումը ազդանշանում են ոչ վերափորձելի HTTP կարգավիճակով։ `agentrouter.org`-ը վերադարձնում է `403` (երբեմն `400`)՝ չինարեն մարմնով (`用户额度不足` / `额度不足`)՝ ստանդարտ `429`-ի փոխարեն։ Կլիենտները, ինչպիսին է Claude Code-ը, `403`-ը համարում են մշտական և ընդհատում սեսիան, իսկ առանց ուղղման fallback շարժիչը այն կդասակարգեր որպես `AUTH_ERROR`՝ քվոտայի իրադարձության փոխարեն։

**Իրականացում:**

- Ռեեստր + համապատասխանեցուցիչ․ `open-sse/config/upstreamStatusRestatement.ts` — կանոնների ցանկ ըստ մատակարարի (`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`), համապատասխանեցվում է `applyStatusRestatement()`-ի միջոցով։
- Կանչի վայր․ `providerFailure:` բլոկը `open-sse/handlers/chatCore.ts`-ում (մոտավորապես 3654-րդ տող), անմիջապես այն բանից հետո, երբ `parseUpstreamError()`-ը վերլուծում է սխալ HTTP կարգավիճակով upstream պատասխանը (`!providerResponse.ok`), և նախքան ցանկացած դասակարգման գործարկումը, որպեսզի ամեն downstream սպառող տեսնի ուղղված կարգավիճակը։ `200` SSE հոսքի ներսում ներդրված սխալները անցնում են առանձին, ավելի ուշ հոսքի վերլուծության ուղիով և այսօր այս hook-ի կողմից **չեն** ծածկվում — սա հայտնի սահմանափակում է, որը դեռ անհրաժեշտ չէ agentrouter-ի սխալ կարգավիճակի համար (որը ի հայտ է գալիս որպես սխալ HTTP կարգավիճակ)։
- Վերափորձի իրավասություն․ `429`-ը ներառված է `RETRY_AFTER_ELIGIBLE_STATUSES`-ում (`open-sse/services/combo/unavailableRetryGate.ts`), ուստի վերաձևակերպված սխալը կրում է իրական վերափորձի պատուհան՝ «մեռած» `403`-ի ի հայտ գալու փոխարեն։
- Սինթետիկ `60s` `defaultRetryAfterMs`-ը (`upstreamStatusRestatement.ts`) միայն այն է, ինչ վերաձևակերպված պատասխանը հայտնում է **կլիենտին**; դա ինքնին կապի ներքին cooldown/lockout տևողությունը չէ — դա առանձին կարգավորվում է այն մեխանիզմի կողմից, որն իրականում մշակում է վերաձևակերպված սխալը (Connection Cooldown-ի աճող backoff-ը, §2, API-key մատակարարների համար բազային `3s`; կամ Model Lockout-ը, §3, ըստ մոդելի քվոտայի մատակարարների համար, ինչպիսին է agentrouter-ը)։ Router-ը կարող է ներքուստ վերափորձի իրավասու դառնալ ավելի վաղ, քան կլիենտին հայտարարվող 60 վայրկյանանոց պատուհանը — սա դիտավորյալ պաշար է, ոչ թե բագ։

Մշտական սխալները (agentrouter-ի `无权访问模型` — այս մոդելին մուտք չկա) ԵՐՋԵՎԵ չեն վերաձևակերպվում․ `excludeMarkers`-ը վետո է դնում կանոնի վրա նույնիսկ այն դեպքում, երբ `textMarkers`-ը համապատասխանում է, ուստի սխալը պահպանում է իր սկզբնական կարգավիճակը, և ոչինչ այն ընդմիշտ չի վերափորձում։ Համապատասխանող մատակարարի դասակարգման կանոնը (`agentrouter-model-access-denied` `open-sse/config/providerErrorRules.ts`-ում․ `reason: "auth_error"`, `scope: "model"`, `6h` հայտարարված բազային cooldown) դիմում է իրականացվում `checkFallbackError`-ի կողմից (`open-sse/services/accountFallback.ts`) ընդհանուր apikey կատեգորիայի `FORBIDDEN` վաղաժամ վերադարձից (early-return) _նախքան_, պայմանավորված `honorsRuleLockScope(provider)`-ով (#10334 — ներկայումս միայն agentrouter-ի համար՝ `providerErrorRules.ts`-ի `HONORS_RULE_LOCK_SCOPE_PROVIDERS` թույլատրված ցանկի միջոցով)։ Կանոնի հայտարարված 6-ժամյա cooldown-ը փոխանցվում է որպես `fallbackResult.baseCooldownMs`, բայց այն դեռ սնուցում է նախկինից եղած ըստ մոդելի քվոտայի lockout ուղին (`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, #10334-ով անփոփոխ՝ բացառությամբ cooldown-ի աղբյուրի)․ այն սահմանափակվում է մինչև օպերատորի `mlSettings.maxCooldownMs` արժեքը (լռելյայն `1_800_000ms` / 30 րոպե), ինչպես ցանկացած այլ մոդելի lockout, իսկ _պահպանված lockout-ի պատճառը_ մնում է նախկինից եղած կոդավորված `"forbidden"`-ը, ոչ թե կանոնի `"auth_error"`-ը — միայն cooldown-ի տևողությունն է հարգվում սկզբից վերջ, ոչ թե պատճառի տողը։ Կապն ինքը մնում է ակտիվ; նույն կապի վրա գտնվող քույր մոդելները չեն ազդվում։

Վերաձևակերպված քվոտայի սխալները (`额度不足`) production-ում հասնում են մատակարարի կանոնի (`agentrouter-user-quota-exhausted`․ `reason: "quota_exhausted"`, `scope: "connection"`, իրենը սեփական հայտարարված cooldown չունի — կիրառվում է պահպանման շերտի մասշտաբված backoff-ի լռելյայն արժեքը)։ #10334-ից ի վեր, `scope`-ը `ProviderErrorRuleMatch`-ի վրա ՍՊԱՌՎՈՒՄ Է սկզբից վերջ, բայց **միայն** `HONORS_RULE_LOCK_SCOPE_PROVIDERS` թույլատրված ցանկի մատակարարների համար (`providerErrorRules.ts` — այսօր միայն `"agentrouter"`, պայմանավորված `honorsRuleLockScope()`-ով)։ Յուրաքանչյուր այլ մատակարարի համար `scope`-ը մնում է տեղեկատվական, հենց այնպես, ինչպես #10334-ից առաջ։ `checkFallbackError`-ը համապատասխանած կանոնի scope-ը արտացոլում է որպես `fallbackResult.ruleScope`; `isAgentrouterConnectionQuotaScope()`-ը (`src/sse/services/auth.ts`) ընդհանուր պահակն է, որը հաստատում է, որ `ruleScope`-ն իսկապես անվտանգ է հարգել որպես ամբողջ կապի վրա տարածվող, ինքնավերականգնվող ազդանշան (scope `"connection"`, reason `quota_exhausted`, երբեք `permanent`, երբեք `creditsExhausted` — պաշտպանություն ապագա կանոնի դեմ, որը scope `"connection"`-ը կզուգավորի հաշվի մշտական վիճակի հետ)։ Այն կանչում են երկու սպառող․

- **Պահպանում** (`markAccountUnavailable()`, `src/sse/services/auth.ts`).
  passthrough մատակարարի՝ **ըստ մոդելի** արգելափակման ճյուղ անցնելու
  փոխարեն (agentrouter-ը ունի `passthroughModels: true` → `hasPerModelQuota()`
  վերադարձնում է `true`) կիրառվում է **կապի ժամանակավոր սառեցում**՝
  `testStatus: "unavailable"` + `rateLimitedUntil`, բայց երբեք ոչ վերջնական կարգավիճակ
  (`credits_exhausted`/`banned`/`expired`), որպեսզի սառեցման ժամկետի ավարտից
  հետո կապն ինքնուրույն վերականգնվի՝ հավատարմագրերի ձեռքով վերակայման կարիք չունենալով։
  Սա բաց է թողնվում `disableCooling: true` ունեցող կապերի համար (#2997). այդ հրաժարումը
  փոխարենը հանգեցնում է ըստ մոդելի արգելափակմանը (փաստաթղթավորված փոխզիջում է.
  տե՛ս ճյուղի վերևում գտնվող կոդի մեկնաբանությունը)։
- **Նույն հարցման շրջանակում համակցված երթուղավորում** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`). նույն պաշտպանիչ ստուգումը կապը
  նշում է հիշողության մեջ պահվող `exhaustedConnections` բազմության մեջ՝
  `${provider}:${connectionId}` բանալիով։ Սա բաց է թողնում միայն ՆՈՒՅՆ ՀԱՐՑՄԱՆ
  մնացած այն թիրախը, որն _ինքն արդեն իր սեփական թիրախային օբյեկտում պարունակում է հենց այդ
  `connectionId`-ը_ (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `if (provider &&
connectionId)`՝ նախքան `exhaustedConnections`-ի որոնումը)։ Մոդելների պարզ
  ցանկով combo-ն, որի հարակից թիրախներից ոչ մեկը չունի սեփական ամրագրված `connectionId`,
  և այն յուրաքանչյուր ուղարկման ժամանակ որոշվում է միայն պատասխանի
  `X-OmniRoute-Selected-Connection-Id` վերնագրից, երբեք չի համընկնում այդ բանալու հետ։ Այդ
  սովորական դեպքում մնացած քայլերից մեկի կողմից հենց նոր սպառված հաշիվը կրկին օգտագործելուց
  իրական պաշտպանությունը այս Set-ը ՉԷ. դա վերը նկարագրված պահպանման շերտն է
  (կապի `rateLimitedUntil`-ն այժմ ապագայում է)՝ համակցված այն փաստի հետ, որ
  նույն պաշտպանիչ ստուգումը խափանման համար ճնշում է `transientRateLimitedProviders`-ը
  (տե՛ս «Երկփուլ կառուցվածք»-ը և `targetExhaustion.ts`-ում
  `isAgentrouterConnectionQuotaScope` ճյուղի կոդի մեկնաբանությունը)։ Եթե այդ Set-ը մնում է
  չնշված, `combo.ts`-ի `allowRateLimitedConnection` հարկադիր թույլատրումը
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`) ՉԻ գործարկվում
  մատակարարի մնացած քայլերի համար, ուստի հավատարմագրերի ընտրության `rateLimitedUntil`
  զտիչը (`src/sse/services/auth.ts:1238`) սովորականի պես կիրառվում է, և
  մնացած քայլը կա՛մ ընտրում է agentrouter-ի մեկ այլ՝ դեռևս համապատասխան կապ,
  կա՛մ ձախողվում է հասանելի հավատարմագրերի բացակայության պատճառով. այն հարկադրաբար
  չի վերադառնում այն կապին, որն այս ճյուղը հենց նոր սառեցրել է։

### Երկփուլ կառուցվածք. կարգավիճակի վերաձևակերպում, ապա դասակարգում

Կարգավիճակի վերաձևակերպումը (`upstreamStatusRestatement.ts`) և մատակարարի
դասակարգման կանոնները (`open-sse/config/providerErrorRules.ts`,
`providerRuleRegistry`) առանձին ռեեստրներ են, որոնք երկուսն էլ բանալիավորվում են
մատակարարի նույնացուցիչով և տեքստային նշիչներով, սակայն գործարկվում են տարբեր տեղերում
և ծառայում են տարբեր նպատակների։ Վերաձևակերպումը վաղ փուլում՝ `chatCore.ts`-ում,
վերագրում է HTTP կարգավիճակը, իսկ դասակարգման կանոններն ընտրում են պահուստային
`reason`-ը և արգելափակման `scope`-ը
(`model` / `provider` / `connection`)՝ `checkFallbackError()`-ի ներսում
(`open-sse/services/accountFallback.ts`)։

Դասակարգման կանոնները սխալի ամբողջական **տեքստը** տեսնում են (ինչը անհրաժեշտ է
`额度不足`-ի նման մարմնի նշիչներին համապատասխանեցնելու համար) միայն
`providerErrorRules.ts`-ի `FULL_TEXT_RULE_PROVIDERS` թույլատրվածների ցանկում
ընդգրկված մատակարարների համար. ներկայումս միայն `"agentrouter"`։ Մնացած բոլոր
**ներկառուցված կատալոգային** մատակարարների դեպքում `checkFallbackError`-ը
`getProviderErrorRuleMatch`-ին փոխանցում է միայն կառուցվածքավորված սխալը
(`{code, type}`), որը բավարար է վերնագրի/կարգավիճակի/կոդի վրա հիմնված կանոնների
համար, սակայն չի տեսնում մարմնի տեքստային նշիչները։ `resolveRuleMatchBody()`
օժանդակ ֆունկցիան կատարում է այս ընտրությունը՝ ամբողջական սխալի տեքստը թույլատրված
մատակարարների համար, իսկ կառուցվածքավորված սխալը՝ մնացածների համար։
**Ներկառուցված** մատակարարին `FULL_TEXT_RULE_PROVIDERS`-ում ավելացնելը բացահայտ,
ըստ մատակարարի համաձայնություն է. այն նախատեսված է, որպեսզի ցանկում չգտնվող
յուրաքանչյուր մատակարարի լռելյայն ուղին բայթ առ բայթ անփոփոխ մնա։

Կանոնի `scope`-ը (`model` / `provider` / `connection`) առանձին համաձայնություն է՝
անկախ `FULL_TEXT_RULE_PROVIDERS`-ից։ `checkFallbackError`-ը միայն այն ներկայացնում է
որպես `fallbackResult.ruleScope`, իսկ հետագա սպառողները դա որպես տեղեկատվական
պիտակից բացի որևէ այլ բան դիտարկում են միայն նույն ֆայլի
`HONORS_RULE_LOCK_SCOPE_PROVIDERS` թույլատրվածների ցանկում ներառված մատակարարների
համար (`honorsRuleLockScope()`-ի միջոցով սահմանափակված. այսօր միայն
`"agentrouter"`)։ Տե՛ս վերևի «Վերաձևակերպված քվոտայի սխալներ» բաժինը՝ հասկանալու,
թե `scope: "connection"` համապատասխանությունն իրականում ինչ է անում, երբ
մատակարարը ներառված է այդ թույլատրվածների ցանկում։

**#11104 — օպերատորի հայտարարած կանոնները շրջանցում են երկու թույլատրվածների
ցանկերն էլ։** Օպերատորը կարող է կատարման ընթացքում յուրաքանչյուր մատակարարի համար
կանոն հայտարարել `settings.providerErrorRules`-ի միջոցով
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)՝ առանց այս
ֆայլը խմբագրելու։ Օպերատորի կանոնը
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS`-ով սահմանափակելը՝
թույլատրվածների ցանկերով, որոնք նախատեսված են ներկառուցված կատալոգային կանոնների
**լռելյայն** վարքագիծը պաշտպանելու համար, կարգավորումների մեխանիզմը անգործուն
կդարձներ բոլոր մատակարարների համար՝ բացի այնտեղ արդեն նշվածներից, քանի որ կանոնի
հայտարարումն ինքնին արդեն օպերատորի բացահայտ համաձայնությունն է։
`resolveRuleMatchBody()`-ն և `honorsRuleLockScope()`-ը նախ ստուգում են
`hasOperatorRuleForProvider()`-ը։ Օպերատորի կանոն ունեցող մատակարարը ստանում է
սխալի չմշակված տեքստը, և նրա հայտարարած `scope`-ը հաշվի է առնվում՝ անկախ նրանից,
թե նա ներառված է այդ թույլատրվածների ցանկերից որևէ մեկում։

**Հայտնի բաց — HTTP 400-ի դեպքում `providerRuleRegistry`-ին երբեք չեն դիմում։**
`checkFallbackError`-ի `BAD_REQUEST` ճյուղը 400 կարգավիճակն ամբողջությամբ
դասակարգում է իր սեփական ձևանմուշների զանգվածների միջոցով
(`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS` և այլն՝
`accountFallback.ts`-ում) և արժեք է վերադարձնում՝ նախքան վերևում գտնվող
`configuredRule`/`getProviderErrorRuleMatch` ճյուղին հասնելը։ `status: 400` ունեցող
ներկառուցված կատալոգային կանոնը (կամ օպերատորի կանոնը) շարահյուսորեն վավեր է,
սակայն երբեք չի գործարկվի։ Այսօր գոյություն ունեցող ոչ մի կանոն ուղղված չէ 400-ին,
ուստի արտադրական միջավայրում ոչինչ չի տուժում։ Սակայն ապագա 400 կանոնը նախ
պահանջում է փոփոխել այս ճյուղը, ինչը ավելի մեծ փոփոխություն է, քան կանոն
ավելացնելը (այն վերադասակարգում է 400-ը յուրաքանչյուր մատակարարի համար, որն արդեն
հենվում է ձևանմուշների զանգվածով վարքագծի վրա), և մեկ մատակարարի համար կանոն
ավելացնելու շրջանակից դուրս է։

### Կվոտան սխալ ներկայացնող նոր gateway-ի ավելացում

1. Գրանցեք կանոնների մեկ զանգված `statusRestatementRegistry`-ում
   (`open-sse/config/upstreamStatusRestatement.ts`)։ `textMarkers`-ը պահեք
   մատակարարին հատուկ. երբեք մի վերօգտագործեք ընդհանուր անգլերեն արտահայտություններ,
   որոնք համընկնում են `CREDITS_EXHAUSTED_SIGNALS`-ի հետ
   (`open-sse/services/accountFallback.ts`)։
2. Ըստ ցանկության՝ գրանցեք դասակարգման կանոններ
   `open-sse/config/providerErrorRules.ts`-ում (`providerRuleRegistry`)՝
   կողպման ճիշտ շրջանակն ընտրելու համար (`connection`՝ ամբողջ հաշվի կվոտայի,
   `model`՝ առանձին մոդելների սխալների համար)։ Այս քայլը production-ում ուժի
   մեջ է մտնում միայն այն մատակարարների համար, որոնց կանոններին անհրաժեշտ է
   սխալի ամբողջական տեքստը (body-ի նշիչները). մատակարարի id-ն ավելացրեք նույն
   ֆայլի `FULL_TEXT_RULE_PROVIDERS`-ում, այլապես `checkFallbackError`-ը կանոնին
   միշտ փոխանցում է միայն կառուցվածքային `{code, type}` սխալը, և body-ի տեքստի
   վրա հիմնված կանոնը երբեք չի համընկնի իրական թրաֆիկի դեպքում։
   Այն կանոնները, որոնք համընկնում են բացառապես `status`/`headers`-ի հիման վրա
   (ինչպես Opencode-ի կամ Minimax-ի կանոնները), այս միացումը չեն պահանջում։
   Առանձին նշենք, որ եթե կանոնը հայտարարում է `scope: "connection"`, և նպատակը
   կապի ամբողջ շրջանակով իրական cooldown-ն ու նույն հարցման ընթացքում combo-ի
   բացթողումն են (և ոչ միայն տեղեկատվական պիտակը), մատակարարի id-ն ավելացրեք
   նույն ֆայլի `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-ում. հենց սա է թույլատրում
   `isAgentrouterConnectionQuotaScope()`-ի նման օգտագործումը
   `markAccountUnavailable()`-ում (`src/sse/services/auth.ts`) և
   `applyComboTargetExhaustion()`-ում
   (`open-sse/services/combo/targetExhaustion.ts`)։ Առանց դրա `scope`-ը
   շարունակում է փոխանցվել `fallbackResult.ruleScope`-ի միջոցով, սակայն ոչինչ
   դրա հիման վրա չի գործում։
3. Ավելացրեք unit test-եր՝ `tests/unit/upstream-status-restatement.test.ts`-ի
   և `tests/unit/agentrouter-error-rules.test.ts`-ի օրինակով (ներառյալ
   ոչ մշտական / ոչ creditsExhausted ստուգումները և, եթե մատակարարին անհրաժեշտ
   է allowlist-ը, թեստ, որը հաստատում է, որ `resolveRuleMatchBody()`-ն
   ամբողջական տեքստը վերադարձնում է միայն այդ մատակարարի համար)։

`chatCore.ts`-ում, `classifyError`-ում կամ combo-ում փոփոխություններ անհրաժեշտ չեն։

#### Ելքային IP-ով խմբավորված կողպում (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS`-ում ներառված մատակարարները (opencode ընտանիքը)
դիտարկվում են որպես ըստ IP-ի խմբավորված upstream (opencode-ի անվճար մակարդակը
խմբավորվում է ըստ IP-ի, ոչ թե ըստ հաշվի. տե՛ս #9611). որպես
`quota_exhausted` **կամ** `rate_limit_exceeded` դասակարգված status-429-ը
cooldown է սահմանում allowlist-ում ներառված ընտանիքի բոլոր այն կապերի համար,
որոնց վերջին հայտնի ելքային IP-ն համընկնում է ձախողված կապի IP-ի հետ՝ նախքան
rotation-ը կկարողանա փորձել դրանք
— այդպիսով խուսափելով N-1 երաշխավորված ձախողմամբ upstream կանչերից (նույն
կառուցվածքը, ինչ #10460/#10525-ում)։
`rate_limit_exceeded`-ը ներառված է միտումնավոր. `markAccountUnavailable`
ուղու վրա opencode-ին հատուկ կանոնները երբեք չեն համընկնում (ոչ headers-ը,
ոչ body-ն չեն փոխանցվում `checkFallbackError`-ին, իսկ opencode-ը ներառված չէ
`FULL_TEXT_RULE_PROVIDERS`-ում), ուստի 429-ը, որի body-ն պարունակում է
բաժանորդագրության կվոտայի տեքստը («ամսական օգտագործման սահմանաչափը հասել է»),
դասակարգվում է որպես `quota_exhausted` կվոտայի տեքստի fallback-ի միջոցով
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1 ժամ cooldown),
նախքան `status_429` կանոնին հասնելը, մինչդեռ կվոտայի տեքստ չպարունակող 429-ը
(սովորական rate limiting) `status_429` կանոնի միջոցով դասակարգվում է որպես
`rate_limit_exceeded` և նույնպես cooldown է սահմանում IP ընտանիքի համար։
Allowlist-ում ներառված մատակարարի դեպքում ըստ IP-ի խմբավորված rate limit-ը
նույն ազդանշանն է, ինչ սպառված կվոտան։ Իրական սահմանափակումները՝

- **Լավագույն ջանքերի սկզբունքով**։ կողպեքը որոշում է միացման վերջին հայտնի
  `egress_ip`-ը `proxy_logs`-ից (24 ժամվա պատուհան, սինխրոն, առանց քեշի)։
  Սառը քեշի (egress IP-ն երբեք չի ստուգվել) կամ տողի բացակայության դեպքում →
  ձախողված միացումը այնուամենայնիվ սառեցվում է ճյուղի կողմից (գրանցվում է
  ինչպես մինչ այժմ), միայն թե ոչ մի քույր չի կողպվում։
- **Երբեք վերջնական չէ**։ սառեցումը նորացվող քվոտայի պատուհան է
  (`testStatus: "unavailable"`). մշտական վիճակ երբեք չի ստացվում IP մակարդակի
  ազդանշանից։ `disableCooling` միացումները ամբողջությամբ բաց են թողնում այս
  ճյուղը։
- **Կողպեքի գրանուլյարությունը փոխվում է թույլացուցակի ընտանիքի համար**։ սա
  ոլորտի փոփոխություն է, ոչ միայն քույրերի օպտիմիզացիա։ opencode-ը
  `passthroughModels` մատակարար է, ուստի մինչև այս ճյուղը 429-ը առաջացնում էր
  ՄՈԴԵԼԻ մակարդակով արգելափակում. այժմ այն առաջացնում է միացման սառեցում —
  ներառյալ այն օպերատորի համար, ով գործարկում է մեկ միացում՝ առանց որևէ քույրի։
  Սա հենց այն գրանուլյարությունն է, որը opencode-ի կանոնների աղյուսակն արդեն
  հայտարարում է որպես ճիշտ (`scope: "connection"`, `providerErrorRules.ts`),
  սակայն մինչ այժմ երբեք չի պահպանվել, քանի որ opencode-ը ներառված չէ
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`-ում։ Ճյուղն ինքն է գրանցում ձախողված
  միացման սառեցումը + `backoffLevel`-ը՝ արտացոլելով միացման ոլորտով աշխատող
  agentrouter ճյուղը, և վերադառնում է. մոդելի մակարդակով արգելափակումը և ստորև
  բերված ընդհանուր ուղին երբեք չեն կատարվում։
- **Combo-ն ներառված է**։ ինչպես agentrouter ճյուղի դեպքում, ոլորտը դիտավորյալ
  անտեսում է `persistUnavailableState`/`isCombo` իջեցումը, որը combo կանչողը
  կիրառում է 429-ի նկատմամբ։ Մոդելի մակարդակով արգելափակումը այս ոլորտի ավելի
  թույլ ձևը չէ, այլ սխալ միավոր է. այն ոչինչ չի ասում սպառված IP-ի մասին,
  ուստի combo ռոտացիան կշարունակի վատնել մեկ երաշխավորված ձախողված կանչ
  յուրաքանչյուր քույրի համար։
- **Քույրերի անվտանգություն**։ արդեն վերջնական վիճակում գտնվող
  (banned/credits_exhausted) կամ արդեն ավելի երկար սառեցման մեջ գտնվող քույրը
  երբեք չի վերագրվում։
- **Բացառիկ թույլացուցակ**։ `EGRESS_BUCKETED_LOCK_PROVIDERS`-ի ընդլայնումը
  սեփականատիրոջ հստակ որոշում է. ընդհանուր կապակցում չկա (շաբլոն
  #10334/#10419)։ Քույրերի հարցումը կապում է նույն թույլացուցակը՝ այն SQL
  լիտերալի տեսքով չկրկնելու փոխարեն, ուստի դրա ընդլայնումը մնում է մեկ տողի
  փոփոխություն։
- **Egress IP-ի ռոտացիա՝ երկու ուղղություններով**։ որոնման պատուհանը (24 ժամ)
  շատ ավելի լայն է, քան egress-IP քեշի TTL-ը (5 րոպե), ուստի «վերջին հայտնի
  IP-ն» պատմություն է, ոչ թե ընթացիկ վիճակ։ Եթե միացման պրոքսին ռոտացվել է
  պատուհանի ներսում, կողպեքը կարող է **բաց թողնել** իսկապես համօգտագործվող
  IP-ն (գրանցված IP-ն նորն է՝ չսպառվածը) — և համաչափորեն կարող է **սառեցնել
  այն քույրին, որն այնուհետև ռոտացվել է** սպառված IP-ից։ Երկրորդ դեպքը այդ
  քույրին արժե մեկ սառեցման պատուհան. երկուսն էլ պատմության վրա հիմնված
  որոնման ընդունված, լավագույն ջանքերի սահմանափակումներն են։
- **Արժեք**։ `proxy_logs`-ի երկու սահմանափակված սկանավորում (պատուհանով զտված
  `idx_pl_timestamp`-ի միջոցով), միայն 429 հաճախականությամբ։ Նոր ինդեքս չկա
  (միգրացիա 134 YAGNI)։ Չափվել է չափավոր չափի, իրական տրաֆիկով DB պատճենի վրա.
  բարձր թողունակության ինստանսը նույն պատուհանում պահում է համամասնորեն ավելի
  շատ տողեր։

---

## Կայունության այլ առանձնահատկություններ

- **21 երթուղավորման ռազմավարություն** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, expiry-first, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — տես [AUTO-COMBO.md](../routing/AUTO-COMBO.md)։
- **Reset-aware երթուղավորում** (v3.8.0) — առաջնահերթություն է տալիս կապերին ըստ քվոտայի վերականգնման ժամանակի։
- **Background ռեժիմի դեգրադացիա** — Responses API-ի `background: true`-ն դեգրադացվում է մինչև սինխրոն ռեժիմ՝ նախազգուշացման հետ միասին։
- **Գործիքների սահմանաչափի դինամիկ հայտնաբերում** — հետ է քաշում մատակարարներին, երբ հասնում են գործիքների քանակի սահմանաչափերին։
- **Արտակարգ պահուստային անցում** — կառավարվում է `OMNIROUTE_EMERGENCY_FALLBACK`-ով; օպերատորները կարող են այն վերակիրառել Feature Flags էջից առանց վերամեկնարկի։

---

## Վրիպազերծում

- Weighted combo-ն պատասխանում է `503 all_targets_cooling_down` (`Retry-After`-ը սահմանված է, `diagnostics.excluded`-ը թվարկում է բոլոր թիրախները `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable` կարգավիճակներով) → պուլը կարգավորված է և միացված, բոլոր թիրախները պարզապես բացառված են կայունության ժամանակաչափի կողմից. `[COMBO] Weighted selection: every target excluded before dispatch — …` նախազգուշացումը նշում է պատճառները և մնացորդային վայրկյանները։ Նույն combo-ից ստացված `404 no_executable_targets`-ը նշանակում է, որ կայունության ժամանակաչափ չի ներգրավվել (կա՛մ գործարկելի բան չկա, կա՛մ բոլոր հաշիվները ձախողել են հասանելիության ստուգումը)։ Կառուցված է `open-sse/services/combo/pinRecovery.ts`-ում՝ `targetResolution.ts`-ում հավաքված բացառումներից։
- Մատակարարի բոլոր բանալիները բաց են թողնված → ստուգեք և՛ circuit breaker-ի վիճակը, և՛ յուրաքանչյուր կապի `rateLimitedUntil`/`testStatus`-ը։
- Մատակարարը մշտապես բացառված է վերականգնման պատուհանից հետո → կոդը կարդում է հում `state`-ը `getStatus()`/`canExecute()`-ի փոխարեն։
- Մեկ բանալին է ձախողվում, մյուսները պետք է աշխատեն → նախապատվություն տվեք connection cooldown-ին, ոչ թե circuit breaker-ին։
- Միայն մեկ մոդել է ձախողվում → նախապատվություն տվեք model lockout-ին, ոչ թե connection cooldown-ին։
- Վիճակը պետք է ինքնավերականգնվի, բայց չի վերականգնվում → ստուգեք ապագա ժամանակադրումը և ընթերցման ուղին, որը թարմացնում է լրացած վիճակը։ Մշտական կարգավիճակները պահանջում են ձեռքով փոփոխություններ։

---

## Գործարկման վիճակ — գործակալի արագ տեղեկանք

> Տեղափոխված է բառացիորեն `AGENTS.md`-ից → "Resilience Runtime State" (PR #12743), որպեսզի գործակալի
> ուղեցույցը մնա 40k կոնտեքստային բյուջեի սահմաններում։ Սա վերոհիշյալ բաժինների խտացված,
> գործակալին ուղղված տեսքն է. համարակալված բաժինները մնում են ամբողջական տեղեկատուն։

OmniRoute-ն ունի երեք փոխկապված, բայց տարբեր ժամանակավոր ձախողման մեխանիզմ։ Երթուղավորման
պահվածքը վրիպազերծելիս պահեք դրանց շրջանակները առանձին։ Մի հայացքով ծանոթացման համար տես
[3-շերտ կայունության դիագրամը](../diagrams/exported/resilience-3layers.svg)
(աղբյուր՝ [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))։

### Մատակարարի Circuit Breaker

**Շրջանակը**. ամբողջ մատակարարը, օր. `glm`, `openai`, `anthropic`։

**Նպատակը**. դադարեցնել տրաֆիկի ուղարկումը մատակարարին, որը բազմիցս ձախողվում է upstream/ծառայության
մակարդակում, որպեսզի մեկ ոչ առողջ մատակարարը չդանդաղեցնի յուրաքանչյուր հարցում։

**Իրականացում**.

- Հիմնական դասը՝ `src/shared/utils/circuitBreaker.ts`
- Chat-ի դարպասի/կատարման միացում՝ `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Գործարկման վիճակի API՝ `src/app/api/monitoring/health/route.ts`
- Ընդհանուր փաթաթիչներ՝ `open-sse/services/accountFallback.ts`
- Պերսիստենտ վիճակի աղյուսակ՝ `domain_circuit_breakers`

**Վիճակներ** (4 — `src/shared/utils/circuitBreaker.ts`).

- `CLOSED`՝ նորմալ տրաֆիկը թույլատրվում է։
- `DEGRADED`՝ վաղ նախազգուշացման գոտի — ձախողումները գերազանցել են դեգրադացիայի շեմը, բայց դեռ ոչ
  breaker-ի շեմը. տրաֆիկը շարունակում է հոսել, վահանակները ցույց են տալիս նախազգուշացումը։ Վավեր
  կապի թեստը կամ առանց նոր ձախողման հանգիստ պատուհանը այն վերադարձնում է `CLOSED` վիճակի
  (պատուհանը նշված է `docs/architecture/RESILIENCE_GUIDE.md`-ում)։
- `OPEN`՝ մատակարարը ժամանակավորապես արգելափակված է. կանչողները ստանում են provider-circuit-open
  պատասխան, կամ combo երթուղավորումը բաց է թողնում այն՝ անցնելով մեկ այլ թիրախի։
- `HALF_OPEN`՝ վերականգնման ժամկետը լրացել է. թույլատրվում է փորձնական հարցում։ Հաջողությունը
  փակում է breaker-ը, ձախողումը նորից բացում է այն։

**Լռակյաց արժեքներ** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, օգտագործվում է
`DEFAULT_RESILIENCE_SETTINGS.providerBreaker`-ի միջոցով `src/lib/resilience/settings.ts`-ում →
`getCircuitBreaker(provider, …)` `src/sse/handlers/chatHelpers.ts`-ում)։ Ամբողջ մատակարարի
breaker-ը աշխատում է `circuitBreakerThreshold` / `circuitBreakerReset` պարամետրերով.

| Պրոֆիլ     | դեգրադացվում է | բացվում է (`circuitBreakerThreshold`) | վերականգնում (`circuitBreakerReset`) |
| ---------- | -------------: | ------------------------------------: | -----------------------------------: |
| OAuth      |            `5` |                                   `8` |                                `60s` |
| API բանալի |            `7` |                                  `12` |                                `30s` |
| Տեղային    |     (ածանցված) |                                   `2` |                                `15s` |

`PROVIDER_PROFILES`-ը նաև սահմանում է `providerFailureThreshold` (10/15/2),
`providerFailureWindowMs` (15/30/5 րոպե) և `providerCooldownMs` (5/10/1 րոպե). դրանք սնուցում են
**ընտրովի միացվող գլոբալ Provider Cooldown-ի պատուհանի դարպասը** (`PROVIDER_COOLDOWN_ENABLED`,
լռակյաց անջատված) — `open-sse/services/providerCooldownTracker.ts`-ում մատակարարի մակարդակի
գրառումը համարվում է սառեցվող միայն այն բանից հետո, երբ `providerFailureWindowMs`-ի ներսում
գրանցվի `providerFailureThreshold` ձախողում, և այնուհետև սառեցվում է `providerCooldownMs`
տևողությամբ։ Դրանք ՈՉ կենդանի breaker-ի շեմերն են — մի կարգավորեք դրանք՝ ակնկալելով breaker-ի
պահվածք։ Յուրաքանչյուր լռակյաց արժեք կարող է վերակիրառվել
`OMNIROUTE_PROVIDER_BREAKER_*` և `OMNIROUTE_CIRCUIT_BREAKER_*` միջավայրի փոփոխականների միջոցով.
գործարկմանը համապատասխան ճշգրիտ տեղեկատու աղյուսակը գտնվում է
`docs/architecture/RESILIENCE_GUIDE.md`-ում։

Միայն մատակարարի մակարդակի ձախողման կարգավիճակները պետք է գործարկեն մատակարարի breaker-ը.

```ts
(408, 500, 502, 503, 504);
```

Մի գործարկեք ամբողջ մատակարարի breaker-ը սովորական հաշվի/բանալու/մոդելի սխալների համար,
ինչպիսիք են `401`, `403` կամ `429` դեպքերի մեծամասնությունը։ Դրանք սովորաբար պատկանում են
connection cooldown-ին կամ model lockout-ին։ Ընդհանուր API բանալիով մատակարարի `403`-ը պետք է
լինի վերականգնելի, եթե այն դասակարգված չէ որպես վերջնական մատակարարի/հաշվի սխալ։

Բրեյկերը օգտագործում է ծույլ (lazy) վերականգնում, ոչ թե ֆոնային ժամաչափ։ Երբ `OPEN`-ի ժամկետը լրանում է, այնպիսի կարդացումներ, ինչպիսիք են `getStatus()`-ը, `canExecute()`-ը և `getRetryAfterMs()`-ը, թարմացնում են վիճակը դեպի `HALF_OPEN`, այնպես որ դաշբորդները և combo թեկնածուների կառուցիչները չեն շարունակում ընդմիշտ բացառել ժամկետանց պրովայդերին։

### Կապի սառեցում (Cooldown)

**Շրջանակ**՝ մեկ պրովայդերի կապ/հաշիվ/բանալի։

**Նպատակ**՝ ժամանակավորապես բաց թողնել մեկ վատ բանալի/հաշիվ՝ միաժամանակ թույլ տալով նույն պրովայդերի այլ կապերին շարունակել սպասարկել հարցումները։

**Իրականացում**՝

- Գրելու/թարմացնելու ուղի՝ `src/sse/services/auth.ts::markAccountUnavailable()`
- Հաշվի ընտրություն/զտում՝ `src/sse/services/auth.ts::getProviderCredentials...`
- Սառեցման հաշվարկ՝ `open-sse/services/accountFallback.ts::checkFallbackError()`
- Կարգավորումներ՝ `src/lib/resilience/settings.ts`

Կարևոր դաշտեր պրովայդերի կապերի վրա՝

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Հաշվի ընտրության ընթացքում կապը բաց է թողնվում, քանի դեռ՝

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Սառեցումները նույնպես ծույլ են. երբ `rateLimitedUntil`-ը անցյալում է, կապը կրկին դառնում է իրավասու։ Հաջող օգտագործման դեպքում `clearAccountError()`-ը մաքրում է `testStatus`-ը, `rateLimitedUntil`-ը, սխալի դաշտերը և `backoffLevel`-ը։

Կապի սառեցման լռելյայն վարքագիծ՝

- OAuth բազային սառեցում՝ `5s`։
- API-բանալու բազային սառեցում՝ `3s`։
- API-բանալու `429`-ը պետք է նախապատվություն տա վերին հոսքի (upstream) կրկնման հուշումներին (`Retry-After`, reset գլխագրեր կամ վերլուծելի reset տեքստ), երբ դրանք հասանելի են։
- Կրկնվող վերականգնելի ձախողումները օգտագործում են ցուցչային backoff՝

```ts
baseCooldownMs * 2 ** failureIndex;
```

Anti-thundering-herd պաշտպանությունը կանխում է նույն կապի վրա միաժամանակյա ձախողումների պատճառով սառեցման կրկնակի երկարացումը կամ `backoffLevel`-ի կրկնակի ավելացումը։

Վերջնական (terminal) վիճակները սառեցումներ չեն։ `banned`-ը, `expired`-ը (որը դառնում է վերջնական միայն N սահմանափակ կրկնություններից հետո՝ `EXPIRED_RETRY_MAX`-ի միջոցով) և `credits_exhausted`-ը նախատեսված են մնալ անհասանելի, քանի դեռ հավաստագրերը/կարգավորումները չեն փոխվել կամ օպերատորը չի վերակայել դրանք։ Մի վերագրանցեք վերջնական վիճակները անցողիկ սառեցման վիճակով։

### Մոդելի արգելափակում (Lockout)

**Շրջանակ**՝ պրովայդեր + կապ + մոդել։

**Նպատակ**՝ խուսափել ամբողջ կապի անջատումից, երբ միայն մեկ մոդելն է անհասանելի կամ քվոտայով սահմանափակված այդ կապի համար։

Օրինակներ՝

- Յուրաքանչյուր մոդելի համար քվոտա ունեցող պրովայդերներ, որոնք վերադարձնում են `429`։
- Տեղային պրովայդերներ, որոնք վերադարձնում են `404` մեկ բացակայող մոդելի համար։
- Պրովայդերին հատուկ ռեժիմի/մոդելի թույլտվության ձախողումներ, ինչպիսիք են Grok-ի ընտրված ռեժիմները։

Մոդելի արգելափակումը գտնվում է `open-sse/services/accountFallback.ts`-ում և թույլ է տալիս նույն կապին շարունակել սպասարկել այլ մոդելներ։

### Վրիպազերծման ուղեցույց

- Եթե պրովայդերի բոլոր բանալիները բաց են թողնվում, ստուգեք թե՛ պրովայդերի բրեյկերի վիճակը, թե՛ յուրաքանչյուր կապի `rateLimitedUntil`/`testStatus`-ը։
- Եթե պրովայդերը վերակայման պատուհանից հետո մշտապես բացառված է թվում, ստուգեք՝ արդյոք կոդը կարդում է հում `state`-ը `getStatus()`/`canExecute()` օգտագործելու փոխարեն։
- Եթե պրովայդերի մեկ բանալին է ձախողվում, բայց մյուսները պետք է աշխատեն, նախապատվություն տվեք կապի սառեցմանը՝ պրովայդերի բրեյկերի փոխարեն։
- Եթե միայն մեկ մոդելն է ձախողվում, նախապատվություն տվեք մոդելի արգելափակմանը՝ կապի սառեցման փոխարեն։
- Եթե վիճակը պետք է ինքնավերականգնվի, այն պետք է ունենա ապագա ժամադրույթ/վերակայման ժամկետ և կարդացման ուղի, որը թարմացնում է ժամկետանց վիճակը։ Մշտական կարգավիճակները պահանջում են հավաստագրի կամ կոնֆիգուրացիայի ձեռքով փոփոխություններ։

---

## TLS մատնահետքում և գաղտնիություն

Մատակարարին հատուկ գաղտնիությունը (JA3/JA4, CCH, օբֆուսկացիա) փաստաթղթավորված է առանձին — տե՛ս `docs/security/STEALTH_GUIDE.md` (git; չի կոմպիլացվում `/docs`-ի մեջ):

---

## Դիմացկունության փորձարկում (Փուլ 8 · Բլոկ C)

Բացի դիմացկունության տրամաբանության unit թեստերից, երեք թեստեր ենթարկում են runtime-ը իրական ծանրաբեռնվածության/ձախողման պայմանների (բոլորը integration/գիշերային են — ոչ մեկը չի արգելափակում PR-ները):

| Թեստ        | Ինչ է անում                                                                                                                                                                                                      | Գործարկում                                 |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| Chaos       | Կեղծ upstream հանգույցը ներարկում է իրական ուշացում/reset/timeout/503; վավերացնում է, որ circuit breaker-ը բացվում է/վերականգնվում, և որ `checkFallbackError`-ը 503-ը դասակարգում է որպես վերականգնելի fallback: | `RUN_CHAOS_INT=1 npm run test:chaos`       |
| Heap-growth | ~500 հոսք յուրաքանչյուր `createSSEStream`-ի համար `--expose-gc`-ի ներքո; ձախողվում է, եթե heap-ն աճում է վերին սահմանից դուրս (OOM պաշտպանություն #3069):                                                        | `npm run test:heap`                        |
| k6 soak     | Երկարատև ծանրաբեռնվածություն `/api/monitoring/health`-ի դեմ; p95/սխալների շեմային արժեքներ:                                                                                                                      | `k6 run tests/load/k6-soak.js` (գիշերային) |

Օրկեստրվում է `.github/workflows/nightly-resilience.yml`-ի կողմից (cron + dispatch): Լռելյայն `test:integration`-ի մեջ chaos-ը և heap-ը ինքնաբերաբար բաց են թողնվում (առանց `RUN_CHAOS_INT`/`--expose-gc`-ի):

---

## Տե՛ս նաև

- [Ճարտարապետության ուղեցույց](./ARCHITECTURE.md) — Համակարգի ճարտարապետություն և ներքին կառուցվածք
- [Օգտագործողի ուղեցույց](../guides/USER_GUIDE.md) — Մատակարարներ, կոմբոներ, CLI ինտեգրացիա
- [Auto-Combo շարժիչ](../routing/AUTO-COMBO.md) — 16-գործոն գնահատում, ռեժիմային փաթեթներ
