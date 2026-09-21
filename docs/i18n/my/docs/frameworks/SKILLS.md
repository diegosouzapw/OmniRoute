# Skills Framework (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **အမှန်တရားအတွက် အဓိကရင်းမြစ်:** `src/lib/skills/` နှင့် `src/app/api/skills/`
> **နောက်ဆုံးအပ်ဒိတ်လုပ်ထားသည့်ရက်:** 2026-06-28 — v3.8.40

OmniRoute သည် language model များ (နှင့် operator များ) က ပြန်လည်အသုံးပြုနိုင်သော စွမ်းဆောင်ရည်များကို ပေါင်းစပ်ဖွဲ့စည်းနိုင်စေသည့် တိုးချဲ့နိုင်သော Skills framework တစ်ခုကို ဖော်ထုတ်ပေးထားသည် — filesystem ဖတ်ရှုခြင်းနှင့် HTTP request များမှစ၍ sandbox အတွင်း code လုပ်ဆောင်ခြင်းနှင့် စိစစ်ရွေးချယ်ထားသော marketplace skill များအထိ ပါဝင်သည်။

Skill တစ်ခုသည် version သတ်မှတ်ထားပြီး schema ဖြင့် သတ်မှတ်ထားသော အလုပ်ယူနစ်တစ်ခုဖြစ်သည်။ OmniRoute သည် အပြင်သို့ပို့မည့် request များတွင် skill များကို tool definition များအဖြစ် ထည့်သွင်းနိုင်သည်၊ model ထံမှ ပြန်လာသည့် tool call များကို ကြားဖြတ်ဖမ်းယူနိုင်သည်၊ ကိုက်ညီသော handler ကို လုပ်ဆောင်နိုင်ပြီး စကားဝိုင်း ဆက်လက်လုပ်ဆောင်နိုင်ရန် result ကို model ထံ ပြန်လည်ပေးပို့နိုင်သည်။ Model သည် implementation ကို လုံးဝမမြင်ရဘဲ tool interface ကိုသာ မြင်ရသည်။

---

## Agent Skills နှင့် Omni Skills

OmniRoute တွင် ကွဲပြားသော်လည်း အပြန်အလှန်ဖြည့်ဆည်းပေးသော skill system နှစ်မျိုးရှိသည်-

| ရှုထောင့်                   | **Omni Skills** (ဤစာတမ်း)                                                              | **Agent Skills**                                                                                |
| :-------------------------- | :------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------- |
| ရည်ရွယ်ချက်                 | LLM tool ထည့်သွင်းခြင်း + sandbox အတွင်း လုပ်ဆောင်ခြင်း                                | ပြင်ပ agent များ ရှာဖွေတွေ့ရှိပြီး အသုံးပြုနိုင်ရန် SKILL.md catalog                            |
| အမှန်တရားအတွက် အဓိကရင်းမြစ် | `src/lib/skills/` + marketplace                                                        | `src/lib/agentSkills/` + `skills/` directory                                                    |
| Runtime mode                | အပြင်သို့ပို့သည့် request များတွင် ထည့်သွင်းပြီး tool-call event များတွင် လုပ်ဆောင်သည် | Static markdown catalog + REST/MCP/A2A ရှာဖွေတွေ့ရှိရေး endpoint များ                           |
| အသုံးပြုသူ                  | OmniRoute ကိုယ်တိုင် (combo routing၊ ဝင်လာသော LLM call များ)                           | ပြင်ပ agent များ၊ MCP client များ၊ A2A orchestrator များ                                        |
| အရေအတွက်                    | ပြောင်းလဲနိုင်သည် (marketplace ပေါ်မူတည်သည်)                                           | catalog entry 45 ခု (API 23 ခု + CLI 21 ခု + config 1 ခု)                                       |
| Format                      | tool schema + handler ပါဝင်သော `SkillDefinition`                                       | `SKILL.md` frontmatter + markdown body                                                          |
| ရှာဖွေတွေ့ရှိခြင်း          | `/api/skills/*` REST + `omniroute_skills_*` MCP tool များ                              | `/api/agent-skills/*` REST + `omniroute_agent_skills_*` MCP tool များ + A2A `list-capabilities` |

**Omni Skills** သည် execution engine ဖြစ်သည် — LLM တစ်ခုက tool တစ်ခုကို ခေါ်ယူသောအခါ OmniRoute က _ဘာလုပ်နိုင်သည်_ ကို ၎င်းတို့က သတ်မှတ်သည်။

**Agent Skills** သည် documentation catalog ဖြစ်သည် — agent prompt များထဲသို့ တိုက်ရိုက်ထည့်သွင်းနိုင်သော ဖွဲ့စည်းတည်ဆောက်ထားသည့် SKILL.md file များဖြင့် OmniRoute ၏ REST API နှင့် CLI ကို _မည်သို့အသုံးပြုရမည်_ ကို ပြင်ပ agent များအား ရှင်းပြသည်။

Agent Skills catalog၊ generator၊ MCP tool များနှင့် A2A skill အတွက် [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md) ကို ကြည့်ပါ။

---

## သဘောတရားများ

### Skill ရင်းမြစ်များ

Skill ရင်းမြစ်သုံးမျိုးသည် registry တစ်ခုတည်းတွင် အတူတကွ တည်ရှိသည်-

