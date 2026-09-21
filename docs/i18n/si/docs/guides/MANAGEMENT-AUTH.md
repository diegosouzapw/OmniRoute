# Management Authentication (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute සතුව කළමනාකරණ මාර්ග සඳහා අවසර ලබා දිය හැකි **අක්තපත්ර පවුල් හතරක්** ඇත.
ඒවා එකිනෙකට හුවමාරු කර භාවිත කළ නොහැක. අනුමාන API යතුරු (`sk-…`) වෙත පැහැදිලිවම `manage` හෝ `admin` විෂය පථය ලබා දී නොමැති නම්, ඒවාට සේවාදායකය කළමනාකරණය කළ **නොහැක**.

ප්රමිත ක්රියාත්මක කිරීම: `src/lib/api/requireManagementAuth.ts`.

| අක්තපත්රය              | සාමාන්ය ආකෘතිය                       | නිර්මාණය කරන ස්ථානය                              | අපේක්ෂිත භාවිතය            | කළමනාකරණ හැකියාව                                                                         |
| ---------------------- | ------------------------------------ | ------------------------------------------------ | -------------------------- | ---------------------------------------------------------------------------------------- |
| උපකරණ පුවරු JWT සැසිය  | `auth_token` cookie                  | උපකරණ පුවරු පිවිසුම                              | බ්රවුසර UI                 | CSRF, ස්ථානීයත්වය සහ සැමවිටම-ආරක්ෂිත-මාර්ග නීතිවලට යටත්ව, සම්පූර්ණ උපකරණ පුවරු කළමනාකරණය |
| CLI machine-id ටෝකනය   | අභ්යන්තර / දේශීය                     | CLI ආරම්භනය (එම යන්ත්රයෙහි `omniroute`)          | දේශීය CLI                  | දේශීය කළමනාකරණය පමණි                                                                     |
| විෂය පථගත ප්රවේශ ටෝකනය | `oma_live_…`                         | **සැකසුම් → ප්රවේශ ටෝකන** හෝ `omniroute connect` | දුරස්ථ CLI සහ කළමනාකරණ API | මාර්ගයට අවශ්ය `read`, `write`, හෝ `admin` විෂය පථය සපුරාලිය යුතුය                        |
| අනුමාන API යතුර        | `sk-…` (සහ අනෙකුත් API-යතුරු උපසර්ග) | **API කළමනාකරු / API යතුරු**                     | `/v1/*` අනුමානය            | යතුරු පාරදත්තවල `manage` හෝ `admin` ඇතුළත් නොවේ නම් **කිසිවක් නැත**                      |

`oma_` අක්තපත්ර යනු කළමනාකරණ/CLI අක්තපත්ර වේ. ඒවා අනුමාන API යතුරු **නොවේ**.

සේවාදායකය සඳහා පිවිසුම්/API-යතුරු සත්යාපනය අක්රිය කර ඇත්නම්, ඇතැම් කළමනාකරණ මාර්ග සත්යාපනය නොකළ ඇමතුම් පිළිගත හැක. දේශීය-පමණක් සහ සැමවිටම-ආරක්ෂිත මාර්ග සඳහා ඒවායේම නීති තවමත් අදාළ වේ. එබැවින්, මෙම අක්තපත්රවලින් එකක් ඉදිරිපත් කිරීම සෑම අවස්ථාවකම අනිවාර්ය නොවන අතර, අවශ්ය විෂය පථය සහ මාර්ග ස්ථානීයත්වය නොමැතිව එකක් සතුව තිබීමද සෑම අවස්ථාවකම ප්රමාණවත් නොවේ.

අදාළ: [දුරස්ථ ප්රකාරය](./REMOTE-MODE.md) (දුරස්ථ CLI එකක් සඳහා `oma_live_…` නිර්මාණය කරන ආකාරය).

---

## විෂය පථ න්යාස

මෙම විෂය පථ වචන මාලා දෙක **වෙනස්ය**. ඒවා මිශ්ර නොකරන්න.

### ප්රවේශ ටෝකන විෂය පථ (`oma_live_…`)

| විෂය පථය | සාමාන්ය මෙහෙයුම්                                                                 |
| -------- | -------------------------------------------------------------------------------- |
| `read`   | ටෝකනයට බැලීමට අවසර ඇති ලැයිස්තු/තත්ත්ව GET ඉල්ලීම්                               |
| `write`  | admin මට්ටමට පහළ වෙනස් කිරීම් (නිර්මාණය/යාවත්කාලීන කිරීම/මකා දැමීම)              |
| `admin`  | සම්පූර්ණ දුරස්ථ CLI / සම්බන්ධතා ටෝකනය (මුරපද ආරම්භනය පෙරනිමියෙන් මෙය භාවිත කරයි) |

