# Management Authentication (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute ஆனது **நான்கு நற்சான்றிதழ் குடும்பங்களைக்** கொண்டுள்ளது, அவை மேலாண்மை வழிகளை அங்கீகரிக்க முடியும்.
அவை ஒன்றோடொன்று மாற்றிக்கொள்ள முடியாதவை. Inference API விசைகள் (`sk-…`) சேவையகத்தை நிர்வகிக்காது, அவற்றுக்கு வெளிப்படையாக `manage` அல்லது `admin` ஸ்கோப் வழங்கப்பட்டாலொழிய.

நியமச் செயலாக்கம்: `src/lib/api/requireManagementAuth.ts`.

| நற்சான்றிதழ்                      | வழக்கமான வடிவம்                             | எங்கு உருவாக்கப்பட்டது                                        | நோக்கம் கொண்ட பயன்பாடு          | மேலாண்மைத் திறன்                                                                                                |
| --------------------------------- | ------------------------------------------- | ------------------------------------------------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| டாஷ்போர்டு JWT அமர்வு             | `auth_token` குக்கீ                         | டாஷ்போர்டு உள்நுழைவு                                          | உலாவி UI                        | CSRF, இருப்பிடம் மற்றும் எப்போதும் பாதுகாக்கப்படும்-வழி விதிகள் ஆகியவற்றிற்கு உட்பட்டு முழு டாஷ்போர்டு மேலாண்மை |
| CLI இயந்திர-அடையாள டோக்கன்        | உள் / உள்ளூர்                               | CLI பூட்ஸ்ட்ராப் (அதே இயந்திரத்தில் `omniroute`)              | உள்ளூர் CLI                     | உள்ளூர் மேலாண்மை மட்டுமே                                                                                        |
| ஸ்கோப் செய்யப்பட்ட அணுகல் டோக்கன் | `oma_live_…`                                | **அமைப்புகள் → அணுகல் டோக்கன்கள்** அல்லது `omniroute connect` | ரிமோட் CLI மற்றும் மேலாண்மை API | வழியின் தேவையான `read`, `write`, அல்லது `admin` ஸ்கோப்பை பூர்த்தி செய்ய வேண்டும்                                |
| Inference API விசை                | `sk-…` (மற்றும் பிற API-விசை முன்னொட்டுகள்) | **API மேலாளர் / API விசைகள்**                                 | `/v1/*` இன்ஃபரன்ஸ்              | விசை மெட்டாடேட்டாவில் `manage` அல்லது `admin` இல்லாவிட்டால் **ஏதுமில்லை**                                       |

`oma_` நற்சான்றிதழ்கள் மேலாண்மை/CLI நற்சான்றிதழ்கள் ஆகும். அவை Inference API விசைகள் **அல்ல**.

சேவையகத்திற்கு உள்நுழைவு/API-விசை அங்கீகாரம் முடக்கப்பட்டிருந்தால், சில மேலாண்மை வழிகள் அங்கீகரிக்கப்படாத அழைப்புகளை ஏற்கலாம். உள்ளூர்-மட்டும் மற்றும் எப்போதும் பாதுகாக்கப்படும் வழிகள் அவற்றின் சொந்த விதிகளை இன்னும் பயன்படுத்துகின்றன. எனவே, இந்த நற்சான்றிதழ்களில் ஒன்றை வழங்குவது உலகளாவிய ரீதியில் கட்டாயமில்லை, மேலும் தேவையான ஸ்கோப் மற்றும் வழி இருப்பிடம் இல்லாமல் ஒன்றை வைத்திருப்பது உலகளாவிய ரீதியில் போதுமானதும் அல்ல.

தொடர்புடையது: [ரிமோட் பயன்முறை](./REMOTE-MODE.md) (`oma_live_…` ஒரு ரிமோட் CLI-க்கு எவ்வாறு உருவாக்கப்படுகிறது).

---

## ஸ்கோப் மேட்ரிக்ஸ்கள்

