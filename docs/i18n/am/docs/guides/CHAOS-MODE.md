# Chaos Mode (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **ዳሽቦርድ:** **Chaos Mode** (የጎን አሞሌ) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (የዳሽቦርድ ክፍለ-ጊዜ) · `POST /api/skills/collect/chaos` (የAPI ቁልፍ)  
> **ምንጭ:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode **አንድን ተግባር በአንድ ጊዜ ወደ በርካታ አቅራቢዎች ይልካል** — እያንዳንዱ ተሳታፊ አቅራቢ
አንድ የሞዴል ኢንስታንስ ያቀርባል፣ እርስዎም ሁሉንም መልሶች ጎን ለጎን (ወይም በሰንሰለት) ያገኛሉ። ይህ
ባለብዙ-ሞዴል የማስፈጸሚያ በይነገጽ እንጂ የማዘዋወሪያ ስልት አይደለም፦ መደበኛው `/v1/chat/completions`
ትራፊክዎ በእሱ ፈጽሞ አይነካም።

**ማብራሪያ — "chaos" የሚለውን ስም የያዙ ሦስት የተለያዩ ነገሮች አሉ፦**

| ነገር            | ምንድን ነው                                                                     | የተመዘገበበት ቦታ                                  |
| -------------- | --------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode** | እዚህ የተገለጹት የዳሽቦርድ ገጽ + API፦ አንድን ተግባር ለብዙ አቅራቢዎች ያሰራጫል (በትይዩ ወይም በትብብር)።    | ይህ መመሪያ                                      |
| `auto/chaos`   | ለጽናት ሙከራ፣ የስህተት-ማስገቢያ የውጤት ክብደቶች ያሉት የAuto-Combo ሞዴል id። የሚዋቀር ነገር የለም።     | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| የChaos ጥምር ውቅር | `config.chaos.enabled` ያለው የተቀመጠ ጥምር፣ ከአማራጭ ዳኛ ሞዴል ጋር ለፓነል ያሰራጫል (በAPI ብቻ)። | `open-sse/services/autoCombo/chaosEngine.ts` |

## ማዋቀር

1. **Dashboard → Chaos Mode** (`/dashboard/chaos`) ይክፈቱ።
2. **ያብሩት** — Chaos Mode በነባሪ **ተሰናክሎ** ይመጣል (`enabled: false` በ
   `src/lib/chaos/chaosConfig.ts`)። ተሰናክሎ ሳለ፣ `POST /api/chaos/run`
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."` የሚል ምላሽ ይሰጣል።
3. ተሳታፊዎቹን እና ነባሪ ቅንብሮቹን ይምረጡ (በቅንብሮች ማከማቻው በኩል ለእያንዳንዱ ኢንስታንስ ተቀምጠው ይቆያሉ)፦

   | መስክ                 | ትርጉም                                                        | ነባሪ / ገደቦች                    |
   | ------------------- | ----------------------------------------------------------- | ----------------------------- |
   | `enabled`           | ዋና ማብሪያ/ማጥፊያ                                                | `false`                       |
   | `defaultMode`       | `parallel` ወይም `collaborative` (ከታች ይመልከቱ)                  | `parallel`                    |
   | `providerOverrides` | የእያንዳንዱ አቅራቢ ተሳትፎ (`providerId`፣ አማራጭ `modelId`፣ `enabled`) | ባዶ = ሁሉም ንቁ አቅራቢዎች፣ ከፍተኛው 200 |
   | `systemPrompt`      | አብሮገነብ የChaos ስርዓት መመሪያን ለመተካት                              | አማራጭ፣ ከፍተኛው 10 000 ቁምፊዎች      |
   | `timeoutMs`         | ለእያንዳንዱ የሞዴል ጥሪ ከፍተኛው ጊዜ                                    | `120000` (5 000–600 000)      |
   | `maxTokens`         | ለእያንዳንዱ የሞዴል ጥሪ `max_tokens`                                | `4096` (256–128 000)          |

4. **ከገጹ ራሱ ሙከራ ያስኪዱ** — የውጤቶች ፓነሉ የእያንዳንዱን አቅራቢ መልስ፣
   ሁኔታ እና ቆይታ ያሳያል።

## የማስፈጸሚያ ሁነታዎች

- **`parallel`** — እያንዳንዱ ሞዴል ተመሳሳይ ተግባርን በአንድ ጊዜ ይቀበላል፤ ሁሉንም መልሶች
  ለየብቻ ይቀበላሉ።
- **`collaborative`** — ሞዴሎቹ **በሰንሰለት** ይሰራሉ፦ እያንዳንዱ ሞዴል የቀድሞውን ሞዴል ውጤት ያያል፣
  እና እንዲያሻሽለው፣ እንዲያስፋፋው፣ እንዲተቸው ወይም አማራጭ እንዲያቀርብ ይጠየቃል። የምላሹ `summary` መስክ
  የተሳኩ ውጤቶችን በሰንሰለቱ ቅደም ተከተል ያገናኛል (የትይዩ አፈጻጸሞች `summary` የላቸውም)።

## API

### `POST /api/chaos/run` — የዳሽቦርድ ክፍለ-ጊዜ

በኩኪ የተረጋገጠ (የአስተዳደር ክፍለ-ጊዜ —
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) ይመልከቱ)፤ በዳሽቦርድ ገጹ ጥቅም ላይ ይውላል።

```jsonc
// የጥያቄ ይዘት
{
  "task": "Compare approaches to X", // ያስፈልጋል
  "providers": ["glm", "kimi"], // አማራጭ ማጣሪያ
  "mode": "parallel", // አማራጭ — defaultModeን ይተካል
  "systemPrompt": "…", // አማራጭ መተኪያ
  "maxTokens": 4096, // አማራጭ መተኪያ
}
```

### `POST /api/skills/collect/chaos` — የAPI ቁልፍ

ለውጫዊ ጠሪዎች የBearer-token ልዩነት። ቁልፉ **የChaos Mode ፈቃድ**
(`chaosModeEnabled`) ሊኖረው ይገባል፤ ይህም **በነባሪ ጠፍቷል** — ለእያንዳንዱ ቁልፍ በ
**Dashboard → API Manager → edit key → permissions → Chaos Mode** ውስጥ ያንቁት። ከላይ ካለው ጋር ተመሳሳይ የጥያቄ ይዘት ይጠቀማል።

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

ሁለቱም መጨረሻ ነጥቦች ተመሳሳይ ቅርጽ ይመልሳሉ፦

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
  "summary": "…", // ለcollaborative ሁነታ ብቻ
}
```

## ችግር መፍታት

- **`400 Chaos Mode is not enabled`** — ከላይ ያለውን ደረጃ 2 ይመልከቱ፦ ዓለም አቀፉ ማብሪያ ጠፍቷል።
- **የAPI ቁልፉ በ`/api/skills/collect/chaos` ላይ ውድቅ ይደረጋል** — ቁልፉ የእያንዳንዱ ቁልፍ
  `chaosModeEnabled` ፈቃድ የለውም (በነባሪ ጠፍቷል፤ ይህ ቅንብር እንጂ ስህተት አይደለም)።
- **የጠበቁት አቅራቢ ከውጤቶቹ ውስጥ የለም** — በChaos Mode ገጽ ላይ `providerOverrides`ን
  ያረጋግጡ (የተሰናከለ መተኪያ አቅራቢውን ያስወግደዋል)፣ እንዲሁም የአቅራቢው ግንኙነት
  ንቁ መሆኑን ያረጋግጡ።
