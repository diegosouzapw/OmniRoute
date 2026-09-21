# CORS Configuration & Security (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute एका केंद्रीकृत अनुमतीसूचीमधून कोणते **ब्राउझर origins** cross-origin प्रतिसाद वाचू शकतात हे नियंत्रित करते. हे मॉडेल **डीफॉल्टनुसार fail-closed** आहे:
तुम्ही एखाद्या origin ला स्पष्टपणे अनुमती देईपर्यंत कोणत्याही origin ला अनुमती नसते. अनुमतीसूचीचे निराकरण कसे होते, `CORS_ALLOW_ALL=true` प्रत्यक्षात काय उघड करते (आणि, महत्त्वाचे म्हणजे, काय **उघड करत नाही**), dev विरुद्ध production सुरक्षितपणे कसे कॉन्फिगर करावे आणि wildcard सक्रिय असताना dashboard कोणती runtime चेतावणी दाखवतो, याचे दस्तऐवजीकरण हे पृष्ठ करते.

**अधिकृत स्रोत:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). अनुमतीसूची middleware मध्ये (`src/server/authz/pipeline.ts`) एकदाच लागू केली जाते — प्रत्येक route चे handlers स्वतः
`Access-Control-Allow-Origin` सेट करत नाहीत.

## Origin चे निराकरण कसे केले जाते

प्रत्येक request साठी middleware खालील क्रमाने `Access-Control-Allow-Origin` चे मूल्य निर्धारित करते:

1. **`CORS_ALLOW_ALL=true`** (किंवा जुने `CORS_ORIGIN=*`) → caller चे
   `Origin` परत echo केले जाते (किंवा `Origin` header नसल्यास `*`), आणि caches योग्य राहण्यासाठी `Vary: Origin` वापरले जाते. हाच `applyCorsHeaders()` chokepoint token-authenticated
   `/v1*`/`/v1beta*` surface वरील प्रत्येक body असलेल्या 2xx प्रतिसादाला
   `Vary: Accept-Encoding` देखील जोडतो (`relaxForTokenAuth`, RFC 9110 §12.5.5, issue #6737), जेणेकरून downstream/shared caches संकुचित आणि असंकुचित variants यांमध्ये योग्यरीत्या फरक करू शकतील.
2. अन्यथा, request मधील `Origin` normalize केला जातो (lower-case मध्ये रूपांतर, शेवटचा slash काढून टाकणे) आणि **एकत्रित अनुमतीसूचीशी** जुळवला जातो:
   - env **`CORS_ALLOWED_ORIGINS`** — स्वल्पविरामाने विभक्त केलेली सूची, आणि
   - runtime **`corsOrigins`** setting (Dashboard → Security → _CORS Allowed
     Origins_), जी `src/lib/config/runtimeSettings.ts` मधून
     `setRuntimeAllowedOrigins()` द्वारे inject केली जाते.
3. जुळणारे मूल्य नाही → **`Access-Control-Allow-Origin` header पाठवला जात नाही**. ब्राउझर cross-origin read अवरोधित करतो. हेच अपेक्षित fail-closed default वर्तन आहे.

| Env var                | अर्थ                                                                          |
| ---------------------- | ----------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | अनुमती द्यायच्या अचूक origins ची CSV सूची (शिफारस केलेली).                    |
| `CORS_ALLOW_ALL`       | `true`/`1` → कोणताही origin echo करा (wildcard). फक्त dev साठी.               |
| `CORS_ORIGIN`          | जुने. `*` हे `CORS_ALLOW_ALL` प्रमाणे वागते; एक मूल्य अनुमतीसूचीत जोडले जाते. |

## Threat model — `CORS_ALLOW_ALL=true` प्रत्यक्षात काय उघड करते

OWASP ची सर्वसाधारण चेतावणी ("wildcard CORS = कोणतीही site तुमचा API call करू शकते") गांभीर्याने घेणे आवश्यक आहे, परंतु OmniRoute मधील exposure **सर्वसाधारण प्रकरणापेक्षा अधिक मर्यादित** आहे, कारण implementation मधील एक ठोस बाब:

> **केंद्रीय `applyCorsHeaders()` कधीही
> `Access-Control-Allow-Credentials` पाठवत नाही.** server ने
> `Access-Control-Allow-Credentials: true` पाठवले नाही, तर browser एखादा _credentialed_
> (cookie असलेला) cross-origin प्रतिसाद उपलब्ध करून देणार नाही. OmniRoute चा shared CORS path असे कधीही करत नाही.

`CORS_ALLOW_ALL=true` असतानाही, प्रत्येक surface साठी याचा अर्थ:

| Surface                             | Auth mechanism              | Wildcard CORS चा परिणाम                                                                                                                                                                                                                  |
| ----------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard / MANAGEMENT `/api/*`     | Cookie session              | Origin echo केला जातो, परंतु **`Allow-Credentials` शिवाय** browser **credentialed read अवरोधित करतो**. एखादी दुर्भावनापूर्ण cross-origin site तुमचे authenticated dashboard प्रतिसाद **वाचू शकत नाही**, आणि session cookie उघड होत नाही. |
| Client API `/v1/*`, `/v1beta/*`     | Bearer / `x-api-key` header | आधीपासूनच **हेतुपुरस्सर** permissive (`relaxForTokenAuth`): browsers कधीही `Authorization`/`x-api-key` आपोआप जोडत नाहीत, त्यामुळे आक्रमणकर्त्याचे page तुमची key पुरवू शकत नाही. `CORS_ALLOW_ALL` याची व्याप्ती वाढवत नाही.              |
| Public read-only (`/api/health`, …) | काहीही नाही                 | संवेदनशील नाही; wildcard निरुपद्रवी आहे.                                                                                                                                                                                                 |

म्हणून `CORS_ALLOW_ALL=true` चे **उर्वरित** exposure एवढ्यापुरते मर्यादित आहे: (a)
आधीपासून unauthenticated असलेल्या data चे non-credentialed cross-origin **reads**, आणि (b)
management routes वर CORS **preflight यशस्वी होऊ देणे** — ज्यांना तरीही अशा authentication ची आवश्यकता असते जी cross-origin page पुरवू शकत नाही. shared CORS path वर हा session-hijack किंवा credential-theft vector **नाही**.

### एक वास्तविक अपवाद — `/api/v1/agents/`

Cloud-Agent routes (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) त्यांचे **स्वतःचे** CORS headers सेट करतात
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) आणि
`Access-Control-Allow-Origin: <origin>|*` सोबत
`Access-Control-Allow-Credentials: true` **पाठवतात**. हे एकमेव surface आहे जिथे origin-echo आणि credentials एकत्र अस्तित्वात आहेत आणि ते **`CORS_ALLOW_ALL` पासून स्वतंत्र** आहे. हे routes management-authenticated आहेत
(`requireManagementAuth`); dashboard off-host उपलब्ध करून देणाऱ्या operators नी हे लक्षात ठेवावे की response headers द्वारे cross-origin credentialed read ला अनुमती असलेले हे एकमेव ठिकाण आहे. हे explicit allowlist पर्यंत मर्यादित करणे या CORS मार्गदर्शनापासून स्वतंत्रपणे track केले जाते.

