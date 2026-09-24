# Skills Framework (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **মূল উৎস:** `src/lib/skills/` এবং `src/app/api/skills/`
> **সর্বশেষ হালনাগাদ:** 2026-06-28 — v3.8.40

OmniRoute একটি সম্প্রসারণযোগ্য Skills ফ্রেমওয়ার্ক প্রদান করে, যা ভাষা মডেলগুলোকে (এবং অপারেটরদের) পুনর্ব্যবহারযোগ্য সক্ষমতা সমন্বয় করতে দেয় — ফাইলসিস্টেম থেকে পড়া এবং HTTP অনুরোধ থেকে শুরু করে স্যান্ডবক্সে কোড নির্বাহ এবং বাছাইকৃত মার্কেটপ্লেস স্কিল পর্যন্ত।

একটি স্কিল হলো সংস্করণযুক্ত, স্কিমা-সংজ্ঞায়িত কাজের একক। OmniRoute বহির্গামী অনুরোধে টুলের সংজ্ঞা হিসেবে স্কিল ইনজেক্ট করতে পারে, মডেল থেকে ফিরে আসা টুল কলগুলো আটকাতে পারে, সংশ্লিষ্ট হ্যান্ডলার চালাতে পারে এবং ফলাফলটি আবার মডেলে পাঠাতে পারে, যাতে কথোপকথন চলতে থাকে। মডেল কখনোই বাস্তবায়নটি দেখতে পায় না — শুধু টুল ইন্টারফেসটি দেখে।

---

## Agent Skills বনাম Omni Skills

OmniRoute-এ দুটি স্বতন্ত্র কিন্তু পরস্পর-পরিপূরক স্কিল সিস্টেম রয়েছে:

| মাত্রা           | **Omni Skills** (এই নথি)                                          | **Agent Skills**                                                                          |
| :--------------- | :---------------------------------------------------------------- | :---------------------------------------------------------------------------------------- |
| উদ্দেশ্য         | LLM টুল ইনজেকশন + স্যান্ডবক্সে নির্বাহ                            | বহিরাগত এজেন্টদের আবিষ্কার ও ব্যবহারের জন্য SKILL.md ক্যাটালগ                             |
| মূল উৎস          | `src/lib/skills/` + মার্কেটপ্লেস                                  | `src/lib/agentSkills/` + `skills/` ডিরেক্টরি                                              |
| রানটাইম মোড      | বহির্গামী অনুরোধে ইনজেক্ট করা হয়, টুল-কল ইভেন্টে নির্বাহ করা হয় | স্ট্যাটিক মার্কডাউন ক্যাটালগ + REST/MCP/A2A ডিসকভারি এন্ডপয়েন্ট                          |
| কারা ব্যবহার করে | OmniRoute নিজেই (কম্বো রাউটিং, ইনবাউন্ড LLM কল)                   | বহিরাগত এজেন্ট, MCP ক্লায়েন্ট, A2A অর্কেস্ট্রেটর                                         |
| সংখ্যা           | পরিবর্তনশীল (মার্কেটপ্লেস-চালিত)                                  | 45টি ক্যাটালগ এন্ট্রি (23টি API + 21টি CLI + 1টি কনফিগ)                                   |
| ফরম্যাট          | টুল স্কিমা + হ্যান্ডলারসহ `SkillDefinition`                       | `SKILL.md` ফ্রন্টম্যাটার + মার্কডাউন বডি                                                  |
| আবিষ্কার         | `/api/skills/*` REST + `omniroute_skills_*` MCP টুল               | `/api/agent-skills/*` REST + `omniroute_agent_skills_*` MCP টুল + A2A `list-capabilities` |

**Omni Skills** হলো এক্সিকিউশন ইঞ্জিন — কোনো LLM একটি টুল আহ্বান করলে OmniRoute _কী করতে পারে_, তা এগুলো সংজ্ঞায়িত করে।

**Agent Skills** হলো ডকুমেন্টেশন ক্যাটালগ — বহিরাগত এজেন্টগুলোকে OmniRoute-এর REST API এবং CLI _কীভাবে ব্যবহার করতে হয়_, তা এগুলো ব্যাখ্যা করে; এর জন্য এমন কাঠামোবদ্ধ SKILL.md ফাইল ব্যবহার করা হয়, যেগুলো সরাসরি এজেন্ট প্রম্পটে প্রদান করা যায়।

Agent Skills ক্যাটালগ, জেনারেটর, MCP টুল এবং A2A স্কিল সম্পর্কে জানতে [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md) দেখুন।

---

## ধারণাসমূহ

### স্কিলের উৎস

একই রেজিস্ট্রিতে স্কিলের তিনটি উৎস পাশাপাশি বিদ্যমান:

