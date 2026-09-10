# CLI-TOOLS (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "CLI Tools — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI Tools — OmniRoute

છેલ્લી અપડેટ: 2026-08-18

OmniRoute ત્રણ શ્રેણીઓના CLI ટૂલ્સ સાથે સંકલિત થાય છે જે ત્રણ સમર્પિત ડેશબોર્ડ પેજો પર ફેલાય છે:

| પેજ             | માર્ગ                   | સંકલ્પના                                                                               | ગણતરી         |
| --------------- | ----------------------- | -------------------------------------------------------------------------------------- | ------------- |
| **CLI Code's**  | `/dashboard/cli-code`   | કોડિંગ ટૂલ્સ જે તમે OmniRoute પર નિર્દેશ કરો છો (ક્લાયન્ટ → CLI → OmniRoute → પ્રદાતા) | 26            |
| **CLI એજન્ટ્સ** | `/dashboard/cli-agents` | સ્વાયત્ત એજન્ટો જે તમે OmniRoute પર નિર્દેશ કરો છો (એક જ પ્રવાહ, વ્યાપક વ્યાપ)         | 8             |
| **ACP એજન્ટ્સ** | `/dashboard/acp-agents` | CLIs જે OmniRoute stdio/ACP દ્વારા બેકએન્ડ તરીકે ઉત્પન્ન કરે છે (વિપરીત પ્રવાહ)        | રજીસ્ટ્રી જુઓ |

Legacy routes 308 દ્વારા રીડાયરેક્ટ કરે છે: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## કેવી રીતે કાર્ય કરે છે

```
CLI Code's / CLI Agents (ઉપભોગ પ્રવાહ):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (બધા OmniRoute તરફ નિર્દેશ કરે છે)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute યોગ્ય પ્રદાતાને માર્ગ આપે છે)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

ACP Agents (વિપરીત ઉત્પન્ન પ્રવાહ):
    ક્લાયન્ટ વિનંતી → OmniRoute → stdio/ACP દ્વારા CLI ઉત્પન્ન કરે છે → પ્રતિસાદ
```

**લાભ:**

- તમામ ટૂલ્સને સંચાલિત કરવા માટે એક API કી
- ડેશબોર્ડમાં તમામ CLIs માટે ખર્ચ ટ્રેકિંગ
- દરેક ટૂલને ફરીથી કન્ફિગર કર્યા વિના મોડલ સ્વિચિંગ
- સ્થાનિક અને દૂરસ્થ સર્વરો (VPS, Docker, Akamai, Cloudflare Tunnel) પર કાર્ય કરે છે

---

## `setup-*` સાથે આપોઆપ કન્ફિગર કરો

તમે દરેક ટૂલની કન્ફિગરેશન હાથથી લખવાની જરૂર નથી. OmniRoute એક `setup-*`
કમાન્ડ પ્રત્યેક સમર્થિત CLI માટે મોકલે છે જે એક ચાલતી
OmniRoute (સ્થાનિક અથવા દૂરસ્થ)માંથી **લાઇવ** મોડલ કેટલોગ વાંચે છે અને તમારા મશીન પર ટૂલની પોતાની કન્ફિગરેશન લખે છે:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

દરેક `--remote <url> --api-key <key>` સ્વીકારે છે (દૂરસ્થ OmniRoute સામે સ્થાનિક ટૂલને કન્ફિગર કરો), `--dry-run` (લખ્યા વિના પૂર્વદર્શન), અને `--port`. મોડલ આપોઆપ શોધી ન શકતા ટૂલ્સ (Cline, Kilo, Roo, Goose, Aider, Qwen) `--model <id>` લે છે (અને `--yes` નોન-ઇન્ટરેક્ટિવ ચલાવવા માટે). યોગ્ય એન્વાયર્નમેન્ટ ઇન્જેક્ટેડ અને બિલકુલ કન્ફિગરેશન લખ્યા વિના CLI શરૂ કરવા માટે, સામાન્ય `omniroute run <target>` લોન્ચરનો ઉપયોગ કરો (claude, codex, aider, goose, opencode, qwen, gemini — ટાર્ગેટ અને અલિયાસ `bin/cli/cli-manifest.mjs`માંથી આવે છે); લેગસી પ્રત્યેક ટૂલ લોન્ચર્સ `omniroute launch` (Claude Code) અને `omniroute launch-codex` (Codex) ઉપલબ્ધ રહે છે. Gemini CLI માત્ર લોન્ચ-માત્ર છે: તે `omniroute run` ટાર્ગેટ છે પરંતુ તેમાં `setup-*`/`configure` રેસીપી નથી.

> **પૂર્ણ સંદર્ભ:** માસ્ટર ટેબલ — દરેક કમાન્ડ શું લખે છે, દરેક ફ્લેગ,
> સ્થાનિક વિરુદ્ધ દૂરસ્થ, અને કયા ટૂલ્સ `/v1` સોફિક્સ માંગે છે — રહે છે
> **[CLI Integrations](../guides/CLI-INTEGRATIONS.md)**.

### કન્ટેનરમાં આ ચલાવવું

