# SKILLS (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

# Okvir vještina

> **Izvor istine:** `src/lib/skills/` i `src/app/api/skills/`
> **Posljednje ažurirano:** 2026-06-28 — v3.8.40

OmniRoute izlaže proširivi okvir vještina (Skills framework) koji omogućava jezičkim modelima (i operaterima) da sastavljaju višekratno upotrebljive mogućnosti — od čitanja datotečnog sistema i HTTP zahtjeva do izvršavanja koda u izolovanom okruženju (sandbox) i kuriranih vještina sa tržišta.

Vještina je verzionisana jedinica rada definisana šemom. OmniRoute može ubaciti vještine kao definicije alata u odlazne zahtjeve, presresti pozive alata koji se vraćaju iz modela, pokrenuti odgovarajući rukovalac (handler) i vratiti rezultat modelu kako bi se razgovor mogao nastaviti. Model nikada ne vidi implementaciju — samo interfejs alata.

---

## Agent Skills vs Omni Skills

OmniRoute ima dva različita, ali komplementarna sistema vještina:

| Dimenzija     | **Omni Skills** (ovaj dokument)                                   | **Agent Skills**                                                                            |
| :------------ | :---------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| Svrha         | Ubrizgavanje LLM alata + izvršavanje u izolovanom okruženju       | SKILL.md katalog za vanjske agente radi otkrivanja i konzumiranja                           |
| Izvor istine  | `src/lib/skills/` + tržište                                       | `src/lib/agentSkills/` + `skills/` direktorij                                               |
| Runtime režim | Ubrizgano u odlazne zahtjeve, izvršeno na događajima poziva alata | Statički markdown katalog + REST/MCP/A2A krajnje tačke za otkrivanje                        |
| Ko ga koristi | Sam OmniRoute (kombinovano rutiranje, dolazni LLM pozivi)         | Vanjski agenti, MCP klijenti, A2A orkestratori                                              |
| Broj          | Promjenjivo (vođeno tržištem)                                     | 45 unosa u katalogu (23 API + 21 CLI + 1 konfiguracija)                                     |
| Format        | `SkillDefinition` sa šemom alata + rukovalac                      | `SKILL.md` frontmatter + markdown tijelo                                                    |
| Otkrivanje    | `/api/skills/*` REST + `omniroute_skills_*` MCP alati             | `/api/agent-skills/*` REST + `omniroute_agent_skills_*` MCP alati + A2A `list-capabilities` |

**Omni Skills** su mehanizam izvršavanja — one definišu šta OmniRoute _može učiniti_ kada LLM pozove alat.

**Agent Skills** su katalog dokumentacije — one objašnjavaju vanjskim agentima _kako koristiti_ OmniRoute REST API i CLI, sa strukturiranim SKILL.md datotekama koje se mogu direktno ubaciti u upite (prompts) agenata.

