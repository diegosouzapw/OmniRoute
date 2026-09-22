# CLI Integrations (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute, bir kodlama CLI'sini (Codex, Claude Code, OpenCode, Cline, …) arka uç olarak OmniRoute'u kullanacak şekilde yapılandıran bir `setup-*` komutları ailesi sunar — böylece araç **tek** bir uç noktayla iletişim kurar ve OmniRoute, otomatik geri dönüş özelliğiyle istekleri doğru sağlayıcıya yönlendirir. Her komut, çalışmakta olan bir OmniRoute'tan (yerel veya uzak) **canlı** model kataloğunu okur ve aracın kendi yapılandırma dosyasını **sizin** makinenize yazar. Araç desteklediği sürece API anahtarına bir ortam değişkeni üzerinden başvurulur. Araca özel kalıcı bir ortam dosyası oluşturan komutlar aşağıda belirtilmiştir.

Ayrıca genel bir başlatıcı da vardır — `omniroute run <target>` — herhangi bir yapılandırma yazmadan `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen` veya `gemini` komutunu gerekli ortam değişkenlerini enjekte ederek başlatır. Hedefler ve bunların takma adları, standart `bin/cli/cli-manifest.mjs` manifestosundan gelir (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`) ve `omniroute completion` aynı manifestodan türetilen hedef sözcüklerini sunar. Araç başına eski başlatıcılar — `omniroute launch` (Claude Code) ve `omniroute launch-codex` (Codex) — kullanılmaya devam etmektedir.

Sağlayıcı ekleme işlemleri de aynı yerel/uzak bağlamdan yapılabilir. Aşağıdaki API öncelikli komutlar, yönetim kimlik doğrulamasını sağlayıcı kimlik bilgilerinden ayrı tutar ve yapılandırılmış çıktıda hiçbir zaman kimlik bilgisi yazdırmaz:

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

Betikler için `--credential-stdin` veya `--credential-env` seçeneklerini tercih edin; `--credential`, denetimli yerel kullanım için korunmuştur. `providers remove`, etkileşimli olmayan bir terminalde `--yes` seçeneğini gerektirir ve beş komutun tamamı etkin bağlamı veya genel `--base-url`/`--api-key` seçeneklerini dikkate alır.

En kapsamlı iki entegrasyonun tek seferlik, elle yazılan temel kurulumu için araçlara özel ayrıntılı kılavuzlara bakın:

- [Claude Code yapılandırması](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI yapılandırması](./CODEX-CLI-CONFIGURATION.md)
- [Uzak Mod](./REMOTE-MODE.md) — dizüstü bilgisayarınızdan uzak bir OmniRoute'u (VPS / Tailnet) yönetin
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — OmniCopilot uzantısı; bu `setup-*` komutlarını sizin için doğrudan düzenleyici içinden de çalıştırabilir

---

## Ana tablo

Her komut, **etkin bağlamı** (`omniroute connect` ile ayarlanır; bkz. [Uzak Mod](./REMOTE-MODE.md)) veya açıkça belirtilen `--remote <url> --api-key <key>` seçeneklerini dikkate alır. Aşağıdaki "Yerel ve uzak" ifadesinin anlamı şudur: hiçbir seçenek belirtilmediğinde `http://localhost:20128` hedeflenir; `--remote` kullanıldığında (veya etkin bir uzak bağlam bulunduğunda) katalog ilgili sunucudan alınır ve yapılandırma yerel olarak yazılır.

| Komut                      | Araç                            | Yazdığı yer                                                                                                                                                                                                         | Temel bayraklar                                                                                                                            | Yerel ve uzak |
| -------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `omniroute setup-codex`    | OpenAI Codex CLI                | `~/.codex/<name>.config.toml` — uyumlu her metin modeli için bir profil (`codex --profile <name>`)                                                                                                                  | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | Her ikisi     |
| `omniroute setup-claude`   | Claude Code                     | `~/.claude/profiles/<name>/settings.json` — eşleşen her model için bir profil (`CLAUDE_CONFIG_DIR`)                                                                                                                 | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | Her ikisi     |
| `omniroute setup-opencode` | OpenCode (OpenAI uyumlu)        | `~/.config/opencode/opencode.json` — katalogdaki her modeli içeren `omniroute` sağlayıcısı (`opencode -m omniroute/<model>`)                                                                                        | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | Her ikisi     |
| `omniroute setup-cline`    | Cline                           | `~/.cline/data/{globalState,secrets}.json` (CLI modu) + VS Code uzantısı ayarlarını yazdırır                                                                                                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | Her ikisi     |
| `omniroute setup-kilo`     | Kilo Code                       | `~/.local/share/kilo/auth.json` (CLI) + mevcutsa `kilocode.*` ayarlarını VS Code `settings.json` dosyasıyla birleştirir                                                                                             | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | Her ikisi     |
| `omniroute setup-continue` | Continue / `cn` CLI             | `~/.continue/config.yaml` — `provider: openai` modelleri, anahtar `${{ secrets.OMNIROUTE_API_KEY }}` üzerinden                                                                                                      | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Her ikisi     |
| `omniroute setup-cursor`   | Cursor                          | Hiçbir şey — uygulama içi adımları yazdırır (Cursor yapılandırması şeffaf olmayan bir SQLite veritabanıdır)                                                                                                         | `--remote` `--api-key` `--only` `--port`                                                                                                   | Her ikisi     |
| `omniroute setup-roo`      | Roo Code                        | `~/.omniroute/roo-settings.json` (içe aktarma belgesi) + bir VS Code `settings.json` dosyası varsa `roo-cline.autoImportSettingsPath` değerini ayarlar                                                              | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | Her ikisi     |
| `omniroute setup-crush`    | Crush                           | `~/.config/crush/crush.json` — `openai-compat` sağlayıcısı, anahtar `$OMNIROUTE_API_KEY` üzerinden                                                                                                                  | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | Her ikisi     |
| `omniroute setup-goose`    | Goose                           | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`) + ortam değişkeni tarifini yazdırır                                                                                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Her ikisi     |
| `omniroute setup-aider`    | Aider                           | `~/.aider.conf.yml` (`openai-api-base` + `model: openai/<id>`) + ortam değişkeni tarifini yazdırır                                                                                                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | Her ikisi     |
| `omniroute setup-qwen`     | Qwen Code                       | `~/.qwen/settings.json` — V4 `modelProviders.openai` dizisi + `~/.qwen/.env` içinde `OMNIROUTE_API_KEY`                                                                                                             | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | Her ikisi     |
| `omniroute setup-5dive`    | 5dive (ajan filosu)             | `$HOME` altında hiçbir şey — `5dive agent auth set` aracılığıyla bir 5dive **kimlik doğrulama profili** (`/var/lib/5dive/auth-profiles/<name>/`) yazar; yalnızca root, filo ana makinesinde çalışır                 | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | Her ikisi     |
| `omniroute run <target>`   | Çalışma zamanı başlatma (genel) | Hiçbir şey — doğru ortam değişkenleri ve bağımsız değişkenlerle `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini` süreçlerinden birini başlatır; Qwen ve Gemini geçici, yalıtılmış bir ana dizin kullanır | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | Her ikisi     |
| `omniroute launch`         | Claude Code                     | Hiçbir şey — `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` eklenmiş şekilde `claude` sürecini başlatır                                                                                                                | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | Her ikisi     |
| `omniroute launch-codex`   | OpenAI Codex CLI                | Hiçbir şey — `-c` bayrakları aracılığıyla `omniroute` sağlayıcısı eklenmiş şekilde `codex` sürecini başlatır                                                                                                        | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | Her ikisi     |

Bayraklarla ilgili notlar (komut kaynağında doğrulanmıştır):

- `--remote <url>` — kataloğu uzak bir OmniRoute'tan getirir (`--port` değerini
  ve etkin bağlamı geçersiz kılar). `--api-key <key>`, söz konusu sunucu için
  kimlik bilgisini sağlar (varsayılan olarak `OMNIROUTE_API_KEY` ortam değişkeni
  veya etkin bağlamın belirteci kullanılır).
- `--only <patterns>` — virgülle ayrılmış alt dizeler; yalnızca eşleşen model
  kimliklerini tutar (ör. `--only glm,kimi`). `setup-codex`, `setup-claude`,
  `setup-opencode`, `setup-continue`, `setup-cursor`, `setup-crush` komutlarında
  kullanılabilir.
- `--dry-run` — dosya sistemine dokunmadan tam olarak ne yazılacağını gösterir.
  `setup-cursor` (hiçbir zaman dosya yazmaz) **hariç** tüm `setup-*` komutlarında
  kullanılabilir.
- `--model <id>` — otomatik model keşfi bulunmayan araçlar için zorunludur (veya
  etkileşimli olarak seçilir): Cline, Kilo, Roo, Goose, Qwen, Aider, 5dive. Bu
  araçlar, etkileşimsiz çalıştırmalar için `--yes` seçeneğini de kabul eder (bu
  durumda `--model` zorunludur). `setup-opencode`, varsayılan üst düzey modeli
  ayarlamak için `--model` seçeneğini alır.
- `omniroute run` üzerindeki `--model <id>`, manifestin hedef başına
  yapılandırmasını izler (`bin/cli/cli-manifest.mjs`): **aider**
  `--model openai/<id>`, **opencode** ise `--model omniroute/<id>` alır (önek
  yalnızca kimlikte zaten bulunmuyorsa eklenir); **qwen** ve **gemini** kimliği
  olduğu gibi alır; **claude** bunu `ANTHROPIC_MODEL`, **goose** `GOOSE_MODEL`,
  **codex** ise `-c model_providers.omniroute.*` argümanları üzerinden alır.
  **`--model` seçeneğini kesin olarak zorunlu tutan tek çalıştırma hedefi
  Qwen'dir** — bu seçenek olmadan `omniroute run qwen`, açık bir hatayla `2`
  koduyla çıkar.
- `--port <port>` — yerel OmniRoute bağlantı noktası (varsayılan `20128`;
  `--remote` ayarlandığında yok sayılır). Tüm `setup-*` komutlarında ve her iki
  başlatıcıda bulunur.
- `omniroute run` çıkış kodları: alt CLI'ın kendi çıkış kodu olduğu gibi
  aktarılır; `2` = geçersiz argümanlar (desteklenmeyen hedef, zorunlu `--model`
  eksikliği, kapsayıcı koruması); `127` = hedef ikili dosya `PATH` içinde değil;
  başlatma `SIGINT`/`SIGTERM`/`SIGHUP` ile sonlandırıldığında `130`/`143`/`129`;
  `1` = diğer çalışma zamanı başlatma hataları.
- İki başlatıcı (`launch`, `launch-codex`), `setup-claude` / `setup-codex`
  tarafından yazılan bir profili seçmek için `--profile <name>` seçeneğini ve
  temel `claude` / `codex` ikili dosyasına iletilecek argümanları kabul eder.

Etkileşimli seçici, kurulum tarifleri tarafından da paylaşılır:

```bash
# Etkin yerel veya uzak model kataloğundan seçim yapın ve hedefi yapılandırın.
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` şu anda `codex`, `claude`, `opencode`, `qwen`, `aider`, `goose`,
`cline`, `continue`, `kilo` ve `5dive` için test edilmiş tariflere yönlendirir.
Yalnızca IDE'ye yönelik,
MITM ve yalnızca kılavuz niteliğindeki katalog girdileri açık `setup-*`/manuel
akışlar olarak kalır ve başlatılabilir hedefler olarak sunulmaz.

> `setup-opencode`, **hafif openai uyumlu** OpenCode entegrasyonudur.
> Ayrıca `@omniroute/opencode-plugin` paketini yükleyen daha zengin bir eklenti
> entegrasyonu da vardır: `omniroute setup opencode`. Bunlar farklı komutlardır;
> yukarıdaki tablo `setup-opencode` komutunu belgeler.
>
> Eklenti, her OpenCode ana sürümü için bir tane olmak üzere iki paket hâlinde
> gelir; çünkü iki yükleyici farklı giriş noktaları bekler:
> OpenCode v1 için `@omniroute/opencode-plugin` ve
> OpenCode v2 için `@omniroute/opencode-plugin-v2`. v2 paketi yenidir
> (`0.1.0`) ve hâlâ değişmekte olan bir ana makine sözleşmesini izlediğinden,
> belirli bir biçim varsaymak yerine OpenCode'un katalog taslağına yerleştirdiği
> biçimi okur. Paketi, `opencode.json` dosyasına bir `plugins` girdisi ekleyerek
> yükleyin; `omniroute setup opencode` hâlâ v1 paketini yükler. Seçenekler ve
> kimlik bilgisi arama sırası paket README dosyasında yer alır.

---

## Yerel kullanım

OmniRoute `localhost:20128` üzerinde çalışırken aracınız için kurulum komutunu çalıştırmanız yeterlidir. Katalog yerel sunucudan alınır.

```bash
# Codex: eşleşen her model için ~/.codex/ içine bir profil yaz
omniroute setup-codex
codex --profile glm52            # oluşturulan bir profili kullan

# Claude Code: model başına profilleri yaz, ardından birini başlat
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: openai uyumlu sağlayıcıyı tüm katalog modelleriyle yaz
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # {env:OMNIROUTE_API_KEY} üzerinden başvurulur, asla diske yazılmaz
opencode -m omniroute/glm/glm-5.2 "..."

# Otomatik keşif özelliği olmayan araçlar açıkça belirtilen bir modele ihtiyaç duyar:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# Hiçbir şey yazmadan önizle:
omniroute setup-continue --dry-run
```

Hiçbir yapılandırma yazmadan başlatın (yalnızca ortam değişkeni enjeksiyonu):

```bash
omniroute launch                 # Claude Code → yerel OmniRoute
omniroute launch-codex           # Codex CLI → yerel OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# Açık komut yolu: -- sonrasında gelen her şeyi olduğu gibi aktar
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## Uzak kullanım

Herhangi bir kurulum komutunu `--remote` + `--api-key` ile uzak bir OmniRoute'a yönlendirin. Katalog uzak sunucudan alınır; yapılandırma ise yerel makinenize yazılır.

```bash
# Uzak bir VPS üzerindeki OpenCode; yalnızca glm/kimi modellerini tut
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # önce OMNIROUTE_API_KEY değerini dışa aktar

# Uzak bir katalogdan Codex profilleri
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# Bir CLI'ı doğrudan uzak sunucuya karşı başlat
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

Her seferinde `--remote`/`--api-key` geçirmek yerine bir kez oturum açın ve **etkin bağlamın** bunları otomatik olarak sağlamasına izin verin:

```bash
omniroute connect 192.168.0.15        # kapsamlı bir belirteç oluşturur, bağlamı saklar
omniroute setup-codex                 # ← artık uzak kataloğu kullanır
omniroute setup-opencode              # ← aynı şekilde
omniroute launch                      # ← uzak sunucuya karşı Claude Code
```

Bağlamlar, kapsamlar ve belirteç yönetimi için [Uzak Mod](./REMOTE-MODE.md) bölümüne bakın.

---

## 5dive ajan filoları

[5dive](https://5dive.ai), her biri kendi Unix kullanıcısı altında bir systemd birimi olan, uzun süre çalışan kodlama ajanlarından oluşan bir filo çalıştırır. Kendisi bir kodlama CLI'ı değildir; dolayısıyla `omniroute run` tarafından başlatılacak bir şey yoktur — `5dive` **yalnızca yapılandırma** hedefidir.

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

Her iki biçim de bir 5dive **kimlik doğrulama profili** yazar ve bu profile bağlı her `claude` lisansı bundan sonra OmniRoute ile iletişim kurar. Bu hedefe özgü üç nokta vardır:

- **Filo ana makinesinde root olarak çalışır.** 5dive komutları yerel systemd birimleri ve root'a ait bir durum dizini üzerinde işlem yapar; uzak mod yoktur. Tarif, zaten root olarak çalışmıyorsa `sudo` üzerinden kendini yeniden çalıştırır (`--no-sudo` bunu devre dışı bırakır ve bunun yerine komutu yazdırır).
- **Geri döngü adresi olmadığı sürece uç nokta `https://` olmalıdır.** Ajanın API anahtarı her istekte bu URL üzerinden taşınır ve 5dive, makine dışındaki şifrelenmemiş bir uç noktayı reddeder. Özel bir LAN adresi de istisna değildir.
- **Her lisansın kendi model sabitlemesi, profile göre önceliklidir.** Profil `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL` değerlerini taşır; ancak standart bir model kimliğine sabitlenmiş bir lisans, ilk turunda _"Seçilen modelle ilgili bir sorun var"_ hatasıyla başarısız olur. Lisansları da sabitlemek için `--agent <name>` seçeneğini (tekrarlanabilir) geçirin; bunu yapmadığınızda tarif komutu yazdırır.

API anahtarı 5dive'a **stdin** üzerinden (`--api-key=-`) verildiği için hiçbir zaman `ps` çıktısında görünmez.

Profili tek bir model yerine bir OmniRoute **kombosuna** yönlendirmek, filoya sağlayıcı yük devretme özelliğini kazandırır: [#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578) üzerinde kaydedilen çalıştırmada birincil uç nokta turun ortasında tamamen devre dışı kaldığında ajan, kalan adımlarını yedek uç noktada tamamladı ve kesintiyi hiçbir zaman kullanıcıya yansıtmadı.

---

## Temel URL kuralları (hangi araçların `/v1` istediği)

OmniRoute, OpenAI yüzeyini `/v1` altında, Anthropic yüzeyini kök dizinde
ve yerel Gemini yüzeyini `/v1beta` altında sunar. Her entegrasyon, aracın
beklediği biçime göre yapılandırılmıştır (komut kaynağında doğrulanmıştır):

| Entegrasyon                                                                | Yazılan temel URL | `/v1`?                                       |
| -------------------------------------------------------------------------- | ----------------- | -------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | kök               | Hayır — Cline `/v1/chat/completions` ekler   |
| `setup-goose` (`OPENAI_HOST`)                                              | kök               | Hayır — Goose yolu ekler                     |
| `setup-aider` (`OPENAI_API_BASE`)                                          | kök               | Hayır — LiteLLM `/v1/chat/completions` ekler |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | `/v1` ile         | Evet                                         |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | kök               | Hayır — Claude Code `/v1/messages` ekler     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | `/v1` ile         | Evet                                         |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | `/v1` ile         | Evet                                         |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | kök               | Hayır — SDK `/v1beta/models/…` ekler         |
| `setup-5dive` (kimlik doğrulama profilindeki `ANTHROPIC_BASE_URL`)         | kök               | Hayır — Claude Code `/v1/messages` ekler     |

---

## Güncelleme sırasında yerel bağımlılıkları koruma: `--include=optional`

`omniroute update` ile güncelleme yaptığınızda (onayladıktan sonra veya `--apply`
ile), OmniRoute kurulumu yerleşik olarak `--include=optional` seçeneğiyle çalıştırır:

```bash
npm install -g omniroute@latest --include=optional
```

Bu, `omniroute update` komutuna ilettiğiniz bir seçenek **değildir** — güncelleyici
tarafından her zaman uygulanır. npm yapılandırmanızda `omit=optional` ayarlanmış
olsa bile `optionalDependencies` bağımlılıklarının (`better-sqlite3`, `keytar`,
`tls-client`, LLMLingua SLM yığını) güncelleme sonrasında korunmasını garanti eder;
aksi takdirde yerel SQLite sürücüsü ve işletim sistemi anahtarlığı bağlaması sessizce
kaldırılırdı. Uygulamadan tam komutu önizlemek için:

```bash
omniroute update --dry-run
# [KURU ÇALIŞTIRMA] Çalıştırılacak komut: npm install -g omniroute@latest --include=optional
```

Diğer `omniroute update` seçenekleri (kaynakta doğrulanmıştır): `--check` (güncel
değilse 1 koduyla çık), `--apply` (sormadan kur), `--changelog`, `--no-backup`,
`--yes`.

---

## `omniroute run gemini` aracılığıyla Google Gemini CLI

Sözleşme `@google/gemini-cli` 0.50.0 ile doğrulanmıştır: CLI,
`GOOGLE_GEMINI_BASE_URL` değişkenini dikkate alır ve buna karşı
`POST /v1beta/models/<model>:generateContent` (ve
`:streamGenerateContent?alt=sse`) isteklerini gönderir — bu, OmniRoute'un yerel
Gemini yüzeyiyle (`/v1beta`) tam olarak eşleşir. `omniroute run gemini` bunu
otomatik olarak yapılandırır:

- `GOOGLE_GEMINI_BASE_URL` → etkin OmniRoute temel URL'si (kök, `/v1` olmadan);
- `GEMINI_API_KEY` → çözümlenen OmniRoute kimlik bilgisi (seçenek/ortam/bağlam);
- `.gemini/settings.json` dosyası `gemini-api-key` kimlik doğrulamasını seçen
  **geçici ve yalıtılmış bir `GEMINI_CLI_HOME`**; böylece saklanan bir Google OAuth
  oturumu (Code Assist), OmniRoute'a yönlendirilen başlatmayı hiçbir zaman geçersiz
  kılmaz — çıkıştan sonra kaldırılır;
- **ortam hijyeni**: alt işlemin ortamından `GOOGLE_API_KEY`,
  `GOOGLE_GENAI_USE_VERTEXAI` ve `GOOGLE_GENAI_USE_GCA` kaldırılır (bunlar kimlik
  doğrulamayı Vertex/Code Assist'e yönlendirirdi) ve ek güvence olarak
  `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` ayarlanır — diğer `run` hedefleri de
  kendi çakışan değişkenleri için aynı işleme tabi tutulur;
- `--provider`/`--model` üzerinden `--model <id>` ekleme.

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Gemini'nin çalışma alanı güven koruması başsız modda da geçerlidir — `--skip-trust`
seçeneğini kendiniz iletin (veya dizine etkileşimli olarak güvenin); başlatıcı bunu
bilerek atlamaz. Bu başlatıcı, `/dashboard/acp-agents` için aracı protokolü
entegrasyonu olarak kalmaya devam eden **ACP kaydından**
(`src/lib/acp/registry.ts`, `gemini --acp`) farklıdır.

---

## Gerçek smoke taraması (isteğe bağlı)

Deterministik başlatma planı regresyon testleri CI'da (`tests/unit/cli/run-command.test.ts`,
`tests/unit/cli/run-execution.test.ts`) çalışır. GERÇEK çalıştırılabilir dosyaları GERÇEK bir
OmniRoute sunucusuna karşı doğrulamak için
`tests/integration/upstream-cli-smoke.int.test.ts` konumunda isteğe bağlı bir test düzeneği bulunur. Bu düzenek hiçbir zaman otomatik olarak çalışmaz
(`RUN_CLI_SMOKE=1` ayarlanmadıkça her alt test atlanır), kimlik bilgisini DEĞER olarak değil, ortam değişkeni ADI olarak iletir, kaydedilen tüm çıktılardaki anahtar biçimli dizeleri maskeler, çalıştırılabilir dosyası yüklü olmayan hedefleri atlar ve hataları yalnızca bir mantıksal değer yerine
kimlik doğrulama / upstream / yapılandırma olarak sınıflandırır:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

İsteğe bağlı: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` taramayı belirtilen hedeflerle sınırlar;
`OMNIROUTE_SMOKE_TIMEOUT_MS`, hedef başına 120 saniyelik zaman aşımını geçersiz kılar.

---

## Ayrıca bkz.

- [Claude Code yapılandırması](./CLAUDE-CODE-CONFIGURATION.md) — ayrıntılı Claude Code kılavuzu
- [Codex CLI yapılandırması](./CODEX-CLI-CONFIGURATION.md) — tek seferlik `[model_providers.omniroute]` temel kurulumu
- [Uzak Mod](./REMOTE-MODE.md) — bağlamlar, kapsamlı erişim token'ları ve uzak bir sunucunun yönetilmesi
- [CLI Araçları referansı](../reference/CLI-TOOLS.md) — desteklenen araçların ve pano sayfalarının eksiksiz kataloğu
- [Kurulum Kılavuzu](./SETUP_GUIDE.md) — yükleme yöntemleri ve ilk çalıştırma süreci
