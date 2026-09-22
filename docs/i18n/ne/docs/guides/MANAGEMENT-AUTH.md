# Management Authentication (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute सँग व्यवस्थापन रुटहरूलाई अधिकार प्रदान गर्न सक्ने **चार प्रकारका क्रेडेन्सियल समूहहरू** छन्।
तिनीहरू एकअर्काको सट्टामा प्रयोग गर्न मिल्दैनन्। Inference API कुञ्जीहरू (`sk-…`) ले
`manage` वा `admin` स्कोप स्पष्ट रूपमा प्रदान नगरिएसम्म सर्भर व्यवस्थापन गर्न **सक्दैनन्**।

प्रामाणिक कार्यान्वयन: `src/lib/api/requireManagementAuth.ts`।

| क्रेडेन्सियल            | सामान्य स्वरूप                        | कहाँ सिर्जना गरिन्छ                                 | अभिप्रेत प्रयोग            | व्यवस्थापन क्षमता                                                                 |
| ----------------------- | ------------------------------------- | --------------------------------------------------- | -------------------------- | --------------------------------------------------------------------------------- |
| Dashboard JWT सत्र      | `auth_token` कुकी                     | Dashboard लगइन                                      | ब्राउजर UI                 | CSRF, स्थानीयता र सधैँ-सुरक्षित-रुटका नियमहरूको अधीनमा पूर्ण dashboard व्यवस्थापन |
| CLI machine-id टोकन     | आन्तरिक / स्थानीय                     | CLI bootstrap (उही मेसिनमा `omniroute`)             | स्थानीय CLI                | स्थानीय व्यवस्थापन मात्र                                                          |
| स्कोपयुक्त Access Token | `oma_live_…`                          | **Settings → Access Tokens** वा `omniroute connect` | रिमोट CLI र व्यवस्थापन API | रुटले मागेको `read`, `write`, वा `admin` स्कोप पूरा गर्नुपर्छ                     |
| Inference API कुञ्जी    | `sk-…` (र अन्य API-कुञ्जी prefix हरू) | **API Manager / API Keys**                          | `/v1/*` inference          | कुञ्जीको metadata मा `manage` वा `admin` नभएसम्म **कुनै पनि छैन**                 |

`oma_` क्रेडेन्सियलहरू व्यवस्थापन/CLI क्रेडेन्सियल हुन्। तिनीहरू inference API कुञ्जीहरू **होइनन्**।

सर्भरका लागि लगइन/API-कुञ्जी प्रमाणीकरण असक्षम गरिएको छ भने, केही व्यवस्थापन रुटहरूले
अप्रमाणीकृत कलहरू स्वीकार गर्न सक्छन्। स्थानीय-मात्र र सधैँ-सुरक्षित रुटहरूमा तिनका आफ्नै
नियमहरू अझै लागू हुन्छन्। त्यसैले यीमध्ये कुनै एउटा क्रेडेन्सियल प्रस्तुत गर्नु सबै अवस्थामा
अनिवार्य हुँदैन, र आवश्यक स्कोप तथा रुटको स्थानीयता नभई कुनै क्रेडेन्सियल हुनु मात्र पनि
सबै अवस्थामा पर्याप्त हुँदैन।

सम्बन्धित: [रिमोट मोड](./REMOTE-MODE.md) (रिमोट CLI का लागि `oma_live_…` कसरी जारी गरिन्छ)।

---

## स्कोप म्याट्रिक्सहरू

यी दुई स्कोप शब्दावलीहरू **फरक** छन्। तिनीहरूलाई नमिसाउनुहोस्।

### Access Token स्कोपहरू (`oma_live_…`)

| स्कोप   | सामान्य सञ्चालनहरू                                                                    |
| ------- | ------------------------------------------------------------------------------------- |
| `read`  | टोकनलाई हेर्न अनुमति भएका सूची/स्थिति GET हरू                                         |
| `write` | admin भन्दा तलका परिवर्तनहरू (सिर्जना/अद्यावधिक/मेटाउने)                              |
| `admin` | पूर्ण रिमोट CLI / connect टोकन (password bootstrap मा पूर्वनिर्धारित रूपमा यही हुन्छ) |

`read` भएको टोकनले `write` रुट कल गर्न सक्दैन। Runtime सन्देशको स्वरूप:
`Access token scope '<have>' is insufficient; '<need>' required.`

### API-कुञ्जी व्यवस्थापन स्कोपहरू

| स्कोप          | अर्थ                                                                    |
| -------------- | ----------------------------------------------------------------------- |
| (कुनै पनि छैन) | Inference मात्र। व्यवस्थापन रुटहरूले 403 फर्काउँछन्।                    |
| `manage`       | व्यवस्थापन API (`requireManagementAuth` को API-कुञ्जी शाखासँग उही gate) |
| `admin`        | `hasManageScope` लाई पनि पूरा गर्छ (व्यवस्थापन गर्न सक्षम मानिन्छ)      |

API Keys / API Manager UI मा कुञ्जीका लागि `manage` सक्षम गर्नुहोस्। त्यो स्कोप जानीजानी
प्रदान नगरेसम्म स्वचालनका लागि chat client कुञ्जी पुनः प्रयोग नगर्नुहोस्।

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

## हालका रनटाइम त्रुटिहरू (गोप्य जानकारी नदोहोर्याउनुहोस्)

| अवस्था                                  | सामान्य स्थिति | सन्देश (संवेदनशील विवरण हटाइएको)                                     |
| --------------------------------------- | -------------- | -------------------------------------------------------------------- |
| क्रेडेन्सियल छैन                        | 401            | `Authentication required`                                            |
| अमान्य/म्याद सकिएको `oma_live_…`        | 401            | `Invalid or expired access token`                                    |
| `manage`/`admin` नभएको मान्य API key    | 403            | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| व्यवस्थापन रुटमा अमान्य सामान्य API key | 403            | `Invalid management token`                                           |
| Access Token को स्कोप अत्यन्त कम        | 403            | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" को अर्थ bearer लाई व्यवस्थापन क्रेडेन्सियलका रूपमा
स्वीकार गरिएन भन्ने हो। यसले कुन परिवारको क्रेडेन्सियल सिर्जना गर्ने भन्ने **बताउँदैन**। माथिको तालिका प्रयोग गर्नुहोस्:
इन्फरेन्स key हरूलाई `manage` स्कोप चाहिन्छ; रिमोट CLI लाई `oma_live_…` चाहिन्छ; ड्यासबोर्डले
सेसन कुकी प्रयोग गर्छ।

---

## सिफारिस गरिएको न्यूनतम-अधिकार विकल्प

| कलर                                       | प्रयोग गर्नुहोस्                                 |
| ----------------------------------------- | ------------------------------------------------ |
| ब्राउजर                                   | ड्यासबोर्ड सेसन                                  |
| सर्भर होस्टमा रहेको CLI                   | मेसिन टोकन                                       |
| रिमोट सर्भरसँग सञ्चार गर्ने ल्यापटपको CLI | `omniroute connect` बाट प्राप्त `oma_live_…`     |
| CI / स्क्रिप्टहरू (व्यवस्थापन मात्र)      | काम गर्ने सबैभन्दा सानो स्कोप भएको `oma_live_…`  |
| `/v1` र `/api` दुवै कल गर्नैपर्ने CI      | `manage` भएको API key **वा** दुईवटा क्रेडेन्सियल |
