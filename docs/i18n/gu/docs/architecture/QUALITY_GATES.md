# Quality Gates Reference (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇰🇪 [sw](../../../sw/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

આ દસ્તાવેજ OmniRoute માંના તમામ CI ગુણવત્તા ગેટ્સ માટેનો અધિકૃત સંદર્ભ છે.
તે દરેક ગેટ, તે શું માન્ય કરે છે, તે કયા CI જોબમાં ચાલે છે, તે
ratchet baseline અથવા pass/fail policy નો ઉપયોગ કરે છે કે કેમ, અને તે બિલ્ડને અવરોધે છે કે માત્ર સલાહકારી છે તે વર્ણવે છે.

ટૂંકા સારાંશ અને allowlist policy માટે, `AGENTS.md` માંનો "Quality Gates & Ratchets" વિભાગ જુઓ.
આ જ સિસ્ટમના નિર્ણાયક મૂલ્યાંકન, પરિપક્વતા વર્ગીકરણ અને ટૂલ-અજ્ઞેયી
પુનરાવર્તન પ્લાન માટે,
[Quality Gate Playbook](../ops/QUALITY_GATE_PLAYBOOK.md) જુઓ.

---

## ગેટ ઇન્વેન્ટરી (~90 સ્ક્રિપ્ટ્સ)

સ્ક્રિપ્ટ્સ `scripts/check/` (નીતિ ગેટ્સ) અને `scripts/quality/` (રૅચેટ એન્જિન) હેઠળ આવેલી છે.
CI માટે સત્યનો અધિકૃત સ્રોત `.github/workflows/ci.yml` છે.

### રિલીઝ PR ફાસ્ટ-પાથ (`quality.yml`)

`.github/workflows/quality.yml`, `release/**` ને લક્ષ્ય બનાવતા PRs પર ચાલે છે. તે પાથ દ્વારા ફિલ્ટર કરાયેલા ઝડપી ગેટ્સ વડે યોગદાનકર્તાની
બ્રાન્ચોને આગળ વધતી રાખે છે, ઉપરાંત કોડમાં ફેરફારો માટે એક સલાહકારી પ્રોડક્શન-બિલ્ડ સંકેત પણ આપે
છે:

| જોબ                                              | વ્યાપ                                                                                                                                                                                                                                    | અવરોધક                                                                              |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `Build (advisory)`                               | બિન-ડ્રાફ્ટ કોડ PRs અને Mergify ક્યૂ બ્રાન્ચો; Node 24, `npm-ci-retry`, `check:node-runtime`, `OMNIROUTE_USE_TURBOPACK=1` સાથે `npm run build`; કોઈ આર્ટિફેક્ટ અપલોડ નહીં, કારણ કે કોઈ અનુગામી ગુણવત્તા જોબ તેનો ઉપયોગ કરતી નથી          | **સલાહકારી** (`continue-on-error: true`; સ્થિર રિલીઝ-PR રનની એક સપ્તાહ પછી દૂર કરો) |
| `Docs Gates (fast-path)`                         | દસ્તાવેજીકરણ/કોડ PRs; API દસ્તાવેજીકરણ સંદર્ભો અને સમગ્ર દસ્તાવેજીકરણ                                                                                                                                                                    | હા                                                                                  |
| `Fast Quality Gates`                             | કોડ PRs; સ્ટેટિક તપાસો, ટાઇપચેક, ડૅશબોર્ડ ટાઇપચેક, અસરગ્રસ્ત યુનિટ પરીક્ષણો                                                                                                                                                              | હા                                                                                  |
| `Forgotten sibling tests`                        | કોડ PRs; બદલાયેલા મોડ્યુલ્સને સ્ટેટિક ઉપભોક્તાઓ અને સંભવિત સિબ્લિંગ પરીક્ષણો સુધી ટ્રેસ કરવામાં આવે છે; બેરલ અને ડાયનેમિક-ઇમ્પોર્ટ પાથ્સને સલાહકારી નિદાન તરીકે રિપોર્ટ કરવામાં આવે છે, જેમાં સંદર્ભિત અનુમતિસૂચિ અપવાદોનો સમાવેશ થાય છે | **સલાહકારી**                                                                        |
| `Vitest (fast-path)`                             | કોડ PRs; ઝડપી vitest સ્યુટ                                                                                                                                                                                                               | હા                                                                                  |
| `Unit Tests fast-path`                           | કોડ PRs; 4-શાર્ડ યુનિટ સ્યુટ                                                                                                                                                                                                             | હા                                                                                  |
| `No new ESLint warnings`                         | કોડ PRs; સપ્રેશન-અવેર લિન્ટ ગાર્ડ                                                                                                                                                                                                        | પોતાના મૂળના PRs માટે હા, ફોર્ક્સ માટે સલાહકારી                                     |
| `Merge integrity (changelog + generated skills)` | બિન-ડ્રાફ્ટ PRs; ચેન્જલોગ અને જનરેટ કરેલી સ્કિલ્સનું સિંક્રનાઇઝેશન                                                                                                                                                                       | પોતાના મૂળના PRs માટે હા, ફોર્ક્સ માટે સલાહકારી                                     |

#### ભૂલી ગયેલા સિબ્લિંગ પરીક્ષણોનો રિપોર્ટ

`npm run check:forgotten-sibling-tests` પરીક્ષણ-અસર નકશાની પાછળના ઇમ્પોર્ટ રિઝોલ્વરનો ફરી ઉપયોગ કરે છે.
દરેક બદલાયેલા પ્રોડક્શન મોડ્યુલ માટે, જ્યારે સંભવિત પરીક્ષણ
પુલ-રિક્વેસ્ટ ડિફમાં ગેરહાજર હોય ત્યારે તે નિર્ધારિત `changed module/symbol -> static consumer -> candidate sibling test` શૃંખલાઓ રિપોર્ટ કરે છે. કોઈપણ અવરોધક અમલીકરણ પહેલાં કેલિબ્રેશન માટે Markdown સારાંશ અને JSON પરિણામને
`forgotten-sibling-tests` વર્કફ્લો આર્ટિફેક્ટ તરીકે જાળવી રાખવામાં આવે છે.

બેરલ રી-એક્સપોર્ટ્સ અને ડાયનેમિક ઇમ્પોર્ટ્સ ફક્ત રિઝોલ્યુશન નિદાન છે; તેઓ ક્યારેય
અવરોધક તારણ બનાવતા નથી. સમીક્ષા કરેલા અપવાદો
`config/quality/forgotten-sibling-allowlist.json` માં આવેલા છે. દરેક એન્ટ્રીમાં ઉપભોક્તા અને સંભવિત
પરીક્ષણનું નામ હોવું, ચોક્કસ કારણ આપવું અને GitHub ઇશ્યૂ અથવા પુલ રિક્વેસ્ટની લિંક આપવી આવશ્યક છે. ખોટી રીતે રચાયેલી એન્ટ્રીઓ
બંધ-સુરક્ષિત રીતે નિષ્ફળ થાય છે. અપવાદો કાઢી નાખેલા સંભવિત પરીક્ષણને અથવા `.skip`/`.todo` ઉમેરતા ડિફને દબાવી શકતા નથી;
અસર્શનને નબળું બનાવવું અને અન્ય છુપાવવાની રીતો સ્વતંત્ર રીતે અવરોધક
`check:test-masking` ગેટના કાર્યક્ષેત્રમાં જ રહે છે.

### જોબ: `lint`

`main` તરફના દરેક PR પર ચાલે છે. નિષ્ફળતા થાય તો મર્જને અવરોધે છે.

