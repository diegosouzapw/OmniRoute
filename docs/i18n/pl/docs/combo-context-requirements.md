# Funkcja wymagań kontekstu combo (Context Requirements)

## Przegląd

Funkcja Context Requirements pozwala konfiguracjom combo filtrować i sortować cele (targets) na podstawie rozmiaru okna kontekstu. Jest to przydatne w przypadkach użycia wymagających dużych okien kontekstu, takich jak:

- Przetwarzanie długich dokumentów (100k+ tokenów)
- Analiza dużych baz kodu
- Rozbudowane historie rozmów
- Przeglądy kodu obejmujące wiele plików

## Konfiguracja

### Schemat

Dodaj `contextRequirements` do runtime config swojego combo:

```json
{
  "contextRequirements": {
    "minContextWindow": 128000,
    "preferLargeContext": true,
    "contextFilterMode": "strict"
  }
}
```

### Pola

#### `minContextWindow` (opcjonalne)

- **Typ**: `number` (0 do 10,000,000)
- **Domyślnie**: `undefined` (bez filtrowania)
- **Opis**: Odfiltrowuje modele z oknami kontekstu poniżej tego progu

**Przykłady**:

- `32000` - Odfiltruj modele z kontekstem <32K
- `128000` - Wymagaj kontekstu 128K+ (GPT-4 Turbo, Claude 3)
- `200000` - Wymagaj kontekstu 200K+ (Claude 3 Opus)
- `1000000` - Wymagaj kontekstu 1M+ (Gemini 1.5 Pro)

#### `preferLargeContext` (opcjonalne)

- **Typ**: `boolean`
- **Domyślnie**: `false`
- **Opis**: Gdy `true`, sortuje pozostałe cele według rozmiaru kontekstu (malejąco). Modele z dużym kontekstem są próbowane jako pierwsze.

#### `contextFilterMode` (opcjonalne)

- **Typ**: `"strict"` | `"lenient"`
- **Domyślnie**: `"lenient"`
- **Opis**: Sposób obsługi modeli z nieznanymi limitami okna kontekstu
  - `"strict"`: Wyklucza modele z nieznanymi limitami kontekstu
  - `"lenient"`: Uwzględnia modele z nieznanymi limitami kontekstu

## Zachowanie

### Potok filtrowania

Wymagania kontekstu są stosowane po `filterTargetsByRequestCompatibility()`:

1. **Filtrowanie zgodności żądania** - Usuwa modele niekompatybilne z żądaniem (tools, vision, structured output)
2. **Filtrowanie wymagań kontekstu** - Stosuje `minContextWindow` i `contextFilterMode`
3. **Sortowanie według kontekstu** - Jeśli `preferLargeContext` jest true, sortuje malejąco według rozmiaru kontekstu

### Logika trybu filtrowania

Gdy ustawiono `minContextWindow`:

**Tryb lenient** (domyślny):

- ✅ Uwzględnia modele z kontekstem >= minContextWindow
- ✅ Uwzględnia modele z nieznanymi limitami kontekstu
- ❌ Wyklucza modele z kontekstem < minContextWindow

**Tryb strict**:

- ✅ Uwzględnia modele z kontekstem >= minContextWindow
- ❌ Wyklucza modele z nieznanymi limitami kontekstu
- ❌ Wyklucza modele z kontekstem < minContextWindow

### Logika sortowania

Gdy `preferLargeContext` jest true:

- Modele są sortowane według rozmiaru okna kontekstu (malejąco)
- Modele z nieznanym kontekstem trafiają na koniec
- Oryginalna kolejność strategii służy jako rozstrzygnięcie remisów

## Przypadki użycia

### Przykład 1: Przetwarzanie długich dokumentów

```json
{
  "name": "Document Analysis",
  "strategy": "fusion",
  "config": {
    "contextRequirements": {
      "minContextWindow": 128000,
      "preferLargeContext": true,
      "contextFilterMode": "strict"
    }
  }
}
```

Ta konfiguracja:

- Wymaga okna kontekstu 128K+
- Preferuje modele z większym kontekstem (Gemini 1.5 Pro > Claude 3 Opus > GPT-4 Turbo)
- Wyklucza modele z nieznanymi limitami kontekstu

### Przykład 2: Analiza dużej bazy kodu

```json
{
  "name": "Code Review",
  "strategy": "auto",
  "config": {
    "contextRequirements": {
      "minContextWindow": 200000,
      "preferLargeContext": true,
      "contextFilterMode": "lenient"
    }
  }
}
```

