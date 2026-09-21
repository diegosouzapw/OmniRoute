# Skills Framework (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Referenčni vir:** `src/lib/skills/` in `src/app/api/skills/`
> **Nazadnje posodobljeno:** 2026-06-28 — v3.8.40

OmniRoute ponuja razširljivo ogrodje veščin, ki jezikovnim modelom (in operaterjem) omogoča sestavljanje zmogljivosti za večkratno uporabo — od branja datotečnega sistema in zahtev HTTP do izvajanja kode v izoliranem okolju ter skrbno izbranih veščin iz tržnice.

Veščina je različičena in s shemo opredeljena enota dela. OmniRoute lahko veščine vstavi kot definicije orodij v odhodne zahteve, prestreže klice orodij, ki jih vrne model, zažene ustrezni izvajalnik in rezultat posreduje nazaj modelu, da se pogovor lahko nadaljuje. Model nikoli ne vidi implementacije — samo vmesnik orodja.

---

## Agent Skills v primerjavi z Omni Skills

OmniRoute ima dva različna, vendar dopolnjujoča se sistema veščin:

| Razsežnost       | **Omni Skills** (ta dokument)                                   | **Agent Skills**                                                                             |
| :--------------- | :-------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| Namen            | Vstavljanje orodij LLM + izvajanje v izoliranem okolju          | Katalog SKILL.md, ki ga lahko zunanji agenti odkrijejo in uporabljajo                        |
| Referenčni vir   | `src/lib/skills/` + tržnica                                     | `src/lib/agentSkills/` + imenik `skills/`                                                    |
| Način izvajanja  | Vstavljene v odhodne zahteve, izvedene ob dogodkih klica orodja | Statični katalog Markdown + končne točke REST/MCP/A2A za odkrivanje                          |
| Kdo ga uporablja | Sam OmniRoute (kombinirano usmerjanje, vhodni klici LLM)        | Zunanji agenti, odjemalci MCP, orkestratorji A2A                                             |
| Število          | Spremenljivo (odvisno od tržnice)                               | 45 vnosov v katalogu (23 API + 21 CLI + 1 konfiguracijski)                                   |
| Oblika           | `SkillDefinition` s shemo orodja + izvajalnikom                 | Sprednja vsebina `SKILL.md` + telo Markdown                                                  |
| Odkrivanje       | REST `/api/skills/*` + orodja MCP `omniroute_skills_*`          | REST `/api/agent-skills/*` + orodja MCP `omniroute_agent_skills_*` + A2A `list-capabilities` |

**Omni Skills** so izvajalni mehanizem — določajo, kaj OmniRoute _lahko naredi_, ko LLM prikliče orodje.

**Agent Skills** so dokumentacijski katalog — zunanjim agentom pojasnjujejo, _kako uporabljati_ OmniRouteov REST API in CLI, s strukturiranimi datotekami SKILL.md, ki jih je mogoče neposredno vključiti v pozive agentov.

