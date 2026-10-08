# CLI Machine-ID Token (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇧🇦 [bs](../../../bs/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## மேலோட்டம்

OmniRoute CLI கட்டளைகள், `x-omniroute-cli-token` கோரிக்கைத் தலைப்பின் மூலம் அனுப்பப்படும்
`HMAC-SHA256(machine-id, salt)` டோக்கனைப் பயன்படுத்தி உள்ளூர் மேலாண்மை API-யிடம்
அங்கீகரிக்கின்றன.

இதனால், ஒவ்வொரு செயல்படுத்தலின்போதும் பயனர் JWT அல்லது கடவுச்சொல்லை வழங்க வேண்டிய
அவசியமின்றி CLI துணைக் கட்டளைகள் (`omniroute status`, `omniroute providers` போன்றவை)
மேலாண்மை endpoint-களை அழைக்க முடியும்.

## இது எவ்வாறு செயல்படுகிறது

1. `getMachineTokenSync()`, `node-machine-id` வழியாக வன்பொருள் இயந்திர ID-ஐப்
   படிக்கிறது (தோல்வியுற்றால் வெற்று சரத்திற்குத் திரும்பி, CLI அங்கீகாரத்தை முடக்குகிறது).
2. இது `HMAC-SHA256(machine_id, salt)`-ஐக் கணக்கிட்டு, முழுமையான 64-எழுத்து
   hex digest-ஐத் திருப்பியளிக்கிறது — இந்த இயந்திரத்துடன் பிணைக்கப்பட்ட, மாற்றமில்லாமல்
   மீண்டும் உருவாக்கக்கூடிய, பின்னோக்கிப் பெற முடியாத டோக்கன்.
3. தீர்மானிக்கப்பட்ட இலக்கு வெளிப்படையான loopback URL (`localhost`, `127.0.0.0/8`,
   அல்லது loopback IPv6) ஆக இருக்கும்போது மட்டுமே CLI டோக்கனை
   `x-omniroute-cli-token` ஆக அனுப்புகிறது. டோக்கனைக் கொண்டுள்ள கோரிக்கைகள்
   `redirect: error`-ஐப் பயன்படுத்துவதால், ஓர் உள்ளூர் redirect அதை மற்றொரு origin-க்கு
   அனுப்ப முடியாது. தொலைநிலை context-கள் அதற்குப் பதிலாக வரையறுக்கப்பட்ட அணுகல்
   டோக்கன்களைப் பயன்படுத்துகின்றன. டோக்கனைப் பெறுவிக்க முடியாவிட்டால், CLI அந்தத்
   தலைப்பைத் தவிர்க்கிறது; மேலும், வெற்று டோக்கனைச் செல்லுபடியாகக் கருதுவதற்குப் பதிலாக
   `omniroute doctor` தோல்வியை அறிக்கையிடுகிறது.
4. சர்வர் (`src/server/authz/policies/management.ts`), அதே salt-ஐப் பயன்படுத்தி
   எதிர்பார்க்கப்படும் டோக்கனை மீண்டும் கணக்கிட்டு, நேர அளவீட்டை அடிப்படையாகக் கொண்ட
   பிரித்தெடுத்தலைத் தடுப்பதற்காக `timingSafeEqual` மூலம் ஒப்பிடுகிறது.

## பாதுகாப்புப் பண்புகள்

| பண்பு                                       | விவரம்                                                                                                                                                                                                                                    |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Loopback மட்டும்**                        | உண்மையான TCP peer முகவரியிலிருந்து பெறப்பட்ட சர்வரின் நம்பகமான peer-locality குறியீடு loopback எனக் குறிப்பிடும்போது மட்டுமே ஏற்கப்படும். இடத்தன்மையைத் தீர்மானிக்க client-ஆல் கட்டுப்படுத்தப்படும் `Host` தலைப்பு ஒருபோதும் நம்பப்படாது. |
| **மாறாத-நேர ஒப்பீடு**                       | `crypto.timingSafeEqual` நேர அளவீட்டுத் தாக்குதல்களைத் தடுக்கிறது.                                                                                                                                                                        |
| **பின்னோக்கிப் பெற முடியாதது**              | HMAC வெளியீட்டிலிருந்து machine-id-ஐ மீட்டெடுக்க முடியாது.                                                                                                                                                                                |
| **`always`-பாதுகாக்கப்பட்ட வழிமீறல் இல்லை** | CLI டோக்கன் சரிபார்ப்பிற்கு முன்பே `isAlwaysProtectedPath()` மதிப்பீடு செய்யப்படுகிறது. `/api/shutdown` மற்றும் `/api/settings/database` ஆகியவற்றுக்கு எப்போதும் JWT தேவை.                                                                |
| **ஏற்றுமதி செய்ய முடியாதது**                | டோக்கன் ஒருபோதும் வட்டில் எழுதப்படுவதோ பதிவுகளில் பதியப்படுவதோ இல்லை.                                                                                                                                                                     |

## இயல்புநிலை salt (ஒவ்வொரு நிறுவலுக்கும் சீரற்றது)

