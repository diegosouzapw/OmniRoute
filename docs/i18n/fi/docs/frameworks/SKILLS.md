# Skills Framework (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Totuuden lähde:** `src/lib/skills/` ja `src/app/api/skills/`
> **Viimeksi päivitetty:** 2026-06-28 — v3.8.40

OmniRoute tarjoaa laajennettavan Skills-kehyksen, jonka avulla kielimallit (ja operaattorit) voivat koostaa uudelleenkäytettäviä toiminnallisuuksia — tiedostojärjestelmän lukuoperaatioista ja HTTP-pyynnöistä hiekkalaatikossa suoritettavaan koodiin ja kuratoituihin markkinapaikan taitoihin.

Taito on versioitu ja skeemalla määritelty työyksikkö. OmniRoute voi lisätä taitoja työkalumääritelminä lähteviin pyyntöihin, siepata mallilta palaavat työkalukutsut, suorittaa niitä vastaavan käsittelijän ja syöttää tuloksen takaisin mallille, jotta keskustelu voi jatkua. Malli ei koskaan näe toteutusta — ainoastaan työkalurajapinnan.

---

## Agent Skills vs. Omni Skills

OmniRoutessa on kaksi erillistä mutta toisiaan täydentävää taitojärjestelmää:

| Ulottuvuus     | **Omni Skills** (tämä dokumentti)                                               | **Agent Skills**                                                                               |
| :------------- | :------------------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------- |
| Tarkoitus      | LLM-työkalujen lisäys + suoritus hiekkalaatikossa                               | SKILL.md-luettelo ulkoisten agenttien löydettäväksi ja käytettäväksi                           |
| Totuuden lähde | `src/lib/skills/` + markkinapaikka                                              | `src/lib/agentSkills/` + `skills/`-hakemisto                                                   |
| Suoritustila   | Lisätään lähteviin pyyntöihin ja suoritetaan työkalukutsutapahtumien yhteydessä | Staattinen markdown-luettelo + REST/MCP/A2A-löytämisen päätepisteet                            |
| Käyttäjä       | OmniRoute itse (yhdistelmäreititys, saapuvat LLM-kutsut)                        | Ulkoiset agentit, MCP-asiakkaat, A2A-orkestraattorit                                           |
| Määrä          | Vaihteleva (markkinapaikan ohjaama)                                             | 45 luettelomerkintää (23 API + 21 CLI + 1 määritys)                                            |
| Muoto          | `SkillDefinition`, joka sisältää työkaluskeeman ja käsittelijän                 | `SKILL.md`-frontmatter + markdown-sisältö                                                      |
| Löytäminen     | `/api/skills/*` REST + `omniroute_skills_*` MCP-työkalut                        | `/api/agent-skills/*` REST + `omniroute_agent_skills_*` MCP-työkalut + A2A `list-capabilities` |

**Omni Skills** on suoritusmoottori — se määrittää, mitä OmniRoute _voi tehdä_, kun LLM kutsuu työkalua.

**Agent Skills** on dokumentaatioluettelo — se selittää ulkoisille agenteille, _kuinka OmniRouten REST APIa ja CLI:tä käytetään_, käyttäen rakenteisia SKILL.md-tiedostoja, jotka voidaan syöttää suoraan agenttien kehotteisiin.