## प्रॉडक्शन तपासणीसूची

- **प्रॉडक्शनमध्ये कधीही `CORS_ALLOW_ALL=true` सेट करू नका.** ते सेट न केलेलेच ठेवा.
- **स्पष्ट** ओरिजिन सूची सेट करा — env var किंवा Security टॅबमधील फील्ड यांपैकी एक वापरा:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- OmniRoute एखाद्या रिव्हर्स प्रॉक्सी / टनेलच्या (nginx, Caddy, Cloudflare
  Tunnel, Tailscale) मागे चालत असल्यास, CORS हे तुमचे **एकमेव** नियंत्रण नाही —
  लूपबॅक रूट गार्ड अद्याप spawn-सक्षम रूटचे संरक्षण करतो (पाहा
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). 403 "दुरुस्त" करण्यासाठी
  `X-Forwarded-For: 127.0.0.1` बनावटपणे सेट करू नका; असे केल्याने रूट गार्डने बंद
  केलेला RCE वर्ग पुन्हा उघडतो.
- रनटाइम स्थितीची पुष्टी करा: `CORS_ALLOW_ALL=true` सक्रिय असताना डॅशबोर्डमध्ये
  Dashboard → Security → Authorization Inventory अंतर्गत **कायमस्वरूपी अंबर
  रंगाचा बॅनर** दिसतो आणि `/api/settings/authz-inventory` हे मॉनिटरिंग साधने
  पोल करू शकतील असे `cors: { allowAll, allowedOrigins }` एन्व्हलप परत करते.

## डेव्हलपमेंटची सोय — विशिष्ट स्थानिक ओरिजिनना परवानगी द्या

