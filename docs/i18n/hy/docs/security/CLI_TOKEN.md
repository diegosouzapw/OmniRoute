# CLI Machine-ID Token (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## Ընդհանուր նկարագրություն

OmniRoute CLI հրամանները տեղային կառավարման API-ում նույնականացվում են՝ օգտագործելով
`HMAC-SHA256(machine-id, salt)` թոքենը, որն ուղարկվում է հարցման
`x-omniroute-cli-token` վերնագրի միջոցով։

Սա թույլ է տալիս CLI ենթահրամաններին (`omniroute status`, `omniroute providers` և այլն)
կանչել կառավարման վերջնակետերը՝ առանց օգտատիրոջից յուրաքանչյուր գործարկման ժամանակ JWT
կամ գաղտնաբառ պահանջելու։

## Ինչպես է այն աշխատում

1. `getMachineTokenSync()`-ը կարդում է սարքավորման մեքենայի ID-ն՝ օգտագործելով `node-machine-id`
   (ձախողման դեպքում օգտագործում է դատարկ տող՝ անջատելով CLI նույնականացումը)։
2. Այն հաշվարկում է `HMAC-SHA256(machine_id, salt)`-ը և վերադարձնում ամբողջական 64 նիշանոց
   տասնվեցական ամփոփագիրը՝ այս մեքենային կապված որոշակի և անշրջելի թոքենը։
3. CLI-ն թոքենն ուղարկում է որպես `x-omniroute-cli-token` միայն այն դեպքում, երբ որոշված
   նպատակակետը բացահայտ հետադարձ կապի URL է (`localhost`, `127.0.0.0/8` կամ
   հետադարձ կապի IPv6)։ Թոքեն պարունակող հարցումներն օգտագործում են `redirect: error`, որպեսզի տեղային
   վերահղումը չկարողանա այն փոխանցել մեկ այլ աղբյուրի։ Հեռակա համատեքստերն օգտագործում են սահմանափակ
   հասանելիության թոքեններ։ Եթե ածանցումը հասանելի չէ, CLI-ն բաց է թողնում վերնագիրը,
   իսկ `omniroute doctor`-ը հաղորդում է ձախողման մասին՝ դատարկ թոքենը վավեր
   համարելու փոխարեն։
4. Սերվերը (`src/server/authz/policies/management.ts`) նույն աղով վերահաշվարկում է
   ակնկալվող թոքենը և համեմատում այն `timingSafeEqual`-ի միջոցով՝ ժամանակային չափումների վրա
   հիմնված կորզումը կանխելու համար։

## Անվտանգության հատկություններ

| Հատկություն                                            | Մանրամասներ                                                                                                                                                                                                                                                                                   |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Միայն հետադարձ կապ**                                 | Ընդունվում է միայն այն դեպքում, երբ սերվերի վստահելի՝ հավասարակից հանգույցի տեղայնության դրոշմը (ստացված իրական TCP հավասարակից հանգույցի հասցեից) ցույց է տալիս հետադարձ կապ։ Տեղայնությունը որոշելու համար հաճախորդի կողմից կառավարվող `Host` վերնագրին երբեք վստահություն չի ցուցաբերվում։ |
| **Հաստատուն ժամանակով համեմատում**                     | `crypto.timingSafeEqual`-ը կանխում է ժամանակային գրոհները։                                                                                                                                                                                                                                    |
| **Անշրջելի**                                           | HMAC-ի ելքից հնարավոր չէ վերականգնել մեքենայի ID-ն։                                                                                                                                                                                                                                           |
| **`always`-ով պաշտպանված սահմանափակման շրջանցում չկա** | `isAlwaysProtectedPath()`-ը գնահատվում է CLI թոքենի ստուգումից առաջ։ `/api/shutdown`-ը և `/api/settings/database`-ը միշտ պահանջում են JWT։                                                                                                                                                    |
| **Չարտահանվող**                                        | Թոքենը երբեք չի գրվում սկավառակի վրա և չի գրանցվում մատյանում։                                                                                                                                                                                                                                |

## Լռելյայն աղ (պատահական՝ յուրաքանչյուր տեղադրման համար)