Lisätietoja Agent Skills -luettelosta, generaattorista, MCP-työkaluista ja A2A-taidosta on tiedostossa [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## Käsitteet

### Taitojen lähteet

Samassa rekisterissä on rinnakkain kolme taitolähdettä:

1. **Sisäänrakennetut taidot** (`src/lib/skills/builtins.ts`) — toimitetaan OmniRouten mukana. Kattavat yleiset käyttötapaukset:
   - `file_read`, `file_write` — API-avainkohtainen hiekkalaatikkotyötila hakemistossa `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — lähtevä HTTP-yhteys `safeOutboundFetch`-toiminnon kautta käyttäen asetusta `guard: "public-only"`
   - `web_search` — vaihdettava hakupalveluntarjoaja ja välimuisti (`executeWebSearch`)
   - `eval_code` — Docker-hiekkalaatikossa suoritettava `node`- tai `python`-koodi
   - `execute_command` — Docker-hiekkalaatikossa suoritettava komentotulkkikomento
   - `browser` — Playwright-pohjainen runko, oletusarvoisesti poistettu käytöstä (`builtin/browser.ts`)
2. **SkillsMP** (OmniRouten markkinapaikka) — haetaan osoitteesta `https://skillsmp.com/api/v1/skills/search`. Edellyttää `skillsmpApiKey`-arvoa asetuksissa.
3. **SkillsSH** (`skills.sh`-yhteisöluettelo) — haetaan osoitteesta `https://skills.sh/api/search`. Todennusta ei tarvita; SKILL.md-sisältö noudetaan GitHubin raakasisällöstä.

Yksi aktiivinen palveluntarjoaja määrittää, mistä luettelosta hallintapaneeli asentaa taidot (`src/lib/skills/providerSettings.ts`). Voit vaihtaa sen kohdassa **Asetukset → Muisti ja taidot**. Oletus: `skillsmp`.

### Taidon identiteetti

Taidot yksilöidään muistissa olevassa rekisterissä avaimella `name@version` (`src/lib/skills/registry.ts`). Version on oltava semver-muotoinen (`^\d+\.\d+\.\d+$`). `resolveVersion()` ymmärtää rajoitteet `^`, `~`, `>`, `>=`, `<`, `<=`, `==` sekä täsmällisen vastaavuuden.

### Taitotila

Jokaisella taidolla on suoritustila, joka määrittää, milloin taito lisätään:

| Tila   | Toiminta                                                                                               |
| ------ | ------------------------------------------------------------------------------------------------------ |
| `on`   | Lisätään aina työkalumääritelmänä                                                                      |
| `off`  | Ei koskaan lisätä eikä voida suorittaa                                                                 |
| `auto` | Pisteytetään saapuvan pyynnön perusteella; lisätään vain, jos pistemäärä ≥ `AUTO_MIN_SCORE` (oletus 3) |

`auto` on markkinapaikalta asennettujen taitojen oletusarvo. `enabled=true` ja `mode="off"` tarkoittavat yhdessä ”rekisteröity mutta ei aktiivinen” — `enabled`-arvon vaihtaminen vanhan sarakkeen kautta päivittää myös `mode`-arvon, jotta vanhemmat koodipolut pysyvät yhdenmukaisina (`src/app/api/skills/[id]/route.ts`).

### Tila (suoritukset)

Taitojen suorituksia seurataan `skill_executions`-taulussa seuraavilla tiloilla (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Rekisterin välimuisti

`SkillRegistry` on singleton, jonka välimuistin elinaika on 60 sekuntia (`registry.ts:14`). `loadFromDatabase()` on idempotentti ja poistaa samanaikaisten kutsujen kaksoiskappaleet `pendingLoad`-toiminnolla. Kaikki kirjoitusoperaatiot (`register`/`unregister`/`unregisterById`) mitätöivät välimuistin. Hae versiot funktiolla `getSkillVersions(name)` ja ratkaise versio funktiolla `resolveVersion(name, constraint)`.

### Palveluntarjoajakohtainen lisäys

`injectSkills()` tiedostossa `src/lib/skills/injection.ts` on aloituspiste, joka muuntaa rekisteröidyt taidot palveluntarjoajakohtaisiksi työkalumääritelmiksi:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

Työkalun nimi koodataan muodossa `name@version`, jotta käsittelijä voi valita oikean version, kun malli kutsuu sitä.

### AUTO-pisteytys

Kun `mode="auto"`, jokainen ehdolla oleva taito pisteytetään pyyntökontekstia vasten (`scoreAutoSkill()` tiedostossa `injection.ts`):

| Signaali                                                            | Pisteet            |
| ------------------------------------------------------------------- | ------------------ |
| Taidon nimi esiintyy kontekstissa täsmälleen                        | +6                 |
| Jokainen nimen tunnus vastaa kontekstin tunnusta                    | +2                 |
| Jokainen tunnisteen osamerkkijono vastaa kontekstia                 | +3                 |
| Jokainen kuvauksen tunnus vastaa kontekstia                         | +1                 |
| Taustasyy vastaa nimen tunnusta                                     | +2 tunnusta kohden |
| Taustasyy vastaa tunnistetta                                        | +2 tunnusta kohden |
| Tunnisteiden palveluntarjoajavihje vastaa pyynnön palveluntarjoajaa | +2 / −2            |

Enintään `AUTO_MAX_SKILLS = 5` taitoa, joiden `score >= AUTO_MIN_SCORE = 3`, injektoidaan. Tasapisteet ratkaistaan ensin `installCount`-arvon mukaan (laskeva järjestys) ja sitten nimen mukaan aakkosjärjestyksessä (`injection.ts:225-235`).

### Työkalukutsujen sieppaus

Chat-käsittelijä kutsuu `handleToolCallExecution()`-funktiota tiedostossa `src/lib/skills/interception.ts`, kun ylemmän tason palvelu palauttaa työkalua kutsuvan vastauksen:

1. `extractToolCalls()` lukee palveluntarjoajakohtaiset rakenteet (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Sisäisten työkalujen aliakset (esim. `omniroute_web_search` → `web_search`) ratkaistaan ensin. Sisäiset käsittelijät suoritetaan suoraan.
3. Kaikki muu reititetään kutsun `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })` kautta.
4. Tulokset liitetään takaisin vastaukseen — tilanteen mukaan `tool_results`-kohteina, `function_call_output`-kohteina tai Anthropicin `tool_result`-lohkoina.

Suorituskontekstin `customSkillExecutionEnabled`-arvoksi voidaan asettaa `false`, jolloin vain sisäisten työkalujen sieppaus sallitaan (tätä käyttävät pyyntöpolut, jotka poistavat käyttäjän määrittämät käsittelijät nimenomaisesti käytöstä).

---

## Docker-hiekkalaatikko

Sisäänrakentamattomat koodipolut (`eval_code`, `execute_command`) suoritetaan Dockerissa `SandboxRunner`-luokan (`src/lib/skills/sandbox.ts`) kautta. Jokainen säilö käynnistetään seuraavilla asetuksilla:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (kun readOnly=true)
```

Oletusarvot (`SandboxRunner.DEFAULT_CONFIG`):

| Kenttä           | Oletusarvo      | Huomautukset                                                                                           |
| ---------------- | --------------- | ------------------------------------------------------------------------------------------------------ |
| `cpuLimit`       | 100 (= 0.1 CPU) | Jaetaan 1000:lla ennen välittämistä `--cpus`-valitsimelle                                              |
| `memoryLimit`    | 256 MB          | Kiinteä raja                                                                                           |
| `timeout`        | 30000 ms        | Pehmeä lopetus `SIGTERM`-signaalilla + `docker kill`                                                   |
| `networkEnabled` | `false`         | Muuttuu muotoon `--network none`                                                                       |
| `readOnly`       | `true`          | Juuritiedostojärjestelmä on vain luku -tilassa; `/tmp` ja `/workspace` ovat tmpfs-tiedostojärjestelmiä |

`SandboxRunner.kill(id)` ja `killAll()` ovat käytettävissä sammutusta varten; käynnissä olevia säilöjä seurataan `runningContainers: Map<string, ChildProcess>`-rakenteessa.

### Hiekkalaatikon ympäristömuuttujat

Määritetään `process.env`-objektin kautta tiedostossa `src/lib/skills/builtins.ts`:

| Ympäristömuuttuja                 | Oletusarvo       | Tarkoitus                                                                                                                 |
| --------------------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB) | Enimmäiskoko toiminnoille `file_read` ja `file_write`                                                                     |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`         | `http_request`-vastauksen rungon enimmäiskoko                                                                             |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`         | Kutsujalle palautettavien stdout/stderr-tulosteiden enimmäispituus                                                        |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`          | Hiekkalaatikoitujen komentojen oletusaikakatkaisu; enintään 60 s                                                          |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`          | Pääportti ulospäin suuntautuvalle liikenteelle. Aseta arvoksi `1` tai `true`, jotta kutsukohtainen käyttöönotto sallitaan |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (katso alta)     | Pilkuilla eroteltu sallittujen Docker-levykuvien luettelo                                                                 |

Oletusarvoisesti sallitut levykuvat: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. Kaikki muuttujan `SKILLS_ALLOWED_SANDBOX_IMAGES` kautta tehdyt lisäykset yhdistetään oletusarvoihin; `normalizeImage()` hylkää tuntemattomat levykuvat.

> Huomautus: erillistä `SKILLS_EXECUTION_TIMEOUT_MS`-ympäristömuuttujaa ei ole. Muualla kuin hiekkalaatikossa toimivan käsittelijän aikakatkaisu on kiinteästi määritetty 30 sekunniksi `SkillExecutor`-luokassa (`executor.ts:13`), mutta se voidaan ohittaa suorituksen aikana kutsumalla `skillExecutor.setTimeout(ms)`.

### Työtilan eristäminen

`file_read` ja `file_write` ratkaisevat jokaisen polun suhteessa API-avainkohtaiseen työtilaan polussa `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`. Polun läpikulku (`..`) ja kielletyt segmentit (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) hylätään ennen levyn syöttö- tai tulostustoimintoja.

### HTTP-suojaus

`http_request` (`builtins.ts:257`):

- Sallittujen metodien luettelo: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Estetyt lähtevät otsakkeet: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Uudelleenohjaukset poistettu käytöstä (`allowRedirect: false`)
- Reititetään `safeOutboundFetch`-toiminnon kautta käyttäen asetusta `guard: "public-only"` (yksityiset ja loopback-osoitealueet estetään)
- Vastaus katkaistaan kohdassa `SKILLS_MAX_HTTP_RESPONSE_BYTES`; asiakas näkee arvon `truncated: true`

---

## Hybrid Executor (esikatselu)

`src/lib/skills/hybrid.ts` määrittelee `HybridExecutor`-toteutuksen, joka valitsee jokaiselle kutsulle joko `direct`-suorituksen (prosessin sisäinen) tai `sandbox`-suorituksen. Lisäksi siinä on `autoUpgrade`-uudelleenyrityspolku aikakatkaisu- ja muistivirheiden varalle. Kytketyt `directExecutor`- / `sandboxRunner`-toteutukset ovat runkoja (`executeDirect` ja `executeInSandbox` palauttavat paikkamerkkioliot) — käsittele tätä moduulia rakenteilla olevana sopimuksena. Varsinainen suoritus kulkee edelleen yhdistelmän `skillExecutor` + `SandboxRunner` kautta.

---

## Tallennus

Skeema sijaitsee kahdessa migraatiossa:

- `src/lib/db/migrations/016_create_skills.sql` — `skills`- ja `skill_executions`-perustaulut sekä indeksit sarakkeille `(api_key_id, name)` ja `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — lisää `skills`-tauluun sarakkeet `mode`, `source_provider`, `tags` (JSON) ja `install_count`.

Tietokanta rajoittaa `skill_executions.status`-arvoa: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## REST-rajapinta

Kaikki päätepisteet sijaitsevat hakemiston `src/app/api/skills/` alla. Hallintapäätepisteet (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) edellyttävät **hallintatodennusta** funktion `requireManagementAuth()` kautta. Markkinapaikka- ja asennusprosessit käyttävät kevyempää `isAuthenticated()`-tarkistusta (istunto tai API-avain).

| Päätepiste | Menetelmä | Tarkoitus |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Luettele rekisteröidyt taidot. Tukee parametreja `?q=`, `?mode=on        | off | auto`, `?source=skillsmp | skillssh | local`, sivutus |
| `/api/skills/[id]` | PUT | Päivitä `enabled` tai `mode` |
| `/api/skills/[id]` | DELETE | Poista rekisteröinti tunnuksen perusteella |
| `/api/skills/install` | POST | Asenna mukautettu taito (käsittelijäkoodi + skeema) |
| `/api/skills/marketplace` | GET | Hae SkillsMP-luettelosta (palauttaa suositut oletusarvot, kun `q` on tyhjä) |
| `/api/skills/marketplace/install` | POST | Asenna SkillsMP-taito (edellyttää aktiivista palveluntarjoajaa `skillsmp`) |
| `/api/skills/skillssh` | GET | Hae skills.sh-luettelosta (`?q=&limit=`, enintään 100) |
| `/api/skills/skillssh/install` | POST | Asenna skills.sh-taito (edellyttää aktiivista palveluntarjoajaa `skillssh`) |
| `/api/skills/executions` | GET | Sivutettu suoritushistoria (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Suorita rekisteröity taito erilliskutsuna |

Päätepiste `POST /api/skills/executions` palauttaa HTTP-tilakoodin `503` ja vastauksen `{ error: "Skills execution is disabled..." }`, kun `settings.skillsEnabled === false` (`executor.ts:42-45`). Operaattorit voivat vaihtaa pääkytkimen tilaa kohdassa **Asetukset → Tekoäly**.

### Esimerkki: mukautetun taidon asentaminen

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

Merkkijono `handlerCode` on **käsittelijän nimen hakuavain** — ei suoritettavaa koodia. Suorittaja yhdistää sen funktion `skillExecutor.registerHandler(name, fn)` avulla (`executor.ts:25`). Markkinapaikka-asennukset tallentavat SKILL.md-tekstin tähän kenttään dokumentaationa ja reitittävät suorituksen mallin luomien työkalukutsujen kautta. Käyttäjän antamaa mielivaltaista lähdekoodia ei suoriteta `eval`-toiminnolla.

---

## MCP-työkalut

Neljä MCP-työkalua toimii taitorajapinnan kääreenä (`open-sse/mcp-server/tools/skillTools.ts`). Ne rekisteröidään automaattisesti MCP-palvelimen käynnistyessä.

| Työkalu                       | Kuvaus                                                                |
| ----------------------------- | --------------------------------------------------------------------- |
| `omniroute_skills_list`       | Listaa taidot; valinnaiset suodattimet: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | Ota taito käyttöön tai poista se käytöstä `skillId`-arvon perusteella |
| `omniroute_skills_execute`    | Suorita taito syötekuormalla                                          |
| `omniroute_skills_executions` | Viimeaikainen suoritushistoria (oletus 50, enintään 100)              |

Katso siirtoyhteyden määritys ja käyttöoikeuksien kohdistukset tiedostosta [MCP-SERVER.md](./MCP-SERVER.md).

---

## A2A-integraatio

`src/lib/skills/a2a.ts` vie `memory_aware_routing`-A2A-taitokuvauksen ja `registerA2ASkill(registry)`-apufunktion. Mukautetut A2A-taidot sijaitsevat hakemistossa `src/lib/a2a/skills/`, ja ne välitetään käsiteltäviksi `A2A_SKILL_HANDLERS`-kohteen kautta (`src/lib/a2a/taskExecution.ts`). Katso tehtävän koko elinkaari tiedostosta [A2A-SERVER.md](./A2A-SERVER.md).

---

## Uuden sisäänrakennetun taidon lisääminen

1. **Määritä käsittelijä** tiedostossa `src/lib/skills/builtins.ts` (tai rinnakkaistiedostossa hakemiston `src/lib/skills/builtin/` alla). Allekirjoitus: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Hiekkalaatikossa suoritettava koodipolku?** Kutsu `sandboxRunner.run(image, command, env, sandboxConfig({...}))`. Tarkista sallittujen luettelo käyttämällä `normalizeImage()`-funktiota.
3. **Tiedostojärjestelmäpolku?** Välitä se aina `resolveWorkspacePath(input, context)`-funktion kautta ennen levyn käsittelyä.
4. **Verkkokutsu?** Käytä `safeOutboundFetch`-funktiota asetuksella `guard: "public-only"`; puhdista otsakkeet `sanitizeHeaders()`-funktiolla.
5. **Rekisteröi** lisäämällä merkintä `builtinSkills`-kohteeseen (tai kutsumalla käynnistyksen yhteydessä esimerkiksi `registerBrowserSkill(executor)`).
6. **Kytke sisäänrakennettujen työkalujen aliakset** (valinnainen) `BUILTIN_TOOL_ALIASES`-kohteessa (`interception.ts:23`), jos ylemmän tason malli tuottaa eri nimen.
7. **Testit** hakemistossa `src/lib/skills/__tests__/` (Vitest).

---

## Uuden mukautetun (ei-sisäänrakennetun) taidon lisääminen

1. Rekisteröi käsittelijä prosessin käynnistyessä:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Lisää taito kutsumalla `POST /api/skills/install` (`handlerCode`-kentän on vastattava rekisteröidyn käsittelijän nimeä).
3. Vaihda `mode` arvoon `on` tai `auto` kutsumalla `PUT /api/skills/[id]`.

---

## Käyttövinkkejä

- **Pääkytkin:** `settings.skillsEnabled = false` estää kaikki suoritukset ja palauttaa HTTP `503` -vastauksen reitillä `/api/skills/executions`. Rekisterin lataaminen jatkuu.
- **Rajoita ulospäin suuntautuvaa liikennettä:** pidä `SKILLS_SANDBOX_NETWORK_ENABLED` määrittämättömänä (oletus), jotta hiekkalaatikko on täysin eristetty verkosta. Kutsukohtainen `networkEnabled: true` edellyttää silti pääkytkimen sallintaa.
- **Salli tietyt näköistiedostot:** laajenna sallittujen luetteloa asettamalla `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"`.
- **Tarkasta suoritukset:** sekä `/dashboard/skills/executions` että `omniroute_skills_executions` tekevät kyselyn `skill_executions`-kohteeseen. Onnistuneet suoritukset sisältävät `durationMs`-arvon, epäonnistuneet suoritukset `errorMessage`-arvon.
- **Välimuistin mitätöinti:** kutsu `skillRegistry.invalidateCache()` manuaalisten tietokantamuutosten jälkeen; muussa tapauksessa odota 60 s.
- **Anonyymi työtila:** kun `apiKeyId` on tyhjä, kaikki kutsut hajautetaan samaan `"anonymous"`-työtilaan — jakamisen huomioivan koodin tulee aina välittää oikea avain.

---

## Suorituksen elinkaari (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) on **singleton**, joka hallitsee jokaista taidon kutsua. Sen elinkaaren ymmärtäminen on ratkaisevan tärkeää aikakatkaisujen, uudelleenyritysten ja suoritustilan virheenkorjauksessa.

### Viisivaiheinen elinkaari

```
   execute() kutsuttu
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← jonossa, ei vielä aloitettu (tietokantarivi luotu)
  └──────┬──────┘
         │ käynnistä käsittelijä
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← käsittelijä kutsuttu aikakatkaisulla
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (ei muuta polkua — ylätason prosessi lopetti)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   Tietokantariville päivitetään tila, tuloste ja durationMs
```

### Oletusmääritykset

| Asetus       | Oletusarvo     | Määritettävissä komennolla           |
| ------------ | -------------- | ------------------------------------ |
| `timeout`    | `30000` (30 s) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`            | `skillExecutor.setMaxRetries(count)` |

> **Tärkeää**: Suorittaja on singleton — `setTimeout()`-kutsu vaikuttaa maailmanlaajuisesti kaikkiin myöhempiin kutsuihin. Taitokohtaisia aikakatkaisuja ei tällä hetkellä tueta. Jos tarvitset eri aikakatkaisuja eri taidoille, käynnistä erilliset prosessit tai haarauta suorittaja.

### Tila-arvot

Tiedostosta `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // Jonossa, ei vielä aloitettu
  RUNNING = "running", // Käsittelijä kutsuttu
  SUCCESS = "success", // Käsittelijä palautti kelvollisen tulosteen
  ERROR = "error", // Käsittelijä aiheutti poikkeuksen
  TIMEOUT = "timeout", // Suorittajan aikakatkaisu ylittyi
}
```

> **Huomautus**: `TIMEOUT`-tila on määritetty enumeraatiossa, mutta nykyinen suorittajatoteutus **ei tosiasiassa kirjoita sitä tietokantaan** — aikakatkaisut näkyvät `ERROR`-tilana ja viestinä `"Skill execution timed out"`. Tila-enumeraatio on varattu tulevaa käyttöä varten.

### Suoritusten tarkastelu

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Hae tietty suoritus tunnuksen perusteella
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// Luettele API-avaimen viimeaikaiset suoritukset
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// Laske suoritusten kokonaismäärä
const total = skillExecutor.countExecutions("api-key-id");
```

### Uudelleenyritysten toiminta

`maxRetries`-asetus tallennetaan, mutta suorittajan `execute()`-metodi **ei tällä hetkellä käytä sitä** — metodi tekee vain yhden yrityksen. `maxRetries`-arvo on käytettävissä tulevaa toteutusta ja sitä lukevia koukkuja varten.

Toistaiseksi uudelleenyritykset on toteutettava itse taidon käsittelijässä. Sisäänrakennetut
taidot rekisteröidään suorittajaan (esimerkiksi `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` hakemistossa `src/lib/skills/builtin/`); rekisteröimäsi käsittelijä
voi ympäröidä toimintansa omalla uudelleenyrityssilmukallaan:

```ts
// taidon käsittelijän sisällä
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

## SkillMode yksityiskohtaisesti

`SkillMode`-enumeraatio (`src/lib/skills/types.ts`) määrittää, **milloin ja miten** taitoja kutsutaan:

```ts
enum SkillMode {
  AUTO = "auto", // LLM päättää, milloin taitoa kutsutaan
  MANUAL = "manual", // Kutsutaan vain käyttäjän nimenomaisesta pyynnöstä
  HYBRID = "hybrid", // AUTO-pisteytys + manuaalinen ohitus
}
```

> **Huomautus**: Koodikanta määrittelee `SkillMode`-enumeraation (AUTO/MANUAL/HYBRID), kun taas `Skill.mode`-kenttä käyttää erilaista muotoa (`"on" | "off" | "auto"`). Ne liittyvät toisiinsa, mutta eivät ole identtisiä — `SkillMode` määrittää suorittajan käytännön, kun taas `Skill.mode` määrittää yksittäisen taidon käyttöönoton.

### Milloin kutakin tilaa käytetään

| Tila     | LLM:n toiminta                                                                         | Käyttötapaus                                                        |
| -------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| `AUTO`   | LLM voi kutsua taitoa, kun se katsoo sen tarpeelliseksi                                | Yleiskäyttöiset taidot (tiedostojen luku, HTTP-pyynnöt)             |
| `MANUAL` | LLM ei voi kutsua taitoa; vain eksplisiittinen `executeSkill`-API-kutsu käynnistää sen | Arkaluonteiset toiminnot (tietokantakirjoitukset, maksut)           |
| `HYBRID` | LLM voi ehdottaa taitoa; käyttäjän on vahvistettava se                                 | Taidot, joilla on sivuvaikutuksia mutta jotka eivät ole vaarallisia |

### AUTO-pisteytys

Kun `AUTO`-tila on aktiivinen, jokainen ehdokastaito pisteytetään pyyntökontekstia
vasten `scoreAutoSkill()`-funktiolla tiedostossa `src/lib/skills/injection.ts` — kyseessä on
additiivinen kokonaislukupistejärjestelmä (taidon nimen vastaavuus, nimen/tunnisteen/kuvauksen
tokenien päällekkäisyys, taustasyyn vihjeet sekä palveluntarjoajavihjeen bonus/rangaistus). Enintään
`AUTO_MAX_SKILLS = 5` taitoa, joiden `score >= AUTO_MIN_SCORE = 3`, injektoidaan
kutsuttaviksi työkaluiksi. Tasapisteet ratkaistaan ensin `installCount`-arvon ja sitten nimen perusteella. Katso koko pistetaulukko
tämän dokumentin aiemmasta osiosta [**Työkaluskeeman luonti → AUTO-pisteytys**](#auto-scoring);
käytössä ei ole liukulukuista `0.6`-tyyppistä kynnysarvoa eikä `registry.ts`-pisteytystä.

---

## Sisäänrakennettujen taitojen luettelo

OmniRoute sisältää kuratoidun joukon sisäänrakennettuja taitoja hakemistossa `src/lib/skills/builtin/`. Yleisimmät niistä:

### Selaimen automaatiotaito

Selaintaito (`src/lib/skills/builtin/browser.ts`) tarjoaa Playwrightin/Puppeteerin kautta selaimen automaatiota ilman graafista käyttöliittymää. **Se on toteutettu, mutta ei sisälly oletusarvoiseen taitoluetteloon** — käyttääksesi sitä asenna selaimen laajennusliitännäinen erikseen.

```ts
// Ota käyttöön määrityksissäsi
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Vaadi aina eksplisiittinen kutsu
  allowedSkills: ["browser"],
  timeout: 60000, // 60 s sivujen lataamiseen
  maxRetries: 1,
};
```

### Muut sisäänrakennetut luokat

| Luokka          | Taidot                                     | Tila   |
| --------------- | ------------------------------------------ | ------ |
| Tiedosto-I/O    | `file_read`, `file_write`                  | AUTO   |
| HTTP            | `http_request`                             | AUTO   |
| Haku            | `web_search`                               | AUTO   |
| Koodin suoritus | `eval_code` (eristetty JavaScript/Python)  | HYBRID |
| Järjestelmä     | `execute_command` (eristetty CLI-suoritus) | MANUAL |

### Mukautetun taidon lisääminen

Katso ohjeet mukautetun taidon lisäämiseen liitännäisjärjestelmän kautta dokumentista [Liitännäis-SDK:n ja taitojen integrointi](./PLUGIN_SDK.md).

---

## Katso myös

- [MCP-SERVER.md](./MCP-SERVER.md) — MCP-työkalujen rekisteröinti ja siirtomekanismit
- [A2A-SERVER.md](./A2A-SERVER.md) — A2A-tehtävien elinkaari ja taitojen välitys
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — käyttäjille suunnattu johdanto
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — pyyntöjen käsittelyketju ja komponenttikartta
- Lähdekoodi: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Testit: `src/lib/skills/__tests__/integration.test.ts`
