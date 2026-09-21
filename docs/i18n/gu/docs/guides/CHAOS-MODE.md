# Chaos Mode (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **ડેશબોર્ડ:** **Chaos Mode** (સાઇડબાર) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (ડેશબોર્ડ સત્ર) · `POST /api/skills/collect/chaos` (API કી)  
> **સ્રોત:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Chaos Mode **એક કાર્યને એકસાથે અનેક પ્રદાતાઓને મોકલે છે** — ભાગ લેનાર દરેક પ્રદાતા
એક મોડેલ ઇન્સ્ટન્સ પ્રદાન કરે છે અને તમને બધા જવાબો બાજુ-બાજુ (અથવા શૃંખલાબદ્ધ) મળે છે. આ
મલ્ટિ-મોડેલ એક્ઝિક્યુશન સપાટી છે, રાઉટિંગ વ્યૂહરચના નથી: તમારું સામાન્ય `/v1/chat/completions`
ટ્રાફિક તેનાથી ક્યારેય પ્રભાવિત થતું નથી.

**સ્પષ્ટતા — "chaos" નામ ધરાવતી ત્રણ અલગ વસ્તુઓ ઉપલબ્ધ છે:**

| વસ્તુ                | તે શું છે                                                                                                       | દસ્તાવેજીકરણ ક્યાં છે                        |
| -------------------- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Chaos Mode**       | અહીં વર્ણવેલું ડેશબોર્ડ પેજ + API: એક કાર્યને અનેક પ્રદાતાઓ સુધી ફેલાવો (સમાંતર અથવા સહયોગાત્મક).               | આ માર્ગદર્શિકા                               |
| `auto/chaos`         | સ્થિતિસ્થાપકતા પરીક્ષણ માટે ફૉલ્ટ-ઇન્જેક્શન સ્કોરિંગ વેઇટ્સ ધરાવતું Auto-Combo મોડેલ id. કંઈ ગોઠવવાની જરૂર નથી. | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Chaos કોમ્બો કૉન્ફિગ | `config.chaos.enabled` ધરાવતું કાયમી કોમ્બો, જે વૈકલ્પિક જજ મોડેલ સાથે પેનલમાં ફેલાય છે (ફક્ત-API).             | `open-sse/services/autoCombo/chaosEngine.ts` |

## સેટઅપ

1. **ડેશબોર્ડ → Chaos Mode** (`/dashboard/chaos`) ખોલો.
2. તેને **ચાલુ** કરો — Chaos Mode મૂળભૂત રીતે **અક્ષમ** હોય છે (`src/lib/chaos/chaosConfig.ts`માં
   `enabled: false`). અક્ષમ હોય ત્યારે, `POST /api/chaos/run`
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."` જવાબ આપે છે.
3. સહભાગીઓ અને ડિફૉલ્ટ્સ પસંદ કરો (સેટિંગ્સ સ્ટોર દ્વારા દરેક ઇન્સ્ટન્સ માટે કાયમી રાખવામાં આવે છે):

   | ફીલ્ડ               | અર્થ                                                                     | ડિફૉલ્ટ / મર્યાદાઓ                     |
   | ------------------- | ------------------------------------------------------------------------ | -------------------------------------- |
   | `enabled`           | મુખ્ય સ્વિચ                                                              | `false`                                |
   | `defaultMode`       | `parallel` અથવા `collaborative` (નીચે જુઓ)                               | `parallel`                             |
   | `providerOverrides` | દરેક પ્રદાતા માટે સહભાગિતા (`providerId`, વૈકલ્પિક `modelId`, `enabled`) | ખાલી = દરેક સક્રિય પ્રદાતા, મહત્તમ 200 |
   | `systemPrompt`      | બિલ્ટ-ઇન Chaos સિસ્ટમ પ્રોમ્પ્ટ માટે ઓવરરાઇડ                             | વૈકલ્પિક, મહત્તમ 10 000 અક્ષરો         |
   | `timeoutMs`         | દરેક મોડેલ કૉલ માટેનો મહત્તમ સમય                                         | `120000` (5 000–600 000)               |
   | `maxTokens`         | દરેક મોડેલ કૉલ દીઠ `max_tokens`                                          | `4096` (256–128 000)                   |

4. **પેજ પરથી જ પરીક્ષણ ચલાવો** — પરિણામોનું પેનલ દરેક પ્રદાતાનો જવાબ,
   સ્થિતિ અને અવધિ બતાવે છે.

## એક્ઝિક્યુશન મોડ્સ

- **`parallel`** — દરેક મોડેલને સમાન કાર્ય એકસાથે મળે છે; તમને બધા જવાબો
  સ્વતંત્ર રીતે મળે છે.
- **`collaborative`** — મોડેલ્સ **શૃંખલામાં** ચાલે છે: દરેક મોડેલ અગાઉના મોડેલનું આઉટપુટ જુએ છે અને
  તેને સુધારવા, વિસ્તૃત કરવા, સમીક્ષા કરવા અથવા વિકલ્પ રજૂ કરવા માટે કહેવામાં આવે છે. પ્રતિસાદનું `summary` ફીલ્ડ
  સફળ આઉટપુટ્સને શૃંખલાના ક્રમમાં જોડે છે (`parallel` રનમાં `summary` હોતું નથી).

## API

### `POST /api/chaos/run` — ડેશબોર્ડ સત્ર

કૂકી દ્વારા પ્રમાણિત (મેનેજમેન્ટ સત્ર — જુઓ
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); ડેશબોર્ડ પેજ દ્વારા વપરાય છે.

```jsonc
// બોડી
{
  "task": "Compare approaches to X", // આવશ્યક
  "providers": ["glm", "kimi"], // વૈકલ્પિક ફિલ્ટર
  "mode": "parallel", // વૈકલ્પિક — defaultModeને ઓવરરાઇડ કરે છે
  "systemPrompt": "…", // વૈકલ્પિક ઓવરરાઇડ
  "maxTokens": 4096, // વૈકલ્પિક ઓવરરાઇડ
}
```

### `POST /api/skills/collect/chaos` — API કી

બાહ્ય કૉલર્સ માટેનું બેરર-ટોકન વેરિઅન્ટ. કીમાં **Chaos Mode પરવાનગી**
(`chaosModeEnabled`) હોવી આવશ્યક છે, જે મૂળભૂત રીતે **બંધ** હોય છે — તેને દરેક કી માટે
**ડેશબોર્ડ → API Manager → કી સંપાદિત કરો → પરવાનગીઓ → Chaos Mode**માં સક્ષમ કરો. ઉપર આપેલી સમાન બોડી.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

બંને એન્ડપોઇન્ટ્સ સમાન માળખાનો પ્રતિસાદ આપે છે:

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
  "summary": "…", // ફક્ત collaborative મોડમાં
}
```

## સમસ્યા નિવારણ

- **`400 Chaos Mode is not enabled`** — ઉપરનું પગલું 2: વૈશ્વિક સ્વિચ બંધ છે.
- **`/api/skills/collect/chaos` પર API કી નકારવામાં આવે છે** — કીમાં દરેક કી માટેની
  `chaosModeEnabled` પરવાનગીનો અભાવ છે (મૂળભૂત રીતે બંધ; આ એક સેટિંગ છે, ભૂલ નથી).
- **તમે અપેક્ષા રાખેલો પ્રદાતા પરિણામોમાંથી ગાયબ છે** — Chaos Mode પેજ પર `providerOverrides`
  તપાસો (અક્ષમ ઓવરરાઇડ તેને બાકાત રાખે છે) અને પ્રદાતાનું કનેક્શન
  સક્રિય છે કે નહીં તે તપાસો.
