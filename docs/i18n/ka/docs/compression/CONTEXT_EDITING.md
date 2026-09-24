# Delegated Context Editing (Anthropic) (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇧🇦 [bs](../../../bs/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇰🇷 [ko](../../../ko/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

დელეგირებული **კონტექსტის რედაქტირება** მხოლოდ Claude-ისთვის განკუთვნილი კონტექსტის მართვის ფუნქციაა. OmniRoute-ის ლოკალური შეკუმშვის ძრავებისგან (Caveman, RTK, LLMLingua, stacked pipelines) განსხვავებით — რომლებიც მოთხოვნის სხეულს პროქსიდან გასვლამდე _გადაამუშავებენ_ — კონტექსტის რედაქტირება **პროვაიდერს** სთხოვს, საკუთარი მიმდინარე კონტექსტის ფანჯრიდან მოძველებული ხელსაწყოს გამოყენების / ხელსაწყოს შედეგის ბლოკები გაასუფთაოს. OmniRoute მხოლოდ სხეულის პარამეტრს (`context_management.edits[]`) ამატებს; ფაქტობრივ გასუფთავებას Claude საკუთარი ტოკენიზატორის მიხედვით ასრულებს.

ეს თავისი ბუნებით დელეგირებული შესაძლებლობაა: სხვა პროვაიდერები ამ პარამეტრს უარყოფენ, ამიტომ OmniRoute მის მოქმედების არეალს მკაცრად ზღუდავს Claude-ითა და Claude Code-თან თავსებადი რელეებით.

ჭეშმარიტების წყარო: `open-sse/config/contextEditing.ts` (სტრატეგიის იდენტიფიკატორები, სხეულში ჩასმა, ტელემეტრიის ამოღება), `open-sse/executors/base.ts` (ჩასმის შემოწმება + 400-შეცდომისას სარეზერვო მექანიზმი) და `open-sse/services/compression/types.ts` (კონფიგურაციის სტრუქტურა + ნაგულისხმევი მნიშვნელობა).

## რას აკეთებს `clear_tool_uses`

OmniRoute გამავალ Anthropic Messages-ის სხეულში ერთ რედაქტირებას ამატებს:

```json
{
  "context_management": {
    "edits": [
      {
        "type": "clear_tool_uses_20250919",
        "trigger": { "type": "input_tokens", "value": 100000 },
        "keep": { "type": "tool_uses", "value": 3 }
      }
    ]
  }
}
```

