# Management Authentication (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute-ն ունի հավատարմագրերի **չորս ընտանիք**, որոնք կարող են թույլատրել կառավարման երթուղիների օգտագործումը։
Դրանք փոխարինելի չեն։ Եզրակացությունների API բանալիները (`sk-…`) **չեն** կառավարում
սերվերը, եթե դրանց հստակորեն չի տրամադրվել `manage` կամ `admin` շրջանակ։

Կանոնական իրականացում՝ `src/lib/api/requireManagementAuth.ts`։

| Հավատարմագիր                         | Սովորական ձև                              | Որտեղ է ստեղծվում                                            | Նախատեսված օգտագործում      | Կառավարման հնարավորություն                                                                                    |
| ------------------------------------ | ----------------------------------------- | ------------------------------------------------------------ | --------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Վահանակի JWT աշխատաշրջան             | `auth_token` cookie                       | Մուտք վահանակ                                                | Բրաուզերի միջերես           | Վահանակի ամբողջական կառավարում՝ հաշվի առնելով CSRF-ի, տեղայնության և մշտապես պաշտպանված երթուղիների կանոնները |
| CLI մեքենայի նույնացուցիչի թոքեն     | ներքին / տեղային                          | CLI-ի սկզբնավորում (`omniroute` նույն մեքենայի վրա)          | Տեղային CLI                 | Միայն տեղային կառավարում                                                                                      |
| Շրջանակով սահմանափակված մուտքի թոքեն | `oma_live_…`                              | **Կարգավորումներ → Մուտքի թոքեններ** կամ `omniroute connect` | Հեռակա CLI և կառավարման API | Պետք է բավարարի երթուղու պահանջած `read`, `write` կամ `admin` շրջանակին                                       |
| Եզրակացությունների API բանալի        | `sk-…` (և API բանալիների այլ նախածանցներ) | **API կառավարիչ / API բանալիներ**                            | `/v1/*` եզրակացություններ   | **Ոչ մի հնարավորություն**, եթե բանալու մետատվյալները չեն ներառում `manage` կամ `admin`                        |

`oma_` հավատարմագրերը կառավարման/CLI հավատարմագրեր են։ Դրանք եզրակացությունների API բանալիներ **չեն**։

Եթե սերվերի համար մուտքի/API բանալու միջոցով իսկորոշումն անջատված է, կառավարման որոշ երթուղիներ կարող են
ընդունել չիսկորոշված հարցումներ։ Միայն տեղային և մշտապես պաշտպանված երթուղիների նկատմամբ
շարունակում են կիրառվել դրանց սեփական կանոնները։ Հետևաբար՝ այս հավատարմագրերից որևէ մեկի ներկայացումը համընդհանուր կերպով
պարտադիր չէ, իսկ որևէ մեկին տիրապետելը համընդհանուր կերպով բավարար չէ՝ առանց պահանջվող
շրջանակի և երթուղու տեղայնության պայմանը բավարարելու։

Առնչվող նյութ՝ [Հեռակա ռեժիմ](./REMOTE-MODE.md) (թե ինչպես է `oma_live_…`-ը ստեղծվում հեռակա CLI-ի համար)։

---

## Շրջանակների մատրիցներ

