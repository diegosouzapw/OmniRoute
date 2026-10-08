# Skills Framework (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **સત્યનો સ્રોત:** `src/lib/skills/` અને `src/app/api/skills/`
> **છેલ્લે અપડેટ કરેલું:** 2026-06-28 — v3.8.40

OmniRoute એક વિસ્તારી શકાય તેવું Skills ફ્રેમવર્ક પ્રદાન કરે છે, જે ભાષા મોડલ્સને (અને ઑપરેટર્સને) ફરીથી ઉપયોગ કરી શકાય તેવી ક્ષમતાઓ સંયોજિત કરવાની સુવિધા આપે છે — ફાઇલસિસ્ટમ વાંચન અને HTTP વિનંતીઓથી લઈને sandboxed કોડ એક્ઝિક્યુશન અને કાળજીપૂર્વક પસંદ કરેલી marketplace skills સુધી.

Skill એ વર્ઝન ધરાવતું, schema દ્વારા વ્યાખ્યાયિત કાર્યનું એકમ છે. OmniRoute આઉટબાઉન્ડ વિનંતીઓમાં skills ને tool definitions તરીકે દાખલ કરી શકે છે, મોડલ તરફથી પાછા આવતા tool calls ને અટકાવી શકે છે, મેળ ખાતું handler ચલાવી શકે છે અને પરિણામને ફરીથી મોડલને આપી શકે છે જેથી વાર્તાલાપ ચાલુ રહી શકે. મોડલ ક્યારેય અમલીકરણ જોતું નથી — માત્ર tool interface જુએ છે.

---

## Agent Skills વિરુદ્ધ Omni Skills

OmniRoute પાસે બે અલગ પરંતુ પરસ્પર પૂરક skill systems છે:

| પરિમાણ                | **Omni Skills** (આ દસ્તાવેજ)                                    | **Agent Skills**                                                                            |
| :-------------------- | :-------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| હેતુ                  | LLM tool injection + sandboxed એક્ઝિક્યુશન                      | બાહ્ય agents શોધી અને ઉપયોગ કરી શકે તે માટેનો SKILL.md catalog                              |
| સત્યનો સ્રોત          | `src/lib/skills/` + marketplace                                 | `src/lib/agentSkills/` + `skills/` directory                                                |
| Runtime mode          | આઉટબાઉન્ડ વિનંતીઓમાં દાખલ થાય છે, tool-call events પર ચલાવાય છે | Static markdown catalog + REST/MCP/A2A discovery endpoints                                  |
| તેનો ઉપયોગ કોણ કરે છે | OmniRoute પોતે (combo routing, inbound LLM calls)               | બાહ્ય agents, MCP clients, A2A orchestrators                                                |
| સંખ્યા                | પરિવર્તનશીલ (marketplace દ્વારા સંચાલિત)                        | 45 catalog entries (23 API + 21 CLI + 1 config)                                             |
| ફોર્મેટ               | tool schema + handler સાથેનું `SkillDefinition`                 | `SKILL.md` frontmatter + markdown body                                                      |
| શોધ                   | `/api/skills/*` REST + `omniroute_skills_*` MCP tools           | `/api/agent-skills/*` REST + `omniroute_agent_skills_*` MCP tools + A2A `list-capabilities` |

**Omni Skills** એક્ઝિક્યુશન એન્જિન છે — જ્યારે LLM કોઈ tool ને invoke કરે ત્યારે OmniRoute _શું કરી શકે છે_ તે તેઓ વ્યાખ્યાયિત કરે છે.

**Agent Skills** દસ્તાવેજીકરણ catalog છે — તેઓ બાહ્ય agents ને OmniRoute ના REST API અને CLI નો _ઉપયોગ કેવી રીતે કરવો_ તે સમજાવે છે, અને તેમની રચનાબદ્ધ SKILL.md files સીધી agent prompts માં આપી શકાય છે.

Agent Skills catalog, generator, MCP tools અને A2A skill માટે [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md) જુઓ.

---

## ખ્યાલો

### Skill ના સ્રોતો

Skills ના ત્રણ સ્રોતો એક જ registry માં સહઅસ્તિત્વ ધરાવે છે:

1. **Built-in skills** (`src/lib/skills/builtins.ts`) — OmniRoute સાથે આપવામાં આવે છે. તેઓ સામાન્ય ઉપયોગના કિસ્સાઓ આવરી લે છે:
   - `file_read`, `file_write` — `<DATA_DIR>/skills/workspaces/<hashed-key>/` હેઠળ પ્રતિ-API-key sandbox workspace
   - `http_request` — `guard: "public-only"` સાથે `safeOutboundFetch` મારફતે આઉટબાઉન્ડ HTTP
   - `web_search` — caching (`executeWebSearch`) સાથે બદલી શકાય તેવો search provider
   - `eval_code` — Docker-sandboxed `node` અથવા `python` એક્ઝિક્યુશન
   - `execute_command` — Docker-sandboxed shell command
   - `browser` — Playwright-આધારિત scaffolding, ડિફૉલ્ટ રૂપે અક્ષમ (`builtin/browser.ts`)
