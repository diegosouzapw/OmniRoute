# Release-Green: keeping the queue and release branch green (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇸 [es](../../../es/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## Tatizo linalotatuliwa na hili

**Lango kamili** (`.github/workflows/ci.yml` — vipande vya majaribio ya unit, vitest, ratchets,
`package-artifact`, SonarQube, E2E) huendeshwa **kwenye PR ya toleo pekee** (PR → `main`). PR zinazolenga
`release/**` hupokea **fast-gates** (`quality.yml`: majaribio yaliyoathiriwa na TIA + ukaguzi wa aina + lint)
na, kwa mabadiliko ya msimbo, build ya production ya **ushauri**. Matokeo yake: hitilafu nyekundu zinazotokea kwenye toleo pekee bado zinaweza
kujikusanya kimyakimya kwenye tawi la toleo na **kulipuka kwa awamu za takribani dakika 40** wakati wa kutoa toleo,
moja baada ya nyingine.

Familia ya "release-green" ipo ili **kutangulia** hitilafu hizo — kuthibitisha kilicho sawa na lango kamili
**ndani ya mazingira ya ndani / nje ya mchakato wa toleo**, wakati wowote, ili PR ya toleo iwe tayari
ya kijani katika uendeshaji wake wa kwanza wa CI.

> **Kanuni isiyoweza kujadiliwa:** hakuna chochote hapa kinachomzuia mchangiaji. Hatuongezi
> ukaguzi wa lazima unaosababisha PR yake ishindwe. **Drift** (ratchets) ni ya mtunzaji kuweka upya msingi wakati wa toleo —
> kamwe si jukumu la mchangiaji. Hakuna sehemu **inayofunga** PR (kuiba sifa) wala
> **kudhoofisha** jaribio ili lipite.

## Familia (vipande 4) — na jinsi kila kimoja kinavyoendeshwa kwa kujitegemea

| Kipande                                                                     | Ni nini                                                                                      | Wakati wa kuendesha                                                           | Upeo                               |
| --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- | ---------------------------------- |
| **`/green-prs`** (Suluhisho A)                                              | Ukaguzi unapohitajika unaofanywa na mtunzaji kwenye **foleni ya PR zilizo wazi**             | **Kwa kujitegemea, mara kwa mara** — na hasa **kabla ya** `/generate-release` | Foleni nzima ya PR → `release/**`  |
| **`/validate-release-green`** (Suluhisho C — `npm run check:release-green`) | Injini ya uthibitishaji: huzalisha upya lango kamili dhidi ya tawi AU mgombea wa kuunganisha | Kwa kujitegemea, wakati wowote                                                | Tawi mahususi au PR ya kuunganisha |
| **`/babysit <PR#>`**                                                        | Huendesha **CI ya moja kwa moja** ya PR **moja** hadi iwe ya kijani                          | Kwa kujitegemea, kwa kila PR                                                  | PR moja                            |
| **`nightly-release-green.yml`** (Suluhisho D)                               | Mtiririko wa kazi wa kila usiku uliojiendesha; hufungua issue inapokuwa nyekundu ya HARD     | Kiotomatiki (cron)                                                            | Tawi la toleo linalotumika         |

**Jibu fupi kwa "je, hii ni kwa ajili ya matoleo pekee?":** **hapana.** `/green-prs` iliundwa
kuendeshwa **mara kwa mara, kati ya matoleo**. Kuiendesha kwa kujitegemea ndiyo matumizi ya kawaida — toleo ni
wakati tu ambapo kuiendesha kunaleta thamani kubwa zaidi.

## Muundo wa ushauri kutoka PR hadi toleo

`quality.yml` sasa inajumuisha `Build (advisory)` kwa PR za msimbo ambazo si rasimu na matawi ya foleni ya Mergify.
Inaakisi utaratibu wa muundo wa uzalishaji kutoka `ci.yml`: Node 24, `npm-ci-retry`,
`check:node-runtime`, na `npm run build` pamoja na `OMNIROUTE_USE_TURBOPACK=1`. Kwa makusudi
haipakii artifact ya muundo kwa sababu hakuna kazi ya ubora ya baadaye inayotumia artifact hiyo katika mtiririko huu wa kazi.
Ondoa `continue-on-error` baada ya wiki moja ya uendeshaji thabiti wa PR za toleo ili ishara iwe
kizuizi cha lazima cha kutoka PR hadi toleo.

