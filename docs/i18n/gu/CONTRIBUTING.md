# Contributing to OmniRoute (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## ડેવલપમેન્ટ સેટઅપ

### પૂર્વજરૂરિયાતો

- **Node.js** `>=22.22.2 <23`, અથવા `>=24.0.0 <27` (ભલામણ કરેલ: 24 LTS)
- **npm** 10+

> **npm v11+ વપરાશકર્તાઓ (Node 24+):** `npm install` પછી, નેટિવ મોડ્યુલો ઇન્સ્ટોલ થયા છે કે નહીં તે ચકાસો:
> `node -e "require('better-sqlite3')"`. જો તે `MODULE_NOT_FOUND` સાથે નિષ્ફળ જાય,
> તો `npm approve-scripts better-sqlite3 && npm install` ચલાવો. જુઓ
> [સમસ્યાનિવારણ](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### ક્લોન અને ઇન્સ્ટોલ

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### એન્વાયર્નમેન્ટ વેરિએબલ્સ

```bash
# ટેમ્પલેટમાંથી તમારી .env ફાઇલ બનાવો
cp .env.example .env

# જરૂરી સિક્રેટ્સ જનરેટ કરો
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

ડેવલપમેન્ટ માટેનાં મુખ્ય વેરિએબલ્સ:

| વેરિએબલ                | ડેવલપમેન્ટ ડિફૉલ્ટ       | વર્ણન                     |
| ---------------------- | ------------------------ | ------------------------- |
| `PORT`                 | `20128`                  | સર્વર પોર્ટ               |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | ફ્રન્ટએન્ડ માટેનો બેઝ URL |
| `JWT_SECRET`           | (ઉપર જનરેટ કરો)          | JWT સાઇનિંગ સિક્રેટ       |
| `INITIAL_PASSWORD`     | `CHANGEME`               | પ્રથમ લૉગિનનો પાસવર્ડ     |
| `APP_LOG_LEVEL`        | `info`                   | લૉગની વિગતવારતાનું સ્તર   |

### ડૅશબોર્ડ સેટિંગ્સ

ડૅશબોર્ડ એવી સુવિધાઓ માટે UI ટૉગલ્સ પ્રદાન કરે છે જેને એન્વાયર્નમેન્ટ વેરિએબલ્સ દ્વારા પણ કન્ફિગર કરી શકાય છે:

| સેટિંગનું સ્થાન      | ટૉગલ            | વર્ણન                               |
| -------------------- | --------------- | ----------------------------------- |
| સેટિંગ્સ → ઍડવાન્સ્ડ | ડિબગ મોડ        | ડિબગ રિક્વેસ્ટ લૉગ્સ સક્ષમ કરો (UI) |
| સેટિંગ્સ → જનરલ      | સાઇડબાર દૃશ્યતા | સાઇડબાર વિભાગો બતાવો/છુપાવો         |

આ સેટિંગ્સ ડેટાબેઝમાં સંગ્રહિત થાય છે અને રીસ્ટાર્ટ પછી પણ જળવાઈ રહે છે. સેટ કરાયેલ હોય ત્યારે તેઓ env var ડિફૉલ્ટ્સને ઓવરરાઇડ કરે છે.

### લોકલી ચલાવવું

```bash
# ડેવલપમેન્ટ મોડ (હૉટ રીલોડ)
npm run dev

# પ્રોડક્શન બિલ્ડ
npm run build    # next build → .build/next/ પછી assembleStandalone → dist/
npm run start

# યોગદાનકર્તાના ફેરફારો માટે ઝડપી માત્ર-બૅકએન્ડ/API કમ્પાઇલ
npm run build:contributor

# રિલીઝ બિલ્ડ (સ્વચ્છ રિબિલ્ડ + HEAD સેન્ટિનલ — ડિપ્લોય માટે આવશ્યક)
npm run build:release   # rm -rf .build dist && build + dist/BUILD_SHA લખે છે

# સામાન્ય પોર્ટ કન્ફિગરેશન
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

યોગદાનકર્તા બિલ્ડ માત્ર કમ્પાઇલ વૅલિડેશન કરે છે: તે સ્ટૅન્ડઅલોન
ડિસ્ટ્રિબ્યુશનને એસેમ્બલ કરતું નથી કે વૈકલ્પિક નેટિવ પૅકેજિંગ એસેટ્સ બિલ્ડ કરતું નથી. જ્યારે
તમારે મોકલવા યોગ્ય બંડલને વૅલિડેટ કરવાની જરૂર હોય ત્યારે નિયમિત પ્રોડક્શન બિલ્ડનો ઉપયોગ કરો.

### બિલ્ડ આઉટપુટ લેઆઉટ

| ડિરેક્ટરી | સામગ્રી                                                                     | ટ્રૅક કરેલ |
| --------- | --------------------------------------------------------------------------- | ---------- |
| `src/`    | ઍપ્લિકેશન સોર્સ (TypeScript / TSX)                                          | હા         |
| `.build/` | મધ્યવર્તી ફાઇલો — `next build` આઉટપુટ (gitignored, `distDir = .build/next`) | ના         |
| `dist/`   | મોકલવા યોગ્ય બંડલ — `assembleStandalone` દ્વારા એસેમ્બલ કરાયેલ (gitignored) | ના         |

બિલ્ડ પાઇપલાઇન એક જ પાસમાં ચાલે છે:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js આઉટપુટ)
  └─ assembleStandalone()                 (સ્ટૅન્ડઅલોન + સ્ટેટિક + પબ્લિક + નેટિવ એસેટ્સ કૉપી કરે છે)
       └─ આઉટપુટ: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` વધારામાં પહેલાં બંને ડિરેક્ટરીઓ સાફ કરે છે અને
ડિપ્લોય ઇન્ટેગ્રિટી સેન્ટિનલ તરીકે `dist/BUILD_SHA` (= `git rev-parse --short HEAD`) લખે છે.

`npm run build:contributor` માત્ર-બૅકએન્ડ બિલ્ડ પ્રોફાઇલનો ઉપયોગ કરે છે. તે બિલ્ડ કરતી વખતે અસ્થાયી રૂપે
ડૅશબોર્ડ UI ફાઇલોને સ્ટબ કરે છે, API રૂટ હૅન્ડલર્સ જાળવી રાખે છે અને બિલ્ડ પછી મૂળ ફાઇલોને
પુનઃસ્થાપિત કરે છે. ડૅશબોર્ડ UIને અસર કરતા ફેરફારો માટે અથવા સંપૂર્ણ
રિલીઝ વૅલિડેશન માટે `npm run build`નો ઉપયોગ કરો; યોગદાનકર્તા પ્રોફાઇલ રિલીઝ બિલ્ડનો વિકલ્પ નથી.

> **VPS ડિપ્લોય નોંધ:** રિમોટ ઇમેજ ડિરેક્ટરી `/usr/lib/node_modules/omniroute/app/`
> યથાવત્ છે. ડિપ્લોય સ્કિલ્સ `dist/`ની સામગ્રીને તેમાં rsync કરે છે.
> માત્ર રિપોઝિટરીની અંદરનો બિલ્ડ આઉટપુટ પાથ બદલાયો છે (`app/` → `dist/`).

ડિફૉલ્ટ URLs:

- **ડૅશબોર્ડ**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git કાર્યપ્રવાહ

> ⚠️ **`main` પર ક્યારેય સીધું commit કરશો નહીં.** હંમેશાં feature branches નો ઉપયોગ કરો.
>
> **PR base:** સક્રિય `release/vX.Y.Z` branch ને લક્ષ્ય બનાવો (`main` ને નહીં). દરેક release માટે અલગ branch + ship સમયે tag ના મોડેલ માટે
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) જુઓ.

```bash
# સક્રિય release ના નવીનતમ સ્થાનથી branch બનાવો (ઉદાહરણ: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... ફેરફારો કરો ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# base = release/v3.8.49 સાથે Pull Request ખોલો
```

### Branch નામકરણ

| Prefix      | હેતુ                      |
| ----------- | ------------------------- |
| `feat/`     | નવી સુવિધાઓ               |
| `fix/`      | Bug સુધારાઓ               |
| `refactor/` | Code નું પુનર્ગઠન         |
| `docs/`     | Documentation માં ફેરફારો |
| `test/`     | Test ઉમેરાઓ/સુધારાઓ       |
| `chore/`    | Tooling, CI, dependencies |

### Commit સંદેશાઓ

[Conventional Commits](https://www.conventionalcommits.org/) ને અનુસરો:

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Scopes (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## ટેસ્ટ ચલાવવા

```bash
# બધા ટેસ્ટ (યુનિટ + vitest + ઇકોસિસ્ટમ + e2e)
npm run test:all

