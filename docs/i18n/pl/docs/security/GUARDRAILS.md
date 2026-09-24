# Guardrails (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇧🇦 [bs](../../../bs/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇰🇷 [ko](../../../ko/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **Źródło prawdy:** `src/lib/guardrails/`
> **Ostatnia aktualizacja:** 2026-08-29 — v3.8.51 (Pochodzenie transkrypcji Video Bridge jest deklarowane przez dzwoniącego,
> jeszcze nie zweryfikowane przez serwer — wyjaśniono zgodnie z #11661)

Guardrails wymuszają bezpieczeństwo, politykę i transformacje treści na granicy
między OmniRoute a dostawcami upstream. Każdy guardrail może kontrolować (i
opcjonalnie odrzucać, przekształcać lub dodawać adnotacje) ładunki żądań (`preCall`)
oraz odpowiedzi upstream (`postCall`).

System działa w trybie **fail-open**: jeśli guardrail zgłosi błąd podczas wykonywania,
rejestr zapisuje błąd i kontynuuje pracę z następnym guardrailem, zamiast przerywać
żądanie. Blokowanie jest jawną decyzją (`block: true`), nigdy przypadkiem.

## Wbudowane Guardrails

Rejestr automatycznie ładuje sześć guardraili w kolejności priorytetów przy imporcie
(zobacz `registry.ts` → `registerDefaultGuardrails()`):

| Priorytet | Nazwa               | Etap(y)        | Plik                  |
| --------- | ------------------- | -------------- | --------------------- |
| `5`       | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`       | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`       | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`      | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`      | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`      | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

Niższe numery priorytetów są uruchamiane **jako pierwsze**.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

Przechwytuje żądania zawierające obrazy skierowane do **modeli niewizyjnych** i albo
przekierowuje całe żądanie do modelu obsługującego wizję, albo zastępuje części
obrazu opisami tekstowymi wygenerowanymi przez konfigurowalny model wizyjny przed
wywołaniem upstream. Pozwala to dostawcom obsługującym wyłącznie tekst na
transparentną obsługę ładunków multimodalnych.

Przepływ:

1. Pomiń, jeśli model docelowy obsługuje już wizję (chyba że znajduje się na liście
   wymuszonego mostkowania `isVisionBridgeForcedModel`).
2. Wyodrębnij części obrazu za pomocą `extractImageParts(messages)`
   (`visionBridgeHelpers.ts`), który deleguje zadanie do **uproszczonego detektora
   mediów** `detectMediaParts()` w `open-sse/utils/mediaParts.ts` — jedynego
   źródła prawdy współdzielonego z filtrem kompatybilności combo.
   Wyodrębnianie jest ograniczone do części najwyższego poziomu o strukturach,
   które `replaceImageParts` może z powrotem połączyć (kontrakt extract↔replace):
   OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL
   `source.type:"url"` oraz Responses API `input_image`. Zagnieżdżone trafienia i
   struktury będące tylko wskaźnikami są domeną filtra combo i nigdy nie są
   wyodrębniane. Pomiń, jeśli nie znaleziono żadnych.
3. Rozwiąż konfigurację runtime za pomocą `resolveVisionBridgeRuntimeSettings()`
   (`src/shared/constants/modalityBridgeDefaults.ts`): nowe klucze ustawień
   `modalityBridge*` wygrywają; starsze klucze `visionBridge*` pozostają jako
   **fallback na jeden cykl** (okno wycofania zmian). Pomiń przed jakimkolwiek
   przetwarzaniem mediów, gdy mostek jest wyłączony.
4. Selektor trybu (`modalityBridgeVisionMode`, patrz tabela poniżej) decyduje o
   przekierowaniu (reroute) lub opisie (describe). Przekierowanie zwraca
   `modifiedPayload` tylko ze zmienionym `model`, plus meta `{ rerouted, fromModel, toModel, imagesKept }`.
5. Ścieżka opisu: ogranicz obrazy do `maxImages`, utwórz prompt uwzględniający zadanie,
   sprawdź pamięć podręczną opisów, wywołaj model wizyjny **równolegle**
   (`Promise.allSettled`) i wstrzyknij części tekstowe `[Image N]: <description>`
   w ich miejsce. Nieudany opis zwraca `null`, a oryginalna część obrazu zostaje
   **zachowana** (#4012) — z wyjątkiem ścieżki opisu combo, gdy wszystkie opisy
   zawiodły; wtedy potwierdzony upstream niewizyjny otrzymuje zamiast tego zaślepkę
   `(unavailable — no vision-capable provider connected)` (#8430).
6. Zwróć `modifiedPayload` + meta (`imagesProcessed`, `descriptions`,
   `processingTimeMs`, `visionModel`).

#### Selektor trybu (`modalityBridgeVisionMode`)

| Tryb       | Domyślny | Zachowanie                                                                                                                                                                                                                                                                                                        |
| ---------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔        | Starsza heurystyka, niezmieniona (#6640/#7204): modele inne niż combo/`auto/` są przekierowywane do najlepszego modelu wizyjnego, chyba że oryginalny model ma już użyteczne poświadczenia (wtedy opis); cele combo zawsze są opisywane.                                                                          |
| `describe` |          | Zawsze opisuj — blokada przekierowania jest całkowicie pomijana; wybrany przez użytkownika model zawsze odpowiada.                                                                                                                                                                                                |
| `reroute`  |          | Wymuś przekierowanie: blokada zachowania modelu z poświadczeniami jest pomijana. Blokada poświadczeń dla **celu** przekierowania nadal obowiązuje — gdy nie istnieje żaden użyteczny cel wizyjny, żądanie przechodzi do opisu, aby surowe obrazy nigdy nie trafiły do backendu obsługującego tylko tekst (#8430). |

Wymuszone tryby przerywają działanie **zanim** zostanie uruchomiona heurystyka auto;
zachowanie `auto` jest identyczne co do bajta z guardrailem sprzed PR-1.

#### Prompt opisu uwzględniający zadanie (`modalityBridgeVisionTaskAware`)

Domyślnie **true**. `composeVisionPrompt()` (`visionBridgeHelpers.ts`) dołącza
tekst **ostatniej wiadomości użytkownika** (skrócony do 500 znaków) do bazowego
promptu opisu, kierując opis w stronę tego, o co faktycznie zapytał użytkownik
(wzorzec codex-vision-proxy) i prosząc model wizyjny o transkrypcję widocznego
tekstu. Przy wyłączonej fladze — lub braku tekstu użytkownika — bazowy prompt
jest używany bez zmian.

Własne żądanie zgodne z OpenAI dla pętli zwrotnej opisu (`callVisionModelSingle()`
w `visionBridgeHelpers.ts`) zawsze żąda `image_url.detail: "high"` —
bezwarunkowo, dla każdego wywołującego/dostawcy, bez uzależnienia od sygnału klienta.
Próbkowanie o niskiej szczegółowości obniża dokładność OCR dokładnie dla zadania transkrypcji tekstu,
o które prosi ten prompt, więc samo wywołanie opisu zawsze prosi o wysoką
szczegółowość, niezależnie od poziomu szczegółowości użytego w oryginalnym żądaniu przychodzącym. Dotyczy to
tylko wewnętrznego ciała żądania opisu; nie zmienia to sposobu, w jaki
OmniRoute przekazuje własne `image_url.detail` wywołującego w głównym żądaniu —
ta wartość domyślna jest stosowana oddzielnie i tylko dla wykrytych klientów OpenCode, w
`defaultImageDetail()` (`open-sse/handlers/chatCore/upstreamBody.ts`). Gałąź formatu Anthropic
dla pętli zwrotnej opisu nie ma pola `detail` i nie ma na nią wpływu żadna z tych wartości domyślnych.

#### Limit wyjścia opisu (`modalityBridgeVisionMaxChars`)

| Klucz                          | Domyślne | Zakres            |
| :----------------------------- | :------- | :---------------- |
| `modalityBridgeVisionMaxChars` | `0`      | `0` lub 100–50000 |

`0` (domyślnie) oznacza **brak limitu** — opis zwrócony przez
`callVisionModel()` jest przekazywany bez modyfikacji, zachowując istniejące
zachowanie. Dowolna wartość z zakresu 100–50000 obcina opis sufiksem `…`
zanim zostanie on wstawiony z powrotem jako `[Image N]: <description>`
(`VisionBridgeGuardrail.preCall()` w `src/lib/guardrails/visionBridge.ts`).
Zwiększ tę wartość dla zadań OCR wymagających dużej szczegółowości, gdzie model docelowy potrzebuje
pełnej transkrypcji; zmniejsz ją, aby ograniczyć użycie tokenów w gadatliwych modelach wizyjnych.
Pole w panelu kontrolnym znajduje się w zakładce Vision, w panelu Advanced
(`modality-bridge-max-chars` w `ModalityBridgeVisionTab.tsx`) i zaokrągla każdą
wartość między 1 a 99 do dolnej granicy 100, pozostawiając jawne `0`
nietknięte — `0` jest prawidłową wartością Zod samo w sobie
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`), a nie tylko
„nieustawioną” wartością domyślną.

