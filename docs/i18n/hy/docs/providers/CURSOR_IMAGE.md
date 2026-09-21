# Cursor Image Generation (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute-ը հասանելի է դարձնում Cursor պլանի **պատկերների գեներացումը** `POST /v1/images/generations` հասցեով՝ օգտագործելով նույն մատակարարի id-ն, ինչ չաթի համար՝ `cursor` (կեղծանունը՝ `cu`)։

| Դաշտ                 | Արժեք                                                                                       |
| -------------------- | ------------------------------------------------------------------------------------------- |
| `IMAGE_PROVIDERS` id | `cursor`                                                                                    |
| Ձևաչափ               | `cursor-agent-image`                                                                        |
| Նույնականացում       | Նույն OAuth / API բանալու կապը, ինչ չաթի համար (`provider_connections.provider = "cursor"`) |
| Մոդելներ             | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                   |

## Ինչու Agent CLI-ն

OmniRoute-ում Cursor չաթն օգտագործում է `agent.v1.AgentService/Run` (protobuf)։ Այդ ուղին **մերժում է** ներկառուցված հաճախորդային գործիքները (shell, write, …)։ Պատկերների գեներացումը Cursor-ի բնիկ գործիք է, որն աշխատատեղի նկատմամբ գործարկվում է **`agent` CLI-ի** միջոցով։ Ուստի պատկերների մշակիչը գործարկում է `agent`-ը՝ ֆիքսված հուշումով և յուրաքանչյուր հարցման համար նախատեսված ժամանակավոր աշխատանքային տարածքով (համայնքային աշխատատեղերի կամուրջների նման կառուցվածքով), ապա վերադարձնում է OpenAI-ի հետ համատեղելի `b64_json`։

## Հասանելիության սահմանափակում (Կոշտ կանոններ #15 + #17)

Սա `IMAGE_PROVIDERS`-ի միակ ձևաչափն է, որը գործարկում է ենթապրոցես (`agent`
երկուական ֆայլը)։ Քանի որ `POST /v1/images/generations`-ը համօգտագործվում է մոտ 40 այլ՝ ենթապրոցես չգործարկող
պատկերային մատակարարների կողմից, որոնք հեռակա կանչողները օրինականորեն օգտագործում են, ամբողջ երթուղին **չի**
դասակարգվում որպես `LOCAL_ONLY`։ Փոխարենը՝ `handleCursorAgentImageGeneration`-ը կիրառում է իր սեփական
անցակետը՝ օգտագործելով վստահելի `AUTHZ_HEADER_PEER_LOCALITY` եզրակացությունը, որն authz հոսքաշարը նշում է
յուրաքանչյուր հարցման վրա (իրական TCP հանգույցից, ոչ թե կեղծման ենթակա `Host` վերնագրից)։ Միայն
`loopback` և `lan` կանչողները կարող են հասնել գործարկմանը, իսկ բոլոր մյուսները (ներառյալ հանրային
թունելով վերարտադրված արտահոսած API բանալին) ստանում են `403`՝ նախքան հավատարմագրերի որևէ որոնում կամ
պրոցեսի գործարկում։ Տե՛ս `src/server/authz/policies/management.ts`՝ `LOCAL_ONLY` մակարդակի մնացած մասի նկատմամբ կիրառվող նույն
քաղաքականության համար։

## Զուգահեռության անցակետը մոդուլի մակարդակում է (մեկ օրինակի սահմանափակում)

`CURSOR_IMG_MAX_CONCURRENT`-ը կիրառվում է հիշողության մեջ պահվող հաշվիչի/հերթի միջոցով, որի տիրույթը
Node մոդուլի օրինակն է (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`)։
Այն ճիշտ է սահմանափակում `agent`-ի զուգահեռ գործարկումները OmniRoute-ի մեկ պրոցեսի ներսում, սակայն
**չի** համակարգում նույն Cursor աշխատատեղն օգտագործող բազմաթիվ պրոցեսների/օրինակների միջև
(օրինակ՝ բազմակրկնօրինակ տեղակայման դեպքում)։ Յուրաքանչյուր օրինակ կիրառում է իր անկախ սահմանաչափը։
Մեկ օրինակով տեղակայման համար (լռելյայն տարբերակը) սա ճշգրիտ է։ Հորիզոնական մասշտաբավորմամբ
տեղակայումները պետք է յուրաքանչյուր օրինակի համար `CURSOR_IMG_MAX_CONCURRENT`-ը պահպանողական սահմանեն կամ
Cursor-ի պատկերային տրաֆիկն ուղղորդեն մեկ օրինակի։

## Պահանջներ

1. Կառավարման վահանակում միացված Cursor հաշիվ (OAuth կամ `crsr_…` API բանալի)։
2. Cursor Agent երկուական ֆայլը պետք է հասանելի լինի OmniRoute պրոցեսին՝
   - env `CURSOR_AGENT_BIN=/path/to/agent`, կամ
   - `~/.local/bin/agent`, կամ
   - Cursor կապի `providerSpecificData.agentBin`։

Ընտրովի կարգավորումներ՝

| Env                         | Լռելյայն                  | Նշանակություն                                    |
| --------------------------- | ------------------------- | ------------------------------------------------ |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                  | Յուրաքանչյուր պատկերի ընդհանուր սպասման ժամանակ  |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                       | Համօգտագործվող աշխատատեղի զուգահեռության անցակետ |
| `CURSOR_IMG_MODEL`          | (հարցման մոդելը / `auto`) | CLI-ի `--model`-ի վերասահմանում                  |

## Օրինակ

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

Գեներացումը սովորաբար տևում է 1–2 րոպե։ Նախընտրեք ներքին ցանցային ուղի. մոտ 100 վրկ. ժամանակային սահմանափակում ունեցող եզրային պրոքսիները կձախողվեն։

## LiteLLM

Գրանցեք պատկերային մոդել՝ `mode: image_generation`, `api_base: http://omniroute:20128/v1` և `model: openai/cursor/auto` պարամետրերով (կամ պարզապես `cursor/auto`՝ կախված ձեր LiteLLM տարբերակից)։
