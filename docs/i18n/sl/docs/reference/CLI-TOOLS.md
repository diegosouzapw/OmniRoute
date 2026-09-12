# CLI-TOOLS (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇬🇷 [el](../../../el/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇪🇪 [et](../../../et/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇪 [ga](../../../ga/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇷 [hr](../../../hr/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇱🇹 [lt](../../../lt/docs/reference/CLI-TOOLS.md) · 🇱🇻 [lv](../../../lv/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇲🇹 [mt](../../../mt/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇷🇸 [sr](../../../sr/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "Orodja CLI — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-23
---

# Orodja CLI — OmniRoute

Nazadnje posodobljeno: 2026-08-23

OmniRoute se integrira s tremi kategorijami orodij CLI, razporejenimi na treh namenskih straneh nadzorne plošče:

| Stran              | Pot                     | Koncept                                                                             | Število         |
| ------------------ | ----------------------- | ----------------------------------------------------------------------------------- | --------------- |
| **CLI-ji za kodo** | `/dashboard/cli-code`   | Orodja za kodiranje, usmerjena v OmniRoute (odjemalec → CLI → OmniRoute → ponudnik) | 26              |
| **Agenti CLI**     | `/dashboard/cli-agents` | Avtonomni agenti, usmerjeni v OmniRoute (enak tok, širši obseg)                     | 10              |
| **Agenti ACP**     | `/dashboard/acp-agents` | CLI-ji, ki jih OmniRoute zažene kot zaledje prek stdio/ACP (obratni tok)            | glejte register |

Podedovane poti se preusmerijo s kodo 308: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## Kako deluje

```
CLI-ji za kodo / agenti CLI (tok uporabe):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (vsi so usmerjeni v OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute usmeri zahtevo k ustreznemu ponudniku)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

Agenti ACP (obratni tok zagona):
    Zahteva odjemalca → OmniRoute → zažene CLI prek stdio/ACP → odgovor
```

**Prednosti:**

- En ključ API za upravljanje vseh orodij
- Spremljanje stroškov vseh CLI-jev na nadzorni plošči
- Preklapljanje modelov brez ponovnega konfiguriranja vsakega orodja
- Deluje lokalno in na oddaljenih strežnikih (VPS, Docker, Akamai, Cloudflare Tunnel)

---

## Samodejna konfiguracija z `setup-*`

Konfiguracije posameznega orodja vam ni treba pisati ročno. OmniRoute vključuje ukaz `setup-*`
za vsak podprti CLI, ki prebere **aktualni** katalog modelov iz delujočega
OmniRoute (lokalnega ali oddaljenega) in zapiše konfiguracijo orodja v vaš računalnik:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
omniroute setup-5dive
```

Vsak sprejema `--remote <url> --api-key <key>` (konfiguriranje lokalnega orodja za
uporabo oddaljenega OmniRoute), `--dry-run` (predogled brez zapisovanja) in `--port`. Orodja
brez samodejnega odkrivanja modelov (Cline, Kilo, Roo, Goose, Aider, Qwen, 5dive) sprejemajo
`--model <id>` (in `--yes` za neinteraktivne zagone). `setup-5dive` je edini
postopek, ki ne zapisuje pod `$HOME`: konfigurira gručo agentov 5dive tako, da
na gostitelju gruče zapiše korenski profil za preverjanje pristnosti, zato se znova izvede prek `sudo`
in nima lastnega oddaljenega načina. Če želite zagnati CLI z
vstavljenimi ustreznimi spremenljivkami okolja in brez zapisovanja kakršne koli konfiguracije, uporabite splošni
zaganjalnik `omniroute run <target>` (claude, codex, aider, goose, opencode, qwen,
gemini — cilji in vzdevki izvirajo iz `bin/cli/cli-manifest.mjs`); podedovana
zaganjalnika za posamezni orodji `omniroute launch` (Claude Code) in `omniroute launch-codex`
(Codex) ostajata na voljo. Gemini CLI podpira samo zagon: je cilj ukaza `omniroute run`,
vendar nima postopka `setup-*`/`configure`.

> **Celotna referenca:** glavna tabela — kaj zapiše posamezni ukaz, vse zastavice,
> lokalni in oddaljeni način ter katera orodja zahtevajo pripono `/v1` — je na voljo v
> dokumentu **[Integracije CLI](../guides/CLI-INTEGRATIONS.md)**.

### Izvajanje teh ukazov znotraj vsebnika

Ukaz `setup-*`, izveden znotraj vsebnika OmniRoute, zapisuje v
domači imenik samega vsebnika, ki ga noben CLI na gostitelju ne bere in ki izgine skupaj z
vsebnikom. OmniRoute to zazna in namesto zapisovanja konča s kodo `2` ter prikaže
navodila. Na voljo sta dva podprta načina nadaljevanja — namestite CLI na gostitelja in
uporabite `omniroute connect` za povezavo z vsebnikom ali pa konfiguracijske imenike priklopite z vezanim priklopom in nastavite
`CLI_CONFIG_HOME` (profil `host` za compose). Vsak ukaz `setup-*`, pa tudi
`omniroute configure` in `omniroute config set`, sprejema
`--allow-container-write`, kadar dejansko želite konfigurirati CLI-je samega vsebnika;
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` enako omogoči za
strežnik. Glejte
[Vodnik za Docker → Konfiguriranje orodij CLI na gostitelju](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker).

