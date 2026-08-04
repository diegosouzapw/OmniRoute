# Przewodnik po darmowych planach: darmowe AI bez karty kredytowej

> **TL;DR**: OmniRoute agreguje darmowe plany od 50+ providerów. Podłącz wielu darmowych providerów, aby uzyskać nielimitowane darmowe AI z automatycznym fallbackiem.

---

## Czym są darmowe plany?

Wielu providerów AI oferuje **darmowe użycie** — bez karty kredytowej. To jak darmowe próbki w sklepie spożywczym. Możesz wypróbować produkt bez płacenia.

OmniRoute **agreguje** te darmowe plany w jeden endpoint. Zamiast rejestrować się w 10 różnych serwisach, podłączasz je wszystkie do OmniRoute i używasz `model: "auto"`, aby automatycznie wybrać najlepszą darmową opcję dla każdego żądania.

---

## Najlepsi darmowi providerzy (bez karty kredytowej)

### Poziom 1: darmowi na zawsze (nielimitowani)

Ci providerzy są **zawsze darmowi** i bez limitów:

| Provider          | Modele                                   | Limit                     | Jak podłączyć   |
| ----------------- | ---------------------------------------- | ------------------------- | --------------- |
| **Kiro AI**       | Claude Sonnet 4.5, Haiku 4.5, Opus 4.6   | 50 kredytów/miesiąc       | Bez autoryzacji |
| **OpenCode Free** | GPT-4o, Claude, Gemini                   | Nielimitowane             | Bez autoryzacji |
| **Pollinations**  | GPT-5, Claude, Gemini, DeepSeek, Llama 4 | Bez klucza                | Bez autoryzacji |
| **LongCat**       | LongCat-2.0                              | 10M tokenów (jednorazowo) | Klucz API + KYC |
| **Cloudflare AI** | 50+ modeli                               | 10K neuronów/dzień        | Bez autoryzacji |
| **Qwen**          | Qwen3-coder-plus/flash/next              | Nielimitowane             | Bez autoryzacji |
| **Qoder**         | Kimi-K2, DeepSeek-R1, Qwen3-coder        | Nielimitowane             | Bez autoryzacji |

### Poziom 2: darmowi po rejestracji (hojni)

Ci providerzy dają **darmowe kredyty** przy rejestracji:

| Provider       | Darmowe kredyty       | Modele                      | Jak uzyskać                          |
| -------------- | --------------------- | --------------------------- | ------------------------------------ |
| **NVIDIA NIM** | ~40 RPM               | 129 modeli                  | Rejestracja na build.nvidia.com      |
| **Cerebras**   | 1M tokenów/dzień      | Qwen3 235B, GPT-OSS 120B    | Rejestracja na cerebras.ai           |
| **DeepSeek**   | 5M darmowych tokenów  | DeepSeek V4                 | Rejestracja na platform.deepseek.com |
| **Groq**       | 30 RPM za darmo       | Llama 4, Mixtral            | Rejestracja na console.groq.com      |
| **OpenAI**     | $5 darmowych kredytów | GPT-5, GPT-4o               | Rejestracja na platform.openai.com   |
| **Anthropic**  | $5 darmowych kredytów | Claude Opus 4.6, Sonnet 4.6 | Rejestracja na console.anthropic.com |
| **Google**     | 1500 żądań/dzień      | Gemini 2.5 Pro, Flash       | Rejestracja na aistudio.google.com   |

### Poziom 3: darmowi z limitami (konkretne zastosowania)

Ci providerzy mają **darmowe plany** z określonymi limitami:

| Provider          | Darmowy limit      | Modele           | Najlepsze do      |
| ----------------- | ------------------ | ---------------- | ----------------- |
| **Cerebras**      | 1M tokenów/dzień   | Qwen3 235B       | Szybka inferencja |
| **NVIDIA NIM**    | ~40 RPM            | 129 modeli       | Różnorodność      |
| **Groq**          | 30 RPM             | Llama 4, Mixtral | Szybkość          |
| **Cloudflare AI** | 10K neuronów/dzień | 50+ modeli       | Różnorodność      |

---

## Jak łączyć darmowe plany

Siła OmniRoute to **stackowanie darmowych planów**. Zamiast polegać na jednym providerze, podłączasz wielu darmowych providerów i pozwalasz OmniRoute automatycznie wybrać najlepszego dla każdego żądania.

