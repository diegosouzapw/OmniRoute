# Management Authentication (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute-இல் மேலாண்மை வழித்தடங்களை அங்கீகரிக்கக்கூடிய **நான்கு நற்சான்று வகைகள்** உள்ளன.
அவற்றை ஒன்றுக்கொன்று மாற்றிப் பயன்படுத்த முடியாது. Inference API விசைகள் (`sk-…`) வெளிப்படையாக
`manage` அல்லது `admin` scope வழங்கப்பட்டிருந்தால் மட்டுமே சேவையகத்தை நிர்வகிக்க முடியும்.

அதிகாரப்பூர்வச் செயலாக்கம்: `src/lib/api/requireManagementAuth.ts`.

| நற்சான்று                | வழக்கமான வடிவம்                       | உருவாக்கப்படும் இடம்                                    | நோக்கமுள்ள பயன்பாடு               | மேலாண்மைத் திறன்                                                                                             |
| ------------------------ | ------------------------------------- | ------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Dashboard JWT அமர்வு     | `auth_token` cookie                   | Dashboard உள்நுழைவு                                     | உலாவி UI                          | CSRF, இருப்பிடம் மற்றும் எப்போதும்-பாதுகாக்கப்படும்-வழித்தட விதிகளுக்கு உட்பட்ட முழுமையான dashboard மேலாண்மை |
| CLI machine-id token     | உள் / உள்ளூர்                         | CLI bootstrap (அதே கணினியில் `omniroute`)               | உள்ளூர் CLI                       | உள்ளூர் மேலாண்மை மட்டும்                                                                                     |
| Scope கொண்ட Access Token | `oma_live_…`                          | **Settings → Access Tokens** அல்லது `omniroute connect` | தொலைநிலை CLI மற்றும் மேலாண்மை API | வழித்தடத்திற்குத் தேவையான `read`, `write` அல்லது `admin` scope-ஐப் பூர்த்திசெய்ய வேண்டும்                    |
| Inference API விசை       | `sk-…` (மற்ற API-key முன்னொட்டுகளும்) | **API Manager / API Keys**                              | `/v1/*` inference                 | விசையின் metadata-இல் `manage` அல்லது `admin` இடம்பெற்றிருந்தால் தவிர **எதுவுமில்லை**                        |

`oma_` நற்சான்றுகள் மேலாண்மை/CLI நற்சான்றுகள். அவை inference API விசைகள் **அல்ல**.

சேவையகத்திற்கு உள்நுழைவு/API-key அங்கீகாரம் முடக்கப்பட்டிருந்தால், சில மேலாண்மை வழித்தடங்கள்
அங்கீகரிக்கப்படாத அழைப்புகளை ஏற்கலாம். உள்ளூர்-மட்டும் மற்றும் எப்போதும்-பாதுகாக்கப்படும் வழித்தடங்கள் இன்னும்
அவற்றுக்கான சொந்த விதிகளைப் பயன்படுத்தும். ஆகவே, இந்த நற்சான்றுகளில் ஒன்றை வழங்குவது எல்லா இடங்களிலும்
கட்டாயமல்ல; அதேபோல், தேவையான scope மற்றும் வழித்தட இருப்பிடம் இல்லாமல் ஒன்றை வைத்திருப்பது எல்லா இடங்களிலும் போதுமானதல்ல.

தொடர்புடையது: [தொலைநிலைப் பயன்முறை](./REMOTE-MODE.md) (தொலைநிலை CLI-க்காக `oma_live_…` எவ்வாறு உருவாக்கப்படுகிறது).

---

## Scope அட்டவணைகள்

இந்த இரண்டு scope சொற்களஞ்சியங்களும் **வெவ்வேறானவை**. அவற்றைக் கலக்க வேண்டாம்.

### Access Token scope-கள் (`oma_live_…`)

