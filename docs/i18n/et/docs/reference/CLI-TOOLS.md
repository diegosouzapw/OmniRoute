# CLI-TOOLS (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇬🇷 [el](../../../el/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇪 [ga](../../../ga/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇷 [hr](../../../hr/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇱🇹 [lt](../../../lt/docs/reference/CLI-TOOLS.md) · 🇱🇻 [lv](../../../lv/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇲🇹 [mt](../../../mt/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇮 [sl](../../../sl/docs/reference/CLI-TOOLS.md) · 🇷🇸 [sr](../../../sr/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "CLI tööriistad — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-23
---

# CLI tööriistad — OmniRoute

Viimati uuendatud: 2026-08-23

OmniRoute integreerub kolme kategooria CLI tööriistadega, mis paiknevad kolmel eraldi juhtpaneeli lehel:

| Leht           | marsruut                | kontseptsioon                                                                    | arv          |
| -------------- | ----------------------- | -------------------------------------------------------------------------------- | ------------ |
| **CLI Code's** | `/dashboard/cli-code`   | Arendustööriistad, mis suunavad OmniRoute'i (Klient → CLI → OmniRoute → Pakkuja) | 26           |
| **CLI Agents** | `/dashboard/cli-agents` | Autonoomsed agendid, mis suunavad OmniRoute'i (sama vool, laiem ulatus)          | 10           |
| **ACP Agents** | `/dashboard/acp-agents` | CLI'd, mida OmniRoute käivitab taustal läbi stdio/ACP (vastupidine vool)         | vt registris |

Vanu marsruute suunatakse edasi 308 kaudu: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## Kuidas see töötab

```
CLI Code's / CLI Agents (tarbimise vool):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (kõik suunavad OmniRoute'i)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute suunab õige pakkujani)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

ACP Agents (vastupidine käivitamise vool):
    Kliendi päring → OmniRoute → käivitab CLI läbi stdio/ACP → vastus
```

**Eelised:**

- Üks API võti kõigi tööriistade haldamiseks
- Kulude jälgimine kõigi CLI-de üle juhtpaneelil
- Mudeli vahetamine ilma iga tööriista uuesti konfigureerimata
- Töötab kohalikult ja eemalserveritel (VPS, Docker, Akamai, Cloudflare Tunnel)

---

## Automaatne konfigureerimine `setup-*` abil

Teil ei ole vaja iga tööriista konfiguratsiooni käsitsi kirjutada. OmniRoute tarnib igale toetatud CLI-le `setup-*`
käsu, mis loeb töötavast OmniRoute'ist (kohalikust või eemalisest) **reaalse** mudelikataloogi ja kirjutab tööriista enda konfiguratsiooni teie masinas:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
omniroute setup-5dive
```

Igaüks aktsepteerib `--remote <url> --api-key <key>` (konfigureerib kohaliku tööriista eemalset OmniRoute'i kasutades), `--dry-run` (eelvaatlus kirjutamata) ja `--port`. Tööriistad, millel pole automaatset mudeli avastamist (Cline, Kilo, Roo, Goose, Aider, Qwen, 5dive) aktsepteerivad
`--model <id>` (ja `--yes` mitte-interaktiivsete käivituste jaoks). `setup-5dive` on ainus
retsept, mis ei kirjuta `$HOME` alla: see konfigureerib 5dive agendi ringkonna, kirjutades juuri kuuluv autentimisprofiili ringkonna hostile, seega see käivitab uuesti läbi `sudo`l ja tal puudub oma eemalrežiim. Õige keskkonnaga CLI käivitamiseks
ja konfiguratsiooni kirjutamata jätmiseks kasutage üldist
`omniroute run <target>` käivitajat (claude, codex, aider, goose, opencode, qwen,
gemini — sihtmärgid ja aliased pärinevad `bin/cli/cli-manifest.mjs`st); vanu
tööriistapõhiseid käivitajaid `omniroute launch` (Claude Code) ja `omniroute launch-codex`
(Codex) jäävad kättesaadavaks. Gemini CLI on ainult käivitatav: see on `omniroute run`
siht, kuid tal puudub `setup-*`/`configure` retsept.

> **Täielik viide:** peamine tabel — mida iga käsk kirjutab, iga lipp,
> kohalik vs eemalne, ja millised tööriistad soovivad `/v1` järelsiitingut — asub
> **[CLI integratsioonid](../guides/CLI-INTEGRATIONS.md)**.

### Nende käivitamine konteineri sees

`setup-*` käsk, mida käivitatakse OmniRoute konteineri sees, kirjutab
konteineri enda koju, mida ükski hosti CLI ei loe ja mis kaob koos
konteineriga. OmniRoute tuvastab selle ja väljub koodiga `2 juhistega, mitte kirjutades. Toetatakse kahte edasiminemise viisi — installige CLI hostil ja
`omniroute connect`konteineriga, või bind-mountige konfiguratsioonikataloogid ja seadke`CLI_CONFIG_HOME`(compose`host`profiil). Iga`setup-*`käsk, pluss`omniroute configure`ja`omniroute config set`, aktsepteerib
`--allow-container-write`kui tegelikult soovisite konfigureerida konteineri enda CLI-sid;`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` teeb sama serveri jaoks. Vaadake
[Dockeri juhend → Host CLI tööriistade konfigureerimine](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker).

