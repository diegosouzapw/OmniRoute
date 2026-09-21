# Model Exposure Allow/Deny List (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/MODEL_EXPOSURE_LIST.md) · 🇪🇹 [am](../../../am/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇦 [ar](../../../ar/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇿 [az](../../../az/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇬 [bg](../../../bg/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇩 [bn](../../../bn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇿 [cs](../../../cs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇰 [da](../../../da/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇪 [de](../../../de/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇷 [el](../../../el/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇸 [es](../../../es/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇪 [et](../../../et/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇷 [fa](../../../fa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇮 [fi](../../../fi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇷 [fr](../../../fr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇪 [ga](../../../ga/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [gu](../../../gu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ha](../../../ha/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇱 [he](../../../he/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [hi](../../../hi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇷 [hr](../../../hr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇺 [hu](../../../hu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇲 [hy](../../../hy/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇩 [id](../../../id/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ig](../../../ig/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇹 [it](../../../it/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇯🇵 [ja](../../../ja/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇪 [ka](../../../ka/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇭 [km](../../../km/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [kn](../../../kn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇷 [ko](../../../ko/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇹 [lt](../../../lt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇻 [lv](../../../lv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ml](../../../ml/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [mr](../../../mr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇾 [ms](../../../ms/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇹 [mt](../../../mt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇲 [my](../../../my/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇵 [ne](../../../ne/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇱 [nl](../../../nl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇴 [no](../../../no/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [or](../../../or/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [pa](../../../pa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇭 [phi](../../../phi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇱 [pl](../../../pl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇹 [pt](../../../pt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇴 [ro](../../../ro/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇺 [ru](../../../ru/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇰 [si](../../../si/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇰 [sk](../../../sk/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇸 [sr](../../../sr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇪 [sv](../../../sv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇪 [sw](../../../sw/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ta](../../../ta/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [te](../../../te/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇭 [th](../../../th/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇷 [tr](../../../tr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇰 [ur](../../../ur/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇿 [uz](../../../uz/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇻🇳 [vi](../../../vi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [yo](../../../yo/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/MODEL_EXPOSURE_LIST.md)

---

> Izbirna funkcija, privzeto izklopljena (če sta `modelVisibilityAllowlist`/`modelVisibilityDenylist` oba prazna,
> ostaneta katalog `/v1/models` IN vsaka množica kandidatov `auto/*` bajtno identična). Sorodna nastavitev
> nastavitvama `hidePaidModels`/`hideAutoCombos` (`src/lib/db/settings.ts`) za upravljavce, ki želijo kuriran
> seznam modelov iz razlogov, ki niso povezani s stroški.

## Zakaj to obstaja

`hidePaidModels` odgovarja na vprašanje »ali je ta model brezplačen?«, `hideAutoCombos` pa na vprašanje »ali naj se
navidezni ID-ji `auto/*` sploh oglašujejo?« — nobena od njiju upravljavcu ne omogoča kuriranja poljubne podmnožice
modelov (npr. prikaza natanko tistih modelov, ki naj jih vidi določen odjemalec Claude Code / OpenCode,
neodvisno od cen). #11481 to dodaja v obliki dveh neodvisnih, izbirnih nastavitev nizov.

## Nastavitve

| Ključ                      | Vrsta      | Privzeto | Pomen                                                                              |
| -------------------------- | ---------- | -------- | ---------------------------------------------------------------------------------- |
| `modelVisibilityDenylist`  | `string[]` | `[]`     | Vnosi, ki se ujemajo s kandidatom, ga skrijejo iz kataloga/množice kandidatov.     |
| `modelVisibilityAllowlist` | `string[]` | `[]`     | Ko seznam ni prazen, ostanejo izpostavljeni SAMO kandidati, ki se ujemajo z vnosi. |

Obe sprejmeta do 500 vnosov z največ 200 znaki na vnos (preverjeno z Zod v
`src/shared/validation/settingsSchemas.ts`). Vnos je lahko:

- natančen ID iz kataloga — `"gpt-4o"` (goli ID modela) ali `"openai/gpt-4o"` (s predpono ponudnika), ali
- vzorec glob z uporabo `*`/`?` — npr. `"openai/gpt-4*"` ali `"anthropic/*"` — razrešen z istim
  skupnim ujemalnikom `globToRegex()` (`src/shared/utils/globPattern.ts`), ki se že uporablja za
  preslikave kombinacij po modelih v `ModelRoutingSection` in `freeModels.ts::matchesOnlyPaidModels`.

Prednost: najprej se preveri seznam prepovedanih vnosov (prepovedan vnos je vedno skrit, tudi če se
ujema tudi s seznamom dovoljenih vnosov); ko seznam dovoljenih vnosov ni prazen, ostanejo samo vnosi, ki se z njim ujemajo.

## Dve nadzorni točki, ne ena

Tukaj velja enaka lekcija kot pri #6512 (filter kataloga samo na podlagi `hidePaidModels` je modelu
`auto/*` še vedno omogočal usmerjanje na plačljiv model, saj je bila množica kandidatov za kombinacijo
zgrajena neodvisno). Predikat za ujemanje `isModelExposureAllowed()` (`src/shared/utils/modelExposureList.ts`) se
kliče z OBEH mest:

- `src/app/api/v1/models/catalog.ts` — sam seznam `/v1/models`, na istih 5 nadzornih točkah za posamezne vire,
  ki jih že omejuje `shouldHidePaid()` (statični `PROVIDER_MODELS`, sinhronizirane vrstice ponudnikov,
  vrstice po meri, vrstice, podprte z vzdevki, vrstice upravljanih nadomestnih možnosti).
- `open-sse/services/autoCombo/modelExposureFilter.ts::filterModelExposureCandidates()` — kliče se
  iz `virtualFactory.ts::buildPreparedPool`, takoj po enakovrednem klicu
  `filterPaidOnlyCandidates()`, zato prepovedan model nikoli ne more biti izbran niti v množico
  kandidatov `auto/*`.

## Kaj NI filtrirano

Sledi obstoječemu vedenju nastavitve `hideAutoCombos`: ID modela, poslan **izrecno** (ne prek `auto/*`
in ne odkrit prek seznama kataloga), ni nikoli blokiran med posredovanjem — filtrirata se samo
oglaševanje/članstvo v množici kandidatov. To je neodvisno od `hidePaidModels`;
upravljavec lahko želi kuriran nabor iz razlogov, ki niso povezani s stroški, zato se obe
nastavitvi sestavljata kot neodvisna filtra, povezana z logičnim IN, enako kot obstoječa sestava več zastavic v
`catalog.ts`.

Izvoz nastavitev (`GET /api/settings/export-json`) vključuje obe tabeli nespremenjeni, tako kot vsa druga
polja nastavitev — v nasprotju s filtrom izvoza korakov kombinacij nastavitve `hidePaidModels` tukaj ni tveganja
ponovne hidracije: prepovedani ID, vdelan v izvožen korak kombinacije, je upravljavčeva lastna izrecna izbira usmerjanja
in ne nekaj, kar bi morala meja izvoza odstraniti.
