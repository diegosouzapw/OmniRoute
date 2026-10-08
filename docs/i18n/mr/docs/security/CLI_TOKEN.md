# CLI Machine-ID Token (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇧🇦 [bs](../../../bs/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## आढावा

OmniRoute CLI आदेश स्थानिक व्यवस्थापन API विरुद्ध प्रमाणीकरण करण्यासाठी
`x-omniroute-cli-token` विनंती शीर्षलेखाद्वारे पाठवलेले
`HMAC-SHA256(machine-id, salt)` टोकन वापरतात.

यामुळे CLI उप-आदेशांना (`omniroute status`, `omniroute providers`, इत्यादी)
प्रत्येक आवाहनाच्या वेळी वापरकर्त्याने JWT किंवा पासवर्ड देण्याची आवश्यकता न ठेवता
व्यवस्थापन एंडपॉइंट्स कॉल करता येतात.

## हे कसे कार्य करते

1. `getMachineTokenSync()` हे `node-machine-id` द्वारे हार्डवेअर मशीन ID वाचते
   (अपयश आल्यास रिक्त स्ट्रिंग वापरते, ज्यामुळे CLI प्रमाणीकरण अक्षम होते).
2. ते `HMAC-SHA256(machine_id, salt)` ची गणना करते आणि पूर्ण 64-वर्णांचा
   हेक्स डायजेस्ट परत करते — या मशीनशी जोडलेले निर्धारक, अपरिवर्तनीय टोकन.
3. निराकरण केलेले गंतव्य स्पष्ट लूपबॅक URL (`localhost`, `127.0.0.0/8`, किंवा
   लूपबॅक IPv6) असेल, तेव्हाच CLI टोकन `x-omniroute-cli-token` म्हणून पाठवते.
   टोकन असलेल्या विनंत्या `redirect: error` वापरतात, त्यामुळे स्थानिक
   रीडायरेक्ट ते दुसऱ्या ओरिजिनकडे अग्रेषित करू शकत नाही. दूरस्थ संदर्भ त्याऐवजी
   व्याप्तीबद्ध प्रवेश टोकन वापरतात. व्युत्पत्ती उपलब्ध नसल्यास, CLI शीर्षलेख
   वगळते आणि रिक्त टोकन वैध मानण्याऐवजी `omniroute doctor` अपयश नोंदवते.
4. सर्व्हर (`src/server/authz/policies/management.ts`) त्याच सॉल्टसह अपेक्षित
   टोकनची पुन्हा गणना करतो आणि वेळेवर आधारित निष्कर्षण रोखण्यासाठी
   `timingSafeEqual` द्वारे तुलना करतो.

## सुरक्षा गुणधर्म

| गुणधर्म                           | तपशील                                                                                                                                                                                                                 |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **केवळ लूपबॅक**                   | सर्व्हरचा विश्वसनीय पीअर-स्थानिकता स्टॅम्प (प्रत्यक्ष TCP पीअर पत्त्यावरून मिळवलेला) लूपबॅक दर्शवतो, तेव्हाच स्वीकारले जाते. स्थानिकता ठरवण्यासाठी क्लायंट-नियंत्रित `Host` शीर्षलेखावर कधीही विश्वास ठेवला जात नाही. |
| **स्थिर-वेळ तुलना**               | `crypto.timingSafeEqual` वेळाधारित हल्ले प्रतिबंधित करते.                                                                                                                                                             |
| **अपरिवर्तनीय**                   | HMAC आउटपुटमधून machine-id पुनर्प्राप्त करता येत नाही.                                                                                                                                                                |
| **`always`-संरक्षित बायपास नाही** | CLI टोकन तपासणीपूर्वी `isAlwaysProtectedPath()` चे मूल्यमापन केले जाते. `/api/shutdown` आणि `/api/settings/database` साठी नेहमी JWT आवश्यक असते.                                                                      |
| **निर्यात न करता येणारे**         | टोकन कधीही डिस्कवर लिहिले किंवा लॉग केले जात नाही.                                                                                                                                                                    |

## डीफॉल्ट सॉल्ट (प्रत्येक इन्स्टॉलेशनसाठी यादृच्छिक)