**Končna točka za uveljavitev** na nadzorni plošči (`POST /api/cli-tools/apply`) uveljavlja
enako varovalo: v vsebniku zapisovanje, katerega cilj ni vezano priklopljen z
gostitelja, vrne **`422`** z `containerEphemeralTarget: true`, varnim besedilom
napake in — za orodja s postopkom za gostitelja (claude, codex, opencode, cline,
kilo, continue) — z `hostSetupCommand` (npr. `omniroute setup-opencode`), ki ga je treba
namesto tega izvesti na gostitelju; nič se ne zapiše. `dryRun: true` še naprej deluje v načinu
vsebnika ter vrne ustvarjeno vsebino in ciljno pot, ne da bi se dotaknil diska, zato
lahko konfiguracijo predogledate na nadzorni plošči in jo uveljavite na gostitelju. To vedenje je
namerno in pred regresijami zaščiteno s testom
`tests/unit/api/cli-tools/apply-container-guard.test.ts` — napake 422 nikoli ne »odpravite«
z odstranitvijo varovala.

---

## Enotni vir resnice

Poenoten katalog se nahaja v `src/shared/constants/cliTools.ts` kot `CLI_TOOLS: Record<string, CliCatalogEntry>`.

Vsak vnos ima naslednja polja (opredeljena v `src/shared/schemas/cliCatalog.ts`):

| Polje                                           | Vrsta                                                        | Opis                                                                            |
| ----------------------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------------------------- |
| `category`                                      | `"code" \| "agent"`                                          | Na kateri strani se prikaže orodje                                              |
| `vendor`                                        | `string`                                                     | Izvor orodja ("Anthropic", "OSS (P. Gauthier)")                                 |
| `acpSpawnable`                                  | `boolean`                                                    | Uporabno tudi kot agent ACP (prikaže se značka)                                 |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | Raven podpore za končne točke po meri. `"none"` = seznam čakajočih opravil MITM |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | Mehanizem konfiguracije                                                         |
| `id`, `name`, `color`, `description`, `docsUrl` | standard                                                     | Osnovna polja za prikaz                                                         |

