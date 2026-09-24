# Repository Map (Türkçe)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Her dizin ve kök dosya için tek satırlık açıklama.**
> Son güncelleme: 2026-06-28 — OmniRoute v3.8.40
>
> Kod tabanında hızlıca gezinmek için bu haritayı kullanın. Ayrıntılı incelemeler için özel dokümanların bağlantılarını takip edin.

## Üst düzey dizin ağacı

```
OmniRoute/
├── src/                  # Next.js 16 uygulaması (UI + API rotaları + kütüphaneler + etki alanı + sunucu)
├── open-sse/             # Akış motoru çalışma alanı (işleyiciler, yürütücüler, çevirici, MCP sunucusu)
├── electron/             # Masaüstü sarmalayıcısı (Electron 41 + electron-builder 26.10)
├── bin/                  # CLI giriş noktası ve komut işleyicileri
├── scripts/              # Derleme, kontrol, eşitleme ve tek seferlik betikler
├── docs/                 # Herkese açık dokümantasyon (şu anda buradasınız)
├── tests/                # Tüm test paketleri (birim, entegrasyon, e2e, protokol istemcileri)
├── public/               # Next.js statik varlıkları, PWA bildirimi, service worker, simgeler
├── config/               # Statik yapılandırma + kalite kapısı durumu (i18n, payloadRules, quality/)
├── images/               # Pazarlama / README görsel varlıkları
├── @omniroute/           # Yayımlanabilir yardımcı paketler (opencode-plugin, opencode-provider)
├── skills/               # CLI/ajan beceri paketleri (cli-* + omni-* + config-codex-cli)
├── examples/             # Örnek eklentiler + omniroute-cmd-hello başlangıç şablonu
├── contrib/              # Topluluk katkıları (podman/)
├── .source/              # Fumadocs kaynak yapılandırması (source.config.mjs + server/browser/dynamic)
├── .github/              # GitHub Actions iş akışları + sorun şablonları + PR şablonu
├── .husky/               # Git kancaları (pre-commit, pre-push)
├── .claude/              # Claude Code eğik çizgi komutları (proje kapsamlı)
├── .agents/              # Codex / genel ajan iş akışları + beceriler (.claude/ yansısı)
├── .vscode/              # VS Code çalışma alanı ayarları
├── _ideia/               # Planlama notları (gayriresmî; dağıtıma dahil edilmez)
├── _mono_repo/           # Geçmiş alt projeler (cloud, site, vscode-extension)
├── _references/          # İlgili OSS projelerinden salt okunur referans klonları
├── _tasks/               # Sürüm başına görev izleme dosyaları (gayriresmî)
├── .build/ .worktrees/ dist/   # Yerel derleme / git-worktree / derleme çıktısı çalışma alanı (gitignored)
├── .issues/              # Yerel sorun önbelleği (gitignored)
├── .playwright-mcp/      # Playwright MCP test çıktıları
├── coverage/             # c8 kapsam çıktısı (gitignored)
├── logs/                 # Çalışma zamanı günlükleri (gitignored)
├── node_modules/         # Bağımlılıklar (gitignored)
├── package/              # npm pack hazırlama alanı (derleme çıktısı)
├── .next/                # Next.js derleme çıktısı (gitignored)
└── (kök dosyalar — aşağıya bakın)
```

---

## Kök dosyalar