# એક ટેસ્ટ ફાઇલ (Node.js નેટિવ ટેસ્ટ રનર — મોટાભાગના ટેસ્ટ આનો ઉપયોગ કરે છે)
node --import tsx/esm --test tests/unit/your-file.test.ts

# ફક્ત તમારા ફેરફારથી પ્રભાવિત યુનિટ ટેસ્ટ (CI ગેટ જેવું જ TIA સિલેક્ટર, #8084)
npm run test:scoped            # છેલ્લા કમિટમાં (અથવા વર્કિંગ ટ્રીમાં) થયેલા ફેરફારો
npm run test:scoped:staged     # ફક્ત સ્ટેજ કરેલા ફેરફારો — પ્રી-કમિટ રન સાથે સારી રીતે કામ કરે છે
npm run test:scoped:full       # પહેલાં ઇમ્પોર્ટ-ગ્રાફ મેપ ફરીથી બનાવે છે (ફાઇલો ઉમેર્યા/ખસેડ્યા પછી)
# Exit 1 + "run the full suite" નો અર્થ એ છે કે કોઈ હબ ફાઇલ (tsconfig, package.json, …) અથવા
# મેપ ન કરાયેલ સોર્સ બદલાયો છે — સિલેક્ટર સુરક્ષિત રીતે નિષ્ફળ જાય છે, તે ક્યારેય ચૂપચાપ છોડતું નથી.

