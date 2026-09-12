# Contributing to OmniRoute (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Hvala vam na interesu za doprinos! Ovaj vodič pokriva sve što vam je potrebno za početak.

Za službeni tijek rada po promjeni, počnite s
[Zlatnom stazom doprinosa](docs/ops/CONTRIBUTION_GOLDEN_PATH.md). Ona mapira promjene pružatelja, usmjeravanja,
UI/UX-a, i18n-a, CLI-ja, baze podataka i izgradnje/postavljanja na njihove ugovore, fokusirane testove, CI
pokrivenost i korake usklađivanja.

---

## Postavljanje razvojnog okruženja

### Preduvjeti

- **Node.js** `>=22.22.3 <23`, ili `>=24.0.0 <27` (preporučeno: 24 LTS)
- **npm** 10+

> **Korisnici npm v11+ (Node 24+):** Nakon `npm install`, provjerite jesu li izvorni moduli instalirani:
> `node -e "require('better-sqlite3')"`. Ako ne uspije s greškom `MODULE_NOT_FOUND`,
> pokrenite `npm approve-scripts better-sqlite3 && npm install`. Pogledajte
> [Rješavanje problema](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Kloniranje i instalacija

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Varijable okoline

```bash
# Stvorite svoju .env datoteku iz predloška
cp .env.example .env

# Generirajte potrebne tajne ključeve
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Ključne varijable za razvoj:

| Varijabla              | Zadana vrijednost za razvoj | Opis                            |
| ---------------------- | --------------------------- | ------------------------------- |
| `PORT`                 | `20128`                     | Poslužiteljski port             |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`    | Osnovni URL za sučelje          |
| `JWT_SECRET`           | (generirajte gore)          | Tajni ključ za JWT potpisivanje |
| `INITIAL_PASSWORD`     | `CHANGEME`                  | Lozinka za prvu prijavu         |
| `APP_LOG_LEVEL`        | `info`                      | Razina detaljnosti zapisnika    |

### Postavke nadzorne ploče

Nadzorna ploča pruža UI prekidače za značajke koje se također mogu konfigurirati putem varijabli okoline:

| Lokacija postavke   | Prekidač                    | Opis                                                     |
| ------------------- | --------------------------- | -------------------------------------------------------- |
| Postavke → Napredno | Način otklanjanja pogrešaka | Omogući zapisnike zahtjeva za otklanjanje pogrešaka (UI) |
| Postavke → Općenito | Vidljivost bočne trake      | Prikaži/sakrij sekcije bočne trake                       |

Ove postavke pohranjuju se u bazu podataka i zadržavaju se nakon ponovnog pokretanja, nadjačavajući zadane vrijednosti varijabli okoline kada su postavljene.

### Pokretanje lokalno

```bash
# Razvojni način rada (vruće ponovno učitavanje)
npm run dev

# Produkcijska izgradnja
npm run build    # next build → .build/next/ zatim assembleStandalone → dist/
npm run start

# Brzo kompajliranje samo pozadinskog dijela/API-ja za promjene suradnika
npm run build:contributor

# Izgradnja za objavu (čista ponovna izgradnja + HEAD sentinel — obavezno za postavljanje)
npm run build:release   # rm -rf .build dist && izgradnja + upisuje dist/BUILD_SHA

# Uobičajena konfiguracija porta
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Izgradnja za suradnike izvodi samo provjeru kompajliranja: ne sastavlja samostalnu
distribuciju niti gradi neobavezne izvorne pakete. Koristite regularnu produkcijsku izgradnju kada
trebate provjeriti paket spreman za isporuku.

### Raspored izlaznih direktorija izgradnje

| Direktorij | Sadržaj                                                                  | Praćen |
| ---------- | ------------------------------------------------------------------------ | ------ |
| `src/`     | Izvorni kod aplikacije (TypeScript / TSX)                                | Da     |
| `.build/`  | Međuproizvodi — izlaz `next build` (gitignored, `distDir = .build/next`) | Ne     |
| `dist/`    | Paket spreman za isporuku — sastavlja `assembleStandalone` (gitignored)  | Ne     |

Cjevovod izgradnje je jedan prolaz:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js izlaz)
  └─ assembleStandalone()                 (kopira standalone + static + public + izvorne resurse)
       └─ izlaz: dist/                    (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` dodatno čisti oba direktorija prije toga i upisuje
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) kao sentinel za integritet postavljanja.

