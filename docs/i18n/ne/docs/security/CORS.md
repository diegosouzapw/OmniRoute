# CORS Configuration & Security (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute ले एउटै केन्द्रीकृत अनुमति-सूचीबाट कुन-कुन **ब्राउजर origin** ले cross-origin प्रतिक्रियाहरू पढ्न सक्छन् भन्ने नियन्त्रण गर्छ। यो मोडेल पूर्वनिर्धारित रूपमा **fail-closed** हुन्छ:
तपाईंले स्पष्ट रूपमा अनुमति नदिएसम्म कुनै पनि origin लाई अनुमति दिइँदैन। यस पृष्ठले अनुमति-सूची कसरी निर्धारण हुन्छ, `CORS_ALLOW_ALL=true` ले वास्तवमा के उजागर गर्छ (र, महत्त्वपूर्ण रूपमा, के **गर्दैन**), विकास र उत्पादन वातावरणलाई कसरी सुरक्षित रूपमा कन्फिगर गर्ने, र wildcard सक्रिय हुँदा ड्यासबोर्डले देखाउने runtime चेतावनीबारे व्याख्या गर्छ।

**आधिकारिक स्रोत:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`)। अनुमति-सूची middleware (`src/server/authz/pipeline.ts`) मा एकपटक लागू गरिन्छ — प्रत्येक route का handler हरूले आफैं
`Access-Control-Allow-Origin` सेट गर्दैनन्।

## Origin कसरी निर्धारण गरिन्छ

प्रत्येक अनुरोधका लागि middleware ले `Access-Control-Allow-Origin` को मान
यस क्रममा गणना गर्छ:

1. **`CORS_ALLOW_ALL=true`** (वा पुरानो `CORS_ORIGIN=*`) → अनुरोधकर्ताको
   `Origin` लाई नै फिर्ता पठाउँछ (वा `Origin` header नभएको अवस्थामा `*`), र cache हरू सही रहून् भनेर `Vary: Origin`
   राख्छ। त्यही `applyCorsHeaders()` chokepoint ले token-authenticated
   `/v1*`/`/v1beta*` सतहमा body सहितका प्रत्येक 2xx प्रतिक्रियामा
   `Vary: Accept-Encoding` पनि थप्छ (`relaxForTokenAuth`, RFC 9110 §12.5.5, issue #6737), जसले गर्दा
   downstream/shared cache हरूले compressed र uncompressed
   variant हरू सही रूपमा छुट्याउन सक्छन्।
2. अन्यथा, अनुरोधको `Origin` लाई सामान्यीकृत गरिन्छ (सानो अक्षरमा परिवर्तन गरी अन्त्यको slash
   हटाइन्छ) र **मर्ज गरिएको अनुमति-सूची**सँग मिलान गरिन्छ:
   - env **`CORS_ALLOWED_ORIGINS`** — comma-separated सूची, र
   - runtime **`corsOrigins`** setting (Dashboard → Security → _CORS Allowed
     Origins_), जुन `src/lib/config/runtimeSettings.ts` बाट
     `setRuntimeAllowedOrigins()` मार्फत inject गरिन्छ।
3. कुनै मिलान भएन → **`Access-Control-Allow-Origin` header पठाइँदैन**। ब्राउजरले
   cross-origin read लाई रोक्छ। यो अपेक्षित fail-closed पूर्वनिर्धारित व्यवहार हो।

| Env var                | अर्थ                                                                                      |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | अनुमति दिनुपर्ने ठ्याक्कै मिल्ने origin हरूको CSV (सिफारिस गरिएको)।                       |
| `CORS_ALLOW_ALL`       | `true`/`1` → कुनै पनि origin लाई फिर्ता पठाउने (wildcard)। विकासमा मात्र।                 |
| `CORS_ORIGIN`          | पुरानो विकल्प। `*` ले `CORS_ALLOW_ALL` जस्तै व्यवहार गर्छ; एउटा मान अनुमति-सूचीमा थपिन्छ। |

## जोखिम मोडेल — `CORS_ALLOW_ALL=true` ले वास्तवमा के उजागर गर्छ

OWASP को सामान्य चेतावनी ("wildcard CORS = कुनै पनि site ले तपाईंको API call गर्न सक्छ") लाई
गम्भीरतापूर्वक लिनु उचित हुन्छ, तर OmniRoute को जोखिम **सामान्य अवस्थाभन्दा साँघुरो** छ,
किनभने कार्यान्वयनसम्बन्धी एउटा ठोस तथ्य यस्तो छ:

> **केन्द्रीय `applyCorsHeaders()` ले कहिल्यै
> `Access-Control-Allow-Credentials` पठाउँदैन।** Server ले
> `Access-Control-Allow-Credentials: true` नपठाएसम्म ब्राउजरले _credentialed_
> (cookie सहितको) cross-origin प्रतिक्रिया उपलब्ध गराउँदैन। OmniRoute को साझा CORS path ले
> यो कहिल्यै गर्दैन।

`CORS_ALLOW_ALL=true` हुँदा समेत प्रत्येक सतहका लागि यसको अर्थ:

| सतह                                    | प्रमाणीकरण संयन्त्र         | Wildcard CORS को प्रभाव                                                                                                                                                                                                                    |
| -------------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Dashboard / MANAGEMENT `/api/*`        | Cookie session              | Origin फिर्ता पठाइन्छ, तर **`Allow-Credentials` बिना** ब्राउजरले credentialed read लाई **रोक्छ**। कुनै दुर्भावनापूर्ण cross-origin site ले तपाईंका authenticated dashboard प्रतिक्रियाहरू **पढ्न सक्दैन**, र session cookie उजागर हुँदैन।  |
| Client API `/v1/*`, `/v1beta/*`        | Bearer / `x-api-key` header | पहिले नै **डिजाइनअनुसार** permissive (`relaxForTokenAuth`) छ: ब्राउजरहरूले `Authorization`/`x-api-key` स्वतः संलग्न गर्दैनन्, त्यसैले आक्रमणकारीको page ले तपाईंको key उपलब्ध गराउन सक्दैन। `CORS_ALLOW_ALL` ले यसलाई थप फराकिलो बनाउँदैन। |
| सार्वजनिक read-only (`/api/health`, …) | कुनै पनि होइन               | संवेदनशील छैन; wildcard हानिरहित छ।                                                                                                                                                                                                        |

त्यसैले `CORS_ALLOW_ALL=true` को **बाँकी रहेको** जोखिम यतिमै सीमित छ: (a)
पहिलेदेखि नै unauthenticated data को non-credentialed cross-origin **read**, र (b)
management route हरूमा CORS **preflight सफल हुन दिनु** — जसमा अझै पनि त्यस्तो auth
आवश्यक हुन्छ जुन cross-origin page ले प्रदान गर्न सक्दैन। साझा CORS path मा यो
session-hijack वा credential-theft को माध्यम **होइन**।

### एउटा वास्तविक अपवाद — `/api/v1/agents/`

Cloud-Agent route हरू (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) ले
आफ्नै CORS header हरू सेट गर्छन्
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) र
`Access-Control-Allow-Origin: <origin>|*` सँगै
`Access-Control-Allow-Credentials: true` पनि **पठाउँछन्**। Origin-echo र credentials सँगसँगै रहने यो एकमात्र सतह हो, र यो
`CORS_ALLOW_ALL` बाट **स्वतन्त्र** छ। यी route हरू management-authenticated
(`requireManagementAuth`) छन्; dashboard लाई host बाहिर उपलब्ध गराउने operator हरूले
cross-origin credentialed read लाई response header हरूले अनुमति दिने एकमात्र ठाउँ यही हो भन्ने
कुरा बुझ्नुपर्छ। यसलाई स्पष्ट अनुमति-सूचीमा सीमित गर्ने कार्य यस CORS मार्गदर्शनबाट
अलग रूपमा track गरिएको छ।

## उत्पादन चेकलिस्ट

- **उत्पादनमा कहिल्यै पनि `CORS_ALLOW_ALL=true` सेट नगर्नुहोस्।** यसलाई सेट नगरी छोड्नुहोस्।
- **स्पष्ट** origin सूची सेट गर्नुहोस् — env var वा Security ट्याबको फिल्डमध्ये कुनै एकमा:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- यदि OmniRoute reverse proxy / tunnel (nginx, Caddy, Cloudflare
  Tunnel, Tailscale) पछाडि चल्छ भने, CORS तपाईंको **एक मात्र** नियन्त्रण होइन — loopback route
  guard ले अझै पनि spawn-सक्षम routes लाई सुरक्षित गर्छ (
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) हेर्नुहोस्)। 403 लाई "ठीक गर्न"
  `X-Forwarded-For: 127.0.0.1` नक्कली रूपमा नपठाउनुहोस्; त्यसो गर्दा route guard ले बन्द गरेको
  RCE वर्ग पुनः खुल्छ।
- runtime स्थिति पुष्टि गर्नुहोस्: `CORS_ALLOW_ALL=true` सक्रिय हुँदा dashboard ले
  Dashboard → Security → Authorization Inventory अन्तर्गत **स्थायी खैरो-पहेँलो banner**
  देखाउँछ, र `/api/settings/authz-inventory` ले monitoring tools ले poll गर्न सक्ने
  `cors: { allowAll, allowedOrigins }` envelope फर्काउँछ।

## विकासको सहजता — निश्चित local origins लाई अनुमति दिनुहोस्

dev मा पनि तपाईंलाई wildcard विरलै आवश्यक पर्छ। तपाईंले प्रयोग गर्ने dev servers लाई मात्र अनुमति दिनुहोस्:

```bash
# local OmniRoute लाई call गर्ने Vite (5173) + Next.js (3000) dev servers
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Origins लाई case-insensitive रूपमा मिलाइन्छ र अन्तिम slash लाई बेवास्ता गरिन्छ, त्यसैले
`http://localhost:3000` र `http://localhost:3000/` समान हुन्। सोही CSV लाई
restart नगरी runtime मा **Dashboard → Security → CORS Allowed Origins** मा सेट गर्न
सकिन्छ।

## API keys र cookie sessions बीचको भिन्नता

- **Bearer / `x-api-key` (`/v1/*` inference surface):** browsers ले यिनलाई कहिल्यै
  स्वचालित रूपमा संलग्न गर्दैनन्। यहाँ CORS अर्थपूर्ण अवरोध होइन — API key नै
  अवरोध हो — त्यसैले browser र Electron clients ले आफूलाई पहिले नै अधिकार भएको
  responses पढ्न सकून् भनेर यो surface लाई जानाजानी permissive बनाइएको छ।
- **Cookie session (dashboard):** fail-closed default **र**
  साझा path मा `Access-Control-Allow-Credentials` को अनुपस्थिति दुवैद्वारा सुरक्षित हुन्छ।
  management/dashboard origins लाई कुनै पनि permissive config बाट बाहिर राख्नुहोस्; तिनीहरू
  ठ्याक्कै fail-closed नै रहनुपर्छ।

## उदाहरण: OmniRoute को अगाडि reverse proxy

CORS लाई OmniRoute स्वयंले लागू गर्छ, त्यसैले proxy ले सामान्यतया
`Access-Control-*` headers थप्नु वा rewrite गर्नु **हुँदैन** (दोहोरो headers ले browsers मा
समस्या उत्पन्न गर्छन्)। TLS terminate गरेर forward गर्नुहोस् — preflight को जवाफ OmniRoute लाई दिनुहोस्:

```nginx
# nginx — OmniRoute मा forward गर्नुहोस्; यहाँ Access-Control-* inject नगर्नुहोस्
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # X-Forwarded-For लाई 127.0.0.1 मा सेट नगर्नुहोस् — यसले loopback route guard लाई निष्प्रभावी बनाउँछ।
}
```

अनुमति दिइएका browser origins लाई proxy मा होइन, OmniRoute मा
(`CORS_ALLOWED_ORIGINS` वा Security ट्याब) सेट गर्नुहोस्।

## स्रोत फाइलहरू

| विषय                                     | फाइल                                                                 |
| ---------------------------------------- | -------------------------------------------------------------------- |
| Allowlist resolution + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| Middleware प्रयोग (सत्यको एकल स्रोत)     | `src/server/authz/pipeline.ts`                                       |
| Settings → runtime origin injection      | `src/lib/config/runtimeSettings.ts`                                  |
| dashboard का लागि runtime स्थिति         | `src/app/api/settings/authz-inventory/route.ts`                      |
| Dashboard चेतावनी banner                 | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS Allowed Origins फिल्ड               | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent को प्रति-route CORS (अपवाद)  | `src/lib/cloudAgent/api.ts`                                          |

## यो पनि हेर्नुहोस्

- [रुट गार्ड तहहरू](./ROUTE_GUARD_TIERS.md) — प्रक्रिया सुरु गर्न सक्षम रुटहरूका लागि
  लूपब्याक कार्यान्वयन (एउटा छुट्टै, पूरक नियन्त्रण)।
- [प्राधिकरण मार्गदर्शिका](../architecture/AUTHZ_GUIDE.md) — पूर्ण प्रमाणीकरण पाइपलाइन।