`read` සහිත ටෝකනයකට `write` මාර්ගයක් ඇමතීමට නොහැක. ධාවනකාල පණිවිඩ ආකෘතිය:
`Access token scope '<have>' is insufficient; '<need>' required.`

### API-යතුරු කළමනාකරණ විෂය පථ

| විෂය පථය      | අර්ථය                                                               |
| ------------- | ------------------------------------------------------------------- |
| (කිසිවක් නැත) | අනුමානය පමණි. කළමනාකරණ මාර්ග 403 ආපසු ලබා දෙයි.                     |
| `manage`      | කළමනාකරණ API (`requireManagementAuth` API-යතුරු ශාඛාවට සමාන දොරටුව) |
| `admin`       | `hasManageScope` ද සපුරාලයි (කළමනාකරණ-හැකියාව සහිත ලෙස සලකනු ලැබේ)  |

API යතුරු / API කළමනාකරු UI තුළ යතුර සඳහා `manage` සක්රීය කරන්න. ඔබ හිතාමතාම එම විෂය පථය ලබා දී නොමැති නම් ස්වයංක්රීයකරණය සඳහා කතාබස් සේවාලාභී යතුරක් නැවත භාවිත නොකරන්න.

---

## නිර්මාණය කරන සහ අවලංගු කරන ආකාරය

### උපකරණ පුවරු JWT සැසිය

1. `/login` විවෘත කර කළමනාකරණ මුරපදය සමඟ පුරන්න (පළමු ආරම්භයේදී `INITIAL_PASSWORD`).
2. `auth_token` cookie එක HttpOnly වේ. බ්රවුසර උපකරණ පුවරුව එය ස්වයංක්රීයව භාවිත කරයි.
3. `/api/auth/logout` හරහා ඉවත් වන්න. පිටපත් කිරීමට දිගුකාලීන රහසක් නොමැත.

### CLI machine-id ටෝකනය

1. සේවාදායකය තිබෙන **එම සත්කාරකයෙහිම** `omniroute` ධාවනය කරන්න (loopback).
2. CLI එක `~/.omniroute/` යටතේ machine-id ටෝකනයක් ආරම්භ කරයි (chmod 600).
3. මෙය වෙනත් යන්ත්රයකින් ක්රියා **නොකරයි**. දුරස්ථ CLI සඳහා ප්රවේශ ටෝකනයක් භාවිත කරන්න.

### විෂය පථගත ප්රවේශ ටෝකනය (`oma_live_…`)

1. උපකරණ පුවරුව: **සැකසුම් → ප්රවේශ ටෝකන** → නිර්මාණය කරන්න (නම + විෂය පථය). **රහස පෙන්වන්නේ එක් වරක් පමණි.**
2. නැතහොත් CLI: `omniroute connect <host>` (මුරපදය → ටෝකනය). [දුරස්ථ ප්රකාරය](./REMOTE-MODE.md) බලන්න.
3. ශීර්ෂකය: `Authorization: Bearer oma_live_…`
4. එම ප්රවේශ ටෝකන පිටුවෙන්ම අවලංගු කරන්න (හෝ CLI සන්දර්භය මකා දමන්න).
5. සේවාදායකය ගබඩා කරන්නේ hash එකක් පමණි. සරල පෙළ මුරපදයක් ලෙස සලකන්න.

### `manage` විෂය පථය සහිත API යතුර

1. උපකරණ පුවරුව: **API කළමනාකරු / API යතුරු** → යතුරක් නිර්මාණය කිරීම හෝ සංස්කරණය කිරීම → `manage` (හෝ `admin`) සක්රීය කරන්න.
2. ශීර්ෂකය: `Authorization: Bearer sk-…` (යතුරේ සැබෑ උපසර්ගය).
3. එම UI තුළම එය අවලංගු කරන්න හෝ `manage` ඉවත් කරන්න.
4. CLI නොවන ස්වයංක්රීයකරණය සඳහා අවම වරප්රසාදය: GET-පමණක් කාර්ය සඳහා `read` ප්රවේශ ටෝකනයකට ප්රමුඛත්වය දෙන්න; ඇමතුම්කරුට `/v1` සහ කළමනාකරණය යන දෙකම සමඟ සන්නිවේදනය කිරීමට අවශ්ය විට පමණක් API යතුරක `manage` භාවිත කරන්න.

