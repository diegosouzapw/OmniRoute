# Thinking Budget (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/THINKING_BUDGET.md) · 🇪🇹 [am](../../../am/docs/guides/THINKING_BUDGET.md) · 🇸🇦 [ar](../../../ar/docs/guides/THINKING_BUDGET.md) · 🇦🇿 [az](../../../az/docs/guides/THINKING_BUDGET.md) · 🇧🇬 [bg](../../../bg/docs/guides/THINKING_BUDGET.md) · 🇧🇩 [bn](../../../bn/docs/guides/THINKING_BUDGET.md) · 🇨🇿 [cs](../../../cs/docs/guides/THINKING_BUDGET.md) · 🇩🇰 [da](../../../da/docs/guides/THINKING_BUDGET.md) · 🇩🇪 [de](../../../de/docs/guides/THINKING_BUDGET.md) · 🇬🇷 [el](../../../el/docs/guides/THINKING_BUDGET.md) · 🇪🇸 [es](../../../es/docs/guides/THINKING_BUDGET.md) · 🇪🇪 [et](../../../et/docs/guides/THINKING_BUDGET.md) · 🇮🇷 [fa](../../../fa/docs/guides/THINKING_BUDGET.md) · 🇫🇮 [fi](../../../fi/docs/guides/THINKING_BUDGET.md) · 🇫🇷 [fr](../../../fr/docs/guides/THINKING_BUDGET.md) · 🇮🇪 [ga](../../../ga/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [gu](../../../gu/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ha](../../../ha/docs/guides/THINKING_BUDGET.md) · 🇮🇱 [he](../../../he/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [hi](../../../hi/docs/guides/THINKING_BUDGET.md) · 🇭🇷 [hr](../../../hr/docs/guides/THINKING_BUDGET.md) · 🇭🇺 [hu](../../../hu/docs/guides/THINKING_BUDGET.md) · 🇦🇲 [hy](../../../hy/docs/guides/THINKING_BUDGET.md) · 🇮🇩 [id](../../../id/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ig](../../../ig/docs/guides/THINKING_BUDGET.md) · 🇮🇹 [it](../../../it/docs/guides/THINKING_BUDGET.md) · 🇯🇵 [ja](../../../ja/docs/guides/THINKING_BUDGET.md) · 🇬🇪 [ka](../../../ka/docs/guides/THINKING_BUDGET.md) · 🇰🇭 [km](../../../km/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [kn](../../../kn/docs/guides/THINKING_BUDGET.md) · 🇰🇷 [ko](../../../ko/docs/guides/THINKING_BUDGET.md) · 🇱🇹 [lt](../../../lt/docs/guides/THINKING_BUDGET.md) · 🇱🇻 [lv](../../../lv/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ml](../../../ml/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [mr](../../../mr/docs/guides/THINKING_BUDGET.md) · 🇲🇾 [ms](../../../ms/docs/guides/THINKING_BUDGET.md) · 🇲🇹 [mt](../../../mt/docs/guides/THINKING_BUDGET.md) · 🇲🇲 [my](../../../my/docs/guides/THINKING_BUDGET.md) · 🇳🇵 [ne](../../../ne/docs/guides/THINKING_BUDGET.md) · 🇳🇴 [no](../../../no/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [or](../../../or/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [pa](../../../pa/docs/guides/THINKING_BUDGET.md) · 🇵🇭 [phi](../../../phi/docs/guides/THINKING_BUDGET.md) · 🇵🇱 [pl](../../../pl/docs/guides/THINKING_BUDGET.md) · 🇵🇹 [pt](../../../pt/docs/guides/THINKING_BUDGET.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/THINKING_BUDGET.md) · 🇷🇴 [ro](../../../ro/docs/guides/THINKING_BUDGET.md) · 🇷🇺 [ru](../../../ru/docs/guides/THINKING_BUDGET.md) · 🇱🇰 [si](../../../si/docs/guides/THINKING_BUDGET.md) · 🇸🇰 [sk](../../../sk/docs/guides/THINKING_BUDGET.md) · 🇸🇮 [sl](../../../sl/docs/guides/THINKING_BUDGET.md) · 🇷🇸 [sr](../../../sr/docs/guides/THINKING_BUDGET.md) · 🇸🇪 [sv](../../../sv/docs/guides/THINKING_BUDGET.md) · 🇰🇪 [sw](../../../sw/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ta](../../../ta/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [te](../../../te/docs/guides/THINKING_BUDGET.md) · 🇹🇭 [th](../../../th/docs/guides/THINKING_BUDGET.md) · 🇹🇷 [tr](../../../tr/docs/guides/THINKING_BUDGET.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/THINKING_BUDGET.md) · 🇵🇰 [ur](../../../ur/docs/guides/THINKING_BUDGET.md) · 🇺🇿 [uz](../../../uz/docs/guides/THINKING_BUDGET.md) · 🇻🇳 [vi](../../../vi/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [yo](../../../yo/docs/guides/THINKING_BUDGET.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/THINKING_BUDGET.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/THINKING_BUDGET.md)

---

> **Dashboard:** Instellingen → **AI** → Denkbudget  
> **API:** `GET` / `PUT` `/api/settings/thinking-budget`  
> **Bron:** `open-sse/services/thinkingBudget.ts`

Het denkbudget bepaalt of OmniRoute **denk-/redeneringsparameters van de client herschrijft** voordat verzoeken naar providers worden doorgestuurd. Het schakelt compressie, routering of de promptcache **niet** in of uit.

## Modi

