# Zed IDE Integration in Docker Environments (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Docker ଭିତରେ OmniRoute ଚାଲୁଥିବାବେଳେ, ମାନକ "Zed କୀଚେନ୍ରୁ ଆମଦାନୀ" ପ୍ରବାହ ବିଫଳ ହୁଏ,
କାରଣ କଣ୍ଟେନର୍ ହୋଷ୍ଟ OS କୀଚେନ୍ ଡେମନ୍କୁ (Linux ରେ libsecret,
macOS ରେ Keychain, Windows ରେ Credential Manager) ପହଞ୍ଚିପାରେ ନାହିଁ ଏବଂ ହୋଷ୍ଟ
ଫାଇଲ୍ସିଷ୍ଟମ୍ରେ ଥିବା Zed କନଫିଗ୍ ଡିରେକ୍ଟୋରୀଗୁଡ଼ିକ କଣ୍ଟେନର୍ ଭିତରେ ଡିଫଲ୍ଟ ଭାବେ ଦୃଶ୍ୟମାନ ନୁହେଁ।

## Docker ରେ କୀଚେନ୍ ଆମଦାନୀ କାହିଁକି ବିଫଳ ହୁଏ

କଣ୍ଟେନର୍ ଭିତରେ ଦୁଇଟି ପ୍ରତିବନ୍ଧକ ସମସ୍ୟା ଦେଖାଦିଏ:

1. **ଫାଇଲ୍ସିଷ୍ଟମ୍ ପୃଥକୀକରଣ** — `isZedInstalled()` `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS), କିମ୍ବା Windows ର ସମତୁଲ୍ୟ ପଥ ଖୋଜେ। ଏହି ପଥଗୁଡ଼ିକ
   ହୋଷ୍ଟରେ ଥାଏ ଏବଂ ସ୍ପଷ୍ଟ ଭାବେ ଭଲ୍ୟୁମ୍-ମାଉଣ୍ଟ ନକରାଯିବା ପର୍ଯ୍ୟନ୍ତ ଉପଲବ୍ଧ ହୁଏ ନାହିଁ।
2. **IPC ପୃଥକୀକରଣ** — କନଫିଗ୍ ଡିରେକ୍ଟୋରୀ ମାଉଣ୍ଟ କରାଯାଇଥିଲେ ମଧ୍ୟ, `keytar` ନେଟିଭ୍
   ମଡ୍ୟୁଲ୍ ଏକ Unix ସକେଟ୍ କିମ୍ବା D-Bus ସେସନ୍ ମାଧ୍ୟମରେ OS କୀଚେନ୍ ସେବା ସହ ଯୋଗାଯୋଗ କରେ।
   ଡିଫଲ୍ଟ ଭାବେ ଏଗୁଡ଼ିକ ମଧ୍ୟରୁ କୌଣସିଟି କଣ୍ଟେନର୍ ସହ ସଂଯୁକ୍ତ ହୋଇନଥାଏ, ତେଣୁ କ୍ରେଡେନ୍ସିଆଲ୍ ପଠନ ସର୍ବଦା ବିଫଳ ହୁଏ।

OmniRoute ଦୁଇଟି ହ୍ୟୁରିଷ୍ଟିକ୍ ମାଧ୍ୟମରେ Docker ପରିବେଶ ଚିହ୍ନଟ କରେ:

- `/.dockerenv` ର ଉପସ୍ଥିତି (କଣ୍ଟେନର୍ ଆରମ୍ଭ ସମୟରେ Docker ଡେମନ୍ ଦ୍ୱାରା ଲେଖାଯାଇଥାଏ)।
- `/proc/1/cgroup` ରେ `docker` ଷ୍ଟ୍ରିଙ୍ଗ୍ର ଉପସ୍ଥିତି (Linux cgroup v1)।

ଯେକୌଣସି ହ୍ୟୁରିଷ୍ଟିକ୍ ସକ୍ରିୟ ହେଲେ, ଆମଦାନୀ ରୁଟ୍ HTTP 422 ସହ
`zedDockerEnvironment: true` ଏବଂ ଆପଣଙ୍କୁ ମାନୁଆଲ୍ ଟୋକନ୍ ଆମଦାନୀ ଟ୍ୟାବ୍କୁ ଯିବାକୁ ନିର୍ଦ୍ଦେଶ ଦେଉଥିବା ଏକ ସନ୍ଦେଶ ଫେରାଏ।

## ମାନୁଆଲ୍ ଟୋକନ୍ ଆମଦାନୀ ଟ୍ୟାବ୍ ବ୍ୟବହାର କରିବା

1. **ଡ୍ୟାସ୍ବୋର୍ଡ → ପ୍ରଦାନକାରୀ → Zed** ଖୋଲନ୍ତୁ।
2. କୀଚେନ୍ ଆମଦାନୀ କାର୍ଡ ତଳେ **ମାନୁଆଲ୍ ଟୋକନ୍ ଆମଦାନୀ** ପ୍ୟାନେଲ୍ ଦେଖାଯାଏ। OmniRoute
   Docker ଚିହ୍ନଟ କଲେ, ପ୍ରଥମ ବିଫଳ କୀଚେନ୍ ଆମଦାନୀ ପ୍ରୟାସ ପରେ ଏହି ପ୍ୟାନେଲ୍ ସ୍ୱୟଂଚାଳିତ ଭାବେ
   ବିସ୍ତାରିତ ହୁଏ।
3. ଡ୍ରପ୍ଡାଉନ୍ରୁ ପ୍ରଦାନକାରୀ ବାଛନ୍ତୁ (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter, କିମ୍ବା DeepSeek)।
4. ପାସ୍ୱାର୍ଡ ଫିଲ୍ଡରେ API କୀ ପେଷ୍ଟ କରନ୍ତୁ।
5. **ଆମଦାନୀ** କ୍ଲିକ୍ କରନ୍ତୁ।

କୀଟି ନିମ୍ନ ନାମ ସହ ଏକ ନୂତନ ପ୍ରଦାନକାରୀ ସଂଯୋଗ ଭାବେ ସଞ୍ଚୟ ହୁଏ:
`Zed Manual Import (<provider>)`।

## Zed ହୋଷ୍ଟରେ API କୀଗୁଡ଼ିକୁ କେଉଁଠାରେ ସଞ୍ଚୟ କରେ

Zed, `zed-openai`, `ai.zed.openai`, `zed-anthropic` ଇତ୍ୟାଦି ସେବା ନାମ ଅଧୀନରେ
OS କୀଚେନ୍ରେ AI ପ୍ରଦାନକାରୀ କୀଗୁଡ଼ିକୁ ସଞ୍ଚୟ କରେ। ମାନୁଆଲ୍ ଆମଦାନୀ ପାଇଁ ସେଗୁଡ଼ିକୁ
ପୁନରୁଦ୍ଧାର କରିବାକୁ, ଏଠାରେ ଖୋଜନ୍ତୁ:

**Linux**

```
~/.config/zed/settings.json
```

`language_models` ବିଭାଗରେ ପ୍ରଦାନକାରୀ କନଫିଗରେସନ୍ଗୁଡ଼ିକ ରହିଛି। Zed UI ମାଧ୍ୟମରେ
କୀଚେନ୍ରେ ସଞ୍ଚିତ କୀଗୁଡ଼ିକ `settings.json` ରେ ସାଧାରଣ ଟେକ୍ସଟ୍ ଭାବେ ନଥାଏ; GNOME Keyring / Seahorse
ପରି ଏକ କୀଚେନ୍ ଭ୍ୟୁଅର୍ ମାଧ୍ୟମରେ, କିମ୍ବା ନିମ୍ନଲିଖିତ ଚଲାଇ ସେଗୁଡ଼ିକୁ ପୁନରୁଦ୍ଧାର କରନ୍ତୁ:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

`zed` ଖୋଜି **Keychain Access.app** ରେ କୀଚେନ୍ ଏଣ୍ଟ୍ରିଗୁଡ଼ିକ ମିଳିପାରିବ।

## ଭଲ୍ୟୁମ୍-ମାଉଣ୍ଟ ବିକଳ୍ପ (ଉନ୍ନତ)

ଆପଣ ବୈକଳ୍ପିକ ଭାବେ Zed କନଫିଗ୍ ଡିରେକ୍ଟୋରୀକୁ କେବଳ-ପଠନୀୟ ମୋଡ୍ରେ କଣ୍ଟେନର୍ରେ ମାଉଣ୍ଟ କରିପାରିବେ।
ଏହା କୀଚେନ୍ ସମସ୍ୟାକୁ ସମାଧାନ କରେ ନାହିଁ, କିନ୍ତୁ ଅଣ-ଗୋପନୀୟ Zed କନଫିଗ୍ ମୂଲ୍ୟଗୁଡ଼ିକ
(ଉଦାହରଣ ସ୍ୱରୂପ, ମଡେଲ୍ ପସନ୍ଦ) ପଢ଼ୁଥିବା ଭବିଷ୍ୟତ ବୈଶିଷ୍ଟ୍ୟଗୁଡ଼ିକ ପାଇଁ ଉପଯୋଗୀ ହୋଇପାରେ।

```yaml
# docker-compose.yml ସ୍ନିପେଟ୍
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux ହୋଷ୍ଟ
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # macOS ହୋଷ୍ଟ (ଏହା ପରିବର୍ତ୍ତେ କମେଣ୍ଟ ହଟାନ୍ତୁ)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # ଭବିଷ୍ୟତରେ: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