API բանալիների կառավարման շրջանակները և մուտքի թոքենների շրջանակները տարբեր բառապաշարներ են։
MCP գործիքների շրջանակները երրորդ բառապաշարն են, որը ստուգվում է `scopeMatches`-ով, այլ ոչ թե
ստորև բերված աղյուսակների որևէ գործառույթով։ Կողք կողքի՝
[Շրջանակների երեք անվանատարածքները](../frameworks/MCP-SERVER.md#three-scope-namespaces)։

### Մուտքի թոքենի շրջանակներ (`oma_live_…`)

| Շրջանակ | Սովորական գործողություններ                                                             |
| ------- | -------------------------------------------------------------------------------------- |
| `read`  | Ցուցակման/կարգավիճակի GET հարցումներ, որոնք թոքենին թույլատրված է տեսնել               |
| `write` | Փոփոխություններ (ստեղծում/թարմացում/ջնջում), որոնք `admin`-ից ցածր են                  |
| `admin` | Ամբողջական հեռակա CLI / կապակցման թոքեն (գաղտնաբառով սկզբնավորման լռելյայն շրջանակն է) |

`read` շրջանակով թոքենը չի կարող կանչել `write` երթուղի։ Կատարման ժամանակի հաղորդագրության ձևը՝
`Access token scope '<have>' is insufficient; '<need>' required.`

### API բանալիների կառավարման շրջանակներ

| Շրջանակ  | Նշանակություն                                                                             |
| -------- | ----------------------------------------------------------------------------------------- |
| (չկա)    | Միայն եզրակացություններ։ Կառավարման երթուղիները վերադարձնում են 403։                      |
| `manage` | Կառավարման API (`requireManagementAuth`-ի API բանալու ճյուղի հետ նույն ստուգումը)         |
| `admin`  | Նաև բավարարում է `hasManageScope`-ին (դիտարկվում է որպես կառավարման ունակություն ունեցող) |

Բանալու համար միացրեք `manage`-ը API բանալիների / API կառավարչի միջերեսում։ Մի վերօգտագործեք
զրույցի հաճախորդի բանալին ավտոմատացման համար, եթե միտումնավոր չեք տրամադրել այդ շրջանակը։

---

## Ինչպես ստեղծել և չեղարկել

### Կառավարման վահանակի JWT աշխատաշրջան

1. Բացեք `/login`-ը և մուտք գործեք կառավարման գաղտնաբառով (առաջին գործարկման ժամանակ՝ `INITIAL_PASSWORD`)։
2. `auth_token` cookie-ն HttpOnly է։ Բրաուզերի կառավարման վահանակն այն օգտագործում է ավտոմատ կերպով։
3. Դուրս եկեք `/api/auth/logout`-ի միջոցով։ Պատճենելու համար երկարաժամկետ գաղտնիք չկա։

### CLI-ի machine-id թոքեն

1. Գործարկեք `omniroute`-ը սերվերի հետ **նույն հոսթում** (loopback)։
2. CLI-ն `~/.omniroute/`-ում սկզբնավորում է machine-id թոքեն (chmod 600)։
3. Սա **չի** աշխատում այլ մեքենայից։ Հեռավար CLI-ի համար օգտագործեք հասանելիության թոքեն։

### Սահմանափակված հասանելիության թոքեն (`oma_live_…`)

1. Կառավարման վահանակ՝ **Կարգավորումներ → Հասանելիության թոքեններ** → ստեղծել (անուն + հասանելիության շրջանակ)։ **Գաղտնիքը ցուցադրվում է մեկ անգամ։**
2. Կամ CLI՝ `omniroute connect <host>` (գաղտնաբառ → թոքեն)։ Տե՛ս [Հեռավար ռեժիմ](./REMOTE-MODE.md)։
3. Վերնագիր՝ `Authorization: Bearer oma_live_…`
4. Չեղարկեք նույն «Հասանելիության թոքեններ» էջում (կամ ջնջեք CLI համատեքստը)։
5. Սերվերը պահում է միայն հեշը։ Բաց տեքստով արժեքին վերաբերվեք ինչպես գաղտնաբառի։

### `manage` շրջանակով API բանալի

1. Կառավարման վահանակ՝ **API կառավարիչ / API բանալիներ** → ստեղծեք կամ խմբագրեք բանալի → միացրեք `manage`-ը (կամ `admin`-ը)։
2. Վերնագիր՝ `Authorization: Bearer sk-…` (բանալու իրական նախածանցը)։
3. Չեղարկեք կամ հեռացրեք `manage`-ը նույն օգտատիրոջ միջերեսում։
4. CLI չհանդիսացող ավտոմատացման համար կիրառեք նվազագույն արտոնության սկզբունքը. միայն GET առաջադրանքների համար նախընտրեք `read` հասանելիության թոքեն, իսկ API բանալու վրա `manage` օգտագործեք միայն այն դեպքում, երբ կանչողը պետք է նաև աշխատի `/v1`-ի և կառավարման API-ի հետ։

---

## Վերնագրի ձևաչափը

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Կառավարման հավատարմագրերը մի տեղադրեք URL-ի ուղու կամ հարցման տողի մեջ։ Կառավարման
նույնականացումը կատարվում է միայն վերնագրի/cookie-ի միջոցով։

---

## Պատճենելու և տեղադրելու օրինակներ

Միայն կարդալու համար (մատակարարների ցանկը)։ Օգտագործեք `read` հասանելիության թոքեն.

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Փոփոխություն կատարելու համար (մատակարարի կապի ստեղծում)։ Օգտագործեք `write`/`admin` հասանելիության թոքեն կամ
`manage` շրջանակով API բանալի.

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Եզրահանգում (ոչ կառավարում)։ Սովորական API բանալի, `manage` չի պահանջվում.

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Կատարման միջավայրի ընթացիկ սխալները (մի արտածեք գաղտնիքները)

| Իրավիճակ                                          | Սովորական կարգավիճակ | Հաղորդագրություն (զգայուն տվյալները հեռացված են)                     |
| ------------------------------------------------- | -------------------- | -------------------------------------------------------------------- |
| Հավատարմագիր չկա                                  | 401                  | `Authentication required`                                            |
| Անվավեր/ժամկետանց `oma_live_…`                    | 401                  | `Invalid or expired access token`                                    |
| Վավեր API բանալի՝ առանց `manage`/`admin`-ի        | 403                  | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Անվավեր սովորական API բանալի կառավարման երթուղում | 403                  | `Invalid management token`                                           |
| Հասանելիության թոքենի շրջանակը չափազանց ցածր է    | 403                  | `Access token scope '<have>' is insufficient; '<need>' required.`    |

`Invalid management token` նշանակում է, որ bearer արժեքը **չի** ընդունվել որպես կառավարման
հավատարմագիր։ Այն **չի** հուշում, թե որ տեսակը պետք է ստեղծել։ Օգտագործեք վերևի աղյուսակը.
եզրահանգման բանալիներին անհրաժեշտ է `manage` շրջանակ, հեռավար CLI-ին՝ `oma_live_…`, իսկ կառավարման վահանակն
օգտագործում է աշխատաշրջանի cookie-ն։

---

## Առաջարկվող նվազագույն արտոնությունների ընտրություն

| Կանչող կողմը                                   | Օգտագործել                                                     |
| ---------------------------------------------- | -------------------------------------------------------------- |
| Զննարկիչ                                       | Կառավարման վահանակի աշխատաշրջան                                |
| CLI՝ սերվերի հոսթում                           | Մեքենայի թոքեն                                                 |
| CLI՝ նոթբուքում, որը կապվում է հեռակա սերվերին | `oma_live_…`՝ ստացված `omniroute connect`-ից                   |
| CI / սկրիպտներ (միայն կառավարում)              | `oma_live_…`՝ բավարարող նվազագույն հասանելիության շրջանակով    |
| CI, որը պետք է կանչի և՛ `/v1`, և՛ `/api`       | API բանալի՝ `manage`-ով, **կամ** երկու նույնականացման տվյալներ |
