# Thinking Budget (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/THINKING_BUDGET.md) · 🇪🇹 [am](../../../am/docs/guides/THINKING_BUDGET.md) · 🇸🇦 [ar](../../../ar/docs/guides/THINKING_BUDGET.md) · 🇦🇿 [az](../../../az/docs/guides/THINKING_BUDGET.md) · 🇧🇬 [bg](../../../bg/docs/guides/THINKING_BUDGET.md) · 🇧🇩 [bn](../../../bn/docs/guides/THINKING_BUDGET.md) · 🇧🇦 [bs](../../../bs/docs/guides/THINKING_BUDGET.md) · 🇩🇰 [da](../../../da/docs/guides/THINKING_BUDGET.md) · 🇩🇪 [de](../../../de/docs/guides/THINKING_BUDGET.md) · 🇬🇷 [el](../../../el/docs/guides/THINKING_BUDGET.md) · 🇪🇸 [es](../../../es/docs/guides/THINKING_BUDGET.md) · 🇪🇪 [et](../../../et/docs/guides/THINKING_BUDGET.md) · 🇮🇷 [fa](../../../fa/docs/guides/THINKING_BUDGET.md) · 🇫🇮 [fi](../../../fi/docs/guides/THINKING_BUDGET.md) · 🇫🇷 [fr](../../../fr/docs/guides/THINKING_BUDGET.md) · 🇮🇪 [ga](../../../ga/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [gu](../../../gu/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ha](../../../ha/docs/guides/THINKING_BUDGET.md) · 🇮🇱 [he](../../../he/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [hi](../../../hi/docs/guides/THINKING_BUDGET.md) · 🇭🇷 [hr](../../../hr/docs/guides/THINKING_BUDGET.md) · 🇭🇺 [hu](../../../hu/docs/guides/THINKING_BUDGET.md) · 🇦🇲 [hy](../../../hy/docs/guides/THINKING_BUDGET.md) · 🇮🇩 [id](../../../id/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ig](../../../ig/docs/guides/THINKING_BUDGET.md) · 🇮🇹 [it](../../../it/docs/guides/THINKING_BUDGET.md) · 🇯🇵 [ja](../../../ja/docs/guides/THINKING_BUDGET.md) · 🇬🇪 [ka](../../../ka/docs/guides/THINKING_BUDGET.md) · 🇰🇭 [km](../../../km/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [kn](../../../kn/docs/guides/THINKING_BUDGET.md) · 🇰🇷 [ko](../../../ko/docs/guides/THINKING_BUDGET.md) · 🇱🇹 [lt](../../../lt/docs/guides/THINKING_BUDGET.md) · 🇱🇻 [lv](../../../lv/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ml](../../../ml/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [mr](../../../mr/docs/guides/THINKING_BUDGET.md) · 🇲🇾 [ms](../../../ms/docs/guides/THINKING_BUDGET.md) · 🇲🇹 [mt](../../../mt/docs/guides/THINKING_BUDGET.md) · 🇲🇲 [my](../../../my/docs/guides/THINKING_BUDGET.md) · 🇳🇵 [ne](../../../ne/docs/guides/THINKING_BUDGET.md) · 🇳🇱 [nl](../../../nl/docs/guides/THINKING_BUDGET.md) · 🇳🇴 [no](../../../no/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [or](../../../or/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [pa](../../../pa/docs/guides/THINKING_BUDGET.md) · 🇵🇭 [phi](../../../phi/docs/guides/THINKING_BUDGET.md) · 🇵🇱 [pl](../../../pl/docs/guides/THINKING_BUDGET.md) · 🇵🇹 [pt](../../../pt/docs/guides/THINKING_BUDGET.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/THINKING_BUDGET.md) · 🇷🇴 [ro](../../../ro/docs/guides/THINKING_BUDGET.md) · 🇷🇺 [ru](../../../ru/docs/guides/THINKING_BUDGET.md) · 🇱🇰 [si](../../../si/docs/guides/THINKING_BUDGET.md) · 🇸🇰 [sk](../../../sk/docs/guides/THINKING_BUDGET.md) · 🇸🇮 [sl](../../../sl/docs/guides/THINKING_BUDGET.md) · 🇷🇸 [sr](../../../sr/docs/guides/THINKING_BUDGET.md) · 🇸🇪 [sv](../../../sv/docs/guides/THINKING_BUDGET.md) · 🇰🇪 [sw](../../../sw/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ta](../../../ta/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [te](../../../te/docs/guides/THINKING_BUDGET.md) · 🇹🇭 [th](../../../th/docs/guides/THINKING_BUDGET.md) · 🇹🇷 [tr](../../../tr/docs/guides/THINKING_BUDGET.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/THINKING_BUDGET.md) · 🇵🇰 [ur](../../../ur/docs/guides/THINKING_BUDGET.md) · 🇺🇿 [uz](../../../uz/docs/guides/THINKING_BUDGET.md) · 🇻🇳 [vi](../../../vi/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [yo](../../../yo/docs/guides/THINKING_BUDGET.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/THINKING_BUDGET.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/THINKING_BUDGET.md)

---

> **Dashboard:** Nastavení → **AI** → Rozpočet přemýšlení  
> **API:** `GET` / `PUT` `/api/settings/thinking-budget`  
> **Zdroj:** `open-sse/services/thinkingBudget.ts`

Rozpočet přemýšlení určuje, zda OmniRoute **přepisuje klientské parametry přemýšlení/uvažování** při předávání poskytovatelům. **Nezapíná ani nevypíná** kompresi, směrování ani mezipaměť promptů.

## Režimy

