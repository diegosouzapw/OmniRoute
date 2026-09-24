# Skills Framework (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Pinagmumulan ng katotohanan:** `src/lib/skills/` at `src/app/api/skills/`
> **Huling na-update:** 2026-06-28 — v3.8.40

Nagbibigay ang OmniRoute ng napapalawak na framework ng Skills na nagpapahintulot sa mga language model (at operator) na bumuo ng mga kakayahang magagamit muli — mula sa pagbabasa ng filesystem at mga HTTP request hanggang sa pagpapatakbo ng code sa sandbox at mga piniling kasanayan mula sa marketplace.

Ang isang kasanayan ay isang unit ng trabaho na may bersyon at tinukoy ng schema. Maaaring i-inject ng OmniRoute ang mga kasanayan bilang mga depinisyon ng tool sa mga papalabas na request, harangin ang mga tool call na nagmumula sa modelo, patakbuhin ang katugmang handler, at ibalik ang resulta sa modelo upang maipagpatuloy ang pag-uusap. Hindi kailanman nakikita ng modelo ang implementasyon — tanging ang interface ng tool.

---

## Agent Skills kumpara sa Omni Skills

May dalawang magkaiba ngunit magkaugnay na sistema ng kasanayan ang OmniRoute:

| Dimensyon                   | **Omni Skills** (dokumentong ito)                                          | **Agent Skills**                                                                                  |
| :-------------------------- | :------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| Layunin                     | Pag-inject ng LLM tool + pagpapatakbo sa sandbox                           | Catalog ng SKILL.md na maaaring tuklasin at gamitin ng mga panlabas na agent                      |
| Pinagmumulan ng katotohanan | `src/lib/skills/` + marketplace                                            | `src/lib/agentSkills/` + direktoryong `skills/`                                                   |
| Runtime mode                | Ini-inject sa mga papalabas na request, isinasagawa sa mga tool-call event | Static na markdown catalog + mga endpoint sa pagtuklas na REST/MCP/A2A                            |
| Gumagamit nito              | Ang OmniRoute mismo (combo routing, mga papasok na LLM call)               | Mga panlabas na agent, MCP client, A2A orchestrator                                               |
| Bilang                      | Nagbabago (nakabatay sa marketplace)                                       | 45 entry sa catalog (23 API + 21 CLI + 1 config)                                                  |
| Format                      | `SkillDefinition` na may tool schema + handler                             | `SKILL.md` frontmatter + markdown body                                                            |
| Pagtuklas                   | `/api/skills/*` REST + mga MCP tool na `omniroute_skills_*`                | `/api/agent-skills/*` REST + mga MCP tool na `omniroute_agent_skills_*` + A2A `list-capabilities` |

Ang **Omni Skills** ang execution engine — tinutukoy ng mga ito kung ano ang _kayang gawin_ ng OmniRoute kapag tumawag ng tool ang isang LLM.

Ang **Agent Skills** ang catalog ng dokumentasyon — ipinapaliwanag ng mga ito sa mga panlabas na agent _kung paano gamitin_ ang REST API at CLI ng OmniRoute, gamit ang mga nakaayos na SKILL.md file na maaaring direktang ilagay sa mga prompt ng agent.

