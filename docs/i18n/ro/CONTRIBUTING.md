# Contributing to OmniRoute (Română)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## Configurarea mediului de dezvoltare

### Cerințe preliminare

- **Node.js** `>=22.22.2 <23` sau `>=24.0.0 <27` (recomandat: 24 LTS)
- **npm** 10+

> **Utilizatorii npm v11+ (Node 24+):** După `npm install`, verificați dacă modulele native au fost instalate:
> `node -e "require('better-sqlite3')"`. Dacă eșuează cu `MODULE_NOT_FOUND`,
> rulați `npm approve-scripts better-sqlite3 && npm install`. Consultați
> [Depanare](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Clonare și instalare

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Variabile de mediu

```bash
# Creați fișierul .env din șablon
cp .env.example .env

# Generați secretele necesare
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Variabile principale pentru dezvoltare:

| Variabilă              | Valoare implicită pentru dezvoltare | Descriere                          |
| ---------------------- | ----------------------------------- | ---------------------------------- |
| `PORT`                 | `20128`                             | Portul serverului                  |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128`            | URL de bază pentru interfața web   |
| `JWT_SECRET`           | (generați mai sus)                  | Secret pentru semnarea JWT         |
| `INITIAL_PASSWORD`     | `CHANGEME`                          | Parola pentru prima autentificare  |
| `APP_LOG_LEVEL`        | `info`                              | Nivelul de detaliere al jurnalelor |

### Setările panoului de control

Panoul de control oferă comutatoare în interfața cu utilizatorul pentru funcționalități care pot fi configurate și prin intermediul variabilelor de mediu:

| Locația setării   | Comutator                    | Descriere                                             |
| ----------------- | ---------------------------- | ----------------------------------------------------- |
| Setări → Avansate | Mod de depanare              | Activează jurnalele cererilor de depanare (interfață) |
| Setări → Generale | Vizibilitatea barei laterale | Afișează/ascunde secțiunile barei laterale            |

Aceste setări sunt stocate în baza de date și persistă după reporniri, suprascriind valorile implicite ale variabilelor de mediu atunci când sunt configurate.

### Rularea locală

```bash
# Modul de dezvoltare (reîncărcare automată)
npm run dev

# Compilare pentru producție
npm run build    # next build → .build/next/, apoi assembleStandalone → dist/
npm run start

# Compilare rapidă doar pentru backend/API, pentru modificările contribuitorilor
npm run build:contributor

# Compilare pentru lansare (recompilare curată + santinelă HEAD — necesară pentru implementare)
npm run build:release   # rm -rf .build dist, apoi compilare + scrierea dist/BUILD_SHA

# Configurație uzuală a portului
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Compilarea pentru contribuitori efectuează doar validarea prin compilare: aceasta nu asamblează
distribuția autonomă și nici nu compilează resursele native opționale pentru împachetare. Folosiți compilarea obișnuită pentru producție atunci când
trebuie să validați pachetul distribuibil.

### Structura rezultatelor compilării

| Director  | Conținut                                                                                 | Urmărit |
| --------- | ---------------------------------------------------------------------------------------- | ------- |
| `src/`    | Codul sursă al aplicației (TypeScript / TSX)                                             | Da      |
| `.build/` | Fișiere intermediare — rezultatul `next build` (ignorat de git, `distDir = .build/next`) | Nu      |
| `dist/`   | Pachet distribuibil — asamblat de `assembleStandalone` (ignorat de git)                  | Nu      |

Fluxul de compilare constă dintr-o singură trecere:

```
npm run build
  └─ next build → .build/next/standalone  (rezultatul Next.js)
  └─ assembleStandalone()                 (copiază resursele autonome + statice + publice + native)
       └─ rezultat: dist/                 (server.js, .next/static/, public/, node_modules/)
```

În plus, `npm run build:release` curăță mai întâi ambele directoare și scrie
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) ca fișier-santinelă pentru integritatea implementării.

`npm run build:contributor` utilizează profilul de compilare exclusiv pentru backend. Acesta înlocuiește temporar cu substituenți
fișierele interfeței panoului de control în timpul compilării, păstrează gestionarii rutelor API și restaurează fișierele originale
după compilare. Folosiți `npm run build` pentru modificările care afectează interfața panoului de control sau pentru validarea completă
a lansării; profilul pentru contribuitori nu înlocuiește compilarea pentru lansare.

> **Notă privind implementarea pe VPS:** directorul imaginii de la distanță `/usr/lib/node_modules/omniroute/app/`
> rămâne neschimbat. Automatizările de implementare sincronizează prin rsync conținutul directorului `dist/` în acesta.
> S-a schimbat doar calea rezultatului compilării din depozit (`app/` → `dist/`).

URL-uri implicite:

- **Panou de control**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Flux de lucru Git

> ⚠️ **Nu efectuați NICIODATĂ commit-uri direct în `main`.** Utilizați întotdeauna ramuri pentru funcționalități.
>
> **Baza PR-ului:** vizați ramura activă `release/vX.Y.Z` (nu `main`). Consultați
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) pentru modelul
> cu câte o ramură per versiune și etichetare la livrare.

```bash
# Creați ramura pornind de la cel mai recent commit al versiunii active (exemplu: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... efectuați modificările ...
git commit -m "feat: descrieți modificarea"
git push -u origin feat/your-feature-name
# Deschideți un Pull Request cu baza = release/v3.8.49
```

### Denumirea ramurilor

| Prefix      | Scop                         |
| ----------- | ---------------------------- |
| `feat/`     | Funcționalități noi          |
| `fix/`      | Remedierea erorilor          |
| `refactor/` | Restructurarea codului       |
| `docs/`     | Modificări ale documentației |
| `test/`     | Adăugări/remedieri de teste  |
| `chore/`    | Instrumente, CI, dependențe  |

### Mesajele commit-urilor

Urmați [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: adăugați un disjunctor pentru apelurile furnizorilor
fix: rezolvați cazul-limită al validării secretului JWT
docs: actualizați SECURITY.md cu protecția PII
test: adăugați teste unitare pentru observabilitate
refactor(db): consolidați tabelele pentru limitarea ratei
```

Domenii (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Rularea testelor

```bash
# Toate testele (unitare + vitest + ecosistem + e2e)
npm run test:all

# Un singur fișier de test (executorul de teste nativ Node.js — majoritatea testelor îl folosesc)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Doar testele unitare afectate de modificarea dvs. (același selector TIA ca poarta CI, #8084)
npm run test:scoped            # modificările din ultimul commit (sau din arborele de lucru)
npm run test:scoped:staged     # doar modificările pregătite — se potrivește bine cu o rulare pre-commit
npm run test:scoped:full       # reconstruiește mai întâi harta grafului de importuri (după adăugarea/mutarea fișierelor)
# Codul de ieșire 1 + „rulați întreaga suită” înseamnă că un fișier central (tsconfig, package.json, …) sau o
# sursă necartografiată s-a modificat — selectorul eșuează în siguranță și nu omite niciodată în mod silențios.

# Vitest (server MCP, autoCombo, cache)
npm run test:vitest

# Teste E2E (necesită Playwright)
npm run test:e2e

# Teste E2E pentru clienții de protocol (transporturi MCP, A2A)
npm run test:protocols:e2e

# Teste de compatibilitate cu ecosistemul
npm run test:ecosystem

# Prag de acoperire: 60% instrucțiuni/linii/funcții/ramuri
npm run test:coverage
npm run coverage:report

# Verificarea lint + formatare
npm run lint
npm run check

# Test smoke combinat, condiționat, cu servicii reale din amonte (necesită acces VPS + credite reale la furnizori)
# Accesează furnizori REALI — costă puțin. Nu rulează NICIODATĂ în CI. Este omis fără erori în lipsa activării.
# Necesită: acces ssh root@192.168.0.15 (încarcă un instantaneu numai în citire al bazei de date de pe VPS).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Test smoke live VPS din faza 3 — scripturi Node ESM simple, accesează direct serverul live .15.
# Necesită: acces ssh root@192.168.0.15 (combinațiile sunt create/eliminate prin SSH sqlite).
# Accesează furnizori REALI (cost redus). Creează/șterge doar combinații __live_test__*. Nu rulează NICIODATĂ în CI.
# REQUIRE_API_KEY=false pe .15, deci nu este necesară nicio cheie API, dar respectă COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY dacă sunt setate.
npm run test:combo:live:vps              # 7 scenarii HTTP (prioritate/round-robin/ponderat/cost/fuziune/automat + stare)
npm run test:combo:live:vps:failover     # adaugă un scenariu real de failover între furnizori (8 în total)
```

Note privind acoperirea:

- `npm run test:coverage` măsoară acoperirea codului-sursă pentru suita principală de teste unitare, exclude `tests/**` și include `open-sse/**`
- Solicitările de integrare trebuie să mențină pragul de acoperire la **60%+** pentru instrucțiuni/linii/funcții/ramuri
- Dacă un PR modifică codul de producție din `src/`, `open-sse/`, `electron/` sau `bin/`, trebuie să adauge sau să actualizeze teste automate în același PR
- `npm run coverage:report` afișează raportul detaliat, fișier cu fișier, din cea mai recentă rulare de acoperire
- `npm run test:coverage:legacy` păstrează metrica mai veche pentru comparații istorice
- Consultați `docs/ops/COVERAGE_PLAN.md` pentru foaia de parcurs etapizată privind îmbunătățirea acoperirii

### Cerințe pentru solicitările de integrare

Înainte de a deschide un PR, utilizați
[Fluxul recomandat pentru contribuții](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) pentru a rula ciclul focalizat aferent
modificărilor efectuate. Suita completă de teste unitare (4 partiții CI), Vitest, pragul de acoperire de **60%+** și
compilarea pentru producție sunt responsabilitatea CI — rularea lor locală nu oferă informații suplimentare față de cele
pe care verificările PR le vor furniza deja, iar pe sistemele mai puțin performante poate satura gazda (#8084):

- Rulați fișierele de test care acoperă modificarea: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Rulați `npm run lint`
- Includeți sau actualizați teste automate în același PR ori de câte ori se modifică codul de producție
- Includeți în descrierea PR-ului fișierele de test modificate sau adăugate atunci când s-a modificat codul de producție
- Verificați rezultatul SonarQube din PR atunci când secretele proiectului sunt configurate în CI

Starea actuală a testelor: **122 de fișiere de teste unitare** care acoperă:

- Translatoare pentru furnizori și conversia formatelor
- Limitarea ratei, disjunctorul și reziliența
- Cache-ul semantic, idempotența, urmărirea progresului
- Operațiunile și schema bazei de date (21 de module DB)
- Fluxurile OAuth și autentificarea
- Validarea endpointurilor API (Zod v4)
- Instrumentele serverului MCP și aplicarea domeniului de acces
- Sistemele de memorie și abilități

---

## Stilul codului

- **ESLint** — Rulați `npm run lint` înainte de commit
- **Prettier** — Formatare automată prin `lint-staged` la commit (2 spații, punct și virgulă, ghilimele duble, lățime de 100 de caractere, virgule finale es5)
- **TypeScript** — Tot codul din `src/` utilizează `.ts`/`.tsx`; `open-sse/` utilizează `.ts`/`.js`; documentați cu TSDoc (`@param`, `@returns`, `@throws`)
- **Fără `eval()`** — ESLint impune `no-eval`, `no-implied-eval`, `no-new-func`
- **Validare Zod** — Utilizați scheme Zod v4 pentru validarea tuturor datelor de intrare API
- **Denumire**: fișiere = camelCase/kebab-case, componente = PascalCase, constante = UPPER_SNAKE

### Gestionarea erorilor / blocuri catch goale

Nu lăsați niciodată un `catch` neexplicat. Clasificați-l într-una dintre cele două categorii (punând
în practică regula strictă „nu ignorați niciodată în tăcere erorile din fluxurile SSE”):

- **Intenționat (propria noastră curățare/telemetrie de tip best-effort)** — o eroare în acest caz este așteptată și
  inofensivă; adăugați un comentariu explicativ pe un singur rând, fără jurnalizare (jurnalizarea la fiecare cerere este
  zgomotul pe care această convenție îl evită).

  ```ts
  } catch {} // închiderea unui controler deja închis după deconectarea clientului este de așteptat
  ```

- **Trebuie jurnalizat (cod extern/furnizat de apelant sau ignorarea erorii modifică fluxul de control)** — păstrați
  blocul catch (nu permiteți niciodată ca acesta să întrerupă fluxul), dar emiteți un mesaj contextual prin `console.debug`/`warn`, astfel încât
  eroarea să poată fi identificată.

  ```ts
  } catch (e) {
    console.debug("[STREAM] eroare în callback-ul onFailure:", e);
  }
  ```

Consultați `open-sse/utils/stream.ts` și `open-sse/utils/streamHandler.ts` pentru exemple aplicate.

---

## Structura proiectului

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Pagini ale tabloului de bord (23 de secțiuni)
│   ├── api/                # Rute API (51 de directoare)
│   └── login/              # Pagini de autentificare (.tsx)
├── domain/                 # Motor de politici (policyEngine, comboResolver, costRules etc.)
├── lib/                    # Logica principală de business (.ts)
│   ├── a2a/                # Server pentru protocolul Agent-to-Agent v0.3
│   ├── acp/                # Registru pentru Agent Communication Protocol
│   ├── compliance/         # Motor de politici de conformitate
│   ├── db/                 # Module de domeniu SQLite + 130 de migrări
│   ├── memory/             # Memorie conversațională persistentă
│   ├── oauth/              # Furnizori, servicii și utilitare OAuth
│   ├── skills/             # Cadru extensibil pentru abilități
│   ├── usage/              # Urmărirea utilizării și calcularea costurilor
│   └── localDb.ts          # Doar strat de reexportare — nu adăugați niciodată logică aici
├── middleware/              # Middleware pentru cereri (promptInjectionGuard)
├── mitm/                   # Proxy MITM (certificate, DNS, rutarea destinației)
├── shared/
│   ├── components/         # Componente React (.tsx)
│   ├── constants/          # Definiții ale furnizorilor (329), domenii MCP, 21 de strategii de rutare
│   ├── utils/              # Întrerupător de circuit, instrument de igienizare, funcții auxiliare pentru autentificare
│   └── validation/         # Scheme Zod v4
└── sse/                    # Flux de procesare proxy SSE

open-sse/                   # Spațiu de lucru @omniroute/open-sse
├── executors/              # 150 de module de execuție (clase de execuție + funcții auxiliare pentru fiecare furnizor)
├── handlers/               # 11 gestionare de cereri (chat, răspunsuri, încorporări, imagini etc.)
├── mcp-server/             # Server MCP (110 instrumente unice, 3 transporturi, 33 de domenii)
├── services/               # 178 de servicii de nivel superior (combo, autoCombo, rateLimitManager etc.)
├── translator/             # Traductoare de formate (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Transformator pentru Responses API
└── utils/                  # 22 de module utilitare (flux, TLS, proxy, jurnalizare)

electron/                   # Aplicație desktop Electron (multiplatformă)

tests/
├── unit/                   # Executor de teste Node.js (1.574 de fișiere de testare)
├── integration/            # Teste de integrare
├── e2e/                    # Teste Playwright
├── security/               # Teste de securitate
├── translator/             # Teste specifice traductorului
└── load/                   # Teste de încărcare

docs/
├── adr/                     # Înregistrări ale deciziilor de arhitectură
├── architecture/            # Arhitectura și reziliența sistemului
├── comparison/              # OmniRoute comparativ cu alternativele
├── compression/             # Ghiduri și reguli de compresie
├── dev/                     # Ghiduri de dezvoltare
├── diagrams/                # Diagrame de arhitectură
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # Ghid de utilizare, Docker, configurare, depanare
├── i18n/                    # Traduceri internaționalizate ale README
├── marketing/               # Materiale de marketing
├── ops/                     # Implementare, proxy, acoperire, versiuni
├── providers/               # Documentație specifică furnizorilor
├── reference/               # Referință API, variabile de mediu, instrumente CLI, niveluri gratuite
├── releases/                # Note de versiune
├── routing/                 # Motor auto-combo, redarea raționamentului
├── screenshots/             # Capturi de ecran ale tabloului de bord
├── security/                # Măsuri de protecție, conformitate, mod invizibil, tokenuri
└── specs/                   # Specificații de proiectare
```

---

## Adăugarea unui furnizor nou

### Pasul 1: Înregistrați constantele furnizorului

Adăugați-le în `src/shared/constants/providers.ts` — validate cu Zod la încărcarea modulului.

### Pasul 2: Adăugați executorul (dacă este necesară logică personalizată)

Creați executorul în `open-sse/executors/your-provider.ts`, extinzând executorul de bază.

### Pasul 3: Adăugați translatorul (dacă formatul nu este OpenAI)

Creați translatoare pentru cereri/răspunsuri în `open-sse/translator/`.

### Pasul 4: Adăugați configurația OAuth (dacă se bazează pe OAuth)

Adăugați credențialele OAuth în `src/lib/oauth/constants/oauth.ts` și serviciul în `src/lib/oauth/services/`.

Dacă furnizorul din amonte distribuie un client_id/secret OAuth public sau o cheie Firebase Web API în CLI-ul său public / pachetul pentru browser, **nu** îl/o încorporați ca literal de tip șir. Utilizați `resolvePublicCred()` din `open-sse/utils/publicCreds.ts` și adăugați o intrare de octeți mascată în `EMBEDDED_DEFAULTS`. Fluxul de lucru complet și obligatoriu este documentat în [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

În interiorul handlerelor/executorilor, mesajele de eroare care ajung la client trebuie să treacă prin `buildErrorBody()` / `sanitizeErrorMessage()` din `open-sse/utils/error.ts` — nu includeți niciodată valorile brute `err.stack` sau `err.message` în corpul unui răspuns. Consultați [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Pasul 5: Înregistrați modelele

Adăugați definițiile modelelor în `open-sse/config/providerRegistry.ts`.

### Pasul 6: Adăugați teste

Scrieți teste unitare în `tests/unit/` care să acopere cel puțin:

- Înregistrarea furnizorului
- Traducerea cererilor/răspunsurilor
- Gestionarea erorilor

---

## Listă de verificare pentru Pull Request

- [ ] Testele trec (`npm test`)
- [ ] Verificarea lint trece (`npm run lint`)
- [ ] Build-ul reușește (`npm run build`)
- [ ] Au fost adăugate tipuri TypeScript pentru noile funcții și interfețe publice
- [ ] Nu există secrete sau valori de rezervă codificate direct
- [ ] Credențialele publice upstream sunt încorporate prin `resolvePublicCred()` (consultați [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), niciodată ca literali
- [ ] Răspunsurile de eroare sunt procesate prin `buildErrorBody()` / `sanitizeErrorMessage()` — fără urme de stivă neprelucrate în corpurile răspunsurilor (consultați [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Comenzile shell (`exec` / `spawn`) transmit valorile din timpul execuției prin `env`, nu prin interpolarea șirurilor
- [ ] Toate datele de intrare sunt validate cu scheme Zod
- [ ] A fost adăugat un **fragment** de jurnal de modificări în `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` pentru modificările vizibile utilizatorilor (consultați [`changelog.d/README.md`](./changelog.d/README.md)) — **nu** editați direct `CHANGELOG.md`; fragmentele sunt agregate la momentul lansării și nu intră niciodată în conflict între PR-uri
- [ ] Documentația a fost actualizată (dacă este cazul)
- [ ] Nu au fost deschise alerte CodeQL / Secret-Scanning noi sau fiecare dintre acestea a fost respinsă cu o justificare tehnică ce face referire la documentul relevant din `docs/security/`
- [ ] Rutele care generează procese copil (`/api/mcp/`, `/api/cli-tools/runtime/`) sunt clasificate drept `isLocalOnlyPath()` în `src/server/authz/routeGuard.ts` — consultați [Regula strictă nr. 15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Mesajele de commit nu conțin trailere AI/bot `Co-authored-by` (Regula strictă nr. 16) — colaboratorii umani a căror muncă este reutilizată sunt creditați prin trailere standard `Co-authored-by: Name <email>`

---

## Publicarea versiunilor

Versiunile sunt gestionate prin fluxul de lucru `/generate-release`. Când este creată o nouă versiune GitHub, pachetul este **publicat automat pe npm** prin GitHub Actions.

Pentru implementările pe VPS, utilizați `npm run build:release` (nu `npm run build`) — acesta efectuează o
recompilare de la zero, asamblează pachetul în `dist/` și scrie fișierul santinelă `dist/BUILD_SHA`.
Apoi utilizați abilitățile `/deploy-vps-*-cc`, care sincronizează prin rsync directorul `dist/` cu directorul `app/` de la distanță.

---

## Obținerea ajutorului

- **Arhitectură**: Consultați [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **Referință API**: Consultați [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Documentație de securitate**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Documentație operațională**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Probleme**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
