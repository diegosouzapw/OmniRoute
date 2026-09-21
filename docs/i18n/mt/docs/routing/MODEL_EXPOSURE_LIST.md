# Model Exposure Allow/Deny List (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/MODEL_EXPOSURE_LIST.md) · 🇪🇹 [am](../../../am/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇦 [ar](../../../ar/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇿 [az](../../../az/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇬 [bg](../../../bg/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇩 [bn](../../../bn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇿 [cs](../../../cs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇰 [da](../../../da/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇪 [de](../../../de/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇷 [el](../../../el/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇸 [es](../../../es/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇪 [et](../../../et/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇷 [fa](../../../fa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇮 [fi](../../../fi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇷 [fr](../../../fr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇪 [ga](../../../ga/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [gu](../../../gu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ha](../../../ha/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇱 [he](../../../he/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [hi](../../../hi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇷 [hr](../../../hr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇺 [hu](../../../hu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇲 [hy](../../../hy/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇩 [id](../../../id/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ig](../../../ig/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇹 [it](../../../it/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇯🇵 [ja](../../../ja/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇪 [ka](../../../ka/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇭 [km](../../../km/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [kn](../../../kn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇷 [ko](../../../ko/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇹 [lt](../../../lt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇻 [lv](../../../lv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ml](../../../ml/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [mr](../../../mr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇾 [ms](../../../ms/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇲 [my](../../../my/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇵 [ne](../../../ne/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇱 [nl](../../../nl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇴 [no](../../../no/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [or](../../../or/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [pa](../../../pa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇭 [phi](../../../phi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇱 [pl](../../../pl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇹 [pt](../../../pt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇴 [ro](../../../ro/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇺 [ru](../../../ru/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇰 [si](../../../si/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇰 [sk](../../../sk/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇮 [sl](../../../sl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇸 [sr](../../../sr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇪 [sv](../../../sv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇪 [sw](../../../sw/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ta](../../../ta/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [te](../../../te/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇭 [th](../../../th/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇷 [tr](../../../tr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇰 [ur](../../../ur/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇿 [uz](../../../uz/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇻🇳 [vi](../../../vi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [yo](../../../yo/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/MODEL_EXPOSURE_LIST.md)

---

> Għażla volontarja, diżattivata b’mod awtomatiku (meta `modelVisibilityAllowlist`/`modelVisibilityDenylist`
> ikunu t-tnejn vojta, il-katalgu `/v1/models` U kull ġabra ta’ kandidati `auto/*` jibqgħu identiċi
> byte b’byte). Issettjar relatat ma’ `hidePaidModels`/`hideAutoCombos`
> (`src/lib/db/settings.ts`) għall-operaturi li jixtiequ lista kkurata ta’ mudelli għal raġunijiet
> li m’għandhom x’jaqsmu xejn mal-ispiża.

## Għaliex jeżisti dan

`hidePaidModels` iwieġeb "dan il-mudell huwa bla ħlas?" u `hideAutoCombos` iwieġeb "l-IDs virtwali
`auto/*` għandhom jiġu rreklamati?" — l-ebda wieħed minnhom ma jippermetti lil operatur jikkura
subsett arbitrarju ta’ mudelli (eż. li jippreżenta eżattament il-mudelli li klijent partikolari
ta’ Claude Code / OpenCode għandu jara, indipendentement mill-ipprezzar). #11481 iżid dan bħala
żewġ settings indipendenti u volontarji ta’ arrays ta’ strings.

## Settings

| Ċavetta                    | Tip        | Valur awtomatiku | Tifsira                                                                     |
| -------------------------- | ---------- | ---------------- | --------------------------------------------------------------------------- |
| `modelVisibilityDenylist`  | `string[]` | `[]`             | Entrati li jaqblu ma’ kandidat jaħbuh mill-katalgu/ġabra ta’ kandidati.     |
| `modelVisibilityAllowlist` | `string[]` | `[]`             | Meta ma tkunx vojta, jibqgħu esposti BISS l-entrati li jaqblu ma’ kandidat. |

