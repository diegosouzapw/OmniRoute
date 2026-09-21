# Repository Map (Oʻzbekcha)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Har bir katalog va ildiz fayl uchun bir qatorli tavsif.**
> Oxirgi yangilanish: 2026-06-28 — OmniRoute v3.8.40
>
> Kod bazasida tezkor harakatlanish uchun ushbu xaritadan foydalaning. Batafsil tanishish uchun maxsus hujjatlarga olib boruvchi havolalardan foydalaning.

## Yuqori darajadagi daraxt

```
OmniRoute/
├── src/                  # Next.js 16 ilovasi (UI + API marshrutlari + kutubxonalar + domen + server)
├── open-sse/             # Oqimli uzatish mexanizmi ish maydoni (ishlov beruvchilar, bajaruvchilar, tarjimon, MCP serveri)
├── electron/             # Ish stoli o‘rami (Electron 41 + electron-builder 26.10)
├── bin/                  # CLI kirish nuqtasi va buyruq ishlov beruvchilari
├── scripts/              # Yig‘ish, tekshirish, sinxronlash va bir martalik skriptlar
├── docs/                 # Ommaviy hujjatlar (siz shu yerdasiz)
├── tests/                # Barcha test to‘plamlari (modul, integratsion, e2e, protokol mijozlari)
├── public/               # Next.js statik resurslari, PWA manifesti, servis-vorker, ikonalar
├── config/               # Statik konfiguratsiya + sifat nazorati holati (i18n, payloadRules, quality/)
├── images/               # Marketing / README tasvir resurslari
├── @omniroute/           # Nashr qilinadigan yordamchi paketlar (opencode-plugin, opencode-provider)
├── skills/               # CLI/agent ko‘nikmalar to‘plamlari (cli-* + omni-* + config-codex-cli)
├── examples/             # Namuna plaginlar + omniroute-cmd-hello boshlang‘ich loyihasi
├── contrib/              # Hamjamiyat hissalari (podman/)
├── .source/              # Fumadocs manba konfiguratsiyasi (source.config.mjs + server/browser/dynamic)
├── .github/              # GitHub Actions ish jarayonlari + muammo shablonlari + PR shabloni
├── .husky/               # Git huklari (pre-commit, pre-push)
├── .claude/              # Claude Code slesh-buyruqlari (loyiha doirasida)
├── .agents/              # Codex / umumiy agent ish jarayonlari + ko‘nikmalar (.claude/ nusxasi)
├── .vscode/              # VS Code ish maydoni sozlamalari
├── _ideia/               # Rejalashtirish qaydlari (norasmiy; tarqatilmaydi)
├── _mono_repo/           # Tarixiy quyi loyihalar (cloud, site, vscode-extension)
├── _references/          # Tegishli OSS loyihalarining faqat o‘qish uchun mo‘ljallangan klonlari
├── _tasks/               # Har bir reliz uchun vazifalarni kuzatish fayllari (norasmiy)
├── .build/ .worktrees/ dist/   # Mahalliy yig‘ish / git-worktree / yig‘ish natijalari uchun vaqtinchalik maydon (gitignored)
├── .issues/              # Mahalliy muammolar keshi (gitignored)
├── .playwright-mcp/      # Playwright MCP test artefaktlari
├── coverage/             # c8 qamrov natijalari (gitignored)
├── logs/                 # Ishlash vaqti jurnallari (gitignored)
├── node_modules/         # Bog‘liqliklar (gitignored)
├── package/              # npm pack uchun tayyorlash maydoni (yig‘ish artefakti)
├── .next/                # Next.js yig‘ish natijalari (gitignored)
└── (ildiz fayllar — quyida ko‘ring)
```

---

## Ildiz fayllar

