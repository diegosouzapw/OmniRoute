# Feature Flags (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/FEATURE_FLAGS.md) · 🇪🇹 [am](../../../am/docs/reference/FEATURE_FLAGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/FEATURE_FLAGS.md) · 🇦🇿 [az](../../../az/docs/reference/FEATURE_FLAGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/FEATURE_FLAGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/FEATURE_FLAGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/FEATURE_FLAGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/FEATURE_FLAGS.md) · 🇩🇰 [da](../../../da/docs/reference/FEATURE_FLAGS.md) · 🇩🇪 [de](../../../de/docs/reference/FEATURE_FLAGS.md) · 🇬🇷 [el](../../../el/docs/reference/FEATURE_FLAGS.md) · 🇪🇸 [es](../../../es/docs/reference/FEATURE_FLAGS.md) · 🇪🇪 [et](../../../et/docs/reference/FEATURE_FLAGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/FEATURE_FLAGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/FEATURE_FLAGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/FEATURE_FLAGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/FEATURE_FLAGS.md) · 🇮🇱 [he](../../../he/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/FEATURE_FLAGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/FEATURE_FLAGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/FEATURE_FLAGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/FEATURE_FLAGS.md) · 🇮🇩 [id](../../../id/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/FEATURE_FLAGS.md) · 🇮🇹 [it](../../../it/docs/reference/FEATURE_FLAGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/FEATURE_FLAGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/FEATURE_FLAGS.md) · 🇰🇭 [km](../../../km/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/FEATURE_FLAGS.md) · 🇰🇷 [ko](../../../ko/docs/reference/FEATURE_FLAGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/FEATURE_FLAGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/FEATURE_FLAGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/FEATURE_FLAGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/FEATURE_FLAGS.md) · 🇲🇲 [my](../../../my/docs/reference/FEATURE_FLAGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/FEATURE_FLAGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/FEATURE_FLAGS.md) · 🇳🇴 [no](../../../no/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [or](../../../or/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/FEATURE_FLAGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/FEATURE_FLAGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/FEATURE_FLAGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/FEATURE_FLAGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/FEATURE_FLAGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/FEATURE_FLAGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/FEATURE_FLAGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/FEATURE_FLAGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/FEATURE_FLAGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/FEATURE_FLAGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/FEATURE_FLAGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [te](../../../te/docs/reference/FEATURE_FLAGS.md) · 🇹🇭 [th](../../../th/docs/reference/FEATURE_FLAGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/FEATURE_FLAGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/FEATURE_FLAGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/FEATURE_FLAGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/FEATURE_FLAGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/FEATURE_FLAGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/FEATURE_FLAGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/FEATURE_FLAGS.md)

---

> නැවත යෙදවීමකින් **තොරව OmniRoute හි හැසිරීම වෙනස් කරන** ධාවනකාල ටොගල්.
> මෙහි ලැයිස්තුගත කර ඇති සෑම ෆ්ලෑගයක්ම අර්ථ දක්වා ඇත්තේ
> [`src/shared/constants/featureFlagDefinitions.ts`](../../src/shared/constants/featureFlagDefinitions.ts)
> තුළය — එය එකම සත්ය මූලාශ්රයයි. උපකරණ පුවරුව සහ REST API එක යන දෙකම
> එම ගොනුවෙන් කියවන බැවින්, පහත වගුව එයට 1:1 ලෙස ගැළපෙන පරිදි ජනනය කර ඇත.

---

## විශේෂාංග ෆ්ලෑග් යනු මොනවාද

විශේෂාංග ෆ්ලෑගයක් යනු ධාවනකාලයේදී අගය වෙනස් කර දත්ත සමුදායේ සුරැකිය හැකි,
ක්රියාවලිය නැවත යෙදවීමක් අවශ්ය නොවන, නමක් සහිත ටොගලයකි (boolean හෝ enum).
සෑම ෆ්ලෑගයක්ම `key`, `label`, `description`, `category`, `defaultValue`,
`type`, සහ `requiresRestart` ඉඟියක් සහිත `FeatureFlagDefinition` එකකින් විස්තර කෙරේ.

### නිරාකරණ අනුපිළිවෙළ

ෆ්ලෑගයක **බලපැවැත්වෙන අගය**
[`resolveFeatureFlag()`](../../src/shared/utils/featureFlags.ts) මඟින් පහත
ප්රමුඛතා අනුපිළිවෙළට අනුව නිරාකරණය කෙරේ (ඉහළම ප්රමුඛතාව ජය ගනී):

1. **DB අතික්රමණය** — `feature_flags` නාම අවකාශය යටතේ `key_value` වගුවේ
   ගබඩා කර ඇති අගයක් (උපකරණ පුවරුව හෝ REST API එක හරහා සකසා ඇත).
2. **පරිසර විචල්යය** — සකසා ඇති සහ හිස් නොවන විට `process.env[<KEY>]`.
3. **අර්ථ දැක්වීමේ පෙරනිමිය** — `featureFlagDefinitions.ts` හි `defaultValue`.

boolean ෆ්ලෑගයක බලපැවැත්වෙන අගය `"true"`, `"1"`, හෝ `"yes"` වන විට එය
**සක්රීය** ලෙස සැලකේ (`isFeatureFlagEnabled()` බලන්න).

> [!NOTE]
> බොහෝ ෆ්ලෑග් සඳහා [`ENVIRONMENT.md`](./ENVIRONMENT.md) හි ලේඛනගත කර ඇති
> **එම නමින්ම** යුත් ගැළපෙන පරිසර විචල්යයක් ද ඇත. ෆ්ලෑගයේ DB අතික්රමණයට
> එම පරිසර විචල්යයට වඩා ප්රමුඛතාව ලැබේ. `requiresRestart: true` සහිත
> ෆ්ලෑගයක් වහාම සුරැකෙන නමුත් එය නැවත කියවනු ලබන්නේ ක්රියාවලිය ආරම්භ වන
> අවස්ථාවේදී පමණි — එය ටොගල් කිරීමෙන් උපකරණ පුවරුවේ **"සේවාදායකය නැවත අරඹන්න"**
> බැනරයක් දිස් වේ.

---

## ෆ්ලෑග් නාමාවලිය

ප්රවර්ග 6ක් පුරා ෆ්ලෑග් 72ක් ඇත. **පෙරනිමිය** යනු අර්ථ දැක්වීමේ පෙරනිමි අගයයි —
DB අතික්රමණයක් හෝ පරිසර විචල්යයක් හෝ නොමැති විට භාවිත වන අගයයි.

### ආරක්ෂාව (10)

