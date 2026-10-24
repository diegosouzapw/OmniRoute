# Contributing to OmniRoute (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Paldies par interesi sniegt ieguldījumu! Šajā rokasgrāmatā ir aprakstīts viss nepieciešamais, lai sāktu darbu.

Oficiālo katras izmaiņas darbplūsmu skatiet sadaļā
[Zelta ceļš ieguldījumu veikšanai](docs/ops/CONTRIBUTION_GOLDEN_PATH.md). Tajā pakalpojumu sniedzēja,
maršrutēšanas, UI/UX, i18n, CLI, datubāzes un būvēšanas/izvietošanas izmaiņas ir sasaistītas
ar to līgumiem, mērķētiem testiem, CI pārklājumu un saskaņošanas darbībām.

---

## Izstrādes vides iestatīšana

### Priekšnosacījumi

- **Node.js** `>=22.22.2 <23` vai `>=24.0.0 <27` (ieteicams: 24 LTS)
- **npm** 10+

> **npm v11+ lietotājiem (Node 24+):** pēc `npm install` izpildes pārbaudiet, vai vietējie moduļi ir instalēti:
> `node -e "require('better-sqlite3')"`. Ja komanda neizdodas ar kļūdu `MODULE_NOT_FOUND`,
> izpildiet `npm approve-scripts better-sqlite3 && npm install`. Skatiet
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
# Izveidojiet savu .env failu no veidnes
cp .env.example .env

# Ģenerējiet nepieciešamos noslēpumus
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Galvenie izstrādes vides mainīgie:

| Mainīgais              | Izstrādes noklusējuma vērtība | Apraksts                      |
| ---------------------- | ----------------------------- | ----------------------------- |
| `PORT`                 | `20128`                       | Servera ports                 |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`      | Priekšgala pamata URL         |
| `JWT_SECRET`           | (ģenerējiet iepriekš)         | JWT parakstīšanas noslēpums   |
| `INITIAL_PASSWORD`     | `CHANGEME`                    | Pirmās pieteikšanās parole    |
| `APP_LOG_LEVEL`        | `info`                        | Žurnāla detalizācijas līmenis |

### Informācijas paneļa iestatījumi

Informācijas panelī ir pieejami funkciju UI pārslēgi, kuras var konfigurēt arī ar vides mainīgajiem:

| Iestatījuma atrašanās vieta | Pārslēgs            | Apraksts                                         |
| --------------------------- | ------------------- | ------------------------------------------------ |
| Iestatījumi → Papildu       | Atkļūdošanas režīms | Iespējot atkļūdošanas pieprasījumu žurnālus (UI) |
| Iestatījumi → Vispārīgi     | Sānjoslas redzamība | Rādīt/paslēpt sānjoslas sadaļas                  |

Šie iestatījumi tiek glabāti datubāzē un saglabājas pēc restartēšanas, aizstājot vides mainīgo noklusējuma vērtības, ja tie ir iestatīti.

### Lokāla palaišana

```bash
# Izstrādes režīms (automātiska pārlāde)
npm run dev

# Produkcijas būvējums
npm run build    # next build → .build/next/, pēc tam assembleStandalone → dist/
npm run start

# Ātra tikai aizmugursistēmas/API kompilēšana līdzdalībnieku izmaiņām
npm run build:contributor

# Laidiena būvējums (tīra pārbūve + HEAD kontrolmarķieris — nepieciešams izvietošanai)
npm run build:release   # rm -rf .build dist && build + ieraksta dist/BUILD_SHA

# Bieži izmantota porta konfigurācija
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Līdzdalībnieku būvējums veic tikai kompilēšanas validāciju: tas neizveido autonomo
izplatījumu un nebūvē neobligātos vietējās pakotnes resursus. Izmantojiet parasto produkcijas būvējumu, kad
nepieciešams validēt izplatāmo komplektu.

### Būvējuma izvades struktūra

| Direktorijs | Saturs                                                                     | Izseko Git |
| ----------- | -------------------------------------------------------------------------- | ---------- |
| `src/`      | Lietotnes pirmkods (TypeScript / TSX)                                      | Jā         |
| `.build/`   | Starprezultāti — `next build` izvade (Git ignorē, `distDir = .build/next`) | Nē         |
| `dist/`     | Izplatāmais komplekts — izveido `assembleStandalone` (Git ignorē)          | Nē         |