| Fayl                                        | Maqsadi                                                                                                                |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **README.md**                               | Marketing bosh sahifasi + tezkor boshlash + imkoniyatlar matritsasi (shuningdek, `llm.txt` fayliga qarang)             |
| **CHANGELOG.md**                            | Har bir reliz uchun oʻzgarishlar jurnali (`/version-bump-cc` ko‘nikmasi tomonidan avtomatik yaratiladi)                |
| **LICENSE**                                 | MIT litsenziyasi matni                                                                                                 |
| **CLAUDE.md**                               | Claude Code agentlari uchun loyiha qoidalari (qatʼiy qoidalar, kelishuvlar, ssenariylar)                               |
| **AGENTS.md**                               | CLAUDE.md bilan bir xil, ammo Claude boʻlmagan AI agentlari (Codex, Cursor va boshqalar) uchun                         |
| **GEMINI.md**                               | Gemini asosidagi agentlar uchun qisqacha qoidalar (CLAUDE.md faylining qisman toʻplami)                                |
| **CONTRIBUTING.md**                         | Hissa qoʻshuvchilar uchun qoʻllanma: sozlash, conventional commits, testlash, PR jarayoni                              |
| **SECURITY.md**                             | Zaifliklar haqida xabar berish siyosati, qoʻllab-quvvatlanadigan versiyalar, tahdid modeli                             |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — hamjamiyatdagi xulq-atvorga oid talablar                                                        |
| **llm.txt**                                 | LLM kraulerlari uchun optimallashtirilgan oddiy matnli bosh sahifa (AI yordamchilari uchun SEO)                        |
| **package.json**                            | npm manifesti, skriptlar, bogʻliqliklar, dvijoklar, c8 qamrov chegarasi                                                |
| **package-lock.json**                       | Qulflangan bogʻliqliklar daraxti                                                                                       |
| **tsconfig.json**                           | Asosiy TypeScript konfiguratsiyasi                                                                                     |
| **tsconfig.typecheck-core.json**            | `src/` yadrosi uchun tur tekshiruvi konfiguratsiyasi                                                                   |
| **tsconfig.typecheck-noimplicit-core.json** | Qatʼiy (`noImplicitAny`) tur tekshiruvi                                                                                |
| **tsconfig.tsbuildinfo**                    | TS inkremental yigʻish keshi (git tomonidan eʼtiborga olinmaydi)                                                       |
| **next.config.mjs**                         | Next.js 16 yigʻish konfiguratsiyasi (mustaqil chiqish)                                                                 |
| **next-env.d.ts**                           | Next.js tomonidan avtomatik yaratilgan muhit turlari                                                                   |
| **eslint.config.mjs**                       | ESLint yassi konfiguratsiyasi (loyihaning har bir sohasi uchun qoidalar)                                               |
| **prettier.config.mjs**                     | Prettier formatlash qoidalari                                                                                          |
| **postcss.config.mjs**                      | Tailwind/CSS konveyeri uchun PostCSS konfiguratsiyasi                                                                  |
| **playwright.config.ts**                    | Playwright E2E test konfiguratsiyasi                                                                                   |
| **vitest.config.ts**                        | Vitest konfiguratsiyasi (standart testlar toʻplami)                                                                    |
| **vitest.mcp.config.ts**                    | MCP serveri / autoCombo / kesh testlari toʻplami uchun Vitest konfiguratsiyasi                                         |
| **sonar-project.properties**                | SonarQube/SonarCloud konfiguratsiyasi (kod sifati)                                                                     |
| **Dockerfile**                              | Koʻp bosqichli Docker yigʻilishi (builder → runner-base → runner-cli)                                                  |
| **docker-compose.yml**                      | 4 ta profil (base, cli, host, cliproxyapi) + redis yordamchi konteyneri bilan ishlab chiqish compose fayli             |
| **docker-compose.prod.yml**                 | Ishlab chiqarish compose fayli (20130-port, redis, nomlangan jildlar)                                                  |
| **.dockerignore**                           | Docker kontekstidan chiqarib tashlangan fayllar                                                                        |
| **fly.toml**                                | Fly.io joylashtirish konfiguratsiyasi (`sin` hududi, 20128-port, /data jildi)                                          |
| **.env.example**                            | Muhit fayli shabloni (birinchi oʻrnatishda avtomatik ravishda `.env` fayliga koʻchiriladi)                             |
| **.gitignore**                              | Git eʼtiborga olmaydigan andozalar                                                                                     |
| **.npmignore**                              | npm nashridan chiqarib tashlanadigan fayllar roʻyxati                                                                  |
| **.npmrc**                                  | npm konfiguratsiyasi (reyestr, lockfile siyosati)                                                                      |
| **.node-version**                           | Node versiyasini mahkamlash (nvm bilan mos vositalar tomonidan ishlatiladi)                                            |
| **.nvmrc**                                  | nvm uchun Node versiyasini mahkamlash                                                                                  |
| **eslint.complexity.config.mjs**            | Murakkablik ratcheti uchun ESLint konfiguratsiyasi (`scripts/check/check-complexity.mjs --config`)                     |
| **eslint.sonarjs.config.mjs**               | SonarJS qoidalari uchun ESLint konfiguratsiyasi (kognitiv murakkablik / takrorlanish)                                  |
| **source.config.ts**                        | Fumadocs `defineDocs` manba konfiguratsiyasi (`.source/` uchun maʼlumot beradi)                                        |
| **knip.json**                               | Knip konfiguratsiyasi — foydalanilmayotgan fayllar/eksportlar/bogʻliqliklar (oʻlik kod nazorati uchun maʼlumot beradi) |
| **stryker.conf.json**                       | Stryker mutatsion testlash konfiguratsiyasi                                                                            |
| **.size-limit.json**                        | size-limit bundle hajmi byudjeti konfiguratsiyasi                                                                      |
| **promptfooconfig.yaml**                    | promptfoo baholash konfiguratsiyasi                                                                                    |
| **.gitleaks.toml**                          | gitleaks maxfiy maʼlumotlarni skanerlash qoidalari toʻplami                                                            |
| **.zizmor.yml**                             | zizmor GitHub-Actions xavfsizlik lintingi konfiguratsiyasi                                                             |
| **socket.yml**                              | Socket.dev taʼminot zanjiri konfiguratsiyasi                                                                           |
| **news.json**                               | Mahalliylashtirilgan v2 eʼlonlar tasmasi; Radar ishga tushirish elementi nofaol holda yetkaziladi                      |
| **flake.nix** / **flake.lock**              | Nix dasturlash muhiti qobigʻi taʼrifi + qulflash fayli                                                                 |
| **.env**                                    | Mahalliy maxfiy maʼlumotlar (git tomonidan eʼtiborsiz qoldiriladi — `.env.example` asosida yaratiladi)                 |

> **v3.8.26 versiyasida ildiz katalogdan koʻchirildi (tartibga keltirish):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` va yaratiladigan `quality-metrics.json` (git tomonidan eʼtiborsiz qoldiriladi). [`## config/`](#config--static-configs--quality-gate-state) boʻlimiga qarang.

---

## `src/` — Next.js ilovasi

```
src/
├── app/                 # App Router (sahifalar + API marshrutlari + holat sahifalari + bosh sahifa)
├── lib/                 # Asosiy kutubxonalar / domen modullari (80 ta quyi katalog + yuqori darajadagi ~70 ta fayl)
├── domain/              # Sof domen mantiqi (siyosat mexanizmi, zaxira variant, xarajat, bloklash, comboResolver, baholash)
├── server/              # Faqat serverga moʻljallangan modullar (authz konveyeri, cors, autentifikatsiya middleware’i) — mijoz tomonidan import qilib boʻlmaydi
├── shared/              # Xavfsiz boʻlgan hollarda server va mijoz oʻrtasida umumiy (konstantalar, turlar, validatsiya, shartnomalar, yordamchi vositalar)
├── i18n/                # next-intl konfiguratsiyasi + har bir lokal uchun xabarlar JSON’i (42 ta lokal)
├── middleware/          # Next.js middleware’i (soʻrovni boyitish, lokalni aniqlash)
├── mitm/                # MITM proksi yadrosi: sertifikat yaratish/oʻrnatish, ishlov beruvchilar, nishonlar, inspektor, niqoblar, toʻgʻridan-toʻgʻri uzatish
│   ├── handlers/        # MitmHandlerBase’ni kengaytiruvchi 9 ta IDE-agent ishlov beruvchi klassi (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Trafikni yozib olish qatlami: bufer (xotiradagi halqali), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Model adapterlarini bogʻlash qatlami (eski moslashuv qatlami)
├── scripts/             # Loyiha ichidagi texnik xizmat skriptlari (masalan, backfillAggregation)
├── sse/                 # Eski SSE ishlov beruvchilari/xizmatlari (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Eski xotira ichidagi saqlash tizimi (src/lib/db foydasiga bosqichma-bosqich chiqarilmoqda)
├── types/               # Umumiy TS tur fayllari
├── instrumentation.ts   # Next.js telemetriya ilgagi (brauzer + edge)
├── instrumentation-node.ts  # Faqat Node uchun instrumentatsiya
└── proxy.ts             # HTTP-proksi kirish moslashuv qatlami
```

### `src/app/` — App Router (Next.js 16)

