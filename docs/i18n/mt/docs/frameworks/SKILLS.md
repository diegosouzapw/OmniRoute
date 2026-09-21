# Skills Framework (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Sors awtorevoli:** `src/lib/skills/` u `src/app/api/skills/`
> **Aġġornat l-aħħar:** 2026-06-28 — v3.8.40

OmniRoute jipprovdi qafas estensibbli ta’ Skills li jippermetti lill-mudelli tal-lingwa (u lill-operaturi) jikkomponu kapaċitajiet li jistgħu jerġgħu jintużaw — mill-qari tas-sistema tal-fajls u talbiet HTTP sal-eżekuzzjoni ta’ kodiċi f’ambjent iżolat u skills magħżula mis-suq.

Skill hija unità ta’ xogħol b’verżjoni u definita permezz ta’ schema. OmniRoute jista’ jinjetta skills bħala definizzjonijiet ta’ għodod fit-talbiet li joħorġu, jinterċetta sejħiet ta’ għodod li jirritornaw mill-mudell, iħaddem il-handler korrispondenti, u jgħaddi r-riżultat lura lill-mudell sabiex il-konverżazzjoni tkun tista’ tkompli. Il-mudell qatt ma jara l-implimentazzjoni — jara biss l-interfaċċa tal-għodda.

---

## Agent Skills kontra Omni Skills

OmniRoute għandu żewġ sistemi ta’ skills distinti iżda komplementari:

| Dimensjoni               | **Omni Skills** (dan id-dokument)                                                 | **Agent Skills**                                                                                 |
| :----------------------- | :-------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| Għan                     | Injezzjoni ta’ għodod tal-LLM + eżekuzzjoni f’ambjent iżolat                      | Katalgu SKILL.md biex aġenti esterni jiskopruh u jużawh                                          |
| Sors awtorevoli          | `src/lib/skills/` + is-suq                                                        | `src/lib/agentSkills/` + id-direttorju `skills/`                                                 |
| Modalità waqt it-tħaddim | Injettati fit-talbiet li joħorġu, eżegwiti mal-avvenimenti ta’ sejħiet tal-għodod | Katalgu statiku ta’ markdown + endpoints ta’ skoperta REST/MCP/A2A                               |
| Min jużahom              | OmniRoute innifsu (routing ikkombinat, sejħiet LLM deħlin)                        | Aġenti esterni, klijenti MCP, orkestraturi A2A                                                   |
| Għadd                    | Varjabbli (immexxi mis-suq)                                                       | 45 entrata fil-katalgu (23 API + 21 CLI + 1 konfigurazzjoni)                                     |
| Format                   | `SkillDefinition` bi schema tal-għodda + handler                                  | frontmatter ta’ `SKILL.md` + korp markdown                                                       |
| Skoperta                 | REST `/api/skills/*` + għodod MCP `omniroute_skills_*`                            | REST `/api/agent-skills/*` + għodod MCP `omniroute_agent_skills_*` + `list-capabilities` ta’ A2A |

**Omni Skills** huma l-magna tal-eżekuzzjoni — jiddefinixxu x’_jista’ jagħmel_ OmniRoute meta LLM isejjaħ għodda.

**Agent Skills** huma l-katalgu tad-dokumentazzjoni — jispjegaw lill-aġenti esterni _kif jużaw_ l-API REST u s-CLI ta’ OmniRoute, permezz ta’ fajls SKILL.md strutturati li jistgħu jiddaħħlu direttament fil-prompts tal-aġenti.

