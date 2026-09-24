# Evaluations (Evals) (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Patiesais avots:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Pēdējo reizi atjaunināts:** 2026-06-28 — v3.8.40

OmniRoute ietver vispārīgu novērtēšanas ietvaru, ko varat izmantot, lai salīdzinoši pārbaudītu maršrutēšanas konfigurācijas, atsevišķus pakalpojumu sniedzējus/modeļus vai komplektācijā iekļautos „zelta kopas” komplektus.
Izmantojiet to, lai pārbaudītu maršrutēšanas izmaiņas, validētu jaunus pakalpojumu sniedzējus un kontrolētu laidienus pirms to novirzīšanas uz produkcijas datplūsmu.

Ietvaru veido:

- Tīrs izpildītājs (`src/lib/evals/evalRunner.ts`), kas reģistrē atmiņā iebūvētos
  komplektus, novērtē izvades atbilstoši sagaidāmajiem kritērijiem un apkopo
  rezultātu kartes.
- Persistences slānis (`src/lib/db/evals.ts`) pielāgotiem (lietotāju definētiem) komplektiem
  un vēsturiskajiem izpildes datiem SQLite datubāzē.
- Orķestrācijas slānis (`src/lib/evals/runtime.ts`), kas izpilda katru gadījumu,
  nosūtot reālus izsaukumus uz `POST /v1/chat/completions`, reģistrē latentumu
  un izvades un saglabā izpildes rezultātus.
- REST galapunkti zem `/api/evals/*` (tikai ar pārvaldības autentifikāciju).
- Informācijas paneļa sadaļa `Dashboard → Usage → Evals` (`EvalsTab.tsx`).

## Jēdzieni

### Komplekts

Komplekts ir nosaukta testa gadījumu kolekcija ar `description` un vienu vai
vairākiem gadījumiem. Komplekti nāk no diviem avotiem:

| Avots      | Kur definēts                                     | Maināms izpildlaikā?   |
| ---------- | ------------------------------------------------ | ---------------------- |
| `built-in` | Reģistrēts sāknēšanas laikā ar `registerSuite()` | Nē (definēts kodā)     |
| `custom`   | Glabāts SQLite `eval_suites` + `eval_cases`      | Jā (izmantojot API/UI) |

