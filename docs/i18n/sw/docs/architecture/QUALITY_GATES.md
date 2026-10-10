# Quality Gates Reference (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/QUALITY_GATES.md) · 🇪🇹 [am](../../../am/docs/architecture/QUALITY_GATES.md) · 🇸🇦 [ar](../../../ar/docs/architecture/QUALITY_GATES.md) · 🇦🇿 [az](../../../az/docs/architecture/QUALITY_GATES.md) · 🇧🇬 [bg](../../../bg/docs/architecture/QUALITY_GATES.md) · 🇧🇩 [bn](../../../bn/docs/architecture/QUALITY_GATES.md) · 🇧🇦 [bs](../../../bs/docs/architecture/QUALITY_GATES.md) · 🇨🇿 [cs](../../../cs/docs/architecture/QUALITY_GATES.md) · 🇩🇰 [da](../../../da/docs/architecture/QUALITY_GATES.md) · 🇩🇪 [de](../../../de/docs/architecture/QUALITY_GATES.md) · 🇬🇷 [el](../../../el/docs/architecture/QUALITY_GATES.md) · 🇪🇸 [es](../../../es/docs/architecture/QUALITY_GATES.md) · 🇪🇪 [et](../../../et/docs/architecture/QUALITY_GATES.md) · 🇮🇷 [fa](../../../fa/docs/architecture/QUALITY_GATES.md) · 🇫🇮 [fi](../../../fi/docs/architecture/QUALITY_GATES.md) · 🇫🇷 [fr](../../../fr/docs/architecture/QUALITY_GATES.md) · 🇮🇪 [ga](../../../ga/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [gu](../../../gu/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ha](../../../ha/docs/architecture/QUALITY_GATES.md) · 🇮🇱 [he](../../../he/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [hi](../../../hi/docs/architecture/QUALITY_GATES.md) · 🇭🇷 [hr](../../../hr/docs/architecture/QUALITY_GATES.md) · 🇭🇺 [hu](../../../hu/docs/architecture/QUALITY_GATES.md) · 🇦🇲 [hy](../../../hy/docs/architecture/QUALITY_GATES.md) · 🇮🇩 [id](../../../id/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [ig](../../../ig/docs/architecture/QUALITY_GATES.md) · 🇮🇹 [it](../../../it/docs/architecture/QUALITY_GATES.md) · 🇯🇵 [ja](../../../ja/docs/architecture/QUALITY_GATES.md) · 🇬🇪 [ka](../../../ka/docs/architecture/QUALITY_GATES.md) · 🇰🇭 [km](../../../km/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [kn](../../../kn/docs/architecture/QUALITY_GATES.md) · 🇰🇷 [ko](../../../ko/docs/architecture/QUALITY_GATES.md) · 🇱🇹 [lt](../../../lt/docs/architecture/QUALITY_GATES.md) · 🇱🇻 [lv](../../../lv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ml](../../../ml/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [mr](../../../mr/docs/architecture/QUALITY_GATES.md) · 🇲🇾 [ms](../../../ms/docs/architecture/QUALITY_GATES.md) · 🇲🇹 [mt](../../../mt/docs/architecture/QUALITY_GATES.md) · 🇲🇲 [my](../../../my/docs/architecture/QUALITY_GATES.md) · 🇳🇵 [ne](../../../ne/docs/architecture/QUALITY_GATES.md) · 🇳🇱 [nl](../../../nl/docs/architecture/QUALITY_GATES.md) · 🇳🇴 [no](../../../no/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [or](../../../or/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [pa](../../../pa/docs/architecture/QUALITY_GATES.md) · 🇵🇭 [phi](../../../phi/docs/architecture/QUALITY_GATES.md) · 🇵🇱 [pl](../../../pl/docs/architecture/QUALITY_GATES.md) · 🇵🇹 [pt](../../../pt/docs/architecture/QUALITY_GATES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/QUALITY_GATES.md) · 🇷🇴 [ro](../../../ro/docs/architecture/QUALITY_GATES.md) · 🇷🇺 [ru](../../../ru/docs/architecture/QUALITY_GATES.md) · 🇱🇰 [si](../../../si/docs/architecture/QUALITY_GATES.md) · 🇸🇰 [sk](../../../sk/docs/architecture/QUALITY_GATES.md) · 🇸🇮 [sl](../../../sl/docs/architecture/QUALITY_GATES.md) · 🇷🇸 [sr](../../../sr/docs/architecture/QUALITY_GATES.md) · 🇸🇪 [sv](../../../sv/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [ta](../../../ta/docs/architecture/QUALITY_GATES.md) · 🇮🇳 [te](../../../te/docs/architecture/QUALITY_GATES.md) · 🇹🇭 [th](../../../th/docs/architecture/QUALITY_GATES.md) · 🇹🇷 [tr](../../../tr/docs/architecture/QUALITY_GATES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/QUALITY_GATES.md) · 🇵🇰 [ur](../../../ur/docs/architecture/QUALITY_GATES.md) · 🇺🇿 [uz](../../../uz/docs/architecture/QUALITY_GATES.md) · 🇻🇳 [vi](../../../vi/docs/architecture/QUALITY_GATES.md) · 🇳🇬 [yo](../../../yo/docs/architecture/QUALITY_GATES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/QUALITY_GATES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/QUALITY_GATES.md)

---

Hati hii ndiyo rejeleo rasmi la vizuizi vyote vya ubora vya CI katika OmniRoute.
Inaeleza kila kizuizi, kile kinachothibitisha, kazi ya CI ambamo kinaendeshwa, iwapo kinatumia
msingi wa ratchet au sera ya kufaulu/kufeli, na iwapo kinazuia uundaji au ni cha ushauri.

Kwa muhtasari mfupi na sera ya orodha ya kuruhusu, angalia sehemu ya "Vizuizi vya Ubora na Ratchet"
katika `AGENTS.md`. Kwa tathmini ya kina, uainishaji wa ukomavu, na mpango usiotegemea zana mahususi
wa kuiga mfumo huo huo, angalia
[Mwongozo wa Vizuizi vya Ubora](../ops/QUALITY_GATE_PLAYBOOK.md).

---

## Orodha ya malango na wasifu wa utekelezaji

### Kukubaliwa kwa mgombea

Mitiririko ya kazi ya CI na Quality Gates kila mmoja hutoa uamuzi thabiti: `Gate / CI` na
`Gate / Quality`. Sera yao ya kukubali yenye matoleo huorodhesha kila kazi ya awali
kuwa ya lazima au ya ushauri. Kazi husika ya lazima lazima ifanikiwe: matokeo
yanayokosekana, yaliyoghairiwa, yaliyorukwa, yanayosubiri na yasiyojulikana hayawezi kuthibitisha PASS. Uainishaji halali
wa docs-only au catalog-only unaweza kufanya njia ya msimbo isihusike;
PR ya rasimu si mgombea anayekubalika. Lebo ya `hotfix` haiondoi hitaji la ushahidi.

Mitiririko yote miwili ya kazi inahusisha PR na usukumaji kwenda kwenye matawi ya main/release, uanzishaji wa
mikono na matukio ya merge-group. Usukumaji, uanzishaji na merge-group hutekeleza uteuzi kamili. Forks
na merge groups hutumia hosted runners kwa kazi ambazo vinginevyo huchagua self-hosted
runners; uwezo wa kutosha wa hosted lazima uthibitishwe kabla ya kusambaza mabadiliko.

Kila risiti ya JSON hutambulisha SHA iliyochukuliwa, utekelezaji wa mtiririko wa kazi na jaribio.
CLI hukataa kutolingana kwa SHA ya checkout/event. Majaribio ya mtiririko wa kazi hufungamanisha uanachama wa sera
na orodha ya `needs` ya kazi ya uamuzi ili njia mpya au iliyoondolewa isipotee bila kutambuliwa.
Risiti hushughulikia mtiririko wake wenyewe wa kazi, si uchapishaji, upelekaji, au utendaji wa ndani
wa kichanganuzi kilichopo cha ushauri. Kuwasha majina yote mawili ya ukaguzi katika kanuni za tawi ni
badiliko tofauti la kiutawala; kuongeza kazi hizi hakulindi tawi moja kwa moja.

### Orodha ya uchanganuzi tuli

Orodha ya npm-alias yenye matoleo na uanachama wa uchanganuzi tuli vinapatikana katika
`config/quality/gate-manifest.json`. Tekeleza `npm run check:gate-manifest` ili kuthibitisha
majina ya script na amri halisi dhidi ya `package.json`; nyongeza, uondoaji na
mabadiliko ya amri husababisha hook ya ndani na kazi za uainishaji wa mabadiliko katika CI kushindwa.
Alias si kazi ya mtiririko wa kazi, instance ya matrix au test case: hesabu hizi hazipaswi
kuwasilishwa kana kwamba zinaweza kubadilishana.

Tumia `npm run quality:scan -- --list` au `npm run quality:scan:fast -- --list`
kukagua aliases zilizochaguliwa bila kuzitekeleza. Runner huanzisha
npm entrypoint, hivyo runtime yake (ikiwemo Bun pale iliposanidiwa) huhifadhiwa.
Manifest hurekodi aliases zilizo nje ya wasifu huo kuwa zinaanzishwa kivyake, na
amri za matengenezo zimepigwa marufuku katika wasifu wa uchanganuzi wa kusoma pekee.

