# Skills Framework (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Извор истине:** `src/lib/skills/` и `src/app/api/skills/`
> **Последњи пут ажурирано:** 2026-06-28 — v3.8.40

OmniRoute пружа прошириви оквир за вештине који језичким моделима (и оператерима) омогућава да комбинују поново употребљиве могућности — од читања система датотека и HTTP захтева до извршавања кода у изолованом окружењу и одабраних вештина са тржишта.

Вештина је верзионисана јединица рада дефинисана шемом. OmniRoute може да убаци вештине као дефиниције алата у одлазне захтеве, пресретне позиве алата које модел враћа, покрене одговарајући обрађивач и проследи резултат назад моделу како би разговор могао да се настави. Модел никада не види имплементацију — само интерфејс алата.

---

## Агентске вештине и Omni вештине

OmniRoute има два различита, али комплементарна система вештина:

| Димензија        | **Omni вештине** (овај документ)                                      | **Агентске вештине**                                                                        |
| :--------------- | :-------------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| Сврха            | Убацивање LLM алата + извршавање у изолованом окружењу                | SKILL.md каталог који спољни агенти могу да откривају и користе                             |
| Извор истине     | `src/lib/skills/` + тржиште                                           | `src/lib/agentSkills/` + директоријум `skills/`                                             |
| Режим извршавања | Убацују се у одлазне захтеве и извршавају при догађајима позива алата | Статички markdown каталог + REST/MCP/A2A крајње тачке за откривање                          |
| Ко их користи    | Сам OmniRoute (комбиновано усмеравање, долазни LLM позиви)            | Спољни агенти, MCP клијенти, A2A оркестратори                                               |
| Број             | Променљив (зависи од тржишта)                                         | 45 ставки каталога (23 API + 21 CLI + 1 конфигурациона)                                     |
| Формат           | `SkillDefinition` са шемом алата + обрађивачем                        | `SKILL.md` уводни метаподаци + markdown тело                                                |
| Откривање        | `/api/skills/*` REST + `omniroute_skills_*` MCP алати                 | `/api/agent-skills/*` REST + `omniroute_agent_skills_*` MCP алати + A2A `list-capabilities` |

**Omni вештине** представљају механизам за извршавање — оне дефинишу шта OmniRoute _може да уради_ када LLM позове алат.

**Агентске вештине** представљају каталог документације — оне спољним агентима објашњавају _како да користе_ OmniRoute REST API и CLI, помоћу структурираних SKILL.md датотека које се могу директно проследити у упите агената.

