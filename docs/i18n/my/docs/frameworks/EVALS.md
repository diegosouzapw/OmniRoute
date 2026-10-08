# Evaluations (Evals) (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **အမှန်တရား၏ မူရင်းရင်းမြစ်:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **နောက်ဆုံးမွမ်းမံထားသည့်ရက်:** 2026-06-28 — v3.8.40

OmniRoute တွင် routing ဖွဲ့စည်းပုံများ၊ provider/model တစ်ခုချင်းစီ သို့မဟုတ် ထည့်သွင်းပေးထားသော "golden set" suite များကို စွမ်းဆောင်ရည်စံနှုန်းတိုင်းတာရန် အသုံးပြုနိုင်သည့် ယေဘုယျ evaluation framework တစ်ခု ပါဝင်သည်။
၎င်းကို routing ပြောင်းလဲမှုများအား စစ်ဆေးရန်၊ provider အသစ်များအား အတည်ပြုရန်နှင့် production traffic သို့ မတင်မီ release များအတွက် အတည်ပြုကန့်သတ်ချက်များ သတ်မှတ်ရန် အသုံးပြုပါ။

Framework ကို အောက်ပါအတိုင်း အကောင်အထည်ဖော်ထားသည်-

- Memory အတွင်းရှိ built-in suite များကို မှတ်ပုံတင်ခြင်း၊ output များကို မျှော်မှန်းထားသော စံနှုန်းများနှင့် တိုင်းတာအကဲဖြတ်ခြင်းနှင့် scorecard များကို စုစည်းခြင်းတို့ ပြုလုပ်သည့် pure runner (`src/lib/evals/evalRunner.ts`)။
- Custom (အသုံးပြုသူသတ်မှတ်ထားသော) suite များနှင့် ယခင် run မှတ်တမ်းများကို SQLite တွင် သိမ်းဆည်းရန် persistence layer (`src/lib/db/evals.ts`)။
- Case တစ်ခုချင်းစီကို `POST /v1/chat/completions` သို့ အမှန်တကယ် call များ ပို့ခြင်းဖြင့် လုပ်ဆောင်ပြီး latency နှင့် output များကို မှတ်တမ်းတင်ကာ run ကို သိမ်းဆည်းပေးသည့် orchestration layer (`src/lib/evals/runtime.ts`)။
- `/api/evals/*` အောက်ရှိ REST endpoint များ (စီမံခန့်ခွဲမှုဆိုင်ရာ အထောက်အထားစစ်ဆေးမှုဖြင့်သာ အသုံးပြုနိုင်သည်)။
- `Dashboard → Usage → Evals` ရှိ dashboard မျက်နှာပြင် (`EvalsTab.tsx`)။

## သဘောတရားများ

### Suite

Suite ဆိုသည်မှာ `description` တစ်ခုနှင့် case တစ်ခု သို့မဟုတ် တစ်ခုထက်ပို၍ ပါဝင်သည့် အမည်ပေးထားသော test case အစုအဝေးတစ်ခုဖြစ်သည်။ Suite များသည် ရင်းမြစ်နှစ်ခုမှ ရရှိသည်-

| ရင်းမြစ်   | သတ်မှတ်ထားသည့်နေရာ                                         | Runtime တွင် ပြောင်းလဲနိုင်သလား?           |
| ---------- | ---------------------------------------------------------- | ------------------------------------------ |
| `built-in` | စတင်ချိန်တွင် `registerSuite()` မှတစ်ဆင့် မှတ်ပုံတင်ထားသည် | မပြောင်းလဲနိုင်ပါ (ကုဒ်တွင် သတ်မှတ်ထားသည်) |
| `custom`   | SQLite `eval_suites` + `eval_cases` တွင် သိမ်းဆည်းထားသည်   | ပြောင်းလဲနိုင်ပါသည် (API/UI မှတစ်ဆင့်)     |

လက်ရှိ built-in suite များ (`src/lib/evals/evalRunner.ts` ကို ကြည့်ပါ)-

