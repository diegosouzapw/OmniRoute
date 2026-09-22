# Management Authentication (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute-ն ունի հավատարմագրերի **չորս ընտանիք**, որոնք կարող են թույլատրել կառավարման երթուղիների օգտագործումը։
Դրանք փոխարինելի չեն։ Inference API բանալիները (`sk-…`) **չեն** կառավարում
սերվերը, եթե դրանց բացահայտորեն չի տրամադրվել `manage` կամ `admin` scope։

Կանոնական իրականացում՝ `src/lib/api/requireManagementAuth.ts`։

| Հավատարմագիր          | Սովորական ձև                              | Որտեղ է ստեղծվում                                    | Նախատեսված օգտագործում      | Կառավարման հնարավորություններ                                                                                    |
| --------------------- | ----------------------------------------- | ---------------------------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Dashboard JWT session | `auth_token` cookie                       | Dashboard-ի մուտք                                    | Բրաուզերի UI                | Dashboard-ի ամբողջական կառավարում՝ հաշվի առնելով CSRF-ի, տեղայնության և մշտապես պաշտպանված երթուղիների կանոնները |
| CLI machine-id token  | ներքին / տեղային                          | CLI-ի սկզբնավորում (`omniroute`՝ նույն համակարգչում) | Տեղային CLI                 | Միայն տեղային կառավարում                                                                                         |
| Scoped Access Token   | `oma_live_…`                              | **Settings → Access Tokens** կամ `omniroute connect` | Հեռակա CLI և կառավարման API | Պետք է բավարարի երթուղու պահանջվող `read`, `write` կամ `admin` scope-ը                                           |
| Inference API key     | `sk-…` (և API բանալիների այլ նախածանցներ) | **API Manager / API Keys**                           | `/v1/*` inference           | **Ոչ մի**, եթե բանալու metadata-ն չի ներառում `manage` կամ `admin`                                               |

`oma_` հավատարմագրերը կառավարման/CLI հավատարմագրեր են։ Դրանք inference API բանալիներ **չեն**։

Եթե սերվերի համար մուտքի/API բանալիով նույնականացումն անջատված է, կառավարման որոշ երթուղիներ կարող են
ընդունել չնույնականացված հարցումներ։ Միայն տեղային և մշտապես պաշտպանված երթուղիների համար
շարունակում են գործել իրենց սեփական կանոնները։ Հետևաբար այս հավատարմագրերից որևէ մեկի ներկայացումը համընդհանուր
պարտադիր չէ, իսկ դրանցից որևէ մեկի առկայությունն առանց պահանջվող
scope-ի և երթուղու տեղայնության համընդհանուր բավարար չէ։

Առնչվող նյութ՝ [Remote Mode](./REMOTE-MODE.md) (ինչպես է `oma_live_…`-ը ստեղծվում հեռակա CLI-ի համար)։

---

## Scope-երի մատրիցներ

Scope-երի այս երկու բառապաշարները **տարբեր են**։ Մի խառնեք դրանք։

### Access Token-ի scope-եր (`oma_live_…`)

| Scope   | Սովորական գործողություններ                                                                      |
| ------- | ----------------------------------------------------------------------------------------------- |
| `read`  | Ցուցակների/կարգավիճակների GET հարցումներ, որոնք token-ին թույլատրված է տեսնել                   |
| `write` | Admin-ից ցածր մակարդակի փոփոխություններ (ստեղծում/թարմացում/ջնջում)                             |
| `admin` | Ամբողջական հեռակա CLI / կապակցման token (գաղտնաբառով սկզբնավորման դեպքում սա է լռելյայն արժեքը) |

`read` ունեցող token-ը չի կարող կանչել `write` երթուղի։ Կատարման ժամանակ հաղորդագրությունն ունի հետևյալ ձևը՝
`Access token scope '<have>' is insufficient; '<need>' required.`

### API բանալիների կառավարման scope-եր

| Scope    | Նշանակություն                                                                               |
| -------- | ------------------------------------------------------------------------------------------- |
| (չկա)    | Միայն inference։ Կառավարման երթուղիները վերադարձնում են 403։                                |
| `manage` | Կառավարման API (`requireManagementAuth`-ի API բանալու ճյուղի նույն ստուգումը)               |
| `admin`  | Նաև բավարարում է `hasManageScope`-ը (դիտարկվում է որպես կառավարման հնարավորություն ունեցող) |

Բանալու համար միացրեք `manage`-ը API Keys / API Manager UI-ում։ Ավտոմատացման համար մի վերօգտագործեք
chat client-ի բանալին, եթե այդ scope-ը միտումնավոր չեք տրամադրել։

---

## Ինչպես ստեղծել և չեղարկել

### Dashboard JWT session

1. Բացեք `/login`-ը և մուտք գործեք կառավարման գաղտնաբառով (առաջին գործարկման ժամանակ՝ `INITIAL_PASSWORD`)։
2. `auth_token` cookie-ն HttpOnly է։ Բրաուզերի dashboard-ն այն օգտագործում է ավտոմատ կերպով։
3. Դուրս եկեք `/api/auth/logout`-ի միջոցով։ Պատճենելու համար երկարաժամկետ secret չկա։

