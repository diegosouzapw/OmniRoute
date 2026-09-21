# Contributing to OmniRoute (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## Usanidi wa Maendeleo

### Mahitaji ya Awali

- **Node.js** `>=22.22.3 <23`, au `>=24.0.0 <27` (inapendekezwa: 24 LTS)
- **npm** 10+

> **Watumiaji wa npm v11+ (Node 24+):** Baada ya `npm install`, hakikisha moduli asilia zilisakinishwa:
> `node -e "require('better-sqlite3')"`. Ikishindwa kwa `MODULE_NOT_FOUND`,
> tekeleza `npm approve-scripts better-sqlite3 && npm install`. Angalia
> [Utatuzi wa Matatizo](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Nakili na Usakinishe

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Vigezo vya Mazingira

```bash
# Unda .env yako kutoka kwenye kiolezo
cp .env.example .env

# Tengeneza siri zinazohitajika
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Vigezo muhimu kwa maendeleo:

| Kigezo                 | Chaguo-msingi la Maendeleo | Maelezo                                |
| ---------------------- | -------------------------- | -------------------------------------- |
| `PORT`                 | `20128`                    | Mlango wa seva                         |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`   | URL msingi ya kiolesura cha mbele      |
| `JWT_SECRET`           | (tengeneza hapo juu)       | Siri ya kutia saini JWT                |
| `INITIAL_PASSWORD`     | `CHANGEME`                 | Nenosiri la kuingia kwa mara ya kwanza |
| `APP_LOG_LEVEL`        | `info`                     | Kiwango cha kina cha kumbukumbu        |

### Mipangilio ya Dashibodi

Dashibodi hutoa vitufe vya UI vya kuwasha au kuzima vipengele ambavyo vinaweza pia kusanidiwa kupitia vigezo vya mazingira:

| Eneo la Mpangilio   | Kitufe                       | Maelezo                                    |
| ------------------- | ---------------------------- | ------------------------------------------ |
| Mipangilio → Mahiri | Hali ya Utatuzi              | Washa kumbukumbu za maombi ya utatuzi (UI) |
| Mipangilio → Jumla  | Mwonekano wa Upau wa Pembeni | Onyesha/ficha sehemu za upau wa pembeni    |

Mipangilio hii huhifadhiwa kwenye hifadhidata na hudumu baada ya kuwasha upya, huku ikibatilisha chaguo-msingi za vigezo vya mazingira inapowekwa.

### Kuendesha Ndani ya Mfumo

```bash
# Hali ya maendeleo (upakiaji upya wa papo hapo)
npm run dev

# Muundo wa uzalishaji
npm run build    # next build → .build/next/ kisha assembleStandalone → dist/
npm run start

# Ukompilishaji wa haraka wa backend/API pekee kwa mabadiliko ya wachangiaji
npm run build:contributor

# Muundo wa toleo (kujenga upya kutoka mwanzo + kiashirio cha HEAD — kinahitajika kwa upelekaji)
npm run build:release   # rm -rf .build dist && kujenga + huandika dist/BUILD_SHA

# Usanidi wa kawaida wa mlango
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Muundo wa mchangiaji hufanya uthibitishaji wa ukompilishaji pekee: haukusanyi
usambazaji unaojitegemea wala kujenga rasilimali hiari za upakiaji asilia. Tumia muundo wa kawaida wa uzalishaji unapohitaji
kuthibitisha kifurushi kinachoweza kusambazwa.

### Mpangilio wa Matokeo ya Muundo

| Saraka    | Yaliyomo                                                                                     | Inafuatiliwa |
| --------- | -------------------------------------------------------------------------------------------- | ------------ |
| `src/`    | Msimbo chanzo wa programu (TypeScript / TSX)                                                 | Ndiyo        |
| `.build/` | Matokeo ya kati — matokeo ya `next build` (hayafuatiliwi na git, `distDir = .build/next`)    | Hapana       |
| `dist/`   | Kifurushi kinachoweza kusambazwa — hukusanywa na `assembleStandalone` (hakifuatiliwi na git) | Hapana       |

Mtiririko wa ujenzi ni awamu moja:

```
npm run build
  └─ next build → .build/next/standalone  (matokeo ya Next.js)
  └─ assembleStandalone()                 (hunakili standalone + static + public + rasilimali asilia)
       └─ matokeo: dist/                  (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` pia husafisha saraka zote mbili kwanza na kuandika
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) kama kiashirio cha uadilifu wa upelekaji.

`npm run build:contributor` hutumia wasifu wa ujenzi wa backend pekee. Hubadilisha kwa muda
faili za UI ya dashibodi na kuweka vibadala wakati wa kujenga, huhifadhi vishughulikiaji vya njia za API, na kurejesha faili asili
baada ya ujenzi. Tumia `npm run build` kwa mabadiliko yanayoathiri UI ya dashibodi au kwa
uthibitishaji kamili wa toleo; wasifu wa mchangiaji si mbadala wa muundo wa toleo.

> **Dokezo la upelekaji wa VPS:** saraka ya picha ya mbali `/usr/lib/node_modules/omniroute/app/`
> haijabadilika. Zana za upelekaji hutumia rsync kusawazisha yaliyomo kwenye `dist/` hadi humo.
> Ni njia ya matokeo ya ujenzi ndani ya hazina pekee iliyohamishwa (`app/` → `dist/`).

URL chaguo-msingi:

- **Dashibodi**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Mtiririko wa Kazi wa Git

> ⚠️ **USIWAHI kufanya commit moja kwa moja kwenye `main`.** Tumia matawi ya vipengele kila wakati.
>
> **Msingi wa PR:** lenga tawi amilifu la `release/vX.Y.Z` (si `main`). Angalia
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) kwa modeli ya
> toleo-kwa-kila-tawi + kuweka lebo-wakati-wa-kusambaza.

```bash
# Unda tawi kutoka kwenye ncha ya toleo amilifu (mfano: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... fanya mabadiliko ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Fungua Pull Request yenye msingi = release/v3.8.49
```

### Utoaji wa Majina kwa Matawi

| Kiambishi Awali | Madhumuni                         |
| --------------- | --------------------------------- |
| `feat/`         | Vipengele vipya                   |
| `fix/`          | Marekebisho ya hitilafu           |
| `refactor/`     | Kupanga upya msimbo               |
| `docs/`         | Mabadiliko ya nyaraka             |
| `test/`         | Nyongeza/marekebisho ya majaribio |
| `chore/`        | Zana, CI, vitegemezi              |

### Ujumbe wa Commit

Fuata [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Mawanda (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Kuendesha Majaribio

```bash
# Majaribio yote (unit + vitest + ecosystem + e2e)
npm run test:all

# Faili moja ya jaribio (kiendesha majaribio asili cha Node.js — majaribio mengi hutumia hiki)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Majaribio ya unit pekee yaliyoathiriwa na mabadiliko yako (kiteuzi sawa cha TIA kama kizuizi cha CI, #8084)
npm run test:scoped            # mabadiliko katika commit ya mwisho (au mti wa kazi)
npm run test:scoped:staged     # mabadiliko yaliyowekwa kwenye staging pekee — huendana vizuri na utekelezaji wa pre-commit
npm run test:scoped:full       # kwanza jenga upya ramani ya grafu ya import (baada ya kuongeza/kuhamisha faili)
# Exit 1 + "run the full suite" humaanisha faili ya kitovu (tsconfig, package.json, …) au chanzo
# kisichowekwa kwenye ramani kilibadilika — kiteuzi hushindwa kwa usalama, hakiruki chochote kimyakimya.

# Vitest (seva ya MCP, autoCombo, cache)
npm run test:vitest

# Majaribio ya E2E (yanahitaji Playwright)
npm run test:e2e

# E2E ya viteja vya itifaki (usafirishaji wa MCP, A2A)
npm run test:protocols:e2e

# Majaribio ya uoanifu wa mfumo-ikolojia
npm run test:ecosystem

# Kizuizi cha coverage: 60% ya statements/lines/functions/branches
npm run test:coverage
npm run coverage:report

# Ukaguzi wa lint + umbizo
npm run lint
npm run check

# Jaribio la haraka la combo halisi ya upstream lililowekewa kizuizi (linahitaji ufikiaji wa VPS + salio halisi la mtoa huduma)
# Huwasiliana na watoa huduma HALISI — hugharimu kiasi kidogo. HALITEKELEZWI KAMWE kwenye CI. Hurukwa bila hitilafu bila kizuizi.
# Linahitaji: ufikiaji wa ssh root@192.168.0.15 (hupakia snapshot ya DB ya kusoma pekee kutoka VPS).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Jaribio la moja kwa moja la VPS la awamu ya 3 — hati za kawaida za Node ESM, huwasiliana moja kwa moja na seva hai ya .15.
# Linahitaji: ufikiaji wa ssh root@192.168.0.15 (combo huundwa/huondolewa kupitia SSH sqlite).
# Huwasiliana na watoa huduma HALISI (gharama ndogo). Huunda/hufuta combo za __live_test__* pekee. HALITEKELEZWI KAMWE kwenye CI.
# REQUIRE_API_KEY=false kwenye .15 kwa hivyo hakuna ufunguo wa API unaohitajika, lakini huzingatia COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY ikiwa vimewekwa.
npm run test:combo:live:vps              # hali 7 za HTTP (priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # huongeza hali halisi ya failover kati ya watoa huduma (jumla 8)
```

Maelezo ya coverage:

- `npm run test:coverage` hupima coverage ya chanzo kwa mkusanyiko mkuu wa majaribio ya unit, huondoa `tests/**`, na hujumuisha `open-sse/**`
- Pull request lazima zidumishe kizuizi cha coverage cha **60%+** kwa statements/lines/functions/branches
- Ikiwa PR inabadilisha msimbo wa uzalishaji katika `src/`, `open-sse/`, `electron/`, au `bin/`, lazima iongeze au isasishe majaribio ya kiotomatiki katika PR hiyo hiyo
- `npm run coverage:report` huchapisha ripoti ya kina ya kila faili kutoka katika utekelezaji wa hivi karibuni wa coverage
- `npm run test:coverage:legacy` huhifadhi kipimo cha zamani kwa ajili ya ulinganisho wa kihistoria
- Tazama `docs/ops/COVERAGE_PLAN.md` kwa ramani ya hatua kwa hatua ya kuboresha coverage

### Mahitaji ya Pull Request

Kabla ya kufungua PR, tumia
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) kuendesha mzunguko uliolenga
kile ulichobadilisha. Mkusanyiko kamili wa majaribio ya unit (sehemu 4 za CI), Vitest, kizuizi cha coverage cha **60%+**, na
build ya uzalishaji ni jukumu la CI — kuviendesha ndani ya mazingira yako hakuongezi taarifa yoyote ambayo ukaguzi wa PR
hautakupa tayari, na kwenye mashine ndogo kunaweza kujaza kabisa rasilimali za host (#8084):

- Endesha faili za majaribio zinazohusiana na mabadiliko yako: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Endesha `npm run lint`
- Jumuisha au sasisha majaribio ya kiotomatiki katika PR hiyo hiyo kila msimbo wa uzalishaji unapobadilika
- Jumuisha faili za majaribio zilizobadilishwa au kuongezwa katika maelezo ya PR wakati msimbo wa uzalishaji umebadilika
- Kagua matokeo ya SonarQube kwenye PR wakati siri za mradi zimesanidiwa katika CI

Hali ya sasa ya majaribio: **faili 122 za majaribio ya unit** zinazoshughulikia:

- Vigeuzi vya watoa huduma na ubadilishaji wa umbizo
- Uzuiaji wa kasi, circuit breaker, na ustahimilivu
- Cache ya kisemantiki, idempotency, ufuatiliaji wa maendeleo
- Operesheni za hifadhidata na schema (moduli 21 za DB)
- Mitiririko ya OAuth na uthibitishaji
- Uthibitishaji wa endpoint za API (Zod v4)
- Zana za seva ya MCP na utekelezaji wa scope
- Mifumo ya Memory na Skills

---

## Mtindo wa Msimbo

- **ESLint** — Endesha `npm run lint` kabla ya kufanya commit
- **Prettier** — Huumbizwa kiotomatiki kupitia `lint-staged` wakati wa commit (nafasi 2, semikholoni, nukuu mbili, upana wa herufi 100, koma za mwisho za es5)
- **TypeScript** — Msimbo wote wa `src/` hutumia `.ts`/`.tsx`; `open-sse/` hutumia `.ts`/`.js`; andika nyaraka kwa TSDoc (`@param`, `@returns`, `@throws`)
- **Hakuna `eval()`** — ESLint hutekeleza `no-eval`, `no-implied-eval`, `no-new-func`
- **Uthibitishaji wa Zod** — Tumia skima za Zod v4 kwa uthibitishaji wote wa data ingizo ya API
- **Utoaji wa majina**: Faili = camelCase/kebab-case, vipengele = PascalCase, konstanti = UPPER_SNAKE

### Ushughulikiaji wa hitilafu / vizuizi tupu vya catch

Kamwe usiache `catch` bila maelezo. Iainishe katika mojawapo ya makundi mawili (hii huweka
katika vitendo kanuni thabiti ya "kamwe usipuuze hitilafu kimyakimya katika mitiririko ya SSE"):

- **Ya kukusudia (usafishaji/telemetria yetu ya juhudi bora)** — kushindwa hapa kunatarajiwa na
  hakusababishi madhara; ongeza maoni ya mstari mmoja yanayoeleza sababu, bila kurekodi kumbukumbu (kurekodi kila ombi ndilo
  jambo lisilo na maana ambalo kanuni hii huepuka).

  ```ts
  } catch {} // kufunga kidhibiti ambacho tayari kimefungwa baada ya mteja kukata muunganisho kunatarajiwa
  ```

- **Inapaswa kurekodiwa (msimbo wa nje/uliotolewa na mwitaji, au kupuuza kunabadilisha mtiririko wa udhibiti)** — hifadhi
  catch (kamwe usiiruhusu ivunje mtiririko) lakini toa `console.debug`/`warn` yenye muktadha ili
  hitilafu iweze kugundulika.

  ```ts
  } catch (e) {
    console.debug("[STREAM] hitilafu ya callback ya onFailure:", e);
  }
  ```

Tazama `open-sse/utils/stream.ts` na `open-sse/utils/streamHandler.ts` kwa mifano iliyotekelezwa.

---

## Project Structure

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard pages (23 sections)
│   ├── api/                # API routes (51 directories)
│   └── login/              # Auth pages (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules, etc.)
├── lib/                    # Core business logic (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol registry
│   ├── compliance/         # Compliance policy engine
│   ├── db/                 # SQLite database layer (110 top-level modules + 130 migrations)
│   ├── memory/             # Persistent conversational memory
│   ├── oauth/              # OAuth providers, services, and utilities
│   ├── skills/             # Extensible skill framework
│   ├── usage/              # Usage tracking and cost calculation
│   └── localDb.ts          # Re-export layer only — never add logic here
├── middleware/              # Request middleware (promptInjectionGuard)
├── mitm/                   # MITM proxy (cert, DNS, target routing)
├── shared/
│   ├── components/         # React components (.tsx)
│   ├── constants/          # Provider definitions (329), MCP scopes, routing strategies
│   ├── utils/              # Circuit breaker, sanitizer, auth helpers
│   └── validation/         # Zod v4 schemas
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 89 executor implementation modules
├── handlers/               # 11 request handlers (chat, responses, embeddings, images, etc.)
├── mcp-server/             # MCP server (107 tools, 3 transports, 32 scopes)
├── services/               # 178 top-level services (combo, autoCombo, rateLimitManager, etc.)
├── translator/             # Format translators (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # 22 utility modules (stream, TLS, proxy, logging)

electron/                   # Electron desktop app (cross-platform)

tests/
├── unit/                   # Node.js test runner (122 test files)
├── integration/            # Integration tests
├── e2e/                    # Playwright tests
├── security/               # Security tests
├── translator/             # Translator-specific tests
└── load/                   # Load tests

docs/                       # Documentation
├── ARCHITECTURE.md         # System architecture
├── API_REFERENCE.md        # All endpoints
├── USER_GUIDE.md           # Provider setup, CLI integration
├── TROUBLESHOOTING.md      # Common issues
├── MCP-SERVER.md           # MCP server (107 tools)
├── A2A-SERVER.md           # A2A agent protocol
├── AUTO-COMBO.md           # Auto-combo engine
├── CLI-TOOLS.md            # CLI tools integration
├── COVERAGE_PLAN.md        # Test coverage improvement plan
├── openapi.yaml            # OpenAPI specification
└── adr/                    # Architecture Decision Records
```

---

## Kuongeza Mtoa Huduma Mpya

### Hatua ya 1: Sajili Konstanti za Mtoa Huduma

Ongeza kwenye `src/shared/constants/providers.ts` — huthibitishwa na Zod wakati moduli inapopakiwa.

### Hatua ya 2: Ongeza Kitekelezaji (ikiwa mantiki maalum inahitajika)

Unda kitekelezaji katika `open-sse/executors/your-provider.ts` kinachopanua kitekelezaji cha msingi.

### Hatua ya 3: Ongeza Kitafsiri (ikiwa si umbizo la OpenAI)

Unda vitafsiri vya ombi/jibu katika `open-sse/translator/`.

### Hatua ya 4: Ongeza Usanidi wa OAuth (ikiwa unategemea OAuth)

Ongeza vitambulisho vya OAuth katika `src/lib/oauth/constants/oauth.ts` na huduma katika `src/lib/oauth/services/`.

Ikiwa mtoa huduma wa chanzo anasambaza OAuth client_id/secret ya umma au ufunguo wa Firebase Web API ndani ya CLI yake ya umma / kifurushi cha kivinjari, **usiiweke** kama thamani ya mfuatano iliyoandikwa moja kwa moja. Tumia `resolvePublicCred()` kutoka `open-sse/utils/publicCreds.ts` na uongeze ingizo la baiti lililofichwa kwenye `EMBEDDED_DEFAULTS`. Mtiririko kamili wa lazima wa kazi umeandikwa katika [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

Ndani ya vishughulikiaji/vitekelezaji, ujumbe wa hitilafu unaomfikia mteja lazima upitie `buildErrorBody()` / `sanitizeErrorMessage()` kutoka `open-sse/utils/error.ts` — usiweke kamwe `err.stack` au `err.message` ghafi katika mwili wa Response. Tazama [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Hatua ya 5: Sajili Modeli

Ongeza ufafanuzi wa modeli katika `open-sse/config/providerRegistry.ts`.

### Hatua ya 6: Ongeza Majaribio

Andika majaribio ya vipengele katika `tests/unit/` yanayojumuisha angalau:

- Usajili wa mtoa huduma
- Utafsiri wa ombi/jibu
- Ushughulikiaji wa hitilafu

---

## Orodha Hakiki ya Pull Request

- [ ] Majaribio yanafaulu (`npm test`)
- [ ] Ukaguzi wa lint unafaulu (`npm run lint`)
- [ ] Ujenzi unafanikiwa (`npm run build`)
- [ ] Aina za TypeScript zimeongezwa kwa functions na interfaces mpya za umma
- [ ] Hakuna siri au thamani mbadala zilizowekwa moja kwa moja
- [ ] Vitambulisho vya umma vya upstream vimepachikwa kupitia `resolvePublicCred()` (angalia [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), kamwe si kama literals
- [ ] Majibu ya hitilafu hupitishwa kupitia `buildErrorBody()` / `sanitizeErrorMessage()` — hakuna stack traces ghafi katika miili ya majibu (angalia [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Amri za shell (`exec` / `spawn`) hupitisha thamani za runtime kupitia `env`, si kupitia uingizaji wa thamani kwenye string
- [ ] Ingizo zote zimethibitishwa kwa schemas za Zod
- [ ] **Kipande** cha changelog kimeongezwa chini ya `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` kwa mabadiliko yanayoonekana kwa mtumiaji (angalia [`changelog.d/README.md`](./changelog.d/README.md)) — **usihariri** `CHANGELOG.md` moja kwa moja; vipande huunganishwa wakati wa toleo na kamwe havikinzani kati ya PR
- [ ] Nyaraka zimesasishwa (ikiwa inatumika)
- [ ] Hakuna arifa mpya za CodeQL / Secret-Scanning zilizofunguliwa, au kila moja imepuuzwa kwa uhalalishaji wa kiufundi unaorejelea hati husika ya `docs/security/`
- [ ] Routes zinazoanzisha child processes (`/api/mcp/`, `/api/cli-tools/runtime/`) zimeainishwa kama `isLocalOnlyPath()` katika `src/server/authz/routeGuard.ts` — angalia [Kanuni Isiyobadilika #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Hakuna trailers za `Co-Authored-By` katika commit messages — commits lazima zionekane chini ya Git identity ya mmiliki wa repository pekee (Kanuni Isiyobadilika #16)

---

## Releasing

Releases are managed via the `/generate-release` workflow. When a new GitHub Release is created, the package is **automatically published to npm** via GitHub Actions.

---

## Kupata Msaada

- **Usanifu**: Tazama [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **Marejeleo ya API**: Tazama [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Nyaraka za usalama**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Nyaraka za uendeshaji**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Masuala**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADR**: Tazama `docs/adr/` kwa rekodi za maamuzi ya usanifu
