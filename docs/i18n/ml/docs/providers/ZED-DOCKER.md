# Zed IDE Integration in Docker Environments (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

OmniRoute Docker-നുള്ളിൽ പ്രവർത്തിക്കുമ്പോൾ, സാധാരണ "Zed Keychain-ൽ നിന്ന് ഇംപോർട്ട് ചെയ്യുക" എന്ന പ്രവാഹം പരാജയപ്പെടുന്നു,
കാരണം കണ്ടെയ്നറിന് ഹോസ്റ്റ് OS കീചെയിൻ ഡീമണിലേക്ക് (Linux-ൽ libsecret,
macOS-ൽ Keychain, Windows-ൽ Credential Manager) എത്താൻ കഴിയില്ല, കൂടാതെ ഹോസ്റ്റ്
ഫയൽസിസ്റ്റത്തിലെ Zed കോൺഫിഗറേഷൻ ഡയറക്ടറികൾ ഡിഫോൾട്ടായി കണ്ടെയ്നറിനുള്ളിൽ ദൃശ്യമല്ല.

## Docker-ൽ Keychain ഇംപോർട്ട് പരാജയപ്പെടുന്നത് എന്തുകൊണ്ട്

ഒരു കണ്ടെയ്നറിനുള്ളിൽ രണ്ട് തടസ്സങ്ങൾ സംഭവിക്കുന്നു:

1. **ഫയൽസിസ്റ്റം ഒറ്റപ്പെടുത്തൽ** — `isZedInstalled()` എന്നത് `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS), അല്ലെങ്കിൽ അതിന് തുല്യമായ Windows പാത തിരയുന്നു. ഈ പാതകൾ
   ഹോസ്റ്റിലാണ് ഉള്ളത്, വ്യക്തമായി വോളിയം-മൗണ്ട് ചെയ്തിട്ടില്ലെങ്കിൽ അവ ലഭ്യമാകില്ല.
2. **IPC ഒറ്റപ്പെടുത്തൽ** — കോൺഫിഗറേഷൻ ഡയറക്ടറി മൗണ്ട് ചെയ്തിരിക്കുമ്പോഴും, `keytar` നേറ്റീവ്
   മൊഡ്യൂൾ ഒരു Unix സോക്കറ്റ് അല്ലെങ്കിൽ D-Bus സെഷൻ വഴി OS കീചെയിൻ സേവനവുമായി ആശയവിനിമയം നടത്തുന്നു.
   ഇവ രണ്ടും ഡിഫോൾട്ടായി കണ്ടെയ്നറിലേക്ക് ബ്രിഡ്ജ് ചെയ്യപ്പെടാത്തതിനാൽ, ക്രെഡൻഷ്യൽ റീഡുകൾ എല്ലായ്പ്പോഴും പരാജയപ്പെടും.

OmniRoute രണ്ട് ഹ്യൂറിസ്റ്റിക്കുകൾ ഉപയോഗിച്ച് Docker പരിസ്ഥിതി കണ്ടെത്തുന്നു:

- `/.dockerenv`-ന്റെ സാന്നിധ്യം (കണ്ടെയ്നർ ആരംഭിക്കുമ്പോൾ Docker ഡീമൺ എഴുതുന്നത്).
- `/proc/1/cgroup`-ൽ `docker` എന്ന സ്ട്രിംഗ് പ്രത്യക്ഷപ്പെടുന്നത് (Linux cgroup v1).

ഏതെങ്കിലും ഹ്യൂറിസ്റ്റിക് ട്രിഗർ ചെയ്യുമ്പോൾ, ഇംപോർട്ട് റൂട്ട്
`zedDockerEnvironment: true` സഹിതം HTTP 422-ഉം Manual Token Import ടാബിലേക്ക് നിങ്ങളെ നയിക്കുന്ന ഒരു സന്ദേശവും നൽകുന്നു.

## Manual Token Import ടാബ് ഉപയോഗിക്കൽ

1. **Dashboard → Providers → Zed** തുറക്കുക.
2. കീചെയിൻ ഇംപോർട്ട് കാർഡിന് താഴെ **Manual Token Import** പാനൽ പ്രത്യക്ഷപ്പെടും.
   OmniRoute Docker കണ്ടെത്തുമ്പോൾ, ആദ്യത്തെ പരാജയപ്പെട്ട കീചെയിൻ ഇംപോർട്ട് ശ്രമത്തിന് ശേഷം ഈ പാനൽ സ്വയമേവ വികസിക്കും.
3. ഡ്രോപ്പ്ഡൗണിൽ നിന്ന് പ്രൊവൈഡറെ തിരഞ്ഞെടുക്കുക (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter, അല്ലെങ്കിൽ DeepSeek).
4. പാസ്വേഡ് ഫീൽഡിൽ API കീ പേസ്റ്റ് ചെയ്യുക.
5. **Import** ക്ലിക്ക് ചെയ്യുക.

`Zed Manual Import (<provider>)` എന്ന പേരിൽ കീ ഒരു പുതിയ പ്രൊവൈഡർ കണക്ഷനായി
സേവ് ചെയ്യപ്പെടുന്നു.

## ഹോസ്റ്റിൽ Zed API കീകൾ സംഭരിക്കുന്ന സ്ഥലം

`zed-openai`, `ai.zed.openai`, `zed-anthropic` തുടങ്ങിയ സേവന നാമങ്ങൾക്ക് കീഴിൽ
Zed AI പ്രൊവൈഡർ കീകൾ OS കീചെയിനിൽ സംഭരിക്കുന്നു. മാനുവൽ ഇംപോർട്ടിനായി അവ വീണ്ടെടുക്കാൻ,
ഇവിടെ നോക്കുക:

**Linux**

```
~/.config/zed/settings.json
```

`language_models` വിഭാഗത്തിൽ പ്രൊവൈഡർ കോൺഫിഗറേഷനുകൾ അടങ്ങിയിരിക്കുന്നു. Zed UI വഴി
കീചെയിനിൽ സേവ് ചെയ്ത കീകൾ `settings.json`-ൽ പ്ലെയിൻ ടെക്സ്റ്റായി ഉണ്ടാകില്ല; GNOME Keyring / Seahorse
പോലുള്ള ഒരു കീചെയിൻ വ്യൂവർ വഴിയോ, ഇനിപ്പറയുന്നത് പ്രവർത്തിപ്പിച്ചോ അവ വീണ്ടെടുക്കുക:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

`zed` എന്ന് തിരയുന്നതിലൂടെ **Keychain Access.app**-ൽ കീചെയിൻ എൻട്രികൾ കണ്ടെത്താം.

## വോളിയം-മൗണ്ട് ഓപ്ഷൻ (അഡ്വാൻസ്ഡ്)

നിങ്ങൾക്ക് Zed കോൺഫിഗറേഷൻ ഡയറക്ടറി റീഡ്-ഒൺലി ആയി കണ്ടെയ്നറിലേക്ക് മൗണ്ട് ചെയ്യാം.
ഇത് കീചെയിൻ പ്രശ്നം പരിഹരിക്കില്ല, എന്നാൽ രഹസ്യമല്ലാത്ത Zed കോൺഫിഗറേഷൻ മൂല്യങ്ങൾ
(ഉദാ., മോഡൽ മുൻഗണനകൾ) വായിക്കുന്ന ഭാവി ഫീച്ചറുകൾക്ക് ഇത് പ്രയോജനപ്പെട്ടേക്കാം.

```yaml
# docker-compose.yml ഭാഗം
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux ഹോസ്റ്റ്
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # പകരം macOS ഹോസ്റ്റ് ഉപയോഗിക്കാൻ കമന്റ് നീക്കുക
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # ഭാവിയിൽ: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

