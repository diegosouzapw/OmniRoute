# Zed IDE Integration in Docker Environments (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

जब OmniRoute Docker के भीतर चलता है, तो मानक "Zed कीचेन से आयात करें" प्रक्रिया विफल हो जाती है,
क्योंकि कंटेनर होस्ट OS कीचेन डेमन (Linux पर libsecret,
macOS पर Keychain, Windows पर Credential Manager) तक नहीं पहुँच सकता और होस्ट फ़ाइल सिस्टम पर मौजूद
Zed कॉन्फ़िगरेशन डायरेक्टरियाँ डिफ़ॉल्ट रूप से कंटेनर के भीतर दिखाई नहीं देती हैं।

## Docker में कीचेन आयात विफल क्यों होता है

कंटेनर के भीतर दो अवरोधक समस्याएँ होती हैं:

1. **फ़ाइल सिस्टम आइसोलेशन** — `isZedInstalled()` `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS), या Windows के समकक्ष पथ को खोजता है। ये पथ
   होस्ट पर मौजूद होते हैं और स्पष्ट रूप से वॉल्यूम-माउंट किए बिना उपलब्ध नहीं होते हैं।
2. **IPC आइसोलेशन** — कॉन्फ़िगरेशन डायरेक्टरी माउंट होने पर भी, `keytar` नेटिव
   मॉड्यूल Unix सॉकेट या D-Bus सत्र के माध्यम से OS कीचेन सेवा के साथ संचार करता है।
   इनमें से किसी को भी डिफ़ॉल्ट रूप से कंटेनर में ब्रिज नहीं किया जाता, इसलिए क्रेडेंशियल पढ़ने के प्रयास हमेशा विफल होते हैं।

OmniRoute दो ह्यूरिस्टिक्स के माध्यम से Docker परिवेश का पता लगाता है:

- `/.dockerenv` की मौजूदगी (कंटेनर शुरू होने पर Docker डेमन द्वारा लिखा जाता है)।
- `/proc/1/cgroup` में `docker` स्ट्रिंग की मौजूदगी (Linux cgroup v1)।

इनमें से कोई भी ह्यूरिस्टिक ट्रिगर होने पर, आयात रूट HTTP 422 के साथ
`zedDockerEnvironment: true` और आपको मैन्युअल टोकन आयात टैब पर जाने का निर्देश देने वाला संदेश लौटाता है।

## मैन्युअल टोकन आयात टैब का उपयोग करना

1. **डैशबोर्ड → प्रदाता → Zed** खोलें।
2. **मैन्युअल टोकन आयात** पैनल कीचेन आयात कार्ड के नीचे दिखाई देता है। जब
   OmniRoute Docker का पता लगाता है, तो कीचेन आयात के पहले विफल प्रयास के बाद यह पैनल
   अपने-आप विस्तृत हो जाता है।
3. ड्रॉपडाउन से प्रदाता चुनें (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter, या DeepSeek)।
4. पासवर्ड फ़ील्ड में API कुंजी पेस्ट करें।
5. **आयात करें** पर क्लिक करें।

कुंजी को
`Zed Manual Import (<provider>)` नाम के साथ एक नए प्रदाता कनेक्शन के रूप में सहेजा जाता है।

## Zed होस्ट पर API कुंजियाँ कहाँ संग्रहीत करता है

Zed, AI प्रदाता कुंजियों को OS कीचेन में `zed-openai`, `ai.zed.openai`,
`zed-anthropic` आदि जैसे सेवा नामों के अंतर्गत संग्रहीत करता है। मैन्युअल
आयात के लिए उन्हें प्राप्त करने हेतु, यहाँ देखें:

**Linux**

```
~/.config/zed/settings.json
```

`language_models` अनुभाग में प्रदाता कॉन्फ़िगरेशन होते हैं। Zed UI के माध्यम से
कीचेन में सहेजी गई कुंजियाँ `settings.json` में सादे टेक्स्ट के रूप में नहीं होतीं; उन्हें
GNOME Keyring / Seahorse जैसे कीचेन व्यूअर के माध्यम से, या निम्नलिखित चलाकर प्राप्त करें:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

`zed` खोजकर **Keychain Access.app** में कीचेन प्रविष्टियाँ पाई जा सकती हैं।

## वॉल्यूम-माउंट विकल्प (उन्नत)

आप वैकल्पिक रूप से Zed कॉन्फ़िगरेशन डायरेक्टरी को केवल-पढ़ने योग्य मोड में कंटेनर के भीतर माउंट कर सकते हैं।
यह कीचेन समस्या को ठीक नहीं करता, लेकिन गैर-गोपनीय Zed कॉन्फ़िगरेशन मानों
(जैसे, मॉडल प्राथमिकताएँ) को पढ़ने वाली भावी सुविधाओं के लिए उपयोगी हो सकता है।

```yaml
# docker-compose.yml का अंश
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux होस्ट
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # macOS होस्ट (इसके बजाय इसे अनकमेंट करें)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # भविष्य में: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

ध्यान दें: `ZED_CONFIG_PATH` पर्यावरण चर ओवरराइड अभी लागू नहीं किया गया है। यह
अंश उस सुविधा के जोड़े जाने पर संदर्भ के लिए प्रदान किया गया है।

## मैन्युअल आयात API

मैन्युअल आयात एंडपॉइंट को सीधे भी कॉल किया जा सकता है:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "मेरी Zed OpenAI कुंजी"   // वैकल्पिक
}
```

सफल होने पर यह लौटाता है:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## समस्या निवारण

| लक्षण                              | कारण                             | समाधान                                 |
| ---------------------------------- | -------------------------------- | -------------------------------------- |
| 422 + `zedDockerEnvironment: true` | Docker के भीतर चल रहा है         | मैन्युअल टोकन आयात टैब का उपयोग करें   |
| 404 + `zedInstalled: false`        | होस्ट पर Zed इंस्टॉल नहीं है     | Zed इंस्टॉल करें या मैन्युअल आयात करें |
| 403 + कीचेन एक्सेस अस्वीकृत        | OS ने कीचेन एक्सेस अस्वीकार किया | OS प्रॉम्प्ट में अनुमति दें            |
| 404 + कीचेन सेवा उपलब्ध नहीं है    | Linux पर `libsecret` अनुपलब्ध है | `libsecret-1-dev` इंस्टॉल करें         |
