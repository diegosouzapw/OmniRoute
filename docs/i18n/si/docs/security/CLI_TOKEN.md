# CLI Machine-ID Token (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇧🇦 [bs](../../../bs/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## දළ විශ්ලේෂණය

OmniRoute CLI විධාන, `x-omniroute-cli-token` ඉල්ලීම් ශීර්ෂකය හරහා යවන
`HMAC-SHA256(machine-id, salt)` ටෝකනයක් භාවිත කරමින් දේශීය කළමනාකරණ API වෙත
සත්යාපනය වේ.

මෙය, සෑම ක්රියාත්මක කිරීමකදීම පරිශීලකයාට JWT එකක් හෝ මුරපදයක් සැපයීමට අවශ්ය
නොවී, CLI උපවිධානවලට (`omniroute status`, `omniroute providers`, ආදිය)
කළමනාකරණ අන්ත ලක්ෂ්ය ඇමතීමට ඉඩ සලසයි.

## එය ක්රියා කරන ආකාරය

1. `getMachineTokenSync()` විසින් `node-machine-id` හරහා දෘඩාංග යන්ත්ර ID එක
   කියවයි (අසාර්ථක වුවහොත් හිස් තන්තුවක් භාවිත කරමින් CLI සත්යාපනය අක්රිය කරයි).
2. එය `HMAC-SHA256(machine_id, salt)` ගණනය කර සම්පූර්ණ අක්ෂර 64ක
   ෂඩ්දශම ඩයිජෙස්ට් එක ආපසු ලබා දෙයි — මෙම යන්ත්රයට බැඳුණු, නියත හා
   ප්රතිවර්තනය කළ නොහැකි ටෝකනයකි.
3. නිරාකරණය කළ ගමනාන්තය පැහැදිලි loopback URL එකක් (`localhost`,
   `127.0.0.0/8`, හෝ loopback IPv6) වන විට පමණක් CLI විසින් ටෝකනය
   `x-omniroute-cli-token` ලෙස යවයි. ටෝකනය රැගත් ඉල්ලීම් `redirect: error`
   භාවිත කරන බැවින්, දේශීය යළි-යොමු කිරීමකට එය වෙනත් origin එකකට යැවිය
   නොහැක. දුරස්ථ contexts ඒ වෙනුවට විෂයපථගත ප්රවේශ ටෝකන භාවිත කරයි.
   ව්යුත්පන්න කිරීම ලබාගත නොහැකි නම්, CLI ශීර්ෂකය අත්හරින අතර හිස් ටෝකනයක්
   වලංගු ලෙස සැලකීම වෙනුවට `omniroute doctor` විසින් අසාර්ථකත්වය වාර්තා කරයි.
4. සේවාදායකය (`src/server/authz/policies/management.ts`) එකම salt භාවිතයෙන්
   අපේක්ෂිත ටෝකනය නැවත ගණනය කර, කාලය මත පදනම් වූ උකහා ගැනීම වැළැක්වීම සඳහා
   `timingSafeEqual` හරහා සංසන්දනය කරයි.

## ආරක්ෂක ගුණාංග

| ගුණාංගය                            | විස්තරය                                                                                                                                                                                                                           |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Loopback සඳහා පමණි**             | සේවාදායකයේ විශ්වාසදායක peer-locality මුද්රාව (සැබෑ TCP peer ලිපිනයෙන් ව්යුත්පන්න කරන ලද) loopback බව දක්වන විට පමණක් පිළිගනු ලැබේ. locality තීරණය කිරීම සඳහා සේවාලාභියා විසින් පාලනය කරන `Host` ශීර්ෂකය කිසිවිටෙක විශ්වාස නොකෙරේ. |
| **නියත-කාල සංසන්දනය**              | `crypto.timingSafeEqual` කාල-පාදක ප්රහාර වළක්වයි.                                                                                                                                                                                 |
| **ප්රතිවර්තනය කළ නොහැකි**          | HMAC ප්රතිදානයෙන් machine-id එක ප්රතිසාධනය කළ නොහැක.                                                                                                                                                                              |
| **`always`-ආරක්ෂිත මඟහැරීමක් නැත** | CLI ටෝකන පරීක්ෂාවට පෙර `isAlwaysProtectedPath()` ඇගයීමට ලක් කෙරේ. `/api/shutdown` සහ `/api/settings/database` සඳහා සැමවිටම JWT අවශ්ය වේ.                                                                                          |
| **නිර්යාත කළ නොහැකි**              | ටෝකනය කිසිවිටෙක තැටියට ලියනු හෝ ලොග් කරනු නොලැබේ.                                                                                                                                                                                 |

## පෙරනිමි salt (සෑම ස්ථාපනයකටම අහඹු)

