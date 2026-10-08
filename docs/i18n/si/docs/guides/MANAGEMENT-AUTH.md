# Management Authentication (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute සතුව කළමනාකරණ මාර්ග අවසර දිය හැකි **අක්තපත්ර පවුල් හතරක්** ඇත.
ඒවා එකිනෙකට මාරු කළ නොහැක. Inference API යතුරු (`sk-…`) සේවාදායකය කළමනාකරණය **නොකරයි**, ඒවාට `manage` හෝ `admin` විෂය පථය පැහැදිලිව ලබා දී නොමැති නම්.

සම්මත ක්රියාත්මක කිරීම: `src/lib/api/requireManagementAuth.ts`.

| අක්තපත්රය                 | සාමාන්ය ස්වරූපය                      | නිර්මාණය කරන ස්ථානය                               | අපේක්ෂිත භාවිතය            | කළමනාකරණ හැකියාව                                                                       |
| ------------------------- | ------------------------------------ | ------------------------------------------------- | -------------------------- | -------------------------------------------------------------------------------------- |
| Dashboard JWT සැසිය       | `auth_token` cookie                  | Dashboard පිවිසුම                                 | බ්රවුසර UI                 | CSRF, ස්ථානීයත්වය සහ සෑම විටම ආරක්ෂිත මාර්ග නීතිවලට යටත්ව සම්පූර්ණ dashboard කළමනාකරණය |
| CLI යන්ත්ර-හැඳුනුම් ටෝකනය | internal / local                     | CLI බූට්ස්ට්රැප් කිරීම (`omniroute` එකම යන්ත්රයේ) | දේශීය CLI                  | දේශීය කළමනාකරණය පමණි                                                                   |
| විෂය පථගත ප්රවේශ ටෝකනය    | `oma_live_…`                         | **සැකසුම් → ප්රවේශ ටෝකන** හෝ `omniroute connect`  | දුරස්ථ CLI සහ කළමනාකරණ API | මාර්ගයේ අවශ්ය `read`, `write`, හෝ `admin` විෂය පථය සපුරාලිය යුතුය                      |
| Inference API යතුර        | `sk-…` (සහ අනෙකුත් API-යතුරු උපසර්ග) | **API කළමනාකරු / API යතුරු**                      | `/v1/*` inference          | යතුරු මෙටාදත්තවල `manage` හෝ `admin` අඩංගු නොවේ නම් **කිසිවක් නැත**                    |

`oma_` අක්තපත්ර යනු කළමනාකරණ/CLI අක්තපත්ර වේ. ඒවා inference API යතුරු **නොවේ**.

සේවාදායකය සඳහා පිවිසුම්/API-යතුරු සත්යාපනය අක්රිය කර ඇත්නම්, සමහර කළමනාකරණ මාර්ග සත්යාපනය නොකළ ඇමතුම් භාර ගත හැක. දේශීය-පමණක් සහ සෑම විටම ආරක්ෂිත මාර්ග තවමත් ඒවායේම නීති අදාළ කරයි. එබැවින්, මෙම අක්තපත්රවලින් එකක් ඉදිරිපත් කිරීම විශ්වීය වශයෙන් අනිවාර්ය නොවන අතර, අවශ්ය විෂය පථය සහ මාර්ග ස්ථානීයත්වය නොමැතිව එකක් සන්තකයේ තබා ගැනීම විශ්වීය වශයෙන් ප්රමාණවත් නොවේ.

අදාළ: [දුරස්ථ මාදිලිය](./REMOTE-MODE.md) (දුරස්ථ CLI සඳහා `oma_live_…` සකසන ආකාරය).

---

## විෂය පථ න්යාස