`npm run build:contributor` koristi profil izgradnje samo za pozadinski dio. Privremeno zamjenjuje
datoteke UI nadzorne ploče stub datotekama tijekom izgradnje, zadržava upravljače API ruta i vraća izvorne datoteke
nakon izgradnje. Koristite `npm run build` za promjene koje utječu na UI nadzorne ploče ili za potpunu
provjeru objave; profil za suradnike nije zamjena za izgradnju objave.

> **Napomena za postavljanje na VPS:** udaljeni direktorij slike `/usr/lib/node_modules/omniroute/app/`
> ostaje nepromijenjen. Vještine postavljanja sinkroniziraju sadržaj `dist/` u njega.
> Samo je putanja izlaza izgradnje u repozitoriju premještena (`app/` → `dist/`).

Zadani URL-ovi:

- **Nadzorna ploča**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git Radni Tijek

> ⚠️ **NIKAD ne commita direktno na `main`.** Uvijek koristite feature grane.
>
> **Baza PR-a:** ciljajte na aktivnu `release/vX.Y.Z` granu (ne `main`). Pogledajte
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) za model jedne release grane po izdanju + označavanja pri isporuci.

```bash
# Granaj od aktivnog vrha release grane (primjer: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... unesite izmjene ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Otvorite Pull Request s bazom = release/v3.8.49
```

### Imenovanje Grana

| Prefiks     | Svrha                      |
| ----------- | -------------------------- |
| `feat/`     | Nove funkcionalnosti       |
| `fix/`      | Ispravci grešaka           |
| `refactor/` | Restrukturiranje koda      |
| `docs/`     | Izmjene dokumentacije      |
| `test/`     | Dodavanje/ispravci testova |
| `chore/`    | Alati, CI, ovisnosti       |

### Poruke Commita

