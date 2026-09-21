# Thinking Budget (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/THINKING_BUDGET.md) · 🇪🇹 [am](../../../am/docs/guides/THINKING_BUDGET.md) · 🇸🇦 [ar](../../../ar/docs/guides/THINKING_BUDGET.md) · 🇦🇿 [az](../../../az/docs/guides/THINKING_BUDGET.md) · 🇧🇬 [bg](../../../bg/docs/guides/THINKING_BUDGET.md) · 🇧🇩 [bn](../../../bn/docs/guides/THINKING_BUDGET.md) · 🇨🇿 [cs](../../../cs/docs/guides/THINKING_BUDGET.md) · 🇩🇰 [da](../../../da/docs/guides/THINKING_BUDGET.md) · 🇩🇪 [de](../../../de/docs/guides/THINKING_BUDGET.md) · 🇬🇷 [el](../../../el/docs/guides/THINKING_BUDGET.md) · 🇪🇸 [es](../../../es/docs/guides/THINKING_BUDGET.md) · 🇪🇪 [et](../../../et/docs/guides/THINKING_BUDGET.md) · 🇮🇷 [fa](../../../fa/docs/guides/THINKING_BUDGET.md) · 🇫🇮 [fi](../../../fi/docs/guides/THINKING_BUDGET.md) · 🇫🇷 [fr](../../../fr/docs/guides/THINKING_BUDGET.md) · 🇮🇪 [ga](../../../ga/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ha](../../../ha/docs/guides/THINKING_BUDGET.md) · 🇮🇱 [he](../../../he/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [hi](../../../hi/docs/guides/THINKING_BUDGET.md) · 🇭🇷 [hr](../../../hr/docs/guides/THINKING_BUDGET.md) · 🇭🇺 [hu](../../../hu/docs/guides/THINKING_BUDGET.md) · 🇦🇲 [hy](../../../hy/docs/guides/THINKING_BUDGET.md) · 🇮🇩 [id](../../../id/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ig](../../../ig/docs/guides/THINKING_BUDGET.md) · 🇮🇹 [it](../../../it/docs/guides/THINKING_BUDGET.md) · 🇯🇵 [ja](../../../ja/docs/guides/THINKING_BUDGET.md) · 🇬🇪 [ka](../../../ka/docs/guides/THINKING_BUDGET.md) · 🇰🇭 [km](../../../km/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [kn](../../../kn/docs/guides/THINKING_BUDGET.md) · 🇰🇷 [ko](../../../ko/docs/guides/THINKING_BUDGET.md) · 🇱🇹 [lt](../../../lt/docs/guides/THINKING_BUDGET.md) · 🇱🇻 [lv](../../../lv/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ml](../../../ml/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [mr](../../../mr/docs/guides/THINKING_BUDGET.md) · 🇲🇾 [ms](../../../ms/docs/guides/THINKING_BUDGET.md) · 🇲🇹 [mt](../../../mt/docs/guides/THINKING_BUDGET.md) · 🇲🇲 [my](../../../my/docs/guides/THINKING_BUDGET.md) · 🇳🇵 [ne](../../../ne/docs/guides/THINKING_BUDGET.md) · 🇳🇱 [nl](../../../nl/docs/guides/THINKING_BUDGET.md) · 🇳🇴 [no](../../../no/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [or](../../../or/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [pa](../../../pa/docs/guides/THINKING_BUDGET.md) · 🇵🇭 [phi](../../../phi/docs/guides/THINKING_BUDGET.md) · 🇵🇱 [pl](../../../pl/docs/guides/THINKING_BUDGET.md) · 🇵🇹 [pt](../../../pt/docs/guides/THINKING_BUDGET.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/THINKING_BUDGET.md) · 🇷🇴 [ro](../../../ro/docs/guides/THINKING_BUDGET.md) · 🇷🇺 [ru](../../../ru/docs/guides/THINKING_BUDGET.md) · 🇱🇰 [si](../../../si/docs/guides/THINKING_BUDGET.md) · 🇸🇰 [sk](../../../sk/docs/guides/THINKING_BUDGET.md) · 🇸🇮 [sl](../../../sl/docs/guides/THINKING_BUDGET.md) · 🇷🇸 [sr](../../../sr/docs/guides/THINKING_BUDGET.md) · 🇸🇪 [sv](../../../sv/docs/guides/THINKING_BUDGET.md) · 🇰🇪 [sw](../../../sw/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ta](../../../ta/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [te](../../../te/docs/guides/THINKING_BUDGET.md) · 🇹🇭 [th](../../../th/docs/guides/THINKING_BUDGET.md) · 🇹🇷 [tr](../../../tr/docs/guides/THINKING_BUDGET.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/THINKING_BUDGET.md) · 🇵🇰 [ur](../../../ur/docs/guides/THINKING_BUDGET.md) · 🇺🇿 [uz](../../../uz/docs/guides/THINKING_BUDGET.md) · 🇻🇳 [vi](../../../vi/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [yo](../../../yo/docs/guides/THINKING_BUDGET.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/THINKING_BUDGET.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/THINKING_BUDGET.md)