Għall-katalgu ta’ Agent Skills, il-ġeneratur, l-għodod MCP, u l-skill A2A, ara [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## Kunċetti

### Sorsi tal-Iskills

Tliet sorsi ta’ skills jeżistu flimkien fl-istess reġistru:

1. **Skills inkorporati** (`src/lib/skills/builtins.ts`) — inklużi ma’ OmniRoute. Ikopru l-każijiet komuni:
   - `file_read`, `file_write` — spazju tax-xogħol iżolat għal kull API key taħt `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — HTTP li joħroġ permezz ta’ `safeOutboundFetch` b’`guard: "public-only"`
   - `web_search` — fornitur ta’ tfittxija sostitwibbli b’caching (`executeWebSearch`)
   - `eval_code` — eżekuzzjoni ta’ `node` jew `python` iżolata permezz ta’ Docker
   - `execute_command` — kmand tax-shell iżolat permezz ta’ Docker
   - `browser` — struttura bażika appoġġjata minn Playwright, diżattivata b’mod predefinit (`builtin/browser.ts`)
2. **SkillsMP** (is-Suq ta’ OmniRoute) — jinġiebu minn `https://skillsmp.com/api/v1/skills/search`. Jeħtieġ `skillsmpApiKey` fis-Settings.
3. **SkillsSH** (il-katalgu komunitarju ta’ `skills.sh`) — jinġiebu minn `https://skills.sh/api/search`. Ma jeħtieġ l-ebda awtentikazzjoni; il-kontenut ta’ SKILL.md jinġibed minn GitHub raw.

“Fornitur attiv” wieħed jikkontrolla minn liema katalgu jinstalla d-dashboard (`src/lib/skills/providerSettings.ts`). Ibiddlu taħt **Settings → Memory & Skills**. Predefinit: `skillsmp`.

### Identità tal-Iskill

L-iskills jiġu identifikati permezz ta’ `name@version` fir-reġistru fil-memorja (`src/lib/skills/registry.ts`). Il-verżjoni trid tkun semver (`^\d+\.\d+\.\d+$`). `resolveVersion()` jifhem ir-restrizzjonijiet `^`, `~`, `>`, `>=`, `<`, `<=`, `==`, u taqbil eżatt.

### Modalità tal-Iskill

Kull skill għandha modalità waqt it-tħaddim li tikkontrolla meta tiġi injettata:

| Modalità | Imġiba                                                                                                       |
| -------- | ------------------------------------------------------------------------------------------------------------ |
| `on`     | Dejjem injettata bħala definizzjoni ta’ għodda                                                               |
| `off`    | Qatt ma tiġi injettata u qatt ma tista’ tiġi eżegwita                                                        |
| `auto`   | Tingħata punteġġ skont it-talba deħla; tiġi injettata biss jekk il-punteġġ ≥ `AUTO_MIN_SCORE` (predefinit 3) |

`auto` hija l-għażla predefinita għall-iskills installati mis-suq. `enabled=true` u `mode="off"` flimkien ifissru “rreġistrata iżda inattiva” — il-bdil ta’ `enabled` permezz tal-kolonna l-antika jaġġorna wkoll `mode` sabiex mogħdijiet antiki tal-kodiċi jibqgħu konsistenti (`src/app/api/skills/[id]/route.ts`).

### Status (eżekuzzjonijiet)

L-eżekuzzjonijiet tal-iskills jiġu ssorveljati fit-tabella `skill_executions` bl-istatuses li ġejjin (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Cache tar-Reġistru

`SkillRegistry` huwa singleton b’cache TTL ta’ 60 sekonda (`registry.ts:14`). `loadFromDatabase()` huwa idempotenti u jneħħi d-duplikazzjoni ta’ sejħiet konkorrenti permezz ta’ `pendingLoad`. Kull kitba (`register`/`unregister`/`unregisterById`) tinvalida l-cache. Fittex il-verżjonijiet permezz ta’ `getSkillVersions(name)` u `resolveVersion(name, constraint)`.

### Injezzjoni Konxja tal-Fornitur

`injectSkills()` f’`src/lib/skills/injection.ts` huwa l-punt tad-dħul li jittrasforma skills irreġistrati f’definizzjonijiet ta’ għodod speċifiċi għall-fornitur:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

L-isem tal-għodda jiġi kkodifikat bħala `name@version` sabiex il-handler ikun jista' jagħżel il-verżjoni t-tajba meta l-mudell isejħilha lura.

### Punteġġ AUTO

Meta `mode="auto"`, kull skill kandidat jingħata punteġġ skont il-kuntest tat-talba (`scoreAutoSkill()` f'`injection.ts`):

| Sinjal                                                       | Punti              |
| ------------------------------------------------------------ | ------------------ |
| Isem l-skill jidher verbatim fil-kuntest                     | +6                 |
| Kull token tal-isem jaqbel ma' token tal-kuntest             | +2                 |
| Kull substring ta' tag jaqbel mal-kuntest                    | +3                 |
| Kull token tad-deskrizzjoni jaqbel mal-kuntest               | +1                 |
| Ir-raġuni fl-isfond taqbel ma' token tal-isem                | +2 għal kull token |
| Ir-raġuni fl-isfond taqbel ma' tag                           | +2 għal kull token |
| Il-ħjiel tal-provider fit-tags jaqbel mal-provider tat-talba | +2 / −2            |

L-aqwa `AUTO_MAX_SKILLS = 5` skills bi `score >= AUTO_MIN_SCORE = 3` jiġu injettati. F'każ ta' parità, din tissolva skont `installCount` (ordni dixxendenti), imbagħad skont l-isem alfabetikament (`injection.ts:225-235`).

### Interċettazzjoni tas-Sejħiet tal-Għodod

`handleToolCallExecution()` f'`src/lib/skills/interception.ts` tiġi invokata mill-handler taċ-chat wara li l-upstream jirritorna tweġiba li ssejjaħ għodda:

1. `extractToolCalls()` taqra l-istrutturi speċifiċi għall-provider (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. L-aliases tal-għodod inkorporati (eż. `omniroute_web_search` → `web_search`) jiġu riżolti l-ewwel. Il-handlers inkorporati jitħaddmu inline.
3. Kull ħaġa oħra tiġi indirizzata permezz ta' `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`.
4. Ir-riżultati jiddaħħlu lura fit-tweġiba — oġġetti `tool_results`, `function_call_output`, jew blokki `tool_result` ta' Anthropic, skont kif ikun xieraq.

`customSkillExecutionEnabled` fil-kuntest tal-eżekuzzjoni tista' tiġi ssettjata għal `false` biex tippermetti biss interċettazzjoni inkorporata (użata minn mogħdijiet tat-talbiet li jiddiżattivaw b'mod espliċitu l-handlers definiti mill-utent).

---

## Sandbox ta’ Docker

Il-mogħdijiet tal-kodiċi li mhumiex integrati (`eval_code`, `execute_command`) jitħaddmu ġewwa Docker permezz ta’ `SandboxRunner` (`src/lib/skills/sandbox.ts`). Kull container jitnieda b’dan li ġej:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (meta readOnly=true)
```

Valuri predefiniti (`SandboxRunner.DEFAULT_CONFIG`):

| Qasam            | Valur predefinit | Noti                                                          |
| ---------------- | ---------------- | ------------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU)  | Jiġi diviż b’1000 qabel ma jgħaddi lil `--cpus`               |
| `memoryLimit`    | 256 MB           | Limitu assolut                                                |
| `timeout`        | 30000 ms         | Twaqqif gradwali permezz ta’ `SIGTERM` + `docker kill`        |
| `networkEnabled` | `false`          | Isir `--network none`                                         |
| `readOnly`       | `true`           | L-FS tal-għerq jinqara biss; `/tmp` u `/workspace` huma tmpfs |

`SandboxRunner.kill(id)` u `killAll()` huma esposti għall-għeluq; il-containers li jkunu qed jitħaddmu jiġu traċċati f’`runningContainers: Map<string, ChildProcess>`.

### Varjabbli tal-Ambjent tas-Sandbox

Ikkonfigurati permezz ta’ `process.env` f’`src/lib/skills/builtins.ts`:

| Varjabbli tal-Ambjent             | Valur Predefinit | Għan                                                                                               |
| --------------------------------- | ---------------- | -------------------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB) | Limitu għal `file_read` u `file_write`                                                             |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`         | Limitu għall-korp tar-rispons ta’ `http_request`                                                   |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`         | Limitu għal stdout/stderr mibgħut lura lil min sejjaħ                                              |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`          | Ħin massimu predefinit għal kmandi fis-sandbox; limitat għal 60 s                                  |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`          | Kontroll ewlieni għall-ħruġ. Issettja `1` jew `true` biex tippermetti attivazzjoni għal kull sejħa |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (ara hawn taħt)  | Lista separata b’virgoli ta’ immaġnijiet Docker permessi                                           |

L-immaġnijiet permessi b’mod predefinit huma: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. Kwalunkwe żieda permezz ta’ `SKILLS_ALLOWED_SANDBOX_IMAGES` tingħaqad mal-valuri predefiniti; immaġnijiet mhux magħrufa jiġu miċħuda minn `normalizeImage()`.

> Nota: ma hemm l-ebda varjabbli tal-ambjent separata `SKILLS_EXECUTION_TIMEOUT_MS`. Il-ħin massimu tal-handler barra mis-sandbox huwa ffissat fil-kodiċi għal 30 s f’`SkillExecutor` (`executor.ts:13`), iżda jista’ jinbidel waqt l-eżekuzzjoni permezz ta’ `skillExecutor.setTimeout(ms)`.

### Iżolament tal-Workspace

`file_read` u `file_write` jirriżolvu kull mogħdija relattivament għal workspace għal kull ċavetta tal-API f’`<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`. Il-qsim tal-mogħdija (`..`) u s-segmenti pprojbiti (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) jiġu miċħuda qabel kwalunkwe I/O fuq id-diska.

### Tisħiħ tas-Sigurtà tal-HTTP

`http_request` (`builtins.ts:257`):

- Lista ta’ metodi permessi: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Headers tal-ħruġ imblukkati: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Direzzjonijiet mill-ġdid diżattivati (`allowRedirect: false`)
- Jgħaddi minn `safeOutboundFetch` b’`guard: "public-only"` (meded privati/loopback imblukkati)
- Ir-rispons jinqata’ f’`SKILLS_MAX_HTTP_RESPONSE_BYTES`; il-klijent jara `truncated: true`

---

## Eżekutur Ibridu (previżjoni)

`src/lib/skills/hybrid.ts` jiddefinixxi `HybridExecutor` li jiddeċiedi bejn eżekuzzjoni `direct` (fl-istess proċess) u `sandbox` għal kull sejħa, b’percorso ta’ prova mill-ġdid `autoUpgrade` f’każ ta’ żbalji ta’ skadenza tal-ħin jew tal-memorja. L-implimentazzjonijiet integrati `directExecutor` / `sandboxRunner` huma provviżorji (`executeDirect`, `executeInSandbox` jirritornaw oġġetti sostituttivi) — ittratta dan il-modulu bħala kuntratt li għadu qed jinbena. L-eżekuzzjoni reali għadha ssir permezz ta’ `skillExecutor` + `SandboxRunner`.

---

## Ħażna

L-iskema tinsab f’żewġ migrazzjonijiet:

- `src/lib/db/migrations/016_create_skills.sql` — it-tabelli bażiċi `skills` u `skill_executions`, b’indiċijiet fuq `(api_key_id, name)` u `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — iżżid `mode`, `source_provider`, `tags` (JSON), `install_count` ma’ `skills`.

`skill_executions.status` huwa ristrett fil-livell tad-database: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## REST API

Il-punti tat-tmiem kollha jinsabu taħt `src/app/api/skills/`. Il-punti tat-tmiem tal-ġestjoni (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) jeħtieġu **awtentikazzjoni tal-ġestjoni** permezz ta’ `requireManagementAuth()`. Il-flussi tas-suq/installazzjoni jużaw `isAuthenticated()` li huwa inqas restrittiv (sessjoni jew ċavetta tal-API).

| Punt tat-tmiem | Metodu | Għan |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Elenka l-ħiliet irreġistrati. Jappoġġja `?q=`, `?mode=on                 | off | auto`, `?source=skillsmp | skillssh | local`, paġinazzjoni |
| `/api/skills/[id]` | PUT | Aġġorna `enabled` jew `mode` |
| `/api/skills/[id]` | DELETE | Neħħi r-reġistrazzjoni skont l-id |
| `/api/skills/install` | POST | Installa ħila personalizzata (kodiċi tal-handler + skema) |
| `/api/skills/marketplace` | GET | Fittex fil-katalgu SkillsMP (jirritorna għażliet popolari awtomatiċi meta `q` ikun vojt) |
| `/api/skills/marketplace/install` | POST | Installa ħila ta’ SkillsMP (jeħtieġ fornitur attiv = `skillsmp`) |
| `/api/skills/skillssh` | GET | Fittex fil-katalgu skills.sh (`?q=&limit=`, limitat għal 100) |
| `/api/skills/skillssh/install` | POST | Installa ħila ta’ skills.sh (jeħtieġ fornitur attiv = `skillssh`) |
| `/api/skills/executions` | GET | Storja tal-eżekuzzjonijiet b’paġinazzjoni (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Eżegwixxi ħila rreġistrata ad hoc |

Il-punt tat-tmiem `POST /api/skills/executions` jirritorna HTTP `503` b’`{ error: "Skills execution is disabled..." }` meta `settings.skillsEnabled === false` (`executor.ts:42-45`). L-operaturi jistgħu jaqilbu l-iswiċċ ewlieni minn **Settings → AI**.

### Eżempju: installa ħila personalizzata

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

Is-sekwenza `handlerCode` hija **tfittxija tal-isem tal-handler** — mhux kodiċi eżegwibbli. L-eżekutur jimmappjaha permezz ta’ `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`). L-installazzjonijiet mis-suq jaħżnu t-test SKILL.md f’dan il-kamp bħala dokumentazzjoni u jidderieġu l-eżekuzzjoni permezz ta’ sejħiet tal-għodod iġġenerati mill-mudell. Sors arbitrarju pprovdut mill-utent ma jiġix evalwat.

---

## Għodod MCP

Erba' għodod MCP jinkapsulaw l-interfaċċa tal-ħiliet (`open-sse/mcp-server/tools/skillTools.ts`). Dawn jiġu rreġistrati awtomatikament meta jibda s-server MCP.

| Għodda                        | Deskrizzjoni                                                            |
| ----------------------------- | ----------------------------------------------------------------------- |
| `omniroute_skills_list`       | Elenka l-ħiliet, b'filtri fakultattivi: `apiKeyId`, `name`, `enabled`   |
| `omniroute_skills_enable`     | Attiva/iddiżattiva ħila permezz ta' `skillId`                           |
| `omniroute_skills_execute`    | Eżegwixxi ħila b'payload tal-input                                      |
| `omniroute_skills_executions` | Storja reċenti tal-eżekuzzjonijiet (50 awtomatikament, massimu ta' 100) |

Ara [MCP-SERVER.md](./MCP-SERVER.md) għall-konfigurazzjoni tat-trasport u l-assenjazzjonijiet tal-ambiti.

---

## Integrazzjoni A2A

`src/lib/skills/a2a.ts` jesporta d-deskrittur tal-ħila A2A `memory_aware_routing` u helper `registerA2ASkill(registry)`. Il-ħiliet A2A personalizzati jinsabu f'`src/lib/a2a/skills/` u jintbagħtu permezz ta' `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`). Ara [A2A-SERVER.md](./A2A-SERVER.md) għaċ-ċiklu tal-ħajja sħiħ tal-kompitu.

---

## Żieda ta' Ħila Inkorporata Ġdida

1. **Iddefinixxi l-handler** f'`src/lib/skills/builtins.ts` (jew f'fajl ieħor taħt `src/lib/skills/builtin/`). Firma: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Mogħdija ta' kodiċi f'sandbox?** Sejjaħ `sandboxRunner.run(image, command, env, sandboxConfig({...}))`. Uża `normalizeImage()` mal-lista ta' dawk permessi.
3. **Mogħdija tas-sistema tal-fajls?** Dejjem għaddiha minn `resolveWorkspacePath(input, context)` qabel ma taċċessa d-diska.
4. **Sejħa tan-network?** Uża `safeOutboundFetch` b'`guard: "public-only"`; issanitizza l-headers permezz ta' `sanitizeHeaders()`.
5. **Irreġistra** billi żżid l-entrata ma' `builtinSkills` (jew billi ssejjaħ stil `registerBrowserSkill(executor)` waqt l-istartjar).
6. **Qabbad l-aliases tal-għodod inkorporati** (fakultattiv) f'`BUILTIN_TOOL_ALIASES` (`interception.ts:23`) jekk il-mudell upstream joħroġ isem differenti.
7. **Testijiet** f'`src/lib/skills/__tests__/` (Vitest).

---

## Żieda ta' Ħila Personalizzata (Mhux Inkorporata)

1. Irreġistra l-handler waqt l-istartjar tal-proċess:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Daħħal il-ħila permezz ta' `POST /api/skills/install` (il-kamp `handlerCode` irid jaqbel mal-isem tal-handler irreġistrat).
3. Issettja `mode` għal `on` jew `auto` permezz ta' `PUT /api/skills/[id]`.

---

## Suġġerimenti Operattivi

- **Swiċċ prinċipali:** `settings.skillsEnabled = false` jimblokka kull eżekuzzjoni u jirritorna HTTP `503` fuq `/api/skills/executions`. Ir-reġistru jkompli jitgħabba.
- **Illimita l-egress:** ħalli `SKILLS_SANDBOX_NETWORK_ENABLED` mhux issettjat (l-imġiba awtomatika) għal sandboxing kompletament iżolat min-network. `networkEnabled: true` għal sejħa individwali xorta jeħtieġ il-kontroll prinċipali.
- **Ippermetti immaġnijiet speċifiċi:** issettja `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` biex testendi l-lista ta' dawk permessi.
- **Awditja l-eżekuzzjonijiet:** kemm `/dashboard/skills/executions` kif ukoll `omniroute_skills_executions` jagħmlu query fuq `skill_executions`. Eżekuzzjonijiet li jirnexxu jinkludu `durationMs`; dawk li jfallu jinkludu `errorMessage`.
- **Invalidazzjoni tal-cache:** sejjaħ `skillRegistry.invalidateCache()` wara bidliet manwali fid-DB; inkella stenna 60 s.
- **Workspace anonimu:** meta `apiKeyId` ikun vojt, is-sejħiet kollha jiġu hashjati lejn l-istess workspace `"anonymous"` — kodiċi konxju tal-kondiviżjoni għandu dejjem jgħaddi key reali.

---

## Ċiklu tal-Ħajja tal-Eżekuzzjoni (v3.8.16+)

Il-`SkillExecutor` (`src/lib/skills/executor.ts`) huwa **singleton** li jimmaniġġja kull invokazzjoni ta' ħila. Il-fehim taċ-ċiklu tal-ħajja tiegħu huwa kruċjali għad-debugging ta' timeouts, tentattivi mill-ġdid, u l-istat tal-eżekuzzjoni.

### Iċ-Ċiklu tal-Ħajja f'5 Stadji

```
   execute() imsejħa
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← fil-kju, għadha ma bdietx (inħolqot ringiela fid-DB)
  └──────┬──────┘
         │ ibda l-handler
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← il-handler ġie invokat b'timeout
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (l-ebda perkors ieħor — mitmum mill-proċess ġenitur)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   Ir-ringiela fid-DB ġiet aġġornata bl-istatus, output, durationMs
```

### Konfigurazzjoni Predefinita

| Issettjar    | Valur predefinit | Konfigurabbli permezz ta'            |
| ------------ | ---------------- | ------------------------------------ |
| `timeout`    | `30000` (30s)    | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`              | `skillExecutor.setMaxRetries(count)` |

> **Importanti**: L-executor huwa singleton — meta ssejjaħ `setTimeout()`, dan jaffettwa globalment l-invokazzjonijiet sussegwenti kollha. Bħalissa, timeouts għal kull ħila individwali mhumiex appoġġjati; jekk teħtieġ timeouts differenti għal kull ħila, niedi proċessi separati jew oħloq fork tal-executor.

### Valuri tal-Istatus

Minn `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // Fil-kju, għadha ma bdietx
  RUNNING = "running", // Il-handler ġie invokat
  SUCCESS = "success", // Il-handler irritorna output validu
  ERROR = "error", // Il-handler tefa' eċċezzjoni
  TIMEOUT = "timeout", // Qabeż it-timeout tal-executor
}
```

> **Nota**: L-istatus `TIMEOUT` huwa ddefinit fl-enum iżda **fil-fatt ma jinkitibx fid-DB** mill-implimentazzjoni attwali tal-executor — it-timeouts jidhru bħala `ERROR` bil-messaġġ `"Skill execution timed out"`. L-enum tal-istatus huwa riżervat għal użu fil-futur.

### Spezzjoni tal-Eżekuzzjonijiet

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Ikseb eżekuzzjoni speċifika skont l-ID
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// Elenka l-eżekuzzjonijiet reċenti għal API key
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// Għodd l-eżekuzzjonijiet totali
const total = skillExecutor.countExecutions("api-key-id");
```

### Imġiba tat-Tentattivi mill-Ġdid

L-issettjar `maxRetries` jinħażen iżda **bħalissa ma jintużax** mill-metodu `execute()` tal-executor — dan iwettaq tentattiv wieħed biss. Il-valur `maxRetries` huwa espost għal implimentazzjoni futura u għal hooks li jkunu jridu jaqrawh.

Għalissa, it-tentattivi mill-ġdid iridu jiġu implimentati fil-handler tal-ħila nnifsu. Il-ħiliet
integrati jiġu rreġistrati mal-executor (eż. `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` f'`src/lib/skills/builtin/`); kwalunkwe handler
li tirreġistra jista' jinkludi l-loop tiegħu stess għat-tentattivi mill-ġdid:

```ts
// ġewwa handler ta' ħila
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

## SkillMode fid-Dettall

L-enum `SkillMode` (`src/lib/skills/types.ts`) jikkontrolla **meta u kif** jiġu invokati l-ħiliet:

```ts
enum SkillMode {
  AUTO = "auto", // L-LLM jiddeċiedi meta jsejjaħ il-ħila
  MANUAL = "manual", // Tiġi invokata biss permezz ta' talba espliċita mill-utent
  HYBRID = "hybrid", // Punteġġ AUTO + override manwali
}
```

> **Nota**: Il-codebase jiddefinixxi `SkillMode` (AUTO/MANUAL/HYBRID), filwaqt li l-field `Skill.mode` juża struttura differenti (`"on" | "off" | "auto"`). Dawn huma relatati iżda mhumiex identiċi — `SkillMode` jintuża għall-politika tal-eżekutur, filwaqt li `Skill.mode` jintuża għall-attivazzjoni ta' kull ħila individwali.

### Meta Għandek Tuża Kull Modalità

| Modalità | Imġiba tal-LLM                                                                              | Każ ta' użu                                                   |
| -------- | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `AUTO`   | L-LLM jista' jsejjaħ il-ħila meta jqisha meħtieġa                                           | Ħiliet għal skop ġenerali (qari ta' files, talbiet HTTP)      |
| `MANUAL` | L-LLM ma jistax isejjaħ il-ħila; tissejjaħ biss minn sejħa API espliċita lil `executeSkill` | Operazzjonijiet sensittivi (kitbiet fid-database, pagamenti)  |
| `HYBRID` | L-LLM jista' jissuġġerixxi l-ħila; l-utent irid jikkonferma                                 | Ħiliet li għandhom effetti sekondarji iżda mhumiex perikolużi |

### Punteġġ AUTO

Meta l-modalità `AUTO` tkun attiva, kull ħila kandidata tingħata punteġġ skont il-kuntest
tat-talba minn `scoreAutoSkill()` f'`src/lib/skills/injection.ts` — sistema addittiva
ta' punti sħaħ (tqabbil tal-isem tal-ħila, koinċidenza ta' tokens fl-isem/tag/deskrizzjoni,
indikazzjonijiet mir-raġuni tal-isfond, bonus/penali għall-indikazzjoni tal-provider). L-aqwa
`AUTO_MAX_SKILLS = 5` ħiliet b'`score >= AUTO_MIN_SCORE = 3` jiġu injettati bħala
għodod li jistgħu jissejħu, u l-paritajiet jinqasmu skont `installCount` u mbagħad l-isem. Ara t-tabella sħiħa tal-punti
f'[**Ġenerazzjoni tal-Iskema tal-Għodod → Punteġġ AUTO**](#auto-scoring) aktar kmieni f'dan
id-dokument; ma hemm l-ebda limitu deċimali bħal `0.6` u l-ebda punteġġ f'`registry.ts`.

---

## Katalgu tal-Ħiliet Inkorporati

OmniRoute jiġi b'sett magħżul ta' ħiliet inkorporati f'`src/lib/skills/builtin/`. L-aktar komuni huma:

### Ħila għall-Awtomazzjoni tal-Browser

Il-ħila tal-browser (`src/lib/skills/builtin/browser.ts`) tipprovdi awtomazzjoni ta' browser mingħajr interfaċċa grafika permezz ta' Playwright/Puppeteer. **Hija implimentata iżda mhijiex inkluża fil-katalgu default tal-ħiliet** — biex tużaha, installa l-plugin tal-estensjoni tal-browser separatament.

```ts
// Attivaha fil-konfigurazzjoni tiegħek
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Dejjem itlob invokazzjoni espliċita
  allowedSkills: ["browser"],
  timeout: 60000, // 60s għat-tagħbija tal-paġni
  maxRetries: 1,
};
```

### Kategoriji Inkorporati Oħra

| Kategorija             | Ħiliet                                        | Modalità |
| ---------------------- | --------------------------------------------- | -------- |
| I/O tal-Files          | `file_read`, `file_write`                     | AUTO     |
| HTTP                   | `http_request`                                | AUTO     |
| Tiftix                 | `web_search`                                  | AUTO     |
| Eżekuzzjoni ta' Kodiċi | `eval_code` (JavaScript/Python f'sandbox)     | HYBRID   |
| Sistema                | `execute_command` (eżekuzzjoni CLI f'sandbox) | MANUAL   |

### Kif Iżżid Ħila Personalizzata

Ara [SDK tal-Plugin u Integrazzjoni tal-Ħiliet](./PLUGIN_SDK.md) biex titgħallem kif iżżid ħila personalizzata permezz tas-sistema tal-plugins.

---

## Ara Wkoll

- [MCP-SERVER.md](./MCP-SERVER.md) — ir-reġistrazzjoni tal-għodod MCP u t-trasporti
- [A2A-SERVER.md](./A2A-SERVER.md) — iċ-ċiklu tal-ħajja tal-kompiti A2A u d-dispaċċ tal-ħiliet
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — introduzzjoni għall-utenti
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — il-pipeline tat-talbiet u l-mappa tal-komponenti
- Sors: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Testijiet: `src/lib/skills/__tests__/integration.test.ts`