1. **Built-in skill များ** (`src/lib/skills/builtins.ts`) — OmniRoute နှင့်အတူ ထည့်သွင်းပေးထားသည်။ အသုံးများသော အခြေအနေများကို ဖြည့်ဆည်းပေးသည်-
   - `file_read`, `file_write` — `<DATA_DIR>/skills/workspaces/<hashed-key>/` အောက်ရှိ API key တစ်ခုစီအတွက် sandbox workspace
   - `http_request` — `guard: "public-only"` ပါရှိသော `safeOutboundFetch` မှတစ်ဆင့် အပြင်သို့ပို့သည့် HTTP
   - `web_search` — caching ပါဝင်သော အစားထိုးတပ်ဆင်နိုင်သည့် search provider (`executeWebSearch`)
   - `eval_code` — Docker sandbox အတွင်း `node` သို့မဟုတ် `python` လုပ်ဆောင်ခြင်း
   - `execute_command` — Docker sandbox အတွင်း shell command
   - `browser` — Playwright အခြေပြု scaffolding ဖြစ်ပြီး ပုံမှန်အားဖြင့် ပိတ်ထားသည် (`builtin/browser.ts`)
2. **SkillsMP** (OmniRoute Marketplace) — `https://skillsmp.com/api/v1/skills/search` မှ ရယူသည်။ Settings တွင် `skillsmpApiKey` လိုအပ်သည်။
3. **SkillsSH** (`skills.sh` community catalog) — `https://skills.sh/api/search` မှ ရယူသည်။ အထောက်အထားစိစစ်မှု မလိုအပ်ပါ။ SKILL.md အကြောင်းအရာကို GitHub raw မှ ရယူသည်။

"active provider" တစ်ခုတည်းက dashboard သည် မည်သည့် catalog မှ install လုပ်မည်ကို ထိန်းချုပ်သည် (`src/lib/skills/providerSettings.ts`)။ **Settings → Memory & Skills** အောက်တွင် ၎င်းကို ပြောင်းလဲပါ။ မူလသတ်မှတ်ချက်- `skillsmp`။

### Skill အမှတ်အသား

In-memory registry (`src/lib/skills/registry.ts`) တွင် skill များကို `name@version` ဖြင့် key သတ်မှတ်သည်။ Version သည် semver (`^\d+\.\d+\.\d+$`) ဖြစ်ရမည်။ `resolveVersion()` သည် `^`, `~`, `>`, `>=`, `<`, `<=`, `==` နှင့် အတိအကျကိုက်ညီမှု constraint များကို နားလည်သည်။

### Skill Mode

Skill တစ်ခုစီတွင် ၎င်းကို မည်သည့်အချိန်၌ ထည့်သွင်းမည်ကို ထိန်းချုပ်သော runtime mode တစ်ခုရှိသည်-

| Mode   | လုပ်ဆောင်ပုံ                                                                                                           |
| ------ | ---------------------------------------------------------------------------------------------------------------------- |
| `on`   | Tool definition အဖြစ် အမြဲတမ်း ထည့်သွင်းသည်                                                                            |
| `off`  | မည်သည့်အခါမျှ မထည့်သွင်းဘဲ လုပ်ဆောင်၍လည်း မရနိုင်ပါ                                                                    |
| `auto` | ဝင်လာသော request နှင့် နှိုင်းယှဉ်ပြီး score ပေးသည်။ Score ≥ `AUTO_MIN_SCORE` (မူလသတ်မှတ်ချက် 3) ဖြစ်မှသာ ထည့်သွင်းသည် |

`auto` သည် marketplace မှ install လုပ်ထားသော skill များအတွက် မူလသတ်မှတ်ချက်ဖြစ်သည်။ `enabled=true` နှင့် `mode="off"` တို့ အတူရှိခြင်းသည် "register လုပ်ထားသော်လည်း inactive ဖြစ်နေသည်" ဟု ဆိုလိုသည် — legacy column မှတစ်ဆင့် `enabled` ကို ပြောင်းလဲခြင်းသည် codepath အဟောင်းများ ကိုက်ညီမှုဆက်ရှိစေရန် `mode` ကိုလည်း ပြောင်းလဲပေးသည် (`src/app/api/skills/[id]/route.ts`)။

### အခြေအနေ (လုပ်ဆောင်မှုများ)

Skill လုပ်ဆောင်မှုများကို အောက်ပါ status များဖြင့် `skill_executions` table တွင် မှတ်တမ်းတင်ထားသည် (`src/lib/skills/types.ts`)-

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Registry Cache

`SkillRegistry` သည် 60-second TTL cache ပါရှိသော singleton တစ်ခုဖြစ်သည် (`registry.ts:14`)။ `loadFromDatabase()` သည် idempotent ဖြစ်ပြီး `pendingLoad` မှတစ်ဆင့် တစ်ပြိုင်နက်တည်း call များကို dedupe လုပ်သည်။ Write တစ်ခုခု (`register`/`unregister`/`unregisterById`) သည် cache ကို invalidate လုပ်သည်။ Version များကို `getSkillVersions(name)` နှင့် `resolveVersion(name, constraint)` မှတစ်ဆင့် ရှာဖွေပါ။

### Provider ကို သိရှိသော ထည့်သွင်းမှု

`src/lib/skills/injection.ts` ရှိ `injectSkills()` သည် register လုပ်ထားသော skill များကို provider တစ်ခုချင်းစီအလိုက် tool definition များအဖြစ် ပြောင်းလဲပေးသည့် entry point ဖြစ်သည်-

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

မော်ဒယ်က ပြန်လည်ခေါ်ဆိုသည့်အခါ handler သည် မှန်ကန်သော version ကို ရွေးချယ်နိုင်ရန် tool အမည်ကို `name@version` အဖြစ် ကုဒ်သွင်းထားသည်။

### AUTO အမှတ်ပေးခြင်း

`mode="auto"` ဖြစ်သည့်အခါ candidate skill တစ်ခုစီကို request context နှင့် တိုက်ဆိုင်စစ်ဆေးကာ အမှတ်ပေးသည် (`injection.ts` ရှိ `scoreAutoSkill()`)：

