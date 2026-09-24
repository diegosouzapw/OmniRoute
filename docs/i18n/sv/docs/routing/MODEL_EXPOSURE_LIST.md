# Model Exposure Allow/Deny List (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/MODEL_EXPOSURE_LIST.md) · 🇪🇹 [am](../../../am/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇦 [ar](../../../ar/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇿 [az](../../../az/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇬 [bg](../../../bg/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇩 [bn](../../../bn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇦 [bs](../../../bs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇿 [cs](../../../cs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇰 [da](../../../da/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇪 [de](../../../de/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇷 [el](../../../el/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇸 [es](../../../es/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇪 [et](../../../et/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇷 [fa](../../../fa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇮 [fi](../../../fi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇷 [fr](../../../fr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇪 [ga](../../../ga/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [gu](../../../gu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ha](../../../ha/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇱 [he](../../../he/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [hi](../../../hi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇷 [hr](../../../hr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇺 [hu](../../../hu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇲 [hy](../../../hy/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇩 [id](../../../id/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ig](../../../ig/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇹 [it](../../../it/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇯🇵 [ja](../../../ja/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇪 [ka](../../../ka/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇭 [km](../../../km/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [kn](../../../kn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇷 [ko](../../../ko/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇹 [lt](../../../lt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇻 [lv](../../../lv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ml](../../../ml/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [mr](../../../mr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇾 [ms](../../../ms/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇹 [mt](../../../mt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇲 [my](../../../my/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇵 [ne](../../../ne/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇱 [nl](../../../nl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇴 [no](../../../no/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [or](../../../or/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [pa](../../../pa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇭 [phi](../../../phi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇱 [pl](../../../pl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇹 [pt](../../../pt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇴 [ro](../../../ro/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇺 [ru](../../../ru/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇰 [si](../../../si/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇰 [sk](../../../sk/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇮 [sl](../../../sl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇸 [sr](../../../sr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇪 [sw](../../../sw/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ta](../../../ta/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [te](../../../te/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇭 [th](../../../th/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇷 [tr](../../../tr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇰 [ur](../../../ur/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇿 [uz](../../../uz/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇻🇳 [vi](../../../vi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [yo](../../../yo/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/MODEL_EXPOSURE_LIST.md)

---

> Anmälningsbaserat, avstängt som standard (om både `modelVisibilityAllowlist` och `modelVisibilityDenylist` är tomma förblir
> `/v1/models`-katalogen OCH varje kandidatpool för `auto/*` identiska på byte-nivå). En motsvarighet till
> `hidePaidModels`/`hideAutoCombos` (`src/lib/db/settings.ts`) för operatörer som vill ha en kurerad
> modellista av skäl som inte har något med kostnad att göra.

## Varför detta finns

`hidePaidModels` besvarar frågan ”är den här modellen kostnadsfri?” och `hideAutoCombos` besvarar ”ska virtuella
`auto/*`-id:n överhuvudtaget visas?” — inget av dem låter en operatör kurera en godtycklig delmängd av
modeller (t.ex. visa exakt de modeller som en viss Claude Code-/OpenCode-klient ska se,
oberoende av prissättning). #11481 lägger till detta i form av två oberoende, anmälningsbaserade inställningar för stränglistor.

## Inställningar

| Nyckel                     | Typ        | Standardvärde | Betydelse                                                                |
| -------------------------- | ---------- | ------------- | ------------------------------------------------------------------------ |
| `modelVisibilityDenylist`  | `string[]` | `[]`          | Poster som matchar en kandidat döljer den från katalogen/kandidatpoolen. |
| `modelVisibilityAllowlist` | `string[]` | `[]`          | När listan inte är tom visas ENDAST kandidater som matchar posterna.     |

Båda accepterar upp till 500 poster med högst 200 tecken vardera (Zod-validerat i
`src/shared/validation/settingsSchemas.ts`). En post är antingen:

- ett exakt katalog-id — `"gpt-4o"` (modell-id utan prefix) eller `"openai/gpt-4o"` (med leverantörsprefix), eller
- ett globmönster som använder `*`/`?` — t.ex. `"openai/gpt-4*"` eller `"anthropic/*"` — som matchas via
  samma delade `globToRegex()`-matchare (`src/shared/utils/globPattern.ts`) som redan används av
  `ModelRoutingSection`:s kombinationsmappningar per modell och `freeModels.ts::matchesOnlyPaidModels`.

Prioritet: spärrlistan kontrolleras först (en spärrad post är alltid dold, även om den också
matchar tillåtelselistan); när tillåtelselistan inte är tom visas endast poster som den matchar.

## Två kontrollpunkter, inte en

Lärdomen från #6512 (ett katalogfilter enbart för `hidePaidModels` lät ändå `auto/*` dirigera till en
betald modell, eftersom kombinationens kandidatpool byggdes separat) gäller på exakt samma sätt här.
Matchningspredikatet `isModelExposureAllowed()` (`src/shared/utils/modelExposureList.ts`) anropas från BÅDE:

- `src/app/api/v1/models/catalog.ts` — själva `/v1/models`-listningen, vid samma fem kontrollpunkter per källa
  som `shouldHidePaid()` redan styr (statiska `PROVIDER_MODELS`, synkroniserade leverantörsrader,
  anpassade rader, aliasbaserade rader och hanterade reservrader).
- `open-sse/services/autoCombo/modelExposureFilter.ts::filterModelExposureCandidates()` — anropas
  från `virtualFactory.ts::buildPreparedPool`, omedelbart efter motsvarande
  `filterPaidOnlyCandidates()`-anrop, så att en spärrad modell aldrig heller kan väljas in i en
  kandidatpool för `auto/*`.

## Vad som INTE filtreras

Speglar det befintliga beteendet hos `hideAutoCombos`: ett modell-id som skickas **explicit** (inte via `auto/*`
och inte upptäcks genom kataloglistningen) blockeras aldrig vid dirigeringen — endast
visning/medlemskap i kandidatpoolen filtreras. Detta är oberoende av `hidePaidModels`;
en operatör kan vilja ha en kurerad uppsättning av skäl som inte har något med kostnad att göra, så båda
inställningarna kombineras som oberoende OCH-kopplade filter, på samma sätt som den befintliga kombinationen av flera flaggor i
`catalog.ts`.

Inställningsexporten (`GET /api/settings/export-json`) inkluderar båda listorna ordagrant, precis som alla andra
inställningsfält — till skillnad från `hidePaidModels`:s exportfilter för kombinationssteg finns det ingen risk för
återinförande här: ett spärrat id som är inbäddat i ett exporterat kombinationssteg är operatörens eget explicita dirigeringsval,
inte något som behöver tas bort vid exportgränsen.
