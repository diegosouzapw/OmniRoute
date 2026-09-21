# Skills Framework (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Patiesības avots:** `src/lib/skills/` un `src/app/api/skills/`
> **Pēdējoreiz atjaunināts:** 2026-06-28 — v3.8.40

OmniRoute nodrošina paplašināmu prasmju ietvaru, kas ļauj valodu modeļiem (un operatoriem) kombinēt atkārtoti izmantojamas iespējas — no failu sistēmas lasīšanas un HTTP pieprasījumiem līdz izolētai koda izpildei un rūpīgi atlasītām prasmēm no tirgus.

Prasme ir versēta, ar shēmu definēta darba vienība. OmniRoute var ievietot prasmes kā rīku definīcijas izejošajos pieprasījumos, pārtvert no modeļa saņemtos rīku izsaukumus, palaist atbilstošo apstrādātāju un nodot rezultātu atpakaļ modelim, lai saruna varētu turpināties. Modelis nekad neredz realizāciju — tikai rīka saskarni.

---

## Aģentu prasmes un Omni prasmes

OmniRoute ir divas atšķirīgas, taču savstarpēji papildinošas prasmju sistēmas:

| Aspekts          | **Omni prasmes** (šis dokuments)                                                | **Aģentu prasmes**                                                                         |
| :--------------- | :------------------------------------------------------------------------------ | :----------------------------------------------------------------------------------------- |
| Mērķis           | LLM rīku ievietošana un izolēta izpilde                                         | SKILL.md katalogs, ko ārējie aģenti var atklāt un izmantot                                 |
| Patiesības avots | `src/lib/skills/` + tirgus                                                      | `src/lib/agentSkills/` + direktorijs `skills/`                                             |
| Izpildes režīms  | Tiek ievietotas izejošajos pieprasījumos un izpildītas rīku izsaukumu notikumos | Statisks Markdown katalogs + REST/MCP/A2A atklāšanas galapunkti                            |
| Kas to izmanto   | Pats OmniRoute (kombinētā maršrutēšana, ienākošie LLM izsaukumi)                | Ārējie aģenti, MCP klienti, A2A orķestratori                                               |
| Skaits           | Mainīgs (atkarīgs no tirgus)                                                    | 45 kataloga ieraksti (23 API + 21 CLI + 1 konfigurācija)                                   |
| Formāts          | `SkillDefinition` ar rīka shēmu un apstrādātāju                                 | `SKILL.md` priekšdaļa + Markdown pamatteksts                                               |
| Atklāšana        | `/api/skills/*` REST + `omniroute_skills_*` MCP rīki                            | `/api/agent-skills/*` REST + `omniroute_agent_skills_*` MCP rīki + A2A `list-capabilities` |

**Omni prasmes** ir izpildes dzinējs — tās nosaka, ko OmniRoute _spēj paveikt_, kad LLM izsauc rīku.

**Aģentu prasmes** ir dokumentācijas katalogs — tās izskaidro ārējiem aģentiem, _kā izmantot_ OmniRoute REST API un CLI, nodrošinot strukturētus SKILL.md failus, kurus var tieši ievietot aģentu uzvednēs.

