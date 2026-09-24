# Management Authentication (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

ओम्नीराउटमा **चारवटा प्रमाणिकरण परिवारहरू** छन् जसले व्यवस्थापन मार्गहरूलाई अधिकार दिन सक्छन्।
तिनीहरू एकअर्कासँग साट्न मिल्दैनन्। अनुमान API कुञ्जीहरू (`sk-…`) ले सर्भरलाई व्यवस्थापन गर्दैनन्
जबसम्म तिनीहरूलाई स्पष्ट रूपमा `manage` वा `admin` स्कोप प्रदान गरिएको छैन।

प्रामाणिक कार्यान्वयन: `src/lib/api/requireManagementAuth.ts`।

| प्रमाणिकरण | सामान्य रूप | कहाँ सिर्जना गरियो | अभिप्रेत प्रयोग | व्यवस्थापन क्षमता |
| --------------------- | ----------------------------------- | --------------------------------------------------- | ब्राउजर UI | पूर्ण ड्यासबोर्ड व्यवस्थापन, CSRF, स्थानीयता, र सधैं-सुरक्षित-मार्ग नियमहरूको अधीनमा |
| ड्यासबोर्ड JWT सत्र | `auth_token` कुकी | ड्यासबोर्ड लगइन | स्थानीय CLI | स्थानीय व्यवस्थापन मात्र |
| CLI मेसिन-आईडी टोकन | आन्तरिक / स्थानीय | CLI बुटस्ट्र्याप (`omniroute` उही मेसिनमा) | रिमोट CLI र व्यवस्थापन API | मार्गको आवश्यक `read`, `write`, वा `admin` स्कोप पूरा गर्नुपर्छ |
| स्कोप गरिएको पहुँच टोकन | `oma_live_…` | **सेटिङ्स → पहुँच टोकनहरू** वा `omniroute connect` | `/v1/*` अनुमान | **कुनै पनि होइन** जबसम्म कुञ्जी मेटाडेटामा `manage` वा `admin` समावेश छैन |
| अनुमान API कुञ्जी | `sk-…` (र अन्य API-कुञ्जी उपसर्गहरू) | **API प्रबन्धक / API कुञ्जीहरू** | | |

`oma_` प्रमाणिकरणहरू व्यवस्थापन/CLI प्रमाणिकरणहरू हुन्। तिनीहरू अनुमान API कुञ्जीहरू **होइनन्**।

यदि सर्भरको लागि लगइन/API-कुञ्जी प्रमाणीकरण असक्षम गरिएको छ भने, केही व्यवस्थापन मार्गहरूले
अप्रमाणित कलहरू स्वीकार गर्न सक्छन्। स्थानीय-मात्र र सधैं-सुरक्षित मार्गहरूले अझै पनि
आफ्नै नियमहरू लागू गर्छन्। त्यसैले यी मध्ये कुनै एक प्रमाणिकरण प्रस्तुत गर्नु विश्वव्यापी रूपमा
अनिवार्य छैन, र आवश्यक स्कोप र मार्ग स्थानीयता बिना यसको स्वामित्व विश्वव्यापी रूपमा पर्याप्त छैन।

सम्बन्धित: [रिमोट मोड](./REMOTE-MODE.md) (रिमोट CLI को लागि `oma_live_…` कसरी बनाइन्छ)।

---

## स्कोप म्याट्रिक्स

