# CLI Integrations (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute, kodlaşdırma CLI-lərini (Codex, Claude Code, OpenCode, Cline, …) OmniRoute-u öz arxa cəbhəsi kimi istifadə etmək üçün konfiqurasiya edən `setup-*` əmrləri ailəsini təqdim edir — beləliklə, alət **bir** son nöqtə ilə danışır və OmniRoute avtomatik ehtiyatla düzgün provayderə yönləndirir. Hər bir əmr işləyən OmniRoute-dan (yerli və ya uzaqdan) **canlı** model kataloqunu oxuyur və alətin öz konfiqurasiya faylını **sizin** maşınınızda yazır. API açarı, alətin dəstəklədiyi hər yerdə bir mühit dəyişəni ilə istinad edilir. Alətə xas mühit faylını saxlayan əmrlər aşağıda qeyd olunur.

Həmçinin, heç bir konfiqurasiya yazmadan, düzgün mühiti daxil edərək `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` və ya `gemini` işə salan ümumi bir işə salıcı — `omniroute run <target>` — mövcuddur. Hədəflər və onların ləqəbləri kanonik manifest `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`) faylından gəlir və `omniroute completion` eyni manifestdən törədilmiş hədəf sözlərini təklif edir. Köhnə alətə xas işə salıcılar — `omniroute launch` (Claude Code) və `omniroute launch-codex` (Codex) — hələ də mövcuddur.

Provayderin qoşulması eyni yerli/uzaq kontekstdən mümkündür. Aşağıdakı API-əsaslı əmrlər idarəetmə autentifikasiyasını provayder etimadnamələrindən ayrı saxlayır və heç vaxt strukturlaşdırılmış çıxışda etimadnamə çap etmir:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Skriptlər üçün `--credential-stdin` və ya `--credential-env` üstünlük verin; `--credential` nəzarətli yerli istifadə üçün saxlanılır. `providers remove` interaktiv olmayan terminalda `--yes` tələb edir və hər beş əmr aktiv konteksti və ya qlobal `--base-url`/`--api-key` seçimlərini nəzərə alır.

Provayder seçiciləri qeyri-müəyyən ID prefikslərini, adları və ya provayder adlarını rədd edir; bir neçə əlaqə uyğun gəldikdə tam əlaqə ID-sindən istifadə edin. Yaratma və redaktə əmrləri yadda saxlanmış əlaqəni geri oxuyur və silmə əməliyyatı onun artıq oxuna bilmədiyini yoxlayır. İdxal mövcud provayder/ad cütünü atlayır. İdxal edilmiş qeydlər CLI-yə verilən idarəetmə son nöqtəsini, konteksti və ya idarəetmə etimadnamələrini ləğv edə bilməz.

İki ən zəngin inteqrasiyanın bir dəfəlik, əl ilə yazılmış əsas quraşdırılması üçün alətə xas dərin təhlillərə baxın:

- [Claude Code konfiqurasiyası](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI konfiqurasiyası](./CODEX-CLI-CONFIGURATION.md)
- [Uzaq Rejim](./REMOTE-MODE.md) — noutbukunuzdan uzaq OmniRoute-u (VPS / Tailnet) idarə edin
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — OmniCopilot genişləndirməsi; o, həmçinin redaktorun içindən sizin üçün bu `setup-*` əmrlərini işə sala bilər

---

## Əsas cədvəl

Hər bir əmr **aktiv kontekstə** (`omniroute connect` ilə təyin edilir, baxın: [Uzaq rejim](./REMOTE-MODE.md)) və ya açıq şəkildə verilmiş `--remote <url> --api-key <key>` seçimlərinə əməl edir. Aşağıdakı "Lokal və uzaq" ifadəsi bu mənanı verir: heç bir seçim verilmədikdə hədəf `http://localhost:20128` olur; `--remote` ilə (və ya aktiv uzaq kontekst olduqda) kataloq həmin serverdən alınır və konfiqurasiya lokal olaraq yazılır.

