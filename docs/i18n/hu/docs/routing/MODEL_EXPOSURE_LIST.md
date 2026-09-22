# Model Exposure Allow/Deny List (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/MODEL_EXPOSURE_LIST.md) · 🇪🇹 [am](../../../am/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇦 [ar](../../../ar/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇿 [az](../../../az/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇬 [bg](../../../bg/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇩 [bn](../../../bn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇿 [cs](../../../cs/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇰 [da](../../../da/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇩🇪 [de](../../../de/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇷 [el](../../../el/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇸 [es](../../../es/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇪🇪 [et](../../../et/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇷 [fa](../../../fa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇮 [fi](../../../fi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇫🇷 [fr](../../../fr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇪 [ga](../../../ga/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [gu](../../../gu/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ha](../../../ha/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇱 [he](../../../he/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [hi](../../../hi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇭🇷 [hr](../../../hr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇦🇲 [hy](../../../hy/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇩 [id](../../../id/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [ig](../../../ig/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇹 [it](../../../it/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇯🇵 [ja](../../../ja/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇬🇪 [ka](../../../ka/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇭 [km](../../../km/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [kn](../../../kn/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇷 [ko](../../../ko/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇹 [lt](../../../lt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇻 [lv](../../../lv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ml](../../../ml/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [mr](../../../mr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇾 [ms](../../../ms/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇹 [mt](../../../mt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇲🇲 [my](../../../my/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇵 [ne](../../../ne/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇱 [nl](../../../nl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇴 [no](../../../no/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [or](../../../or/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [pa](../../../pa/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇭 [phi](../../../phi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇱 [pl](../../../pl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇹 [pt](../../../pt/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇴 [ro](../../../ro/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇺 [ru](../../../ru/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇱🇰 [si](../../../si/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇰 [sk](../../../sk/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇮 [sl](../../../sl/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇷🇸 [sr](../../../sr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇸🇪 [sv](../../../sv/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇰🇪 [sw](../../../sw/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [ta](../../../ta/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇮🇳 [te](../../../te/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇭 [th](../../../th/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇷 [tr](../../../tr/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇵🇰 [ur](../../../ur/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇺🇿 [uz](../../../uz/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇻🇳 [vi](../../../vi/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇳🇬 [yo](../../../yo/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/MODEL_EXPOSURE_LIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/MODEL_EXPOSURE_LIST.md)

---

> Önkéntesen bekapcsolható, alapértelmezés szerint ki van kapcsolva (ha a `modelVisibilityAllowlist`/`modelVisibilityDenylist` mindkettő üres, akkor
> a `/v1/models` katalógus ÉS minden `auto/*` jelöltkészlet bájtszinten változatlan marad). A
> `hidePaidModels`/`hideAutoCombos` testvérbeállítása (`src/lib/db/settings.ts`) azon üzemeltetők számára, akik
> a költségektől független okokból válogatott modelllistát szeretnének.

## Miért létezik ez?

A `hidePaidModels` arra a kérdésre válaszol, hogy „ingyenes-e ez a modell?”, a `hideAutoCombos` pedig arra, hogy „egyáltalán meg kell-e
jeleníteni az `auto/*` virtuális azonosítókat?” — egyik sem teszi lehetővé, hogy az üzemeltető a
modellek tetszőleges részhalmazát válogassa össze (például pontosan azokat a modelleket jelenítse meg, amelyeket egy adott Claude Code / OpenCode kliensnek látnia kell,
az árképzéstől függetlenül). A #11481 ezt két független, önkéntesen bekapcsolható karakterlánctömb-beállítással valósítja meg.

## Beállítások

| Kulcs                      | Típus      | Alapérték | Jelentés                                                                         |
| -------------------------- | ---------- | --------- | -------------------------------------------------------------------------------- |
| `modelVisibilityDenylist`  | `string[]` | `[]`      | A jelöltre illeszkedő bejegyzések elrejtik azt a katalógusból/jelöltkészletből.  |
| `modelVisibilityAllowlist` | `string[]` | `[]`      | Ha nem üres, CSAK a valamely bejegyzésre illeszkedő jelöltek maradnak elérhetők. |

