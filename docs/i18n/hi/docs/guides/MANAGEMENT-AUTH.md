# Management Authentication (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute में **चार क्रेडेंशियल परिवार** हैं जो प्रबंधन रूट्स को अधिकृत कर सकते हैं।
ये एक-दूसरे के स्थान पर उपयोग नहीं किए जा सकते। Inference API कुंजियाँ (`sk-…`) सर्वर को
प्रबंधित **नहीं** करतीं, जब तक कि उन्हें स्पष्ट रूप से `manage` या `admin` स्कोप न दिया गया हो।

प्रामाणिक कार्यान्वयन: `src/lib/api/requireManagementAuth.ts`।

| क्रेडेंशियल             | सामान्य स्वरूप                        | कहाँ बनाया जाता है                                  | इच्छित उपयोग             | प्रबंधन क्षमता                                                                      |
| ----------------------- | ------------------------------------- | --------------------------------------------------- | ------------------------ | ----------------------------------------------------------------------------------- |
| Dashboard JWT सत्र      | `auth_token` कुकी                     | Dashboard लॉगिन                                     | ब्राउज़र UI              | पूर्ण dashboard प्रबंधन, जो CSRF, स्थानीयता और हमेशा-संरक्षित-रूट नियमों के अधीन है |
| CLI machine-id टोकन     | आंतरिक / स्थानीय                      | CLI बूटस्ट्रैप (उसी मशीन पर `omniroute`)            | स्थानीय CLI              | केवल स्थानीय प्रबंधन                                                                |
| स्कोपयुक्त Access Token | `oma_live_…`                          | **Settings → Access Tokens** या `omniroute connect` | रिमोट CLI और प्रबंधन API | रूट के आवश्यक `read`, `write` या `admin` स्कोप को पूरा करना आवश्यक है               |
| Inference API कुंजी     | `sk-…` (और अन्य API-कुंजी प्रीफ़िक्स) | **API Manager / API Keys**                          | `/v1/*` inference        | **कोई नहीं**, जब तक कि कुंजी के मेटाडेटा में `manage` या `admin` शामिल न हो         |

`oma_` क्रेडेंशियल प्रबंधन/CLI क्रेडेंशियल हैं। वे inference API कुंजियाँ **नहीं** हैं।

यदि सर्वर के लिए लॉगिन/API-कुंजी प्रमाणीकरण अक्षम है, तो कुछ प्रबंधन रूट्स
बिना प्रमाणीकरण वाली कॉल स्वीकार कर सकते हैं। केवल-स्थानीय और हमेशा-संरक्षित रूट्स पर
फिर भी उनके अपने नियम लागू होते हैं। इसलिए इनमें से किसी एक क्रेडेंशियल को प्रस्तुत करना
हर स्थिति में अनिवार्य नहीं है, और आवश्यक स्कोप तथा रूट की स्थानीयता के बिना केवल उसका
स्वामी होना भी हर स्थिति में पर्याप्त नहीं है।

संबंधित: [रिमोट मोड](./REMOTE-MODE.md) (रिमोट CLI के लिए `oma_live_…` कैसे बनाया जाता है)।

---

## स्कोप मैट्रिक्स

ये दोनों स्कोप शब्दावलियाँ **अलग** हैं। इन्हें आपस में न मिलाएँ।

### Access Token स्कोप (`oma_live_…`)

| स्कोप   | सामान्य संचालन                                                              |
| ------- | --------------------------------------------------------------------------- |
| `read`  | वे सूची/स्थिति GET अनुरोध जिन्हें देखने की टोकन को अनुमति है                |
| `write` | admin से नीचे के बदलाव (बनाना/अपडेट करना/हटाना)                             |
| `admin` | पूर्ण रिमोट CLI / connect टोकन (पासवर्ड बूटस्ट्रैप में यह डिफ़ॉल्ट होता है) |

`read` वाला टोकन किसी `write` रूट को कॉल नहीं कर सकता। रनटाइम संदेश का स्वरूप:
`Access token scope '<have>' is insufficient; '<need>' required.`

### API-कुंजी प्रबंधन स्कोप

| स्कोप      | अर्थ                                                                |
| ---------- | ------------------------------------------------------------------- |
| (कोई नहीं) | केवल inference। प्रबंधन रूट्स 403 लौटाते हैं।                       |
| `manage`   | प्रबंधन API (`requireManagementAuth` की API-कुंजी शाखा वाला ही गेट) |
| `admin`    | `hasManageScope` को भी पूरा करता है (प्रबंधन-सक्षम माना जाता है)    |

API Keys / API Manager UI में कुंजी के लिए `manage` सक्षम करें। स्वचालन के लिए
किसी चैट क्लाइंट की कुंजी का पुनः उपयोग न करें, जब तक कि आपने उसे जानबूझकर वह स्कोप न दिया हो।

---

## बनाने और निरस्त करने का तरीका

### Dashboard JWT सत्र