ശ്രദ്ധിക്കുക: `ZED_CONFIG_PATH` എൻവയോൺമെന്റ് വേരിയബിൾ ഓവർറൈഡ് ഇതുവരെ നടപ്പിലാക്കിയിട്ടില്ല. ഈ
ഫീച്ചർ ചേർക്കുമ്പോൾ ഉപയോഗിക്കാനുള്ള ഒരു റഫറൻസായാണ് ഈ ഭാഗം നൽകിയിരിക്കുന്നത്.

## Manual Import API

മാനുവൽ ഇംപോർട്ട് എൻഡ്പോയിന്റ് നേരിട്ടും വിളിക്കാം:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "My Zed OpenAI key"   // ഐച്ഛികം
}
```

വിജയിച്ചാൽ ഇത് ഇനിപ്പറയുന്നത് നൽകുന്നു:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## പ്രശ്നപരിഹാരം

| ലക്ഷണം                             | കാരണം                                 | പരിഹാരം                                                       |
| ---------------------------------- | ------------------------------------- | ------------------------------------------------------------- |
| 422 + `zedDockerEnvironment: true` | Docker-നുള്ളിൽ പ്രവർത്തിക്കുന്നു      | Manual Token Import ടാബ് ഉപയോഗിക്കുക                          |
| 404 + `zedInstalled: false`        | ഹോസ്റ്റിൽ Zed ഇൻസ്റ്റാൾ ചെയ്തിട്ടില്ല | Zed ഇൻസ്റ്റാൾ ചെയ്യുക അല്ലെങ്കിൽ മാനുവൽ ഇംപോർട്ട് ഉപയോഗിക്കുക |
| 403 + കീചെയിൻ ആക്സസ് നിരസിച്ചു     | OS കീചെയിൻ ആക്സസ് നിരസിച്ചു           | OS പ്രോംപ്റ്റിൽ അനുമതി നൽകുക                                  |
| 404 + കീചെയിൻ സേവനം ലഭ്യമല്ല       | Linux-ൽ `libsecret` ഇല്ല              | `libsecret-1-dev` ഇൻസ്റ്റാൾ ചെയ്യുക                           |
