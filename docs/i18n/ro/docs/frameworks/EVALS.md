# Evaluations (Evals) (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Sursa adevărului:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Ultima actualizare:** 2026-06-28 — v3.8.40

OmniRoute include un cadru generic de evaluare pe care îl puteți utiliza pentru a compara configurații de rutare, furnizori/modele individuale sau suitele „golden set” incluse.
Utilizați-l pentru a verifica modificările de rutare, a valida furnizori noi și a condiționa lansările înainte de a le promova pentru traficul de producție.

Cadrul este implementat astfel:

- Un executor pur (`src/lib/evals/evalRunner.ts`) care înregistrează în memorie suitele
  integrate, evaluează rezultatele în raport cu criteriile așteptate și agregă
  fișele de punctaj.
- Un strat de persistență (`src/lib/db/evals.ts`) pentru suitele personalizate
  (definite de utilizator) și rulările istorice din SQLite.
- Un strat de orchestrare (`src/lib/evals/runtime.ts`) care execută fiecare caz
  prin trimiterea apelurilor reale către `POST /v1/chat/completions`, înregistrează latența
  și rezultatele și salvează rularea.
- Endpointuri REST în `/api/evals/*` (numai cu autentificare de administrare).
- O interfață în panoul de control la `Dashboard → Usage → Evals` (`EvalsTab.tsx`).

## Concepte

### Suită

O suită este o colecție denumită de cazuri de testare, cu o `description` și unul sau
mai multe cazuri. Suitele provin din două surse:

| Sursă      | Locul definirii                                | Modificabilă în timpul rulării? |
| ---------- | ---------------------------------------------- | ------------------------------- |
| `built-in` | Înregistrată prin `registerSuite()` la pornire | Nu (definită în cod)            |
| `custom`   | Stocată în SQLite `eval_suites` + `eval_cases` | Da (prin API/UI)                |

