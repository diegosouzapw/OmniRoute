# Skills Framework (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Chanzo rasmi:** `src/lib/skills/` na `src/app/api/skills/`
> **Ilisasishwa mara ya mwisho:** 2026-06-28 — v3.8.40

OmniRoute hutoa mfumo wa Skills unaoweza kupanuliwa ambao huruhusu modeli za lugha (na waendeshaji) kuunganisha uwezo unaoweza kutumika tena — kuanzia kusoma mfumo wa faili na kutuma maombi ya HTTP hadi utekelezaji wa msimbo uliotengwa na ujuzi ulioratibiwa kutoka sokoni.

Skill ni kitengo cha kazi chenye toleo na kilichofafanuliwa kwa schema. OmniRoute inaweza kuingiza skills kama ufafanuzi wa zana katika maombi yanayotumwa, kunasa miito ya zana inayorudi kutoka kwa modeli, kuendesha handler inayolingana, na kurudisha matokeo kwa modeli ili mazungumzo yaweze kuendelea. Modeli haioni kamwe utekelezaji — inaona kiolesura cha zana pekee.

---

## Agent Skills dhidi ya Omni Skills

OmniRoute ina mifumo miwili tofauti lakini inayokamilishana ya skill:

| Kipengele                     | **Omni Skills** (hati hii)                                                   | **Agent Skills**                                                                                       |
| :---------------------------- | :--------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| Madhumuni                     | Uingizaji wa zana za LLM + utekelezaji uliotengwa                            | Katalogi ya SKILL.md kwa maajenti wa nje kugundua na kutumia                                           |
| Chanzo rasmi                  | `src/lib/skills/` + soko                                                     | `src/lib/agentSkills/` + saraka ya `skills/`                                                           |
| Hali ya wakati wa utekelezaji | Huingizwa katika maombi yanayotumwa, hutekelezwa kwenye matukio ya tool-call | Katalogi tuli ya markdown + endpoints za ugunduzi za REST/MCP/A2A                                      |
| Anayeitumia                   | OmniRoute yenyewe (uelekezaji wa combo, miito ya LLM inayoingia)             | Maajenti wa nje, clients za MCP, orchestrators za A2A                                                  |
| Idadi                         | Hubadilika (hutegemea soko)                                                  | Vipengee 45 vya katalogi (23 vya API + 21 vya CLI + 1 cha usanidi)                                     |
| Muundo                        | `SkillDefinition` yenye schema ya zana + handler                             | Frontmatter ya `SKILL.md` + mwili wa markdown                                                          |
| Ugunduzi                      | REST ya `/api/skills/*` + zana za MCP za `omniroute_skills_*`                | REST ya `/api/agent-skills/*` + zana za MCP za `omniroute_agent_skills_*` + `list-capabilities` ya A2A |

**Omni Skills** ni injini ya utekelezaji — zinafafanua kile ambacho OmniRoute _inaweza kufanya_ wakati LLM inapoitisha zana.

**Agent Skills** ni katalogi ya nyaraka — zinafafanua kwa maajenti wa nje _jinsi ya kutumia_ REST API na CLI ya OmniRoute, kupitia faili za SKILL.md zenye muundo ambazo zinaweza kuingizwa moja kwa moja katika prompts za ajenti.