1. **বিল্ট-ইন স্কিল** (`src/lib/skills/builtins.ts`) — OmniRoute-এর সঙ্গে সরবরাহ করা হয়। সাধারণ ব্যবহারের ক্ষেত্রগুলো অন্তর্ভুক্ত করে:
   - `file_read`, `file_write` — `<DATA_DIR>/skills/workspaces/<hashed-key>/`-এর অধীনে প্রতি-API-কীর জন্য স্যান্ডবক্স ওয়ার্কস্পেস
   - `http_request` — `guard: "public-only"`-সহ `safeOutboundFetch`-এর মাধ্যমে বহির্গামী HTTP
   - `web_search` — ক্যাশিংসহ পরিবর্তনযোগ্য সার্চ প্রদানকারী (`executeWebSearch`)
   - `eval_code` — Docker-স্যান্ডবক্সে `node` বা `python` নির্বাহ
   - `execute_command` — Docker-স্যান্ডবক্সে শেল কমান্ড
   - `browser` — Playwright-ভিত্তিক প্রাথমিক কাঠামো, ডিফল্টভাবে নিষ্ক্রিয় (`builtin/browser.ts`)
2. **SkillsMP** (OmniRoute Marketplace) — `https://skillsmp.com/api/v1/skills/search` থেকে আনা হয়। Settings-এ `skillsmpApiKey` প্রয়োজন।
3. **SkillsSH** (`skills.sh` কমিউনিটি ক্যাটালগ) — `https://skills.sh/api/search` থেকে আনা হয়। কোনো প্রমাণীকরণের প্রয়োজন নেই; SKILL.md কনটেন্ট GitHub raw থেকে নেওয়া হয়।

একটি একক "সক্রিয় প্রদানকারী" নিয়ন্ত্রণ করে ড্যাশবোর্ড কোন ক্যাটালগ থেকে ইনস্টল করবে (`src/lib/skills/providerSettings.ts`)। **Settings → Memory & Skills**-এর অধীনে এটি পরিবর্তন করুন। ডিফল্ট: `skillsmp`।

### স্কিলের পরিচয়

ইন-মেমরি রেজিস্ট্রিতে (`src/lib/skills/registry.ts`) স্কিলগুলো `name@version` অনুযায়ী কী করা হয়। সংস্করণটি অবশ্যই semver (`^\d+\.\d+\.\d+$`) হতে হবে। `resolveVersion()` `^`, `~`, `>`, `>=`, `<`, `<=`, `==` এবং হুবহু-মিলের কনস্ট্রেইন্ট বোঝে।

### স্কিল মোড

প্রতিটি স্কিলের একটি রানটাইম মোড রয়েছে, যা সেটি কখন ইনজেক্ট করা হবে তা নিয়ন্ত্রণ করে:

| মোড    | আচরণ                                                                                              |
| ------ | ------------------------------------------------------------------------------------------------- |
| `on`   | সবসময় টুলের সংজ্ঞা হিসেবে ইনজেক্ট করা হয়                                                        |
| `off`  | কখনোই ইনজেক্ট করা হয় না, কখনোই নির্বাহযোগ্য নয়                                                  |
| `auto` | আগত অনুরোধের বিপরীতে স্কোর করা হয়; স্কোর ≥ `AUTO_MIN_SCORE` (ডিফল্ট 3) হলেই শুধু ইনজেক্ট করা হয় |

মার্কেটপ্লেস থেকে ইনস্টল করা স্কিলের জন্য `auto` হলো ডিফল্ট। `enabled=true` এবং `mode="off"` একসঙ্গে থাকার অর্থ হলো "নিবন্ধিত কিন্তু নিষ্ক্রিয়" — লিগ্যাসি কলামের মাধ্যমে `enabled` টগল করলে `mode`-ও পরিবর্তিত হয়, যাতে পুরোনো কোডপাথগুলো সামঞ্জস্যপূর্ণ থাকে (`src/app/api/skills/[id]/route.ts`)।

### স্ট্যাটাস (নির্বাহসমূহ)