2. **SkillsMP** (OmniRoute Marketplace) — `https://skillsmp.com/api/v1/skills/search` પરથી મેળવવામાં આવે છે. Settings માં `skillsmpApiKey` જરૂરી છે.
3. **SkillsSH** (`skills.sh` community catalog) — `https://skills.sh/api/search` પરથી મેળવવામાં આવે છે. કોઈ authentication જરૂરી નથી; SKILL.md સામગ્રી GitHub raw પરથી મેળવવામાં આવે છે.

એકમાત્ર "active provider" નક્કી કરે છે કે dashboard કયા catalog માંથી install કરે છે (`src/lib/skills/providerSettings.ts`). તેને **Settings → Memory & Skills** હેઠળ બદલો. ડિફૉલ્ટ: `skillsmp`.

### Skill ની ઓળખ

In-memory registry (`src/lib/skills/registry.ts`) માં skills ને `name@version` દ્વારા કી કરવામાં આવે છે. Version semver (`^\d+\.\d+\.\d+$`) હોવું આવશ્યક છે. `resolveVersion()` `^`, `~`, `>`, `>=`, `<`, `<=`, `==` અને ચોક્કસ મેળના constraints સમજે છે.

### Skill Mode

દરેક skill પાસે runtime mode હોય છે, જે તેને ક્યારે દાખલ કરવી તે નિયંત્રિત કરે છે:

| Mode   | વર્તન                                                                                                     |
| ------ | --------------------------------------------------------------------------------------------------------- |
| `on`   | હંમેશાં tool definition તરીકે દાખલ થાય છે                                                                 |
| `off`  | ક્યારેય દાખલ થતી નથી, ક્યારેય ચલાવી શકાતી નથી                                                             |
| `auto` | આવનારી વિનંતીના આધારે score કરવામાં આવે છે; score ≥ `AUTO_MIN_SCORE` (ડિફૉલ્ટ 3) હોય ત્યારે જ દાખલ થાય છે |

Marketplace પરથી install કરેલી skills માટે `auto` ડિફૉલ્ટ છે. `enabled=true` અને `mode="off"` નો સંયુક્ત અર્થ "registered પરંતુ inactive" થાય છે — legacy column દ્વારા `enabled` toggle કરવાથી `mode` પણ બદલાય છે, જેથી જૂના codepaths સુસંગત રહે (`src/app/api/skills/[id]/route.ts`).

### સ્થિતિઓ (એક્ઝિક્યુશન્સ)

Skill executions ને `skill_executions` table માં નીચેની સ્થિતિઓ સાથે track કરવામાં આવે છે (`src/lib/skills/types.ts`):

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

`SkillRegistry` એ 60-second TTL cache ધરાવતું singleton છે (`registry.ts:14`). `loadFromDatabase()` idempotent છે અને `pendingLoad` મારફતે સમકાલીન calls ને dedupe કરે છે. કોઈપણ write (`register`/`unregister`/`unregisterById`) cache ને invalidate કરે છે. Versions શોધવા માટે `getSkillVersions(name)` અને `resolveVersion(name, constraint)` નો ઉપયોગ કરો.

### Provider-Aware Injection

`src/lib/skills/injection.ts` માંનું `injectSkills()` એ entry point છે, જે registered skills ને provider-specific tool definitions માં રૂપાંતરિત કરે છે:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

ટૂલનું નામ `name@version` તરીકે એન્કોડ કરવામાં આવે છે, જેથી મોડેલ તેને પાછું કૉલ કરે ત્યારે હેન્ડલર યોગ્ય વર્ઝન પસંદ કરી શકે.

### AUTO સ્કોરિંગ

જ્યારે `mode="auto"` હોય, ત્યારે દરેક ઉમેદવાર સ્કિલને વિનંતીના સંદર્ભ સામે સ્કોર કરવામાં આવે છે (`injection.ts` માં `scoreAutoSkill()`):

| સંકેત                                                  | પૉઇન્ટ્સ         |
| ------------------------------------------------------ | ---------------- |
| સ્કિલનું નામ સંદર્ભમાં શબ્દશઃ દેખાય                    | +6               |
| નામનો દરેક ટોકન સંદર્ભના ટોકન સાથે મેળ ખાય             | +2               |
| દરેક ટૅગ સબસ્ટ્રિંગ સંદર્ભ સાથે મેળ ખાય                | +3               |
| વર્ણનનો દરેક ટોકન સંદર્ભ સાથે મેળ ખાય                  | +1               |
| પૃષ્ઠભૂમિનું કારણ નામના ટોકન સાથે મેળ ખાય              | દરેક ટોકન દીઠ +2 |
| પૃષ્ઠભૂમિનું કારણ ટૅગ સાથે મેળ ખાય                     | દરેક ટોકન દીઠ +2 |
| ટૅગ્સમાંનો પ્રદાતા સંકેત વિનંતીના પ્રદાતા સાથે મેળ ખાય | +2 / −2          |