Vnosi z `baseUrlSupport: "none"` **niso prikazani** na straneh nadzorne plošče — registrirani so na seznamu čakajočih opravil MITM za načrt 11 (glejte `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

### Ravni zmogljivosti (katalogizirano × zaznavno × nastavljivo × zagonsko)

Vsako katalogizirano orodje ni nujno zaznavno, nastavljivo ali zagonsko. Vsaka raven ima en
deklarativni vir, preizkus odstopanj pa zagotavlja njihovo usklajenost:

| Raven              | Pomen                                                                                    | Deklarirano v                                                       |
| ------------------ | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **Katalogizirano** | Prikazano v katalogu nadzorne plošče (ime, ponudnik, dokumentacija, vrsta konfiguracije) | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                    |
| **Zaznavno**       | Zaznavanje binarne datoteke/konfiguracije, preverjanja stanja, poti konfiguracije        | `src/shared/services/cliRuntime.ts` (izvajalni katalog `CLI_TOOLS`) |
| **Nastavljivo**    | Podprto z `omniroute configure <cli>` (obstaja recept za nastavitev)                     | `bin/cli/cli-manifest.mjs` (`configure: true`)                      |
| **Zagonsko**       | Podprto z `omniroute run <target>` (določeno je vstavljanje okolja/argumentov)           | `bin/cli/cli-manifest.mjs` (`run: true`)                            |

`bin/cli/cli-manifest.mjs` je kanonični izvedljivi manifest za površine ukazov CLI:
`run`, `configure` in generatorji dopolnjevanja v lupini iz njega pridobivajo svoje
sezname ciljev, razreševanje vzdevkov (na primer `kilocode`/`kilo-code`/`kilo_cli` → `kilo`)
in povezovanje zastavice `--model`. Varovalo pred odstopanji
`tests/unit/cli/cli-manifest-drift.test.ts` preverja, ali manifest, izvajalni
katalog, katalog uporabniškega vmesnika in vse uporabniške površine ostajajo usklajeni — če je cilj dodan
eni površini brez drugih, zbirka preizkusov ne uspe, namesto da bi se odstopanje neopazno povečevalo.

---

## 1. Katalog CLI Code (26 orodij)

Vsa orodja, ki so prikazana v `/dashboard/cli-code`. Orodja z nastavitvijo `baseUrlSupport: none` so namesto prek osnovnega URL-ja po meri povezana prek MITM-a ali navodil za ročno nastavitev:

| id           | name                    | vendor                    | baseUrlSupport | configType     | acpSpawnable |
| ------------ | ----------------------- | ------------------------- | -------------- | -------------- | ------------ |
| claude       | Claude Code             | Anthropic                 | full           | env            | true         |
| codex        | OpenAI Codex CLI        | OpenAI                    | full           | custom         | true         |
| zcode        | ZCode (GLM Coding Plan) | Z.ai                      | none           | custom         | false        |
| cline        | Cline                   | OSS (nekdanji Claude Dev) | full           | custom         | true         |
| kilo         | Kilo Code               | Kilo-Org                  | full           | custom         | false        |
| roo          | Roo Code                | Roo (OSS)                 | full           | guide          | false        |
| continue     | Continue                | continue.dev              | full           | guide          | false        |
| aider        | Aider                   | OSS (P. Gauthier)         | full           | guide          | true         |
| forge        | ForgeCode               | Antinomy HQ               | full           | custom         | true         |
| jcode        | jcode                   | 1jehuang (OSS)            | full           | custom         | false        |
| deepseek-tui | DeepSeek TUI            | Hunter Bown (OSS)         | full           | custom         | false        |
| codewhale    | CodeWhale               | Hmbown (OSS)              | full           | custom         | false        |
| opencode     | OpenCode                | Anomaly (nekdanji SST)    | full           | guide          | true         |
| droid        | Factory Droid           | Factory AI                | partial        | guide          | false        |
| copilot      | GitHub Copilot CLI      | GitHub/MS                 | full           | custom         | false        |
| cursor-cli   | Cursor CLI              | Anysphere                 | partial        | guide          | true         |
| smelt        | Smelt                   | leonardcser (OSS)         | full           | custom         | false        |
| pi           | Pi (pi-coding-agent)    | M. Zechner (OSS)          | full           | custom         | false        |
| grok-build   | Grok Build              | xAI                       | full           | custom         | false        |
| crush        | Crush                   | OSS (Charm)               | full           | custom         | false        |
| qwen         | Qwen Code               | Alibaba                   | full           | guide          | true         |
| cursor       | Cursor                  | Anysphere                 | none           | guide          | false        |
| antigravity  | Antigravity             | Google                    | none           | mitm           | false        |
| hermes       | Hermes                  | Nous Research             | none           | guide          | false        |
| kiro         | Kiro AI                 | Amazon                    | none           | mitm           | false        |
| custom       | CLI po meri             | —                         | full           | custom-builder | false        |

Orodja z nastavitvijo `baseUrlSupport: "partial"` imajo na kartici nadzorne plošče značko »⚠ Delna podpora za osnovni URL«.
---

## 2. Katalog agentov CLI (10 orodij)

Avtonomni agenti, ki so prikazani na `/dashboard/cli-agents`:

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

## 3. Agenti ACP (/dashboard/acp-agents)

Ta stran (preimenovana iz `/dashboard/agents`) prikazuje vmesnike CLI, ki jih lahko OmniRoute **zažene** kot zaledne izvajalne mehanizme prek protokola stdio/ACP. Katalog se vzdržuje ločeno v `src/lib/acp/registry.ts` in **ni** enak kot `CLI_TOOLS`.

---

## 4. Zaostala opravila MITM (niso prikazana na nadzorni plošči)

Naslednji vmesniki CLI izvorno ne podpirajo osnovnega URL-ja po meri in **niso navedeni** na straneh CLI Code ali CLI Agents. So kandidati za prestrezanje MITM v načrtu 11:

| CLI                 | Razlog                                                         |
| ------------------- | -------------------------------------------------------------- |
| windsurf            | BYOK je omejen na izbrane modele Claude ter poslovni URL/žeton |
| amp                 | Zaprt ekosistem (Sourcegraph)                                  |
| amazon-q / kiro-cli | Preverjanje pristnosti AWS SSO, brez URL-ja po meri            |
| cowork              | Anthropic Desktop, brez nastavljive končne točke               |

Za celoten navzkrižni sklic glejte `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`.

---

## 5. API za paketno zaznavanje

Zaznavanje vseh orodij je združeno prek ene končne točke:

**`GET /api/cli-tools/all-statuses`**

- Preverjanje pristnosti: `requireCliToolsAuth(request)` (enako kot pri drugih poteh `/api/cli-tools/`)
- Vrne: `Record<toolId, ToolBatchStatus>` (tip: `src/shared/types/cliBatchStatus.ts`)
- Strategija: `Promise.all` za vsa orodja, 5-sekundna časovna omejitev za posamezno orodje
- Predpomnilnik: LRU v pomnilniku, indeksiran glede na `mtime` konfiguracijske datoteke. Predpomnilnik se razveljavi, ko se `mtime` spremeni. Ponastavi se ob ponovnem zagonu strežnika.

Oblika odziva za posamezno orodje:

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
  error?: string; // prečiščeno, brez sledi sklada
}
```

---

## 6. Upravljalniki nastavitev za nova orodja

Nova orodja z `configType: "custom"` imajo namenske API-poti za nastavitve:

| Pot                                         | Orodje                                                                          |
| ------------------------------------------- | ------------------------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                                         |
| `POST /api/cli-tools/jcode-settings`        | jcode (zastavica --base-url)                                                    |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, podpora za starejše različice)                   |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, primarna + starejša sinhronizacija z `~/.deepseek`) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                                           |
| `POST /api/cli-tools/pi-settings`           | Agent za programiranje Pi                                                       |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)                           |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + namenski ključ `.env`)                     |