স্কিল নির্বাহগুলো `skill_executions` টেবিলে নিম্নলিখিত স্ট্যাটাসসহ ট্র্যাক করা হয় (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### রেজিস্ট্রি ক্যাশ

`SkillRegistry` হলো 60-সেকেন্ড TTL ক্যাশসহ একটি সিঙ্গেলটন (`registry.ts:14`)। `loadFromDatabase()` আইডেমপোটেন্ট এবং `pendingLoad`-এর মাধ্যমে সমবর্তী কলগুলোর সদৃশতা দূর করে। যেকোনো লেখা (`register`/`unregister`/`unregisterById`) ক্যাশ অকার্যকর করে। `getSkillVersions(name)` এবং `resolveVersion(name, constraint)`-এর মাধ্যমে সংস্করণ খুঁজুন।

### প্রদানকারী-সচেতন ইনজেকশন

`src/lib/skills/injection.ts`-এর `injectSkills()` হলো সেই এন্ট্রি পয়েন্ট, যা নিবন্ধিত স্কিলগুলোকে প্রদানকারী-নির্দিষ্ট টুলের সংজ্ঞায় রূপান্তর করে:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

টুলের নামটি `name@version` হিসেবে এনকোড করা হয়, যাতে মডেল এটিকে কল করলে হ্যান্ডলার সঠিক সংস্করণটি বেছে নিতে পারে।

### AUTO স্কোরিং

যখন `mode="auto"` থাকে, তখন প্রতিটি প্রার্থী স্কিলকে অনুরোধের প্রসঙ্গের বিপরীতে স্কোর করা হয় (`injection.ts`-এ `scoreAutoSkill()`):

| সংকেত                                                         | পয়েন্ট         |
| ------------------------------------------------------------- | --------------- |
| স্কিলের নাম প্রসঙ্গে অবিকল উপস্থিত থাকে                       | +6              |
| নামের প্রতিটি টোকেন প্রসঙ্গের একটি টোকেনের সঙ্গে মেলে         | +2              |
| প্রতিটি ট্যাগ সাবস্ট্রিং প্রসঙ্গের সঙ্গে মেলে                 | +3              |
| বিবরণের প্রতিটি টোকেন প্রসঙ্গের সঙ্গে মেলে                    | +1              |
| ব্যাকগ্রাউন্ড কারণ নামের একটি টোকেনের সঙ্গে মেলে              | প্রতি টোকেনে +2 |
| ব্যাকগ্রাউন্ড কারণ একটি ট্যাগের সঙ্গে মেলে                    | প্রতি টোকেনে +2 |
| ট্যাগে থাকা প্রোভাইডার হিন্ট অনুরোধের প্রোভাইডারের সঙ্গে মেলে | +2 / −2         |

`score >= AUTO_MIN_SCORE = 3` থাকা শীর্ষ `AUTO_MAX_SKILLS = 5`টি স্কিল ইনজেক্ট করা হয়। টাই হলে প্রথমে `installCount` (অবরোহী), তারপর নামের বর্ণানুক্রমিক ক্রম (`injection.ts:225-235`) অনুযায়ী অগ্রাধিকার নির্ধারণ করা হয়।

### টুল কল ইন্টারসেপশন

আপস্ট্রিম থেকে টুল-কলিং রেসপন্স ফেরত আসার পর চ্যাট হ্যান্ডলার `src/lib/skills/interception.ts`-এর `handleToolCallExecution()` কল করে:

1. `extractToolCalls()` প্রোভাইডার-নির্দিষ্ট কাঠামো পড়ে (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`)।
2. বিল্ট-ইন টুল অ্যালিয়াসগুলো (যেমন `omniroute_web_search` → `web_search`) প্রথমে রিজলভ করা হয়। বিল্ট-ইন হ্যান্ডলারগুলো ইনলাইনে চলে।
3. অন্য সবকিছু `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`-এর মাধ্যমে রাউট করা হয়।
4. ফলাফলগুলো উপযুক্তভাবে রেসপন্সে পুনরায় যুক্ত করা হয়—`tool_results`, `function_call_output` আইটেম, অথবা Anthropic `tool_result` ব্লক হিসেবে।

এক্সিকিউশন প্রসঙ্গে `customSkillExecutionEnabled`-কে `false` সেট করা যায়, যাতে শুধু বিল্ট-ইন ইন্টারসেপশনের অনুমতি দেওয়া হয় (যেসব রিকোয়েস্ট পাথ ব্যবহারকারী-সংজ্ঞায়িত হ্যান্ডলারগুলো স্পষ্টভাবে নিষ্ক্রিয় করে, সেগুলোতে এটি ব্যবহৃত হয়)।

---

## Docker স্যান্ডবক্স

নন-বিল্টইন কোড পাথগুলো (`eval_code`, `execute_command`) `SandboxRunner` (`src/lib/skills/sandbox.ts`)-এর মাধ্যমে Docker-এর ভেতরে চলে। প্রতিটি কন্টেইনার নিম্নলিখিত অপশনসহ চালু করা হয়:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (যখন readOnly=true)
```

ডিফল্ট মান (`SandboxRunner.DEFAULT_CONFIG`):

| ফিল্ড            | ডিফল্ট          | নোট                                                |
| ---------------- | --------------- | -------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU) | `--cpus`-এ পাঠানোর আগে 1000 দিয়ে ভাগ করা হয়      |
| `memoryLimit`    | 256 MB          | হার্ড লিমিট                                        |
| `timeout`        | 30000 ms        | `SIGTERM` + `docker kill`-এর মাধ্যমে সফট কিল       |
| `networkEnabled` | `false`         | `--network none`-এ রূপান্তরিত হয়                  |
| `readOnly`       | `true`          | রুট FS রিড-অনলি; `/tmp` এবং `/workspace` হলো tmpfs |

শাটডাউনের জন্য `SandboxRunner.kill(id)` এবং `killAll()` উন্মুক্ত রাখা হয়েছে; চলমান কন্টেইনারগুলো `runningContainers: Map<string, ChildProcess>`-এ ট্র্যাক করা হয়।

### স্যান্ডবক্স এনভায়রনমেন্ট ভেরিয়েবল

`src/lib/skills/builtins.ts`-এ `process.env`-এর মাধ্যমে কনফিগার করা হয়:

| এনভায়রনমেন্ট ভেরিয়েবল           | ডিফল্ট           | উদ্দেশ্য                                                                    |
| --------------------------------- | ---------------- | --------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB) | `file_read` এবং `file_write`-এর সীমা                                        |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`         | `http_request` রেসপন্স বডির সীমা                                            |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`         | কলারের কাছে ফেরত দেওয়া stdout/stderr-এর সীমা                               |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`          | স্যান্ডবক্সড কমান্ডের ডিফল্ট টাইমআউট; সর্বোচ্চ 60 s                         |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`          | ইগ্রেসের মাস্টার গেট। প্রতি-কলে অপ্ট-ইন অনুমোদন করতে `1` বা `true` সেট করুন |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (নিচে দেখুন)     | কমা দিয়ে পৃথক করা Docker ইমেজের অ্যালাওলিস্ট                               |

