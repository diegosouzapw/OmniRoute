# Thinking Budget (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/THINKING_BUDGET.md) · 🇪🇹 [am](../../../am/docs/guides/THINKING_BUDGET.md) · 🇸🇦 [ar](../../../ar/docs/guides/THINKING_BUDGET.md) · 🇦🇿 [az](../../../az/docs/guides/THINKING_BUDGET.md) · 🇧🇬 [bg](../../../bg/docs/guides/THINKING_BUDGET.md) · 🇧🇩 [bn](../../../bn/docs/guides/THINKING_BUDGET.md) · 🇨🇿 [cs](../../../cs/docs/guides/THINKING_BUDGET.md) · 🇩🇰 [da](../../../da/docs/guides/THINKING_BUDGET.md) · 🇩🇪 [de](../../../de/docs/guides/THINKING_BUDGET.md) · 🇬🇷 [el](../../../el/docs/guides/THINKING_BUDGET.md) · 🇪🇸 [es](../../../es/docs/guides/THINKING_BUDGET.md) · 🇪🇪 [et](../../../et/docs/guides/THINKING_BUDGET.md) · 🇮🇷 [fa](../../../fa/docs/guides/THINKING_BUDGET.md) · 🇫🇮 [fi](../../../fi/docs/guides/THINKING_BUDGET.md) · 🇫🇷 [fr](../../../fr/docs/guides/THINKING_BUDGET.md) · 🇮🇪 [ga](../../../ga/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [gu](../../../gu/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ha](../../../ha/docs/guides/THINKING_BUDGET.md) · 🇮🇱 [he](../../../he/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [hi](../../../hi/docs/guides/THINKING_BUDGET.md) · 🇭🇷 [hr](../../../hr/docs/guides/THINKING_BUDGET.md) · 🇭🇺 [hu](../../../hu/docs/guides/THINKING_BUDGET.md) · 🇦🇲 [hy](../../../hy/docs/guides/THINKING_BUDGET.md) · 🇮🇩 [id](../../../id/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ig](../../../ig/docs/guides/THINKING_BUDGET.md) · 🇮🇹 [it](../../../it/docs/guides/THINKING_BUDGET.md) · 🇯🇵 [ja](../../../ja/docs/guides/THINKING_BUDGET.md) · 🇬🇪 [ka](../../../ka/docs/guides/THINKING_BUDGET.md) · 🇰🇭 [km](../../../km/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [kn](../../../kn/docs/guides/THINKING_BUDGET.md) · 🇰🇷 [ko](../../../ko/docs/guides/THINKING_BUDGET.md) · 🇱🇹 [lt](../../../lt/docs/guides/THINKING_BUDGET.md) · 🇱🇻 [lv](../../../lv/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ml](../../../ml/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [mr](../../../mr/docs/guides/THINKING_BUDGET.md) · 🇲🇾 [ms](../../../ms/docs/guides/THINKING_BUDGET.md) · 🇲🇹 [mt](../../../mt/docs/guides/THINKING_BUDGET.md) · 🇲🇲 [my](../../../my/docs/guides/THINKING_BUDGET.md) · 🇳🇵 [ne](../../../ne/docs/guides/THINKING_BUDGET.md) · 🇳🇱 [nl](../../../nl/docs/guides/THINKING_BUDGET.md) · 🇳🇴 [no](../../../no/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [or](../../../or/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [pa](../../../pa/docs/guides/THINKING_BUDGET.md) · 🇵🇭 [phi](../../../phi/docs/guides/THINKING_BUDGET.md) · 🇵🇱 [pl](../../../pl/docs/guides/THINKING_BUDGET.md) · 🇵🇹 [pt](../../../pt/docs/guides/THINKING_BUDGET.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/THINKING_BUDGET.md) · 🇷🇴 [ro](../../../ro/docs/guides/THINKING_BUDGET.md) · 🇷🇺 [ru](../../../ru/docs/guides/THINKING_BUDGET.md) · 🇱🇰 [si](../../../si/docs/guides/THINKING_BUDGET.md) · 🇸🇰 [sk](../../../sk/docs/guides/THINKING_BUDGET.md) · 🇸🇮 [sl](../../../sl/docs/guides/THINKING_BUDGET.md) · 🇷🇸 [sr](../../../sr/docs/guides/THINKING_BUDGET.md) · 🇰🇪 [sw](../../../sw/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ta](../../../ta/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [te](../../../te/docs/guides/THINKING_BUDGET.md) · 🇹🇭 [th](../../../th/docs/guides/THINKING_BUDGET.md) · 🇹🇷 [tr](../../../tr/docs/guides/THINKING_BUDGET.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/THINKING_BUDGET.md) · 🇵🇰 [ur](../../../ur/docs/guides/THINKING_BUDGET.md) · 🇺🇿 [uz](../../../uz/docs/guides/THINKING_BUDGET.md) · 🇻🇳 [vi](../../../vi/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [yo](../../../yo/docs/guides/THINKING_BUDGET.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/THINKING_BUDGET.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/THINKING_BUDGET.md)

---

> **Instrumentpanel:** Inställningar → **AI** → Tankebudget  
> **API:** `GET` / `PUT` `/api/settings/thinking-budget`  
> **Källa:** `open-sse/services/thinkingBudget.ts`

Tankebudgeten styr om OmniRoute **skriver om klientens parametrar för tänkande/resonemang** på vägen till leverantörerna. Den slår **inte** på eller av komprimering, dirigering eller promptcache.

