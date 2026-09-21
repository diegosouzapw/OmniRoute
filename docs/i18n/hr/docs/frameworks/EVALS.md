# Evaluations (Evals) (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Izvor istine:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Posljednje ažuriranje:** 2026-06-28 — v3.8.40

OmniRoute isporučuje generički okvir za evaluaciju koji možete koristiti za usporedno mjerenje konfiguracija usmjeravanja, pojedinačnih pružatelja/modela ili uključenih paketa „golden set”.
Upotrijebite ga za provjeru promjena u usmjeravanju, validaciju novih pružatelja i kontrolu izdanja prije njihova puštanja u produkcijski promet.

Okvir je implementiran kao:

- Neovisni izvršitelj (`src/lib/evals/evalRunner.ts`) koji registrira ugrađene pakete u memoriji, evaluira rezultate prema očekivanim kriterijima i objedinjuje kartice s rezultatima.
- Sloj za trajnu pohranu (`src/lib/db/evals.ts`) prilagođenih (korisnički definiranih) paketa i povijesnih izvođenja u SQLiteu.
- Orkestracijski sloj (`src/lib/evals/runtime.ts`) koji izvršava svaki slučaj slanjem stvarnih poziva na `POST /v1/chat/completions`, bilježi latenciju i rezultate te trajno pohranjuje izvođenje.
- REST krajnje točke pod `/api/evals/*` (samo uz autentikaciju za upravljanje).
- Sučelje nadzorne ploče na `Dashboard → Usage → Evals` (`EvalsTab.tsx`).

## Koncepti

### Paket

Paket je imenovana zbirka testnih slučajeva s `description` i jednim ili više slučajeva. Paketi dolaze iz dvaju izvora:

| Izvor      | Gdje je definiran                                         | Promjenjiv tijekom izvođenja? |
| ---------- | --------------------------------------------------------- | ----------------------------- |
| `built-in` | Registriran putem `registerSuite()` pri pokretanju        | Ne (definiran u kodu)         |
| `custom`   | Pohranjen u SQLite tablicama `eval_suites` + `eval_cases` | Da (putem API-ja/sučelja)     |