`OMNIROUTE_CLI_SALT` සකසා නොමැති විට, salt යනු එක් වරක් ජනනය කර
`<DATA_DIR>/cli-token-salt.json` හි (`0600` ප්රකාරයෙන්) ස්ථිරව සුරකින අහඹු
අක්ෂර 64ක ෂඩ්දශම තන්තුවකි — එය repository එකට ඇතුළත් කර ඇති
`omniroute-cli-auth-v1` ලිටරලය නොවේ. `src/lib/machineToken.ts` හි
`getActiveSalt()` සහ `bin/cli/utils/cliToken.mjs` හි එහි අනුරුව යන දෙකම එකම
ගොනුව කියවන බැවින්, සේවාදායකය සහ මෙම ස්ථාපනයේ සෑම CLI ක්රියාත්මක කිරීමක්ම එකම
අගයට අභිසාරී වේ; repository එකට ඇතුළත් කර ඇති ලිටරලය භාවිත කරන්නේ තවමත්
ස්ථිරව සුරැකි හෝ env salt එකක් ස්ථාපිත කළ නොහැකි විට අවසාන විකල්පයක් ලෙස
පමණි (උදාහරණයක් ලෙස, සේවාදායකය කිසිදා ක්රියාත්මක කර නොමැති නව CLI-පමණක්
ස්ථාපනයකදී). මෙය පැරණි ස්ථාවර ලිටරල් පෙරනිමියේ දුර්වලතාවක් වසා දමයි:
`/etc/machine-id` සාමාන්යයෙන් සියලු පරිශීලකයන්ට කියවිය හැකි බැවින්, එසේ
නොවුවහොත් ඕනෑම දේශීය පරිශීලකයෙකුට `OMNIROUTE_CLI_SALT` කිසිදා සකසා නොමැති
සෑම ස්ථාපනයක් සඳහාම එකම ටෝකනය ව්යුත්පන්න කළ හැක.

## Salt මාරු කිරීම

කේත වෙනස්කම් නොමැතිව ව්යුත්පන්න token එක මාරු කිරීමට `OMNIROUTE_CLI_SALT` සකසන්න — එයට සැමවිටම ස්ථාපනයකට අදාළව සුරැකී ඇති salt එකට වඩා ප්රමුඛත්වය ලැබේ. මාරු කිරීමෙන් පසු, මෙම යන්ත්රයේ සියලුම CLI ක්රියාවලි නව token එක ස්වයංක්රීයව භාවිත කරනු ඇත. පෙර ව්යුත්පන්න කළ අගය නිරාවරණය වීමට ඉඩ තිබූ ක්රියාවලි-ලැයිස්තු කාන්දුවකින් පසු මෙය ප්රයෝජනවත් වේ.

```bash
# ස්ථිර මාරු කිරීම (shell profile එකට එක් කරන්න)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# නව token එක භාවිත වන බව තහවුරු කරන්න
omniroute status
```

## පැරණි ආකෘතිය (SHA-256, අක්ෂර 32) — තවමත් පිළිගනු ලැබේ

ඉහත HMAC ආකෘතියට පෙර, CLI එක සිය token එක
`SHA-256(machineId + salt).hex[0..32]` (`bin/cli/utils/cliToken.mjs` තුළ ඇති අක්ෂර 32ක උපසර්ගයක්) ලෙස ව්යුත්පන්න කළේය (`src/lib/machineToken.ts` තුළ `getLegacyCliTokenSync`).

පසුගාමී අනුකූලතාව සඳහා සේවාදායකය ආකෘති **දෙකම** පිළිගනී: සත්යාපකය
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` ගොඩනඟා, ලැබෙන header එක එක් එක් අගය සමඟ `timingSafeEqual` භාවිතයෙන් සසඳයි
(`src/server/authz/policies/management.ts` සහ `src/lib/middleware/cliTokenAuth.ts`).
එබැවින් token එකක් අක්ෂර 64ක HMAC digest එකට **හෝ** අක්ෂර 32ක පැරණි SHA-256 උපසර්ගයට ගැළපේ නම් එය වලංගු වේ.

**ඉවත් වීම:** CLI token යාන්ත්රණය සම්පූර්ණයෙන්ම අක්රිය කිරීමට `OMNIROUTE_DISABLE_CLI_TOKEN=true` (env හෝ `.env`) සකසන්න; ඉන්පසු සියලුම ප්රවේශ සඳහා පැහැදිලි API key එකක් අවශ්ය වේ. බහු-පරිශීලක host වලදී මෙය නිර්දේශ කෙරේ, මන්ද `machine-id` එක පරිශීලකයෙකුට නොව උපාංගයකට අදාළ වන අතර, එම host එකේ වෙනත් පරිශීලකයෙකුටද එම token එකම ගණනය කළ හැකි බැවිනි.

## ගොනු

| ගොනුව                                     | අරමුණ                                          |
| ----------------------------------------- | ---------------------------------------------- |
| `src/lib/machineToken.ts`                 | Token ව්යුත්පන්න කිරීම (`getMachineTokenSync`) |
| `bin/cli/utils/cliToken.mjs`              | එම ව්යුත්පන්නයේ CLI-පාර්ශ්වීය පිටපත            |
| `<DATA_DIR>/cli-token-salt.json`          | ස්ථාපනයකට අදාළව සුරැකෙන අහඹු salt එක           |
| `src/server/authz/headers.ts`             | `CLI_TOKEN_HEADER` නියතය                       |
| `src/server/authz/policies/management.ts` | සේවාදායක-පාර්ශ්වීය සත්යාපනය                    |
| `src/server/authz/routeGuard.ts`          | Loopback host පරීක්ෂාව (`isLoopbackHost`)      |

## මෙයද බලන්න

- `docs/security/ROUTE_GUARD_TIERS.md` — route ආරක්ෂණ මට්ටම්
- `docs/architecture/AUTHZ_GUIDE.md` — සම්පූර්ණ අවසර දීමේ pipeline එක
