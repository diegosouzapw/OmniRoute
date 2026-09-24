# Cursor Provider in Docker Environments (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

Gdy OmniRoute działa wewnątrz Dockera, starsze mechanizmy **Import from Cursor IDE** /
`cursor-agent` nie działają, ponieważ kontener nie widzi instalacji Cursor
na hoście. Zamiast tego użyj **Login with Cursor** (deep-control PKCE).

## Dlaczego import z IDE / CLI nie działa w Dockerze

1. **Izolacja systemu plików** — Automatyczny import szuka ścieżek systemu Linux, takich jak
   `~/.config/Cursor/User/globalStorage/state.vscdb`, _wewnątrz_ kontenera.
   W Docker Desktop dla macOS baza danych IDE hosta nie jest domyślnie zamontowana,
   a systemem operacyjnym kontenera jest Linux, nawet jeśli hostem jest Darwin.
2. **Brak pliku binarnego `cursor-agent`** — Oficjalne obrazy OmniRoute nie zawierają
   `cursor-agent`. Funkcja Available Models wcześniej uruchamiała
   `cursor-agent --list-models`, a w razie niepowodzenia korzystała ze statycznego katalogu.
3. **Nieprawidłowy plik binarny** — **Nie** montuj w kontenerze Linux pliku
   `cursor-agent` z systemu macOS. Nie będzie można go uruchomić.

## Zalecane rozwiązanie: logowanie za pomocą Cursor

1. Otwórz **Dashboard → Providers → Cursor**.
2. Wybierz kartę **Login with Cursor**.
3. Kliknij **Login with Cursor** — OmniRoute otworzy
   `https://cursor.com/loginDeepControl?…` w przeglądarce na **hoście**.
4. Zatwierdź logowanie w przeglądarce, a następnie wróć do panelu. OmniRoute
   odpytuje `api2.cursor.sh/auth/poll`, dopóki nie otrzyma tokenów.
5. OmniRoute przechowuje tokeny **dostępu i odświeżania** oraz odświeża je za pomocą
   `https://api2.cursor.sh/auth/exchange_user_api_key`.

Ta metoda nie wymaga Cursor IDE ani `cursor-agent` wewnątrz kontenera.

## Wykrywanie modeli

W przypadku zalogowanego połączenia funkcja **Available Models / Auto-Sync** preferuje katalog HTTP
`AiService/AvailableModels` Cursor, używając tokenu Bearer połączenia.
Jeśli to się nie powiedzie, OmniRoute nadal próbuje użyć `cursor-agent` hosta (gdy jest dostępny),
a następnie statycznych danych początkowych rejestru.

OmniRoute zawsze udostępnia w katalogu model **`auto`** (wyświetlany jako „Auto”), a także
tryby routera w stylu OpenCodex: **`auto-cost`**, **`auto-balance`** oraz
**`auto-intelligence`**. W komunikacji z Cursor są one mapowane na model `default`
(z parametrem `optimization` typu ModelParameter dla trzech wariantów). Wybierz
`cu/auto`, gdy limit użycia modeli premium został wyczerpany — Auto często nadal dysponuje limitem.

### Katalog aktywny jest wyłącznym źródłem po synchronizacji

Po pomyślnej synchronizacji modeli Cursor (`cursor-agent --list-models` → zapisany
zsynchronizowany katalog albo opisane powyżej pobranie `AvailableModels` z uwierzytelnianiem
Bearer) **panel**, **`/v1/models`** oraz **Test All** wyświetlają:

1. Modele zwrócone przez aktywną synchronizację
2. Dodane identyfikatory automatycznego routera: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. **Niestandardowe** modele operatora (importowane / ręczne) — nigdy nie są usuwane przez synchronizację

Duży statyczny rejestr w
`open-sse/config/providers/registry/cursor/` służy **wyłącznie jako mechanizm rezerwowy offline**. Gdy
zsynchronizowany katalog jest pusty (lub wykrywanie się nie powiedzie), lista korzysta z tego rejestru.

