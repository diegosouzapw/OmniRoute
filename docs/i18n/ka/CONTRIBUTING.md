# Contributing to OmniRoute (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

გმადლობთ კონტრიბუციით დაინტერესებისთვის! ეს სახელმძღვანელო მოიცავს ყველაფერს, რაც დასაწყებად გჭირდებათ.

თითოეული ცვლილებისთვის განსაზღვრული ოფიციალური სამუშაო პროცესის გასაცნობად დაიწყეთ
[კონტრიბუციის ძირითადი გზით](docs/ops/CONTRIBUTION_GOLDEN_PATH.md). ის პროვაიდერის, მარშრუტიზაციის,
UI/UX-ის, i18n-ის, CLI-ის, მონაცემთა ბაზისა და აგების/განთავსების ცვლილებებს აკავშირებს მათ კონტრაქტებთან, მიზნობრივ ტესტებთან, CI-ის
დაფარვასა და შეჯერების ეტაპებთან.

---

## დეველოპმენტის გარემოს გამართვა

### წინაპირობები

- **Node.js** `>=22.22.3 <23`, ან `>=24.0.0 <27` (რეკომენდებულია: 24 LTS)
- **npm** 10+

> **npm v11+-ის მომხმარებლები (Node 24+):** `npm install`-ის შემდეგ გადაამოწმეთ, რომ ნატიური მოდულები დაინსტალირდა:
> `node -e "require('better-sqlite3')"`. თუ ის `MODULE_NOT_FOUND` შეცდომით დასრულდება,
> გაუშვით `npm approve-scripts better-sqlite3 && npm install`. იხილეთ
> [პრობლემების მოგვარება](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### კლონირება და ინსტალაცია

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### გარემოს ცვლადები

```bash
# შექმენით თქვენი .env შაბლონიდან
cp .env.example .env

# დააგენერირეთ საჭირო საიდუმლო მნიშვნელობები
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

დეველოპმენტისთვის მნიშვნელოვანი ცვლადები:

| ცვლადი                 | დეველოპმენტის ნაგულისხმევი მნიშვნელობა | აღწერა                     |
| ---------------------- | -------------------------------------- | -------------------------- |
| `PORT`                 | `20128`                                | სერვერის პორტი             |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`               | ფრონტენდის საბაზისო URL    |
| `JWT_SECRET`           | (დააგენერირეთ ზემოთ)                   | JWT-ის ხელმოწერის საიდუმლო |
| `INITIAL_PASSWORD`     | `CHANGEME`                             | პირველი შესვლის პაროლი     |
| `APP_LOG_LEVEL`        | `info`                                 | ჟურნალის დეტალიზაციის დონე |

### მართვის პანელის პარამეტრები

მართვის პანელი გთავაზობთ UI გადამრთველებს იმ ფუნქციებისთვის, რომელთა კონფიგურაციაც გარემოს ცვლადებით არის შესაძლებელი:

| პარამეტრის მდებარეობა      | გადამრთველი              | აღწერა                                       |
| -------------------------- | ------------------------ | -------------------------------------------- |
| პარამეტრები → გაფართოებული | გამართვის რეჟიმი         | გამართვის მოთხოვნების ჟურნალების ჩართვა (UI) |
| პარამეტრები → ზოგადი       | გვერდითი ზოლის ხილვადობა | გვერდითი ზოლის სექციების ჩვენება/დამალვა     |

ეს პარამეტრები მონაცემთა ბაზაში ინახება და ხელახლა გაშვების შემდეგაც ნარჩუნდება; დაყენებისას ისინი გარემოს ცვლადების ნაგულისხმევ მნიშვნელობებს ანაცვლებს.

### ლოკალურად გაშვება

```bash
# დეველოპმენტის რეჟიმი (ცხელი გადატვირთვა)
npm run dev

# საწარმოო აგება
npm run build    # next build → .build/next/, შემდეგ assembleStandalone → dist/
npm run start

# სწრაფი, მხოლოდ ბეკენდის/API-ის კომპილაცია კონტრიბუტორის ცვლილებებისთვის
npm run build:contributor

# რელიზის აგება (სუფთა ხელახალი აგება + HEAD sentinel — აუცილებელია განთავსებისთვის)
npm run build:release   # rm -rf .build dist && აგება + წერს dist/BUILD_SHA-ს

# პორტის გავრცელებული კონფიგურაცია
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

კონტრიბუტორის აგება მხოლოდ კომპილაციის ვალიდაციას ასრულებს: ის არ აწყობს დამოუკიდებელ
დისტრიბუციას და არ აგებს არჩევით ნატიურ დაფასოებით რესურსებს. გამოიყენეთ ჩვეულებრივი საწარმოო აგება, როდესაც
გასავრცელებლად მზა პაკეტის ვალიდაცია გჭირდებათ.

### აგების შედეგების განლაგება

| დირექტორია | შიგთავსი                                                                         | კონტროლდება |
| ---------- | -------------------------------------------------------------------------------- | ----------- |
| `src/`     | აპლიკაციის საწყისი კოდი (TypeScript / TSX)                                       | დიახ        |
| `.build/`  | შუალედური ფაილები — `next build`-ის შედეგი (gitignored, `distDir = .build/next`) | არა         |
| `dist/`    | გასავრცელებლად მზა პაკეტი — აწყობილია `assembleStandalone`-ის მიერ (gitignored)  | არა         |

აგების კონვეიერი ერთ გავლას იყენებს:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js-ის შედეგი)
  └─ assembleStandalone()                 (აკოპირებს standalone + static + public + ნატიურ რესურსებს)
       └─ შედეგი: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` დამატებით ჯერ ორივე დირექტორიას ასუფთავებს და
განთავსების მთლიანობის sentinel-ის სახით წერს `dist/BUILD_SHA`-ს (= `git rev-parse --short HEAD`).

`npm run build:contributor` მხოლოდ ბეკენდის აგების პროფილს იყენებს. აგებისას ის დროებით ანაცვლებს
მართვის პანელის UI ფაილებს დროებითი ჩანაცვლებებით, ინარჩუნებს API მარშრუტების დამმუშავებლებს და აგების შემდეგ აღადგენს თავდაპირველ ფაილებს.
გამოიყენეთ `npm run build` იმ ცვლილებებისთვის, რომლებიც გავლენას ახდენს მართვის პანელის UI-ზე, ან რელიზის სრული
ვალიდაციისთვის; კონტრიბუტორის პროფილი რელიზის აგებას არ ანაცვლებს.

> **VPS-ზე განთავსების შენიშვნა:** დისტანციური იმიჯის დირექტორია `/usr/lib/node_modules/omniroute/app/`
> უცვლელია. განთავსების უნარები `dist/`-ის შიგთავსს მასში rsync-ით ასინქრონებს.
> შეიცვალა მხოლოდ რეპოზიტორიაში არსებული აგების შედეგის გზა (`app/` → `dist/`).

ნაგულისხმევი URL-ები:

- **მართვის პანელი**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git-ის სამუშაო პროცესი

> ⚠️ **არასოდეს შეიტანოთ commit პირდაპირ `main`-ში.** ყოველთვის გამოიყენეთ ფუნქციური განშტოებები.
>
> **PR-ის საბაზისო განშტოება:** სამიზნედ მიუთითეთ აქტიური `release/vX.Y.Z` განშტოება (და არა `main`). თითო გამოშვებაზე ცალკე განშტოებისა და გამოშვებისას ტეგის შექმნის მოდელის შესახებ იხილეთ
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md).

