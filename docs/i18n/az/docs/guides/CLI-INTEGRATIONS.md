# CLI-INTEGRATIONS (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

---

title: "CLI İnteqrasiyaları — hər hansı bir kodlama CLI-ni OmniRoute-a yönləndirin"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI İnteqrasiyaları

OmniRoute, bir kodlama CLI-nin (Codex, Claude Code, OpenCode, Cline, …) OmniRoute-u arxa planda istifadə etməsi üçün konfiqurasiya edən `setup-*` əmrləri ailəsini təqdim edir — beləliklə, alət **bir** uç nöqtə ilə danışır və OmniRoute doğru təminatçıya avtomatik geri dönmə ilə yönləndirir. Hər bir əmr, işləyən bir OmniRoute-dan **canlı** model kataloqunu oxuyur və alətin öz konfiqurasiya faylını **sizin** maşınınıza yazır. API açarı, alətin dəstəklədiyi hər yerdə bir mühit dəyişəni ilə istinad edilir. Alətə məxsus mühit faylını saxlayan əmrlər aşağıda qeyd olunmuşdur.

Eyni zamanda, `omniroute run <target>` adlı ümumi bir başlatıcı da var — bu, `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` və ya `gemini`-ni düzgün mühitlə başlatır, heç bir konfiqurasiya yazmadan. Hədəflər və onların təmsilçiləri, kanonik manifest `bin/cli/cli-manifest.mjs`-dən gəlir (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`), və `omniroute completion` eyni manifest-dən əldə edilən hədəf sözlərini təqdim edir. Köhnə alət başlatıcıları — `omniroute launch` (Claude Code) və `omniroute launch-codex` (Codex) — hələ də mövcuddur.

Təminatçı onboarding eyni yerli/uzaq kontekstdən mövcuddur. Aşağıdakı API-öncəli əmrlər, idarəetmə autentifikasiyasını təminatçı etimadnamələrindən ayrı saxlayır və heç vaxt strukturlu çıxışda etimadnaməni çap etmir:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Skriptlər üçün `--credential-stdin` və ya `--credential-env`-i üstün tutun; `--credential` isə nəzarət olunan yerli istifadə üçün saxlanılır. `providers remove` qeyri-interaktiv terminalda `--yes` tələb edir və beş əmrdən hamısı aktiv konteksti və ya qlobal `--base-url`/`--api-key` seçimlərini nəzərə alır.

İki ən zəngin inteqrasiyanın bir dəfəlik, əl ilə yazılmış əsas konfiqurasiyası üçün alətə xas dərin dalışlara baxın:

- [Claude Code konfiqurasiyası](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI konfiqurasiyası](./CODEX-CLI-CONFIGURATION.md)
- [Uzaq Rejim](./REMOTE-MODE.md) — laptopunuzdan uzaq OmniRoute (VPS / Tailnet) idarə edin
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — OmniCopilot genişləndirməsi; bu, eyni zamanda redaktordan içəridən bu `setup-*` əmrlərini sizin üçün icra edə bilər

---

## Master cədvəli

Hər bir əmr **aktiv konteksti** ( `omniroute connect` ilə təyin edilmişdir, bax [Uzaq Rejim](./REMOTE-MODE.md)) və ya açıq `--remote <url> --api-key <key>` flag-larını nəzərə alır. Aşağıdakı "Yerli vs uzaq" deməkdir: heç bir flag olmadan `http://localhost:20128`-i hədəfləyir; `--remote` (və ya aktiv uzaq kontekst) ilə o, kataloqu həmin serverdən alır və konfiqurasiyanı yerli yazır.

| Əmr                        | Alət                    | Yazdığı şey                                                                                                                                                                | Əsas flag-lar                                                                                                                              | Yerli vs uzaq |
| -------------------------- | ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI        | `~/.codex/<name>.config.toml` — uyğun mətn modeli üçün bir profil (`codex --profile <name>`)                                                                               | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Hər ikisi     |
| `omniroute setup-claude`   | Claude Code             | `~/.claude/profiles/<name>/settings.json` — uyğun model üçün bir profil (`CLAUDE_CONFIG_DIR`)                                                                              | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Hər ikisi     |
| `omniroute setup-opencode` | OpenCode (openai-uyğun) | `~/.config/opencode/opencode.json` — hər bir kataloq modeli ilə `omniroute` təminatçısı (`opencode -m omniroute/<model>`)                                                  | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Hər ikisi     |
| `omniroute setup-cline`    | Cline                   | `~/.cline/data/{globalState,secrets}.json` (CLI rejimi) + VS Code genişləndirmə parametrlərini çap edir                                                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Hər ikisi     |
| `omniroute setup-kilo`     | Kilo Code               | `~/.local/share/kilo/auth.json` (CLI) + varsa `kilocode.*`-ni VS Code `settings.json`-a birləşdirir                                                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Hər ikisi     |
| `omniroute setup-continue` | Continue / `cn` CLI     | `~/.continue/config.yaml` — `provider: openai` modelləri, açar `${{ secrets.OMNIROUTE_API_KEY }}` vasitəsilə                                                               | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Hər ikisi     |
| `omniroute setup-cursor`   | Cursor                  | Heç nə — tətbiq içindəki addımları çap edir (Cursor konfiqurasiyası qeyri-şəffaf SQLite-dir)                                                                               | `--remote` `--api-key` `--only` `--port`                                                                                                   | Hər ikisi     |
| `omniroute setup-roo`      | Roo Code                | `~/.omniroute/roo-settings.json` (idxal sənədi) + varsa VS Code `settings.json`-da `roo-cline.autoImportSettingsPath`-ı təyin edir                                         | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Hər ikisi     |
| `omniroute setup-crush`    | Crush                   | `~/.config/crush/crush.json` — `openai-uyğun` təminatçı, açar `$OMNIROUTE_API_KEY` vasitəsilə                                                                              | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Hər ikisi     |
| `omniroute setup-goose`    | Goose                   | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + mühit reseptini çap edir                                                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Hər ikisi     |
| `omniroute setup-aider`    | Aider                   | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + mühit reseptini çap edir                                                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Hər ikisi     |
| `omniroute setup-qwen`     | Qwen Code               | `~/.qwen/settings.json` — V4 `modelProviders.openai` massivi + `OMNIROUTE_API_KEY` `~/.qwen/.env`-də                                                                       | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Hər ikisi     |
| `omniroute run <target>`   | İcra başlatma (ümumi)   | Heç nə — `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini`-ni düzgün mühit və arqumentlərlə başlat; Qwen və Gemini müvəqqəti izolyasiya olunmuş ev istifadə edir | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Hər ikisi     |
| `omniroute launch`         | Claude Code             | Heç nə — `claude`-ni `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` ilə başlatır                                                                                              | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Hər ikisi     |
| `omniroute launch-codex`   | OpenAI Codex CLI        | Heç nə — `codex`-i `omniroute` təminatçısı ilə `-c` flag-ları vasitəsilə başlatır                                                                                          | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Hər ikisi     |

Flag-lar haqqında qeydlər (əmr mənbəsində təsdiqlənmişdir):

- `--remote <url>` — uzaq OmniRoute-dan kataloqu alır ( `--port` və aktiv konteksti üstələyir). `--api-key <key>` həmin server üçün etimadnaməni təmin edir (varsayılan olaraq `OMNIROUTE_API_KEY` mühit dəyişəni və ya aktiv kontekstin tokeni).
- `--only <patterns>` — vergüllə ayrılmış alt stringlər; yalnız uyğun model ID-lərini saxlayır (məsələn, `--only glm,kimi`). `setup-codex`, `setup-claude`, `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush`-da mövcuddur.
- `--dry-run` — fayl sisteminə toxunmadan yazılacaq şeyləri dəqiq çap edir. Hər bir `setup-*` əmrdə **istisna olmaqla** `setup-cursor` (heç vaxt fayl yazmır).
- `--model <id>` — avtomatik model aşkar etməyən alətlər üçün tələb olunur (və ya interaktiv olaraq seçilir): Cline, Kilo, Roo, Goose, Qwen, Aider. Bu alətlər həmçinin qeyri-interaktiv icra üçün `--yes` qəbul edir (bu zaman `--model` tələb olunur). `setup-opencode` varsayılan üst səviyyə modelini təyin etmək üçün `--model` qəbul edir.
- `--model <id>` `omniroute run`-da manifestin hədəf wiring-ini izləyir (`bin/cli/cli-manifest.mjs`): **aider** `--model openai/<id>` alır və **opencode** `--model omniroute/<id>` (prefix yalnız id artıq onu daşımadığı zaman əlavə olunur); **qwen** və **gemini** id-ni olduğu kimi alır; **claude** bunu `ANTHROPIC_MODEL` vasitəsilə alır, **goose** `GOOSE_MODEL` vasitəsilə, və **codex** `-c model_providers.omniroute.*` arqumentləri vasitəsilə. **Qwen, yalnız `--model` tələb edən yeganə icra hədəfidir** — `omniroute run qwen` olmadan `2` ilə açıq bir xəta ilə çıxır.
- `--port <port>` — yerli OmniRoute portu (varsayılan `20128`, `--remote` təyin edildikdə nəzərə alınmır). Bütün `setup-*` və hər iki başlatıcıda mövcuddur.
- `omniroute run` çıxış kodları: uşaq CLI-nin öz çıxış kodu olduğu kimi ötürülür; `2` = etibarsız arqumentlər (dəstəklənməyən hədəf, tələb olunan `--model`-in olmaması, konteyner qoruyucusu); `127` = hədəf ikili `PATH`-da yoxdur; `130`/`143`/`129` başlatma `SIGINT`/`SIGTERM`/`SIGHUP` ilə bitdikdə; `1` = digər icra başlatma xətası.
- İki başlatıcı (`launch`, `launch-codex`) `setup-claude` / `setup-codex` tərəfindən yazılmış profili seçmək üçün `--profile <name>` qəbul edir, həmçinin əsas `claude` / `codex` ikilisi üçün pass-through arqumentləri.

İnteraktiv seçici, eyni zamanda konfiqurasiya reseptləri ilə də paylaşılır:

```bash
# Aktiv yerli və ya uzaq model kataloqundan seçin və hədəfi konfiqurasiya edin.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` hazırda `codex`, `claude`, `opencode`, `qwen`, `aider`, `goose`, `cline`, `continue` və `kilo` üçün test edilmiş reseptlərə yönləndirilir. IDE-yə xas, MITM və yalnız bələdçi kataloq girişləri açıq `setup-*`/əl ilə axınlar olaraq qalır və başlatma hədəfləri kimi təqdim edilmir.

> `setup-opencode` **yüngül openai-uyğun** OpenCode inteqrasiyasıdır.
> Həmçinin daha zəngin bir plugin inteqrasiyası var — `omniroute setup opencode` — bu, `@omniroute/opencode-plugin`-i quraşdırır. Onlar fərqli əmrlərdir; yuxarıdakı cədvəl `setup-opencode`-i sənədləşdirir.

---

## Yerli istifadə

`localhost:20128` ünvanında OmniRoute işləyərkən, sadəcə alətiniz üçün qurma əmrini icra edin. Kataloq yerli serverdən alınır.

```bash
# Codex: uyğun model üçün ~/.codex/ içində profil yaz
omniroute setup-codex
codex --profile glm52            # yaradılmış profili istifadə et

# Claude Code: model başına profilləri yaz, sonra birini işə sal
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: bütün kataloq modelləri ilə openai-uyğun provayderi yaz
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # {env:OMNIROUTE_API_KEY} vasitəsilə istinad edilir, heç vaxt diskdə deyil
opencode -m omniroute/glm/glm-5.2 "..."

# Avtomatik aşkar etməyi tələb etməyən alətlər üçün açıq model lazımdır:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Heç nə yazmadan önizləmə:
omniroute setup-continue --dry-run
```

Heç bir konfiqurasiya yazmadan işə salın (yalnız env-injection):

```bash
omniroute launch                 # Claude Code → yerli OmniRoute
omniroute launch-codex           # Codex CLI → yerli OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Açıq əmr yolu: --dan sonra gələn hər şeyi keçirin
omniroute run claude -- --print-system-prompt "bu fərqi nəzərdən keçirin"
```

---

## Uzaqdan istifadə

Hər hansı bir qurma əmrini `--remote` + `--api-key` ilə uzaq OmniRoute-a yönləndirin. Kataloq uzaqdan alınır; konfiqurasiya yerli maşınınıza yazılır.

```bash
# Uzaq VPS-yə qarşı OpenCode, yalnız glm/kimi modelləri saxla
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # əvvəlcə OMNIROUTE_API_KEY-i ixrac et

# Uzaq kataloqdan Codex profilləri
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Uzaqdan bir CLI işə sal
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Hər dəfə `--remote`/`--api-key` keçirmək əvəzinə, bir dəfə daxil olun və **aktiv kontekst** onların avtomatik təmin edilməsinə icazə verin:

```bash
omniroute connect 192.168.0.15        # məhdudlaşdırılmış token yaradır, konteksti saxlayır
omniroute setup-codex                 # ← indi uzaq kataloqdan istifadə edir
omniroute setup-opencode              # ← eyni
omniroute launch                      # ← Claude Code uzaqda
```

Kontekstlər, sahələr və token idarəçiliyi üçün [Uzaq Rejim](./REMOTE-MODE.md) səhifəsinə baxın.

---

## Əsas URL konvensiyaları (hansı alətlər `/v1` istəyir)

OmniRoute OpenAI səthini `/v1`-də, Anthropic səthini kökdə, və yerli Gemini səthini `/v1beta`-da təqdim edir. Hər bir inteqrasiya alətinin gözlədiyi forma bağlıdır (əmr mənbəsində təsdiqlənmişdir):

| İnteqrasiya                                                                | Yazılan Əsas URL | `/v1`?                                           |
| -------------------------------------------------------------------------- | ---------------- | ------------------------------------------------ |
| `setup-cline` (`openAiBaseUrl`)                                            | kök              | Xeyr — Cline `/v1/chat/completions` əlavə edir   |
| `setup-goose` (`OPENAI_HOST`)                                              | kök              | Xeyr — Goose yolu əlavə edir                     |
| `setup-aider` (`OPENAI_API_BASE`)                                          | kök              | Xeyr — LiteLLM `/v1/chat/completions` əlavə edir |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | `/v1` ilə        | Bəli                                             |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | kök              | Xeyr — Claude Code `/v1/messages` əlavə edir     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | `/v1` ilə        | Bəli                                             |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | `/v1` ilə        | Bəli                                             |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | kök              | Xeyr — SDK `/v1beta/models/…` əlavə edir         |

---

## Yerli asılılıqları yeniləmək: `--include=optional`

`omniroute update` ilə yenilədikdə (təsdiqlədikdən sonra, ya da `--apply` ilə),
OmniRoute quraşdırmanı `--include=optional` ilə icra edir:

```bash
npm install -g omniroute@latest --include=optional
```

Bu, `omniroute update`-ə ötürdüyünüz bir bayraq **deyil** — bu, həmişə
yeniləyici tərəfindən tətbiq olunur. Bu, `optionalDependencies`-in (`better-sqlite3`, `keytar`,
`tls-client`, LLMLingua SLM yığını) yeniləmədən sağ qalmasını təmin edir, əgər
npm konfiqurasiyanızda `omit=optional` təyin edilibsə, bu, yerli SQLite
sürücüsünü və OS-keyring bağlanmasını səssizcə silərdi. Dəqiq əmri tətbiq etmədən
öncə baxmaq üçün:

```bash
omniroute update --dry-run
# [DRY RUN] İcra ediləcək: npm install -g omniroute@latest --include=optional
```

Digər `omniroute update` bayraqları (mənbədə təsdiqlənmişdir): `--check` (köhnədirsə 1 ilə çıxır), `--apply` (sorğu olmadan quraşdırır), `--changelog`, `--no-backup`,
`--yes`.

---

## Google Gemini CLI `omniroute run gemini` vasitəsilə

`@google/gemini-cli` 0.50.0 ilə müqavilə təsdiqlənmişdir: CLI
`GOOGLE_GEMINI_BASE_URL`-i tanıyır və `POST /v1beta/models/<model>:generateContent`
(və `:streamGenerateContent?alt=sse`) göndərir — tam olaraq OmniRoute-un yerli
Gemini interfeysi (`/v1beta`). `omniroute run gemini` bunu avtomatik olaraq
bağlayır:

- `GOOGLE_GEMINI_BASE_URL` → aktiv OmniRoute əsas URL (kök, `/v1` yoxdur);
- `GEMINI_API_KEY` → həll edilmiş OmniRoute kredensialı (seçim/env/kontekst);
- **müvəqqəti izolyasiya olunmuş `GEMINI_CLI_HOME`** hansı ki, `.gemini/settings.json`
  `gemini-api-key` autentifikasiyasını seçir, beləliklə saxlanılan Google OAuth sessiyası
  (Kod Dəstəyi) heç vaxt OmniRoute yönləndirilmiş başlatmanı üstələməz — çıxışdan sonra silinir;
- **env gigiyenası**: uşaq mühiti `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` və `GOOGLE_GENAI_USE_GCA`-dan təmizlənir (bu, autentifikasiyanı
  Vertex/Kod Dəstəyi ilə yönləndirərdi), və `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key`
  ehtiyat olaraq təyin edilir — digər `run` hədəfləri öz münaqişəli dəyişənləri üçün eyni
  müalicəni alır;
- `--model <id>` `--provider`/`--model`-dan inyeksiya.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Gemini-nin iş sahəsi etimad qoruyucusu hələ də başsız rejimdə tətbiq olunur —
`--skip-trust` (ya da interaktiv olaraq qovluğu etimad edin) özünüz keçirin; başlatıcı
qəsdən bunu atlamır. Bu başlatıcı **ACP qeydiyyatından** (`src/lib/acp/registry.ts`, `gemini --acp`) fərqlidir, bu, `/dashboard/acp-agents` üçün agent-protokol inteqrasiyasıdır.

---

## Real tüstü süzgəci (seçimlə)

Deterministik başlatma-planı geriyə dönmə testləri CI-də (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). REAL ikili faylları REAL
OmniRoute serveri ilə təsdiqləmək üçün seçimlə bir harness mövcuddur
`tests/integration/upstream-cli-smoke.int.test.ts`. Bu, avtomatik olaraq
işləmir (hər bir alt-test `RUN_CLI_SMOKE=1` olmadıqca atlanır), kredensialı env-dəki
AD ilə ötürür (dəyər ilə deyil), qeydə alınmış çıxışdan açar formasında olan
sözləri gizlədir, quraşdırılmamış hədəfləri atlayır və uğursuzluqları
autentifikasiya / upstream / konfiqurasiya kimi təsnif edir, sadəcə boolean
yerinə:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

İstəyə bağlı: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` süzgəci məhdudlaşdırır;
`OMNIROUTE_SMOKE_TIMEOUT_MS` 120s-lik hər hədəf üçün vaxt aşımını üstələyir.

---

## Baxın həmçinin

- [Claude Code konfiqurasiyası](./CLAUDE-CODE-CONFIGURATION.md) — daha dərin Claude Code bələdçisi
- [Codex CLI konfiqurasiyası](./CODEX-CLI-CONFIGURATION.md) — bir dəfəlik `[model_providers.omniroute]` əsas qurulması
- [Uzaq Mod](./REMOTE-MODE.md) — kontekstlər, məhdudlaşdırılmış giriş tokenləri, uzaq serveri idarə etmək
- [CLI Alətləri istinad](../reference/CLI-TOOLS.md) — dəstəklənən alətlərin tam kataloqu + idarəetmə səhifələri
- [Quraşdırma Bələdçisi](./SETUP_GUIDE.md) — quraşdırma metodları və ilk dəfə işə salma təlimatı
