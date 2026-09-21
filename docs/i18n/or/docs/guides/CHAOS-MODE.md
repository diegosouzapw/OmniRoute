# Chaos Mode (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **ଡ୍ୟାଶବୋର୍ଡ:** **Chaos Mode** (ସାଇଡ୍ବାର୍) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (ଡ୍ୟାଶବୋର୍ଡ ସେସନ୍) · `POST /api/skills/collect/chaos` (API କୀ)  
> **ଉତ୍ସ:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode **ଗୋଟିଏ କାର୍ଯ୍ୟକୁ ଏକାସାଙ୍ଗରେ ଅନେକ ପ୍ରଦାନକାରୀଙ୍କ ନିକଟକୁ ପଠାଏ** — ପ୍ରତ୍ୟେକ ଅଂଶଗ୍ରହଣକାରୀ ପ୍ରଦାନକାରୀ
ଗୋଟିଏ ମଡେଲ୍ ଇନ୍ଷ୍ଟାନ୍ସ ଯୋଗାଏ, ଏବଂ ଆପଣ ସମସ୍ତ ଉତ୍ତରକୁ ପାଖାପାଖି (କିମ୍ବା ଶୃଙ୍ଖଳିତ ଭାବରେ) ପାଆନ୍ତି। ଏହା ଏକ
ବହୁ-ମଡେଲ୍ ନିଷ୍ପାଦନ ପୃଷ୍ଠ, ରାଉଟିଂ କୌଶଳ ନୁହେଁ: ଆପଣଙ୍କ ସାଧାରଣ `/v1/chat/completions`
ଟ୍ରାଫିକ୍ ଏହାଦ୍ୱାରା କେବେ ମଧ୍ୟ ପ୍ରଭାବିତ ହୁଏ ନାହିଁ।

**ସ୍ପଷ୍ଟୀକରଣ — ନାମରେ "chaos" ଥିବା ତିନୋଟି ଭିନ୍ନ ଜିନିଷ ପ୍ରଦାନ କରାଯାଏ:**

| ଜିନିଷ               | ଏହା କ’ଣ                                                                                                                  | କେଉଁଠାରେ ଦଲିଲଭୁକ୍ତ                           |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| **Chaos Mode**      | ଏଠାରେ ବର୍ଣ୍ଣିତ ଡ୍ୟାଶବୋର୍ଡ ପୃଷ୍ଠା + API: ଗୋଟିଏ କାର୍ଯ୍ୟକୁ ଅନେକ ପ୍ରଦାନକାରୀଙ୍କ ନିକଟକୁ ବିସ୍ତାର କରେ (ସମାନ୍ତରାଳ କିମ୍ବା ସହଯୋଗୀ)। | ଏହି ମାର୍ଗଦର୍ଶିକା                             |
| `auto/chaos`        | ସ୍ଥିତିସ୍ଥାପକତା ପରୀକ୍ଷଣ ପାଇଁ ତ୍ରୁଟି-ପ୍ରବେଶ ସ୍କୋରିଂ ଓଜନ ସହିତ ଏକ Auto-Combo ମଡେଲ୍ id। ବିନ୍ୟାସ କରିବାକୁ କିଛି ନାହିଁ।           | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos କମ୍ବୋ ବିନ୍ୟାସ | `config.chaos.enabled` ସହିତ ଏକ ସଂରକ୍ଷିତ କମ୍ବୋ, ଯାହା ଏକ ବୈକଳ୍ପିକ ବିଚାରକ ମଡେଲ୍ ସହିତ ପ୍ୟାନେଲ୍କୁ ବିସ୍ତାର କରେ (କେବଳ API)।     | `open-sse/services/autoCombo/chaosEngine.ts` |

## ସେଟ୍ଅପ୍

