# Evaluations (Evals) (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **Totuuden lähde:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Päivitetty viimeksi:** 2026-06-28 — v3.8.40

OmniRoute sisältää yleiskäyttöisen arviointikehyksen, jonka avulla voit vertailla reititysmäärityksiä, yksittäisiä palveluntarjoajia/malleja tai mukana toimitettuja "golden set" -testikokonaisuuksia. Sen avulla voit varmistaa reititysmuutosten toimivuuden, validoida uusia palveluntarjoajia ja asettaa julkaisuille hyväksymisrajat ennen niiden siirtämistä tuotantoliikenteeseen.

Kehys koostuu seuraavista osista:

- Puhdas suoritusmoduuli (`src/lib/evals/evalRunner.ts`), joka rekisteröi muistissa olevat sisäänrakennetut testikokonaisuudet, arvioi tuloksia odotettujen kriteerien perusteella ja koostaa tuloskortit.
- Pysyvyyskerros (`src/lib/db/evals.ts`) mukautetuille (käyttäjän määrittämille) testikokonaisuuksille ja historiallisille suorituksille SQLitessä.
- Orkestrointikerros (`src/lib/evals/runtime.ts`), joka suorittaa jokaisen tapauksen lähettämällä todellisia kutsuja päätepisteeseen `POST /v1/chat/completions`, tallentaa viiveen ja tulokset sekä säilyttää suorituksen.
- REST-päätepisteet polun `/api/evals/*` alla (vain hallinnan todennuksella).
- Hallintapaneelin näkymä kohdassa `Hallintapaneeli → Käyttö → Arvioinnit` (`EvalsTab.tsx`).

## Käsitteet

### Testikokonaisuus

Testikokonaisuus on nimetty testitapausten kokoelma, jolla on `description` ja vähintään yksi tapaus. Testikokonaisuuksia tulee kahdesta lähteestä:

| Lähde      | Määrityspaikka                                                     | Muokattavissa ajon aikana?           |
| ---------- | ------------------------------------------------------------------ | ------------------------------------ |
| `built-in` | Rekisteröidään `registerSuite()`-kutsulla käynnistyksen yhteydessä | Ei (määritetty koodissa)             |
| `custom`   | Tallennetaan SQLiten tauluihin `eval_suites` + `eval_cases`        | Kyllä (API:n/käyttöliittymän kautta) |

