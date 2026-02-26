# Rozwiązywanie problemów

🌐 **Languages:** 🇺🇸 [English](../../TROUBLESHOOTING.md) | 🇧🇷 [Português (Brasil)](../pt-BR/TROUBLESHOOTING.md) | 🇪🇸 [Español](../es/TROUBLESHOOTING.md) | 🇫🇷 [Français](../fr/TROUBLESHOOTING.md) | 🇮🇹 [Italiano](../it/TROUBLESHOOTING.md) | 🇷🇺 [Русский](../ru/TROUBLESHOOTING.md) | 🇨🇳 [中文 (简体)](../zh-CN/TROUBLESHOOTING.md) | 🇩🇪 [Deutsch](../de/TROUBLESHOOTING.md) | 🇮🇳 [हिन्दी](../in/TROUBLESHOOTING.md) | 🇹🇭 [ไทย](../th/TROUBLESHOOTING.md) | 🇺🇦 [Українська](../uk-UA/TROUBLESHOOTING.md) | 🇸🇦 [العربية](../ar/TROUBLESHOOTING.md) | 🇯🇵 [日本語](../ja/TROUBLESHOOTING.md) | 🇻🇳 [Tiếng Việt](../vi/TROUBLESHOOTING.md) | 🇧🇬 [Български](../bg/TROUBLESHOOTING.md) | 🇩🇰 [Dansk](../da/TROUBLESHOOTING.md) | 🇫🇮 [Suomi](../fi/TROUBLESHOOTING.md) | 🇮🇱 [עברית](../he/TROUBLESHOOTING.md) | 🇭🇺 [Magyar](../hu/TROUBLESHOOTING.md) | 🇮🇩 [Bahasa Indonesia](../id/TROUBLESHOOTING.md) | 🇰🇷 [한국어](../ko/TROUBLESHOOTING.md) | 🇲🇾 [Bahasa Melayu](../ms/TROUBLESHOOTING.md) | 🇳🇱 [Nederlands](../nl/TROUBLESHOOTING.md) | 🇳🇴 [Norsk](../no/TROUBLESHOOTING.md) | 🇵🇹 [Português (Portugal)](../pt/TROUBLESHOOTING.md) | 🇷🇴 [Română](../ro/TROUBLESHOOTING.md) | 🇵🇱 [Polski](../pl/TROUBLESHOOTING.md) | 🇸🇰 [Slovenčina](../sk/TROUBLESHOOTING.md) | 🇸🇪 [Svenska](../sv/TROUBLESHOOTING.md) | 🇵🇭 [Filipino](../phi/TROUBLESHOOTING.md)

Typowe problemy i rozwiązania dla OmniRoute.

---

## Szybkie poprawki

| Problem                                    | Rozwiązanie                                                                            |
| ------------------------------------------ | -------------------------------------------------------------------------------------- |
| Pierwsze logowanie nie działa              | Sprawdź `INITIAL_PASSWORD` w `.env` (domyślnie: `123456`)                              |
| Panel kontrolny otwiera się na złym porcie | Ustaw `PORT=20128` i `NEXT_PUBLIC_BASE_URL=http://localhost:20128`                     |
| Brak dzienników żądań pod `logs/`          | Ustaw `ENABLE_REQUEST_LOGS=true`                                                       |
| EACCES: odmowa pozwolenia                  | Ustaw `DATA_DIR=/path/to/writable/dir`, aby zastąpić `~/.omniroute`                    |
| Strategia routingu nie jest zapisywana     | Aktualizacja do wersji 1.4.11+ (poprawka schematu Zoda zapewniająca trwałość ustawień) |

---

## Problemy z dostawcą

### „Model językowy nie dostarczał komunikatów”

**Przyczyna:** Limit dostawcy został wyczerpany.

**Poprawka:**

1. Sprawdź moduł śledzenia limitów na pulpicie nawigacyjnym
2. Użyj kombinacji z poziomami rezerwowymi
3. Przejdź na tańszy/bezpłatny poziom

### Ograniczanie szybkości

**Przyczyna:** Wyczerpany limit subskrypcji.

**Poprawka:**

- Dodaj rezerwę: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Użyj GLM/MiniMax jako taniej kopii zapasowej

### Token OAuth wygasł

OmniRoute automatycznie odświeża tokeny. Jeśli problemy nadal występują:

1. Panel kontrolny → Dostawca → Połącz ponownie
2. Usuń i ponownie dodaj połączenie dostawcy

---

## Problemy z chmurą

### Błędy synchronizacji z chmurą