OmniRoute કન્ટેનરમાં અમલમાં લાવવામાં આવેલ `setup-*` કમાન્ડ કન્ટેનરના પોતાના હોમમાં લખે છે, જે કોઈ હોસ્ટ CLI વાંચતું નથી અને જે કન્ટેનર સાથે ગુમ થઈ જાય છે. OmniRoute તે શોધે છે અને લખવા બદલે સૂચનાઓ સાથે `2` ની બહાર નીકળે છે. આગળ વધવા માટે બે સમર્થિત માર્ગો — હોસ્ટ પર CLI ઇન્સ્ટોલ કરો અને `omniroute connect` કન્ટેનર સાથે, અથવા કન્ફિગરેશન ડિરેક્ટરીઓને બાઇન્ડ-માઉન્ટ કરો અને `CLI_CONFIG_HOME` સેટ કરો (કમ્પોઝ `હોસ્ટ` પ્રોફાઇલ). દરેક `setup-*` કમાન્ડ, ઉપરાંત `omniroute configure` અને `omniroute config set`, કન્ટેનરના પોતાના CLIs ને કન્ફિગર કરતી વખતે `--allow-container-write` સ્વીકારે છે; `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` સર્વર માટે તે જ કરે છે. જુઓ
[Docker Guide → Configuring host CLI tools](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker).

ડેશબોર્ડનું **લાગુ કરો એન્ડપોઈન્ટ** (`POST /api/cli-tools/apply`) સમાન રક્ષણ લાગુ કરે છે: કન્ટેનરમાં, લખાણ જેનો લક્ષ્ય હોસ્ટમાંથી બાઇન્ડ-માઉન્ટ નથી તે **`422`** સાથે જવાબ આપે છે `containerEphemeralTarget: true`, સુરક્ષિત ભૂલ
ટેક્સ્ટ અને — હોસ્ટ રેસીપી ધરાવતા ટૂલ્સ માટે (claude, codex, opencode, cline,
kilo, continue) — એક `hostSetupCommand` (ઉદાહરણ તરીકે `omniroute setup-opencode`) જે હોસ્ટ પર ચલાવવા માટે; કશું લખાયું નથી. `dryRun: true` કન્ટેનર મોડમાં કાર્યરત રહે છે અને જનરેટ કરેલ સામગ્રી + લક્ષ્ય પાથ પાછું આપે છે, જેથી તમે ડેશબોર્ડમાંથી પૂર્વદર્શન કરી શકો અને હોસ્ટ પર લાગુ કરી શકો. આ વર્તન ઇરાદાપૂર્વક છે અને
`tests/unit/api/cli-tools/apply-container-guard.test.ts` દ્વારા રેગ્રેશન-ગાર્ડેડ છે — ક્યારેય "ફિક્સ" 422 ને રક્ષણ દૂર કરીને.

---

## સત્યનો સ્ત્રોત

એકીકૃત કૅટલોગ `src/shared/constants/cliTools.ts` માં `CLI_TOOLS: Record<string, CliCatalogEntry>` તરીકે રહે છે.

પ્રત્યેક એન્ટ્રીમાં આ ક્ષેત્રો હોય છે (જેઓ `src/shared/schemas/cliCatalog.ts` માં વ્યાખ્યાયિત છે):

| ક્ષેત્ર                                         | પ્રકાર                                                       | વર્ણન                                                |
| ----------------------------------------------- | ------------------------------------------------------------ | ---------------------------------------------------- |
| `શ્રેણી`                                        | `"code" \| "agent"`                                          | ટૂલ કયા પૃષ્ઠ પર દેખાય છે                            |
| `વેન્ડર`                                        | `string`                                                     | ટૂલનો ઉદ્ભવ ("Anthropic", "OSS (P. Gauthier)")       |
| `acpSpawnable`                                  | `boolean`                                                    | ACP એજન્ટ તરીકે પણ ઉપયોગી (બેજ દર્શાવવામાં આવે છે)   |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | કસ્ટમ એન્ડપોઈન્ટ સપોર્ટ સ્તર. `"none"` = MITM બેકલોગ |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | કન્ફિગરેશન મિકેનિઝમ                                  |
| `id`, `name`, `color`, `description`, `docsUrl` | માનક                                                         | મુખ્ય પ્રદર્શિત ક્ષેત્રો                             |

`baseUrlSupport: "none"` ધરાવતી એન્ટ્રીઓ ડેશબોર્ડ પૃષ્ઠોમાં **દેખાવતી નથી** — તે MITM બેકલોગમાં યોજના 11 માટે નોંધાયેલ છે (જુઓ `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

### ક્ષમતા સ્તરો (કૅટલોગ કરેલ × શોધી શકાય તેવા × કન્ફિગર કરી શકાય તેવા × શરૂ કરી શકાય તેવા)

દરેક કૅટલોગ કરેલ ટૂલ શોધી શકાય તેવા, કન્ફિગર કરી શકાય તેવા અથવા શરૂ કરી શકાય તેવા નથી. દરેક સ્તરે એક જાહેર કરેલ સ્ત્રોત હોય છે, અને એક ડ્રિફ્ટ ટેસ્ટ તેમને સમન્વયિત રાખે છે:

| સ્તર                      | અર્થ                                                                      | જાહેર કરવામાં આવ્યું છે                                         |
| ------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------- |
| **કૅટલોગ કરેલ**           | ડેશબોર્ડ કૅટલોગમાં દેખાય છે (નામ, વેન્ડર, દસ્તાવેજો, કન્ફિગરેશન પ્રકાર)   | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                |
| **શોધી શકાય તેવા**        | બાઈનરી/કન્ફિગરેશન શોધ, આરોગ્ય ચકાસણીઓ, કન્ફિગરેશન પાથ                     | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` રનટાઇમ કૅટલોગ) |
| **કન્ફિગર કરી શકાય તેવા** | `omniroute configure <cli>` દ્વારા સપોર્ટેડ (સેટઅપ રેસીપી હાજર છે)        | `bin/cli/cli-manifest.mjs` (`configure: true`)                  |
| **શરૂ કરી શકાય તેવા**     | `omniroute run <target>` દ્વારા સપોર્ટેડ (env/args ઇન્જેક્શન વ્યાખ્યાયિત) | `bin/cli/cli-manifest.mjs` (`run: true`)                        |

