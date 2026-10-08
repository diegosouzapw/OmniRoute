# Skills Framework (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Sannhetskilde:** `src/lib/skills/` og `src/app/api/skills/`
> **Sist oppdatert:** 2026-06-28 — v3.8.40

OmniRoute tilbyr et utvidbart Skills-rammeverk som lar språkmodeller (og operatører) sette sammen gjenbrukbare funksjoner — fra lesing av filsystemet og HTTP-forespørsler til sandkassekjøring av kode og kvalitetssikrede ferdigheter fra markedsplassen.

En ferdighet er en versjonert, skjemadefinert arbeidsenhet. OmniRoute kan injisere ferdigheter som verktøydefinisjoner i utgående forespørsler, fange opp verktøykall som kommer tilbake fra modellen, kjøre den samsvarende behandleren og sende resultatet tilbake til modellen slik at samtalen kan fortsette. Modellen ser aldri implementasjonen — bare verktøygrensesnittet.

---

## Agent Skills kontra Omni Skills

OmniRoute har to separate, men komplementære ferdighetssystemer:

| Dimensjon       | **Omni Skills** (dette dokumentet)                          | **Agent Skills**                                                                              |
| :-------------- | :---------------------------------------------------------- | :-------------------------------------------------------------------------------------------- |
| Formål          | Injisering av LLM-verktøy + kjøring i sandkasse             | SKILL.md-katalog som eksterne agenter kan oppdage og bruke                                    |
| Sannhetskilde   | `src/lib/skills/` + markedsplass                            | `src/lib/agentSkills/` + `skills/`-katalog                                                    |
| Kjøremodus      | Injiseres i utgående forespørsler og kjøres ved verktøykall | Statisk Markdown-katalog + REST/MCP/A2A-endepunkter for oppdagelse                            |
| Hvem bruker det | OmniRoute selv (kombinasjonsruting, innkommende LLM-kall)   | Eksterne agenter, MCP-klienter, A2A-orkestratorer                                             |
| Antall          | Variabelt (markedsplassdrevet)                              | 45 katalogoppføringer (23 API + 21 CLI + 1 konfigurasjon)                                     |
| Format          | `SkillDefinition` med verktøyskjema + behandler             | `SKILL.md`-frontmatter + Markdown-innhold                                                     |
| Oppdagelse      | `/api/skills/*` REST + `omniroute_skills_*` MCP-verktøy     | `/api/agent-skills/*` REST + `omniroute_agent_skills_*` MCP-verktøy + A2A `list-capabilities` |

**Omni Skills** er kjøringsmotoren — de definerer hva OmniRoute _kan gjøre_ når en LLM kaller et verktøy.

**Agent Skills** er dokumentasjonskatalogen — de forklarer eksterne agenter _hvordan de bruker_ OmniRoutes REST-API og CLI, med strukturerte SKILL.md-filer som kan mates direkte inn i agentmeldinger.