ডিফল্ট অনুমোদিত ইমেজ: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`। `SKILLS_ALLOWED_SANDBOX_IMAGES`-এর মাধ্যমে যোগ করা যেকোনো ইমেজ ডিফল্টগুলোর সঙ্গে মার্জ করা হয়; অজানা ইমেজ `normalizeImage()` দ্বারা প্রত্যাখ্যান করা হয়।

> নোট: আলাদা কোনো `SKILLS_EXECUTION_TIMEOUT_MS` এনভায়রনমেন্ট ভেরিয়েবল নেই। নন-স্যান্ডবক্স হ্যান্ডলারের টাইমআউট `SkillExecutor` (`executor.ts:13`)-এ 30 s হিসেবে হার্ড-কোড করা, তবে রানটাইমে `skillExecutor.setTimeout(ms)`-এর মাধ্যমে এটি ওভাররাইড করা যায়।

### ওয়ার্কস্পেস আইসোলেশন

`file_read` এবং `file_write` প্রতিটি পাথকে `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`-এ থাকা প্রতি-API-কির জন্য নির্ধারিত ওয়ার্কস্পেসের সাপেক্ষে রিজলভ করে। যেকোনো ডিস্ক I/O-এর আগে পাথ ট্রাভার্সাল (`..`) এবং নিষিদ্ধ সেগমেন্ট (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) প্রত্যাখ্যান করা হয়।

### HTTP হার্ডেনিং

`http_request` (`builtins.ts:257`):

- মেথড অ্যালাওলিস্ট: `GET, HEAD, POST, PUT, PATCH, DELETE`
- ব্লক করা আউটবাউন্ড হেডার: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- রিডাইরেক্ট নিষ্ক্রিয় (`allowRedirect: false`)
- `guard: "public-only"` সহ `safeOutboundFetch`-এর মাধ্যমে রাউট করা হয় (প্রাইভেট/লুপব্যাক রেঞ্জ ব্লক করা)
- রেসপন্স `SKILLS_MAX_HTTP_RESPONSE_BYTES`-এ ট্রাঙ্কেট করা হয়; ক্লায়েন্ট `truncated: true` দেখতে পায়

---

## হাইব্রিড এক্সিকিউটর (প্রিভিউ)

`src/lib/skills/hybrid.ts` একটি `HybridExecutor` নির্ধারণ করে, যা প্রতিটি কলের জন্য `direct` (ইন-প্রসেস) ও `sandbox` এক্সিকিউশনের মধ্যে সিদ্ধান্ত নেয় এবং টাইমআউট/মেমরি ত্রুটির ক্ষেত্রে একটি `autoUpgrade` পুনঃচেষ্টা-পথ ব্যবহার করে। সংযুক্ত `directExecutor` / `sandboxRunner` ইমপ্লিমেন্টেশনগুলো স্টাব (`executeDirect`, `executeInSandbox` প্লেসহোল্ডার অবজেক্ট রিটার্ন করে) — এই মডিউলটিকে নির্মাণাধীন একটি কনট্র্যাক্ট হিসেবে বিবেচনা করুন। প্রকৃত এক্সিকিউশন এখনো `skillExecutor` + `SandboxRunner`-এর মাধ্যমেই সম্পন্ন হয়।

---

## স্টোরেজ

স্কিমা দুটি মাইগ্রেশনে রয়েছে:

- `src/lib/db/migrations/016_create_skills.sql` — মূল `skills` ও `skill_executions` টেবিল, যেখানে `(api_key_id, name)` এবং `(skill_id, status, created_at)`-এর ওপর ইনডেক্স রয়েছে।
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — `skills`-এ `mode`, `source_provider`, `tags` (JSON), `install_count` যোগ করে।

`skill_executions.status` ডেটাবেস স্তরে সীমাবদ্ধ: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`।

---

## REST API

সব এন্ডপয়েন্ট `src/app/api/skills/`-এর অধীনে রয়েছে। ম্যানেজমেন্ট এন্ডপয়েন্টগুলোর (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) জন্য `requireManagementAuth()`-এর মাধ্যমে **ম্যানেজমেন্ট অথেন্টিকেশন** প্রয়োজন। মার্কেটপ্লেস/ইনস্টল ফ্লোগুলো অপেক্ষাকৃত হালকা `isAuthenticated()` (সেশন বা API কী) ব্যবহার করে।

