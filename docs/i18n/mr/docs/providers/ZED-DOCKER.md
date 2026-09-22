# Zed IDE Integration in Docker Environments (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

OmniRoute Docker मध्ये चालत असताना, मानक "Zed Keychain मधून आयात करा" प्रक्रिया अयशस्वी होते,
कारण कंटेनरला होस्ट OS कीचेन डेमनपर्यंत (Linux वर libsecret,
macOS वर Keychain, Windows वर Credential Manager) पोहोचता येत नाही आणि होस्ट फाइलसिस्टमवरील
Zed कॉन्फिगरेशन डिरेक्टरी डीफॉल्टनुसार कंटेनरमध्ये दृश्यमान नसतात.

## Docker मध्ये Keychain आयात का अयशस्वी होते

कंटेनरमध्ये दोन अडथळे येतात:

1. **फाइलसिस्टम विलगीकरण** — `isZedInstalled()` हे `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS), किंवा Windows वरील समतुल्य पथ शोधते. हे पथ
   होस्टवर असतात आणि स्पष्टपणे व्हॉल्यूम-माउंट केल्याशिवाय उपलब्ध नसतात.
2. **IPC विलगीकरण** — कॉन्फिगरेशन डिरेक्टरी माउंट केली असली, तरी `keytar` नेटिव्ह
   मॉड्यूल Unix सॉकेट किंवा D-Bus सेशनवरून OS कीचेन सेवेशी संवाद साधते.
   यांपैकी कोणतेही डीफॉल्टनुसार कंटेनरशी ब्रिज केलेले नसल्यामुळे, क्रेडेन्शियल वाचन नेहमी अयशस्वी होते.

OmniRoute दोन ह्युरिस्टिक्सद्वारे Docker वातावरण ओळखते:

- `/.dockerenv` ची उपस्थिती (कंटेनर सुरू होताना Docker डेमनद्वारे लिहिली जाते).
- `/proc/1/cgroup` मध्ये `docker` स्ट्रिंग आढळणे (Linux cgroup v1).

यांपैकी कोणतेही ह्युरिस्टिक ट्रिगर झाल्यास, आयात रूट HTTP 422 सह
`zedDockerEnvironment: true` आणि तुम्हाला Manual Token Import टॅबकडे निर्देशित करणारा संदेश परत करतो.

## Manual Token Import टॅब वापरणे

1. **Dashboard → Providers → Zed** उघडा.
2. कीचेन आयात कार्डच्या खाली **Manual Token Import** पॅनेल दिसते. OmniRoute ने
   Docker ओळखल्यास, कीचेन आयातीचा पहिला अयशस्वी प्रयत्न झाल्यानंतर हे पॅनेल आपोआप विस्तारित होते.
3. ड्रॉपडाउनमधून प्रोव्हायडर निवडा (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter, किंवा DeepSeek).
4. पासवर्ड फील्डमध्ये API की पेस्ट करा.
5. **Import** वर क्लिक करा.

की `Zed Manual Import (<provider>)` नावाच्या नवीन प्रोव्हायडर कनेक्शनच्या स्वरूपात जतन केली जाते.

## Zed होस्टवर API की कुठे साठवते

Zed हे `zed-openai`, `ai.zed.openai`, `zed-anthropic` इत्यादी सेवा नावांखाली
OS कीचेनमध्ये AI प्रोव्हायडर की साठवते. मॅन्युअल आयातीसाठी त्या मिळवण्यासाठी, येथे पहा:

**Linux**

```
~/.config/zed/settings.json
```

`language_models` विभागामध्ये प्रोव्हायडर कॉन्फिगरेशन्स असतात. Zed UI द्वारे कीचेनमध्ये
जतन केलेल्या की `settings.json` मध्ये साध्या मजकूर स्वरूपात नसतात; GNOME Keyring / Seahorse
सारख्या कीचेन व्ह्यूअरद्वारे किंवा खालील कमांड चालवून त्या मिळवा:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

`zed` शोधून **Keychain Access.app** मध्ये कीचेन नोंदी शोधता येतात.

## व्हॉल्यूम-माउंट पर्याय (प्रगत)

तुम्ही इच्छित असल्यास Zed कॉन्फिगरेशन डिरेक्टरी केवळ-वाचन मोडमध्ये कंटेनरमध्ये माउंट करू शकता.
यामुळे कीचेनची समस्या सुटत नाही, परंतु गुप्त नसलेली Zed कॉन्फिगरेशन मूल्ये
(उदा., मॉडेल प्राधान्ये) वाचणाऱ्या भविष्यातील वैशिष्ट्यांसाठी हे उपयुक्त ठरू शकते.

```yaml
# docker-compose.yml चा अंश
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux होस्ट
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # macOS होस्ट (त्याऐवजी यावरील टिप्पणी काढा)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # भविष्यात: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

टीप: `ZED_CONFIG_PATH` एन्व्हायर्नमेंट व्हेरिएबल ओव्हरराइड अद्याप अंमलात आणलेले नाही. हे
वैशिष्ट्य जोडल्यावर संदर्भासाठी हा अंश दिला आहे.

## मॅन्युअल आयात API

मॅन्युअल आयात एंडपॉइंटला थेट कॉलही करता येतो:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "My Zed OpenAI key"   // पर्यायी
}
```

यशस्वी झाल्यास ते पुढील प्रतिसाद परत करते:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## समस्यांचे निवारण

| लक्षण                              | कारण                             | उपाय                                      |
| ---------------------------------- | -------------------------------- | ----------------------------------------- |
| 422 + `zedDockerEnvironment: true` | Docker मध्ये चालत आहे            | Manual Token Import टॅब वापरा             |
| 404 + `zedInstalled: false`        | होस्टवर Zed इंस्टॉल केलेले नाही  | Zed इंस्टॉल करा किंवा मॅन्युअल आयात वापरा |
| 403 + कीचेन प्रवेश नाकारला         | OS ने कीचेन प्रवेश नाकारला       | OS प्रॉम्प्टमध्ये परवानगी द्या            |
| 404 + कीचेन सेवा उपलब्ध नाही       | Linux वर `libsecret` उपलब्ध नाही | `libsecret-1-dev` इंस्टॉल करा             |
