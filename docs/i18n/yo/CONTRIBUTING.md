# Contributing to OmniRoute (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Ẹ ṣé fún ìfẹ́ yín láti ṣàfikún sí iṣẹ́ yìí! Ìtọ́sọ́nà yìí ṣàlàyé gbogbo ohun tí ẹ nílò láti bẹ̀rẹ̀.

Fún ìlànà iṣẹ́ àṣẹ-àyípadà kọ̀ọ̀kan tó jẹ́ ti ìjọba, bẹ̀rẹ̀ pẹ̀lú
[Ọ̀nà Àṣeyọrí Ìkópa](docs/ops/CONTRIBUTION_GOLDEN_PATH.md). Ó so àwọn àyípadà olupèsè, ìdarí ọ̀nà,
UI/UX, i18n, CLI, ibi ìpamọ́ dátà, àti ìkọ́/ìmúṣiṣẹ́ pọ̀ mọ́ àwọn àdéhùn wọn, àwọn ìdánwò pàtó, àgbègbè CI,
àti àwọn ìgbésẹ̀ ìbámu.

---

## Ìṣètò Ìdàgbàsókè

### Àwọn Ohun Tí A Nílò Ṣáájú

- **Node.js** `>=22.22.3 <23`, tàbí `>=24.0.0 <27` (àbá: 24 LTS)
- **npm** 10+

> **Àwọn olumulo npm v11+ (Node 24+):** Lẹ́yìn `npm install`, ṣàyẹ̀wò pé a ti fi àwọn native modules sílẹ̀:
> `node -e "require('better-sqlite3')"`. Tí ó bá kùnà pẹ̀lú `MODULE_NOT_FOUND`,
> ṣiṣẹ́ `npm approve-scripts better-sqlite3 && npm install`. Wo
> [Ìtọ́jú Àwọn Ìṣòro](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Ṣe Ẹ̀dà & Fi Sílẹ̀

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Àwọn Àyípadà Àyíká

```bash
# Ṣẹ̀dá .env rẹ láti inú àdàkọ
cp .env.example .env

# Ṣẹ̀dá àwọn aṣírí tó pọndandan
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Àwọn àyípadà pàtàkì fún ìdàgbàsókè:

| Àyípadà                | Ìpìlẹ̀ Ìdàgbàsókè         | Àpèjúwe                |
| ---------------------- | ------------------------ | ---------------------- |
| `PORT`                 | `20128`                  | Pọ́ọ̀tù olupin           |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | URL ìpìlẹ̀ fún frontend |
| `JWT_SECRET`           | (ṣẹ̀dá lókè)              | Aṣírí ìfọwọ́sí JWT      |
| `INITIAL_PASSWORD`     | `CHANGEME`               | Ọ̀rọ̀ aṣínà ìwọlé àkọ́kọ́  |
| `APP_LOG_LEVEL`        | `info`                   | Ìpele àlàyé àkọsílẹ̀    |

### Àwọn Ìṣètò Dásíbọ́ọ̀dù

Dásíbọ́ọ̀dù náà pèsè àwọn bọ́tìnì yíyí UI fún àwọn ẹ̀ya tí a tún lè ṣètò nípasẹ̀ àwọn àyípadà àyíká:

| Ibi Ìṣètò           | Bọ́tìnì Yíyí        | Àpèjúwe                                |
| ------------------- | ------------------ | -------------------------------------- |
| Settings → Advanced | Ipo Ìṣàtúnṣe Àṣìṣe | Mú àwọn àkọsílẹ̀ ìbéèrè àṣìṣe ṣiṣẹ́ (UI) |
| Settings → General  | Ìfarahàn Sidebar   | Fi àwọn abala sidebar hàn/pamọ́         |

A tọ́jú àwọn ìṣètò wọ̀nyí sínú ibi ìpamọ́ dátà, wọ́n sì máa ń dúró lẹ́yìn àwọn ìtunbẹ̀rẹ̀, nípa fífi àwọn iye ìpìlẹ̀ àyípadà àyíká sí ẹ̀gbẹ́ nígbà tí a bá ṣètò wọn.

### Ṣíṣiṣẹ́ Ní Ẹ̀rọ Àdúgbò

```bash
# Ipo ìdàgbàsókè (àtúnrù aládàáṣiṣẹ́)
npm run dev

# Ìkọ́ fún ìmújáde
npm run build    # next build → .build/next/ lẹ́yìn náà assembleStandalone → dist/
npm run start

# Ìkójọ backend/API-nìkan tó yára fún àwọn àyípadà olùkópa
npm run build:contributor

# Ìkọ́ ìtúsílẹ̀ (àtúnkọ́ mímọ́ + àmì ìṣọ́ HEAD — ó pọndandan fún ìmúṣiṣẹ́)
npm run build:release   # rm -rf .build dist && build + kọ dist/BUILD_SHA

# Ìṣètò pọ́ọ̀tù tó wọ́pọ̀
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Ìkọ́ olùkópa ń ṣe ìfọwọ́sí ìkójọ-nìkan: kì í kó ìpínkiri standalone jọ tàbí kọ́ àwọn ohun ìṣàkójọpọ̀ native àṣàyàn. Lo ìkọ́ ìmújáde déédéé nígbà tí ẹ bá nílò láti fọwọ́sí àkójọpọ̀ tí a lè pín kiri.

### Ètò Àbájáde Ìkọ́

| Àpò-ìtọ́sọ́nà | Àkóónú                                                                          | Títọpinpin |
| ----------- | ------------------------------------------------------------------------------- | ---------- |
| `src/`      | Orísun ìṣàfilọ́lẹ̀ (TypeScript / TSX)                                             | Bẹ́ẹ̀ni      |
| `.build/`   | Àwọn àbájáde àárín — àbájáde `next build` (gitignored, `distDir = .build/next`) | Rárá       |
| `dist/`     | Àkójọpọ̀ tí a lè pín — èyí tí `assembleStandalone` kó jọ (gitignored)            | Rárá       |

Ìlànà ìkọ́ náà jẹ́ ìgbésẹ̀ ẹyọ kan:

```
npm run build
  └─ next build → .build/next/standalone  (Àbájáde Next.js)
  └─ assembleStandalone()                 (ń da standalone + static + public + àwọn ohun èlò native kọ)
       └─ àbájáde: dist/                  (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` tún kọ́kọ́ nu àwọn àpò-ìtọ́sọ́nà méjèèjì, ó sì kọ
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) gẹ́gẹ́ bí àmì ìṣọ́ ìdúróṣinṣin ìmúṣiṣẹ́.