Suitele integrate actuale (consultați `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 cazuri de referință pentru saluturi/matematică/traducere/siguranță
- `coding-proficiency` — Python/JS/SQL/TS/detectarea erorilor
- `reasoning-logic` — silogisme, probleme formulate în cuvinte, recunoașterea tiparelor
- `multilingual` — traducere și detectarea limbii
- `safety-guardrails` — PII, jailbreak, refuz, conștientizarea prejudecăților
- `instruction-following` — exclusiv JSON, liste numerotate, constrângeri lingvistice
- `codex-comparison` — sarcini de programare comparative, destinate modului de comparare

### Caz

Fiecare caz conține:

| Câmp       | Descriere                                                               |
| ---------- | ----------------------------------------------------------------------- |
| `id`       | Identificator stabil (utilizat drept cheie pentru rezultate și metrici) |
| `name`     | Etichetă ușor de înțeles                                                |
| `model`    | Modelul implicit atunci când rularea utilizează ținta `suite-default`   |
| `input`    | `{ messages, max_tokens? }` — trimis către `/v1/chat/completions`       |
| `expected` | `{ strategy, value }` — baremul de evaluare (consultați mai jos)        |
| `tags`     | Etichete opționale (de exemplu, `safety`, `pii`, `jailbreak`)           |

### Țintă

Aceeași suită poate fi rulată cu ținte diferite. Schema țintei este
`evalTargetSchema` din `src/shared/validation/schemas.ts`:

| Tipul țintei    | `id`               | Comportament                                                                    |
| --------------- | ------------------ | ------------------------------------------------------------------------------- |
| `suite-default` | `null`             | Fiecare caz utilizează propriul câmp `model` integrat                           |
| `model`         | numele modelului   | Forțează fiecare caz să utilizeze un singur model direct (de exemplu, `gpt-4o`) |
| `combo`         | numele combinației | Rulează fiecare caz printr-o singură combinație (testează motorul de rutare)    |

Pentru `model` și `combo`, câmpul `id` este obligatoriu (impus de Zod
`superRefine`). Atunci când este furnizat `compareTarget`, cele două ținte trebuie să fie diferite —
executorul salvează ambele rulări sub același `runGroupId` pentru comparația A/B.

## Criterii de evaluare

Implementate în `evaluateCase()` (evalRunner.ts):

| Strategie  | Trecut când…                                                                           |
| ---------- | -------------------------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                                      |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`                    |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` este adevărat                          |
| `custom`   | `expected.fn(actualOutput, evalCase)` returnează o valoare adevărată (doar încorporat) |

**Notă:** Evaluarea prin funcții personalizate este rezervată suitelor definite
în cod (încorporate), deoarece funcțiile nu pot fi serializate prin API.
`evalCaseBuilderSchema` acceptă doar `contains | exact | regex` pentru suitele
create de utilizatori.

În prezent, nu există un evaluator bazat pe LLM sau pe similaritatea înglobărilor
— acesta ar reprezenta un punct de extensie clar în `evaluateCase()`.

## Schema bazei de date

Trei tabele (migrările `030_create_eval_runs.sql` și
`031_create_eval_suites.sql`):

| Tabel         | Scop                                                                                                                         |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Metadatele suitelor personalizate (`id`, `name`, `description`)                                                              |
| `eval_cases`  | Cazurile fiecărei suite — `input_json`, `expected_*`, `tags_json`                                                            |
| `eval_runs`   | Rulări istorice — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Suitele încorporate **nu** sunt stocate în baza de date. Acestea se află în
memorie și sunt reînregistrate de fiecare dată când este importat
`evalRunner.ts`.

## API REST

Toate endpoint-urile necesită autentificare de administrare
(`requireManagementAuth`) — acestea nu fac parte din suprafața proxy publică.

| Endpoint                      | Metodă   | Descriere                                                                 |
| ----------------------------- | -------- | ------------------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | Listează suitele + rulările recente + fișa de scor + țintele + cheile     |
| `/api/evals`                  | `POST`   | Rulează o suită (individual sau comparativ) — schema `evalRunSuiteSchema` |
| `/api/evals/{suiteId}`        | `GET`    | Preia o suită (încorporată sau personalizată)                             |
| `/api/evals/suites`           | `POST`   | Creează o suită personalizată — schema `evalSuiteSaveSchema`              |
| `/api/evals/suites/{suiteId}` | `GET`    | Preia o suită personalizată                                               |
| `/api/evals/suites/{suiteId}` | `PUT`    | Înlocuiește o suită personalizată (cazurile sunt reinserate)              |
| `/api/evals/suites/{suiteId}` | `DELETE` | Șterge o suită personalizată și cazurile acesteia                         |

### Rularea unei suite

```bash
curl -X POST http://localhost:20128/api/evals \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "suiteId": "golden-set",
    "target": { "type": "combo", "id": "my-combo" },
    "apiKeyId": "optional-api-key-uuid"
  }'
```

Câmpuri opționale:

- `outputs` — `Record<caseId, string>` cu rezultate precalculate. Când este
  furnizat, executorul **omite trimiterea** și evaluează doar rezultatele din
  cache (util pentru evaluarea offline).
- `compareTarget` — o a doua țintă de rulat în paralel; ambele rulări au în comun
  un `runGroupId` generat pentru vizualizarea comparativă directă.
- `apiKeyId` — cheia API internă utilizată pentru autentificarea apelurilor
  `/v1/chat/completions` trimise. Obligatorie când `REQUIRE_API_KEY` este activată.

### Crearea unei suite personalizate

```bash
curl -X POST http://localhost:20128/api/evals/suites \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production smoke",
    "description": "Quick sanity check before deploy",
    "cases": [
      {
        "name": "JSON shape",
        "model": "gpt-4o",
        "input": { "messages": [{ "role": "user", "content": "Reply with {\"ok\": true}" }] },
        "expected": { "strategy": "regex", "value": "\"ok\"\\s*:\\s*true" }
      }
    ]
  }'
