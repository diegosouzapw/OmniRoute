# CORS Configuration & Security (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute یہ کنٹرول کرتا ہے کہ کون سے **براؤزر origins** ایک واحد، مرکزی allowlist سے cross-origin responses پڑھ سکتے ہیں۔ یہ ماڈل **بطور ڈیفالٹ fail-closed** ہے:
جب تک آپ کسی origin کو واضح طور پر شامل نہ کریں، کسی origin کو اجازت نہیں دی جاتی۔ یہ صفحہ وضاحت کرتا ہے کہ allowlist کس طرح resolve ہوتی ہے، `CORS_ALLOW_ALL=true` حقیقت میں کیا ظاہر کرتا ہے (اور، اہم طور پر، کیا **نہیں** کرتا)، dev اور production کو محفوظ طریقے سے کیسے configure کیا جائے، اور wildcard فعال ہونے پر dashboard کون سی runtime warning دکھاتا ہے۔

**حتمی مستند ماخذ:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`)۔ allowlist صرف ایک بار middleware
(`src/server/authz/pipeline.ts`) میں لاگو کی جاتی ہے — ہر route کے handlers خود
`Access-Control-Allow-Origin` سیٹ نہیں کرتے۔

## Origin کیسے resolve ہوتا ہے

ہر request کے لیے middleware درج ذیل ترتیب میں `Access-Control-Allow-Origin` کی قدر کا حساب لگاتا ہے:

1. **`CORS_ALLOW_ALL=true`** (یا پرانا `CORS_ORIGIN=*`) → caller کا
   `Origin` واپس echo کریں (یا جب `Origin` header موجود نہ ہو تو `*`)، اور ساتھ `Vary: Origin`
   تاکہ caches درست رہیں۔ یہی `applyCorsHeaders()` chokepoint
   token-authenticated `/v1*`/`/v1beta*` surface پر ہر 2xx-with-body response میں
   `Vary: Accept-Encoding` بھی شامل کرتا ہے (`relaxForTokenAuth`، RFC 9110 §12.5.5، issue #6737)، تاکہ
   downstream/shared caches compressed اور uncompressed variants کے درمیان درست طور پر فرق کر سکیں۔
2. بصورت دیگر، request کے `Origin` کو normalize کیا جاتا ہے (lower-case میں تبدیل کرکے اور آخری slash ہٹا کر) اور اسے **ضم شدہ allowlist** سے match کیا جاتا ہے:
   - env **`CORS_ALLOWED_ORIGINS`** — comma-separated فہرست، اور
   - runtime کی **`corsOrigins`** setting (Dashboard → Security → _CORS Allowed
     Origins_)، جسے `src/lib/config/runtimeSettings.ts` سے
     `setRuntimeAllowedOrigins()` کے ذریعے inject کیا جاتا ہے۔
3. کوئی match نہ ہو → **کوئی `Access-Control-Allow-Origin` header خارج نہیں کیا جاتا**۔ براؤزر
   cross-origin read کو block کر دیتا ہے۔ یہی مطلوبہ fail-closed default ہے۔

| Env var                | مطلب                                                                                               |
| ---------------------- | -------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | اجازت یافتہ exact origins کی CSV (تجویز کردہ)۔                                                     |
| `CORS_ALLOW_ALL`       | `true`/`1` → کسی بھی origin کو echo کریں (wildcard)۔ صرف dev کے لیے۔                               |
| `CORS_ORIGIN`          | پرانا طریقہ۔ `*`، `CORS_ALLOW_ALL` کی طرح کام کرتا ہے؛ ایک واحد قدر allowlist میں شامل کی جاتی ہے۔ |

## Threat model — `CORS_ALLOW_ALL=true` حقیقت میں کیا ظاہر کرتا ہے

OWASP کی عمومی تنبیہ ("wildcard CORS = کوئی بھی site آپ کی API کو call کر سکتی ہے") کو سنجیدگی سے لینا ضروری ہے، لیکن OmniRoute کا exposure **عمومی صورت سے زیادہ محدود** ہے، کیونکہ implementation کی ایک واضح حقیقت یہ ہے:

> **مرکزی `applyCorsHeaders()` کبھی بھی
> `Access-Control-Allow-Credentials` خارج نہیں کرتا۔** براؤزر کسی _credentialed_
> (cookie رکھنے والے) cross-origin response کو اس وقت تک ظاہر نہیں کرے گا جب تک server
> `Access-Control-Allow-Credentials: true` نہ بھیجے۔ OmniRoute کا مشترکہ CORS path ایسا کبھی
> نہیں کرتا۔

`CORS_ALLOW_ALL=true` کے باوجود، ہر surface کے لیے اس کا مطلب یہ ہے:

| Surface                             | Auth mechanism              | Wildcard CORS کا اثر                                                                                                                                                                                                                                |
| ----------------------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard / MANAGEMENT `/api/*`     | Cookie session              | Origin کو echo کیا جاتا ہے، لیکن **`Allow-Credentials` کے بغیر** براؤزر credentialed read کو **block** کر دیتا ہے۔ کوئی نقصان دہ cross-origin site آپ کے authenticated dashboard responses کو **نہیں پڑھ سکتی**، اور session cookie ظاہر نہیں ہوتی۔ |
| Client API `/v1/*`, `/v1beta/*`     | Bearer / `x-api-key` header | یہ پہلے ہی **جان بوجھ کر** permissive ہے (`relaxForTokenAuth`): براؤزر `Authorization`/`x-api-key` کو کبھی خودکار طور پر attach نہیں کرتے، لہٰذا حملہ آور کا page آپ کی key فراہم نہیں کر سکتا۔ `CORS_ALLOW_ALL` اسے مزید وسیع نہیں کرتا۔           |
| Public read-only (`/api/health`, …) | None                        | غیر حساس؛ wildcard بے ضرر ہے۔                                                                                                                                                                                                                       |

لہٰذا `CORS_ALLOW_ALL=true` کا **باقی ماندہ** exposure صرف ان صورتوں تک محدود ہے: (a)
پہلے سے unauthenticated data کی non-credentialed cross-origin **reads**، اور (b)
management routes پر CORS **preflight کو کامیاب ہونے دینا** — جن کے لیے پھر بھی ایسی authentication درکار ہوتی ہے جو cross-origin page فراہم نہیں کر سکتا۔ مشترکہ CORS path پر یہ session hijacking یا credentials چوری کا ذریعہ **نہیں** ہے۔

### ایک حقیقی استثنا — `/api/v1/agents/`

Cloud-Agent routes (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) اپنے
**ذاتی** CORS headers سیٹ کرتے ہیں
(`src/lib/cloudAgent/api.ts`، `getCloudAgentCorsHeaders`) اور
`Access-Control-Allow-Origin: <origin>|*` کے ساتھ
`Access-Control-Allow-Credentials: true` بھی **خارج کرتے ہیں**۔ یہ واحد surface ہے جہاں
origin echo اور credentials ایک ساتھ موجود ہوتے ہیں، اور یہ
`CORS_ALLOW_ALL` سے **آزاد** ہے۔ یہ routes management-authenticated ہیں
(`requireManagementAuth`)؛ جو operators dashboard کو host سے باہر expose کرتے ہیں، انہیں
آگاہ ہونا چاہیے کہ یہ واحد مقام ہے جہاں response headers کسی cross-origin credentialed read کی اجازت دیتے ہیں۔ اسے explicit allowlist تک محدود کرنے کا کام
اس CORS guidance سے الگ track کیا جا رہا ہے۔

## پروڈکشن چیک لسٹ

- **پروڈکشن میں کبھی بھی `CORS_ALLOW_ALL=true` سیٹ نہ کریں۔** اسے غیر سیٹ رہنے دیں۔
- اوریجنز کی ایک **واضح** فہرست سیٹ کریں — یا تو env var کے ذریعے یا Security ٹیب کی فیلڈ میں:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- اگر OmniRoute کسی reverse proxy / tunnel (nginx، Caddy، Cloudflare
  Tunnel، Tailscale) کے پیچھے چلتا ہے تو CORS آپ کا **واحد** کنٹرول نہیں ہے — loopback route
  guard اب بھی spawn کی صلاحیت رکھنے والے routes کی حفاظت کرتا ہے (دیکھیں
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md))۔ 403 کو "درست" کرنے کے لیے
  `X-Forwarded-For: 127.0.0.1` جعل سازی سے مت بھیجیں؛ اس سے RCE کی وہ قسم دوبارہ کھل جاتی ہے
  جسے route guard بند کرتا ہے۔
- runtime کی حالت کی تصدیق کریں: جب بھی
  `CORS_ALLOW_ALL=true` فعال ہو، dashboard میں Dashboard → Security → Authorization Inventory کے تحت ایک **مستقل عنبری بینر** دکھائی دیتا ہے، اور `/api/settings/authz-inventory`
  ایک `cors: { allowAll, allowedOrigins }` envelope واپس کرتا ہے جسے نگرانی کے ٹولز باقاعدگی سے poll کر سکتے ہیں۔

## ڈیولپمنٹ میں سہولت — مخصوص مقامی اوریجنز کی اجازت دیں

ڈیولپمنٹ میں بھی wildcard کی شاذ ہی ضرورت ہوتی ہے۔ صرف ان dev servers کو اجازت دیں جنہیں آپ استعمال کرتے ہیں:

```bash
# مقامی OmniRoute کو کال کرنے والے Vite (5173) + Next.js (3000) dev servers
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

اوریجنز کو حروف کے بڑے یا چھوٹے ہونے سے قطع نظر match کیا جاتا ہے اور آخر میں موجود slash نظر انداز کر دیا جاتا ہے، اس لیے
`http://localhost:3000` اور `http://localhost:3000/` مساوی ہیں۔ یہی CSV
runtime کے دوران **Dashboard → Security → CORS Allowed Origins** میں restart کے بغیر
سیٹ کیا جا سکتا ہے۔

## API keys بمقابلہ cookie sessions

- **Bearer / `x-api-key` (`/v1/*` inference surface):** browsers انہیں کبھی بھی
  خودکار طور پر منسلک نہیں کرتے۔ یہاں CORS کوئی مؤثر رکاوٹ نہیں ہے — اصل
  رکاوٹ API key ہے — اسی لیے اس surface کو جان بوجھ کر permissive رکھا گیا ہے تاکہ browser اور
  Electron clients وہ responses پڑھ سکیں جن تک رسائی کے وہ پہلے ہی مجاز ہیں۔
- **Cookie session (dashboard):** fail-closed default **اور**
  مشترکہ path پر `Access-Control-Allow-Credentials` کی عدم موجودگی سے محفوظ ہے۔ management/dashboard
  کے اوریجنز کو کسی بھی permissive config سے باہر رکھیں؛ انہیں لازماً مکمل طور پر
  fail-closed رہنا چاہیے۔

## مثال: OmniRoute کے سامنے reverse proxy

CORS کو خود OmniRoute نافذ کرتا ہے، اس لیے عام طور پر proxy کو
`Access-Control-*` headers شامل یا rewrite **نہیں** کرنے چاہییں (دوہرے headers browsers کو خراب کر دیتے ہیں)۔ TLS
terminate کریں اور آگے بھیج دیں — preflight کا جواب OmniRoute کو دینے دیں:

```nginx
# nginx — OmniRoute کو آگے بھیجیں؛ یہاں Access-Control-* داخل نہ کریں
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # X-Forwarded-For کو 127.0.0.1 پر سیٹ نہ کریں — اس سے loopback route guard بے اثر ہو جاتا ہے۔
}
```

مجاز browser origins کو proxy میں نہیں، بلکہ OmniRoute (`CORS_ALLOWED_ORIGINS` یا
Security ٹیب) میں سیٹ کریں۔

## سورس فائلیں

| پہلو                                     | فائل                                                                 |
| ---------------------------------------- | -------------------------------------------------------------------- |
| Allowlist resolution + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| Middleware application (حتمی واحد ماخذ)  | `src/server/authz/pipeline.ts`                                       |
| Settings → runtime origin injection      | `src/lib/config/runtimeSettings.ts`                                  |
| Dashboard کے لیے runtime status          | `src/app/api/settings/authz-inventory/route.ts`                      |
| Dashboard warning banner                 | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS Allowed Origins فیلڈ                | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent کا فی-route CORS (استثنا)    | `src/lib/cloudAgent/api.ts`                                          |

## مزید دیکھیے

- [روٹ گارڈ کے درجات](./ROUTE_GUARD_TIERS.md) — spawn کی صلاحیت رکھنے والے روٹس کے لیے
  loopback کا نفاذ (ایک علیحدہ، تکمیلی کنٹرول)۔
- [اختیار دہی کی رہنمائی](../architecture/AUTHZ_GUIDE.md) — مکمل auth پائپ لائن۔