- `golden-set` — နှုတ်ဆက်ခြင်း/သင်္ချာ/ဘာသာပြန်ခြင်း/ဘေးကင်းလုံခြုံမှုတို့ ပါဝင်သော အခြေခံ case 10 ခု
- `coding-proficiency` — Python/JS/SQL/TS/bug ရှာဖွေခြင်း
- `reasoning-logic` — ယုတ္တိဗေဒဆိုင်ရာ ဆင်ခြင်ချက်များ၊ စကားလုံးပြဿနာများ၊ ပုံစံများကို ခွဲခြားသိရှိခြင်း
- `multilingual` — ဘာသာပြန်ခြင်းနှင့် ဘာသာစကား ခွဲခြားသတ်မှတ်ခြင်း
- `safety-guardrails` — PII၊ jailbreak၊ ငြင်းပယ်ခြင်း၊ ဘက်လိုက်မှုကို သတိပြုမိခြင်း
- `instruction-following` — JSON သီးသန့်၊ နံပါတ်စဉ်တပ်ထားသော စာရင်းများ၊ ဘာသာစကားဆိုင်ရာ ကန့်သတ်ချက်များ
- `codex-comparison` — compare mode အတွက် ရည်ရွယ်ထားသော coding task များကို တိုက်ရိုက်ယှဉ်ပြိုင်နှိုင်းယှဉ်ခြင်း

### Case

Case တစ်ခုချင်းစီတွင် အောက်ပါတို့ ပါဝင်သည်-

| Field      | ဖော်ပြချက်                                                                         |
| ---------- | ---------------------------------------------------------------------------------- |
| `id`       | တည်ငြိမ်သော သတ်မှတ်အမှတ်အသား (output နှင့် metric များအတွက် key အဖြစ် အသုံးပြုသည်) |
| `name`     | လူသားဖတ်ရှုနားလည်နိုင်သော အညွှန်းအမည်                                              |
| `model`    | Run က `suite-default` targeting ကို အသုံးပြုသည့်အခါ အသုံးပြုမည့် မူလ model         |
| `input`    | `{ messages, max_tokens? }` — `/v1/chat/completions` သို့ ပို့သည်                  |
| `expected` | `{ strategy, value }` — အမှတ်ပေးစံနှုန်း (အောက်တွင် ကြည့်ပါ)                       |
| `tags`     | ရွေးချယ်ထည့်သွင်းနိုင်သော အညွှန်းများ (ဥပမာ `safety`, `pii`, `jailbreak`)          |

### Target

တူညီသော suite ကို မတူညီသည့် target များဖြင့် run နိုင်သည်။ Target schema သည်
`src/shared/validation/schemas.ts` ရှိ `evalTargetSchema` ဖြစ်သည်-

| Target အမျိုးအစား | `id`       | လုပ်ဆောင်ပုံ                                                                                  |
| ----------------- | ---------- | --------------------------------------------------------------------------------------------- |
| `suite-default`   | `null`     | Case တစ်ခုချင်းစီသည် ၎င်း၏ built-in `model` field ကို အသုံးပြုသည်                             |
| `model`           | model အမည် | Case အားလုံးကို တိုက်ရိုက် model တစ်ခုတည်းမှတစ်ဆင့် မဖြစ်မနေ လုပ်ဆောင်စေသည် (ဥပမာ `gpt-4o`)   |
| `combo`           | combo အမည် | Case အားလုံးကို combo တစ်ခုတည်းမှတစ်ဆင့် လုပ်ဆောင်သည် (routing engine ကို စမ်းသပ်အသုံးပြုသည်) |

`model` နှင့် `combo` အတွက် `id` field ကို မဖြစ်မနေ ထည့်သွင်းရသည် (Zod
`superRefine` ဖြင့် စည်းကမ်းသတ်မှတ်ထားသည်)။ `compareTarget` ကို ပေးထားသည့်အခါ target နှစ်ခုသည် မတူညီရမည် —
runner သည် A/B နှိုင်းယှဉ်မှုအတွက် run နှစ်ခုလုံးကို တူညီသော `runGroupId` အောက်တွင် သိမ်းဆည်းထားသည်။

## အမှတ်ပေး စံသတ်မှတ်ချက်များ

`evaluateCase()` (evalRunner.ts) တွင် အကောင်အထည်ဖော်ထားသည်-

| နည်းဗျူဟာ  | အောင်မြင်သည့်အခြေအနေ…                                                                     |
| ---------- | ----------------------------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                                         |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`                       |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` သည် truthy ဖြစ်သည်                        |
| `custom`   | `expected.fn(actualOutput, evalCase)` သည် truthy ကို ပြန်ပေးသည် (ပါဝင်ပြီးသားများအတွက်သာ) |

**မှတ်ချက်:** function များကို API မှတစ်ဆင့် serialize လုပ်၍မရသောကြောင့် custom-function အမှတ်ပေးခြင်းကို code ဖြင့် သတ်မှတ်ထားသော (ပါဝင်ပြီးသား)
suite များအတွက်သာ သီးသန့်ထားသည်။
အသုံးပြုသူဖန်တီးသော suite များအတွက် `evalCaseBuilderSchema` သည်
`contains | exact | regex` ကိုသာ လက်ခံသည်။