Nykyiset sisäänrakennetut testikokonaisuudet (katso `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 perustason tapausta, jotka kattavat tervehdykset, matematiikan, kääntämisen ja turvallisuuden
- `coding-proficiency` — Python/JS/SQL/TS/virheiden tunnistus
- `reasoning-logic` — syllogismit, sanalliset tehtävät ja hahmontunnistus
- `multilingual` — kääntäminen ja kielen tunnistus
- `safety-guardrails` — henkilötiedot, jailbreak-hyökkäykset, kieltäytyminen ja tietoisuus vinoumista
- `instruction-following` — vain JSON, numeroidut luettelot ja kielirajoitteet
- `codex-comparison` — vastakkain vertailtavat ohjelmointitehtävät, jotka on tarkoitettu vertailutilaan

### Tapaus

Jokainen tapaus sisältää seuraavat tiedot:

| Kenttä     | Kuvaus                                                                          |
| ---------- | ------------------------------------------------------------------------------- |
| `id`       | Vakaa tunniste (käytetään tulosten ja mittareiden avaimena)                     |
| `name`     | Ihmisen luettavissa oleva nimi                                                  |
| `model`    | Oletusmalli, kun suoritus käyttää `suite-default`-kohdistusta                   |
| `input`    | `{ messages, max_tokens? }` — lähetetään päätepisteeseen `/v1/chat/completions` |
| `expected` | `{ strategy, value }` — pisteytysperuste (katso jäljempänä)                     |
| `tags`     | Valinnaiset tunnisteet (esim. `safety`, `pii`, `jailbreak`)                     |

### Kohde

Sama testikokonaisuus voidaan suorittaa eri kohteita vasten. Kohteen skeema on
`evalTargetSchema` tiedostossa `src/shared/validation/schemas.ts`:

| Kohdetyyppi     | `id`             | Toiminta                                                                    |
| --------------- | ---------------- | --------------------------------------------------------------------------- |
| `suite-default` | `null`           | Jokainen tapaus käyttää omaa sisäänrakennettua `model`-kenttäänsä           |
| `model`         | mallin nimi      | Pakota jokainen tapaus yhden suoran mallin kautta (esim. `gpt-4o`)          |
| `combo`         | yhdistelmän nimi | Suorita jokainen tapaus yhden yhdistelmän kautta (testaa reititysmoottoria) |

Tyypeille `model` ja `combo` kenttä `id` on pakollinen (Zodin
`superRefine` valvoo tätä). Kun `compareTarget` on annettu, molempien kohteiden on oltava erilaisia —
suoritusmoduuli tallentaa molemmat suoritukset samalla `runGroupId`-tunnisteella A/B-vertailua varten.

## Pisteytyskriteerit

Toteutettu `evaluateCase()`-funktiossa (evalRunner.ts):

| Strategia  | Hyväksytään, kun…                                                                   |
| ---------- | ----------------------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                                   |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`                 |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` on tosi                             |
| `custom`   | `expected.fn(actualOutput, evalCase)` palauttaa toden arvon (vain sisäänrakennetut) |

**Huomautus:** Mukautettuun funktioon perustuva pisteytys on varattu koodissa määritetyille (sisäänrakennetuille)
testikokonaisuuksille, koska funktioita ei voi serialisoida API:n kautta.
`evalCaseBuilderSchema` hyväksyy käyttäjien luomissa testikokonaisuuksissa vain
arvot `contains | exact | regex`.

Tällä hetkellä käytettävissä ei ole LLM-tuomarointia eikä upotuspohjaista samankaltaisuuspisteytystä — sellainen
olisi selkeä laajennuskohta `evaluateCase()`-funktiossa.

## Tietokantaskeema

Kolme taulua (migraatiot `030_create_eval_runs.sql` ja
`031_create_eval_suites.sql`):

| Taulu         | Tarkoitus                                                                                                                               |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Mukautetun testikokonaisuuden metatiedot (`id`, `name`, `description`)                                                                  |
| `eval_cases`  | Testikokonaisuuden tapaukset — `input_json`, `expected_*`, `tags_json`                                                                  |
| `eval_runs`   | Historialliset suoritukset — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Sisäänrakennettuja testikokonaisuuksia **ei** tallenneta tietokantaan. Ne säilyvät muistissa ja
rekisteröidään uudelleen aina, kun `evalRunner.ts` tuodaan.

## REST API

Kaikki päätepisteet edellyttävät hallinnan todennusta (`requireManagementAuth`) — ne eivät
ole osa julkista välityspalvelinpintaa.

| Päätepiste                    | Menetelmä | Kuvaus                                                                                 |
| ----------------------------- | --------- | -------------------------------------------------------------------------------------- |
| `/api/evals`                  | `GET`     | Listaa testikokonaisuudet + viimeisimmät suoritukset + tuloskortti + kohteet + avaimet |
| `/api/evals`                  | `POST`    | Suorita testikokonaisuus (yksittäinen tai vertailu) — skeema `evalRunSuiteSchema`      |
| `/api/evals/{suiteId}`        | `GET`     | Hae yksi testikokonaisuus (sisäänrakennettu tai mukautettu)                            |
| `/api/evals/suites`           | `POST`    | Luo mukautettu testikokonaisuus — skeema `evalSuiteSaveSchema`                         |
| `/api/evals/suites/{suiteId}` | `GET`     | Hae mukautettu testikokonaisuus                                                        |
| `/api/evals/suites/{suiteId}` | `PUT`     | Korvaa mukautettu testikokonaisuus (tapaukset lisätään uudelleen)                      |
| `/api/evals/suites/{suiteId}` | `DELETE`  | Poista mukautettu testikokonaisuus ja sen tapaukset                                    |

### Testikokonaisuuden suorittaminen

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

Valinnaiset kentät:

- `outputs` — ennalta laskettujen tulosteiden `Record<caseId, string>`. Kun se annetaan,
  suorittaja **ohittaa kutsujen lähettämisen** ja pisteyttää vain välimuistiin tallennetut tulosteet (hyödyllinen
  offline-arvioinnissa).
- `compareTarget` — toinen rinnakkain suoritettava kohde; molemmat suoritukset jakavat
  generoidun `runGroupId`-tunnisteen keskinäistä vertailua varten.
- `apiKeyId` — sisäinen API-avain, jota käytetään lähetettyjen
  `/v1/chat/completions`-kutsujen todentamiseen. Pakollinen, kun `REQUIRE_API_KEY` on käytössä.

### Mukautetun testikokonaisuuden luominen

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

## Suoritusputki

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Selvittää testikokoelman (sisäänrakennetun tai mukautetun).
2. Muodostaa jokaiselle tapaukselle `Request`-pyynnön osoitteeseen `/v1/chat/completions` käyttäen tapauksen
   `messages`-arvoa, selvitettyä `model`-arvoa, asetusta `stream: false` ja asetusta `max_tokens: 512`
   (tai tapauksen omaa korvaavaa arvoa).
3. Kutsuu keskustelukäsittelijää suoraan (samassa prosessissa — ei ylimääräistä HTTP-kutsua).
4. Mittaa viiveen ja poimii tekstin joko kentästä `choices[0].message.content`
   tai Responses-API:n `output[]`-hyötykuormasta.
5. Pisteyttää kaikki tulosteet `runSuite()`-funktiolla ja tallentaa ne sitten `saveEvalRun()`-funktiolla.

Tapaukset suoritetaan **peräkkäin**. Rinnakkaisuuden asetusta ei tällä hetkellä ole.

## Hallintapaneeli

Käyttöliittymä sijaitsee kohdassa `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). Siellä voit:

- Selata sisäänrakennettuja ja mukautettuja testikokoelmia tapauskohtaisine esikatseluineen.
- Luoda, muokata ja poistaa mukautettuja testikokoelmia tapauseditorilla.
- Valita kohteen (testikokoelman oletukset / malli / yhdistelmä), valinnaisesti toisen
  `compareTarget`-kohteen ja API-avaimen sekä käynnistää suorituksen pyynnöstä.
- Tarkastella suoritushistoriaa, tapauskohtaisia läpäisyjä ja hylkäyksiä, viivettä sekä tallennettuja tulosteita.
- Nähdä jatkuvasti päivittyvän tuloskortin, joka on koostettu kunkin
  `(suite, target)`-alueen viimeisimmästä suorituksesta.

## Suhde Auto-Assessment-RFC:hen

Erillinen, rajatumpi arviointialijärjestelmä sijaitsee hakemistossa `src/domain/assessment/`
(katso myös reaaliaikainen pisteytysmoottori tiedostosta [AUTO-COMBO.md](../routing/AUTO-COMBO.md)).
Tämä alijärjestelmä on tarkoitettu Auto Combo -moottorille — se pisteyttää palveluntarjoajia ja
malleja automaattisesti, jotta yhdistelmät voivat korjata itsensä, kun taustapalveluissa ilmenee häiriöitä. Se käyttää omaa suorittajaansa,
omaa luokittelijaansa ja omaa pisteytyslogiikkaansa.

Tässä dokumentoitu Evals-kehys on **laajempi, yleiskäyttöinen
testausrajapinta**. Käytä sitä mieluiten mielivaltaisiin regressiotestikokoelmiin, A/B-vertailuihin
ja julkaisukohtaisiin smoke-testeihin. Käytä Auto-Assessment-alijärjestelmää, kun tarvitset
reaaliaikaista palveluntarjoajan terveystietoa reitityspäätösten ohjaamiseen.

## CI-integraatio

Erillistä `eval:ci` npm-komentosarjaa ei tällä hetkellä ole. Julkaisujen estämiseen arviointitulosten perusteella on kaksi tapaa:

- **HTTP-polku**: käynnistä palvelin, lähetä `POST /api/evals` tunnetuilla
  `suiteId`- ja `target`-arvoilla ja varmista vastauksesta, että `runs[].summary.passRate >= N`.
- **Prosessinsisäinen polku**: tuo `runEvalSuiteAgainstTarget()` moduulista
  `@/lib/evals/runtime` komentosarjaan, suorita se testitietokantaa vasten ja tarkista
  palautettu `PersistedEvalRun.summary`.

Reittiä ja historiaa käsittelevät testit sijaitsevat tiedostoissa
`tests/unit/evals-route.test.ts` ja `tests/unit/evals-history.test.ts`.

## Laajennuskohdat

Yleisiä muutoksia ja niiden toteutuspaikat:

- **Uusi pisteytysstrategia** — laajenna `switch (evalCase.expected.strategy)`-lohkoa
  funktiossa `evaluateCase()` (`evalRunner.ts`) sekä laajenna `EvalCaseStrategy`-tyyppiä tiedostossa
  `src/lib/db/evals.ts` ja `evalCaseBuilderSchema`-skeemaa tiedostossa `schemas.ts`.
- **Uusi sisäänrakennettu testikokoelma** — määritä testikokoelmaobjekti ja kutsu `registerSuite()`-funktiota
  tiedoston `evalRunner.ts` lopussa. `listSuites()` löytää sen automaattisesti.
- **Suoritus rinnakkaisesti** — muuta funktion
  `runEvalSuiteAgainstTarget()` peräkkäinen `for`-silmukka rajoitetuksi `Promise.all`-suoritukseksi (rinnakkaisuuden
  hallintaa ei tällä hetkellä ole).
- **Suoratoisto-/työkalukutsutapaukset** — suorittaja pakottaa tällä hetkellä asetuksen `stream: false`.
  Suoratoisto tai työkalut huomioiva arviointi edellyttäisi muutoksia tiedostoon `runtime.ts`
  (SSE-osien tallennus ja koostaminen ennen pisteytystä).

## Katso myös

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — tuotteen yleiskatsaus
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — pyyntöputken viite
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — Auto Combo -pisteytysmoottori (käytönaikainen)
- Lähdekoodi: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- Käyttöliittymä: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
