# Skills Framework (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Sandhedskilde:** `src/lib/skills/` og `src/app/api/skills/`
> **Senest opdateret:** 2026-06-28 — v3.8.40

OmniRoute stiller et udvideligt Skills-framework til rådighed, som gør det muligt for sprogmodeller (og operatører) at sammensætte genanvendelige funktioner — fra læsning af filsystemet og HTTP-anmodninger til sandbox-baseret kodekørsel og kuraterede marketplace-skills.

En skill er en versionsstyret, skemadefineret arbejdsenhed. OmniRoute kan indsætte skills som værktøjsdefinitioner i udgående anmodninger, opsnappe værktøjskald, der kommer tilbage fra modellen, køre den matchende handler og sende resultatet tilbage til modellen, så samtalen kan fortsætte. Modellen ser aldrig implementeringen — kun værktøjsgrænsefladen.

---

## Agent Skills kontra Omni Skills

OmniRoute har to separate, men komplementære skill-systemer:

| Dimension       | **Omni Skills** (dette dokument)                           | **Agent Skills**                                                                                |
| :-------------- | :--------------------------------------------------------- | :---------------------------------------------------------------------------------------------- |
| Formål          | Indsættelse af LLM-værktøjer + sandbox-baseret kørsel      | SKILL.md-katalog, som eksterne agenter kan finde og bruge                                       |
| Sandhedskilde   | `src/lib/skills/` + marketplace                            | `src/lib/agentSkills/` + mappen `skills/`                                                       |
| Kørselstilstand | Indsættes i udgående anmodninger og køres ved værktøjskald | Statisk markdown-katalog + REST/MCP/A2A-discovery-endpoints                                     |
| Hvem bruger det | OmniRoute selv (kombinationsrouting, indgående LLM-kald)   | Eksterne agenter, MCP-klienter, A2A-orkestratorer                                               |
| Antal           | Variabelt (marketplace-drevet)                             | 45 katalogposter (23 API + 21 CLI + 1 konfiguration)                                            |
| Format          | `SkillDefinition` med værktøjsskema + handler              | `SKILL.md`-frontmatter + markdown-indhold                                                       |
| Discovery       | `/api/skills/*` REST + `omniroute_skills_*` MCP-værktøjer  | `/api/agent-skills/*` REST + `omniroute_agent_skills_*` MCP-værktøjer + A2A `list-capabilities` |

**Omni Skills** er kørselsmotoren — de definerer, hvad OmniRoute _kan gøre_, når en LLM kalder et værktøj.

**Agent Skills** er dokumentationskataloget — de forklarer eksterne agenter, _hvordan de bruger_ OmniRoutes REST-API og CLI, med strukturerede SKILL.md-filer, der kan indsættes direkte i agentprompter.

Se [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md) for Agent Skills-kataloget, generatoren, MCP-værktøjerne og A2A-skillen.

---

## Begreber

### Skill-kilder

Tre kilder til skills eksisterer side om side i det samme register:

1. **Indbyggede skills** (`src/lib/skills/builtins.ts`) — leveres med OmniRoute. Dækker de mest almindelige anvendelser:
   - `file_read`, `file_write` — sandbox-arbejdsområde pr. API-nøgle under `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — udgående HTTP via `safeOutboundFetch` med `guard: "public-only"`
   - `web_search` — udskiftelig søgeudbyder med caching (`executeWebSearch`)
   - `eval_code` — Docker-sandboxbaseret kørsel af `node` eller `python`
   - `execute_command` — Docker-sandboxbaseret shell-kommando
   - `browser` — Playwright-baseret grundstruktur, deaktiveret som standard (`builtin/browser.ts`)
2. **SkillsMP** (OmniRoute Marketplace) — hentes fra `https://skillsmp.com/api/v1/skills/search`. Kræver `skillsmpApiKey` under Indstillinger.
3. **SkillsSH** (`skills.sh`-fællesskabskataloget) — hentes fra `https://skills.sh/api/search`. Ingen godkendelse kræves; SKILL.md-indhold hentes direkte fra GitHub raw.

En enkelt "aktiv udbyder" styrer, hvilket katalog dashboardet installerer fra (`src/lib/skills/providerSettings.ts`). Skift det under **Indstillinger → Hukommelse og skills**. Standard: `skillsmp`.

