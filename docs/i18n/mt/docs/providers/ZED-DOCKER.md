# Zed IDE Integration in Docker Environments (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Meta OmniRoute jaħdem ġewwa Docker, il-proċess standard ta’ "Import from Zed Keychain" ifalli
għax il-container ma jistax jaċċessa d-daemon tal-keychain tas-sistema operattiva ospitanti (libsecret fuq Linux,
Keychain fuq macOS, Credential Manager fuq Windows) u d-direttorji tal-konfigurazzjoni ta’ Zed fis-sistema
tal-fajls ospitanti ma jkunux viżibbli ġewwa l-container b’mod awtomatiku.

## Għaliex l-Importazzjoni mill-Keychain Tfalli f’Docker

Żewġ problemi li jimblukkaw il-proċess iseħħu ġewwa container:

1. **Iżolament tas-sistema tal-fajls** — `isZedInstalled()` ifittex `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS), jew l-ekwivalenti fuq Windows. Dawn il-mogħdijiet
   jinsabu fuq is-sistema ospitanti u ma jkunux disponibbli sakemm ma jiġux immuntati espliċitament bħala volume.
2. **Iżolament tal-IPC** — Anki meta d-direttorju tal-konfigurazzjoni jkun immuntat, il-module nattiv `keytar`
   jikkomunika mas-servizz tal-keychain tas-sistema operattiva permezz ta’ socket Unix jew sessjoni D-Bus.
   L-ebda wieħed minnhom ma jkun konness mal-container b’mod awtomatiku, għalhekk il-qari tal-kredenzjali dejjem ifalli.

OmniRoute jidentifika l-ambjent Docker permezz ta’ żewġ euristiċi:

- Il-preżenza ta’ `/.dockerenv` (miktub mid-daemon ta’ Docker meta jibda l-container).
- Is-sekwenza `docker` tidher f’`/proc/1/cgroup` (Linux cgroup v1).

Meta tiġi attivata waħda minn dawn l-euristiċi, ir-rotta tal-importazzjoni tirritorna HTTP 422 b’
`zedDockerEnvironment: true` u messaġġ li jidderiġik lejn it-tab Manual Token Import.

## Kif Tuża t-Tab Manual Token Import

1. Iftaħ **Dashboard → Providers → Zed**.
2. Il-pannell **Manual Token Import** jidher taħt il-kard tal-importazzjoni mill-keychain. Meta
   OmniRoute jidentifika Docker, dan il-pannell jespandi awtomatikament wara l-ewwel tentattiv fallut
   ta’ importazzjoni mill-keychain.
3. Agħżel il-provider mil-lista dropdown (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter, jew DeepSeek).
4. Waħħal il-key tal-API fil-field tal-password.
5. Ikklikkja **Import**.

Il-key tiġi ssejvjata bħala konnessjoni ġdida tal-provider bl-isem
`Zed Manual Import (<provider>)`.

## Fejn Zed Jaħżen il-Keys tal-API fuq is-Sistema Ospitanti

Zed jaħżen il-keys tal-providers tal-AI fil-keychain tas-sistema operattiva taħt ismijiet ta’ servizzi bħal
`zed-openai`, `ai.zed.openai`, `zed-anthropic`, eċċ. Biex tirkuprahom għall-importazzjoni
manwali, fittex f’:

**Linux**

```
~/.config/zed/settings.json
```

Is-sezzjoni `language_models` fiha l-konfigurazzjonijiet tal-providers. Il-keys issejvjati fil-
keychain permezz tal-UI ta’ Zed ma jkunux f’test sempliċi f’`settings.json`; irkuprahom permezz
ta’ viewer tal-keychain bħal GNOME Keyring / Seahorse, jew billi tħaddem:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

L-entrati tal-Keychain jistgħu jinstabu f’**Keychain Access.app** billi tfittex `zed`.

## Għażla ta’ Volume Mount (Avvanzata)

Tista’ b’mod fakultattiv timmonta d-direttorju tal-konfigurazzjoni ta’ Zed bħala read-only ġewwa l-container.
Dan ma jsolvix il-problema tal-keychain iżda jista’ jkun utli għal funzjonalitajiet futuri li jaqraw
valuri mhux sigrieti tal-konfigurazzjoni ta’ Zed (eż., preferenzi tal-mudelli).

```yaml
# Silta minn docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Sistema ospitanti Linux
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # Sistema ospitanti macOS (neħħi l-kumment minn din minflok)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # Fil-futur: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Nota: l-użu ta’ override permezz tal-varjabbli tal-ambjent `ZED_CONFIG_PATH` għadu mhux implimentat. Din
is-silta hija pprovduta bħala referenza għal meta tiżdied dik il-funzjonalità.

## API għall-Importazzjoni Manwali

L-endpoint tal-importazzjoni manwali jista’ jissejjaħ ukoll direttament:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "Il-key OpenAI tiegħi ta’ Zed"   // fakultattiv
}
```

F’każ ta’ suċċess, jirritorna:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Soluzzjoni tal-Problemi

| Sintomu                                           | Kawża                                                | Soluzzjoni                                         |
| ------------------------------------------------- | ---------------------------------------------------- | -------------------------------------------------- |
| 422 + `zedDockerEnvironment: true`                | Qed jitħaddem ġewwa Docker                           | Uża t-tab Manual Token Import                      |
| 404 + `zedInstalled: false`                       | Zed mhuwiex installat fuq is-sistema ospitanti       | Installa Zed jew uża l-importazzjoni manwali       |
| 403 + aċċess għall-keychain miċħud                | Is-sistema operattiva ċaħdet l-aċċess għall-keychain | Agħti l-permess fil-messaġġ tas-sistema operattiva |
| 404 + is-servizz tal-keychain mhuwiex disponibbli | `libsecret` nieqes fuq Linux                         | Installa `libsecret-1-dev`                         |