| အချက်ပြမှု                                                      | အမှတ်များ           |
| --------------------------------------------------------------- | ------------------- |
| Skill အမည်သည် context ထဲတွင် မူရင်းအတိုင်း ပါဝင်သည်             | +6                  |
| အမည် token တစ်ခုစီသည် context token တစ်ခုနှင့် ကိုက်ညီသည်       | +2                  |
| Tag substring တစ်ခုစီသည် context နှင့် ကိုက်ညီသည်               | +3                  |
| Description token တစ်ခုစီသည် context နှင့် ကိုက်ညီသည်           | +1                  |
| နောက်ခံအကြောင်းရင်းသည် အမည် token တစ်ခုနှင့် ကိုက်ညီသည်         | token တစ်ခုလျှင် +2 |
| နောက်ခံအကြောင်းရင်းသည် tag တစ်ခုနှင့် ကိုက်ညီသည်                | token တစ်ခုလျှင် +2 |
| Tag များရှိ provider hint သည် request provider နှင့် ကိုက်ညီသည် | +2 / −2             |

`score >= AUTO_MIN_SCORE = 3` ဖြစ်သည့် skill များထဲမှ ထိပ်ဆုံး `AUTO_MAX_SKILLS = 5` ခုကို ထည့်သွင်းသည်။ အမှတ်တူပါက `installCount` (ကြီးစဉ်ငယ်လိုက်) ဖြင့် ဦးစွာဆုံးဖြတ်ပြီး၊ ထို့နောက် အမည်ကို အက္ခရာစဉ်ဖြင့် ဆုံးဖြတ်သည် (`injection.ts:225-235`)။

### Tool Call ကြားဖြတ်လုပ်ဆောင်ခြင်း

Upstream မှ tool-calling response ပြန်လာပြီးနောက် chat handler က `src/lib/skills/interception.ts` ရှိ `handleToolCallExecution()` ကို ခေါ်ဆိုသည်။

1. `extractToolCalls()` သည် provider အလိုက် သီးခြားဖြစ်သော ပုံစံများ (OpenAI `tool_calls` / Responses `function_call`၊ Anthropic `tool_use`၊ Gemini `functionCalls`) ကို ဖတ်ရှုသည်။
2. Built-in tool alias များ (ဥပမာ `omniroute_web_search` → `web_search`) ကို ဦးစွာ ဖြေရှင်းသည်။ Built-in handler များကို inline ဖြင့် လုပ်ဆောင်သည်။
3. အခြားအရာအားလုံးကို `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })` မှတစ်ဆင့် လမ်းကြောင်းသတ်မှတ်ပေးသည်။
4. ရလဒ်များကို သင့်လျော်သလို response ထဲသို့ ပြန်လည်ထည့်သွင်းသည် — `tool_results`၊ `function_call_output` item များ သို့မဟုတ် Anthropic `tool_result` block များအဖြစ် ဖြစ်သည်။

အသုံးပြုသူသတ်မှတ် handler များကို ခွင့်ပြုမထားဘဲ built-in interception ကိုသာ ခွင့်ပြုရန် execution context ရှိ `customSkillExecutionEnabled` ကို `false` ဟု သတ်မှတ်နိုင်သည် (အသုံးပြုသူသတ်မှတ် handler များကို အတိအလင်း ပိတ်ထားသည့် request path များတွင် အသုံးပြုသည်)။

---

## Docker Sandbox