`score >= AUTO_MIN_SCORE = 3` ધરાવતી ટોચની `AUTO_MAX_SKILLS = 5` સ્કિલ્સ ઇન્જેક્ટ કરવામાં આવે છે. સમાન સ્કોરની સ્થિતિમાં પ્રથમ `installCount` (ઉતરતા ક્રમમાં), અને ત્યારબાદ નામના મૂળાક્ષર ક્રમ (`injection.ts:225-235`) દ્વારા નિર્ણય લેવાય છે.

### ટૂલ કૉલ ઇન્ટરસેપ્શન

અપસ્ટ્રીમ દ્વારા ટૂલ-કૉલિંગ પ્રતિસાદ પરત મળ્યા પછી ચૅટ હેન્ડલર દ્વારા `src/lib/skills/interception.ts` માંનું `handleToolCallExecution()` ઇન્વોક કરવામાં આવે છે:

1. `extractToolCalls()` પ્રદાતા-વિશિષ્ટ સ્વરૂપો (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`) વાંચે છે.
2. બિલ્ટ-ઇન ટૂલ ઉપનામો (દા.ત. `omniroute_web_search` → `web_search`) પહેલાં ઉકેલવામાં આવે છે. બિલ્ટ-ઇન હેન્ડલર્સ ઇનલાઇન ચાલે છે.
3. બાકીનું બધું `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })` મારફતે રૂટ થાય છે.
4. પરિણામોને પ્રતિસાદમાં પાછાં જોડવામાં આવે છે — યોગ્યતા મુજબ `tool_results`, `function_call_output` આઇટમ્સ અથવા Anthropic `tool_result` બ્લૉક્સ તરીકે.

એક્ઝિક્યુશન સંદર્ભમાં `customSkillExecutionEnabled` ને `false` પર સેટ કરીને માત્ર બિલ્ટ-ઇન ઇન્ટરસેપ્શનને મંજૂરી આપી શકાય છે (આનો ઉપયોગ એવા વિનંતી પાથ્સ દ્વારા થાય છે જે વપરાશકર્તા-વ્યાખ્યાયિત હેન્ડલર્સને સ્પષ્ટપણે અક્ષમ કરે છે).

---

## Docker સેન્ડબોક્સ

બિલ્ટ-ઇન ન હોય તેવા કોડ પાથ (`eval_code`, `execute_command`) `SandboxRunner` (`src/lib/skills/sandbox.ts`) દ્વારા Dockerની અંદર ચાલે છે. દરેક કન્ટેનર નીચેના વિકલ્પો સાથે શરૂ થાય છે:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (જ્યારે readOnly=true હોય)
```

ડિફૉલ્ટ્સ (`SandboxRunner.DEFAULT_CONFIG`):

| ફીલ્ડ            | ડિફૉલ્ટ         | નોંધો                                                     |
| ---------------- | --------------- | --------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU) | `--cpus`ને આપતાં પહેલાં 1000 વડે ભાગવામાં આવે છે          |
| `memoryLimit`    | 256 MB          | સખત મર્યાદા                                               |
| `timeout`        | 30000 ms        | `SIGTERM` + `docker kill` દ્વારા સોફ્ટ કિલ                |
| `networkEnabled` | `false`         | `--network none` બને છે                                   |
| `readOnly`       | `true`          | રૂટ FS ફક્ત વાંચવા માટે; `/tmp` અને `/workspace` tmpfs છે |

શટડાઉન માટે `SandboxRunner.kill(id)` અને `killAll()` ઉપલબ્ધ કરાવવામાં આવ્યા છે; ચાલી રહેલા કન્ટેનર્સને `runningContainers: Map<string, ChildProcess>`માં ટ્રૅક કરવામાં આવે છે.

### સેન્ડબોક્સ એન્વાયરમેન્ટ વેરિએબલ્સ

`src/lib/skills/builtins.ts`માં `process.env` દ્વારા કન્ફિગર કરેલા છે:

| એન્વાયરમેન્ટ વેરિએબલ              | ડિફૉલ્ટ          | હેતુ                                                                                       |
| --------------------------------- | ---------------- | ------------------------------------------------------------------------------------------ |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB) | `file_read` અને `file_write` માટેની મર્યાદા                                                |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`         | `http_request`ના પ્રતિસાદ બૉડી માટેની મર્યાદા                                              |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`         | કૉલરને પરત અપાતા stdout/stderr માટેની મર્યાદા                                              |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`          | સેન્ડબોક્સ કરેલા કમાન્ડ્સ માટેનો ડિફૉલ્ટ ટાઇમઆઉટ; મહત્તમ 60 s સુધી મર્યાદિત                |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`          | બહાર જતા ટ્રાફિક માટેનો મુખ્ય ગેટ. દરેક કૉલ દીઠ ઑપ્ટ-ઇન મંજૂર કરવા `1` અથવા `true` સેટ કરો |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (નીચે જુઓ)       | Docker ઇમેજોની કૉમા વડે અલગ કરેલી અનુમતિસૂચિ                                               |

ડિફૉલ્ટ રૂપે મંજૂર ઇમેજો: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. `SKILLS_ALLOWED_SANDBOX_IMAGES` દ્વારા કરાયેલા કોઈપણ ઉમેરા ડિફૉલ્ટ્સ સાથે મર્જ કરવામાં આવે છે; અજાણી ઇમેજોને `normalizeImage()` દ્વારા નકારવામાં આવે છે.