#### Pamięć podręczna opisu (`modalityBridge/bridgeCache.ts`)

W pamięci podręcznej LRU + TTL dla wyników opisu, współdzielona w całym procesie.
Klucz = `sha256(imageRef + composedPrompt + configuredBridgeModel)` z
ramkowaniem z prefiksem długości (brak kolizji granic pól). Komponent modelu to
**skonfigurowany** model mostu, a nie model, który faktycznie odpowiedział —
`callVisionModel` może wewnętrznie sięgać po alternatywy, a kluczowanie dla każdej próby
fragmentowałoby pamięć podręczną. Nieudane opisy nigdy nie są buforowane. Ustawienia:

| Klucz                           | Domyślne | Zakres  |
| :------------------------------ | :------- | :------ |
| `modalityBridgeCacheEnabled`    | `true`   | —       |
| `modalityBridgeCacheTtlMinutes` | `60`     | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`    | 10–5000 |

#### Normalizacja obrazów zdalnych (pętla zwrotna opisu/pobieranie base64)

Gdy most sam pobiera **zdalny** obraz — wywołanie zwrotne opisu Anthropic i konwersja base64 w formacie claude-wire
(`ensureBase64ImagesForClaudeWire`), oba za pośrednictwem
`fetchRemoteImageAsDataUri()` w `visionBridgeHelpers.ts` — wynikowy URI danych
jest przepuszczany przez `normalizeDataUri()`
(`open-sse/utils/imageNormalize.ts`) przed osadzeniem w żądaniu modelu wizyjnego.
Obrazy o zbyt dużym rozmiarze są skalowane w dół do **długiej krawędzi 2048px** (co odpowiada
limitowi rozmiaru, który OpenAI/Anthropic już stosują po stronie serwera), co zmniejsza
liczbę bajtów/opóźnienie przesyłania bez zmiany tego, co widzi model wizyjny. Zmiana rozmiaru
wykorzystuje `sharp`, ładowany poprzez dynamiczny import: na platformie, gdzie jego natywny
plik binarny nie może się załadować, `normalizeDataUri()` **nigdy nie zgłasza błędu** —
wraca do przekazywania oryginalnych bajtów, więc ścieżka opisu/konwersji base64
zawsze działa. Bajty niebędące obrazem (pobieranie, które nie zwróciło obrazu do dekodowania)
są również przekazywane bez zmian. Ta normalizacja jest ograniczona do obrazów, które most
pobiera dla własnego wywołania zwrotnego — nigdy nie jest stosowana do surowego ładunku przekazywanego przez wywołującego,
zgodnie z zasadą mutacji tylko na zasadzie opt-in (Twarda Zasada #20).

#### Schemat ustawień + migracja

Nowe klucze `modalityBridge*` są walidowane przez Zod w `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`): `modalityBridgeVisionEnabled`,
`modalityBridgeVisionMode`, `modalityBridgeVisionModel`,
`modalityBridgeVisionTaskAware`, `modalityBridgeVisionPrompt`,
`modalityBridgeVisionTimeout`, `modalityBridgeVisionMaxImages`,
`modalityBridgeVisionMaxChars`, trio `modalityBridgeCache*` oraz
grupa `modalityBridgeAudio*` używana przez Most Audio. Migracja
`141_modality_bridge_settings.sql` kopiuje istniejące starsze wartości
`visionBridge*` do pasujących nowych kluczy (idempotentna, nigdy nie nadpisuje
wartości `modalityBridge*` ustawionej przez operatora); starsze klucze pozostają akceptowane jako
awaryjne odczyty przez jeden cykl wydawniczy.

#### Nagłówek przejrzystości + statystyki

Odpowiedzi przetworzone przez opis zawierają
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`
(zbudowany przez `buildModalityBridgeHeader()` w `modalityBridge/bridgeStats.ts`,
oznaczony przez `withModalityBridgeHeader()` w `src/sse/handlers/chatHelpers.ts`).
Przekierowane żądania **nie** otrzymują nagłówka — ładunek pozostał nietknięty, a zmiana modelu
jest już widoczna w polu `model` w treści odpowiedzi.

`GET /api/modality-bridge/stats` (uwierzytelnianie zarządzania, ten sam poziom co
`GET /api/settings`) zwraca liczniki w pamięci dla poszczególnych modalności
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }` dla `vision`, `audio` i
`video`. `averageLatencyMs` używa `latencySamples`, a nie wszystkich prób, jako
mianownika; operacja bez pomiaru czasu nie generuje próbki zeromilisekundowej.
`bridged` pozostaje wstecznie kompatybilnym aliasem dla udanych konwersji;
nieudane próby go nie zwiększają.
Liczniki resetują się po ponownym uruchomieniu procesu z założenia
(telemetria, a nie księgowość).

#### Konfiguracja panelu kontrolnego

Dedykowana strona panelu kontrolnego to
`/dashboard/settings/modality-bridge`. Jej adresowalne przez URL zakładki `Vision`, `Audio`
i `Video` zachowują parametry zapytania podczas przełączania wartości `tab`.
Zakładka Vision udostępnia włączanie, tryb, wybór modelu (w tym automatyczny
domyślny), podpowiedzi uwzględniające zadania, zaawansowane limity czasu/obrazu/długości opisu/pamięci
podręcznej, liczniki czasu wykonania oraz chronione przykładowe żądanie. Zakładka Audio również działa na żywo:
udostępnia włączanie, selektor modelu tylko STT z opcją Auto, limity czasu/maksymalnej długości klipu, liczniki audio
oraz przykładowy test `input_audio`. Zakładka Video jest funkcjonalna: raportuje
stan wykonania FFmpeg/ffprobe — jeden z czterech jawnych stanów interfejsu użytkownika (`unknown` podczas
gdy sonda jest w trakcie działania lub nie mogła się zakończyć, `restricted` na hoście panelu kontrolnego
innym niż loopback, gdzie sonda jest pomijana po stronie klienta, `unavailable` po sprawdzeniu
i potwierdzeniu braku, lub `available` z wersjami FFmpeg/ffprobe) — zachowuje
limity włączania/modelu/klatek/wideo/czasu, filtruje selektor modelu do modeli obsługujących wizję
i udostępnia liczniki wideo.

Poprzednia karta Vision Bridge w ustawieniach AI to link kompatybilności do
nowej strony; nie posiada już drugiej kopii formularza. Dostawcy Mediów (Media Providers) również
łączą przepływy pracy Image-to-Text i Speech-to-Text z odpowiednimi zakładkami Modality
Bridge, nie usuwając istniejącego placu zabaw Speech-to-Text.

**Ominięcie kontroli dostępu pętli zwrotnej:** gdy wywołanie `describe` jest kierowane przez własną
pętlę zwrotną OmniRoute `/v1` (niestandardowy model dostawcy), podzapytanie wysyła
`x-omniroute-admission-bypass: internal` i jest uwierzytelniane za pomocą rozwiązanych
poświadczeń pętli zwrotnej — lokalnego strażnika `sk_omniroute` w trybie lokalnym, lub
skonfigurowanego przez operatora klucza środowiskowego `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` (#1350),
aby wdrożenia z `REQUIRE_API_KEY=true` nadal mogły uruchamiać wywołanie `describe`. Ominięcie
jest honorowane tylko dla tych dokładnych poświadczeń, więc zewnętrzni klienci nie mogą używać
nagłówka do pominięcia kontroli dostępu.

Starsze wartości domyślne znajdują się w `src/shared/constants/visionBridgeDefaults.ts`;
nowe wartości domyślne trybu/uwzględniające zadania/pamięci podręcznej oraz resolver ustawień znajdują się w
`src/shared/constants/modalityBridgeDefaults.ts`. Zabezpieczenie udostępnia opcję konstruktora
`deps`, dzięki czemu testy mogą wstrzykiwać fałszywe implementacje `getSettings`
i `callVisionModel`.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

Przechwytuje żądania czatu zawierające audio, zanim dotrą one do celu, który nie jest
znany z akceptowania danych wejściowych audio. Nigdy nie przekierowuje żądania czatu: części audio są
transkrybowane za pośrednictwem istniejącego punktu końcowego multipart zgodnego z OpenAI, a wybrany
model czatu kontynuuje pracę z transkrypcjami tekstowymi.

Przebieg:

1.  Rozwiąż `supportsAudio` za pomocą `getResolvedModelCapabilities()`. Jawne
    metadane rejestru dostawcy mają pierwszeństwo, następnie statyczne metadane modelu, a potem zsynchronizowane
    `modalities_input`. Zadeklarowana lista wejść bez `audio` to `false`; brak
    dowodów na możliwości pozostaje `null`. Zarówno `false`, jak i `null` aktywują
    konserwatywny mostek, podczas gdy `true` go omija.
2.  Rozwiąż ustawienia `modalityBridgeAudio*` i wyodrębnij możliwe do połączenia części audio
    najwyższego poziomu z każdej wiadomości za pomocą wspólnego detektora `detectMediaParts()`.
    Obsługiwane formaty to OpenAI `input_audio`, `audio_url` i
    `source.media_type: "audio/*"`. Zagnieżdżone audio jest wykrywane do routingu, ale nie
    jest usuwane przez ścieżkę łączenia. Praca jest ograniczona przez `modalityBridgeAudioMaxClips`;
    późniejsze części pozostają nietknięte.
3.  Użyj skonfigurowanego `provider/model` lub pozwól `selectAudioBridgeModel()` przejść
    przez `AUDIO_TRANSCRIPTION_PROVIDERS` w stabilnej kolejności katalogowej i wybrać pierwszy
    model z użytecznymi aktywnymi poświadczeniami dostawcy.
4.  `callAudioTranscription()` konwertuje audio base64/data-URI na wieloczęściowy `file`
    lub pobiera zdalny `audio_url` przez publiczną bramę wychodzącą z przypinaniem DNS
    i limitem 25 MB. Następnie wysyła plik i wybrany model metodą POST do lokalnej
    pętli zwrotnej `/v1/audio/transcriptions`, uwierzytelnionej za pomocą `resolveSelfLoopBearer()`.
    Istniejąca trasa transkrypcji wykonuje normalne wyszukiwanie poświadczeń, obsługę
    czasu odnowienia/limitów szybkości i wysyłanie do dostawcy.
5.  Pomyślne wywołania zastępują swoje części `[Audio N]: <transcript>`. Wywołania
    są uruchamiane za pomocą `Promise.allSettled`: indywidualna awaria zachowuje oryginalną
    część audio (kontrakt #4012). Jeśli każde wywołanie zakończy się niepowodzeniem, a cel
    ma potwierdzone `supportsAudio === false`, części stają się
    `[Audio N]: (niedostępne — brak podłączonego dostawcy STT)` (kontrakt #8430). Dla
    nieznanego celu (`null`) wynik wszystkich niepowodzeń pozostaje nietknięty. Potwierdzony
    cel tylko tekstowy bez użytecznych poświadczeń STT otrzymuje ten sam jawny stub
    bez wykonywania wywołania sieciowego.

Pomyślne transkrypcje wykorzystują pamięć podręczną LRU/TTL Modality Bridge dla całego procesu.
Klucz łączy odniesienie do audio, stabilną etykietę operacji `audio-transcription`
i wybrany model STT; błędy nigdy nie są buforowane. Próby audio aktualizują
wspólne liczniki `bridged`, `cacheHits`, `failures` i `lastUsedAt`.
Przekształcone odpowiedzi zawierają
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`; nietknięte
żądania nie otrzymują segmentu Audio Bridge.