Kwa katalogi ya Agent Skills, generator, zana za MCP, na skill ya A2A, angalia [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## Dhana

### Vyanzo vya Skill

Vyanzo vitatu vya skills vinaishi pamoja katika registry moja:

1. **Skills zilizojengewa ndani** (`src/lib/skills/builtins.ts`) — husambazwa pamoja na OmniRoute. Hushughulikia matumizi ya kawaida:
   - `file_read`, `file_write` — workspace iliyotengwa kwa kila API key chini ya `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — HTTP inayotumwa kupitia `safeOutboundFetch` yenye `guard: "public-only"`
   - `web_search` — mtoa huduma wa utafutaji anayeweza kubadilishwa mwenye caching (`executeWebSearch`)
   - `eval_code` — utekelezaji wa `node` au `python` uliotengwa kwa Docker
   - `execute_command` — amri ya shell iliyotengwa kwa Docker
   - `browser` — scaffolding inayotumia Playwright, imezimwa kwa chaguo-msingi (`builtin/browser.ts`)
2. **SkillsMP** (Soko la OmniRoute) — hupakuliwa kutoka `https://skillsmp.com/api/v1/skills/search`. Inahitaji `skillsmpApiKey` katika Settings.
3. **SkillsSH** (katalogi ya jamii ya `skills.sh`) — hupakuliwa kutoka `https://skills.sh/api/search`. Haihitaji uthibitishaji; maudhui ya SKILL.md huvutwa kutoka GitHub raw.

"Active provider" mmoja hudhibiti katalogi ambayo dashboard husakinisha kutoka kwayo (`src/lib/skills/providerSettings.ts`). Ibadilishe chini ya **Settings → Memory & Skills**. Chaguo-msingi: `skillsmp`.

### Utambulisho wa Skill

Skills hutambulishwa kwa `name@version` katika registry ya kumbukumbu (`src/lib/skills/registry.ts`). Toleo lazima liwe semver (`^\d+\.\d+\.\d+$`). `resolveVersion()` huelewa masharti ya `^`, `~`, `>`, `>=`, `<`, `<=`, `==`, na ulinganifu kamili.

### Hali ya Skill

Kila skill ina hali ya wakati wa utekelezaji inayodhibiti wakati inapoingizwa:

| Hali   | Tabia                                                                                            |
| ------ | ------------------------------------------------------------------------------------------------ |
| `on`   | Huingizwa kila wakati kama ufafanuzi wa zana                                                     |
| `off`  | Haiingizwe kamwe, haiwezi kutekelezwa kamwe                                                      |
| `auto` | Hupimwa dhidi ya ombi linaloingia; huingizwa tu ikiwa alama ≥ `AUTO_MIN_SCORE` (chaguo-msingi 3) |

`auto` ndiyo chaguo-msingi kwa skills zilizosakinishwa kutoka sokoni. `enabled=true` na `mode="off"` kwa pamoja humaanisha "imesajiliwa lakini haitumiki" — kubadilisha `enabled` kupitia safu wima ya zamani pia husasisha `mode` ili codepaths za zamani ziendelee kuwa thabiti (`src/app/api/skills/[id]/route.ts`).

### Hali (utekelezaji)

Utekelezaji wa skill hufuatiliwa katika jedwali la `skill_executions` kwa hali zifuatazo (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Cache ya Registry

`SkillRegistry` ni singleton yenye cache ya TTL ya sekunde 60 (`registry.ts:14`). `loadFromDatabase()` ni idempotent na huondoa urudiaji wa miito inayofanyika kwa wakati mmoja kupitia `pendingLoad`. Uandishi wowote (`register`/`unregister`/`unregisterById`) hubatilisha cache. Tafuta matoleo kupitia `getSkillVersions(name)` na `resolveVersion(name, constraint)`.

### Uingizaji Unaotambua Provider

`injectSkills()` katika `src/lib/skills/injection.ts` ndiyo sehemu ya kuingilia inayobadilisha skills zilizosajiliwa kuwa ufafanuzi wa zana unaolingana na provider husika:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

Jina la zana limesimbwa kama `name@version` ili kishughulikiaji kiweze kuchagua toleo sahihi wakati modeli inapokiita tena.

### Uwekaji Alama wa AUTO

Wakati `mode="auto"`, kila ujuzi unaopendekezwa hupewa alama kulingana na muktadha wa ombi (`scoreAutoSkill()` katika `injection.ts`):

| Ishara                                                                  | Alama              |
| ----------------------------------------------------------------------- | ------------------ |
| Jina la ujuzi linaonekana kama lilivyo katika muktadha                  | +6                 |
| Kila tokeni ya jina inalingana na tokeni ya muktadha                    | +2                 |
| Kila kijisehemu cha tagi kinalingana na muktadha                        | +3                 |
| Kila tokeni ya maelezo inalingana na muktadha                           | +1                 |
| Sababu ya usuli inalingana na tokeni ya jina                            | +2 kwa kila tokeni |
| Sababu ya usuli inalingana na tagi                                      | +2 kwa kila tokeni |
| Kidokezo cha mtoa huduma katika tagi kinalingana na mtoa huduma wa ombi | +2 / −2            |

Ujuzi `AUTO_MAX_SKILLS = 5` wa juu wenye `score >= AUTO_MIN_SCORE = 3` huingizwa. Alama zinazolingana huamuliwa kwa `installCount` (kwa mpangilio wa kushuka), kisha jina kwa mpangilio wa alfabeti (`injection.ts:225-235`).

### Uzuiaji wa Wito wa Zana

`handleToolCallExecution()` katika `src/lib/skills/interception.ts` huitwa na kishughulikiaji cha gumzo baada ya huduma ya juu kurejesha jibu la kuita zana:

1. `extractToolCalls()` husoma miundo mahususi ya mtoa huduma (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Majina mbadala ya zana zilizojengewa ndani (k.m. `omniroute_web_search` → `web_search`) hutatuliwa kwanza. Vishughulikiaji vilivyojengewa ndani hutekelezwa papo hapo.
3. Kitu kingine chochote hupitishwa kupitia `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`.
4. Matokeo huunganishwa tena kwenye jibu — vipengee vya `tool_results`, `function_call_output`, au vizuizi vya Anthropic `tool_result` kulingana na inavyofaa.

`customSkillExecutionEnabled` katika muktadha wa utekelezaji inaweza kuwekwa kuwa `false` ili kuruhusu uzuiaji wa zana zilizojengewa ndani pekee (hutumiwa na njia za maombi zinazozima waziwazi vishughulikiaji vilivyofafanuliwa na mtumiaji).

---

## Sandbox ya Docker

Njia za msimbo zisizo za ndani (`eval_code`, `execute_command`) huendeshwa ndani ya Docker kupitia `SandboxRunner` (`src/lib/skills/sandbox.ts`). Kila kontena huzinduliwa kwa:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (wakati readOnly=true)
```

Chaguo-msingi (`SandboxRunner.DEFAULT_CONFIG`):

| Sehemu           | Chaguo-msingi   | Maelezo                                                         |
| ---------------- | --------------- | --------------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU) | Hugawanywa kwa 1000 kabla ya kupitishwa kwa `--cpus`            |
| `memoryLimit`    | 256 MB          | Kikomo kisichoweza kuvukwa                                      |
| `timeout`        | 30000 ms        | Kusitisha kwa upole kupitia `SIGTERM` + `docker kill`           |
| `networkEnabled` | `false`         | Huwa `--network none`                                           |
| `readOnly`       | `true`          | FS ya mzizi ni ya kusoma pekee; `/tmp` na `/workspace` ni tmpfs |

`SandboxRunner.kill(id)` na `killAll()` zinapatikana kwa ajili ya kuzima; kontena zinazoendeshwa hufuatiliwa katika `runningContainers: Map<string, ChildProcess>`.

### Vigezo vya Mazingira vya Sandbox

Husanidiwa kupitia `process.env` katika `src/lib/skills/builtins.ts`:

| Kigezo cha Mazingira              | Chaguo-msingi       | Madhumuni                                                                                   |
| --------------------------------- | ------------------- | ------------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB)    | Kikomo cha `file_read` na `file_write`                                                      |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`            | Kikomo cha sehemu kuu ya jibu la `http_request`                                             |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`            | Kikomo cha stdout/stderr kinachorudishwa kwa mwitaji                                        |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`             | Muda wa kusubiri wa chaguo-msingi kwa amri za sandbox; kikomo chake ni sekunde 60           |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`             | Lango kuu la trafiki inayotoka. Weka `1` au `true` ili kuruhusu kujijumuisha kwa kila mwito |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (tazama hapa chini) | Orodha ya picha za Docker zinazoruhusiwa, iliyotenganishwa kwa koma                         |

Picha zinazoruhusiwa kwa chaguo-msingi: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. Nyongeza zozote kupitia `SKILLS_ALLOWED_SANDBOX_IMAGES` huunganishwa na chaguo-msingi; picha zisizotambulika hukataliwa na `normalizeImage()`.

> Kumbuka: hakuna kigezo tofauti cha mazingira cha `SKILLS_EXECUTION_TIMEOUT_MS`. Muda wa kusubiri wa kishughulikiaji kisicho cha sandbox umewekwa moja kwa moja kuwa sekunde 30 katika `SkillExecutor` (`executor.ts:13`), lakini unaweza kubadilishwa wakati wa uendeshaji kupitia `skillExecutor.setTimeout(ms)`.

### Utengaji wa Workspace

`file_read` na `file_write` hutatua kila njia kulingana na workspace maalumu kwa kila ufunguo wa API katika `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`. Upitaji wa njia (`..`) na sehemu zilizopigwa marufuku (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) hukataliwa kabla ya I/O yoyote ya diski.

### Uimarishaji wa HTTP

`http_request` (`builtins.ts:257`):

- Orodha ya mbinu zinazoruhusiwa: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Vichwa vya maombi yanayotoka vilivyozuiwa: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Uelekezaji upya umezimwa (`allowRedirect: false`)
- Hupitishwa kupitia `safeOutboundFetch` kwa kutumia `guard: "public-only"` (masafa ya faragha/loopback yamezuiwa)
- Jibu hukatwa katika `SKILLS_MAX_HTTP_RESPONSE_BYTES`; kiteja huona `truncated: true`

---

## Kitekelezaji Mseto (hakikisho)

`src/lib/skills/hybrid.ts` hufafanua `HybridExecutor` ambayo huamua kati ya utekelezaji wa `direct` (ndani ya mchakato) na `sandbox` kwa kila mwito, ikiwa na njia ya kujaribu tena ya `autoUpgrade` kunapotokea hitilafu za kuisha kwa muda/kumbukumbu. Utekelezaji uliounganishwa wa `directExecutor` / `sandboxRunner` ni viigizo (`executeDirect`, `executeInSandbox` hurejesha vipengee vya muda) — chukulia moduli hii kama mkataba unaoendelea kutengenezwa. Utekelezaji halisi bado hupitia `skillExecutor` + `SandboxRunner`.

---

## Hifadhi

Muundo wa hifadhidata unapatikana katika uhamishaji mbili:

- `src/lib/db/migrations/016_create_skills.sql` — majedwali ya msingi ya `skills` na `skill_executions`, yenye faharasa kwenye `(api_key_id, name)` na `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — huongeza `mode`, `source_provider`, `tags` (JSON), `install_count` kwenye `skills`.

`skill_executions.status` imewekewa sharti katika kiwango cha hifadhidata: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## API ya REST

Ncha zote zinapatikana chini ya `src/app/api/skills/`. Ncha za usimamizi (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) zinahitaji **uthibitishaji wa usimamizi** kupitia `requireManagementAuth()`. Mitiririko ya soko/usakinishaji hutumia `isAuthenticated()` yenye masharti mepesi zaidi (kikao au ufunguo wa API).

| Ncha | Mbinu | Madhumuni |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Orodhesha ujuzi uliosajiliwa. Huaauni `?q=`, `?mode=on                   | off | auto`, `?source=skillsmp | skillssh | local`, upangaji kurasa |
| `/api/skills/[id]` | PUT | Sasisha `enabled` au `mode` |
| `/api/skills/[id]` | DELETE | Ondoa usajili kwa id |
| `/api/skills/install` | POST | Sakinisha ujuzi maalum (msimbo wa kishughulikiaji + muundo) |
| `/api/skills/marketplace` | GET | Tafuta katika katalogi ya SkillsMP (hurejesha chaguo-msingi maarufu wakati `q` ni tupu) |
| `/api/skills/marketplace/install` | POST | Sakinisha ujuzi wa SkillsMP (inahitaji mtoa huduma anayetumika = `skillsmp`) |
| `/api/skills/skillssh` | GET | Tafuta katika katalogi ya skills.sh (`?q=&limit=`, kiwango cha juu ni 100) |
| `/api/skills/skillssh/install` | POST | Sakinisha ujuzi wa skills.sh (inahitaji mtoa huduma anayetumika = `skillssh`) |
| `/api/skills/executions` | GET | Historia ya utekelezaji iliyopangwa kwa kurasa (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Tekeleza ujuzi uliosajiliwa papo hapo |

Ncha ya `POST /api/skills/executions` hurejesha HTTP `503` pamoja na `{ error: "Skills execution is disabled..." }` wakati `settings.skillsEnabled === false` (`executor.ts:42-45`). Waendeshaji wanaweza kubadilisha swichi kuu kupitia **Mipangilio → AI**.

### Mfano: sakinisha ujuzi maalum

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

Mfuatano wa `handlerCode` ni **utafutaji wa jina la kishughulikiaji** — si msimbo unaoweza kutekelezwa. Kitekelezaji huupanga kupitia `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`). Usakinishaji kutoka sokoni huhifadhi maandishi ya SKILL.md katika uga huu kama nyaraka na kuelekeza utekelezaji kupitia miito ya zana inayozalishwa na modeli. Chanzo chochote kinachotolewa na mtumiaji hakitathminiwi kwa `eval`.

---

## Zana za MCP

Zana nne za MCP hufunika kiolesura cha ujuzi (`open-sse/mcp-server/tools/skillTools.ts`). Zinasajiliwa kiotomatiki seva ya MCP inapoanza.

| Zana                          | Maelezo                                                               |
| ----------------------------- | --------------------------------------------------------------------- |
| `omniroute_skills_list`       | Orodhesha ujuzi, vichujio vya hiari: `apiKeyId`, `name`, `enabled`    |
| `omniroute_skills_enable`     | Washa/zima ujuzi kwa kutumia `skillId`                                |
| `omniroute_skills_execute`    | Tekeleza ujuzi kwa data ingizo                                        |
| `omniroute_skills_executions` | Historia ya utekelezaji wa hivi karibuni (chaguo-msingi 50, upeo 100) |

Tazama [MCP-SERVER.md](./MCP-SERVER.md) kwa usanidi wa usafirishaji na ugawaji wa mawanda.

---

## Ujumuishaji wa A2A

`src/lib/skills/a2a.ts` husafirisha kifafanuzi cha ujuzi wa A2A cha `memory_aware_routing` na kisaidizi cha `registerA2ASkill(registry)`. Ujuzi maalum wa A2A huwekwa katika `src/lib/a2a/skills/` na huelekezwa kupitia `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`). Tazama [A2A-SERVER.md](./A2A-SERVER.md) kwa mzunguko kamili wa maisha ya kazi.

---

## Kuongeza Ujuzi Mpya Uliojengewa Ndani

1. **Bainisha kishughulikiaji** katika `src/lib/skills/builtins.ts` (au faili sambamba chini ya `src/lib/skills/builtin/`). Sahihi: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Njia ya msimbo iliyotengwa?** Ita `sandboxRunner.run(image, command, env, sandboxConfig({...}))`. Tumia `normalizeImage()` dhidi ya orodha ya ruhusa.
3. **Njia ya mfumo wa faili?** Daima ipitishe kupitia `resolveWorkspacePath(input, context)` kabla ya kufikia diski.
4. **Mwito wa mtandao?** Tumia `safeOutboundFetch` pamoja na `guard: "public-only"`; safisha vichwa kupitia `sanitizeHeaders()`.
5. **Sajili** kwa kuongeza ingizo kwenye `builtinSkills` (au kwa kuita mtindo wa `registerBrowserSkill(executor)` wakati wa kuanza).
6. **Unganisha lakabu za zana zilizojengewa ndani** (si lazima) katika `BUILTIN_TOOL_ALIASES` (`interception.ts:23`) ikiwa modeli ya chanzo inatoa jina tofauti.
7. **Majaribio** katika `src/lib/skills/__tests__/` (Vitest).

---

## Kuongeza Ujuzi Maalum (Usiojengewa Ndani)

1. Sajili kishughulikiaji wakati wa kuanza kwa mchakato:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Ingiza ujuzi kupitia `POST /api/skills/install` (sehemu ya `handlerCode` lazima ilingane na jina la kishughulikiaji kilichosajiliwa).
3. Badilisha `mode` kuwa `on` au `auto` kupitia `PUT /api/skills/[id]`.

---

## Vidokezo vya Uendeshaji

- **Swichi kuu:** `settings.skillsEnabled = false` huzuia utekelezaji wote na kurejesha HTTP `503` kwenye `/api/skills/executions`. Rejesta huendelea kupakia.
- **Zuia kabisa trafiki ya kutoka:** acha `SKILLS_SANDBOX_NETWORK_ENABLED` bila kuwekwa (chaguo-msingi) ili mazingira yaliyotengwa yasitenganishwe kabisa na mtandao. `networkEnabled: true` ya kila mwito bado inahitaji lango kuu.
- **Ruhusu picha mahususi:** weka `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` ili kupanua orodha ya ruhusa.
- **Kagua utekelezaji:** `/dashboard/skills/executions` na `omniroute_skills_executions` zote huuliza `skill_executions`. Uendeshaji uliofaulu hujumuisha `durationMs`; ulioshindwa hujumuisha `errorMessage`.
- **Ubatilishaji wa akiba:** ita `skillRegistry.invalidateCache()` baada ya mabadiliko ya moja kwa moja kwenye DB; vinginevyo subiri sekunde 60.
- **Nafasi ya kazi isiyojulikana:** wakati `apiKeyId` ni tupu, miito yote huhashiwa kwenye nafasi ileile ya kazi ya `"anonymous"` — msimbo unaozingatia ushirikishaji unapaswa daima kupitisha ufunguo halisi.

---

## Mzunguko wa Utekelezaji (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) ni **singleton** inayodhibiti kila uitishaji wa skill. Kuelewa mzunguko wake ni muhimu kwa utatuzi wa hitilafu za muda kuisha, majaribio ya kurudia, na hali ya utekelezaji.

### Mzunguko wa Hatua 5

```
   execute() imeitwa
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← kwenye foleni, bado haijaanza (safu ya DB imeundwa)
  └──────┬──────┘
         │ anza handler
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← handler imeitwa ikiwa na kikomo cha muda
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (hakuna njia nyingine — imesitishwa na mzazi)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   Safu ya DB imesasishwa kwa hali, matokeo, durationMs
```

### Usanidi Chaguomsingi

| Mpangilio    | Chaguomsingi         | Inaweza kusanidiwa kupitia           |
| ------------ | -------------------- | ------------------------------------ |
| `timeout`    | `30000` (sekunde 30) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`                  | `skillExecutor.setMaxRetries(count)` |

> **Muhimu**: Executor ni singleton — kuita `setTimeout()` huathiri uitishaji wote unaofuata kwa ujumla. Vikomo vya muda kwa kila skill havitumiki kwa sasa; ikiwa unahitaji vikomo tofauti vya muda kwa kila skill, anzisha michakato tofauti au unda fork ya executor.

### Thamani za Hali

Kutoka `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // Kwenye foleni, bado haijaanza
  RUNNING = "running", // Handler imeitwa
  SUCCESS = "success", // Handler imerudisha matokeo halali
  ERROR = "error", // Handler imetupa exception
  TIMEOUT = "timeout", // Imezidi kikomo cha muda cha executor
}
```

> **Kumbuka**: Hali ya `TIMEOUT` imefafanuliwa katika enum lakini **haiandikwi katika DB kwa kweli** na utekelezaji wa sasa wa executor — kuisha kwa muda huonekana kama `ERROR` pamoja na ujumbe `"Skill execution timed out"`. Enum ya hali imehifadhiwa kwa matumizi ya baadaye.

### Kukagua Utekelezaji

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Pata utekelezaji mahususi kwa ID
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} ndani ya ${exec.durationMs}ms`);
}