| Əmr                        | Alət                         | Nə yazır                                                                                                                                                                                    | Əsas bayraqlar                                                                                                                             | Lokal və ya uzaqdan |
| -------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI             | `~/.codex/<name>.config.toml` — hər uyğun mətn modeli üçün bir profil (`codex --profile <name>`)                                                                                            | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Hər ikisi           |
| `omniroute setup-claude`   | Claude Code                  | `~/.claude/profiles/<name>/settings.json` — hər uyğun gələn model üçün bir profil (`CLAUDE_CONFIG_DIR`)                                                                                     | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Hər ikisi           |
| `omniroute setup-opencode` | OpenCode (OpenAI ilə uyğun)  | `~/.config/opencode/opencode.json` — kataloqdakı hər model üçün `omniroute` provayderi (`opencode -m omniroute/<model>`)                                                                    | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Hər ikisi           |
| `omniroute setup-cline`    | Cline                        | `~/.cline/data/{globalState,secrets}.json` (CLI rejimi) + VS Code genişləndirməsinin parametrlərini çap edir                                                                                | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Hər ikisi           |
| `omniroute setup-kilo`     | Kilo Code                    | `~/.local/share/kilo/auth.json` (CLI) + mövcud olduqda `kilocode.*` parametrini VS Code `settings.json` faylına birləşdirir                                                                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Hər ikisi           |
| `omniroute setup-continue` | Continue / `cn` CLI          | `~/.continue/config.yaml` — `provider: openai` modelləri, açar `${{ secrets.OMNIROUTE_API_KEY }}` vasitəsilə                                                                                | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Hər ikisi           |
| `omniroute setup-cursor`   | Cursor                       | Heç nə — tətbiqdaxili addımları çap edir (Cursor konfiqurasiyası qeyri-şəffaf SQLite-dır)                                                                                                   | `--remote` `--api-key` `--only` `--port`                                                                                                   | Hər ikisi           |
| `omniroute setup-roo`      | Roo Code                     | `~/.omniroute/roo-settings.json` (idxal sənədi) + VS Code `settings.json` mövcuddursa, `roo-cline.autoImportSettingsPath` parametrini təyin edir                                            | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Hər ikisi           |
| `omniroute setup-crush`    | Crush                        | `~/.config/crush/crush.json` — `openai-compat` provayderi, açar `$OMNIROUTE_API_KEY` vasitəsilə                                                                                             | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Hər ikisi           |
| `omniroute setup-goose`    | Goose                        | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + mühit reseptini çap edir                                                                                     | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Hər ikisi           |
| `omniroute setup-aider`    | Aider                        | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + mühit reseptini çap edir                                                                                                   | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Hər ikisi           |
| `omniroute setup-qwen`     | Qwen Code                    | `~/.qwen/settings.json` — V4 `modelProviders.openai` massivi + `~/.qwen/.env` daxilində `OMNIROUTE_API_KEY`                                                                                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Hər ikisi           |
| `omniroute setup-5dive`    | 5dive (agent parkı)          | `$HOME` altında heç nə — `5dive agent auth set` vasitəsilə 5dive **identifikasiya profili** (`/var/lib/5dive/auth-profiles/<name>/`) yazır; yalnız root üçün, park hostunda işləyir         | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Hər ikisi           |
| `omniroute run <target>`   | İcra zamanı başlatma (ümumi) | Heç nə — düzgün mühit və arqumentlərlə `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` prosesini başladır; Qwen və Gemini müvəqqəti təcrid olunmuş ev qovluğundan istifadə edir | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Hər ikisi           |
| `omniroute launch`         | Claude Code                  | Heç nə — `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` daxil edilmiş şəkildə `claude` prosesini başladır                                                                                      | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Hər ikisi           |
| `omniroute launch-codex`   | OpenAI Codex CLI             | Heç nə — `-c` bayraqları vasitəsilə `omniroute` provayderi daxil edilmiş şəkildə `codex` prosesini başladır                                                                                 | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Hər ikisi           |

Bayraqlar haqqında qeydlər (əmrin mənbə kodunda yoxlanılıb):

- `--remote <url>` — kataloqu uzaq OmniRoute-dan əldə edir (`--port` parametrini
  və aktiv konteksti üstələyir). `--api-key <key>` həmin server üçün giriş
  məlumatını təmin edir (standart olaraq `OMNIROUTE_API_KEY` mühit dəyişənindən
  və ya aktiv kontekstin tokenindən istifadə olunur).
- `--only <patterns>` — vergüllə ayrılmış alt sətirlər; yalnız uyğun gələn model
  ID-lərini saxlayır (məsələn, `--only glm,kimi`). `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush` əmrlərində
  mövcuddur.