`bin/cli/cli-manifest.mjs` CLI આદેશ માટેનું કૅનોનિકલ એક્ઝિક્યુટેબલ મેનિફેસ્ટ છે જે સપાટી: `run`, `configure` અને શેલ-કમ્પ્લેશન જનરેટર્સ તમામ તેમના લક્ષ્ય યાદીઓ, ઉપનામ ઉકેલ (ઉદાહરણ તરીકે `kilocode`/`kilo-code`/`kilo_cli` → `kilo`) અને `--model` ફ્લેગ વાયરિંગમાંથી ઉત્પન્ન કરે છે. ડ્રિફ્ટ ગાર્ડ `tests/unit/cli/cli-manifest-drift.test.ts` ખાતરી કરે છે કે મેનિફેસ્ટ, રનટાઇમ કૅટલોગ, UI કૅટલોગ અને દરેક ગ્રાહક સપાટી સમન્વયિત રહે — એક સપાટી પર ઉમેરાયેલ લક્ષ્ય અન્ય વિના નિષ્ફળ થાય છે, જે ડ્રિફ્ટ થવા બદલે સુટને નિષ્ફળ બનાવે છે.

## 1. CLI કોડનું કેટલોગ (26 સાધનો)

બધા સાધનો જે `/dashboard/cli-code` માં દેખાય છે. જેમના પાસે `baseUrlSupport: none` છે, તેઓ MITM અથવા મેન્યુઅલ માર્ગદર્શિકા દ્વારા કસ્ટમ બેઝ URL ના બદલે જોડાયેલા છે:

| id           | name                    | vendor              | baseUrlSupport | configType     | acpSpawnable |
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

`baseUrlSupport: "partial"` ધરાવતા સાધનો ડેશબોર્ડ કાર્ડમાં "⚠ Base URL parcial" બેજ દર્શાવે છે.
---

## 2. CLI એજન્ટો કૅટલોગ (8 સાધનો)

સ્વતંત્ર એજન્ટો જે `/dashboard/cli-agents` માં દેખાય છે:

| id           | name            | vendor                   | baseUrlSupport | acpSpawnable |
| ------------ | --------------- | ------------------------ | -------------- | ------------ |
| hermes-agent | હર્મેસ એજન્ટ    | Nous Research            | સંપૂર્ણ        | ખોટું        |
| openclaw     | ઓપનક્લો         | OSS (P. સ્ટાઇનબર્ગર)     | સંપૂર્ણ        | સાચું        |
| goose        | ગૂસ             | બ્લોક / લિનક્સ ફાઉન્ડેશન | સંપૂર્ણ        | સાચું        |
| interpreter  | ઓપન ઇન્ટરપ્રિટર | OSS                      | સંપૂર્ણ        | સાચું        |
| warp         | વાર્પ એઆઈ       | વાર્પ ઇન્ક.              | અર્ધ           | સાચું        |
| agent-deck   | એજન્ટ ડેક       | આશેશગોપલાની (OSS)        | સંપૂર્ણ        | ખોટું        |
| omp          | ઓહ માય પાઈ      | OSS                      | સંપૂર્ણ        | સાચું        |
| letta        | લેતા CLI        | લેતા                     | સંપૂર્ણ        | ખોટું        |

---

## 3. ACP એજન્ટો (/dashboard/acp-agents)

આ પૃષ્ઠ (જેનું નામ બદલવામાં આવ્યું છે `/dashboard/agents`) CLIs દર્શાવે છે કે જે ઓમ્નીરૂટ **સ્પોન** કરી શકે છે બેકએન્ડ અમલ એન્જિન તરીકે stdio/ACP પ્રોટોકોલ દ્વારા. કૅટલોગ અલગથી `src/lib/acp/registry.ts` માં જાળવવામાં આવે છે અને તે `CLI_TOOLS` સાથે **એકસરખું** નથી.

---

## 4. MITM બેકલોગ (ડેશબોર્ડમાં દર્શાવવામાં આવતું નથી)

નીચેના CLIs કસ્ટમ બેઝ URL ને સ્વાભાવિક રીતે સપોર્ટ કરતા નથી અને CLI કોડ અથવા CLI એજન્ટો પૃષ્ઠોમાં **યાદીબદ્ધ** નથી. તેઓ યોજના 11 માં MITM અવરોધન માટે ઉમેદવાર છે:

| CLI                 | કારણ                                              |
| ------------------- | ------------------------------------------------- |
| windsurf            | BYOK પસંદ કરેલા ક્લોડ મોડલ્સ + કોર્પોરેટ URL/ટોકન |
| amp                 | બંધ ઇકોસિસ્ટમ (સોર્સગ્રાફ)                        |
| amazon-q / kiro-cli | AWS SSO ઓથ, કસ્ટમ URL નથી                         |
| cowork              | એન્થ્રોપિક ડેસ્કટોપ, કન્ફિગરેબલ એન્ડપોઈન્ટ નથી    |