Ustawienia środowiska wykonawczego są przechowywane w bazie danych i walidowane przez Zod:

| Klucz                         | Domyślne | Zakres          |
| :---------------------------- | :------- | :-------------- |
| `modalityBridgeAudioEnabled`  | `true`   | —               |
| `modalityBridgeAudioModel`    | `""`     | Auto lub ID STT |
| `modalityBridgeAudioTimeout`  | `60000`  | 1000–300000     |
| `modalityBridgeAudioMaxClips` | `3`      | 1–10            |

Wspólna pamięć podręczna pozostaje kontrolowana przez `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes` i `modalityBridgeCacheMaxEntries`.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

Przechwytuje części wideo najwyższego poziomu w `messages` Chat Completions i `input` API Responses, zanim zostanie wywołany cel bez znanego natywnego wsparcia dla wideo. Obsługiwane formaty to `input_video`, `video_url`, `video_source`, adresy URL HTTPS oraz URI danych `data:video/*;base64,...`. Zwykłe nazwy plików w tekście nie są traktowane jako wideo.

`VideoBridgeGuardrail.preCall` (`videoBridge.ts`) odpowiada za przechodzenie żądań, sprawdzanie możliwości/polityki, agregację dla każdego żądania oraz ładunek odpowiedzi. Praca dla każdego wideo — pozyskiwanie, pamięć podręczna całego wyniku, opisywanie sekwencji klatek (która łączy wszelkie zadeklarowane przez wywołującego transkrypcje audio) oraz metryki/przerwanie/czyszczenie dla każdej próby — jest ukryta za `processVideoPart` w `videoBridgePipeline.ts`, wywoływanym raz dla każdej części wideo w pętli `preCall`. Moduł ten definiuje również jawne granice portów: `VideoMediaBrokerPort` (pozyskiwanie bajtów i ekstrakcja próbkowanych klatek), `VideoAudioTranscriptionPort` (łączenie zadeklarowanej przez wywołującego transkrypcji audio z próbkowanymi napisami) oraz `VideoDrilldownPort` (granica trwałości szczegółowej analizy klatek; jeszcze nie podłączona do `processVideoPart` — tylko oddzielna trasa `/api/modality-bridge/video/drilldown` zapisuje dziś wpisy szczegółowej analizy).

Publiczna ścieżka żądania `/v1` nigdy nie importuje ani nie wywołuje podprocesu. Zdalne wideo są pobierane z ograniczeniem do 50 MiB; wbudowane wideo base64 mają konserwatywny limit 36 MiB po dekodowaniu na wideo, aby koperta modelu/wiadomości/ramkowania mogła pozostać w publicznym limicie dopuszczalności żądań JSON wynoszącym 50 MiB. Długość wbudowana i szacunki rozmiaru po dekodowaniu są sprawdzane przed alokacją. HTTPS jest wymagany dla początkowego zdalnego adresu URL i każdego przekierowania, z wykorzystaniem istniejącej, tylko publicznej ochrony wychodzącej z przypinaniem DNS. Bajty przekraczają następnie dokładną wewnętrzną granicę brokera `POST /api/modality-bridge/video/extract`. Ta trasa jest zarówno `LOCAL_ONLY`, jak i `SPAWN_CAPABLE`, akceptuje tylko uwierzytelnione, zaufane żądanie loopback dla każdego procesu i nigdy nie akceptuje adresu URL, ścieżki systemu plików, pliku wykonywalnego ani listy argumentów. Potok rozmiaru treści API i inkrementalny czytnik treści obsługi niezależnie egzekwują limit wejściowy brokera wynoszący 50 MiB. Jego ograniczona kolejka wykonuje jedną ekstrakcję naraz, pozwala na cztery oczekujące zadania i ogranicza oczekujące dane wejściowe do 100 MiB.

