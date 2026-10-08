# 📖 Setup Guide — OmniRoute (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> OmniRoute için eksiksiz kurulum başvurusu. Hızlı sürüm için [README'deki Hızlı Başlangıç](../README.md#-quick-start) bölümüne bakın.

## İçindekiler

- [Kurulum Yöntemleri](#install-methods)
- [CLI Aracı Yapılandırması](#cli-tool-configuration)
- [Protokol Kurulumu (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Zaman Aşımı Yapılandırması](#timeout-configuration)
- [Bölünmüş Port Modu](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Kaldırma](#uninstalling)

---

## Kurulum Yöntemleri

### npm (önerilen)

```bash
npm install -g omniroute
omniroute
```

Kontrol paneli `http://localhost:20128` adresinde açılır ve API temel URL'si `http://localhost:20128/v1` olur.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **pnpm kullanıcıları:** `better-sqlite3` ve `@swc/core` için yerel derleme betiklerini etkinleştirmek üzere `--allow-build` bayrağı gereklidir. `pnpm approve-builds -g` komutu, pnpm v11'de genel kurulumlar için desteklenmez.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

[AUR paketi](https://aur.archlinux.org/packages/omniroute-bin), OmniRoute'u kurar ve bir systemd kullanıcı hizmeti sağlar.

### Kaynaktan

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Windows notu:** Eski `%USERPROFILE%\.omniroute` dizini mevcut değilse OmniRoute varsayılan olarak `%APPDATA%\omniroute` dizinini kullanır. Farklı bir veri dizini konumu seçmek için `DATA_DIR` değişkenini ayarlayın.

> **Not:** `npm install`, ilk çalıştırmada `.env.example` dosyasından otomatik olarak `.env` oluşturur. Sonraki kurulumlar mevcut bir `.env` dosyasının üzerine yazmaz; böylece özelleştirmeler korunur. Yeniden oluşturmak için komutu tekrar çalıştırmadan önce `.env` dosyasını silin.

### Docker

Compose profilleri ve Caddy HTTPS dahil eksiksiz Docker kurulumu için [Docker Kılavuzu](./DOCKER_GUIDE.md) belgesine bakın.

### Masaüstü Uygulaması (Electron)

OmniRoute, Electron 41 + electron-builder 26.10 üzerine kurulu bir masaüstü sarmalayıcısıyla birlikte gelir. Kullanılabilir betikler (çalışma alanı kökü):

```bash
npm run electron:dev          # Masaüstü uygulamasını çalışırken yeniden yüklemeyle çalıştır
npm run electron:build        # Geçerli işletim sistemi için derle (otomatik algılanır)
npm run electron:build:win    # Windows yükleyicisi (NSIS + taşınabilir)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Paketlenmiş derlemeye duman testi uygula
```

Masaüstü yükleyicilerinin sürümleri GitHub Releases sayfasına eklenir. Electron hakkında ayrıntılı bilgi (imzalama, IPC köprüsü, dağıtımlar) için [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) belgesine bakın _(daha sonraki bir aşamada oluşturuldu)_.

### Başsız sunucu (CI/otomasyon)

Gözetimsiz kurulumlar (Docker, Kubernetes, CI) için şunları kullanın:

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

Ortam değişkenleriyle (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET` vb.) birlikte kullanıldığında bu, tamamen betiklerle yönetilebilen bir OmniRoute örneği başlatmanıza olanak tanır.

### CLI Seçenekleri

| Komut                   | Açıklama                                                                              |
| ----------------------- | ------------------------------------------------------------------------------------- |
| `omniroute`             | Sunucuyu başlat (`PORT=20128`, API ve kontrol paneli aynı portta)                     |
| `omniroute setup`       | Parola ve ilk sağlayıcı için rehberli CLI başlangıç kurulumu                          |
| `omniroute doctor`      | Sunucuyu başlatmadan yerel sistem durumu denetimlerini çalıştır                       |
| `omniroute providers`   | Sağlayıcıları CLI üzerinden keşfet, listele, doğrula ve test et                       |
| `omniroute config`      | CLI aracı yapılandırması — yapılandırmaları listele, al, ayarla ve doğrula            |
| `omniroute status`      | Çevrimdışı durum paneli — sürüm, DB, araçlar ve yapılandırma                          |
| `omniroute logs`        | API'den kullanım günlüklerini akışla (`--follow` desteklenir)                         |
| `omniroute update`      | OmniRoute güncellemelerini denetle veya uygula                                        |
| `omniroute provider`    | Sağlayıcı bağlantılarını yönet — ekle, listele, kaldır, test et ve varsayılanı ayarla |
| `omniroute --port 3000` | Standart/API portunu 3000 olarak ayarla                                               |
| `omniroute --mcp`       | MCP sunucusunu başlat (stdio aktarımı)                                                |
| `omniroute --no-open`   | Tarayıcıyı otomatik olarak açma                                                       |
| `omniroute --help`      | Yardımı göster                                                                        |

Başsız kurulum, bayraklar veya ortam değişkenleri kullanılarak betikleştirilebilir:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

Kontrol panelini açmadan yerel tanılamaları çalıştırın:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

Kontrol panelini açmadan sağlayıcıları SSH veya betikler üzerinden yönetin:

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

## CLI Aracı Yapılandırması

### 1) Sağlayıcıları Bağlayın ve API Anahtarı Oluşturun

1. Dashboard → `Providers` bölümünü açın ve en az bir sağlayıcı bağlayın (OAuth veya API anahtarı).
2. Dashboard → `Endpoints` bölümünü açın ve bir API anahtarı oluşturun.
3. (İsteğe bağlı) Dashboard → `Combos` bölümünü açın ve yedek zincirinizi ayarlayın.

### 2) Kodlama Aracınızı Yönlendirin

```txt
Temel URL: http://localhost:20128/v1
API Anahtarı:  [Endpoint sayfasından kopyalayın]
Model:    if/qwen3.8-max-preview (veya herhangi bir sağlayıcı/model ön eki)
```

Editörünüz `Authorization: Bearer ...` gönderemiyorsa bunun yerine belirteç içeren uyumluluk temel adresini kullanın:

```txt
Temel URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/
Modeller URL'si: http://localhost:20128/api/v1/vscode/YOUR_KEY/models
Sohbet URL'si: http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
Ollama Etiketleri URL'si: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode ve OpenAI uyumlu SDK'larla çalışır.

#### `setup-*` ile otomatik yapılandırma

Temel URL'yi ve anahtarı elle yapıştırmak yerine OmniRoute'un canlı model kataloğundan her aracın
kendi yapılandırmasını yazmasına izin verin. Her araç için bir komut:

```bash
omniroute setup-codex        # ~/.codex/<name>.config.toml profilleri
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (OpenAI uyumlu)
omniroute setup-cline        # Cline CLI + VS Code uzantısı ayarları
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # Cursor'ın uygulama içi adımlarını yazdırır
omniroute setup-roo          # Roo Code içe aktarma + autoImport işaretçisi
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

Her biri, yerel bir aracı **uzak** bir OmniRoute'a göre yapılandırmak için `--remote <url> --api-key <key>` parametrelerini ve önizleme için `--dry-run` parametresini kabul eder. Doğru
ortam değişkenleri eklenmiş ve hiçbir yapılandırma yazılmamış şekilde bir CLI başlatmak için genel başlatıcı
`omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini) komutunu kullanın;
eski araç başına başlatıcılar olan `omniroute launch` (Claude Code) ve
`omniroute launch-codex` (Codex) kullanılabilir olmaya devam eder.

Tam tablo (her komutun ne yazdığı, tüm parametreler, yerel ve uzak kullanım, temel URL
`/v1` kuralları) için **[CLI Entegrasyonları](./CLI-INTEGRATIONS.md)** bölümüne bakın.

Araç bazında ayrıntılı yapılandırma (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot ve daha fazlası) için özel **[CLI Araçları Kılavuzu](../reference/CLI-TOOLS.md)** bölümüne bakın.

---

## Protokol Kurulumu (MCP + A2A)

### MCP Kurulumu (Model Bağlam Protokolü)

MCP aktarımını stdio modunda başlatın:

```bash
omniroute --mcp
```

Önerilen doğrulama akışı:

```bash
# 1. MCP sunucusunu başlatın
omniroute --mcp

# 2. MCP istemcinizden şunları çağırın:
omniroute_get_health        # Sistem durumunu döndürmelidir
omniroute_list_combos       # Etkin kombinasyonları döndürmelidir

# 3. Veya E2E paketinin tamamını çalıştırın:
npm run test:protocols:e2e
```

#### MCP İstemci Yapılandırması

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

MCP ayarlarınıza ekleyin:

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

**Tam MCP dokümantasyonu:** [MCP Sunucusu README](../../open-sse/mcp-server/README.md) — 110 araç, IDE yapılandırmaları, Python/TS/Go istemcileri.

### A2A Kurulumu (Aracıdan Aracıya Protokolü)

Agent Card'ı doğrulayın:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Bir görev gönderin:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**Tam A2A dokümantasyonu:** [A2A Sunucusu README](../../src/lib/a2a/README.md) — JSON-RPC 2.0, beceriler, akış, görev yaşam döngüsü.

---

## Zaman Aşımı Yapılandırması

### Temel Zaman Aşımları

Çoğu dağıtım için yalnızca şu iki değişkene ihtiyacınız vardır:

| Değişken                 | Varsayılan                             | Amaç                                                                                                                                                            |
| ------------------------ | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                               | Üst kaynak yanıt başlangıcı zaman aşımı, gizli Undici zaman aşımları, TLS parmak izi istekleri ve API köprüsü istek/proxy zaman aşımları için ortak temel değer |
| `STREAM_IDLE_TIMEOUT_MS` | `REQUEST_TIMEOUT_MS` değerini devralır | OmniRoute'un SSE akışını sonlandırmasından önce akış parçaları arasında izin verilen maksimum süre                                                              |

Geriye dönük uyumluluk korunur: mevcut `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` ve katmana özgü diğer zaman aşımı değişkenleri çalışmaya devam eder ve ortak temel değeri geçersiz kılar.

### Sağlayıcıya Özgü Notlar

Claude Code uyumlu üst kaynaklar (`anthropic-compatible-cc-*`) için OmniRoute, sağlayıcı tarafındaki okuma zaman aşımlarının ortam yapılandırmanızla uyumlu kalması amacıyla giden `X-Stainless-Timeout` üst bilgisini çözümlenen getirme zaman aşımından türetir.

Üçüncü taraf Claude Code uyumlu ters proxy'ler için OmniRoute, varsayılan `anthropic-beta` kümesini ölçülü tutar ve `Client Cache Control`, `Auto` olarak bırakıldığında yalnızca istemci tarafından sağlanan `cache_control` işaretleyicilerini iletir. Bağlantı başına "Redact-thinking beta'yı etkinleştir" seçeneğini yalnızca üst kaynak özellikle redakte edilmiş Claude düşünme akışlarını gerektiriyorsa etkinleştirin.

### Gelişmiş Zaman Aşımı Geçersiz Kılmaları

| Değişken                                 | Varsayılan                                           | Amaç                                                                                        |
| ---------------------------------------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | `REQUEST_TIMEOUT_MS` değerini devralır               | Yanıt üst bilgileri gelene kadar kullanılan üst kaynak yanıt başlangıcı zaman aşımı         |
| `FETCH_HEADERS_TIMEOUT_MS`               | `FETCH_TIMEOUT_MS` değerini devralır                 | Üst kaynak yanıt üst bilgilerini almak için Undici süre sınırı                              |
| `FETCH_BODY_TIMEOUT_MS`                  | `FETCH_TIMEOUT_MS` değerini devralır                 | Üst kaynak gövde parçaları arasındaki Undici süre sınırı (`0` bu sınırı devre dışı bırakır) |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                              | Undici TCP bağlantı zaman aşımı                                                             |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                               | Undici boşta tutulan kalıcı bağlantı soketi zaman aşımı                                     |
| `TLS_CLIENT_TIMEOUT_MS`                  | `FETCH_TIMEOUT_MS` değerini devralır                 | `wreq-js` üzerinden yapılan TLS parmak izi istekleri için zaman aşımı                       |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | `REQUEST_TIMEOUT_MS` veya `600000` değerini devralır | API portundan pano portuna `/v1` proxy iletimi için zaman aşımı                             |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)`           | API köprüsü sunucusundaki gelen istek zaman aşımı                                           |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                              | API köprüsü sunucusundaki gelen üst bilgi zaman aşımı                                       |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                               | API köprüsü sunucusundaki kalıcı bağlantı zaman aşımı                                       |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                                  | API köprüsü sunucusundaki soket hareketsizliği zaman aşımı (`0` bunu devre dışı bırakır)    |

> **Not:** Akış istekleri için `FETCH_TIMEOUT_MS` yalnızca bağlantı kurulumunu / ilk üst kaynak yanıtını bekleme süresini kapsar. Akış etkin hâle geldiğinde OmniRoute yalnızca gerçek bir duraklama (`STREAM_IDLE_TIMEOUT_MS`) veya Undici gövde hareketsizliği (`FETCH_BODY_TIMEOUT_MS`) durumunda akışı sonlandırır.

### Ters Proxy Uyumluluğu

OmniRoute'u Nginx, Caddy, Cloudflare veya başka bir ters proxy arkasında çalıştırıyorsanız proxy zaman aşımlarının da OmniRoute akış/getirme zaman aşımlarınızdan daha yüksek olduğundan emin olun.

---

## Ayrı Port Modu

Gelişmiş senaryolar (ters proxy, konteyner ağları) için API'yi ve Dashboard'u ayrı portlarda çalıştırın:

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:       http://localhost:20128/v1
# Dashboard: http://localhost:20129
```

---

## Void Linux (xbps-src) Şablonu

Void Linux kullanıcıları, `xbps-src` kullanarak yerel bir paket oluşturabilir. Bu bloğu `srcpkgs/omniroute/template` olarak kaydedin:

```bash
# 'omniroute' için şablon dosyası
pkgname=omniroute
version=3.8.0
revision=1
hostmakedepends="nodejs python3 make"
depends="openssl"
short_desc="Universal AI gateway with smart routing for multiple LLM providers"
maintainer="zenobit <zenobit@disroot.org>"
license="MIT"
homepage="https://github.com/diegosouzapw/OmniRoute"
distfiles="https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz"
# Her sürüm için sağlama toplamını şu komutla yeniden oluşturun:
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

## Kaldırma

| Komut                    | İşlem                                                                                                        |
| ------------------------ | ------------------------------------------------------------------------------------------------------------ |
| `npm run uninstall`      | Sistem uygulamasını kaldırır ancak `~/.omniroute` içindeki **veritabanınızı ve yapılandırmalarınızı korur**. |
| `npm run uninstall:full` | Uygulamayı kaldırır VE **tüm yapılandırmaları, anahtarları ve veritabanlarını kalıcı olarak siler**.         |

> Tüm yöntemlere ilişkin ayrıntılı kaldırma talimatları için [UNINSTALL.md](./UNINSTALL.md) dosyasına bakın.