## Suluhisho C — `npm run check:release-green` (injini)

Huzalisha upya uthibitishaji unaolingana na toleo dhidi ya working tree ya sasa na kuainisha kila hali nyekundu:

- **HARD** (typecheck, makosa ya lint, unit, vitest, db-rules, public-creds, `package-artifact`
  ya hiari) → **hitilafu halisi**; `exit 1`. Hurekebishwa kwenye tawi chanzo (TDD, Kanuni #18).
- **DRIFT** (**maonyo** ya eslint, cognitive-complexity, file-size) → mkengeuko wa ratchet uliokusanyika katika
  mzunguko, **si kosa la mchangiaji**; unaripotiwa tu na **unawekewa msingi mpya na mtunzaji wakati wa
  kutoa toleo**. DRIFT **haibadilishi kamwe** exit code — kwa hivyo haimzuii mtu yeyote.

```bash
npm run check:release-green                 # tawi la sasa (working tree)
node scripts/quality/validate-release-green.mjs --json   # matokeo yaliyoundwa kwa muundo maalum
node scripts/quality/validate-release-green.mjs --quick  # huruka unit+vitest (drift+typecheck+lint pekee)
node scripts/quality/validate-release-green.mjs --with-build  # hujumuisha package-artifact (polepole)
```

Hutambua matatizo na **kutoa ripoti** pekee (hakuna urekebishaji wa kiotomatiki). Uratibu wa kurekebisha hadi hali ya kijani unapatikana katika
`/green-prs` na `/review-prs`.

## Suluhisho A — `/green-prs` (uchanganuzi wa foleni)

Utaratibu (muhtasari — tazama skill ya `green-prs` kwa maelezo):

1. **Orodhesha** foleni ya PR zilizo wazi dhidi ya tawi la toleo linalotumika.
2. **Changanua** kila PR (inafaa / inastahili kukataliwa / inahitaji mwandishi) — zinazostahili kukataliwa/z zinazohitaji mwandishi
   **huripotiwa, hazifungwi** (mwandishi ndiye anayeamua).
3. Kwa kila PR inayofaa, katika **worktree iliyotengwa** (Kanuni #19), leta PR kwenye kilele cha toleo na uendeshe
   `npm run check:release-green`:
   - **HARD** → rekebisha **kwenye tawi la mchangiaji** kupitia uandishi wa pamoja (huhifadhi hali ya "Merged" ya mwandishi),
     endesha tena hadi HARD zote ziondolewe.
   - **DRIFT** → iache; itawekewa msingi mpya wakati wa kutoa toleo.
4. **Ripoti** jedwali la PR × (uamuzi, hali nyekundu za HARD, imerekebishwa?, DRIFT, release-green sasa?).

Inaweza **kuandaa** foleni bila kuunganisha; huunganisha tu inapoombwa waziwazi — na haifungi PR kamwe.

## Ratiba inayopendekezwa

- Endesha **`/green-prs` mara kwa mara** (k.m., kila wiki) na **kila wakati kabla ya
  `/generate-release`**.
- Dumisha **`nightly-release-green.yml`** (Suluhisho D) kama ishara endelevu: inapofungua issue ya
  hali nyekundu ya HARD, ni wakati wa kufanya uchanganuzi.
- Tumia **`/validate-release-green`** inapohitajika ili kukagua tawi au mgombea mahususi wa kuunganishwa.
- Tumia **`/babysit <PR#>`** wakati PR mahususi inahitaji kusimamiwa hadi iwe kijani kwenye CI ya moja kwa moja.

## Uhusiano na toleo

- `/generate-release` huita uthibitishaji katika **Awamu ya 0 (ukaguzi wa awali)**: huwekea DRIFT msingi mpya na kurekebisha
  HARD kabla ya kufungua PR ya toleo.
- `/review-prs` hutumia kizuizi cha release-green katika hatua ya uamuzi wa kuunganisha (kijani-kabla-ya-kuunganisha).

Lengo la vipengele vyote ni lilelile: **PR ya toleo iliyo kijani katika uendeshaji wa kwanza wa CI**, badala ya kushughulikia
hali nyekundu katika tabaka za dakika 40 siku ya kutoa toleo.
