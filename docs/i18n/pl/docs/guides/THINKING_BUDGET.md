# Thinking Budget (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/THINKING_BUDGET.md) · 🇪🇹 [am](../../../am/docs/guides/THINKING_BUDGET.md) · 🇸🇦 [ar](../../../ar/docs/guides/THINKING_BUDGET.md) · 🇦🇿 [az](../../../az/docs/guides/THINKING_BUDGET.md) · 🇧🇬 [bg](../../../bg/docs/guides/THINKING_BUDGET.md) · 🇧🇩 [bn](../../../bn/docs/guides/THINKING_BUDGET.md) · 🇧🇦 [bs](../../../bs/docs/guides/THINKING_BUDGET.md) · 🇨🇿 [cs](../../../cs/docs/guides/THINKING_BUDGET.md) · 🇩🇰 [da](../../../da/docs/guides/THINKING_BUDGET.md) · 🇩🇪 [de](../../../de/docs/guides/THINKING_BUDGET.md) · 🇬🇷 [el](../../../el/docs/guides/THINKING_BUDGET.md) · 🇪🇸 [es](../../../es/docs/guides/THINKING_BUDGET.md) · 🇪🇪 [et](../../../et/docs/guides/THINKING_BUDGET.md) · 🇮🇷 [fa](../../../fa/docs/guides/THINKING_BUDGET.md) · 🇫🇮 [fi](../../../fi/docs/guides/THINKING_BUDGET.md) · 🇫🇷 [fr](../../../fr/docs/guides/THINKING_BUDGET.md) · 🇮🇪 [ga](../../../ga/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [gu](../../../gu/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ha](../../../ha/docs/guides/THINKING_BUDGET.md) · 🇮🇱 [he](../../../he/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [hi](../../../hi/docs/guides/THINKING_BUDGET.md) · 🇭🇷 [hr](../../../hr/docs/guides/THINKING_BUDGET.md) · 🇭🇺 [hu](../../../hu/docs/guides/THINKING_BUDGET.md) · 🇦🇲 [hy](../../../hy/docs/guides/THINKING_BUDGET.md) · 🇮🇩 [id](../../../id/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [ig](../../../ig/docs/guides/THINKING_BUDGET.md) · 🇮🇹 [it](../../../it/docs/guides/THINKING_BUDGET.md) · 🇯🇵 [ja](../../../ja/docs/guides/THINKING_BUDGET.md) · 🇬🇪 [ka](../../../ka/docs/guides/THINKING_BUDGET.md) · 🇰🇭 [km](../../../km/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [kn](../../../kn/docs/guides/THINKING_BUDGET.md) · 🇰🇷 [ko](../../../ko/docs/guides/THINKING_BUDGET.md) · 🇱🇹 [lt](../../../lt/docs/guides/THINKING_BUDGET.md) · 🇱🇻 [lv](../../../lv/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ml](../../../ml/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [mr](../../../mr/docs/guides/THINKING_BUDGET.md) · 🇲🇾 [ms](../../../ms/docs/guides/THINKING_BUDGET.md) · 🇲🇹 [mt](../../../mt/docs/guides/THINKING_BUDGET.md) · 🇲🇲 [my](../../../my/docs/guides/THINKING_BUDGET.md) · 🇳🇵 [ne](../../../ne/docs/guides/THINKING_BUDGET.md) · 🇳🇱 [nl](../../../nl/docs/guides/THINKING_BUDGET.md) · 🇳🇴 [no](../../../no/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [or](../../../or/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [pa](../../../pa/docs/guides/THINKING_BUDGET.md) · 🇵🇭 [phi](../../../phi/docs/guides/THINKING_BUDGET.md) · 🇵🇹 [pt](../../../pt/docs/guides/THINKING_BUDGET.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/THINKING_BUDGET.md) · 🇷🇴 [ro](../../../ro/docs/guides/THINKING_BUDGET.md) · 🇷🇺 [ru](../../../ru/docs/guides/THINKING_BUDGET.md) · 🇱🇰 [si](../../../si/docs/guides/THINKING_BUDGET.md) · 🇸🇰 [sk](../../../sk/docs/guides/THINKING_BUDGET.md) · 🇸🇮 [sl](../../../sl/docs/guides/THINKING_BUDGET.md) · 🇷🇸 [sr](../../../sr/docs/guides/THINKING_BUDGET.md) · 🇸🇪 [sv](../../../sv/docs/guides/THINKING_BUDGET.md) · 🇰🇪 [sw](../../../sw/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [ta](../../../ta/docs/guides/THINKING_BUDGET.md) · 🇮🇳 [te](../../../te/docs/guides/THINKING_BUDGET.md) · 🇹🇭 [th](../../../th/docs/guides/THINKING_BUDGET.md) · 🇹🇷 [tr](../../../tr/docs/guides/THINKING_BUDGET.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/THINKING_BUDGET.md) · 🇵🇰 [ur](../../../ur/docs/guides/THINKING_BUDGET.md) · 🇺🇿 [uz](../../../uz/docs/guides/THINKING_BUDGET.md) · 🇻🇳 [vi](../../../vi/docs/guides/THINKING_BUDGET.md) · 🇳🇬 [yo](../../../yo/docs/guides/THINKING_BUDGET.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/THINKING_BUDGET.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/THINKING_BUDGET.md)