// Orodhesha utekelezaji wa hivi karibuni kwa ufunguo wa API
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// Hesabu jumla ya utekelezaji
const total = skillExecutor.countExecutions("api-key-id");
```

### Tabia ya Majaribio ya Kurudia

Mpangilio wa `maxRetries` huhifadhiwa lakini **hautumiwi kwa sasa** na method ya `execute()` ya executor — hufanya jaribio moja pekee. Thamani ya `maxRetries` imefichuliwa kwa ajili ya utekelezaji wa baadaye na hooks zinazotaka kuisoma.

Kwa sasa, majaribio ya kurudia lazima yatekelezwe ndani ya handler ya skill yenyewe. Skills zilizojengewa ndani
husajiliwa kwa executor (k.m. `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` katika `src/lib/skills/builtin/`); handler yoyote
unayosajili inaweza kufunika mzunguko wake yenyewe wa majaribio ya kurudia:

```ts
// ndani ya handler ya skill
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

## SkillMode kwa Kina

Enum ya `SkillMode` (`src/lib/skills/types.ts`) inadhibiti **wakati na jinsi** ujuzi unavyoitishwa:

```ts
enum SkillMode {
  AUTO = "auto", // LLM huamua wakati wa kuita ujuzi
  MANUAL = "manual", // Huitishwa tu kupitia ombi la moja kwa moja la mtumiaji
  HYBRID = "hybrid", // Uwekaji alama wa AUTO + ubatilishaji wa mwenyewe
}
```

