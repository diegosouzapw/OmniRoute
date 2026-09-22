# Chaos Mode (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **டாஷ்போர்டு:** **Chaos Mode** (பக்கப்பட்டி) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (டாஷ்போர்டு அமர்வு) · `POST /api/skills/collect/chaos` (API விசை)  
> **மூலம்:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode **ஒரே பணியைப் பல வழங்குநர்களுக்கு ஒரே நேரத்தில் அனுப்புகிறது** — பங்கேற்கும் ஒவ்வொரு வழங்குநரும்
ஒரு மாதிரி நிகழ்வைப் பங்களிக்கும்; எல்லாப் பதில்களையும் அருகருகே (அல்லது சங்கிலியாக) பெறுவீர்கள். இது ஒரு
பல-மாதிரி இயக்கத் தளம்; வழிசெலுத்தல் உத்தி அல்ல: உங்களின் வழக்கமான `/v1/chat/completions`
போக்குவரத்து இதனால் ஒருபோதும் பாதிக்கப்படாது.

**தெளிவுபடுத்தல் — "chaos" என்ற பெயரில் மூன்று வெவ்வேறு அம்சங்கள் வழங்கப்படுகின்றன:**

| அம்சம்               | அது என்ன                                                                                                                              | ஆவணப்படுத்தப்பட்டுள்ள இடம்                   |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**       | இங்கே விவரிக்கப்பட்டுள்ள டாஷ்போர்டு பக்கம் + API: ஒரு பணியைப் பல வழங்குநர்களுக்கு விரிவாக்குதல் (இணையாக அல்லது கூட்டாக).              | இந்த வழிகாட்டி                               |
| `auto/chaos`         | மீள்திறன் சோதனைக்கான பிழை-புகுத்தல் மதிப்பீட்டு எடைகளைக் கொண்ட Auto-Combo மாதிரி id. உள்ளமைக்க எதுவுமில்லை.                           | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos combo உள்ளமைவு | `config.chaos.enabled` கொண்ட நிலைபேறாக்கப்பட்ட combo, விருப்பத் தீர்ப்பாளர் மாதிரியுடன் ஒரு குழுவுக்கு விரிவாக்குகிறது (API மட்டும்). | `open-sse/services/autoCombo/chaosEngine.ts` |

## அமைத்தல்

1. **Dashboard → Chaos Mode** (`/dashboard/chaos`) என்பதைத் திறக்கவும்.
2. அதை **இயக்கவும்** — Chaos Mode இயல்பாகவே **முடக்கப்பட்ட நிலையில்** வழங்கப்படுகிறது
   (`src/lib/chaos/chaosConfig.ts`-இல் `enabled: false`). இது முடக்கப்பட்டிருக்கும்போது, `POST /api/chaos/run`
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."` எனப் பதிலளிக்கும்.
3. பங்கேற்பாளர்களையும் இயல்புநிலைகளையும் தேர்ந்தெடுக்கவும் (அமைப்புகள் சேமிப்பகத்தின் வழியாக ஒவ்வொரு நிகழ்விற்கும் நிலைபேறாக்கப்படும்):

   | புலம்               | பொருள்                                                                      | இயல்புநிலை / வரம்புகள்                                  |
   | ------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------- |
   | `enabled`           | முதன்மை நிலைமாற்றி                                                          | `false`                                                 |
   | `defaultMode`       | `parallel` அல்லது `collaborative` (கீழே காண்க)                              | `parallel`                                              |
   | `providerOverrides` | வழங்குநர் வாரியான பங்கேற்பு (`providerId`, விருப்பமான `modelId`, `enabled`) | காலி = செயலில் உள்ள ஒவ்வொரு வழங்குநரும், அதிகபட்சம் 200 |
   | `systemPrompt`      | உள்ளமைக்கப்பட்ட Chaos அமைப்பு prompt-க்கான மேலெழுதல்                        | விருப்பமானது, அதிகபட்சம் 10 000 எழுத்துகள்              |
   | `timeoutMs`         | ஒவ்வொரு மாதிரி அழைப்பிற்குமான அதிகபட்ச நேரம்                                | `120000` (5 000–600 000)                                |
   | `maxTokens`         | ஒவ்வொரு மாதிரி அழைப்பிற்குமான `max_tokens`                                  | `4096` (256–128 000)                                    |

