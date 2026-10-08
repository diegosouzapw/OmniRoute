# Developer environment notes (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇦 [bs](../../bs/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

यह पृष्ठ प्रोजेक्ट के स्थानीय `.env` व्यवहार और OmniRoute विकसित करते समय एनवायरनमेंट फ़ाइलों तथा सीक्रेट्स को संभालने के तरीके की व्याख्या करता है।

## .env postinstall व्यवहार

डेवलपर की सुविधा के लिए प्रोजेक्ट `npm install` / `postinstall` के दौरान एक स्थानीय `.env` फ़ाइल जनरेट कर सकता है। यह फ़ाइल केवल स्थानीय डेवलपमेंट और परीक्षण के लिए है तथा इसे कभी भी वर्ज़न कंट्रोल में कमिट नहीं किया जाना चाहिए।

मुख्य बिंदु:

- रिपॉज़िटरी की `.gitignore` फ़ाइल पहले से ही `.env*` फ़ाइलों को अनदेखा करती है (`.gitignore` प्रविष्टि देखें)। इस नियम को तब तक न हटाएँ या बदलें, जब तक आप जानबूझकर किसी विशिष्ट उदाहरण फ़ाइल को कमिट नहीं करना चाहते और उसके लिए आपके पास दस्तावेज़ीकृत प्रक्रिया न हो।
- यदि कोई वास्तविक सीक्रेट गलती से रेपो में कमिट हो जाता है, तो क्रेडेंशियल को तुरंत रोटेट/रिवोक करें और उसे रिपॉज़िटरी इतिहास से हटाएँ (उदाहरण के लिए, `git filter-repo` या किसी समकक्ष सुधारात्मक वर्कफ़्लो का उपयोग करके)। सहायता की आवश्यकता होने पर सुरक्षा/संपर्क स्वामी से संपर्क करें।
- CI और प्रोडक्शन के लिए, सीक्रेट्स को फ़ाइलों में कमिट करने के बजाय CI सीक्रेट्स या किसी सीक्रेट्स मैनेजर (GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault आदि) का उपयोग करें।

## अनुशंसित स्थानीय वर्कफ़्लो

- `.env` को केवल अपने स्थानीय वर्कस्पेस में रखें। आवश्यक वेरिएबल्स और स्वीकार्य उदाहरण मानों को दस्तावेज़ीकृत करने के लिए `.env.example` (जो पहले से ट्रैक की गई है) का उपयोग करें।
- स्थानीय रूप से ऐसे परीक्षण चलाते समय जिनमें सीक्रेट जैसे मान आवश्यक हों, वास्तविक क्रेडेंशियल्स के बजाय कृत्रिम प्लेसहोल्डर्स या रनटाइम पर जनरेट की गई अस्थायी कुंजियों को प्राथमिकता दें।
- प्लेसहोल्डर्स का उपयोग करने वाले परीक्षणों में एक संक्षिप्त टिप्पणी जोड़ें, ताकि समीक्षक समझ सकें कि फ़िक्स्चर कृत्रिम है।

## स्कैनर संबंधी टिप्पणियाँ

- कुछ कंपाइल की गई या बाइनरी एसेट्स (उदाहरण के लिए, एम्बेड किए गए base64 WASM ब्लॉब्स) में ऐसे ASCII सबस्ट्रिंग हो सकते हैं जो क्रेडेंशियल्स जैसे दिखाई देते हैं और टेक्स्ट-आधारित सीक्रेट स्कैनर्स को ट्रिगर कर सकते हैं। यदि ये एसेट्स वैध हैं, तो या तो इन्हें स्कैनर की allowlist में चिह्नित करें या स्कैनर कॉन्फ़िगरेशन में संबंधित डायरेक्टरियों को बाहर रखें।

## यदि आपको कोई लीक मिले

1. कुंजी को तुरंत रोटेट/रिवोक करें।
2. सीक्रेट को इतिहास से हटाएँ और आवश्यकता होने पर साफ़ की गई ब्रांच को फ़ोर्स-पुश करें।
3. अनुरक्षकों को सूचित करें और अपने संगठन की घटना-प्रतिक्रिया चेकलिस्ट का पालन करें।