# Vitest (MCP સર્વર, autoCombo, કૅશ)
npm run test:vitest

# E2E ટેસ્ટ (Playwright જરૂરી છે)
npm run test:e2e

# પ્રોટોકોલ ક્લાયન્ટ E2E (MCP ટ્રાન્સપોર્ટ્સ, A2A)
npm run test:protocols:e2e

# ઇકોસિસ્ટમ સુસંગતતા ટેસ્ટ
npm run test:ecosystem

# કવરેજ ગેટ: સ્ટેટમેન્ટ્સ/લાઇન્સ/ફંક્શન્સ/બ્રાન્ચેસ માટે 60%
npm run test:coverage
npm run coverage:report

# લિન્ટ + ફોર્મેટ તપાસ
npm run lint
npm run check

# ગેટેડ વાસ્તવિક-અપસ્ટ્રીમ કોમ્બો સ્મોક (VPS ઍક્સેસ + વાસ્તવિક પ્રોવાઇડર ક્રેડિટ્સ જરૂરી છે)
# વાસ્તવિક પ્રોવાઇડર્સને હિટ કરે છે — થોડો ખર્ચ થાય છે. CI માં ક્યારેય ચાલતું નથી. ગેટ વિના સ્વચ્છ રીતે સ્કિપ થાય છે.
# જરૂરી: ssh root@192.168.0.15 ઍક્સેસ (VPS પરથી ફક્ત-વાંચવા યોગ્ય DB સ્નૅપશૉટ સોર્સ કરે છે).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Phase-3 VPS લાઇવ સ્મોક — સાદી Node ESM સ્ક્રિપ્ટ્સ, લાઇવ .15 સર્વરને સીધું હિટ કરે છે.
# જરૂરી: ssh root@192.168.0.15 ઍક્સેસ (કોમ્બોઝ SSH sqlite દ્વારા બનાવવામાં/દૂર કરવામાં આવે છે).
# વાસ્તવિક પ્રોવાઇડર્સને હિટ કરે છે (નાનો ખર્ચ). ફક્ત __live_test__* કોમ્બોઝ બનાવે/કાઢી નાખે છે. CI માં ક્યારેય ચાલતું નથી.
# .15 પર REQUIRE_API_KEY=false છે, તેથી API કીની જરૂર નથી, પરંતુ સેટ કરેલા હોય તો COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY ને માન આપે છે.
npm run test:combo:live:vps              # 7 HTTP પરિસ્થિતિઓ (પ્રાથમિકતા/રાઉન્ડ-રોબિન/વેઇટેડ/ખર્ચ/ફ્યુઝન/ઑટો + હેલ્થ)
npm run test:combo:live:vps:failover     # વાસ્તવિક ક્રોસ-પ્રોવાઇડર ફેલઓવર પરિસ્થિતિ ઉમેરે છે (કુલ 8)
```

કવરેજ નોંધો:

- `npm run test:coverage` મુખ્ય યુનિટ ટેસ્ટ સ્યુટ માટે સોર્સ કવરેજ માપે છે, `tests/**` ને બાકાત રાખે છે અને `open-sse/**` ને સમાવે છે
- પુલ રિક્વેસ્ટ્સે સ્ટેટમેન્ટ્સ/લાઇન્સ/ફંક્શન્સ/બ્રાન્ચેસ માટે કવરેજ ગેટ **60%+** પર જાળવવો આવશ્યક છે
- જો કોઈ PR `src/`, `open-sse/`, `electron/`, અથવા `bin/` માં પ્રોડક્શન કોડ બદલે, તો તેણે એ જ PR માં ઑટોમેટેડ ટેસ્ટ ઉમેરવા અથવા અપડેટ કરવા આવશ્યક છે
- `npm run coverage:report` તાજેતરના કવરેજ રનનો વિગતવાર ફાઇલ-દર-ફાઇલ રિપોર્ટ પ્રિન્ટ કરે છે
- `npm run test:coverage:legacy` ઐતિહાસિક સરખામણી માટે જૂના મેટ્રિકને જાળવી રાખે છે
- તબક્કાવાર કવરેજ સુધારણા રોડમૅપ માટે `docs/ops/COVERAGE_PLAN.md` જુઓ

### પુલ રિક્વેસ્ટની આવશ્યકતાઓ

PR ખોલતા પહેલાં, તમે જે બદલ્યું છે તેના માટે કેન્દ્રિત લૂપ ચલાવવા
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) નો ઉપયોગ કરો. સંપૂર્ણ યુનિટ સ્યુટ (4 CI શાર્ડ્સ), Vitest, **60%+** કવરેજ ગેટ અને
પ્રોડક્શન બિલ્ડની જવાબદારી CI ની છે — તેમને સ્થાનિક રીતે ચલાવવાથી એવી કોઈ વધારાની માહિતી મળતી નથી જે PR
તપાસ પહેલેથી નહીં આપે, અને નાના મશીનો પર તે હોસ્ટને સંતૃપ્ત કરી શકે છે (#8084):

- તમારા ફેરફારને આવરી લેતી ટેસ્ટ ફાઇલો ચલાવો: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- `npm run lint` ચલાવો
- જ્યારે પણ પ્રોડક્શન કોડ બદલાય, ત્યારે એ જ PR માં ઑટોમેટેડ ટેસ્ટ ઉમેરો અથવા અપડેટ કરો
- જ્યારે પ્રોડક્શન કોડ બદલાયો હોય, ત્યારે PR વર્ણનમાં બદલેલી અથવા ઉમેરેલી ટેસ્ટ ફાઇલોનો સમાવેશ કરો
- જ્યારે પ્રોજેક્ટ સિક્રેટ્સ CI માં કન્ફિગર કરેલા હોય, ત્યારે PR પર SonarQube પરિણામ તપાસો

વર્તમાન ટેસ્ટ સ્થિતિ: **122 યુનિટ ટેસ્ટ ફાઇલો**, જે નીચેનું કવર કરે છે:

- પ્રોવાઇડર ટ્રાન્સલેટર્સ અને ફોર્મેટ રૂપાંતરણ
- રેટ લિમિટિંગ, સર્કિટ બ્રેકર અને સ્થિતિસ્થાપકતા
- સિમૅન્ટિક કૅશ, આઇડેમ્પોટન્સી અને પ્રગતિ ટ્રૅકિંગ
- ડેટાબેઝ ઑપરેશન્સ અને સ્કીમા (21 DB મોડ્યુલ્સ)
- OAuth ફ્લોઝ અને ઑથેન્ટિકેશન
- API એન્ડપોઇન્ટ વૅલિડેશન (Zod v4)
- MCP સર્વર ટૂલ્સ અને સ્કોપ અમલીકરણ
- મેમરી અને Skills સિસ્ટમ્સ

---

## કોડ શૈલી

- **ESLint** — કમિટ કરતાં પહેલાં `npm run lint` ચલાવો
- **Prettier** — કમિટ કરતી વખતે `lint-staged` દ્વારા આપમેળે ફોર્મેટ થાય છે (2 સ્પેસ, સેમિકોલન, ડબલ ક્વોટ્સ, 100 અક્ષરની પહોળાઈ, es5 ટ્રેલિંગ કોમા)
- **TypeScript** — `src/` નો તમામ કોડ `.ts`/`.tsx` નો ઉપયોગ કરે છે; `open-sse/` `.ts`/`.js` નો ઉપયોગ કરે છે; TSDoc (`@param`, `@returns`, `@throws`) વડે દસ્તાવેજીકરણ કરો
- **`eval()` નહીં** — ESLint `no-eval`, `no-implied-eval`, `no-new-func` લાગુ કરે છે
- **Zod માન્યતા** — તમામ API ઇનપુટની માન્યતા માટે Zod v4 સ્કીમાનો ઉપયોગ કરો
- **નામકરણ**: ફાઇલો = camelCase/kebab-case, કમ્પોનન્ટ્સ = PascalCase, કોન્સ્ટન્ટ્સ = UPPER_SNAKE

### ભૂલ સંચાલન / ખાલી catch બ્લોક્સ

ક્યારેય `catch` ને સમજૂતી વિના ન છોડો. તેને બેમાંથી એક શ્રેણીમાં વર્ગીકૃત કરો (આ
"SSE સ્ટ્રીમ્સમાં ભૂલોને ક્યારેય ચૂપચાપ અવગણવી નહીં" એવા કડક નિયમને વ્યવહારમાં મૂકે છે):

- **ઇરાદાપૂર્વક (અમારી પોતાની શ્રેષ્ઠ-પ્રયાસવાળી સફાઈ/ટેલિમેટ્રી)** — અહીં નિષ્ફળતા અપેક્ષિત અને
  હાનિરહિત છે; એક લીટીની કારણદર્શક ટિપ્પણી ઉમેરો, લોગિંગ નહીં (દરેક વિનંતી પર લોગિંગ કરવાથી થતો
  ઘોંઘાટ આ પ્રથા ટાળે છે).

  ```ts
  } catch {} // ક્લાયન્ટ ડિસ્કનેક્ટ થયા પછી પહેલેથી બંધ કંટ્રોલરને બંધ કરવાનો પ્રયાસ અપેક્ષિત છે
  ```

- **લોગ કરવું જોઈએ (બાહ્ય/કોલર દ્વારા આપવામાં આવેલ કોડ, અથવા અવગણવાથી નિયંત્રણ પ્રવાહ બદલાય)** — `catch`
  રાખો (તેને ક્યારેય સ્ટ્રીમ તોડવા ન દો), પરંતુ સંદર્ભયુક્ત `console.debug`/`warn` ઉત્સર્જિત કરો જેથી
  નિષ્ફળતા શોધી શકાય.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

અમલમાં મૂકેલા ઉદાહરણો માટે `open-sse/utils/stream.ts` અને `open-sse/utils/streamHandler.ts` જુઓ.

---

## પ્રોજેક્ટ માળખું

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # ડૅશબોર્ડ પૃષ્ઠો (23 વિભાગો)
│   ├── api/                # API રૂટ્સ (51 ડિરેક્ટરીઓ)
│   └── login/              # પ્રમાણીકરણ પૃષ્ઠો (.tsx)
├── domain/                 # નીતિ એન્જિન (policyEngine, comboResolver, costRules, વગેરે)
├── lib/                    # મુખ્ય વ્યવસાયિક તર્ક (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 પ્રોટોકોલ સર્વર
│   ├── acp/                # Agent Communication Protocol રજિસ્ટ્રી
│   ├── compliance/         # અનુપાલન નીતિ એન્જિન
│   ├── db/                 # SQLite ડોમેન મોડ્યુલો + 130 માઇગ્રેશન્સ
│   ├── memory/             # સતત સંવાદાત્મક મેમરી
│   ├── oauth/              # OAuth પ્રદાતાઓ, સેવાઓ અને ઉપયોગિતાઓ
│   ├── skills/             # વિસ્તારી શકાય તેવું કૌશલ્ય ફ્રેમવર્ક
│   ├── usage/              # ઉપયોગ ટ્રૅકિંગ અને ખર્ચ ગણતરી
│   └── localDb.ts          # માત્ર ફરીથી નિકાસ કરતું સ્તર — અહીં ક્યારેય તર્ક ઉમેરશો નહીં
├── middleware/              # વિનંતી મિડલવેર (promptInjectionGuard)
├── mitm/                   # MITM પ્રૉક્સી (પ્રમાણપત્ર, DNS, લક્ષ્ય રૂટિંગ)
├── shared/
│   ├── components/         # React ઘટકો (.tsx)
│   ├── constants/          # પ્રદાતા વ્યાખ્યાઓ (329), MCP સ્કોપ્સ, 21 રૂટિંગ વ્યૂહરચનાઓ
│   ├── utils/              # સર્કિટ બ્રેકર, સેનિટાઇઝર, પ્રમાણીકરણ સહાયકો
│   └── validation/         # Zod v4 સ્કીમા
└── sse/                    # SSE પ્રૉક્સી પાઇપલાઇન

open-sse/                   # @omniroute/open-sse વર્કસ્પેસ
├── executors/              # 150 એક્ઝિક્યુટર મોડ્યુલો (એક્ઝિક્યુટર ક્લાસ + દરેક પ્રદાતા માટેના સહાયકો)
├── handlers/               # 11 વિનંતી હૅન્ડલર્સ (ચેટ, પ્રતિસાદો, એમ્બેડિંગ્સ, છબીઓ, વગેરે)
├── mcp-server/             # MCP સર્વર (110 અનન્ય ટૂલ્સ, 3 ટ્રાન્સપોર્ટ્સ, 33 સ્કોપ્સ)
├── services/               # 178 ટોચના સ્તરની સેવાઓ (combo, autoCombo, rateLimitManager, વગેરે)
├── translator/             # ફોર્મેટ અનુવાદકો (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API ટ્રાન્સફોર્મર
└── utils/                  # 22 ઉપયોગિતા મોડ્યુલો (સ્ટ્રીમ, TLS, પ્રૉક્સી, લૉગિંગ)

electron/                   # Electron ડેસ્કટૉપ ઍપ (ક્રૉસ-પ્લૅટફૉર્મ)

tests/
├── unit/                   # Node.js ટેસ્ટ રનર (1,574 ટેસ્ટ ફાઇલો)
├── integration/            # ઇન્ટિગ્રેશન ટેસ્ટ્સ
├── e2e/                    # Playwright ટેસ્ટ્સ
├── security/               # સુરક્ષા ટેસ્ટ્સ
├── translator/             # અનુવાદક-વિશિષ્ટ ટેસ્ટ્સ
└── load/                   # લોડ ટેસ્ટ્સ

docs/
├── adr/                     # આર્કિટેક્ચર નિર્ણય રેકોર્ડ્સ
├── architecture/            # સિસ્ટમ આર્કિટેક્ચર અને સ્થિતિસ્થાપકતા
├── comparison/              # OmniRoute અને વિકલ્પોની તુલના
├── compression/             # કમ્પ્રેશન માર્ગદર્શિકાઓ અને નિયમો
├── dev/                     # ડેવલપમેન્ટ માર્ગદર્શિકાઓ
├── diagrams/                # આર્કિટેક્ચર આકૃતિઓ
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # વપરાશકર્તા માર્ગદર્શિકા, Docker, સેટઅપ, સમસ્યાનિવારણ
├── i18n/                    # આંતરરાષ્ટ્રીયકૃત README અનુવાદો
├── marketing/               # માર્કેટિંગ સામગ્રી
├── ops/                     # ડિપ્લોયમેન્ટ, પ્રૉક્સી, કવરેજ, રિલીઝ
├── providers/               # પ્રદાતા-વિશિષ્ટ દસ્તાવેજો
├── reference/               # API સંદર્ભ, પર્યાવરણ ચલો, CLI ટૂલ્સ, મફત સ્તરો
├── releases/                # રિલીઝ નોંધો
├── routing/                 # સ્વચાલિત-કોમ્બો એન્જિન, રીઝનિંગ રીપ્લે
├── screenshots/             # ડૅશબોર્ડ સ્ક્રીનશૉટ્સ
├── security/                # સુરક્ષા નિયંત્રણો, અનુપાલન, સ્ટેલ્થ, ટોકન્સ
└── specs/                   # ડિઝાઇન સ્પષ્ટીકરણો
```

---

## નવો પ્રદાતા ઉમેરવો

### પગલું 1: પ્રદાતાના સ્થિરાંકોની નોંધણી કરો

`src/shared/constants/providers.ts`માં ઉમેરો — મોડ્યુલ લોડ થતી વખતે Zod દ્વારા માન્યતા ચકાસવામાં આવે છે.

### પગલું 2: એક્ઝિક્યુટર ઉમેરો (જો કસ્ટમ લોજિકની જરૂર હોય)

બેઝ એક્ઝિક્યુટરને વિસ્તૃત કરતું એક્ઝિક્યુટર `open-sse/executors/your-provider.ts`માં બનાવો.

### પગલું 3: ટ્રાન્સલેટર ઉમેરો (જો ફોર્મેટ OpenAI ન હોય)

`open-sse/translator/`માં રિક્વેસ્ટ/રિસ્પોન્સ ટ્રાન્સલેટર બનાવો.

### પગલું 4: OAuth કૉન્ફિગ ઉમેરો (જો OAuth-આધારિત હોય)

`src/lib/oauth/constants/oauth.ts`માં OAuth ક્રેડેન્શિયલ્સ અને `src/lib/oauth/services/`માં સર્વિસ ઉમેરો.

જો અપસ્ટ્રીમ પ્રદાતા તેની જાહેર CLI / બ્રાઉઝર બંડલમાં જાહેર OAuth client_id/secret અથવા Firebase Web API કી વિતરિત કરતો હોય, તો તેને સ્ટ્રિંગ લિટરલ તરીકે **એમ્બેડ કરશો નહીં**. `open-sse/utils/publicCreds.ts`માંથી `resolvePublicCred()`નો ઉપયોગ કરો અને `EMBEDDED_DEFAULTS`માં માસ્ક કરેલી બાઇટ એન્ટ્રી ઉમેરો. સંપૂર્ણ ફરજિયાત કાર્યપ્રવાહનું દસ્તાવેજીકરણ [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)માં કરેલું છે.

હેન્ડલર્સ/એક્ઝિક્યુટર્સની અંદર, ક્લાયન્ટ સુધી પહોંચતા ભૂલ સંદેશાઓ `open-sse/utils/error.ts`માંથી `buildErrorBody()` / `sanitizeErrorMessage()` મારફતે જ પસાર થવા જોઈએ — Response બૉડીમાં ક્યારેય કાચું `err.stack` અથવા `err.message` મૂકશો નહીં. [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) જુઓ.

### પગલું 5: મોડેલોની નોંધણી કરો

`open-sse/config/providerRegistry.ts`માં મોડેલની વ્યાખ્યાઓ ઉમેરો.

### પગલું 6: પરીક્ષણો ઉમેરો

ઓછામાં ઓછા નીચેની બાબતોને આવરી લેતા યુનિટ પરીક્ષણો `tests/unit/`માં લખો:

- પ્રદાતાની નોંધણી
- રિક્વેસ્ટ/રિસ્પોન્સ ટ્રાન્સલેશન
- ભૂલ વ્યવસ્થાપન

---

## Pull Request ચેકલિસ્ટ

- [ ] ટેસ્ટ્સ પાસ થાય છે (`npm test`)
- [ ] લિન્ટિંગ પાસ થાય છે (`npm run lint`)
- [ ] બિલ્ડ સફળ થાય છે (`npm run build`)
- [ ] નવા સાર્વજનિક ફંક્શન્સ અને ઇન્ટરફેસ માટે TypeScript પ્રકારો ઉમેર્યા છે
- [ ] કોઈ હાર્ડકોડેડ સિક્રેટ્સ અથવા ફૉલબૅક મૂલ્યો નથી
- [ ] સાર્વજનિક અપસ્ટ્રીમ ક્રેડેન્શિયલ્સ `resolvePublicCred()` મારફતે એમ્બેડ કર્યાં છે ([`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) જુઓ), ક્યારેય લિટરલ્સ તરીકે નહીં
- [ ] ભૂલ પ્રતિસાદો `buildErrorBody()` / `sanitizeErrorMessage()` મારફતે રૂટ થાય છે — પ્રતિસાદ બોડીમાં કોઈ કાચા સ્ટૅક ટ્રેસ નથી ([`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) જુઓ)
- [ ] શેલ કમાન્ડ્સ (`exec` / `spawn`) રનટાઇમ મૂલ્યોને સ્ટ્રિંગ ઇન્ટરપોલેશન મારફતે નહીં, પરંતુ `env` મારફતે પસાર કરે છે
- [ ] બધા ઇનપુટ્સ Zod સ્કીમા વડે માન્ય કરેલા છે
- [ ] વપરાશકર્તાને અસર કરતા ફેરફારો માટે `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` હેઠળ ચેન્જલૉગ **ફ્રેગમેન્ટ** ઉમેર્યો છે ([`changelog.d/README.md`](./changelog.d/README.md) જુઓ) — `CHANGELOG.md`ને સીધું સંપાદિત કરશો **નહીં**; ફ્રેગમેન્ટ્સને રિલીઝ સમયે એકત્રિત કરવામાં આવે છે અને PRs વચ્ચે ક્યારેય સંઘર્ષ થતો નથી
- [ ] દસ્તાવેજીકરણ અપડેટ કર્યું છે (જો લાગુ પડતું હોય)
- [ ] કોઈ નવી CodeQL / Secret-Scanning ચેતવણીઓ ખોલવામાં આવી નથી, અથવા દરેકને સંબંધિત `docs/security/` દસ્તાવેજનો સંદર્ભ આપતા ટેક્નિકલ વાજબીકરણ સાથે રદ કરવામાં આવી છે
- [ ] ચાઇલ્ડ પ્રોસેસ શરૂ કરતા રૂટ્સ (`/api/mcp/`, `/api/cli-tools/runtime/`)ને `src/server/authz/routeGuard.ts`માં `isLocalOnlyPath()` તરીકે વર્ગીકૃત કર્યા છે — [કડક નિયમ #15](docs/security/ROUTE_GUARD_TIERS.md) જુઓ
- [ ] કમિટ સંદેશાઓમાં AI/બોટ `Co-authored-by` ટ્રેલર્સ નથી (કડક નિયમ #16) — જે માનવીય સહયોગીઓના કાર્યનો પુનઃઉપયોગ થયો છે તેમને પ્રમાણભૂત `Co-authored-by: Name <email>` ટ્રેલર્સ દ્વારા શ્રેય આપવામાં આવ્યો છે

---

## રિલીઝિંગ

રિલીઝનું સંચાલન `/generate-release` વર્કફ્લો દ્વારા થાય છે. જ્યારે નવી GitHub Release બનાવવામાં આવે છે, ત્યારે પેકેજ GitHub Actions દ્વારા **આપમેળે npm પર પ્રકાશિત થાય છે**.

VPS ડિપ્લોયમેન્ટ માટે, `npm run build:release` નો ઉપયોગ કરો (`npm run build` નો નહીં) — તે સ્વચ્છ
રીબિલ્ડ કરે છે, બંડલને `dist/` માં એસેમ્બલ કરે છે અને `dist/BUILD_SHA` સેન્ટિનલ લખે છે.
ત્યારબાદ રિમોટ `app/` ડિરેક્ટરીમાં `dist/` ને rsync કરતી `/deploy-vps-*-cc` સ્કિલ્સનો ઉપયોગ કરો.

---

## મદદ મેળવવી

- **આર્કિટેક્ચર**: [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md) જુઓ
- **API સંદર્ભ**: [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md) જુઓ
- **સુરક્ષા દસ્તાવેજો**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **ઓપરેશન્સ દસ્તાવેજો**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **સમસ્યાઓ**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
