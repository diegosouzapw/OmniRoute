# Contributing to OmniRoute (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Շնորհակալություն ներդրում կատարելու ձեր հետաքրքրության համար։ Այս ուղեցույցն ընդգրկում է այն ամենը, ինչ անհրաժեշտ է սկսելու համար։

Յուրաքանչյուր փոփոխության պաշտոնական աշխատանքային ընթացքի համար սկսեք
[Ներդրման ոսկե ուղուց](docs/ops/CONTRIBUTION_GOLDEN_PATH.md)։ Այն մատակարարի, երթուղավորման,
UI/UX-ի, i18n-ի, CLI-ի, տվյալների բազայի և կառուցման/տեղակայման փոփոխությունները կապում է դրանց պայմանագրերի, նպատակային թեստերի, CI
ծածկույթի և համադրման քայլերի հետ։

---

## Մշակման միջավայրի կարգավորում

### Նախապայմաններ

- **Node.js** `>=22.22.3 <23` կամ `>=24.0.0 <27` (խորհուրդ է տրվում՝ 24 LTS)
- **npm** 10+

> **npm v11+ օգտագործողներ (Node 24+).** `npm install`-ից հետո ստուգեք, որ բնիկ մոդուլները տեղադրվել են.
> `node -e "require('better-sqlite3')"`։ Եթե այն ձախողվում է `MODULE_NOT_FOUND` սխալով,
> գործարկեք `npm approve-scripts better-sqlite3 && npm install`։ Տե՛ս
> [Խնդիրների լուծում](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module)։

- **Git**

### Կլոնավորում և տեղադրում

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Միջավայրի փոփոխականներ

```bash
# Ստեղծեք ձեր .env-ը ձևանմուշից
cp .env.example .env

# Գեներացրեք անհրաժեշտ գաղտնիքները
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Մշակման համար հիմնական փոփոխականները.

| Փոփոխական              | Մշակման լռելյայն արժեք   | Նկարագրություն                      |
| ---------------------- | ------------------------ | ----------------------------------- |
| `PORT`                 | `20128`                  | Սերվերի պորտ                        |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | Առջևի մասի հիմնական URL             |
| `JWT_SECRET`           | (գեներացնել վերևում)     | JWT-ի ստորագրման գաղտնիք            |
| `INITIAL_PASSWORD`     | `CHANGEME`               | Առաջին մուտքի գաղտնաբառ             |
| `APP_LOG_LEVEL`        | `info`                   | Մատյանների մանրամասնության մակարդակ |

### Կառավարման վահանակի կարգավորումներ

Կառավարման վահանակը տրամադրում է UI փոխարկիչներ այն գործառույթների համար, որոնք կարող են կարգավորվել նաև միջավայրի փոփոխականների միջոցով.

| Կարգավորման տեղադրություն   | Փոխարկիչ                  | Նկարագրություն                                   |
| --------------------------- | ------------------------- | ------------------------------------------------ |
| Կարգավորումներ → Ընդլայնված | Վրիպազերծման ռեժիմ        | Միացնել հարցումների վրիպազերծման մատյանները (UI) |
| Կարգավորումներ → Ընդհանուր  | Կողագոտու տեսանելիություն | Ցուցադրել/թաքցնել կողագոտու բաժինները            |

Այս կարգավորումները պահվում են տվյալների բազայում և պահպանվում են վերագործարկումների ընթացքում՝ սահմանված լինելու դեպքում վերագրելով միջավայրի փոփոխականների լռելյայն արժեքները։

### Տեղային գործարկում

```bash
# Մշակման ռեժիմ (թեժ վերաբեռնում)
npm run dev

# Արտադրական կառուցում
npm run build    # next build → .build/next/, ապա assembleStandalone → dist/
npm run start

# Արագ՝ միայն հետնամասի/API-ի կոմպիլյացիա ներդրողների փոփոխությունների համար
npm run build:contributor

# Թողարկման կառուցում (մաքուր վերակառուցում + HEAD ստուգիչ — պարտադիր է տեղակայման համար)
npm run build:release   # rm -rf .build dist && կառուցում + գրանցում է dist/BUILD_SHA-ը