| এন্ডপয়েন্ট | মেথড | উদ্দেশ্য |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | নিবন্ধিত স্কিলের তালিকা দেখায়। `?q=`, `?mode=on                        | off | auto`, `?source=skillsmp | skillssh | local`, পেজিনেশন সমর্থন করে |
| `/api/skills/[id]` | PUT | `enabled` বা `mode` আপডেট করে |
| `/api/skills/[id]` | DELETE | id অনুসারে নিবন্ধন বাতিল করে |
| `/api/skills/install` | POST | একটি কাস্টম স্কিল ইনস্টল করে (হ্যান্ডলার কোড + স্কিমা) |
| `/api/skills/marketplace` | GET | SkillsMP ক্যাটালগে অনুসন্ধান করে (`q` খালি থাকলে জনপ্রিয় ডিফল্টগুলো রিটার্ন করে) |
| `/api/skills/marketplace/install` | POST | একটি SkillsMP স্কিল ইনস্টল করে (সক্রিয় প্রোভাইডার = `skillsmp` হওয়া আবশ্যক) |
| `/api/skills/skillssh` | GET | skills.sh ক্যাটালগে অনুসন্ধান করে (`?q=&limit=`, সর্বোচ্চ 100) |
| `/api/skills/skillssh/install` | POST | একটি skills.sh স্কিল ইনস্টল করে (সক্রিয় প্রোভাইডার = `skillssh` হওয়া আবশ্যক) |
| `/api/skills/executions` | GET | পেজিনেটেড এক্সিকিউশন ইতিহাস (`?apiKeyId=`) |
| `/api/skills/executions` | POST | নিবন্ধিত একটি স্কিল অ্যাড-হকভাবে এক্সিকিউট করে |

`settings.skillsEnabled === false` হলে `POST /api/skills/executions` এন্ডপয়েন্টটি `{ error: "Skills execution is disabled..." }`-সহ HTTP `503` রিটার্ন করে (`executor.ts:42-45`)। অপারেটররা **Settings → AI** থেকে মাস্টার সুইচ পরিবর্তন করতে পারেন।

### উদাহরণ: একটি কাস্টম স্কিল ইনস্টল করা

```bash
curl -X POST http://localhost:20128/api/skills/install \
  -H "Authorization: Bearer $OMNIROUTE_MGMT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "reverse-text",
    "version": "1.0.0",
    "description": "Reverses a string",
    "schema": {
      "input":  { "type": "object", "properties": { "text": { "type": "string" } }, "required": ["text"] },
      "output": { "type": "object", "properties": { "reversed": { "type": "string" } } }
    },
    "handlerCode": "echo-handler",
    "apiKeyId": "your-api-key-id"
  }'
```

`handlerCode` স্ট্রিংটি একটি **হ্যান্ডলার নামের লুকআপ** — এক্সিকিউটেবল কোড নয়। এক্সিকিউটর এটিকে `skillExecutor.registerHandler(name, fn)`-এর মাধ্যমে ম্যাপ করে (`executor.ts:25`)। মার্কেটপ্লেস ইনস্টলগুলো এই ফিল্ডে SKILL.md-এর টেক্সট ডকুমেন্টেশন হিসেবে সংরক্ষণ করে এবং মডেল-জেনারেটেড টুল কলের মাধ্যমে এক্সিকিউশন রাউট করে। ব্যবহারকারীর সরবরাহ করা যেকোনো সোর্স নির্বিচারে eval করা হয় না।

---

## MCP টুলসমূহ

চারটি MCP টুল স্কিল সারফেসকে র্যাপ করে (`open-sse/mcp-server/tools/skillTools.ts`)। MCP সার্ভার চালু হলে এগুলো স্বয়ংক্রিয়ভাবে নিবন্ধিত হয়।

| টুল                           | বিবরণ                                                                |
| ----------------------------- | -------------------------------------------------------------------- |
| `omniroute_skills_list`       | স্কিলের তালিকা দেখায়; ঐচ্ছিক ফিল্টার: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | `skillId` ব্যবহার করে কোনো স্কিল সক্রিয়/নিষ্ক্রিয় করে              |
| `omniroute_skills_execute`    | একটি ইনপুট পেলোড দিয়ে কোনো স্কিল নির্বাহ করে                        |
| `omniroute_skills_executions` | সাম্প্রতিক নির্বাহের ইতিহাস (ডিফল্ট 50, সর্বোচ্চ 100)                |

ট্রান্সপোর্ট সেটআপ এবং স্কোপ অ্যাসাইনমেন্টের জন্য [MCP-SERVER.md](./MCP-SERVER.md) দেখুন।

---

## A2A ইন্টিগ্রেশন

`src/lib/skills/a2a.ts` থেকে `memory_aware_routing` A2A স্কিল ডেসক্রিপ্টর এবং একটি `registerA2ASkill(registry)` সহায়ক এক্সপোর্ট করা হয়। কাস্টম A2A স্কিলগুলো `src/lib/a2a/skills/`-এ থাকে এবং `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`)-এর মাধ্যমে ডিসপ্যাচ করা হয়। সম্পূর্ণ টাস্ক লাইফসাইকেলের জন্য [A2A-SERVER.md](./A2A-SERVER.md) দেখুন।

---

## একটি নতুন বিল্ট-ইন স্কিল যোগ করা