`npm run build:contributor` ń lo àkóónú ìkọ́ backend-nìkan. Ó máa ń fi àwọn fáìlì UI dásíbọ́ọ̀dù
arọ́pò fún ìgbà díẹ̀ nígbà ìkọ́, ó pa àwọn olùdarí ọ̀nà API mọ́, ó sì dá àwọn fáìlì ojúlówó padà
lẹ́yìn ìkọ́ náà. Lo `npm run build` fún àwọn àyípadà tó kan UI dásíbọ́ọ̀dù tàbí fún
ìfọwọ́sí ìtúsílẹ̀ ní kíkún; àkóónú olùkópa kì í ṣe arọ́pò fún ìkọ́ ìtúsílẹ̀.

> **Àkíyèsí ìmúṣiṣẹ́ VPS:** àpò-ìtọ́sọ́nà àwòrán jíjìn `/usr/lib/node_modules/omniroute/app/`
> kò yí padà. Àwọn ọgbọ́n ìmúṣiṣẹ́ ń lo rsync láti da àkóónú `dist/` sínú rẹ̀.
> Ọ̀nà àbájáde ìkọ́ inú ibi ìpamọ́ kóòdù nìkan ló yí padà (`app/` → `dist/`).

Àwọn URL ìpìlẹ̀:

- **Dásíbọ́ọ̀dù**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Ìṣàn-iṣẹ́ Git

> ⚠️ **MÁ ṢE commit tààrà sí `main` LÁÉ.** Máa lo àwọn ẹ̀ka feature ní gbogbo ìgbà.
>
> **Ìpìlẹ̀ PR:** dojú kọ ẹ̀ka `release/vX.Y.Z` tó ń ṣiṣẹ́ lọ́wọ́ (kì í ṣe `main`). Wo
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) fún àwòṣe
> release-fún-ẹ̀ka-kọ̀ọ̀kan + tag-nígbà-fífi-ránṣẹ́.

