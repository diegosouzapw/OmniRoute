# CORS Configuration & Security (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute විසින් කුමන **බ්රවුසර මූලයන්ට (browser origins)** හරස්-මූල ප්රතිචාර
කියවිය හැකිද යන්න එක් මධ්යගත අවසර ලැයිස්තුවකින් පාලනය කරයි. මෙම ආකෘතිය
**පෙරනිමියෙන් අසාර්ථක වුවහොත් වසා දැමේ (fail-closed)**: ඔබ පැහැදිලිව අවසර දෙන තෙක් කිසිදු මූලයකට
අවසර නොලැබේ. අවසර ලැයිස්තුව නිරාකරණය වන ආකාරය, `CORS_ALLOW_ALL=true` මඟින් සැබවින්ම නිරාවරණය
කරන දේ (සහ, වැදගත් ලෙස, එය **නිරාවරණය නොකරන** දේ), සංවර්ධන හා නිෂ්පාදන පරිසර ආරක්ෂිතව
වින්යාස කරන ආකාරය, සහ වයිල්ඩ්කාඩ් එකක් සක්රිය විට උපකරණ පුවරුව පෙන්වන ධාවන-කාල අනතුරු ඇඟවීම
මෙම පිටුවේ ලේඛනගත කර ඇත.

**සත්යයේ මූලාශ්රය:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). අවසර ලැයිස්තුව මිඩ්ල්වෙයාර් තුළ
(`src/server/authz/pipeline.ts`) එක් වරක් යොදනු ලැබේ — එක් එක් මාර්ගයේ හසුරුවන්නන් විසින්ම
`Access-Control-Allow-Origin` සකසන්නේ නැත.

## මූලයක් නිරාකරණය කරන ආකාරය

සෑම ඉල්ලීමක් සඳහාම මිඩ්ල්වෙයාර් විසින් `Access-Control-Allow-Origin` අගය
මෙම අනුපිළිවෙළට ගණනය කරයි:

1. **`CORS_ALLOW_ALL=true`** (හෝ පැරණි `CORS_ORIGIN=*`) → ඇමතුම්කරුගේ
   `Origin` අගය ආපසු ප්රතිරාවය කරයි (`Origin` ශීර්ෂයක් නොමැති විට `*`), සහ කෑෂ් නිවැරදිව
   පවත්වාගැනීමට `Vary: Origin` යොදයි. එම `applyCorsHeaders()` පාලන ලක්ෂ්යයම
   ටෝකන්-සත්යාපිත `/v1*`/`/v1beta*` පෘෂ්ඨයේ (`relaxForTokenAuth`, RFC 9110 §12.5.5,
   issue #6737) සෑම ප්රතිචාර-අන්තර්ගතයක් සහිත 2xx ප්රතිචාරයකටම
   `Vary: Accept-Encoding` ද එක් කරයි, එමඟින් පහළ-ධාරා/හවුල් කෑෂ්වලට සම්පීඩිත සහ
   සම්පීඩනය නොකළ ප්රභේද නිවැරදිව වෙන්කර හඳුනාගත හැක.
2. එසේ නොවේ නම්, ඉල්ලීමේ `Origin` සාමාන්යකරණය කර (කුඩා අකුරුවලට හැරවීම සහ අවසාන
   ස්ලෑෂය ඉවත් කිරීම) **ඒකාබද්ධ අවසර ලැයිස්තුවට** ගළපනු ලැබේ:
   - env **`CORS_ALLOWED_ORIGINS`** — කොමාවෙන් වෙන් කළ ලැයිස්තුවක්, සහ
   - `src/lib/config/runtimeSettings.ts` වෙතින් `setRuntimeAllowedOrigins()` හරහා
     ඇතුළත් කරන ධාවන-කාල **`corsOrigins`** සැකසුම (උපකරණ පුවරුව → ආරක්ෂාව → _CORS අවසර ලත්
     මූලයන්_).
3. ගැළපීමක් නැතිනම් → **`Access-Control-Allow-Origin` ශීර්ෂයක් නිකුත් නොකෙරේ**. බ්රවුසරය
   හරස්-මූල කියවීම අවහිර කරයි. මෙය අපේක්ෂිත පෙරනිමි fail-closed හැසිරීමයි.

| Env var                | අර්ථය                                                                                     |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | අවසර දිය යුතු නිශ්චිත මූලයන්ගේ CSV එකක් (නිර්දේශිතයි).                                    |
| `CORS_ALLOW_ALL`       | `true`/`1` → ඕනෑම මූලයක් ප්රතිරාවය කරයි (වයිල්ඩ්කාඩ්). සංවර්ධනයට පමණි.                    |
| `CORS_ORIGIN`          | පැරණි සැකසුමකි. `*` යන්න `CORS_ALLOW_ALL` ලෙස හැසිරේ; තනි අගයක් අවසර ලැයිස්තුවට එක් කෙරේ. |

## තර්ජන ආකෘතිය — `CORS_ALLOW_ALL=true` සැබවින්ම නිරාවරණය කරන දේ

සාමාන්ය OWASP අනතුරු ඇඟවීම ("වයිල්ඩ්කාඩ් CORS = ඕනෑම අඩවියකට ඔබේ API එක ඇමතිය හැක")
බැරෑරුම් ලෙස සැලකීම වටී. නමුත් එක් නිශ්චිත ක්රියාත්මක කිරීමේ කරුණක් නිසා
OmniRoute හි නිරාවරණය **සාමාන්ය අවස්ථාවට වඩා සීමිතය**:

> **මධ්යගත `applyCorsHeaders()` කිසි විටෙක
> `Access-Control-Allow-Credentials` නිකුත් නොකරයි.** සේවාදායකය
> `Access-Control-Allow-Credentials: true` නොයවන්නේ නම්, බ්රවුසරයක් _අක්තපත්ර සහිත_
> (කුකී අඩංගු) හරස්-මූල ප්රතිචාරයක් නිරාවරණය නොකරයි. OmniRoute හි හවුල් CORS මාර්ගය එය
> කිසි විටෙක නොකරයි.

`CORS_ALLOW_ALL=true` තිබුණද, එක් එක් පෘෂ්ඨය සඳහා මෙයින් අදහස් වන්නේ:

| පෘෂ්ඨය                                | සත්යාපන යාන්ත්රණය           | වයිල්ඩ්කාඩ් CORS හි බලපෑම                                                                                                                                                                                                   |
| ------------------------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| උපකරණ පුවරුව / MANAGEMENT `/api/*`    | කුකී සැසිය                  | මූලය ප්රතිරාවය කරයි, නමුත් **`Allow-Credentials` නොමැති බැවින්** බ්රවුසරය අක්තපත්ර සහිත කියවීම **අවහිර කරයි**. ද්වේෂසහගත හරස්-මූල අඩවියකට ඔබේ සත්යාපිත උපකරණ පුවරු ප්රතිචාර **කියවිය නොහැකි** අතර සැසි කුකිය නිරාවරණය නොවේ. |
| සේවාදායක API `/v1/*`, `/v1beta/*`     | Bearer / `x-api-key` ශීර්ෂය | දැනටමත් **සැලසුම අනුව** ලිහිල්ය (`relaxForTokenAuth`): බ්රවුසර කිසි විටෙක `Authorization`/`x-api-key` ස්වයංක්රීයව අමුණන්නේ නැති බැවින් ප්රහාරකයෙකුගේ පිටුවකට ඔබේ යතුර සැපයිය නොහැක. `CORS_ALLOW_ALL` මෙය පුළුල් නොකරයි.     |
| පොදු කියවීමට පමණක් (`/api/health`, …) | කිසිවක් නැත                 | සංවේදී නොවේ; වයිල්ඩ්කාඩ් එක හානිකර නොවේ.                                                                                                                                                                                    |

එබැවින් `CORS_ALLOW_ALL=true` හි **ඉතිරි** නිරාවරණය පහත දේවලට සීමා වේ: (a)
දැනටමත් සත්යාපනය අවශ්ය නොවන දත්තවල අක්තපත්ර රහිත හරස්-මූල **කියවීම්**, සහ (b)
කළමනාකරණ මාර්ගවල CORS **පූර්ව-පරීක්ෂාව සමත් වීමට** ඉඩ දීම — ඒවාට තවමත් හරස්-මූල
පිටුවකට සැපයිය නොහැකි සත්යාපනය අවශ්ය වේ. හවුල් CORS මාර්ගයේ මෙය සැසියක් පැහැරගැනීමේ හෝ
අක්තපත්ර සොරකම් කිරීමේ මාර්ගයක් **නොවේ**.

### එක් සැබෑ ව්යතිරේකයක් — `/api/v1/agents/`

Cloud-Agent මාර්ග (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) තමන්ගේම
CORS ශීර්ෂ සකසන අතර
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`),
`Access-Control-Allow-Credentials: true` සමඟ
`Access-Control-Allow-Origin: <origin>|*` ද **නිකුත් කරයි**. මූලය ප්රතිරාවය කිරීම සහ
අක්තපත්ර එකට පවතින එකම පෘෂ්ඨය මෙය වන අතර, එය
`CORS_ALLOW_ALL` වෙතින් **ස්වාධීනය**. මෙම මාර්ග කළමනාකරණ-සත්යාපිතය
(`requireManagementAuth`); සත්කාරකයෙන් පිටත උපකරණ පුවරුව නිරාවරණය කරන ක්රියාකරුවන්,
ප්රතිචාර ශීර්ෂ මඟින් හරස්-මූල අක්තපත්ර සහිත කියවීමකට අවසර දෙන එකම ස්ථානය මෙය බව
දැන සිටිය යුතුය. එය පැහැදිලි අවසර ලැයිස්තුවකට සීමා කිරීම මෙම CORS මාර්ගෝපදේශයෙන්
වෙන්ව නිරීක්ෂණය කෙරේ.

## නිෂ්පාදන පිරික්සුම් ලැයිස්තුව

- **නිෂ්පාදන පරිසරයේදී කිසිවිටෙකත් `CORS_ALLOW_ALL=true` ලෙස සකසන්න එපා.** එය සකසා නොතබන්න.
- **පැහැදිලි** origin ලැයිස්තුවක් සකසන්න — env var එක හෝ Security ටැබයේ ක්ෂේත්රය භාවිත කරන්න:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- OmniRoute reverse proxy එකක් / tunnel එකක් (nginx, Caddy, Cloudflare
  Tunnel, Tailscale) පිටුපස ක්රියාත්මක වන්නේ නම්, CORS ඔබේ එකම පාලනය **නොවේ** — loopback route
  guard එක තවමත් spawn කිරීමේ හැකියාව ඇති routes ආරක්ෂා කරයි ([ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)
  බලන්න). 403 දෝෂයක් "නිවැරදි" කිරීම සඳහා
  `X-Forwarded-For: 127.0.0.1` ව්යාජ ලෙස සකසන්න එපා; එසේ කිරීමෙන් route guard එක වසා දමන
  RCE කාණ්ඩය නැවත විවෘත වේ.
- runtime තත්ත්වය තහවුරු කරන්න: `CORS_ALLOW_ALL=true` සජීවීව පවතින සෑම විටම,
  Dashboard → Security → Authorization Inventory යටතේ dashboard එකේ **දිගටම පවතින ඇම්බර් පැහැති බැනරයක්**
  පෙන්වන අතර, monitoring tools මඟින් poll කළ හැකි
  `cors: { allowAll, allowedOrigins }` envelope එකක් `/api/settings/authz-inventory` මඟින් ආපසු ලබා දෙයි.

## සංවර්ධන පහසුව — නිශ්චිත local origins සඳහා ඉඩ දෙන්න

සංවර්ධන පරිසරයේදී පවා ඔබට wildcard එක අවශ්ය වන්නේ කලාතුරකිනි. ඔබ භාවිත කරන dev servers සඳහා පමණක් ඉඩ දෙන්න:

```bash
# local OmniRoute එකක් අමතන Vite (5173) + Next.js (3000) dev servers
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

අග ඇති slash එක නොසලකා, origins අකුරුවල විශාල/කුඩා භේදයෙන් තොරව ගැළපේ. එබැවින්
`http://localhost:3000` සහ `http://localhost:3000/` සමාන වේ. එම CSV එකම
නැවත ආරම්භ කිරීමකින් තොරව runtime හිදී **Dashboard → Security → CORS Allowed Origins** තුළ සැකසිය
හැකිය.

## API keys සහ cookie sessions අතර වෙනස

- **Bearer / `x-api-key` (`/v1/*` inference surface එක):** browsers කිසිවිටෙකත්
  මේවා ස්වයංක්රීයව අමුණන්නේ නැත. මෙහිදී CORS අර්ථවත් බාධකයක් නොවේ — බාධකය වන්නේ API key එකයි —
  ඒ නිසා browser සහ Electron clients හට දැනටමත් හිමිකම් ඇති responses කියවීමට හැකි වන පරිදි
  එම surface එක හිතාමතාම ලිහිල් කර ඇත.
- **Cookie session එක (dashboard එක):** fail-closed පෙරනිමියෙන් **සහ**
  හවුල් path එකේ `Access-Control-Allow-Credentials` නොමැති වීමෙන් ආරක්ෂා වේ.
  management/dashboard origins ඕනෑම ලිහිල් config එකකින් බැහැරව තබන්න; ඒවා නියත වශයෙන්ම
  fail-closed ලෙස පැවතිය යුතුය.

## උදාහරණය: OmniRoute ඉදිරිපස ඇති reverse proxy එකක්

CORS OmniRoute විසින්ම බලාත්මක කරන බැවින්, proxy එක සාමාන්යයෙන්
`Access-Control-*` headers එක් කිරීම හෝ නැවත ලිවීම **නොකළ යුතුය** (ද්විත්ව headers නිසා browsers ක්රියා නොකරයි).
TLS අවසන් කර forward කරන්න — preflight එකට පිළිතුරු දීමට OmniRoute වෙත ඉඩ දෙන්න:

```nginx
# nginx — OmniRoute වෙත forward කරන්න; මෙහිදී Access-Control-* ඇතුළු නොකරන්න
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # X-Forwarded-For 127.0.0.1 ලෙස සකසන්න එපා — එය loopback route guard එක අක්රිය කරයි.
}
```

අවසර දිය යුතු browser origins proxy එකේ නොව, OmniRoute තුළ (`CORS_ALLOWED_ORIGINS` හෝ
Security ටැබය) සකසන්න.

## මූලාශ්ර ගොනු

| අදාළ කරුණ                                       | ගොනුව                                                                |
| ----------------------------------------------- | -------------------------------------------------------------------- |
| Allowlist නිරාකරණය + `getCorsStatus()`          | `src/server/cors/origins.ts`                                         |
| Middleware යෙදීම (සත්යයේ එකම මූලාශ්රය)          | `src/server/authz/pipeline.ts`                                       |
| Settings → runtime origin ඇතුළත් කිරීම          | `src/lib/config/runtimeSettings.ts`                                  |
| dashboard එක සඳහා runtime තත්ත්වය               | `src/app/api/settings/authz-inventory/route.ts`                      |
| Dashboard අනතුරු ඇඟවීමේ බැනරය                   | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS Allowed Origins ක්ෂේත්රය                   | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| එක් එක් route සඳහා Cloud-Agent CORS (ව්යතිරේකය) | `src/lib/cloudAgent/api.ts`                                          |

## තවද බලන්න

- [මාර්ග ආරක්ෂක මට්ටම්](./ROUTE_GUARD_TIERS.md) — ක්රියාවලි ආරම්භ කළ හැකි මාර්ග සඳහා
  loopback බලාත්මක කිරීම (වෙනම, අනුපූරක පාලනයකි).
- [අවසර දීමේ මාර්ගෝපදේශය](../architecture/AUTHZ_GUIDE.md) — සම්පූර්ණ සත්යාපන නල මාර්ගය.