လက်ရှိတွင် LLM-as-judge သို့မဟုတ် embedding အခြေခံ similarity scorer မရှိသေးပါ — ၎င်းသည်
`evaluateCase()` တွင် ရှင်းလင်းစွာ တိုးချဲ့နိုင်သည့် နေရာတစ်ခု ဖြစ်မည်။

## ဒေတာဘေ့စ် Schema

ဇယားသုံးခု (migration များဖြစ်သည့် `030_create_eval_runs.sql` နှင့်
`031_create_eval_suites.sql`)-

| ဇယား          | ရည်ရွယ်ချက်                                                                                                                |
| ------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | စိတ်ကြိုက် suite metadata (`id`, `name`, `description`)                                                                    |
| `eval_cases`  | suite တစ်ခုချင်းစီအလိုက် case များ — `input_json`, `expected_*`, `tags_json`                                               |
| `eval_runs`   | ယခင် run များ — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

ပါဝင်ပြီးသား suite များကို DB တွင် **မသိမ်းဆည်းထားပါ**။ ၎င်းတို့သည် memory ထဲတွင် ရှိနေပြီး
`evalRunner.ts` ကို import လုပ်သည့်အခါတိုင်း ပြန်လည် register လုပ်သည်။

## REST API

Endpoint အားလုံးသည် စီမံခန့်ခွဲမှုဆိုင်ရာ auth (`requireManagementAuth`) လိုအပ်သည် — ၎င်းတို့သည်
အများသုံး proxy မျက်နှာပြင်၏ အစိတ်အပိုင်းမဟုတ်ပါ။

| Endpoint                      | Method   | ဖော်ပြချက်                                                                                |
| ----------------------------- | -------- | ----------------------------------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | suite များ + မကြာသေးမီ run များ + scorecard + target များ + key များကို စာရင်းပြုစုသည်    |
| `/api/evals`                  | `POST`   | suite တစ်ခုကို run သည် (တစ်ခုတည်း သို့မဟုတ် နှိုင်းယှဉ်မှု) — schema `evalRunSuiteSchema` |
| `/api/evals/{suiteId}`        | `GET`    | suite တစ်ခုကို ရယူသည် (ပါဝင်ပြီးသား သို့မဟုတ် စိတ်ကြိုက်)                                 |
| `/api/evals/suites`           | `POST`   | စိတ်ကြိုက် suite တစ်ခု ဖန်တီးသည် — schema `evalSuiteSaveSchema`                           |
| `/api/evals/suites/{suiteId}` | `GET`    | စိတ်ကြိုက် suite တစ်ခုကို ရယူသည်                                                          |
| `/api/evals/suites/{suiteId}` | `PUT`    | စိတ်ကြိုက် suite တစ်ခုကို အစားထိုးသည် (case များကို ပြန်လည်ထည့်သွင်းသည်)                  |
| `/api/evals/suites/{suiteId}` | `DELETE` | စိတ်ကြိုက် suite တစ်ခုနှင့် ၎င်း၏ case များကို ဖျက်သည်                                    |

### Suite တစ်ခုကို run ခြင်း

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

ထည့်သွင်းရန် မလိုအပ်သော field များ-

- `outputs` — ကြိုတင်တွက်ချက်ထားသော output များ၏ `Record<caseId, string>`။ ၎င်းကို ထည့်သွင်းပေးထားသည့်အခါ
  runner သည် **dispatch ကို ကျော်သွားပြီး** cache လုပ်ထားသော output များကိုသာ အမှတ်ပေးသည် (offline
  အကဲဖြတ်မှုအတွက် အသုံးဝင်သည်)။
- `compareTarget` — တစ်ပြိုင်နက်တည်း run မည့် ဒုတိယ target ဖြစ်သည်။ run နှစ်ခုလုံးသည်
  ဘေးချင်းယှဉ်ကြည့်ရှုရန် ဖန်တီးထားသော `runGroupId` တစ်ခုကို အတူမျှဝေသည်။
- `apiKeyId` — dispatch လုပ်ထားသော
  `/v1/chat/completions` call များကို authenticate လုပ်ရန် အသုံးပြုသည့် အတွင်းပိုင်း API key ဖြစ်သည်။ `REQUIRE_API_KEY` ကို ဖွင့်ထားသည့်အခါ လိုအပ်သည်။

