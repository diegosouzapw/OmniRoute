# CLI-TOOLS (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "CLI கருவிகள் — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI கருவிகள் — OmniRoute

கடைசி புதுப்பிப்பு: 2026-08-18

OmniRoute மூன்று வகை CLI கருவிகளுடன் இணைகிறது, மூன்று தனிப்பட்ட டாஷ்போர்டு பக்கங்களில் பரவியுள்ளது:

| பக்கம்              | பாதை                    | கருத்து                                                                                    | எண்ணிக்கை         |
| ------------------- | ----------------------- | ------------------------------------------------------------------------------------------ | ----------------- |
| **CLI குறியீடுகள்** | `/dashboard/cli-code`   | OmniRoute-க்கு நீங்கள் குறிக்கிற குறியீட்டு கருவிகள் (Client → CLI → OmniRoute → Provider) | 26                |
| **CLI முகவர்கள்**   | `/dashboard/cli-agents` | OmniRoute-க்கு நீங்கள் குறிக்கிற சுயாதீன முகவர்கள் (அதே ஓட்டம், பரந்த அளவு)                | 8                 |
| **ACP முகவர்கள்**   | `/dashboard/acp-agents` | OmniRoute stdio/ACP மூலம் பின்னணி உருவாக்கும் CLI-கள் (மறுபுற ஓட்டம்)                      | பதிவு பார்க்கவும் |

பழைய பாதைகள் 308 மூலம் மறுபடியும் வழி மாற்றப்படுகின்றன: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## இது எப்படி வேலை செய்கிறது

```
CLI குறியீடுகள் / CLI முகவர்கள் (பயன்பாடு ஓட்டம்):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (எல்லாம் OmniRoute-க்கு குறிக்கிறது)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute சரியான வழங்கலுக்கு வழி மாற்றுகிறது)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

ACP முகவர்கள் (மறுபுற உருவாக்கும் ஓட்டம்):
    கிளையன்ட் கோரிக்கை → OmniRoute → stdio/ACP மூலம் CLI உருவாக்குகிறது → பதில்
```

**நன்மைகள்:**

- அனைத்து கருவிகளை நிர்வகிக்க ஒரு API விசை
- டாஷ்போர்டில் அனைத்து CLI-களுக்கான செலவுகளை கண்காணித்தல்
- ஒவ்வொரு கருவியையும் மறுபரிசீலனை செய்யாமல் மாதிரிகளை மாற்றுதல்
- உள்ளூர் மற்றும் தொலைதூர சேவையகங்களில் (VPS, Docker, Akamai, Cloudflare Tunnel) வேலை செய்கிறது

---

## `setup-*` உடன் தானாகக் கட்டமைக்கவும்

ஒவ்வொரு கருவியின் கட்டமைப்பை கையால் எழுத வேண்டிய அவசியமில்லை. OmniRoute ஒவ்வொரு ஆதரிக்கப்படும் CLI-க்கு `setup-*`
கமாண்டை வழங்குகிறது, இது ஓர் இயக்கத்தில் உள்ள OmniRoute-இல் இருந்து **உயிருடன்** உள்ள மாதிரி பட்டியலைப் படிக்கிறது
மற்றும் உங்கள் இயந்திரத்தில் கருவியின் சொந்த கட்டமைப்பை எழுதுகிறது:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

ஒவ்வொன்றும் `--remote <url> --api-key <key>` (ஒரு தொலைதூர OmniRoute-க்கு எதிராக உள்ளூர் கருவியை கட்டமைக்கவும்), `--dry-run` (எழுதாமல் முன்னோட்டம்), மற்றும் `--port` ஐ ஏற்கிறது. மாதிரி தானாகக் கண்டறியாத கருவிகள் (Cline, Kilo, Roo, Goose, Aider, Qwen) `--model <id>` (மற்றும் `--yes` என்றால் தொடர்பில்லாத ஓட்டங்களுக்கு) எடுக்கின்றன. சரியான சூழலை ஊட்டிய மற்றும் எந்த கட்டமைப்பும் எழுதாத CLI-ஐ தொடங்க, பொதுவான `omniroute run <target>` லாஞ்சரைப் பயன்படுத்தவும் (claude, codex, aider, goose, opencode, qwen, gemini — இலக்குகள் மற்றும் பெயர்கள் `bin/cli/cli-manifest.mjs` இல் இருந்து வருகின்றன); பழைய ஒவ்வொரு கருவிக்கும் தனித்துவமான லாஞ்சர்கள் `omniroute launch` (Claude Code) மற்றும் `omniroute launch-codex` (Codex) கிடைக்கின்றன. Gemini CLI என்பது தொடங்குவதற்கே: இது `omniroute run` இலக்கு ஆனால் `setup-*`/`configure` செய்முறை இல்லை.

> **முழு குறிப்புகள்:** மாஸ்டர் அட்டவணை — ஒவ்வொரு கட்டளை எழுதும், ஒவ்வொரு கொள்கை, உள்ளூர் மற்றும் தொலைதூர, மற்றும் எந்த கருவிகள் `/v1` பின்விளைவுகளை விரும்புகின்றன — **[CLI ஒருங்கிணைப்புகள்](../guides/CLI-INTEGRATIONS.md)** இல் உள்ளது.

### ஒரு கொண்டெய்னரில் உள்ளே இவற்றை இயக்குதல்

