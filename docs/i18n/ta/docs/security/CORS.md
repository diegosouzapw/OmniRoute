# CORS Configuration & Security (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute, ஒரே மையப்படுத்தப்பட்ட அனுமதிப் பட்டியலிலிருந்து எந்த **உலாவி origins** குறுக்கு-origin பதில்களைப் படிக்கலாம் என்பதைக் கட்டுப்படுத்துகிறது. இந்த மாதிரி **இயல்பாகவே fail-closed**:
நீங்கள் வெளிப்படையாக அனுமதிக்கும் வரை எந்த origin-மும் அனுமதிக்கப்படாது. அனுமதிப் பட்டியல் எவ்வாறு
தீர்மானிக்கப்படுகிறது, `CORS_ALLOW_ALL=true` உண்மையில் எவற்றை வெளிப்படுத்துகிறது (மேலும், முக்கியமாக, எவற்றை
வெளிப்படுத்துவதில்லை), மேம்பாட்டு மற்றும் production சூழல்களை எவ்வாறு பாதுகாப்பாக உள்ளமைப்பது, wildcard செயல்பாட்டில்
இருக்கும்போது dashboard காட்டும் runtime எச்சரிக்கை ஆகியவற்றை இந்தப் பக்கம் விளக்குகிறது.

**அதிகாரப்பூர்வ மூலம்:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). அனுமதிப் பட்டியல் middleware-இல்
(`src/server/authz/pipeline.ts`) ஒருமுறை பயன்படுத்தப்படுகிறது — ஒவ்வொரு route-க்குமான handlers தாங்களாகவே
`Access-Control-Allow-Origin`-ஐ அமைப்பதில்லை.

## Origin எவ்வாறு தீர்மானிக்கப்படுகிறது

ஒவ்வொரு request-க்கும் middleware, `Access-Control-Allow-Origin` மதிப்பை
பின்வரும் வரிசையில் கணக்கிடுகிறது:

1. **`CORS_ALLOW_ALL=true`** (அல்லது பழைய `CORS_ORIGIN=*`) → அழைப்பவரின்
   `Origin`-ஐ அப்படியே திருப்பி அனுப்பும் (`Origin` header இல்லாதபோது `*`), மேலும் caches சரியாகச் செயல்பட
   `Vary: Origin`-ஐச் சேர்க்கும். இதே `applyCorsHeaders()` chokepoint,
   token மூலம் அங்கீகரிக்கப்பட்ட `/v1*`/`/v1beta*` surface-இல் body கொண்ட ஒவ்வொரு 2xx response-க்கும்
   `Vary: Accept-Encoding`-ஐச் சேர்க்கிறது (`relaxForTokenAuth`, RFC 9110 §12.5.5, issue #6737); இதனால்
   downstream/shared caches, compressed மற்றும் uncompressed
   variants-ஐச் சரியாக வேறுபடுத்த முடியும்.
2. இல்லையெனில், request-இன் `Origin` இயல்பாக்கப்பட்டு (lower-case ஆக மாற்றப்பட்டு, இறுதியிலுள்ள slash
   நீக்கப்பட்டு), **ஒன்றிணைக்கப்பட்ட அனுமதிப் பட்டியலுடன்** பொருத்திப் பார்க்கப்படும்:
   - env **`CORS_ALLOWED_ORIGINS`** — comma மூலம் பிரிக்கப்பட்ட பட்டியல், மற்றும்
   - runtime **`corsOrigins`** அமைப்பு (Dashboard → Security → _CORS Allowed
     Origins_), இது `src/lib/config/runtimeSettings.ts`-இலிருந்து
     `setRuntimeAllowedOrigins()` வழியாகச் செலுத்தப்படுகிறது.
3. பொருத்தம் இல்லை → **`Access-Control-Allow-Origin` header எதுவும் அனுப்பப்படாது**. உலாவி
   குறுக்கு-origin வாசிப்பைத் தடுக்கிறது. இதுவே நோக்கமுடைய fail-closed இயல்புநிலை.

| Env var                | பொருள்                                                                                            |
| ---------------------- | ------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | அனுமதிக்க வேண்டிய சரியான origins-களின் CSV (பரிந்துரைக்கப்படுகிறது).                              |
| `CORS_ALLOW_ALL`       | `true`/`1` → எந்த origin-ஐயும் அப்படியே திருப்பி அனுப்பும் (wildcard). Dev-க்கு மட்டும்.          |
| `CORS_ORIGIN`          | பழையது. `*`, `CORS_ALLOW_ALL` போலச் செயல்படும்; ஒற்றை மதிப்பு அனுமதிப் பட்டியலில் சேர்க்கப்படும். |

## அச்சுறுத்தல் மாதிரி — `CORS_ALLOW_ALL=true` உண்மையில் எவற்றை வெளிப்படுத்துகிறது

பொதுவான OWASP எச்சரிக்கையை ("wildcard CORS = எந்தத் தளமும் உங்கள் API-ஐ அழைக்கலாம்") தீவிரமாகக்
கருதுவது அவசியம். ஆனால், ஒரு குறிப்பிட்ட செயலாக்க உண்மையின் காரணமாக OmniRoute-இன் exposure
**பொதுவான சூழலைவிடக் குறுகியது**:

> **மைய `applyCorsHeaders()` ஒருபோதும்
> `Access-Control-Allow-Credentials`-ஐ அனுப்புவதில்லை.** Server
> `Access-Control-Allow-Credentials: true`-ஐ அனுப்பாத வரை, ஒரு _credentialed_
> (cookie கொண்ட) குறுக்கு-origin response-ஐ உலாவி வெளிப்படுத்தாது. OmniRoute-இன் பகிரப்பட்ட CORS பாதை
> இதை ஒருபோதும் செய்வதில்லை.

`CORS_ALLOW_ALL=true` இருந்தாலும்கூட, ஒவ்வொரு surface-க்கும் இதன் பொருள்:

| Surface                           | அங்கீகார முறை               | Wildcard CORS-இன் விளைவு                                                                                                                                                                                                                                                        |
| --------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard / MANAGEMENT `/api/*`   | Cookie session              | Origin அப்படியே திருப்பி அனுப்பப்படும்; ஆனால் **`Allow-Credentials` இல்லாததால்**, credentialed read-ஐ உலாவி **தடுக்கிறது**. தீங்கிழைக்கும் குறுக்கு-origin தளம், அங்கீகரிக்கப்பட்ட உங்கள் dashboard responses-ஐப் **படிக்க முடியாது**; session cookie-யும் வெளிப்படுத்தப்படாது. |
| Client API `/v1/*`, `/v1beta/*`   | Bearer / `x-api-key` header | ஏற்கனவே **வடிவமைப்பின்படியே** அனுமதிப்பானது (`relaxForTokenAuth`): உலாவிகள் `Authorization`/`x-api-key`-ஐத் தானாக இணைப்பதில்லை; எனவே தாக்குபவரின் பக்கத்தால் உங்கள் key-ஐ வழங்க முடியாது. `CORS_ALLOW_ALL` இதன் அணுகலை விரிவுபடுத்தாது.                                         |
| பொது read-only (`/api/health`, …) | எதுவுமில்லை                 | உணர்திறன் மிக்கதல்ல; wildcard பாதிப்பற்றது.                                                                                                                                                                                                                                     |

எனவே, `CORS_ALLOW_ALL=true`-இன் **எஞ்சியுள்ள** exposure பின்வருவனவற்றுக்கு மட்டுமே வரையறுக்கப்படுகிறது: (a)
ஏற்கனவே அங்கீகாரம் தேவையில்லாத தரவின் credential இல்லாத குறுக்கு-origin **வாசிப்புகள்**, மற்றும் (b)
management routes-இல் CORS **preflight-ஐ அனுமதித்தல்** — இவற்றுக்கு இன்னும் அங்கீகாரம் தேவைப்படுகிறது;
அதை ஒரு குறுக்கு-origin பக்கத்தால் வழங்க முடியாது. பகிரப்பட்ட CORS பாதையில் இது session-hijack அல்லது
credential-theft vector **அல்ல**.

### ஒரு உண்மையான விதிவிலக்கு — `/api/v1/agents/`

Cloud-Agent routes (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) தங்களுக்கான
CORS headers-ஐத் **தாங்களே** அமைக்கின்றன
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`), மேலும்
`Access-Control-Allow-Origin: <origin>|*` உடன்
`Access-Control-Allow-Credentials: true`-ஐயும் **அனுப்புகின்றன**. Origin-ஐத் திருப்பி அனுப்புவதும் credentials-உம்
ஒன்றாக இருக்கும் ஒரே surface இதுதான்; மேலும் இது
`CORS_ALLOW_ALL`-இலிருந்து **சுயாதீனமானது**. இந்த routes management அங்கீகாரத்தைக் கொண்டவை
(`requireManagementAuth`); dashboard-ஐ host-க்கு வெளியே வெளிப்படுத்தும் operators,
response headers மூலம் குறுக்கு-origin credentialed read அனுமதிக்கப்படும் ஒரே இடம் இதுதான் என்பதை
அறிந்திருக்க வேண்டும். இதை வெளிப்படையான அனுமதிப் பட்டியலுக்குக் கட்டுப்படுத்துவது,
இந்த CORS வழிகாட்டுதலிலிருந்து தனியாகக் கண்காணிக்கப்படுகிறது.

## உற்பத்திச் சரிபார்ப்புப் பட்டியல்

- **உற்பத்திச் சூழலில் ஒருபோதும் `CORS_ALLOW_ALL=true` என அமைக்க வேண்டாம்.** அதை அமைக்காமல் விடவும்.
- ஒரு **வெளிப்படையான** origin பட்டியலை அமைக்கவும் — env var அல்லது Security தாவல் புலம் ஆகியவற்றில் ஏதேனும் ஒன்றைப் பயன்படுத்தவும்:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- OmniRoute ஒரு reverse proxy / tunnel-க்குப் பின்னால் (nginx, Caddy, Cloudflare
  Tunnel, Tailscale) இயங்கினால், CORS மட்டுமே உங்கள் ஒரே கட்டுப்பாடு **அல்ல** — loopback route
  guard, spawn செய்யக்கூடிய routes-ஐத் தொடர்ந்து பாதுகாக்கிறது ([ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)
  ஐப் பார்க்கவும்). 403 பிழையை "சரிசெய்ய" `X-Forwarded-For: 127.0.0.1` ஐப் போலியாக
  அமைக்க வேண்டாம்; அவ்வாறு செய்வது route guard மூடியுள்ள RCE வகையை மீண்டும் திறக்கும்.
- runtime நிலையை உறுதிப்படுத்தவும்: `CORS_ALLOW_ALL=true` செயல்பாட்டில் இருக்கும்போதெல்லாம்,
  Dashboard → Security → Authorization Inventory என்பதன் கீழ் dashboard ஒரு **நிரந்தர amber banner**
  ஐக் காட்டும்; மேலும் கண்காணிப்புக் கருவிகள் poll செய்யக்கூடிய
  `cors: { allowAll, allowedOrigins }` envelope-ஐ `/api/settings/authz-inventory` வழங்கும்.

## உருவாக்கச் சூழலுக்கான வசதி — குறிப்பிட்ட local origins-ஐ அனுமதித்தல்

உருவாக்கச் சூழலில்கூட wildcard அரிதாகவே தேவைப்படும். நீங்கள் பயன்படுத்தும் dev servers-ஐ மட்டும் அனுமதிக்கவும்:

```bash
# local OmniRoute-ஐ அழைக்கும் Vite (5173) + Next.js (3000) dev servers
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Origins, எழுத்து வகை வேறுபாட்டைப் பொருட்படுத்தாமல், இறுதியிலுள்ள slash புறக்கணிக்கப்பட்டு ஒப்பிடப்படுகின்றன; எனவே
`http://localhost:3000` மற்றும் `http://localhost:3000/` ஆகியவை சமமானவை. அதே CSV-ஐ
restart செய்யாமல், runtime-இல் **Dashboard → Security → CORS Allowed Origins** என்பதில்
அமைக்கலாம்.

## API keys மற்றும் cookie sessions

- **Bearer / `x-api-key` (`/v1/*` inference surface):** browsers இவற்றை ஒருபோதும்
  தானாக இணைப்பதில்லை. இங்கு CORS ஒரு பொருத்தமான தடையல்ல — API key-தான்
  தடை — அதனால்தான் browser மற்றும் Electron clients தங்களுக்கு ஏற்கெனவே அனுமதி உள்ள
  responses-ஐப் படிக்கக்கூடிய வகையில் அந்த surface வேண்டுமென்றே permissive ஆக உள்ளது.
- **Cookie session (dashboard):** fail-closed இயல்புநிலையாலும் **மற்றும்**
  பகிரப்பட்ட path-இல் `Access-Control-Allow-Credentials` இல்லாததாலும் பாதுகாக்கப்படுகிறது. எந்தவொரு
  permissive config-இலும் management/dashboard origins-ஐச் சேர்க்க வேண்டாம்; அவை கண்டிப்பாக
  fail-closed ஆகவே இருக்க வேண்டும்.

## எடுத்துக்காட்டு: OmniRoute-க்கு முன்னால் reverse proxy

CORS-ஐ OmniRoute தானே செயல்படுத்துகிறது; எனவே proxy பொதுவாக `Access-Control-*`
headers-ஐச் சேர்க்கவோ மீண்டும் எழுதவோ **கூடாது** (இரட்டை headers browsers-ஐச் செயலிழக்கச் செய்யும்). TLS-ஐ
terminate செய்து forward செய்யவும் — preflight-க்கு OmniRoute பதிலளிக்கட்டும்:

```nginx
# nginx — OmniRoute-க்கு forward செய்யவும்; இங்கே Access-Control-* ஐச் செலுத்த வேண்டாம்
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # X-Forwarded-For ஐ 127.0.0.1 ஆக அமைக்க வேண்டாம் — அது loopback route guard-ஐச் செயலிழக்கச் செய்யும்.
}
```

அனுமதிக்கப்பட்ட browser origins-ஐ proxy-இல் அல்லாமல், OmniRoute-இல்
(`CORS_ALLOWED_ORIGINS` அல்லது Security தாவல்) அமைக்கவும்.

## மூலக் கோப்புகள்

| பொறுப்பு                                             | கோப்பு                                                               |
| ---------------------------------------------------- | -------------------------------------------------------------------- |
| Allowlist resolution + `getCorsStatus()`             | `src/server/cors/origins.ts`                                         |
| Middleware பயன்பாடு (உண்மையின் ஒற்றை ஆதாரம்)         | `src/server/authz/pipeline.ts`                                       |
| Settings → runtime origin injection                  | `src/lib/config/runtimeSettings.ts`                                  |
| Dashboard-க்கான runtime நிலை                         | `src/app/api/settings/authz-inventory/route.ts`                      |
| Dashboard எச்சரிக்கை banner                          | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS Allowed Origins புலம்                           | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| ஒவ்வொரு route-க்குமான Cloud-Agent CORS (விதிவிலக்கு) | `src/lib/cloudAgent/api.ts`                                          |

## மேலும் காண்க

- [வழித்தடக் காவல் அடுக்குகள்](./ROUTE_GUARD_TIERS.md) — செயல்முறைகளைத் தொடங்கக்கூடிய வழித்தடங்களுக்கான loopback அமலாக்கம்
  (தனியான, ஒன்றுக்கொன்று துணைபுரியும் கட்டுப்பாடு).
- [அங்கீகார வழிகாட்டி](../architecture/AUTHZ_GUIDE.md) — முழுமையான அங்கீகாரச் செயலாக்கத் தொடர்.