---

> **Panel:** Ustawienia → **AI** → Budżet rozumowania  
> **API:** `GET` / `PUT` `/api/settings/thinking-budget`  
> **Źródło:** `open-sse/services/thinkingBudget.ts`

Budżet rozumowania określa, czy OmniRoute **modyfikuje parametry myślenia/rozumowania klienta** przed przekazaniem żądań do dostawców. **Nie** włącza ani nie wyłącza kompresji, routingu czy pamięci podręcznej promptów.

## Tryby

| Tryb                         | Działanie OmniRoute                                                                                                    | Kiedy używać                                                                                                                                                                                |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`passthrough`** (domyślny) | Pozostawia pola klienta bez zmian (`reasoning`, `reasoning_effort`, `thinking` Claude, `thinking_config` Gemini itp.). | **Codex / Desktop / każdy klient, który powinien kontrolować poziom wysiłku i podsumowania rozumowania.** Wymagany do wyświetlania paneli myślenia, gdy klient żąda `reasoning.summary`.    |
| **`auto`**                   | **Usuwa wszystkie** pola myślenia/rozumowania z treści żądania przed przekazaniem go do dostawcy nadrzędnego.          | Tylko wtedy, gdy celowo chcesz, aby **dostawca** ustalił wartości domyślne, i **nie** potrzebujesz myślenia kontrolowanego przez klienta. **Nie** oznacza „automatycznie pokazuj myślenie”. |
| **`custom`**                 | Nadpisuje każde żądanie stałym budżetem tokenów myślenia.                                                              | Sztywny limit tokenów myślenia dla całego ruchu.                                                                                                                                            |
| **`adaptive`**               | Skaluje budżet na podstawie bazowego poziomu wysiłku, wykorzystując liczbę wiadomości, narzędzia i długość promptu.    | Elastyczna kontrola tokenów bez całkowitego usuwania intencji klienta.                                                                                                                      |

### Co usuwa tryb `auto`

Gdy aktywny jest tryb `auto`, funkcja `stripThinkingConfig()` usuwa między innymi:

- OpenAI / Responses: `reasoning`, `reasoning_effort`
- Claude: `thinking` oraz `output_config.effort`, jeśli występuje
- Gemini: `generationConfig.thinking_config` / `thinkingConfig`

Jeśli klient (np. Codex Desktop) wysłał `reasoning: { effort: "ultra", summary: "detailed" }`, tryb **auto usuwa ten obiekt**. Dostawca nadrzędny może nadal naliczać opłaty za niektóre tokeny rozumowania, ale często zwraca **puste lub wyłącznie zaszyfrowane** elementy rozumowania — dlatego interfejs użytkownika nie pokazuje użytecznego strumienia myślenia.

## Czym to **nie jest**

