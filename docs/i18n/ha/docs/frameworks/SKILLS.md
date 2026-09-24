# Skills Framework (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Tushen gaskiya:** `src/lib/skills/` da `src/app/api/skills/`
> **Sabuntawa ta ƙarshe:** 2026-06-28 — v3.8.40

OmniRoute yana samar da tsarin Skills mai faɗaɗawa wanda ke bai wa samfurin harshe (da masu gudanarwa) damar haɗa ƙwarewa masu sake amfani — daga karanta tsarin fayil da buƙatun HTTP zuwa aiwatar da lamba a cikin sandbox da ƙwarewar kasuwa da aka zaɓa.

Skill wani sashe ne na aiki mai sigar da aka ayyana ta schema. OmniRoute na iya saka skills a matsayin ma’anar kayan aiki cikin buƙatun da ake fitarwa, tare kiran kayan aiki da ke dawowa daga samfurin, gudanar da handler da ya dace, sannan ya mayar da sakamakon ga samfurin domin tattaunawar ta ci gaba. Samfurin ba ya taɓa ganin yadda aka aiwatar — yana ganin hanyar mu’amala da kayan aikin kawai.

---

## Agent Skills da Omni Skills

OmniRoute yana da tsarukan skill guda biyu masu bambanci amma masu taimaka wa juna:

| Girma               | **Omni Skills** (wannan takarda)                                               | **Agent Skills**                                                                                     |
| :------------------ | :----------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| Manufa              | Saka kayan aikin LLM + aiwatarwa cikin sandbox                                 | Kundin SKILL.md domin external agents su gano kuma su yi amfani da shi                               |
| Tushen gaskiya      | `src/lib/skills/` + marketplace                                                | `src/lib/agentSkills/` + kundin adireshin `skills/`                                                  |
| Yanayin runtime     | Ana sakawa cikin buƙatun da ake fitarwa, ana aiwatarwa yayin aukuwar tool-call | Kundin markdown tsayayye + wuraren gano REST/MCP/A2A                                                 |
| Wa ke amfani da shi | OmniRoute da kansa (combo routing, kiran LLM masu shigowa)                     | External agents, MCP clients, A2A orchestrators                                                      |
| Adadi               | Mai canzawa (marketplace ne ke ƙayyade shi)                                    | Shigarwar kundi 45 (API 23 + CLI 21 + config 1)                                                      |
| Tsari               | `SkillDefinition` mai tool schema + handler                                    | `SKILL.md` frontmatter + jikin markdown                                                              |
| Ganowa              | `/api/skills/*` REST + kayan aikin MCP na `omniroute_skills_*`                 | `/api/agent-skills/*` REST + kayan aikin MCP na `omniroute_agent_skills_*` + A2A `list-capabilities` |

**Omni Skills** su ne injin aiwatarwa — suna ayyana abin da OmniRoute _zai iya yi_ lokacin da LLM ya kira kayan aiki.

**Agent Skills** su ne kundin takardu — suna bayyana wa external agents _yadda ake amfani da_ REST API da CLI na OmniRoute, tare da fayilolin SKILL.md masu tsari waɗanda za a iya saka kai tsaye cikin prompts na agent.