Za katalog Agent Skills, generator, MCP alate i A2A vještinu, pogledajte [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## Koncepti

### Izvori vještina

Tri izvora vještina koegzistiraju u istom registru:

1. **Ugrađene vještine** (`src/lib/skills/builtins.ts`) — isporučuju se uz OmniRoute. Pokrivaju uobičajene slučajeve:
   - `file_read`, `file_write` — sandbox radni prostor po API ključu ispod `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — odlazni HTTP kroz `safeOutboundFetch` sa `guard: "public-only"`
   - `web_search` — priključivi provajder pretrage sa keširanjem (`executeWebSearch`)
   - `eval_code` — izvršavanje `node` ili `python` koda u Docker izolovanom okruženju
   - `execute_command` — shell komanda u Docker izolovanom okruženju
   - `browser` — skela podržana Playwright-om, onemogućeno po zadanim postavkama (`builtin/browser.ts`)
2. **SkillsMP** (OmniRoute tržište) — preuzeto sa `https://skillsmp.com/api/v1/skills/search`. Zahtijeva `skillsmpApiKey` u Postavkama.
3. **SkillsSH** (katalog zajednice `skills.sh`) — preuzeto sa `https://skills.sh/api/search`. Nije potrebna autentifikacija; SKILL.md sadržaj se povlači iz GitHub raw-a.

Jedan "aktivni provajder" kontroliše iz kojeg kataloga kontrolna tabla vrši instalaciju (`src/lib/skills/providerSettings.ts`). Promijenite ga pod **Settings → Memory & Skills**. Zadano: `skillsmp`.

### Identitet vještine

Vještine su ključirane sa `name@version` u registru u memoriji (`src/lib/skills/registry.ts`). Verzija mora biti semver (`^\d+\.\d+\.\d+$`). `resolveVersion()` razumije `^`, `~`, `>`, `>=`, `<`, `<=`, `==` i ograničenja tačnog podudaranja.

### Režim vještine

Svaka vještina ima runtime režim koji kontroliše kada se ubacuje:

| Režim  | Ponašanje                                                                                      |
| ------ | ---------------------------------------------------------------------------------------------- |
| `on`   | Uvijek ubrizgano kao definicija alata                                                          |
| `off`  | Nikada nije ubrizgano, nikada nije izvršivo                                                    |
| `auto` | Bodovano prema dolaznom zahtjevu; ubrizgano samo ako je rezultat ≥ `AUTO_MIN_SCORE` (zadano 3) |

`auto` je zadano za vještine instalirane sa tržišta. `enabled=true` i `mode="off"` zajedno znače "registrovano, ali neaktivno" — prebacivanje `enabled` putem naslijeđene kolone takođe mijenja `mode` tako da stariji kodni putevi ostanu konzistentni (`src/app/api/skills/[id]/route.ts`).

### Status (izvršenja)

Izvršenja vještina se prate u tabeli `skill_executions` sa sljedećim statusima (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Keš registra

`SkillRegistry` je singleton sa TTL kešom od 60 sekundi (`registry.ts:14`). `loadFromDatabase()` je idempotentna i deduplicira istovremene pozive putem `pendingLoad`. Svako pisanje (`register`/`unregister`/`unregisterById`) poništava keš. Potražite verzije putem `getSkillVersions(name)` i `resolveVersion(name, constraint)`.

### Ubrizgavanje svjesno provajdera

`injectSkills()` u `src/lib/skills/injection.ts` je ulazna tačka koja pretvara registrovane vještine u definicije alata specifične za provajdera:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

Naziv alata je kodiran kao `name@version` tako da handler može odabrati ispravnu verziju kada ga model pozove nazad.

### AUTO bodovanje

Kada je `mode="auto"`, svaka vještina kandidat se boduje u odnosu na kontekst zahtjeva (`scoreAutoSkill()` u `injection.ts`):

| Signal                                                                | Bodovi       |
| --------------------------------------------------------------------- | ------------ |
| Naziv vještine se pojavljuje doslovno u kontekstu                     | +6           |
| Svaki token naziva se podudara sa tokenom konteksta                   | +2           |
| Svaki podniz oznake (tag) se podudara sa kontekstom                   | +3           |
| Svaki token opisa se podudara sa kontekstom                           | +1           |
| Razlog pozadine se podudara sa tokenom naziva                         | +2 po tokenu |
| Razlog pozadine se podudara sa oznakom                                | +2 po tokenu |
| Nagovještaj provajdera u oznakama se podudara sa provajderom zahtjeva | +2 / −2      |

Najboljih `AUTO_MAX_SKILLS = 5` vještina sa `score >= AUTO_MIN_SCORE = 3` se ubacuju. Izjednačenja se rješavaju pomoću `installCount` (opadajuće), a zatim abecednim redom naziva (`injection.ts:225-235`).

### Presretanje poziva alata

`handleToolCallExecution()` u `src/lib/skills/interception.ts` poziva chat handler nakon što upstream vrati odgovor sa pozivom alata:

1. `extractToolCalls()` čita oblike specifične za provajdera (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Ugrađeni aliasi alata (npr. `omniroute_web_search` → `web_search`) se prvo razrješavaju. Ugrađeni handler-i se izvršavaju inline.
3. Sve ostalo se usmjerava kroz `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`.
4. Rezultati se spajaju nazad u odgovor — `tool_results`, `function_call_output` stavke, ili Anthropic `tool_result` blokovi, zavisno od slučaja.

`customSkillExecutionEnabled` u kontekstu izvršavanja se može postaviti na `false` kako bi se omogućilo samo ugrađeno presretanje (koristi se za putanje zahtjeva koje eksplicitno onemogućavaju handler-e definisane od strane korisnika).

---

## Docker Sandbox

Putanja koda koja nije ugrađena (`eval_code`, `execute_command`) se izvršava unutar Docker-a putem `SandboxRunner`-a (`src/lib/skills/sandbox.ts`). Svaki kontejner se pokreće sa:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (when readOnly=true)
```

Zadane vrijednosti (`SandboxRunner.DEFAULT_CONFIG`):

| Polje            | Zadano          | Napomene                                                |
| ---------------- | --------------- | ------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU) | Podijeljeno sa 1000 prije prosljeđivanja u `--cpus`     |
| `memoryLimit`    | 256 MB          | Tvrdo ograničenje                                       |
| `timeout`        | 30000 ms        | "Soft" prekid putem `SIGTERM` + `docker kill`           |
| `networkEnabled` | `false`         | Postaje `--network none`                                |
| `readOnly`       | `true`          | Root FS samo za čitanje; `/tmp` i `/workspace` su tmpfs |

`SandboxRunner.kill(id)` i `killAll()` su izloženi za gašenje; pokrenuti kontejneri se prate u `runningContainers: Map<string, ChildProcess>`.

### Sandbox varijable okruženja

Konfigurisano putem `process.env` u `src/lib/skills/builtins.ts`:

| Varijabla okruženja               | Zadano           | Svrha                                                                                      |
| --------------------------------- | ---------------- | ------------------------------------------------------------------------------------------ |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB) | Ograničenje za `file_read` i `file_write`                                                  |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`         | Ograničenje za tijelo odgovora `http_request`                                              |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`         | Ograničenje za stdout/stderr vraćen pozivaocu                                              |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`          | Zadano vrijeme čekanja za komande u sandbox-u; ograničeno na 60 s                          |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`          | Glavna kapija za odlazni saobraćaj. Postavite `1` ili `true` da omogućite opt-in po pozivu |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (vidi ispod)     | Lista dozvoljenih Docker slika razdvojena zarezima                                         |

Zadane dozvoljene slike: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. Svi dodaci putem `SKILLS_ALLOWED_SANDBOX_IMAGES` se spajaju sa zadanim vrijednostima; nepoznate slike se odbijaju od strane `normalizeImage()`.

> Napomena: ne postoji posebna `SKILLS_EXECUTION_TIMEOUT_MS` varijabla okruženja. Vrijeme čekanja za handler koji nije u sandbox-u je hardkodirano na 30 s u `SkillExecutor` (`executor.ts:13`), ali se može nadjačati tokom izvršavanja putem `skillExecutor.setTimeout(ms)`.

### Izolacija radnog prostora

`file_read` i `file_write` razrješavaju svaku putanju relativno u odnosu na radni prostor po API ključu na `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`. Path traversal (`..`) i zabranjeni segmenti (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) se odbijaju prije bilo kakvog I/O diska.

### HTTP očvršćavanje

`http_request` (`builtins.ts:257`):

- Lista dozvoljenih metoda: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Blokirana odlazna zaglavlja: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Preusmjeravanja onemogućena (`allowRedirect: false`)
- Usmjereno kroz `safeOutboundFetch` sa `guard: "public-only"` (privatni/loopback opsezi blokirani)
- Odgovor skraćen na `SKILLS_MAX_HTTP_RESPONSE_BYTES`; klijent vidi `truncated: true`

---

## Hybrid Executor (pregled)

`src/lib/skills/hybrid.ts` definiše `HybridExecutor` koji odlučuje između `direct` (u procesu) i `sandbox` izvršavanja po pozivu, sa `autoUpgrade` putanjom ponovnog pokušaja u slučaju grešaka sa vremenskim ograničenjem/memorijom. Ugrađene implementacije `directExecutor` / `sandboxRunner` su stubovi (`executeDirect`, `executeInSandbox` vraćaju objekte čuvare mjesta) — tretirajte ovaj modul kao ugovor u izradi. Stvarno izvršavanje i dalje ide kroz `skillExecutor` + `SandboxRunner`.

---

## Skladištenje

Šema se nalazi u dvije migracije:

- `src/lib/db/migrations/016_create_skills.sql` — osnovne `skills` i `skill_executions` tabele, sa indeksima na `(api_key_id, name)` i `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — dodaje `mode`, `source_provider`, `tags` (JSON), `install_count` u `skills`.

`skill_executions.status` je ograničen na nivou baze podataka: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## REST API

Svi krajnji punktovi se nalaze pod `src/app/api/skills/`. Upravljački krajnji punktovi (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) zahtijevaju **upravljačku autorizaciju** putem `requireManagementAuth()`. Marketplace/install tokovi koriste lakšu `isAuthenticated()` (sesija ili API ključ).

| Endpoint | Method | Purpose |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Lista registrovanih vještina. Podržava `?q=`, `?mode=on | off | auto`, `?source=skillsmp | skillssh | local`, paginacija |
| `/api/skills/[id]` | PUT | Ažuriranje `enabled` ili `mode` |
| `/api/skills/[id]` | DELETE | Odjava po id-u |
| `/api/skills/install` | POST | Instalacija prilagođene vještine (kod rukovaoca + šema) |
| `/api/skills/marketplace` | GET | Pretraga SkillsMP kataloga (vraća popularne podrazumijevane vrijednosti kada je `q` prazan) |
| `/api/skills/marketplace/install` | POST | Instalacija SkillsMP vještine (zahtijeva aktivan provider = `skillsmp`) |
| `/api/skills/skillssh` | GET | Pretraga skills.sh kataloga (`?q=&limit=`, ograničeno na 100) |
| `/api/skills/skillssh/install` | POST | Instalacija skills.sh vještine (zahtijeva aktivan provider = `skillssh`) |
| `/api/skills/executions` | GET | Paginirana istorija izvršavanja (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Izvršavanje registrovane vještine ad-hoc |

Krajnji punkt `POST /api/skills/executions` vraća HTTP `503` sa `{ error: "Skills execution is disabled..." }` kada je `settings.skillsEnabled === false` (`executor.ts:42-45`). Operateri mogu prebaciti glavni prekidač iz **Settings → AI**.

### Primjer: instalacija prilagođene vještine

```bash
curl -X POST http://localhost:20128/api/skills/install \
  -H "Authorization: Bearer $OMNIROUTE_MGMT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "reverse-text",
    "version": "1.0.0",
    "description": "Obrće string",
    "schema": {
      "input":  { "type": "object", "properties": { "text": { "type": "string" } }, "required": ["text"] },
      "output": { "type": "object", "properties": { "reversed": { "type": "string" } } }
    },
    "handlerCode": "echo-handler",
    "apiKeyId": "your-api-key-id"
  }'
```

String `handlerCode` je **pretraga imena rukovaoca** — nije izvršni kod. Izvršilac ga mapira putem `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`). Marketplace instalacije pohranjuju SKILL.md tekst u ovo polje kao dokumentaciju i usmjeravaju izvršavanje kroz pozive alata generisane modelom. Proizvoljni izvorni kod koji dostavi korisnik se ne izvršava (eval'd).

---

## MCP alati

Četiri MCP alata obuhvataju površinu vještina (`open-sse/mcp-server/tools/skillTools.ts`). Oni se automatski registruju kada se MCP server pokrene.

| Alat                          | Opis                                                              |
| ----------------------------- | ----------------------------------------------------------------- |
| `omniroute_skills_list`       | Izlistaj vještine, opcioni filteri: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | Omogući/onemogući vještinu putem `skillId`                        |
| `omniroute_skills_execute`    | Izvrši vještinu sa ulaznim podacima (payload)                     |
| `omniroute_skills_executions` | Nedavna istorija izvršenja (podrazumijevano 50, maksimalno 100)   |

Pogledajte [MCP-SERVER.md](./MCP-SERVER.md) za podešavanje transporta i dodjelu opsega.

---

## A2A integracija

`src/lib/skills/a2a.ts` izvozi `memory_aware_routing` A2A deskriptor vještine i `registerA2ASkill(registry)` pomoćnu funkciju. Prilagođene A2A vještine se nalaze u `src/lib/a2a/skills/` i šalju se putem `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`). Pogledajte [A2A-SERVER.md](./A2A-SERVER.md) za kompletan životni ciklus zadatka.

---

## Dodavanje nove ugrađene vještine

1. **Definišite rukovaoca (handler)** u `src/lib/skills/builtins.ts` (ili srodnoj datoteci unutar `src/lib/skills/builtin/`). Potpis: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Putanja koda u sandbox-u?** Pozovite `sandboxRunner.run(image, command, env, sandboxConfig({...}))`. Koristite `normalizeImage()` u odnosu na listu dozvoljenih (allowlist).
3. **Putanja do sistema datoteka?** Uvijek prođite kroz `resolveWorkspacePath(input, context)` prije pristupa disku.
4. **Mrežni poziv?** Koristite `safeOutboundFetch` sa `guard: "public-only"`; očistite zaglavlja putem `sanitizeHeaders()`.
5. **Registrujte** dodavanjem unosa u `builtinSkills` (ili pozivanjem `registerBrowserSkill(executor)` stila pri pokretanju).
6. **Povežite alijase ugrađenih alata** (opciono) u `BUILTIN_TOOL_ALIASES` (`interception.ts:23`) ako uzvodni model emituje drugačije ime.
7. **Testovi** u `src/lib/skills/__tests__/` (Vitest).

---

## Dodavanje prilagođene (ne-ugrađene) vještine

1. Registrujte rukovaoca pri pokretanju procesa:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Umetnite vještinu putem `POST /api/skills/install` (polje `handlerCode` mora odgovarati registrovanom imenu rukovaoca).
3. Prebacite `mode` na `on` ili `auto` putem `PUT /api/skills/[id]`.

---

## Operativni savjeti

- **Glavni prekidač:** `settings.skillsEnabled = false` blokira sva izvršenja i vraća HTTP `503` na `/api/skills/executions`. Registar nastavlja sa učitavanjem.
- **Zaključavanje izlaznog saobraćaja:** ostavite `SKILLS_SANDBOX_NETWORK_ENABLED` nepostavljenim (podrazumijevano) za potpuno izolovani (air-gapped) sandbox. `networkEnabled: true` po pozivu i dalje zahtijeva glavnu kapiju.
- **Dozvolite specifične slike:** postavite `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` da proširite listu dozvoljenih.
- **Revizija izvršenja:** `/dashboard/skills/executions` i `omniroute_skills_executions` oba upituju `skill_executions`. Uspješna pokretanja uključuju `durationMs`; neuspjesi uključuju `errorMessage`.
- **Invalidacija keša:** pozovite `skillRegistry.invalidateCache()` nakon ručnih izmjena baze podataka; u suprotnom sačekajte 60 s.
- **Anonimni radni prostor:** kada je `apiKeyId` prazan, svi pozivi se heširaju u isti `"anonymous"` radni prostor — kod koji je svjestan dijeljenja (share-aware) treba uvijek da proslijedi pravi ključ.

## Životni ciklus izvršavanja (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) je **singleton** koji upravlja svakim pozivom vještine. Razumijevanje njegovog životnog ciklusa je ključno za otklanjanje grešaka vezanih za vremenska ograničenja (timeouts), ponovne pokušaje (retries) i stanje izvršavanja.

### Životni ciklus u 5 faza

```
   pozvan execute()
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← u redu čekanja, još nije pokrenuto (kreiran red u bazi podataka)
  └──────┬──────┘
         │ pokreni handler
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← handler pozvan sa vremenskim ograničenjem
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (nema druge putanje — prekinuto od strane roditelja)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   red u bazi podataka ažuriran sa statusom, izlazom, durationMs
```

### Zadana konfiguracija

| Postavka     | Zadano        | Konfigurabilno putem                 |
| ------------ | ------------- | ------------------------------------ |
| `timeout`    | `30000` (30s) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`           | `skillExecutor.setMaxRetries(count)` |

> **Važno**: Executor je singleton — pozivanje `setTimeout()` globalno utiče na sve naknadne pozive. Vremenska ograničenja po vještini trenutno nisu podržana; ako su vam potrebna različita vremenska ograničenja po vještini, pošaljite zasebne procese ili forkirajte executor.

### Vrijednosti statusa

Iz `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // U redu čekanja, još nije pokrenuto
  RUNNING = "running", // Handler pozvan
  SUCCESS = "success", // Handler vratio validan izlaz
  ERROR = "error", // Handler bacio izuzetak
  TIMEOUT = "timeout", // Prekoračeno vremensko ograničenje executora
}
```

> **Napomena**: Status `TIMEOUT` je definisan u enumu, ali ga trenutna implementacija executora **zapravo ne upisuje u bazu podataka** — vremenska ograničenja se pojavljuju kao `ERROR` sa porukom `"Skill execution timed out"`. Statusni enum je rezervisan za buduću upotrebu.

### Provjera izvršavanja

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Dobavi određeno izvršavanje po ID-u
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// Izlistaj nedavna izvršavanja za API ključ
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// Prebroj ukupna izvršavanja
const total = skillExecutor.countExecutions("api-key-id");
```

### Ponašanje pri ponovnom pokušaju (Retry)

Postavka `maxRetries` je pohranjena, ali je trenutno **ne koristi** metoda `execute()` executora — ona vrši samo jedan pokušaj. Vrijednost `maxRetries` je izložena za buduću implementaciju i za hookove koji je žele pročitati.

Za sada, ponovni pokušaji se moraju implementirati unutar samog handlera vještine. Ugrađene vještine se registruju na executor (npr. `registerBuiltinSkills(executor)` / `registerBrowserSkill(executor)` u `src/lib/skills/builtin/`); koji god handler registrujete, on može obuhvatiti vlastitu petlju za ponovne pokušaje:

```ts
// unutar handlera vještine
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

## SkillMode detaljno

Enum `SkillMode` (`src/lib/skills/types.ts`) kontroliše **kada i kako** se vještine pozivaju:

```ts
enum SkillMode {
  AUTO = "auto", // LLM odlučuje kada pozvati vještinu
  MANUAL = "manual", // Poziva se samo na eksplicitni zahtjev korisnika
  HYBRID = "hybrid", // AUTO bodovanje + ručno poništavanje
}
```

> **Napomena**: Kodna baza definiše `SkillMode` (AUTO/MANUAL/HYBRID), dok polje `Skill.mode` koristi drugačiji oblik (`"on" | "off" | "auto"`). Oni su povezani, ali nisu identični — `SkillMode` služi za politiku izvršavanja, `Skill.mode` služi za omogućavanje po vještini.

### Kada koristiti koji način rada

| Način rada | Ponašanje LLM-a                                                                    | Slučaj upotrebe                                             |
| ---------- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `AUTO`     | LLM može pozvati vještinu kada smatra da je potrebno                               | Vještine opšte namjene (čitanje datoteka, HTTP zahtjevi)    |
| `MANUAL`   | LLM ne može pozvati vještinu; samo eksplicitni `executeSkill` API poziv je pokreće | Osjetljive operacije (upisivanje u bazu podataka, plaćanja) |
| `HYBRID`   | LLM može predložiti vještinu; korisnik mora potvrditi                              | Vještine koje imaju nuspojave, ali nisu opasne              |

### AUTO bodovanje

Kada je aktivan `AUTO` način rada, svaka kandidatska vještina se boduje u odnosu na kontekst zahtjeva pomoću `scoreAutoSkill()` u `src/lib/skills/injection.ts` — aditivni sistem bodovanja cijelim brojevima (podudaranje naziva vještine, preklapanje tokena naziva/oznake/opisa, savjeti o pozadinskom razlogu, bonus/penal za savjet provajdera). Prvih `AUTO_MAX_SKILLS = 5` vještina sa `score >= AUTO_MIN_SCORE = 3` se ubacuju kao pozivi alata, izjednačeni rezultati se rješavaju pomoću `installCount`, a zatim naziva. Pogledajte punu tabelu bodova u [**Generisanje šeme alata → AUTO bodovanje**](#auto-scoring) ranije u ovom dokumentu; ne postoji prag tipa `0.6` sa pomičnim zarezom i nema bodovanja u `registry.ts`.

---

## Katalog ugrađenih vještina

OmniRoute dolazi sa odabranim skupom ugrađenih vještina u `src/lib/skills/builtin/`. Najčešće su:

### Vještina automatizacije pretraživača

Vještina pretraživača (`src/lib/skills/builtin/browser.ts`) omogućava automatizaciju pretraživača bez grafičkog interfejsa (headless) putem Playwright/Puppeteer. **Implementirana je, ali nije u zadanom katalogu vještina** — da biste je koristili, instalirajte dodatak za pretraživač zasebno.

```ts
// Omogućite u svojoj konfiguraciji
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Uvijek zahtijeva eksplicitno pozivanje
  allowedSkills: ["browser"],
  timeout: 60000, // 60s za učitavanje stranica
  maxRetries: 1,
};
```

### Ostale ugrađene kategorije

| Kategorija       | Vještine                                    | Način rada |
| ---------------- | ------------------------------------------- | ---------- |
| Datotečni I/O    | `file_read`, `file_write`                   | AUTO       |
| HTTP             | `http_request`                              | AUTO       |
| Pretraga         | `web_search`                                | AUTO       |
| Izvršavanje koda | `eval_code` (sandboxed JavaScript/Python)   | HYBRID     |
| Sistem           | `execute_command` (sandboxed CLI execution) | MANUAL     |

### Dodavanje prilagođene vještine

Pogledajte [Plugin SDK & Integracija vještina](./PLUGIN_SDK.md) za informacije o tome kako dodati prilagođenu vještinu putem sistema dodataka.

---

## Vidi također

- [MCP-SERVER.md](./MCP-SERVER.md) — registracija MCP alata i transporti
- [A2A-SERVER.md](./A2A-SERVER.md) — životni ciklus A2A zadatka i dispečiranje vještina
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — uvod za korisnike
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — cjevovod zahtjeva i mapa komponenti
- Izvor: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Testovi: `src/lib/skills/__tests__/integration.test.ts`
