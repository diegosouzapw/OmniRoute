# CORS Configuration & Security (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute यह नियंत्रित करता है कि कौन-से **ब्राउज़र origins** किसी एक केंद्रीकृत allowlist से cross-origin responses पढ़ सकते हैं। यह मॉडल **डिफ़ॉल्ट रूप से fail-closed** है:
जब तक आप किसी origin को स्पष्ट रूप से अनुमति नहीं देते, तब तक किसी भी origin को अनुमति नहीं मिलती। यह पृष्ठ बताता है कि allowlist
कैसे resolve होती है, `CORS_ALLOW_ALL=true` वास्तव में क्या उजागर करता है (और, महत्वपूर्ण रूप से, क्या
**नहीं** करता), dev और production को सुरक्षित रूप से कैसे configure करें, और wildcard सक्रिय होने पर
dashboard कौन-सी runtime warning दिखाता है।

**सत्य का स्रोत:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`)। allowlist केवल एक बार,
middleware (`src/server/authz/pipeline.ts`) में लागू होती है — प्रत्येक route के handlers स्वयं
`Access-Control-Allow-Origin` सेट नहीं करते।

## किसी origin को कैसे resolve किया जाता है

प्रत्येक request के लिए middleware इस क्रम में `Access-Control-Allow-Origin` का मान
निर्धारित करता है:

1. **`CORS_ALLOW_ALL=true`** (या legacy `CORS_ORIGIN=*`) → caller का
   `Origin` वापस echo करें (या `Origin` header न होने पर `*`), साथ में `Vary: Origin`
   ताकि caches सही रहें। यही `applyCorsHeaders()` chokepoint
   token-authenticated `/v1*`/`/v1beta*` surface पर body वाली प्रत्येक 2xx response में
   `Vary: Accept-Encoding` भी जोड़ता है (`relaxForTokenAuth`, RFC 9110 §12.5.5, issue #6737), ताकि
   downstream/shared caches compressed और uncompressed
   variants के बीच सही अंतर कर सकें।
2. अन्यथा, request के `Origin` को normalize किया जाता है (lower-case में बदला जाता है और trailing slash
   हटाया जाता है) और फिर उसका मिलान **merged allowlist** से किया जाता है:
   - env **`CORS_ALLOWED_ORIGINS`** — comma-separated list, और
   - runtime **`corsOrigins`** setting (Dashboard → Security → _CORS Allowed
     Origins_), जिसे `src/lib/config/runtimeSettings.ts` से
     `setRuntimeAllowedOrigins()` के माध्यम से inject किया जाता है।
3. कोई match नहीं → **कोई `Access-Control-Allow-Origin` header emit नहीं किया जाता**। ब्राउज़र
   cross-origin read को block कर देता है। यही अपेक्षित fail-closed default है।

| Env var                | अर्थ                                                                                       |
| ---------------------- | ------------------------------------------------------------------------------------------ |
| `CORS_ALLOWED_ORIGINS` | अनुमति देने के लिए exact origins की CSV (अनुशंसित)।                                        |
| `CORS_ALLOW_ALL`       | `true`/`1` → किसी भी origin को echo करें (wildcard)। केवल dev के लिए।                      |
| `CORS_ORIGIN`          | Legacy। `*`, `CORS_ALLOW_ALL` की तरह व्यवहार करता है; एकल मान allowlist में जोड़ा जाता है। |

## Threat model — `CORS_ALLOW_ALL=true` वास्तव में क्या उजागर करता है

सामान्य OWASP warning ("wildcard CORS = कोई भी site आपके API को call कर सकती है") को
गंभीरता से लेना उचित है, लेकिन OmniRoute का exposure **सामान्य स्थिति की तुलना में सीमित** है,
क्योंकि implementation से जुड़ा एक ठोस तथ्य है:

> **केंद्रीय `applyCorsHeaders()` कभी भी
> `Access-Control-Allow-Credentials` emit नहीं करता।** कोई ब्राउज़र किसी _credentialed_
> (cookie वाली) cross-origin response को तब तक उजागर नहीं करेगा, जब तक server
> `Access-Control-Allow-Credentials: true` न भेजे। OmniRoute का shared CORS path ऐसा कभी
> नहीं करता।

`CORS_ALLOW_ALL=true` के साथ भी, प्रत्येक surface के लिए इसका अर्थ यह है:

| Surface                             | Auth mechanism              | Wildcard CORS का प्रभाव                                                                                                                                                                                                                             |
| ----------------------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard / MANAGEMENT `/api/*`     | Cookie session              | Origin echo होता है, लेकिन **`Allow-Credentials` के बिना** ब्राउज़र credentialed read को **block** कर देता है। कोई दुर्भावनापूर्ण cross-origin site आपकी authenticated dashboard responses को **पढ़ नहीं सकती**, और session cookie उजागर नहीं होती। |
| Client API `/v1/*`, `/v1beta/*`     | Bearer / `x-api-key` header | पहले से ही **design के अनुसार** permissive (`relaxForTokenAuth`): ब्राउज़र कभी भी `Authorization`/`x-api-key` को अपने-आप attach नहीं करते, इसलिए attacker का page आपकी key उपलब्ध नहीं करा सकता। `CORS_ALLOW_ALL` इसे और व्यापक नहीं करता।          |
| Public read-only (`/api/health`, …) | कोई नहीं                    | Non-sensitive; wildcard हानिरहित है।                                                                                                                                                                                                                |

इसलिए `CORS_ALLOW_ALL=true` का **शेष** exposure केवल इन तक सीमित है: (a)
पहले से unauthenticated data की non-credentialed cross-origin **reads**, और (b)
management routes पर CORS **preflight को pass होने देना** — जिन्हें अब भी ऐसी auth
की आवश्यकता होती है जिसे कोई cross-origin page उपलब्ध नहीं करा सकता। shared CORS path पर यह
session-hijack या credential-theft vector **नहीं** है।

### एक वास्तविक अपवाद — `/api/v1/agents/`

Cloud-Agent routes (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) अपने
**स्वयं के** CORS headers सेट करते हैं
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) और
`Access-Control-Allow-Origin: <origin>|*` को
`Access-Control-Allow-Credentials: true` के साथ emit **करते हैं**। यह एकमात्र surface है जहाँ
origin-echo और credentials साथ मौजूद हैं, और यह
`CORS_ALLOW_ALL` से **स्वतंत्र** है। ये routes management-authenticated हैं
(`requireManagementAuth`); जो operators dashboard को host के बाहर expose करते हैं, उन्हें
ध्यान रखना चाहिए कि यह एकमात्र स्थान है जहाँ response headers द्वारा cross-origin credentialed read की अनुमति दी जाती है।
इसे explicit allowlist तक सीमित करने का कार्य
इस CORS guidance से अलग track किया जाता है।

## प्रोडक्शन चेकलिस्ट

- **प्रोडक्शन में कभी भी `CORS_ALLOW_ALL=true` सेट न करें।** इसे अनसेट ही छोड़ें।
- एक **स्पष्ट** ओरिजिन सूची सेट करें — या तो env var अथवा Security टैब का फ़ील्ड:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- यदि OmniRoute किसी रिवर्स प्रॉक्सी / टनल (nginx, Caddy, Cloudflare
  Tunnel, Tailscale) के पीछे चलता है, तो CORS आपका **एकमात्र** नियंत्रण नहीं है —
  loopback रूट गार्ड अभी भी spawn-सक्षम रूटों की सुरक्षा करता है (देखें
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md))। 403 को "ठीक" करने के लिए
  `X-Forwarded-For: 127.0.0.1` को फ़र्ज़ी न बनाएँ; ऐसा करने से वह RCE श्रेणी फिर से
  खुल जाती है जिसे रूट गार्ड बंद करता है।
- रनटाइम स्थिति की पुष्टि करें: जब भी `CORS_ALLOW_ALL=true` सक्रिय हो, डैशबोर्ड
  Dashboard → Security → Authorization Inventory के अंतर्गत एक **स्थायी एम्बर बैनर**
  दिखाता है, और `/api/settings/authz-inventory` एक
  `cors: { allowAll, allowedOrigins }` एनवेलप लौटाता है, जिसे निगरानी टूल पोल कर सकते हैं।

## डेवलपमेंट की सुविधा — विशिष्ट स्थानीय ओरिजिन को अनुमति दें

डेवलपमेंट में भी आपको वाइल्डकार्ड की आवश्यकता बहुत कम होती है। केवल उन्हीं dev सर्वरों
को अनुमति दें जिनका आप उपयोग करते हैं:

```bash
# स्थानीय OmniRoute को कॉल करने वाले Vite (5173) + Next.js (3000) dev सर्वर
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

ओरिजिन का मिलान केस-असंवेदी रूप से किया जाता है और अंतिम स्लैश को अनदेखा किया जाता है,
इसलिए `http://localhost:3000` और `http://localhost:3000/` समतुल्य हैं। उसी CSV को
बिना रीस्टार्ट किए रनटाइम पर **Dashboard → Security → CORS Allowed Origins** में
सेट किया जा सकता है।

## API कुंजियाँ बनाम कुकी सेशन

- **Bearer / `x-api-key` (`/v1/*` इन्फ़रेंस सतह):** ब्राउज़र इन्हें कभी भी
  स्वचालित रूप से संलग्न नहीं करते। यहाँ CORS कोई सार्थक अवरोध नहीं है — API कुंजी ही
  अवरोध है — इसीलिए इस सतह को जानबूझकर अनुमेय रखा गया है, ताकि ब्राउज़र और
  Electron क्लाइंट उन प्रतिक्रियाओं को पढ़ सकें जिनके लिए वे पहले से अधिकृत हैं।
- **कुकी सेशन (डैशबोर्ड):** fail-closed डिफ़ॉल्ट **और** साझा पथ पर
  `Access-Control-Allow-Credentials` की अनुपस्थिति द्वारा सुरक्षित है। प्रबंधन/डैशबोर्ड
  ओरिजिन को किसी भी अनुमेय कॉन्फ़िगरेशन से बाहर रखें; उन्हें पूर्णतः fail-closed रहना चाहिए।

## उदाहरण: OmniRoute के सामने रिवर्स प्रॉक्सी

CORS को OmniRoute स्वयं लागू करता है, इसलिए आम तौर पर प्रॉक्सी को
`Access-Control-*` हेडर **नहीं** जोड़ने या पुनर्लेखित करने चाहिए (दोहरा हेडर ब्राउज़र
को बाधित करता है)। TLS को समाप्त करें और अनुरोध फ़ॉरवर्ड करें — प्रीफ़्लाइट का उत्तर
OmniRoute को देने दें:

```nginx
# nginx — OmniRoute को फ़ॉरवर्ड करें; यहाँ Access-Control-* इंजेक्ट न करें
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # X-Forwarded-For को 127.0.0.1 पर सेट न करें — यह loopback रूट गार्ड को निष्प्रभावी करता है।
}
```

अनुमत ब्राउज़र ओरिजिन को प्रॉक्सी में नहीं, बल्कि OmniRoute
(`CORS_ALLOWED_ORIGINS` या Security टैब) में सेट करें।

## स्रोत फ़ाइलें

| विषय                                   | फ़ाइल                                                                |
| -------------------------------------- | -------------------------------------------------------------------- |
| अनुमति-सूची समाधान + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| मिडलवेयर अनुप्रयोग (सत्य का एकल स्रोत) | `src/server/authz/pipeline.ts`                                       |
| Settings → रनटाइम ओरिजिन इंजेक्शन      | `src/lib/config/runtimeSettings.ts`                                  |
| डैशबोर्ड के लिए रनटाइम स्थिति          | `src/app/api/settings/authz-inventory/route.ts`                      |
| डैशबोर्ड चेतावनी बैनर                  | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS Allowed Origins फ़ील्ड            | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent प्रति-रूट CORS (अपवाद)     | `src/lib/cloudAgent/api.ts`                                          |

## यह भी देखें

- [रूट गार्ड स्तर](./ROUTE_GUARD_TIERS.md) — प्रोसेस शुरू करने में सक्षम रूट्स के लिए
  लूपबैक प्रवर्तन (एक अलग, पूरक नियंत्रण)।
- [प्राधिकरण गाइड](../architecture/AUTHZ_GUIDE.md) — संपूर्ण प्रमाणीकरण पाइपलाइन।
