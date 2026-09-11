# Contributing to OmniRoute (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Paldies par interesi sniegt ieguldījumu! Šajā rokasgrāmatā ir aprakstīts viss nepieciešamais, lai sāktu darbu.

Oficiālo katras izmaiņas darbplūsmu skatiet sadaļā
[Zelta ceļš ieguldījumu veikšanai](docs/ops/CONTRIBUTION_GOLDEN_PATH.md). Tajā pakalpojumu sniedzēja,
maršrutēšanas, UI/UX, i18n, CLI, datubāzes un būvēšanas/izvietošanas izmaiņas ir sasaistītas
ar to līgumiem, mērķētiem testiem, CI pārklājumu un saskaņošanas darbībām.

---

## Izstrādes iestatīšana

### Priekšnosacījumi

- **Node.js** `>=22.22.3 <23` vai `>=24.0.0 <27` (ieteicams: 24 LTS)
- **npm** 10+

> **npm v11+ lietotājiem (Node 24+):** Pēc `npm install` pārbaudiet, vai vietējie moduļi ir instalēti:
> `node -e "require('better-sqlite3')"`. Ja komanda neizdodas ar `MODULE_NOT_FOUND`,
> palaidiet `npm approve-scripts better-sqlite3 && npm install`. Skatiet
> [Problēmu novēršana](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Klonēšana un instalēšana

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Vides mainīgie

```bash
# Izveidojiet .env failu no veidnes
cp .env.example .env

# Ģenerējiet nepieciešamos noslēpumus
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Galvenie izstrādes mainīgie:

| Mainīgais              | Noklusējuma vērtība izstrādē | Apraksts                      |
| ---------------------- | ---------------------------- | ----------------------------- |
| `PORT`                 | `20128`                      | Servera ports                 |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`     | Frontend pamata URL           |
| `JWT_SECRET`           | (ģenerējiet iepriekš)        | JWT parakstīšanas noslēpums   |
| `INITIAL_PASSWORD`     | `CHANGEME`                   | Pirmās pieteikšanās parole    |
| `APP_LOG_LEVEL`        | `info`                       | Žurnāla detalizācijas līmenis |

### Informācijas paneļa iestatījumi

Informācijas panelī ir pieejami funkciju pārslēgi, kurus var konfigurēt arī, izmantojot vides mainīgos:

| Iestatījuma atrašanās vieta | Pārslēgs            | Apraksts                                         |
| --------------------------- | ------------------- | ------------------------------------------------ |
| Settings → Advanced         | Atkļūdošanas režīms | Iespējot atkļūdošanas pieprasījumu žurnālus (UI) |
| Settings → General          | Sānjoslas redzamība | Rādīt/slēpt sānjoslas sadaļas                    |

Šie iestatījumi tiek glabāti datubāzē un saglabājas pēc atkārtotas palaišanas; ja tie ir iestatīti, tie aizstāj vides mainīgo noklusējuma vērtības.

### Darbināšana lokāli

```bash
# Izstrādes režīms (automātiska pārlāde)
npm run dev

# Produkcijas būvējums
npm run build    # next build → .build/next/ un pēc tam assembleStandalone → dist/
npm run start

# Ātra tikai backend/API kompilēšana izmaiņām, ko veic ieguldītāji
npm run build:contributor

# Izlaiduma būvējums (tīra pārbūve + HEAD marķieris — nepieciešams izvietošanai)
npm run build:release   # rm -rf .build dist un build + ieraksta dist/BUILD_SHA

# Izplatīta porta konfigurācija
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Ieguldītāja būvējums veic tikai kompilēšanas validāciju: tas neizveido patstāvīgo izplatīšanu un nebūvē neobligātos vietējās pakotnes līdzekļus. Izmantojiet parasto produkcijas būvējumu, ja nepieciešams validēt izplatāmo pakotni.

### Būvējuma izvades struktūra

| Direktorija | Saturs                                                               | Tiek izsekota |
| ----------- | -------------------------------------------------------------------- | ------------- |
| `src/`      | Lietotnes pirmkods (TypeScript / TSX)                                | Jā            |
| `.build/`   | Starpfaili — `next build` izvade (ignorēta, `distDir = .build/next`) | Nē            |
| `dist/`     | Izplatāmā pakotne — to izveido `assembleStandalone` (ignorēta)       | Nē            |

Būvēšanas konveijers darbojas vienā piegājienā:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js izvade)
  └─ assembleStandalone()                 (kopē standalone + static + public + native assets)
       └─ izvade: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` papildus vispirms notīra abas direktorijas un ieraksta
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) kā izvietošanas integritātes marķieri.