Vse poti za odzive z napakami uporabljajo `sanitizeErrorMessage()` (strogo pravilo št. 12).

---

## 7. Arhitektura strani nadzorne plošče

### Koda CLI (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — strežniška komponenta
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — odjemalska mreža
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — stran s podrobnostmi orodja
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 specializiranih kartic orodij + `ToolDetailClient.tsx`

### Agenti CLI (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — strežniška komponenta
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — odjemalska mreža
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — ponovno uporablja `ToolDetailClient`

### Agenti ACP (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — strežniška komponenta (premaknjena iz `agents/`)

### Skupne komponente uporabniškega vmesnika (`src/shared/components/cli/`)

| Datoteka                | Namen                                                              |
| ----------------------- | ------------------------------------------------------------------ |
| `CliToolCard.tsx`       | Pametna kartica stanja (zaznavanje + konfiguracija + končna točka) |
| `CliConceptCard.tsx`    | Kartica z razlago koncepta za posamezno stran                      |
| `CliComparisonCard.tsx` | Primerjava treh vrst CLI v treh stolpcih                           |
| `BaseUrlSelect.tsx`     | Spustni seznam končnih točk (lokalna/oblačna/po meri)              |
| `ApiKeySelect.tsx`      | Izbirnik ključa API                                                |
| `ManualConfigModal.tsx` | Modalno okno z izsekom konfiguracije za kopiranje                  |