```bash
# შექმენით განშტოება აქტიური გამოშვების ბოლო წერტილიდან (მაგალითად: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... შეიტანეთ ცვლილებები ...
git commit -m "feat: აღწერეთ თქვენი ცვლილება"
git push -u origin feat/your-feature-name
# გახსენით Pull Request, სადაც base = release/v3.8.49
```

### განშტოებების დასახელება

| პრეფიქსი    | დანიშნულება                         |
| ----------- | ----------------------------------- |
| `feat/`     | ახალი ფუნქციები                     |
| `fix/`      | შეცდომების გამოსწორება              |
| `refactor/` | კოდის რესტრუქტურიზაცია              |
| `docs/`     | დოკუმენტაციის ცვლილებები            |
| `test/`     | ტესტების დამატება/შესწორება         |
| `chore/`    | ინსტრუმენტები, CI, დამოკიდებულებები |

### Commit-შეტყობინებები

დაიცავით [Conventional Commits](https://www.conventionalcommits.org/)-ის წესები:

```
feat: პროვაიდერის გამოძახებებისთვის circuit breaker-ის დამატება
fix: JWT საიდუმლოს ვალიდაციის განსაკუთრებული შემთხვევის მოგვარება
docs: SECURITY.md-ის განახლება PII-ის დაცვით
test: დაკვირვებადობის მოდულური ტესტების დამატება
refactor(db): სიხშირის შეზღუდვის ცხრილების გაერთიანება
```

არეები (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## ტესტების გაშვება

```bash
# ყველა ტესტი (unit + vitest + ecosystem + e2e)
npm run test:all

# ერთი სატესტო ფაილი (Node.js-ის ჩაშენებული ტესტების გამშვები — ტესტების უმეტესობა ამას იყენებს)
node --import tsx/esm --test tests/unit/your-file.test.ts

# მხოლოდ თქვენი ცვლილებით დაზარალებული მოდულური ტესტები (იგივე TIA სელექტორი, რაც CI ბარიერში, #8084)
npm run test:scoped            # ბოლო commit-ში (ან სამუშაო ხეში) შეტანილი ცვლილებები
npm run test:scoped:staged     # მხოლოდ staged ცვლილებები — კარგად ერწყმის pre-commit გაშვებას
npm run test:scoped:full       # ჯერ ხელახლა ააგეთ import-graph რუკა (ფაილების დამატების/გადაადგილების შემდეგ)
# Exit 1 + "run the full suite" ნიშნავს, რომ შეიცვალა ცენტრალური ფაილი (tsconfig, package.json, …) ან
# რუკაზე არარსებული საწყისი კოდი — სელექტორი უსაფრთხოდ ასრულებს მუშაობას შეცდომით და არასოდეს გამოტოვებს ტესტებს შეუმჩნევლად.

# Vitest (MCP სერვერი, autoCombo, cache)
npm run test:vitest

# E2E ტესტები (საჭიროებს Playwright-ს)
npm run test:e2e

# პროტოკოლის კლიენტების E2E (MCP ტრანსპორტები, A2A)
npm run test:protocols:e2e

# ეკოსისტემასთან თავსებადობის ტესტები
npm run test:ecosystem

# დაფარვის ბარიერი: დებულებების/სტრიქონების/ფუნქციების/განშტოებების 60%
npm run test:coverage
npm run coverage:report

# Lint + ფორმატირების შემოწმება
npm run lint
npm run check

# ბარიერით დაცული რეალურ upstream-ზე combo-ს smoke-ტესტი (საჭიროებს VPS-ზე წვდომას + რეალური პროვაიდერის კრედიტებს)
# მიმართავს რეალურ პროვაიდერებს — მცირე ხარჯთანაა დაკავშირებული. არასოდეს ეშვება CI-ში. ბარიერის გარეშე უპრობლემოდ გამოიტოვება.
# საჭიროა: ssh root@192.168.0.15 წვდომა (VPS-იდან იყენებს DB-ის მხოლოდ წაკითხვად snapshot-ს).
RUN_COMBO_LIVE=1 npm run test:combo:live

# მე-3 ფაზის VPS-ის ცოცხალი smoke-ტესტი — ჩვეულებრივი Node ESM სკრიპტები, რომლებიც პირდაპირ ცოცხალ .15 სერვერს მიმართავენ.
# საჭიროა: ssh root@192.168.0.15 წვდომა (combo-ები იქმნება/იშლება SSH sqlite-ის მეშვეობით).
# მიმართავს რეალურ პროვაიდერებს (მცირე ხარჯი). ქმნის/შლის მხოლოდ __live_test__* combo-ებს. არასოდეს ეშვება CI-ში.
# .15-ზე REQUIRE_API_KEY=false, ამიტომ API გასაღები საჭირო არ არის, თუმცა დაყენების შემთხვევაში ითვალისწინებს COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY-ს.
npm run test:combo:live:vps              # 7 HTTP სცენარი (priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # ამატებს პროვაიდერებს შორის რეალურ failover სცენარს (სულ 8)
```

დაფარვის შენიშვნები:

- `npm run test:coverage` ზომავს საწყისი კოდის დაფარვას ძირითადი მოდულური ტესტების ნაკრებისთვის, გამორიცხავს `tests/**`-ს და მოიცავს `open-sse/**`-ს
- Pull Request-ებმა დებულებების/სტრიქონების/ფუნქციების/განშტოებების დაფარვის ბარიერი **60%+**-ზე უნდა შეინარჩუნონ
- თუ PR ცვლის საწარმოო კოდს `src/`, `open-sse/`, `electron/` ან `bin/`-ში, იმავე PR-ში უნდა დაემატოს ან განახლდეს ავტომატიზებული ტესტები
- `npm run coverage:report` ბეჭდავს ბოლო დაფარვის გაშვების დეტალურ, ფაილების მიხედვით დაყოფილ ანგარიშს
- `npm run test:coverage:legacy` ისტორიული შედარებისთვის ინარჩუნებს ძველ მეტრიკას
- დაფარვის ეტაპობრივი გაუმჯობესების სამოქმედო გეგმისთვის იხილეთ `docs/ops/COVERAGE_PLAN.md`

### Pull Request-ის მოთხოვნები

PR-ის გახსნამდე გამოიყენეთ
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md), რათა თქვენი
ცვლილებისთვის მიზნობრივი ციკლი გაუშვათ. მოდულური ტესტების სრული ნაკრები (CI-ის 4 shard), Vitest, **60%+** დაფარვის ბარიერი და
საწარმოო build CI-ის პასუხისმგებლობაა — მათი ლოკალურად გაშვება არ იძლევა დამატებით ინფორმაციას, რომელსაც PR-ის
შემოწმებები უკვე არ მოგაწვდით, ხოლო შედარებით სუსტ კომპიუტერებზე შეიძლება სისტემა სრულად დატვირთოს (#8084):

- გაუშვით სატესტო ფაილები, რომლებიც თქვენს ცვლილებას ფარავს: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- გაუშვით `npm run lint`
- საწარმოო კოდის ცვლილებისას იმავე PR-ში დაამატეთ ან განაახლეთ ავტომატიზებული ტესტები
- საწარმოო კოდის ცვლილებისას PR-ის აღწერაში მიუთითეთ შეცვლილი ან დამატებული სატესტო ფაილები
- თუ პროექტის საიდუმლოები CI-ში კონფიგურირებულია, შეამოწმეთ PR-ის SonarQube შედეგი

ტესტების მიმდინარე სტატუსი: **122 მოდულური სატესტო ფაილი**, რომლებიც ფარავს:

- პროვაიდერის ტრანსლატორებსა და ფორმატის გარდაქმნას
- სიხშირის შეზღუდვას, circuit breaker-სა და მდგრადობას
- სემანტიკურ cache-ს, idempotency-სა და პროგრესის თვალყურის დევნებას
- მონაცემთა ბაზის ოპერაციებსა და სქემას (21 DB მოდული)
- OAuth ნაკადებსა და ავთენტიფიკაციას
- API endpoint-ების ვალიდაციას (Zod v4)
- MCP სერვერის ინსტრუმენტებსა და არეების აღსრულებას
- Memory და Skills სისტემებს

---

## კოდის სტილი

- **ESLint** — კომიტამდე გაუშვით `npm run lint`
- **Prettier** — კომიტისას ავტომატურად ფორმატირდება `lint-staged`-ის მეშვეობით (2 სივრცე, წერტილ-მძიმეები, ორმაგი ბრჭყალები, 100-სიმბოლოიანი სიგანე, es5-ის სტილის ბოლო მძიმეები)
- **TypeScript** — `src/`-ში არსებული ყველა კოდი იყენებს `.ts`/`.tsx`-ს; `open-sse/` იყენებს `.ts`/`.js`-ს; დოკუმენტირება მოახდინეთ TSDoc-ით (`@param`, `@returns`, `@throws`)
- **`eval()` აკრძალულია** — ESLint უზრუნველყოფს `no-eval`, `no-implied-eval`, `no-new-func` წესების დაცვას
- **Zod-ით ვალიდაცია** — API-ის ყველა შეყვანის ვალიდაციისთვის გამოიყენეთ Zod v4-ის სქემები
- **დასახელება**: ფაილები = camelCase/kebab-case, კომპონენტები = PascalCase, კონსტანტები = UPPER_SNAKE

### შეცდომების დამუშავება / ცარიელი catch ბლოკები

არასოდეს დატოვოთ `catch` განმარტების გარეშე. მიაკუთვნეთ ის ორი კატეგორიიდან ერთ-ერთს (ეს პრაქტიკაში ახორციელებს მკაცრ წესს — „არასოდეს ჩაყლაპოთ შეცდომები უხმოდ SSE ნაკადებში“):

- **განზრახული (ჩვენივე მაქსიმალური ძალისხმევით შესრულებული გასუფთავება/ტელემეტრია)** — აქ შეცდომა მოსალოდნელი და უვნებელია; დაამატეთ მიზეზის განმარტების ერთსტრიქონიანი კომენტარი, ლოგირების გარეშე (ეს შეთანხმება თავიდან გვაცილებს ყოველ მოთხოვნაზე ლოგირებით წარმოქმნილ ხმაურს).

  ```ts
  } catch {} // კლიენტის გათიშვის შემდეგ უკვე დახურული კონტროლერის დახურვა მოსალოდნელია
  ```

- **უნდა დალოგირდეს (გარე/გამომძახებლის მიერ მოწოდებული კოდი, ან ჩაყლაპვა ცვლის მართვის ნაკადს)** — შეინარჩუნეთ catch (არასოდეს მისცეთ მას ნაკადის დარღვევის უფლება), მაგრამ გამოიტანეთ კონტექსტური `console.debug`/`warn`, რათა შეცდომის აღმოჩენა შესაძლებელი იყოს.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure უკუგამოძახების შეცდომა:", e);
  }
  ```

პრაქტიკაში გამოყენებული მაგალითებისთვის იხილეთ `open-sse/utils/stream.ts` და `open-sse/utils/streamHandler.ts`.

---

## პროექტის სტრუქტურა

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # მართვის პანელის გვერდები (23 სექცია)
│   ├── api/                # API მარშრუტები (51 დირექტორია)
│   └── login/              # ავთენტიფიკაციის გვერდები (.tsx)
├── domain/                 # პოლიტიკების ძრავა (policyEngine, comboResolver, costRules და სხვ.)
├── lib/                    # ძირითადი ბიზნესლოგიკა (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 პროტოკოლის სერვერი
│   ├── acp/                # Agent Communication Protocol-ის რეესტრი
│   ├── compliance/         # შესაბამისობის პოლიტიკების ძრავა
│   ├── db/                 # SQLite დომენის მოდულები + 130 მიგრაცია
│   ├── memory/             # მუდმივი სასაუბრო მეხსიერება
│   ├── oauth/              # OAuth-ის მომწოდებლები, სერვისები და დამხმარე საშუალებები
│   ├── skills/             # გაფართოებადი უნარების ფრეიმვორკი
│   ├── usage/              # გამოყენების აღრიცხვა და ღირებულების გამოთვლა
│   └── localDb.ts          # მხოლოდ რეექსპორტის ფენა — აქ ლოგიკა არასოდეს დაამატოთ
├── middleware/              # მოთხოვნების შუალედური პროგრამული უზრუნველყოფა (promptInjectionGuard)
├── mitm/                   # MITM პროქსი (სერტიფიკატი, DNS, სამიზნის მარშრუტიზაცია)
├── shared/
│   ├── components/         # React კომპონენტები (.tsx)
│   ├── constants/          # მომწოდებლების განსაზღვრებები (329), MCP-ის ფარგლები, მარშრუტიზაციის 19 სტრატეგია
│   ├── utils/              # ავტომატური ამომრთველი, სანიტაიზერი, ავთენტიფიკაციის დამხმარე საშუალებები
│   └── validation/         # Zod v4 სქემები
└── sse/                    # SSE პროქსირების კონვეიერი

open-sse/                   # @omniroute/open-sse სამუშაო სივრცე
├── executors/              # შემსრულებლის იმპლემენტაციის 89 მოდული
├── handlers/               # მოთხოვნების 11 დამმუშავებელი (ჩატი, პასუხები, ემბედინგები, სურათები და სხვ.)
├── mcp-server/             # MCP სერვერი (110 უნიკალური ხელსაწყო, 3 ტრანსპორტი, 33 მოქმედების სფერო)
├── services/               # ზედა დონის 178 სერვისი (combo, autoCombo, rateLimitManager და სხვ.)
├── translator/             # ფორმატების გარდამქმნელები (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API-ის გარდამქმნელი
└── utils/                  # 22 დამხმარე მოდული (ნაკადი, TLS, პროქსი, ლოგირება)

electron/                   # Electron-ის დესკტოპ-აპლიკაცია (მრავალპლატფორმული)

tests/
├── unit/                   # Node.js ტესტების გამშვები (1,574 სატესტო ფაილი)
├── integration/            # ინტეგრაციული ტესტები
├── e2e/                    # Playwright-ის ტესტები
├── security/               # უსაფრთხოების ტესტები
├── translator/             # გარდამქმნელისთვის სპეციფიკური ტესტები
└── load/                   # დატვირთვის ტესტები

docs/
├── adr/                     # არქიტექტურული გადაწყვეტილებების ჩანაწერები
├── architecture/            # სისტემის არქიტექტურა და მდგრადობა
├── comparison/              # OmniRoute ალტერნატივებთან შედარებით
├── compression/             # შეკუმშვის სახელმძღვანელოები და წესები
├── dev/                     # დეველოპმენტის სახელმძღვანელოები
├── diagrams/                # არქიტექტურული დიაგრამები
├── frameworks/              # MCP, A2A, OpenCode, მეხსიერება, უნარები
├── guides/                  # მომხმარებლის სახელმძღვანელო, Docker, გამართვა, პრობლემების მოგვარება
├── i18n/                    # README-ის ინტერნაციონალიზებული თარგმანები
├── marketing/               # მარკეტინგული მასალები
├── ops/                     # განთავსება, პროქსი, დაფარვა, გამოშვებები
├── providers/               # მომწოდებლებისთვის სპეციფიკური დოკუმენტაცია
├── reference/               # API ცნობარი, გარემოს ცვლადები, CLI ხელსაწყოები, უფასო დონეები
├── releases/                # გამოშვების შენიშვნები
├── routing/                 # ავტომატური კომბინაციების ძრავა, მსჯელობის განმეორებითი შესრულება
├── screenshots/             # მართვის პანელის ეკრანის ანაბეჭდები
├── security/                # დამცავი მექანიზმები, შესაბამისობა, ფარულობა, ტოკენები
└── specs/                   # დიზაინის სპეციფიკაციები
```

---

## ახალი პროვაიდერის დამატება

### ნაბიჯი 1: პროვაიდერის კონსტანტების რეგისტრაცია

დაამატეთ `src/shared/constants/providers.ts`-ში — მოდულის ჩატვირთვისას მოწმდება Zod-ის მეშვეობით.

### ნაბიჯი 2: შემსრულებლის დამატება (თუ საჭიროა მორგებული ლოგიკა)

შექმენით შემსრულებელი `open-sse/executors/your-provider.ts`-ში, რომელიც საბაზო შემსრულებელს გააფართოებს.

### ნაბიჯი 3: ტრანსლატორის დამატება (თუ ფორმატი OpenAI-ის არ არის)

შექმენით მოთხოვნის/პასუხის ტრანსლატორები `open-sse/translator/`-ში.

### ნაბიჯი 4: OAuth-ის კონფიგურაციის დამატება (თუ OAuth-ზეა დაფუძნებული)

დაამატეთ OAuth-ის ავტორიზაციის მონაცემები `src/lib/oauth/constants/oauth.ts`-ში, ხოლო სერვისი — `src/lib/oauth/services/`-ში.

თუ ზედა დონის პროვაიდერი საჯარო OAuth `client_id`/საიდუმლოს ან Firebase Web API გასაღებს თავის საჯარო CLI-ში / ბრაუზერის პაკეტში ავრცელებს, **არ** ჩასვათ ის სტრიქონულ ლიტერალად. გამოიყენეთ `resolvePublicCred()` ფაილიდან `open-sse/utils/publicCreds.ts` და დაამატეთ შენიღბული ბაიტური ჩანაწერი `EMBEDDED_DEFAULTS`-ში. სრული სავალდებულო სამუშაო პროცესი აღწერილია [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)-ში.

დამმუშავებლებსა/შემსრულებლებში კლიენტამდე მისული შეცდომის შეტყობინებები უნდა დამუშავდეს `buildErrorBody()` / `sanitizeErrorMessage()` ფუნქციებით ფაილიდან `open-sse/utils/error.ts` — არასოდეს ჩასვათ დაუმუშავებელი `err.stack` ან `err.message` Response-ის სხეულში. იხილეთ [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### ნაბიჯი 5: მოდელების რეგისტრაცია

დაამატეთ მოდელების განსაზღვრებები `open-sse/config/providerRegistry.ts`-ში.

### ნაბიჯი 6: ტესტების დამატება

დაწერეთ ერთეულოვანი ტესტები `tests/unit/`-ში, რომლებიც მინიმუმ შემდეგს მოიცავს:

- პროვაიდერის რეგისტრაცია
- მოთხოვნის/პასუხის ტრანსლაცია
- შეცდომების დამუშავება

---

## Pull Request-ის საკონტროლო სია

- [ ] ტესტები წარმატებით სრულდება (`npm test`)
- [ ] ლინტინგი წარმატებით სრულდება (`npm run lint`)
- [ ] აგება წარმატებით სრულდება (`npm run build`)
- [ ] ახალი საჯარო ფუნქციებისა და ინტერფეისებისთვის დამატებულია TypeScript-ის ტიპები
- [ ] არ არის მყარად გაწერილი საიდუმლოები ან სარეზერვო მნიშვნელობები
- [ ] ზედა დონის საჯარო ავტორიზაციის მონაცემები ჩაშენებულია `resolvePublicCred()`-ის მეშვეობით (იხილეთ [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)) და არასოდეს — ლიტერალების სახით
- [ ] შეცდომის პასუხები მუშავდება `buildErrorBody()` / `sanitizeErrorMessage()`-ის მეშვეობით — პასუხის სხეულებში არ არის დაუმუშავებელი სტეკის კვალები (იხილეთ [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] გარსის ბრძანებები (`exec` / `spawn`) შესრულების დროის მნიშვნელობებს გადასცემს `env`-ის მეშვეობით და არა სტრიქონული ინტერპოლაციით
- [ ] ყველა შეყვანილი მონაცემი შემოწმებულია Zod-ის სქემებით
- [ ] მომხმარებლისთვის ხილული ცვლილებებისთვის ცვლილებების ჟურნალის **ფრაგმენტი** დამატებულია `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md`-ში (იხილეთ [`changelog.d/README.md`](./changelog.d/README.md)) — **არ** დაარედაქტიროთ `CHANGELOG.md` პირდაპირ; ფრაგმენტები გაერთიანდება გამოშვებისას და Pull Request-ებს შორის კონფლიქტს არასოდეს წარმოქმნის
- [ ] დოკუმენტაცია განახლებულია (თუ საჭიროა)
- [ ] არ არის გახსნილი CodeQL-ის / Secret-Scanning-ის ახალი გაფრთხილებები, ან თითოეული მათგანი უარყოფილია ტექნიკური დასაბუთებით, რომელიც შესაბამის `docs/security/` დოკუმენტს მიუთითებს
- [ ] მარშრუტები, რომლებიც შვილობილ პროცესებს უშვებს (`/api/mcp/`, `/api/cli-tools/runtime/`), კლასიფიცირებულია როგორც `isLocalOnlyPath()` ფაილში `src/server/authz/routeGuard.ts` — იხილეთ [მკაცრი წესი #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] commit-ის შეტყობინებებში არ არის `Co-Authored-By` ტრეილერები — commit-ები მხოლოდ რეპოზიტორიის მფლობელის Git-ის იდენტობის ქვეშ უნდა გამოჩნდეს (მკაცრი წესი #16)

---

## რელიზების გამოშვება

რელიზები იმართება `/generate-release` სამუშაო პროცესის მეშვეობით. ახალი GitHub Release-ის შექმნისას პაკეტი GitHub Actions-ის მეშვეობით **ავტომატურად ქვეყნდება npm-ზე**.

VPS-ზე განთავსებისთვის გამოიყენეთ `npm run build:release` (`npm run build`-ის ნაცვლად) — ის ასრულებს
სუფთა ხელახალ აგებას, კრებს პაკეტს `dist/`-ში და ქმნის `dist/BUILD_SHA` საკონტროლო ფაილს.
შემდეგ გამოიყენეთ `/deploy-vps-*-cc` უნარები, რომლებიც rsync-ის მეშვეობით `dist/`-ს დისტანციურ `app/` დირექტორიაში ასინქრონებენ.

---

## დახმარების მიღება

- **არქიტექტურა**: იხილეთ [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **API-ის ცნობარი**: იხილეთ [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **უსაფრთხოების დოკუმენტაცია**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **ოპერაციების დოკუმენტაცია**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **საკითხები**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADR-ები**: არქიტექტურული გადაწყვეტილებების ჩანაწერებისთვის იხილეთ `docs/adr/`
