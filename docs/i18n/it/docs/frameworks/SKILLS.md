# Skills Framework (Italiano)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Fonte primaria:** `src/lib/skills/` e `src/app/api/skills/`
> **Ultimo aggiornamento:** 2026-06-28 — v3.8.40

OmniRoute espone un framework di Skill estensibile che consente ai modelli linguistici (e agli operatori) di comporre funzionalità riutilizzabili — dalla lettura del filesystem e dalle richieste HTTP fino all'esecuzione di codice in sandbox e alle skill selezionate del marketplace.

Una skill è un'unità di lavoro versionata e definita da uno schema. OmniRoute può inserire le skill come definizioni di strumenti nelle richieste in uscita, intercettare le chiamate agli strumenti restituite dal modello, eseguire l'handler corrispondente e fornire nuovamente il risultato al modello affinché la conversazione possa continuare. Il modello non vede mai l'implementazione, ma solo l'interfaccia dello strumento.

---

## Agent Skills e Omni Skills

OmniRoute dispone di due sistemi di skill distinti ma complementari:

| Dimensione       | **Omni Skills** (questo documento)                                              | **Agent Skills**                                                                                |
| :--------------- | :------------------------------------------------------------------------------ | :---------------------------------------------------------------------------------------------- |
| Scopo            | Inserimento di strumenti LLM + esecuzione in sandbox                            | Catalogo SKILL.md che gli agenti esterni possono individuare e utilizzare                       |
| Fonte primaria   | `src/lib/skills/` + marketplace                                                 | `src/lib/agentSkills/` + directory `skills/`                                                    |
| Modalità runtime | Inserite nelle richieste in uscita, eseguite in caso di chiamate agli strumenti | Catalogo markdown statico + endpoint di individuazione REST/MCP/A2A                             |
| Chi le utilizza  | OmniRoute stesso (routing combinato, chiamate LLM in ingresso)                  | Agenti esterni, client MCP, orchestratori A2A                                                   |
| Numero           | Variabile (determinato dal marketplace)                                         | 45 voci di catalogo (23 API + 21 CLI + 1 configurazione)                                        |
| Formato          | `SkillDefinition` con schema dello strumento + handler                          | Frontmatter `SKILL.md` + corpo markdown                                                         |
| Individuazione   | REST `/api/skills/*` + strumenti MCP `omniroute_skills_*`                       | REST `/api/agent-skills/*` + strumenti MCP `omniroute_agent_skills_*` + `list-capabilities` A2A |

Le **Omni Skills** costituiscono il motore di esecuzione: definiscono ciò che OmniRoute _può fare_ quando un LLM invoca uno strumento.

Le **Agent Skills** costituiscono il catalogo della documentazione: spiegano agli agenti esterni _come utilizzare_ l'API REST e la CLI di OmniRoute, tramite file SKILL.md strutturati che possono essere inseriti direttamente nei prompt degli agenti.

