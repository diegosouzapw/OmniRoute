# Evaluations (Evals) (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **ჭეშმარიტების წყარო:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **ბოლო განახლება:** 2026-06-28 — v3.8.40

OmniRoute მოიცავს ზოგად შეფასების ფრეიმვორკს, რომლის გამოყენებაც შეგიძლიათ მარშრუტიზაციის კონფიგურაციების, ცალკეული პროვაიდერების/მოდელების ან პაკეტში შემავალი „ოქროს ნაკრების“ ტესტების კომპლექტების შესადარებლად.
გამოიყენეთ იგი მარშრუტიზაციის ცვლილებების შესამოწმებლად, ახალი პროვაიდერების ვალიდაციისთვის და რელიზების გასაკონტროლებლად, სანამ მათ საწარმოო ტრაფიკში გადაიტანთ.

ფრეიმვორკი რეალიზებულია შემდეგი სახით:

- სუფთა გამშვები (`src/lib/evals/evalRunner.ts`), რომელიც მეხსიერებაში ჩაშენებულ ტესტების კომპლექტებს არეგისტრირებს, შედეგებს მოსალოდნელი კრიტერიუმების მიხედვით აფასებს და შეფასების ბარათებს აერთიანებს.
- მდგრადობის ფენა (`src/lib/db/evals.ts`) მორგებული (მომხმარებლის მიერ განსაზღვრული) ტესტების კომპლექტებისა და ისტორიული გაშვებების SQLite-ში შესანახად.
- ორკესტრაციის ფენა (`src/lib/evals/runtime.ts`), რომელიც თითოეულ შემთხვევას `POST /v1/chat/completions`-ზე რეალური მოთხოვნების გაგზავნით ასრულებს, დაყოვნებასა და შედეგებს აღრიცხავს და გაშვებას ინახავს.
- REST საბოლოო წერტილები `/api/evals/*`-ის ქვეშ (მხოლოდ მართვის ავტორიზაციით).
- საინფორმაციო დაფის ინტერფეისი მისამართზე `Dashboard → Usage → Evals` (`EvalsTab.tsx`).

## ცნებები

### ტესტების კომპლექტი

ტესტების კომპლექტი არის ტესტური შემთხვევების სახელდებული კოლექცია, რომელსაც აქვს `description` და ერთი ან რამდენიმე შემთხვევა. ტესტების კომპლექტები ორი წყაროდან მიიღება:

| წყარო      | სად არის განსაზღვრული                                    | შესაძლებელია შესრულების დროს შეცვლა? |
| ---------- | -------------------------------------------------------- | ------------------------------------ |
| `built-in` | ჩატვირთვისას რეგისტრირდება `registerSuite()`-ით          | არა (განსაზღვრულია კოდში)            |
| `custom`   | ინახება SQLite-ის `eval_suites` + `eval_cases` ცხრილებში | დიახ (API/UI-ის მეშვეობით)           |