> **Kumbuka**: Msingi wa msimbo unafafanua `SkillMode` (AUTO/MANUAL/HYBRID), ilhali sehemu ya `Skill.mode` hutumia muundo tofauti (`"on" | "off" | "auto"`). Zinahusiana lakini hazifanani — `SkillMode` ni kwa ajili ya sera ya kitekelezaji, na `Skill.mode` ni kwa ajili ya kuwezesha au kulemaza kila ujuzi.

### Wakati wa Kutumia Kila Modi

| Modi     | Tabia ya LLM                                                                                 | Matumizi                                                  |
| -------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `AUTO`   | LLM inaweza kuita ujuzi inapoona kuwa ni muhimu                                              | Ujuzi wa matumizi ya jumla (kusoma faili, maombi ya HTTP) |
| `MANUAL` | LLM haiwezi kuita ujuzi; ni wito wa moja kwa moja wa API ya `executeSkill` pekee unaoiitisha | Operesheni nyeti (kuandika kwenye hifadhidata, malipo)    |
| `HYBRID` | LLM inaweza kupendekeza ujuzi; mtumiaji lazima athibitishe                                   | Ujuzi wenye athari za pembeni lakini usio hatari          |

### Uwekaji Alama wa AUTO

Modi ya `AUTO` inapokuwa amilifu, kila ujuzi unaoweza kuchaguliwa hupewa alama dhidi ya muktadha wa ombi
na `scoreAutoSkill()` katika `src/lib/skills/injection.ts` — mfumo wa kujumlisha
pointi kamili (ulinganifu wa jina la ujuzi, mwingiliano wa tokeni za jina/lebo/maelezo,
vidokezo vya sababu za mandharinyuma, bonasi/adhabu ya kidokezo cha mtoa huduma). Ujuzi
`AUTO_MAX_SKILLS = 5` wenye alama za juu zaidi na `score >= AUTO_MIN_SCORE = 3` huingizwa kama
zana zinazoweza kuitwa, huku sare zikivunjwa kwa `installCount` kisha jina. Tazama jedwali kamili la pointi
katika [**Uundaji wa Skima ya Zana → Uwekaji Alama wa AUTO**](#auto-scoring) mapema katika hati hii;
hakuna kiwango cha chini cha desimali kama `0.6` wala uwekaji alama wa `registry.ts`.

---

## Katalogi ya Ujuzi Uliojengewa Ndani

OmniRoute huja na seti iliyoteuliwa ya ujuzi uliojengewa ndani katika `src/lib/skills/builtin/`. Ujuzi unaotumika zaidi ni:

### Ujuzi wa Uendeshaji Kiotomatiki wa Kivinjari

Ujuzi wa kivinjari (`src/lib/skills/builtin/browser.ts`) hutoa uendeshaji kiotomatiki wa kivinjari kisicho na kiolesura kupitia Playwright/Puppeteer. **Umetekelezwa lakini haupo katika katalogi chaguomsingi ya ujuzi** — ili kuutumia, sakinisha programu-jalizi ya kiendelezi cha kivinjari kando.

```ts
// Wezesha katika usanidi wako
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Daima hitaji uitishaji wa moja kwa moja
  allowedSkills: ["browser"],
  timeout: 60000, // Sekunde 60 kwa upakiaji wa kurasa
  maxRetries: 1,
};
```

### Kategoria Nyingine Zilizojengewa Ndani

| Kategoria             | Ujuzi                                             | Modi   |
| --------------------- | ------------------------------------------------- | ------ |
| I/O ya Faili          | `file_read`, `file_write`                         | AUTO   |
| HTTP                  | `http_request`                                    | AUTO   |
| Utafutaji             | `web_search`                                      | AUTO   |
| Utekelezaji wa Msimbo | `eval_code` (JavaScript/Python iliyotengwa)       | HYBRID |
| Mfumo                 | `execute_command` (utekelezaji wa CLI uliotengwa) | MANUAL |

### Kuongeza Ujuzi Maalum

Tazama [SDK ya Programu-jalizi na Ujumuishaji wa Ujuzi](./PLUGIN_SDK.md) ili kujua jinsi ya kuongeza ujuzi maalum kupitia mfumo wa programu-jalizi.

---

## Tazama Pia

- [MCP-SERVER.md](./MCP-SERVER.md) — usajili wa zana za MCP na njia za usafirishaji
- [A2A-SERVER.md](./A2A-SERVER.md) — mzunguko wa maisha wa kazi za A2A na uelekezaji wa ujuzi
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — utangulizi unaolenga mtumiaji
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — mtiririko wa maombi na ramani ya vipengele
- Chanzo: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Majaribio: `src/lib/skills/__tests__/integration.test.ts`
