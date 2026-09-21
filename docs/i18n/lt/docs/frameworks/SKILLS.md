# Skills Framework (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Tiesos šaltinis:** `src/lib/skills/` ir `src/app/api/skills/`
> **Paskutinį kartą atnaujinta:** 2026-06-28 — v3.8.40

OmniRoute suteikia išplečiamą įgūdžių sistemą, leidžiančią kalbos modeliams (ir operatoriams) komponuoti pakartotinai naudojamas galimybes — nuo failų sistemos skaitymo ir HTTP užklausų iki izoliuoto kodo vykdymo bei kruopščiai atrinktų prekyvietės įgūdžių.

Įgūdis yra versijuotas, schema apibrėžtas darbo vienetas. OmniRoute gali įtraukti įgūdžius kaip įrankių apibrėžtis į siunčiamas užklausas, perimti iš modelio grįžtančius įrankių iškvietimus, paleisti atitinkamą apdorojimo funkciją ir perduoti rezultatą atgal modeliui, kad pokalbis galėtų tęstis. Modelis niekada nemato realizacijos — tik įrankio sąsają.

---

## Agentų įgūdžiai ir Omni įgūdžiai

OmniRoute turi dvi skirtingas, tačiau viena kitą papildančias įgūdžių sistemas:

| Aspektas        | **Omni įgūdžiai** (šis dokumentas)                                        | **Agentų įgūdžiai**                                                                            |
| :-------------- | :------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------- |
| Paskirtis       | LLM įrankių įtraukimas + izoliuotas vykdymas                              | SKILL.md katalogas, skirtas išoriniams agentams aptikti ir naudoti                             |
| Tiesos šaltinis | `src/lib/skills/` + prekyvietė                                            | `src/lib/agentSkills/` + katalogas `skills/`                                                   |
| Veikimo režimas | Įtraukiami į siunčiamas užklausas, vykdomi per įrankių iškvietimo įvykius | Statinis Markdown katalogas + REST/MCP/A2A aptikimo galiniai taškai                            |
| Kas naudoja     | Pats OmniRoute (kombinuotas maršrutizavimas, gaunami LLM iškvietimai)     | Išoriniai agentai, MCP klientai, A2A orkestratoriai                                            |
| Kiekis          | Kintamas (priklauso nuo prekyvietės)                                      | 45 katalogo įrašai (23 API + 21 CLI + 1 konfigūracijos)                                        |
| Formatas        | `SkillDefinition` su įrankio schema + apdorojimo funkcija                 | `SKILL.md` metaduomenų antraštė + Markdown turinys                                             |
| Aptikimas       | `/api/skills/*` REST + `omniroute_skills_*` MCP įrankiai                  | `/api/agent-skills/*` REST + `omniroute_agent_skills_*` MCP įrankiai + A2A `list-capabilities` |

**Omni įgūdžiai** yra vykdymo variklis — jie apibrėžia, ką OmniRoute _gali atlikti_, kai LLM iškviečia įrankį.

**Agentų įgūdžiai** yra dokumentacijos katalogas — struktūrizuotais SKILL.md failais, kuriuos galima tiesiogiai įtraukti į agentų užklausas, jie išoriniams agentams paaiškina, _kaip naudoti_ OmniRoute REST API ir CLI.

