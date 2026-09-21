# Skills Framework (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Bron van waarheid:** `src/lib/skills/` en `src/app/api/skills/`
> **Laatst bijgewerkt:** 2026-06-28 — v3.8.40

OmniRoute biedt een uitbreidbaar Skills-framework waarmee taalmodellen (en operators) herbruikbare mogelijkheden kunnen samenstellen — van het lezen van bestanden en HTTP-verzoeken tot uitvoering van code in een sandbox en zorgvuldig geselecteerde marketplace-skills.

Een skill is een geversioneerde, door een schema gedefinieerde werkeenheid. OmniRoute kan skills als tooldefinities in uitgaande verzoeken injecteren, toolaanroepen onderscheppen die van het model terugkomen, de bijbehorende handler uitvoeren en het resultaat terugsturen naar het model, zodat het gesprek kan worden voortgezet. Het model ziet nooit de implementatie — alleen de toolinterface.

---

## Agent Skills versus Omni Skills

OmniRoute heeft twee verschillende, maar elkaar aanvullende skillsystemen:

| Dimensie          | **Omni Skills** (dit document)                                    | **Agent Skills**                                                                            |
| :---------------- | :---------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| Doel              | Injectie van LLM-tools + uitvoering in een sandbox                | SKILL.md-catalogus die externe agents kunnen ontdekken en gebruiken                         |
| Bron van waarheid | `src/lib/skills/` + marketplace                                   | `src/lib/agentSkills/` + map `skills/`                                                      |
| Runtime-modus     | Geïnjecteerd in uitgaande verzoeken, uitgevoerd bij toolaanroepen | Statische markdown-catalogus + REST/MCP/A2A-discovery-endpoints                             |
| Wie gebruikt het  | OmniRoute zelf (combinatieroutering, inkomende LLM-aanroepen)     | Externe agents, MCP-clients, A2A-orchestrators                                              |
| Aantal            | Variabel (aangestuurd door de marketplace)                        | 45 catalogusvermeldingen (23 API + 21 CLI + 1 configuratie)                                 |
| Indeling          | `SkillDefinition` met toolschema + handler                        | `SKILL.md`-frontmatter + markdown-inhoud                                                    |
| Discovery         | `/api/skills/*` REST + `omniroute_skills_*` MCP-tools             | `/api/agent-skills/*` REST + `omniroute_agent_skills_*` MCP-tools + A2A `list-capabilities` |

**Omni Skills** vormen de uitvoeringsengine — ze definiëren wat OmniRoute _kan doen_ wanneer een LLM een tool aanroept.

**Agent Skills** vormen de documentatiecatalogus — ze leggen aan externe agents uit _hoe ze_ de REST API en CLI van OmniRoute kunnen gebruiken, met gestructureerde SKILL.md-bestanden die rechtstreeks in agent-prompts kunnen worden opgenomen.

Zie [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md) voor de Agent Skills-catalogus, generator, MCP-tools en A2A-skill.

---

## Concepten

### Skillbronnen

Drie bronnen van skills bestaan naast elkaar in hetzelfde register:

1. **Ingebouwde skills** (`src/lib/skills/builtins.ts`) — worden meegeleverd met OmniRoute. Ze dekken de meest voorkomende situaties:
   - `file_read`, `file_write` — sandbox-werkruimte per API-sleutel onder `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — uitgaande HTTP via `safeOutboundFetch` met `guard: "public-only"`
   - `web_search` — configureerbare zoekprovider met caching (`executeWebSearch`)
   - `eval_code` — uitvoering van `node` of `python` in een Docker-sandbox
   - `execute_command` — uitvoering van shell-opdrachten in een Docker-sandbox
   - `browser` — door Playwright ondersteunde basisstructuur, standaard uitgeschakeld (`builtin/browser.ts`)
2. **SkillsMP** (de OmniRoute Marketplace) — opgehaald van `https://skillsmp.com/api/v1/skills/search`. Vereist `skillsmpApiKey` in Instellingen.
3. **SkillsSH** (de communitycatalogus van `skills.sh`) — opgehaald van `https://skills.sh/api/search`. Geen authenticatie vereist; SKILL.md-inhoud wordt opgehaald via GitHub raw.

Eén enkele "actieve provider" bepaalt vanuit welke catalogus het dashboard installeert (`src/lib/skills/providerSettings.ts`). Wijzig deze via **Instellingen → Geheugen en skills**. Standaard: `skillsmp`.

### Skillidentiteit

