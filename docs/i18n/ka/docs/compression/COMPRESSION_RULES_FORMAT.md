# Compression Rules Format (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_RULES_FORMAT.md)

---

შეკუმშვის წესები არის JSON ფაილები, რომლებიც შესრულების დროს იტვირთება. ისინი განზრახ შეიცავს მხოლოდ მონაცემებს, რათა ახალი
ენობრივი პაკეტებისა და RTK ბრძანებების ფილტრების მიმოხილვა ძრავის კოდის შეცვლის გარეშე იყოს შესაძლებელი.

> **კანონიკური სქემა (ჭეშმარიტების პირველწყარო):** [`open-sse/services/compression/rules/_schema.json`](../../open-sse/services/compression/rules/_schema.json) (JSON Schema draft 2020-12).
> ქვემოთ მოცემული მაგალითები საილუსტრაციოა — ეჭვის შემთხვევაში, შეამოწმეთ თქვენი პაკეტი `_schema.json`-ის მიხედვით.

## Caveman წესების პაკეტები

Caveman წესების პაკეტები განთავსებულია შემდეგ მისამართზე:

```txt
open-sse/services/compression/rules/<language>/<pack>.json
```

თითოეული პაკეტი შეიცავს ჩანაცვლებებს, რომლებიც დაცული რეგიონების იზოლირების შემდეგ ჩვეულებრივ პროზაზე ვრცელდება.

```json
{
  "language": "en",
  "category": "filler",
  "rules": [
    {
      "name": "question_to_directive",
      "pattern": "\\b(?:Can you explain why|Could you show me how)\\b\\s*",
      "replacement": "Explain why ",
      "replacementMap": {
        "can you explain why": "Explain why ",
        "could you show me how": "Show how "
      },
      "flags": "gi",
      "context": "all",
      "category": "context",
      "minIntensity": "lite",
      "description": "Convert verbose questions into direct requests."
    }
  ]
}
```

### Caveman ველები

| ველი                     | სავალდებულო | აღწერა                                                                                              |
| ------------------------ | ----------- | --------------------------------------------------------------------------------------------------- |
| `language`               | დიახ        | BCP-47-ის მსგავსი ენის გასაღები, როგორიცაა `en`, `pt-BR`, `es`                                      |
| `category`               | დიახ        | პაკეტის კატეგორიის ფაილის სახელი/კატეგორია, მაგალითად `filler` ან `dedup`                           |
| `rules`                  | დიახ        | რეგულარული გამოსახულებების ჩანაცვლების წესების მასივი                                               |
| `rules[].name`           | დიახ        | წესის სტაბილური სახელი                                                                              |
| `rules[].pattern`        | დიახ        | JavaScript-ის რეგულარული გამოსახულების საწყისი ტექსტი                                               |
| `rules[].flags`          | არა         | JavaScript-ის რეგულარული გამოსახულების ალმები; ნაგულისხმევია `gi`                                   |
| `rules[].replacement`    | არა         | ჩანაცვლების სტრიქონი ან სარეზერვო მნიშვნელობა, როცა `replacementMap`-ში შესაბამისობა ვერ მოიძებნება |
| `rules[].replacementMap` | არა         | შესაბამისობაზე დამოკიდებული ჩანაცვლებები, რომელთა გასაღებებია ნორმალიზებული დამთხვეული ტექსტი       |
| `rules[].context`        | არა         | `all`, `user`, `assistant` ან `system`; ნაგულისხმევია `all`                                         |
| `rules[].category`       | არა         | `filler`, `context`, `structural`, `dedup`, `terse` ან `ultra`                                      |
| `rules[].minIntensity`   | არა         | `lite`, `full` ან `ultra`; ნაგულისხმევია `lite`                                                     |
| `rules[].description`    | არა         | ადამიანისთვის გასაგები წესის შეჯამება                                                               |

გამოიყენეთ `flags`, როდესაც რეგისტრისადმი მგრძნობიარე დამთხვევა მნიშვნელოვანია, მაგალითად, მცირე ასოთი დაწერილი პროზის წინ არტიკლის მოსაშორებლად ისე,
რომ `the OpenAI API` არ წაიშალოს. გამოიყენეთ `replacementMap`, როდესაც ერთ რეგულარულ გამოსახულებას რამდენიმე ალტერნატივა აქვს,
რომლებსაც განსხვავებული შედეგები სჭირდება; ეს საშუალებას აძლევს JSON წესების პაკეტებს, მხოლოდ მონაცემები შეიცავდეს და ამავე დროს შეინარჩუნოს
უფრო ფუნქციურად მდიდარი ჩაშენებული TypeScript ჩანაცვლების ფუნქციების ქცევა.

