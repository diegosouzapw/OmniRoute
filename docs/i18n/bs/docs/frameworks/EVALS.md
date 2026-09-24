# Evaluations (Evals) (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

# Evaluacije (Evals)

> **Izvor istine:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Posljednje ažurirano:** 2026-06-28 — v3.8.40

OmniRoute isporučuje generički okvir za evaluaciju koji možete koristiti za benchmark konfiguracija rutiranja, pojedinačnih provajdera/modela ili ugrađenih "golden set" suite-ova. Koristite ga za verifikaciju promjena rutiranja, validaciju novih provajdera i kontrolu izdanja prije nego što ih promovišete u produkcijski saobraćaj.

Okvir je implementiran kao:

- Čisti pokretač (`src/lib/evals/evalRunner.ts`) koji registruje ugrađene suite-ove u memoriji, evaluira izlaze prema očekivanim kriterijumima i agregira scorecards.
- Sloj za perzistenciju (`src/lib/db/evals.ts`) za prilagođene (korisnički definisane) suite-ove i istorijska pokretanja u SQLite-u.
- Sloj za orkestraciju (`src/lib/evals/runtime.ts`) koji izvršava svaki slučaj slanjem stvarnih poziva na `POST /v1/chat/completions`, bilježi latenciju i izlaze, te čuva pokretanje.
- REST krajnje tačke pod `/api/evals/*` (samo za management-auth).
- Površina kontrolne table na `Dashboard → Usage → Evals` (`EvalsTab.tsx`).

## Koncepti

### Suite

Suite je imenovana kolekcija testnih slučajeva sa `description` i jednim ili više slučajeva. Suite-ovi dolaze iz dva izvora:

| Izvor      | Gdje je definisano                                  | Promjenjivo u runtime-u? |
| ---------- | --------------------------------------------------- | ------------------------ |
| `built-in` | Registrovano putem `registerSuite()` pri pokretanju | Ne (definisano kodom)    |
| `custom`   | Pohranjeno u SQLite `eval_suites` + `eval_cases`    | Da (putem API/UI)        |