Juhtpaneeli **rakenduspunkt** (`POST /api/cli-tools/apply`) kehtestab sama kaitse:
konteineris vastab kirjutamine, mille sihtmärk ei ole hostilt bind-mounted, vastusega **`422`** koos `containerEphemeralTarget: true`, turvalise veatekstiga ja — tööriistade jaoks, millel on hosti retsept (claude, codex, opencode, cline,
kilo, continue) — `hostSetupCommand` (nt. `omniroute setup-opencode`), mida tuleb käivitada
hostil selle asemel; midagi ei kirjuta. `dryRun: true` töötab jätkuvalt konteineri režiimis ja tagastab genereeritud sisu + sihtkoha ilma ketta puudutamata, nii et
saate eelvaadata juhtpaneelilt ja rakendada hostil. See käitumine on
tahtlik ja regressioonikaitstud läbi
`tests/unit/api/cli-tools/apply-container-guard.test.ts` — ärge "parandage" 422
kaitset eemaldades.

---

## Tõe allikas

Ühtne kataloog asub `src/shared/constants/cliTools.ts` failis kujul `CLI_TOOLS: Record<string, CliCatalogEntry>`.

Igal sissekandel on järgmised väljad (määratletud failis `src/shared/schemas/cliCatalog.ts`):

| Väli                                            | Tüüp                                                         | Kirjeldus                                                  |
| ----------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------- |
| `category`                                      | `"code" \| "agent"`                                          | Millisel lehel tööriist kuvatakse                          |
| `vendor`                                        | `string`                                                     | Tööriista päritolu ("Anthropic", "OSS (P. Gauthier)")      |
| `acpSpawnable`                                  | `boolean`                                                    | Kasutatav ka ACP agendina (näidatakse märgis)              |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | Kohandatud otsapõhja toetuse tase. `"none"` = MITM backlog |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | Konfiguratsioonimehhanism                                  |
| `id`, `name`, `color`, `description`, `docsUrl` | standard                                                     | Põhilised kuvamisväljad                                    |

Sissekanded, mille `baseUrlSupport: "none"`, **ei kuvata** paneelide lehtedel – need on registreeritud MITM backlogis plaani 11 jaoks (vaata `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

### Võimekuse tasemed (katalogiseeritud × tuvastatav × konfigureeritav × käivitatav)

Mitte iga katalogiseeritud tööriist ei ole tuvastatav, konfigureeritav ega käivitatav. Igal tasemel on üks
allikas, ja erinevuste test hoiab neid ühtlasena:

| Tase                 | Tähendus                                                                            | Deklareeritud failis                                               |
| -------------------- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| **Katalogiseeritud** | Ilmub paneeli kataloogi (nimi, tarnija, dokumendid, konfiguratsiooni tüüp)          | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                   |
| **Tuvastatav**       | Binaari/konfiguratsiooni tuvastamine, tervisekontrollid, konfiguratsiooni teed      | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` jooksva kataloog) |
| **Konfigureeritav**  | Toetatud `omniroute configure <cli>` kaudu (seadistusretsept olemas)                | `bin/cli/cli-manifest.mjs` (`configure: true`)                     |
| **Käivitatav**       | Toetatud `omniroute run <target>` kaudu (keskkonna/argumendi süstimine määratletud) | `bin/cli/cli-manifest.mjs` (`run: true`)                           |