Skills worden in het in-memory register (`src/lib/skills/registry.ts`) geïdentificeerd aan de hand van `name@version`. De versie moet semver zijn (`^\d+\.\d+\.\d+$`). `resolveVersion()` ondersteunt de beperkingen `^`, `~`, `>`, `>=`, `<`, `<=`, `==` en exacte overeenkomsten.

### Skillmodus

Elke skill heeft een runtime-modus die bepaalt wanneer deze wordt geïnjecteerd:

| Modus  | Gedrag                                                                                                              |
| ------ | ------------------------------------------------------------------------------------------------------------------- |
| `on`   | Altijd geïnjecteerd als tooldefinitie                                                                               |
| `off`  | Nooit geïnjecteerd, nooit uitvoerbaar                                                                               |
| `auto` | Beoordeeld aan de hand van het inkomende verzoek; alleen geïnjecteerd als de score ≥ `AUTO_MIN_SCORE` (standaard 3) |

`auto` is de standaardinstelling voor via de marketplace geïnstalleerde skills. `enabled=true` en `mode="off"` betekenen samen "geregistreerd maar inactief" — het omschakelen van `enabled` via de legacy-kolom werkt ook `mode` bij, zodat oudere codepaden consistent blijven (`src/app/api/skills/[id]/route.ts`).

### Status (uitvoeringen)

Skilluitvoeringen worden bijgehouden in de tabel `skill_executions` met de volgende statussen (`src/lib/skills/types.ts`):

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

`SkillRegistry` is een singleton met een TTL-cache van 60 seconden (`registry.ts:14`). `loadFromDatabase()` is idempotent en dedupliceert gelijktijdige aanroepen via `pendingLoad`. Elke schrijfbewerking (`register`/`unregister`/`unregisterById`) maakt de cache ongeldig. Zoek versies op via `getSkillVersions(name)` en `resolveVersion(name, constraint)`.

### Providerbewuste injectie

`injectSkills()` in `src/lib/skills/injection.ts` is het toegangspunt dat geregistreerde skills omzet in providerspecifieke tooldefinities:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

De toolnaam wordt gecodeerd als `name@version`, zodat de handler de juiste versie kan selecteren wanneer het model deze terugroept.

### AUTO-scoring

Wanneer `mode="auto"` is ingesteld, wordt elke kandidaat-skill beoordeeld op basis van de aanvraagcontext (`scoreAutoSkill()` in `injection.ts`):

| Signaal                                                | Punten       |
| ------------------------------------------------------ | ------------ |
| Skillnaam komt letterlijk voor in de context           | +6           |
| Elke naamtoken komt overeen met een contexttoken       | +2           |
| Elke tag-substring komt overeen met de context         | +3           |
| Elke beschrijvingstoken komt overeen met de context    | +1           |
| Achtergrondreden komt overeen met een naamtoken        | +2 per token |
| Achtergrondreden komt overeen met een tag              | +2 per token |
| Providerhint in tags komt overeen met aanvraagprovider | +2 / −2      |

De beste `AUTO_MAX_SKILLS = 5` skills met `score >= AUTO_MIN_SCORE = 3` worden geïnjecteerd. Bij een gelijke score wordt eerst gesorteerd op `installCount` (aflopend) en daarna op alfabetische naam (`injection.ts:225-235`).

### Onderschepping van toolaanroepen

`handleToolCallExecution()` in `src/lib/skills/interception.ts` wordt door de chathandler aangeroepen nadat de upstream een respons met een toolaanroep retourneert:

1. `extractToolCalls()` leest providerspecifieke structuren (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Aliassen van ingebouwde tools (bijv. `omniroute_web_search` → `web_search`) worden eerst omgezet. Ingebouwde handlers worden inline uitgevoerd.
3. Al het overige wordt gerouteerd via `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`.
4. Resultaten worden terug in de respons ingevoegd — als `tool_results`-, `function_call_output`-items of, waar van toepassing, Anthropic-`tool_result`-blokken.

`customSkillExecutionEnabled` in de uitvoeringscontext kan worden ingesteld op `false` om alleen ingebouwde onderschepping toe te staan (gebruikt door aanvraagpaden die door gebruikers gedefinieerde handlers expliciet uitschakelen).

---

## Docker-sandbox

Niet-ingebouwde codepaden (`eval_code`, `execute_command`) worden uitgevoerd in Docker via `SandboxRunner` (`src/lib/skills/sandbox.ts`). Elke container wordt gestart met:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (wanneer readOnly=true)
```

Standaardwaarden (`SandboxRunner.DEFAULT_CONFIG`):

| Veld             | Standaardwaarde | Opmerkingen                                                            |
| ---------------- | --------------- | ---------------------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU) | Gedeeld door 1000 voordat deze aan `--cpus` wordt doorgegeven          |
| `memoryLimit`    | 256 MB          | Harde limiet                                                           |
| `timeout`        | 30000 ms        | Geleidelijke beëindiging via `SIGTERM` + `docker kill`                 |
| `networkEnabled` | `false`         | Wordt `--network none`                                                 |
| `readOnly`       | `true`          | Rootbestandssysteem is alleen-lezen; `/tmp` en `/workspace` zijn tmpfs |

`SandboxRunner.kill(id)` en `killAll()` zijn beschikbaar voor het afsluiten; actieve containers worden bijgehouden in `runningContainers: Map<string, ChildProcess>`.

### Sandboxomgevingsvariabelen

Geconfigureerd via `process.env` in `src/lib/skills/builtins.ts`:

| Omgevingsvariabele                | Standaardwaarde  | Doel                                                                                               |
| --------------------------------- | ---------------- | -------------------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB) | Limiet voor `file_read` en `file_write`                                                            |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`         | Limiet voor de antwoordbody van `http_request`                                                     |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`         | Limiet voor stdout/stderr die aan de aanroeper wordt geretourneerd                                 |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`          | Standaardtime-out voor opdrachten in de sandbox; begrensd op 60 s                                  |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`          | Hoofdschakelaar voor uitgaand verkeer. Stel in op `1` of `true` om opt-in per aanroep toe te staan |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (zie hieronder)  | Door komma's gescheiden acceptatielijst van Docker-images                                          |

Standaard toegestane images: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. Toevoegingen via `SKILLS_ALLOWED_SANDBOX_IMAGES` worden samengevoegd met de standaardwaarden; onbekende images worden door `normalizeImage()` geweigerd.

> Opmerking: er is geen afzonderlijke omgevingsvariabele `SKILLS_EXECUTION_TIMEOUT_MS`. De time-out van de handler buiten de sandbox is vast ingesteld op 30 s in `SkillExecutor` (`executor.ts:13`), maar kan tijdens runtime worden overschreven via `skillExecutor.setTimeout(ms)`.

### Isolatie van werkruimten

`file_read` en `file_write` herleiden elk pad relatief aan een werkruimte per API-sleutel op `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`. Padtraversal (`..`) en verboden segmenten (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) worden geweigerd voordat schijf-I/O plaatsvindt.

### HTTP-versterking

`http_request` (`builtins.ts:257`):

- Acceptatielijst voor methoden: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Geblokkeerde uitgaande headers: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Omleidingen uitgeschakeld (`allowRedirect: false`)
- Gerouteerd via `safeOutboundFetch` met `guard: "public-only"` (privé-/loopbackbereiken worden geblokkeerd)
- Antwoord wordt afgekapt bij `SKILLS_MAX_HTTP_RESPONSE_BYTES`; de client ziet `truncated: true`

---

## Hybride executor (preview)

`src/lib/skills/hybrid.ts` definieert een `HybridExecutor` die per aanroep kiest tussen `direct`-uitvoering (in het proces) en `sandbox`-uitvoering, met een `autoUpgrade`-pad dat opnieuw probeert bij time-out- of geheugenfouten. De geïntegreerde `directExecutor`- / `sandboxRunner`-implementaties zijn stubs (`executeDirect`, `executeInSandbox` retourneren tijdelijke objecten) — beschouw deze module als een contract waaraan nog wordt gewerkt. De daadwerkelijke uitvoering verloopt nog steeds via `skillExecutor` + `SandboxRunner`.

---

## Opslag

Het schema bevindt zich in twee migraties:

- `src/lib/db/migrations/016_create_skills.sql` — basis-tabellen `skills` en `skill_executions`, met indexen op `(api_key_id, name)` en `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — voegt `mode`, `source_provider`, `tags` (JSON) en `install_count` toe aan `skills`.

`skill_executions.status` wordt op databaseniveau beperkt: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## REST-API

Alle endpoints bevinden zich onder `src/app/api/skills/`. Beheerendpoints (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) vereisen **beheerauthenticatie** via `requireManagementAuth()`. De marketplace-/installatiestromen gebruiken de lichtere `isAuthenticated()` (sessie of API-sleutel).

| Endpoint | Methode | Doel |
| --------------------------------- | ------- | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Geregistreerde skills weergeven. Ondersteunt `?q=`, `?mode=on            | off | auto`, `?source=skillsmp | skillssh | local`, paginering |
| `/api/skills/[id]` | PUT | `enabled` of `mode` bijwerken |
| `/api/skills/[id]` | DELETE | Registratie op basis van id verwijderen |
| `/api/skills/install` | POST | Een aangepaste skill installeren (handlercode + schema) |
| `/api/skills/marketplace` | GET | De SkillsMP-catalogus doorzoeken (retourneert populaire standaardresultaten wanneer `q` leeg is) |
| `/api/skills/marketplace/install` | POST | Een SkillsMP-skill installeren (vereist actieve provider = `skillsmp`) |
| `/api/skills/skillssh` | GET | De skills.sh-catalogus doorzoeken (`?q=&limit=`, gemaximeerd op 100) |
| `/api/skills/skillssh/install` | POST | Een skills.sh-skill installeren (vereist actieve provider = `skillssh`) |
| `/api/skills/executions` | GET | Gepagineerde uitvoeringsgeschiedenis (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Een geregistreerde skill ad hoc uitvoeren |

Het endpoint `POST /api/skills/executions` retourneert HTTP `503` met `{ error: "Skills execution is disabled..." }` wanneer `settings.skillsEnabled === false` (`executor.ts:42-45`). Beheerders kunnen de hoofdschakelaar omzetten via **Instellingen → AI**.

### Voorbeeld: een aangepaste skill installeren

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

De tekenreeks `handlerCode` is een **zoekwaarde voor een handlernaam** — geen uitvoerbare code. De executor wijst deze toe via `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`). Marketplace-installaties slaan de tekst uit SKILL.md in dit veld op als documentatie en leiden de uitvoering via door het model gegenereerde toolaanroepen. Willekeurige, door gebruikers aangeleverde broncode wordt niet met `eval` uitgevoerd.

---

## MCP-tools

Vier MCP-tools omvatten het skills-oppervlak (`open-sse/mcp-server/tools/skillTools.ts`). Ze worden automatisch geregistreerd wanneer de MCP-server opstart.

| Tool                          | Beschrijving                                                           |
| ----------------------------- | ---------------------------------------------------------------------- |
| `omniroute_skills_list`       | Skills weergeven, met optionele filters: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | Een skill in-/uitschakelen via `skillId`                               |
| `omniroute_skills_execute`    | Een skill uitvoeren met een invoerpayload                              |
| `omniroute_skills_executions` | Recente uitvoeringsgeschiedenis (standaard 50, maximaal 100)           |

Zie [MCP-SERVER.md](./MCP-SERVER.md) voor het instellen van het transport en het toewijzen van scopes.

---

## A2A-integratie

`src/lib/skills/a2a.ts` exporteert de A2A-skilldescriptor `memory_aware_routing` en een helper `registerA2ASkill(registry)`. Aangepaste A2A-skills bevinden zich in `src/lib/a2a/skills/` en worden afgehandeld via `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`). Zie [A2A-SERVER.md](./A2A-SERVER.md) voor de volledige taaklevenscyclus.