За каталог агентских вештина, генератор, MCP алате и A2A вештину погледајте [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## Концепти

### Извори вештина

Три извора вештина постоје истовремено у истом регистру:

1. **Уграђене вештине** (`src/lib/skills/builtins.ts`) — испоручују се уз OmniRoute. Покривају уобичајене случајеве:
   - `file_read`, `file_write` — изоловани радни простор по API кључу у оквиру `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — одлазни HTTP преко `safeOutboundFetch` са `guard: "public-only"`
   - `web_search` — заменљиви добављач претраге са кеширањем (`executeWebSearch`)
   - `eval_code` — извршавање `node` или `python` кода у Docker изолованом окружењу
   - `execute_command` — извршавање команде љуске у Docker изолованом окружењу
   - `browser` — основна структура заснована на Playwright-у, подразумевано онемогућена (`builtin/browser.ts`)
2. **SkillsMP** (OmniRoute тржиште) — преузима се са `https://skillsmp.com/api/v1/skills/search`. Захтева `skillsmpApiKey` у подешавањима.
3. **SkillsSH** (`skills.sh` каталог заједнице) — преузима се са `https://skills.sh/api/search`. Аутентификација није потребна; SKILL.md садржај се преузима директно са GitHub-а.

Један „активни добављач“ одређује из ког каталога контролна табла инсталира вештине (`src/lib/skills/providerSettings.ts`). Промените га у одељку **Подешавања → Меморија и вештине**. Подразумевано: `skillsmp`.

### Идентитет вештине

Вештине се у регистру у меморији идентификују помоћу `name@version` (`src/lib/skills/registry.ts`). Верзија мора да буде у semver формату (`^\d+\.\d+\.\d+$`). `resolveVersion()` разуме ограничења `^`, `~`, `>`, `>=`, `<`, `<=`, `==` и ограничења тачног подударања.

### Режим вештине

Свака вештина има режим извршавања који одређује када се убацује:

| Режим  | Понашање                                                                                                 |
| ------ | -------------------------------------------------------------------------------------------------------- |
| `on`   | Увек се убацује као дефиниција алата                                                                     |
| `off`  | Никада се не убацује и никада се не може извршити                                                        |
| `auto` | Оцењује се у односу на долазни захтев; убацује се само ако је оцена ≥ `AUTO_MIN_SCORE` (подразумевано 3) |

`auto` је подразумевани режим за вештине инсталиране са тржишта. `enabled=true` и `mode="off"` заједно значе „регистрована, али неактивна“ — промена вредности `enabled` преко застареле колоне такође ажурира `mode`, како би старије путање кода остале усклађене (`src/app/api/skills/[id]/route.ts`).

### Статус (извршавања)

Извршавања вештина прате се у табели `skill_executions` са следећим статусима (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Кеш регистра

`SkillRegistry` је singleton са TTL кешом од 60 секунди (`registry.ts:14`). `loadFromDatabase()` је идемпотентан и дедуплицира истовремене позиве помоћу `pendingLoad`. Свако уписивање (`register`/`unregister`/`unregisterById`) поништава кеш. Верзије потражите помоћу `getSkillVersions(name)` и `resolveVersion(name, constraint)`.

### Убацивање прилагођено добављачу

`injectSkills()` у `src/lib/skills/injection.ts` је улазна тачка која регистроване вештине претвара у дефиниције алата специфичне за добављача:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

Назив алата је кодиран као `name@version` како би руковалац могао да изабере одговарајућу верзију када га модел позове.

### AUTO бодовање

Када је `mode="auto"`, свака вештина-кандидат се бодује у односу на контекст захтева (`scoreAutoSkill()` у `injection.ts`):

| Сигнал                                                  | Поени        |
| ------------------------------------------------------- | ------------ |
| Назив вештине се дословно појављује у контексту         | +6           |
| Сваки токен назива се подудара са токеном контекста     | +2           |
| Сваки подниска ознаке се подудара са контекстом         | +3           |
| Сваки токен описа се подудара са контекстом             | +1           |
| Разлог у позадини се подудара са токеном назива         | +2 по токену |
| Разлог у позадини се подудара са ознаком                | +2 по токену |
| Назнака добављача у ознакама одговара добављачу захтева | +2 / −2      |

Убацује се највише `AUTO_MAX_SKILLS = 5` вештина са `score >= AUTO_MIN_SCORE = 3`. Изједначења се разрешавају према `installCount` (опадајуће), а затим према називу по абецедном реду (`injection.ts:225-235`).

### Пресретање позива алата

`handleToolCallExecution()` у `src/lib/skills/interception.ts` позива руковалац ћаскања након што надређени сервис врати одговор који позива алат:

1. `extractToolCalls()` чита формате специфичне за добављача (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Алијаси уграђених алата (нпр. `omniroute_web_search` → `web_search`) прво се разрешавају. Уграђени руковаоци се извршавају непосредно.
3. Све остало се усмерава кроз `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`.
4. Резултати се умећу назад у одговор — као `tool_results`, ставке `function_call_output` или Anthropic блокови `tool_result`, у зависности од формата.

`customSkillExecutionEnabled` у контексту извршавања може да се постави на `false` како би било дозвољено само пресретање уграђених алата (користе га путање захтева које изричито онемогућавају кориснички дефинисане руковаоце).

---

## Docker sandbox

Putanje koda koje nisu ugrađene (`eval_code`, `execute_command`) izvršavaju se unutar Docker-a putem `SandboxRunner` (`src/lib/skills/sandbox.ts`). Svaki kontejner se pokreće sa:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (kada je readOnly=true)
```

Podrazumevane vrednosti (`SandboxRunner.DEFAULT_CONFIG`):

| Polje            | Podrazumevana vrednost | Napomene                                                       |
| ---------------- | ---------------------- | -------------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU)        | Deli se sa 1000 pre prosleđivanja opciji `--cpus`              |
| `memoryLimit`    | 256 MB                 | Čvrsto ograničenje                                             |
| `timeout`        | 30000 ms               | Blago zaustavljanje putem `SIGTERM` + `docker kill`            |
| `networkEnabled` | `false`                | Postaje `--network none`                                       |
| `readOnly`       | `true`                 | Korenski FS je samo za čitanje; `/tmp` i `/workspace` su tmpfs |

`SandboxRunner.kill(id)` i `killAll()` su dostupni za gašenje; aktivni kontejneri se prate u `runningContainers: Map<string, ChildProcess>`.

### Promenljive okruženja sandbox-a

Konfigurišu se putem `process.env` u `src/lib/skills/builtins.ts`:

| Promenljiva okruženja             | Podrazumevana vrednost | Namena                                                                                                  |
| --------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB)       | Ograničenje za `file_read` i `file_write`                                                               |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`               | Ograničenje veličine tela odgovora za `http_request`                                                    |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`               | Ograničenje za stdout/stderr koji se vraća pozivaocu                                                    |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`                | Podrazumevano vremensko ograničenje za komande u sandbox-u; najviše 60 s                                |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`                | Glavna kontrola izlaznog saobraćaja. Postavite `1` ili `true` da biste omogućili uključivanje po pozivu |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (pogledajte ispod)     | Lista dozvoljenih Docker slika razdvojenih zarezima                                                     |

Podrazumevano dozvoljene slike: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. Svi dodaci navedeni putem `SKILLS_ALLOWED_SANDBOX_IMAGES` objedinjuju se sa podrazumevanim vrednostima; `normalizeImage()` odbacuje nepoznate slike.

> Napomena: ne postoji zasebna promenljiva okruženja `SKILLS_EXECUTION_TIMEOUT_MS`. Vremensko ograničenje rukovaoca van sandbox-a čvrsto je postavljeno na 30 s u `SkillExecutor` (`executor.ts:13`), ali se može promeniti tokom izvršavanja putem `skillExecutor.setTimeout(ms)`.

### Izolacija radnog prostora

`file_read` i `file_write` razrešavaju svaku putanju u odnosu na zaseban radni prostor po API ključu na lokaciji `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`. Prolazak kroz putanju (`..`) i zabranjeni segmenti (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) odbacuju se pre bilo kakvog ulazno-izlaznog rada sa diskom.

### Ojačavanje HTTP bezbednosti

`http_request` (`builtins.ts:257`):

- Lista dozvoljenih metoda: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Blokirana izlazna zaglavlja: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Preusmeravanja su onemogućena (`allowRedirect: false`)
- Usmerava se kroz `safeOutboundFetch` sa `guard: "public-only"` (privatni/loopback opsezi su blokirani)
- Odgovor se skraćuje na `SKILLS_MAX_HTTP_RESPONSE_BYTES`; klijent dobija `truncated: true`

---

## Хибридни извршилац (преглед)

`src/lib/skills/hybrid.ts` дефинише `HybridExecutor` који за сваки позив бира између `direct` (унутар процеса) и `sandbox` извршавања, са `autoUpgrade` путањом за поновни покушај у случају прекорачења времена или грешака са меморијом. Уграђене имплементације `directExecutor` / `sandboxRunner` само су привремене замене (`executeDirect`, `executeInSandbox` враћају привремене објекте) — овај модул треба посматрати као уговор који је још у изради. Стварно извршавање и даље се одвија преко `skillExecutor` + `SandboxRunner`.

---

## Складиште

Шема се налази у две миграције:

- `src/lib/db/migrations/016_create_skills.sql` — основне табеле `skills` и `skill_executions`, са индексима над `(api_key_id, name)` и `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — додаје `mode`, `source_provider`, `tags` (JSON), `install_count` у `skills`.

`skill_executions.status` је ограничен на нивоу базе података: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## REST API

Све крајње тачке налазе се у `src/app/api/skills/`. Крајње тачке за управљање (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) захтевају **аутентификацију за управљање** преко `requireManagementAuth()`. Токови за маркетплејс/инсталацију користе једноставнији `isAuthenticated()` (сесија или API кључ).

| Крајња тачка | Метод | Намена |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Приказ регистрованих вештина. Подржава `?q=`, `?mode=on                  | off | auto`, `?source=skillsmp | skillssh | local`, пагинацију |
| `/api/skills/[id]` | PUT | Ажурирање `enabled` или `mode` |
| `/api/skills/[id]` | DELETE | Поништавање регистрације према идентификатору |
| `/api/skills/install` | POST | Инсталирање прилагођене вештине (код обрађивача + шема) |
| `/api/skills/marketplace` | GET | Претрага SkillsMP каталога (враћа популарне подразумеване ставке када је `q` празан) |
| `/api/skills/marketplace/install` | POST | Инсталирање SkillsMP вештине (захтева активног добављача = `skillsmp`) |
| `/api/skills/skillssh` | GET | Претрага skills.sh каталога (`?q=&limit=`, ограничено на 100) |
| `/api/skills/skillssh/install` | POST | Инсталирање skills.sh вештине (захтева активног добављача = `skillssh`) |
| `/api/skills/executions` | GET | Страничена историја извршавања (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Наменско извршавање регистроване вештине |

Крајња тачка `POST /api/skills/executions` враћа HTTP `503` са `{ error: "Skills execution is disabled..." }` када је `settings.skillsEnabled === false` (`executor.ts:42-45`). Оператери могу да промене главни прекидач у одељку **Подешавања → AI**.

### Пример: инсталирање прилагођене вештине

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

Ниска `handlerCode` представља **проналажење имена обрађивача** — није извршни код. Извршилац је мапира преко `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`). Инсталације са маркетплејса чувају SKILL.md текст у овом пољу као документацију и усмеравају извршавање кроз позиве алата које генерише модел. Произвољни изворни код који корисник достави не прослеђује се функцији eval.

---

## MCP алати

Четири MCP алата обухватају површину вештина (`open-sse/mcp-server/tools/skillTools.ts`). Аутоматски се региструју када се MCP сервер покрене.

| Алат                          | Опис                                                              |
| ----------------------------- | ----------------------------------------------------------------- |
| `omniroute_skills_list`       | Приказ вештина, уз опционе филтере: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | Омогућавање/онемогућавање вештине према `skillId`                 |
| `omniroute_skills_execute`    | Извршавање вештине са улазним садржајем                           |
| `omniroute_skills_executions` | Недавна историја извршавања (подразумевано 50, највише 100)       |

Погледајте [MCP-SERVER.md](./MCP-SERVER.md) за подешавање транспорта и доделу опсега.

---

## A2A интеграција

`src/lib/skills/a2a.ts` извози A2A дескриптор вештине `memory_aware_routing` и помоћну функцију `registerA2ASkill(registry)`. Прилагођене A2A вештине налазе се у `src/lib/a2a/skills/` и прослеђују се преко `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`). Погледајте [A2A-SERVER.md](./A2A-SERVER.md) за комплетан животни циклус задатка.

---

## Додавање нове уграђене вештине

1. **Дефинишите обрађивач** у `src/lib/skills/builtins.ts` (или у сродној датотеци унутар `src/lib/skills/builtin/`). Потпис: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Путања кода у изолованом окружењу?** Позовите `sandboxRunner.run(image, command, env, sandboxConfig({...}))`. Користите `normalizeImage()` у односу на листу дозвољених вредности.
3. **Путања система датотека?** Увек је проследите кроз `resolveWorkspacePath(input, context)` пре приступа диску.
4. **Мрежни позив?** Користите `safeOutboundFetch` са `guard: "public-only"`; очистите заглавља помоћу `sanitizeHeaders()`.
5. **Региструјте** додавањем ставке у `builtinSkills` (или позивањем функције налик на `registerBrowserSkill(executor)` при покретању).
6. **Повежите алијасе уграђених алата** (опционо) у `BUILTIN_TOOL_ALIASES` (`interception.ts:23`) ако узводни модел емитује другачији назив.
7. **Тестови** у `src/lib/skills/__tests__/` (Vitest).

---

## Додавање прилагођене (неуграђене) вештине

1. Региструјте обрађивач при покретању процеса:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Додајте вештину путем `POST /api/skills/install` (поље `handlerCode` мора да одговара називу регистрованог обрађивача).
3. Промените `mode` на `on` или `auto` путем `PUT /api/skills/[id]`.

---

## Савети за рад

- **Главни прекидач:** `settings.skillsEnabled = false` блокира сва извршавања и враћа HTTP `503` на `/api/skills/executions`. Регистар наставља да се учитава.
- **Ограничите одлазни саобраћај:** оставите `SKILLS_SANDBOX_NETWORK_ENABLED` неподешеним (подразумевано) за потпуно мрежно изоловано окружење. `networkEnabled: true` по појединачном позиву и даље захтева главно одобрење.
- **Дозволите одређене слике:** подесите `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` да бисте проширили листу дозвољених вредности.
- **Контролишите извршавања:** и `/dashboard/skills/executions` и `omniroute_skills_executions` упитују `skill_executions`. Успешна покретања садрже `durationMs`; неуспешна садрже `errorMessage`.
- **Поништавање кеша:** позовите `skillRegistry.invalidateCache()` након ручних измена базе података; у супротном, сачекајте 60 s.
- **Анонимни радни простор:** када је `apiKeyId` празан, сви позиви се хеширају у исти `"anonymous"` радни простор — кôд који узима у обзир дељење увек треба да проследи прави кључ.

---

## Животни циклус извршавања (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) је **синглтон** који управља сваким позивањем вештине. Разумевање његовог животног циклуса кључно је за отклањање грешака повезаних са истеком времена, поновним покушајима и стањем извршавања.

### Животни циклус у 5 фаза

```
   execute() позван
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← у реду чекања, још није покренуто (ред у бази података је направљен)
  └──────┬──────┘
         │ покретање обрађивача
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← обрађивач позван са временским ограничењем
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (нема друге путање — прекинуо надређени процес)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   Ред у бази података ажуриран статусом, излазом и вредношћу durationMs
```

### Подразумевана конфигурација

| Подешавање   | Подразумевано | Може се конфигурисати помоћу         |
| ------------ | ------------- | ------------------------------------ |
| `timeout`    | `30000` (30s) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`           | `skillExecutor.setMaxRetries(count)` |

> **Важно**: Извршилац је синглтон — позивање `setTimeout()` глобално утиче на сва наредна позивања. Временска ограничења по вештини тренутно нису подржана; ако су вам потребна различита временска ограничења за сваку вештину, покрените засебне процесе или направите форк извршиоца.

### Вредности статуса

Из `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // У реду чекања, још није покренуто
  RUNNING = "running", // Обрађивач је позван
  SUCCESS = "success", // Обрађивач је вратио важећи излаз
  ERROR = "error", // Обрађивач је пријавио изузетак
  TIMEOUT = "timeout", // Прекорачено је временско ограничење извршиоца
}
```

> **Напомена**: Статус `TIMEOUT` је дефинисан у енумерацији, али га тренутна имплементација извршиоца **заправо не уписује у базу података** — истеци времена приказују се као `ERROR` са поруком `"Skill execution timed out"`. Енумерација статуса је резервисана за будућу употребу.

### Преглед извршавања

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Преузимање одређеног извршавања по ID-у
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} за ${exec.durationMs}ms`);
}