OmniRoute கொண்டெய்னரில் செயல்படுத்தப்படும் `setup-*` கட்டளை கொண்டெய்னரின் சொந்த வீட்டில் எழுதுகிறது,
அது எந்த ஹோஸ்ட் CLI-க்கும் படிக்கப்படாது மற்றும் கொண்டெய்னருடன் மறைந்து விடும். OmniRoute அதை கண்டுபிடிக்கிறது
மற்றும் எழுதுவதற்குப் பதிலாக வழிமுறைகளுடன் `2` ஐ வெளியேற்றுகிறது. முன்னேற்றத்திற்கு இரண்டு ஆதரிக்கப்படும் வழிகள் —
ஹோஸ்டில் CLI-ஐ நிறுவவும் மற்றும் `omniroute connect` கொண்டெய்னருக்கு, அல்லது கட்டமைப்பு அடைவுகளை பிணைக்கவும்
மற்றும் `CLI_CONFIG_HOME` ஐ அமைக்கவும் (கொம்போஸ் `host` சுயவிவரம்). ஒவ்வொரு `setup-*` கட்டளையும்,
மேலும் `omniroute configure` மற்றும் `omniroute config set`, கொண்டெய்னரின் சொந்த CLI-களை
கட்டமைக்க நீங்கள் உண்மையில் பொருத்தமாக இருந்தால் `--allow-container-write` ஐ ஏற்கிறது;
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` சேவையகத்திற்காக அதே செய்கிறது.
[Docker கையேடு → ஹோஸ்ட் CLI கருவிகளை கட்டமைத்தல்](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker) ஐப் பார்க்கவும்.

டாஷ்போர்டின் **செயல்படுத்தும் முடிவு** (`POST /api/cli-tools/apply`) ஒரே பாதுகாப்பை அமல்படுத்துகிறது:
ஒரு கொண்டெய்னரில், ஹோஸ்டில் இருந்து பிணைக்கப்படாத இலக்கு எழுதுதல் **`422`** என்ற பதிலுடன்
`containerEphemeralTarget: true`, பாதுகாப்பான பிழை உரை மற்றும் — ஹோஸ்ட் செய்முறை உள்ள கருவிகளுக்கான
(claude, codex, opencode, cline, kilo, continue) — `hostSetupCommand` (எடுத்துக்காட்டாக `omniroute setup-opencode`)
ஹோஸ்டில் இயக்க வேண்டும்; எதுவும் எழுதப்படவில்லை. `dryRun: true` கொண்டெய்னர் முறையில் வேலை செய்கிறது
மற்றும் உருவாக்கப்பட்ட உள்ளடக்கம் + இலக்கு பாதையை டிஸ்க் தொடாமல் திருப்புகிறது,
எனவே நீங்கள் டாஷ்போர்டில் முன்னோட்டம் காணலாம் மற்றும் ஹோஸ்டில் செயல்படுத்தலாம்.
இந்த நடத்தை நோக்கமாகும் மற்றும் `tests/unit/api/cli-tools/apply-container-guard.test.ts` மூலம்
மறுபடியும் பாதுகாக்கப்படுகிறது — 422 ஐ "சரி" செய்யாதீர்கள், பாதுகாப்பை நீக்குவதன் மூலம்.

---

## உண்மையின் மூலமாக

ஒற்றை பட்டியல் `src/shared/constants/cliTools.ts` இல் `CLI_TOOLS: Record<string, CliCatalogEntry>` ஆக வாழ்கிறது.

ஒவ்வொரு பதிவிலும் இந்த புலங்கள் உள்ளன (இவை `src/shared/schemas/cliCatalog.ts` இல் வரையறுக்கப்பட்டவை):

| புலம்                                           | வகை                                                          | விளக்கம்                                                         |
| ----------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------- |
| `category`                                      | `"code" \| "agent"`                                          | கருவி எங்கு தோன்றுகிறது என்பதைக் குறிக்கிறது                     |
| `vendor`                                        | `string`                                                     | கருவியின் மூலம் ("Anthropic", "OSS (P. Gauthier)")               |
| `acpSpawnable`                                  | `boolean`                                                    | ACP முகவரியாகவும் பயன்படுத்தக்கூடியது (பதக்கம் காட்டப்படுகிறது)  |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | தனிப்பயன் முடிவுப் புள்ளி ஆதரவு நிலை. `"none"` = MITM பின்வட்டம் |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | கட்டமைப்பு முறைமைகள்                                             |
| `id`, `name`, `color`, `description`, `docsUrl` | நிலையான                                                      | மையக் காட்சி புலங்கள்                                            |

`baseUrlSupport: "none"` உடைய பதிவுகள் **காட்சியில் காட்டப்படவில்லை** — அவை திட்டம் 11 க்கான MITM பின்வட்டத்தில் பதிவு செய்யப்பட்டுள்ளன (காண்க `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

### திறன்கள் நிலைகள் (பட்டியலிடப்பட்ட × கண்டறியக்கூடிய × கட்டமைக்கக்கூடிய × தொடங்கக்கூடிய)

ஒவ்வொரு பட்டியலிடப்பட்ட கருவியும் கண்டறியக்கூடியது, கட்டமைக்கக்கூடியது அல்லது தொடங்கக்கூடியது அல்ல. ஒவ்வொரு நிலைக்கும் ஒரு
அறிக்கையிடும் மூலமாக உள்ளது, மற்றும் ஒரு மிதவை சோதனை அவற்றை ஒத்திசைக்கிறது:

| நிலை                 | பொருள்                                                                                     | அறிவிக்கப்பட்டது                                                   |
| -------------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------ |
| **பட்டியலிடப்பட்ட**  | காட்சியில் பட்டியலிடப்பட்ட கருவி (பெயர், விற்பனையாளர், ஆவணங்கள், கட்டமைப்பு வகை)           | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                   |
| **கண்டறியக்கூடிய**   | பைனரி/கட்டமைப்பு கண்டறிதல், ஆரோக்கிய சோதனைகள், கட்டமைப்பு பாதைகள்                          | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` இயக்கம் பட்டியல்) |
| **கட்டமைக்கக்கூடிய** | `omniroute configure <cli>` மூலம் ஆதரிக்கப்படுகிறது (அமைப்பு செய்முறை உள்ளது)              | `bin/cli/cli-manifest.mjs` (`configure: true`)                     |
| **தொடங்கக்கூடிய**    | `omniroute run <target>` மூலம் ஆதரிக்கப்படுகிறது (env/args ஊடுருவல் வரையறுக்கப்பட்டுள்ளது) | `bin/cli/cli-manifest.mjs` (`run: true`)                           |

`bin/cli/cli-manifest.mjs` CLI கட்டளை மேற்பரப்புகளுக்கான அதிகாரப்பூர்வ செயல்பாட்டுப் பட்டியல்: `run`, `configure` மற்றும் ஷெல்-முழுமை உருவாக்கிகள் அனைத்தும் அவற்றின்
இலக்கு பட்டியல்கள், பெயர் தீர்வு (உதாரணமாக `kilocode`/`kilo-code`/`kilo_cli` → `kilo`)
மற்றும் `--model` கொடுக்கப்பட்டு wiring இல் இருந்து பெறுகின்றன. மிதவை பாதுகாப்பு
`tests/unit/cli/cli-manifest-drift.test.ts` இந்த பட்டியல், இயக்கம்
பட்டியல், UI பட்டியல் மற்றும் ஒவ்வொரு நுகர்வோர் மேற்பரப்பும் ஒத்திசைக்கப்படுவதை உறுதிப்படுத்துகிறது — ஒரு மேற்பரப்பில் சேர்க்கப்பட்ட இலக்கு மற்றவற்றின்றி
வெற்றிகரமாக மிதவையாக மாறுவதற்கு பதிலாக சோதனைத் தொகுப்பை தோல்வியுறுத்துகிறது.

## 1. CLI குறியீட்டின் பட்டியல் (26 கருவிகள்)

`/dashboard/cli-code` இல் தோன்றும் அனைத்து கருவிகள். `baseUrlSupport: none` உள்ளவை MITM அல்லது கையேட்டின் மூலம் இணைக்கப்பட்டுள்ளன, தனிப்பயன் அடிப்படை URL க்கு பதிலாக:

| id           | name                    | vendor              | baseUrlSupport | configType     | acpSpawnable |
| ------------ | ----------------------- | ------------------- | -------------- | -------------- | ------------ |
| claude       | Claude Code             | Anthropic           | முழு           | env            | உண்மை        |
| codex        | OpenAI Codex CLI        | OpenAI              | முழு           | custom         | உண்மை        |
| zcode        | ZCode (GLM Coding Plan) | Z.ai                | இல்லை          | custom         | பொய்         |
| cline        | Cline                   | OSS (ex-Claude Dev) | முழு           | custom         | உண்மை        |
| kilo         | Kilo Code               | Kilo-Org            | முழு           | custom         | பொய்         |
| roo          | Roo Code                | Roo (OSS)           | முழு           | guide          | பொய்         |
| continue     | Continue                | continue.dev        | முழு           | guide          | பொய்         |
| aider        | Aider                   | OSS (P. Gauthier)   | முழு           | guide          | உண்மை        |
| forge        | ForgeCode               | Antinomy HQ         | முழு           | custom         | உண்மை        |
| jcode        | jcode                   | 1jehuang (OSS)      | முழு           | custom         | பொய்         |
| deepseek-tui | DeepSeek TUI            | Hunter Bown (OSS)   | முழு           | custom         | பொய்         |
| codewhale    | CodeWhale               | Hmbown (OSS)        | முழு           | custom         | பொய்         |
| opencode     | OpenCode                | Anomaly (ex-SST)    | முழு           | guide          | உண்மை        |
| droid        | Factory Droid           | Factory AI          | பகுதி          | guide          | பொய்         |
| copilot      | GitHub Copilot CLI      | GitHub/MS           | முழு           | custom         | பொய்         |
| cursor-cli   | Cursor CLI              | Anysphere           | பகுதி          | guide          | உண்மை        |
| smelt        | Smelt                   | leonardcser (OSS)   | முழு           | custom         | பொய்         |
| pi           | Pi (pi-coding-agent)    | M. Zechner (OSS)    | முழு           | custom         | பொய்         |
| grok-build   | Grok Build              | xAI                 | முழு           | custom         | பொய்         |
| crush        | Crush                   | OSS (Charm)         | முழு           | custom         | பொய்         |
| qwen         | Qwen Code               | Alibaba             | முழு           | guide          | உண்மை        |
| cursor       | Cursor                  | Anysphere           | இல்லை          | guide          | பொய்         |
| antigravity  | Antigravity             | Google              | இல்லை          | mitm           | பொய்         |
| hermes       | Hermes                  | Nous Research       | இல்லை          | guide          | பொய்         |
| kiro         | Kiro AI                 | Amazon              | இல்லை          | mitm           | பொய்         |
| custom       | Custom CLI              | —                   | முழு           | custom-builder | பொய்         |

`baseUrlSupport: "partial"` உள்ள கருவிகள், டாஷ்போர்டு கார்டில் "⚠ அடிப்படை URL பகுதி" என்ற அடையாளத்தை காட்டுகின்றன.

## 2. CLI ஏஜென்ட்கள் பட்டியல் (8 கருவிகள்)

`/dashboard/cli-agents` இல் தோன்றும் சுயாதீன ஏஜென்ட்கள்:

| id           | name                 | vendor                   | baseUrlSupport | acpSpawnable |
| ------------ | -------------------- | ------------------------ | -------------- | ------------ |
| hermes-agent | ஹெர்மஸ் ஏஜென்ட்      | Nous Research            | முழு           | பொய்யாகும்   |
| openclaw     | ஓபன் கிளா            | OSS (P. ஸ்டெயின்பெர்கர்) | முழு           | உண்மை        |
| goose        | குஸ்                 | Block / Linux Foundation | முழு           | உண்மை        |
| interpreter  | ஓபன் இன்டர்பிரிட்டர் | OSS                      | முழு           | உண்மை        |
| warp         | வார்ப் ஏஐ            | Warp Inc.                | பகுதி          | உண்மை        |
| agent-deck   | ஏஜென்ட் டெக்         | asheshgoplani (OSS)      | முழு           | பொய்யாகும்   |
| omp          | ஓ மை பை              | OSS                      | முழு           | உண்மை        |
| letta        | லெட்டா CLI           | லெட்டா                   | முழு           | பொய்யாகும்   |

---

## 3. ACP ஏஜென்ட்கள் (/dashboard/acp-agents)

இந்த பக்கம் (`/dashboard/agents` இல் இருந்து மறுபெயரிடப்பட்டது) OmniRoute **spawn** செய்யக்கூடிய CLIs ஐ stdio/ACP புரொட்டோக்கால் மூலம் பின்னணி செயலாக்க இயந்திரங்களாகக் காட்டுகிறது. பட்டியல் `src/lib/acp/registry.ts` இல் தனியாக பராமரிக்கப்படுகிறது மற்றும் `CLI_TOOLS` உடன் **ஒரே மாதிரியானது அல்ல**.

---

## 4. MITM பின்விளைவுகள் (டாஷ்போர்டில் காட்டப்படவில்லை)

தற்காலிக அடிப்படை URL ஐ இயல்பாக ஆதரிக்காத CLIs இவை மற்றும் CLI கோடுகள் அல்லது CLI ஏஜென்ட்கள் பக்கங்களில் **பதிவு செய்யப்படவில்லை**. இவை திட்டம் 11 இல் MITM தடுக்கப்படுவதற்கான வேட்பாளர்கள்:

| CLI                 | காரணம்                                                       |
| ------------------- | ------------------------------------------------------------ |
| windsurf            | BYOK தேர்ந்தெடுக்கப்பட்ட கிளோட் மாதிரிகள் + நிறுவன URL/token |
| amp                 | மூடிய சூழல் (Sourcegraph)                                    |
| amazon-q / kiro-cli | AWS SSO அங்கீகாரம், தனிப்பயன் URL இல்லை                      |
| cowork              | Anthropic Desktop, கட்டமைக்கக்கூடிய முடிவுகள் இல்லை          |

முழு குறுக்கீட்டை காண `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` ஐ பார்வையிடவும்.

---

## 5. பேட்ச் கண்டறிதல் API

எல்லா கருவி கண்டறிதலும் ஒரு ஒற்றை முடிவில் சேர்க்கப்பட்டுள்ளது:

**`GET /api/cli-tools/all-statuses`**

- அங்கீகாரம்: `requireCliToolsAuth(request)` (மற்ற `/api/cli-tools/` பாதைகளுக்கு சமம்)
- திருப்புகிறது: `Record<toolId, ToolBatchStatus>` (வகை: `src/shared/types/cliBatchStatus.ts`)
- உத்தி: `Promise.all` அனைத்து கருவிகளின் மீது, கருவிக்கு 5 வினாடிகள் நேரம் முடிவுக்கு
- கச்சா: நினைவக LRU `config` கோப்பின் `mtime` மூலம் குறியீட்டமைக்கப்பட்டுள்ளது. `mtime` மாறும் போது கச்சா செல்லுபடியாகாது. சர்வரை மறுதொடக்கம் செய்யும் போது மீட்டமைக்கப்படுகிறது.

கருவி அடிப்படையில் பதிலளிக்கும் வடிவம்:

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
  error?: string; // சுத்திகரிக்கப்பட்டது, எந்த ஸ்டாக் தடங்கள் இல்லை
}
```

