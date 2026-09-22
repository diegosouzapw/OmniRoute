# CLI Machine-ID Token (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## अवलोकन

OmniRoute CLI आदेशहरूले `x-omniroute-cli-token` अनुरोध हेडरमार्फत पठाइने
`HMAC-SHA256(machine-id, salt)` टोकन प्रयोग गरेर स्थानीय व्यवस्थापन API मा प्रमाणीकरण गर्छन्।

यसले CLI उप-आदेशहरूलाई (`omniroute status`, `omniroute providers`, आदि)
प्रत्येक पटक आह्वान गर्दा प्रयोगकर्ताले JWT वा पासवर्ड उपलब्ध गराउनु नपरी
व्यवस्थापन इन्डपोइन्टहरू कल गर्न दिन्छ।

## यसले कसरी काम गर्छ

1. `getMachineTokenSync()` ले `node-machine-id` मार्फत हार्डवेयर मेसिन ID पढ्छ
   (असफल भएमा खाली स्ट्रिङ प्रयोग गर्छ, जसले CLI प्रमाणीकरण निष्क्रिय पार्छ)।
2. यसले `HMAC-SHA256(machine_id, salt)` गणना गर्छ र पूरा 64-वर्णको
   हेक्स डाइजेस्ट फर्काउँछ — यो मेसिनसँग बाँधिएको निर्धार्य, उल्ट्याउन नसकिने टोकन हो।
3. समाधान गरिएको गन्तव्य स्पष्ट लुपब्याक URL (`localhost`, `127.0.0.0/8`, वा
   लुपब्याक IPv6) हुँदा मात्र CLI ले टोकनलाई `x-omniroute-cli-token` का रूपमा पठाउँछ।
   टोकन बोक्ने अनुरोधहरूले `redirect: error` प्रयोग गर्छन्, त्यसैले स्थानीय
   रिडाइरेक्टले यसलाई अर्को ओरिजिनमा फर्वार्ड गर्न सक्दैन। रिमोट कन्टेक्स्टहरूले यसको
   सट्टा स्कोप गरिएका एक्सेस टोकनहरू प्रयोग गर्छन्। डेरिभेसन उपलब्ध नभएमा, CLI ले हेडर
   समावेश गर्दैन र `omniroute doctor` ले खाली टोकनलाई मान्य ठान्नुको सट्टा
   असफलता रिपोर्ट गर्छ।
4. सर्भरले (`src/server/authz/policies/management.ts`) उही salt प्रयोग गरी
   अपेक्षित टोकन पुनः गणना गर्छ र टाइमिङमा आधारित निष्कर्षण रोक्न
   `timingSafeEqual` मार्फत तुलना गर्छ।

## सुरक्षा विशेषताहरू

| विशेषता                          | विवरण                                                                                                                                                                                                                 |
| -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **लुपब्याकमा मात्र**             | सर्भरको विश्वसनीय पियर-लोकालिटी स्ट्याम्पले (वास्तविक TCP पियर ठेगानाबाट व्युत्पन्न) लुपब्याक भएको जनाउँदा मात्र स्वीकार गरिन्छ। लोकालिटी निर्धारणका लागि क्लाइन्ट-नियन्त्रित `Host` हेडरलाई कहिल्यै विश्वास गरिँदैन। |
| **स्थिर-समय तुलना**              | `crypto.timingSafeEqual` ले टाइमिङ आक्रमणहरू रोक्छ।                                                                                                                                                                   |
| **उल्ट्याउन नसकिने**             | HMAC आउटपुटबाट machine-id पुनःप्राप्त गर्न सकिँदैन।                                                                                                                                                                   |
| **`always`-सुरक्षित बाइपास छैन** | CLI टोकन जाँच गर्नुअघि `isAlwaysProtectedPath()` मूल्याङ्कन गरिन्छ। `/api/shutdown` र `/api/settings/database` का लागि सधैँ JWT आवश्यक हुन्छ।                                                                         |
| **निर्यात गर्न नसकिने**          | टोकनलाई कहिल्यै डिस्कमा लेखिँदैन वा लग गरिँदैन।                                                                                                                                                                       |

## पूर्वनिर्धारित salt (प्रत्येक इन्स्टलमा अनियमित)

