# Account-Ban / Banned-Keyword Detection (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇧🇦 [bs](../../../bs/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute-ը մատակարարից ստացված սխալի պատասխաններում որոնում է ազդանշաններ, որոնք ցույց են տալիս, որ մատակարարի
**հաշիվը մշտապես անգործուն է** (կասեցված / ապաակտիվացված / ToS-ի խախտման պատճառով արգելափակված), և համընկնման
դեպքում այդ կապը տեղափոխում է **վերջնական `banned` վիճակ**, որպեսզի այն այլևս
չընտրվի հարցումների համար։ Հենց սա է կարգավորում **Security → Banned Keywords**
կարգավորումների քարտը («Լրացուցիչ հիմնաբառեր, որոնք ակտիվացնում են հաշվի մշտական
արգելափակման հայտնաբերումը։ Ներկառուցված հիմնաբառերը միշտ կիրառվում են։»)։

Այս էջը նկարագրում է ներկառուցված ցանկը, հայտնաբերման ընթացքը, դրա կիրառման շրջանակը, հատուկ
հիմնաբառերն անվտանգ ավելացնելու եղանակը և նշագրված կապը վերականգնելու ձևը։ Վերջնական
վիճակն ինքնին կայունության մոդելի մաս է կազմում․ տե՛ս
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) («Վերջնական վիճակներ»)։

**Ճշմարտության աղբյուր՝** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`)։

## Ներկառուցված հիմնաբառեր

Այս 8 ենթատողերը միշտ կիրառվում են (առանց մեծատառ/փոքրատառ տարբերակման)՝ անկախ հատուկ ցանկից.

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
verify your account to continue                                 (Antigravity / Google Cloud Code)
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> Այս ցանկը փոփոխվում է, երբ մատակարարները փոխում են արգելափակման մասին իրենց ձևակերպումները։ Հեղինակավոր
> պատճենը `ACCOUNT_DEACTIVATED_SIGNALS`-ն է՝ `open-sse/services/accountFallback.ts`-ում․
> վերևի բլոկը դիտարկեք որպես տվյալ պահի պատճեն։

Նույն ֆայլում կան երկու հարակից, **առանձին** ազդանշանների աղյուսակներ, որոնք արգելված հիմնաբառերի
հայտնաբերման մաս _չեն_ կազմում.

- `CREDITS_EXHAUSTED_SIGNALS` — վճարային միջոցները/քվոտան սպառված են (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → վերջնական `credits_exhausted`։
- `OAUTH_INVALID_TOKEN_SIGNALS` — **ոչ վերջնական**․ թոքենի թարմացումը կարող է վերականգնել աշխատանքը։

Նշում․ տարածված ժամանակավոր արտահայտությունները, ինչպիսիք են **`rate limit`** / `429`, մշակվում են
հարցումների հաճախականության սահմանափակման / կապի ժամանակավոր դադարի մեխանիզմով և արգելափակման ազդանշաններ **չեն**։

## Հայտնաբերման ընթացքը

```
մատակարարից ստացված սխալի պատասխան
  → մարմինը վերածվում է տողի + փոքրատառերի
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [ենթատողի համընկնում]
  → համընկնո՞ւմ է
      → կապի testStatus = "banned"      (մշտական՝ 1 տարվա ժամանակավոր դադար, երբեք ինքնաբերաբար չի վերականգնվում)
      → եթե `autoDisableBannedAccounts` կարգավորումը միացված է, և `autoDisableBannedScope`-ը
        ներառում է այս կապը (`all`, կամ `subscription`՝ OAuth/cookie/session-ի համար)
        → նաև isActive = false։ Կանխավճարային API բանալիները մնում են ակտիվ, երբ կիրառման շրջանակը
        `subscription` է։
      → կապը հաշվի ընտրության ժամանակ բաց է թողնվում (համակցված QUOTA_BLOCKING վիճակներ)