Per il catalogo Agent Skills, il generatore, gli strumenti MCP e la skill A2A, consulta [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## Concetti

### Fonti delle skill

Nello stesso registro coesistono tre fonti di skill:

1. **Skill integrate** (`src/lib/skills/builtins.ts`) — incluse con OmniRoute. Coprono i casi più comuni:
   - `file_read`, `file_write` — spazio di lavoro in sandbox per chiave API in `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — HTTP in uscita tramite `safeOutboundFetch` con `guard: "public-only"`
   - `web_search` — provider di ricerca sostituibile con caching (`executeWebSearch`)
   - `eval_code` — esecuzione di `node` o `python` in una sandbox Docker
   - `execute_command` — comando shell eseguito in una sandbox Docker
   - `browser` — struttura di base supportata da Playwright, disabilitata per impostazione predefinita (`builtin/browser.ts`)
2. **SkillsMP** (il Marketplace di OmniRoute) — recuperate da `https://skillsmp.com/api/v1/skills/search`. Richiede `skillsmpApiKey` nelle Impostazioni.
3. **SkillsSH** (catalogo della community `skills.sh`) — recuperate da `https://skills.sh/api/search`. Non richiede autenticazione; il contenuto SKILL.md viene scaricato direttamente dai file raw di GitHub.

Un singolo "provider attivo" determina da quale catalogo la dashboard esegue le installazioni (`src/lib/skills/providerSettings.ts`). È possibile modificarlo in **Impostazioni → Memoria e skill**. Valore predefinito: `skillsmp`.

### Identità delle skill

Le skill sono identificate da `name@version` nel registro in memoria (`src/lib/skills/registry.ts`). La versione deve rispettare il formato semver (`^\d+\.\d+\.\d+$`). `resolveVersion()` supporta i vincoli `^`, `~`, `>`, `>=`, `<`, `<=`, `==` e le corrispondenze esatte.

### Modalità delle skill

Ogni skill dispone di una modalità runtime che determina quando viene inserita:

| Modalità | Comportamento                                                                                                            |
| -------- | ------------------------------------------------------------------------------------------------------------------------ |
| `on`     | Sempre inserita come definizione di strumento                                                                            |
| `off`    | Mai inserita, mai eseguibile                                                                                             |
| `auto`   | Valutata rispetto alla richiesta in ingresso; inserita solo se il punteggio è ≥ `AUTO_MIN_SCORE` (valore predefinito: 3) |

`auto` è il valore predefinito per le skill installate dal marketplace. `enabled=true` e `mode="off"` insieme significano "registrata ma inattiva": modificare `enabled` tramite la colonna legacy aggiorna anche `mode`, affinché i percorsi di codice meno recenti rimangano coerenti (`src/app/api/skills/[id]/route.ts`).

### Stato (esecuzioni)

Le esecuzioni delle skill vengono registrate nella tabella `skill_executions` con i seguenti stati (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Cache del registro

`SkillRegistry` è un singleton con una cache TTL di 60 secondi (`registry.ts:14`). `loadFromDatabase()` è idempotente ed elimina le chiamate simultanee duplicate tramite `pendingLoad`. Qualsiasi operazione di scrittura (`register`/`unregister`/`unregisterById`) invalida la cache. È possibile cercare le versioni tramite `getSkillVersions(name)` e `resolveVersion(name, constraint)`.

### Inserimento in base al provider

`injectSkills()` in `src/lib/skills/injection.ts` è il punto di ingresso che converte le skill registrate in definizioni di strumenti specifiche per il provider:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

Il nome dello strumento viene codificato come `name@version`, in modo che il gestore possa selezionare la versione corretta quando il modello lo richiama.

### Punteggio AUTO

Quando `mode="auto"`, ogni skill candidata viene valutata rispetto al contesto della richiesta (`scoreAutoSkill()` in `injection.ts`):

| Segnale                                                                    | Punti        |
| -------------------------------------------------------------------------- | ------------ |
| Il nome della skill appare testualmente nel contesto                       | +6           |
| Ogni token del nome corrisponde a un token del contesto                    | +2           |
| Ogni sottostringa dei tag corrisponde al contesto                          | +3           |
| Ogni token della descrizione corrisponde al contesto                       | +1           |
| Il motivo in background corrisponde a un token del nome                    | +2 per token |
| Il motivo in background corrisponde a un tag                               | +2 per token |
| L'indicazione del provider nei tag corrisponde al provider della richiesta | +2 / −2      |

Vengono inserite le prime `AUTO_MAX_SKILLS = 5` skill con `score >= AUTO_MIN_SCORE = 3`. Le parità vengono risolte in base a `installCount` (decrescente), quindi al nome in ordine alfabetico (`injection.ts:225-235`).

### Intercettazione delle chiamate agli strumenti

`handleToolCallExecution()` in `src/lib/skills/interception.ts` viene invocato dal gestore della chat dopo che il provider upstream restituisce una risposta contenente una chiamata a uno strumento:

1. `extractToolCalls()` legge i formati specifici del provider (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Gli alias degli strumenti integrati (ad es. `omniroute_web_search` → `web_search`) vengono risolti per primi. I gestori integrati vengono eseguiti inline.
3. Tutto il resto viene instradato tramite `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`.
4. I risultati vengono reinseriti nella risposta — elementi `tool_results`, `function_call_output` o blocchi Anthropic `tool_result`, a seconda dei casi.

`customSkillExecutionEnabled` nel contesto di esecuzione può essere impostato su `false` per consentire esclusivamente l'intercettazione integrata (utilizzato dai percorsi di richiesta che disabilitano esplicitamente i gestori definiti dall'utente).

---

## Sandbox Docker

I percorsi di codice non integrati (`eval_code`, `execute_command`) vengono eseguiti all'interno di Docker tramite `SandboxRunner` (`src/lib/skills/sandbox.ts`). Ogni container viene avviato con:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (quando readOnly=true)
```

Valori predefiniti (`SandboxRunner.DEFAULT_CONFIG`):

| Campo            | Valore predefinito | Note                                                        |
| ---------------- | ------------------ | ----------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU)    | Diviso per 1000 prima di essere passato a `--cpus`          |
| `memoryLimit`    | 256 MB             | Limite rigido                                               |
| `timeout`        | 30000 ms           | Terminazione graduale tramite `SIGTERM` + `docker kill`     |
| `networkEnabled` | `false`            | Diventa `--network none`                                    |
| `readOnly`       | `true`             | FS radice di sola lettura; `/tmp` e `/workspace` sono tmpfs |

`SandboxRunner.kill(id)` e `killAll()` sono esposti per l'arresto; i container in esecuzione vengono monitorati in `runningContainers: Map<string, ChildProcess>`.

### Variabili di ambiente della sandbox

Configurate tramite `process.env` in `src/lib/skills/builtins.ts`:

| Variabile di ambiente             | Valore predefinito | Scopo                                                                                                       |
| --------------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB)   | Limite per `file_read` e `file_write`                                                                       |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`           | Limite per il corpo della risposta di `http_request`                                                        |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`           | Limite per stdout/stderr restituiti al chiamante                                                            |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`            | Timeout predefinito per i comandi nella sandbox; limitato a 60 s                                            |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`            | Controllo principale per l'uscita. Impostare `1` o `true` per consentire l'attivazione per singola chiamata |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (vedere sotto)     | Elenco separato da virgole delle immagini Docker consentite                                                 |

Immagini consentite per impostazione predefinita: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. Eventuali aggiunte tramite `SKILLS_ALLOWED_SANDBOX_IMAGES` vengono unite ai valori predefiniti; le immagini sconosciute vengono rifiutate da `normalizeImage()`.

> Nota: non esiste una variabile di ambiente separata `SKILLS_EXECUTION_TIMEOUT_MS`. Il timeout del gestore non sandbox è impostato direttamente a 30 s in `SkillExecutor` (`executor.ts:13`), ma può essere sovrascritto durante l'esecuzione tramite `skillExecutor.setTimeout(ms)`.

### Isolamento dello spazio di lavoro

`file_read` e `file_write` risolvono ogni percorso rispetto a uno spazio di lavoro per chiave API in `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`. L'attraversamento dei percorsi (`..`) e i segmenti vietati (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) vengono rifiutati prima di qualsiasi operazione di I/O su disco.

### Rafforzamento della sicurezza HTTP

`http_request` (`builtins.ts:257`):

- Elenco dei metodi consentiti: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Header in uscita bloccati: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Reindirizzamenti disabilitati (`allowRedirect: false`)
- Instradato tramite `safeOutboundFetch` con `guard: "public-only"` (gli intervalli privati/loopback sono bloccati)
- Risposta troncata a `SKILLS_MAX_HTTP_RESPONSE_BYTES`; il client riceve `truncated: true`

---

## Esecutore ibrido (anteprima)

`src/lib/skills/hybrid.ts` definisce un `HybridExecutor` che decide, per ogni chiamata, tra l'esecuzione `direct` (nel processo) e `sandbox`, con un percorso di nuovo tentativo `autoUpgrade` in caso di errori di timeout o memoria. Le implementazioni integrate `directExecutor` / `sandboxRunner` sono stub (`executeDirect`, `executeInSandbox` restituiscono oggetti segnaposto): considera questo modulo come un contratto in fase di sviluppo. L'esecuzione effettiva continua a passare attraverso `skillExecutor` + `SandboxRunner`.

---

## Archiviazione

Lo schema è definito in due migrazioni:

- `src/lib/db/migrations/016_create_skills.sql` — tabelle di base `skills` e `skill_executions`, con indici su `(api_key_id, name)` e `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — aggiunge `mode`, `source_provider`, `tags` (JSON), `install_count` a `skills`.

`skill_executions.status` è vincolato a livello di database: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## API REST

Tutti gli endpoint si trovano in `src/app/api/skills/`. Gli endpoint di gestione (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) richiedono l'**autenticazione di gestione** tramite `requireManagementAuth()`. I flussi del marketplace e di installazione utilizzano il più leggero `isAuthenticated()` (sessione o chiave API).

| Endpoint | Metodo | Scopo |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Elenca le skill registrate. Supporta `?q=`, `?mode=on                    | off | auto`, `?source=skillsmp | skillssh | local`, paginazione |
| `/api/skills/[id]` | PUT | Aggiorna `enabled` o `mode` |
| `/api/skills/[id]` | DELETE | Annulla la registrazione in base all'ID |
| `/api/skills/install` | POST | Installa una skill personalizzata (codice dell'handler + schema) |
| `/api/skills/marketplace` | GET | Cerca nel catalogo SkillsMP (restituisce le opzioni predefinite più popolari quando `q` è vuoto) |
| `/api/skills/marketplace/install` | POST | Installa una skill SkillsMP (richiede il provider attivo = `skillsmp`) |
| `/api/skills/skillssh` | GET | Cerca nel catalogo skills.sh (`?q=&limit=`, con limite massimo di 100) |
| `/api/skills/skillssh/install` | POST | Installa una skill skills.sh (richiede il provider attivo = `skillssh`) |
| `/api/skills/executions` | GET | Cronologia delle esecuzioni impaginata (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Esegue ad hoc una skill registrata |

L'endpoint `POST /api/skills/executions` restituisce HTTP `503` con `{ error: "Skills execution is disabled..." }` quando `settings.skillsEnabled === false` (`executor.ts:42-45`). Gli operatori possono attivare o disattivare l'interruttore principale da **Impostazioni → IA**.

### Esempio: installare una skill personalizzata

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

La stringa `handlerCode` è una **ricerca del nome dell'handler**, non codice eseguibile. L'esecutore la associa tramite `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`). Le installazioni dal marketplace archiviano il testo di SKILL.md in questo campo come documentazione e instradano l'esecuzione attraverso chiamate agli strumenti generate dal modello. Il codice sorgente arbitrario fornito dall'utente non viene valutato tramite eval.

---

## Strumenti MCP

Quattro strumenti MCP incapsulano l'interfaccia delle skill (`open-sse/mcp-server/tools/skillTools.ts`). Vengono registrati automaticamente all'avvio del server MCP.

| Strumento                     | Descrizione                                                       |
| ----------------------------- | ----------------------------------------------------------------- |
| `omniroute_skills_list`       | Elenca le skill; filtri opzionali: `apiKeyId`, `name`, `enabled`  |
| `omniroute_skills_enable`     | Abilita/disabilita una skill tramite `skillId`                    |
| `omniroute_skills_execute`    | Esegue una skill con un payload di input                          |
| `omniroute_skills_executions` | Cronologia delle esecuzioni recenti (predefinita 50, massimo 100) |

Consulta [MCP-SERVER.md](./MCP-SERVER.md) per la configurazione del trasporto e le assegnazioni degli ambiti.

---

## Integrazione A2A

`src/lib/skills/a2a.ts` esporta il descrittore della skill A2A `memory_aware_routing` e una funzione helper `registerA2ASkill(registry)`. Le skill A2A personalizzate si trovano in `src/lib/a2a/skills/` e vengono inoltrate tramite `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`). Consulta [A2A-SERVER.md](./A2A-SERVER.md) per il ciclo di vita completo delle attività.

---

## Aggiunta di una nuova skill integrata

1. **Definisci l'handler** in `src/lib/skills/builtins.ts` (o in un file adiacente all'interno di `src/lib/skills/builtin/`). Firma: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Percorso del codice in sandbox?** Chiama `sandboxRunner.run(image, command, env, sandboxConfig({...}))`. Usa `normalizeImage()` rispetto all'elenco consentito.
3. **Percorso del filesystem?** Passalo sempre attraverso `resolveWorkspacePath(input, context)` prima di accedere al disco.
4. **Chiamata di rete?** Usa `safeOutboundFetch` con `guard: "public-only"`; sanitizza gli header tramite `sanitizeHeaders()`.
5. **Registra** aggiungendo la voce a `builtinSkills` (oppure chiamando una funzione nello stile di `registerBrowserSkill(executor)` all'avvio).
6. **Collega gli alias degli strumenti integrati** (facoltativo) in `BUILTIN_TOOL_ALIASES` (`interception.ts:23`) se il modello upstream emette un nome diverso.
7. **Test** in `src/lib/skills/__tests__/` (Vitest).

---

## Aggiunta di una skill personalizzata (non integrata)

1. Registra l'handler all'avvio del processo:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Inserisci la skill tramite `POST /api/skills/install` (il campo `handlerCode` deve corrispondere al nome dell'handler registrato).
3. Imposta `mode` su `on` o `auto` tramite `PUT /api/skills/[id]`.

---

## Suggerimenti operativi

- **Interruttore principale:** `settings.skillsEnabled = false` blocca tutte le esecuzioni e restituisce HTTP `503` su `/api/skills/executions`. Il registro continua a essere caricato.
- **Blocca il traffico in uscita:** lascia `SKILLS_SANDBOX_NETWORK_ENABLED` non impostata (impostazione predefinita) per un ambiente sandbox completamente isolato dalla rete. `networkEnabled: true` per singola chiamata richiede comunque l'abilitazione dell'interruttore principale.
- **Consenti immagini specifiche:** imposta `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` per estendere l'elenco consentito.
- **Verifica le esecuzioni:** `/dashboard/skills/executions` e `omniroute_skills_executions` interrogano entrambi `skill_executions`. Le esecuzioni riuscite includono `durationMs`; quelle non riuscite includono `errorMessage`.
- **Invalidazione della cache:** chiama `skillRegistry.invalidateCache()` dopo modifiche manuali al database; altrimenti attendi 60 s.
- **Workspace anonimo:** quando `apiKeyId` è vuoto, tutte le chiamate vengono associate tramite hash allo stesso workspace `"anonymous"` — il codice che gestisce la condivisione deve sempre fornire una chiave reale.

---

## Ciclo di esecuzione (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) è un **singleton** che gestisce ogni invocazione delle skill. Comprenderne il ciclo di vita è fondamentale per eseguire il debug di timeout, tentativi ripetuti e stato dell'esecuzione.

### Il ciclo di vita in 5 fasi

```
   execute() chiamato
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← in coda, non ancora avviato (riga DB creata)
  └──────┬──────┘
         │ avvio dell'handler
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← handler invocato con timeout
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (nessun altro percorso — terminato dal processo padre)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   Riga DB aggiornata con stato, output, durationMs
```

### Configurazione predefinita

| Impostazione | Valore predefinito | Configurabile tramite                |
| ------------ | ------------------ | ------------------------------------ |
| `timeout`    | `30000` (30s)      | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`                | `skillExecutor.setMaxRetries(count)` |

> **Importante**: l'executor è un singleton — chiamare `setTimeout()` influisce globalmente su tutte le invocazioni successive. I timeout specifici per singola skill non sono attualmente supportati; se sono necessari timeout diversi per ciascuna skill, avvia processi separati oppure crea un fork dell'executor.

### Valori di stato

Da `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // In coda, non ancora avviato
  RUNNING = "running", // Handler invocato
  SUCCESS = "success", // L'handler ha restituito un output valido
  ERROR = "error", // L'handler ha generato un'eccezione
  TIMEOUT = "timeout", // Ha superato il timeout dell'executor
}
```

> **Nota**: lo stato `TIMEOUT` è definito nell'enum, ma **non viene effettivamente scritto nel DB** dall'attuale implementazione dell'executor — i timeout vengono riportati come `ERROR` con il messaggio `"Skill execution timed out"`. L'enum di stato è riservato per utilizzi futuri.

### Ispezione delle esecuzioni

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Ottiene un'esecuzione specifica tramite ID
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// Elenca le esecuzioni recenti per una chiave API
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// Conta il numero totale di esecuzioni
const total = skillExecutor.countExecutions("api-key-id");
```

### Comportamento dei tentativi ripetuti

L'impostazione `maxRetries` viene memorizzata, ma **non è attualmente utilizzata** dal metodo `execute()` dell'executor, che esegue un solo tentativo. Il valore `maxRetries` è esposto per implementazioni future e per gli hook che devono leggerlo.

Per il momento, i tentativi ripetuti devono essere implementati all'interno dell'handler della skill stessa. Le skill
integrate vengono registrate nell'executor (ad es. `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` in `src/lib/skills/builtin/`); qualsiasi handler
registrato può includere il proprio ciclo di tentativi:

```ts
// all'interno dell'handler di una skill
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

## SkillMode in dettaglio

L'enum `SkillMode` (`src/lib/skills/types.ts`) controlla **quando e come** vengono invocate le skill:

```ts
enum SkillMode {
  AUTO = "auto", // L'LLM decide quando chiamare la skill
  MANUAL = "manual", // Invocata solo su richiesta esplicita dell'utente
  HYBRID = "hybrid", // Punteggio AUTO + override manuale
}
```

> **Nota**: il codebase definisce `SkillMode` (AUTO/MANUAL/HYBRID), mentre il campo `Skill.mode` utilizza una struttura diversa (`"on" | "off" | "auto"`). Sono correlati, ma non identici: `SkillMode` riguarda la policy dell'esecutore, mentre `Skill.mode` riguarda l'abilitazione di ciascuna skill.

### Quando utilizzare ciascuna modalità

| Modalità | Comportamento dell'LLM                                                                              | Caso d'uso                                                 |
| -------- | --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `AUTO`   | L'LLM può chiamare la skill quando lo ritiene necessario                                            | Skill generiche (lettura di file, richieste HTTP)          |
| `MANUAL` | L'LLM non può chiamare la skill; viene invocata solo da una chiamata API esplicita a `executeSkill` | Operazioni sensibili (scritture nel database, pagamenti)   |
| `HYBRID` | L'LLM può suggerire la skill; l'utente deve confermare                                              | Skill che hanno effetti collaterali ma non sono pericolose |

### Punteggio AUTO

Quando la modalità `AUTO` è attiva, a ogni skill candidata viene assegnato un punteggio in base al contesto della richiesta
da `scoreAutoSkill()` in `src/lib/skills/injection.ts`, tramite un sistema additivo
a punti interi (corrispondenza con il nome della skill, sovrapposizione dei token di nome/tag/descrizione,
indicazioni sul motivo in background, bonus/penalità per le indicazioni sul provider). Le prime
`AUTO_MAX_SKILLS = 5` skill con `score >= AUTO_MIN_SCORE = 3` vengono inserite come
strumenti richiamabili; le parità vengono risolte prima in base a `installCount`, poi al nome. Consulta la tabella completa dei punteggi
in [**Generazione dello schema degli strumenti → Punteggio AUTO**](#auto-scoring), riportata in precedenza in questo
documento; non esiste una soglia decimale in stile `0.6` né alcun sistema di punteggio in `registry.ts`.

---

## Catalogo delle skill integrate

OmniRoute include un insieme selezionato di skill integrate in `src/lib/skills/builtin/`. Le più comuni sono:

### Skill di automazione del browser

La skill del browser (`src/lib/skills/builtin/browser.ts`) fornisce l'automazione headless del browser tramite Playwright/Puppeteer. **È implementata, ma non è inclusa nel catalogo predefinito delle skill**: per utilizzarla, installa separatamente il plugin dell'estensione del browser.

```ts
// Abilita nella configurazione
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Richiedi sempre un'invocazione esplicita
  allowedSkills: ["browser"],
  timeout: 60000, // 60s per il caricamento delle pagine
  maxRetries: 1,
};
```

### Altre categorie integrate

| Categoria         | Skill                                         | Modalità |
| ----------------- | --------------------------------------------- | -------- |
| I/O dei file      | `file_read`, `file_write`                     | AUTO     |
| HTTP              | `http_request`                                | AUTO     |
| Ricerca           | `web_search`                                  | AUTO     |
| Esecuzione codice | `eval_code` (JavaScript/Python in sandbox)    | HYBRID   |
| Sistema           | `execute_command` (esecuzione CLI in sandbox) | MANUAL   |

### Aggiunta di una skill personalizzata

Consulta [SDK dei plugin e integrazione delle skill](./PLUGIN_SDK.md) per scoprire come aggiungere una skill personalizzata tramite il sistema di plugin.

---

## Vedi anche

- [MCP-SERVER.md](./MCP-SERVER.md) — registrazione degli strumenti MCP e trasporti
- [A2A-SERVER.md](./A2A-SERVER.md) — ciclo di vita delle attività A2A e instradamento delle skill
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — introduzione per gli utenti
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — pipeline delle richieste e mappa dei componenti
- Codice sorgente: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Test: `src/lib/skills/__tests__/integration.test.ts`
