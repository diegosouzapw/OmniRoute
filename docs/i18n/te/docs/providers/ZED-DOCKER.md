# Zed IDE Integration in Docker Environments (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

OmniRoute Docker లో అమలవుతున్నప్పుడు, ప్రామాణిక "Zed కీచైన్ నుండి దిగుమతి చేయండి" ప్రక్రియ విఫలమవుతుంది,
ఎందుకంటే కంటైనర్ హోస్ట్ OS కీచైన్ డీమన్ను (Linux లో libsecret,
macOS లో Keychain, Windows లో Credential Manager) చేరుకోలేదు మరియు హోస్ట్ ఫైల్సిస్టమ్లోని
Zed కాన్ఫిగరేషన్ డైరెక్టరీలు డిఫాల్ట్గా కంటైనర్లో కనిపించవు.

## Docker లో కీచైన్ దిగుమతి ఎందుకు విఫలమవుతుంది

కంటైనర్లో రెండు నిరోధక సమస్యలు ఏర్పడతాయి:

1. **ఫైల్సిస్టమ్ ఐసోలేషన్** — `isZedInstalled()` అనేది `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS), లేదా Windows లోని సమానమైన పాత్ కోసం చూస్తుంది. ఈ పాత్లు
   హోస్ట్లో ఉంటాయి మరియు వాటిని స్పష్టంగా వాల్యూమ్-మౌంట్ చేయకపోతే అందుబాటులో ఉండవు.
2. **IPC ఐసోలేషన్** — కాన్ఫిగరేషన్ డైరెక్టరీని మౌంట్ చేసినప్పటికీ, `keytar` నేటివ్
   మాడ్యూల్ Unix సాకెట్ లేదా D-Bus సెషన్ ద్వారా OS కీచైన్ సేవతో కమ్యూనికేట్ చేస్తుంది.
   డిఫాల్ట్గా వీటిలో ఏదీ కంటైనర్కు అనుసంధానించబడదు, కాబట్టి క్రెడెన్షియల్ రీడ్లు ఎల్లప్పుడూ విఫలమవుతాయి.

OmniRoute రెండు హ్యూరిస్టిక్ల ద్వారా Docker వాతావరణాన్ని గుర్తిస్తుంది:

- `/.dockerenv` ఉండటం (కంటైనర్ ప్రారంభమైనప్పుడు Docker డీమన్ దీన్ని వ్రాస్తుంది).
- `/proc/1/cgroup` లో `docker` స్ట్రింగ్ కనిపించడం (Linux cgroup v1).

ఈ హ్యూరిస్టిక్లలో ఏదైనా ట్రిగ్గర్ అయినప్పుడు, దిగుమతి రూట్ HTTP 422తో,
`zedDockerEnvironment: true` మరియు మాన్యువల్ టోకెన్ దిగుమతి ట్యాబ్ను ఉపయోగించమని సూచించే సందేశాన్ని అందిస్తుంది.

## మాన్యువల్ టోకెన్ దిగుమతి ట్యాబ్ను ఉపయోగించడం

1. **డ్యాష్బోర్డ్ → ప్రొవైడర్లు → Zed** తెరవండి.
2. **మాన్యువల్ టోకెన్ దిగుమతి** ప్యానెల్ కీచైన్ దిగుమతి కార్డ్ క్రింద కనిపిస్తుంది. OmniRoute
   Docker ను గుర్తించినప్పుడు, మొదటి విఫలమైన కీచైన్ దిగుమతి ప్రయత్నం తర్వాత ఈ ప్యానెల్ స్వయంచాలకంగా
   విస్తరిస్తుంది.
3. డ్రాప్డౌన్ నుండి ప్రొవైడర్ను ఎంచుకోండి (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter, లేదా DeepSeek).
4. పాస్వర్డ్ ఫీల్డ్లో API కీని అతికించండి.
5. **దిగుమతి చేయండి** క్లిక్ చేయండి.

కీ, `Zed Manual Import (<provider>)` పేరుతో
కొత్త ప్రొవైడర్ కనెక్షన్గా సేవ్ చేయబడుతుంది.

## హోస్ట్లో Zed API కీలను ఎక్కడ నిల్వ చేస్తుంది

Zed, `zed-openai`, `ai.zed.openai`, `zed-anthropic` మొదలైన సర్వీస్ పేర్ల కింద
OS కీచైన్లో AI ప్రొవైడర్ కీలను నిల్వ చేస్తుంది. మాన్యువల్ దిగుమతి కోసం వాటిని పొందడానికి,
కింది స్థానాల్లో చూడండి:

**Linux**

```
~/.config/zed/settings.json
```

`language_models` విభాగంలో ప్రొవైడర్ కాన్ఫిగరేషన్లు ఉంటాయి. Zed UI ద్వారా కీచైన్లో
సేవ్ చేసిన కీలు `settings.json` లో సాధారణ టెక్స్ట్ రూపంలో ఉండవు; GNOME Keyring / Seahorse వంటి
కీచైన్ వ్యూయర్ ద్వారా లేదా కింది ఆదేశాన్ని అమలు చేయడం ద్వారా వాటిని పొందండి:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

`zed` కోసం శోధించడం ద్వారా కీచైన్ ఎంట్రీలను **Keychain Access.app** లో కనుగొనవచ్చు.

## వాల్యూమ్-మౌంట్ ఎంపిక (అధునాతన)

ఐచ్ఛికంగా, Zed కాన్ఫిగరేషన్ డైరెక్టరీని రీడ్-ఓన్లీగా కంటైనర్లో మౌంట్ చేయవచ్చు.
ఇది కీచైన్ సమస్యను పరిష్కరించదు, కానీ రహస్యేతర Zed కాన్ఫిగరేషన్ విలువలను
(ఉదా., మోడల్ ప్రాధాన్యతలు) చదివే భవిష్యత్ ఫీచర్లకు ఉపయోగకరంగా ఉండవచ్చు.

```yaml
# docker-compose.yml భాగం
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux హోస్ట్
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # macOS హోస్ట్ (దీనికి బదులుగా దీని కామెంట్ను తీసివేయండి)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # భవిష్యత్లో: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