પૂર્ણ ક્રોસ-રેફરન્સ માટે `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` જુઓ.

---

## 5. બેચ ડિટેક્શન API

બધા સાધન ડિટેક્શન એક જ એન્ડપોઈન્ટ દ્વારા સંકલિત કરવામાં આવે છે:

**`GET /api/cli-tools/all-statuses`**

- ઓથેન્ટિકેશન: `requireCliToolsAuth(request)` (અન્ય `/api/cli-tools/` માર્ગો સમાન)
- પાછું આપે છે: `Record<toolId, ToolBatchStatus>` (પ્રકાર: `src/shared/types/cliBatchStatus.ts`)
- વ્યૂહ: `Promise.all` તમામ સાધનો પર, 5સ ટાઇમઆઉટ પ્રતિ સાધન
- કેશ: મેમરીમાં LRU કન્ફિગરેશન ફાઇલ `mtime` દ્વારા સૂચિબદ્ધ. જ્યારે mtime બદલાય છે ત્યારે કેશ અમાન્ય થાય છે. સર્વર પુનઃપ્રારંભ પર પુનઃસેટ થાય છે.

પ્રતિ સાધન પ્રતિસાદ આકાર:

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
  error?: string; // સાફ, કોઈ સ્ટેક ટ્રેસ નથી
}
```

## 6. નવા સાધનો માટે સેટિંગ્સ હેન્ડલર્સ

`configType: "custom"` ધરાવતી નવા સાધનો માટે સમર્પિત સેટિંગ્સ API માર્ગો છે:

| માર્ગ                                       | સાધન                                                                 |
| ------------------------------------------- | -------------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                              |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url ધ્વજ)                                              |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, વારસાગત)                              |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, પ્રાથમિક + વારસાગત `~/.deepseek` સમન્વય) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                                |
| `POST /api/cli-tools/pi-settings`           | Pi કોડિંગ એજન્ટ                                                      |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)                |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + સમર્પિત `.env` કી)              |

બધા માર્ગો ભૂલના પ્રતિસાદ માટે `sanitizeErrorMessage()` નો ઉપયોગ કરે છે (Hard Rule #12).

---

## 7. ડેશબોર્ડ પેજોની આર્કિટેક્ચર

### CLI કોડ (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — સર્વર ઘટક
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — ક્લાયન્ટ ગ્રિડ
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — સાધન વિગતો પેજ
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 વિશિષ્ટ સાધન કાર્ડ + `ToolDetailClient.tsx`

### CLI એજન્ટો (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — સર્વર ઘટક
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — ક્લાયન્ટ ગ્રિડ
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — `ToolDetailClient` નો પુનઃઉપયોગ કરે છે

### ACP એજન્ટો (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — સર્વર ઘટક (એજન્ટમાંથી ખસેડવામાં આવ્યું)

### શેર કરેલ UI ઘટકો (`src/shared/components/cli/`)

| ફાઇલ                    | ઉદ્દેશ                                               |
| ----------------------- | ---------------------------------------------------- |
| `CliToolCard.tsx`       | સ્માર્ટ સ્થિતિ કાર્ડ (પહેચાન + કન્ફિગ + અંતિમ બિંદુ) |
| `CliConceptCard.tsx`    | પ્રતિ પેજ સંકલ્પના સમજાવતી કાર્ડ                     |
| `CliComparisonCard.tsx` | CLI પ્રકારો વચ્ચે ત્રણ કૉલમની તુલના                  |
| `BaseUrlSelect.tsx`     | અંતિમ બિંદુ ડ્રોપડાઉન (સ્થાનિક/ક્લાઉડ/કસ્ટમ)         |
| `ApiKeySelect.tsx`      | API કી પસંદકર્તા                                     |
| `ManualConfigModal.tsx` | નકલ કરી શકાય તેવી કન્ફિગ સ્નિપેટ મોડલ                |

### શેર કરેલ હૂક (`src/shared/hooks/cli/`)

| ફાઇલ                      | ઉદ્દેશ                                                                        |
| ------------------------- | ----------------------------------------------------------------------------- |
| `useToolBatchStatuses.ts` | `/api/cli-tools/all-statuses` ને લાવે છે, લોડિંગ/ફરેશ સ્થિતિને સંચાલિત કરે છે |

## 8. i18n

યોજનામાં 14 F9 માં નવા નામસ્થાનો ઉમેરવામાં આવ્યા છે:

| Namespace   | Purpose                                                                   |
| ----------- | ------------------------------------------------------------------------- |
| `cliCommon` | શેર કરેલ સ્ટ્રિંગ્સ (કાર્ડ લેબલ, સંકલ્પના/તુલના ટેક્સ્ટ, વિગત પાનું લેબલ) |
| `cliCode`   | CLI કોડના પાનું સ્ટ્રિંગ્સ                                                |
| `cliAgents` | CLI એજન્ટ્સ પાનું સ્ટ્રિંગ્સ                                              |
| `acpAgents` | ACP એજન્ટ્સ પાનું સ્ટ્રિંગ્સ                                              |

પૂર્ણ PT-BR અને EN અનુવાદ પ્રદાન કરવામાં આવ્યા છે. 39 અન્ય લોકલ્સ આપમેળે EN પર પાછા ફરે છે `src/i18n/request.ts` માં નામસ્થાન-સ્તર મર્જ દ્વારા.

---

## 9. ઝડપી શરૂઆત

### પગલું 1 — એક OmniRoute API કી મેળવો

1. ખોલો `/dashboard/api-manager` → **API કી બનાવો**
2. તેને એક નામ આપો (ઉદાહરણ તરીકે `cli-tools`) અને તમામ પરવાનગીઓ પસંદ કરો
3. કી નકલ કરો — તમને નીચેના દરેક CLI માટે તેની જરૂર પડશે

> તમારી કી આ રીતે દેખાય છે: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### પગલું 2 — CLI ટૂલ્સ સ્થાપિત કરો

બધા npm આધારિત ટૂલ્સ માટે Node.js 22.22.2+ અથવા 24.x ની જરૂર છે:

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
cargo install smelt  # Rust આધારિત

# Pi coding agent
# સ્થાપન માટે https://github.com/zechnerj/pi-coding-agent જુઓ

# jcode
# સ્થાપન માટે https://github.com/1jehuang/jcode જુઓ
```

