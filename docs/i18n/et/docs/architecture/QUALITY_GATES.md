# Quality Gates Reference (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

See dokument on kõigi OmniRoute’i CI kvaliteediväravate autoriteetne viide.
See kirjeldab iga väravat, mida see valideerib, millises CI töös see käivitatakse, kas see kasutab
ratchet-lähtejoont või läbitud/läbikukutud poliitikat ning kas see blokeerib järgu või on nõuandev.

Lühikokkuvõtte ja lubatud loendi poliitika leiate faili `AGENTS.md` jaotisest „Quality Gates & Ratchets“.
Sama süsteemi kriitilise hinnangu, küpsusklassifikatsiooni ja tööriistast sõltumatu
replikatsiooniplaani leiate dokumendist
[Quality Gate Playbook](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Kontrollväravate loend ja käivitusprofiilid

### Kandidaadi vastuvõtmine

CI ja Quality Gatesi töövood väljastavad kumbki stabiilse otsuse: `Gate / CI` ja
`Gate / Quality`. Nende versioonitud vastuvõtupoliitika loetleb iga eelneva töö
kohustusliku või nõuandvana. Kohaldatav kohustuslik töö peab õnnestuma: puuduv,
tühistatud, vahele jäetud, ootel või tundmatu tulemus ei saa kinnitada olekut PASS. Kehtiv
ainult dokumentatsiooni või ainult kataloogi muudatuse klassifikatsioon võib muuta koodiraja mittekohaldatavaks;
mustand-PR ei ole aktsepteeritud kandidaat. Silt `hotfix` ei vabasta tõendite esitamisest.

Mõlemad töövood hõlmavad PR-e ja tõukeid põhi-/väljalaskeharudesse, käsitsi käivitamist ning
liitmisrühma sündmusi. Tõuke, käsitsi käivitamise ja liitmisrühma korral käivitatakse täielik valik. Forkid
ja liitmisrühmad kasutavad majutatud käitajaid tööde jaoks, mis muidu valiksid isemajutatud
käitajad; enne kasutuselevõttu tuleb kontrollida piisava majutatud võimsuse olemasolu.

Iga JSON-kviitung tuvastab väljavõetud SHA, töövoo käivituse ja katse.
CLI lükkab tagasi väljavõtte/sündmuse SHA mittevastavuse. Töövootestid seovad poliitika liikmesuse
otsusetöö `needs` loendiga, et uus või eemaldatud rada ei saaks märkamatult kaduda.
Kviitungid hõlmavad nende enda töövoogu, mitte avaldamist, juurutamist ega olemasoleva
nõuandva skanneri sisemist tööd. Mõlema kontrollnime aktiveerimine harureeglites on
eraldi haldusmuudatus; nende tööde lisamine ei kaitse iseenesest haru.

### Staatilise skannimise loend

Versioonitud npm-i aliaste loend ja staatilise skannimise liikmesus asuvad failis
`config/quality/gate-manifest.json`. Käivitage `npm run check:gate-manifest`, et valideerida
skriptinimed ja täpsed käsud faili `package.json` suhtes; lisamised, eemaldamised ja
käskude lahknevused nurjavad nii kohaliku hook'i kui ka CI muudatuste klassifitseerimise tööd.
Alias ei ole töövootöö, maatriksi eksemplar ega testjuhtum: neid arve ei tohi
esitada samaväärsetena.

Kasutage `npm run quality:scan -- --list` või `npm run quality:scan:fast -- --list`,
et valitud aliaseid ilma neid käivitamata kontrollida. Käitaja kutsub välja
npm-i sisenemispunkti, mistõttu säilib selle käituskeskkond (sh Bun seal, kus see on seadistatud).
Manifest märgib neist profiilidest väljapoole jäävad aliased eraldi käivitatavatena ning
hoolduskäsud on kirjutuskaitstud skannimisprofiilides keelatud.

Need profiilid hõlmavad ainult staatilist skannimist. Need ei sertifitseeri tooteteste,
katvust, pakendamist, väliseid kontrolle ega kandidaadi täielikku väljalaske heakskiitu.
Töövoo vastuvõtmisel kasutatakse lingitud faili `config/quality/admission-policy.json` ja
`scripts/quality/admission-verdict.mjs`. Väljalaskevaatleja profiilid jäävad eraldiseisvaks;
kontrollige nende kohaldatavaid kontrolle ja kviitungeid eraldi. Allolev tekstiline
loend on viide, mitte tõend selle kohta, et kontrollvärav tegelikult käivitati.

Skriptid asuvad kataloogides `scripts/check/` (poliitika kontrollväravad) ja `scripts/quality/` (ratchet-mootor).
CI tõeallikas on `.github/workflows/ci.yml`.

### Väljalaske-PR-i kiirtee (`quality.yml`)

`.github/workflows/quality.yml` täiendab CI-d põhi-/väljalaske-PR-ide, kaitstud harudesse
tehtavate tõugete, käsitsi käivitamise ja liitmisrühmade korral. PR-id kasutavad teepõhise filtriga kiirkontrolle. Püsivalt
keelatud dubleeriv kooste eemaldati; tegelikud kooste-, pakendamis- ja käivituskontrollid jäävad CI-sse.

| Töö                                              | Ulatus                                                                                                                                                                                                            | Blokeeriv             |
| ------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `Docs Gates (fast-path)`                         | Dokumentatsiooni-/koodi-PR-id; API dokumentatsiooni viited ja docs-all                                                                                                                                            | Jah                   |
| `Fast Quality Gates`                             | Koodi-PR-id; staatilised kontrollid, tüübikontroll, töölaua tüübikontroll, mõjutatud ühiktestid                                                                                                                   | Jah                   |
| `Forgotten sibling tests`                        | Koodi-PR-id; muudetud moodulid, mis on jälitatud staatiliste tarbijate ja võimalike sõsartestideni; barrel- ja dünaamilise impordi teed esitatakse nõuandva diagnostikana koos viidatud lubatud loendi eranditega | **Nõuandev**          |
| `Vitest (fast-path)`                             | Koodi-PR-id; kiire vitest-komplekt                                                                                                                                                                                | Jah                   |
| `Unit Tests fast-path`                           | Koodi-PR-id; neljaks killuks jaotatud ühiktestide komplekt                                                                                                                                                        | Jah                   |
| `No new ESLint warnings`                         | Koodi-PR-id; mahavaigistusi arvestav lint-kaitse                                                                                                                                                                  | Jah, sh forkide puhul |
| `Merge integrity (changelog + generated skills)` | PR-id, mis pole mustandid; muudatuste logi ja genereeritud oskuste sünkroonimine                                                                                                                                  | Jah, sh forkide puhul |

#### Unustatud sõsartestide aruanne

`npm run check:forgotten-sibling-tests` taaskasutab testimõju kaardi aluseks olevat impordilahendajat.
Iga muudetud tootmismooduli kohta esitab see deterministlikud
`muudetud moodul/sümbol -> staatiline tarbija -> võimalik sõsartest` ahelad, kui võimalik
test puudub pull request'i erinevustest. Markdowni kokkuvõte ja JSON-tulemus säilitatakse
töövoo artefaktina `forgotten-sibling-tests`, et neid enne blokeeriva kasutuselevõtu alustamist kalibreerida.

Barrel-taasekspordid ja dünaamilised impordid on ainult lahendamise diagnostika; need ei tekita kunagi
blokeerivat leidu. Läbivaadatud erandid asuvad failis
`config/quality/forgotten-sibling-allowlist.json`. Iga kirje peab nimetama tarbija ja kandidaat-
testi, esitama konkreetse põhjenduse ning viitama GitHubi probleemile või tõmbetaotlusele. Vigased kirjed
põhjustavad tõrke vaikimisi. Erandid ei saa peita kustutatud kandidaattesti ega muudatust, mis lisab `.skip`/`.todo`;
väidete nõrgendamine ja muu varjamine jäävad eraldi blokeeriva
`check:test-masking` kontrollvärava vastutusalasse.

### Töö: `lint`

Käivitatakse iga `main`-haru PR-i puhul. Tõrke korral blokeerib ühendamise.

| Skript (`npm run ...`)            | Kontrollib                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Blokeeriv                                |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| `check:node-runtime`              | Node.js-i versioon jääb toetatud vahemikku                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Jah                                      |
| `check:cycles`                    | Ringimpordid kogu kataloogis `src/` + `open-sse/` (AST-põhine, tsconfigi `paths` lahendatud). Ilma lisavalikuteta käivitamine on nõuandev ja loetleb tsüklid. `check:cycles:ratchet` (mida CI käitab) blokeerib, kui arv ületab faili `quality-baseline.json` ülempiiri `metrics.cycles` — praegu 14, `direction: down`, seega saab see ainult väheneda (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Jah (ratchet)                            |
| `check:route-validation:t06`      | Zodi skeemide olemasolu kõigil marsruutidel (6. taseme poliitika)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Jah                                      |
| `check:any-budget:t11`            | `@ts-expect-error // any` arv ei ületa eelarvet (11. taseme catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Jah                                      |
| `check:provider-consistency`      | Igal `providers.ts` failis oleval teenusepakkujal on vastav kirje failis `providerRegistry.ts` (ja vastupidi, lubatud loendi piires)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Jah                                      |
| `check:model-lifecycle`           | Kolm käsitsi hallatavat marsruutimistabelit püsivad kooskõlas repositooriumis talletatud elutsükli hetktõmmisega (#11503): `FITNESS_TABLE` (`taskFitness.ts`) ei anna skoori ühelegi käigust kõrvaldatud ID-le, mida `REGISTRY` saab marsruutida; iga `BUILT_IN_ALIASES` sihtmärk leidub registris `REGISTRY` ja puudub käigust kõrvaldatud ID-de hetktõmmisest; iga käigust kõrvaldatud ID, mis on endiselt registris `REGISTRY`, suunatakse edasi või on loetletud loendis `allowedRetiredInCatalog`; ning ükski `DEFAULT_DEGRADATION_MAP` lähte- ega sihtüksus ei ole selles hetktõmmises märgitud käigust kõrvaldatuks. See ei tõesta, et mudelit teenindab praegu toimiv ülesvooluteenus. Võrguühenduseta — võrdleb failiga `config/quality/model-lifecycle.json`, mida värskendatakse käsitsi käsuga `npm run quality:refresh-model-lifecycle` (vajab võrku; pole CI-sse ühendatud). `allowedRetiredInCatalog` on järkjärgulise vähendamise põrkmehhanism: lisa kirje ainult koos jälgimisprobleemiga. | Jah                                      |
| `check:fetch-targets`             | Iga kliendipoolses kataloogis `src/` olev `fetch("/api/...")` viitab tegelikule failile `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Jah                                      |
| `check:deps`                      | Kõik repositooriumi igas failis `package.json` olevad käsuga `npm install` installitavad sõltuvused on loendis `dependency-allowlist.json`; uued fikseerimata versiooniga või kirjaveopettuse kahtlusega paketid märgistatakse                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Jah                                      |
| `audit:deps`                      | `npm audit` (juurkataloog) — kõrge ega kriitilise tasemega turvahoiatusi pole (kattub OSV kontrolliga `check:vuln-ratchet`; vt ratsionaliseerimise tööjärge)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Jah                                      |
| `check:lockfile`                  | Faili `package-lock.json` terviklus — HTTPS-register, terviklusräsid, hosti ülekirjutused puuduvad                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Jah                                      |
| `check:licenses`                  | Tootmissõltuvuste SPDX-litsentside lubatud loend                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Jah                                      |
| `check:tracked-artifacts`         | Ei mingeid järgitavaid ehitusartefakte / hoidlasse lisatud `node_modules` sümbollinke (käivitatakse ka husky pre-commit-konksus; pre-push on tahtlikult kerge — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Jah                                      |
| `check:ai-attribution`            | PR-i commit'ides, pealkirjas ega sisus ei tohi olla AI/boti `Co-Authored-By` järelrida ega AI-ga genereerimise jalust — range reegel #16 (`quality.yml` kiirkontrollide tsüklis PR→`release/**` jaoks — loeb sündmuse andmestikku, väljaspool PR-e ei tee midagi — ning ainult PR-idele mõeldud sammuna `ci.yml` lintimises PR→`main` jaoks; samuti husky `commit-msg` konksus; inimestest kaasautorid on lubatud; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `check:vitest-exclusions`         | Iga Vitesti välistus nimetab jälgimisülesande ja esineb failis `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Jah                                      |
| `check:file-size`                 | Ükski lähtekoodifail ei ületa faililaiendipõhist ülempiiri (põrkmehhanism: fikseeritud suurusega failid loendis `frozen`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Jah                                      |
| `check:error-helper`              | Täiturite/käitlejate veavastused kasutavad funktsiooni `buildErrorBody()` / `sanitizeErrorMessage()` (range reegel #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Jah                                      |
| `check:migration-numbering`       | Migratsiooni SQL-failid on järjestikku nummerdatud, ilma lünkade või duplikaatideta                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Jah                                      |
| `check:public-creds`              | Väljaspool faili `publicCreds.ts` ei ole literaalseid OAuthi `client_id`/`client_secret` väärtusi ega Firebase Webi võtmeid (range reegel nr 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Jah                                      |
| `check:db-rules`                  | Väljaspool kataloogi `src/lib/db/` mooduleid ei ole töötlemata SQL-i; failist `localDb.ts` ei tehta koondimporti (ranged reeglid nr 2 / nr 5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Jah                                      |
| `check:known-symbols`             | Teenusepakkujate täiturid, marsruutimisstrateegiad ja tõlkijad, mis on registreeritud nende väljastustabelites, vastavad kettal olevatele failidele — orvuks jäänud või deklareerimata sümboleid pole                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Jah                                      |
| `check:route-guard-membership`    | Iga alamprotsessi käivitav marsruut on funktsiooni `isLocalOnlyPath()` alusel klassifitseeritud (ranged reeglid nr 15 / nr 17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Jah                                      |
| `check:test-discovery`            | Iga repos olev fail `*.test.ts` / `*.spec.ts` kaasatakse vähemalt ühe testikäitaja poolt (põrkmehhanism: orbfailide loend failis `test-discovery-baseline.json` võib ainult kahaneda)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Jah                                      |
| `check:agent-skills-sync`         | Loodud agendioskuste artefaktid vastavad nende lähtekataloogile (lahknevusi pole)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `check:provider-asset-provenance` | Teenusepakkujate logodel/varadel on registreeritud päritolukirje                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `lint:json`                       | JSON-i konfiguratsioonifailid on parsitavad ja vastavad hoidla lintimisreeglitele                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `typecheck:core`                  | TypeScripti kompileerimine vigadeta (ainult nõuandvad hoiatused)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Jah                                      |
| `typecheck:noimplicit:core`       | Range `noImplicitAny` — tulevikku suunatud; paljud olemasolevad väljakutsed vajavad endiselt annotatsioone                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | **Nõuandev** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc`, mille ulatus on piiratud kataloogiga `src/app/(dashboard)/**` (#7033) — `typecheck:core`-i kureeritud 27 faili lubatud loend ei sisalda ühtegi dashboardi TSX-faili ning `next build` ei tee neile samuti kunagi tüübikontrolli (`next.config.mjs` määrab `ignoreBuildErrors: true`), mistõttu jäid sealsed orvuks jäänud identifikaatorite regressioonid (#6625/#6909) CI jaoks nähtamatuks. Erinevusi võrreldakse fikseeritud faili- ja TS-koodipõhise vigade arvu lähteolukorraga (`config/quality/dashboard-typecheck-baseline.json`, sama aegunud kirjete jõustamise muster nagu `check:known-symbols`-is) — kontroll ebaõnnestub ainult uute vigade korral, mis ületavad lähteolukorras määratud arvu; kui olemasolev viga parandatakse, vähendage väärtust käsuga `--update`.                                                                                                                                                                                                                  | Jah                                      |

### Töö: `quality-gate`

Käivitub pärast `test-coverage`-it. Ebaõnnestumise korral blokeerib ühendamise.

| Skript                       | Kontrollib                                                                                                                                                                              | Blokeeriv                    |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `quality:collect`            | Väljastab faili `quality-metrics.json` (ESLinti hoiatuste arv, ühendatud osaaruande põhjal arvutatud koodikate)                                                                         | Jah (ratchet’i eelnev etapp) |
| `quality:ratchet`            | Ükski faili `quality-baseline.json` mõõdik pole halvenenud (ESLinti hoiatusi ≤ lähtetase; koodikate ≥ lähtetase)                                                                        | Jah                          |
| `check:duplication`          | Koodi dubleerimine (jscpd@4) ei ületa failis `quality-baseline.json` määratud lähtetaset                                                                                                | Jah                          |
| `check:complexity`           | Failitaseme tsüklomaatiline keerukus ei ületa ülempiiri (ESLinti põhireeglid `complexity` + `max-lines-per-function`)                                                                   | Jah                          |
| `check:cognitive-complexity` | Kognitiivse keerukuse ratchet (`eslint-plugin-sonarjs`) — eraldi ESLinti läbimine; CI käitab mõlemat ühendatuna ühe etapina `check:complexity-ratchets`                                 | Jah                          |
| `check:dead-code`            | Kasutamata eksporditud elementide / failide ratchet (knip) ei halvene võrreldes lähtetasemega                                                                                           | Jah                          |
| `check:compression-budget`   | Tihendamise võrdlustesti eelarve — mootoripõhised tokenisäästu alampiirid ei tohi halveneda                                                                                             | Jah                          |
| `check:type-coverage`        | Tüübitud koodi osakaalu ratchet (`type-coverage`) ei halvene; asendab suures osas kontrolli `typecheck:noimplicit:core`                                                                 | Jah                          |
| `check:codeql-ratchet`       | Avatud CodeQL-i hoiatuste arv ei suurene (loeb käsuga `gh api`; tokeni puudumisel jäetakse sujuvalt vahele) — värskendamissagedus ja käsitsi käivitamine: vt allpool „CodeQL-i ratchet” | Jah                          |

### Töö: `quality-extended`

Kogu töö on nõuandev (`continue-on-error: true`). npm-il põhinevad ratchet’id käivitatakse
tegelikult; välised skannerid installitakse käsuga `gh release download` ja jätavad kontrolli ise vahele (väljumiskood 0),
kui kahendfail endiselt puudub.

| Skript                   | Kontrollib                                                                                                                                                                                                                                       | Blokeeriv                                                      |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| `check:circular-deps`    | Ringikujulisi sõltuvusi pole (dpdm)                                                                                                                                                                                                              | **Nõuandev**                                                   |
| `check:bundle-size`      | Paketi suurus ei ületa ülempiiri                                                                                                                                                                                                                 | **Nõuandev**                                                   |
| `check:secrets`          | Saladuste skannimine (gitleaks) — jäetakse vahele, kui kahendfail puudub                                                                                                                                                                         | **Nõuandev**                                                   |
| `check:vuln-ratchet`     | Sõltuvuste haavatavused (osv-scanner) ei halvene — jäetakse vahele, kui kahendfail puudub                                                                                                                                                        | **Nõuandev**                                                   |
| `check:workflows`        | Töövoogude lintimine (actionlint + zizmor); puuduvad või katkised skannerid, vigased aruanded või puuduv ratchet’i lähtetase põhjustavad oleku INCOMPLETE. Kehtivate leidude puhul järgitakse valitud ranget, nõuandvat või ratchet’i poliitikat | Käivitamine on kohustuslik; zizmor’i ratchet on CI-s blokeeriv |
| `check:openapi-breaking` | Avaliku API lepingu (`openapi.yaml`) murrangulised muudatused võrreldes baasharuga (oasdiff) — väljastab `openapiBreaking=N`; jäetakse vahele, kui oasdiff puudub või baasspetsifikatsiooni ei saa lahendada                                     | **Nõuandev**                                                   |

### Töö: `docs-sync-strict`

Käivitatakse iga `main`-harule suunatud PR-i puhul. Tõrke korral blokeerib ühendamise.

| Skript                         | Kontrollib                                                                                                                                                                            | Blokeeriv                    |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| `check:docs-all`               | Metavärav, mis käitab alltoodud 6 alamväravat järjest                                                                                                                                 | Jah                          |
| ↳ `check:docs-sync`            | CHANGELOG-i / OpenAPI / llm.txt-i versioonide kooskõla                                                                                                                                | Jah                          |
| ↳ `check:docs-counts`          | Proosas esitatud arvud (pakkujate arv, migratsioonide arv jne) jäävad tegelike arvude põrkmehhanismiga määratud vahemikku                                                             | Jah                          |
| ↳ `check:env-doc-sync`         | Iga keskkonnamuutuja failis `.env.example` on dokumentatsiooni tabelis dokumenteeritud ja vastupidi                                                                                   | Jah                          |
| ↳ `check:deprecated-versions`  | Dokumentatsioonis puuduvad aegunud versioonistringid                                                                                                                                  | Jah                          |
| ↳ `check:doc-links`            | Dokumentatsiooni sisemised markdown-lingid viitavad olemasolevatele failidele (`[text]`/`(path)` vormingus)                                                                           | Jah                          |
| ↳ `check:fabricated-docs`      | Dokumentatsioonis nimetatud marsruudid, keskkonnamuutujad, CLI-käsud, konksude nimed ja failiteed on koodibaasis olemas. Range värav lipuga `--strict`; ilma liputa lubatakse tõrget. | Jah (CI-s lipuga `--strict`) |
| `check:cli-i18n`               | CLI-käskude stringid on olemas kõigis i18n-i lokaadifailides                                                                                                                          | Jah                          |
| `check:openapi-coverage`       | OpenAPI spetsifikatsioon katab vähemalt põrkmehhanismiga määratud minimaalse arvu tegelikke marsruute                                                                                 | Jah                          |
| `check:openapi-security-tiers` | Turbetasemete annotatsioonid failis `openapi.yaml` on kooskõlas faili `routeGuard.ts` klassifikatsioonidega                                                                           | **Soovituslik**              |
| `check:openapi-routes`         | Iga faili `openapi.yaml` tee viitab olemasolevale failile `route.ts` (hallutsinatsioonivastane kontroll)                                                                              | Jah                          |
| `check:docs-symbols`           | Iga viide kujul `/api/...` failides `docs/**/*.md` viitab olemasolevale failile `route.ts` (hallutsinatsioonivastane kontroll)                                                        | Jah                          |
| `i18n translation drift`       | Tõlkimata võtmed i18n-i lokaadifailides — ainult hoiatus                                                                                                                              | **Soovituslik**              |

### Töö: `i18n-ui-coverage`

| Skript                                  | Kontrollib                                                                                                                                                                                                                     | Blokeeriv       |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------- |
| `check-ui-keys-coverage` (tekstisisene) | Kasutajaliidese i18n-võtmete katvus on ≥ 65%                                                                                                                                                                                   | Jah             |
| `check-ui-value-drift` (tekstisisene)   | Ümber kirjutatud ingliskeelne **väärtus** ei jäta maha aegunud tõlget                                                                                                                                                          | Jah             |
| `check-new-key-coverage` (tekstisisene) | **Uus** ingliskeelne võti on tõlgitud igas lokaadis — marker `__MISSING__:` lükatakse tagasi                                                                                                                                   | Jah             |
| `check-translation-ratio`               | Tegelike tõlgete suhe lokaadi kohta (ingliskeelsega identsed / kohatäite / puuduvad lõppvõtmed väljaspool lubatute loendit) ei tohi ületada faili `config/quality/i18n-translation-baseline.json` väärtust koos lubatud varuga | **Soovituslik** |

Vajab sätet `fetch-depth: 0` — väärtuste triivi värav võrdleb faili `en.json` ühendamise lähtepunktiga.

#### `check-ui-value-drift` — aegunud tõlgete värav

Tuvastab ühe i18n-i regressiooni, mida teised väravad struktuurselt ei näe: ingliskeelne väärtus
kirjutatakse ümber, kuid _eelmisest_ ingliskeelsest tekstist tuletatud tõlked jäävad alles, mistõttu
muukeelsed kasutajad loevad jätkuvalt enesekindlas sõnastuses, kuid nüüdseks valet teksti.

See jõudis päriselt väljalaskesse. `oauthModal.googleOAuthWarning` kirjutati ümber, kui lisati
Antigravity sisselogimisabiline (#5203); **39 lokaati 43-st** säilitasid teksti, mis käskis operaatoritel
„kopeerida täielik URL ja kleepida see allapoole” — selle pakkuja puhul ei saa seda voogu lõpule viia.
Probleemi ei märgatud enne #8463, sest:

- `sync-ui-keys` lisab tagantjärele ainult **puuduvad** võtmed, mitte kunagi **aegunud** võtmeid;
- `check-ui-keys-coverage` loendab võtme _olemasolu_, seega läheb aegunud tõlge arvesse kaetuna;
- `check-translation-drift` jälgib dokumentatsiooni peegelkoopiaid asukohas `docs/i18n/<locale>/**.md` —
  see ei loe kunagi faile `src/i18n/messages/*.json`. Töö `docs-sync-strict` blokeerib alates
  2026-09 uuesti sünkroonimisest: põhiteabe dokumendi muutmisel käita `npm run i18n:run -- --files=<doc>` (jaotisepõhine, kiire).

**Muudatuste erinevust arvestav, mitte etalonil põhinev.** See võrdleb liitmislähte `en.json`-i
tööpuuga; iga võtme puhul, mille ingliskeelne väärtus muutus, loetakse aegunuks kõik lokaadid,
kus on endiselt muutmata tõlge. See **külmutab tahtlikult olemasoleva võla** — muudatuste
erinevusest ei saa tuvastada, millisest varasemast ingliskeelsest tekstist ammu olemas olnud
tõlge pärineb, seega kontroll hindab ainult seda, mida praegune muudatus puudutab. Alternatiiv
(võtmepõhine räsi-etalon) nõuaks ligikaudu 600 KB suurust genereeritud faili, mis oleks
suurimast olemasolevast etalonist kolm korda suurem ja muutuks iga i18n-i PR-iga.

Kontrolli läbimiseks on kaks võimalust:

1. värskendada mõjutatud tõlkeid või
2. määrata nende väärtuseks `__MISSING__:<new english>` — käituskeskkond väljastab seejärel
   parandatud ingliskeelse teksti (`src/i18n/request.ts::deepMergeFallback`, #7258) ja võti
   lisatakse tõlkejärjekorda.

Kui stringi **tähendus** muutus, eelista **võtme ümbernimetamist**: uus võti ei saa pärida
aegunud tõlget. Seda mustrit kasutati muudatuses #8463.

```bash
npm run i18n:check-value-drift          # range (mida CI käitab)
npm run i18n:check-value-drift:warn     # ainult aruanne
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Kui aluskataloogi ei saa lugeda (pinnapealne kloon ilma alusviiteta), lõpetab olekukoodiga 0
ja väljundiga `SKIP reason=base-unresolved`, järgides `check-openapi-breaking` käitumist.

### Töö: `i18n`

Täielik i18n-i valideerimismaatriks (üks töö lokaadi kohta). Kogu töö on nõuandev.

| Skript                          | Valideerib                      | Blokeeriv                                               |
| ------------------------------- | ------------------------------- | ------------------------------------------------------- |
| `validate_translation.py quick` | Tõlke täielikkust lokaadi kaupa | **Nõuandev** (`continue-on-error: true` kogu töö puhul) |

### Töö: `pr-test-policy`

Käivitatakse ainult tõmbetaotluste puhul.

| Skript                 | Valideerib                                                                                                                                     | Blokeeriv |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PR-id, mis muudavad tootmiskoodi kaustades `src/`, `open-sse/` või `bin/`, peavad lisama või uuendama teste (range reegel nr 8)                | Jah       |
| `check:test-masking`   | Muudetud testifailid ei vähenda kontrollväidete netoarvu ega lisa tautoloogiaid `assert.ok(true)`                                              | Jah       |
| `check:pr-evidence`    | PR-i kirjeldus viitab muudatuse testi-/VPS-tõenditele (automatiseerib range reegli nr 18, otsides vasteid PR-i tekstist — habras, vt tööjärge) | Jah       |

### Töö: `test-vitest`

Käivitatakse pärast tööd `build`. Ebaõnnestumise korral blokeerib liitmise.

| Testikogum       | Valideerib                                                             | Blokeeriv                                                                                                         |
| ---------------- | ---------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP-server (110 tööriista), autoCombo, vahemälu — vitesti testikäitaja | Jah                                                                                                               |
| `test:vitest:ui` | Kasutajaliidese komponenditestid — vitesti testikäitaja                | **Blokeeriv** — olemasolevad tõrked on failis `vitest.config.ts` sõnaselgelt välistatud; uued tõrked nurjavad töö |

### Öised töövood (ajakava alusel, nõuandvad)

Need käivitatakse cron-ajakava alusel (ja sündmusega `workflow_dispatch`), mitte kunagi PR-ide puhul. Kõik on nõuandvad.

| Töövoog                | Valideerib                                                                                                                                                                                | Blokeeriv    |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `nightly-property`     | fast-checki omaduspõhised testid juhusliku seemne ja suure käivituskordade arvuga                                                                                                         | **Nõuandev** |
| `nightly-resilience`   | kuhjamälu kasvu kontroll, kaosepõhine tõrgete sisestamine, k6 koormus-/kestustestid                                                                                                       | **Nõuandev** |
| `nightly-llm-security` | promptfoo sisestusrünnete kaitse (blokeerimisrežiim) + garaki sondid (jäetakse teenusepakkuja saladuse puudumisel vahele)                                                                 | **Nõuandev** |
| `nightly-schemathesis` | OpenAPI lepingu hägustestimine (schemathesis) töötava OmniRoute'i vastu, kasutades faili `docs/openapi.yaml` — toob esile spetsifikatsioonirikkumised / töötlemata 500-vead (etapp 8 B.4) | **Nõuandev** |
| `nightly-mutation`     | Strykeri mutatsioonitestimise skoor kiirete ühiktestide harus — ellujäänud mutandid toovad esile nõrgad kontrollväited                                                                    | **Nõuandev** |
| `nightly-compat`       | Node'i mootori ühilduvusmaatriks toetatud `engines.node` vahemikes                                                                                                                        | **Nõuandev** |

---

## Kiirusefaas (2026-08-30 → v4.0 LTS): kõiki lähtetasemeid leevendati 20%

Omaniku otsus (2026-08-30): kuni v4.0 modulariseerimiseni on väljalaskekiirus olulisem
kui tehnilise võla piiri hoidmine. Kõiki **arvulisi** kontrollmehhanismide lähtetasemeid leevendati ühe
auditeeritava korraga 20% ning faas on deklareeritud failis `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Mis muutus                                                                                                                                                                                                   | Kus                                                                                                    |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — väiksem-on-parem loendurid ×1.2, suurem-on-parem protsendid ÷1.2 (katvuse alampiir 60 säilitati, `eslintErrors` jääb väärtusele 0, `eslintWarnings` 0 → 20% külmutatud eiramiste arvust) | `quality-baseline.json` (`_relax_velocity_2026_08_30` märkus loetleb kõik väärtused enne → pärast)     |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                             | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, iga `frozen[*]` / `testFrozen[*]` rea piir ×1.2                                                                                                                                            | `file-size-baseline.json`                                                                              |
| failipõhised / TS-koodi põhised loendurid ×1.2                                                                                                                                                               | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                          | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` muutub soovituslikuks, kui `_policy.requireTighten === false`                                                                                                                            | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| öine `bank-ratchet-shrinks` peatatakse (see talletaks mõõdetud vähenemise ja tühistaks varuruumi)                                                                                                            | `.github/workflows/nightly-release-green.yml`                                                          |

Lubatud erandite loendid (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **ei ole** eelarved ja neid ei muudetud. Läbitud/ebaõnnestunud olekuga poliitikaväravad (saladused, SQL-i reeglid,
dokumentatsiooni/keskkonna leping, i18n-i võrdsus, ühiktestid) ei muutunud — ebaõnnestunud test on endiselt ebaõnnestunud test.

**Tööriistad**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — ühekordne
  leevendamine (`scripts/quality/relax-baselines.mjs`); keeldub sama märkusega teist korda käivitumast.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  mõõdab iga arvulist väravat samal viisil nagu CI ja kuvab iga värava allesjäänud varuruumi
  (`scripts/quality/baseline-headroom.mjs`). Öine `baseline-headroom` töö postitab
  tabeli aktiivsesse probleemikirjesse **📈 Lähtetaseme varuruum (kiirusefaas)** ja lisab sildi
  `headroom-alert`, kui mõni värav on oma piirist kuni 10% kaugusel või on selle juba ületanud. See probleemikirje
  on varajane hoiatus: päevadega täituv eelarve tähendab, et leevenduse kasutavad ära
  mõned PR-id, mitte kogu meeskond — vaadake probleemse värava `_rebaseline_*` märkusi.

**Uue koodi režiim (Clean-as-You-Code) — alates 2026-08-30, ainult PR-i kiirtee**

`pull_request` sündmuste korral edastab `quality.yml` suvandi `--base-ref <PR-i baasi SHA>` käskudele `check:file-size`,
`check:complexity-ratchets` ja `check:dead-code`. Selles režiimis võrdleb värav HEAD-i
ühendamisbaasiga **ainult PR-i muudetud failide ulatuses** (`scripts/check/newCodeMode.mjs`:
ühendamisbaas materialiseeritakse ajutises `git worktree` töökataloogis, ESLint/knip käivitatakse seal ja HEAD-il ning
failipõhiseid loendureid võrreldakse erinevuste põhjal):

- **blokeeriv** — PR lisas muudetud failidesse tsüklomaatilise/kognitiivse keerukuse rikkumisi või kasutamata eksporditud liikmeid
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` logis);
- **soovituslik** — globaalne koguarv võrreldes külmutatud lähtetasemega. Päritud kõrvalekalle ei muuda
  asjassepuutumatut PR-i kunagi punaseks; kõrvalekalle külmutatakse väljalaske kooskõlastamisel uuesti ja seda jälgib varuruumi töö.

`workflow_dispatch` käivitustel, väljalaske rohelise oleku kontrollil ja öisel varuruumi tööl puudub PR-i baas
ning need kasutavad jätkuvalt absoluutset (globaalset) võrdlust. Katvus, dubleerimine ja tüübikatvus jäävad
praegu globaalseks (nende tööriistad ei loo failipõhist erinevust soodsalt) — need on sama käsitluse kandidaadid.

**Faasi lõpetamine versioonis v4.0 (LTS = varasemast rangem, mitte „tagasi normaalsusesse”)**

1. Puhta `release/v4.0.0` tipu peal käivita tulemuse jäädvustamiseks `npm run quality:headroom --json`, seejärel
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update` ja iga tüübikontrolli lüüsi
   `--update` — iga lähtetase langeb mõõdetud väärtuseni.
2. Kustuta failist `quality-baseline.json` kirje `_policy` (aktiveerib uuesti `--require-tighten` ja igaöise
   varu kogumise), taasta failis `check-openapi-coverage.mjs` väärtus `THRESHOLD = 36` (või suurem).
3. Karmista mõõdetud väärtustest enam seal, kus modulariseerimine end ära tasus: failisuuruse `cap` tagasi väärtusele 1000
   (või 800), katvuse alampiirid +5, surnud ekspordid modulariseeritud pakettides 0.

## Ratchet’i baastase (`quality-baseline.json`)

Ratchet’i mootor (`scripts/quality/check-quality-ratchet.mjs`) loeb faili `quality-baseline.json`
ja võrdleb seda värskelt kogutud failiga `quality-metrics.json`. Iga mõõdik, mis halveneb
rohkem kui selle epsilon lubab, põhjustab järgu nurjumise.

Praegu jälgitavad mõõdikud:

| Mõõdik                | Suund  | Tähendus                                |
| --------------------- | ------ | --------------------------------------- |
| `eslintWarnings`      | `down` | ESLinti hoiatuste arv ei tohi suureneda |
| `coverage.statements` | `up`   | Lausete katvus ei tohi väheneda         |
| `coverage.lines`      | `up`   | Ridade katvus ei tohi väheneda          |
| `coverage.functions`  | `up`   | Funktsioonide katvus ei tohi väheneda   |
| `coverage.branches`   | `up`   | Harude katvus ei tohi väheneda          |

Baastaseme värskendamiseks pärast tegelikku paranemist tehke järgmist:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Lipp `--update` kirjutab praegu mõõdetud väärtused faili `quality-baseline.json`.
Kommiteerige see fail koos muudatusega, mis mõõdikut parandas. PR, mis parandab
mõõdikut ilma baastaset värskendamata, tuvastatakse lipuga `--require-tighten` (etapp 6A.5,
rakendamine on ootel).

### CodeQL-i ratchet: värskendamissagedus ja käsitsi käivitamine

`check:codeql-ratchet` loeb **hoidla olekut, mida värskendatakse ajakava alusel — mitte iga PR-i korral.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` annab tulemuseks
`state: configured`, `schedule: weekly`: see on GitHubi vaikeseadistuse kontroll, mitte iga tõuke
korral tehtav analüüs. Tagajärg: pärast hoiatusi PARANDAVA PR-i mestimist loeb ratchet
endiselt vana, suuremat arvu kuni järgmise ajastatud kontrolli käivitumiseni — seega teatab see
halvenemisest iga avatud PR-i puhul, sealhulgas parandava PR-i enda järelmuudatuste puhul, kuni kontroll järele jõuab.

**Käsitsi värskendamine**: `gh workflow run codeql.yml --ref release/vX.Y.Z` käivitab
analüüsi uuesti ja avaldab hoiatused mõne minuti jooksul uuesti. Lugege esmalt faili `.github/workflows/codeql.yml`
— selle päis selgitab, et see on ainult `workflow_dispatch`-põhine, **sest see on vastuolus
GitHubi „vaikeseadistusega“** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Käivitajate `push`/`pull_request`/
`schedule` taastamine nõuab esmalt **omaniku toimingut**: Settings → Code security →
CodeQL: Default → Advanced. Ärge lisage käivitajat `schedule:` ilma seda ümberlülitust tegemata — see
tekitab ainult nurjunud käivitusi.

**Pärast arvu vähenemist karmistage baastaset** — `node scripts/check/check-codeql-ratchet.mjs
--update` kirjutab uue mõõdetud arvu faili `quality-baseline.json` →
`metrics.codeqlAlerts.value`, et ratchet ei lubaks vaikimisi halvenemist tagasi
vana ülempiirini. Läbitöötatud näide (2026-09-02/03): PR #12502 parandas 7 tegelikku hoiatust
(13 → 6 mõõdetud avatud hoiatust); PR #12530 karmistas fikseeritud baastaseme 11 → 6, et see vastaks tulemusele;
ülejäänud 6 märgiti seejärel iga hoiatuse kohta esitatud põhjendusega lahendatuks, kuni avatuks jäi 0 hoiatust.

**Hoiatuste lahendatuks märkimise otsustab operaator (range reegel #14)** — ärge märkige CodeQL-i hoiatust
kunagi lahendatuks ilma tehnilist põhjendust lahendatuks märkimise kommentaari lisamata: `won't fix`
ülesvooluprotokolli nõude korral, `used in tests` testifixtuuri korral, `false positive`
sellise puhastaja korral, mida CodeQL ei suuda tuvastada (pretsedent: `docs/security/ERROR_SANITIZATION.md`).

---

## Testide korduskatsete poliitika (WS5.4, v3.8.49)

Korduskatseid hallatakse iga käitaja kohta eraldi, mitte kunagi üldise lausreeglina — üldine korduskatse muudab tegelikud regressioonid nähtamatuteks ebastabiilsusteks:

| Käitaja          | Poliitika                                                                                                                                            | Põhjus                                                                                                                                   |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` ainult CI-s koos seadega `trace: on-first-retry`                                                                                        | Brauseri/võrgu ajastus on tõepoolest mittedeterministlik; üks korduskatse koos jäljega muudab ebastabiilsuse diagnoositavaks artefaktiks |
| Vitest           | EI OLE üldist korduskatset. Tõendatult ebastabiilsele testile määratakse selgesõnaline testipõhine korduskatse (nähtav diffis, vaadatakse PR-is üle) | Hoiab karantiiniloendi repos, mitte kunagi läbipaistmatuna                                                                               |
| node:test (unit) | MITTE KUNAGI korduskatset                                                                                                                            | Ebastabiilne üksustest on testi viga — paranda see, ära lihtsalt käivita uuesti                                                          |

Siht-SLO-d pärast ebastabiilsuse telemeetria valmimist (WS5.2/5.3): <1% ebastabiilsuse määr testi kohta
(„paranda kohe” lävend), ≥95% läbimismäär konveieri kohta. Valdkonna võrdlusväärtused —
kalibreerida ümber meie enda mõõtmiste põhjal.

## Väljalasketaseme põrkmehhanismi nihe (WS5.5, v3.8.49)

Kui põrkmehhanism (faili suurus, keerukus, eslint-i hoiatused) halveneb PUHTA väljalaskeharu
tipus — st ühendamiste KOMBINATSIOON põhjustas regressiooni ja ükski PR eraldi ei taasesita
regressiooni oma harus — vastutab paranduse eest **üks kord väljalaskeharus väljalaskejuht**:
eelistada eraldamist/refaktoreerimist; lähtetaseme uuendamine on lubatud ainult koos dokumenteeritud
põhjenduskirjega. Ära kunagi lükka kombinatsioonist tulenevat nihet kaastöötaja PR-i kanda ega
uuenda lähtetaset iga PR-i kohta (see peidab tegelikud regressioonid). Esmalt erista põhjus:
taasesita ebaõnnestumine puhta tipu põhjal prooviks loodud worktree-s, enne kui eeldad, et selle põhjustas sinu PR.

## Põrkmehhanismi piirmäärade langetamise talletamine — allapoole liikumine (#8584)

Põrkmehhanism on ainult pooleldi automaatne ja automatiseeritud on vale pool. Piirmäära
**tõstmine** on käsitsi tehtav JSON-i muudatus, mis võtab kümme sekundit ja on kiireim viis
ebaõnnestunud PR-i blokeeringust vabastamiseks. Piirmäära **langetamiseks** peab keegi käivitama
`--update` ja tulemuse commit'ima — ning kuni töö `bank-ratchet-shrinks` lisamiseni ei käivitanud
seda ükski töövoog. Mõõdetud tagajärg (2026-07-25): 18 fikseeritud faili olid juba uute failide
800-realise piirmäära juures või sellest allpool, halvim neist 132× (`src/shared/validation/schemas.ts`,
19 rida, kuid piirmäär 2,523); keerukuse ülempiir liikus umbes 37 lähtetaseme uuendamise märkme jooksul
`1794 → 2169`, kusjuures toimus täpselt üks langus (−1); ning „kitsenda järgmises tsüklis käsuga
`--update`” kirjutati 31 korda ja järgiti ühe korra. Piirmäär, mis püsib kauem kui selle tinginud
kood, muudab iga lõpetatud osadeks jaotamise vaikimisi kasvuruumiks järgmisele faili muutjale.

`nightly-release-green.yml` → töö **`bank-ratchet-shrinks`** sulgeb selle tsükli:

|            |                                                                                                                            |
| ---------- | -------------------------------------------------------------------------------------------------------------------------- |
| Käivitub   | `schedule` (3× päevas) + `workflow_dispatch` — teadlikult **mitte** `push`                                                 |
| Mõõdab     | kõrgeimat `release/vX.Y.Z`, kasutades sama resolutsiooni ja sisestuskaitset nagu `release-green`                           |
| Kirjutab   | `check:file-size --update` ja `check:complexity-ratchets --update` (mõlemad saavad konstruktsiooni järgi ainult vähendada) |
| Kontrollib | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                                   |
| Tarnib     | ühe alati ajakohase PR-i väljalaskeharu vastu — sunduuendatakse, rämpsu ei tekitata                                        |

Talletamine toimub paketi kaupa, mitte iga push'i järel, sest sellel pole latentsusnõuet
(8 tunni jooksul talletatud langus on piisav), samas kui iga ühendamise järel käivitamine
ehitaks ühendamiskampaaniate ajal PR-i haru korduvalt ümber ja teeks iga kord täieliku ESLint-i
läbivaatuse. Tuvastamine jääb push'i peale (`release-green`); ainult talletamine toimub paketi kaupa.

### Ohutuse kontrollija

Töö kirjutab lähtetasemeid järelevalveta, mistõttu muudab selle vastuvõetavaks
`verify-ratchet-bank.mjs`. See võrdleb `--update`-järgset puud `HEAD`-iga ja **katkestab töö
enne ühegi commit'i loomist** — PR-i avamata — kui iga muudatus ei ole üks järgmistest:

- `frozen` / `testFrozen` numbriline kirje on **langetatud** või **eemaldatud**
- `complexity-baseline.json` → `count` on **langetatud**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` on **langetatud**

Kõik muu ebaõnnestub: arvu tõstmine, kirje lisamine, `cap`/`testCap` muutmine või
`_rebaseline_*` märkme kustutamine/ümberkirjutamine (need märkmed on auditijälg selle kohta,
miks iga ülempiir eksisteerib, ning neid hoitakse failikirjetega samas objektis `frozen`).
Robot, mis võiks piirmäära tõsta, oleks praegusest olukorrast selgelt halvem. Regressioonikaitse:
`tests/unit/verify-ratchet-bank.test.ts`.

Töö ei tee kunagi push'i harusse `release/*` — PR-i ühendab inimene, seega ei saa vigane mõõtmine
ilma ülevaatuseta harusse jõuda.

## Lubatud loendi poliitika

Iga kontroll, mis ei saa olemasolevate rikkumiste tõttu ebaõnnestuda, kasutab fikseeritud lubatud loendit
(nt `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Poliitika on järgmine:

**Parandage algpõhjus; kasutage lubatud loendit ainult siis, kui rikkumine on juba olemas ja
seda ei saa samas PR-is parandada.**

Kirje lisamisel lubatud loendisse:

1. Lisage kommentaar koos põhjendusega.
2. Viidake jälgimisülesandele (nt `// #3498 — 2. etapi funktsioon, pole veel rakendatud`).
3. Eemaldage kirje samas PR-is, mis rikkumise parandab — aegunud kirje, mis enam
   aktiivset rikkumist ei eira, on ise viga (pärast rakendamist nurjab 6A.3 aegunud jõustamise kontroll
   üksiku lubatud loendi kirje korral kontrollvärava läbimise).

**Ärge** lisage lubatud loendisse kirjeid selleks, et testid kiiremini läbiksid. Roheline kontrollvärav koos kasvava
lubatud loendiga loob petliku kvaliteeditunde.

### Kui kontrollvärav teie PR-is ebaõnnestub

1. **Lugege kontrollvärava väljundit hoolikalt** — see ütleb täpselt, milline fail või sümbol
   reeglit rikkus.
2. **Parandage rikkumine** — enamik kontrollväravaid on deterministlikud failisüsteemi kontrollid, mis läbivad testi kohe,
   kui kood on korrektne.
3. **Kui rikkumine on juba olemas** (st teie ei tekitanud seda, kuid kontrollvärav
   nüüd hõlmab seda): lisage lubatud loendisse kirje koos põhjendava kommentaari ja jälgimisülesandega.
4. **Kui kontrollvärav on põrkmehhanism** (koodikate, ESLinti hoiatused, dubleerimine, keerukus):
   teie muudatus halvendas mõõdikut. Parandage algpõhjus või käivitage (harvadel juhtudel)
   `npm run quality:ratchet -- --update`, kui muudatus on tahtlik ja mõõdiku
   halvenemine vastuvõetav — kuid dokumenteerige PR-i kirjelduses põhjus.
5. **Nõuandvad kontrollväravad** (`continue-on-error: true`) on informatiivsed — need ei blokeeri
   liitmist, kuid kuvatakse CI kokkuvõttes. Parandage need sellegipoolest.

---

## Uue kontrollvärava lisamine

1. Looge `scripts/check/check-<name>.mjs` (või `.ts`). Poliitika kontrollväravad lõpetavad koodiga 0/1.
   Põrkmehhanismi tüüpi kontrollväravad väljastavad mõõdiku faili `quality-metrics.json` skripti `collect-metrics.mjs` kaudu.
2. Lisage `"check:<name>": "node scripts/check/check-<name>.mjs"` faili `package.json`.
3. Ühendage see failis `.github/workflows/ci.yml` sobiva töö alla
   (poliitika → `lint` või `docs-sync-strict`; põrkmehhanism → `quality-gate`).
4. Kui sellel on lubatud loend, rakendage `reportStaleEntries()` failist
   `scripts/check/lib/allowlist.mjs`, et aegunud kirjed tuvastataks automaatselt.
5. Kirjutage kausta `tests/unit/build/` test, mis katab kontrollvärava tuvastamisloogika.
6. Uuendage seda dokumenti (lisage vastava töö tabelisse rida).

---

## Agendi tööriistad: LSP tsüklis (valikuline)

Lisaks CI kontrollväravatele sisaldab OmniRoute **valikulist** `agent-lsp` alustaristut
(projektitaseme `.mcp.json`, 7. faasi ülesanne 15). Looge `.mcp.json`,
et teha TypeScripti keeleserver programmeerimisagentidele kättesaadavaks, võimaldades neil lahendada sümbolid /
diagnostika **enne** koodi kirjutamist — see on kompileeri-enne-väidet kaaslane käsule
`typecheck:core`, mis vähendab „väljamõeldud sümbolite” vigu juba nende tekkekohas. Seda ei laadita tahtlikult
automaatselt (MCP↔LSP silla valite ja kontrollite teie); vigane kirje logib ainult
ühendusvea ega katkesta kunagi seansse.

---

## Ratsionaliseerimise mahajäämus (ROI ülevaatus — 9. etapp, 3. laine)

See inventuur viidi 2026-06-17 vastavusse failiga `ci.yml` (eelmisest versioonist puudusid
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Kooskõlastatud kogumi ROI ülevaatus
tuvastas järgmised ratsionaliseerimise kandidaadid. **Ühendamised on mehaanilised CI
muudatused; ümberlülitamised/eemaldamised on käitaja otsustada olevad poliitikavalikud.** Midagi alltoodust
pole veel rakendatud.

**Ülalpool on dokumenteerimata ka** (soovituslik, madala signaaliga): töö `docs-lint`
(markdownlint + Vale, kogu tööl `continue-on-error`) ja eraldiseisvad skanneri töövood
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` asub failis
`quality-baseline.json`, kuid pole failis `ci.yml` ühendatud blokeeriva põrkmehhanismiga — mõõdik on
praegu orvuks jäänud.

### Ühendamine / dubleerimise eemaldamine (mehaaniline, väiksem risk)

Iga kandidaati kontrolliti 2026-06-17 aktiivse kontrollvärava oleku suhtes (usalda, kuid kontrolli);
mitu „ilmselget“ ühendamist osutusid varjatud võlga sisaldavaks ega ole **puhtad** asendused.

- **`check:docs-sync` käivitub kaks korda** — eraldiseisvalt töös `lint` ning uuesti `check:docs-all` (`docs-sync-strict`) sees ja husky commit'i-eelses konksus. ✅ **TEHTUD** — eraldiseisev `lint`-käivitus eemaldatud.
- **CVE-skannimine** — ❌ **EI OLE puhas ühendamine.** `audit:deps` nurjub kohe iga kõrge/kriitilise CVE korral; `check:vuln-ratchet` (osv) nurjub ainult baasjoonega võrreldes toimunud _regressiooni_ korral (praegu 1 MODERATE). Semantika on erinev — `audit:deps` eemaldamine kaotaks absoluutse kõrge/kriitilise taseme kontrollvärava. Säilitage mõlemad.
- **Tsüklite tuvastamine** — ✅ **TEHTUD** (#15159 G-01/G-02). Siinne vana tekst nimetas `check:cycles` kontrolli „roheliseks, kureeritud“ kontrollväravaks ja põhjendas selle blokeerivana hoidmist sellega, et `check:circular-deps` (dpdm) tuvastas 91 tsüklit. See roheline tulemus oli **valepositiivne roheline**: `check:cycles` skannis 5 alamkataloogi (450 faili), sobitas ainult staatilisi `import|export … from` konstruktsioone ning jättis välja kõik `@/` ja `@omniroute/open-sse/` spetsifikaatorid, mistõttu ei suutnud see näha dünaamilise impordi ja aliase tsükleid, mis repositooriumis domineerisid. Parandatud: kontrollvärav läbib nüüd kataloogid `src` + `open-sse` (5023 faili), kogub spetsifikaatorid TypeScripti AST-st (seega läheb `import("…")` arvesse, kuid tüübipositsioonis `typeof import("…")` mitte) ning lahendab tsconfigi `paths`-väärtused. See leiab **14** tsüklit, mitte 0. Kuna 14 olemasolevat tsüklit ei saa kontrollvärava PR-is parandada, on `check:cycles` nüüd **põrkmehhanism** (`--ratchet`, ülempiir `metrics.cycles.value = 14` failis `quality-baseline.json`, `direction: down`) — see blokeerib iga _regressiooni_ ja arv saab ainult väheneda. CI käivitab `npm run check:cycles:ratchet`. Vähendamine toimub koos üksusega **A-01**. `check:circular-deps` (dpdm) jääb laiema teise arvamusena soovituslikuks.
- **Keerukus** — ✅ **TEHTUD** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): üks ESLinti läbimine, loendamine `ruleId` järgi, et tsüklomaatilise keerukuse + maksimaalse ridade arvu ja kognitiivse keerukuse baasjooned püsiksid sõltumatuna; eraldiseisvad `check:complexity` / `check:cognitive-complexity` säilivad kohaliku `--update` jaoks.
- **`/api` hallutsinatsioonivastane kontroll** — ✅ **TEHTUD** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): üks `src/app/api` failisüsteemi inventuur, openapi-routes + docs-symbols annavad endiselt aru sõltumatult; eraldiseisvad kontrollid säilivad kohalikeks käivitusteks.
- **`check:node-runtime` käivitub 11 töös** — ⚠️ **madal ROI.** Igaüks kasutab eraldi käitajat ja kontroll võtab <1 s; kogusääst ~10 s, kuid selle hinnaks oleks odava tööpõhise kaitse kaotamine. Muudatuste vaeva ei väärt.
- **`typecheck:noimplicit:core` CI lintimisel** — ✅ **lint-tööst eemaldatud** (oli soovituslik `continue-on-error`); blokeeriv tüübipind on `typecheck:core` + `check:type-coverage`. Kohalik skript säilitati.

### Ümberlülitamine / otsustamine (käitaja poliitika)

- `check:openapi-security-tiers` (soovituslik) — ❌ **EI OLE puhtalt ümberlülitatav.** See lõpetab koodiga 0, kuid hoiatab, et mitmel `traffic-inspector` marsruudil jaotises `LOCAL_ONLY_API_PREFIXES` puudub annotatsioon `x-loopback-only: true`. Selle jõustamiseks tuleb esmalt lisada need annotatsioonid faili `openapi.yaml`.
- `typecheck:noimplicit:core` (soovituslik) — blokeeriv `check:type-coverage` põrkmehhanism katab seda suuresti. Muutke see põrkmehhanismiks või eemaldage üleliigne teine `tsc` läbimine.
- `test:vitest:ui` (nüüd **blokeeriv**) — olemasolevad tõrked on failis `vitest.config.ts` selgesõnaliselt välistatud jälgimiskommentaaridega `// #8618`; uued tõrked nurjavad töö.
- `check:secrets` (gitleaks, blokeeriv põrkmehhanism, mis on külmutatud 3 dokumenteeritud valepositiivse tulemuse juures) — lisage need 3 lubatud loendisse, et jõuda nullini, või alandage kontroll soovituslikuks. Kattub GitHubi sisseehitatud saladuste skannimisega + `check:public-creds`.
- `check:pr-evidence` (blokeeriv, otsib PR-i kirjeldusest teksti) — suur valepositiivsete tulemuste risk; eemaldamine nõrgendaks range reegli nr 18 jõustamist, seega on see tõeline poliitikaotsus.
- `semgrep` (soovituslik eraldiseisev kontroll) — kattub OWASP-i kategooriate puhul CodeQL-iga; ühendage selle baasjoon põrkmehhanismiga või eemaldage.

---

## Seotud dokumentatsioon

- Tarkvara tarneahel (päritolu, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — võtmekogumite võrdsuse kontroll

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, töö `i18n-ui-coverage`).
Võrdleb iga faili `src/i18n/messages/<locale>.json` lehtvõtmete kogumit failiga `en.json` ja nurjub
mis tahes puuduva või üleliigse lehe korral, olenemata sellest, millal võti lisati. Kohatäited
`__MISSING__:` loetakse olemasolevaks (nende sisu kuulub suhtarvukontrolli vastutusalasse). See on
kahe erinevuspõhise/protsendipõhise kontrolli absoluutne täiendus: `check-ui-keys-coverage` nõuab iga
lokaadi puhul vähemalt 80% katvust (43 puuduvat võtit umbes 13 000-st annavad endiselt tulemuseks
99,7%) ja `check-new-key-coverage` hindab ainult võtmeid, mille PR lisab faili `en.json`. Lokaadipakk
luuakse selle päeva failist `en.json`, mil selle haru luuakse, ning seda tõlgitakse mitu päeva, samal
ajal kui baasharusse lisatakse jätkuvalt võtmeid; paki PR ise ei lisa ühtegi võtit, mistõttu ei
reageerinud kumbki sõsarkontroll, kui pakk 1 (#13044) liideti nii, et üheksas lokaadis puudus 43
võtit, ja pakk 2 (#13660) nii, et kaheksas lokaadis puudus 10 võtit (2026-09-15). Kõrvalda tõrge
käsuga `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; `extra`-leht
tähendab, et lähtefailist on see eemaldatud — kustuta see lokaadist. `--warn` raporteerib ilma
nurjumiseta. `--catalog=cli` käitab sama võrdlust kataloogis `bin/cli/locales`
(`npm run i18n:check-keys:cli`); mõlemad sammud asuvad töös `i18n-ui-coverage`.

#### `check-new-key-coverage` — uute võtmete i18n-kontroll

Kontrolli `check-ui-value-drift` sõsarkontroll. Too tuvastab ingliskeelse väärtuse, mis **kirjutati
ümber**, samal ajal kui selle tõlked jäid muutmata; see kontroll tuvastab ingliskeelse võtme, mis
**lisati**, kuid mida mõni lokaat ei saanud.

`check-ui-keys-coverage` ei suuda sellist olukorda tuvastada: see nõuab iga lokaadi puhul minimaalset
katvusprotsenti ning üheteistkümne puuduva võtme korral umbes 13 000-st jääb katvuseks 99,9%.
Keelepõhine protsent ei suuda väljendada olukorda „see funktsioon avaldati tõlkimata“ — terve
funktsioon võib jõuda uude lokaati ilma igasuguse tekstita, ilma et number üldse muutuks.

Juhtum, mille see fikseerib: Orchestration Canvase 3. etapis tõlgiti selle üksteist võtit kõigisse
tol ajal olemas olnud 42 lokaati. Mõni tund hiljem suurendas EL-i keelte pakk (#13044) hoidla
lokaadid 51-ni ning üheksa uut lokaati (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) ei
saanud neid võtmeid kunagi. `deepMergeFallback` asendab puuduva võtme ingliskeelse tekstiga, mistõttu
oli tõrke ilminguks tõlkimata, mitte tühi kasutajaliides — tegelik probleem, mis jäi oma ülesehituse
tõttu märkamatuks.

Nagu sõsarkontrollgi, on see **erinevusteadlik**: see võrdleb liitmisbaasi ingliskeelset versiooni
tööpuuga, mistõttu olemasolevad lüngad jäävad muutumatuks ja kontrolli sisselülitamiseks ei olnud
migraati vaja.

**Marker `__MISSING__:<english>` ei rahulda seda kontrolli (alates 2026-09-17).** Varem oli see
dokumenteeritud edasilükkamisviis — käitusaeg kasutab korrektset ingliskeelset varuvarianti —, kuni
kaheksa funktsiooni-PR-i lisasid 2026-09-16 kokku 61 võtit ja lisasid tõlkimise asemel markeri kõigisse
65 lokaati: see kontroll aktsepteeris neid kõiki, miski ei blokeerinud PR-e ning blokeeriv tegeliku
tõlke suhtarvukontroll nurjus seejärel väljalaske viimase versiooni puhul kõigil (pt-BR 3,2% > 2,5%

- 0,5). Marker loetakse nüüd puuduvaks tõlkeks. Kõrvalda tõrge käsuga
  `node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` või
  kõigis lokaatides paralleelselt käsuga `npm run i18n:translate-new-keys`
  (`scripts/i18n/translate-new-keys.sh`, toimib lahtiühendatult, keeldub käivitumast ilma
  keskkonnamuutujateta `OMNIROUTE_TRANSLATION_*`). Võti, mis peab jääma ingliskeelseks (fikseeritud
  toote-, mootori- või lipunimi), kuulub faili `scripts/i18n/untranslatable-keys.json`, mitte kunagi
  markeri taha. `vi` keelab markerid täielikult (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — ootele pandud testide kontroll

Fail, mis on faili `vitest.config.ts` loendis `exclude`, on test, mida ei käitata, kuid puu lugejale
näib see katvusena. Kommentaari `// #8618 — pre-existing failure; remove this exclusion when fixed`
taha kogunes kuuskümmend kaks faili. Probleem #8618 suleti 2026-08-11, samal ajal kui selle jälgitav
loend kasvas 45 kirjelt 62-ni ning iga uus kirje päris kommentaari, mis viitas suletud probleemile.
Kui loend lõpuks failhaaval üle mõõdeti (#13204), **läbis 62 failist 51 testi praeguse puu suhtes
ilma lähtekoodi muutmata**.

Kontroll nõuab, et iga välistus, mis osutab tegelikule failile, (a) nimetaks jälgimisprobleemi ja
(b) esineks failis `config/quality/vitest-exclusions.json` koos mõõdetud olekuga, nii et välistuse
lisamine oleks eraldi failis ülevaadatav erinevus, mitte lihtsalt järjekordne rida 60 kirjega massiivis.
Kontroll ei käita välistatud teste tahtlikult uuesti — see võtab umbes 10 minutit ja kuulub
perioodilisse töösse; register talletab iga testi viimase mõõtmise aja.