```

- Համընկնումը պատասխանի **մարմնում** կատարվող **մեծատառ/փոքրատառ չտարբերակող ենթատողի** որոնում է
  (`isAccountDeactivated`, `accountFallback.ts`)։
- Մշտական `banned` վերջնականացումը արգելափակման ազդանշան պարունակող մարմնի դեպքում գործարկվում է **ցանկացած
  HTTP վիճակի** համար (`markAccountUnavailable` → `checkFallbackError` միջոցով)։ Ավելի
  նեղ **`deactivated`** պիտակը (`isActive=false`, երբ կապը պահուստային
  API բանալիներ չունի) գրվում է `chatCore.ts`-ի ներկառուցված ուղով՝ **HTTP 401 / 403**
  պատասխանների դեպքում (դասակարգվում է `classifyProviderError` → `ACCOUNT_DEACTIVATED` միջոցով)։ Նկատի ունեցեք, որ
  `markAccountUnavailable()` ուղին նույն `ACCOUNT_DEACTIVATED` ազդանշանի համար գրում է _այլ_
  վերջնական վիճակ՝ **`expired`** (`resolveTerminalConnectionStatus`-ի միջոցով), ուստի նույն արգելափակումը կարող է
  ներկայացվել որպես `deactivated` կամ `expired`՝ կախված նրանից, թե որ ուղին է մշակել պատասխանը։ (Ավելի
  հին կոդային մեկնաբանությունում ասվում է՝ «երբ 401 պատասխանի մարմինը պարունակում է այս տողերը», ինչը
  լիարժեք չի նկարագրում ներկայիս վարքագիծը։)
- `banned` կապը բացառվում է ընտրությունից ամենուր, որտեղ վերջնական վիճակները
  զտվում են (`isTerminalConnectionStatus`, համակցված `QUOTA_BLOCKING_CONNECTION_STATUSES`)։

## Շրջանակ — որ մատակարարներն են սկանավորվում

**Բոլոր մատակարարները։** Ստուգումն աշխատում է սխալների մշակման ընդհանուր հոսքաշարում, որով անցնում է վերին մակարդակի ծառայությանը ուղղված յուրաքանչյուր ձախողված հարցում․ այն **չի** սահմանափակվում OAuth/բաժանորդագրության սկրեյփերներով։ Արդյունքում ստացվող տերմինալային վիճակը սահմանվում է ըստ **միացման**, ոչ թե ըստ մատակարարի։

Այդուհանդերձ, ներկառուցված _տողերը_ նախատեսված են իրական արգելափակման վտանգ ունեցող բաժանորդագրության/OAuth մատակարարների համար (ChatGPT Web Codex, Claude Web, Codex, Muse Spark, Antigravity)։ API բանալի օգտագործող մատակարարի դեպքում դետեկտորը կգործարկվի միայն այն ժամանակ, երբ նրա սխալի մարմինը բառացիորեն պարունակի ենթատողերից որևէ մեկը։

`autoDisableBannedScope`-ը (`all` | `subscription`, լռելյայն՝ `all`) վերահսկում է՝ արդյոք համընկնումը նաև սահմանում է `isActive=false`։ `subscription`-ը նշանակում է մուտքի տվյալներով աշխատող տեղեր (վճարովի բաժանորդագրություններ և անվճար հաշիվներ՝ ներառյալ վեբ cookie-ներով աշխատող սեսիաները)։ Կանխավճարային API բանալիների համար այն, միևնույն է, գրանցում է `testStatus=banned`, սակայն դրանք թողնում է երթուղավորման ավազանում։ Կայուն նախագծային լուծումը յուրաքանչյուր մատակարարի և յուրաքանչյուր հաշվի համար առանձին վերասահմանումն է․ գլոբալ enum-ը դրա առաջին տարբերակն է։

## Արգելափակման հատուկ հիմնաբառեր

Ավելացրեք կամ հեռացրեք հիմնաբառեր **Security → Banned Keywords** բաժնում (պահպանվում են որպես գլոբալ `customBannedSignals` կարգավորում՝ `PATCH /api/settings`-ի միջոցով)։ Դրանք **ավելացվում են** ներկառուցված ցանկին և երբեք չեն փոխարինում այն, իսկ պահպանելիս (և մեկնարկի ժամանակ) թեժ վերաբեռնվում են `setCustomBannedSignals()`-ի միջոցով։ Յուրաքանչյուր հիմնաբառ սահմանափակված է 200 նիշով․ զանգվածի երկարության սահմանափակում չկա։

**⚠ Կեղծ դրական արդյունքի վտանգ — ընտրեք հստակ արտահայտություններ։** Հայտնաբերումը կատարվում է պատասխանի ամբողջ մարմնում ենթատողի ուղղակի համընկնմամբ, իսկ համընկնումը **մշտական** է (1 տարվա սպասման ժամանակահատված, ձեռքով վերականգնում)։ Չափազանց ընդհանուր հիմնաբառը կարող է արգելափակել լիովին առողջ միացումը․

- **Վատ տարբերակներ՝** `quota`, `limit`, `error`, `denied` — հանդիպում են բազմաթիվ ժամանակավոր սխալներում։
- **Լավ տարբերակներ՝** արգելափակման ամբողջական նախադասություններ, օրինակ՝ `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`։

Նախընտրեք մատակարարի՝ իրական արգելափակման դեպքում վերադարձվող ամենաերկար և միանշանակ արտահայտությունը։ Կասկածի դեպքում նախ հետևեք միացման `lastError`-ին, ապա ավելացրեք ճշգրիտ ձևակերպումը։

## Նշված միացման վերականգնում

Տերմինալային `banned` / `deactivated` վիճակները **երբեք ինքնաբերաբար չեն վերականգնվում** (դրանք բացառված են կանխարգելիչ վերականգնման պարբերական ստուգումից․ ինքնուրույն վերականգնվում են միայն `unavailable` սպասման ժամանակահատվածները)։ Օպերատորը պետք է հստակորեն մաքրի դրանք․

1. **Կրկին փորձարկեք միացումը** — կառավարման վահանակի **Test** գործողությամբ
   (`POST /api/providers/{id}/test`)․ հաջող փորձարկումը `testStatus`-ը վերադարձնում է
   `active` վիճակի և մաքրում է սխալի դաշտերը։
2. **Կրկին նույնականացեք / խմբագրեք հավատարմագրերը** — OAuth մատակարարների համար կրկին գործարկեք մուտքի
   / թարմացման հոսքը․ մատակարարի ստեղծման/ներմուծման երթուղիները սահմանում են `isActive = true`։
3. **Կրկին միացրեք միացումը** — եթե ավտոմատ անջատումը սահմանել է `isActive = false`
   (`all` շրջանակի դեպքում կամ `subscription` շրջանակի դեպքում՝ OAuth/cookie/սեսիա օգտագործող միացման համար),
   հաշիվը շտկելուց հետո կրկին միացրեք այն։

«Արգելափակման նշումը մաքրելու» առանձին կոճակ չկա․ վերականգնումը կատարվում է կրկնակի փորձարկմամբ, կրկնակի նույնականացմամբ կամ կրկնակի միացմամբ՝ համաձայն
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md)-ում նկարագրված տերմինալային վիճակների ընդհանուր կանոնի։

## Փորձարկման մեկուսացում (բոլոր մոդելների փորձարկում)

**Փորձարկումից ծագած ձախողումը** (`runAsProbe`-ի ներսում կատարվող՝ բոլոր մոդելների փորձարկման / աշխատունակության ստուգման փոխանցումները) երբեք չի հեռացնում միացումը ավազանից (#9817)․ այն **գրանցվում է տեսանելիության համար** (`last_error`, `last_error_type`, `error_code`,
`last_error_at`), սակայն բաց է թողնում երթուղավորման **բոլոր** փոփոխությունները՝ սպասման ժամանակահատվածները, տերմինալային վիճակները (`banned` / `deactivated` / `credits_exhausted`), առանձին մոդելների արգելափակումները, մատակարարի circuit breaker-ը, 5 րոպեանոց քվոտայի քեշը, OAuth տոկենի թարմացումը և ավտոմատ անջատումը։ Ապաակտիվացում է առաջացնում միայն իրական հարցման ուղու ձախողումը։ Գրանցված սխալն այն է, ինչի շնորհիվ նշված հաշիվը տեսանելի է դառնում կառավարման վահանակում՝ միաժամանակ շարունակելով սպասարկել տրաֆիկը։

Որոշման միասնական կետը `shouldIsolateProbeFailures()`-ն է
(`src/shared/utils/probeOrigin.ts`), որը կիրառվում է **յուրաքանչյուր** վայրում, որտեղ փորձարկումից ծագած ձախողումը կարող է փոխել երթուղավորման վիճակը․

- `markAccountUnavailable` (`auth.ts`) — միայն գրանցում (`lastError`-ի չմշակված տեքստ,
  `lastErrorType`, `errorCode`, `lastErrorAt`․ միտումնավոր **առանց**
  `backoffLevel`-ի, քանի որ այն կգործարկեր ընտրության պահին ավտոմատ նվազեցումը և կջնջեր
  գրառումը)
- `maybeAutoDisableBannedAccount` — ավտոմատ անջատում չկա
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (միայն գրանցում,
  առանց տերմինալային `credits_exhausted` վիճակի), GEO_BLOCKED (առանց 24-ժամյա բացառման),
  MODEL_NOT_FOUND (առանց `lockModel`-ի), codex 429-ի դեպքում հաշիվների հերթափոխով failover
  (առանց `markCodexScopeRateLimited`-ի, պահպանվող `rate_limited_until`-ի և
  սեսիայի կապվածության մաքրման), `persistCodexQuotaState` (առանց քվոտայի վիճակի գրառման
  և քեշի անվավերացման), `recordKeyHealthStatus` (բանալու աշխատունակության rotator-ը
  մնում է անփոփոխ)
- OAuth թարմացում — թե՛ executor-ի հիմքում կատարվող կանխարգելիչ թարմացումը
  (`base.ts` `execute()`, թարմացման տոկենի հերթափոխը չի սպառվում), թե՛
  `chatCore`-ում 401/403-ի արձագանքային ուղին (առանց `expired` ապաակտիվացման)
- `chat.ts` — մատակարարի circuit breaker-ը և 5 րոպեանոց քվոտայի քեշը
  (`markAccountExhaustedFrom429`) երբեք չեն վատթարանում

Գրանցված սխալն այն է, ինչի շնորհիվ նշված հաշիվը տեսանելի է դառնում կառավարման վահանակում՝ շարունակելով սպասարկել տրաֆիկը։ Նշում․ փորձարկման գրառումը պահում է սխալի **չմշակված**
(չկրճատված) տեքստը՝ ի տարբերություն իրական ուղու `slice(0,100)` կրճատման։

Այն օպերատորները, որոնք բոլորի փորձարկումն օգտագործում են որպես սպասարկման գործիք, կարող են վերականգնել նախկին վարքագիծը (փորձարկումը հաշվվում է որպես իրական գեներացում) հետևյալ տարբերակներից որևէ մեկով․

- `probeCanDisable` կարգավորմամբ (`POST /api/settings`՝
  `{"probeCanDisable": true}` մարմնով կամ `key_value` տվյալների բազայի ուղղակի խմբագրմամբ), կամ
- **`PROBE_CAN_DISABLE=true`** գործառույթի դրոշով (միջավայրի կամ տվյալների բազայի վերասահմանում․ գերակայում է
  կարգավորման նկատմամբ)։

Անվտանգ խափանում․ եթե դրոշի կամ կարգավորումների որոնումը սխալ է առաջացնում, մեկուսացումը մնում է ՄԻԱՑՎԱԾ։

## Սկզբնաղբյուր ֆայլեր

| Խնդիր                                         | Ֆայլ                                                                                                          |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Ազդանշանների աղյուսակներ + համընկնում         | `open-sse/services/accountFallback.ts`                                                                        |
| Վերջնական վիճակի սահմանում / պահպանում        | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| Ավտոմատ անջատման ընդգրկույթ                   | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| Ներտողային դասակարգում                        | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| Վերջնական վիճակի վերականգնման բացառում        | `src/lib/quota/connectionRecovery.ts`                                                                         |
| Հատուկ հիմնաբառերի բեռնում գործարկման ժամանակ | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| Կարգավորումների միջերես                       | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