Երբ `OMNIROUTE_CLI_SALT`-ը սահմանված չէ, աղը պատահական 64 նիշանոց տասնվեցական տող է,
որը գեներացվում է մեկ անգամ և պահպանվում `<DATA_DIR>/cli-token-salt.json`-ում (`0600` ռեժիմով)՝
ոչ թե սկզբնական կոդում ներառված `omniroute-cli-auth-v1` հաստատունը։ Թե՛ `getActiveSalt()`-ը
`src/lib/machineToken.ts`-ում, թե՛ դրա կրկնօրինակը `bin/cli/utils/cliToken.mjs`-ում կարդում են
նույն ֆայլը, այնպես որ սերվերը և այս տեղադրման շրջանակում CLI-ի յուրաքանչյուր գործարկում օգտագործում են
նույն արժեքը։ Սկզբնական կոդում ներառված հաստատունն օգտագործվում է միայն որպես վերջին հնարավոր պահուստային տարբերակ, երբ
պահպանված կամ միջավայրի աղ դեռ հնարավոր չէ սահմանել (օրինակ՝ միայն CLI-ի թարմ տեղադրման դեպքում,
նախքան սերվերի առաջին գործարկումը)։ Սա վերացնում է հին հաստատուն լռելյայն արժեքի
թույլ կողմը. `/etc/machine-id`-ը սովորաբար հասանելի է բոլոր օգտատերերի համար, ուստի ցանկացած տեղային օգտատեր
այլապես կարող էր ստանալ նույն թոքենը յուրաքանչյուր այն տեղադրման համար, որտեղ
`OMNIROUTE_CLI_SALT`-ը երբեք չէր սահմանվել։

## Salt-ի ռոտացիա

Սահմանեք `OMNIROUTE_CLI_SALT`-ը՝ ածանցված թոքենը առանց կոդային փոփոխությունների ռոտացիայի ենթարկելու համար. այն միշտ առաջնահերթություն ունի յուրաքանչյուր տեղադրման համար պահպանված salt-ի նկատմամբ։ Ռոտացիայից հետո այս մեքենայի բոլոր CLI գործընթացներն ինքնաբերաբար կօգտագործեն նոր թոքենը։ Օգտակար է գործընթացների ցանկի արտահոսքից հետո, որը կարող էր բացահայտել նախորդ ածանցված արժեքը։

```bash
# Մշտական ռոտացիա (ավելացրեք shell-ի պրոֆիլում)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Ստուգեք, որ նոր թոքենն օգտագործվում է
omniroute status
```

## Հին ձևաչափ (SHA-256, 32 նիշ) — դեռ ընդունվում է

Մինչև վերը նշված HMAC ձևաչափը CLI-ն իր թոքենն ածանցում էր որպես
`SHA-256(machineId + salt).hex[0..32]` (32 նիշանոց նախածանց)
`bin/cli/utils/cliToken.mjs`-ում (`getLegacyCliTokenSync`՝ `src/lib/machineToken.ts`-ում)։

Հետադարձ համատեղելիության համար սերվերն ընդունում է **երկու** ձևաչափն էլ. ստուգիչը կառուցում է
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` և մուտքային վերնագիրը համեմատում է յուրաքանչյուրի հետ՝ օգտագործելով `timingSafeEqual`
(`src/server/authz/policies/management.ts` և `src/lib/middleware/cliTokenAuth.ts`)։
Այսպիսով, թոքենը վավեր է, եթե այն համապատասխանում է **կամ** 64 նիշանոց HMAC ամփոփագրին, **կամ** հին ձևաչափի 32 նիշանոց SHA-256 նախածանցին։

**Հրաժարում.** սահմանեք `OMNIROUTE_DISABLE_CLI_TOKEN=true` (`env`-ում կամ `.env`-ում)՝ CLI թոքենի մեխանիզմն ամբողջությամբ անջատելու համար. այդ դեպքում բոլոր հասանելիությունների համար պահանջվում է հստակ նշված API բանալի։ Բազմաօգտատեր հոսթերում սա խորհուրդ է տրվում, քանի որ `machine-id`-ը սահմանվում է ըստ սարքի (ոչ թե ըստ օգտատիրոջ), և նույն հոսթի մեկ այլ օգտատեր կարող է հաշվարկել նույն թոքենը։

## Ֆայլեր

| Ֆայլ                                      | Նպատակ                                                 |
| ----------------------------------------- | ------------------------------------------------------ |
| `src/lib/machineToken.ts`                 | Թոքենի ածանցում (`getMachineTokenSync`)                |
| `bin/cli/utils/cliToken.mjs`              | Նույն ածանցման CLI-կողմի պատճենը                       |
| `<DATA_DIR>/cli-token-salt.json`          | Յուրաքանչյուր տեղադրման համար պահպանված պատահական salt |
| `src/server/authz/headers.ts`             | `CLI_TOKEN_HEADER` հաստատունը                          |
| `src/server/authz/policies/management.ts` | Սերվերի կողմի ստուգում                                 |
| `src/server/authz/routeGuard.ts`          | Հետադարձ կապի հոսթի ստուգում (`isLoopbackHost`)        |

## Տես նաև

- `docs/security/ROUTE_GUARD_TIERS.md` — երթուղիների պաշտպանության մակարդակները
- `docs/architecture/AUTHZ_GUIDE.md` — լիարժեք լիազորման հոսքագիծը