1. **ଡ୍ୟାଶବୋର୍ଡ → Chaos Mode** (`/dashboard/chaos`) ଖୋଲନ୍ତୁ।
2. ଏହାକୁ **ଚାଲୁ** କରନ୍ତୁ — Chaos Mode **ଡିଫଲ୍ଟ ଭାବରେ ଅକ୍ଷମ** ଅବସ୍ଥାରେ ଆସେ (`enabled: false`
   `src/lib/chaos/chaosConfig.ts`ରେ)। ଅକ୍ଷମ ଥିବା ସମୟରେ, `POST /api/chaos/run`
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."` ଉତ୍ତର ଦିଏ।
3. ଅଂଶଗ୍ରହଣକାରୀ ଓ ଡିଫଲ୍ଟଗୁଡ଼ିକ ବାଛନ୍ତୁ (ସେଟିଂସ୍ ଷ୍ଟୋର୍ ମାଧ୍ୟମରେ ପ୍ରତ୍ୟେକ ଇନ୍ଷ୍ଟାନ୍ସ ପାଇଁ ସଂରକ୍ଷିତ ହୁଏ):

   | ଫିଲ୍ଡ               | ଅର୍ଥ                                                                    | ଡିଫଲ୍ଟ / ସୀମା                                   |
   | ------------------- | ----------------------------------------------------------------------- | ----------------------------------------------- |
   | `enabled`           | ମୁଖ୍ୟ ସ୍ୱିଚ୍                                                            | `false`                                         |
   | `defaultMode`       | `parallel` କିମ୍ବା `collaborative` (ନିମ୍ନରେ ଦେଖନ୍ତୁ)                     | `parallel`                                      |
   | `providerOverrides` | ପ୍ରତି-ପ୍ରଦାନକାରୀ ଅଂଶଗ୍ରହଣ (`providerId`, ବୈକଳ୍ପିକ `modelId`, `enabled`) | ଖାଲି = ପ୍ରତ୍ୟେକ ସକ୍ରିୟ ପ୍ରଦାନକାରୀ, ସର୍ବାଧିକ 200 |
   | `systemPrompt`      | ଅନ୍ତର୍ନିର୍ମିତ Chaos ସିଷ୍ଟମ୍ ପ୍ରମ୍ପ୍ଟ ପାଇଁ ଓଭର୍ରାଇଡ୍                     | ବୈକଳ୍ପିକ, ସର୍ବାଧିକ 10 000 ଅକ୍ଷର                 |
   | `timeoutMs`         | ପ୍ରତି ମଡେଲ୍ କଲ୍ ପାଇଁ ସର୍ବାଧିକ ସମୟ                                       | `120000` (5 000–600 000)                        |
   | `maxTokens`         | ପ୍ରତି ମଡେଲ୍ କଲ୍ ପାଇଁ `max_tokens`                                       | `4096` (256–128 000)                            |

4. **ପୃଷ୍ଠାରୁ ହିଁ ଏକ ପରୀକ୍ଷା ଚଲାନ୍ତୁ** — ଫଳାଫଳ ପ୍ୟାନେଲ୍ ପ୍ରତ୍ୟେକ ପ୍ରଦାନକାରୀଙ୍କ ଉତ୍ତର,
   ସ୍ଥିତି ଏବଂ ଅବଧି ଦେଖାଏ।

## ନିଷ୍ପାଦନ ମୋଡ୍ଗୁଡ଼ିକ

- **`parallel`** — ପ୍ରତ୍ୟେକ ମଡେଲ୍ ଏକାସାଙ୍ଗରେ ସମାନ କାର୍ଯ୍ୟ ପାଏ; ଆପଣ ସମସ୍ତ ଉତ୍ତର
  ସ୍ୱାଧୀନ ଭାବରେ ପାଆନ୍ତି।
- **`collaborative`** — ମଡେଲ୍ଗୁଡ଼ିକ **ଏକ ଶୃଙ୍ଖଳରେ** ଚାଲେ: ପ୍ରତ୍ୟେକଟି ପୂର୍ବ ମଡେଲ୍ର ଆଉଟ୍ପୁଟ୍ ଦେଖେ ଏବଂ
  ତାହାକୁ ପରିଷ୍କୃତ, ବିସ୍ତାରିତ, ସମାଲୋଚନା କରିବା କିମ୍ବା ଏକ ବିକଳ୍ପ ପ୍ରଦାନ କରିବାକୁ କୁହାଯାଏ। ପ୍ରତିକ୍ରିୟାର `summary` ଫିଲ୍ଡ
  ସଫଳ ଆଉଟ୍ପୁଟ୍ଗୁଡ଼ିକୁ ଶୃଙ୍ଖଳ କ୍ରମରେ ସଂଯୋଜିତ କରେ (`parallel` ରନ୍ଗୁଡ଼ିକରେ `summary` ନଥାଏ)।

