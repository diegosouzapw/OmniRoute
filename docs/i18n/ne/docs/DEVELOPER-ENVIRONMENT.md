# Developer environment notes (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇦 [bs](../../bs/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [mr](../../mr/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

यो पृष्ठले परियोजनाको स्थानीय `.env` व्यवहार र OmniRoute विकास गर्दा वातावरण फाइलहरू तथा गोप्य जानकारी कसरी व्यवस्थापन गर्ने भन्नेबारे व्याख्या गर्छ।

## .env postinstall व्यवहार

विकासकर्ताको सुविधाका लागि परियोजनाले `npm install` / `postinstall` को समयमा स्थानीय `.env` फाइल सिर्जना गर्न सक्छ। यो फाइल स्थानीय विकास र परीक्षणका लागि मात्र हो र यसलाई संस्करण नियन्त्रणमा कहिल्यै कमिट गर्नु हुँदैन।

मुख्य बुँदाहरू:

- रिपोजिटरीको `.gitignore` ले पहिले नै `.env*` फाइलहरूलाई बेवास्ता गर्छ (`.gitignore` प्रविष्टि हेर्नुहोस्)। तपाईंले कुनै विशिष्ट उदाहरण फाइल कमिट गर्ने स्पष्ट उद्देश्य राख्नुभएको र त्यसका लागि दस्तावेजीकृत प्रक्रिया भएको अवस्थामा बाहेक उक्त नियम नहटाउनुहोस् वा परिवर्तन नगर्नुहोस्।
- यदि वास्तविक गोप्य जानकारी भूलवश रिपोमा कमिट भयो भने, क्रेडेन्सियललाई तुरुन्तै परिवर्तन/खारेज गर्नुहोस् र त्यसलाई रिपोजिटरी इतिहासबाट हटाउनुहोस् (उदाहरणका लागि, `git filter-repo` वा समान सुधारात्मक कार्यप्रवाह प्रयोग गरेर)। मद्दत आवश्यक भएमा सुरक्षा/सम्पर्क जिम्मेवार व्यक्तिलाई सम्पर्क गर्नुहोस्।
- CI र उत्पादनका लागि, गोप्य जानकारी फाइलहरूमा कमिट गर्नुको सट्टा CI गोप्य जानकारी वा गोप्य जानकारी व्यवस्थापक (GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault, आदि) प्रयोग गर्नुहोस्।

## सिफारिस गरिएको स्थानीय कार्यप्रवाह

- `.env` लाई आफ्नो स्थानीय कार्यक्षेत्रमा मात्र राख्नुहोस्। आवश्यक भेरिएबलहरू र स्वीकार्य उदाहरण मानहरू दस्तावेजीकरण गर्न `.env.example` (पहिले नै ट्र्याक गरिएको) प्रयोग गर्नुहोस्।
- स्थानीय रूपमा गोप्य जानकारी-जस्ता मानहरू आवश्यक पर्ने परीक्षणहरू चलाउँदा, वास्तविक क्रेडेन्सियलहरूको सट्टा कृत्रिम प्लेसहोल्डरहरू वा रनटाइममा सिर्जना गरिएका अस्थायी कुञ्जीहरू प्रयोग गर्न प्राथमिकता दिनुहोस्।
- प्लेसहोल्डरहरू प्रयोग गर्ने परीक्षणहरूमा छोटो टिप्पणी थप्नुहोस्, ताकि समीक्षकहरूले फिक्स्चर कृत्रिम हो भन्ने बुझून्।

## स्क्यानरसम्बन्धी टिप्पणीहरू

- केही कम्पाइल गरिएका वा बाइनरी एसेटहरूमा (जस्तै, इम्बेड गरिएका base64 WASM ब्लबहरू) क्रेडेन्सियलजस्ता देखिने ASCII सबस्ट्रिङहरू हुन सक्छन् र तिनले पाठ-आधारित गोप्य जानकारी स्क्यानरहरूलाई सक्रिय गर्न सक्छन्। यी एसेटहरू वैध हुन् भने, तिनलाई स्क्यानरको अनुमति-सूचीमा चिन्ह लगाउनुहोस् वा स्क्यानर कन्फिगमा सम्बन्धित डाइरेक्टरीहरू बहिष्कार गर्नुहोस्।

## चुहावट फेला पारेमा

1. कुञ्जीलाई तुरुन्तै परिवर्तन/खारेज गर्नुहोस्।
2. इतिहासबाट गोप्य जानकारी हटाउनुहोस् र आवश्यक भएमा सफा गरिएको शाखालाई बलपूर्वक पुश गर्नुहोस्।
3. मर्मतकर्ताहरूलाई सूचित गर्नुहोस् र आफ्नो संस्थाको घटना-प्रतिक्रिया जाँचसूची पालना गर्नुहोस्।