Trenutačni ugrađeni paketi (pogledajte `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 osnovnih slučajeva za pozdrave/matematiku/prevođenje/sigurnost
- `coding-proficiency` — Python/JS/SQL/TS/otkrivanje pogrešaka
- `reasoning-logic` — silogizmi, tekstualni zadaci, prepoznavanje uzoraka
- `multilingual` — prevođenje i prepoznavanje jezika
- `safety-guardrails` — PII, jailbreak, odbijanje, osviještenost o pristranosti
- `instruction-following` — samo JSON, numerirani popisi, jezična ograničenja
- `codex-comparison` — izravni usporedni zadaci programiranja namijenjeni načinu usporedbe

### Slučaj

Svaki slučaj sadrži:

| Polje      | Opis                                                                      |
| ---------- | ------------------------------------------------------------------------- |
| `id`       | Stabilni identifikator (upotrebljava se kao ključ za rezultate i metrike) |
| `name`     | Oznaka čitljiva korisniku                                                 |
| `model`    | Zadani model kada izvođenje upotrebljava ciljanje `suite-default`         |
| `input`    | `{ messages, max_tokens? }` — šalje se na `/v1/chat/completions`          |
| `expected` | `{ strategy, value }` — kriterij bodovanja (pogledajte u nastavku)        |
| `tags`     | Neobavezne oznake (npr. `safety`, `pii`, `jailbreak`)                     |

### Cilj

Isti se paket može pokrenuti za različite ciljeve. Shema cilja je
`evalTargetSchema` u `src/shared/validation/schemas.ts`:

| Vrsta cilja     | `id`              | Ponašanje                                                                           |
| --------------- | ----------------- | ----------------------------------------------------------------------------------- |
| `suite-default` | `null`            | Svaki slučaj upotrebljava vlastito ugrađeno polje `model`                           |
| `model`         | naziv modela      | Svaki slučaj prisilno se usmjerava kroz jedan izravni model (npr. `gpt-4o`)         |
| `combo`         | naziv kombinacije | Svaki slučaj pokreće se kroz jednu kombinaciju (aktivira mehanizam za usmjeravanje) |

Za `model` i `combo` polje `id` obavezno je (što provodi Zodov
`superRefine`). Kada je naveden `compareTarget`, oba se cilja moraju razlikovati —
izvršitelj trajno pohranjuje oba izvođenja pod istim `runGroupId` radi A/B usporedbe.

## Kriteriji bodovanja

Implementirano u `evaluateCase()` (evalRunner.ts):

| Strategija | Prolazi kada…                                                                           |
| ---------- | --------------------------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                                       |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`                     |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` daje istinitu vrijednost                |
| `custom`   | `expected.fn(actualOutput, evalCase)` vraća istinitu vrijednost (samo ugrađeni skupovi) |

**Napomena:** Bodovanje prilagođenom funkcijom rezervirano je za skupove
definirane u kodu (ugrađene) jer se funkcije ne mogu serijalizirati putem API-ja.
`evalCaseBuilderSchema` prihvaća samo `contains | exact | regex` za skupove koje
izrađuju korisnici.

Trenutačno ne postoji LLM ocjenjivač ni ocjenjivač sličnosti temeljen na ugradnjama
— `evaluateCase()` bio bi prikladna točka za takvo proširenje.

## Shema baze podataka

Tri tablice (migracije `030_create_eval_runs.sql` i
`031_create_eval_suites.sql`):

| Tablica       | Svrha                                                                                                                             |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Metapodaci prilagođenih skupova (`id`, `name`, `description`)                                                                     |
| `eval_cases`  | Slučajevi po skupu — `input_json`, `expected_*`, `tags_json`                                                                      |
| `eval_runs`   | Povijesna pokretanja — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Ugrađeni skupovi **nisu** pohranjeni u bazi podataka. Nalaze se u memoriji i
ponovno se registriraju svaki put kada se uveze `evalRunner.ts`.

## REST API

Sve krajnje točke zahtijevaju autentifikaciju za upravljanje
(`requireManagementAuth`) — nisu dio javne proxy površine.

| Krajnja točka                 | Metoda   | Opis                                                                            |
| ----------------------------- | -------- | ------------------------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | Prikazuje skupove + nedavna pokretanja + tablicu rezultata + ciljeve + ključeve |
| `/api/evals`                  | `POST`   | Pokreće skup (pojedinačno ili usporedno) — shema `evalRunSuiteSchema`           |
| `/api/evals/{suiteId}`        | `GET`    | Dohvaća jedan skup (ugrađeni ili prilagođeni)                                   |
| `/api/evals/suites`           | `POST`   | Stvara prilagođeni skup — shema `evalSuiteSaveSchema`                           |
| `/api/evals/suites/{suiteId}` | `GET`    | Dohvaća prilagođeni skup                                                        |
| `/api/evals/suites/{suiteId}` | `PUT`    | Zamjenjuje prilagođeni skup (slučajevi se ponovno umeću)                        |
| `/api/evals/suites/{suiteId}` | `DELETE` | Briše prilagođeni skup i njegove slučajeve                                      |

### Pokretanje skupa

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

Neobavezna polja:

- `outputs` — `Record<caseId, string>` unaprijed izračunatih izlaza. Kada je
  navedeno, izvršitelj **preskače slanje** i samo boduje predmemorirane izlaze
  (korisno za izvanmrežno vrednovanje).
- `compareTarget` — drugi cilj koji se pokreće paralelno; oba pokretanja dijele
  generirani `runGroupId` radi izravne usporedbe.
- `apiKeyId` — interni API ključ koji se upotrebljava za autentifikaciju poslanih
  poziva prema `/v1/chat/completions`. Obavezno kada je omogućen `REQUIRE_API_KEY`.

### Stvaranje prilagođenog skupa

```bash
curl -X POST http://localhost:20128/api/evals/suites \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Brza provjera produkcije",
    "description": "Brza provjera ispravnosti prije implementacije",
    "cases": [
      {
        "name": "Struktura JSON-a",
        "model": "gpt-4o",
        "input": { "messages": [{ "role": "user", "content": "Odgovori s {\"ok\": true}" }] },
        "expected": { "strategy": "regex", "value": "\"ok\"\\s*:\\s*true" }
      }
    ]
  }'