గమనిక: `ZED_CONFIG_PATH` ఎన్విరాన్మెంట్ వేరియబుల్ ఓవర్రైడ్ ఇంకా అమలు చేయబడలేదు. ఆ
ఫీచర్ జోడించబడినప్పుడు సూచనగా ఉపయోగించేందుకు ఈ భాగం అందించబడింది.

## మాన్యువల్ దిగుమతి API

మాన్యువల్ దిగుమతి ఎండ్పాయింట్ను నేరుగా కూడా కాల్ చేయవచ్చు:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "నా Zed OpenAI కీ"   // ఐచ్ఛికం
}
```

విజయవంతమైనప్పుడు ఇది కింది ఫలితాన్ని అందిస్తుంది:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## సమస్య పరిష్కారం

| లక్షణం                                 | కారణం                               | పరిష్కారం                                                    |
| -------------------------------------- | ----------------------------------- | ------------------------------------------------------------ |
| 422 + `zedDockerEnvironment: true`     | Docker లో అమలవుతోంది                | మాన్యువల్ టోకెన్ దిగుమతి ట్యాబ్ను ఉపయోగించండి                |
| 404 + `zedInstalled: false`            | హోస్ట్లో Zed ఇన్స్టాల్ కాలేదు       | Zed ను ఇన్స్టాల్ చేయండి లేదా మాన్యువల్ దిగుమతిని ఉపయోగించండి |
| 403 + కీచైన్ యాక్సెస్ తిరస్కరించబడింది | OS కీచైన్ యాక్సెస్ను తిరస్కరించింది | OS ప్రాంప్ట్లో అనుమతి ఇవ్వండి                                |
| 404 + కీచైన్ సేవ అందుబాటులో లేదు       | Linux లో `libsecret` లేదు           | `libsecret-1-dev` ను ఇన్స్టాల్ చేయండి                        |
