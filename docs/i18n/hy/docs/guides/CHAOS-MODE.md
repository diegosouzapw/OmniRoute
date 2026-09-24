# Chaos Mode (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Կառավարման վահանակ․** **Chaos Mode** (կողային վահանակ) → `/dashboard/chaos`  
> **API․** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (կառավարման վահանակի աշխատաշրջան) · `POST /api/skills/collect/chaos` (API բանալի)  
> **Սկզբնաղբյուր․** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode-ը **մեկ առաջադրանք միաժամանակ ուղարկում է մի քանի մատակարարի**․ յուրաքանչյուր մասնակցող մատակարար
տրամադրում է մոդելի մեկ օրինակ, իսկ դուք ստանում եք բոլոր պատասխանները կողք կողքի (կամ շղթայված)։ Սա
բազմամոդել կատարման միջավայր է, այլ ոչ թե երթուղավորման ռազմավարություն․ ձեր սովորական `/v1/chat/completions`
թրաֆիքը երբեք չի ազդվում դրանից։

**Տարբերակում — «chaos» անվամբ տրամադրվում են երեք տարբեր բաներ․**

| Բան                     | Ինչ է դա                                                                                                                       | Որտեղ է փաստաթղթավորված                      |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| **Chaos Mode**          | Այստեղ նկարագրված կառավարման վահանակի էջը և API-ն․ մեկ առաջադրանքի բաշխում բազմաթիվ մատակարարների միջև (զուգահեռ կամ համատեղ)։ | Այս ուղեցույցը                               |
| `auto/chaos`            | Auto-Combo մոդելի id՝ խափանումների ներարկման գնահատման կշիռներով, դիմակայունության փորձարկման համար։ Կարգավորելու բան չկա։     | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos combo կարգավորում | Պահպանված combo, որի `config.chaos.enabled`-ը առաջադրանքը բաշխում է պանելի միջև՝ դատող կամընտիր մոդելով (միայն API)։           | `open-sse/services/autoCombo/chaosEngine.ts` |

## Կարգավորում

1. Բացեք **Կառավարման վահանակ → Chaos Mode** (`/dashboard/chaos`)։
2. **Միացրեք** այն․ Chaos Mode-ը լռելյայն **անջատված է** (`enabled: false`
   `src/lib/chaos/chaosConfig.ts`-ում)։ Երբ այն անջատված է, `POST /api/chaos/run`-ը պատասխանում է
   `400 — "Chaos Mode-ը միացված չէ։ Միացրեք այն Կառավարման վահանակ → Chaos Mode բաժնում։"`։
3. Ընտրեք մասնակիցներին և լռելյայն արժեքները (յուրաքանչյուր օրինակի համար պահպանվում են կարգավորումների պահոցում)․

   | Դաշտ                | Նշանակություն                                                                          | Լռելյայն արժեք / սահմանաչափեր                          |
   | ------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------ |
   | `enabled`           | Գլխավոր անջատիչ                                                                        | `false`                                                |
   | `defaultMode`       | `parallel` կամ `collaborative` (տե՛ս ստորև)                                            | `parallel`                                             |
   | `providerOverrides` | Յուրաքանչյուր մատակարարի մասնակցությունը (`providerId`, կամընտիր `modelId`, `enabled`) | դատարկ = բոլոր ակտիվ մատակարարները, առավելագույնը՝ 200 |
   | `systemPrompt`      | Ներկառուցված Chaos համակարգային հրահանգի փոխարինում                                    | կամընտիր, առավելագույնը՝ 10 000 նիշ                    |
   | `timeoutMs`         | Մոդելի յուրաքանչյուր կանչի առավելագույն տևողությունը                                   | `120000` (5 000–600 000)                               |
   | `maxTokens`         | `max_tokens`՝ մոդելի յուրաքանչյուր կանչի համար                                         | `4096` (256–128 000)                                   |

4. **Փորձարկում կատարեք հենց էջից**․ արդյունքների պանելը ցուցադրում է յուրաքանչյուր մատակարարի պատասխանը,
   կարգավիճակը և տևողությունը։

## Կատարման ռեժիմներ

- **`parallel`** — յուրաքանչյուր մոդել միաժամանակ ստանում է նույն առաջադրանքը․ դուք բոլոր պատասխանները
  ստանում եք միմյանցից անկախ։
- **`collaborative`** — մոդելներն աշխատում են **շղթայով**․ դրանցից յուրաքանչյուրը տեսնում է նախորդ մոդելի արդյունքը և
  ստանում է այն կատարելագործելու, ընդլայնելու, քննադատելու կամ այլընտրանք առաջարկելու առաջադրանք։ Պատասխանի `summary` դաշտը
  միավորում է հաջող արդյունքները՝ շղթայի հերթականությամբ (`parallel` կատարումները `summary` չունեն)։

## API

### `POST /api/chaos/run` — կառավարման վահանակի աշխատաշրջան

Նույնականացվում է cookie-ով (կառավարման աշխատաշրջանը․ տե՛ս
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)) և օգտագործվում է կառավարման վահանակի էջի կողմից։

```jsonc
// մարմին
{
  "task": "Համեմատել X-ի մոտեցումները", // պարտադիր
  "providers": ["glm", "kimi"], // կամընտիր զտիչ
  "mode": "parallel", // կամընտիր — փոխարինում է defaultMode-ը
  "systemPrompt": "…", // կամընտիր փոխարինում
  "maxTokens": 4096, // կամընտիր փոխարինում
}
```

### `POST /api/skills/collect/chaos` — API բանալի

Bearer token-ով տարբերակ՝ արտաքին կանչողների համար։ Բանալին պետք է ունենա **Chaos Mode թույլտվությունը**
(`chaosModeEnabled`), որը **լռելյայն անջատված է**․ միացրեք այն յուրաքանչյուր բանալու համար
**Կառավարման վահանակ → API Manager → խմբագրել բանալին → թույլտվություններ → Chaos Mode** բաժնում։ Հարցման մարմինը նույնն է, ինչ վերևում։

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Համեմատել X-ի մոտեցումները","mode":"parallel"}'
```

Երկու վերջնակետերն էլ վերադարձնում են նույն կառուցվածքը․

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // միայն collaborative ռեժիմի համար
}
```

## Խնդիրների լուծում

- **`400 Chaos Mode is not enabled`** — տե՛ս վերևի 2-րդ քայլը․ գլոբալ անջատիչն անջատված է։
- **API բանալին մերժվում է `/api/skills/collect/chaos`-ում** — բանալին չունի տվյալ բանալու համար նախատեսված
  `chaosModeEnabled` թույլտվությունը (լռելյայն անջատված է․ սա կարգավորում է, ոչ թե սխալ)։
- **Արդյունքներում բացակայում է ձեր ակնկալած մատակարարը** — ստուգեք `providerOverrides`-ը
  Chaos Mode էջում (անջատված override-ը բացառում է նրան), ինչպես նաև՝ արդյոք մատակարարի կապն
  ակտիվ է։