# Պորտի տարածված կարգավորում
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Ներդրողի կառուցումը կատարում է միայն կոմպիլյացիոն վավերացում. այն չի հավաքում ինքնուրույն
բաշխումը և չի կառուցում ընտրովի բնիկ փաթեթավորման ռեսուրսները։ Օգտագործեք սովորական արտադրական կառուցումը, երբ
անհրաժեշտ է վավերացնել առաքման համար պատրաստ փաթեթը։

### Կառուցման արդյունքի կառուցվածքը

| Գրացուցակ | Բովանդակություն                                                                                | Հետագծվում է |
| --------- | ---------------------------------------------------------------------------------------------- | ------------ |
| `src/`    | Հավելվածի սկզբնաղբյուր (TypeScript / TSX)                                                      | Այո          |
| `.build/` | Միջանկյալ ֆայլեր՝ `next build`-ի արդյունքը (անտեսվում է Git-ի կողմից, `distDir = .build/next`) | Ոչ           |
| `dist/`   | Առաքելի փաթեթ՝ հավաքված `assembleStandalone`-ի միջոցով (անտեսվում է Git-ի կողմից)              | Ոչ           |

Կառուցման շղթան մեկ անցումով է.

```
npm run build
  └─ next build → .build/next/standalone  (Next.js-ի արդյունք)
  └─ assembleStandalone()                 (պատճենում է ինքնուրույն փաթեթը + ստատիկ ֆայլերը + հանրային ֆայլերը + բնիկ ռեսուրսները)
       └─ արդյունք՝ dist/                 (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release`-ը լրացուցիչ նախ մաքրում է երկու գրացուցակներն էլ և գրում է
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`)՝ որպես տեղակայման ամբողջականության ստուգիչ։

`npm run build:contributor`-ն օգտագործում է միայն հետնամասի կառուցման պրոֆիլը։ Կառուցման ընթացքում այն ժամանակավորապես փոխարինում է
կառավարման վահանակի UI ֆայլերը ժամանակավոր տարբերակներով, պահպանում է API երթուղիների մշակիչները և կառուցումից հետո վերականգնում է սկզբնական ֆայլերը։
Կառավարման վահանակի UI-ի վրա ազդող փոփոխությունների կամ թողարկման ամբողջական վավերացման համար օգտագործեք `npm run build`։
Ներդրողի պրոֆիլը չի փոխարինում թողարկման կառուցմանը։

> **VPS տեղակայման նշում.** հեռակա պատկերի `/usr/lib/node_modules/omniroute/app/`
> գրացուցակը չի փոխվել։ Տեղակայման գործիքները rsync-ի միջոցով `dist/`-ի բովանդակությունը համաժամացնում են դրա մեջ։
> Փոխվել է միայն ռեպոզիտորիայի ներսում կառուցման արդյունքի ուղին (`app/` → `dist/`)։

Լռելյայն URL-ներ.

- **Կառավարման վահանակ**՝ `http://localhost:20128/dashboard`
- **API**՝ `http://localhost:20128/v1`

---

## Git աշխատանքային հոսք

> ⚠️ **ԵՐԲԵՔ commit մի արեք անմիջապես `main` ճյուղում։** Միշտ օգտագործեք ֆունկցիոնալ ճյուղեր։
>
> **PR-ի բազային ճյուղը՝** թիրախավորեք ակտիվ `release/vX.Y.Z` ճյուղը (ոչ թե `main`)։ Յուրաքանչյուր թողարկման համար առանձին ճյուղ + առաքման պահին tag մոդելի մասին տե՛ս
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md)։

```bash
# Ճյուղ ստեղծեք ակտիվ թողարկման վերջին կետից (օրինակ՝ release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... կատարեք փոփոխությունները ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Բացեք Pull Request՝ base = release/v3.8.49
```

### Ճյուղերի անվանումներ

| Նախածանց    | Նպատակ                          |
| ----------- | ------------------------------- |
| `feat/`     | Նոր գործառույթներ               |
| `fix/`      | Սխալների ուղղումներ             |
| `refactor/` | Կոդի վերակազմավորում            |
| `docs/`     | Փաստաթղթերի փոփոխություններ     |
| `test/`     | Թեստերի ավելացումներ/ուղղումներ |
| `chore/`    | Գործիքներ, CI, կախվածություններ |