| Režim                       | Co OmniRoute dělá                                                                                                      | Kdy použít                                                                                                                                                                  |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`passthrough`** (výchozí) | Ponechá klientská pole beze změny (`reasoning`, `reasoning_effort`, Claude `thinking`, Gemini `thinking_config` atd.). | **Codex / Desktop / jakýkoli klient, který má řídit míru úsilí a souhrny uvažování.** Vyžadováno pro viditelné panely přemýšlení, když klient požaduje `reasoning.summary`. |
| **`auto`**                  | Před odesláním upstreamu z těla požadavku **odstraní všechna** pole přemýšlení/uvažování.                              | Pouze pokud záměrně chcete, aby výchozí hodnoty vytvořil **poskytovatel**, a nepotřebujete přemýšlení řízené klientem. **Neznamená** „automaticky zobrazit přemýšlení“.     |
| **`custom`**                | Přepíše každý požadavek pevným rozpočtem tokenů pro přemýšlení.                                                        | Pevný limit tokenů přemýšlení pro veškerý provoz.                                                                                                                           |
| **`adaptive`**              | Škáluje rozpočet od základní míry úsilí podle počtu zpráv, nástrojů a délky promptu.                                   | Flexibilní řízení tokenů bez úplného odstranění záměru klienta.                                                                                                             |

### Co režim `auto` odstraňuje

Když je aktivní režim `auto`, funkce `stripThinkingConfig()` odstraní mimo jiné:

- OpenAI / Responses: `reasoning`, `reasoning_effort`
- Claude: `thinking` a také `output_config.effort`, pokud je přítomno
- Gemini: `generationConfig.thinking_config` / `thinkingConfig`

Pokud klient (např. Codex Desktop) odeslal `reasoning: { effort: "ultra", summary: "detailed" }`, režim **auto tento objekt odstraní**. Upstream může nadále účtovat některé tokeny uvažování, ale často vrátí **prázdné nebo pouze zašifrované** položky uvažování — uživatelské rozhraní proto nezobrazí žádný užitečný proud přemýšlení.

## Co to **není**

| Funkce                                         | Vztah                                                                                                                                                                  |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Komprese** (Caveman, RTK, skládaná, …)       | Samostatná pipeline. Funguje ve všech režimech rozpočtu přemýšlení.                                                                                                    |
| **Promptová / sémantická mezipaměť**           | Samostatná. Režim rozpočtu přemýšlení ji neovlivňuje.                                                                                                                  |
| **Kombinované směrování / záložní varianty**   | Samostatné. Neovlivněno.                                                                                                                                               |
| **Limity tokenů API klíčů / rozpočty nákladů** | Samostatné. Neovlivněno.                                                                                                                                               |
| **Mezipaměť opakovaného přehrávání uvažování** | Opětovné vložení ve vícekolových konverzacích pro striktní poskytovatele (DeepSeek, Kimi, Qwen-thinking, …). Není totéž jako „zobrazit přemýšlení“ v aplikaci Desktop. |
| **Dešifrování `encrypted_content`**            | **Nemožné.** Soukromé bloky uvažování OpenAI/Codex jsou neprůhledné. OmniRoute je nikdy nedešifruje (#7095 / #7176 / #7304).                                           |

## Viditelné uvažování (klienti Codex / Responses)

Aby klient zobrazil text uvažování, je nutné splnit **všechny** následující podmínky:

1. Režim Thinking Budget = **`passthrough`** (nebo vlastní/adaptivní režim, který ponechá požadavky na souhrn dostatečně nezměněné pro používanou cestu).
2. Klient požaduje souhrn, např. Codex `model_reasoning_summary = "detailed"` / `auto` (nikoli `none`).
3. Nadřazená služba skutečně streamuje `response.reasoning_summary_text.*` (nebo položka obsahuje neprázdné `reasoning.summary`).

Pokud získáte pouze „šifrované soukromé uvažování“, pak buď:

- byl použit režim **`auto`** (požadavek klienta byl odstraněn), nebo
- nadřazená služba vrátila `encrypted_content` bez textu souhrnu (omezení poskytovatele; OmniRoute může zobrazit pouze zástupný text, nikoli prostý text).

## Příklady API

```bash
# Načtení
curl -sS https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN"

# Doporučeno pro viditelnost uvažování v Codexu / Desktopu
curl -sS -X PUT https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"passthrough","customBudget":10240,"effortLevel":"medium"}'
```

Schéma (`updateThinkingBudgetSchema`): `mode` ∈ `passthrough|auto|custom|adaptive`; volitelné položky `customBudget`, `effortLevel`, `baseBudget`, `complexityMultiplier`.

### Trvalé uložení / restart

Hodnota je uložena pod klíčem nastavení `thinkingBudget` a načtena při spuštění procesu (`hydrateThinkingBudgetConfig`). Po změně prostřednictvím databáze nebo některých cest mimo API **restartujte proces OmniRoute**, aby instance singletonu v paměti odpovídala datům na disku.

## Kontrolní seznam operátora

- [ ] Uživatelé Codexu / Desktopu: režim = **passthrough**
- [ ] Chcete-li ušetřit tokeny u **zpráv**, ponechte kompresi zapnutou, místo abyste odstraňovali uvažování
- [ ] Neočekávejte, že režim `auto` „zobrazí více uvažování“
- [ ] Souhrny dostupné pouze v šifrované podobě jsou vlastností **poskytovatele**; režim passthrough je nedokáže dešifrovat

## Související dokumentace

- [REASONING_REPLAY.md](../routing/REASONING_REPLAY.md) — mezipaměť `reasoning_content` pro vícekolové konverzace
- [USER_GUIDE.md](./USER_GUIDE.md) — karty řídicího panelu nastavení
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — koncové body nastavení
