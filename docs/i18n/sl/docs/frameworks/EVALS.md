# Evaluations (Evals) (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Vir resnice:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Nazadnje posodobljeno:** 2026-06-28 — v3.8.40

OmniRoute vključuje splošno ogrodje za vrednotenje, ki ga lahko uporabite za primerjalno preizkušanje konfiguracij usmerjanja, posameznih ponudnikov/modelov ali priloženih zbirk »golden set«.
Uporabite ga za preverjanje sprememb usmerjanja, potrjevanje novih ponudnikov in nadzor izdaj, preden jih uvedete v produkcijski promet.

Ogrodje sestavljajo:

- Čisti izvajalnik (`src/lib/evals/evalRunner.ts`), ki registrira vgrajene zbirke v pomnilniku, vrednoti rezultate glede na pričakovana merila in združuje ocenjevalne kartice.
- Plast za trajno shranjevanje (`src/lib/db/evals.ts`) za zbirke po meri (ki jih opredeli uporabnik) in zgodovinske izvedbe v SQLite.
- Orkestracijska plast (`src/lib/evals/runtime.ts`), ki izvede vsak primer tako, da pošlje dejanske klice na `POST /v1/chat/completions`, zajame zakasnitev in rezultate ter trajno shrani izvedbo.
- Končne točke REST pod `/api/evals/*` (samo z avtentikacijo za upravljanje).
- Nadzorna plošča na `Dashboard → Usage → Evals` (`EvalsTab.tsx`).

## Koncepti

### Zbirka

Zbirka je poimenovana skupina testnih primerov z `description` in enim ali več primeri. Zbirke izvirajo iz dveh virov:

| Vir        | Kje je opredeljena                              | Spremenljiva med izvajanjem?            |
| ---------- | ----------------------------------------------- | --------------------------------------- |
| `built-in` | Registrirana prek `registerSuite()` ob zagonu   | Ne (opredeljena v kodi)                 |
| `custom`   | Shranjena v SQLite `eval_suites` + `eval_cases` | Da (prek API-ja/uporabniškega vmesnika) |

