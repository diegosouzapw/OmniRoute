# Compression Engines (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇷 [ko](../../../ko/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

OmniRoute কম্প্রেশন ইঞ্জিন কনট্র্যাক্টকে কেন্দ্র করে নির্মিত। একটি মোড সরাসরি একটি ইঞ্জিন
(`caveman` বা `rtk`) চালাতে পারে, অথবা নির্ধারিত ক্রমে একাধিক ইঞ্জিন চালানো একটি ডিটারমিনিস্টিক স্ট্যাকড পাইপলাইন ব্যবহার করতে পারে।

## মোডসমূহ

| মোড          | ইঞ্জিন পাথ                                                                      | উদ্দিষ্ট ইনপুট                                |
| ------------ | ------------------------------------------------------------------------------- | --------------------------------------------- |
| `off`        | কিছুই নয়                                                                       | প্রম্পট হুবহু সংরক্ষণ                         |
| `lite`       | Caveman lite সহায়কসমূহ                                                         | কম-ঝুঁকির সর্বদা-সক্রিয় পরিশোধন              |
| `standard`   | Caveman                                                                         | স্বাভাবিক ভাষার প্রম্পট সংক্ষিপ্তকরণ          |
| `aggressive` | Caveman + ইতিহাস/টুল সারসংক্ষেপকারী                                             | দীর্ঘ চ্যাট সেশন                              |
| `ultra`      | Caveman + ছাঁটাই সহায়কসমূহ                                                     | কনটেক্সট-সীমা অতিক্রম থেকে পুনরুদ্ধার         |
| `rtk`        | RTK                                                                             | টার্মিনাল, শেল, বিল্ড, টেস্ট এবং git আউটপুট   |
| `omniglyph`  | OmniGlyph                                                                       | নেটিভ প্রোভাইডার ওয়্যারে ছবি হিসেবে কনটেক্সট |
| `stacked`    | পাইপলাইন। অনুরোধের ডিফল্ট হলো `session-dedup -> lite`। `rtk -> caveman` ঐচ্ছিক। | মিশ্র টুল লগ ও গদ্য, সর্বোচ্চ সাশ্রয়         |

### OmniGlyph কম্প্রেশন প্রোফাইলসমূহ

`omniglyph` ইঞ্জিনটি (`omniglyph` প্যাকেজ, 1.4.0+) একটি নামযুক্ত সেমান্টিক প্রোফাইল গ্রহণ করে, যা
কম্প্রেশন সেটিংসে `omniglyph.profile`-এর মাধ্যমে গ্লোবালি অথবা stacked পাইপলাইনের
ধাপের কনফিগের মাধ্যমে প্রতি ধাপে সেট করা হয়:

| প্রোফাইল      | সীমা                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------- |
| `aggressive`  | ডিফল্ট। প্রকাশিত রসিদে পরিমাপ করা নীতি — সিস্টেম, টুল ডক এবং ঘন ইতিহাসকে ছবিতে রূপান্তর করে |
| `balanced`    | লাইভ স্টেট নেটিভ রাখে, শেষ 8টি টার্ন সুরক্ষিত রাখে এবং পুরোনো সমাপ্ত ইতিহাস সংকুচিত করে     |
| `coding-safe` | কর্তৃত্ব, টুল স্কিমা এবং লাইভ টুল আউটপুট নেটিভ রাখে, শেষ 12টি টার্ন সুরক্ষিত রাখে           |
| `passthrough` | রূপান্তর না করেই রাউট করে; ইঞ্জিনটি এড়িয়ে যাওয়া হয়                                      |

প্রোফাইলটি একটি **সর্বোচ্চ সীমা, সর্বনিম্ন সীমা নয়**: প্যাকেজের `mergeCompressionProfileOptions`
কোনো কলারের ওভাররাইডকে প্রোফাইলের বন্ধ করা ক্ষতিকর কম্প্রেশন লেন পুনরায় খুলতে দেয় না, তাই প্রতি-ধাপের
`preserveSystemPrompt: false`, `coding-safe`-এর অধীনে সিস্টেম কম্প্রেশন পুনরায় সক্রিয় করতে পারে না।

এই কোডবেসে পরিমাপ অনুযায়ী: `coding-safe` এবং `balanced`, `minCompressChars`-কে এর
সর্বোচ্চ মানে উন্নীত করে এবং সিস্টেম, টুল স্কিমা ও টুল ফলাফল নেটিভ রাখে; ফলে যে সেশনে এখনো
ইতিহাস জমা হয়নি, সেটি `below_min_chars`-এ থেমে যায় এবং ইঞ্জিন কিছুই রূপান্তর করে না। এ কারণেই
সবচেয়ে নিরাপদ প্রোফাইলের পরিবর্তে `aggressive` ডিফল্ট।