Ta konfiguracja:

- Wymaga okna kontekstu 200K+
- Preferuje modele z większym kontekstem
- Uwzględnia modele z nieznanymi limitami (lenient)

### Przykład 3: Preferencja dużego kontekstu bez ścisłych wymagań

```json
{
  "name": "Flexible Chat",
  "strategy": "weighted",
  "config": {
    "contextRequirements": {
      "preferLargeContext": true
    }
  }
}
```

Ta konfiguracja:

- Brak minimalnego wymagania (wszystkie modele kwalifikują się)
- Sortuje według rozmiaru kontekstu (największy najpierw)
- Przydatne, gdy duży kontekst jest preferowany, ale nie wymagany

## Odpowiedź API

Gdy wymagania kontekstu filtrują cele, logger combo wypisuje:

```
[COMBO] Context requirements: filtered 10 → 3 targets (minContextWindow: 128000, mode: strict)
[COMBO] Context requirements: kept models gemini-1.5-pro, claude-3-opus-20240229, gpt-4-turbo
[COMBO] Context requirements: sorted by context size (descending): gemini-1.5-pro(1000000), claude-3-opus-20240229(200000), gpt-4-turbo(128000)
```

## Szczegóły implementacji

### Moduł backendu

`open-sse/services/combo/contextRequirements.ts`:

- `applyContextRequirements()` - Główna funkcja filtrowania
- `getTargetContextWindow()` - Pomocnicza funkcja wyszukiwania kontekstu
- Używa `getModelContextLimit()` z `modelCapabilities.ts`

### Punkt integracji

`open-sse/services/combo.ts` linia 1187:

```typescript
orderedTargets = filterTargetsByRequestCompatibility(orderedTargets, body, log);
orderedTargets = applyContextRequirements(orderedTargets, config.contextRequirements, log);
```

### Definicja schematu

`src/shared/validation/schemas/combo.ts`:

```typescript
contextRequirements: z
  .object({
    minContextWindow: z.coerce.number().int().min(0).max(10_000_000).optional(),
    preferLargeContext: z.boolean().optional(),
    contextFilterMode: z.enum(["strict", "lenient"]).optional(),
  })
  .strict()
  .optional(),
```

## Testowanie

### Uruchamianie testów

```bash
# Unit tests (schema + logic)
npm test tests/unit/combo-context-requirements.test.ts

# Integration tests (end-to-end)
npm test tests/unit/combo/context-requirements-integration.test.ts
```

### Pokrycie testami

- Walidacja schematu: 6 testów
- Logika filtrowania: 6 testów
- Integracja: 5 testów
- **Razem**: 17/17 przechodzi ✅

## Rozwiązywanie problemów

### Wszystkie cele odfiltrowane

**Problem**: Wszystkie cele usunięte, combo zwraca „no compatible models”

**Rozwiązania**:

1. Obniż próg `minContextWindow`
2. Przełącz na tryb `"lenient"`, aby uwzględnić modele z nieznanym kontekstem
3. Usuń `minContextWindow` i używaj wyłącznie `preferLargeContext`

### Modele z nieznanym kontekstem wykluczone

**Problem**: Niestandardowe/nowe modele wykluczone, mimo że mają duży kontekst

**Rozwiązania**:

1. Przełącz na tryb `"lenient"` (domyślny)
2. Dodaj limit kontekstu modelu w `modelCapabilities.ts`
3. Usuń filtrowanie kontekstu i polegaj na kolejności strategii

### Sortowanie nie jest stosowane

**Problem**: `preferLargeContext` nie zmienia kolejności

**Sprawdź**:

1. Zweryfikuj `preferLargeContext: true` w config
2. Sprawdź, czy wszystkie cele mają nieznany kontekst (wszystkie sortują się równo)
3. Upewnij się, że po filtrowaniu pozostało wiele celów

## Powiązane

- [Strategie routingu Auto-Combo](./routing/AUTO-COMBO.md)
- [Przewodnik po odporności (Resilience)](./architecture/RESILIENCE_GUIDE.md)

## Historia wersji

- **v3.8.47**: Pierwsza implementacja
  - Dodano config `contextRequirements`
  - Utworzono backendowy moduł filtrowania
  - Pełne pokrycie testami (brak jeszcze dedykowanego UI w dashboardzie — konfiguracja przez combo JSON)