Slijedite [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Opsezi (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Pokretanje Testova

```bash
# Svi testovi (unit + vitest + ecosystem + e2e)
npm run test:all

# Jedna datoteka s testovima (Node.js nativni pokretač testova — većina testova koristi ovo)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Samo unit testovi na koje utječe vaša izmjena (isti TIA selektor kao CI prolaznik, #8084)
npm run test:scoped            # izmjene u zadnjem commitu (ili radnom stablu)
npm run test:scoped:staged     # samo staged izmjene — dobro se kombinira s pre-commit pokretanjem
npm run test:scoped:full       # prvo ponovo izgradi mapu import-grafa (nakon dodavanja/premještanja datoteka)
# Izlaz 1 + "pokrenite cijelu kolekciju" znači da se promijenila hub datoteka (tsconfig, package.json, …) ili
# nemapiran izvor — selektor sigurno ne uspijeva, nikad tiho ne preskače.

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# E2E testovi (zahtijeva Playwright)
npm run test:e2e

# E2E testovi protokolarnih klijenata (MCP transporti, A2A)
npm run test:protocols:e2e

# Testovi kompatibilnosti ekosustava
npm run test:ecosystem

# Prag pokrivenosti: 60% naredbi/redaka/funkcija/grana
npm run test:coverage
npm run coverage:report

# Provjera lintanja + formatiranja
npm run lint
npm run check

# Zaštićeni real-upstream combo smoke (zahtijeva VPS pristup + stvarne kredite pružatelja)
# Pogađa STVARNE pružatelje — malo košta. NIKAD se ne pokreće u CI-u. Preskače čisto bez prolaznika.
# Potrebno: ssh root@192.168.0.15 pristup (učitava snimku baze podataka samo za čitanje s VPS-a).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Phase-3 VPS live smoke — jednostavne Node ESM skripte, pogađaju živi .15 poslužitelj direktno.
# Potrebno: ssh root@192.168.0.15 pristup (comboi se stvaraju/brišu putem SSH sqlite).
# Pogađa STVARNE pružatelje (mali trošak). Stvara/briše samo __live_test__* comboe. NIKAD se ne pokreće u CI-u.
# REQUIRE_API_KEY=false na .15 pa nije potreban API ključ, ali poštuje COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY ako su postavljeni.
npm run test:combo:live:vps              # 7 HTTP scenarija (priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # dodaje stvarni cross-provider failover scenarij (ukupno 8)
```

Napomene o pokrivenosti:

- `npm run test:coverage` mjeri pokrivenost izvornog koda za glavni skup unit testova, isključuje `tests/**` i uključuje `open-sse/**`
- Pull requestovi moraju održavati prag pokrivenosti na **60%+** naredbi/redaka/funkcija/grana
- Ako PR mijenja produkcijski kod u `src/`, `open-sse/`, `electron/` ili `bin/`, mora dodati ili ažurirati automatizirane testove u istom PR-u
- `npm run coverage:report` ispisuje detaljno izvješće po datotekama iz zadnjeg pokretanja pokrivenosti
- `npm run test:coverage:legacy` čuva stariju metriku za povijesnu usporedbu
- Pogledajte `docs/ops/COVERAGE_PLAN.md` za plan poboljšanja pokrivenosti u fazama

### Zahtjevi za Pull Request

Prije otvaranja PR-a, koristite
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) za pokretanje fokusiranog ciklusa za
ono što ste promijenili. Puni skup unit testova (4 CI sharda), Vitest, prag pokrivenosti **60%+** i
produkcijski build su odgovornost CI-a — lokalno pokretanje ne dodaje nikakav signal koji provjere PR-a već neće dati, a na manjim strojevima može zasititi host (#8084):

- Pokrenite testne datoteke koje pokrivaju vašu izmjenu: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Pokrenite `npm run lint`
- Uključite ili ažurirajte automatizirane testove u istom PR-u kad god se mijenja produkcijski kod
- Uključite izmijenjene ili dodane testne datoteke u opis PR-a kada se promijenio produkcijski kod
- Provjerite SonarQube rezultat na PR-u kada su tajne projekta konfigurirane u CI-u

Trenutni status testova: **122 unit testne datoteke** koje pokrivaju:

- Prevoditelje pružatelja i konverziju formata
- Ograničavanje brzine, circuit breaker i otpornost
- Semantički cache, idempotentnost, praćenje napretka
- Operacije s bazom podataka i shemu (21 DB modul)
- OAuth tokove i autentifikaciju
- Validaciju API krajnjih točaka (Zod v4)
- Alate MCP poslužitelja i provođenje opsega
- Sustave Memorije i Vještina

---

## Stil koda

- **ESLint** — Pokrenite `npm run lint` prije commitanja
- **Prettier** — Automatsko formatiranje putem `lint-staged` pri commitu (2 razmaka, točka-zarez, dvostruki navodnici, širina 100 znakova, es5 trailing zarezi)
- **TypeScript** — Sav kôd u `src/` koristi `.ts`/`.tsx`; `open-sse/` koristi `.ts`/`.js`; dokumentirajte uz TSDoc (`@param`, `@returns`, `@throws`)
- **Bez `eval()`** — ESLint provodi `no-eval`, `no-implied-eval`, `no-new-func`
- **Zod validacija** — Koristite Zod v4 sheme za svu validaciju API ulaznih podataka
- **Imenovanje**: Datoteke = camelCase/kebab-case, komponente = PascalCase, konstante = UPPER_SNAKE

### Rukovanje greškama / prazni catch blokovi

Nikada ne ostavljajte `catch` bez objašnjenja. Svrstajte ga u jednu od dvije kategorije (operacionalizira
strogo pravilo "nikada tiho ne gutajte greške u SSE streamovima"):

- **Namjerno (naše vlastito cleanup/telemetrija prema najboljim mogućnostima)** — neuspjeh ovdje je očekivan i
  bezopasan; dodajte jednolinirani komentar s obrazloženjem, bez logiranja (logiranje na svakom zahtjevu je
  buka koju ova konvencija izbjegava).

  ```ts
  } catch {} // zatvaranje već zatvorenog controllera nakon prekida veze s klijentom je očekivano
  ```

- **Treba logirati (vanjski/kod koji daje pozivatelj, ili gutanje mijenja kontrolni tok)** — zadržite
  catch (nikada ne dopustite da prekine stream) ali emitirajte kontekstualni `console.debug`/`warn` kako bi
  neuspjeh bio otkriven.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

Pogledajte `open-sse/utils/stream.ts` i `open-sse/utils/streamHandler.ts` za primijenjene primjere.

---

## Struktura projekta

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Stranice nadzorne ploče (23 sekcije)
│   ├── api/                # API rute (51 direktorij)
│   └── login/              # Stranice autentikacije (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules, itd.)
├── lib/                    # Osnovna poslovna logika (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protokol server
│   ├── acp/                # Agent Communication Protocol registar
│   ├── compliance/         # Engine politike usklađenosti
│   ├── db/                 # SQLite domenske module + 130 migracija
│   ├── memory/             # Trajno konverzacijsko pamćenje
│   ├── oauth/              # OAuth pružatelji, servisi i uslužni programi
│   ├── skills/             # Proširivi okvir vještina
│   ├── usage/              # Praćenje korištenja i izračun troškova
│   └── localDb.ts          # Samo sloj ponovnog izvoza — nikada ne dodavajte logiku ovdje
├── middleware/              # Međusloj zahtjeva (promptInjectionGuard)
├── mitm/                   # MITM proxy (certifikat, DNS, usmjeravanje cilja)
├── shared/
│   ├── components/         # React komponente (.tsx)
│   ├── constants/          # Definicije pružatelja (329), MCP opsezi, 19 strategija usmjeravanja
│   ├── utils/              # Circuit breaker, sanitizer, pomoćni programi za autentikaciju
│   └── validation/         # Zod v4 sheme
└── sse/                    # SSE proxy cjevovod

open-sse/                   # @omniroute/open-sse radni prostor
├── executors/              # 89 modula implementacije executora
├── handlers/               # 11 rukovatelja zahtjevima (chat, responses, embeddings, images, itd.)
├── mcp-server/             # MCP server (110 jedinstvenih alata, 3 transporta, 33 opsega)
├── services/               # 178 servisa najviše razine (combo, autoCombo, rateLimitManager, itd.)
├── translator/             # Prevoditelji formata (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # 22 modula uslužnih programa (stream, TLS, proxy, logiranje)

electron/                   # Electron desktop aplikacija (višeplatformska)

tests/
├── unit/                   # Node.js test runner (1.574 testnih datoteka)
├── integration/            # Integracijski testovi
├── e2e/                    # Playwright testovi
├── security/               # Sigurnosni testovi
├── translator/             # Testovi specifični za prevoditelje
└── load/                   # Testovi opterećenja

docs/
├── adr/                     # Zapisi o arhitektonskim odlukama
├── architecture/            # Arhitektura sustava i otpornost
├── comparison/              # OmniRoute vs alternative
├── compression/             # Vodiči i pravila kompresije
├── dev/                     # Vodiči za razvoj
├── diagrams/                # Dijagrami arhitekture
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # Korisnički vodič, Docker, postavljanje, rješavanje problema
├── i18n/                    # Internacionalizirani prijevodi README-a
├── marketing/               # Marketinški materijali
├── ops/                     # Implementacija, proxy, pokrivenost, izdanja
├── providers/               # Dokumentacija specifična za pružatelje
├── reference/               # API referenca, env varijable, CLI alati, besplatni planovi
├── releases/                # Bilješke o izdanjima
├── routing/                 # Auto-combo engine, ponavljanje zaključivanja
├── screenshots/             # Snimke zaslona nadzorne ploče
├── security/                # Zaštitne mjere, usklađenost, stealth, tokeni
└── specs/                   # Dizajnerske specifikacije
```

---

## Dodavanje Novog Pružatelja Usluge

### Korak 1: Registracija Konstanti Pružatelja

Dodajte u `src/shared/constants/providers.ts` — Zod-validacija se izvodi pri učitavanju modula.

### Korak 2: Dodavanje Izvršitelja (ako je potrebna prilagođena logika)

Stvorite izvršitelja u `open-sse/executors/your-provider.ts` nasljeđivanjem baznog izvršitelja.

### Korak 3: Dodavanje Prevoditelja (ako format nije OpenAI)

Stvorite prevoditelje zahtjeva/odgovora u `open-sse/translator/`.

### Korak 4: Dodavanje OAuth Konfiguracije (ako se temelji na OAuth-u)

Dodajte OAuth vjerodajnice u `src/lib/oauth/constants/oauth.ts` i uslugu u `src/lib/oauth/services/`.

Ako uzvodni pružatelj usluge distribuira javni OAuth `client_id`/tajnu ili Firebase Web API ključ unutar svog javnog CLI-ja / bundle-a za preglednik, **nemojte** ga ugraditi kao string literal. Koristite `resolvePublicCred()` iz `open-sse/utils/publicCreds.ts` i dodajte maskirani unos bajtova u `EMBEDDED_DEFAULTS`. Cjelokupni obavezni tijek rada dokumentiran je u [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

Unutar handlera/izvršitelja, poruke o pogreškama koje dospijevaju do klijenta moraju proći kroz `buildErrorBody()` / `sanitizeErrorMessage()` iz `open-sse/utils/error.ts` — nikada ne stavljajte sirovi `err.stack` ili `err.message` u tijelo odgovora (Response body). Pogledajte [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Korak 5: Registracija Modela

Dodajte definicije modela u `open-sse/config/providerRegistry.ts`.

### Korak 6: Dodavanje Testova

Napišite jedinične testove u `tests/unit/` koji pokrivaju minimalno:

- Registraciju pružatelja usluge
- Prevođenje zahtjeva/odgovora
- Rukovanje pogreškama

---

## Kontrolni Popis za Pull Request

- [ ] Testovi prolaze (`npm test`)
- [ ] Lintanje prolazi (`npm run lint`)
- [ ] Izgradnja uspijeva (`npm run build`)
- [ ] TypeScript tipovi dodani za nove javne funkcije i sučelja
- [ ] Nema hardkodiranih tajni niti rezervnih vrijednosti
- [ ] Javne uzvodne vjerodajnice ugrađene putem `resolvePublicCred()` (pogledajte [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), nikada kao literali
- [ ] Odgovori na pogreške prolaze kroz `buildErrorBody()` / `sanitizeErrorMessage()` — nema sirovih tragova stoga u tijelima odgovora (pogledajte [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Naredbe ljuske (`exec` / `spawn`) prosljeđuju vrijednosti za izvođenje putem `env`, ne putem string interpolacije
- [ ] Svi ulazni podaci validirani Zod shemama
- [ ] Fragment zapisa promjena dodan pod `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` za promjene vidljive korisniku (pogledajte [`changelog.d/README.md`](./changelog.d/README.md)) — **nemojte** izravno uređivati `CHANGELOG.md`; fragmenti se agregiraju pri izdavanju verzije i nikada ne dolaze u konflikt između pull requestova
- [ ] Dokumentacija ažurirana (ako je primjenjivo)
- [ ] Nema novih CodeQL / Secret-Scanning upozorenja, ili je svako odbačeno s tehničkim obrazloženjem koje upućuje na odgovarajući dokument iz `docs/security/`
- [ ] Rute koje pokreću podprocese (`/api/mcp/`, `/api/cli-tools/runtime/`) klasificirane su kao `isLocalOnlyPath()` u `src/server/authz/routeGuard.ts` — pogledajte [Strogo Pravilo #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Nema `Co-Authored-By` oznaka u porukama commita — commiti moraju biti isključivo pod Git identitetom vlasnika repozitorija (Strogo Pravilo #16)

## Objavljivanje

Objavama se upravlja putem tijeka rada `/generate-release`. Kada se stvori novo GitHub izdanje, paket se **automatski objavljuje na npm** putem GitHub Actions.

Za VPS deploy, koristite `npm run build:release` (ne `npm run build`) — izvodi čisto
ponovno izgradnju, sastavlja paket u `dist/` i zapisuje sentinel datoteku `dist/BUILD_SHA`.
Zatim koristite vještine `/deploy-vps-*-cc` koje rsync-aju `dist/` u udaljeni direktorij `app/`.

---

## Dobivanje pomoći

- **Arhitektura**: Pogledajte [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **API referenca**: Pogledajte [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Sigurnosna dokumentacija**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Operativna dokumentacija**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Problemi**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADR-ovi**: Pogledajte `docs/adr/` za zapise o arhitektonskim odlukama