ଟିପ୍ପଣୀ: `ZED_CONFIG_PATH` ପରିବେଶ ଭେରିଏବଲ୍ ଓଭର୍ରାଇଡ୍ ଏପର୍ଯ୍ୟନ୍ତ କାର୍ଯ୍ୟକାରୀ କରାଯାଇନାହିଁ। ଏହି
ସ୍ନିପେଟ୍ଟି ସେହି ବୈଶିଷ୍ଟ୍ୟ ଯୋଡ଼ାଯିବା ସମୟ ପାଇଁ ଏକ ସନ୍ଦର୍ଭ ଭାବେ ପ୍ରଦାନ କରାଯାଇଛି।

## ମାନୁଆଲ୍ ଆମଦାନୀ API

ମାନୁଆଲ୍ ଆମଦାନୀ ଏଣ୍ଡପଏଣ୍ଟକୁ ସିଧାସଳଖ ଭାବେ ମଧ୍ୟ କଲ୍ କରାଯାଇପାରେ:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "My Zed OpenAI key"   // ବୈକଳ୍ପିକ
}
```

ସଫଳ ହେଲେ ଏହା ଫେରାଏ:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## ସମସ୍ୟା ନିବାରଣ

| ଲକ୍ଷଣ                              | କାରଣ                             | ସମାଧାନ                                                   |
| ---------------------------------- | -------------------------------- | -------------------------------------------------------- |
| 422 + `zedDockerEnvironment: true` | Docker ଭିତରେ ଚାଲୁଛି              | ମାନୁଆଲ୍ ଟୋକନ୍ ଆମଦାନୀ ଟ୍ୟାବ୍ ବ୍ୟବହାର କରନ୍ତୁ               |
| 404 + `zedInstalled: false`        | ହୋଷ୍ଟରେ Zed ଇନ୍ଷ୍ଟଲ୍ ହୋଇନାହିଁ    | Zed ଇନ୍ଷ୍ଟଲ୍ କରନ୍ତୁ କିମ୍ବା ମାନୁଆଲ୍ ଆମଦାନୀ ବ୍ୟବହାର କରନ୍ତୁ |
| 403 + କୀଚେନ୍ ଆକ୍ସେସ୍ ଅସ୍ୱୀକୃତ      | OS କୀଚେନ୍ ଆକ୍ସେସ୍ ଅସ୍ୱୀକାର କରିଛି | OS ପ୍ରମ୍ପ୍ଟରେ ଅନୁମତି ଦିଅନ୍ତୁ                             |
| 404 + କୀଚେନ୍ ସେବା ଉପଲବ୍ଧ ନାହିଁ     | Linux ରେ `libsecret` ଅନୁପସ୍ଥିତ   | `libsecret-1-dev` ଇନ୍ଷ୍ଟଲ୍ କରନ୍ତୁ                        |