Informāciju par aģentu prasmju katalogu, ģeneratoru, MCP rīkiem un A2A prasmi skatiet [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## Jēdzieni

### Prasmju avoti

Vienā reģistrā līdzās pastāv trīs prasmju avoti:

1. **Iebūvētās prasmes** (`src/lib/skills/builtins.ts`) — tiek piegādātas kopā ar OmniRoute. Aptver izplatītākos lietojuma gadījumus:
   - `file_read`, `file_write` — katrai API atslēgai paredzēta izolēta darbvieta ceļā `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — izejošs HTTP, izmantojot `safeOutboundFetch` ar `guard: "public-only"`
   - `web_search` — nomaināms meklēšanas nodrošinātājs ar kešatmiņu (`executeWebSearch`)
   - `eval_code` — Docker izolētā vidē izpildāms `node` vai `python` kods
   - `execute_command` — Docker izolētā vidē izpildāma čaulas komanda
   - `browser` — uz Playwright balstīta sagatave, pēc noklusējuma atspējota (`builtin/browser.ts`)
2. **SkillsMP** (OmniRoute tirgus) — tiek izgūtas no `https://skillsmp.com/api/v1/skills/search`. Iestatījumos nepieciešama `skillsmpApiKey`.
3. **SkillsSH** (`skills.sh` kopienas katalogs) — tiek izgūtas no `https://skills.sh/api/search`. Autentifikācija nav nepieciešama; SKILL.md saturs tiek iegūts no GitHub neapstrādātā satura.

Viens „aktīvais nodrošinātājs” nosaka, no kura kataloga informācijas panelis instalē prasmes (`src/lib/skills/providerSettings.ts`). Mainiet to sadaļā **Iestatījumi → Atmiņa un prasmes**. Noklusējums: `skillsmp`.

### Prasmes identitāte

Prasmes atmiņā glabātajā reģistrā (`src/lib/skills/registry.ts`) tiek identificētas pēc `name@version`. Versijai jāatbilst semantiskās versēšanas formātam (`^\d+\.\d+\.\d+$`). `resolveVersion()` atpazīst `^`, `~`, `>`, `>=`, `<`, `<=`, `==` un precīzas atbilstības ierobežojumus.

### Prasmes režīms

Katrai prasmei ir izpildes režīms, kas nosaka, kad tā tiek ievietota:

| Režīms | Darbība                                                                                                                     |
| ------ | --------------------------------------------------------------------------------------------------------------------------- |
| `on`   | Vienmēr tiek ievietota kā rīka definīcija                                                                                   |
| `off`  | Nekad netiek ievietota un nekad nav izpildāma                                                                               |
| `auto` | Tiek novērtēta attiecībā pret ienākošo pieprasījumu; ievietota tikai tad, ja vērtējums ≥ `AUTO_MIN_SCORE` (noklusējums — 3) |

`auto` ir noklusējuma režīms no tirgus instalētām prasmēm. `enabled=true` kopā ar `mode="off"` nozīmē „reģistrēta, bet neaktīva” — pārslēdzot `enabled`, izmantojot mantoto kolonnu, tiek atbilstoši mainīts arī `mode`, lai vecākie koda ceļi saglabātu saskaņotu darbību (`src/app/api/skills/[id]/route.ts`).

### Statuss (izpildes)

Prasmju izpildes tiek uzskaitītas tabulā `skill_executions` ar tālāk norādītajiem statusiem (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Reģistra kešatmiņa

`SkillRegistry` ir vienobjekts ar 60 sekunžu TTL kešatmiņu (`registry.ts:14`). `loadFromDatabase()` ir idempotenta un novērš vienlaicīgu izsaukumu dublēšanos, izmantojot `pendingLoad`. Jebkura rakstīšanas darbība (`register`/`unregister`/`unregisterById`) padara kešatmiņu nederīgu. Versiju meklēšanai izmantojiet `getSkillVersions(name)` un `resolveVersion(name, constraint)`.

### Nodrošinātājam pielāgota ievietošana

`injectSkills()` failā `src/lib/skills/injection.ts` ir ieejas punkts, kas pārveido reģistrētās prasmes nodrošinātājam specifiskās rīku definīcijās:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

Rīka nosaukums tiek kodēts kā `name@version`, lai apstrādātājs varētu izvēlēties pareizo versiju, kad modelis to izsauc.

### AUTO vērtēšana

Ja `mode="auto"`, katra kandidātprasme tiek novērtēta atbilstoši pieprasījuma kontekstam (`scoreAutoSkill()` failā `injection.ts`):

| Signāls                                                                        | Punkti        |
| ------------------------------------------------------------------------------ | ------------- |
| Prasmes nosaukums kontekstā parādās precīzi                                    | +6            |
| Katrs nosaukuma tokens atbilst konteksta tokenam                               | +2            |
| Katra taga apakšvirkne atbilst kontekstam                                      | +3            |
| Katrs apraksta tokens atbilst kontekstam                                       | +1            |
| Fona iemesls atbilst nosaukuma tokenam                                         | +2 par tokenu |
| Fona iemesls atbilst tagam                                                     | +2 par tokenu |
| Pakalpojumu sniedzēja norāde tagos atbilst pieprasījuma pakalpojumu sniedzējam | +2 / −2       |

Tiek ievietotas ne vairāk kā `AUTO_MAX_SKILLS = 5` prasmes, kuru `score >= AUTO_MIN_SCORE = 3`. Vienāda rezultāta gadījumā tās vispirms tiek sakārtotas pēc `installCount` (dilstoši), pēc tam pēc nosaukuma alfabētiskā secībā (`injection.ts:225-235`).

### Rīku izsaukumu pārtveršana

Tērzēšanas apstrādātājs izsauc `handleToolCallExecution()` failā `src/lib/skills/interception.ts` pēc tam, kad ārējais pakalpojums atgriež atbildi ar rīka izsaukumu:

1. `extractToolCalls()` nolasa pakalpojumu sniedzējam specifiskās struktūras (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Vispirms tiek atrisināti iebūvēto rīku aizstājvārdi (piem., `omniroute_web_search` → `web_search`). Iebūvētie apstrādātāji tiek izpildīti turpat.
3. Viss pārējais tiek novirzīts caur `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`.
4. Rezultāti tiek ievietoti atpakaļ atbildē — attiecīgi kā `tool_results`, `function_call_output` vienumi vai Anthropic `tool_result` bloki.

`customSkillExecutionEnabled` izpildes kontekstā var iestatīt uz `false`, lai atļautu tikai iebūvēto rīku pārtveršanu (to izmanto pieprasījumu ceļi, kas nepārprotami atspējo lietotāja definētos apstrādātājus).

---

## Docker smilškaste

Neiebūvētie koda ceļi (`eval_code`, `execute_command`) tiek izpildīti Docker vidē, izmantojot `SandboxRunner` (`src/lib/skills/sandbox.ts`). Katrs konteiners tiek palaists ar:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (ja readOnly=true)
```

Noklusējuma vērtības (`SandboxRunner.DEFAULT_CONFIG`):

| Lauks            | Noklusējuma vērtība | Piezīmes                                                   |
| ---------------- | ------------------- | ---------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU)     | Pirms nodošanas parametram `--cpus` tiek dalīts ar 1000    |
| `memoryLimit`    | 256 MB              | Stingrais ierobežojums                                     |
| `timeout`        | 30000 ms            | Saudzīga apturēšana, izmantojot `SIGTERM` + `docker kill`  |
| `networkEnabled` | `false`             | Tiek pārveidots par `--network none`                       |
| `readOnly`       | `true`              | Saknes FS ir tikai lasāma; `/tmp` un `/workspace` ir tmpfs |

`SandboxRunner.kill(id)` un `killAll()` ir pieejamas darbības izbeigšanai; darbojošies konteineri tiek uzskaitīti `runningContainers: Map<string, ChildProcess>`.

### Smilškastes vides mainīgie

Konfigurēti, izmantojot `process.env` failā `src/lib/skills/builtins.ts`:

| Vides mainīgais                   | Noklusējuma vērtība | Nolūks                                                                                              |
| --------------------------------- | ------------------- | --------------------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB)    | Ierobežojums funkcijām `file_read` un `file_write`                                                  |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`            | Funkcijas `http_request` atbildes pamatdaļas ierobežojums                                           |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`            | Izsaucējam atgrieztā stdout/stderr ierobežojums                                                     |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`             | Noklusējuma noildze smilškastē izpildītām komandām; ne vairāk par 60 s                              |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`             | Galvenais izejošās datplūsmas slēdzis. Iestatiet `1` vai `true`, lai atļautu izvēli katrā izsaukumā |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (skatiet tālāk)     | Ar komatiem atdalīts atļauto Docker attēlu saraksts                                                 |

Pēc noklusējuma atļautie attēli: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. Visi papildinājumi, kas norādīti, izmantojot `SKILLS_ALLOWED_SANDBOX_IMAGES`, tiek apvienoti ar noklusējuma vērtībām; funkcija `normalizeImage()` noraida nezināmus attēlus.

> Piezīme: nav atsevišķa vides mainīgā `SKILLS_EXECUTION_TIMEOUT_MS`. Ārpus smilškastes esošā apstrādātāja noildze klasē `SkillExecutor` (`executor.ts:13`) ir stingri iestatīta uz 30 s, taču izpildlaikā to var mainīt, izmantojot `skillExecutor.setTimeout(ms)`.

### Darbvietas izolācija

`file_read` un `file_write` atrisina katru ceļu attiecībā pret katrai API atslēgai paredzētu darbvietu atrašanās vietā `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`. Ceļu šķērsošana (`..`) un aizliegtie segmenti (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) tiek noraidīti pirms jebkādām diska ievadizvades darbībām.

### HTTP pastiprinātā aizsardzība

`http_request` (`builtins.ts:257`):

- Atļauto metožu saraksts: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Bloķētās izejošās galvenes: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Pāradresācija ir atspējota (`allowRedirect: false`)
- Tiek maršrutēts caur `safeOutboundFetch` ar `guard: "public-only"` (privātie/atgriezeniskās cilpas diapazoni ir bloķēti)
- Atbilde tiek saīsināta pie `SKILLS_MAX_HTTP_RESPONSE_BYTES`; klients redz `truncated: true`

---

## Hibrīdais izpildītājs (priekšskatījums)

`src/lib/skills/hybrid.ts` definē `HybridExecutor`, kas katram izsaukumam izvēlas starp `direct` (procesa ietvaros) un `sandbox` izpildi, ar `autoUpgrade` atkārtota mēģinājuma ceļu taimauta vai atmiņas kļūdu gadījumā. Iebūvētās `directExecutor` / `sandboxRunner` implementācijas ir aizstājēji (`executeDirect`, `executeInSandbox` atgriež aizstājējobjektus) — uzskatiet šo moduli par izstrādes stadijā esošu līgumu. Reālā izpilde joprojām notiek, izmantojot `skillExecutor` + `SandboxRunner`.

---

## Krātuve

Shēma atrodas divās migrācijās:

- `src/lib/db/migrations/016_create_skills.sql` — pamata tabulas `skills` un `skill_executions` ar indeksiem laukiem `(api_key_id, name)` un `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — tabulai `skills` pievieno `mode`, `source_provider`, `tags` (JSON), `install_count`.

`skill_executions.status` ir ierobežots datubāzes līmenī: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## REST API

Visi galapunkti atrodas zem `src/app/api/skills/`. Pārvaldības galapunktiem (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) ir nepieciešama **pārvaldības autentifikācija**, izmantojot `requireManagementAuth()`. Tirgus/instalēšanas plūsmas izmanto vienkāršāko `isAuthenticated()` (sesija vai API atslēga).

| Galapunkts | Metode | Mērķis |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Reģistrēto prasmju saraksts. Atbalsta `?q=`, `?mode=on                   | off | auto`, `?source=skillsmp | skillssh | local`, lapošanu |
| `/api/skills/[id]` | PUT | Atjaunina `enabled` vai `mode` |
| `/api/skills/[id]` | DELETE | Atceļ reģistrāciju pēc ID |
| `/api/skills/install` | POST | Instalē pielāgotu prasmi (apstrādātāja kods + shēma) |
| `/api/skills/marketplace` | GET | Meklē SkillsMP katalogā (atgriež populāros noklusējumus, ja `q` ir tukšs) |
| `/api/skills/marketplace/install` | POST | Instalē SkillsMP prasmi (aktīvajam nodrošinātājam jābūt `skillsmp`) |
| `/api/skills/skillssh` | GET | Meklē skills.sh katalogā (`?q=&limit=`, nepārsniedzot 100) |
| `/api/skills/skillssh/install` | POST | Instalē skills.sh prasmi (aktīvajam nodrošinātājam jābūt `skillssh`) |
| `/api/skills/executions` | GET | Lapota izpildes vēsture (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Pēc pieprasījuma izpilda reģistrētu prasmi |

Galapunkts `POST /api/skills/executions` atgriež HTTP `503` ar `{ error: "Skills execution is disabled..." }`, ja `settings.skillsEnabled === false` (`executor.ts:42-45`). Operatori var pārslēgt galveno slēdzi sadaļā **Iestatījumi → MI**.

### Piemērs: pielāgotas prasmes instalēšana

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

Virkne `handlerCode` ir **apstrādātāja nosaukuma uzmeklēšana**, nevis izpildāms kods. Izpildītājs to kartē, izmantojot `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`). Tirgus instalācijas šajā laukā glabā SKILL.md tekstu kā dokumentāciju un novirza izpildi caur modeļa ģenerētiem rīku izsaukumiem. Patvaļīgs lietotāja nodrošināts pirmkods netiek izpildīts ar `eval`.

---

## MCP rīki

Četri MCP rīki aptver prasmju saskarni (`open-sse/mcp-server/tools/skillTools.ts`). Tie tiek automātiski reģistrēti, kad tiek palaists MCP serveris.

| Rīks                          | Apraksts                                                                 |
| ----------------------------- | ------------------------------------------------------------------------ |
| `omniroute_skills_list`       | Uzskaita prasmes; neobligātie filtri: `apiKeyId`, `name`, `enabled`      |
| `omniroute_skills_enable`     | Iespējo/atspējo prasmi pēc `skillId`                                     |
| `omniroute_skills_execute`    | Izpilda prasmi ar ievades derīgo slodzi                                  |
| `omniroute_skills_executions` | Jaunākā izpildes vēsture (pēc noklusējuma 50, ne vairāk kā 100 ierakstu) |

Transporta iestatīšanu un tvērumu piešķiršanu skatiet failā [MCP-SERVER.md](./MCP-SERVER.md).

---

## A2A integrācija

`src/lib/skills/a2a.ts` eksportē A2A prasmes `memory_aware_routing` deskriptoru un palīgfunkciju `registerA2ASkill(registry)`. Pielāgotās A2A prasmes atrodas direktorijā `src/lib/a2a/skills/`, un tās tiek novirzītas, izmantojot `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`). Pilnu uzdevuma dzīves cikla aprakstu skatiet failā [A2A-SERVER.md](./A2A-SERVER.md).

---

## Jaunas iebūvētās prasmes pievienošana

1. **Definējiet apdarinātāju** failā `src/lib/skills/builtins.ts` (vai citā failā direktorijā `src/lib/skills/builtin/`). Signatūra: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Vai nepieciešama izolēta koda izpilde?** Izsauciet `sandboxRunner.run(image, command, env, sandboxConfig({...}))`. Izmantojiet `normalizeImage()`, lai pārbaudītu atbilstību atļauto attēlu sarakstam.
3. **Vai nepieciešams failu sistēmas ceļš?** Pirms piekļuves diskam vienmēr apstrādājiet to ar `resolveWorkspacePath(input, context)`.
4. **Vai nepieciešams tīkla izsaukums?** Izmantojiet `safeOutboundFetch` ar `guard: "public-only"`; attīriet galvenes, izmantojot `sanitizeHeaders()`.
5. **Reģistrējiet**, pievienojot ierakstu `builtinSkills` (vai palaišanas laikā izsaucot `registerBrowserSkill(executor)` tipa funkciju).
6. **Piesaistiet iebūvēto rīku aizstājvārdus** (neobligāti) sadaļā `BUILTIN_TOOL_ALIASES` (`interception.ts:23`), ja augšupējais modelis ģenerē citu nosaukumu.
7. **Testi** direktorijā `src/lib/skills/__tests__/` (Vitest).

---

## Pielāgotas (neiebūvētas) prasmes pievienošana

1. Reģistrējiet apdarinātāju procesa palaišanas laikā:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Pievienojiet prasmi, izmantojot `POST /api/skills/install` (laukam `handlerCode` jāatbilst reģistrētā apdarinātāja nosaukumam).
3. Pārslēdziet `mode` uz `on` vai `auto`, izmantojot `PUT /api/skills/[id]`.

---

## Ekspluatācijas padomi

- **Galvenais slēdzis:** `settings.skillsEnabled = false` bloķē visu izpildi un ceļā `/api/skills/executions` atgriež HTTP `503`. Reģistrs turpina ielādi.
- **Ierobežojiet izejošo tīkla piekļuvi:** pilnībā no tīkla izolētai smilškastes izpildei atstājiet `SKILLS_SANDBOX_NETWORK_ENABLED` neiestatītu (noklusējums). Katra izsaukuma `networkEnabled: true` iestatījumam joprojām ir nepieciešams galvenās vadīklas apstiprinājums.
- **Atļaujiet konkrētus attēlus:** iestatiet `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"`, lai paplašinātu atļauto attēlu sarakstu.
- **Auditējiet izpildes:** gan `/dashboard/skills/executions`, gan `omniroute_skills_executions` veic vaicājumus tabulā `skill_executions`. Veiksmīgi izpildes gadījumi ietver `durationMs`, bet neveiksmīgi — `errorMessage`.
- **Kešatmiņas nederīguma iestatīšana:** pēc manuālām datubāzes izmaiņām izsauciet `skillRegistry.invalidateCache()`; pretējā gadījumā uzgaidiet 60 s.
- **Anonīma darbvieta:** ja `apiKeyId` ir tukšs, visi izsaukumi tiek jaukti vienā un tajā pašā `"anonymous"` darbvietā — kodam, kurā ņemta vērā koplietošana, vienmēr jānodod īsta atslēga.

---

## Izpildes dzīves cikls (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) ir **vienobjekta instance**, kas pārvalda katru prasmes izsaukumu. Tā dzīves cikla izpratne ir būtiska taimautu, atkārtotu mēģinājumu un izpildes stāvokļa atkļūdošanai.

### 5 posmu dzīves cikls

```
   izsaukts execute()
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← ievietots rindā, vēl nav sākts (izveidota DB rinda)
  └──────┬──────┘
         │ sākt apstrādātāju
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← apstrādātājs izsaukts ar taimautu
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (cita ceļa nav — pārtrauca vecākprocess)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   DB rinda atjaunināta ar statusu, izvadi, durationMs
```

### Noklusējuma konfigurācija

| Iestatījums  | Noklusējums    | Konfigurējams, izmantojot            |
| ------------ | -------------- | ------------------------------------ |
| `timeout`    | `30000` (30 s) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`            | `skillExecutor.setMaxRetries(count)` |

> **Svarīgi**: Izpildītājs ir vienobjekta instance — `setTimeout()` izsaukšana globāli ietekmē visus turpmākos izsaukumus. Katras prasmes individuāli taimauti pašlaik netiek atbalstīti; ja dažādām prasmēm nepieciešami atšķirīgi taimauti, palaidiet atsevišķus procesus vai izveidojiet izpildītāja atzarojumu.

### Statusa vērtības

No `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // Ievietots rindā, vēl nav sākts
  RUNNING = "running", // Apstrādātājs izsaukts
  SUCCESS = "success", // Apstrādātājs atgrieza derīgu izvadi
  ERROR = "error", // Apstrādātājs izraisīja izņēmumu
  TIMEOUT = "timeout", // Pārsniegts izpildītāja taimauts
}
```

> **Piezīme**: Statuss `TIMEOUT` ir definēts uzskaitījumā, taču pašreizējā izpildītāja implementācija to **faktiski neieraksta DB** — taimauti tiek parādīti kā `ERROR` ar ziņojumu `"Skill execution timed out"`. Statusa uzskaitījums ir rezervēts turpmākai izmantošanai.

### Izpilžu pārbaude

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Iegūt konkrētu izpildi pēc ID
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// Uzskaitīt API atslēgas nesenās izpildes
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// Saskaitīt visas izpildes
const total = skillExecutor.countExecutions("api-key-id");
```

### Atkārtotu mēģinājumu darbība

Iestatījums `maxRetries` tiek glabāts, taču izpildītāja metode `execute()` to **pašlaik neizmanto** — tā veic tikai vienu mēģinājumu. Vērtība `maxRetries` ir pieejama turpmākai implementācijai un āķiem, kuri vēlas to nolasīt.

Pašlaik atkārtoti mēģinājumi jāimplementē pašā prasmes apstrādātājā. Iebūvētās
prasmes tiek reģistrētas izpildītājā (piem., `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` direktorijā `src/lib/skills/builtin/`); jebkurš reģistrētais apstrādātājs
var ietvert savu atkārtotu mēģinājumu ciklu:

```ts
// prasmes apstrādātājā
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

## Detalizēts SkillMode apraksts

`SkillMode` uzskaitījums (`src/lib/skills/types.ts`) nosaka, **kad un kā** tiek izsauktas prasmes:

```ts
enum SkillMode {
  AUTO = "auto", // LLM izlemj, kad izsaukt prasmi
  MANUAL = "manual", // Tiek izsaukta tikai pēc skaidra lietotāja pieprasījuma
  HYBRID = "hybrid", // AUTO vērtēšana + manuāla ignorēšana
}
```

> **Piezīme**: Koda bāzē ir definēts `SkillMode` (AUTO/MANUAL/HYBRID), savukārt laukam `Skill.mode` tiek izmantota cita forma (`"on" | "off" | "auto"`). Tie ir saistīti, bet nav identiski — `SkillMode` ir paredzēts izpildītāja politikai, bet `Skill.mode` — katras prasmes iespējošanai.

### Kad izmantot katru režīmu

| Režīms   | LLM darbība                                                                  | Lietošanas gadījums                                             |
| -------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------- |
| `AUTO`   | LLM var izsaukt prasmi, kad uzskata to par nepieciešamu                      | Vispārēja lietojuma prasmes (failu lasīšana, HTTP pieprasījumi) |
| `MANUAL` | LLM nevar izsaukt prasmi; to izsauc tikai tiešs `executeSkill` API izsaukums | Sensitīvas darbības (rakstīšana datubāzē, maksājumi)            |
| `HYBRID` | LLM var ieteikt prasmi; lietotājam tā ir jāapstiprina                        | Prasmes, kurām ir blakusefekti, bet kuras nav bīstamas          |

### AUTO vērtēšana

Kad ir aktīvs režīms `AUTO`, katra kandidātprasme tiek novērtēta attiecībā pret pieprasījuma
kontekstu, izmantojot `scoreAutoSkill()` failā `src/lib/skills/injection.ts` — tā ir aditīva
veselu skaitļu punktu sistēma (prasmes nosaukuma atbilstība, nosaukuma/birku/apraksta pilnvaru pārklāšanās,
fona iemesla norādes, nodrošinātāja norādes bonuss/sods). Piecas visaugstāk novērtētās
`AUTO_MAX_SKILLS = 5` prasmes ar `score >= AUTO_MIN_SCORE = 3` tiek ievadītas kā
izsaucami rīki; vienāda rezultāta gadījumā secību nosaka pēc `installCount`, pēc tam — pēc nosaukuma. Pilno punktu tabulu
skatiet iepriekš šajā dokumentā sadaļā [**Rīku shēmas ģenerēšana → AUTO vērtēšana**](#auto-scoring);
nav decimālskaitļa `0.6` veida sliekšņa, un failā `registry.ts` netiek veikta vērtēšana.

---

## Iebūvēto prasmju katalogs

OmniRoute tiek piegādāts ar atlasītu iebūvēto prasmju kopu direktorijā `src/lib/skills/builtin/`. Visbiežāk izmantotās:

### Pārlūkprogrammas automatizācijas prasme

Pārlūkprogrammas prasme (`src/lib/skills/builtin/browser.ts`) nodrošina pārlūkprogrammas automatizāciju bez grafiskās saskarnes, izmantojot Playwright/Puppeteer. **Tā ir implementēta, taču nav iekļauta noklusējuma prasmju katalogā** — lai to izmantotu, atsevišķi instalējiet pārlūkprogrammas paplašinājuma spraudni.

```ts
// Iespējojiet savā konfigurācijā
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Vienmēr pieprasīt tiešu izsaukšanu
  allowedSkills: ["browser"],
  timeout: 60000, // 60 s lapu ielādei
  maxRetries: 1,
};
```

### Citas iebūvētās kategorijas

| Kategorija   | Prasmes                                 | Režīms |
| ------------ | --------------------------------------- | ------ |
| Failu I/O    | `file_read`, `file_write`               | AUTO   |
| HTTP         | `http_request`                          | AUTO   |
| Meklēšana    | `web_search`                            | AUTO   |
| Koda izpilde | `eval_code` (izolēts JavaScript/Python) | HYBRID |
| Sistēma      | `execute_command` (izolēta CLI izpilde) | MANUAL |

### Pielāgotas prasmes pievienošana

Informāciju par pielāgotas prasmes pievienošanu, izmantojot spraudņu sistēmu, skatiet sadaļā [Spraudņu SDK un prasmju integrācija](./PLUGIN_SDK.md).

---

## Skatiet arī

- [MCP-SERVER.md](./MCP-SERVER.md) — MCP rīku reģistrācija un transporti
- [A2A-SERVER.md](./A2A-SERVER.md) — A2A uzdevumu dzīves cikls un prasmju maršrutēšana
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — lietotājiem paredzēts ievads
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — pieprasījumu apstrādes konveijers un komponentu karte
- Avots: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Testi: `src/lib/skills/__tests__/integration.test.ts`
