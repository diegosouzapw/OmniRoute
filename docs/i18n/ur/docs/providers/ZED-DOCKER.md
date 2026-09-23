# Zed IDE Integration in Docker Environments (اردو)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

جب OmniRoute، Docker کے اندر چلتا ہے تو معیاری "Zed Keychain سے درآمد کریں" کا طریقہ ناکام ہو جاتا ہے
کیونکہ کنٹینر میزبان OS کے keychain daemon (Linux پر libsecret،
macOS پر Keychain، Windows پر Credential Manager) تک رسائی حاصل نہیں کر سکتا، اور میزبان
فائل سسٹم پر موجود Zed کی config ڈائریکٹریاں بطور ڈیفالٹ کنٹینر کے اندر نظر نہیں آتیں۔

## Docker میں Keychain درآمد کیوں ناکام ہوتی ہے

کنٹینر کے اندر دو رکاوٹی مسائل پیش آتے ہیں:

1. **فائل سسٹم کی علیحدگی** — `isZedInstalled()`، `~/.config/zed` (Linux)،
   `~/Library/Application Support/Zed` (macOS)، یا Windows میں اس کے مساوی مقام کو تلاش کرتا ہے۔ یہ راستے
   میزبان پر موجود ہوتے ہیں اور واضح طور پر volume-mounted کیے بغیر دستیاب نہیں ہوتے۔
2. **IPC کی علیحدگی** — یہاں تک کہ جب config ڈائریکٹری mount کی گئی ہو، تب بھی `keytar` کا مقامی
   module، Unix socket یا D-Bus session کے ذریعے OS keychain سروس سے رابطہ کرتا ہے۔
   بطور ڈیفالٹ ان میں سے کسی کو بھی کنٹینر کے اندر bridge نہیں کیا جاتا، لہٰذا credentials کو پڑھنا ہمیشہ ناکام ہو جاتا ہے۔

OmniRoute دو طریقوں سے Docker ماحول کا پتہ لگاتا ہے:

- `/.dockerenv` کی موجودگی (جسے Docker daemon کنٹینر شروع ہوتے وقت لکھتا ہے)۔
- `/proc/1/cgroup` میں `docker` عبارت کی موجودگی (Linux cgroup v1)۔

جب ان میں سے کوئی بھی طریقہ متحرک ہو، تو import route، HTTP 422 کے ساتھ
`zedDockerEnvironment: true` اور Manual Token Import ٹیب استعمال کرنے کی ہدایت دینے والا پیغام واپس کرتا ہے۔

## Manual Token Import ٹیب کا استعمال

1. **Dashboard → Providers → Zed** کھولیں۔
2. **Manual Token Import** پینل، keychain import کارڈ کے نیچے ظاہر ہوتا ہے۔ جب
   OmniRoute، Docker کا پتہ لگاتا ہے تو keychain import کی پہلی ناکام
   کوشش کے بعد یہ پینل خودکار طور پر پھیل جاتا ہے۔
3. dropdown سے provider منتخب کریں (OpenAI، Anthropic، Google، Mistral، xAI،
   OpenRouter، یا DeepSeek)۔
4. password فیلڈ میں API key چسپاں کریں۔
5. **Import** پر کلک کریں۔

key کو ایک نئے provider connection کے طور پر
`Zed Manual Import (<provider>)` نام سے محفوظ کیا جاتا ہے۔

## Zed میزبان پر API Keys کہاں محفوظ کرتا ہے

Zed، AI provider keys کو OS keychain میں `zed-openai`،
`ai.zed.openai`، `zed-anthropic` وغیرہ جیسے service names کے تحت محفوظ کرتا ہے۔ دستی
درآمد کے لیے انہیں حاصل کرنے کی خاطر، یہاں دیکھیں:

**Linux**

```
~/.config/zed/settings.json
```

`language_models` سیکشن میں provider configurations موجود ہوتی ہیں۔ Zed UI کے ذریعے
keychain میں محفوظ کردہ keys، `settings.json` میں plain text کی صورت میں موجود نہیں ہوتیں؛ انہیں
GNOME Keyring / Seahorse جیسے keychain viewer کے ذریعے، یا یہ چلا کر حاصل کریں:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

`zed` تلاش کر کے keychain entries کو **Keychain Access.app** میں پایا جا سکتا ہے۔

## Volume-Mount کا اختیار (اعلیٰ درجے کے صارفین کے لیے)

آپ اختیاری طور پر Zed config ڈائریکٹری کو read-only حالت میں کنٹینر کے اندر mount کر سکتے ہیں۔
اس سے keychain کا مسئلہ حل نہیں ہوتا، لیکن یہ مستقبل کی ان خصوصیات کے لیے مفید ہو سکتا ہے جو
Zed کی غیر خفیہ config values پڑھتی ہیں (مثلاً model preferences)۔

```yaml
# docker-compose.yml کا اقتباس
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux میزبان
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # اس کے بجائے macOS میزبان کے لیے comment ہٹائیں
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # مستقبل میں: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

نوٹ: `ZED_CONFIG_PATH` environment variable کا override ابھی نافذ نہیں کیا گیا۔ یہ
اقتباس اس خصوصیت کے شامل ہونے کے بعد بطور حوالہ فراہم کیا گیا ہے۔

## Manual Import API

manual import endpoint کو براہِ راست بھی call کیا جا سکتا ہے:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "My Zed OpenAI key"   // اختیاری
}
```

کامیابی کی صورت میں یہ واپس کرتا ہے:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## مسائل کا حل

| علامت                                | وجہ                             | حل                                         |
| ------------------------------------ | ------------------------------- | ------------------------------------------ |
| 422 + `zedDockerEnvironment: true`   | Docker کے اندر چل رہا ہے        | Manual Token Import ٹیب استعمال کریں       |
| 404 + `zedInstalled: false`          | Zed میزبان پر نصب نہیں ہے       | Zed نصب کریں یا manual import استعمال کریں |
| 403 + keychain access denied         | OS نے keychain رسائی روک دی     | OS prompt میں اجازت دیں                    |
| 404 + keychain service not available | Linux پر `libsecret` موجود نہیں | `libsecret-1-dev` نصب کریں                 |