Builtin မဟုတ်သော code path များ (`eval_code`, `execute_command`) သည် `SandboxRunner` (`src/lib/skills/sandbox.ts`) မှတစ်ဆင့် Docker အတွင်း run ပါသည်။ Container တစ်ခုစီကို အောက်ပါအတိုင်း စတင်ပါသည်-

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (readOnly=true ဖြစ်သည့်အခါ)
```

မူလသတ်မှတ်ချက်များ (`SandboxRunner.DEFAULT_CONFIG`)-

| Field            | မူလတန်ဖိုး      | မှတ်ချက်များ                                                                         |
| ---------------- | --------------- | ------------------------------------------------------------------------------------ |
| `cpuLimit`       | 100 (= 0.1 CPU) | `--cpus` သို့ မပေးပို့မီ 1000 ဖြင့် စားပါသည်                                         |
| `memoryLimit`    | 256 MB          | တင်းကျပ်သော ကန့်သတ်ချက်                                                              |
| `timeout`        | 30000 ms        | `SIGTERM` + `docker kill` မှတစ်ဆင့် အပျော့စား ရပ်တန့်မှု                             |
| `networkEnabled` | `false`         | `--network none` ဖြစ်လာသည်                                                           |
| `readOnly`       | `true`          | Root FS သည် ဖတ်ရှုရန်သာဖြစ်ပြီး၊ `/tmp` နှင့် `/workspace` တို့သည် tmpfs များဖြစ်သည် |

`SandboxRunner.kill(id)` နှင့် `killAll()` ကို shutdown ပြုလုပ်ရန် ဖော်ထုတ်ပေးထားပြီး၊ run နေသော container များကို `runningContainers: Map<string, ChildProcess>` တွင် ခြေရာခံထားပါသည်။

### Sandbox Env Var များ

`src/lib/skills/builtins.ts` ရှိ `process.env` မှတစ်ဆင့် စီစဉ်သတ်မှတ်ထားသည်-

| Env Var                           | မူလတန်ဖိုး         | ရည်ရွယ်ချက်                                                                                                                  |
| --------------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB)   | `file_read` နှင့် `file_write` အတွက် အများဆုံးပမာဏ                                                                           |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`           | `http_request` response body အတွက် အများဆုံးပမာဏ                                                                             |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`           | ခေါ်ယူသူထံ ပြန်ပို့သည့် stdout/stderr အတွက် အများဆုံးပမာဏ                                                                    |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`            | Sandbox ထဲရှိ command များအတွက် မူလ timeout; 60 s အထိ ကန့်သတ်ထားသည်                                                          |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`            | ပြင်ပသို့ ထွက်သည့် traffic အတွက် master gate ဖြစ်သည်။ ခေါ်ယူမှုတစ်ခုချင်းစီအလိုက် ခွင့်ပြုရန် `1` သို့မဟုတ် `true` သတ်မှတ်ပါ |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (အောက်တွင်ကြည့်ပါ) | ကော်မာဖြင့် ခွဲထားသော ခွင့်ပြုသည့် Docker image စာရင်း                                                                       |

မူလခွင့်ပြုထားသော image များမှာ `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine` တို့ဖြစ်သည်။ `SKILLS_ALLOWED_SANDBOX_IMAGES` မှတစ်ဆင့် ထပ်ထည့်သည့် မည်သည့် image ကိုမဆို မူလစာရင်းနှင့် ပေါင်းစည်းပြီး၊ အမည်မသိ image များကို `normalizeImage()` က ငြင်းပယ်ပါသည်။

> မှတ်ချက်- သီးခြား `SKILLS_EXECUTION_TIMEOUT_MS` env var မရှိပါ။ Sandbox မဟုတ်သော handler timeout ကို `SkillExecutor` (`executor.ts:13`) တွင် 30 s အဖြစ် hard-code လုပ်ထားသော်လည်း runtime တွင် `skillExecutor.setTimeout(ms)` မှတစ်ဆင့် အစားထိုးသတ်မှတ်နိုင်ပါသည်။

### Workspace သီးခြားခွဲခြားမှု

`file_read` နှင့် `file_write` သည် path တစ်ခုစီကို `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/` ရှိ API key တစ်ခုချင်းစီအတွက် သီးခြား workspace နှင့် ဆက်စပ်တွက်ချက်ပါသည်။ Path traversal (`..`) နှင့် တားမြစ်ထားသော segment များ (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) ကို disk I/O တစ်စုံတစ်ရာ မပြုလုပ်မီ ငြင်းပယ်ပါသည်။

### HTTP လုံခြုံရေး တင်းကျပ်မှု

`http_request` (`builtins.ts:257`)-

- ခွင့်ပြုထားသော method စာရင်း- `GET, HEAD, POST, PUT, PATCH, DELETE`
- ပြင်ပသို့ ပေးပို့ခြင်းမှ တားမြစ်ထားသော header များ- `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Redirect များကို ပိတ်ထားသည် (`allowRedirect: false`)
- `guard: "public-only"` ပါသော `safeOutboundFetch` မှတစ်ဆင့် လမ်းကြောင်းပေးထားသည် (private/loopback range များကို တားမြစ်ထားသည်)
- Response ကို `SKILLS_MAX_HTTP_RESPONSE_BYTES` တွင် ဖြတ်တောက်ထားပြီး၊ client သည် `truncated: true` ကို မြင်ရပါသည်

---

## ပေါင်းစပ် Executor (အစမ်းကြည့်ရှုမှု)

`src/lib/skills/hybrid.ts` သည် ခေါ်ဆိုမှုတစ်ခုချင်းစီအလိုက် `direct` (လုပ်ငန်းစဉ်အတွင်း) နှင့် `sandbox` လုပ်ဆောင်မှုတို့အကြား ရွေးချယ်ဆုံးဖြတ်ပြီး timeout/memory အမှားများ ဖြစ်ပေါ်သည့်အခါ `autoUpgrade` ဖြင့် ပြန်လည်ကြိုးစားသည့် လမ်းကြောင်းပါဝင်သော `HybridExecutor` ကို သတ်မှတ်ထားသည်။ ချိတ်ဆက်ထည့်သွင်းထားသော `directExecutor` / `sandboxRunner` အကောင်အထည်ဖော်မှုများသည် stub များဖြစ်သည် (`executeDirect`, `executeInSandbox` တို့က placeholder object များကို ပြန်ပေးသည်) — ဤ module ကို တည်ဆောက်ဆဲ contract တစ်ခုအဖြစ် သတ်မှတ်ပါ။ အမှန်တကယ် လုပ်ဆောင်မှုသည် `skillExecutor` + `SandboxRunner` မှတစ်ဆင့်သာ ဆက်လက်လုပ်ဆောင်သည်။

---

## သိုလှောင်မှု

Schema သည် migration နှစ်ခုတွင် ရှိသည်-

- `src/lib/db/migrations/016_create_skills.sql` — အခြေခံ `skills` နှင့် `skill_executions` table များဖြစ်ပြီး `(api_key_id, name)` နှင့် `(skill_id, status, created_at)` တို့အပေါ်တွင် index များရှိသည်။
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — `skills` သို့ `mode`, `source_provider`, `tags` (JSON), `install_count` တို့ကို ထည့်သွင်းသည်။

`skill_executions.status` ကို database အဆင့်တွင် ကန့်သတ်ထားသည်- `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`။

---

## REST API

Endpoint အားလုံးသည် `src/app/api/skills/` အောက်တွင် ရှိသည်။ စီမံခန့်ခွဲမှု endpoint များ (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) သည် `requireManagementAuth()` မှတစ်ဆင့် **စီမံခန့်ခွဲမှု အထောက်အထားစစ်ဆေးခြင်း** လိုအပ်သည်။ Marketplace/install flow များသည် ပိုမိုပေါ့ပါးသော `isAuthenticated()` (session သို့မဟုတ် API key) ကို အသုံးပြုသည်။

