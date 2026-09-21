# Zed IDE Integration in Docker Environments (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

OmniRoute Docker-க்குள் இயங்கும்போது, வழக்கமான "Zed Keychain-இலிருந்து இறக்குமதி செய்" செயல்முறை தோல்வியடைகிறது. ஏனெனில், கொள்கலனால் ஹோஸ்ட் OS கீச்செயின் டீமனை (Linux-இல் libsecret,
macOS-இல் Keychain, Windows-இல் Credential Manager) அணுக முடியாது. மேலும், ஹோஸ்ட் கோப்பு முறைமையிலுள்ள Zed உள்ளமைவு கோப்பகங்கள் இயல்பாகக் கொள்கலனுக்குள் தெரிவதில்லை.

## Docker-இல் Keychain இறக்குமதி ஏன் தோல்வியடைகிறது

ஒரு கொள்கலனுக்குள் இரண்டு தடுக்கும் சிக்கல்கள் ஏற்படுகின்றன:

1. **கோப்பு முறைமைத் தனிமைப்படுத்தல்** — `isZedInstalled()` ஆனது `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS), அல்லது அதற்கு இணையான Windows பாதையைத் தேடுகிறது. இந்தப் பாதைகள்
   ஹோஸ்டில் உள்ளதால், அவை வெளிப்படையாகத் தொகுதி-மவுண்ட் செய்யப்படாதவரை கிடைக்காது.
2. **IPC தனிமைப்படுத்தல்** — உள்ளமைவு கோப்பகம் மவுண்ட் செய்யப்பட்டிருந்தாலும், `keytar` நேட்டிவ்
   மாட்யூல் ஒரு Unix சாக்கெட் அல்லது D-Bus அமர்வு வழியாக OS கீச்செயின் சேவையுடன் தொடர்புகொள்கிறது.
   இயல்பாக இவற்றில் எதுவும் கொள்கலனுக்குள் இணைக்கப்படுவதில்லை; எனவே நற்சான்றுகளை வாசிப்பது எப்போதும் தோல்வியடைகிறது.

OmniRoute பின்வரும் இரண்டு மதிப்பீட்டு முறைகள் வழியாக Docker சூழலைக் கண்டறிகிறது:

- `/.dockerenv` இருப்பது (கொள்கலன் தொடங்கும்போது Docker டீமனால் எழுதப்படுகிறது).
- `/proc/1/cgroup`-இல் `docker` என்ற சரம் இடம்பெறுவது (Linux cgroup v1).

இந்த மதிப்பீட்டு முறைகளில் ஏதேனும் ஒன்று செயல்பட்டால், இறக்குமதி வழித்தடம்
`zedDockerEnvironment: true` என்பதுடனும், உங்களை Manual Token Import தாவலுக்குச் செல்லுமாறு அறிவுறுத்தும் செய்தியுடனும் HTTP 422-ஐ வழங்குகிறது.

## Manual Token Import தாவலைப் பயன்படுத்துதல்

1. **Dashboard → Providers → Zed** என்பதைத் திறக்கவும்.
2. கீச்செயின் இறக்குமதி அட்டைக்குக் கீழே **Manual Token Import** பலகம் தோன்றும். OmniRoute
   Docker-ஐக் கண்டறிந்தால், முதல் தோல்வியடைந்த கீச்செயின் இறக்குமதி முயற்சிக்குப் பிறகு இந்தப் பலகம் தானாக விரிவடையும்.
3. கீழ்தோன்றும் பட்டியலிலிருந்து வழங்குநரைத் தேர்ந்தெடுக்கவும் (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter, அல்லது DeepSeek).
4. கடவுச்சொல் புலத்தில் API விசையை ஒட்டவும்.
5. **Import** என்பதைக் கிளிக் செய்யவும்.

விசை, பின்வரும் பெயருடன் ஒரு புதிய வழங்குநர் இணைப்பாகச் சேமிக்கப்படும்:
`Zed Manual Import (<provider>)`.

## ஹோஸ்டில் Zed API விசைகளைச் சேமிக்கும் இடம்

Zed, AI வழங்குநர் விசைகளை OS கீச்செயினில் `zed-openai`, `ai.zed.openai`,
`zed-anthropic` போன்ற சேவைப் பெயர்களின் கீழ் சேமிக்கிறது. கைமுறை இறக்குமதிக்காக அவற்றைப் பெற, பின்வரும் இடங்களில் பார்க்கவும்:

**Linux**

```
~/.config/zed/settings.json
```

`language_models` பிரிவில் வழங்குநர் உள்ளமைவுகள் உள்ளன. Zed UI வழியாக கீச்செயினில் சேமிக்கப்பட்ட விசைகள்
`settings.json`-இல் சாதாரண உரையாக இருப்பதில்லை; GNOME Keyring / Seahorse போன்ற கீச்செயின் பார்வையாளர் மூலமாகவோ அல்லது பின்வருவதை இயக்கியோ அவற்றைப் பெறவும்:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

`zed` என்பதைத் தேடுவதன் மூலம் **Keychain Access.app**-இல் கீச்செயின் பதிவுகளைக் கண்டறியலாம்.

## தொகுதி-மவுண்ட் விருப்பம் (மேம்பட்டது)

விருப்பமாக, Zed உள்ளமைவு கோப்பகத்தை வாசிப்பதற்கு மட்டும் அனுமதியுடன் கொள்கலனுக்குள் மவுண்ட் செய்யலாம்.
இது கீச்செயின் சிக்கலைத் தீர்க்காது; ஆனால் ரகசியமல்லாத Zed உள்ளமைவு மதிப்புகளை
(எ.கா., மாதிரி விருப்பத்தேர்வுகள்) வாசிக்கும் எதிர்கால அம்சங்களுக்கு இது பயனுள்ளதாக இருக்கலாம்.

```yaml
# docker-compose.yml துணுக்கு
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux ஹோஸ்ட்
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # macOS ஹோஸ்ட் (இதற்குப் பதிலாக இதன் கருத்துக் குறியை நீக்கவும்)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # எதிர்காலம்: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