Za katalog Agent Skills, generator, orodja MCP in veščino A2A glejte [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## Koncepti

### Viri veščin

V istem registru soobstajajo trije viri veščin:

1. **Vgrajene veščine** (`src/lib/skills/builtins.ts`) — dobavljene z OmniRoute. Pokrivajo pogoste primere:
   - `file_read`, `file_write` — izolirani delovni prostor za posamezen ključ API pod `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — odhodni HTTP prek `safeOutboundFetch` z `guard: "public-only"`
   - `web_search` — zamenljiv ponudnik iskanja s predpomnjenjem (`executeWebSearch`)
   - `eval_code` — izvajanje `node` ali `python` v izoliranem okolju Docker
   - `execute_command` — ukaz lupine v izoliranem okolju Docker
   - `browser` — ogrodje, podprto s Playwrightom, privzeto onemogočeno (`builtin/browser.ts`)
2. **SkillsMP** (tržnica OmniRoute) — pridobljene iz `https://skillsmp.com/api/v1/skills/search`. V nastavitvah zahtevajo `skillsmpApiKey`.
3. **SkillsSH** (katalog skupnosti `skills.sh`) — pridobljene iz `https://skills.sh/api/search`. Preverjanje pristnosti ni potrebno; vsebina SKILL.md se pridobi neposredno iz neobdelanih datotek GitHub.

En sam »aktivni ponudnik« določa, iz katerega kataloga nadzorna plošča namešča veščine (`src/lib/skills/providerSettings.ts`). Preklopite ga v razdelku **Nastavitve → Pomnilnik in veščine**. Privzeto: `skillsmp`.

### Identiteta veščine

Veščine so v registru v pomnilniku (`src/lib/skills/registry.ts`) določene s ključem `name@version`. Različica mora biti v obliki semver (`^\d+\.\d+\.\d+$`). `resolveVersion()` razume omejitve `^`, `~`, `>`, `>=`, `<`, `<=`, `==` in omejitve natančnega ujemanja.

### Način veščine

Vsaka veščina ima način izvajanja, ki določa, kdaj je vstavljena:

| Način  | Vedenje                                                                                        |
| ------ | ---------------------------------------------------------------------------------------------- |
| `on`   | Vedno vstavljena kot definicija orodja                                                         |
| `off`  | Nikoli vstavljena in nikoli izvedljiva                                                         |
| `auto` | Ocenjena glede na vhodno zahtevo; vstavljena samo, če je ocena ≥ `AUTO_MIN_SCORE` (privzeto 3) |

`auto` je privzeta nastavitev za veščine, nameščene iz tržnice. Kombinacija `enabled=true` in `mode="off"` pomeni »registrirana, vendar neaktivna« — preklop vrednosti `enabled` prek starega stolpca posodobi tudi `mode`, tako da starejše poti kode ostanejo usklajene (`src/app/api/skills/[id]/route.ts`).

### Stanje (izvajanja)

Izvajanja veščin se spremljajo v tabeli `skill_executions` z naslednjimi stanji (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Predpomnilnik registra

`SkillRegistry` je singleton s predpomnilnikom TTL dolžine 60 sekund (`registry.ts:14`). `loadFromDatabase()` je idempotentna funkcija, ki prek `pendingLoad` odstrani podvojene sočasne klice. Vsako pisanje (`register`/`unregister`/`unregisterById`) razveljavi predpomnilnik. Različice poiščite z `getSkillVersions(name)` in `resolveVersion(name, constraint)`.

### Vstavljanje glede na ponudnika

`injectSkills()` v `src/lib/skills/injection.ts` je vstopna točka, ki registrirane veščine pretvori v definicije orodij, specifične za ponudnika:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

Ime orodja je kodirano kot `name@version`, da lahko obdelovalnik izbere pravo različico, ko ga model pokliče nazaj.

### Točkovanje AUTO

Ko je `mode="auto"`, se vsaka kandidatna veščina točkuje glede na kontekst zahteve (`scoreAutoSkill()` v `injection.ts`):

| Signal                                                  | Točke       |
| ------------------------------------------------------- | ----------- |
| Ime veščine se dobesedno pojavi v kontekstu             | +6          |
| Vsak žeton imena se ujema z žetonom konteksta           | +2          |
| Vsak podniz oznake se ujema s kontekstom                | +3          |
| Vsak žeton opisa se ujema s kontekstom                  | +1          |
| Razlog v ozadju se ujema z žetonom imena                | +2 na žeton |
| Razlog v ozadju se ujema z oznako                       | +2 na žeton |
| Namig ponudnika v oznakah se ujema s ponudnikom zahteve | +2 / −2     |

Vključenih je največ `AUTO_MAX_SKILLS = 5` veščin z `score >= AUTO_MIN_SCORE = 3`. Izenačenja se razrešijo glede na `installCount` (padajoče), nato pa po abecednem vrstnem redu imen (`injection.ts:225-235`).

### Prestrezanje klicev orodij

Obdelovalnik klepeta po tem, ko nadrejena storitev vrne odziv s klicem orodja, prikliče `handleToolCallExecution()` v `src/lib/skills/interception.ts`:

1. `extractToolCalls()` prebere oblike, specifične za ponudnika (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Najprej se razrešijo vzdevki vgrajenih orodij (npr. `omniroute_web_search` → `web_search`). Vgrajeni obdelovalniki se izvedejo neposredno.
3. Vse ostalo se usmeri prek `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`.
4. Rezultati se vstavijo nazaj v odziv — kot elementi `tool_results`, `function_call_output` ali, kjer je ustrezno, kot bloki Anthropic `tool_result`.

Možnost `customSkillExecutionEnabled` v kontekstu izvajanja je mogoče nastaviti na `false`, da se dovoli samo prestrezanje vgrajenih orodij (uporabljajo jo poti zahtev, ki izrecno onemogočajo uporabniško določene obdelovalnike).

---

## Izolirano okolje Docker

Poti kode, ki niso vgrajene (`eval_code`, `execute_command`), se izvajajo znotraj okolja Docker prek `SandboxRunner` (`src/lib/skills/sandbox.ts`). Vsak vsebnik se zažene z:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (ko je readOnly=true)
```

Privzete vrednosti (`SandboxRunner.DEFAULT_CONFIG`):

| Polje            | Privzeto        | Opombe                                                                        |
| ---------------- | --------------- | ----------------------------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0,1 CPE) | Pred posredovanjem možnosti `--cpus` se deli s 1000                           |
| `memoryLimit`    | 256 MB          | Trda omejitev                                                                 |
| `timeout`        | 30000 ms        | Mehka prekinitev prek `SIGTERM` + `docker kill`                               |
| `networkEnabled` | `false`         | Pretvori se v `--network none`                                                |
| `readOnly`       | `true`          | Korenski datotečni sistem je samo za branje; `/tmp` in `/workspace` sta tmpfs |

`SandboxRunner.kill(id)` in `killAll()` sta na voljo za zaustavitev; delujoči vsebniki se spremljajo v `runningContainers: Map<string, ChildProcess>`.

### Spremenljivke okolja izoliranega okolja

Nastavljene prek `process.env` v `src/lib/skills/builtins.ts`:

| Spremenljivka okolja              | Privzeto         | Namen                                                                                               |
| --------------------------------- | ---------------- | --------------------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB) | Omejitev za `file_read` in `file_write`                                                             |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`         | Omejitev telesa odgovora `http_request`                                                             |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`         | Omejitev stdout/stderr, vrnjenih klicatelju                                                         |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`          | Privzeta časovna omejitev za ukaze v izoliranem okolju; največ 60 s                                 |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`          | Glavno stikalo za odhodni promet. Nastavite na `1` ali `true`, da omogočite vklop za posamezen klic |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (glejte spodaj)  | Z vejicami ločen seznam dovoljenih slik Docker                                                      |

Privzeto dovoljene slike: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. Vsi dodatki prek `SKILLS_ALLOWED_SANDBOX_IMAGES` se združijo s privzetimi vrednostmi; `normalizeImage()` zavrne neznane slike.

> Opomba: ločena spremenljivka okolja `SKILLS_EXECUTION_TIMEOUT_MS` ne obstaja. Časovna omejitev obravnavalnika zunaj izoliranega okolja je v `SkillExecutor` (`executor.ts:13`) fiksno nastavljena na 30 s, vendar jo je med izvajanjem mogoče preglasiti prek `skillExecutor.setTimeout(ms)`.

### Izolacija delovnega prostora

`file_read` in `file_write` vsako pot razrešita glede na delovni prostor posameznega ključa API na `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`. Prehajanje po poteh (`..`) in prepovedani segmenti (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) so zavrnjeni pred kakršnim koli V/I na disku.

### Utrjevanje HTTP

`http_request` (`builtins.ts:257`):

- Seznam dovoljenih metod: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Blokirane odhodne glave: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Preusmeritve so onemogočene (`allowRedirect: false`)
- Usmerjeno prek `safeOutboundFetch` z `guard: "public-only"` (zasebni/zančni obsegi so blokirani)
- Odgovor je skrajšan pri `SKILLS_MAX_HTTP_RESPONSE_BYTES`; odjemalec prejme `truncated: true`

---

## Hibridni izvajalnik (predogled)

`src/lib/skills/hybrid.ts` definira `HybridExecutor`, ki se pri vsakem klicu odloči med izvajanjem `direct` (znotraj procesa) in `sandbox`, s potjo ponovnega poskusa `autoUpgrade` ob napakah zaradi časovne omejitve ali pomanjkanja pomnilnika. Vgrajeni implementaciji `directExecutor` / `sandboxRunner` sta začasni (`executeDirect`, `executeInSandbox` vračata nadomestne objekte) — ta modul obravnavajte kot pogodbo v nastajanju. Dejansko izvajanje še vedno poteka prek `skillExecutor` + `SandboxRunner`.

---

## Shramba

Shema je določena v dveh migracijah:

- `src/lib/db/migrations/016_create_skills.sql` — osnovni tabeli `skills` in `skill_executions` z indeksoma za `(api_key_id, name)` in `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — v tabelo `skills` doda `mode`, `source_provider`, `tags` (JSON) in `install_count`.

`skill_executions.status` je omejen na ravni podatkovne zbirke: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## REST API

Vse končne točke so v `src/app/api/skills/`. Končne točke za upravljanje (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) zahtevajo **avtentikacijo za upravljanje** prek `requireManagementAuth()`. Tokovi tržnice/namestitve uporabljajo manj strogo preverjanje `isAuthenticated()` (seja ali ključ API).

| Končna točka | Metoda | Namen |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Prikaže registrirane veščine. Podpira `?q=`, `?mode=on                   | off | auto`, `?source=skillsmp | skillssh | local`, ostranjevanje |
| `/api/skills/[id]` | PUT | Posodobi `enabled` ali `mode` |
| `/api/skills/[id]` | DELETE | Odstrani registracijo glede na ID |
| `/api/skills/install` | POST | Namesti veščino po meri (koda obravnavalnika + shema) |
| `/api/skills/marketplace` | GET | Išče po katalogu SkillsMP (ko je `q` prazen, vrne privzete priljubljene vnose) |
| `/api/skills/marketplace/install` | POST | Namesti veščino SkillsMP (zahteva aktivnega ponudnika = `skillsmp`) |
| `/api/skills/skillssh` | GET | Išče po katalogu skills.sh (`?q=&limit=`, omejeno na 100) |
| `/api/skills/skillssh/install` | POST | Namesti veščino skills.sh (zahteva aktivnega ponudnika = `skillssh`) |
| `/api/skills/executions` | GET | Ostranjena zgodovina izvajanj (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Izvede registrirano veščino ad hoc |

Končna točka `POST /api/skills/executions` vrne HTTP `503` z `{ error: "Skills execution is disabled..." }`, ko je `settings.skillsEnabled === false` (`executor.ts:42-45`). Upravljavci lahko glavno stikalo preklopijo v **Nastavitve → UI**.

### Primer: namestitev veščine po meri

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

Niz `handlerCode` je **ime za iskanje obravnavalnika** — ne izvršljiva koda. Izvajalnik ga preslika prek `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`). Namestitve iz tržnice v to polje shranijo besedilo SKILL.md kot dokumentacijo, izvajanje pa usmerijo prek klicev orodij, ki jih ustvari model. Poljubna izvorna koda, ki jo posreduje uporabnik, se ne izvaja z evalvacijo.

---

## Orodja MCP

Štiri orodja MCP ovijajo vmesnik veščin (`open-sse/mcp-server/tools/skillTools.ts`). Samodejno se registrirajo ob zagonu strežnika MCP.

| Orodje                        | Opis                                                                 |
| ----------------------------- | -------------------------------------------------------------------- |
| `omniroute_skills_list`       | Prikaže seznam veščin; izbirni filtri: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | Omogoči/onemogoči veščino glede na `skillId`                         |
| `omniroute_skills_execute`    | Izvede veščino z vhodno koristno vsebino                             |
| `omniroute_skills_executions` | Nedavna zgodovina izvajanj (privzeto 50, največ 100)                 |

Za nastavitev prenosa in dodelitve obsegov glejte [MCP-SERVER.md](./MCP-SERVER.md).

---

## Integracija A2A

`src/lib/skills/a2a.ts` izvaža deskriptor veščine A2A `memory_aware_routing` in pomožno funkcijo `registerA2ASkill(registry)`. Veščine A2A po meri so v `src/lib/a2a/skills/`, zahteve zanje pa se usmerjajo prek `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`). Za celoten življenjski cikel opravila glejte [A2A-SERVER.md](./A2A-SERVER.md).

---

## Dodajanje nove vgrajene veščine

1. **Določite obravnavalnik** v `src/lib/skills/builtins.ts` (ali v sorodni datoteki pod `src/lib/skills/builtin/`). Podpis: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Pot kode v peskovniku?** Pokličite `sandboxRunner.run(image, command, env, sandboxConfig({...}))`. Uporabite `normalizeImage()` za preverjanje glede na seznam dovoljenih elementov.
3. **Pot datotečnega sistema?** Pred dostopom do diska jo vedno posredujte skozi `resolveWorkspacePath(input, context)`.
4. **Omrežni klic?** Uporabite `safeOutboundFetch` z `guard: "public-only"`; glave prečistite s `sanitizeHeaders()`.
5. **Registrirajte** veščino tako, da dodate vnos v `builtinSkills` (ali ob zagonu pokličete funkcijo v slogu `registerBrowserSkill(executor)`).
6. **Povežite vzdevke vgrajenih orodij** (izbirno) v `BUILTIN_TOOL_ALIASES` (`interception.ts:23`), če nadrejeni model oddaja drugačno ime.
7. **Teste** dodajte v `src/lib/skills/__tests__/` (Vitest).

---

## Dodajanje veščine po meri (ki ni vgrajena)

1. Ob zagonu procesa registrirajte obravnavalnik:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Veščino vstavite prek `POST /api/skills/install` (polje `handlerCode` se mora ujemati z imenom registriranega obravnavalnika).
3. Prek `PUT /api/skills/[id]` preklopite `mode` na `on` ali `auto`.

---

## Nasveti za delovanje

- **Glavno stikalo:** `settings.skillsEnabled = false` prepreči vsa izvajanja in za `/api/skills/executions` vrne HTTP `503`. Register se še naprej nalaga.
- **Omejite izhodni promet:** za popolnoma omrežno izolirano izvajanje v peskovniku naj `SKILLS_SANDBOX_NETWORK_ENABLED` ostane nenastavljen (privzeto). Nastavitev `networkEnabled: true` za posamezen klic še vedno zahteva glavno dovoljenje.
- **Dovolite določene slike:** nastavite `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"`, da razširite seznam dovoljenih elementov.
- **Preglejte izvajanja:** `/dashboard/skills/executions` in `omniroute_skills_executions` poizvedujeta po `skill_executions`. Uspešna izvajanja vključujejo `durationMs`, neuspešna pa `errorMessage`.
- **Razveljavitev predpomnilnika:** po ročnih spremembah zbirke podatkov pokličite `skillRegistry.invalidateCache()`; sicer počakajte 60 s.
- **Anonimni delovni prostor:** ko je `apiKeyId` prazen, se vsi klici razpršijo v isti delovni prostor `"anonymous"` — koda, ki upošteva skupno rabo, mora vedno posredovati pravi ključ.

---

## Življenjski cikel izvajanja (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) je **singleton**, ki upravlja vsak priklic veščine. Razumevanje njegovega življenjskega cikla je ključnega pomena za odpravljanje napak pri časovnih omejitvah, ponovnih poskusih in stanju izvajanja.

### 5-stopenjski življenjski cikel

```
   execute() je poklican
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← v čakalni vrsti, še ni zagnano (vrstica v DB je ustvarjena)
  └──────┬──────┘
         │ zagon upravljalnika
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← upravljalnik je priklican s časovno omejitvijo
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (ni druge poti — nadrejeni proces ga je končal)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   Vrstica v DB je posodobljena s stanjem, izhodom in durationMs
```

### Privzeta konfiguracija

| Nastavitev   | Privzeto       | Nastavljivo prek                     |
| ------------ | -------------- | ------------------------------------ |
| `timeout`    | `30000` (30 s) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`            | `skillExecutor.setMaxRetries(count)` |

> **Pomembno**: Izvajalnik je singleton — klic `setTimeout()` globalno vpliva na vse nadaljnje priklice. Časovne omejitve za posamezne veščine trenutno niso podprte; če potrebujete različne časovne omejitve za posamezne veščine, zaženite ločene procese ali razvejite izvajalnik.

### Vrednosti stanja

Iz `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // V čakalni vrsti, še ni zagnano
  RUNNING = "running", // Upravljalnik je priklican
  SUCCESS = "success", // Upravljalnik je vrnil veljaven izhod
  ERROR = "error", // Upravljalnik je sprožil izjemo
  TIMEOUT = "timeout", // Časovna omejitev izvajalnika je bila presežena
}
```

> **Opomba**: Stanje `TIMEOUT` je opredeljeno v enumeraciji, vendar ga trenutna implementacija izvajalnika **dejansko ne zapiše v DB** — časovne omejitve se prikažejo kot `ERROR` s sporočilom `"Skill execution timed out"`. Enumeracija stanja je rezervirana za prihodnjo uporabo.

### Pregledovanje izvajanj

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Pridobi določeno izvajanje po ID-ju
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} v ${exec.durationMs}ms`);
}