### Skill-identitet

Skills identificeres med `name@version` i registret i hukommelsen (`src/lib/skills/registry.ts`). Versionen skal følge semver (`^\d+\.\d+\.\d+$`). `resolveVersion()` forstår begrænsningerne `^`, `~`, `>`, `>=`, `<`, `<=`, `==` og nøjagtige match.

### Skill-tilstand

Hver skill har en kørselstilstand, som styrer, hvornår den indsættes:

| Tilstand | Adfærd                                                                                         |
| -------- | ---------------------------------------------------------------------------------------------- |
| `on`     | Indsættes altid som en værktøjsdefinition                                                      |
| `off`    | Indsættes aldrig og kan aldrig køres                                                           |
| `auto`   | Scores mod den indgående anmodning; indsættes kun, hvis scoren ≥ `AUTO_MIN_SCORE` (standard 3) |

`auto` er standarden for skills, der installeres fra marketplace. `enabled=true` og `mode="off"` betyder tilsammen "registreret, men inaktiv" — når `enabled` ændres via den ældre kolonne, opdateres `mode` også, så ældre kodestier forbliver konsistente (`src/app/api/skills/[id]/route.ts`).

### Status (kørsler)

Skill-kørsler spores i tabellen `skill_executions` med følgende statusser (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Registercache

`SkillRegistry` er en singleton med en TTL-cache på 60 sekunder (`registry.ts:14`). `loadFromDatabase()` er idempotent og deduplikerer samtidige kald via `pendingLoad`. Enhver skrivehandling (`register`/`unregister`/`unregisterById`) invaliderer cachen. Slå versioner op via `getSkillVersions(name)` og `resolveVersion(name, constraint)`.

### Udbyderbevidst indsættelse

`injectSkills()` i `src/lib/skills/injection.ts` er indgangspunktet, der omdanner registrerede skills til udbyderspecifikke værktøjsdefinitioner:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

Værktøjsnavnet kodes som `name@version`, så handleren kan vælge den korrekte version, når modellen kalder værktøjet.

### AUTO-scoring

Når `mode="auto"`, scores hver kandidat-skill i forhold til anmodningskonteksten (`scoreAutoSkill()` i `injection.ts`):

| Signal                                            | Point        |
| ------------------------------------------------- | ------------ |
| Skill-navnet forekommer ordret i konteksten       | +6           |
| Hver navnetoken matcher en konteksttoken          | +2           |
| Hver tag-understreng matcher konteksten           | +3           |
| Hver beskrivelsestoken matcher konteksten         | +1           |
| Baggrundsårsagen matcher en navnetoken            | +2 pr. token |
| Baggrundsårsagen matcher et tag                   | +2 pr. token |
| Provider-hint i tags matcher anmodningsprovideren | +2 / −2      |

De øverste `AUTO_MAX_SKILLS = 5` skills med `score >= AUTO_MIN_SCORE = 3` injiceres. Ved pointlighed sorteres der først efter `installCount` (faldende) og derefter efter alfabetisk navn (`injection.ts:225-235`).

### Opsnapning af værktøjskald

`handleToolCallExecution()` i `src/lib/skills/interception.ts` kaldes af chat-handleren, efter upstream-tjenesten returnerer et svar med et værktøjskald:

1. `extractToolCalls()` læser providerspecifikke strukturer (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Indbyggede værktøjsaliasser (f.eks. `omniroute_web_search` → `web_search`) opløses først. Indbyggede handlers køres inline.
3. Alt andet dirigeres gennem `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`.
4. Resultaterne indsættes igen i svaret — `tool_results`, `function_call_output`-elementer eller Anthropic `tool_result`-blokke, alt efter hvad der er relevant.

`customSkillExecutionEnabled` i eksekveringskonteksten kan sættes til `false` for kun at tillade indbygget opsnapning (bruges af anmodningsstier, der eksplicit deaktiverer brugerdefinerede handlers).

---

## Docker-sandbox

Ikke-indbyggede kodestier (`eval_code`, `execute_command`) kører inde i Docker via `SandboxRunner` (`src/lib/skills/sandbox.ts`). Hver container startes med:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (når readOnly=true)
```

Standardværdier (`SandboxRunner.DEFAULT_CONFIG`):

| Felt             | Standardværdi   | Bemærkninger                                                       |
| ---------------- | --------------- | ------------------------------------------------------------------ |
| `cpuLimit`       | 100 (= 0.1 CPU) | Divideres med 1000, før den sendes til `--cpus`                    |
| `memoryLimit`    | 256 MB          | Hård grænse                                                        |
| `timeout`        | 30000 ms        | Blød afslutning via `SIGTERM` + `docker kill`                      |
| `networkEnabled` | `false`         | Bliver til `--network none`                                        |
| `readOnly`       | `true`          | Rodfilsystemet er skrivebeskyttet; `/tmp` og `/workspace` er tmpfs |

`SandboxRunner.kill(id)` og `killAll()` eksponeres til nedlukning; kørende containere spores i `runningContainers: Map<string, ChildProcess>`.

### Miljøvariabler til sandboxen

Konfigureres via `process.env` i `src/lib/skills/builtins.ts`:

| Miljøvariabel                     | Standardværdi    | Formål                                                                                         |
| --------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB) | Grænse for `file_read` og `file_write`                                                         |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`         | Grænse for svarindholdet fra `http_request`                                                    |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`         | Grænse for stdout/stderr, der returneres til kalderen                                          |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`          | Standardtimeout for kommandoer i sandboxen; begrænset til 60 s                                 |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`          | Overordnet kontrol for udgående trafik. Angiv `1` eller `true` for at tillade tilvalg pr. kald |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (se nedenfor)    | Kommasepareret liste over tilladte Docker-images                                               |

Som standard er følgende images tilladt: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. Eventuelle tilføjelser via `SKILLS_ALLOWED_SANDBOX_IMAGES` flettes sammen med standardværdierne; ukendte images afvises af `normalizeImage()`.

> Bemærk: Der findes ingen separat miljøvariabel med navnet `SKILLS_EXECUTION_TIMEOUT_MS`. Timeouten for handleren uden for sandboxen er hårdkodet til 30 s i `SkillExecutor` (`executor.ts:13`), men kan tilsidesættes under kørsel via `skillExecutor.setTimeout(ms)`.

### Isolering af arbejdsområde

`file_read` og `file_write` fortolker hver sti relativt til et arbejdsområde pr. API-nøgle på `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`. Stigennemgang (`..`) og forbudte segmenter (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) afvises før enhver disk-I/O.

### HTTP-forstærkning

`http_request` (`builtins.ts:257`):

- Liste over tilladte metoder: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Blokerede udgående headere: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Omdirigeringer deaktiveret (`allowRedirect: false`)
- Dirigeres gennem `safeOutboundFetch` med `guard: "public-only"` (private adresser og loopback-områder blokeres)
- Svaret afkortes ved `SKILLS_MAX_HTTP_RESPONSE_BYTES`; klienten ser `truncated: true`

---

## Hybrid Executor (forhåndsvisning)

`src/lib/skills/hybrid.ts` definerer en `HybridExecutor`, der for hvert kald vælger mellem `direct`-udførelse (i processen) og `sandbox`-udførelse med en `autoUpgrade`-sti, som forsøger igen ved timeout-/hukommelsesfejl. De integrerede `directExecutor`- / `sandboxRunner`-implementeringer er stubbe (`executeDirect`, `executeInSandbox` returnerer pladsholderobjekter) — betragt dette modul som en kontrakt under udvikling. Reel udførelse foregår stadig gennem `skillExecutor` + `SandboxRunner`.

---

## Lagring

Skemaet findes i to migreringer:

- `src/lib/db/migrations/016_create_skills.sql` — grundlæggende `skills`- og `skill_executions`-tabeller med indekser på `(api_key_id, name)` og `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — føjer `mode`, `source_provider`, `tags` (JSON) og `install_count` til `skills`.

`skill_executions.status` er begrænset på databaseniveau: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## REST-API

Alle slutpunkter findes under `src/app/api/skills/`. Administrationsslutpunkter (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) kræver **administrationsgodkendelse** via `requireManagementAuth()`. Markedsplads-/installationsforløbene bruger den mere lempelige `isAuthenticated()` (session eller API-nøgle).

| Slutpunkt | Metode | Formål |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Vis registrerede skills. Understøtter `?q=`, `?mode=on                   | off | auto`, `?source=skillsmp | skillssh | local`, sideinddeling |
| `/api/skills/[id]` | PUT | Opdater `enabled` eller `mode` |
| `/api/skills/[id]` | DELETE | Afregistrer efter id |
| `/api/skills/install` | POST | Installer en brugerdefineret skill (handlerkode + skema) |
| `/api/skills/marketplace` | GET | Søg i SkillsMP-kataloget (returnerer populære standardvalg, når `q` er tom) |
| `/api/skills/marketplace/install` | POST | Installer en SkillsMP-skill (kræver aktiv udbyder = `skillsmp`) |
| `/api/skills/skillssh` | GET | Søg i skills.sh-kataloget (`?q=&limit=`, begrænset til 100) |
| `/api/skills/skillssh/install` | POST | Installer en skills.sh-skill (kræver aktiv udbyder = `skillssh`) |
| `/api/skills/executions` | GET | Sideinddelt udførelseshistorik (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Udfør en registreret skill ad hoc |

Slutpunktet `POST /api/skills/executions` returnerer HTTP `503` med `{ error: "Skills execution is disabled..." }`, når `settings.skillsEnabled === false` (`executor.ts:42-45`). Operatører kan slå hovedkontakten til eller fra under **Indstillinger → AI**.

### Eksempel: Installer en brugerdefineret skill

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

Strengen `handlerCode` er et **opslag efter handlernavn** — ikke eksekverbar kode. Eksekveringskomponenten tilknytter den via `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`). Installationer fra markedspladsen gemmer SKILL.md-teksten i dette felt som dokumentation og sender udførelsen gennem modelgenererede værktøjskald. Vilkårlig kildekode leveret af brugeren evalueres ikke.

---

## MCP-værktøjer

Fire MCP-værktøjer omslutter skill-grænsefladen (`open-sse/mcp-server/tools/skillTools.ts`). De registreres automatisk, når MCP-serveren starter.

| Værktøj                       | Beskrivelse                                                |
| ----------------------------- | ---------------------------------------------------------- |
| `omniroute_skills_list`       | Vis skills, valgfrie filtre: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | Aktivér/deaktivér en skill via `skillId`                   |
| `omniroute_skills_execute`    | Kør en skill med et input-payload                          |
| `omniroute_skills_executions` | Seneste eksekveringshistorik (standard 50, maks. 100)      |

Se [MCP-SERVER.md](./MCP-SERVER.md) for opsætning af transport og tildeling af scopes.

---

## A2A-integration

`src/lib/skills/a2a.ts` eksporterer A2A-skill-deskriptoren `memory_aware_routing` og en hjælpefunktion `registerA2ASkill(registry)`. Brugerdefinerede A2A-skills findes i `src/lib/a2a/skills/` og videresendes via `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`). Se [A2A-SERVER.md](./A2A-SERVER.md) for hele opgavens livscyklus.

---

## Tilføjelse af en ny indbygget skill

1. **Definér handleren** i `src/lib/skills/builtins.ts` (eller en sideordnet fil under `src/lib/skills/builtin/`). Signatur: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Sandbox-baseret kodesti?** Kald `sandboxRunner.run(image, command, env, sandboxConfig({...}))`. Brug `normalizeImage()` mod tilladelseslisten.
3. **Filsystemsti?** Før den altid gennem `resolveWorkspacePath(input, context)`, før disken tilgås.
4. **Netværkskald?** Brug `safeOutboundFetch` med `guard: "public-only"`; rens headers via `sanitizeHeaders()`.
5. **Registrér** ved at føje posten til `builtinSkills` (eller ved opstart at kalde noget i stil med `registerBrowserSkill(executor)`).
6. **Forbind indbyggede værktøjsaliasser** (valgfrit) i `BUILTIN_TOOL_ALIASES` (`interception.ts:23`), hvis upstream-modellen udsender et andet navn.
7. **Tests** i `src/lib/skills/__tests__/` (Vitest).

---

## Tilføjelse af en brugerdefineret (ikke-indbygget) skill

1. Registrér handleren ved processtart:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Indsæt skillen via `POST /api/skills/install` (`handlerCode`-feltet skal matche navnet på den registrerede handler).
3. Skift `mode` til `on` eller `auto` via `PUT /api/skills/[id]`.

---

## Driftstips

- **Hovedafbryder:** `settings.skillsEnabled = false` blokerer al eksekvering og returnerer HTTP `503` på `/api/skills/executions`. Registret fortsætter med at blive indlæst.
- **Begræns udgående trafik:** Lad `SKILLS_SANDBOX_NETWORK_ENABLED` være udefineret (standard) for fuldt air-gapped sandboxing. `networkEnabled: true` pr. kald kræver stadig, at hovedadgangen er aktiveret.
- **Tillad specifikke images:** Indstil `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` for at udvide tilladelseslisten.
- **Revidér eksekveringer:** `/dashboard/skills/executions` og `omniroute_skills_executions` forespørger begge `skill_executions`. Vellykkede kørsler inkluderer `durationMs`; fejl inkluderer `errorMessage`.
- **Cacheinvalidering:** Kald `skillRegistry.invalidateCache()` efter manuelle databaseændringer; vent ellers 60 s.
- **Anonymt workspace:** Når `apiKeyId` er tom, hashes alle kald til det samme `"anonymous"`-workspace — kode, der tager højde for deling, bør altid videregive en rigtig nøgle.

---

## Eksekveringslivscyklus (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) er en **singleton**, der håndterer hvert kald af en skill. Det er afgørende at forstå dens livscyklus ved fejlfinding af timeouts, genforsøg og eksekveringstilstand.

### Livscyklussens 5 faser

```
   execute() kaldes
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← sat i kø, endnu ikke startet (DB-række oprettet)
  └──────┬──────┘
         │ start handler
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← handler kaldt med timeout
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (ingen anden sti — afsluttet af overordnet proces)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   DB-række opdateret med status, output, durationMs
```

### Standardkonfiguration

| Indstilling  | Standard       | Kan konfigureres via                 |
| ------------ | -------------- | ------------------------------------ |
| `timeout`    | `30000` (30 s) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`            | `skillExecutor.setMaxRetries(count)` |

> **Vigtigt**: Eksekveringskomponenten er en singleton — et kald til `setTimeout()` påvirker globalt alle efterfølgende kald. Timeouts pr. skill understøttes ikke i øjeblikket. Hvis du har brug for forskellige timeouts for hver skill, skal du starte separate processer eller forgrene eksekveringskomponenten.

### Statusværdier

Fra `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // Sat i kø, endnu ikke startet
  RUNNING = "running", // Handler kaldt
  SUCCESS = "success", // Handler returnerede gyldigt output
  ERROR = "error", // Handler udløste en undtagelse
  TIMEOUT = "timeout", // Overskred eksekveringskomponentens timeout
}
```

> **Bemærk**: Statussen `TIMEOUT` er defineret i enum'en, men **skrives faktisk ikke til DB'en** af den nuværende implementering af eksekveringskomponenten — timeouts vises som `ERROR` med meddelelsen `"Skill execution timed out"`. Status-enum'en er reserveret til fremtidig brug.

### Inspektion af eksekveringer

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Hent en bestemt eksekvering efter ID
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} på ${exec.durationMs}ms`);
}