---

> **ડૅશબોર્ડ:** Settings → **AI** → Thinking Budget  
> **API:** `GET` / `PUT` `/api/settings/thinking-budget`  
> **સ્રોત:** `open-sse/services/thinkingBudget.ts`

Thinking Budget એ નિયંત્રિત કરે છે કે પ્રદાતાઓ સુધી પહોંચાડતી વખતે OmniRoute **ક્લાયન્ટના thinking/reasoning પરિમાણોને ફરીથી લખે છે કે નહીં**. તે compression, routing અથવા prompt cache ને ચાલુ કે બંધ કરતું **નથી**.

## મોડ્સ

| મોડ                         | OmniRoute શું કરે છે                                                                                                     | ક્યારે ઉપયોગ કરવો                                                                                                                                                                             |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`passthrough`** (ડિફૉલ્ટ) | ક્લાયન્ટ ફીલ્ડ્સને યથાવત્ રાખે છે (`reasoning`, `reasoning_effort`, Claude `thinking`, Gemini `thinking_config`, વગેરે). | **Codex / Desktop / effort + reasoning summaries ને નિયંત્રિત કરવા જોઈએ તેવો કોઈપણ ક્લાયન્ટ.** ક્લાયન્ટ જ્યારે `reasoning.summary` ની વિનંતી કરે ત્યારે દૃશ્યમાન thinking panels માટે આવશ્યક. |
| **`auto`**                  | upstream પહેલાં request body માંથી thinking/reasoning ના **તમામ ફીલ્ડ્સ દૂર કરે છે**.                                    | ફક્ત ત્યારે, જ્યારે તમે ઇરાદાપૂર્વક **પ્રદાતા** પાસે ડિફૉલ્ટ્સ નક્કી કરાવવા માંગતા હો અને તમને ક્લાયન્ટ-નિયંત્રિત thinking ની જરૂર ન હોય. આનો અર્થ “thinking આપમેળે બતાવો” **નથી**.           |
| **`custom`**                | દરેક request ને નિશ્ચિત thinking token budget વડે ઓવરરાઇટ કરે છે.                                                        | તમામ ટ્રાફિક માટે thinking tokens પર સખત મર્યાદા.                                                                                                                                             |
| **`adaptive`**              | સંદેશાઓની સંખ્યા, tools અને prompt ની લંબાઈનો ઉપયોગ કરીને મૂળભૂત effort પરથી budget ને સ્કેલ કરે છે.                     | ક્લાયન્ટના હેતુને સંપૂર્ણપણે દૂર કર્યા વિના નરમ token નિયંત્રણ.                                                                                                                               |

### `auto` શું દૂર કરે છે

જ્યારે મોડ `auto` હોય, ત્યારે `stripThinkingConfig()` અન્ય ફીલ્ડ્સ સહિત નીચેનાને કાઢી નાખે છે:

- OpenAI / Responses: `reasoning`, `reasoning_effort`
- Claude: `thinking`, અને હાજર હોય ત્યારે `output_config.effort`
- Gemini: `generationConfig.thinking_config` / `thinkingConfig`

જો કોઈ ક્લાયન્ટે (દા.ત. Codex Desktop) `reasoning: { effort: "ultra", summary: "detailed" }` મોકલ્યું હોય, તો **auto તે object ને દૂર કરે છે**. Upstream હજી પણ કેટલાક reasoning tokens માટે બિલ કરી શકે છે, પરંતુ ઘણી વાર **ખાલી અથવા માત્ર encrypted** reasoning items પરત કરે છે — તેથી UI કોઈ ઉપયોગી thinking stream બતાવતું નથી.

## આ શું **નથી**