`npm run build:contributor` izmanto tikai backend paredzēto būvējuma profilu. Būvēšanas laikā tas īslaicīgi aizstāj informācijas paneļa UI failus, saglabā API maršrutu apstrādātājus un pēc būvēšanas atjauno sākotnējos failus. Izmantojiet `npm run build`, lai pārbaudītu izmaiņas, kas ietekmē informācijas paneļa UI, vai veiktu pilnu izlaiduma validāciju; ieguldītāja profils neaizstāj izlaiduma būvējumu.

> **Piezīme par izvietošanu VPS:** attālā attēla direktorija `/usr/lib/node_modules/omniroute/app/`
> netiek mainīta. Izvietošanas prasmes tajā sinhronizē `dist/` saturu, izmantojot rsync.
> Mainījies ir tikai repozitorijā esošais būvējuma izvades ceļš (`app/` → `dist/`).

Noklusējuma URL:

- **Informācijas panelis**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git darbplūsma

> ⚠️ **NEKAD neveiciet tiešu commit uz `main`.** Vienmēr izmantojiet funkciju zarus.
>
> **PR bāze:** mērķējiet uz aktīvo `release/vX.Y.Z` zaru (nevis `main`). Skatiet
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md), lai iepazītos ar
> modeli “release-per-branch + tag-at-ship”.

```bash
# Izveidot zaru no aktīvā release gala (piemērs: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... veikt izmaiņas ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Atveriet Pull Request ar base = release/v3.8.49
```

### Zaru nosaukumi

| Prefix      | Nolūks                      |
| ----------- | --------------------------- |
| `feat/`     | Jaunas funkcijas            |
| `fix/`      | Kļūdu labojumi              |
| `refactor/` | Koda pārstrukturēšana       |
| `docs/`     | Dokumentācijas izmaiņas     |
| `test/`     | Testu pievienošana/labošana |
| `chore/`    | Rīki, CI, atkarības         |

### Commit ziņojumi