1. **হ্যান্ডলারটি সংজ্ঞায়িত করুন** `src/lib/skills/builtins.ts`-এ (অথবা `src/lib/skills/builtin/`-এর অধীনে কোনো সমপর্যায়ের ফাইলে)। সিগনেচার: `(input, { apiKeyId, sessionId }) => Promise<output>`।
2. **স্যান্ডবক্সযুক্ত কোড পাথ?** `sandboxRunner.run(image, command, env, sandboxConfig({...}))` কল করুন। অ্যালাউলিস্টের বিপরীতে `normalizeImage()` ব্যবহার করুন।
3. **ফাইলসিস্টেম পাথ?** ডিস্ক অ্যাক্সেস করার আগে সর্বদা `resolveWorkspacePath(input, context)`-এর মধ্য দিয়ে পাঠান।
4. **নেটওয়ার্ক কল?** `guard: "public-only"` সহ `safeOutboundFetch` ব্যবহার করুন; `sanitizeHeaders()` দিয়ে হেডার স্যানিটাইজ করুন।
5. **নিবন্ধন করুন** `builtinSkills`-এ এন্ট্রি যোগ করে (অথবা চালু হওয়ার সময় `registerBrowserSkill(executor)`-ধাঁচে কল করে)।
6. **বিল্ট-ইন টুল অ্যালিয়াস সংযুক্ত করুন** (ঐচ্ছিক) `BUILTIN_TOOL_ALIASES` (`interception.ts:23`)-এ, যদি আপস্ট্রিম মডেল ভিন্ন নাম নির্গত করে।
7. **টেস্ট** `src/lib/skills/__tests__/`-এ (Vitest)।

---

## একটি কাস্টম (নন-বিল্ট-ইন) স্কিল যোগ করা

1. প্রসেস চালু হওয়ার সময় হ্যান্ডলারটি নিবন্ধন করুন:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. `POST /api/skills/install`-এর মাধ্যমে স্কিলটি ইনসার্ট করুন (`handlerCode` ফিল্ডটি অবশ্যই নিবন্ধিত হ্যান্ডলারের নামের সঙ্গে মিলতে হবে)।
3. `PUT /api/skills/[id]`-এর মাধ্যমে `mode`-কে `on` বা `auto`-তে টগল করুন।

---

## পরিচালনামূলক পরামর্শ

- **মাস্টার সুইচ:** `settings.skillsEnabled = false` সব নির্বাহ ব্লক করে এবং `/api/skills/executions`-এ HTTP `503` ফেরত দেয়। রেজিস্ট্রি লোড হওয়া অব্যাহত রাখে।
- **ইগ্রেস লক ডাউন করুন:** সম্পূর্ণ এয়ার-গ্যাপড স্যান্ডবক্সিংয়ের জন্য `SKILLS_SANDBOX_NETWORK_ENABLED` আনসেট রাখুন (ডিফল্ট)। প্রতি-কলে `networkEnabled: true` থাকলেও মাস্টার গেট প্রয়োজন।
- **নির্দিষ্ট ইমেজ অনুমোদন করুন:** অ্যালাউলিস্ট সম্প্রসারণ করতে `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` সেট করুন।
- **নির্বাহ অডিট করুন:** `/dashboard/skills/executions` এবং `omniroute_skills_executions` উভয়ই `skill_executions` কোয়েরি করে। সফল রানে `durationMs` অন্তর্ভুক্ত থাকে; ব্যর্থতায় `errorMessage` অন্তর্ভুক্ত থাকে।
- **ক্যাশ ইনভ্যালিডেশন:** ম্যানুয়াল DB সম্পাদনার পরে `skillRegistry.invalidateCache()` কল করুন; অন্যথায় 60 s অপেক্ষা করুন।
- **বেনামী ওয়ার্কস্পেস:** `apiKeyId` খালি থাকলে সব কল একই `"anonymous"` ওয়ার্কস্পেসে হ্যাশ হয় — শেয়ার-সচেতন কোডে সর্বদা একটি প্রকৃত কী পাঠানো উচিত।

---

## এক্সিকিউশন লাইফসাইকেল (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) একটি **সিঙ্গেলটন**, যা প্রতিটি স্কিল আহ্বান পরিচালনা করে। টাইমআউট, পুনঃচেষ্টা এবং এক্সিকিউশন অবস্থা ডিবাগ করার জন্য এর লাইফসাইকেল বোঝা অত্যন্ত গুরুত্বপূর্ণ।

### ৫-ধাপের লাইফসাইকেল

```
   execute() কল করা হয়েছে
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← সারিবদ্ধ, এখনো শুরু হয়নি (DB সারি তৈরি হয়েছে)
  └──────┬──────┘
         │ হ্যান্ডলার শুরু
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← টাইমআউটসহ হ্যান্ডলার আহ্বান করা হয়েছে
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (অন্য কোনো পথ নেই — প্যারেন্ট দ্বারা বন্ধ)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   স্থিতি, আউটপুট ও durationMs দিয়ে DB সারি আপডেট করা হয়েছে
```

### ডিফল্ট কনফিগারেশন

