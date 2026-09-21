# Chaos Mode (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **డ్యాష్బోర్డ్:** **Chaos Mode** (సైడ్బార్) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (డ్యాష్బోర్డ్ సెషన్) · `POST /api/skills/collect/chaos` (API కీ)  
> **సోర్స్:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode **ఒకే టాస్క్ను ఒకేసారి అనేక ప్రొవైడర్లకు పంపుతుంది** — పాల్గొనే ప్రతి ప్రొవైడర్
ఒక మోడల్ ఇన్స్టాన్స్ను అందిస్తుంది, తద్వారా మీకు అన్ని సమాధానాలు పక్కపక్కనే (లేదా గొలుసుగా) లభిస్తాయి. ఇది
బహుళ-మోడల్ ఎగ్జిక్యూషన్ ఉపరితలం, రౌటింగ్ వ్యూహం కాదు: మీ సాధారణ `/v1/chat/completions`
ట్రాఫిక్పై ఇది ఎలాంటి ప్రభావం చూపదు.

**స్పష్టీకరణ — పేరులో "chaos" ఉన్న మూడు వేర్వేరు అంశాలు అందించబడతాయి:**

| అంశం                 | అది ఏమిటి                                                                                                                          | డాక్యుమెంటేషన్ ఉన్న ప్రదేశం                  |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**       | ఇక్కడ వివరించిన డ్యాష్బోర్డ్ పేజీ + API: ఒక టాస్క్ను అనేక ప్రొవైడర్లకు విస్తరించడం (సమాంతరంగా లేదా సహకార పద్ధతిలో).                | ఈ గైడ్                                       |
| `auto/chaos`         | స్థితిస్థాపకత పరీక్ష కోసం fault-injection స్కోరింగ్ వెయిట్లతో కూడిన Auto-Combo మోడల్ id. కాన్ఫిగర్ చేయాల్సిందేమీ లేదు.             | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos combo కాన్ఫిగ్ | `config.chaos.enabled` కలిగిన, నిల్వ చేయబడిన combo; ఇది ఐచ్ఛిక judge మోడల్తో కూడిన ప్యానెల్కు విస్తరిస్తుంది (API ద్వారా మాత్రమే). | `open-sse/services/autoCombo/chaosEngine.ts` |

## సెటప్