```

## Cjevovod izvršavanja

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Razrješava paket testova (ugrađeni ili prilagođeni).
2. Za svaki slučaj izrađuje `Request` prema `/v1/chat/completions` s poljem
   `messages` iz slučaja, razriješenim poljem `model`, `stream: false` i `max_tokens: 512`
   (ili vrijednošću definiranom u slučaju).
3. Izravno poziva rukovatelj razgovorom (unutar procesa — bez dodatnog HTTP prijenosa).
4. Bilježi latenciju i izdvaja tekst iz `choices[0].message.content`
   ili korisnog sadržaja `output[]` Responses API-ja.
5. Boduje sve izlaze putem `runSuite()`, a zatim ih sprema putem `saveEvalRun()`.

Slučajevi se izvršavaju **sekvencijalno**. Trenutačno ne postoji zastavica za istodobno izvršavanje.

## Nadzorna ploča

Korisničko sučelje nalazi se na `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). Ondje možete:

- Pregledavati ugrađene i prilagođene pakete s pretpregledom svakog pojedinačnog slučaja.
- Stvarati/uređivati/brisati prilagođene pakete pomoću alata za izradu slučajeva.
- Odabrati cilj (zadane postavke paketa / model / kombinaciju), opcionalno drugi
  `compareTarget`, opcionalno API ključ, a zatim pokrenuti evaluaciju na zahtjev.
- Pregledavati povijest izvršavanja, prolaz/neuspjeh po slučaju, latenciju i zabilježene izlaze.
- Vidjeti tekuću tablicu rezultata objedinjenu na temelju najnovijeg izvršavanja za svaki
  opseg `(suite, target)`.

## Odnos prema RFC-u za automatsku procjenu

Zaseban, uže usmjeren podsustav za procjenu nalazi se u `src/domain/assessment/`
(pogledajte i [AUTO-COMBO.md](../routing/AUTO-COMBO.md) za aktivni mehanizam bodovanja).
Taj podsustav namijenjen je mehanizmu Auto Combo — automatski boduje pružatelje i
modele kako bi se kombinacije mogle samostalno oporaviti kada uzvodni sustavi zakažu. Koristi vlastiti pokretač,
vlastiti kategorizator i vlastitu logiku bodovanja.

Ovdje dokumentiran okvir Evals predstavlja **širu, općenamjensku
površinu za testiranje**. Koristite ga za proizvoljne pakete regresijskih testova, A/B usporedbe
i brze testove za svako izdanje. Podsustav za automatsku procjenu koristite kada želite da
stanje pružatelja u stvarnom vremenu utječe na odluke o usmjeravanju.

## Integracija s CI-jem

Trenutačno ne postoji namjenska npm skripta `eval:ci`. Ako želite
uvjetovati izdanja rezultatima evaluacije, postoje dva pristupa:

- **HTTP pristup**: pokrenite poslužitelj, pošaljite zahtjev na `POST /api/evals` s poznatim
  `suiteId` + `target` i provjerite da je `runs[].summary.passRate >= N` u
  odgovoru.
- **Pristup unutar procesa**: iz skripte uvezite `runEvalSuiteAgainstTarget()` iz
  `@/lib/evals/runtime`, pokrenite ga nad testnom bazom podataka i provjerite vraćeni
  `PersistedEvalRun.summary`.

Testovi koji pokrivaju rutu i povijest nalaze se u
`tests/unit/evals-route.test.ts` i `tests/unit/evals-history.test.ts`.

## Točke proširenja

Uobičajene promjene i mjesta na kojima ih treba napraviti:

- **Nova strategija bodovanja** — proširite blok `switch (evalCase.expected.strategy)`
  u `evaluateCase()` (`evalRunner.ts`) i proširite `EvalCaseStrategy` u
  `src/lib/db/evals.ts` te `evalCaseBuilderSchema` u `schemas.ts`.
- **Novi ugrađeni paket** — definirajte objekt paketa i pozovite `registerSuite()` na
  dnu datoteke `evalRunner.ts`. Automatski će ga otkriti `listSuites()`.
- **Istodobno izvršavanje** — promijenite sekvencijalnu petlju `for` u
  `runEvalSuiteAgainstTarget()` u ograničeni `Promise.all` (trenutačno ne postoji
  upravljanje istodobnim izvršavanjem).
- **Slučajevi strujanja/poziva alata** — pokretač trenutačno prisilno postavlja `stream: false`.
  Evaluacija koja podržava strujanje ili alate zahtijevala bi promjene u `runtime.ts`
  (zabilježite i objedinite SSE dijelove prije bodovanja).

## Vidi također

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — opći vodič kroz proizvod
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — referenca za tok obrade zahtjeva
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — mehanizam bodovanja Auto Combo (u aktivnom izvođenju)
- Izvorni kod: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- Korisničko sučelje: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
