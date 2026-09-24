# Zed IDE Integration in Docker Environments (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

OmniRoute Docker ಒಳಗೆ ಚಾಲನೆಯಲ್ಲಿರುವಾಗ, ಪ್ರಮಾಣಿತ "Zed Keychain ನಿಂದ ಆಮದು ಮಾಡಿ" ಪ್ರಕ್ರಿಯೆಯು ವಿಫಲಗೊಳ್ಳುತ್ತದೆ,
ಏಕೆಂದರೆ ಕಂಟೇನರ್ಗೆ ಹೋಸ್ಟ್ OS ಕೀಚೈನ್ ಡೀಮನ್ ಅನ್ನು (Linux ನಲ್ಲಿ libsecret,
macOS ನಲ್ಲಿ Keychain, Windows ನಲ್ಲಿ Credential Manager) ತಲುಪಲು ಸಾಧ್ಯವಿಲ್ಲ ಮತ್ತು ಹೋಸ್ಟ್ ಫೈಲ್ಸಿಸ್ಟಮ್ನಲ್ಲಿರುವ
Zed ಕಾನ್ಫಿಗರೇಶನ್ ಡೈರೆಕ್ಟರಿಗಳು ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ ಕಂಟೇನರ್ ಒಳಗೆ ಗೋಚರಿಸುವುದಿಲ್ಲ.

## Docker ನಲ್ಲಿ Keychain ಆಮದು ಏಕೆ ವಿಫಲಗೊಳ್ಳುತ್ತದೆ

ಕಂಟೇನರ್ ಒಳಗೆ ಎರಡು ನಿರ್ಬಂಧಕ ಸಮಸ್ಯೆಗಳು ಉಂಟಾಗುತ್ತವೆ:

1. **ಫೈಲ್ಸಿಸ್ಟಮ್ ಪ್ರತ್ಯೇಕತೆ** — `isZedInstalled()` ಎಂಬುದು `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS), ಅಥವಾ Windows ನಲ್ಲಿನ ಸಮಾನ ಪಥವನ್ನು ಹುಡುಕುತ್ತದೆ. ಈ ಪಥಗಳು
   ಹೋಸ್ಟ್ನಲ್ಲಿರುತ್ತವೆ ಮತ್ತು ಅವುಗಳನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ವಾಲ್ಯೂಮ್-ಮೌಂಟ್ ಮಾಡದ ಹೊರತು ಲಭ್ಯವಿರುವುದಿಲ್ಲ.
2. **IPC ಪ್ರತ್ಯೇಕತೆ** — ಕಾನ್ಫಿಗರೇಶನ್ ಡೈರೆಕ್ಟರಿಯನ್ನು ಮೌಂಟ್ ಮಾಡಿದಾಗಲೂ, `keytar` ನೇಟಿವ್
   ಮಾಡ್ಯೂಲ್ Unix ಸಾಕೆಟ್ ಅಥವಾ D-Bus ಸೆಷನ್ ಮೂಲಕ OS ಕೀಚೈನ್ ಸೇವೆಯೊಂದಿಗೆ ಸಂವಹನ ನಡೆಸುತ್ತದೆ.
   ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ ಇವೆರಡನ್ನೂ ಕಂಟೇನರ್ಗೆ ಬ್ರಿಡ್ಜ್ ಮಾಡಲಾಗುವುದಿಲ್ಲ, ಆದ್ದರಿಂದ ಕ್ರೆಡೆನ್ಶಿಯಲ್ ಓದುವಿಕೆಗಳು ಯಾವಾಗಲೂ ವಿಫಲಗೊಳ್ಳುತ್ತವೆ.

OmniRoute ಎರಡು ಹ್ಯೂರಿಸ್ಟಿಕ್ಗಳ ಮೂಲಕ Docker ಪರಿಸರವನ್ನು ಪತ್ತೆಮಾಡುತ್ತದೆ:

- `/.dockerenv` ಇರುವುದು (ಕಂಟೇನರ್ ಪ್ರಾರಂಭವಾಗುವಾಗ Docker ಡೀಮನ್ನಿಂದ ಬರೆಯಲ್ಪಡುತ್ತದೆ).
- `/proc/1/cgroup` ನಲ್ಲಿ `docker` ಸ್ಟ್ರಿಂಗ್ ಕಾಣಿಸಿಕೊಳ್ಳುವುದು (Linux cgroup v1).

ಈ ಎರಡರಲ್ಲಿ ಯಾವುದಾದರೂ ಹ್ಯೂರಿಸ್ಟಿಕ್ ಸಕ್ರಿಯಗೊಂಡಾಗ, ಆಮದು ರೂಟ್
`zedDockerEnvironment: true` ಜೊತೆಗೆ HTTP 422 ಅನ್ನು ಮತ್ತು Manual Token Import ಟ್ಯಾಬ್ಗೆ ನಿಮ್ಮನ್ನು ನಿರ್ದೇಶಿಸುವ ಸಂದೇಶವನ್ನು ಹಿಂದಿರುಗಿಸುತ್ತದೆ.

## Manual Token Import ಟ್ಯಾಬ್ ಬಳಸುವುದು

1. **Dashboard → Providers → Zed** ತೆರೆಯಿರಿ.
2. **Manual Token Import** ಪ್ಯಾನೆಲ್ ಕೀಚೈನ್ ಆಮದು ಕಾರ್ಡ್ನ ಕೆಳಗೆ ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತದೆ.
   OmniRoute Docker ಅನ್ನು ಪತ್ತೆಮಾಡಿದಾಗ, ಮೊದಲ ವಿಫಲವಾದ ಕೀಚೈನ್ ಆಮದು ಪ್ರಯತ್ನದ ನಂತರ ಈ ಪ್ಯಾನೆಲ್ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ವಿಸ್ತರಿಸುತ್ತದೆ.
3. ಡ್ರಾಪ್ಡೌನ್ನಿಂದ ಪೂರೈಕೆದಾರರನ್ನು ಆಯ್ಕೆಮಾಡಿ (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter, ಅಥವಾ DeepSeek).
4. ಪಾಸ್ವರ್ಡ್ ಕ್ಷೇತ್ರದಲ್ಲಿ API ಕೀಲಿಯನ್ನು ಅಂಟಿಸಿ.
5. **Import** ಕ್ಲಿಕ್ ಮಾಡಿ.

ಕೀಲಿಯನ್ನು ಈ ಹೆಸರಿನ ಹೊಸ ಪೂರೈಕೆದಾರ ಸಂಪರ್ಕವಾಗಿ ಉಳಿಸಲಾಗುತ್ತದೆ:
`Zed Manual Import (<provider>)`.

## ಹೋಸ್ಟ್ನಲ್ಲಿ Zed API ಕೀಲಿಗಳನ್ನು ಎಲ್ಲಿ ಸಂಗ್ರಹಿಸುತ್ತದೆ

Zed, AI ಪೂರೈಕೆದಾರರ ಕೀಲಿಗಳನ್ನು `zed-openai`, `ai.zed.openai`, `zed-anthropic` ಮುಂತಾದ
ಸೇವಾ ಹೆಸರುಗಳ ಅಡಿಯಲ್ಲಿ OS ಕೀಚೈನ್ನಲ್ಲಿ ಸಂಗ್ರಹಿಸುತ್ತದೆ. ಹಸ್ತಚಾಲಿತ
ಆಮದಿಗಾಗಿ ಅವುಗಳನ್ನು ಹಿಂಪಡೆಯಲು, ಇಲ್ಲಿ ನೋಡಿ:

**Linux**

```
~/.config/zed/settings.json
```

`language_models` ವಿಭಾಗವು ಪೂರೈಕೆದಾರರ ಕಾನ್ಫಿಗರೇಶನ್ಗಳನ್ನು ಒಳಗೊಂಡಿರುತ್ತದೆ. Zed UI ಮೂಲಕ
ಕೀಚೈನ್ಗೆ ಉಳಿಸಿದ ಕೀಲಿಗಳು `settings.json` ನಲ್ಲಿ ಸರಳ ಪಠ್ಯ ರೂಪದಲ್ಲಿರುವುದಿಲ್ಲ; GNOME Keyring / Seahorse ನಂತಹ
ಕೀಚೈನ್ ವೀಕ್ಷಕದ ಮೂಲಕ ಅಥವಾ ಈ ಕೆಳಗಿನುದನ್ನು ಚಲಾಯಿಸುವ ಮೂಲಕ ಅವುಗಳನ್ನು ಹಿಂಪಡೆಯಿರಿ:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

`zed` ಗಾಗಿ ಹುಡುಕುವ ಮೂಲಕ **Keychain Access.app** ನಲ್ಲಿ ಕೀಚೈನ್ ನಮೂದುಗಳನ್ನು ಕಾಣಬಹುದು.

## ವಾಲ್ಯೂಮ್-ಮೌಂಟ್ ಆಯ್ಕೆ (ಸುಧಾರಿತ)

ಐಚ್ಛಿಕವಾಗಿ ನೀವು Zed ಕಾನ್ಫಿಗರೇಶನ್ ಡೈರೆಕ್ಟರಿಯನ್ನು ಕಂಟೇನರ್ಗೆ ಓದಲು-ಮಾತ್ರವಾಗಿ ಮೌಂಟ್ ಮಾಡಬಹುದು.
ಇದು ಕೀಚೈನ್ ಸಮಸ್ಯೆಯನ್ನು ಸರಿಪಡಿಸುವುದಿಲ್ಲ, ಆದರೆ ರಹಸ್ಯವಲ್ಲದ Zed ಕಾನ್ಫಿಗರೇಶನ್ ಮೌಲ್ಯಗಳನ್ನು
(ಉದಾ., ಮಾದರಿ ಆದ್ಯತೆಗಳು) ಓದುವ ಭವಿಷ್ಯದ ವೈಶಿಷ್ಟ್ಯಗಳಿಗೆ ಉಪಯುಕ್ತವಾಗಬಹುದು.

```yaml
# docker-compose.yml ತುಣುಕು
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux ಹೋಸ್ಟ್
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # macOS ಹೋಸ್ಟ್ (ಬದಲಿಗೆ ಇದನ್ನು ಕಾಮೆಂಟ್ನಿಂದ ಹೊರತೆಗೆಯಿರಿ)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # ಭವಿಷ್ಯದಲ್ಲಿ: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

