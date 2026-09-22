# Router Backends & Embedded Services — architecture contract (ADR) (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **სტატუსი:** მიღებულია · **კონტექსტი:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **კონტრაქტი:** `domain/routing/routerBackends.ts`
> (ტიპიზებული რეესტრი — კოდი დაემატება [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)-თან ერთად)

ეს ADR ზუსტად განსაზღვრავს, როგორ უკავშირდება ერთმანეთს `ts` (ნატიური), `bifrost`, `cliproxy`, `9router` და
VibeProxy-თან თავსებადი ძრავები, რათა კონტრიბუტორებმა აღარ აურიონ ერთმანეთში
არქიტექტურულად განსხვავებული ორი რამ. იგი ამ მოდელისთვის ჭეშმარიტების ერთადერთ
წყაროდ აღწერს როუტერის ბეკენდების რეესტრის სამუშაოების ფარგლებში დანერგილ ტიპიზებულ
რეესტრს.

## ძირითადი განსხვავება — ორი ორთოგონალური ღერძი

ძრავის როლი აღიწერება **ორი დამოუკიდებელი ღერძით**, რომლებიც ერთად არის კოდირებული
რეესტრის `RouterBackendDefinition`-ში:

1. **სიცოცხლის ციკლი** (`RouterBackendLifecycle`) — _როგორ მუშაობს ძრავა_:
   - `in-process` — მუშაობს OmniRoute-ის Node პროცესში (ნატიური TS კონვეიერი).
   - `supervised` — ლოკალური შვილობილი პროცესი, რომელსაც OmniRoute აყენებს/უშვებს/აჩერებს/უმოწმებს მდგომარეობას
     `ServiceSupervisor`-ის მეშვეობით, შემდეგ კი იყენებს პროვაიდერის კავშირის სახით.
   - `external` — HTTP საბოლოო წერტილი, რომელზეც OmniRoute აგზავნის მოთხოვნებს, თუმცა მას **არ** მართავს
     (კონფიგურირდება გარემოს ცვლადში მითითებული საბაზისო URL-ით).
   - `disabled` — რეგისტრირებულია, მაგრამ მისი არჩევა შეუძლებელია.