### Skupna kljuka (`src/shared/hooks/cli/`)

| Datoteka                  | Namen                                                                                      |
| ------------------------- | ------------------------------------------------------------------------------------------ |
| `useToolBatchStatuses.ts` | Pridobi podatke iz `/api/cli-tools/all-statuses` ter upravlja stanje nalaganja/osveževanja |

---

## 8. i18n

Novi imenski prostori, dodani v načrtu 14 F9:

| Imenski prostor | Namen                                                                                   |
| --------------- | --------------------------------------------------------------------------------------- |
| `cliCommon`     | Skupni nizi (oznake kartic, besedila konceptov/primerjav, oznake strani s podrobnostmi) |
| `cliCode`       | Nizi strani CLI Code                                                                    |
| `cliAgents`     | Nizi strani CLI Agents                                                                  |
| `acpAgents`     | Nizi strani ACP Agents                                                                  |

Na voljo so celotni prevodi za PT-BR in EN. Preostalih 39 jezikovnih nastavitev samodejno uporabi EN prek združevanja na ravni imenskega prostora v `src/i18n/request.ts`.

---

## 9. Hiter začetek

### 1. korak — Pridobite ključ API OmniRoute

1. Odprite `/dashboard/api-manager` → **Ustvari ključ API**
2. Poimenujte ga (npr. `cli-tools`) in izberite vsa dovoljenja
3. Kopirajte ključ — potrebovali ga boste za vsako spodnje orodje CLI

> Vaš ključ je videti tako: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### 2. korak — Namestite orodja CLI

Vsa orodja, ki temeljijo na npm, zahtevajo Node.js 22.22.2+ ali 24.x:

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

# Google Gemini CLI (zagon prek `omniroute run gemini` → površina /v1beta)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # Temelji na Rustu

# Kodirni agent Pi
# za namestitev glejte https://github.com/zechnerj/pi-coding-agent

# jcode
# za namestitev glejte https://github.com/1jehuang/jcode
```

---

### 3. korak — Konfigurirajte prek nadzorne plošče

1. Pojdite na `http://localhost:20128/dashboard/cli-code`
2. V mreži poiščite svoje orodje
3. Kliknite kartico, da odprete stran s podrobnostmi orodja
4. Izberite ključ API in osnovni URL
5. Kliknite **Uporabi konfiguracijo** ali kopirajte izsek za ročno konfiguracijo

---

### 4. korak — Nastavite globalne spremenljivke okolja

```bash
# Univerzalna končna točka OmniRoute
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI prebere GOOGLE_GEMINI_BASE_URL na KORENSKI ravni (njegov SDK sam doda /v1beta/...)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> Za **oddaljeni strežnik** zamenjajte `localhost:20128` z naslovom IP ali domeno strežnika,
> npr. `http://<your-server-ip>:20128`.

---

### 4. korak — Konfigurirajte posamezno orodje

#### Claude Code

```bash
# Ustvarite ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Za Claude Code uporabite korensko pot poenotenega prehoda Anthropic. Tukaj ne dodajte `/v1`.

**Preizkus:** `claude "say hello"`

---

#### OpenAI Codex

Sodobni Codex (v0.137+) bere samo `~/.codex/config.toml` — stari
`config.yaml` pripada podedovanemu odjemalcu npm CLI in je tiho prezrt. Ključ API
ostane v spremenljivki okolja `OMNIROUTE_API_KEY` (`env_key`), nikoli
v datoteki:

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

Celotna referenčna dokumentacija (profili, `wire_api`, kontekstna okna): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

**Preizkus:** `codex "what is 2+2?"`

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

**Preizkus:** `opencode`

> Uporabite `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high`
> za pošiljanje različic z razmišljanjem.

---

#### Cline (CLI ali VS Code)

**Način CLI:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**Način VS Code:**
Nastavitve razširitve Cline → Ponudnik API: `OpenAI Compatible` → Osnovni URL: `http://localhost:20128/v1`

Lahko pa uporabite nadzorno ploščo OmniRoute → **Orodja CLI → Cline → Uporabi konfiguracijo**.

---

#### KiloCode (CLI ali VS Code)

