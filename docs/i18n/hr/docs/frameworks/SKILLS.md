# Skills Framework (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Izvor istine:** `src/lib/skills/` i `src/app/api/skills/`
> **Posljednje ažuriranje:** 2026-06-28 — v3.8.40

OmniRoute pruža proširivi okvir Skills koji jezičnim modelima (i operaterima) omogućuje sastavljanje višekratno upotrebljivih mogućnosti — od čitanja datotečnog sustava i HTTP zahtjeva do izvršavanja koda u izoliranom okruženju i odabranih vještina s tržišta.

Vještina je verzionirana jedinica rada definirana shemom. OmniRoute može umetnuti vještine kao definicije alata u odlazne zahtjeve, presresti pozive alata koje model vraća, pokrenuti odgovarajući rukovatelj i proslijediti rezultat natrag modelu kako bi se razgovor mogao nastaviti. Model nikada ne vidi implementaciju — samo sučelje alata.

---

## Agent Skills i Omni Skills

OmniRoute ima dva različita, ali komplementarna sustava vještina:

| Dimenzija       | **Omni Skills** (ovaj dokument)                                      | **Agent Skills**                                                                            |
| :-------------- | :------------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| Svrha           | Umetanje LLM alata + izvršavanje u izoliranom okruženju              | SKILL.md katalog koji vanjski agenti mogu otkrivati i koristiti                             |
| Izvor istine    | `src/lib/skills/` + tržište                                          | `src/lib/agentSkills/` + direktorij `skills/`                                               |
| Način izvođenja | Umeću se u odlazne zahtjeve i izvršavaju pri događajima poziva alata | Statički markdown katalog + krajnje točke za otkrivanje putem REST/MCP/A2A                  |
| Tko ih koristi  | Sam OmniRoute (kombinirano usmjeravanje, dolazni LLM pozivi)         | Vanjski agenti, MCP klijenti, A2A orkestratori                                              |
| Broj            | Promjenjiv (ovisi o tržištu)                                         | 45 kataloških stavki (23 API + 21 CLI + 1 konfiguracijska)                                  |
| Format          | `SkillDefinition` sa shemom alata + rukovateljem                     | `SKILL.md` frontmatter + markdown sadržaj                                                   |
| Otkrivanje      | `/api/skills/*` REST + `omniroute_skills_*` MCP alati                | `/api/agent-skills/*` REST + `omniroute_agent_skills_*` MCP alati + A2A `list-capabilities` |

**Omni Skills** su mehanizam izvršavanja — definiraju što OmniRoute _može učiniti_ kada LLM pozove alat.

**Agent Skills** su dokumentacijski katalog — vanjskim agentima objašnjavaju _kako koristiti_ OmniRouteov REST API i CLI, uz strukturirane SKILL.md datoteke koje se mogu izravno uključiti u upite agenata.