| Endpoint | Method | ရည်ရွယ်ချက် |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | မှတ်ပုံတင်ထားသော skill များကို စာရင်းပြုစုသည်။ `?q=`, `?mode=on                        | off | auto`, `?source=skillsmp | skillssh | local`, pagination တို့ကို ပံ့ပိုးသည် |
| `/api/skills/[id]` | PUT | `enabled` သို့မဟုတ် `mode` ကို အပ်ဒိတ်လုပ်သည် |
| `/api/skills/[id]` | DELETE | id ဖြင့် မှတ်ပုံတင်မှုကို ပယ်ဖျက်သည် |
| `/api/skills/install` | POST | စိတ်ကြိုက် skill တစ်ခုကို ထည့်သွင်းသည် (handler code + schema) |
| `/api/skills/marketplace` | GET | SkillsMP catalog ကို ရှာဖွေသည် (`q` ဗလာဖြစ်ပါက လူကြိုက်များသော မူလတန်ဖိုးများကို ပြန်ပေးသည်) |
| `/api/skills/marketplace/install` | POST | SkillsMP skill တစ်ခုကို ထည့်သွင်းသည် (လက်ရှိအသုံးပြုနေသော provider = `skillsmp` ဖြစ်ရန် လိုအပ်သည်) |
| `/api/skills/skillssh` | GET | skills.sh catalog ကို ရှာဖွေသည် (`?q=&limit=`, အများဆုံး 100 အထိ ကန့်သတ်ထားသည်) |
| `/api/skills/skillssh/install` | POST | skills.sh skill တစ်ခုကို ထည့်သွင်းသည် (လက်ရှိအသုံးပြုနေသော provider = `skillssh` ဖြစ်ရန် လိုအပ်သည်) |
| `/api/skills/executions` | GET | စာမျက်နှာခွဲထားသော လုပ်ဆောင်မှုမှတ်တမ်း (`?apiKeyId=`) |
| `/api/skills/executions` | POST | မှတ်ပုံတင်ထားသော skill တစ်ခုကို ad-hoc လုပ်ဆောင်သည် |

`settings.skillsEnabled === false` ဖြစ်နေပါက `POST /api/skills/executions` endpoint သည် HTTP `503` နှင့် `{ error: "Skills execution is disabled..." }` ကို ပြန်ပေးသည် (`executor.ts:42-45`)။ Operator များသည် **Settings → AI** မှတစ်ဆင့် master switch ကို ပြောင်းလဲနိုင်သည်။

### ဥပမာ- စိတ်ကြိုက် skill တစ်ခု ထည့်သွင်းခြင်း

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

`handlerCode` string သည် လုပ်ဆောင်နိုင်သော code မဟုတ်ဘဲ **handler အမည်ဖြင့် ရှာဖွေခြင်း** ဖြစ်သည်။ Executor သည် ၎င်းကို `skillExecutor.registerHandler(name, fn)` မှတစ်ဆင့် ချိတ်ဆက်သတ်မှတ်သည် (`executor.ts:25`)။ Marketplace မှ ထည့်သွင်းမှုများသည် SKILL.md စာသားကို documentation အဖြစ် ဤ field တွင် သိမ်းဆည်းပြီး model မှ ထုတ်လုပ်သော tool call များမှတစ်ဆင့် လုပ်ဆောင်မှုကို လမ်းကြောင်းပေးသည်။ အသုံးပြုသူက ပေးပို့သော မည်သည့် source ကိုမဆို eval မလုပ်ပါ။

---

## MCP Tools

Skills မျက်နှာပြင်ကို MCP tools လေးခုဖြင့် wrapper လုပ်ထားသည် (`open-sse/mcp-server/tools/skillTools.ts`)။ MCP server စတင်သည့်အခါ ၎င်းတို့ကို အလိုအလျောက် register လုပ်သည်။

| Tool                          | ဖော်ပြချက်                                                                                             |
| ----------------------------- | ------------------------------------------------------------------------------------------------------ |
| `omniroute_skills_list`       | Skills များကို စာရင်းပြုစုရန်၊ ထည့်သွင်းနိုင်သော filters များမှာ `apiKeyId`, `name`, `enabled` ဖြစ်သည် |
| `omniroute_skills_enable`     | `skillId` ဖြင့် skill တစ်ခုကို enable/disable လုပ်ရန်                                                  |
| `omniroute_skills_execute`    | Input payload တစ်ခုဖြင့် skill တစ်ခုကို execute လုပ်ရန်                                                |
| `omniroute_skills_executions` | မကြာသေးမီက execution history (ပုံသေ 50၊ အများဆုံး 100)                                                 |

Transport setup နှင့် scope assignments များအတွက် [MCP-SERVER.md](./MCP-SERVER.md) ကို ကြည့်ပါ။

---

## A2A ပေါင်းစပ်မှု

`src/lib/skills/a2a.ts` သည် `memory_aware_routing` A2A skill descriptor နှင့် `registerA2ASkill(registry)` helper ကို export လုပ်သည်။ Custom A2A skills များကို `src/lib/a2a/skills/` တွင် ထားရှိပြီး `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`) မှတစ်ဆင့် dispatch လုပ်သည်။ Task lifecycle အပြည့်အစုံအတွက် [A2A-SERVER.md](./A2A-SERVER.md) ကို ကြည့်ပါ။

---

## Built-in Skill အသစ်တစ်ခု ထည့်သွင်းခြင်း

