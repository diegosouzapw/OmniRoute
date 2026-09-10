---
title: "CLI Entegrasyonları — Herhangi bir kodlama CLI'ını OmniRoute'a Bağlayın"
version: 3.8.50
lastUpdated: 2026-08-23
---

# CLI Entegrasyonları (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute, kodlama CLI araçlarını (Codex, Claude Code, OpenCode, Cline vb.) arka uç olarak OmniRoute'u kullanacak şekilde yapılandıran bir dizi `setup-*` komutu sunar — böylece araç **tek bir** uç nokta ile konuşur ve OmniRoute otomatik geri dönüş ile doğru sağlayıcıya yönlendirir.

Ayrıca hiçbir yapılandırma dosyası yazmadan doğru ortam değişkenleriyle `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` veya `gemini` başlatan genel bir çalıştırıcı vardır: `omniroute run <target>`.

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

---

## Ana Kurulum Tablosu

| Komut                      | Araç                         | Ne Yazar                                                                                                               | Temel Bayraklar                                                                                                                            | Yerel vs Uzak |
| -------------------------- | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI             | `~/.codex/<name>.config.toml` — uyumlu model başına bir profil (`codex --profile <name>`)                              | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Her ikisi de  |
| `omniroute setup-claude`   | Claude Code                  | `~/.claude/profiles/<name>/settings.json` — eşleşen model başına bir profil (`CLAUDE_CONFIG_DIR`)                      | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Her ikisi de  |
| `omniroute setup-opencode` | OpenCode (openai-compatible) | `~/.config/opencode/opencode.json` — katalogdaki her modelle `omniroute` sağlayıcısı (`opencode -m omniroute/<model>`) | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Her ikisi de  |
| `omniroute setup-cline`    | Cline                        | `~/.cline/data/{globalState,secrets}.json` (CLI modu) + VS Code eklenti ayarlarını yazdırır                            | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Her ikisi de  |
| `omniroute setup-kilo`     | Kilo Code                    | `~/.local/share/kilo/auth.json` (CLI) + varsa VS Code `settings.json` içine `kilocode.*` birleştirir                   | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Her ikisi de  |
| `omniroute setup-continue` | Continue / `cn` CLI          | `~/.continue/config.yaml` — `provider: openai` modelleri, anahtar `${{ secrets.OMNIROUTE_API_KEY }}` üzerinden         | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Her ikisi de  |
| `omniroute setup-cursor`   | Cursor                       | Hiçbir dosya yazmaz — uygulama içi adımları konsola yazdırır                                                           | `--remote` `--api-key` `--only` `--port`                                                                                                   | Her ikisi de  |
| `omniroute setup-roo`      | Roo Code                     | `~/.omniroute/roo-settings.json` (içe aktarma belgesi)                                                                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Her ikisi de  |
| `omniroute setup-goose`    | Goose                        | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`)                                           | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Her ikisi de  |
| `omniroute setup-aider`    | Aider                        | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`)                                                         | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Her ikisi de  |
| `omniroute setup-qwen`     | Qwen Code                    | `~/.qwen/settings.json` — V4 `modelProviders.openai` dizisi                                                            | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Her ikisi de  |
| `omniroute run <target>`   | Doğrudan Başlatma (Genel)    | Dosya yazmaz — doğru ortam değişkenleriyle hedef aracı doğrudan başlatır                                               | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Her ikisi de  |
| `omniroute launch`         | Claude Code                  | Dosya yazmaz — `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` ile `claude` başlatır                                       | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Her ikisi de  |
| `omniroute launch-codex`   | OpenAI Codex CLI             | Dosya yazmaz — `-c` parametreleri ile `codex` başlatır                                                                 | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Her ikisi de  |