Wewnątrz brokera, `ffprobe` odczytuje prywatny plik lokalny; stała lista dozwolonych formatów wyklucza formaty playlist i manifestów. Dla dozwolonych kontenerów z rodziny MOV, zewnętrzne referencje danych MOV pozostają domyślnie wyłączone, a stałe polecenie ich nie aktywuje. Zarówno `ffprobe`, jak i `ffmpeg` używają białej listy protokołów tylko dla `file`, jednego wątku, stałych tablic argumentów, bez powłoki i plików wykonywalnych rozwiązywanych z `PATH`. Strumienie okładek z dołączonymi obrazami nie są kandydatami do odtwarzania. Wszystkie strumienie nadające się do odtwarzania muszą spełniać limity, a jawny strumień domyślny jest preferowany przed deterministycznym powrotem do najniższego indeksu. Wideo są ograniczone do 600 sekund, 8 192 pikseli na wymiar i 33 554 432 pikseli źródłowych. FFmpeg próbkuje 1–16 środkowych klatek JPEG, skaluje dłuższy bok do maksymalnie 1024 pikseli bez skalowania w górę mniejszych danych wejściowych i nigdy nie otrzymuje adresu URL. Próbkowanie jest domyślnie `uniform`. Opcjonalne polityki `scene_aware` i eksperymentalne `segment_aware` wykonują jedno dodatkowe stałe przejście FFmpeg przez już zweryfikowany strumień lokalny, wybierają ograniczone znaczniki czasu scen `showinfo` i deterministycznie wracają do tych samych jednolitych punktów środkowych w przypadku awarii detektora, przekroczenia limitu czasu, nieprawidłowego wyjścia lub pustego zestawu kandydatów. Tryb `segment-aware` alokuje próbki punktów środkowych proporcjonalnie do zweryfikowanych interwałów scen; dowody `segment-aware` i zachowanie awaryjne są szczegółowo opisane poniżej. Twardy limit 16 klatek jest stosowany po wyborze w każdej polityce. Gdy żądanie `scene-aware` ma budżet tylko na jedną klatkę, używa jednolitego punktu środkowego aktywnego pełnego wideo lub okna ostrości i zgłasza `policyEffective: uniform`: pojedyncza wybrana klatka sceny nie może zachować obu końców czasowych. Wywołujący może opcjonalnie podać skończone okno ostrości (sekundy `start`/`end`); granice są przycinane do czasu trwania mediów, odwrócone lub nieskończone okna są odrzucane, a wszystkie polityki próbkowania są wykonywane tylko wewnątrz znormalizowanego interwału. Wynikowe okno jest uwzględniane w metadanych próbkowania oraz w niezaufanym prefiksie opisu, aby modele niższego poziomu mogły odróżnić skupiony fragment od pełnej osi czasu.

Semantyczne skupienie napisów to oddzielne, jawne ustawienie. Domyślny tryb analizy `full` zachowuje istniejący prompt ramki i nigdy nie przekazuje tekstu żądania do modelu napisów. W trybie `focused` mostek odczytuje tylko najnowszy, niepusty tekst `text`/`input_text` stworzony przez użytkownika z tego samego kontenera Chat lub Responses, normalizuje go do NFC, zwija znaki kontrolne i białe znaki oraz ogranicza go do 500 punktów kodowych Unicode. Pusty wynik wraca do dokładnego promptu `full`. Użyteczna wskazówka jest serializowana jako JSON w dedykowanym bloku `untrusted-user-context` i może jedynie priorytetyzować obserwowalne szczegóły; nie może ona nadpisać oddzielnego ostrzeżenia przed wykonywaniem instrukcji widocznych lub słyszalnych w mediach. Skupienie tekstowe nigdy nie wnioskuje `start`/`end` ani nie zmienia samplera czasowego.

#### FU-07 dowody segmentów strukturalnych

`segment_aware` wykorzystuje jedno ograniczone przejście wstępnej analizy przez już zweryfikowany lokalny strumień wideo. Stały łańcuch filtrów najpierw skaluje do maksymalnie 320 pikseli szerokości, wykrywa zmiany scen i zamrożone interwały, a następnie próbkuje z szybkością 1 klatki na sekundę w celu uzyskania informacji o rozmyciu, średniej luminancji oraz informacji przestrzennych/czasowych. Przejście jest ograniczone do 600 próbek strukturalnych, jednego wątku FFmpeg/filtra, tych samych białych list protokołów i kontenerów tylko dla `file`, limitu wyjścia procesu 1 MiB i maksymalnie 30 sekund w ramach wspólnego limitu przerwania/terminu brokera. Nigdy nie akceptuje polecenia, filtra, ścieżki ani adresu URL z żądania.

Wartości strukturalne są deterministycznymi dowodami próbkowania, a nie semantycznym rozumieniem wideo. Nie wnioskują o podmiotach, akcjach, podpisach, mowie ani intencjach użytkownika. Granice scen i zamrożeń tworzą segmenty; pokrycie zamrożenia, rozmycie, ekspozycja, szczegóły przestrzenne i zmiany czasowe wpływają jedynie na sposób alokacji istniejącego budżetu 1–16 klatek. W pełni zamrożony segment jest ograniczony do jednej klatki, podczas gdy segmenty niezamrożone konkurują o pozostały budżet. Gdy granice przewyższają liczbę klatek, zachowywane jest jednolite pokrycie osi czasu, tak aby szybkie wczesne cięcia nie mogły ukryć długiego, końcowego segmentu. Granice scen w rozdzielczości analizy 1 sekundy granicy zamrożenia są łączone.

Brakujące filtry, źle sformułowane/puste dowody, błąd detektora lub ograniczony limit czasu wstępnej analizy domyślnie przyjmują dokładną politykę jednolitego punktu środkowego. Przerwanie przez wywołującego lub przekroczenie terminu brokera nie prowadzi do otwartego błędu: kończy ono działający podproces, zapobiega późniejszej ekstrakcji klatek, a prywatne tymczasowe drzewo jest usuwane w `finally`.

`scripts/perf/video-bridge-fu07-eval.ts` generuje deterministyczne, rzeczywiste dane testowe FFmpeg dla oszczędności wywołań napisów po deduplikacji, alokacji budżetu dla gęstego ruchu, dowodów rozmycia/ekspozycji/SI-TI, szybkich cięć z długim ogonem oraz fałszywych pozytywów stopniowego zanikania. Rejestruje czas rzeczywisty przed analizą, a tam, gdzie dostępny jest `/usr/bin/time`, również CPU podprocesu i szczytowe zużycie RSS. Jego kontrole jakości są jedynie oraklami strukturalnymi. Rzeczywista jakość modelu napisów pozostaje w stanie `HOLD`, ponieważ to środowisko testowe nie ma autoryzowanego punktu końcowego ani zamrożonego sędziego. Oszczędności finansowe również pozostają w stanie `HOLD`, chyba że `--caption-cost-per-call-usd` dostarczy jawne, pozytywne oszacowanie kosztu za wywołanie; skrypt nigdy nie fałszuje żadnego z tych wyników.

Każda klatka jest ograniczona do 4 MiB, wszystkie surowe klatki razem do 23 MiB, a serializowana odpowiedź brokera do 32 MiB. Prywatny katalog tymczasowy jest usuwany w `finally`. OmniRoute nie zawiera FFmpeg i nie akceptuje niestandardowej ścieżki do pliku wykonywalnego. Przed generowaniem napisów, mostek stosuje konserwatywną wizualną deduplikację: każdy plik JPEG jest redukowany do bufora w skali szarości 16×16 i porównywany tylko z ostatnią zachowaną klatką. Dla żądanego budżetu napisów powyżej jednej klatki, ekstrakcja dostarcza ograniczoną pulę kandydatów do dwukrotności tego budżetu i nigdy nie więcej niż 16 klatek. Żądany limit jest stosowany dopiero po deduplikacji, przy czym pierwsi i ostatni wybrani kandydaci są zachowywani podczas ostatecznego przerzedzania, gdy budżet wynosi co najmniej dwie klatki. Wersjonowana polityka `grayscale-16x16-mean-cells-v2` wykorzystuje większą z wartości: średniej delty luminancji i stosunku komórek miniatury, których znormalizowana delta wynosi co najmniej 0.05. Próg duplikacji to stała 0.04, wybrana ze względu na przewidywalność, a nie jako ustawienie konfigurowalne w czasie działania. Ten wtórny sygnał wysokiego kontrastu zachowuje małe ruchy i widoczne zmiany tekstu, które porównanie oparte wyłącznie na średniej mogłoby ukryć. Błędy komparatora lub dekodera domyślnie przyjmują tryb otwarty i zachowują pokrycie. Metadane wyjściowe rozdzielają wyodrębnione kandydatów, pomyślnie użyte klatki i odrzucone wizualne duplikaty.

Jawnie oznaczona część wideo może zażądać arkusza kontaktowego z sygnaturami czasowymi. Mostek tworzy siatkę JPEG składającą się z maksymalnie 4 kolumn i 16 klatek. Każda komórka o rozmiarze 512 pikseli wypala swoją sygnaturę czasową źródła w dolnym pasku o wysokim kontraście, podczas gdy te same sygnatury czasowe pozostają w metadanych tekstowych dla późniejszego powiązania i audytu. Cały plik JPEG pozostaje ograniczony do 32 MiB. Jeśli `sharp` nie może zdekodować lub skomponować siatki, mostek wraca do pojedynczych klatek JPEG; przerwanie przez klienta nadal propaguje się przez operację arkusza.