Trenutne vgrajene zbirke (glejte `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 osnovnih primerov s področij pozdravov/matematike/prevajanja/varnosti
- `coding-proficiency` — Python/JS/SQL/TS/odkrivanje napak
- `reasoning-logic` — silogizmi, besedilne naloge, prepoznavanje vzorcev
- `multilingual` — prevajanje in zaznavanje jezika
- `safety-guardrails` — PII, jailbreak, zavrnitev, zavedanje pristranskosti
- `instruction-following` — samo JSON, oštevilčeni seznami, jezikovne omejitve
- `codex-comparison` — neposredne primerjalne programerske naloge, namenjene primerjalnemu načinu

### Primer

Vsak primer vsebuje:

| Polje      | Opis                                                                    |
| ---------- | ----------------------------------------------------------------------- |
| `id`       | Stabilni identifikator (uporablja se kot ključ za rezultate in metrike) |
| `name`     | Človeku razumljiva oznaka                                               |
| `model`    | Privzeti model, ko izvedba uporablja ciljanje `suite-default`           |
| `input`    | `{ messages, max_tokens? }` — poslano na `/v1/chat/completions`         |
| `expected` | `{ strategy, value }` — merila ocenjevanja (glejte spodaj)              |
| `tags`     | Izbirne oznake (npr. `safety`, `pii`, `jailbreak`)                      |

### Cilj

Isto zbirko je mogoče izvajati za različne cilje. Shema cilja je
`evalTargetSchema` v `src/shared/validation/schemas.ts`:

| Vrsta cilja     | `id`            | Vedenje                                                                            |
| --------------- | --------------- | ---------------------------------------------------------------------------------- |
| `suite-default` | `null`          | Vsak primer uporablja svoje vgrajeno polje `model`                                 |
| `model`         | ime modela      | Vsili izvajanje vsakega primera prek enega neposrednega modela (npr. `gpt-4o`)     |
| `combo`         | ime kombinacije | Izvede vsak primer prek ene kombinacije (s čimer preizkusi usmerjevalni mehanizem) |

Za `model` in `combo` je polje `id` obvezno (uveljavljeno prek Zod
`superRefine`). Ko je podan `compareTarget`, se morata cilja razlikovati —
izvajalnik trajno shrani obe izvedbi pod istim `runGroupId` za primerjavo A/B.

## Merila ocenjevanja

Implementirana v `evaluateCase()` (evalRunner.ts):

| Strategija | Uspešno, ko …                                                                       |
| ---------- | ----------------------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                                   |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`                 |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` vrne resnično vrednost              |
| `custom`   | `expected.fn(actualOutput, evalCase)` vrne resnično vrednost (samo vgrajene zbirke) |

**Opomba:** Ocenjevanje s funkcijo po meri je rezervirano za programsko definirane
(vgrajene) zbirke, ker funkcij ni mogoče serializirati prek API-ja.
`evalCaseBuilderSchema` za zbirke, ki jih ustvarijo uporabniki, sprejema samo
`contains | exact | regex`.

Trenutno ni ocenjevalnika LLM ali ocenjevalnika podobnosti na podlagi vložitev —
to bi bilo mogoče preprosto razširiti v `evaluateCase()`.

## Shema podatkovne zbirke

Tri tabele (migraciji `030_create_eval_runs.sql` in
`031_create_eval_suites.sql`):

| Tabela        | Namen                                                                                                                              |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Metapodatki zbirk po meri (`id`, `name`, `description`)                                                                            |
| `eval_cases`  | Primeri posamezne zbirke — `input_json`, `expected_*`, `tags_json`                                                                 |
| `eval_runs`   | Zgodovinska izvajanja — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Vgrajene zbirke **niso** shranjene v podatkovni zbirki. Nahajajo se v pomnilniku
in se znova registrirajo ob vsakem uvozu datoteke `evalRunner.ts`.

## REST API

Vse končne točke zahtevajo skrbniško avtentikacijo (`requireManagementAuth`) —
niso del javno dostopnega posredniškega vmesnika.

| Končna točka                  | Metoda   | Opis                                                                         |
| ----------------------------- | -------- | ---------------------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | Prikaže zbirke + nedavna izvajanja + preglednico rezultatov + cilje + ključe |
| `/api/evals`                  | `POST`   | Zažene zbirko (posamično ali primerjalno) — shema `evalRunSuiteSchema`       |
| `/api/evals/{suiteId}`        | `GET`    | Pridobi eno zbirko (vgrajeno ali po meri)                                    |
| `/api/evals/suites`           | `POST`   | Ustvari zbirko po meri — shema `evalSuiteSaveSchema`                         |
| `/api/evals/suites/{suiteId}` | `GET`    | Pridobi zbirko po meri                                                       |
| `/api/evals/suites/{suiteId}` | `PUT`    | Zamenja zbirko po meri (primeri se znova vstavijo)                           |
| `/api/evals/suites/{suiteId}` | `DELETE` | Izbriše zbirko po meri in njene primere                                      |

### Zagon zbirke

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

Izbirna polja:

- `outputs` — `Record<caseId, string>` vnaprej izračunanih izhodov. Ko je polje
  podano, izvajalnik **preskoči pošiljanje** in zgolj oceni predpomnjene izhode
  (uporabno za vrednotenje brez povezave).
- `compareTarget` — drugi cilj za vzporedno izvajanje; obe izvajanji si za
  vzporedni prikaz delita ustvarjeni `runGroupId`.
- `apiKeyId` — interni ključ API, uporabljen za avtentikacijo poslanih klicev
  `/v1/chat/completions`. Obvezen, ko je omogočen `REQUIRE_API_KEY`.

### Ustvarjanje zbirke po meri

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

## Izvedbeni cevovod

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Razreši zbirko (vgrajeno ali lastno).
2. Za vsak primer sestavi `Request` za `/v1/chat/completions` z vrednostmi
   `messages` iz primera, razrešenim `model`, `stream: false` in `max_tokens: 512`
   (ali vrednostjo, določeno v primeru).
3. Neposredno pokliče obravnavalnik klepeta (znotraj procesa — brez dodatnega koraka HTTP).
4. Zabeleži zakasnitev in izvleče besedilo bodisi iz `choices[0].message.content`
   bodisi iz koristne vsebine `output[]` API-ja Responses.
5. Točkuje vse izhode prek `runSuite()`, nato pa jih shrani prek `saveEvalRun()`.

Primeri se izvajajo **zaporedno**. Trenutno ni zastavice za sočasno izvajanje.

## Nadzorna plošča

Uporabniški vmesnik je na voljo na `Nadzorna plošča → Uporaba → Evalvacije`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). Tam lahko:

- Brskate po vgrajenih in lastnih zbirkah s predogledom posameznih primerov.
- Ustvarjate, urejate in brišete lastne zbirke z graditeljem primerov.
- Izberete cilj (privzete nastavitve zbirke / model / kombinacijo), po želji drugi
  `compareTarget` in ključ API ter nato ročno zaženete izvajanje.
- Pregledujete zgodovino izvajanj, uspeh ali neuspeh posameznega primera, zakasnitev in zajete izhode.
- Ogledate si tekoči pregled rezultatov, združen po najnovejšem izvajanju za vsak
  obseg `(suite, target)`.

## Povezava z RFC-jem za samodejno ocenjevanje

Ločen, ožje usmerjen podsistem za ocenjevanje je v `src/domain/assessment/`
(za mehanizem sprotnega točkovanja glejte tudi [AUTO-COMBO.md](../routing/AUTO-COMBO.md)).
Ta podsistem je namenjen mehanizmu Auto Combo — samodejnemu točkovanju ponudnikov in
modelov, da se lahko kombinacije same obnovijo ob odpovedi izvornih sistemov. Uporablja svoj izvajalnik,
svoj kategorizator in lastno logiko točkovanja.

Tukaj dokumentirano ogrodje Evals je **širša, splošnonamenska
površina za preizkušanje**. Uporabite ga za poljubne zbirke regresijskih preizkusov, primerjave A/B
in preizkuse osnovnega delovanja za posamezne izdaje. Podsistem za samodejno ocenjevanje uporabite, kadar mora
sprotno stanje ponudnikov vplivati na odločitve o usmerjanju.

## Integracija s CI

Trenutno ni namenskega skripta npm `eval:ci`. Če želite izdaje
pogojevati z rezultati evalvacij, sta na voljo dva pristopa:

- **Pot HTTP**: zaženite strežnik, pošljite zahtevo `POST /api/evals` z znanima
  `suiteId` in `target` ter preverite, da je `runs[].summary.passRate >= N` v
  odzivu.
- **Pot znotraj procesa**: iz skripta uvozite `runEvalSuiteAgainstTarget()` iz
  `@/lib/evals/runtime`, izvedite ga nad testno podatkovno zbirko in preverite
  vrnjeni `PersistedEvalRun.summary`.

Preizkusi, ki pokrivajo pot in zgodovino, so v
`tests/unit/evals-route.test.ts` in `tests/unit/evals-history.test.ts`.

## Razširitvene točke

Pogoste spremembe in mesta, kjer jih lahko izvedete:

- **Nova strategija točkovanja** — razširite blok `switch (evalCase.expected.strategy)`
  v `evaluateCase()` (`evalRunner.ts`) ter razširite `EvalCaseStrategy` v
  `src/lib/db/evals.ts` in `evalCaseBuilderSchema` v `schemas.ts`.
- **Nova vgrajena zbirka** — definirajte objekt zbirke in pokličite `registerSuite()` na
  koncu datoteke `evalRunner.ts`. Funkcija `listSuites()` jo bo samodejno odkrila.
- **Sočasno izvajanje** — zaporedno zanko `for` v
  `runEvalSuiteAgainstTarget()` zamenjajte z omejenim `Promise.all` (trenutno
  ni nadzora sočasnosti).
- **Primeri s pretakanjem/klici orodij** — izvajalnik trenutno vsili `stream: false`.
  Vrednotenje s pretakanjem ali podporo za orodja bi zahtevalo spremembe v `runtime.ts`
  (zajem in združevanje fragmentov SSE pred točkovanjem).

## Glejte tudi

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — splošni vodnik po izdelku
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — referenca za cevovod zahtev
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — mehanizem za točkovanje Auto Combo (aktivno izvajalno okolje)
- Izvorna koda: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- Uporabniški vmesnik: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