**Način CLI:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**Nastavitve VS Code:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

Lahko pa uporabite nadzorno ploščo OmniRoute → **Orodja CLI → KiloCode → Uporabi konfiguracijo**.

---

#### Continue (razširitev za VS Code)

Uredite `~/.continue/config.yaml`:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

Po urejanju znova zaženite VS Code.

---

#### VS Code Insiders (`chatLanguageModels.json`)

To uporabite, ko je VS Code Insiders konfiguriran za modele s končnimi točkami po meri in želite, da OmniRoute deluje brez polja glave po meri.

**Priporočena lokacija:**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**Primer z uporabo psevdonima OmniRoute z žetonom:**

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

**Opombe:**

- Zamenjajte `sk-your-omniroute-key` s ključem API, ustvarjenim v OmniRoute.
- Polje `url` mora kazati na `/api/v1/vscode/{token}/chat/completions`.
- Polje `modelsUrl` mora kazati na `/api/v1/vscode/{token}/models`.
- Ko odjemalec podpira glave po meri, dajte prednost običajnemu toku `/v1` + glava Bearer.
- Žetoni, vdelani v URL, so nadomestna rešitev za združljivost in se lahko pojavijo v dnevnikih urejevalnika ali zgodovini posredniškega strežnika.

---

#### Kiro CLI (Amazon)

```bash
# Prijavite se v svoj račun AWS/Kiro:
kiro-cli login

# CLI uporablja lastno preverjanje pristnosti — OmniRoute ni potreben kot zaledje za sam Kiro CLI.
# Kiro-cli uporabljajte skupaj z OmniRoute za druga orodja.
kiro-cli status
```

Za namizno aplikacijo **Kiro IDE** uporabite končno točko MITM, ki jo izpostavlja OmniRoute
pod `/dashboard/cli-tools → Kiro`.

---

## 10. Interni CLI OmniRoute

Izvršljiva datoteka `omniroute` ponuja ukaze za življenjski cikel strežnika, nastavitev, diagnostiko in upravljanje ponudnikov. Vstopna točka: `bin/omniroute.mjs`.

```bash
omniroute                              # Zaženi strežnik (privzeta vrata 20128)
omniroute setup                        # Interaktivni čarovnik za nastavitev
omniroute doctor                       # Preveri konfiguracijo, podatkovno zbirko, vrata in izvajalno okolje
omniroute providers list               # Konfigurirane povezave s ponudniki
omniroute providers test-all           # Preizkusi vsako aktivno povezavo
omniroute reset-password               # Ponastavi skrbniško geslo
omniroute logs                         # Pretakaj dnevnike zahtev
omniroute health                       # Podrobno stanje (odklopniki, predpomnilnik, pomnilnik)
omniroute --version                    # Izpiši različico
omniroute --help                       # Prikaži vse ukaze
```

### Nastavitev in inicializacija

```bash
omniroute setup                        # Interaktivni čarovnik za nastavitev
omniroute setup --non-interactive      # Način CI/avtomatizacije (bere spremenljivke okolja in zastavice)
omniroute setup --password '<value>'   # Neposredno nastavi skrbniško geslo
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # Dodaj in preizkusi ponudnika v enem koraku
```

Prepoznane spremenljivke okolja za neinteraktivno nastavitev:

| Spremenljivka       | Namen                                                                    |
| ------------------- | ------------------------------------------------------------------------ |
| `OMNIROUTE_API_KEY` | API-ključ ponudnika (prek Commanderjevega `.env()` vezan na `--api-key`) |
| `DATA_DIR`          | Preglasi podatkovni imenik OmniRoute                                     |

Vsi drugi neinteraktivni vnosi se posredujejo kot zastavice in ne kot spremenljivke okolja:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(glejte zgornje možnosti ukaza `omniroute setup`).

### Diagnostika

```bash
omniroute doctor                       # Preveri konfiguracijo, podatkovno zbirko, vrata, izvajalno okolje, pomnilnik in delovanje
omniroute doctor --json                # Strojno berljiv JSON
omniroute doctor --no-liveness         # Preskoči preverjanje stanja prek HTTP-ja
omniroute doctor --host 0.0.0.0        # Preglasi gostitelja za preverjanje delovanja
omniroute doctor --liveness-url <url>  # Preglasi celoten URL končne točke za preverjanje stanja
```