API-कुञ्जी व्यवस्थापन स्कोपहरू र पहुँच-टोकन स्कोपहरू फरक शब्दावलीहरू हुन्। MCP उपकरण स्कोपहरू तेस्रो शब्दावली हुन्, जुन तलका तालिकामा भएका कुनै पनि प्रकार्यको सट्टा `scopeMatches` मार्फत जाँच गरिन्छ। छेउछाउ:
[तीन स्कोप नेमस्पेसहरू](../frameworks/MCP-SERVER.md#three-scope-namespaces)।

### पहुँच टोकन स्कोपहरू (`oma_live_…`)

| स्कोप   | सामान्य कार्यहरू                                                          |
| ------- | ------------------------------------------------------------------------- |
| `read`  | टोकनले हेर्न अनुमति पाएका सूची/स्थिति GET हरू                             |
| `write` | प्रशासकभन्दा तलका परिवर्तनहरू (सिर्जना/अद्यावधिक/मेट्ने)                  |
| `admin` | पूर्ण रिमोट CLI / जडान टोकन (पासवर्ड बुटस्ट्र्याप पूर्वनिर्धारितहरू यहाँ) |

`read` भएको टोकनले `write` मार्गमा कल गर्न सक्दैन। रनटाइम सन्देशको ढाँचा:
`Access token scope '<have>' is insufficient; '<need>' required.`

### API-कुञ्जी व्यवस्थापन स्कोपहरू

| स्कोप    | अर्थ                                                                              |
| -------- | --------------------------------------------------------------------------------- |
| (none)   | अनुमान मात्र। व्यवस्थापन मार्गहरूले 403 फर्काउँछ।                                 |
| `manage` | व्यवस्थापन API (`requireManagementAuth` API-कुञ्जी शाखाको जस्तै गेट)              |
| `admin`  | `hasManageScope` लाई पनि सन्तुष्ट पार्छ (व्यवस्थापन-सक्षमको रूपमा व्यवहार गरिन्छ) |

API Keys / API Manager UI मा कुञ्जीमा `manage` सक्षम गर्नुहोस्। च्याट क्लाइन्ट कुञ्जीलाई स्वचालनका लागि पुन: प्रयोग नगर्नुहोस् जबसम्म तपाईंले जानाजानी त्यो स्कोप प्रदान गर्नुभएको छैन।

---

## कसरी सिर्जना र रद्द गर्ने

### Dashboard JWT सत्र

1. `/login` खोल्नुहोस् र व्यवस्थापन password प्रयोग गरेर sign in गर्नुहोस् (पहिलो boot मा `INITIAL_PASSWORD`)।
2. `auth_token` कुकी HttpOnly हुन्छ। ब्राउजर dashboard ले यसलाई स्वचालित रूपमा प्रयोग गर्छ।
3. `/api/auth/logout` मार्फत log out गर्नुहोस्। प्रतिलिपि गर्न मिल्ने दीर्घकालीन secret हुँदैन।

### CLI machine-id टोकन

1. सर्भर भएकै **उही host** मा `omniroute` चलाउनुहोस् (loopback)।
2. CLI ले `~/.omniroute/` अन्तर्गत machine-id टोकन bootstrap गर्छ (chmod 600)।
3. यसले अर्को मेसिनबाट काम **गर्दैन**। रिमोट CLI का लागि Access Token प्रयोग गर्नुहोस्।

### स्कोपयुक्त Access Token (`oma_live_…`)

1. Dashboard: **Settings → Access Tokens** → सिर्जना गर्नुहोस् (नाम + स्कोप)। **Secret एक पटक मात्र देखाइन्छ।**
2. वा CLI: `omniroute connect <host>` (password → टोकन)। [रिमोट मोड](./REMOTE-MODE.md) हेर्नुहोस्।
3. Header: `Authorization: Bearer oma_live_…`
4. उही Access Tokens पृष्ठबाट रद्द गर्नुहोस् (वा CLI context मेटाउनुहोस्)।
5. सर्भरले hash मात्र भण्डारण गर्छ। Plaintext लाई password सरह सुरक्षित राख्नुहोस्।

### `manage`-स्कोप भएको API कुञ्जी

1. Dashboard: **API Manager / API Keys** → कुञ्जी सिर्जना वा सम्पादन गर्नुहोस् → `manage` (वा `admin`) सक्षम गर्नुहोस्।
2. Header: `Authorization: Bearer sk-…` (कुञ्जीको वास्तविक prefix)।
3. उही UI बाट रद्द गर्नुहोस् वा `manage` हटाउनुहोस्।
4. CLI नभएको स्वचालनका लागि न्यूनतम विशेषाधिकार अपनाउनुहोस्: GET-मात्र कार्यहरूका लागि `read` Access Token रोज्नुहोस्; caller ले `/v1` र व्यवस्थापन दुवैसँग सञ्चार गर्नैपर्ने अवस्थामा मात्र API कुञ्जीमा `manage` प्रयोग गर्नुहोस्।

---

## हेडर ढाँचा

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

व्यवस्थापन क्रेडेन्सियलहरूलाई URL पाथ वा क्वेरी स्ट्रिङमा नराख्नुहोस्। व्यवस्थापन
प्रमाणीकरण हेडर/कुकीमार्फत मात्र हुन्छ।

---

## सिधै प्रतिलिपि गरेर प्रयोग गर्न मिल्ने उदाहरणहरू

पढ्न-मात्र (प्रदायकहरूको सूची हेर्न)। `read` Access Token प्रयोग गर्नुहोस्:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

परिमार्जन गर्ने (प्रदायक जडान सिर्जना गर्न)। `write`/`admin` Access Token वा
manage स्कोप भएको API key प्रयोग गर्नुहोस्:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

इन्फरेन्स (व्यवस्थापन होइन)। सामान्य API key प्रयोग गर्नुहोस्, `manage` आवश्यक पर्दैन:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## हालका रनटाइम त्रुटिहरू (गोप्य कुराहरू नदेखाउनुहोस्)

| स्थिति                                       | सामान्य स्थिति | सन्देश (सफा गरिएको)                                                               |
| :------------------------------------------- | :------------- | :-------------------------------------------------------------------------------- |
| कुनै प्रमाण छैन                              | 401            | `प्रमाणीकरण आवश्यक छ`                                                             |
| अमान्य/म्याद सकिएको `oma_live_…`             | 401            | `अमान्य वा म्याद सकिएको पहुँच टोकन`                                               |
| `manage`/`admin` बिनाको वैध API कुञ्जी       | 403            | `API कुञ्जीमा 'manage' स्कोप छैन। यसलाई API कुञ्जी ड्यासबोर्डमा सक्षम गर्नुहोस्।` |
| व्यवस्थापन मार्गमा अमान्य सामान्य API कुञ्जी | 403            | `अमान्य व्यवस्थापन टोकन`                                                          |
| पहुँच टोकन स्कोप धेरै कम                     | 403            | `पहुँच टोकन स्कोप '<have>' अपर्याप्त छ; '<need>' आवश्यक छ।`                       |

"अमान्य व्यवस्थापन टोकन" को अर्थ वाहकलाई व्यवस्थापन प्रमाणको रूपमा **स्वीकार गरिएको थिएन**। यसले तपाईंलाई कुन परिवार मिन्ट गर्ने भनेर बताउँदैन। माथिको तालिका प्रयोग गर्नुहोस्: अनुमान कुञ्जीहरूलाई `manage` स्कोप चाहिन्छ; रिमोट CLI लाई `oma_live_…` चाहिन्छ; ड्यासबोर्डले सत्र कुकी प्रयोग गर्दछ।

---

## सिफारिस गरिएको न्यूनतम-अधिकार विकल्प

| कल गर्ने                                    | प्रयोग                                             |
| :------------------------------------------ | :------------------------------------------------- |
| ब्राउजर                                     | ड्यासबोर्ड सत्र                                    |
| सर्भर होस्टमा CLI                           | मेसिन टोकन                                         |
| रिमोट सर्भरसँग कुरा गर्ने ल्यापटपमा CLI     | `oma_live_…` `omniroute connect` बाट               |
| CI / स्क्रिप्टहरू (व्यवस्थापन मात्र)        | `oma_live_…` सबैभन्दा सानो कार्य गर्ने स्कोप सहित  |
| CI जसले `/v1` र `/api` दुवैलाई कल गर्नुपर्छ | `manage` सहितको API कुञ्जी **वा** दुईवटा प्रमाणहरू |