### Commit հաղորդագրություններ

Հետևեք [Conventional Commits](https://www.conventionalcommits.org/) ձևաչափին՝

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Տիրույթներ (v3.8)՝ `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`։

---

## Թեստերի գործարկում

```bash
# Բոլոր թեստերը (մոդուլային + vitest + էկոհամակարգային + e2e)
npm run test:all

# Մեկ թեստային ֆայլ (Node.js-ի ներկառուցված թեստային գործարկիչ. թեստերի մեծ մասն օգտագործում է սա)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Միայն ձեր փոփոխությունից ազդված մոդուլային թեստերը (նույն TIA ընտրիչը, ինչ CI դարպասում, #8084)
npm run test:scoped            # վերջին commit-ի (կամ աշխատանքային ծառի) փոփոխությունները
npm run test:scoped:staged     # միայն staged փոփոխությունները. հարմար է pre-commit գործարկման հետ
npm run test:scoped:full       # նախ վերակառուցեք import-ների գրաֆի քարտեզը (ֆայլեր ավելացնելուց/տեղափոխելուց հետո)
# Exit 1 + «գործարկեք ամբողջ հավաքակազմը» նշանակում է, որ փոխվել է առանցքային ֆայլ
# (tsconfig, package.json, …) կամ չքարտեզագրված աղբյուր. ընտրիչն անվտանգ կերպով ձախողվում է և երբեք անձայն բաց չի թողնում։

# Vitest (MCP սերվեր, autoCombo, cache)
npm run test:vitest

# E2E թեստեր (պահանջում է Playwright)
npm run test:e2e

# Արձանագրային հաճախորդների E2E (MCP փոխադրամիջոցներ, A2A)
npm run test:protocols:e2e

# Էկոհամակարգի համատեղելիության թեստեր
npm run test:ecosystem

# Ծածկույթի շեմ՝ 60% հրահանգներ/տողեր/ֆունկցիաներ/ճյուղեր
npm run test:coverage
npm run coverage:report

# Lint + ձևաչափի ստուգում
npm run lint
npm run check

# Իրական upstream combo-ի պայմանական smoke թեստ (պահանջում է VPS հասանելիություն + իրական մատակարարի կրեդիտներ)
# Դիմում է ԻՐԱԿԱՆ մատակարարներին՝ փոքր ծախսով։ ԵՐԲԵՔ չի գործարկվում CI-ում։ Առանց պայմանը միացնելու՝ մաքուր կերպով բաց է թողնվում։
# Պահանջվում է՝ ssh root@192.168.0.15 հասանելիություն (VPS-ից օգտագործում է DB-ի միայն ընթերցման snapshot)։
RUN_COMBO_LIVE=1 npm run test:combo:live

# Phase-3 VPS-ի կենդանի smoke թեստ՝ պարզ Node ESM սկրիպտներ, որոնք անմիջապես դիմում են կենդանի .15 սերվերին։
# Պահանջվում է՝ ssh root@192.168.0.15 հասանելիություն (combo-ները ստեղծվում/քանդվում են SSH sqlite-ի միջոցով)։
# Դիմում է ԻՐԱԿԱՆ մատակարարներին (փոքր ծախսով)։ Ստեղծում/ջնջում է միայն __live_test__* combo-ներ։ ԵՐԲԵՔ չի գործարկվում CI-ում։
# .15-ում REQUIRE_API_KEY=false է, ուստի API key չի պահանջվում, բայց սահմանված լինելու դեպքում հաշվի է առնում COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY։
npm run test:combo:live:vps              # 7 HTTP սցենար (priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # ավելացնում է մատակարարների միջև իրական failover սցենար (ընդամենը՝ 8)
```

Ծածկույթի նշումներ՝

- `npm run test:coverage`-ը չափում է հիմնական մոդուլային թեստերի հավաքակազմի աղբյուրային ծածկույթը, բացառում է `tests/**`-ը և ներառում է `open-sse/**`-ը
- Pull request-ները պետք է պահպանեն հրահանգների/տողերի/ֆունկցիաների/ճյուղերի ծածկույթի **60%+** շեմը
- Եթե PR-ը փոխում է արտադրական կոդը `src/`, `open-sse/`, `electron/` կամ `bin/` ուղիներում, ապա նույն PR-ում պետք է ավելացնի կամ թարմացնի ավտոմատացված թեստերը
- `npm run coverage:report`-ը տպում է ծածկույթի վերջին գործարկման մանրամասն՝ ըստ ֆայլերի հաշվետվությունը
- `npm run test:coverage:legacy`-ն պահպանում է հին չափանիշը՝ պատմական համեմատության համար
- Ծածկույթի փուլային բարելավման ճանապարհային քարտեզը տե՛ս `docs/ops/COVERAGE_PLAN.md`-ում

### Pull Request-ի պահանջներ

Նախքան PR բացելը, օգտագործեք
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md)-ը՝ ձեր կատարած փոփոխությունների համար
կենտրոնացված ցիկլը գործարկելու նպատակով։ Ամբողջական մոդուլային հավաքակազմը (CI-ի 4 shard), Vitest-ը, ծածկույթի **60%+** շեմը և
արտադրական build-ը CI-ի պատասխանատվությունն են. դրանք տեղային գործարկելը լրացուցիչ օգտակար ազդանշան չի տալիս, որը PR-ի
ստուգումներն արդեն չեն տրամադրի, իսկ ավելի փոքր մեքենաներում կարող է ամբողջությամբ ծանրաբեռնել host-ը (#8084)՝

- Գործարկեք ձեր փոփոխությունը ծածկող թեստային ֆայլերը՝ `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Գործարկեք `npm run lint`
- Երբ արտադրական կոդը փոխվում է, նույն PR-ում ներառեք կամ թարմացրեք ավտոմատացված թեստերը
- Երբ արտադրական կոդը փոխվել է, PR-ի նկարագրության մեջ ներառեք փոփոխված կամ ավելացված թեստային ֆայլերը
- Ստուգեք PR-ի SonarQube արդյունքը, երբ նախագծի secrets-ը կարգավորված են CI-ում

Թեստերի ընթացիկ վիճակը՝ **122 մոդուլային թեստային ֆայլ**, որոնք ընդգրկում են՝

- Մատակարարների translator-ներ և ձևաչափի փոխակերպում
- Հարցումների հաճախականության սահմանափակում, circuit breaker և դիմակայունություն
- Իմաստային cache, idempotency և առաջընթացի հետևում
- Տվյալների բազայի գործողություններ և schema (DB-ի 21 մոդուլ)
- OAuth հոսքեր և նույնականացում
- API endpoint-ների վավերացում (Zod v4)
- MCP սերվերի գործիքներ և scope-ի պարտադրում
- Memory և Skills համակարգեր

---

## Կոդի ոճ

- **ESLint** — Նախքան commit կատարելը գործարկեք `npm run lint`
- **Prettier** — Commit-ի ժամանակ ավտոմատ ձևաչափվում է `lint-staged`-ի միջոցով (2 բացատ, կետ-ստորակետեր, կրկնակի չակերտներ, տողի առավելագույն լայնությունը՝ 100 նիշ, es5 վերջնաստորակետեր)
- **TypeScript** — `src/`-ի ամբողջ կոդն օգտագործում է `.ts`/`.tsx`, իսկ `open-sse/`-ն օգտագործում է `.ts`/`.js`; փաստաթղթավորեք TSDoc-ով (`@param`, `@returns`, `@throws`)
- **Առանց `eval()`-ի** — ESLint-ը պարտադրում է `no-eval`, `no-implied-eval`, `no-new-func`
- **Zod վավերացում** — API-ի բոլոր մուտքային տվյալների վավերացման համար օգտագործեք Zod v4 սխեմաներ
- **Անվանումներ**: Ֆայլեր = camelCase/kebab-case, բաղադրիչներ = PascalCase, հաստատուններ = UPPER_SNAKE

### Սխալների մշակում / դատարկ catch բլոկներ

Երբեք մի թողեք `catch`-ն առանց բացատրության։ Դասակարգեք այն հետևյալ երկու կատեգորիաներից մեկում (սա գործնականում կիրառում է «երբեք անաղմուկ մի անտեսեք SSE հոսքերի սխալները» խիստ կանոնը).

- **Դիտավորյալ (մեր սեփական՝ հնարավորության սահմաններում կատարվող մաքրում/հեռաչափություն)** — այստեղ ձախողումը սպասելի է և
  անվնաս է․ ավելացրեք հիմնավորման մեկտողանի մեկնաբանություն՝ առանց գրանցամատյանում գրառելու (յուրաքանչյուր հարցման ժամանակ գրանցումը հենց այն
  աղմուկն է, որից այս պայմանավորվածությունը խուսափում է)։

  ```ts
  } catch {} // հաճախորդի անջատումից հետո արդեն փակված controller-ը փակելու փորձը սպասելի է
  ```

- **Պետք է գրանցել (արտաքին/կանչող կողմի տրամադրած կոդ, կամ անտեսումը փոխում է կառավարման հոսքը)** — պահպանեք
  catch-ը (երբեք թույլ մի տվեք, որ այն խափանի հոսքը), բայց արտածեք համատեքստային `console.debug`/`warn`, որպեսզի
  ձախողումը հնարավոր լինի հայտնաբերել։

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure հետկանչի սխալ՝", e);
  }
  ```

