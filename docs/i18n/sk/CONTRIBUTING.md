# Contributing to OmniRoute (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Ďakujeme za váš záujem prispieť! Táto príručka obsahuje všetko, čo potrebujete na začiatok.

Oficiálny pracovný postup pre jednotlivé zmeny nájdete v dokumente
[Optimálny postup prispievania](docs/ops/CONTRIBUTION_GOLDEN_PATH.md). Priraďuje zmeny poskytovateľov, smerovania,
UI/UX, i18n, CLI, databázy a zostavenia/nasadenia k ich kontraktom, cieleným testom, pokrytiu CI
a krokom zosúladenia.

---

## Nastavenie vývojového prostredia

### Predpoklady

- **Node.js** `>=22.22.3 <23` alebo `>=24.0.0 <27` (odporúčané: 24 LTS)
- **npm** 10+

> **Používatelia npm v11+ (Node 24+):** Po spustení `npm install` overte, či boli nainštalované natívne moduly:
> `node -e "require('better-sqlite3')"`. Ak príkaz zlyhá s chybou `MODULE_NOT_FOUND`,
> spustite `npm approve-scripts better-sqlite3 && npm install`. Pozrite si
> [Riešenie problémov](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Klonovanie a inštalácia

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Premenné prostredia

```bash
# Vytvorte súbor .env zo šablóny
cp .env.example .env

# Vygenerujte požadované tajné hodnoty
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Kľúčové premenné pre vývoj:

| Premenná               | Predvolená hodnota pre vývoj | Popis                          |
| ---------------------- | ---------------------------- | ------------------------------ |
| `PORT`                 | `20128`                      | Port servera                   |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`     | Základná URL pre frontend      |
| `JWT_SECRET`           | (vygenerujte vyššie)         | Tajný kľúč na podpisovanie JWT |
| `INITIAL_PASSWORD`     | `CHANGEME`                   | Heslo na prvé prihlásenie      |
| `APP_LOG_LEVEL`        | `info`                       | Úroveň podrobnosti protokolov  |

### Nastavenia ovládacieho panela

Ovládací panel poskytuje prepínače používateľského rozhrania pre funkcie, ktoré možno konfigurovať aj prostredníctvom premenných prostredia:

| Umiestnenie nastavenia | Prepínač                   | Popis                                         |
| ---------------------- | -------------------------- | --------------------------------------------- |
| Nastavenia → Rozšírené | Režim ladenia              | Povolenie protokolov požiadaviek ladenia (UI) |
| Nastavenia → Všeobecné | Viditeľnosť bočného panela | Zobrazenie/skrytie sekcií bočného panela      |

Tieto nastavenia sa ukladajú do databázy a pretrvávajú medzi reštartmi. Ak sú nastavené, prepíšu predvolené hodnoty premenných prostredia.

### Lokálne spustenie

```bash
# Vývojový režim (automatické opätovné načítanie)
npm run dev

# Produkčné zostavenie
npm run build    # next build → .build/next/, potom assembleStandalone → dist/
npm run start

# Rýchla kompilácia iba backendu/API pre zmeny prispievateľov
npm run build:contributor

# Vydávacie zostavenie (čisté opätovné zostavenie + sentinel HEAD — vyžaduje sa na nasadenie)
npm run build:release   # rm -rf .build dist && zostavenie + zápis dist/BUILD_SHA

# Bežná konfigurácia portu
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Zostavenie pre prispievateľov vykonáva iba validačnú kompiláciu: nezostavuje samostatnú
distribúciu ani voliteľné natívne baliace prostriedky. Keď potrebujete overiť balík určený
na distribúciu, použite bežné produkčné zostavenie.

### Rozloženie výstupu zostavenia

| Adresár   | Obsah                                                                              | Sledované |
| --------- | ---------------------------------------------------------------------------------- | --------- |
| `src/`    | Zdrojový kód aplikácie (TypeScript / TSX)                                          | Áno       |
| `.build/` | Medzivýstupy — výstup `next build` (ignorovaný Gitom, `distDir = .build/next`)     | Nie       |
| `dist/`   | Distribuovateľný balík — zostavený pomocou `assembleStandalone` (ignorovaný Gitom) | Nie       |

Proces zostavenia prebieha v jednom priechode:

```
npm run build
  └─ next build → .build/next/standalone  (výstup Next.js)
  └─ assembleStandalone()                 (kopíruje samostatný balík + statické + verejné + natívne prostriedky)
       └─ výstup: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` navyše najskôr vyčistí oba adresáre a zapíše
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) ako sentinel integrity nasadenia.

`npm run build:contributor` používa profil zostavenia iba pre backend. Počas zostavovania dočasne nahrádza
súbory UI ovládacieho panela zástupnými súbormi, zachováva obslužné rutiny trás API a po zostavení obnoví pôvodné súbory.
Pre zmeny, ktoré ovplyvňujú UI ovládacieho panela, alebo na úplné overenie vydania použite `npm run build`;
profil pre prispievateľov nenahrádza vydávacie zostavenie.

> **Poznámka k nasadeniu na VPS:** vzdialený adresár obrazu `/usr/lib/node_modules/omniroute/app/`
> zostáva nezmenený. Nástroje na nasadenie synchronizujú obsah adresára `dist/` do tohto umiestnenia pomocou rsync.
> Zmenila sa iba cesta k výstupu zostavenia v repozitári (`app/` → `dist/`).

Predvolené URL:

- **Ovládací panel**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Pracovný postup v Gite

> ⚠️ **NIKDY nevytvárajte commity priamo do vetvy `main`.** Vždy používajte vetvy pre funkcionality.
>
> **Základ PR:** ako cieľ nastavte aktívnu vetvu `release/vX.Y.Z` (nie `main`). Model
> jednej vetvy na vydanie + označenie tagom pri vydaní nájdete v dokumente
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md).

```bash
# Vytvorte vetvu z najnovšieho bodu aktívnej vetvy vydania (príklad: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... vykonajte zmeny ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Otvorte Pull Request so základom = release/v3.8.49
```

### Pomenovanie vetiev

| Predpona    | Účel                     |
| ----------- | ------------------------ |
| `feat/`     | Nové funkcionality       |
| `fix/`      | Opravy chýb              |
| `refactor/` | Reštrukturalizácia kódu  |
| `docs/`     | Zmeny dokumentácie       |
| `test/`     | Pridanie/opravy testov   |
| `chore/`    | Nástroje, CI, závislosti |

### Správy commitov

Dodržiavajte štandard [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Rozsahy (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Spúšťanie testov

```bash
# Všetky testy (unit + vitest + ecosystem + e2e)
npm run test:all

# Jeden testovací súbor (natívny testovací nástroj Node.js — používa ho väčšina testov)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Iba jednotkové testy ovplyvnené vašou zmenou (rovnaký selektor TIA ako v kontrolnom mechanizme CI, #8084)
npm run test:scoped            # zmeny v poslednom commite (alebo v pracovnom strome)
npm run test:scoped:staged     # iba zmeny v stagingu — dobre sa dopĺňa so spustením pred commitom
npm run test:scoped:full       # najprv znova zostaví mapu grafu importov (po pridaní/presunutí súborov)
# Návratový kód 1 + „run the full suite“ znamená, že sa zmenil centrálny súbor (tsconfig, package.json, …)
# alebo nenamapovaný zdroj — selektor bezpečne zlyhá a nikdy nič potichu nepreskočí.

# Vitest (server MCP, autoCombo, vyrovnávacia pamäť)
npm run test:vitest

# Testy E2E (vyžadujú Playwright)
npm run test:e2e

# E2E protokolových klientov (transporty MCP, A2A)
npm run test:protocols:e2e

# Testy kompatibility ekosystému
npm run test:ecosystem

# Kontrola pokrytia: 60 % príkazov/riadkov/funkcií/vetiev
npm run test:coverage
npm run coverage:report

# Kontrola lintovania + formátovania
npm run lint
npm run check

# Podmienený smoke test kombinácie so skutočnými upstream službami (vyžaduje prístup k VPS + reálne kredity poskytovateľov)
# Používa SKUTOČNÝCH poskytovateľov — niečo málo stojí. NIKDY sa nespúšťa v CI. Bez povolenia sa korektne preskočí.
# Vyžaduje: prístup ssh root@192.168.0.15 (načíta snapshot databázy iba na čítanie z VPS).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Živý smoke test VPS fázy 3 — bežné skripty Node ESM, ktoré pristupujú priamo k živému serveru .15.
# Vyžaduje: prístup ssh root@192.168.0.15 (kombinácie sa vytvárajú/odstraňujú cez SSH sqlite).
# Používa SKUTOČNÝCH poskytovateľov (malé náklady). Vytvára/odstraňuje iba kombinácie __live_test__*. NIKDY sa nespúšťa v CI.
# Na .15 je REQUIRE_API_KEY=false, takže kľúč API nie je potrebný, ale ak sú nastavené COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY, rešpektuje ich.
npm run test:combo:live:vps              # 7 scenárov HTTP (priorita/round-robin/vážený/náklady/fúzia/automatický + stav)
npm run test:combo:live:vps:failover     # pridáva skutočný scenár prepnutia medzi poskytovateľmi pri zlyhaní (spolu 8)
```

Poznámky k pokrytiu:

- `npm run test:coverage` meria pokrytie zdrojového kódu pre hlavnú sadu jednotkových testov, vylučuje `tests/**` a zahŕňa `open-sse/**`
- Pull requesty musia zachovať kontrolu pokrytia na úrovni **60 % alebo viac** pre príkazy/riadky/funkcie/vetvy
- Ak PR mení produkčný kód v `src/`, `open-sse/`, `electron/` alebo `bin/`, musí v rovnakom PR pridať alebo aktualizovať automatizované testy
- `npm run coverage:report` vypíše podrobnú správu po jednotlivých súboroch z posledného spustenia merania pokrytia
- `npm run test:coverage:legacy` zachováva staršiu metriku na historické porovnanie
- Plán postupného zlepšovania pokrytia nájdete v `docs/ops/COVERAGE_PLAN.md`

### Požiadavky na Pull Request

Pred otvorením PR použite
[odporúčaný postup prispievania](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) a spustite cielený cyklus pre
vykonané zmeny. Za úplnú sadu jednotkových testov (4 časti CI), Vitest, kontrolu pokrytia na úrovni **60 % alebo viac** a
produkčné zostavenie zodpovedá CI — ich lokálne spustenie neposkytuje žiadne ďalšie informácie, ktoré by vám
už neposkytli kontroly PR, a na slabších počítačoch môže preťažiť hostiteľa (#8084):

- Spustite testovacie súbory, ktoré pokrývajú vašu zmenu: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Spustite `npm run lint`
- Pri každej zmene produkčného kódu zahrňte alebo aktualizujte automatizované testy v rovnakom PR
- Ak sa zmenil produkčný kód, uveďte zmenené alebo pridané testovacie súbory v opise PR
- Ak sú tajné hodnoty projektu nakonfigurované v CI, skontrolujte výsledok SonarQube v PR

Aktuálny stav testov: **122 súborov jednotkových testov**, ktoré pokrývajú:

- Translátory poskytovateľov a konverziu formátov
- Obmedzovanie frekvencie požiadaviek, istič a odolnosť
- Sémantickú vyrovnávaciu pamäť, idempotenciu a sledovanie priebehu
- Databázové operácie a schému (21 modulov DB)
- Toky OAuth a autentifikáciu
- Overovanie koncových bodov API (Zod v4)
- Nástroje servera MCP a vynucovanie rozsahov
- Systémy Memory a Skills

---

## Štýl kódu

- **ESLint** — Pred potvrdením zmien spustite `npm run lint`
- **Prettier** — Automatické formátovanie prostredníctvom `lint-staged` pri potvrdení zmien (2 medzery, bodkočiarky, dvojité úvodzovky, šírka 100 znakov, koncové čiarky podľa es5)
- **TypeScript** — Všetok kód v `src/` používa `.ts`/`.tsx`; `open-sse/` používa `.ts`/`.js`; dokumentujte pomocou TSDoc (`@param`, `@returns`, `@throws`)
- **Žiadne `eval()`** — ESLint vynucuje `no-eval`, `no-implied-eval`, `no-new-func`
- **Validácia pomocou Zod** — Na validáciu všetkých vstupov API používajte schémy Zod v4
- **Pomenovanie**: Súbory = camelCase/kebab-case, komponenty = PascalCase, konštanty = UPPER_SNAKE

### Spracovanie chýb / prázdne bloky catch

Nikdy nenechávajte `catch` bez vysvetlenia. Zaraďte ho do jednej z dvoch kategórií (tým sa
zavádza do praxe striktné pravidlo „nikdy potichu neprehĺtať chyby v streamoch SSE“):

- **Zámerné (naše vlastné čistenie/telemetria typu best-effort)** — zlyhanie je v tomto prípade očakávané a
  neškodné; pridajte jednoriadkový komentár s odôvodnením, bez zaznamenávania do logu (táto konvencia sa vyhýba
  šumu spôsobenému zaznamenávaním každej požiadavky).

  ```ts
  } catch {} // zatvorenie už zatvoreného kontroléra po odpojení klienta je očakávané
  ```

- **Má sa zaznamenať do logu (externý kód/kód poskytnutý volajúcim alebo prehltnutie chyby mení tok riadenia)** — blok
  catch zachovajte (nikdy mu nedovoľte prerušiť stream), ale vypíšte kontextové `console.debug`/`warn`, aby sa
  zlyhanie dalo odhaliť.

  ```ts
  } catch (e) {
    console.debug("[STREAM] chyba callbacku onFailure:", e);
  }
  ```

Aplikované príklady nájdete v `open-sse/utils/stream.ts` a `open-sse/utils/streamHandler.ts`.

---

## Štruktúra projektu

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Stránky ovládacieho panela (23 sekcií)
│   ├── api/                # Trasy API (51 adresárov)
│   └── login/              # Stránky autentifikácie (.tsx)
├── domain/                 # Modul pravidiel (policyEngine, comboResolver, costRules atď.)
├── lib/                    # Základná obchodná logika (.ts)
│   ├── a2a/                # Server protokolu Agent-to-Agent v0.3
│   ├── acp/                # Register protokolu Agent Communication Protocol
│   ├── compliance/         # Modul pravidiel súladu
│   ├── db/                 # Doménové moduly SQLite + 130 migrácií
│   ├── memory/             # Trvalá konverzačná pamäť
│   ├── oauth/              # Poskytovatelia, služby a pomocné nástroje OAuth
│   ├── skills/             # Rozšíriteľný framework zručností
│   ├── usage/              # Sledovanie používania a výpočet nákladov
│   └── localDb.ts          # Iba vrstva opätovných exportov — nikdy sem nepridávajte logiku
├── middleware/              # Middleware požiadaviek (promptInjectionGuard)
├── mitm/                   # Proxy MITM (certifikát, DNS, smerovanie cieľa)
├── shared/
│   ├── components/         # Komponenty React (.tsx)
│   ├── constants/          # Definície poskytovateľov (329), rozsahy MCP, 19 stratégií smerovania
│   ├── utils/              # Istič, sanitizátor, pomocné nástroje autentifikácie
│   └── validation/         # Schémy Zod v4
└── sse/                    # Reťazec spracovania proxy SSE

open-sse/                   # Pracovný priestor @omniroute/open-sse
├── executors/              # 89 modulov implementácie vykonávačov
├── handlers/               # 11 obslužných modulov požiadaviek (chat, odpovede, vnorenia, obrázky atď.)
├── mcp-server/             # Server MCP (110 jedinečných nástrojov, 3 transporty, 33 rozsahov)
├── services/               # 178 služieb najvyššej úrovne (combo, autoCombo, rateLimitManager atď.)
├── translator/             # Prevodníky formátov (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Transformátor Responses API
└── utils/                  # 22 pomocných modulov (stream, TLS, proxy, zaznamenávanie do logu)

electron/                   # Multiplatformová desktopová aplikácia Electron

tests/
├── unit/                   # Spúšťač testov Node.js (1 574 testovacích súborov)
├── integration/            # Integračné testy
├── e2e/                    # Testy Playwright
├── security/               # Bezpečnostné testy
├── translator/             # Testy špecifické pre prevodník
└── load/                   # Záťažové testy

docs/
├── adr/                     # Záznamy architektonických rozhodnutí
├── architecture/            # Architektúra a odolnosť systému
├── comparison/              # OmniRoute v porovnaní s alternatívami
├── compression/             # Návody a pravidlá kompresie
├── dev/                     # Vývojárske príručky
├── diagrams/                # Diagramy architektúry
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # Používateľská príručka, Docker, nastavenie, riešenie problémov
├── i18n/                    # Internacionalizované preklady README
├── marketing/               # Marketingové materiály
├── ops/                     # Nasadenie, proxy, pokrytie, vydania
├── providers/               # Dokumentácia špecifická pre poskytovateľov
├── reference/               # Referenčná dokumentácia API, premenné prostredia, nástroje CLI, bezplatné úrovne
├── releases/                # Poznámky k vydaniam
├── routing/                 # Modul automatických kombinácií, opakované prehrávanie uvažovania
├── screenshots/             # Snímky obrazovky ovládacieho panela
├── security/                # Ochranné mechanizmy, súlad, skryté fungovanie, tokeny
└── specs/                   # Špecifikácie návrhu
```

---

## Pridanie nového poskytovateľa

### Krok 1: Registrácia konštánt poskytovateľa

Pridajte ich do `src/shared/constants/providers.ts` — pri načítaní modulu sa overujú pomocou Zod.

### Krok 2: Pridanie vykonávacieho modulu (ak je potrebná vlastná logika)

Vytvorte vykonávací modul v `open-sse/executors/your-provider.ts`, ktorý rozširuje základný vykonávací modul.

### Krok 3: Pridanie prekladača (ak nejde o formát OpenAI)

Vytvorte prekladače požiadaviek a odpovedí v `open-sse/translator/`.

### Krok 4: Pridanie konfigurácie OAuth (ak sa používa OAuth)

Pridajte prihlasovacie údaje OAuth do `src/lib/oauth/constants/oauth.ts` a službu do `src/lib/oauth/services/`.

Ak upstream poskytovateľ distribuuje verejný OAuth client_id/secret alebo kľúč Firebase Web API vo svojom verejnom CLI / balíku pre prehliadač, **nevkladajte** ho ako reťazcový literál. Použite `resolvePublicCred()` z `open-sse/utils/publicCreds.ts` a pridajte maskovaný bajtový záznam do `EMBEDDED_DEFAULTS`. Úplný povinný pracovný postup je zdokumentovaný v súbore [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

V obslužných moduloch/vykonávacích moduloch musia chybové hlásenia odosielané klientovi prejsť cez `buildErrorBody()` / `sanitizeErrorMessage()` z `open-sse/utils/error.ts` — nikdy nevkladajte nespracované `err.stack` ani `err.message` do tela Response. Pozrite si [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Krok 5: Registrácia modelov

Pridajte definície modelov do `open-sse/config/providerRegistry.ts`.

### Krok 6: Pridanie testov

Napíšte jednotkové testy v `tests/unit/`, ktoré pokrývajú minimálne:

- Registráciu poskytovateľa
- Preklad požiadaviek/odpovedí
- Spracovanie chýb

---

## Kontrolný zoznam pull requestu

- [ ] Testy sú úspešné (`npm test`)
- [ ] Kontrola lintovania je úspešná (`npm run lint`)
- [ ] Zostavenie je úspešné (`npm run build`)
- [ ] Pre nové verejné funkcie a rozhrania boli pridané typy TypeScript
- [ ] Žiadne napevno zadané tajné údaje ani záložné hodnoty
- [ ] Verejné upstream prihlasovacie údaje sú vložené pomocou `resolvePublicCred()` (pozrite si [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), nikdy nie ako literály
- [ ] Chybové odpovede prechádzajú cez `buildErrorBody()` / `sanitizeErrorMessage()` — telá odpovedí neobsahujú nespracované trasovania zásobníka (pozrite si [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Shellové príkazy (`exec` / `spawn`) odovzdávajú hodnoty za behu prostredníctvom `env`, nie pomocou interpolácie reťazcov
- [ ] Všetky vstupy sú overené pomocou schém Zod
- [ ] Pre zmeny viditeľné používateľom bol do `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` pridaný **fragment** zoznamu zmien (pozrite si [`changelog.d/README.md`](./changelog.d/README.md)) — **neupravujte** priamo `CHANGELOG.md`; fragmenty sa agregujú pri vydaní a medzi pull requestmi nikdy nevytvárajú konflikty
- [ ] Dokumentácia bola aktualizovaná (ak je to relevantné)
- [ ] Neboli vytvorené žiadne nové upozornenia CodeQL / Secret-Scanning alebo bolo každé z nich zamietnuté s technickým odôvodnením odkazujúcim na príslušný dokument v `docs/security/`
- [ ] Trasy, ktoré spúšťajú podriadené procesy (`/api/mcp/`, `/api/cli-tools/runtime/`), sú klasifikované ako `isLocalOnlyPath()` v `src/server/authz/routeGuard.ts` — pozrite si [Pevné pravidlo č. 15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Správy commitov neobsahujú riadky `Co-Authored-By` — commity musia byť uvedené výlučne pod identitou Git vlastníka repozitára (Pevné pravidlo č. 16)

---

## Vydávanie verzií

Vydávanie verzií sa spravuje prostredníctvom pracovného postupu `/generate-release`. Keď sa vytvorí nové vydanie GitHub Release, balík sa **automaticky publikuje do npm** prostredníctvom GitHub Actions.

Pri nasadeniach na VPS použite `npm run build:release` (nie `npm run build`) — vykoná čisté
zostavenie, pripraví balík v adresári `dist/` a zapíše kontrolný súbor `dist/BUILD_SHA`.
Potom použite zručnosti `/deploy-vps-*-cc`, ktoré pomocou rsync synchronizujú adresár `dist/` so vzdialeným adresárom `app/`.

---

## Získanie pomoci

- **Architektúra**: Pozrite si [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **Referenčná dokumentácia API**: Pozrite si [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Bezpečnostná dokumentácia**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Prevádzková dokumentácia**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Problémy**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADR**: Záznamy o architektonických rozhodnutiach nájdete v `docs/adr/`