---

## ශීර්ෂක ආකෘතිය

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

කළමනාකරණ අක්තපත්ර URL මාර්ගයේ හෝ විමසුම් තන්තුවේ ඇතුළත් නොකරන්න. කළමනාකරණ
සත්යාපනය ශීර්ෂකය/කුකිය හරහා පමණි.

---

## පිටපත් කර ඇලවිය හැකි උදාහරණ

කියවීමට පමණයි (සපයන්නන් ලැයිස්තුගත කිරීම). `read` ප්රවේශ ටෝකනයක් භාවිත කරන්න:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

වෙනස් කිරීම (සපයන්නෙකුගේ සම්බන්ධතාවක් සෑදීම). `write`/`admin` ප්රවේශ ටෝකනයක් හෝ
`manage` විෂයපථය සහිත API යතුරක් භාවිත කරන්න:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

අනුමානය (කළමනාකරණය නොවේ). සාමාන්ය API යතුරක් භාවිත කරන්න; `manage` අවශ්ය නොවේ:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## වත්මන් ධාවනකාල දෝෂ (රහස් ප්රතිරාව නොකරන්න)

| තත්ත්වය                                        | සාමාන්ය තත්ත්ව කේතය | පණිවිඩය (සංවේදී තොරතුරු ඉවත් කළ)                                           |
| ---------------------------------------------- | ------------------- | -------------------------------------------------------------------------- |
| අක්තපත්රයක් නොමැත                              | 401                 | `සත්යාපනය අවශ්යයි`                                                         |
| වලංගු නොවන/කල් ඉකුත් වූ `oma_live_…`           | 401                 | `වලංගු නොවන හෝ කල් ඉකුත් වූ ප්රවේශ ටෝකනයකි`                                |
| `manage`/`admin` නොමැති වලංගු API යතුරක්       | 403                 | `API යතුරට 'manage' විෂයපථය නොමැත. API Keys උපකරණ පුවරුවේදී එය සබල කරන්න.` |
| කළමනාකරණ මාර්ගයක වලංගු නොවන සාමාන්ය API යතුරක් | 403                 | `වලංගු නොවන කළමනාකරණ ටෝකනයකි`                                              |
| ප්රවේශ ටෝකනයේ විෂයපථය ප්රමාණවත් නොවේ           | 403                 | `ප්රවේශ ටෝකනයේ '<have>' විෂයපථය ප්රමාණවත් නොවේ; '<need>' අවශ්යයි.`         |

"වලංගු නොවන කළමනාකරණ ටෝකනයකි" යන්නෙන් අදහස් වන්නේ bearer අගය කළමනාකරණ
අක්තපත්රයක් ලෙස **පිළි නොගත්** බවයි. එයින් ඔබ සෑදිය යුත්තේ කුමන පවුලට අයත් එකක්දැයි
**නොකියයි**. ඉහත වගුව භාවිත කරන්න: අනුමාන යතුරු සඳහා `manage` විෂයපථය අවශ්ය වේ;
දුරස්ථ CLI සඳහා `oma_live_…` අවශ්ය වේ; උපකරණ පුවරුව සැසි කුකිය භාවිත කරයි.

---

## නිර්දේශිත අවම-වරප්රසාද තේරීම

| ඇමතුම්කරු                                                   | භාවිතය                                         |
| ----------------------------------------------------------- | ---------------------------------------------- |
| බ්රවුසරය                                                    | උපකරණ පුවරු සැසිය                              |
| සේවාදායක සත්කාරකයේ CLI                                      | යන්ත්ර ටෝකනය                                   |
| දුරස්ථ සේවාදායකයක් සමඟ සන්නිවේදනය කරන ලැප්ටොප් පරිගණකයක CLI | `omniroute connect` වෙතින් ලැබෙන `oma_live_…`  |
| CI / ස්ක්රිප්ට් (කළමනාකරණය සඳහා පමණි)                       | ක්රියා කරන අවම විෂයපථය සහිත `oma_live_…`       |
| `/v1` සහ `/api` යන දෙකම ඇමතිය යුතු CI                       | `manage` සහිත API යතුරක් **හෝ** අක්තපත්ර දෙකක් |