API-යතුරු කළමනාකරණ විෂය පථ සහ ප්රවේශ-ටෝකන විෂය පථ විවිධ පදමාලා වේ.
MCP මෙවලම් විෂය පථ යනු තුන්වන පදමාලාවක් වන අතර, පහත වගු වල ඇති කිසිදු ශ්රිතයකට වඩා `scopeMatches` සමඟ පරීක්ෂා කරනු ලැබේ.
පැත්තෙන්-පැත්තට: [විෂය පථ නාම අවකාශ තුනක්](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### ප්රවේශ ටෝකන විෂය පථ (`oma_live_…`)

| විෂය පථය | සාමාන්ය මෙහෙයුම්                                                          |
| -------- | ------------------------------------------------------------------------- |
| `read`   | ටෝකනයට දැකීමට අවසර ඇති ලැයිස්තු/තත්ත්ව GETs                               |
| `write`  | පරිපාලක යටතේ විකෘති කිරීම් (නිර්මාණය/යාවත්කාලීන කිරීම/මකා දැමීම)          |
| `admin`  | සම්පූර්ණ දුරස්ථ CLI / සම්බන්ධක ටෝකනය (මුරපද බූට්ස්ට්රැප් මෙහි පෙරනිමි වේ) |

`read` සහිත ටෝකනයකට `write` මාර්ගයක් ඇමතීමට නොහැක. ධාවන කාල පණිවිඩයේ හැඩය:
`Access token scope '<have>' is insufficient; '<need>' required.`

### API-යතුරු කළමනාකරණ විෂය පථ

| විෂය පථය      | අර්ථය                                                                |
| ------------- | -------------------------------------------------------------------- |
| (කිසිවක් නැත) | Inference පමණි. කළමනාකරණ මාර්ග 403 ආපසු ලබා දෙයි.                    |
| `manage`      | කළමනාකරණ API (`requireManagementAuth` API-යතුරු ශාඛාවට සමාන ගේට්ටුව) |
| `admin`       | `hasManageScope` ද සපුරාලයි (කළමනාකරණයට හැකියාව ඇති ලෙස සලකනු ලැබේ)  |

API යතුරු / API කළමනාකරු UI හි යතුර මත `manage` සක්රීය කරන්න. ඔබ හිතාමතාම එම විෂය පථය ලබා දී නොමැති නම්, ස්වයංක්රීයකරණය සඳහා කතාබස් සේවාදායක යතුරක් නැවත භාවිතා නොකරන්න.

---

## සාදා ඉවත් කරන්නේ කෙසේද

### උපකරණ පුවරුවේ JWT සැසිය

1. `/login` විවෘත කරන්න, කළමනාකරණ මුරපදය (`INITIAL_PASSWORD` පළමු ආරම්භයේදී) සමඟින් පුරනය වන්න.
2. `auth_token` කුකිය HttpOnly වේ. බ්රවුසරයේ උපකරණ පුවරුව එය ස්වයංක්රීයව භාවිතා කරයි.
3. `/api/auth/logout` හරහා ලොග් අවුට් වන්න. පිටපත් කිරීමට දිගුකාලීන රහසක් නොමැත.

### CLI යන්ත්ර-හැඳුනුම්පත ටෝකනය

1. සේවාදායකය (loopback) හා **එකම සත්කාරකයේ** `omniroute` ධාවනය කරන්න.
2. CLI මඟින් `~/.omniroute/` යටතේ යන්ත්ර-හැඳුනුම්පත ටෝකනයක් ආරම්භ කරයි (chmod 600).
3. මෙය වෙනත් යන්ත්රයකින් ක්රියා නොකරයි. දුරස්ථ CLI සඳහා ප්රවේශ ටෝකනයක් භාවිතා කරන්න.

### විෂය පථගත ප්රවේශ ටෝකනය (`oma_live_…`)

1. උපකරණ පුවරුව: **සැකසීම් → ප්රවේශ ටෝකන** → සාදන්න (නම + විෂය පථය). **රහස එක් වරක් පෙන්වනු ලැබේ.**
2. නැතහොත් CLI: `omniroute connect <host>` (මුරපදය → ටෝකනය). [දුරස්ථ මාදිලිය](./REMOTE-MODE.md) බලන්න.
3. ශීර්ෂය: `Authorization: Bearer oma_live_…`
4. එම ප්රවේශ ටෝකන පිටුවෙන් අවලංගු කරන්න (හෝ CLI සන්දර්භය මකන්න).
5. සේවාදායකය ගබඩා කරන්නේ හැෂ් එකක් පමණි. සරල පාඨය මුරපදයක් මෙන් සලකන්න.

### කළමනාකරණ-විෂය පථගත API යතුර

1. උපකරණ පුවරුව: **API කළමනාකරු / API යතුරු** → යතුරක් සාදන්න හෝ සංස්කරණය කරන්න → `manage` (හෝ `admin`) සක්රීය කරන්න.
2. ශීර්ෂය: `Authorization: Bearer sk-…` (යතුරේ සත්ය උපසර්ගය).
3. එම UI එකෙන්ම `manage` අවලංගු කරන්න හෝ ඉවත් කරන්න.
4. CLI නොවන ස්වයංක්රීයකරණය සඳහා අවම වරප්රසාද: GET-පමණක් කාර්යයන් සඳහා `read` ප්රවේශ ටෝකනයක් භාවිතා කරන්න; අමතන්නාට `/v1` සහ කළමනාකරණය ද කතා කිරීමට අවශ්ය වූ විට පමණක් API යතුරක `manage` භාවිතා කරන්න.

---

## ශීර්ෂ ආකෘතිය

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

කළමනාකරණ අක්තපත්ර URL මාර්ගයේ හෝ විමසුම් තන්තුවේ නොතබන්න. කළමනාකරණ
සත්යාපනය ශීර්ෂය/කුකිය පමණි.

---

## පිටපත්-ඇලවීමේ උදාහරණ

කියවීම-පමණක් (සපයන්නන් ලැයිස්තුගත කරන්න). `read` ප්රවේශ ටෝකනයක් භාවිතා කරන්න:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

වෙනස් කිරීම (සපයන්නන් සම්බන්ධතාවයක් සාදන්න). `write`/`admin` ප්රවේශ ටෝකනයක් හෝ
කළමනාකරණ-විෂය පථගත API යතුරක් භාවිතා කරන්න:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

අනුමානය (කළමනාකරණය නොවේ). සාමාන්ය API යතුර, `manage` අවශ්ය නොවේ:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## වත්මන් ධාවන කාල දෝෂ (රහස් ප්රතිරාවය නොකරන්න)

| තත්ත්වය                                      | සාමාන්ය තත්ත්වය | පණිවිඩය (පිරිසිදු කරන ලදී)                                           |
| -------------------------------------------- | --------------- | -------------------------------------------------------------------- |
| අක්තපත්රයක් නොමැත                            | 401             | `Authentication required`                                            |
| වලංගු නොවන/කල් ඉකුත් වූ `oma_live_…`         | 401             | `Invalid or expired access token`                                    |
| `manage`/`admin` නොමැති වලංගු API යතුර       | 403             | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| කළමනාකරණ මාර්ගයක වලංගු නොවන සාමාන්ය API යතුර | 403             | `Invalid management token`                                           |
| ප්රවේශ ටෝකන විෂය පථය ඉතා අඩුයි               | 403             | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" යන්නෙන් අදහස් කරන්නේ දරන්නා කළමනාකරණ
අක්තපත්රයක් ලෙස **පිළිගෙන නොමැති** බවයි. එය කුමන පවුලක් සෑදිය යුතුද යන්න
නොකියයි. ඉහත වගුව භාවිතා කරන්න: අනුමාන යතුරු සඳහා `manage` විෂය පථය අවශ්ය වේ;
දුරස්ථ CLI සඳහා `oma_live_…` අවශ්ය වේ; උපකරණ පුවරුව සැසි කුකිය භාවිතා කරයි.

---

## අවම වරප්රසාද තේරීම නිර්දේශ කෙරේ

| අමතන්නා                                             | භාවිතය                                       |
| :-------------------------------------------------- | :------------------------------------------- |
| බ්රවුසරය                                            | උපකරණ පුවරු සැසිය                            |
| සේවාදායක සත්කාරකයේ CLI                              | යන්ත්ර ටෝකනය                                 |
| දුරස්ථ සේවාදායකයකට සම්බන්ධ වන ලැප්ටොප් පරිගණකයක CLI | `omniroute connect` වෙතින් `oma_live_…`      |
| CI / ස්ක්රිප්ට් (කළමනාකරණය පමණි)                    | ක්රියා කරන කුඩාම විෂය පථය සහිත `oma_live_…`  |
| `/v1` සහ `/api` යන දෙකටම ඇමතීමට අවශ්ය CI            | `manage` සහිත API යතුර **හෝ** අක්තපත්ර දෙකක් |