| Scope   | வழக்கமான செயல்பாடுகள்                                                                   |
| ------- | --------------------------------------------------------------------------------------- |
| `read`  | token பார்க்க அனுமதிக்கப்பட்ட பட்டியல்/நிலை GET கோரிக்கைகள்                             |
| `write` | admin-க்குக் கீழான மாற்றங்கள் (உருவாக்குதல்/புதுப்பித்தல்/நீக்குதல்)                    |
| `admin` | முழுமையான தொலைநிலை CLI / connect token (password bootstrap இயல்பாக இதைப் பயன்படுத்தும்) |

`read` கொண்ட token-ஆல் `write` வழித்தடத்தை அழைக்க முடியாது. Runtime செய்தி வடிவம்:
`Access token scope '<have>' is insufficient; '<need>' required.`

### API-key மேலாண்மை scope-கள்

| Scope         | பொருள்                                                                           |
| ------------- | -------------------------------------------------------------------------------- |
| (எதுவுமில்லை) | Inference மட்டும். மேலாண்மை வழித்தடங்கள் 403-ஐ வழங்கும்.                         |
| `manage`      | மேலாண்மை API (`requireManagementAuth` API-key கிளையின் அதே நுழைவுக் கட்டுப்பாடு) |
| `admin`       | `hasManageScope`-ஐயும் பூர்த்திசெய்கிறது (மேலாண்மைத் திறனுடையதாகக் கருதப்படும்)  |

API Keys / API Manager UI-இல் விசைக்கு `manage`-ஐ இயக்கவும். அந்த scope-ஐ நீங்கள்
வேண்டுமென்றே வழங்கியிருந்தால் தவிர, தானியக்கத்திற்காக chat client விசையை மீண்டும் பயன்படுத்த வேண்டாம்.

---

## உருவாக்குவதும் திரும்பப் பெறுவதும் எப்படி

### Dashboard JWT அமர்வு

1. `/login`-ஐத் திறந்து, மேலாண்மைக் கடவுச்சொல்லைக் கொண்டு உள்நுழையவும் (முதல் boot-இல் `INITIAL_PASSWORD`).
2. `auth_token` cookie HttpOnly ஆகும். உலாவி dashboard அதைத் தானாகப் பயன்படுத்தும்.
3. `/api/auth/logout` வழியாக வெளியேறவும். நகலெடுப்பதற்கான நீண்டகால secret எதுவும் இல்லை.

### CLI machine-id token

1. சேவையகம் இயங்கும் **அதே host**-இல் (loopback) `omniroute`-ஐ இயக்கவும்.
2. CLI, `~/.omniroute/`-இன் கீழ் ஒரு machine-id token-ஐ bootstrap செய்யும் (chmod 600).
3. இது மற்றொரு கணினியிலிருந்து செயல்படாது. தொலைநிலை CLI-க்கு Access Token-ஐப் பயன்படுத்தவும்.

### Scope கொண்ட Access Token (`oma_live_…`)

1. Dashboard: **Settings → Access Tokens** → உருவாக்கவும் (பெயர் + scope). **Secret ஒருமுறை மட்டுமே காட்டப்படும்.**
2. அல்லது CLI: `omniroute connect <host>` (password → token). [தொலைநிலைப் பயன்முறை](./REMOTE-MODE.md)-ஐப் பார்க்கவும்.
3. Header: `Authorization: Bearer oma_live_…`
4. அதே Access Tokens பக்கத்திலிருந்து திரும்பப் பெறவும் (அல்லது CLI context-ஐ நீக்கவும்).
5. சேவையகம் hash-ஐ மட்டுமே சேமிக்கிறது. Plaintext-ஐக் கடவுச்சொல் போலக் கையாளவும்.

### `manage` scope கொண்ட API விசை

1. Dashboard: **API Manager / API Keys** → ஒரு விசையை உருவாக்கவும் அல்லது திருத்தவும் → `manage`-ஐ (அல்லது `admin`-ஐ) இயக்கவும்.
2. Header: `Authorization: Bearer sk-…` (விசையின் உண்மையான முன்னொட்டு).
3. அதே UI-இல் விசையைத் திரும்பப் பெறவும் அல்லது `manage`-ஐ அகற்றவும்.
4. CLI அல்லாத தானியக்கத்திற்கு மிகக்குறைந்த அனுமதியைப் பயன்படுத்தவும்: GET-மட்டும் பணிகளுக்கு `read` Access Token-ஐ விரும்பவும்; அழைப்பாளர் `/v1` மற்றும் மேலாண்மை ஆகிய இரண்டுடனும் தொடர்புகொள்ள வேண்டியிருக்கும்போது மட்டுமே API விசையில் `manage`-ஐப் பயன்படுத்தவும்.

