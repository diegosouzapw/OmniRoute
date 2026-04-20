# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

हे मार्गदर्शक**OmniRoute**चे संरक्षण करण्यासाठी आणि**कोणतेही पोर्ट (शून्य इनबाउंड)**न उघडता, इंटरनेटवर सुरक्षितपणे उघड करण्यासाठी नेटवर्क पायाभूत सुविधांच्या सुवर्ण मानकांचे दस्तऐवजीकरण करते.## What was done on your VM?

आम्ही PM2 द्वारे**स्प्लिट-पोर्ट**मोडमध्ये OmniRoute सक्षम केले:

-**पोर्ट `20128`:\*\***केवळ API**`/v1` चालते. -**पोर्ट `२०१२९`:\***\*केवळ प्रशासकीय डॅशबोर्ड**चालते.

शिवाय, अंतर्गत सेवेसाठी `REQUIRE_API_KEY=true` आवश्यक आहे, याचा अर्थ कोणताही एजंट डॅशबोर्डच्या API की टॅबमध्ये व्युत्पन्न केलेले कायदेशीर "बेअरर टोकन" पाठविल्याशिवाय API एंडपॉइंट्स वापरू शकत नाही.

हे आम्हाला दोन पूर्णपणे स्वतंत्र नेटवर्क नियम तयार करण्यास अनुमती देते. इथेच**क्लाउडफ्लेअर टनेल (क्लाउडफ्लेअर)**येतो.---

## 1. How to Create the Tunnel in Cloudflare

तुमच्या मशीनवर `क्लाउडफ्लॅरेड` युटिलिटी आधीपासूनच स्थापित आहे. क्लाउडमध्ये या चरणांचे अनुसरण करा:

1. तुमच्या**Cloudflare Zero Trust**डॅशबोर्डवर प्रवेश करा (one.dash.cloudflare.com).
2. डाव्या मेनूमध्ये,**नेटवर्क > बोगदे**वर जा. 3.**Add a Tunnel**वर क्लिक करा,**Cloudflared**निवडा आणि त्याला `OmniRoute-VM` नाव द्या.
3. ते स्क्रीनवर "कनेक्टर स्थापित करा आणि चालवा" नावाची कमांड जनरेट करेल.**तुम्हाला फक्त टोकन कॉपी करणे आवश्यक आहे (`--टोकन` नंतरची लांब स्ट्रिंग)**.
4. SSH द्वारे तुमच्या व्हर्च्युअल मशीनमध्ये (किंवा Proxmox टर्मिनल) लॉग इन करा आणि कार्यान्वित करा: ```bash
   # Starts and permanently binds the tunnel to your account
   cloudflared service install YOUR_GIANT_TOKEN_HERE
   ```

   ```

---

## 2. Configuring Routing (Public Hostnames)

तरीही नव्याने तयार केलेल्या टनेल स्क्रीनवर,**सार्वजनिक होस्टनावे**टॅबवर जा आणि आम्ही केलेल्या विभक्ततेचा फायदा घेऊन**दोन**मार्ग जोडा:### Route 1: Secure API (Limited)

-**सबडोमेन:**`api` -**डोमेन:**`yourglobal.com` (तुमचे खरे डोमेन निवडा) -**सेवेचा प्रकार:**`HTTP` -**URL:**`127.0.0.1:20128` _(अंतर्गत API पोर्ट)_### Route 2: Zero Trust Dashboard (Closed)

-**सबडोमेन:**`ऑम्निरूट` किंवा `पॅनेल` -**डोमेन:**`yourglobal.com` -**सेवेचा प्रकार:**`HTTP` -**URL:**`127.0.0.1:20129` _(अंतर्गत ॲप/व्हिज्युअल पोर्ट)_

या टप्प्यावर, "भौतिक" कनेक्टिव्हिटीचे निराकरण केले जाते. आता खऱ्या अर्थाने त्याचे संरक्षण करूया.---

## 3. Shielding the Dashboard with Zero Trust (Access)

कोणताही स्थानिक पासवर्ड तुमच्या डॅशबोर्डला खुल्या इंटरनेटवरून प्रवेश पूर्णपणे काढून टाकण्यापेक्षा चांगले संरक्षित करत नाही.

1. झिरो ट्रस्ट डॅशबोर्डमध्ये,**प्रवेश > अनुप्रयोग > अनुप्रयोग जोडा**वर जा. 2.**सेल्फ-होस्टेड**निवडा. 3.**अनुप्रयोग नाव**मध्ये, `OmniRoute Panel` प्रविष्ट करा. 4.**अनुप्रयोग डोमेन**मध्ये, `omniroute.yourglobal.com` प्रविष्ट करा (तुम्ही "रूट 2" मध्ये वापरलेला तोच). 5.**पुढील**वर क्लिक करा.
   ६.**नियम कृती**मध्ये, `अनुमती द्या` निवडा. नियमाच्या नावासाठी, 'केवळ प्रशासन' प्रविष्ट करा. 7.**समाविष्ट करा**मध्ये, "निवडक" ड्रॉपडाउन अंतर्गत, `ईमेल` निवडा आणि तुमचा ईमेल टाइप करा, उदाहरणार्थ `admin@spgeo.com.br`.
2. जतन करा ('ॲप्लिकेशन जोडा').

> **याने काय केले:**तुम्ही `omniroute.yourglobal.com` उघडण्याचा प्रयत्न केल्यास, ते यापुढे तुमच्या OmniRoute ऍप्लिकेशनवर येणार नाही! ते तुम्हाला तुमचा ईमेल प्रविष्ट करण्यास सांगणाऱ्या शोभिवंत Cloudflare स्क्रीनवर उतरते. तुम्ही (किंवा तुम्ही एंटर केलेला ईमेल) तिथे टाईप केला असेल तरच, तुम्हाला Outlook/Gmail मध्ये एक तात्पुरता 6-अंकी कोड मिळेल जो पोर्ट `20129` करण्यासाठी बोगदा अनलॉक करेल.---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

झिरो ट्रस्ट डॅशबोर्ड API मार्ग (`api.yourglobal.com`) वर लागू होत नाही, कारण तो ब्राउझरशिवाय स्वयंचलित साधनांद्वारे (एजंट) प्रोग्रामॅटिक प्रवेश आहे. यासाठी आपण क्लाउडफ्लेअरची मुख्य फायरवॉल (WAF) वापरू.

1.**सामान्य क्लाउडफ्लेअर डॅशबोर्ड**(dash.cloudflare.com) वर प्रवेश करा आणि तुमच्या डोमेनवर जा. 2. डाव्या मेनूमध्ये,**सुरक्षा > WAF > दर मर्यादित नियम**वर जा. 3.**नियम तयार करा**वर क्लिक करा. 4.**नाव:**`OmniRoute API अँटी-अब्यूज` 5.**येणाऱ्या विनंत्या जुळत असल्यास...**

- फील्ड निवडा: 'होस्टनाव'
- ऑपरेटर: `समान`
- मूल्य: `api.yourglobal.com`
  ६.**समान वैशिष्ट्यांसह:**`IP` ठेवा.

7. मर्यादांसाठी (मर्यादा): -**जेव्हा विनंत्या ओलांडतात:**`५०` -**कालावधी:**`१ मिनिट`
8. शेवटी,**कृती**अंतर्गत: `ब्लॉक` करा आणि ब्लॉक 1 मिनिट किंवा 1 तास टिकेल का ते ठरवा. 9.**नियोजन**.

> **याने काय केले:**कोणीही तुमच्या API URL वर ६०-सेकंद कालावधीत ५० पेक्षा जास्त विनंत्या पाठवू शकत नाही. तुम्ही एकापेक्षा जास्त एजंट चालवत असल्याने आणि त्यांच्यामागील वापर आधीच दर मर्यादा गाठतो आणि टोकन ट्रॅक करतो, हे फक्त इंटरनेट एज लेयरचे एक उपाय आहे जे तुमच्या ऑन-प्रिमाइसेस इन्स्टन्सला थर्मल स्ट्रेसमुळे खाली जाण्यापासून संरक्षण करते.---

## Finalization

1. तुमच्या VM मध्ये `/etc/ufw` मध्ये**कोणतेही उघडलेले पोर्ट**नाहीत.
2. OmniRoute फक्त HTTPS आउटबाउंड (`Cloudflared`) बोलतो आणि जगाकडून थेट TCP प्राप्त करत नाही.
3. OpenAI ला तुमच्या विनंत्या अस्पष्ट आहेत कारण आम्ही त्यांना SOCKS5 प्रॉक्सीमधून जाण्यासाठी जागतिक स्तरावर कॉन्फिगर केले आहे (क्लाउडला SOCKS5 ची काळजी नाही कारण ती इनबाउंड येते).
4. तुमच्या वेब डॅशबोर्डमध्ये ईमेलसह 2-फॅक्टर प्रमाणीकरण आहे.
5. तुमचे API क्लाउडफ्लेअर द्वारे रेट-मर्यादित आहे आणि फक्त वाहक टोकन्सची वाहतूक करते.