| সেটিং        | ডিফল্ট        | যেভাবে কনফিগার করা যায়              |
| ------------ | ------------- | ------------------------------------ |
| `timeout`    | `30000` (30s) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`           | `skillExecutor.setMaxRetries(count)` |

> **গুরুত্বপূর্ণ**: এক্সিকিউটরটি একটি সিঙ্গেলটন — `setTimeout()` কল করলে তা পরবর্তী সব আহ্বানকে গ্লোবালি প্রভাবিত করে। বর্তমানে প্রতিটি স্কিলের জন্য আলাদা টাইমআউট সমর্থিত নয়; প্রতিটি স্কিলের জন্য আলাদা টাইমআউট প্রয়োজন হলে পৃথক প্রসেস চালু করুন অথবা এক্সিকিউটরটি ফর্ক করুন।

### স্ট্যাটাসের মানসমূহ

`src/lib/skills/types.ts` থেকে:

```ts
enum SkillStatus {
  PENDING = "pending", // সারিবদ্ধ, এখনো শুরু হয়নি
  RUNNING = "running", // হ্যান্ডলার আহ্বান করা হয়েছে
  SUCCESS = "success", // হ্যান্ডলার বৈধ আউটপুট দিয়েছে
  ERROR = "error", // হ্যান্ডলার একটি এক্সসেপশন নিক্ষেপ করেছে
  TIMEOUT = "timeout", // এক্সিকিউটরের টাইমআউট অতিক্রম করেছে
}
```

> **দ্রষ্টব্য**: `TIMEOUT` স্ট্যাটাসটি enum-এ সংজ্ঞায়িত থাকলেও বর্তমান এক্সিকিউটর বাস্তবায়ন এটি **প্রকৃতপক্ষে DB-তে লেখে না** — টাইমআউটগুলো `"Skill execution timed out"` বার্তাসহ `ERROR` হিসেবে প্রকাশ পায়। স্ট্যাটাস enum-টি ভবিষ্যৎ ব্যবহারের জন্য সংরক্ষিত।

### এক্সিকিউশন পরিদর্শন

```ts
import { skillExecutor } from "omniroute/skills/executor";