Informacijos apie Agentų įgūdžių katalogą, generatorių, MCP įrankius ir A2A įgūdį rasite [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## Sąvokos

### Įgūdžių šaltiniai

Tame pačiame registre naudojami trys įgūdžių šaltiniai:

1. **Integruotieji įgūdžiai** (`src/lib/skills/builtins.ts`) — pateikiami kartu su OmniRoute. Apima dažniausiai pasitaikančius atvejus:
   - `file_read`, `file_write` — kiekvienam API raktui skirta izoliuota darbo sritis, esanti `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — siunčiamas HTTP ryšys per `safeOutboundFetch`, naudojant `guard: "public-only"`
   - `web_search` — keičiamas paieškos teikėjas su podėliu (`executeWebSearch`)
   - `eval_code` — Docker aplinkoje izoliuotas `node` arba `python` vykdymas
   - `execute_command` — Docker aplinkoje izoliuota apvalkalo komanda
   - `browser` — Playwright pagrįsta bazinė struktūra, pagal numatytąsias nuostatas išjungta (`builtin/browser.ts`)
2. **SkillsMP** (OmniRoute prekyvietė) — gaunami iš `https://skillsmp.com/api/v1/skills/search`. Nustatymuose būtinas `skillsmpApiKey`.
3. **SkillsSH** (`skills.sh` bendruomenės katalogas) — gaunami iš `https://skills.sh/api/search`. Autentifikavimas nereikalingas; SKILL.md turinys gaunamas tiesiogiai iš GitHub neapdoroto turinio.

Vienas „aktyvus teikėjas“ nustato, iš kurio katalogo valdymo skydelis diegia įgūdžius (`src/lib/skills/providerSettings.ts`). Jį galite pakeisti skiltyje **Nustatymai → Atmintis ir įgūdžiai**. Numatytoji reikšmė: `skillsmp`.

### Įgūdžio tapatybė

Atminties registre (`src/lib/skills/registry.ts`) įgūdžių raktai yra `name@version`. Versija turi atitikti semantinio versijavimo formatą (`^\d+\.\d+\.\d+$`). `resolveVersion()` supranta `^`, `~`, `>`, `>=`, `<`, `<=`, `==` ir tikslaus atitikimo apribojimus.

### Įgūdžio režimas

Kiekvienas įgūdis turi vykdymo režimą, kuris nustato, kada jis įtraukiamas:

| Režimas | Elgsena                                                                                                           |
| ------- | ----------------------------------------------------------------------------------------------------------------- |
| `on`    | Visada įtraukiamas kaip įrankio apibrėžtis                                                                        |
| `off`   | Niekada neįtraukiamas ir negali būti vykdomas                                                                     |
| `auto`  | Įvertinamas pagal gaunamą užklausą; įtraukiamas tik tada, jei įvertis ≥ `AUTO_MIN_SCORE` (numatytoji reikšmė – 3) |

`auto` yra numatytasis iš prekyvietės įdiegtų įgūdžių režimas. `enabled=true` ir `mode="off"` kartu reiškia „užregistruotas, bet neaktyvus“ — per senąjį stulpelį perjungus `enabled`, taip pat pakeičiamas `mode`, kad senesni kodo vykdymo keliai išliktų suderinti (`src/app/api/skills/[id]/route.ts`).

### Būsena (vykdymai)

Įgūdžių vykdymai stebimi lentelėje `skill_executions`, naudojant šias būsenas (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Registro podėlis

`SkillRegistry` yra vienetinis objektas su 60 sekundžių TTL podėliu (`registry.ts:14`). `loadFromDatabase()` yra idempotentinė ir per `pendingLoad` pašalina pasikartojančius lygiagrečius iškvietimus. Bet kokia rašymo operacija (`register`/`unregister`/`unregisterById`) panaikina podėlio galiojimą. Versijų ieškokite naudodami `getSkillVersions(name)` ir `resolveVersion(name, constraint)`.

### Į teikėją atsižvelgiantis įtraukimas

`injectSkills()`, esanti `src/lib/skills/injection.ts`, yra įvesties taškas, kuris užregistruotus įgūdžius paverčia konkrečiam teikėjui skirtomis įrankių apibrėžtimis:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

Įrankio pavadinimas užkoduojamas kaip `name@version`, kad modeliui jį iškvietus apdorojimo programa galėtų pasirinkti tinkamą versiją.

### AUTO vertinimas

Kai `mode="auto"`, kiekvienas galimas įgūdis įvertinamas pagal užklausos kontekstą (`scoreAutoSkill()` faile `injection.ts`):

| Požymis                                                     | Taškai         |
| ----------------------------------------------------------- | -------------- |
| Įgūdžio pavadinimas kontekste pateikiamas pažodžiui         | +6             |
| Kiekvienas pavadinimo elementas atitinka konteksto elementą | +2             |
| Kiekviena žymos poeilutė atitinka kontekstą                 | +3             |
| Kiekvienas aprašo elementas atitinka kontekstą              | +1             |
| Foninė priežastis atitinka pavadinimo elementą              | +2 už elementą |
| Foninė priežastis atitinka žymą                             | +2 už elementą |
| Teikėjo užuomina žymose atitinka užklausos teikėją          | +2 / −2        |

Įterpiami daugiausia `AUTO_MAX_SKILLS = 5` įgūdžiai, kurių `score >= AUTO_MIN_SCORE = 3`. Vienodų įverčių atveju pirmiausia atsižvelgiama į `installCount` (mažėjančia tvarka), o tada į pavadinimą abėcėlės tvarka (`injection.ts:225-235`).

### Įrankių iškvietimų perėmimas

`handleToolCallExecution()` faile `src/lib/skills/interception.ts` iškviečiama pokalbių apdorojimo programos, kai pirminė paslauga grąžina atsakymą su įrankio iškvietimu:

1. `extractToolCalls()` nuskaito konkrečiam teikėjui būdingas struktūras („OpenAI“ `tool_calls` / „Responses“ `function_call`, „Anthropic“ `tool_use`, „Gemini“ `functionCalls`).
2. Pirmiausia nustatomos integruotųjų įrankių alternatyvos (pvz., `omniroute_web_search` → `web_search`). Integruotosios apdorojimo programos vykdomos tiesiogiai.
3. Visa kita nukreipiama per `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`.
4. Rezultatai įterpiami atgal į atsakymą — kaip `tool_results`, `function_call_output` elementai arba, jei taikoma, „Anthropic“ `tool_result` blokai.

Vykdymo kontekste `customSkillExecutionEnabled` galima nustatyti į `false`, kad būtų leidžiamas tik integruotųjų įrankių perėmimas (tai naudojama užklausų keliuose, kuriuose naudotojo apibrėžtos apdorojimo programos yra aiškiai išjungtos).

---

## Docker smėlio dėžė

Neintegruoti kodo vykdymo keliai (`eval_code`, `execute_command`) vykdomi Docker aplinkoje naudojant `SandboxRunner` (`src/lib/skills/sandbox.ts`). Kiekvienas konteineris paleidžiamas su:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (kai readOnly=true)
```

Numatytosios reikšmės (`SandboxRunner.DEFAULT_CONFIG`):

| Laukas           | Numatytoji reikšmė | Pastabos                                                         |
| ---------------- | ------------------ | ---------------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU)    | Prieš perduodant į `--cpus`, padalijama iš 1000                  |
| `memoryLimit`    | 256 MB             | Griežtoji riba                                                   |
| `timeout`        | 30000 ms           | Švelnusis nutraukimas naudojant `SIGTERM` + `docker kill`        |
| `networkEnabled` | `false`            | Paverčiama į `--network none`                                    |
| `readOnly`       | `true`             | Šakninė FS skirta tik skaityti; `/tmp` ir `/workspace` yra tmpfs |

`SandboxRunner.kill(id)` ir `killAll()` yra prieinami išjungimui; veikiantys konteineriai sekami naudojant `runningContainers: Map<string, ChildProcess>`.

### Smėlio dėžės aplinkos kintamieji

Konfigūruojami per `process.env` faile `src/lib/skills/builtins.ts`:

| Aplinkos kintamasis               | Numatytoji reikšmė | Paskirtis                                                                                                             |
| --------------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB)   | `file_read` ir `file_write` riba                                                                                      |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`           | `http_request` atsako turinio riba                                                                                    |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`           | Skambinančiajam grąžinamų stdout/stderr riba                                                                          |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`            | Numatytoji smėlio dėžėje vykdomų komandų skirtojo laiko riba; daugiausia 60 s                                         |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`            | Pagrindinis išeinančiojo ryšio jungiklis. Nustatykite `1` arba `true`, kad leistumėte įjungti atskiriems iškvietimams |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (žr. toliau)       | Kableliais atskirtas leidžiamų Docker atvaizdų sąrašas                                                                |

Pagal numatytuosius nustatymus leidžiami atvaizdai: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. Visi per `SKILLS_ALLOWED_SANDBOX_IMAGES` pridėti elementai sujungiami su numatytaisiais; nežinomi atvaizdai atmetami funkcijos `normalizeImage()`.

> Pastaba: atskiro `SKILLS_EXECUTION_TIMEOUT_MS` aplinkos kintamojo nėra. Ne smėlio dėžės apdorojimo laiko riba yra tiesiogiai nustatyta į 30 s klasėje `SkillExecutor` (`executor.ts:13`), tačiau vykdymo metu ją galima pakeisti naudojant `skillExecutor.setTimeout(ms)`.

### Darbo srities izoliavimas

`file_read` ir `file_write` kiekvieną kelią nustato santykinai pagal kiekvienam API raktui skirtą darbo sritį, esančią `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`. Kelio perėjimas (`..`) ir draudžiami segmentai (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) atmetami prieš atliekant bet kokias disko įvesties / išvesties operacijas.

### HTTP sustiprinimas

`http_request` (`builtins.ts:257`):

- Leidžiamų metodų sąrašas: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Blokuojamos išeinančios antraštės: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Peradresavimai išjungti (`allowRedirect: false`)
- Nukreipiama per `safeOutboundFetch` su `guard: "public-only"` (privatūs / atgalinės kilpos diapazonai blokuojami)
- Atsakas sutrumpinamas ties `SKILLS_MAX_HTTP_RESPONSE_BYTES`; klientas mato `truncated: true`

---

## Hibridinis vykdytojas (peržiūros versija)

`src/lib/skills/hybrid.ts` apibrėžia `HybridExecutor`, kuris kiekvienam iškvietimui pasirenka tarp `direct` (vykdymo tame pačiame procese) ir `sandbox` vykdymo, o skirtojo laiko viršijimo ar atminties klaidų atveju turi pakartotinio bandymo kelią `autoUpgrade`. Integruotos `directExecutor` / `sandboxRunner` realizacijos yra ruošiniai (`executeDirect`, `executeInSandbox` grąžina laikinus objektus) — laikykite šį modulį kuriama sutartimi. Tikrasis vykdymas vis dar atliekamas per `skillExecutor` + `SandboxRunner`.

---

## Saugykla

Schema apibrėžta dviejose migracijose:

- `src/lib/db/migrations/016_create_skills.sql` — bazinės `skills` ir `skill_executions` lentelės su indeksais `(api_key_id, name)` ir `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — į `skills` prideda `mode`, `source_provider`, `tags` (JSON), `install_count`.

`skill_executions.status` ribojamas duomenų bazės lygmeniu: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## REST API

Visi galiniai taškai yra kataloge `src/app/api/skills/`. Valdymo galiniams taškams (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) būtinas **valdymo autentifikavimas** naudojant `requireManagementAuth()`. Prekyvietės ir diegimo srautai naudoja paprastesnį `isAuthenticated()` (seansą arba API raktą).

| Galinis taškas | Metodas | Paskirtis |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Pateikti registruotų įgūdžių sąrašą. Palaiko `?q=`, `?mode=on            | off | auto`, `?source=skillsmp | skillssh | local`, puslapiavimą |
| `/api/skills/[id]` | PUT | Atnaujinti `enabled` arba `mode` |
| `/api/skills/[id]` | DELETE | Išregistruoti pagal ID |
| `/api/skills/install` | POST | Įdiegti pasirinktinį įgūdį (apdorojimo kodą ir schemą) |
| `/api/skills/marketplace` | GET | Ieškoti SkillsMP kataloge (kai `q` tuščias, grąžinamos populiarios numatytosios parinktys) |
| `/api/skills/marketplace/install` | POST | Įdiegti SkillsMP įgūdį (aktyvus teikėjas turi būti `skillsmp`) |
| `/api/skills/skillssh` | GET | Ieškoti skills.sh kataloge (`?q=&limit=`, ne daugiau kaip 100) |
| `/api/skills/skillssh/install` | POST | Įdiegti skills.sh įgūdį (aktyvus teikėjas turi būti `skillssh`) |
| `/api/skills/executions` | GET | Puslapiuojama vykdymo istorija (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Vienkartinai vykdyti registruotą įgūdį |

Galinis taškas `POST /api/skills/executions` grąžina HTTP `503` su `{ error: "Skills execution is disabled..." }`, kai `settings.skillsEnabled === false` (`executor.ts:42-45`). Operatoriai gali perjungti pagrindinį jungiklį skiltyje **Nustatymai → DI**.

### Pavyzdys: pasirinktinio įgūdžio diegimas

```bash
curl -X POST http://localhost:20128/api/skills/install \
  -H "Authorization: Bearer $OMNIROUTE_MGMT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "reverse-text",
    "version": "1.0.0",
    "description": "Apverčia eilutę",
    "schema": {
      "input":  { "type": "object", "properties": { "text": { "type": "string" } }, "required": ["text"] },
      "output": { "type": "object", "properties": { "reversed": { "type": "string" } } }
    },
    "handlerCode": "echo-handler",
    "apiKeyId": "your-api-key-id"
  }'
```

Eilutė `handlerCode` yra **apdorojimo funkcijos pavadinimo paieška**, o ne vykdomasis kodas. Vykdytojas ją susieja naudodamas `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`). Diegiant iš prekyvietės, SKILL.md tekstas šiame lauke saugomas kaip dokumentacija, o vykdymas nukreipiamas per modelio sugeneruotus įrankių iškvietimus. Savavališkai naudotojo pateiktas pradinis kodas nėra vykdomas naudojant `eval`.

---

## MCP įrankiai

Keturi MCP įrankiai apgaubia įgūdžių sąsają (`open-sse/mcp-server/tools/skillTools.ts`). Jie automatiškai registruojami paleidžiant MCP serverį.

| Įrankis                       | Aprašymas                                                                   |
| ----------------------------- | --------------------------------------------------------------------------- |
| `omniroute_skills_list`       | Pateikia įgūdžių sąrašą; pasirenkami filtrai: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | Įjungia arba išjungia įgūdį pagal `skillId`                                 |
| `omniroute_skills_execute`    | Vykdo įgūdį su įvesties duomenimis                                          |
| `omniroute_skills_executions` | Naujausių vykdymų istorija (numatyta 50, daugiausia 100)                    |

Transporto konfigūravimą ir aprėpties priskyrimus žr. [MCP-SERVER.md](./MCP-SERVER.md).

---

## A2A integracija

`src/lib/skills/a2a.ts` eksportuoja `memory_aware_routing` A2A įgūdžio deskriptorių ir pagalbinę funkciją `registerA2ASkill(registry)`. Pasirinktiniai A2A įgūdžiai yra kataloge `src/lib/a2a/skills/` ir nukreipiami per `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`). Visą užduoties gyvavimo ciklą žr. [A2A-SERVER.md](./A2A-SERVER.md).

---

## Naujo integruoto įgūdžio pridėjimas

1. **Apibrėžkite apdorojimo funkciją** faile `src/lib/skills/builtins.ts` (arba gretimame faile, esančiame `src/lib/skills/builtin/`). Signatūra: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Izoliuotas kodo vykdymo kelias?** Iškvieskite `sandboxRunner.run(image, command, env, sandboxConfig({...}))`. Su leidžiamų elementų sąrašu naudokite `normalizeImage()`.
3. **Failų sistemos kelias?** Prieš naudodami diską visada perduokite per `resolveWorkspacePath(input, context)`.
4. **Tinklo užklausa?** Naudokite `safeOutboundFetch` su `guard: "public-only"`; antraštes išvalykite naudodami `sanitizeHeaders()`.
5. **Užregistruokite**, pridėdami įrašą prie `builtinSkills` (arba paleidimo metu iškviesdami `registerBrowserSkill(executor)` tipo funkciją).
6. **Susiekite integruotų įrankių alternatyvius pavadinimus** (pasirinktinai) faile `BUILTIN_TOOL_ALIASES` (`interception.ts:23`), jei pirminis modelis pateikia kitokį pavadinimą.
7. **Testai** kataloge `src/lib/skills/__tests__/` (Vitest).

---

## Pasirinktinio (neintegruoto) įgūdžio pridėjimas

1. Užregistruokite apdorojimo funkciją paleidžiant procesą:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Įterpkite įgūdį per `POST /api/skills/install` (laukas `handlerCode` turi sutapti su užregistruotos apdorojimo funkcijos pavadinimu).
3. Perjunkite `mode` į `on` arba `auto` naudodami `PUT /api/skills/[id]`.

---

## Eksploatavimo patarimai

- **Pagrindinis jungiklis:** `settings.skillsEnabled = false` blokuoja visų įgūdžių vykdymą, o `/api/skills/executions` grąžina HTTP `503`. Registras ir toliau įkeliamas.
- **Apribokite išeinantį srautą:** palikite `SKILLS_SANDBOX_NETWORK_ENABLED` nenustatytą (numatytoji nuostata), kad izoliuota aplinka būtų visiškai atjungta nuo tinklo. Kiekvieno iškvietimo `networkEnabled: true` vis tiek priklauso nuo pagrindinio leidimo.
- **Leiskite konkrečius atvaizdus:** nustatykite `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"`, kad išplėstumėte leidžiamų elementų sąrašą.
- **Audituokite vykdymus:** tiek `/dashboard/skills/executions`, tiek `omniroute_skills_executions` pateikia užklausas į `skill_executions`. Sėkminguose vykdymuose pateikiamas `durationMs`, o nesėkminguose – `errorMessage`.
- **Podėlio panaikinimas:** po neautomatinių DB pakeitimų iškvieskite `skillRegistry.invalidateCache()`; kitu atveju palaukite 60 s.
- **Anoniminė darbo sritis:** kai `apiKeyId` yra tuščias, visų iškvietimų maišos reikšmės nurodo į tą pačią `"anonymous"` darbo sritį — bendrinimą palaikantis kodas visada turėtų perduoti tikrą raktą.

---

## Vykdymo gyvavimo ciklas (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) yra **vienetinis objektas**, valdantis kiekvieną gebėjimo iškvietimą. Suprasti jo gyvavimo ciklą yra labai svarbu derinant skirtąjį laiką, pakartotinius bandymus ir vykdymo būseną.

### 5 etapų gyvavimo ciklas

```
   iškviesta execute()
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← įtraukta į eilę, dar nepradėta (sukurta DB eilutė)
  └──────┬──────┘
         │ paleisti apdorojimo funkciją
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← apdorojimo funkcija iškviesta taikant skirtąjį laiką
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (kito kelio nėra — nutraukė pirminis procesas)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   DB eilutėje atnaujinta būsena, išvestis, durationMs
```

### Numatytoji konfigūracija

| Nustatymas   | Numatytoji reikšmė | Konfigūruojama naudojant             |
| ------------ | ------------------ | ------------------------------------ |
| `timeout`    | `30000` (30 sek.)  | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`                | `skillExecutor.setMaxRetries(count)` |

> **Svarbu**: Vykdyklė yra vienetinis objektas — `setTimeout()` iškvietimas visuotinai paveikia visus vėlesnius iškvietimus. Atskiro gebėjimo skirtojo laiko nustatymai šiuo metu nepalaikomi; jei skirtingiems gebėjimams reikia skirtingo skirtojo laiko, paleiskite atskirus procesus arba sukurkite vykdyklės atšaką.

### Būsenos reikšmės

Iš `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // Įtraukta į eilę, dar nepradėta
  RUNNING = "running", // Apdorojimo funkcija iškviesta
  SUCCESS = "success", // Apdorojimo funkcija grąžino tinkamą išvestį
  ERROR = "error", // Apdorojimo funkcija išmetė išimtį
  TIMEOUT = "timeout", // Viršytas vykdyklės skirtasis laikas
}
```

> **Pastaba**: Būsena `TIMEOUT` yra apibrėžta išvardijime, tačiau dabartinis vykdyklės įgyvendinimas jos **iš tikrųjų neįrašo į DB** — skirtojo laiko viršijimai pateikiami kaip `ERROR` su pranešimu `"Skill execution timed out"`. Būsenos išvardijimas rezervuotas naudoti ateityje.

### Vykdymų tikrinimas

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Gauti konkretų vykdymą pagal ID
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} per ${exec.durationMs} ms`);
}