1. Sprawdź, czy `BASE_URL` wskazuje na działającą instancję (np. `http://localhost:20128`)
2. Zweryfikuj punkty `CLOUD_URL` w punkcie końcowym w chmurze (np. `https://omniroute.dev`)
3. Zachowaj wyrównanie wartości `NEXT_PUBLIC_*` z wartościami po stronie serwera

### Chmura `stream=false` Zwraca 500

**Objaw:** `Unexpected token 'd'...` na punkcie końcowym w chmurze dla połączeń innych niż przesyłanie strumieniowe.

**Przyczyna:** Upstream zwraca ładunek SSE, podczas gdy klient oczekuje JSON.

**Rozwiązanie:** użyj `stream=true` do bezpośrednich połączeń w chmurze. Lokalne środowisko wykonawcze obejmuje rezerwę SSE → JSON.

### Cloud wyświetla komunikat „Połączono”, ale „nieprawidłowy klucz API”

1. Utwórz nowy klucz z lokalnego pulpitu nawigacyjnego (`/api/keys`)
2. Uruchom synchronizację z chmurą: Włącz chmurę → Synchronizuj teraz
3. Stare/niezsynchronizowane klucze nadal mogą zwracać `401` w chmurze

---

## Problemy z Dockerem

### Narzędzie CLI pokazuje, że nie jest zainstalowane

1. Sprawdź pola wykonawcze: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. W trybie przenośnym: użyj docelowego obrazu `runner-cli` (w pakiecie CLI)
3. W trybie montowania hosta: ustaw `CLI_EXTRA_PATHS` i zamontuj katalog bin hosta jako tylko do odczytu
4. Jeśli `installed=true` i `runnable=false`: znaleziono plik binarny, ale kontrola stanu nie powiodła się

### Szybka weryfikacja środowiska wykonawczego

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Problemy z kosztami

### Wysokie koszty

1. Sprawdź statystyki użytkowania w Panelu → Użycie
2. Zmień model podstawowy na GLM/MiniMax
3. Korzystaj z bezpłatnej warstwy (Gemini CLI, iFlow) do zadań niekrytycznych
4. Ustaw budżety kosztów według klucza API: Panel → Klucze API → Budżet

---

## Debugowanie

### Włącz dzienniki żądań

Ustaw `ENABLE_REQUEST_LOGS=true` w swoim pliku `.env`. Dzienniki pojawiają się w katalogu `logs/`.

### Sprawdź stan dostawcy

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Pamięć uruchomieniowa

- Stan główny: `${DATA_DIR}/db.json` (dostawcy, kombinacje, aliasy, klucze, ustawienia)
- Użycie: `${DATA_DIR}/usage.json`, `${DATA_DIR}/log.txt`, `${DATA_DIR}/call_logs/`
- Dzienniki żądań: `<repo>/logs/...` (kiedy `ENABLE_REQUEST_LOGS=true`)

---

## Problemy z wyłącznikami automatycznymi

### Dostawca utknął w stanie OTWARTYM

Gdy wyłącznik automatyczny dostawcy jest OTWARTY, żądania są blokowane do czasu upłynięcia czasu odnowienia.

**Poprawka:**

1. Przejdź do **Panel sterowania → Ustawienia → Odporność**
2. Sprawdź kartę wyłącznika dla odpowiedniego dostawcy
3. Kliknij **Resetuj wszystko**, aby wyczyścić wszystkie wyłączniki, lub poczekaj, aż upłynie czas odnowienia
4. Przed zresetowaniem sprawdź, czy dostawca jest rzeczywiście dostępny

### Dostawca ciągle uruchamia wyłącznik automatyczny

Jeśli dostawca wielokrotnie wchodzi w stan OPEN:

1. Sprawdź **Panel kontrolny → Kondycja → Kondycja dostawcy** pod kątem wzorca awarii
2. Przejdź do **Ustawienia → Odporność → Profile dostawców** i zwiększ próg awarii
3. Sprawdź, czy dostawca zmienił limity API lub wymaga ponownego uwierzytelnienia
4. Sprawdź dane telemetryczne dotyczące opóźnień — duże opóźnienia mogą powodować awarie wynikające z przekroczenia limitu czasu

---

## Problemy z transkrypcją dźwięku

### Błąd „Nieobsługiwany model”.

- Upewnij się, że używasz prawidłowego przedrostka: `deepgram/nova-3` lub `assemblyai/best`
- Sprawdź, czy dostawca jest podłączony w ** Panelu → Dostawcy**

