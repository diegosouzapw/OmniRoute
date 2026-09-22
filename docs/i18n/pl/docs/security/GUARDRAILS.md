# Guardrails (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

title: "Guardrails"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Guardrails

> **Źródło prawdy:** `src/lib/guardrails/`
> **Ostatnia aktualizacja:** 2026-06-28 — v3.8.40 (pokrycie injection-guard + limit skanu 16 KB + red-team)

Guardrails egzekwują bezpieczeństwo, politykę i transformacje treści na granicy
między OmniRoute a upstream providerami. Każdy guardrail może sprawdzać (oraz
opcjonalnie odrzucać, transformować lub adnotować) payloady żądań (`preCall`) i
odpowiedzi upstream (`postCall`).

System działa w trybie **fail-open**: jeśli guardrail rzuci wyjątek podczas
wykonania, registry zapisuje błąd i kontynuuje z następnym guardrailem zamiast
failować żądanie. Blokada to zawsze jawna decyzja (`block: true`), nigdy wypadek.

## Wbudowane mechanizmy ochronne

Rejestr automatycznie ładuje podczas importu sześć mechanizmów ochronnych w kolejności priorytetów
(zobacz `registry.ts` → `registerDefaultGuardrails()`):

| Priorytet | Nazwa               | Etap(y)        | Plik                  |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Niższe numery priorytetów są wykonywane **jako pierwsze**.

### Most wizyjny (`visionBridge.ts`) — most modalności PR-1

Przechwytuje żądania zawierające obrazy, które są kierowane do **modeli bez obsługi obrazu**, i albo przekierowuje całe żądanie do modelu obsługującego obraz, albo przed wywołaniem usługi nadrzędnej zastępuje fragmenty obrazów opisami tekstowymi wygenerowanymi przez konfigurowalny model wizyjny. Dzięki temu dostawcy obsługujący wyłącznie tekst mogą w sposób transparentny przetwarzać ładunki multimodalne.

Przepływ:

1. Pomiń, jeśli model docelowy już obsługuje obraz (chyba że znajduje się na
   liście modeli z wymuszonym mostem `isVisionBridgeForcedModel`).
2. Wyodrębnij fragmenty obrazów za pomocą `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), która deleguje zadanie do **ujednoliconego
   detektora multimediów** `detectMediaParts()` w `open-sse/utils/mediaParts.ts` —
   jedynego źródła prawdy współdzielonego z filtrem zgodności combo.
   Wyodrębnianie jest ograniczone listą dozwolonych fragmentów najwyższego poziomu
   o kształtach, które `replaceImageParts` może wstawić z powrotem (kontrakt
   wyodrębniania↔zastępowania): OpenAI `image_url`, Anthropic base64
   `source.type:"base64"`, adres URL Anthropic `source.type:"url"` oraz
   `input_image` interfejsu Responses API. Zagnieżdżone trafienia i kształty
   będące wyłącznie wskaźnikami są materiałem dla filtra combo i nigdy nie są
   wyodrębniane. Pomiń, jeśli niczego nie znaleziono.
3. Ustal konfigurację środowiska wykonawczego za pomocą
   `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): nowe klucze ustawień
   `modalityBridge*` mają pierwszeństwo; starsze klucze `visionBridge*` pozostają
   **mechanizmem rezerwowym przez jeden cykl** (okno wycofania zmian). Pomiń przed
   jakimkolwiek przeglądaniem multimediów, gdy most jest wyłączony.
4. Selektor trybu (`modalityBridgeVisionMode`, zobacz tabelę poniżej) wybiera
   między przekierowaniem a opisem. Przekierowanie zwraca `modifiedPayload`
   z podmienionym wyłącznie polem `model` oraz metadane
   `{ rerouted, fromModel, toModel, imagesKept }`.