> નોંધ: કોઈ અલગ `SKILLS_EXECUTION_TIMEOUT_MS` એન્વાયરમેન્ટ વેરિએબલ નથી. નોન-સેન્ડબોક્સ હેન્ડલરનો ટાઇમઆઉટ `SkillExecutor` (`executor.ts:13`)માં 30 s પર હાર્ડ-કોડ કરેલો છે, પરંતુ રનટાઇમ દરમિયાન `skillExecutor.setTimeout(ms)` દ્વારા તેને ઓવરરાઇડ કરી શકાય છે.

### વર્કસ્પેસ આઇસોલેશન

`file_read` અને `file_write` દરેક પાથને `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/` ખાતેના પ્રતિ-API-કી વર્કસ્પેસના સાપેક્ષ રીતે રિઝોલ્વ કરે છે. કોઈપણ ડિસ્ક I/O પહેલાં પાથ ટ્રાવર્સલ (`..`) અને પ્રતિબંધિત સેગમેન્ટ્સ (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) નકારવામાં આવે છે.

### HTTP હાર્ડનિંગ

`http_request` (`builtins.ts:257`):

- મેથડ અનુમતિસૂચિ: `GET, HEAD, POST, PUT, PATCH, DELETE`
- બ્લૉક કરેલા આઉટબાઉન્ડ હેડર્સ: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- રીડાયરેક્ટ્સ અક્ષમ છે (`allowRedirect: false`)
- `guard: "public-only"` સાથે `safeOutboundFetch` દ્વારા રૂટ કરવામાં આવે છે (પ્રાઇવેટ/લૂપબૅક રેન્જ બ્લૉક કરેલી છે)
- પ્રતિસાદને `SKILLS_MAX_HTTP_RESPONSE_BYTES` પર ટ્રંકેટ કરવામાં આવે છે; ક્લાયન્ટને `truncated: true` દેખાય છે

---

## હાઇબ્રિડ એક્ઝિક્યુટર (પૂર્વાવલોકન)

`src/lib/skills/hybrid.ts` એક `HybridExecutor` વ્યાખ્યાયિત કરે છે, જે દરેક કૉલ માટે `direct` (પ્રક્રિયાની અંદર) અને `sandbox` અમલીકરણ વચ્ચે નિર્ણય કરે છે, તેમજ સમયસમાપ્તિ/મેમરી ભૂલો પર `autoUpgrade` પુનઃપ્રયાસ પાથ ધરાવે છે. સંકલિત `directExecutor` / `sandboxRunner` અમલીકરણો સ્ટબ્સ છે (`executeDirect`, `executeInSandbox` પ્લેસહોલ્ડર ઑબ્જેક્ટ્સ પરત કરે છે) — આ મોડ્યુલને નિર્માણાધીન કરાર તરીકે ગણો. વાસ્તવિક અમલીકરણ હજુ પણ `skillExecutor` + `SandboxRunner` મારફતે થાય છે.

---

## સ્ટોરેજ

સ્કીમા બે માઇગ્રેશન્સમાં છે:

- `src/lib/db/migrations/016_create_skills.sql` — મૂળભૂત `skills` અને `skill_executions` કોષ્ટકો, જેમાં `(api_key_id, name)` અને `(skill_id, status, created_at)` પર ઇન્ડેક્સ છે.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — `skills`માં `mode`, `source_provider`, `tags` (JSON), `install_count` ઉમેરે છે.

`skill_executions.status` ડેટાબેઝ સ્તરે નિયંત્રિત છે: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## REST API

બધા એન્ડપોઇન્ટ્સ `src/app/api/skills/` હેઠળ છે. મેનેજમેન્ટ એન્ડપોઇન્ટ્સ (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) માટે `requireManagementAuth()` મારફતે **મેનેજમેન્ટ પ્રમાણીકરણ** જરૂરી છે. માર્કેટપ્લેસ/ઇન્સ્ટૉલ પ્રવાહો હળવા `isAuthenticated()` (સત્ર અથવા API કી)નો ઉપયોગ કરે છે.

| એન્ડપોઇન્ટ | પદ્ધતિ | હેતુ |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | નોંધાયેલ સ્કિલ્સની યાદી આપે છે. `?q=`, `?mode=on                        | off | auto`, `?source=skillsmp | skillssh | local`, પૃષ્ઠાંકનને સપોર્ટ કરે છે |
| `/api/skills/[id]` | PUT | `enabled` અથવા `mode` અપડેટ કરે છે |
| `/api/skills/[id]` | DELETE | id દ્વારા નોંધણી રદ કરે છે |
| `/api/skills/install` | POST | કસ્ટમ સ્કિલ (હેન્ડલર કોડ + સ્કીમા) ઇન્સ્ટૉલ કરે છે |
| `/api/skills/marketplace` | GET | SkillsMP કૅટલૉગમાં શોધે છે (`q` ખાલી હોય ત્યારે લોકપ્રિય ડિફૉલ્ટ્સ પરત કરે છે) |
| `/api/skills/marketplace/install` | POST | SkillsMP સ્કિલ ઇન્સ્ટૉલ કરે છે (સક્રિય પ્રદાતા = `skillsmp` હોવો જરૂરી છે) |
| `/api/skills/skillssh` | GET | skills.sh કૅટલૉગમાં શોધે છે (`?q=&limit=`, મહત્તમ 100) |
| `/api/skills/skillssh/install` | POST | skills.sh સ્કિલ ઇન્સ્ટૉલ કરે છે (સક્રિય પ્રદાતા = `skillssh` હોવો જરૂરી છે) |
| `/api/skills/executions` | GET | પૃષ્ઠાંકિત અમલીકરણ ઇતિહાસ (`?apiKeyId=`) |
| `/api/skills/executions` | POST | નોંધાયેલ સ્કિલને તાત્કાલિક ધોરણે ચલાવે છે |

