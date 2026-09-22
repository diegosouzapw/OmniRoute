# Skills Framework (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Zdroj pravdy:** `src/lib/skills/` a `src/app/api/skills/`
> **Poslední aktualizace:** 2026-06-28 — v3.8.40

OmniRoute poskytuje rozšiřitelný framework Skills, který umožňuje jazykovým modelům (a operátorům) skládat opakovaně použitelné schopnosti — od čtení souborového systému a HTTP požadavků až po spouštění kódu v sandboxu a pečlivě vybrané dovednosti z tržiště.

Dovednost je verzovaná jednotka práce definovaná schématem. OmniRoute může vložit dovednosti jako definice nástrojů do odchozích požadavků, zachytit volání nástrojů vracející se z modelu, spustit odpovídající obslužnou rutinu a předat výsledek zpět modelu, aby konverzace mohla pokračovat. Model nikdy nevidí implementaci — pouze rozhraní nástroje.

---

## Agent Skills vs Omni Skills

OmniRoute obsahuje dva odlišné, ale vzájemně se doplňující systémy dovedností:

| Oblast         | **Omni Skills** (tento dokument)                                          | **Agent Skills**                                                                               |
| :------------- | :------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------- |
| Účel           | Vkládání nástrojů pro LLM + spouštění v sandboxu                          | Katalog SKILL.md určený k objevování a používání externími agenty                              |
| Zdroj pravdy   | `src/lib/skills/` + tržiště                                               | `src/lib/agentSkills/` + adresář `skills/`                                                     |
| Režim běhu     | Vkládány do odchozích požadavků, spouštěny při událostech volání nástrojů | Statický katalog v markdownu + koncové body REST/MCP/A2A pro objevování                        |
| Kdo je používá | Samotný OmniRoute (kombinované směrování, příchozí volání LLM)            | Externí agenti, klienti MCP, orchestrátory A2A                                                 |
| Počet          | Proměnlivý (řízený tržištěm)                                              | 45 položek katalogu (23 API + 21 CLI + 1 konfigurace)                                          |
| Formát         | `SkillDefinition` se schématem nástroje + obslužnou rutinou               | Frontmatter `SKILL.md` + tělo v markdownu                                                      |
| Objevování     | REST `/api/skills/*` + nástroje MCP `omniroute_skills_*`                  | REST `/api/agent-skills/*` + nástroje MCP `omniroute_agent_skills_*` + A2A `list-capabilities` |

**Omni Skills** představují výkonné jádro — definují, co OmniRoute _dokáže udělat_, když LLM vyvolá nástroj.

**Agent Skills** představují katalog dokumentace — vysvětlují externím agentům, _jak používat_ REST API a CLI systému OmniRoute, prostřednictvím strukturovaných souborů SKILL.md, které lze přímo vložit do promptů agentů.