### စိတ်ကြိုက် suite တစ်ခု ဖန်တီးခြင်း

```bash
curl -X POST http://localhost:20128/api/evals/suites \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production smoke",
    "description": "Quick sanity check before deploy",
    "cases": [
      {
        "name": "JSON shape",
        "model": "gpt-4o",
        "input": { "messages": [{ "role": "user", "content": "Reply with {\"ok\": true}" }] },
        "expected": { "strategy": "regex", "value": "\"ok\"\\s*:\\s*true" }
      }
    ]
  }'
```

## ဖြန့်ဝေမှု ပိုက်လိုင်း

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Suite ကို ဖြေရှင်းသတ်မှတ်သည် (built-in သို့မဟုတ် စိတ်ကြိုက်)။
2. Case တစ်ခုစီအတွက် case ၏ `messages`၊ ဖြေရှင်းသတ်မှတ်ထားသော `model`၊ `stream: false` နှင့် `max_tokens: 512` (သို့မဟုတ် case ၏ override တန်ဖိုး) တို့ဖြင့် `/v1/chat/completions` သို့ ပေးပို့မည့် `Request` တစ်ခုကို တည်ဆောက်သည်။
3. Chat handler ကို တိုက်ရိုက်ခေါ်သည် (လုပ်ငန်းစဉ်အတွင်း၌ဖြစ်ပြီး အပို HTTP အဆင့်မရှိပါ)။
4. ကြာချိန်ကို မှတ်တမ်းတင်ပြီး `choices[0].message.content` သို့မဟုတ် Responses-API ၏ `output[]` payload မှ စာသားကို ထုတ်ယူသည်။
5. Output အားလုံးကို `runSuite()` မှတစ်ဆင့် အမှတ်ပေးပြီးနောက် `saveEvalRun()` မှတစ်ဆင့် သိမ်းဆည်းသည်။

Case များကို **အစဉ်လိုက်** လုပ်ဆောင်သည်။ လက်ရှိတွင် concurrency flag မရှိပါ။

## Dashboard

UI သည် `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`) တွင် ရှိသည်။ ထိုနေရာမှ အောက်ပါတို့ကို လုပ်ဆောင်နိုင်သည်-

- Case တစ်ခုချင်းစီ၏ preview နှင့်အတူ built-in နှင့် စိတ်ကြိုက် suite များကို ကြည့်ရှုနိုင်သည်။
- Case builder ဖြင့် စိတ်ကြိုက် suite များကို ဖန်တီးခြင်း၊ တည်းဖြတ်ခြင်းနှင့် ဖျက်ခြင်းတို့ ပြုလုပ်နိုင်သည်။
- Target တစ်ခု (suite defaults / model / combo) ကို ရွေးချယ်ပြီး ဒုတိယ `compareTarget` နှင့် API key တစ်ခုကို လိုအပ်ပါက သတ်မှတ်ကာ တောင်းဆိုသည့်အချိန်တွင် လုပ်ဆောင်နိုင်သည်။
- Run history၊ case တစ်ခုချင်းစီ၏ pass/fail၊ ကြာချိန်နှင့် မှတ်တမ်းတင်ထားသော output များကို စစ်ဆေးနိုင်သည်။
- `(suite, target)` scope တစ်ခုစီ၏ နောက်ဆုံး run ကို အခြေခံ၍ စုစည်းထားသော အဆက်မပြတ်ပြောင်းလဲသည့် scorecard ကို ကြည့်နိုင်သည်။

## Auto-Assessment RFC နှင့် ဆက်နွှယ်မှု

သီးခြားဖြစ်ပြီး နယ်ပယ်ပိုကျဉ်းသော assessment subsystem တစ်ခုသည် `src/domain/assessment/` တွင် ရှိသည် (တိုက်ရိုက်အသုံးပြုနေသော scoring engine အကြောင်းကို [AUTO-COMBO.md](../routing/AUTO-COMBO.md) တွင်လည်း ကြည့်ပါ)။ ထို subsystem သည် Auto Combo engine ကို ရည်ရွယ်ထားပြီး upstream များ ပျက်ကွက်သည့်အခါ combo များ အလိုအလျောက် ပြန်လည်ကောင်းမွန်နိုင်စေရန် provider နှင့် model များကို အလိုအလျောက် အမှတ်ပေးသည်။ ၎င်းသည် ကိုယ်ပိုင် runner၊ ကိုယ်ပိုင် categorizer နှင့် ကိုယ်ပိုင် scoring logic တို့ကို အသုံးပြုသည်။