// ID দিয়ে একটি নির্দিষ্ট এক্সিকিউশন নিন
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// একটি API কী-এর সাম্প্রতিক এক্সিকিউশনগুলোর তালিকা নিন
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// মোট এক্সিকিউশনের সংখ্যা গণনা করুন
const total = skillExecutor.countExecutions("api-key-id");
```

### পুনঃচেষ্টার আচরণ

`maxRetries` সেটিংটি সংরক্ষণ করা হলেও এক্সিকিউটরের `execute()` মেথড বর্তমানে এটি **ব্যবহার করে না** — এটি কেবল একবার চেষ্টা করে। `maxRetries` মানটি ভবিষ্যৎ বাস্তবায়ন এবং যেসব হুক এটি পড়তে চায় তাদের জন্য উন্মুক্ত রাখা হয়েছে।

আপাতত, পুনঃচেষ্টা অবশ্যই স্কিল হ্যান্ডলারের মধ্যেই বাস্তবায়ন করতে হবে। বিল্ট-ইন
স্কিলগুলো এক্সিকিউটরের সঙ্গে নিবন্ধিত হয় (যেমন `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)`, যা `src/lib/skills/builtin/`-এ রয়েছে); আপনি যে হ্যান্ডলারই
নিবন্ধন করুন না কেন, সেটি নিজস্ব পুনঃচেষ্টা লুপ দিয়ে নিজেকে আবৃত করতে পারে:

```ts
// একটি স্কিল হ্যান্ডলারের ভেতরে
async function handler(input, ctx) {
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetchSomething(input);
    } catch (err) {
      lastError = err as Error;
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, 1000 * attempt));
      }
    }
  }
  throw lastError;
}
```

---

## SkillMode-এর বিস্তারিত বিবরণ

`SkillMode` enum (`src/lib/skills/types.ts`) নিয়ন্ত্রণ করে স্কিলগুলো **কখন এবং কীভাবে** চালু করা হবে:

```ts
enum SkillMode {
  AUTO = "auto", // কখন স্কিলটি কল করতে হবে, তা LLM নির্ধারণ করে
  MANUAL = "manual", // শুধু ব্যবহারকারীর স্পষ্ট অনুরোধে চালু হয়
  HYBRID = "hybrid", // AUTO স্কোরিং + ম্যানুয়াল ওভাররাইড
}
```

> **দ্রষ্টব্য**: কোডবেসে `SkillMode` (AUTO/MANUAL/HYBRID) সংজ্ঞায়িত রয়েছে, অন্যদিকে `Skill.mode` ফিল্ডটি একটি ভিন্ন কাঠামো (`"on" | "off" | "auto"`) ব্যবহার করে। এগুলো সম্পর্কিত হলেও অভিন্ন নয় — `SkillMode` এক্সিকিউটর নীতির জন্য এবং `Skill.mode` প্রতিটি স্কিল আলাদাভাবে সক্রিয় করার জন্য ব্যবহৃত হয়।

### কোন মোড কখন ব্যবহার করবেন

| মোড      | LLM-এর আচরণ                                                                        | ব্যবহারের ক্ষেত্র                                     |
| -------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------- |
| `AUTO`   | প্রয়োজনীয় মনে করলে LLM স্কিলটি কল করতে পারে                                      | সাধারণ-উদ্দেশ্যের স্কিল (ফাইল পড়া, HTTP অনুরোধ)      |
| `MANUAL` | LLM স্কিলটি কল করতে পারে না; শুধু একটি স্পষ্ট `executeSkill` API কল এটিকে চালু করে | সংবেদনশীল কার্যক্রম (ডেটাবেসে লেখা, পেমেন্ট)          |
| `HYBRID` | LLM স্কিলটির পরামর্শ দিতে পারে; ব্যবহারকারীকে নিশ্চিত করতে হবে                     | পার্শ্বপ্রতিক্রিয়া আছে কিন্তু বিপজ্জনক নয়—এমন স্কিল |

### AUTO স্কোরিং

`AUTO` মোড সক্রিয় থাকলে, `src/lib/skills/injection.ts`-এর `scoreAutoSkill()` প্রতিটি সম্ভাব্য স্কিলকে অনুরোধের
প্রসঙ্গের বিপরীতে স্কোর করে — এটি একটি যোগভিত্তিক পূর্ণসংখ্যা
পয়েন্ট ব্যবস্থা (স্কিলের নামের মিল, নাম/ট্যাগ/বিবরণের টোকেনের মিল,
পটভূমি-কারণের ইঙ্গিত, প্রোভাইডার-ইঙ্গিতের বোনাস/পেনাল্টি)। সর্বোচ্চ
`AUTO_MAX_SKILLS = 5`টি স্কিল, যেগুলোর `score >= AUTO_MIN_SCORE = 3`, কলযোগ্য
টুল হিসেবে ইনজেক্ট করা হয়; সমান স্কোর হলে প্রথমে `installCount`, তারপর নামের ভিত্তিতে ক্রম নির্ধারিত হয়। সম্পূর্ণ পয়েন্ট টেবিলটি এই
ডকুমেন্টের আগের অংশে [**টুল স্কিমা জেনারেশন → AUTO স্কোরিং**](#auto-scoring)-এ
দেখুন; এখানে ফ্লোট `0.6`-ধাঁচের কোনো থ্রেশহোল্ড এবং `registry.ts`-এ কোনো স্কোরিং নেই।

---

## বিল্ট-ইন স্কিলের ক্যাটালগ

OmniRoute-এর সঙ্গে `src/lib/skills/builtin/`-এ একটি বাছাইকৃত বিল্ট-ইন স্কিলের সেট অন্তর্ভুক্ত থাকে। সবচেয়ে প্রচলিতগুলো:

### ব্রাউজার অটোমেশন স্কিল

ব্রাউজার স্কিল (`src/lib/skills/builtin/browser.ts`) Playwright/Puppeteer-এর মাধ্যমে হেডলেস ব্রাউজার অটোমেশন প্রদান করে। **এটি বাস্তবায়িত হয়েছে, তবে ডিফল্ট স্কিল ক্যাটালগে নেই** — এটি ব্যবহার করতে ব্রাউজার এক্সটেনশন প্লাগইনটি আলাদাভাবে ইনস্টল করুন।

```ts
// আপনার কনফিগে সক্রিয় করুন
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // সবসময় স্পষ্টভাবে চালু করা আবশ্যক
  allowedSkills: ["browser"],
  timeout: 60000, // পেজ লোডের জন্য 60s
  maxRetries: 1,
};
```

### অন্যান্য বিল্ট-ইন বিভাগ

| বিভাগ       | স্কিল                                           | মোড    |
| ----------- | ----------------------------------------------- | ------ |
| ফাইল I/O    | `file_read`, `file_write`                       | AUTO   |
| HTTP        | `http_request`                                  | AUTO   |
| অনুসন্ধান   | `web_search`                                    | AUTO   |
| কোড নির্বাহ | `eval_code` (স্যান্ডবক্স করা JavaScript/Python) | HYBRID |
| সিস্টেম     | `execute_command` (স্যান্ডবক্স করা CLI নির্বাহ) | MANUAL |

### একটি কাস্টম স্কিল যোগ করা

প্লাগইন সিস্টেমের মাধ্যমে কীভাবে একটি কাস্টম স্কিল যোগ করবেন, তা জানতে [প্লাগইন SDK ও স্কিল ইন্টিগ্রেশন](./PLUGIN_SDK.md) দেখুন।

---

## আরও দেখুন

- [MCP-SERVER.md](./MCP-SERVER.md) — MCP টুল নিবন্ধন ও ট্রান্সপোর্টসমূহ
- [A2A-SERVER.md](./A2A-SERVER.md) — A2A টাস্কের জীবনচক্র ও স্কিল ডিসপ্যাচ
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — ব্যবহারকারীমুখী পরিচিতি
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — রিকোয়েস্ট পাইপলাইন ও কম্পোনেন্ট ম্যাপ
- সোর্স: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- টেস্ট: `src/lib/skills/__tests__/integration.test.ts`