| સુવિધા                                     | સંબંધ                                                                                                                                 |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| **Compression** (Caveman, RTK, stacked, …) | અલગ pipeline. દરેક thinking-budget મોડ હેઠળ કાર્ય કરે છે.                                                                             |
| **Prompt / semantic cache**                | અલગ છે. thinking-budget મોડથી અપ્રભાવિત.                                                                                              |
| **Combo routing / fallbacks**              | અલગ છે. અપ્રભાવિત.                                                                                                                    |
| **API-key token limits / cost budgets**    | અલગ છે. અપ્રભાવિત.                                                                                                                    |
| **Reasoning replay cache**                 | કડક પ્રદાતાઓ (DeepSeek, Kimi, Qwen-thinking, …) માટે multi-turn re-inject. Desktop ના “show thinking” જેવું નથી.                      |
| **`encrypted_content` ને decrypt કરવું**   | **અશક્ય.** OpenAI/Codex ના ખાનગી reasoning blobs અપારદર્શક હોય છે. OmniRoute તેમને ક્યારેય decrypt કરતું નથી (#7095 / #7176 / #7304). |

## દૃશ્યમાન વિચાર-પ્રક્રિયા (Codex / Responses ક્લાયન્ટ્સ)

ક્લાયન્ટમાં વિચાર-પ્રક્રિયાનું લખાણ દેખાડવા માટે નીચેની **બધી** બાબતો જરૂરી છે:

1. Thinking Budget મોડ = **`passthrough`** (અથવા custom/adaptive, જે તમે ઉપયોગ કરતા પાથ માટે summary વિનંતીઓને પૂરતી અખંડ રાખે).
2. ક્લાયન્ટ summary માટે વિનંતી કરે, દા.ત. Codex `model_reasoning_summary = "detailed"` / `auto` (`none` નહીં).
3. અપસ્ટ્રીમ ખરેખર `response.reasoning_summary_text.*` સ્ટ્રીમ કરે (અથવા આઇટમ પર ખાલી ન હોય તેવું `reasoning.summary` આપે).

જો તમને ફક્ત “એન્ક્રિપ્ટેડ ખાનગી વિચાર-પ્રક્રિયા” મળે, તો:

- મોડ **`auto`** હતો (ક્લાયન્ટની વિનંતી દૂર કરવામાં આવી હતી), અથવા
- અપસ્ટ્રીમે summary લખાણ વિના `encrypted_content` પરત કર્યું હતું (પ્રદાતાની મર્યાદા; OmniRoute ફક્ત પ્લેસહોલ્ડર દર્શાવી શકે છે, સાદું લખાણ નહીં).

## API ઉદાહરણો

```bash
# વાંચો
curl -sS https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN"

# Codex / Desktopમાં વિચાર-પ્રક્રિયાની દૃશ્યતા માટે ભલામણ કરેલ
curl -sS -X PUT https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"passthrough","customBudget":10240,"effortLevel":"medium"}'
```

સ્કીમા (`updateThinkingBudgetSchema`): `mode` ∈ `passthrough|auto|custom|adaptive`; વૈકલ્પિક `customBudget`, `effortLevel`, `baseBudget`, `complexityMultiplier`.

### સ્થાયી સંગ્રહ / પુનઃપ્રારંભ

મૂલ્ય settings કી `thinkingBudget` હેઠળ સંગ્રહિત થાય છે અને પ્રોસેસ શરૂ થાય ત્યારે લોડ થાય છે (`hydrateThinkingBudgetConfig`). DB અથવા અમુક બિન-API પાથ દ્વારા ફેરફાર કર્યા પછી, **OmniRoute પ્રોસેસને પુનઃપ્રારંભ કરો**, જેથી ઇન-મેમરી singleton ડિસ્ક સાથે સુસંગત બને.

## ઑપરેટર ચેકલિસ્ટ

- [ ] Codex / Desktop વપરાશકર્તાઓ: મોડ = **passthrough**
- [ ] જો તમે **messages** પર ટોકન બચાવવા માંગતા હો, વિચાર-પ્રક્રિયા દૂર કરીને નહીં, તો compression સક્ષમ રાખો
- [ ] `auto` પાસેથી “વધુ વિચાર-પ્રક્રિયા દેખાડવાની” અપેક્ષા રાખશો નહીં
- [ ] ફક્ત એન્ક્રિપ્ટેડ summaries એ **પ્રદાતા**નું વર્તન છે; passthrough તેને ડિક્રિપ્ટ કરી શકતું નથી

## સંબંધિત દસ્તાવેજો

- [REASONING_REPLAY.md](../routing/REASONING_REPLAY.md) — બહુવિધ-ટર્ન `reasoning_content` કૅશ
- [USER_GUIDE.md](./USER_GUIDE.md) — Settings ડૅશબોર્ડ ટૅબ્સ
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — settings endpoints