ამჟამინდელი ჩაშენებული ტესტების კომპლექტები (იხილეთ `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 საბაზისო შემთხვევა მისალმების/მათემატიკის/თარგმანის/უსაფრთხოების მიმართულებებში
- `coding-proficiency` — Python/JS/SQL/TS/შეცდომების აღმოჩენა
- `reasoning-logic` — სილოგიზმები, ტექსტური ამოცანები, კანონზომიერებების ამოცნობა
- `multilingual` — თარგმანი და ენის ამოცნობა
- `safety-guardrails` — PII, jailbreak, უარის თქმა, მიკერძოების გაცნობიერება
- `instruction-following` — მხოლოდ JSON, დანომრილი სიები, ენობრივი შეზღუდვები
- `codex-comparison` — პირდაპირი შედარების პროგრამირების ამოცანები, რომლებიც შედარების რეჟიმისთვისაა განკუთვნილი

### შემთხვევა

თითოეული შემთხვევა შეიცავს:

| ველი       | აღწერა                                                                    |
| ---------- | ------------------------------------------------------------------------- |
| `id`       | სტაბილური იდენტიფიკატორი (გამოიყენება შედეგებისა და მეტრიკების გასაღებად) |
| `name`     | ადამიანისთვის გასაგები ეტიკეტი                                            |
| `model`    | ნაგულისხმევი მოდელი, როდესაც გაშვება `suite-default` სამიზნეს იყენებს     |
| `input`    | `{ messages, max_tokens? }` — იგზავნება `/v1/chat/completions`-ზე         |
| `expected` | `{ strategy, value }` — შეფასების რუბრიკა (იხილეთ ქვემოთ)                 |
| `tags`     | არასავალდებულო ეტიკეტები (მაგ., `safety`, `pii`, `jailbreak`)             |

### სამიზნე

ერთი და იგივე ტესტების კომპლექტი შეიძლება სხვადასხვა სამიზნეზე გაეშვას. სამიზნის სქემაა
`evalTargetSchema` ფაილში `src/shared/validation/schemas.ts`:

| სამიზნის ტიპი   | `id`           | ქცევა                                                                |
| --------------- | -------------- | -------------------------------------------------------------------- |
| `suite-default` | `null`         | თითოეული შემთხვევა იყენებს საკუთარ ჩაშენებულ `model` ველს            |
| `model`         | მოდელის სახელი | ყველა შემთხვევა იძულებით გადის ერთ პირდაპირ მოდელზე (მაგ., `gpt-4o`) |
| `combo`         | კომბოს სახელი  | ყველა შემთხვევა გადის ერთ კომბოზე (ამუშავებს მარშრუტიზაციის ძრავას)  |

`model`-ისა და `combo`-სთვის `id` ველი სავალდებულოა (უზრუნველყოფილია Zod-ის
`superRefine`-ით). როდესაც მითითებულია `compareTarget`, ორივე სამიზნე განსხვავებული უნდა იყოს —
გამშვები ორივე გაშვებას ერთი და იმავე `runGroupId`-ის ქვეშ ინახავს A/B შედარებისთვის.

## შეფასების კრიტერიუმები

რეალიზებულია `evaluateCase()`-ში (evalRunner.ts):

| სტრატეგია  | წარმატებულად ითვლება, როცა…                                                              |
| ---------- | ---------------------------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                                        |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`                      |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` ჭეშმარიტ მნიშვნელობას აბრუნებს           |
| `custom`   | `expected.fn(actualOutput, evalCase)` ჭეშმარიტ მნიშვნელობას აბრუნებს (მხოლოდ ჩაშენებული) |

**შენიშვნა:** მორგებული ფუნქციით შეფასება განკუთვნილია კოდში განსაზღვრული (ჩაშენებული)
კომპლექტებისთვის, რადგან ფუნქციების API-ის მეშვეობით სერიალიზება შეუძლებელია.
`evalCaseBuilderSchema` მომხმარებლის მიერ შექმნილი კომპლექტებისთვის მხოლოდ
`contains | exact | regex`-ს იღებს.

ამჟამად არ არსებობს LLM-ის, როგორც მსაჯულის, ან embedding-ზე დაფუძნებული მსგავსების შემფასებელი — ეს
`evaluateCase()`-ში გაფართოების მკაფიო წერტილი იქნებოდა.

## მონაცემთა ბაზის სქემა

სამი ცხრილი (მიგრაციები `030_create_eval_runs.sql` და
`031_create_eval_suites.sql`):

| ცხრილი        | დანიშნულება                                                                                                                      |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | მორგებული კომპლექტის მეტამონაცემები (`id`, `name`, `description`)                                                                |
| `eval_cases`  | შემთხვევები კომპლექტის მიხედვით — `input_json`, `expected_*`, `tags_json`                                                        |
| `eval_runs`   | ისტორიული გაშვებები — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

ჩაშენებული კომპლექტები DB-ში **არ** ინახება. ისინი მეხსიერებაშია განთავსებული და
ყოველ ჯერზე ხელახლა რეგისტრირდება, როცა `evalRunner.ts` იმპორტირდება.

## REST API

ყველა endpoint საჭიროებს მართვის ავტორიზაციას (`requireManagementAuth`) — ისინი
საჯარო proxy-ის ზედაპირის ნაწილი არ არის.

| Endpoint                      | მეთოდი   | აღწერა                                                                             |
| ----------------------------- | -------- | ---------------------------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | კომპლექტების + ბოლო გაშვებების + შეფასების ბარათის + სამიზნეების + გასაღებების სია |
| `/api/evals`                  | `POST`   | კომპლექტის გაშვება (ცალკე ან შედარებით) — სქემა `evalRunSuiteSchema`               |
| `/api/evals/{suiteId}`        | `GET`    | ერთი კომპლექტის მიღება (ჩაშენებული ან მორგებული)                                   |
| `/api/evals/suites`           | `POST`   | მორგებული კომპლექტის შექმნა — სქემა `evalSuiteSaveSchema`                          |
| `/api/evals/suites/{suiteId}` | `GET`    | მორგებული კომპლექტის მიღება                                                        |
| `/api/evals/suites/{suiteId}` | `PUT`    | მორგებული კომპლექტის ჩანაცვლება (შემთხვევები ხელახლა ჩაისმება)                     |
| `/api/evals/suites/{suiteId}` | `DELETE` | მორგებული კომპლექტისა და მისი შემთხვევების წაშლა                                   |

### კომპლექტის გაშვება

```bash
curl -X POST http://localhost:20128/api/evals \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "suiteId": "golden-set",
    "target": { "type": "combo", "id": "my-combo" },
    "apiKeyId": "optional-api-key-uuid"
  }'