---

### પગલું 3 — ડેશબોર્ડ દ્વારા કન્ફિગર કરો

1. જાઓ `http://localhost:20128/dashboard/cli-code`
2. ગ્રિડમાં તમારી ટૂલ શોધો
3. ટૂલ વિગત પાનું ખોલવા માટે કાર્ડ પર ક્લિક કરો
4. તમારી API કી અને બેઝ URL પસંદ કરો
5. **કન્ફિગર લાગુ કરો** પર ક્લિક કરો અથવા મેન્યુઅલ કન્ફિગર સ્નિપેટ નકલ કરો

---

### પગલું 4 — વૈશ્વિક પર્યાવરણ ચલ સેટ કરો

```bash
# OmniRoute યુનિવર્સલ એન્ડપોઈન્ટ
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI ROOT પર GOOGLE_GEMINI_BASE_URL વાંચે છે (તેનું SDK પોતે /v1beta/... ઉમેરે છે)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> **દૂરના સર્વર** માટે `localhost:20128` ને સર્વર IP અથવા ડોમેન સાથે બદલો,
> ઉદાહરણ તરીકે `http://<your-server-ip>:20128`.

---

### પગલું 4 — દરેક ટૂલને કન્ફિગર કરો

#### Claude Code

```bash
# બનાવો ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Claude Code માટે એકીકૃત Anthropic ગેટવે રૂટનો ઉપયોગ કરો. અહીં `/v1` ઉમેરશો નહીં.

**પરીક્ષણ:** `claude "say hello"`

---

#### OpenAI Codex

આધુનિક Codex (v0.137+) ફક્ત `~/.codex/config.toml` વાંચે છે — જૂનું
`config.yaml` વારસાગત npm CLI માટે છે અને મૌન રીતે અવગણવામાં આવે છે. API
કી `OMNIROUTE_API_KEY` પર્યાવરણ ચલ (`env_key`) માં રહે છે, ક્યારેય
ફાઇલની અંદર નહીં:

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

પૂર્ણ સંદર્ભ (પ્રોફાઇલ, `wire_api`, સંદર્ભ વિન્ડોઝ): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

**પરીક્ષણ:** `codex "what is 2+2?"`

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

**પરીક્ષણ:** `opencode`

> વિચારણા રૂપો મોકલવા માટે `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high` નો ઉપયોગ કરો.

---

#### Cline (CLI અથવા VS Code)

**CLI મોડ:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**VS Code મોડ:**
Cline વિસ્તરણ સેટિંગ્સ → API પ્રદાતા: `OpenAI Compatible` → બેઝ URL: `http://localhost:20128/v1`

અથવા OmniRoute ડેશબોર્ડનો ઉપયોગ કરો → **CLI ટૂલ્સ → Cline → કન્ફિગર લાગુ કરો**.

---

#### KiloCode (CLI અથવા VS Code)

**CLI મોડ:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**VS Code સેટિંગ્સ:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

અથવા OmniRoute ડેશબોર્ડનો ઉપયોગ કરો → **CLI ટૂલ્સ → KiloCode → કન્ફિગર લાગુ કરો**.

---

#### Continue (VS Code Extension)

`~/.continue/config.yaml` સંપાદિત કરો:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

સંપાદન પછી VS Code ફરી શરૂ કરો.

---

#### VS Code Insiders (`chatLanguageModels.json`)

જ્યારે VS Code Insiders કસ્ટમ એન્ડપોઈન્ટ મોડલ માટે કન્ફિગર કરવામાં આવે છે અને તમે OmniRoute ને કસ્ટમ હેડર ફીલ્ડ વિના કાર્ય કરવા માંગો છો ત્યારે આનો ઉપયોગ કરો.

**સૂચવેલ સ્થાન:**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**ટોકનાઇઝ્ડ OmniRoute ઉપનામનો ઉપયોગ કરીને ઉદાહરણ:**

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

**નોંધ:**