જ્યારે `settings.skillsEnabled === false` હોય, ત્યારે `POST /api/skills/executions` એન્ડપોઇન્ટ `{ error: "Skills execution is disabled..." }` સાથે HTTP `503` પરત કરે છે (`executor.ts:42-45`). ઑપરેટર્સ **Settings → AI**માંથી મુખ્ય સ્વિચ બદલી શકે છે.

### ઉદાહરણ: કસ્ટમ સ્કિલ ઇન્સ્ટૉલ કરો

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

`handlerCode` સ્ટ્રિંગ એ **હેન્ડલર નામ લુકઅપ** છે — અમલ કરી શકાય એવો કોડ નથી. એક્ઝિક્યુટર તેને `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`) મારફતે મેપ કરે છે. માર્કેટપ્લેસ ઇન્સ્ટૉલ્સ આ ક્ષેત્રમાં SKILL.md ટેક્સ્ટને દસ્તાવેજીકરણ તરીકે સંગ્રહે છે અને મોડેલ-જનરેટેડ ટૂલ કૉલ્સ મારફતે અમલીકરણ રૂટ કરે છે. વપરાશકર્તા દ્વારા પૂરો પાડવામાં આવેલ મનસ્વી સોર્સનું eval કરવામાં આવતું નથી.

---

## MCP ટૂલ્સ

ચાર MCP ટૂલ્સ સ્કિલ્સ સરફેસ (`open-sse/mcp-server/tools/skillTools.ts`)ને રૅપ કરે છે. MCP સર્વર બૂટ થાય ત્યારે તેઓ આપમેળે રજિસ્ટર થાય છે.

| ટૂલ                           | વર્ણન                                                                   |
| ----------------------------- | ----------------------------------------------------------------------- |
| `omniroute_skills_list`       | સ્કિલ્સની યાદી આપે છે, વૈકલ્પિક ફિલ્ટર્સ: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | `skillId` દ્વારા સ્કિલને સક્ષમ/અક્ષમ કરે છે                             |
| `omniroute_skills_execute`    | ઇનપુટ પેલોડ સાથે સ્કિલ એક્ઝિક્યુટ કરે છે                                |
| `omniroute_skills_executions` | તાજેતરનો એક્ઝિક્યુશન ઇતિહાસ (ડિફૉલ્ટ 50, મહત્તમ 100)                    |

ટ્રાન્સપોર્ટ સેટઅપ અને સ્કોપ અસાઇનમેન્ટ્સ માટે [MCP-SERVER.md](./MCP-SERVER.md) જુઓ.

---

## A2A ઇન્ટિગ્રેશન

`src/lib/skills/a2a.ts`, `memory_aware_routing` A2A સ્કિલ ડિસ્ક્રિપ્ટર અને `registerA2ASkill(registry)` હેલ્પરને એક્સપોર્ટ કરે છે. કસ્ટમ A2A સ્કિલ્સ `src/lib/a2a/skills/`માં રહે છે અને `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`) મારફતે ડિસ્પૅચ થાય છે. સંપૂર્ણ ટાસ્ક લાઇફસાઇકલ માટે [A2A-SERVER.md](./A2A-SERVER.md) જુઓ.

---

## નવી બિલ્ટ-ઇન સ્કિલ ઉમેરવી

1. `src/lib/skills/builtins.ts`માં (અથવા `src/lib/skills/builtin/` હેઠળની સમકક્ષ ફાઇલમાં) **હેન્ડલર વ્યાખ્યાયિત કરો**. સિગ્નેચર: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **સૅન્ડબૉક્સ કરેલો કોડ પાથ?** `sandboxRunner.run(image, command, env, sandboxConfig({...}))` કૉલ કરો. અલાઉલિસ્ટ સામે `normalizeImage()`નો ઉપયોગ કરો.
3. **ફાઇલસિસ્ટમ પાથ?** ડિસ્કને સ્પર્શ કરતા પહેલાં હંમેશાં તેને `resolveWorkspacePath(input, context)`માંથી પસાર કરો.
4. **નેટવર્ક કૉલ?** `guard: "public-only"` સાથે `safeOutboundFetch`નો ઉપયોગ કરો; `sanitizeHeaders()` મારફતે હેડર્સને સેનિટાઇઝ કરો.
5. `builtinSkills`માં એન્ટ્રી ઉમેરીને (અથવા બૂટ સમયે `registerBrowserSkill(executor)` જેવી પદ્ધતિ કૉલ કરીને) **રજિસ્ટર કરો**.
6. જો અપસ્ટ્રીમ મોડેલ અલગ નામ ઉત્સર્જિત કરતું હોય, તો `BUILTIN_TOOL_ALIASES` (`interception.ts:23`)માં **બિલ્ટ-ઇન ટૂલ ઉપનામો જોડો** (વૈકલ્પિક).
7. `src/lib/skills/__tests__/`માં **ટેસ્ટ્સ** (Vitest).