// Prikaži nedavna izvajanja za ključ API
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// Preštej vsa izvajanja
const total = skillExecutor.countExecutions("api-key-id");
```

### Vedenje pri ponovnih poskusih

Nastavitev `maxRetries` se shrani, vendar je metoda `execute()` izvajalnika **trenutno ne uporablja** — izvede samo en poskus. Vrednost `maxRetries` je na voljo za prihodnjo implementacijo in za kavlje, ki jo želijo prebrati.

Za zdaj je treba ponovne poskuse implementirati znotraj samega upravljalnika veščine. Vgrajene
veščine so registrirane pri izvajalniku (npr. `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` v `src/lib/skills/builtin/`); katerikoli upravljalnik
registrirate, lahko vsebuje lastno zanko ponovnih poskusov:

```ts
// znotraj upravljalnika veščine
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

## Podrobnosti o SkillMode

Naštevanje `SkillMode` (`src/lib/skills/types.ts`) določa, **kdaj in kako** se spretnosti prikličejo:

```ts
enum SkillMode {
  AUTO = "auto", // LLM odloči, kdaj naj pokliče spretnost
  MANUAL = "manual", // Priklic samo na izrecno zahtevo uporabnika
  HYBRID = "hybrid", // Točkovanje AUTO + ročna preglasitev
}
```

