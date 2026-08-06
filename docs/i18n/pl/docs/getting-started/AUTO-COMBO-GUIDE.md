# Auto-Combo: niech OmniRoute wybierze najlepsze AI za Ciebie

> **TL;DR**: Ustaw model na `auto`, a OmniRoute automatycznie wybierze najlepszego providera AI dla każdego żądania. Nie wymaga konfiguracji.

---

## Co robi

Zamiast wybierać konkretny model AI (np. GPT-4o lub Claude), możesz pozwolić OmniRoute **automatycznie wybrać najlepszy** dla każdego żądania. Bierze pod uwagę:

- **Health** — Czy provider działa w tej chwili?
- **Speed** — Jak szybko odpowiada?
- **Cost** — Ile kosztuje?
- **Quality** — Czy dobrze radzi sobie z tym typem zadania?
- **Capacity** — Czy ma jeszcze dostępny limit (quota)?

OmniRoute ocenia wszystkich podłączonych providerów i wybiera najlepszego. Jeśli ten zawiedzie, automatycznie próbuje kolejnego.

---

## Szybki start

**Krok 1**: Ustaw model na `auto` w IDE lub CLI:

```
model: "auto"
```

**Krok 2**: To wszystko! OmniRoute zajmie się resztą.

**Krok 3** (opcjonalnie): Użyj wariantu pod konkretne zadania:

```
model: "auto/coding"    # Best for code
model: "auto/fast"      # Fastest response
model: "auto/cheap"     # Cheapest option
```

---

## Którego „auto” użyć?

| Jeśli chcesz...          | Użyj           | Najlepsze do                       | Jak działa                                         |
| ------------------------ | -------------- | ---------------------------------- | -------------------------------------------------- |
| **Ogólnie najlepszy**    | `auto`         | Ogólne pytania, chat               | Równoważy szybkość, koszt i jakość                 |
| **Najlepszy do kodu**    | `auto/coding`  | Pisanie kodu, debugowanie          | Wybiera modele dobre w zadaniach programistycznych |
| **Najszybsza odpowiedź** | `auto/fast`    | Szybkie odpowiedzi, niska latencja | Priorytetem jest szybkość ponad wszystko           |
| **Najtańsza opcja**      | `auto/cheap`   | Oszczędzanie pieniędzy             | Wybiera najtańszego providera                      |
| **Najmądrzejszy model**  | `auto/smart`   | Złożone zadania                    | Najpierw jakość + eksploracja nowych modeli        |
| **Najbardziej dostępny** | `auto/offline` | Gdy providerzy są zajęci           | Wybiera providerów z największą pojemnością        |

### Przykłady

```bash
# General chat — balanced
curl http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model":"auto","messages":[{"role":"user","content":"Hello!"}]}'

# Code generation — quality-first
curl http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Write a Python function"}]}'

# Quick answer — speed-first
curl http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/fast","messages":[{"role":"user","content":"What is 2+2?"}]}'
```

---

## Jak to działa (wersja uproszczona)

Gdy wysyłasz żądanie z `model: "auto"`, OmniRoute:

1. **Przegląda wszystkich podłączonych providerów** — każdego, którego dodałeś (OpenAI, Anthropic, Google itd.)
2. **Ocenia każdego** według 5 czynników:
   - Czy działa? (health)
   - Czy ma pojemność? (quota)
   - Ile kosztuje? (price)
   - Jak szybko działa? (speed)
   - Czy dobrze radzi sobie z tym zadaniem? (quality)
3. **Wybiera najlepszego** — provider z najwyższym wynikiem dostaje Twoje żądanie
4. **Automatycznie odzyskuje się** — jeśli ten zawiedzie, OmniRoute automatycznie próbuje kolejnego

### System punktacji

Każdy provider dostaje wynik od 0 do 1. Im wyższy wynik, tym lepsze dopasowanie.

| Czynnik   | Waga | Co oznacza                                        |
| --------- | ---- | ------------------------------------------------- |
| Health    | 20%  | Czy provider działa? (stan circuit breakera)      |
| Quota     | 15%  | Czy ma jeszcze dostępną pojemność?                |
| Cost      | 15%  | Jak drogi jest? (tańszy = wyższy wynik)           |
| Speed     | 12%  | Jak szybki jest? (niższa latencja = wyższy wynik) |
| Task Fit  | 8%   | Czy dobrze radzi sobie z tym typem zadania?       |
| Stability | 5%   | Czy jest stabilny? (niski wskaźnik błędów)        |
| Tier      | 5%   | Poziom konta (Ultra > Pro > Free)                 |
| Other     | 20%  | Afinity kontekstu, gęstość połączeń itd.          |

### Jak warianty zmieniają punktację

Każdy wariant używa innych wag:

| Wariant        | Priorytet            | Kluczowe wagi                   |
| -------------- | -------------------- | ------------------------------- |
| `auto`         | Zrównoważony         | health=20%, quota=15%, cost=15% |
| `auto/coding`  | Jakość               | taskFit=37%, stability=15%      |
| `auto/fast`    | Szybkość             | latency=32%, health=28%         |
| `auto/cheap`   | Koszt                | cost=37%                        |
| `auto/smart`   | Jakość + eksploracja | taskFit=37%, exploration=10%    |
| `auto/offline` | Pojemność            | quota=37%, health=28%           |

---

## Jak obsługuje awarie

OmniRoute ma **trzy warstwy ochrony**:

### 1. Auto-Fallback

Jeśli najlepszy provider zawiedzie, OmniRoute automatycznie próbuje kolejnego. Nie musisz nic robić.

### 2. Self-Healing

Jeśli provider wciąż zawodzi:

- **Wynik < 0.2** → wykluczony na 5 minut
- **Circuit breaker open** → automatycznie wykluczony
- **Ponad 50% providerów niedostępnych** → tryb incydentu (bez eksploracji)

### 3. Emergency Fallback

Jeśli wszyscy providerzy zawiodą, OmniRoute jako ostateczność kieruje ruch do stabilnych darmowych providerów (np. Kiro lub Qoder).

---

## Obsługa wielu kont

Jeśli masz wiele kont u tego samego providera (np. dwa klucze OpenAI), OmniRoute traktuje każde jako **osobnego kandydata**. To oznacza:

- Konto A ma jeszcze quota → użyj go
- Konto B jest ograniczone rate limitem → pomiń
- Konto C jest tańsze → preferuj je

Każde konto jest oceniane niezależnie na podstawie własnego health, quota i szybkości.

---

## Eksploracja banditowa

OmniRoute od czasu do czasu **eksploruje** nowych providerów, żeby odkryć lepsze opcje:

- **Domyślnie**: 5% żądań idzie do losowych providerów
- **Auto/smart**: 10% eksploracji
- **Wyłączone**, gdy ponad 50% providerów jest niezdrowych

Dzięki temu OmniRoute uczy się, którzy providerzy najlepiej pasują do Twojego wzorca użycia.

---

## Częste pytania

### „Czy zawsze wybierze najdroższy model?”

**Nie.** Koszt to domyślnie tylko 15% wyniku. Tani, szybki i zdrowy provider może pokonać drogi. Użyj `auto/cheap`, jeśli chcesz jeszcze mocniej priorytetyzować koszt.

### „Co jeśli provider padnie?”

OmniRoute automatycznie go pomija i próbuje kolejnego. Jeśli provider wciąż zawodzi, jest tymczasowo wykluczany (5–30 minut). Nie musisz nic robić.

### „Czy mogę zobaczyć, który provider został użyty?”

Sprawdź nagłówki odpowiedzi — OmniRoute dołącza użytego providera i model w każdej odpowiedzi.

### „Czy uczy się z mojego użycia?”

Tak! System punktacji korzysta z danych historycznych (latencja, wskaźniki błędów, wskaźniki sukcesu), żeby z czasem podejmować lepsze decyzje.

### „Jaka jest różnica między `auto` a `auto/smart`?”

- `auto` — zrównoważony, 5% eksploracji
- `auto/smart` — najpierw jakość (te same wagi co `auto/coding`), 10% eksploracji

Użyj `auto/smart`, gdy chcesz najlepszą jakość i akceptujesz okazjonalną eksplorację.

### „Czy mogę wymusić konkretnego providera?”

Tak! Użyj combo ze strategią `priority` zamiast `auto`. Szczegóły w [dokumentacji technicznej](../routing/AUTO-COMBO.md).

### „Czym to się różni od round-robin?”

Round-robin przechodzi providerów po kolei. Auto-combo **ocenia każdego providera** i wybiera najlepszego. Jest mądrzejszy — uwzględnia health, szybkość, koszt i jakość.

---

## Co dalej?

- **[Podłącz providera](./PROVIDERS-GUIDE.md)** — dodaj pierwszego providera AI
- **[Przewodnik po darmowych poziomach](./FREE-TIERS-GUIDE.md)** — darmowe AI bez karty kredytowej
- **[Rozwiązywanie problemów](./TROUBLESHOOTING.md)** — naprawa typowych problemów
- **[Dokumentacja techniczna](../routing/AUTO-COMBO.md)** — dogłębny opis algorytmu punktacji

---

## Dowiedz się więcej

Dla deweloperów i kontrybutorów zobacz [Auto-Combo Technical Reference](../routing/AUTO-COMBO.md), gdzie znajdziesz:

- Pełny 13-czynnikowy algorytm punktacji
- Tabele wag pakietów trybów (mode pack)
- Ścieżki plików implementacji
- Endpointy API
- Szczegóły algorytmu self-healing