ဤနေရာတွင် မှတ်တမ်းပြုထားသော Evals framework သည် **ပိုမိုကျယ်ပြန့်ပြီး ယေဘုယျရည်ရွယ်ချက်သုံး စမ်းသပ်မှု မျက်နှာပြင်** ဖြစ်သည်။ အမျိုးမျိုးသော regression suite များ၊ A/B နှိုင်းယှဉ်မှုများနှင့် release တစ်ခုချင်းစီအတွက် smoke test များတွင် ၎င်းကို ဦးစားပေး အသုံးပြုပါ။ အချိန်နှင့်တစ်ပြေးညီ provider health ကို routing ဆုံးဖြတ်ချက်များအပေါ် သက်ရောက်စေရန် လိုအပ်သည့်အခါ Auto-Assessment subsystem ကို အသုံးပြုပါ။

## CI ပေါင်းစည်းမှု

လက်ရှိတွင် သီးသန့် `eval:ci` npm script မရှိပါ။ Eval ရလဒ်များဖြင့် release များကို gate လုပ်လိုပါက နည်းလမ်းနှစ်ခုရှိသည်-

- **HTTP နည်းလမ်း**: Server ကို စတင်၍ သိရှိပြီးသား `suiteId` + `target` ဖြင့် `POST /api/evals` ကို ခေါ်ဆိုပြီး response အတွင်းရှိ `runs[].summary.passRate >= N` ဖြစ်ကြောင်း စစ်ဆေးအတည်ပြုပါ။
- **လုပ်ငန်းစဉ်အတွင်း နည်းလမ်း**: Script တစ်ခုမှ `@/lib/evals/runtime` ရှိ `runEvalSuiteAgainstTarget()` ကို import လုပ်ပြီး test DB ဖြင့် လုပ်ဆောင်ကာ ပြန်လည်ရရှိသော `PersistedEvalRun.summary` ကို စစ်ဆေးပါ။

Route နှင့် history ကို လွှမ်းခြုံစမ်းသပ်ထားသော test များသည် `tests/unit/evals-route.test.ts` နှင့် `tests/unit/evals-history.test.ts` တွင် ရှိသည်။

## တိုးချဲ့နိုင်သည့် နေရာများ

အများအားဖြင့် ပြောင်းလဲလေ့ရှိသည့် အရာများနှင့် ၎င်းတို့ကို ပြင်ဆင်ရမည့်နေရာများ-

- **Scoring strategy အသစ်** — `evaluateCase()` (`evalRunner.ts`) အတွင်းရှိ `switch (evalCase.expected.strategy)` block ကို တိုးချဲ့ပြီး `src/lib/db/evals.ts` ရှိ `EvalCaseStrategy` နှင့် `schemas.ts` ရှိ `evalCaseBuilderSchema` တို့ကို ချဲ့ထွင်ပါ။
- **Built-in suite အသစ်** — Suite object တစ်ခုကို သတ်မှတ်ပြီး `evalRunner.ts` ၏ အောက်ဆုံးတွင် `registerSuite()` ကို ခေါ်ဆိုပါ။ ၎င်းကို `listSuites()` က အလိုအလျောက် ရှာဖွေတွေ့ရှိမည်။
- **Concurrency ဖြင့် လုပ်ဆောင်ခြင်း** — `runEvalSuiteAgainstTarget()` အတွင်းရှိ အစဉ်လိုက် `for` loop ကို ကန့်သတ်ထားသော `Promise.all` အဖြစ် ပြောင်းလဲပါ (လက်ရှိတွင် concurrency ထိန်းချုပ်မှု မရှိပါ)။
- **Stream/tool-call case များ** — လက်ရှိတွင် runner က `stream: false` ကို မဖြစ်မနေ သတ်မှတ်ထားသည်။ Streaming သို့မဟုတ် tool-aware evaluation ပြုလုပ်ရန် `runtime.ts` တွင် ပြောင်းလဲမှုများ လိုအပ်မည် (အမှတ်မပေးမီ SSE chunk များကို မှတ်တမ်းတင်ပြီး စုစည်းရမည်)။

## ထပ်မံကြည့်ရှုရန်

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — ထုတ်ကုန်တစ်ခုလုံး အသုံးပြုပုံ လမ်းညွှန်
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — တောင်းဆိုမှု pipeline ရည်ညွှန်းချက်
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — Auto Combo အမှတ်ပေး အင်ဂျင် (တိုက်ရိုက် runtime)
- ရင်းမြစ်: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- UI: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