---

## Een nieuwe ingebouwde skill toevoegen

1. **Definieer de handler** in `src/lib/skills/builtins.ts` (of een bestand in dezelfde directory onder `src/lib/skills/builtin/`). Signatuur: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Codepad in een sandbox?** Roep `sandboxRunner.run(image, command, env, sandboxConfig({...}))` aan. Gebruik `normalizeImage()` voor controle tegen de allowlist.
3. **Bestandssysteempad?** Haal dit altijd door `resolveWorkspacePath(input, context)` voordat de schijf wordt benaderd.
4. **Netwerkaanroep?** Gebruik `safeOutboundFetch` met `guard: "public-only"`; ontsmet headers via `sanitizeHeaders()`.
5. **Registreer** door het item aan `builtinSkills` toe te voegen (of tijdens het opstarten iets als `registerBrowserSkill(executor)` aan te roepen).
6. **Koppel aliassen voor ingebouwde tools** (optioneel) in `BUILTIN_TOOL_ALIASES` (`interception.ts:23`) als het bovenliggende model een andere naam genereert.
7. **Tests** in `src/lib/skills/__tests__/` (Vitest).

---

## Een aangepaste (niet-ingebouwde) skill toevoegen

1. Registreer de handler tijdens het opstarten van het proces:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Voeg de skill toe via `POST /api/skills/install` (het veld `handlerCode` moet overeenkomen met de naam van de geregistreerde handler).
3. Stel `mode` via `PUT /api/skills/[id]` in op `on` of `auto`.

