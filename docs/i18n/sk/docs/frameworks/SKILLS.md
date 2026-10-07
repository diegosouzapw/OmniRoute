# Skills Framework (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Zdroj pravdy:** `src/lib/skills/` a `src/app/api/skills/`
> **Posledná aktualizácia:** 2026-06-28 — v3.8.40

OmniRoute poskytuje rozšíriteľný rámec Skills, ktorý umožňuje jazykovým modelom (a operátorom) skladať opakovane použiteľné funkcie — od čítania súborového systému a HTTP požiadaviek až po spúšťanie kódu v sandboxe a overené zručnosti z trhoviska.

Zručnosť je verzovaná, schémou definovaná jednotka práce. OmniRoute môže vložiť zručnosti ako definície nástrojov do odchádzajúcich požiadaviek, zachytiť volania nástrojov prichádzajúce späť z modelu, spustiť zodpovedajúcu obslužnú rutinu a odovzdať výsledok späť modelu, aby mohla konverzácia pokračovať. Model nikdy nevidí implementáciu — iba rozhranie nástroja.

---

## Agent Skills verzus Omni Skills

OmniRoute má dva odlišné, ale vzájomne sa dopĺňajúce systémy zručností:

| Dimenzia       | **Omni Skills** (tento dokument)                                                       | **Agent Skills**                                                                               |
| :------------- | :------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| Účel           | Vkladanie nástrojov LLM + spúšťanie v sandboxe                                         | Katalóg SKILL.md, ktorý môžu externí agenti objavovať a používať                               |
| Zdroj pravdy   | `src/lib/skills/` + trhovisko                                                          | `src/lib/agentSkills/` + adresár `skills/`                                                     |
| Režim za behu  | Vkladajú sa do odchádzajúcich požiadaviek a spúšťajú pri udalostiach volania nástrojov | Statický katalóg vo formáte markdown + koncové body REST/MCP/A2A na vyhľadávanie               |
| Kto ho používa | Samotný OmniRoute (kombinované smerovanie, prichádzajúce volania LLM)                  | Externí agenti, klienti MCP, orchestrátory A2A                                                 |
| Počet          | Premenlivý (riadený trhoviskom)                                                        | 45 položiek katalógu (23 API + 21 CLI + 1 konfigurácia)                                        |
| Formát         | `SkillDefinition` so schémou nástroja + obslužnou rutinou                              | Frontmatter `SKILL.md` + telo vo formáte markdown                                              |
| Vyhľadávanie   | REST `/api/skills/*` + nástroje MCP `omniroute_skills_*`                               | REST `/api/agent-skills/*` + nástroje MCP `omniroute_agent_skills_*` + A2A `list-capabilities` |

**Omni Skills** predstavujú vykonávací mechanizmus — definujú, čo OmniRoute _dokáže vykonať_, keď LLM vyvolá nástroj.

**Agent Skills** predstavujú katalóg dokumentácie — vysvetľujú externým agentom, _ako používať_ REST API a CLI systému OmniRoute, pričom používajú štruktúrované súbory SKILL.md, ktoré možno priamo vložiť do promptov agentov.