1. **Handler ကို သတ်မှတ်ပါ** — `src/lib/skills/builtins.ts` (သို့မဟုတ် `src/lib/skills/builtin/` အောက်ရှိ sibling file တစ်ခု) တွင် သတ်မှတ်ပါ။ Signature: `(input, { apiKeyId, sessionId }) => Promise<output>`။
2. **Sandboxed code path လား။** `sandboxRunner.run(image, command, env, sandboxConfig({...}))` ကို ခေါ်ပါ။ Allowlist နှင့် တိုက်စစ်ရန် `normalizeImage()` ကို အသုံးပြုပါ။
3. **Filesystem path လား။** Disk ကို မထိမီ `resolveWorkspacePath(input, context)` မှတစ်ဆင့် အမြဲဖြတ်သန်းပါ။
4. **Network call လား။** `guard: "public-only"` နှင့်အတူ `safeOutboundFetch` ကို အသုံးပြုပါ။ Headers များကို `sanitizeHeaders()` ဖြင့် sanitize လုပ်ပါ။
5. **Register လုပ်ပါ** — Entry ကို `builtinSkills` ထဲ ထည့်ပါ (သို့မဟုတ် boot လုပ်ချိန်တွင် `registerBrowserSkill(executor)` ပုံစံဖြင့် ခေါ်ပါ)။
6. Upstream model က အခြားအမည်တစ်ခု ထုတ်ပေးပါက `BUILTIN_TOOL_ALIASES` (`interception.ts:23`) တွင် **built-in tool aliases များကို ချိတ်ဆက်ပါ** (ရွေးချယ်နိုင်သည်)။
7. `src/lib/skills/__tests__/` တွင် **Tests** များ ထည့်ပါ (Vitest)။

---

## Custom (Non-Builtin) Skill တစ်ခု ထည့်သွင်းခြင်း

1. Process စတင်ချိန်တွင် handler ကို register လုပ်ပါ။
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. `POST /api/skills/install` မှတစ်ဆင့် skill ကို ထည့်သွင်းပါ (`handlerCode` field သည် register လုပ်ထားသော handler အမည်နှင့် ကိုက်ညီရမည်)။
3. `PUT /api/skills/[id]` မှတစ်ဆင့် `mode` ကို `on` သို့မဟုတ် `auto` အဖြစ် ပြောင်းပါ။

---

## လည်ပတ်အသုံးပြုမှုဆိုင်ရာ အကြံပြုချက်များ

- **Master switch:** `settings.skillsEnabled = false` သည် execution အားလုံးကို ပိတ်ဆို့ပြီး `/api/skills/executions` တွင် HTTP `503` ကို ပြန်ပေးသည်။ Registry သည် ဆက်လက် load လုပ်နေမည်။
- **Egress ကို ကန့်သတ်ပါ:** လုံးဝ air-gapped ဖြစ်သော sandboxing အတွက် `SKILLS_SANDBOX_NETWORK_ENABLED` ကို မသတ်မှတ်ဘဲထားပါ (ပုံသေ)။ Call တစ်ခုချင်းစီ၏ `networkEnabled: true` သည် master gate ကို လိုအပ်နေဆဲဖြစ်သည်။
- **သတ်မှတ်ထားသော images များကို ခွင့်ပြုပါ:** Allowlist ကို တိုးချဲ့ရန် `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` ဟု သတ်မှတ်ပါ။
- **Executions များကို စစ်ဆေးပါ:** `/dashboard/skills/executions` နှင့် `omniroute_skills_executions` နှစ်ခုစလုံးသည် `skill_executions` ကို query လုပ်သည်။ အောင်မြင်သော runs များတွင် `durationMs` ပါဝင်ပြီး failures များတွင် `errorMessage` ပါဝင်သည်။
- **Cache invalidation:** DB ကို ကိုယ်တိုင်ပြင်ဆင်ပြီးနောက် `skillRegistry.invalidateCache()` ကို ခေါ်ပါ။ မခေါ်ပါက 60 s စောင့်ပါ။
- **Anonymous workspace:** `apiKeyId` သည် ဗလာဖြစ်နေသောအခါ calls အားလုံးသည် တူညီသော `"anonymous"` workspace သို့ hash လုပ်သည် — Sharing ကို ထည့်သွင်းစဉ်းစားထားသော code သည် အမှန်တကယ်အသုံးပြုနိုင်သော key တစ်ခုကို အမြဲပေးပို့သင့်သည်။

---

## လုပ်ဆောင်မှု အသက်တာစက်ဝန်း (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) သည် skill ခေါ်ယူမှုတိုင်းကို စီမံခန့်ခွဲသည့် **singleton** ဖြစ်သည်။ timeout များ၊ ပြန်လည်ကြိုးစားမှုများနှင့် လုပ်ဆောင်မှုအခြေအနေတို့ကို debug လုပ်ရန် ၎င်း၏ အသက်တာစက်ဝန်းကို နားလည်ထားခြင်းသည် အလွန်အရေးကြီးသည်။

### အဆင့် ၅ ဆင့်ပါ အသက်တာစက်ဝန်း

```
   execute() ကို ခေါ်ဆိုသည်
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← တန်းစီထားပြီး မစတင်ရသေး (DB row ဖန်တီးပြီး)
  └──────┬──────┘
         │ handler ကို စတင်သည်
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← timeout ဖြင့် handler ကို ခေါ်ယူသည်
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (အခြားလမ်းကြောင်းမရှိ — parent က ရပ်တန့်လိုက်ခြင်း)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   status၊ output၊ durationMs တို့ဖြင့် DB row ကို အပ်ဒိတ်လုပ်သည်
```

### မူလသတ်မှတ်ချက်

