# Zed IDE Integration in Docker Environments (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Kapag tumatakbo ang OmniRoute sa loob ng Docker, nabibigo ang karaniwang daloy na "Import from Zed Keychain"
dahil hindi maaabot ng container ang keychain daemon ng host OS (libsecret sa Linux,
Keychain sa macOS, Credential Manager sa Windows), at hindi nakikita sa loob ng container
bilang default ang mga directory ng Zed config sa host filesystem.

## Bakit Nabibigo ang Pag-import mula sa Keychain sa Docker

May dalawang problemang humahadlang sa loob ng isang container:

1. **Filesystem isolation** — Hinahanap ng `isZedInstalled()` ang `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS), o ang katumbas nito sa Windows. Nasa host
   ang mga path na ito at hindi magiging available maliban kung tahasang naka-volume mount ang mga ito.
2. **IPC isolation** — Kahit naka-mount ang config directory, nakikipag-ugnayan ang native
   module na `keytar` sa serbisyo ng OS keychain sa pamamagitan ng Unix socket o D-Bus session.
   Walang naka-bridge sa mga ito papunta sa container bilang default, kaya palaging nabibigo ang pagbasa ng credential.

Tinutukoy ng OmniRoute ang Docker environment gamit ang dalawang heuristic:

- Pagkakaroon ng `/.dockerenv` (isinusulat ng Docker daemon kapag nagsisimula ang container).
- Paglitaw ng string na `docker` sa `/proc/1/cgroup` (Linux cgroup v1).

Kapag na-trigger ang alinman sa mga heuristic, magbabalik ang import route ng HTTP 422 na may
`zedDockerEnvironment: true` at mensaheng nagtuturo sa iyo na pumunta sa tab na Manual Token Import.

## Paggamit sa Tab na Manual Token Import

1. Buksan ang **Dashboard → Providers → Zed**.
2. Lalabas ang panel na **Manual Token Import** sa ibaba ng keychain import card. Kapag
   natukoy ng OmniRoute ang Docker, awtomatikong lalawak ang panel na ito pagkatapos ng unang
   nabigong pagtatangkang mag-import mula sa keychain.
3. Piliin ang provider mula sa dropdown (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter, o DeepSeek).
4. I-paste ang API key sa password field.
5. I-click ang **Import**.

Ise-save ang key bilang bagong koneksyon sa provider na may pangalang
`Zed Manual Import (<provider>)`.

## Kung Saan Iniimbak ng Zed ang mga API Key sa Host

Iniimbak ng Zed ang mga key ng AI provider sa OS keychain sa ilalim ng mga service name gaya ng
`zed-openai`, `ai.zed.openai`, `zed-anthropic`, at iba pa. Para makuha ang mga ito para sa manual
import, tingnan ang:

**Linux**

```
~/.config/zed/settings.json
```

Naglalaman ang seksyong `language_models` ng mga configuration ng provider. Ang mga key na na-save sa
keychain sa pamamagitan ng Zed UI ay wala bilang plain text sa `settings.json`; kunin ang mga ito gamit
ang keychain viewer gaya ng GNOME Keyring / Seahorse, o sa pamamagitan ng pagpapatakbo ng:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Makikita ang mga entry sa keychain sa **Keychain Access.app** sa pamamagitan ng paghahanap sa `zed`.

## Opsyon sa Volume Mount (Advanced)

Maaari mong opsyonal na i-mount nang read-only ang Zed config directory sa container.
Hindi nito naaayos ang problema sa keychain, ngunit maaaring maging kapaki-pakinabang ito para sa mga feature
sa hinaharap na nagbabasa ng mga hindi sensitibong value ng Zed config (hal., mga kagustuhan sa model).

```yaml
# Sipì mula sa docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux host
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # macOS host (alisin sa comment bilang kapalit)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # Sa hinaharap: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Tandaan: hindi pa ipinapatupad ang override gamit ang environment variable na `ZED_CONFIG_PATH`. Ang
snippet na ito ay ibinigay bilang sanggunian kapag naidagdag na ang feature na iyon.

## API ng Manual Import

Maaari ring direktang tawagin ang manual import endpoint:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "Aking Zed OpenAI key"   // opsyonal
}
```

Kapag matagumpay, ibabalik nito ang:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Pag-troubleshoot

| Sintomas                                   | Sanhi                                    | Solusyon                                     |
| ------------------------------------------ | ---------------------------------------- | -------------------------------------------- |
| 422 + `zedDockerEnvironment: true`         | Tumatakbo sa loob ng Docker              | Gamitin ang tab na Manual Token Import       |
| 404 + `zedInstalled: false`                | Hindi naka-install ang Zed sa host       | I-install ang Zed o gumamit ng manual import |
| 403 + tinanggihan ang access sa keychain   | Tinanggihan ng OS ang access sa keychain | Magbigay ng pahintulot sa prompt ng OS       |
| 404 + hindi available ang keychain service | Nawawala ang `libsecret` sa Linux        | I-install ang `libsecret-1-dev`              |