`bin/cli/cli-manifest.mjs` on kanoniline käivitatavate programmide manifest CLI käskude
pindade jaoks: `run`, `configure` ja kesta täitmise lõpetajad kõik tuletavad oma
sihtnimekirjad, aliase lahenduse (näiteks `kilocode`/`kilo-code`/`kilo_cli` → `kilo`)
ja `--model` lipu juhtmestiku sellest. Erinevuste valvur
`tests/unit/cli/cli-manifest-drift.test.ts` kinnitab, et manifest, jooksv kataloog,
kasutajaliidese kataloog ja iga tarbija pind jäävad sünkrooni – kui üks siht lisatakse
ühele pinnale, ilma teisteta, siis see katset ei läbi ja ei teki vaikset erinevust.

---

## 1. CLI-koodi tööriistade kataloog (26 tööriista)

Kõik tööriistad, mis ilmuvad `/dashboard/cli-code` kataloogis. Need, mille `baseUrlSupport: none` on, on ühendatud MITM-i või juhendamise kaudu, mitte kohandatud baseUrl-i abil:

| id           | nimi                    | tarnija             | baseUrlSupport | configType     | acpSpawnable |
| ------------ | ----------------------- | ------------------- | -------------- | -------------- | ------------ |
| claude       | Claude Code             | Anthropic           | full           | env            | true         |
| codex        | OpenAI Codex CLI        | OpenAI              | full           | custom         | true         |
| zcode        | ZCode (GLM Coding Plan) | Z.ai                | none           | custom         | false        |
| cline        | Cline                   | OSS (ex-Claude Dev) | full           | custom         | true         |
| kilo         | Kilo Code               | Kilo-Org            | full           | custom         | false        |
| roo          | Roo Code                | Roo (OSS)           | full           | guide          | false        |
| continue     | Continue                | continue.dev        | full           | guide          | false        |
| aider        | Aider                   | OSS (P. Gauthier)   | full           | guide          | true         |
| forge        | ForgeCode               | Antinomy HQ         | full           | custom         | true         |
| jcode        | jcode                   | 1jehuang (OSS)      | full           | custom         | false        |
| deepseek-tui | DeepSeek TUI            | Hunter Bown (OSS)   | full           | custom         | false        |
| codewhale    | CodeWhale               | Hmbown (OSS)        | full           | custom         | false        |
| opencode     | OpenCode                | Anomaly (ex-SST)    | full           | guide          | true         |
| droid        | Factory Droid           | Factory AI          | partial        | guide          | false        |
| copilot      | GitHub Copilot CLI      | GitHub/MS           | full           | custom         | false        |
| cursor-cli   | Cursor CLI              | Anysphere           | partial        | guide          | true         |
| smelt        | Smelt                   | leonardcser (OSS)   | full           | custom         | false        |
| pi           | Pi (pi-coding-agent)    | M. Zechner (OSS)    | full           | custom         | false        |
| grok-build   | Grok Build              | xAI                 | full           | custom         | false        |
| crush        | Crush                   | OSS (Charm)         | full           | custom         | false        |
| qwen         | Qwen Code               | Alibaba             | full           | guide          | true         |
| cursor       | Cursor                  | Anysphere           | none           | guide          | false        |
| antigravity  | Antigravity             | Google              | none           | mitm           | false        |
| hermes       | Hermes                  | Nous Research       | none           | guide          | false        |
| kiro         | Kiro AI                 | Amazon              | none           | mitm           | false        |
| custom       | Custom CLI              | —                   | full           | custom-builder | false        |

Tööriistadel, mille `baseUrlSupport: "partial"` on, kuvatakse kaardil märgis "⚠ Base URL parcial".

## 2. CLI-agentide kataloog (10 tööriista)

Autonoomsed agentid, mis ilmuvad lehel `/dashboard/cli-agents`:

| id           | name             | vendor                   | baseUrlSupport | acpSpawnable |
| ------------ | ---------------- | ------------------------ | -------------- | ------------ |
| hermes-agent | Hermes Agent     | Nous Research            | full           | false        |
| openclaw     | OpenClaw         | OSS (P. Steinberger)     | full           | true         |
| goose        | Goose            | Block / Linux Foundation | full           | true         |
| interpreter  | Open Interpreter | OSS                      | full           | true         |
| warp         | Warp AI          | Warp Inc.                | partial        | true         |
| agent-deck   | Agent Deck       | asheshgoplani (OSS)      | full           | false        |
| omp          | Oh My Pi         | OSS                      | full           | true         |
| letta        | Letta CLI        | Letta                    | full           | false        |
| prime-agent  | Prime Agent      | Prime Intellect (OSS)    | full           | false        |
| 5dive        | 5dive            | OSS (5dive-ai)           | full           | false        |

---

