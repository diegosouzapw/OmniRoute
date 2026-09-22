# Skills Framework (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Sursa de referință:** `src/lib/skills/` și `src/app/api/skills/`
> **Ultima actualizare:** 2026-06-28 — v3.8.40

OmniRoute oferă un cadru extensibil pentru Skills, care permite modelelor lingvistice (și operatorilor) să compună capabilități reutilizabile — de la citirea sistemului de fișiere și solicitări HTTP până la executarea codului într-un mediu izolat și utilizarea skill-urilor atent selecționate din marketplace.

Un skill este o unitate de lucru versionată, definită printr-o schemă. OmniRoute poate injecta skill-uri sub formă de definiții de instrumente în solicitările trimise, poate intercepta apelurile instrumentelor returnate de model, poate executa handler-ul corespunzător și poate transmite rezultatul înapoi modelului, astfel încât conversația să poată continua. Modelul nu vede niciodată implementarea — doar interfața instrumentului.

---

## Agent Skills vs Omni Skills

OmniRoute are două sisteme de skill-uri distincte, dar complementare:

| Dimensiune         | **Omni Skills** (acest document)                                                         | **Agent Skills**                                                                                    |
| :----------------- | :--------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------- |
| Scop               | Injectarea instrumentelor LLM + execuție în mediu izolat                                 | Catalog SKILL.md pentru descoperire și utilizare de către agenți externi                            |
| Sursa de referință | `src/lib/skills/` + marketplace                                                          | `src/lib/agentSkills/` + directorul `skills/`                                                       |
| Mod de rulare      | Injectate în solicitările trimise, executate la evenimentele de apelare a instrumentelor | Catalog Markdown static + endpoint-uri REST/MCP/A2A pentru descoperire                              |
| Cine le utilizează | OmniRoute însuși (rutare combo, apeluri LLM de intrare)                                  | Agenți externi, clienți MCP, orchestratoare A2A                                                     |
| Număr              | Variabil (determinat de marketplace)                                                     | 45 de intrări în catalog (23 API + 21 CLI + 1 config)                                               |
| Format             | `SkillDefinition` cu schema instrumentului + handler                                     | Frontmatter `SKILL.md` + corp Markdown                                                              |
| Descoperire        | REST `/api/skills/*` + instrumentele MCP `omniroute_skills_*`                            | REST `/api/agent-skills/*` + instrumentele MCP `omniroute_agent_skills_*` + `list-capabilities` A2A |

**Omni Skills** reprezintă motorul de execuție — acestea definesc ce _poate face_ OmniRoute atunci când un LLM invocă un instrument.

**Agent Skills** reprezintă catalogul de documentație — acestea explică agenților externi _cum să utilizeze_ API-ul REST și CLI-ul OmniRoute, prin fișiere SKILL.md structurate care pot fi introduse direct în prompturile agenților.