| Path                                                                         | Maqsad                                                                                                                                                                                                                                                                                                                         |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `app/api/v1/`                                                                | Ommaviy OpenAI-mos API (~25 ta quyi yoʻnalish: chat, completions, embeddings, files, batches, audio, images, videos, music, rerank, moderations, search, ws, agents, accounts, providers va boshqalar)                                                                                                                         |
| `app/api/v1beta/`                                                            | Gemini uslubidagi API yakuniy nuqtalari                                                                                                                                                                                                                                                                                        |
| `app/api/playground/`                                                        | Playground Studio yoʻnalishlari: `improve-prompt/` (POST — LLM promptini qayta yozuvchi), `presets/` (GET roʻyxati / POST yaratish), `presets/[id]/` (GET / PUT / DELETE) — `docs/frameworks/PLAYGROUND_STUDIO.md` ga qarang                                                                                                   |
| `app/api/` (v1 emas)                                                         | Boshqaruv/administrator yoʻnalishlari (~60 ta katalog: providers, combos, settings, mcp, a2a, evals, memory, skills, webhooks, compliance, resilience, monitoring, tunnels, cli-tools va boshqalar)                                                                                                                            |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST API — 12 ta yoʻnalish (server boshqaruvi, agent holati/DNS/xaritalashlar, chetlab oʻtish, sertifikat, upstream-CA). LOCAL_ONLY + SPAWN_CAPABLE. `docs/frameworks/AGENTBRIDGE.md §7` ga qarang.                                                                                                                |
| `app/api/tools/traffic-inspector/`                                           | Traffic Inspector REST + WS API — 16+ ta yoʻnalish (soʻrovlar, seanslar, xostlar, yozib olish rejimlari, eksport, ws). LOCAL_ONLY + SPAWN_CAPABLE. `docs/frameworks/TRAFFIC_INSPECTOR.md §8` ga qarang.                                                                                                                        |
| `app/a2a/`                                                                   | A2A JSON-RPC 2.0 kirish nuqtasi (`POST /a2a`)                                                                                                                                                                                                                                                                                  |
| `app/.well-known/agent.json/`                                                | A2A Agent Card (aniqlash)                                                                                                                                                                                                                                                                                                      |
| `app/(dashboard)/dashboard/`                                                 | Boshqaruv paneli UI sahifalari (50+ ta boʻlim, ~118 ta page.tsx fayli: providers, combos, settings, memory, skills, webhooks, evals, audit, batch, cache, costs, health, system, activity va boshqalar)                                                                                                                        |
| `app/(dashboard)/dashboard/search-tools/`                                    | Search Tools Studio UI (3 ta ichki oyna: Search/Scrape/Compare + SearchConceptCard + ProviderCatalog) — `docs/frameworks/SEARCH_TOOLS_STUDIO.md` ga qarang                                                                                                                                                                     |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (21-reja): `page.tsx` (3 ta ichki oynali qobiq), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | AgentBridge boshqaruv paneli sahifasi — server kartasi, 9 ta agent kartasi, sozlash ustasi, model xaritalashi, chetlab oʻtish roʻyxati. i18n PT-BR + EN. `docs/frameworks/AGENTBRIDGE.md` ga qarang.                                                                                                                           |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Traffic Inspector boshqaruv paneli sahifasi — DevTools boʻlinmasi, 7 ta tafsilotlar ichki oynasi, yozib olish rejimining 4 ta almashtirgichi, seans yozuvchisi, kontekstni rang bilan ajratish. i18n PT-BR + EN. `docs/frameworks/TRAFFIC_INSPECTOR.md` ga qarang.                                                             |
| `app/(dashboard)/dashboard/activity/`                                        | Faollik lentasi sahifasi (B guruhi): `page.tsx` (server) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — `docs/architecture/MONITORING_SECTIONS.md` fayliga qarang                                                                                                       |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Kvotani ulashish sahifasi (B guruhi): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                              |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Provayder tarif rejasini sozlash sahifasi (B guruhi): `page.tsx` + `ProviderPlanConfigClient.tsx` — har bir ulanish uchun kvota o‘lchamlarini qayta belgilash                                                                                                                                                                  |
| `app/docs/`                                                                  | Ichki hujjatlar ko‘ruvchisi (`docs/*.md` fayllarini renderlaydi)                                                                                                                                                                                                                                                               |
| `app/landing/`                                                               | Marketing uchun ochilish sahifasi                                                                                                                                                                                                                                                                                              |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Autentifikatsiyaga oid sahifalar                                                                                                                                                                                                                                                                                               |
| `app/{400,401,403,408,429,500,502,503}/`                                     | HTTP xatolik sahifalari                                                                                                                                                                                                                                                                                                        |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Statik/holat sahifalari                                                                                                                                                                                                                                                                                                        |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Ildiz maketi, bosh sahifa, PWA manifesti, global CSS                                                                                                                                                                                                                                                                           |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Xatolik chegaralari                                                                                                                                                                                                                                                                                                            |

### `src/lib/` — Asosiy kutubxonalar (~50 modul)

