# Zed IDE Integration in Docker Environments (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Lokacin da OmniRoute ke gudana a cikin Docker, tsarin da aka saba na "Import from Zed Keychain" yana gaza
saboda container ba zai iya isa ga daemon na keychain na tsarin aiki na host ba (`libsecret` a Linux,
Keychain a macOS, Credential Manager a Windows), sannan kundin adireshin saitunan Zed da ke kan
tsarin fayil na host ba sa bayyana a cikin container ta tsohuwa.

## Dalilin da ya sa Shigo da Bayanai daga Keychain ke Gazawa a Docker

Matsaloli biyu masu hana aiki suna faruwa a cikin container:

1. **Keɓewar tsarin fayil** — `isZedInstalled()` yana neman `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS), ko makamancin wannan na Windows. Waɗannan paths
   suna kan host kuma ba sa samuwa sai an haɗa su a matsayin volume a fili.
2. **Keɓewar IPC** — Ko da an haɗa kundin adireshin saitunan, native module na `keytar`
   yana sadarwa da sabis ɗin keychain na tsarin aiki ta Unix socket ko zaman D-Bus.
   Babu ɗayansu da ake haɗawa zuwa container ta tsohuwa, saboda haka karanta bayanan shiga kullum yana gazawa.

OmniRoute yana gano yanayin Docker ta hanyoyi biyu:

- Kasancewar `/.dockerenv` (wanda Docker daemon ke rubutawa lokacin da container ya fara).
- Bayyanar kalmar `docker` a cikin `/proc/1/cgroup` (Linux cgroup v1).

Idan ɗaya daga cikin waɗannan hanyoyin ya gano Docker, hanyar shigo da bayanai za ta dawo da HTTP 422 tare da
`zedDockerEnvironment: true` da saƙon da ke tura ka zuwa shafin Manual Token Import.

## Amfani da Shafin Manual Token Import

1. Buɗe **Dashboard → Providers → Zed**.
2. Bangaren **Manual Token Import** yana bayyana a ƙasan katin shigo da bayanai daga keychain. Idan
   OmniRoute ya gano Docker, wannan bangaren zai buɗe da kansa bayan yunƙurin farko na shigo da bayanai
   daga keychain ya gaza.
3. Zaɓi provider daga jerin zaɓuka (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter, ko DeepSeek).
4. Liƙa API key a filin kalmar sirri.
5. Danna **Import**.

Ana adana key ɗin a matsayin sabuwar haɗin provider mai suna
`Zed Manual Import (<provider>)`.

## Inda Zed ke Adana API Keys a Kan Host

Zed yana adana keys na AI provider a cikin keychain na tsarin aiki ƙarƙashin sunayen sabis kamar
`zed-openai`, `ai.zed.openai`, `zed-anthropic`, da sauransu. Don samo su domin shigo da su
da hannu, duba a:

**Linux**

```
~/.config/zed/settings.json
```

Sashen `language_models` yana ɗauke da saitunan provider. Keys da aka adana a
keychain ta hanyar Zed UI ba sa cikin rubutu marar ɓoyewa a `settings.json`; samo su ta
manhajar duba keychain kamar GNOME Keyring / Seahorse, ko ta gudanar da:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Ana iya samun bayanan keychain a cikin **Keychain Access.app** ta neman `zed`.

## Zaɓin Haɗa Volume (Na Ci-gaba)

Kana iya haɗa kundin adireshin saitunan Zed zuwa container a matsayin karantawa-kawai idan kana so.
Wannan ba ya gyara matsalar keychain, amma yana iya zama da amfani ga fasalolin nan gaba da za su karanta
ƙimomin saitunan Zed marasa sirri (misali, zaɓin models).

```yaml
# Ƙaramin ɓangaren docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Host na Linux
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # Host na macOS (cire alamar comment a maimakon na sama)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # Nan gaba: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Lura: har yanzu ba a aiwatar da damar sauya path ta environment variable `ZED_CONFIG_PATH` ba. An
bayar da wannan snippet a matsayin abin dubawa lokacin da aka ƙara wannan fasalin.

## API na Shigo da Bayanai da Hannu

Haka kuma, ana iya kiran endpoint na shigo da bayanai da hannu kai tsaye:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "My Zed OpenAI key"   // na zaɓi
}
```

Idan ya yi nasara, zai dawo da:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Magance Matsaloli

| Alama                              | Dalili                              | Mafita                                   |
| ---------------------------------- | ----------------------------------- | ---------------------------------------- |
| 422 + `zedDockerEnvironment: true` | Ana gudana a cikin Docker           | Yi amfani da shafin Manual Token Import  |
| 404 + `zedInstalled: false`        | Ba a girka Zed a kan host ba        | Girka Zed ko yi amfani da shigo da hannu |
| 403 + an hana isa ga keychain      | Tsarin aiki ya hana isa ga keychain | Ba da izini a tambayar tsarin aiki       |
| 404 + babu sabis ɗin keychain      | Babu `libsecret` a Linux            | Girka `libsecret-1-dev`                  |