| ဆက်တင်       | မူလတန်ဖိုး    | သတ်မှတ်နိုင်သည့် နည်းလမ်း            |
| ------------ | ------------- | ------------------------------------ |
| `timeout`    | `30000` (30s) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`           | `skillExecutor.setMaxRetries(count)` |

> **အရေးကြီးသည်**: executor သည် singleton ဖြစ်သည် — `setTimeout()` ကို ခေါ်ဆိုခြင်းက နောက်ပိုင်းခေါ်ယူမှုအားလုံးအပေါ် တစ်ကမ္ဘာလုံးအတိုင်းအတာဖြင့် သက်ရောက်သည်။ လက်ရှိတွင် skill တစ်ခုချင်းစီအလိုက် timeout များကို မပံ့ပိုးသေးပါ။ skill တစ်ခုချင်းစီအတွက် မတူညီသော timeout များ လိုအပ်ပါက သီးခြား process များကို ပေးပို့ပါ သို့မဟုတ် executor ကို fork လုပ်ပါ။

### အခြေအနေတန်ဖိုးများ

`src/lib/skills/types.ts` မှ:

```ts
enum SkillStatus {
  PENDING = "pending", // တန်းစီထားပြီး မစတင်ရသေး
  RUNNING = "running", // Handler ကို ခေါ်ယူပြီး
  SUCCESS = "success", // Handler က မှန်ကန်သော output ကို ပြန်ပေးပြီး
  ERROR = "error", // Handler က exception တစ်ခု ပစ်လွှတ်ခဲ့သည်
  TIMEOUT = "timeout", // Executor ၏ timeout ကို ကျော်လွန်ခဲ့သည်
}
```

> **မှတ်ချက်**: `TIMEOUT` အခြေအနေကို enum တွင် သတ်မှတ်ထားသော်လည်း လက်ရှိ executor အကောင်အထည်ဖော်မှုက ၎င်းကို **DB ထဲသို့ အမှန်တကယ် မရေးသားပါ** — timeout များကို `"Skill execution timed out"` မက်ဆေ့ချ်နှင့်အတူ `ERROR` အဖြစ် ဖော်ပြသည်။ status enum ကို အနာဂတ်အသုံးပြုမှုအတွက် သီးသန့်ထားရှိထားသည်။

### လုပ်ဆောင်မှုများကို စစ်ဆေးခြင်း

```ts
import { skillExecutor } from "omniroute/skills/executor";

// ID ဖြင့် သတ်မှတ်ထားသော execution တစ်ခုကို ရယူသည်
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// API key တစ်ခုအတွက် လတ်တလော execution များကို စာရင်းပြုစုသည်
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// execution စုစုပေါင်းအရေအတွက်ကို ရေတွက်သည်
const total = skillExecutor.countExecutions("api-key-id");
```

### ပြန်လည်ကြိုးစားမှု အပြုအမူ

`maxRetries` ဆက်တင်ကို သိမ်းဆည်းထားသော်လည်း executor ၏ `execute()` method က **လက်ရှိတွင် အသုံးမပြုသေးပါ** — ၎င်းသည် တစ်ကြိမ်သာ ကြိုးစားလုပ်ဆောင်သည်။ `maxRetries` တန်ဖိုးကို အနာဂတ်တွင် အကောင်အထည်ဖော်အသုံးပြုရန်နှင့် ၎င်းကို ဖတ်ရှုလိုသည့် hook များအတွက် ထုတ်ဖော်ပေးထားသည်။

လက်ရှိတွင် ပြန်လည်ကြိုးစားမှုများကို skill handler အတွင်း၌ပင် အကောင်အထည်ဖော်ရမည်။ Built-in
skill များကို executor နှင့် မှတ်ပုံတင်ထားသည် (ဥပမာ `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` ကို `src/lib/skills/builtin/` တွင် တွေ့နိုင်သည်)။ သင်မှတ်ပုံတင်သည့် မည်သည့် handler မဆို
၎င်း၏ ကိုယ်ပိုင် ပြန်လည်ကြိုးစားမှု loop ဖြင့် wrap လုပ်နိုင်သည်:

```ts
// skill handler တစ်ခုအတွင်း
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

## SkillMode အကြောင်း အသေးစိတ်

`SkillMode` enum (`src/lib/skills/types.ts`) သည် skill များကို **မည်သည့်အချိန်တွင်၊ မည်သို့** ခေါ်ယူအသုံးပြုမည်ကို ထိန်းချုပ်သည်-

```ts
enum SkillMode {
  AUTO = "auto", // skill ကို မည်သည့်အချိန်တွင် ခေါ်ရမည်ကို LLM က ဆုံးဖြတ်သည်
  MANUAL = "manual", // အသုံးပြုသူက တိတိကျကျ တောင်းဆိုမှသာ ခေါ်ယူသည်
  HYBRID = "hybrid", // AUTO အမှတ်ပေးခြင်း + ကိုယ်တိုင်အစားထိုးထိန်းချုပ်ခြင်း
}
```

> **မှတ်ချက်**- codebase တွင် `SkillMode` (AUTO/MANUAL/HYBRID) ကို သတ်မှတ်ထားသော်လည်း `Skill.mode` field သည် မတူညီသော ပုံစံ (`"on" | "off" | "auto"`) ကို အသုံးပြုသည်။ ၎င်းတို့သည် ဆက်စပ်မှုရှိသော်လည်း တူညီခြင်းမရှိပါ — `SkillMode` သည် executor မူဝါဒအတွက်ဖြစ်ပြီး `Skill.mode` သည် skill တစ်ခုချင်းစီကို ဖွင့်ထားခြင်းရှိမရှိအတွက် ဖြစ်သည်။

### Mode တစ်ခုချင်းစီကို မည်သည့်အချိန်တွင် အသုံးပြုသင့်သနည်း

