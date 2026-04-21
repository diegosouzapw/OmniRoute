# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

यह मार्गदर्शिका**OmniRoute**की सुरक्षा करने और आपके एप्लिकेशन को सुरक्षित रूप से इंटरनेट पर उजागर करने के लिए नेटवर्क बुनियादी ढांचे के स्वर्ण मानक का दस्तावेजीकरण करती है,**बिना कोई पोर्ट खोले (जीरो इनबाउंड)**।## What was done on your VM?

हमने PM2 के माध्यम से ओमनीरूट को**स्प्लिट-पोर्ट**मोड में सक्षम किया है:

-**पोर्ट `20128`:**चलता है**केवल एपीआई**`/v1`। -**पोर्ट `20129`:**केवल प्रशासनिक डैशबोर्ड\*\*चलाता है।

इसके अलावा, आंतरिक सेवा के लिए `REQUIRE_API_KEY=true` की आवश्यकता होती है, जिसका अर्थ है कि कोई भी एजेंट डैशबोर्ड के एपीआई कुंजी टैब में उत्पन्न वैध "बेयरर टोकन" भेजे बिना एपीआई एंडपॉइंट का उपभोग नहीं कर सकता है।

यह हमें दो पूर्णतः स्वतंत्र नेटवर्क नियम बनाने की अनुमति देता है। यहीं पर**क्लाउडफ्लेयर टनल (क्लाउडफ्लेयर)**आती है।---

## 1. How to Create the Tunnel in Cloudflare

`क्लाउडफ्लेयर` उपयोगिता आपकी मशीन पर पहले से ही स्थापित है। क्लाउड में इन चरणों का पालन करें:

1. अपने**क्लाउडफ्लेयर जीरो ट्रस्ट**डैशबोर्ड (one.dash.cloudflare.com) तक पहुंचें।
2. बाएं मेनू में,**नेटवर्क > टनल**पर जाएं। 3.**एक सुरंग जोड़ें**पर क्लिक करें,**क्लाउडफ्लेयर**चुनें, और इसे `ओम्नीरूट-वीएम` नाम दें।
3. यह स्क्रीन पर "कनेक्टर स्थापित करें और चलाएं" नामक एक कमांड उत्पन्न करेगा।\*\*आपको केवल टोकन ('--टोकन' के बाद लंबी स्ट्रिंग) की प्रतिलिपि बनाने की आवश्यकता है।
4. SSH के माध्यम से अपनी वर्चुअल मशीन (या प्रॉक्समॉक्स टर्मिनल) में लॉग इन करें और निष्पादित करें: ```bash

   # Starts and permanently binds the tunnel to your account

   cloudflared service install YOUR_GIANT_TOKEN_HERE

   ```

   ```

---

## 2. Configuring Routing (Public Hostnames)

अभी भी नव निर्मित टनल स्क्रीन पर,**सार्वजनिक होस्टनाम**टैब पर जाएं और हमारे द्वारा किए गए अलगाव का लाभ उठाते हुए**दो**रूट जोड़ें:### Route 1: Secure API (Limited)

-**उपडोमेन:**`एपीआई` -**डोमेन:**`yourglobal.com` (अपना वास्तविक डोमेन चुनें) -**सेवा प्रकार:**`HTTP` -**यूआरएल:**`127.0.0.1:20128` _(आंतरिक एपीआई पोर्ट)_### Route 2: Zero Trust Dashboard (Closed)

-**उपडोमेन:**`ऑम्निरूटे` या `पैनल` -**डोमेन:**`yourglobal.com` -**सेवा प्रकार:**`HTTP` -**यूआरएल:**`127.0.0.1:20129` _(आंतरिक ऐप/विजुअल पोर्ट)_

इस बिंदु पर, "भौतिक" कनेक्टिविटी का समाधान हो गया है। आइए अब वास्तव में इसकी रक्षा करें।---

## 3. Shielding the Dashboard with Zero Trust (Access)

कोई भी स्थानीय पासवर्ड आपके डैशबोर्ड को खुले इंटरनेट से पूरी तरह से हटाने से बेहतर सुरक्षा नहीं देता है।

1. जीरो ट्रस्ट डैशबोर्ड में,**एक्सेस > एप्लिकेशन > एक एप्लिकेशन जोड़ें**पर जाएं। 2.**सेल्फ-होस्टेड**चुनें। 3.**एप्लिकेशन नाम**में, `ओम्नीरूट पैनल` दर्ज करें। 4.**एप्लिकेशन डोमेन**में, `omniroute.yourglobal.com` दर्ज करें (वही जिसे आपने "रूट 2" में उपयोग किया था)। 5.**अगला**पर क्लिक करें। 6.**नियम कार्रवाई**में, `अनुमति दें` चुनें। नियम नाम के लिए, `केवल व्यवस्थापक` दर्ज करें। 7.**शामिल करें**में, "चयनकर्ता" ड्रॉपडाउन के अंतर्गत, `ईमेल` चुनें और अपना ईमेल टाइप करें, उदाहरण के लिए `admin@spgeo.com.br`।
2. सहेजें ('एप्लिकेशन जोड़ें')।

> **इसने क्या किया:**यदि आप `omniroute.yourglobal.com` खोलने का प्रयास करते हैं, तो यह अब आपके ओमनीरूट एप्लिकेशन पर नहीं आता है! यह एक खूबसूरत क्लाउडफ्लेयर स्क्रीन पर आता है और आपसे अपना ईमेल दर्ज करने के लिए कहता है। केवल अगर आपने (या आपके द्वारा दर्ज किया गया ईमेल) वहां टाइप किया है, तो आपको आउटलुक/जीमेल में एक अस्थायी 6-अंकीय कोड प्राप्त होगा जो `20129` पोर्ट के लिए सुरंग को अनलॉक करता है।---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

ज़ीरो ट्रस्ट डैशबोर्ड एपीआई रूट (`api.yourglobal.com`) पर लागू नहीं होता है, क्योंकि यह बिना ब्राउज़र के स्वचालित टूल (एजेंट) के माध्यम से एक प्रोग्रामेटिक एक्सेस है। इसके लिए हम Cloudflare के मुख्य फ़ायरवॉल (WAF) का उपयोग करेंगे।

1.**सामान्य क्लाउडफ्लेयर डैशबोर्ड**(dash.cloudflare.com) तक पहुंचें और अपने डोमेन पर जाएं। 2. बाएँ मेनू में,**सुरक्षा > WAF > दर सीमित नियम**पर जाएँ। 3.**नियम बनाएं**पर क्लिक करें। 4.**नाम:**`ओम्नीरूट एपीआई एंटी-एब्यूज` 5.**यदि आने वाले अनुरोध मेल खाते हैं...**

- फ़ील्ड चुनें: `होस्टनाम`
- ऑपरेटर: `बराबर`
- मान: `api.yourglobal.com` 6.**समान विशेषताओं के साथ:**`आईपी` रखें।

7. सीमाओं के लिए (Limit): -**जब अनुरोध अधिक हो:**`50` -**अवधि:**`1 मिनट`
8. अंत में,**कार्रवाई**के अंतर्गत: `ब्लॉक` करें और तय करें कि ब्लॉक 1 मिनट या 1 घंटे तक रहेगा। 9.**तैनाती**.

> **इसने क्या किया:**कोई भी आपके एपीआई यूआरएल पर 60-सेकंड की अवधि में 50 से अधिक अनुरोध नहीं भेज सकता है। चूंकि आप कई एजेंट चलाते हैं और उनके पीछे की खपत पहले से ही दर सीमा तक पहुंच जाती है और टोकन को ट्रैक करती है, यह इंटरनेट एज लेयर पर सिर्फ एक उपाय है जो आपके ऑन-प्रिमाइसेस इंस्टेंस को ट्रैफ़िक के सुरंग से नीचे जाने से पहले थर्मल तनाव के कारण नीचे जाने से बचाता है।---

## Finalization

1. आपके वीएम में `/etc/ufw` में कोई खुला पोर्ट नहीं है।
2. ओमनीरूट केवल HTTPS आउटबाउंड (`क्लाउडफ्लेयर`) पर बात करता है और दुनिया से सीधे टीसीपी प्राप्त नहीं करता है।
3. OpenAI के लिए आपके अनुरोध अस्पष्ट हैं क्योंकि हमने उन्हें SOCKS5 प्रॉक्सी से गुजरने के लिए विश्व स्तर पर कॉन्फ़िगर किया है (क्लाउड को SOCKS5 की परवाह नहीं है क्योंकि यह इनबाउंड आता है)।
4. आपके वेब डैशबोर्ड में ईमेल के साथ 2-फैक्टर प्रमाणीकरण है।
5. आपका एपीआई क्लाउडफ़ेयर द्वारा दर-सीमित है और केवल बियरर टोकन का ट्रैफ़िक करता है।