Informácie o katalógu Agent Skills, generátore, nástrojoch MCP a zručnosti A2A nájdete v dokumente [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## Koncepty

### Zdroje zručností

V rovnakom registri existujú súčasne tri zdroje zručností:

1. **Vstavané zručnosti** (`src/lib/skills/builtins.ts`) — dodávajú sa spolu s OmniRoute. Pokrývajú bežné prípady:
   - `file_read`, `file_write` — pracovný priestor sandboxu pre každý kľúč API v `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — odchádzajúce HTTP prostredníctvom `safeOutboundFetch` s `guard: "public-only"`
   - `web_search` — vymeniteľný poskytovateľ vyhľadávania s ukladaním do vyrovnávacej pamäte (`executeWebSearch`)
   - `eval_code` — spúšťanie `node` alebo `python` v sandboxe Docker
   - `execute_command` — spúšťanie príkazov shellu v sandboxe Docker
   - `browser` — základná infraštruktúra využívajúca Playwright, predvolene vypnutá (`builtin/browser.ts`)
2. **SkillsMP** (trhovisko OmniRoute) — načítava sa z `https://skillsmp.com/api/v1/skills/search`. Vyžaduje `skillsmpApiKey` v nastaveniach.
3. **SkillsSH** (komunitný katalóg `skills.sh`) — načítava sa z `https://skills.sh/api/search`. Nevyžaduje sa žiadne overenie; obsah SKILL.md sa získava priamo zo služby GitHub raw.

Jeden „aktívny poskytovateľ“ určuje, z ktorého katalógu ovládací panel inštaluje zručnosti (`src/lib/skills/providerSettings.ts`). Môžete ho zmeniť v časti **Nastavenia → Pamäť a zručnosti**. Predvolená hodnota: `skillsmp`.

### Identita zručnosti

Zručnosti sú v registri v pamäti (`src/lib/skills/registry.ts`) identifikované pomocou `name@version`. Verzia musí byť vo formáte semver (`^\d+\.\d+\.\d+$`). Funkcia `resolveVersion()` rozpoznáva obmedzenia `^`, `~`, `>`, `>=`, `<`, `<=`, `==` a presnú zhodu.

### Režim zručnosti

Každá zručnosť má režim behu, ktorý určuje, kedy sa vloží:

| Režim  | Správanie                                                                                                                 |
| ------ | ------------------------------------------------------------------------------------------------------------------------- |
| `on`   | Vždy sa vloží ako definícia nástroja                                                                                      |
| `off`  | Nikdy sa nevloží a nemožno ju spustiť                                                                                     |
| `auto` | Vyhodnotí sa vzhľadom na prichádzajúcu požiadavku; vloží sa iba vtedy, ak skóre ≥ `AUTO_MIN_SCORE` (predvolená hodnota 3) |

`auto` je predvolený režim pre zručnosti nainštalované z trhoviska. Kombinácia `enabled=true` a `mode="off"` znamená „zaregistrovaná, ale neaktívna“ — prepnutie hodnoty `enabled` prostredníctvom staršieho stĺpca aktualizuje aj `mode`, aby staršie časti kódu zostali konzistentné (`src/app/api/skills/[id]/route.ts`).

### Stav (spustenia)

Spustenia zručností sa sledujú v tabuľke `skill_executions` s nasledujúcimi stavmi (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Vyrovnávacia pamäť registra

`SkillRegistry` je singleton so 60-sekundovou vyrovnávacou pamäťou TTL (`registry.ts:14`). Funkcia `loadFromDatabase()` je idempotentná a pomocou `pendingLoad` odstraňuje duplicity súbežných volaní. Každý zápis (`register`/`unregister`/`unregisterById`) zneplatní vyrovnávaciu pamäť. Verzie môžete vyhľadať pomocou `getSkillVersions(name)` a `resolveVersion(name, constraint)`.

### Vkladanie zohľadňujúce poskytovateľa

`injectSkills()` v `src/lib/skills/injection.ts` je vstupný bod, ktorý prevádza zaregistrované zručnosti na definície nástrojov špecifické pre poskytovateľa:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

Názov nástroja je zakódovaný ako `name@version`, aby obslužná rutina mohla vybrať správnu verziu, keď ho model spätne zavolá.

### AUTO vyhodnocovanie

Keď je `mode="auto"`, každá kandidátska zručnosť sa vyhodnotí voči kontextu požiadavky (`scoreAutoSkill()` v `injection.ts`):

| Signál                                                                  | Body        |
| ----------------------------------------------------------------------- | ----------- |
| Názov zručnosti sa doslovne nachádza v kontexte                         | +6          |
| Každý token názvu sa zhoduje s tokenom kontextu                         | +2          |
| Každý podreťazec značky sa zhoduje s kontextom                          | +3          |
| Každý token opisu sa zhoduje s kontextom                                | +1          |
| Dôvod na pozadí sa zhoduje s tokenom názvu                              | +2 za token |
| Dôvod na pozadí sa zhoduje so značkou                                   | +2 za token |
| Pomôcka poskytovateľa v značkách sa zhoduje s poskytovateľom požiadavky | +2 / −2     |

Vloží sa najviac `AUTO_MAX_SKILLS = 5` zručností so `score >= AUTO_MIN_SCORE = 3`. Zhody sa rozhodujú podľa `installCount` (zostupne) a potom podľa názvu v abecednom poradí (`injection.ts:225-235`).

### Zachytávanie volaní nástrojov

`handleToolCallExecution()` v `src/lib/skills/interception.ts` je vyvolaná obslužnou rutinou chatu po tom, ako nadradená služba vráti odpoveď s volaním nástroja:

1. `extractToolCalls()` načíta formáty špecifické pre poskytovateľa (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Najprv sa rozpoznajú aliasy vstavaných nástrojov (napr. `omniroute_web_search` → `web_search`). Vstavané obslužné rutiny sa spustia priamo.
3. Všetko ostatné sa smeruje cez `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`.
4. Výsledky sa vložia späť do odpovede — podľa potreby ako položky `tool_results`, `function_call_output` alebo bloky Anthropic `tool_result`.

`customSkillExecutionEnabled` v kontexte vykonávania možno nastaviť na `false`, aby sa povolilo iba zachytávanie vstavaných nástrojov (používa sa pri cestách požiadaviek, ktoré explicitne zakazujú používateľom definované obslužné rutiny).

---

## Sandbox Docker

Cesty kódu, ktoré nie sú vstavané (`eval_code`, `execute_command`), sa spúšťajú v Dockeri prostredníctvom `SandboxRunner` (`src/lib/skills/sandbox.ts`). Každý kontajner sa spúšťa s:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (keď readOnly=true)
```

Predvolené hodnoty (`SandboxRunner.DEFAULT_CONFIG`):

| Pole             | Predvolená hodnota | Poznámky                                                   |
| ---------------- | ------------------ | ---------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU)    | Pred odovzdaním do `--cpus` sa vydelí číslom 1000          |
| `memoryLimit`    | 256 MB             | Pevný limit                                                |
| `timeout`        | 30000 ms           | Šetrné ukončenie cez `SIGTERM` + `docker kill`             |
| `networkEnabled` | `false`            | Zmení sa na `--network none`                               |
| `readOnly`       | `true`             | Koreňový FS iba na čítanie; `/tmp` a `/workspace` sú tmpfs |

Metódy `SandboxRunner.kill(id)` a `killAll()` sú sprístupnené na ukončenie; spustené kontajnery sa sledujú v `runningContainers: Map<string, ChildProcess>`.

### Premenné prostredia sandboxu

Konfigurované prostredníctvom `process.env` v `src/lib/skills/builtins.ts`:

| Premenná prostredia               | Predvolená hodnota | Účel                                                                                                                      |
| --------------------------------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB)   | Limit pre `file_read` a `file_write`                                                                                      |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`           | Limit pre telo odpovede `http_request`                                                                                    |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`           | Limit pre stdout/stderr vrátený volajúcemu                                                                                |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`            | Predvolený časový limit príkazov v sandboxe; obmedzený na 60 s                                                            |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`            | Hlavné povolenie odchádzajúcej komunikácie. Nastavte na `1` alebo `true`, aby bolo možné povolenie pre jednotlivé volania |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (pozri nižšie)     | Čiarkami oddelený zoznam povolených obrazov Dockeru                                                                       |

Predvolene povolené obrazy: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. Všetky položky pridané prostredníctvom `SKILLS_ALLOWED_SANDBOX_IMAGES` sa zlúčia s predvolenými hodnotami; neznáme obrazy funkcia `normalizeImage()` odmietne.

> Poznámka: neexistuje samostatná premenná prostredia `SKILLS_EXECUTION_TIMEOUT_MS`. Časový limit obslužného mechanizmu mimo sandboxu je v `SkillExecutor` (`executor.ts:13`) pevne nastavený na 30 s, ale počas behu ho možno prepísať prostredníctvom `skillExecutor.setTimeout(ms)`.

### Izolácia pracovného priestoru

`file_read` a `file_write` prekladajú každú cestu relatívne k pracovnému priestoru príslušnému danému kľúču API v `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`. Prechod mimo adresára (`..`) a zakázané segmenty (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) sa odmietnu ešte pred akoukoľvek diskovou I/O operáciou.

### Zabezpečenie HTTP

`http_request` (`builtins.ts:257`):

- Zoznam povolených metód: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Blokované odchádzajúce hlavičky: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Presmerovania sú zakázané (`allowRedirect: false`)
- Smerované prostredníctvom `safeOutboundFetch` s `guard: "public-only"` (súkromné rozsahy a rozsahy spätnej slučky sú blokované)
- Odpoveď sa skráti pri `SKILLS_MAX_HTTP_RESPONSE_BYTES`; klient uvidí `truncated: true`

---

## Hybridný exekútor (ukážková verzia)

`src/lib/skills/hybrid.ts` definuje `HybridExecutor`, ktorý pri každom volaní rozhoduje medzi vykonaním `direct` (v rámci procesu) a `sandbox`, pričom pri chybe časového limitu alebo nedostatku pamäte je k dispozícii cesta opakovaného pokusu `autoUpgrade`. Pripojené implementácie `directExecutor` / `sandboxRunner` sú zástupné (`executeDirect`, `executeInSandbox` vracajú zástupné objekty) — považujte tento modul za rozpracovaný kontrakt. Skutočné vykonávanie naďalej prebieha prostredníctvom `skillExecutor` + `SandboxRunner`.

---

## Úložisko

Schéma sa nachádza v dvoch migráciách:

- `src/lib/db/migrations/016_create_skills.sql` — základné tabuľky `skills` a `skill_executions` s indexmi nad `(api_key_id, name)` a `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — pridáva do tabuľky `skills` stĺpce `mode`, `source_provider`, `tags` (JSON), `install_count`.

Hodnota `skill_executions.status` je obmedzená na úrovni databázy: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## REST API

Všetky koncové body sa nachádzajú pod `src/app/api/skills/`. Koncové body na správu (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) vyžadujú **správcovské overenie** prostredníctvom `requireManagementAuth()`. Postupy pre marketplace/inštaláciu používajú menej striktné `isAuthenticated()` (relácia alebo kľúč API).

| Koncový bod | Metóda | Účel |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Zoznam registrovaných zručností. Podporuje `?q=`, `?mode=on              | off | auto`, `?source=skillsmp | skillssh | local`, stránkovanie |
| `/api/skills/[id]` | PUT | Aktualizácia `enabled` alebo `mode` |
| `/api/skills/[id]` | DELETE | Zrušenie registrácie podľa ID |
| `/api/skills/install` | POST | Inštalácia vlastnej zručnosti (kód obslužnej rutiny + schéma) |
| `/api/skills/marketplace` | GET | Vyhľadávanie v katalógu SkillsMP (keď je `q` prázdne, vráti predvolené populárne položky) |
| `/api/skills/marketplace/install` | POST | Inštalácia zručnosti SkillsMP (vyžaduje aktívneho poskytovateľa = `skillsmp`) |
| `/api/skills/skillssh` | GET | Vyhľadávanie v katalógu skills.sh (`?q=&limit=`, najviac 100) |
| `/api/skills/skillssh/install` | POST | Inštalácia zručnosti skills.sh (vyžaduje aktívneho poskytovateľa = `skillssh`) |
| `/api/skills/executions` | GET | Stránkovaná história vykonávania (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Ad hoc vykonanie registrovanej zručnosti |

Koncový bod `POST /api/skills/executions` vráti HTTP `503` s `{ error: "Skills execution is disabled..." }`, keď `settings.skillsEnabled === false` (`executor.ts:42-45`). Operátori môžu hlavný prepínač zmeniť v časti **Nastavenia → AI**.

### Príklad: inštalácia vlastnej zručnosti

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

Reťazec `handlerCode` slúži na **vyhľadanie názvu obslužnej rutiny** — nejde o spustiteľný kód. Exekútor ho mapuje prostredníctvom `skillExecutor.registerHandler(name, fn)` (`executor.ts:25`). Inštalácie z marketplace ukladajú text SKILL.md do tohto poľa ako dokumentáciu a smerujú vykonávanie cez volania nástrojov generované modelom. Ľubovoľný zdrojový kód dodaný používateľom sa nevyhodnocuje pomocou eval.

---

## Nástroje MCP

Štyri nástroje MCP obaľujú rozhranie zručností (`open-sse/mcp-server/tools/skillTools.ts`). Automaticky sa registrujú pri spustení servera MCP.

| Nástroj                       | Popis                                                                     |
| ----------------------------- | ------------------------------------------------------------------------- |
| `omniroute_skills_list`       | Zobrazí zoznam zručností, voliteľné filtre: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | Povolí/zakáže zručnosť podľa `skillId`                                    |
| `omniroute_skills_execute`    | Spustí zručnosť so vstupnými údajmi                                       |
| `omniroute_skills_executions` | História nedávnych spustení (predvolene 50, maximálne 100)                |

Informácie o nastavení prenosu a priradení rozsahov nájdete v dokumente [MCP-SERVER.md](./MCP-SERVER.md).

---

## Integrácia A2A

`src/lib/skills/a2a.ts` exportuje deskriptor zručnosti A2A `memory_aware_routing` a pomocnú funkciu `registerA2ASkill(registry)`. Vlastné zručnosti A2A sa nachádzajú v `src/lib/a2a/skills/` a odosielajú sa prostredníctvom `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`). Úplný životný cyklus úlohy nájdete v dokumente [A2A-SERVER.md](./A2A-SERVER.md).

---

## Pridanie novej vstavanej zručnosti

1. **Definujte obslužnú funkciu** v `src/lib/skills/builtins.ts` (alebo v susednom súbore v priečinku `src/lib/skills/builtin/`). Signatúra: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Kód spúšťaný v sandboxe?** Zavolajte `sandboxRunner.run(image, command, env, sandboxConfig({...}))`. Použite `normalizeImage()` na kontrolu voči zoznamu povolených položiek.
3. **Cesta v súborovom systéme?** Pred prístupom k disku ju vždy odovzdajte funkcii `resolveWorkspacePath(input, context)`.
4. **Sieťové volanie?** Použite `safeOutboundFetch` s `guard: "public-only"`; hlavičky očistite pomocou `sanitizeHeaders()`.
5. **Zaregistrujte** ju pridaním položky do `builtinSkills` (alebo zavolaním funkcie v štýle `registerBrowserSkill(executor)` pri spustení).
6. **Prepojte aliasy vstavaných nástrojov** (voliteľné) v `BUILTIN_TOOL_ALIASES` (`interception.ts:23`), ak nadradený model odosiela iný názov.
7. **Testy** umiestnite do `src/lib/skills/__tests__/` (Vitest).

---

## Pridanie vlastnej (nevstavanej) zručnosti

1. Pri spustení procesu zaregistrujte obslužnú funkciu:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Vložte zručnosť prostredníctvom `POST /api/skills/install` (pole `handlerCode` sa musí zhodovať s názvom zaregistrovanej obslužnej funkcie).
3. Prepnite `mode` na `on` alebo `auto` prostredníctvom `PUT /api/skills/[id]`.

---

## Prevádzkové tipy

- **Hlavný prepínač:** `settings.skillsEnabled = false` zablokuje všetky spustenia a na `/api/skills/executions` vráti HTTP `503`. Register sa naďalej načítava.
- **Obmedzenie odchádzajúcej komunikácie:** ak chcete úplne izolovaný sandbox bez sieťového prístupu, ponechajte `SKILLS_SANDBOX_NETWORK_ENABLED` nenastavenú (predvolené správanie). Hodnota `networkEnabled: true` pre jednotlivé volania stále vyžaduje povolenie hlavným prepínačom.
- **Povolenie konkrétnych obrazov:** nastavením `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` rozšírite zoznam povolených položiek.
- **Audit spustení:** `/dashboard/skills/executions` aj `omniroute_skills_executions` dopytujú `skill_executions`. Úspešné spustenia obsahujú `durationMs`; neúspešné obsahujú `errorMessage`.
- **Invalidácia vyrovnávacej pamäte:** po manuálnych úpravách databázy zavolajte `skillRegistry.invalidateCache()`; inak počkajte 60 s.
- **Anonymný pracovný priestor:** keď je `apiKeyId` prázdne, všetky volania sa hašujú do rovnakého pracovného priestoru `"anonymous"` — kód zohľadňujúci zdieľanie by mal vždy odovzdať skutočný kľúč.

---

## Životný cyklus vykonávania (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) je **singleton**, ktorý spravuje každé spustenie zručnosti. Pochopenie jeho životného cyklu je kľúčové pri ladení časových limitov, opakovaných pokusov a stavu vykonávania.

### 5-fázový životný cyklus

```
   volanie execute()
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← vo fronte, ešte nespustené (vytvorený riadok v DB)
  └──────┬──────┘
         │ spustenie obslužnej funkcie
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← obslužná funkcia vyvolaná s časovým limitom
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (žiadna iná cesta — ukončené nadradeným procesom)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   Riadok v DB aktualizovaný o stav, výstup a durationMs
```

### Predvolená konfigurácia

| Nastavenie   | Predvolená hodnota | Konfigurovateľné prostredníctvom     |
| ------------ | ------------------ | ------------------------------------ |
| `timeout`    | `30000` (30 s)     | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`                | `skillExecutor.setMaxRetries(count)` |

> **Dôležité**: Executor je singleton — volanie `setTimeout()` globálne ovplyvní všetky nasledujúce spustenia. Časové limity pre jednotlivé zručnosti momentálne nie sú podporované. Ak potrebujete odlišné časové limity pre jednotlivé zručnosti, spustite samostatné procesy alebo vytvorte fork executora.

### Hodnoty stavov

Zo súboru `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // Vo fronte, ešte nespustené
  RUNNING = "running", // Obslužná funkcia bola vyvolaná
  SUCCESS = "success", // Obslužná funkcia vrátila platný výstup
  ERROR = "error", // Obslužná funkcia vyhodila výnimku
  TIMEOUT = "timeout", // Bol prekročený časový limit executora
}
```

> **Poznámka**: Stav `TIMEOUT` je definovaný v enumerácii, ale aktuálna implementácia executora ho **v skutočnosti nezapisuje do DB** — časové limity sa prejavia ako `ERROR` so správou `"Skill execution timed out"`. Enumerácia stavov je vyhradená na budúce použitie.

### Kontrola vykonaní

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Získanie konkrétneho vykonania podľa ID
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} za ${exec.durationMs} ms`);
}

