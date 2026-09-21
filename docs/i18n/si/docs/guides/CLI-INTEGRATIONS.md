# CLI Integrations (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute විසින් coding CLI එකක් (Codex, Claude Code, OpenCode, Cline, …) එහි backend එක ලෙස OmniRoute භාවිත කිරීමට වින්යාස කරන `setup-*` විධාන සමූහයක් සපයයි — එම නිසා
මෙවලම **එක්** endpoint එකක් සමඟ සන්නිවේදනය කරන අතර OmniRoute විසින් ස්වයංක්රීය fallback සමඟ
නිවැරදි provider වෙත route කරයි. සෑම විධානයක්ම ක්රියාත්මක වන
OmniRoute එකකින් (දේශීය හෝ දුරස්ථ) **සජීවී** model catalog එක කියවා, මෙවලමට අදාළ config file එක **ඔබගේ**
යන්ත්රයේ ලියයි. මෙවලම සහාය දක්වන සෑම තැනකම API key එක environment variable එකක් මඟින් යොමු කරනු ලැබේ. මෙවලමට-දේශීය environment file එකක් ස්ථිරව සුරකින විධාන පහත සටහන් කර ඇත.

කිසිදු config එකක් නොලියා, නිවැරදි env අගයන් ඇතුළත් කර
`claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` හෝ `gemini` ආරම්භ කරන සාමාන්ය launcher එකක් ද ඇත — `omniroute run <target>`.
Targets සහ ඒවායේ aliases, canonical manifest එක වන `bin/cli/cli-manifest.mjs`
(`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`,
`open-code`, `qwen-code`, `gemini-cli`) වෙතින් ලැබෙන අතර, `omniroute completion` ද එම
manifest එකෙන් ලබාගත් target වචනම සපයයි. පැරණි එක් එක් මෙවලමට විශේෂිත launchers —
`omniroute launch` (Claude Code) සහ `omniroute launch-codex` (Codex) — තවමත්
ලබා ගත හැක.

Provider onboarding කිරීම ද එම දේශීය/දුරස්ථ context එකෙන්ම සිදු කළ හැක. පහත
API-ප්රමුඛ විධාන management authentication එක provider
credentials වලින් වෙන්ව තබන අතර, structured output තුළ credential එකක් කිසිවිටෙකත් මුද්රණය නොකරයි:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Scripts සඳහා, `--credential-stdin` හෝ `--credential-env` භාවිත කිරීමට ප්රමුඛත්වය දෙන්න; පාලිත දේශීය භාවිතය සඳහා `--credential`
තවදුරටත් පවත්වාගෙන යනු ලැබේ. අන්තර්ක්රියාකාරී නොවන terminal එකකදී `providers remove` සඳහා `--yes` අවශ්ය වන අතර,
විධාන පහම සක්රිය context එකට හෝ ගෝලීය `--base-url`/`--api-key` options වලට අනුකූල වේ.

වඩාත්ම විශේෂාංග සහිත integrations දෙකේ එක් වරක් පමණක් අතින් සිදු කරන මූලික setup එක සඳහා, එක් එක් මෙවලම පිළිබඳ සවිස්තරාත්මක මාර්ගෝපදේශ බලන්න:

- [Claude Code වින්යාසය](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI වින්යාසය](./CODEX-CLI-CONFIGURATION.md)
- [දුරස්ථ ප්රකාරය](./REMOTE-MODE.md) — ඔබගේ laptop එකෙන් දුරස්ථ OmniRoute එකක් (VPS / Tailnet) මෙහෙයවන්න
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — OmniCopilot extension එක; එයට editor එක තුළින්ම මෙම
  `setup-*` විධාන ඔබ වෙනුවෙන් ක්රියාත්මක කිරීමට ද හැක

---

## ප්රධාන වගුව

