# Zed IDE Integration in Docker Environments (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

જ્યારે OmniRoute Dockerની અંદર ચાલે છે, ત્યારે પ્રમાણભૂત "Zed Keychainમાંથી આયાત કરો" પ્રક્રિયા નિષ્ફળ જાય છે,
કારણ કે કન્ટેનર હોસ્ટ OS કીચેન ડિમન (Linux પર libsecret,
macOS પર Keychain, Windows પર Credential Manager) સુધી પહોંચી શકતું નથી અને હોસ્ટ ફાઇલસિસ્ટમ પરની
Zed કૉન્ફિગરેશન ડિરેક્ટરીઓ મૂળભૂત રીતે કન્ટેનરની અંદર દેખાતી નથી.

## Dockerમાં Keychain આયાત શા માટે નિષ્ફળ જાય છે

કન્ટેનરની અંદર બે અવરોધક સમસ્યાઓ થાય છે:

1. **ફાઇલસિસ્ટમ આઇસોલેશન** — `isZedInstalled()` `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS), અથવા Windowsમાં તેના સમકક્ષ પાથને શોધે છે. આ પાથ
   હોસ્ટ પર હોય છે અને જ્યાં સુધી તેમને સ્પષ્ટ રીતે વોલ્યુમ તરીકે માઉન્ટ કરવામાં ન આવે ત્યાં સુધી ઉપલબ્ધ હોતા નથી.
2. **IPC આઇસોલેશન** — કૉન્ફિગરેશન ડિરેક્ટરી માઉન્ટ કરેલી હોય ત્યારે પણ, `keytar` નેટિવ
   મોડ્યુલ Unix સૉકેટ અથવા D-Bus સત્ર મારફતે OS કીચેન સેવા સાથે સંચાર કરે છે.
   મૂળભૂત રીતે તેમાંથી કોઈને પણ કન્ટેનર સાથે બ્રિજ કરવામાં આવતું નથી, તેથી ક્રેડેન્શિયલ વાંચવાના પ્રયાસો હંમેશાં નિષ્ફળ જાય છે.

OmniRoute બે હ્યુરિસ્ટિક્સ દ્વારા Docker પર્યાવરણને ઓળખે છે:

- `/.dockerenv`ની હાજરી (કન્ટેનર શરૂ થાય ત્યારે Docker ડિમન દ્વારા લખવામાં આવે છે).
- `/proc/1/cgroup`માં `docker` સ્ટ્રિંગનું દેખાવું (Linux cgroup v1).

જ્યારે બેમાંથી કોઈપણ હ્યુરિસ્ટિક ટ્રિગર થાય છે, ત્યારે આયાત રૂટ HTTP 422 સાથે
`zedDockerEnvironment: true` અને તમને મેન્યુઅલ ટોકન આયાત ટૅબ પર જવા માટે સૂચવતો સંદેશ પરત કરે છે.

## મેન્યુઅલ ટોકન આયાત ટૅબનો ઉપયોગ

1. **ડૅશબોર્ડ → પ્રોવાઇડર્સ → Zed** ખોલો.
2. **મેન્યુઅલ ટોકન આયાત** પેનલ કીચેન આયાત કાર્ડની નીચે દેખાય છે. જ્યારે
   OmniRoute Dockerને ઓળખે છે, ત્યારે કીચેન આયાતનો પ્રથમ નિષ્ફળ પ્રયાસ થયા પછી આ પેનલ આપમેળે વિસ્તરે છે.
3. ડ્રૉપડાઉનમાંથી પ્રોવાઇડર પસંદ કરો (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter, અથવા DeepSeek).
4. પાસવર્ડ ફીલ્ડમાં API કી પેસ્ટ કરો.
5. **આયાત કરો** પર ક્લિક કરો.

કી `Zed Manual Import (<provider>)` નામ સાથે નવા પ્રોવાઇડર
કનેક્શન તરીકે સાચવવામાં આવે છે.

## Zed હોસ્ટ પર API કી ક્યાં સંગ્રહે છે

Zed, `zed-openai`, `ai.zed.openai`, `zed-anthropic` વગેરે જેવા સેવા નામો હેઠળ
OS કીચેનમાં AI પ્રોવાઇડર કી સંગ્રહે છે. મેન્યુઅલ
આયાત માટે તેમને મેળવવા, અહીં જુઓ:

**Linux**

```
~/.config/zed/settings.json
```

`language_models` વિભાગમાં પ્રોવાઇડર કૉન્ફિગરેશન્સ હોય છે. Zed UI મારફતે કીચેનમાં
સાચવેલી કી `settings.json`માં સાદા ટેક્સ્ટ તરીકે હોતી નથી; તેને GNOME Keyring / Seahorse જેવા
કીચેન વ્યૂઅર દ્વારા અથવા નીચેનો આદેશ ચલાવીને મેળવો:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

`zed` માટે શોધ કરીને કીચેન એન્ટ્રીઓ **Keychain Access.app**માં મળી શકે છે.

## વોલ્યુમ-માઉન્ટ વિકલ્પ (અદ્યતન)

તમે વૈકલ્પિક રીતે Zed કૉન્ફિગરેશન ડિરેક્ટરીને કન્ટેનરમાં માત્ર વાંચવા માટે માઉન્ટ કરી શકો છો.
આનાથી કીચેનની સમસ્યા ઉકેલાતી નથી, પરંતુ બિન-ગુપ્ત Zed કૉન્ફિગરેશન મૂલ્યો
(દા.ત., મોડેલ પસંદગીઓ) વાંચતી ભાવિ સુવિધાઓ માટે તે ઉપયોગી થઈ શકે છે.

```yaml
# docker-compose.ymlનો અંશ
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux હોસ્ટ
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # તેના બદલે macOS હોસ્ટ માટે (અનકમેન્ટ કરો)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # ભાવિ: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

નોંધ: `ZED_CONFIG_PATH` પર્યાવરણ વેરિએબલ ઓવરરાઇડ હજી અમલમાં મૂકવામાં આવ્યું નથી. આ
અંશ તે સુવિધા ઉમેરવામાં આવે ત્યારે સંદર્ભ માટે આપવામાં આવ્યો છે.

## મેન્યુઅલ આયાત API

મેન્યુઅલ આયાત એન્ડપૉઇન્ટને સીધો પણ કૉલ કરી શકાય છે:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "My Zed OpenAI key"   // વૈકલ્પિક
}
```

સફળતા પર તે નીચેનું પરત કરે છે:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## સમસ્યા નિવારણ

| લક્ષણ                              | કારણ                            | ઉકેલ                                      |
| ---------------------------------- | ------------------------------- | ----------------------------------------- |
| 422 + `zedDockerEnvironment: true` | Dockerની અંદર ચાલી રહ્યું છે    | મેન્યુઅલ ટોકન આયાત ટૅબનો ઉપયોગ કરો        |
| 404 + `zedInstalled: false`        | હોસ્ટ પર Zed ઇન્સ્ટોલ નથી       | Zed ઇન્સ્ટોલ કરો અથવા મેન્યુઅલ આયાત વાપરો |
| 403 + કીચેન ઍક્સેસ નકારવામાં આવ્યો | OSએ કીચેન ઍક્સેસ નકારી          | OS પ્રોમ્પ્ટમાં પરવાનગી આપો               |
| 404 + કીચેન સેવા ઉપલબ્ધ નથી        | Linux પર `libsecret` ગેરહાજર છે | `libsecret-1-dev` ઇન્સ્ટોલ કરો            |
