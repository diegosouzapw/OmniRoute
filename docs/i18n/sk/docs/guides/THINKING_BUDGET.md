# Thinking Budget (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/THINKING_BUDGET.md) · 🇪🇹 [am](../../../am/docs/guides/THINKING_BUDGET.md) · 🇸🇦 [ar](../../../ar/docs/guides/THINKING_BUDGET.md) · 🇦🇿 [az](../../../az/docs/guides/THINKING_BUDGET.md) · 🇧🇬 [bg](../../../bg/docs/guides/THINKING_BUDGET.md) · 🇧🇩 [bn](../../../bn/docs/guides/THINKING_BUDGET.md) · 🇨🇿 [cs](../../../cs/docs/guides/THINKING_BUDGET.md) · 🇩🇰 [da](../../../da/docs/guides/THINKING_BUDGET.md) · 🇩🇪 [de](../../../de/docs/guides/THINKING_BUDGET.md) · 🇬🇷 [el](../../../el/docs/guides/THINKING_BUDGET.md) · 🇪🇸 [es](../../../es/docs/guides/THINKING_BUDGET.md) · 🇪🇪 [et](../../../et/docs/guides/THINKING_BUDGET.md) · 🇮🇷 [fa](../../../fa/docs/guides/THINKING_BUDGET.md) · 🇫🇮 [fi](../../../fi/docs/guides/THINKING_BUDGET.md) · 🇫🇷 [fr](../../../fr/docs/guides/THINKING_BUDGET.md) · 🇮🇪 [ga](../../../ga/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [gu](../../../gu/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ha](../../../ha/docs/guides/THINKING_BUDGET.md) · 🇮🇱 [he](../../../he/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [hi](../../../hi/docs/guides/THINKING_BUDGET.md) · 🇭🇷 [hr](../../../hr/docs/guides/THINKING_BUDGET.md) · 🇭🇺 [hu](../../../hu/docs/guides/THINKING_BUDGET.md) · 🇦🇲 [hy](../../../hy/docs/guides/THINKING_BUDGET.md) · 🇮🇩 [id](../../../id/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ig](../../../ig/docs/guides/THINKING_BUDGET.md) · 🇮🇹 [it](../../../it/docs/guides/THINKING_BUDGET.md) · 🇯🇵 [ja](../../../ja/docs/guides/THINKING_BUDGET.md) · 🇬🇪 [ka](../../../ka/docs/guides/THINKING_BUDGET.md) · 🇰🇭 [km](../../../km/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [kn](../../../kn/docs/guides/THINKING_BUDGET.md) · 🇰🇷 [ko](../../../ko/docs/guides/THINKING_BUDGET.md) · 🇱🇹 [lt](../../../lt/docs/guides/THINKING_BUDGET.md) · 🇱🇻 [lv](../../../lv/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ml](../../../ml/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [mr](../../../mr/docs/guides/THINKING_BUDGET.md) · 🇲🇾 [ms](../../../ms/docs/guides/THINKING_BUDGET.md) · 🇲🇹 [mt](../../../mt/docs/guides/THINKING_BUDGET.md) · 🇲🇲 [my](../../../my/docs/guides/THINKING_BUDGET.md) · 🇳🇵 [ne](../../../ne/docs/guides/THINKING_BUDGET.md) · 🇳🇱 [nl](../../../nl/docs/guides/THINKING_BUDGET.md) · 🇳🇴 [no](../../../no/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [or](../../../or/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [pa](../../../pa/docs/guides/THINKING_BUDGET.md) · 🇵🇭 [phi](../../../phi/docs/guides/THINKING_BUDGET.md) · 🇵🇱 [pl](../../../pl/docs/guides/THINKING_BUDGET.md) · 🇵🇹 [pt](../../../pt/docs/guides/THINKING_BUDGET.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/THINKING_BUDGET.md) · 🇷🇴 [ro](../../../ro/docs/guides/THINKING_BUDGET.md) · 🇷🇺 [ru](../../../ru/docs/guides/THINKING_BUDGET.md) · 🇱🇰 [si](../../../si/docs/guides/THINKING_BUDGET.md) · 🇸🇮 [sl](../../../sl/docs/guides/THINKING_BUDGET.md) · 🇷🇸 [sr](../../../sr/docs/guides/THINKING_BUDGET.md) · 🇸🇪 [sv](../../../sv/docs/guides/THINKING_BUDGET.md) · 🇰🇪 [sw](../../../sw/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ta](../../../ta/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [te](../../../te/docs/guides/THINKING_BUDGET.md) · 🇹🇭 [th](../../../th/docs/guides/THINKING_BUDGET.md) · 🇹🇷 [tr](../../../tr/docs/guides/THINKING_BUDGET.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/THINKING_BUDGET.md) · 🇵🇰 [ur](../../../ur/docs/guides/THINKING_BUDGET.md) · 🇺🇿 [uz](../../../uz/docs/guides/THINKING_BUDGET.md) · 🇻🇳 [vi](../../../vi/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [yo](../../../yo/docs/guides/THINKING_BUDGET.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/THINKING_BUDGET.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/THINKING_BUDGET.md)