// Навођење недавних извршавања за API кључ
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// Бројање укупног броја извршавања
const total = skillExecutor.countExecutions("api-key-id");
```

### Понашање поновних покушаја

Подешавање `maxRetries` се чува, али га метода `execute()` извршиоца **тренутно не користи** — она обавља само један покушај. Вредност `maxRetries` је изложена за будућу имплементацију и за закачке које желе да је прочитају.

За сада се поновни покушаји морају имплементирати унутар самог обрађивача вештине. Уграђене
вештине се региструју у извршиоцу (нпр. `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` у `src/lib/skills/builtin/`); сваки обрађивач
који региструјете може да обухвати сопствену петљу поновних покушаја:

```ts
// унутар обрађивача вештине
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

## Детаљи о SkillMode

Енумерација `SkillMode` (`src/lib/skills/types.ts`) одређује **када и како** се вештине позивају:

```ts
enum SkillMode {
  AUTO = "auto", // LLM одлучује када да позове вештину
  MANUAL = "manual", // Позива се само на изричит захтев корисника
  HYBRID = "hybrid", // AUTO бодовање + ручно заобилажење
}
```

> **Напомена**: База кода дефинише `SkillMode` (AUTO/MANUAL/HYBRID), док поље `Skill.mode` користи другачији облик (`"on" | "off" | "auto"`). Они су повезани, али нису идентични — `SkillMode` служи за политику извршавача, док `Skill.mode` служи за омогућавање појединачне вештине.

