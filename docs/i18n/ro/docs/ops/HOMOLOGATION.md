# Homologation Suite (`npm run homolog`) (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇧🇦 [bs](../../../bs/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇸 [es](../../../es/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

Validare E2E în mediu real a implementării OmniRoute care rulează pe VPS-ul de omologare
(`HOMOLOG_BASE_URL`, de ex. `http://192.168.0.15:20128`). O singură comandă înlocuiește lista de verificare manuală
STOP #2 pentru lansare cu o rulare automatizată care produce dovezi.

## Ce acoperă

| Nivel                  | Ce verifică                                                                                                                                                                                                            | Implementare                                                                  |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — stare/paritate    | `/api/monitoring/health` răspunde cu `200`, având `status: "healthy"` și versiunea așteptată                                                                                                                           | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — cheie temporară  | Autentificare ca administrator → `POST /api/keys` creează o cheie API cu domeniu limitat pentru rulare, revocată (`DELETE /api/keys/:id`) într-un bloc `finally`, indiferent de rezultat                               | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — suprafață API    | Catalogul `/v1/models`, o completare de chat reală fără streaming (model critic pentru nivel, `max_tokens: 5`), un răspuns `401` pentru o cheie nevalidă și endpointul public `/api/monitoring/health`                 | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — streaming SSE    | Completare de chat reală cu streaming; verifică `text/event-stream`, cel puțin un delta de conținut și un terminator `[DONE]`                                                                                          | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — furnizori reali   | Câte o solicitare de chat cu cost minim pentru fiecare furnizor critic prezent în catalogul live `/v1/models`, generată dinamic prin promptfoo                                                                         | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — autentificare UI | Se autentifică o singură dată prin formularul real de autentificare și reutilizează sesiunea (`storageState`) în întregul nivel UI                                                                                     | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — rute UI          | Fiecare `page.tsx` static de sub `src/app/(dashboard)/dashboard` (descoperit din sistemul de fișiere; rutele dinamice `[param]` sunt omise) se încarcă fără eroare HTTP, eroare de pagină sau limita de eroare Next.js | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — flux UI critic   | Creează o cheie API prin interfața dashboardului și apoi o revocă (nu lasă reziduuri pe VPS)                                                                                                                           | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — raport unificat   | Combină httpYac (prin `junit-to-ctrf`), adaptorul promptfoo→CTRF și raportorul CTRF Playwright într-un singur `homolog-ctrf.json`, plus un fișier `homolog-report/summary.md` ușor de citit                            | `scripts/homolog/run.mjs`                                                     |

Nicio implicare a unui LLM în reluarea propriu-zisă — aceasta este o baterie deterministă de teste de regresie,
nu o evaluare. AI intervine doar în activitățile viitoare de mentenanță (consultați Foaia de parcurs de mai jos).

## Cerințe preliminare

1. Copiați `.env.homolog.example` în `.env.homolog` (ignorat de git — nu îl comiteți niciodată) și completați:
   - `HOMOLOG_BASE_URL` — implementarea țintă, de ex. `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — parola de administrare a panoului pentru implementarea respectivă.
   - `HOMOLOG_CRITICAL_PROVIDERS` — prefixuri de furnizori separate prin virgule, pentru care se
     efectuează o cerere reală de chat pentru testarea de bază (de ex. `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — lăsați necompletat în rulările normale; suita își creează și revocă
     propria cheie temporară. Setați această valoare doar pentru a depana separat un singur nivel.
2. Rulați `npm install` în depozit (dependențele suitei — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — sunt devDependencies obișnuite).
3. Rulați `npx playwright install` dacă binarele browserelor nu sunt deja prezente.

## Cum se rulează

```bash
npm run homolog
```

Pentru a valida o implementare a cărei versiune nu corespunde cu cea din fișierul local `package.json`
(de ex. un mediu de omologare care încă folosește o versiune patch anterioară), suprascrieți explicit
versiunea așteptată:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

Rularea se încheie cu un cod diferit de zero dacă oricare dintre niveluri eșuează și încearcă întotdeauna să revoce cheia
API temporară pe care a creat-o, chiar și în caz de eșec (blocul `finally` din `scripts/homolog/run.mjs`).

## Interpretarea raportului

Toate rezultatele sunt salvate în `homolog-report/` (ignorat de git):

- `summary.md` — același tabel afișat în stdout, cu un rând pentru fiecare nivel (✅/❌ + detalii).
- `homolog-ctrf.json` — raportul CTRF unificat (rezultat din îmbinarea rezultatelor API/SSE, a testelor de bază ale furnizorilor și a
  rezultatelor UI) — acesta este artefactul care trebuie atașat listei de verificare STOP #2 a unei versiuni.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — rapoartele
  brute/intermediare pentru fiecare nivel.
- `promptfooconfig.yaml`, `provider-misses.json` — configurația promptfoo generată pentru
  rularea curentă și orice furnizori critici care lipseau din catalogul activ.

Un eșec la L0 oprește imediat execuția (nu se creează nicio cheie temporară), deoarece o neconcordanță
de versiune/stare înseamnă că fiecare nivel ulterior ar valida implementarea greșită.

## Restabilirea referințelor când interfața se modifică în mod legitim

L4b (testarea de bază a rutelor) și L4c (fluxul UI pentru cheia API) sunt controlate prin localizatori DOM reali, nu prin
instantanee, astfel încât majoritatea modificărilor legitime ale interfeței nu necesită actualizarea suitei. Când o modificare
afectează un localizator (de ex. eticheta unui buton este redenumită sau o pagină de setări este mutată):

1. Reconfirmați localizatorul în raport cu sursa curentă (specificațiile documentează deja
   fișierul/linia în raport cu care a fost confirmat fiecare localizator — urmați același model, nu ghiciți).
2. Actualizați specificația din `tests/homolog/ui/`.
3. Rulați din nou `npm run homolog` (sau doar specificația Playwright afectată) pe VPS pentru a
   confirma remedierea, apoi efectuați commitul.

Această suită nu conține nicio referință vizuală/la nivel de pixeli (F1) — consultați Foaia de parcurs pentru aceasta.

## Foaie de parcurs (F2 / F3)

Proiectarea și lansarea etapizată sunt descrise în specificația internă de planificare
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (fără link — artefact intern
`_tasks/`, care nu face parte din documentația urmărită a acestui depozit). Rezumat:

- **F2** — înregistrarea unei parcurgeri complete → agenții Playwright Test (`planner`/`generator`)
  o transformă în specificații de flux (crearea unei combinații, testarea furnizorului, editarea setărilor, instrumente MCP) +
  o referință pentru regresie vizuală (Lost Pixel), cu măști peste datele dinamice (metrici,
  marcaje temporale, jurnale) + o rutină de întreținere `healer` pentru fiecare versiune.
- **F3** — acoperirea rezilienței/contractelor/conectării: toxiproxy + un furnizor fals compatibil cu OpenAI
  pe devbox, o combinație `homolog-resilience` pe VPS configurată să îl utilizeze
  (timeout injectat → verificarea trecerii la alternativa de rezervă + deschiderea/închiderea întrerupătorului de circuit prin
  `/api/monitoring/health`); testare contractuală Schemathesis condiționată pe baza
  `docs/openapi.yaml` (valoare mică pentru `--max-examples`, seeduri fixe, exclusiv endpointuri non-LLM); și
  integrarea comenzii `npm run homolog` și a fișierului său `summary.md` în etapa STOP #2 din `/generate-release`.