Dowody promocji są celowo oddzielone od syntetycznego mikrobenczmarku kompozycji. `scripts/perf/video-bridge-contact-sheet-eval.ts` definiuje wersjonowane schematem środowisko testowe A/B dla rzeczywistych modeli wizyjnych kompatybilnych z OpenAI. Mierzy zgłoszone przez dostawcę tokeny, całkowite opóźnienie rzeczywiste (w tym kompozycję arkusza), liczbę wywołań modelu i retencję faktów zdefiniowanych w manifeście. Surowe odpowiedzi modelu nie są zapisywane w raporcie; zachowywane są tylko skróty SHA-256 i dopasowane identyfikatory faktów. Środowisko testowe nie wykonuje żadnych wywołań sieciowych ani płatnych wywołań modelu, chyba że zostanie przekazana flaga `--execute-real` oraz skonfigurowane zostaną `--model`, `OMNIROUTE_BASE_URL` i `OMNIROUTE_API_KEY`. Bez tego jawnego rzeczywistego uruchomienia, jego werdykt czytelny maszynowo pozostaje `HOLD`; same syntetyczne pomiary ładunku/liczby wywołań nie stanowią dowodu promocji.

Wywołujący mogą dołączyć opcjonalną tablicę `transcript.cues` do obsługiwanej części wideo, jeśli posiadają już wyrównany tekst. Każda wskazówka musi zawierać `text`, skończony interwał `start`/`end` w ramach sondowanego czasu trwania oraz dozwolone `source` (`client`, `embedded` lub `audio-bridge`); `confidence` domyślnie wynosi `1` i musi mieścić się w przedziale od `0` do `1`. Dokładne duplikaty wskazówek są łączone. OmniRoute nigdy nie rozpoczyna transkrypcji z tych metadanych: zweryfikowane wskazówki są kopiowane do opisanego wyniku wraz ze źródłem, pewnością i interwałem, i są renderowane jako niezaufane obserwacje obok napisów klatek. Nieprawidłowy, poza zakresem lub pozbawiony pochodzenia tekst jest odrzucany, a nie mieszany w strumień napisów. Pole `source` jest obecnie deklarowane przez wywołującego, a nie weryfikowane przez serwer: OmniRoute wymusza, aby wartość była jednym z trzech dozwolonych ciągów znaków, ale nie potwierdza jeszcze kryptograficznie, że etykieta `embedded` lub `audio-bridge` faktycznie pochodzi z ekstrakcji należącej do serwera. Traktuj `source` jako niezaufaną wskazówkę, dopóki ta weryfikacja nie zostanie wdrożona; nie opieraj na niej decyzji autoryzacyjnych.

Zaawansowany wywołujący może dostarczyć już autoryzowaną ścieżkę `audioTranscript` dla tego samego wideo. Szew fuzji przetwarza obserwacje wizualne i dźwiękowe pod jednym terminem i sygnałem przerwania, porządkuje je na wspólnej osi czasu, usuwa dokładne duplikaty i zgłasza częściowy wynik, gdy tylko jedna strona zakończy się sukcesem. Nieprawidłowy `audioTranscript` degradowany jest do tego częściowego wyniku — opis wizualny jest zachowywany, a gałąź audio rejestruje oczyszczony kod błędu — zamiast powodować awarię całego wideo. Dostępność dla każdej gałęzi, flaga częściowa i oczyszczone kody błędów są zachowywane w opisanym wyniku, w metadanych guardrail (`audioFusionRuns`/`audioFusionPartials`/`audioFusionFailureCodes`), w metadanych pamięci podręcznej wyników oraz w licznikach fuzji mostka. Domyślna ścieżka Video Bridge nie wywołuje funkcji zamiany mowy na tekst ani nie pobiera drugiej kopii mediów; bez tej jawnej ścieżki pozostaje tylko wideo.