### Przykład: nielimitowane darmowe AI

Podłącz tych 4 providerów, aby uzyskać **nielimitowane darmowe AI**:

1. **Kiro AI** — 50 kredytów/miesiąc (modele Claude)
2. **OpenCode Free** — nielimitowane (modele GPT)
3. **Pollinations** — bez klucza (wiele modeli)
4. **LongCat** — 10M tokenów jednorazowo (backup, wymaga KYC)

Następnie użyj `model: "auto"`, a OmniRoute:

- Najpierw spróbuje Kiro (najlepsza jakość)
- Jeśli Kiro jest zajęty → spróbuje OpenCode Free
- Jeśli OpenCode Free jest wolny → spróbuje Pollinations
- Jeśli wszystkie zawiodą → użyje LongCat jako backup

**Efekt**: nielimitowane darmowe AI z automatycznym fallbackiem!

---

## Jak podłączyć darmowych providerów

### Krok 1: Otwórz dashboard

Wejdź na `http://localhost:20128` w przeglądarce.

### Krok 2: Przejdź do Providers

Kliknij **Providers** na pasku bocznym.

### Krok 3: Kliknij Add Provider

Kliknij przycisk **+ Add Provider**.

### Krok 4: Wybierz darmowego providera

Przejrzyj listę i wybierz jednego z tych darmowych providerów:

- **Kiro AI** — darmowe modele Claude
- **OpenCode Free** — darmowe modele GPT
- **Pollinations** — darmowe GPT-5, Claude, Gemini
- **LongCat** — 10M tokenów za darmo (jednorazowo, wymaga KYC)
- **Cloudflare AI** — 50+ modeli, 10K neuronów/dzień

### Krok 5: Kliknij Connect

Klucz API nie jest potrzebny — wystarczy kliknąć **Connect**.

### Krok 6: Powtórz

Podłącz 3–4 darmowych providerów, aby uzyskać najlepsze doświadczenie.

---

## Szczegóły darmowych providerów

### Kiro AI

- **Modele**: Claude Sonnet 4.5, Haiku 4.5, Opus 4.6
- **Limit**: 50 kredytów/miesiąc
- **Auth**: bez autoryzacji
- **Najlepsze do**: wysokiej jakości modele Claude

### OpenCode Free

- **Modele**: GPT-4o, Claude, Gemini
- **Limit**: nielimitowane
- **Auth**: bez autoryzacji
- **Najlepsze do**: uniwersalnego AI

### Pollinations

- **Modele**: GPT-5, Claude, Gemini, DeepSeek, Llama 4
- **Limit**: bez klucza
- **Auth**: bez autoryzacji
- **Najlepsze do**: różnorodności modeli

### LongCat

- **Modele**: LongCat-2.0
- **Limit**: 10M tokenów, jednorazowa pula przy rejestracji (nie odnawia się dziennie/miesięcznie)
- **Auth**: klucz API + weryfikacja KYC wymagana do odblokowania darmowej puli
- **Najlepsze do**: jednorazowego darmowego limitu; pay-as-you-go po jego wyczerpaniu

### Cloudflare AI

- **Modele**: 50+ modeli
- **Limit**: 10K neuronów/dzień
- **Auth**: bez autoryzacji
- **Najlepsze do**: różnorodności i niezawodności

### NVIDIA NIM

- **Modele**: 129 modeli
- **Limit**: ~40 RPM
- **Auth**: rejestracja na build.nvidia.com
- **Najlepsze do**: różnorodności i szybkości

### Cerebras

- **Modele**: Qwen3 235B, GPT-OSS 120B
- **Limit**: 1M tokenów/dzień
- **Auth**: rejestracja na cerebras.ai
- **Najlepsze do**: szybkiej inferencji

### Qwen

- **Modele**: Qwen3-coder-plus/flash/next
- **Limit**: nielimitowane
- **Auth**: bez autoryzacji
- **Najlepsze do**: zadań kodowania

### Qoder

- **Modele**: Kimi-K2, DeepSeek-R1, Qwen3-coder
- **Limit**: nielimitowane
- **Auth**: bez autoryzacji
- **Najlepsze do**: zadań kodowania

---

## Jak OmniRoute usprawnia darmowe plany

### 1. Automatyczny fallback