1. **డ్యాష్బోర్డ్ → Chaos Mode** (`/dashboard/chaos`) తెరవండి.
2. దాన్ని **ఆన్** చేయండి — Chaos Mode **డిఫాల్ట్గా డిసేబుల్ చేయబడి** అందించబడుతుంది
   (`src/lib/chaos/chaosConfig.ts`లో `enabled: false`). ఇది డిసేబుల్లో ఉన్నప్పుడు, `POST /api/chaos/run`
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`తో ప్రతిస్పందిస్తుంది.
3. పాల్గొనే ప్రొవైడర్లను మరియు డిఫాల్ట్లను ఎంచుకోండి (సెట్టింగ్ల స్టోర్ ద్వారా ప్రతి ఇన్స్టాన్స్కు నిల్వ చేయబడతాయి):

   | ఫీల్డ్              | అర్థం                                                                   | డిఫాల్ట్ / పరిమితులు                         |
   | ------------------- | ----------------------------------------------------------------------- | -------------------------------------------- |
   | `enabled`           | ప్రధాన స్విచ్                                                           | `false`                                      |
   | `defaultMode`       | `parallel` లేదా `collaborative` (క్రింద చూడండి)                         | `parallel`                                   |
   | `providerOverrides` | ప్రతి ప్రొవైడర్కు పాల్గొనడం (`providerId`, ఐచ్ఛిక `modelId`, `enabled`) | ఖాళీ = ప్రతి యాక్టివ్ ప్రొవైడర్, గరిష్ఠం 200 |
   | `systemPrompt`      | అంతర్నిర్మిత Chaos సిస్టమ్ ప్రాంప్ట్కు ఓవర్రైడ్                         | ఐచ్ఛికం, గరిష్ఠం 10 000 అక్షరాలు             |
   | `timeoutMs`         | ప్రతి మోడల్ కాల్కు గరిష్ఠ సమయం                                          | `120000` (5 000–600 000)                     |
   | `maxTokens`         | ప్రతి మోడల్ కాల్కు `max_tokens`                                         | `4096` (256–128 000)                         |

4. **పేజీ నుంచే ఒక పరీక్షను అమలు చేయండి** — ఫలితాల ప్యానెల్ ప్రతి ప్రొవైడర్ సమాధానం,
   స్థితి మరియు వ్యవధిని చూపుతుంది.

## ఎగ్జిక్యూషన్ మోడ్లు

- **`parallel`** — ప్రతి మోడల్కు ఒకే టాస్క్ ఏకకాలంలో అందుతుంది; మీకు అన్ని సమాధానాలు
  స్వతంత్రంగా లభిస్తాయి.
- **`collaborative`** — మోడల్లు **గొలుసుగా** అమలవుతాయి: ప్రతి మోడల్ మునుపటి మోడల్ అవుట్పుట్ను చూసి,
  దాన్ని మెరుగుపరచమని, విస్తరించమని, విమర్శించమని లేదా ప్రత్యామ్నాయం అందించమని కోరబడుతుంది. ప్రతిస్పందనలోని `summary` ఫీల్డ్
  విజయవంతమైన అవుట్పుట్లను గొలుసు క్రమంలో కలుపుతుంది (`parallel` అమలులకు `summary` ఉండదు).

## API

### `POST /api/chaos/run` — డ్యాష్బోర్డ్ సెషన్

కుకీ ద్వారా ప్రామాణీకరించబడుతుంది (నిర్వహణ సెషన్ —
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md) చూడండి); డ్యాష్బోర్డ్ పేజీ దీనిని ఉపయోగిస్తుంది.

```jsonc
// బాడీ
{
  "task": "Compare approaches to X", // తప్పనిసరి
  "providers": ["glm", "kimi"], // ఐచ్ఛిక ఫిల్టర్
  "mode": "parallel", // ఐచ్ఛికం — defaultModeను ఓవర్రైడ్ చేస్తుంది
  "systemPrompt": "…", // ఐచ్ఛిక ఓవర్రైడ్
  "maxTokens": 4096, // ఐచ్ఛిక ఓవర్రైడ్
}
```

### `POST /api/skills/collect/chaos` — API కీ

బాహ్య కాలర్ల కోసం Bearer-token వేరియంట్. కీకి తప్పనిసరిగా **Chaos Mode అనుమతి**
(`chaosModeEnabled`) ఉండాలి, ఇది **డిఫాల్ట్గా ఆఫ్లో ఉంటుంది** — ప్రతి కీకి దీన్ని
**డ్యాష్బోర్డ్ → API Manager → కీని సవరించండి → అనుమతులు → Chaos Mode**లో ప్రారంభించండి. పై బాడీనే దీనికీ ఉపయోగించండి.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

రెండు ఎండ్పాయింట్లు ఒకే ఆకృతిలో ప్రతిస్పందనను అందిస్తాయి:

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
  "summary": "…", // collaborative మోడ్లో మాత్రమే
}
```

## సమస్య పరిష్కారం

- **`400 Chaos Mode is not enabled`** — పై 2వ దశను చూడండి: గ్లోబల్ స్విచ్ ఆఫ్లో ఉంది.
- **`/api/skills/collect/chaos`లో API కీ తిరస్కరించబడుతుంది** — కీకి ప్రతి-కీ
  `chaosModeEnabled` అనుమతి లేదు (ఇది డిఫాల్ట్గా ఆఫ్లో ఉంటుంది; ఇది ఒక సెట్టింగ్, లోపం కాదు).
- **మీరు ఆశించిన ప్రొవైడర్ ఫలితాల్లో కనిపించడం లేదు** — Chaos Mode పేజీలోని `providerOverrides`ను
  తనిఖీ చేయండి (డిసేబుల్ చేసిన ఓవర్రైడ్ దాన్ని మినహాయిస్తుంది), అలాగే ప్రొవైడర్ కనెక్షన్
  యాక్టివ్గా ఉందో లేదో చూడండి.