> **Opomba**: Programska osnova definira `SkillMode` (AUTO/MANUAL/HYBRID), medtem ko polje `Skill.mode` uporablja drugačno obliko (`"on" | "off" | "auto"`). Povezana sta, vendar nista enaka — `SkillMode` je namenjen pravilniku izvajalnika, `Skill.mode` pa omogočanju posamezne spretnosti.

### Kdaj uporabiti posamezen način

| Način    | Vedenje LLM                                                                         | Primer uporabe                                            |
| -------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `AUTO`   | LLM lahko pokliče spretnost, ko presodi, da je to potrebno                          | Splošnonamenske spretnosti (branje datotek, zahteve HTTP) |
| `MANUAL` | LLM ne more poklicati spretnosti; prikliče jo le izrecni klic API-ja `executeSkill` | Občutljive operacije (pisanje v zbirko podatkov, plačila) |
| `HYBRID` | LLM lahko predlaga spretnost; uporabnik jo mora potrditi                            | Spretnosti s stranskimi učinki, ki pa niso nevarne        |

### Točkovanje AUTO

Ko je aktiven način `AUTO`, se vsaka možna spretnost točkuje glede na kontekst
zahteve s funkcijo `scoreAutoSkill()` v `src/lib/skills/injection.ts` — uporablja
se seštevalni celoštevilski sistem točkovanja (ujemanje z imenom spretnosti,
prekrivanje žetonov imena/oznake/opisa, namigi razlogov v ozadju ter
bonus/kazen za namig ponudnika). Najboljših `AUTO_MAX_SKILLS = 5` spretnosti z
`score >= AUTO_MIN_SCORE = 3` se vstavi kot orodja, ki jih je mogoče priklicati;
izenačenja se razrešijo najprej po `installCount`, nato po imenu. Celotno tabelo
točk si oglejte v razdelku [**Ustvarjanje sheme orodij → Točkovanje AUTO**](#auto-scoring)
na prejšnjem mestu v tem dokumentu; prag v slogu `0.6` z decimalno vrednostjo ne
obstaja, prav tako se točkovanje ne izvaja v `registry.ts`.

---

## Katalog vgrajenih spretnosti

OmniRoute vključuje skrbno izbran nabor vgrajenih spretnosti v `src/lib/skills/builtin/`. Najpogostejše so:

### Spretnost avtomatizacije brskalnika

Spretnost brskalnika (`src/lib/skills/builtin/browser.ts`) zagotavlja avtomatizacijo brezglavega brskalnika prek Playwright/Puppeteer. **Je implementirana, vendar ni vključena v privzeti katalog spretnosti** — če jo želite uporabljati, ločeno namestite vtičnik razširitve brskalnika.

```ts
// Omogočite v svoji konfiguraciji
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Vedno zahtevaj izrecen priklic
  allowedSkills: ["browser"],
  timeout: 60000, // 60 s za nalaganje strani
  maxRetries: 1,
};
```

### Druge vgrajene kategorije

| Kategorija     | Spretnosti                                  | Način  |
| -------------- | ------------------------------------------- | ------ |
| V/I datotek    | `file_read`, `file_write`                   | AUTO   |
| HTTP           | `http_request`                              | AUTO   |
| Iskanje        | `web_search`                                | AUTO   |
| Izvajanje kode | `eval_code` (izoliran JavaScript/Python)    | HYBRID |
| Sistem         | `execute_command` (izolirano izvajanje CLI) | MANUAL |

### Dodajanje spretnosti po meri

Navodila za dodajanje spretnosti po meri prek sistema vtičnikov najdete v dokumentu [SDK za vtičnike in integracija spretnosti](./PLUGIN_SDK.md).

---

## Glejte tudi

- [MCP-SERVER.md](./MCP-SERVER.md) — registracija orodij MCP in transporti
- [A2A-SERVER.md](./A2A-SERVER.md) — življenjski cikel opravil A2A in usmerjanje veščin
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — uvod za uporabnike
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — cevovod zahtev in zemljevid komponent
- Izvorna koda: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Testi: `src/lib/skills/__tests__/integration.test.ts`