```bash
# Ṣẹ̀dá ẹ̀ka láti orí release tó ń ṣiṣẹ́ lọ́wọ́ (àpẹẹrẹ: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... ṣe àwọn àyípadà ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Ṣí Pull Request kan pẹ̀lú base = release/v3.8.49
```

### Ìsọlórúkọ Ẹ̀ka

| Ìṣáájú      | Ète                       |
| ----------- | ------------------------- |
| `feat/`     | Àwọn ẹ̀yà tuntun           |
| `fix/`      | Àwọn àtúnṣe àṣìṣe         |
| `refactor/` | Àtúntò kóòdù              |
| `docs/`     | Àwọn àyípadà àkọsílẹ̀      |
| `test/`     | Àfikún/àtúnṣe ìdánwò      |
| `chore/`    | Irinṣẹ́, CI, àwọn ìgbẹ́kẹ̀lé |

### Àwọn Ìfiránṣẹ́ Commit

Tẹ̀lé [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Àwọn scope (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Ṣíṣe Àwọn Ìdánwò

```bash
# Gbogbo ìdánwò (unit + vitest + ecosystem + e2e)
npm run test:all

# Fáìlì ìdánwò kan ṣoṣo (ẹ̀rọ ìṣiṣẹ́ ìdánwò abinibi Node.js — èyí ni ọ̀pọ̀ ìdánwò ń lò)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Àwọn ìdánwò unit tí àyípadà rẹ kan nìkan (TIA selector kan náà bí ẹnu-ọ̀nà CI, #8084)
npm run test:scoped            # àwọn àyípadà nínú commit tó kọjá (tàbí igi iṣẹ́)
npm run test:scoped:staged     # àwọn àyípadà staged nìkan — ó bá ìṣiṣẹ́ pre-commit mu dáadáa
npm run test:scoped:full       # kọ́ àwòrán import-graph náà padà kọ́kọ́ (lẹ́yìn fífi fáìlì kún un/gbigbé àwọn fáìlì)
# Exit 1 + "run the full suite" túmọ̀ sí pé fáìlì hub kan (tsconfig, package.json, …) tàbí
# orísun tí kò sí lórí àwòrán yí padà — selector náà máa ń kùnà láìléwu, kì í fo ohun kankan ní ìkọ̀kọ̀.

# Vitest (sáfà MCP, autoCombo, cache)
npm run test:vitest

# Àwọn ìdánwò E2E (ń béèrè Playwright)
npm run test:e2e

# E2E àwọn client protocol (àwọn transport MCP, A2A)
npm run test:protocols:e2e

# Àwọn ìdánwò ìbámu ecosystem
npm run test:ecosystem

# Ẹnu-ọ̀nà coverage: 60% statements/lines/functions/branches
npm run test:coverage
npm run coverage:report

# Àyẹ̀wò lint + format
npm run lint
npm run check

# Ìdánwò combo smoke real-upstream tí a fi ẹnu-ọ̀nà dáàbò bo (ń béèrè ààyè sí VPS + kirẹ́díìtì provider gidi)
# Ó kan àwọn provider GIDI — ó ná díẹ̀. KÌ Í ṣiṣẹ́ nínú CI LÁÉ. Ó máa fo lọ́nà tó bójú mu láìsí ẹnu-ọ̀nà náà.
# Ohun tí a nílò: ààyè ssh root@192.168.0.15 (ó ń gba snapshot DB kíkà-nìkan láti VPS).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Ìdánwò smoke VPS live Phase-3 — àwọn script Node ESM lásán, wọ́n kan sáfà .15 live tààrà.
# Ó nílò: ààyè ssh root@192.168.0.15 (a ń ṣẹ̀dá/tú àwọn combo ká nípasẹ̀ SSH sqlite).
# Ó kan àwọn provider GIDI (owó díẹ̀). Ó ṣẹ̀dá/pa àwọn combo __live_test__* nìkan. KÌ Í ṣiṣẹ́ nínú CI LÁÉ.
# REQUIRE_API_KEY=false lórí .15 nítorí náà kò nílò API key, ṣùgbọ́n ó bọ̀wọ̀ fún COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY bí a bá ṣètò wọn.
npm run test:combo:live:vps              # àwọn scenario HTTP 7 (priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # ó ṣàfikún scenario failover cross-provider gidi kan (8 lápapọ̀)
```

Àwọn àkíyèsí coverage:

- `npm run test:coverage` ń díwọ̀n coverage orísun fún àkójọpọ̀ ìdánwò unit àkọ́kọ́, ó yọ `tests/**` kúrò, ó sì fi `open-sse/**` kún un
- Àwọn Pull Request gbọ́dọ̀ jẹ́ kí ẹnu-ọ̀nà coverage wà ní **60%+** fún statements/lines/functions/branches
- Bí PR kan bá yí kóòdù production padà nínú `src/`, `open-sse/`, `electron/`, tàbí `bin/`, ó gbọ́dọ̀ ṣàfikún tàbí ṣàfikún sí àwọn ìdánwò aládàáṣiṣẹ́ nínú PR kan náà
- `npm run coverage:report` ń tẹ̀ jáde ìròyìn fáìlì-kọ̀ọ̀kan tó kún fún ìṣiṣẹ́ coverage tuntun jù lọ
- `npm run test:coverage:legacy` ń pa metric àtijọ́ mọ́ fún ìfiwéra ìtàn
- Wo `docs/ops/COVERAGE_PLAN.md` fún ètò-ọ̀nà ìmúdára coverage ní ipele-ìpele

### Àwọn Ohun Tí Pull Request Gbọ́dọ̀ Ní

Kí o tó ṣí PR kan, lo
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) láti ṣiṣẹ́ loop tó dojú kọ
ohun tí o yí padà. Gbogbo àkójọpọ̀ unit (àwọn shard CI 4), Vitest, ẹnu-ọ̀nà coverage **60%+**, àti
build production jẹ́ ojúṣe CI — ṣíṣe wọn ní local kò fi àmì tuntun kankan kún ohun tí àwọn àyẹ̀wò PR
kò ní fún ọ tẹ́lẹ̀, àti pé lórí àwọn ẹ̀rọ kékeré ó lè mú kí host kún rẹ́rẹ́ (#8084):

- Ṣiṣẹ́ àwọn fáìlì ìdánwò tó bo àyípadà rẹ: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Ṣiṣẹ́ `npm run lint`
- Fi àwọn ìdánwò aládàáṣiṣẹ́ kún un tàbí ṣàfikún sí wọn nínú PR kan náà ní gbogbo ìgbà tí kóòdù production bá yí padà
- Fi àwọn fáìlì ìdánwò tí a yí padà tàbí tí a ṣàfikún sí àpèjúwe PR nígbà tí kóòdù production bá yí padà
- Ṣàyẹ̀wò àbájáde SonarQube lórí PR nígbà tí a bá ti ṣètò àwọn àṣírí project nínú CI

Ipò ìdánwò lọ́wọ́lọ́wọ́: **àwọn fáìlì ìdánwò unit 122** tó bo:

- Àwọn translator provider àti ìyípadà format
- Rate limiting, circuit breaker, àti resilience
- Semantic cache, idempotency, àti títọpa progress
- Àwọn iṣẹ́ database àti schema (àwọn module DB 21)
- Àwọn ìṣàn OAuth àti authentication
- Ìfọwọ́sí endpoint API (Zod v4)
- Àwọn irinṣẹ́ sáfà MCP àti fífi scope múlò
- Àwọn ètò Memory àti Skills

---

## Ìlànà Kóòdù

- **ESLint** — Ṣe `npm run lint` kí o tó commit
- **Prettier** — A máa ṣe àtúnṣe fòórùmù laifọwọyi nípasẹ̀ `lint-staged` nígbà commit (ààyè 2, semicolons, double quotes, ìbú àmì-ọ̀rọ̀ 100, es5 trailing commas)
- **TypeScript** — Gbogbo kóòdù inú `src/` lo `.ts`/`.tsx`; `open-sse/` lo `.ts`/`.js`; ṣe àkọsílẹ̀ pẹ̀lú TSDoc (`@param`, `@returns`, `@throws`)
- **Má ṣe lo `eval()`** — ESLint fi agbára mú `no-eval`, `no-implied-eval`, `no-new-func`
- **Ìfọwọ́sí Zod** — Lo àwọn schema Zod v4 fún ìfọwọ́sí gbogbo ìwọlé API
- **Ìsọlórúkọ**: Àwọn fáìlì = camelCase/kebab-case, àwọn component = PascalCase, àwọn constant = UPPER_SNAKE

### Ìṣàkóso àṣìṣe / àwọn bulọ́ọ̀kù catch tí ó ṣófo

Má ṣe fi `catch` sílẹ̀ láìṣàlàyé láéláé. Pín in sí ọ̀kan nínú ẹ̀ka méjì (èyí ń sọ
òfin líle náà di ohun tí a lè lò pé “má ṣe gbé àwọn àṣìṣe inú àwọn stream SSE mì ní ìdákẹ́jẹ láéláé”):

- **Àfọ̀mọ́ (ìmọ́tótó/telemetry best-effort tiwa fúnra wa)** — a retí ìkùnà níbí, kò sì
  léwu; ṣàfikún comment ìdáláre onílà-kan, láìsí logging (logging lórí gbogbo request ni
  ariwo tí àṣà yìí ń yẹra fún).

  ```ts
  } catch {} // a retí pípa controller tí a ti pa tẹ́lẹ̀ lẹ́yìn tí client bá já asopọ̀
  ```

- **Ó yẹ kí a ṣe log rẹ̀ (kóòdù láti ìta/tí caller pèsè, tàbí gbígbé e mì bá yí control flow padà)** — fi
  catch náà sílẹ̀ (má ṣe jẹ́ kí ó ba stream náà jẹ́ láéláé), ṣùgbọ́n ṣe `console.debug`/`warn` pẹ̀lú ọ̀rọ̀ àyíká kí
  ìkùnà náà lè ṣeé ṣàwárí.

  ```ts
  } catch (e) {
    console.debug("[STREAM] àṣìṣe callback onFailure:", e);
  }
  ```

Wo `open-sse/utils/stream.ts` àti `open-sse/utils/streamHandler.ts` fún àwọn àpẹẹrẹ tí a ti lò.

---

## Ìṣètò Project

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Àwọn ojú-ewé dashboard (ẹ̀ka 23)
│   ├── api/                # Àwọn route API (directory 51)
│   └── login/              # Àwọn ojú-ewé ìfàṣẹ̀sí (.tsx)
├── domain/                 # Ẹ̀rọ policy (policyEngine, comboResolver, costRules, àti bẹ́ẹ̀ bẹ́ẹ̀ lọ)
├── lib/                    # Kókó business logic (.ts)
│   ├── a2a/                # Server protocol Agent-to-Agent v0.3
│   ├── acp/                # Registry Agent Communication Protocol
│   ├── compliance/         # Ẹ̀rọ policy ìbámu
│   ├── db/                 # Àwọn module domain SQLite + migration 130
│   ├── memory/             # Iranti ìjíròrò tí ó dúró pẹ́
│   ├── oauth/              # Àwọn provider OAuth, service, àti utility
│   ├── skills/             # Framework skill tí a lè mú gbòòrò sí i
│   ├── usage/              # Ìtọ́pa lílò àti ìṣírò iye owó
│   └── localDb.ts          # Layer àtún-gbé-jáde nìkan — má ṣe ṣàfikún logic síbí láéláé
├── middleware/              # Middleware request (promptInjectionGuard)
├── mitm/                   # Proxy MITM (cert, DNS, ìdarí target)
├── shared/
│   ├── components/         # Àwọn component React (.tsx)
│   ├── constants/          # Àwọn ìtumọ̀ provider (329), àwọn scope MCP, ọ̀nà ìdarí 19
│   ├── utils/              # Circuit breaker, sanitizer, àwọn olùrànlọ́wọ́ auth
│   └── validation/         # Àwọn schema Zod v4
└── sse/                    # Pipeline proxy SSE

open-sse/                   # Workspace @omniroute/open-sse
├── executors/              # Module ìmúlò executor 89
├── handlers/               # Olùṣàkóso request 11 (chat, responses, embeddings, images, àti bẹ́ẹ̀ bẹ́ẹ̀ lọ)
├── mcp-server/             # Server MCP (irinṣẹ́ aláìlẹ́ẹ̀mejì 110, transport 3, scope 33)
├── services/               # Service ipele-òkè 178 (combo, autoCombo, rateLimitManager, àti bẹ́ẹ̀ bẹ́ẹ̀ lọ)
├── translator/             # Àwọn olùtumọ̀ format (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Transformer Responses API
└── utils/                  # Module utility 22 (stream, TLS, proxy, logging)

electron/                   # App desktop Electron (oríṣiríṣi platform)

tests/
├── unit/                   # Olùṣiṣẹ́ test Node.js (fáìlì test 1,574)
├── integration/            # Àwọn test integration
├── e2e/                    # Àwọn test Playwright
├── security/               # Àwọn test ààbò
├── translator/             # Àwọn test pàtó fún translator
└── load/                   # Àwọn test ẹrù

docs/
├── adr/                     # Àwọn Àkọsílẹ̀ Ìpinnu Architecture
├── architecture/            # Architecture ètò àti agbára ìfaradà
├── comparison/              # OmniRoute pẹ̀lú àwọn àṣàyàn mìíràn
├── compression/             # Àwọn ìtọ́sọ́nà àti òfin compression
├── dev/                     # Àwọn ìtọ́sọ́nà development
├── diagrams/                # Àwọn àwòrán architecture
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # Ìtọ́sọ́nà olumulo, Docker, setup, ìyanjú ìṣòro
├── i18n/                    # Àwọn ìtumọ̀ README sí onírúurú èdè
├── marketing/               # Àwọn ohun èlò marketing
├── ops/                     # Deployment, proxy, coverage, releases
├── providers/               # Àwọn doc pàtó fún provider
├── reference/               # Ìtọ́kasí API, env vars, àwọn irinṣẹ́ CLI, free tiers
├── releases/                # Àwọn àkọsílẹ̀ release
├── routing/                 # Ẹ̀rọ auto-combo, àtúnṣeré reasoning
├── screenshots/             # Àwọn screenshot dashboard
├── security/                # Guardrails, compliance, stealth, tokens
└── specs/                   # Àwọn spec design
```

---

## Fí Olùpèsè Tuntun Kún Un

### Ìgbésẹ̀ 1: Forúkọsílẹ̀ Àwọn Àìyípadà Olùpèsè

Fi kún `src/shared/constants/providers.ts` — Zod yóò fìdí rẹ̀ múlẹ̀ nígbà tí module bá ń ṣiṣẹ́.

### Ìgbésẹ̀ 2: Fi Executor Kún Un (bí ọgbọ́n àkànṣe bá ṣe pàtàkì)

Ṣẹ̀dá executor sínú `open-sse/executors/your-provider.ts` tí yóò jogún láti inú executor ìpìlẹ̀.

### Ìgbésẹ̀ 3: Fi Translator Kún Un (bí kì í bá ṣe ọ̀nà-àgbékalẹ̀ OpenAI)

Ṣẹ̀dá àwọn translator fún request/response sínú `open-sse/translator/`.

### Ìgbésẹ̀ 4: Fi Àtòpọ̀ OAuth Kún Un (bí ó bá dá lórí OAuth)

Fi àwọn ẹ̀rí ìdánimọ̀ OAuth kún `src/lib/oauth/constants/oauth.ts` àti service sínú `src/lib/oauth/services/`.

Bí olùpèsè upstream bá ń pín OAuth client_id/secret ti gbogbo ènìyàn tàbí kọ́kọ́rọ́ Firebase Web API kan sínú CLI gbogbogbò tàbí bundle browser rẹ̀, **má ṣe** fi sínú kóòdù gẹ́gẹ́ bí string literal. Lo `resolvePublicCred()` láti `open-sse/utils/publicCreds.ts`, kí o sì fi àkọsílẹ̀ byte tí a bo mọ́lẹ̀ kún `EMBEDDED_DEFAULTS`. A ṣàkọsílẹ̀ gbogbo ìlànà iṣẹ́ tó jẹ́ dandan sínú [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

Nínú àwọn handler/executor, àwọn ìfiránṣẹ́ àṣìṣe tí yóò dé ọ̀dọ̀ client gbọ́dọ̀ gba inú `buildErrorBody()` / `sanitizeErrorMessage()` láti `open-sse/utils/error.ts` kọjá — má ṣe fi `err.stack` tàbí `err.message` aláìṣe-àtúnṣe sínú body Response láé. Wo [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Ìgbésẹ̀ 5: Forúkọsílẹ̀ Àwọn Model

Fi àwọn ìtumọ̀ model kún `open-sse/config/providerRegistry.ts`.

### Ìgbésẹ̀ 6: Fi Àwọn Ìdánwò Kún Un

Kọ àwọn unit test sínú `tests/unit/` tí yóò kéré tán bo:

- Ìforúkọsílẹ̀ olùpèsè
- Ìtumọ̀ request/response
- Ìṣàkóso àṣìṣe

---

## Àtòjọ Àyẹ̀wò Pull Request

- [ ] Àwọn ìdánwò kọjá (`npm test`)
- [ ] Linting kọjá (`npm run lint`)
- [ ] Build ṣàṣeyọrí (`npm run build`)
- [ ] A fi àwọn type TypeScript kún un fún àwọn function àti interface gbogbogbò tuntun
- [ ] Kò sí secret tàbí iye fallback tí a kọ sínú kóòdù
- [ ] A fi àwọn ẹ̀rí ìdánimọ̀ upstream gbogbogbò sínú kóòdù nípasẹ̀ `resolvePublicCred()` (wo [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), kì í ṣe gẹ́gẹ́ bí literal láé
- [ ] Àwọn ìdáhùn àṣìṣe gba inú `buildErrorBody()` / `sanitizeErrorMessage()` kọjá — kò sí stack trace aláìṣe-àtúnṣe nínú body ìdáhùn (wo [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Àwọn àṣẹ shell (`exec` / `spawn`) ń fi àwọn iye runtime ránṣẹ́ nípasẹ̀ `env`, kì í ṣe nípasẹ̀ string interpolation
- [ ] A fìdí gbogbo àwọn input múlẹ̀ pẹ̀lú schema Zod
- [ ] A fi **fragment** changelog kún abẹ́ `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` fún àwọn àyípadà tí olumulo yóò rí (wo [`changelog.d/README.md`](./changelog.d/README.md)) — **má ṣe** ṣàtúnṣe `CHANGELOG.md` ní tààrà; a máa ń kó àwọn fragment jọ nígbà release, wọn kì í sì í fa ìtakora láàárín àwọn PR láé
- [ ] A ṣe àfikún sí àkọsílẹ̀ ìtọ́sọ́nà (bí ó bá yẹ)
- [ ] Kò sí ìkìlọ̀ CodeQL / Secret-Scanning tuntun tí a ṣí, tàbí a kọ ọ̀kọ̀ọ̀kan sílẹ̀ pẹ̀lú ìdáláre ìmọ̀-ẹ̀rọ tó tọ́ka sí doc tó bá a mu nínú `docs/security/`
- [ ] Àwọn route tí ń dá child process sílẹ̀ (`/api/mcp/`, `/api/cli-tools/runtime/`) ni a pín sí `isLocalOnlyPath()` nínú `src/server/authz/routeGuard.ts` — wo [Òfin Líle #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Kò sí trailer `Co-Authored-By` nínú àwọn ìfiránṣẹ́ commit — àwọn commit gbọ́dọ̀ farahàn lábẹ́ Git identity olówó repository nìkan (Òfin Líle #16)

---

## Ṣíṣe Ìtújáde

A ń ṣàkóso àwọn ìtújáde nípasẹ̀ workflow `/generate-release`. Nígbà tí a bá ṣẹ̀dá GitHub Release tuntun, a máa **ṣe àtẹ̀jáde package náà sí npm láìfọwọ́ṣe** nípasẹ̀ GitHub Actions.

Fún ìmúṣiṣẹ́ lórí VPS, lo `npm run build:release` (kì í ṣe `npm run build`) — ó máa ń ṣe
àtúnkọ́ tó mọ́, kó bundle náà jọ sínú `dist/`, ó sì kọ sentinel `dist/BUILD_SHA`.
Lẹ́yìn náà, lo àwọn skill `/deploy-vps-*-cc` tí ó máa ń lo rsync láti fi `dist/` sí directory `app/` tó wà lórí ẹ̀rọ jíjìn.

---

## Bí A Ṣe Lè Rí Ìrànlọ́wọ́

- **Àwòrán-ẹ̀rọ**: Wo [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **Ìtọ́kasí API**: Wo [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Àwọn ìwé ààbò**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Àwọn ìwé iṣẹ́-ìṣàkóso**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Àwọn ìṣòro**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **Àwọn ADR**: Wo `docs/adr/` fún àwọn àkọsílẹ̀ ìpinnu àwòrán-ẹ̀rọ