Pentru catalogul Agent Skills, generator, instrumentele MCP și skill-ul A2A, consultați [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## Concepte

### Sursele skill-urilor

Trei surse de skill-uri coexistă în același registru:

1. **Skill-uri integrate** (`src/lib/skills/builtins.ts`) — livrate împreună cu OmniRoute. Acoperă cazurile uzuale:
   - `file_read`, `file_write` — spațiu de lucru izolat per cheie API în `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — solicitări HTTP de ieșire prin `safeOutboundFetch` cu `guard: "public-only"`
   - `web_search` — furnizor de căutare interschimbabil, cu stocare în cache (`executeWebSearch`)
   - `eval_code` — execuție `node` sau `python` izolată prin Docker
   - `execute_command` — comandă shell executată într-un mediu izolat prin Docker
   - `browser` — structură de bază susținută de Playwright, dezactivată implicit (`builtin/browser.ts`)
2. **SkillsMP** (marketplace-ul OmniRoute) — preluate de la `https://skillsmp.com/api/v1/skills/search`. Necesită `skillsmpApiKey` în Settings.
3. **SkillsSH** (catalogul comunității `skills.sh`) — preluate de la `https://skills.sh/api/search`. Nu necesită autentificare; conținutul SKILL.md este preluat direct din GitHub raw.

Un singur „furnizor activ” controlează catalogul din care dashboard-ul efectuează instalările (`src/lib/skills/providerSettings.ts`). Îl puteți schimba din **Settings → Memory & Skills**. Valoare implicită: `skillsmp`.

### Identitatea skill-urilor

Skill-urile sunt indexate după `name@version` în registrul din memorie (`src/lib/skills/registry.ts`). Versiunea trebuie să respecte semver (`^\d+\.\d+\.\d+$`). `resolveVersion()` înțelege constrângerile `^`, `~`, `>`, `>=`, `<`, `<=`, `==` și cele de corespondență exactă.

### Modul skill-urilor

Fiecare skill are un mod de rulare care controlează momentul în care este injectat:

| Mod    | Comportament                                                                                                   |
| ------ | -------------------------------------------------------------------------------------------------------------- |
| `on`   | Este injectat întotdeauna ca definiție de instrument                                                           |
| `off`  | Nu este injectat niciodată și nu poate fi executat                                                             |
| `auto` | Este evaluat în raport cu solicitarea primită; este injectat numai dacă scorul ≥ `AUTO_MIN_SCORE` (implicit 3) |

`auto` este valoarea implicită pentru skill-urile instalate din marketplace. `enabled=true` și `mode="off"` împreună înseamnă „înregistrat, dar inactiv” — comutarea valorii `enabled` prin coloana moștenită actualizează și `mode`, astfel încât fluxurile de cod mai vechi să rămână consecvente (`src/app/api/skills/[id]/route.ts`).

### Stare (execuții)

Execuțiile skill-urilor sunt urmărite în tabelul `skill_executions` folosind următoarele stări (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Cache-ul registrului

`SkillRegistry` este un singleton cu un cache TTL de 60 de secunde (`registry.ts:14`). `loadFromDatabase()` este idempotent și deduplică apelurile concurente prin `pendingLoad`. Orice operație de scriere (`register`/`unregister`/`unregisterById`) invalidează cache-ul. Căutați versiunile prin `getSkillVersions(name)` și `resolveVersion(name, constraint)`.

### Injectare adaptată furnizorului

`injectSkills()` din `src/lib/skills/injection.ts` este punctul de intrare care transformă skill-urile înregistrate în definiții de instrumente specifice furnizorului:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

Numele instrumentului este codificat ca `name@version`, astfel încât handlerul să poată selecta versiunea corectă atunci când modelul îl apelează.

### Punctajul AUTO

Când `mode="auto"`, fiecare abilitate candidată primește un punctaj în raport cu contextul solicitării (`scoreAutoSkill()` din `injection.ts`):

| Semnal                                                                    | Puncte       |
| ------------------------------------------------------------------------- | ------------ |
| Numele abilității apare textual în context                                | +6           |
| Fiecare token din nume corespunde unui token din context                  | +2           |
| Fiecare subșir din etichete corespunde contextului                        | +3           |
| Fiecare token din descriere corespunde contextului                        | +1           |
| Motivul de fundal corespunde unui token din nume                          | +2 per token |
| Motivul de fundal corespunde unei etichete                                | +2 per token |
| Indiciul despre furnizor din etichete corespunde furnizorului solicitării | +2 / −2      |

Primele `AUTO_MAX_SKILLS = 5` abilități cu `score >= AUTO_MIN_SCORE = 3` sunt injectate. Egalitățile sunt departajate după `installCount` (descrescător), apoi după numele în ordine alfabetică (`injection.ts:225-235`).

### Interceptarea apelurilor de instrumente

`handleToolCallExecution()` din `src/lib/skills/interception.ts` este invocată de handlerul de chat după ce serviciul din amonte returnează un răspuns care apelează instrumente:

1. `extractToolCalls()` citește formatele specifice furnizorilor (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Aliasurile instrumentelor încorporate (de exemplu, `omniroute_web_search` → `web_search`) sunt rezolvate mai întâi. Handlerele încorporate rulează inline.
3. Orice altceva este direcționat prin `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`.
4. Rezultatele sunt inserate înapoi în răspuns — elemente `tool_results`, `function_call_output` sau blocuri Anthropic `tool_result`, după caz.

`customSkillExecutionEnabled` din contextul de execuție poate fi setat la `false` pentru a permite doar interceptarea încorporată (utilizată de căile de solicitare care dezactivează explicit handlerele definite de utilizator).

---

## Sandbox Docker

Căile de cod neîncorporate (`eval_code`, `execute_command`) rulează în Docker prin `SandboxRunner` (`src/lib/skills/sandbox.ts`). Fiecare container este lansat cu:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (când readOnly=true)
```

Valori implicite (`SandboxRunner.DEFAULT_CONFIG`):

| Câmp             | Valoare implicită | Observații                                                    |
| ---------------- | ----------------- | ------------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU)   | Împărțit la 1000 înainte de a fi transmis către `--cpus`      |
| `memoryLimit`    | 256 MB            | Limită strictă                                                |
| `timeout`        | 30000 ms          | Oprire controlată prin `SIGTERM` + `docker kill`              |
| `networkEnabled` | `false`           | Devine `--network none`                                       |
| `readOnly`       | `true`            | FS rădăcină doar în citire; `/tmp` și `/workspace` sunt tmpfs |

`SandboxRunner.kill(id)` și `killAll()` sunt expuse pentru oprire; containerele care rulează sunt urmărite în `runningContainers: Map<string, ChildProcess>`.

### Variabile de mediu pentru sandbox

Configurate prin `process.env` în `src/lib/skills/builtins.ts`:

| Variabilă de mediu                | Valoare implicită | Scop                                                                                                               |
| --------------------------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB)  | Limită pentru `file_read` și `file_write`                                                                          |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`          | Limită pentru corpul răspunsului `http_request`                                                                    |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`          | Limită pentru stdout/stderr returnate apelantului                                                                  |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`           | Timp de expirare implicit pentru comenzile din sandbox; limitat la 60 s                                            |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`           | Comutator principal pentru traficul de ieșire. Setați la `1` sau `true` pentru a permite activarea la fiecare apel |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (vedeți mai jos)  | Listă de imagini Docker permise, separate prin virgulă                                                             |

Imaginile permise în mod implicit: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. Orice adăugări prin `SKILLS_ALLOWED_SANDBOX_IMAGES` sunt îmbinate cu valorile implicite; imaginile necunoscute sunt respinse de `normalizeImage()`.

> Notă: nu există o variabilă de mediu separată `SKILLS_EXECUTION_TIMEOUT_MS`. Timpul de expirare al handlerului din afara sandboxului este codificat fix la 30 s în `SkillExecutor` (`executor.ts:13`), dar poate fi suprascris în timpul rulării prin `skillExecutor.setTimeout(ms)`.

### Izolarea spațiului de lucru

`file_read` și `file_write` rezolvă fiecare cale relativ la un spațiu de lucru per cheie API la `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`. Traversarea căilor (`..`) și segmentele interzise (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) sunt respinse înaintea oricărei operațiuni I/O pe disc.

### Consolidarea securității HTTP

`http_request` (`builtins.ts:257`):

- Lista metodelor permise: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Anteturi de ieșire blocate: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Redirecționări dezactivate (`allowRedirect: false`)
- Rutare prin `safeOutboundFetch` cu `guard: "public-only"` (intervalele private/loopback sunt blocate)
- Răspuns trunchiat la `SKILLS_MAX_HTTP_RESPONSE_BYTES`; clientul primește `truncated: true`

---

## Executor hibrid (previzualizare)

`src/lib/skills/hybrid.ts` definește un `HybridExecutor` care alege pentru fiecare apel între execuția `direct` (în cadrul procesului) și `sandbox`, cu o cale de reîncercare `autoUpgrade` în cazul erorilor de expirare a timpului sau de memorie. Implementările integrate `directExecutor` / `sandboxRunner` sunt provizorii (`executeDirect`, `executeInSandbox` returnează obiecte substitutive) — considerați acest modul drept un contract în curs de dezvoltare. Execuția reală se realizează în continuare prin `skillExecutor` + `SandboxRunner`.

---

## Stocare

Schema se află în două migrări:

- `src/lib/db/migrations/016_create_skills.sql` — tabelele de bază `skills` și `skill_executions`, cu indecși pe `(api_key_id, name)` și `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — adaugă `mode`, `source_provider`, `tags` (JSON), `install_count` în `skills`.

Valoarea `skill_executions.status` este restricționată la nivelul bazei de date: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## API REST

Toate endpointurile se află în `src/app/api/skills/`. Endpointurile de administrare (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) necesită **autentificare de administrare** prin `requireManagementAuth()`. Fluxurile pentru marketplace/instalare utilizează varianta mai permisivă `isAuthenticated()` (sesiune sau cheie API).

| Endpoint | Metodă | Scop |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Listează skill-urile înregistrate. Acceptă `?q=`, `?mode=on              | off | auto`, `?source=skillsmp | skillssh | local`, paginare |
| `/api/skills/[id]` | PUT | Actualizează `enabled` sau `mode` |
| `/api/skills/[id]` | DELETE | Anulează înregistrarea după ID |
| `/api/skills/install` | POST | Instalează un skill personalizat (codul handlerului + schema) |
| `/api/skills/marketplace` | GET | Caută în catalogul SkillsMP (returnează opțiunile populare implicite când `q` este gol) |
| `/api/skills/marketplace/install` | POST | Instalează un skill SkillsMP (necesită furnizorul activ = `skillsmp`) |
| `/api/skills/skillssh` | GET | Caută în catalogul skills.sh (`?q=&limit=`, limitat la 100) |
| `/api/skills/skillssh/install` | POST | Instalează un skill skills.sh (necesită furnizorul activ = `skillssh`) |
| `/api/skills/executions` | GET | Istoric paginat al execuțiilor (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Execută ad-hoc un skill înregistrat |

Endpointul `POST /api/skills/executions` returnează HTTP `503` cu `{ error: "Skills execution is disabled..." }` când `settings.skillsEnabled === false` (`executor.ts:42-45`). Operatorii pot comuta întrerupătorul principal din **Setări → AI**.

### Exemplu: instalarea unui skill personalizat

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

Șirul `handlerCode` reprezintă o **căutare după numele handlerului** — nu cod executabil. Executorul îl mapează prin `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`). Instalările din marketplace stochează textul SKILL.md în acest câmp drept documentație și direcționează execuția prin apeluri de instrumente generate de model. Codul sursă arbitrar furnizat de utilizator nu este evaluat prin `eval`.

---

## Instrumente MCP

Patru instrumente MCP încadrează suprafața de skill-uri (`open-sse/mcp-server/tools/skillTools.ts`). Acestea sunt înregistrate automat când pornește serverul MCP.

| Instrument                    | Descriere                                                             |
| ----------------------------- | --------------------------------------------------------------------- |
| `omniroute_skills_list`       | Listează skill-urile; filtre opționale: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | Activează/dezactivează un skill prin `skillId`                        |
| `omniroute_skills_execute`    | Execută un skill cu un payload de intrare                             |
| `omniroute_skills_executions` | Istoricul execuțiilor recente (implicit 50, maximum 100)              |

Consultați [MCP-SERVER.md](./MCP-SERVER.md) pentru configurarea transportului și atribuirea domeniilor de acces.

---

## Integrarea A2A

`src/lib/skills/a2a.ts` exportă descriptorul skill-ului A2A `memory_aware_routing` și un helper `registerA2ASkill(registry)`. Skill-urile A2A personalizate se află în `src/lib/a2a/skills/` și sunt distribuite prin `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`). Consultați [A2A-SERVER.md](./A2A-SERVER.md) pentru ciclul de viață complet al sarcinii.

---

## Adăugarea unui skill integrat nou

1. **Definiți handlerul** în `src/lib/skills/builtins.ts` (sau într-un fișier alăturat din `src/lib/skills/builtin/`). Semnătură: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Cale de cod izolată?** Apelați `sandboxRunner.run(image, command, env, sandboxConfig({...}))`. Utilizați `normalizeImage()` în raport cu lista de permisiuni.
3. **Cale din sistemul de fișiere?** Treceți-o întotdeauna prin `resolveWorkspacePath(input, context)` înainte de a accesa discul.
4. **Apel de rețea?** Utilizați `safeOutboundFetch` cu `guard: "public-only"`; igienizați anteturile prin `sanitizeHeaders()`.
5. **Înregistrați** prin adăugarea intrării în `builtinSkills` (sau prin apelarea unei funcții de tipul `registerBrowserSkill(executor)` la pornire).
6. **Conectați aliasurile instrumentelor integrate** (opțional) în `BUILTIN_TOOL_ALIASES` (`interception.ts:23`) dacă modelul din amonte emite un nume diferit.
7. **Teste** în `src/lib/skills/__tests__/` (Vitest).

---

## Adăugarea unui skill personalizat (neintegrat)

1. Înregistrați handlerul la pornirea procesului:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Inserați skill-ul prin `POST /api/skills/install` (câmpul `handlerCode` trebuie să corespundă numelui handlerului înregistrat).
3. Comutați `mode` la `on` sau `auto` prin `PUT /api/skills/[id]`.

---

## Sfaturi operaționale

- **Comutator principal:** `settings.skillsEnabled = false` blochează toate execuțiile și returnează HTTP `503` pentru `/api/skills/executions`. Registrul continuă să se încarce.
- **Restricționați traficul de ieșire:** păstrați `SKILLS_SANDBOX_NETWORK_ENABLED` nesetat (valoarea implicită) pentru o izolare completă a sandboxului față de rețea. Setarea `networkEnabled: true` pentru fiecare apel necesită în continuare activarea comutatorului principal.
- **Permiteți anumite imagini:** setați `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` pentru a extinde lista de permisiuni.
- **Auditați execuțiile:** atât `/dashboard/skills/executions`, cât și `omniroute_skills_executions` interoghează `skill_executions`. Rulările reușite includ `durationMs`; eșecurile includ `errorMessage`.
- **Invalidarea memoriei cache:** apelați `skillRegistry.invalidateCache()` după modificări manuale în baza de date; în caz contrar, așteptați 60 s.
- **Spațiu de lucru anonim:** când `apiKeyId` este gol, toate apelurile sunt asociate prin hash aceluiași spațiu de lucru `"anonymous"` — codul care ține cont de partajare trebuie să transmită întotdeauna o cheie reală.

---

## Ciclul de viață al execuției (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) este un **singleton** care gestionează fiecare invocare a unei abilități. Înțelegerea ciclului său de viață este esențială pentru depanarea expirărilor, reîncercărilor și stării execuției.

### Ciclul de viață în 5 etape

```
   execute() apelată
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← în coadă, neîncepută încă (rând creat în BD)
  └──────┬──────┘
         │ pornirea gestionarului
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← gestionar invocat cu un timp-limită
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (nicio altă cale — oprită de procesul părinte)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   Rândul din BD este actualizat cu starea, rezultatul, durationMs
```

### Configurația implicită

| Setare       | Valoare implicită | Configurabilă prin                   |
| ------------ | ----------------- | ------------------------------------ |
| `timeout`    | `30000` (30s)     | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`               | `skillExecutor.setMaxRetries(count)` |

> **Important**: Executorul este un singleton — apelarea `setTimeout()` afectează la nivel global toate invocările ulterioare. Timpii-limită individuali pentru fiecare abilitate nu sunt acceptați momentan; dacă aveți nevoie de timpi-limită diferiți pentru fiecare abilitate, trimiteți procese separate sau creați un fork al executorului.

### Valorile stării

Din `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // În coadă, neîncepută încă
  RUNNING = "running", // Gestionar invocat
  SUCCESS = "success", // Gestionarul a returnat un rezultat valid
  ERROR = "error", // Gestionarul a generat o excepție
  TIMEOUT = "timeout", // A depășit timpul-limită al executorului
}
```

> **Notă**: Starea `TIMEOUT` este definită în enumerare, dar **nu este scrisă efectiv în BD** de implementarea actuală a executorului — expirările sunt raportate ca `ERROR`, cu mesajul `"Skill execution timed out"`. Enumerarea stărilor este rezervată pentru utilizare viitoare.

### Inspectarea execuțiilor

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Obține o anumită execuție după ID
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// Listează execuțiile recente pentru o cheie API
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// Numără toate execuțiile
const total = skillExecutor.countExecutions("api-key-id");
```

### Comportamentul reîncercărilor

Setarea `maxRetries` este stocată, dar **nu este utilizată momentan** de metoda `execute()` a executorului — aceasta efectuează o singură încercare. Valoarea `maxRetries` este expusă pentru implementări viitoare și pentru hook-urile care trebuie să o citească.

Deocamdată, reîncercările trebuie implementate în interiorul gestionarului abilității. Abilitățile
încorporate sunt înregistrate în executor (de exemplu, `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` în `src/lib/skills/builtin/`); orice gestionar
înregistrați poate include propria buclă de reîncercare:

```ts
// în interiorul unui gestionar de abilitate
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

## SkillMode în detaliu

Enumerarea `SkillMode` (`src/lib/skills/types.ts`) controlează **când și cum** sunt invocate skill-urile:

```ts
enum SkillMode {
  AUTO = "auto", // LLM-ul decide când să apeleze skill-ul
  MANUAL = "manual", // Invocat doar la cererea explicită a utilizatorului
  HYBRID = "hybrid", // Scor AUTO + suprascriere manuală
}
```

> **Notă**: Baza de cod definește `SkillMode` (AUTO/MANUAL/HYBRID), în timp ce câmpul `Skill.mode` utilizează o structură diferită (`"on" | "off" | "auto"`). Acestea sunt asociate, dar nu identice — `SkillMode` este destinat politicii executorului, iar `Skill.mode` este destinat activării individuale a fiecărui skill.

### Când să utilizați fiecare mod

| Mod      | Comportamentul LLM-ului                                                            | Caz de utilizare                                            |
| -------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `AUTO`   | LLM-ul poate apela skill-ul atunci când consideră că este necesar                  | Skill-uri de uz general (citirea fișierelor, cereri HTTP)   |
| `MANUAL` | LLM-ul nu poate apela skill-ul; doar un apel API explicit `executeSkill` îl invocă | Operațiuni sensibile (scrieri în baza de date, plăți)       |
| `HYBRID` | LLM-ul poate sugera skill-ul; utilizatorul trebuie să confirme                     | Skill-uri care au efecte secundare, dar nu sunt periculoase |

### Calcularea scorului AUTO

Când modul `AUTO` este activ, fiecare skill candidat primește un scor în raport cu contextul
cererii prin `scoreAutoSkill()` din `src/lib/skills/injection.ts` — un sistem aditiv
de puncte întregi (potrivirea numelui skill-ului, suprapunerea tokenurilor din nume/etichete/descriere,
indicii privind motivele de fundal, bonus/penalizare pentru indiciul furnizorului). Primele
`AUTO_MAX_SKILLS = 5` skill-uri cu `score >= AUTO_MIN_SCORE = 3` sunt injectate drept
instrumente apelabile, egalitățile fiind departajate după `installCount`, apoi după nume. Consultați tabelul complet de punctaje
din [**Generarea schemei instrumentelor → Calcularea scorului AUTO**](#auto-scoring), prezentat anterior în acest
document; nu există niciun prag în virgulă mobilă de tip `0.6` și niciun calcul al scorului în `registry.ts`.

---

## Catalogul skill-urilor încorporate

OmniRoute este livrat cu un set atent selecționat de skill-uri încorporate în `src/lib/skills/builtin/`. Cele mai comune sunt:

### Skill pentru automatizarea browserului

Skill-ul pentru browser (`src/lib/skills/builtin/browser.ts`) oferă automatizarea unui browser fără interfață grafică prin Playwright/Puppeteer. **Este implementat, dar nu este inclus în catalogul implicit de skill-uri** — pentru a-l utiliza, instalați separat pluginul extensiei pentru browser.

```ts
// Activați în configurație
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Necesită întotdeauna invocare explicită
  allowedSkills: ["browser"],
  timeout: 60000, // 60 s pentru încărcarea paginilor
  maxRetries: 1,
};
```

### Alte categorii încorporate

| Categorie    | Skill-uri                                   | Mod    |
| ------------ | ------------------------------------------- | ------ |
| I/O fișiere  | `file_read`, `file_write`                   | AUTO   |
| HTTP         | `http_request`                              | AUTO   |
| Căutare      | `web_search`                                | AUTO   |
| Execuție cod | `eval_code` (JavaScript/Python în sandbox)  | HYBRID |
| Sistem       | `execute_command` (execuție CLI în sandbox) | MANUAL |

### Adăugarea unui skill personalizat

Consultați [SDK-ul pentru pluginuri și integrarea skill-urilor](./PLUGIN_SDK.md) pentru a afla cum să adăugați un skill personalizat prin sistemul de pluginuri.

---

## Vezi și

- [MCP-SERVER.md](./MCP-SERVER.md) — înregistrarea instrumentelor MCP și transporturile
- [A2A-SERVER.md](./A2A-SERVER.md) — ciclul de viață al sarcinilor A2A și distribuirea abilităților
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — introducere pentru utilizatori
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — fluxul de procesare a cererilor și harta componentelor
- Sursă: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Teste: `src/lib/skills/__tests__/integration.test.ts`