## 3. ACP-agentid (/dashboard/acp-agents)

See leht (nimetatud ümber `/dashboard/agents`) näitab CLI-sid, mida OmniRoute saab **käivitada** stdio/ACP-protokolli kaudu taustal töötavate täitevmootoritena. Kataloogi hoitakse eraldi failis `src/lib/acp/registry.ts` ja see **ei ole** sama mis `CLI_TOOLS`.

---

## 4. MITM tagaajamise nimekiri (dashboardil näidamata)

Järgnevad CLI-d ei toeta kohandatud baas-URL-i loomulikult ja **ei ole loetletud** CLI Code'i ega CLI Agents lehtedel. Need on kandidaadid MITM-i püüdmiseks plaanis 11:

| CLI                 | Põhjus                                                       |
| ------------------- | ------------------------------------------------------------ |
| windsurf            | BYOK piiratud valitud Claude mudelitega + ettevõtte URL/luba |
| amp                 | Suletud ökosüsteem (Sourcegraph)                             |
| amazon-q / kiro-cli | AWS SSO autentimine, kohandatud URL puudub                   |
| cowork              | Anthropic Desktop, konfigureeritav lõpp-punkt puudub         |

Täieliku ristviite jaoks vaata `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`.

---

## 5. Partiitehete tuvastamise API

Kõik tööriistade tuvastamised koondatakse ühte lõpppunkti:

**`GET /api/cli-tools/all-statuses`**

- Autentimine: `requireCliToolsAuth(request)` (sama mis teistel `/api/cli-tools/` marsruutidel)
- Tagastab: `Record<toolId, ToolBatchStatus>` (tüüp: `src/shared/types/cliBatchStatus.ts`)
- Strateegia: `Promise.all` kõigi tööriistade üle, 5s aegpiir tööriista kohta
- Vahemälu: mälus LRU, indekseeritud konfiguratsioonifaili `mtime` järgi. Vahemälu tühistatakse, kui muutub `mtime`. Lähtestatakse serveri taaskäivitamisel.

Vastuse struktuur tööriista kohta:

```ts
interface ToolBatchStatus {
  detection: {
    installed: boolean;
    runnable: boolean;
    version?: string;
    command?: string;
    commandPath?: string;
    reason?: string;
  };
  config: {
    status: "configured" | "not_configured" | "not_installed" | "unknown" | "other";
    endpoint?: string | null;
    lastConfiguredAt?: string | null;
  };
  error?: string; // puhastatud, ilma jadajälgedeta
}
```

## 6. Seadistuste käsitlejad uutele tööriistadele

Uutel tööriistadel, mille `configType: "custom"`, on eraldi seadistuste API marsruudid:

| Marsruut                                    | Tööriist                                                                     |
| ------------------------------------------- | ---------------------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                                      |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url lipp)                                                      |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, aegunud)                                      |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, primaarne + aegunud `~/.deepseek` sünkroonimine) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                                        |
| `POST /api/cli-tools/pi-settings`           | Pi programmeerimisagent                                                      |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)                        |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + eraldi `. võti`)                        |

