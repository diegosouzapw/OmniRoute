# Zed IDE Integration in Docker Environments (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

OmniRoute Docker තුළ ධාවනය වන විට, සම්මත "Zed Keychain වෙතින් ආයාත කරන්න" ක්රියාවලිය අසාර්ථක වේ.
එයට හේතුව container එකට host OS keychain daemon වෙත (Linux මත libsecret,
macOS මත Keychain, Windows මත Credential Manager) ප්රවේශ විය නොහැකි වීම සහ host
ගොනු පද්ධතියේ ඇති Zed වින්යාස නාමාවලි පෙරනිමියෙන් container එක තුළ නොපෙනීමයි.

## Docker තුළ Keychain ආයාත කිරීම අසාර්ථක වන්නේ ඇයි

Container එකක් තුළ අවහිර කරන ගැටලු දෙකක් ඇති වේ:

1. **ගොනු පද්ධති හුදකලාකරණය** — `isZedInstalled()` විසින් `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS), හෝ ඊට සමාන Windows මාර්ගය සොයයි. මෙම මාර්ග
   host එකේ පවතින අතර, පැහැදිලිව volume-mount නොකළහොත් ඒවා ලබාගත නොහැක.
2. **IPC හුදකලාකරණය** — වින්යාස නාමාවලිය mount කළ විට පවා, `keytar` native
   module එක Unix socket එකක් හෝ D-Bus session එකක් හරහා OS keychain සේවාව සමඟ සන්නිවේදනය කරයි.
   පෙරනිමියෙන් ඒ කිසිවක් container එකට සම්බන්ධ නොකරන බැවින්, අක්තපත්ර කියවීම් සෑම විටම අසාර්ථක වේ.

OmniRoute විසින් අනුමාන ක්රම දෙකක් හරහා Docker පරිසරය හඳුනාගනී:

- `/.dockerenv` පැවතීම (container එක ආරම්භ වන විට Docker daemon මඟින් ලියනු ලැබේ).
- `/proc/1/cgroup` තුළ `docker` යන පෙළ තිබීම (Linux cgroup v1).

මෙම අනුමාන ක්රම දෙකෙන් එකක් ක්රියාත්මක වූ විට, ආයාත route එක
`zedDockerEnvironment: true` සමඟ HTTP 422 සහ Manual Token Import ටැබයට යොමු කරන පණිවිඩයක් ආපසු ලබා දෙයි.

## Manual Token Import ටැබය භාවිත කිරීම

1. **Dashboard → Providers → Zed** විවෘත කරන්න.
2. **Manual Token Import** පැනලය keychain ආයාත කාඩ්පතට පහළින් දිස් වේ.
   OmniRoute විසින් Docker හඳුනාගත් විට, පළමු අසාර්ථක keychain ආයාත උත්සාහයෙන් පසු මෙම පැනලය ස්වයංක්රීයව විහිදේ.
3. dropdown එකෙන් provider එක තෝරන්න (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter, හෝ DeepSeek).
4. API key එක මුරපද ක්ෂේත්රයට අලවන්න.
5. **Import** ක්ලික් කරන්න.

key එක `Zed Manual Import (<provider>)` යන නම සහිත නව provider සම්බන්ධතාවක් ලෙස සුරැකේ.

## Zed විසින් Host එකේ API Keys ගබඩා කරන ස්ථානය

Zed විසින් AI provider keys, `zed-openai`, `ai.zed.openai`, `zed-anthropic` වැනි සේවා නම් යටතේ OS keychain එකේ ගබඩා කරයි. අතින් ආයාත කිරීම සඳහා ඒවා ලබාගැනීමට, පහත ස්ථාන බලන්න:

**Linux**

```
~/.config/zed/settings.json
```

`language_models` කොටසෙහි provider වින්යාස අඩංගු වේ. Zed UI හරහා keychain එකට සුරැකි keys,
`settings.json` තුළ සරල පෙළ ලෙස නොමැත; GNOME Keyring / Seahorse වැනි keychain viewer එකක් හරහා ඒවා ලබාගන්න, නැතහොත් පහත විධානය ක්රියාත්මක කරන්න:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

`zed` සෙවීමෙන් **Keychain Access.app** තුළ Keychain entries සොයාගත හැක.

## Volume-Mount විකල්පය (උසස්)

ඔබට අවශ්ය නම් Zed වින්යාස නාමාවලිය කියවීමට පමණක් හැකි ආකාරයෙන් container එක තුළ mount කළ හැක.
මෙය keychain ගැටලුව විසඳන්නේ නැති නමුත්, රහස් නොවන Zed වින්යාස අගයන්
(උදා., model අභිරුචි) කියවන අනාගත විශේෂාංග සඳහා ප්රයෝජනවත් විය හැක.

```yaml
# docker-compose.yml කොටස
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux host
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # macOS host (ඒ වෙනුවට මෙහි comment එක ඉවත් කරන්න)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # අනාගතයේදී: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

සටහන: `ZED_CONFIG_PATH` environment variable එක හරහා අගය අතික්රමණය කිරීම තවම ක්රියාත්මක කර නොමැත.
එම විශේෂාංගය එක් කළ පසු භාවිත කළ හැකි යොමුවක් ලෙස මෙම කොටස සපයා ඇත.

## Manual Import API

manual import endpoint එක සෘජුවම ද ඇමතිය හැක:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "මගේ Zed OpenAI key එක"   // විකල්පයි
}
```

සාර්ථක වූ විට, එය පහත ප්රතිචාරය ලබා දෙයි:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## දෝෂ නිරාකරණය

| රෝග ලක්ෂණය                            | හේතුව                                  | විසඳුම                                |
| ------------------------------------- | -------------------------------------- | ------------------------------------- |
| 422 + `zedDockerEnvironment: true`    | Docker තුළ ධාවනය වේ                    | Manual Token Import ටැබය භාවිත කරන්න  |
| 404 + `zedInstalled: false`           | Host එකේ Zed ස්ථාපනය කර නැත            | Zed ස්ථාපනය කරන්න හෝ අතින් ආයාත කරන්න |
| 403 + keychain ප්රවේශය ප්රතික්ෂේප විය | OS එක keychain ප්රවේශය ප්රතික්ෂේප කළේය | OS විමසුමේදී අවසරය ලබා දෙන්න          |
| 404 + keychain සේවාව නොමැත            | Linux මත `libsecret` නොමැත             | `libsecret-1-dev` ස්ථාපනය කරන්න       |