Jeśli jeden darmowy provider jest zajęty lub niedostępny, OmniRoute automatycznie próbuje następnego. Nie musisz nic robić.

### 2. Inteligentny routing

OmniRoute wybiera **najlepszego darmowego providera** dla każdego żądania na podstawie:

- Szybkość — który provider jest teraz najszybszy?
- Jakość — który provider najlepiej pasuje do tego zadania?
- Pojemność — który provider ma jeszcze dostępny limit?

### 3. Oszczędność tokenów

Funkcja **compression** w OmniRoute oszczędza 15–95% tokenów. Dzięki temu darmowy limit starcza **5–20× dłużej**.

### 4. Obsługa wielu kont

Jeśli masz wiele kont u tego samego providera, OmniRoute traktuje każde jako osobnego kandydata. To podwaja lub potroja Twój darmowy limit.

---

## Matematyka darmowych planów

Policzmy, ile darmowego AI możesz uzyskać:

### Konserwatywne oszacowanie (3 providerów)

| Provider      | Limit dzienny | Limit miesięczny |
| ------------- | ------------- | ---------------- |
| Kiro AI       | ~1,7 kredytu  | 50 kredytów      |
| OpenCode Free | Nielimitowane | Nielimitowane    |
| Pollinations  | Nielimitowane | Nielimitowane    |

**Suma**: nielimitowane darmowe AI

### Agresywne oszacowanie (7 providerów)

| Provider      | Limit dzienny   | Limit miesięczny               |
| ------------- | --------------- | ------------------------------ |
| Kiro AI       | ~1,7 kredytu    | 50 kredytów                    |
| OpenCode Free | Nielimitowane   | Nielimitowane                  |
| Pollinations  | Nielimitowane   | Nielimitowane                  |
| LongCat       | — (jednorazowo) | 10M tokenów (jednorazowo, KYC) |
| Cloudflare AI | 10K neuronów    | 300K neuronów                  |
| NVIDIA NIM    | ~40 RPM         | ~1,7M żądań                    |
| Cerebras      | 1M tokenów      | 30M tokenów                    |

**Suma**: ~1,6B udokumentowanych darmowych tokenów/miesiąc — do ~2,1B w pierwszym miesiącu z kredytami za rejestrację (z compression: ~7,5B+ efektywnych tokenów)

---

## Częste pytania

### „Czy to naprawdę za darmo?”

**Tak!** To oficjalne darmowe plany providerów. OmniRoute tylko ułatwia korzystanie z nich wszystkich naraz.

### „Czy darmowy plan się wyczerpie?”

Niektórzy providerzy mają limity (np. 50 kredytów/miesiąc u Kiro), ale inni są nielimitowani (np. OpenCode Free i Pollinations). Podłączając wielu providerów, zawsze masz backup.

### „Czy mogę używać darmowych providerów w produkcji?”

**Tak!** Wielu darmowych providerów jest gotowych do produkcji. Jednak przy krytycznych aplikacjach rozważ dodanie płatnego providera jako backup.

### „Gdzie jest haczyk?”

Nie ma haczyka! Providerzy oferują darmowe plany, żeby przyciągnąć użytkowników. OmniRoute tylko ułatwia korzystanie z nich wszystkich naraz.

### „Jak uzyskać większy darmowy limit?”

1. Podłącz więcej darmowych providerów
2. Używaj compression, aby oszczędzać tokeny (oszczędność 15–95%)
3. Używaj `auto/cheap`, aby priorytetyzować darmowych/tanich providerów
4. Załóż wiele kont u tego samego providera

### „Czy darmowi providerzy mają gorszą jakość?”

**Niekoniecznie!** Wielu darmowych providerów oferuje te same modele co płatni. Na przykład Kiro daje dostęp do Claude Sonnet 4.5 — tego samego modelu, który dostajesz w płatnej subskrypcji Anthropic.

---

## Co dalej?

- **[Przewodnik Auto-Combo](./AUTO-COMBO-GUIDE.md)** — pozwól OmniRoute wybrać najlepsze AI
- **[Przewodnik po providerach](./PROVIDERS-GUIDE.md)** — podłącz więcej providerów
- **[Rozwiązywanie problemów](./TROUBLESHOOTING.md)** — napraw typowe problemy
- **[Referencja darmowych planów](../reference/FREE_TIERS.md)** — pełna lista darmowych planów