| Dosya                                       | Amaç                                                                                                |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| **README.md**                               | Pazarlama açılış sayfası + hızlı başlangıç + özellik matrisi (ayrıca bkz. `llm.txt`)                |
| **CHANGELOG.md**                            | Sürüm bazında değişiklik günlüğü (`/version-bump-cc` becerisi tarafından otomatik oluşturulur)      |
| **LICENSE**                                 | MIT lisans metni                                                                                    |
| **CLAUDE.md**                               | Claude Code ajanları için proje kuralları (kesin kurallar, kurallar bütünü, senaryolar)             |
| **AGENTS.md**                               | CLAUDE.md ile aynı, ancak Claude dışındaki AI ajanları için (Codex, Cursor vb.)                     |
| **GEMINI.md**                               | Gemini tabanlı ajanlar için kısa kurallar (CLAUDE.md'nin alt kümesi)                                |
| **CONTRIBUTING.md**                         | Katkıda bulunanlar için rehber: kurulum, conventional commit'ler, test, PR akışı                    |
| **SECURITY.md**                             | Güvenlik açığı bildirim politikası, desteklenen sürümler, tehdit modeli                             |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — topluluk davranışına ilişkin beklentiler                                     |
| **llm.txt**                                 | LLM tarayıcıları için optimize edilmiş düz metin açılış sayfası (AI asistanları için SEO)           |
| **package.json**                            | npm manifestosu, betikler, bağımlılıklar, motorlar, c8 kapsam eşiği                                 |
| **package-lock.json**                       | Kilitlenmiş bağımlılık ağacı                                                                        |
| **tsconfig.json**                           | Kök TypeScript yapılandırması                                                                       |
| **tsconfig.typecheck-core.json**            | `src/` çekirdeği için tür denetimi yapılandırması                                                   |
| **tsconfig.typecheck-noimplicit-core.json** | Katı (`noImplicitAny`) tür denetimi                                                                 |
| **tsconfig.tsbuildinfo**                    | TS artımlı derleme önbelleği (gitignore kapsamında)                                                 |
| **next.config.mjs**                         | Next.js 16 derleme yapılandırması (bağımsız çıktı)                                                  |
| **next-env.d.ts**                           | Next.js tarafından otomatik oluşturulan ortam türleri                                               |
| **eslint.config.mjs**                       | Düz ESLint yapılandırması (proje alanına göre kurallar)                                             |
| **prettier.config.mjs**                     | Prettier biçimlendirme kuralları                                                                    |
| **postcss.config.mjs**                      | Tailwind/CSS işlem hattı için PostCSS yapılandırması                                                |
| **playwright.config.ts**                    | Playwright E2E test yapılandırması                                                                  |
| **vitest.config.ts**                        | Vitest yapılandırması (varsayılan paket)                                                            |
| **vitest.mcp.config.ts**                    | MCP sunucusu / autoCombo / önbellek paketleri için Vitest yapılandırması                            |
| **sonar-project.properties**                | SonarQube/SonarCloud yapılandırması (kod kalitesi)                                                  |
| **Dockerfile**                              | Çok aşamalı Docker derlemesi (builder → runner-base → runner-cli)                                   |
| **docker-compose.yml**                      | 4 profilli geliştirme compose'u (base, cli, host, cliproxyapi) + redis yardımcı konteyneri          |
| **docker-compose.prod.yml**                 | Üretim compose'u (port 20130, redis, adlandırılmış volume'ler)                                      |
| **.dockerignore**                           | Docker bağlamından hariç tutulan dosyalar                                                           |
| **fly.toml**                                | Fly.io dağıtım yapılandırması (bölge `sin`, port 20128, /data volume'ü)                             |
| **.env.example**                            | Ortam dosyası şablonu (ilk kurulumda otomatik olarak `.env` dosyasına kopyalanır)                   |
| **.gitignore**                              | Git yoksayma kalıpları                                                                              |
| **.npmignore**                              | npm yayınlama hariç tutma listesi                                                                   |
| **.npmrc**                                  | npm yapılandırması (kayıt defteri, lockfile politikası)                                             |
| **.node-version**                           | Node sürüm sabitlemesi (nvm uyumlu araçlar tarafından kullanılır)                                   |
| **.nvmrc**                                  | nvm için Node sürüm sabitlemesi                                                                     |
| **eslint.complexity.config.mjs**            | Karmaşıklık mandalı için ESLint yapılandırması (`scripts/check/check-complexity.mjs --config`)      |
| **eslint.sonarjs.config.mjs**               | SonarJS kuralları için ESLint yapılandırması (bilişsel karmaşıklık / yineleme)                      |
| **source.config.ts**                        | Fumadocs `defineDocs` kaynak yapılandırması (`.source/` girdisini sağlar)                           |
| **knip.json**                               | Knip yapılandırması — kullanılmayan dosyalar/dışa aktarımlar/bağımlılıklar (ölü kod eşiğini besler) |
| **stryker.conf.json**                       | Stryker mutasyon testi yapılandırması                                                               |
| **.size-limit.json**                        | size-limit paket bütçesi yapılandırması                                                             |
| **promptfooconfig.yaml**                    | promptfoo değerlendirme yapılandırması                                                              |
| **.gitleaks.toml**                          | gitleaks gizli bilgi tarama kural kümesi                                                            |
| **.zizmor.yml**                             | zizmor GitHub Actions güvenlik lint yapılandırması                                                  |
| **socket.yml**                              | Socket.dev tedarik zinciri yapılandırması                                                           |
| **news.json**                               | Yerelleştirilmiş v2 duyuru akışı; Radar lansman öğesi devre dışı olarak sunulur                     |
| **flake.nix** / **flake.lock**              | Nix geliştirme kabuğu tanımı + kilit                                                                |
| **.env**                                    | Yerel gizli bilgiler (gitignored — `.env.example` dosyasından oluşturulur)                          |

> **v3.8.26 sürümünde kök dizinden taşındı (düzenleme):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` ve oluşturulan `quality-metrics.json` (gitignored). Bkz. [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — Next.js uygulaması

```
src/
├── app/                 # App Router (sayfalar + API rotaları + durum sayfaları + açılış sayfası)
├── lib/                 # Temel kütüphaneler / alan modülleri (80 alt dizin + üst düzeyde ~70 dosya)
├── domain/              # Saf alan mantığı (politika motoru, geri dönüş, maliyet, kilitleme, comboResolver, değerlendirme)
├── server/              # Yalnızca sunucu modülleri (yetkilendirme işlem hattı, cors, kimlik doğrulama ara yazılımı) — istemciden içe aktarılamaz
├── shared/              # Güvenli olduğu durumlarda sunucu ve istemci arasında paylaşılır (sabitler, türler, doğrulama, sözleşmeler, yardımcı araçlar)
├── i18n/                # next-intl yapılandırması + yerel ayar başına mesaj JSON'u (42 yerel ayar)
├── middleware/          # Next.js ara yazılımı (istek zenginleştirme, yerel ayar algılama)
├── mitm/                # MITM proxy çekirdeği: sertifika oluşturma/yükleme, işleyiciler, hedefler, denetleyici, maskeler, doğrudan geçiş
│   ├── handlers/        # MitmHandlerBase'i genişleten 9 IDE aracısı işleyici sınıfı (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Trafik yakalama katmanı: arabellek (bellek içi halka), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Model bağdaştırıcı birleştirme kodu (eski uyumluluk katmanı)
├── scripts/             # Kaynak ağacı içi bakım betikleri (ör. backfillAggregation)
├── sse/                 # Eski SSE işleyicileri/hizmetleri (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Eski bellek içi depo (src/lib/db lehine aşamalı olarak kullanımdan kaldırılıyor)
├── types/               # Paylaşılan TS tür dosyaları
├── instrumentation.ts   # Next.js telemetri kancası (tarayıcı + edge)
├── instrumentation-node.ts  # Yalnızca Node enstrümantasyonu
└── proxy.ts             # HTTP proxy giriş uyumluluk katmanı
```

### `src/app/` — App Router (Next.js 16)

| Yol                                                                          | Amaç                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | Herkese açık OpenAI uyumlu API (~25 alt rota: sohbet, tamamlamalar, gömmeler, dosyalar, toplu işlemler, ses, görseller, videolar, müzik, yeniden sıralama, moderasyon, arama, ws, aracılar, hesaplar, sağlayıcılar vb.)                                                                                                |
| `app/api/v1beta/`                                                            | Gemini tarzı API uç noktaları                                                                                                                                                                                                                                                                                          |
| `app/api/playground/`                                                        | Playground Studio rotaları: `improve-prompt/` (POST — LLM istem yeniden yazıcısı), `presets/` (GET ile listeleme / POST ile oluşturma), `presets/[id]/` (GET / PUT / DELETE) — bkz. `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                             |
| `app/api/` (v1 olmayan)                                                      | Yönetim/yönetici rotaları (~60 dizin: sağlayıcılar, kombinasyonlar, ayarlar, mcp, a2a, değerlendirmeler, bellek, beceriler, web kancaları, uyumluluk, dayanıklılık, izleme, tüneller, cli araçları vb.)                                                                                                                |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST API — 12 rota (sunucu denetimi, aracı durumu/DNS/eşlemeleri, atlama, sertifika, yukarı akış CA'sı). LOCAL_ONLY + SPAWN_CAPABLE. Bkz. `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                             |
| `app/api/tools/traffic-inspector/`                                           | Traffic Inspector REST + WS API — 16+ rota (istekler, oturumlar, ana makineler, yakalama modları, dışa aktarma, ws). LOCAL_ONLY + SPAWN_CAPABLE. Bkz. `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                       |
| `app/a2a/`                                                                   | A2A JSON-RPC 2.0 giriş noktası (`POST /a2a`)                                                                                                                                                                                                                                                                           |
| `app/.well-known/agent.json/`                                                | A2A Aracı Kartı (keşif)                                                                                                                                                                                                                                                                                                |
| `app/(dashboard)/dashboard/`                                                 | Pano kullanıcı arayüzü sayfaları (50+ bölüm, ~118 page.tsx dosyası: sağlayıcılar, kombinasyonlar, ayarlar, bellek, beceriler, web kancaları, değerlendirmeler, denetim, toplu işlem, önbellek, maliyetler, sistem durumu, sistem, etkinlik vb.)                                                                        |
| `app/(dashboard)/dashboard/search-tools/`                                    | Search Tools Studio kullanıcı arayüzü (3 sekme: Arama/Kazıma/Karşılaştırma + SearchConceptCard + ProviderCatalog) — bkz. `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                      |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (plan 21): `page.tsx` (3 sekmeli kabuk), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | AgentBridge pano sayfası — sunucu kartı, 9 aracı kartı, kurulum sihirbazı, model eşleme, atlama listesi. i18n PT-BR + EN. Bkz. `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                                                       |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Traffic Inspector pano sayfası — DevTools bölünmüş görünümü, 7 ayrıntı sekmesi, 4 yakalama modu anahtarı, oturum kaydedici, bağlam renklendirmesi. i18n PT-BR + EN. Bkz. `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                                       |
| `app/(dashboard)/dashboard/activity/`                                        | Etkinlik akışı sayfası (Grup B): `page.tsx` (sunucu) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — bkz. `docs/architecture/MONITORING_SECTIONS.md`                                                                                                             |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Kota Paylaşımı sayfası (Grup B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                           |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Sağlayıcı planı yapılandırma sayfası (Grup B): `page.tsx` + `ProviderPlanConfigClient.tsx` — bağlantı başına kota boyutu geçersiz kılmaları                                                                                                                                                                            |
| `app/docs/`                                                                  | Gömülü dokümantasyon görüntüleyicisi (`docs/*.md` dosyalarını işler)                                                                                                                                                                                                                                                   |
| `app/landing/`                                                               | Pazarlama açılış sayfası                                                                                                                                                                                                                                                                                               |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Kimlik doğrulamayla ilgili sayfalar                                                                                                                                                                                                                                                                                    |
| `app/{400,401,403,408,429,500,502,503}/`                                     | HTTP hata sayfaları                                                                                                                                                                                                                                                                                                    |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Statik/durum sayfaları                                                                                                                                                                                                                                                                                                 |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Kök yerleşim, ana sayfa, PWA manifesti, global CSS                                                                                                                                                                                                                                                                     |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Hata sınırları                                                                                                                                                                                                                                                                                                         |

### `src/lib/` — Temel kütüphaneler (~50 modül)

| Modül                                    | Amaç                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | A2A protokolü görev yöneticisi, beceriler (5), akış                                                                                                                                                                                                                                                                     |
| `acp/`                                   | CLI Aracı Kayıt Defteri (yerel CLI keşfi — bkz. `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                             |
| `api/`                                   | Paylaşılan API yardımcıları (`requireManagementAuth`, doğrulama)                                                                                                                                                                                                                                                        |
| `auth/`                                  | Oturum, parola karma işlemi, belirteç doğrulama                                                                                                                                                                                                                                                                         |
| `batches/`                               | OpenAI Batches API işleyicileri                                                                                                                                                                                                                                                                                         |
| `catalog/`                               | Sağlayıcı kataloğu için Zod doğrulaması + yetenek çözümleme                                                                                                                                                                                                                                                             |
| `cloudAgent/`                            | Bulut Aracıları (Codex Cloud, Devin, Jules) — bkz. `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                     |
| `combos/`                                | Kombinasyon çözümleme + yeniden sıralama yardımcıları                                                                                                                                                                                                                                                                   |
| `audit/`                                 | Etkinlik akışı yardımcıları: `highLevelActions.ts` (izin verilenler listesi + `isHighLevelAction()`), `activityIcons.ts` (eylem → simge/fiil eşlemesi), `timeline.ts` (groupByDay/relativeTime) — bkz. `docs/architecture/MONITORING_SECTIONS.md`                                                                       |
| `compliance/`                            | Denetim günlüğü + sağlayıcı denetimi — bkz. `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                               |
| `compression/`                           | Sıkıştırma motoru bağlayıcı kodu (motorlar `open-sse/services/compression/` içinde bulunur)                                                                                                                                                                                                                             |
| `config/`                                | Çalışma zamanı yapılandırma yardımcıları                                                                                                                                                                                                                                                                                |
| `db/`                                    | 120+ etki alanı veritabanı modülü + 168 geçiş (SQLite için her zaman burayı kullanın)                                                                                                                                                                                                                                   |
| `quota/`                                 | Kota Paylaşım Motoru: `dimensions.ts` (türler/Zod), `types.ts` (QuotaStore arayüzü), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — bkz. `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Radar ücretsiz model kataloğu istemcisi: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — bkz. `docs/frameworks/RADAR.md`                                                                                                                                   |
| `display/`                               | Kullanıcı arayüzü biçimlendirme yardımcıları (maliyet, gecikme vb.)                                                                                                                                                                                                                                                     |
| `embeddings/`                            | Gömme hizmeti yardımcıları                                                                                                                                                                                                                                                                                              |
| `env/`                                   | Ortam değişkenlerini ayrıştırma + doğrulama                                                                                                                                                                                                                                                                             |
| `evals/`                                 | Değerlendirme altyapısı (paketler, çalıştırıcı, çalışma zamanı) — bkz. `docs/frameworks/EVALS.md`                                                                                                                                                                                                                       |
| `guardrails/`                            | Kişisel olarak tanımlanabilir bilgi (PII) maskeleyici, istem enjeksiyonu, görüntü köprüsü — bkz. `docs/security/GUARDRAILS.md`                                                                                                                                                                                          |
| `jobs/`                                  | Arka plan işleri (cron benzeri)                                                                                                                                                                                                                                                                                         |
| `memory/`                                | Konuşma belleği (SQLite FTS5 + sqlite-vec hibrit RRF + Qdrant 2. katman) — bkz. `docs/frameworks/MEMORY.md`                                                                                                                                                                                                             |
| `memory/embedding/`                      | Çok kaynaklı gömme katmanı: `index.ts` (çözümleyici), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (plan 21)                                                                                                                                                                          |
| `memory/vectorStore.ts`                  | sqlite-vec v0.1.9 sarmalayıcısı — KNN kaba kuvvet + hibrit RRF (FTS5 + vektör, k=60). Tembel başlatılır, sqlite-vec kullanılamadığında sorunsuz biçimde düşük kapasiteli moda geçer. (plan 21)                                                                                                                          |
| `memory/reindex.ts`                      | `runReindexBatch()` — `needs_reindex=1` olan bellekleri arka planda işler; `POST /api/memory/reindex` ve tembel geriye dönük doldurma yolu tarafından çağrılır. (plan 21)                                                                                                                                               |
| `monitoring/`                            | Sistem durumu denetimleri, metrik yayımı                                                                                                                                                                                                                                                                                |
| `oauth/`                                 | 22 sağlayıcı modülü için OAuth/içe aktarma akışları (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                         |
| `plugins/`                               | Eklenti kayıt defteri                                                                                                                                                                                                                                                                                                   |
| `promptCache/`                           | Anthropic tarzı istem önbelleği kesme noktaları                                                                                                                                                                                                                                                                         |
| `skills/`                                | Beceri altyapısı (yerleşik + pazar yeri + SkillsSH) — bkz. `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                  |
| `playground/`                            | Playground Studio paylaşılan yardımcıları: `codeExport.ts` (curl/Python/TS oluşturucu), `promptImprover.ts` (meta istem oluşturucu), `streamMetrics.ts` (saf TTFT/TPS), `types.ts` (fiyatlandırma tablosu) — bkz. `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                |
| `webhookDispatcher.ts`                   | HMAC webhook teslimatı — bkz. `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                             |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Tünel yöneticileri — bkz. `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                   |
| `cloudSync.ts`, `initCloudSync.ts`       | Durumun isteğe bağlı bulut senkronizasyonu                                                                                                                                                                                                                                                                              |
| `localDb.ts`                             | Veritabanı modülleri için yeniden dışa aktarma varili (mantık içermez — yalnızca yeniden dışa aktarır)                                                                                                                                                                                                                  |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | İstek önbelleğe alma + idempotans                                                                                                                                                                                                                                                                                       |
| (~30 ek üst düzey dosya)                 | Özelleştirilmiş yardımcılar (logEnv, modelsDevSync, piiSanitizer vb.)                                                                                                                                                                                                                                                   |

### `src/lib/db/` — Veritabanı (122 modül + 168 migrasyon)

| Alt dizin                 | Amaç                                                                                                                                                                             |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | WAL günlük kaydı kullanan `getDbInstance()` tekil örneği                                                                                                                         |
| `db/migrations/`          | Sürümlendirilmiş SQL dosyaları (idempotent, işlemsel). `073_memory_vec.sql`, `memory_vec_meta` + `needs_reindex` sütununu ekler (plan 21).                                       |
| `db/playgroundPresets.ts` | Playground Studio ön ayarları için CRUD modülü (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`)    |
| `db/memoryVec.ts`         | `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) için CRUD + `markMemoryNeedsReindex`, `getMemoryReindexQueue` vb. (plan 21)                       |
| `db/<domain>.ts`          | Her etki alanı için bir modül: providers, combos, apiKeys, users, sessions, usage, audit*log, webhooks, skills, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache vb. |

### `src/domain/`

| Modül                  | Amaç                                                             |
| ---------------------- | ---------------------------------------------------------------- |
| `policy.ts`            | İlke motoru                                                      |
| `fallbackPolicy.ts`    | Geri dönüş karar ağacı                                           |
| `costRules.ts`         | Maliyet hesaplama kuralları                                      |
| `lockoutPolicy.ts`     | Model/bağlantı kilitleme ilkesi                                  |
| `tagRouter.ts`         | Etiket tabanlı yönlendirme                                       |
| `comboResolver.ts`     | Kombinasyon çözümleme (kombinasyon motoru tarafından kullanılır) |
| `modelAvailability.ts` | Model başına kullanılabilirlik denetimi                          |
| `assessment/`          | Model değerlendirmesi (RFC-AUTO-ASSESSMENT'ın 1. Aşaması)        |

### `src/server/`

| Modül    | Amaç                                                                                                     |
| -------- | -------------------------------------------------------------------------------------------------------- |
| `authz/` | Yetkilendirme işlem hattı: `classify` → `policies` → `enforce` — bkz. `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | CORS yapılandırması                                                                                      |
| `auth/`  | Oturum ara katmanı                                                                                       |

### `src/shared/`

| Modül                            | Amaç                                                                             |
| -------------------------------- | -------------------------------------------------------------------------------- |
| `constants/providers.ts`         | Zod doğrulamalı **355 sağlayıcı** (tek doğruluk kaynağı)                         |
| `constants/cliTools.ts`          | Harici CLI aracı kayıt defteri                                                   |
| `constants/routingStrategies.ts` | Önceliklere sahip **19 yönlendirme stratejisi**                                  |
| `constants/publicApiRoutes.ts`   | Bearer kimlik doğrulaması (yönetim kimlik doğrulaması yerine) gerektiren rotalar |
| `constants/upstreamHeaders.ts`   | Üst akış istekleri için üst bilgi engelleme listesi                              |
| `validation/schemas.ts`          | ~80 Zod şeması (API sözleşmeleri için tek doğruluk kaynağı)                      |
| `validation/helpers.ts`          | Zod doğrulama yardımcıları (`validateBody` vb.)                                  |
| `types/`                         | Paylaşılan TS türleri                                                            |
| `contracts/`                     | Genel API sözleşmeleri (`package.json` içindeki `files:` tarafından kullanılır)  |
| `utils/circuitBreaker.ts`        | Sağlayıcı devre kesicisi (bkz. `docs/architecture/RESILIENCE_GUIDE.md`)          |
| `utils/apiAuth.ts`               | API anahtarı doğrulama, kapsam denetimi                                          |
| `utils/fetchTimeout.ts`          | Üst akış fetch işlemleri için zaman aşımı/iptal sarmalayıcıları                  |
| `utils/releaseNotes.ts`          | Kapatılmış v2/eski duyuru ayrıştırıcısı, yerelleştirme ve kimliğe göre kapatma   |

---

## `open-sse/` — Akış Motoru Çalışma Alanı

Ayrı npm çalışma alanı (`@omniroute/open-sse`). İstek işlemeyi ve sağlayıcı yürütmesini yönetir.

```
open-sse/
├── handlers/            # 16 dosya (12 işleyici + 4 yardımcı): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search vb.
├── executors/           # Sağlayıcıya özgü 67 yürütücü (BaseExecutor sınıfını genişletir)
├── translator/          # Biçim dönüştürücüler (9 istek, 9 yanıt, 9 yardımcı)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ hizmet modülü (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM vb.)
├── mcp-server/          # MCP sunucusu (110 araç, 3 aktarım, 33 kapsam)
├── config/              # Sağlayıcı/model kayıtları, başlık yapılandırması, model takma adları
├── utils/               # TLS istemcisi, proxy fetch/dispatcher, ağ yardımcıları
├── index.ts             # Çalışma alanı giriş noktası
├── package.json         # Çalışma alanı manifesti
├── tsconfig.json        # Çalışma alanı TS yapılandırması
└── types.d.ts           # Çalışma alanı tür bildirimleri
```

### `open-sse/mcp-server/`

| Yol                         | Amaç                                                                            |
| --------------------------- | ------------------------------------------------------------------------------- |
| `server.ts`                 | MCP sunucusu yaşam döngüsü (stdio + HTTP aktarımları)                           |
| `httpTransport.ts`          | HTTP Streamable + SSE aktarımları (`/api/mcp/sse`, `/api/mcp/stream`)           |
| `audit.ts`                  | `mcp_tool_audit` tablosuna denetim günlüğü kaydı                                |
| `scopeEnforcement.ts`       | Araç başına kapsam doğrulaması                                                  |
| `runtimeHeartbeat.ts`       | `DATA_DIR/runtime/mcp-heartbeat.json` konumuna sistem durumu sinyali            |
| `descriptionCompressor.ts`  | Bağlamdan tasarruf etmek için araç açıklaması meta verilerini sıkıştırır        |
| `schemas/tools.ts`          | 36 temel araç tanımı + kapsamlar                                                |
| `tools/advancedTools.ts`    | Gelişmiş araç uygulamaları                                                      |
| `tools/memoryTools.ts`      | 3 bellek aracı (arama/ekleme/temizleme)                                         |
| `tools/skillTools.ts`       | 4 beceri aracı (listeleme/etkinleştirme/yürütme/yürütmeler)                     |
| `tools/compressionTools.ts` | 5 sıkıştırma aracı                                                              |
| `README.md`                 | Dahili MCP sunucusu README'si (`docs/frameworks/MCP-SERVER.md` üzerinden bağlı) |

---

## `electron/` — Masaüstü Sarmalayıcısı

| Dosya            | Amaç                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------- |
| `main.js`        | Electron ana süreci (BrowserWindow, gömülü Next.js sunucusu, sistem tepsisi, otomatik güncelleme) |
| `preload.js`     | IPC köprüsü (contextBridge → `window.omniroute`)                                                  |
| `package.json`   | electron-builder yapılandırması + Electron 41 + electron-builder 26.10 bağımlılıkları             |
| `assets/`        | Uygulama simgeleri (Windows .ico, macOS .icns, Linux .png)                                        |
| `dist-electron/` | Derleme çıktısı (git tarafından yok sayılır)                                                      |
| `types.d.ts`     | İşleyici köprüsü için tür bildirimleri                                                            |
| `README.md`      | Dahili Electron README'si (ayrıca bkz. `docs/guides/ELECTRON_GUIDE.md`)                           |

---

## `bin/` — CLI

| Dosya                                                                                                       | Amaç                                                                                                                            |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Ana CLI giriş noktası — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos` vb. |
| `reset-password.mjs`                                                                                        | Bağımsız parola sıfırlama CLI'si                                                                                                |
| `cli/commands/setup.mjs`                                                                                    | Etkileşimli + etkileşimsiz kurulum sihirbazı                                                                                    |
| `cli/commands/doctor.mjs`                                                                                   | Sistem sağlığı tanılamaları (8+ kontrol)                                                                                        |
| `cli/commands/providers.mjs`                                                                                | Sağlayıcıları listeleme/test etme/doğrulama                                                                                     |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | CLI yardımcı modülleri                                                                                                          |
| `cli/tray/tray.ts`                                                                                          | Sistem tepsisi entegrasyonu (platformlar arası: Windows'da NotifyIcon, macOS/Linux'ta systray2)                                 |
| `cli/tray/tray.ps1`                                                                                         | PowerShell NotifyIcon arka ucu (Windows, sıfır yeni ikili dosya)                                                                |
| `cli/tray/autostart.ts`                                                                                     | Platformlar arası otomatik başlatma (LaunchAgent / .desktop / kayıt defteri)                                                    |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | 5 adımlı SQLite sürücüsü çözümleme zinciri (paketle birlikte → çalışma zamanı → gecikmeli kurulum → node:sqlite → sql.js)       |
| `cli/runtime/magicBytes.mjs`                                                                                | İkili dosya sihirli bayt doğrulaması (ELF / Mach-O / Mach-O fat / PE)                                                           |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — postinstall / ilk başlatma sırasında sürücüleri önceden çözümler                                           |
| `nodeRuntimeSupport.mjs`                                                                                    | Kurulum sırasında desteklenen Node.js sürümünü doğrular                                                                         |

---

## `skills/` — Genel Kullanıma Açık Agent Becerileri

| Dosya                        | Amaç                                                                                    |
| ---------------------------- | --------------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | Harici AI agentları (Claude Desktop, ChatGPT, Cursor, Cline) için 10 beceri manifestosu |

---

## `scripts/` — Derleme ve Denetim Betikleri

| Betik                               | Amaç                                                                                                |
| ----------------------------------- | --------------------------------------------------------------------------------------------------- |
| `run-next.mjs`                      | Ortam değişkenlerini yükleyen geliştirme/başlatma çalıştırıcısı                                     |
| `build-next-isolated.mjs`           | Bağımsız derleme (Next.js 16 standalone)                                                            |
| `prepublish.ts`                     | `npm pack` öncesi paket hazırlığı                                                                   |
| `postinstall.mjs`                   | İlk kurulumda `.env.example` dosyasından otomatik olarak `.env` oluşturur                           |
| `sync-env.mjs`                      | `.env` anahtarlarını `.env.example` ile yeniden eşitler                                             |
| `check-cycles.mjs`                  | Döngüsel bağımlılıkları tespit eder                                                                 |
| `check-route-validation.mjs`        | Tüm API rotalarında Zod doğrulaması bulunduğunu doğrular                                            |
| `check-t11-any-budget.mjs`          | Dosya başına açık `any` bütçesini uygular                                                           |
| `check-docs-sync.mjs`               | Dokümantasyon sürümü eşitlemesini doğrular (mevcut pre-commit)                                      |
| **`check-env-doc-sync.mjs`**        | YENİ: Koddaki ortam değişkenlerini `.env.example` ve `ENVIRONMENT.md` ile çapraz denetler           |
| **`check-docs-counts-sync.mjs`**    | YENİ: Sayıların (yürütücüler, stratejiler, OAuth, A2A becerileri) dokümanlarla eşleşmesini doğrular |
| **`check-deprecated-versions.mjs`** | YENİ: Dokümanlardaki eski sürümleri/tarihleri işaretler                                             |
| `check-supported-node-runtime.ts`   | Geçerli Node sürümünün desteklendiğini doğrular                                                     |
| `check-pr-test-policy.mjs`          | Üretim kodu değişikliklerinde "testler gerekli" kuralını uygular                                    |
| **`gen-provider-reference.ts`**     | YENİ: Katalogdan otomatik olarak `docs/reference/PROVIDER_REFERENCE.md` oluşturur                   |
| `i18n/generate-multilang.mjs`       | UI dizelerini ve dokümanları Google Translate aracılığıyla çevirir                                  |
| `i18n_autotranslate.py`             | LLM tabanlı doküman çeviri işlem hattı                                                              |
| `validate_translation.py`           | Yerel ayar başına çeviri doğrulaması                                                                |
| `check_translations.py`             | Kod tarafında i18n anahtar denetimi                                                                 |
| `run-playwright-tests.mjs`          | Playwright E2E çalıştırıcısı                                                                        |
| `run-protocol-clients-tests.mjs`    | MCP/A2A E2E çalıştırıcısı                                                                           |
| `run-ecosystem-tests.mjs`           | Ekosistem (sağlayıcı entegrasyonu) testleri                                                         |
| `test-report-summary.mjs`           | Kapsam özeti markdown'ı oluşturur                                                                   |
| `smoke-electron-packaged.mjs`       | Paketlenmiş Electron derlemesine duman testi uygular                                                |
| `native-binary-compat.mjs`          | Yerel bağımlılıkların (`better-sqlite3`) Electron'ın Node sürümüyle eşleştiğini doğrular            |
| `validate-pack-artifact.ts`         | npm pack çıktısını doğrular                                                                         |
| `responses-ws-proxy.mjs`            | Codex Responses API için WebSocket köprüsü                                                          |
| `v1-ws-bridge.mjs`                  | `/api/v1/ws` uç noktası için WebSocket köprüsü                                                      |
| `standalone-server-ws.mjs`          | Bağımsız WS sunucusu çalıştırıcısı                                                                  |
| `system-info.mjs`                   | Destek amacıyla sistem/çalışma zamanı bilgilerini yazdırır                                          |
| `healthcheck.mjs`                   | Tek seferlik sistem durumu denetimi (Docker HEALTHCHECK tarafından kullanılır)                      |
| `uninstall.mjs`                     | Temiz kaldırma betiği                                                                               |

---

## `docs/` — Genel Dokümantasyon (7 kök dosya + 17 alt dizin)

### Üst düzey kılavuzlar

| Belge                       | Amaç                                                                                                            |
| --------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Üst düzey mimari, alt sistem haritası, kontrol paneli yüzeyi                                                    |
| `CODEBASE_DOCUMENTATION.md` | Mühendislik referansı: dizinler, modüller, kurallar                                                             |
| `FEATURES.md`               | v3.8'de öne çıkan özellikleri içeren özellik matrisi                                                            |
| `USER_GUIDE.md`             | Son kullanıcı kılavuzu (kurulum, modeller, kombinasyonlar, CLI'lar, ses vb.)                                    |
| `API_REFERENCE.md`          | Kimlik doğrulama modeliyle birlikte API uç noktası referansı                                                    |
| `openapi.yaml`              | OpenAPI 3.0 belirtimi (121 yol)                                                                                 |
| `SETUP_GUIDE.md`            | Kurulum yöntemleri (npm, npx, Docker, Electron, Termux, kaynak kod)                                             |
| `ENVIRONMENT.md`            | Tüm ortam değişkenleri (~800 belgelenmiş, `.env.example` ~3.050 satır)                                          |
| `TROUBLESHOOTING.md`        | Yaygın hatalar + v3.8.0 için bilinen sorunlar                                                                   |
| `RELEASE_CHECKLIST.md`      | Eksiksiz sürüm süreci (beceriler, husky, conventional commits, dağıtım)                                         |
| `COVERAGE_PLAN.md`          | Kapsama hedefleri ve mevcut durum                                                                               |
| `FREE_TIERS.md`             | Özenle seçilmiş ücretsiz katman sağlayıcıları (48+ ücretsiz + 11 OAuth)                                         |
| `CLI-TOOLS.md`              | Harici CLI entegrasyonları + dahili OmniRoute CLI                                                               |
| `I18N.md`                   | i18n mimarisi, dil ekleme, 42 yerel ayar                                                                        |
| `UNINSTALL.md`              | Temiz kaldırma adımları                                                                                         |
| `PROVIDER_REFERENCE.md`     | 355 sağlayıcıdan oluşan **otomatik oluşturulmuş** katalog (yeniden oluşturma: `npm run gen:provider-reference`) |

### Alt sistem ayrıntıları

| Belge                                           | Amaç                                                                              |
| ----------------------------------------------- | --------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                                 | MCP sunucusu: 110 araç, 3 aktarım, 33 kapsam, REST uç noktaları                   |
| `A2A-SERVER.md`                                 | A2A v0.3: JSON-RPC, 6 beceri, REST yardımcıları, aracı kartı                      |
| `AGENT_PROTOCOLS_GUIDE.md`                      | Birleşik kılavuz: A2A, ACP ve Cloud Agents karşılaştırması                        |
| `CLOUD_AGENT.md`                                | Codex Cloud / Devin / Jules orkestrasyonu                                         |
| `SKILLS.md`                                     | Beceri çerçevesi (yerleşik + pazar yeri + SkillsSH + korumalı alan)               |
| `RADAR.md`                                      | Radar ücretsiz model kataloğu katmanı (`RADAR_ENABLED`, varsayılan olarak kapalı) |
| `MEMORY.md`                                     | Bellek sistemi (SQLite FTS5 + Qdrant)                                             |
| `EVALS.md`                                      | Değerlendirme çerçevesi (paketler, çalıştırmalar, değerlendirme ölçütleri)        |
| `GUARDRAILS.md`                                 | Kişisel veri maskeleyici, istem enjeksiyonu, görüntü köprüsü                      |
| `COMPLIANCE.md`                                 | Denetim günlüğü, saklama, `noLog` ile devre dışı bırakma                          |
| `WEBHOOKS.md`                                   | HMAC imzalı webhook teslimatı                                                     |
| `REASONING_REPLAY.md`                           | `reasoning_content` için hibrit bellek/SQLite önbelleği                           |
| `AUTHZ_GUIDE.md`                                | Yetkilendirme işlem hattı (`classify` → `policies` → `enforce`)                   |
| `RESILIENCE_GUIDE.md`                           | Devre kesici + bekleme süresi + model kilitleme                                   |
| `docs/security/STEALTH_GUIDE.md` (yalnızca git) | TLS parmak izi (JA3/JA4), Claude Code CCH, MITM sertifikası                       |
| `AUTO-COMBO.md`                                 | Auto Combo motoru (16 faktörlü puanlama, 6 mod paketi, sanal fabrika)             |

### Sıkıştırma

| Belge                           | Amaç                                            |
| ------------------------------- | ----------------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Sıkıştırma modlarına genel bakış + yol haritası |
| `COMPRESSION_ENGINES.md`        | Caveman + RTK motorları, kayıt sözleşmesi       |
| `COMPRESSION_RULES_FORMAT.md`   | Caveman kural paketi JSON şeması                |
| `COMPRESSION_LANGUAGE_PACKS.md` | Dil başına kural paketi envanteri               |
| `RTK_COMPRESSION.md`            | RTK bildirimsel işlem hattı (49 filtre)         |

### Dağıtım

| Belge                        | Amaç                                                                     |
| ---------------------------- | ------------------------------------------------------------------------ |
| `DOCKER_GUIDE.md`            | Docker derlemesi, profiller (base/cli/host/cliproxyapi), Redis yan aracı |
| `VM_DEPLOYMENT_GUIDE.md`     | Genel VM/VPS dağıtımı (Ubuntu/Debian + nginx + systemd)                  |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Fly.io dağıtımı (şu anda yalnızca Çince)                                 |
| `TERMUX_GUIDE.md`            | Termux aracılığıyla başsız Android kullanımı                             |
| `PWA_GUIDE.md`               | Progressive Web App kurulumu + service worker                            |
| `ELECTRON_GUIDE.md`          | Masaüstü uygulamasını derleme + imzalama + dağıtma                       |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                                   |
| `PROXY_GUIDE.md`             | 4 seviyeli giden proxy + 1proxy pazar yeri                               |

### Alt dizinler

| Alt dizin             | Amaç                                                                                                                                                                                                                                            |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Yerelleştirilmiş belge çevirileri (41 yerel ayar)                                                                                                                                                                                               |
| `docs/screenshots/`   | Kılavuzlar için görsel varlıkları                                                                                                                                                                                                               |
| `_tasks/superpowers/` | superpowers (`writing-plans`/`brainstorming`) tarafından oluşturulan planlar/özellikler + araştırma — yalıtılmış, ayrı sürümlenen depo; ana ağaç tarafından gitignore kapsamına alınmıştır. Bkz. CLAUDE.md → "Planlama ve Araştırma Çıktıları". |

---

## `tests/` — Test Paketleri

| Alt dizin                            | Tür                                     | Çalıştırıcı                                    |
| ------------------------------------ | --------------------------------------- | ---------------------------------------------- |
| `tests/unit/`                        | Birim testleri (~4.800 dosya, en hızlı) | Node yerel test çalıştırıcısı                  |
| `tests/integration/`                 | Çok modüllü + DB entegrasyon testleri   | Node yerel test çalıştırıcısı (eşzamanlılık 1) |
| `tests/e2e/`                         | UI + iş akışı E2E                       | Playwright                                     |
| `tests/e2e/protocol-clients.test.ts` | MCP + A2A gerçek istemci E2E            | Özel protokol istemcileri                      |
| `tests/e2e/ecosystem.test.ts`        | Sağlayıcı entegrasyonu (ağ erişimli)    | Node yerel test çalıştırıcısı                  |

---

## `public/` — Statik Varlıklar

| Yol                 | Amaç                                                                    |
| ------------------- | ----------------------------------------------------------------------- |
| `public/` (kök)     | Favicon'lar, robots.txt, manifest, service worker, pazarlama görselleri |
| `public/providers/` | Sağlayıcı logosu PNG/SVG (kontrol panelinde kullanılır)                 |

---

## `config/` — Statik Yapılandırmalar + Kalite Geçidi Durumu

Dağıtılan yapılandırma şablonları ve commit edilmiş kalite geçidi referans değerleri
(kök dizini sade tutmak için v3.8.26 sürümünde depo kökünden buraya taşındı).

| Yol                                           | Amaç                                                                                                      |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Yerel ayar listesi + meta veriler (42 yerel ayar sayısının standart kaynağı)                              |
| `config/i18n-schema.json`                     | `i18n.json` dosyasını doğrulayan JSON şeması                                                              |
| `config/payloadRules.json`                    | Üst kaynak yükü temizleme kuralları                                                                       |
| `config/quality/quality-baseline.json`        | Çok metrikli mandal referans değeri (`scripts/quality/check-quality-ratchet.mjs`)                         |
| `config/quality/complexity-baseline.json`     | Dondurulmuş ESLint karmaşıklık referans değeri (`check-complexity.mjs`)                                   |
| `config/quality/duplication-baseline.json`    | Dondurulmuş jscpd yineleme referans değeri (`check-duplication.mjs`)                                      |
| `config/quality/file-size-baseline.json`      | Dondurulmuş dosya başına boyut referans değeri (`check-file-size.mjs`)                                    |
| `config/quality/test-discovery-baseline.json` | Dondurulmuş sahipsiz test referans değeri (`check-test-discovery.mjs`)                                    |
| `config/quality/dependency-allowlist.json`    | Onaylanmış bağımlılıklar izin listesi (`check-deps.mjs`)                                                  |
| `config/quality/.license-allowlist.json`      | SPDX lisans izin listesi (`check-licenses.mjs`)                                                           |
| `config/quality/quality-metrics.json`         | Geçici olarak toplanan metrikler (`collect-metrics.mjs` tarafından oluşturulur; **gitignore kapsamında**) |

---

## `.github/` — GitHub Entegrasyonu

| Yol                                | Amaç                                                                   |
| ---------------------------------- | ---------------------------------------------------------------------- |
| `.github/workflows/`               | GitHub Actions CI/CD iş akışları (lint, test, kapsam, sürüm yayımlama) |
| `.github/ISSUE_TEMPLATE/`          | Hata/özellik issue şablonları                                          |
| `.github/pull_request_template.md` | PR şablonu                                                             |
| `.github/dependabot.yml`           | Bağımlılık güncelleme yapılandırması                                   |

---

## `.husky/` — Git Hook'ları

| Dosya        | Amaç                                                                                                |
| ------------ | --------------------------------------------------------------------------------------------------- |
| `pre-commit` | `lint-staged + check-docs-sync + check:any-budget:t11` çalıştırır                                   |
| `pre-push`   | Şu anda devre dışı (yorum satırına alınmış). `npm run test:unit` komutunu manuel olarak çalıştırın. |
| `_/`         | Husky dahili bileşenleri                                                                            |

---

## `.claude/` — Claude Code Eğik Çizgi Komutları

| Dosya                                               | Amaç                                                                          |
| --------------------------------------------------- | ----------------------------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — sürümü yükseltir + otomatik değişiklik günlüğü oluşturur |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — eksiksiz sürüm yayımlama iş akışı                    |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | VPS'ye dağıtım yapar                                                          |
| `commands/capture-release-evidences-cc.md`          | Yeni özellikleri tarayıcıda WebP olarak kaydeder                              |
| `commands/review-{prs,discussions}-cc.md`           | GitHub PR'lerini/tartışmalarını değerlendirir                                 |
| `commands/{review-issues,implement-features}-cc.md` | Issue iş akışları                                                             |
| `settings.local.json`                               | Projeye özgü Claude Code ayarları                                             |

---

## `.agents/` — Genel Aracı İş Akışları (Codex / Cursor / vb.)

| Yol                      | Amaç                                                         |
| ------------------------ | ------------------------------------------------------------ |
| `workflows/*-ag.md`      | 11 iş akışı tanımı (`.claude/commands/` dizininin yansıması) |
| `skills/<name>/SKILL.md` | Codex Yürütme Notları içeren 9 beceri tanımı                 |

> **Not:** İş akışları ve komutlar şu anda bayt bayt aynıdır. `.agents/` farklı bir aracı çalışma zamanını (Codex) hedeflemek üzere tasarlandıysa varyantların anlamlı biçimde farklılaşması gerekir.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Ağaç Dışı

Alt çizgiyle başlayan bu dizinler, dağıtıma dahil edilmeyen içerikleri barındırır:

- **`_ideia/`** — tasarım notları (defer / notfit / viable kategorileri)
- **`_mono_repo/`** — geçmiş alt projeler (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — geliştirme sırasında çapraz referans için ilgili OSS projelerinin salt okunur klonları (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api vb.)
- **`_tasks/`** — sürüm başına görev takip dosyaları (gayriresmî)

`npm pack` çıktısına dahil edilmez. Bkz. `.npmignore`.

---

## Oluşturulan / Git Tarafından Yok Sayılan

| Yol                    | Amaç                          |
| ---------------------- | ----------------------------- |
| `node_modules/`        | npm bağımlılıkları            |
| `.next/`               | Next.js derleme çıktısı       |
| `coverage/`            | c8 kapsam raporları           |
| `logs/`                | Çalışma zamanı günlükleri     |
| `package/`             | npm pack hazırlama alanı      |
| `.playwright-mcp/`     | Playwright MCP test çıktıları |
| `.issues/`             | Yerel sorun önbelleği         |
| `tsconfig.tsbuildinfo` | TS artımlı derleme önbelleği  |

---

## Gezinme ipuçları

- **Yeni katkıda bulunan biri misiniz?** `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md` dosyalarını okuyun.
- **Bir sağlayıcı mı ekliyorsunuz?** `docs/architecture/ARCHITECTURE.md § Yeni Bir Sağlayıcı Ekleme` bölümünü izleyin ve `docs/reference/PROVIDER_REFERENCE.md` ile karşılaştırın.
- **Bir rota mı ekliyorsunuz?** `docs/architecture/ARCHITECTURE.md § Yeni Bir API Rotası Ekleme` + `src/shared/validation/schemas.ts`.
- **Bir MCP aracı mı ekliyorsunuz?** `docs/frameworks/MCP-SERVER.md § Araç Ekleme`.
- **Bir A2A becerisi mi ekliyorsunuz?** `docs/frameworks/A2A-SERVER.md § Yeni Bir Beceri Ekleme`.
- **Yerel olarak mı çalıştırıyorsunuz?** `docs/guides/SETUP_GUIDE.md`.
- **Dağıtım mı yapıyorsunuz?** `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Sürüm mü yayımlıyorsunuz?** `docs/ops/RELEASE_CHECKLIST.md` (ve `/generate-release-cc` Claude Code becerisi).