// Zoznam nedávnych vykonaní pre kľúč API
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs} ms)`);
}

// Spočítanie všetkých vykonaní
const total = skillExecutor.countExecutions("api-key-id");
```

### Správanie pri opakovaných pokusoch

Nastavenie `maxRetries` sa ukladá, ale metóda `execute()` executora ho **momentálne nepoužíva** — vykoná iba jeden pokus. Hodnota `maxRetries` je sprístupnená pre budúcu implementáciu a pre hooky, ktoré ju chcú načítať.

Opakované pokusy preto zatiaľ musia byť implementované priamo v obslužnej funkcii zručnosti. Vstavané
zručnosti sa registrujú v executore (napr. `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` v `src/lib/skills/builtin/`); každá zaregistrovaná obslužná funkcia
môže obsahovať vlastný cyklus opakovaných pokusov:

```ts
// vo vnútri obslužnej funkcie zručnosti
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

## SkillMode podrobne

Enum `SkillMode` (`src/lib/skills/types.ts`) určuje, **kedy a ako** sa zručnosti vyvolávajú:

```ts
enum SkillMode {
  AUTO = "auto", // LLM rozhoduje, kedy zručnosť zavolá
  MANUAL = "manual", // Vyvolá sa iba na základe explicitnej požiadavky používateľa
  HYBRID = "hybrid", // Hodnotenie AUTO + manuálne prepísanie
}
```

> **Poznámka**: Kódová základňa definuje `SkillMode` (AUTO/MANUAL/HYBRID), zatiaľ čo pole `Skill.mode` používa odlišný formát (`"on" | "off" | "auto"`). Súvisia spolu, ale nie sú totožné — `SkillMode` slúži na zásady vykonávania, zatiaľ čo `Skill.mode` slúži na povolenie jednotlivých zručností.

### Kedy použiť jednotlivé režimy

| Režim    | Správanie LLM                                                                    | Prípad použitia                                               |
| -------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| `AUTO`   | LLM môže zavolať zručnosť, keď to považuje za potrebné                           | Všeobecné zručnosti (čítanie súborov, požiadavky HTTP)        |
| `MANUAL` | LLM nemôže zavolať zručnosť; vyvolá ju iba explicitné volanie API `executeSkill` | Citlivé operácie (zápisy do databázy, platby)                 |
| `HYBRID` | LLM môže navrhnúť zručnosť; používateľ ju musí potvrdiť                          | Zručnosti s vedľajšími účinkami, ktoré však nie sú nebezpečné |

### Hodnotenie AUTO

Keď je aktívny režim `AUTO`, každá kandidátska zručnosť sa vyhodnotí vzhľadom na kontext
požiadavky pomocou `scoreAutoSkill()` v `src/lib/skills/injection.ts` — ide o aditívny
systém celočíselných bodov (zhoda názvu zručnosti, prekrytie tokenov názvu/značky/opisu,
pomocné informácie z dôvodu na pozadí, bonus/penalizácia podľa poskytovateľa). Najlepších
`AUTO_MAX_SKILLS = 5` zručností so `score >= AUTO_MIN_SCORE = 3` sa vloží ako
volateľné nástroje, pričom zhody sa rozhodujú podľa `installCount` a následne podľa názvu. Úplnú tabuľku bodov nájdete
vyššie v tomto dokumente v časti [**Generovanie schémy nástrojov → Hodnotenie AUTO**](#auto-scoring);
neexistuje žiadna prahová hodnota s desatinným číslom v štýle `0.6` ani žiadne hodnotenie v `registry.ts`.

---

## Katalóg vstavaných zručností

OmniRoute sa dodáva s vybranou súpravou vstavaných zručností v `src/lib/skills/builtin/`. Najčastejšie používané sú:

### Zručnosť automatizácie prehliadača

Zručnosť prehliadača (`src/lib/skills/builtin/browser.ts`) poskytuje automatizáciu bezhlavého prehliadača prostredníctvom Playwright/Puppeteer. **Je implementovaná, ale nie je súčasťou predvoleného katalógu zručností** — ak ju chcete používať, samostatne nainštalujte doplnok rozšírenia prehliadača.

```ts
// Povoľte vo svojej konfigurácii
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Vždy vyžadovať explicitné vyvolanie
  allowedSkills: ["browser"],
  timeout: 60000, // 60 s na načítanie stránok
  maxRetries: 1,
};
```

### Ďalšie vstavané kategórie

| Kategória             | Zručnosti                                    | Režim  |
| --------------------- | -------------------------------------------- | ------ |
| Súborový vstup/výstup | `file_read`, `file_write`                    | AUTO   |
| HTTP                  | `http_request`                               | AUTO   |
| Vyhľadávanie          | `web_search`                                 | AUTO   |
| Spúšťanie kódu        | `eval_code` (JavaScript/Python v sandboxe)   | HYBRID |
| Systém                | `execute_command` (spúšťanie CLI v sandboxe) | MANUAL |

### Pridanie vlastnej zručnosti

Informácie o pridaní vlastnej zručnosti prostredníctvom systému doplnkov nájdete v dokumente [SDK doplnkov a integrácia zručností](./PLUGIN_SDK.md).

---

## Pozri tiež

- [MCP-SERVER.md](./MCP-SERVER.md) — registrácia nástrojov MCP a transporty
- [A2A-SERVER.md](./A2A-SERVER.md) — životný cyklus úloh A2A a smerovanie zručností
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — úvod pre používateľov
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — reťazec spracovania požiadaviek a mapa komponentov
- Zdroj: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Testy: `src/lib/skills/__tests__/integration.test.ts`