Կիրառման օրինակների համար տե՛ս `open-sse/utils/stream.ts` և `open-sse/utils/streamHandler.ts`։

---

## Նախագծի կառուցվածքը

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Վահանակի էջեր (23 բաժին)
│   ├── api/                # API երթուղիներ (51 գրացուցակ)
│   └── login/              # Նույնականացման էջեր (.tsx)
├── domain/                 # Քաղաքականությունների շարժիչ (policyEngine, comboResolver, costRules և այլն)
├── lib/                    # Հիմնական բիզնես տրամաբանություն (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 արձանագրության սերվեր
│   ├── acp/                # Agent Communication Protocol ռեեստր
│   ├── compliance/         # Համապատասխանության քաղաքականությունների շարժիչ
│   ├── db/                 # SQLite տիրույթի մոդուլներ + 130 միգրացիա
│   ├── memory/             # Մշտական խոսակցական հիշողություն
│   ├── oauth/              # OAuth մատակարարներ, ծառայություններ և օգտակար գործիքներ
│   ├── skills/             # Ընդլայնվող հմտությունների շրջանակ
│   ├── usage/              # Օգտագործման հետևում և ծախսերի հաշվարկ
│   └── localDb.ts          # Միայն վերաարտահանման շերտ է՝ երբեք այստեղ տրամաբանություն մի ավելացրեք
├── middleware/              # Հարցումների միջնաշերտ (promptInjectionGuard)
├── mitm/                   # MITM միջնորդ սերվեր (վկայագիր, DNS, նպատակային երթուղավորում)
├── shared/
│   ├── components/         # React բաղադրիչներ (.tsx)
│   ├── constants/          # Մատակարարների սահմանումներ (329), MCP շրջանակներ, երթուղավորման 19 ռազմավարություն
│   ├── utils/              # Ավտոմատ անջատիչ, մաքրիչ, նույնականացման օժանդակ գործառույթներ
│   └── validation/         # Zod v4 սխեմաներ
└── sse/                    # SSE միջնորդավորման խողովակաշար

