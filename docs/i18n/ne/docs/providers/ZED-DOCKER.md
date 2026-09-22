# Zed IDE Integration in Docker Environments (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

जब OmniRoute Docker भित्र चल्छ, मानक "Zed Keychain बाट आयात गर्नुहोस्" प्रक्रिया असफल हुन्छ,
किनभने कन्टेनरले होस्ट OS को कीचेन डेमन (Linux मा libsecret,
macOS मा Keychain, Windows मा Credential Manager) सम्म पहुँच गर्न सक्दैन र होस्ट फाइलसिस्टममा रहेका
Zed कन्फिगरेसन डाइरेक्टरीहरू पूर्वनिर्धारित रूपमा कन्टेनरभित्र देखिँदैनन्।

## Docker मा Keychain आयात किन असफल हुन्छ

कन्टेनरभित्र दुईवटा अवरोधकारी समस्याहरू हुन्छन्:

1. **फाइलसिस्टम पृथकीकरण** — `isZedInstalled()` ले `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS), वा Windows को समकक्ष स्थान खोज्छ। यी पथहरू
   होस्टमा हुन्छन् र स्पष्ट रूपमा भोल्युम-माउन्ट नगरिएसम्म उपलब्ध हुँदैनन्।
2. **IPC पृथकीकरण** — कन्फिगरेसन डाइरेक्टरी माउन्ट गरिएको अवस्थामा पनि, `keytar` नेटिभ
   मोड्युलले Unix सकेट वा D-Bus सत्रमार्फत OS कीचेन सेवासँग सञ्चार गर्छ।
   पूर्वनिर्धारित रूपमा यीमध्ये कुनै पनि कन्टेनरमा ब्रिज गरिएको हुँदैन, त्यसैले क्रेडेन्सियल पढ्ने कार्य सधैँ असफल हुन्छ।

OmniRoute ले दुईवटा ह्युरिस्टिकमार्फत Docker वातावरण पत्ता लगाउँछ:

- `/.dockerenv` को उपस्थिति (कन्टेनर सुरु हुँदा Docker डेमनद्वारा लेखिएको)।
- `/proc/1/cgroup` मा `docker` स्ट्रिङ देखिनु (Linux cgroup v1)।

कुनै पनि ह्युरिस्टिक सक्रिय हुँदा, आयात रुटले
`zedDockerEnvironment: true` र तपाईंलाई म्यानुअल टोकन आयात ट्याबमा जान निर्देशन दिने सन्देशसहित HTTP 422 फर्काउँछ।

## म्यानुअल टोकन आयात ट्याब प्रयोग गर्ने तरिका

1. **ड्यासबोर्ड → प्रदायकहरू → Zed** खोल्नुहोस्।
2. **म्यानुअल टोकन आयात** प्यानल कीचेन आयात कार्डमुनि देखिन्छ। OmniRoute ले
   Docker पत्ता लगाउँदा, कीचेन आयातको पहिलो असफल प्रयासपछि यो प्यानल स्वतः विस्तारित हुन्छ।
3. ड्रपडाउनबाट प्रदायक चयन गर्नुहोस् (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter, वा DeepSeek)।
4. पासवर्ड फिल्डमा API कुञ्जी पेस्ट गर्नुहोस्।
5. **आयात गर्नुहोस्** मा क्लिक गर्नुहोस्।

कुञ्जीलाई
`Zed Manual Import (<provider>)` नाम भएको नयाँ प्रदायक कनेक्सनका रूपमा सुरक्षित गरिन्छ।

## Zed ले होस्टमा API कुञ्जीहरू कहाँ भण्डारण गर्छ

Zed ले AI प्रदायक कुञ्जीहरू OS कीचेनमा
`zed-openai`, `ai.zed.openai`, `zed-anthropic`, आदि जस्ता सेवा नामअन्तर्गत भण्डारण गर्छ। म्यानुअल
आयातका लागि तिनलाई प्राप्त गर्न, निम्न स्थानमा हेर्नुहोस्:

**Linux**

```
~/.config/zed/settings.json
```

`language_models` खण्डमा प्रदायक कन्फिगरेसनहरू हुन्छन्। Zed UI मार्फत
कीचेनमा सुरक्षित गरिएका कुञ्जीहरू `settings.json` मा सादा पाठका रूपमा हुँदैनन्; तिनलाई
GNOME Keyring / Seahorse जस्तो कीचेन भ्युअरमार्फत, वा निम्न चलाएर प्राप्त गर्नुहोस्:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

`zed` खोजेर **Keychain Access.app** मा कीचेन प्रविष्टिहरू फेला पार्न सकिन्छ।

## भोल्युम-माउन्ट विकल्प (उन्नत)

तपाईंले वैकल्पिक रूपमा Zed कन्फिगरेसन डाइरेक्टरीलाई पढ्न-मात्र मिल्ने गरी कन्टेनरमा माउन्ट गर्न सक्नुहुन्छ।
यसले कीचेन समस्या समाधान गर्दैन, तर गोप्य नभएका Zed कन्फिगरेसन मानहरू
(जस्तै, मोडेल प्राथमिकताहरू) पढ्ने भावी सुविधाहरूका लागि उपयोगी हुन सक्छ।

```yaml
# docker-compose.yml को अंश
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux होस्ट
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # macOS होस्ट (यसको सट्टा टिप्पणी हटाउनुहोस्)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # भविष्यमा: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

नोट: `ZED_CONFIG_PATH` वातावरण चर ओभरराइड अझै कार्यान्वयन गरिएको छैन। यो
अंश उक्त सुविधा थपिएपछिका लागि सन्दर्भका रूपमा प्रदान गरिएको हो।

## म्यानुअल आयात API

म्यानुअल आयात इन्डपोइन्टलाई सीधै पनि कल गर्न सकिन्छ:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "मेरो Zed OpenAI कुञ्जी"   // वैकल्पिक
}
```

सफल हुँदा यसले निम्न फर्काउँछ:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## समस्या समाधान

| लक्षण                              | कारण                             | समाधान                                                  |
| ---------------------------------- | -------------------------------- | ------------------------------------------------------- |
| 422 + `zedDockerEnvironment: true` | Docker भित्र चलिरहेको            | म्यानुअल टोकन आयात ट्याब प्रयोग गर्नुहोस्               |
| 404 + `zedInstalled: false`        | होस्टमा Zed स्थापना नभएको        | Zed स्थापना गर्नुहोस् वा म्यानुअल आयात प्रयोग गर्नुहोस् |
| 403 + कीचेन पहुँच अस्वीकृत         | OS ले कीचेन पहुँच अस्वीकार गर्यो | OS प्रम्प्टमा अनुमति दिनुहोस्                           |
| 404 + कीचेन सेवा उपलब्ध छैन        | Linux मा `libsecret` छैन         | `libsecret-1-dev` स्थापना गर्नुहोस्                     |