Para sa catalog, generator, mga MCP tool, at A2A skill ng Agent Skills, tingnan ang [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## Mga Konsepto

### Mga Pinagmumulan ng Kasanayan

Magkakasamang umiiral sa iisang registry ang tatlong pinagmumulan ng mga kasanayan:

1. **Mga built-in na kasanayan** (`src/lib/skills/builtins.ts`) — kasama sa OmniRoute. Sinasaklaw ang mga karaniwang kaso:
   - `file_read`, `file_write` — sandbox workspace para sa bawat API key sa ilalim ng `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — papalabas na HTTP sa pamamagitan ng `safeOutboundFetch` na may `guard: "public-only"`
   - `web_search` — naisasaksak na search provider na may caching (`executeWebSearch`)
   - `eval_code` — pagpapatakbo ng `node` o `python` sa Docker sandbox
   - `execute_command` — shell command sa Docker sandbox
   - `browser` — scaffolding na gumagamit ng Playwright, naka-disable bilang default (`builtin/browser.ts`)
2. **SkillsMP** (ang OmniRoute Marketplace) — kinukuha mula sa `https://skillsmp.com/api/v1/skills/search`. Nangangailangan ng `skillsmpApiKey` sa Settings.
3. **SkillsSH** (community catalog ng `skills.sh`) — kinukuha mula sa `https://skills.sh/api/search`. Hindi kailangan ng authentication; kinukuha ang nilalaman ng SKILL.md mula sa GitHub raw.

Isang "aktibong provider" ang kumokontrol kung saang catalog nag-i-install ang dashboard (`src/lib/skills/providerSettings.ts`). Palitan ito sa ilalim ng **Settings → Memory & Skills**. Default: `skillsmp`.

### Pagkakakilanlan ng Kasanayan

Ginagamit ng mga kasanayan ang `name@version` bilang key sa in-memory registry (`src/lib/skills/registry.ts`). Dapat semver (`^\d+\.\d+\.\d+$`) ang bersyon. Nauunawaan ng `resolveVersion()` ang `^`, `~`, `>`, `>=`, `<`, `<=`, `==`, at mga constraint na eksaktong tumutugma.

### Mode ng Kasanayan

May runtime mode ang bawat kasanayan na kumokontrol kung kailan ito ini-inject:

| Mode   | Gawi                                                                                                         |
| ------ | ------------------------------------------------------------------------------------------------------------ |
| `on`   | Palaging ini-inject bilang depinisyon ng tool                                                                |
| `off`  | Hindi kailanman ini-inject at hindi kailanman maaaring isagawa                                               |
| `auto` | Binibigyan ng score batay sa papasok na request; ini-inject lamang kung score ≥ `AUTO_MIN_SCORE` (default 3) |

`auto` ang default para sa mga kasanayang na-install mula sa marketplace. Kapag magkasabay ang `enabled=true` at `mode="off"`, nangangahulugan itong "nakarehistro ngunit hindi aktibo" — ang pag-toggle sa `enabled` sa pamamagitan ng legacy na column ay ina-update din ang `mode` upang manatiling pare-pareho ang mas lumang mga codepath (`src/app/api/skills/[id]/route.ts`).

### Status (mga pagpapatakbo)

Sinusubaybayan ang mga pagpapatakbo ng kasanayan sa table na `skill_executions` gamit ang mga sumusunod na status (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Cache ng Registry

Ang `SkillRegistry` ay isang singleton na may 60-segundong TTL cache (`registry.ts:14`). Idempotent ang `loadFromDatabase()` at inaalis nito ang mga duplicate na sabayang call sa pamamagitan ng `pendingLoad`. Ang anumang pagsusulat (`register`/`unregister`/`unregisterById`) ay nagpapawalang-bisa sa cache. Hanapin ang mga bersyon sa pamamagitan ng `getSkillVersions(name)` at `resolveVersion(name, constraint)`.

### Injection na Nakabatay sa Provider

Ang `injectSkills()` sa `src/lib/skills/injection.ts` ang entry point na nagko-convert sa mga nakarehistrong kasanayan upang maging mga depinisyon ng tool na partikular sa provider:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

Ang pangalan ng tool ay ine-encode bilang `name@version` upang mapili ng handler ang tamang bersyon kapag tinawag itong muli ng modelo.

### Pagmamarka ng AUTO

Kapag `mode="auto"`, minamarkahan ang bawat kandidatong skill batay sa konteksto ng request (`scoreAutoSkill()` sa `injection.ts`):

| Signal                                                            | Mga Puntos     |
| ----------------------------------------------------------------- | -------------- |
| Eksaktong lumilitaw ang pangalan ng skill sa konteksto            | +6             |
| Tumutugma ang bawat token ng pangalan sa isang token ng konteksto | +2             |
| Tumutugma sa konteksto ang bawat substring ng tag                 | +3             |
| Tumutugma sa konteksto ang bawat token ng paglalarawan            | +1             |
| Tumutugma ang dahilan sa background sa isang token ng pangalan    | +2 bawat token |
| Tumutugma ang dahilan sa background sa isang tag                  | +2 bawat token |
| Tumutugma ang provider hint sa mga tag sa provider ng request     | +2 / −2        |

Ini-inject ang nangungunang `AUTO_MAX_SKILLS = 5` skill na may `score >= AUTO_MIN_SCORE = 3`. Nilulutas ang mga tabla gamit ang `installCount` (pababang ayos), pagkatapos ay ayon sa pangalan sa alpabetikong ayos (`injection.ts:225-235`).

### Pag-intercept sa Tool Call

Ang `handleToolCallExecution()` sa `src/lib/skills/interception.ts` ay tinatawag ng chat handler pagkatapos magbalik ang upstream ng tugon na tumatawag sa tool:

1. Binabasa ng `extractToolCalls()` ang mga format na partikular sa provider (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Inuuna ang pag-resolve sa mga built-in na alias ng tool (hal. `omniroute_web_search` → `web_search`). Isinasagawa nang inline ang mga built-in na handler.
3. Ang lahat ng iba pa ay idinadaan sa `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`.
4. Isinasama pabalik ang mga resulta sa tugon — mga item na `tool_results`, `function_call_output`, o mga block na `tool_result` ng Anthropic, ayon sa naaangkop.

Maaaring itakda sa `false` ang `customSkillExecutionEnabled` sa konteksto ng pagpapatupad upang payagan lamang ang built-in na pag-intercept (ginagamit ng mga request path na tahasang nagdi-disable sa mga handler na tinukoy ng user).

---

## Docker Sandbox

Ang mga hindi built-in na path ng code (`eval_code`, `execute_command`) ay tumatakbo sa loob ng Docker sa pamamagitan ng `SandboxRunner` (`src/lib/skills/sandbox.ts`). Inilulunsad ang bawat container gamit ang:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (kapag readOnly=true)
```

Mga default (`SandboxRunner.DEFAULT_CONFIG`):

| Field            | Default         | Mga Tala                                                       |
| ---------------- | --------------- | -------------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU) | Hinahati sa 1000 bago ipasa sa `--cpus`                        |
| `memoryLimit`    | 256 MB          | Mahigpit na limit                                              |
| `timeout`        | 30000 ms        | Maayos na pagpatay sa pamamagitan ng `SIGTERM` + `docker kill` |
| `networkEnabled` | `false`         | Nagiging `--network none`                                      |
| `readOnly`       | `true`          | Read-only ang root FS; tmpfs ang `/tmp` at `/workspace`        |

Inilalantad ang `SandboxRunner.kill(id)` at `killAll()` para sa pag-shutdown; sinusubaybayan ang mga tumatakbong container sa `runningContainers: Map<string, ChildProcess>`.

### Mga Env Var ng Sandbox

Kino-configure sa pamamagitan ng `process.env` sa `src/lib/skills/builtins.ts`:

| Env Var                           | Default            | Layunin                                                                                             |
| --------------------------------- | ------------------ | --------------------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB)   | Limitasyon para sa `file_read` at `file_write`                                                      |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`           | Limitasyon para sa response body ng `http_request`                                                  |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`           | Limitasyon para sa stdout/stderr na ibinabalik sa tumawag                                           |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`            | Default na timeout para sa mga naka-sandbox na command; limitado sa 60 s                            |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`            | Pangunahing gate para sa egress. Itakda sa `1` o `true` upang payagan ang pag-opt in sa bawat tawag |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (tingnan sa ibaba) | Allowlist ng mga Docker image na pinaghihiwalay ng kuwit                                            |

Mga default na pinapayagang image: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. Ang anumang idaragdag sa pamamagitan ng `SKILLS_ALLOWED_SANDBOX_IMAGES` ay isinasama sa mga default; tinatanggihan ng `normalizeImage()` ang mga hindi kilalang image.

> Paalala: walang hiwalay na `SKILLS_EXECUTION_TIMEOUT_MS` env var. Naka-hard-code sa 30 s ang timeout ng handler na hindi naka-sandbox sa `SkillExecutor` (`executor.ts:13`), ngunit maaari itong palitan habang tumatakbo sa pamamagitan ng `skillExecutor.setTimeout(ms)`.

### Paghihiwalay ng Workspace

Nire-resolve ng `file_read` at `file_write` ang bawat path nang relatibo sa workspace para sa bawat API key sa `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`. Tinatanggihan ang path traversal (`..`) at mga ipinagbabawal na segment (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) bago ang anumang disk I/O.

### Pagpapatibay ng HTTP

`http_request` (`builtins.ts:257`):

- Allowlist ng method: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Mga naka-block na outbound header: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Naka-disable ang mga redirect (`allowRedirect: false`)
- Dinadaan sa `safeOutboundFetch` na may `guard: "public-only"` (naka-block ang mga private/loopback range)
- Pinuputol ang response sa `SKILLS_MAX_HTTP_RESPONSE_BYTES`; nakikita ng client ang `truncated: true`

---

## Hybrid Executor (preview)

Tinutukoy ng `src/lib/skills/hybrid.ts` ang isang `HybridExecutor` na nagpapasya sa pagitan ng `direct` (nasa loob ng proseso) at `sandbox` na pagpapatupad sa bawat tawag, na may landas ng muling pagsubok na `autoUpgrade` kapag nagkaroon ng timeout/memory error. Ang mga naka-wire na implementasyon ng `directExecutor` / `sandboxRunner` ay mga stub (`executeDirect`, `executeInSandbox` ay nagbabalik ng mga placeholder object) — ituring ang module na ito bilang isang kontratang ginagawa pa lamang. Dumadaan pa rin ang aktuwal na pagpapatupad sa `skillExecutor` + `SandboxRunner`.

---

## Imbakan

Makikita ang schema sa dalawang migration:

- `src/lib/db/migrations/016_create_skills.sql` — mga batayang table na `skills` at `skill_executions`, na may mga index sa `(api_key_id, name)` at `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — nagdaragdag ng `mode`, `source_provider`, `tags` (JSON), `install_count` sa `skills`.

Nililimitahan ang `skill_executions.status` sa antas ng database: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## REST API

Makikita ang lahat ng endpoint sa ilalim ng `src/app/api/skills/`. Ang mga endpoint sa pamamahala (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) ay nangangailangan ng **authentication sa pamamahala** sa pamamagitan ng `requireManagementAuth()`. Ginagamit ng mga daloy ng marketplace/pag-install ang mas magaan na `isAuthenticated()` (session o API key).

| Endpoint | Pamamaraan | Layunin |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Ilista ang mga nakarehistrong skill. Sinusuportahan ang `?q=`, `?mode=on                        | off | auto`, `?source=skillsmp | skillssh | local`, pagination |
| `/api/skills/[id]` | PUT | I-update ang `enabled` o `mode` |
| `/api/skills/[id]` | DELETE | Alisin sa pagkakarehistro ayon sa id |
| `/api/skills/install` | POST | Mag-install ng custom na skill (handler code + schema) |
| `/api/skills/marketplace` | GET | Maghanap sa catalog ng SkillsMP (nagbabalik ng mga popular na default kapag walang laman ang `q`) |
| `/api/skills/marketplace/install` | POST | Mag-install ng skill mula sa SkillsMP (nangangailangan ng aktibong provider = `skillsmp`) |
| `/api/skills/skillssh` | GET | Maghanap sa catalog ng skills.sh (`?q=&limit=`, nililimitahan sa 100) |
| `/api/skills/skillssh/install` | POST | Mag-install ng skill mula sa skills.sh (nangangailangan ng aktibong provider = `skillssh`) |
| `/api/skills/executions` | GET | May-pagination na kasaysayan ng pagpapatupad (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Magpatupad ng nakarehistrong skill nang ad-hoc |

Nagbabalik ang endpoint na `POST /api/skills/executions` ng HTTP `503` na may `{ error: "Skills execution is disabled..." }` kapag `settings.skillsEnabled === false` (`executor.ts:42-45`). Maaaring i-toggle ng mga operator ang master switch mula sa **Settings → AI**.

### Halimbawa: mag-install ng custom na skill

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

Ang string na `handlerCode` ay isang **paghahanap ng pangalan ng handler** — hindi executable code. Mina-map ito ng executor sa pamamagitan ng `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`). Iniimbak ng mga installation mula sa marketplace ang teksto ng SKILL.md sa field na ito bilang dokumentasyon at idinadaan ang pagpapatupad sa mga tool call na binuo ng modelo. Hindi ine-eval ang arbitraryong source na ibinigay ng user.

---

## Mga MCP Tool

Apat na MCP tool ang nagbabalot sa skills surface (`open-sse/mcp-server/tools/skillTools.ts`). Awtomatiko silang nirerehistro kapag nag-boot ang MCP server.

| Tool                          | Paglalarawan                                                                       |
| ----------------------------- | ---------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | Ilista ang mga skill, na may opsyonal na mga filter: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | I-enable/i-disable ang isang skill gamit ang `skillId`                             |
| `omniroute_skills_execute`    | Isagawa ang isang skill gamit ang input payload                                    |
| `omniroute_skills_executions` | Kamakailang kasaysayan ng pagpapatupad (default na 50, maximum na 100)             |

Tingnan ang [MCP-SERVER.md](./MCP-SERVER.md) para sa pag-setup ng transport at mga pagtatalaga ng scope.

---

## Integrasyon ng A2A

Ini-export ng `src/lib/skills/a2a.ts` ang A2A skill descriptor na `memory_aware_routing` at isang helper na `registerA2ASkill(registry)`. Ang mga custom na A2A skill ay nasa `src/lib/a2a/skills/` at ipinapadala sa pamamagitan ng `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`). Tingnan ang [A2A-SERVER.md](./A2A-SERVER.md) para sa buong lifecycle ng task.

---

## Pagdaragdag ng Bagong Built-in na Skill

1. **Tukuyin ang handler** sa `src/lib/skills/builtins.ts` (o sa katabing file sa ilalim ng `src/lib/skills/builtin/`). Signature: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Sandboxed na code path?** Tawagin ang `sandboxRunner.run(image, command, env, sandboxConfig({...}))`. Gamitin ang `normalizeImage()` laban sa allowlist.
3. **Filesystem path?** Palaging ipadaan sa `resolveWorkspacePath(input, context)` bago galawin ang disk.
4. **Network call?** Gamitin ang `safeOutboundFetch` na may `guard: "public-only"`; linisin ang mga header sa pamamagitan ng `sanitizeHeaders()`.
5. **Irehistro** sa pamamagitan ng pagdaragdag ng entry sa `builtinSkills` (o pagtawag sa istilong `registerBrowserSkill(executor)` sa pag-boot).
6. **Ikonekta ang mga built-in na tool alias** (opsyonal) sa `BUILTIN_TOOL_ALIASES` (`interception.ts:23`) kung ibang pangalan ang inilalabas ng upstream model.
7. **Mga test** sa `src/lib/skills/__tests__/` (Vitest).

---

## Pagdaragdag ng Custom (Hindi Built-in) na Skill

1. Irehistro ang handler sa pagsisimula ng proseso:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Ipasok ang skill sa pamamagitan ng `POST /api/skills/install` (dapat tumugma ang field na `handlerCode` sa pangalan ng nakarehistrong handler).
3. Ilipat ang `mode` sa `on` o `auto` sa pamamagitan ng `PUT /api/skills/[id]`.

---

## Mga Tip sa Operasyon

- **Pangunahing switch:** Hinaharangan ng `settings.skillsEnabled = false` ang lahat ng pagpapatupad at nagbabalik ng HTTP `503` sa `/api/skills/executions`. Patuloy na naglo-load ang registry.
- **Limitahan ang egress:** panatilihing hindi naka-set ang `SKILLS_SANDBOX_NETWORK_ENABLED` (default) para sa ganap na air-gapped na sandboxing. Nangangailangan pa rin ang bawat tawag na `networkEnabled: true` ng pahintulot mula sa pangunahing gate.
- **Payagan ang mga partikular na image:** i-set ang `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` upang palawakin ang allowlist.
- **I-audit ang mga pagpapatupad:** parehong kini-query ng `/dashboard/skills/executions` at `omniroute_skills_executions` ang `skill_executions`. Kasama sa matagumpay na mga pagtakbo ang `durationMs`; kasama naman sa mga nabigo ang `errorMessage`.
- **Pag-invalidate ng cache:** tawagin ang `skillRegistry.invalidateCache()` pagkatapos ng mga manu-manong pag-edit sa DB; kung hindi, maghintay ng 60 s.
- **Anonymous na workspace:** kapag walang laman ang `apiKeyId`, nagha-hash ang lahat ng tawag sa iisang `"anonymous"` na workspace — dapat palaging magpasa ng tunay na key ang code na isinasaalang-alang ang pagbabahagi.

---

## Lifecycle ng Pagpapatupad (v3.8.16+)

Ang `SkillExecutor` (`src/lib/skills/executor.ts`) ay isang **singleton** na namamahala sa bawat invocation ng skill. Mahalagang maunawaan ang lifecycle nito para sa pag-debug ng mga timeout, retry, at estado ng pagpapatupad.

### Ang 5-Yugtong Lifecycle

```
   tinawag ang execute()
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← nakapila, hindi pa nasisimulan (nagawa na ang row sa DB)
  └──────┬──────┘
         │ simulan ang handler
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← tinawag ang handler na may timeout
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (wala nang ibang landas — pinatigil ng parent)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   Na-update ang row sa DB gamit ang status, output, durationMs
```

### Default na Configuration

| Setting      | Default       | Maaaring i-configure sa pamamagitan ng |
| ------------ | ------------- | -------------------------------------- |
| `timeout`    | `30000` (30s) | `skillExecutor.setTimeout(ms)`         |
| `maxRetries` | `3`           | `skillExecutor.setMaxRetries(count)`   |

> **Mahalaga**: Singleton ang executor — ang pagtawag sa `setTimeout()` ay nakaaapekto sa lahat ng susunod na invocation sa buong sistema. Kasalukuyang hindi sinusuportahan ang mga timeout na partikular sa bawat skill; kung kailangan mo ng magkakaibang timeout para sa bawat skill, magsumite ng magkakahiwalay na proseso o i-fork ang executor.

### Mga Value ng Status

Mula sa `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // Nakapila, hindi pa nasisimulan
  RUNNING = "running", // Tinawag ang handler
  SUCCESS = "success", // Nagbalik ang handler ng wastong output
  ERROR = "error", // Nag-throw ng exception ang handler
  TIMEOUT = "timeout", // Lumampas sa timeout ng executor
}
```

> **Tandaan**: Ang status na `TIMEOUT` ay tinukoy sa enum ngunit **hindi talaga isinusulat sa DB** ng kasalukuyang implementasyon ng executor — lumilitaw ang mga timeout bilang `ERROR` na may mensaheng `"Skill execution timed out"`. Nakalaan ang status enum para sa paggamit sa hinaharap.

### Pagsusuri sa mga Pagpapatupad

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Kunin ang isang partikular na pagpapatupad ayon sa ID
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// Ilista ang mga kamakailang pagpapatupad para sa isang API key
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// Bilangin ang kabuuang mga pagpapatupad
const total = skillExecutor.countExecutions("api-key-id");
```

### Gawi ng Retry

Naka-store ang setting na `maxRetries` ngunit **hindi ito kasalukuyang ginagamit** ng method na `execute()` ng executor — iisang pagtatangka lamang ang ginagawa nito. Inilalantad ang value na `maxRetries` para sa implementasyon sa hinaharap at para sa mga hook na nais itong basahin.

Sa ngayon, kailangang ipatupad ang mga retry sa loob mismo ng skill handler. Ang mga built-in na
skill ay nakarehistro sa executor (hal. `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` sa `src/lib/skills/builtin/`); anumang handler
ang irehistro mo ay maaaring mag-wrap ng sarili nitong retry loop:

```ts
// sa loob ng isang skill handler
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

## Detalyadong Paliwanag sa SkillMode

Kinokontrol ng `SkillMode` enum (`src/lib/skills/types.ts`) kung **kailan at paano** ipinapatupad ang mga skill:

```ts
enum SkillMode {
  AUTO = "auto", // LLM ang nagpapasya kung kailan tatawagin ang skill
  MANUAL = "manual", // Ipinapatupad lamang sa tahasang kahilingan ng user
  HYBRID = "hybrid", // AUTO na pagmamarka + manual na pag-override
}
```

> **Tandaan**: Tinutukoy ng codebase ang `SkillMode` (AUTO/MANUAL/HYBRID), samantalang gumagamit ang field na `Skill.mode` ng ibang anyo (`"on" | "off" | "auto"`). Magkaugnay ang mga ito ngunit hindi magkapareho — ang `SkillMode` ay para sa patakaran ng executor, habang ang `Skill.mode` ay para sa pagpapagana ng bawat skill.

### Kailan Gagamitin ang Bawat Mode

| Mode     | Gawi ng LLM                                                                                            | Gamit                                                              |
| -------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| `AUTO`   | Maaaring tawagin ng LLM ang skill kapag itinuturing nitong kinakailangan                               | Mga pangkalahatang skill (pagbasa ng file, mga HTTP request)       |
| `MANUAL` | Hindi maaaring tawagin ng LLM ang skill; tahasang `executeSkill` API call lamang ang nagpapatupad dito | Mga sensitibong operasyon (pagsusulat sa database, mga pagbabayad) |
| `HYBRID` | Maaaring imungkahi ng LLM ang skill; kailangang kumpirmahin ito ng user                                | Mga skill na may side effect ngunit hindi mapanganib               |

### AUTO na Pagmamarka

Kapag aktibo ang `AUTO` mode, minamarkahan ang bawat kandidatong skill batay sa context ng request
ng `scoreAutoSkill()` sa `src/lib/skills/injection.ts` — isang additive na
sistema ng mga integer point (pagtutugma ng pangalan ng skill, overlap ng token sa pangalan/tag/paglalarawan,
mga pahiwatig ng dahilan sa background, bonus/penalty sa pahiwatig ng provider). Ang nangungunang
`AUTO_MAX_SKILLS = 5` skill na may `score >= AUTO_MIN_SCORE = 3` ay ini-inject bilang
mga tool na maaaring tawagin, at ang mga tabla ay pinagpapasyahan batay sa `installCount` at pagkatapos ay sa pangalan. Tingnan ang kumpletong talahanayan ng mga point
sa [**Pagbuo ng Tool Schema → AUTO na Pagmamarka**](#auto-scoring) sa naunang bahagi ng
dokumentong ito; walang float na threshold na gaya ng `0.6` at walang pagmamarka sa `registry.ts`.

---

## Catalog ng mga Built-in na Skill

Kasama sa OmniRoute ang isang piniling hanay ng mga built-in na skill sa `src/lib/skills/builtin/`. Narito ang mga pinakakaraniwan:

### Skill sa Browser Automation

Nagbibigay ang browser skill (`src/lib/skills/builtin/browser.ts`) ng headless browser automation sa pamamagitan ng Playwright/Puppeteer. **Ipinatupad na ito ngunit hindi kasama sa default na catalog ng mga skill** — upang magamit ito, hiwalay na i-install ang browser extension plugin.

```ts
// Paganahin sa iyong config
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Palaging mangailangan ng tahasang pagpapatupad
  allowedSkills: ["browser"],
  timeout: 60000, // 60s para sa pag-load ng mga page
  maxRetries: 1,
};
```

### Iba Pang mga Built-in na Kategorya

| Kategorya            | Mga Skill                                               | Mode   |
| -------------------- | ------------------------------------------------------- | ------ |
| File I/O             | `file_read`, `file_write`                               | AUTO   |
| HTTP                 | `http_request`                                          | AUTO   |
| Paghahanap           | `web_search`                                            | AUTO   |
| Pagpapatupad ng Code | `eval_code` (naka-sandbox na JavaScript/Python)         | HYBRID |
| System               | `execute_command` (naka-sandbox na pagpapatupad ng CLI) | MANUAL |

### Pagdaragdag ng Custom na Skill

Tingnan ang [Plugin SDK at Integrasyon ng mga Skill](./PLUGIN_SDK.md) upang malaman kung paano magdagdag ng custom na skill sa pamamagitan ng plugin system.

---

## Tingnan Din

- [MCP-SERVER.md](./MCP-SERVER.md) — pagpaparehistro ng MCP tool at mga transport
- [A2A-SERVER.md](./A2A-SERVER.md) — lifecycle ng A2A task at pagpapadala sa skill
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — panimulang gabay para sa user
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — pipeline ng request at mapa ng mga component
- Source: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Mga test: `src/lib/skills/__tests__/integration.test.ts`