- `--dry-run` — fayl sisteminə toxunmadan tam olaraq nəyin yazılacağını göstərir.
  `setup-cursor` **istisna olmaqla** bütün `setup-*` əmrlərində mövcuddur
  (`setup-cursor` heç vaxt fayla yazmır).
- `--model <id>` — modeli avtomatik aşkarlamayan alətlər üçün tələb olunur (və ya
  interaktiv şəkildə seçilir): Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive. Bu
  alətlər qeyri-interaktiv icra üçün `--yes` parametrini də qəbul edir (bu halda
  `--model` tələb olunur). `setup-opencode` standart üst səviyyəli modeli təyin
  etmək üçün `--model` qəbul edir.
- `omniroute run` əmrindəki `--model <id>` manifestin hər hədəf üzrə bağlantı
  qaydasına (`bin/cli/cli-manifest.mjs`) əməl edir: **aider**
  `--model openai/<id>`, **opencode** isə `--model omniroute/<id>` alır (prefiks
  yalnız ID-də artıq olmadıqda əlavə edilir); **qwen** və **gemini** ID-ni olduğu
  kimi alır; **claude** onu `ANTHROPIC_MODEL`, **goose** `GOOSE_MODEL`, **codex**
  isə `-c model_providers.omniroute.*` arqumentləri vasitəsilə alır. **Qwen
  `--model` parametrini məcburi tələb edən yeganə icra hədəfidir** —
  `omniroute run qwen` bu parametr olmadan açıq xəta mesajı ilə `2` çıxış kodu
  qaytarır.
- `--port <port>` — lokal OmniRoute portu (standart `20128`; `--remote` təyin
  edildikdə nəzərə alınmır). Bütün `setup-*` əmrlərində və hər iki işəsalma
  əmrində mövcuddur.
- `omniroute run` çıxış kodları: alt CLI-ın öz çıxış kodu olduğu kimi ötürülür;
  `2` = etibarsız arqumentlər (dəstəklənməyən hədəf, tələb olunan `--model`
  parametrinin olmaması, konteyner qoruması); `127` = hədəf binar faylı `PATH`
  daxilində deyil; işəsalma `SIGINT`/`SIGTERM`/`SIGHUP` ilə sonlandırıldıqda
  `130`/`143`/`129`; `1` = digər icra zamanı işəsalma xətası.
- İki işəsalma əmri (`launch`, `launch-codex`) `setup-claude` / `setup-codex`
  tərəfindən yazılmış profili seçmək üçün `--profile <name>`, həmçinin əsas
  `claude` / `codex` binar faylına ötürüləcək arqumentləri qəbul edir.

İnteraktiv seçim vasitəsi quraşdırma reseptləri tərəfindən də paylaşılır:

```bash
# Aktiv lokal və ya uzaq model kataloqundan seçin və hədəfi konfiqurasiya edin.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` hazırda `codex`, `claude`, `opencode`, `qwen`, `aider`, `goose`,
`cline`, `continue`, `kilo` və `5dive` üçün sınaqdan keçirilmiş reseptlərə
yönləndirir. Yalnız IDE üçün nəzərdə tutulmuş,
MITM və yalnız təlimat xarakterli kataloq qeydləri açıq `setup-*`/əl ilə icra
axınları olaraq qalır və işə salına bilən hədəflər kimi təqdim edilmir.

> `setup-opencode` **yüngül openai-uyğun** OpenCode inteqrasiyasıdır.
> Daha zəngin plagin inteqrasiyası da mövcuddur — `omniroute setup opencode` —
> və bu inteqrasiya `@omniroute/opencode-plugin` paketini quraşdırır. Bunlar
> fərqli əmrlərdir; yuxarıdakı cədvəl `setup-opencode` əmrini sənədləşdirir.
>
> Plagin hər OpenCode əsas versiyası üçün bir olmaqla iki paketdə təqdim edilir,
> çünki iki yükləyici fərqli giriş nöqtələri gözləyir:
> OpenCode v1 üçün `@omniroute/opencode-plugin` və
> OpenCode v2 üçün `@omniroute/opencode-plugin-v2`. v2 paketi yenidir
> (`0.1.0`) və hələ dəyişməkdə olan host müqaviləsinə əməl edir, buna görə də
> müəyyən bir struktur fərz etmək əvəzinə OpenCode-un kataloq qaralamasına
> yerləşdirdiyi strukturu oxuyur. Onu `opencode.json` faylına `plugins` qeydi
> əlavə etməklə quraşdırın; `omniroute setup opencode` hələ də v1 paketini
> quraşdırır. Seçimlər və giriş məlumatlarının axtarış sırası paketin README
> faylında göstərilib.