```

არასავალდებულო ველები:

- `outputs` — წინასწარ გამოთვლილი შედეგების `Record<caseId, string>`. მისი მითითებისას
  გამშვები **გამოტოვებს გაგზავნას** და მხოლოდ ქეშირებულ შედეგებს აფასებს (სასარგებლოა
  ოფლაინ შეფასებისთვის).
- `compareTarget` — მეორე სამიზნე პარალელურად გასაშვებად; ორივე გაშვება იყენებს
  გენერირებულ `runGroupId`-ს პირდაპირი შედარების სანახავად.
- `apiKeyId` — შიდა API გასაღები, რომელიც გამოიყენება გაგზავნილი
  `/v1/chat/completions` გამოძახებების ავთენტიფიკაციისთვის. სავალდებულოა, როცა `REQUIRE_API_KEY` ჩართულია.

### მორგებული კომპლექტის შექმნა

```bash
curl -X POST http://localhost:20128/api/evals/suites \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "საწარმოო სწრაფი ტესტი",
    "description": "სწრაფი საბაზისო შემოწმება განთავსებამდე",
    "cases": [
      {
        "name": "JSON-ის სტრუქტურა",
        "model": "gpt-4o",
        "input": { "messages": [{ "role": "user", "content": "უპასუხე შემდეგით: {\"ok\": true}" }] },
        "expected": { "strategy": "regex", "value": "\"ok\"\\s*:\\s*true" }
      }
    ]
  }'