| යතුර                                    | වර්ගය   | පෙරනිමිය | විස්තරය                                                                                                                                                                                                                                                                                     |
| --------------------------------------- | ------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUIRE_API_KEY`                       | boolean | `false`  | පැමිණෙන සියලු ඉල්ලීම් සඳහා API යතුරක් අවශ්ය කරන්න.                                                                                                                                                                                                                                          |
| `INPUT_SANITIZER_ENABLED`               | boolean | `true`   | සියලු ඉල්ලීම් සඳහා ආදාන පිරිසිදු කිරීම සක්රීය කරන්න.                                                                                                                                                                                                                                        |
| `INJECTION_GUARD_MODE`                  | enum    | `off`    | ප්රේරක ඉන්ජෙක්ෂන් ආරක්ෂණ මාදිලිය. අගයන්: `off`, `warn`, `block`, `redact`.                                                                                                                                                                                                                  |
| `PII_REDACTION_ENABLED`                 | boolean | `false`  | ඉල්ලීම්වලින් PII සංස්කරණය කර ඉවත් කරන්න (`INPUT_SANITIZER_MODE` වෙතින් ස්වාධීනව).                                                                                                                                                                                                           |
| `PII_RESPONSE_SANITIZATION`             | boolean | `false`  | සැපයුම්කරුගේ ප්රතිචාරවලින් PII පිරිසිදු කරන්න.                                                                                                                                                                                                                                              |
| `PII_RESPONSE_SANITIZATION_MODE`        | enum    | `redact` | PII ප්රතිචාර පිරිසිදු කිරීමේ මාදිලිය. අගයන්: `redact`, `warn`, `block`, `off`.                                                                                                                                                                                                              |
| `OUTBOUND_SSRF_GUARD_ENABLED`           | boolean | `true`   | පුද්ගලික/අභ්යන්තර IP පරාස වෙත යවන ඉල්ලීම් අවහිර කරන්න.                                                                                                                                                                                                                                      |
| `ALLOW_API_KEY_REVEAL`                  | boolean | `false`  | සත්යාපනය කළ උපකරණ පුවරු පරිශීලකයන්ට ආවරණය කළ අගයන් පමණක් දැකීම වෙනුවට ගබඩා කර ඇති API යතුරු අනාවරණය කිරීමට ඉඩ දෙන්න.                                                                                                                                                                        |
| `AUTH_LOG_INCLUDE_ACCOUNT_ID`           | boolean | `false`  | AUTH ලොග් පේළිවල ගිණුම් උපසර්ගය ඇතුළත් කරන්න (උදා. "<provider> ගිණුම භාවිත කරමින්: abc12345..."). පෙරනිමියෙන් අක්රීය කර ඇති බැවින් හවුල්/බහු-කුලීකරු ක්රියාවලි ලොග්වලින් ගිණුම් හඳුනාගැනීම් සංස්කරණය කර ඉවත් කෙරේ. Debug Mode වෙතින් ස්වාධීන වේ; Debug Mode මාරු කිරීමෙන් මෙය අනාවරණය නොවේ. |
| `OMNIROUTE_OIDC_DISABLE_PASSWORD_LOGIN` | boolean | `false`  | OIDC සක්රීය කර ඇති විට, පරිශීලකයන්ට OIDC Single Sign-On හරහා පමණක් සත්යාපනය කළ හැකි වන පරිදි මුරපද පිවිසුම අක්රීය කරන්න. අක්රීය කර ඇති විට (පෙරනිමිය), මුරපද පිවිසුම සහ OIDC යන දෙකම ලබා ගත හැක.                                                                                            |

### ජාලය (15)

| යතුර                                            | වර්ගය   | පෙරනිමිය | නැවත ආරම්භ කිරීම | විස්තරය                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ----------------------------------------------- | ------- | -------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ENABLE_TLS_FINGERPRINT`                        | boolean | `false`  | ✓                | TLS fingerprint රහස්යතා ප්රකාරය සබල කරන්න.                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `AUDIO_REMOTE_PROVIDER_NODES`                   | boolean | `false`  |                  | /v1/audio/* මාර්ගවලට localhost පිටත සත්කාරකත්වය සපයන OpenAI-අනුකූල සැපයුම්කරු නෝඩ් භාවිත කිරීමට ඉඩ දෙන්න. පෙරනිමියෙන් අක්රියයි — දුරස්ථ සත්කාරකයකට ශ්රව්ය යොමු කිරීමෙන් පිටතට යාමේ අනන්යතාව වෙනස් වන අතර එය ක්රියාකරු විසින් පැහැදිලිව ගත යුතු තීරණයකි. Loopback නෝඩ් සැමවිටම ඉඩ දී ඇති අතර ඒවාට බලපෑමක් සිදු නොවේ.                                                                                                                                                                                                 |
| `PROXY_AUTO_SELECT_ENABLED`                     | boolean | `false`  |                  | සම්බන්ධතාවකට proxy එකක් පවරා නොමැති විට, ලේඛනාගාරයෙන් ක්රියාකරන පළමු proxy එක ස්වයංක්රීයව තෝරන්න. පෙරනිමියෙන් අක්රියයි (එසේ නොමැති නම් ලේඛනාගාරයේ ඕනෑම proxy එකක් ගෝලීය අතිරේක විකල්පයක් බවට පත් වේ — #3332).                                                                                                                                                                                                                                                                                                       |
| `OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK` | boolean | `false`  |                  | proxy ළඟා විය හැකිදැයි කරන පූර්ව පරීක්ෂණ අසාර්ථක වූ විට, අමුණා ඇති proxy එක මඟහැර සෘජුව සම්බන්ධ වීමට OAuth සහ සැපයුම්කරු සත්යාපන ප්රවාහවලට ඉඩ දෙන්න. මෙය පිටතට යාමේ IP ලිපිනය වෙනස් කළ හැකි බැවින් පෙරනිමියෙන් අක්රියයි.                                                                                                                                                                                                                                                                                            |
| `NETWORK_ROTATION_SHARED_EGRESS_GUARD`          | boolean | `true`   |                  | බහු-ගිණුම් මාරු කිරීමේ executor එකක ජාල ව්යතිරේකයක් (කාලය ඉක්මවීම, සම්බන්ධතාව ප්රතික්ෂේප වීම/යළි පිහිටුවීම) ඇති වූ විට, අසාර්ථක වූ ගිණුමට වෙන් කළ proxy එකක් නොමැති නම්, එක් එක් ගිණුම නැවත උත්සාහ කිරීම වෙනුවට කෙටි cooldown එකක් යොදා ඉල්ලීමේ ඉතිරි කාලය සඳහා proxy රහිත අනෙකුත් ගිණුම් මඟහරින්න. පෙරනිමියෙන් සක්රියයි (ආරක්ෂිතයි: පිටතට යාමේ IP ලිපිනය වෙනස් නොවන අතර, හවුල් පිටතට යාමේ ගිණුම්වල ප්රමාදය/cooldown අවදානම පමණක් අඩු කරයි). පළමු proxy රහිත throw එකේදී වහාම ප්රචාරණය යළි පිහිටුවීමට අක්රිය කරන්න. |
| `PROXY_SKIP_RECENTLY_FAILED`                    | boolean | `false`  |                  | Proxy pool සහ opencode හි එක්-ගිණුමකට අදාළ මාරු කිරීම, මෑතකදී අසාර්ථක වූ proxy එකක් (ප්රතික්ෂේප කළ TCP probe එකක් හෝ ඒ හරහා ලැබුණු 429 එකක්) එක් එක් නැවත සිදුවීමේදී දෙගුණ වන, උපරිම සීමාවක් දක්වා වන, එක්-process කාලසීමාවක් සඳහා නැවත ලබා දීම නවත්වයි. කිසිදු proxy තත්ත්වයක් ලියනු නොලැබේ; සෑම අපේක්ෂකයෙකුම පසෙකට තැබුවහොත් තේරීම නොවෙනස්ව පවතී. පෙරනිමියෙන් අක්රියයි.                                                                                                                                           |
| `PROXY_POOL_EGRESS_OBSERVATION`                 | boolean | `false`  |                  | dashboard එකේ proxy pool එකක් යටතේ, පසුගිය පැය 24 තුළ එහි සාමාජිකයන්ට සේවය සැපයූ නිරීක්ෂිත පිටතට යාමේ IP ලිපින ගණන සහ ඒවා භාවිත කළ සම්බන්ධතා ගණන පෙන්වන්න. කියවීමට පමණි, proxy log එකෙන් ගණනය කරනු ලබන අතර routing සඳහා කිසිවිටෙක භාවිත නොවේ. පෙරනිමියෙන් අක්රියයි.                                                                                                                                                                                                                                                 |
| `OPENCODE_RESPONSES_STALL_ROTATION`             | boolean | `false`  |                  | OpenCode executor සඳහා, streamed Responses පිළිතුරක පළමු body byte එක නිරීක්ෂණය කරන්න (කාල කවුළුව: `RESPONSES_FIRST_BYTE_TIMEOUT_MS`, පෙරනිමිය `15000`). එම කාල කවුළුව ඉක්මවා නිහඬව පවතින 2xx Responses stream එකක් ඇණහිටීමක් ලෙස සලකනු ලැබේ: ගිණුම cooldown කර ඉල්ලීම එක් වරක් ඊළඟ ගිණුමට මාරු කරනු ලැබේ; දෙවන ඇණහිටීමකදී වහාම අසාර්ථක වේ. පෙරනිමියෙන් අක්රියයි: ඇණහිටි stream, stream සූදානම් වීමේ කාල සීමාව දක්වා වත්මන් බලා සිටීම දිගටම පවත්වා ගනී.                                                             |
| `OPENCODE_USER_BLOCKED_ROTATION`                | boolean | `false`  |                  | OpenCode executor: `user_blocked` ප්රතික්ෂේපයක් අඩංගු 403/451 එකක් ලැබුණු විට (භූගෝලීය හේතුවක් නොවන, Cloudflare fingerprint ප්රතික්ෂේපයක් නොවන), ප්රතික්ෂේප වූ ගිණුම cooldown කර එක් ඉල්ලීමකට උපරිම වශයෙන් එක් වරක් ඊළඟ ගිණුමට මාරු කරන්න; දෙවන ප්රතික්ෂේපයක් සාර්ථකත්ව ලකුණක් නොමැතිව එලෙසම ආපසු ලබා දේ. පෙරනිමියෙන් අක්රියයි: upstream පරිශීලක අවහිරයක් වටා routing කිරීම මඟහැරීමක් ලෙස පෙනී යා හැකි අතර එම සලකුණ මුළු fleet එක පුරා පැතිරවිය හැක.                                                                |
| `OPENCODE_TRANSIENT_FAILOVER_BACKOFF`           | boolean | `false`  |                  | OpenCode මාරුකිරීම: අඛණ්ඩ තාවකාලික upstream අසාර්ථකවීම් දෙකකට පසු (5xx හෝ හිස් 400), ඊළඟ ගිණුමට යාමට පෙර විරාමයක් තබන්න — තවත් සෑම අසාර්ථකවීමකටම තත්පර 1.5 බැගින් දෙගුණ වන අතර, එක් විරාමයක් තත්පර 6කට සහ එක් ඉල්ලීමක් සඳහා තත්පර 10කට සීමා වේ; සේවාලාභියා විසන්ධි වූ විට මෙය මඟහරිනු ලැබේ; රැඳී සිටීමට පෙර අසාර්ථක ප්රතිචාර body එක නිදහස් කරනු ලැබේ. පෙරනිමියෙන් අක්රියයි: failover ක්ෂණිකව පවතී.                                                                                                                 |
| `OPENCODE_RATE_LIMITED_429_EARLY_STOP`          | boolean | `false`  |                  | OpenCode මාරුකිරීම: සැබෑ rate limit එකක් ලෙස වර්ගීකරණය කළ පළමු 429 දී ගිණුම් වටය නවත්වා (විග්රහ කළ හැකි `Retry-After`, හෝ rate/usage limit එකක් සඳහන් කරන body එකක්) එම upstream 429 වෙනස් නොකර ආපසු ලබා දෙන්න. වර්ගීකරණය නොකළ 429 සඳහා මාරුකිරීම දිගටම සිදු වේ. පෙරනිමියෙන් අක්රියයි: නොමිලේ ස්තරය එක් egress IP එකකට සීමා කර ඇති බැවින් (#9611), සෑම 429 එකකදීම මාරු වන අතර සම්පූර්ණයෙන් උත්සාහ කළ වටයක් අවසන් upstream 429 ආපසු ලබා දෙයි.                                                                        |
| `MITM_DISABLE_TLS_VERIFY`                       | boolean | `false`  | ✓                | MITM proxy සඳහා TLS සහතික සත්යාපනය අක්රිය කරන්න. **අනතුරුදායකයි.**                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`         | boolean | `false`  |                  | පුද්ගලික/අභ්යන්තර ජාල වෙත යොමු වන provider URL සඳහා අවසර දෙන්න.                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`           | boolean | `true`   |                  | දේශීය/පුද්ගලික ලිපිනවල (127.0.0.1, localhost, LAN) provider එක් කිරීමට/සත්යාපනය කිරීමට අවසර දෙන්න. පෙරනිමියෙන් සක්රියයි (දේශීය-පළමු); පොදු ලිපිනවලට පමණක් දැඩිව සීමා කිරීම සඳහා අක්රිය කරන්න. Cloud metadata තවදුරටත් අවහිර කර ඇත.                                                                                                                                                                                                                                                                                  |
| `ENABLE_CC_COMPATIBLE_PROVIDER`                 | boolean | `false`  | ✓                | Claude Code-අනුකූල provider ප්රකාරය සක්රිය කරන්න.                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

### ප්රතිපත්ති (5)

| යතුර                            | වර්ගය   | පෙරනිමිය   | විස්තරය                                                                                                                                                                                                               |
| ------------------------------- | ------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `TOOL_POLICY_MODE`              | enum    | `disabled` | මෙවලම් භාවිත ප්රතිපත්ති බලාත්මක කිරීමේ ප්රකාරය. අගයන්: `disabled`, `warn`, `block`.                                                                                                                                   |
| `RATE_LIMIT_AUTO_ENABLE`        | boolean | `false`    | භාවිත රටා මත පදනම්ව rate limiting ස්වයංක්රීයව සක්රිය කරන්න.                                                                                                                                                           |
| `DISABLE_CONTEXT_WINDOW_CHECKS` | boolean | `false`    | සෘජු තනි-model ඉල්ලීම් සඳහා OmniRoute හි දේශීය context-window / උපරිම-input-token පරීක්ෂාව මඟහරින්න. Upstream සීමා තවදුරටත් අදාළ වේ.                                                                                  |
| `CAPABILITY_FILTER_ENABLED`     | boolean | `false`    | ඉලක්ක model එකට අවශ්ය හැකියාවන් (දෘශ්යය, මෙවලම්, ව්යුහගත ප්රතිදානය, context window) නොමැති විට යොමු කිරීමට පෙර ඉල්ලීම් ප්රතික්ෂේප කරන්න. මෙය combo-layer අනුකූලතා පෙරහන මඟහරින සෘජු තනි-provider ඉල්ලීම් ආරක්ෂා කරයි. |
| `RADAR_ENABLED`                 | boolean | `false`    | OmniRoute Radar මොඩියුලය (නාමාවලි feed තිර සහ සමමුහුර්තකරණය) සක්රිය කරන්න. පෙරනිමියෙන් අක්රියයි; සක්රිය කිරීමෙන් අතුරුමුහුණත පමණක් විවෘත වේ — දත්ත සමමුහුර්තකරණය වෙනම තේරීම්-සක්රිය කිරීමක් ලෙස පවතී.                 |

### ධාවන කාලය (32)

| යතුර                                        | වර්ගය   | පෙරනිමිය | නැවත ආරම්භ කිරීම | විස්තරය                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------------------------------- | ------- | -------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `UNIVERSAL_CONTEXT_HANDOFF_ENABLED`         | boolean | `true`   |                  | combo routing මඟින් models මාරු කරන විට සංවාද සාරාංශ ජනනය කර ඇතුළත් කරන්න. model මාරු කිරීම් ස්වාධීනව සැලකීමට සහ දැනට පවතින මෙන්ම අනාගත සියලු combos සඳහා පසුබිම් handoff ඉල්ලීම් වැළැක්වීමට මෙය අක්රිය කරන්න.                                                                                                                                                                                                                                                                                                                                                     |
| `RESPONSES_PASSTHROUGH_DROP_COMMENTARY`     | boolean | `true`   |                  | clients වෙත යොමු කිරීමට පෙර Responses API passthrough streams වෙතින් අභ්යන්තර commentary-phase output items ඉවත් කරන්න. අමු upstream commentary ලබා ගැනීමට මෙය අක්රිය කරන්න.                                                                                                                                                                                                                                                                                                                                                                                       |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`              | boolean | `true`   |                  | MCP tool ප්රවේශය සඳහා scope සීමා බලාත්මක කරන්න.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`       | boolean | `false`  |                  | token භාවිතය අඩු කිරීමට MCP tool විස්තර සම්පීඩනය කරන්න.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS` | boolean | `false`  |                  | runtime අතරතුර පසුබිම් කාර්ය සැකසීම සක්රිය කරන්න.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_DISABLE_BACKGROUND_SERVICES`     | boolean | `false`  | ✓                | සියලු පසුබිම් සේවා (quota refresh, sync, ආදිය) අක්රිය කරන්න.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS`       | boolean | `false`  |                  | වලංගුකරණයකින් තොරව project-level RTK filters විශ්වාස කරන්න.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_ENABLE_LIVE_WS`                  | boolean | `true`   | ✓                | import කිරීමේදී real-time dashboard WebSocket server එක ආරම්භ කරන්න (පෙරනිමියෙන් port 20132).                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `OMNIROUTE_CODEX_WS_ENABLED`                | boolean | `true`   |                  | Codex හට Responses-over-WebSocket ප්රවාහනය භාවිත කිරීමට ඉඩ දෙන්න. අක්රිය කළ විට, Codex HTTP Responses වෙත ආපසු යයි.                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `OMNIROUTE_CODEX_APP_SERVER_ENABLED`        | boolean | `true`   |                  | Codex හට දේශීය app-server WebSocket JSON-RPC ප්රවාහනය (codexTransport=app-server) භාවිත කිරීමට ඉඩ දෙන්න. අක්රිය කළ විට, app-server භාවිත කිරීමට තෝරාගත් සම්බන්ධතා Codex හි අනෙකුත් ප්රවාහන වෙත ආපසු යයි.                                                                                                                                                                                                                                                                                                                                                           |
| `OMNIROUTE_EMERGENCY_FALLBACK`              | boolean | `true`   |                  | අයවැය අවසන් වූ ඉල්ලීම් හදිසි නොමිලේ විකල්ප සපයන්නා/ආකෘතිය වෙත යොමු කරන්න. (පහත [හදිසි අයවැය විකල්පය](#emergency-budget-fallback) බලන්න.)                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `STREAM_RECOVERY_ENABLED`                   | boolean | `false`  |                  | කිසිදු ප්රතිචාර byte එකක් සේවාලාභියා වෙත ළඟා වීමට පෙර කප්පාදු වූ upstream SSE stream සඳහා පාරදෘශ්ය මුල් නැවත උත්සාහය සබල කරන්න.                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `STREAM_RECOVERY_MIDSTREAM_ENABLED`         | boolean | `false`  |                  | byte දැනටමත් සේවාලාභියා වෙත ළඟා වී ඇති පසු ප්රතිචාරයක් නැවත ඉල්ලා එය ඒකාබද්ධ කිරීමට stream ප්රතිසාධනයට ඉඩ දෙන්න.                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `STREAM_RECOVERY_TOOLCALL_ORDER_FIX`        | boolean | `false`  |                  | stream මැද අඛණ්ඩතාව tool-call සඳහා ආරක්ෂිත කරන්න: tool call එකක් නිකුත් කළ පසු (ක්රියාත්මක වෙමින් හෝ finish_reason tool_calls සමඟ දැනටමත් අවසන් වී හෝ තිබුණත්) කප්පාදු වූ stream එකක් කිසිවිටෙක නැවත අරඹන්න එපා, සහ සම්පූර්ණ අයවැය වැය කිරීම වෙනුවට එක් හිස් අඛණ්ඩතාවකින් පසු වසා දමන්න. අක්රියයි: නිකුතු හැසිරීම.                                                                                                                                                                                                                                                 |
| `STREAM_EARLY_EOF_SIBLING_FAILOVER_ENABLED` | boolean | `false`  |                  | SSE stream එකක් කිසිදු ප්රයෝජනවත් frame එකක් නිකුත් කිරීමට පෙර වසා දැමී, සීමිත එකම-සම්බන්ධතා නැවත උත්සාහය අවසන් වූ විට, sibling සම්බන්ධතාවක් වෙත එක් වරක් fail over කරන්න; භාවිත කළ හැකි sibling එකක් නොමැති නම් මුල් `STREAM_EARLY_EOF` 502 ප්රතිචාරය ආපසු ලබා දෙයි. පෙරනිමියෙන් අක්රියයි: එකම-සම්බන්ධතා නැවත උත්සාහයෙන් පසු early-EOF අවසාන තත්ත්වය ලෙස පවතී.                                                                                                                                                                                                    |
| `MODEL_CATALOG_INCLUDE_NAMES`               | boolean | `true`   |                  | `/v1/models` ප්රතිචාරවල ප්රදර්ශනයට හිතකර නාම ක්ෂේත්ර ඇතුළත් කරන්න. ආකෘති ID පමණක් අපේක්ෂා කරන සේවාලාභීන් සඳහා අක්රිය කරන්න.                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `MODELS_CATALOG_PREFIX_MODE`                | enum    | `dual`   |                  | /v1/models තුළ ආකෘති ID සඳහා උපසර්ග යොදන ආකාරය පාලනය කරයි. පසුගාමී ගැළපුම සඳහා 'dual' (පෙරනිමි) මඟින් alias සහ canonical provider-id උපසර්ග දෙකම නිකුත් කරයි. 'alias' මඟින් කෙටි alias උපසර්ගය පමණක් නිකුත් කරයි (උදා. ds-web/model, deepseek-web/model නොවේ). 'canonical' මඟින් සම්පූර්ණ provider-id උපසර්ගය පමණක් නිකුත් කරයි. අගයන්: `dual`, `alias`, `canonical`.                                                                                                                                                                                              |
| `ARENA_ELO_SYNC_ENABLED`                    | boolean | `true`   |                  | ආකෘති බුද්ධි ශ්රේණිගත කිරීම් සඳහා වාරික Arena AI ප්රමුඛතා පුවරු ELO සමමුහුර්තකරණය සබල කරන්න.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `EXPOSE_CC_DISCOVERY_ALIASES`               | boolean | `false`  |                  | Claude Code ගේට්වේ ආකෘති සොයාගැනීමේ ලැයිස්තුවේ Claude නොවන ආකෘති පෙන්වීම සඳහා `/v1/models` තුළ `claude/<provider>/<model>` ප්රතිබිම්බ id ප්රචාරණය කරන්න. මට්ටම් තුනකින් යුත් ගේට්ටුවේ ගෝලීය මට්ටමයි (dashboard අතික්රමණයට වඩා env අගය ප්රමුඛ වේ). [Claude Code වින්යාසය](../guides/CLAUDE-CODE-CONFIGURATION.md#discovery-aliases--surface-non-claude-models-in-the-model-picker) බලන්න.                                                                                                                                                                           |
| `NO_THINKING_ALIAS_ENABLED`                 | boolean | `true`   |                  | no-think/<provider>/<model> ගේට්වේ අන්වර්ථ සඳහා ප්රධාන ස්විචය. සක්රියයි (පෙරනිමිය): `/v1/models` සුදුසුකම් ඇති සෑම සිතීමේ හැකියාව සහිත Claude ආකෘතියක් සඳහාම සිතීමෙන් තොර ප්රභේදයක් ප්රචාරණය කරන අතර, ඉල්ලීමක යවන no-think/ id එකක් තර්කනය යටපත් කර සැබෑ ආකෘතිය වෙත නැවත විසඳනු ලැබේ. අක්රියයි: කිසිදු ප්රභේදයක් ප්රචාරණය නොකරන අතර no-think/ id එකක් වෙනත් ඕනෑම නොදන්නා ආකෘති id එකක් මෙන් සලකනු ලැබේ. මෙය සක්රියව තිබියදීත් එක් එක් ආකෘතියට අදාළ ModelSpec.noThinkingAlias තේරීම්-ඇතුළත් කිරීම/තේරීම්-ඉවත් කිරීම අදාළ වේ.                                        |
| `OMNIROUTE_DISABLE_THINKING_LEVEL_VARIANTS` | boolean | `false`  |                  | `/v1/models` නාමාවලිය තුළ සිතීමේ මට්ටම් ප්රභේද (උදා. -low, -medium, -high) ජනනය කිරීම අක්රිය කරන්න.                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `OMNIROUTE_CHAT_VIRTUAL_LANES`              | boolean | `false`  | ✓                | සපයන්නා වෙත යැවීම සඳහා එක් එක් tenant එකට අනුව අනුවර්තනය වන අතථ්ය ප්රවේශ මංතීරු සක්රිය කරන්න (#9654): එක් tenant කෙනෙකුගේ හදිසි ඉල්ලීම් වැඩිවීමක් නිසා තවත් කෙනෙකුට 503 දෝෂ ලැබීම තවදුරටත් සිදු නොවේ. `OMNIROUTE_CHAT_VIRTUAL_LANES` env විචල්යය මෙම dashboard අතික්රමණයට වඩා ප්රමුඛ වේ; වෙනස්කම් server නැවත ආරම්භ කිරීමේදී බලපැවැත්වේ.                                                                                                                                                                                                                           |
| `EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS`         | boolean | `false`  |                  | සම්මත හිමිකරුට සක්රිය අක්තපත්රයක් නොමැති නමුත් සක්රිය අක්තපත්රයක් සහිත passthrough ගේට්වේ එකක් මඟින් මාර්ගගත කරන ආකෘති සඳහා `/v1/models` තුළ <gateway-alias>/<model> ප්රතිබිම්බ id ප්රචාරණය කරන්න. අවවාදයයි: ගෝලීයව සක්රිය කළ විට සියලුම clients සඳහා නාමාවලි ඇතුළත් කිරීම් එක් කරයි.                                                                                                                                                                                                                                                                              |
| `NEWAPI_AGGREGATOR_BALANCE`                 | boolean | `false`  |                  | New-API / One-API / Sub2API aggregator සමඟ අනුකූල nodes සඳහා ශේෂ හඳුනාගැනීම සක්රිය කරන්න. සක්රිය කළ විට, aggregator ධජය සකසා ඇති අනුකූල nodes තම ශේෂය dashboard සහ quota-preflight මාර්ගගත කිරීම තුළ වාර්තා කරනු ඇත.                                                                                                                                                                                                                                                                                                                                               |
| `SERVER_OWNED_TOOL_LOOP_ENABLED`            | boolean | `false`  |                  | ආකෘතිය client විසින් භාවිත කළ හැකි ප්රතිචාරයක් ආපසු ලබාදෙන තෙක් streaming නොවන, server සතු tool calls දිගටම කරගෙන යන්න.                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `SEARCH_STATS_HIDE_DELETED_CONNECTIONS`     | boolean | `false`  |                  | සෙවුම් සංඛ්යාලේඛන සහ මෑත සෙවුම් ගණනය කරන්නේ තවමත් සජීවී සම්බන්ධතාවක් ඇති සපයන්නන් පමණි (duckduckgo-free වැනි keyless සපයන්නන් සැමවිටම ගණනය වේ). අක්රියව තිබීමෙන් සපයන්නාගේ id එකක් සහිත සෑම රඳවාගත් සෙවුම් පේළියක්ම තබා ගනී.                                                                                                                                                                                                                                                                                                                                       |
| `FREE_BADGE_REQUIRES_PROVIDER_FREE_TIER`    | boolean | `false`  |                  | Dashboard සපයන්නා පිටු: සපයන්නා පිළිගන්නා සංඥා මත පමණක් Free ලාංඡනය පෙන්වන්න — ලේඛනගත නිදහස් ස්තරයක් නොමැති ලියාපදිංචි සපයන්නන්ගේ display-name heuristic, boolean නොවන free ක්ෂේත්ර සහ :free උපසර්ග ඉවත් කරයි. අක්රියව තිබීමෙන් ඓතිහාසික ලාංඡන රීතිය තබා ගනී.                                                                                                                                                                                                                                                                                                      |
| `RETRY_AFTER_PROVENANCE_ENABLED`            | boolean | `false`  |                  | ඒකාබද්ධ කළ 429/503 unavailable ප්රතිචාරවලදී, නිශ්චිත අනාගත නැවත උත්සාහ කිරීමේ වේලාවක් නොදන්නා විට කෘත්රිම 1s අගයක් වෙනුවට `Retry-After` ඉවත් කරන්න, `error.retry_after_provenance` (`signal` \| `none`) එක් කරන්න, සහ combo drain මාර්ගවලට JSON සහ plain-text upstream bodies වෙතින් ගද්යමය නැවත උත්සාහ කිරීමේ ඉඟි කියවීමට ඉඩ දෙන්න. මෙම ක්ෂේත්රය දිස්වන්නේ `unavailableResponse()` මඟින් සාදන ප්රතිචාරවල පමණි; අනෙකුත් 429/503 bodies වෙනස් නොවේ.                                                                                                                 |
| `PROTECTED_PRIORITY_INFRA_502_ENABLED`      | boolean | `false`  |                  | fallback-only-on-quota-exhaustion ලෙස සලකුණු කළ `priority` සංයුක්ත ඉලක්කයක්, කෝටාව නිසා නොවන බව තහවුරු කළ හැකි හේතුවක් (සපයන්නාගේ circuit breaker විවෘත වීම, පුරෝකථන latency මඟහැරීම) නිසා සංයුක්තය නවත්වන විට, කෝටාවක් ලෙස පෙනෙන 503 වෙනුවට 502 ප්රතිචාරයක් ලබා දෙන්න. Lockout, cooldown, unavailable, exhaustion සහ concurrency-cap හේතුවෙන් සිදුවන නැවතුම් සඳහා 503 දිගටම භාවිත වේ.                                                                                                                                                                             |
| `MISTRAL_AMBIGUOUS_401_SOFT_LOCKOUT`        | boolean | `false`  |                  | සරල Mistral 401 එකක් (`{"detail":"Unauthorized"}`, පැහැදිලි සත්යාපන සංඥාවක් නොමැතිව) අවලංගු කළ යතුරක් සහ කෝටාව අවසන් වූ අවස්ථාවක් යන දෙකටම සමාන වේ. මෙය සක්රිය කළ විට, සම්බන්ධතාව `expired` ලෙස නවතා තැබීම වෙනුවට cooldown තත්ත්වයට පත් කරයි; එක් සම්බන්ධතාවකට පැයකට උපරිම වාර 3ක් පමණි. ඊළඟ වාරයේදී එය නවතා තබන බැවින්, අවලංගු කළ යතුරක් තවමත් අවසානයේ නිසි තත්ත්වයට පත් වේ. පෙරනිමියෙන් අක්රියයි: පෙර පරිදිම සෑම සරල Mistral 401 එකක්ම සම්බන්ධතාව නවතා තබයි.                                                                                                     |
| `XAI_OAUTH_LIVE_MODEL_DISCOVERY`            | boolean | `false`  |                  | ස්ථිර static seed එක වෙනුවට, OAuth bearer token එක භාවිතයෙන් `https://api.x.ai/v1/models` වෙතින් `xai-oauth` සම්බන්ධතා සඳහා සජීවී xAI මාදිලි නාමාවලිය ලබා ගන්න. පෙරනිමියෙන් අක්රියයි: `xai-oauth` කිසිදු වෙනසකින් තොරව static seed එක දිගටම සපයයි. ඕනෑම resolution දෝෂයකදී, discovery ක්රියාවලිය seed එක වෙත fallback වේ (මෙම endpoint එකේදී x.ai විසින් OAuth bearer එකක් පිළිගන්නේද යන්න තහවුරු කර නැත).                                                                                                                                                         |
| `BATCH_AND_FILE_AUTO_CLEANUP_ENABLED`       | boolean | `false`  |                  | ස්වයංක්රීය cleanup sweep එකට `OMNIROUTE_BATCH_RETENTION_DAYS` ට වඩා පැරණි terminal (completed/failed/cancelled/expired) Batch API කාර්යයන්, ඒවායේ එක් එක් පේළියට අදාළ checkpoints සමඟ මකා දැමීමටත්, තමන්ගේම `expires_at` ඉක්මවා ඇති upload කළ ගොනුවල BLOB අන්තර්ගතය හිස් කිරීමටත් ඉඩ දෙන්න. පෙරනිමියෙන් අක්රියයි: ක්රියාකරු මෙය සක්රිය කරන තෙක් දැනට පවතින සෑම ස්ථාපනයක්ම මෙම දත්ත පෙර පරිදිම තබා ගනී. ක්රියාකරු විසින් ආරම්භ කරන `DELETE /api/v1/batches/delete-completed` route එක කුමන අවස්ථාවකවත් බලපෑමට ලක් නොවේ — එය වෙනම, කොන්දේසි රහිත පොදු API ගිවිසුමකි. |

### CLI (5)

| යතුර                                  | වර්ගය   | පෙරනිමිය | නැවත ආරම්භය | විස්තරය                                                                                                                                                                                                                  |
| ------------------------------------- | ------- | -------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `CLI_COMPAT_ALL`                      | boolean | `false`  | ✓           | සියලුම CLI clients සඳහා compatibility mode එක සක්රිය කරන්න.                                                                                                                                                              |
| `MODEL_ALIAS_COMPAT_ENABLED`          | boolean | `false`  |             | model alias compatibility layer එක සක්රිය කරන්න.                                                                                                                                                                         |
| `PRICING_SYNC_ENABLED`                | boolean | `false`  |             | pricing දත්ත ස්වයංක්රීයව සමමුහුර්ත කිරීම සක්රිය කරන්න (`PRICING_SYNC_ENABLED` environment variable එකද අවශ්ය වේ).                                                                                                        |
| `OMNIROUTE_AUTO_SYNC_CODEX_PROFILES`  | boolean | `false`  |             | provider model sync එකකින් පසුව, සජීවී නාමාවලියෙන් ~/.codex/*.config.toml profile ගොනු ස්වයංක්රීයව (නැවත) ලියන්න. සක්රිය/පෙරනිමි Codex config එක කිසිවිටෙක වෙනස් නොකරයි. පෙරනිමියෙන් අක්රියයි.                           |
| `OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES` | boolean | `false`  |             | provider model sync එකකින් පසුව, සජීවී නාමාවලියෙන් ~/.claude/profiles/<name>/settings.json Claude Code profiles ස්වයංක්රීයව (නැවත) ලියන්න. සක්රිය/පෙරනිමි Claude config එක කිසිවිටෙක වෙනස් නොකරයි. පෙරනිමියෙන් අක්රියයි. |

### සෞඛ්යය (5)

| යතුර                                      | වර්ගය   | පෙරනිමිය | විස්තරය                                                                                                                                                                                                                                                                                                                                      |
| ----------------------------------------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK`     | boolean | `false`  | දේශීය අවස්ථාවේ සෞඛ්ය පරීක්ෂණ අන්ත ලක්ෂ්යය අක්රිය කරන්න.                                                                                                                                                                                                                                                                                      |
| `OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK`     | boolean | `false`  | ටෝකන වලංගුකරණ සෞඛ්ය පරීක්ෂාව අක්රිය කරන්න.                                                                                                                                                                                                                                                                                                   |
| `SKILLS_SANDBOX_NETWORK_ENABLED`          | boolean | `false`  | කුසලතා සෑන්ඩ්බොක්ස් පරිසරය තුළ ජාල ප්රවේශය සක්රිය කරන්න.                                                                                                                                                                                                                                                                                     |
| `PROXY_HEALTH_BLOCKED_RESETS_STREAK`      | boolean | `false`  | ප්රොක්සි සෞඛ්ය පිරික්සුමේදී, ඉලක්කය විසින් ප්රතික්ෂේප කළ (401/403/429) පරීක්ෂණයක් ප්රොක්සියේ අඛණ්ඩ අසාර්ථකත්ව පෙළ යළි සකසයි. පෙරනිමියෙන් අක්රියයි: ප්රතික්ෂේප කිරීමක් මධ්යස්ථව පවතී (#10654). 5xx ප්රතිචාරයක් කෙසේ වුවද අවිනිශ්චිතව පවතී; ප්රතික්ෂේප කිරීමක් කිසිවිටෙක ප්රොක්සියක් ඉවත් කිරීම, අක්රිය කිරීම හෝ යළි සක්රිය කිරීම සිදු නොකරයි. |
| `DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED` | boolean | `false`  | ආරම්භය සම්පූර්ණ වන තෙක් අවහිර කිරීම වෙනුවට, සේවාදායකය ඉල්ලීම් පිළිගැනීම ආරම්භ කළ පසු (`setImmediate` හරහා) ආරම්භක DB අඛණ්ඩතා/සෞඛ්ය පරීක්ෂාව ක්රියාත්මක කරන්න (#13717). පෙරනිමියෙන් අක්රියයි: මෙම PR එකට පෙර පැවති ආකාරයටම ආරම්භය අවහිර වේ.                                                                                                   |

> [!NOTE]
> `INPUT_SANITIZER_BLOCK_THRESHOLD` සහ එහි පැරණි අන්වර්ථ නාමය වන
> `INJECTION_GUARD_BLOCK_THRESHOLD`, `INJECTION_GUARD_MODE` හි `block` ප්රකාරය
> සීරුමාරු කරයි. එහෙත් ඒවා
> [`src/shared/utils/injectionSeverity.ts`](../../src/shared/utils/injectionSeverity.ts)
> මඟින් කියවනු ලබන සාමාන්ය පරිසර විචල්යයන් වන අතර, විශේෂාංග ධජ නොවේ: ඒවාට DB
> අතික්රමණයක් හෝ උපකරණ පුවරු ටොගලයක් නොමැත. බලන්න
> [`ENVIRONMENT.md`](./ENVIRONMENT.md#4-security--authentication).

> [!NOTE]
> `Restart` තීරුව `requiresRestart: true` සහිත ධජ සලකුණු කරයි — අගය
> ක්ෂණිකව සුරැකෙන නමුත් ක්රියාවලිය යළි පූරණය වූ පසුව පමණක් ක්රියාත්මක වේ. Enum
> ධජ තම අවසර ලත් කට්ටලයෙන් පිටත ඕනෑම අගයක් ප්රතික්ෂේප කරයි (සේවාදායක පාර්ශ්වයේ
> `setFeatureFlagOverride()` සහ REST `PUT` හසුරුවනය යන දෙකෙහිම වලංගු කෙරේ).

---

## ධජ ටොගල් කිරීම

### උපකරණ පුවරුව

**උපකරණ පුවරුව → සැකසුම් → විශේෂාංග ධජ** වෙත යන්න
(`/dashboard/settings/feature-flags`). ජාලකය
(`src/app/(dashboard)/dashboard/settings/components/FeatureFlagsGrid.tsx`)
පහත දෑ සඳහා සහය දක්වයි:

- යතුර හෝ විස්තරය අනුව **සෙවීම**, සහ ප්රවර්ගය අනුව **පෙරීම** (ඊට අමතරව කෘත්රිම
  **නැවත ආරම්භ කිරීම අවශ්යයි** දසුනක්).
- බූලියානු ධජ සඳහා **ටොගලයක්** සහ enum ධජ සඳහා **පතන ලැයිස්තුවක්**
  (`src/app/(dashboard)/dashboard/settings/components/FeatureFlagCard.tsx`).
- සෑම ධජයක් සඳහාම — `DB`, `ENV`, හෝ `DEF` — ඵලදායී අගය පැමිණියේ කොතැනින්දැයි පෙන්වන
  **මූලාශ්ර ලාංඡනයක්**.
- අතික්රමණය ඉවත් කිරීම සඳහා **යළි සකසන්න** බොත්තමක් (`DB` මූලාශ්ර කරගත් ධජ සඳහා පමණක් පෙන්වයි),
  සහ පහළින් **සියලු අතික්රමණ යළි සකසන්න** බොත්තමක්.
- `requiresRestart` ධජයක් වෙනස් කළ විට **සේවාදායකය නැවත ආරම්භ කරන්න** බැනරයක්.

### REST API

සියලු මෙහෙයුම් තනි මාර්ගයක් හරහා සිදු වේ:
[`src/app/api/settings/feature-flags/route.ts`](../../src/app/api/settings/feature-flags/route.ts).
සෑම ක්රමයකටම සත්යාපනය කළ උපකරණ පුවරු සැසියක් අවශ්ය වේ (එසේ නොමැතිනම් `401`).

#### `GET /api/settings/feature-flags`

සෑම ධජයක්ම එහි ඵලදායී අගය, මූලාශ්රය සහ සාරාංශයක් සමඟ ආපසු ලබා දෙයි.

```jsonc
{
  "flags": [
    {
      "key": "REQUIRE_API_KEY",
      "label": "API යතුර අවශ්යයි",
      "description": "පැමිණෙන සියලු ඉල්ලීම් සඳහා API යතුරක් අවශ්ය කරන්න",
      "category": "security",
      "type": "boolean",
      "enumValues": null,
      "defaultValue": "false",
      "effectiveValue": "false",
      "source": "default", // "db" | "env" | "default"
      "requiresRestart": false,
      "warningLevel": "caution",
    },
    // ... ධජ 72 සියල්ල
  ],
  "summary": {
    "total": 56,
    "active": 0,
    "inactive": 0,
    "overriddenByDb": 0,
    "overriddenByEnv": 0,
  },
}
```

#### `PUT /api/settings/feature-flags`

තනි අතික්රමණයක් සකසන්න හෝ ඉවත් කරන්න. අන්තර්ගතය: `{ key: string; value?: string }`.
`value` මඟ හැරීමෙන් අතික්රමණය ඉවත් වේ (env / පෙරනිමිය ප්රතිස්ථාපනය කරමින්).

```bash
# DB අතික්රමණයක් සකසන්න
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY","value":"true"}'

# අතික්රමණය ඉවත් කරන්න ("value" නොමැතිව)
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY"}'
```

ප්රතිචාරය නව `effectiveValue`/`source`, `previousValue`/
`previousSource`, සහ `requiresRestart` ආපසු දක්වයි. නොදන්නා යතුරු සහ පරාසයෙන් බැහැර enum
අගයන් `400` සමඟ ප්රතික්ෂේප කෙරේ.

#### `DELETE /api/settings/feature-flags`

සියලුම DB අතික්රමණ එකවර ඉවත් කර, සෑම ධජයක්ම එහි env / පෙරනිමි
අගයට ප්රතිස්ථාපනය කරයි. `{ cleared: <count>, message: "..." }` ආපසු ලබා දෙයි.

> [!NOTE]
> `requiresRestart: true` සහිත ධජ ක්රියාත්මක වන්නේ ක්රියාවලිය නැවත පූරණය කිරීමෙන් පසුව පමණි.
> උපකරණ පුවරුවේ නැවත ආරම්භ කිරීමේ ප්රවාහය `POST /api/restart` අමතා, අනතුරුව සේවාදායකය නැවත ක්රියාත්මක වන තෙක්
> `GET /api/health/ping` විමසයි.

---

## හදිසි අයවැය උපස්ථය

`OMNIROUTE_EMERGENCY_FALLBACK` (`runtime` ප්රවර්ගය, පෙරනිමිය `true`) මඟින්
[`open-sse/services/emergencyFallback.ts`](../../open-sse/services/emergencyFallback.ts)
හි හදිසි නොමිලේ-උපස්ථ මාර්ගය පාලනය කරයි.
එය සබල කර ඇති විට, තම අයවැය අවසන් කරන ඉල්ලීම් සම්පූර්ණයෙන්ම අසාර්ථක කිරීම වෙනුවට නොමිලේ උපස්ථ
සපයන්නෙකු/ආකෘතියක් වෙත මාර්ගගත කෙරේ. මෙම හැසිරීම අබල කිරීමට සහ අයවැය අවසන් වූ ඉල්ලීම්
අසාර්ථක වීමට ඉඩ දීමට — උපකරණ පුවරුවේ ටොගලය, DB අතික්රමණයක්, හෝ
`OMNIROUTE_EMERGENCY_FALLBACK` පරිසර විචල්යය හරහා — එය `false` (හෝ `0`) ලෙස සකසන්න.
(PR #3741 / #3752 හි උපකරණ පුවරු ටොගලයක් ලෙස ඉදිරිපත් කර ඇත.)

---

## මෙයද බලන්න

- [පරිසර විචල්ය යොමුව](./ENVIRONMENT.md) — බොහෝ flags සඳහා එම නමින්ම ඇති
  පරිසර විචල්යයක් එහි ලේඛනගත කර ඇත (DB override එකට එයට වඩා
  ප්රමුඛතාව හිමි වේ).
- [`src/shared/constants/featureFlagDefinitions.ts`](../../src/shared/constants/featureFlagDefinitions.ts)
  — සෑම flag එකක් සඳහාම සත්යයේ මූලාශ්රය.
- [`src/shared/utils/featureFlags.ts`](../../src/shared/utils/featureFlags.ts)
  — නිරාකරණ තර්කනය (`resolveFeatureFlag`, `isFeatureFlagEnabled`,
  `resolveAllFeatureFlags`).
- [`src/lib/db/featureFlags.ts`](../../src/lib/db/featureFlags.ts) — `key_value` වගුවේ
  `feature_flags` නාමාවකාශය තුළ DB override ස්ථායීව ගබඩා කිරීම.