Būvēšanas konveijers tiek izpildīts vienā piegājienā:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js izvade)
  └─ assembleStandalone()                 (kopē autonomo būvējumu + statiskos + publiskos + vietējos resursus)
       └─ izvade: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` vispirms papildus iztīra abus direktorijus un ieraksta
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) kā izvietošanas integritātes kontrolmarķieri.

`npm run build:contributor` izmanto tikai aizmugursistēmai paredzēto būvēšanas profilu. Būvēšanas laikā tas īslaicīgi aizstāj
informācijas paneļa UI failus ar aizstājējiem, saglabā API maršrutu apstrādātājus un pēc būvēšanas atjauno sākotnējos failus.
Izmantojiet `npm run build` izmaiņām, kas ietekmē informācijas paneļa UI, vai pilnai
laidiena validācijai; līdzdalībnieku profils neaizstāj laidiena būvējumu.

> **Piezīme par izvietošanu VPS:** attālā attēla direktorijs `/usr/lib/node_modules/omniroute/app/`
> nav mainīts. Izvietošanas rīki ar rsync sinhronizē `dist/` saturu uz šo direktoriju.
> Mainījās tikai repozitorijā esošās būvējuma izvades ceļš (`app/` → `dist/`).

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
├── app/                    # Next.js 16 lietotņu maršrutētājs
│   ├── (dashboard)/        # Informācijas paneļa lapas (23 sadaļas)
│   ├── api/                # API maršruti (51 direktorijs)
│   └── login/              # Autentifikācijas lapas (.tsx)
├── domain/                 # Politiku dzinis (policyEngine, comboResolver, costRules u.c.)
├── lib/                    # Biznesa pamatloģika (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protokola serveris
│   ├── acp/                # Agent Communication Protocol reģistrs
│   ├── compliance/         # Atbilstības politiku dzinis
│   ├── db/                 # SQLite domēna moduļi un 130 migrācijas
│   ├── memory/             # Pastāvīgā sarunu atmiņa
│   ├── oauth/              # OAuth nodrošinātāji, pakalpojumi un utilītas
│   ├── skills/             # Paplašināms prasmju ietvars
│   ├── usage/              # Lietojuma uzskaite un izmaksu aprēķināšana
│   └── localDb.ts          # Tikai atkārtota eksporta slānis — nekad nepievienojiet šeit loģiku
├── middleware/              # Pieprasījumu starpprogrammatūra (promptInjectionGuard)
├── mitm/                   # MITM starpniekserveris (sertifikāti, DNS, mērķu maršrutēšana)
├── shared/
│   ├── components/         # React komponenti (.tsx)
│   ├── constants/          # Nodrošinātāju definīcijas (329), MCP tvērumi, 21 maršrutēšanas stratēģija
│   ├── utils/              # Ķēdes pārtraucējs, sanitizētājs, autentifikācijas palīgfunkcijas
│   └── validation/         # Zod v4 shēmas
└── sse/                    # SSE starpniekservera konveijers

open-sse/                   # @omniroute/open-sse darbvieta
├── executors/              # 150 izpildītāju moduļi (izpildītāju klases un katra nodrošinātāja palīgfunkcijas)
├── handlers/               # 11 pieprasījumu apstrādātāji (tērzēšana, atbildes, iegultnes, attēli u.c.)
├── mcp-server/             # MCP serveris (110 unikāli rīki, 3 transporti, 33 tvērumi)
├── services/               # 178 augstākā līmeņa pakalpojumi (combo, autoCombo, rateLimitManager u.c.)
├── translator/             # Formātu tulkotāji (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API pārveidotājs
└── utils/                  # 22 utilītu moduļi (straumēšana, TLS, starpniekserveris, žurnalēšana)

electron/                   # Electron darbvirsmas lietotne (vairākplatformu)

tests/
├── unit/                   # Node.js testu izpildītājs (1 574 testu faili)
├── integration/            # Integrācijas testi
├── e2e/                    # Playwright testi
├── security/               # Drošības testi
├── translator/             # Tulkotājam specifiski testi
└── load/                   # Slodzes testi

docs/
├── adr/                     # Arhitektūras lēmumu ieraksti
├── architecture/            # Sistēmas arhitektūra un noturība
├── comparison/              # OmniRoute salīdzinājums ar alternatīvām
├── compression/             # Saspiešanas rokasgrāmatas un noteikumi
├── dev/                     # Izstrādes rokasgrāmatas
├── diagrams/                # Arhitektūras diagrammas
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # Lietotāja rokasgrāmata, Docker, iestatīšana, problēmu novēršana
├── i18n/                    # Internacionalizēti README tulkojumi
├── marketing/               # Mārketinga materiāli
├── ops/                     # Izvietošana, starpniekserveris, pārklājums, laidieni
├── providers/               # Nodrošinātājiem specifiska dokumentācija
├── reference/               # API uzziņas, vides mainīgie, CLI rīki, bezmaksas līmeņi
├── releases/                # Laidienu piezīmes
├── routing/                 # Automātisko kombināciju dzinis, spriešanas atkārtota atskaņošana
├── screenshots/             # Informācijas paneļa ekrānuzņēmumi
├── security/                # Aizsargmehānismi, atbilstība, maskēšana, marķieri
└── specs/                   # Projektējuma specifikācijas
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

- [ ] Testi ir sekmīgi (`npm test`)
- [ ] Lintēšana ir sekmīga (`npm run lint`)
- [ ] Būvēšana ir sekmīga (`npm run build`)
- [ ] Jaunajām publiskajām funkcijām un saskarnēm ir pievienoti TypeScript tipi
- [ ] Nav nekodētu noslēpumu vai atkāpšanās vērtību
- [ ] Publiskie augšupstraumes akreditācijas dati ir iegulti, izmantojot `resolvePublicCred()` (skatiet [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), un nekad nav norādīti kā literāļi
- [ ] Kļūdu atbildes tiek apstrādātas, izmantojot `buildErrorBody()` / `sanitizeErrorMessage()` — atbilžu pamattekstā nav neapstrādātu steka izsekojumu (skatiet [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Čaulas komandas (`exec` / `spawn`) izpildlaika vērtības nodod, izmantojot `env`, nevis virkņu interpolāciju
- [ ] Visas ievades ir validētas, izmantojot Zod shēmas
- [ ] Lietotājam redzamajām izmaiņām sadaļā `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` ir pievienots izmaiņu žurnāla **fragments** (skatiet [`changelog.d/README.md`](./changelog.d/README.md)) — **nerediģējiet** `CHANGELOG.md` tieši; fragmenti tiek apkopoti laidiena izveides laikā un nekad nerada konfliktus starp PR
- [ ] Dokumentācija ir atjaunināta (ja attiecināms)
- [ ] Nav izveidots neviens jauns CodeQL / Secret-Scanning brīdinājums, vai arī katrs brīdinājums ir noraidīts ar tehnisku pamatojumu, atsaucoties uz attiecīgo `docs/security/` dokumentu
- [ ] Maršruti, kas palaiž bērnprocesus (`/api/mcp/`, `/api/cli-tools/runtime/`), failā `src/server/authz/routeGuard.ts` ir klasificēti kā `isLocalOnlyPath()` — skatiet [Stingro noteikumu Nr. 15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Izpildes ziņojumos nav AI/robotu `Co-authored-by` nobeiguma rindu (Stingrais noteikums Nr. 16) — cilvēki, kuru darbs tiek atkārtoti izmantots, tiek norādīti ar standarta `Co-authored-by: Name <email>` nobeiguma rindām

---

## Izlaides

Izlaides tiek pārvaldītas, izmantojot `/generate-release` darbplūsmu. Kad tiek izveidots jauns GitHub laidiens, pakotne tiek **automātiski publicēta npm** platformā, izmantojot GitHub Actions.

VPS izvietošanai izmantojiet `npm run build:release` (nevis `npm run build`) — tas veic tīru
pārbūvi, apkopo komplektu mapē `dist/` un izveido `dist/BUILD_SHA` indikatorfailu.
Pēc tam izmantojiet `/deploy-vps-*-cc` prasmes, kas ar rsync sinhronizē `dist/` ar attālo `app/` mapi.

---

## Palīdzības saņemšana

- **Arhitektūra**: Skatiet [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **API atsauce**: Skatiet [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Drošības dokumentācija**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Ekspluatācijas dokumentācija**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Problēmas**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