For Agent Skills-katalogen, generatoren, MCP-verktøyene og A2A-ferdigheten, se [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## Konsepter

### Ferdighetskilder

Tre ferdighetskilder eksisterer side om side i det samme registeret:

1. **Innebygde ferdigheter** (`src/lib/skills/builtins.ts`) — leveres med OmniRoute. Dekker de vanligste tilfellene:
   - `file_read`, `file_write` — sandkassearbeidsområde per API-nøkkel under `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — utgående HTTP via `safeOutboundFetch` med `guard: "public-only"`
   - `web_search` — utskiftbar søkeleverandør med hurtigbufring (`executeWebSearch`)
   - `eval_code` — kjøring av `node` eller `python` i Docker-sandkasse
   - `execute_command` — kjøring av skallkommandoer i Docker-sandkasse
   - `browser` — Playwright-basert grunnstruktur, deaktivert som standard (`builtin/browser.ts`)
2. **SkillsMP** (OmniRoute-markedsplassen) — hentes fra `https://skillsmp.com/api/v1/skills/search`. Krever `skillsmpApiKey` i Innstillinger.
3. **SkillsSH** (`skills.sh`-fellesskapskatalogen) — hentes fra `https://skills.sh/api/search`. Ingen autentisering er nødvendig; SKILL.md-innhold hentes fra GitHub raw.

Én «aktiv leverandør» styrer hvilken katalog kontrollpanelet installerer fra (`src/lib/skills/providerSettings.ts`). Bytt den under **Innstillinger → Minne og ferdigheter**. Standard: `skillsmp`.

### Ferdighetsidentitet

Ferdigheter identifiseres med `name@version` i minne-registeret (`src/lib/skills/registry.ts`). Versjonen må følge semver (`^\d+\.\d+\.\d+$`). `resolveVersion()` forstår begrensningene `^`, `~`, `>`, `>=`, `<`, `<=`, `==` og eksakt samsvar.

### Ferdighetsmodus

Hver ferdighet har en kjøremodus som styrer når den injiseres:

| Modus  | Atferd                                                                                                             |
| ------ | ------------------------------------------------------------------------------------------------------------------ |
| `on`   | Injiseres alltid som en verktøydefinisjon                                                                          |
| `off`  | Injiseres aldri og kan aldri kjøres                                                                                |
| `auto` | Vurderes opp mot den innkommende forespørselen; injiseres bare hvis poengsummen er ≥ `AUTO_MIN_SCORE` (standard 3) |

`auto` er standarden for ferdigheter som installeres fra markedsplassen. `enabled=true` og `mode="off"` betyr sammen «registrert, men inaktiv» — når `enabled` endres via den eldre kolonnen, oppdateres også `mode`, slik at eldre kodebaner forblir konsistente (`src/app/api/skills/[id]/route.ts`).

### Status (kjøringer)

Ferdighetskjøringer spores i tabellen `skill_executions` med følgende statuser (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Registerhurtigbuffer

`SkillRegistry` er en singleton med en TTL-hurtigbuffer på 60 sekunder (`registry.ts:14`). `loadFromDatabase()` er idempotent og dedupliserer samtidige kall via `pendingLoad`. Alle skriveoperasjoner (`register`/`unregister`/`unregisterById`) ugyldiggjør hurtigbufferen. Slå opp versjoner via `getSkillVersions(name)` og `resolveVersion(name, constraint)`.

### Leverandørtilpasset injisering

`injectSkills()` i `src/lib/skills/injection.ts` er inngangspunktet som gjør registrerte ferdigheter om til leverandørspesifikke verktøydefinisjoner:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

Verktøynavnet kodes som `name@version`, slik at behandleren kan velge riktig versjon når modellen kaller det tilbake.

### AUTO-poengberegning

Når `mode="auto"`, vurderes hver kandidatferdighet opp mot forespørselskonteksten (`scoreAutoSkill()` i `injection.ts`):

| Signal                                                          | Poeng          |
| --------------------------------------------------------------- | -------------- |
| Ferdighetsnavnet forekommer ordrett i konteksten                | +6             |
| Hvert navneelement samsvarer med et kontekstelement             | +2             |
| Hver delstreng i en tagg samsvarer med konteksten               | +3             |
| Hvert beskrivelseselement samsvarer med konteksten              | +1             |
| Bakgrunnsårsaken samsvarer med et navneelement                  | +2 per element |
| Bakgrunnsårsaken samsvarer med en tagg                          | +2 per element |
| Leverandørhint i tagger samsvarer med forespørselens leverandør | +2 / −2        |

De øverste `AUTO_MAX_SKILLS = 5` ferdighetene med `score >= AUTO_MIN_SCORE = 3` injiseres. Ved lik poengsum avgjøres rekkefølgen først av `installCount` (synkende), deretter av navnet i alfabetisk rekkefølge (`injection.ts:225-235`).

### Oppfanging av verktøykall

`handleToolCallExecution()` i `src/lib/skills/interception.ts` kalles av chatbehandleren etter at oppstrømstjenesten returnerer et svar med verktøykall:

1. `extractToolCalls()` leser leverandørspesifikke strukturer (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Innebygde verktøyaliaser (f.eks. `omniroute_web_search` → `web_search`) løses først. Innebygde behandlere kjøres direkte.
3. Alt annet rutes gjennom `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`.
4. Resultatene flettes tilbake inn i svaret — som `tool_results`-, `function_call_output`-elementer eller Anthropic-`tool_result`-blokker, avhengig av hva som passer.

`customSkillExecutionEnabled` i kjøringskonteksten kan settes til `false` for kun å tillate innebygd oppfanging (brukes av forespørselsbaner som eksplisitt deaktiverer brukerdefinerte behandlere).

---

## Docker-sandkasse

Ikke-innebygde kodebaner (`eval_code`, `execute_command`) kjører i Docker via `SandboxRunner` (`src/lib/skills/sandbox.ts`). Hver container startes med:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (når readOnly=true)
```

Standardverdier (`SandboxRunner.DEFAULT_CONFIG`):

| Felt             | Standardverdi   | Merknader                                                          |
| ---------------- | --------------- | ------------------------------------------------------------------ |
| `cpuLimit`       | 100 (= 0,1 CPU) | Divideres med 1000 før den sendes til `--cpus`                     |
| `memoryLimit`    | 256 MB          | Absolutt grense                                                    |
| `timeout`        | 30000 ms        | Myk avslutning via `SIGTERM` + `docker kill`                       |
| `networkEnabled` | `false`         | Blir til `--network none`                                          |
| `readOnly`       | `true`          | Rotfilsystemet er skrivebeskyttet; `/tmp` og `/workspace` er tmpfs |

`SandboxRunner.kill(id)` og `killAll()` er eksponert for avslutning; kjørende containere spores i `runningContainers: Map<string, ChildProcess>`.

### Miljøvariabler for sandkassen

Konfigureres via `process.env` i `src/lib/skills/builtins.ts`:

| Miljøvariabel                     | Standardverdi    | Formål                                                                                        |
| --------------------------------- | ---------------- | --------------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB) | Grense for `file_read` og `file_write`                                                        |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`         | Grense for responsinnholdet fra `http_request`                                                |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`         | Grense for stdout/stderr som returneres til kalleren                                          |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`          | Standard tidsavbrudd for kommandoer i sandkassen; begrenset til 60 s                          |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`          | Hovedbryter for utgående trafikk. Sett til `1` eller `true` for å tillate aktivering per kall |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (se nedenfor)    | Kommaseparert tillatelsesliste over Docker-avbildninger                                       |

Standard tillatte avbildninger: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. Eventuelle tillegg via `SKILLS_ALLOWED_SANDBOX_IMAGES` slås sammen med standardverdiene; ukjente avbildninger avvises av `normalizeImage()`.

> Merk: Det finnes ingen separat miljøvariabel kalt `SKILLS_EXECUTION_TIMEOUT_MS`. Tidsavbruddet for behandleren utenfor sandkassen er hardkodet til 30 s i `SkillExecutor` (`executor.ts:13`), men kan overstyres under kjøring via `skillExecutor.setTimeout(ms)`.

### Isolering av arbeidsområde

`file_read` og `file_write` løser hver bane relativt til et arbeidsområde per API-nøkkel på `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`. Banegjennomgang (`..`) og forbudte segmenter (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) avvises før disk-I/O utføres.

### HTTP-herding

`http_request` (`builtins.ts:257`):

- Tillatelsesliste for metoder: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Blokkerte utgående headere: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Omdirigeringer er deaktivert (`allowRedirect: false`)
- Rutes gjennom `safeOutboundFetch` med `guard: "public-only"` (private adresser og loopback-områder blokkeres)
- Responsen avkortes ved `SKILLS_MAX_HTTP_RESPONSE_BYTES`; klienten ser `truncated: true`

---

## Hybridkjører (forhåndsvisning)

`src/lib/skills/hybrid.ts` definerer en `HybridExecutor` som velger mellom `direct`-kjøring (i prosessen) og `sandbox`-kjøring for hvert kall, med en `autoUpgrade`-bane som prøver på nytt ved tidsavbrudd/minnefeil. De integrerte implementasjonene `directExecutor` / `sandboxRunner` er stubber (`executeDirect`, `executeInSandbox` returnerer plassholderobjekter) — behandle denne modulen som en kontrakt under utvikling. Reell kjøring skjer fortsatt gjennom `skillExecutor` + `SandboxRunner`.

---

## Lagring

Skjemaet finnes i to migreringer:

- `src/lib/db/migrations/016_create_skills.sql` — grunnleggende `skills`- og `skill_executions`-tabeller, med indekser på `(api_key_id, name)` og `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — legger til `mode`, `source_provider`, `tags` (JSON), `install_count` i `skills`.

`skill_executions.status` er begrenset på databasenivå: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## REST-API

Alle endepunkter finnes under `src/app/api/skills/`. Administrasjonsendepunkter (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) krever **administrasjonsautentisering** via `requireManagementAuth()`. Markedsplass-/installasjonsflytene bruker den enklere `isAuthenticated()` (økt eller API-nøkkel).

| Endepunkt | Metode | Formål |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Vis registrerte ferdigheter. Støtter `?q=`, `?mode=on                    | off | auto`, `?source=skillsmp | skillssh | local`, paginering |
| `/api/skills/[id]` | PUT | Oppdater `enabled` eller `mode` |
| `/api/skills/[id]` | DELETE | Avregistrer etter ID |
| `/api/skills/install` | POST | Installer en egendefinert ferdighet (behandlerkode + skjema) |
| `/api/skills/marketplace` | GET | Søk i SkillsMP-katalogen (returnerer populære standardvalg når `q` er tom) |
| `/api/skills/marketplace/install` | POST | Installer en SkillsMP-ferdighet (krever aktiv leverandør = `skillsmp`) |
| `/api/skills/skillssh` | GET | Søk i skills.sh-katalogen (`?q=&limit=`, begrenset til 100) |
| `/api/skills/skillssh/install` | POST | Installer en skills.sh-ferdighet (krever aktiv leverandør = `skillssh`) |
| `/api/skills/executions` | GET | Paginert kjøringshistorikk (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Kjør en registrert ferdighet ad hoc |

Endepunktet `POST /api/skills/executions` returnerer HTTP `503` med `{ error: "Ferdighetskjøring er deaktivert..." }` når `settings.skillsEnabled === false` (`executor.ts:42-45`). Operatører kan slå hovedbryteren av eller på fra **Innstillinger → KI**.

### Eksempel: installer en egendefinert ferdighet

```bash
curl -X POST http://localhost:20128/api/skills/install \
  -H "Authorization: Bearer $OMNIROUTE_MGMT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "reverse-text",
    "version": "1.0.0",
    "description": "Reverserer en streng",
    "schema": {
      "input":  { "type": "object", "properties": { "text": { "type": "string" } }, "required": ["text"] },
      "output": { "type": "object", "properties": { "reversed": { "type": "string" } } }
    },
    "handlerCode": "echo-handler",
    "apiKeyId": "your-api-key-id"
  }'
```

Strengen `handlerCode` er et **oppslag etter behand并lernavn** — ikke kjørbar kode. Kjøreren tilordner den via `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`). Installasjoner fra markedsplassen lagrer SKILL.md-teksten i dette feltet som dokumentasjon og ruter kjøringen gjennom modellgenererte verktøykall. Vilkårlig kildekode levert av brukeren evalueres ikke.

---

## MCP-verktøy

Fire MCP-verktøy omslutter ferdighetsgrensesnittet (`open-sse/mcp-server/tools/skillTools.ts`). De registreres automatisk når MCP-serveren starter.

| Verktøy                       | Beskrivelse                                                     |
| ----------------------------- | --------------------------------------------------------------- |
| `omniroute_skills_list`       | Vis ferdigheter, valgfrie filtre: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | Aktiver/deaktiver en ferdighet etter `skillId`                  |
| `omniroute_skills_execute`    | Kjør en ferdighet med en inndatapayload                         |
| `omniroute_skills_executions` | Nylig kjøringshistorikk (standard 50, maksimalt 100)            |

Se [MCP-SERVER.md](./MCP-SERVER.md) for transportoppsett og omfangstildelinger.

---

## A2A-integrasjon

`src/lib/skills/a2a.ts` eksporterer A2A-ferdighetsbeskrivelsen `memory_aware_routing` og en `registerA2ASkill(registry)`-hjelper. Egendefinerte A2A-ferdigheter ligger i `src/lib/a2a/skills/` og distribueres via `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`). Se [A2A-SERVER.md](./A2A-SERVER.md) for hele oppgavens livssyklus.

---

## Legge til en ny innebygd ferdighet

1. **Definer håndtereren** i `src/lib/skills/builtins.ts` (eller en sideordnet fil under `src/lib/skills/builtin/`). Signatur: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Sandkassebasert kodebane?** Kall `sandboxRunner.run(image, command, env, sandboxConfig({...}))`. Bruk `normalizeImage()` mot tillatelseslisten.
3. **Filsystembane?** Send alltid gjennom `resolveWorkspacePath(input, context)` før disken berøres.
4. **Nettverkskall?** Bruk `safeOutboundFetch` med `guard: "public-only"`; rens headere via `sanitizeHeaders()`.
5. **Registrer** ved å legge til oppføringen i `builtinSkills` (eller ved å kalle en `registerBrowserSkill(executor)`-lignende funksjon ved oppstart).
6. **Koble til innebygde verktøyaliaser** (valgfritt) i `BUILTIN_TOOL_ALIASES` (`interception.ts:23`) hvis oppstrømsmodellen sender ut et annet navn.
7. **Tester** i `src/lib/skills/__tests__/` (Vitest).

---

## Legge til en egendefinert (ikke-innebygd) ferdighet

1. Registrer håndtereren ved prosessoppstart:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Sett inn ferdigheten via `POST /api/skills/install` (`handlerCode`-feltet må samsvare med navnet på den registrerte håndtereren).
3. Sett `mode` til `on` eller `auto` via `PUT /api/skills/[id]`.

---

## Driftstips

- **Hovedbryter:** `settings.skillsEnabled = false` blokkerer all kjøring og returnerer HTTP `503` på `/api/skills/executions`. Registeret fortsetter å lastes inn.
- **Lås utgående trafikk:** la `SKILLS_SANDBOX_NETWORK_ENABLED` være usatt (standard) for fullstendig isolert sandkassekjøring. `networkEnabled: true` per kall krever fortsatt hovedporten.
- **Tillat bestemte images:** angi `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` for å utvide tillatelseslisten.
- **Revider kjøringer:** `/dashboard/skills/executions` og `omniroute_skills_executions` spør begge mot `skill_executions`. Vellykkede kjøringer inkluderer `durationMs`; feil inkluderer `errorMessage`.
- **Cache-invalidering:** kall `skillRegistry.invalidateCache()` etter manuelle databaseendringer; ellers må du vente i 60 s.
- **Anonymt arbeidsområde:** når `apiKeyId` er tom, hashes alle kall til det samme `"anonymous"`-arbeidsområdet — kode som tar hensyn til deling, bør alltid sende en reell nøkkel.

---

## Kjøringslivssyklus (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) er en **singleton** som håndterer alle kall til ferdigheter. Det er avgjørende å forstå livssyklusen for å feilsøke tidsavbrudd, nye forsøk og kjøringstilstand.

### Livssyklusens 5 stadier

```
   execute() kalt
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← satt i kø, ennå ikke startet (DB-rad opprettet)
  └──────┬──────┘
         │ start handler
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← handler kalt med tidsavbrudd
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (ingen annen vei — avsluttet av overordnet prosess)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   DB-rad oppdatert med status, utdata, durationMs
```

### Standardkonfigurasjon

| Innstilling  | Standard      | Kan konfigureres via                 |
| ------------ | ------------- | ------------------------------------ |
| `timeout`    | `30000` (30s) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`           | `skillExecutor.setMaxRetries(count)` |

> **Viktig**: Kjøreren er en singleton — kall til `setTimeout()` påvirker alle etterfølgende kall globalt. Tidsavbrudd per ferdighet støttes ikke for øyeblikket. Hvis du trenger ulike tidsavbrudd for hver ferdighet, må du starte separate prosesser eller forke kjøreren.

### Statusverdier

Fra `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // Satt i kø, ennå ikke startet
  RUNNING = "running", // Handler kalt
  SUCCESS = "success", // Handler returnerte gyldige utdata
  ERROR = "error", // Handler utløste et unntak
  TIMEOUT = "timeout", // Overskred kjørerens tidsavbrudd
}
```

> **Merk**: Statusen `TIMEOUT` er definert i enum-en, men skrives **faktisk ikke til DB-en** av den nåværende implementasjonen av kjøreren — tidsavbrudd vises som `ERROR` med meldingen `"Skill execution timed out"`. Status-enum-en er reservert for fremtidig bruk.

### Inspisere kjøringer

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Hent en bestemt kjøring etter ID
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} på ${exec.durationMs}ms`);
}

