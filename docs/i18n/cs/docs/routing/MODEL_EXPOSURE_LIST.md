# Model Exposure Allow/Deny List (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/MODEL_EXPOSURE_LIST.md) · 🇪🇹 [am](../../../am/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇦 [ar](../../../ar/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇿 [az](../../../az/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇬 [bg](../../../bg/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇩 [bn](../../../bn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇰 [da](../../../da/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇪 [de](../../../de/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇷 [el](../../../el/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇸 [es](../../../es/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇪 [et](../../../et/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇷 [fa](../../../fa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇮 [fi](../../../fi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇷 [fr](../../../fr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇪 [ga](../../../ga/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [gu](../../../gu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ha](../../../ha/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇱 [he](../../../he/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [hi](../../../hi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇷 [hr](../../../hr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇺 [hu](../../../hu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇲 [hy](../../../hy/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇩 [id](../../../id/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ig](../../../ig/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇹 [it](../../../it/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇯🇵 [ja](../../../ja/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇪 [ka](../../../ka/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇭 [km](../../../km/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [kn](../../../kn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇷 [ko](../../../ko/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇹 [lt](../../../lt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇻 [lv](../../../lv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ml](../../../ml/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [mr](../../../mr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇾 [ms](../../../ms/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇹 [mt](../../../mt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇲 [my](../../../my/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇵 [ne](../../../ne/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇱 [nl](../../../nl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇴 [no](../../../no/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [or](../../../or/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [pa](../../../pa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇭 [phi](../../../phi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇱 [pl](../../../pl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇹 [pt](../../../pt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇴 [ro](../../../ro/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇺 [ru](../../../ru/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇰 [si](../../../si/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇰 [sk](../../../sk/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇮 [sl](../../../sl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇸 [sr](../../../sr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇪 [sv](../../../sv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇪 [sw](../../../sw/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ta](../../../ta/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [te](../../../te/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇭 [th](../../../th/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇷 [tr](../../../tr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇰 [ur](../../../ur/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇿 [uz](../../../uz/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇻🇳 [vi](../../../vi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [yo](../../../yo/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/MODEL_EXPOSURE_LIST.md)

---

> Funkce je volitelná a ve výchozím nastavení vypnutá (pokud jsou `modelVisibilityAllowlist` i `modelVisibilityDenylist` prázdné,
> katalog `/v1/models` A všechny fondy kandidátů `auto/*` zůstávají bajtově identické). Jde o protějšek
> nastavení `hidePaidModels`/`hideAutoCombos` (`src/lib/db/settings.ts`) určený operátorům, kteří chtějí spravovaný
> seznam modelů z důvodů, které nijak nesouvisejí s cenou.

## Proč tato funkce existuje

`hidePaidModels` odpovídá na otázku „je tento model bezplatný?“ a `hideAutoCombos` na otázku „mají být
virtuální ID `auto/*` vůbec zveřejňována?“ — ani jedno však operátorovi neumožňuje vybrat libovolnou podmnožinu
modelů (např. zobrazit přesně ty modely, které má daný klient Claude Code / OpenCode vidět,
nezávisle na ceně). #11481 tuto možnost přidává pomocí dvou nezávislých, volitelných nastavení typu pole řetězců.

## Nastavení

| Klíč                       | Typ        | Výchozí hodnota | Význam                                                                          |
| -------------------------- | ---------- | --------------- | ------------------------------------------------------------------------------- |
| `modelVisibilityDenylist`  | `string[]` | `[]`            | Položky odpovídající kandidátovi jej skryjí z katalogu/fondu kandidátů.         |
| `modelVisibilityAllowlist` | `string[]` | `[]`            | Pokud není prázdný, zůstanou zveřejněny POUZE položky odpovídající kandidátovi. |

Obě nastavení přijímají až 500 položek, každou o délce maximálně 200 znaků (validováno pomocí Zod v
`src/shared/validation/settingsSchemas.ts`). Položkou je buď:

- přesné ID v katalogu — `"gpt-4o"` (samotné ID modelu) nebo `"openai/gpt-4o"` (s prefixem poskytovatele), nebo
- vzor glob používající `*`/`?` — např. `"openai/gpt-4*"` nebo `"anthropic/*"` — vyhodnocovaný pomocí
  stejného sdíleného nástroje `globToRegex()` pro porovnávání (`src/shared/utils/globPattern.ts`), který již používají
  mapování kombinací pro jednotlivé modely v `ModelRoutingSection` a `freeModels.ts::matchesOnlyPaidModels`.

Priorita: nejprve se kontroluje seznam zakázaných položek (zakázaná položka je vždy skryta, i když zároveň
odpovídá seznamu povolených položek); pokud seznam povolených položek není prázdný, zůstanou pouze položky, které mu odpovídají.

## Dva kontrolní body, nikoli jeden

Poznatky z #6512 (filtr katalogu založený pouze na `hidePaidModels` stále umožňoval směrovat `auto/*` na
placený model, protože fond kandidátů kombinace se sestavoval nezávisle) zde platí úplně stejně.
Predikát pro porovnávání `isModelExposureAllowed()` (`src/shared/utils/modelExposureList.ts`) se
volá na OBOU místech:

- `src/app/api/v1/models/catalog.ts` — samotný výpis `/v1/models`, ve stejných 5 kontrolních bodech pro jednotlivé zdroje,
  které již kontroluje `shouldHidePaid()` (statické `PROVIDER_MODELS`, synchronizované řádky poskytovatelů,
  vlastní řádky, řádky založené na aliasech, řádky spravovaných záložních modelů).
- `open-sse/services/autoCombo/modelExposureFilter.ts::filterModelExposureCandidates()` — voláno
  z `virtualFactory.ts::buildPreparedPool` ihned po ekvivalentním volání
  `filterPaidOnlyCandidates()`, takže zakázaný model nemůže být nikdy vybrán ani do fondu kandidátů
  `auto/*`.

## Co se NEFILTRUJE

Chování odpovídá stávajícímu chování `hideAutoCombos`: ID modelu odeslané **explicitně** (nikoli prostřednictvím `auto/*`
a nikoli nalezené přes výpis katalogu) není při odesílání nikdy blokováno — filtruje se pouze
zveřejnění/členství ve fondu kandidátů. Toto je nezávislé na `hidePaidModels`;
operátor může chtít spravovanou sadu z důvodů, které nijak nesouvisejí s cenou, takže se obě
nastavení skládají jako nezávislé filtry spojené logickým AND, stejně jako stávající skládání více příznaků v
`catalog.ts`.

Export nastavení (`GET /api/settings/export-json`) obsahuje obě pole beze změny, stejně jako jakékoli jiné
pole nastavení — na rozdíl od filtru exportu kroků kombinace v `hidePaidModels` zde nehrozí riziko
opětovného načtení: zakázané ID vložené do exportovaného kroku kombinace je explicitní volbou směrování
samotného operátora, nikoli něčím, co by bylo nutné na hranici exportu odstranit.
