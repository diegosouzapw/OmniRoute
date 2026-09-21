# Skills Framework (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Sanningskälla:** `src/lib/skills/` och `src/app/api/skills/`
> **Senast uppdaterad:** 2026-06-28 — v3.8.40

OmniRoute tillhandahåller ett utbyggbart ramverk för färdigheter som låter språkmodeller (och operatörer) kombinera återanvändbara funktioner — från filsystemsläsning och HTTP-förfrågningar till sandlådeskyddad kodkörning och kurerade färdigheter från marknadsplatsen.

En färdighet är en versionshanterad, schemadefinierad arbetsenhet. OmniRoute kan injicera färdigheter som verktygsdefinitioner i utgående förfrågningar, fånga upp verktygsanrop som kommer tillbaka från modellen, köra den matchande hanteraren och skicka resultatet tillbaka till modellen så att konversationen kan fortsätta. Modellen ser aldrig implementationen — endast verktygsgränssnittet.

---

## Agentfärdigheter kontra Omni-färdigheter

OmniRoute har två separata men kompletterande färdighetssystem:

| Dimension        | **Omni-färdigheter** (detta dokument)                         | **Agentfärdigheter**                                                                          |
| :--------------- | :------------------------------------------------------------ | :-------------------------------------------------------------------------------------------- |
| Syfte            | Injektion av LLM-verktyg + sandlådeskyddad körning            | SKILL.md-katalog som externa agenter kan upptäcka och använda                                 |
| Sanningskälla    | `src/lib/skills/` + marknadsplats                             | `src/lib/agentSkills/` + katalogen `skills/`                                                  |
| Körningsläge     | Injiceras i utgående förfrågningar och körs vid verktygsanrop | Statisk markdown-katalog + REST/MCP/A2A-slutpunkter för identifiering                         |
| Vem använder det | OmniRoute självt (kombinationsroutning, inkommande LLM-anrop) | Externa agenter, MCP-klienter, A2A-orkestrerare                                               |
| Antal            | Variabelt (marknadsplatsstyrt)                                | 45 katalogposter (23 API + 21 CLI + 1 konfiguration)                                          |
| Format           | `SkillDefinition` med verktygsschema + hanterare              | `SKILL.md`-frontmatter + markdown-brödtext                                                    |
| Identifiering    | `/api/skills/*` REST + `omniroute_skills_*` MCP-verktyg       | `/api/agent-skills/*` REST + `omniroute_agent_skills_*` MCP-verktyg + A2A `list-capabilities` |

**Omni-färdigheter** är körningsmotorn — de definierar vad OmniRoute _kan göra_ när en LLM anropar ett verktyg.

**Agentfärdigheter** är dokumentationskatalogen — de förklarar för externa agenter _hur de använder_ OmniRoutes REST-API och CLI, med strukturerade SKILL.md-filer som kan matas direkt in i agentprompter.