```

## Fluxul de execuție

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Rezolvă suita (încorporată sau personalizată).
2. Pentru fiecare caz, construiește un `Request` către `/v1/chat/completions` cu
   `messages` ale cazului, `model` rezolvat, `stream: false` și `max_tokens: 512`
   (sau valoarea suprascrisă în caz).
3. Apelează direct handlerul de chat (în cadrul procesului — fără un salt HTTP suplimentar).
4. Înregistrează latența și extrage textul fie din `choices[0].message.content`,
   fie din payload-ul `output[]` al API-ului Responses.
5. Evaluează toate rezultatele prin `runSuite()`, apoi le persistă prin `saveEvalRun()`.

Cazurile sunt executate **secvențial**. În prezent nu există niciun indicator pentru concurență.

## Panoul de control

Interfața se află la `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). De acolo puteți:

- Răsfoi suitele încorporate și personalizate, cu previzualizare pentru fiecare caz.
- Crea/edita/șterge suite personalizate cu ajutorul constructorului de cazuri.
- Alege o țintă (valorile implicite ale suitei / model / combo), opțional o a doua
  `compareTarget`, opțional o cheie API, apoi executa la cerere.
- Consulta istoricul execuțiilor, rezultatul de reușită/eșec pentru fiecare caz, latența și rezultatele capturate.
- Vedea tabloul de scor agregat dinamic pe baza celei mai recente execuții pentru fiecare
  domeniu `(suite, target)`.

## Relația cu RFC-ul Auto-Assessment

Un subsistem de evaluare separat și mai restrâns se află în `src/domain/assessment/`
(consultați și [AUTO-COMBO.md](../routing/AUTO-COMBO.md) pentru motorul activ de calculare a scorurilor).
Acest subsistem vizează motorul Auto Combo — evaluează automat furnizorii și
modelele, astfel încât combinațiile să se poată autoremedia atunci când serviciile din amonte eșuează. Utilizează propriul runner,
propriul clasificator și propria logică de calculare a scorurilor.

Cadrul Evals documentat aici este **suprafața de testare mai largă, cu scop
general**. Preferați-l pentru suite de regresie arbitrare, comparații A/B
și teste de verificare rapidă pentru fiecare versiune. Utilizați subsistemul Auto-Assessment atunci când aveți nevoie
ca starea în timp real a furnizorilor să influențeze deciziile de rutare.

## Integrarea CI

În prezent, nu există un script npm dedicat `eval:ci`. Există două opțiuni dacă doriți să
condiționați lansările de rezultatele evaluărilor:

- **Calea HTTP**: porniți serverul, trimiteți o cerere `POST /api/evals` cu un
  `suiteId` + `target` cunoscut și verificați condiția `runs[].summary.passRate >= N` în
  răspuns.
- **Calea în cadrul procesului**: importați `runEvalSuiteAgainstTarget()` din
  `@/lib/evals/runtime` într-un script, executați-l asupra unei baze de date de test și verificați
  valoarea `PersistedEvalRun.summary` returnată.

Testele care acoperă ruta și istoricul se află în
`tests/unit/evals-route.test.ts` și `tests/unit/evals-history.test.ts`.

## Puncte de extensie

Modificări frecvente și locurile în care trebuie efectuate:

- **Strategie nouă de calculare a scorului** — extindeți blocul `switch (evalCase.expected.strategy)`
  din `evaluateCase()` (`evalRunner.ts`) și extindeți `EvalCaseStrategy` în
  `src/lib/db/evals.ts`, precum și `evalCaseBuilderSchema` în `schemas.ts`.
- **Suită încorporată nouă** — definiți un obiect pentru suită și apelați `registerSuite()` în
  partea de jos a fișierului `evalRunner.ts`. Aceasta va fi descoperită automat de `listSuites()`.
- **Execuție concurentă** — înlocuiți bucla secvențială `for` din
  `runEvalSuiteAgainstTarget()` cu un `Promise.all` limitat (în prezent nu
  există control al concurenței).
- **Cazuri de streaming/apelare a instrumentelor** — în prezent, runnerul impune `stream: false`.
  Evaluarea cu streaming sau conștientă de instrumente ar necesita modificări în `runtime.ts`
  (capturarea și agregarea fragmentelor SSE înainte de calcularea scorului).

## Consultați și

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — prezentare generală a produsului
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — referință pentru fluxul de procesare a cererilor
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — motorul de punctare Auto Combo (în execuție)
- Sursă: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- Interfață: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