Wasifu huu unahusu uchanganuzi tuli pekee. Hauthibitishi majaribio ya bidhaa,
coverage, packaging, ukaguzi wa nje au ukubalifu kamili wa mgombea kwa toleo.
Ukubalishaji wa mtiririko wa kazi hutumia `config/quality/admission-policy.json` iliyounganishwa na
`scripts/quality/admission-verdict.mjs`. Wasifu wa release-observer unasalia tofauti;
kagua ukaguzi na risiti zake husika kivyake. Orodha ya maelezo
iliyo hapa chini ni rejeleo, si uthibitisho kwamba lango lilitekelezwa.

Scripts zinapatikana chini ya `scripts/check/` (malango ya sera) na `scripts/quality/` (injini ya ratchet).
Chanzo rasmi cha CI ni `.github/workflows/ci.yml`.

### Njia ya haraka ya PR ya toleo (`quality.yml`)

`.github/workflows/quality.yml` hukamilisha CI kwenye PR za main/release, usukumaji kwenye matawi
yanayolindwa, uanzishaji na merge groups. PR hutumia ukaguzi wa haraka uliochujwa kulingana na path. Build nakala
iliyozimwa kabisa iliondolewa; ukaguzi halisi wa build/package/boot unasalia katika CI.

| Kazi                                             | Upeo                                                                                                                                                                                                                                           | Inazuia              |
| ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| `Docs Gates (fast-path)`                         | PR za docs/code; marejeleo ya API docs na docs-all                                                                                                                                                                                             | Ndiyo                |
| `Fast Quality Gates`                             | PR za msimbo; ukaguzi tuli, typecheck, typecheck ya dashboard, unit tests zilizoathiriwa                                                                                                                                                       | Ndiyo                |
| `Forgotten sibling tests`                        | PR za msimbo; moduli zilizobadilishwa zinazofuatiliwa hadi kwa watumiaji tuli na sibling tests zinazoweza kuchaguliwa; njia za barrel na dynamic-import huripotiwa kama uchunguzi wa ushauri, pamoja na vighairi vya allowlist vilivyorejelewa | **Ushauri**          |
| `Vitest (fast-path)`                             | PR za msimbo; mkusanyiko wa haraka wa vitest                                                                                                                                                                                                   | Ndiyo                |
| `Unit Tests fast-path`                           | PR za msimbo; mkusanyiko wa unit wa shards 4                                                                                                                                                                                                   | Ndiyo                |
| `No new ESLint warnings`                         | PR za msimbo; kinga ya lint inayozingatia suppressions                                                                                                                                                                                         | Ndiyo, ikiwemo forks |
| `Merge integrity (changelog + generated skills)` | PR zisizo rasimu; ulandanishaji wa changelog na skill zilizozalishwa                                                                                                                                                                           | Ndiyo, ikiwemo forks |

#### Ripoti ya forgotten sibling tests

`npm run check:forgotten-sibling-tests` hutumia tena import resolver iliyo nyuma ya ramani ya athari za majaribio.
Kwa kila moduli ya uzalishaji iliyobadilishwa, huripoti misururu thabiti ya
`changed module/symbol -> static consumer -> candidate sibling test` wakati test inayoweza kuchaguliwa
haipo katika tofauti ya pull-request. Muhtasari wa Markdown na matokeo ya JSON huhifadhiwa kama
artifact ya mtiririko wa kazi ya `forgotten-sibling-tests` kwa ajili ya usawazishaji kabla ya utekelezaji wowote wa kuzuia.

Uhamishaji upya wa barrel na uingizaji wa kidinamiki ni uchunguzi wa utatuzi pekee; kamwe hauleti
ugunduzi unaozuia. Vighairi vilivyokaguliwa vinapatikana katika
`config/quality/forgotten-sibling-allowlist.json`. Kila ingizo lazima litaje jaribio la mtumiaji na la mgombea,
litoe sababu mahususi, na liunganishe suala au ombi la kuvuta la GitHub. Maingizo yenye muundo usio sahihi hushindwa
kwa hali funge. Vighairi haviwezi kuficha jaribio la mgombea lililofutwa au tofauti inayoongeza `.skip`/`.todo`;
udhoofishaji wa madai na ufichaji mwingine unasalia chini ya lango la
`check:test-masking` linalozuia kwa kujitegemea.

### Kazi: `lint`

Huendeshwa kwa kila PR kwenda `main`. Huzuia uunganishaji inaposhindwa.