För katalogen över agentfärdigheter, generatorn, MCP-verktygen och A2A-färdigheten, se [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## Begrepp

### Färdighetskällor

Tre källor till färdigheter samexisterar i samma register:

1. **Inbyggda färdigheter** (`src/lib/skills/builtins.ts`) — levereras med OmniRoute. Täcker de vanligaste fallen:
   - `file_read`, `file_write` — sandlådearbetsyta per API-nyckel under `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — utgående HTTP via `safeOutboundFetch` med `guard: "public-only"`
   - `web_search` — utbytbar sökleverantör med cachning (`executeWebSearch`)
   - `eval_code` — Docker-sandlådeskyddad körning av `node` eller `python`
   - `execute_command` — Docker-sandlådeskyddat skalkommando
   - `browser` — Playwright-baserad grundstruktur, inaktiverad som standard (`builtin/browser.ts`)
2. **SkillsMP** (OmniRoutes marknadsplats) — hämtas från `https://skillsmp.com/api/v1/skills/search`. Kräver `skillsmpApiKey` i Inställningar.
3. **SkillsSH** (`skills.sh`-communitykatalogen) — hämtas från `https://skills.sh/api/search`. Ingen autentisering krävs; SKILL.md-innehåll hämtas från GitHub raw.

En enda ”aktiv leverantör” styr vilken katalog som instrumentpanelen installerar från (`src/lib/skills/providerSettings.ts`). Byt den under **Inställningar → Minne och färdigheter**. Standard: `skillsmp`.

### Färdighetsidentitet

Färdigheter indexeras med `name@version` i minnesregistret (`src/lib/skills/registry.ts`). Versionen måste följa semver (`^\d+\.\d+\.\d+$`). `resolveVersion()` förstår begränsningarna `^`, `~`, `>`, `>=`, `<`, `<=`, `==` och exakt matchning.

### Färdighetsläge

Varje färdighet har ett körningsläge som styr när den injiceras:

| Läge   | Beteende                                                                                             |
| ------ | ---------------------------------------------------------------------------------------------------- |
| `on`   | Injiceras alltid som en verktygsdefinition                                                           |
| `off`  | Injiceras aldrig och kan aldrig köras                                                                |
| `auto` | Poängsätts mot den inkommande förfrågan; injiceras endast om poängen ≥ `AUTO_MIN_SCORE` (standard 3) |

`auto` är standardvärdet för färdigheter som installerats från marknadsplatsen. `enabled=true` och `mode="off"` tillsammans betyder ”registrerad men inaktiv” — om `enabled` växlas via den äldre kolumnen uppdateras även `mode` så att äldre kodvägar förblir konsekventa (`src/app/api/skills/[id]/route.ts`).

### Status (körningar)

Färdighetskörningar spåras i tabellen `skill_executions` med följande statusvärden (`src/lib/skills/types.ts`):

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

`SkillRegistry` är en singleton med en TTL-cache på 60 sekunder (`registry.ts:14`). `loadFromDatabase()` är idempotent och deduplicerar samtidiga anrop via `pendingLoad`. Varje skrivning (`register`/`unregister`/`unregisterById`) ogiltigförklarar cachen. Slå upp versioner via `getSkillVersions(name)` och `resolveVersion(name, constraint)`.

### Leverantörsmedveten injektion

`injectSkills()` i `src/lib/skills/injection.ts` är startpunkten som omvandlar registrerade färdigheter till leverantörsspecifika verktygsdefinitioner:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

Verktygsnamnet kodas som `name@version` så att hanteraren kan välja rätt version när modellen anropar det igen.

### AUTO-poängsättning

När `mode="auto"` poängsätts varje kandidatfärdighet mot kontexten för begäran (`scoreAutoSkill()` i `injection.ts`):

| Signal                                               | Poäng        |
| ---------------------------------------------------- | ------------ |
| Färdighetens namn förekommer ordagrant i kontexten   | +6           |
| Varje namntoken matchar en kontexttoken              | +2           |
| Varje taggdelsträng matchar kontexten                | +3           |
| Varje beskrivningstoken matchar kontexten            | +1           |
| Bakgrundsorsaken matchar en namntoken                | +2 per token |
| Bakgrundsorsaken matchar en tagg                     | +2 per token |
| Leverantörstips i taggar matchar begärans leverantör | +2 / −2      |

De högst rankade `AUTO_MAX_SKILLS = 5` färdigheterna med `score >= AUTO_MIN_SCORE = 3` injiceras. Lika poäng avgörs av `installCount` (fallande), därefter alfabetiskt namn (`injection.ts:225-235`).

### Interception av verktygsanrop

`handleToolCallExecution()` i `src/lib/skills/interception.ts` anropas av chatthanteraren efter att uppströmsleverantören returnerar ett svar med ett verktygsanrop:

1. `extractToolCalls()` läser leverantörsspecifika format (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Alias för inbyggda verktyg (t.ex. `omniroute_web_search` → `web_search`) löses först. Inbyggda hanterare körs direkt.
3. Allt annat dirigeras genom `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`.
4. Resultaten infogas tillbaka i svaret — `tool_results`, `function_call_output`-objekt eller Anthropic-`tool_result`-block beroende på vad som är lämpligt.

`customSkillExecutionEnabled` i exekveringskontexten kan sättas till `false` för att endast tillåta inbyggd interception (används av sökvägar för begäranden som uttryckligen inaktiverar användardefinierade hanterare).

---

## Docker-sandbox

Icke-inbyggda kodsökvägar (`eval_code`, `execute_command`) körs i Docker via `SandboxRunner` (`src/lib/skills/sandbox.ts`). Varje container startas med:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (när readOnly=true)
```

Standardvärden (`SandboxRunner.DEFAULT_CONFIG`):

| Fält             | Standardvärde   | Anmärkningar                                                     |
| ---------------- | --------------- | ---------------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU) | Divideras med 1000 innan det skickas till `--cpus`               |
| `memoryLimit`    | 256 MB          | Hård gräns                                                       |
| `timeout`        | 30000 ms        | Mjuk avslutning via `SIGTERM` + `docker kill`                    |
| `networkEnabled` | `false`         | Blir `--network none`                                            |
| `readOnly`       | `true`          | Rotfilsystemet är skrivskyddat; `/tmp` och `/workspace` är tmpfs |

`SandboxRunner.kill(id)` och `killAll()` exponeras för avstängning; körande containrar spåras i `runningContainers: Map<string, ChildProcess>`.

### Miljövariabler för sandlådan

Konfigureras via `process.env` i `src/lib/skills/builtins.ts`:

| Miljövariabel                     | Standardvärde    | Syfte                                                                                      |
| --------------------------------- | ---------------- | ------------------------------------------------------------------------------------------ |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB) | Gräns för `file_read` och `file_write`                                                     |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`         | Gräns för svarskroppen från `http_request`                                                 |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`         | Gräns för stdout/stderr som returneras till anroparen                                      |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`          | Standardtidsgräns för kommandon i sandlådan; begränsad till 60 s                           |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`          | Huvudspärr för utgående trafik. Ange `1` eller `true` för att tillåta aktivering per anrop |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (se nedan)       | Kommaseparerad lista över tillåtna Docker-avbilder                                         |

Tillåtna standardavbilder: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. Eventuella tillägg via `SKILLS_ALLOWED_SANDBOX_IMAGES` slås samman med standardvärdena; okända avbilder avvisas av `normalizeImage()`.

> Observera: det finns ingen separat miljövariabel `SKILLS_EXECUTION_TIMEOUT_MS`. Tidsgränsen för hanteraren utanför sandlådan är hårdkodad till 30 s i `SkillExecutor` (`executor.ts:13`), men kan åsidosättas vid körning via `skillExecutor.setTimeout(ms)`.

### Isolering av arbetsytor

`file_read` och `file_write` löser varje sökväg relativt en arbetsyta per API-nyckel vid `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`. Sökvägstraversering (`..`) och förbjudna segment (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) avvisas innan någon disk-I/O utförs.

### HTTP-härdning

`http_request` (`builtins.ts:257`):

- Lista över tillåtna metoder: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Blockerade utgående huvuden: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Omdirigeringar är inaktiverade (`allowRedirect: false`)
- Dirigeras genom `safeOutboundFetch` med `guard: "public-only"` (privata adresser och loopback-intervall blockeras)
- Svaret trunkeras vid `SKILLS_MAX_HTTP_RESPONSE_BYTES`; klienten ser `truncated: true`

---

## Hybrid exekverare (förhandsversion)

`src/lib/skills/hybrid.ts` definierar en `HybridExecutor` som vid varje anrop väljer mellan `direct`-körning (i processen) och `sandbox`-körning, med en `autoUpgrade`-sökväg för nytt försök vid timeout-/minnesfel. De inkopplade implementationerna `directExecutor` / `sandboxRunner` är stubbar (`executeDirect`, `executeInSandbox` returnerar platshållarobjekt) — betrakta den här modulen som ett kontrakt under utveckling. Den faktiska exekveringen går fortfarande genom `skillExecutor` + `SandboxRunner`.

---

## Lagring

Schemat finns i två migreringar:

- `src/lib/db/migrations/016_create_skills.sql` — grundtabellerna `skills` och `skill_executions`, med index för `(api_key_id, name)` och `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — lägger till `mode`, `source_provider`, `tags` (JSON), `install_count` i `skills`.

`skill_executions.status` begränsas på databasnivå: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## REST-API

Alla slutpunkter finns under `src/app/api/skills/`. Hanteringsslutpunkterna (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) kräver **hanteringsautentisering** via `requireManagementAuth()`. Flödena för marknadsplats/installation använder den enklare `isAuthenticated()` (session eller API-nyckel).

| Slutpunkt | Metod | Syfte |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Lista registrerade färdigheter. Stöder `?q=`, `?mode=on                        | off | auto`, `?source=skillsmp | skillssh | local`, sidnumrering |
| `/api/skills/[id]` | PUT | Uppdatera `enabled` eller `mode` |
| `/api/skills/[id]` | DELETE | Avregistrera efter id |
| `/api/skills/install` | POST | Installera en anpassad färdighet (hanterarkod + schema) |
| `/api/skills/marketplace` | GET | Sök i SkillsMP-katalogen (returnerar populära standardval när `q` är tom) |
| `/api/skills/marketplace/install` | POST | Installera en SkillsMP-färdighet (kräver aktiv leverantör = `skillsmp`) |
| `/api/skills/skillssh` | GET | Sök i skills.sh-katalogen (`?q=&limit=`, begränsat till 100) |
| `/api/skills/skillssh/install` | POST | Installera en skills.sh-färdighet (kräver aktiv leverantör = `skillssh`) |
| `/api/skills/executions` | GET | Sidnumrerad exekveringshistorik (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Kör en registrerad färdighet ad hoc |

Slutpunkten `POST /api/skills/executions` returnerar HTTP `503` med `{ error: "Skills execution is disabled..." }` när `settings.skillsEnabled === false` (`executor.ts:42-45`). Operatörer kan slå på eller av huvudreglaget via **Inställningar → AI**.

### Exempel: installera en anpassad färdighet

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

Strängen `handlerCode` är en **uppslagning av hanterarnamn** — inte körbar kod. Exekveraren mappar den via `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`). Installationer från marknadsplatsen lagrar SKILL.md-texten i det här fältet som dokumentation och dirigerar exekveringen genom modellgenererade verktygsanrop. Godtycklig källkod som tillhandahålls av användaren utvärderas inte med eval.

---

## MCP-verktyg

Fyra MCP-verktyg kapslar in funktionsytan (`open-sse/mcp-server/tools/skillTools.ts`). De registreras automatiskt när MCP-servern startar.

| Verktyg                       | Beskrivning                                                     |
| ----------------------------- | --------------------------------------------------------------- |
| `omniroute_skills_list`       | Lista funktioner, valfria filter: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | Aktivera/inaktivera en funktion via `skillId`                   |
| `omniroute_skills_execute`    | Kör en funktion med en indatapayload                            |
| `omniroute_skills_executions` | Senaste körningshistoriken (standardvärde 50, högst 100)        |

Se [MCP-SERVER.md](./MCP-SERVER.md) för konfiguration av transport och tilldelning av behörighetsområden.

---

## A2A-integration

`src/lib/skills/a2a.ts` exporterar A2A-funktionsbeskrivningen `memory_aware_routing` och hjälpfunktionen `registerA2ASkill(registry)`. Anpassade A2A-funktioner finns i `src/lib/a2a/skills/` och dirigeras via `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`). Se [A2A-SERVER.md](./A2A-SERVER.md) för uppgiftens fullständiga livscykel.

---

## Lägga till en ny inbyggd funktion

1. **Definiera hanteraren** i `src/lib/skills/builtins.ts` (eller en fil på samma nivå under `src/lib/skills/builtin/`). Signatur: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Sökväg för kod i sandlåda?** Anropa `sandboxRunner.run(image, command, env, sandboxConfig({...}))`. Använd `normalizeImage()` mot listan över tillåtna avbildningar.
3. **Sökväg i filsystemet?** Skicka den alltid genom `resolveWorkspacePath(input, context)` innan disken används.
4. **Nätverksanrop?** Använd `safeOutboundFetch` med `guard: "public-only"`; rensa HTTP-huvuden via `sanitizeHeaders()`.
5. **Registrera** genom att lägga till posten i `builtinSkills` (eller genom att anropa något i stil med `registerBrowserSkill(executor)` vid start).
6. **Koppla alias för inbyggda verktyg** (valfritt) i `BUILTIN_TOOL_ALIASES` (`interception.ts:23`) om den överordnade modellen returnerar ett annat namn.
7. **Tester** i `src/lib/skills/__tests__/` (Vitest).

---

## Lägga till en anpassad (ej inbyggd) funktion

1. Registrera hanteraren när processen startar:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Infoga funktionen via `POST /api/skills/install` (fältet `handlerCode` måste matcha namnet på den registrerade hanteraren).
3. Ändra `mode` till `on` eller `auto` via `PUT /api/skills/[id]`.

---

## Driftstips

- **Huvudströmbrytare:** `settings.skillsEnabled = false` blockerar all körning och returnerar HTTP `503` på `/api/skills/executions`. Registret fortsätter att läsas in.
- **Lås utgående trafik:** låt `SKILLS_SANDBOX_NETWORK_ENABLED` vara ej angiven (standard) för en helt nätverksisolerad sandlåda. `networkEnabled: true` för ett enskilt anrop kräver fortfarande att huvudspärren är öppen.
- **Tillåt specifika avbildningar:** ange `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` för att utöka listan över tillåtna avbildningar.
- **Granska körningar:** `/dashboard/skills/executions` och `omniroute_skills_executions` frågar båda mot `skill_executions`. Lyckade körningar inkluderar `durationMs`; misslyckanden inkluderar `errorMessage`.
- **Cacheinvalidering:** anropa `skillRegistry.invalidateCache()` efter manuella databasändringar; vänta annars 60 s.
- **Anonym arbetsyta:** när `apiKeyId` är tomt hashas alla anrop till samma `"anonymous"`-arbetsyta — kod som hanterar delning bör alltid skicka en riktig nyckel.

---

## Exekveringslivscykel (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) är en **singleton** som hanterar varje anrop av en skill. Att förstå dess livscykel är avgörande för att felsöka tidsgränser, återförsök och exekveringstillstånd.

### Livscykelns 5 steg

```
   execute() anropas
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← köad, ännu inte startad (DB-rad skapad)
  └──────┬──────┘
         │ starta handler
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← handler anropad med tidsgräns
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (ingen annan väg — avslutad av överordnad process)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   DB-rad uppdaterad med status, output, durationMs
```

### Standardkonfiguration

| Inställning  | Standardvärde  | Kan konfigureras via                 |
| ------------ | -------------- | ------------------------------------ |
| `timeout`    | `30000` (30 s) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`            | `skillExecutor.setMaxRetries(count)` |

> **Viktigt**: Exekveraren är en singleton — att anropa `setTimeout()` påverkar alla efterföljande anrop globalt. Tidsgränser per skill stöds för närvarande inte. Om du behöver olika tidsgränser per skill måste du starta separata processer eller skapa en fork av exekveraren.

### Statusvärden

Från `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // Köad, ännu inte startad
  RUNNING = "running", // Handler anropad
  SUCCESS = "success", // Handler returnerade giltig output
  ERROR = "error", // Handler utlöste ett undantag
  TIMEOUT = "timeout", // Överskred exekverarens tidsgräns
}
```

> **Obs!**: Statusen `TIMEOUT` är definierad i enum-typen men **skrivs i praktiken inte till DB:n** av den aktuella exekverarimplementeringen — tidsgränsöverskridanden visas som `ERROR` med meddelandet `"Skill execution timed out"`. Statusvärdet är reserverat för framtida användning.

### Inspektera exekveringar

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Hämta en specifik exekvering efter ID
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// Lista senaste exekveringar för en API-nyckel
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// Räkna det totala antalet exekveringar
const total = skillExecutor.countExecutions("api-key-id");
```

