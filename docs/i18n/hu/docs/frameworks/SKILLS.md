# Skills Framework (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Hiteles forrás:** `src/lib/skills/` és `src/app/api/skills/`
> **Legutóbbi frissítés:** 2026-06-28 — v3.8.40

Az OmniRoute egy bővíthető Skills keretrendszert biztosít, amely lehetővé teszi a nyelvi modellek (és az operátorok) számára, hogy újrafelhasználható képességeket állítsanak össze — a fájlrendszer olvasásától és a HTTP-kérésektől kezdve az izolált kódfuttatáson át a válogatott piactéri skillekig.

Egy skill egy verziózott, séma által definiált munkaegység. Az OmniRoute eszközdefiníciókként illesztheti be a skilleket a kimenő kérésekbe, elfoghatja a modelltől visszaérkező eszközhívásokat, futtathatja a megfelelő kezelőt, majd visszaadhatja az eredményt a modellnek, hogy a beszélgetés folytatódhasson. A modell soha nem látja a megvalósítást — csak az eszköz interfészét.

---

## Agent Skills és Omni Skills

Az OmniRoute két különálló, de egymást kiegészítő skillrendszerrel rendelkezik:

| Dimenzió       | **Omni Skills** (ez a dokumentum)                                 | **Agent Skills**                                                                               |
| :------------- | :---------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| Cél            | LLM-eszközök beillesztése + izolált végrehajtás                   | SKILL.md-katalógus külső ügynökök számára, felderítéshez és használathoz                       |
| Hiteles forrás | `src/lib/skills/` + piactér                                       | `src/lib/agentSkills/` + `skills/` könyvtár                                                    |
| Futásidejű mód | Kimenő kérésekbe illesztve, eszközhívási eseményeknél végrehajtva | Statikus markdownkatalógus + REST/MCP/A2A felderítési végpontok                                |
| Ki használja   | Maga az OmniRoute (kombinált útválasztás, bejövő LLM-hívások)     | Külső ügynökök, MCP-kliensek, A2A-orchestrátorok                                               |
| Darabszám      | Változó (piactérvezérelt)                                         | 45 katalógusbejegyzés (23 API + 21 CLI + 1 konfiguráció)                                       |
| Formátum       | `SkillDefinition` eszközsémával + kezelővel                       | `SKILL.md` frontmatter + markdown-törzs                                                        |
| Felderítés     | `/api/skills/*` REST + `omniroute_skills_*` MCP-eszközök          | `/api/agent-skills/*` REST + `omniroute_agent_skills_*` MCP-eszközök + A2A `list-capabilities` |

Az **Omni Skills** a végrehajtási motor — azt határozza meg, hogy az OmniRoute _mit képes megtenni_, amikor egy LLM meghív egy eszközt.

Az **Agent Skills** a dokumentációs katalógus — strukturált SKILL.md-fájlokkal ismerteti a külső ügynökökkel, _hogyan használják_ az OmniRoute REST API-ját és CLI-jét; ezek a fájlok közvetlenül beilleszthetők az ügynökök promptjaiba.

