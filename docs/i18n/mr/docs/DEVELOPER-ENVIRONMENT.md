# Developer environment notes (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../DEVELOPER-ENVIRONMENT.md) · 🇪🇹 [am](../../am/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇦 [ar](../../ar/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇿 [az](../../az/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇬 [bg](../../bg/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇩 [bn](../../bn/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇦 [bs](../../bs/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇿 [cs](../../cs/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇰 [da](../../da/docs/DEVELOPER-ENVIRONMENT.md) · 🇩🇪 [de](../../de/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇷 [el](../../el/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇸 [es](../../es/docs/DEVELOPER-ENVIRONMENT.md) · 🇪🇪 [et](../../et/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇷 [fa](../../fa/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇮 [fi](../../fi/docs/DEVELOPER-ENVIRONMENT.md) · 🇫🇷 [fr](../../fr/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇪 [ga](../../ga/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [gu](../../gu/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ha](../../ha/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇱 [he](../../he/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [hi](../../hi/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇷 [hr](../../hr/docs/DEVELOPER-ENVIRONMENT.md) · 🇭🇺 [hu](../../hu/docs/DEVELOPER-ENVIRONMENT.md) · 🇦🇲 [hy](../../hy/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇩 [id](../../id/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [ig](../../ig/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇹 [it](../../it/docs/DEVELOPER-ENVIRONMENT.md) · 🇯🇵 [ja](../../ja/docs/DEVELOPER-ENVIRONMENT.md) · 🇬🇪 [ka](../../ka/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇭 [km](../../km/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [kn](../../kn/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇷 [ko](../../ko/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇹 [lt](../../lt/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇻 [lv](../../lv/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ml](../../ml/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇾 [ms](../../ms/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇹 [mt](../../mt/docs/DEVELOPER-ENVIRONMENT.md) · 🇲🇲 [my](../../my/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇵 [ne](../../ne/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇱 [nl](../../nl/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇴 [no](../../no/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [or](../../or/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [pa](../../pa/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇭 [phi](../../phi/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇱 [pl](../../pl/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇹 [pt](../../pt/docs/DEVELOPER-ENVIRONMENT.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇴 [ro](../../ro/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇺 [ru](../../ru/docs/DEVELOPER-ENVIRONMENT.md) · 🇱🇰 [si](../../si/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇰 [sk](../../sk/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇮 [sl](../../sl/docs/DEVELOPER-ENVIRONMENT.md) · 🇷🇸 [sr](../../sr/docs/DEVELOPER-ENVIRONMENT.md) · 🇸🇪 [sv](../../sv/docs/DEVELOPER-ENVIRONMENT.md) · 🇰🇪 [sw](../../sw/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [ta](../../ta/docs/DEVELOPER-ENVIRONMENT.md) · 🇮🇳 [te](../../te/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇭 [th](../../th/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇷 [tr](../../tr/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/DEVELOPER-ENVIRONMENT.md) · 🇵🇰 [ur](../../ur/docs/DEVELOPER-ENVIRONMENT.md) · 🇺🇿 [uz](../../uz/docs/DEVELOPER-ENVIRONMENT.md) · 🇻🇳 [vi](../../vi/docs/DEVELOPER-ENVIRONMENT.md) · 🇳🇬 [yo](../../yo/docs/DEVELOPER-ENVIRONMENT.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/DEVELOPER-ENVIRONMENT.md) · 🇹🇼 [zh-TW](../../zh-TW/docs/DEVELOPER-ENVIRONMENT.md)

---

हे पृष्ठ प्रकल्पाच्या स्थानिक `.env` वर्तनाचे आणि OmniRoute विकसित करताना पर्यावरण फाइल्स व गुपिते कशी हाताळावीत याचे स्पष्टीकरण देते.

## .env postinstall वर्तन

विकसकांच्या सोयीसाठी प्रकल्प `npm install` / `postinstall` दरम्यान स्थानिक `.env` फाइल तयार करू शकतो. ही फाइल केवळ स्थानिक विकास आणि चाचणीसाठी आहे आणि ती आवृत्ती नियंत्रणामध्ये कधीही commit करू नये.

महत्त्वाचे मुद्दे:

- रिपॉझिटरीची `.gitignore` फाइल आधीपासूनच `.env*` फाइल्सकडे दुर्लक्ष करते (`.gitignore` नोंद पहा). एखादी विशिष्ट उदाहरण फाइल commit करण्याचा तुमचा जाणीवपूर्वक हेतू असल्याशिवाय आणि त्यासाठी दस्तऐवजीकृत प्रक्रिया असल्याशिवाय हा नियम काढू किंवा बदलू नका.
- एखादे वास्तविक गुपित चुकून रिपॉझिटरीमध्ये commit झाल्यास, ते क्रेडेन्शियल त्वरित बदला/रद्द करा आणि रिपॉझिटरीच्या इतिहासातून ते काढून टाका (उदाहरणार्थ, `git filter-repo` किंवा समतुल्य निराकरण कार्यप्रवाह वापरून). मदतीची आवश्यकता असल्यास सुरक्षा/संपर्क मालकाशी संपर्क साधा.
- CI आणि उत्पादनासाठी, गुपिते फाइल्समध्ये commit करण्याऐवजी CI गुपिते किंवा गुपित व्यवस्थापक (GitHub Actions Secrets, Azure Key Vault, HashiCorp Vault इत्यादी) वापरा.

## शिफारस केलेला स्थानिक कार्यप्रवाह

- `.env` फक्त तुमच्या स्थानिक कार्यक्षेत्रात ठेवा. आवश्यक चल आणि स्वीकारार्ह उदाहरण मूल्यांचे दस्तऐवजीकरण करण्यासाठी `.env.example` (आधीपासूनच ट्रॅक केलेली) वापरा.
- गुपितासारख्या मूल्यांची आवश्यकता असलेल्या चाचण्या स्थानिकरीत्या चालवताना, वास्तविक क्रेडेन्शियल्सऐवजी कृत्रिम प्लेसहोल्डर्स किंवा रनटाइममध्ये तयार केलेल्या तात्पुरत्या कीज वापरण्यास प्राधान्य द्या.
- प्लेसहोल्डर्स वापरणाऱ्या चाचण्यांमध्ये एक लहान टिप्पणी जोडा, जेणेकरून समीक्षकांना हे fixture कृत्रिम असल्याचे समजेल.

## स्कॅनरविषयक नोंदी

- काही संकलित किंवा बायनरी मालमत्तांमध्ये (उदा., अंतःस्थापित base64 WASM blobs) क्रेडेन्शियल्ससारख्या दिसणाऱ्या ASCII उपस्ट्रिंग्स असू शकतात आणि त्यामुळे मजकूर-आधारित गुपित स्कॅनर्स सक्रिय होऊ शकतात. या मालमत्ता वैध असल्यास, त्यांना स्कॅनरच्या allowlist मध्ये चिन्हांकित करा किंवा स्कॅनर कॉन्फिगरेशनमधून संबंधित डिरेक्टरीज वगळा.

## गळती आढळल्यास

1. की त्वरित बदला/रद्द करा.
2. इतिहासातून गुपित काढून टाका आणि आवश्यक असल्यास स्वच्छ केलेली branch force-push करा.
3. देखभालकर्त्यांना सूचित करा आणि तुमच्या संस्थेच्या घटना-प्रतिसाद तपासणीसूचीचे पालन करा.