Don kundin Agent Skills, generator, kayan aikin MCP, da skill na A2A, duba [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## Muhimman Ra’ayoyi

### Tushen Skills

Tushen skills guda uku suna aiki tare a registry ɗaya:

1. **Ginannun skills** (`src/lib/skills/builtins.ts`) — ana kawo su tare da OmniRoute. Suna ɗauke da abubuwan da aka fi amfani da su:
   - `file_read`, `file_write` — wurin aiki na sandbox na kowace API key a ƙarƙashin `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — HTTP mai fita ta hanyar `safeOutboundFetch` tare da `guard: "public-only"`
   - `web_search` — search provider mai iya sauyawa tare da caching (`executeWebSearch`)
   - `eval_code` — aiwatar da `node` ko `python` cikin sandbox na Docker
   - `execute_command` — umarnin shell cikin sandbox na Docker
   - `browser` — tsarin farko mai amfani da Playwright, a kashe ta tsohuwa (`builtin/browser.ts`)
2. **SkillsMP** (Kasuwar OmniRoute) — ana ɗaukowa daga `https://skillsmp.com/api/v1/skills/search`. Yana buƙatar `skillsmpApiKey` a cikin Settings.
3. **SkillsSH** (kundin al’umma na `skills.sh`) — ana ɗaukowa daga `https://skills.sh/api/search`. Ba a buƙatar tantancewa; ana ɗauko abun cikin SKILL.md daga GitHub raw.

"Active provider" guda ɗaya ne ke sarrafa kundin da dashboard ke girkawa daga gare shi (`src/lib/skills/providerSettings.ts`). Sauya shi a ƙarƙashin **Settings → Memory & Skills**. Na tsohuwa: `skillsmp`.

### Shaidar Skill

Ana yi wa skills maɓalli da `name@version` a cikin registry na cikin ƙwaƙwalwa (`src/lib/skills/registry.ts`). Dole ne version ya kasance semver (`^\d+\.\d+\.\d+$`). `resolveVersion()` yana fahimtar `^`, `~`, `>`, `>=`, `<`, `<=`, `==`, da ƙa’idojin dacewa kai tsaye.

### Yanayin Skill

Kowane skill yana da yanayin runtime wanda ke sarrafa lokacin da ake saka shi:

| Yanayi | Halayya                                                                                                   |
| ------ | --------------------------------------------------------------------------------------------------------- |
| `on`   | Kullum ana saka shi a matsayin ma’anar kayan aiki                                                         |
| `off`  | Ba a taɓa saka shi, kuma ba za a iya aiwatar da shi ba                                                    |
| `auto` | Ana ba shi maki bisa ga buƙatar da ta shigo; ana saka shi ne kawai idan maki ≥ `AUTO_MIN_SCORE` (tsoho 3) |

`auto` shi ne tsohon zaɓi ga skills da aka girka daga marketplace. Haɗin `enabled=true` da `mode="off"` yana nufin "an yi rajista amma ba ya aiki" — sauya `enabled` ta legacy column kuma yana ɗaga `mode` domin tsofaffin codepaths su ci gaba da dacewa (`src/app/api/skills/[id]/route.ts`).

### Matsayi (aiwatarwa)

Ana bin diddigin aiwatar da skills a cikin teburin `skill_executions` tare da matsayi masu zuwa (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Cache na Registry

`SkillRegistry` singleton ne mai cache na TTL na daƙiƙa 60 (`registry.ts:14`). `loadFromDatabase()` idempotent ne kuma yana cire maimaitattun kira masu gudana lokaci guda ta hanyar `pendingLoad`. Duk wani rubutu (`register`/`unregister`/`unregisterById`) yana soke cache ɗin. Nemo versions ta hanyar `getSkillVersions(name)` da `resolveVersion(name, constraint)`.

### Sakawa Mai La’akari da Provider

`injectSkills()` a cikin `src/lib/skills/injection.ts` shi ne mashigar da ke sauya skills da aka yi wa rajista zuwa ma’anar kayan aiki ta musamman ga kowane provider:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

Ana shigar da sunan kayan aiki a matsayin `name@version` domin handler ya iya zaɓar sigar da ta dace lokacin da samfurin ya sake kiransa.

### Ƙididdigar AUTO

Lokacin da `mode="auto"`, ana ƙididdige kowace ƙwarewar da za a iya zaɓa bisa mahallin buƙatar (`scoreAutoSkill()` a cikin `injection.ts`):

| Alama                                                     | Maki               |
| --------------------------------------------------------- | ------------------ |
| Sunan ƙwarewa ya bayyana daidai a cikin mahalli           | +6                 |
| Kowace kalmar suna ta dace da kalmar mahalli              | +2                 |
| Kowace ƙaramin ɓangaren tag ya dace da mahalli            | +3                 |
| Kowace kalmar bayani ta dace da mahalli                   | +1                 |
| Dalilin bango ya dace da kalmar suna                      | +2 ga kowace kalma |
| Dalilin bango ya dace da tag                              | +2 ga kowace kalma |
| Alamar mai samarwa a tags ta dace da mai samar da buƙatar | +2 / −2            |

Ana shigar da ƙwarewa `AUTO_MAX_SKILLS = 5` mafiya matsayi waɗanda ke da `score >= AUTO_MIN_SCORE = 3`. Idan maki sun yi kunnen doki, ana warwarewa ta amfani da `installCount` (daga mafi girma), sannan sunan haruffa (`injection.ts:225-235`).

### Katse Kiran Kayan Aiki

Chat handler ne ke kiran `handleToolCallExecution()` a cikin `src/lib/skills/interception.ts` bayan upstream ya dawo da martani mai kiran kayan aiki:

1. `extractToolCalls()` yana karanta tsarukan da suka keɓanta ga kowane mai samarwa (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Ana fara warware sunayen laƙabi na kayan aikin da aka gina a ciki (misali `omniroute_web_search` → `web_search`). Built-in handlers suna gudana kai tsaye.
3. Duk wani abu dabam ana tura shi ta `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`.
4. Ana saka sakamakon a cikin martanin — abubuwan `tool_results`, `function_call_output`, ko tubalan Anthropic `tool_result` gwargwadon yadda ya dace.

Ana iya saita `customSkillExecutionEnabled` a cikin mahallin aiwatarwa zuwa `false` domin ba da damar katsewar built-in kawai (ana amfani da wannan ta hanyoyin buƙata waɗanda ke kashe handlers da mai amfani ya ayyana a sarari).

---

## Docker Sandbox

Hanyoyin lambar da ba na ginannen tsarin ba (`eval_code`, `execute_command`) suna gudana a cikin Docker ta hanyar `SandboxRunner` (`src/lib/skills/sandbox.ts`). Ana ƙaddamar da kowane container da:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (idan readOnly=true)
```

Tsoffin ƙimomi (`SandboxRunner.DEFAULT_CONFIG`):

| Filin            | Tsohuwar ƙima   | Bayani                                                      |
| ---------------- | --------------- | ----------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU) | Ana raba shi da 1000 kafin a miƙa shi zuwa `--cpus`         |
| `memoryLimit`    | 256 MB          | Ƙayyadadden iyaka                                           |
| `timeout`        | 30000 ms        | Kashewa a hankali ta `SIGTERM` + `docker kill`              |
| `networkEnabled` | `false`         | Yana zama `--network none`                                  |
| `readOnly`       | `true`          | Root FS na karantawa kawai; `/tmp` da `/workspace` tmpfs ne |

An samar da `SandboxRunner.kill(id)` da `killAll()` don kashewa; ana bibiyar container masu gudana a cikin `runningContainers: Map<string, ChildProcess>`.

### Masu Sauyin Muhallin Sandbox

Ana saita su ta hanyar `process.env` a cikin `src/lib/skills/builtins.ts`:

| Mai Sauyin Muhalli                | Tsohuwar ƙima    | Manufa                                                                       |
| --------------------------------- | ---------------- | ---------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB) | Iyakar girman `file_read` da `file_write`                                    |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`         | Iyakar girman jikin amsar `http_request`                                     |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`         | Iyakar stdout/stderr da ake mayarwa ga mai kira                              |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`          | Tsohon lokacin ƙarewa na umarnin sandbox; iyakarsa 60 s                      |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`          | Babban ƙofar fita. Saita `1` ko `true` don ba da izinin shiga na kowane kira |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (duba ƙasa)      | Jerin hotunan Docker da aka amince da su, wanda waƙafi ya raba               |

Tsoffin hotunan da aka amince da su: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. Duk wani ƙari ta hanyar `SKILLS_ALLOWED_SANDBOX_IMAGES` ana haɗa shi da tsoffin hotunan; `normalizeImage()` yana ƙin hotunan da ba a sani ba.

> Lura: babu wani mai sauyin muhalli na daban mai suna `SKILLS_EXECUTION_TIMEOUT_MS`. An kafa lokacin ƙarewar mai sarrafawa da ba na sandbox ba kai tsaye zuwa 30 s a cikin `SkillExecutor` (`executor.ts:13`), amma ana iya sauya shi yayin aiki ta hanyar `skillExecutor.setTimeout(ms)`.

### Keɓance Wurin Aiki

`file_read` da `file_write` suna fassara kowane hanya dangane da wurin aiki na musamman ga kowane maɓallin API a `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`. Ana ƙin ketare hanya (`..`) da sassan da aka haramta (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) kafin kowane aikin I/O na faifai.

### Ƙarfafa Tsaron HTTP

`http_request` (`builtins.ts:257`):

- Jerin hanyoyin da aka amince da su: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Kanun fita da aka toshe: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- An kashe karkatarwa (`allowRedirect: false`)
- Ana bi da shi ta hanyar `safeOutboundFetch` tare da `guard: "public-only"` (an toshe kewayon adireshin sirri/loopback)
- Ana datse amsa a `SKILLS_MAX_HTTP_RESPONSE_BYTES`; abokin ciniki yana ganin `truncated: true`

---

## Mai Gudanarwa na Haɗaka (samfurin gwaji)

`src/lib/skills/hybrid.ts` yana ayyana `HybridExecutor` wanda ke zaɓar tsakanin aiwatarwar `direct` (a cikin tsari) da `sandbox` ga kowane kira, tare da hanyar sake gwadawa ta `autoUpgrade` idan an sami kuskuren ƙarewar lokaci ko na ƙwaƙwalwar ajiya. Aiwatarwar `directExecutor` / `sandboxRunner` da aka haɗa samfurori ne kawai (`executeDirect`, `executeInSandbox` suna mayar da abubuwan riƙon wuri) — ɗauki wannan module a matsayin yarjejeniyar da ake kan ginawa. Har yanzu ainihin aiwatarwa yana bi ta `skillExecutor` + `SandboxRunner`.

---

## Ma'ajiya

Schema ɗin yana cikin migrations guda biyu:

- `src/lib/db/migrations/016_create_skills.sql` — teburorin asali na `skills` da `skill_executions`, tare da indexes a kan `(api_key_id, name)` da `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — yana ƙara `mode`, `source_provider`, `tags` (JSON), `install_count` zuwa `skills`.

An ƙayyade `skill_executions.status` a matakin database: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## REST API

Dukkan endpoints suna ƙarƙashin `src/app/api/skills/`. Endpoints na gudanarwa (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) suna buƙatar **tabbatar da izinin gudanarwa** ta hanyar `requireManagementAuth()`. Hanyoyin marketplace/shigarwa suna amfani da `isAuthenticated()` mafi sauƙi (session ko API key).

| Endpoint | Hanya | Manufa |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Jera ƙwarewar da aka yi wa rajista. Yana goyon bayan `?q=`, `?mode=on    | off | auto`, `?source=skillsmp | skillssh | local`, rarraba shafuka |
| `/api/skills/[id]` | PUT | Sabunta `enabled` ko `mode` |
| `/api/skills/[id]` | DELETE | Cire rajista ta id |
| `/api/skills/install` | POST | Shigar da ƙwarewa ta musamman (lambar handler + schema) |
| `/api/skills/marketplace` | GET | Bincika kundin SkillsMP (yana mayar da fitattun tsoffin zaɓuɓɓuka idan `q` babu komai) |
| `/api/skills/marketplace/install` | POST | Shigar da ƙwarewar SkillsMP (yana buƙatar provider mai aiki = `skillsmp`) |
| `/api/skills/skillssh` | GET | Bincika kundin skills.sh (`?q=&limit=`, iyaka mafi yawa 100) |
| `/api/skills/skillssh/install` | POST | Shigar da ƙwarewar skills.sh (yana buƙatar provider mai aiki = `skillssh`) |
| `/api/skills/executions` | GET | Tarihin aiwatarwa mai rarraba shafuka (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Aiwatar da ƙwarewar da aka yi wa rajista kai tsaye |

Endpoint na `POST /api/skills/executions` yana mayar da HTTP `503` tare da `{ error: "Skills execution is disabled..." }` idan `settings.skillsEnabled === false` (`executor.ts:42-45`). Masu gudanarwa za su iya kunna ko kashe babban maɓallin daga **Saituna → AI**.

### Misali: shigar da ƙwarewa ta musamman

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

String ɗin `handlerCode` **binciken sunan handler** ne — ba lambar da za a iya aiwatarwa ba. Mai aiwatarwa yana danganta shi ta hanyar `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`). Shigarwa daga marketplace suna adana rubutun SKILL.md a wannan field a matsayin takaddun bayani, sannan su bi da aiwatarwa ta hanyar kiraye-kirayen kayan aiki da model ya samar. Ba a yin eval ga source da mai amfani ya bayar yadda ya ga dama.

---

## Kayan Aikin MCP

Kayan aikin MCP guda huɗu suna naɗe fuskar skills (`open-sse/mcp-server/tools/skillTools.ts`). Ana yi musu rajista ta atomatik lokacin da MCP server ya fara aiki.

| Kayan aiki                    | Bayani                                                             |
| ----------------------------- | ------------------------------------------------------------------ |
| `omniroute_skills_list`       | Jera skills, tare da matata na zaɓi: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | Kunna/kashe skill ta amfani da `skillId`                           |
| `omniroute_skills_execute`    | Gudanar da skill tare da bayanan shigarwa                          |
| `omniroute_skills_executions` | Tarihin aiwatarwa na kwanan nan (tsoho 50, mafi yawa 100)          |

Duba [MCP-SERVER.md](./MCP-SERVER.md) don saitin sufuri da rabon izini.

---

## Haɗewar A2A

`src/lib/skills/a2a.ts` yana fitar da mai bayyana A2A skill na `memory_aware_routing` da kuma mataimakin `registerA2ASkill(registry)`. A2A skills na musamman suna cikin `src/lib/a2a/skills/` kuma ana tura su ta hanyar `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`). Duba [A2A-SERVER.md](./A2A-SERVER.md) don cikakken tsarin rayuwar aiki.

---

## Ƙara Sabon Built-in Skill

1. **Ayyaɗa handler** a cikin `src/lib/skills/builtins.ts` (ko wani fayil makamancinsa ƙarƙashin `src/lib/skills/builtin/`). Sa hannu: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Hanyar lamba mai sandbox?** Kira `sandboxRunner.run(image, command, env, sandboxConfig({...}))`. Yi amfani da `normalizeImage()` bisa allowlist.
3. **Hanyar filesystem?** Koyaushe bi ta `resolveWorkspacePath(input, context)` kafin taɓa disk.
4. **Kiran hanyar sadarwa?** Yi amfani da `safeOutboundFetch` tare da `guard: "public-only"`; tsabtace headers ta hanyar `sanitizeHeaders()`.
5. **Yi rajista** ta ƙara shigarwar zuwa `builtinSkills` (ko kiran salo irin na `registerBrowserSkill(executor)` lokacin farawa).
6. **Haɗa laƙabin built-in tool** (na zaɓi) a cikin `BUILTIN_TOOL_ALIASES` (`interception.ts:23`) idan upstream model yana fitar da suna daban.
7. **Gwaje-gwaje** a cikin `src/lib/skills/__tests__/` (Vitest).

---

## Ƙara Custom Skill (Wanda Ba Built-in Ba)

1. Yi wa handler rajista lokacin fara process:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Saka skill ta hanyar `POST /api/skills/install` (dole filin `handlerCode` ya yi daidai da sunan handler da aka yi wa rajista).
3. Sauya `mode` zuwa `on` ko `auto` ta hanyar `PUT /api/skills/[id]`.

---

## Shawarwarin Aiki

- **Babban maɓalli:** `settings.skillsEnabled = false` yana hana duk wani aiwatarwa kuma yana mayar da HTTP `503` a `/api/skills/executions`. Registry yana ci gaba da lodawa.
- **Takaita fitar hanyar sadarwa:** bar `SKILLS_SANDBOX_NETWORK_ENABLED` ba tare da saita shi ba (tsoho) don sandboxing da aka ware gaba ɗaya daga hanyar sadarwa. `networkEnabled: true` na kowane kira har yanzu yana buƙatar babbar ƙofar izini.
- **Ba da izini ga takamaiman images:** saita `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` don faɗaɗa allowlist.
- **Binciken aiwatarwa:** `/dashboard/skills/executions` da `omniroute_skills_executions` dukansu suna yin query ga `skill_executions`. Ayyukan da suka yi nasara sun haɗa da `durationMs`; waɗanda suka gaza sun haɗa da `errorMessage`.
- **Soke ingancin cache:** kira `skillRegistry.invalidateCache()` bayan gyare-gyaren DB na hannu; in ba haka ba, jira 60 s.
- **Workspace marar suna:** idan `apiKeyId` babu komai, duk kira suna yin hash zuwa workspace ɗin `"anonymous"` iri ɗaya — lambar da ta kula da rabawa ya kamata koyaushe ta tura maɓalli na gaske.

---

## Zagayowar Aiwatarwa (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) wani **singleton** ne da ke sarrafa kowane kiran skill. Fahimtar zagayowar aikinsa tana da matuƙar muhimmanci wajen gano matsalolin ƙarewar lokaci, sake gwadawa, da matsayin aiwatarwa.

### Zagayowar Matakai 5

```
   an kira execute()
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← yana cikin jerin jira, bai fara ba tukuna (an ƙirƙiri layin DB)
  └──────┬──────┘
         │ fara handler
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← an kira handler tare da iyakar lokaci
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (babu wata hanya — parent ne ya dakatar da shi)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   an sabunta layin DB da status, output, durationMs
```

### Saitunan Tsoho

| Saiti        | Tsoho         | Ana iya saita shi ta                 |
| ------------ | ------------- | ------------------------------------ |
| `timeout`    | `30000` (30s) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`           | `skillExecutor.setMaxRetries(count)` |

> **Muhimmi**: Executor singleton ne — kiran `setTimeout()` yana shafar duk kiraye-kirayen da za su biyo baya a ko'ina. A halin yanzu, ba a tallafa wa keɓantacciyar iyakar lokaci ga kowane skill; idan kana buƙatar iyakokin lokaci daban-daban ga kowane skill, ƙaddamar da processes daban-daban ko kuma fork na executor.

### Ƙimomin Matsayi

Daga `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // Yana cikin jerin jira, bai fara ba tukuna
  RUNNING = "running", // An kira handler
  SUCCESS = "success", // Handler ya dawo da ingantaccen output
  ERROR = "error", // Handler ya jefa exception
  TIMEOUT = "timeout", // Ya wuce iyakar lokacin executor
}
```

> **Lura**: An ayyana matsayin `TIMEOUT` a cikin enum amma aiwatarwar executor ta yanzu **ba ta rubuta shi a DB a zahiri** — ƙarewar lokaci tana bayyana a matsayin `ERROR` tare da saƙon `"Skill execution timed out"`. An keɓe enum ɗin matsayin don amfani a nan gaba.

### Binciken Aiwatarwa

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Samo takamaiman aiwatarwa ta ID
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// Jero aiwatarwar kwanan nan na API key
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// Ƙirga jimillar aiwatarwa
const total = skillExecutor.countExecutions("api-key-id");
```

### Halayyar Sake Gwadawa

Ana adana saitin `maxRetries` amma hanyar `execute()` ta executor **ba ta amfani da shi a halin yanzu** — tana yin yunƙuri guda ɗaya kawai. An samar da ƙimar `maxRetries` don aiwatarwa a nan gaba da kuma hooks da suke son karanta ta.

A yanzu, dole ne a aiwatar da sake gwadawa a cikin skill handler da kansa. Ana yi wa built-in
skills rajista a executor (misali `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` a cikin `src/lib/skills/builtin/`); duk handler ɗin da
ka yi wa rajista zai iya ƙunsar nasa madaukin sake gwadawa:

```ts
// a cikin skill handler
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

## Cikakken Bayani kan SkillMode

Enum ɗin `SkillMode` (`src/lib/skills/types.ts`) yana sarrafa **lokaci da yadda** ake kiran skills:

```ts
enum SkillMode {
  AUTO = "auto", // LLM ne ke yanke shawarar lokacin kiran skill
  MANUAL = "manual", // Ana kira ne kawai ta bayyananniyar buƙatar mai amfani
  HYBRID = "hybrid", // Tantancewar AUTO + damar sauya zaɓi da hannu
}
```

> **Lura**: Codebase ɗin yana ayyana `SkillMode` (AUTO/MANUAL/HYBRID), yayin da filin `Skill.mode` yake amfani da wani tsari na daban (`"on" | "off" | "auto"`). Suna da alaƙa amma ba abu ɗaya ba ne — `SkillMode` na manufar executor ne, `Skill.mode` kuma na kunna ko kashe kowane skill ne.

### Lokacin Amfani da Kowane Mode

| Mode     | Halayyar LLM                                                                                | Yanayin amfani                                               |
| -------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `AUTO`   | LLM na iya kiran skill idan ya ga ya zama dole                                              | Skills na amfanin gama-gari (karanta fayiloli, buƙatun HTTP) |
| `MANUAL` | LLM ba zai iya kiran skill ba; bayyanannen kiran API na `executeSkill` ne kawai ke kiran sa | Ayyuka masu muhimmanci (rubutawa cikin database, biyan kuɗi) |
| `HYBRID` | LLM na iya ba da shawarar skill; dole mai amfani ya tabbatar                                | Skills masu illa ga tsarin amma waɗanda ba su da haɗari      |

### Tantancewar AUTO

Lokacin da mode na `AUTO` yake aiki, ana bai wa kowane skill da ake iya zaɓa maki gwargwadon yanayin buƙatar
ta hanyar `scoreAutoSkill()` a cikin `src/lib/skills/injection.ts` — tsari ne na tara
maki na lamba cikakkiya (dacewar sunan skill, kamanceceniyar token na suna/tag/bayani,
alamu daga dalilin bango, kari/ragin maki na alamar provider). Skills
`AUTO_MAX_SKILLS = 5` mafiya maki waɗanda suke da `score >= AUTO_MIN_SCORE = 3` ne ake saka su a matsayin
kayan aikin da za a iya kira, kuma idan maki sun yi kunnen doki ana warwarewa da `installCount` sannan suna. Duba cikakken jadawalin maki
a [**Ƙirƙirar Schema na Kayan Aiki → Tantancewar AUTO**](#auto-scoring) da ya gabata a wannan
takarda; babu ma'aunin float irin na `0.6`, kuma babu tantancewa a `registry.ts`.

---

## Kundin Built-in Skills

OmniRoute yana zuwa da zaɓaɓɓun built-in skills a cikin `src/lib/skills/builtin/`. Mafi yawan amfani sun haɗa da:

### Skill na Sarrafa Browser Kai Tsaye

Skill na browser (`src/lib/skills/builtin/browser.ts`) yana samar da sarrafa browser marar fuskar mai amfani ta hanyar Playwright/Puppeteer. **An aiwatar da shi amma ba ya cikin kundin skills na asali** — don amfani da shi, shigar da plugin na browser extension daban.

```ts
// Kunna a cikin config ɗinka
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Koyaushe a buƙaci bayyanannen kira
  allowedSkills: ["browser"],
  timeout: 60000, // 60s don loda shafuka
  maxRetries: 1,
};
```

### Sauran Rukunonin Built-in

| Rukuni                  | Skills                                                   | Mode   |
| ----------------------- | -------------------------------------------------------- | ------ |
| Shigarwa/Fitarwar Fayil | `file_read`, `file_write`                                | AUTO   |
| HTTP                    | `http_request`                                           | AUTO   |
| Bincike                 | `web_search`                                             | AUTO   |
| Gudanar da Code         | `eval_code` (JavaScript/Python mai keɓantaccen muhalli)  | HYBRID |
| System                  | `execute_command` (gudanar da CLI a keɓantaccen muhalli) | MANUAL |

### Ƙara Custom Skill

Duba [Plugin SDK & Haɗa Skills](./PLUGIN_SDK.md) don yadda ake ƙara custom skill ta hanyar tsarin plugin.

---

## Duba Kuma

- [MCP-SERVER.md](./MCP-SERVER.md) — rajistar kayan aikin MCP da hanyoyin sufuri
- [A2A-SERVER.md](./A2A-SERVER.md) — zagayowar rayuwar aikin A2A da tura ƙwarewa
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — gabatarwa ga masu amfani
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — bututun sarrafa buƙata da taswirar sassa
- Tushe: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Gwaje-gwaje: `src/lib/skills/__tests__/integration.test.ts`