Informace o katalogu Agent Skills, generátoru, nástrojích MCP a dovednosti A2A naleznete v dokumentu [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## Koncepty

### Zdroje dovedností

Ve stejném registru společně existují tři zdroje dovedností:

1. **Vestavěné dovednosti** (`src/lib/skills/builtins.ts`) — dodávají se s OmniRoute. Pokrývají běžné případy:
   - `file_read`, `file_write` — pracovní prostor sandboxu pro jednotlivé API klíče v umístění `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — odchozí HTTP prostřednictvím `safeOutboundFetch` s nastavením `guard: "public-only"`
   - `web_search` — zaměnitelný poskytovatel vyhledávání s ukládáním do mezipaměti (`executeWebSearch`)
   - `eval_code` — spouštění `node` nebo `python` v sandboxu Dockeru
   - `execute_command` — spouštění příkazů shellu v sandboxu Dockeru
   - `browser` — základní infrastruktura využívající Playwright, ve výchozím nastavení vypnutá (`builtin/browser.ts`)
2. **SkillsMP** (tržiště OmniRoute) — načítá se z `https://skillsmp.com/api/v1/skills/search`. Vyžaduje `skillsmpApiKey` v Nastavení.
3. **SkillsSH** (komunitní katalog `skills.sh`) — načítá se z `https://skills.sh/api/search`. Nevyžaduje ověření; obsah SKILL.md se stahuje přímo z GitHubu ve formátu raw.

Jeden „aktivní poskytovatel“ určuje, ze kterého katalogu bude ovládací panel instalovat (`src/lib/skills/providerSettings.ts`). Změnit jej můžete v části **Nastavení → Paměť a dovednosti**. Výchozí hodnota: `skillsmp`.

### Identita dovednosti

Dovednosti jsou v registru v paměti (`src/lib/skills/registry.ts`) identifikovány pomocí `name@version`. Verze musí odpovídat formátu semver (`^\d+\.\d+\.\d+$`). Funkce `resolveVersion()` podporuje omezení `^`, `~`, `>`, `>=`, `<`, `<=`, `==` a přesnou shodu.

### Režim dovednosti

Každá dovednost má režim běhu, který určuje, kdy bude vložena:

| Režim  | Chování                                                                                                        |
| ------ | -------------------------------------------------------------------------------------------------------------- |
| `on`   | Vždy vložena jako definice nástroje                                                                            |
| `off`  | Nikdy nevložena ani spustitelná                                                                                |
| `auto` | Vyhodnocena vůči příchozímu požadavku; vložena pouze tehdy, pokud skóre ≥ `AUTO_MIN_SCORE` (výchozí hodnota 3) |

`auto` je výchozí režim pro dovednosti nainstalované z tržiště. Kombinace `enabled=true` a `mode="off"` znamená „registrována, ale neaktivní“ — přepnutí `enabled` prostřednictvím staršího sloupce také upraví `mode`, aby starší cesty kódu zůstaly konzistentní (`src/app/api/skills/[id]/route.ts`).

### Stav (spuštění)

Spuštění dovedností jsou sledována v tabulce `skill_executions` s následujícími stavy (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Mezipaměť registru

`SkillRegistry` je singleton s mezipamětí a dobou platnosti 60 sekund (`registry.ts:14`). Funkce `loadFromDatabase()` je idempotentní a slučuje souběžná volání prostřednictvím `pendingLoad`. Každý zápis (`register`/`unregister`/`unregisterById`) zneplatní mezipaměť. Verze vyhledávejte pomocí `getSkillVersions(name)` a `resolveVersion(name, constraint)`.

### Vkládání s ohledem na poskytovatele

`injectSkills()` v `src/lib/skills/injection.ts` je vstupní bod, který převádí registrované dovednosti na definice nástrojů specifické pro daného poskytovatele:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

Název nástroje je zakódován jako `name@version`, aby obslužná rutina mohla při zpětném volání modelem vybrat správnou verzi.

### Vyhodnocování AUTO

Když je nastaveno `mode="auto"`, každá kandidátní dovednost je ohodnocena vůči kontextu požadavku (`scoreAutoSkill()` v `injection.ts`):

| Signál                                                              | Body        |
| ------------------------------------------------------------------- | ----------- |
| Název dovednosti se doslovně vyskytuje v kontextu                   | +6          |
| Každý token názvu odpovídá tokenu kontextu                          | +2          |
| Každý podřetězec štítku odpovídá kontextu                           | +3          |
| Každý token popisu odpovídá kontextu                                | +1          |
| Důvod na pozadí odpovídá tokenu názvu                               | +2 za token |
| Důvod na pozadí odpovídá štítku                                     | +2 za token |
| Nápověda poskytovatele ve štítcích odpovídá poskytovateli požadavku | +2 / −2     |

Je vloženo nejvýše `AUTO_MAX_SKILLS = 5` dovedností s `score >= AUTO_MIN_SCORE = 3`. Shody jsou rozhodnuty podle `installCount` (sestupně) a poté podle názvu v abecedním pořadí (`injection.ts:225-235`).

### Zachytávání volání nástrojů

`handleToolCallExecution()` v `src/lib/skills/interception.ts` je volána obslužnou rutinou chatu poté, co upstream vrátí odpověď s voláním nástroje:

1. `extractToolCalls()` čte tvary specifické pro jednotlivé poskytovatele (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Nejprve jsou přeloženy aliasy vestavěných nástrojů (např. `omniroute_web_search` → `web_search`). Vestavěné obslužné rutiny se spouštějí přímo.
3. Vše ostatní je směrováno přes `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`.
4. Výsledky jsou vloženy zpět do odpovědi — podle potřeby jako položky `tool_results`, `function_call_output` nebo bloky Anthropic `tool_result`.

`customSkillExecutionEnabled` v kontextu spuštění lze nastavit na `false`, aby bylo povoleno pouze zachytávání vestavěných nástrojů (používá se u cest požadavků, které explicitně zakazují uživatelsky definované obslužné rutiny).

---

## Sandbox Dockeru

Cesty kódu, které nejsou vestavěné (`eval_code`, `execute_command`), se spouštějí uvnitř Dockeru prostřednictvím `SandboxRunner` (`src/lib/skills/sandbox.ts`). Každý kontejner se spouští s následujícími parametry:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (když readOnly=true)
```

Výchozí hodnoty (`SandboxRunner.DEFAULT_CONFIG`):

| Pole             | Výchozí hodnota | Poznámky                                                      |
| ---------------- | --------------- | ------------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU) | Před předáním do `--cpus` se vydělí 1000                      |
| `memoryLimit`    | 256 MB          | Pevný limit                                                   |
| `timeout`        | 30000 ms        | Šetrné ukončení pomocí `SIGTERM` + `docker kill`              |
| `networkEnabled` | `false`         | Převede se na `--network none`                                |
| `readOnly`       | `true`          | Kořenový FS pouze pro čtení; `/tmp` a `/workspace` jsou tmpfs |

Pro ukončení jsou zpřístupněny metody `SandboxRunner.kill(id)` a `killAll()`; spuštěné kontejnery jsou sledovány v `runningContainers: Map<string, ChildProcess>`.

### Proměnné prostředí sandboxu

Konfigurují se prostřednictvím `process.env` v `src/lib/skills/builtins.ts`:

| Proměnná prostředí                | Výchozí hodnota  | Účel                                                                                                     |
| --------------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB) | Limit pro `file_read` a `file_write`                                                                     |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`         | Limit těla odpovědi `http_request`                                                                       |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`         | Limit stdout/stderr vrácených volajícímu                                                                 |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`          | Výchozí časový limit příkazů v sandboxu; omezen na maximálně 60 s                                        |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`          | Hlavní přepínač odchozího provozu. Nastavením na `1` nebo `true` povolíte aktivaci pro jednotlivá volání |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (viz níže)       | Čárkami oddělený seznam povolených obrazů Dockeru                                                        |

Výchozí povolené obrazy: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. Veškeré položky přidané prostřednictvím `SKILLS_ALLOWED_SANDBOX_IMAGES` se sloučí s výchozími hodnotami; neznámé obrazy jsou funkcí `normalizeImage()` odmítnuty.

> Poznámka: neexistuje žádná samostatná proměnná prostředí `SKILLS_EXECUTION_TIMEOUT_MS`. Časový limit obslužné rutiny mimo sandbox je v `SkillExecutor` (`executor.ts:13`) pevně nastaven na 30 s, ale za běhu jej lze přepsat pomocí `skillExecutor.setTimeout(ms)`.

### Izolace pracovního prostoru

`file_read` a `file_write` překládají každou cestu relativně k pracovnímu prostoru příslušnému danému API klíči v `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`. Průchod mimo adresář (`..`) a zakázané segmenty (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) jsou odmítnuty ještě před jakoukoli diskovou I/O operací.

### Zabezpečení HTTP

`http_request` (`builtins.ts:257`):

- Seznam povolených metod: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Blokované odchozí hlavičky: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Přesměrování jsou zakázána (`allowRedirect: false`)
- Směrování probíhá prostřednictvím `safeOutboundFetch` s `guard: "public-only"` (privátní rozsahy a rozsahy zpětné smyčky jsou blokovány)
- Odpověď je zkrácena na `SKILLS_MAX_HTTP_RESPONSE_BYTES`; klient obdrží `truncated: true`

---

## Hybridní vykonavatel (náhled)

Soubor `src/lib/skills/hybrid.ts` definuje `HybridExecutor`, který pro každé volání rozhoduje mezi spuštěním `direct` (v rámci procesu) a `sandbox`, přičemž při chybách časového limitu nebo nedostatku paměti nabízí cestu opakovaného pokusu `autoUpgrade`. Zapojené implementace `directExecutor` / `sandboxRunner` jsou pouze zástupné (`executeDirect`, `executeInSandbox` vracejí zástupné objekty) — tento modul považujte za rozpracovaný kontrakt. Skutečné spouštění stále probíhá prostřednictvím `skillExecutor` + `SandboxRunner`.

---

## Úložiště

Schéma se nachází ve dvou migracích:

- `src/lib/db/migrations/016_create_skills.sql` — základní tabulky `skills` a `skill_executions` s indexy nad `(api_key_id, name)` a `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — přidává do `skills` pole `mode`, `source_provider`, `tags` (JSON) a `install_count`.

Hodnota `skill_executions.status` je omezena na úrovni databáze: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## REST API

Všechny koncové body se nacházejí pod `src/app/api/skills/`. Koncové body pro správu (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) vyžadují **ověření správce** prostřednictvím `requireManagementAuth()`. Toky tržiště a instalace používají méně přísnou funkci `isAuthenticated()` (relace nebo klíč API).

| Koncový bod | Metoda | Účel |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Výpis registrovaných dovedností. Podporuje `?q=`, `?mode=on              | off | auto`, `?source=skillsmp | skillssh | local`, stránkování |
| `/api/skills/[id]` | PUT | Aktualizace `enabled` nebo `mode` |
| `/api/skills/[id]` | DELETE | Zrušení registrace podle ID |
| `/api/skills/install` | POST | Instalace vlastní dovednosti (kód obslužné rutiny + schéma) |
| `/api/skills/marketplace` | GET | Vyhledávání v katalogu SkillsMP (pokud je `q` prázdné, vrací oblíbené výchozí položky) |
| `/api/skills/marketplace/install` | POST | Instalace dovednosti SkillsMP (vyžaduje aktivního poskytovatele = `skillsmp`) |
| `/api/skills/skillssh` | GET | Vyhledávání v katalogu skills.sh (`?q=&limit=`, omezeno na 100) |
| `/api/skills/skillssh/install` | POST | Instalace dovednosti skills.sh (vyžaduje aktivního poskytovatele = `skillssh`) |
| `/api/skills/executions` | GET | Stránkovaná historie spuštění (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Ad hoc spuštění registrované dovednosti |

Koncový bod `POST /api/skills/executions` vrací HTTP `503` s `{ error: "Skills execution is disabled..." }`, pokud `settings.skillsEnabled === false` (`executor.ts:42-45`). Operátoři mohou hlavní přepínač změnit v části **Nastavení → AI**.

### Příklad: instalace vlastní dovednosti

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

Řetězec `handlerCode` slouží k **vyhledání názvu obslužné rutiny** — nejde o spustitelný kód. Vykonavatel jej mapuje prostřednictvím `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`). Instalace z tržiště ukládají text SKILL.md do tohoto pole jako dokumentaci a směrují spuštění přes volání nástrojů generovaná modelem. Libovolný zdrojový kód dodaný uživatelem se nevyhodnocuje pomocí eval.

---

## Nástroje MCP

Čtyři nástroje MCP obalují rozhraní dovedností (`open-sse/mcp-server/tools/skillTools.ts`). Automaticky se registrují při spuštění serveru MCP.

| Nástroj                       | Popis                                                              |
| ----------------------------- | ------------------------------------------------------------------ |
| `omniroute_skills_list`       | Vypíše dovednosti; volitelné filtry: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | Povolí/zakáže dovednost podle `skillId`                            |
| `omniroute_skills_execute`    | Spustí dovednost se vstupní datovou částí                          |
| `omniroute_skills_executions` | Historie nedávných spuštění (výchozí 50, maximálně 100)            |

Nastavení přenosu a přiřazení rozsahů oprávnění naleznete v souboru [MCP-SERVER.md](./MCP-SERVER.md).

---

## Integrace A2A

`src/lib/skills/a2a.ts` exportuje deskriptor dovednosti A2A `memory_aware_routing` a pomocnou funkci `registerA2ASkill(registry)`. Vlastní dovednosti A2A se nacházejí v `src/lib/a2a/skills/` a jsou směrovány prostřednictvím `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`). Úplný životní cyklus úlohy naleznete v souboru [A2A-SERVER.md](./A2A-SERVER.md).

---

## Přidání nové vestavěné dovednosti

1. **Definujte obslužnou funkci** v `src/lib/skills/builtins.ts` (nebo v souvisejícím souboru v adresáři `src/lib/skills/builtin/`). Signatura: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Cesta kódu v sandboxu?** Zavolejte `sandboxRunner.run(image, command, env, sandboxConfig({...}))`. Pro kontrolu vůči seznamu povolených položek použijte `normalizeImage()`.
3. **Cesta v souborovém systému?** Před přístupem k disku ji vždy předejte funkci `resolveWorkspacePath(input, context)`.
4. **Síťové volání?** Použijte `safeOutboundFetch` s `guard: "public-only"`; hlavičky vyčistěte pomocí `sanitizeHeaders()`.
5. **Zaregistrujte dovednost** přidáním položky do `builtinSkills` (nebo zavoláním funkce ve stylu `registerBrowserSkill(executor)` při spuštění).
6. **Propojte aliasy vestavěných nástrojů** (volitelné) v `BUILTIN_TOOL_ALIASES` (`interception.ts:23`), pokud nadřazený model používá jiný název.
7. **Testy** umístěte do `src/lib/skills/__tests__/` (Vitest).

---

## Přidání vlastní (nevestavěné) dovednosti

1. Při spuštění procesu zaregistrujte obslužnou funkci:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Vložte dovednost prostřednictvím `POST /api/skills/install` (pole `handlerCode` musí odpovídat názvu registrované obslužné funkce).
3. Přepněte `mode` na `on` nebo `auto` prostřednictvím `PUT /api/skills/[id]`.

---

## Provozní tipy

- **Hlavní přepínač:** `settings.skillsEnabled = false` zablokuje všechna spuštění a na `/api/skills/executions` vrátí HTTP `503`. Registr se nadále načítá.
- **Omezení odchozího provozu:** pro plně izolovaný sandbox ponechte `SKILLS_SANDBOX_NETWORK_ENABLED` nenastavenou (výchozí stav). Hodnota `networkEnabled: true` pro jednotlivé volání stále vyžaduje povolení hlavním přepínačem.
- **Povolení konkrétních obrazů:** nastavením `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` rozšíříte seznam povolených obrazů.
- **Audit spuštění:** `/dashboard/skills/executions` i `omniroute_skills_executions` se dotazují na `skill_executions`. Úspěšná spuštění obsahují `durationMs`; neúspěšná obsahují `errorMessage`.
- **Invalidace mezipaměti:** po ručních úpravách databáze zavolejte `skillRegistry.invalidateCache()`; jinak počkejte 60 s.
- **Anonymní pracovní prostor:** pokud je `apiKeyId` prázdné, všechna volání se mapují do stejného pracovního prostoru `"anonymous"` — kód pracující se sdílením by měl vždy předávat skutečný klíč.

---

## Životní cyklus spuštění (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) je **singleton**, který spravuje každé spuštění dovednosti. Pochopení jeho životního cyklu je zásadní pro ladění časových limitů, opakovaných pokusů a stavu spuštění.

### Pětifázový životní cyklus

```
   volání execute()
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← ve frontě, dosud nezahájeno (vytvořen řádek v DB)
  └──────┬──────┘
         │ spuštění handleru
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← handler vyvolán s časovým limitem
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (žádná jiná cesta — ukončeno nadřazeným procesem)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   Řádek v DB aktualizován o stav, výstup a durationMs
```

### Výchozí konfigurace

| Nastavení    | Výchozí        | Lze konfigurovat pomocí              |
| ------------ | -------------- | ------------------------------------ |
| `timeout`    | `30000` (30 s) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`            | `skillExecutor.setMaxRetries(count)` |

> **Důležité**: Executor je singleton — volání `setTimeout()` globálně ovlivní všechna následující spuštění. Časové limity pro jednotlivé dovednosti nejsou v současnosti podporovány; pokud pro různé dovednosti potřebujete různé časové limity, spusťte samostatné procesy nebo vytvořte vlastní variantu executoru.

### Hodnoty stavu

Ze souboru `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // Ve frontě, dosud nezahájeno
  RUNNING = "running", // Handler byl vyvolán
  SUCCESS = "success", // Handler vrátil platný výstup
  ERROR = "error", // Handler vyvolal výjimku
  TIMEOUT = "timeout", // Překročen časový limit executoru
}
```

> **Poznámka**: Stav `TIMEOUT` je definován ve výčtu, ale současná implementace executoru jej **ve skutečnosti nezapisuje do DB** — překročení časového limitu se projeví jako `ERROR` se zprávou `"Skill execution timed out"`. Hodnota ve výčtu stavů je vyhrazena pro budoucí použití.

### Kontrola spuštění

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Získání konkrétního spuštění podle ID
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// Výpis nedávných spuštění pro klíč API
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// Zjištění celkového počtu spuštění
const total = skillExecutor.countExecutions("api-key-id");
```

### Chování opakovaných pokusů

Nastavení `maxRetries` se ukládá, ale metoda `execute()` executoru jej **v současnosti nepoužívá** — provádí pouze jeden pokus. Hodnota `maxRetries` je zpřístupněna pro budoucí implementaci a pro hooky, které ji chtějí načíst.

Prozatím musí být opakované pokusy implementovány přímo v handleru dovednosti. Vestavěné
dovednosti jsou registrovány v executoru (např. `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` v `src/lib/skills/builtin/`); libovolný zaregistrovaný handler
může obsahovat vlastní smyčku opakovaných pokusů:

```ts
// uvnitř handleru dovednosti
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

## SkillMode podrobně

Výčet `SkillMode` (`src/lib/skills/types.ts`) určuje, **kdy a jak** jsou dovednosti vyvolávány:

```ts
enum SkillMode {
  AUTO = "auto", // LLM rozhoduje, kdy dovednost zavolat
  MANUAL = "manual", // Vyvoláno pouze na výslovnou žádost uživatele
  HYBRID = "hybrid", // Bodování AUTO + ruční přepsání
}
```

> **Poznámka**: Kódová základna definuje `SkillMode` (AUTO/MANUAL/HYBRID), zatímco pole `Skill.mode` používá jiný formát (`"on" | "off" | "auto"`). Souvisejí spolu, ale nejsou totožné — `SkillMode` slouží pro zásady vykonavatele, zatímco `Skill.mode` slouží k povolení jednotlivých dovedností.

### Kdy použít jednotlivé režimy

| Režim    | Chování LLM                                                                        | Případ použití                                               |
| -------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| `AUTO`   | LLM může dovednost zavolat, když to považuje za nutné                              | Univerzální dovednosti (čtení souborů, HTTP požadavky)       |
| `MANUAL` | LLM nemůže dovednost zavolat; vyvolá ji pouze explicitní volání API `executeSkill` | Citlivé operace (zápisy do databáze, platby)                 |
| `HYBRID` | LLM může dovednost navrhnout; uživatel ji musí potvrdit                            | Dovednosti s vedlejšími účinky, které však nejsou nebezpečné |

### Bodování AUTO

Když je aktivní režim `AUTO`, každá kandidátní dovednost je porovnána s kontextem
požadavku a obodována funkcí `scoreAutoSkill()` v `src/lib/skills/injection.ts` — pomocí aditivního
systému celočíselných bodů (shoda názvu dovednosti, překryv tokenů názvu/značek/popisů,
nápovědy z důvodů na pozadí, bonus/postih za nápovědu poskytovatele). Nejvýše
`AUTO_MAX_SKILLS = 5` dovedností se `score >= AUTO_MIN_SCORE = 3` je vloženo jako
volatelné nástroje; shody jsou rozhodnuty nejprve podle `installCount` a poté podle názvu. Úplnou tabulku bodů
najdete výše v tomto dokumentu v části [**Generování schématu nástrojů → Bodování AUTO**](#auto-scoring);
neexistuje žádná prahová hodnota ve stylu desetinného čísla `0.6` ani žádné bodování v `registry.ts`.

---

## Katalog vestavěných dovedností

OmniRoute se dodává s pečlivě vybranou sadou vestavěných dovedností v `src/lib/skills/builtin/`. Nejběžnější z nich:

### Dovednost automatizace prohlížeče

Dovednost prohlížeče (`src/lib/skills/builtin/browser.ts`) poskytuje automatizaci bezhlavého prohlížeče prostřednictvím Playwright/Puppeteer. **Je implementována, ale není součástí výchozího katalogu dovedností** — chcete-li ji používat, nainstalujte samostatně plugin rozšíření prohlížeče.

```ts
// Povolte ve své konfiguraci
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Vždy vyžadovat explicitní vyvolání
  allowedSkills: ["browser"],
  timeout: 60000, // 60 s pro načtení stránek
  maxRetries: 1,
};
```

### Další vestavěné kategorie

| Kategorie              | Dovednosti                                   | Režim  |
| ---------------------- | -------------------------------------------- | ------ |
| Souborový vstup/výstup | `file_read`, `file_write`                    | AUTO   |
| HTTP                   | `http_request`                               | AUTO   |
| Vyhledávání            | `web_search`                                 | AUTO   |
| Spouštění kódu         | `eval_code` (JavaScript/Python v sandboxu)   | HYBRID |
| Systém                 | `execute_command` (spouštění CLI v sandboxu) | MANUAL |

### Přidání vlastní dovednosti

Informace o přidání vlastní dovednosti prostřednictvím systému pluginů najdete v dokumentu [SDK pro pluginy a integrace dovedností](./PLUGIN_SDK.md).

---

## Viz také

- [MCP-SERVER.md](./MCP-SERVER.md) — registrace nástrojů MCP a transporty
- [A2A-SERVER.md](./A2A-SERVER.md) — životní cyklus úloh A2A a směrování dovedností
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — úvod pro uživatele
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — zpracování požadavků a mapa komponent
- Zdroj: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Testy: `src/lib/skills/__tests__/integration.test.ts`