---

## કસ્ટમ (નોન-બિલ્ટ-ઇન) સ્કિલ ઉમેરવી

1. પ્રોસેસ સ્ટાર્ટઅપ વખતે હેન્ડલર રજિસ્ટર કરો:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. `POST /api/skills/install` મારફતે સ્કિલ દાખલ કરો (`handlerCode` ફીલ્ડ રજિસ્ટર કરેલા હેન્ડલરના નામ સાથે મેળ ખાતું હોવું આવશ્યક છે).
3. `PUT /api/skills/[id]` મારફતે `mode`ને `on` અથવા `auto` પર ટૉગલ કરો.

---

## ઑપરેશનલ ટિપ્સ

- **માસ્ટર સ્વિચ:** `settings.skillsEnabled = false` તમામ એક્ઝિક્યુશનને બ્લૉક કરે છે અને `/api/skills/executions` પર HTTP `503` પરત કરે છે. રજિસ્ટ્રી લોડ થવાનું ચાલુ રાખે છે.
- **ઇગ્રેસ લૉક ડાઉન કરો:** સંપૂર્ણપણે એર-ગૅપ્ડ સૅન્ડબૉક્સિંગ માટે `SKILLS_SANDBOX_NETWORK_ENABLED`ને સેટ ન રાખો (ડિફૉલ્ટ). પ્રતિ-કૉલ `networkEnabled: true` માટે પણ માસ્ટર ગેટ આવશ્યક છે.
- **ચોક્કસ ઇમેજિસને મંજૂરી આપો:** અલાઉલિસ્ટ વિસ્તારવા માટે `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` સેટ કરો.
- **એક્ઝિક્યુશન્સનું ઑડિટ કરો:** `/dashboard/skills/executions` અને `omniroute_skills_executions` બંને `skill_executions`ને ક્વેરી કરે છે. સફળ રનમાં `durationMs` સામેલ હોય છે; નિષ્ફળતામાં `errorMessage` સામેલ હોય છે.
- **કૅશ ઇનવૅલિડેશન:** મૅન્યુઅલ DB ફેરફારો પછી `skillRegistry.invalidateCache()` કૉલ કરો; અન્યથા 60 s રાહ જુઓ.
- **અનામિક વર્કસ્પેસ:** જ્યારે `apiKeyId` ખાલી હોય, ત્યારે તમામ કૉલ્સ સમાન `"anonymous"` વર્કસ્પેસમાં હૅશ થાય છે — શેર-અવેર કોડે હંમેશાં વાસ્તવિક કી પાસ કરવી જોઈએ.

---

## એક્ઝિક્યુશન લાઇફસાઇકલ (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) એક **સિંગલટન** છે, જે દરેક સ્કિલ ઇન્વોકેશનનું સંચાલન કરે છે. ટાઇમઆઉટ, રિટ્રાય અને એક્ઝિક્યુશન સ્થિતિને ડિબગ કરવા માટે તેનું લાઇફસાઇકલ સમજવું અત્યંત જરૂરી છે.

### 5-તબક્કાનું લાઇફસાઇકલ

```
   execute() કૉલ થયું
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← કતારમાં છે, હજી શરૂ થયું નથી (DB રો બનાવાઈ)
  └──────┬──────┘
         │ હેન્ડલર શરૂ કરો
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← ટાઇમઆઉટ સાથે હેન્ડલર ઇન્વોક થયું
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (અન્ય કોઈ પાથ નથી — પેરન્ટ દ્વારા સમાપ્ત)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   સ્થિતિ, આઉટપુટ અને durationMs સાથે DB રો અપડેટ થઈ
```

### ડિફૉલ્ટ કન્ફિગરેશન