| Mode     | LLM ၏ လုပ်ဆောင်ပုံ                                                                                       | အသုံးပြုရမည့် အခြေအနေ                                                      |
| -------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| `AUTO`   | လိုအပ်သည်ဟု ယူဆသည့်အခါ LLM က skill ကို ခေါ်ယူနိုင်သည်                                                    | ယေဘုယျအသုံးပြုနိုင်သော skill များ (ဖိုင်ဖတ်ခြင်း၊ HTTP တောင်းဆိုမှုများ)   |
| `MANUAL` | LLM က skill ကို မခေါ်ယူနိုင်ပါ၊ တိကျရှင်းလင်းသော `executeSkill` API ခေါ်ဆိုမှုကသာ ၎င်းကို ခေါ်ယူနိုင်သည် | ထိလွယ်ရှလွယ် လုပ်ဆောင်ချက်များ (ဒေတာဘေ့စ်သို့ ရေးသားခြင်း၊ ငွေပေးချေခြင်း) |
| `HYBRID` | LLM က skill ကို အကြံပြုနိုင်ပြီး အသုံးပြုသူက အတည်ပြုရမည်                                                 | ဘေးထွက်သက်ရောက်မှုရှိသော်လည်း အန္တရာယ်မရှိသော skill များ                   |

### AUTO အမှတ်ပေးခြင်း

`AUTO` mode အသက်ဝင်နေချိန်တွင် ဖြစ်နိုင်ခြေရှိသော skill တစ်ခုချင်းစီကို
`src/lib/skills/injection.ts` ရှိ `scoreAutoSkill()` က တောင်းဆိုမှုဆိုင်ရာ
အခြေအနေအပေါ် အခြေခံ၍ အမှတ်ပေးသည် — ၎င်းသည် အမှတ်များကို ပေါင်းထည့်သည့်
ကိန်းပြည့်အမှတ်စနစ်ဖြစ်သည် (skill အမည်ကိုက်ညီမှု၊ အမည်/tag/ဖော်ပြချက် token ထပ်တူကျမှု၊
နောက်ခံအကြောင်းပြချက်ဆိုင်ရာ အရိပ်အမြွက်များ၊ provider အရိပ်အမြွက်အတွက် အပိုဆု/အမှတ်လျှော့ခြင်း)။ အမြင့်ဆုံးအမှတ်ရ
`AUTO_MAX_SKILLS = 5` ခုထဲမှ `score >= AUTO_MIN_SCORE = 3` ဖြစ်သော skill များကို
ခေါ်ယူအသုံးပြုနိုင်သော tool များအဖြစ် ထည့်သွင်းပြီး အမှတ်တူပါက `installCount` နှင့် ထို့နောက် အမည်အလိုက် ဆုံးဖြတ်သည်။ အမှတ်ဇယားအပြည့်အစုံကို ဤစာတမ်း၏ အစောပိုင်းရှိ
[**Tool Schema ထုတ်လုပ်ခြင်း → AUTO အမှတ်ပေးခြင်း**](#auto-scoring) တွင်
ကြည့်ပါ။ float `0.6` ပုံစံ threshold မရှိသကဲ့သို့ `registry.ts` အမှတ်ပေးခြင်းလည်း မရှိပါ။

---

## Built-in Skills စာရင်း

OmniRoute တွင် `src/lib/skills/builtin/` အတွင်း စိစစ်ရွေးချယ်ထားသော built-in skill အစုတစ်ခု ပါရှိသည်။ အသုံးအများဆုံးများမှာ-

### Browser အလိုအလျောက်လုပ်ဆောင်မှု Skill

browser skill (`src/lib/skills/builtin/browser.ts`) သည် Playwright/Puppeteer မှတစ်ဆင့် headless browser အလိုအလျောက်လုပ်ဆောင်မှုကို ပံ့ပိုးပေးသည်။ **၎င်းကို အကောင်အထည်ဖော်ထားပြီးဖြစ်သော်လည်း မူလ skills catalog တွင် မပါဝင်ပါ** — အသုံးပြုရန် browser extension plugin ကို သီးခြားထည့်သွင်းပါ။

```ts
// သင့် config တွင် ဖွင့်ပါ
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // တိတိကျကျ ခေါ်ယူမှုကို အမြဲတောင်းဆိုပါ
  allowedSkills: ["browser"],
  timeout: 60000, // စာမျက်နှာများ ဖွင့်ရန် 60s
  maxRetries: 1,
};
```

### အခြား Built-in အမျိုးအစားများ

| အမျိုးအစား        | Skill များ                                         | Mode   |
| ----------------- | -------------------------------------------------- | ------ |
| ဖိုင် I/O         | `file_read`, `file_write`                          | AUTO   |
| HTTP              | `http_request`                                     | AUTO   |
| ရှာဖွေမှု         | `web_search`                                       | AUTO   |
| Code လုပ်ဆောင်မှု | `eval_code` (sandbox ထဲရှိ JavaScript/Python)      | HYBRID |
| စနစ်              | `execute_command` (sandbox ထဲရှိ CLI လုပ်ဆောင်မှု) | MANUAL |

### စိတ်ကြိုက် Skill တစ်ခု ထည့်သွင်းခြင်း

plugin စနစ်မှတစ်ဆင့် စိတ်ကြိုက် skill တစ်ခု ထည့်သွင်းနည်းအတွက် [Plugin SDK နှင့် Skills ပေါင်းစည်းမှု](./PLUGIN_SDK.md) ကို ကြည့်ပါ။

---

## ထပ်မံကြည့်ရှုရန်

- [MCP-SERVER.md](./MCP-SERVER.md) — MCP tool မှတ်ပုံတင်ခြင်းနှင့် transports များ
- [A2A-SERVER.md](./A2A-SERVER.md) — A2A task lifecycle နှင့် skill dispatch
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — အသုံးပြုသူများအတွက် မိတ်ဆက်
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — request pipeline နှင့် component map
- ရင်းမြစ်- `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- စမ်းသပ်မှုများ- `src/lib/skills/__tests__/integration.test.ts`