`OMNIROUTE_CLI_SALT` सेट केलेले नसताना, सॉल्ट ही एकदा व्युत्पन्न करून
`<DATA_DIR>/cli-token-salt.json` येथे (मोड `0600`) कायमस्वरूपी जतन केलेली यादृच्छिक
64-वर्णांची हेक्स स्ट्रिंग असते — चेक-इन केलेला लिटरल `omniroute-cli-auth-v1` नव्हे.
`src/lib/machineToken.ts` मधील `getActiveSalt()` आणि
`bin/cli/utils/cliToken.mjs` मधील त्याचे प्रतिबिंब, दोन्ही एकच फाइल वाचतात, त्यामुळे
सर्व्हर आणि या इन्स्टॉलेशनवरील प्रत्येक CLI आवाहन समान मूल्यावर एकत्रित होतात;
कायमस्वरूपी जतन केलेला किंवा env सॉल्ट अद्याप स्थापित करता येत नसेल, तेव्हाच
चेक-इन केलेला लिटरल अंतिम पर्याय म्हणून वापरला जातो (उदाहरणार्थ, सर्व्हर कधीही
चालवण्यापूर्वीचे नवीन केवळ-CLI इन्स्टॉलेशन). यामुळे जुन्या निश्चित लिटरल
डीफॉल्टमधील कमकुवतपणा दूर होतो: `/etc/machine-id` सामान्यतः प्रत्येकाला वाचता येतो,
त्यामुळे `OMNIROUTE_CLI_SALT` कधीही सेट न केलेल्या प्रत्येक इन्स्टॉलेशनसाठी कोणताही
स्थानिक वापरकर्ता अन्यथा तेच टोकन व्युत्पन्न करू शकला असता.

## सॉल्ट रोटेशन

कोडमध्ये बदल न करता व्युत्पन्न केलेले टोकन रोटेट करण्यासाठी `OMNIROUTE_CLI_SALT` सेट करा — त्याला नेहमीच प्रत्येक इंस्टॉलेशनसाठी जतन केलेल्या सॉल्टपेक्षा प्राधान्य दिले जाते. रोटेशननंतर, या मशीनवरील सर्व CLI प्रक्रिया नवीन टोकन स्वयंचलितपणे वापरतील. मागील व्युत्पन्न केलेले मूल्य उघड झाले असण्याची शक्यता असलेल्या प्रोसेस-लिस्ट गळतीनंतर हे उपयुक्त ठरते.

```bash
# कायमस्वरूपी रोटेशन (शेल प्रोफाइलमध्ये जोडा)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# नवीन टोकन वापरले जात असल्याची पडताळणी करा
omniroute status
```

## जुना फॉरमॅट (SHA-256, 32-अक्षरी) — अजूनही स्वीकारला जातो

वरील HMAC फॉरमॅटपूर्वी, CLI त्याचे टोकन
`SHA-256(machineId + salt).hex[0..32]` (32-अक्षरी उपसर्ग) या स्वरूपात
`bin/cli/utils/cliToken.mjs` मध्ये व्युत्पन्न करत असे (`src/lib/machineToken.ts` मधील `getLegacyCliTokenSync`).

मागील आवृत्त्यांशी सुसंगततेसाठी सर्व्हर **दोन्ही** फॉरमॅट स्वीकारतो: सत्यापनकर्ता
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` तयार करतो आणि
येणाऱ्या हेडरची प्रत्येकाशी `timingSafeEqual` वापरून तुलना करतो
(`src/server/authz/policies/management.ts` आणि `src/lib/middleware/cliTokenAuth.ts`).
त्यामुळे टोकन 64-अक्षरी HMAC डायजेस्ट किंवा 32-अक्षरी जुना SHA-256 उपसर्ग यांपैकी **कोणत्याही एकाशी** जुळल्यास ते वैध असते.

**बाहेर पडण्याचा पर्याय:** CLI टोकन यंत्रणा पूर्णपणे अक्षम करण्यासाठी `OMNIROUTE_DISABLE_CLI_TOKEN=true` (`env` किंवा `.env`) सेट करा; त्यानंतर सर्व प्रवेशासाठी स्पष्ट API की आवश्यक असेल. बहु-वापरकर्ता होस्टवर याची शिफारस केली जाते, कारण `machine-id` हे प्रत्येक डिव्हाइससाठी असते (प्रत्येक वापरकर्त्यासाठी नाही) आणि त्याच होस्टवरील दुसरा वापरकर्ता तेच टोकन संगणित करू शकतो.

## फाइल्स

| फाइल                                      | उद्देश                                             |
| ----------------------------------------- | -------------------------------------------------- |
| `src/lib/machineToken.ts`                 | टोकन व्युत्पत्ती (`getMachineTokenSync`)           |
| `bin/cli/utils/cliToken.mjs`              | त्याच व्युत्पत्तीचे CLI-बाजूवरील प्रतिबिंब         |
| `<DATA_DIR>/cli-token-salt.json`          | प्रत्येक इंस्टॉलेशनसाठी जतन केलेला यादृच्छिक सॉल्ट |
| `src/server/authz/headers.ts`             | `CLI_TOKEN_HEADER` स्थिरांक                        |
| `src/server/authz/policies/management.ts` | सर्व्हर-बाजूवरील पडताळणी                           |
| `src/server/authz/routeGuard.ts`          | लूपबॅक होस्ट तपासणी (`isLoopbackHost`)             |

## हे देखील पहा

- `docs/security/ROUTE_GUARD_TIERS.md` — रूट संरक्षण स्तर
- `docs/architecture/AUTHZ_GUIDE.md` — संपूर्ण अधिकृतता पाइपलाइन
