# Evaluations (Evals) (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Bron van waarheid:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Laatst bijgewerkt:** 2026-06-28 — v3.8.40

OmniRoute wordt geleverd met een generiek evaluatieframework waarmee je routeringsconfiguraties, afzonderlijke providers/modellen of de meegeleverde 'golden set'-suites kunt benchmarken. Gebruik het om routeringswijzigingen te verifiëren, nieuwe providers te valideren en releases te blokkeren of goed te keuren voordat je ze naar productieverkeer promoveert.

Het framework is als volgt geïmplementeerd:

- Een zelfstandige runner (`src/lib/evals/evalRunner.ts`) die ingebouwde suites in het geheugen registreert, uitvoer aan de hand van verwachte criteria evalueert en scorekaarten samenvoegt.
- Een persistentielaag (`src/lib/db/evals.ts`) voor aangepaste (door gebruikers gedefinieerde) suites en historische uitvoeringen in SQLite.
- Een orkestratielaag (`src/lib/evals/runtime.ts`) die elke case uitvoert door echte aanroepen naar `POST /v1/chat/completions` te sturen, latentie en uitvoer vastlegt en de uitvoering opslaat.
- REST-endpoints onder `/api/evals/*` (alleen met beheerdersauthenticatie).
- Een dashboardweergave onder `Dashboard → Usage → Evals` (`EvalsTab.tsx`).

## Concepten

### Suite

Een suite is een benoemde verzameling testcases met een `description` en één of meer cases. Suites zijn afkomstig uit twee bronnen:

| Bron       | Waar gedefinieerd                                     | Tijdens runtime wijzigbaar? |
| ---------- | ----------------------------------------------------- | --------------------------- |
| `built-in` | Bij het opstarten geregistreerd via `registerSuite()` | Nee (gedefinieerd in code)  |
| `custom`   | Opgeslagen in SQLite `eval_suites` + `eval_cases`     | Ja (via API/UI)             |