**Retencja transkrypcji (#12150 P1).** Ma to zastosowanie automatycznie, gdy Video Bridge (sam w sobie opcjonalny) renderuje wskazówkę transkrypcji — nie ma oddzielnej flagi retencji. Gdy żądanie renderuje jakąkolwiek wskazówkę transkrypcji (zadeklarowany przez wywołującego `transcript` lub połączony `audioTranscript`), guardrail oznacza ją jako `videoBridgeObserved` i tworzy zredagowany cień opisu wideo — identyczne renderowanie, w którym treść tekstowa każdej wskazówki jest zastępowana przez `[redacted-video-transcript]`, zbudowane poprzez podstawienie pola strukturalnej wskazówki przed złożeniem ciągu (nigdy przez parsowanie spłaszczonego tekstu, więc żadna treść wskazówki — wroga lub zwykła, w tym treści zawierające `]` takie jak `[inaudible]`/`[music]` — nie może przetrwać). Trwały korpus żądania dziennika połączeń zamienia każdą część tekstu pochodzącą z wideo na ten zredagowany cień, dopasowany przez równość treści; kotwica `fullText` jest ponownie odczytywana z ukończonego ładunku guardrail przed wywołaniem, więc dopasowanie nadal się udaje po tym, jak późniejsze guardraile łańcucha (maskery PII i danych uwierzytelniających, priorytety 10/95) przepiszą tekst opisu na miejscu i po tym, jak wstrzyknięcie system-prompt/handoff/memory zmieni kształt tablicy wiadomości. Treść wysłana do modelu nadrzędnego pozostaje niezmieniona. Obserwowane żądanie również nie wypełnia trwałej Pamięci (pomijane jest zarówno wydobywanie z żądania, jak i z odpowiedzi), więc własna odpowiedź modelu nie może powtórzyć tekstu transkrypcji do Pamięci.

Dodatkowe zachowane kopie wykorzystują ten sam sygnał obserwowanego żądania. Surowy obraz żądania klienta sprzed guardrail, oczekujące żądanie w pamięci i wczesny dziennik odrzuconych żądań strukturalnie zastępują pola transkrypcji w częściach wideo; podpowiedzi tekstowe syntetyzowane przez etapy potoku i przekazywanie kontekstu są redagowane w ujściu trwałego korpusu żądania. Trwały znacznik `video_content_removed` powoduje, że kontynuacja `previous_response_id` kończy się niepowodzeniem, zamiast rekonstruować tekst, który został celowo odrzucony. Jeśli obserwowane żądanie utraci swój cień redakcji dla poszczególnych części przed zalogowaniem, lub nawet jeden z kilku cieni wideo nie pasuje po późniejszych mutacjach żądania, zachowany korpus żądania jest całkowicie pomijany, zamiast zachowywać częściowo zredagowaną transkrypcję.

W przypadku obserwowanego żądania, odpowiedź modelu może cytować dowolną część transkrypcji bez strukturalnej granicy wskazówki. Jego trwały `responseBody` w dzienniku połączeń jest zatem zastępowany znacznikiem pominięcia; szczegółowy artefakt potoku (który może zawierać treści nadrzędne/klienta i fragmenty strumienia) nie jest zachowywany. Pamięci podręczne semantyczne, idempotencyjne i do odtwarzania rozumowania omijają odczyty i zapisy dla tego żądania. Żądanie dostawcy i widoczna dla klienta odpowiedź pozostają niezmienione. Wczesne bajty keepalive są opróżniane z bufora tymczasowego, gdy szczegółowy artefakt jest pomijany. Ostrzeżenie Kiro o źle sformułowanym EventStream zgłasza tylko liczbę bajtów ładunku, nigdy jego zawartość ani surowy błąd parsera JSON. Nie oznacza to, że każda niezwiązana diagnostyka dostawcy/wtyczki została poddana audytowi; szersze czyszczenie zachowanych ujść jest śledzone w #11658.

Wewnętrzny cykl życia `/api/modality-bridge/video/drilldown` to oddzielny, zapętlony/uwierzytelniony tokenem substrat pamięci podręcznej. Każda operacja wymaga również kanonicznego, nieprzejrzystego identyfikatora podmiotu. Zanim wywołujący produkcyjny zostanie włączony, musi on wyprowadzić ten identyfikator z uwierzytelnionego dzierżawcy i nigdy nie może przekazywać wartości wybranej przez klienta. Klucze pamięci podręcznej wiążą ten podmiot z kanonicznymi identyfikatorami sesji i odniesień wideo, przechowują tylko ich klucze pochodzące z SHA-256 i ograniczają zarówno odczyty, jak i usuwanie do tego samego podmiotu. Pamięć podręczna przechowuje maksymalnie 16 pochodnych klatek JPEG na wpis, wygasza je po dziesięciu minutach i obsługuje ograniczone odczyty `start`/`end` lub jawne usuwanie sesji.

Każdy podmiot jest ograniczony do 16 wpisów i 64 MiB kanonicznych danych JPEG. Te limity są niezależne od globalnego limitu 64 wpisów/256 MiB: presja kwoty podmiotu usuwa tylko najrzadziej używane wpisy tego podmiotu, zanim rozważone zostanie globalne usuwanie LRU. Wygasłe wpisy są usuwane zarówno z rozliczeń podmiotu, jak i globalnych podczas aktywności pamięci podręcznej, natomiast anulowanie i błąd walidacji nie zatwierdzają częściowej wymiany.

Pamięć podręczna odrzuca niekanoniczne Base64, nadmierne dopełnienie, media inne niż JPEG, źle sformułowane lub obcięte pliki JPEG oraz pliki JPEG, które generują ostrzeżenie podczas ograniczonego dekodowania pełnego obrazu `sharp`. Ponownie koduje każdy zaakceptowany obraz jako kanoniczny JPEG, wyprowadza szerokość i wysokość z zdekodowanych bajtów zamiast ufać polom wywołującego i odrzuca wszelkie końcowe bajty poliglota, zamiast je zachowywać. Tylko ograniczony kanoniczny skompresowany bufor jest naliczany do obu kwot. Limit JSON wire obejmuje narzut Base64 dla limitu 32 MiB zdekodowanego wejścia. Każda przechowywana pochodna rejestruje swój zweryfikowany format/rozdzielczość JPEG, politykę próbkowania, wersję pochodnej, czas utworzenia, obliczony przez serwer skrót zawartości oraz skrót odniesienia do rodzica plus skrót zawartości rodzica zaufanego wywołującego. Anulowanie jest sprawdzane między asynchronicznymi fazami dekodowania/haszowania przed atomowym zatwierdzeniem pamięci podręcznej.

Ta transza nie łączy jeszcze producenta produkcyjnego z trasą i nie zapewnia wyboru wariantów wielorozdzielczych. Przejrzysta ścieżka żądania Video Bridge nie generuje zatem dodatkowej pracy, natomiast wyprowadzanie podmiotu związanego z dzierżawcą oraz pełny cykl życia wielorozdzielczości FU-08 pozostają jawnymi pracami uzupełniającymi, a nie udokumentowanym kompletnym zachowaniem.

Klatki są sekwencyjnie opisywane za pomocą skonfigurowanego modelu Video. Puste nadpisanie Video dziedziczy ustawienie Vision; jeśli oba są puste, auto-router Vision wybiera efektywny model zdolny do widzenia. Pomyślne opisy zastępują oryginalną część stabilnym prefiksem `[Video description:`, który również oznacza tekst jako niezaufaną obserwację pochodzącą z mediów i informuje modele niższego poziomu, aby nie postępowały zgodnie z instrukcjami znalezionymi w mediach. Klucze pamięci podręcznej opisów klatek obejmują bajty JPEG, prompt, znacznik czasu i efektywny model; buforowane są tylko pomyślne opisy. Wpisy w pamięci podręcznej zachowują rzeczywisty pomyślny model producenta, w tym model awaryjny; most zgłasza `mixed`, gdy różne klatki zostały wyprodukowane przez różne modele. Trafienie w pamięci podręcznej ponownie wykorzystuje tę tożsamość producenta zamiast ponownie etykietować ją jako żądany plan routingu. Pamięć podręczna wyników dla całego wideo jest kluczowana na podstawie każdego wejścia, które zmienia wyjście — prompt, efektywny model, polityka próbkowania, liczba klatek, tryb analizy semantycznej, odcisk palca SHA-256 znormalizowanej wskazówki ostrości, okno ostrości, `transcript`, `audioTranscript` i flaga arkusza kontaktowego — więc zmiana któregokolwiek z tych wymiarów powoduje brak trafienia w pamięci podręcznej, nigdy nie jest to nieaktualne ponowne użycie. Wersja polityki wizualnej deduplikacji, próg i ograniczona liczba klatek kandydujących są również jawne w kluczu pamięci podręcznej wyników i metadanych; zmiana polityki nie może zatem ponownie wykorzystać nieaktualnego opisu całego wideo. Metadane pamięci podręcznej wyników v4 zachowują tryb i odcisk palca, nigdy surowe zadanie użytkownika. Metadane Guardrail raportują zarówno żądane, jak i efektywne tryby analizy; żądany tryb `focused` bez użytecznego tekstu użytkownika jest raportowany jako efektywnie `full`.

Guardrail wyodrębnia każdą obsługiwaną część wideo, ale opisuje nie więcej niż `modalityBridgeVideoMaxVideos`. Dla celu, co do którego udowodniono, że ma `supportsVideo === false`, nieudane i przekraczające limit filmy stają się jawnymi bezpiecznymi znacznikami tekstowymi, tak aby żaden surowy film nie przetrwał. Gdy możliwość jest nieznana, te części pozostają nietknięte. Cele z `supportsVideo === true` omijają most. Sygnał przerwania żądania klienta propaguje się przez pobieranie, kolejkę brokera, podprocesy i wywołania napisów; przerwania zatrzymują się między filmami i nigdy nie otwierają się na surowe media.

Ustawienia środowiska uruchomieniowego są wspierane przez bazę danych i walidowane przez Zod:

| Klucz                               | Domyślne    | Zakres / zachowanie                                                                                          |
| :---------------------------------- | :---------- | :----------------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | Opcjonalne środowisko uruchomieniowe, zgoda                                                                  |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full` zachowuje ogólne napisy; `focused` używa ograniczonego, niezaufanego kontekstu ostatniego użytkownika |
| `modalityBridgeVideoModel`          | `""`        | Dziedziczy model Vision Bridge                                                                               |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                                         |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` lub proporcjonalne `segment_aware`; awaria detektora wraca do `uniform`             |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                          |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                               |

Starsze, utrwalone wartości limitu czasu wideo powyżej 120 sekund są ograniczane do terminu brokera; nowe zapisy ustawień powyżej tego limitu są odrzucane. `GET /api/modality-bridge/video/runtime` wymaga zaufanej, ostemplowanej lokalności sprzężenia zwrotnego przed uwierzytelnieniem lub sondowaniem środowiska uruchomieniowego, a następnie wymaga autoryzacji zarządzania. Zwraca tylko `available`, oczyszczone wersje FFmpeg/ffprobe oraz stały powód, gdy środowisko uruchomieniowe jest niedostępne. Wewnętrzny punkt końcowy ekstrakcji nie jest publicznym API do przesyłania: nasycenie kolejki zwraca `503` plus `Retry-After`, rozłączenie dzwoniącego zwraca `499`, a stały termin brokera zwraca `504`. Przekonwertowane odpowiedzi dodają `video->text;model=<visionModel>;parts=<videos>` do centralnego nagłówka `x-omniroute-modality-bridge` bez usuwania segmentów Vision lub Audio.

### Masker PII (`piiMasker.ts`)

Działa na **obu** etapach.

- **`preCall`** klonuje ładunek, przechodzi przez `system`, `messages`, `input` i `prompt` (w tym proste elementy string), i stosuje `processPII()` (z `@/shared/utils/inputSanitizer`) do pól string `content`/`text`. Gdy `PII_REDACTION_ENABLED=true`, wykryte PII jest redagowane w wychodzącym ładunku. Jest to niezależne od `INPUT_SANITIZER_MODE` (który kontroluje tylko politykę wstrzykiwania promptów). Gdy redakcja jest wyłączona, wywołanie rejestruje liczbę wykryć bez przepisywania treści.
- **`postCall`** głęboko klonuje odpowiedź, uruchamia `sanitizePIIResponse()` plus masker kształtu API odpowiedzi (`maskResponsesOutput` — obejmuje `output_text` i `output[].content[].text`). Jeśli nastąpi jakakolwiek redakcja, zmodyfikowana odpowiedź zastępuje oryginalną.

Guardrail nigdy nie blokuje; jedynie dodaje adnotacje (`meta.detections`, `meta.redacted`) lub przepisuje.

### Wstrzykiwanie promptów (`promptInjection.ts`)

Wykrywa wrogie struktury w treści dostarczonej przez użytkownika i egzekwuje skonfigurowaną politykę. Zachowanie jest sterowane przez zmienne środowiskowe i opcje konstruktora:

| Ustawienie      | Zmienna środowiskowa                                                                                  | Domyślnie | Efekt                                                                                                                                                                                                                                      |
| --------------- | ----------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Włączone        | `INPUT_SANITIZER_ENABLED`                                                                             | `true`    | Gdy `false`, guardrail kończy działanie przedwcześnie.                                                                                                                                                                                     |
| Tryb            | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                       | `warn`    | Polityka wstrzykiwania (injection): `block`, `warn` lub `log`. (`redact` jest akceptowane dla kompatybilności wstecznej, ale **nie** usuwa tekstu wstrzyknięcia; przepisanie żądania PII jest kontrolowane przez `PII_REDACTION_ENABLED`.) |
| Próg blokowania | `blockThreshold` option / `INPUT_SANITIZER_BLOCK_THRESHOLD` (alias `INJECTION_GUARD_BLOCK_THRESHOLD`) | `high`    | Minimalny poziom dotkliwości wymagany do zablokowania. Medium (średni) służy domyślnie tylko do obserwacji.                                                                                                                                |

**Pierwszeństwo trybu** (`getMode`): `options.mode` wywołującego → **nadpisanie flagą funkcji w bazie danych** `INJECTION_GUARD_MODE` (Dashboard → Settings → Feature Flags) → zmienna środowiskowa `INJECTION_GUARD_MODE` → zmienna środowiskowa `INPUT_SANITIZER_MODE` → `warn`. Nadpisanie w panelu sterowania (dashboard) ma zatem pierwszeństwo przed zmiennymi środowiskowymi, więc interfejs Feature Flags kontroluje działający mechanizm zabezpieczający na żywo (bez restartu). Odczyt z bazy danych jest odporny na błędy: w przypadku błędu mechanizm powraca do zachowania opartego na zmiennych środowiskowych, a gdy nie ustawiono żadnego nadpisania, zachowanie jest identyczne z rozstrzyganiem wyłącznie na podstawie zmiennych środowiskowych.

Źródła wykrywania:

1. `sanitizeRequest()` z `@/shared/utils/inputSanitizer` (współdzielony zestaw detektorów używany w innych miejscach potoku).
2. Wbudowane `DEFAULT_GUARD_PATTERNS` (obecnie `system_override_inline` oraz `markdown_system_block`, oba o dotkliwości `high`).
3. Opcjonalne `customPatterns` przekazywane przez opcje konstruktora (ciągi znaków, wyrażenia regularne lub rekordy `{ name, pattern, severity }`).

Gdy `mode === "block"` **oraz** co najmniej jedno wykrycie spełnia próg dotkliwości, `preCall` zwraca `{ block: true, message: "Request rejected: suspicious content detected" }`. W trybach `warn`/`log` mechanizm zabezpieczający loguje zdarzenie, ale zezwala na wywołanie. Współdzielona funkcja pomocnicza `evaluatePromptInjection()` jest również eksportowana dla wywołujących, którzy muszą ocenić prompty bez przechodzenia przez rejestr.

**Granica skanowania (v3.8.20):** detektor sprawdza tylko **pierwsze 16 KB** połączonego tekstu promptu — `MAX_INJECTION_SCAN_BYTES = 16 * 1024` (16 384 bajty) w `src/shared/utils/inputSanitizer.ts`. Zarówno `detectInjection()`, jak i `evaluatePromptInjection()` wykonują `slice(0, MAX_INJECTION_SCAN_BYTES)` przed uruchomieniem pętli wzorców. Dyrektywy wstrzykiwania znajdują się blisko początku danych wejściowych, więc ogranicza to zużycie CPU/GC przez wyrażenia regularne przy ładunkach o wielkości setek KB bez osłabiania wykrywania (por. #3932, #4041).

### Credential Masker (`credentialMasker.ts`)

Działa na **obu** etapach, jako ostatni w domyślnym łańcuchu (priorytet `95`). Usuwa (redaguje) znane wzorce kluczy API / tajnych tokenów z wychodzącego ładunku (treść wiadomości, argumenty wywołania narzędzi, wyniki narzędzi) **oraz** odpowiedzi dostawcy, dzięki czemu poświadczenia wklejone do promptu (lub zwrócone w wyniku działania narzędzia) nie wyciekają do dostawcy nadrzędnego ani z powrotem do klienta.

- **Tylko na zasadzie opt-in**, ta sama konwencja co redagowanie PII (zbliżone do Hard Rule #20): wyłączone, chyba że `settings.credentialRedactionEnabled === true` **lub** `CREDENTIAL_REDACTION_ENABLED=true`. Gdy funkcja jest wyłączona, mechanizm zabezpieczający nie wykonuje żadnych operacji (no-op) — nigdy nie blokuje i nigdy nie przepisuje danych.
- `redactCredentials()` przechodzi przez całe drzewo ładunku/odpowiedzi (`walkValue()`, bezpieczne pod kątem prototype-pollution, bezpieczne pod kątem cykli dzięki `WeakSet`) i zastępuje dopasowania symbolem zastępczym `[REDACTED:<type>]`, klonując tylko te gałęzie, które faktycznie uległy zmianie.
- `CREDENTIAL_PATTERNS` obejmuje klucze dostawców LLM (OpenAI, OpenAI-proj, Anthropic, Google, Hugging Face, Replicate), tokeny VCS/SaaS (GitHub, Slack, Linear, Notion, npm, Postman, Discord), klucze płatności (Stripe, Square), klucze chmurowe (AWS access key, Twilio, SendGrid, Mailgun), klucze prywatne / JWT, ciągi połączeń zawierające poświadczenia (`mongodb://user:pass@...` itp.) oraz ogólny wzorzec wartości nagłówka `Authorization`/`x-api-key`/`api-key`/`apikey`. Klucze w formie nagłówków (`authorization`, `x-api-key`, `api-key`, `apikey`) są redagowane strukturalnie (tylko wartość, prefiks schematu taki jak `Bearer `/`Basic ` zostaje zachowany), a nie za pomocą ogólnego wyrażenia regularnego dla tekstu.
- Mechanizm zabezpieczający nigdy nie blokuje; jedynie przepisuje dane (`modifiedPayload` / `modifiedResponse`) i dodaje adnotacje (`meta.credentialsRedacted`, `meta.count`).

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
  block?: boolean; // true short-circuits the chain
  message?: string; // surfaced when blocking
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // returned by preCall to rewrite the request
  modifiedResponse?: TValue; // returned by postCall to rewrite the response
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

Zabezpieczenie sygnalizuje "brak zmian" poprzez zwrócenie `void`, `{}`, lub
`{ block: false }`. Zwrócenie `modifiedPayload`/`modifiedResponse` zastępuje
wartość przepływającą przez łańcuch dla kolejnych zabezpieczeń.
`signal?: AbortSignal` przenosi cykl życia wywołującego do zabezpieczeń. Przerwanie żądania jest celowym wyjątkiem typu "fail-open": mosty mediów przestają działać i czyszczą się bez przywracania surowych mediów do celu, o którym wiadomo, że ich nie obsługuje.

## Rejestr (`registry.ts`)

Singleton `guardrailRegistry` udostępnia:

- `register(guardrail)` — dodaje (lub zastępuje według znormalizowanej nazwy) zabezpieczenie i
  ponownie sortuje według rosnącego `priority`.
- `clear()` / `list()` — pomocnicze funkcje administracyjne.
- `runPreCallHooks(payload, context)` — iteruje aktywne zabezpieczenia, przekazuje
  `payload` przez `modifiedPayload` i zatrzymuje się przy pierwszym `block: true`.
- `runPostCallHooks(response, context)` — ten sam przepływ po stronie odpowiedzi.
- `resetGuardrailsForTests({ registerDefaults })` — czyści stan i opcjonalnie
  ponownie rejestruje wartości domyślne dla czystej izolacji testów.

Oba uruchamiacze zwracają `{ blocked, payload|response, results, guardrail?, message? }`,
gdzie `results` to tablica rekordów `GuardrailExecutionResult`, które zawierają
pola `blocked`, `skipped`, `modified`, `error` i `meta` dla każdego zabezpieczenia,
przydatne do śledzenia.

### Wyłączanie zabezpieczeń na żądanie

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })` agreguje
zdeduplikowaną listę nazw zabezpieczeń, które powinny zostać pominięte dla bieżącego
żądania. Źródła (wszystkie opcjonalne, wszystkie połączone):

- `apiKeyInfo.disabledGuardrails`
- Treść żądania `disabledGuardrails` (najwyższy poziom)
- Treść żądania `metadata.disabledGuardrails`
- Nagłówek `x-omniroute-disabled-guardrails` (lub starszy
  `x-disabled-guardrails`)

Wartości mogą być tablicami ciągów znaków lub ciągiem znaków oddzielonych przecinkami; nazwy są
normalizowane do małych liter w formacie kebab-case (`pii_masker` → `pii-masker`). Wynik
jest przekazywany przez `context.disabledGuardrails` do rejestru, który pomija
pasujące zabezpieczenia (`skipped: true` w `results`).

## Kolejność wykonania

Dla każdego żądania przechodzącego przez `src/sse/handlers/chat.ts` oraz
`open-sse/handlers/chatCore.ts`:

1. `resolveDisabledGuardrails(...)` buduje listę pomijanych elementów z klucza API, treści (body)
   oraz nagłówków.
2. `guardrailRegistry.runPreCallHooks(body, ctx)` uruchamia mechanizmy zabezpieczające (guardrails) w rosnącym
   porządku priorytetów:
   - Wyłączone zabezpieczenia są rejestrowane jako `skipped`.
   - Metoda `preCall` każdego zabezpieczenia może przepisać ładunek (payload) za pomocą `modifiedPayload`.
   - Pierwsze wystąpienie `block: true` przerywa łańcuch, a obsługa zwraca
     odpowiedź odrzucenia przez mechanizm zabezpieczający.
3. Potencjalnie przepisywany ładunek trafia do routingu hybrydowego (combo routing) oraz
   wysyłki nadrzędnej (upstream dispatch).
4. Po skompletowaniu odpowiedzi, `guardrailRegistry.runPostCallHooks(...)`
   uruchamia ten sam łańcuch dla odpowiedzi. Wystąpienie `block: true` w tym miejscu odrzuca
   odpowiedź nadrzędną.

Zabezpieczenia, które zgłaszają błędy, są rejestrowane z wpisem `error: <message>` i logowane przez
`logger.warn`, ale łańcuch jest kontynuowany — zgodnie z założeniem o otwartości na awarię (fail-open).

## Konfiguracja

Zmienne środowiskowe odczytywane przez wbudowane mechanizmy zabezpieczające:

| Zmienna                               | Używana przez             | Efekt                                                                                                                |
| ------------------------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | Ustawienie `false` wyłącza wykrywanie całkowicie.                                                                    |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | Polityka wstrzykiwania: `warn`, `block` lub `log`. Starsza wartość `redact` nie modyfikuje tekstu wstrzyknięcia.     |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | Tryb dla osłony wstrzyknięć; również flaga funkcji bazy danych, która **nadpisuje** zmienne środowiskowe (DB > ENV). |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | Minimalny poziom ważności odrzucany przez `MODE=block`: `high` (domyślnie), `medium` lub `low`.                      |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | Starszy alias dla `INPUT_SANITIZER_BLOCK_THRESHOLD`.                                                                 |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | Gdy `true`, dane PII w żądaniu są maskowane (niezależnie od trybu wstrzykiwania).                                    |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (downstream) | Steruje zachowaniem maskera po stronie odpowiedzi.                                                                   |

Zabezpieczenia Modality Bridge odczytują konfigurację wykonawczą z magazynu ustawień
opartego na bazie danych (`getSettings()`), a nie ze zmiennych środowiskowych. Kluczami głównymi dla wizji są
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` oraz
`modalityBridgeCacheMaxEntries`. Starsze klucze
`visionBridge*` są akceptowane tylko jako udokumentowane rozwiązanie zapasowe (fallback) odczytu na jeden cykl;
zapisy z panelu sterowania (dashboard) używają kluczy głównych. Wartości domyślne oraz moduł rozstrzygający mechanizm zapasowy znajdują się w
`src/shared/constants/modalityBridgeDefaults.ts`, a starsze stałe są zachowane w
`src/shared/constants/visionBridgeDefaults.ts`.

Audio używa ustawień `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` i `modalityBridgeAudioMaxClips`, a także współdzielonych
ustawień `modalityBridgeCache*`. Audio nie posiada mechanizmu zapasowego dla starszych kluczy, ponieważ te
klucze zostały wprowadzone wraz ze schematem Modality Bridge.

Wideo używa ustawień `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` oraz
`modalityBridgeVideoTimeout`, a także współdzielonych ustawień `modalityBridgeCache*`.
Jest domyślnie wyłączone, ponieważ pakiety FFmpeg/ffprobe są opcjonalnymi zależnościami operacyjnymi,
a tworzenie podpisów klatek (frame captioning) zwiększa opóźnienie oraz koszt modelu.

## Niestandardowe Guardraile

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

1.  Utwórz `src/lib/guardrails/myGuardrail.ts` rozszerzający `BaseGuardrail`.
2.  Zaimplementuj `preCall` i/lub `postCall`.
3.  Zarejestruj podczas importu (push z `registerDefaultGuardrails`) lub
    wywołaj `guardrailRegistry.register(...)` w czasie wykonania — rejestr zastępuje
    każdy poprzedni guardrail o tej samej znormalizowanej nazwie.
4.  Dodaj testy w `tests/unit/` (istniejące przykłady:
    `tests/unit/guardrails-registry.test.ts`,
    `tests/unit/prompt-injection-guard.test.ts`,
    `tests/unit/guardrails/visionBridge.test.ts`).

## Testowanie

Użyj `resetGuardrailsForTests()` między testami, aby rozpocząć od znanego stanu.
Przekaż `{ registerDefaults: false }`, aby rozpocząć z pustym rejestrem i
zarejestrować tylko testowane guardraile. Vision Bridge akceptuje wstrzykiwanie zależności
(`deps.getSettings`, `deps.callVisionModel`); Audio Bridge udostępnia
równoważne punkty dla ustawień, możliwości, wyboru modelu STT, sprawdzania poświadczeń
i transkrypcji. Testy mogą zatem ćwiczyć oba przepływy bez dostępu do bazy danych
lub sieci.

## Zobacz także

- `src/lib/guardrails/` — implementacja
- `src/shared/utils/inputSanitizer.ts` — współdzielony detektor, który zasila
  ochronę przed wstrzykiwaniem promptów i maskowanie PII
- `src/shared/constants/visionBridgeDefaults.ts` — domyślne ustawienia Vision Bridge i
  lista modeli wymuszonego mostkowania
- `src/shared/constants/modalityBridgeDefaults.ts` — współdzielone domyślne ustawienia środowiska wykonawczego Vision/Audio
- `docs/architecture/RESILIENCE_GUIDE.md` — warstwa ortogonalna (wyłącznik obwodu, czasy odnowienia)
- `docs/reference/ENVIRONMENT.md` — pełne odniesienie do zmiennych środowiskowych

## Pokrycie tras przez injection-guard i red-team (Faza 8 · Blok D)

Injection-guard (`createInjectionGuard` / `withInjectionGuard`) obejmuje wszystkie trasy,
które akceptują prompty użytkownika. Szanuje `INJECTION_GUARD_MODE` (domyślnie `warn` = tylko logowanie;
`block` = zwraca HTTP 400 `SECURITY_001`).

| Typ                | Trasy                                                                                                                                                | Tryb domyślny |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| Tekst (istniejący) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn          |
| Generatywny        | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn          |
| Dane               | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn          |

Ekstrakcja tekstu (`extractMessageContents`) obejmuje `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`.

**Red-team (nocne, `nightly-llm-security.yml`):** promptfoo waliduje, że każda trasa blokuje
korpus OWASP-LLM w `INJECTION_GUARD_MODE=block`; garak uruchamia sondy (pomija bez sekretu).
`moderations` jest uwzględnione dla spójności — operatorzy w trybie blokowania mogą je wyłączyć za pomocą
`resolveDisabledGuardrails`.

Nocny workflow (`.github/workflows/nightly-llm-security.yml`, cron + ręczne
uruchamianie) ma dwa zadania:

- **`promptfoo-guard` (blokujące)** — uruchamia `promptfoo eval -c promptfooconfig.yaml`
  z `INJECTION_GUARD_MODE=block`. Każdy przypadek adversarialny (np. "ignoruj wszystkie
  poprzednie instrukcje...", jailbreaki w stylu DAN) potwierdza, że odpowiedź zawiera
  `error.code === "SECURITY_001"`, tzn. że guard faktycznie odrzucił żądanie.
- **`garak` (doradcze)** — uruchamia garak `--probes promptinject,dan,leakreplay`
  przeciwko lokalnej instancji OmniRoute (`http://localhost:20128/v1`). Zależne od
  sekretu dostawcy (`PROMPTFOO_PROVIDER_KEY`); pomija się elegancko i jest sufiksowane
  `|| true`, więc raportuje bez powodowania błędu CI.

Pokrycie pomocnika guard (`createInjectionGuard` / `withInjectionGuard`)
obejmuje każdą trasę `/v1` zawierającą prompt; tekst promptu jest pobierany z
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system` przez
`extractMessageContents()` w `src/shared/utils/inputSanitizer.ts`.
