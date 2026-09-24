# Quality Gates Reference (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Acest document este referința oficială pentru toate porțile de calitate CI din OmniRoute.
Acesta descrie fiecare poartă, ce validează, în ce job CI rulează, dacă utilizează
o referință de tip ratchet sau o politică de tip admis/respins și dacă blochează compilarea sau are rol consultativ.

Pentru un rezumat scurt și politica listei de permisiuni, consultați secțiunea „Quality Gates & Ratchets”
din `AGENTS.md`. Pentru evaluarea critică, clasificarea maturității și planul independent de instrumente
pentru reproducerea aceluiași sistem, consultați
[Manualul porților de calitate](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Inventarul porților (~90 de scripturi)

Scripturile se află în `scripts/check/` (porți de politici) și `scripts/quality/` (motorul cu prag progresiv).
Sursa de adevăr pentru CI este `.github/workflows/ci.yml`.

### Calea rapidă pentru PR-uri de release (`quality.yml`)

`.github/workflows/quality.yml` rulează pentru PR-urile care vizează `release/**`. Acesta menține în mișcare
ramurile contribuitorilor prin porți rapide filtrate după căi, plus un semnal consultativ privind buildul de producție pentru
modificările de cod:

| Job                                              | Domeniu de aplicare                                                                                                                                                                                                                                  | Blocant                                                                                                              |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `Build (advisory)`                               | PR-uri de cod care nu sunt draft și ramuri din coada Mergify; Node 24, `npm-ci-retry`, `check:node-runtime`, `npm run build` cu `OMNIROUTE_USE_TURBOPACK=1`; fără încărcarea artefactelor, deoarece niciun job ulterior de calitate nu le consumă    | **Consultativ** (`continue-on-error: true`; eliminați după o săptămână de rulări stabile pentru PR-urile de release) |
| `Docs Gates (fast-path)`                         | PR-uri pentru documentație/cod; referințe pentru documentația API și docs-all                                                                                                                                                                        | Da                                                                                                                   |
| `Fast Quality Gates`                             | PR-uri de cod; verificări statice, verificarea tipurilor, verificarea tipurilor pentru dashboard, teste unitare afectate                                                                                                                             | Da                                                                                                                   |
| `Forgotten sibling tests`                        | PR-uri de cod; modulele modificate sunt urmărite până la consumatorii statici și testele înrudite candidate; căile prin barrel și import dinamic sunt raportate ca diagnostice consultative, împreună cu excepțiile aferente din lista de permisiuni | **Consultativ**                                                                                                      |
| `Vitest (fast-path)`                             | PR-uri de cod; suita rapidă vitest                                                                                                                                                                                                                   | Da                                                                                                                   |
| `Unit Tests fast-path`                           | PR-uri de cod; suita de teste unitare împărțită în 4 sharduri                                                                                                                                                                                        | Da                                                                                                                   |
| `No new ESLint warnings`                         | PR-uri de cod; protecție pentru lint care ține cont de suprimări                                                                                                                                                                                     | Da pentru propria origine, consultativ pentru forkuri                                                                |
| `Merge integrity (changelog + generated skills)` | PR-uri care nu sunt draft; sincronizarea changelogului și a skillurilor generate                                                                                                                                                                     | Da pentru propria origine, consultativ pentru forkuri                                                                |

#### Raportul privind testele înrudite uitate

`npm run check:forgotten-sibling-tests` reutilizează resolverul de importuri din spatele hărții impactului asupra testelor.
Pentru fiecare modul de producție modificat, acesta raportează lanțuri deterministe
`modul/simbol modificat -> consumator static -> test înrudit candidat` atunci când testul candidat
lipsește din diff-ul pull requestului. Rezumatul Markdown și rezultatul JSON sunt păstrate ca
artefact al workflowului `forgotten-sibling-tests`, pentru calibrare înainte de orice implementare blocantă.

Reexporturile prin barrel și importurile dinamice sunt doar diagnostice de rezoluție; acestea nu generează niciodată o
constatare blocantă. Excepțiile revizuite se află în
`config/quality/forgotten-sibling-allowlist.json`. Fiecare intrare trebuie să precizeze consumatorul și testul
candidat, să ofere o justificare specifică și să includă un link către un issue sau un pull request GitHub. Intrările incorecte
duc implicit la eșec. Excepțiile nu pot suprima un test candidat șters sau un diff care adaugă `.skip`/`.todo`;
slăbirea aserțiunilor și alte forme de mascare rămân în responsabilitatea porții blocante independente
`check:test-masking`.

### Job: `lint`

Rulează pentru fiecare PR către `main`. Blochează îmbinarea în caz de eșec.

| Script (`npm run ...`)            | Validează                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Blocant                                    |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| `check:node-runtime`              | Versiunea Node.js se încadrează în intervalul acceptat                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                         |
| `check:cycles`                    | Importurile circulare — toate modulele din `src/` + `open-sse/`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                         |
| `check:route-validation:t06`      | Schemele Zod sunt prezente pe toate rutele (politica Nivelului 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Da                                         |
| `check:any-budget:t11`            | Numărul de `@ts-expect-error // any` nu depășește limita (bariera Nivelului 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                         |
| `check:provider-consistency`      | Fiecare furnizor din `providers.ts` are o intrare corespunzătoare în `providerRegistry.ts` (și invers, în cadrul listei de permisiuni)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                         |
| `check:model-lifecycle`           | Cele trei tabele de rutare întreținute manual rămân consecvente cu instantaneul ciclului de viață inclus în depozit (#11503): `FITNESS_TABLE` (`taskFitness.ts`) nu punctează niciun id retras pe care `REGISTRY` îl poate ruta; fiecare țintă `BUILT_IN_ALIASES` este prezentă în `REGISTRY` și absentă din instantaneul id-urilor retrase; fiecare id retras care încă se află în `REGISTRY` este redirecționat sau enumerat în `allowedRetiredInCatalog`; și nicio sursă sau țintă `DEFAULT_DEGRADATION_MAP` nu apare ca retrasă în acel instantaneu. Acest lucru nu dovedește că un model este furnizat în prezent de un serviciu upstream activ. Offline — compară cu `config/quality/model-lifecycle.json`, reîmprospătat manual cu `npm run quality:refresh-model-lifecycle` (rețea; neintegrat în CI). `allowedRetiredInCatalog` este un mecanism progresiv de reducere: adăugați o intrare numai împreună cu un tichet de urmărire. | Da                                         |
| `check:fetch-targets`             | Fiecare `fetch("/api/...")` din `src/` pe partea de client se rezolvă la un fișier `route.ts` real                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Da                                         |
| `check:deps`                      | Toate dependențele instalabile cu `npm install` din fiecare `package.json` din depozit se află în `dependency-allowlist.json`; pachetele noi fără versiuni fixate sau cele care imită prin nume alte pachete sunt semnalate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Da                                         |
| `audit:deps`                      | `npm audit` (rădăcină + electron) — fără avertismente cu severitate ridicată/critică (se suprapune cu `check:vuln-ratchet` din osv; consultați lista restantă de raționalizări)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                         |
| `check:lockfile`                  | Integritatea fișierului `package-lock.json` — registru https, hashuri de integritate, fără suprascrieri ale gazdei                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Da                                         |
| `check:licenses`                  | Listă de permisiuni pentru licențe SPDX pentru dependențele de producție                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Da                                         |
| `check:tracked-artifacts`         | Fără artefacte de compilare / legături simbolice `node_modules` incluse în commituri (rulează și în pre-commit-ul husky; pre-push-ul este intenționat minimal — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Da                                         |
| `check:ai-attribution`            | Fără trailer `Co-Authored-By` pentru AI/boți sau subsol privind generarea cu AI în commiturile, titlul ori corpul PR-ului — Regula strictă #16 (în bucla de verificări rapide din `quality.yml` pentru PR→`release/**` — citește conținutul evenimentului, nu efectuează nicio operațiune în afara PR-urilor — și într-un pas exclusiv pentru PR-uri din verificarea lint din `ci.yml` pentru PR→`main`; de asemenea, în hook-ul husky `commit-msg`; coautorii umani sunt permiși; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:vitest-exclusions`         | Fiecare excludere Vitest menționează un tichet de urmărire și apare în `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Da                                         |
| `check:file-size`                 | Niciun fișier sursă nu depășește limita specifică extensiei (mecanism cu prag progresiv: fișierele mari blocate se află în lista `frozen`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Da                                         |
| `check:error-helper`              | Răspunsurile de eroare din executori/gestionari utilizează `buildErrorBody()` / `sanitizeErrorMessage()` (Regula strictă #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Da                                         |
| `check:migration-numbering`       | Fișierele SQL de migrare sunt numerotate secvențial, fără omisiuni sau duplicate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Da                                         |
| `check:public-creds`              | Nu există valori literale OAuth `client_id`/`client_secret` sau chei Firebase Web în afara `publicCreds.ts` (Regula strictă #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Da                                         |
| `check:db-rules`                  | Nu există SQL brut în afara modulelor `src/lib/db/`; nu există importuri de tip barrel din `localDb.ts` (Regulile stricte #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Da                                         |
| `check:known-symbols`             | Executorii furnizorilor, strategiile de rutare și translatoarele înregistrate în tabelele lor de expediere corespund fișierelor de pe disc — fără simboluri orfane sau nedeclarate                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Da                                         |
| `check:route-guard-membership`    | Fiecare rută care lansează un proces copil este clasificată de `isLocalOnlyPath()` (Regulile stricte #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Da                                         |
| `check:test-discovery`            | Fiecare fișier `*.test.ts` / `*.spec.ts` din depozit este colectat de cel puțin un executor de teste (mecanism de blocare progresivă: lista fișierelor orfane din `test-discovery-baseline.json` poate doar să se micșoreze)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Da                                         |
| `check:agent-skills-sync`         | Artefactele generate pentru agent-skills corespund catalogului lor sursă (fără divergențe)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:provider-asset-provenance` | Siglele/activele furnizorilor au o intrare de proveniență înregistrată                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `lint:json`                       | Fișierele de configurare JSON sunt parsate și respectă regulile de lint ale repo-ului                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `typecheck:core`                  | Compilare TypeScript fără erori (doar avertismente informative)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Da                                         |
| `typecheck:noimplicit:core`       | `noImplicitAny` strict — orientat spre viitor; numeroase locuri de apelare preexistente necesită încă adnotări                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | **Informativ** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` limitat la `src/app/(dashboard)/**` (#7033) — lista atent selectată de 27 de fișiere permisă de `typecheck:core` nu include niciun fișier TSX al tabloului de bord, iar `next build` nu efectuează niciodată verificarea tipurilor pentru acestea (`next.config.mjs` setează `ignoreBuildErrors: true`), astfel încât regresiile cu identificatori rămași fără referință de acolo (#6625/#6909) nu erau detectate de CI. Compară cu o linie de bază înghețată a numărului per fișier/per cod TS (`config/quality/dashboard-typecheck-baseline.json`, același model de impunere pentru elementele învechite ca `check:known-symbols`) — doar erorile NOI care depășesc numărul din linia de bază fac ca verificarea să eșueze; reduceți progresiv valorile cu `--update` atunci când este remediată o eroare preexistentă.                                                                                                              | Da                                         |

### Sarcină: `quality-gate`

Rulează după `test-coverage`. Blochează îmbinarea în caz de eșec.

| Script                       | Validează                                                                                                                                                                                          | Blocant                   |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `quality:collect`            | Generează `quality-metrics.json` (numărul de avertismente ESLint, acoperirea din raportul combinat al fragmentelor)                                                                                | Da (în amonte de ratchet) |
| `quality:ratchet`            | Fiecare metrică din `quality-baseline.json` nu a regresat (avertismente ESLint ≤ valoarea de referință; acoperire ≥ valoarea de referință)                                                         | Da                        |
| `check:duplication`          | Duplicarea codului (jscpd@4) nu depășește valoarea de referință din `quality-baseline.json`                                                                                                        | Da                        |
| `check:complexity`           | Complexitatea ciclomatică la nivel de fișier nu depășește limita (regulile ESLint de bază `complexity` + `max-lines-per-function`)                                                                 | Da                        |
| `check:cognitive-complexity` | Ratchet pentru complexitatea cognitivă (`eslint-plugin-sonarjs`) — rulare ESLint separată; CI le rulează pe ambele, combinate în pasul unic `check:complexity-ratchets`                            | Da                        |
| `check:dead-code`            | Ratchet-ul pentru exporturi/fișiere neutilizate (knip) nu regresează față de valoarea de referință                                                                                                 | Da                        |
| `check:compression-budget`   | Bugetul benchmark-ului de compresie — pragurile minime pentru economiile de tokenuri per motor nu trebuie să regreseze                                                                             | Da                        |
| `check:type-coverage`        | Ratchet-ul procentului de cod tipizat (`type-coverage`) nu regresează; în mare parte înlocuiește `typecheck:noimplicit:core`                                                                       | Da                        |
| `check:codeql-ratchet`       | Numărul alertelor CodeQL deschise nu regresează (citește prin `gh api`; omitere controlată fără token) — pentru frecvența actualizării și declanșarea manuală: consultați „Ratchet CodeQL” mai jos | Da                        |

### Job: `quality-extended`

Întregul job are rol consultativ (`continue-on-error: true`). Ratchet-urile bazate pe npm rulează
efectiv; scanerele externe sunt instalate prin `gh release download` și se omit automat (exit 0)
atunci când un binar lipsește în continuare.

| Script                   | Validează                                                                                                                                                                                                             | Blocant         |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `check:circular-deps`    | Nu există dependențe circulare (dpdm)                                                                                                                                                                                 | **Consultativ** |
| `check:bundle-size`      | Dimensiunea pachetului nu depășește limita                                                                                                                                                                            | **Consultativ** |
| `check:secrets`          | Scanarea secretelor (gitleaks) — se omite dacă binarul lipsește                                                                                                                                                       | **Consultativ** |
| `check:vuln-ratchet`     | Vulnerabilitățile dependențelor (osv-scanner) nu regresează — se omite dacă binarul lipsește                                                                                                                          | **Consultativ** |
| `check:workflows`        | Lint pentru workflow-uri (actionlint + zizmor) — se omite dacă binarele lipsesc                                                                                                                                       | **Consultativ** |
| `check:openapi-breaking` | Modificări incompatibile ale contractului API public (`openapi.yaml`) față de ramura de bază (oasdiff) — generează `openapiBreaking=N`; se omite dacă oasdiff lipsește sau specificația de bază nu poate fi rezolvată | **Consultativ** |

### Job: `docs-sync-strict`

Rulează pentru fiecare PR către `main`. Blochează integrarea în caz de eșec.

| Script                         | Validează                                                                                                                                                                                    | Blocant                    |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| `check:docs-all`               | Meta-gate care rulează secvențial cele 6 sub-gate-uri de mai jos                                                                                                                             | Da                         |
| ↳ `check:docs-sync`            | Consecvența versiunilor CHANGELOG / OpenAPI / llm.txt                                                                                                                                        | Da                         |
| ↳ `check:docs-counts`          | Numerele din text (numărul de furnizori, numărul de migrări etc.) se încadrează în fereastra de ajustare progresivă a valorilor reale                                                        | Da                         |
| ↳ `check:env-doc-sync`         | Fiecare variabilă de mediu din `.env.example` este documentată într-un tabel din documentație și invers                                                                                      | Da                         |
| ↳ `check:deprecated-versions`  | Nu există șiruri de versiune perimate în documentație                                                                                                                                        | Da                         |
| ↳ `check:doc-links`            | Linkurile Markdown interne din documentație se rezolvă către fișiere reale (forma `[text]`/`(path)`)                                                                                         | Da                         |
| ↳ `check:fabricated-docs`      | Rutele, variabilele de mediu, comenzile CLI, numele hook-urilor și căile de fișiere menționate în documentație există în baza de cod. Gate strict prin `--strict`; eșec neblocant fără flag. | Da (prin `--strict` în CI) |
| `check:cli-i18n`               | Șirurile comenzilor CLI sunt prezente în toate fișierele de localizare i18n                                                                                                                  | Da                         |
| `check:openapi-coverage`       | Specificația OpenAPI acoperă cel puțin un prag minim, ajustat progresiv, al rutelor reale                                                                                                    | Da                         |
| `check:openapi-security-tiers` | Adnotările nivelurilor de securitate din `openapi.yaml` sunt consecvente cu clasificările din `routeGuard.ts`                                                                                | **Informativ**             |
| `check:openapi-routes`         | Fiecare cale din `openapi.yaml` se rezolvă către un `route.ts` real (prevenirea halucinațiilor)                                                                                              | Da                         |
| `check:docs-symbols`           | Fiecare referință `/api/...` din `docs/**/*.md` se rezolvă către un `route.ts` real (prevenirea halucinațiilor)                                                                              | Da                         |
| `i18n translation drift`       | Chei netraduse în fișierele de localizare i18n — doar avertizare                                                                                                                             | **Informativ**             |

### Job: `i18n-ui-coverage`

| Script                            | Validează                                                                                                                                                                                                            | Blocant        |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `check-ui-keys-coverage` (inline) | Acoperirea cheilor i18n din UI este ≥ 65%                                                                                                                                                                            | Da             |
| `check-ui-value-drift` (inline)   | O **valoare** în limba engleză rescrisă nu lasă în urmă nicio traducere învechită                                                                                                                                    | Da             |
| `check-new-key-coverage` (inline) | O cheie **nouă** în limba engleză este tradusă în fiecare localizare — un marcaj `__MISSING__:` este respins                                                                                                         | Da             |
| `check-translation-ratio`         | Raportul traducerilor reale per localizare (valori identice cu engleza / substituenți / intrări lipsă din afara listei de excepții) nu trebuie să depășească `config/quality/i18n-translation-baseline.json` + marja | **Informativ** |

Necesită `fetch-depth: 0` — gate-ul pentru detectarea valorilor modificate compară diferențele din `en.json` față de baza comună de îmbinare.

#### `check-ui-value-drift` — gate pentru traduceri învechite

Detectează singura regresie i18n pe care celelalte gate-uri nu o pot identifica structural: o valoare în limba engleză
este rescrisă, iar traducerile derivate din versiunea _anterioară_ în limba engleză rămân neschimbate, astfel încât
utilizatorii care nu folosesc limba engleză continuă să citească un text formulat convingător, dar acum incorect.

Acest lucru s-a întâmplat efectiv în producție. `oauthModal.googleOAuthWarning` a fost rescris atunci când a fost introdus utilitarul
de autentificare Antigravity (#5203); **39 din 43 de localizări** au păstrat textul care le spunea operatorilor să „copieze
URL-ul complet și să îl lipească mai jos” — un flux care nu poate fi finalizat pentru furnizorul respectiv. Problema a rămas
neobservată până la #8463 deoarece:

- `sync-ui-keys` completează doar cheile care sunt **absente**, niciodată pe cele care sunt **învechite**;
- `check-ui-keys-coverage` numără _prezența_ cheilor, astfel încât o traducere învechită este considerată acoperită;
- `check-translation-drift` urmărește copiile documentației din `docs/i18n/<locale>/**.md` —
  nu citește niciodată `src/i18n/messages/*.json`. Blocant în jobul `docs-sync-strict` începând cu
  resincronizarea din 2026-09: modificați un document principal → `npm run i18n:run -- --files=<doc>` (la nivel de secțiune, cost redus).

**Conștient de diferențe, fără a se baza pe un reper.** Compară `en.json` de la baza îmbinării cu
arborele de lucru; pentru fiecare cheie a cărei valoare în engleză s-a modificat, orice limbă care încă păstrează o
traducere nemodificată este perimată. Acest lucru **îngheață în mod deliberat datoria preexistentă** — o diferență
nu poate dezvălui din ce versiune veche în engleză provine o traducere existentă de mult timp, așa că verificarea evaluează
doar ceea ce este atins de modificarea curentă. Alternativa (un reper bazat pe hash pentru fiecare cheie) ar necesita
un fișier generat de ~600 KB, de 3× mai mare decât cel mai mare reper existent, care s-ar modifica la fiecare PR i18n.

Există două modalități de a trece verificarea:

1. actualizați traducerile afectate sau
2. setați-le la `__MISSING__:<new english>` — la rulare va fi furnizat apoi textul corectat în engleză
   (`src/i18n/request.ts::deepMergeFallback`, #7258), iar cheia este pusă în coada pentru traducere.

Dacă s-a schimbat **sensul** șirului, preferați **redenumirea cheii**: o cheie nouă nu poate moșteni
o traducere perimată. Acesta este modelul utilizat de #8463.

```bash
npm run i18n:check-value-drift          # strict (ceea ce rulează CI)
npm run i18n:check-value-drift:warn     # doar raportare
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Încheie cu codul 0 și mesajul `SKIP reason=base-unresolved` atunci când catalogul de bază nu poate fi citit (clonă
superficială fără referința de bază), în mod similar cu `check-openapi-breaking`.

### Job: `i18n`

Matrice completă de validare i18n (câte un job pentru fiecare limbă). Întregul job are caracter consultativ.

| Script                          | Validează                            | Blochează                                                       |
| ------------------------------- | ------------------------------------ | --------------------------------------------------------------- |
| `validate_translation.py quick` | Exhaustivitatea traducerii per limbă | **Consultativ** (`continue-on-error: true` pentru întregul job) |

### Job: `pr-test-policy`

Rulează numai pentru cererile de integrare.

| Script                 | Validează                                                                                                                                                                           | Blochează |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PR-urile care modifică codul de producție din `src/`, `open-sse/`, `electron/` sau `bin/` trebuie să includă ori să actualizeze teste (Regula strictă #8)                           | Da        |
| `check:test-masking`   | Fișierele de test modificate nu reduc numărul net de aserțiuni și nu adaugă tautologii `assert.ok(true)`                                                                            | Da        |
| `check:pr-evidence`    | Corpul PR-ului menționează dovezi din teste/VPS pentru modificare (automatizează Regula strictă #18 prin căutarea în textul PR-ului — fragil, consultați lista de sarcini restante) | Da        |

### Job: `test-vitest`

Rulează după `build`. Blochează integrarea în caz de eșec.

| Suită            | Validează                                                          | Blochează                                                                                                                |
| ---------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `test:vitest`    | Serverul MCP (110 instrumente), autoCombo, cache — executor vitest | Da                                                                                                                       |
| `test:vitest:ui` | Teste pentru componentele UI — executor vitest                     | **Blochează** — eșecurile preexistente sunt excluse explicit în `vitest.config.ts`; eșecurile noi fac ca jobul să eșueze |

### Fluxuri de lucru nocturne (programate, consultative)

Acestea rulează conform unei programări cron (și prin `workflow_dispatch`), niciodată pentru PR-uri. Toate au caracter consultativ.

| Flux de lucru          | Validează                                                                                                                                                                                       | Blochează       |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| `nightly-property`     | Teste bazate pe proprietăți fast-check, cu o sămânță aleatorie și un număr mare de rulări                                                                                                       | **Consultativ** |
| `nightly-resilience`   | Verificarea creșterii memoriei heap, injectarea haotică a defecțiunilor, teste k6 de încărcare/anduranță                                                                                        | **Consultativ** |
| `nightly-llm-security` | Protecție promptfoo împotriva injectării (mod de blocare) + sonde garak (omise fără secretul unui furnizor)                                                                                     | **Consultativ** |
| `nightly-schemathesis` | Testare fuzz a contractului OpenAPI (schemathesis) pe o instanță OmniRoute activă, folosind `docs/openapi.yaml` — evidențiază încălcări ale specificației / erori 500 negestionate (Faza 8 B.4) | **Consultativ** |
| `nightly-mutation`     | Scorul testării prin mutații Stryker pentru pista rapidă de teste unitare — mutanții supraviețuitori evidențiază aserțiuni slabe                                                                | **Consultativ** |
| `nightly-compat`       | Matricea de compatibilitate a motorului Node pentru intervalele `engines.node` acceptate                                                                                                        | **Consultativ** |

---

## Faza de viteză (2026-08-30 → v4.0 LTS): fiecare valoare de referință a fost relaxată cu 20%

Decizia responsabilului (2026-08-30): până la modularizarea din v4.0, viteza de livrare contează mai mult
decât menținerea limitei datoriei tehnice. Fiecare valoare de referință **numerică** pentru mecanismul cu clichet a fost relaxată cu 20% într-o
singură etapă auditabilă, iar faza este declarată în `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Ce s-a schimbat                                                                                                                                                                                                                                                     | Unde                                                                                                   |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — numărările unde o valoare mai mică este mai bună ×1.2, procentele unde o valoare mai mare este mai bună ÷1.2 (pragul minim de acoperire 60 a fost păstrat, `eslintErrors` rămâne 0, `eslintWarnings` 0 → 20% din numărul înghețat de suprimări) | `quality-baseline.json` (nota `_relax_velocity_2026_08_30` enumeră fiecare valoare înainte → după)     |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                                                    | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, fiecare limită de linii `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                                                                        | `file-size-baseline.json`                                                                              |
| numărările per fișier / per cod TS ×1.2                                                                                                                                                                                                                             | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                                                 | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` devine consultativ cât timp `_policy.requireTighten === false`                                                                                                                                                                                  | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| execuția nocturnă `bank-ratchet-shrinks` este întreruptă (ar înregistra reducerea măsurată și ar anula marja disponibilă)                                                                                                                                           | `.github/workflows/nightly-release-green.yml`                                                          |

Listele de permisiuni (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **nu** sunt bugete și nu au fost modificate. Porțile de politică de tip admis/respins (secrete, reguli SQL,
contractul pentru documentație/mediu, paritatea i18n, testele unitare) sunt neschimbate — un test eșuat rămâne un test eșuat.

**Instrumente**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — relaxarea
  într-o singură etapă (`scripts/quality/relax-baselines.mjs`); refuză să ruleze de două ori cu aceeași
  notă.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  măsoară fiecare poartă numerică la fel ca CI și afișează marja rămasă pentru fiecare poartă
  (`scripts/quality/baseline-headroom.mjs`). Jobul nocturn `baseline-headroom` publică
  tabelul în tichetul activ **📈 Marja valorilor de referință (faza de viteză)** și adaugă eticheta
  `headroom-alert` atunci când orice poartă se află la cel mult 10% de limita sa sau a depășit-o deja. Acel tichet
  reprezintă avertizarea timpurie: un buget care se umple în câteva zile înseamnă că relaxarea este consumată de
  câteva PR-uri, nu de întreaga echipă — consultați notele `_rebaseline_*` ale porții problematice.

**Modul pentru cod nou (Clean-as-You-Code) — începând cu 2026-08-30, numai pentru calea rapidă a PR-urilor**

La evenimentele `pull_request`, `quality.yml` transmite `--base-ref <PR base SHA>` către `check:file-size`,
`check:complexity-ratchets` și `check:dead-code`. În acest mod, poarta compară HEAD cu
baza de îmbinare, **limitată la fișierele modificate de PR** (`scripts/check/newCodeMode.mjs`:
baza de îmbinare este materializată într-un `git worktree` temporar, ESLint/knip rulează acolo și pe HEAD, iar
numărările per fișier sunt comparate):

- **blocant** — PR-ul a adăugat încălcări de complexitate ciclomatică/cognitivă sau exporturi neutilizate în fișierele pe care le-a modificat
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` în jurnal);
- **consultativ** — totalul global în raport cu valoarea de referință înghețată. Abaterile moștenite nu marchează niciodată cu roșu un
  PR nevinovat; abaterea este înghețată din nou la reconcilierea versiunii și monitorizată de jobul pentru marja disponibilă.

Execuțiile `workflow_dispatch`, verificarea release-green și jobul nocturn pentru marja disponibilă nu au o bază de PR
și păstrează comparația absolută (globală). Acoperirea, duplicarea și acoperirea tipurilor rămân globale
deocamdată (instrumentele lor nu produc eficient o diferență per fișier) — sunt candidate pentru același tratament.

**Închiderea fazei la v4.0 (LTS = mai strict decât înainte, nu „înapoi la normal”)**

1. Pe vârful curat al `release/v4.0.0`: `npm run quality:headroom --json` pentru evidență, apoi
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, precum și opțiunea
   `--update` pentru fiecare prag de verificare a tipurilor — fiecare valoare de referință scade la valoarea măsurată.
2. Ștergeți `_policy` din `quality-baseline.json` (reactivează `--require-tighten` și acumularea
   nocturnă), restabiliți `THRESHOLD = 36` (sau o valoare mai mare) în `check-openapi-coverage.mjs`.
3. Înăspriți dincolo de valorile măsurate acolo unde modularizarea a dat rezultate: `cap` pentru dimensiunea fișierelor înapoi la 1000
   (sau 800), pragurile minime de acoperire +5, 0 exporturi neutilizate pentru pachetele modularizate.

## Linia de referință ratchet (`quality-baseline.json`)

Motorul ratchet (`scripts/quality/check-quality-ratchet.mjs`) citește `quality-baseline.json`
și îl compară cu fișierul `quality-metrics.json` colectat recent. Orice metrică ce regresează
dincolo de valoarea epsilon corespunzătoare determină eșuarea compilării.

Metrici urmărite în prezent:

| Metrică               | Direcție | Semnificație                                         |
| --------------------- | -------- | ---------------------------------------------------- |
| `eslintWarnings`      | `down`   | Numărul de avertismente ESLint nu trebuie să crească |
| `coverage.statements` | `up`     | Acoperirea instrucțiunilor nu trebuie să scadă       |
| `coverage.lines`      | `up`     | Acoperirea liniilor nu trebuie să scadă              |
| `coverage.functions`  | `up`     | Acoperirea funcțiilor nu trebuie să scadă            |
| `coverage.branches`   | `up`     | Acoperirea ramurilor nu trebuie să scadă             |

Pentru a actualiza linia de referință după o îmbunătățire reală:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Opțiunea `--update` scrie valorile măsurate curente în `quality-baseline.json`.
Includeți acest fișier în același commit cu modificarea care a îmbunătățit metrica. Un PR care îmbunătățește o
metrică fără a actualiza linia de referință va fi detectat de `--require-tighten` (Faza 6A.5,
implementare în așteptare).

### Ratchet CodeQL: frecvența reîmprospătării și declanșarea manuală

`check:codeql-ratchet` citește **starea depozitului, reîmprospătată conform unei planificări — nu pentru fiecare PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` raportează
`state: configured`, `schedule: weekly`: scanarea cu configurarea implicită a GitHub, nu o analiză
la fiecare push. Consecință: după îmbinarea unui PR care REMEDIAZĂ alerte, mecanismul ratchet continuă să citească
numărul vechi, mai mare, până când rulează următoarea scanare programată — astfel încât raportează o regresie
pentru fiecare PR deschis, inclusiv pentru modificările ulterioare ale PR-ului de remediere, până când scanarea se actualizează.

**Reîmprospătare manuală**: `gh workflow run codeql.yml --ref release/vX.Y.Z` rulează din nou
analiza și republică alertele în câteva minute. Citiți mai întâi `.github/workflows/codeql.yml`
— antetul său explică faptul că este exclusiv `workflow_dispatch` **deoarece intră în conflict cu
„configurarea implicită” a GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Restabilirea declanșatorilor `push`/`pull_request`/
`schedule` necesită mai întâi o **acțiune din partea proprietarului**: Settings → Code security →
CodeQL: Default → Advanced. Nu adăugați un declanșator `schedule:` fără această comutare — acesta
va produce doar rulări eșuate.

**Restrângeți linia de referință după scăderea numărului** — `node scripts/check/check-codeql-ratchet.mjs
--update` scrie noul număr măsurat în `quality-baseline.json` →
`metrics.codeqlAlerts.value`, astfel încât mecanismul ratchet să nu permită în mod neobservat o regresie până
la vechiul plafon. Exemplu practic (2026-09-02/03): PR #12502 a remediat 7 alerte reale
(13 → 6 alerte deschise măsurate); PR #12530 a restrâns linia de referință înghețată de la 11 → 6 pentru a corespunde; cele
6 rămase au fost apoi respinse, fiecare cu o justificare individuală, până la 0 alerte deschise.

**Respingerea alertelor este decizia operatorului (Regula strictă #14)** — nu respingeți niciodată o alertă CodeQL
fără a consemna justificarea tehnică în comentariul de respingere: `won't fix` pentru
o cerință a protocolului din amonte, `used in tests` pentru un fixture de test, `false positive`
pentru un mecanism de sanitizare pe care CodeQL nu îl poate identifica (precedent: `docs/security/ERROR_SANITIZATION.md`).

---

## Politica de reîncercare a testelor (WS5.4, v3.8.49)

Reîncercarea este configurată per runner, niciodată global — o reîncercare generală transformă regresiile reale
în teste instabile invizibile:

| Runner           | Politică                                                                                                                          | Motiv                                                                                                                                           |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` numai în CI, cu `trace: on-first-retry`                                                                              | Timpii browserului/rețelei sunt cu adevărat nedeterminiști; o reîncercare cu o urmă transformă un test instabil într-un artefact diagnosticabil |
| Vitest           | FĂRĂ reîncercare globală. Un test dovedit instabil primește o reîncercare explicită per test (vizibilă în diff, verificată în PR) | Păstrează lista de carantină în repo, niciodată opacă                                                                                           |
| node:test (unit) | FĂRĂ reîncercare, niciodată                                                                                                       | Un test unitar instabil este o eroare în test — remediați-l, nu îl rulați din nou                                                               |

SLO-uri țintă după implementarea telemetriei pentru teste instabile (WS5.2/5.3): rată de instabilitate <1% per test
(pragul „remediați acum”), rată de succes ≥95% per pipeline. Valori de referință din industrie —
recalibrați-le pe baza propriilor noastre măsurători.

## Deriva ratchet-ului la nivel de release (WS5.5, v3.8.49)

Când un ratchet (dimensiunea fișierelor, complexitate, avertismente eslint) regresează pe vârful release-ului PUR
— adică însăși COMBINAȚIA operațiunilor de merge a produs regresia, iar niciun PR individual nu reproduce
regresia pe propria ramură — remedierea îi revine **release captain-ului, o singură dată, pe ramura de
release**: preferați extragerea/refactorizarea; restabiliți baseline-ul numai cu intrarea de justificare
documentată. Nu transferați niciodată deriva rezultată din combinație către PR-ul unui contributor și nu
restabiliți niciodată baseline-ul per PR (aceasta ascunde regresiile reale). Mai întâi faceți distincția: reproduceți
starea roșie pe vârful pur într-un worktree de verificare înainte de a presupune că PR-ul vostru a cauzat-o.

## Stocarea reducerilor ratchet-ului — direcția descendentă (#8584)

Ratchet-ul este automat doar pe jumătate și tocmai jumătatea greșită. **Creșterea** unei limite este o
editare JSON manuală care durează zece secunde și reprezintă cea mai rapidă metodă de a debloca un PR roșu.
**Reducerea** uneia necesită ca cineva să ruleze `--update` și să comită rezultatul — iar până la introducerea
jobului `bank-ratchet-shrinks`, niciun flux de lucru nu îl rula. Consecința măsurată
(2026-07-25): 18 fișiere înghețate aflate deja la limita de 800 de linii pentru fișiere noi sau sub aceasta, cel mai grav
caz fiind la 132× (`src/shared/validation/schemas.ts`, 19 linii cu o limită de 2.523); plafonul
de complexitate a evoluat `1794 → 2169` pe parcursul a ~37 de note de restabilire a baseline-ului, cu exact o
scădere (−1); iar „restrângeți prin `--update` în ciclul următor” a fost scris de 31 de ori și respectat
o singură dată. O limită care supraviețuiește codului ce a justificat-o transformă discret fiecare
descompunere finalizată într-o marjă de creștere pentru următoarea persoană care editează fișierul.

`nightly-release-green.yml` → jobul **`bank-ratchet-shrinks`** închide această buclă:

|            |                                                                                                           |
| ---------- | --------------------------------------------------------------------------------------------------------- |
| Rulează la | `schedule` (3×/zi) + `workflow_dispatch` — în mod deliberat **nu** la `push`                              |
| Măsoară    | cel mai recent `release/vX.Y.Z`, cu aceeași rezoluție + aceeași protecție la injectare ca `release-green` |
| Scrie      | `check:file-size --update` și `check:complexity-ratchets --update` (ambele reduc numai prin construcție)  |
| Verifică   | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                  |
| Livrează   | un singur PR permanent actualizat către ramura de release — actualizat forțat, fără spam                  |

Stocarea se face în loturi, nu la fiecare push, deoarece nu are cerințe de latență (o reducere
stocată în decurs de 8h este acceptabilă), în timp ce o rulare la fiecare merge ar reconstrui în mod repetat ramura PR-ului
în timpul campaniilor de merge și ar suporta de fiecare dată costul unei parcurgeri ESLint complete. Detectarea rămâne la
push (`release-green`); numai stocarea se face în loturi.

### Verificatorul de siguranță

Jobul scrie nesupravegheat în baseline-uri, astfel că `verify-ratchet-bank.mjs` este ceea ce face
acest lucru acceptabil. Acesta compară arborele de după `--update` cu `HEAD` și **abandonează jobul
înainte să existe vreun commit** — fără a deschide niciun PR — dacă fiecare modificare nu este una dintre următoarele:

- o intrare numerică `frozen` / `testFrozen` **redusă** sau **eliminată**
- `complexity-baseline.json` → `count` **redus**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **redus**

Orice altceva eșuează: creșterea unui număr, adăugarea unei intrări, modificarea `cap`/`testCap` sau
ștergerea/rescrierea unei note `_rebaseline_*` (acele note reprezintă istoricul de audit al motivului pentru care există fiecare
plafon și sunt stocate în același obiect `frozen` ca intrările fișierelor).
Un bot care ar putea crește o limită ar fi categoric mai rău decât situația actuală. Protecție împotriva regresiilor:
`tests/unit/verify-ratchet-bank.test.ts`.

Jobul nu face niciodată push către `release/*` — un om face merge pentru PR, astfel încât o măsurătoare eronată
nu poate ajunge în cod fără verificare.

## Politica listei de permisiuni

Fiecare control care nu poate eșua din cauza încălcărilor preexistente utilizează o listă de permisiuni înghețată
(de exemplu, `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Politica este:

**Remediați cauza principală; utilizați lista de permisiuni numai atunci când încălcarea este preexistentă și
nu poate fi remediată în același PR.**

Când adăugați o intrare într-o listă de permisiuni:

1. Includeți un comentariu cu justificarea.
2. Faceți referire la problema de urmărire (de exemplu, `// #3498 — Funcționalitate din Faza 2, neimplementată încă`).
3. Eliminați intrarea în același PR care remediază încălcarea — o intrare învechită care nu mai
   suprimă o încălcare activă este ea însăși un defect (verificarea intrărilor învechite 6A.3 va
   face controlul să eșueze pentru o intrare orfană din lista de permisiuni după implementare).

**Nu** adăugați intrări în lista de permisiuni pentru ca testele să treacă mai repede. Un control reușit cu o
listă de permisiuni în continuă creștere oferă o falsă impresie de calitate.

### Când un control eșuează pentru PR-ul dvs.

1. **Citiți cu atenție rezultatul controlului** — acesta vă indică exact ce fișier sau simbol a încălcat
   regula.
2. **Remediați încălcarea** — majoritatea controalelor sunt verificări deterministe ale sistemului de fișiere care trec imediat
   ce codul este corect.
3. **Dacă încălcarea este preexistentă** (adică nu a fost introdusă de dvs., dar acum intră
   în aria de acoperire a controlului): adăugați o intrare în lista de permisiuni, cu un comentariu justificativ și o problemă de urmărire.
4. **Dacă verificarea este un mecanism cu prag progresiv** (acoperire, avertismente ESLint, duplicare, complexitate):
   modificarea dvs. a înrăutățit metrica. Remediați problema de fond sau, în cazuri rare, rulați
   `npm run quality:ratchet -- --update` dacă modificarea este intenționată, iar
   degradarea metricii este acceptabilă — însă documentați motivul în descrierea PR-ului.
5. **Controalele consultative** (`continue-on-error: true`) au rol informativ — acestea nu blochează
   îmbinarea, dar apar în rezumatul CI. Remediați-le oricum.

---

## Adăugarea unui control nou

1. Creați `scripts/check/check-<name>.mjs` (sau `.ts`). Controalele de politică se încheie cu codul 0/1.
   Controalele de tip prag progresiv emit o metrică în `quality-metrics.json` prin `collect-metrics.mjs`.
2. Adăugați `"check:<name>": "node scripts/check/check-<name>.mjs"` în `package.json`.
3. Integrați-l în `.github/workflows/ci.yml`, în cadrul jobului corespunzător
   (politică → `lint` sau `docs-sync-strict`; prag progresiv → `quality-gate`).
4. Dacă are o listă de permisiuni, aplicați `reportStaleEntries()` din
   `scripts/check/lib/allowlist.mjs`, astfel încât intrările învechite să fie detectate automat.
5. Scrieți un test în `tests/unit/build/` care să acopere logica de detectare a controlului.
6. Actualizați acest document (adăugați un rând în tabelul jobului relevant).

---

## Instrumente pentru agenți: LSP integrat în buclă (opțional)

Pe lângă controalele CI, OmniRoute include o structură de bază **opțională** `agent-lsp`
(un fișier `.mcp.json` la nivel de proiect, Faza 7, Sarcina 15). Creați `.mcp.json`
pentru a expune un server de limbaj TypeScript agenților de programare, astfel încât aceștia să rezolve simbolurile /
diagnosticele **înainte** de a scrie cod — un mecanism complementar „compilare înainte de afirmare” pentru
`typecheck:core`, care elimină de la sursă erorile de tip „simbol inventat”. În mod intenționat,
acesta nu este încărcat automat (dvs. alegeți și verificați puntea MCP↔LSP); o intrare nefuncțională doar înregistrează o
eroare de conexiune și nu întrerupe niciodată sesiunile.

---

## Restanțe de raționalizare (revizuire ROI — Faza 9 Valul 3)

Acest inventar a fost reconciliat cu `ci.yml` la 2026-06-17 (versiunea anterioară omitea
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). O revizuire ROI a setului reconciliat
a identificat următorii candidați pentru raționalizare. **Comasările sunt modificări CI
mecanice; activările/dezactivările sunt decizii de politică rezervate operatorului.** Nimic din cele de mai jos
nu este aplicat încă.

**De asemenea, nedocumentate mai sus** (consultative, semnal slab): jobul `docs-lint`
(markdownlint + Vale, întregul job cu `continue-on-error`) și fluxurile de lucru autonome pentru scanare
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` se află în
`quality-baseline.json`, dar nu este conectat la un mecanism de blocare bazat pe prag în `ci.yml` — metrica este
în prezent orfană.

### Comasare / deduplicare (mecanică, risc mai scăzut)

Fiecare candidat a fost validat în raport cu starea efectivă a barierelor la 2026-06-17 (încredere, dar cu verificare);
mai multe comasări „evidente” s-au dovedit a ascunde datorie tehnică și **nu** pot fi aplicate
direct fără probleme.

- **`check:docs-sync` rulează de două ori** — separat în jobul `lint` și din nou în `check:docs-all` (`docs-sync-strict`) și în hook-ul husky pre-commit. ✅ **FINALIZAT** — invocarea separată din `lint` a fost eliminată.
- **Scanarea CVE** — ❌ **NU este o comasare simplă.** `audit:deps` eșuează ferm la orice CVE cu severitate ridicată/critică; `check:vuln-ratchet` (osv) eșuează doar la o _regresie_ față de valoarea de referință (în prezent 1 MODERATE). Semantică diferită — eliminarea `audit:deps` ar elimina bariera absolută pentru severități ridicate/critice. Păstrați-le pe ambele.
- **Detectarea ciclurilor** — ❌ **NU este o comasare simplă.** `check:circular-deps` (dpdm) raportează **91 de cicluri** (acesta este motivul pentru care are caracter consultativ); nu poate fi promovat la statut de blocare fără a le rezolva mai întâi și are un domeniu de aplicare mai larg decât `check:cycles`, care este verde și atent configurat. Păstrați `check:cycles` ca mecanism de blocare; rezolvarea celor 91 de cicluri dpdm constituie o restanță separată.
- **Complexitate** — ✅ **FINALIZAT** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): o singură parcurgere ESLint, cu numărare după ruleId, astfel încât valorile de referință pentru complexitatea ciclomatică+numărul maxim de linii și complexitatea cognitivă să rămână independente; comenzile individuale `check:complexity` / `check:cognitive-complexity` sunt păstrate pentru rulări locale cu `--update`.
- **Prevenirea halucinațiilor pentru `/api`** — ✅ **FINALIZAT** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): un singur inventar FS pentru `src/app/api`, openapi-routes + docs-symbols continuă să raporteze independent; comenzile individuale sunt păstrate pentru rulări locale.
- **`check:node-runtime` rulează în 11 joburi** — ⚠️ **ROI scăzut.** Fiecare folosește un runner separat, iar verificarea durează <1s; economia totală este de ~10s, cu prețul pierderii unei protecții ieftine pentru fiecare job. Nu merită schimbările aferente.
- **`typecheck:noimplicit:core` în lint-ul CI** — ✅ **eliminat din jobul lint** (avea caracter consultativ, cu `continue-on-error`); suprafața de tipuri blocantă este `typecheck:core` + `check:type-coverage`. Scriptul local a fost păstrat.

### Activare / decizie (politica operatorului)

- `check:openapi-security-tiers` (consultativ) — ❌ **NU poate fi activat fără modificări prealabile.** Se încheie cu codul 0, dar avertizează că mai multe rute `traffic-inspector` din `LOCAL_ONLY_API_PREFIXES` nu au adnotarea `x-loopback-only: true`. Impunerea verificării necesită mai întâi adăugarea acestor adnotări în `openapi.yaml`.
- `typecheck:noimplicit:core` (consultativ) — este în mare parte acoperit de mecanismul blocant bazat pe prag `check:type-coverage`. Transformați-l într-un mecanism bazat pe prag sau eliminați a doua trecere `tsc`, care este redundantă.
- `test:vitest:ui` (acum **blocant**) — erorile preexistente sunt excluse explicit în `vitest.config.ts` prin comentarii de urmărire `// #8618`; erorile noi fac jobul să eșueze.
- `check:secrets` (gitleaks, mecanism blocant bazat pe prag, fixat la 3 rezultate fals pozitive documentate) — adăugați-le pe cele 3 în lista de permisiuni pentru a ajunge la 0 sau retrogradați verificarea la statut consultativ. Se suprapune cu scanarea nativă GitHub a secretelor + `check:public-creds`.
- `check:pr-evidence` (blocant, caută expresii în textul corpului PR-ului) — risc ridicat de rezultate fals pozitive; eliminarea sa slăbește aplicarea Regulii stricte #18, așadar aceasta este o decizie autentică de politică.
- `semgrep` (flux autonom consultativ) — se suprapune cu CodeQL pentru familiile OWASP; conectați valoarea sa de referință la un mecanism bazat pe prag sau eliminați-l.

---

## Documentație asociată

- Lanț de aprovizionare (proveniență, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — poartă pentru paritatea seturilor de chei

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, jobul `i18n-ui-coverage`).
Compară setul de chei-frunză al fiecărui fișier `src/i18n/messages/<locale>.json` cu `en.json` și eșuează
la orice cheie-frunză absentă sau suplimentară, indiferent de momentul în care a fost adăugată cheia. Substituenții
`__MISSING__:` sunt considerați prezenți (conținutul lor ține de poarta bazată pe raport). Este complementul absolut
al celor două porți bazate pe diferențe/procente: `check-ui-keys-coverage` impune un prag minim de 80 % pentru fiecare
localizare (43 de chei absente din ~13.000 indică totuși 99,7 %), iar `check-new-key-coverage` evaluează
doar cheile pe care un PR le adaugă în `en.json`. Un lot de localizări este generat din versiunea `en.json` existentă în ziua
în care este creată ramura sa și este tradus timp de mai multe zile, în vreme ce baza continuă să adauge chei; PR-ul lotului nu adaugă el însuși
nicio cheie, astfel că ambele porți înrudite au rămas inactive când lotul 1 (#13044) a fost integrat cu 43 de chei lipsă în nouă
localizări, iar lotul 2 (#13660), cu 10 chei lipsă în opt localizări (2026-09-15). Remediați o eroare cu
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; o cheie-frunză `extra`
înseamnă că sursa a eliminat-o — ștergeți-o din localizare. `--warn` raportează fără a provoca eșuarea.
`--catalog=cli` execută aceeași comparație pentru `bin/cli/locales` (`npm run i18n:check-keys:cli`);
ambii pași se află în jobul `i18n-ui-coverage`.

#### `check-new-key-coverage` — poartă i18n pentru chei noi

Poartă înrudită cu `check-ui-value-drift`. Aceasta din urmă detectează o valoare în limba engleză care a fost **rescrisă**
în timp ce traducerile sale au rămas neschimbate; aceasta detectează o cheie în limba engleză care a fost **adăugată**
fără ca unele localizări să o primească.

`check-ui-keys-coverage` nu poate detecta această categorie: impune un prag procentual minim pentru fiecare localizare, iar
unsprezece chei absente din ~13.000 mențin acoperirea la 99,9 %. Un procent per limbă nu poate
exprima „această funcționalitate a fost livrată netradusă” — o funcționalitate întreagă poate ajunge într-o localizare nouă fără niciun
text și fără să modifice vreodată procentul.

Incidentul pe care îl codifică: faza 3 a Orchestration Canvas și-a tradus cele unsprezece chei în
cele 42 de localizări existente la acel moment. Câteva ore mai târziu, lotul de limbi UE (#13044) a mărit depozitul
la 51 de localizări, iar cele nouă nou-venite (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) nu le-au
primit niciodată. `deepMergeFallback` înlocuiește o cheie absentă cu textul în limba engleză, astfel încât modul de manifestare a erorii a fost
o interfață netradusă, nu una goală — o problemă reală și, prin construcție, silențioasă.

La fel ca poarta înrudită, aceasta este **conștientă de diferențe**, comparând versiunea în limba engleză de la baza îmbinării cu arborele
de lucru, astfel încât lacunele preexistente rămân înghețate, iar poarta nu a necesitat nicio migrare pentru a fi activată.

**Un marcaj `__MISSING__:<english>` nu o satisface (începând cu 2026-09-17).** Anterior, acesta era
mecanismul documentat pentru amânare — la rulare se revine la textul corect în limba engleză — până când opt PR-uri cu funcționalități din
2026-09-16 au adăugat 61 de chei și au introdus marcajul în toate cele 65 de localizări în loc să traducă: această
poartă le-a acceptat pe toate, nimic nu a blocat PR-urile, iar poarta blocantă bazată pe raportul traducerilor reale
a eșuat apoi la vârful versiunii pentru toată lumea (pt-BR 3,2 % > 2,5 % + 0,5). Un marcaj este acum considerat
o traducere absentă. Remediați o eroare cu
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` sau
toate localizările în paralel cu `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
sigur pentru execuție detașată, refuză să pornească fără variabilele de mediu `OMNIROUTE_TRANSLATION_*`). O cheie care trebuie să rămână
în limba engleză (numele fix al unui produs/motor/indicator) trebuie inclusă în `scripts/i18n/untranslatable-keys.json`,
niciodată ascunsă în spatele unui marcaj. `vi` interzice complet marcajele (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — poartă pentru testele suspendate

Un fișier din lista `exclude` a `vitest.config.ts` este un test care nu rulează, dar pare
acoperire pentru oricine examinează arborele. Șaizeci și două de fișiere s-au acumulat în spatele comentariului
`// #8618 — pre-existing failure; remove this exclusion when fixed`. Problema #8618 a fost închisă la
2026-08-11, în timp ce lista pe care o urmărea a crescut de la 45 la 62 de intrări, fiecare intrare nouă moștenind un comentariu
care indica o problemă închisă. Când lista a fost în cele din urmă măsurată fișier cu fișier (#13204), **51 dintre cele 62
au trecut pe arborele curent fără nicio modificare a sursei**.

Poarta impune ca fiecare excludere care se rezolvă la un fișier real (a) să numească o problemă de urmărire și
(b) să apară în `config/quality/vitest-exclusions.json` împreună cu starea sa măsurată, astfel încât adăugarea uneia să fie
o diferență ce poate fi revizuită într-un fișier dedicat, în loc de încă o linie într-o matrice cu 60 de intrări. În mod intenționat,
aceasta nu rulează din nou testele excluse — operațiunea durează ~10 minute și aparține unui job periodic; inventarul
înregistrează momentul ultimei măsurători a fiecăruia.