```

## გაგზავნის კონვეიერი

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. ამოიცნობს კომპლექტს (ჩაშენებულს ან მორგებულს).
2. თითოეული შემთხვევისთვის ქმნის `Request`-ს `/v1/chat/completions` მისამართზე, შემთხვევის
   `messages`-ით, ამოცნობილი `model`-ით, `stream: false`-ითა და `max_tokens: 512`-ით
   (ან შემთხვევისთვის განსაზღვრული მნიშვნელობით).
3. პირდაპირ იძახებს ჩატის დამმუშავებელს (იმავე პროცესში — დამატებითი HTTP გადასვლის გარეშე).
4. აღრიცხავს დაყოვნებას და ტექსტს იღებს ან `choices[0].message.content`-იდან,
   ან Responses-API-ის `output[]` მონაცემებიდან.
5. ყველა შედეგს აფასებს `runSuite()`-ის მეშვეობით, შემდეგ კი ინახავს `saveEvalRun()`-ით.

შემთხვევები სრულდება **თანმიმდევრულად**. ამჟამად პარალელურობის ალამი არ არსებობს.

## მართვის პანელი

ინტერფეისი მდებარეობს `Dashboard → Usage → Evals`-ში
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). იქიდან შეგიძლიათ:

- დაათვალიეროთ ჩაშენებული და მორგებული კომპლექტები თითოეული შემთხვევის წინასწარი ხედით.
- შექმნათ/ჩაასწოროთ/წაშალოთ მორგებული კომპლექტები შემთხვევების კონსტრუქტორის გამოყენებით.
- აირჩიოთ სამიზნე (კომპლექტის ნაგულისხმევი პარამეტრები / მოდელი / კომბინაცია), სურვილისამებრ მეორე
  `compareTarget` და API გასაღები, შემდეგ კი მოთხოვნისამებრ გაუშვათ.
- შეამოწმოთ გაშვებების ისტორია, თითოეული შემთხვევის წარმატება/წარუმატებლობა, დაყოვნება და აღრიცხული შედეგები.
- იხილოთ ცვალებადი შეფასების დაფა, რომელიც აგრეგირებულია თითოეული
  `(suite, target)` არეალის უახლესი გაშვების მიხედვით.

## კავშირი ავტომატური შეფასების RFC-სთან

ცალკე, უფრო ვიწრო შეფასების ქვესისტემა მდებარეობს `src/domain/assessment/`-ში
(რეალურ დროში მოქმედი შეფასების ძრავისთვის აგრეთვე იხილეთ [AUTO-COMBO.md](../routing/AUTO-COMBO.md)).
ეს ქვესისტემა განკუთვნილია Auto Combo ძრავისთვის — ის ავტომატურად აფასებს პროვაიდერებსა და
მოდელებს, რათა კომბინაციებმა შეძლონ თვითაღდგენა ზედა დონის სერვისების მწყობრიდან გამოსვლისას. ის იყენებს საკუთარ გამშვებს,
საკუთარ კატეგორიზატორსა და შეფასების საკუთარ ლოგიკას.

აქ დოკუმენტირებული Evals ჩარჩო არის **უფრო ფართო, ზოგადი დანიშნულების
ტესტირების გარემო**. უპირატესობა მიანიჭეთ მას ნებისმიერი რეგრესიული კომპლექტისთვის, A/B შედარებებისთვის
და თითოეული გამოშვების სწრაფი საბაზისო ტესტებისთვის. გამოიყენეთ Auto-Assessment ქვესისტემა, როდესაც
მარშრუტიზაციის გადაწყვეტილებებზე გავლენის მოსახდენად რეალურ დროში პროვაიდერის მდგომარეობა გჭირდებათ.

## CI ინტეგრაცია

ამჟამად გამოყოფილი `eval:ci` npm სკრიპტი არ არსებობს. თუ გსურთ გამოშვებები
შეფასების შედეგებით შეზღუდოთ, არსებობს ორი გზა:

- **HTTP გზა**: გაუშვით სერვერი, გაგზავნეთ მოთხოვნა `POST /api/evals`-ზე ცნობილი
  `suiteId` + `target`-ით და პასუხში შეამოწმეთ, რომ `runs[].summary.passRate >= N`.
- **იმავე პროცესში შესრულების გზა**: სკრიპტიდან შემოიტანეთ `runEvalSuiteAgainstTarget()`
  `@/lib/evals/runtime`-იდან, გაუშვით სატესტო DB-ზე და შეამოწმეთ დაბრუნებული
  `PersistedEvalRun.summary`.

მარშრუტისა და ისტორიის დამფარავი ტესტები მდებარეობს
`tests/unit/evals-route.test.ts`-სა და `tests/unit/evals-history.test.ts`-ში.

## გაფართოების წერტილები

გავრცელებული ცვლილებები და მათი განხორციელების ადგილები:

- **შეფასების ახალი სტრატეგია** — გააფართოეთ `switch (evalCase.expected.strategy)`
  ბლოკი `evaluateCase()`-ში (`evalRunner.ts`) და გააფართოეთ `EvalCaseStrategy`
  `src/lib/db/evals.ts`-ში, ასევე `evalCaseBuilderSchema` — `schemas.ts`-ში.
- **ახალი ჩაშენებული კომპლექტი** — განსაზღვრეთ კომპლექტის ობიექტი და გამოიძახეთ `registerSuite()`
  `evalRunner.ts`-ის ბოლოში. მას `listSuites()` ავტომატურად აღმოაჩენს.
- **პარალელურად გაშვება** — `runEvalSuiteAgainstTarget()`-ში არსებული თანმიმდევრული `for` ციკლი
  შეცვალეთ შეზღუდული `Promise.all`-ით (ამჟამად პარალელურობის კონტროლი
  არ არსებობს).
- **ნაკადური/ხელსაწყოს გამოძახების შემთხვევები** — ამჟამად გამშვები იძულებით იყენებს `stream: false`-ს.
  ნაკადური ან ხელსაწყოების გათვალისწინებით შეფასება მოითხოვს ცვლილებებს `runtime.ts`-ში
  (შეფასებამდე SSE ფრაგმენტების აღრიცხვა და აგრეგირება).

## აგრეთვე იხილეთ

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — პროდუქტის ზოგადი მიმოხილვა
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — მოთხოვნის დამუშავების კონვეიერის ცნობარი
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — Auto Combo-ს შეფასების ძრავა (მუშა გარემოში)
- წყარო: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- UI: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
