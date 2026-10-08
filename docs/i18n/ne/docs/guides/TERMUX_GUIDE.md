# Termux Headless Setup (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute लाई Termux मार्फत Android मा हेडलेस सर्भरको रूपमा चलाउन सकिन्छ। Electron डेस्कटप एप Termux मा समर्थित छैन, तर वेब ड्यासबोर्ड र OpenAI-सङ्गत API लाई स्थानीय ब्राउजर वा उही नेटवर्कमा रहेका अन्य यन्त्रहरूबाट प्रयोग गर्न सकिन्छ।

## पूर्वापेक्षाहरू

F-Droid वा GitHub releases बाट Termux स्थापना गर्नुहोस्, त्यसपछि प्याकेजहरू अद्यावधिक गर्नुहोस् र `better-sqlite3` जस्ता नेटिभ निर्भरताहरूलाई आवश्यक पर्ने बिल्ड उपकरणहरू स्थापना गर्नुहोस्।

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Node.js संस्करण:** OmniRoute लाई Node `>=22.22.2 <23 || >=24.0.0 <27` आवश्यक पर्छ (`package.json` / `SUPPORTED_NODE_RANGE` मा रहेको `engines` सँग मेल खान्छ)। Termux को `nodejs-lts` ले सामान्यतया Node 20 LTS उपलब्ध गराउँछ, जुन **अब समर्थित छैन** — यसको सट्टा `pkg install nodejs` (हालको) स्थापना गर्नुहोस् र `node --version` ले 22.x/24.x+ शृङ्खला देखाउँछ भनी पुष्टि गर्नुहोस्।

यदि नेटिभ प्याकेज कम्पाइलेसन असफल भयो भने, माथिको `pkg install` आदेश पुनः चलाउनुहोस् र त्यसपछि OmniRoute स्थापना फेरि प्रयास गर्नुहोस्।

## स्थापना

नवीनतम प्रकाशित प्याकेज सीधै चलाउनुहोस्:

```bash
npx -y omniroute@latest
```

तपाईं यसलाई ग्लोबल रूपमा पनि स्थापना गर्न सक्नुहुन्छ:

```bash
npm install -g omniroute
omniroute
```

## सञ्चालन

OmniRoute लाई हेडलेस सर्भर मोडमा सुरु गर्नुहोस्:

```bash
omniroute
```

वा:

```bash
npx omniroute
```

ड्यासबोर्डले यहाँ अनुरोधहरू सुन्छ:

```text
http://localhost:20128
```

त्यो URL Android ब्राउजरमा खोल्नुहोस्। यदि तपाईं Termux भित्र क्लाइन्टहरू चलाउनुहुन्छ भने, OpenAI-सङ्गत आधार URL का रूपमा उही होस्ट र पोर्ट प्रयोग गर्नुहोस्।

## पृष्ठभूमिमा सञ्चालन

साधारण पृष्ठभूमि प्रक्रियाका लागि:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

यसलाई रोक्न:

```bash
pkill -f omniroute
```

यन्त्र बुट भएपछि स्वतः सुरु गराउन Termux:Boot एड-अन स्थापना गर्नुहोस् र बुट स्क्रिप्ट सिर्जना गर्नुहोस्:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Android को ब्याट्री अप्टिमाइजेसनले लामो समयसम्म चल्ने पृष्ठभूमि प्रक्रियाहरू रोक्न सक्छ। सर्भर अनलाइन रहिरहनुपर्ने भए Termux का लागि ब्याट्री अप्टिमाइजेसन असक्षम गर्नुहोस्।

## अन्य यन्त्रहरूबाट पहुँच

WiFi नेटवर्कमा फोनको IP ठेगाना पत्ता लगाउनुहोस्:

```bash
ip addr show wlan0
```

त्यसपछि अर्को यन्त्रबाट ड्यासबोर्ड खोल्नुहोस्:

```text
http://PHONE_IP:20128
```

उदाहरणका लागि:

```text
http://192.168.1.50:20128
```

फोन र क्लाइन्टलाई उही विश्वसनीय नेटवर्कमा राख्नुहोस्। यदि तपाईं OmniRoute लाई फोनबाहिर पहुँचयोग्य बनाउनुहुन्छ भने, API कुञ्जीहरू र ड्यासबोर्ड प्रमाणीकरण सक्षम गर्नुहोस्।

## डेटा डाइरेक्टरी

पूर्वनिर्धारित रूपमा OmniRoute ले Linux मा प्रयोग गरिने सर्भर-साइड डेटा पथको जस्तै व्यवहार अनुसरण गर्दै Termux होम डाइरेक्टरीअन्तर्गत डेटा भण्डारण गर्छ। डेटाबेसलाई स्पष्ट रूपमा निर्दिष्ट स्थानमा राख्न:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## सीमितताहरू