// Vis de seneste eksekveringer for en API-nøgle
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// Optæl alle eksekveringer
const total = skillExecutor.countExecutions("api-key-id");
```

### Genforsøgsadfærd

Indstillingen `maxRetries` gemmes, men **bruges i øjeblikket ikke** af eksekveringskomponentens `execute()`-metode — den udfører kun ét forsøg. Værdien `maxRetries` er eksponeret med henblik på fremtidig implementering og hooks, der ønsker at aflæse den.

Indtil videre skal genforsøg implementeres i selve skill-handleren. Indbyggede
skills registreres hos eksekveringskomponenten (f.eks. `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` i `src/lib/skills/builtin/`); den handler, du
registrerer, kan ombryde sin egen genforsøgsløkke:

```ts
// inde i en skill-handler
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

## SkillMode i detaljer

Enum'en `SkillMode` (`src/lib/skills/types.ts`) styrer **hvornår og hvordan** skills aktiveres:

```ts
enum SkillMode {
  AUTO = "auto", // LLM'en beslutter, hvornår skillen skal kaldes
  MANUAL = "manual", // Aktiveres kun efter en udtrykkelig brugeranmodning
  HYBRID = "hybrid", // AUTO-scoring + manuel tilsidesættelse
}
```

> **Bemærk**: Kodebasen definerer `SkillMode` (AUTO/MANUAL/HYBRID), mens feltet `Skill.mode` bruger en anden struktur (`"on" | "off" | "auto"`). De er relaterede, men ikke identiske — `SkillMode` bruges til eksekveringspolitikken, mens `Skill.mode` bruges til aktivering af den enkelte skill.