### CLI machine-id token

1. Գործարկեք `omniroute`-ը սերվերի հետ **նույն host-ում** (loopback)։
2. CLI-ն `~/.omniroute/`-ում սկզբնավորում է machine-id token (chmod 600)։
3. Սա այլ համակարգչից **չի** աշխատում։ Հեռակա CLI-ի համար օգտագործեք Access Token։

### Scoped Access Token (`oma_live_…`)

1. Dashboard՝ **Settings → Access Tokens** → ստեղծել (անուն + scope)։ **Secret-ը ցուցադրվում է մեկ անգամ։**
2. Կամ CLI՝ `omniroute connect <host>` (գաղտնաբառ → token)։ Տե՛ս [Remote Mode](./REMOTE-MODE.md)։
3. Header՝ `Authorization: Bearer oma_live_…`
4. Չեղարկեք նույն Access Tokens էջից (կամ ջնջեք CLI context-ը)։
5. Սերվերը պահում է միայն hash-ը։ Բաց տեքստով արժեքին վերաբերվեք որպես գաղտնաբառի։

### `manage` scope-ով API բանալի

1. Dashboard՝ **API Manager / API Keys** → ստեղծել կամ խմբագրել բանալի → միացնել `manage`-ը (կամ `admin`-ը)։
2. Header՝ `Authorization: Bearer sk-…` (բանալու իրական նախածանցը)։
3. Չեղարկեք կամ հեռացրեք `manage`-ը նույն UI-ում։
4. Միայն անհրաժեշտ նվազագույն իրավունքներ այն ավտոմատացման համար, որը CLI չէ. միայն GET գործողություններով աշխատանքների համար նախընտրեք `read` Access Token, իսկ API բանալու վրա `manage` օգտագործեք միայն այն դեպքում, երբ կանչողը պետք է աշխատի նաև `/v1`-ի և կառավարման API-ի հետ։

---

## Վերնագրի ձևաչափը

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Կառավարման հավատարմագրերը մի՛ տեղադրեք URL-ի ուղու կամ հարցման տողի մեջ։ Կառավարման նույնականացումն իրականացվում է միայն վերնագրի/քուքիի միջոցով։

---

## Պատճենման և տեղադրման օրինակներ

Միայն ընթերցման համար (մատակարարների ցանկը ստանալու համար)։ Օգտագործեք `read` Access Token՝

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Փոփոխություն կատարելու համար (մատակարարի կապ ստեղծելու համար)։ Օգտագործեք `write`/`admin` Access Token կամ `manage` շրջանակով API բանալի՝

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Եզրահանգման համար (ոչ կառավարման)։ Սովորական API բանալի, `manage` չի պահանջվում՝

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Ընթացիկ կատարման միջավայրի սխալները (գաղտնի տվյալները մի՛ արտածեք)

| Իրավիճակ                                          | Սովորական կարգավիճակ | Հաղորդագրություն (գաղտնի տվյալները հեռացված են)                      |
| ------------------------------------------------- | -------------------- | -------------------------------------------------------------------- |
| Հավատարմագիր չկա                                  | 401                  | `Authentication required`                                            |
| Անվավեր/ժամկետանց `oma_live_…`                    | 401                  | `Invalid or expired access token`                                    |
| Վավեր API բանալի՝ առանց `manage`/`admin` շրջանակի | 403                  | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Անվավեր սովորական API բանալի կառավարման երթուղում | 403                  | `Invalid management token`                                           |
| Access Token-ի շրջանակը չափազանց ցածր է           | 403                  | `Access token scope '<have>' is insufficient; '<need>' required.`    |

«Invalid management token» նշանակում է, որ bearer-ը **չի** ընդունվել որպես կառավարման հավատարմագիր։ Այն **չի** հուշում, թե որ տեսակի հավատարմագիր պետք է ստեղծել։ Օգտագործեք վերևի աղյուսակը. եզրահանգման բանալիներին անհրաժեշտ է `manage` շրջանակ, հեռակա CLI-ին՝ `oma_live_…`, իսկ կառավարման վահանակն օգտագործում է աշխատաշրջանի քուքին։

---

## Առաջարկվող նվազագույն արտոնությունների ընտրությունը

| Կանչող                                            | Օգտագործել                                                 |
| ------------------------------------------------- | ---------------------------------------------------------- |
| Բրաուզեր                                          | Կառավարման վահանակի աշխատաշրջան                            |
| CLI՝ սերվերի հոսթում                              | Մեքենայական թոքեն                                          |
| CLI՝ հեռակա սերվերի հետ հաղորդակցվող նոութբուքում | `oma_live_…`՝ ստացված `omniroute connect`-ից               |
| CI / սկրիպտներ (միայն կառավարման համար)           | `oma_live_…`՝ աշխատող ամենափոքր շրջանակով                  |
| CI, որը պետք է կանչի և՛ `/v1`, և՛ `/api`          | API բանալի՝ `manage` շրջանակով, **կամ** երկու հավատարմագիր |