डेव्हलपमेंटमध्येही तुम्हाला वाइल्डकार्डची क्वचितच गरज भासते. तुम्ही वापरत असलेल्या
डेव्ह सर्व्हरनाच परवानगी द्या:

```bash
# स्थानिक OmniRoute ला कॉल करणारे Vite (5173) + Next.js (3000) डेव्ह सर्व्हर
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

शेवटचा स्लॅश दुर्लक्षित करून, ओरिजिनची केस-असंवेदनशील पद्धतीने जुळवणी केली जाते,
त्यामुळे `http://localhost:3000` आणि `http://localhost:3000/` समतुल्य आहेत. हाच CSV
रीस्टार्ट न करता रनटाइममध्ये **Dashboard → Security → CORS Allowed Origins** येथे
सेट करता येतो.

## API की विरुद्ध कुकी सेशन्स

- **Bearer / `x-api-key` (`/v1/*` इन्फरन्स पृष्ठभाग):** ब्राउझर हे कधीही
  आपोआप जोडत नाहीत. येथे CORS हा अर्थपूर्ण अडथळा नाही — API की हाच अडथळा आहे —
  म्हणूनच हा पृष्ठभाग हेतुपुरस्सर परवानगीशील ठेवला आहे, जेणेकरून ब्राउझर आणि
  Electron क्लायंट त्यांना आधीपासूनच अधिकार असलेले प्रतिसाद वाचू शकतील.
- **कुकी सेशन (डॅशबोर्ड):** फेल-क्लोज्ड डीफॉल्टने **आणि** सामायिक पाथवर
  `Access-Control-Allow-Credentials` नसल्याने संरक्षित आहे. कोणत्याही परवानगीशील
  कॉन्फिगमध्ये व्यवस्थापन/डॅशबोर्ड ओरिजिन समाविष्ट करू नका; ते पूर्णपणे
  फेल-क्लोज्डच राहिले पाहिजेत.

## उदाहरण: OmniRoute च्या पुढे रिव्हर्स प्रॉक्सी

CORS ची अंमलबजावणी OmniRoute स्वतः करते, त्यामुळे प्रॉक्सीने सामान्यतः
`Access-Control-*` हेडर जोडू किंवा पुनर्लिखित करू **नयेत** (दुहेरी हेडरमुळे
ब्राउझरमध्ये समस्या निर्माण होतात). TLS समाप्त करा आणि फॉरवर्ड करा — प्रीफ्लाइटला
OmniRoute ला प्रतिसाद देऊ द्या:

```nginx
# nginx — OmniRoute कडे फॉरवर्ड करा; येथे Access-Control-* इंजेक्ट करू नका
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # X-Forwarded-For हे 127.0.0.1 वर सेट करू नका — त्यामुळे लूपबॅक रूट गार्ड निष्प्रभ होतो.
}
```

परवानगी असलेले ब्राउझर ओरिजिन प्रॉक्सीमध्ये नव्हे, तर OmniRoute मध्ये
(`CORS_ALLOWED_ORIGINS` किंवा Security टॅब) सेट करा.

## स्रोत फाइल्स

| संबंधित बाब                               | फाइल                                                                 |
| ----------------------------------------- | -------------------------------------------------------------------- |
| अनुमतीसूची रिझोल्यूशन + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| मिडलवेअर अनुप्रयोग (सत्याचा एकमेव स्रोत)  | `src/server/authz/pipeline.ts`                                       |
| Settings → रनटाइम ओरिजिन इंजेक्शन         | `src/lib/config/runtimeSettings.ts`                                  |
| डॅशबोर्डसाठी रनटाइम स्थिती                | `src/app/api/settings/authz-inventory/route.ts`                      |
| डॅशबोर्ड चेतावणी बॅनर                     | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS Allowed Origins फील्ड                | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent चे प्रति-रूट CORS (अपवाद)     | `src/lib/cloudAgent/api.ts`                                          |

## हे देखील पहा

- [रूट गार्ड स्तर](./ROUTE_GUARD_TIERS.md) — प्रक्रिया सुरू करण्यास सक्षम असलेल्या रूट्ससाठी
  लूपबॅक अंमलबजावणी (एक स्वतंत्र, पूरक नियंत्रण).
- [अधिकृतता मार्गदर्शक](../architecture/AUTHZ_GUIDE.md) — संपूर्ण प्रमाणीकरण पाइपलाइन.