| Hati (`npm run ...`)              | Huthibitisha                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Inazuia                                 |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| `check:node-runtime`              | Toleo la Node.js liko ndani ya masafa yanayotumika                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ndiyo                                   |
| `check:cycles`                    | Uingizaji wa mzunguko katika `src/` + `open-sse/` yote (unategemea AST, `paths` za tsconfig zimetatuliwa). Bare = ushauri, huorodhesha mizunguko. `check:cycles:ratchet` (kile ambacho CI huendesha) huzuia idadi inapozidi kikomo cha `metrics.cycles` katika `quality-baseline.json` — kwa sasa 14, `direction: down`, kwa hivyo inaweza kupungua pekee (#15159 G-01/G-02)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ndiyo (ratchet)                         |
| `check:route-validation:t06`      | Schema za Zod zipo kwenye route zote (sera ya Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ndiyo                                   |
| `check:any-budget:t11`            | Idadi ya `@ts-expect-error // any` haizidi bajeti (catraca ya Tier 11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ndiyo                                   |
| `check:provider-consistency`      | Kila mtoa huduma katika `providers.ts` ana ingizo linalolingana katika `providerRegistry.ts` (na kinyume chake, ndani ya orodha ya kuruhusu)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Ndiyo                                   |
| `check:model-lifecycle`           | Majedwali matatu ya uelekezaji yanayotunzwa kwa mkono yanaendelea kuendana na picha ya hali ya mzunguko wa maisha iliyohifadhiwa (#11503): `FITNESS_TABLE` (`taskFitness.ts`) haitoi alama kwa kitambulisho chochote kilichostaafishwa ambacho `REGISTRY` inaweza kuelekeza; kila lengo la `BUILT_IN_ALIASES` lipo katika `REGISTRY` na halipo katika picha ya hali ya vitambulisho vilivyostaafishwa; kila kitambulisho kilichostaafishwa ambacho bado kipo katika `REGISTRY` kinaelekezwa mbele au kimeorodheshwa katika `allowedRetiredInCatalog`; na hakuna chanzo wala lengo la `DEFAULT_DEGRADATION_MAP` linaloonekana kuwa limestaafishwa katika picha hiyo ya hali. Hili halithibitishi kwamba modeli kwa sasa inahudumiwa na chanzo hai cha juu. Nje ya mtandao — hulinganisha dhidi ya `config/quality/model-lifecycle.json`, inayosasishwa kwa mkono kwa kutumia `npm run quality:refresh-model-lifecycle` (mtandao; haijaunganishwa katika CI). `allowedRetiredInCatalog` ni utaratibu wa kupunguza hatua kwa hatua: ongeza ingizo tu likiwa na suala la ufuatiliaji. | Ndiyo                                   |
| `check:fetch-targets`             | Kila `fetch("/api/...")` katika `src/` ya upande wa mteja hutatuliwa hadi `route.ts` halisi                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Ndiyo                                   |
| `check:deps`                      | Vitegemezi vyote vinavyoweza kusakinishwa kwa `npm install` katika kila `package.json` kwenye hifadhi vipo katika `dependency-allowlist.json`; vifurushi vipya visivyofungwa kwa toleo maalum au vilivyosajiliwa kwa jina linalofanana kimakusudi vinawekewa alama                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | Ndiyo                                   |
| `audit:deps`                      | `npm audit` (mzizi + electron) — hakuna tahadhari za kiwango cha juu/hatari sana (inaingiliana na osv `check:vuln-ratchet`; angalia Orodha ya Masuala ya Kuratibiwa)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ndiyo                                   |
| `check:lockfile`                  | Uadilifu wa `package-lock.json` — sajili ya https, heshi za uadilifu, hakuna ubatilishaji wa seva mwenyeji                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Ndiyo                                   |
| `check:licenses`                  | Orodha ya leseni za SPDX zinazoruhusiwa kwa vitegemezi vya uzalishaji                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Ndiyo                                   |
| `check:tracked-artifacts`         | Hakuna mabaki ya ujenzi / viungo vya ishara vya `node_modules` vilivyowekwa kwenye hazina (pia huendeshwa katika husky pre-commit; pre-push imefanywa kuwa nyepesi kimakusudi — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Ndiyo                                   |
| `check:ai-attribution`            | Hakuna kionjo cha `Co-Authored-By` cha AI/boti au kijachini cha uzalishaji wa AI katika commit, kichwa au maelezo ya PR — Kanuni Ngumu #16 (katika mzunguko wa ukaguzi wa haraka wa `quality.yml` kwa PR→`release/**` — husoma payload ya tukio, haifanyi chochote nje ya PR — na hatua ya PR pekee katika lint ya `ci.yml` kwa PR→`main`; pia hook ya husky `commit-msg`; waandishi-wenza binadamu wanaruhusiwa; #14436)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `check:vitest-exclusions`         | Kila utengaji wa Vitest hutaja suala la ufuatiliaji na huonekana katika `config/quality/vitest-exclusions.json` (#13204)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Ndiyo                                   |
| `check:file-size`                 | Hakuna faili ya msimbo chanzo inayozidi kikomo cha kila kiendelezi (ratchet: faili kubwa zilizogandishwa katika orodha ya `frozen`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Ndiyo                                   |
| `check:error-helper`              | Majibu ya hitilafu katika vitekelezaji/vishughulikiaji hutumia `buildErrorBody()` / `sanitizeErrorMessage()` (Kanuni Ngumu #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Ndiyo                                   |
| `check:migration-numbering`       | Faili za SQL za uhamishaji zimepewa nambari kwa mfuatano, bila mapengo au marudio                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Ndiyo                                   |
| `check:public-creds`              | Hakuna OAuth `client_id`/`client_secret` halisi au funguo za Firebase Web nje ya `publicCreds.ts` (Kanuni Ngumu #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ndiyo                                   |
| `check:db-rules`                  | Hakuna SQL ghafi nje ya moduli za `src/lib/db/`; hakuna uingizaji wa pamoja kutoka `localDb.ts` (Kanuni Ngumu #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ndiyo                                   |
| `check:known-symbols`             | Vitekelezaji vya watoa huduma, mikakati ya uelekezaji, na vitafsiri vilivyosajiliwa katika majedwali yao ya usambazaji vinalingana na faili kwenye diski — hakuna alama zisizo na faili husika au ambazo hazijatangazwa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Ndiyo                                   |
| `check:route-guard-membership`    | Kila njia inayozindua mchakato mtoto imeainishwa na `isLocalOnlyPath()` (Kanuni Ngumu #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Ndiyo                                   |
| `check:test-discovery`            | Kila faili ya `*.test.ts` / `*.spec.ts` katika hazina inakusanywa na angalau kiendeshaji kimoja cha majaribio (ratchet: orodha ya faili zisizokusanywa katika `test-discovery-baseline.json` inaweza kupungua pekee)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Ndiyo                                   |
| `check:agent-skills-sync`         | Artifakti zilizozalishwa za agent-skills zinalingana na katalogi yao chanzo (hakuna kupotoka)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `check:provider-asset-provenance` | Nembo/rasilimali za watoa huduma zina ingizo la asili lililorekodiwa                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `lint:json`                       | Faili za usanidi wa JSON zinachanganuliwa na kukidhi kanuni za lint za repo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `typecheck:core`                  | Ukusanyaji wa TypeScript bila hitilafu (maonyo ya ushauri pekee)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Ndiyo                                   |
| `typecheck:noimplicit:core`       | `noImplicitAny` kali — inalenga siku zijazo; maeneo mengi ya mwito yaliyokuwepo tayari bado yanahitaji maelezo ya aina                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | **Ushauri** (`continue-on-error: true`) |
| `check:dashboard-typecheck`       | `tsc` inayolenga `src/app/(dashboard)/**` (#7033) — orodha iliyoruhusiwa ya faili 27 iliyochaguliwa kwa `typecheck:core` haijumuishi TSX yoyote ya dashibodi, na `next build` pia haiikagui aina kamwe (`next.config.mjs` huweka `ignoreBuildErrors: true`), kwa hivyo hitilafu za utambulisho usio na marejeleo huko (#6625/#6909) hazikuonekana kwa CI. Hulinganisha tofauti dhidi ya msingi uliogandishwa wa idadi kwa kila faili/kila msimbo wa TS (`config/quality/dashboard-typecheck-baseline.json`, muundo uleule wa utekelezaji dhidi ya hali iliyopitwa na wakati kama `check:known-symbols`) — ni hitilafu MPYA pekee zinazozidi idadi ya msingi zinazofanya lango lishindwe; punguza msingi hatua kwa hatua kwa `--update` hitilafu iliyokuwepo tayari inaporekebishwa.                                                                                                                                                                                                                                                                                               | Ndiyo                                   |

### Kazi: `quality-gate`

Huendeshwa baada ya `test-coverage`. Huzuia uunganishaji ikishindwa.

| Skripti                      | Huthibitisha                                                                                                                                                                                               | Inazuia                  |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| `quality:collect`            | Hutoa `quality-metrics.json` (idadi ya maonyo ya ESLint, kiwango cha ufunikaji kutoka kwenye ripoti iliyounganishwa ya shard)                                                                              | Ndiyo (kabla ya ratchet) |
| `quality:ratchet`            | Kila kipimo katika `quality-baseline.json` hakijarudi nyuma (maonyo ya ESLint ≤ kiwango cha msingi; ufunikaji ≥ kiwango cha msingi)                                                                        | Ndiyo                    |
| `check:duplication`          | Urudiaji wa msimbo (jscpd@4) hauzidi kiwango cha msingi katika `quality-baseline.json`                                                                                                                     | Ndiyo                    |
| `check:complexity`           | Utata wa kisiklomati katika kiwango cha faili hauzidi kikomo (ESLint ya msingi `complexity` + `max-lines-per-function`)                                                                                    | Ndiyo                    |
| `check:cognitive-complexity` | Ratchet ya utata wa kiutambuzi (`eslint-plugin-sonarjs`) — ukaguzi tofauti wa ESLint; CI huendesha zote mbili zikiwa zimeunganishwa kama hatua moja ya `check:complexity-ratchets`                         | Ndiyo                    |
| `check:dead-code`            | Ratchet ya exports / faili zisizotumika (knip) hairudi nyuma ikilinganishwa na kiwango cha msingi                                                                                                          | Ndiyo                    |
| `check:compression-budget`   | Bajeti ya kipimo cha ulinganishi wa mbano — viwango vya chini vya uokoaji wa tokeni kwa kila injini havipaswi kurudi nyuma                                                                                 | Ndiyo                    |
| `check:type-coverage`        | Ratchet ya asilimia iliyowekewa aina (`type-coverage`) hairudi nyuma; kwa kiasi kikubwa inajumuisha `typecheck:noimplicit:core`                                                                            | Ndiyo                    |
| `check:codeql-ratchet`       | Idadi ya arifa zilizo wazi za CodeQL hairudi nyuma (husoma kupitia `gh api`; huruka kwa ustaarabu bila tokeni) — marudio ya kuonyesha upya na uanzishaji wa mikono: angalia "Ratchet ya CodeQL" hapa chini | Ndiyo                    |

### Kazi: `quality-extended`

Kazi nzima ni ya ushauri (`continue-on-error: true`). Ratchet zinazotegemea npm huendeshwa
kikamilifu; vichanganuzi vya nje husakinishwa kupitia `gh release download` na hujiruka vyenyewe (exit 0)
wakati binary bado haipo.

| Skripti                  | Huthibitisha                                                                                                                                                                                                                                     | Inazuia                                                     |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| `check:circular-deps`    | Hakuna vitegemezi vya mzunguko (dpdm)                                                                                                                                                                                                            | **Ya ushauri**                                              |
| `check:bundle-size`      | Ukubwa wa bundle hauzidi kikomo                                                                                                                                                                                                                  | **Ya ushauri**                                              |
| `check:secrets`          | Uchanganuzi wa siri (gitleaks) — huruka ikiwa binary haipo                                                                                                                                                                                       | **Ya ushauri**                                              |
| `check:vuln-ratchet`     | Udhaifu wa vitegemezi (osv-scanner) haurudi nyuma — huruka ikiwa binary haipo                                                                                                                                                                    | **Ya ushauri**                                              |
| `check:workflows`        | Ukaguzi wa workflow (actionlint + zizmor); vichanganuzi vinavyokosekana/kuharibika, ripoti batili au kukosekana kwa kiwango cha msingi cha ratchet husababisha INCOMPLETE. Matokeo halali hufuata sera iliyochaguliwa ya strict/advisory/ratchet | Utekelezaji unahitajika; ratchet ya zizmor huzuia katika CI |
| `check:openapi-breaking` | Mabadiliko yanayovunja mkataba wa API ya umma (`openapi.yaml`) dhidi ya tawi la msingi (oasdiff) — hutoa `openapiBreaking=N`; huruka ikiwa oasdiff haipo au spec ya msingi haiwezi kutatuliwa                                                    | **Ya ushauri**                                              |

### Kazi: `docs-sync-strict`

Huendeshwa kwenye kila PR kwenda `main`. Huzuia uunganishaji ikifeli.

| Skripti                        | Inathibitisha                                                                                                                                                                                    | Inazuia                              |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------ |
| `check:docs-all`               | Kizuizi kikuu kinachoendesha vizuizi vidogo 6 vilivyo hapa chini kwa mfuatano                                                                                                                    | Ndiyo                                |
| ↳ `check:docs-sync`            | Ulinganifu wa matoleo ya CHANGELOG / OpenAPI / llm.txt                                                                                                                                           | Ndiyo                                |
| ↳ `check:docs-counts`          | Idadi zilizo katika maandishi (idadi ya watoa huduma, idadi ya uhamishaji, n.k.) ziko ndani ya dirisha la ratchet la idadi halisi                                                                | Ndiyo                                |
| ↳ `check:env-doc-sync`         | Kila kigezo cha mazingira katika `.env.example` kimeandikwa katika jedwali la nyaraka, na kinyume chake                                                                                          | Ndiyo                                |
| ↳ `check:deprecated-versions`  | Hakuna mifuatano ya matoleo yaliyopitwa na wakati katika nyaraka                                                                                                                                 | Ndiyo                                |
| ↳ `check:doc-links`            | Viungo vya ndani vya markdown katika nyaraka vinaelekeza kwenye faili halisi (muundo wa `[text]`/`(path)`)                                                                                       | Ndiyo                                |
| ↳ `check:fabricated-docs`      | Njia, vigezo vya mazingira, amri za CLI, majina ya hook, na njia za faili zilizotajwa katika nyaraka zipo katika codebase. Kizuizi kigumu kupitia `--strict`; hushindwa kwa tahadhari bila flag. | Ndiyo (kupitia `--strict` katika CI) |
| `check:cli-i18n`               | Mifuatano ya amri za CLI ipo katika faili zote za lugha za i18n                                                                                                                                  | Ndiyo                                |
| `check:openapi-coverage`       | Vipimo vya OpenAPI vinajumuisha angalau kiwango cha chini kilichowekwa kwa ratchet cha njia halisi                                                                                               | Ndiyo                                |
| `check:openapi-security-tiers` | Maelezo ya viwango vya usalama katika `openapi.yaml` yanaendana na uainishaji wa `routeGuard.ts`                                                                                                 | **Ushauri**                          |
| `check:openapi-routes`         | Kila njia katika `openapi.yaml` inaelekeza kwenye `route.ts` halisi (kuzuia uzushi)                                                                                                              | Ndiyo                                |
| `check:docs-symbols`           | Kila rejeleo la `/api/...` katika `docs/**/*.md` linaelekeza kwenye `route.ts` halisi (kuzuia uzushi)                                                                                            | Ndiyo                                |
| `i18n translation drift`       | Funguo ambazo hazijatafsiriwa katika faili za lugha za i18n — onyo pekee                                                                                                                         | **Ushauri**                          |

### Kazi: `i18n-ui-coverage`

| Skripti                           | Inathibitisha                                                                                                                                                                                                                       | Inazuia     |
| --------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- |
| `check-ui-keys-coverage` (inline) | Ujumuishaji wa funguo za i18n za UI ni ≥ 65%                                                                                                                                                                                        | Ndiyo       |
| `check-ui-value-drift` (inline)   | **Thamani** ya Kiingereza iliyoandikwa upya haiachi tafsiri yoyote ya zamani                                                                                                                                                        | Ndiyo       |
| `check-new-key-coverage` (inline) | Ufunguo **mpya** wa Kiingereza umetafsiriwa katika kila lugha — kiashirio cha `__MISSING__:` kinakataliwa                                                                                                                           | Ndiyo       |
| `check-translation-ratio`         | Uwiano wa tafsiri halisi kwa kila lugha (zinazofanana na Kiingereza / kishikilia nafasi / zilizoachwa bila kutafsiri nje ya orodha inayoruhusiwa) haupaswi kuzidi `config/quality/i18n-translation-baseline.json` + nafasi ya ziada | **Ushauri** |

Inahitaji `fetch-depth: 0` — kizuizi cha mabadiliko ya thamani hulinganisha `en.json` dhidi ya merge base.

#### `check-ui-value-drift` — kizuizi cha tafsiri za zamani

Hugundua hitilafu moja ya i18n ambayo vizuizi vingine haviwezi kuiona kimuundo: thamani ya Kiingereza
inaandikwa upya huku tafsiri zilizotokana na Kiingereza cha _awali_ zikibaki, hivyo
watumiaji wasiotumia Kiingereza wanaendelea kusoma maandishi yenye uhakika lakini ambayo sasa si sahihi.

Hili lilitolewa kwa watumiaji katika hali halisi. `oauthModal.googleOAuthWarning` iliandikwa upya wakati kisaidizi cha kuingia cha Antigravity
kilipoletwa (#5203); **lugha 39 kati ya 43** zilibaki na maandishi yaliyowaambia waendeshaji "kunakili
URL kamili na kuibandika hapa chini" — mtiririko ambao hauwezi kukamilika kwa mtoa huduma huyo. Hili
halikugunduliwa hadi #8463 kwa sababu:

- `sync-ui-keys` huongeza tu funguo ambazo **hazipo**, kamwe si zile ambazo ni **za zamani**;
- `check-ui-keys-coverage` huhesabu _uwepo_ wa funguo, hivyo tafsiri ya zamani huhesabiwa kuwa imejumuishwa;
- `check-translation-drift` hufuatilia vioo vya nyaraka vya `docs/i18n/<locale>/**.md` —
  haisomi kamwe `src/i18n/messages/*.json`. Inazuia katika kazi `docs-sync-strict` tangu usawazishaji upya wa
  2026-09: hariri hati kuu → `npm run i18n:run -- --files=<doc>` (kwa kiwango cha sehemu, gharama nafuu).

**Inatambua tofauti, haitegemei baseline.** Hulinganisha `en.json` kwenye merge base dhidi ya
working tree; kwa kila ufunguo ambao thamani yake ya Kiingereza imebadilika, locale yoyote ambayo bado ina
tafsiri ambayo haijaguswa imepitwa na wakati. Hii kwa makusudi **hufungia deni lililokuwepo awali** — diff
haiwezi kubaini tafsiri ya muda mrefu ilitokana na Kiingereza gani cha zamani, kwa hivyo gate hutathmini
tu kile ambacho badiliko la sasa linagusa. Njia mbadala (baseline ya hash kwa kila ufunguo) ingeongeza
faili iliyozalishwa ya ~600 KB, mara 3 ya baseline kubwa zaidi iliyopo, huku ikibadilika katika kila PR ya i18n.

Njia mbili za kukidhi sharti hili:

1. sasisha tafsiri zilizoathiriwa, au
2. ziweke kuwa `__MISSING__:<new english>` — wakati wa utekelezaji kisha hutoa Kiingereza kilichosahihishwa
   (`src/i18n/request.ts::deepMergeFallback`, #7258) na ufunguo huwekwa kwenye foleni ya kutafsiriwa.

Ikiwa **maana** ya kifungu imebadilika, ni vyema zaidi **kubadilisha jina la ufunguo**: ufunguo mpya hauwezi kurithi
tafsiri iliyopitwa na wakati. Huo ndio mtindo uliotumiwa na #8463.

```bash
npm run i18n:check-value-drift          # hali kali (kile CI huendesha)
npm run i18n:check-value-drift:warn     # toa ripoti pekee
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Hutoka kwa msimbo 0 pamoja na `SKIP reason=base-unresolved` wakati katalogi ya msingi haiwezi kusomwa (shallow
clone isiyo na base ref), sawa na `check-openapi-breaking`.

### Kazi: `i18n`

Matriki kamili ya uthibitishaji wa i18n (kazi moja kwa kila locale). Kazi nzima ni ya ushauri.

| Skripti                         | Huthibitisha                         | Uzuiaji                                                      |
| ------------------------------- | ------------------------------------ | ------------------------------------------------------------ |
| `validate_translation.py quick` | Ukamilifu wa tafsiri kwa kila locale | **Ya ushauri** (`continue-on-error: true` kwenye kazi nzima) |

### Kazi: `pr-test-policy`

Huendeshwa kwenye pull request pekee.

| Skripti                | Huthibitisha                                                                                                                                                                          | Uzuiaji |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `check:pr-test-policy` | PR zinazobadilisha msimbo wa uzalishaji katika `src/`, `open-sse/`, `electron/`, au `bin/` lazima zijumuishe au zisasisha majaribio (Kanuni Ngumu #8)                                 | Ndiyo   |
| `check:test-masking`   | Faili za majaribio zilizobadilishwa hazipunguzi jumla halisi ya idadi ya assert wala kuongeza tautolojia za `assert.ok(true)`                                                         | Ndiyo   |
| `check:pr-evidence`    | Maelezo ya PR yanataja ushahidi wa jaribio/VPS kuhusu badiliko (hufanyia Kanuni Ngumu #18 utekelezaji kiotomatiki kwa kutumia grep kwenye maelezo ya PR — ni dhaifu, angalia Backlog) | Ndiyo   |

### Kazi: `test-vitest`

Huendeshwa baada ya `build`. Huzuia merge ikishindwa.

| Suite            | Huthibitisha                                                | Uzuiaji                                                                                                                            |
| ---------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `test:vitest`    | Seva ya MCP (zana 110), autoCombo, cache — kiendesha vitest | Ndiyo                                                                                                                              |
| `test:vitest:ui` | Majaribio ya vijenzi vya UI — kiendesha vitest              | **Huzuia** — hitilafu zilizokuwepo awali zimeondolewa waziwazi katika `vitest.config.ts`; hitilafu mpya husababisha kazi kushindwa |

### Workflow za kila usiku (zimeratibiwa, za ushauri)

Hizi huendeshwa kwa ratiba ya cron (na `workflow_dispatch`), kamwe si kwenye PR. Zote ni za ushauri.

| Workflow               | Huthibitisha                                                                                                                                                                                | Uzuiaji        |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `nightly-property`     | Majaribio ya sifa ya fast-check yenye seed ya nasibu + idadi kubwa ya utekelezaji                                                                                                           | **Ya ushauri** |
| `nightly-resilience`   | gate ya ukuaji wa heap, uingizaji wa hitilafu wa chaos, mzigo/soak wa k6                                                                                                                    | **Ya ushauri** |
| `nightly-llm-security` | kinga ya promptfoo dhidi ya injection (hali ya block) + uchunguzi wa garak (hurukwa bila siri ya mtoa huduma)                                                                               | **Ya ushauri** |
| `nightly-schemathesis` | Fuzzing ya mkataba wa OpenAPI (schemathesis) dhidi ya OmniRoute inayotumika kwa kutumia `docs/openapi.yaml` — huibua ukiukaji wa spec / hitilafu za 500 zisizoshughulikiwa (Awamu ya 8 B.4) | **Ya ushauri** |
| `nightly-mutation`     | Alama ya majaribio ya mutation ya Stryker kwenye mkondo wa haraka wa unit — mutants zinazonusurika huibua assert dhaifu                                                                     | **Ya ushauri** |
| `nightly-compat`       | Matriki ya uoanifu wa injini ya Node katika masafa yanayotumika ya `engines.node`                                                                                                           | **Ya ushauri** |

---

## Awamu ya kasi (2026-08-30 → v4.0 LTS): kila kiwango msingi kimelegezwa kwa 20%

Uamuzi wa mmiliki (2026-08-30): hadi uundaji wa v4.0 kwa moduli, kasi ya kutoa matoleo ni muhimu zaidi
kuliko kudhibiti deni. Kila kiwango msingi cha **nambari** cha ratchet kililegezwa kwa 20% katika
hatua moja inayoweza kukaguliwa, na awamu hiyo imetangazwa katika `config/quality/quality-baseline.json`:

```json
"_policy": { "phase": "velocity", "since": "2026-08-30", "until": "4.0.0",
             "relaxPct": 20, "requireTighten": false }
```

| Kilichobadilika                                                                                                                                                                                                                         | Mahali                                                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `metrics.*.value` — idadi ambazo ndogo ni bora ×1.2, asilimia ambazo kubwa ni bora ÷1.2 (kiwango cha chini cha coverage cha 60 kimehifadhiwa, `eslintErrors` inabaki 0, `eslintWarnings` 0 → 20% ya idadi iliyofungiwa ya suppressions) | `quality-baseline.json` (dokezo la `_relax_velocity_2026_08_30` linaorodhesha kila kabla → baada)      |
| `count` ×1.2 / `percentage` ×1.2                                                                                                                                                                                                        | `complexity-baseline.json`, `duplication-baseline.json`                                                |
| `cap`, `testCap`, kila kikomo cha mistari cha `frozen[*]` / `testFrozen[*]` ×1.2                                                                                                                                                        | `file-size-baseline.json`                                                                              |
| idadi kwa kila faili / kwa kila msimbo wa TS ×1.2                                                                                                                                                                                       | `api-typecheck-baseline.json`, `dashboard-typecheck-baseline.json`, `open-sse-typecheck-baseline.json` |
| `THRESHOLD` 36 → 30                                                                                                                                                                                                                     | `scripts/check/check-openapi-coverage.mjs`                                                             |
| `--require-tighten` inakuwa ya ushauri wakati `_policy.requireTighten === false`                                                                                                                                                        | `scripts/quality/check-quality-ratchet.mjs`                                                            |
| `bank-ratchet-shrinks` ya kila usiku imesitishwa (ingehifadhi upungufu uliopimwa na kutengua nafasi ya ziada)                                                                                                                           | `.github/workflows/nightly-release-green.yml`                                                          |

Orodha za kuruhusu (`eslint-suppressions.json`, `test-masking-allowlist.json`, `test-discovery-baseline.json`,
…) **si** bajeti na hazikuguswa. Vizuizi vya sera vya kufaulu/kufeli (siri, kanuni za SQL,
mkataba wa nyaraka/vigezo vya mazingira, usawa wa i18n, majaribio ya vitengo) havijabadilika — jaribio jekundu bado ni jaribio jekundu.

**Zana**

- `npm run quality:relax-baselines -- --pct 20 --note velocity_YYYY_MM_DD [--dry-run]` — ulegezaji
  wa mara moja (`scripts/quality/relax-baselines.mjs`); hukataa kutekelezwa mara mbili kwa dokezo
  lilelile.
- `npm run quality:headroom [-- --only deadExports,fileSize] [--json out.json --md out.md]` —
  hupima kila ukaguzi wa ubora wa namba kwa njia ileile ya CI na kuonyesha nafasi iliyobaki kabla ya kikomo cha kila ukaguzi
  (`scripts/quality/baseline-headroom.mjs`). Kazi ya kila usiku ya `baseline-headroom` huchapisha jedwali
  katika muhtasari wa utekelezaji wa mtiririko wa kazi na kupakia ripoti ya JSON/Markdown kwa jina
  `baseline-headroom-<run_id>`, inayohifadhiwa kwa siku 90. Safu za onyo na za hali hatari huonyesha
  ukaguzi uliobakiza 10% au chini ya hapo hadi kikomo chake, au ambao tayari umekivuka.
  Pitia ripoti hizi kama onyo la mapema kuhusu matumizi ya bajeti zilizotengwa; chunguza maelezo
  ya `_rebaseline_*` ya ukaguzi husika. Kazi hii haiundi wala kusasisha tena suala la kudumu;
  #12149 huhifadhi historia ya ripoti za awali.

**Hali ya msimbo mpya (Clean-as-You-Code) — tangu 2026-08-30, njia ya haraka ya PR pekee**

Katika matukio ya `pull_request`, `quality.yml` hupitisha `--base-ref <PR base SHA>` kwa `check:file-size`,
`check:complexity-ratchets` na `check:dead-code`. Katika hali hiyo, kizuizi hulinganisha HEAD na
merge-base **kwa kuzingatia faili ambazo PR iligusa pekee** (`scripts/check/newCodeMode.mjs`:
merge-base huwekwa katika `git worktree` ya muda, ESLint/knip hutekelezwa humo na kwenye HEAD, kisha
idadi za kila faili hulinganishwa):

- **kinachozuia** — PR iliongeza ukiukaji wa cyclomatic/cognitive au dead exports katika faili ilizobadilisha
  (`complexityNewCode=`, `cognitiveComplexityNewCode=`, `deadExportsNewCode=` kwenye kumbukumbu);
- **cha ushauri** — jumla ya kimataifa dhidi ya kiwango msingi kilichofungiwa. Mkengeuko uliorithiwa kamwe
  hausababishi PR isiyo na hatia kufeli; mkengeuko huo hufungiwa upya wakati wa upatanisho wa toleo na kufuatiliwa na kazi ya headroom.

Utekelezaji wa `workflow_dispatch`, ukaguzi wa release-green na kazi ya kila usiku ya headroom hazina msingi wa PR
na zinaendelea kutumia ulinganisho kamili (wa kimataifa). Coverage, duplication na type-coverage zinaendelea kuwa za kimataifa
kwa sasa (zana zake hazitoi tofauti ya kila faili kwa gharama ndogo) — ni wagombea wa kushughulikiwa kwa njia hiyo hiyo.

**Kufunga awamu katika v4.0 (LTS = kali zaidi kuliko awali, si "kurudi katika hali ya kawaida")**

1. Kwenye ncha safi ya `release/v4.0.0`: `npm run quality:headroom --json` kwa ajili ya kumbukumbu, kisha
   `npm run quality:ratchet -- --update`, `check:file-size --update`,
   `check:complexity-ratchets --update`, `check:dead-code --update`, na
   `--update` ya kila kizuizi cha ukaguzi wa aina — kila kiwango cha msingi kishuke hadi thamani iliyopimwa.
2. Futa `_policy` kutoka `quality-baseline.json` (huwasha upya `--require-tighten` na uhifadhi wa kila usiku),
   rejesha `THRESHOLD = 36` (au zaidi) katika `check-openapi-coverage.mjs`.
3. Kaza zaidi ya kiwango kilichopimwa pale ambapo ugawaji katika moduli ulizaa matunda: rejesha `cap` ya ukubwa wa faili hadi 1000
   (au 800), ongeza viwango vya chini vya ufunikaji kwa 5, na uweke export zisizotumika kuwa 0 kwa package zilizogawanywa katika moduli.

## Kiwango cha Msingi cha Ratchet (`quality-baseline.json`)

Injini ya ratchet (`scripts/quality/check-quality-ratchet.mjs`) husoma `quality-baseline.json`
na kuilinganisha na `quality-metrics.json` iliyokusanywa upya. Kipimo chochote kinachorudi nyuma
zaidi ya epsilon yake husababisha ujenzi kushindwa.

Vipimo vinavyofuatiliwa kwa sasa:

| Kipimo                | Mwelekeo | Maana                                        |
| --------------------- | -------- | -------------------------------------------- |
| `eslintWarnings`      | `down`   | Idadi ya maonyo ya ESLint lazima isiongezeke |
| `coverage.statements` | `up`     | Ufunikaji wa kauli lazima usipungue          |
| `coverage.lines`      | `up`     | Ufunikaji wa mistari lazima usipungue        |
| `coverage.functions`  | `up`     | Ufunikaji wa vitendaji lazima usipungue      |
| `coverage.branches`   | `up`     | Ufunikaji wa matawi lazima usipungue         |

Ili kusasisha kiwango cha msingi baada ya uboreshaji halisi:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Bendera ya `--update` huandika thamani zilizopimwa kwa sasa kwenye `quality-baseline.json`.
Commit faili hii pamoja na badiliko lililoboresha kipimo. PR inayoboresha
kipimo bila kusasisha kiwango cha msingi itagunduliwa na `--require-tighten` (Awamu ya 6A.5,
utekelezaji bado unasubiri).

### Ratchet ya CodeQL: marudio ya kuonyesha upya na kichochezi cha mikono

`check:codeql-ratchet` husoma **hali ya hazina, ambayo huonyeshwa upya kwa ratiba — si kwa kila PR.**
`gh api repos/diegosouzapw/OmniRoute/code-scanning/default-setup` huripoti
`state: configured`, `schedule: weekly`: uchanganuzi wa default-setup wa GitHub, si uchanganuzi
wa kila push. Matokeo yake: baada ya PR INAYOREKEBISHA arifa kuunganishwa, ratchet huendelea kusoma
idadi ya zamani, iliyo juu zaidi hadi uchanganuzi unaofuata ulioratibiwa utekelezwe — kwa hivyo huripoti kurudi nyuma
kwenye kila PR iliyo wazi, ikiwemo PR za ufuatiliaji za PR yenye marekebisho, hadi uchanganuzi ufikie hali ya sasa.

**Kuonyesha upya kwa mikono**: `gh workflow run codeql.yml --ref release/vX.Y.Z` huendesha upya
uchanganuzi na kuchapisha tena arifa ndani ya dakika chache. Soma `.github/workflows/codeql.yml`
kwanza — kichwa chake kinaeleza kuwa ni ya `workflow_dispatch` pekee **kwa sababu inakinzana na
"default setup" ya GitHub** (`CodeQL analyses from advanced configurations cannot be
processed when the default setup is enabled`). Kurejesha vichochezi vya `push`/`pull_request`/
`schedule` kunahitaji **hatua ya mmiliki kwanza**: Settings → Code security →
CodeQL: Default → Advanced. Usiongeze kichochezi cha `schedule:` bila kubadilisha mpangilio huo — kitaishia
tu kuzalisha utekelezaji unaoshindwa.

**Kaza kiwango cha msingi baada ya idadi kupungua** — `node scripts/check/check-codeql-ratchet.mjs
--update` huandika idadi mpya iliyopimwa kwenye `quality-baseline.json` →
`metrics.codeqlAlerts.value`, ili ratchet isiruhusu kimyakimya kurudi nyuma hadi
kikomo cha zamani. Mfano uliotekelezwa (2026-09-02/03): PR #12502 ilirekebisha arifa 7 halisi
(13 → 6 zilipimwa kuwa wazi); PR #12530 ilikaza kiwango cha msingi kilichogandishwa kutoka 11 → 6 ili kilingane; arifa
6 zilizosalia zilikataliwa kwa uhalalishaji wa kila arifa hadi zikafikia 0 zilizo wazi.

**Kukataliwa kwa arifa ni uamuzi wa mwendeshaji (Kanuni Ngumu #14)** — usiwahi kukataa arifa ya CodeQL
bila kurekodi uhalalishaji wa kiufundi katika maoni ya kukataa: `won't fix` kwa
sharti la itifaki ya upstream, `used in tests` kwa fixture ya majaribio, `false positive`
kwa sanitizer ambayo CodeQL haiwezi kuona (mfano wa awali: `docs/security/ERROR_SANITIZATION.md`).

---

## Sera ya Kujaribu Tena Vipimo (WS5.4, v3.8.49)

Kujaribu tena hufanywa kwa kila runner, kamwe si kwa ujumla — kujaribu tena kwa ujumla hubadilisha hitilafu halisi
kuwa dosari za muda zisizoonekana:

| Runner           | Sera                                                                                                                                                                                         | Sababu                                                                                                                                         |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Playwright (e2e) | `retries: 1` katika CI pekee, pamoja na `trace: on-first-retry`                                                                                                                              | Muda wa kivinjari/mtandao kwa kweli hautabiriki; jaribio moja la ziada lenye trace hugeuza dosari ya muda kuwa artefakti inayoweza kuchunguzwa |
| Vitest           | HAKUNA kujaribu tena kwa ujumla. Kipimo kilichothibitishwa kuwa na dosari ya muda hupata jaribio la ziada lililobainishwa kwa kipimo hicho (linaonekana katika diff, linakaguliwa katika PR) | Huweka orodha ya karantini ndani ya repo, kamwe isiwe fiche                                                                                    |
| node:test (unit) | HAKUNA kujaribu tena, kamwe                                                                                                                                                                  | Kipimo cha unit chenye dosari ya muda ni hitilafu katika kipimo — kirekebishe, usikifanyie bahati nasibu tena                                  |

SLO lengwa pindi telemetria ya dosari za muda itakapopatikana (WS5.2/5.3): kiwango cha dosari za muda cha <1% kwa kila kipimo
(kizingiti cha "rekebisha sasa"), kiwango cha kufaulu cha ≥95% kwa kila pipeline. Thamani za marejeleo za sekta —
zisawazishe upya kulingana na vipimo vyetu wenyewe.

## Mkengeuko wa Ratchet katika Kiwango cha Toleo (WS5.5, v3.8.49)

Ratchet (ukubwa wa faili, uchangamano, maonyo ya eslint) inapodorora kwenye ncha HALISI ya toleo
— yaani, MCHANGANYIKO wa merge ndio ulioisababisha idorore, na hakuna PR moja inayoweza kuzalisha tena
dororo hilo kwenye branch yake yenyewe — jukumu la marekebisho ni la **nahodha wa toleo, mara moja, kwenye
branch ya toleo**: pendelea kutoa sehemu/refactor; weka baseline upya tu ukiwa na ingizo la sababu
lililoandikwa. Kamwe usimsukumie mchangiaji mkengeuko unaotokana na mchanganyiko kupitia PR yake, na kamwe
usiweke baseline upya kwa kila PR (hilo huficha dororo halisi). Tofautisha kwanza: zalisha tena hali
nyekundu dhidi ya ncha halisi katika worktree ya uchunguzi kabla ya kudhani PR yako ndiyo iliisababisha.

## Kuhifadhi Mapunguzo ya Ratchet — mwelekeo wa kushuka (#8584)

Ratchet ni nusu otomatiki tu, na ni nusu isiyofaa. **Kuongeza** kikomo ni uhariri wa JSON
wa mikono unaochukua sekunde kumi na ndiyo njia ya haraka zaidi ya kuondoa kizuizi kwenye PR nyekundu.
**Kupunguza** kikomo kunahitaji mtu aendeshe `--update` na aweke matokeo kwenye commit — na hadi
job ya `bank-ratchet-shrinks` ilipoanzishwa, hakuna workflow iliyokuwa ikifanya hivyo. Matokeo yaliyopimwa
(2026-07-25): faili 18 zilizogandishwa tayari zilikuwa na au chini ya kikomo cha faili mpya cha mistari 800, mbaya zaidi
ikiwa 132× (`src/shared/validation/schemas.ts`, mistari 19 ikiwa na kikomo cha 2,523); kiwango cha juu cha
uchangamano kilipanda `1794 → 2169` kupitia takribani madokezo 37 ya kuweka baseline upya huku kukiwa na punguzo moja tu
(−1); na "bana kupitia `--update` katika mzunguko unaofuata" iliandikwa mara 31 na kutekelezwa
mara moja. Kikomo kinachoendelea kuwepo baada ya msimbo uliokisababisha kuondolewa hubadilisha kimyakimya kila
utenganishaji uliokamilika kuwa ruhusa ya ukuaji kwa yeyote atakayehariri faili baadaye.

`nightly-release-green.yml` → job **`bank-ratchet-shrinks`** hufunga mzunguko huo:

|                   |                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------- |
| Huendeshwa kwenye | `schedule` (3×/siku) + `workflow_dispatch` — kimakusudi **si** `push`                                         |
| Hupima            | `release/vX.Y.Z` ya juu zaidi, kwa utatuzi sawa + kinga dhidi ya injection kama `release-green`               |
| Huandika          | `check:file-size --update` na `check:complexity-ratchets --update` (zote zimeundwa kupunguza pekee)           |
| Huthibitisha      | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                                      |
| Husafirisha       | PR moja inayosasishwa kila wakati dhidi ya branch ya toleo — husasishwa kwa lazima, kamwe haitumiwi kwa wingi |

Uhifadhi hufanywa kwa mafungu badala ya kwa kila push kwa sababu hauna sharti la muda wa kusubiri (punguzo
linalohifadhiwa ndani ya saa 8 linatosha), ilhali kuendesha kwa kila merge kungejenga upya branch ya PR mara kwa mara
wakati wa kampeni za merge na kugharamia ukaguzi kamili wa ESLint kila mara. Ugunduzi hubaki kwenye
push (`release-green`); uhifadhi pekee ndio unaofanywa kwa mafungu.

### Kithibitishaji cha usalama

Job huandika kwenye baseline bila usimamizi, kwa hivyo `verify-ratchet-bank.mjs` ndicho kinachofanya
hilo likubalike. Hulinganisha tree ya baada ya `--update` dhidi ya `HEAD` na **husitisha job
kabla commit yoyote haijaundwa** — bila kufungua PR — isipokuwa kila badiliko ni mojawapo ya:

- ingizo la nambari la `frozen` / `testFrozen` **limepunguzwa** au **limeondolewa**
- `complexity-baseline.json` → `count` **imepunguzwa**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **imepunguzwa**

Kitu kingine chochote husababisha kushindwa: kuongeza nambari, kuongeza ingizo, kubadilisha `cap`/`testCap`, au
kufuta/kuandika upya dokezo la `_rebaseline_*` (madokezo hayo ndiyo rekodi ya ukaguzi inayoeleza kwa nini kila
kiwango cha juu kipo na yanahifadhiwa ndani ya object ileile ya `frozen` pamoja na maingizo ya faili).
Bot inayoweza kuongeza kikomo ingekuwa mbaya zaidi kuliko hali ya sasa. Kinga dhidi ya dororo:
`tests/unit/verify-ratchet-bank.test.ts`.

Job haisukumi kamwe kwenye `release/*` — binadamu huunganisha PR, kwa hivyo kipimo kibaya
hakiwezi kuingizwa bila kukaguliwa.

## Sera ya Orodha ya Ruhusa

Kila lango ambalo haliwezi kushindwa kwa ukiukaji uliokuwepo awali hutumia orodha ya ruhusa isiyobadilika
(k.m., `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Sera ni:

**Rekebisha chanzo cha tatizo; tumia orodha ya ruhusa tu wakati ukiukaji ulikuwepo awali na
hauwezi kurekebishwa katika PR hiyo hiyo.**

Unapoongeza ingizo kwenye orodha ya ruhusa:

1. Jumuisha maoni yenye sababu.
2. Rejelea suala la ufuatiliaji (k.m., `// #3498 — Kipengele cha Awamu ya 2, bado hakijatekelezwa`).
3. Ondoa ingizo katika PR hiyo hiyo inayorekebisha ukiukaji — ingizo lililopitwa na wakati ambalo halizuii tena
   ukiukaji unaotumika lenyewe ni hitilafu (utekelezaji wa ukaguzi wa maingizo yaliyopitwa na wakati wa 6A.3
   utasababisha lango kushindwa kwa ingizo la orodha ya ruhusa lisilo na ukiukaji husika baada ya kutekelezwa).

**Usiongeze** maingizo kwenye orodha ya ruhusa ili kufanya majaribio yapite haraka zaidi. Lango linalofaulu huku
orodha ya ruhusa ikiongezeka hutoa hisia potofu ya ubora.

### Wakati lango linaposhindwa kwenye PR yako

1. **Soma matokeo ya lango kwa makini** — yanakuambia hasa faili au alama iliyokiuka
   sheria.
2. **Rekebisha ukiukaji** — malango mengi ni ukaguzi bainifu wa mfumo wa faili unaofaulu mara tu
   msimbo unapokuwa sahihi.
3. **Ikiwa ukiukaji ulikuwepo awali** (yaani, hukuusababisha lakini sasa lango
   linaukagua): ongeza ingizo kwenye orodha ya ruhusa likiwa na maoni ya sababu na suala la ufuatiliaji.
4. **Ikiwa lango ni la aina ya ratchet** (ufunikaji, maonyo ya ESLint, urudufu, uchangamano):
   badiliko lako limefanya kipimo kuwa kibaya zaidi. Rekebisha tatizo la msingi, au (mara chache) endesha
   `npm run quality:ratchet -- --update` ikiwa badiliko limekusudiwa na kushuka kwa
   kipimo kunakubalika — lakini eleza sababu katika maelezo ya PR.
5. **Malango ya ushauri** (`continue-on-error: true`) ni ya taarifa — hayazuii
   uunganishaji lakini yanaonekana katika muhtasari wa CI. Yarekebishe hata hivyo.

---

## Kuongeza Lango Jipya

1. Unda `scripts/check/check-<name>.mjs` (au `.ts`). Malango ya sera hutoka kwa 0/1.
   Malango ya aina ya ratchet hutoa kipimo kwenda `quality-metrics.json` kupitia `collect-metrics.mjs`.
2. Ongeza `"check:<name>": "node scripts/check/check-<name>.mjs"` kwenye `package.json`.
3. Liunganishe katika `.github/workflows/ci.yml` chini ya kazi inayofaa
   (sera → `lint` au `docs-sync-strict`; ratchet → `quality-gate`).
4. Ikiwa lina orodha ya ruhusa, tumia `reportStaleEntries()` kutoka
   `scripts/check/lib/allowlist.mjs` ili maingizo yaliyopitwa na wakati yatambuliwe kiotomatiki.
5. Andika jaribio katika `tests/unit/build/` linaloshughulikia mantiki ya utambuzi ya lango.
6. Sasisha hati hii (ongeza safu kwenye jedwali la kazi husika).

---

## Zana za wakala: LSP-in-the-loop (hiari)

Zaidi ya malango ya CI, OmniRoute huja na kiunzi cha **hiari** cha `agent-lsp`
(`.mcp.json` ya kiwango cha mradi, Awamu ya 7 Jukumu la 15). Unda `.mcp.json`
ili kutoa seva ya lugha ya TypeScript kwa mawakala wa uandishi wa msimbo, ili watambue alama /
uchunguzi **kabla** ya kuandika msimbo — nyenzo ya kukamilisha `typecheck:core` inayotekeleza ukusanyaji kabla ya madai
na kupunguza makosa ya "alama zilizobuniwa" kuanzia kwenye chanzo. Kwa makusudi
haipakuliwi kiotomatiki (unachagua na kuthibitisha daraja la MCP↔LSP); ingizo lenye hitilafu hurekodi tu
kosa la muunganisho na kamwe halivunji vipindi.

---

## Orodha ya Maboresho Yanayosubiri (mapitio ya ROI — Awamu ya 9 Wimbi la 3)

Orodha hii ilioanishwa na `ci.yml` tarehe 2026-06-17 (toleo la awali liliacha
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Mapitio ya ROI ya seti iliyoanishwa
yalibaini yafuatayo kuwa mambo yanayoweza kurahisishwa. **Miunganisho hiyo ni mabadiliko
ya kimakanika ya CI; mabadiliko ya hali/ufutaji ni maamuzi ya sera yaliyohifadhiwa kwa
mwendeshaji.** Hakuna kilicho hapa chini ambacho kimetekelezwa bado.

**Pia hayajaandikwa hapo juu** (ya ushauri, ishara dhaifu): kazi ya `docs-lint`
(markdownlint + Vale, kazi nzima ikiwa na `continue-on-error`) na mitiririko huru ya kazi
ya uchanganuzi `semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` ipo
katika `quality-baseline.json` lakini haijaunganishwa na ratchet inayozuia katika `ci.yml` — kipimo hicho
kwa sasa hakijaunganishwa na chochote.

### Unganisha / ondoa urudufu (kimakanika, hatari ndogo)

Kila kipengele kilithibitishwa dhidi ya hali halisi ya vizuizi tarehe 2026-06-17 (amini-lakini-thibitisha);
miunganisho kadhaa "iliyo dhahiri" ilibainika kuficha deni na **si** vibadala safi vinavyoweza kuwekwa moja kwa moja.

- **`check:docs-sync` huendeshwa mara mbili** — kivyake katika kazi ya `lint` na tena ndani ya `check:docs-all` (`docs-sync-strict`) na hook ya husky ya pre-commit. ✅ **IMEKAMILIKA** — mwito wa pekee wa `lint` umeondolewa.
- **Uchanganuzi wa CVE** — ❌ **SI muunganisho safi.** `audit:deps` hushindwa moja kwa moja kwa CVE yoyote ya kiwango cha juu/muhimu; `check:vuln-ratchet` (osv) hushindwa tu kunapokuwa na _kurudi nyuma_ ikilinganishwa na baseline (kwa sasa 1 MODERATE). Maana zake ni tofauti — kuondoa `audit:deps` kungeondoa kizuizi kamili cha kiwango cha juu/muhimu. Zihifadhi zote mbili.
- **Ugunduzi wa mizunguko** — ✅ **IMEKAMILIKA** (#15159 G-01/G-02). Maandishi ya zamani hapa yaliita `check:cycles` kizuizi "cha kijani, kilichoratibiwa" na kuhalalisha kukiweka kama kizuizi kwa sababu `check:circular-deps` (dpdm) iliripoti mizunguko 91. Hali hiyo ya kijani ilikuwa **hali ya kijani ya uongo**: `check:cycles` ilichanganua saraka ndogo 5 (faili 450), ililinganisha tu `import|export … from` tuli, na ilitupilia mbali kila kibainishi cha `@/` na `@omniroute/open-sse/`, kwa hivyo haikuweza kuona mizunguko ya dynamic-import + alias iliyotawala repo. Imerekebishwa: kizuizi sasa hupitia `src` + `open-sse` (faili 5023), hukusanya vibainishi kutoka TypeScript AST (kwa hivyo `import("…")` huhesabiwa lakini `typeof import("…")` ya nafasi ya aina haihesabiwi), na hutatua `paths` za tsconfig. Kinapata mizunguko **14**, si 0. Kwa kuwa mizunguko 14 iliyokuwepo awali haiwezi kurekebishwa katika PR ya kizuizi, `check:cycles` sasa ni **ratchet** (`--ratchet`, kikomo `metrics.cycles.value = 14` katika `quality-baseline.json`, `direction: down`) — huzuia _kurudi nyuma_ kokote na idadi inaweza kupungua tu. CI huendesha `npm run check:cycles:ratchet`. Upunguzaji wa hatua kwa hatua unaendelea pamoja na **A-01**. `check:circular-deps` (dpdm) inabaki kuwa ya ushauri kama maoni mapana ya pili.
- **Uchangamani** — ✅ **IMEKAMILIKA** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): mpito mmoja wa ESLint, huhesabu kwa ruleId ili baseline za cyclomatic+max-lines na cognitive zibaki huru; `check:complexity` / `check:cognitive-complexity` binafsi zinabaki kwa `--update` ya ndani.
- **Kuzuia uzushi wa `/api`** — ✅ **IMEKAMILIKA** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): orodha moja ya FS ya `src/app/api`, openapi-routes + docs-symbols bado huripoti kivyake; kila moja inabaki kwa utekelezaji wa ndani.
- **`check:node-runtime` huendeshwa katika kazi 11** — ⚠️ **ROI ndogo.** Kila moja ni runner tofauti na ukaguzi ni <1s; jumla ya muda unaookolewa ni ~10s, dhidi ya kupoteza ulinzi nafuu wa kila kazi. Haifai usumbufu wa mabadiliko.
- **`typecheck:noimplicit:core` kwenye lint ya CI** — ✅ **imeondolewa kwenye kazi ya lint** (ilikuwa ya ushauri ikiwa na `continue-on-error`); sehemu ya aina inayozuia ni `typecheck:core` + `check:type-coverage`. Script ya ndani imehifadhiwa.

### Badilisha hali / amua (sera ya mwendeshaji)

- `check:openapi-security-tiers` (ya ushauri) — ❌ **HAIWEZI kubadilishwa hali kwa usafi.** Hutoka kwa 0 lakini huonya kuwa routes kadhaa za `traffic-inspector` chini ya `LOCAL_ONLY_API_PREFIXES` hazina anoteshini ya `x-loopback-only: true`. Kuilazimisha kunahitaji kwanza kuongeza anoteshini hizo kwenye `openapi.yaml`.
- `typecheck:noimplicit:core` (ya ushauri) — kwa kiasi kikubwa imejumuishwa na ratchet inayozuia ya `check:type-coverage`. Ibadilishe kuwa ratchet au ondoa mpito wa pili wa `tsc` unaojirudia.
- `test:vitest:ui` (sasa **inazuia**) — hitilafu zilizokuwepo awali zimeondolewa waziwazi katika `vitest.config.ts` kwa maoni ya ufuatiliaji ya `// #8618`; hitilafu mpya husababisha kazi kushindwa.
- `check:secrets` (gitleaks, ratchet inayozuia iliyogandishwa katika false-positive 3 zilizoandikwa) — ziweke hizo 3 kwenye allowlist ili kufikia 0, au ishushe kuwa ya ushauri. Inaingiliana na uchanganuzi asilia wa siri wa GitHub + `check:public-creds`.
- `check:pr-evidence` (inazuia, hutafuta maandishi ya mwili wa PR kwa grep) — hatari kubwa ya false-positive; kuiondoa kunadhoofisha utekelezaji wa Hard Rule #18, kwa hivyo hili ni chaguo halisi la sera.
- `semgrep` (huru na ya ushauri) — inaingiliana na CodeQL kwa familia za OWASP; unganisha baseline yake na ratchet au iondoe.

---

## Nyaraka Husika

- Mnyororo wa ugavi (asili, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)

#### `check-key-completeness` — kizuizi cha ulinganifu wa seti za funguo

`scripts/i18n/check-key-completeness.mjs` (`npm run i18n:check-keys`, kazi `i18n-ui-coverage`).
Hulinganisha seti ya funguo za mwisho ya kila `src/i18n/messages/<locale>.json` na `en.json` na hushindwa
ikiwa kuna funguo zozote za mwisho zinazokosekana au za ziada, bila kujali ufunguo uliongezwa lini. Vishikilia nafasi vya
`__MISSING__:` huhesabiwa kuwa vipo (maudhui yake yanahusika na kizuizi cha uwiano). Hiki ndicho kikamilisho kamili
cha vizuizi viwili vinavyotegemea tofauti/asilimia: `check-ui-keys-coverage` hulazimisha kiwango cha chini cha 80 % kwa
kila lugha (funguo 43 zinazokosekana kati ya ~13,000 bado huonyesha 99.7 %) na `check-new-key-coverage` hutathmini
funguo ambazo PR huongeza kwenye `en.json` pekee. Kundi la lugha hutengenezwa kutoka kwa `en.json` ya siku
tawi lake linapoundwa na hutafsiriwa kwa siku kadhaa huku msingi ukiendelea kuongeza funguo; PR ya kundi lenyewe haiongezi
ufunguo wowote, kwa hivyo vizuizi vyote viwili havikutoa tahadhari wakati kundi la 1 (#13044) lilipounganishwa likiwa na upungufu wa funguo 43 katika lugha tisa
na kundi la 2 (#13660) likiwa na upungufu wa funguo 10 katika lugha nane (2026-09-15). Rekebisha hali nyekundu kwa
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers`; ufunguo wa mwisho wa `extra`
unamaanisha chanzo kiliuondoa — ufute kutoka kwenye lugha hiyo. `--warn` hutoa ripoti bila kusababisha kushindwa.
`--catalog=cli` huendesha ulinganisho uleule kwenye `bin/cli/locales` (`npm run i18n:check-keys:cli`);
hatua zote mbili zimo katika kazi `i18n-ui-coverage`.

#### `check-new-key-coverage` — kizuizi cha i18n cha funguo mpya

Kizuizi kinachofanana na `check-ui-value-drift`. Hicho hugundua thamani ya Kiingereza ambayo **iliandikwa upya**
huku tafsiri zake zikiachwa bila kubadilishwa; hiki hugundua ufunguo wa Kiingereza ambao **uliongezwa**
huku baadhi ya lugha zikiwa hazijaupokea kamwe.

`check-ui-keys-coverage` haiwezi kuona hali hii: hulazimisha kiwango cha chini cha asilimia kwa kila lugha, na
funguo kumi na moja zinazokosekana kati ya ~13,000 huacha ufunikaji ukiwa 99.9%. Asilimia kwa kila lugha haiwezi
kueleza "kipengele hiki kilitolewa bila kutafsiriwa" — kipengele kizima kinaweza kuingizwa katika lugha mpya bila
maandishi yoyote na bila kubadilisha kamwe nambari hiyo.

Tukio linalowakilishwa nayo: Awamu ya 3 ya Orchestration Canvas ilitafsiri funguo zake kumi na moja katika
lugha 42 zilizokuwapo wakati huo. Saa chache baadaye kundi la lugha za EU (#13044) lilifikisha hazina
kwenye lugha 51, na lugha tisa mpya (`el`, `et`, `ga`, `hr`, `lt`, `lv`, `mt`, `sl`, `sr`) hazikuzipokea
kamwe. `deepMergeFallback` huweka Kiingereza badala ya ufunguo unaokosekana, kwa hivyo hali ya hitilafu ilikuwa
UI isiyotafsiriwa badala ya UI tupu — tatizo halisi, na ambalo halitoi ishara kwa muundo wake.

Kama kizuizi kinachofanana nacho, hiki **hutambua tofauti**, kikilinganisha Kiingereza katika msingi wa muunganisho na mti
wa kazi, kwa hivyo mapengo yaliyokuwapo awali hubaki bila kubadilika na kizuizi hakikuhitaji uhamishaji ili kuwashwa.

**Alama ya `__MISSING__:<english>` haikidhi sharti hili (tangu 2026-09-17).** Hapo awali ilikuwa njia
iliyoandikwa ya kuahirisha — wakati wa utekelezaji hurudi kwenye Kiingereza sahihi — hadi PR nane za vipengele za
2026-09-16 zilipoongeza funguo 61 na kuweka alama hiyo katika lugha zote 65 badala ya kutafsiri: kizuizi hiki
kilikubali kila moja, hakuna kilichozuia PR hizo, na kisha kizuizi cha lazima cha uwiano wa tafsiri halisi
kilishindwa kwenye ncha ya toleo kwa kila mtu (pt-BR 3.2 % > 2.5 % + 0.5). Sasa alama hutathminiwa
kama tafsiri inayokosekana. Rekebisha hali nyekundu kwa
`node scripts/i18n/sync-ui-keys.mjs --locale=<codes> --translate-markers --batch-size=40`, au
lugha zote kwa sambamba kwa `npm run i18n:translate-new-keys` (`scripts/i18n/translate-new-keys.sh`,
salama ikiwa imetenganishwa, hukataa kuanza bila mazingira ya `OMNIROUTE_TRANSLATION_*`). Ufunguo ambao lazima ubaki
kwa Kiingereza (jina la bidhaa/injini/bendera lililowekwa lisibadilike) unapaswa kuwa katika `scripts/i18n/untranslatable-keys.json`,
kamwe usifiche nyuma ya alama. `vi` hupiga marufuku alama kabisa (`tests/unit/i18n-vi-completeness.test.ts`).

#### `check-vitest-exclusions` — kizuizi cha majaribio yaliyowekwa kando

Faili iliyo katika orodha ya `exclude` ya `vitest.config.ts` ni jaribio ambalo haliendeshwi, na huonekana kama
ufunikaji kwa yeyote anayesoma mti. Faili sitini na mbili zilikusanyika nyuma ya maoni
`// #8618 — hitilafu iliyokuwapo awali; ondoa utengaji huu ikirekebishwa`. Suala #8618 lilifungwa tarehe
2026-08-11 huku orodha iliyokuwa ikifuatilia ikikua kutoka vipengee 45 hadi 62, kila kipya kikurithi maoni
yanayoelekeza kwenye suala lililokufa. Hatimaye orodha ilipopimwa faili moja baada ya nyingine (#13204), **faili 51 kati ya 62
zilifaulu dhidi ya mti wa sasa bila mabadiliko yoyote ya msimbo chanzo**.

Kizuizi kinahitaji kila utengaji unaolingana na faili halisi (a) utaje suala la ufuatiliaji na
(b) uonekane katika `config/quality/vitest-exclusions.json` pamoja na hali yake iliyopimwa, ili kuongeza mmoja kuwe
tofauti inayoweza kukaguliwa katika faili mahususi badala ya kuwa mstari mwingine katika safu yenye vipengee 60. Kwa makusudi,
hakiendeshi tena majaribio yaliyotengwa — hilo huchukua ~dakika 10 na linapaswa kuwa katika kazi ya mara kwa mara;
orodha hiyo hurekodi wakati kila moja lilipopimwa mara ya mwisho.