Mindkettő legfeljebb 500, egyenként maximum 200 karakteres bejegyzést fogad el (Zod által ellenőrizve a
`src/shared/validation/settingsSchemas.ts` fájlban). Egy bejegyzés az alábbiak egyike lehet:

- pontos katalógusazonosító — `"gpt-4o"` (egyszerű modellazonosító) vagy `"openai/gpt-4o"` (szolgáltató-előtaggal), vagy
- `*`/`?` karaktereket használó glob minta — például `"openai/gpt-4*"` vagy `"anthropic/*"` —, amelynek feloldása ugyanazzal a
  megosztott `globToRegex()` illesztővel (`src/shared/utils/globPattern.ts`) történik, amelyet már a
  `ModelRoutingSection` modellenkénti kombinációleképezései és a `freeModels.ts::matchesOnlyPaidModels` is használnak.

Elsőbbség: először a tiltólista ellenőrzése történik meg (egy tiltott bejegyzés mindig rejtve marad, még akkor is, ha
az engedélyezési listára is illeszkedik); ha az engedélyezési lista nem üres, csak a rá illeszkedő bejegyzések maradnak meg.

## Két ellenőrzési pont, nem egy

A #6512 tanulsága (egy kizárólag `hidePaidModels`-alapú katalógusszűrő továbbra is lehetővé tette, hogy az `auto/*` egy
fizetős modellhez irányítson, mivel a kombináció jelöltkészlete ettől függetlenül épült fel) itt ugyanúgy érvényes.
Az `isModelExposureAllowed()` illesztési predikátum (`src/shared/utils/modelExposureList.ts`) MINDKÉT helyen
meghívásra kerül:

- `src/app/api/v1/models/catalog.ts` — magában a `/v1/models` listázásban, ugyanazon az 5 forrásonkénti
  ellenőrzési ponton, amelyeket a `shouldHidePaid()` már most is felügyel (statikus `PROVIDER_MODELS`, szinkronizált szolgáltatói sorok,
  egyéni sorok, aliasalapú sorok, felügyelt tartaléksorok).
- `open-sse/services/autoCombo/modelExposureFilter.ts::filterModelExposureCandidates()` — a
  `virtualFactory.ts::buildPreparedPool` hívja meg közvetlenül az ennek megfelelő
  `filterPaidOnlyCandidates()` hívás után, így egy tiltott modell soha nem kerülhet be egy `auto/*`
  jelöltkészletbe sem.

## Mi NINCS szűrve?

A `hideAutoCombos` meglévő működését tükrözi: a **kifejezetten** megadott modellazonosító (nem `auto/*` útján,
és nem a katalóguslistán keresztül felfedezve) soha nincs blokkolva a továbbításkor — csak a
megjelenítés/jelöltkészlet-tagság van szűrve. Ez független a `hidePaidModels` beállítástól;
egy üzemeltető a költségektől független okokból is válogatott készletet akarhat, ezért a két
beállítás egymástól független, ÉS kapcsolatban összekapcsolt szűrőként működik, ugyanúgy, mint a
`catalog.ts` meglévő, több jelzőből álló kompozíciója.

A beállítások exportja (`GET /api/settings/export-json`) mindkét tömböt változtatás nélkül tartalmazza, akárcsak bármely más
beállításmezőt — a `hidePaidModels` kombinációlépéseket érintő exportszűrőjével ellentétben itt nincs újrahidratálási
kockázat: az exportált kombinációlépésbe ágyazott tiltott azonosító az üzemeltető saját, explicit útválasztási
döntése, nem pedig olyasmi, amit az exportálási határnak el kellene távolítania.