Kõik marsruudid kasutavad veavastuste jaoks `sanitizeErrorMessage()` (Rang Reegel #12).

---

## 7. Töölaudade lehtede arhitektuur

### CLI Code (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — serverikomponent
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — kliendiruudustik
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — tööriistade üksikasja leht
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 spetsialiseeritud tööriistakaarti + `ToolDetailClient.tsx`

### CLI Agendid (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — serverikomponent
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — kliendiruudustik
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — taaskasutab `ToolDetailClient`

### ACP Agendid (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — serverikomponent (teisaldatud `agents/` kaustast)

### Ühised kasutajaliidese komponendid (`src/shared/components/cli/`)

| Fail                    | Eesmärk                                                |
| ----------------------- | ------------------------------------------------------ |
| `CliToolCard.tsx`       | Nutikas olekukaart (tuvastus + seadistus + lõpp-punkt) |
| `CliConceptCard.tsx`    | Leheküljepõhine kontsepti selgituskaart                |
| `CliComparisonCard.tsx` | Kolme veeru võrdlus erinevate CLI tüüpide vahel        |
| `BaseUrlSelect.tsx`     | Lõpp-punkti rippmenüü (Kohalik/Pilv/Custom)            |
| `ApiKeySelect.tsx`      | API võtme valija                                       |
| `ManualConfigModal.tsx` | Kopeeritava seadistuskoodi fragmendi modaaldialoog     |

### Ühised konksud (`src/shared/hooks/cli/`)

| Fail                      | Eesmärk                                                                     |
| ------------------------- | --------------------------------------------------------------------------- |
| `useToolBatchStatuses.ts` | Hangib `/api/cli-tools/all-statuses`, haldab laadimise/värskendamise olekut |

---

## 8. i18n

Uued nimeruumid lisatud plaanis 14 F9:

| Nimeruum    | Eesmärk                                                                                    |
| ----------- | ------------------------------------------------------------------------------------------ |
| `cliCommon` | Jagatud stringid (kaardipealdised, kontseptide/võrdluste tekstid, üksikasjalehe pealdised) |
| `cliCode`   | CLI Code'i lehe stringid                                                                   |
| `cliAgents` | CLI Agents lehe stringid                                                                   |
| `acpAgents` | ACP Agents lehe stringid                                                                   |

Täielikud PT-BR ja EN tõlked on olemas. 39 muud keelevarianti kasutavad automaatselt EN-i tagasipöördumist nimeruumi taseme ühendamise kaudu `src/i18n/request.ts` failis.

---

## 9. Kiire algustõus

### 1. samm — Hankige OmniRoute API võti

1. Avage `/dashboard/api-manager` → **Loo API võti**
2. Andke sellele nimi (nt. `cli-cli-tools`) ja valige kõik õigused
3. Kopeerige võti — seda on vaja iga alloleva CLI jaoks

> Teie võti näeb välja selline: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### 2. samm — Installige CLI tööriistad

Kõik npmil põhinevad tööriistad nõuavad Node.js 22.22.2+ või 24.x versiooni:

```bash
# Claude Code (Anthropic)
npm install -g @anthropic-ai/claude-code

# OpenAI Codex
npm install -g @openai/codex

# OpenCode
npm install -g opencode-ai

# Cline
npm install -g cline

# KiloCode
npm install -g kilocode

# Qwen Code
npm install -g @qwen-code/qwen-code

# Google Gemini CLI (käivitatav `omniroute run gemini` kaudu → /v1beta pind)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # Rustil põhinev

# Pi koodiagent
# vaata installimiseks https://github.com/zechnerj/pi-coding-agent

# jcode
# vaata installimiseks https://github.com/1jehuang/jcode
```

---

### 3. samm — Konfigureerimine juhtpaneeli kaudu

1. Minge `http://localhost:20128/dashboard/cli-code`
2. Leidke oma tööriist ruudust
3. Klõpsake kaardil tööriista üksikasjalehe avamiseks
4. Valige oma API võti ja baas-URL
5. Klõpsake **Rakenda konfiguratsioon** või kopeerige käsitsi konfiguratsiooni lõik

---

### 4. samm — Määrake globaalsed keskkonnamuutujad

```bash
# OmniRoute universaalne lõpp-punkt
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI loeb GOOGLE_GEMINI_BASE_URL JUURD (selle SDK lisab ise /v1beta/...)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> **Kaugserveri** jaoks asendage `localhost:20128` serveri IP-aadressi või domeeniga,
> nt. `http://<teie-serveri-ip>:20128`.

---

### 4. samm — Konfigureerige iga tööriist

#### Claude Code

```bash
# Looge ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Kasutage ühtset Anthropic väravat Claude Code'i jaoks. Ärge lisage siia `/v1` lõppu.

**Test:** `claude "tere"`

---

#### OpenAI Codex

Tänapäevane Codex (v0.137+) loeb ainult `~/.codex/config.toml` — vana
`config.yaml` kuulub vanale npm CLI-le ja seda ignoreeritakse vaikselt. API
võti jääb `OMNIROUTE_API_KEY` keskkonnamuutujasse (`env_key`), mitte kunagi
faili sisse:

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.toml << EOF
model_provider = "omniroute"

[model_providers.omniroute]
name                 = "OmniRoute"
base_url             = "http://localhost:20128/v1"
env_key              = "OMNIROUTE_API_KEY"
requires_openai_auth = false
EOF
export OMNIROUTE_API_KEY="sk-your-omniroute-key"
```

Täielik viide (profiilid, `wire_api`, kontekstiaknad): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

**Test:** `codex "kui palju on 2+2?"`

---

#### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/opencode.json << EOF
{
  "\$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "sk-your-omniroute-key"
      },
      "models": {
        "claude-sonnet-4-5": { "name": "claude-sonnet-4-5" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3-flash": { "name": "gemini-3-flash" }
      }
    }
  }
}
EOF
```

**Test:** `opencode`

> Kasutage `opencode run "teie käsk" --model omniroute/claude-sonnet-4-5-thinking --variant high`
> mõtlemisvariantide saatmiseks.

---

#### Cline (CLI või VS Code)

**CLI režiim:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**VS Code režiim:**
Cline laiendi sätted → API tarnija: `OpenAI Compatible` → Baas-URL: `http://localhost:20128/v1`