සෑම විධානයක්ම **සක්රිය සන්දර්භයට** (`omniroute connect` මඟින් සකසන ලද; [දුරස්ථ ප්රකාරය](./REMOTE-MODE.md) බලන්න) හෝ පැහැදිලි `--remote <url> --api-key <key>` සලකුණු සඳහා අනුකූල වේ. පහත “දේශීය සහ දුරස්ථ” යන්නෙන් අදහස් වන්නේ: කිසිදු සලකුණක් නොමැති විට එය `http://localhost:20128` ඉලක්ක කරයි; `--remote` සමඟ (හෝ සක්රිය දුරස්ථ සන්දර්භයක් සමඟ) එය එම සේවාදායකයෙන් නාමාවලිය ලබාගෙන වින්යාසය දේශීයව ලියයි.

| විධානය                     | මෙවලම                          | එය ලියන දේ                                                                                                                                                                     | ප්රධාන ධජ                                                                                                                                  | දේශීය එදිරිව දුරස්ථ |
| -------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI               | `~/.codex/<name>.config.toml` — අනුකූල සෑම පෙළ ආකෘතියකටම එක් පැතිකඩක් (`codex --profile <name>`)                                                                               | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | දෙකම                |
| `omniroute setup-claude`   | Claude Code                    | `~/.claude/profiles/<name>/settings.json` — ගැළපෙන සෑම ආකෘතියකටම එක් පැතිකඩක් (`CLAUDE_CONFIG_DIR`)                                                                            | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | දෙකම                |
| `omniroute setup-opencode` | OpenCode (OpenAI-අනුකූල)       | `~/.config/opencode/opencode.json` — නාමාවලියේ සෑම ආකෘතියක්ම සහිත `omniroute` සපයන්නා (`opencode -m omniroute/<model>`)                                                        | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | දෙකම                |
| `omniroute setup-cline`    | Cline                          | `~/.cline/data/{globalState,secrets}.json` (CLI ප්රකාරය) + VS Code දිගුවේ සැකසුම් මුද්රණය කරයි                                                                                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | දෙකම                |
| `omniroute setup-kilo`     | Kilo Code                      | `~/.local/share/kilo/auth.json` (CLI) + VS Code `settings.json` පවතී නම් එයට `kilocode.*` ඒකාබද්ධ කරයි                                                                         | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | දෙකම                |
| `omniroute setup-continue` | Continue / `cn` CLI            | `~/.continue/config.yaml` — `provider: openai` ආකෘති, යතුර `${{ secrets.OMNIROUTE_API_KEY }}` හරහා                                                                             | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | දෙකම                |
| `omniroute setup-cursor`   | Cursor                         | කිසිවක් නැත — යෙදුම තුළ සිදු කළ යුතු පියවර මුද්රණය කරයි (Cursor වින්යාසය විනිවිද නොපෙනෙන SQLite ආකාරයකි)                                                                       | `--remote` `--api-key` `--only` `--port`                                                                                                   | දෙකම                |
| `omniroute setup-roo`      | Roo Code                       | `~/.omniroute/roo-settings.json` (ආයාත ලේඛනය) + VS Code `settings.json` පවතී නම් `roo-cline.autoImportSettingsPath` සකසයි                                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | දෙකම                |
| `omniroute setup-crush`    | Crush                          | `~/.config/crush/crush.json` — `openai-compat` සපයන්නා, යතුර `$OMNIROUTE_API_KEY` හරහා                                                                                         | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | දෙකම                |
| `omniroute setup-goose`    | Goose                          | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + පරිසර සැකසුම් උපදෙස් මුද්රණය කරයි                                                               | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | දෙකම                |
| `omniroute setup-aider`    | Aider                          | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + පරිසර සැකසුම් උපදෙස් මුද්රණය කරයි                                                                             | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | දෙකම                |
| `omniroute setup-qwen`     | Qwen Code                      | `~/.qwen/settings.json` — V4 `modelProviders.openai` අරාව + `~/.qwen/.env` තුළ `OMNIROUTE_API_KEY`                                                                             | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | දෙකම                |
| `omniroute setup-5dive`    | 5dive (නියෝජිත සමූහය)          | `$HOME` යටතේ කිසිවක් නැත — `5dive agent auth set` හරහා 5dive **සත්යාපන පැතිකඩක්** (`/var/lib/5dive/auth-profiles/<name>/`) ලියයි; root සඳහා පමණි, සමූහ ධාරකය මත ධාවනය වේ       | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | දෙකම                |
| `omniroute run <target>`   | ධාවන-කාල දියත් කිරීම (සාමාන්ය) | කිසිවක් නැත — නිවැරදි පරිසරය සහ විස්තාරක සමඟ `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` ආරම්භ කරයි; Qwen සහ Gemini තාවකාලික හුදකලා මුල් නාමාවලියක් භාවිත කරයි | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | දෙකම                |
| `omniroute launch`         | Claude Code                    | කිසිවක් නැත — `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` ඇතුළත් කර `claude` ආරම්භ කරයි                                                                                        | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | දෙකම                |
| `omniroute launch-codex`   | OpenAI Codex CLI               | කිසිවක් නැත — `-c` ධජ හරහා `omniroute` සපයන්නා ඇතුළත් කර `codex` ආරම්භ කරයි                                                                                                    | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | දෙකම                |