| સેટિંગ       | ડિફૉલ્ટ       | આના દ્વારા કન્ફિગર કરી શકાય છે       |
| ------------ | ------------- | ------------------------------------ |
| `timeout`    | `30000` (30s) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`           | `skillExecutor.setMaxRetries(count)` |

> **મહત્વપૂર્ણ**: એક્ઝિક્યુટર સિંગલટન છે — `setTimeout()` કૉલ કરવાથી વૈશ્વિક સ્તરે ત્યાર પછીનાં તમામ ઇન્વોકેશન પ્રભાવિત થાય છે. હાલમાં દરેક સ્કિલ માટે અલગ ટાઇમઆઉટ સપોર્ટેડ નથી; જો તમને દરેક સ્કિલ માટે અલગ ટાઇમઆઉટની જરૂર હોય, તો અલગ પ્રોસેસ સબમિટ કરો અથવા એક્ઝિક્યુટરને ફોર્ક કરો.

### સ્ટેટસ મૂલ્યો

`src/lib/skills/types.ts`માંથી:

```ts
enum SkillStatus {
  PENDING = "pending", // કતારમાં છે, હજી શરૂ થયું નથી
  RUNNING = "running", // હેન્ડલર ઇન્વોક થયું
  SUCCESS = "success", // હેન્ડલરે માન્ય આઉટપુટ પરત કર્યું
  ERROR = "error", // હેન્ડલરે એક્સેપ્શન થ્રો કર્યું
  TIMEOUT = "timeout", // એક્ઝિક્યુટરની ટાઇમઆઉટ મર્યાદા વટાવી
}
```

> **નોંધ**: `TIMEOUT` સ્ટેટસ enumમાં નિર્ધારિત છે, પરંતુ વર્તમાન એક્ઝિક્યુટર ઇમ્પ્લિમેન્ટેશન દ્વારા તે **વાસ્તવમાં DBમાં લખાતું નથી** — ટાઇમઆઉટ `"Skill execution timed out"` સંદેશ સાથે `ERROR` તરીકે દેખાય છે. સ્ટેટસ enum ભવિષ્યના ઉપયોગ માટે અનામત છે.

### એક્ઝિક્યુશનની તપાસ કરવી

```ts
import { skillExecutor } from "omniroute/skills/executor";

// ID દ્વારા ચોક્કસ એક્ઝિક્યુશન મેળવો
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// API કી માટે તાજેતરનાં એક્ઝિક્યુશનની સૂચિ મેળવો
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// કુલ એક્ઝિક્યુશનની ગણતરી કરો
const total = skillExecutor.countExecutions("api-key-id");
```

### રિટ્રાયનું વર્તન

`maxRetries` સેટિંગ સંગ્રહિત થાય છે, પરંતુ હાલમાં એક્ઝિક્યુટરની `execute()` મેથડ દ્વારા તેનો **ઉપયોગ થતો નથી** — તે માત્ર એક જ પ્રયાસ કરે છે. `maxRetries` મૂલ્ય ભવિષ્યના ઇમ્પ્લિમેન્ટેશન માટે અને તેને વાંચવા ઇચ્છતા હુક્સ માટે ઉપલબ્ધ કરાવવામાં આવ્યું છે.

હાલ માટે, રિટ્રાય સ્કિલ હેન્ડલરની અંદર જ ઇમ્પ્લિમેન્ટ કરવા આવશ્યક છે. બિલ્ટ-ઇન
સ્કિલ્સ એક્ઝિક્યુટર સાથે રજિસ્ટર કરવામાં આવે છે (દા.ત. `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` `src/lib/skills/builtin/`માં); તમે જે પણ હેન્ડલર
રજિસ્ટર કરો, તે પોતાના રિટ્રાય લૂપને રૅપ કરી શકે છે:

```ts
// સ્કિલ હેન્ડલરની અંદર
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

## SkillMode ની વિગતવાર માહિતી

`SkillMode` enum (`src/lib/skills/types.ts`) કૌશલ્યોને **ક્યારે અને કેવી રીતે** બોલાવવામાં આવે છે તે નિયંત્રિત કરે છે:

```ts
enum SkillMode {
  AUTO = "auto", // કૌશલ્યને ક્યારે કૉલ કરવું તે LLM નક્કી કરે છે
  MANUAL = "manual", // ફક્ત વપરાશકર્તાની સ્પષ્ટ વિનંતી દ્વારા બોલાવવામાં આવે છે
  HYBRID = "hybrid", // AUTO સ્કોરિંગ + મેન્યુઅલ ઓવરરાઇડ
}
```

> **નોંધ**: કોડબેઝ `SkillMode` (AUTO/MANUAL/HYBRID) વ્યાખ્યાયિત કરે છે, જ્યારે `Skill.mode` ફીલ્ડ અલગ સ્વરૂપ (`"on" | "off" | "auto"`) વાપરે છે. તેઓ સંબંધિત છે પરંતુ એકસમાન નથી — `SkillMode` એક્ઝિક્યુટર નીતિ માટે છે, જ્યારે `Skill.mode` દરેક કૌશલ્યને સક્ષમ કરવા માટે છે.

### દરેક મોડનો ઉપયોગ ક્યારે કરવો

| મોડ      | LLM નું વર્તન                                                                     | ઉપયોગનો કિસ્સો                                     |
| -------- | --------------------------------------------------------------------------------- | -------------------------------------------------- |
| `AUTO`   | LLM જ્યારે જરૂરી માને ત્યારે કૌશલ્યને કૉલ કરી શકે છે                              | સામાન્ય હેતુનાં કૌશલ્યો (ફાઇલ વાંચન, HTTP વિનંતીઓ) |
| `MANUAL` | LLM કૌશલ્યને કૉલ કરી શકતું નથી; ફક્ત સ્પષ્ટ `executeSkill` API કૉલ તેને બોલાવે છે | સંવેદનશીલ કામગીરીઓ (ડેટાબેઝ લખાણ, ચુકવણીઓ)         |
| `HYBRID` | LLM કૌશલ્ય સૂચવી શકે છે; વપરાશકર્તાએ પુષ્ટિ કરવી આવશ્યક છે                        | આડઅસરો ધરાવતા પરંતુ જોખમી ન હોય તેવા કૌશલ્યો       |