### Beteende vid återförsök

Inställningen `maxRetries` lagras men **används för närvarande inte** av exekverarens metod `execute()` — den gör endast ett enda försök. Värdet `maxRetries` exponeras för framtida implementering och för hooks som vill läsa det.

För närvarande måste återförsök implementeras inuti skill-handlern. Inbyggda
skills registreras hos exekveraren (t.ex. `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` i `src/lib/skills/builtin/`); den handler som
du registrerar kan omsluta sin egen återförsöksslinga:

```ts
// inuti en skill-handler
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

Enum-typen `SkillMode` (`src/lib/skills/types.ts`) styr **när och hur** färdigheter anropas:

```ts
enum SkillMode {
  AUTO = "auto", // LLM avgör när färdigheten ska anropas
  MANUAL = "manual", // Anropas endast genom en uttrycklig användarbegäran
  HYBRID = "hybrid", // AUTO-poängsättning + manuell åsidosättning
}
```

> **Obs!**: Kodbasen definierar `SkillMode` (AUTO/MANUAL/HYBRID), medan fältet `Skill.mode` använder en annan form (`"on" | "off" | "auto"`). De är relaterade men inte identiska — `SkillMode` används för exekveringspolicy, medan `Skill.mode` används för aktivering av enskilda färdigheter.

### När respektive läge ska användas

| Läge     | LLM-beteende                                                                             | Användningsfall                                          |
| -------- | ---------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| `AUTO`   | LLM kan anropa färdigheten när den bedömer att det är nödvändigt                         | Generella färdigheter (filläsning, HTTP-begäranden)      |
| `MANUAL` | LLM kan inte anropa färdigheten; endast ett uttryckligt `executeSkill`-API-anrop gör det | Känsliga åtgärder (databasskrivningar, betalningar)      |
| `HYBRID` | LLM kan föreslå färdigheten; användaren måste bekräfta                                   | Färdigheter som har sidoeffekter men som inte är farliga |

### AUTO-poängsättning

När läget `AUTO` är aktivt poängsätts varje kandidatfärdighet mot begärans
kontext av `scoreAutoSkill()` i `src/lib/skills/injection.ts` — ett additivt
heltalspoängsystem (matchning av färdighetsnamn, tokenöverlappning för namn/tagg/beskrivning,
ledtrådar från bakgrundsorsaken samt bonus/avdrag för leverantörsledtrådar). De
`AUTO_MAX_SKILLS = 5` färdigheter som har högst poäng och `score >= AUTO_MIN_SCORE = 3` injiceras som
anropbara verktyg; vid lika resultat avgör först `installCount` och därefter namn. Se hela poängtabellen
i [**Generering av verktygsscheman → AUTO-poängsättning**](#auto-scoring) tidigare i det här
dokumentet; det finns inget tröskelvärde av typen flyttalet `0.6` och ingen poängsättning i `registry.ts`.

---

## Katalog över inbyggda färdigheter

OmniRoute levereras med en utvald uppsättning inbyggda färdigheter i `src/lib/skills/builtin/`. De vanligaste är:

### Färdighet för webbläsarautomatisering

Webbläsarfärdigheten (`src/lib/skills/builtin/browser.ts`) tillhandahåller automatisering av huvudlösa webbläsare via Playwright/Puppeteer. **Den är implementerad men ingår inte i standardkatalogen över färdigheter** — installera plugin-programmet för webbläsartillägget separat för att använda den.

```ts
// Aktivera i din konfiguration
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Kräv alltid uttryckligt anrop
  allowedSkills: ["browser"],
  timeout: 60000, // 60 s för sidinläsningar
  maxRetries: 1,
};
```

### Andra inbyggda kategorier

| Kategori      | Färdigheter                                   | Läge   |
| ------------- | --------------------------------------------- | ------ |
| Fil-I/O       | `file_read`, `file_write`                     | AUTO   |
| HTTP          | `http_request`                                | AUTO   |
| Sökning       | `web_search`                                  | AUTO   |
| Kodexekvering | `eval_code` (JavaScript/Python i sandlåda)    | HYBRID |
| System        | `execute_command` (CLI-exekvering i sandlåda) | MANUAL |

### Lägga till en anpassad färdighet

Se [Plugin-SDK och färdighetsintegrering](./PLUGIN_SDK.md) för information om hur du lägger till en anpassad färdighet via pluginsystemet.

---

## Se även

- [MCP-SERVER.md](./MCP-SERVER.md) — registrering av MCP-verktyg och transporter
- [A2A-SERVER.md](./A2A-SERVER.md) — livscykel för A2A-uppgifter och dirigering av färdigheter
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — användarinriktad introduktion
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — pipeline för förfrågningar och komponentkarta
- Källkod: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Tester: `src/lib/skills/__tests__/integration.test.ts`