ධජ පිළිබඳ සටහන් (විධාන මූලාශ්රයෙන් තහවුරු කර ඇත):

- `--remote <url>` — දුරස්ථ OmniRoute එකකින් නාමාවලිය ලබා ගනී (`--port`
  සහ සක්රිය සන්දර්භය අභිබවා යයි). `--api-key <key>` මඟින් එම
  සේවාදායකය සඳහා අක්තපත්රය සපයයි (පෙරනිමියෙන් `OMNIROUTE_API_KEY` පරිසර විචල්යය හෝ සක්රිය සන්දර්භයේ token එක භාවිත කරයි).
- `--only <patterns>` — කොමාවෙන් වෙන් කළ උපතන්තු; ගැළපෙන model ID පමණක්
  තබා ගනී (උදා. `--only glm,kimi`). `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush` සඳහා ලබා ගත හැක.
- `--dry-run` — ගොනු පද්ධතියට කිසිදු වෙනසක් නොකර, ලියනු ලබන දේ හරියටම
  මුද්රණය කරයි. `setup-cursor` **හැර** (එය කිසිවිටෙක ගොනුවක් නොලියයි)
  සෑම `setup-*` විධානයකම ලබා ගත හැක.
- `--model <id>` — model ස්වයං-සොයාගැනීමක් නොමැති මෙවලම් සඳහා අවශ්ය වේ
  (නැතහොත් අන්තර්ක්රියාකාරීව තෝරා ගනී): Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive. එම මෙවලම්
  අන්තර්ක්රියාකාරී නොවන ධාවනයන් සඳහා `--yes` ද පිළිගනී (එවිට `--model` අවශ්ය වේ).
  `setup-opencode` ඉහළ මට්ටමේ පෙරනිමි model එක සැකසීමට `--model` භාවිත කරයි.
- `omniroute run` හි `--model <id>` manifest එකේ එක් එක් ඉලක්කයට අදාළ සම්බන්ධකරණය
  (`bin/cli/cli-manifest.mjs`) අනුගමනය කරයි: **aider** වෙත `--model openai/<id>` ද
  **opencode** වෙත `--model omniroute/<id>` ද ලැබේ (උපසර්ගය එක් කරන්නේ id එකේ
  එය දැනටමත් නොමැති නම් පමණි); **qwen** සහ **gemini** වෙත id එක වෙනස් නොකර ලැබේ;
  **claude** වෙත එය `ANTHROPIC_MODEL` හරහා ද, **goose** වෙත `GOOSE_MODEL` හරහා ද,
  **codex** වෙත `-c model_providers.omniroute.*` තර්ක හරහා ද ලැබේ. **`--model`
  අනිවාර්යයෙන් අවශ්ය එකම ධාවන ඉලක්කය Qwen වේ** — එය නොමැතිව `omniroute run qwen`
  ක්රියාත්මක කළහොත් පැහැදිලි දෝෂයක් සමඟ `2` පිටවීමේ කේතයෙන් අවසන් වේ.
- `--port <port>` — දේශීය OmniRoute port එක (පෙරනිමිය `20128`; `--remote`
  සකසා ඇති විට නොසලකා හැරේ). සියලු `setup-*` විධානවල සහ launcher දෙකෙහිම ඇත.
