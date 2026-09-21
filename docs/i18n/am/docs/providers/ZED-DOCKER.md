# Zed IDE Integration in Docker Environments (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

OmniRoute በ Docker ውስጥ ሲሠራ፣ መደበኛው "ከ Zed Keychain አስገባ" ሂደት አይሳካም፤
ምክንያቱም container-ው የhost OS keychain daemon-ን (በ Linux ላይ libsecret፣
በ macOS ላይ Keychain፣ በ Windows ላይ Credential Manager) ማግኘት አይችልም፣ እንዲሁም በhost
filesystem ላይ ያሉት የZed ውቅር directories በነባሪነት በcontainer-ው ውስጥ አይታዩም።

## Keychain Import በ Docker ውስጥ የማይሳካው ለምንድን ነው

በcontainer ውስጥ ሁለት እንቅፋት የሚሆኑ ችግሮች ይከሰታሉ፦

1. **የFilesystem ማግለል** — `isZedInstalled()` `~/.config/zed` (Linux)፣
   `~/Library/Application Support/Zed` (macOS)፣ ወይም በWindows ላይ ተመጣጣኝ የሆነውን path ይፈልጋል። እነዚህ paths
   በhost ላይ የሚገኙ ሲሆን በግልጽ volume-mounted ካልተደረጉ በስተቀር አይገኙም።
2. **የIPC ማግለል** — የውቅር directory-ው mounted በሚደረግበት ጊዜም እንኳ፣ የ`keytar` native
   module ከOS keychain service ጋር በUnix socket ወይም በD-Bus session በኩል ይገናኛል።
   ከሁለቱም አንዳቸውም በነባሪነት ወደ container-ው bridged አይደረጉም፣ ስለዚህ credential ማንበብ ሁልጊዜ አይሳካም።

OmniRoute የDocker environment-ን በሁለት heuristics ይለያል፦

- `/.dockerenv` መኖሩ (container-ው ሲጀምር በDocker daemon የሚጻፍ)።
- `docker` የሚለው string በ`/proc/1/cgroup` ውስጥ መታየቱ (Linux cgroup v1)።

ከሁለቱ heuristics አንዱ ሲሟላ፣ import route-ው HTTP 422ን ከ
`zedDockerEnvironment: true` እና ወደ Manual Token Import tab የሚመራዎትን መልዕክት ጋር ይመልሳል።

## Manual Token Import Tab-ን መጠቀም

1. **Dashboard → Providers → Zed**ን ይክፈቱ።
2. የ**Manual Token Import** panel ከkeychain import card በታች ይታያል።
   OmniRoute Dockerን ሲለይ፣ ይህ panel የመጀመሪያው keychain import ሙከራ ካልተሳካ በኋላ በራስ-ሰር ይስፋፋል።
3. ከdropdown-ው provider-ን ይምረጡ (OpenAI፣ Anthropic፣ Google፣ Mistral፣ xAI፣
   OpenRouter፣ ወይም DeepSeek)።
4. API key-ውን በpassword field ውስጥ ይለጥፉ።
5. **Import**ን ጠቅ ያድርጉ።

Key-ው `Zed Manual Import (<provider>)` በሚለው ስም
እንደ አዲስ provider connection ይቀመጣል።

## Zed በHost ላይ API Keysን የሚያከማችበት ቦታ

Zed የAI provider keysን እንደ `zed-openai`፣ `ai.zed.openai`፣
`zed-anthropic` እና የመሳሰሉ service names በመጠቀም በOS keychain ውስጥ ያከማቻል። ለmanual
import እነሱን ለማግኘት፣ በሚከተሉት ቦታዎች ይመልከቱ፦

**Linux**

```
~/.config/zed/settings.json
```

የ`language_models` section የprovider configurationsን ይዟል። በZed UI አማካኝነት ወደ
keychain የተቀመጡ keys በ`settings.json` ውስጥ እንደ plain text አይገኙም፤ እነሱን
እንደ GNOME Keyring / Seahorse ባለ keychain viewer ያግኙ፣ ወይም የሚከተለውን ያሂዱ፦

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Keychain entriesን በ**Keychain Access.app** ውስጥ `zed`ን በመፈለግ ማግኘት ይቻላል።

## የVolume-Mount አማራጭ (የላቀ)

እንደ አማራጭ የZed ውቅር directory-ውን read-only አድርገው ወደ container-ው mount ማድረግ ይችላሉ።
ይህ የkeychain ችግሩን አያስተካክልም፣ ነገር ግን secret ያልሆኑ የZed ውቅር valuesን
ለሚያነቡ የወደፊት features (ለምሳሌ፣ model preferences) ጠቃሚ ሊሆን ይችላል።

```yaml
# የdocker-compose.yml ቅንጣቢ
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux host
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # macOS host (በምትኩ comment-ን ያስወግዱ)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # ወደፊት፦ ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

ማስታወሻ፦ የ`ZED_CONFIG_PATH` environment variable override ገና አልተተገበረም። ይህ
snippet የቀረበው ይህ feature ሲጨመር እንደ ማጣቀሻ እንዲያገለግል ነው።

## Manual Import API

Manual import endpoint-ውን በቀጥታም መጥራት ይቻላል፦

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "የእኔ Zed OpenAI key"   // አማራጭ
}
```

ሲሳካ የሚከተለውን ይመልሳል፦

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## መላ መፈለግ

| ምልክት                                 | ምክንያት                      | መፍትሔ                             |
| ------------------------------------ | -------------------------- | -------------------------------- |
| 422 + `zedDockerEnvironment: true`   | በDocker ውስጥ እየሠራ ነው        | Manual Token Import tab-ን ይጠቀሙ   |
| 404 + `zedInstalled: false`          | Zed በhost ላይ አልተጫነም        | Zedን ይጫኑ ወይም manual importን ይጠቀሙ |
| 403 + keychain access denied         | OS የkeychain accessን ከልክሏል | በOS prompt ውስጥ ፈቃድ ይስጡ           |
| 404 + keychain service not available | `libsecret` በLinux ላይ የለም  | `libsecret-1-dev`ን ይጫኑ           |
