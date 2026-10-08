# Cursor Provider in Docker Environments (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

Երբ OmniRoute-ն աշխատում է Docker-ի ներսում, հնացած **Import from Cursor IDE** /
`cursor-agent` հոսքերը չեն աշխատում, քանի որ կոնտեյները չի կարող տեսնել հոսթում տեղադրված Cursor-ը։
Փոխարենը օգտագործեք **Login with Cursor**-ը (deep-control PKCE)։

## Ինչու IDE / CLI ներմուծումը չի աշխատում Docker-ում

1. **Ֆայլային համակարգի մեկուսացում** — Ինքնաներմուծումը որոնում է Linux-ի ուղիներ, օրինակ՝
   `~/.config/Cursor/User/globalStorage/state.vscdb`, կոնտեյների _ներսում_։
   macOS-ի Docker Desktop-ում հոսթի IDE DB-ն լռելյայն կցված չէ, իսկ
   կոնտեյների ՕՀ-ն Linux է, նույնիսկ երբ հոսթը Darwin է։
2. **`cursor-agent` երկուական ֆայլի բացակայություն** — OmniRoute-ի պաշտոնական պատկերները
   չեն ներառում `cursor-agent`։ Նախկինում Available Models-ը shell-ի միջոցով գործարկում էր
   `cursor-agent --list-models` և ձախողման դեպքում անցնում ստատիկ կատալոգի։
3. **Սխալ երկուական ֆայլ** — **Մի՛** bind-mount արեք macOS-ի `cursor-agent`-ը Linux
   կոնտեյների մեջ։ Այն չի գործարկվի։

## Առաջարկվող տարբերակ՝ մուտք Cursor-ով

1. Բացեք **Dashboard → Providers → Cursor**։
2. Ընտրեք **Login with Cursor** ներդիրը։
3. Սեղմեք **Login with Cursor** — OmniRoute-ը ձեր **հոսթի** դիտարկիչում բացում է
   `https://cursor.com/loginDeepControl?…` հասցեն։
4. Հաստատեք մուտքը դիտարկիչում, ապա վերադարձեք կառավարման վահանակ։ OmniRoute-ը
   հարցումներով ստուգում է `api2.cursor.sh/auth/poll`-ը, մինչև թոքենները հասանելի լինեն։
5. OmniRoute-ը պահպանում է **մուտքի + թարմացման** թոքենները և թարմացնում դրանք
   `https://api2.cursor.sh/auth/exchange_user_api_key`-ի միջոցով։

Այս եղանակը չի պահանջում Cursor IDE կամ `cursor-agent` կոնտեյների ներսում։

## Մոդելների հայտնաբերում

Մուտք գործած կապի դեպքում **Available Models / Auto-Sync**-ը նախընտրում է Cursor-ի
HTTP `AiService/AvailableModels` կատալոգը՝ օգտագործելով կապի bearer թոքենը։
Եթե դա ձախողվի, OmniRoute-ը շարունակում է փորձել հոսթի `cursor-agent`-ը (եթե առկա է), ապա՝
ստատիկ ռեեստրի սկզբնական տվյալները։

OmniRoute-ը կատալոգում միշտ ցուցադրում է **`auto`**-ն (ցուցադրվող անունը՝ «Auto»), ինչպես նաև
OpenCodex ոճի երթուղիչի ռեժիմները՝ **`auto-cost`**, **`auto-balance`** և
**`auto-intelligence`**։ Փոխանցման մակարդակում դրանք համապատասխանում են Cursor-ի `default` մոդելին
(երեք տարբերակների համար `optimization` ModelParameter-ով)։ Նախընտրեք
`cu/auto`-ն, երբ պրեմիում մոդելների օգտագործման պաշարը սպառված է․ Auto-ն հաճախ դեռ բյուջե ունի։

### Համաժամացումից հետո կենդանի կատալոգը բացառիկ է

Cursor-ի մոդելների հաջող համաժամացումից հետո (`cursor-agent --list-models` → պահպանված
համաժամացված կատալոգ, կամ վերևում նշված bearer վավերացմամբ `AvailableModels` հարցում)
**կառավարման վահանակը**, **`/v1/models`**-ը և **Test All**-ը ցուցադրում են՝