`OMNIROUTE_CLI_SALT` सेट नगरिएको अवस्थामा, salt एक पटक उत्पन्न गरिएको अनियमित
64-वर्णको हेक्स स्ट्रिङ हो, जसलाई `<DATA_DIR>/cli-token-salt.json` (`0600` मोड) मा
स्थायी रूपमा भण्डारण गरिन्छ — रिपोजिटरीमा समावेश गरिएको लिटरल
`omniroute-cli-auth-v1` होइन। `src/lib/machineToken.ts` मा रहेको `getActiveSalt()`
र `bin/cli/utils/cliToken.mjs` मा रहेको यसको प्रतिरूप दुवैले एउटै फाइल पढ्छन्,
त्यसैले यस इन्स्टलमा सर्भर र CLI को प्रत्येक आह्वान एउटै मानमा अभिसरित हुन्छन्;
स्थायी रूपमा भण्डारण गरिएको वा env salt अझै स्थापना गर्न नसकिएको अवस्थामा मात्र
रिपोजिटरीमा समावेश गरिएको लिटरललाई अन्तिम विकल्पका रूपमा प्रयोग गरिन्छ (उदाहरणका
लागि, सर्भर कहिल्यै नचलेको नयाँ CLI-मात्र इन्स्टल)। यसले पुरानो स्थिर लिटरल
पूर्वनिर्धारितको कमजोरी हटाउँछ: `/etc/machine-id` प्रायः सबैले पढ्न मिल्ने हुन्छ,
त्यसैले अन्यथा कुनै पनि स्थानीय प्रयोगकर्ताले `OMNIROUTE_CLI_SALT` कहिल्यै सेट
नगरेको हरेक इन्स्टलका लागि उही टोकन निकाल्न सक्थ्यो।

## Salt रोटेसन

कोड परिवर्तन नगरी व्युत्पन्न टोकन रोटेट गर्न `OMNIROUTE_CLI_SALT` सेट गर्नुहोस् — यसले
सधैँ सुरक्षित रूपमा भण्डारण गरिएको प्रति-इन्स्टल salt भन्दा प्राथमिकता लिन्छ। रोटेसनपछि, यस
मेसिनका सबै CLI प्रक्रियाहरूले स्वचालित रूपमा नयाँ टोकन प्रयोग गर्नेछन्। अघिल्लो व्युत्पन्न मान
उजागर भएको हुन सक्ने प्रक्रिया-सूची चुहावटपछि यो उपयोगी हुन्छ।

```bash
# स्थायी रोटेसन (shell profile मा थप्नुहोस्)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# नयाँ टोकन प्रयोग भइरहेको छ भनी प्रमाणित गर्नुहोस्
omniroute status
```

## पुरानो ढाँचा (SHA-256, 32-अक्षर) — अझै पनि स्वीकार्य

माथिको HMAC ढाँचाअघि, CLI ले आफ्नो टोकन
`SHA-256(machineId + salt).hex[0..32]` (`bin/cli/utils/cliToken.mjs` मा रहेको
32-अक्षरको उपसर्ग; `src/lib/machineToken.ts` मा `getLegacyCliTokenSync`) का रूपमा व्युत्पन्न गर्थ्यो।

पछाडितर्फको अनुकूलताका लागि सर्भरले **दुवै** ढाँचा स्वीकार गर्छ: प्रमाणीकरणकर्ताले
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` बनाउँछ र
आगमन हेडरलाई प्रत्येकसँग `timingSafeEqual` प्रयोग गरेर तुलना गर्छ
(`src/server/authz/policies/management.ts` र `src/lib/middleware/cliTokenAuth.ts`)।
त्यसैले, कुनै टोकन 64-अक्षरको HMAC digest वा 32-अक्षरको
पुरानो SHA-256 उपसर्गमध्ये **कुनै एकसँग** मेल खाएमा मान्य हुन्छ।

**बाहिरिने विकल्प:** CLI टोकन संयन्त्र पूर्ण रूपमा असक्षम गर्न `OMNIROUTE_DISABLE_CLI_TOKEN=true`
(env वा `.env`) सेट गर्नुहोस्; त्यसपछि सबै पहुँचका लागि स्पष्ट API key आवश्यक हुन्छ। बहु-प्रयोगकर्ता
होस्टहरूमा यो सिफारिस गरिन्छ, किनकि `machine-id` प्रति-उपकरण हुन्छ (प्रति-प्रयोगकर्ता होइन) र सोही
होस्टमा रहेको अर्को प्रयोगकर्ताले उही टोकन गणना गर्न सक्छ।

## फाइलहरू

| फाइल                                      | उद्देश्य                                           |
| ----------------------------------------- | -------------------------------------------------- |
| `src/lib/machineToken.ts`                 | टोकन व्युत्पत्ति (`getMachineTokenSync`)           |
| `bin/cli/utils/cliToken.mjs`              | उही व्युत्पत्तिको CLI-पक्षीय प्रतिरूप              |
| `<DATA_DIR>/cli-token-salt.json`          | सुरक्षित रूपमा भण्डारित अनियमित प्रति-इन्स्टल salt |
| `src/server/authz/headers.ts`             | `CLI_TOKEN_HEADER` स्थिराङ्क                       |
| `src/server/authz/policies/management.ts` | सर्भर-पक्षीय प्रमाणीकरण                            |
| `src/server/authz/routeGuard.ts`          | Loopback होस्ट जाँच (`isLoopbackHost`)             |

## यो पनि हेर्नुहोस्

- `docs/security/ROUTE_GUARD_TIERS.md` — route सुरक्षा तहहरू
- `docs/architecture/AUTHZ_GUIDE.md` — पूर्ण authorization pipeline