Az Agent Skills katalógusáról, generátoráról, MCP-eszközeiről és A2A-skilljéről lásd: [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## Fogalmak

### Skillforrások

Három skillforrás létezik egymás mellett ugyanabban a regisztrációs tárban:

1. **Beépített skillek** (`src/lib/skills/builtins.ts`) — az OmniRoute részeként érkeznek. A gyakori eseteket fedik le:
   - `file_read`, `file_write` — API-kulcsonkénti izolált munkaterület a `<DATA_DIR>/skills/workspaces/<hashed-key>/` alatt
   - `http_request` — kimenő HTTP a `safeOutboundFetch` használatával, `guard: "public-only"` beállítással
   - `web_search` — cserélhető keresési szolgáltató gyorsítótárazással (`executeWebSearch`)
   - `eval_code` — Dockerben izolált `node`- vagy `python`-kódfuttatás
   - `execute_command` — Dockerben izolált shellparancs
   - `browser` — Playwright-alapú váz, alapértelmezés szerint letiltva (`builtin/browser.ts`)
2. **SkillsMP** (az OmniRoute piactere) — lekérés a `https://skillsmp.com/api/v1/skills/search` címről. A Settings felületén megadott `skillsmpApiKey` szükséges hozzá.
3. **SkillsSH** (`skills.sh` közösségi katalógus) — lekérés a `https://skills.sh/api/search` címről. Nincs szükség hitelesítésre; a SKILL.md tartalma közvetlenül a GitHubról érkezik.

Egyetlen „aktív szolgáltató” szabályozza, hogy az irányítópult melyik katalógusból telepítsen (`src/lib/skills/providerSettings.ts`). A **Settings → Memory & Skills** alatt váltható. Alapértelmezés: `skillsmp`.

### Skillazonosító

A skillek kulcsa a memóriában tárolt regisztrációs tárban (`src/lib/skills/registry.ts`) a `name@version`. A verziónak szemantikus verziónak kell lennie (`^\d+\.\d+\.\d+$`). A `resolveVersion()` értelmezi a `^`, `~`, `>`, `>=`, `<`, `<=`, `==` és pontos egyezési megszorításokat.

### Skillmód

Minden skill rendelkezik egy futásidejű móddal, amely szabályozza, hogy mikor történjen meg a beillesztése:

| Mód    | Viselkedés                                                                                                                     |
| ------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `on`   | Mindig beillesztésre kerül eszközdefinícióként                                                                                 |
| `off`  | Soha nem kerül beillesztésre, és soha nem hajtható végre                                                                       |
| `auto` | A bejövő kérés alapján pontozódik; csak akkor kerül beillesztésre, ha a pontszám ≥ `AUTO_MIN_SCORE` (alapértelmezés szerint 3) |

A piactérről telepített skillek alapértelmezett módja az `auto`. Az `enabled=true` és `mode="off"` együttesen azt jelenti, hogy „regisztrált, de inaktív” — az `enabled` értékének a régi oszlopon keresztüli átváltása a `mode` értékét is módosítja, hogy a régebbi kódútvonalak konzisztensek maradjanak (`src/app/api/skills/[id]/route.ts`).

### Állapot (végrehajtások)

A skillek végrehajtását a `skill_executions` tábla követi nyomon a következő állapotokkal (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Regisztrációstár-gyorsítótár

A `SkillRegistry` egy singleton, 60 másodperces TTL-gyorsítótárral (`registry.ts:14`). A `loadFromDatabase()` idempotens, és a `pendingLoad` segítségével kiszűri az egyidejű duplikált hívásokat. Minden írás (`register`/`unregister`/`unregisterById`) érvényteleníti a gyorsítótárat. A verziók a `getSkillVersions(name)` használatával kérdezhetők le, a verziómegszorítások pedig a `resolveVersion(name, constraint)` segítségével oldhatók fel.

### Szolgáltatófüggő beillesztés

A `src/lib/skills/injection.ts` fájlban található `injectSkills()` az a belépési pont, amely a regisztrált skilleket szolgáltatóspecifikus eszközdefiníciókká alakítja:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

Az eszköz neve `name@version` formátumban van kódolva, így a kezelő kiválaszthatja a megfelelő verziót, amikor a modell visszahívja.

### AUTO pontozás

Ha `mode="auto"`, minden készségjelölt pontozásra kerül a kérés kontextusa alapján (`scoreAutoSkill()` az `injection.ts` fájlban):

| Jel                                                                    | Pont           |
| ---------------------------------------------------------------------- | -------------- |
| A készség neve szó szerint szerepel a kontextusban                     | +6             |
| Minden, a kontextus egy tokenjével egyező névtoken                     | +2             |
| Minden, a kontextusra illeszkedő címkerészlet                          | +3             |
| Minden, a kontextusra illeszkedő leírástoken                           | +1             |
| A háttérbeli indok egy névtokenre illeszkedik                          | +2 tokenenként |
| A háttérbeli indok egy címkére illeszkedik                             | +2 tokenenként |
| A címkékben lévő szolgáltatói utalás megfelel a kérés szolgáltatójának | +2 / −2        |

A legjobb `AUTO_MAX_SKILLS = 5` készség kerül beillesztésre, amelynek pontszáma `score >= AUTO_MIN_SCORE = 3`. Holtverseny esetén először az `installCount` szerinti csökkenő sorrend, majd a név szerinti ábécésorrend dönt (`injection.ts:225-235`).

### Eszközhívások elfogása

A csevegéskezelő meghívja a `handleToolCallExecution()` függvényt a `src/lib/skills/interception.ts` fájlban, miután a felsőbb szintű szolgáltató eszközhívást tartalmazó választ ad vissza:

1. Az `extractToolCalls()` beolvassa a szolgáltatóspecifikus formátumokat (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Először a beépített eszközálnevek (például `omniroute_web_search` → `web_search`) kerülnek feloldásra. A beépített kezelők közvetlenül futnak.
3. Minden más a `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })` híváson keresztül fut.
4. Az eredmények visszakerülnek a válaszba — a megfelelő formátumban `tool_results`, `function_call_output` elemekként vagy Anthropic `tool_result` blokkokként.

A végrehajtási kontextusban a `customSkillExecutionEnabled` értéke `false`-ra állítható, hogy csak a beépített elfogás legyen engedélyezett (azoknál a kérési útvonalaknál használatos, amelyek kifejezetten letiltják a felhasználó által definiált kezelőket).

---

## Docker-homokozó

A nem beépített kódútvonalak (`eval_code`, `execute_command`) Dockerben futnak a `SandboxRunner` (`src/lib/skills/sandbox.ts`) segítségével. Minden konténer a következő beállításokkal indul:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (amikor readOnly=true)
```

Alapértelmezések (`SandboxRunner.DEFAULT_CONFIG`):

| Mező             | Alapértelmezés  | Megjegyzések                                                          |
| ---------------- | --------------- | --------------------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0,1 CPU) | 1000-rel osztva a `--cpus` paraméternek való átadás előtt             |
| `memoryLimit`    | 256 MB          | Szigorú korlát                                                        |
| `timeout`        | 30000 ms        | Kíméletes leállítás `SIGTERM`, majd `docker kill` segítségével        |
| `networkEnabled` | `false`         | Ebből `--network none` lesz                                           |
| `readOnly`       | `true`          | A gyökérfájlrendszer csak olvasható; a `/tmp` és a `/workspace` tmpfs |

A `SandboxRunner.kill(id)` és a `killAll()` elérhető a leállításhoz; a futó konténereket a `runningContainers: Map<string, ChildProcess>` követi nyomon.

### Homokozó környezeti változói

A `process.env` segítségével konfigurálhatók a `src/lib/skills/builtins.ts` fájlban:

| Környezeti változó                | Alapértelmezés   | Cél                                                                                            |
| --------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB) | Korlát a `file_read` és a `file_write` számára                                                 |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`         | Korlát a `http_request` válaszának törzsére                                                    |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`         | A hívónak visszaadott stdout/stderr korlátja                                                   |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`          | Homokozóban futó parancsok alapértelmezett időkorlátja; legfeljebb 60 s                        |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`          | A kimenő forgalom főkapcsolója. Állítsa `1` vagy `true` értékre a hívásonkénti engedélyezéshez |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (lásd alább)     | Docker-lemezképek vesszővel elválasztott engedélyezési listája                                 |

Alapértelmezetten engedélyezett lemezképek: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. A `SKILLS_ALLOWED_SANDBOX_IMAGES` segítségével megadott kiegészítések egyesülnek az alapértelmezésekkel; a `normalizeImage()` elutasítja az ismeretlen lemezképeket.

> Megjegyzés: nincs külön `SKILLS_EXECUTION_TIMEOUT_MS` környezeti változó. A homokozón kívüli kezelő időkorlátja 30 s értékre van rögzítve a `SkillExecutor` osztályban (`executor.ts:13`), de futásidőben felülírható a `skillExecutor.setTimeout(ms)` segítségével.

### Munkaterület elkülönítése

A `file_read` és a `file_write` minden elérési utat egy API-kulcsonkénti munkaterülethez viszonyítva old fel a `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/` helyen. Az elérésiút-bejárást (`..`) és a tiltott szegmenseket (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) minden lemezművelet előtt elutasítja.

### HTTP-megerősítés

`http_request` (`builtins.ts:257`):

- Engedélyezett metódusok listája: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Letiltott kimenő fejlécek: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Az átirányítások le vannak tiltva (`allowRedirect: false`)
- A `safeOutboundFetch` függvényen keresztül, `guard: "public-only"` beállítással irányítva (a privát/visszacsatolási tartományok blokkolva vannak)
- A válasz a `SKILLS_MAX_HTTP_RESPONSE_BYTES` értékénél csonkolódik; a kliens a `truncated: true` értéket látja

---

## Hibrid végrehajtó (előzetes)

A `src/lib/skills/hybrid.ts` egy `HybridExecutor` típust definiál, amely hívásonként dönt a `direct` (folyamaton belüli) és a `sandbox` végrehajtás között, továbbá időtúllépési vagy memóriahibák esetén `autoUpgrade` alapú újrapróbálkozási útvonalat biztosít. A beépített `directExecutor` / `sandboxRunner` implementációk csonkok (az `executeDirect`, illetve az `executeInSandbox` helyőrző objektumokat ad vissza) — ezt a modult fejlesztés alatt álló szerződésként kell kezelni. A tényleges végrehajtás továbbra is a `skillExecutor` + `SandboxRunner` használatával történik.

---

## Adattárolás

A séma két migrációban található:

- `src/lib/db/migrations/016_create_skills.sql` — az alapvető `skills` és `skill_executions` táblák, `(api_key_id, name)` és `(skill_id, status, created_at)` indexekkel.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — hozzáadja a `mode`, `source_provider`, `tags` (JSON) és `install_count` mezőket a `skills` táblához.

A `skill_executions.status` értékét adatbázisszintű megszorítás korlátozza: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## REST API

Minden végpont a `src/app/api/skills/` alatt található. A kezelési végpontok (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) **kezelői hitelesítést** igényelnek a `requireManagementAuth()` használatával. A piactér/telepítési folyamatok az egyszerűbb `isAuthenticated()` ellenőrzést használják (munkamenet vagy API-kulcs).

| Végpont | Metódus | Cél |
| --------------------------------- | ------- | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Regisztrált képességek listázása. Támogatja: `?q=`, `?mode=on            | off | auto`, `?source=skillsmp | skillssh | local`, lapozás |
| `/api/skills/[id]` | PUT | Az `enabled` vagy a `mode` frissítése |
| `/api/skills/[id]` | DELETE | Regisztráció törlése azonosító alapján |
| `/api/skills/install` | POST | Egyéni képesség telepítése (kezelőkód + séma) |
| `/api/skills/marketplace` | GET | Keresés a SkillsMP katalógusban (ha a `q` üres, népszerű alapértelmezéseket ad vissza) |
| `/api/skills/marketplace/install` | POST | SkillsMP-képesség telepítése (az aktív szolgáltató értéke `skillsmp` kell legyen) |
| `/api/skills/skillssh` | GET | Keresés a skills.sh katalógusban (`?q=&limit=`, legfeljebb 100) |
| `/api/skills/skillssh/install` | POST | skills.sh-képesség telepítése (az aktív szolgáltató értéke `skillssh` kell legyen) |
| `/api/skills/executions` | GET | Lapozott végrehajtási előzmények (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Regisztrált képesség alkalmi végrehajtása |

A `POST /api/skills/executions` végpont HTTP `503` választ ad `{ error: "Skills execution is disabled..." }` törzzsel, ha `settings.skillsEnabled === false` (`executor.ts:42-45`). Az üzemeltetők a **Beállítások → AI** menüpontban kapcsolhatják át a főkapcsolót.

### Példa: egyéni képesség telepítése

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

A `handlerCode` karakterlánc egy **kezelőnév szerinti keresés** — nem végrehajtható kód. A végrehajtó a `skillExecutor.registerHandler(name, fn)` használatával képezi le (`executor.ts:25`). A piactérről történő telepítések dokumentációként ebben a mezőben tárolják a SKILL.md szövegét, a végrehajtást pedig modell által generált eszközhívásokon keresztül irányítják. A felhasználók által tetszőlegesen megadott forráskódot a rendszer nem értékeli ki.

---

## MCP-eszközök

Négy MCP-eszköz burkolja a képességfelületet (`open-sse/mcp-server/tools/skillTools.ts`). Az MCP-kiszolgáló indulásakor automatikusan regisztrálva lesznek.

| Eszköz                        | Leírás                                                                 |
| ----------------------------- | ---------------------------------------------------------------------- |
| `omniroute_skills_list`       | Képességek listázása, opcionális szűrők: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | Képesség engedélyezése/letiltása `skillId` alapján                     |
| `omniroute_skills_execute`    | Képesség végrehajtása bemeneti hasznos adattal                         |
| `omniroute_skills_executions` | Legutóbbi végrehajtások előzményei (alapértelmezés: 50, maximum: 100)  |

Az átviteli beállításokat és a hatókör-hozzárendeléseket lásd az [MCP-SERVER.md](./MCP-SERVER.md) fájlban.

---

## A2A-integráció

A `src/lib/skills/a2a.ts` exportálja a `memory_aware_routing` A2A-képességleírót és egy `registerA2ASkill(registry)` segédfüggvényt. Az egyéni A2A-képességek a `src/lib/a2a/skills/` könyvtárban találhatók, és az `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`) továbbítja őket. A feladat teljes életciklusát lásd az [A2A-SERVER.md](./A2A-SERVER.md) fájlban.

---

## Új beépített képesség hozzáadása

1. **Definiálja a kezelőt** a `src/lib/skills/builtins.ts` fájlban (vagy a `src/lib/skills/builtin/` alatti egyik kapcsolódó fájlban). Szignatúra: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Sandboxolt kódútvonal?** Hívja meg a `sandboxRunner.run(image, command, env, sandboxConfig({...}))` függvényt. Használja a `normalizeImage()` függvényt az engedélyezési lista ellenőrzéséhez.
3. **Fájlrendszerbeli elérési út?** A lemez elérése előtt mindig vezesse át a `resolveWorkspacePath(input, context)` függvényen.
4. **Hálózati hívás?** Használja a `safeOutboundFetch` függvényt a `guard: "public-only"` beállítással; tisztítsa meg a fejléceket a `sanitizeHeaders()` használatával.
5. **Regisztrálja** egy bejegyzés hozzáadásával a `builtinSkills` listához (vagy induláskor egy `registerBrowserSkill(executor)` jellegű függvény meghívásával).
6. **Kösse be a beépített eszközálneveket** (opcionális) a `BUILTIN_TOOL_ALIASES` objektumban (`interception.ts:23`), ha a felsőbb szintű modell eltérő nevet bocsát ki.
7. **Tesztek** a `src/lib/skills/__tests__/` könyvtárban (Vitest).

---

## Egyéni (nem beépített) képesség hozzáadása

1. Regisztrálja a kezelőt a folyamat indulásakor:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Illessze be a képességet a `POST /api/skills/install` végponton keresztül (a `handlerCode` mezőnek meg kell egyeznie a regisztrált kezelő nevével).
3. Állítsa a `mode` értékét `on` vagy `auto` értékre a `PUT /api/skills/[id]` végponton keresztül.

---

## Üzemeltetési tippek

- **Főkapcsoló:** a `settings.skillsEnabled = false` minden végrehajtást blokkol, és HTTP `503` választ ad az `/api/skills/executions` végponton. A regisztrációs adatbázis továbbra is betöltődik.
- **Kimenő forgalom korlátozása:** teljesen izolált sandboxoláshoz hagyja beállítatlanul a `SKILLS_SANDBOX_NETWORK_ENABLED` változót (ez az alapértelmezés). A hívásonkénti `networkEnabled: true` beállításhoz továbbra is szükséges a főkapu engedélyezése.
- **Meghatározott rendszerképek engedélyezése:** az engedélyezési lista kibővítéséhez állítsa be a `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` változót.
- **Végrehajtások naplózása:** a `/dashboard/skills/executions` és az `omniroute_skills_executions` egyaránt a `skill_executions` táblát kérdezi le. A sikeres futások tartalmazzák a `durationMs` mezőt, a sikertelenek pedig az `errorMessage` mezőt.
- **Gyorsítótár érvénytelenítése:** manuális adatbázis-módosítások után hívja meg a `skillRegistry.invalidateCache()` függvényt; ellenkező esetben várjon 60 másodpercet.
- **Névtelen munkaterület:** ha az `apiKeyId` üres, minden hívás ugyanahhoz az `"anonymous"` munkaterülethez lesz leképezve — a megosztást figyelembe vevő kódnak mindig valódi kulcsot kell átadnia.

---

## Végrehajtási életciklus (v3.8.16+)

A `SkillExecutor` (`src/lib/skills/executor.ts`) egy **singleton**, amely minden készségmeghívást kezel. Életciklusának megértése elengedhetetlen az időtúllépések, az újrapróbálkozások és a végrehajtási állapot hibakereséséhez.

### Az ötlépcsős életciklus

```
   execute() meghívva
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← várólistán, még nem indult el (adatbázisrekord létrehozva)
  └──────┬──────┘
         │ kezelő indítása
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← kezelő meghívva időkorláttal
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (nincs más útvonal — a szülőfolyamat leállította)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   Az adatbázisrekord frissítve az állapottal, a kimenettel és a durationMs értékével
```

### Alapértelmezett konfiguráció

| Beállítás    | Alapértelmezés  | Konfigurálható ezzel                 |
| ------------ | --------------- | ------------------------------------ |
| `timeout`    | `30000` (30 mp) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`             | `skillExecutor.setMaxRetries(count)` |

> **Fontos**: A végrehajtó singleton — a `setTimeout()` meghívása globálisan befolyásolja az összes ezt követő meghívást. A készségenkénti időkorlátok jelenleg nem támogatottak; ha készségenként eltérő időkorlátokra van szüksége, indítson külön folyamatokat, vagy készítsen elágazást a végrehajtóból.

### Állapotértékek

A `src/lib/skills/types.ts` fájlból:

```ts
enum SkillStatus {
  PENDING = "pending", // Várólistán, még nem indult el
  RUNNING = "running", // A kezelő meghívva
  SUCCESS = "success", // A kezelő érvényes kimenetet adott vissza
  ERROR = "error", // A kezelő kivételt dobott
  TIMEOUT = "timeout", // Túllépte a végrehajtó időkorlátját
}
```

> **Megjegyzés**: A `TIMEOUT` állapot definiálva van az enumban, de a végrehajtó jelenlegi implementációja **valójában nem írja be az adatbázisba** — az időtúllépések `ERROR` állapotként jelennek meg, a következő üzenettel: `"Skill execution timed out"`. Az állapotérték későbbi használatra van fenntartva.

### Végrehajtások vizsgálata

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Adott végrehajtás lekérése azonosító alapján
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// Egy API-kulcshoz tartozó legutóbbi végrehajtások listázása
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// Végrehajtások teljes számának lekérése
const total = skillExecutor.countExecutions("api-key-id");
```

### Újrapróbálkozási viselkedés

A `maxRetries` beállítás tárolva van, de a végrehajtó `execute()` metódusa **jelenleg nem használja** — csak egyetlen kísérletet hajt végre. A `maxRetries` érték a későbbi implementáció, valamint az azt kiolvasni kívánó hookok számára van elérhetővé téve.

Egyelőre az újrapróbálkozásokat magában a készségkezelőben kell megvalósítani. A beépített
készségek a végrehajtóhoz vannak regisztrálva (például `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` a `src/lib/skills/builtin/` könyvtárban); bármelyik regisztrált kezelő
tartalmazhat saját újrapróbálkozási ciklust:

```ts
// egy készségkezelőn belül
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

## A SkillMode részletesen

A `SkillMode` enum (`src/lib/skills/types.ts`) szabályozza, hogy a készségek **mikor és hogyan** kerülnek meghívásra:

```ts
enum SkillMode {
  AUTO = "auto", // Az LLM dönti el, mikor hívja meg a készséget
  MANUAL = "manual", // Csak kifejezett felhasználói kérésre kerül meghívásra
  HYBRID = "hybrid", // AUTO-pontozás + manuális felülbírálás
}
```

> **Megjegyzés**: A kódbázis definiálja a `SkillMode` (AUTO/MANUAL/HYBRID) típust, míg a `Skill.mode` mező más formátumot használ (`"on" | "off" | "auto"`). Kapcsolódnak egymáshoz, de nem azonosak — a `SkillMode` a végrehajtási házirendet határozza meg, míg a `Skill.mode` az egyes készségek engedélyezését szabályozza.

### Mikor melyik módot érdemes használni

| Mód      | Az LLM viselkedése                                                                | Felhasználási eset                                   |
| -------- | --------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `AUTO`   | Az LLM meghívhatja a készséget, amikor szükségesnek ítéli                         | Általános célú készségek (fájlolvasás, HTTP-kérések) |
| `MANUAL` | Az LLM nem hívhatja meg a készséget; csak explicit `executeSkill` API-hívás teszi | Érzékeny műveletek (adatbázis-írások, fizetések)     |
| `HYBRID` | Az LLM javasolhatja a készséget; a felhasználónak meg kell erősítenie             | Mellékhatásokkal járó, de nem veszélyes készségek    |

### AUTO-pontozás

Amikor az `AUTO` mód aktív, a rendszer minden szóba jöhető készséget pontoz a kérés
kontextusa alapján a `src/lib/skills/injection.ts` fájlban található
`scoreAutoSkill()` segítségével — ez egy additív, egész számú pontrendszer
(készségnév-egyezés, a név/címkék/leírás tokenjeinek átfedése, háttérindoklási
utalások, szolgáltatói utalás bónusza/büntetése). A legjobb
`AUTO_MAX_SKILLS = 5`, `score >= AUTO_MIN_SCORE = 3` feltételnek megfelelő készség
hívható eszközként kerül beillesztésre; pontegyenlőség esetén az `installCount`,
majd a név dönt. A teljes ponttáblázatot lásd a dokumentum korábbi
[**Eszközséma generálása → AUTO-pontozás**](#auto-scoring) szakaszában; nincs lebegőpontos,
`0.6` jellegű küszöbérték, és a `registry.ts` sem végez pontozást.

---

## Beépített készségek katalógusa

Az OmniRoute válogatott beépített készségeket tartalmaz a `src/lib/skills/builtin/` könyvtárban. A leggyakoribbak:

### Böngészőautomatizálási készség

A böngészőkészség (`src/lib/skills/builtin/browser.ts`) fej nélküli böngészőautomatizálást biztosít Playwright/Puppeteer használatával. **Meg van valósítva, de nem része az alapértelmezett készségkatalógusnak** — a használatához külön telepítse a böngészőbővítmény beépülő modulját.

```ts
// Engedélyezze a konfigurációban
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Mindig explicit meghívást igényeljen
  allowedSkills: ["browser"],
  timeout: 60000, // 60 másodperc az oldalbetöltésekhez
  maxRetries: 1,
};
```

### További beépített kategóriák

| Kategória   | Készségek                                     | Mód    |
| ----------- | --------------------------------------------- | ------ |
| Fájl I/O    | `file_read`, `file_write`                     | AUTO   |
| HTTP        | `http_request`                                | AUTO   |
| Keresés     | `web_search`                                  | AUTO   |
| Kódfuttatás | `eval_code` (elkülönített JavaScript/Python)  | HYBRID |
| Rendszer    | `execute_command` (elkülönített CLI-futtatás) | MANUAL |

### Egyéni készség hozzáadása

Az egyéni készségek beépülőmodul-rendszeren keresztüli hozzáadásáról lásd a [Beépülőmodul-SDK és készségintegráció](./PLUGIN_SDK.md) című dokumentumot.

---

## Lásd még

- [MCP-SERVER.md](./MCP-SERVER.md) — MCP-eszközök regisztrációja és átviteli módjai
- [A2A-SERVER.md](./A2A-SERVER.md) — az A2A-feladatok életciklusa és a készségek továbbítása
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — felhasználóknak szóló bevezetés
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — kérésfeldolgozási folyamat és komponens­térkép
- Forrás: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Tesztek: `src/lib/skills/__tests__/integration.test.ts`