De huidige ingebouwde suites (zie `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 basiscases voor begroeting/wiskunde/vertaling/veiligheid
- `coding-proficiency` — Python/JS/SQL/TS/bugdetectie
- `reasoning-logic` — syllogismen, redactiesommen, patroonherkenning
- `multilingual` — vertaling en taaldetectie
- `safety-guardrails` — PII, jailbreak, weigering, bewustzijn van vooroordelen
- `instruction-following` — uitsluitend JSON, genummerde lijsten, taalbeperkingen
- `codex-comparison` — rechtstreekse programmeertaken bedoeld voor de vergelijkingsmodus

### Case

Elke case bevat:

| Veld       | Beschrijving                                                                    |
| ---------- | ------------------------------------------------------------------------------- |
| `id`       | Stabiele identificatiecode (gebruikt als sleutel voor uitvoer en meetwaarden)   |
| `name`     | Voor mensen leesbaar label                                                      |
| `model`    | Standaardmodel wanneer de uitvoering de doelinstelling `suite-default` gebruikt |
| `input`    | `{ messages, max_tokens? }` — verzonden naar `/v1/chat/completions`             |
| `expected` | `{ strategy, value }` — beoordelingsrubriek (zie hieronder)                     |
| `tags`     | Optionele labels (bijv. `safety`, `pii`, `jailbreak`)                           |

### Doel

Dezelfde suite kan met verschillende doelen worden uitgevoerd. Het doelschema is `evalTargetSchema` in `src/shared/validation/schemas.ts`:

| Doeltype        | `id`      | Gedrag                                                                      |
| --------------- | --------- | --------------------------------------------------------------------------- |
| `suite-default` | `null`    | Elke case gebruikt het ingebouwde veld `model`                              |
| `model`         | modelnaam | Forceer elke case via één rechtstreeks model (bijv. `gpt-4o`)               |
| `combo`         | combonaam | Voer elke case uit via één combo (waarbij de routeringsengine wordt getest) |

Voor `model` en `combo` is het veld `id` verplicht (afgedwongen door Zod `superRefine`). Wanneer `compareTarget` is opgegeven, moeten beide doelen van elkaar verschillen — de runner slaat beide uitvoeringen onder dezelfde `runGroupId` op voor een A/B-vergelijking.

## Beoordelingscriteria

Geïmplementeerd in `evaluateCase()` (evalRunner.ts):

| Strategie  | Geslaagd wanneer…                                                                     |
| ---------- | ------------------------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                                     |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`                   |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` waarheidsgetrouw is                   |
| `custom`   | `expected.fn(actualOutput, evalCase)` waarheidsgetrouw retourneert (alleen ingebouwd) |

**Opmerking:** Beoordeling via aangepaste functies is voorbehouden aan
codegedefinieerde (ingebouwde) suites, omdat functies niet via de API kunnen
worden geserialiseerd. Het `evalCaseBuilderSchema` accepteert alleen
`contains | exact | regex` voor door gebruikers gemaakte suites.

Er is momenteel geen LLM-als-beoordelaar of op embeddings gebaseerde
gelijkenisscore — dit zou een logisch uitbreidingspunt in `evaluateCase()` zijn.

## Databaseschema

Drie tabellen (migraties `030_create_eval_runs.sql` en
`031_create_eval_suites.sql`):

| Tabel         | Doel                                                                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Metagegevens van aangepaste suites (`id`, `name`, `description`)                                                                      |
| `eval_cases`  | Cases per suite — `input_json`, `expected_*`, `tags_json`                                                                             |
| `eval_runs`   | Historische uitvoeringen — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Ingebouwde suites worden **niet** in de database opgeslagen. Ze bevinden zich
in het geheugen en worden telkens opnieuw geregistreerd wanneer `evalRunner.ts`
wordt geïmporteerd.

## REST-API

Alle endpoints vereisen beheerautorisatie (`requireManagementAuth`) — ze maken
geen deel uit van het openbare proxy-oppervlak.

| Endpoint                      | Methode  | Beschrijving                                                             |
| ----------------------------- | -------- | ------------------------------------------------------------------------ |
| `/api/evals`                  | `GET`    | Suites + recente uitvoeringen + scorekaart + doelen + sleutels weergeven |
| `/api/evals`                  | `POST`   | Een suite uitvoeren (enkel of vergelijken) — schema `evalRunSuiteSchema` |
| `/api/evals/{suiteId}`        | `GET`    | Eén suite ophalen (ingebouwd of aangepast)                               |
| `/api/evals/suites`           | `POST`   | Een aangepaste suite maken — schema `evalSuiteSaveSchema`                |
| `/api/evals/suites/{suiteId}` | `GET`    | Een aangepaste suite ophalen                                             |
| `/api/evals/suites/{suiteId}` | `PUT`    | Een aangepaste suite vervangen (cases worden opnieuw ingevoegd)          |
| `/api/evals/suites/{suiteId}` | `DELETE` | Een aangepaste suite en de bijbehorende cases verwijderen                |

### Een suite uitvoeren

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

Optionele velden:

- `outputs` — `Record<caseId, string>` met vooraf berekende uitvoer. Wanneer dit
  wordt opgegeven, **slaat de runner de dispatch over** en beoordeelt deze
  alleen de gecachte uitvoer (handig voor offline-evaluatie).
- `compareTarget` — tweede doel dat parallel wordt uitgevoerd; beide
  uitvoeringen delen een gegenereerde `runGroupId` voor een rechtstreekse
  vergelijking.
- `apiKeyId` — interne API-sleutel waarmee de verzonden
  `/v1/chat/completions`-aanroepen worden geauthenticeerd. Vereist wanneer
  `REQUIRE_API_KEY` is ingeschakeld.

### Een aangepaste suite maken

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

## Dispatch-pijplijn

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Lost de suite op (ingebouwd of aangepast).
2. Bouwt voor elke case een `Request` naar `/v1/chat/completions` met de
   `messages` van de case, het opgeloste `model`, `stream: false` en `max_tokens: 512`
   (of de override van de case).
3. Roept de chathandler rechtstreeks aan (in-process — zonder extra HTTP-hop).
4. Meet de latentie en extraheert tekst uit `choices[0].message.content`
   of de Responses-API-payload `output[]`.
5. Scoort alle uitvoer via `runSuite()` en slaat deze vervolgens op via `saveEvalRun()`.

Cases worden **sequentieel** uitgevoerd. Er is momenteel geen concurrency-flag.

## Dashboard

De UI bevindt zich onder `Dashboard → Gebruik → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). Van daaruit kun
je:

- Ingebouwde en aangepaste suites bekijken met een preview per case.
- Aangepaste suites maken/bewerken/verwijderen met de casebuilder.
- Een target kiezen (standaardwaarden van de suite / model / combo), optioneel een tweede
  `compareTarget`, optioneel een API-sleutel, en vervolgens op aanvraag uitvoeren.
- De uitvoeringsgeschiedenis, geslaagd/mislukt per case, latentie en vastgelegde uitvoer bekijken.
- De voortschrijdende scorekaart bekijken, geaggregeerd over de meest recente uitvoering per
  `(suite, target)`-scope.

## Relatie met de Auto-Assessment-RFC

Een afzonderlijk, specifieker beoordelingssubsysteem bevindt zich in `src/domain/assessment/`
(zie ook [AUTO-COMBO.md](../routing/AUTO-COMBO.md) voor de live scoring-engine).
Dat subsysteem richt zich op de Auto Combo-engine — het automatisch scoren van providers en
modellen, zodat combo's zichzelf kunnen herstellen wanneer upstreams uitvallen. Het gebruikt een eigen runner,
een eigen categorizer en eigen scorelogica.

Het hier gedocumenteerde Evals-framework is het **bredere testoppervlak voor
algemeen gebruik**. Gebruik dit bij voorkeur voor willekeurige regressiesuites, A/B-vergelijkingen
en smoke-tests per release. Gebruik het Auto-Assessment-subsysteem wanneer je wilt
dat de realtime status van providers routeringsbeslissingen beïnvloedt.

## CI-integratie

Er is momenteel geen speciaal `eval:ci` npm-script. Er zijn twee opties als je
releases afhankelijk wilt maken van eval-resultaten:

- **HTTP-pad**: start de server, roep `POST /api/evals` aan met een bekende
  `suiteId` + `target` en controleer in de respons of `runs[].summary.passRate >= N`.
- **In-process-pad**: importeer `runEvalSuiteAgainstTarget()` uit
  `@/lib/evals/runtime` vanuit een script, voer dit uit tegen een testdatabase en controleer de
  geretourneerde `PersistedEvalRun.summary`.

Tests voor de route en geschiedenis bevinden zich in
`tests/unit/evals-route.test.ts` en `tests/unit/evals-history.test.ts`.

## Uitbreidingspunten

Veelvoorkomende wijzigingen en waar je ze aanbrengt:

- **Nieuwe scorestrategie** — breid het blok `switch (evalCase.expected.strategy)`
  in `evaluateCase()` (`evalRunner.ts`) uit en verruim `EvalCaseStrategy` in
  `src/lib/db/evals.ts`, evenals `evalCaseBuilderSchema` in `schemas.ts`.
- **Nieuwe ingebouwde suite** — definieer een suiteobject en roep `registerSuite()` aan
  onderaan `evalRunner.ts`. Deze wordt automatisch ontdekt door `listSuites()`.
- **Uitvoeren met concurrency** — wijzig de sequentiële `for`-lus in
  `runEvalSuiteAgainstTarget()` in een begrensde `Promise.all` (er bestaat momenteel
  geen concurrency-beheer).
- **Cases met streaming/tool-calls** — momenteel dwingt de runner `stream: false` af.
  Voor streaming of toolbewuste evaluatie zijn wijzigingen nodig in `runtime.ts`
  (SSE-chunks vastleggen en aggregeren voordat ze worden gescoord).

## Zie ook

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — algemene rondleiding door het product
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — naslagwerk voor de aanvraagpijplijn
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — Auto Combo-score-engine (live runtime)
- Bron: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- UI: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