## RTK ფილტრების პაკეტები

RTK ფილტრები განთავსებულია შემდეგ მისამართზე:

```txt
open-sse/services/compression/engines/rtk/filters/<filter>.json
```

თითოეული ფილტრი აღწერს, როგორ უნდა მოხდეს ბრძანების გამომავალი მონაცემების ოჯახის ამოცნობა და შეკუმშვა.

```json
{
  "id": "test-vitest",
  "label": "Vitest output",
  "category": "test",
  "priority": 92,
  "match": {
    "outputTypes": ["test-vitest"],
    "commands": ["vitest", "npm test", "npm run test"],
    "patterns": ["\\bFAIL\\b", "\\bPASS\\b", "\\bTest Files\\b"]
  },
  "rules": {
    "stripAnsi": true,
    "replace": [{ "pattern": "\\s+\\[[0-9]+ms\\]", "replacement": "" }],
    "matchOutput": [
      {
        "pattern": "All tests passed",
        "message": "vitest: ok",
        "unless": "FAIL|Error:"
      }
    ],
    "includePatterns": ["FAIL", "Error:", "Test Files", "Tests"],
    "dropPatterns": ["^\\s*$", "Duration\\s+\\d+"],
    "collapsePatterns": ["^\\s+at "],
    "deduplicate": true,
    "truncateLineAt": 240,
    "maxLines": 160,
    "headLines": 24,
    "tailLines": 40,
    "onEmpty": "vitest: ok",
    "filterStderr": false
  },
  "preserve": {
    "errorPatterns": ["FAIL", "Error:", "AssertionError"],
    "summaryPatterns": ["Test Files", "Tests", "Snapshots"]
  },
  "tests": [
    {
      "name": "keeps failing tests",
      "command": "vitest",
      "input": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed",
      "expected": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed"
    }
  ]
}
```

### RTK ველები

| ველი                       | სავალდებულო | აღწერა                                                                                    |
| -------------------------- | ----------- | ----------------------------------------------------------------------------------------- |
| `id`                       | დიახ        | ფილტრის სტაბილური id                                                                      |
| `label`                    | დიახ        | მართვის პანელზე გამოსატანი სახელი                                                         |
| `category`                 | დიახ        | ფილტრის ოჯახი: git, test, build, shell, docker, package, infra, cloud, generic            |
| `priority`                 | არა         | რამდენიმე ფილტრის დამთხვევისას იმარჯვებს უფრო მაღალი პრიორიტეტის მქონე ფილტრი             |
| `match.outputTypes`        | არა         | დეტექტორის გამომავალი id-ები, რომლებიც ამ ფილტრს ირჩევენ                                  |
| `match.commands`           | არა         | ბრძანების ტოკენები, რომლებიც ამ ფილტრს ირჩევენ                                            |
| `match.patterns`           | არა         | რეგულარული გამოსახულებები, რომლებიც ამ ფილტრს გამომავალი ტექსტიდან ირჩევენ                |
| `rules.stripAnsi`          | არა         | რეგულარული გამოსახულებების ეტაპებამდე ANSI escape-თანმიმდევრობების წაშლა                  |
| `rules.replace`            | არა         | დალაგებული რეგულარული გამოსახულებების ჩანაცვლებები, რომლებიც სტრიქონ-სტრიქონ გამოიყენება  |
| `rules.matchOutput`        | არა         | გამომავალი მონაცემების მოკლე ჩართვის წესები არასავალდებულო `unless` პირობით               |
| `rules.includePatterns`    | არა         | სტრიქონები, რომელთა შენარჩუნებაც სასურველია                                               |
| `rules.dropPatterns`       | არა         | სტრიქონები, რომლებიც ხმაურის სახით უნდა წაიშალოს                                          |
| `rules.collapsePatterns`   | არა         | განმეორებადი დამთხვევის მქონე სტრიქონები, რომელთა შეკვეცაც შესაძლებელია                   |
| `rules.deduplicate`        | არა         | დუბლირებული ნორმალიზებული სტრიქონების შეკვეცა                                             |
| `rules.truncateLineAt`     | არა         | Unicode-თან თავსებადი სიმბოლოების ლიმიტი თითოეულ სტრიქონზე                                |
| `rules.maxLines`           | არა         | ბოლოში არსებული სტრიქონების შენარჩუნებამდე დასატოვებელი სტრიქონების მაქსიმალური რაოდენობა |
| `rules.headLines`          | არა         | შეკვეცისას დასატოვებელი საწყისი სტრიქონები                                                |
| `rules.tailLines`          | არა         | უახლესი კონტექსტისთვის დასატოვებელი ბოლო სტრიქონები                                       |
| `rules.onEmpty`            | არა         | სარეზერვო შეტყობინება, როდესაც გაფილტვრის შედეგად მთელი შიგთავსი იშლება                   |
| `rules.filterStderr`       | არა         | შემდგომი გაფილტვრის ეტაპებამდე გავრცელებული stderr პრეფიქსების ნორმალიზება                |
| `preserve.errorPatterns`   | არა         | შეცდომის სტრიქონები, რომლებიც შეკვეცის შემდეგაც უნდა შენარჩუნდეს                          |
| `preserve.summaryPatterns` | არა         | შემაჯამებელი სტრიქონები, რომლებიც შეკვეცის შემდეგაც უნდა შენარჩუნდეს                      |
| `tests[]`                  | არა         | RTK-ის შემოწმების კარიბჭის მიერ გამოყენებული ჩაშენებული ვერიფიკაციის ნიმუშები             |