---

## Operationele tips

- **Hoofdschakelaar:** `settings.skillsEnabled = false` blokkeert alle uitvoeringen en retourneert HTTP `503` voor `/api/skills/executions`. Het register wordt nog steeds geladen.
- **Uitgaand verkeer beperken:** laat `SKILLS_SANDBOX_NETWORK_ENABLED` oningesteld (standaard) voor volledig van het netwerk afgeschermde sandboxing. `networkEnabled: true` per aanroep vereist nog steeds dat de hoofdschakelaar is ingeschakeld.
- **Specifieke images toestaan:** stel `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` in om de allowlist uit te breiden.
- **Uitvoeringen controleren:** `/dashboard/skills/executions` en `omniroute_skills_executions` bevragen beide `skill_executions`. Geslaagde uitvoeringen bevatten `durationMs`; mislukte uitvoeringen bevatten `errorMessage`.
- **Cache-invalidatie:** roep `skillRegistry.invalidateCache()` aan na handmatige databasebewerkingen; wacht anders 60 s.
- **Anonieme workspace:** wanneer `apiKeyId` leeg is, worden alle aanroepen naar dezelfde `"anonymous"`-workspace gehasht — code die rekening houdt met gedeeld gebruik moet altijd een echte sleutel doorgeven.

---

## Uitvoeringslevenscyclus (v3.8.16+)

De `SkillExecutor` (`src/lib/skills/executor.ts`) is een **singleton** die elke aanroep van een skill beheert. Inzicht in de levenscyclus ervan is essentieel voor het debuggen van time-outs, nieuwe pogingen en de uitvoeringsstatus.

### De levenscyclus in 5 fasen

```
   execute() aangeroepen
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← in wachtrij, nog niet gestart (DB-rij aangemaakt)
  └──────┬──────┘
         │ handler starten
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← handler aangeroepen met time-out
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (geen ander pad — beëindigd door bovenliggend proces)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   DB-rij bijgewerkt met status, uitvoer, durationMs
```

### Standaardconfiguratie

| Instelling   | Standaard      | Configureerbaar via                  |
| ------------ | -------------- | ------------------------------------ |
| `timeout`    | `30000` (30 s) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`            | `skillExecutor.setMaxRetries(count)` |

> **Belangrijk**: De executor is een singleton — het aanroepen van `setTimeout()` heeft wereldwijd invloed op alle daaropvolgende aanroepen. Time-outs per skill worden momenteel niet ondersteund; als u verschillende time-outs per skill nodig hebt, gebruik dan afzonderlijke processen of maak een fork van de executor.

### Statuswaarden

Uit `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // In wachtrij, nog niet gestart
  RUNNING = "running", // Handler aangeroepen
  SUCCESS = "success", // Handler heeft geldige uitvoer geretourneerd
  ERROR = "error", // Handler heeft een uitzondering gegenereerd
  TIMEOUT = "timeout", // Time-out van de executor overschreden
}
```

> **Opmerking**: De status `TIMEOUT` is gedefinieerd in de enum, maar wordt door de huidige implementatie van de executor **niet daadwerkelijk naar de DB geschreven** — time-outs verschijnen als `ERROR` met het bericht `"Skill execution timed out"`. De status-enum is gereserveerd voor toekomstig gebruik.

### Uitvoeringen inspecteren

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Een specifieke uitvoering ophalen op basis van ID
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// Recente uitvoeringen voor een API-sleutel weergeven
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// Het totale aantal uitvoeringen tellen
const total = skillExecutor.countExecutions("api-key-id");
```

### Gedrag bij nieuwe pogingen

De instelling `maxRetries` wordt opgeslagen, maar wordt **momenteel niet gebruikt** door de methode `execute()` van de executor — deze voert slechts één poging uit. De waarde `maxRetries` wordt beschikbaar gesteld voor toekomstige implementaties en voor hooks die deze waarde willen uitlezen.

Voorlopig moeten nieuwe pogingen binnen de skill-handler zelf worden geïmplementeerd. Ingebouwde
skills worden bij de executor geregistreerd (bijvoorbeeld `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` in `src/lib/skills/builtin/`); elke handler die
u registreert, kan een eigen lus voor nieuwe pogingen bevatten:

```ts
// binnen een skill-handler
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

## SkillMode in detail

De `SkillMode`-enum (`src/lib/skills/types.ts`) bepaalt **wanneer en hoe** skills worden aangeroepen:

```ts
enum SkillMode {
  AUTO = "auto", // LLM bepaalt wanneer de skill wordt aangeroepen
  MANUAL = "manual", // Wordt alleen aangeroepen op expliciet verzoek van de gebruiker
  HYBRID = "hybrid", // AUTO-score + handmatige overschrijving
}
```

> **Opmerking**: De codebase definieert `SkillMode` (AUTO/MANUAL/HYBRID), terwijl het veld `Skill.mode` een andere vorm gebruikt (`"on" | "off" | "auto"`). Ze zijn gerelateerd, maar niet identiek — `SkillMode` is bedoeld voor uitvoeringsbeleid, `Skill.mode` voor het in- en uitschakelen van afzonderlijke skills.

### Wanneer u elke modus gebruikt

| Modus    | Gedrag van de LLM                                                                                   | Gebruikssituatie                                                  |
| -------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `AUTO`   | De LLM kan de skill aanroepen wanneer deze dat nodig acht                                           | Skills voor algemene doeleinden (bestanden lezen, HTTP-verzoeken) |
| `MANUAL` | De LLM kan de skill niet aanroepen; alleen een expliciete `executeSkill`-API-aanroep activeert deze | Gevoelige bewerkingen (databaseschrijfacties, betalingen)         |
| `HYBRID` | De LLM kan de skill voorstellen; de gebruiker moet dit bevestigen                                   | Skills met neveneffecten die niet gevaarlijk zijn                 |

### AUTO-scores

Wanneer de modus `AUTO` actief is, wordt elke kandidaat-skill beoordeeld aan de hand van de aanvraagcontext
door `scoreAutoSkill()` in `src/lib/skills/injection.ts` — een additief
systeem met gehele punten (overeenkomst met skillnaam, tokenoverlap in naam/tag/beschrijving,
aanwijzingen voor achtergrondredenen, bonus/straf voor provideraanwijzingen). De beste
`AUTO_MAX_SKILLS = 5` skills met `score >= AUTO_MIN_SCORE = 3` worden als
aanroepbare tools geïnjecteerd, waarbij gelijke scores worden beslist op basis van `installCount` en vervolgens de naam. Bekijk de volledige puntentabel
eerder in dit document onder [**Genereren van toolschema's → AUTO-scores**](#auto-scoring);
er is geen drempelwaarde met een decimaal getal zoals `0.6` en er vindt geen scoreberekening in `registry.ts` plaats.

---

## Catalogus met ingebouwde skills

OmniRoute wordt geleverd met een zorgvuldig samengestelde set ingebouwde skills in `src/lib/skills/builtin/`. De meestgebruikte zijn:

### Skill voor browserautomatisering

De browserskill (`src/lib/skills/builtin/browser.ts`) biedt headless-browserautomatisering via Playwright/Puppeteer. **Deze is geïmplementeerd, maar maakt geen deel uit van de standaardcatalogus met skills** — installeer de browserextensieplug-in afzonderlijk om deze te gebruiken.

```ts
// Inschakelen in uw configuratie
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Altijd expliciet aanroepen vereisen
  allowedSkills: ["browser"],
  timeout: 60000, // 60s voor het laden van pagina's
  maxRetries: 1,
};
```

### Andere ingebouwde categorieën

| Categorie       | Skills                                            | Modus  |
| --------------- | ------------------------------------------------- | ------ |
| Bestands-I/O    | `file_read`, `file_write`                         | AUTO   |
| HTTP            | `http_request`                                    | AUTO   |
| Zoeken          | `web_search`                                      | AUTO   |
| Code-uitvoering | `eval_code` (JavaScript/Python in een sandbox)    | HYBRID |
| Systeem         | `execute_command` (CLI-uitvoering in een sandbox) | MANUAL |

### Een aangepaste skill toevoegen

Bekijk de [Plugin-SDK en skillsintegratie](./PLUGIN_SDK.md) om te zien hoe u via het plug-insysteem een aangepaste skill toevoegt.

---

## Zie ook

- [MCP-SERVER.md](./MCP-SERVER.md) — registratie en transportmechanismen van MCP-tools
- [A2A-SERVER.md](./A2A-SERVER.md) — levenscyclus van A2A-taken en routering van skills
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — gebruikersgerichte introductie
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — aanvraagpijplijn en componentenoverzicht
- Bron: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Tests: `src/lib/skills/__tests__/integration.test.ts`