Trenutni ugrađeni suite-ovi (pogledajte `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 osnovnih slučajeva kroz pozdrav/matematiku/prevođenje/sigurnost
- `coding-proficiency` — Python/JS/SQL/TS/otkrivanje bugova
- `reasoning-logic` — silogizmi, tekstualni zadaci, prepoznavanje uzoraka
- `multilingual` — prevođenje i detekcija jezika
- `safety-guardrails` — PII, jailbreak, odbijanje, svijest o pristrasnosti
- `instruction-following` — samo JSON, numerisane liste, jezička ograničenja
- `codex-comparison` — direktni zadaci kodiranja namijenjeni za compare mod

### Case

Svaki slučaj (case) sadrži:

| Polje      | Opis                                                                |
| ---------- | ------------------------------------------------------------------- |
| `id`       | Stabilan identifikator (koristi se za ključiranje izlaza i metrika) |
| `name`     | Oznaka čitljiva ljudima                                             |
| `model`    | Zadani model kada pokretanje koristi `suite-default` ciljanje       |
| `input`    | `{ messages, max_tokens? }` — poslato na `/v1/chat/completions`     |
| `expected` | `{ strategy, value }` — rubrika za bodovanje (pogledajte ispod)     |
| `tags`     | Opcione oznake (npr. `safety`, `pii`, `jailbreak`)                  |

### Target

Isti suite se može pokrenuti protiv različitih ciljeva. Šema cilja je `evalTargetSchema` u `src/shared/validation/schemas.ts`:

| Tip cilja       | `id`       | Ponašanje                                                                 |
| --------------- | ---------- | ------------------------------------------------------------------------- |
| `suite-default` | `null`     | Svaki slučaj koristi svoje ugrađeno `model` polje                         |
| `model`         | model name | Forsiraj svaki slučaj kroz jedan direktan model (npr. `gpt-4o`)           |
| `combo`         | combo name | Pokreni svaki slučaj kroz jednu kombinaciju (testira engine za rutiranje) |

Za `model` i `combo`, `id` polje je obavezno (primorano od strane Zod `superRefine`). Kada je `compareTarget` obezbijeđen, oba cilja moraju biti različita — pokretač čuva oba pokretanja pod istim `runGroupId` za A/B poređenje.

## Kriterijumi bodovanja

Implementirano u `evaluateCase()` (evalRunner.ts):

| Strategija | Prolazi kada…                                                                   |
| ---------- | ------------------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                               |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`             |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` je istinito                     |
| `custom`   | `expected.fn(actualOutput, evalCase)` vraća istinitu vrijednost (samo ugrađeno) |

**Napomena:** Bodovanje pomoću prilagođenih funkcija je rezervisano za kodom definisane (ugrađene) pakete, jer se funkcije ne mogu serijalizovati putem API-ja. `evalCaseBuilderSchema` prihvata samo `contains | exact | regex` za pakete koje kreiraju korisnici.

Trenutno ne postoji LLM-as-judge ili bodovanje sličnosti zasnovano na embedding-u — to bi bila čista tačka proširenja u `evaluateCase()`.

## Šema baze podataka

Tri tabele (migracije `030_create_eval_runs.sql` i `031_create_eval_suites.sql`):

| Tabela        | Svrha                                                                                                                             |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Metapodaci prilagođenog paketa (`id`, `name`, `description`)                                                                      |
| `eval_cases`  | Slučajevi po paketu — `input_json`, `expected_*`, `tags_json`                                                                     |
| `eval_runs`   | Istorijska izvršenja — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Ugrađeni paketi se ne čuvaju u bazi podataka. Oni žive u memoriji i ponovo se registruju svaki put kada se uveze `evalRunner.ts`.

## REST API

Svi krajnje tačke (endpoints) zahtijevaju upravljačku autentifikaciju (`requireManagementAuth`) — one nisu dio javne proxy površine.

| Krajnja tačka (Endpoint)      | Metoda   | Opis                                                                     |
| ----------------------------- | -------- | ------------------------------------------------------------------------ |
| `/api/evals`                  | `GET`    | Lista paketa + nedavna izvršenja + tabela rezultata + ciljevi + ključevi |
| `/api/evals`                  | `POST`   | Pokreni paket (pojedinačno ili poređenje) — šema `evalRunSuiteSchema`    |
| `/api/evals/{suiteId}`        | `GET`    | Dohvati jedan paket (ugrađeni ili prilagođeni)                           |
| `/api/evals/suites`           | `POST`   | Kreiraj prilagođeni paket — šema `evalSuiteSaveSchema`                   |
| `/api/evals/suites/{suiteId}` | `GET`    | Dohvati prilagođeni paket                                                |
| `/api/evals/suites/{suiteId}` | `PUT`    | Zamijeni prilagođeni paket (slučajevi se ponovo ubacuju)                 |
| `/api/evals/suites/{suiteId}` | `DELETE` | Obriši prilagođeni paket i njegove slučajeve                             |

### Pokretanje paketa

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

Opciona polja:

- `outputs` — `Record<caseId, string>` prethodno izračunatih izlaza. Kada se obezbijedi, pokretač (runner) preskače slanje (dispatch) i boduje samo keširane izlaze (korisno za offline evaluaciju).
- `compareTarget` — drugi cilj za paralelno pokretanje; oba izvršenja dijele generisani `runGroupId` za direktno poređenje.
- `apiKeyId` — interni API ključ koji se koristi za autentifikaciju poslatih `/v1/chat/completions` poziva. Obavezno kada je `REQUIRE_API_KEY` omogućen.

### Kreiranje prilagođenog paketa

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

## Dispatch Pipeline

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Razrješava paket (ugrađeni ili prilagođeni).
2. Za svaki slučaj, gradi `Request` prema `/v1/chat/completions` sa `messages` slučaja, razriješenim `model`, `stream: false`, i `max_tokens: 512` (ili zamjenom slučaja).
3. Poziva rukovatelj chatom direktno (in-process — bez dodatnog HTTP skoka).
4. Hvata latenciju i ekstrahuje tekst iz `choices[0].message.content` ili `output[]` payload-a Responses-API-ja.
5. Boduje sve izlaze putem `runSuite()`, zatim ih trajno pohranjuje putem `saveEvalRun()`.

Slučajevi se izvršavaju **sekvencijalno**. Trenutno ne postoji flag za konkurentnost.

## Dashboard

UI se nalazi na `Dashboard → Usage → Evals` (`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). Odatle možete:

- Pregledati ugrađene i prilagođene pakete uz pregled slučaj po slučaj.
- Kreirati/uređivati/brisati prilagođene pakete pomoću graditelja slučajeva.
- Odabrati cilj (zadane vrijednosti paketa / model / kombinacija), opciono drugi `compareTarget`, opciono API ključ, a zatim pokrenuti na zahtjev.
- Pregledati historiju izvršavanja, prolaznost/pad po slučaju, latenciju i uhvaćene izlaze.
- Vidjeti tekuću tabelu rezultata agregiranu kroz posljednje izvršavanje po `(suite, target)` opsegu.

## Odnos sa Auto-Assessment RFC

Zaseban, uži podsistem za procjenu nalazi se na `src/domain/assessment/` (pogledajte i [AUTO-COMBO.md](../routing/AUTO-COMBO.md) za mehanizam bodovanja uživo). Taj podsistem cilja Auto Combo mehanizam — automatsko bodovanje provajdera i modela tako da se kombinacije mogu same popraviti kada uzvodni sistemi zakažu. Koristi sopstveni pokretač, sopstveni kategorizator i sopstvenu logiku bodovanja.

Evals framework dokumentovan ovdje je **šira, opšta površina za testiranje**. Preferirajte ga za proizvoljne regresijske pakete, A/B poređenja i smoke testove po izdanju. Koristite Auto-Assessment podsistem kada vam je potrebno zdravlje provajdera u realnom vremenu da utiče na odluke o rutiranju.

## CI integracija

Trenutno ne postoji namjenski `eval:ci` npm skript. Dva su puta ako želite ograničiti izdanja na osnovu rezultata evaluacije:

- **HTTP put**: pokrenite server, pošaljite `POST /api/evals` sa poznatim `suiteId` + `target`, i potvrdite `runs[].summary.passRate >= N` u odgovoru.
- **In-process put**: uvezite `runEvalSuiteAgainstTarget()` iz `@/lib/evals/runtime` iz skripte, pokrenite protiv testne baze podataka i provjerite vraćeni `PersistedEvalRun.summary`.

Testovi koji pokrivaju rutu i historiju nalaze se na `tests/unit/evals-route.test.ts` i `tests/unit/evals-history.test.ts`.

## Tačke proširenja

Uobičajene promjene i gdje ih napraviti:

- **Nova strategija bodovanja** — proširite `switch (evalCase.expected.strategy)` blok u `evaluateCase()` (`evalRunner.ts`) i proširite `EvalCaseStrategy` u `src/lib/db/evals.ts` plus `evalCaseBuilderSchema` u `schemas.ts`.
- **Novi ugrađeni paket** — definišite objekat paketa i pozovite `registerSuite()` na dnu `evalRunner.ts`. Biće automatski otkriven od strane `listSuites()`.
- **Izvršavanje sa konkurentnošću** — promijenite sekvencijalnu `for` petlju u `runEvalSuiteAgainstTarget()` u ograničeni `Promise.all` (danas ne postoji kontrola konkurentnosti).
- **Slučajevi sa stream/tool-call** — trenutno pokretač forsira `stream: false`. Evaluacija sa streamingom ili svjesna alata zahtijevala bi promjene u `runtime.ts` (hvatanje i agregiranje SSE komada prije bodovanja).

## Vidi također

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — sveobuhvatan pregled proizvoda
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — referenca za cjevovod zahtjeva
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — Auto Combo mehanizam za bodovanje (runtime uživo)
- Izvor: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- UI: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