---

## தலைப்பு வடிவம்

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

நிர்வாகச் சான்றுகளை URL பாதையிலோ வினவல் சரத்திலோ இட வேண்டாம். நிர்வாக
அங்கீகாரம் தலைப்பு/குக்கீ மூலம் மட்டுமே செய்யப்பட வேண்டும்.

---

## நகலெடுத்து ஒட்டக்கூடிய எடுத்துக்காட்டுகள்

வாசிப்பதற்கு மட்டும் (வழங்குநர்களைப் பட்டியலிடுதல்). `read` அணுகல் டோக்கனைப் பயன்படுத்தவும்:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

மாற்றம் செய்தல் (ஒரு வழங்குநர் இணைப்பை உருவாக்குதல்). `write`/`admin` அணுகல் டோக்கன் அல்லது
`manage` வரம்புள்ள API விசையைப் பயன்படுத்தவும்:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

அனுமானம் (நிர்வாகம் அல்ல). சாதாரண API விசை; `manage` தேவையில்லை:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## தற்போதைய இயக்கநேரப் பிழைகள் (ரகசியங்களை எதிரொலிக்க வேண்டாம்)

| சூழ்நிலை                                         | வழக்கமான நிலை | செய்தி (ரகசியத் தகவல் நீக்கப்பட்டது)                                 |
| ------------------------------------------------ | ------------- | -------------------------------------------------------------------- |
| சான்று இல்லை                                     | 401           | `Authentication required`                                            |
| தவறான/காலாவதியான `oma_live_…`                    | 401           | `Invalid or expired access token`                                    |
| `manage`/`admin` இல்லாத செல்லுபடியாகும் API விசை | 403           | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| நிர்வாக வழித்தடத்தில் தவறான சாதாரண API விசை      | 403           | `Invalid management token`                                           |
| அணுகல் டோக்கனின் வரம்பு மிகக் குறைவு             | 403           | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" என்பது bearer ஒரு நிர்வாகச் சான்றாக
ஏற்கப்படவில்லை என்பதைக் குறிக்கிறது. எந்த வகையை உருவாக்க வேண்டும் என்பதை இது
தெரிவிக்காது. மேலே உள்ள அட்டவணையைப் பயன்படுத்தவும்: அனுமான விசைகளுக்கு `manage`
வரம்பு தேவை; தொலைநிலை CLI-க்கு `oma_live_…` தேவை; டாஷ்போர்டு அமர்வு குக்கீயைப்
பயன்படுத்துகிறது.

---

## பரிந்துரைக்கப்படும் குறைந்தபட்சச் சலுகைத் தேர்வு

| அழைப்பாளர்                                                       | பயன்படுத்த வேண்டியது                                        |
| ---------------------------------------------------------------- | ----------------------------------------------------------- |
| உலாவி                                                            | டாஷ்போர்டு அமர்வு                                           |
| சேவையக ஹோஸ்டில் உள்ள CLI                                         | இயந்திர டோக்கன்                                             |
| தொலைநிலைச் சேவையகத்துடன் தொடர்புகொள்ளும் மடிக்கணினியில் உள்ள CLI | `omniroute connect` இலிருந்து பெறப்பட்ட `oma_live_…`        |
| CI / ஸ்கிரிப்ட்கள் (நிர்வாகத்திற்கு மட்டும்)                     | செயல்படத் தேவையான மிகக் குறைந்த வரம்பைக் கொண்ட `oma_live_…` |
| `/v1` மற்றும் `/api` இரண்டையும் அழைக்க வேண்டிய CI                | `manage` கொண்ட API விசை **அல்லது** இரண்டு சான்றுகள்         |