Za katalog Agent Skills, generator, MCP alate i A2A vještinu pogledajte [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## Koncepti

### Izvori vještina

Tri izvora vještina postoje istodobno u istom registru:

1. **Ugrađene vještine** (`src/lib/skills/builtins.ts`) — isporučuju se s OmniRouteom. Pokrivaju uobičajene slučajeve:
   - `file_read`, `file_write` — izolirani radni prostor za svaki API ključ pod `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — odlazni HTTP putem `safeOutboundFetch` uz `guard: "public-only"`
   - `web_search` — zamjenjivi pružatelj pretraživanja s predmemoriranjem (`executeWebSearch`)
   - `eval_code` — izvršavanje programa `node` ili `python` u Dockerovu izoliranom okruženju
   - `execute_command` — izvršavanje naredbi ljuske u Dockerovu izoliranom okruženju
   - `browser` — početna struktura temeljena na Playwrightu, onemogućena prema zadanim postavkama (`builtin/browser.ts`)
2. **SkillsMP** (OmniRouteovo tržište) — dohvaća se s `https://skillsmp.com/api/v1/skills/search`. Zahtijeva `skillsmpApiKey` u postavkama.
3. **SkillsSH** (katalog zajednice `skills.sh`) — dohvaća se s `https://skills.sh/api/search`. Autentifikacija nije potrebna; sadržaj SKILL.md dohvaća se izravno s GitHuba.

Jedan „aktivni pružatelj” određuje iz kojeg kataloga nadzorna ploča instalira vještine (`src/lib/skills/providerSettings.ts`). Promijenite ga u odjeljku **Postavke → Memorija i vještine**. Zadano: `skillsmp`.

### Identitet vještine

Vještine su u registru u memoriji (`src/lib/skills/registry.ts`) označene ključem `name@version`. Verzija mora biti semver (`^\d+\.\d+\.\d+$`). `resolveVersion()` podržava ograničenja `^`, `~`, `>`, `>=`, `<`, `<=`, `==` i točno podudaranje.

### Način rada vještine

Svaka vještina ima način izvođenja koji određuje kada se umeće:

| Način  | Ponašanje                                                                                             |
| ------ | ----------------------------------------------------------------------------------------------------- |
| `on`   | Uvijek se umeće kao definicija alata                                                                  |
| `off`  | Nikada se ne umeće niti se može izvršiti                                                              |
| `auto` | Ocjenjuje se u odnosu na dolazni zahtjev; umeće se samo ako je rezultat ≥ `AUTO_MIN_SCORE` (zadano 3) |

`auto` je zadana vrijednost za vještine instalirane s tržišta. `enabled=true` i `mode="off"` zajedno znače „registrirano, ali neaktivno” — promjena vrijednosti `enabled` putem naslijeđenog stupca također ažurira `mode` kako bi stariji tokovi koda ostali usklađeni (`src/app/api/skills/[id]/route.ts`).

### Status (izvršavanja)

Izvršavanja vještina prate se u tablici `skill_executions` sa sljedećim statusima (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Predmemorija registra

`SkillRegistry` je singleton s predmemorijom čiji je TTL 60 sekundi (`registry.ts:14`). `loadFromDatabase()` je idempotentna funkcija koja putem `pendingLoad` uklanja duplicirane istodobne pozive. Svaki zapis (`register`/`unregister`/`unregisterById`) poništava predmemoriju. Verzije potražite putem `getSkillVersions(name)` i `resolveVersion(name, constraint)`.

### Umetanje prilagođeno pružatelju

`injectSkills()` u `src/lib/skills/injection.ts` ulazna je točka koja registrirane vještine pretvara u definicije alata specifične za pružatelja:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

Naziv alata kodiran je kao `name@version` kako bi rukovatelj mogao odabrati odgovarajuću verziju kada ga model pozove.

### AUTO bodovanje

Kada je `mode="auto"`, svaka vještina kandidat boduje se prema kontekstu zahtjeva (`scoreAutoSkill()` u `injection.ts`):

| Signal                                                           | Bodovi       |
| ---------------------------------------------------------------- | ------------ |
| Naziv vještine pojavljuje se doslovno u kontekstu                | +6           |
| Svaki token naziva podudara se s tokenom konteksta               | +2           |
| Svaki podniz oznake podudara se s kontekstom                     | +3           |
| Svaki token opisa podudara se s kontekstom                       | +1           |
| Razlog u pozadini podudara se s tokenom naziva                   | +2 po tokenu |
| Razlog u pozadini podudara se s oznakom                          | +2 po tokenu |
| Naznaka pružatelja u oznakama podudara se s pružateljem zahtjeva | +2 / −2      |

Umeće se najviše `AUTO_MAX_SKILLS = 5` vještina s `score >= AUTO_MIN_SCORE = 3`. Izjednačenja se razrješavaju prema `installCount` (silazno), a zatim prema nazivu abecednim redom (`injection.ts:225-235`).

### Presretanje poziva alata

Rukovatelj razgovorom poziva `handleToolCallExecution()` u `src/lib/skills/interception.ts` nakon što nadređeni servis vrati odgovor s pozivom alata:

1. `extractToolCalls()` čita formate specifične za pružatelja (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Najprije se razrješavaju aliasi ugrađenih alata (npr. `omniroute_web_search` → `web_search`). Ugrađeni rukovatelji izvršavaju se izravno.
3. Sve ostalo usmjerava se kroz `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`.
4. Rezultati se umeću natrag u odgovor — kao stavke `tool_results`, `function_call_output` ili Anthropicovi blokovi `tool_result`, ovisno o slučaju.

`customSkillExecutionEnabled` u kontekstu izvršavanja može se postaviti na `false` kako bi se dopustilo samo presretanje ugrađenih alata (upotrebljava se u putanjama zahtjeva koje izričito onemogućuju korisnički definirane rukovatelje).

---

## Docker Sandbox

Putanje koda koje nisu ugrađene (`eval_code`, `execute_command`) izvršavaju se unutar Dockera putem `SandboxRunner` (`src/lib/skills/sandbox.ts`). Svaki se spremnik pokreće s:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (kada je readOnly=true)
```

Zadane vrijednosti (`SandboxRunner.DEFAULT_CONFIG`):

| Polje            | Zadana vrijednost | Napomene                                                                    |
| ---------------- | ----------------- | --------------------------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU)   | Dijeli se s 1000 prije prosljeđivanja opciji `--cpus`                       |
| `memoryLimit`    | 256 MB            | Čvrsto ograničenje                                                          |
| `timeout`        | 30000 ms          | Blago zaustavljanje putem `SIGTERM` + `docker kill`                         |
| `networkEnabled` | `false`           | Postaje `--network none`                                                    |
| `readOnly`       | `true`            | Korijenski datotečni sustav samo za čitanje; `/tmp` i `/workspace` su tmpfs |

`SandboxRunner.kill(id)` i `killAll()` izloženi su za zaustavljanje; pokrenuti spremnici prate se u `runningContainers: Map<string, ChildProcess>`.

### Varijable okruženja sandboxa

Konfiguriraju se putem `process.env` u `src/lib/skills/builtins.ts`:

| Varijabla okruženja               | Zadana vrijednost | Svrha                                                                                                                |
| --------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB)  | Ograničenje za `file_read` i `file_write`                                                                            |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`          | Ograničenje veličine tijela odgovora za `http_request`                                                               |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`          | Ograničenje za stdout/stderr vraćen pozivatelju                                                                      |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`           | Zadano vremensko ograničenje za naredbe u sandboxu; najviše 60 s                                                     |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`           | Glavna kontrola izlaznog prometa. Postavite na `1` ili `true` kako biste omogućili uključivanje za pojedinačni poziv |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (pogledajte niže) | Popis dopuštenih Docker slika odvojenih zarezima                                                                     |

Zadano dopuštene slike: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. Svi dodaci putem `SKILLS_ALLOWED_SANDBOX_IMAGES` spajaju se sa zadanim vrijednostima; `normalizeImage()` odbija nepoznate slike.

> Napomena: ne postoji zasebna varijabla okruženja `SKILLS_EXECUTION_TIMEOUT_MS`. Vremensko ograničenje rukovatelja izvan sandboxa čvrsto je postavljeno na 30 s u `SkillExecutor` (`executor.ts:13`), ali se tijekom izvođenja može nadjačati putem `skillExecutor.setTimeout(ms)`.

### Izolacija radnog prostora

`file_read` i `file_write` razrješavaju svaku putanju u odnosu na radni prostor pojedinačnog API ključa na `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`. Prolazak kroz putanju (`..`) i zabranjeni segmenti (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) odbijaju se prije bilo kakvog diskovnog U/I-ja.

### Sigurnosno ojačavanje HTTP-a

`http_request` (`builtins.ts:257`):

- Popis dopuštenih metoda: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Blokirana odlazna zaglavlja: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Preusmjeravanja su onemogućena (`allowRedirect: false`)
- Usmjerava se putem `safeOutboundFetch` uz `guard: "public-only"` (privatni/loopback rasponi su blokirani)
- Odgovor se skraćuje na `SKILLS_MAX_HTTP_RESPONSE_BYTES`; klijent vidi `truncated: true`

---

## Hibridni izvršitelj (pretpregled)

`src/lib/skills/hybrid.ts` definira `HybridExecutor` koji za svaki poziv odlučuje između `direct` (unutar procesa) i `sandbox` izvršavanja, uz `autoUpgrade` mehanizam ponovnog pokušaja u slučaju prekoračenja vremena ili memorije. Ugrađene implementacije `directExecutor` / `sandboxRunner` samo su privremene implementacije (`executeDirect`, `executeInSandbox` vraćaju zamjenske objekte) — ovaj modul smatrajte ugovorom koji je još u izradi. Stvarno izvršavanje i dalje se odvija putem `skillExecutor` + `SandboxRunner`.

---

## Pohrana

Shema se nalazi u dvjema migracijama:

- `src/lib/db/migrations/016_create_skills.sql` — osnovne tablice `skills` i `skill_executions`, s indeksima na `(api_key_id, name)` i `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — dodaje `mode`, `source_provider`, `tags` (JSON), `install_count` u `skills`.

`skill_executions.status` ograničen je na razini baze podataka: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## REST API

Sve krajnje točke nalaze se pod `src/app/api/skills/`. Krajnje točke za upravljanje (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) zahtijevaju **autentifikaciju za upravljanje** putem `requireManagementAuth()`. Tokovi za trgovinu i instalaciju upotrebljavaju jednostavniji `isAuthenticated()` (sesija ili API ključ).

| Krajnja točka | Metoda | Svrha |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Popis registriranih vještina. Podržava `?q=`, `?mode=on                  | off | auto`, `?source=skillsmp | skillssh | local`, straničenje |
| `/api/skills/[id]` | PUT | Ažuriranje vrijednosti `enabled` ili `mode` |
| `/api/skills/[id]` | DELETE | Odjava prema ID-u |
| `/api/skills/install` | POST | Instalacija prilagođene vještine (kôd rukovatelja + shema) |
| `/api/skills/marketplace` | GET | Pretraživanje kataloga SkillsMP (vraća popularne zadane rezultate kada je `q` prazan) |
| `/api/skills/marketplace/install` | POST | Instalacija vještine SkillsMP (zahtijeva aktivnog pružatelja = `skillsmp`) |
| `/api/skills/skillssh` | GET | Pretraživanje kataloga skills.sh (`?q=&limit=`, ograničeno na 100) |
| `/api/skills/skillssh/install` | POST | Instalacija vještine skills.sh (zahtijeva aktivnog pružatelja = `skillssh`) |
| `/api/skills/executions` | GET | Straničena povijest izvršavanja (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Ad hoc izvršavanje registrirane vještine |

Krajnja točka `POST /api/skills/executions` vraća HTTP `503` s `{ error: "Skills execution is disabled..." }` kada je `settings.skillsEnabled === false` (`executor.ts:42-45`). Operateri mogu uključiti ili isključiti glavni prekidač u odjeljku **Postavke → AI**.

### Primjer: instalacija prilagođene vještine

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

Niz `handlerCode` predstavlja **traženje naziva rukovatelja** — nije izvršni kôd. Izvršitelj ga mapira putem `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`). Instalacije iz trgovine pohranjuju tekst datoteke SKILL.md u ovo polje kao dokumentaciju te usmjeravaju izvršavanje kroz pozive alata koje generira model. Proizvoljan izvorni kôd koji unese korisnik ne izvršava se pomoću funkcije eval.

---

## MCP alati

Četiri MCP alata obuhvaćaju funkcionalnosti vještina (`open-sse/mcp-server/tools/skillTools.ts`). Automatski se registriraju pri pokretanju MCP poslužitelja.

| Alat                          | Opis                                                                 |
| ----------------------------- | -------------------------------------------------------------------- |
| `omniroute_skills_list`       | Prikazuje vještine; neobavezni filtri: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | Omogućuje/onemogućuje vještinu prema `skillId`                       |
| `omniroute_skills_execute`    | Izvršava vještinu s ulaznim podacima                                 |
| `omniroute_skills_executions` | Nedavna povijest izvršavanja (zadano 50, najviše 100)                |

Za postavljanje prijenosa i dodjelu opsega pogledajte [MCP-SERVER.md](./MCP-SERVER.md).

---

## A2A integracija

`src/lib/skills/a2a.ts` izvozi deskriptor A2A vještine `memory_aware_routing` i pomoćnu funkciju `registerA2ASkill(registry)`. Prilagođene A2A vještine nalaze se u `src/lib/a2a/skills/` i usmjeravaju se putem `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`). Za cjelokupni životni ciklus zadatka pogledajte [A2A-SERVER.md](./A2A-SERVER.md).

---

## Dodavanje nove ugrađene vještine

1. **Definirajte rukovatelj** u `src/lib/skills/builtins.ts` (ili u susjednoj datoteci unutar `src/lib/skills/builtin/`). Potpis: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Izolirani put koda?** Pozovite `sandboxRunner.run(image, command, env, sandboxConfig({...}))`. Upotrijebite `normalizeImage()` za provjeru prema popisu dopuštenih stavki.
3. **Put datotečnog sustava?** Uvijek ga proslijedite kroz `resolveWorkspacePath(input, context)` prije pristupanja disku.
4. **Mrežni poziv?** Upotrijebite `safeOutboundFetch` s `guard: "public-only"`; zaglavlja pročistite putem `sanitizeHeaders()`.
5. **Registrirajte** dodavanjem unosa u `builtinSkills` (ili pozivanjem funkcije poput `registerBrowserSkill(executor)` pri pokretanju).
6. **Povežite pseudonime ugrađenih alata** (neobavezno) u `BUILTIN_TOOL_ALIASES` (`interception.ts:23`) ako nadređeni model generira drukčiji naziv.
7. **Testovi** u `src/lib/skills/__tests__/` (Vitest).

---

## Dodavanje prilagođene (neugrađene) vještine

1. Registrirajte rukovatelj pri pokretanju procesa:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Dodajte vještinu putem `POST /api/skills/install` (polje `handlerCode` mora odgovarati nazivu registriranog rukovatelja).
3. Promijenite `mode` na `on` ili `auto` putem `PUT /api/skills/[id]`.

---

## Savjeti za rad

- **Glavni prekidač:** `settings.skillsEnabled = false` blokira sva izvršavanja i vraća HTTP `503` na `/api/skills/executions`. Registar se nastavlja učitavati.
- **Ograničite izlazni promet:** ostavite `SKILLS_SANDBOX_NETWORK_ENABLED` nepostavljenim (zadano) za potpuno mrežno izolirano izvršavanje u sigurnom okruženju. Vrijednost `networkEnabled: true` za pojedinačni poziv i dalje zahtijeva dopuštenje glavnog kontrolnog mehanizma.
- **Dopustite određene slike:** postavite `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` kako biste proširili popis dopuštenih stavki.
- **Revidirajte izvršavanja:** `/dashboard/skills/executions` i `omniroute_skills_executions` izvršavaju upite nad `skill_executions`. Uspješna izvođenja uključuju `durationMs`; neuspješna uključuju `errorMessage`.
- **Poništavanje predmemorije:** pozovite `skillRegistry.invalidateCache()` nakon ručnih izmjena baze podataka; u suprotnom pričekajte 60 s.
- **Anonimni radni prostor:** kada je `apiKeyId` prazan, svi se pozivi sažimaju u isti radni prostor `"anonymous"` — kod koji podržava dijeljenje uvijek bi trebao proslijediti pravi ključ.

---

## Životni ciklus izvršavanja (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) je **singleton** koji upravlja svakim pozivanjem vještine. Razumijevanje njegova životnog ciklusa ključno je za otklanjanje pogrešaka povezanih s vremenskim ograničenjima, ponovnim pokušajima i stanjem izvršavanja.

### Životni ciklus u 5 faza

```
   execute() pozvan
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← u redu čekanja, još nije pokrenuto (stvoren redak u bazi podataka)
  └──────┬──────┘
         │ pokretanje rukovatelja
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← rukovatelj pozvan s vremenskim ograničenjem
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (nema drugog puta — prekinuo nadređeni proces)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   Redak u bazi podataka ažuriran statusom, izlazom i vrijednošću durationMs
```

### Zadana konfiguracija

| Postavka     | Zadano         | Može se konfigurirati putem          |
| ------------ | -------------- | ------------------------------------ |
| `timeout`    | `30000` (30 s) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`            | `skillExecutor.setMaxRetries(count)` |

> **Važno**: Izvršitelj je singleton — pozivanje `setTimeout()` globalno utječe na sva sljedeća pozivanja. Vremenska ograničenja po vještini trenutačno nisu podržana; ako su vam potrebna različita vremenska ograničenja za pojedine vještine, pokrenite zasebne procese ili izradite izvedenicu izvršitelja.

### Vrijednosti statusa

Iz `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // U redu čekanja, još nije pokrenuto
  RUNNING = "running", // Rukovatelj je pozvan
  SUCCESS = "success", // Rukovatelj je vratio valjani izlaz
  ERROR = "error", // Rukovatelj je iznimku
  TIMEOUT = "timeout", // Prekoračeno je vremensko ograničenje izvršitelja
}
```

> **Napomena**: Status `TIMEOUT` definiran je u enumeraciji, ali ga trenutačna implementacija izvršitelja **zapravo ne zapisuje u bazu podataka** — vremenska ograničenja prikazuju se kao `ERROR` s porukom `"Skill execution timed out"`. Enumeracija statusa rezervirana je za buduću upotrebu.

### Pregled izvršavanja

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Dohvati određeno izvršavanje prema ID-u
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// Prikaži nedavna izvršavanja za API ključ
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// Prebroji sva izvršavanja
const total = skillExecutor.countExecutions("api-key-id");
```

### Ponašanje ponovnih pokušaja

Postavka `maxRetries` pohranjuje se, ali je metoda `execute()` izvršitelja **trenutačno ne upotrebljava** — izvodi samo jedan pokušaj. Vrijednost `maxRetries` dostupna je za buduću implementaciju i za hookove koji je žele očitati.

Za sada se ponovni pokušaji moraju implementirati unutar samog rukovatelja vještine. Ugrađene
vještine registriraju se u izvršitelju (npr. `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` u `src/lib/skills/builtin/`); svaki rukovatelj
koji registrirate može obuhvatiti vlastitu petlju ponovnih pokušaja:

```ts
// unutar rukovatelja vještine
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

Enumeracija `SkillMode` (`src/lib/skills/types.ts`) određuje **kada i kako** se vještine pozivaju:

```ts
enum SkillMode {
  AUTO = "auto", // LLM odlučuje kada pozvati vještinu
  MANUAL = "manual", // Poziva se samo na izričit zahtjev korisnika
  HYBRID = "hybrid", // AUTO bodovanje + ručno nadjačavanje
}
```

> **Napomena**: Baza koda definira `SkillMode` (AUTO/MANUAL/HYBRID), dok polje `Skill.mode` upotrebljava drukčiji oblik (`"on" | "off" | "auto"`). Povezani su, ali nisu identični — `SkillMode` služi za pravila izvršitelja, dok `Skill.mode` služi za omogućavanje pojedinačne vještine.

### Kada upotrijebiti koji način rada

| Način rada | Ponašanje LLM-a                                                               | Slučaj upotrebe                                          |
| ---------- | ----------------------------------------------------------------------------- | -------------------------------------------------------- |
| `AUTO`     | LLM može pozvati vještinu kada to smatra potrebnim                            | Vještine opće namjene (čitanje datoteka, HTTP zahtjevi)  |
| `MANUAL`   | LLM ne može pozvati vještinu; poziva je samo izričit API poziv `executeSkill` | Osjetljive operacije (pisanje u bazu podataka, plaćanja) |
| `HYBRID`   | LLM može predložiti vještinu; korisnik je mora potvrditi                      | Vještine koje imaju nuspojave, ali nisu opasne           |

### AUTO bodovanje

Kada je način rada `AUTO` aktivan, svaka vještina kandidat boduje se u odnosu na kontekst
zahtjeva funkcijom `scoreAutoSkill()` u `src/lib/skills/injection.ts` — aditivnim
sustavom cjelobrojnih bodova (podudaranje naziva vještine, preklapanje tokena naziva/oznake/opisa,
naznake razloga u pozadini, bonus/kazna za naznaku pružatelja). Najboljih
`AUTO_MAX_SKILLS = 5` vještina s rezultatom `score >= AUTO_MIN_SCORE = 3` umeće se kao
alate koji se mogu pozivati, a izjednačenja se razrješavaju prema `installCount`, a zatim prema nazivu. Pogledajte cijelu tablicu bodova
u odjeljku [**Generiranje sheme alata → AUTO bodovanje**](#auto-scoring) ranije u ovom
dokumentu; ne postoji prag s decimalnim brojem poput `0.6` niti bodovanje u datoteci `registry.ts`.

---

## Katalog ugrađenih vještina

OmniRoute isporučuje odabrani skup ugrađenih vještina u `src/lib/skills/builtin/`. Najčešće su:

### Vještina automatizacije preglednika

Vještina preglednika (`src/lib/skills/builtin/browser.ts`) omogućuje automatizaciju preglednika bez grafičkog sučelja putem Playwrighta/Puppeteera. **Implementirana je, ali nije dio zadanog kataloga vještina** — kako biste je upotrebljavali, zasebno instalirajte dodatak za proširenje preglednika.

```ts
// Omogućite u svojoj konfiguraciji
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Uvijek zahtijevaj izričito pozivanje
  allowedSkills: ["browser"],
  timeout: 60000, // 60 s za učitavanje stranica
  maxRetries: 1,
};
```

### Ostale ugrađene kategorije

| Kategorija          | Vještine                                                      | Način rada |
| ------------------- | ------------------------------------------------------------- | ---------- |
| Ulaz/izlaz datoteka | `file_read`, `file_write`                                     | AUTO       |
| HTTP                | `http_request`                                                | AUTO       |
| Pretraživanje       | `web_search`                                                  | AUTO       |
| Izvršavanje koda    | `eval_code` (JavaScript/Python u izoliranom okruženju)        | HYBRID     |
| Sustav              | `execute_command` (izvršavanje CLI-ja u izoliranom okruženju) | MANUAL     |

### Dodavanje prilagođene vještine

Upute za dodavanje prilagođene vještine putem sustava dodataka potražite u dokumentu [SDK za dodatke i integracija vještina](./PLUGIN_SDK.md).

---

## Pogledajte i

- [MCP-SERVER.md](./MCP-SERVER.md) — registracija MCP alata i transporti
- [A2A-SERVER.md](./A2A-SERVER.md) — životni ciklus A2A zadatka i usmjeravanje vještina
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — uvod za korisnike
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — tijek obrade zahtjeva i mapa komponenti
- Izvor: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Testovi: `src/lib/skills/__tests__/integration.test.ts`
