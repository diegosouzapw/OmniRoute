# Quality Gates Reference (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Šis dokumentas yra pagrindinis visų „OmniRoute“ CI kokybės vartų informacijos šaltinis.
Jame aprašomi visi vartai, ką jie tikrina, kurioje CI užduotyje jie vykdomi, ar jiems
taikoma reketo bazinė reikšmė, ar sėkmės / nesėkmės politika, ir ar jie blokuoja komponavimą, ar yra tik rekomendaciniai.

Trumpą santrauką ir leidžiamų išimčių sąrašo politiką rasite `AGENTS.md` skiltyje „Quality Gates & Ratchets“.
Kritinį vertinimą, brandos klasifikaciją ir nuo įrankių nepriklausomą
tos pačios sistemos atkūrimo planą rasite
[kokybės vartų vadove](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Patikrų inventorius (~90 scenarijų)

Scenarijai yra kataloguose `scripts/check/` (politikos patikros) ir `scripts/quality/` (kartelės variklis).
Pagrindinis CI konfigūracijos šaltinis yra `.github/workflows/ci.yml`.

### Spartusis leidimo PR kelias (`quality.yml`)

`.github/workflows/quality.yml` vykdomas PR, nukreiptiems į `release/**`. Jis leidžia sklandžiai tęsti darbą bendraautorių šakose, naudodamas pagal kelius filtruojamas sparčiąsias patikras ir vieną rekomendacinį produkcinio komponavimo signalą kodo pakeitimams:

| Užduotis                                         | Aprėptis                                                                                                                                                                                                                                          | Blokuojanti                                                                                             |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `Build (advisory)`                               | Ne juodraštiniai kodo PR ir Mergify eilės šakos; Node 24, `npm-ci-retry`, `check:node-runtime`, `npm run build` su `OMNIROUTE_USE_TURBOPACK=1`; artefaktas neįkeliamas, nes jo nenaudoja jokia paskesnė kokybės užduotis                          | **Rekomendacinė** (`continue-on-error: true`; pašalinti po vienos savaitės stabilių leidimo PR vykdymų) |
| `Docs Gates (fast-path)`                         | Dokumentacijos / kodo PR; API dokumentacijos nuorodos ir visa dokumentacija                                                                                                                                                                       | Taip                                                                                                    |
| `Fast Quality Gates`                             | Kodo PR; statinės patikros, tipų patikra, valdymo skydelio tipų patikra, paveikti vienetų testai                                                                                                                                                  | Taip                                                                                                    |
| `Forgotten sibling tests`                        | Kodo PR; pakeisti moduliai susiejami su statiniais vartotojais ir galimais giminingais testais; agreguojančių modulių ir dinaminio importavimo keliai pateikiami kaip rekomendacinė diagnostika kartu su nurodytomis leidžiamojo sąrašo išimtimis | **Rekomendacinė**                                                                                       |
| `Vitest (fast-path)`                             | Kodo PR; spartusis Vitest testų rinkinys                                                                                                                                                                                                          | Taip                                                                                                    |
| `Unit Tests fast-path`                           | Kodo PR; į 4 dalis suskaidytas vienetų testų rinkinys                                                                                                                                                                                             | Taip                                                                                                    |
| `No new ESLint warnings`                         | Kodo PR; slopinimus įvertinanti lint įspėjimų patikra                                                                                                                                                                                             | Taip savo kilmės PR, rekomendacinė išsišakojimų PR                                                      |
| `Merge integrity (changelog + generated skills)` | Ne juodraštiniai PR; pakeitimų žurnalo ir sugeneruotų gebėjimų sinchronizavimas                                                                                                                                                                   | Taip savo kilmės PR, rekomendacinė išsišakojimų PR                                                      |

#### Pamirštų giminingų testų ataskaita

`npm run check:forgotten-sibling-tests` pakartotinai naudoja testų poveikio žemėlapio importų sprendiklį.
Kiekvienam pakeistam produkciniam moduliui jis pateikia deterministines
`pakeistas modulis / simbolis -> statinis vartotojas -> galimas giminingas testas` grandines, kai galimo
testo nėra ištraukimo užklausos pakeitimų skirtume. Markdown suvestinė ir JSON rezultatas išsaugomi kaip
`forgotten-sibling-tests` darbo eigos artefaktas, skirtas kalibruoti prieš pradedant taikyti bet kokį blokavimą.

Agreguojančių modulių pakartotiniai eksportai ir dinaminiai importai yra tik sprendimo diagnostika; jie niekada nesukuria
blokuojančio radinio. Peržiūrėtos išimtys saugomos
`config/quality/forgotten-sibling-allowlist.json`. Kiekviename įraše turi būti nurodytas vartotojas ir galimas
testas, pateiktas konkretus pagrindimas ir nuoroda į GitHub problemą arba ištraukimo užklausą. Netinkamai suformuoti įrašai
lemia patikros nesėkmę. Išimtys negali nuslopinti pašalinto galimo testo arba pakeitimų skirtumo, kuriame pridedama `.skip` / `.todo`;
teiginių susilpninimą ir kitokį maskavimą toliau kontroliuoja nepriklausomai blokuojanti
`check:test-masking` patikra.

### Užduotis: `lint`

Vykdoma kiekvienam PR į `main`. Nesėkmės atveju sujungimas blokuojamas.

| Scenarijus (`npm run ...`)        | Tikrina                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Blokuojantis                                         |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `check:node-runtime`              | Ar Node.js versija patenka į palaikomą diapazoną                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Taip                                                 |
| `check:cycles`                    | Žiedinius importus — visuose `src/` + `open-sse/` moduliuose                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Taip                                                 |
| `check:route-validation:t06`      | Ar visuose maršrutuose yra Zod schemos (6 lygio politika)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Taip                                                 |
| `check:any-budget:t11`            | Ar `@ts-expect-error // any` skaičius neviršija limito (11 lygio „catraca“)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Taip                                                 |
| `check:provider-consistency`      | Kiekvienas `providers.ts` teikėjas turi atitinkamą įrašą faile `providerRegistry.ts` (ir atvirkščiai, leidžiamųjų sąrašo ribose)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Taip                                                 |
| `check:model-lifecycle`           | Trys rankiniu būdu prižiūrimos maršruto parinkimo lentelės išlieka suderintos su į saugyklą įtraukta gyvavimo ciklo momentine kopija (#11503): `FITNESS_TABLE` (`taskFitness.ts`) nevertina nė vieno nebenaudojamo id, kurį gali maršrutizuoti `REGISTRY`; kiekvienas `BUILT_IN_ALIASES` tikslas yra `REGISTRY` ir jo nėra nebenaudojamų id momentinėje kopijoje; kiekvienas nebenaudojamas id, vis dar esantis `REGISTRY`, yra persiunčiamas arba įtrauktas į `allowedRetiredInCatalog`; ir joks `DEFAULT_DEGRADATION_MAP` šaltinis ar tikslas toje momentinėje kopijoje nėra pažymėtas kaip nebenaudojamas. Tai neįrodo, kad modelį šiuo metu aptarnauja veikianti išorinė sistema. Veikia neprisijungus — lygina su `config/quality/model-lifecycle.json`, kuris rankiniu būdu atnaujinamas naudojant `npm run quality:refresh-model-lifecycle` (reikalingas tinklas; neintegruota į CI). `allowedRetiredInCatalog` yra tik mažinamas sąrašas: įrašą pridėkite tik susieję jį su sekimo užduotimi. | Taip                                                 |
| `check:fetch-targets`             | Kiekvienas `fetch("/api/...")` kliento pusės `src/` kode nurodo tikrą `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Taip                                                 |
| `check:deps`                      | Visos priklausomybės, kurias galima įdiegti naudojant `npm install`, iš kiekvieno saugykloje esančio `package.json` yra įtrauktos į `dependency-allowlist.json`; nauji prie konkrečios versijos neprisegti arba typosquatting principu sukurti paketai pažymimi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Taip                                                 |
| `audit:deps`                      | `npm audit` (šakninis projektas + electron) — nėra aukšto / kritinio lygio įspėjimų (iš dalies sutampa su osv `check:vuln-ratchet`; žr. racionalizavimo darbų sąrašą)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Taip                                                 |
| `check:lockfile`                  | `package-lock.json` vientisumas — https registras, vientisumo maišos, nėra pagrindinio kompiuterio perrašymų                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Taip                                                 |
| `check:licenses`                  | Gamybinių priklausomybių SPDX licencijų leidžiamųjų sąrašas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Taip                                                 |
| `check:tracked-artifacts`         | Nėra kompiliavimo artefaktų / į saugyklą įtrauktų `node_modules` simbolinių nuorodų (taip pat vykdoma per husky prieš įsipareigojimą; patikra prieš išsiuntimą sąmoningai minimali — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Taip                                                 |
| `check:vitest-exclusions`         | Kiekviena Vitest išimtis nurodo sekimo problemą ir yra pateikta faile `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Taip                                                 |
| `check:file-size`                 | Nė vienas šaltinio failas neviršija jo plėtiniui nustatytos ribos (fiksavimo mechanizmas: dideli failai užfiksuoti `frozen` sąraše)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Taip                                                 |
| `check:error-helper`              | Klaidų atsakymams vykdyklėse / apdorojimo funkcijose naudojamos `buildErrorBody()` / `sanitizeErrorMessage()` (griežta taisyklė Nr. 12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Taip                                                 |
| `check:migration-numbering`       | Migracijų SQL failai sunumeruoti nuosekliai, be praleidimų ar pasikartojimų                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Taip                                                 |
| `check:public-creds`              | Jokių tiesiogiai įrašytų OAuth `client_id`/`client_secret` ar Firebase Web raktų už `publicCreds.ts` ribų (griežta taisyklė Nr. 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Taip                                                 |
| `check:db-rules`                  | Jokių neapdorotų SQL užklausų už `src/lib/db/` modulių ribų; jokių bendrojo eksportavimo importų iš `localDb.ts` (griežtos taisyklės Nr. 2 / Nr. 5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Taip                                                 |
| `check:known-symbols`             | Teikėjų vykdikliai, maršruto parinkimo strategijos ir vertėjai, užregistruoti jų išsiuntimo lentelėse, atitinka diske esančius failus — nėra atsietų ar nedeklaruotų simbolių                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Taip                                                 |
| `check:route-guard-membership`    | Kiekvienas maršrutas, paleidžiantis antrinį procesą, yra klasifikuojamas naudojant `isLocalOnlyPath()` (griežtos taisyklės Nr. 15 / Nr. 17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Taip                                                 |
| `check:test-discovery`            | Kiekvieną saugykloje esantį `*.test.ts` / `*.spec.ts` failą aptinka bent viena testų vykdymo priemonė (reketo principas: neaptiktų failų sąrašas faile `test-discovery-baseline.json` gali tik trumpėti)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Taip                                                 |
| `check:agent-skills-sync`         | Sugeneruoti agentų įgūdžių artefaktai atitinka jų šaltinio katalogą (nėra neatitikimų)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `check:provider-asset-provenance` | Teikėjų logotipai / ištekliai turi užregistruotą kilmės įrašą                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `lint:json`                       | JSON konfigūracijos failai sėkmingai išanalizuojami ir atitinka saugyklos lint taisykles                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `typecheck:core`                  | TypeScript kompiliacija be klaidų (tik patariamojo pobūdžio įspėjimai)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Taip                                                 |
| `typecheck:noimplicit:core`       | Griežtas `noImplicitAny` — orientuota į ateitį; daugeliui esamų iškvietimo vietų vis dar reikia anotacijų                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | **Patariamojo pobūdžio** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`, apribotas iki `src/app/(dashboard)/**` (#7033) — `typecheck:core` kruopščiai atrinktame 27 failų leidžiamajame sąraše nėra jokių valdymo skydelio TSX failų, o `next build` taip pat niekada netikrina jų tipų (`next.config.mjs` nustato `ignoreBuildErrors: true`), todėl ten atsiradusios nesusietų identifikatorių regresijos (#6625/#6909) CI sistemai buvo nematomos. Skirtumai lyginami su fiksuota kiekvieno failo ir kiekvieno TS kodo klaidų skaičiaus bazine reikšme (`config/quality/dashboard-typecheck-baseline.json`, naudojant tą patį pasenusių įrašų tikrinimo modelį kaip `check:known-symbols`) — tik NAUJOS klaidos, viršijančios bazinį skaičių, lemia patikros nepavykimą; ištaisę esamą klaidą, sumažinkite bazinę reikšmę naudodami `--update`.                                                                                                                                                                                                                       | Taip                                                 |

### Užduotis: `quality-gate`

Vykdoma po `test-coverage`. Nesėkmės atveju blokuoja sujungimą.

| Scenarijus                   | Tikrina                                                                                                                                                                                                                      | Blokuojantis                    |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `quality:collect`            | Sugeneruoja `quality-metrics.json` (ESLint įspėjimų skaičius, aprėptis iš sujungtos fragmentų ataskaitos)                                                                                                                    | Taip (prieš slenkstinę patikrą) |
| `quality:ratchet`            | Nė viena `quality-baseline.json` metrika nepablogėjo (ESLint įspėjimai ≤ bazinė reikšmė; aprėptis ≥ bazinė reikšmė)                                                                                                          | Taip                            |
| `check:duplication`          | Kodo dubliavimas (jscpd@4) neviršija `quality-baseline.json` nustatytos bazinės reikšmės                                                                                                                                     | Taip                            |
| `check:complexity`           | Failo lygmens ciklomatinis sudėtingumas neviršija ribos (pagrindinės ESLint taisyklės `complexity` + `max-lines-per-function`)                                                                                               | Taip                            |
| `check:cognitive-complexity` | Kognityvinio sudėtingumo slenkstinė patikra (`eslint-plugin-sonarjs`) — atskiras ESLint vykdymas; CI vykdo abi patikras, sujungtas į vieną `check:complexity-ratchets` veiksmą                                               | Taip                            |
| `check:dead-code`            | Nenaudojamų eksportų / failų slenkstinė patikra (knip) nepablogėja, palyginti su bazine reikšme                                                                                                                              | Taip                            |
| `check:compression-budget`   | Glaudinimo etalono biudžetas — kiekvienam varikliui nustatytos minimalios žetonų sutaupymo ribos neturi pablogėti                                                                                                            | Taip                            |
| `check:type-coverage`        | Tipizuotos dalies procentinės reikšmės slenkstinė patikra (`type-coverage`) nepablogėja; didžiąja dalimi pakeičia `typecheck:noimplicit:core`                                                                                | Taip                            |
| `check:codeql-ratchet`       | Atvirų CodeQL perspėjimų skaičius nepablogėja (nuskaitoma per `gh api`; jei nėra prieigos rakto, patikra korektiškai praleidžiama) — atnaujinimo dažnį ir rankinį paleidimą žr. toliau, skiltyje „CodeQL slenkstinė patikra“ | Taip                            |

### Užduotis: `quality-extended`

Visa užduotis yra rekomendacinė (`continue-on-error: true`). npm pagrįsti regresijos kontrolės mechanizmai vykdomi
iš tikrųjų; išoriniai skaitytuvai įdiegiami naudojant `gh release download` ir patys praleidžia vykdymą (baigia darbą kodu 0),
kai dvejetainio failo vis dar nėra.

| Scenarijus               | Ką tikrina                                                                                                                                                                                                         | Blokuojantis       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| `check:circular-deps`    | Nėra ciklinių priklausomybių (dpdm)                                                                                                                                                                                | **Rekomendacinis** |
| `check:bundle-size`      | Paketo dydis neviršija ribos                                                                                                                                                                                       | **Rekomendacinis** |
| `check:secrets`          | Paslapčių paieška (gitleaks) — praleidžiama, jei nėra dvejetainio failo                                                                                                                                            | **Rekomendacinis** |
| `check:vuln-ratchet`     | Priklausomybių pažeidžiamumai (osv-scanner) neregresuoja — praleidžiama, jei nėra dvejetainio failo                                                                                                                | **Rekomendacinis** |
| `check:workflows`        | Darbo eigų analizė (actionlint + zizmor) — praleidžiama, jei nėra dvejetainių failų                                                                                                                                | **Rekomendacinis** |
| `check:openapi-breaking` | Viešosios API sutarties (`openapi.yaml`) nesuderinami pakeitimai, palyginti su bazine šaka (oasdiff) — išveda `openapiBreaking=N`; praleidžiama, jei nėra oasdiff arba bazinės specifikacijos nepavyksta nustatyti | **Rekomendacinis** |

### Užduotis: `docs-sync-strict`

Vykdoma kiekvienai į `main` nukreiptai PR. Nesėkmės atveju sujungimas blokuojamas.

| Scenarijus                     | Ką tikrina                                                                                                                                                                                                             | Blokuojantis                       |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `check:docs-all`               | Metašliuzas, nuosekliai vykdantis 6 toliau nurodytus pošliužius                                                                                                                                                        | Taip                               |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt versijų suderinamumas                                                                                                                                                                    | Taip                               |
| ↳ `check:docs-counts`          | Tekste nurodyti skaičiai (teikėjų skaičius, migracijų skaičius ir kt.) patenka į realių skaičių regresijos kontrolės intervalą                                                                                         | Taip                               |
| ↳ `check:env-doc-sync`         | Kiekvienas `.env.example` aplinkos kintamasis yra dokumentuotas dokumentacijos lentelėje ir atvirkščiai                                                                                                                | Taip                               |
| ↳ `check:deprecated-versions`  | Dokumentacijoje nėra nebenaudojamų versijų eilučių                                                                                                                                                                     | Taip                               |
| ↳ `check:doc-links`            | Vidinės dokumentacijos markdown nuorodos nukreipia į realius failus (`[text]`/`(path)` forma)                                                                                                                          | Taip                               |
| ↳ `check:fabricated-docs`      | Dokumentacijoje nurodyti maršrutai, aplinkos kintamieji, CLI komandos, hook pavadinimai ir failų keliai egzistuoja kodų bazėje. Griežtasis šliuzas naudojant `--strict`; be šios žymos leidžiama tęsti įvykus klaidai. | Taip (per `--strict` CI aplinkoje) |
| `check:cli-i18n`               | CLI komandų eilutės yra visuose i18n lokalės failuose                                                                                                                                                                  | Taip                               |
| `check:openapi-coverage`       | OpenAPI specifikacija apima bent regresijos kontrolės mechanizmu nustatytą minimalų realių maršrutų skaičių                                                                                                            | Taip                               |
| `check:openapi-security-tiers` | Saugumo lygių anotacijos faile `openapi.yaml` atitinka `routeGuard.ts` klasifikacijas                                                                                                                                  | **Rekomendacinis**                 |
| `check:openapi-routes`         | Kiekvienas `openapi.yaml` kelias atitinka realų `route.ts` (apsauga nuo haliucinacijų)                                                                                                                                 | Taip                               |
| `check:docs-symbols`           | Kiekviena `/api/...` nuoroda failuose `docs/**/*.md` atitinka realų `route.ts` (apsauga nuo haliucinacijų)                                                                                                             | Taip                               |
| `i18n translation drift`       | Neišversti raktai i18n lokalės failuose — tik įspėjimas                                                                                                                                                                | **Rekomendacinis**                 |

### Užduotis: `i18n-ui-coverage`

| Scenarijus                          | Tikrina                                                                                                                                                                                                                          | Blokuojantis     |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `check-ui-keys-coverage` (įterptas) | UI i18n raktų aprėptis yra ≥ 65 %                                                                                                                                                                                                | Taip             |
| `check-ui-value-drift` (įterptas)   | Perrašius anglišką **reikšmę**, nelieka pasenusio vertimo                                                                                                                                                                        | Taip             |
| `check-new-key-coverage` (įterptas) | **Naujas** angliškas raktas yra išverstas kiekvienoje lokalėje — `__MISSING__:` žymeklis atmetamas                                                                                                                               | Taip             |
| `check-translation-ratio`           | Tikrų vertimų santykis kiekvienoje lokalėje (identiškos angliškam tekstui / vietaženklio / trūkstamos reikšmės už leidžiamųjų sąrašo ribų) negali viršyti `config/quality/i18n-translation-baseline.json` + leidžiamos paklaidos | **Patariamasis** |

Reikalingas `fetch-depth: 0` — reikšmių nuokrypio patikra lygina `en.json` su sujungimo baze.

#### `check-ui-value-drift` — pasenusių vertimų patikra

Aptinka vieną i18n regresijos tipą, kurio kitos patikros struktūriškai negali aptikti: angliška reikšmė
perrašoma, o vertimai, sukurti pagal _ankstesnį_ anglišką tekstą, lieka nepakeisti, todėl
anglų kalbos nenaudojantys naudotojai ir toliau skaito užtikrintai suformuluotą, bet dabar jau klaidingą tekstą.

Tai iš tikrųjų pateko į leidimą. `oauthModal.googleOAuthWarning` buvo perrašytas įdiegus Antigravity
prisijungimo pagalbinę priemonę (#5203); **39 iš 43 lokalių** liko tekstas, nurodantis operatoriams „nukopijuoti
visą URL ir įklijuoti jį žemiau“ — šiam teikėjui toks procesas negali būti užbaigtas. Tai liko
nepastebėta iki #8463, nes:

- `sync-ui-keys` užpildo tik **nesamus** raktus, bet niekada neatnaujina **pasenusių**;
- `check-ui-keys-coverage` skaičiuoja rakto _buvimą_, todėl pasenęs vertimas laikomas aprėptu;
- `check-translation-drift` stebi `docs/i18n/<locale>/**.md` dokumentacijos kopijas —
  jis niekada neskaito `src/i18n/messages/*.json`. Nuo 2026-09 pakartotinio sinchronizavimo blokuojama užduotyje `docs-sync-strict`: redaguojant pagrindinį dokumentą → `npm run i18n:run -- --files=<doc>` (skyriaus lygmens, nebrangu).

**Atsižvelgia į skirtumus, o ne į bazinę būseną.** Ji palygina sujungimo bazės `en.json` su
darbine kopija; kiekvienam raktui, kurio angliška reikšmė pasikeitė, bet kuri lokalė, kurioje liko
nepakeistas vertimas, laikoma pasenusia. Taip sąmoningai **užšaldoma anksčiau susikaupusi skola** — iš skirtumo
neįmanoma nustatyti, iš kurios senos angliškos reikšmės kilo ilgą laiką egzistuojantis vertimas, todėl patikra vertina
tik tai, ką paliečia dabartinis pakeitimas. Alternatyva (kiekvieno rakto maišos bazinė būsena) pareikalautų
~600 KB sugeneruoto failo, 3 kartus didesnio už didžiausią esamą bazinės būsenos failą, kuris keistųsi su kiekviena i18n PR.

Patikrą galima tenkinti dviem būdais:

1. atnaujinti paveiktus vertimus arba
2. nustatyti jų reikšmę į `__MISSING__:<new english>` — vykdymo aplinka tuomet pateikia pataisytą anglišką tekstą
   (`src/i18n/request.ts::deepMergeFallback`, #7258), o raktas įtraukiamas į vertimo eilę.

Jei pasikeitė eilutės **prasmė**, geriau **pervadinti raktą**: naujas raktas negali paveldėti
pasenusio vertimo. Toks šablonas buvo panaudotas #8463.

```bash
npm run i18n:check-value-drift          # griežtas režimas (vykdomas CI)
npm run i18n:check-value-drift:warn     # tik pateikti ataskaitą
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Baigiama su kodu 0 ir pranešimu `SKIP reason=base-unresolved`, kai bazinio katalogo nepavyksta perskaityti (negili
kopija be bazinės nuorodos), analogiškai kaip `check-openapi-breaking`.

### Užduotis: `i18n`

Visa i18n tikrinimo matrica (po vieną užduotį kiekvienai lokalei). Visa užduotis yra patariamojo pobūdžio.

| Scenarijus                      | Tikrina                             | Blokuojantis                                                 |
| ------------------------------- | ----------------------------------- | ------------------------------------------------------------ |
| `validate_translation.py quick` | Kiekvienos lokalės vertimo išsamumą | **Patariamasis** (`continue-on-error: true` visai užduočiai) |

### Užduotis: `pr-test-policy`

Vykdoma tik sujungimo užklausoms.

| Scenarijus             | Tikrina                                                                                                                                                   | Blokuojantis |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check:pr-test-policy` | PR, kurios keičia produkcinį kodą kataloguose `src/`, `open-sse/`, `electron/` arba `bin/`, turi įtraukti arba atnaujinti testus (griežta taisyklė Nr. 8) | Taip         |
| `check:test-masking`   | Pakeisti testų failai nesumažina bendro teiginių skaičiaus ir neprideda `assert.ok(true)` tautologijų                                                     | Taip         |
| `check:pr-evidence`    | PR apraše pateikiami pakeitimo testavimo / VPS įrodymai (automatizuoja griežtą taisyklę Nr. 18, ieškodamas PR tekste — trapu, žr. darbų sąrašą)           | Taip         |

### Užduotis: `test-vitest`

Vykdoma po `build`. Nesėkmės atveju blokuoja sujungimą.

| Rinkinys         | Tikrina                                                        | Blokuojantis                                                                                                          |
| ---------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP serverį (110 įrankių), autoCombo, podėlį — vitest vykdyklė | Taip                                                                                                                  |
| `test:vitest:ui` | UI komponentų testus — vitest vykdyklė                         | **Blokuojantis** — esamos triktys aiškiai neįtrauktos faile `vitest.config.ts`; dėl naujų trikčių užduotis nepavyksta |

### Naktinės darbo eigos (suplanuotos, rekomendacinės)

Jos vykdomos pagal cron tvarkaraštį (ir `workflow_dispatch`), tačiau niekada nevykdomos PR atvejais. Visos jos yra rekomendacinės.

| Darbo eiga             | Tikrina                                                                                                                                                                                             | Blokavimas        |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| `nightly-property`     | fast-check savybių testus su atsitiktine pradine reikšme ir dideliu paleidimų skaičiumi                                                                                                             | **Rekomendacinė** |
| `nightly-resilience`   | atminties krūvos augimo ribą, trikčių įterpimą chaoso metodu, k6 apkrovos / ilgalaikės apkrovos testus                                                                                              | **Rekomendacinė** |
| `nightly-llm-security` | promptfoo injekcijų apsaugą (blokavimo režimu) ir garak zondus (praleidžiami, jei nėra paslaugų teikėjo slaptos reikšmės)                                                                           | **Rekomendacinė** |
| `nightly-schemathesis` | OpenAPI sutarties neapibrėžtųjų testų generavimą (schemathesis) veikiančiame OmniRoute, naudojant `docs/openapi.yaml` — aptinka specifikacijos pažeidimus / neapdorotas 500 klaidas (8 etapas, B.4) | **Rekomendacinė** |
| `nightly-mutation`     | Stryker mutacijų testavimo įvertį greitojoje vienetinių testų juostoje — išlikę mutantai atskleidžia silpnus teiginius                                                                              | **Rekomendacinė** |
| `nightly-compat`       | Node variklio suderinamumo matricą visuose palaikomuose `engines.node` diapazonuose                                                                                                                 | **Rekomendacinė** |

---

## Spartos etapas (2026-08-30 → v4.0 LTS): kiekvienas bazinis lygis sušvelnintas 20 %

Savininko sprendimas (2026-08-30): iki v4.0 moduliarizavimo išleidimo sparta yra svarbesnė
už techninės skolos ribos išlaikymą. Kiekvienas **skaitinis** laipsniško griežtinimo bazinis lygis buvo sušvelnintas 20 %
vienu audituojamu veiksmu, o etapas deklaruotas faile `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Kas pakeista                                                                                                                                                                                                                          | Kur                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — mažesnės reikšmės yra geresnės: skaičiai ×1.2; didesnės reikšmės yra geresnės: procentai ÷1.2 (palikta 60 aprėpties apatinė riba, `eslintErrors` lieka 0, `eslintWarnings` 0 → 20 % fiksuoto slopinimų skaičiaus) | `quality-baseline.json` (`_relax_velocity_2026_08_30` pastaboje išvardytos visos reikšmės prieš → po)  |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                      | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, kiekvieno `frozen[*]` / `testFrozen[*]` failo eilučių riba ×1.2                                                                                                                                                     | `file-size-baseline.json`                                                                              |
| kiekvieno failo / kiekvieno TS kodo skaičiai ×1.2                                                                                                                                                                                     | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                   | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` tampa rekomendacinis, kai `_policy.requireTighten === false`                                                                                                                                                      | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| naktinis `bank-ratchet-shrinks` pristabdomas (jis užfiksuotų išmatuotą sumažėjimą ir panaikintų rezervą)                                                                                                                              | `.github/workflows/nightly-release-green.yml`                                                          |

Leidžiamųjų reikšmių sąrašai (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **nėra** biudžetai ir nebuvo keičiami. Sėkmės / nesėkmės politikos patikros (paslaptys, SQL taisyklės,
dokumentacijos / aplinkos sutartis, i18n atitiktis, vienetų testai) nepasikeitė — nesėkmingas testas tebėra nesėkmingas testas.

**Įrankiai**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — vienkartinis
  sušvelninimas (`scripts/quality/relax-baselines.mjs`); atsisako vykdyti antrą kartą su ta pačia
  pastaba.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  išmatuoja kiekvieną skaitinę patikrą taip pat kaip CI ir parodo kiekvienos patikros likusį rezervą
  (`scripts/quality/baseline-headroom.mjs`). Naktinė `baseline-headroom` užduotis paskelbia
  lentelę aktyvioje užduotyje **📈 Bazinių lygių rezervas (spartos etapas)** ir prideda
  `headroom-alert` žymą, kai bet kuri patikra yra ne daugiau kaip 10 % nutolusi nuo savo ribos arba ją jau viršija. Ta užduotis
  yra išankstinis perspėjimas: per kelias dienas išnaudotas biudžetas reiškia, kad sušvelninimą sunaudoja
  keli PR, o ne visa komanda — peržiūrėkite problemą sukėlusios patikros `_rebaseline_*` pastabas.

**Naujo kodo režimas (Clean-as-You-Code) — nuo 2026-08-30, tik spartusis PR kelias**

Per `pull_request` įvykius `quality.yml` perduoda `--base-ref <PR bazinis SHA>` komandoms `check:file-size`,
`check:complexity-ratchets` ir `check:dead-code`. Šiuo režimu patikra palygina HEAD su
sujungimo baze, **apsiribodama PR pakeistais failais** (`scripts/check/newCodeMode.mjs`:
sujungimo bazė materializuojama laikiname `git worktree`, ESLint/knip paleidžiami joje ir HEAD versijoje, o
kiekvieno failo skaičiams apskaičiuojamas skirtumas):

- **blokuojama** — PR pakeistuose failuose pridėjo ciklomatinio / kognityvinio sudėtingumo pažeidimų arba nenaudojamų eksportų
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` žurnale);
- **rekomendacinė patikra** — bendras visuotinis skaičius, palygintas su fiksuotu baziniu lygiu. Paveldėtas nuokrypis niekada nepadaro
  niekuo dėto PR nesėkmingo; nuokrypis iš naujo užfiksuojamas derinant leidimą ir stebimas rezervo užduoties.

`workflow_dispatch` paleidimai, leidimo parengties patikrų ciklas ir naktinė rezervo užduotis neturi PR bazės
ir toliau atlieka absoliutųjį (visuotinį) palyginimą. Aprėptis, dubliavimas ir tipų aprėptis kol kas lieka visuotiniai
(jų įrankiai negali nebrangiai pateikti kiekvieno failo skirtumo) — tai kandidatai tokiam pačiam apdorojimui.

**Etapo užbaigimas ties v4.0 (LTS = griežčiau nei anksčiau, o ne „grįžimas į įprastą būseną“)**

1. Grynoje `release/v4.0.0` viršūnėje: įrašui paleiskite `npm run quality:headroom --json`, tada
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` ir kiekvieno tipų tikrinimo barjero
   `--update` — kiekviena bazinė reikšmė sumažinama iki išmatuotos reikšmės.
2. Pašalinkite `_policy` iš `quality-baseline.json` (taip iš naujo įjungiamas `--require-tighten` ir naktinis
   kaupimas), o faile `check-openapi-coverage.mjs` atkurkite `THRESHOLD = 36` (ar didesnę reikšmę).
3. Sugriežtinkite ribas labiau, nei rodo išmatuotos reikšmės, ten, kur modularizavimas pasiteisino: failo dydžio `cap` vėl nustatykite į 1000
   (arba 800), aprėpties apatines ribas padidinkite 5, o modularizuotų paketų nenaudojamų eksportų ribą nustatykite į 0.

## Reketo bazinė reikšmė (`quality-baseline.json`)

Reketo variklis (`scripts/quality/check-quality-ratchet.mjs`) nuskaito `quality-baseline.json`
ir palygina jį su naujai surinktu `quality-metrics.json`. Jei kuris nors rodiklis pablogėja
daugiau nei leidžiama jo epsilon reikšmė, komponavimas laikomas nesėkmingu.

Šiuo metu stebimi rodikliai:

| Rodiklis              | Kryptis | Reikšmė                                |
| --------------------- | ------- | -------------------------------------- |
| `eslintWarnings`      | `down`  | ESLint įspėjimų skaičius neturi didėti |
| `coverage.statements` | `up`    | Sakinių aprėptis neturi mažėti         |
| `coverage.lines`      | `up`    | Eilučių aprėptis neturi mažėti         |
| `coverage.functions`  | `up`    | Funkcijų aprėptis neturi mažėti        |
| `coverage.branches`   | `up`    | Šakų aprėptis neturi mažėti            |

Norėdami atnaujinti bazinę reikšmę po realaus pagerėjimo:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Žyma `--update` įrašo dabartines išmatuotas reikšmes į `quality-baseline.json`.
Įtraukite šį failą į tą patį pakeitimų įrašą kaip ir rodiklį pagerinusį pakeitimą. PR, kuris pagerina
rodiklį neatnaujindamas bazinės reikšmės, bus aptiktas naudojant `--require-tighten` (6A.5 etapas,
įgyvendinimas dar laukiamas).

### CodeQL reketas: atnaujinimo dažnis ir rankinis paleidimas

`check:codeql-ratchet` nuskaito **saugyklos būseną, atnaujinamą pagal tvarkaraštį, o ne kiekvienam PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` pateikia
`state: configured`, `schedule: weekly`: tai GitHub numatytojo nustatymo nuskaitymas, o ne
kiekvieno išsiuntimo analizė. Pasekmė: sujungus įspėjimus IŠTAISANTĮ PR, reketas toliau
nuskaito seną, didesnį skaičių, kol bus paleistas kitas suplanuotas nuskaitymas, todėl
jis praneša apie regresiją kiekviename atvirame PR, įskaitant ir taisančio PR tolesnius
pakeitimus, kol nuskaitymo rezultatai pasivys.

**Rankinis atnaujinimas**: `gh workflow run codeql.yml --ref release/vX.Y.Z` iš naujo paleidžia
analizę ir per kelias minutes pakartotinai paskelbia įspėjimus. Pirmiausia perskaitykite `.github/workflows/codeql.yml`
— jo antraštėje paaiškinta, kad jis skirtas **tik `workflow_dispatch`**, nes **konfliktuoja su
GitHub „default setup“** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Norint atkurti `push`/`pull_request`/
`schedule` paleidiklius, pirmiausia būtinas **savininko veiksmas**: Settings → Code security →
CodeQL: Default → Advanced. Nepridėkite `schedule:` paleidiklio neatlikę šio perjungimo — jis
tik sukurs nesėkmingus paleidimus.

**Sumažėjus skaičiui, sugriežtinkite bazinę reikšmę** — `node scripts/check/check-codeql-ratchet.mjs
--update` įrašo naują išmatuotą skaičių į `quality-baseline.json` →
`metrics.codeqlAlerts.value`, kad reketas tyliai neleistų regresijos iki ankstesnės viršutinės
ribos. Praktinis pavyzdys (2026-09-02/03): PR #12502 ištaisė 7 realius įspėjimus
(13 → 6 išmatuoti atviri); PR #12530 sugriežtino užfiksuotą bazinę reikšmę nuo 11 iki 6, kad ji atitiktų rezultatą; likę
6 įspėjimai tuomet buvo atmesti, kiekvienam pateikiant atskirą pagrindimą, kol atvirų įspėjimų liko 0.

**Sprendimą dėl atmetimo priima operatorius (griežta taisyklė #14)** — niekada neatmeskite CodeQL įspėjimo
atmetimo komentare neįrašę techninio pagrindimo: `won't fix`, kai tai aukštesnio lygmens protokolo
reikalavimas, `used in tests`, kai tai testų fikstūra, `false positive`, kai naudojama dezinfekavimo priemonė,
kurios CodeQL negali aptikti (precedentas: `docs/security/ERROR_SANITIZATION.md`).

---

## Testų pakartojimo politika (WS5.4, v3.8.49)

Pakartojimo politika nustatoma kiekvienai vykdymo priemonei atskirai ir niekada netaikoma visuotinai — visuotinis pakartojimas tikras regresijas paverčia nematomais nestabiliais testais:

| Vykdymo priemonė | Politika                                                                                                                                                  | Kodėl                                                                                                                                                 |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` tik CI aplinkoje, su `trace: on-first-retry`                                                                                                 | Naršyklės / tinklo laiko parinkimas iš tiesų yra nedeterministinis; vienas pakartojimas su trasavimu nestabilų testą paverčia diagnozuojamu artefaktu |
| Vitest           | JOKIO visuotinio pakartojimo. Patvirtintai nestabiliam testui aiškiai nustatomas individualus pakartojimas (matomas pakeitimų skirtume ir peržiūrimas PR) | Taip karantino sąrašas lieka repozitorijoje ir niekada nebūna nepermatomas                                                                            |
| node:test (unit) | JOKIO pakartojimo, niekada                                                                                                                                | Nestabilus vienetinis testas yra testo klaida — ją ištaisykite, o ne bandykite dar kartą                                                              |

Tiksliniai SLO, kai bus įdiegta nestabilumo telemetrija (WS5.2/5.3): <1 % nestabilumo dažnis vienam testui
(„taisyti dabar“ slenkstis), ≥95 % sėkmingo vykdymo dažnis vienam konvejeriui. Tai pramonės orientacinės vertės —
jas reikia iš naujo sukalibruoti pagal mūsų pačių matavimus.

## Leidimo lygmens kartelės nuokrypis (WS5.5, v3.8.49)

Kai kartelė (failo dydžio, sudėtingumo, eslint įspėjimų) regresuoja GRYNAME leidimo
viršūnės taške, t. y. ją pablogino SUJUNGTŲ pakeitimų VISUMA, o nė vienas atskiras PR
savo šakoje regresijos neatkuria, pataisą turi atlikti **leidimo vadovas, vieną kartą,
leidimo šakoje**: pirmenybę teikite išskyrimui / pertvarkymui; bazinę reikšmę iš naujo
nustatykite tik pateikę dokumentuotą pagrindimo įrašą. Niekada neperkelkite kombinacinio
nuokrypio į pakeitimo autoriaus PR ir niekada iš naujo nenustatykite bazinės reikšmės
kiekvienam PR (tai paslepia tikras regresijas). Pirmiausia atskirkite priežastį: prieš
manydami, kad ją sukėlė jūsų PR, atkurkite nesėkmę pagal gryną viršūnės tašką
bandomajame worktree.

## Kartelės sumažinimų užfiksavimas — mažėjimo kryptis (#8584)

Kartelė automatizuota tik iš dalies, ir būtent netinkama jos dalis. Viršutinės ribos
**didinimas** yra rankinis JSON redagavimas, trunkantis dešimt sekundžių ir greičiausiai
atblokuojantis nesėkmingą PR. Norint ją **sumažinti**, kas nors turi paleisti `--update`
ir įtraukti rezultatą į commit — o iki užduoties `bank-ratchet-shrinks` įdiegimo jokia
darbo eiga to nedarė. Išmatuotos pasekmės (2026-07-25): 18 fiksuotų failų jau neviršijo
naujiems failams taikomos 800 eilučių ribos, o blogiausias neatitikimas siekė 132×
(`src/shared/validation/schemas.ts`, 19 eilučių su 2,523 riba); sudėtingumo viršutinė
riba per maždaug 37 bazinės reikšmės atnaujinimo pastabas pakilo `1794 → 2169`, o
sumažėjo tiksliai vieną kartą (−1); be to, „kitame cikle sugriežtinti naudojant
`--update`“ buvo parašyta 31 kartą, bet įvykdyta vieną kartą. Riba, išliekanti ilgiau
nei ją nulėmęs kodas, kiekvieną užbaigtą išskaidymą tyliai paverčia augimo leidimu tam,
kas failą redaguos vėliau.

`nightly-release-green.yml` → užduotis **`bank-ratchet-shrinks`** uždaro šį ciklą:

|             |                                                                                                                  |
| ----------- | ---------------------------------------------------------------------------------------------------------------- |
| Paleidžiama | pagal `schedule` (3× per dieną) + `workflow_dispatch` — sąmoningai **ne** pagal `push`                           |
| Matuoja     | aukščiausią `release/vX.Y.Z`, naudodama tokią pačią skyrą ir įterpimo apsaugą kaip `release-green`               |
| Įrašo       | `check:file-size --update` ir `check:complexity-ratchets --update` (abu dėl savo konstrukcijos gali tik mažinti) |
| Patikrina   | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                         |
| Pateikia    | vieną visada aktualų PR į leidimo šaką — priverstinai atnaujinamą, niekada nekuriantį perteklinių PR             |

Sumažinimai fiksuojami paketais, o ne po kiekvieno push, nes tam nėra delsos reikalavimo
(pakanka sumažinimą užfiksuoti per 8 val.), o vykdant po kiekvieno sujungimo PR šaka būtų
pakartotinai kuriama per sujungimo kampanijas ir kiekvieną kartą reikėtų vykdyti visą
ESLint patikrą. Aptikimas ir toliau vykdomas per push (`release-green`); paketais
atliekamas tik fiksavimas.

### Saugos tikrintuvas

Užduotis bazines reikšmes keičia be priežiūros, todėl būtent `verify-ratchet-bank.mjs`
užtikrina, kad tai būtų priimtina. Jis palygina medį po `--update` su `HEAD` ir
**nutraukia užduotį dar prieš sukuriant bet kokį commit** — neatverdamas jokio PR —
nebent kiekvienas pakeitimas yra vienas iš šių:

- `frozen` / `testFrozen` skaitinė reikšmė **sumažinta** arba **pašalinta**
- `complexity-baseline.json` → `count` **sumažinta**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **sumažinta**

Visa kita laikoma nesėkme: skaičiaus didinimas, įrašo pridėjimas, `cap` / `testCap`
keitimas arba `_rebaseline_*` pastabos ištrynimas / perrašymas (šios pastabos yra audito
seka, paaiškinanti kiekvienos viršutinės ribos priežastį, ir saugomos tame pačiame
`frozen` objekte kaip failų įrašai). Robotas, galintis padidinti ribą, būtų akivaizdžiai
blogesnis už esamą padėtį. Regresijos apsauga: `tests/unit/verify-ratchet-bank.test.ts`.

Užduotis niekada nevykdo push į `release/*` — PR sujungia žmogus, todėl klaidingas
matavimas negali būti įtrauktas be peržiūros.

## Leidžiamųjų sąrašo politika

Kiekviena patikra, kuri negali nepavykti dėl jau egzistuojančių pažeidimų, naudoja fiksuotą leidžiamųjų sąrašą
(pvz., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Politika yra tokia:

**Pašalinkite pagrindinę priežastį; leidžiamųjų sąrašą naudokite tik tada, kai pažeidimas jau egzistavo ir
jo negalima ištaisyti tame pačiame PR.**

Pridėdami įrašą į leidžiamųjų sąrašą:

1. Įtraukite komentarą su pagrindimu.
2. Nurodykite susijusią sekimo užduotį (pvz., `// #3498 — 2 etapo funkcija, dar neįgyvendinta`).
3. Pašalinkite įrašą tame pačiame PR, kuriame ištaisomas pažeidimas — pasenęs įrašas, kuris daugiau
   nebeslopina aktyvaus pažeidimo, pats yra defektas (įgyvendinus 6A.3 pasenusių taisyklių kontrolę,
   patikra nepraeis dėl niekur nebenaudojamo leidžiamųjų sąrašo įrašo).

**Nepridėkite** įrašų į leidžiamųjų sąrašą vien tam, kad testai būtų išlaikyti greičiau. Sėkminga patikra su augančiu
leidžiamųjų sąrašu sukuria klaidingą kokybės įspūdį.

### Kai jūsų PR nepraeina patikros

1. **Atidžiai perskaitykite patikros išvestį** — joje tiksliai nurodoma, kuris failas ar simbolis
   pažeidė taisyklę.
2. **Ištaisykite pažeidimą** — dauguma patikrų yra deterministinės failų sistemos patikros, kurios praeina vos tik
   kodas tampa teisingas.
3. **Jei pažeidimas jau egzistavo** (t. y. jūs jo nesukūrėte, tačiau dabar patikra
   jį apima): pridėkite leidžiamųjų sąrašo įrašą su pagrindimo komentaru ir sekimo užduotimi.
4. **Jei patikra yra slenkstinė** (aprėptis, ESLint įspėjimai, dubliavimas, sudėtingumas):
   jūsų pakeitimas pablogino metriką. Ištaisykite pagrindinę problemą arba (retais atvejais) paleiskite
   `npm run quality:ratchet -- --update`, jei pakeitimas yra sąmoningas ir metrikos
   pablogėjimas priimtinas — tačiau PR apraše paaiškinkite, kodėl.
5. **Rekomendacinės patikros** (`continue-on-error: true`) yra informacinės — jos neblokuoja
   sujungimo, tačiau rodomos CI suvestinėje. Vis tiek jas ištaisykite.

---

## Naujos patikros pridėjimas

1. Sukurkite `scripts/check/check-<name>.mjs` (arba `.ts`). Politiką tikrinančios patikros baigiamos kodu 0/1.
   Slenkstinės patikros perduoda metriką į `quality-metrics.json` per `collect-metrics.mjs`.
2. Į `package.json` pridėkite `"check:<name>": "node scripts/check/check-<name>.mjs"`.
3. Prijunkite ją `.github/workflows/ci.yml` faile prie tinkamos užduoties
   (politika → `lint` arba `docs-sync-strict`; slenkstinė patikra → `quality-gate`).
4. Jei ji turi leidžiamųjų sąrašą, pritaikykite `reportStaleEntries()` iš
   `scripts/check/lib/allowlist.mjs`, kad pasenę įrašai būtų aptinkami automatiškai.
5. Parašykite testą kataloge `tests/unit/build/`, apimantį patikros aptikimo logiką.
6. Atnaujinkite šį dokumentą (pridėkite eilutę į atitinkamos užduoties lentelę).

---

## Agentų įrankiai: LSP cikle (pasirenkama)

Be CI patikrų, „OmniRoute“ pateikia **pasirenkamą** `agent-lsp` karkasą
(projekto lygmens `.mcp.json`, 7 etapas, 15 užduotis). Sukurkite `.mcp.json`,
kad programavimo agentams būtų pasiekiamas TypeScript kalbos serveris ir jie galėtų išspręsti simbolių /
diagnostikos problemas **prieš** rašydami kodą — tai kompiliavimo prieš teiginį papildinys
`typecheck:core` patikrai, pašalinantis „išgalvotų simbolių“ klaidas jų atsiradimo vietoje. Jis sąmoningai
neįkeliamas automatiškai (MCP↔LSP tarpinį sprendimą pasirenkate ir patikrinate patys); netinkamas įrašas tik užregistruoja
prisijungimo klaidą ir niekada nenutraukia seansų.

---

## Racionalizavimo darbų sąrašas (ROI peržiūra — 9 etapas, 3 banga)

Šis inventorius buvo suderintas su `ci.yml` 2026-06-17 (ankstesnėje versijoje nebuvo
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Suderinto rinkinio ROI peržiūra
nustatė toliau nurodytus racionalizavimo kandidatus. **Sujungimai yra mechaniniai CI
pakeitimai; perjungimai ir pašalinimai yra operatoriui palikti politikos sprendimai.** Nė vienas
toliau nurodytas pakeitimas dar nepritaikytas.

**Taip pat pirmiau neaprašyta** (rekomendacinio pobūdžio, silpnas signalas): `docs-lint` užduotis
(markdownlint + Vale, visai užduočiai taikoma `continue-on-error`) ir atskiros skaitytuvų darbo eigos
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` yra faile
`quality-baseline.json`, tačiau nėra susietas su blokuojančiu reketiniu patikrinimu faile `ci.yml` — šiuo metu
metrika yra atsieta.

### Sujungimas / dubliavimo šalinimas (mechaninis, mažesnė rizika)

Kiekvienas kandidatas buvo patikrintas pagal faktinę kontrolinių patikrų būseną 2026-06-17 (pasitikėk, bet tikrink);
paaiškėjo, kad keli „akivaizdūs“ sujungimai slepia techninę skolą ir **nėra** tinkami tiesiogiai pakeisti esamus sprendimus.

- **`check:docs-sync` vykdomas du kartus** — atskirai `lint` užduotyje ir dar kartą `check:docs-all` (`docs-sync-strict`) viduje bei husky prieš patvirtinimą vykdomame kabliuke. ✅ **ATLIKTA** — atskiras iškvietimas iš `lint` pašalintas.
- **CVE nuskaitymas** — ❌ **NĖRA paprastas sujungimas.** `audit:deps` griežtai nesėkmingas aptikus bet kokį aukšto ar kritinio lygio CVE; `check:vuln-ratchet` (osv) nesėkmingas tik esant _regresijai_, palyginti su bazine reikšme (šiuo metu 1 MODERATE). Semantika skiriasi — pašalinus `audit:deps` būtų prarasta absoliuti aukšto ar kritinio lygio kontrolė. Palikti abu.
- **Ciklų aptikimas** — ❌ **NĖRA paprastas sujungimas.** `check:circular-deps` (dpdm) praneša apie **91 ciklą** (todėl jis yra rekomendacinio pobūdžio); jo negalima padaryti blokuojančio, kol šie ciklai nebus pašalinti, be to, jo aprėptis platesnė nei sėkmingai vykdomo, kruopščiai atrinkto `check:cycles`. Palikti `check:cycles` blokuojantį; 91 dpdm ciklo pašalinimas yra atskiras darbų sąrašo punktas.
- **Sudėtingumas** — ✅ **ATLIKTA** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): vienas ESLint perėjimas, skaičiuojama pagal ruleId, todėl ciklomatinio sudėtingumo bei didžiausio eilučių skaičiaus ir kognityvinio sudėtingumo bazinės reikšmės išlieka nepriklausomos; atskiri `check:complexity` / `check:cognitive-complexity` palikti vietiniam `--update`.
- **`/api` apsauga nuo haliucinacijų** — ✅ **ATLIKTA** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): viena `src/app/api` FS inventorizacija, openapi-routes + docs-symbols ir toliau teikia atskiras ataskaitas; atskiri patikrinimai palikti vietiniam vykdymui.
- **`check:node-runtime` vykdomas 11 užduočių** — ⚠️ **maža ROI.** Kiekviena užduotis vykdoma atskirame vykdyklės egzemplioriuje, o patikrinimas trunka <1 s; iš viso būtų sutaupyta ~10 s, tačiau būtų prarasta nebrangi kiekvienos užduoties apsauga. Neverta dėl to daryti pakeitimų.
- **`typecheck:noimplicit:core` CI lint užduotyje** — ✅ **pašalinta iš lint užduoties** (buvo rekomendacinio pobūdžio `continue-on-error`); blokuojamą tipų paviršių sudaro `typecheck:core` + `check:type-coverage`. Vietinis scenarijus paliktas.

### Perjungti / nuspręsti (operatoriaus politika)

- `check:openapi-security-tiers` (rekomendacinio pobūdžio) — ❌ **NEGALIMA paprastai perjungti.** Jis baigiamas su 0 kodu, tačiau įspėja, kad keliems `traffic-inspector` maršrutams, esantiems `LOCAL_ONLY_API_PREFIXES`, trūksta anotacijos `x-loopback-only: true`. Prieš įjungiant privalomą vykdymą pirmiausia reikia pridėti šias anotacijas į `openapi.yaml`.
- `typecheck:noimplicit:core` (rekomendacinio pobūdžio) — didžiąja dalimi pakeistas blokuojančiu reketiniu `check:type-coverage` patikrinimu. Paversti reketiniu patikrinimu arba pašalinti perteklinį antrą `tsc` perėjimą.
- `test:vitest:ui` (dabar **blokuojantis**) — ankstesnės klaidos aiškiai neįtrauktos faile `vitest.config.ts`, naudojant `// #8618` sekimo komentarus; dėl naujų klaidų užduotis tampa nesėkminga.
- `check:secrets` (gitleaks, blokuojantis reketinis patikrinimas, užfiksuotas ties 3 dokumentuotais klaidingai teigiamais rezultatais) — įtraukti tuos 3 atvejus į leidžiamųjų sąrašą, kad būtų pasiektas 0, arba pakeisti į rekomendacinio pobūdžio patikrinimą. Persidengia su GitHub savuoju paslapčių nuskaitymu + `check:public-creds`.
- `check:pr-evidence` (blokuojantis, ieško atitikmenų PR turinio tekste) — didelė klaidingai teigiamų rezultatų rizika; jį pašalinus susilpnėtų griežtos taisyklės Nr. 18 vykdymo užtikrinimas, todėl tai yra tikras politikos sprendimas.
- `semgrep` (atskiras rekomendacinio pobūdžio patikrinimas) — OWASP kategorijose persidengia su CodeQL; susieti jo bazinę reikšmę su reketiniu patikrinimu arba pašalinti.

---

## Susijusi dokumentacija

- Tiekimo grandinė (kilmė, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — raktų rinkinių atitikties patikra

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, užduotis `i18n-ui-coverage`).
Palygina kiekvieno `src/i18n/messages/<locale>.json` galinių raktų rinkinį su `en.json` ir patikra
nepavyksta aptikus bet kokį trūkstamą ar perteklinį galinį raktą, neatsižvelgiant į tai, kada jis
buvo pridėtas. `__MISSING__:` vietos rezervavimo žymenys laikomi esamais (jų turinį vertina
santykio patikra). Tai yra absoliutus dviejų pakeitimų skirtumais ir procentais pagrįstų patikrų
papildinys: `check-ui-keys-coverage` kiekvienai lokalei nustato 80 % apatinę ribą (trūkstant 43
raktų iš ~13 000, vis tiek rodoma 99,7 %), o `check-new-key-coverage` vertina tik tuos raktus,
kuriuos PR prideda į `en.json`. Lokalės paketas sugeneruojamas iš tos dienos, kai sukuriama jo
šaka, `en.json` ir verčiamas kelias dienas, nors bazinėje šakoje vis pridedama naujų raktų; pats
paketo PR neprideda jokio rakto, todėl abi giminingos patikros nieko nepranešė, kai 1 paketas
(#13044) buvo sujungtas devyniose lokalėse trūkstant 43 raktų, o 2 paketas (#13660) — aštuoniose
lokalėse trūkstant 10 raktų (2026-09-15). Raudoną būseną ištaisykite naudodami
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; `extra` galinis raktas
reiškia, kad jis pašalintas iš šaltinio — pašalinkite jį iš lokalės. `--warn` pateikia ataskaitą
nesukeldamas nesėkmės. `--catalog=cli` tą patį palyginimą vykdo kataloge `bin/cli/locales`
(`npm run i18n:check-keys:cli`); abu žingsniai yra užduotyje `i18n-ui-coverage`.

#### `check-new-key-coverage` — naujų i18n raktų patikra

Gimininga `check-ui-value-drift` patikra. Pastaroji aptinka atvejį, kai angliška reikšmė buvo
**perrašyta**, tačiau jos vertimai nebuvo atnaujinti; ši patikra aptinka atvejį, kai angliškas
raktas buvo **pridėtas**, tačiau kai kurios lokalės jo negavo.

`check-ui-keys-coverage` negali aptikti šios klasės problemų: ji kiekvienai lokalei nustato
procentinę apatinę ribą, o trūkstant vienuolikos raktų iš ~13 000 aprėptis vis tiek siekia 99,9 %.
Procentinė kiekvienos kalbos reikšmė negali išreikšti „ši funkcija išleista neišversta“ — naujoje
lokalėje gali atsirasti visa funkcija be jokio teksto, o skaičius visiškai nepasikeis.

Incidentas, kurį ji įamžina: 3-iajame „Orchestration Canvas“ etape vienuolika jo raktų buvo
išversti į tuo metu egzistavusias 42 lokales. Po kelių valandų ES kalbų paketas (#13044) padidino
repozitorijos lokalių skaičių iki 51, o devynios naujos lokalės (`el`, `et`, `ga`, `hr`, `lt`,
`lv`, `mt`, `sl`, `sr`) jų taip ir negavo. `deepMergeFallback` vietoje trūkstamo rakto pateikia
anglišką tekstą, todėl problema pasireiškė neišversta, o ne tuščia naudotojo sąsaja — ji buvo
reali ir dėl pačios konstrukcijos nepastebima.

Kaip ir gimininga patikra, ji **atsižvelgia į pakeitimų skirtumus**, lygindama bazinio sujungimo
taško anglų kalbos duomenis su darbiniu medžiu, todėl ankstesnės spragos lieka užfiksuotos ir
įjungiant patikrą nereikėjo jokio perkėlimo.

**`__MISSING__:<english>` žymuo šios patikros netenkina (nuo 2026-09-17).** Anksčiau tai buvo
dokumentuotas atidėjimo būdas — vykdymo metu naudojamas tinkamas angliškas tekstas — kol aštuoni
funkcijų PR 2026-09-16 pridėjo 61 raktą ir, užuot juos išvertę, į visas 65 lokales įrašė šį
žymenį: ši patikra priėmė juos visus, niekas nesustabdė PR, o leidimo šakos viršūnėje privaloma
tikrų vertimų santykio patikra nepavyko visiems (pt-BR 3,2 % > 2,5 % + 0,5). Dabar žymuo
vertinamas kaip trūkstamas vertimas. Raudoną būseną ištaisykite naudodami
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` arba
visas lokales lygiagrečiai apdorodami su `npm run i18n:translate-new-keys`
(`scripts/i18n/translate-new-keys.sh`, saugu vykdyti atsietai, atsisako pradėti be
`OMNIROUTE_TRANSLATION_*` aplinkos kintamųjų). Raktas, kuris privalo likti angliškas
(fiksuotas produkto, variklio ar vėliavėlės pavadinimas), turi būti įtrauktas į
`scripts/i18n/untranslatable-keys.json`, o ne slepiamas už žymens. `vi` visiškai draudžia
žymenis (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — atidėtų testų patikra

Failas, esantis `vitest.config.ts` sąraše `exclude`, yra nevykdomas testas, nors medį skaitančiam
asmeniui jis atrodo kaip aprėpties dalis. Už komentaro
`// #8618 — pre-existing failure; remove this exclusion when fixed` susikaupė šešiasdešimt du
failai. Problema #8618 buvo uždaryta 2026-08-11, o jos stebimas sąrašas išaugo nuo 45 iki 62
įrašų; kiekvienas naujas įrašas paveldėjo komentarą su nuoroda į uždarytą problemą. Kai sąrašas
pagaliau buvo patikrintas failas po failo (#13204), **51 iš 62 failų sėkmingai veikė su esamu
medžiu be jokių šaltinio pakeitimų**.

Patikra reikalauja, kad kiekviena išimtis, nurodanti realų failą, (a) įvardytų stebėjimo problemą
ir (b) būtų įtraukta į `config/quality/vitest-exclusions.json` su išmatuota būsena, kad naujos
išimties pridėjimas būtų peržiūrimas pakeitimas specialiame faile, o ne dar viena eilutė 60 įrašų
masyve. Ji sąmoningai pakartotinai nevykdo neįtrauktų testų — tai trunka ~10 minučių ir turėtų
būti atliekama periodinėje užduotyje; inventoriuje registruojama, kada kiekvienas testas buvo
paskutinį kartą patikrintas.