## API

### `POST /api/chaos/run` — ଡ୍ୟାଶବୋର୍ଡ ସେସନ୍

କୁକି-ପ୍ରମାଣୀକୃତ (ପରିଚାଳନା ସେସନ୍ —
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) ଦେଖନ୍ତୁ); ଡ୍ୟାଶବୋର୍ଡ ପୃଷ୍ଠା ଦ୍ୱାରା ବ୍ୟବହୃତ।

```jsonc
// ବଡି
{
  "task": "Compare approaches to X", // ଆବଶ୍ୟକ
  "providers": ["glm", "kimi"], // ବୈକଳ୍ପିକ ଫିଲ୍ଟର୍
  "mode": "parallel", // ବୈକଳ୍ପିକ — defaultModeକୁ ଓଭର୍ରାଇଡ୍ କରେ
  "systemPrompt": "…", // ବୈକଳ୍ପିକ ଓଭର୍ରାଇଡ୍
  "maxTokens": 4096, // ବୈକଳ୍ପିକ ଓଭର୍ରାଇଡ୍
}
```

### `POST /api/skills/collect/chaos` — API କୀ

ବାହ୍ୟ କଲର୍ମାନଙ୍କ ପାଇଁ Bearer-token ପ୍ରକାର। କୀରେ **Chaos Mode ଅନୁମତି**
(`chaosModeEnabled`) ରହିବା ଆବଶ୍ୟକ, ଯାହା **ଡିଫଲ୍ଟ ଭାବରେ ବନ୍ଦ** ଥାଏ — ପ୍ରତ୍ୟେକ କୀ ପାଇଁ
**ଡ୍ୟାଶବୋର୍ଡ → API Manager → କୀ ସମ୍ପାଦନ କରନ୍ତୁ → ଅନୁମତିଗୁଡ଼ିକ → Chaos Mode**ରେ ଏହାକୁ ସକ୍ଷମ କରନ୍ତୁ। ଉପରୋକ୍ତ ବଡି ହିଁ ବ୍ୟବହାର କରନ୍ତୁ।

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

ଉଭୟ ଏଣ୍ଡପଏଣ୍ଟ ସମାନ ଗଠନର ଉତ୍ତର ଫେରାନ୍ତି:

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
  "summary": "…", // କେବଳ collaborative ମୋଡ୍
}
```

## ସମସ୍ୟା ସମାଧାନ

- **`400 Chaos Mode is not enabled`** — ଉପରୋକ୍ତ ପଦକ୍ଷେପ 2: ଗ୍ଲୋବାଲ୍ ସ୍ୱିଚ୍ ବନ୍ଦ ଅଛି।
- **`/api/skills/collect/chaos`ରେ API କୀ ପ୍ରତ୍ୟାଖ୍ୟାନ ହେଉଛି** — କୀରେ ପ୍ରତି-କୀ
  `chaosModeEnabled` ଅନୁମତି ନାହିଁ (ଡିଫଲ୍ଟ ଭାବରେ ବନ୍ଦ; ଏହା ଏକ ସେଟିଂ, ତ୍ରୁଟି ନୁହେଁ)।
- **ଆପଣ ଆଶା କରିଥିବା କୌଣସି ପ୍ରଦାନକାରୀ ଫଳାଫଳରେ ନାହାନ୍ତି** — Chaos Mode ପୃଷ୍ଠାରେ `providerOverrides`
  ଯାଞ୍ଚ କରନ୍ତୁ (ଏକ ଅକ୍ଷମ ଓଭର୍ରାଇଡ୍ ତାହାକୁ ବାଦ ଦିଏ) ଏବଂ ପ୍ରଦାନକାରୀ ସଂଯୋଗ
  ସକ୍ରିୟ ଅଛି କି ନାହିଁ ଦେଖନ୍ତୁ।