- `type: "clear_tool_uses_20250919"` — Anthropic-ის თარიღიანი სტრატეგიის იდენტიფიკატორი (`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — როდესაც მოთხოვნის შემავალი ტოკენების რაოდენობა ამ ზღვარს გადააჭარბებს, Claude იწყებს ხელსაწყოს გამოყენების/შედეგის ძველი წყვილების გასუფთავებას (`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, Anthropic-ის ნაგულისხმევი მნიშვნელობა).
- `keep.value: 3` — ხელსაწყოს გამოყენების/შედეგის N ყველაზე ახალი წყვილი ხელუხლებელი რჩება (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

ბეტა ვერსიის მხარდაჭერა ცხადდება `anthropic-beta: context-management-2025-06-27` სათაურის მეშვეობით, რომელსაც OmniRoute უკვე აგზავნის Claude-ის მოთხოვნებში.

ჩასმას `applyContextEditingToBody()` ასრულებს და ის **იდემპოტენტურია**: თუ `clear_tool_uses` რედაქტირება სხეულში უკვე არსებობს (წინა გამოძახების მიერ დამატებული ან კლიენტის მიერ მიწოდებული), სხეული უცვლელი რჩება. თუ ასევე არსებობს `clear_thinking_20251015` რედაქტირება, OmniRoute სტაბილური დახარისხებით `clear_thinking` რედაქტირებას დასაწყისში ათავსებს, რადგან Anthropic მოითხოვს, რომ `edits[]` მასივში `clear_thinking` წინ უსწრებდეს `clear_tool_uses`-ს.

## თითოეული კომბინაციის ჩართვა/გამორთვის გადამრთველი

კონტექსტის რედაქტირება ნაგულისხმევად **გამორთულია** და მის ჩართვას მკაფიო თანხმობა სჭირდება. გადამრთველი შეკუმშვის კონფიგურაციაში მოცემული ერთი ლოგიკური მნიშვნელობაა:

- პარამეტრის გასაღები: `contextEditing.enabled` (camelCase — **არა** `context_editing` / `context-editing`).
- ტიპი: `ContextEditingConfig { enabled: boolean }` ფაილში
  `open-sse/services/compression/types.ts`.
- ნაგულისხმევი მნიშვნელობა: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Zod-ის სქემა: `contextEditingConfigSchema` ფაილში `src/shared/validation/compressionConfigSchemas.ts`.
- შენახვა: ინახება შეკუმშვის დანარჩენ პარამეტრებთან ერთად (ნორმალიზდება ფაილში
  `src/lib/db/compression.ts`).

მართვის პანელში გადამრთველი შეკუმშვის ჰაბშია განთავსებული
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`) და `saveSettings()`-ის მეშვეობით უკან წერს
`{ contextEditing: { enabled: … } }`-ს. რადგან ის შეკუმშვის პარამეტრების ობიექტის ნაწილია, სრულად დამოუკიდებელი ზედაპირის ნაცვლად თითოეული კომბინაციის შეკუმშვის პროფილთან კომპოზიციაში მუშაობს — კონფიგურაცია მხოლოდ ჩართვა/გამორთვის ალამს შეიცავს; ყველა ზღვარი (`trigger`,
`keep`) ზემოთ დოკუმენტირებული მუდმივებით განისაზღვრება.

## მხოლოდ Claude-ზე დაშვების შეზღუდვა

ინექცია ხდება მხოლოდ ნამდვილი Claude-ისთვის ან Claude Code-თან თავსებადი რელეებისთვის. შეზღუდვა
`open-sse/executors/base.ts`-ში ასეთია:

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — ნამდვილი Anthropic-ის გასაღები/OAuth.
- `isClaudeCodeCompatible(this.provider)` — რელეები, რომელთა პროვაიდერის id იწყება
  `anthropic-compatible-cc-` პრეფიქსით (ისინი Claude Code-თან თავსებადობას აცხადებენ, ამიტომ სწორედ
  ეს რელეები მიიღებენ ბეტა-ფუნქციას ყველაზე დიდი ალბათობით). იხილეთ `open-sse/services/provider.ts`.

განზრახ **გამორიცხულია**:

- `claude-web` — ბრაუზერული რელე `create_conversation_params` მოთხოვნის ფორმით, რომელიც
  `context_management`-ს არასოდეს ხედავს.
- ზოგადი `anthropic-compatible-*` რელეები (`-cc-` პრეფიქსის გარეშე) — მესამე მხარის საბოლოო
  წერტილები ბეტა-ფუნქციის გაურკვეველი მხარდაჭერით.

Claude-ისგან განსხვავებული პროვაიდერები `context_management` პარამეტრს არასოდეს იღებენ, მაშინაც კი,
როდესაც გადამრთველი ჩართულია.

## 400-იანი სათადარიგო სცენარი / რელეების დაფარვა

Claude-თან თავსებადმა რელემ შეიძლება ბეტა-ფუნქციის მხარდაჭერა განაცხადოს, მაგრამ მაინც უარყოს
`context_management` პარამეტრი HTTP 400 პასუხით. მოთხოვნის ჩავარდნის ნაცვლად ფუნქციონალის
კორექტულად შესამცირებლად, შემსრულებელი შლის პარამეტრს და იმავე URL-ზე მოთხოვნას **ერთხელ**
იმეორებს:

```ts
if (
  response.status === HTTP_STATUS.BAD_REQUEST &&
  contextEditing?.enabled &&
  !contextEditingDisabled &&
  transformedBody?.context_management !== undefined
) {
  const errText = await response
    .clone()
    .text()
    .catch(() => "");
  if (/context[_-]management|context editing/i.test(errText)) {
    contextEditingDisabled = true;
    delete transformedBody.context_management;
    let retryBody = JSON.stringify(transformedBody);
    if (isClaudeCodeCompatible(this.provider) || this.provider === "claude") {
      retryBody = await signRequestBody(retryBody);
    }
    response = await fetch(url, { ...fetchOptions, body: retryBody });
  }
}
```

ქცევა:

1. ამოქმედდება მხოლოდ `400` პასუხისას, როდესაც კონტექსტის რედაქტირება ჩართულია და მოთხოვნის სხეული
   ნამდვილად შეიცავს `context_management`-ს.
2. 400 პასუხის სხეული იკითხება `clone()`-ის საშუალებით, რათა თავდაპირველი პასუხი უცვლელი დარჩეს
   შეუსაბამო შემთხვევისთვის.
3. შეცდომის ტექსტი უნდა ემთხვეოდეს `/context[_-]management|context editing/i`-ს — დაუკავშირებელი
   400 (მაგ., `max_tokens must be >= 1`) სათადარიგო სცენარს **არ** ააქტიურებს; თავდაპირველი შეცდომა
   ვრცელდება.
4. დამთხვევის შემთხვევაში, ის აყენებს `contextEditingDisabled = true`-ს (რაც თრგუნავს განმეორებით
   ინექციას, თუ ახალი `transformedBody` მოგვიანებით ხელახლა შექმნა განმეორებითი ცდის/სათადარიგო
   URL-ისთვის), შლის `context_management`-ს, ხელახლა აწერს ხელს სხეულს Claude-ისთვის /
   Claude Code-თან თავსებადი რელეებისთვის (`signRequestBody`) და იმავე URL-ზე მოთხოვნას ერთხელ
   იმეორებს.

ნამდვილი Claude ბეტა-ფუნქციას `ANTHROPIC_BETA_BASE`-ში ატარებს და ამ სათადარიგო სცენარში არ ხვდება.

## `applied_edits` ტელემეტრია

Claude-ის პასუხის შემდეგ OmniRoute აღრიცხავს, რეალურად რამდენი კონტექსტი გაასუფთავა პროვაიდერმა.
ეს **არ** გადაიცემა ნაკადურად — მონაცემები საუკეთესო მცდელობის პრინციპით ამოიღება არანაკადური
პასუხის სხეულიდან და პასუხზე არასოდეს მოქმედებს (ტელემეტრიის შეცდომები იგნორირდება).

- ამოღება: `extractContextEditingTelemetry(responseBody)` ფაილში
  `open-sse/config/contextEditing.ts`. პასუხის ფორმის განსხვავებებისადმი მდგრადობისთვის, ის
  `applied_edits`-ს სამ ადგილას ამოწმებს:
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- თითოეული ჩანაწერიდან იკითხება ველები: `cleared_input_tokens` და `cleared_tool_uses`
  (snake_case, Anthropic-ის მშობლიური ფორმატი), ხოლო სათადარიგოდ გამოიყენება camelCase ფორმები
  `clearedInputTokens` / `clearedToolUses`.
- აბრუნებს `null`-ს, როდესაც `applied_edits` მასივი ვერ მოიძებნა ან რეალურად არაფერი
  გასუფთავებულა.

ქვითრის ფორმაა `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`.
ჩაწერა ხდება `open-sse/handlers/chatCore.ts`-ში (შეზღუდულია პირობით `provider === "claude"`)
`recordContextEditingTelemetry()`-ის საშუალებით (`src/lib/db/compressionAnalytics.ts`), რომელიც
წერს შეკუმშვის ანალიტიკის სტრიქონს შემდეგი ნიშნულებით:

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = გასუფთავებული შეყვანის ტოკენების რაოდენობა
- `request_id` სუფიქსით `::context-editing`

ამრიგად, დელეგირებული გასუფთავება აისახება შეკუმშვის ანალიტიკაში ლოკალურ ძრავებთან ერთად,
`context-editing` ძრავის ნიშნულის ქვეშ, და განსხვავდება RTK/Caveman/LLMLingua-ს მიერ მიღებული
დანაზოგისგან.

## კავშირი ლოკალურ შეკუმშვის ძრავებთან

| ასპექტი               | ლოკალური ძრავები (Caveman / RTK / LLMLingua / stacked) | დელეგირებული კონტექსტის რედაქტირება                                 |
| --------------------- | ------------------------------------------------------ | ------------------------------------------------------------------- |
| სად სრულდება          | OmniRoute-ში, სანამ მოთხოვნა პროქსის დატოვებს          | პროვაიდერში (Claude), სერვერის მხარეს                               |
| რას არედაქტირებს      | პრომპტის / კონტექსტის / ხელსაწყოს შედეგის ტექსტს       | ხელსაწყოს გამოყენების / ხელსაწყოს შედეგის ძველ ბლოკებს              |
| პროვაიდერების დაფარვა | ყველა პროვაიდერი                                       | მხოლოდ `claude` + `anthropic-compatible-cc-*`                       |
| გადამრთველი           | შეკუმშვის რეჟიმის პარამეტრები                          | `contextEditing.enabled`                                            |
| წარუმატებლობის რეჟიმი | წარუმატებლობისას მუშაობის გაგრძელება (საწყისი ტექსტი)  | 400-ზე სარეზერვო ქმედება: პარამეტრის მოცილება და ერთხელ ხელახლა ცდა |
| ეკონომიის ტელემეტრია  | `engine: <engine id>`                                  | `engine: "context-editing"`                                         |

ეს ორი მიდგომა ერთმანეთს ავსებს: ლოკალური ძრავები კუმშავს ბაიტებს, რომლებსაც OmniRoute აგზავნის; კონტექსტის რედაქტირება კი
Claude-ს საშუალებას აძლევს, ეტაპებს შორის მიმდინარე კონტექსტი შეამციროს. მათი ერთდროულად ჩართვა შესაძლებელია.

## აგრეთვე იხილეთ

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — ძრავების რეესტრი და ლოკალური შეკუმშვის
  ძრავები
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — ბრძანებების/ხელსაწყოების გამომავალი მონაცემების შეკუმშვა
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP აღწერილობის შეკუმშვა და
  ხელსაწყოების რაოდენობის შემცირება
- წყარო: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