1. `/login` खोलें और प्रबंधन पासवर्ड से साइन इन करें (पहले बूट पर `INITIAL_PASSWORD`)।
2. कुकी `auth_token` HttpOnly है। ब्राउज़र dashboard इसका स्वचालित रूप से उपयोग करता है।
3. `/api/auth/logout` के माध्यम से लॉग आउट करें। कॉपी करने के लिए कोई दीर्घकालिक सीक्रेट नहीं होता।

### CLI machine-id टोकन

1. सर्वर वाले **उसी होस्ट** पर `omniroute` चलाएँ (loopback)।
2. CLI, `~/.omniroute/` के अंतर्गत एक machine-id टोकन बूटस्ट्रैप करता है (chmod 600)।
3. यह किसी अन्य मशीन से काम **नहीं** करता। रिमोट CLI के लिए Access Token का उपयोग करें।

### स्कोपयुक्त Access Token (`oma_live_…`)

1. Dashboard: **Settings → Access Tokens** → बनाएँ (नाम + स्कोप)। **सीक्रेट केवल एक बार दिखाया जाता है।**
2. या CLI: `omniroute connect <host>` (पासवर्ड → टोकन)। [रिमोट मोड](./REMOTE-MODE.md) देखें।
3. हेडर: `Authorization: Bearer oma_live_…`
4. उसी Access Tokens पृष्ठ से निरस्त करें (या CLI कॉन्टेक्स्ट हटाएँ)।
5. सर्वर केवल hash संग्रहीत करता है। plaintext को पासवर्ड की तरह सुरक्षित रखें।

### `manage`-स्कोप वाली API कुंजी

1. Dashboard: **API Manager / API Keys** → कोई कुंजी बनाएँ या संपादित करें → `manage` (या `admin`) सक्षम करें।
2. हेडर: `Authorization: Bearer sk-…` (कुंजी का वास्तविक प्रीफ़िक्स)।
3. उसी UI में कुंजी निरस्त करें या उससे `manage` हटा दें।
4. CLI के अलावा अन्य स्वचालन के लिए न्यूनतम विशेषाधिकार अपनाएँ: केवल GET वाले कार्यों के लिए `read` Access Token को प्राथमिकता दें; API कुंजी पर `manage` का उपयोग केवल तभी करें जब कॉलर को `/v1` और प्रबंधन, दोनों से संचार करना आवश्यक हो।

---

## हेडर प्रारूप

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

प्रबंधन क्रेडेंशियल्स को URL पथ या क्वेरी स्ट्रिंग में न रखें। प्रबंधन
प्रमाणीकरण केवल हेडर/कुकी के माध्यम से होता है।

---

## कॉपी-पेस्ट उदाहरण

केवल-पढ़ने के लिए (प्रदाताओं की सूची प्राप्त करना)। `read` Access Token का उपयोग करें:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

संशोधन के लिए (प्रदाता कनेक्शन बनाना)। `write`/`admin` Access Token या
`manage` स्कोप वाली API कुंजी का उपयोग करें:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

इन्फ़रेंस (प्रबंधन नहीं)। सामान्य API कुंजी, `manage` आवश्यक नहीं:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## वर्तमान रनटाइम त्रुटियाँ (सीक्रेट्स को दोबारा प्रदर्शित न करें)

| स्थिति                                   | सामान्य स्टेटस | संदेश (संवेदनशील जानकारी हटाई गई)                                    |
| ---------------------------------------- | -------------- | -------------------------------------------------------------------- |
| कोई क्रेडेंशियल नहीं                     | 401            | `Authentication required`                                            |
| अमान्य/समय-समाप्त `oma_live_…`           | 401            | `Invalid or expired access token`                                    |
| `manage`/`admin` के बिना मान्य API कुंजी | 403            | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| प्रबंधन रूट पर अमान्य सामान्य API कुंजी  | 403            | `Invalid management token`                                           |
| Access Token का स्कोप बहुत कम है         | 403            | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" का अर्थ है कि bearer को प्रबंधन क्रेडेंशियल के रूप में
स्वीकार **नहीं** किया गया। इससे यह **नहीं** पता चलता कि किस प्रकार का क्रेडेंशियल बनाना है। ऊपर दी गई तालिका का उपयोग करें:
इन्फ़रेंस कुंजियों को `manage` स्कोप चाहिए; रिमोट CLI को `oma_live_…` चाहिए; डैशबोर्ड
सेशन कुकी का उपयोग करता है।

---

## अनुशंसित न्यूनतम-विशेषाधिकार विकल्प

| कॉलर                                                    | उपयोग करें                                          |
| ------------------------------------------------------- | --------------------------------------------------- |
| ब्राउज़र                                                | डैशबोर्ड सेशन                                       |
| सर्वर होस्ट पर CLI                                      | मशीन टोकन                                           |
| रिमोट सर्वर से संचार करने वाले लैपटॉप पर CLI            | `omniroute connect` से प्राप्त `oma_live_…`         |
| CI / स्क्रिप्ट्स (केवल प्रबंधन)                         | कार्य करने वाले सबसे छोटे स्कोप के साथ `oma_live_…` |
| ऐसा CI जिसे `/v1` और `/api` दोनों को कॉल करना आवश्यक है | `manage` वाली API कुंजी **या** दो क्रेडेंशियल्स     |