2. **არჩევის ღერძი** (რელეს მარშრუტიზაციის ბეკენდი) — _აგზავნის თუ არა რელე მასზე მოთხოვნებს_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` ფაილში
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

თავიდან ასაცილებელი შეცდომა: „ჩაშენებული სერვისისა“ და „მარშრუტიზაციის ბეკენდის“ ერთ
სიად მიჩნევა. ისინი ერთი და იგივე არ არის. `supervised` ძრავა (9router/cliproxy) არის **პროვაიდერის
კავშირი, რომელსაც ნატიური კონვეიერი იყენებს** და არა რელეს მოთხოვნების გაგზავნის ალტერნატიული
ბეკენდი. `bifrost` საპირისპირო შემთხვევაა — რელეს მოთხოვნების გაგზავნის ბეკენდი, რომელიც (ისტორიულად)
მხოლოდ `external` იყო.

## რეესტრი — ჭეშმარიტების ერთადერთი წყარო

`domain/routing/routerBackends.ts` კონტრაქტი (კოდი დაემატება
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)-თან ერთად) თითოეულ ძრავას ერთხელ აცხადებს — მისი
სიცოცხლის ციკლით, შესაძლებლობებით, სერვისის იდენტობით, ნაგულისხმევი პორტით, მდგომარეობის შემოწმების კონფიგურაციითა და
ტელემეტრიის მხარდაჭერით. თითოეული თანმხლები პროცესისთვის ცალკეული ლოგიკის დაწერის ნაცვლად,
მომხმარებლები ძრავებს ეძებენ `getRouterBackend(id)`, `listRouterBackends()` და
`listRouterBackendsByCapability(cap)` ფუნქციების მეშვეობით.

| ბეკენდი     | სიცოცხლის ციკლი | სერვისი (ღერძი A) | რელეს ბეკენდი (ღერძი B)  | მდგომარეობის შემოწმება | ნაგულისხმევი პორტი |
| ----------- | --------------- | ----------------- | ------------------------ | ---------------------- | ------------------ |
| `ts`        | `in-process`    | —                 | `ts` (ნატიური)           | —                      | —                  |
| `bifrost`   | `external`¹     | —¹                | `bifrost` / `auto`       | `/health`              | —                  |
| `cliproxy`  | `supervised`    | `cliproxy`        | — (პროვაიდერი)           | `/v1/models`           | 8317               |
| `9router`   | `supervised`    | `9router`         | — (პროვაიდერი)           | `/api/health`          | 20130              |
| `vibeproxy` | `external`      | —                 | — (პროვაიდერის ადაპტერი) | `/v1/models`           | —                  |

¹ Bifrost-ის `supervised` ჩაშენებულ სერვისამდე დაწინაურება (რომლის დაყენება/გაშვება
შესაძლებელია `/api/services/bifrost/`-იდან) აღირიცხება
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817)-ში; მის გაერთიანებამდე
Bifrost მხოლოდ `external` იქნება (ხელმისაწვდომი მხოლოდ `BIFROST_BASE_URL`-ის მეშვეობით).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) გამომძახებელს საშუალებას აძლევს,
გაფილტროს ძრავები იმის მიხედვით, თუ რეალურად რისი გაკეთება შეუძლიათ მათ, ნაცვლად იმისა, რომ თითოეული იდენტიფიკატორისთვის
ცალკეული პირობითი განშტოებები დაწეროს.

## ღერძი A — ჩაშენებული სერვისები (ზედამხედველობის ქვეშ მყოფი პროცესის მხარე)

- **ზედამხედველობის ქვეშ მყოფი პროცესების რეესტრი:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (ამჟამად: `9router`, `cliproxy`).
- **სიცოცხლის ციკლის მმართველი:** `src/lib/services/ServiceSupervisor.ts` — `start()` ქმნის
  შვილობილ პროცესს, `waitForHealthy()`-ის მეშვეობით ელოდება მის მზადყოფნას და stdout/stderr-ს
  რგოლურ ბუფერში მიმართავს; `stop()` იყენებს SIGTERM→SIGKILL-ს; ყველაფერი ბლოკირების
  მეშვეობით სერიალიზდება.
- **მდგომარეობათა გაერთიანება** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, დამატებით კი
  ორთოგონალური `HealthState = healthy | unhealthy | unknown`.
- **რატომ ცალკე პროცესი (და არა შიდა პროცესული SDK)?** პროცესების იზოლაცია შესაძლებელს ხდის,
  რომ თითოეული sidecar-ის ინსტალაცია/გაშვება/შეჩერება/მდგომარეობა/ჟურნალები დამოუკიდებლად
  იმართებოდეს და loopback-ის პროცესის შექმნის დამცავი მექანიზმი მოქმედებდეს. შიდა პროცესული
  ადაპტერის მოდელირება სამომავლო სამუშაოა — ამის გამოსახატავად გამოიყენება
  `native-hot-path` შესაძლებლობის ალამი.

### სიცოცხლის ციკლის მარშრუტის კონტრაქტი (`/api/services/<tool>/…`)

სტატუსის კოდები **განზრახ არის დამოკიდებული მდგომარეობაზე/ქმედებაზე/ბილიკზე** — ეს არის
კონტრაქტი და არა არათანმიმდევრულობა:

| გამოძახება                       | პირობა                                          | სტატუსი                              |
| -------------------------------- | ----------------------------------------------- | ------------------------------------ |
| `POST .../start`                 | სერვისი `not_installed`                         | **409** (წინაპირობა)                 |
| `POST .../stop`                  | უკვე შეჩერებულია                                | **200** (იდემპოტენტური უმოქმედობა)   |
| `GET .../status`                 | გამართულია                                      | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`                 | პროცესის შექმნის შეცდომა                        | **503** (დროებითი)                   |
| `GET .../status`, `.../stop`     | დაუმუშავებელი შეცდომა                           | **500**                              |
| `GET /api/services/<x>/logs`     | უცნობი ხელსაწყო `<x>`                           | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`      | აკლია `X-Reveal-Confirm: yes`                   | **403** (მხოლოდ 9router)             |
| **ნებისმიერი** `/api/services/*` | გამომძახებელი არ არის loopback/private-LAN-იდან | **403 LOCAL_ONLY**                   |

ყველა შეცდომის სხეული ფორმირდება `createErrorResponse()`-ის მეშვეობით →
`{ error: { message, type }, requestId }`, სადაც `type` გამომდინარეობს სტატუსიდან
(`500→server_error`, `404→not_found`, `409→conflict`, სხვა შემთხვევაში `invalid_request`) და
მანქანურად დამუშავებადი განმასხვავებელია. შეტყობინებები წინასწარ სანიტიზებულია
(`sanitizeErrorMessage()`, მკაცრი წესი #12).

**Loopback-ის დამცავი მექანიზმი** `403`-ის ყველაზე გავრცელებული წყაროა: `/api/services/`
შედის `LOCAL_ONLY_API_PREFIXES`-ში (`src/server/authz/routeGuard.ts`), ხოლო
`src/server/authz/policies/management.ts` ავთენტიფიკაციამდე უარყოფს ყველა გამომძახებელს,
რომელიც არ არის loopback-იდან / private-LAN-იდან, რადგან ეს მარშრუტები შვილობილ პროცესებს
ქმნის (მკაცრი წესები 15 და 17). საჯარო გვირაბის მეშვეობით მათზე წვდომა განზრახ აბრუნებს
`403`-ს.

## ღერძი B — გადაცემის მარშრუტიზაციის ბეკენდი (დისპეტჩერიზაციის მხარე)

მხოლოდ გადაცემის პროქსის ბილიკი `/api/v1/relay/chat/completions` ირჩევს დისპეტჩერიზაციის
ბეკენდს; ძირითადი `/api/v1/chat/completions` ზედაპირი არასდროს მიმართავს
`routingBackend.ts`-ს.

- **არჩევა** (`resolveRelayRoutingBackend`): ერთი გლობალური გარემოს გადამრთველი —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  თუ მითითებული არ არის, გამოიყენება `auto`, როდესაც Bifrost კონფიგურირებული და
  ჩართულია, სხვა შემთხვევაში კი `ts`.
- **ქცევა:**
  - `bifrost` (იძულებითი): Bifrost-ის შეცდომა → მკაცრი `502`, სარეზერვო ვარიანტის გარეშე.
  - `auto`: სცდის Bifrost-ს, ხოლო შეცდომის/შეყოვნების შემდეგ უხმოდ გადადის ნატიურ
    ვარიანტზე.
  - `ts` / სარეზერვო ვარიანტზე გადასვლის შემდეგ: ნატიური `open-sse`
    ტრანსლატორის/შემსრულებლის კონვეიერი.
- **შეყოვნება:** თითოეული `baseUrl`-ისთვის შეცდომის შემდგომი შეყოვნება
  `bifrostCooldown.ts`-ში.

დღეს არჩევა გადაცემის დონეზე **„ყველაფერი ან არაფერი“ პრინციპითაა** — `release/v3.8.43`-ში
ძრავის ჩანაცვლება არც თითოეული პროვაიდერისთვის და არც თითოეული მოთხოვნისთვის არ არსებობს.
თითოეული მოთხოვნისთვის განკუთვნილ შემზღუდველ მექანიზმს sidecar-მანიფესტზე მიმდინარე სამუშაო
ამატებს
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) მანიფესტი +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
რაც `auto`-ს საშუალებას აძლევს, Bifrost-ის მეშვეობით მხოლოდ მანიფესტის კრიტერიუმების
დამაკმაყოფილებელი პროვაიდერები მიმართოს.

## დაფასთან ინტეგრაცია

სერვისების დაფა ყოველ 5 წამში აგზავნის მოთხოვნას `GET /api/services/<tool>/status` მისამართზე
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`-ის მეშვეობით,
რომელიც აბრუნებს `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. ხელმისაწვდომობის საერთო კონტექსტის პროვაიდერი არ არსებობს —
თითოეული კომპონენტი თითოეული ხელსაწყოსთვის ცალ-ცალკე იძახებს ჰუკს. `!res.ok`-ის შემთხვევაში ჰუკი ამჟამად
აჩვენებს მხოლოდ `HTTP <status>`-ს; `error.type` ველის ადამიანისთვის გასაგებ განმარტებასთან
შესაბამისობაში მოყვანა დაგეგმილი UX გაუმჯობესებაა და არა კონტრაქტის ცვლილება.

## შედეგები

- ახალი ძრავები ერთხელ რეგისტრირდება `ROUTER_BACKENDS`-ში; მომხმარებელი კომპონენტები მათ
  შესაძლებლობების მოთხოვნების მეშვეობით იღებენ, თითოეული ახალი id-ისთვის ცალკე განშტოებების დამატების გარეშე.
- კითხვას „ეს სერვისია თუ მარშრუტიზაციის ბეკენდი?“ პასუხობს `lifecycle` ველი და არა ის,
  თუ რომელ სიაში აღმოჩნდება ესა თუ ის id.
- Bifrost-ის ზედამხედველობა (#5817) და ნატიურ ცხელ გზაზე მიგრაცია (#5670) თითოეული
  sidecar-ისთვის სპეციალური შემთხვევების შექმნის ნაცვლად ამ საერთო კონტრაქტს ეფუძნება.