### Када користити који режим

| Режим    | Понашање LLM-а                                                                  | Случај употребе                                      |
| -------- | ------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `AUTO`   | LLM може да позове вештину када то сматра неопходним                            | Вештине опште намене (читање датотека, HTTP захтеви) |
| `MANUAL` | LLM не може да позове вештину; покреће је само изричит API позив `executeSkill` | Осетљиве операције (уписи у базу података, плаћања)  |
| `HYBRID` | LLM може да предложи вештину; корисник мора да потврди                          | Вештине које имају споредне ефекте, али нису опасне  |

### AUTO бодовање

Када је режим `AUTO` активан, свака вештина кандидат бодује се у односу на контекст
захтева помоћу функције `scoreAutoSkill()` у `src/lib/skills/injection.ts` — користи се адитивни
систем целобројних поена (подударање назива вештине, преклапање токена назива/ознака/описа,
назнаке разлога у позадини, бонус/пенал за назнаку добављача). Најбољих
`AUTO_MAX_SKILLS = 5` вештина са `score >= AUTO_MIN_SCORE = 3` убацују се као
алати који се могу позивати, при чему се изједначења разрешавају прво према `installCount`, а затим према називу. Погледајте целу табелу поена
у одељку [**Генерисање шеме алата → AUTO бодовање**](#auto-scoring) раније у овом
документу; не постоји праг са децималном вредношћу попут `0.6`, нити бодовање у `registry.ts`.

---

## Каталог уграђених вештина

OmniRoute се испоручује са одабраним скупом уграђених вештина у `src/lib/skills/builtin/`. Најчешће су:

### Вештина аутоматизације прегледача

Вештина прегледача (`src/lib/skills/builtin/browser.ts`) омогућава аутоматизацију прегледача без графичког интерфејса путем Playwright/Puppeteer-а. **Имплементирана је, али није део подразумеваног каталога вештина** — да бисте је користили, засебно инсталирајте додатак проширења прегледача.

```ts
// Омогућите у својој конфигурацији
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Увек захтевај изричито позивање
  allowedSkills: ["browser"],
  timeout: 60000, // 60s за учитавање страница
  maxRetries: 1,
};
```

### Остале уграђене категорије

| Категорија          | Вештине                                                  | Режим  |
| ------------------- | -------------------------------------------------------- | ------ |
| Улаз/излаз датотека | `file_read`, `file_write`                                | AUTO   |
| HTTP                | `http_request`                                           | AUTO   |
| Претрага            | `web_search`                                             | AUTO   |
| Извршавање кода     | `eval_code` (JavaScript/Python у изолованом окружењу)    | HYBRID |
| Систем              | `execute_command` (CLI извршавање у изолованом окружењу) | MANUAL |

### Додавање прилагођене вештине

Погледајте [SDK за додатке и интеграцију вештина](./PLUGIN_SDK.md) да бисте сазнали како да додате прилагођену вештину путем система додатака.

---

## Такође погледајте

- [MCP-SERVER.md](./MCP-SERVER.md) — регистрација MCP алата и транспорти
- [A2A-SERVER.md](./A2A-SERVER.md) — животни циклус A2A задатка и прослеђивање вештина
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — увод намењен корисницима
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — ток обраде захтева и мапа компоненти
- Изворни код: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Тестови: `src/lib/skills/__tests__/integration.test.ts`