---

> **Ovládací panel:** Nastavenia → **AI** → Rozpočet na premýšľanie  
> **API:** `GET` / `PUT` `/api/settings/thinking-budget`  
> **Zdroj:** `open-sse/services/thinkingBudget.ts`

Rozpočet na premýšľanie určuje, či OmniRoute **prepisuje klientske parametre premýšľania/uvažovania** pri odosielaní poskytovateľom. **Nezapína ani nevypína** kompresiu, smerovanie ani vyrovnávaciu pamäť promptov.

## Režimy

| Režim                          | Čo robí OmniRoute                                                                                                      | Kedy ho použiť                                                                                                                                                                     |
| ------------------------------ | ---------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`passthrough`** (predvolené) | Ponechá klientske polia bez zmeny (`reasoning`, `reasoning_effort`, Claude `thinking`, Gemini `thinking_config` atď.). | **Codex / Desktop / akýkoľvek klient, ktorý má riadiť úsilie a súhrny uvažovania.** Vyžaduje sa pre viditeľné panely premýšľania, keď klient požaduje `reasoning.summary`.         |
| **`auto`**                     | Pred odoslaním nadradenému poskytovateľovi **odstráni všetky** polia premýšľania/uvažovania z tela požiadavky.         | Iba vtedy, keď zámerne chcete, aby **poskytovateľ** určil predvolené hodnoty, a nepotrebujete premýšľanie riadené klientom. **Neznamená to** „automaticky zobrazovať premýšľanie“. |
| **`custom`**                   | Prepíše každú požiadavku pevným rozpočtom tokenov na premýšľanie.                                                      | Pevný limit tokenov na premýšľanie pre všetku prevádzku.                                                                                                                           |
| **`adaptive`**                 | Škáluje rozpočet zo základnej úrovne úsilia podľa počtu správ, nástrojov a dĺžky promptu.                              | Flexibilná kontrola tokenov bez úplného odstránenia zámeru klienta.                                                                                                                |

### Čo režim `auto` odstraňuje

Keď je aktívny režim `auto`, funkcia `stripThinkingConfig()` odstraňuje okrem iného:

- OpenAI / Responses: `reasoning`, `reasoning_effort`
- Claude: `thinking` a `output_config.effort`, ak je prítomné
- Gemini: `generationConfig.thinking_config` / `thinkingConfig`

Ak klient (napr. Codex Desktop) odoslal `reasoning: { effort: "ultra", summary: "detailed" }`, režim **auto tento objekt odstráni**. Nadradený poskytovateľ môže stále účtovať niektoré tokeny uvažovania, často však vracia **prázdne alebo iba zašifrované** položky uvažovania — používateľské rozhranie preto nezobrazí žiadny užitočný prúd premýšľania.

## Čím to **nie je**