It-tnejn jaċċettaw sa 500 entrata ta’ mhux aktar minn 200 karattru kull waħda (ivvalidati b’Zod
f’`src/shared/validation/settingsSchemas.ts`). Entrata tkun jew:

- ID eżatt tal-katalgu — `"gpt-4o"` (ID tal-mudell mingħajr prefiss) jew `"openai/gpt-4o"` (bil-prefiss tal-fornitur), jew
- mudell glob li juża `*`/`?` — eż. `"openai/gpt-4*"` jew `"anthropic/*"` — solvut permezz
  tal-istess matcher kondiviż `globToRegex()` (`src/shared/utils/globPattern.ts`) li diġà jintuża
  mill-mappings tal-combos għal kull mudell ta’ `ModelRoutingSection` u minn
  `freeModels.ts::matchesOnlyPaidModels`.

Preċedenza: l-ewwel tiġi ċċekkjata l-lista ta’ projbizzjonijiet (entrata pprojbita dejjem tinħeba,
anke jekk taqbel ukoll mal-lista ta’ permessi); meta l-lista ta’ permessi ma tkunx vojta, jibqgħu
biss l-entrati li jaqblu magħha.

## Żewġ punti kritiċi, mhux wieħed

Il-lezzjoni minn #6512 (filtru tal-katalgu għal `hidePaidModels` biss xorta kien jippermetti lil
`auto/*` jirrotja lejn mudell bi ħlas, peress li l-ġabra ta’ kandidati tal-combo kienet tinbena
b’mod indipendenti) tapplika bl-istess mod hawnhekk. Il-predikat tat-tqabbil
`isModelExposureAllowed()` (`src/shared/utils/modelExposureList.ts`) jissejjaħ miż-ŻEWĠ postijiet:

- `src/app/api/v1/models/catalog.ts` — il-lista `/v1/models` innifisha, fl-istess 5 punti kritiċi
  għal kull sors li `shouldHidePaid()` diġà jikkontrolla (`PROVIDER_MODELS` statiċi, ringieli
  sinkronizzati tal-fornituri, ringieli personalizzati, ringieli sostnuti minn alias, ringieli
  ta’ fallback ġestit).
- `open-sse/services/autoCombo/modelExposureFilter.ts::filterModelExposureCandidates()` — jissejjaħ
  minn `virtualFactory.ts::buildPreparedPool`, immedjatament wara s-sejħa ekwivalenti
  `filterPaidOnlyCandidates()`, sabiex mudell ipprojbit qatt ma jkun jista’ jintgħażel f’ġabra
  ta’ kandidati `auto/*`.

## X’MHUX iffiltrat

Dan jirrifletti l-imġiba eżistenti ta’ `hideAutoCombos`: ID ta’ mudell mibgħut **b’mod espliċitu**
(mhux permezz ta’ `auto/*`, u mhux skopert permezz tal-lista tal-katalgu) qatt ma jiġi mblukkat
waqt id-dispaċċ — jiġu ffiltrati biss ir-reklamar/is-sħubija fil-ġabra ta’ kandidati. Dan huwa
indipendenti minn `hidePaidModels`; operatur jista’ jkun irid sett ikkurat għal raġunijiet li
m’għandhom x’jaqsmu xejn mal-ispiża, għalhekk iż-żewġ settings jiġu kkombinati bħala filtri
indipendenti magħquda b’AND, bħall-istess kompożizzjoni eżistenti ta’ diversi flags
f’`catalog.ts`.

L-esportazzjoni tas-settings (`GET /api/settings/export-json`) tinkludi ż-żewġ arrays kelma
b’kelma, bħal kull field ieħor tas-settings — għall-kuntrarju tal-filtru tal-esportazzjoni
tal-passi tal-combo ta’ `hidePaidModels`, hawnhekk m’hemm l-ebda riskju ta’ ridratazzjoni: ID
ipprojbit inkorporat f’pass esportat ta’ combo huwa l-għażla espliċita tar-routing tal-operatur
stess, mhux xi ħaġa li l-konfini tal-esportazzjoni jeħtieġ ineħħi.