`OMNIROUTE_CLI_SALT` அமைக்கப்படாதபோது, salt என்பது ஒருமுறை உருவாக்கப்பட்டு
`<DATA_DIR>/cli-token-salt.json`-இல் (`0600` பயன்முறையில்) நிலையாகச் சேமிக்கப்படும்
சீரற்ற 64-எழுத்து hex சரமாகும் — repository-யில் சேர்க்கப்பட்டுள்ள
`omniroute-cli-auth-v1` literal அல்ல. `src/lib/machineToken.ts`-இல் உள்ள
`getActiveSalt()` மற்றும் `bin/cli/utils/cliToken.mjs`-இல் உள்ள அதன் இணைப் பதிப்பு
ஆகிய இரண்டும் ஒரே கோப்பைப் படிக்கின்றன. எனவே, இந்த நிறுவலில் உள்ள சர்வரும் ஒவ்வொரு
CLI செயல்படுத்தலும் ஒரே மதிப்பை அடைகின்றன; நிலையாகச் சேமிக்கப்பட்ட salt அல்லது env
salt எதையும் இன்னும் நிறுவ முடியாதபோது மட்டுமே repository-யில் சேர்க்கப்பட்டுள்ள
literal கடைசி மாற்று வழியாகப் பயன்படுத்தப்படுகிறது (எடுத்துக்காட்டாக, சர்வர் ஒருபோதும்
இயக்கப்படுவதற்கு முன் உள்ள புதிய CLI-மட்டும் நிறுவல்). இது பழைய நிலையான literal
இயல்புநிலையின் பலவீனத்தைச் சரிசெய்கிறது: `/etc/machine-id` பொதுவாக அனைவராலும்
படிக்கக்கூடியதாக இருப்பதால், `OMNIROUTE_CLI_SALT`-ஐ ஒருபோதும் அமைக்காத ஒவ்வொரு
நிறுவலுக்கும் எந்த உள்ளூர் பயனரும் அதே டோக்கனைப் பெறுவிக்க முடிந்திருக்கும்.

## Salt சுழற்சி

குறியீட்டு மாற்றங்கள் இல்லாமல் பெறப்பட்ட token-ஐச் சுழற்ற `OMNIROUTE_CLI_SALT`-ஐ அமைக்கவும் — இது
எப்போதும் நிறுவலுக்கான நிலைத்த salt-ஐ விட முன்னுரிமை பெறும். சுழற்சிக்குப் பிறகு, இந்தக் கணினியில் உள்ள அனைத்து CLI
process-களும் புதிய token-ஐத் தானாகப் பயன்படுத்தும். முந்தைய பெறப்பட்ட மதிப்பை வெளிப்படுத்தியிருக்கக்கூடிய
process-list கசிவுக்குப் பிறகு இது பயனுள்ளதாக இருக்கும்.

```bash
# நிலையான சுழற்சி (shell profile-இல் சேர்க்கவும்)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# புதிய token பயன்பாட்டில் உள்ளதா என்பதைச் சரிபார்க்கவும்
omniroute status
```

## மரபுவழி வடிவம் (SHA-256, 32 எழுத்துகள்) — இன்னும் ஏற்கப்படுகிறது

மேலே உள்ள HMAC வடிவத்திற்கு முன்பு, CLI தனது token-ஐ
`SHA-256(machineId + salt).hex[0..32]` (`bin/cli/utils/cliToken.mjs`-இல் 32 எழுத்துகள் கொண்ட முன்னொட்டு;
`src/lib/machineToken.ts`-இல் `getLegacyCliTokenSync`) எனப் பெற்றது.

பின்தங்கிய இணக்கத்தன்மைக்காக server **இரண்டு** வடிவங்களையும் ஏற்கிறது: சரிபார்ப்பான்
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]`-ஐ உருவாக்கி, உள்வரும்
header-ஐ ஒவ்வொன்றுடனும் `timingSafeEqual` பயன்படுத்தி ஒப்பிடுகிறது
(`src/server/authz/policies/management.ts` மற்றும் `src/lib/middleware/cliTokenAuth.ts`).
எனவே, ஒரு token 64 எழுத்துகள் கொண்ட HMAC digest அல்லது 32 எழுத்துகள் கொண்ட
மரபுவழி SHA-256 முன்னொட்டு ஆகியவற்றில் **ஏதேனும் ஒன்றுடன்** பொருந்தினால் அது செல்லுபடியாகும்.

**விலகல்:** CLI token செயல்முறையை முழுவதுமாக முடக்க `OMNIROUTE_DISABLE_CLI_TOKEN=true`-ஐ
(env அல்லது `.env`-இல்) அமைக்கவும்; அதன் பிறகு அனைத்து அணுகல்களுக்கும் வெளிப்படையான API key தேவைப்படும். பல பயனர்கள் உள்ள
host-களில் இது பரிந்துரைக்கப்படுகிறது, ஏனெனில் `machine-id` என்பது ஒவ்வொரு சாதனத்திற்குமானது (ஒவ்வொரு பயனருக்குமானது அல்ல), மேலும் அதே
host-இல் உள்ள மற்றொரு பயனர் அதே token-ஐக் கணக்கிட முடியும்.

## கோப்புகள்

| கோப்பு                                    | நோக்கம்                                      |
| ----------------------------------------- | -------------------------------------------- |
| `src/lib/machineToken.ts`                 | Token பெறுதல் (`getMachineTokenSync`)        |
| `bin/cli/utils/cliToken.mjs`              | அதே பெறுதல் முறையின் CLI-பக்கப் பிரதிபலிப்பு |
| `<DATA_DIR>/cli-token-salt.json`          | நிறுவலுக்கான நிலைத்த சீரற்ற salt             |
| `src/server/authz/headers.ts`             | `CLI_TOKEN_HEADER` மாறிலி                    |
| `src/server/authz/policies/management.ts` | Server-பக்கச் சரிபார்ப்பு                    |
| `src/server/authz/routeGuard.ts`          | Loopback host சரிபார்ப்பு (`isLoopbackHost`) |

## மேலும் காண்க

- `docs/security/ROUTE_GUARD_TIERS.md` — route பாதுகாப்பு நிலைகள்
- `docs/architecture/AUTHZ_GUIDE.md` — முழுமையான authorization pipeline
