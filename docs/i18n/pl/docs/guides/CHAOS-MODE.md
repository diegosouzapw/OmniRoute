# Chaos Mode (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Panel:** **Tryb Chaos** (pasek boczny) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (sesja panelu) · `POST /api/skills/collect/chaos` (klucz API)  
> **Źródło:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

Tryb Chaos wysyła **jedno zadanie jednocześnie do kilku dostawców** — każdy uczestniczący dostawca
udostępnia jedną instancję modelu, a wszystkie odpowiedzi otrzymujesz obok siebie (lub w łańcuchu).
Jest to mechanizm wykonywania wielomodelowego, a nie strategia routingu: nie ma on żadnego wpływu
na zwykły ruch `/v1/chat/completions`.

**Uściślenie — produkt zawiera trzy różne funkcje ze słowem „chaos” w nazwie:**

| Element                       | Czym jest                                                                                                                               | Gdzie opisano                                |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Tryb Chaos**                | Opisana tutaj strona panelu i interfejs API: przekazuje jedno zadanie do wielu dostawców (równolegle lub zespołowo).                    | Ten przewodnik                               |
| `auto/chaos`                  | Identyfikator modelu Auto-Combo z wagami oceny wstrzykiwania błędów, przeznaczony do testowania odporności. Nie wymaga konfiguracji.    | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Konfiguracja kombinacji Chaos | Utrwalona kombinacja z `config.chaos.enabled`, która przekazuje zadanie do panelu modeli z opcjonalnym modelem oceniającym (tylko API). | `open-sse/services/autoCombo/chaosEngine.ts` |

## Konfiguracja

1. Otwórz **Panel → Tryb Chaos** (`/dashboard/chaos`).
2. **Włącz** go — Tryb Chaos jest **domyślnie wyłączony** (`enabled: false` w
   `src/lib/chaos/chaosConfig.ts`). Gdy jest wyłączony, `POST /api/chaos/run` zwraca
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Wybierz uczestników i wartości domyślne (utrwalane dla każdej instancji za pośrednictwem magazynu ustawień):

   | Pole                | Znaczenie                                                                              | Wartość domyślna / limity                 |
   | ------------------- | -------------------------------------------------------------------------------------- | ----------------------------------------- |
   | `enabled`           | Przełącznik główny                                                                     | `false`                                   |
   | `defaultMode`       | `parallel` lub `collaborative` (patrz niżej)                                           | `parallel`                                |
   | `providerOverrides` | Uczestnictwo poszczególnych dostawców (`providerId`, opcjonalnie `modelId`, `enabled`) | puste = każdy aktywny dostawca, maks. 200 |
   | `systemPrompt`      | Zastąpienie wbudowanego promptu systemowego Chaos                                      | opcjonalne, maks. 10 000 znaków           |
   | `timeoutMs`         | Maksymalny czas każdego wywołania modelu                                               | `120000` (5 000–600 000)                  |
   | `maxTokens`         | `max_tokens` dla każdego wywołania modelu                                              | `4096` (256–128 000)                      |

4. Uruchom **test bezpośrednio na stronie** — panel wyników pokaże odpowiedź,
   status i czas wykonania każdego dostawcy.

## Tryby wykonywania

- **`parallel`** — każdy model otrzymuje jednocześnie to samo zadanie; wszystkie odpowiedzi są
  zwracane niezależnie.
- **`collaborative`** — modele działają **w łańcuchu**: każdy z nich widzi wynik poprzedniego modelu
  i otrzymuje polecenie jego dopracowania, rozszerzenia, skrytykowania lub zaproponowania alternatywy. Pole `summary`
  odpowiedzi łączy pomyślne wyniki w kolejności łańcucha (wykonania równoległe nie mają pola `summary`).

## API

### `POST /api/chaos/run` — sesja panelu

Uwierzytelnianie za pomocą plików cookie (sesja zarządzania — patrz
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); używane przez stronę panelu.

```jsonc
// treść żądania
{
  "task": "Compare approaches to X", // wymagane
  "providers": ["glm", "kimi"], // opcjonalny filtr
  "mode": "parallel", // opcjonalne — zastępuje defaultMode
  "systemPrompt": "…", // opcjonalne zastąpienie
  "maxTokens": 4096, // opcjonalne zastąpienie
}
```

### `POST /api/skills/collect/chaos` — klucz API

Wariant wykorzystujący token Bearer, przeznaczony dla klientów zewnętrznych. Klucz musi mieć
**uprawnienie Trybu Chaos** (`chaosModeEnabled`), które jest **domyślnie wyłączone** — włącz je osobno dla każdego klucza w
**Panel → Menedżer API → edytuj klucz → uprawnienia → Tryb Chaos**. Treść żądania jest taka sama jak powyżej.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Oba punkty końcowe zwracają dane w tym samym formacie:

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
  "summary": "…", // tylko w trybie collaborative
}
```

## Rozwiązywanie problemów

- **`400 Chaos Mode is not enabled`** — patrz krok 2 powyżej: przełącznik globalny jest wyłączony.
- **Klucz API jest odrzucany przez `/api/skills/collect/chaos`** — klucz nie ma uprawnienia
  `chaosModeEnabled` (domyślnie wyłączonego; jest to ustawienie, a nie błąd).
- **W wynikach brakuje oczekiwanego dostawcy** — sprawdź `providerOverrides` na stronie
  Trybu Chaos (wyłączone zastąpienie powoduje jego wykluczenie) oraz upewnij się, że połączenie z dostawcą
  jest aktywne.
