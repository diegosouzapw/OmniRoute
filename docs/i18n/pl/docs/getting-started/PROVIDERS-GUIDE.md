# Przewodnik po providerach: podłącz modele AI do OmniRoute

> **TL;DR**: Provider to połączenie z usługą AI (np. OpenAI, Anthropic, Google). Potrzebujesz co najmniej jednego providera, aby korzystać z OmniRoute.

---

## Czym jest provider?

Traktuj providera jak **operatora komórkowego**. Tak jak potrzebujesz operatora, by dzwonić, tak potrzebujesz providera AI, by korzystać z modeli AI. OmniRoute jest jak telefon, który działa z **wszystkimi operatorami** — możesz między nimi przełączać się automatycznie.

### Typy providerów

| Typ            | Co to jest               | Przykłady                         | Koszt                         |
| -------------- | ------------------------ | --------------------------------- | ----------------------------- |
| **Free**       | Bez płatności            | Kiro, OpenCode Free, Pollinations | $0                            |
| **API Key**    | Wymagany klucz API       | OpenAI, Anthropic, Google         | Płatność za użycie            |
| **OAuth**      | Logowanie kontem         | Claude Code, GitHub Copilot       | Subskrypcja                   |
| **Web Cookie** | Używa sesji przeglądarki | ChatGPT Web, Gemini Web           | $0 (korzysta z Twojego konta) |

### Providery Web Cookie

Zobacz **[WEB-COOKIE-GUIDE.md](./WEB-COOKIE-GUIDE.md)** — ogólna konfiguracja, ograniczenia, rozwiązywanie problemów oraz wskazówki uwierzytelniania dla poszczególnych providerów.
---

## Szybki start: podłącz pierwszego providera

### Opcja A: darmowy provider (bez karty kredytowej)

1. Otwórz dashboard pod adresem `http://localhost:20128`
2. Przejdź do **Providers** → **Add Provider**
3. Wybierz jednego z darmowych providerów:
   - **Kiro AI** — darmowe modele Claude (bez auth)
   - **OpenCode Free** — darmowe modele GPT (bez auth)
   - **Pollinations** — darmowe GPT-5, Claude, Gemini (bez klucza)
   - **LongCat** — 10M tokenów za darmo (jednorazowy grant, wymaga konta + KYC)
   - **Cloudflare AI** — 50+ modeli, 10K neurons/dzień
4. Kliknij **Connect**
5. Gotowe! Masz darmowy dostęp do AI.

### Opcja B: provider z kluczem API (płatny)

1. Pobierz klucz API ze strony providera:
   - **OpenAI**: https://platform.openai.com/api-keys
   - **Anthropic**: https://console.anthropic.com/
   - **Google**: https://aistudio.google.com/apikey
   - **DeepSeek**: https://platform.deepseek.com/
   - **Groq**: https://console.groq.com/
2. Otwórz dashboard pod adresem `http://localhost:20128`
3. Przejdź do **Providers** → **Add Provider**
4. Wybierz providera
5. Wklej klucz API
6. Kliknij **Connect**
7. Gotowe! Masz dostęp do modeli tego providera.

### Opcja C: provider OAuth (subskrypcja)

1. Otwórz dashboard pod adresem `http://localhost:20128`
2. Przejdź do **Providers** → **Add Provider**
3. Wybierz providera (np. Claude Code, GitHub Copilot)
4. Kliknij **Connect with OAuth**
5. Zaloguj się na swoje konto
6. Gotowe! Masz dostęp do modeli z subskrypcji.

---

## Najlepsze darmowe providery

Te providery oferują **darmowy dostęp** bez karty kredytowej:

| Provider          | Darmowy limit     | Modele                                   | Jak połączyć       |
| ----------------- | ----------------- | ---------------------------------------- | ------------------ |
| **Kiro AI**       | 50 credits/mies.  | Claude Sonnet 4.5, Haiku 4.5, Opus 4.6   | Bez auth           |
| **OpenCode Free** | Bez limitu        | GPT-4o, Claude, Gemini                   | Bez auth           |
| **Pollinations**  | Bez klucza        | GPT-5, Claude, Gemini, DeepSeek, Llama 4 | Bez auth           |
| **LongCat**       | 10M jednorazowo   | LongCat-2.0                              | Klucz API + KYC    |
| **Cloudflare AI** | 10K neurons/dzień | 50+ modeli                               | Bez auth           |
| **NVIDIA NIM**    | ~40 RPM           | 129 modeli                               | Wymagany klucz API |
| **Cerebras**      | 1M tokenów/dzień  | Qwen3 235B, GPT-OSS 120B                 | Wymagany klucz API |
| **Qwen**          | Bez limitu        | Qwen3-coder-plus/flash/next              | Bez auth           |
| **Qoder**         | Bez limitu        | Kimi-K2, DeepSeek-R1, Qwen3-coder        | Bez auth           |

**Wskazówka**: Podłącz kilka darmowych providerów, aby mieć **nieograniczone darmowe AI** z automatycznym fallbackiem!

---

## Najlepsze płatne providery

Te providery oferują **modele wysokiej jakości** z kluczami API:

| Provider      | Najlepsze modele            | Koszt                   | Darmowy tier            |
| ------------- | --------------------------- | ----------------------- | ----------------------- |
| **OpenAI**    | GPT-5, GPT-4o               | $2.50-$10/1M tokenów    | $5 darmowych kredytów   |
| **Anthropic** | Claude Opus 4.6, Sonnet 4.6 | $3-$15/1M tokenów       | $5 darmowych kredytów   |
| **Google**    | Gemini 2.5 Pro, Flash       | $0.075-$1.25/1M tokenów | 1500 req/dzień za darmo |
| **DeepSeek**  | DeepSeek V4                 | $0.14-$0.28/1M tokenów  | 5M darmowych tokenów    |
| **Groq**      | Llama 4, Mixtral            | $0.05-$0.27/1M tokenów  | 30 RPM za darmo         |
| **xAI**       | Grok 3                      | $0.30-$0.60/1M tokenów  | —                       |

---

## Jak podłączyć providera (krok po kroku)

### Krok 1: Otwórz dashboard

Wejdź na `http://localhost:20128` w przeglądarce.

### Krok 2: Przejdź do Providers

Kliknij **Providers** na pasku bocznym.

### Krok 3: Kliknij Add Provider

Kliknij przycisk **+ Add Provider**.

### Krok 4: Wybierz providera

Przejrzyj listę lub wyszukaj providera. Kliknij go.

### Krok 5: Podaj dane uwierzytelniające

- **Darmowi providerzy**: bez poświadczeń — wystarczy kliknąć **Connect**
- **Providery z kluczem API**: wklej klucz API
- **Providery OAuth**: kliknij **Connect with OAuth** i zaloguj się

### Krok 6: Przetestuj połączenie

Kliknij **Test Connection**, aby sprawdzić, czy działa.

### Krok 7: Gotowe!

Provider jest podłączony. Możesz go używać z `model: "auto"` albo wskazać providera bezpośrednio.

---

## Korzystanie z wielu providerów

OmniRoute działa najlepiej z **wieloma providerami**. Daje to:

- **Automatyczny fallback** — jeśli jeden provider zawiedzie, OmniRoute próbuje kolejnego
- **Optymalizacja kosztów** — OmniRoute wybiera najtańszego providera dla każdego żądania
- **Optymalizacja szybkości** — OmniRoute wybiera najszybszego providera dla każdego żądania
- **Optymalizacja jakości** — OmniRoute wybiera najlepszego providera do danego zadania

### Zalecana konfiguracja

Podłącz co najmniej **3 providery**, aby uzyskać najlepsze doświadczenie:

1. **Jeden darmowy provider** (Kiro, OpenCode Free lub Pollinations) — zawsze dostępny
2. **Jeden szybki provider** (Groq, Cerebras) — do szybkich odpowiedzi
3. **Jeden provider jakości** (OpenAI, Anthropic, Google) — do złożonych zadań

Następnie używaj `model: "auto"`, a OmniRoute automatycznie wybierze najlepszy wariant dla każdego żądania.

---

## Konfiguracja pod konkretnego providera

### OpenAI

1. Pobierz klucz API: https://platform.openai.com/api-keys
2. W OmniRoute: Providers → Add Provider → OpenAI
3. Wklej klucz API → Connect

### Anthropic

1. Pobierz klucz API: https://console.anthropic.com/
2. W OmniRoute: Providers → Add Provider → Anthropic
3. Wklej klucz API → Connect

### Google (Gemini)

1. Pobierz klucz API: https://aistudio.google.com/apikey
2. W OmniRoute: Providers → Add Provider → Gemini
3. Wklej klucz API → Connect

### DeepSeek

1. Pobierz klucz API: https://platform.deepseek.com/
2. W OmniRoute: Providers → Add Provider → DeepSeek
3. Wklej klucz API → Connect

### Groq

1. Pobierz klucz API: https://console.groq.com/
2. W OmniRoute: Providers → Add Provider → Groq
3. Wklej klucz API → Connect

---

## Częste pytania

### „Czy muszę płacić, żeby korzystać z OmniRoute?”

**Nie!** OmniRoute jest darmowy i open-source. Możesz używać darmowych providerów (Kiro, OpenCode Free, Pollinations) bez żadnych opłat. Płacisz tylko wtedy, gdy zdecydujesz się na płatnych providerów.

### „Od którego providera zacząć?”

Zacznij od **Kiro AI** — jest darmowy, nie wymaga klucza API i daje dostęp do modeli Claude. Potem dodawaj kolejne providery w miarę potrzeb.

### „Czy mogę używać wielu providerów naraz?”

**Tak!** Na tym właśnie polega OmniRoute. Podłącz wielu providerów i używaj `model: "auto"`, aby OmniRoute wybierał najlepszy wariant dla każdego żądania.

### „Co jeśli provider padnie?”

OmniRoute automatycznie pomija niedziałających providerów i próbuje kolejnego. Nic nie musisz robić.

### „Jak odłączyć providera?”

Przejdź do Providers → kliknij providera → kliknij **Disconnect**.

### „Czy mogę użyć istniejących kluczy API?”

**Tak!** Jeśli masz już klucze API do OpenAI, Anthropic, Google itd., możesz ich użyć w OmniRoute. Wystarczy wkleić je przy podłączaniu providera.

---

## Co dalej?

- **[Auto-Combo Guide](./AUTO-COMBO-GUIDE.md)** — pozwól OmniRoute wybrać najlepsze AI za Ciebie
- **[Free Tiers Guide](./FREE-TIERS-GUIDE.md)** — darmowe AI bez karty kredytowej
- **[Troubleshooting](./TROUBLESHOOTING.md)** — rozwiązywanie typowych problemów
- **[Provider Reference](../reference/PROVIDER_REFERENCE.md)** — pełna lista 226 providerów