API-விசை மேலாண்மை ஸ்கோப்கள் மற்றும் அணுகல்-டோக்கன் ஸ்கோப்கள் வெவ்வேறு சொற்களஞ்சியங்கள்.
MCP கருவி ஸ்கோப்கள் ஒரு மூன்றாவது சொற்களஞ்சியம் ஆகும், இது கீழே உள்ள அட்டவணைகளில் உள்ள எந்தச் செயல்பாட்டையும் விட `scopeMatches` மூலம் சரிபார்க்கப்படுகிறது. அருகருகே:
[மூன்று ஸ்கோப் பெயர்வெளிகள்](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### அணுகல் டோக்கன் ஸ்கோப்கள் (`oma_live_…`)

| ஸ்கோப்  | வழக்கமான செயல்பாடுகள்                                                           |
| ------- | ------------------------------------------------------------------------------- |
| `read`  | டோக்கன் பார்க்க அனுமதிக்கப்படும் பட்டியல்/நிலை GETகள்                           |
| `write` | நிர்வாகிக்குக் கீழே உள்ள மாற்றங்கள் (உருவாக்குதல்/புதுப்பித்தல்/நீக்குதல்)      |
| `admin` | முழு ரிமோட் CLI / இணைப்பு டோக்கன் (கடவுச்சொல் பூட்ஸ்ட்ராப் இயல்புநிலைகள் இங்கே) |

`read` ஸ்கோப் கொண்ட டோக்கன் ஒரு `write` வழியை அழைக்க முடியாது. இயக்கநேர செய்தி வடிவம்:
`Access token scope '<have>' is insufficient; '<need>' required.`

### API-விசை மேலாண்மை ஸ்கோப்கள்

| ஸ்கோப்      | பொருள்                                                                               |
| ----------- | ------------------------------------------------------------------------------------ |
| (ஏதுமில்லை) | இன்ஃபரன்ஸ் மட்டுமே. மேலாண்மை வழிகள் 403ஐ வழங்கும்.                                   |
| `manage`    | மேலாண்மை API (`requireManagementAuth` API-விசை கிளையின் அதே கேட்)                    |
| `admin`     | `hasManageScope` ஐயும் பூர்த்தி செய்கிறது (மேலாண்மை-திறன் கொண்டதாகக் கருதப்படுகிறது) |

API விசைகள் / API மேலாளர் UI இல் விசையின் மீது `manage` ஐ இயக்கவும். நீங்கள் வேண்டுமென்றே அந்த ஸ்கோப்பை வழங்காத வரை, ஒரு அரட்டை கிளையன்ட் விசையை ஆட்டோமேஷனுக்கு மீண்டும் பயன்படுத்த வேண்டாம்.

---

## உருவாக்குவது மற்றும் ரத்து செய்வது எப்படி

### டாஷ்போர்டு JWT அமர்வு

1. `/login` ஐத் திறந்து, நிர்வாக கடவுச்சொல்லைப் பயன்படுத்தி உள்நுழையவும் (முதல் துவக்கத்தில் `INITIAL_PASSWORD`).
2. குக்கி `auth_token` என்பது HttpOnly ஆகும். உலாவி டாஷ்போர்டு அதை தானாகவே பயன்படுத்துகிறது.
3. `/api/auth/logout` வழியாக வெளியேறவும். நகலெடுக்க நீண்ட கால ரகசியம் எதுவும் இல்லை.

### CLI இயந்திர-அடையாள டோக்கன்

1. சர்வர் இருக்கும் **அதே ஹோஸ்டில்** (`loopback`) `omniroute` ஐ இயக்கவும்.
2. CLI ஆனது `~/.omniroute/` இன் கீழ் ஒரு இயந்திர-அடையாள டோக்கனை துவக்குகிறது (`chmod 600`).
3. இது வேறு இயந்திரத்திலிருந்து **வேலை செய்யாது**. ரிமோட் CLI க்கு ஒரு அணுகல் டோக்கனைப் பயன்படுத்தவும்.

### ஸ்கோப் செய்யப்பட்ட அணுகல் டோக்கன் (`oma_live_…`)

1. டாஷ்போர்டு: **அமைப்புகள் → அணுகல் டோக்கன்கள்** → உருவாக்கு (பெயர் + ஸ்கோப்). **ரகசியம் ஒருமுறை மட்டுமே காட்டப்படும்.**
2. அல்லது CLI: `omniroute connect <host>` (கடவுச்சொல் → டோக்கன்). [ரிமோட் பயன்முறையைப்](./REMOTE-MODE.md) பார்க்கவும்.
3. தலைப்பு: `Authorization: Bearer oma_live_…`
4. அதே அணுகல் டோக்கன்கள் பக்கத்திலிருந்து ரத்து செய்யவும் (அல்லது CLI சூழலை நீக்கவும்).
5. சர்வர் ஒரு ஹாஷை மட்டுமே சேமிக்கிறது. தெளிவான உரையை கடவுச்சொல் போல கையாளவும்.

### மேலாண்மை-ஸ்கோப் செய்யப்பட்ட API விசை

1. டாஷ்போர்டு: **API மேலாளர் / API விசைகள்** → ஒரு விசையை உருவாக்கவும் அல்லது திருத்தவும் → `manage` (அல்லது `admin`) ஐ இயக்கவும்.
2. தலைப்பு: `Authorization: Bearer sk-…` (விசையின் உண்மையான முன்னொட்டு).
3. அதே UI இல் `manage` ஐ ரத்து செய்யவும் அல்லது அகற்றவும்.
4. CLI அல்லாத ஆட்டோமேஷனுக்கான குறைந்தபட்ச சிறப்புரிமை: GET-மட்டும் வேலைகளுக்கு `read` அணுகல் டோக்கனைப் பயன்படுத்தவும்; அழைப்பாளர் `/v1` மற்றும் நிர்வாகத்தையும் பேச வேண்டியிருக்கும் போது மட்டுமே ஒரு API விசையில் `manage` ஐப் பயன்படுத்தவும்.

---

## தலைப்பு வடிவம்

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

நிர்வாக அங்கீகாரச் சான்றுகளை URL பாதை அல்லது வினவல் சரத்தில் வைக்க வேண்டாம். நிர்வாக அங்கீகாரம் தலைப்பு/குக்கி மட்டுமே.

---

## நகலெடுத்து ஒட்டும் எடுத்துக்காட்டுகள்

படிக்க-மட்டும் (வழங்குநர்களைப் பட்டியலிடு). ஒரு `read` அணுகல் டோக்கனைப் பயன்படுத்தவும்:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

மாற்றுதல் (ஒரு வழங்குநர் இணைப்பை உருவாக்கு). `write`/`admin` அணுகல் டோக்கன் அல்லது மேலாண்மை-ஸ்கோப் செய்யப்பட்ட API விசையைப் பயன்படுத்தவும்:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

ஊகித்தல் (நிர்வாகம் அல்ல). சாதாரண API விசை, `manage` தேவையில்லை:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## தற்போதைய இயக்க நேரப் பிழைகள் (ரகசியங்களை எதிரொலிக்க வேண்டாம்)

| Situation                                      | Typical status | Message (sanitized)                                                  |
| :--------------------------------------------- | :------------- | :------------------------------------------------------------------- |
| No credential                                  | 401            | `Authentication required`                                            |
| Invalid/expired `oma_live_…`                   | 401            | `Invalid or expired access token`                                    |
| Valid API key without `manage`/`admin`         | 403            | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Invalid ordinary API key on a management route | 403            | `Invalid management token`                                           |
| Access Token scope too low                     | 403            | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" என்பது தாங்குபவர் ஒரு நிர்வாக அங்கீகாரச் சான்றாக **ஏற்றுக்கொள்ளப்படவில்லை** என்பதைக் குறிக்கிறது. எந்த குடும்பத்தை உருவாக்க வேண்டும் என்று அது **கூறவில்லை**. மேலே உள்ள அட்டவணையைப் பயன்படுத்தவும்: ஊகிக்கும் விசைகளுக்கு `manage` ஸ்கோப் தேவை; ரிமோட் CLI க்கு `oma_live_…` தேவை; டாஷ்போர்டு அமர்வு குக்கியைப் பயன்படுத்துகிறது.

## பரிந்துரைக்கப்பட்ட குறைந்தபட்ச சிறப்புரிமைத் தேர்வு

| அழைப்பவர்                                  | பயன்பாடு                                                    |
| :----------------------------------------- | :---------------------------------------------------------- |
| Browser                                    | டாஷ்போர்டு அமர்வு                                           |
| CLI on the server host                     | இயந்திர டோக்கன்                                             |
| CLI on a laptop talking to a remote server | `omniroute connect` இலிருந்து `oma_live_…`                  |
| CI / scripts (management only)             | வேலை செய்யும் மிகச்சிறிய ஸ்கோப்புடன் `oma_live_…`           |
| CI that must call both `/v1` and `/api`    | `manage` உடன் API கீ **அல்லது** இரண்டு அங்கீகாரச் சான்றுகள் |
