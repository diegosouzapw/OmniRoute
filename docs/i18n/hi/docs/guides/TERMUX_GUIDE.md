# Termux Headless Setup (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute को Termux के माध्यम से Android पर हेडलेस सर्वर के रूप में चलाया जा सकता है। Electron डेस्कटॉप ऐप Termux में समर्थित नहीं है, लेकिन वेब डैशबोर्ड और OpenAI-संगत API स्थानीय ब्राउज़र या उसी नेटवर्क पर मौजूद अन्य डिवाइसों से काम करते हैं।

## पूर्वापेक्षाएँ

Termux को F-Droid या GitHub रिलीज़ से इंस्टॉल करें, फिर पैकेज अपडेट करें और `better-sqlite3` जैसी नेटिव निर्भरताओं के लिए आवश्यक बिल्ड टूल इंस्टॉल करें।

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Node.js संस्करण:** OmniRoute के लिए Node `>=22.22.2 <23 || >=24.0.0 <27` आवश्यक है (`package.json` में `engines` / `SUPPORTED_NODE_RANGE` से मेल खाता है)। Termux का `nodejs-lts` आमतौर पर Node 20 LTS प्रदान करता है, जो **अब समर्थित नहीं है** — इसके बजाय `pkg install nodejs` (वर्तमान संस्करण) इंस्टॉल करें और सत्यापित करें कि `node --version` किसी 22.x/24.x+ शृंखला की रिपोर्ट करता है।

यदि नेटिव पैकेज का कंपाइलेशन विफल हो जाता है, तो ऊपर दिया गया `pkg install` कमांड दोबारा चलाएँ और फिर OmniRoute को फिर से इंस्टॉल करने का प्रयास करें।

## इंस्टॉल करना

नवीनतम प्रकाशित पैकेज को सीधे चलाएँ:

```bash
npx -y omniroute@latest
```

आप इसे ग्लोबल रूप से भी इंस्टॉल कर सकते हैं:

```bash
npm install -g omniroute
omniroute
```

## चलाना

OmniRoute को हेडलेस सर्वर मोड में शुरू करें:

```bash
omniroute
```

या:

```bash
npx omniroute
```

डैशबोर्ड इस पते पर सुनता है:

```text
http://localhost:20128
```

उस URL को Android ब्राउज़र में खोलें। यदि आप Termux के भीतर क्लाइंट चलाते हैं, तो OpenAI-संगत बेस URL के रूप में उसी होस्ट और पोर्ट का उपयोग करें।

## बैकग्राउंड में चलाना

एक साधारण बैकग्राउंड प्रोसेस के लिए:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

इसे रोकने के लिए:

```bash
pkill -f omniroute
```

डिवाइस बूट होने के बाद अपने-आप शुरू करने के लिए, Termux:Boot ऐड-ऑन इंस्टॉल करें और एक बूट स्क्रिप्ट बनाएँ:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Android का बैटरी ऑप्टिमाइज़ेशन लंबे समय तक चलने वाली बैकग्राउंड प्रक्रियाओं को रोक सकता है। यदि सर्वर को ऑनलाइन बनाए रखना है, तो Termux के लिए बैटरी ऑप्टिमाइज़ेशन अक्षम करें।

## अन्य डिवाइसों से एक्सेस करना

WiFi नेटवर्क पर फ़ोन का IP पता खोजें:

```bash
ip addr show wlan0
```

फिर किसी अन्य डिवाइस से डैशबोर्ड खोलें:

```text
http://PHONE_IP:20128
```

उदाहरण के लिए:

```text
http://192.168.1.50:20128
```

फ़ोन और क्लाइंट को एक ही विश्वसनीय नेटवर्क पर रखें। यदि आप OmniRoute को फ़ोन के बाहर उपलब्ध कराते हैं, तो API कुंजियाँ और डैशबोर्ड प्रमाणीकरण सक्षम करें।

## डेटा डायरेक्टरी

डिफ़ॉल्ट रूप से OmniRoute डेटा को Termux होम डायरेक्टरी के अंतर्गत संग्रहीत करता है और वही सर्वर-साइड डेटा पाथ व्यवहार अपनाता है जो Linux पर उपयोग किया जाता है। डेटाबेस को किसी स्पष्ट स्थान पर रखने के लिए:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## सीमाएँ