RTK დეკლარაციულ ეტაპებს ამ თანმიმდევრობით იყენებს: `stripAnsi`, `filterStderr`, `replace`,
`matchOutput`, `dropPatterns`/`includePatterns`, `truncateLineAt`, `headLines`/`tailLines`,
`maxLines` და `onEmpty`.

მორგებული ფილტრების ჩატვირთვა შესაძლებელია შემდეგი წყაროებიდან:

1. პროექტის `.rtk/filters.json` ფაილები — მხოლოდ მას შემდეგ, რაც შესაბამისი `.rtk/trust.json` ჰეში იარსებებს ან
   `trustProjectFilters` ჩართული იქნება.
2. გლობალური `DATA_DIR/rtk/filters.json`.
3. ჩაშენებული ფილტრები.

პროექტის/გლობალური მორგებული ფაილები შეიძლება შეიცავდეს ერთ ფილტრის ობიექტს ან ფილტრის ობიექტების მასივს. არასწორი
მორგებული ფილტრები დიაგნოსტიკური შეტყობინებებით გამოტოვებული იქნება; არასწორი ჩაშენებული ფილტრების შემთხვევაში ვალიდაცია წარუმატებლად დასრულდება.

პროექტის ნდობის ფაილი:

```json
{
  "filtersSha256": "0123456789abcdef..."
}
```

გარემოს გადაფარვა `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` პროექტის ფილტრებს ჰეშის გარეშე ენდობა და მისი გამოყენება
მხოლოდ კონტროლირებადი ლოკალური შემუშავებით უნდა შემოიფარგლოს.

## უსაფრთხოების წესები

- წესები იდემპოტენტური უნდა იყოს: ერთი და იმავე ფილტრის ორჯერ გაშვებამ შედეგი არ უნდა დააზიანოს.
- შეძლებისდაგვარად შეინარჩუნეთ შეცდომის ზუსტი ტექსტი, ფაილის ბილიკები, სტრიქონების ნომრები და ბრძანებების შეჯამებები.
- მოერიდეთ წესებს, რომლებიც ცვლიან კოდის ბლოკებს, JSON მონაცემებს, URL-ებს ან საიდუმლო მონაცემებს.
- დეტექტორის/ფილტრის ტესტებში დაამატეთ ერთეულოვანი ტესტები ბრძანებების ახალი ოჯახებისთვის.
- ყველა ჩაშენებულ ფილტრსა და გაზიარებულ მორგებულ ფილტრს დაამატეთ `tests[]` ნიმუშები.

## ვალიდაცია

წესების პაკეტები გამოყენებამდე მოწმდება. ჩაშენებული Caveman-ის პაკეტებისა და ჩაშენებული RTK ფილტრების ვალიდაცია შეცდომის აღმოჩენისთანავე წყდება, რათა დაზიანებული გამოშვების რესურსები გავრცელებამდე გამოვლინდეს. მორგებული RTK ფილტრები გამოტოვებულია დიაგნოსტიკური შეტყობინებებით, როდესაც დამუშავება ან სანდოობის შემოწმება ვერ სრულდება.

მიზნობრივი ვალიდაცია:

```bash
node --import tsx/esm --test tests/unit/compression/rule-loader.test.ts tests/unit/compression/language-packs.test.ts
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts tests/unit/compression/rtk-dsl-pipeline.test.ts
```