Ukaz doctor izvede naslednja preverjanja: `Config`, `Database`, `Storage/encryption`,
`Port availability`, `Node runtime`, `Native binary` (better-sqlite3),
`Memory` in `Server liveness`. Če je katero koli preverjanje označeno kot `fail`, se konča z neničelno izhodno kodo.

### Upravljanje ponudnikov

```bash
omniroute providers available                       # Katalog ponudnikov OmniRoute
omniroute providers available --search openai       # Filtriraj katalog po id/name/alias/category
omniroute providers available --category api-key    # Filtriraj po kategoriji (api-key, oauth, free, ...)
omniroute providers available --json                # Strojno berljiv JSON

omniroute providers list                            # Konfigurirane povezave s ponudniki
omniroute providers list --json

omniroute providers test <id|name>                  # Preizkusi eno konfigurirano povezavo
omniroute providers test-all                        # Preizkusi vsako aktivno povezavo
omniroute providers validate                        # Samo lokalno strukturno preverjanje
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # Obstoječi tok OAuth
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

Ukazi `providers add/import/auth/edit/remove` primarno uporabljajo API in zato delujejo z
aktivnim lokalnim ali oddaljenim kontekstom. Poverilnice vnesite z možnostjo
`--credential-stdin` ali `--credential-env`; `--dry-run --json` sporoči samo
redigirano prisotnost/obliko. `providers available` bere katalog OmniRoute;
`providers list/test/test-all/validate` ohranijo lokalno vedenje SQLite in
ne zahtevajo, da strežnik deluje.

### Obnovitev in ponastavitev

```bash
omniroute reset-password                # Ponastavi skrbniško geslo (tudi: omniroute-reset-password)
omniroute reset-encrypted-columns       # Prikaži opozorilo in poskusni zagon ponastavitve šifriranih poverilnic
omniroute reset-encrypted-columns --force  # Dejansko nastavi šifrirane poverilnice v SQLite na null
```

### Izvoz poverilnic (⚠ ravnajte previdno)

```bash
omniroute auth export                                 # Prikaži opozorilo in zahtevo za potrditev — brez dostopa do podatkovne zbirke
omniroute auth export --force                          # Izvozi DEŠIFRIRANE poverilnice VSEH povezav v stdout kot JSON
omniroute auth export --force --id <id>                 # Izvozi samo ujemajočo se povezavo
omniroute auth export --force --format env               # Izpiši vrstice OMNIROUTE_<PROVIDER>_<FIELD>=<value>
omniroute auth export --force --out creds.json           # Zapiši v datoteko (ustvarjeno z dovoljenji 0600)
```

`auth export` deluje **samo lokalno** (neposredno branje SQLite, brez poti HTTP) ter namenoma izpiše/zapiše
vrednosti `apiKey`/`accessToken`/`refreshToken`/`idToken` kot **navadno besedilo** — to je funkcionalnost in ne
napaka. Brez možnosti `--force` se iz podatkovne zbirke ne prebere nič in nič se ne dešifrira. Pred izpisom
kakršnega koli navadnega besedila se v stderr vedno izpiše opozorilna pasica. Spremenljivka
`STORAGE_ENCRYPTION_KEY` mora biti nastavljena. Polje, ki ga ni mogoče dešifrirati (zastarel ključ, poškodovano
šifrirano besedilo), se sporoči kot `<field>DecryptFailed: true`, namesto da bi se celoten izvoz prekinil ali
razkrila osnovna napaka.

### Drugi podukazi

Ti predpostavljajo delujoč strežnik OmniRoute, razen če je navedeno drugače:

```bash
omniroute status                       # Celovito stanje izvajalnega okolja
omniroute logs                         # Pretakaj dnevnike zahtev (--json, --search, --follow)
omniroute config show                  # Prikaži trenutno konfiguracijo

omniroute provider list                # Navedi razpoložljive ponudnike (vzdevek za providers list)
omniroute provider add                 # Registriraj OmniRoute kot ponudnika v orodju
omniroute keys add | list | remove     # Upravljaj API-ključe
omniroute models [provider]            # Navedi modele (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # Ustvari posnetek konfiguracije in podatkovne zbirke
omniroute restore                      # Obnovi iz prejšnjega posnetka

