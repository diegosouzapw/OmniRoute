# Model Exposure Allow/Deny List (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/MODEL_EXPOSURE_LIST.md) · 🇪🇹 [am](../../../am/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇦 [ar](../../../ar/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇿 [az](../../../az/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇬 [bg](../../../bg/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇩 [bn](../../../bn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇿 [cs](../../../cs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇰 [da](../../../da/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇪 [de](../../../de/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇷 [el](../../../el/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇸 [es](../../../es/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇷 [fa](../../../fa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇮 [fi](../../../fi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇷 [fr](../../../fr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇪 [ga](../../../ga/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [gu](../../../gu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ha](../../../ha/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇱 [he](../../../he/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [hi](../../../hi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇷 [hr](../../../hr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇺 [hu](../../../hu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇲 [hy](../../../hy/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇩 [id](../../../id/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ig](../../../ig/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇹 [it](../../../it/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇯🇵 [ja](../../../ja/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇪 [ka](../../../ka/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇭 [km](../../../km/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [kn](../../../kn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇷 [ko](../../../ko/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇹 [lt](../../../lt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇻 [lv](../../../lv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ml](../../../ml/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [mr](../../../mr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇾 [ms](../../../ms/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇹 [mt](../../../mt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇲 [my](../../../my/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇵 [ne](../../../ne/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇱 [nl](../../../nl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇴 [no](../../../no/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [or](../../../or/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [pa](../../../pa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇭 [phi](../../../phi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇱 [pl](../../../pl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇹 [pt](../../../pt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇴 [ro](../../../ro/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇺 [ru](../../../ru/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇰 [si](../../../si/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇰 [sk](../../../sk/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇮 [sl](../../../sl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇸 [sr](../../../sr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇪 [sv](../../../sv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇪 [sw](../../../sw/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ta](../../../ta/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [te](../../../te/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇭 [th](../../../th/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇷 [tr](../../../tr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇰 [ur](../../../ur/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇿 [uz](../../../uz/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇻🇳 [vi](../../../vi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [yo](../../../yo/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/MODEL_EXPOSURE_LIST.md)

---

> Lubatav erand, vaikimisi väljas (kui `modelVisibilityAllowlist`/`modelVisibilityDenylist` on mõlemad tühjad, jäävad
> kataloog `/v1/models` JA kõik `auto/*` kandidaatide kogumid baidi täpsusega samaks). Seadete
> `hidePaidModels`/`hideAutoCombos` (`src/lib/db/settings.ts`) kaaslane operaatoritele, kes soovivad kureeritud
> mudelite loendit põhjustel, millel pole kuludega mingit pistmist.

## Miks see olemas on

`hidePaidModels` vastab küsimusele „kas see mudel on tasuta?“ ja `hideAutoCombos` küsimusele „kas `auto/*`
virtuaalseid ID-sid peaks üldse avalikustama?“ — kumbki neist ei võimalda operaatoril kureerida suvalist mudelite
alamhulka (nt kuvada täpselt neid mudeleid, mida konkreetne Claude Code’i / OpenCode’i klient peaks nägema,
hinnastusest sõltumata). #11481 lisab selleks kaks sõltumatut, lubatava erandina kasutatavat stringimassiivi sätet.

## Sätted

| Võti                       | Tüüp       | Vaikeväärtus | Tähendus                                                                       |
| -------------------------- | ---------- | ------------ | ------------------------------------------------------------------------------ |
| `modelVisibilityDenylist`  | `string[]` | `[]`         | Kandidaadiga kattuvad kirjed peidavad selle kataloogist/kandidaatide kogumist. |
| `modelVisibilityAllowlist` | `string[]` | `[]`         | Kui loend pole tühi, jäävad nähtavaks AINULT kandidaadiga kattuvad kirjed.     |

Mõlemad lubavad kuni 500 kirjet, millest igaüks võib olla kuni 200 märki pikk (Zodiga valideeritud failis
`src/shared/validation/settingsSchemas.ts`). Kirje on kas:

- täpne kataloogi ID — `"gpt-4o"` (mudeli ID ilma prefiksita) või `"openai/gpt-4o"` (teenusepakkuja prefiksiga), või
- metamärkidega muster, mis kasutab `*`/`?` — nt `"openai/gpt-4*"` või `"anthropic/*"` — mida töödeldakse sama
  ühise `globToRegex()` sobitaja (`src/shared/utils/globPattern.ts`) abil, mida juba kasutavad
  `ModelRoutingSection`-i mudelipõhised kombinatsioonivastendused ja `freeModels.ts::matchesOnlyPaidModels`.

Prioriteet: esmalt kontrollitakse keeluloendit (keelatud kirje on alati peidetud, isegi kui see kattub ka
lubamisloendiga); kui lubamisloend pole tühi, jäävad alles ainult sellega kattuvad kirjed.

## Kaks kontrollpunkti, mitte üks

Siin kehtib samamoodi #6512 õppetund (`hidePaidModels`-i põhine kataloogifilter võimaldas endiselt marsruutida
`auto/*` tasulisele mudelile, sest kombinatsiooni kandidaatide kogum koostati eraldi).
Sobitamispredikaati `isModelExposureAllowed()` (`src/shared/utils/modelExposureList.ts`) kutsutakse MÕLEMAS kohas:

- `src/app/api/v1/models/catalog.ts` — `/v1/models` loend ise, samades viies allikapõhises
  kontrollpunktis, mida juba piirab `shouldHidePaid()` (staatiline `PROVIDER_MODELS`, sünkroonitud teenusepakkuja read,
  kohandatud read, aliasepõhised read, hallatud varuvariandi read).
- `open-sse/services/autoCombo/modelExposureFilter.ts::filterModelExposureCandidates()` — seda kutsutakse
  funktsioonist `virtualFactory.ts::buildPreparedPool` kohe pärast samaväärset
  `filterPaidOnlyCandidates()` kutset, mistõttu ei saa keelatud mudelit kunagi valida ka `auto/*`
  kandidaatide kogumisse.

## Mida EI filtreerita

See järgib `hideAutoCombos` olemasolevat käitumist: **eksplitsiitselt** saadetud mudeli ID-d (mitte `auto/*` kaudu
ega kataloogiloendist leitud) ei blokeerita päringu edastamisel kunagi — filtreeritakse ainult
avalikustamist/kandidaatide kogumisse kuulumist. See ei sõltu sättest `hidePaidModels`;
operaator võib soovida kureeritud kogumit põhjustel, millel pole kuludega mingit pistmist, seega
rakendatakse mõlemat sätet sõltumatute JA-seosega filtritena, nagu olemasolevat mitme lipu kombinatsiooni failis
`catalog.ts`.

Sätete eksport (`GET /api/settings/export-json`) sisaldab mõlemat massiivi muutmata kujul nagu kõiki teisi
sätete välju — erinevalt `hidePaidModels`-i kombinatsioonisammu ekspordifiltrist puudub siin taastamisel
risk: eksporditud kombinatsioonisammu manustatud keelatud ID on operaatori enda eksplitsiitne marsruutimisvalik,
mitte miski, mida tuleks ekspordi piiril eemaldada.
