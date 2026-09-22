# 📖 Setup Guide — OmniRoute (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> OmniRoute üçün tam quraşdırma təlimatı. Qısa versiya üçün [README-dəki Sürətli Başlanğıca](../README.md#-quick-start) baxın.

## Mündəricat

- [Quraşdırma üsulları](#install-methods)
- [CLI alətinin konfiqurasiyası](#cli-tool-configuration)
- [Protokolun quraşdırılması (MCP + A2A)](#protocol-setup-mcp--a2a)
- [Taym-aut konfiqurasiyası](#timeout-configuration)
- [Ayrılmış port rejimi](#split-port-mode)
- [Void Linux (xbps-src)](#void-linux-xbps-src-template)
- [Silinmə](#uninstalling)

---

## Quraşdırma üsulları

### npm (tövsiyə olunur)

```bash
npm install -g omniroute
omniroute
```

İdarəetmə paneli `http://localhost:20128` ünvanında açılır və API baza URL-i `http://localhost:20128/v1` olur.

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **pnpm istifadəçiləri:** `better-sqlite3` və `@swc/core` üçün yerli qurma skriptlərini aktivləşdirmək məqsədilə `--allow-build` bayrağı tələb olunur. `pnpm approve-builds -g` əmri pnpm v11-də qlobal quraşdırmalar üçün dəstəklənmir.

### Arch Linux (AUR)

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

[AUR paketi](https://aur.archlinux.org/packages/omniroute-bin) OmniRoute-u quraşdırır və systemd istifadəçi xidməti təqdim edir.

### Mənbə kodundan

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Windows qeydi:** Standart olaraq, köhnə `%USERPROFILE%\.omniroute` qovluğu mövcud olmadıqda OmniRoute `%APPDATA%\omniroute` yolundan istifadə edir. Fərqli məlumat qovluğu məkanı seçmək üçün `DATA_DIR` təyin edin.

> **Qeyd:** `npm install` ilk işə salınma zamanı `.env.example` əsasında avtomatik olaraq `.env` yaradır. Sonrakı quraşdırmalar mövcud `.env` faylının üzərinə yazmayacaq, buna görə fərdiləşdirmələr qorunur. Yenidən ilkin vəziyyətə gətirmək üçün təkrar işə salmazdan əvvəl `.env` faylını silin.

### Docker

Compose profilləri və Caddy HTTPS daxil olmaqla tam Docker quraşdırması üçün [Docker Təlimatına](./DOCKER_GUIDE.md) baxın.

### Masaüstü tətbiqi (Electron)

OmniRoute, Electron 41 + electron-builder 26.10 əsasında hazırlanmış masaüstü örtüyü ilə təqdim olunur. Mövcud skriptlər (iş sahəsinin kök qovluğu):

```bash
npm run electron:dev          # Masaüstü tətbiqini avtomatik yenidən yükləmə ilə işə salın
npm run electron:build        # Cari ƏS üçün qurun (avtomatik aşkarlanır)
npm run electron:build:win    # Windows quraşdırıcısı (NSIS + portativ)
npm run electron:build:mac    # macOS (dmg + zip, arm64+x64)
npm run electron:build:linux  # Linux (AppImage + deb + rpm)
npm run electron:smoke:packaged  # Paketlənmiş quruluşun tüstü testini aparın
```

Masaüstü quraşdırıcılarının buraxılışları GitHub Releases səhifəsinə əlavə olunur. Electron haqqında ətraflı məlumat (imzalama, IPC körpüsü, distributivlər) üçün [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) sənədinə baxın _(sonrakı mərhələdə yaradılıb)_.

### İnterfeyssiz server (CI/avtomatlaşdırma)

Nəzarətsiz quraşdırmalar (Docker, Kubernetes, CI) üçün bunlardan istifadə edin:

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

Mühit dəyişənləri (`INITIAL_PASSWORD`, `OMNIROUTE_WS_BRIDGE_SECRET` və s.) ilə birlikdə bu, OmniRoute instansiyasını tamamilə skriptləşdirilə bilən şəkildə işə salmağa imkan verir.

### CLI seçimləri

| Əmr                     | Təsvir                                                                                                         |
| ----------------------- | -------------------------------------------------------------------------------------------------------------- |
| `omniroute`             | Serveri başladın (`PORT=20128`, API və idarəetmə paneli eyni portda)                                           |
| `omniroute setup`       | Parol və ilk provayder üçün istiqamətləndirilən CLI ilkin quraşdırması                                         |
| `omniroute doctor`      | Serveri başlatmadan lokal sağlamlıq yoxlamalarını işə salın                                                    |
| `omniroute providers`   | CLI-dən provayderləri kəşf edin, siyahıya alın, doğrulayın və sınaqdan keçirin                                 |
| `omniroute config`      | CLI alətinin konfiqurasiyası — konfiqurasiyaları siyahıya alın, əldə edin, təyin edin və doğrulayın            |
| `omniroute status`      | Oflayn status paneli — versiya, DB, alətlər, konfiqurasiya                                                     |
| `omniroute logs`        | API-dən istifadə jurnallarını axınla göstərin (`--follow` dəstəklənir)                                         |
| `omniroute update`      | OmniRoute yeniləmələrini yoxlayın və ya tətbiq edin                                                            |
| `omniroute provider`    | Provayder bağlantılarını idarə edin — əlavə edin, siyahıya alın, silin, sınaqdan keçirin, standartı təyin edin |
| `omniroute --port 3000` | Kanonik/API portunu 3000 olaraq təyin edin                                                                     |
| `omniroute --mcp`       | MCP serverini başladın (stdio nəqli)                                                                           |
| `omniroute --no-open`   | Brauzeri avtomatik açmayın                                                                                     |
| `omniroute --help`      | Yardımı göstərin                                                                                               |

İnterfeyssiz quraşdırma bayraqlar və ya mühit dəyişənləri ilə skriptləşdirilə bilər:

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

İdarəetmə panelini açmadan lokal diaqnostikanı işə salın:

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

İdarəetmə panelini açmadan SSH və ya skriptlər vasitəsilə provayderləri idarə edin:

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

## CLI Alətinin Konfiqurasiyası

### 1) Provayderləri Qoşun və API Açarı Yaradın

1. İdarəetmə panelində → `Providers` bölməsini açın və ən azı bir provayderi qoşun (OAuth və ya API açarı).
2. İdarəetmə panelində → `Endpoints` bölməsini açın və API açarı yaradın.
3. (İstəyə bağlı) İdarəetmə panelində → `Combos` bölməsini açın və ehtiyat keçid zəncirinizi təyin edin.

### 2) Kodlaşdırma Alətinizi Yönləndirin

```txt
Baza URL-i: http://localhost:20128/v1
API açarı:  [Endpoint səhifəsindən kopyalayın]
Model:      if/qwen3.8-max-preview (və ya istənilən provayder/model prefiksi)
```

Əgər redaktorunuz `Authorization: Bearer ...` göndərə bilmirsə, əvəzində tokenləşdirilmiş uyğunluq bazasından istifadə edin:

```txt
Baza URL-i: http://localhost:20128/api/v1/vscode/YOUR_KEY/
Modellər URL-i: http://localhost:20128/api/v1/vscode/YOUR_KEY/models
Söhbət URL-i: http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
Ollama teqləri URL-i: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Claude Code, Codex CLI, Cursor, Cline, OpenClaw, OpenCode və OpenAI ilə uyğun SDK-larla işləyir.

#### `setup-*` ilə avtomatik konfiqurasiya

Baza URL-ini və açarı əl ilə daxil etmək əvəzinə, OmniRoute-un aktiv model kataloqu əsasında hər alətin
öz konfiqurasiyasını yazmasına icazə verin. Hər alət üçün bir əmr:

```bash
omniroute setup-codex        # ~/.codex/<name>.config.toml profilləri
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json (OpenAI ilə uyğun)
omniroute setup-cline        # Cline CLI + VS Code genişləndirməsinin parametrləri
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml (Continue / cn)
omniroute setup-cursor       # Cursor-un tətbiqdaxili addımlarını göstərir
omniroute setup-roo          # Roo Code idxalı + autoImport göstəricisi
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

Hər biri lokal aləti **uzaq** OmniRoute-a qarşı konfiqurasiya etmək üçün `--remote <url> --api-key <key>`, önizləmə üçün isə `--dry-run` qəbul edir. Düzgün
mühit dəyişənləri daxil edilmiş şəkildə və ümumiyyətlə heç bir konfiqurasiya yazmadan CLI-ni işə salmaq üçün ümumi başlatma əmrindən
`omniroute run <target>` (claude, codex, aider, goose, opencode, qwen, gemini) istifadə edin;
hər alət üçün köhnə başlatma əmrləri `omniroute launch` (Claude Code) və
`omniroute launch-codex` (Codex) hələ də əlçatandır.

Tam cədvəl (hər əmrin nə yazdığı, bütün bayraqlar, lokal və uzaq rejimlər, baza URL-i
üçün `/v1` qaydaları) üçün **[CLI İnteqrasiyaları](./CLI-INTEGRATIONS.md)** bölməsinə baxın.

Hər alət üzrə ətraflı konfiqurasiya (Claude Code, Codex CLI, Cursor, Cline, OpenClaw, Kilo Code, Copilot və digərləri) üçün ayrıca **[CLI Alətləri Təlimatı](../reference/CLI-TOOLS.md)** sənədinə baxın.

---

## Protokolun Quraşdırılması (MCP + A2A)

### MCP Quraşdırılması (Model Konteksti Protokolu)

MCP nəqlini stdio rejimində başladın:

```bash
omniroute --mcp
```

Tövsiyə olunan yoxlama ardıcıllığı:

```bash
# 1. MCP serverini başladın
omniroute --mcp

# 2. MCP klientinizdən bunları çağırın:
omniroute_get_health        # Sistem sağlamlığını qaytarmalıdır
omniroute_list_combos       # Aktiv kombinasiyaları qaytarmalıdır

# 3. Və ya tam E2E dəstini işə salın:
npm run test:protocols:e2e
```

#### MCP Klientinin Konfiqurasiyası

**Claude Code:**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline:**

MCP parametrlərinizə əlavə edin:

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

**Tam MCP sənədləri:** [MCP Serverinin README-si](../../open-sse/mcp-server/README.md) — 110 alət, IDE konfiqurasiyaları, Python/TS/Go klientləri.

### A2A Quraşdırılması (Agentlərarası Protokol)

Agent Kartını yoxlayın:

```bash
curl http://localhost:20128/.well-known/agent.json
```

Tapşırıq göndərin:

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**Tam A2A sənədləri:** [A2A Serverinin README-si](../../src/lib/a2a/README.md) — JSON-RPC 2.0, bacarıqlar, axınla ötürmə, tapşırığın həyat dövrü.

---

## Taymaut Konfiqurasiyası

### Əsas Taymautlar

Əksər yerləşdirmələr üçün yalnız bu iki dəyişənə ehtiyacınız var:

| Dəyişən                  | Defolt                                   | Məqsəd                                                                                                                                                              |
| ------------------------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                                 | Yuxarı axın cavabının başlaması üçün taymaut, gizli Undici taymautları, TLS rəqəmsal iz sorğuları və API körpüsünün sorğu/proksi taymautları üçün ortaq baza dəyəri |
| `STREAM_IDLE_TIMEOUT_MS` | `REQUEST_TIMEOUT_MS` dəyərini miras alır | OmniRoute-un SSE axınını dayandırmasından əvvəl axın fraqmentləri arasındakı maksimum fasilə                                                                        |

Geriyə uyğunluq qorunur: mövcud `FETCH_TIMEOUT_MS`, `API_BRIDGE_PROXY_TIMEOUT_MS` və digər təbəqə üzrə taymaut dəyişənləri işləməyə davam edir və ortaq baza dəyərini üstələyir.

### Provayderə Xas Qeydlər

Claude Code ilə uyğun yuxarı axınlar (`anthropic-compatible-cc-*`) üçün OmniRoute çıxış `X-Stainless-Timeout` başlığını hesablanmış fetch taymautundan əldə edir ki, provayder tərəfindəki oxuma taymautları mühit konfiqurasiyanızla uyğun qalsın.

Üçüncü tərəf Claude Code ilə uyğun əks proksilər üçün OmniRoute defolt `anthropic-beta` dəstini məhdud saxlayır və `Client Cache Control` parametri `Auto` olaraq qaldıqda yalnız müştəri tərəfindən təqdim edilən `cache_control` markerlərini ötürür. Yalnız yuxarı axın redaktə edilmiş Claude düşüncə axınlarını xüsusi olaraq tələb etdikdə hər bağlantı üçün "Enable redact-thinking beta" keçidini aktivləşdirin.

### Təkmil Taymaut Əvəzetmələri

| Dəyişən                                  | Defolt                                                  | Məqsəd                                                                              |
| ---------------------------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | `REQUEST_TIMEOUT_MS` dəyərini miras alır                | Cavab başlıqları gələnədək istifadə olunan yuxarı axın cavabının başlanma taymautu  |
| `FETCH_HEADERS_TIMEOUT_MS`               | `FETCH_TIMEOUT_MS` dəyərini miras alır                  | Yuxarı axın cavab başlıqlarının alınması üçün Undici vaxt limiti                    |
| `FETCH_BODY_TIMEOUT_MS`                  | `FETCH_TIMEOUT_MS` dəyərini miras alır                  | Yuxarı axın gövdəsi fraqmentləri arasında Undici vaxt limiti (`0` onu deaktiv edir) |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                                 | Undici TCP bağlantı taymautu                                                        |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                                  | Undici-nin boş keep-alive soketi üçün taymaut                                       |
| `TLS_CLIENT_TIMEOUT_MS`                  | `FETCH_TIMEOUT_MS` dəyərini miras alır                  | `wreq-js` vasitəsilə edilən TLS rəqəmsal iz sorğuları üçün taymaut                  |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | `REQUEST_TIMEOUT_MS` və ya `600000` dəyərini miras alır | API portundan idarəetmə paneli portuna `/v1` proksi yönləndirməsi üçün taymaut      |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)`              | API körpü serverində daxil olan sorğu üçün taymaut                                  |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                                 | API körpü serverində daxil olan başlıqlar üçün taymaut                              |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                                  | API körpü serverində keep-alive taymautu                                            |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                                     | API körpü serverində soket fəaliyyətsizliyi taymautu (`0` onu deaktiv edir)         |

> **Qeyd:** Axın sorğuları üçün `FETCH_TIMEOUT_MS` yalnız bağlantının qurulmasını / ilk yuxarı axın cavabının gözlənilməsini əhatə edir. Axın aktiv olduqdan sonra OmniRoute yalnız faktiki dayanma (`STREAM_IDLE_TIMEOUT_MS`) və ya Undici gövdə fəaliyyətsizliyi (`FETCH_BODY_TIMEOUT_MS`) baş verdikdə onu dayandıracaq.

### Əks Proksi Uyğunluğu

OmniRoute-u Nginx, Caddy, Cloudflare və ya başqa bir əks proksinin arxasında işlədirsinizsə, proksi taymautlarının da OmniRoute axın/fetch taymautlarından yüksək olduğuna əmin olun.

---

## Ayrı Port Rejimi

Qabaqcıl ssenarilər (əks proksi, konteyner şəbəkəsi) üçün API və İdarəetmə panelini ayrı-ayrı portlarda işə salın:

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:              http://localhost:20128/v1
# İdarəetmə paneli: http://localhost:20129
```

---

## Void Linux (`xbps-src`) Şablonu

Void Linux istifadəçiləri `xbps-src` vasitəsilə yerli paket yarada bilərlər. Bu bloku `srcpkgs/omniroute/template` kimi yadda saxlayın:

```bash
# 'omniroute' üçün şablon faylı
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
# Hər buraxılış üçün yoxlama cəmini aşağıdakı əmrlə yenidən yaradın:
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

## Silinmə

| Əmr                      | Əməliyyat                                                                                                           |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `npm run uninstall`      | Sistem tətbiqini silir, lakin `~/.omniroute` daxilindəki **verilənlər bazanızı və konfiqurasiyalarınızı saxlayır**. |
| `npm run uninstall:full` | Tətbiqi silir VƏ **bütün konfiqurasiyaları, açarları və verilənlər bazalarını həmişəlik silir**.                    |

> Bütün üsullar üzrə ətraflı silinmə təlimatları üçün [UNINSTALL.md](./UNINSTALL.md) sənədinə baxın.