---

## Lokal istifadə

OmniRoute `localhost:20128` ünvanında işləyərkən, sadəcə alətiniz üçün quraşdırma
əmrini icra edin. Kataloq lokal serverdən əldə edilir.

```bash
# Codex: uyğun gələn hər model üçün ~/.codex/ daxilində profil yazın
omniroute setup-codex
codex --profile glm52            # yaradılmış profildən istifadə edin

# Claude Code: hər model üçün profillər yazın, sonra onlardan birini başladın
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: bütün kataloq modelləri ilə openai-uyğun provayderi yazın
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # {env:OMNIROUTE_API_KEY} vasitəsilə istinad edilir, heç vaxt diskə yazılmır
opencode -m omniroute/glm/glm-5.2 "..."

# Avtomatik aşkarlaması olmayan alətlər üçün model açıq şəkildə göstərilməlidir:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Heç nə yazmadan önizləyin:
omniroute setup-continue --dry-run
```

Heç bir konfiqurasiya yazmadan başladın (yalnız mühit dəyişənlərinin yeridilməsi):

```bash
omniroute launch                 # Claude Code → lokal OmniRoute
omniroute launch-codex           # Codex CLI → lokal OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Açıq şəkildə göstərilmiş əmr yolu: -- işarəsindən sonra gələn hər şeyi olduğu kimi ötürün
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Uzaqdan istifadə

İstənilən quraşdırma əmrini `--remote` + `--api-key` ilə uzaq OmniRoute-a
yönəldin. Kataloq uzaq serverdən əldə edilir; konfiqurasiya lokal maşınınıza yazılır.

```bash
# Uzaq VPS-də OpenCode; yalnız glm/kimi modellərini saxlayın
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # əvvəlcə OMNIROUTE_API_KEY dəyişənini export edin

# Uzaq kataloqdan Codex profilləri
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# CLI-ni birbaşa uzaq serverə qarşı başladın
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Hər dəfə `--remote`/`--api-key` ötürmək əvəzinə, bir dəfə daxil olun və
**aktiv kontekstin** onları avtomatik təmin etməsinə icazə verin:

```bash
omniroute connect 192.168.0.15        # əhatə dairəsi məhdud token yaradır, konteksti saxlayır
omniroute setup-codex                 # ← indi uzaq kataloqdan istifadə edir
omniroute setup-opencode              # ← eynilə
omniroute launch                      # ← Claude Code uzaq serverə qarşı
```

Kontekstlər, əhatə dairələri və token idarəetməsi üçün [Uzaq rejimə](./REMOTE-MODE.md) baxın.

---

## 5dive agent donanmaları