- `sk-your-omniroute-key` ને OmniRoute માં બનાવવામાં આવેલી API કી સાથે બદલો.
- `url` ફીલ્ડને `/api/v1/vscode/{token}/chat/completions` તરફ સંકેત કરવો જોઈએ.
- `modelsUrl` ફીલ્ડને `/api/v1/vscode/{token}/models` તરફ સંકેત કરવો જોઈએ.
- જ્યારે ક્લાયન્ટ કસ્ટમ હેડર્સને સપોર્ટ કરે છે ત્યારે સામાન્ય `/v1` + બેરર હેડર પ્રવાહને પ્રાથમિકતા આપો.
- URL-એમ્બેડેડ ટોકન્સ એક સુસંગતતા પાછા ફરવા છે અને સંપાદક લોગ્સ અથવા પ્રોક્સી ઇતિહાસમાં દેખાઈ શકે છે.

---

#### Kiro CLI (અમેઝોન)

```bash
# તમારા AWS/Kiro ખાતામાં લોગિન કરો:
kiro-cli login

# CLI તેની પોતાની ઓથનો ઉપયોગ કરે છે — Kiro CLI માટે બેકએન્ડ તરીકે OmniRouteની જરૂર નથી.
# અન્ય ટૂલ્સ માટે OmniRoute સાથે kiro-cli નો ઉપયોગ કરો.
kiro-cli status
```

**Kiro IDE** ડેસ્કટોપ એપ્લિકેશન માટે, OmniRoute દ્વારા પ્રદર્શિત MITM એન્ડપોઈન્ટનો ઉપયોગ કરો
`/dashboard/cli-tools → Kiro` હેઠળ.

---

## 10. આંતરિક ઓમ્નીરૂટ CLI

`omniroute` બાઈનરી સર્વર જીવનચક્ર, સેટઅપ, નિદાન અને પ્રદાતા વ્યવસ્થાપન માટે આદેશો પ્રદાન કરે છે. પ્રવેશ બિંદુ: `bin/omniroute.mjs`.

```bash
omniroute                              # સર્વર શરૂ કરો (ડિફોલ્ટ પોર્ટ 20128)
omniroute setup                        # ઇન્ટરેક્ટિવ સેટઅપ વિઝાર્ડ
omniroute doctor                       # કન્ફિગ, DB, પોર્ટ, રનટાઇમ તપાસો
omniroute providers list               # કન્ફિગર્ડ પ્રદાતા કનેક્શન
omniroute providers test-all           # દરેક સક્રિય કનેક્શનનું પરીક્ષણ કરો
omniroute reset-password               # એડમિન પાસવર્ડ ફરીથી સેટ કરો
omniroute logs                         # વિનંતી લોગ્સ સ્ટ્રીમ કરો
omniroute health                       # વિગતવાર આરોગ્ય (બ્રેકર્સ, કેશ, મેમરી)
omniroute --version                    # સંસ્કરણ છાપો
omniroute --help                       # બધા આદેશો બતાવો
```

### સેટઅપ અને આરંભ

```bash
omniroute setup                        # ઇન્ટરેક્ટિવ સેટઅપ વિઝાર્ડ
omniroute setup --non-interactive      # CI/ઓટોમેશન મોડ (પર્યાવરણ ચલ + ફ્લેગ્સ વાંચે છે)
omniroute setup --password '<value>'   # એડમિન પાસવર્ડ સીધો સેટ કરો
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # એક જ શોટમાં પ્રદાતા ઉમેરો અને પરીક્ષણ કરો
```

ગેર-ઇન્ટરેક્ટિવ સેટઅપ માટે માન્ય પર્યાવરણ ચલ:

| Var                 | ઉદ્દેશ                                                          |
| ------------------- | --------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | પ્રદાતા API કી (કમાંડર `.env()` દ્વારા `--api-key` સાથે બાઉન્ડ) |
| `DATA_DIR`          | ઓમ્નીરૂટ ડેટા ડિરેક્ટરીને ઓવરરાઈડ કરો                           |

બાકીના બધા ગેર-ઇન્ટરેક્ટિવ ઇનપુટ્સ ફ્લેગ્સ તરીકે પસાર થાય છે, પર્યાવરણ ચલ તરીકે નહીં:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(ઉપરના `omniroute setup` વિકલ્પો જુઓ).

### નિદાન

```bash
omniroute doctor                       # કન્ફિગ, DB, પોર્ટ, રનટાઇમ, મેમરી, જીવંતતા તપાસો
omniroute doctor --json                # મશીન-વાંચનક્ષમ JSON
omniroute doctor --no-liveness         # HTTP આરોગ્ય પ્રોબને છોડી દો
omniroute doctor --host 0.0.0.0        # જીવંતતા હોસ્ટને ઓવરરાઈડ કરો
omniroute doctor --liveness-url <url>  # સંપૂર્ણ આરોગ્ય અંતિમ બિંદુ URL ઓવરરાઈડ
```

ડોક્ટર આ ચકાસણીઓ ચલાવે છે: `કન્ફિગ`, `ડેટાબેઝ`, `સ્ટોરેજ/એન્ક્રિપ્શન`,
`પોર્ટ ઉપલબ્ધતા`, `નોડ રનટાઇમ`, `નેટિવ બાઈનરી` (બેટર-સ્ક્વાઇટ 3),
`મેમરી`, અને `સર્વર જીવંતતા`. જો કોઈ ચકાસણી `ફેલ` થાય તો તે નોન-ઝીરોમાં બહાર નીકળે છે.

### પ્રદાતા વ્યવસ્થાપન