প্যাকেজটি তার পরিবেশ কনফিগারেশন থেকে নিজস্ব মডেল স্কোপ এবং প্রোফাইল নির্ধারণ করে।
OmniRoute কখনোই সিদ্ধান্তটি অন্যের ওপর ন্যস্ত করে না: অ্যাডাপ্টারটি মডেল গেটকে প্যাকেজের
সবচেয়ে সীমাবদ্ধ স্কোপে স্থির করে, ফলে হোস্ট পরিবেশের সেটিংস কেবল অনুমোদিত তালিকা সংকুচিত
করতে পারে, OmniRoute-এর পরিমাপ করা রসিদের সীমা ছাড়িয়ে কখনোই প্রসারিত করতে পারে না।

## ইঞ্জিন রেজিস্ট্রি

রেজিস্ট্রিটি `open-sse/services/compression/engines/registry.ts`-এ অবস্থিত। ইঞ্জিনগুলো একটি অভিন্ন
কনট্র্যাক্ট প্রকাশ করে:

- `id`: স্থিতিশীল ইঞ্জিন id, যেমন `caveman` বা `rtk`
- `apply(text, config)`: স্ট্যাকড পাইপলাইনগুলোর ব্যবহৃত লিগ্যাসি এক্সিকিউশন পাথ
- `compress(input, config)`: টেক্সট + পরিসংখ্যান ফেরত দেওয়া প্রধান এক্সিকিউশন পাথ
- `getConfigSchema()`: বৈধ config-এর JSON-Schema-সদৃশ কাঠামো ফেরত দেয়
- `validateConfig(config)`: `{ valid, errors[] }` ফেরত দেয়

রেজিস্ট্রেশনে `registerCompressionEngine(engine)` (অথবা উন্নত ব্যবহারের ক্ষেত্রে `registerEngine`)
ব্যবহার করা হয়, যা গ্রহণ করার আগে `assertValidEngine()` এবং `validateConfig(defaultConfig)` কল করে।
রানটাইমে কোনো ইঞ্জিন সরাতে `unregisterCompressionEngine(id)` ব্যবহার করুন।

কম্প্রেশন চালানোর আগে `strategySelector.ts` বিল্ট-ইন ইঞ্জিনগুলো রেজিস্টার করে। এর ফলে প্রিভিউ,
রানটাইম কম্প্রেশন, স্ট্যাকড মোড, পরীক্ষা এবং ভবিষ্যৎ ইঞ্জিনগুলো একই এক্সিকিউশন পাথ ব্যবহার করতে পারে।

### MCP বর্ণনা কম্প্রেশন (সম্পর্কিত)

একটি পৃথক রেজিস্ট্রি, রেজিস্ট্রি স্তরে MCP টুলের বর্ণনামূলক মেটাডেটা কম্প্রেস করে — দেখুন
`open-sse/mcp-server/descriptionCompressor.ts` এবং [MCP-SERVER.md](../frameworks/MCP-SERVER.md)। এটি
Caveman-এর নিয়মগুলো পুনরায় ব্যবহার করে, তবে রিকোয়েস্ট পেলোডের পরিবর্তে টুল মেটাডেটার ওপর কাজ করে।

### অতিরিক্ত বিল্ট-ইন ইঞ্জিন

Caveman, RTK এবং LLMLingua-2-এর পাশাপাশি, রেজিস্ট্রিতে বেশ কয়েকটি বিশেষায়িত লসলেস /
স্ট্রাকচারাল ইঞ্জিন রয়েছে (স্ট্যাকড পাইপলাইন, প্লেগ্রাউন্ড এবং পরীক্ষায় ব্যবহৃত):

| ইঞ্জিন        | Id              | এটি যা করে                                                                                                                                                                              |
| ------------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve (H4): বৃহৎ সংলগ্ন টেক্সট ব্লকগুলোকে কনটেন্ট-অ্যাড্রেসড রেফারেন্স দিয়ে প্রতিস্থাপন করে, ফলে পুনরাবৃত্ত/বৃহৎ ব্লকগুলো একবার পাঠানো হয় এবং এরপর রেফার করা হয়। |
| headroom      | `headroom`      | SmartCrusher (H3 + N5): সমজাতীয় JSON-array পেলোডকে কলামভিত্তিক `[N rows]` রূপে লসলেস ট্যাবুলার কমপ্যাকশন করে।                                                                          |
| ionizer       | `ionizer`       | অত্যন্ত বড় সমজাতীয় ব্লকের শুরু/মাঝ/শেষের সারি স্যাম্পল করে এবং বাদ দেওয়া মাঝের অংশটিকে CCR কনটেন্ট-অ্যাড্রেসড রেফারেন্স হিসেবে সংরক্ষণ করে।                                          |
| session-dedup | `session-dedup` | কনটেন্ট-অ্যাড্রেসড ক্রস-টার্ন ডিডুপ্লিকেশন (TokenMizer-অনুপ্রাণিত): একই সেশনের আগের টার্নগুলোতে ইতিমধ্যে দেখা টেক্সট বাদ দেয়।                                                          |