## Lägen

| Läge                         | Vad OmniRoute gör                                                                                                | När det ska användas                                                                                                                                                               |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`passthrough`** (standard) | Lämnar klientfälten orörda (`reasoning`, `reasoning_effort`, Claude `thinking`, Gemini `thinking_config` osv.).  | **Codex / Desktop / alla klienter som själva ska styra ansträngningsnivå och resonemangssammanfattningar.** Krävs för synliga tankepaneler när klienten begär `reasoning.summary`. |
| **`auto`**                   | **Tar bort alla** fält för tänkande/resonemang från förfrågans brödtext innan den skickas uppströms.             | Endast när du avsiktligt vill att **leverantören** ska skapa standardvärden och du **inte** behöver klientstyrt tänkande. **Betyder inte** ”visa tänkande automatiskt”.            |
| **`custom`**                 | Skriver över varje förfrågan med en fast tokenbudget för tänkande.                                               | Hård gräns för antalet tanketoken för all trafik.                                                                                                                                  |
| **`adaptive`**               | Skalar budgeten från en grundläggande ansträngningsnivå med hjälp av antal meddelanden, verktyg och promptlängd. | Mjuk tokenstyrning utan att helt ta bort klientens avsikt.                                                                                                                         |

### Vad `auto` tar bort

När läget är `auto` tar `stripThinkingConfig()` bland annat bort:

- OpenAI / Responses: `reasoning`, `reasoning_effort`
- Claude: `thinking` samt `output_config.effort` när det finns
- Gemini: `generationConfig.thinking_config` / `thinkingConfig`

Om en klient (t.ex. Codex Desktop) skickade `reasoning: { effort: "ultra", summary: "detailed" }` **tar auto bort det objektet**. Uppströmsleverantören kan fortfarande debitera för vissa resonemangstoken, men returnerar ofta **tomma eller enbart krypterade** resonemangsposter — därför visar användargränssnittet ingen användbar tankeström.

## Vad detta **inte** är

| Funktion                                          | Samband                                                                                                                                                   |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Komprimering** (Caveman, RTK, stacked, …)       | Separat pipeline. Fungerar i alla tankebudgetlägen.                                                                                                       |
| **Prompt-/semantisk cache**                       | Separat. Påverkas inte av tankebudgetläget.                                                                                                               |
| **Kombinerad dirigering/reservvägar**             | Separat. Påverkas inte.                                                                                                                                   |
| **Tokengränser/kostnadsbudgetar för API-nycklar** | Separat. Påverkas inte.                                                                                                                                   |
| **Cache för återuppspelning av resonemang**       | Återinfogning över flera konversationsomgångar för strikta leverantörer (DeepSeek, Kimi, Qwen-thinking, …). Inte samma sak som ”visa tänkande” i Desktop. |
| **Dekryptering av `encrypted_content`**           | **Omöjligt.** Privata resonemangsblobbar från OpenAI/Codex är ogenomskinliga. OmniRoute dekrypterar dem aldrig (#7095 / #7176 / #7304).                   |

## Synligt tänkande (Codex-/Responses-klienter)

För att en klient ska visa tanketext behöver du **allt** följande:

1. Läget Thinking Budget = **`passthrough`** (eller custom/adaptive som fortfarande lämnar sammanfattningsbegäranden tillräckligt intakta för den sökväg du använder).
2. Klienten begär en sammanfattning, t.ex. Codex `model_reasoning_summary = "detailed"` / `auto` (inte `none`).
3. Uppströmsleverantören strömmar faktiskt `response.reasoning_summary_text.*` (eller en icke-tom `reasoning.summary` för objektet).

Om du bara får ”krypterat privat resonemang” beror det på att antingen:

- läget var **`auto`** (klientens begäran togs bort), eller
- uppströmsleverantören returnerade `encrypted_content` utan sammanfattningstext (en leverantörsbegränsning; OmniRoute kan endast visa en platshållare, inte klartext).

## API-exempel

```bash
# Läs
curl -sS https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN"

# Rekommenderas för synligt tänkande i Codex/Desktop
curl -sS -X PUT https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"passthrough","customBudget":10240,"effortLevel":"medium"}'
```

Schema (`updateThinkingBudgetSchema`): `mode` ∈ `passthrough|auto|custom|adaptive`; valfria `customBudget`, `effortLevel`, `baseBudget`, `complexityMultiplier`.

### Persistens/omstart

Värdet lagras under inställningsnyckeln `thinkingBudget` och läses in när processen startar (`hydrateThinkingBudgetConfig`). Efter en ändring via databasen eller vissa sökvägar utanför API:t måste du **starta om OmniRoute-processen** så att singleton-instansen i minnet överensstämmer med värdet på disken.

## Checklista för operatörer

- [ ] Codex-/Desktop-användare: läge = **passthrough**
- [ ] Låt komprimering vara aktiverad om du vill spara token för **meddelanden**, inte genom att ta bort tänkande
- [ ] Förvänta dig inte att `auto` ska ”visa mer tänkande”
- [ ] Sammanfattningar som endast är krypterade är ett **leverantörsbeteende**; passthrough kan inte dekryptera dem

## Relaterad dokumentation

- [REASONING_REPLAY.md](../routing/REASONING_REPLAY.md) — cache för `reasoning_content` över flera turer
- [USER_GUIDE.md](./USER_GUIDE.md) — flikar på inställningspanelen
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — slutpunkter för inställningar
