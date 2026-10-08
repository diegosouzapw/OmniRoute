# Skills Framework (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Tõeallikas:** `src/lib/skills/` ja `src/app/api/skills/`
> **Viimati uuendatud:** 2026-06-28 — v3.8.40

OmniRoute pakub laiendatavat oskuste raamistikku, mis võimaldab keelemudelitel (ja operaatoritel) kombineerida korduskasutatavaid võimekusi — alates failisüsteemist lugemisest ja HTTP-päringutest kuni liivakastis koodi käitamise ning kureeritud turuplatsi oskusteni.

Oskus on versioonitud ja skeemiga määratletud tööüksus. OmniRoute saab lisada oskused tööriistade definitsioonidena väljaminevatesse päringutesse, püüda kinni mudelilt naasvad tööriistakutsed, käitada sobivat töötlejat ning edastada tulemuse mudelile tagasi, et vestlus saaks jätkuda. Mudel ei näe kunagi teostust — ainult tööriista liidest.

---

## Agendioskused vs Omni oskused

OmniRoute'il on kaks erinevat, kuid teineteist täiendavat oskuste süsteemi:

| Mõõde            | **Omni oskused** (see dokument)                                                     | **Agendioskused**                                                                                |
| :--------------- | :---------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------- |
| Eesmärk          | LLM-i tööriistade lisamine + liivakastis käitamine                                  | SKILL.md kataloog välistele agentidele avastamiseks ja kasutamiseks                              |
| Tõeallikas       | `src/lib/skills/` + turuplats                                                       | `src/lib/agentSkills/` + kataloog `skills/`                                                      |
| Käitusrežiim     | Lisatakse väljaminevatesse päringutesse, käitatakse tööriistakutse sündmuste korral | Staatiline markdown-kataloog + REST/MCP/A2A avastuslõpp-punktid                                  |
| Kes seda kasutab | OmniRoute ise (kombineeritud marsruutimine, sissetulevad LLM-kutsed)                | Välised agendid, MCP-kliendid, A2A-orkestreerijad                                                |
| Arv              | Muutuv (turuplatsi juhitud)                                                         | 45 kataloogikirjet (23 API + 21 CLI + 1 konfiguratsioon)                                         |
| Vorming          | `SkillDefinition` koos tööriista skeemi + töötlejaga                                | `SKILL.md` frontmatter + markdown-keha                                                           |
| Avastamine       | `/api/skills/*` REST + `omniroute_skills_*` MCP-tööriistad                          | `/api/agent-skills/*` REST + `omniroute_agent_skills_*` MCP-tööriistad + A2A `list-capabilities` |

**Omni oskused** moodustavad käitusmootori — need määratlevad, mida OmniRoute _saab teha_, kui LLM kutsub välja tööriista.

**Agendioskused** moodustavad dokumentatsioonikataloogi — need selgitavad välistele agentidele, _kuidas kasutada_ OmniRoute'i REST API-t ja CLI-d, kasutades struktureeritud SKILL.md-faile, mida saab lisada otse agendi viipadesse.