- Electron, Termux में नहीं चलता।
- कोई सिस्टम ट्रे या डेस्कटॉप एकीकरण उपलब्ध नहीं है।
- यह सेटअप केवल सर्वर के लिए है: ब्राउज़र डैशबोर्ड का उपयोग करें।
- नेटिव निर्भरताओं को स्थानीय कंपाइलेशन की आवश्यकता हो सकती है।
- कम मेमोरी वाले Android डिवाइसों पर कम समवर्ती अनुरोध रखने पड़ सकते हैं।
- MITM/सिस्टम सर्टिफ़िकेट सुविधाओं के लिए Termux के बाहर Android-स्तरीय ट्रस्ट-स्टोर संबंधी कार्य की आवश्यकता हो सकती है।

## समस्या निवारण

### असमर्थित प्लेटफ़ॉर्म: android (प्रत्येक अनुरोध HTTP 500 लौटाता है)

**लक्षण:** `omniroute` / `omniroute serve`, `✔ OmniRoute is running!` प्रिंट करता है, लेकिन प्रत्येक डैशबोर्ड या API अनुरोध केवल `500 Internal Server Error` लौटाता है। `~/.omniroute/logs/application/app.log` खाली रहता है, `APP_LOG_LEVEL=debug` से कुछ उपयोगी प्रिंट नहीं होता, और प्रतिक्रिया बॉडी बिना किसी JSON विवरण के सादा टेक्स्ट (`Internal Server Error`) होती है।

**कारण:** कुछ Termux/Node बिल्ड `process.platform === "android"` रिपोर्ट करते हैं। Next.js का `getCacheDirectory()` उस प्लेटफ़ॉर्म को संभाल नहीं पाता: इसके लिए `~/.cache` (या कोई सामान्य tmp डायरेक्टरी) का _पहले से_ मौजूद होना आवश्यक है, अन्यथा इंस्ट्रूमेंटेशन हुक लोड करते समय यह निम्न त्रुटि के साथ विफल हो जाता है:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

चूँकि हुक कभी लोड नहीं होता, इसलिए लॉगिंग भी कभी शुरू नहीं होती — इस कारण 500 त्रुटि का निदान पूरी तरह असंभव दिखाई देता है। OmniRoute, Next.js शुरू होने से पहले CLI एंट्रीपॉइंट में `~/.cache` बनाता है (और सेट न होने पर `XDG_CACHE_HOME` सेट करता है), ताकि यह जाँच Android/Termux पर सफल हो सके।

**समर्थित समाधान (पैकेज में पैच किए बिना):**

```bash
mkdir -p ~/.cache
omniroute serve
```

OmniRoute के वर्तमान बिल्ड में CLI यह कार्य Android/Termux पर अपने-आप करता है — नए `npx -y omniroute@latest` / ग्लोबल इंस्टॉल के लिए यह मैन्युअल चरण आवश्यक नहीं होना चाहिए। यदि अपग्रेड करने के बाद भी यह त्रुटि दिखाई देती है, तो ऊपर बताए अनुसार एक बार `~/.cache` बनाएँ और पुनः शुरू करें।

`process.platform = "linux"` को बाध्य करने के लिए `dist/server.js` को पैच **न करें**। इस प्रकार का पैकेज पैच प्रत्येक रीइंस्टॉल/अपग्रेड पर ओवरराइट हो जाता है और कैश डायरेक्टरी मौजूद होने के बाद इसकी आवश्यकता नहीं रहती।

### better-sqlite3 बिल्ड त्रुटियाँ

Termux बिल्ड टूलचेन इंस्टॉल करें:

```bash
pkg install nodejs python build-essential
```

फिर दोबारा चलाएँ:

```bash
npx -y omniroute@latest
```

### पोर्ट पहले से उपयोग में है

जाँचें कि डिफ़ॉल्ट पोर्ट पर कौन सुन रहा है:

```bash
ss -ltnp | grep 20128
```

पुरानी प्रक्रिया रोकें:

```bash
pkill -f omniroute
```

### डैशबोर्ड किसी अन्य डिवाइस से पहुँच योग्य नहीं है

सत्यापित करें कि दोनों डिवाइस एक ही WiFi नेटवर्क पर हैं, फिर Termux से परीक्षण करें:

```bash
curl http://localhost:20128
```

यदि स्थानीय एक्सेस काम करता है, लेकिन LAN एक्सेस काम नहीं करता, तो Android हॉटस्पॉट/WiFi आइसोलेशन और फ़ोन पर मौजूद किसी भी फ़ायरवॉल या VPN प्रोफ़ाइल की जाँच करें।