| Funkcja                                         | Zależność                                                                                                                                                 |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Kompresja** (Caveman, RTK, stacked, …)        | Oddzielny potok. Działa w każdym trybie budżetu rozumowania.                                                                                              |
| **Pamięć podręczna promptów / semantyczna**     | Oddzielna funkcja. Tryb budżetu rozumowania nie ma na nią wpływu.                                                                                         |
| **Routing kombinowany / mechanizmy awaryjne**   | Oddzielna funkcja. Bez wpływu.                                                                                                                            |
| **Limity tokenów klucza API / budżety kosztów** | Oddzielna funkcja. Bez wpływu.                                                                                                                            |
| **Pamięć podręczna odtwarzania rozumowania**    | Ponowne wstrzykiwanie w wielu turach dla restrykcyjnych dostawców (DeepSeek, Kimi, Qwen-thinking, …). To nie to samo co opcja „pokaż myślenie” w Desktop. |
| **Odszyfrowywanie `encrypted_content`**         | **Niemożliwe.** Prywatne bloby rozumowania OpenAI/Codex są nieprzezroczyste. OmniRoute nigdy ich nie odszyfrowuje (#7095 / #7176 / #7304).                |

## Widoczne rozumowanie (klienci Codex / Responses)

Aby klient wyświetlał tekst rozumowania, muszą być spełnione **wszystkie** poniższe warunki:

1. Tryb Thinking Budget = **`passthrough`** (lub niestandardowy/adaptacyjny, który zachowuje żądania podsumowania w stopniu wystarczającym dla używanej ścieżki).
2. Klient żąda podsumowania, np. Codex `model_reasoning_summary = "detailed"` / `auto` (nie `none`).
3. Usługa nadrzędna faktycznie przesyła strumieniowo `response.reasoning_summary_text.*` (lub niepuste `reasoning.summary` w elemencie).

Jeśli otrzymujesz tylko „zaszyfrowane prywatne rozumowanie”, oznacza to, że:

- użyto trybu **`auto`** (żądanie klienta zostało usunięte) albo
- usługa nadrzędna zwróciła `encrypted_content` bez tekstu podsumowania (ograniczenie dostawcy; OmniRoute może wyświetlić jedynie symbol zastępczy, a nie zwykły tekst).

## Przykłady API

```bash
# Odczyt
curl -sS https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN"

# Zalecane ustawienie widoczności rozumowania w Codex / Desktop
curl -sS -X PUT https://localhost:20128/api/settings/thinking-budget \
  -H "Authorization: Bearer $OMNIROUTE_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"mode":"passthrough","customBudget":10240,"effortLevel":"medium"}'
```

Schemat (`updateThinkingBudgetSchema`): `mode` ∈ `passthrough|auto|custom|adaptive`; opcjonalnie `customBudget`, `effortLevel`, `baseBudget`, `complexityMultiplier`.

### Trwałość / ponowne uruchomienie

Wartość jest przechowywana pod kluczem ustawień `thinkingBudget` i wczytywana podczas uruchamiania procesu (`hydrateThinkingBudgetConfig`). Po zmianie za pośrednictwem bazy danych lub niektórych ścieżek innych niż API **uruchom ponownie proces OmniRoute**, aby stan singletonu w pamięci odpowiadał danym na dysku.

## Lista kontrolna operatora

- [ ] Użytkownicy Codex / Desktop: tryb = **passthrough**
- [ ] Kompresja pozostaje włączona, jeśli chcesz oszczędzać tokeny w **wiadomościach**, a nie poprzez usuwanie rozumowania
- [ ] Nie oczekuj, że `auto` będzie „pokazywać więcej rozumowania”
- [ ] Podsumowania dostępne wyłącznie w formie zaszyfrowanej są zachowaniem **dostawcy**; tryb passthrough nie może ich odszyfrować

## Powiązana dokumentacja

- [REASONING_REPLAY.md](../routing/REASONING_REPLAY.md) — pamięć podręczna wieloturowego `reasoning_content`
- [USER_GUIDE.md](./USER_GUIDE.md) — karty panelu ustawień
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — punkty końcowe ustawień