### Transkrypcja zwraca wartość pustą lub kończy się niepowodzeniem

- Sprawdź obsługiwane formaty audio: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- Sprawdź, czy rozmiar pliku mieści się w granicach dostawcy (zwykle < 25 MB)
- Sprawdź ważność klucza API dostawcy na karcie dostawcy

---

## Debugowanie tłumacza

Użyj **Panel kontrolny → Tłumacz**, aby debugować problemy z tłumaczeniem formatu:

| Tryb                      | Kiedy stosować                                                                                                   |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| **Plac zabaw**            | Porównaj formaty wejścia/wyjścia obok siebie — wklej nieudane żądanie, aby zobaczyć, jak zostanie przetłumaczone |
| **Tester czatu**          | Wysyłaj wiadomości na żywo i sprawdzaj pełny ładunek żądania/odpowiedzi, w tym nagłówki                          |
| **Stolik testowy**        | Przeprowadź testy wsadowe dla kombinacji formatów, aby dowiedzieć się, które tłumaczenia są uszkodzone           |
| **Monitorowanie na żywo** | Obserwuj przepływ żądań w czasie rzeczywistym, aby wykryć sporadyczne problemy z tłumaczeniem                    |

### Typowe problemy z formatem

- **Tagi myślenia nie pojawiają się** — Sprawdź, czy dostawca docelowy obsługuje myślenie i ustawienie budżetu na myślenie
- **Porzucanie wywołań narzędzi** — Niektóre tłumaczenia formatów mogą usuwać nieobsługiwane pola; sprawdź w trybie placu zabaw
- **Brak podpowiedzi systemowej** — Claude i Gemini inaczej obsługują podpowiedzi systemowe; sprawdź wynik tłumaczenia
- **SDK zwraca surowy ciąg znaków zamiast obiektu** — Naprawiono w wersji 1.1.0: narzędzie do czyszczenia odpowiedzi usuwa teraz niestandardowe pola (`x_groq`, `usage_breakdown` itp.), które powodują błędy sprawdzania poprawności OpenAI SDK w Pydantic
- **GLM/ERNIE odrzuca rolę `system`** — Naprawiono w wersji 1.1.0: normalizator ról automatycznie łączy komunikaty systemowe z komunikatami użytkownika w przypadku niekompatybilnych modeli
- **`developer` rola nie została rozpoznana** — Naprawiono w wersji 1.1.0: automatycznie konwertowana na `system` dla dostawców innych niż OpenAI
- **`json_schema` nie działa z Gemini** — Naprawiono w wersji 1.1.0: `response_format` jest teraz konwertowany na `responseMimeType` Gemini + `responseSchema`

---

## Ustawienia odporności

### Automatyczny limit szybkości nie uruchamia się

- Automatyczne ograniczenie szybkości dotyczy tylko dostawców kluczy API (nie OAuth/subskrypcja)
- Sprawdź, czy **Ustawienia → Odporność → Profile dostawców** ma włączone automatyczne ograniczenie stawek
- Sprawdź, czy dostawca zwraca kody stanu `429` lub nagłówki `Retry-After`

### Dostrajanie wykładniczego wycofywania

Profile dostawców obsługują następujące ustawienia:

- **Opóźnienie bazowe** — Początkowy czas oczekiwania po pierwszej awarii (domyślnie: 1 s)
- **Maks. opóźnienie** — Maksymalny limit czasu oczekiwania (domyślnie: 30 s)
- **Mnożnik** — O ile zwiększyć opóźnienie przy kolejnej awarii (domyślnie: 2x)

### Stado przeciw grzmotom

Gdy wiele jednoczesnych żądań trafia do dostawcy z ograniczoną szybkością, OmniRoute używa mutexu i automatycznego ograniczania szybkości, aby serializować żądania i zapobiegać kaskadowym błędom. Jest to automatyczne w przypadku dostawców kluczy API.

---

## Nadal utknąłeś?

- **Problemy z GitHubem**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **Architektura**: Zobacz [**OMNI_TOKEN_55**](ARCHITECTURE.md), aby uzyskać szczegółowe informacje wewnętrzne
- **Dokumentacja API**: Zobacz [**OMNI_TOKEN_56**](API_REFERENCE.md) dla wszystkich punktów końcowych
- **Panel stanu**: Sprawdź **Panel kontrolny → Zdrowie**, aby sprawdzić stan systemu w czasie rzeczywistym
- **Tłumacz**: Użyj **Panel kontrolny → Tłumacz**, aby debugować problemy z formatem