5. Ścieżka opisu: ogranicz liczbę obrazów do `maxImages`, utwórz prompt
   uwzględniający zadanie, sprawdź pamięć podręczną opisów, wywołaj model wizyjny
   **równolegle** (`Promise.allSettled`) i wstaw w miejsce obrazów fragmenty
   tekstowe `[Image N]: <description>`. Nieudane opisanie zwraca `null`, a
   oryginalny fragment obrazu zostaje **zachowany** (#4012) — z wyjątkiem
   ścieżki opisu combo, gdy nie udało się utworzyć żadnego opisu; wtedy do
   potwierdzonej usługi nadrzędnej bez obsługi obrazu trafia tekst zastępczy
   `(unavailable — no vision-capable provider connected)` (#8430).
6. Zwróć `modifiedPayload` oraz metadane (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Selektor trybu (`modalityBridgeVisionMode`)

| Tryb       | Domyślny | Zachowanie                                                                                                                                                                                                                                                                                                                                                                 |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Dotychczasowa heurystyka, bez zmian (#6640/#7204): modele inne niż combo/`auto/` są przekierowywane do najlepszego modelu wizyjnego, chyba że oryginalny model ma użyteczne dane uwierzytelniające (wtedy tworzony jest opis); cele combo zawsze korzystają z opisu.                                                                                                       |
| `describe` |          | Zawsze twórz opis — blok przekierowania jest całkowicie pomijany; zawsze odpowiada model wybrany przez użytkownika.                                                                                                                                                                                                                                                        |
| `reroute`  |          | Wymuś przekierowanie: mechanizm zachowania modelu z danymi uwierzytelniającymi jest pomijany. Mechanizm weryfikacji danych uwierzytelniających **celu** przekierowania nadal obowiązuje — gdy nie istnieje użyteczny model wizyjny, żądanie przechodzi do tworzenia opisu, aby nieprzetworzone obrazy nigdy nie trafiły do backendu obsługującego wyłącznie tekst (#8430). |

Wymuszone tryby kończą wybór **przed** uruchomieniem automatycznej heurystyki;
zachowanie `auto` jest identyczne bajt po bajcie z mechanizmem ochronnym sprzed PR-1.

#### Prompt opisu uwzględniający zadanie (`modalityBridgeVisionTaskAware`)

Domyślnie **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) dołącza
tekst **ostatniej wiadomości użytkownika** (skrócony do 500 znaków) do bazowego
promptu opisu, ukierunkowując opis na to, o co faktycznie zapytał użytkownik
(wzorzec codex-vision-proxy), oraz prosząc model wizyjny o transkrypcję
widocznego tekstu. Gdy flaga jest wyłączona — lub nie ma tekstu użytkownika —
bazowy prompt jest używany bez zmian.

Własne żądanie zgodne z OpenAI w samopętli opisu (`callVisionModelSingle()`
w `visionBridgeHelpers.ts`) zawsze żąda `image_url.detail: "high"` —
bezwarunkowo, dla każdego wywołującego/dostawcy, bez uzależnienia od jakiegokolwiek sygnału klienta.
Próbkowanie z niską szczegółowością obniża dokładność OCR dokładnie w przypadku zadania
transkrypcji tekstu, którego dotyczy ten prompt, dlatego samo wywołanie opisu zawsze żąda wysokiej
szczegółowości, niezależnie od poziomu szczegółowości użytego przez pierwotne żądanie przychodzące. Wpływa
to wyłącznie na treść wewnętrznego żądania opisu; nie zmienia sposobu, w jaki
OmniRoute przekazuje własne `image_url.detail` wywołującego w żądaniu głównym —
ta wartość domyślna jest stosowana osobno i tylko dla wykrytych klientów OpenCode, w
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Gałąź
formatu transmisyjnego Anthropic w samopętli opisu nie ma pola `detail`
i nie podlega żadnej z tych wartości domyślnych.

#### Limit wyjścia opisu (`modalityBridgeVisionMaxChars`)

| Klucz                          | Wartość domyślna | Zakres            |
| ------------------------------ | ---------------- | ----------------- |
| `modalityBridgeVisionMaxChars` | `0`              | `0` lub 100–50000 |

`0` (wartość domyślna) oznacza **brak limitu** — opis zwracany przez
`callVisionModel()` jest przekazywany bez modyfikacji, co zachowuje dotychczasowe
działanie. Każda wartość z zakresu 100–50000 powoduje skrócenie opisu i dodanie
sufiksu `…`, zanim zostanie on wstawiony z powrotem jako `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` w `src/lib/guardrails/visionBridge.ts`).
Zwiększ tę wartość dla zadań OCR wymagających dużej szczegółowości, w których model docelowy potrzebuje
pełnej transkrypcji; zmniejsz ją, aby ograniczyć zużycie tokenów przez nazbyt rozbudowane modele wizyjne.
Pole panelu administracyjnego znajduje się w panelu Zaawansowane na karcie Vision
(`modality-bridge-max-chars` w `ModalityBridgeVisionTab.tsx`) i podnosi każdą
wartość od 1 do 99 do minimalnej wartości 100, pozostawiając jawne `0`
bez zmian — `0` samo w sobie jest prawidłową wartością Zod
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), a nie jedynie
domyślną wartością „nieustawione”.

#### Pamięć podręczna opisów (`modalityBridge/bridgeCache.ts`)

Współdzielona w całym procesie pamięć podręczna LRU + TTL przechowywana w pamięci dla wyników opisów.
Klucz = `sha256(imageRef + composedPrompt + configuredBridgeModel)` z
ramkowaniem prefiksami długości (bez kolizji granic pól). Składnik modelu to
**skonfigurowany** model mostu, a nie model, który faktycznie odpowiedział —
`callVisionModel` może wewnętrznie użyć modelu zapasowego, a tworzenie klucza dla każdej próby
fragmentowałoby pamięć podręczną. Nieudane opisy nigdy nie są buforowane. Ustawienia:

| Klucz                           | Wartość domyślna | Zakres  |
| ------------------------------- | ---------------- | ------- |
| `modalityBridgeCacheEnabled`    | `true`           | —       |
| `modalityBridgeCacheTtlMinutes` | `60`             | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`            | 10–5000 |

#### Normalizacja obrazów zdalnych (samopętla opisu/pobieranie base64)

Gdy most samodzielnie pobiera **zdalny** obraz — na potrzeby samowywołania opisu
Anthropic oraz konwersji do base64 w formacie transmisyjnym Claude
(`ensureBase64ImagesForClaudeWire`), w obu przypadkach za pośrednictwem
`fetchRemoteImageAsDataUri()` w `visionBridgeHelpers.ts` — wynikowy identyfikator URI
danych jest przepuszczany przez `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) przed osadzeniem w żądaniu modelu
wizyjnego. Zbyt duże obrazy są skalowane w dół do **2048px dla dłuższej krawędzi** (zgodnie
z limitem zmiany rozmiaru stosowanym już po stronie serwera przez OpenAI/Anthropic), co zmniejsza
liczbę przesyłanych bajtów/opóźnienie bez zmiany tego, co widzi model wizyjny. Zmiana rozmiaru
używa `sharp`, ładowanego przez import dynamiczny: na platformie, na której nie uda się załadować jego
natywnego pliku binarnego, `normalizeDataUri()` **nigdy nie zgłasza wyjątku** — zamiast tego
przekazuje oryginalne bajty bez zmian, dzięki czemu ścieżka opisu/konwersji do base64
zawsze pozostaje sprawna. Bajty niebędące obrazem (pobrane dane, które nie zawierają
dekodowalnego obrazu) również są przekazywane bez zmian. Ta normalizacja
dotyczy wyłącznie obrazów pobieranych przez most na potrzeby własnego samowywołania — nigdy nie jest
stosowana do nieprzetworzonego ładunku wywołującego, zgodnie z zasadą
modyfikacji wyłącznie po wyrażeniu zgody (Twarda reguła nr 20).

#### Schemat ustawień + migracja

Nowe klucze `modalityBridge*` są walidowane przez Zod w `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, zestaw trzech kluczy `modalityBridgeCache*` oraz
grupa `modalityBridgeAudio*` używana przez Audio Bridge. Migracja
`141_modality_bridge_settings.sql` kopiuje istniejące starsze wartości
`visionBridge*` do odpowiadających im nowych kluczy (idempotentnie, bez nadpisywania
wartości `modalityBridge*` ustawionej przez operatora); starsze klucze pozostają
obsługiwane jako awaryjne źródło odczytu przez jeden cykl wydania.

#### Nagłówek przejrzystości + statystyki

Odpowiedzi przekształcone przez opis zawierają
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(tworzony przez `buildModalityBridgeHeader()` w `modalityBridge/bridgeStats.ts`,
dodawany przez `withModalityBridgeHeader()` w `src/sse/handlers/chatHelpers.ts`).
Przekierowane żądania **nie** otrzymują nagłówka — ładunek pozostał niezmieniony, a zamiana modelu
jest już widoczna w polu `model` treści odpowiedzi.

`GET /api/modality-bridge/stats` (uwierzytelnianie administracyjne, ten sam poziom co
`GET /api/settings`) zwraca przechowywane w pamięci liczniki dla poszczególnych modalności
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` dla `vision`, `audio` i
`video`. `averageLatencyMs` używa jako mianownika `latencySamples`, a nie wszystkich
prób; operacja bez pomiaru czasu nie tworzy fikcyjnej próbki o czasie zerowym.
`bridged` pozostaje wstecznie zgodnym aliasem udanych
konwersji; nieudane próby go nie zwiększają.
Liczniki są zgodnie z założeniem zerowane po ponownym uruchomieniu procesu
(telemetria, nie księgowość).

#### Konfiguracja panelu administracyjnego

Dedykowana strona panelu administracyjnego znajduje się pod adresem
`/dashboard/settings/modality-bridge`. Jej dostępne bezpośrednio przez URL karty `Vision`, `Audio`
i `Video` zachowują parametry zapytania podczas zmiany wartości `tab`.
Karta Vision udostępnia włączanie, tryb, wybór modelu (w tym automatyczny
wybór domyślny), monity uwzględniające zadanie, zaawansowane limity czasu oczekiwania, obrazu, długości opisu i pamięci podręcznej,
liczniki środowiska wykonawczego
oraz zabezpieczone żądanie przykładowe. Karta Audio jest również aktywna: udostępnia
włączanie, selektor modeli wyłącznie STT z opcją Auto, limity czasu oczekiwania i maksymalnej długości klipu, liczniki
audio oraz test przykładowy `input_audio`. Karta Video jest funkcjonalna: raportuje
stan środowiska wykonawczego FFmpeg/ffprobe — jeden z czterech jawnych stanów interfejsu (`unknown`, gdy
sondowanie jest w toku lub nie mogło się zakończyć, `restricted` na hoście
panelu administracyjnego innym niż loopback, gdzie sondowanie jest pomijane po stronie klienta, `unavailable` po
przeprowadzeniu sondowania i potwierdzeniu braku albo `available` wraz z wersjami FFmpeg/ffprobe) — utrwala
ustawienia włączenia, modelu oraz limitów klatek, wideo i czasu oczekiwania, filtruje selektor modeli do modeli
obsługujących przetwarzanie obrazu
i udostępnia liczniki wideo.

Dawna karta Vision Bridge w ustawieniach AI jest łączem zapewniającym zgodność z
nową stroną; nie zawiera już drugiej kopii formularza. Sekcja Media Providers zawiera również
łącza z przepływów pracy Image-to-Text i Speech-to-Text do odpowiednich kart Modality
Bridge, bez usuwania istniejącego środowiska testowego Speech-to-Text.

**Obejście kontroli dopuszczenia dla pętli zwrotnej:** gdy wywołanie opisu jest kierowane przez
własną pętlę zwrotną `/v1` OmniRoute (niestandardowy model dostawcy), podżądanie wysyła
`x-omniroute-admission-bypass: internal` i jest uwierzytelniane przy użyciu ustalonego
poświadczenia pętli zwrotnej — lokalnej wartości zastępczej `sk_omniroute` w trybie lokalnym albo
skonfigurowanego przez operatora klucza środowiskowego `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` (#1350), dzięki czemu
wdrożenia z `REQUIRE_API_KEY=true` nadal mogą wykonywać wywołanie opisu. Obejście
jest honorowane wyłącznie dla tych dokładnych poświadczeń, dlatego klienci zewnętrzni nie mogą używać tego
nagłówka do pomijania kontroli dopuszczenia.

Starsze wartości domyślne znajdują się w `src/shared/constants/visionBridgeDefaults.ts`;
nowe wartości domyślne trybu, uwzględniania zadania i pamięci podręcznej oraz mechanizm rozstrzygania ustawień znajdują się w
`src/shared/constants/modalityBridgeDefaults.ts`. Mechanizm zabezpieczający udostępnia opcję konstruktora
`deps`, dzięki czemu testy mogą wstrzykiwać fałszywe implementacje `getSettings` i
`callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Przechwytuje żądania czatu zawierające audio, zanim dotrą one do miejsca docelowego, o którym nie
wiadomo, czy akceptuje dane wejściowe audio. Nigdy nie przekierowuje żądania czatu: fragmenty audio są
transkrybowane za pośrednictwem istniejącego punktu końcowego multipart zgodnego z OpenAI, a
wybrany model czatu kontynuuje pracę z transkrypcjami tekstowymi.

Przepływ:

1. Ustal `supportsAudio` za pomocą `getResolvedModelCapabilities()`. Jawne
   metadane rejestru dostawców mają pierwszeństwo, następnie statyczne metadane modelu, a potem zsynchronizowane
   `modalities_input`. Zadeklarowana lista danych wejściowych bez `audio` daje wartość `false`; brak
   danych dotyczących możliwości daje wartość `null`. Zarówno `false`, jak i `null` aktywują
   zachowawczy most, natomiast `true` powoduje jego pominięcie.
2. Ustal ustawienia `modalityBridgeAudio*` i wyodrębnij możliwe do zastąpienia fragmenty audio najwyższego poziomu
   z każdej wiadomości za pomocą współdzielonego detektora `detectMediaParts()`.
   Obsługiwane formaty przesyłania to `input_audio` i `audio_url` OpenAI oraz
   `source.media_type: "audio/*"`. Zagnieżdżone audio jest wykrywane na potrzeby routingu, ale nie
   jest usuwane przez ścieżkę zastępowania. Ilość pracy jest ograniczona przez `modalityBridgeAudioMaxClips`;
   późniejsze fragmenty pozostają nietknięte.
3. Uwzględnij skonfigurowany `provider/model` albo pozwól funkcji `selectAudioBridgeModel()` przejść przez
   `AUDIO_TRANSCRIPTION_PROVIDERS` w stabilnej kolejności katalogowej i wybrać pierwszy
   model z użytecznym aktywnym poświadczeniem dostawcy.
4. `callAudioTranscription()` konwertuje audio base64/data-URI na wieloczęściowy
   `file` albo pobiera zdalny `audio_url` przez mechanizm ochrony wychodzącego ruchu
   wyłącznie do zasobów publicznych, z przypięciem DNS i limitem 25 MB. Następnie wysyła plik i wybrany
   model metodą POST do lokalnej pętli zwrotnej `/v1/audio/transcriptions`, uwierzytelnionej za pomocą
   `resolveSelfLoopBearer()`. Istniejąca trasa transkrypcji przeprowadza standardowe
   wyszukiwanie poświadczeń, obsługę okresów wyciszenia i limitów częstotliwości oraz przekazanie do dostawcy.
5. Pomyślne wywołania zastępują swoje fragmenty wartością `[Audio N]: <transcript>`. Wywołania
   są wykonywane przy użyciu `Promise.allSettled`: pojedynczy błąd zachowuje oryginalny
   fragment audio (kontrakt #4012). Jeśli wszystkie wywołania zakończą się niepowodzeniem, a dla miejsca docelowego udowodniono
   `supportsAudio === false`, fragmenty przyjmują postać
   `[Audio N]: (unavailable — no STT provider connected)` (kontrakt #8430). W przypadku
   nieznanego miejsca docelowego (`null`) wynik obejmujący wyłącznie błędy pozostaje nietknięty. Miejsce docelowe
   o potwierdzonej obsłudze wyłącznie tekstu, bez użytecznego poświadczenia STT, otrzymuje ten sam jawny
   tekst zastępczy bez wykonywania wywołania sieciowego.

Pomyślne transkrypcje korzystają z ogólnoprocesowej pamięci podręcznej LRU/TTL Modality Bridge. Klucz
łączy odwołanie do audio, stabilną etykietę operacji `audio-transcription`
oraz wybrany model STT; błędy nigdy nie są buforowane. Próby przetwarzania audio aktualizują
współdzielone liczniki `bridged`, `cacheHits`, `failures` i `lastUsedAt`.
Przekształcone odpowiedzi zawierają
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; nietknięte
żądania nie otrzymują segmentu Audio Bridge.

Ustawienia środowiska wykonawczego są przechowywane w bazie danych i walidowane przez Zod:

| Klucz                         | Wartość domyślna | Zakres                     |
| ----------------------------- | ---------------- | -------------------------- |
| `modalityBridgeAudioEnabled`  | `true`           | —                          |
| `modalityBridgeAudioModel`    | `""`             | Auto lub identyfikator STT |
| `modalityBridgeAudioTimeout`  | `60000`          | 1000–300000                |
| `modalityBridgeAudioMaxClips` | `3`              | 1–10                       |

Współdzielona pamięć podręczna nadal jest kontrolowana przez `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` i `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Przechwytuje części wideo najwyższego poziomu w `messages` interfejsu Chat Completions oraz w `input` interfejsu Responses API, zanim zostanie wywołany docelowy system bez znanej natywnej obsługi wideo. Obsługiwane formaty to `input_video`, `video_url`, `video_source`, adresy URL HTTPS oraz identyfikatory URI danych `data:video/*;base64,...`. Zwykłe nazwy plików w tekście nie są traktowane jako wideo.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) odpowiada za przechodzenie po żądaniu, sprawdzanie możliwości i zasad, agregację dla poszczególnych żądań oraz ładunek odpowiedzi. Operacje dotyczące pojedynczego wideo — pozyskiwanie, pamięć podręczna pełnych wyników, opisywanie sekwencji klatek (z uwzględnieniem transkrypcji dźwięku zadeklarowanej przez wywołującego) oraz metryki, przerywanie i sprzątanie dla poszczególnych prób — są ukryte za `processVideoPart` w `videoBridgePipeline.ts`, wywoływanym raz dla każdej części wideo wewnątrz pętli `preCall`. Moduł ten definiuje również jawne granice portów: `VideoMediaBrokerPort` (pozyskiwanie bajtów i wyodrębnianie próbkowanych klatek), `VideoAudioTranscriptionPort` (łączenie transkrypcji dźwięku zadeklarowanej przez wywołującego z podpisami próbkowanych klatek) oraz `VideoDrilldownPort` (granica utrwalania danych szczegółowej analizy klatek; nie jest jeszcze podłączona do `processVideoPart` — obecnie wpisy szczegółowej analizy zapisuje wyłącznie oddzielna trasa `/api/modality-bridge/video/drilldown`).

Publiczna ścieżka żądań `/v1` nigdy nie importuje ani nie uruchamia podprocesu. Zdalne materiały wideo są pobierane z limitem 50 MiB; osadzone materiały wideo w formacie base64 mają konserwatywny limit 36 MiB zdekodowanych danych na wideo, aby obwiednia modelu, wiadomości i ramek mogła zmieścić się w publicznym limicie przyjmowania żądań JSON wynoszącym 50 MiB. Długość danych osadzonych oraz szacowany rozmiar po zdekodowaniu są sprawdzane przed przydzieleniem pamięci. Protokół HTTPS jest wymagany zarówno dla początkowego zdalnego adresu URL, jak i dla każdego przekierowania, z użyciem istniejącego mechanizmu ochrony publicznego ruchu wychodzącego z przypinaniem DNS. Następnie bajty przekraczają dokładnie wewnętrzną granicę brokera `POST /api/modality-bridge/video/extract`. Ta trasa ma jednocześnie oznaczenia `LOCAL_ONLY` i `SPAWN_CAPABLE`, akceptuje wyłącznie uwierzytelnione dla danego procesu żądania z zaufanego interfejsu pętli zwrotnej i nigdy nie przyjmuje adresu URL, ścieżki systemu plików, pliku wykonywalnego ani listy argumentów. Potok limitowania rozmiaru treści API oraz przyrostowy czytnik treści procedury obsługi niezależnie wymuszają limit wejścia brokera wynoszący 50 MiB. Jego ograniczona kolejka wykonuje jedną operację wyodrębniania naraz, dopuszcza cztery oczekujące zadania i ogranicza oczekujące dane wejściowe do 100 MiB.

Wewnątrz brokera `ffprobe` odczytuje prywatny plik lokalny; stała lista dozwolonych formatów wyklucza formaty list odtwarzania i manifestów. W przypadku dozwolonych kontenerów z rodziny MOV zewnętrzne odwołania do danych MOV pozostają domyślnie wyłączone, a stałe polecenie ich nie włącza. Zarówno `ffprobe`, jak i `ffmpeg` używają listy dozwolonych protokołów ograniczonej wyłącznie do `file`, jednego wątku, stałych tablic argumentów, bez powłoki, a pliki wykonywalne są rozwiązywane na podstawie `PATH`. Strumienie okładek w postaci dołączonych obrazów nie są uznawane za kandydatów do odtwarzania. Wszystkie strumienie możliwe do odtworzenia muszą spełniać limity, a jawnie określony strumień domyślny ma pierwszeństwo przed deterministycznym wyborem strumienia o najniższym indeksie. Materiały wideo są ograniczone do 600 sekund, 8 192 pikseli na wymiar i 33 554 432 pikseli źródłowych. FFmpeg próbkuje od 1 do 16 środkowych klatek JPEG, skaluje dłuższą krawędź w dół do maksymalnie 1 024 pikseli bez powiększania mniejszych danych wejściowych i nigdy nie otrzymuje adresu URL. Domyślną metodą próbkowania jest `uniform`. Opcjonalne zasady `scene_aware` i eksperymentalna `segment_aware` wykonują jeden dodatkowy, stały przebieg FFmpeg na już zweryfikowanym lokalnym strumieniu, wybierają ograniczoną liczbę znaczników czasu scen z `showinfo`, a w razie błędu detektora, przekroczenia limitu czasu, nieprawidłowych danych wyjściowych lub pustego zbioru kandydatów deterministycznie powracają do tych samych równomiernie rozmieszczonych punktów środkowych. Tryb uwzględniający segmenty przydziela próbki punktów środkowych proporcjonalnie do zweryfikowanych przedziałów scen; dane uzasadniające podział na segmenty i zachowanie mechanizmu rezerwowego opisano szczegółowo poniżej. Twardy limit 16 klatek jest stosowany po dokonaniu wyboru w przypadku każdej zasady. Gdy żądanie uwzględniające sceny ma budżet wynoszący tylko jedną klatkę, używany jest równomierny punkt środkowy aktywnego okna pełnego wideo lub okna fokusu, a zgłaszana wartość to `policyEffective: uniform`: pojedyncza wybrana klatka sceny nie może zachować obu krańców osi czasu. Wywołujący może opcjonalnie podać skończone okno fokusu (`start`/`end` w sekundach); granice są ograniczane do czasu trwania materiału, okna odwrócone lub zawierające wartości nieskończone są odrzucane, a wszystkie zasady próbkowania są stosowane wyłącznie w znormalizowanym przedziale. Wynikowe okno jest uwzględniane w metadanych próbkowania oraz w prefiksie niezaufanego opisu, dzięki czemu modele niższego poziomu mogą odróżnić wybrany fragment od pełnej osi czasu.

Semantyczne ukierunkowanie podpisów jest oddzielnym, jawnym ustawieniem. Domyślny tryb analizy `full` zachowuje istniejący prompt dotyczący klatek i nigdy nie przekazuje tekstu żądania do modelu generującego podpisy. W trybie `focused` most odczytuje wyłącznie najnowszy niepusty element `text`/`input_text` utworzony przez użytkownika z tego samego kontenera Chat lub Responses, normalizuje go do NFC, zwija znaki sterujące i białe znaki oraz ogranicza do 500 punktów kodowych Unicode. Pusty wynik powoduje powrót do dokładnego promptu `full`. Przydatna wskazówka jest serializowana jako JSON w dedykowanym bloku niezaufanego kontekstu użytkownika i może jedynie nadawać priorytet obserwowalnym szczegółom; nie może zastąpić oddzielnego ostrzeżenia przed wykonywaniem instrukcji widocznych lub słyszalnych w materiale. Fokus tekstowy nigdy nie wyznacza `start`/`end` ani nie zmienia próbnika czasowego.

#### FU-07 strukturalne dane segmentacyjne

`segment_aware` wykorzystuje jeden ograniczony przebieg analizy wstępnej na już zweryfikowanym lokalnym strumieniu wideo. Stały łańcuch filtrów najpierw skaluje obraz do maksymalnej szerokości 320 pikseli, wykrywa zmiany scen i zamrożone przedziały, a następnie próbkuje z częstotliwością 1 klatki na sekundę w celu pomiaru rozmycia, średniej luminancji oraz informacji przestrzennej i czasowej. Przebieg jest ograniczony do 600 próbek strukturalnych, jednego wątku FFmpeg/filtra, tych samych list dozwolonych protokołów ograniczonych wyłącznie do `file` i kontenerów, limitu danych wyjściowych procesu wynoszącego 1 MiB oraz maksymalnie 30 sekund w ramach współdzielonego mechanizmu przerywania i terminu brokera. Nigdy nie przyjmuje z żądania polecenia, filtra, ścieżki ani adresu URL.

Wartości strukturalne stanowią deterministyczne dane z próbkowania, a nie semantyczne rozumienie materiału wideo. Nie wnioskują o obiektach, działaniach, napisach, mowie ani intencjach użytkownika. Granice scen i zatrzymań obrazu wyznaczają segmenty; pokrycie zatrzymań, rozmycie, ekspozycja, szczegółowość przestrzenna oraz zmiany czasowe wpływają wyłącznie na sposób przydziału istniejącego budżetu 1–16 klatek. Segment składający się w całości z zatrzymanego obrazu jest ograniczony do jednej klatki, natomiast segmenty bez zatrzymania konkurują o pozostały budżet. Gdy liczba granic przekracza liczbę klatek, zachowywane jest równomierne pokrycie osi czasu, dzięki czemu szybkie cięcia na początku nie mogą przesłonić długiego segmentu końcowego. Granice scen mieszczące się w 1-sekundowej rozdzielczości analizy względem granicy zatrzymania obrazu są scalane.

Brakujące filtry, nieprawidłowe lub puste dane, błąd detektora albo przekroczenie limitu czasu wstępnej analizy powodują bezpieczne przejście do dokładnej strategii równomiernie rozmieszczonych punktów środkowych. Przerwanie przez wywołującego lub upłynięcie terminu brokera nie powoduje takiego przejścia: kończy uruchomiony podproces, zapobiega późniejszemu wyodrębnianiu klatek, a prywatne drzewo tymczasowe jest usuwane w `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generuje deterministyczne, rzeczywiste zestawy testowe FFmpeg dotyczące oszczędności liczby wywołań generowania opisów po deduplikacji, alokacji budżetu przy intensywnym ruchu, danych o rozmyciu/ekspozycji/SI-TI, szybkich cięć z długą końcówką oraz fałszywych alarmów przy stopniowym przenikaniu. Rejestruje czas zegarowy wstępnej analizy, a tam, gdzie dostępne jest `/usr/bin/time`, także czas CPU procesu potomnego i szczytowe użycie RSS. Kontrole jakości wykorzystują wyłącznie strukturalne wyrocznie. Jakość rzeczywistego modelu generowania opisów pozostaje oznaczona jako `HOLD`, ponieważ ten zestaw testowy nie ma autoryzowanego punktu końcowego ani zamrożonego mechanizmu oceniającego. Oszczędności finansowe również pozostają oznaczone jako `HOLD`, chyba że `--caption-cost-per-call-usd` podaje jawną, dodatnią szacunkową cenę pojedynczego wywołania; skrypt nigdy nie fabrykuje żadnego z tych wyników.

Rozmiar każdej klatki jest ograniczony do 4 MiB, łączny rozmiar wszystkich nieprzetworzonych klatek do 23 MiB, a rozmiar zserializowanej odpowiedzi brokera do 32 MiB. Prywatny katalog tymczasowy jest usuwany w `finally`. OmniRoute nie zawiera FFmpeg i nie pozwala podać niestandardowej ścieżki do pliku wykonywalnego. Przed wygenerowaniem opisów bridge stosuje zachowawczą deduplikację wizualną: każdy obraz JPEG jest redukowany do bufora skali szarości 16×16 i porównywany wyłącznie z ostatnią zachowaną klatką. Jeśli żądany budżet opisów przekracza jedną klatkę, podczas wyodrębniania tworzona jest ograniczona pula kandydatów obejmująca maksymalnie dwukrotność tego budżetu i nigdy więcej niż 16 klatek. Żądany limit jest stosowany dopiero po deduplikacji, przy czym podczas końcowego przerzedzania zachowywane są pierwszy i ostatni wybrany kandydat, jeśli budżet wynosi co najmniej dwie klatki. Wersjonowana strategia `grayscale-16x16-mean-cells-v2` wykorzystuje większą z dwóch wartości: średnią różnicę luminancji albo odsetek komórek miniatury, których znormalizowana różnica wynosi co najmniej 0,05. Próg duplikatu jest stałą równą 0,04, wybraną ze względu na przewidywalność, a nie udostępnioną jako ustawienie czasu wykonania. Ten pomocniczy sygnał o wysokim kontraście zachowuje niewielki ruch i zmiany widocznego tekstu, które porównanie oparte wyłącznie na średniej może ukryć. Błędy komparatora lub dekodera powodują bezpieczne zachowanie pokrycia. Metadane wyjściowe rozróżniają wyodrębnionych kandydatów, klatki użyte z powodzeniem oraz odrzucone duplikaty wizualne.

Jawnie oznaczona część wideo może zażądać arkusza kontaktowego ze znacznikami czasu. Bridge tworzy siatkę JPEG zawierającą maksymalnie 4 kolumny i 16 klatek. W każdej komórce o rozmiarze 512 pikseli znacznik czasu materiału źródłowego jest trwale nanoszony na kontrastowy dolny pasek, a te same znaczniki czasu pozostają w metadanych tekstowych na potrzeby późniejszego powiązania i audytu. Rozmiar kompletnego obrazu JPEG pozostaje ograniczony do 32 MiB. Jeśli `sharp` nie może zdekodować ani złożyć siatki, bridge przechodzi do użycia poszczególnych klatek JPEG; przerwanie przez klienta nadal jest propagowane przez operację tworzenia arkusza.

Dane uzasadniające wdrożenie są celowo oddzielone od syntetycznego mikrotestu wydajności składania. `scripts/perf/video-bridge-contact-sheet-eval.ts` definiuje wersjonowany według schematu zestaw testów A/B dla rzeczywistych modeli wizyjnych zgodnych z OpenAI. Mierzy zgłoszoną przez dostawcę liczbę tokenów, całkowite opóźnienie zegarowe (w tym składanie arkusza), liczbę wywołań modelu oraz zachowanie faktów zdefiniowanych w manifeście. Surowe odpowiedzi modelu nie są zapisywane w raporcie; zachowywane są wyłącznie skróty SHA-256 i identyfikatory dopasowanych faktów. Zestaw testowy nie wykonuje żadnych wywołań sieciowych ani płatnych wywołań modelu, chyba że przekazano `--execute-real` oraz skonfigurowano `--model`, `OMNIROUTE_BASE_URL` i `OMNIROUTE_API_KEY`. Bez takiego jawnego rzeczywistego uruchomienia jego wynik w formacie przeznaczonym do odczytu maszynowego pozostaje oznaczony jako `HOLD`; same syntetyczne pomiary rozmiaru danych i liczby wywołań nie stanowią podstawy do wdrożenia.

Wywołujący mogą dołączyć opcjonalną tablicę `transcript.cues` do obsługiwanej części wideo, jeśli posiadają już zsynchronizowany tekst. Każda wskazówka musi zawierać `text`, skończony przedział `start`/`end` mieszczący się w wykrytym czasie trwania oraz dozwoloną wartość `source` (`client`, `embedded` lub `audio-bridge`); wartością domyślną `confidence` jest `1`, a jej wartość musi mieścić się w przedziale od `0` do `1`. Identyczne wskazówki są scalane. OmniRoute nigdy nie rozpoczyna transkrypcji na podstawie tych metadanych: zweryfikowane wskazówki są kopiowane do opisanego wyniku wraz ze źródłem, poziomem ufności i przedziałem czasowym oraz przedstawiane jako niezaufane obserwacje obok opisów klatek. Nieprawidłowy tekst, tekst spoza zakresu albo tekst bez informacji o pochodzeniu jest odrzucany, zamiast być dołączany do strumienia opisów. Pole `source` jest obecnie deklarowane przez wywołującego, a nie weryfikowane przez serwer: OmniRoute sprawdza, czy wartość jest jednym z trzech dozwolonych ciągów znaków, lecz nie potwierdza jeszcze kryptograficznie, że etykieta `embedded` lub `audio-bridge` rzeczywiście pochodzi z wyodrębniania kontrolowanego przez serwer. Do czasu wdrożenia takiej weryfikacji należy traktować `source` jako niezaufaną wskazówkę; nie należy na tej podstawie podejmować decyzji dotyczących autoryzacji.

Zaawansowany klient wywołujący może dostarczyć już autoryzowaną ścieżkę `audioTranscript`
dla tego samego filmu. Warstwa fuzji przetwarza obserwacje wizualne i dźwiękowe w ramach
jednego terminu wykonania i sygnału przerwania, porządkuje je na wspólnej osi czasu, scala
identyczne duplikaty oraz zgłasza wynik częściowy, gdy powiedzie się tylko jedna gałąź.
Nieprawidłowy `audioTranscript` powoduje degradację do takiego wyniku częściowego — opis
wizualny zostaje zachowany, a gałąź dźwiękowa rejestruje oczyszczony kod błędu —
zamiast powodować niepowodzenie całego filmu. Dostępność poszczególnych gałęzi, flaga
wyniku częściowego oraz oczyszczone kody błędów są zachowywane w opisywanym wyniku, w
metadanych mechanizmów ochronnych (`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), w metadanych pamięci podręcznej wyników oraz w licznikach
fuzji mostu. Domyślna ścieżka Video Bridge nie wywołuje konwersji mowy na tekst
ani nie pobiera drugiej kopii multimediów; bez jawnie przekazanej ścieżki pozostaje
ograniczona wyłącznie do obrazu.