Või kasutage OmniRoute juhtpaneeli → **CLI tööriistad → Cline → Rakenda konfiguratsioon**.

---

#### KiloCode (CLI või VS Code)

**CLI režiim:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**VS Code sätted:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

Või kasutage OmniRoute juhtpaneeli → **CLI tööriistad → KiloCode → Rakenda konfiguratsioon**.

---

#### Continue (VS Code laiend)

Muutke `~/.continue/config.yaml`:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

Muutmise järel taaskäivitage VS Code.

---

#### VS Code Insiders (`chatLanguageModels.json`)

Kasutage seda siis, kui VS Code Insiders on konfigureeritud kohandatud lõpp-punktide mudelite jaoks ja soovite, et OmniRoute töötaks ilma kohandatud päise väljata.

**Soovitatav asukoht:**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**Näide tokeniseeritud OmniRoute aliase kasutamisest:**

```json
[
  {
    "vendor": "customendpoint",
    "id": "auto",
    "name": "OmniRoute Auto",
    "family": "gpt-4",
    "version": "1.0.0",
    "url": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/chat/completions",
    "modelsUrl": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/models",
    "requestFormat": "openai-chat-completions",
    "contextWindow": 256000,
    "maxOutputTokens": 32768,
    "auth": {
      "type": "none"
    }
  }
]
```

**Märkused:**

- Asendage `sk-your-omniroute-key` OmniRoute'is loodud API võtmega.
- Väli `url` peaks osutama `/api/v1/vscode/{token}/chat/completions`.
- Väli `modelsUrl` peaks osutama `/api/v1/vscode/{token}/models`.
- Eelistage tavalist `/v1` + Bearer päise voogu, kui klient toetab kohandatud päiseid.
- URL-sse manustatud tokenid on ühilduvuse tagamiseks ja võivad ilmuda redaktori logidesse või puhverserveri ajalukku.

---

#### Kiro CLI (Amazon)

```bash
# Logige sisse oma AWS/Kiro kontole:
kiro-cli login

# CLI kasutab oma autentimist — OmniRoute'i pole vaja Kiro CLI enda jaoks taustana.
# Kasutage kiro-cli koos OmniRoute'iga teiste tööriistade jaoks.
kiro-cli status
```

**Kiro IDE** töölauarakenduse jaoks kasutage OmniRoute'i pakutavat MITM lõpp-punkti
all `/dashboard/cli-tools → Kiro`.

---

## 10. Sisemine OmniRoute käsureakasutajaliides

Käivitatav `omniroute` pakub käske serveri elutsükli, seadistamise, diagnostika ja pakkuja haldamise jaoks. Sisenemispunkt: `bin/omniroute.mjs`.

```bash
omniroute                              # Käivita server (vaikimisi port 20128)
omniroute setup                        # Interaktiivne seadistusnõustaja
omniroute doctor                       # Kontrolli konfiguratsiooni, andmebaasi, portide, töökeskkonna olekut
omniroute providers list               # Konfigureeritud pakkujaühendused
omniroute providers test-all           # Testi kõiki aktiivseid ühendusi
omniroute reset-password               # Lähtesta administraatori parool
omniroute logs                         # Voog pallipäevikuid
omniroute health                       # Üksikasjalik tervisekontroll (katkestajad, vahemälu, mälu)
omniroute --version                    # Prindi versioon
omniroute --help                       # Näita kõiki käske
```

### Seadistamine ja initsialiseerimine

