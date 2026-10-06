# Zed IDE Integration in Docker Environments (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

OmniRoute ကို Docker အတွင်း လုပ်ဆောင်သည့်အခါ ပုံမှန် "Import from Zed Keychain" လုပ်ငန်းစဉ်သည် မအောင်မြင်ပါ။
အကြောင်းမှာ container သည် host OS ၏ keychain daemon (Linux တွင် libsecret၊
macOS တွင် Keychain၊ Windows တွင် Credential Manager) ကို ဆက်သွယ်၍မရသည့်အပြင်
host filesystem ပေါ်ရှိ Zed config directory များကိုလည်း ပုံမှန်အားဖြင့် container အတွင်းမှ မမြင်နိုင်သောကြောင့်ဖြစ်သည်။

## Docker တွင် Keychain Import မအောင်မြင်ရသည့်အကြောင်းရင်း

Container တစ်ခုအတွင်း ပိတ်ဆို့မှုပြဿနာနှစ်ခု ဖြစ်ပေါ်သည်-

1. **Filesystem ခွဲခြားထားမှု** — `isZedInstalled()` သည် `~/.config/zed` (Linux)၊
   `~/Library/Application Support/Zed` (macOS) သို့မဟုတ် Windows အတွက် တူညီသော path ကို ရှာဖွေသည်။ ဤ path များသည်
   host ပေါ်တွင်ရှိပြီး သီးခြား volume-mount မလုပ်ထားပါက အသုံးပြု၍မရပါ။
2. **IPC ခွဲခြားထားမှု** — Config directory ကို mount လုပ်ထားသည့်တိုင် `keytar` native
   module သည် Unix socket သို့မဟုတ် D-Bus session မှတစ်ဆင့် OS keychain service နှင့် ဆက်သွယ်သည်။
   ပုံမှန်အားဖြင့် မည်သည့်အရာကိုမျှ container အတွင်းသို့ ချိတ်ဆက်ပေးမထားသောကြောင့် credential ဖတ်ယူမှုသည် အမြဲတမ်း မအောင်မြင်ပါ။

OmniRoute သည် Docker environment ကို heuristic နှစ်မျိုးဖြင့် ရှာဖွေသတ်မှတ်သည်-

- `/.dockerenv` ရှိနေခြင်း (container စတင်ချိန်တွင် Docker daemon က ရေးသားပေးသည်)။
- `/proc/1/cgroup` ထဲတွင် `docker` စာသား ပါဝင်နေခြင်း (Linux cgroup v1)။

မည်သည့် heuristic မဆို အလုပ်လုပ်သွားပါက import route သည် HTTP 422 ကို
`zedDockerEnvironment: true` နှင့်အတူ ပြန်ပေးပြီး Manual Token Import tab ကို အသုံးပြုရန် ညွှန်ကြားသည့် message တစ်ခုကိုလည်း ပြသသည်။

## Manual Token Import Tab ကို အသုံးပြုခြင်း

1. **Dashboard → Providers → Zed** ကို ဖွင့်ပါ။
2. **Manual Token Import** panel သည် keychain import card အောက်တွင် ပေါ်လာသည်။ OmniRoute က
   Docker ကို ရှာဖွေတွေ့ရှိသည့်အခါ ပထမဆုံး keychain import ကြိုးပမ်းမှု မအောင်မြင်ပြီးနောက် ဤ panel သည်
   အလိုအလျောက် ဖြန့်ဖွင့်လာသည်။
3. Dropdown မှ provider ကို ရွေးချယ်ပါ (OpenAI၊ Anthropic၊ Google၊ Mistral၊ xAI၊
   OpenRouter သို့မဟုတ် DeepSeek)။
4. Password field ထဲသို့ API key ကို ကူးထည့်ပါ။
5. **Import** ကို နှိပ်ပါ။

Key ကို `Zed Manual Import (<provider>)` အမည်ဖြင့်
provider connection အသစ်တစ်ခုအဖြစ် သိမ်းဆည်းသည်။