// Vis nylige kjøringer for en API-nøkkel
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// Tell totalt antall kjøringer
const total = skillExecutor.countExecutions("api-key-id");
```

### Atferd ved nye forsøk

Innstillingen `maxRetries` lagres, men **brukes for øyeblikket ikke** av kjørerens `execute()`-metode — den utfører bare ett enkelt forsøk. Verdien `maxRetries` er tilgjengelig for fremtidig implementering og for hooks som ønsker å lese den.

Foreløpig må nye forsøk implementeres i selve ferdighetshandleren. Innebygde
ferdigheter registreres hos kjøreren (f.eks. `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` i `src/lib/skills/builtin/`); handleren du
registrerer, kan omslutte sin egen løkke for nye forsøk:

```ts
// inne i en ferdighetshandler
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

## SkillMode i detalj

Enumen `SkillMode` (`src/lib/skills/types.ts`) styrer **når og hvordan** ferdigheter aktiveres:

```ts
enum SkillMode {
  AUTO = "auto", // LLM-en avgjør når ferdigheten skal kalles
  MANUAL = "manual", // Aktiveres bare ved en uttrykkelig brukerforespørsel
  HYBRID = "hybrid", // AUTO-poengberegning + manuell overstyring
}
```

> **Merk**: Kodebasen definerer `SkillMode` (AUTO/MANUAL/HYBRID), mens feltet `Skill.mode` bruker en annen form (`"on" | "off" | "auto"`). De er beslektede, men ikke identiske — `SkillMode` gjelder kjøringspolicyen, mens `Skill.mode` gjelder aktivering av den enkelte ferdigheten.