## 6. புதிய கருவிகளுக்கான அமைப்புகள் கையாளர்கள்

`configType: "custom"` உடன் புதிய கருவிகள் தனிப்பட்ட அமைப்பு API பாதைகள் உள்ளன:

| பாதை                                        | கருவி                                                            |
| ------------------------------------------- | ---------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                          |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url flag)                                          |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, legacy)                           |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, primary + legacy `~/.deepseek` sync) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                            |
| `POST /api/cli-tools/pi-settings`           | Pi coding agent                                                  |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)            |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + dedicated `.env` key)       |

அனைத்து பாதைகளும் பிழை பதில்களுக்கு `sanitizeErrorMessage()` ஐப் பயன்படுத்துகின்றன (Hard Rule #12).

---

## 7. டாஷ்போர்ட் பக்கங்கள் கட்டமைப்பு

### CLI குறியீட்டின் (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — சர்வர் கூறு
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — கிளையண்ட் கிரிட்
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — கருவி விவரம் பக்கம்
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 சிறப்பு கருவி அட்டை + `ToolDetailClient.tsx`

### CLI முகவர்கள் (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — சர்வர் கூறு
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — கிளையண்ட் கிரிட்
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — `ToolDetailClient` ஐ மறுபயன்படுத்துகிறது

### ACP முகவர்கள் (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — சர்வர் கூறு (மாற்றப்பட்டது `agents/` இல்)

### பகிர்ந்த UI கூறுகள் (`src/shared/components/cli/`)

| கோப்பு                  | நோக்கம்                                                  |
| ----------------------- | -------------------------------------------------------- |
| `CliToolCard.tsx`       | புத்திசாலி நிலை அட்டை (கண்டுபிடிப்பு + அமைப்பு + முடிவு) |
| `CliConceptCard.tsx`    | ஒவ்வொரு பக்கத்திற்கான கருத்து விளக்கம் அட்டை             |
| `CliComparisonCard.tsx` | CLI வகைகள் இடையே மூன்று நெட்வெளி ஒப்பீடு                 |
| `BaseUrlSelect.tsx`     | முடிவு_dropdown (Local/Cloud/Custom)                     |
| `ApiKeySelect.tsx`      | API விசை தேர்வாளர்                                       |
| `ManualConfigModal.tsx` | நகலெடுக்கக்கூடிய அமைப்பு துண்டு மாடல்                    |

### பகிர்ந்த ஹுக் (`src/shared/hooks/cli/`)

| கோப்பு                    | நோக்கம்                                                                                  |
| ------------------------- | ---------------------------------------------------------------------------------------- |
| `useToolBatchStatuses.ts` | `/api/cli-tools/all-statuses` ஐப் பெறுகிறது, ஏற்றுதல்/புதுப்பிப்பு நிலையை நிர்வகிக்கிறது |

## 8. i18n

பிளான் 14 F9 இல் புதிய பெயரிடங்கள் சேர்க்கப்பட்டுள்ளன:

| Namespace   | Purpose                                                                                   |
| ----------- | ----------------------------------------------------------------------------------------- |
| `cliCommon` | பகிர்ந்துள்ள உரைகள் (கார்டு லேபிள்கள், கருத்து/ஒப்பீட்டு உரைகள், விவரம் பக்கம் லேபிள்கள்) |
| `cliCode`   | CLI குறியீட்டின் பக்கம் உரைகள்                                                            |
| `cliAgents` | CLI முகவர்கள் பக்கம் உரைகள்                                                               |
| `acpAgents` | ACP முகவர்கள் பக்கம் உரைகள்                                                               |

முழு PT-BR மற்றும் EN மொழிபெயர்ப்புகள் வழங்கப்படுகின்றன. 39 மற்ற மொழிகள் `src/i18n/request.ts` இல் பெயரிடம் மட்டுமே EN க்கு தானாகவே மாறும்.

---

## 9. விரைவு தொடக்கம்

### படி 1 — OmniRoute API விசையை பெறுங்கள்

1. `/dashboard/api-manager` ஐ திறக்கவும் → **API விசை உருவாக்கவும்**
2. ஒரு பெயரை கொடுக்கவும் (எடுத்துக்காட்டாக `cli-tools`) மற்றும் அனைத்து அனுமதிகளை தேர்ந்தெடுக்கவும்
3. விசையை நகலெடுக்கவும் — கீழே உள்ள ஒவ்வொரு CLI க்கும் நீங்கள் இதை தேவைப்படும்

> உங்கள் விசை இதுபோல இருக்கும்: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### படி 2 — CLI கருவிகளை நிறுவவும்

எல்லா npm அடிப்படையிலான கருவிகளும் Node.js 22.22.2+ அல்லது 24.x ஐ தேவைப்படும்:

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

# Google Gemini CLI (launchable via `omniroute run gemini` → /v1beta surface)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # Rust அடிப்படையிலான

# Pi coding agent
# நிறுவலுக்கு https://github.com/zechnerj/pi-coding-agent ஐ பார்க்கவும்

# jcode
# நிறுவலுக்கு https://github.com/1jehuang/jcode ஐ பார்க்கவும்
```

---

### படி 3 — டாஷ்போர்டு மூலம் கட்டமைக்கவும்

1. `http://localhost:20128/dashboard/cli-code` இற்கு செல்லவும்
2. கிரிடில் உங்கள் கருவியை கண்டுபிடிக்கவும்
3. கர்டை கிளிக் செய்து கருவியின் விவரம் பக்கம் திறக்கவும்
4. உங்கள் API விசை மற்றும் அடிப்படை URL ஐ தேர்ந்தெடுக்கவும்
5. **கட்டமைப்பை செயல்படுத்தவும்** அல்லது கையேடு கட்டமைப்பு துண்டை நகலெடுக்கவும்

---

### படி 4 — உலகளாவிய சுற்றுப்புற மாறிலிகளை அமைக்கவும்

```bash
# OmniRoute Universal Endpoint
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI ROOT இல் GOOGLE_GEMINI_BASE_URL ஐ வாசிக்கிறது (அதன் SDK /v1beta/... ஐ தானாகச் சேர்க்கிறது)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> **தூர சேவையகம்** க்கான `localhost:20128` ஐ சேவையக IP அல்லது டொமைனுடன் மாற்றவும்,
> எடுத்துக்காட்டாக `http://<your-server-ip>:20128`.

---

### படி 4 — ஒவ்வொரு கருவியையும் கட்டமைக்கவும்

#### Claude Code

```bash
# ~/.claude/settings.json ஐ உருவாக்கவும்:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Claude Code க்கான ஒருங்கிணைந்த Anthropic கேட்கும் அடிப்படையை பயன்படுத்தவும். இங்கு `/v1` ஐ சேர்க்க வேண்டாம்.

**சோதனை:** `claude "say hello"`

---

#### OpenAI Codex

Modern Codex (v0.137+) `~/.codex/config.toml` ஐ மட்டும் வாசிக்கிறது — பழைய
`config.yaml` பழமையான npm CLI க்கு சொந்தமாகும் மற்றும் அமைதியாகIgnored. API
விசை `OMNIROUTE_API_KEY` சுற்றுப்புற மாறிலியில் (`env_key`) இருக்கும், எப்போதும்
கோப்பின் உள்ளே இல்லை:

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

முழு குறிப்புகள் (சுயவிவரங்கள், `wire_api`, சூழல் ஜன்னல்கள்): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

**சோதனை:** `codex "what is 2+2?"`

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

**சோதனை:** `opencode`

> `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high` ஐ
> சிந்தனை மாறிலிகளை அனுப்ப பயன்படுத்தவும்.

---

#### Cline (CLI அல்லது VS Code)

**CLI முறை:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**VS Code முறை:**
Cline விரிவாக்க அமைப்புகள் → API வழங்குநர்: `OpenAI Compatible` → அடிப்படை URL: `http://localhost:20128/v1`

அல்லது OmniRoute டாஷ்போர்டைப் பயன்படுத்தவும் → **CLI Tools → Cline → Apply Config**.

---

#### KiloCode (CLI அல்லது VS Code)

**CLI முறை:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**VS Code அமைப்புகள்:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

அல்லது OmniRoute டாஷ்போர்டைப் பயன்படுத்தவும் → **CLI Tools → KiloCode → Apply Config**.

---

#### Continue (VS Code Extension)

`~/.continue/config.yaml` ஐ தொகுக்கவும்:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

தொகுப்புக்குப் பிறகு VS Code ஐ மறுதொடக்கம் செய்யவும்.

---

#### VS Code Insiders (`chatLanguageModels.json`)

VS Code Insiders தனிப்பயன் முடிவுகளை உருவாக்கும் போது OmniRoute வேலை செய்ய வேண்டும் என்றால் இதைப் பயன்படுத்தவும்.

**பரிந்துரைக்கப்படும் இடம்:**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**tokenized OmniRoute alias ஐப் பயன்படுத்தும் எடுத்துக்காட்டு:**

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

**குறிப்புகள்:**

- `sk-your-omniroute-key` ஐ OmniRoute இல் உருவாக்கப்பட்ட API விசையுடன் மாற்றவும்.
- `url` புலம் `/api/v1/vscode/{token}/chat/completions` க்கு குறிக்க வேண்டும்.
- `modelsUrl` புலம் `/api/v1/vscode/{token}/models` க்கு குறிக்க வேண்டும்.
- கிளையன்ட் தனிப்பயன் தலைப்புகளை ஆதரிக்கும் போது சாதாரண `/v1` + Bearer தலைப்பு ஓட்டத்தை முன்னுரிமை அளிக்கவும்.
- URL-இல் உள்ள tokens ஒரு பொருந்தும் பின்னணி மற்றும் எடிட்டர் பதிவுகளில் அல்லது proxy வரலாற்றில் தோன்றலாம்.

---

#### Kiro CLI (Amazon)

```bash
# உங்கள் AWS/Kiro கணக்கில் உள்நுழைக:
kiro-cli login

# CLI தனது சொந்த அங்கீகாரத்தை பயன்படுத்துகிறது — Kiro CLI க்கான பின்னணி OmniRoute தேவை இல்லை.
# மற்ற கருவிகளுக்காக OmniRoute உடன் kiro-cli ஐப் பயன்படுத்தவும்.
kiro-cli status
```

**Kiro IDE** டெஸ்க்டாப் செயலிக்கு, OmniRoute மூலம் வெளியிடப்பட்ட MITM முடிவுகளைப் பயன்படுத்தவும்
`/dashboard/cli-tools → Kiro` இல்.

## 10. உள்ளக OmniRoute CLI

`omniroute` பைனரி சர்வர் வாழ்க்கைச்சுழற்சி, அமைப்பு, பரிசோதனை மற்றும் வழங்குநர் மேலாண்மைக்கான கட்டளைகளை வழங்குகிறது. நுழைவுப் புள்ளி: `bin/omniroute.mjs`.

```bash
omniroute                              # சர்வரை தொடங்கவும் (இயல்புநிலை போர்ட் 20128)
omniroute setup                        # தொடர்பான அமைப்பு மந்திரி
omniroute doctor                       # கட்டமைப்பு, DB, போர்டுகள், இயக்க நேரத்தைச் சரிபார்க்கவும்
omniroute providers list               # கட்டமைக்கப்பட்ட வழங்குநர் இணைப்புகள்
omniroute providers test-all           # ஒவ்வொரு செயல்பாட்டிற்கான இணைப்பையும் சோதிக்கவும்
omniroute reset-password               # நிர்வாக கடவுச்சொல்லை மீட்டமைக்கவும்
omniroute logs                         # கோரிக்கைகள் பதிவுகளை ஒளிபரப்பவும்
omniroute health                       # விரிவான ஆரோக்கியம் (பிரேக்கர்கள், கொஞ்சம், நினைவகம்)
omniroute --version                    # பதிப்பை அச்சிடவும்
omniroute --help                       # அனைத்து கட்டளைகளை காண்பிக்கவும்
```

### அமைப்பு & ஆரம்பிப்பு

```bash
omniroute setup                        # தொடர்பான அமைப்பு மந்திரி
omniroute setup --non-interactive      # CI/தானியங்கி முறை (சுற்றுப்புற மாறிகள் + கொடிகள்)
omniroute setup --password '<value>'   # நிர்வாக கடவுச்சொல்லை நேரடியாக அமைக்கவும்
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # ஒரு அடிப்படையில் வழங்குநரைச் சேர்க்கவும் மற்றும் சோதிக்கவும்
```

தொடர்பில்லாத அமைப்பிற்கான அங்கீகாரம் பெற்ற சுற்றுப்புற மாறிகள்:

| Var                 | நோக்கம்                                                                              |
| ------------------- | ------------------------------------------------------------------------------------ |
| `OMNIROUTE_API_KEY` | வழங்குநர் API விசை (Commander `.env()` மூலம் `--api-key` க்கு கட்டுப்படுத்தப்பட்டது) |
| `DATA_DIR`          | OmniRoute தரவுத்தொகுப்பை மீறவும்                                                     |

மற்ற அனைத்து தொடர்பில்லாத உள்ளீடுகள் கொடிகளாகவே அனுப்பப்படுகின்றன, சுற்றுப்புற மாறிகள் அல்ல:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(மேலே உள்ள `omniroute setup` விருப்பங்களைப் பார்க்கவும்).

### பரிசோதனை

```bash
omniroute doctor                       # கட்டமைப்பு, DB, போர்டுகள், இயக்க நேரம், நினைவகம், உயிரியல் நிலை சரிபார்க்கவும்
omniroute doctor --json                # இயந்திரம் வாசிக்கக்கூடிய JSON
omniroute doctor --no-liveness         # HTTP ஆரோக்கியத்தை தவிர்க்கவும்
omniroute doctor --host 0.0.0.0        # உயிரியல் நிலை ஹோஸ்டை மீறவும்
omniroute doctor --liveness-url <url>  # முழு ஆரோக்கியம் முடிவுக்கான URL மீறவும்
```

மருத்துவர் இந்த சரிபார்ப்புகளை இயக்குகிறார்: `கட்டமைப்பு`, `தரவுத்தொகுப்பு`, `சேமிப்பு/குறியாக்கம்`,
`போர்ட் கிடைக்கும்`, `Node இயக்க நேரம்`, `உள்ளூர் பைனரி` (better-sqlite3),
`நினைவகம்`, மற்றும் `சர்வர் உயிரியல் நிலை`. எந்த சரிபார்ப்பு `தவறு` என்றால் அது மின்வெட்டு செய்யும்.

### வழங்குநர் மேலாண்மை

```bash
omniroute providers available                       # OmniRoute வழங்குநர் பட்டியல்
omniroute providers available --search openai       # அடையாளம்/பெயர்/மாற்று/வகை மூலம் பட்டியலை வடிகட்டி
omniroute providers available --category api-key    # வகை மூலம் வடிகட்டி (api-key, oauth, free, ...)
omniroute providers available --json                # இயந்திரம் வாசிக்கக்கூடிய JSON

omniroute providers list                            # கட்டமைக்கப்பட்ட வழங்குநர் இணைப்புகள்
omniroute providers list --json

omniroute providers test <id|name>                  # ஒரு கட்டமைக்கப்பட்ட இணைப்பை சோதிக்கவும்
omniroute providers test-all                        # ஒவ்வொரு செயல்பாட்டிற்கான இணைப்பையும் சோதிக்கவும்
omniroute providers validate                        # உள்ளூர் மட்டுமே கட்டமைப்புப் பரிசோதனை
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # ஏற்கனவே உள்ள OAuth ஓட்டம்
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` API-முதலில் ஆகவே செயல்படுகிறது
செயல்பாட்டில் உள்ள உள்ளூர் அல்லது தொலைதூர சூழ்நிலைக்கு எதிராக. அங்கீகாரம் உள்ளீடு
`--credential-stdin` அல்லது `--credential-env` ஐப் பயன்படுத்த வேண்டும்; `--dry-run --json` மட்டும்
மறைக்கப்பட்ட இருப்பு/வடிவத்தைப் புகாரளிக்கிறது. `providers available` OmniRoute பட்டியலைப் படிக்கிறது;
`providers list/test/test-all/validate` தங்கள் உள்ளூர் SQLite நடத்தைப் பாதுகாக்கின்றன மற்றும்
சர்வர் இயக்கப்பட வேண்டும் என்பதற்கான தேவையில்லை.

### மீட்பு & மீட்டமைப்பு

```bash
omniroute reset-password                # நிர்வாக கடவுச்சொல்லை மீட்டமைக்கவும் (மேலும்: omniroute-reset-password)
omniroute reset-encrypted-columns       # குறியாக்கப்பட்ட அங்கீகாரத்தை மீட்டமைக்க எச்சரிக்கையை காண்பிக்கவும் + உலாவி இயக்கவும்
omniroute reset-encrypted-columns --force  # SQLite இல் குறியாக்கப்பட்ட அங்கீகாரங்களை உண்மையில் நீக்கவும்
```

### அங்கீகாரம் ஏற்றுமதி (⚠ கவனமாக கையாளவும்)

```bash
omniroute auth export                                 # எச்சரிக்கையை காண்பிக்கவும் + உறுதிப்படுத்தல் வாயிலாக — DB அணுகல் இல்லை
omniroute auth export --force                          # அனைத்து இணைப்புகளின் DECRYPTED அங்கீகாரங்களை stdout இல் JSON ஆக ஏற்றுமதி செய்யவும்
omniroute auth export --force --id <id>                 # பொருந்தும் இணைப்பை மட்டுமே ஏற்றுமதி செய்யவும்
omniroute auth export --force --format env               # OMNIROUTE_<PROVIDER>_<FIELD>=<value> வரிகளை வெளியிடவும்
omniroute auth export --force --out creds.json           # ஒரு கோப்பிற்கு எழுதவும் (0600 அனுமதிகளுடன் உருவாக்கப்பட்டது)
```

`auth export` என்பது **உள்ளூர் மட்டுமே** (நேரடி SQLite வாசிப்பு, HTTP பாதை இல்லை) மற்றும்
உறுதியாக அச்சிடுகிறது/எழுதுகிறது **சரளமாக** `apiKey`/`accessToken`/`refreshToken`/`idToken` மதிப்புகள் — இது அம்சமாகும், பிழை அல்ல. தரவுத்தொகுப்பிலிருந்து எதுவும் வாசிக்கப்படவில்லை, மற்றும் எதுவும் குறியாக்கம் செய்யப்படவில்லை, `--force` இல்லாமல். எந்த சரளமும் வெளியிடப்படுவதற்கு முன் எப்போதும் stderr எச்சரிக்கை பேனர் அச்சிடப்படுகிறது. `STORAGE_ENCRYPTION_KEY` அமைக்கப்பட வேண்டும். குறியாக்கத்தில் தோல்வியுறும் ஒரு புலம் (பழைய விசை, கெட்ட ciphertext) ` <field>DecryptFailed: true` எனக் கூறப்படுகிறது, முழு ஏற்றுமதியை நிறுத்துவதற்காக அல்லது அடிப்படையான பிழையை வெளியிடுவதற்காக அல்ல.

### பிற துணைக்கட்டளைகள்

இவை ஓடும் OmniRoute சர்வரைப் பொறுத்தது, வேறு எதுவும் குறிப்பிடப்படவில்லை:

```bash
omniroute status                       # விரிவான இயக்க நேர நிலை
omniroute logs                         # கோரிக்கைகள் பதிவுகளை ஒளிபரப்பவும் (--json, --search, --follow)
omniroute config show                  # தற்போதைய கட்டமைப்பை காண்பிக்கவும்

omniroute provider list                # கிடைக்கும் வழங்குநர்களின் பட்டியல் (provides list இன் மாற்று)
omniroute provider add                 # ஒரு கருவியில் OmniRoute ஐ வழங்குநராக பதிவு செய்யவும்
omniroute keys add | list | remove     # API விசைகளை நிர்வகிக்கவும்
omniroute models [provider]            # மாதிரிகளை பட்டியலிடவும் (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # கட்டமைப்பு + DB ஐ புகைப்படம் எடுக்கவும்
omniroute restore                      # முந்தைய புகைப்படத்திலிருந்து மீட்டமைக்கவும்

omniroute health                       # விரிவான ஆரோக்கியம் (பிரேக்கர்கள், கொஞ்சம், நினைவகம்)
omniroute quota                        # வழங்குநர் குவோட்டா பயன்பாடு
omniroute cache                        # கொஞ்சம் நிலை
omniroute cache clear                  # கருத்தியல் + கையொப்ப கொஞ்சங்களை அழிக்கவும்

omniroute mcp status | restart         # MCP சர்வர் நிலை / மீட்டமைப்பு
omniroute a2a status | card            # A2A சர்வர் நிலை / முகவர் அட்டை

omniroute tunnel list | create | stop  # குழாய்களை நிர்வகிக்கவும் (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # சுற்றுப்புற மாறிகளை ஆய்வு / அமைக்கவும் (தற்காலிகம்)

omniroute test                         # வழங்குநர் இணைப்பு புகை சோதனை
omniroute update                       # புதுப்பிப்புகளை சரிபார்க்கவும்
omniroute completion                   # கச்சா நிறைவு உருவாக்கவும்
```

### பொதுவான கொடிகள்

| கொடி                | விளக்கம்                                                                 |
| ------------------- | ------------------------------------------------------------------------ |
| `--no-open`         | தொடங்கும்போது உலாவியை தானாக திறக்காதே                                    |
| `--port <n>`        | API போர்டை மீறவும் (இயல்புநிலை 20128)                                    |
| `--mcp`             | IDE களுக்காக stdio மூலம் MCP சர்வராக இயக்கவும்                           |
| `--non-interactive` | CI முறை (எந்த கேள்விகளும் இல்லை; சுற்றுப்புற/கொடியிலிருந்து வாசிக்கவும்) |
| `--json`            | இயந்திரம் வாசிக்கக்கூடிய JSON வெளியீடு (doctor, providers, etc.)         |
| `--help`, `-h`      | கட்டளை-சிறப்பு உதவியை காண்பிக்கவும்                                      |
| `--version`, `-v`   | நிறுவப்பட்ட பதிப்பை அச்சிடவும்                                           |

## கிடைக்கும் API முடிவுகள்

| முடிவு                     | விளக்கம்                                | பயன்படுத்துவது                        |
| -------------------------- | --------------------------------------- | ------------------------------------- |
| `/v1/chat/completions`     | நிலையான உரையாடல் (எல்லா வழங்குநர்களும்) | அனைத்து நவீன கருவிகள்                 |
| `/v1/responses`            | பதில்கள் API (OpenAI வடிவம்)            | Codex, agentic workflows              |
| `/v1/completions`          | பழைய உரை முடிவுகள்                      | `prompt:` பயன்படுத்தும் பழைய கருவிகள் |
| `/v1/embeddings`           | உரை எம்பெட்டிங்ஸ்                       | RAG, தேடல்                            |
| `/v1/images/generations`   | படம் உருவாக்குதல்                       | GPT-Image, Flux, மற்றும் பிற          |
| `/v1/audio/speech`         | உரை-க்கு-உரை                            | ElevenLabs, OpenAI TTS                |
| `/v1/audio/transcriptions` | உரை-க்கு-உரை                            | Deepgram, AssemblyAI                  |

ஒன்றிணைக்கப்பட்ட OmniRoute URL உடன் ஒட்டுவதற்கான எடுத்துக்காட்டுகள்:

```txt
Token example: sk-a3ab3c080beaee3a-69f4a4-070d71af

Standard OpenAI base: http://localhost:20128/v1
VS Code models: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
VS Code chat: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
VS Code responses: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Ollama tags: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Ollama chat: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## சிக்கல்களை தீர்க்குதல்

| பிழை                                         | காரணம்                               | சரி                                                        |
| -------------------------------------------- | ------------------------------------ | ---------------------------------------------------------- |
| `Connection refused`                         | OmniRoute இயங்கவில்லை                | `omniroute serve`                                          |
| `401 Unauthorized`                           | தவறான API விசை                       | `/dashboard/api-manager` இல் சரிபார்க்கவும்                |
| `No combo configured`                        | செயல்பாட்டில் உள்ள வழி கூட்டம் இல்லை | `/dashboard/combos` இல் அமைக்கவும்                         |
| CLI shows "not installed"                    | பைனரி PATH இல் இல்லை                 | `which <command>` இல் சரிபார்க்கவும்                       |
| Dashboard shows "not detected" after install | காசே பழையது                          | டாஷ்போர்டில் "⟳ Refresh detection" கிளிக் செய்யவும்        |
| பழைய இணைப்பு `/dashboard/cli-tools`          | Pre-v3.8.6 புத்தகம்                  | `/dashboard/cli-code` க்கு தானாக மறுபெயரிடப்பட்டது (308)   |
| பழைய இணைப்பு `/dashboard/agents`             | Pre-v3.8.6 புத்தகம்                  | `/dashboard/acp-agents` க்கு தானாக மறுபெயரிடப்பட்டது (308) |