```bash
omniroute providers available                       # ઓમ્નીરૂટ પ્રદાતા કૅટલોગ
omniroute providers available --search openai       # id/name/alias/category દ્વારા કૅટલોગને ફિલ્ટર કરો
omniroute providers available --category api-key    # શ્રેણી દ્વારા ફિલ્ટર કરો (api-key, oauth, free, ...)
omniroute providers available --json                # મશીન-વાંચનક્ષમ JSON

omniroute providers list                            # કન્ફિગર્ડ પ્રદાતા કનેક્શન
omniroute providers list --json

omniroute providers test <id|name>                  # એક કન્ફિગર્ડ કનેક્શનનું પરીક્ષણ કરો
omniroute providers test-all                        # દરેક સક્રિય કનેક્શનનું પરીક્ષણ કરો
omniroute providers validate                        # સ્થાનિક-માત્ર બંધારણ માન્યતા
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # અસ્તિત્વમાં આવેલા OAuth પ્રવાહ
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` એ API-પ્રથમ છે અને તેથી સક્રિય સ્થાનિક અથવા દૂરના સંદર્ભ સામે કાર્ય કરે છે. પ્રમાણપત્ર ઇનપુટને ઉપયોગ કરવો જોઈએ
`--credential-stdin` અથવા `--credential-env`; `--dry-run --json` માત્ર
લાલિત્યની હાજરી/આકારની માહિતી આપે છે. `providers available` ઓમ્નીરૂટ કૅટલોગને વાંચે છે;
`providers list/test/test-all/validate` તેમના સ્થાનિક SQLite વર્તનને જાળવે છે અને
સર્વર ચલાવવાની જરૂર નથી.

### પુનઃપ્રાપ્તિ અને પુનઃસેટ

```bash
omniroute reset-password                # એડમિન પાસવર્ડ ફરીથી સેટ કરો (અન્ય: omniroute-reset-password)
omniroute reset-encrypted-columns       # એન્ક્રિપ્ટેડ પ્રમાણપત્ર પુનઃસેટ માટે ચેતવણી + ડ્રાય-રન બતાવો
omniroute reset-encrypted-columns --force  # વાસ્તવમાં SQLite માં એન્ક્રિપ્ટેડ પ્રમાણપત્રને નલ કરો
```

### પ્રમાણપત્ર નિકાસ (⚠ ધ્યાનથી હેન્ડલ કરો)

```bash
omniroute auth export                                 # ચેતવણી + પુષ્ટિ ગેટ — DB ઍક્સેસ નથી
omniroute auth export --force                          # તમામ કનેક્શનના ડિક્રિપ્ટેડ પ્રમાણપત્રોને stdout પર JSON તરીકે નિકાસ કરો
omniroute auth export --force --id <id>                 # ફક્ત મેળ ખાતા કનેક્શનને નિકાસ કરો
omniroute auth export --force --format env               # OMNIROUTE_<PROVIDER>_<FIELD>=<value> લાઇન ઉત્પન્ન કરો
omniroute auth export --force --out creds.json           # ફાઇલમાં લખો (0600 પરમિશન સાથે બનાવવામાં આવે છે)
```

`auth export` એ **સ્થાનિક-માત્ર** (સિધા SQLite વાંચન, કોઈ HTTP માર્ગ નથી) અને ઇરાદાપૂર્વક છાપે/લખે છે
**પ્લેઇનટેક્સ્ટ** `apiKey`/`accessToken`/`refreshToken`/`idToken` મૂલ્યો — આ ફીચર છે, બગ નથી. ડેટાબેઝમાંથી કંઈપણ વાંચવામાં આવતું નથી, અને કંઈપણ ડિક્રિપ્ટ કરવામાં આવતું નથી, વિના `--force`. કોઈપણ પ્લેઇનટેક્સ્ટ ઉત્પન્ન થાય તે પહેલાં હંમેશા stderr ચેતવણી બેનર છાપે છે. `STORAGE_ENCRYPTION_KEY` સેટ કરવું જરૂરી છે. એક ક્ષેત્ર જે ડિક્રિપ્ટ કરવામાં નિષ્ફળ જાય છે (જૂનો કી, ખોટી ciphertext) તે તરીકે રિપોર્ટ કરવામાં આવે છે
`<field>DecryptFailed: true` સમગ્ર નિકાસને બંધ કરવાનો બદલે અથવા આધારભૂત ભૂલને લીક કરવાનો બદલે.

### અન્ય ઉપઆદેશો

આઓમ્નીરૂટ સર્વર ચલાવવાની ધારણા કરે છે, જો અન્યથા નોંધાયેલ ન હોય:

```bash
omniroute status                       # વ્યાપક રનટાઇમ સ્થિતિ
omniroute logs                         # વિનંતી લોગ્સ સ્ટ્રીમ (--json, --search, --follow)
omniroute config show                  # વર્તમાન કન્ફિગ્યુરેશન દર્શાવો

omniroute provider list                # ઉપલબ્ધ પ્રદાતાઓની યાદી (પ્રદાતાઓની યાદીનું ઉપનામ)
omniroute provider add                 # એક સાધન પર ઓમ્નીરૂટને પ્રદાતા તરીકે નોંધણી કરો
omniroute keys add | list | remove     # API કી વ્યવસ્થાપન
omniroute models [provider]            # મોડલની યાદી (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # કન્ફિગ + DB નું સ્નેપશોટ
omniroute restore                      # અગાઉના સ્નેપશોટમાંથી પુનઃપ્રાપ્તિ

omniroute health                       # વિગતવાર આરોગ્ય (બ્રેકર્સ, કેશ, મેમરી)
omniroute quota                        # પ્રદાતા ક્વોટનો ઉપયોગ
omniroute cache                        # કેશની સ્થિતિ
omniroute cache clear                  # સેમેન્ટિક + સહી કેશને સાફ કરો

omniroute mcp status | restart         # MCP સર્વર સ્થિતિ / પુનઃપ્રારંભ
omniroute a2a status | card            # A2A સર્વર સ્થિતિ / એજન્ટ કાર્ડ

omniroute tunnel list | create | stop  # ટનલ્સનું વ્યવસ્થાપન (ક્લાઉડફ્લેર/ટેઇલસ્કેલ/ngrok)
omniroute env show | get <k> | set <k> <v>  # પર્યાવરણ ચલ તપાસો / સેટ કરો (તાત્કાલિક)

omniroute test                         # પ્રદાતા કનેક્ટિવિટી સ્મોક ટેસ્ટ
omniroute update                       # અપડેટ્સ માટે તપાસો
omniroute completion                   # શેલ પૂર્ણતા જનરેટ કરો
```

### સામાન્ય ફ્લેગ્સ

| ફ્લેગ               | વર્ણન                                                      |
| ------------------- | ---------------------------------------------------------- |
| `--no-open`         | શરૂ થતાં બ્રાઉઝર ઓટોમેટિક ખોલવા નથી                        |
| `--port <n>`        | API પોર્ટને ઓવરરાઈડ કરો (ડિફોલ્ટ 20128)                    |
| `--mcp`             | stdio પર MCP સર્વર તરીકે ચલાવો (IDE માટે)                  |
| `--non-interactive` | CI મોડ (કોઈ પ્રોમ્પ્ટ નથી; પર્યાવરણ/ફ્લેગ્સમાંથી વાંચે છે) |
| `--json`            | મશીન-વાંચનક્ષમ JSON આઉટપુટ (ડોક્ટર, પ્રદાતાઓ, વગેરે)       |
| `--help`, `-h`      | આદેશ-વિશિષ્ટ મદદ બતાવો                                     |
| `--version`, `-v`   | સ્થાપિત સંસ્કરણ છાપો                                       |

---

## ઉપલબ્ધ API એન્ડપોઈન્ટ્સ

| એન્ડપોઈન્ટ                 | વર્ણન                         | ઉપયોગ માટે                              |
| -------------------------- | ----------------------------- | --------------------------------------- |
| `/v1/chat/completions`     | માનક ચેટ (બધા પ્રદાતાઓ)       | તમામ આધુનિક સાધનો                       |
| `/v1/responses`            | પ્રતિસાદ API (OpenAI ફોર્મેટ) | કોડેક્સ, એજન્ટિક વર્કફ્લો               |
| `/v1/completions`          | વારસાગત ટેક્સ્ટ પૂર્ણતાઓ      | જૂના સાધનો જે `prompt:` નો ઉપયોગ કરે છે |
| `/v1/embeddings`           | ટેક્સ્ટ એમ્બેડિંગ્સ           | RAG, શોધ                                |
| `/v1/images/generations`   | છબી જનરેશન                    | GPT-Image, Flux, વગેરે                  |
| `/v1/audio/speech`         | ટેક્સ્ટ-થી-સ્પીચ              | ElevenLabs, OpenAI TTS                  |
| `/v1/audio/transcriptions` | સ્પીચ-થી-ટેક્સ્ટ              | Deepgram, AssemblyAI                    |

ટોકનાઇઝ્ડ ઓમ્નીરૂટ URL સાથે તૈયાર-થી-પેસ્ટ ઉદાહરણો:

```txt
ટોકન ઉદાહરણ: sk-a3ab3c080beaee3a-69f4a4-070d71af

માનક OpenAI આધાર: http://localhost:20128/v1
VS Code મોડેલ્સ: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
VS Code ચેટ: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
VS Code પ્રતિસાદ: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Ollama ટેગ્સ: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Ollama ચેટ: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## સમસ્યાઓનું નિરાકરણ

| ભૂલ                                           | કારણ                       | સુધારો                                                           |
| --------------------------------------------- | -------------------------- | ---------------------------------------------------------------- |
| `Connection refused`                          | OmniRoute ચલાવી રહ્યું નથી | `omniroute serve`                                                |
| `401 Unauthorized`                            | ખોટો API કી                | `/dashboard/api-manager` માં તપાસો                               |
| `No combo configured`                         | કોઈ સક્રિય રૂટિંગ કોમ્બો   | `/dashboard/combos` માં સેટ કરો                                  |
| CLI "not installed" બતાવે છે                  | બાયનરી PATH માં નથી        | `which <command>` તપાસો                                          |
| ડેશબોર્ડ ઇન્સ્ટોલ પછી "not detected" બતાવે છે | કેશ જૂનો                   | ડેશબોર્ડમાં "⟳ Refresh detection" પર ક્લિક કરો                   |
| જૂનો લિંક `/dashboard/cli-tools`              | Pre-v3.8.6 બુકમાર્ક        | `/dashboard/cli-code` (308) પર આપોઆપ રીડાયરેક્ટ કરવામાં આવ્યું   |
| જૂનો લિંક `/dashboard/agents`                 | Pre-v3.8.6 બુકમાર્ક        | `/dashboard/acp-agents` (308) પર આપોઆપ રીડાયરેક્ટ કરવામાં આવ્યું |