| સ્ક્રિપ્ટ (`npm run ...`)         | શું માન્ય કરે છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | અવરોધક                                  |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:node-runtime`              | Node.js સંસ્કરણ સમર્થિત શ્રેણીમાં છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | હા                                      |
| `check:cycles`                    | ચક્રીય ઇમ્પોર્ટ્સ — બધા `src/` + `open-sse/` મોડ્યુલ્સ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | હા                                      |
| `check:route-validation:t06`      | બધા રૂટ્સ પર Zod સ્કીમા હાજર છે (Tier 6 નીતિ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | હા                                      |
| `check:any-budget:t11`            | `@ts-expect-error // any` ની સંખ્યા નિર્ધારિત મર્યાદાથી વધુ નથી (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | હા                                      |
| `check:provider-consistency`      | `providers.ts` માંના દરેક provider માટે `providerRegistry.ts` માં મેળ ખાતી entry છે (અને allowlist ની અંદર તેનાથી વિપરીત પણ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | હા                                      |
| `check:model-lifecycle`           | હાથથી જાળવવામાં આવતા ત્રણ routing tables checked-in lifecycle snapshot (#11503) સાથે સુસંગત રહે છે: `FITNESS_TABLE` (`taskFitness.ts`) એવા કોઈ retired id ને score આપતું નથી જેને `REGISTRY` route કરી શકે; દરેક `BUILT_IN_ALIASES` target `REGISTRY` માં હાજર છે અને retired-id snapshot માં ગેરહાજર છે; `REGISTRY` માં હજુ પણ રહેલા દરેક retired id ને forward કરવામાં આવે છે અથવા `allowedRetiredInCatalog` માં સૂચિબદ્ધ કરવામાં આવે છે; અને કોઈ પણ `DEFAULT_DEGRADATION_MAP` source અથવા target તે snapshot માં retired તરીકે દેખાતું નથી. આ સાબિત કરતું નથી કે કોઈ model હાલમાં live upstream દ્વારા serve કરવામાં આવે છે. Offline — `config/quality/model-lifecycle.json` સાથે સરખામણી કરે છે, જેને `npm run quality:refresh-model-lifecycle` દ્વારા હાથથી refresh કરવામાં આવે છે (network; CI સાથે જોડાયેલ નથી). `allowedRetiredInCatalog` એ burn-down ratchet છે: tracking issue હોય તો જ entry ઉમેરો. | હા                                      |
| `check:fetch-targets`             | client-side `src/` માંનું દરેક `fetch("/api/...")` વાસ્તવિક `route.ts` સુધી resolve થાય છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | હા                                      |
| `check:deps`                      | repo માંના દરેક `package.json` માંની બધી `npm install` કરી શકાય તેવી deps `dependency-allowlist.json` માં છે; નવા unpinned અથવા slopsquatted packages ને flag કરવામાં આવે છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | હા                                      |
| `audit:deps`                      | `npm audit` (root + electron) — કોઈ high/critical advisories નથી (osv `check:vuln-ratchet` સાથે overlap થાય છે; Rationalization Backlog જુઓ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | હા                                      |
| `check:lockfile`                  | `package-lock.json` ની integrity — https registry, integrity hashes, કોઈ host overrides નથી                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | હા                                      |
| `check:licenses`                  | પ્રોડક્શન ડિપેન્ડન્સીઓ માટે SPDX લાઇસન્સ મંજૂરીસૂચિ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | હા                                      |
| `check:tracked-artifacts`         | કોઈ બિલ્ડ આર્ટિફેક્ટ્સ / કમિટ કરેલી `node_modules` સિમલિંક્સ નહીં (husky pre-commitમાં પણ ચાલે છે; pre-push ઇરાદાપૂર્વક હળવું છે — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | હા                                      |
| `check:vitest-exclusions`         | દરેક Vitest બાકાતીકરણમાં ટ્રેકિંગ ઇશ્યૂનો ઉલ્લેખ હોય છે અને તે `config/quality/vitest-exclusions.json`માં દેખાય છે (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | હા                                      |
| `check:file-size`                 | કોઈ સોર્સ ફાઇલ પ્રતિ-એક્સ્ટેન્શન મર્યાદા કરતાં મોટી નથી (રૅચેટ: `frozen` સૂચિમાં સ્થિર કરેલી મોટી ફાઇલો)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | હા                                      |
| `check:error-helper`              | executors/handlersમાં ભૂલ પ્રતિસાદો `buildErrorBody()` / `sanitizeErrorMessage()`નો ઉપયોગ કરે છે (કડક નિયમ #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | હા                                      |
| `check:migration-numbering`       | માઇગ્રેશન SQL ફાઇલોને ક્રમિક રીતે નંબર આપવામાં આવ્યા છે, કોઈ ખાલી ક્રમ કે ડુપ્લિકેટ્સ નથી                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | હા                                      |
| `check:public-creds`              | `publicCreds.ts` ની બહાર કોઈ લિટરલ OAuth `client_id`/`client_secret` અથવા Firebase Web કી નથી (કડક નિયમ #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | હા                                      |
| `check:db-rules`                  | `src/lib/db/` મોડ્યુલોની બહાર કોઈ રૉ SQL નથી; `localDb.ts` માંથી કોઈ બેરલ-ઇમ્પોર્ટ નથી (કડક નિયમો #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | હા                                      |
| `check:known-symbols`             | તેમના ડિસ્પેચ ટેબલમાં નોંધાયેલા પ્રોવાઇડર એક્ઝિક્યુટર્સ, રાઉટિંગ વ્યૂહરચનાઓ અને ટ્રાન્સલેટર્સ ડિસ્ક પરની ફાઇલો સાથે મેળ ખાય છે — કોઈ અનાથ અથવા અઘોષિત સિમ્બોલ નથી                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | હા                                      |
| `check:route-guard-membership`    | ચાઇલ્ડ પ્રોસેસ શરૂ કરતો દરેક રૂટ `isLocalOnlyPath()` દ્વારા વર્ગીકૃત થયેલો છે (કડક નિયમો #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | હા                                      |
| `check:test-discovery`            | રેપોમાંની દરેક `*.test.ts` / `*.spec.ts` ફાઇલ ઓછામાં ઓછા એક ટેસ્ટ રનર દ્વારા એકત્રિત થાય છે (રૅચેટ: `test-discovery-baseline.json` માંની અનાથ યાદી માત્ર ઘટી શકે છે)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | હા                                      |
| `check:agent-skills-sync`         | જનરેટ કરેલી એજન્ટ-સ્કિલ્સ આર્ટિફેક્ટ્સ તેમના સ્રોત કેટલોગ સાથે મેળ ખાય છે (કોઈ વિચલન નથી)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `check:provider-asset-provenance` | પ્રોવાઇડર લોગો/એસેટ્સ માટે નોંધાયેલ ઉદ્ભવ એન્ટ્રી હોય છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `lint:json`                       | JSON config ફાઇલો પાર્સ થાય છે અને રિપોઝિટરીના lint નિયમોને સંતોષે છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `typecheck:core`                  | ભૂલો વિના TypeScript કમ્પાઇલેશન (માત્ર સલાહરૂપ ચેતવણીઓ)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | હા                                      |
| `typecheck:noimplicit:core`       | કડક `noImplicitAny` — ભવિષ્યલક્ષી; અગાઉથી અસ્તિત્વમાં રહેલી ઘણી call sites ને હજુ પણ annotations ની જરૂર છે                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | **સલાહરૂપ** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `src/app/(dashboard)/**` સુધી મર્યાદિત `tsc` (#7033) — `typecheck:core` ની પસંદ કરેલી 27-ફાઇલ allowlist માં કોઈ dashboard TSX સામેલ નથી, અને `next build` પણ તેને ક્યારેય type-check કરતું નથી (`next.config.mjs` માં `ignoreBuildErrors: true` સેટ કરેલું છે), તેથી ત્યાંની orphaned-identifier regressions (#6625/#6909) CI માટે અદૃશ્ય હતી. સ્થિર કરેલી પ્રતિ-ફાઇલ/પ્રતિ-TS-code ગણતરી baseline (`config/quality/dashboard-typecheck-baseline.json`, `check:known-symbols` જેવી જ stale-enforcement પદ્ધતિ) સામે તફાવત તપાસે છે — baseline માં રહેલી ગણતરીથી વધારાની માત્ર નવી ભૂલો જ gate ને નિષ્ફળ બનાવે છે; અગાઉથી અસ્તિત્વમાં રહેલી ભૂલ સુધારવામાં આવે ત્યારે `--update` વડે baseline ઘટાડો.                                                                                                                                                                                                            | હા                                      |

### Job: `quality-gate`

`test-coverage` પછી ચાલે છે. નિષ્ફળતા આવે તો merge ને અવરોધે છે.

| Script                       | શું ચકાસે છે                                                                                                                                                               | અવરોધક                    |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `quality:collect`            | `quality-metrics.json` ઉત્પન્ન કરે છે (ESLint ચેતવણીઓની સંખ્યા, મર્જ કરાયેલા shard report માંથી coverage)                                                                  | હા (ratchet નું upstream) |
| `quality:ratchet`            | `quality-baseline.json` માંનો દરેક metric ખરાબ થયો નથી (ESLint ચેતવણીઓ ≤ baseline; coverage ≥ baseline)                                                                    | હા                        |
| `check:duplication`          | Code duplication (jscpd@4) `quality-baseline.json` માંના baseline કરતાં વધતું નથી                                                                                          | હા                        |
| `check:complexity`           | ફાઇલ-સ્તરની cyclomatic complexity મર્યાદાથી વધતી નથી (મુખ્ય ESLint `complexity` + `max-lines-per-function`)                                                                | હા                        |
| `check:cognitive-complexity` | Cognitive complexity ratchet (`eslint-plugin-sonarjs`) — અલગ ESLint pass; CI બંનેને એક જ `check:complexity-ratchets` step તરીકે મર્જ કરીને ચલાવે છે                        | હા                        |
| `check:dead-code`            | વપરાયા વિનાના exports / files માટેનો ratchet baseline ની સરખામણીએ ખરાબ થતો નથી (knip)                                                                                      | હા                        |
| `check:compression-budget`   | Compression benchmark budget — દરેક engine માટે token-savings ની લઘુતમ મર્યાદા ખરાબ થવી જોઈએ નહીં                                                                          | હા                        |
| `check:type-coverage`        | ટકાવારી-typed ratchet (`type-coverage`) ખરાબ થતો નથી; મોટાભાગે `typecheck:noimplicit:core` ને આવરી લે છે                                                                   | હા                        |
| `check:codeql-ratchet`       | ખુલ્લી CodeQL alerts ની સંખ્યા વધતી નથી (`gh api` દ્વારા વાંચે છે; token વિના યોગ્ય રીતે skip કરે છે) — refresh cadence અને manual trigger માટે: નીચે "CodeQL ratchet" જુઓ | હા                        |

### Job: `quality-extended`

સમગ્ર જૉબ સલાહાત્મક છે (`continue-on-error: true`). npm-આધારિત રૅચેટ્સ ખરેખર ચાલે છે;
બાહ્ય સ્કેનર્સ `gh release download` દ્વારા ઇન્સ્ટૉલ થાય છે અને જ્યારે બાઇનરી હજી પણ
ગેરહાજર હોય ત્યારે પોતે જ સ્કિપ થાય છે (exit 0).

| સ્ક્રિપ્ટ                | શું ચકાસે છે                                                                                                                                                                                   | અવરોધક        |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| `check:circular-deps`    | કોઈ ચક્રીય નિર્ભરતાઓ નથી (dpdm)                                                                                                                                                                | **સલાહાત્મક** |
| `check:bundle-size`      | બંડલનું કદ મર્યાદાથી વધુ નથી                                                                                                                                                                   | **સલાહાત્મક** |
| `check:secrets`          | સિક્રેટ સ્કેનિંગ (gitleaks) — બાઇનરી ગેરહાજર હોય તો સ્કિપ કરે છે                                                                                                                               | **સલાહાત્મક** |
| `check:vuln-ratchet`     | નિર્ભરતાની નબળાઈઓ (osv-scanner) વધુ ખરાબ થતી નથી — બાઇનરી ગેરહાજર હોય તો સ્કિપ કરે છે                                                                                                          | **સલાહાત્મક** |
| `check:workflows`        | વર્કફ્લો લિન્ટ (actionlint + zizmor) — બાઇનરીઓ ગેરહાજર હોય તો સ્કિપ કરે છે                                                                                                                     | **સલાહાત્મક** |
| `check:openapi-breaking` | મૂળ બ્રાન્ચની સરખામણીમાં જાહેર API કરાર (`openapi.yaml`)માં બ્રેકિંગ ફેરફારો (oasdiff) — `openapiBreaking=N` ઉત્સર્જિત કરે છે; oasdiff ગેરહાજર હોય અથવા મૂળ સ્પેક ઉકેલી ન શકાય તો સ્કિપ કરે છે | **સલાહાત્મક** |

### જૉબ: `docs-sync-strict`

`main` માટેની દરેક PR પર ચાલે છે. નિષ્ફળતા થાય તો મર્જને અવરોધે છે.

| સ્ક્રિપ્ટ                      | શું ચકાસે છે                                                                                                                                                       | અવરોધક                       |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------- |
| `check:docs-all`               | નીચેના 6 ઉપ-ગેટ્સને ક્રમશઃ ચલાવતો મેટા-ગેટ                                                                                                                         | હા                           |
| ↳ `check:docs-sync`            | CHANGELOG / OpenAPI / llm.txt સંસ્કરણની સુસંગતતા                                                                                                                   | હા                           |
| ↳ `check:docs-counts`          | ગદ્યમાં આપેલી સંખ્યાઓ (પ્રદાતાઓની સંખ્યા, માઇગ્રેશનોની સંખ્યા વગેરે) વાસ્તવિક સંખ્યાઓની રૅચેટ વિન્ડોની અંદર છે                                                     | હા                           |
| ↳ `check:env-doc-sync`         | `.env.example`માંનો દરેક env var દસ્તાવેજીકરણના કોષ્ટકમાં નોંધાયેલો છે, અને તેનાથી વિપરીત પણ                                                                       | હા                           |
| ↳ `check:deprecated-versions`  | દસ્તાવેજીકરણમાં કોઈ અપ્રચલિત સંસ્કરણ સ્ટ્રિંગ્સ નથી                                                                                                                | હા                           |
| ↳ `check:doc-links`            | દસ્તાવેજીકરણમાંની આંતરિક markdown લિંક્સ વાસ્તવિક ફાઇલો તરફ નિર્દેશ કરે છે (`[text]`/`(path)` સ્વરૂપ)                                                              | હા                           |
| ↳ `check:fabricated-docs`      | દસ્તાવેજીકરણમાં ઉલ્લેખિત રૂટ્સ, env vars, CLI કમાન્ડ્સ, હૂકનાં નામો અને ફાઇલ પાથ્સ કોડબેઝમાં અસ્તિત્વ ધરાવે છે. `--strict` દ્વારા હાર્ડ ગેટ; ફ્લૅગ વિના સોફ્ટ-ફેલ. | હા (CIમાં `--strict` દ્વારા) |
| `check:cli-i18n`               | CLI કમાન્ડ સ્ટ્રિંગ્સ તમામ i18n લોકેલ ફાઇલોમાં હાજર છે                                                                                                             | હા                           |
| `check:openapi-coverage`       | OpenAPI સ્પેક વાસ્તવિક રૂટ્સના ઓછામાં ઓછા રૅચેટ કરેલા ન્યૂનતમ સ્તરને આવરી લે છે                                                                                    | હા                           |
| `check:openapi-security-tiers` | `openapi.yaml`માંના સુરક્ષા સ્તરના ઍનોટેશન્સ `routeGuard.ts`ના વર્ગીકરણો સાથે સુસંગત છે                                                                            | **સલાહાત્મક**                |
| `check:openapi-routes`         | `openapi.yaml`માંનો દરેક પાથ વાસ્તવિક `route.ts` તરફ નિર્દેશ કરે છે (ભ્રામક રચના-વિરોધી)                                                                           | હા                           |
| `check:docs-symbols`           | `docs/**/*.md`માંનો દરેક `/api/...` સંદર્ભ વાસ્તવિક `route.ts` તરફ નિર્દેશ કરે છે (ભ્રામક રચના-વિરોધી)                                                             | હા                           |
| `i18n translation drift`       | i18n લોકેલ ફાઇલોમાં અનુવાદ ન થયેલી કીઝ — માત્ર ચેતવણી                                                                                                              | **સલાહાત્મક**                |

### જૉબ: `i18n-ui-coverage`

| સ્ક્રિપ્ટ                         | શું માન્ય કરે છે                                                                                                                                                                | અવરોધક      |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check-ui-keys-coverage` (ઇનલાઇન) | UI i18n કી કવરેજ ≥ 65% છે                                                                                                                                                       | હા          |
| `check-ui-value-drift` (ઇનલાઇન)   | ફરી લખાયેલું અંગ્રેજી **મૂલ્ય** કોઈ જૂનો અનુવાદ પાછળ છોડતું નથી                                                                                                                 | હા          |
| `check-new-key-coverage` (ઇનલાઇન) | એક **નવી** અંગ્રેજી કી દરેક લોકેલમાં અનુવાદિત છે — `__MISSING__:` માર્કર અસ્વીકાર્ય છે                                                                                          | હા          |
| `check-translation-ratio`         | લોકેલ દીઠ વાસ્તવિક-અનુવાદ ગુણોત્તર (અંગ્રેજી-સમાન / પ્લેસહોલ્ડર / અનુમતિસૂચિની બહારની ગુમ લીફ્સ) `config/quality/i18n-translation-baseline.json` + છૂટછાટ કરતાં વધુ ન હોવો જોઈએ | **સલાહરૂપ** |

`fetch-depth: 0` જરૂરી છે — મૂલ્ય-ડ્રિફ્ટ ગેટ મર્જ બેઝ સામે `en.json` નો ડિફ કરે છે.

#### `check-ui-value-drift` — જૂના-અનુવાદ માટેનો ગેટ

આ એવો એક i18n રિગ્રેશન પકડે છે જે અન્ય ગેટ્સ માળખાકીય રીતે જોઈ શકતા નથી: અંગ્રેજી મૂલ્ય
ફરી લખાય છે અને _પાછલા_ અંગ્રેજીમાંથી બનેલા અનુવાદો યથાવત રહી જાય છે, જેથી
બિન-અંગ્રેજી વપરાશકર્તાઓ આત્મવિશ્વાસપૂર્વક લખાયેલું, પણ હવે ખોટું લખાણ વાંચતા રહે છે.

આ ખરેખર રિલીઝ થયું હતું. Antigravity લૉગિન હેલ્પર ઉમેરાયો ત્યારે (#5203)
`oauthModal.googleOAuthWarning` ફરી લખાયું હતું; **43માંથી 39 લોકેલ્સમાં** એવું લખાણ યથાવત રહ્યું
જે ઑપરેટર્સને "સંપૂર્ણ URL કૉપિ કરીને નીચે પેસ્ટ કરો" કહે છે — એવી પ્રક્રિયા જે તે પ્રદાતા માટે
પૂર્ણ થઈ જ શકતી નથી. #8463 સુધી આ ધ્યાનમાં આવ્યું નહોતું, કારણ કે:

- `sync-ui-keys` માત્ર **ગેરહાજર** કીઓ જ બૅકફિલ કરે છે, **જૂની** કીઓને ક્યારેય નહીં;
- `check-ui-keys-coverage` કીની _હાજરી_ ગણે છે, તેથી જૂનો અનુવાદ કવર થયેલો ગણાય છે;
- `check-translation-drift` `docs/i18n/<locale>/**.md` દસ્તાવેજીકરણ મિરર્સને ટ્રૅક કરે છે —
  તે ક્યારેય `src/i18n/messages/*.json` વાંચતું નથી. 2026-09ના પુનઃ-સિંકથી job `docs-sync-strict` માં અવરોધક:
  કોઈ મુખ્ય દસ્તાવેજમાં ફેરફાર કરો → `npm run i18n:run -- --files=<doc>` (વિભાગ-સ્તરીય, ઓછા ખર્ચાળ).

**ડિફ-જાગૃત, બેઝલાઇન-આધારિત નહીં.** તે મર્જ બેઝ પરના `en.json` ની વર્કિંગ ટ્રી સાથે
સરખામણી કરે છે; જે દરેક કીનું અંગ્રેજી મૂલ્ય બદલાયું હોય, તેના માટે કોઈ લોકેલમાં હજુ પણ
અસ્પર્શિત અનુવાદ હોય તો તે જૂનો ગણાય છે. આ ઇરાદાપૂર્વક **પહેલેથી અસ્તિત્વમાં રહેલું ઋણ સ્થિર રાખે છે** —
લાંબા સમયથી અસ્તિત્વમાં રહેલો અનુવાદ કયા જૂના અંગ્રેજીમાંથી આવ્યો હતો તે ડિફ બતાવી શકતો નથી,
તેથી ગેટ માત્ર વર્તમાન ફેરફાર જેને સ્પર્શે છે તેનું જ મૂલ્યાંકન કરે છે. વિકલ્પ (પ્રતિ-કી હૅશ બેઝલાઇન)
માટે આશરે 600 KBની જનરેટ કરેલી ફાઇલ જરૂરી બને, જે સૌથી મોટી હાલની બેઝલાઇન કરતાં 3× મોટી છે
અને દરેક i18n PR પર બદલાતી રહે.

તેને સંતોષવાની બે રીતો છે:

1. અસરગ્રસ્ત અનુવાદો અપડેટ કરો, અથવા
2. તેમને `__MISSING__:<new english>` પર સેટ કરો — ત્યારબાદ રનટાઇમ સુધારેલું અંગ્રેજી
   (`src/i18n/request.ts::deepMergeFallback`, #7258) પ્રદાન કરે છે અને કી અનુવાદ માટે કતારમાં જાય છે.

જો સ્ટ્રિંગનો **અર્થ** બદલાયો હોય, તો **કીનું નામ બદલવાનું** પસંદ કરો: નવી કી જૂનો અનુવાદ
વારસામાં મેળવી શકતી નથી. #8463માં આ જ પેટર્ન વપરાયું હતું.

```bash
npm run i18n:check-value-drift          # કડક (CI જે ચલાવે છે)
npm run i18n:check-value-drift:warn     # માત્ર અહેવાલ
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

જ્યારે બેઝ કૅટલૉગ વાંચી શકાતો નથી (બેઝ ref વિનાનો શેલો ક્લોન), ત્યારે
`check-openapi-breaking` ને અનુરૂપ `SKIP reason=base-unresolved` સાથે 0 પર બહાર નીકળે છે.

### Job: `i18n`

સંપૂર્ણ i18n માન્યતા મેટ્રિક્સ (દરેક લોકેલ દીઠ એક job). આખો job સલાહરૂપ છે.

| સ્ક્રિપ્ટ                       | શું માન્ય કરે છે           | અવરોધક                                             |
| ------------------------------- | -------------------------- | -------------------------------------------------- |
| `validate_translation.py quick` | લોકેલ દીઠ અનુવાદની પૂર્ણતા | **સલાહરૂપ** (આખા job પર `continue-on-error: true`) |

### Job: `pr-test-policy`

માત્ર pull requests પર ચાલે છે.

| સ્ક્રિપ્ટ              | શું માન્ય કરે છે                                                                                                                   | અવરોધક |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------ |
| `check:pr-test-policy` | `src/`, `open-sse/`, `electron/`, અથવા `bin/` માં પ્રોડક્શન કોડ બદલતા PRsમાં ટેસ્ટ્સ ઉમેરવા અથવા અપડેટ કરવા જરૂરી છે (કડક નિયમ #8) | હા     |
| `check:test-masking`   | બદલાયેલી ટેસ્ટ ફાઇલો કુલ assert સંખ્યા ઘટાડતી નથી અથવા `assert.ok(true)` જેવા સ્વયંસિદ્ધ નિવેદનો ઉમેરતી નથી                        | હા     |
| `check:pr-evidence`    | PR બોડી ફેરફાર માટે ટેસ્ટ/VPS પુરાવાનો ઉલ્લેખ કરે છે (PR લખાણમાં શોધ કરીને કડક નિયમ #18ને યાંત્રિક બનાવે છે — નાજુક, Backlog જુઓ)  | હા     |

### Job: `test-vitest`

`build` પછી ચાલે છે. નિષ્ફળતા આવે તો મર્જને અવરોધે છે.

| સ્યુટ            | ચકાસે છે                                           | અવરોધક                                                                                                                                       |
| ---------------- | -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | MCP સર્વર (110 ટૂલ્સ), autoCombo, કૅશ — vitest રનર | હા                                                                                                                                           |
| `test:vitest:ui` | UI કમ્પોનન્ટ ટેસ્ટ્સ — vitest રનર                  | **અવરોધક** — અગાઉથી અસ્તિત્વમાં રહેલી નિષ્ફળતાઓને `vitest.config.ts`માં સ્પષ્ટપણે બાકાત રાખવામાં આવી છે; નવી નિષ્ફળતાઓ જોબને નિષ્ફળ બનાવે છે |

### રાત્રિકાલીન વર્કફ્લોઝ (નિર્ધારિત, સલાહરૂપ)

આ cron સમયપત્રક પર (અને `workflow_dispatch` દ્વારા) ચાલે છે, PRs પર ક્યારેય નહીં. આ બધા સલાહરૂપ છે.

| વર્કફ્લો               | ચકાસે છે                                                                                                                                                          | અવરોધક      |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `nightly-property`     | રેન્ડમ સીડ + ઊંચી રન સંખ્યા સાથેના fast-check પ્રોપર્ટી ટેસ્ટ્સ                                                                                                   | **સલાહરૂપ** |
| `nightly-resilience`   | હીપ-ગ્રોથ ગેટ, કેઓસ ફૉલ્ટ-ઇન્જેક્શન, k6 લોડ/સોક                                                                                                                   | **સલાહરૂપ** |
| `nightly-llm-security` | promptfoo ઇન્જેક્શન ગાર્ડ (બ્લોક મોડ) + garak પ્રોબ્સ (પ્રોવાઇડર સિક્રેટ વિના છોડવામાં આવે છે)                                                                    | **સલાહરૂપ** |
| `nightly-schemathesis` | `docs/openapi.yaml`નો ઉપયોગ કરીને લાઇવ OmniRoute સામે OpenAPI કોન્ટ્રાક્ટ ફઝિંગ (schemathesis) — સ્પેક ઉલ્લંઘનો / ન સંભાળેલી 500 ભૂલો ઉજાગર કરે છે (તબક્કો 8 B.4) | **સલાહરૂપ** |
| `nightly-mutation`     | ઝડપી યુનિટ લેન પર Stryker મ્યુટેશન-ટેસ્ટિંગ સ્કોર — બચી ગયેલા મ્યુટન્ટ્સ નબળા અસર્ટ્સને ઉજાગર કરે છે                                                              | **સલાહરૂપ** |
| `nightly-compat`       | સમર્થિત `engines.node` રેન્જમાં Node એન્જિન સુસંગતતા મેટ્રિક્સ                                                                                                    | **સલાહરૂપ** |

---

## વેલોસિટી તબક્કો (2026-08-30 → v4.0 LTS): દરેક બેઝલાઇનમાં 20% છૂટછાટ

માલિકનો નિર્ણય (2026-08-30): v4.0 મોડ્યુલરાઇઝેશન સુધી, ટેક્નિકલ ઋણને મર્યાદામાં રાખવા કરતાં રિલીઝની ઝડપ વધુ મહત્ત્વપૂર્ણ છે. દરેક **આંકડાકીય** રૅચેટ બેઝલાઇનને એક ઓડિટ કરી શકાય એવા પાસમાં 20% છૂટછાટ આપવામાં આવી હતી, અને તબક્કો `config/quality/quality-baseline.json`માં જાહેર કરાયો છે:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| શું બદલાયું                                                                                                                                                                                                  | ક્યાં                                                                                                  |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — ઓછું-હોય-તે-વધુ-સારું ગણતરીઓ ×1.2, વધુ-હોય-તે-વધુ-સારું ટકાવારીઓ ÷1.2 (કવરેજની લઘુતમ મર્યાદા 60 જ રાખી, `eslintErrors` 0 જ રહે છે, `eslintWarnings` 0 → સ્થિર કરેલી સપ્રેશન ગણતરીના 20%) | `quality-baseline.json` (`_relax_velocity_2026_08_30` નોંધ દરેક પહેલાં → પછીની કિંમત સૂચવે છે)         |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                             | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, દરેક `frozen[*]` / `testFrozen[*]` લાઇન મર્યાદા ×1.2                                                                                                                                       | `file-size-baseline.json`                                                                              |
| પ્રતિ-ફાઇલ / પ્રતિ-TS-કોડ ગણતરીઓ ×1.2                                                                                                                                                                        | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                          | `scripts/check/check-openapi-coverage.mjs`                                                             |
| જ્યારે `_policy.requireTighten === false` હોય ત્યારે `--require-tighten` સલાહરૂપ બને છે                                                                                                                      | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| રાત્રિનું `bank-ratchet-shrinks` થોભે છે (તે માપેલા ઘટાડાને બેંક કરીને ઉપલબ્ધ વધારાની મર્યાદાને નાબૂદ કરી દેત)                                                                                               | `.github/workflows/nightly-release-green.yml`                                                          |

મંજૂર-યાદીઓ (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **બજેટ નથી** અને તેમને બદલવામાં આવી નથી. પાસ/નિષ્ફળ નીતિ ગેટ્સ (સિક્રેટ્સ, SQL નિયમો,
ડૉક્સ/env કરાર, i18n સમાનતા, યુનિટ ટેસ્ટ્સ) યથાવત્ છે — નિષ્ફળ ટેસ્ટ હજી પણ નિષ્ફળ ટેસ્ટ જ છે.

**ટૂલિંગ**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — એક-વખતની
  છૂટછાટ (`scripts/quality/relax-baselines.mjs`); સમાન નોંધ સાથે બીજી વાર ચલાવવાનો ઇનકાર કરે છે.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  CI જે રીતે દરેક આંકડાકીય ગેટ માપે છે તે જ રીતે માપે છે અને દરેક ગેટ માટે બાકી રહેલી વધારાની મર્યાદા દર્શાવે છે
  (`scripts/quality/baseline-headroom.mjs`). રાત્રિનો `baseline-headroom` જોબ જીવંત ઇશ્યૂ
  **📈 બેઝલાઇન હેડરૂમ (વેલોસિટી તબક્કો)** પર કોષ્ટક પોસ્ટ કરે છે અને જ્યારે કોઈ ગેટ તેની મર્યાદાથી 10%ની અંદર
  હોય અથવા પહેલેથી તેને વટાવી ચૂક્યો હોય ત્યારે `headroom-alert` લેબલ ઉમેરે છે. તે ઇશ્યૂ આગોતરી ચેતવણી છે:
  જે બજેટ થોડા દિવસોમાં ભરાઈ જાય તેનો અર્થ એ છે કે છૂટછાટનો ઉપયોગ આખી ટીમ દ્વારા નહીં, પરંતુ થોડા PR દ્વારા
  થઈ રહ્યો છે — સમસ્યારૂપ ગેટની `_rebaseline_*` નોંધો જુઓ.

**નવા-કોડ મોડ (કોડ લખતાં-લખતાં તેને સ્વચ્છ રાખો) — 2026-08-30થી, માત્ર PR ફાસ્ટ-પાથ**

`pull_request` ઇવેન્ટ્સ પર `quality.yml`, `check:file-size`,
`check:complexity-ratchets` અને `check:dead-code`ને `--base-ref <PR base SHA>` પસાર કરે છે.
તે મોડમાં ગેટ HEADની સરખામણી મર્જ-બેઝ સાથે **PRએ સ્પર્શેલી ફાઇલો પૂરતી મર્યાદિત રાખીને** કરે છે
(`scripts/check/newCodeMode.mjs`: મર્જ-બેઝને કામચલાઉ `git worktree`માં સાકાર કરવામાં આવે છે,
ESLint/knip ત્યાં અને HEAD પર ચલાવવામાં આવે છે, અને પ્રતિ-ફાઇલ ગણતરીઓનો તફાવત કાઢવામાં આવે છે):

- **અવરોધક** — PRએ બદલેલી ફાઇલોમાં સાઇક્લોમેટિક/કૉગ્નિટિવ જટિલતા ઉલ્લંઘનો અથવા ડેડ એક્સપોર્ટ્સ ઉમેર્યા
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` લૉગમાં);
- **સલાહરૂપ** — સ્થિર કરેલી બેઝલાઇન સામે વૈશ્વિક કુલ. વારસામાં મળેલો ડ્રિફ્ટ નિર્દોષ PRને ક્યારેય
  નિષ્ફળ બનાવતો નથી; રિલીઝ રિકન્સિલિએશન વખતે ડ્રિફ્ટને ફરીથી સ્થિર કરવામાં આવે છે અને હેડરૂમ જોબ દ્વારા તેનું નિરીક્ષણ થાય છે.

`workflow_dispatch` રન્સ, રિલીઝ-ગ્રીન સ્વીપ અને રાત્રિના હેડરૂમ જોબ પાસે કોઈ PR બેઝ નથી
અને તેઓ સંપૂર્ણ (વૈશ્વિક) સરખામણી જાળવી રાખે છે. કવરેજ, ડુપ્લિકેશન અને ટાઇપ-કવરેજ હાલ માટે વૈશ્વિક રહે છે
(તેમનાં ટૂલ્સ ઓછા ખર્ચે પ્રતિ-ફાઇલ તફાવત આપતા નથી) — સમાન વ્યવહાર માટેના ઉમેદવારો.

**v4.0 પર તબક્કો બંધ કરવો (LTS = પહેલાં કરતાં વધુ કડક, માત્ર "ફરી સામાન્ય" નહીં)**

1. શુદ્ધ `release/v4.0.0` ટિપ પર: રેકોર્ડ માટે `npm run quality:headroom --json`, ત્યારબાદ
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, દરેક typecheck ગેટનું
   `--update` ચલાવો — દરેક બેઝલાઇન માપેલા મૂલ્ય સુધી ઘટે છે.
2. `quality-baseline.json`માંથી `_policy` કાઢી નાખો (`--require-tighten` અને રાત્રિકાલીન
   બેન્કિંગને ફરી સક્રિય કરે છે), `check-openapi-coverage.mjs`માં `THRESHOLD = 36` (અથવા વધુ) પુનઃસ્થાપિત કરો.
3. જ્યાં મોડ્યુલરાઇઝેશનથી લાભ થયો હોય ત્યાં માપેલા મૂલ્યથી પણ વધુ કડક કરો: file-size `cap`ને ફરીથી 1000
   (અથવા 800) કરો, coverage floorsમાં +5 વધારો કરો અને મોડ્યુલરાઇઝ કરેલા packages માટે dead exportsને 0 કરો.

## રૅચેટ બેઝલાઇન (`quality-baseline.json`)

રૅચેટ એન્જિન (`scripts/quality/check-quality-ratchet.mjs`) `quality-baseline.json` વાંચે છે
અને તેની તાજા એકત્રિત કરેલા `quality-metrics.json` સાથે સરખામણી કરે છે. કોઈપણ મેટ્રિક તેના એપ્સિલોનથી
વધુ ખરાબ થાય તો બિલ્ડ નિષ્ફળ જાય છે.

હાલમાં ટ્રૅક કરવામાં આવતા મેટ્રિક્સ:

| મેટ્રિક               | દિશા   | અર્થ                                |
| --------------------- | ------ | ----------------------------------- |
| `eslintWarnings`      | `down` | ESLint ચેતવણીઓની સંખ્યા વધવી ન જોઈએ |
| `coverage.statements` | `up`   | સ્ટેટમેન્ટ કવરેજ ઘટવું ન જોઈએ       |
| `coverage.lines`      | `up`   | લાઇન કવરેજ ઘટવું ન જોઈએ             |
| `coverage.functions`  | `up`   | ફંક્શન કવરેજ ઘટવું ન જોઈએ           |
| `coverage.branches`   | `up`   | બ્રાન્ચ કવરેજ ઘટવું ન જોઈએ          |

વાસ્તવિક સુધારા પછી બેઝલાઇન અપડેટ કરવા માટે:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

`--update` ફ્લૅગ હાલના માપેલા મૂલ્યો `quality-baseline.json`માં લખે છે.
મેટ્રિકમાં સુધારો કરનાર ફેરફારની સાથે આ ફાઇલ કમિટ કરો. બેઝલાઇન અપડેટ કર્યા વિના
મેટ્રિકમાં સુધારો કરતી PRને `--require-tighten` દ્વારા પકડવામાં આવશે (તબક્કો 6A.5,
અમલીકરણ બાકી છે).

### CodeQL રૅચેટ: રિફ્રેશની આવર્તનતા અને મેન્યુઅલ ટ્રિગર

`check:codeql-ratchet` **રિપોઝિટરીની સ્થિતિ વાંચે છે, જે શેડ્યૂલ મુજબ રિફ્રેશ થાય છે — દરેક PR દીઠ નહીં.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` આ અહેવાલ આપે છે:
`state: configured`, `schedule: weekly`: આ GitHubનું ડિફૉલ્ટ-સેટઅપ સ્કૅન છે, દરેક પુશ દીઠ થતું
વિશ્લેષણ નથી. પરિણામે: ચેતવણીઓને સુધારતી PR મર્જ થયા પછી, રૅચેટ આગામી નિર્ધારિત સ્કૅન
ચાલે ત્યાં સુધી જૂની, વધુ ઊંચી સંખ્યા વાંચતું રહે છે — તેથી સ્કૅન અપડેટ થાય ત્યાં સુધી તે
દરેક ખુલ્લી PR પર, સુધારો કરનાર PRની પોતાની અનુગામી PR સહિત, રિગ્રેશનનો અહેવાલ આપે છે.

**મેન્યુઅલ રિફ્રેશ**: `gh workflow run codeql.yml --ref release/vX.Y.Z` વિશ્લેષણ ફરી ચલાવે છે
અને થોડી મિનિટોમાં ચેતવણીઓ ફરી પ્રકાશિત કરે છે. પહેલાં `.github/workflows/codeql.yml`
વાંચો — તેનું હેડર સમજાવે છે કે તે માત્ર `workflow_dispatch` માટે જ છે, **કારણ કે તે
GitHubના "ડિફૉલ્ટ સેટઅપ" સાથે સંઘર્ષ કરે છે** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). `push`/`pull_request`/
`schedule` ટ્રિગર્સ પુનઃસ્થાપિત કરવા માટે પહેલાં **માલિકની કાર્યવાહી** જરૂરી છે: Settings → Code security →
CodeQL: Default → Advanced. આ સ્વિચ કર્યા વિના `schedule:` ટ્રિગર ઉમેરશો નહીં — તે
ફક્ત નિષ્ફળ રન ઉત્પન્ન કરશે.

**સંખ્યા ઘટ્યા પછી બેઝલાઇનને કડક બનાવો** — `node scripts/check/check-codeql-ratchet.mjs
--update` નવી માપેલી સંખ્યાને `quality-baseline.json` →
`metrics.codeqlAlerts.value`માં લખે છે, જેથી રૅચેટ જૂની મહત્તમ મર્યાદા સુધી પાછા જતા
રિગ્રેશનને ચૂપચાપ મંજૂરી ન આપે. કાર્યરત ઉદાહરણ (2026-09-02/03): PR #12502એ 7 વાસ્તવિક
ચેતવણીઓ સુધારી (13 → 6 માપેલી ખુલ્લી); PR #12530એ સ્થિર કરેલી બેઝલાઇનને 11 → 6 સુધી
કડક બનાવી જેથી તે મેળ ખાય; ત્યારબાદ બાકીની 6 ચેતવણીઓ દરેક ચેતવણી માટેના કારણ સાથે
નકારીને ખુલ્લી ચેતવણીઓની સંખ્યા 0 કરવામાં આવી.

**ચેતવણીઓને નકારવાનો નિર્ણય ઑપરેટરનો છે (કડક નિયમ #14)** — નકારવાની ટિપ્પણીમાં
તકનીકી કારણ નોંધ્યા વિના ક્યારેય CodeQL ચેતવણી નકારશો નહીં: અપસ્ટ્રીમ-પ્રોટોકોલની
જરૂરિયાત માટે `won't fix`, ટેસ્ટ ફિક્સચર માટે `used in tests`, અને CodeQL જોઈ ન શકે
એવા સેનિટાઇઝર માટે `false positive` (પૂર્વદૃષ્ટાંત: `docs/security/ERROR_SANITIZATION.md`).

---

## ટેસ્ટ રીટ્રાય નીતિ (WS5.4, v3.8.49)

રીટ્રાય દરેક રનર દીઠ છે, ક્યારેય વૈશ્વિક બ્લેન્કેટ નથી — બ્લેન્કેટ રીટ્રાય વાસ્તવિક રિગ્રેશન્સને
અદૃશ્ય ફ્લેક્સમાં ફેરવે છે:

| રનર              | નીતિ                                                                                                                      | કારણ                                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | માત્ર CIમાં `retries: 1`, અને સાથે `trace: on-first-retry`                                                                | બ્રાઉઝર/નેટવર્ક ટાઇમિંગ ખરેખર અનિર્ધારિત હોય છે; ટ્રેસ સાથેનો એક રીટ્રાય ફ્લેકને નિદાન કરી શકાય તેવી આર્ટિફેક્ટમાં ફેરવે છે |
| Vitest           | કોઈ વૈશ્વિક રીટ્રાય નહીં. સાબિત થયેલા ફ્લેકી ટેસ્ટને સ્પષ્ટ પ્રતિ-ટેસ્ટ રીટ્રાય મળે છે (diffમાં દૃશ્યમાન, PRમાં સમીક્ષિત) | ક્વોરન્ટીન સૂચિને repoમાં રાખે છે, ક્યારેય અપારદર્શક નહીં                                                                   |
| node:test (unit) | ક્યારેય કોઈ રીટ્રાય નહીં                                                                                                  | ફ્લેકી યુનિટ ટેસ્ટ એ ટેસ્ટમાં રહેલી બગ છે — તેને સુધારો, તેને ફરીથી ચલાવી નસીબ અજમાવશો નહીં                                 |

ફ્લેક ટેલિમેટ્રી ઉપલબ્ધ થયા પછીના લક્ષિત SLOs (WS5.2/5.3): પ્રતિ ટેસ્ટ <1% ફ્લેક દર
("હમણાં સુધારો" થ્રેશોલ્ડ), પ્રતિ પાઇપલાઇન ≥95% પાસ દર. ઉદ્યોગના સંદર્ભ મૂલ્યો —
આપણા પોતાના માપનોની સરખામણીએ ફરીથી કેલિબ્રેટ કરો.

## રિલીઝ-સ્તરનું રૅચેટ ડ્રિફ્ટ (WS5.5, v3.8.49)

જ્યારે કોઈ રૅચેટ (ફાઇલ-કદ, જટિલતા, eslint ચેતવણીઓ) શુદ્ધ રિલીઝ
ટિપ પર રિગ્રેસ થાય — એટલે કે, મર્જોના સંયોજને તેમાં રિગ્રેશન કર્યું હોય અને કોઈ એક PR પોતાની
બ્રાન્ચ પર સ્વતંત્ર રીતે રિગ્રેશન પુનઃઉત્પન્ન ન કરતો હોય — ત્યારે તેને સુધારવાની જવાબદારી
**રિલીઝ કૅપ્ટનની છે, એક વખત, રિલીઝ બ્રાન્ચ પર**: એક્સ્ટ્રેક્શન/રિફેક્ટરને પ્રાધાન્ય આપો;
માત્ર દસ્તાવેજીકૃત વાજબીપણાની એન્ટ્રી સાથે જ રિબેઝલાઇન કરો. સંયોજનથી થતા ડ્રિફ્ટને ક્યારેય
યોગદાનકર્તાના PR પર ન ધકેલો અને પ્રતિ-PR રિબેઝલાઇન ક્યારેય ન કરો (તે વાસ્તવિક રિગ્રેશન્સ છુપાવે છે).
પહેલા ભેદ પારખો: તમારા PRને કારણ માનતા પહેલાં પ્રોબ worktreeમાં શુદ્ધ ટિપ સામેની
લાલ સ્થિતિ પુનઃઉત્પન્ન કરો.

## રૅચેટના ઘટાડાને બેન્ક કરવું — નીચેની દિશા (#8584)

રૅચેટ માત્ર અર્ધ-સ્વચાલિત છે અને એ પણ ખોટો અર્ધભાગ છે. કૅપને **વધારવી** એ
દસ સેકન્ડ લેતો મેન્યુઅલ JSON ફેરફાર છે અને લાલ PRને અનબ્લોક કરવાની સૌથી ઝડપી રીત છે.
કૅપને **ઘટાડવા** માટે કોઈએ `--update` ચલાવીને પરિણામ કમિટ કરવું પડે છે — અને
`bank-ratchet-shrinks` જૉબ આવ્યા પહેલાં કોઈ workflow તેને ચલાવતું નહોતું. માપવામાં આવેલ પરિણામ
(2026-07-25): 800-લાઇનની નવી-ફાઇલ કૅપ જેટલી કે તેનાથી ઓછી લાઇન ધરાવતી 18 ફ્રોઝન ફાઇલો,
જેમાં સૌથી ખરાબ 132× હતી (`src/shared/validation/schemas.ts`, 19 લાઇન્સ માટે 2,523ની કૅપ);
જટિલતાની મહત્તમ મર્યાદા લગભગ 37 રિબેઝલાઇન નોંધો દરમિયાન `1794 → 2169` સુધી વધી, જેમાં
બરાબર એક ઘટાડો (−1) હતો; અને "આગલા ચક્રમાં `--update` દ્વારા કડક કરો" 31 વખત લખાયું અને
એક વખત અમલમાં મુકાયું. જે કૅપ તેને વાજબી બનાવનાર કોડ કરતાં વધુ સમય ટકી રહે છે, તે પૂર્ણ થયેલા
દરેક વિઘટનને ત્યારબાદ ફાઇલ સંપાદિત કરનાર માટે ચૂપચાપ વૃદ્ધિની છૂટમાં ફેરવે છે.

`nightly-release-green.yml` → જૉબ **`bank-ratchet-shrinks`** તે ચક્રને પૂર્ણ કરે છે:

|          |                                                                                                           |
| -------- | --------------------------------------------------------------------------------------------------------- |
| ચાલે છે  | `schedule` (દિવસમાં 3×) + `workflow_dispatch` — ઇરાદાપૂર્વક **`push` નહીં**                               |
| માપે છે  | સૌથી ઉચ્ચ `release/vX.Y.Z`, `release-green` જેવી જ રિઝોલ્યુશન + ઇન્જેક્શન ગાર્ડ                           |
| લખે છે   | `check:file-size --update` અને `check:complexity-ratchets --update` (બંને બંધારણ મુજબ માત્ર ઘટાડો કરે છે) |
| ચકાસે છે | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                  |
| મોકલે છે | રિલીઝ બ્રાન્ચ સામે હંમેશા અદ્યતન રહેતો એક PR — ફોર્સ-અપડેટ થાય છે, ક્યારેય સ્પૅમ થતો નથી                  |

બેન્કિંગ પ્રતિ-push કરવાને બદલે બૅચમાં થાય છે, કારણ કે તેની કોઈ લેટન્સી આવશ્યકતા નથી
(8 કલાકની અંદર બેન્ક થયેલો ઘટાડો સ્વીકાર્ય છે), જ્યારે પ્રતિ-મર્જ રન મર્જ અભિયાનો દરમિયાન
PR બ્રાન્ચને વારંવાર ફરીથી બિલ્ડ કરશે અને દરેક વખતે સંપૂર્ણ ESLint વૉકનો ખર્ચ કરશે.
શોધ `push` (`release-green`) પર ચાલુ રહે છે; માત્ર બેન્કિંગ બૅચમાં થાય છે.

### સુરક્ષા ચકાસણીકાર

જૉબ કોઈ દેખરેખ વિના બેઝલાઇન્સમાં લખે છે, તેથી `verify-ratchet-bank.mjs` જ તેને
સ્વીકાર્ય બનાવે છે. તે `HEAD` સામે `--update` પછીના ટ્રીનો diff કરે છે અને જ્યાં સુધી
દરેક ફેરફાર નીચેનામાંથી કોઈ એક ન હોય ત્યાં સુધી **કોઈ કમિટ અસ્તિત્વમાં આવે તે પહેલાં જ જૉબને
અબોર્ટ કરે છે** — અને કોઈ PR ખોલતું નથી:

- `frozen` / `testFrozen` સંખ્યાત્મક એન્ટ્રી **ઘટાડવામાં** અથવા **દૂર કરવામાં** આવી હોય
- `complexity-baseline.json` → `count` **ઘટાડવામાં** આવ્યું હોય
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **ઘટાડવામાં** આવ્યું હોય

બીજું કંઈપણ નિષ્ફળ જાય છે: સંખ્યા વધારવી, એન્ટ્રી ઉમેરવી, `cap`/`testCap` બદલવું અથવા
`_rebaseline_*` નોંધ કાઢી નાખવી/ફરી લખવી (આ નોંધો દરેક મહત્તમ મર્યાદા શા માટે અસ્તિત્વમાં છે
તેની ઑડિટ ટ્રેઇલ છે અને ફાઇલ એન્ટ્રીઓ સાથે એ જ `frozen` ઑબ્જેક્ટમાં સંગ્રહિત છે).
કૅપ વધારી શકે તેવો બૉટ વર્તમાન સ્થિતિ કરતાં નિશ્ચિતપણે વધુ ખરાબ હશે. રિગ્રેશન
ગાર્ડ: `tests/unit/verify-ratchet-bank.test.ts`.

જૉબ ક્યારેય `release/*` પર push કરતી નથી — કોઈ માનવી PR મર્જ કરે છે, તેથી ખોટું માપન
સમીક્ષા વિના સામેલ થઈ શકતું નથી.

## મંજૂર-યાદી નીતિ

પહેલેથી અસ્તિત્વમાં રહેલા ઉલ્લંઘનોને કારણે નિષ્ફળ ન થઈ શકે તેવો દરેક ગેટ સ્થિર મંજૂર-યાદીનો ઉપયોગ કરે છે
(દા.ત., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). નીતિ આ છે:

**મૂળ કારણ સુધારો; મંજૂર-યાદીનો ઉપયોગ માત્ર ત્યારે જ કરો જ્યારે ઉલ્લંઘન પહેલેથી અસ્તિત્વમાં હોય અને
તેને એ જ PRમાં સુધારી ન શકાય.**

મંજૂર-યાદીમાં એન્ટ્રી ઉમેરતી વખતે:

1. વાજબી કારણ દર્શાવતી ટિપ્પણી સામેલ કરો.
2. ટ્રેકિંગ ઇશ્યૂનો સંદર્ભ આપો (દા.ત., `// #3498 — તબક્કો 2 સુવિધા, હજુ અમલમાં મૂકાઈ નથી`).
3. ઉલ્લંઘન સુધારતા એ જ PRમાં એન્ટ્રી દૂર કરો — હવે કોઈ સક્રિય ઉલ્લંઘનને
   દબાવતી ન હોય તેવી જૂની એન્ટ્રી પોતે જ એક ખામી છે (એકવાર અમલમાં મૂકાયા પછી 6A.3 જૂના-અમલીકરણની તપાસ
   અનાથ મંજૂર-યાદી એન્ટ્રી પર ગેટને નિષ્ફળ કરશે).

પરીક્ષણો ઝડપથી પાસ કરાવવા માટે મંજૂર-યાદી એન્ટ્રીઓ ઉમેરશો **નહીં**. વધતી જતી
મંજૂર-યાદી સાથેનો લીલો ગેટ ગુણવત્તાની ખોટી ખાતરી આપે છે.

### જ્યારે તમારા PR પર કોઈ ગેટ નિષ્ફળ જાય

1. **ગેટનું આઉટપુટ ધ્યાનપૂર્વક વાંચો** — તે તમને ચોક્કસ જણાવે છે કે કઈ ફાઇલ અથવા સિમ્બલે
   નિયમનું ઉલ્લંઘન કર્યું છે.
2. **ઉલ્લંઘન સુધારો** — મોટાભાગના ગેટ નિર્ધારિત ફાઇલસિસ્ટમ તપાસો છે, જે કોડ સાચો
   થતાં જ પાસ થાય છે.
3. **જો ઉલ્લંઘન પહેલેથી અસ્તિત્વમાં હોય** (એટલે કે, તમે તેને રજૂ કર્યું નથી, પરંતુ હવે ગેટ
   તેને આવરે છે): વાજબી કારણ દર્શાવતી ટિપ્પણી અને ટ્રેકિંગ ઇશ્યૂ સાથે મંજૂર-યાદી એન્ટ્રી ઉમેરો.
4. **જો ગેટ રૅચેટ હોય** (કવરેજ, ESLint ચેતવણીઓ, પુનરાવર્તન, જટિલતા):
   તમારા ફેરફારે મેટ્રિકને ખરાબ બનાવ્યું છે. મૂળભૂત સમસ્યા સુધારો અથવા (ભાગ્યે જ)
   જો ફેરફાર ઇરાદાપૂર્વકનો હોય અને મેટ્રિકમાં થયેલો ઘટાડો સ્વીકાર્ય હોય, તો
   `npm run quality:ratchet -- --update` ચલાવો — પરંતુ PRના વર્ણનમાં તેનું કારણ દસ્તાવેજિત કરો.
5. **સલાહકારી ગેટ** (`continue-on-error: true`) માહિતીપ્રદ છે — તે મર્જને અવરોધતા
   નથી, પરંતુ CI સારાંશમાં દેખાય છે. તેમ છતાં તેમને સુધારો.

---

## નવો ગેટ ઉમેરવો

1. `scripts/check/check-<name>.mjs` (અથવા `.ts`) બનાવો. નીતિ ગેટ 0/1 સાથે બહાર નીકળે છે.
   રૅચેટ-શૈલીના ગેટ `collect-metrics.mjs` મારફતે `quality-metrics.json`માં મેટ્રિક લખે છે.
2. `package.json`માં `"check:<name>": "node scripts/check/check-<name>.mjs"` ઉમેરો.
3. તેને યોગ્ય જોબ હેઠળ `.github/workflows/ci.yml`માં જોડો
   (નીતિ → `lint` અથવા `docs-sync-strict`; રૅચેટ → `quality-gate`).
4. જો તેની પાસે મંજૂર-યાદી હોય, તો `scripts/check/lib/allowlist.mjs`માંથી
   `reportStaleEntries()` લાગુ કરો જેથી જૂની એન્ટ્રીઓ આપમેળે શોધાય.
5. ગેટના શોધ-તર્કને આવરી લેતું પરીક્ષણ `tests/unit/build/`માં લખો.
6. આ દસ્તાવેજ અપડેટ કરો (સંબંધિત જોબ ટેબલમાં એક પંક્તિ ઉમેરો).

---

## એજન્ટ ટૂલિંગ: LSP-ઇન-ધ-લૂપ (વૈકલ્પિક)

CI ગેટ ઉપરાંત, OmniRoute એક **વૈકલ્પિક** `agent-lsp` સ્કેફોલ્ડ પ્રદાન કરે છે
(પ્રોજેક્ટ-સ્તરનું `.mcp.json`, Fase 7 Task 15). કોડિંગ એજન્ટો માટે TypeScript ભાષા સર્વર
ઉપલબ્ધ કરાવવા `.mcp.json` બનાવો, જેથી તેઓ કોડ લખતા **પહેલાં** સિમ્બલ /
ડાયગ્નોસ્ટિક્સનું નિરાકરણ કરે — આ `typecheck:core`નું કમ્પાઇલ-બિફોર-ક્લેમ સાથી છે,
જે "કલ્પિત સિમ્બલ" ભૂલોને તેમના સ્ત્રોતે જ ઘટાડે છે. તેને ઇરાદાપૂર્વક આપમેળે લોડ કરવામાં
આવતું નથી (તમે MCP↔LSP બ્રિજ પસંદ કરીને ચકાસો છો); ખામીયુક્ત એન્ટ્રી માત્ર કનેક્શન ભૂલને
લૉગ કરે છે અને ક્યારેય સેશનોને વિક્ષેપિત કરતી નથી.

---

## તર્કસંગતીકરણ બેકલૉગ (ROI સમીક્ષા — તબક્કો 9 તરંગ 3)

આ ઇન્વેન્ટરીનું 2026-06-17ના રોજ `ci.yml` સાથે સમાધાન કરવામાં આવ્યું હતું (અગાઉના સંસ્કરણમાં
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence` રહી ગયા હતા). સમાધાન કરેલા સમૂહની ROI સમીક્ષાએ
નીચેના તર્કસંગતીકરણ ઉમેદવારો ઓળખ્યા. **મર્જ યાંત્રિક CI
ફેરફારો છે; ફ્લિપ/ડ્રૉપ એ ઑપરેટર માટે આરક્ષિત નીતિગત નિર્ણયો છે.** નીચેનામાંથી કશું પણ
હજુ લાગુ કરવામાં આવ્યું નથી.

**ઉપર દસ્તાવેજીકૃત ન થયેલું પણ** (સલાહરૂપ, ઓછું સિગ્નલ): `docs-lint` જૉબ
(markdownlint + Vale, સમગ્ર જૉબ માટે `continue-on-error`) અને સ્વતંત્ર સ્કૅનર વર્કફ્લો
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0`
`quality-baseline.json`માં છે, પરંતુ `ci.yml`માં કોઈ બ્લૉકિંગ રૅચેટ સાથે જોડાયેલું નથી — આ મેટ્રિક
હાલમાં અનાથ છે.

### મર્જ / ડીડુપ્લિકેશન (યાંત્રિક, ઓછું જોખમ)

દરેક ઉમેદવારને 2026-06-17ના રોજ લાઇવ ગેટની સ્થિતિ સામે માન્ય કરવામાં આવ્યો હતો (વિશ્વાસ કરો, પણ ચકાસો);
કેટલાક "સ્પષ્ટ" મર્જ વાસ્તવમાં છુપાયેલું ઋણ ધરાવતા હોવાનું બહાર આવ્યું અને તે **સ્વચ્છ ડ્રૉપ-ઇન નથી**.

- **`check:docs-sync` બે વખત ચાલે છે** — `lint` જૉબમાં સ્વતંત્ર રીતે અને ફરી `check:docs-all` (`docs-sync-strict`)ની અંદર તથા husky pre-commit hookમાં. ✅ **પૂર્ણ** — સ્વતંત્ર `lint` ઇન્વોકેશન દૂર કરવામાં આવ્યું.
- **CVE સ્કૅનિંગ** — ❌ **સ્વચ્છ મર્જ નથી.** `audit:deps` કોઈપણ high/critical CVE પર નિષ્ફળતા સાથે અટકે છે; `check:vuln-ratchet` (osv) માત્ર બેઝલાઇનની સરખામણીમાં _રીગ્રેશન_ થાય ત્યારે નિષ્ફળ જાય છે (હાલમાં 1 MODERATE). અર્થવિધિ અલગ છે — `audit:deps` દૂર કરવાથી નિરપેક્ષ high/critical ગેટ ખોવાઈ જશે. બંને રાખો.
- **સાઇકલ શોધ** — ❌ **સ્વચ્છ મર્જ નથી.** `check:circular-deps` (dpdm) **91 સાઇકલ** દર્શાવે છે (એટલે જ તે સલાહરૂપ છે); પહેલાં તેમનું નિરાકરણ કર્યા વિના તેને બ્લૉકિંગ તરીકે પ્રમોટ કરી શકાતું નથી, અને તેનો વ્યાપ લીલા, ક્યુરેટ કરેલા `check:cycles` કરતાં વધુ વિસ્તૃત છે. `check:cycles`ને બ્લૉકિંગ રાખો; 91 dpdm સાઇકલનું નિરાકરણ પોતે એક અલગ બેકલૉગ છે.
- **જટિલતા** — ✅ **પૂર્ણ** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): એક ESLint વૉક, ruleId પ્રમાણે ગણતરી કરે છે જેથી cyclomatic+max-lines અને cognitive બેઝલાઇન સ્વતંત્ર રહે; વ્યક્તિગત `check:complexity` / `check:cognitive-complexity` સ્થાનિક `--update` માટે યથાવત્ રહે છે.
- **`/api` એન્ટિ-હેલ્યુસિનેશન** — ✅ **પૂર્ણ** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): `src/app/api`ની એક FS ઇન્વેન્ટરી, openapi-routes + docs-symbols હજી પણ સ્વતંત્ર રીતે રિપોર્ટ કરે છે; વ્યક્તિગત ચેક્સ સ્થાનિક રન માટે યથાવત્ રહે છે.
- **`check:node-runtime` 11 જૉબમાં ચાલે છે** — ⚠️ **ઓછો ROI.** દરેક અલગ રનર છે અને ચેક <1s છે; સસ્તું પ્રતિ-જૉબ રક્ષણ ગુમાવવાની સામે કુલ બચત ~10s છે. આટલી ઉથલપાથલ યોગ્ય નથી.
- **CI lint પર `typecheck:noimplicit:core`** — ✅ **lint જૉબમાંથી દૂર કરાયું** (તે સલાહરૂપ `continue-on-error` હતું); બ્લૉકિંગ ટાઇપ સપાટી `typecheck:core` + `check:type-coverage` છે. સ્થાનિક સ્ક્રિપ્ટ જાળવી રાખવામાં આવી છે.

### ફ્લિપ / નિર્ણય (ઑપરેટર નીતિ)

- `check:openapi-security-tiers` (સલાહરૂપ) — ❌ **સ્વચ્છ રીતે ફ્લિપ કરી શકાય તેમ નથી.** તે 0 સાથે બહાર નીકળે છે, પરંતુ ચેતવણી આપે છે કે `LOCAL_ONLY_API_PREFIXES` હેઠળના કેટલાક `traffic-inspector` રૂટમાં `x-loopback-only: true` ઍનોટેશન નથી. તેને અમલમાં મૂકવા માટે પહેલાં `openapi.yaml`માં તે ઍનોટેશનો ઉમેરવા જરૂરી છે.
- `typecheck:noimplicit:core` (સલાહરૂપ) — મોટા ભાગે બ્લૉકિંગ `check:type-coverage` રૅચેટમાં સમાવિષ્ટ છે. તેને રૅચેટમાં ફ્લિપ કરો અથવા વધારાનો બિનજરૂરી બીજો `tsc` પાસ દૂર કરો.
- `test:vitest:ui` (હવે **બ્લૉકિંગ**) — અગાઉથી રહેલી નિષ્ફળતાઓને `vitest.config.ts`માં `// #8618` ટ્રૅકિંગ ટિપ્પણીઓ સાથે સ્પષ્ટ રીતે બાકાત રાખવામાં આવી છે; નવી નિષ્ફળતાઓ જૉબને નિષ્ફળ બનાવે છે.
- `check:secrets` (gitleaks, 3 દસ્તાવેજીકૃત false-positive પર સ્થિર કરાયેલું બ્લૉકિંગ રૅચેટ) — 0 સુધી પહોંચવા માટે 3ને allowlistમાં ઉમેરો અથવા તેને સલાહરૂપ તરીકે ડિમોટ કરો. GitHubના મૂળ secret-scanning + `check:public-creds` સાથે ઓવરલેપ થાય છે.
- `check:pr-evidence` (બ્લૉકિંગ, PR-body ગદ્યને greps કરે છે) — false-positiveનું જોખમ ઊંચું છે; તેને દૂર કરવાથી Hard Rule #18નો અમલ નબળો પડે છે, તેથી આ એક વાસ્તવિક નીતિગત નિર્ણય છે.
- `semgrep` (સલાહરૂપ સ્વતંત્ર) — OWASP પરિવારો માટે CodeQL સાથે ઓવરલેપ થાય છે; તેની બેઝલાઇનને રૅચેટ સાથે જોડો અથવા તેને દૂર કરો.

---

## સંબંધિત દસ્તાવેજીકરણ

- સપ્લાય-ચેઇન (પ્રોવેનન્સ, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — કી-સેટ સમાનતા ગેટ

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, જોબ `i18n-ui-coverage`).
દરેક `src/i18n/messages/<locale>.json`ના લીફ કી સેટની `en.json` સાથે તુલના કરે છે અને
કી ક્યારે ઉમેરાઈ હતી તેની પરવા કર્યા વિના, કોઈપણ ગેરહાજર અથવા વધારાની લીફ મળતાં નિષ્ફળ જાય છે.
`__MISSING__:` પ્લેસહોલ્ડર્સ હાજર ગણાય છે (તેમની સામગ્રી રેશિયો ગેટનો વિષય છે). આ બે
ડિફ-આધારિત/ટકાવારી ગેટ્સનું સંપૂર્ણ પૂરક છે: `check-ui-keys-coverage` દરેક locale માટે
80 %ની લઘુતમ મર્યાદા લાગુ કરે છે (~13,000માંથી 43 કી ગેરહાજર હોય તો પણ 99.7 % દર્શાય છે)
અને `check-new-key-coverage` માત્ર PR દ્વારા `en.json`માં ઉમેરાયેલી કીનું મૂલ્યાંકન કરે છે.
locale બૅચ તેની બ્રાન્ચ કાપવામાં આવે તે દિવસના `en.json` પરથી જનરેટ થાય છે અને બેઝમાં
કી ઉમેરાતી રહે ત્યારે ઘણા દિવસો સુધી અનુવાદ કરે છે; બૅચ PR પોતે કોઈ કી ઉમેરતો નથી, તેથી
બૅચ 1 (#13044) નવ localesમાં 43 કી ઓછી અને બૅચ 2 (#13660) આઠમાં 10 કી ઓછી સાથે
મર્જ થયા ત્યારે (2026-09-15) બંને સહગેટ મૌન રહ્યાં. લાલ નિષ્ફળતા સુધારવા માટે
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers` ચલાવો; `extra` લીફનો
અર્થ છે કે સ્રોતમાંથી તે દૂર કરવામાં આવી છે — તેને localeમાંથી કાઢી નાખો. `--warn` નિષ્ફળ કર્યા
વિના અહેવાલ આપે છે. `--catalog=cli` એ જ તુલના `bin/cli/locales` પર ચલાવે છે
(`npm run i18n:check-keys:cli`); બંને પગલાં જોબ `i18n-ui-coverage`માં છે.

#### `check-new-key-coverage` — નવી-કી i18n ગેટ

`check-ui-value-drift`નું સહગેટ. તે એવા અંગ્રેજી મૂલ્યને પકડે છે જે **ફરી લખાયું** હોય
પરંતુ તેના અનુવાદો પાછળ રહી ગયા હોય; આ ગેટ એવી અંગ્રેજી કીને પકડે છે જે **ઉમેરાઈ** હોય
પરંતુ કેટલાક localesને ક્યારેય મળી ન હોય.

`check-ui-keys-coverage` આ પ્રકારની સમસ્યા જોઈ શકતું નથી: તે દરેક locale માટે ટકાવારીની
લઘુતમ મર્યાદા લાગુ કરે છે, અને ~13,000 લીફમાંથી અગિયાર કી ગેરહાજર હોય તો કવરેજ 99.9% રહે છે.
ભાષા દીઠ ટકાવારીથી "આ સુવિધા અનુવાદ વિના રિલીઝ થઈ" વ્યક્ત કરી શકાતું નથી — નવી localeમાં
સમગ્ર સુવિધા કોઈપણ ટેક્સ્ટ વિના ઉમેરાઈ શકે છે અને આ આંકડો ક્યારેય બદલાતો નથી.

તે જે ઘટનાને અંકિત કરે છે: Orchestration Canvasના તબક્કા 3માં તે સમયે અસ્તિત્વ ધરાવતા
42 localesમાં તેની અગિયાર કીનો અનુવાદ કરવામાં આવ્યો હતો. થોડા કલાકો પછી EU-ભાષા બૅચ
(#13044) રિપોઝિટરીને 51 locales સુધી લઈ ગઈ, અને નવ નવા locales (`el`, `et`, `ga`, `hr`,
`lt`, `lv`, `mt`, `sl`, `sr`)ને એ કી ક્યારેય મળી નહીં. ગેરહાજર કી માટે `deepMergeFallback`
અંગ્રેજી મૂકે છે, તેથી નિષ્ફળતાનું સ્વરૂપ ખાલી UIને બદલે અનુવાદ વિનાનું UI હતું — વાસ્તવિક,
અને રચનાત્મક રીતે મૌન.

તેના સહગેટની જેમ આ પણ **ડિફ-અવેર** છે, જે મર્જ બેઝ પરના અંગ્રેજીની વર્કિંગ ટ્રી સાથે
તુલના કરે છે, તેથી અગાઉથી અસ્તિત્વ ધરાવતી ખામીઓ સ્થિર રહે છે અને ગેટ ચાલુ કરવા માટે કોઈ
માઇગ્રેશનની જરૂર પડી નહોતી.

**`__MISSING__:<english>` માર્કર તેને સંતોષતું નથી (2026-09-17થી).** અગાઉ તે દસ્તાવેજીકૃત
મુલતવીકરણ હતું — રનટાઇમ યોગ્ય અંગ્રેજી પર ફૉલબૅક કરે છે — પરંતુ 2026-09-16ના આઠ ફીચર
PRએ 61 કી ઉમેરી અને અનુવાદ કરવાને બદલે તમામ 65 localesમાં માર્કર મૂકી દીધું: આ ગેટે
દરેકને સ્વીકારી લીધું, PRને કંઈએ અવરોધ્યો નહીં, અને ત્યારબાદ અવરોધક વાસ્તવિક-અનુવાદ રેશિયો
ગેટ દરેક માટે રિલીઝ ટિપ પર નિષ્ફળ ગયો (pt-BR 3.2 % > 2.5 % + 0.5). હવે માર્કરને ગેરહાજર
અનુવાદ તરીકે મૂલવવામાં આવે છે. લાલ નિષ્ફળતા સુધારવા માટે
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40` ચલાવો,
અથવા `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`, detached-safe,
`OMNIROUTE_TRANSLATION_*` env વિના શરૂ થવાનો ઇનકાર કરે છે) વડે તમામ localesને સમાંતરમાં
ચલાવો. જે કી અંગ્રેજીમાં જ રહેવી આવશ્યક હોય (નિશ્ચિત કરેલું પ્રોડક્ટ/એન્જિન/ફ્લૅગ નામ) તે
`scripts/i18n/untranslatable-keys.json`માં હોવી જોઈએ, માર્કર પાછળ ક્યારેય નહીં. `vi`માં
માર્કર્સ પર સંપૂર્ણ પ્રતિબંધ છે (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — સ્થગિત-ટેસ્ટ ગેટ

`vitest.config.ts`ની `exclude` સૂચિમાં રહેલી ફાઇલ એવો ટેસ્ટ છે જે ચાલતો નથી, અને ટ્રી
વાંચનારને તે કવરેજ જેવો દેખાય છે. બાસઠ ફાઇલો
`// #8618 — pre-existing failure; remove this exclusion when fixed` ટિપ્પણી પાછળ એકઠી થઈ.
Issue #8618ને 2026-08-11ના રોજ બંધ કરવામાં આવ્યો હતો, જ્યારે તે ટ્રૅક કરતી સૂચિ 45 એન્ટ્રીથી
વધીને 62 થઈ ગઈ હતી, અને દરેક નવી એન્ટ્રીને બંધ થઈ ચૂકેલા issue તરફ નિર્દેશ કરતી ટિપ્પણી
વારસામાં મળી હતી. આખરે જ્યારે સૂચિને ફાઇલ દીઠ માપવામાં આવી (#13204), ત્યારે **62માંથી 51
ફાઇલો વર્તમાન ટ્રી સામે કોઈપણ સ્રોત ફેરફાર વિના પાસ થઈ**.

ગેટ માટે જરૂરી છે કે વાસ્તવિક ફાઇલમાં રિઝોલ્વ થતું દરેક exclusion (a) ટ્રૅકિંગ issueનું નામ આપે
અને (b) તેની માપેલી સ્થિતિ સાથે `config/quality/vitest-exclusions.json`માં દેખાય, જેથી એક વધુ
લાઇન 60-એન્ટ્રીવાળા ઍરેમાં ઉમેરવાને બદલે exclusion ઉમેરવું સમર્પિત ફાઇલમાં સમીક્ષા કરી શકાય
તેવું ડિફ બને. તે ઇરાદાપૂર્વક બાકાત રાખેલા ટેસ્ટ ફરી ચલાવતું નથી — તેમાં ~10 મિનિટ લાગે છે
અને તે આવર્તક જોબમાં હોવું જોઈએ; ઇન્વેન્ટરી દરેકને છેલ્લે ક્યારે માપવામાં આવ્યું હતું તે નોંધે છે.
