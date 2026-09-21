# Cursor Image Generation (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute უზრუნველყოფს Cursor-ის გეგმის **სურათების გენერაციას** `POST /v1/images/generations` მისამართზე, ჩატის იგივე პროვაიდერის id-ის გამოყენებით: `cursor` (ფსევდონიმი `cu`).

| ველი                 | მნიშვნელობა                                                                                     |
| -------------------- | ----------------------------------------------------------------------------------------------- |
| `IMAGE_PROVIDERS` id | `cursor`                                                                                        |
| ფორმატი              | `cursor-agent-image`                                                                            |
| ავთენტიფიკაცია       | იგივე OAuth / API-გასაღების კავშირი, რაც ჩატისთვის (`provider_connections.provider = "cursor"`) |
| მოდელები             | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                                       |

## რატომ Agent CLI

Cursor-ის ჩატი OmniRoute-ში იყენებს `agent.v1.AgentService/Run`-ს (protobuf). ეს გზა **უარყოფს** კლიენტის ჩაშენებულ ხელსაწყოებს (shell, write, …). სურათების გენერაცია არის Cursor-ის ნატიური ხელსაწყო, რომელსაც ადგილის მიმართ **`agent` CLI** ასრულებს. ამიტომ სურათების დამმუშავებელი უშვებს `agent`-ს ჩაკეტილი მოთხოვნითა და თითოეული მოთხოვნისთვის განკუთვნილი დროებითი სამუშაო სივრცით (community seat bridge-ების ანალოგიური სტრუქტურით), შემდეგ კი აბრუნებს OpenAI-სთან თავსებად `b64_json`-ს.

## წვდომის შეზღუდვა (მკაცრი წესები #15 + #17)

ეს არის ერთადერთი `IMAGE_PROVIDERS` ფორმატი, რომელიც შვილობილ პროცესს (`agent`
ბინარულ ფაილს) უშვებს. რადგან `POST /v1/images/generations` გაზიარებულია დაახლოებით 40 სხვა, პროცესის არგამშვებ
სურათების პროვაიდერთან, რომლებსაც დისტანციური გამომძახებლები მართლზომიერად იყენებენ, მთელი მარშრუტი **არ არის**
კლასიფიცირებული როგორც `LOCAL_ONLY` — ამის ნაცვლად, `handleCursorAgentImageGeneration` საკუთარ
შეზღუდვას ახორციელებს სანდო `AUTHZ_HEADER_PEER_LOCALITY` გადაწყვეტილების გამოყენებით, რომელსაც authz მილსადენი
თითოეულ მოთხოვნას ანიჭებს (რეალური TCP პარტნიორის მიხედვით და არასდროს გაყალბებადი `Host` სათაურიდან): გაშვებამდე
წვდომა მხოლოდ `loopback` და `lan` გამომძახებლებს აქვთ; ყველა დანარჩენი (მათ შორის, საჯარო გვირაბით ხელახლა გამოყენებული
გაჟონილი API-გასაღები) მიიღებს `403`-ს მანამ, სანამ მოხდება ავტორიზაციის მონაცემების მოძიება ან
პროცესის გაშვება. `LOCAL_ONLY` დონის დანარჩენ ნაწილზე გამოყენებული იმავე პოლიტიკის სანახავად იხილეთ
`src/server/authz/policies/management.ts`.

## კონკურენტულობის შეზღუდვა მოდულის დონეზეა (ერთი ეგზემპლარის შეზღუდვა)

`CURSOR_IMG_MAX_CONCURRENT` აღსრულდება მეხსიერებაში არსებული მრიცხველის/რიგის მეშვეობით, რომლის მოქმედების არე
Node მოდულის ეგზემპლარითაა შეზღუდული (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`).
ის სწორად ზღუდავს `agent`-ის ერთდროულ გაშვებებს OmniRoute-ის ერთი პროცესის ფარგლებში, მაგრამ
**არ** ახდენს კოორდინაციას რამდენიმე პროცესს/ეგზემპლარს შორის, რომლებიც Cursor-ის ერთსა და იმავე ადგილს იზიარებენ
(მაგ., მრავალრეპლიკიანი განთავსება) — თითოეული ეგზემპლარი საკუთარ დამოუკიდებელ შეზღუდვას აღასრულებს.
ერთი ეგზემპლარის მქონე განთავსებისთვის (ნაგულისხმევი ვარიანტი) ეს ზუსტია; ჰორიზონტალურად მასშტაბირებულ
განთავსებებში `CURSOR_IMG_MAX_CONCURRENT` თითოეული ეგზემპლარისთვის კონსერვატიული უნდა იყოს, ან
Cursor-ის სურათების ტრაფიკი ერთ ეგზემპლარზე უნდა გადამისამართდეს.

## მოთხოვნები

1. დაფაში დაკავშირებული Cursor-ის ანგარიში (OAuth ან `crsr_…` API-გასაღები).
2. OmniRoute პროცესისთვის ხელმისაწვდომი Cursor Agent-ის ბინარული ფაილი:
   - env `CURSOR_AGENT_BIN=/path/to/agent`, ან
   - `~/.local/bin/agent`, ან
   - `providerSpecificData.agentBin` Cursor-ის კავშირზე.

არასავალდებულო გამართვა:

| Env                         | ნაგულისხმევი                | მნიშვნელობა                                  |
| --------------------------- | --------------------------- | -------------------------------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`                    | თითოეული სურათის შესრულების სრული დრო        |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                         | გაზიარებული ადგილის კონკურენტულობის შეზღუდვა |
| `CURSOR_IMG_MODEL`          | (მოთხოვნის მოდელი / `auto`) | CLI-ის `--model` პარამეტრის გადაფარვა        |

## მაგალითი

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

გენერაციას, ჩვეულებრივ, 1–2 წუთი სჭირდება. უპირატესობა მიანიჭეთ შიდა ქსელის გზას; დაახლოებით 100-წამიანი ტაიმაუტის მქონე edge პროქსი სერვერები შეცდომით დასრულდება.

## LiteLLM

დაარეგისტრირეთ სურათის მოდელი პარამეტრებით `mode: image_generation`, `api_base: http://omniroute:20128/v1` და `model: openai/cursor/auto` (ან უბრალოდ `cursor/auto`, თქვენი LiteLLM ვერსიის მიხედვით).