| Modul                                    | Maqsad                                                                                                                                                                                                                                                                                                                                       |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | A2A protokoli vazifalar menejeri, ko‘nikmalar (5), oqimli uzatish                                                                                                                                                                                                                                                                            |
| `acp/`                                   | CLI agentlar reyestri (mahalliy CLI vositalarini aniqlash — `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md` fayliga qarang)                                                                                                                                                                                                                       |
| `api/`                                   | Umumiy API yordamchilari (`requireManagementAuth`, tekshirish)                                                                                                                                                                                                                                                                               |
| `auth/`                                  | Seans, parolni xeshlash, tokenni tekshirish                                                                                                                                                                                                                                                                                                  |
| `batches/`                               | OpenAI Batches API ishlov beruvchilari                                                                                                                                                                                                                                                                                                       |
| `catalog/`                               | Provayder katalogini Zod orqali tekshirish + imkoniyatlarni aniqlash                                                                                                                                                                                                                                                                         |
| `cloudAgent/`                            | Bulutli agentlar (Codex Cloud, Devin, Jules) — `docs/frameworks/CLOUD_AGENT.md` fayliga qarang                                                                                                                                                                                                                                               |
| `combos/`                                | Kombinatsiyalarni aniqlash + qayta tartiblash yordamchilari                                                                                                                                                                                                                                                                                  |
| `audit/`                                 | Faoliyat tasmasi yordamchilari: `highLevelActions.ts` (ruxsat etilganlar ro‘yxati + `isHighLevelAction()`), `activityIcons.ts` (amal → belgi/fe’l xaritasi), `timeline.ts` (groupByDay/relativeTime) — `docs/architecture/MONITORING_SECTIONS.md` fayliga qarang                                                                             |
| `compliance/`                            | Audit jurnali + provayder auditi — `docs/security/COMPLIANCE.md` fayliga qarang                                                                                                                                                                                                                                                              |
| `compression/`                           | Siqish mexanizmini bog‘lovchi qatlam (mexanizmlar `open-sse/services/compression/` ichida joylashgan)                                                                                                                                                                                                                                        |
| `config/`                                | Ishlash vaqti konfiguratsiyasi yordamchilari                                                                                                                                                                                                                                                                                                 |
| `db/`                                    | 120+ ta sohaga oid ma’lumotlar bazasi moduli + 168 ta migratsiya (SQLite uchun har doim shu qatlam orqali murojaat qiling)                                                                                                                                                                                                                   |
| `quota/`                                 | Kvotani taqsimlash mexanizmi: `dimensions.ts` (turlar/Zod), `types.ts` (QuotaStore interfeysi), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — `docs/routing/QUOTA_SHARE.md` fayliga qarang |
| `radar/`                                 | Radar bepul modellar katalogi mijozi: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — `docs/frameworks/RADAR.md` ga qarang                                                                                                                                                      |
| `display/`                               | UI formatlash yordamchilari (narx, kechikish va boshqalar)                                                                                                                                                                                                                                                                                   |
| `embeddings/`                            | Embeddinglar xizmati yordamchilari                                                                                                                                                                                                                                                                                                           |
| `env/`                                   | Muhit o‘zgaruvchilarini tahlil qilish + tekshirish                                                                                                                                                                                                                                                                                           |
| `evals/`                                 | Baholash freymvorki (to‘plamlar, ishga tushiruvchi, bajarilish muhiti) — `docs/frameworks/EVALS.md` ga qarang                                                                                                                                                                                                                                |
| `guardrails/`                            | PII maskalovchi, prompt inʼeksiyasidan himoya, ko‘rish ko‘prigi — `docs/security/GUARDRAILS.md` ga qarang                                                                                                                                                                                                                                    |
| `jobs/`                                  | Fon vazifalari (cron kabi)                                                                                                                                                                                                                                                                                                                   |
| `memory/`                                | Suhbat xotirasi (SQLite FTS5 + sqlite-vec gibrid RRF + Qdrant 2-daraja) — `docs/frameworks/MEMORY.md` ga qarang                                                                                                                                                                                                                              |
| `memory/embedding/`                      | Ko‘p manbali embedding qatlami: `index.ts` (aniqlovchi), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (21-reja)                                                                                                                                                                                            |
| `memory/vectorStore.ts`                  | sqlite-vec v0.1.9 o‘rami — KNN to‘liq qidiruvi + gibrid RRF (FTS5 + vektor, k=60). Kechiktirib ishga tushiriladi, sqlite-vec mavjud bo‘lmaganda ish faoliyatini to‘xtatmasdan soddalashtirilgan rejimga o‘tadi. (21-reja)                                                                                                                    |
| `memory/reindex.ts`                      | `runReindexBatch()` — `needs_reindex=1` bo‘lgan xotiralarni fonda qayta ishlaydi; `POST /api/memory/reindex` va kechiktirilgan maʼlumot to‘ldirish yo‘li orqali chaqiriladi. (21-reja)                                                                                                                                                       |
| `monitoring/`                            | Holat tekshiruvlari, metrikalarni chiqarish                                                                                                                                                                                                                                                                                                  |
| `oauth/`                                 | 22 ta provayder moduli uchun OAuth/import jarayonlari (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                            |
| `plugins/`                               | Plaginlar reyestri                                                                                                                                                                                                                                                                                                                           |
| `promptCache/`                           | Anthropic uslubidagi prompt keshi nazorat nuqtalari                                                                                                                                                                                                                                                                                          |
| `skills/`                                | Ko‘nikmalar freymvorki (ichki + marketpleys + SkillsSH) — `docs/frameworks/SKILLS.md` ga qarang                                                                                                                                                                                                                                              |
| `playground/`                            | Playground Studio umumiy yordamchilari: `codeExport.ts` (curl/Python/TS generatori), `promptImprover.ts` (meta-prompt tuzuvchisi), `streamMetrics.ts` (sof TTFT/TPS), `types.ts` (narxlash jadvali) — `docs/frameworks/PLAYGROUND_STUDIO.md` ga qarang                                                                                       |
| `webhookDispatcher.ts`                   | HMAC webhook yetkazib berish — `docs/frameworks/WEBHOOKS.md` ga qarang                                                                                                                                                                                                                                                                       |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Tunnel boshqaruvchilari — `docs/ops/TUNNELS_GUIDE.md` ga qarang                                                                                                                                                                                                                                                                              |
| `cloudSync.ts`, `initCloudSync.ts`       | Holatni ixtiyoriy bulutli sinxronlash                                                                                                                                                                                                                                                                                                        |
| `localDb.ts`                             | db modullari uchun qayta eksport barrel-fayli (mantiq mavjud emas — faqat qayta eksport qiladi)                                                                                                                                                                                                                                              |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Soʻrovlarni keshlash + idempotentlik                                                                                                                                                                                                                                                                                                         |
| (yuqori darajadagi yana ~30 ta fayl)     | Maxsus yordamchilar (logEnv, modelsDevSync, piiSanitizer va boshqalar)                                                                                                                                                                                                                                                                       |

### `src/lib/db/` — Maʼlumotlar bazasi (122 ta modul + 168 ta migratsiya)

| Quyi katalog              | Maqsadi                                                                                                                                                                                         |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | WAL jurnallashiga ega `getDbInstance()` singletoni                                                                                                                                              |
| `db/migrations/`          | Versiyalangan SQL fayllari (idempotent, tranzaksion). `073_memory_vec.sql` fayli `memory_vec_meta` + `needs_reindex` ustunini qoʻshadi (21-reja).                                               |
| `db/playgroundPresets.ts` | Playground Studio presetlari uchun CRUD moduli (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`)                   |
| `db/memoryVec.ts`         | `memory_vec_meta` uchun CRUD (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue` va boshqalar (21-reja)                            |
| `db/<domain>.ts`          | Har bir domen uchun bittadan modul: providers, combos, apiKeys, users, sessions, usage, audit*log, webhooks, skills, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache va boshqalar. |

### `src/domain/`

| Modul                  | Maqsadi                                                                |
| ---------------------- | ---------------------------------------------------------------------- |
| `policy.ts`            | Siyosat mexanizmi                                                      |
| `fallbackPolicy.ts`    | Zaxira variantini tanlash qarorlar daraxti                             |
| `costRules.ts`         | Xarajatlarni hisoblash qoidalari                                       |
| `lockoutPolicy.ts`     | Model/ulanishni bloklash siyosati                                      |
| `tagRouter.ts`         | Teglarga asoslangan marshrutlash                                       |
| `comboResolver.ts`     | Kombinatsiyani aniqlash (kombinatsiya mexanizmi tomonidan ishlatiladi) |
| `modelAvailability.ts` | Har bir model uchun mavjudlik tekshiruvi                               |
| `assessment/`          | Modelni baholash (RFC-AUTO-ASSESSMENT hujjatining 1-bosqichi)          |

### `src/server/`

| Modul    | Maqsadi                                                                                                     |
| -------- | ----------------------------------------------------------------------------------------------------------- |
| `authz/` | Avtorizatsiya konveyeri: `classify` → `policies` → `enforce` — `docs/architecture/AUTHZ_GUIDE.md` ga qarang |
| `cors/`  | CORS konfiguratsiyasi                                                                                       |
| `auth/`  | Sessiya oraliq dasturi                                                                                      |

### `src/shared/`

| Modul                            | Maqsadi                                                                                                   |
| -------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `constants/providers.ts`         | Zod validatsiyasiga ega **355 ta provayder** (asosiy manba)                                               |
| `constants/cliTools.ts`          | Tashqi CLI vositalari reyestri                                                                            |
| `constants/routingStrategies.ts` | Ustuvorliklarga ega **19 ta marshrutlash strategiyasi**                                                   |
| `constants/publicApiRoutes.ts`   | Bearer autentifikatsiyasini talab qiladigan marshrutlar (boshqaruv autentifikatsiyasidan farqli ravishda) |
| `constants/upstreamHeaders.ts`   | Yuqori oqim soʻrovlari uchun sarlavhalar taqiq roʻyxati                                                   |
| `validation/schemas.ts`          | ~80 ta Zod sxemasi (API shartnomalari uchun yagona asosiy manba)                                          |
| `validation/helpers.ts`          | Zod validatsiya yordamchilari (`validateBody` va boshqalar)                                               |
| `types/`                         | Umumiy TS turlari                                                                                         |
| `contracts/`                     | Ochiq API shartnomalari (`package.json` ichidagi `files:` tomonidan ishlatiladi)                          |
| `utils/circuitBreaker.ts`        | Provayderning avtomatik uzgichi (`docs/architecture/RESILIENCE_GUIDE.md` fayliga qarang)                  |
| `utils/apiAuth.ts`               | API kalitini tekshirish, ruxsat doirasini tekshirish                                                      |
| `utils/fetchTimeout.ts`          | Yuqori oqimdagi fetch uchun kutish vaqti/uzish oʻramlari                                                  |
| `utils/releaseNotes.ts`          | Yopilgan v2/eski eʼlonlar parseri, mahalliylashtirish va ID boʻyicha rad etish                            |

---

## `open-sse/` — Oqimli uzatish mexanizmi ish maydoni

Alohida npm ish maydoni (`@omniroute/open-sse`). Soʻrovlarni qayta ishlash va provayder ijrosini boshqaradi.

```
open-sse/
├── handlers/            # 16 ta fayl (12 ta ishlov beruvchi + 4 ta yordamchi): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search va boshqalar.
├── executors/           # Provayderga xos 67 ta ijrochi (BaseExecutor imkoniyatlarini kengaytiradi)
├── translator/          # Format konvertorlari (9 ta soʻrov, 9 ta javob, 9 ta yordamchi)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ ta xizmat moduli (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM va boshqalar)
├── mcp-server/          # MCP serveri (110 ta vosita, 3 ta transport, 33 ta qamrov)
├── config/              # Provayder/model reyestrlari, sarlavha konfiguratsiyasi, model taxalluslari
├── utils/               # TLS mijozi, proksi fetch/dispatcher, tarmoq yordamchilari
├── index.ts             # Ish maydonining kirish nuqtasi
├── package.json         # Ish maydoni manifesti
├── tsconfig.json        # Ish maydonining TS konfiguratsiyasi
└── types.d.ts           # Ish maydoni tur deklaratsiyalari
```

### `open-sse/mcp-server/`

| Yoʻl                        | Vazifasi                                                                                 |
| --------------------------- | ---------------------------------------------------------------------------------------- |
| `server.ts`                 | MCP serverining hayotiy sikli (stdio + HTTP transportlari)                               |
| `httpTransport.ts`          | HTTP Streamable + SSE transportlari (`/api/mcp/sse`, `/api/mcp/stream`)                  |
| `audit.ts`                  | `mcp_tool_audit` jadvaliga audit jurnalini yozish                                        |
| `scopeEnforcement.ts`       | Har bir vosita uchun qamrovni tekshirish                                                 |
| `runtimeHeartbeat.ts`       | `DATA_DIR/runtime/mcp-heartbeat.json` fayliga holat signalini yozish                     |
| `descriptionCompressor.ts`  | Kontekstni tejash uchun vosita tavsifi metamaʼlumotlarini siqish                         |
| `schemas/tools.ts`          | 36 ta asosiy vosita taʼrifi + qamrovlar                                                  |
| `tools/advancedTools.ts`    | Kengaytirilgan vositalar implementatsiyalari                                             |
| `tools/memoryTools.ts`      | 3 ta xotira vositasi (qidirish/qoʻshish/tozalash)                                        |
| `tools/skillTools.ts`       | 4 ta koʻnikma vositasi (roʻyxat/yoqish/bajarish/bajarilishlar)                           |
| `tools/compressionTools.ts` | 5 ta siqish vositasi                                                                     |
| `README.md`                 | Ichki MCP serveri README fayli (`docs/frameworks/MCP-SERVER.md` bilan oʻzaro bogʻlangan) |

---

## `electron/` — Ish stoli ilovasi qobigʻi

| Fayl             | Vazifasi                                                                                          |
| ---------------- | ------------------------------------------------------------------------------------------------- |
| `main.js`        | Electron asosiy jarayoni (BrowserWindow, ichki Next.js serveri, tizim treyi, avtomatik yangilash) |
| `preload.js`     | IPC koʻprigi (contextBridge → `window.omniroute`)                                                 |
| `package.json`   | electron-builder konfiguratsiyasi + Electron 41 + electron-builder 26.10 bogʻliqliklari           |
| `assets/`        | Ilova ikonkalari (Windows .ico, macOS .icns, Linux .png)                                          |
| `dist-electron/` | Yigʻish natijasi (git tomonidan eʼtiborsiz qoldiriladi)                                           |
| `types.d.ts`     | Renderer koʻprigi uchun tur deklaratsiyalari                                                      |
| `README.md`      | Ichki Electron README fayli (shuningdek, `docs/guides/ELECTRON_GUIDE.md` ga qarang)               |

---

## `bin/` — CLI

| Fayl                                                                                                        | Vazifasi                                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Asosiy CLI kirish nuqtasi — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos` va boshqalar |
| `reset-password.mjs`                                                                                        | Mustaqil parolni tiklash CLI vositasi                                                                                                        |
| `cli/commands/setup.mjs`                                                                                    | Interaktiv va nointeraktiv sozlash ustasi                                                                                                    |
| `cli/commands/doctor.mjs`                                                                                   | Tizim holati diagnostikasi (8 dan ortiq tekshiruv)                                                                                           |
| `cli/commands/providers.mjs`                                                                                | Provayderlarni roʻyxatlash/sinash/tekshirish                                                                                                 |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | CLI yordamchi modullari                                                                                                                      |
| `cli/tray/tray.ts`                                                                                          | Tizim treyi bilan integratsiya (platformalararo: Windows’da NotifyIcon, macOS/Linux’da systray2)                                             |
| `cli/tray/tray.ps1`                                                                                         | PowerShell NotifyIcon backendi (Windows, yangi binar fayllarsiz)                                                                             |
| `cli/tray/autostart.ts`                                                                                     | Platformalararo avtomatik ishga tushirish (LaunchAgent / .desktop / reyestr)                                                                 |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | SQLite drayverini aniqlashning 5 bosqichli zanjiri (toʻplamdagi → ish muhiti → kechiktirib oʻrnatish → node:sqlite → sql.js)                 |
| `cli/runtime/magicBytes.mjs`                                                                                | Binar faylning magic-byte tekshiruvi (ELF / Mach-O / Mach-O fat / PE)                                                                        |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — postinstall / ilk ishga tushirish vaqtida drayverlarni oldindan aniqlaydi                                               |
| `nodeRuntimeSupport.mjs`                                                                                    | Oʻrnatish vaqtida qoʻllab-quvvatlanadigan Node.js versiyasini tekshiradi                                                                     |

---

## `skills/` — Ommaviy agent ko‘nikmalari

| Fayl                         | Maqsad                                                                                      |
| ---------------------------- | ------------------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | Tashqi AI agentlari (Claude Desktop, ChatGPT, Cursor, Cline) uchun 10 ta ko‘nikma manifesti |

---

## `scripts/` — Qurish va tekshirish skriptlari

| Skript                              | Maqsad                                                                                                  |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `run-next.mjs`                      | Muhit sozlamalarini yuklaydigan ishlab chiqish/ishga tushirish vositasi                                 |
| `build-next-isolated.mjs`           | Mustaqil qurish (Next.js 16 standalone)                                                                 |
| `prepublish.ts`                     | `npm pack` oldidan paketni tayyorlash                                                                   |
| `postinstall.mjs`                   | Birinchi o‘rnatishda `.env.example` asosida `.env` faylini avtomatik yaratish                           |
| `sync-env.mjs`                      | `.env` kalitlarini `.env.example` bilan qayta sinxronlash                                               |
| `check-cycles.mjs`                  | Siklik bog‘liqliklarni aniqlash                                                                         |
| `check-route-validation.mjs`        | Barcha API yo‘nalishlarida Zod validatsiyasi mavjudligini tekshirish                                    |
| `check-t11-any-budget.mjs`          | Har bir fayl uchun aniq `any` limitini ta’minlash                                                       |
| `check-docs-sync.mjs`               | Hujjatlar versiyasi sinxronligini tekshirish (mavjud pre-commit)                                        |
| **`check-env-doc-sync.mjs`**        | YANGI: koddagi muhit o‘zgaruvchilarini `.env.example` va `ENVIRONMENT.md` bilan o‘zaro tekshirish       |
| **`check-docs-counts-sync.mjs`**    | YANGI: sonlarning (ijrochilar, strategiyalar, OAuth, A2A ko‘nikmalari) hujjatlarga mosligini tekshirish |
| **`check-deprecated-versions.mjs`** | YANGI: hujjatlardagi eskirgan versiyalar/sanalarni belgilash                                            |
| `check-supported-node-runtime.ts`   | Joriy Node versiyasi qo‘llab-quvvatlanishini tekshirish                                                 |
| `check-pr-test-policy.mjs`          | Ishlab chiqarish kodidagi o‘zgarishlar uchun „testlar talab qilinadi“ qoidasini ta’minlash              |
| **`gen-provider-reference.ts`**     | YANGI: katalogdan `docs/reference/PROVIDER_REFERENCE.md` faylini avtomatik yaratish                     |
| `i18n/generate-multilang.mjs`       | Google Translate orqali UI satrlari va hujjatlarni tarjima qilish                                       |
| `i18n_autotranslate.py`             | LLM asosidagi hujjatlarni tarjima qilish konveyeri                                                      |
| `validate_translation.py`           | Har bir lokal uchun tarjimani tekshirish                                                                |
| `check_translations.py`             | Kod tomonidagi i18n kalitlarini tekshirish                                                              |
| `run-playwright-tests.mjs`          | Playwright E2E ishga tushirish vositasi                                                                 |
| `run-protocol-clients-tests.mjs`    | MCP/A2A E2E ishga tushirish vositasi                                                                    |
| `run-ecosystem-tests.mjs`           | Ekotizim (provayder integratsiyasi) testlari                                                            |
| `test-report-summary.mjs`           | Qamrov xulosasi markdownini yaratish                                                                    |
| `smoke-electron-packaged.mjs`       | Paketlangan Electron qurilmasini smoke-testdan o‘tkazish                                                |
| `native-binary-compat.mjs`          | Mahalliy bog‘liqliklar (`better-sqlite3`) Electron’ning Node versiyasiga mosligini tekshirish           |
| `validate-pack-artifact.ts`         | npm pack natijasini tekshirish                                                                          |
| `responses-ws-proxy.mjs`            | Codex Responses API uchun WebSocket ko‘prigi                                                            |
| `v1-ws-bridge.mjs`                  | `/api/v1/ws` endpointi uchun WebSocket ko‘prigi                                                         |
| `standalone-server-ws.mjs`          | Mustaqil WS serverini ishga tushirish vositasi                                                          |
| `system-info.mjs`                   | Qo‘llab-quvvatlash uchun tizim/ishlash muhiti ma’lumotlarini chiqarish                                  |
| `healthcheck.mjs`                   | Bir martalik holat tekshiruvi (Docker HEALTHCHECK tomonidan ishlatiladi)                                |
| `uninstall.mjs`                     | Toza o‘chirish skripti                                                                                  |

---

## `docs/` — Ommaviy hujjatlar (ildizda 7 ta fayl + 17 ta quyi katalog)

### Yuqori darajadagi qoʻllanmalar

| Hujjat                      | Maqsadi                                                                                                        |
| --------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Yuqori darajadagi arxitektura, quyi tizimlar xaritasi, boshqaruv paneli interfeysi                             |
| `CODEBASE_DOCUMENTATION.md` | Muhandislik maʼlumotnomasi: kataloglar, modullar, kelishuvlar                                                  |
| `FEATURES.md`               | v3.8 yangiliklari bilan imkoniyatlar matritsasi                                                                |
| `USER_GUIDE.md`             | Yakuniy foydalanuvchi qoʻllanmasi (sozlash, modellar, kombinatsiyalar, CLIʼlar, audio va boshqalar)            |
| `API_REFERENCE.md`          | Autentifikatsiya modeli bilan API endpointlari maʼlumotnomasi                                                  |
| `openapi.yaml`              | OpenAPI 3.0 spetsifikatsiyasi (121 ta yoʻl)                                                                    |
| `SETUP_GUIDE.md`            | Oʻrnatish usullari (npm, npx, Docker, Electron, Termux, manba kodi)                                            |
| `ENVIRONMENT.md`            | Barcha muhit oʻzgaruvchilari (~800 tasi hujjatlashtirilgan, `.env.example` ~3 050 qator)                       |
| `TROUBLESHOOTING.md`        | Keng tarqalgan xatolar + v3.8.0 maʼlum muammolari                                                              |
| `RELEASE_CHECKLIST.md`      | Toʻliq reliz jarayoni (koʻnikmalar, husky, anʼanaviy commitlar, joylashtirish)                                 |
| `COVERAGE_PLAN.md`          | Qamrov maqsadlari va joriy holat                                                                               |
| `FREE_TIERS.md`             | Saralangan bepul tarifli provayderlar (48+ ta bepul + 11 ta OAuth)                                             |
| `CLI-TOOLS.md`              | Tashqi CLI integratsiyalari + ichki OmniRoute CLI                                                              |
| `I18N.md`                   | i18n arxitekturasi, til qoʻshish, 42 ta lokal                                                                  |
| `UNINSTALL.md`              | Toza oʻchirish bosqichlari                                                                                     |
| `PROVIDER_REFERENCE.md`     | 355 ta provayderdan iborat **avtomatik yaratilgan** katalog (qayta yaratish: `npm run gen:provider-reference`) |

### Quyi tizimlar boʻyicha batafsil qoʻllanmalar

| Hujjat                                          | Maqsadi                                                                             |
| ----------------------------------------------- | ----------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                                 | MCP serveri: 110 ta vosita, 3 ta transport, 33 ta qamrov, REST endpointlari         |
| `A2A-SERVER.md`                                 | A2A v0.3: JSON-RPC, 6 ta koʻnikma, REST yordamchilari, agent kartasi                |
| `AGENT_PROTOCOLS_GUIDE.md`                      | Yagona qoʻllanma: A2A va ACP va Cloud Agents taqqoslanishi                          |
| `CLOUD_AGENT.md`                                | Codex Cloud / Devin / Jules orkestratsiyasi                                         |
| `SKILLS.md`                                     | Koʻnikmalar freymvorki (ichki + marketplace + SkillsSH + sandbox)                   |
| `RADAR.md`                                      | Radar bepul modellar katalogi ustqurmasi (`RADAR_ENABLED`, standart holatda oʻchiq) |
| `MEMORY.md`                                     | Xotira tizimi (SQLite FTS5 + Qdrant)                                                |
| `EVALS.md`                                      | Baholash freymvorki (toʻplamlar, ishga tushirishlar, mezonlar)                      |
| `GUARDRAILS.md`                                 | PII niqoblagichi, prompt inʼeksiyasi, tasvir koʻprigi                               |
| `COMPLIANCE.md`                                 | Audit jurnali, saqlash, noLog orqali voz kechish                                    |
| `WEBHOOKS.md`                                   | HMAC bilan imzolangan webhook yetkazib berilishi                                    |
| `REASONING_REPLAY.md`                           | `reasoning_content` uchun gibrid xotira/SQLite keshi                                |
| `AUTHZ_GUIDE.md`                                | Avtorizatsiya konveyeri (`classify` → `policies` → `enforce`)                       |
| `RESILIENCE_GUIDE.md`                           | Zanjir uzgich + kutish davri + modelni bloklash                                     |
| `docs/security/STEALTH_GUIDE.md` (faqat gitʼda) | TLS barmoq izi (JA3/JA4), Claude Code CCH, MITM sertifikati                         |
| `AUTO-COMBO.md`                                 | Auto Combo mexanizmi (16 omilli baholash, 6 ta rejim toʻplami, virtual fabrika)     |

### Siqish

| Hujjat                          | Maqsadi                                                 |
| ------------------------------- | ------------------------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Siqish rejimlari haqida umumiy maʼlumot + yoʻl xaritasi |
| `COMPRESSION_ENGINES.md`        | Caveman + RTK mexanizmlari, reyestr shartnomasi         |
| `COMPRESSION_RULES_FORMAT.md`   | Caveman qoidalar toʻplamining JSON sxemasi              |
| `COMPRESSION_LANGUAGE_PACKS.md` | Har bir til uchun qoidalar toʻplami inventari           |
| `RTK_COMPRESSION.md`            | RTK deklarativ konveyeri (49 ta filtr)                  |

### Joylashtirish

| Hujjat                       | Maqsadi                                                                     |
| ---------------------------- | --------------------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Docker yigʻish, profillar (base/cli/host/cliproxyapi), Redis yon konteyneri |
| `VM_DEPLOYMENT_GUIDE.md`     | Umumiy VM/VPS joylashtirish (Ubuntu/Debian + nginx + systemd)               |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Fly.ioʼga joylashtirish (hozircha faqat xitoy tilida)                       |
| `TERMUX_GUIDE.md`            | Termux orqali Androidʼda grafik interfeyssiz ishlash                        |
| `PWA_GUIDE.md`               | Progressive Web App oʻrnatish + service worker                              |
| `ELECTRON_GUIDE.md`          | Ish stoli ilovasini yigʻish + imzolash + tarqatish                          |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                                      |
| `PROXY_GUIDE.md`             | 4 darajali chiquvchi proksi + 1proxy marketplace                            |

### Quyi kataloglar

| Quyi katalog          | Maqsadi                                                                                                                                                                                                                                                    |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Mahalliylashtirilgan hujjat tarjimalari (41 ta til varianti)                                                                                                                                                                                               |
| `docs/screenshots/`   | Qoʻllanmalar uchun tasvir resurslari                                                                                                                                                                                                                       |
| `_tasks/superpowers/` | superpowers (`writing-plans`/`brainstorming`) rejalari/spetsifikatsiyalari va tadqiqotlar — izolyatsiya qilingan, alohida versiyalanadigan repo, asosiy daraxt tomonidan gitignore qilingan. CLAUDE.md → "Planning & Research Artifacts" boʻlimiga qarang. |

---

## `tests/` — Test toʻplamlari

| Quyi katalog                         | Turi                                             | Ishga tushiruvchi                                   |
| ------------------------------------ | ------------------------------------------------ | --------------------------------------------------- |
| `tests/unit/`                        | Modul testlari (~4 800 ta fayl, eng tezkor)      | Node ichki test ishga tushiruvchisi                 |
| `tests/integration/`                 | Koʻp modulli + DB integratsiya testlari          | Node ichki test ishga tushiruvchisi (parallellik 1) |
| `tests/e2e/`                         | UI + ish jarayoni E2E                            | Playwright                                          |
| `tests/e2e/protocol-clients.test.ts` | MCP + A2A haqiqiy mijozli E2E                    | Maxsus protokol mijozlari                           |
| `tests/e2e/ecosystem.test.ts`        | Provayder integratsiyasi (tarmoqdan foydalanadi) | Node ichki test ishga tushiruvchisi                 |

---

## `public/` — Statik resurslar

| Yoʻl                | Maqsad                                                              |
| ------------------- | ------------------------------------------------------------------- |
| `public/` (ildiz)   | Favikonlar, robots.txt, manifest, servis vorker, marketing rasmlari |
| `public/providers/` | Provayder logotiplari PNG/SVG (boshqaruv panelida ishlatiladi)      |

---

## `config/` — Statik konfiguratsiyalar + sifat nazorati holati

Yetkazib beriladigan konfiguratsiya shablonlari va repozitoriyga kiritilgan sifat nazorati bazaviy koʻrsatkichlari
(ildiz katalogni ixcham saqlash uchun v3.8.26 versiyasida repo ildizidan bu yerga koʻchirilgan).

| Yoʻl                                          | Maqsad                                                                                             |
| --------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Lokallar roʻyxati + metamaʼlumotlar (42 ta lokal soni uchun kanonik manba)                         |
| `config/i18n-schema.json`                     | `i18n.json` faylini tekshiruvchi JSON sxemasi                                                      |
| `config/payloadRules.json`                    | Yuqori oqimdagi foydali yukni sanitizatsiya qilish qoidalari                                       |
| `config/quality/quality-baseline.json`        | Koʻp metrikali bosqichma-bosqich bazaviy koʻrsatkich (`scripts/quality/check-quality-ratchet.mjs`) |
| `config/quality/complexity-baseline.json`     | Muzlatilgan ESLint murakkablik bazaviy koʻrsatkichi (`check-complexity.mjs`)                       |
| `config/quality/duplication-baseline.json`    | Muzlatilgan jscpd takrorlanish bazaviy koʻrsatkichi (`check-duplication.mjs`)                      |
| `config/quality/file-size-baseline.json`      | Har bir fayl uchun muzlatilgan hajm bazaviy koʻrsatkichi (`check-file-size.mjs`)                   |
| `config/quality/test-discovery-baseline.json` | Muzlatilgan yetim testlar bazaviy koʻrsatkichi (`check-test-discovery.mjs`)                        |
| `config/quality/dependency-allowlist.json`    | Tasdiqlangan bogʻliqliklar ruxsat roʻyxati (`check-deps.mjs`)                                      |
| `config/quality/.license-allowlist.json`      | SPDX litsenziyalari ruxsat roʻyxati (`check-licenses.mjs`)                                         |
| `config/quality/quality-metrics.json`         | Vaqtinchalik yigʻilgan metrikalar (`collect-metrics.mjs` tomonidan yaratiladi; **gitignored**)     |

---

## `.github/` — GitHub integratsiyasi

| Yoʻl                               | Maqsad                                                           |
| ---------------------------------- | ---------------------------------------------------------------- |
| `.github/workflows/`               | GitHub Actions CI/CD ish jarayonlari (lint, test, qamrov, reliz) |
| `.github/ISSUE_TEMPLATE/`          | Xato/yangi funksiya muammosi shablonlari                         |
| `.github/pull_request_template.md` | PR shabloni                                                      |
| `.github/dependabot.yml`           | Bogʻliqliklarni yangilash konfiguratsiyasi                       |

---

## `.husky/` — Git huklari

| Fayl         | Maqsad                                                                        |
| ------------ | ----------------------------------------------------------------------------- |
| `pre-commit` | `lint-staged + check-docs-sync + check:any-budget:t11` ni ishga tushiradi     |
| `pre-push`   | Hozirda oʻchirilgan (izohga olingan). `npm run test:unit` ni qoʻlda bajaring. |
| `_/`         | Husky ichki komponentlari                                                     |

---

## `.claude/` — Claude Code slash-buyruqlari

| Fayl                                                | Maqsad                                                                   |
| --------------------------------------------------- | ------------------------------------------------------------------------ |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — versiyani oshirish + avtomatik oʻzgarishlar jurnali |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — toʻliq reliz ish jarayoni                       |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | VPS’ga joylashtirish                                                     |
| `commands/capture-release-evidences-cc.md`          | Yangi funksiyalarni brauzerda WebP sifatida yozib olish                  |
| `commands/review-{prs,discussions}-cc.md`           | GitHub PR va muhokamalarini saralash                                     |
| `commands/{review-issues,implement-features}-cc.md` | Muammolar bilan ishlash jarayonlari                                      |
| `settings.local.json`                               | Har bir loyiha uchun Claude Code sozlamalari                             |

---

## `.agents/` — Umumiy agent ish jarayonlari (Codex / Cursor / va boshqalar)

| Yoʻl                     | Maqsad                                                   |
| ------------------------ | -------------------------------------------------------- |
| `workflows/*-ag.md`      | 11 ta ish jarayoni taʼrifi (`.claude/commands/` nusxasi) |
| `skills/<name>/SKILL.md` | Codex bajarish qaydlari bilan 9 ta koʻnikma taʼrifi      |

> **Eslatma:** Ish jarayonlari va buyruqlar hozirda baytma-bayt bir xil. Agar `.agents/` boshqa agent ishga tushirish muhitiga (Codex) moʻljallangan boʻlsa, variantlar mazmunli tarzda farqlanishi kerak.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Asosiy daraxtdan tashqarida

Pastki chiziq bilan boshlanuvchi ushbu kataloglarda tarqatilmaydigan kontent saqlanadi:

- **`_ideia/`** — dizayn qaydlari (kechiktirish / mos emas / maqsadga muvofiq toifalari)
- **`_mono_repo/`** — tarixiy quyi loyihalar (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — ishlab chiqish davomida oʻzaro tekshirish uchun tegishli OSS loyihalarining faqat oʻqish uchun klonlari (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api va boshqalar)
- **`_tasks/`** — har bir reliz boʻyicha vazifalarni kuzatish fayllari (norasmiy)

`npm pack` chiqishiga kiritilmagan. `.npmignore` fayliga qarang.

---

## Yaratilgan / Git tomonidan eʼtiborga olinmaydigan

| Yoʻl                   | Maqsad                           |
| ---------------------- | -------------------------------- |
| `node_modules/`        | npm bogʻliqliklari               |
| `.next/`               | Next.js build natijasi           |
| `coverage/`            | c8 qamrov hisobotlari            |
| `logs/`                | Ishlash vaqtidagi jurnallar      |
| `package/`             | npm pack uchun tayyorlash        |
| `.playwright-mcp/`     | Playwright MCP test artefaktlari |
| `.issues/`             | Mahalliy muammolar keshi         |
| `tsconfig.tsbuildinfo` | TS inkremental keshi             |

---

## Navigatsiya boʻyicha maslahatlar

- **Yangi hissa qoʻshuvchimisiz?** `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md` fayllarini oʻqing.
- **Provayder qoʻshyapsizmi?** `docs/architecture/ARCHITECTURE.md § Yangi provayder qoʻshish` koʻrsatmalariga amal qiling va `docs/reference/PROVIDER_REFERENCE.md` bilan solishtirib tekshiring.
- **Marshrut qoʻshyapsizmi?** `docs/architecture/ARCHITECTURE.md § Yangi API marshrutini qoʻshish` + `src/shared/validation/schemas.ts`.
- **MCP vositasini qoʻshyapsizmi?** `docs/frameworks/MCP-SERVER.md § Vosita qoʻshish`.
- **A2A koʻnikmasini qoʻshyapsizmi?** `docs/frameworks/A2A-SERVER.md § Yangi koʻnikma qoʻshish`.
- **Mahalliy muhitda ishga tushiryapsizmi?** `docs/guides/SETUP_GUIDE.md`.
- **Joylashtiryapsizmi?** `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Reliz chiqaryapsizmi?** `docs/ops/RELEASE_CHECKLIST.md` (va `/generate-release-cc` Claude Code koʻnikmasi).