open-sse/                   # @omniroute/open-sse աշխատանքային տարածք
├── executors/              # Կատարիչների իրականացման 89 մոդուլ
├── handlers/               # Հարցումների 11 մշակիչ (զրույց, պատասխաններ, ներդրումներ, պատկերներ և այլն)
├── mcp-server/             # MCP սերվեր (110 եզակի գործիք, 3 փոխադրամիջոց, 33 շրջանակ)
├── services/               # Վերին մակարդակի 178 ծառայություն (combo, autoCombo, rateLimitManager և այլն)
├── translator/             # Ձևաչափերի փոխարկիչներ (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API փոխակերպիչ
└── utils/                  # 22 օգտակար մոդուլ (հոսք, TLS, միջնորդ սերվեր, գրանցում)

electron/                   # Electron աշխատասեղանի հավելված (բազմահարթակ)

tests/
├── unit/                   # Node.js թեստերի գործարկիչ (1,574 թեստային ֆայլ)
├── integration/            # Ինտեգրացիոն թեստեր
├── e2e/                    # Playwright թեստեր
├── security/               # Անվտանգության թեստեր
├── translator/             # Փոխարկիչին հատուկ թեստեր
└── load/                   # Բեռնվածության թեստեր

docs/
├── adr/                     # Ճարտարապետական որոշումների գրառումներ
├── architecture/            # Համակարգի ճարտարապետություն և դիմակայունություն
├── comparison/              # OmniRoute-ն այլընտրանքների համեմատ
├── compression/             # Սեղմման ուղեցույցներ և կանոններ
├── dev/                     # Մշակման ուղեցույցներ
├── diagrams/                # Ճարտարապետական գծապատկերներ
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # Օգտագործողի ուղեցույց, Docker, կարգավորում, անսարքությունների վերացում
├── i18n/                    # Միջազգայնացված README թարգմանություններ
├── marketing/               # Մարքեթինգային նյութեր
├── ops/                     # Տեղակայում, միջնորդ սերվեր, ծածկույթ, թողարկումներ
├── providers/               # Մատակարարներին հատուկ փաստաթղթեր
├── reference/               # API տեղեկատու, միջավայրի փոփոխականներ, CLI գործիքներ, անվճար մակարդակներ
├── releases/                # Թողարկումների նշումներ
├── routing/                 # Ավտոմատ համակցման շարժիչ, դատողության վերարտադրում
├── screenshots/             # Վահանակի սքրինշոթներ
├── security/                # Պաշտպանիչ սահմանափակումներ, համապատասխանություն, գաղտնիություն, նշաններ
└── specs/                   # Նախագծման տեխնիկական բնութագրեր
```

---

## Նոր պրովայդերի ավելացում

### Քայլ 1․ Գրանցեք պրովայդերի հաստատունները

Ավելացրեք `src/shared/constants/providers.ts`-ում․ մոդուլի բեռնման ժամանակ վավերացվում է Zod-ով։

### Քայլ 2․ Ավելացրեք կատարիչ (եթե անհրաժեշտ է հատուկ տրամաբանություն)

Ստեղծեք հիմնական կատարիչը ընդլայնող կատարիչ `open-sse/executors/your-provider.ts`-ում։

### Քայլ 3․ Ավելացրեք փոխակերպիչ (եթե ձևաչափը OpenAI չէ)

Ստեղծեք հարցման/պատասխանի փոխակերպիչներ `open-sse/translator/`-ում։

### Քայլ 4․ Ավելացրեք OAuth-ի կազմաձևում (եթե հիմնված է OAuth-ի վրա)

Ավելացրեք OAuth-ի հավատարմագրերը `src/lib/oauth/constants/oauth.ts`-ում, իսկ ծառայությունը՝ `src/lib/oauth/services/`-ում։

Եթե վերին հոսքի պրովայդերն իր հանրային CLI / դիտարկիչի փաթեթի ներսում տարածում է հանրային OAuth client_id/secret կամ Firebase Web API բանալի, **մի՛** ներդրեք այն որպես տողային լիտերալ։ Օգտագործեք `resolvePublicCred()`-ը՝ `open-sse/utils/publicCreds.ts`-ից, և `EMBEDDED_DEFAULTS`-ում ավելացրեք քողարկված բայթային գրառում։ Ամբողջ պարտադիր աշխատանքային ընթացքը փաստաթղթավորված է [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)-ում։

Մշակիչների/կատարիչների ներսում հաճախորդին հասնող սխալի հաղորդագրությունները պետք է անցնեն `buildErrorBody()` / `sanitizeErrorMessage()` ֆունկցիաներով՝ `open-sse/utils/error.ts`-ից․ երբեք չտեղադրեք չմշակված `err.stack` կամ `err.message` Response-ի մարմնում։ Տե՛ս [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md)։

### Քայլ 5․ Գրանցեք մոդելները

Ավելացրեք մոդելների սահմանումները `open-sse/config/providerRegistry.ts`-ում։

### Քայլ 6․ Ավելացրեք թեստեր

Գրեք միավորային թեստեր `tests/unit/`-ում՝ առնվազն ընդգրկելով՝

- Պրովայդերի գրանցումը
- Հարցման/պատասխանի փոխակերպումը
- Սխալների մշակումը

---

## Pull Request-ի ստուգացանկ

- [ ] Թեստերը հաջողությամբ անցնում են (`npm test`)
- [ ] Լինթինգն հաջողությամբ անցնում է (`npm run lint`)
- [ ] Կառուցումը հաջողվում է (`npm run build`)
- [ ] Նոր հանրային ֆունկցիաների և ինտերֆեյսների համար ավելացվել են TypeScript տիպեր
- [ ] Չկան կոդում ուղղակիորեն գրված գաղտնիքներ կամ պահուստային արժեքներ
- [ ] Վերին հոսքի հանրային հավատարմագրերը ներդրված են `resolvePublicCred()`-ի միջոցով (տե՛ս [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), և երբեք՝ որպես լիտերալներ
- [ ] Սխալի պատասխաններն անցնում են `buildErrorBody()` / `sanitizeErrorMessage()` ֆունկցիաներով՝ պատասխանների մարմիններում առանց չմշակված սթեքի հետագծերի (տե՛ս [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Shell հրամանները (`exec` / `spawn`) կատարման ժամանակի արժեքները փոխանցում են `env`-ի միջոցով, այլ ոչ թե տողային ինտերպոլացիայով
- [ ] Բոլոր մուտքային տվյալները վավերացվում են Zod սխեմաներով
- [ ] Օգտատիրոջը տեսանելի փոփոխությունների համար փոփոխությունների մատյանի **ֆրագմենտ** է ավելացվել `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md`-ում (տե՛ս [`changelog.d/README.md`](./changelog.d/README.md)) — **մի՛** խմբագրեք `CHANGELOG.md`-ն ուղղակիորեն․ ֆրագմենտները միավորվում են թողարկման ժամանակ և երբեք հակասություններ չեն առաջացնում PR-ների միջև
- [ ] Փաստաթղթերը թարմացվել են (եթե կիրառելի է)
- [ ] Չեն բացվել CodeQL / Secret-Scanning-ի նոր ահազանգեր, կամ յուրաքանչյուրն անտեսվել է տեխնիկական հիմնավորմամբ՝ համապատասխան `docs/security/` փաստաթղթին հղումով
- [ ] Դուստր գործընթացներ գործարկող երթուղիները (`/api/mcp/`, `/api/cli-tools/runtime/`) դասակարգված են որպես `isLocalOnlyPath()`՝ `src/server/authz/routeGuard.ts`-ում — տե՛ս [Խիստ կանոն #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Commit-ի հաղորդագրություններում չկան `Co-Authored-By` վերջնագրեր․ commit-ները պետք է ներկայացվեն բացառապես պահոցի սեփականատիրոջ Git ինքնության ներքո (Խիստ կանոն #16)

---

## Թողարկումներ

Թողարկումները կառավարվում են `/generate-release` աշխատանքային հոսքի միջոցով։ Երբ ստեղծվում է նոր GitHub Release, փաթեթը GitHub Actions-ի միջոցով **ավտոմատ հրապարակվում է npm-ում**։

VPS-ում տեղակայելու համար օգտագործեք `npm run build:release` (`npm run build`-ի փոխարեն)․ այն կատարում է մաքուր
վերակառուցում, փաթեթը հավաքում է `dist/`-ում և ստեղծում `dist/BUILD_SHA` ստուգիչ ֆայլը։
Այնուհետև օգտագործեք `/deploy-vps-*-cc` հմտությունները, որոնք rsync-ի միջոցով `dist/`-ը համաժամացնում են հեռակա `app/` պանակի հետ։

---

## Օգնություն ստանալը

- **Ճարտարապետություն**: Տե՛ս [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **API տեղեկատու**: Տե՛ս [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Անվտանգության փաստաթղթեր**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Շահագործման փաստաթղթեր**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Խնդիրներ**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADR-ներ**: Ճարտարապետական որոշումների գրառումների համար տե՛ս `docs/adr/`