### Hvornår hver tilstand skal bruges

| Tilstand | LLM-adfærd                                                                            | Anvendelsestilfælde                                        |
| -------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `AUTO`   | LLM'en kan kalde skillen, når den vurderer, at det er nødvendigt                      | Skills til generelle formål (fillæsning, HTTP-anmodninger) |
| `MANUAL` | LLM'en kan ikke kalde skillen; kun et eksplicit `executeSkill`-API-kald aktiverer den | Følsomme handlinger (databaseskrivninger, betalinger)      |
| `HYBRID` | LLM'en kan foreslå skillen; brugeren skal bekræfte                                    | Skills, der har bivirkninger, men ikke er farlige          |

### AUTO-scoring

Når tilstanden `AUTO` er aktiv, scores hver potentiel skill i forhold til
anmodningens kontekst af `scoreAutoSkill()` i `src/lib/skills/injection.ts` — et additivt
heltalspointsystem (match på skill-navn, overlap mellem tokens i navn/tags/beskrivelse,
hints om baggrundsårsager, bonus/straf for udbyderhints). De øverste
`AUTO_MAX_SKILLS = 5` skills med `score >= AUTO_MIN_SCORE = 3` injiceres som
værktøjer, der kan kaldes. Ved pointlighed sorteres der efter `installCount` og derefter navn. Se den fulde pointtabel
i [**Generering af værktøjsskema → AUTO-scoring**](#auto-scoring) tidligere i dette
dokument; der findes ingen tærskel med decimaltal som `0.6` og ingen scoring i `registry.ts`.

---

## Katalog over indbyggede skills

OmniRoute leveres med et kurateret sæt indbyggede skills i `src/lib/skills/builtin/`. De mest almindelige er:

### Skill til browserautomatisering

Browserskillen (`src/lib/skills/builtin/browser.ts`) tilbyder automatisering af en headless browser via Playwright/Puppeteer. **Den er implementeret, men findes ikke i standardkataloget over skills** — for at bruge den skal browserudvidelsespluginet installeres separat.

```ts
// Aktivér i din konfiguration
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Kræv altid eksplicit aktivering
  allowedSkills: ["browser"],
  timeout: 60000, // 60 sek. til sideindlæsninger
  maxRetries: 1,
};
```

### Andre indbyggede kategorier

| Kategori   | Skills                                    | Tilstand |
| ---------- | ----------------------------------------- | -------- |
| Fil-I/O    | `file_read`, `file_write`                 | AUTO     |
| HTTP       | `http_request`                            | AUTO     |
| Søgning    | `web_search`                              | AUTO     |
| Kodekørsel | `eval_code` (sandboxet JavaScript/Python) | HYBRID   |
| System     | `execute_command` (sandboxet CLI-kørsel)  | MANUAL   |

### Tilføjelse af en brugerdefineret skill

Se [Plugin-SDK og integration af skills](./PLUGIN_SDK.md) for at få oplysninger om, hvordan du tilføjer en brugerdefineret skill via pluginsystemet.

---

## Se også

- [MCP-SERVER.md](./MCP-SERVER.md) — registrering af MCP-værktøjer og transportmekanismer
- [A2A-SERVER.md](./A2A-SERVER.md) — A2A-opgavers livscyklus og videresendelse til færdigheder
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — brugervendt introduktion
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — anmodningspipeline og komponentoversigt
- Kilde: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Tests: `src/lib/skills/__tests__/integration.test.ts`
