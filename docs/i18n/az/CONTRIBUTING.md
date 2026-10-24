# Contributing to OmniRoute (Azərbaycan dili)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## İnkişaf mühitinin qurulması

### İlkin tələblər

- **Node.js** `>=22.22.2 <23` və ya `>=24.0.0 <27` (tövsiyə olunur: 24 LTS)
- **npm** 10+

> **npm v11+ istifadəçiləri (Node 24+):** `npm install` əmrindən sonra yerli modulların quraşdırıldığını yoxlayın:
> `node -e "require('better-sqlite3')"`. Əgər `MODULE_NOT_FOUND` xətası ilə uğursuz olarsa,
> `npm approve-scripts better-sqlite3 && npm install` əmrini icra edin. Baxın:
> [Problemlərin aradan qaldırılması](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Klonlama və quraşdırma

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Mühit dəyişənləri

```bash
# Şablondan .env faylınızı yaradın
cp .env.example .env

# Tələb olunan məxfi dəyərləri yaradın
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

İnkişaf üçün əsas dəyişənlər:

| Dəyişən                | İnkişaf üçün standart    | Təsvir                      |
| ---------------------- | ------------------------ | --------------------------- |
| `PORT`                 | `20128`                  | Server portu                |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | Ön tərəf üçün əsas URL      |
| `JWT_SECRET`           | (yuxarıda yaradın)       | JWT imzalama məxfi dəyəri   |
| `INITIAL_PASSWORD`     | `CHANGEME`               | İlk giriş parolu            |
| `APP_LOG_LEVEL`        | `info`                   | Jurnal təfərrüatı səviyyəsi |

### İdarəetmə paneli parametrləri

İdarəetmə paneli, həmçinin mühit dəyişənləri vasitəsilə konfiqurasiya edilə bilən funksiyalar üçün interfeys keçidləri təqdim edir:

| Parametrin yeri        | Keçid paneli          | Təsvir                                          |
| ---------------------- | --------------------- | ----------------------------------------------- |
| Parametrlər → Qabaqcıl | Sazlama rejimi        | Sazlama sorğusu jurnallarını aktivləşdirir (UI) |
| Parametrlər → Ümumi    | Yan panelin görünməsi | Yan panel bölmələrini göstərir/gizlədir         |

Bu parametrlər verilənlər bazasında saxlanılır və yenidən başladılmalar arasında qorunur; təyin edildikdə mühit dəyişənlərinin standart dəyərlərini üstələyir.

### Lokal olaraq işə salma

```bash
# İnkişaf rejimi (avtomatik yenidən yükləmə)
npm run dev

# İstehsal yığımı
npm run build    # next build → .build/next/, sonra assembleStandalone → dist/
npm run start

# Töhfə verənlərin dəyişiklikləri üçün yalnız arxa tərəf/API üzrə sürətli kompilyasiya
npm run build:contributor

# Buraxılış yığımı (təmiz yenidən yığım + HEAD nəzarət göstəricisi — yerləşdirmə üçün tələb olunur)
npm run build:release   # rm -rf .build dist && build + dist/BUILD_SHA faylını yazır

# Ümumi port konfiqurasiyası
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Töhfə verənlər üçün yığım yalnız kompilyasiya yoxlamasını həyata keçirir: o, müstəqil
paylanmanı yığmır və ya istəyə bağlı yerli paketləmə resurslarını yaratmır. Paylana bilən paketi
yoxlamaq lazım olduqda adi istehsal yığımından istifadə edin.

### Yığım çıxışının strukturu

| Kataloq   | Məzmun                                                                     | İzlənilir |
| --------- | -------------------------------------------------------------------------- | --------- |
| `src/`    | Tətbiqin mənbə kodu (TypeScript / TSX)                                     | Bəli      |
| `.build/` | Aralıq fayllar — `next build` çıxışı (gitignored, `distDir = .build/next`) | Xeyr      |
| `dist/`   | Paylana bilən paket — `assembleStandalone` tərəfindən yığılır (gitignored) | Xeyr      |

Yığım konveyeri bir keçiddən ibarətdir:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js çıxışı)
  └─ assembleStandalone()                 (standalone + static + public + yerli resursları kopyalayır)
       └─ çıxış: dist/                    (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` əlavə olaraq əvvəlcə hər iki kataloqu təmizləyir və yerləşdirmə bütövlüyünün
nəzarət göstəricisi kimi `dist/BUILD_SHA` (= `git rev-parse --short HEAD`) faylını yazır.

`npm run build:contributor` yalnız arxa tərəf üçün yığım profilindən istifadə edir. O, yığım zamanı
idarəetmə panelinin UI fayllarını müvəqqəti əvəz edir, API marşrut emalçılarını saxlayır və yığımdan
sonra orijinal faylları bərpa edir. İdarəetmə panelinin UI hissəsinə təsir edən dəyişikliklər və ya tam
buraxılış yoxlaması üçün `npm run build` istifadə edin; töhfə verənlər profili buraxılış yığımını əvəz etmir.

> **VPS-də yerləşdirmə qeydi:** uzaq təsvir kataloqu `/usr/lib/node_modules/omniroute/app/`
> dəyişməyib. Yerləşdirmə vasitələri `dist/` məzmununu rsync vasitəsilə ora köçürür.
> Yalnız repozitoriya daxilindəki yığım çıxışının yolu dəyişib (`app/` → `dist/`).

Standart URL-lər:

- **İdarəetmə paneli**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git İş Axını

> ⚠️ **HEÇ VAXT birbaşa `main` budağına commit etməyin.** Həmişə xüsusiyyət budaqlarından istifadə edin.
>
> **PR bazası:** aktiv `release/vX.Y.Z` budağını (`main` deyil) hədəfləyin. Hər buraxılış üçün ayrıca budaq + buraxılış zamanı teq modelinə dair
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) sənədinə
> baxın.

```bash
# Aktiv buraxılışın son nöqtəsindən budaq yaradın (nümunə: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... dəyişiklikləri edin ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# base = release/v3.8.49 olmaqla Pull Request açın
```

### Budaqların Adlandırılması

| Prefiks     | Məqsəd                       |
| ----------- | ---------------------------- |
| `feat/`     | Yeni xüsusiyyətlər           |
| `fix/`      | Xəta düzəlişləri             |
| `refactor/` | Kodun yenidən qurulması      |
| `docs/`     | Sənədləşdirmə dəyişiklikləri |
| `test/`     | Test əlavələri/düzəlişləri   |
| `chore/`    | Alətlər, CI, asılılıqlar     |

### Commit Mesajları

[Conventional Commits](https://www.conventionalcommits.org/) qaydalarına əməl edin:

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Əhatə dairələri (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Testlərin işə salınması

```bash
# Bütün testlər (modul + vitest + ekosistem + e2e)
npm run test:all

# Tək test faylı (Node.js-ün daxili test icraedicisi — testlərin əksəriyyəti bundan istifadə edir)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Yalnız etdiyiniz dəyişiklikdən təsirlənən modul testləri (CI keçidi ilə eyni TIA selektoru, #8084)
npm run test:scoped            # son commit-dəki (və ya işçi ağacındakı) dəyişikliklər
npm run test:scoped:staged     # yalnız mərhələlənmiş dəyişikliklər — pre-commit işə salınması ilə yaxşı uyğunlaşır
npm run test:scoped:full       # əvvəlcə import qrafı xəritəsini yenidən qurur (fayllar əlavə edildikdən/köçürüldükdən sonra)
# Çıxış 1 + "tam dəsti işə salın" mesajı mərkəzi faylın (tsconfig, package.json, …) və ya
# xəritələnməmiş mənbənin dəyişdiyini bildirir — selektor təhlükəsiz şəkildə dayanır və heç vaxt səssizcə testləri ötürmür.

# Vitest (MCP serveri, autoCombo, keş)
npm run test:vitest

# E2E testləri (Playwright tələb edir)
npm run test:e2e

# Protokol klientlərinin E2E testləri (MCP nəqliyyatları, A2A)
npm run test:protocols:e2e

# Ekosistem uyğunluğu testləri
npm run test:ecosystem

# Əhatə keçidi: ifadələrin/sətirlərin/funksiyaların/budaqların 60%-i
npm run test:coverage
npm run coverage:report

# Lint + format yoxlaması
npm run lint
npm run check

# Keçidlə qorunan real yuxarı axın kombinasiya tüstü testi (VPS girişi + real provayder kreditləri tələb edir)
# REAL provayderlərə sorğu göndərir — kiçik xərc yaradır. CI-də HEÇ VAXT işə salınmır. Keçid olmadan düzgün şəkildə ötürülür.
# Tələb olunur: ssh root@192.168.0.15 girişi (VPS-dən yalnız oxunan DB şəklini mənbə kimi yükləyir).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Mərhələ-3 VPS canlı tüstü testi — adi Node ESM skriptləri, birbaşa canlı .15 serverinə sorğu göndərir.
# Tələb olunur: ssh root@192.168.0.15 girişi (kombinasiyalar SSH sqlite vasitəsilə yaradılır/sökülür).
# REAL provayderlərə sorğu göndərir (kiçik xərc). Yalnız __live_test__* kombinasiyalarını yaradır/silir. CI-də HEÇ VAXT işə salınmır.
# .15-də REQUIRE_API_KEY=false olduğundan API açarı lazım deyil, lakin təyin edilibsə COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY nəzərə alınır.
npm run test:combo:live:vps              # 7 HTTP ssenarisi (prioritet/dövri/çəkili/xərc/birləşdirmə/avtomatik + sağlamlıq)
npm run test:combo:live:vps:failover     # real provayderlərarası ehtiyat keçid ssenarisi əlavə edir (cəmi 8)
```

Əhatə qeydləri:

- `npm run test:coverage` əsas modul test dəsti üçün mənbə kodunun əhatəsini ölçür, `tests/**` qovluğunu istisna edir və `open-sse/**` qovluğunu daxil edir
- Pull request-lər ifadələr/sətirlər/funksiyalar/budaqlar üzrə əhatə keçidini **60%+** səviyyəsində saxlamalıdır
- PR `src/`, `open-sse/`, `electron/` və ya `bin/` daxilindəki istehsal kodunu dəyişdirirsə, həmin PR-da avtomatlaşdırılmış testlər əlavə edilməli və ya yenilənməlidir
- `npm run coverage:report` son əhatə işə salınmasından əldə edilmiş fayl-fayl təfərrüatlı hesabatı çap edir
- `npm run test:coverage:legacy` tarixi müqayisə üçün köhnə metrikanı qoruyur
- Əhatənin mərhələli şəkildə yaxşılaşdırılması yol xəritəsi üçün `docs/ops/COVERAGE_PLAN.md` faylına baxın

### Pull Request tələbləri

PR açmazdan əvvəl dəyişdirdiyiniz hissə üçün fokuslanmış dövrü işə salmaq məqsədilə
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) sənədindən istifadə edin.
Tam modul test dəsti (4 CI hissəsi), Vitest, **60%+** əhatə keçidi və istehsal qurulması
CI-ın məsuliyyətidir — bunları lokal olaraq işə salmaq PR yoxlamalarının sizə onsuz da
verəcəyi məlumatdan əlavə heç bir məlumat vermir və daha zəif maşınlarda sistemi tam yükləyə bilər (#8084):

- Dəyişikliyinizi əhatə edən test fayllarını işə salın: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- `npm run lint` əmrini işə salın
- İstehsal kodu dəyişdikdə həmin PR-da avtomatlaşdırılmış testlər əlavə edin və ya yeniləyin
- İstehsal kodu dəyişdikdə dəyişdirilmiş və ya əlavə edilmiş test fayllarını PR təsvirinə daxil edin
- Layihə sirləri CI-da konfiqurasiya edildikdə PR-dakı SonarQube nəticəsini yoxlayın

Cari test vəziyyəti: aşağıdakıları əhatə edən **122 modul test faylı**:

- Provayder tərcüməçiləri və format çevrilməsi
- Sürət məhdudlaşdırması, dövrə açarı və dayanıqlılıq
- Semantik keş, idempotentlik, irəliləyişin izlənməsi
- Verilənlər bazası əməliyyatları və sxem (21 DB modulu)
- OAuth axınları və autentifikasiya
- API son nöqtələrinin yoxlanması (Zod v4)
- MCP server alətləri və əhatə dairəsinin məcburi tətbiqi
- Yaddaş və Bacarıqlar sistemləri

---

## Kod üslubu

- **ESLint** — Dəyişiklikləri təsdiqləməzdən əvvəl `npm run lint` əmrini icra edin
- **Prettier** — Dəyişikliklərin təsdiqlənməsi zamanı `lint-staged` vasitəsilə avtomatik formatlanır (2 boşluq, nöqtəli vergüllər, qoşa dırnaqlar, 100 simvol eni, es5 son vergülləri)
- **TypeScript** — Bütün `src/` kodu `.ts`/`.tsx` istifadə edir; `open-sse/` isə `.ts`/`.js` istifadə edir; TSDoc (`@param`, `@returns`, `@throws`) ilə sənədləşdirin
- **`eval()` qadağandır** — ESLint `no-eval`, `no-implied-eval`, `no-new-func` qaydalarını tətbiq edir
- **Zod validasiyası** — Bütün API girişlərinin validasiyası üçün Zod v4 sxemlərindən istifadə edin
- **Adlandırma**: Fayllar = camelCase/kebab-case, komponentlər = PascalCase, sabitlər = UPPER_SNAKE

### Xətaların idarə edilməsi / boş catch blokları

Heç vaxt `catch` blokunu izahsız saxlamayın. Onu iki kateqoriyadan birinə aid edin (bu,
"SSE axınlarında xətaları heç vaxt səssizcə udmayın" sərt qaydasını praktikləşdirir):

- **Qəsdən edilən (özümüzə aid maksimum səy prinsipi ilə təmizləmə/telemetriya)** — burada xəta gözləniləndir və
  zərərsizdir; bir sətirlik əsaslandırıcı şərh əlavə edin, loqlama etməyin (hər sorğuda loqlama
  bu konvensiyanın qarşısını aldığı lazımsız səs-küydür).

  ```ts
  } catch {} // müştəri bağlantısı kəsildikdən sonra artıq bağlanmış kontrollerin bağlanması gözləniləndir
  ```

- **Loqlanmalıdır (xarici/çağıran tərəfindən təqdim edilən kod və ya xətanın udulması idarəetmə axınını dəyişir)** — `catch` blokunu
  saxlayın (onun axını pozmasına heç vaxt imkan verməyin), lakin xətanın aşkarlana bilməsi üçün kontekstli `console.debug`/`warn` çıxışı
  verin.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure geri çağırışında xəta:", e);
  }
  ```

Tətbiq edilmiş nümunələr üçün `open-sse/utils/stream.ts` və `open-sse/utils/streamHandler.ts` fayllarına baxın.

---

## Layihə Strukturu

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # İdarə paneli səhifələri (23 bölmə)
│   ├── api/                # API marşrutları (51 kataloq)
│   └── login/              # Autentifikasiya səhifələri (.tsx)
├── domain/                 # Siyasət mühərriki (policyEngine, comboResolver, costRules və s.)
├── lib/                    # Əsas biznes məntiqi (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protokol serveri
│   ├── acp/                # Agent Communication Protocol reyestri
│   ├── compliance/         # Uyğunluq siyasəti mühərriki
│   ├── db/                 # SQLite domen modulları + 130 miqrasiya
│   ├── memory/             # Davamlı dialoq yaddaşı
│   ├── oauth/              # OAuth provayderləri, xidmətləri və utilitləri
│   ├── skills/             # Genişləndirilə bilən bacarıq çərçivəsi
│   ├── usage/              # İstifadənin izlənməsi və xərcin hesablanması
│   └── localDb.ts          # Yalnız təkrar ixrac qatı — heç vaxt buraya məntiq əlavə etməyin
├── middleware/              # Sorğu ara proqramı (promptInjectionGuard)
├── mitm/                   # MITM proksisi (sertifikat, DNS, hədəf marşrutlaşdırması)
├── shared/
│   ├── components/         # React komponentləri (.tsx)
│   ├── constants/          # Provayder tərifləri (329), MCP əhatə dairələri, 21 marşrutlaşdırma strategiyası
│   ├── utils/              # Dövrə açarı, təmizləyici, autentifikasiya köməkçiləri
│   └── validation/         # Zod v4 sxemləri
└── sse/                    # SSE proksi emal xətti

open-sse/                   # @omniroute/open-sse iş sahəsi
├── executors/              # 150 icraçı modulu (icraçı sinifləri + hər provayder üçün köməkçilər)
├── handlers/               # 11 sorğu emalçısı (söhbət, cavablar, vektor təsvirləri, şəkillər və s.)
├── mcp-server/             # MCP serveri (110 unikal alət, 3 nəqliyyat mexanizmi, 33 əhatə dairəsi)
├── services/               # 178 üst səviyyəli xidmət (combo, autoCombo, rateLimitManager və s.)
├── translator/             # Format çeviriciləri (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformatoru
└── utils/                  # 22 utilit modulu (axın, TLS, proksi, jurnallaşdırma)

electron/                   # Electron masaüstü tətbiqi (çarpaz platformalı)

tests/
├── unit/                   # Node.js test icraçısı (1 574 test faylı)
├── integration/            # İnteqrasiya testləri
├── e2e/                    # Playwright testləri
├── security/               # Təhlükəsizlik testləri
├── translator/             # Çeviriciyə xas testlər
└── load/                   # Yük testləri

docs/
├── adr/                     # Arxitektura Qərarlarının Qeydləri
├── architecture/            # Sistem arxitekturası və dayanıqlılığı
├── comparison/              # OmniRoute və alternativlərin müqayisəsi
├── compression/             # Sıxılma təlimatları və qaydaları
├── dev/                     # Tərtibat təlimatları
├── diagrams/                # Arxitektura diaqramları
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # İstifadəçi təlimatı, Docker, quraşdırma, nasazlıqların aradan qaldırılması
├── i18n/                    # Beynəlmiləlləşdirilmiş README tərcümələri
├── marketing/               # Marketinq materialları
├── ops/                     # Yerləşdirmə, proksi, əhatə dairəsi, buraxılışlar
├── providers/               # Provayderlərə xas sənədlər
├── reference/               # API arayışı, mühit dəyişənləri, CLI alətləri, pulsuz səviyyələr
├── releases/                # Buraxılış qeydləri
├── routing/                 # Avtomatik kombinasiya mühərriki, mühakimənin təkrar icrası
├── screenshots/             # İdarə panelinin ekran görüntüləri
├── security/                # Qoruyucu məhdudiyyətlər, uyğunluq, gizlilik, tokenlər
└── specs/                   # Dizayn spesifikasiyaları
```

---

## Yeni Provayderin Əlavə Edilməsi

### Addım 1: Provayder Sabitlərini Qeydiyyatdan Keçirin

`src/shared/constants/providers.ts` faylına əlavə edin — modul yüklənərkən Zod ilə doğrulanır.

### Addım 2: İcra Modulunu Əlavə Edin (xüsusi məntiq tələb olunarsa)

Baza icra modulunu genişləndirən icra modulunu `open-sse/executors/your-provider.ts` faylında yaradın.

### Addım 3: Tərcüməçi Əlavə Edin (OpenAI-dan fərqli format üçün)

Sorğu/cavab tərcüməçilərini `open-sse/translator/` qovluğunda yaradın.

### Addım 4: OAuth Konfiqurasiyasını Əlavə Edin (OAuth əsaslıdırsa)

OAuth giriş məlumatlarını `src/lib/oauth/constants/oauth.ts` faylına, xidməti isə `src/lib/oauth/services/` qovluğuna əlavə edin.

Əgər yuxarı axın provayderi açıq `CLI` / brauzer paketində ictimai OAuth `client_id`/`secret` və ya Firebase Web API açarı paylayırsa, onu sətir literalı kimi **yerləşdirməyin**. `open-sse/utils/publicCreds.ts` faylındakı `resolvePublicCred()` funksiyasından istifadə edin və `EMBEDDED_DEFAULTS` siyahısına maskalanmış bayt qeydi əlavə edin. Tam məcburi iş prosesi [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) sənədində təsvir edilib.

Emalçılar/icra modulları daxilində müştəriyə çatan xəta mesajları `open-sse/utils/error.ts` faylındakı `buildErrorBody()` / `sanitizeErrorMessage()` funksiyalarından keçməlidir — xam `err.stack` və ya `err.message` dəyərlərini heç vaxt Response gövdəsinə yerləşdirməyin. Baxın: [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Addım 5: Modelləri Qeydiyyatdan Keçirin

Model təriflərini `open-sse/config/providerRegistry.ts` faylına əlavə edin.

### Addım 6: Testləri Əlavə Edin

`tests/unit/` qovluğunda ən azı aşağıdakıları əhatə edən vahid testləri yazın:

- Provayderin qeydiyyatı
- Sorğu/cavab tərcüməsi
- Xətaların emalı

---

## Pull Request yoxlama siyahısı

- [ ] Testlər uğurla keçir (`npm test`)
- [ ] Lint yoxlaması uğurla keçir (`npm run lint`)
- [ ] Build uğurla tamamlanır (`npm run build`)
- [ ] Yeni ictimai funksiyalar və interfeyslər üçün TypeScript tipləri əlavə edilib
- [ ] Sərt kodlaşdırılmış məxfi məlumatlar və ya ehtiyat dəyərlər yoxdur
- [ ] İctimai upstream giriş məlumatları literal kimi deyil, `resolvePublicCred()` vasitəsilə daxil edilib (bax: [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md))
- [ ] Xəta cavabları `buildErrorBody()` / `sanitizeErrorMessage()` vasitəsilə yönləndirilir — cavab gövdələrində emal edilməmiş stack trace-lər yoxdur (bax: [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Shell komandaları (`exec` / `spawn`) icra vaxtı dəyərlərini sətir interpolasiyası ilə deyil, `env` vasitəsilə ötürür
- [ ] Bütün girişlər Zod sxemləri ilə yoxlanılır
- [ ] İstifadəçiyə təsir edən dəyişikliklər üçün `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` altında dəyişiklik jurnalının **fraqmenti** əlavə edilib (bax: [`changelog.d/README.md`](./changelog.d/README.md)) — `CHANGELOG.md` faylını birbaşa redaktə **etməyin**; fraqmentlər buraxılış zamanı birləşdirilir və PR-lər arasında heç vaxt ziddiyyət yaratmır
- [ ] Sənədləşmə yenilənib (tətbiq olunduğu halda)
- [ ] Yeni CodeQL / Secret-Scanning xəbərdarlıqları açılmayıb və ya hər biri müvafiq `docs/security/` sənədinə istinad edən texniki əsaslandırma ilə rədd edilib
- [ ] Alt proseslər yaradan marşrutlar (`/api/mcp/`, `/api/cli-tools/runtime/`) `src/server/authz/routeGuard.ts` faylında `isLocalOnlyPath()` kimi təsnif edilib — bax: [Sərt Qayda #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Commit mesajlarında AI/bot `Co-authored-by` treylerləri yoxdur (Sərt Qayda #16) — işindən yenidən istifadə edilən insan əməkdaşlara standart `Co-authored-by: Name <email>` treylerləri ilə istinad edilir

---

## Buraxılış

Buraxılışlar `/generate-release` iş axını vasitəsilə idarə olunur. Yeni GitHub Release yaradıldıqda, paket GitHub Actions vasitəsilə **avtomatik olaraq npm-də dərc edilir**.

VPS-də yerləşdirmələr üçün `npm run build` deyil, `npm run build:release` istifadə edin — bu əmr təmiz
yenidən qurma həyata keçirir, paketi `dist/` daxilində toplayır və `dist/BUILD_SHA` nəzarət faylını yazır.
Daha sonra `dist/` qovluğunu uzaq `app/` qovluğuna rsync edən `/deploy-vps-*-cc` bacarıqlarından istifadə edin.

---

## Yardım Almaq

- **Arxitektura**: [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md) sənədinə baxın
- **API Arayışı**: [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md) sənədinə baxın
- **Təhlükəsizlik sənədləri**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Əməliyyat sənədləri**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Problemlər**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