ಗಮನಿಸಿ: `ZED_CONFIG_PATH` ಪರಿಸರ ವೇರಿಯಬಲ್ ಓವರ್ರೈಡ್ ಅನ್ನು ಇನ್ನೂ ಅನುಷ್ಠಾನಗೊಳಿಸಲಾಗಿಲ್ಲ. ಈ
ವೈಶಿಷ್ಟ್ಯವನ್ನು ಸೇರಿಸಿದಾಗ ಬಳಸಲು ಈ ತುಣುಕನ್ನು ಉಲ್ಲೇಖವಾಗಿ ಒದಗಿಸಲಾಗಿದೆ.

## ಹಸ್ತಚಾಲಿತ ಆಮದು API

ಹಸ್ತಚಾಲಿತ ಆಮದು ಎಂಡ್ಪಾಯಿಂಟ್ ಅನ್ನು ನೇರವಾಗಿಯೂ ಕರೆಯಬಹುದು:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "ನನ್ನ Zed OpenAI ಕೀಲಿ"   // ಐಚ್ಛಿಕ
}
```

ಯಶಸ್ವಿಯಾದಾಗ ಇದು ಹೀಗೆ ಹಿಂದಿರುಗಿಸುತ್ತದೆ:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## ಸಮಸ್ಯೆ ಪರಿಹಾರ

| ಲಕ್ಷಣ                              | ಕಾರಣ                           | ಪರಿಹಾರ                                |
| ---------------------------------- | ------------------------------ | ------------------------------------- |
| 422 + `zedDockerEnvironment: true` | Docker ಒಳಗೆ ಚಾಲನೆಯಲ್ಲಿದೆ       | Manual Token Import ಟ್ಯಾಬ್ ಬಳಸಿ       |
| 404 + `zedInstalled: false`        | ಹೋಸ್ಟ್ನಲ್ಲಿ Zed ಸ್ಥಾಪಿತವಾಗಿಲ್ಲ | Zed ಸ್ಥಾಪಿಸಿ ಅಥವಾ ಹಸ್ತಚಾಲಿತ ಆಮದು ಬಳಸಿ |
| 403 + ಕೀಚೈನ್ ಪ್ರವೇಶ ನಿರಾಕರಿಸಲಾಗಿದೆ | OS ಕೀಚೈನ್ ಪ್ರವೇಶ ನಿರಾಕರಿಸಿದೆ   | OS ಪ್ರಾಂಪ್ಟ್ನಲ್ಲಿ ಅನುಮತಿ ನೀಡಿ         |
| 404 + ಕೀಚೈನ್ ಸೇವೆ ಲಭ್ಯವಿಲ್ಲ        | Linux ನಲ್ಲಿ `libsecret` ಇಲ್ಲ   | `libsecret-1-dev` ಸ್ಥಾಪಿಸಿ            |