**CCR রিট্রিভ-প্রোটোকল নির্দেশনা (#8033):** কোনো রিকোয়েস্টে CCR প্রথমবার ≥1টি ব্লক প্রতিস্থাপন করলে,
ইঞ্জিনটি শুরুতে `[CCR protocol]` সেন্টিনেলসহ একটি একক, আইডেমপোটেন্ট `system` মেসেজ যোগ করে,
যা কলারকে মার্কার → টুল কনট্র্যাক্ট শেখায়: একটি `[CCR retrieve hash=<24hex> chars=N]` মার্কারের
অর্থ কী, হ্যাশটি হুবহু কপি করতে হবে (সবকটি 24টি হেক্স অক্ষর — ভুলভাবে কপি করা হ্যাশ সম্ভবত
"ব্লক পাওয়া যায়নি" ধরনের ব্যর্থতার কারণ), এবং একটি `[dedup:ref sha=...]` মার্কারের অর্থ
"ইতিহাসে পেছনে দেখুন", "টুলটি কল করুন" নয়। নোটটি **শুধুমাত্র তখনই ইনজেক্ট করা হয়, যখন কলারের
ঘোষিত `tools[]` প্রমাণ করে যে এটি সত্যিই `omniroute_ccr_retrieve`-এ পৌঁছাতে পারে**
(`open-sse/services/compression/engines/ccr/protocolInstruction.ts`-এর
`callerSupportsCcrRetrieve()`) — ওই টুল ছাড়া সাধারণ OpenAI-সামঞ্জস্যপূর্ণ কোনো কলার কখনোই
তার নাগালের বাইরে থাকা কিছু কল করার নির্দেশনা পায় না। ইনজেক্ট করার আগে মেসেজের ইতিহাসে
সেন্টিনেলটি স্ক্যান করে আইডেমপোটেন্সি নিশ্চিত করা হয়, ফলে মাল্টি-টার্ন রিকোয়েস্টগুলো (যেগুলো আগের
মেসেজ পুনরায় চালায়) প্রতি টার্নে নোটটির আরেকটি কপি যোগ করে না।

## Caveman

Caveman মোড সাধারণ গদ্যের অর্থভিত্তিক সংক্ষিপ্তকরণে গুরুত্ব দেয়:

- code block, URL, JSON, path এবং structured data অপরিবর্তিত রাখে
- অপ্রয়োজনীয় কথা, দ্বিধাসূচক ভাষা, পুনরাবৃত্ত প্রসঙ্গ এবং অতিরিক্ত সংযোগমূলক বাক্যাংশ সরিয়ে দেয়
- `open-sse/services/compression/rules/`-এ ভাষা-সচেতন file rule pack সমর্থন করে
- legacy `standard`, `aggressive` এবং `ultra` মোডের মাধ্যমেও উপলভ্য থাকে

dashboard-এর অবস্থান হলো `Dashboard -> Context & Cache -> Caveman`।

Caveman upstream অনুযায়ী, output token `~75%` কমে, benchmark-এ গড় output সাশ্রয় `65%`
এবং পরিসর `22-87%`; পাশাপাশি একটি `~46%` input-compression tool রয়েছে। stacked prompt/context
সাশ্রয় নথিভুক্ত করার সময় OmniRoute Caveman-এর input-side সংখ্যাটি ব্যবহার করে; Caveman output
মোড একটি পৃথক response-behavior feature হিসেবেই থাকে।

## RTK

RTK মোড command এবং tool output-এর ওপর গুরুত্ব দেয়:

- `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest, Cargo/Go test,
  TypeScript/Vite/Webpack build, ESLint, npm audit/install, Docker log,
  shell `find`/`grep`, stack trace এবং generic log-এর মতো output class শনাক্ত করে
- `open-sse/services/compression/engines/rtk/filters/` থেকে 49টি JSON filter প্রয়োগ করে
- RTK-ধাঁচের declarative pipeline সমর্থন করে: ANSI stripping, replace, match-output short-circuit,
  line strip/keep, per-line truncation, head/tail/max-line truncation এবং on-empty fallback
- `.rtk/filters.json`-এ trust-gated project filter এবং
  `DATA_DIR/rtk/filters.json`-এ global filter সমর্থন করে
- ANSI sequence, progress noise, পুনরাবৃত্ত line এবং অপ্রয়োজনীয় boilerplate সরিয়ে দেয়
- কার্যকর failure, warning, summary, পরিবর্তিত file এবং tail context সংরক্ষণ করে
- authenticated management route-এর মাধ্যমে recovery/debugging-এর জন্য ঐচ্ছিকভাবে redacted raw
  output ধরে রাখতে পারে

dashboard-এর অবস্থান হলো `Dashboard -> Context & Cache -> RTK`।

custom filter, trust, verify এবং raw-output recovery-এর পরিচালনাগত বিবরণ রয়েছে
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md)-এ।

RTK upstream অনুযায়ী, command-output compression-এ `60-90%` সাশ্রয় হয়। এর README উদাহরণে
30 মিনিটের একটি Claude Code session-এ token সংখ্যা `~118,000` থেকে `~23,900`-এ নেমে আসে,
অর্থাৎ `79.7%` সাশ্রয় হয়।

## LLMLingua-2 (Semantic Pruning)

LLMLingua-2 মোড একটি ছোট ONNX token classifier ব্যবহার করে গদ্যে **semantic token pruning**
সম্পাদন করে, যা rule-based Caveman এবং RTK engine-এর পরিপূরক:

- শুধু non-system message-এর গদ্য compress করে; fenced code block এবং অন্যান্য সংরক্ষিত
  construct কখনো পরিবর্তন করা হয় না
- একটি worker thread-এ `@atjsh/llmlingua-2` backend (ONNX via `@huggingface/transformers`)
  চালায়, ফলে model inference কখনো request event loop block করে না
- এটি **stackable** (`stackPriority` 35): stacked pipeline-এ এটি structural engine
  (CCR, session-dedup, headroom, Caveman)-এর পরে, কিন্তু `ultra`-এর আগে চলে; কারণ ইতিমধ্যে
  structurally-compressed text-এ semantic pruning সবচেয়ে কার্যকর — যেমন
  `rtk -> caveman -> llmlingua`
- **যেকোনো error-এ fail-open করে** (optional dep অনুপস্থিত থাকা, worker spawn, model load,
  inference অথবা timeout) → কোনো error নয়, মূল text অপরিবর্তিত অবস্থায় ফেরত দেওয়া হয়

Engine-এর অবস্থান: `open-sse/services/compression/engines/llmlingua/`। dashboard-এর অবস্থান
হলো `Dashboard -> Context & Cache -> LLMLingua`।

### Model

default model হলো **TinyBERT** (`atjsh/llmlingua-2-js-tinybert-meetingbank`, ~57 MB,
দ্রুত)। আরও নির্ভুল **BERT-base** model (`Arcoldd/llmlingua4j-bert-base-onnx`,
~710 MB) engine config-এর `model` field-এর মাধ্যমে উপলভ্য। প্রথম call-এ
`@huggingface/transformers` নির্বাচিত model-টি HuggingFace Hub থেকে
`${DATA_DIR}/models/llmlingua`-তে lazily download করে (`modelStore.ts`); এর পরিবর্তে
`modelPath` config override এটিকে একটি local copy-এর দিকে নির্দেশ করে (offline / air-gapped
installation)।

### Optional dependency ও on-demand installation

prunable LLMLingua runtime peer stack **optional**। দুটি package `package.json`-এ
`optionalDependencies` হিসেবে ঘোষিত এবং production build-এ **external** রাখা হয়েছে
(`scripts/build/prepublish.ts` এগুলো bundle করে না):

| Package              | Version (pin) | বিবরণ                                           |
| -------------------- | ------------- | ----------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`       | Entry package; অন্যগুলোকে peer হিসেবে ঘোষণা করে |
| `js-tiktoken`        | `^1.0.20`     | Tokenizer                                       |

`@huggingface/transformers`-কে `^4.2.0`-এ pin করা হয়েছে (local embeddings path-এর সঙ্গে
shared এবং standalone bundle-এও traced); `@atjsh/llmlingua-2@2.0.5` এর ওপর
`"^3.5.2 || ^4.0.0"` দিয়ে peer করে, তাই Transformers.js v3 এবং v4 উভয়ই সমর্থিত। 2.0.4
থেকে `@atjsh/llmlingua-2`-এর আর `@tensorflow/tfjs` প্রয়োজন হয় না, যার ফলে SLM stack থেকে
সবচেয়ে বড় একক অবদানকারী (TensorFlow.js) বাদ গেছে। শুধু ওপরের দুটি package-ই prunable SLM
peer। optional dependency বাদ না দিলে একটি standard `npm install` (dev) optional stack-টি
স্বয়ংক্রিয়ভাবে install করে।

**কেন on-demand:** আকার ছোট রাখার জন্য npm-এ প্রকাশিত package, standalone bundle এবং Docker
image এই dep-গুলো **ছাড়াই** সরবরাহ করা হয়। এগুলো অনুপস্থিত থাকলে worker-এর dependency
gate (`worker.ts`-এ একটি `@atjsh/llmlingua-2` resolve probe) ব্যর্থ হয় এবং engine
**নিঃশব্দে fail-open করে** — LLMLingua নির্বাচন no-op হয়ে যায় (text অপরিবর্তিত অবস্থায়
ফেরত দেওয়া হয়, কোনো error log করা হয় না)। pruned environment-এ এটি সক্রিয় করতে optional
stack install করুন:

```bash
# package.json optionalDependencies-এ ঘোষিত version-গুলোতে pin করুন
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

`@tensorflow/tfjs` অপসারণের (2.0.4+) ফলে আগে প্রাধান্য পাওয়া ~800 MB অবদানকারীটি বাদ গেছে
— অবশিষ্ট footprint হলো transformers.js + onnxruntime-node runtime, সঙ্গে প্রথম ব্যবহারে
download হওয়া TinyBERT model (~57 MB) (npm-এর মাধ্যমে নয়)।

প্রতিটি environment অনুযায়ী:

- **ডেভ / `npm install`** — আপনি `--omit=optional` (বা `--no-optional`) পাস না করলে
  স্বয়ংক্রিয়ভাবে ইনস্টল হয়। কোনো পদক্ষেপের প্রয়োজন নেই।
- **গ্লোবাল npm (`npm i -g omniroute`) / স্বতন্ত্র** — ইনস্টল করা প্যাকেজের ডিরেক্টরির ভিতরে
  উপরের ইনস্টল কমান্ডটি চালান, অথবা ঐচ্ছিক ডিপেন্ডেন্সি বাদ না দিয়ে পুনরায় ইনস্টল করুন।
- **Docker** — ডেরাইভড ইমেজের একটি লেয়ারে ইনস্টল কমান্ডটি যোগ করুন; প্রকাশিত ইমেজটি
  ইচ্ছাকৃতভাবে স্লিম রাখা হয়েছে।
- **VPS (PM2)** — অ্যাপের `node_modules`-এ ইনস্টল করুন, তারপর প্রসেসটি রিস্টার্ট করুন যাতে
  ওয়ার্কার গেটটি পুনরায় যাচাই করে।
- **কাঁচা Next স্বতন্ত্র (`npm run build` → `.build/next/standalone/server.js`)** — স্বতন্ত্র
  ট্রেসে ওয়ার্কার বা ঐচ্ছিক ডিপেন্ডেন্সি—কোনোটিই থাকে না, তাই ইঞ্জিনটি নীরবে ফেইল-ওপেন
  করে। `scripts/build/colocate-standalone.mjs` উভয়টিই পুনরায় প্রয়োগ করে (ওয়ার্কার esbuild +
  স্বতন্ত্র ট্রির মধ্যে ঐচ্ছিক-ডিপেন্ডেন্সি ক্লোজার); প্রতিটি বিল্ডের পর এটি
  `postbuild` npm হুকের মাধ্যমে স্বয়ংক্রিয়ভাবে চলে। এটি আইডেমপোটেন্ট এবং ডিপেন্ডেন্সি অনুপস্থিত থাকলে ফেইল-সফট করে।

**এটি সক্রিয় আছে কি না যাচাই করুন:** LLMLingua নির্বাচিত থাকলে বাস্তব গদ্য প্রকৃতপক্ষেই সংকুচিত হয় (ইঞ্জিনটি
ফেইল-ওপেন করা বন্ধ করে), এবং প্রথম রিকোয়েস্টে মডেলটি
`${DATA_DIR}/models/llmlingua`-তে ডাউনলোড হয়। গেটটি ইচ্ছাকৃতভাবে শুধু `@atjsh/llmlingua-2` যাচাই করে —
অন্য পিয়ারগুলো শুধু ESM-সমর্থিত এবং উপস্থিত থাকলেও সেগুলোর ক্ষেত্রে `require.resolve` ত্রুটি দেয় — তাই
`import()` করার সময় কোনো পিয়ার সত্যিই অনুপস্থিত থাকলে ওয়ার্কারটি তখনও ফেইল-ওপেন করে।

## স্ট্যাকড পাইপলাইন

স্ট্যাকড মোড পাইপলাইনের ধাপগুলো ক্রমানুসারে চালায়। ডিফল্ট হলো:

```txt
rtk -> caveman
```

এমন কোডিং-এজেন্ট সেশনের জন্য এটি ব্যবহার করুন, যেখানে একটি প্রম্পটে কমান্ড আউটপুটের সঙ্গে ব্যবহারকারী বা সহকারীর গদ্য একত্রিত থাকে। RTK প্রথমে অপ্রয়োজনীয় টুল লগ কমায়, তারপর Caveman অবশিষ্ট স্বাভাবিক ভাষাকে সংকুচিত করে।

কম্প্রেশন সেটিংসে `stackedPipeline` দিয়ে অথবা কম্প্রেশন কম্বোর মাধ্যমে পাইপলাইনের ধাপগুলো কনফিগার করা হয়।

যখন উভয় ইঞ্জিন একই উপযুক্ত পেলোডের আকার কমায়, তখন সাশ্রয় যৌগিকভাবে বৃদ্ধি পায়:

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## MCP অ্যাক্সেসিবিলিটি ট্রি ফিল্টার

MCP অ্যাক্সেসিবিলিটি-ট্রি স্মার্ট ফিল্টার হলো এক্সিকিউশন-পরবর্তী একটি কম্প্রেশন স্তর, যা প্রম্পট বা কনটেক্সটে নয়, MCP **টুলের ফলাফলে** চলে। এটি Playwright, computer-use এবং browser-automation MCP সার্ভারের মতো টুল থেকে ফেরত আসা অতিরিক্ত বিস্তারিত অ্যাক্সেসিবিলিটি-ট্রি ও ব্রাউজার স্ন্যাপশট পেলোডকে লক্ষ্য করে।

### এটি যা করে

1. **অপ্রয়োজনীয় অংশ অপসারণ** — খালি generic/text এন্ট্রি (`- generic:`, `- text: ""`) সরিয়ে দেয়
2. **সহোদর সংকোচন** — যখন পরপর ≥ `collapseThreshold` (ডিফল্ট 30) লাইন কাঠামোগতভাবে পুনরাবৃত্ত হয়, তখন সেগুলোকে প্রথম `collapseKeepHead` (ডিফল্ট 10) লাইন + একটি সংখ্যা-সারাংশ + শেষ `collapseKeepTail` (ডিফল্ট 5) লাইনে সংকুচিত করে
3. **Ref সংরক্ষণ** — Playwright/computer-use-এর জন্য প্রয়োজনীয় `[ref=eXX]` অ্যাঙ্কর কখনো পরিবর্তন করা হয় না
4. **কঠোর ট্রাঙ্কেশন** — সংকোচনের পরও টেক্সট `maxTextChars` (ডিফল্ট 50,000) অতিক্রম করলে, একটি নেভিগেশন নির্দেশনাসহ সেটিকে ছেঁটে দেয়, যাতে এজেন্ট কাজ চালিয়ে যেতে পারে

### ইঞ্জিনের অবস্থান

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← smartFilterText() এন্ট্রি পয়েন্ট
  collapseRepeated.ts ← সহোদর-সংকোচন অ্যালগরিদম
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### কনফিগারেশন

গ্লোবাল সেটিংসের `compression.mcpAccessibility` দ্বারা নিয়ন্ত্রিত (মাইগ্রেশন 056)। ডিফল্ট কনফিগ:

```json
{
  "enabled": true,
  "maxTextChars": 50000,
  "collapseThreshold": 30,
  "collapseKeepHead": 10,
  "collapseKeepTail": 5,
  "minLengthToProcess": 2000
}
```

ফিল্টারটি কেবল সেইসব টুল-ফলাফল পেলোডে প্রয়োগ করা হয়, যেগুলোর `type` হলো `"text"` এবং দৈর্ঘ্য `minLengthToProcess` অতিক্রম করে। এটি প্রম্পট কম্প্রেশন বা রিকোয়েস্ট পেলোডকে প্রভাবিত করে না।

### প্রত্যাশিত সাশ্রয়

পৃষ্ঠার জটিলতার ওপর নির্ভর করে ব্রাউজার স্ন্যাপশট টুলের ফলাফলে 60–80%। সংকোচন অ্যালগরিদমটি লাইনের সংখ্যার সাপেক্ষে O(n) এবং নগণ্য বিলম্ব যোগ করে।

### এই ফিল্টার বনাম উপরের কম্প্রেশন ইঞ্জিনগুলো

| দিক          | Caveman / RTK / Stacked       | MCP অ্যাক্সেসিবিলিটি ফিল্টার           |
| ------------ | ----------------------------- | -------------------------------------- |
| লক্ষ্য       | রিকোয়েস্ট প্রম্পট / কনটেক্সট | MCP টুলের ফলাফল                        |
| ট্রিগার      | কম্প্রেশন মোড সেটিং           | `compression.mcpAccessibility.enabled` |
| পরিধি        | সব SSE মেসেজ                  | শুধুমাত্র টুলের ফলাফল                  |
| Ref অ্যাঙ্কর | প্রযোজ্য নয়                  | নিঃশর্তভাবে সংরক্ষিত                   |

---

## কম্প্রেশন কম্বো

কম্প্রেশন কম্বো হলো নামযুক্ত কম্প্রেশন প্রোফাইল, যা রাউটিং কম্বোতে বরাদ্দ করা যায়:

- `compression_combos`: মোড, পাইপলাইন, RTK কনফিগ, ভাষা কনফিগ এবং ডিফল্ট চিহ্ন সংরক্ষণ করে
- `compression_combo_assignments`: একটি কম্প্রেশন কম্বোকে একটি রাউটিং কম্বোর সঙ্গে ম্যাপ করে
- রানটাইম ইন্টিগ্রেশন সাধারণ কম্বো ওভাররাইডের আগে বরাদ্দ করা কম্প্রেশন কম্বো নির্ধারণ করে
- অ্যানালিটিক্সে `compression_combo_id` এবং `engine` অন্তর্ভুক্ত থাকে

ড্যাশবোর্ডে অবস্থান: `Dashboard -> Context & Cache -> Compression Combos`।

## API পৃষ্ঠতল

| রুট                                    | উদ্দেশ্য                                              |
| -------------------------------------- | ----------------------------------------------------- |
| `/api/settings/compression`            | গ্লোবাল কম্প্রেশন সেটিংস (`mcpAccessibility` কনফিগসহ) |
| `/api/compression/preview`             | যেকোনো কম্প্রেশন মোডের প্রিভিউ                        |
| `/api/compression/language-packs`      | উপলভ্য Caveman ভাষা প্যাকের তালিকা                    |
| `/api/context/caveman/config`          | Caveman সেটিংসের উপনাম                                |
| `/api/context/rtk/config`              | RTK ডিফল্ট ও সেটিংস                                   |
| `/api/context/rtk/filters`             | RTK ফিল্টার ক্যাটালগ                                  |
| `/api/context/rtk/test`                | RTK প্রিভিউ/পরীক্ষা এন্ডপয়েন্ট                       |
| `/api/context/rtk/raw-output/[id]`     | প্রমাণীকৃত ও সম্পাদিত কাঁচা আউটপুট পুনরুদ্ধার         |
| `/api/context/combos`                  | কম্প্রেশন কম্বোর CRUD                                 |
| `/api/context/combos/[id]/assignments` | রাউটিং-কম্বো বরাদ্দের CRUD                            |
| `/api/context/analytics`               | কম্প্রেশন অ্যানালিটিক্সের উপনাম                       |

ম্যানেজমেন্ট রুটগুলোর জন্য ম্যানেজমেন্ট প্রমাণীকরণ অথবা API-কী নীতির যাচাই প্রয়োজন।

## MCP টুল

কম্প্রেশন পাঁচটি MCP টুল উন্মুক্ত করে:

| টুল                                 | স্কোপ               | উদ্দেশ্য                                |
| ----------------------------------- | ------------------- | --------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | সেটিংস, অ্যানালিটিক্স, ক্যাশ পরিসংখ্যান |
| `omniroute_compression_configure`   | `write:compression` | গ্লোবাল সেটিংস আপডেট করা                |
| `omniroute_set_compression_engine`  | `write:compression` | মোড ও ঐচ্ছিক পাইপলাইন সেট করা           |
| `omniroute_list_compression_combos` | `read:compression`  | কম্প্রেশন কম্বোর তালিকা                 |
| `omniroute_compression_combo_stats` | `read:compression`  | কম্বো/ইঞ্জিন অ্যানালিটিক্স পড়া         |

## পরিধি ও বর্জন

**এম্বেডিংস কখনোই কম্প্রেস করা হয় না।** `open-sse/handlers/embeddings.ts` কখনো কোনো
কম্প্রেশন ইঞ্জিন কল করে না — অনুরোধ/প্রতিক্রিয়ার বডি অপরিবর্তিত অবস্থায় সরাসরি এক্সিকিউটরের
কাছে যায়। বর্তমানে এটি কাঠামোগত (এম্বেডিংস ও চ্যাট কমপ্লিশনের হ্যান্ডলার আলাদা), কোনো
রানটাইম যাচাই নয়; তবে এর অর্থ হলো #8034-এর ভেক্টর-বিকৃতি-সংক্রান্ত উদ্বেগের জন্য
এম্বেডিংস পাথে কোনো উন্মুক্ত ক্ষেত্র নেই।

**প্রতি-মডেল/এন্ডপয়েন্ট বর্জন ফিল্টার (#8034)।** চ্যাট কমপ্লিশনের ক্ষেত্রে একজন অপারেটর
এমন মডেল আইডি / `provider/model` টার্গেট নির্দিষ্ট করতে পারেন, যেগুলো কখনোই কম্প্রেস করা
যাবে না — ভবিষ্যতে কম্প্রেশনকে যদি এম্বেডিংস-সংলগ্ন কোনো পাথের আরও কাছে সংযুক্ত করা হয়,
তাহলে এটি একটি কার্যকর সুরক্ষাব্যবস্থা; পাশাপাশি যেকোনো মডেলের ক্ষেত্রে এটি সাধারণভাবে
উপযোগী, যেখানে হুবহু বাইট-অনুযায়ী প্রম্পট গুরুত্বপূর্ণ (নির্ধারণমূলক মূল্যায়ন,
ক্যাশ-সংবেদনশীল প্রিফিক্স ইত্যাদি)।

- সেটিংস ফিল্ড: গ্লোবাল কম্প্রেশন কনফিগে `exclusions?: string[]`
  (`GET`/`PUT /api/settings/compression`), বিদ্যমান `key_value` কম্প্রেশন
  নেমস্পেসের (`src/lib/db/compression.ts`) মাধ্যমে সংরক্ষিত — কোনো নতুন টেবিল নয়।
- ড্যাশবোর্ড ট্যাব: **Dashboard → Compression → Exclusions**
  (`/dashboard/compression/exclusions`)।
- প্যাটার্ন সিনট্যাক্স: `*` হলো একমাত্র ওয়াইল্ডকার্ড। একটি প্যাটার্নের অন্যান্য সব regex
  মেটাক্যারেক্টার ম্যাচিংয়ের আগে এস্কেপ করা হয়, ফলে `gpt-5.6` শুধু আক্ষরিক স্ট্রিংটির
  সঙ্গেই মেলে, কখনোই `gpt-5x6`-এর সঙ্গে নয় (ReDoS-নিরাপদ, সীমাবদ্ধ, কোনো নেস্টেড
  কোয়ান্টিফায়ার নেই)। প্যাটার্নগুলো বেয়ার মডেল আইডি এবং `provider/model` কম্পোজিট—উভয়ের
  সঙ্গেই কেস-ইনসেনসিটিভভাবে মেলে — `gpt-5-6`, `openai/gpt-5-6` এবং `openai/*`
  সবই কাজ করে, আর শুধু `*` প্রতিটি মডেলকে বাদ দেয়।
- ম্যাচিং: `open-sse/services/compression/exclusions.ts`-এ
  `isCompressionExcluded()` / `normalizeCompressionExclusions()`। `chatCore.ts`
  কম্প্রেশন সেটিংস নির্ধারণের ঠিক পরেই, **কোনো ইঞ্জিন চালানোর আগে**, বর্জিত টার্গেট যাচাই
  করে এবং কোনো মিল পাওয়াকে গ্লোবালভাবে কম্প্রেশন নিষ্ক্রিয় থাকার মতোই বিবেচনা করে —
  অনুরোধের বডি নিশ্চিতভাবে বাইট-অভিন্ন থাকে। অ্যানালিটিক্সে দৃশ্যমানতার জন্য এড়িয়ে যাওয়ার
  ঘটনাটি `writeCompressionSkip(..., "excluded")`-এর মাধ্যমে রেকর্ড করা হয়।
- ডিফল্ট (খালি/অনুপস্থিত তালিকা): #8034-এর আগের আচরণের সঙ্গে অভিন্ন — কিছুই বাদ দেওয়া হয় না।

## পরিচিত সীমাবদ্ধতা

- **LLMLingua-2 (SLM)-এর জন্য একই স্থানে থাকা ঐচ্ছিক ডিপেন্ডেন্সি প্রয়োজন।** ওয়ার্কারটি
  production build-এ কেবল তখনই চলে, যখন `@atjsh/llmlingua-2` + peers-কে
  `dist/node_modules`-এ একই স্থানে রাখা হয় (`scripts/build/colocateOptionals.mjs`, #4286 দেখুন)। এগুলো ছাড়া
  ইঞ্জিনটি fail-open করে (মূল টেক্সট ফেরত দেয়)। ওয়ার্কার রেজোলিউশন আর
  `import.meta.url`-এর ওপর নির্ভর করে না (standalone bundle-এ এটি ব্যর্থ হয়) — এটি runtime
  cwd / `argv[1]`-কে ভিত্তি হিসেবে ব্যবহার করে।
- **Caveman ভাষা প্যাক `de` / `fr` / `ja` আংশিক।** এগুলোর সঙ্গে `context` +
  `filler` + `structural` নিয়ম থাকে, কিন্তু কোনো `dedup` / `ultra` প্যাক থাকে না, তাই ওই ভাষাগুলোর ক্ষেত্রে `ultra` তীব্রতা
  `full`-এর চেয়ে বেশি শক্তিশালী নয় (এগুলো কেবল নিজস্ব নিয়ম ব্যবহার করে — ইংরেজি `dedup`/`ultra` নিয়মে কোনো
  নীরব fall-back নেই, যা বিদেশি টেক্সট বিকৃত করতে পারে)।
  `en` / `es` / `id` / `pt-BR` সম্পূর্ণ। আংশিক প্যাকগুলোর জন্য `dedup.json` + `ultra.json`
  অবদান স্বাগত।
- **স্ট্যাকড টেলিমেট্রি কেবল সেই ইঞ্জিনগুলো তালিকাভুক্ত করে যেগুলো কম্প্রেস করেছে।** কোনো স্ট্যাকড-পাইপলাইন ধাপের
  ইঞ্জিন চললেও যদি 0 % সাশ্রয় হয়, তবে সেটি `stats:null` ফেরত দেয় এবং তাই
  `engineBreakdown`-এ দেখা যায় না — ফলে এটি বাদ পড়া কোনো ধাপ থেকে আলাদা করে বোঝা যায় না।
  "চলেছে, 0 %" এবং "বাদ পড়েছে"-এর মধ্যে পার্থক্য করতে breakdown-model পরিবর্তন প্রয়োজন, তাই এটি স্থগিত রাখা হয়েছে।

## যাচাইকরণ

এই ক্ষেত্রের জন্য কেন্দ্রীভূত যাচাই-ধাপগুলো হলো:

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