````bash
omniroute setup                        # Interaktiivne seadistusnõustaja
omniroute setup --non-interactive      # CI/automatiseerimise režiim (loeb keskkonnamuutujaid + lippe)
omniroute setup --password '<value>'   # Määra administraatori parool otse
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # Lisa ja testi pakkuja ühes toimingus
`

Mitteinteraktiivse seadistuse jaoks tunnustatud keskkonnamuutujad:

| Muutuja             | Otstarve                                                         |
| ------------------- | ---------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | Pakkuja API võti (seotud lipuga `--api-key` läbi Commander `.env()`) |
| `DATA_DIR`          | Kirjuta üle OmniRoute andmekataloog                               |

Kõiki muid mitteinteraktiivseid sisendeid edastatakse lippudena, mitte keskkonnamuutujatena:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(vaata ülal `omniroute setup` valikuid).

### Diagnostika

```bash
omniroute doctor                       # Kontrolli konfiguratsiooni, andmebaasi, portide, töökeskkonna, mälu, elusolekut
omniroute doctor --json                # Masinloetav JSON
omniroute doctor --no-liveness         # Jäta vahele HTTP tervisekontrolli päring
omniroute doctor --host 0.0.0.0        # Kirjuta üle elusoleku host
omniroute doctor --liveness-url <url>  # Tervise lõpp-punkti täielik URL kirjutus
````

Arst teostab need kontrollid: `Konfiguratsioon`, `Andmebaas`, `Salvestus/krüpteerimine`,
`Portide kättesaadavus`, `Node töökeskkond`, `Natiivne käivitatav` (better-sqlite3),
`Mälu` ja `Serveri elusolek`. See väljub mittenullväärtusega, kui mõni kontroll on `ebaõnnestunud`.

### Pakkuja haldamine

```bash
omniroute providers available                       # OmniRoute pakkuja kataloog
omniroute providers available --search openai       # Filtreeri kataloogi id/nime/hüüdnime/kategooria järgi
omniroute providers available --category api-key    # Filtreeri kategooria järgi (api-key, oauth, tasuta, ...)
omniroute providers available --json                # Masinloetav JSON

omniroute providers list                            # Konfigureeritud pakkujaühendused
omniroute providers list --json

omniroute providers test <id|name>                  # Testi ühte konfigureeritud ühendust
omniroute providers test-all                        # Testi kõiki aktiivseid ühendusi
omniroute providers validate                        # Ainult kohalik struktuurivalideerimine
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # Olemasolev OAuth voo kasutamine
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` on API-esimene ja töötab seetõttu
aktiivse kohaliku või kaugkonteksti vastu. Tunnistuste sisend peaks kasutama
`--credential-stdin` või `--credential-env`; `--dry-run --json` teatab ainult
redigeeritud kohalolu/kujundit. `providers available` loeb OmniRoute kataloogi;
`providers list/test/test-all/validate` säilitavad oma kohaliku SQLite käitumise
ja ei nõua serveri töölemasolu.

### Taastamine ja lähtestamine

```bash
omniroute reset-password                # Lähtesta administraatori parool (samuti: omniroute-reset-password)
omniroute reset-encrypted-columns       # Näita hoiatust + kuiv-testi krüpteeritud tunnuste lähtestamiseks
omniroute reset-encrypted-columns --force  # tegelikult nulli krüpteeritud tundmed SQLite-is
```

### Tunnuste eksport (⚠ kasuta ettevaatlikult)

```bash
omniroute auth export                                 # Näita hoiatust + kinnitusvärav – juurdepääs puudub andmebaasile
omniroute auth export --force                          # Ekspordi KÕIKIDE ühenduste DEKRÜPTEERITUD tundmed stdout-ile JSONina
omniroute auth export --force --id <id>                 # Ekspordi ainult vaste ühendus
omniroute auth export --force --format env               # Eraldi OMNIROUTE_<PROVIDER>_<FIELD>=<value> read
omniroute auth export --force --out creds.json           # Kirjuta faili (loodud 0600 õigustega)
```

`auth export` on **ainult kohalik** (otse SQLite lugemine, ei HTTP marsruuti) ja trükib/kirjutab tahtlikult
**selgeteksti** `apiKey`/`accessToken`/`refreshToken`/`idToken` väärtusi – see on funktsioon, mitte
vea. Andmebaasist ei loeta midagi ja midagi ei dekrüpteerita ilma `--force`-ta.
Stderr-i hoiatusteade trükitakse alati enne mis tahes selgeteksti väljastamist. Nõuab `STORAGE_ENCRYPTION_KEY`
määramist. Väli, mis ebaõnnestub dekrüpteerimisel (vanan võti, rikutud šifritekst), edastatakse
`<field>DecryptFailed: true` asemel kogu ekspordi katkestamisest või aluseks oleva vea lekkest.

### Muud alamkäsud

Need eeldavad töötavat OmniRoute serverit, välja arvatud juhul, kui on märgitud teisiti:

```bash
omniroute status                       # Põhjalik töökeskkonna olek
omniroute logs                         # Voog pallipäevikuid (--json, --search, --follow)
omniroute config show                  # Näita praegust konfiguratsiooni

omniroute provider list                # Saadaolevate pakkujate loend (pakkuja list alias)
omniroute provider add                 # Registreeri OmniRoute tööriistana pakkujana
omniroute keys add | list | remove     # Halda API võtmeid
omniroute models [provider]            # Mudelite loend (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # Konfiguratsiooni + andmebaasi hetktõmmis
omniroute restore                      # Taasta eelmisest hetktõmmisest

omniroute health                       # Üksikasjalik tervisekontroll (katkestajad, vahemälu, mälu)
omniroute quota                        # Pakkuja kvoodi kasutus
omniroute cache                        # Vahemälu olek
omniroute cache clear                  # Tühjenda semantiline + allkirja vahemälu

omniroute mcp status | restart         # MCP serveri olek / taaskäivitus
omniroute a2a status | card            # A2A serveri olek / agendi kaart

omniroute tunnel list | create | stop  # Halda turge (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # Kontrolli / määra keskkonnamuutujaid (ajutiselt)

omniroute test                         # Pakkuja ühenduvuse suitsutesti
omniroute update                       # Kontrolli värskendusi
omniroute completion                   # Loo kesta lõpuleviimine
```

### Üldised lipud

| Lipp                                                                          | Kirjeldus                                     |
| ----------------------------------------------------------------------------- | --------------------------------------------- |
| `--no-open`                                                                   | Ära avada automaatselt brauserit käivitamisel |
| `--port <n>` # Kirjuta üle API port (vaikimisi 20128)                         |
| `--mcp` # Käivita MCP serverina stdio kaudu (IDE-de jaoks)                    |
| `--non-interactive` # CI režiim (küsitled puudub; loeb keskkonnast/lippudest) |
| `--json` # Masinloetav JSON väljund (doctor, providers jne.)                  |
| `--help`, `-h` # Näita käsispetsiifilist abi                                  |
| `--version`, `-v` # Prindi installitud versioon                               |

## Saadaolevad API-lõpp-punktid

| Lõpp-punkt                 | Kirjeldus                          | Kasutatakse                            |
| -------------------------- | ---------------------------------- | -------------------------------------- |
| `/v1/chat/completions`     | Standardne vestlus (kõik pakkujad) | Kõik kaasaegsed tööriistad             |
| `/v1/responses`            | Vastuste API (OpenAI formaat)      | Codex, agentsed töövood                |
| `/v1/completions`          | Vanemate tekstide lõpuleviimine    | Vanemad tööriistad kasutades `prompt:` |
| `/v1/embeddings`           | Tekstipeetmised                    | RAG, otsing                            |
| `/v1/images/generations`   | Pildi genereerimine                | GPT-Image, Flux jne.                   |
| `/v1/audio/speech`         | Tekstist kõneks                    | ElevenLabs, OpenAI TTS                 |
| `/v1/audio/transcriptions` | Kõnest tekstiks                    | Deepgram, AssemblyAI                   |

Valmis kleepimiseks näited tokeniseeritud OmniRoute URL-iga:

```txt
Näidis: sk-a3ab3c080beaee3a-69f4a4-070d71af

Standardne OpenAI baas: http://localhost:20128/v1
VS Code mudelid: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
Vestlus: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
Vastused: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Ollama sildid: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Ollama vestlus: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## Veaotsing

| Viga                                             | Põhjus                              | Lahendus                                                    |
| ------------------------------------------------ | ----------------------------------- | ----------------------------------------------------------- |
| `Connection refused`                             | OmniRoute ei tööta                  | `omniroute serve`                                           |
| `401 Unauthorized`                               | Vale API võti                       | Kontrolli `/dashboard/api-manager`                          |
| `No combo configured`                            | Aktiivset marsruutimise kombot pole | Seadista `/dashboard/combos`                                |
| CLI näitab "not installed"                       | Binaarfail ei ole PATH-is           | Kontrolli `which <command>`                                 |
| Dashboard näitab "not detected" paigalduse järel | Vahemälu aegunud                    | Klõpsa "⟳ Värskenda tuvastust" juhtpaneelil                 |
| Vana link `/dashboard/cli-tools`                 | Eel-v3.8.6 järjehoidja              | Automaatselt suunatakse ümber `/dashboard/cli-code` (308)   |
| Vana link `/dashboard/agents`                    | Eel-v3.8.6 järjehoidja              | Automaatselt suunatakse ümber `/dashboard/acp-agents` (308) |