Ievērojiet [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Tvērumi (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Testu palaišana

```bash
# Visi testi (unit + vitest + ecosystem + e2e)
npm run test:all

# Viens testa fails (Node.js native test runner — lielākā daļa testu izmanto šo)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Tikai izmaiņu ietekmētie unit testi (tas pats TIA selektors, ko izmanto CI vārteja, #8084)
npm run test:scoped            # izmaiņas pēdējā commit (vai darba kokā)
npm run test:scoped:staged     # tikai staged izmaiņas — labi piemērots pre-commit palaišanai
npm run test:scoped:full       # vispirms atkārtoti izveidot import-graph karti (pēc failu pievienošanas/pārvietošanas)
# Exit 1 + "run the full suite" nozīmē, ka mainīts hub fails (tsconfig, package.json, …) vai
# nekartēts avots — selektors neuzņemas risku, tas nekad klusi neizlaiž testus.

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# E2E testi (nepieciešams Playwright)
npm run test:e2e

# Protokola klientu E2E (MCP transports, A2A)
npm run test:protocols:e2e

# Ecosystem saderības testi
npm run test:ecosystem

# Pārklājuma vārteja: 60% statements/lines/functions/branches
npm run test:coverage
npm run coverage:report

# Lint + format pārbaude
npm run lint
npm run check

# Kontrolēta reālo upstream kombināciju smoke pārbaude (nepieciešama VPS piekļuve + reāla provideru kredītu bilance)
# Izmanto REAL providerus — izmaksas ir nelielas. NEKAD netiek palaists CI. Bez vārtejas tiek korekti izlaists.
# Nepieciešama: ssh root@192.168.0.15 piekļuve (no VPS tiek iegūts tikai lasāms DB momentuzņēmums).
RUN_COMBO_LIVE=1 npm run test:combo:live

# 3. fāzes VPS live smoke pārbaude — vienkārši Node ESM skripti, kas tieši piekļūst live .15 serverim.
# Nepieciešama: ssh root@192.168.0.15 piekļuve (kombinācijas tiek izveidotas/noņemtas, izmantojot SSH sqlite).
# Izmanto REAL providerus (nelielas izmaksas). Izveido/dzēš tikai __live_test__* kombinācijas. NEKAD netiek palaists CI.
# REQUIRE_API_KEY=false uz .15, tāpēc API atslēga nav nepieciešama, bet, ja iestatīti, tiek ņemti vērā COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY.
npm run test:combo:live:vps              # 7 HTTP scenāriji (priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # pievieno reālu starp-provideru failover scenāriju (kopā 8)
```

Pārklājuma piezīmes:

- `npm run test:coverage` mēra avota pārklājumu galvenajai unit testu kopai, izslēdz `tests/**` un ietver `open-sse/**`
- Pull Request ir jāsaglabā pārklājuma vārteja vismaz **60%+** apmērā statements/lines/functions/branches
- Ja PR maina produkcijas kodu mapēs `src/`, `open-sse/`, `electron/` vai `bin/`, tajā pašā PR ir jāpievieno vai jāatjaunina automatizētie testi
- `npm run coverage:report` izvada detalizētu pārskatu par katru failu no jaunākās pārklājuma palaišanas
- `npm run test:coverage:legacy` saglabā vecāko metriku vēsturiskai salīdzināšanai
- Skatiet `docs/ops/COVERAGE_PLAN.md`, lai iepazītos ar pakāpenisku pārklājuma uzlabošanas ceļvedi

### Pull Request prasības

Pirms PR atvēršanas izmantojiet
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md), lai palaistu mērķēto ciklu
atbilstoši veiktajām izmaiņām. Pilnā unit testu kopa (4 CI shards), Vitest, **60%+**
pārklājuma vārteja un produkcijas build ir CI atbildība — to palaišana lokāli nedod nekādu papildu
informāciju, ko PR pārbaudes jau nesniegs, turklāt mazākās ierīcēs tas var pārslogot hostu (#8084):

- Palaidiet testa failus, kas aptver jūsu izmaiņas: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Palaidiet `npm run lint`
- Ikreiz, kad mainās produkcijas kods, tajā pašā PR iekļaujiet vai atjauniniet automatizētos testus
- Ja mainījies produkcijas kods, PR aprakstā iekļaujiet mainītos vai pievienotos testa failus
- Ja CI ir konfigurēti projekta noslēpumi, pārbaudiet SonarQube rezultātu PR

Pašreizējais testu statuss: **122 unit testu faili**, kas aptver:

- Provideru translatorus un formātu konvertēšanu
- Ātruma ierobežošanu, circuit breaker un noturību
- Semantisko kešatmiņu, idempotenci, progresa izsekošanu
- Datu bāzes darbības un shēmu (21 DB modulis)
- OAuth plūsmas un autentifikāciju
- API galapunktu validāciju (Zod v4)
- MCP servera rīkus un tvērumu izpildes kontroli
- Memory un Skills sistēmas

---

## Koda stils

- **ESLint** — Pirms komita izpildiet `npm run lint`
- **Prettier** — Komita laikā automātiski formatē, izmantojot `lint-staged` (2 atstarpes, semikoli, dubultās pēdiņas, 100 rakstzīmju platums, `es5` beigu komati)
- **TypeScript** — Viss `src/` kods izmanto `.ts`/`.tsx`; `open-sse/` izmanto `.ts`/`.js`; dokumentējiet ar TSDoc (`@param`, `@returns`, `@throws`)
- **Bez `eval()`** — ESLint ievēro `no-eval`, `no-implied-eval`, `no-new-func`
- **Zod validācija** — Visai API ievades validācijai izmantojiet Zod v4 shēmas
- **Nosaukumi**: faili = camelCase/kebab-case, komponenti = PascalCase, konstantes = UPPER_SNAKE

### Kļūdu apstrāde / tukši catch bloki

Nekad neatstājiet `catch` bez paskaidrojuma. Klasificējiet to vienā no divām kategorijām (tādējādi tiek ieviests stingrais noteikums “nekad klusi neignorēt kļūdas SSE straumēs”):

- **Apzināta (mūsu pašu labāko centienu tīrīšana/telemetrija)** — kļūme šeit ir sagaidāma un nekaitīga; pievienojiet vienas rindiņas pamatojuma komentāru, neveiciet reģistrēšanu (reģistrēšana katra pieprasījuma laikā ir troksnis, no kura šī konvencija palīdz izvairīties).

  ```ts
  } catch {} // jau aizvērta kontrollera aizvēršana pēc klienta atvienošanās ir sagaidāma
  ```

- **Jāreģistrē (ārējs/zvanītāja nodrošināts kods vai kļūdas ignorēšana maina vadības plūsmu)** — saglabājiet `catch` (nekad neļaujiet tam pārtraukt straumi), bet izvadiet kontekstuālu `console.debug`/`warn`, lai kļūme būtu atklājama.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

Skatiet `open-sse/utils/stream.ts` un `open-sse/utils/streamHandler.ts`, lai iepazītos ar pielietotajiem piemēriem.

---

## Projekta struktūra

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Informācijas paneļa lapas (23 sadaļas)
│   ├── api/                # API maršruti (51 direktorija)
│   └── login/              # Autentifikācijas lapas (.tsx)
├── domain/                 # Politiku dzinis (policyEngine, comboResolver, costRules u.c.)
├── lib/                    # Galvenā biznesa loģika (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protokola serveris
│   ├── acp/                # Agent Communication Protocol reģistrs
│   ├── compliance/         # Atbilstības politiku dzinis
│   ├── db/                 # SQLite domēna moduļi + 130 migrācijas
│   ├── memory/             # Pastāvīga sarunu atmiņa
│   ├── oauth/              # OAuth nodrošinātāji, pakalpojumi un utilītas
│   ├── skills/             # Paplašināma prasmju infrastruktūra
│   ├── usage/              # Lietojuma uzskaite un izmaksu aprēķināšana
│   └── localDb.ts          # Tikai atkārtotas eksportēšanas slānis — nekad šeit nepievienojiet loģiku
├── middleware/              # Pieprasījumu starpprogrammatūra (promptInjectionGuard)
├── mitm/                   # MITM starpniekserveris (sertifikāts, DNS, mērķa maršrutēšana)
├── shared/
│   ├── components/         # React komponenti (.tsx)
│   ├── constants/          # Nodrošinātāju definīcijas (329), MCP tvērumi, 19 maršrutēšanas stratēģijas
│   ├── utils/              # Automātiskais slēdzis, sanitizētājs, autentifikācijas palīgi
│   └── validation/         # Zod v4 shēmas
└── sse/                    # SSE starpniekservera konveijers

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 89 izpildītāju ieviešanas moduļi
├── handlers/               # 11 pieprasījumu apstrādātāji (chat, responses, embeddings, images u.c.)
├── mcp-server/             # MCP serveris (110 unikāli rīki, 3 transporti, 33 tvērumi)
├── services/               # 178 augstākā līmeņa pakalpojumi (combo, autoCombo, rateLimitManager u.c.)
├── translator/             # Formātu tulkotāji (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API pārveidotājs
└── utils/                  # 22 utilītas moduļi (straume, TLS, starpniekserveris, reģistrēšana)

electron/                   # Electron darbvirsmas lietotne (daudzplatformu)

tests/
├── unit/                   # Node.js testu palaidējs (1,574 testu faili)
├── integration/            # Integrācijas testi
├── e2e/                    # Playwright testi
├── security/               # Drošības testi
├── translator/             # Tulkotājam specifiski testi
└── load/                   # Slodzes testi

docs/
├── adr/                     # Arhitektūras lēmumu ieraksti
├── architecture/            # Sistēmas arhitektūra un noturība
├── comparison/              # OmniRoute salīdzinājumā ar alternatīvām
├── compression/             # Saspiešanas ceļveži un noteikumi
├── dev/                     # Izstrādes ceļveži
├── diagrams/                # Arhitektūras diagrammas
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # Lietotāja ceļvedis, Docker, iestatīšana, problēmu novēršana
├── i18n/                    # Internacionalizēti README tulkojumi
├── marketing/               # Mārketinga materiāli
├── ops/                     # Izvietošana, starpniekserveris, pārklājums, laidieni
├── providers/               # Konkrētiem nodrošinātājiem paredzēta dokumentācija
├── reference/               # API atsauce, vides mainīgie, CLI rīki, bezmaksas līmeņi
├── releases/                # Laidienu piezīmes
├── routing/                 # Automātiskās kombinēšanas dzinis, spriešanas atkārtošana
├── screenshots/              # Informācijas paneļa ekrānuzņēmumi
├── security/                # Drošības vadīklas, atbilstība, slēpšana, pilnvarojuma marķieri
└── specs/                   # Izstrādes specifikācijas
```

---

## Jauna nodrošinātāja pievienošana

### 1. darbība: reģistrējiet nodrošinātāja konstantes

Pievienojiet `src/shared/constants/providers.ts` — validācija ar Zod tiek veikta moduļa ielādes laikā.

### 2. darbība: pievienojiet izpildītāju (ja nepieciešama pielāgota loģika)

Izveidojiet izpildītāju `open-sse/executors/your-provider.ts`, paplašinot bāzes izpildītāju.

### 3. darbība: pievienojiet tulkotāju (ja formāts nav OpenAI formāts)

Izveidojiet pieprasījumu/atbilžu tulkotājus direktorijā `open-sse/translator/`.

### 4. darbība: pievienojiet OAuth konfigurāciju (ja tiek izmantots OAuth)

Pievienojiet OAuth akreditācijas datus failā `src/lib/oauth/constants/oauth.ts` un pakalpojumu direktorijā `src/lib/oauth/services/`.

Ja augšupējais nodrošinātājs izplata publisku OAuth client_id/secret vai Firebase Web API key savā publiskajā CLI / pārlūkprogrammas komplektā, **neieguliet to kā virknes literāli**. Izmantojiet `resolvePublicCred()` no `open-sse/utils/publicCreds.ts` un pievienojiet maskētu baitu ierakstu kolekcijai `EMBEDDED_DEFAULTS`. Pilnā obligātā darbplūsma ir dokumentēta failā [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

Apstrādātājos/izpildītājos kļūdu ziņojumiem, kas sasniedz klientu, ir jāizmanto `buildErrorBody()` / `sanitizeErrorMessage()` no `open-sse/utils/error.ts` — nekad neievietojiet neapstrādātu `err.stack` vai `err.message` objekta `Response` pamattekstā. Skatiet [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### 5. darbība: reģistrējiet modeļus

Pievienojiet modeļu definīcijas failā `open-sse/config/providerRegistry.ts`.

### 6. darbība: pievienojiet testus

Uzrakstiet vienību testus direktorijā `tests/unit/`, kas aptver vismaz:

- Nodrošinātāja reģistrāciju
- Pieprasījumu/atbilžu tulkošanu
- Kļūdu apstrādi

---

## Pull Request kontrolsaraksts

- [ ] Testi ir veiksmīgi (`npm test`)
- [ ] Lint pārbaude ir veiksmīga (`npm run lint`)
- [ ] Būvēšana ir veiksmīga (`npm run build`)
- [ ] Jaunām publiskajām funkcijām un saskarnēm ir pievienoti TypeScript tipi
- [ ] Nav cietkodētu noslēpumu vai rezerves vērtību
- [ ] Publiskie augšupējā nodrošinātāja akreditācijas dati ir iegulti, izmantojot `resolvePublicCred()` (skatiet [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), nekad kā literāļi
- [ ] Kļūdu atbildes tiek novirzītas caur `buildErrorBody()` / `sanitizeErrorMessage()` — atbildes pamattekstā nav neapstrādātu steka izsekojumu (skatiet [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Čaulas komandas (`exec` / `spawn`) izpildlaika vērtības padod, izmantojot `env`, nevis virkņu interpolāciju
- [ ] Visas ievades tiek validētas ar Zod shēmām
- [ ] Lietotājiem redzamām izmaiņām ir pievienots izmaiņu žurnāla **fragment** fails `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` (skatiet [`changelog.d/README.md`](./changelog.d/README.md)) — **ne**rediģējiet `CHANGELOG.md` tieši; fragmenti tiek apkopoti laidiena izveides laikā un nekad nerada konfliktus starp PR
- [ ] Dokumentācija ir atjaunināta (ja piemērojams)
- [ ] Nav atvērti jauni CodeQL / Secret-Scanning brīdinājumi, vai arī katrs no tiem ir noraidīts ar tehnisku pamatojumu, atsaucoties uz atbilstošo `docs/security/` dokumentu
- [ ] Maršruti, kas palaiž bērnprocesus (`/api/mcp/`, `/api/cli-tools/runtime/`), failā `src/server/authz/routeGuard.ts` ir klasificēti ar `isLocalOnlyPath()` — skatiet [Stingro noteikumu #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Komitziņojumos nav `Co-Authored-By` papildinājumu — komitiem ir jāparādās tikai repozitorija īpašnieka Git identitātes vārdā (Stingrais noteikums #16)

---

## Izlaides

Izlaides tiek pārvaldītas, izmantojot `/generate-release` darbplūsmu. Kad tiek izveidots jauns GitHub laidiens, pakotne tiek **automātiski publicēta npm** platformā, izmantojot GitHub Actions.

VPS izvietošanai izmantojiet `npm run build:release` (nevis `npm run build`) — tas veic tīru
pārbūvi, apkopo komplektu mapē `dist/` un izveido `dist/BUILD_SHA` indikatorfailu.
Pēc tam izmantojiet `/deploy-vps-*-cc` prasmes, kas ar rsync sinhronizē `dist/` ar attālo `app/` mapi.

---

## Palīdzības saņemšana

- **Arhitektūra**: skatiet [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **API atsauce**: skatiet [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Drošības dokumentācija**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Operāciju dokumentācija**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Problēmas**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADR**: skatiet `docs/adr/`, lai iepazītos ar arhitektūras lēmumu ierakstiem