### Når hver modus bør brukes

| Modus    | LLM-atferd                                                                                   | Bruksområde                                               |
| -------- | -------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `AUTO`   | LLM-en kan kalle ferdigheten når den anser det som nødvendig                                 | Generelle ferdigheter (fillesing, HTTP-forespørsler)      |
| `MANUAL` | LLM-en kan ikke kalle ferdigheten; bare et uttrykkelig `executeSkill`-API-kall aktiverer den | Sensitive operasjoner (databaseskriving, betalinger)      |
| `HYBRID` | LLM-en kan foreslå ferdigheten; brukeren må bekrefte                                         | Ferdigheter som har bivirkninger, men som ikke er farlige |

### AUTO-poengberegning

Når `AUTO`-modus er aktiv, gis hver kandidatferdighet en poengsum opp mot forespørselskonteksten
av `scoreAutoSkill()` i `src/lib/skills/injection.ts` — et additivt
heltallsbasert poengsystem (samsvar med ferdighetsnavn, tokenoverlapp i navn/etikett/beskrivelse,
bakgrunnsbegrunnelser og bonus/trekk for leverandørhint). De
`AUTO_MAX_SKILLS = 5` beste ferdighetene med `score >= AUTO_MIN_SCORE = 3` injiseres som
kallbare verktøy, og ved poenglikhet avgjøres rekkefølgen først av `installCount` og deretter av navn. Se hele poengtabellen
i [**Generering av verktøyskjema → AUTO-poengberegning**](#auto-scoring) tidligere i dette
dokumentet. Det finnes ingen flyttallsterskel av typen `0.6` og ingen poengberegning i `registry.ts`.

---

## Katalog over innebygde ferdigheter

OmniRoute leveres med et kuratert sett med innebygde ferdigheter i `src/lib/skills/builtin/`. De vanligste er:

### Ferdighet for nettleserautomatisering

Nettleserferdigheten (`src/lib/skills/builtin/browser.ts`) gir hodeløs nettleserautomatisering via Playwright/Puppeteer. **Den er implementert, men er ikke med i standardkatalogen over ferdigheter** — installer utvidelsesprogramtillegget for nettleseren separat for å bruke den.

```ts
// Aktiver i konfigurasjonen
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Krev alltid uttrykkelig aktivering
  allowedSkills: ["browser"],
  timeout: 60000, // 60 sekunder for sidelasting
  maxRetries: 1,
};
```

### Andre innebygde kategorier

| Kategori    | Ferdigheter                                      | Modus  |
| ----------- | ------------------------------------------------ | ------ |
| Fil-I/O     | `file_read`, `file_write`                        | AUTO   |
| HTTP        | `http_request`                                   | AUTO   |
| Søk         | `web_search`                                     | AUTO   |
| Kodekjøring | `eval_code` (sandkasseisolert JavaScript/Python) | HYBRID |
| System      | `execute_command` (sandkasseisolert CLI-kjøring) | MANUAL |

### Legge til en egendefinert ferdighet

Se [SDK for programtillegg og ferdighetsintegrasjon](./PLUGIN_SDK.md) for informasjon om hvordan du legger til en egendefinert ferdighet via systemet for programtillegg.

---

## Se også

- [MCP-SERVER.md](./MCP-SERVER.md) — registrering av MCP-verktøy og transporter
- [A2A-SERVER.md](./A2A-SERVER.md) — livssyklus for A2A-oppgaver og videresending til ferdigheter
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — brukervendt introduksjon
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — forespørselsflyt og komponentkart
- Kilde: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Tester: `src/lib/skills/__tests__/integration.test.ts`
