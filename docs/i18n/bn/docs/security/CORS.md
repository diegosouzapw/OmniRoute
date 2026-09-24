# CORS Configuration & Security (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute একটি একক, কেন্দ্রীভূত অনুমোদন-তালিকা থেকে নিয়ন্ত্রণ করে কোন **ব্রাউজার origin** ক্রস-origin প্রতিক্রিয়া পড়তে পারবে। মডেলটি **ডিফল্টভাবে fail-closed**:
আপনি স্পষ্টভাবে কোনো origin-কে অনুমতি না দেওয়া পর্যন্ত কোনো origin-ই অনুমোদিত নয়। এই পৃষ্ঠায় অনুমোদন-তালিকা কীভাবে
নির্ধারিত হয়, `CORS_ALLOW_ALL=true` আসলে কী উন্মুক্ত করে (এবং, গুরুত্বপূর্ণভাবে, কী
করে **না**), dev বনাম production কীভাবে নিরাপদে কনফিগার করতে হয় এবং wildcard সক্রিয় থাকলে
ড্যাশবোর্ডে প্রদর্শিত runtime সতর্কতা নথিভুক্ত করা হয়েছে।

**প্রামাণিক উৎস:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`)। অনুমোদন-তালিকাটি middleware-এ একবারই প্রয়োগ করা হয়
(`src/server/authz/pipeline.ts`) — প্রতিটি route-এর handler নিজে থেকে
`Access-Control-Allow-Origin` সেট করে না।

## একটি origin কীভাবে নির্ধারিত হয়

প্রতিটি request-এর জন্য middleware এই ক্রমে `Access-Control-Allow-Origin`-এর মান
নির্ধারণ করে:

1. **`CORS_ALLOW_ALL=true`** (অথবা পুরোনো `CORS_ORIGIN=*`) → কলারের
   `Origin`-কে প্রতিক্রিয়ায় ফিরিয়ে দেয় (অথবা `Origin` header না থাকলে `*`), সঙ্গে `Vary: Origin`
   দেয় যাতে cache সঠিক থাকে। একই `applyCorsHeaders()` chokepoint token-authenticated
   `/v1*`/`/v1beta*` surface-এর প্রতিটি body-সহ 2xx response-এ
   `Vary: Accept-Encoding`-ও যোগ করে (`relaxForTokenAuth`, RFC 9110 §12.5.5, issue #6737), যাতে
   downstream/shared cache সংকুচিত ও অসংকুচিত variant-গুলোকে সঠিকভাবে
   আলাদা করতে পারে।
2. অন্যথায়, request-এর `Origin` normalize করা হয় (ছোট হাতের অক্ষরে রূপান্তর করা এবং শেষের slash
   বাদ দেওয়া হয়) এবং **একীভূত অনুমোদন-তালিকার** সঙ্গে মেলানো হয়:
   - env **`CORS_ALLOWED_ORIGINS`** — কমা দিয়ে পৃথক করা তালিকা, এবং
   - runtime **`corsOrigins`** setting (Dashboard → Security → _CORS Allowed
     Origins_), যা `src/lib/config/runtimeSettings.ts` থেকে
     `setRuntimeAllowedOrigins()`-এর মাধ্যমে inject করা হয়।
3. কোনো মিল না হলে → **কোনো `Access-Control-Allow-Origin` header পাঠানো হয় না**। ব্রাউজার
   cross-origin read ব্লক করে। এটিই অভিপ্রেত fail-closed default।

| Env var                | অর্থ                                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------ |
| `CORS_ALLOWED_ORIGINS` | অনুমোদিত exact origin-গুলোর CSV (প্রস্তাবিত)।                                        |
| `CORS_ALLOW_ALL`       | `true`/`1` → যেকোনো origin প্রতিক্রিয়ায় ফিরিয়ে দেয় (wildcard)। শুধু dev-এর জন্য। |
| `CORS_ORIGIN`          | পুরোনো। `*` `CORS_ALLOW_ALL`-এর মতো আচরণ করে; একটি একক মান অনুমোদন-তালিকায় যোগ হয়। |

## হুমকি মডেল — `CORS_ALLOW_ALL=true` আসলে কী উন্মুক্ত করে

সাধারণ OWASP সতর্কতাটি ("wildcard CORS = যেকোনো site আপনার API call করতে পারে")
গুরুত্বসহকারে নেওয়া উচিত, তবে OmniRoute-এর exposure **সাধারণ পরিস্থিতির তুলনায় সীমিত**,
একটি নির্দিষ্ট implementation fact-এর কারণে:

> **কেন্দ্রীয় `applyCorsHeaders()` কখনো
> `Access-Control-Allow-Credentials` পাঠায় না।** server
> `Access-Control-Allow-Credentials: true` না পাঠালে browser কোনো _credentialed_
> (cookie-বহনকারী) cross-origin response উন্মুক্ত করবে না। OmniRoute-এর shared CORS path কখনোই
> তা করে না।

`CORS_ALLOW_ALL=true` থাকলেও প্রতিটি surface-এর ক্ষেত্রে এর অর্থ:

| Surface                             | Auth mechanism              | Wildcard CORS-এর প্রভাব                                                                                                                                                                                                                             |
| ----------------------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard / MANAGEMENT `/api/*`     | Cookie session              | Origin প্রতিক্রিয়ায় ফিরিয়ে দেওয়া হয়, কিন্তু **`Allow-Credentials` ছাড়া** browser credentialed read **ব্লক করে**। কোনো ক্ষতিকর cross-origin site আপনার authenticated dashboard response **পড়তে পারে না**, এবং session cookie উন্মুক্ত হয় না। |
| Client API `/v1/*`, `/v1beta/*`     | Bearer / `x-api-key` header | **নকশাগতভাবেই** ইতোমধ্যে permissive (`relaxForTokenAuth`): browser কখনো স্বয়ংক্রিয়ভাবে `Authorization`/`x-api-key` সংযুক্ত করে না, তাই আক্রমণকারীর page আপনার key সরবরাহ করতে পারে না। `CORS_ALLOW_ALL` এটিকে আরও বিস্তৃত করে না।                 |
| Public read-only (`/api/health`, …) | None                        | সংবেদনশীল নয়; wildcard ক্ষতিকর নয়।                                                                                                                                                                                                                |

তাই `CORS_ALLOW_ALL=true`-এর **অবশিষ্ট** exposure শুধু এগুলোর মধ্যে সীমাবদ্ধ: (a)
ইতোমধ্যে unauthenticated data-এর non-credentialed cross-origin **read**, এবং (b)
management route-এ CORS **preflight pass** করতে দেওয়া — যেগুলোর জন্য তখনও এমন auth
প্রয়োজন যা একটি cross-origin page সরবরাহ করতে পারে না। shared CORS path-এ এটি **session hijack** বা
credential চুরির vector **নয়**।

### একটি প্রকৃত ব্যতিক্রম — `/api/v1/agents/`

Cloud-Agent route-গুলো (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`)
তাদের **নিজস্ব** CORS header সেট করে
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) এবং
`Access-Control-Allow-Origin: <origin>|*`-এর সঙ্গে
`Access-Control-Allow-Credentials: true`-ও পাঠায়। এটিই একমাত্র surface যেখানে
origin-echo এবং credential একসঙ্গে থাকে, এবং এটি **`CORS_ALLOW_ALL`-এর ওপর
নির্ভরশীল নয়**। এই route-গুলো management-authenticated
(`requireManagementAuth`); যেসব operator dashboard-কে host-এর বাইরে expose করেন, তাঁদের
সচেতন থাকা উচিত যে এটিই একমাত্র স্থান যেখানে response header দ্বারা cross-origin credentialed read
অনুমোদিত। এটিকে একটি explicit allowlist-এ সীমিত করার কাজ
এই CORS নির্দেশিকা থেকে আলাদাভাবে track করা হচ্ছে।

## প্রোডাকশন চেকলিস্ট

- **প্রোডাকশনে কখনোই `CORS_ALLOW_ALL=true` সেট করবেন না।** এটি আনসেট রাখুন।
- একটি **সুনির্দিষ্ট** অরিজিন তালিকা সেট করুন—হয় env var, নয়তো Security ট্যাবের ফিল্ড ব্যবহার করে:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- OmniRoute যদি কোনো reverse proxy / tunnel-এর (nginx, Caddy, Cloudflare
  Tunnel, Tailscale) পেছনে চলে, তাহলে CORS আপনার একমাত্র নিয়ন্ত্রণ **নয়**—loopback route
  guard তখনও spawn-সক্ষম রুটগুলো সুরক্ষিত রাখে (দেখুন
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md))। 403 "ঠিক" করার জন্য
  `X-Forwarded-For: 127.0.0.1` জাল করবেন না; এতে route guard যে RCE শ্রেণির
  ঝুঁকি বন্ধ করে, সেটি আবার উন্মুক্ত হয়ে যায়।
- runtime-এর অবস্থা নিশ্চিত করুন: যখনই
  `CORS_ALLOW_ALL=true` সক্রিয় থাকে, Dashboard → Security → Authorization Inventory-এর অধীনে ড্যাশবোর্ডে একটি **স্থায়ী অ্যাম্বার ব্যানার**
  দেখা যায় এবং `/api/settings/authz-inventory` এমন একটি
  `cors: { allowAll, allowedOrigins }` envelope ফেরত দেয়, যা পর্যবেক্ষণ সরঞ্জামগুলো poll করতে পারে।

## ডেভেলপমেন্টের সুবিধা—নির্দিষ্ট লোকাল অরিজিন অনুমোদন করুন

এমনকি dev পরিবেশেও wildcard খুব কমই প্রয়োজন হয়। শুধু আপনার ব্যবহৃত dev server-গুলো অনুমোদন করুন:

```bash
# একটি লোকাল OmniRoute-কে কল করা Vite (5173) + Next.js (3000) dev server
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

শেষের slash উপেক্ষা করে অরিজিনগুলো case-insensitive উপায়ে মেলানো হয়, তাই
`http://localhost:3000` এবং `http://localhost:3000/` সমতুল্য। একই CSV
restart ছাড়াই runtime-এ **Dashboard → Security → CORS Allowed Origins**-এ সেট করা যায়।

## API key বনাম cookie session

- **Bearer / `x-api-key` (`/v1/*` inference surface):** browser কখনোই
  এগুলো স্বয়ংক্রিয়ভাবে সংযুক্ত করে না। এখানে CORS অর্থবহ কোনো প্রতিবন্ধকতা নয়—API key-ই
  প্রতিবন্ধকতা—এ কারণেই এই surface ইচ্ছাকৃতভাবে permissive রাখা হয়েছে, যাতে browser ও
  Electron client তাদের আগে থেকেই অনুমোদিত response পড়তে পারে।
- **Cookie session (ড্যাশবোর্ড):** fail-closed default **এবং**
  shared path-এ `Access-Control-Allow-Credentials` অনুপস্থিত থাকা—উভয়টির মাধ্যমেই সুরক্ষিত। যেকোনো
  permissive config থেকে management/dashboard অরিজিনগুলো বাদ রাখুন; এগুলোকে অবশ্যই সম্পূর্ণভাবে
  fail-closed থাকতে হবে।

## উদাহরণ: OmniRoute-এর সামনে reverse proxy

CORS স্বয়ং OmniRoute দ্বারা প্রয়োগ করা হয়, তাই proxy-এর সাধারণত
`Access-Control-*` header যোগ করা বা rewrite করা **উচিত নয়** (দ্বৈত header browser-কে অকার্যকর করে দেয়)। TLS
terminate করে forward করুন—preflight-এর উত্তর OmniRoute-কে দিতে দিন:

```nginx
# nginx—OmniRoute-এ forward করুন; এখানে Access-Control-* inject করবেন না
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # X-Forwarded-For-কে 127.0.0.1-এ সেট করবেন না—এটি loopback route guard-কে অকার্যকর করে দেয়।
}
```

অনুমোদিত browser অরিজিনগুলো proxy-তে নয়, OmniRoute-এ (`CORS_ALLOWED_ORIGINS` অথবা
Security ট্যাব) সেট করুন।

## সোর্স ফাইল

| সংশ্লিষ্ট বিষয়                              | ফাইল                                                                 |
| -------------------------------------------- | -------------------------------------------------------------------- |
| Allowlist resolution + `getCorsStatus()`     | `src/server/cors/origins.ts`                                         |
| Middleware প্রয়োগ (একমাত্র নির্ভরযোগ্য উৎস) | `src/server/authz/pipeline.ts`                                       |
| Settings → runtime অরিজিন injection          | `src/lib/config/runtimeSettings.ts`                                  |
| ড্যাশবোর্ডের জন্য runtime status             | `src/app/api/settings/authz-inventory/route.ts`                      |
| ড্যাশবোর্ড warning banner                    | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS Allowed Origins ফিল্ড                   | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent-এর প্রতি-রুট CORS (ব্যতিক্রমটি)  | `src/lib/cloudAgent/api.ts`                                          |

## আরও দেখুন

- [রুট গার্ড স্তরসমূহ](./ROUTE_GUARD_TIERS.md) — spawn-সক্ষম রুটগুলোর জন্য
  loopback প্রয়োগ (একটি পৃথক, পরিপূরক নিয়ন্ত্রণ)।
- [অনুমোদন নির্দেশিকা](../architecture/AUTHZ_GUIDE.md) — সম্পূর্ণ auth পাইপলাইন।
