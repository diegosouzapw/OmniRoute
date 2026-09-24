# Contributing to OmniRoute (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Hvala vam na interesovanju za doprinos! Ovaj vodič pokriva sve što vam je potrebno za početak.

Za zvanični workflow po promjeni, počnite sa
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md). On mapira promjene providera, rutiranja,
UI/UX-a, i18n-a, CLI-ja, baze podataka i build/deploy procesa na njihove ugovore, fokusirane testove, CI
pokrivenost i korake usklađivanja.

---

## Setup za razvoj

### Preduslovi

- **Node.js** `>=22.22.3 <23`, ili `>=24.0.0 <27` (preporučeno: 24 LTS)
- **npm** 10+

> **Korisnici npm v11+ (Node 24+):** Nakon `npm install`, provjerite da li su nativni moduli instalirani:
> `node -e "require('better-sqlite3')"`. Ako ne uspije sa `MODULE_NOT_FOUND`,
> pokrenite `npm approve-scripts better-sqlite3 && npm install`. Pogledajte
> [Troubleshooting](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Kloniranje i instalacija

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Environment varijable

```bash
# Kreirajte vaš .env iz šablona
cp .env.example .env

# Generišite potrebne tajne (secrets)
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Ključne varijable za razvoj:

| Varijabla              | Default za razvoj        | Opis                      |
| ---------------------- | ------------------------ | ------------------------- |
| `PORT`                 | `20128`                  | Port servera              |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | Bazni URL za frontend     |
| `JWT_SECRET`           | (generišite iznad)       | JWT tajna za potpisivanje |
| `INITIAL_PASSWORD`     | `CHANGEME`               | Lozinka za prvi login     |
| `APP_LOG_LEVEL`        | `info`                   | Nivo detaljnosti logova   |

### Podešavanja Dashboard-a

Dashboard nudi UI prekidače za funkcionalnosti koje se takođe mogu konfigurisati putem environment varijabli:

| Lokacija podešavanja | Prekidač           | Opis                               |
| -------------------- | ------------------ | ---------------------------------- |
| Settings → Advanced  | Debug Mode         | Omogući debug logove zahtjeva (UI) |
| Settings → General   | Sidebar Visibility | Prikaži/sakrij sekcije bočne trake |

Ova podešavanja se čuvaju u bazi podataka i ostaju sačuvana nakon ponovnog pokretanja, nadjačavajući defaultne vrijednosti env varijabli kada su postavljena.

### Lokalno pokretanje

```bash
# Režim razvoja (hot reload)
npm run dev

# Production build
npm run build    # next build → .build/next/ zatim assembleStandalone → dist/
npm run start

# Brza kompilacija samo za backend/API za doprinose
npm run build:contributor

# Release build (čisti rebuild + HEAD sentinel — obavezno za deploy)
npm run build:release   # rm -rf .build dist && build + zapisuje dist/BUILD_SHA

# Uobičajena konfiguracija porta
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

`build:contributor` vrši samo validaciju kompilacije: on ne sastavlja standalone
distribuciju niti build-uje opcionalne nativne assete za pakovanje. Koristite regularni production build kada
trebate validirati bundle spreman za slanje.

### Layout build izlaza

| Direktorijum | Sadržaj                                                                       | Praćeno |
| ------------ | ----------------------------------------------------------------------------- | ------- |
| `src/`       | Izvorni kod aplikacije (TypeScript / TSX)                                     | Da      |
| `.build/`    | Intermedijeri — `next build` izlaz (gitignored, `distDir = .build/next`)      | Ne      |
| `dist/`      | Bundle spreman za slanje — sastavljen putem `assembleStandalone` (gitignored) | Ne      |

Build pipeline se odvija u jednom prolazu:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js izlaz)
  └─ assembleStandalone()                 (kopira standalone + static + public + native assete)
       └─ izlaz: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` dodatno prvo čisti oba direktorijuma i zapisuje
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) kao sentinel integriteta deploy-a.

`npm run build:contributor` koristi build profil samo za backend. On privremeno zamjenjuje
dashboard UI fajlove tokom build-a, zadržava API route handlere i vraća originalne fajlove
nakon build-a. Koristite `npm run build` za promjene koje utiču na dashboard UI ili za potpunu
validaciju release-a; contributor profil nije zamjena za release build.

> **Napomena za VPS deploy:** udaljeni direktorijum slika `/usr/lib/node_modules/omniroute/app/`
> ostaje nepromijenjen. Deploy skill-ovi rsync-uju sadržaj `dist/` u njega.
> Samo je putanja build izlaza unutar repozitorijuma promijenjena (`app/` → `dist/`).

Defaultni URL-ovi:

- **Dashboard**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git Workflow

> ⚠️ **NIKADA ne commit-ujte direktno u `main`.** Uvijek koristite feature grane.
>
> **PR baza:** ciljajte aktivnu `release/vX.Y.Z` granu (ne `main`). Pogledajte
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) za
> model release-per-branch + tag-at-ship.

```bash
# Grana od vrha aktivnog release-a (primjer: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... unesite izmjene ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Otvorite Pull Request sa bazom = release/v3.8.49
```

### Imenovanje grana

| Prefiks     | Svrha                      |
| ----------- | -------------------------- |
| `feat/`     | Nove funkcionalnosti       |
| `fix/`      | Ispravci bugova            |
| `refactor/` | Restrukturiranje koda      |
| `docs/`     | Izmjene dokumentacije      |
| `test/`     | Dodavanje/ispravci testova |
| `chore/`    | Tooling, CI, zavisnosti    |

### Poruke commit-a

Pratite [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Scope-ovi (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Pokretanje testova

```bash
# Svi testovi (unit + vitest + ecosystem + e2e)
npm run test:all