குறிப்பு: `ZED_CONFIG_PATH` சூழல் மாறி மேலெழுதும் வசதி இன்னும் செயல்படுத்தப்படவில்லை. அந்த
அம்சம் சேர்க்கப்படும்போது பயன்படுத்துவதற்கான குறிப்பாக இந்தத் துணுக்கு வழங்கப்பட்டுள்ளது.

## Manual Import API

கைமுறை இறக்குமதி முனைப்புள்ளியையும் நேரடியாக அழைக்கலாம்:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "எனது Zed OpenAI விசை"   // விருப்பத்தேர்வு
}
```

வெற்றியடைந்தால், இது பின்வருவதை வழங்கும்:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## சிக்கல் தீர்வு

| அறிகுறி                                | காரணம்                        | தீர்வு                                                     |
| -------------------------------------- | ----------------------------- | ---------------------------------------------------------- |
| 422 + `zedDockerEnvironment: true`     | Docker-க்குள் இயங்குகிறது     | Manual Token Import தாவலைப் பயன்படுத்தவும்                 |
| 404 + `zedInstalled: false`            | ஹோஸ்டில் Zed நிறுவப்படவில்லை  | Zed-ஐ நிறுவவும் அல்லது கைமுறை இறக்குமதியைப் பயன்படுத்தவும் |
| 403 + கீச்செயின் அணுகல் மறுக்கப்பட்டது | OS கீச்செயின் அணுகலை மறுத்தது | OS அறிவுறுத்தலில் அனுமதி வழங்கவும்                         |
| 404 + கீச்செயின் சேவை கிடைக்கவில்லை    | Linux-இல் `libsecret` இல்லை   | `libsecret-1-dev`-ஐ நிறுவவும்                              |