- `omniroute run` පිටවීමේ කේත: child CLI එකේ පිටවීමේ කේතය එලෙසම ඉදිරියට
  යවනු ලැබේ; `2` = වලංගු නොවන තර්ක (සහාය නොදක්වන ඉලක්කය, අවශ්ය
  `--model` නොමැති වීම, container ආරක්ෂකය); `127` = ඉලක්ක binary එක `PATH` තුළ නොමැත;
  `130`/`143`/`129` = දියත් කිරීම `SIGINT`/`SIGTERM`/`SIGHUP` මඟින් අවසන් කළ විට;
  `1` = වෙනත් runtime දියත් කිරීමේ අසමත් වීමක්.
- launcher දෙක (`launch`, `launch-codex`) `setup-claude` / `setup-codex` මඟින් ලියන ලද
  profile එකක් තේරීමට `--profile <name>` පිළිගන්නා අතර, යටින් පවතින
  `claude` / `codex` binary වෙත යැවිය යුතු තර්ක ද පිළිගනී.

අන්තර්ක්රියාකාරී තේරීම්කාරකය setup වට්ටෝරු අතර ද බෙදාගෙන භාවිත වේ:

```bash
# සක්රිය දේශීය හෝ දුරස්ථ model නාමාවලියෙන් තෝරා ඉලක්කය වින්යාස කරන්න.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` දැනට `codex`, `claude`, `opencode`, `qwen`, `aider`, `goose`,
`cline`, `continue`, `kilo`, සහ `5dive` සඳහා පරීක්ෂා කළ වට්ටෝරු වෙත පැවරේ.
IDE-පමණක් වන,
MITM සහ මාර්ගෝපදේශ-පමණක් වන නාමාවලි ඇතුළත් කිරීම් පැහැදිලි `setup-*`/අතින් සිදු කරන ප්රවාහ ලෙස පවතින අතර
දියත් කළ හැකි ඉලක්ක ලෙස ඉදිරිපත් නොකෙරේ.

> `setup-opencode` යනු **සැහැල්ලු openai-compatible** OpenCode ඒකාබද්ධ කිරීමයි.
> වඩාත් විශේෂාංග සහිත plugin ඒකාබද්ධ කිරීමක් ද ඇත — `omniroute setup opencode` — එය
> `@omniroute/opencode-plugin` ස්ථාපනය කරයි. ඒවා වෙනස් විධාන වේ; ඉහත වගුව
> `setup-opencode` ලේඛනගත කරයි.
>
> OpenCode හි ප්රධාන සංස්කරණ දෙකේ loader විසින් වෙනස් entrypoint අපේක්ෂා කරන බැවින්,
> plugin එක එක් එක් ප්රධාන සංස්කරණයට එක බැගින් package දෙකක් ලෙස පැමිණේ:
> OpenCode v1 සඳහා `@omniroute/opencode-plugin` සහ
> OpenCode v2 සඳහා `@omniroute/opencode-plugin-v2`. v2 package එක අලුත්ය
> (`0.1.0`) සහ තවමත් වෙනස් වෙමින් පවතින host contract එකක් අනුගමනය කරන බැවින්, නිශ්චිත හැඩයක්
> උපකල්පනය කිරීම වෙනුවට OpenCode විසින් catalog draft එකට ඇතුළත් කරන හැඩය එය කියවයි.
> `opencode.json` වෙත `plugins` ඇතුළත් කිරීමක් එක් කිරීමෙන් එය ස්ථාපනය කරන්න; `omniroute setup opencode`
> තවමත් v1 package එක ස්ථාපනය කරයි. විකල්ප සහ අක්තපත්ර සෙවීමේ අනුපිළිවෙළ
> package README එකෙහි ඇත.

---

## දේශීය භාවිතය

OmniRoute `localhost:20128` මත ක්රියාත්මක වන විට, ඔබේ මෙවලම සඳහා සැකසුම් විධානය ක්රියාත්මක කරන්න. නාමාවලිය දේශීය සේවාදායකයෙන් ලබාගැනේ.