# Pojedinačni test fajl (Node.js native test runner — većina testova koristi ovo)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Samo unit testovi pogođeni vašom izmjenom (isti TIA selektor kao CI gate, #8084)
npm run test:scoped            # izmjene u posljednjem commit-u (ili radnom stablu)
npm run test:scoped:staged     # samo staged izmjene — dobro se kombinuje sa pre-commit pokretanjem
npm run test:scoped:full       # prvo ponovo izgradite import-graph mapu (nakon dodavanja/pomjeranja fajlova)
# Exit 1 + "run the full suite" znači da je promijenjen hub fajl (tsconfig, package.json, …) ili
# nemapirani izvor — selektor radi "fail-safe", nikada ne preskače tiho.

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# E2E testovi (zahtijeva Playwright)
npm run test:e2e

# Protocol clients E2E (MCP transports, A2A)
npm run test:protocols:e2e

# Testovi kompatibilnosti ekosistema
npm run test:ecosystem

# Coverage gate: 60% statements/lines/functions/branches
npm run test:coverage
npm run coverage:report

# Lint + provjera formata
npm run lint
npm run check

# Gated real-upstream combo smoke (zahtijeva VPS pristup + realne provider kredite)
# Kontaktira STVARNE provajdere — košta malo. NIKADA se ne pokreće u CI. Čisto preskače bez gate-a.
# Zahtijeva: ssh root@192.168.0.15 pristup (povlači read-only DB snapshot sa VPS-a).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Phase-3 VPS live smoke — obični Node ESM skriptovi, direktno kontaktiraju .15 server.
# Zahtijeva: ssh root@192.168.0.15 pristup (combos kreirani/obrisani putem SSH sqlite).
# Kontaktira STVARNE provajdere (mali trošak). Kreira/briše samo __live_test__* combos. NIKADA se ne pokreće u CI.
# REQUIRE_API_KEY=false na .15 tako da API ključ nije potreban, ali poštuje COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY ako su postavljeni.
npm run test:combo:live:vps              # 7 HTTP scenarija (priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # dodaje realan cross-provider failover scenario (ukupno 8)
```

Napomene o coverage-u:

- `npm run test:coverage` mjeri coverage izvora za glavni unit test suite, isključuje `tests/**`, i uključuje `open-sse/**`
- Pull requestovi moraju održati coverage gate na **60%+** statements/lines/functions/branches
- Ako PR mijenja produkcijski kod u `src/`, `open-sse/`, `electron/`, ili `bin/`, mora dodati ili ažurirati automatizovane testove u istom PR-u
- `npm run coverage:report` ispisuje detaljan izvještaj po fajlovima iz posljednjeg coverage pokretanja
- `npm run test:coverage:legacy` čuva stariju metriku za historijsko poređenje
- Pogledajte `docs/ops/COVERAGE_PLAN.md` za roadmap faznog poboljšanja coverage-a

### Zahtjevi za Pull Request

Prije otvaranja PR-a, koristite
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) kako biste pokrenuli fokusiranu petlju za
ono što ste promijenili. Cjelokupni unit suite (4 CI sharda), Vitest, **60%+** coverage gate i
produkcijski build su odgovornost CI-ja — njihovo lokalno pokretanje ne daje dodatne informacije koje
PR provjere već neće pružiti, a na slabijim mašinama može opteretiti host (#8084):

- Pokrenite test fajlove koji pokrivaju vašu izmjenu: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Pokrenite `npm run lint`
- Uključite ili ažurirajte automatizovane testove u istom PR-u kad god se mijenja produkcijski kod
- Uključite promijenjene ili dodane test fajlove u opis PR-a kada je produkcijski kod promijenjen
- Provjerite SonarQube rezultat na PR-u kada su project secrets konfigurisani u CI-ju

Trenutni status testova: **122 unit test fajla** koji pokrivaju:

- Provider translatore i konverziju formata
- Rate limiting, circuit breaker i resilience
- Semantički cache, idempotencija, praćenje progresa
- Operacije baze podataka i šeme (21 DB modul)
- OAuth flow-ovi i autentifikacija
- Validacija API endpoint-a (Zod v4)
- MCP server alati i provođenje scope-a
- Sistemi memorije i vještina (Memory and Skills)

---

## Stil koda

- **ESLint** — Pokrenite `npm run lint` prije commit-ovanja
- **Prettier** — Automatsko formatiranje putem `lint-staged` pri commit-ovanju (2 razmaka, tačka-zarez, dvostruki navodnici, širina od 100 znakova, es5 trailing zarezi)
- **TypeScript** — Sav kod u `src/` koristi `.ts`/`.tsx`; `open-sse/` koristi `.ts`/`.js`; dokumentujte pomoću TSDoc-a (`@param`, `@returns`, `@throws`)
- **Bez `eval()`** — ESLint nameće `no-eval`, `no-implied-eval`, `no-new-func`
- **Zod validacija** — Koristite Zod v4 sheme za svu validaciju API ulaza
- **Imenovanje**: Datoteke = camelCase/kebab-case, komponente = PascalCase, konstante = UPPER_SNAKE

### Obrada grešaka / prazni catch blokovi

Nikada ne ostavljajte `catch` neobjašnjenim. Klasifikujte ga u jednu od dvije kategorije (operacionalizuje strogo pravilo "nikada ne gutajte greške u tišini u SSE stream-ovima"):

- **Namjerno (naše vlastito čišćenje/telemetrija na principu "best-effort")** — ovdje je neuspjeh očekivan i bezopasan; dodajte komentar sa objašnjenjem u jednoj liniji, bez logovanja (logovanje pri svakom zahtjevu je upravo onaj šum koji ova konvencija izbjegava).

  ```ts
  } catch {} // zatvaranje već zatvorenog kontrolera nakon diskonekcije klijenta je očekivano
  ```

- **Treba logovati (eksterni kod/kod koji šalje pozivač, ili ako gutanje greške mijenja tok kontrole)** — zadržite catch (nikada ne dopustite da prekine stream), ali emitujte kontekstualni `console.debug`/`warn` kako bi se neuspjeh mogao otkriti.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

Pogledajte `open-sse/utils/stream.ts` i `open-sse/utils/streamHandler.ts` za primjere primjene.

---

## Struktura projekta

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard stranice (23 sekcije)
│   ├── api/                # API rute (51 direktorij)
│   └── login/              # Auth stranice (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules, itd.)
├── lib/                    # Core poslovna logika (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol registar
│   ├── compliance/         # Compliance policy engine
│   ├── db/                 # SQLite domain moduli + 130 migracija
│   ├── memory/             # Persistent konverzacijska memorija
│   ├── oauth/              # OAuth provajderi, servisi i utility funkcije
│   ├── skills/             # Proširivi skill framework
│   ├── usage/              # Praćenje upotrebe i kalkulacija troškova
│   └── localDb.ts          # Samo sloj za re-export — nikada ovdje ne dodajte logiku
├── middleware/              # Middleware za zahtjeve (promptInjectionGuard)
├── mitm/                   # MITM proxy (cert, DNS, target routing)
├── shared/
│   ├── components/         # React komponente (.tsx)
│   ├── constants/          # Definicije provajdera (329), MCP scope-ovi, 19 strategija rutiranja
│   ├── utils/              # Circuit breaker, sanitizer, auth helperi
│   └── validation/         # Zod v4 sheme
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 89 modula za implementaciju executora
├── handlers/               # 11 handlera za zahtjeve (chat, responses, embeddings, images, itd.)
├── mcp-server/             # MCP server (110 jedinstvenih alata, 3 transporta, 33 scope-a)
├── services/               # 178 top-level servisa (combo, autoCombo, rateLimitManager, itd.)
├── translator/             # Translatori formata (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # 22 utility modula (stream, TLS, proxy, logging)

electron/                   # Electron desktop aplikacija (cross-platform)

tests/
├── unit/                   # Node.js test runner (1,574 test datoteke)
├── integration/            # Integracioni testovi
├── e2e/                    # Playwright testovi
├── security/               # Sigurnosni testovi
├── translator/             # Specifični testovi za translator
└── load/                   # Load testovi

docs/
├── adr/                     # Architecture Decision Records
├── architecture/            # Sistemska arhitektura i otpornost
├── comparison/              # OmniRoute naspram alternativa
├── compression/             # Vodiči i pravila kompresije
├── dev/                     # Vodiči za razvoj
├── diagrams/                # Arhitektonski dijagrami
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # Korisnički vodič, Docker, setup, rješavanje problema
├── i18n/                    # Internacionalizovani prevodi README-a
├── marketing/               # Marketinški materijali
├── ops/                     # Deployment, proxy, coverage, release-ovi
├── providers/               # Dokumentacija specifična za provajdere
├── reference/               # API referenca, env varijable, CLI alati, besplatni nivoi
├── releases/                # Bilješke o verzijama (release notes)
├── routing/                 # Auto-combo engine, reasoning replay
├── screenshots/             # Screenshot-ovi dashboarda
├── security/                # Guardrails, compliance, stealth, tokeni
└── specs/                   # Design specifikacije
```

---

## Dodavanje novog providera

### Korak 1: Registracija konstanti providera

Dodajte u `src/shared/constants/providers.ts` — Zod-validirano prilikom učitavanja modula.

### Korak 2: Dodavanje executora (ako je potrebna prilagođena logika)

Kreirajte executor u `open-sse/executors/your-provider.ts` koji proširuje bazni executor.

### Korak 3: Dodavanje translatora (ako format nije OpenAI)

Kreirajte translate-ore za zahtjeve/odgovore u `open-sse/translator/`.

### Korak 4: Dodavanje OAuth konfiguracije (ako se bazira na OAuth-u)

Dodajte OAuth kredencijale u `src/lib/oauth/constants/oauth.ts` i servis u `src/lib/oauth/services/`.

Ako upstream provider distribuira javni OAuth client_id/secret ili Firebase Web API ključ unutar svog javnog CLI-ja / browser bundle-a, **nemojte** ga ugrađivati kao string literal. Koristite `resolvePublicCred()` iz `open-sse/utils/publicCreds.ts` i dodajte maskirani byte unos u `EMBEDDED_DEFAULTS`. Kompletan obavezni workflow je dokumentovan u [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

Unutar handlera/executora, poruke o greškama koje stižu do klijenta moraju proći kroz `buildErrorBody()` / `sanitizeErrorMessage()` iz `open-sse/utils/error.ts` — nikada ne stavljajte sirovi `err.stack` ili `err.message` u tijelo Response-a. Pogledajte [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Korak 5: Registracija modela

Dodajte definicije modela u `open-sse/config/providerRegistry.ts`.

### Korak 6: Dodavanje testova

Napišite unit testove u `tests/unit/` koji pokrivaju najmanje:

- Registraciju providera
- Translaciju zahtjeva/odgovora
- Obradu grešaka

---

## Pull Request Checklist

- [ ] Testovi prolaze (`npm test`)
- [ ] Linting prolazi (`npm run lint`)
- [ ] Build uspijeva (`npm run build`)
- [ ] TypeScript tipovi su dodani za nove javne funkcije i interfejse
- [ ] Nema hardkodiranih tajni (secrets) ili fallback vrijednosti
- [ ] Javni upstream kredencijali su ugrađeni putem `resolvePublicCred()` (vidi [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), nikada kao literali
- [ ] Odgovori o greškama prolaze kroz `buildErrorBody()` / `sanitizeErrorMessage()` — bez sirovih stack trace-ova u tijelima odgovora (vidi [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Shell komande (`exec` / `spawn`) prenose runtime vrijednosti putem `env`, a ne putem string interpolacije
- [ ] Svi inputi su validirani Zod shemama
- [ ] **Fragment** changeloga je dodan pod `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` za promjene vidljive korisnicima (vidi [`changelog.d/README.md`](./changelog.d/README.md)) — **nemojte** direktno uređivati `CHANGELOG.md`; fragmenti se agregiraju prilikom release-a i nikada ne dolazi do konflikata između PR-ova
- [ ] Dokumentacija je ažurirana (ako je primjenjivo)
- [ ] Nema novih CodeQL / Secret-Scanning upozorenja, ili je svako od njih odbijeno uz tehničko obrazloženje koje referencira relevantni `docs/security/` dokument
- [ ] Rute koje pokreću child procese (`/api/mcp/`, `/api/cli-tools/runtime/`) su klasifikovane kao `isLocalOnlyPath()` u `src/server/authz/routeGuard.ts` — vidi [Hard Rule #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Nema `Co-Authored-By` trailera u commit porukama — commitovi moraju pojaviti se isključivo pod Git identitetom vlasnika repozitorija (Hard Rule #16)

---

## Objavljivanje (Releasing)

Objave se upravljaju putem `/generate-release` workflow-a. Kada se kreira novi GitHub Release, paket se **automatski objavljuje na npm** putem GitHub Actions.

Za VPS deploymente, koristite `npm run build:release` (ne `npm run build`) — on vrši čisto ponovno građenje (Rebuild), sastavlja bundle u `dist/` i zapisuje `dist/BUILD_SHA` sentinel.
Zatim koristite `/deploy-vps-*-cc` skill-ove koji rsync-uju `dist/` u udaljeni `app/` direktorij.

---

## Pomoć

- **Arhitektura**: Pogledajte [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **API Referenca**: Pogledajte [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Dokumentacija o sigurnosti**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Ops dokumentacija**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Problemi (Issues)**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADRs**: Pogledajte `docs/adr/` za zapise o arhitektonskim odlukama (architectural decision records)
