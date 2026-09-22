# 📖 Setup Guide — OmniRoute (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> OmniRoute සඳහා සම්පූර්ණ පිහිටුවීම් යොමුව. ඉක්මන් අනුවාදය සඳහා, [README හි ඉක්මන් ආරම්භය](../README.md#-quick-start) බලන්න.

## පටුන

- [ස්ථාපන ක්රම](#install-methods)
- [CLI මෙවලම් වින්යාසය](#cli-tool-configuration)
- [ප්රොටෝකෝල පිහිටුවීම (MCP + A2A)](#protocol-setup-mcp--a2a)
- [කාල සීමා වින්යාසය](#timeout-configuration)
- [වෙන් කළ පෝට් ප්රකාරය](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [අස්ථාපනය කිරීම](#uninstalling)

---

## ස්ථාපන ක්රම

### npm (නිර්දේශිතයි)

```bash
npm install -g omniroute
omniroute
```

උපකරණ පුවරුව `http://localhost:20128` හි විවෘත වන අතර API මූලික URL එක `http://localhost:20128/v1` වේ.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **pnpm පරිශීලකයින්:** `better-sqlite3` සහ `@swc/core` සඳහා ස්වදේශීය ගොඩනැඟීම් ස්ක්රිප්ට් සක්රීය කිරීමට `--allow-build` ධජය අවශ්ය වේ. pnpm v11 හි ගෝලීය ස්ථාපන සඳහා `pnpm approve-builds -g` විධානය සහාය නොදක්වයි.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

[AUR පැකේජය](https://aur.archlinux.org/packages/omniroute-bin) OmniRoute ස්ථාපනය කර systemd පරිශීලක සේවාවක් සපයයි.

### මූලාශ්රයෙන්

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Windows සටහන:** පැරණි `%USERPROFILE%\.omniroute` නාමාවලිය නොමැති විට, පෙරනිමියෙන් OmniRoute `%APPDATA%\omniroute` භාවිත කරයි. වෙනත් දත්ත-නාමාවලි ස්ථානයක් තෝරා ගැනීමට `DATA_DIR` සකසන්න.

> **සටහන:** පළමු ධාවනයේදී `npm install` විසින් `.env.example` වෙතින් `.env` ස්වයංක්රීයව ජනනය කරයි. පසුව සිදුකරන ස්ථාපන පවතින `.env` ගොනුවක් උඩින් නොලියන බැවින් අභිරුචිකරණ සුරැකේ. නැවත ආරම්භක අගයන් යෙදීමට, නැවත ධාවනය කිරීමට පෙර `.env` මකන්න.

### Docker

Compose පැතිකඩ සහ Caddy HTTPS ඇතුළු සම්පූර්ණ Docker පිහිටුවීම සඳහා [Docker මාර්ගෝපදේශය](./DOCKER_GUIDE.md) බලන්න.

### ඩෙස්ක්ටොප් යෙදුම (Electron)

OmniRoute සමඟ Electron 41 + electron-builder 26.10 මත ගොඩනඟන ලද ඩෙස්ක්ටොප් ආවරණයක් නිකුත් කෙරේ. ලබාගත හැකි ස්ක්රිප්ට් (වැඩබිමේ මූලය):

```bash
npm run electron:dev          # උණුසුම්-නැවත පූරණය සමඟ ඩෙස්ක්ටොප් එක ධාවනය කරන්න
npm run electron:build        # වත්මන් OS සඳහා ගොඩනඟන්න (ස්වයංක්රීයව හඳුනා ගැනේ)
npm run electron:build:win    # Windows ස්ථාපකය (NSIS + ගෙන යා හැකි)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # ඇසුරුම් කළ ගොඩනැඟීම දුම්-පරීක්ෂා කරන්න
```

ඩෙස්ක්ටොප් ස්ථාපකවල නිකුතු GitHub Releases වෙත අමුණා ඇත. සම්පූර්ණ Electron ගැඹුරු විස්තරය (අත්සන් කිරීම, IPC සම්බන්ධකය, බෙදාහැරීම්) සඳහා, [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) බලන්න _(පසු අදියරකදී සාදන ලදී)_.

### හිස රහිත සේවාදායකය (CI/ස්වයංක්රීයකරණය)

පරිශීලක මැදිහත්වීමක් නොමැති පිහිටුවීම් සඳහා (Docker, Kubernetes, CI), භාවිත කරන්න:

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

පරිසර විචල්ය (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET`, ආදිය) සමඟ ඒකාබද්ධ කළ විට, මෙය සම්පූර්ණයෙන්ම ස්ක්රිප්ට් කළ හැකි OmniRoute අවස්ථාවක් ක්රියාත්මක කිරීමට ඔබට ඉඩ දෙයි.

### CLI විකල්ප

| විධානය                  | විස්තරය                                                                                                        |
| ----------------------- | -------------------------------------------------------------------------------------------------------------- |
| `omniroute`             | සේවාදායකය ආරම්භ කරන්න (`PORT=20128`, API සහ උපකරණ පුවරුව එකම පෝට් එකේ)                                         |
| `omniroute setup`       | මුරපදය සහ පළමු සැපයුම්කරු සඳහා මඟපෙන්වන CLI ආරම්භක සැකසුම                                                      |
| `omniroute doctor`      | සේවාදායකය ආරම්භ නොකර දේශීය සෞඛ්ය පරීක්ෂණ ධාවනය කරන්න                                                           |
| `omniroute providers`   | CLI වෙතින් සැපයුම්කරුවන් සොයන්න, ලැයිස්තුගත කරන්න, වලංගු කරන්න සහ පරීක්ෂා කරන්න                                |
| `omniroute config`      | CLI මෙවලම් වින්යාසය — වින්යාස ලැයිස්තුගත කරන්න, ලබාගන්න, සකසන්න සහ වලංගු කරන්න                                 |
| `omniroute status`      | නොබැඳි තත්ත්ව උපකරණ පුවරුව — අනුවාදය, DB, මෙවලම්, වින්යාසය                                                     |
| `omniroute logs`        | API වෙතින් භාවිත ලොග් ප්රවාහ කරන්න (`--follow` සඳහා සහාය දක්වයි)                                               |
| `omniroute update`      | OmniRoute යාවත්කාලීන පරීක්ෂා කරන්න හෝ යොදන්න                                                                   |
| `omniroute provider`    | සැපයුම්කරු සම්බන්ධතා කළමනාකරණය කරන්න — එක් කරන්න, ලැයිස්තුගත කරන්න, ඉවත් කරන්න, පරීක්ෂා කරන්න, පෙරනිමිය සකසන්න |
| `omniroute --port 3000` | ප්රධාන/API පෝට් එක 3000 ලෙස සකසන්න                                                                             |
| `omniroute --mcp`       | MCP සේවාදායකය ආරම්භ කරන්න (stdio ප්රවාහනය)                                                                     |
| `omniroute --no-open`   | බ්රවුසරය ස්වයංක්රීයව විවෘත නොකරන්න                                                                             |
| `omniroute --help`      | උදව් පෙන්වන්න                                                                                                  |

හිස රහිත පිහිටුවීම ධජ හෝ පරිසර විචල්ය මඟින් ස්ක්රිප්ට් කළ හැකිය:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

උපකරණ පුවරුව විවෘත නොකර දේශීය රෝග විනිශ්චය ධාවනය කරන්න:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

උපකරණ පුවරුව විවෘත නොකර SSH හෝ ස්ක්රිප්ට් වෙතින් සැපයුම්කරුවන් කළමනාකරණය කරන්න:

```bash
omniroute providers available
omniroute providers available --search openai
omniroute providers available --category api-key
omniroute providers list
omniroute providers test <id-or-name>
omniroute providers test-all
omniroute providers validate
```

---

## CLI මෙවලම් වින්යාසය

### 1) සැපයුම්කරුවන් සම්බන්ධ කර API යතුරක් සාදන්න

1. Dashboard → `Providers` විවෘත කර අවම වශයෙන් එක් සැපයුම්කරුවෙකු හෝ සම්බන්ධ කරන්න (OAuth හෝ API යතුර).
2. Dashboard → `Endpoints` විවෘත කර API යතුරක් සාදන්න.
3. (විකල්ප) Dashboard → `Combos` විවෘත කර ඔබේ විකල්ප දාමය සකසන්න.

### 2) ඔබේ කේතකරණ මෙවලම යොමු කරන්න

```txt
මූලික URL: http://localhost:20128/v1
API යතුර:  [Endpoint පිටුවෙන් පිටපත් කරන්න]
මාදිලිය:    if/qwen3.8-max-preview (හෝ ඕනෑම සැපයුම්කරු/මාදිලි උපසර්ගයක්)
```

ඔබේ සංස්කාරකයට `Authorization: Bearer ...` යැවිය නොහැකි නම්, ඒ වෙනුවට ටෝකනගත අනුකූලතා මූලික URL එක භාවිත කරන්න:

```txt
මූලික URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/
මාදිලි URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/models
සංවාද URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
Ollama ටැග් URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode සහ OpenAI-අනුකූල SDK සමඟ ක්රියා කරයි.

#### `setup-*` සමඟ ස්වයංක්රීයව වින්යාස කරන්න

මූලික URL එක සහ යතුර අතින් ඇලවීම වෙනුවට, සජීවී මාදිලි නාමාවලියෙන් එක් එක් මෙවලම සඳහා එයටම අදාළ වින්යාසය ලිවීමට OmniRoute වෙත ඉඩ දෙන්න. එක් මෙවලමකට එක් විධානයක්:

```bash
omniroute setup-codex        # ~/.codex/<name>.config.toml පැතිකඩ
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (OpenAI-අනුකූල)
omniroute setup-cline        # Cline CLI + VS Code දිගුවේ සැකසුම්
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # Cursor යෙදුම තුළ සිදු කළ යුතු පියවර මුද්රණය කරයි
omniroute setup-roo          # Roo Code ආයාතය + autoImport දර්ශකය
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

**දුරස්ථ** OmniRoute එකකට එරෙහිව දේශීය මෙවලමක් වින්යාස කිරීමට ඒ සෑම එකක්ම `--remote <url> --api-key <key>` පිළිගන්නා අතර, පෙරදසුනක් සඳහා `--dry-run` ද පිළිගනී. නිවැරදි env අගයන් ඇතුළත් කර, කිසිදු වින්යාසයක් නොලියා CLI එකක් දියත් කිරීමට සාමාන්ය දියත්කරණය වන `omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini) භාවිත කරන්න; පැරණි එක් එක් මෙවලමට වෙන් වූ දියත්කරණ වන `omniroute launch` (Claude Code) සහ `omniroute launch-codex` (Codex) තවදුරටත් ලබා ගත හැක.

සම්පූර්ණ වගුව සඳහා (එක් එක් විධානය ලියන දේ, සියලුම ධජ, දේශීය හා දුරස්ථ භාවිතය, මූලික-URL `/v1` සම්මුති), **[CLI ඒකාබද්ධ කිරීම්](./CLI-INTEGRATIONS.md)** බලන්න.

එක් එක් මෙවලම සඳහා සවිස්තරාත්මක වින්යාසය (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot සහ තවත් දෑ) සඳහා, කැපවූ **[CLI මෙවලම් මාර්ගෝපදේශය](../reference/CLI-TOOLS.md)** බලන්න.

---

## ප්රොටෝකෝල සැකසුම (MCP + A2A)

### MCP සැකසුම (Model Context Protocol)

stdio ප්රකාරයෙන් MCP ප්රවාහනය ආරම්භ කරන්න:

```bash
omniroute --mcp
```

නිර්දේශිත වලංගුකරණ ප්රවාහය:

```bash
# 1. MCP සේවාදායකය ආරම්භ කරන්න
omniroute --mcp

# 2. ඔබේ MCP සේවාලාභියා වෙතින්, පහත ඒවා අමතන්න:
omniroute_get_health        # පද්ධතියේ සෞඛ්ය තත්ත්වය ආපසු ලබා දිය යුතුය
omniroute_list_combos       # සක්රිය combos ආපසු ලබා දිය යුතුය

# 3. නැතහොත් සම්පූර්ණ E2E කට්ටලය ධාවනය කරන්න:
npm run test:protocols:e2e
```

#### MCP සේවාලාභී වින්යාසය

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

ඔබේ MCP සැකසුම්වලට එක් කරන්න:

```json
{
  "mcpServers": {
    "omniroute": {
      "command": "omniroute",
      "args": ["--mcp"],
      "env": {}
    }
  }
}
```

**සම්පූර්ණ MCP ලේඛනගත කිරීම:** [MCP Server README](../../open-sse/mcp-server/README.md) — මෙවලම් 110ක්, IDE වින්යාස, Python/TS/Go සේවාලාභීන්.

### A2A සැකසුම (Agent-to-Agent Protocol)

Agent Card එක සත්යාපනය කරන්න:

```bash
curl http://localhost:20128/.well-known/agent.json
```

කාර්යයක් යවන්න:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**සම්පූර්ණ A2A ලේඛනගත කිරීම:** [A2A Server README](../../src/lib/a2a/README.md) — JSON-RPC 2.0, කුසලතා, ප්රවාහනය, කාර්ය ජීවන චක්රය.

---

## කල් ඉකුත්වීමේ වින්යාසය

### මූලික කල් ඉකුත්වීම්

බොහෝ යෙදවීම් සඳහා, ඔබට අවශ්ය වන්නේ මෙම විචල්ය දෙක පමණි:

| විචල්යය                  | පෙරනිමිය                            | අරමුණ                                                                                                                                                            |
| ------------------------ | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                            | upstream ප්රතිචාරය ආරම්භ වීමේ කල් ඉකුත්වීම, සැඟවුණු Undici කල් ඉකුත්වීම්, TLS fingerprint ඉල්ලීම් සහ API bridge ඉල්ලීම්/proxy කල් ඉකුත්වීම් සඳහා හවුල් මූලික අගය |
| `STREAM_IDLE_TIMEOUT_MS` | `REQUEST_TIMEOUT_MS` වෙතින් උරුම වේ | OmniRoute විසින් SSE stream එක නවතා දැමීමට පෙර streaming chunk අතර උපරිම කාල පරතරය                                                                               |

පසුගාමී අනුකූලතාව සුරැකේ: පවතින `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` සහ අනෙකුත් එක් එක් ස්තරයට අදාළ කල් ඉකුත්වීමේ විචල්ය තවමත් ක්රියා කරන අතර හවුල් මූලික අගය අභිබවා යයි.

### සැපයුම්කරුට විශේෂිත සටහන්

Claude Code-අනුකූල upstream (`anthropic-compatible-cc-*`) සඳහා, සැපයුම්කරුගේ පැත්තේ කියවීම් කල් ඉකුත්වීම් ඔබගේ env වින්යාසය සමඟ සමපාතව තබා ගැනීමට OmniRoute විසින් නිරාකරණය කළ fetch කල් ඉකුත්වීමෙන් පිටතට යවන `X-Stainless-Timeout` header එක ව්යුත්පන්න කරයි.

තෙවන පාර්ශ්වීය Claude Code-අනුකූල reverse proxy සඳහා, OmniRoute පෙරනිමි `anthropic-beta` කට්ටලය සීමාකාරීව තබා ගන්නා අතර, `Client Cache Control` සැකසුම `Auto` ලෙස තබා ඇති විට, client විසින් සපයන ලද `cache_control` සලකුණු පමණක් ඉදිරියට යවයි. upstream එකට සංස්කරණය කළ Claude thinking stream විශේෂයෙන් අවශ්ය වන විට පමණක් එක් එක් සම්බන්ධතාවට අදාළ "Enable redact-thinking beta" ටොගලය සක්රීය කරන්න.

### උසස් කල් ඉකුත්වීම් අතික්රමණ

| විචල්යය                                  | පෙරනිමිය                                        | අරමුණ                                                                           |
| ---------------------------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | `REQUEST_TIMEOUT_MS` වෙතින් උරුම වේ             | ප්රතිචාර header ලැබෙන තෙක් භාවිත කරන upstream ප්රතිචාරය ආරම්භ වීමේ කල් ඉකුත්වීම |
| `FETCH_HEADERS_TIMEOUT_MS`               | `FETCH_TIMEOUT_MS` වෙතින් උරුම වේ               | upstream ප්රතිචාර header ලැබීම සඳහා වන Undici කාල සීමාව                         |
| `FETCH_BODY_TIMEOUT_MS`                  | `FETCH_TIMEOUT_MS` වෙතින් උරුම වේ               | upstream body chunk අතර Undici කාල සීමාව (`0` එය අක්රීය කරයි)                   |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                         | Undici TCP සම්බන්ධතා කල් ඉකුත්වීම                                               |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                          | Undici අක්රීය keep-alive socket කල් ඉකුත්වීම                                    |
| `TLS_CLIENT_TIMEOUT_MS`                  | `FETCH_TIMEOUT_MS` වෙතින් උරුම වේ               | `wreq-js` හරහා සිදු කරන TLS fingerprint ඉල්ලීම් සඳහා කල් ඉකුත්වීම               |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | `REQUEST_TIMEOUT_MS` හෝ `600000` වෙතින් උරුම වේ | API port එකෙන් dashboard port එකට `/v1` proxy ඉදිරියට යැවීම සඳහා කල් ඉකුත්වීම   |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)`      | API bridge server එකේ පැමිණෙන ඉල්ලීම් සඳහා කල් ඉකුත්වීම                         |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                         | API bridge server එකේ පැමිණෙන header සඳහා කල් ඉකුත්වීම                          |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                          | API bridge server එකේ keep-alive කල් ඉකුත්වීම                                   |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                             | API bridge server එකේ socket අක්රීයතා කල් ඉකුත්වීම (`0` එය අක්රීය කරයි)         |

> **සටහන:** streaming ඉල්ලීම් සඳහා, `FETCH_TIMEOUT_MS` ආවරණය කරන්නේ සම්බන්ධතාව පිහිටුවීම / පළමු upstream ප්රතිචාරය සඳහා රැඳී සිටීම පමණි. stream එක සක්රීය වූ පසු, OmniRoute එය නවතා දමන්නේ සැබෑ අවහිරතාවක් (`STREAM_IDLE_TIMEOUT_MS`) හෝ Undici body අක්රීයතාවක් (`FETCH_BODY_TIMEOUT_MS`) ඇති වූ විට පමණි.

### Reverse Proxy අනුකූලතාව

ඔබ OmniRoute, Nginx, Caddy, Cloudflare හෝ වෙනත් reverse proxy එකක් පිටුපස ධාවනය කරන්නේ නම්, proxy කල් ඉකුත්වීම්ද ඔබගේ OmniRoute stream/fetch කල් ඉකුත්වීම්වලට වඩා වැඩි බව තහවුරු කර ගන්න.

---

## වෙන් කළ පෝට් ප්රකාරය

උසස් අවස්ථා සඳහා (ප්රතිලෝම ප්රොක්සි, කන්ටේනර් ජාලකරණය) API සහ Dashboard වෙන වෙනම පෝට් මත ධාවනය කරන්න:

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

---

## Void Linux (xbps-src) අච්චුව

Void Linux පරිශීලකයින්ට `xbps-src` භාවිතයෙන් ස්වදේශීය පැකේජයක් ගොඩනැගිය හැක. මෙම කොටස `srcpkgs/omniroute/template` ලෙස සුරකින්න:

```bash
# 'omniroute' සඳහා අච්චු ගොනුව
pkgname=omniroute
version=3.8.0
revision=1
hostmakedepends="nodejs python3 make"
depends="openssl"
short_desc="බහු LLM සපයන්නන් සඳහා බුද්ධිමත් මාර්ගගත කිරීම සහිත විශ්වීය AI ද්වාරය"
maintainer="zenobit <zenobit@disroot.org>"
license="MIT"
homepage="https://github.com/diegosouzapw/OmniRoute"
distfiles="https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz"
# සෑම නිකුතුවක් සඳහාම පහත විධානයෙන් checksum නැවත ජනනය කරන්න:
#   curl -L -o /tmp/omniroute.tar.gz "https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz" && sha256sum /tmp/omniroute.tar.gz
checksum=PLACEHOLDER_REGENERATE_PER_RELEASE
system_accounts="_omniroute"
omniroute_homedir="/var/lib/omniroute"
export NODE_ENV=production
export npm_config_engine_strict=false
export npm_config_loglevel=error
export npm_config_fund=false
export npm_config_audit=false

do_build() {
	local _gyp_arch
	case "$XBPS_TARGET_MACHINE" in
		aarch64*) _gyp_arch=arm64 ;;
		armv7*|armv6*) _gyp_arch=arm ;;
		i686*) _gyp_arch=ia32 ;;
		*) _gyp_arch=x64 ;;
	esac

	NODE_ENV=development npm ci --ignore-scripts
	npm run build
	cp -r .next/static .next/standalone/.next/static
	[ -d public ] && cp -r public .next/standalone/public || true

	local _node_gyp=/usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js
	(cd node_modules/better-sqlite3 && node "$_node_gyp" rebuild --arch="$_gyp_arch")

	local _bs3_release=.next/standalone/node_modules/better-sqlite3/build/Release
	mkdir -p "$_bs3_release"
	cp node_modules/better-sqlite3/build/Release/better_sqlite3.node "$_bs3_release/"

	rm -rf .next/standalone/node_modules/@img

	for _mod in pino-abstract-transport split2 process-warning; do
		cp -r "node_modules/$_mod" .next/standalone/node_modules/
	done
}

do_check() {
	npm run test:unit
}

do_install() {
	vmkdir usr/lib/omniroute/.next
	vcopy .next/standalone/. usr/lib/omniroute/.next/standalone

	for _d in \
		.next/standalone/.next/server/app/dashboard \
		.next/standalone/.next/server/app/dashboard/settings \
		.next/standalone/.next/server/app/dashboard/providers; do
		touch "${DESTDIR}/usr/lib/omniroute/${_d}/.keep"
	done

	cat > "${WRKDIR}/omniroute" <<'EOF'
#!/bin/sh
export PORT="${PORT:-20128}"
export DATA_DIR="${DATA_DIR:-${XDG_DATA_HOME:-${HOME}/.local/share}/omniroute}"
export APP_LOG_TO_FILE="${APP_LOG_TO_FILE:-false}"
mkdir -p "${DATA_DIR}"
exec node /usr/lib/omniroute/.next/standalone/server.js "$@"
EOF
	vbin "${WRKDIR}/omniroute"
}

post_install() {
	vlicense LICENSE
}
```

---

## අස්ථාපනය කිරීම

| විධානය                   | ක්රියාව                                                                                        |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| `npm run uninstall`      | පද්ධති යෙදුම ඉවත් කරන නමුත් `~/.omniroute` තුළ ඇති **ඔබගේ දත්ත සමුදාය සහ වින්යාසයන් තබා ගනී**. |
| `npm run uninstall:full` | යෙදුම ඉවත් කරන අතරම **සියලුම වින්යාසයන්, යතුරු සහ දත්ත සමුදායන් ස්ථිරව මකා දමයි**.             |

> සියලු ක්රම සඳහා සවිස්තරාත්මක අස්ථාපන උපදෙස් බැලීමට, [UNINSTALL.md](./UNINSTALL.md) බලන්න.