- Electron Termux मा चल्दैन।
- सिस्टम ट्रे वा डेस्कटप एकीकरण उपलब्ध छैन।
- यो सेटअप सर्भरका लागि मात्र हो: ब्राउजर ड्यासबोर्ड प्रयोग गर्नुहोस्।
- नेटिभ निर्भरताहरूलाई स्थानीय कम्पाइलेसन आवश्यक पर्न सक्छ।
- कम मेमोरी भएका Android यन्त्रहरूमा कम सङ्ख्यामा समवर्ती अनुरोधहरू प्रयोग गर्नुपर्ने हुन सक्छ।
- MITM/सिस्टम प्रमाणपत्र सुविधाहरूलाई Termux बाहिर Android-स्तरीय ट्रस्ट-स्टोरसम्बन्धी काम आवश्यक पर्न सक्छ।

## समस्या निवारण

### असमर्थित प्लेटफर्म: android (हरेक अनुरोधले HTTP 500 फर्काउँछ)

**लक्षण:** `omniroute` / `omniroute serve` ले `✔ OmniRoute is running!` प्रिन्ट गर्छ, तर हरेक ड्यासबोर्ड वा API अनुरोधले खाली `500 Internal Server Error` फर्काउँछ। `~/.omniroute/logs/application/app.log` खाली रहन्छ, `APP_LOG_LEVEL=debug` ले उपयोगी केही पनि प्रिन्ट गर्दैन, र प्रतिक्रिया बडी कुनै JSON विवरणबिनाको सादा पाठ (`Internal Server Error`) हुन्छ।

**कारण:** केही Termux/Node बिल्डहरूले `process.platform === "android"` रिपोर्ट गर्छन्। Next.js को `getCacheDirectory()` ले त्यो प्लेटफर्म सम्हाल्दैन: यसलाई `~/.cache` (वा सामान्य tmp डाइरेक्टरी) _पहिल्यै_ अवस्थित हुनु आवश्यक हुन्छ, अन्यथा इन्स्ट्रुमेन्टेसन हुक लोड गर्दा यो त्रुटिसहित असफल हुन्छ:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

हुक कहिल्यै लोड नहुने भएकाले लगिङ कहिल्यै सुरु हुँदैन — त्यसैले 500 त्रुटिको कारण पत्ता लगाउन पूर्ण रूपमा असम्भवजस्तो देखिन्छ। Android/Termux मा यो जाँच सफल होस् भनेर OmniRoute ले Next.js सुरु हुनुअघि CLI प्रवेशबिन्दुमा `~/.cache` सिर्जना गर्छ (र सेट नगरिएको अवस्थामा `XDG_CACHE_HOME` सेट गर्छ)।

**समर्थित समाधान (प्याकेज प्याच नगरी):**

```bash
mkdir -p ~/.cache
omniroute serve
```

हालका OmniRoute बिल्डहरूमा CLI ले Android/Termux मा यो स्वतः गर्छ — नयाँ `npx -y omniroute@latest` / ग्लोबल स्थापनामा यो चरण म्यानुअल रूपमा गर्न आवश्यक पर्नु हुँदैन। अपग्रेड गरेपछि पनि त्रुटि देखिन्छ भने, माथि देखाइएअनुसार एक पटक `~/.cache` सिर्जना गर्नुहोस् र पुनः सुरु गर्नुहोस्।

`process.platform = "linux"` जबर्जस्ती सेट गर्न `dist/server.js` लाई प्याच **नगर्नुहोस्**। प्रत्येक पुनःस्थापना/अपग्रेडमा यस्तो प्याकेज प्याच अधिलेखन हुन्छ र क्यास डाइरेक्टरी अवस्थित भएपछि यसको आवश्यकता पर्दैन।

### better-sqlite3 बिल्ड त्रुटिहरू

Termux बिल्ड टुलचेन स्थापना गर्नुहोस्:

```bash
pkg install nodejs python build-essential
```

त्यसपछि पुनः चलाउनुहोस्:

```bash
npx -y omniroute@latest
```

### पोर्ट पहिले नै प्रयोगमा छ

पूर्वनिर्धारित पोर्टमा के चलिरहेको छ भनी जाँच गर्नुहोस्:

```bash
ss -ltnp | grep 20128
```

पुरानो प्रक्रिया रोक्नुहोस्:

```bash
pkill -f omniroute
```

### अर्को यन्त्रबाट ड्यासबोर्डमा पहुँच हुन सकेन

दुवै यन्त्र उही WiFi नेटवर्कमा छन् भनी पुष्टि गर्नुहोस्, त्यसपछि Termux बाट परीक्षण गर्नुहोस्:

```bash
curl http://localhost:20128
```

स्थानीय पहुँचले काम गर्छ तर LAN पहुँचले गर्दैन भने, Android हटस्पट/WiFi आइसोलेसन र फोनमा रहेको कुनै पनि फायरवाल वा VPN प्रोफाइल जाँच गर्नुहोस्।