// Pateikti naujausių API rakto vykdymų sąrašą
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs} ms)`);
}

// Suskaičiuoti visus vykdymus
const total = skillExecutor.countExecutions("api-key-id");
```

### Pakartotinių bandymų veikimas

Nustatymas `maxRetries` yra saugomas, tačiau vykdyklės metodas `execute()` jo **šiuo metu nenaudoja** — atliekamas tik vienas bandymas. Reikšmė `maxRetries` pateikiama būsimam įgyvendinimui ir ją norintiems nuskaityti kabliams.

Kol kas pakartotiniai bandymai turi būti įgyvendinti pačioje gebėjimo apdorojimo funkcijoje. Integruotieji
gebėjimai registruojami vykdyklėje (pvz., `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)`, esančios `src/lib/skills/builtin/`); bet kuri jūsų
registruojama apdorojimo funkcija gali turėti savo pakartotinių bandymų ciklą:

```ts
// gebėjimo apdorojimo funkcijos viduje
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

## Išsamiai apie SkillMode

`SkillMode` enum (`src/lib/skills/types.ts`) nustato, **kada ir kaip** iškviečiami įgūdžiai:

```ts
enum SkillMode {
  AUTO = "auto", // LLM nusprendžia, kada iškviesti įgūdį
  MANUAL = "manual", // Iškviečiamas tik gavus aiškią naudotojo užklausą
  HYBRID = "hybrid", // AUTO vertinimas + rankinis nepaisymas
}
```

> **Pastaba**: kodo bazėje apibrėžtas `SkillMode` (AUTO/MANUAL/HYBRID), o lauke `Skill.mode` naudojama kitokia forma (`"on" | "off" | "auto"`). Jie susiję, bet nėra tapatūs — `SkillMode` skirtas vykdyklės strategijai, o `Skill.mode` – atskiro įgūdžio įjungimui valdyti.

### Kada naudoti kiekvieną režimą

| Režimas  | LLM elgsena                                                                          | Naudojimo atvejis                                                 |
| -------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `AUTO`   | LLM gali iškviesti įgūdį, kai mano, kad tai būtina                                   | Bendrosios paskirties įgūdžiai (failų skaitymas, HTTP užklausos)  |
| `MANUAL` | LLM negali iškviesti įgūdžio; jį iškviečia tik aiškus `executeSkill` API iškvietimas | Jautrios operacijos (rašymas į duomenų bazę, mokėjimai)           |
| `HYBRID` | LLM gali pasiūlyti įgūdį; naudotojas turi patvirtinti                                | Įgūdžiai, sukeliantys šalutinį poveikį, tačiau nesantys pavojingi |

### AUTO vertinimas

Kai aktyvus `AUTO` režimas, kiekvienas galimas įgūdis įvertinamas pagal užklausos
kontekstą naudojant `scoreAutoSkill()`, esantį `src/lib/skills/injection.ts` — tai adityvioji
sveikųjų taškų sistema (įgūdžio pavadinimo atitiktis, pavadinimo / žymų / aprašo leksemų persidengimas,
foninės priežasties užuominos, teikėjo užuominos premija / nuobauda). Pirmieji
`AUTO_MAX_SKILLS = 5` įgūdžiai, kurių `score >= AUTO_MIN_SCORE = 3`, įterpiami kaip
iškviečiami įrankiai, o lygiųjų atveju pirmenybė nustatoma pagal `installCount`, tada pagal pavadinimą. Visą taškų lentelę
žr. ankstesniame šio dokumento skyriuje [**Įrankių schemos generavimas → AUTO vertinimas**](#auto-scoring);
slankiojo kablelio `0.6` tipo slenksčio ir vertinimo faile `registry.ts` nėra.

---

## Integruotų įgūdžių katalogas

„OmniRoute“ pateikiamas su kruopščiai atrinktu integruotų įgūdžių rinkiniu, esančiu `src/lib/skills/builtin/`. Dažniausiai naudojami:

### Naršyklės automatizavimo įgūdis

Naršyklės įgūdis (`src/lib/skills/builtin/browser.ts`) suteikia naršyklės be grafinės sąsajos automatizavimą naudojant „Playwright“ / „Puppeteer“. **Jis įgyvendintas, tačiau neįtrauktas į numatytąjį įgūdžių katalogą** — norėdami jį naudoti, atskirai įdiekite naršyklės plėtinio papildinį.

```ts
// Įjunkite savo konfigūracijoje
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Visada reikalauti aiškaus iškvietimo
  allowedSkills: ["browser"],
  timeout: 60000, // 60 sek. puslapiams įkelti
  maxRetries: 1,
};
```

### Kitos integruotų įgūdžių kategorijos

| Kategorija    | Įgūdžiai                                    | Režimas |
| ------------- | ------------------------------------------- | ------- |
| Failų I/O     | `file_read`, `file_write`                   | AUTO    |
| HTTP          | `http_request`                              | AUTO    |
| Paieška       | `web_search`                                | AUTO    |
| Kodo vykdymas | `eval_code` (izoliuotas JavaScript/Python)  | HYBRID  |
| Sistema       | `execute_command` (izoliuotas CLI vykdymas) | MANUAL  |

### Pasirinktinio įgūdžio pridėjimas

Kaip pridėti pasirinktinį įgūdį naudojant papildinių sistemą, žr. [Papildinių SDK ir įgūdžių integravimas](./PLUGIN_SDK.md).

---

## Taip pat žr.

- [MCP-SERVER.md](./MCP-SERVER.md) — MCP įrankių registravimas ir transportai
- [A2A-SERVER.md](./A2A-SERVER.md) — A2A užduočių gyvavimo ciklas ir įgūdžių iškvietimas
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — naudotojams skirta įžanga
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — užklausų apdorojimo seka ir komponentų schema
- Pirminis kodas: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Testai: `src/lib/skills/__tests__/integration.test.ts`