Identyfikatory z sufiksem poziomu wysiłku (na przykład `claude-4.6-sonnet-high`) nadal mogą być
**żądane** w czasie działania: `resolveRequestedModel` usuwa sufiks i przekształca go w przesyłany
parametr `ModelParameter`. Wyłączna lista celowo ukrywa te statyczne warianty
w Test All, aby testy odpowiadały modelom rzeczywiście zwracanym przez Cursor jako dostępne.

### Funkcje pomocnicze

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — scalanie w panelu
- `ensureCursorAutoCatalogEntry` — dodawanie auto* podczas wykrywania i generowania listy
- `shouldSuppressStaticModelForExclusiveListing` — statyczna pętla `/v1/models`

## Limity dostawcy (limit użycia)

Sekcja **Usage → Provider Limits** dla Cursor używa interfejsów API Bearer w `api2.cursor.sh`
(`GetCurrentPeriodUsage` → podsumowanie użycia → auth/usage) po uwierzytelnieniu PKCE lub
imporcie tokenu. Starsza ścieżka panelu wykorzystująca pliki cookie/`cursor.com` pozostaje
ostatecznym mechanizmem rezerwowym dla starszych sesji zaimportowanych z IDE.

Okna zazwyczaj obejmują pozycje **Total**, **Auto + Composer** oraz **API**. Jeśli
limity są puste, ponownie wykonaj **Login with Cursor** lub ponownie zaimportuj tokeny (sam import
z IDE nie jest już wymagany).

## Puste tury / wyczerpany limit użycia

Gdy Cursor akceptuje Run, ale nie zwraca tekstu asystenta (co często występuje po wyczerpaniu
limitu użycia modeli premium), OmniRoute zwraca umożliwiający podjęcie działania błąd **429**
(wskazujący na limit) lub **502** wraz ze wskazówkami — zamiast samego komunikatu „Provider returned
empty content”. Błędy przesyłania strumieniowego, takie jak `not_found: AI Model Not Found`
(wyczerpany limit w oknie użycia), są klasyfikowane jako **przekroczenie limitu szybkości /
użycia Cursor**, a komunikat ten jest zachowywany w całym potoku SSE (wspólny mechanizm ochrony
przed pustym strumieniem nie nadpisuje już wyemitowanego błędu). Sprawdź Provider Limits, wypróbuj
model **`auto`** lub zwiększ limity planu Cursor.

## Wersja klienta (tryb bez interfejsu)

Bez lokalnej instalacji `cursor-agent` OmniRoute ustala wartość
`x-cursor-client-version` kolejno na podstawie zmiennej środowiskowej `CURSOR_AGENT_CLI_VERSION`,
zapisanego na dysku wyniku analizy skryptu instalacyjnego Cursor, a następnie przypiętego
identyfikatora kompilacji. W razie potrzeby zastąp tę wartość za pomocą
`CURSOR_AGENT_CLI_VERSION`.

## Rozwiązanie rezerwowe: ręczny import tokenu

Jeśli nie możesz ukończyć logowania w przeglądarce:

1. Na hoście wyodrębnij tokeny z pliku `state.vscdb`:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Otwórz **Import token** w oknie uwierzytelniania Cursor.
3. Wklej **Access Token** oraz, jeśli jest dostępny, **Refresh Token** (wymagany do
   automatycznego odświeżania). Identyfikator maszyny jest opcjonalny.

Importy zawierające wyłącznie token dostępu nadal działają, ale wygasną bez tokenu odświeżania —
zaimportuj je ponownie, gdy czat zacznie zwracać błędy uwierzytelniania.

## Powiązane materiały

- Wskazówki dotyczące Zed w Dockerze: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- Dokumentacja logowania Cursor w OpenCodex (zewnętrzna):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