1. Կենդանի համաժամացման միջոցով վերադարձված մոդելները
2. Ներմուծված ավտոմատ երթուղիչների id-ները՝ `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. Օպերատորի **հատուկ** մոդելները (Import / manual), որոնք երբեք չեն հեռացվում համաժամացման ընթացքում

`open-sse/config/providers/registry/cursor/`-ում գտնվող մեծ ստատիկ ռեեստրը
**միայն անցանց պահուստային տարբերակ** է։ Երբ համաժամացված ցանկը դատարկ է (կամ հայտնաբերումը ձախողվում է),
ցուցակումը վերադառնում է այդ ռեեստրին։

Ջանքի մակարդակի վերջածանցով id-ները (օրինակ՝ `claude-4.6-sonnet-high`) դեռ կարող են
**հարցվել** կատարման ընթացքում․ `resolveRequestedModel`-ը հեռացնում է վերջածանցը և այն վերածում
փոխանցման համար նախատեսված `ModelParameter`-ի։ Բացառիկ ցուցակումը միտումնավոր թաքցնում է այդ ստատիկ տարբերակները
Test All-ից, որպեսզի ստուգումները համապատասխանեն Cursor-ի կողմից իրականում հասանելի վերադարձվող մոդելներին։

### Օժանդակ ֆունկցիաներ

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — կառավարման վահանակի միավորում
- `ensureCursorAutoCatalogEntry` — auto* ներարկում հայտնաբերման և ցուցակման ժամանակ
- `shouldSuppressStaticModelForExclusiveListing` — `/v1/models`-ի ստատիկ ցիկլ

## Մատակարարի սահմանաչափեր (քվոտա)

Cursor-ի համար **Usage → Provider Limits**-ն օգտագործում է Bearer API-ները `api2.cursor.sh`-ում
(`GetCurrentPeriodUsage` → օգտագործման ամփոփում → auth/usage)՝ PKCE-ից կամ թոքենի
ներմուծումից հետո։ Հնացած cookie/`cursor.com` կառավարման վահանակի ուղին մնում է որպես վերջին պահուստային տարբերակ
IDE-ից ներմուծված ավելի հին սեսիաների համար։

Պատուհանները սովորաբար ներառում են **Total**, **Auto + Composer** և **API**։ Եթե
սահմանաչափերը դատարկ են թվում, կրկին գործարկեք **Login with Cursor**-ը կամ վերաներմուծեք թոքենները (միայն IDE-ից ներմուծումն
այլևս պարտադիր չէ)։

## Դատարկ հերթեր / օգտագործման պաշարի սպառում

Երբ Cursor-ն ընդունում է Run-ը, բայց օգնականի տեքստ չի վերադարձնում (սովորաբար, երբ պրեմիում
օգտագործման պաշարը սպառված է), OmniRoute-ը ցուցադրում է գործողություն հուշող **429** (քվոտայի նշաններ) կամ
ուղղորդմամբ **502**, այլ ոչ թե պարզապես «Provider returned empty content»։ Հոսքային
ձախողումները, օրինակ՝ `not_found: AI Model Not Found` (օգտագործման պատուհանի սպառում), դասակարգվում են
որպես **Cursor-ի արագության սահմանաչափի / օգտագործման գերազանցում**, և այդ հաղորդագրությունը պահպանվում է
SSE մշակման շղթայի ողջ ընթացքում (դատարկ հոսքի ընդհանուր պաշտպանիչ մեխանիզմը չի վերագրում արդեն
արտածված սխալը)։ Ստուգեք Provider Limits-ը, փորձեք **`auto`** մոդելը կամ բարձրացրեք
Cursor պլանի սահմանաչափերը։

## Հաճախորդի տարբերակ (առանց ինտերֆեյսի)

Առանց տեղական `cursor-agent` տեղադրման՝ OmniRoute-ը որոշում է
`x-cursor-client-version`-ը նախ env-ի `CURSOR_AGENT_CLI_VERSION`-ի միջոցով, ապա Cursor-ի տեղադրիչի
սկրիպտի՝ սկավառակում քեշավորված վերլուծման միջոցով, իսկ հետո՝ ամրագրված build id-ով։ Անհրաժեշտության դեպքում
վերասահմանեք `CURSOR_AGENT_CLI_VERSION`-ով։

## Պահուստային տարբերակ՝ թոքենի ձեռքով ներմուծում

Եթե չեք կարող ավարտել մուտքը դիտարկիչով՝

1. Հոսթում դուրս բերեք թոքենները Cursor-ի `state.vscdb`-ից՝

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Cursor-ի վավերացման մոդալ պատուհանում բացեք **Import token**-ը։
3. Տեղադրեք **Access Token**-ը և, եթե առկա է, **Refresh Token**-ը (պարտադիր է
   ավտոմատ թարմացման համար)։ Machine ID-ն պարտադիր չէ։

Միայն մուտքի թոքենով ներմուծումները նույնպես աշխատում են, սակայն առանց թարմացման թոքենի դրանց ժամկետը կլրանա․
վերաներմուծեք, երբ չատը վերադարձնի վավերացման սխալներ։

## Առնչվող նյութեր

- Zed Docker-ի ուղեցույց՝ [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- OpenCodex Cursor-ի մուտքի տեղեկատու (արտաքին)՝
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