| Modus                         | Wat OmniRoute doet                                                                                                  | Wanneer te gebruiken                                                                                                                                                                 |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`passthrough`** (standaard) | Laat clientvelden ongemoeid (`reasoning`, `reasoning_effort`, Claude `thinking`, Gemini `thinking_config`, enz.).   | **Codex / Desktop / elke client die inspanning en redeneringssamenvattingen zelf moet beheren.** Vereist voor zichtbare denkpanelen wanneer de client `reasoning.summary` aanvraagt. |
| **`auto`**                    | **Verwijdert alle** denk-/redeneringsvelden uit de aanvraagbody voordat deze upstream wordt verzonden.              | Alleen wanneer je bewust wilt dat de **provider** standaardwaarden bepaalt en je geen door de client beheerd denken nodig hebt. **Niet** “denken automatisch tonen”.                 |
| **`custom`**                  | Overschrijft elk verzoek met een vast tokengbudget voor denken.                                                     | Harde limiet voor denktokens voor al het verkeer.                                                                                                                                    |
| **`adaptive`**                | Schaalt het budget op basis van een basisinspanning aan de hand van het aantal berichten, tools en de promptlengte. | Flexibele tokenbeheersing zonder de intentie van de client volledig te verwijderen.                                                                                                  |

### Wat `auto` verwijdert

Wanneer de modus `auto` is, verwijdert `stripThinkingConfig()` onder andere:

- OpenAI / Responses: `reasoning`, `reasoning_effort`
- Claude: `thinking` en, indien aanwezig, `output_config.effort`
- Gemini: `generationConfig.thinking_config` / `thinkingConfig`

Als een client (bijvoorbeeld Codex Desktop) `reasoning: { effort: "ultra", summary: "detailed" }` heeft verzonden, **verwijdert auto dat object**. Upstream kunnen er nog steeds kosten voor bepaalde redeneringstokens in rekening worden gebracht, maar retourneert vaak **lege of uitsluitend versleutelde** redeneringsitems, waardoor de gebruikersinterface geen bruikbare denkstream toont.

## Wat dit **niet** is

| Functie                                               | Relatie                                                                                                                                    |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Compressie** (Caveman, RTK, stacked, …)             | Afzonderlijke pipeline. Werkt met elke denkbudgetmodus.                                                                                    |
| **Prompt-/semantische cache**                         | Afzonderlijk. Wordt niet beïnvloed door de denkbudgetmodus.                                                                                |
| **Combinatieroutering / fallbacks**                   | Afzonderlijk. Wordt niet beïnvloed.                                                                                                        |
| **Tokenlimieten voor API-sleutels / kostenbudgetten** | Afzonderlijk. Wordt niet beïnvloed.                                                                                                        |
| **Replaycache voor redeneringen**                     | Herinjectie over meerdere beurten voor strikte providers (DeepSeek, Kimi, Qwen-thinking, …). Niet hetzelfde als “denken tonen” in Desktop. |
| **Ontsleutelen van `encrypted_content`**              | **Onmogelijk.** Privé-redeneringsblobs van OpenAI/Codex zijn ondoorzichtig. OmniRoute ontsleutelt ze nooit (#7095 / #7176 / #7304).        |

## Zichtbaar denkproces (Codex-/Responses-clients)

Om een client de tekst van het denkproces te laten weergeven, hebt u **alles** van het volgende nodig:

1. Thinking Budget-modus = **`passthrough`** (of custom/adaptive waarbij samenvattingsverzoeken voldoende intact blijven voor het pad dat u gebruikt).
2. De client vraagt om een samenvatting, bijvoorbeeld Codex `model_reasoning_summary = "detailed"` / `auto` (niet `none`).
3. Upstream streamt daadwerkelijk `response.reasoning_summary_text.*` (of een niet-lege `reasoning.summary` op het item).

Als u alleen „versleutelde privéredenering” krijgt, geldt een van de volgende situaties:

- de modus was **`auto`** (het clientverzoek werd verwijderd), of
- upstream retourneerde `encrypted_content` zonder samenvattingstekst (beperking van de provider; OmniRoute kan alleen een tijdelijke aanduiding tonen, geen platte tekst).

## API-voorbeelden

```bash
# Uitlezen
curl -sS https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN"

# Aanbevolen voor zichtbaarheid van het denkproces in Codex / Desktop
curl -sS -X PUT https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"passthrough","customBudget":10240,"effortLevel":"medium"}'
```

Schema (`updateThinkingBudgetSchema`): `mode` ∈ `passthrough|auto|custom|adaptive`; optioneel `customBudget`, `effortLevel`, `baseBudget`, `complexityMultiplier`.

### Persistentie / opnieuw opstarten

De waarde wordt opgeslagen onder de instellingssleutel `thinkingBudget` en bij het starten van het proces geladen (`hydrateThinkingBudgetConfig`). Nadat u deze via de database of bepaalde niet-API-paden hebt gewijzigd, moet u **het OmniRoute-proces opnieuw starten**, zodat de singleton in het geheugen overeenkomt met de gegevens op schijf.

## Checklist voor beheerders

- [ ] Codex-/Desktop-gebruikers: modus = **passthrough**
- [ ] Laat compressie ingeschakeld als u tokens wilt besparen op **berichten**, niet door het denkproces te verwijderen
- [ ] Verwacht niet dat `auto` „meer denkproces toont”
- [ ] Samenvattingen die alleen versleuteld beschikbaar zijn, zijn gedrag van de **provider**; passthrough kan ze niet ontsleutelen

## Gerelateerde documentatie

- [REASONING_REPLAY.md](../routing/REASONING_REPLAY.md) — cache voor `reasoning_content` over meerdere beurten
- [USER_GUIDE.md](./USER_GUIDE.md) — tabbladen van het instellingendashboard
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — instellingseindpunten