Agendioskuste kataloogi, generaatori, MCP-tööriistade ja A2A-oskuse kohta vaadake [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## Mõisted

### Oskuste allikad

Samas registris eksisteerib kõrvuti kolm oskuste allikat:

1. **Sisseehitatud oskused** (`src/lib/skills/builtins.ts`) — tarnitakse koos OmniRoute'iga. Katavad levinud kasutusjuhud:
   - `file_read`, `file_write` — API-võtmepõhine liivakasti tööruum asukohas `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — väljaminev HTTP `safeOutboundFetch` kaudu seadistusega `guard: "public-only"`
   - `web_search` — vahemäluga ühendatav otsingupakkuja (`executeWebSearch`)
   - `eval_code` — Docker-liivakastis `node` või `python` käitamine
   - `execute_command` — Docker-liivakastis shell-käsu käitamine
   - `browser` — Playwrightil põhinev aluskarkass, vaikimisi keelatud (`builtin/browser.ts`)
2. **SkillsMP** (OmniRoute'i turuplats) — hangitakse aadressilt `https://skillsmp.com/api/v1/skills/search`. Nõuab seadetes väärtust `skillsmpApiKey`.
3. **SkillsSH** (`skills.sh` kogukonnakataloog) — hangitakse aadressilt `https://skills.sh/api/search`. Autentimine pole vajalik; SKILL.md sisu tõmmatakse GitHubi toorvaatest.

Üks „aktiivne pakkuja” määrab, millisest kataloogist juhtpaneel oskusi installib (`src/lib/skills/providerSettings.ts`). Seda saab vahetada jaotises **Seaded → Mälu ja oskused**. Vaikeväärtus: `skillsmp`.

### Oskuse identiteet

Oskused indekseeritakse mälusiseses registris (`src/lib/skills/registry.ts`) võtmega `name@version`. Versioon peab järgima semver-vormingut (`^\d+\.\d+\.\d+$`). `resolveVersion()` mõistab piiranguid `^`, `~`, `>`, `>=`, `<`, `<=`, `==` ja täpset vastet.

### Oskuse režiim

Igal oskusel on käitusrežiim, mis määrab, millal see lisatakse:

| Režiim | Käitumine                                                                                                |
| ------ | -------------------------------------------------------------------------------------------------------- |
| `on`   | Lisatakse alati tööriista definitsioonina                                                                |
| `off`  | Ei lisata kunagi ega saa käitada                                                                         |
| `auto` | Hinnatakse sissetuleva päringu suhtes; lisatakse ainult siis, kui skoor ≥ `AUTO_MIN_SCORE` (vaikimisi 3) |

`auto` on turuplatsilt installitud oskuste vaikerežiim. `enabled=true` ja `mode="off"` tähendavad koos „registreeritud, kuid mitteaktiivne” — `enabled` väärtuse muutmine pärandveeru kaudu uuendab ka väärtust `mode`, et vanemad kooditeed püsiksid kooskõlas (`src/app/api/skills/[id]/route.ts`).

### Olek (käivitused)

Oskuste käivitusi jälgitakse tabelis `skill_executions` järgmiste olekutega (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Registri vahemälu

`SkillRegistry` on singelton 60-sekundilise TTL-vahemäluga (`registry.ts:14`). `loadFromDatabase()` on idempotentne ja eemaldab samaaegsete kutsete duplikaadid `pendingLoad` abil. Iga kirjutus (`register`/`unregister`/`unregisterById`) tühistab vahemälu. Versioonide otsimiseks kasutage `getSkillVersions(name)` ja `resolveVersion(name, constraint)`.

### Pakkujateadlik lisamine

`injectSkills()` failis `src/lib/skills/injection.ts` on sisenemispunkt, mis teisendab registreeritud oskused pakkujapõhisteks tööriistadefinitsioonideks:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

Tööriista nimi kodeeritakse kujul `name@version`, et töötleja saaks valida õige versiooni, kui mudel selle välja kutsub.

### AUTO hindamine

Kui `mode="auto"`, hinnatakse iga kandidaatoskuse vastavust päringu kontekstile (`scoreAutoSkill()` failis `injection.ts`):

| Signaal                                                            | Punktid             |
| ------------------------------------------------------------------ | ------------------- |
| Oskuse nimi esineb kontekstis sõna-sõnalt                          | +6                  |
| Iga nimekomponent vastab konteksti komponendile                    | +2                  |
| Iga sildi alamstring vastab kontekstile                            | +3                  |
| Iga kirjelduse komponent vastab kontekstile                        | +1                  |
| Taustpõhjus vastab nimekomponendile                                | +2 komponendi kohta |
| Taustpõhjus vastab sildile                                         | +2 komponendi kohta |
| Siltides olev teenusepakkuja vihje vastab päringu teenusepakkujale | +2 / −2             |

Lisatakse kuni `AUTO_MAX_SKILLS = 5` suurima punktisummaga oskust, mille puhul `score >= AUTO_MIN_SCORE = 3`. Võrdse tulemuse korral järjestatakse esmalt `installCount` järgi kahanevalt ja seejärel nime järgi tähestikuliselt (`injection.ts:225-235`).

### Tööriistakutsete pealtkuulamine

Vestluse töötleja kutsub failis `src/lib/skills/interception.ts` oleva funktsiooni `handleToolCallExecution()` välja pärast seda, kui ülesvooluteenus tagastab tööriista väljakutsuva vastuse:

1. `extractToolCalls()` loeb teenusepakkuja-põhiseid struktuure (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Esmalt lahendatakse sisseehitatud tööriistade aliased (nt `omniroute_web_search` → `web_search`). Sisseehitatud töötlejad käivitatakse kohapeal.
3. Kõik muu suunatakse läbi `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`.
4. Tulemused lisatakse tagasi vastusesse — vastavalt kas `tool_results`, `function_call_output` elemendid või Anthropicu `tool_result` plokid.

Täitmiskontekstis saab `customSkillExecutionEnabled` väärtuseks määrata `false`, et lubada ainult sisseehitatud pealtkuulamist (seda kasutatakse päringute puhul, mis keelavad sõnaselgelt kasutaja määratud töötlejad).

---

## Dockeri liivakast

Sisseehitamata kooditeed (`eval_code`, `execute_command`) käitatakse Dockeris `SandboxRunner`i (`src/lib/skills/sandbox.ts`) kaudu. Iga konteiner käivitatakse järgmiste parameetritega:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (kui readOnly=true)
```

Vaikeväärtused (`SandboxRunner.DEFAULT_CONFIG`):

| Väli             | Vaikeväärtus    | Märkused                                                                 |
| ---------------- | --------------- | ------------------------------------------------------------------------ |
| `cpuLimit`       | 100 (= 0.1 CPU) | Enne parameetrile `--cpus` edastamist jagatakse 1000-ga                  |
| `memoryLimit`    | 256 MB          | Jäik piirang                                                             |
| `timeout`        | 30000 ms        | Pehme lõpetamine `SIGTERM`i ja käsu `docker kill` abil                   |
| `networkEnabled` | `false`         | Teisendatakse parameetriks `--network none`                              |
| `readOnly`       | `true`          | Juurfailisüsteem on kirjutuskaitstud; `/tmp` ja `/workspace` on tmpfs-id |

`SandboxRunner.kill(id)` ja `killAll()` on sulgemiseks avaldatud; töötavaid konteinereid jälgitakse muutujas `runningContainers: Map<string, ChildProcess>`.

### Liivakasti keskkonnamuutujad

Seadistatakse `process.env`i kaudu failis `src/lib/skills/builtins.ts`:

| Keskkonnamuutuja                  | Vaikeväärtus     | Otstarve                                                                  |
| --------------------------------- | ---------------- | ------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB) | Funktsioonide `file_read` ja `file_write` piirang                         |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`         | Funktsiooni `http_request` vastuse keha piirang                           |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`         | Kutsujale tagastatava stdout/stderr väljundi piirang                      |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`          | Liivakastikäskude vaikimisi ajalõpp; maksimaalselt 60 s                   |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`          | Väljuva liikluse põhilüliti. Kõnepõhiseks lubamiseks määra `1` või `true` |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (vt allpool)     | Komadega eraldatud Docker-tõmmiste lubatud loend                          |

Vaikimisi lubatud tõmmised: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. Kõik `SKILLS_ALLOWED_SANDBOX_IMAGES`i kaudu lisatud tõmmised ühendatakse vaikeväärtustega; tundmatud tõmmised lükkab `normalizeImage()` tagasi.

> Märkus: eraldi keskkonnamuutujat `SKILLS_EXECUTION_TIMEOUT_MS` pole. Liivakastivälise töötleja ajalõpp on `SkillExecutor`is (`executor.ts:13`) püsivalt määratud väärtusele 30 s, kuid seda saab käitusajal `skillExecutor.setTimeout(ms)`i kaudu muuta.

### Tööruumi isoleerimine

`file_read` ja `file_write` lahendavad iga tee API-võtmepõhise tööruumi suhtes asukohas `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`. Teekonna läbimine (`..`) ja keelatud segmendid (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) lükatakse tagasi enne mis tahes ketta sisend-/väljundtoimingut.

### HTTP turvatugevdus

`http_request` (`builtins.ts:257`):

- Meetodite lubatud loend: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Blokeeritud väljaminevad päised: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Ümbersuunamised on keelatud (`allowRedirect: false`)
- Marsruuditakse `safeOutboundFetch`i kaudu seadistusega `guard: "public-only"` (privaat- ja loopback-vahemikud on blokeeritud)
- Vastus kärbitakse mahuni `SKILLS_MAX_HTTP_RESPONSE_BYTES`; klient näeb väärtust `truncated: true`

---

## Hübriidtäitja (eelvaade)

`src/lib/skills/hybrid.ts` määratleb `HybridExecutor`-i, mis valib iga kutse puhul `direct`- (protsessisisese) ja `sandbox`-käivituse vahel ning sisaldab `autoUpgrade`-korduskatset ajalõpu või mäluvigade korral. Sisseehitatud `directExecutor` / `sandboxRunner` teostused on mallid (`executeDirect`, `executeInSandbox` tagastavad kohatäiteobjektid) — käsitlege seda moodulit arendamisel oleva lepinguna. Tegelik käivitamine toimub endiselt `skillExecutor` + `SandboxRunner` kaudu.

---

## Salvestusruum

Skeem asub kahes migratsioonis:

- `src/lib/db/migrations/016_create_skills.sql` — põhitabelid `skills` ja `skill_executions`, indeksitega väljadel `(api_key_id, name)` ja `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — lisab tabelisse `skills` väljad `mode`, `source_provider`, `tags` (JSON), `install_count`.

Väljale `skill_executions.status` rakendatakse piirangut andmebaasi tasemel: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## REST API

Kõik lõpp-punktid asuvad kataloogis `src/app/api/skills/`. Halduslõpp-punktid (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) nõuavad **haldusautentimist** funktsiooni `requireManagementAuth()` kaudu. Turuplatsi- ja installivood kasutavad lihtsamat funktsiooni `isAuthenticated()` (seanss või API-võti).

| Lõpp-punkt | Meetod | Otstarve |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Registreeritud oskuste loetelu. Toetab `?q=`, `?mode=on                  | off | auto`, `?source=skillsmp | skillssh | local`, lehekülgjaotus |
| `/api/skills/[id]` | PUT | Välja `enabled` või `mode` värskendamine |
| `/api/skills/[id]` | DELETE | Registreeringu eemaldamine ID alusel |
| `/api/skills/install` | POST | Kohandatud oskuse installimine (töötleja kood + skeem) |
| `/api/skills/marketplace` | GET | SkillsMP kataloogist otsimine (tagastab populaarsed vaikevalikud, kui `q` on tühi) |
| `/api/skills/marketplace/install` | POST | SkillsMP oskuse installimine (aktiivne teenusepakkuja peab olema `skillsmp`) |
| `/api/skills/skillssh` | GET | skills.sh kataloogist otsimine (`?q=&limit=`, ülempiir 100) |
| `/api/skills/skillssh/install` | POST | skills.sh oskuse installimine (aktiivne teenusepakkuja peab olema `skillssh`) |
| `/api/skills/executions` | GET | Lehekülgjaotusega käivitusajalugu (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Registreeritud oskuse sihtotstarbeline käivitamine |

Lõpp-punkt `POST /api/skills/executions` tagastab HTTP `503` koos vastusega `{ error: "Skills execution is disabled..." }`, kui `settings.skillsEnabled === false` (`executor.ts:42-45`). Operaatorid saavad pealülitit muuta jaotises **Seaded → AI**.

### Näide: kohandatud oskuse installimine

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

String `handlerCode` on **töötleja nime otsinguväärtus**, mitte käivitatav kood. Täitja vastendab selle funktsiooni `skillExecutor.registerHandler(name, fn)` kaudu (`executor.ts:25`). Turuplatsilt installimisel salvestatakse SKILL.md tekst sellele väljale dokumentatsioonina ning käivitamine suunatakse mudeli loodud tööriistakutsete kaudu. Suvalist kasutaja edastatud lähtekoodi ei käivitata funktsiooniga `eval`.

---

## MCP tööriistad

Neli MCP tööriista kapseldavad oskuste liidese (`open-sse/mcp-server/tools/skillTools.ts`). Need registreeritakse automaatselt MCP serveri käivitumisel.

| Tööriist                      | Kirjeldus                                                           |
| ----------------------------- | ------------------------------------------------------------------- |
| `omniroute_skills_list`       | Loetleb oskused; valikulised filtrid: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | Lubab või keelab oskuse `skillId` alusel                            |
| `omniroute_skills_execute`    | Käivitab oskuse sisendandmetega                                     |
| `omniroute_skills_executions` | Hiljutiste käivituste ajalugu (vaikimisi 50, maksimaalselt 100)     |

Transpordi seadistamise ja ulatuste määramise kohta vaadake faili [MCP-SERVER.md](./MCP-SERVER.md).

---

## A2A integratsioon

`src/lib/skills/a2a.ts` ekspordib A2A oskuse `memory_aware_routing` deskriptori ja abifunktsiooni `registerA2ASkill(registry)`. Kohandatud A2A oskused asuvad kataloogis `src/lib/a2a/skills/` ja neid suunatakse `A2A_SKILL_HANDLERS` kaudu (`src/lib/a2a/taskExecution.ts`). Ülesande täieliku elutsükli kohta vaadake faili [A2A-SERVER.md](./A2A-SERVER.md).

---

## Uue sisseehitatud oskuse lisamine

1. **Määratlege töötleja** failis `src/lib/skills/builtins.ts` (või mõnes sama taseme failis kataloogis `src/lib/skills/builtin/`). Signatuur: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Liivakastis käitatav kooditee?** Kutsuge välja `sandboxRunner.run(image, command, env, sandboxConfig({...}))`. Kasutage `normalizeImage()` funktsiooni lubatud üksuste loendi suhtes.
3. **Failisüsteemi tee?** Enne kettale juurdepääsu edastage see alati funktsioonile `resolveWorkspacePath(input, context)`.
4. **Võrgukutse?** Kasutage `safeOutboundFetch` funktsiooni koos parameetriga `guard: "public-only"`; puhastage päised funktsiooniga `sanitizeHeaders()`.
5. **Registreerige** oskus, lisades kirje loendisse `builtinSkills` (või kutsudes käivitumisel välja midagi funktsiooni `registerBrowserSkill(executor)` sarnast).
6. **Ühendage sisseehitatud tööriistade aliased** (valikuline) loendis `BUILTIN_TOOL_ALIASES` (`interception.ts:23`), kui ülesvoolu mudel väljastab teistsuguse nime.
7. **Testid** kataloogis `src/lib/skills/__tests__/` (Vitest).

---

## Uue kohandatud (mittesisseehitatud) oskuse lisamine

1. Registreerige töötleja protsessi käivitumisel:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Lisage oskus päringuga `POST /api/skills/install` (väli `handlerCode` peab vastama registreeritud töötleja nimele).
3. Seadke `mode` väärtuseks `on` või `auto` päringuga `PUT /api/skills/[id]`.

---

## Kasutussoovitused

- **Pealüliti:** `settings.skillsEnabled = false` blokeerib kõik käivitused ja tagastab HTTP `503` päringul `/api/skills/executions`. Register jätkab laadimist.
- **Piirake väljuvat liiklust:** jätke `SKILLS_SANDBOX_NETWORK_ENABLED` määramata (vaikeväärtus), et liivakast oleks täielikult võrgust isoleeritud. Kutsepõhine `networkEnabled: true` nõuab endiselt peavärava luba.
- **Lubage konkreetsed tõmmised:** lubatud üksuste loendi laiendamiseks määrake `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"`.
- **Auditeerige käivitusi:** `/dashboard/skills/executions` ja `omniroute_skills_executions` pärivad mõlemad tabelit `skill_executions`. Edukad käivitused sisaldavad välja `durationMs`; ebaõnnestunud käivitused sisaldavad välja `errorMessage`.
- **Vahemälu kehtetuks tunnistamine:** kutsuge pärast andmebaasi käsitsi muutmist välja `skillRegistry.invalidateCache()`; vastasel juhul oodake 60 s.
- **Anonüümne tööruum:** kui `apiKeyId` on tühi, räsitakse kõik kutsed samasse `"anonymous"` tööruumi — jagamist arvestav kood peaks alati edastama tegeliku võtme.

---

## Käivitamise elutsükkel (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) on **üksikeksemplar**, mis haldab iga oskuse käivitamist. Selle elutsükli mõistmine on ajalõppude, korduskatsete ja käivitusoleku silumisel kriitilise tähtsusega.

### Viieetapiline elutsükkel

```
   execute() kutsutud
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← järjekorras, pole veel alustatud (DB kirje loodud)
  └──────┬──────┘
         │ käivita töötleja
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← töötleja kutsutud ajalõpuga
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (muud teed pole — ülemaprotsess lõpetas)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   DB kirje värskendatud oleku, väljundi ja durationMs-iga
```

### Vaikekonfiguratsioon

| Seadistus    | Vaikeväärtus   | Seadistatav meetodiga                |
| ------------ | -------------- | ------------------------------------ |
| `timeout`    | `30000` (30 s) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`            | `skillExecutor.setMaxRetries(count)` |

> **Oluline**: Täitur on üksikeksemplar — `setTimeout()` kutsumine mõjutab globaalselt kõiki järgnevaid käivitamisi. Oskusepõhiseid ajalõppe praegu ei toetata; kui vajate erinevate oskuste jaoks erinevaid ajalõppe, käivitage eraldi protsessid või hargnege täiturist.

### Olekute väärtused

Failist `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // Järjekorras, pole veel alustatud
  RUNNING = "running", // Töötleja kutsutud
  SUCCESS = "success", // Töötleja tagastas korrektse väljundi
  ERROR = "error", // Töötleja viskas erindi
  TIMEOUT = "timeout", // Täituri ajalõpp ületati
}
```

> **Märkus**: Olek `TIMEOUT` on loendis defineeritud, kuid täituri praegune teostus **ei kirjuta seda tegelikult DB-sse** — ajalõpud kuvatakse olekuna `ERROR` koos sõnumiga `"Skill execution timed out"`. Oleku loendiväärtus on reserveeritud tulevaseks kasutuseks.

### Käivitamiste kontrollimine

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Konkreetse käivitamise hankimine ID järgi
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// API-võtme hiljutiste käivitamiste loetlemine
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// Käivitamiste koguarvu loendamine
const total = skillExecutor.countExecutions("api-key-id");
```

### Korduskatsete käitumine

Seadistus `maxRetries` salvestatakse, kuid täituri meetod `execute()` **ei kasuta seda praegu** — see teeb ainult ühe katse. Väärtus `maxRetries` on avaldatud tulevase teostuse ja seda lugeda soovivate haakide jaoks.

Praegu tuleb korduskatsed teostada oskuse töötlejas endas. Sisseehitatud
oskused registreeritakse täituris (nt `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` kataloogis `src/lib/skills/builtin/`); iga registreeritud töötleja
saab kapseldada oma korduskatsete tsükli:

```ts
// oskuse töötleja sees
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

## SkillMode üksikasjalikult

Enum `SkillMode` (`src/lib/skills/types.ts`) määrab, **millal ja kuidas** oskusi käivitatakse:

```ts
enum SkillMode {
  AUTO = "auto", // LLM otsustab, millal oskust kutsuda
  MANUAL = "manual", // Käivitatakse ainult kasutaja selgesõnalise taotluse korral
  HYBRID = "hybrid", // AUTO hindamine + käsitsi alistamine
}
```

> **Märkus**: Koodibaas määratleb `SkillMode`-i (AUTO/MANUAL/HYBRID), samas kui väli `Skill.mode` kasutab teistsugust kuju (`"on" | "off" | "auto"`). Need on seotud, kuid mitte identsed — `SkillMode` on täituri poliitika jaoks, `Skill.mode` aga üksikute oskuste lubamiseks või keelamiseks.

### Millal iga režiimi kasutada

| Režiim   | LLM-i käitumine                                                                         | Kasutusjuht                                                |
| -------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| `AUTO`   | LLM saab oskust kutsuda, kui peab seda vajalikuks                                       | Üldotstarbelised oskused (failide lugemine, HTTP-päringud) |
| `MANUAL` | LLM ei saa oskust kutsuda; selle käivitab ainult selgesõnaline `executeSkill` API kutse | Tundlikud toimingud (andmebaasi kirjutamine, maksed)       |
| `HYBRID` | LLM saab oskust soovitada; kasutaja peab selle kinnitama                                | Oskused, millel on kõrvalmõjud, kuid mis pole ohtlikud     |

### AUTO hindamine

Kui režiim `AUTO` on aktiivne, hinnatakse iga kandidaatoskuse sobivust päringu
kontekstiga funktsiooni `scoreAutoSkill()` abil failis `src/lib/skills/injection.ts` — see kasutab liitvat
täisarvulist punktisüsteemi (oskuse nime vaste, nime/sildi/kirjelduse sõnede kattuvus,
taustapõhjuse vihjed, pakkuja vihje boonus või trahv). Parimad
`AUTO_MAX_SKILLS = 5` oskust, mille `score >= AUTO_MIN_SCORE = 3`, lisatakse
kutsutavate tööriistadena; võrdse tulemuse korral otsustatakse esmalt `installCount`-i ja seejärel nime järgi. Täielikku punktitabelit vaadake selle
dokumendi varasemast jaotisest [**Tööriistaskeemi genereerimine → AUTO hindamine**](#auto-scoring);
ujukomaarvulist `0.6`-laadset lävendit ega `registry.ts`-i hindamist ei ole.

---

## Sisseehitatud oskuste kataloog

OmniRoute sisaldab hoolikalt valitud sisseehitatud oskuste komplekti asukohas `src/lib/skills/builtin/`. Kõige levinumad neist on järgmised.

### Brauseri automatiseerimise oskus

Brauserioskus (`src/lib/skills/builtin/browser.ts`) võimaldab Playwrighti/Puppeteeri kaudu ilma graafilise liideseta brauseri automatiseerimist. **See on implementeeritud, kuid ei kuulu vaikimisi oskuste kataloogi** — selle kasutamiseks installige brauserilaienduse pistikprogramm eraldi.

```ts
// Lubage see oma konfiguratsioonis
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Nõua alati selgesõnalist käivitamist
  allowedSkills: ["browser"],
  timeout: 60000, // 60 s lehtede laadimiseks
  maxRetries: 1,
};
```

### Muud sisseehitatud kategooriad

| Kategooria        | Oskused                                      | Režiim |
| ----------------- | -------------------------------------------- | ------ |
| Failide I/O       | `file_read`, `file_write`                    | AUTO   |
| HTTP              | `http_request`                               | AUTO   |
| Otsing            | `web_search`                                 | AUTO   |
| Koodi käivitamine | `eval_code` (liivakastis JavaScript/Python)  | HYBRID |
| Süsteem           | `execute_command` (liivakastis CLI-käivitus) | MANUAL |

### Kohandatud oskuse lisamine

Teavet selle kohta, kuidas lisada pistikprogrammisüsteemi kaudu kohandatud oskus, leiate dokumendist [Pistikprogrammi SDK ja oskuste integratsioon](./PLUGIN_SDK.md).

---

## Vaata ka

- [MCP-SERVER.md](./MCP-SERVER.md) — MCP tööriistade registreerimine ja transpordid
- [A2A-SERVER.md](./A2A-SERVER.md) — A2A ülesannete elutsükkel ja oskuste suunamine
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — kasutajatele mõeldud sissejuhatus
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — päringute töötlusahel ja komponentide kaart
- Lähtekood: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Testid: `src/lib/skills/__tests__/integration.test.ts`