omniroute health                       # Podrobno stanje (odklopniki, predpomnilnik, pomnilnik)
omniroute quota                        # Poraba kvote ponudnika
omniroute cache                        # Stanje predpomnilnika
omniroute cache clear                  # Počisti semantične predpomnilnike in predpomnilnike podpisov

omniroute mcp status | restart         # Stanje/ponovni zagon strežnika MCP
omniroute a2a status | card            # Stanje strežnika A2A/kartica agenta

omniroute tunnel list | create | stop  # Upravljaj tunele (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # Preglej/nastavi spremenljivke okolja (začasno)

omniroute test                         # Hiter preizkus povezljivosti ponudnika
omniroute update                       # Preveri posodobitve
omniroute completion                   # Ustvari samodejno dokončevanje za lupino
```

### Pogoste zastavice

| Zastavica           | Opis                                                |
| ------------------- | --------------------------------------------------- |
| `--no-open`         | Ob zagonu ne odpri samodejno brskalnika             |
| `--port <n>`        | Preglasi vrata API-ja (privzeto 20128)              |
| `--mcp`             | Zaženi kot strežnik MCP prek stdio (za okolja IDE)  |
| `--non-interactive` | Način CI (brez pozivov; bere iz okolja/zastavic)    |
| `--json`            | Strojno berljiv izhod JSON (doctor, providers itd.) |
| `--help`, `-h`      | Prikaži pomoč za posamezni ukaz                     |
| `--version`, `-v`   | Izpiši nameščeno različico                          |

---

## Razpoložljive končne točke API-ja

| Končna točka               | Opis                              | Uporaba                                   |
| -------------------------- | --------------------------------- | ----------------------------------------- |
| `/v1/chat/completions`     | Standardni klepet (vsi ponudniki) | Vsa sodobna orodja                        |
| `/v1/responses`            | API Responses (oblika OpenAI)     | Codex, agentski delovni tokovi            |
| `/v1/completions`          | Zastarele besedilne dopolnitve    | Starejša orodja, ki uporabljajo `prompt:` |
| `/v1/embeddings`           | Besedilne vložitve                | RAG, iskanje                              |
| `/v1/images/generations`   | Ustvarjanje slik                  | GPT-Image, Flux itd.                      |
| `/v1/audio/speech`         | Pretvorba besedila v govor        | ElevenLabs, OpenAI TTS                    |
| `/v1/audio/transcriptions` | Pretvorba govora v besedilo       | Deepgram, AssemblyAI                      |

Primeri z žetoniziranim URL-jem OmniRoute, pripravljeni za lepljenje:

```txt
Primer žetona: sk-a3ab3c080beaee3a-69f4a4-070d71af

Standardna osnova OpenAI: http://localhost:20128/v1
Modeli VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
Klepet VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
Odgovori VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Oznake Ollama: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Klepet Ollama: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## Odpravljanje težav

| Napaka                                               | Vzrok                               | Rešitev                                                 |
| ---------------------------------------------------- | ----------------------------------- | ------------------------------------------------------- |
| `Connection refused`                                 | OmniRoute se ne izvaja              | `omniroute serve`                                       |
| `401 Unauthorized`                                   | Napačen ključ API-ja                | Preverite v `/dashboard/api-manager`                    |
| `No combo configured`                                | Ni aktivne usmerjevalne kombinacije | Nastavite jo v `/dashboard/combos`                      |
| CLI prikazuje »ni nameščen«                          | Izvedljiva datoteka ni v PATH       | Preverite `which <command>`                             |
| Nadzorna plošča po namestitvi prikazuje »ni zaznano« | Predpomnilnik je zastarel           | Na nadzorni plošči kliknite »⟳ Osveži zaznavanje«       |
| Stara povezava `/dashboard/cli-tools`                | Zaznamek izpred različice v3.8.6    | Samodejno preusmerjeno na `/dashboard/cli-code` (308)   |
| Stara povezava `/dashboard/agents`                   | Zaznamek izpred različice v3.8.6    | Samodejno preusmerjeno na `/dashboard/acp-agents` (308) |
