# Contributing to OmniRoute (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Hvala vam na interesovanju za doprinos! Ovaj vodič obuhvata sve što je potrebno da počnete.

Za zvanični tok rada po pojedinačnoj izmeni, počnite od
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md). Ovaj dokument mapira izmene provajdera, rutiranja,
UI/UX-a, i18n-a, CLI-ja, baze podataka i build/deploy izmena na njihove ugovore, fokusirane testove, pokrivenost CI-jem
i korake usaglašavanja.

---

## Podešavanje razvojnog okruženja

### Preduslovi

- **Node.js** `>=22.22.3 <23`, ili `>=24.0.0 <27` (preporučeno: 24 LTS)
- **npm** 10+

> **Korisnici npm v11+ (Node 24+):** Nakon `npm install`, provera da li su native moduli instalirani:
> `node -e "require('better-sqlite3')"`. Ako otkaže sa `MODULE_NOT_FOUND`,
> pokrenite `npm approve-scripts better-sqlite3 && npm install`. Pogledajte
> [Rešavanje problema](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Kloniranje i instalacija

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Promenljive okruženja

```bash
# Napravite svoj .env iz šablona
cp .env.example .env

# Generišite potrebne tajne
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Ključne promenljive za razvoj:

| Promenljiva            | Podrazumevana vrednost u razvoju | Opis                        |
| ---------------------- | -------------------------------- | --------------------------- |
| `PORT`                 | `20128`                          | Port servera                |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`         | Osnovni URL za frontend     |
| `JWT_SECRET`           | (generisati iznad)               | Tajna za potpisivanje JWT-a |
| `INITIAL_PASSWORD`     | `CHANGEME`                       | Lozinka za prvu prijavu     |
| `APP_LOG_LEVEL`        | `info`                           | Nivo detaljnosti logova     |

### Podešavanja kontrolne table

Kontrolna tabla obezbeđuje UI prekidače za funkcionalnosti koje se takođe mogu konfigurisati preko promenljivih okruženja:

| Lokacija podešavanja | Prekidač           | Opis                                 |
| -------------------- | ------------------ | ------------------------------------ |
| Settings → Advanced  | Debug Mode         | Uključuje logove debug zahteva (UI)  |
| Settings → General   | Sidebar Visibility | Prikazuje/skriva sekcije bočne trake |

Ova podešavanja se čuvaju u bazi podataka i ostaju sačuvana nakon ponovnog pokretanja, i imaju prioritet nad podrazumevanim vrednostima promenljivih okruženja kada su postavljena.

### Lokalno pokretanje

```bash
# Razvojni režim (hot reload)
npm run dev

# Produkcioni build
npm run build    # next build → .build/next/ zatim assembleStandalone → dist/
npm run start

# Brza kompilacija samo backend/API dela za izmene doprinosilaca
npm run build:contributor

# Release build (čisto ponovno pravljenje + HEAD sentinel — neophodno za deploy)
npm run build:release   # rm -rf .build dist && build + upisuje dist/BUILD_SHA

# Uobičajena konfiguracija porta
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Build za doprinosioce vrši samo validaciju kompilacije: ne sastavlja samostalnu (standalone)
distribuciju i ne pravi opcione native pakete resursa. Koristite regularni produkcioni build kada
je potrebno da validirate paket koji se isporučuje.

### Struktura izlaza build-a

| Direktorijum | Sadržaj                                                                      | Praćen |
| ------------ | ---------------------------------------------------------------------------- | ------ |
| `src/`       | Izvorni kod aplikacije (TypeScript / TSX)                                    | Da     |
| `.build/`    | Međurezultati — izlaz `next build`-a (u .gitignore, `distDir = .build/next`) | Ne     |
| `dist/`      | Paket za isporuku — sastavlja ga `assembleStandalone` (u .gitignore)         | Ne     |

Pipeline za build je jedan prolaz:

```
npm run build
  └─ next build → .build/next/standalone  (izlaz Next.js-a)
  └─ assembleStandalone()                 (kopira standalone + static + public + native resurse)
       └─ output: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` dodatno prvo čisti oba direktorijuma i upisuje
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) kao sentinel za integritet deploy-a.

`npm run build:contributor` koristi profil build-a samo za backend. Privremeno zamenjuje
dashboard UI fajlove tokom build-a placeholderima, čuva API route handlere i vraća originalne fajlove
nakon build-a. Koristite `npm run build` za izmene koje utiču na dashboard UI ili za potpunu
validaciju release-a; profil za doprinosioce nije zamena za release build.

> **Napomena za VPS deploy:** udaljeni direktorijum sa slikom `/usr/lib/node_modules/omniroute/app/`
> je nepromenjen. Skripte za deploy vrše rsync sadržaja `dist/` u njega.
> Promenjena je samo putanja izlaza build-a unutar repozitorijuma (`app/` → `dist/`).

Podrazumevani URL-ovi:

- **Dashboard**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git radni tok

> ⚠️ **NIKADA ne commit-ujte direktno na `main`.** Uvek koristite feature grane.
>
> **PR baza:** cilj je aktivna `release/vX.Y.Z` grana (ne `main`). Pogledajte
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) za
> release-per-branch + tag-at-ship model.

```bash
# Napravite granu od aktivnog release tip-a (primer: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... napravite izmene ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Otvorite Pull Request sa base = release/v3.8.49
```

### Imenovanje grana

| Prefiks     | Namena                     |
| ----------- | -------------------------- |
| `feat/`     | Nove funkcionalnosti       |
| `fix/`      | Ispravke grešaka           |
| `refactor/` | Restrukturiranje koda      |
| `docs/`     | Izmene dokumentacije       |
| `test/`     | Dodavanje/ispravke testova |
| `chore/`    | Alati, CI, zavisnosti      |

### Poruke commit-a

Pratite [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Obim (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Pokretanje testova

```bash
# Svi testovi (unit + vitest + ecosystem + e2e)
npm run test:all

# Jedan test fajl (Node.js native test runner — većina testova koristi ovo)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Samo unit testovi na koje utiče vaša izmena (isti TIA selektor kao CI gate, #8084)
npm run test:scoped            # izmene u poslednjem commit-u (ili u radnom stablu)
npm run test:scoped:staged     # samo staged izmene — dobro se kombinuje sa pre-commit pokretanjem
npm run test:scoped:full       # prvo ponovo izgradi import-graph mapu (nakon dodavanja/pomeranja fajlova)
# Exit 1 + "run the full suite" znači da je izmenjen hub fajl (tsconfig, package.json, …) ili
# nemapiran source fajl — selektor bezbedno otkazuje, nikada ne preskoči nešto neprimetno.

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# E2E testovi (zahteva Playwright)
npm run test:e2e

# Protocol clients E2E (MCP transports, A2A)
npm run test:protocols:e2e

# Testovi kompatibilnosti ekosistema
npm run test:ecosystem

# Coverage gate: 60% statements/lines/functions/branches
npm run test:coverage
npm run coverage:report

# Provera lint-a i formatiranja
npm run lint
npm run check

# Gated real-upstream combo smoke test (zahteva VPS pristup + kredite kod pravih provajdera)
# Pogađa PRAVE provajdere — nešto košta. NIKADA se ne pokreće u CI. Uredno se preskače bez gate-a.
# Potreban: ssh root@192.168.0.15 pristup (izvor je read-only DB snapshot sa VPS-a).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Phase-3 VPS live smoke — obični Node ESM skriptovi, direktno pogađaju live .15 server.
# Zahteva: ssh root@192.168.0.15 pristup (combo se kreira/uklanja preko SSH sqlite).
# Pogađa PRAVE provajdere (mali trošak). Kreira/briše samo __live_test__* combo-e. NIKADA se ne pokreće u CI.
# REQUIRE_API_KEY=false na .15 tako da API ključ nije potreban, ali poštuje COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY ako su postavljeni.
npm run test:combo:live:vps              # 7 HTTP scenarija (priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # dodaje pravi cross-provider failover scenario (ukupno 8)
```

Napomene o coverage-u:

- `npm run test:coverage` mери source coverage za glavni unit test suite, isključuje `tests/**`, i uključuje `open-sse/**`
- Pull request-ovi moraju održati coverage gate na **60%+** statements/lines/functions/branches
- Ako PR menja production kod u `src/`, `open-sse/`, `electron/` ili `bin/`, mora dodati ili ažurirati automatizovane testove u istom PR-u
- `npm run coverage:report` ispisuje detaljan izveštaj po fajlovima iz poslednjeg coverage pokretanja
- `npm run test:coverage:legacy` čuva starije metrike za istorijsko poređenje
- Pogledajte `docs/ops/COVERAGE_PLAN.md` za fazni plan poboljšanja coverage-a

### Zahtevi za Pull Request

Prije otvaranja PR-a, koristite
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) da pokrenete fokusiranu petlju za
ono što ste izmenili. Ceo unit suite (4 CI shard-a), Vitest, **60%+** coverage gate, i
production build su odgovornost CI-ja — pokretanje istih lokalno ne daje nikakav dodatni signal koji
PR provere već ne bi dale, a na manjim mašinama može zasititi host (#8084):

- Pokrenite test fajlove koji pokrivaju vašu izmenu: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Pokrenite `npm run lint`
- Uključite ili ažurirajte automatizovane testove u istom PR-u kad god se menja production kod
- Uključite izmenjene ili dodate test fajlove u opis PR-a kada je production kod izmenjen
- Provjerite SonarQube rezultat na PR-u kada su project secrets konfigurisani u CI

Trenutni status testova: **122 unit test fajla** koji pokrivaju:

- Provider translatore i konverziju formata
- Rate limiting, circuit breaker i resilience
- Semantic cache, idempotency, praćenje progresa
- Operacije baze podataka i šemu (21 DB modul)
- OAuth tokove i autentifikaciju
- Validaciju API endpoint-a (Zod v4)
- MCP server alate i primenu scope-a
- Sisteme Memory i Skills

---

## Стил кода

- **ESLint** — Покрените `npm run lint` пре комитовања
- **Prettier** — Аутоматско форматирање преко `lint-staged` приликом комита (2 размака, тачка-запета, дупли наводници, ширина од 100 карактера, es5 зарези на крају)
- **TypeScript** — Сав `src/` код користи `.ts`/`.tsx`; `open-sse/` користи `.ts`/`.js`; документовати уз TSDoc (`@param`, `@returns`, `@throws`)
- **Без `eval()`** — ESLint примењује `no-eval`, `no-implied-eval`, `no-new-func`
- **Zod валидација** — Користити Zod v4 шеме за сву валидацију API уноса
- **Именовање**: Фајлови = camelCase/kebab-case, компоненте = PascalCase, константе = UPPER_SNAKE

### Обрада грешака / празни catch блокови

Никада не остављајте `catch` необјашњен. Класифицирајте га у једну од две категорије (операционализује
строго правило "никада не гутати грешке ћутке у SSE токовима"):

- **Намерно (наше сопствено чишћење/телеметрија по принципу најбољег покушаја)** — грешка овде је очекивана и
  безопасна; додајте једноредни коментар са образложењем, без логовања (логовање на сваком захтеву представља
  шум који ова конвенција избегава).

  ```ts
  } catch {} // затварање већ затвореног controller-а након прекида везе клијента је очекивано
  ```

- **Треба логовати (спољашњи код, или код испоручен од позивача, или гутање мења ток контроле)** — задржите
  catch (никада не дозволите да прекине ток), али емитујте контекстуалну `console.debug`/`warn` поруку тако да
  грешка буде уочљива.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

Погледајте `open-sse/utils/stream.ts` и `open-sse/utils/streamHandler.ts` за примењене примере.

---

## Структура пројекта

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Странице контролне табле (23 секције)
│   ├── api/                # API рути (51 директоријум)
│   └── login/              # Странице аутентикације (.tsx)
├── domain/                 # Механизам политика (policyEngine, comboResolver, costRules, итд.)
├── lib/                    # Основна пословна логика (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 протокол сервер
│   ├── acp/                # Регистар Agent Communication Protocol
│   ├── compliance/         # Механизам политика усклађености
│   ├── db/                 # SQLite домен модули + 130 миграција
│   ├── memory/             # Трајна конверзацијска мемориja
│   ├── oauth/              # OAuth провајдери, сервиси и алатке
│   ├── skills/             # Проширив оквир вештина
│   ├── usage/              # Праћење коришћења и обрачун трошкова
│   └── localDb.ts          # Само слој ре-експорта — никада не додавати логику овде
├── middleware/              # Middleware захтева (promptInjectionGuard)
├── mitm/                   # MITM проксy (сертификат, DNS, циљно рутирање)
├── shared/
│   ├── components/         # React компоненте (.tsx)
│   ├── constants/          # Дефиниције провајдера (329), MCP опсези, 19 стратегија рутирања
│   ├── utils/              # Circuit breaker, санитизатор, помагала за аутентикацију
│   └── validation/         # Zod v4 шеме
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 89 модула за извршавање
├── handlers/               # 11 handler-а за захтеве (chat, responses, embeddings, images, итд.)
├── mcp-server/             # MCP сервер (110 уникатних алатки, 3 транспорта, 33 опсега)
├── services/               # 178 сервиса на најгорем нивоу (combo, autoCombo, rateLimitManager, итд.)
├── translator/             # Преводиоци формата (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Трансформатор Responses API
└── utils/                  # 22 помоćна модула (stream, TLS, proxy, логовање)

electron/                   # Electron десктоп апликација (мултиплатформска)

tests/
├── unit/                   # Node.js test runner (1.574 тест фајлова)
├── integration/            # Интеграциони тестови
├── e2e/                    # Playwright тестови
├── security/               # Безбедносни тестови
├── translator/             # Тестови специфични за преводиоце
└── load/                   # Тестови оптерећења

docs/
├── adr/                     # Записи о архитектонским одлукама
├── architecture/            # Архитектура система и отпорност
├── comparison/              # OmniRoute у поређењу са алтернативама
├── compression/             # Водичи и правила компресије
├── dev/                     # Водичи за развој
├── diagrams/                # Дијаграми архитектуре
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # Кориснички водич, Docker, подешавање, решавање проблема
├── i18n/                    # Интернационализовани преводи README-а
├── marketing/               # Маркетинг материјали
├── ops/                     # Деплојмент, proxy, покривеност, издања
├── providers/               # Документација специфична за провајдере
├── reference/               # API референца, env варијабле, CLI алатке, бесплатни планови
├── releases/                # Напомене о издањима
├── routing/                 # Auto-combo механизам, реplay резоновања
├── screenshots/             # Снимци екрана контролне табле
├── security/                # Заштитне мере, усклађеност, стелт, токени
└── specs/                   # Спецификације дизајна
```

---

## Додавање новог провајдера

### Корак 1: Регистрација константи провајдера

Додајте у `src/shared/constants/providers.ts` — валидира се Zod-ом при учитавању модула.

### Корак 2: Додавање извршитеља (executor) (ако је потребна прилагођена логика)

Направите извршитеља у `open-sse/executors/your-provider.ts` који проширује основни (base) извршитељ.

### Корак 3: Додавање преводиоца (translator) (ако формат није OpenAI)

Направите преводиоце захтева/одговора у `open-sse/translator/`.

### Корак 4: Додавање OAuth конфигурације (ако се заснива на OAuth-у)

Додајте OAuth креденцијале у `src/lib/oauth/constants/oauth.ts` и сервис у `src/lib/oauth/services/`.

Ако upstream провајдер дистрибуира јавни OAuth client_id/secret или Firebase Web API кључ унутар свог јавног CLI / browser пакета, **немојте** га уграђивати као стринг литерал. Користите `resolvePublicCred()` из `open-sse/utils/publicCreds.ts` и додајте маскирани byte запис у `EMBEDDED_DEFAULTS`. Комплетан обавезан ток рада документован је у [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

Унутар handler-а/executor-а, поруке о грешкама које стижу до клијента морају пролазити кроз `buildErrorBody()` / `sanitizeErrorMessage()` из `open-sse/utils/error.ts` — никада не стављајте сирове `err.stack` или `err.message` у тело Response-а. Погледајте [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Корак 5: Регистрација модела

Додајте дефиниције модела у `open-sse/config/providerRegistry.ts`.

### Корак 6: Додавање тестова

Напишите унит тестове у `tests/unit/` који покривају минимално:

- Регистрацију провајдера
- Превод захтева/одговора
- Обраду грешака

---

## Листа за проверу Pull Request-а

- [ ] Тестови пролазе (`npm test`)
- [ ] Linting пролази (`npm run lint`)
- [ ] Build успешно пролази (`npm run build`)
- [ ] TypeScript типови додати за нове јавне функције и интерфејсе
- [ ] Нема хардкодованих тајни (secrets) или fallback вредности
- [ ] Јавни upstream креденцијали уграђени преко `resolvePublicCred()` (погледајте [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), никада као литерали
- [ ] Одговори са грешкама пролазе кроз `buildErrorBody()` / `sanitizeErrorMessage()` — нема сирових stack trace-ова у телима одговора (погледајте [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Shell команде (`exec` / `spawn`) прослеђују runtime вредности преко `env`, а не путем интерполације стринга
- [ ] Сви инпути су валидирани помоћу Zod шема
- [ ] Додат changelog **фрагмент** унутар `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` за промене видљиве корисницима (погледајте [`changelog.d/README.md`](./changelog.d/README.md)) — **немојте** директно уређивати `CHANGELOG.md`; фрагменти се агрегирају приликом издања и никада се не сукобљавају између PR-ова
- [ ] Документација ажурирана (ако је применљиво)
- [ ] Нема нових CodeQL / Secret-Scanning упозорења, или је свако од њих одбачено са техничким образложењем које упућује на релевантан документ из `docs/security/`
- [ ] Руте које покрећу подпроцесе (`/api/mcp/`, `/api/cli-tools/runtime/`) класификоване као `isLocalOnlyPath()` у `src/server/authz/routeGuard.ts` — погледајте [Строго правило бр. 15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Нема `Co-Authored-By` додатака у commit порукама — commit-ови морају бити исписани искључиво под Git идентитетом власника репозиторијума (Строго правило бр. 16)

## Издавање

Издања се управљају путем `/generate-release` радног тока. Када се направи ново GitHub Release издање, пакет се **аутоматски објављује на npm** путем GitHub Actions.

За VPS деплојеве, користите `npm run build:release` (не `npm run build`) — он изводи чисту
поновну изградњу, склапа пакет у `dist/`, и уписује `dist/BUILD_SHA` сентинел.
Затим користите `/deploy-vps-*-cc` вештине које rsync-ују `dist/` у удаљени `app/` директоријум.

---

## Добијање помоћи

- **Архитектура**: Погледајте [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **API референца**: Погледајте [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Документација о безбедности**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Оперативна документација**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Проблеми**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADR документи**: Погледајте `docs/adr/` за записе о архитектонским одлукама