4. **பக்கத்திலிருந்தே ஒரு சோதனையை இயக்கவும்** — முடிவுகள் குழு ஒவ்வொரு வழங்குநரின் பதில்,
   நிலை மற்றும் கால அளவைக் காட்டுகிறது.

## இயக்க முறைகள்

- **`parallel`** — ஒவ்வொரு மாதிரியும் ஒரே பணியை ஒரே நேரத்தில் பெறும்; அனைத்துப் பதில்களையும்
  தனித்தனியாகப் பெறுவீர்கள்.
- **`collaborative`** — மாதிரிகள் **ஒரு சங்கிலியாக** இயங்கும்: ஒவ்வொன்றும் முந்தைய மாதிரியின் வெளியீட்டைப் பார்த்து,
  அதைச் செம்மைப்படுத்த, விரிவாக்க, விமர்சிக்க அல்லது மாற்று வழியை வழங்கக் கோரப்படும். பதிலின் `summary` புலம்
  வெற்றிகரமான வெளியீடுகளைச் சங்கிலி வரிசையில் ஒன்றிணைக்கும் (`parallel` இயக்கங்களில் `summary` இருக்காது).

## API

### `POST /api/chaos/run` — டாஷ்போர்டு அமர்வு

Cookie மூலம் அங்கீகரிக்கப்பட்டது (நிர்வாக அமர்வு —
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) பார்க்கவும்); டாஷ்போர்டு பக்கத்தால் பயன்படுத்தப்படுகிறது.

```jsonc
// கோரிக்கை உள்ளடக்கம்
{
  "task": "Compare approaches to X", // கட்டாயமானது
  "providers": ["glm", "kimi"], // விருப்பமான வடிகட்டி
  "mode": "parallel", // விருப்பமானது — defaultMode-ஐ மேலெழுதும்
  "systemPrompt": "…", // விருப்பமான மேலெழுதல்
  "maxTokens": 4096, // விருப்பமான மேலெழுதல்
}
```

### `POST /api/skills/collect/chaos` — API விசை

வெளிப்புற அழைப்பாளர்களுக்கான Bearer-token மாறுபாடு. விசையில் **Chaos Mode அனுமதி**
(`chaosModeEnabled`) இருக்க வேண்டும்; இது **இயல்பாக முடக்கப்பட்டிருக்கும்** — ஒவ்வொரு விசைக்கும் இதை
**Dashboard → API Manager → விசையைத் திருத்து → அனுமதிகள் → Chaos Mode** என்பதில் இயக்கவும். மேலே உள்ள அதே கோரிக்கை உள்ளடக்கத்தைப் பயன்படுத்தவும்.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

இரண்டு endpoint-களும் ஒரே கட்டமைப்பில் பதிலை வழங்குகின்றன:

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // collaborative முறையில் மட்டும்
}
```

## சிக்கல் தீர்த்தல்

- **`400 Chaos Mode is not enabled`** — மேலே உள்ள படி 2-ஐப் பார்க்கவும்: உலகளாவிய நிலைமாற்றி முடக்கப்பட்டுள்ளது.
- **`/api/skills/collect/chaos`-இல் API விசை நிராகரிக்கப்படுகிறது** — அந்த விசையில் விசை-வாரியான
  `chaosModeEnabled` அனுமதி இல்லை (இயல்பாக முடக்கப்பட்டிருக்கும்; இது ஓர் அமைப்பு, பிழை அல்ல).
- **நீங்கள் எதிர்பார்த்த வழங்குநர் முடிவுகளில் இல்லை** — Chaos Mode பக்கத்திலுள்ள `providerOverrides`-ஐச்
  சரிபார்க்கவும் (முடக்கப்பட்ட மேலெழுதல் அதை விலக்கும்); மேலும் வழங்குநர் இணைப்பு செயலில் உள்ளதா என்பதையும்
  சரிபார்க்கவும்.