```bash
# Codex: ගැළපෙන සෑම ආකෘතියකටම පැතිකඩක් ~/.codex/ තුළ ලියන්න
omniroute setup-codex
codex --profile glm52            # ජනනය කළ පැතිකඩක් භාවිත කරන්න

# Claude Code: එක් එක් ආකෘතිය සඳහා පැතිකඩ ලියා, ඉන් එකක් දියත් කරන්න
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: සියලු නාමාවලි ආකෘති සහිත openai-අනුකූල සැපයුම්කරු ලියන්න
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # {env:OMNIROUTE_API_KEY} හරහා යොමු කෙරේ, කිසිවිටෙකත් තැටියට නොලියයි
opencode -m omniroute/glm/glm-5.2 "..."

# ස්වයංක්රීය සොයාගැනීම නොමැති මෙවලම් සඳහා නිශ්චිත ආකෘතියක් අවශ්ය වේ:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# කිසිවක් නොලියා පෙරදසුන් කරන්න:
omniroute setup-continue --dry-run
```

කිසිදු වින්යාසයක් නොලියා දියත් කරන්න (පරිසර-ආදේශනය පමණි):

```bash
omniroute launch                 # Claude Code → දේශීය OmniRoute
omniroute launch-codex           # Codex CLI → දේශීය OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# නිශ්චිත විධාන මාර්ගය: -- ට පසුව එන ඕනෑම දෙයක් ඒ ආකාරයෙන්ම යොමු කරන්න
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## දුරස්ථ භාවිතය

ඕනෑම සැකසුම් විධානයක් `--remote` + `--api-key` සමඟ දුරස්ථ OmniRoute එකකට යොමු කරන්න. නාමාවලිය දුරස්ථ පද්ධතියෙන් ලබාගෙන, වින්යාසය ඔබේ දේශීය යන්ත්රයේ ලියනු ලැබේ.

```bash
# දුරස්ථ VPS එකකට එරෙහිව OpenCode, glm/kimi ආකෘති පමණක් තබාගන්න
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # පළමුව OMNIROUTE_API_KEY export කරන්න

# දුරස්ථ නාමාවලියකින් Codex පැතිකඩ
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# CLI එකක් සෘජුවම දුරස්ථ පද්ධතියට එරෙහිව දියත් කරන්න
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

සෑම වරකම `--remote`/`--api-key` ලබාදීම වෙනුවට, එක් වරක් පුරනය වී ඒවා ස්වයංක්රීයව සැපයීමට **සක්රිය සන්දර්භයට** ඉඩ දෙන්න:

```bash
omniroute connect 192.168.0.15        # සීමා කළ ටෝකනයක් නිකුත් කර, සන්දර්භය ගබඩා කරයි
omniroute setup-codex                 # ← දැන් දුරස්ථ නාමාවලිය භාවිත කරයි
omniroute setup-opencode              # ← මෙයත් එසේමයි
omniroute launch                      # ← දුරස්ථ පද්ධතියට එරෙහිව Claude Code
```

සන්දර්භ, විෂයපථ සහ ටෝකන කළමනාකරණය සඳහා [දුරස්ථ ප්රකාරය](./REMOTE-MODE.md) බලන්න.

---

## 5dive නියෝජිත සමූහ