## Host ပေါ်တွင် Zed က API Key များ သိမ်းဆည်းသည့်နေရာ

Zed သည် AI provider key များကို `zed-openai`၊ `ai.zed.openai`၊
`zed-anthropic` စသည့် service name များအောက်ရှိ OS keychain ထဲတွင် သိမ်းဆည်းသည်။ Manual
import အတွက် ၎င်းတို့ကို ရယူရန် အောက်ပါနေရာများတွင် ရှာဖွေပါ-

**Linux**

```
~/.config/zed/settings.json
```

`language_models` section တွင် provider configuration များ ပါဝင်သည်။ Zed UI မှတစ်ဆင့်
keychain ထဲသို့ သိမ်းဆည်းထားသော key များသည် `settings.json` ထဲတွင် plain text အနေဖြင့် မရှိပါ။ ၎င်းတို့ကို
GNOME Keyring / Seahorse ကဲ့သို့သော keychain viewer မှတစ်ဆင့်ဖြစ်စေ၊ အောက်ပါ command ကို လုပ်ဆောင်ခြင်းဖြင့်ဖြစ်စေ ရယူပါ-

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Keychain entry များကို **Keychain Access.app** တွင် `zed` ဟု ရှာဖွေခြင်းဖြင့် တွေ့နိုင်သည်။

## Volume-Mount ရွေးချယ်မှု (အဆင့်မြင့်)

Zed config directory ကို read-only အဖြစ် container ထဲသို့ mount လုပ်နိုင်သည်။
၎င်းသည် keychain ပြဿနာကို မဖြေရှင်းပေးနိုင်သော်လည်း လျှို့ဝှက်ချက်မဟုတ်သော Zed config တန်ဖိုးများ
(ဥပမာ model preference များ) ကို ဖတ်ရှုမည့် အနာဂတ် feature များအတွက် အသုံးဝင်နိုင်သည်။

```yaml
# docker-compose.yml အပိုင်းအစ
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux host
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # macOS host (ဤအစား comment ဖြုတ်ပါ)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # အနာဂတ်တွင်: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

မှတ်ချက်- `ZED_CONFIG_PATH` environment variable override ကို ယခုအချိန်အထိ အကောင်အထည်ဖော်ထားခြင်း မရှိသေးပါ။ ဤ
အပိုင်းအစကို အဆိုပါ feature ထည့်သွင်းသည့်အခါ အသုံးပြုနိုင်ရန် ရည်ညွှန်းချက်အဖြစ် ပေးထားခြင်းဖြစ်သည်။

## Manual Import API

Manual import endpoint ကို တိုက်ရိုက်လည်း ခေါ်နိုင်သည်-

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "My Zed OpenAI key"   // မထည့်လည်းရသည်
}
```

အောင်မြင်ပါက အောက်ပါတို့ကို ပြန်ပေးသည်-

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## ပြဿနာဖြေရှင်းခြင်း

| လက္ခဏာ                                      | အကြောင်းရင်း                                  | ဖြေရှင်းနည်း                                               |
| ------------------------------------------- | --------------------------------------------- | ---------------------------------------------------------- |
| 422 + `zedDockerEnvironment: true`          | Docker အတွင်း လုပ်ဆောင်နေသည်                  | Manual Token Import tab ကို အသုံးပြုပါ                     |
| 404 + `zedInstalled: false`                 | Host ပေါ်တွင် Zed ထည့်သွင်းမထားပါ             | Zed ကို ထည့်သွင်းပါ သို့မဟုတ် manual import ကို အသုံးပြုပါ |
| 403 + keychain အသုံးပြုခွင့် ငြင်းပယ်ခံရသည် | OS က keychain အသုံးပြုခွင့်ကို ငြင်းပယ်ထားသည် | OS prompt တွင် ခွင့်ပြုချက်ပေးပါ                           |
| 404 + keychain service မရရှိနိုင်ပါ         | Linux တွင် `libsecret` မရှိပါ                 | `libsecret-1-dev` ကို ထည့်သွင်းပါ                          |