Pašreizējie iebūvētie komplekti (skatiet `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 pamata gadījumi sasveicināšanās/matemātikas/tulkošanas/drošības jomās
- `coding-proficiency` — Python/JS/SQL/TS/kļūdu noteikšana
- `reasoning-logic` — siloģismi, teksta uzdevumi, likumsakarību atpazīšana
- `multilingual` — tulkošana un valodas noteikšana
- `safety-guardrails` — personu identificējoša informācija, aizsardzības apiešana, atteikšanās, aizspriedumu apzināšanās
- `instruction-following` — tikai JSON, numurēti saraksti, valodas ierobežojumi
- `codex-comparison` — tiešas savstarpējas programmēšanas uzdevumu pārbaudes, kas paredzētas salīdzināšanas režīmam

### Gadījums

Katrs gadījums ietver:

| Lauks      | Apraksts                                                              |
| ---------- | --------------------------------------------------------------------- |
| `id`       | Stabils identifikators (izmantots izvažu un metrikas atslēgām)        |
| `name`     | Cilvēkam saprotams apzīmējums                                         |
| `model`    | Noklusējuma modelis, ja izpildē tiek izmantots `suite-default` mērķis |
| `input`    | `{ messages, max_tokens? }` — nosūtīts uz `/v1/chat/completions`      |
| `expected` | `{ strategy, value }` — vērtēšanas kritēriji (skatiet tālāk)          |
| `tags`     | Neobligāti apzīmējumi (piem., `safety`, `pii`, `jailbreak`)           |

### Mērķis

Vienu un to pašu komplektu var izpildīt pret dažādiem mērķiem. Mērķa shēma ir
`evalTargetSchema` failā `src/shared/validation/schemas.ts`:

| Mērķa tips      | `id`                   | Darbība                                                                             |
| --------------- | ---------------------- | ----------------------------------------------------------------------------------- |
| `suite-default` | `null`                 | Katrs gadījums izmanto savu iebūvēto `model` lauku                                  |
| `model`         | modeļa nosaukums       | Katru gadījumu piespiedu kārtā novirza caur vienu tiešu modeli (piem., `gpt-4o`)    |
| `combo`         | kombinācijas nosaukums | Katru gadījumu izpilda, izmantojot vienu kombināciju (pārbauda maršrutēšanas dzini) |

Tipiem `model` un `combo` lauks `id` ir obligāts (to nodrošina Zod
`superRefine`). Ja ir norādīts `compareTarget`, abiem mērķiem ir jāatšķiras —
izpildītājs saglabā abu izpilžu rezultātus ar vienu un to pašu `runGroupId`, lai veiktu A/B salīdzināšanu.

## Vērtēšanas kritēriji

Implementēti funkcijā `evaluateCase()` (evalRunner.ts):

| Stratēģija | Nosacījums sekmīgam rezultātam…                                                    |
| ---------- | ---------------------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                                  |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`                |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` ir patiess                         |
| `custom`   | `expected.fn(actualOutput, evalCase)` atgriež patiesu vērtību (tikai iebūvētajiem) |

**Piezīme:** Vērtēšana ar pielāgotu funkciju ir paredzēta tikai kodā definētām
(iebūvētām) kopām, jo funkcijas nevar serializēt, izmantojot API.
`evalCaseBuilderSchema` lietotāju izveidotajām kopām pieņem tikai
`contains | exact | regex`.

Pašlaik nav nedz LLM kā vērtētāja, nedz uz iegulumiem balstīta līdzības
vērtētāja — to varētu ērti pievienot kā paplašinājumu funkcijā `evaluateCase()`.

## Datubāzes shēma

Trīs tabulas (migrācijas `030_create_eval_runs.sql` un
`031_create_eval_suites.sql`):

| Tabula        | Nolūks                                                                                                                            |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Pielāgoto kopu metadati (`id`, `name`, `description`)                                                                             |
| `eval_cases`  | Katras kopas gadījumi — `input_json`, `expected_*`, `tags_json`                                                                   |
| `eval_runs`   | Vēsturiskās izpildes — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Iebūvētās kopas **netiek** glabātas DB. Tās atrodas atmiņā un tiek
reģistrētas no jauna ikreiz, kad tiek importēts `evalRunner.ts`.

## REST API

Visiem galapunktiem nepieciešama pārvaldības autentifikācija
(`requireManagementAuth`) — tie nav daļa no publiskās starpniekservera
saskarnes.

| Galapunkts                    | Metode   | Apraksts                                                                  |
| ----------------------------- | -------- | ------------------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | Uzskaitīt kopas, nesenās izpildes, rezultātu pārskatu, mērķus un atslēgas |
| `/api/evals`                  | `POST`   | Izpildīt kopu (atsevišķi vai salīdzinājumā) — shēma `evalRunSuiteSchema`  |
| `/api/evals/{suiteId}`        | `GET`    | Iegūt vienu kopu (iebūvētu vai pielāgotu)                                 |
| `/api/evals/suites`           | `POST`   | Izveidot pielāgotu kopu — shēma `evalSuiteSaveSchema`                     |
| `/api/evals/suites/{suiteId}` | `GET`    | Iegūt pielāgotu kopu                                                      |
| `/api/evals/suites/{suiteId}` | `PUT`    | Aizstāt pielāgotu kopu (gadījumi tiek ievietoti no jauna)                 |
| `/api/evals/suites/{suiteId}` | `DELETE` | Dzēst pielāgotu kopu un tās gadījumus                                     |

### Kopas izpilde

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

Neobligātie lauki:

- `outputs` — iepriekš aprēķināto izvadu `Record<caseId, string>`. Ja tas ir
  norādīts, izpildītājs **izlaiž nosūtīšanu** un tikai novērtē kešatmiņā
  saglabātos izvadus (noderīgi bezsaistes novērtēšanai).
- `compareTarget` — otrs mērķis paralēlai izpildei; abām izpildēm ir kopīgs
  ģenerēts `runGroupId`, lai rezultātus varētu salīdzināt.
- `apiKeyId` — iekšējā API atslēga, ko izmanto nosūtīto
  `/v1/chat/completions` izsaukumu autentificēšanai. Obligāta, ja ir iespējots
  `REQUIRE_API_KEY`.

### Pielāgotas kopas izveide

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

## Izpildes konveijers

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Atrod komplektu (iebūvētu vai pielāgotu).
2. Katram gadījumam izveido `Request` uz `/v1/chat/completions` ar gadījuma
   `messages`, atrasto `model`, `stream: false` un `max_tokens: 512`
   (vai gadījumā norādīto pārrakstīto vērtību).
3. Izsauc tērzēšanas apstrādātāju tieši (procesa ietvaros — bez papildu HTTP pieprasījuma).
4. Reģistrē latentumu un izgūst tekstu vai nu no `choices[0].message.content`,
   vai no Responses API `output[]` derīgās slodzes.
5. Novērtē visus rezultātus, izmantojot `runSuite()`, un pēc tam saglabā tos ar `saveEvalRun()`.

Gadījumi tiek izpildīti **secīgi**. Pašlaik nav paralēlas izpildes karoga.

## Informācijas panelis

Lietotāja saskarne atrodas sadaļā `Informācijas panelis → Lietojums → Novērtējumi`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). Tajā varat:

- Pārlūkot iebūvētos un pielāgotos komplektus, priekšskatot katru gadījumu.
- Izveidot, rediģēt un dzēst pielāgotus komplektus, izmantojot gadījumu veidotāju.
- Izvēlēties mērķi (komplekta noklusējumi / modelis / kombinācija), pēc izvēles otru
  `compareTarget` un API atslēgu, un pēc tam palaist izpildi pēc pieprasījuma.
- Pārskatīt izpilžu vēsturi, katra gadījuma sekmīgo/nesekmīgo rezultātu, latentumu un reģistrētās izvades.
- Skatīt mainīgo rezultātu kopsavilkumu, kas apkopots no jaunākās izpildes katrā
  `(suite, target)` tvērumā.

## Saistība ar automātiskās novērtēšanas RFC

Atsevišķa, šaurāka novērtēšanas apakšsistēma atrodas `src/domain/assessment/`
(skatiet arī [AUTO-COMBO.md](../routing/AUTO-COMBO.md), lai uzzinātu par aktīvo vērtēšanas dzini).
Šī apakšsistēma ir paredzēta Auto Combo dzinim — tā automātiski novērtē pakalpojumu sniedzējus un
modeļus, lai kombinācijas varētu pašatjaunoties, kad augšupējie pakalpojumi nedarbojas. Tā izmanto savu izpildītāju,
savu kategorizētāju un savu vērtēšanas loģiku.

Šeit dokumentētais Evals ietvars ir **plašāka, vispārīga
testēšanas vide**. Izmantojiet to patvaļīgiem regresijas komplektiem, A/B salīdzinājumiem
un katra laidiena ātrajiem pārbaudes testiem. Izmantojiet automātiskās novērtēšanas apakšsistēmu, ja nepieciešams,
lai pakalpojumu sniedzēju stāvoklis reāllaikā ietekmētu maršrutēšanas lēmumus.

## CI integrācija

Pašlaik nav atsevišķa `eval:ci` npm skripta. Ja vēlaties
noteikt laidienu izveides nosacījumus pēc novērtējumu rezultātiem, ir pieejamas divas pieejas:

- **HTTP pieeja**: palaidiet serveri, nosūtiet `POST /api/evals` ar zināmu
  `suiteId` + `target` un pārbaudiet, vai atbildē `runs[].summary.passRate >= N`.
- **Procesa iekšējā pieeja**: importējiet `runEvalSuiteAgainstTarget()` no
  `@/lib/evals/runtime` skriptā, izpildiet to ar testa DB un pārbaudiet
  atgriezto `PersistedEvalRun.summary`.

Maršruta un vēstures testi atrodas
`tests/unit/evals-route.test.ts` un `tests/unit/evals-history.test.ts`.

## Paplašināšanas punkti

Biežākās izmaiņas un vietas, kur tās veikt:

- **Jauna vērtēšanas stratēģija** — paplašiniet `switch (evalCase.expected.strategy)`
  bloku funkcijā `evaluateCase()` (`evalRunner.ts`) un paplašiniet `EvalCaseStrategy` failā
  `src/lib/db/evals.ts`, kā arī `evalCaseBuilderSchema` failā `schemas.ts`.
- **Jauns iebūvēts komplekts** — definējiet komplekta objektu un izsauciet `registerSuite()`
  faila `evalRunner.ts` beigās. Funkcija `listSuites()` to atradīs automātiski.
- **Paralēla izpilde** — aizstājiet secīgo `for` ciklu funkcijā
  `runEvalSuiteAgainstTarget()` ar ierobežotu `Promise.all` (pašlaik paralēlas izpildes
  kontrole nepastāv).
- **Straumēšanas/rīku izsaukumu gadījumi** — pašlaik izpildītājs piespiedu kārtā iestata `stream: false`.
  Straumēšanai vai rīkus atbalstošai novērtēšanai būtu nepieciešamas izmaiņas failā `runtime.ts`
  (pirms vērtēšanas uztvert un apkopot SSE fragmentus).

## Skatiet arī

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — vispārīgs produkta lietošanas ceļvedis
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — pieprasījumu apstrādes konveijera atsauce
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — Auto Combo vērtēšanas dzinis (aktīvā izpildlaika vidē)
- Avota kods: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- Lietotāja saskarne: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