**Przechowywanie transkrypcji (#12150 P1).** Ma to zastosowanie automatycznie za każdym
razem, gdy Video Bridge (sam w sobie wymagający jawnego włączenia) renderuje znacznik
transkrypcji — nie istnieje osobna flaga przechowywania. Gdy żądanie renderuje dowolny
znacznik transkrypcji (zadeklarowany przez klienta `transcript` lub scalony
`audioTranscript`), mechanizm ochronny oznacza go jako `videoBridgeObserved` i tworzy
zredagowaną kopię cieniową opisu filmu — identycznie wyrenderowaną wersję, w której
treść tekstowa każdego znacznika zostaje zastąpiona przez
`[redacted-video-transcript]`, utworzoną przez podmianę pola ustrukturyzowanego znacznika
przed złożeniem ciągu znaków (nigdy przez analizowanie spłaszczonego tekstu, dzięki
czemu żadna zawartość znacznika — złośliwa ani zwykła, w tym treści zawierające `]`,
takie jak `[inaudible]`/`[music]` — nie może przetrwać). Utrwalona treść żądania
w dzienniku wywołań zastępuje każdą część tekstową pochodzącą z filmu tą zredagowaną
kopią cieniową, dopasowywaną na podstawie równości treści; kotwica `fullText` jest
ponownie odczytywana z ukończonego ładunku mechanizmu ochronnego sprzed wywołania,
dzięki czemu dopasowanie nadal kończy się powodzeniem po tym, jak późniejsze łańcuchowe
mechanizmy ochronne (maskowanie danych osobowych i poświadczeń, priorytety 10/95)
zmodyfikują tekst opisu w miejscu, oraz po tym, jak wstrzyknięcie monitu systemowego,
przekazania kontekstu i pamięci zmieni strukturę tablicy wiadomości. Treść wysyłana
do modelu pozostaje niezmieniona. Zaobserwowane żądanie nie wypełnia również trwałej
pamięci Memory (pomijane jest wyodrębnianie zarówno na podstawie żądania, jak
i odpowiedzi), dlatego własna odpowiedź modelu nie może powielić tekstu transkrypcji
w pamięci Memory.

Nadal otwarte obszary przechowywania, śledzone jako dalsze zadanie (**P2**, #12430):
nieprzetworzony zrzut żądania klienta sprzed zastosowania mechanizmów ochronnych
w artefakcie szczegółowego dziennika; kontynuacja `previous_response_id` działająca
według zasady bezpiecznego odrzucenia; wewnętrzne wywołania monitów pochodnych,
które osadzają transkrypcję w syntetyzowanym monicie tekstowym (etapy potoku,
przekazywanie kontekstu); oraz treść odpowiedzi / kopia w semantycznej pamięci
podręcznej odpowiedzi modelu, która cytuje transkrypcję. Są to obszary klasy
nieprzetworzonej/odpowiedzi lub wymagające jawnego włączenia, pozostające poza zakresem
utrwalonej treści żądania i pamięci Memory w P1.

Wewnętrzny cykl życia `/api/modality-bridge/video/drilldown` stanowi osobną,
uwierzytelnianą za pomocą interfejsu loopback/tokenu warstwę pamięci podręcznej.
Każda operacja wymaga również kanonicznego, nieprzezroczystego identyfikatora podmiotu.
Zanim klient produkcyjny zostanie włączony, musi wyprowadzać ten identyfikator
z uwierzytelnionego dzierżawcy i nigdy nie może przekazywać wartości wybranej przez
klienta. Klucze pamięci podręcznej wiążą ten podmiot z kanonicznymi identyfikatorami
sesji i odwołania do filmu, przechowują wyłącznie klucze wyprowadzone z użyciem SHA-256
oraz ograniczają zarówno odczyt, jak i usuwanie do tego samego podmiotu. Pamięć
podręczna przechowuje najwyżej 16 wyprowadzonych klatek JPEG na wpis, wygasza je po
dziesięciu minutach i obsługuje ograniczone odczyty `start`/`end` lub jawne usunięcie
sesji.

Każdy podmiot jest ograniczony do 16 wpisów i 64 MiB kanonicznych danych JPEG. Limity
te są niezależne od globalnego pułapu 64 wpisów/256 MiB: presja limitu podmiotu powoduje
usuwanie wyłącznie najdawniej używanych wpisów tego podmiotu, zanim zostanie rozważone
globalne usuwanie zgodnie z LRU. Wygasłe wpisy są usuwane zarówno z rozliczeń podmiotu,
jak i globalnych podczas aktywności pamięci podręcznej, natomiast anulowanie i błąd
walidacji nie zatwierdzają częściowego zastąpienia.

Pamięć podręczna odrzuca niekanoniczne kodowanie Base64, nadmiarowe dopełnienie,
multimedia inne niż JPEG, nieprawidłowe lub obcięte pliki JPEG oraz pliki JPEG,
które generują ostrzeżenie podczas ograniczonego, pełnego dekodowania obrazu przez
`sharp`. Każdy zaakceptowany obraz jest ponownie kodowany jako kanoniczny JPEG,
a jego szerokość i wysokość są wyprowadzane ze zdekodowanych bajtów zamiast z pól
klienta, którym nie należy ufać; wszelkie końcowe bajty poliglotyczne są odrzucane,
a nie zachowywane. Do obu limitów wliczany jest wyłącznie ograniczony kanoniczny
bufor skompresowany. Limit przesyłania JSON uwzględnia narzut Base64 dla pułapu
32 MiB zdekodowanych danych wejściowych. Każde
przechowywane wyprowadzenie rejestruje zweryfikowany format/rozdzielczość JPEG,
zasady próbkowania, wersję wyprowadzenia, czas utworzenia, obliczony przez serwer
skrót zawartości oraz skrót odwołania nadrzędnego wraz ze skrótem zawartości
nadrzędnej pochodzącym od zaufanego klienta. Anulowanie jest sprawdzane między
asynchronicznymi fazami dekodowania/obliczania skrótu, przed atomowym zatwierdzeniem
w pamięci podręcznej.

Ta transza nie łączy jeszcze produkcyjnego producenta z trasą i nie zapewnia wyboru
wariantu o wielu rozdzielczościach. Przezroczysta ścieżka żądania Video Bridge nie
powoduje zatem dodatkowej pracy, natomiast wyprowadzanie identyfikatora podmiotu
powiązanego z dzierżawcą i pełny cykl życia FU-08 dla wielu rozdzielczości pozostają
jawnymi dalszymi zadaniami, a nie funkcjami udokumentowanymi jako ukończone.

Klatki są kolejno opisywane za pomocą skonfigurowanego modelu Video. Puste
nadpisanie Video dziedziczy ustawienie Vision; jeśli oba są puste, automatyczny
router Vision wybiera efektywny model obsługujący analizę obrazu. Pomyślnie
wygenerowane opisy zastępują oryginalną część stabilnym prefiksem `[Video description:`,
który oznacza również tekst jako niezaufaną obserwację pochodzącą z multimediów
i nakazuje modelom na dalszych etapach nie wykonywać instrukcji znalezionych
w multimediach. Klucze pamięci podręcznej opisów klatek obejmują bajty JPEG,
prompt, znacznik czasu i efektywny model; buforowane są wyłącznie pomyślnie
wygenerowane opisy. Wpisy pamięci podręcznej zachowują rzeczywisty model, który
pomyślnie wygenerował wynik, w tym model rezerwowy; most raportuje `mixed`, gdy
różne klatki zostały przetworzone przez różne modele. Trafienie w pamięci
podręcznej ponownie wykorzystuje tożsamość tego modelu zamiast przypisywać mu
etykietę żądanego planu routingu. Pamięć podręczna wyników całego filmu jest
indeksowana na podstawie wszystkich danych wejściowych zmieniających wynik —
promptu, efektywnego modelu, zasad próbkowania, liczby klatek, trybu analizy
semantycznej, odcisku SHA-256 znormalizowanej wskazówki dotyczącej obszaru
zainteresowania, okna zainteresowania, `transcript`, `audioTranscript` oraz
flagi arkusza stykowego — dlatego zmiana któregokolwiek z tych wymiarów oznacza
brak trafienia w pamięci podręcznej, a nigdy ponowne użycie nieaktualnego wyniku.
Wersja zasad wizualnej deduplikacji, próg oraz ograniczona liczba klatek
kandydujących są również jawnie uwzględniane w kluczu i metadanych pamięci
podręcznej wyników; zmiana zasad nie może zatem spowodować ponownego użycia
nieaktualnego opisu całego filmu. Metadane pamięci podręcznej wyników v4
przechowują tryb i odcisk, nigdy surowe zadanie użytkownika. Metadane mechanizmu
ochronnego raportują zarówno żądany, jak i efektywny tryb analizy; żądany tryb
`focused` bez użytecznego tekstu użytkownika jest raportowany jako efektywnie
`full`.

Mechanizm ochronny wyodrębnia każdą obsługiwaną część wideo, ale opisuje nie
więcej niż `modalityBridgeVideoMaxVideos`. W przypadku elementu docelowego,
dla którego potwierdzono `supportsVideo === false`, filmy zakończone błędem
i przekraczające limit są zastępowane jawnymi, bezpiecznymi znacznikami
tekstowymi, aby żadne surowe wideo nie zostało przekazane dalej. Gdy możliwości
są nieznane, te części pozostają niezmienione. Elementy docelowe z
`supportsVideo === true` omijają most. Sygnał przerwania żądania klienta jest
przekazywany przez pobieranie, kolejkę brokera, podprocesy i wywołania
generowania opisów; przerwania zatrzymują przetwarzanie między filmami i nigdy
nie powodują awaryjnego przepuszczenia surowych multimediów.

Ustawienia środowiska wykonawczego są przechowywane w bazie danych i walidowane
przez Zod:

| Klucz                               | Wartość domyślna | Zakres / zachowanie                                                                                                   |
| ----------------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`          | Opcjonalne środowisko wykonawcze, wymagające jawnego włączenia                                                        |
| `modalityBridgeVideoAnalysisMode`   | `"full"`         | `full` zachowuje ogólne opisy; `focused` używa ograniczonego, niezaufanego kontekstu ostatniej wiadomości użytkownika |
| `modalityBridgeVideoModel`          | `""`             | Dziedziczy model Vision Bridge                                                                                        |
| `modalityBridgeVideoFrameCount`     | `8`              | 1–16                                                                                                                  |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"`      | `uniform`, `scene_aware` lub proporcjonalne `segment_aware`; błąd detektora powoduje powrót do `uniform`              |
| `modalityBridgeVideoMaxVideos`      | `1`              | 1–4                                                                                                                   |
| `modalityBridgeVideoTimeout`        | `120000`         | 1000–120000 ms                                                                                                        |

Starsze, utrwalone wartości limitu czasu Video przekraczające 120 sekund są
ograniczane do terminu brokera; nowe zapisy ustawień przekraczające ten limit
są odrzucane. `GET /api/modality-bridge/video/runtime` wymaga zaufanej,
oznaczonej lokalności interfejsu loopback przed uwierzytelnieniem lub sondowaniem
środowiska wykonawczego, a następnie wymaga uwierzytelnienia administracyjnego.
Zwraca wyłącznie `available`, oczyszczone wersje FFmpeg/ffprobe oraz stałą
przyczynę, gdy środowisko wykonawcze jest niedostępne. Wewnętrzny punkt końcowy
wyodrębniania nie jest publicznym API przesyłania plików: przepełnienie kolejki
zwraca `503` wraz z `Retry-After`, rozłączenie wywołującego zwraca `499`,
a stały termin brokera zwraca `504`. Przekonwertowane odpowiedzi dodają
`video->text;model=<visionModel>;parts=<videos>` do centralnego nagłówka
`x-omniroute-modality-bridge` bez usuwania segmentów Vision lub Audio.

### Maskowanie danych PII (`piiMasker.ts`)

Działa na **obu** etapach.

- **`preCall`** klonuje ładunek, przechodzi przez `system`, `messages`, `input`
  i `prompt` (w tym elementy będące zwykłymi ciągami znaków) oraz stosuje
  `processPII()` (z `@/shared/utils/inputSanitizer`) do pól tekstowych
  `content`/`text`. Gdy `PII_REDACTION_ENABLED=true`, wykryte dane PII są
  redagowane w wychodzącym ładunku. Jest to niezależne od
  `INPUT_SANITIZER_MODE` (który steruje wyłącznie zasadami dotyczącymi ataków
  prompt injection). Gdy redagowanie jest wyłączone, wywołanie rejestruje liczbę
  wykryć bez modyfikowania zawartości.
- **`postCall`** wykonuje głęboką kopię odpowiedzi, uruchamia
  `sanitizePIIResponse()` oraz mechanizm maskowania kształtu Responses API
  (`maskResponsesOutput` — obejmuje `output_text` i
  `output[].content[].text`). Jeśli nastąpi jakiekolwiek zredagowanie,
  zmodyfikowana odpowiedź zastępuje oryginalną.

Mechanizm ochronny nigdy nie blokuje; jedynie dodaje adnotacje
(`meta.detections`, `meta.redacted`) lub modyfikuje treść.

### Prompt Injection (`promptInjection.ts`)

Wykrywa w treściach dostarczonych przez użytkownika struktury o charakterze
adwersarialnym i egzekwuje skonfigurowane zasady. Zachowaniem sterują zmienne
środowiskowe i opcje konstruktora:

| Ustawienie      | Zmienna środowiskowa                                                                                 | Wartość domyślna | Działanie                                                                                                                                                                                                                                             |
| --------------- | ---------------------------------------------------------------------------------------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Włączone        | `INPUT_SANITIZER_ENABLED`                                                                            | `true`           | Gdy ustawiono `false`, mechanizm zabezpieczający natychmiast kończy działanie.                                                                                                                                                                        |
| Tryb            | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                      | `warn`           | Zasada obsługi wstrzyknięć: `block`, `warn` lub `log`. (`redact` jest akceptowane w celu zachowania zgodności wstecznej, ale **nie** usuwa tekstu wstrzyknięcia; przepisywanie danych PII w żądaniu jest kontrolowane przez `PII_REDACTION_ENABLED`.) |
| Próg blokowania | opcja `blockThreshold` / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`           | Minimalny poziom ważności wymagany do zablokowania. Przy ustawieniu domyślnym poziom średni jest tylko obserwowany.                                                                                                                                   |

**Kolejność pierwszeństwa trybu** (`getMode`): `options.mode` wywołującego →
**nadpisanie przez flagę funkcji w bazie danych** `INJECTION_GUARD_MODE` (Panel → Ustawienia →
Flagi funkcji) → zmienna środowiskowa `INJECTION_GUARD_MODE` → zmienna środowiskowa `INPUT_SANITIZER_MODE` →
`warn`. Nadpisanie w panelu ma zatem pierwszeństwo przed zmiennymi środowiskowymi, dzięki czemu interfejs
Flag funkcji steruje działającym mechanizmem zabezpieczającym na żywo (bez ponownego uruchamiania). Odczyt z bazy danych jest odporny na błędy:
jeśli wystąpi błąd, mechanizm zabezpieczający powraca do zachowania opartego na zmiennych środowiskowych, a gdy nie
ustawiono nadpisania, zachowanie jest identyczne jak przy rozstrzyganiu wyłącznie na podstawie zmiennych środowiskowych.

Źródła wykrywania:

1. `sanitizeRequest()` z `@/shared/utils/inputSanitizer` (współdzielony zestaw detektorów
   używany w innych miejscach potoku).
2. Wbudowane `DEFAULT_GUARD_PATTERNS` (obecnie `system_override_inline` i
   `markdown_system_block`, oba o poziomie ważności `high`).
3. Opcjonalne `customPatterns` przekazane przez opcje konstruktora (ciągi znaków, wyrażenia regularne
   lub rekordy `{ name, pattern, severity }`).

Gdy `mode === "block"` **i** co najmniej jedno wykrycie osiąga próg
ważności, `preCall` zwraca `{ block: true, message: "Request rejected:
suspicious content detected" }`. W trybach `warn`/`log` mechanizm zabezpieczający zapisuje zdarzenie w dzienniku, ale
zezwala na wywołanie. Współdzielona funkcja pomocnicza `evaluatePromptInjection()` jest również eksportowana
dla wywołujących, którzy muszą oceniać prompty bez korzystania z rejestru.

**Limit skanowania (v3.8.20):** detektor sprawdza tylko **pierwsze 16 KB**
połączonego tekstu promptu — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bajty) w
`src/shared/utils/inputSanitizer.ts`. Zarówno `detectInjection()`, jak i
`evaluatePromptInjection()` wykonują `slice(0, MAX_INJECTION_SCAN_BYTES)` przed uruchomieniem
pętli wzorców. Dyrektywy wstrzyknięć znajdują się blisko początku danych wejściowych, więc
ogranicza to użycie CPU przez wyrażenia regularne i GC w przypadku ładunków o rozmiarze kilkuset KB bez osłabiania wykrywania (por.
#3932, #4041).

### Maskowanie danych uwierzytelniających (`credentialMasker.ts`)

Działa na **obu** etapach, jako ostatni element domyślnego łańcucha (priorytet `95`). Redaguje
dobrze znane wzorce kluczy API / tajnych tokenów w wychodzącym ładunku (treści
wiadomości, argumentach wywołań narzędzi i wynikach narzędzi) **oraz** w odpowiedzi dostawcy, dzięki czemu
dane uwierzytelniające wklejone do promptu (lub zwrócone przez wynik narzędzia) nie wyciekną
do dostawcy zewnętrznego ani z powrotem do klienta.

- **Tylko po wyraźnym włączeniu**, zgodnie z tą samą konwencją co redagowanie danych PII (w pobliżu Twardej reguły nr 20):
  wyłączone, chyba że `settings.credentialRedactionEnabled === true` **lub**
  `CREDENTIAL_REDACTION_ENABLED=true`. Gdy funkcja jest wyłączona, mechanizm zabezpieczający nie wykonuje żadnych działań —
  nigdy nie blokuje ani nie przepisuje danych.
- `redactCredentials()` przechodzi przez całe drzewo ładunku/odpowiedzi (`walkValue()`,
  bezpiecznie względem zatruwania prototypu i cykli dzięki `WeakSet`) oraz zastępuje dopasowania
  symbolem zastępczym `[REDACTED:<type>]`, klonując tylko te gałęzie, które faktycznie
  się zmieniły.
- `CREDENTIAL_PATTERNS` obejmuje klucze dostawców LLM (OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), tokeny VCS/SaaS (GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), klucze płatnicze (Stripe, Square), klucze
  chmurowe (klucz dostępu AWS, Twilio, SendGrid, Mailgun), klucze prywatne / JWT,
  ciągi połączeń zawierające dane uwierzytelniające (`mongodb://user:pass@...` itd.) oraz
  ogólny wzorzec wartości nagłówków `Authorization`/`x-api-key`/`api-key`/`apikey`.
  Klucze mające postać nagłówków (`authorization`, `x-api-key`, `api-key`,
  `apikey`) są redagowane strukturalnie (tylko wartość, z zachowaniem prefiksu schematu, takiego jak
  `Bearer `/`Basic `), a nie za pomocą ogólnego tekstowego wyrażenia regularnego.
- Mechanizm zabezpieczający nigdy nie blokuje; jedynie przepisuje (`modifiedPayload` /
  `modifiedResponse`) i dodaje adnotacje (`meta.credentialsRedacted`, `meta.count`).

Zabezpieczenie przed regresją: `tests/unit/credential-masker-guardrail.test.ts`.

## Kontrakt bazowy (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // wartość true powoduje natychmiastowe przerwanie łańcucha
  message?: string; // udostępniany w przypadku zablokowania
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // zwracany przez preCall w celu zmodyfikowania żądania
  modifiedResponse?: TValue; // zwracany przez postCall w celu zmodyfikowania odpowiedzi
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

Mechanizm ochronny sygnalizuje „brak zmian”, zwracając `void`, `{}` lub
`{ block: false }`. Zwrócenie `modifiedPayload`/`modifiedResponse` zastępuje
wartość przekazywaną w łańcuchu do kolejnych mechanizmów ochronnych.
`signal?: AbortSignal` przekazuje cykl życia wywołującego do mechanizmów ochronnych. Przerwanie żądania jest celowym wyjątkiem typu fail-open: mosty multimedialne zatrzymują pracę i zwalniają zasoby bez przywracania surowych danych multimedialnych dla obiektu docelowego, o którym wiadomo, że ich nie obsługuje.

## Registry (`registry.ts`)

Singleton `guardrailRegistry` udostępnia:

- `register(guardrail)` — dodaje (lub zastępuje po znormalizowanej nazwie) guardrail i
  ponownie sortuje rosnąco po `priority`.
- `clear()` / `list()` — helpery administracyjne.
- `runPreCallHooks(payload, context)` — iteruje aktywne guardrails, przepuszcza
  payload przez `modifiedPayload` i zatrzymuje się na pierwszym `block: true`.
- `runPostCallHooks(response, context)` — ten sam przepływ po stronie odpowiedzi.
- `resetGuardrailsForTests({ registerDefaults })` — czyści stan i opcjonalnie
  ponownie rejestruje domyślne guardrails dla czystej izolacji testów.

Oba runnery zwracają `{ blocked, payload|response, results, guardrail?, message? }`,
gdzie `results` to tablica rekordów `GuardrailExecutionResult` zawierających
per-guardrail pola `blocked`, `skipped`, `modified`, `error` i `meta`,
przydatne do tracingu.

### Wyłączanie guardrails per-request

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` agreguje
zdeduplikowaną listę nazw guardrails, które należy pominąć dla bieżącego
żądania. Źródła (wszystkie opcjonalne, wszystkie scalane):

- `apiKeyInfo.disabledGuardrails`
- body żądania `disabledGuardrails` (top-level)
- body żądania `metadata.disabledGuardrails`
- nagłówek `x-omniroute-disabled-guardrails` (lub legacy
  `x-disabled-guardrails`)

Wartości mogą być tablicami stringów albo stringiem rozdzielonym przecinkami;
nazwy są normalizowane do lowercase kebab-case (`pii_masker` → `pii-masker`).
Wynik trafia przez `context.disabledGuardrails` do registry, które pomija
pasujące guardrails (`skipped: true` w `results`).

## Kolejność wykonania

Dla każdego żądania przepływającego przez `src/sse/handlers/chat.ts` i
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` buduje listę pominięć z API key, body
   i nagłówków.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` uruchamia guardrails w rosnącej
   kolejności priority:
   - Wyłączone guardrails są zapisywane jako `skipped`.
   - `preCall` każdego guardraila może przepisać payload przez `modifiedPayload`.
   - Pierwsze `block: true` short-circuituje łańcuch, a handler zwraca
     odpowiedź odrzucenia guardraila.
3. (Ewentualnie przepisany) payload trafia do combo routing i dispatch upstream.
4. Po złożeniu odpowiedzi `guardrailRegistry.runPostCallHooks(...)`
   uruchamia ten sam łańcuch na odpowiedzi. `block: true` tutaj odrzuca
   odpowiedź upstream.

Guardrails, które rzucą wyjątek, są zapisywane z `error: <message>` i logowane
przez `logger.warn`, ale łańcuch kontynuuje — fail-open z założenia.

## Konfiguracja

Zmienne środowiskowe odczytywane przez wbudowane guardrails:

| Variable                              | Used by                   | Effect                                                                                                  |
| ------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Ustaw `false`, aby całkowicie wyłączyć detekcję.                                                        |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Polityka injection: `warn`, `block` lub `log`. Legacy wartość `redact` nie przepisuje tekstu injection. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Tryb injection guard; także flaga feature w DB, która **nadpisuje** zmienne env (DB > ENV).             |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Minimalna severity, którą `MODE=block` odrzuca: `high` (domyślnie), `medium` lub `low`.                 |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Legacy alias dla `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                     |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Gdy `true`, PII w żądaniu jest redagowane (niezależnie od trybu injection).                             |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Kontroluje zachowanie maskera po stronie odpowiedzi.                                                    |

Vision Bridge czyta konfigurację runtime ze store ustawień opartego o DB
(`getSettings()`), nie ze zmiennych env: `visionBridgeEnabled`, `visionBridgeModel`,
`visionBridgePrompt`, `visionBridgeTimeout`, `visionBridgeMaxImages`. Domyślne
wartości są w `src/shared/constants/visionBridgeDefaults.ts`.

## Własne guardrails

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

Kroki:

1. Utwórz `src/lib/guardrails/myGuardrail.ts` rozszerzający `BaseGuardrail`.
2. Zaimplementuj `preCall` i/lub `postCall`.
3. Zarejestruj przy imporcie (push z `registerDefaultGuardrails`) albo
   wywołaj `guardrailRegistry.register(...)` w runtime — registry zastępuje
   wcześniejszy guardrail o tej samej znormalizowanej nazwie.
4. Dodaj testy w `tests/unit/` (istniejące przykłady:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## Testowanie

Używaj `resetGuardrailsForTests()` między testami, aby startować ze znanego stanu.
Przekaż `{ registerDefaults: false }`, aby zacząć z pustym registry i
zarejestrować tylko guardrails pod testem. Guardrail Vision Bridge przyjmuje
dependency injection (`deps.getSettings`, `deps.callVisionModel`), więc testy mogą
przećwiczyć pełny przepływ bez dostępu do DB ani sieci.

## Zobacz też

- `src/lib/guardrails/` — implementacja
- `src/shared/utils/inputSanitizer.ts` — współdzielony detektor napędzający
  prompt-injection i maskowanie PII
- `src/shared/constants/visionBridgeDefaults.ts` — domyślne wartości Vision Bridge i
  lista modeli forced-bridge
- `docs/architecture/RESILIENCE_GUIDE.md` — warstwa ortogonalna (circuit breaker, cooldowns)
- `docs/reference/ENVIRONMENT.md` — pełna referencja zmiennych env

## Pokrycie tras injection-guard i red-team (Phase 8 · Block D)

Injection-guard (`createInjectionGuard` / `withInjectionGuard`) obejmuje wszystkie trasy,
które przyjmują prompy użytkownika. Szanuje `INJECTION_GUARD_MODE` (domyślnie `warn` = tylko log;
`block` = zwraca HTTP 400 `SECURITY_001`).

| Type            | Routes                                                                                                                                               | Default mode |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Text (existing) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn         |
| Generative      | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn         |
| Data            | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn         |

Ekstrakcja tekstu (`extractMessageContents`) obejmuje `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (nightly, `nightly-llm-security.yml`):** promptfoo weryfikuje, że każda trasa blokuje
korpus OWASP-LLM przy `INJECTION_GUARD_MODE=block`; garak uruchamia probe'y (pomija bez secretu).
`moderations` jest włączone dla spójności — operatorzy w trybie block mogą je wyłączyć przez
`resolveDisabledGuardrails`.

Workflow nightly (`.github/workflows/nightly-llm-security.yml`, cron + ręczny
dispatch) ma dwa joby:

- **`promptfoo-guard` (blocking)** — uruchamia `promptfoo eval -c promptfooconfig.yaml`
  z `INJECTION_GUARD_MODE=block`. Każdy przypadek adversarialny (np. „ignore all
  previous instructions…”, jailbreaki w stylu DAN) asertuje, że odpowiedź niesie
  `error.code === "SECURITY_001"`, tzn. guard faktycznie odrzucił żądanie.
- **`garak` (advisory)** — uruchamia garak `--probes promptinject,dan,leakreplay`
  przeciw lokalnej instancji OmniRoute (`http://localhost:20128/v1`). Bramkowany
  secretem providera (`PROMPTFOO_PROVIDER_KEY`); pomija łagodnie i jest sufiksowany
  `|| true`, więc raportuje bez failowania CI.

Pokrycie helpera guarda (`createInjectionGuard` / `withInjectionGuard`)
obejmuje każdą trasę `/v1` niosącą prompt; tekst promptu jest pobierany z
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` przez
`extractMessageContents()` w `src/shared/utils/inputSanitizer.ts`.