[5dive](https://5dive.ai) දිගු කාලයක් ක්රියාත්මක වන කේතකරණ නියෝජිත සමූහයක් ධාවනය කරයි; ඒ සෑම එකක්ම තමන්ගේම Unix පරිශීලකයා යටතේ ඇති systemd ඒකකයකි. එයම කේතකරණ CLI එකක් නොවන බැවින්, `omniroute run` මඟින් දියත් කිරීමට කිසිවක් නොමැත — `5dive` යනු **වින්යාස කිරීමට පමණක්** ඇති ඉලක්කයකි.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

ආකාර දෙකම එක් 5dive **සත්යාපන පැතිකඩක්** ලියන අතර, එම පැතිකඩට බැඳී ඇති සෑම `claude` ස්ථානයක්ම ඉන්පසු OmniRoute සමඟ සන්නිවේදනය කරයි. මෙම ඉලක්කයට විශේෂිත කරුණු තුනක් ඇත:

- **එය සමූහ සත්කාරකය මත root ලෙස ක්රියාත්මක වේ.** 5dive හි ක්රියාපද දේශීය systemd ඒකක සහ root සතු තත්ත්ව නාමාවලියක් මත ක්රියා කරයි; දුරස්ථ ප්රකාරයක් නොමැත. එය දැනටමත් root ලෙස ක්රියාත්මක නොවේ නම් ක්රියාපටිපාටිය `sudo` හරහා නැවත ක්රියාත්මක වේ (`--no-sudo` එය අක්රිය කර ඒ වෙනුවට විධානය මුද්රණය කරයි).
- **අන්ත ලක්ෂ්යය loopback එකක් නොවේ නම් එය `https://` විය යුතුය.** සෑම ඉල්ලීමකදීම නියෝජිතයාගේ API යතුර එම URL එක හරහා ගමන් කරන අතර, යන්ත්රයෙන් පිටත ඇති සංකේතනය නොකළ අන්ත ලක්ෂ්යයක් 5dive ප්රතික්ෂේප කරයි. පුද්ගලික LAN ලිපිනයක් වුවද මෙයට ව්යතිරේකයක් නොවේ.
- **එක් එක් ස්ථානයේම ආකෘති ඇමුණුමට පැතිකඩට වඩා ප්රමුඛතාව ඇත.** පැතිකඩෙහි `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL` අඩංගු වුවත්, සම්මත ආකෘති හැඳුනුමකට තවමත් ඇමුණුම් කර ඇති ස්ථානයක් එහි පළමු වාරයේදීම _"තෝරාගත් ආකෘතියේ ගැටලුවක් ඇත"_ යන පණිවිඩය සමඟ අසාර්ථක වේ. ස්ථාන ද ඇමුණුම් කිරීමට `--agent <name>` (නැවත නැවත භාවිත කළ හැක) ලබා දෙන්න; ඔබ එසේ නොකරන විට ක්රියාපටිපාටිය අදාළ විධානය මුද්රණය කරයි.

API යතුර 5dive වෙත **stdin** හරහා (`--api-key=-`) ලබාදෙන බැවින්, එය කිසිවිටෙකත් `ps` ප්රතිදානයේ නොපෙන්වයි.

පැතිකඩ තනි ආකෘතියකට නොව OmniRoute **සංයෝජනයකට** යොමු කිරීමෙන් සමූහයට සැපයුම්කරු අසාර්ථක වීමකදී මාරුවීමේ හැකියාව ලැබේ: [#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578) හි සටහන් කර ඇති ධාවනය අතරතුර ප්රධාන අන්ත ලක්ෂ්යය සම්පූර්ණයෙන්ම බිඳ වැටුණු විට, නියෝජිතයා ඉතිරි පියවර උපස්ථය මත සම්පූර්ණ කළ අතර බිඳ වැටීම පරිශීලකයාට කිසිවිටෙකත් නිරාවරණය නොකළේය.

---

## මූලික URL සම්මුතීන් (`/v1` අවශ්ය මෙවලම්)

OmniRoute විසින් OpenAI අතුරුමුහුණත `/v1` හිද, Anthropic අතුරුමුහුණත මූලයේද,
ස්වදේශීය Gemini අතුරුමුහුණතක් `/v1beta` හිද සපයයි. සෑම අනුකලනයක්ම එහි
මෙවලම අපේක්ෂා කරන ආකෘතියට සම්බන්ධ කර ඇත (විධාන මූලාශ්රය තුළ සත්යාපනය කර ඇත):

| අනුකලනය                                                                    | ලියන මූලික URL එක | `/v1`?                                               |
| -------------------------------------------------------------------------- | ----------------- | ---------------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | මූලය              | නැත — Cline විසින් `/v1/chat/completions` එක් කරයි   |
| `setup-goose` (`OPENAI_HOST`)                                              | මූලය              | නැත — Goose විසින් මාර්ගය එක් කරයි                   |
| `setup-aider` (`OPENAI_API_BASE`)                                          | මූලය              | නැත — LiteLLM විසින් `/v1/chat/completions` එක් කරයි |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | `/v1` සමඟ         | ඔව්                                                  |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | මූලය              | නැත — Claude Code විසින් `/v1/messages` එක් කරයි     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | `/v1` සමඟ         | ඔව්                                                  |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | `/v1` සමඟ         | ඔව්                                                  |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | මූලය              | නැත — SDK එක `/v1beta/models/…` එක් කරයි             |
| `setup-5dive` (සත්යාපන පැතිකඩෙහි `ANTHROPIC_BASE_URL`)                     | මූලය              | නැත — Claude Code විසින් `/v1/messages` එක් කරයි     |

---

## යාවත්කාලීන කිරීමේදී ස්වදේශීය පරායත්තතා රඳවා ගැනීම: `--include=optional`

ඔබ `omniroute update` මඟින් යාවත්කාලීන කරන විට (තහවුරු කිරීමෙන් පසු, හෝ `--apply` සමඟ),
OmniRoute විසින් ස්ථාපනය තුළ `--include=optional` පෙරනිමියෙන් ඇතුළත් කර ක්රියාත්මක කරයි:

```bash
npm install -g omniroute@latest --include=optional
```

මෙය ඔබ `omniroute update` වෙත ලබා දෙන ධජයක් **නොවේ** — යාවත්කාලීනකාරකය විසින් එය
සැමවිටම යොදනු ලැබේ. ඔබගේ npm වින්යාසයෙහි `omit=optional` සකසා තිබුණද
`optionalDependencies` (`better-sqlite3`, `keytar`, `tls-client`, LLMLingua SLM තොගය)
යාවත්කාලීනයෙන් පසුවත් පවතින බව මෙය සහතික කරයි; එසේ නොවුණහොත් ස්වදේශීය SQLite
ධාවකය සහ OS යතුරු-වළලු බැඳීම නිහඬව ඉවත් වනු ඇත. යෙදීමකින් තොරව නිශ්චිත විධානය පෙරදසුන් කිරීමට:

```bash
omniroute update --dry-run
# [වියළි ධාවනය] ක්රියාත්මක කිරීමට තිබුණේ: npm install -g omniroute@latest --include=optional
```

වෙනත් `omniroute update` ධජ (මූලාශ්රය තුළ සත්යාපනය කර ඇත): `--check` (යල්පැන ඇත්නම්
පිටවීමේ කේතය 1), `--apply` (විමසීමකින් තොරව ස්ථාපනය කරන්න), `--changelog`, `--no-backup`,
`--yes`.

---

## `omniroute run gemini` හරහා Google Gemini CLI

`@google/gemini-cli` 0.50.0 සමඟ ගිවිසුම සත්යාපනය කර ඇත: CLI විසින්
`GOOGLE_GEMINI_BASE_URL` පිළිපදින අතර එයට එරෙහිව
`POST /v1beta/models/<model>:generateContent` (සහ `:streamGenerateContent?alt=sse`)
නිකුත් කරයි — එය හරියටම OmniRoute හි ස්වදේශීය Gemini අතුරුමුහුණතයි (`/v1beta`).
`omniroute run gemini` එය ස්වයංක්රීයව සම්බන්ධ කරයි:

- `GOOGLE_GEMINI_BASE_URL` → සක්රිය OmniRoute මූලික URL එක (මූලය, `/v1` නොමැතිව);
- `GEMINI_API_KEY` → විසඳාගත් OmniRoute අක්තපත්රය (විකල්පය/පරිසරය/සන්දර්භය);
- `gemini-api-key` සත්යාපනය තෝරන `.gemini/settings.json` සහිත **තාවකාලික හුදකලා
  `GEMINI_CLI_HOME` එකක්**, එමඟින් ගබඩා කර ඇති Google OAuth සැසියක් (Code Assist)
  කිසිවිටෙක OmniRoute වෙත යොමු කළ දියත් කිරීම අභිබවා නොයයි — පිටවීමෙන් පසු ඉවත් කරනු ලැබේ;
- **පරිසර සනීපාරක්ෂාව**: උප-ක්රියාවලියේ පරිසරයෙන් `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` සහ `GOOGLE_GENAI_USE_GCA` (මේවා සත්යාපනය
  Vertex/Code Assist වෙත යළි යොමු කරනු ඇත) ඉවත් කරන අතර,
  අමතර ආරක්ෂිත විකල්පයක් ලෙස `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` සකසයි —
  අනෙකුත් `run` ඉලක්කවලටද ඒවාටම අදාළ ගැටෙන විචල්යයන් සඳහා එකම
  සැලකීම ලැබේ;
- `--provider`/`--model` වෙතින් `--model <id>` ඇතුළු කිරීම.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Gemini හි වැඩබිම්-විශ්වාස ආරක්ෂකය තිර රහිත ප්රකාරයේදීද තවමත් අදාළ වේ — ඔබම
`--skip-trust` ලබා දෙන්න (හෝ අන්තර්ක්රියාකාරීව නාමාවලිය විශ්වාස කරන්න); දියත්කාරකය
හිතාමතාම එය මඟ නොහරියි. මෙම දියත්කාරකය **ACP ලියාපදිංචියෙන්**
(`src/lib/acp/registry.ts`, `gemini --acp`) වෙනස් වන අතර, එය
`/dashboard/acp-agents` සඳහා නියෝජිත-ප්රොටෝකෝල අනුකලනය ලෙස දිගටම පවතී.

---

## සත්ය smoke sweep පරීක්ෂාව (අභිමතයෙන් සක්රිය කළ හැකි)

නිර්ණායක launch-plan ප්රතිගමන පරීක්ෂණ CI තුළ ධාවනය වේ (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). සත්ය OmniRoute සේවාදායකයකට එරෙහිව සත්ය
binary ගොනු වලංගු කිරීමට, අභිමතයෙන් සක්රිය කළ හැකි harness එකක්
`tests/integration/upstream-cli-smoke.int.test.ts` හි ඇත. එය කිසිවිටෙක ස්වයංක්රීයව
ධාවනය නොවේ (`RUN_CLI_SMOKE=1` නොමැති නම් සෑම උප-පරීක්ෂණයක්ම මඟ හරියි), අක්තපත්රය env-var
NAME එක මඟින් යවයි (කිසිවිටෙක එහි අගය මඟින් නොවේ), වාර්තා කළ ඕනෑම ප්රතිදානයකින්
යතුරු ආකාරයේ තන්තු වසන් කරයි, binary ගොනුව ස්ථාපනය කර නොමැති ඉලක්ක මඟ හරියි, සහ
අසාර්ථකවීම් හුදු boolean අගයක් වෙනුවට auth / upstream / config ලෙස වර්ගීකරණය කරයි:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

විකල්ප: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` මඟින් පරීක්ෂාව සීමා කරයි;
`OMNIROUTE_SMOKE_TIMEOUT_MS` මඟින් එක් ඉලක්කයකට ඇති 120s කල් ඉකුත්වීම ප්රතිස්ථාපනය කරයි.

---

## මෙයද බලන්න

- [Claude Code වින්යාසය](./CLAUDE-CODE-CONFIGURATION.md) — වඩාත් ගැඹුරු Claude Code මාර්ගෝපදේශය
- [Codex CLI වින්යාසය](./CODEX-CLI-CONFIGURATION.md) — එක් වරක් පමණක් සිදු කරන `[model_providers.omniroute]` මූලික සැකසුම
- [දුරස්ථ ප්රකාරය](./REMOTE-MODE.md) — සන්දර්භ, විෂයපථයට සීමා කළ ප්රවේශ ටෝකන සහ දුරස්ථ සේවාදායකයක් මෙහෙයවීම
- [CLI මෙවලම් යොමුව](../reference/CLI-TOOLS.md) — සහාය දක්වන මෙවලම් සහ dashboard පිටු පිළිබඳ සම්පූර්ණ නාමාවලිය
- [සැකසුම් මාර්ගෝපදේශය](./SETUP_GUIDE.md) — ස්ථාපන ක්රම සහ පළමු ධාවනයේ හඳුන්වාදීම