### AUTO સ્કોરિંગ

જ્યારે `AUTO` મોડ સક્રિય હોય છે, ત્યારે દરેક સંભવિત કૌશલ્યને
`src/lib/skills/injection.ts` માંના `scoreAutoSkill()` દ્વારા વિનંતીના સંદર્ભ સામે સ્કોર આપવામાં આવે છે — આ એક સરવાળા આધારિત,
પૂર્ણાંક પોઇન્ટ સિસ્ટમ છે (કૌશલ્ય-નામ મેળ, નામ/ટૅગ/વર્ણનના ટોકન વચ્ચેનું સામ્ય,
પૃષ્ઠભૂમિ-કારણના સંકેતો, પ્રદાતા-સંકેત બોનસ/દંડ). સૌથી વધુ સ્કોર ધરાવતા
`AUTO_MAX_SKILLS = 5` કૌશલ્યો, જેમનો `score >= AUTO_MIN_SCORE = 3` હોય, તેમને
કૉલ કરી શકાય તેવાં ટૂલ્સ તરીકે દાખલ કરવામાં આવે છે; સમાન સ્કોર હોય તો `installCount` અને ત્યારબાદ નામ દ્વારા ક્રમ નક્કી થાય છે. સંપૂર્ણ પોઇન્ટ કોષ્ટક માટે આ દસ્તાવેજમાં અગાઉનું
[**ટૂલ સ્કીમા જનરેશન → AUTO સ્કોરિંગ**](#auto-scoring) જુઓ;
અહીં ફ્લોટ `0.6`-શૈલીની કોઈ થ્રેશોલ્ડ નથી અને `registry.ts` માં કોઈ સ્કોરિંગ નથી.

---

## બિલ્ટ-ઇન કૌશલ્યોની સૂચિ

OmniRoute માં `src/lib/skills/builtin/` હેઠળ બિલ્ટ-ઇન કૌશલ્યોનો પસંદગીપૂર્વક તૈયાર કરાયેલ સમૂહ સામેલ છે. સૌથી સામાન્ય કૌશલ્યો:

### બ્રાઉઝર ઓટોમેશન કૌશલ્ય

બ્રાઉઝર કૌશલ્ય (`src/lib/skills/builtin/browser.ts`) Playwright/Puppeteer દ્વારા હેડલેસ બ્રાઉઝર ઓટોમેશન પૂરું પાડે છે. **તે અમલમાં મૂકાયેલું છે, પરંતુ ડિફૉલ્ટ કૌશલ્ય સૂચિમાં નથી** — તેનો ઉપયોગ કરવા માટે બ્રાઉઝર એક્સ્ટેન્શન પ્લગઇન અલગથી ઇન્સ્ટૉલ કરો.

```ts
// તમારા કૉન્ફિગમાં સક્ષમ કરો
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // હંમેશા સ્પષ્ટ આહ્વાન જરૂરી રાખો
  allowedSkills: ["browser"],
  timeout: 60000, // પેજ લોડ થવા માટે 60s
  maxRetries: 1,
};
```

### અન્ય બિલ્ટ-ઇન શ્રેણીઓ

| શ્રેણી          | કૌશલ્યો                                             | મોડ    |
| --------------- | --------------------------------------------------- | ------ |
| ફાઇલ I/O        | `file_read`, `file_write`                           | AUTO   |
| HTTP            | `http_request`                                      | AUTO   |
| શોધ             | `web_search`                                        | AUTO   |
| કોડ એક્ઝિક્યુશન | `eval_code` (સૅન્ડબૉક્સ કરેલ JavaScript/Python)     | HYBRID |
| સિસ્ટમ          | `execute_command` (સૅન્ડબૉક્સ કરેલ CLI એક્ઝિક્યુશન) | MANUAL |

### કસ્ટમ કૌશલ્ય ઉમેરવું

પ્લગઇન સિસ્ટમ દ્વારા કસ્ટમ કૌશલ્ય કેવી રીતે ઉમેરવું તે જાણવા માટે [પ્લગઇન SDK અને કૌશલ્ય એકીકરણ](./PLUGIN_SDK.md) જુઓ.

---

## આ પણ જુઓ

- [MCP-SERVER.md](./MCP-SERVER.md) — MCP ટૂલ નોંધણી અને ટ્રાન્સપોર્ટ્સ
- [A2A-SERVER.md](./A2A-SERVER.md) — A2A ટાસ્ક જીવનચક્ર અને સ્કિલ ડિસ્પેચ
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — વપરાશકર્તા-કેન્દ્રિત પરિચય
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — રિક્વેસ્ટ પાઇપલાઇન અને કમ્પોનન્ટ નકશો
- સોર્સ: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- ટેસ્ટ્સ: `src/lib/skills/__tests__/integration.test.ts`