[5dive](https://5dive.ai), hər biri öz Unix istifadəçisi altında systemd vahidi olan,
uzun müddət işləyən kodlaşdırma agentləri donanmasını idarə edir. O, özü kodlaşdırma
CLI-si deyil, buna görə də `omniroute run` tərəfindən başladılacaq heç nə yoxdur —
`5dive` **yalnız konfiqurasiya** üçün nəzərdə tutulmuş hədəfdir.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Hər iki forma bir 5dive **identifikasiya profili** yazır və həmin profilə bağlanmış
hər `claude` yeri bundan sonra OmniRoute ilə əlaqə saxlayır. Bu hədəfə xas üç məqam var:

- **O, donanma hostunda root kimi işləyir.** 5dive əmrləri lokal systemd vahidləri
  və root-a məxsus vəziyyət qovluğu üzərində işləyir; uzaq rejim yoxdur. Resept
  artıq root kimi işləmədikdə `sudo` vasitəsilə özünü yenidən icra edir (`--no-sudo`
  bunu söndürür və əvəzində əmri çap edir).
- **Loopback olmadığı halda son nöqtə `https://` olmalıdır.** Agentin API açarı
  hər sorğuda həmin URL vasitəsilə ötürülür və 5dive maşından kənardakı açıq mətnli
  son nöqtəni rədd edir. Özəl LAN ünvanı istisna deyil.
- **Hər yerin öz model sabitləməsi profildən üstündür.** Profil
  `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL` daşıyır, lakin standart model
  identifikatoruna hələ də sabitlənmiş yer ilk gedişində _"Seçilmiş modellə bağlı
  problem var"_ xətası ilə uğursuz olur. Yerləri də sabitləmək üçün `--agent <name>`
  parametrini ötürün (təkrarlana bilər); bunu etmədikdə resept əmri çap edir.

API açarı 5dive-a **stdin** (`--api-key=-`) vasitəsilə verilir, buna görə də heç vaxt
`ps` çıxışında görünmür.

Profili tək model əvəzinə OmniRoute **kombinasiyasına** yönəltmək donanma provayderi
üçün nasazlıq zamanı keçidi təmin edir: [#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578)
üzərində qeydə alınmış icra zamanı əsas son nöqtə gedişin ortasında tamamilə sıradan
çıxdıqda, agent qalan addımlarını ehtiyat variantda tamamladı və nasazlığı heç vaxt
istifadəçiyə göstərmədi.

---

## Baza URL konvensiyaları (hansı alətlərə `/v1` lazımdır)

OmniRoute OpenAI interfeysini `/v1` ünvanında, Anthropic interfeysini kök ünvanda,
doğma Gemini interfeysini isə `/v1beta` ünvanında təqdim edir. Hər inteqrasiya
öz alətinin gözlədiyi formaya uyğun qurulub (əmr mənbə kodunda təsdiqlənib):

| İnteqrasiya                                                                | Yazılan baza URL-i | `/v1`?                                           |
| -------------------------------------------------------------------------- | ------------------ | ------------------------------------------------ |
| `setup-cline` (`openAiBaseUrl`)                                            | kök                | Xeyr — Cline `/v1/chat/completions` əlavə edir   |
| `setup-goose` (`OPENAI_HOST`)                                              | kök                | Xeyr — Goose yolu əlavə edir                     |
| `setup-aider` (`OPENAI_API_BASE`)                                          | kök                | Xeyr — LiteLLM `/v1/chat/completions` əlavə edir |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | `/v1` ilə          | Bəli                                             |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | kök                | Xeyr — Claude Code `/v1/messages` əlavə edir     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | `/v1` ilə          | Bəli                                             |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | `/v1` ilə          | Bəli                                             |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | kök                | Xeyr — SDK `/v1beta/models/…` əlavə edir         |
| `setup-5dive` (autentifikasiya profilində `ANTHROPIC_BASE_URL`)            | kök                | Xeyr — Claude Code `/v1/messages` əlavə edir     |

---

## Yeniləmə zamanı doğma asılılıqların saxlanması: `--include=optional`

`omniroute update` ilə yenilədiyiniz zaman (təsdiqdən sonra və ya `--apply` ilə)
OmniRoute quraşdırmanı daxilində əvvəlcədən əlavə edilmiş `--include=optional` ilə işə salır:

```bash
npm install -g omniroute@latest --include=optional
```

Bu, `omniroute update` əmrinə ötürdüyünüz bayraq **deyil** — yeniləyici onu həmişə
tətbiq edir. Bu, npm konfiqurasiyanızda `omit=optional` təyin edilsə belə,
`optionalDependencies` asılılıqlarının (`better-sqlite3`, `keytar`, `tls-client`,
LLMLingua SLM steki) yeniləmədən sonra saxlanmasına zəmanət verir; əks halda doğma
SQLite drayveri və ƏS açar zənciri inteqrasiyası xəbərdarlıq edilmədən silinə bilər.
Tətbiq etmədən dəqiq əmri önizləmək üçün:

```bash
omniroute update --dry-run
# [SINAQ İCRASI] İcra ediləcək: npm install -g omniroute@latest --include=optional
```

Digər `omniroute update` bayraqları (mənbə kodunda təsdiqlənib): `--check`
(köhnədirsə, 1 kodu ilə çıxış edir), `--apply` (soruşmadan quraşdırır), `--changelog`,
`--no-backup`, `--yes`.

---

## `omniroute run gemini` vasitəsilə Google Gemini CLI

Müqavilə `@google/gemini-cli` 0.50.0 ilə yoxlanılıb: CLI
`GOOGLE_GEMINI_BASE_URL` dəyişənini nəzərə alır və həmin ünvana
`POST /v1beta/models/<model>:generateContent` (və
`:streamGenerateContent?alt=sse`) sorğusu göndərir — bu, OmniRoute-un doğma
Gemini interfeysinə (`/v1beta`) tam uyğundur. `omniroute run gemini` bunu
avtomatik olaraq konfiqurasiya edir:

- `GOOGLE_GEMINI_BASE_URL` → aktiv OmniRoute baza URL-i (kök, `/v1` olmadan);
- `GEMINI_API_KEY` → müəyyən edilmiş OmniRoute giriş məlumatı (seçim/mühit/kontekst);
- `.gemini/settings.json` faylında `gemini-api-key` autentifikasiyasını seçən
  **müvəqqəti, təcrid olunmuş `GEMINI_CLI_HOME`**; beləliklə, saxlanılmış Google
  OAuth sessiyası (Code Assist) OmniRoute-a yönəldilmiş işəsalmanı heç vaxt
  üstələmir — çıxışdan sonra silinir;
- **mühit gigiyenası**: alt prosesin mühitindən `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` və `GOOGLE_GENAI_USE_GCA` (autentifikasiyanı
  Vertex/Code Assist-ə yönəldə biləcək dəyişənlər) silinir və əlavə ehtiyat
  tədbiri kimi `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` təyin edilir — digər
  `run` hədəflərində də öz ziddiyyətli dəyişənləri üçün eyni yanaşma tətbiq olunur;
- `--provider`/`--model` əsasında `--model <id>` əlavə edilməsi.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Gemini-nin iş sahəsinə etibar qoruması başsız rejimdə də qüvvədə qalır —
`--skip-trust` parametrini özünüz ötürün (və ya interaktiv şəkildə qovluğa etibar
edin); işəsalıcı qəsdən bu yoxlamadan yan keçmir. Bu işəsalıcı
`/dashboard/acp-agents` üçün agent protokolu inteqrasiyası olaraq qalan **ACP
qeydiyyatından** (`src/lib/acp/registry.ts`, `gemini --acp`) fərqlidir.

---

## Real tüstü sınağı (seçim əsasında)

Deterministik işə salma planının reqressiya sınaqları CI-də icra olunur (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`). REAL binar faylları REAL OmniRoute serverinə qarşı yoxlamaq üçün
`tests/integration/upstream-cli-smoke.int.test.ts` ünvanında seçim əsasında aktivləşdirilən sınaq mexanizmi mövcuddur. O, heç vaxt avtomatik işə düşmür
(`RUN_CLI_SMOKE=1` təyin edilmədikcə hər bir alt sınaq ötürülür), giriş məlumatını dəyəri ilə deyil,
mühit dəyişəninin ADI ilə ötürür, qeydə alınmış bütün çıxışlardan açar formatlı sətirləri gizlədir,
binar faylı quraşdırılmamış hədəfləri ötürür və uğursuzluqları sadə məntiqi dəyər əvəzinə
autentifikasiya / yuxarı axın / konfiqurasiya kateqoriyalarına ayırır:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

İstəyə bağlı: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` sınağın əhatə dairəsini məhdudlaşdırır;
`OMNIROUTE_SMOKE_TIMEOUT_MS` hər hədəf üçün nəzərdə tutulan 120 saniyəlik vaxt limitini əvəz edir.

---

## Həmçinin baxın

- [Claude Code konfiqurasiyası](./CLAUDE-CODE-CONFIGURATION.md) — daha ətraflı Claude Code təlimatı
- [Codex CLI konfiqurasiyası](./CODEX-CLI-CONFIGURATION.md) — birdəfəlik `[model_providers.omniroute]` baza sazlaması
- [Uzaqdan rejim](./REMOTE-MODE.md) — kontekstlər, əhatə dairəsi məhdudlaşdırılmış giriş tokenləri və uzaq serverin idarə edilməsi
- [CLI alətləri üzrə arayış](../reference/CLI-TOOLS.md) — dəstəklənən alətlərin və idarəetmə paneli səhifələrinin tam kataloqu
- [Quraşdırma təlimatı](./SETUP_GUIDE.md) — quraşdırma üsulları və ilk işəsalma zamanı ilkin sazlama