| Funkcia                                                         | Vzťah                                                                                                                                                                     |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Kompresia** (Caveman, RTK, stacked, …)                        | Samostatný kanál spracovania. Funguje v každom režime rozpočtu na premýšľanie.                                                                                            |
| **Vyrovnávacia pamäť promptov / sémantická vyrovnávacia pamäť** | Samostatná funkcia. Režim rozpočtu na premýšľanie ju neovplyvňuje.                                                                                                        |
| **Kombinované smerovanie / záložné trasy**                      | Samostatná funkcia. Nie je ovplyvnená.                                                                                                                                    |
| **Limity tokenov kľúča API / rozpočty nákladov**                | Samostatná funkcia. Nie je ovplyvnená.                                                                                                                                    |
| **Vyrovnávacia pamäť opakovaného prehrávania uvažovania**       | Opätovné vloženie vo viacerých kolách pre striktných poskytovateľov (DeepSeek, Kimi, Qwen-thinking, …). Nie je to to isté ako „zobraziť premýšľanie“ v aplikácii Desktop. |
| **Dešifrovanie `encrypted_content`**                            | **Nie je možné.** Súkromné bloky uvažovania OpenAI/Codex sú nepriehľadné. OmniRoute ich nikdy nedešifruje (#7095 / #7176 / #7304).                                        |

## Viditeľné uvažovanie (klienti Codex / Responses)

Aby klient zobrazil text uvažovania, potrebujete **všetko** z nasledujúceho:

1. Režim Thinking Budget = **`passthrough`** (alebo vlastný/adaptívny režim, ktorý ponechá požiadavky na súhrn dostatočne nezmenené pre používanú cestu).
2. Klient požiada o súhrn, napr. Codex `model_reasoning_summary = "detailed"` / `auto` (nie `none`).
3. Upstream skutočne streamuje `response.reasoning_summary_text.*` (alebo položka obsahuje neprázdne `reasoning.summary`).

Ak dostávate iba „zašifrované súkromné uvažovanie“, platí jedno z nasledujúceho:

- režim bol **`auto`** (požiadavka klienta bola odstránená), alebo
- upstream vrátil `encrypted_content` bez textu súhrnu (obmedzenie poskytovateľa; OmniRoute môže zobraziť iba zástupný text, nie otvorený text).

## Príklady API

```bash
# Načítanie
curl -sS https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN"

# Odporúčané na zobrazenie uvažovania v aplikáciách Codex / Desktop
curl -sS -X PUT https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"passthrough","customBudget":10240,"effortLevel":"medium"}'
```

Schéma (`updateThinkingBudgetSchema`): `mode` ∈ `passthrough|auto|custom|adaptive`; voliteľné `customBudget`, `effortLevel`, `baseBudget`, `complexityMultiplier`.

### Perzistencia / reštart

Hodnota je uložená pod kľúčom nastavení `thinkingBudget` a načítaná pri spustení procesu (`hydrateThinkingBudgetConfig`). Po zmene prostredníctvom databázy alebo niektorých ciest mimo API **reštartujte proces OmniRoute**, aby singleton v pamäti zodpovedal údajom na disku.

## Kontrolný zoznam operátora

- [ ] Používatelia Codex / Desktop: režim = **passthrough**
- [ ] Ak chcete šetriť tokeny v **správach**, ponechajte kompresiu zapnutú; nešetrite ich odstraňovaním uvažovania
- [ ] Neočakávajte, že `auto` „zobrazí viac uvažovania“
- [ ] Súhrny dostupné iba v zašifrovanej podobe sú správaním **poskytovateľa**; passthrough ich nedokáže dešifrovať

## Súvisiaca dokumentácia

- [REASONING_REPLAY.md](../routing/REASONING_REPLAY.md) — vyrovnávacia pamäť `reasoning_content` medzi viacerými kolami
- [USER_GUIDE.md](./USER_GUIDE.md) — karty panela nastavení
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — koncové body nastavení
