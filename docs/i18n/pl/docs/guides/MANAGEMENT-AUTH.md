# Management Authentication (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute ma **cztery rodziny danych uwierzytelniających**, które mogą autoryzować trasy zarządzania.
Nie są one zamienne. Klucze API do inferencji (`sk-…`) **nie** umożliwiają zarządzania
serwerem, chyba że jawnie nadano im zakres `manage` lub `admin`.

Implementacja kanoniczna: `src/lib/api/requireManagementAuth.ts`.

| Dane uwierzytelniające           | Typowa postać                          | Miejsce utworzenia                                      | Przeznaczenie                          | Możliwości zarządzania                                                                                               |
| -------------------------------- | -------------------------------------- | ------------------------------------------------------- | -------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Sesja JWT panelu                 | plik cookie `auth_token`               | Logowanie do panelu                                     | Interfejs przeglądarkowy               | Pełne zarządzanie z poziomu panelu, z uwzględnieniem reguł CSRF, lokalności i tras wymagających bezwzględnej ochrony |
| Token identyfikatora maszyny CLI | wewnętrzny / lokalny                   | Inicjalizacja CLI (`omniroute` na tej samej maszynie)   | Lokalne CLI                            | Wyłącznie zarządzanie lokalne                                                                                        |
| Token dostępu z zakresem         | `oma_live_…`                           | **Ustawienia → Tokeny dostępu** lub `omniroute connect` | Zdalne CLI i interfejs API zarządzania | Musi spełniać wymagania trasy dotyczące zakresu `read`, `write` lub `admin`                                          |
| Klucz API do inferencji          | `sk-…` (oraz inne prefiksy kluczy API) | **Menedżer API / Klucze API**                           | Inferencja `/v1/*`                     | **Brak**, chyba że metadane klucza obejmują `manage` lub `admin`                                                     |

Dane uwierzytelniające `oma_` służą do zarządzania i obsługi CLI. **Nie** są kluczami API do inferencji.

Jeśli uwierzytelnianie za pomocą logowania lub klucza API jest wyłączone na serwerze, niektóre trasy zarządzania mogą
akceptować nieuwierzytelnione wywołania. Trasy wyłącznie lokalne i trasy wymagające bezwzględnej ochrony nadal
stosują własne reguły. Dlatego przedstawienie jednego z tych danych uwierzytelniających nie zawsze jest
wymagane, a ich posiadanie nie zawsze jest wystarczające bez wymaganego
zakresu i odpowiedniej lokalności trasy.

Powiązane: [Tryb zdalny](./REMOTE-MODE.md) (sposób generowania `oma_live_…` dla zdalnego CLI).

---

## Macierze zakresów

Te dwa zestawy zakresów są **różne**. Nie należy ich mieszać.

### Zakresy tokenów dostępu (`oma_live_…`)

| Zakres  | Typowe operacje                                                                                          |
| ------- | -------------------------------------------------------------------------------------------------------- |
| `read`  | Operacje GET pobierające listy lub stan, do których token ma dostęp                                      |
| `write` | Modyfikacje (tworzenie/aktualizowanie/usuwanie) poniżej poziomu administratora                           |
| `admin` | Pełny dostęp zdalnego CLI / token połączenia (inicjalizacja za pomocą hasła domyślnie nadaje ten zakres) |

Token z zakresem `read` nie może wywołać trasy wymagającej `write`. Postać komunikatu środowiska wykonawczego:
`Access token scope '<have>' is insufficient; '<need>' required.`

### Zakresy zarządzania kluczy API

| Zakres   | Znaczenie                                                                                                   |
| -------- | ----------------------------------------------------------------------------------------------------------- |
| (brak)   | Tylko inferencja. Trasy zarządzania zwracają kod 403.                                                       |
| `manage` | Interfejs API zarządzania (ta sama kontrola dostępu co w gałęzi kluczy API funkcji `requireManagementAuth`) |
| `admin`  | Również spełnia warunek `hasManageScope` (jest traktowany jako umożliwiający zarządzanie)                   |

Włącz zakres `manage` dla klucza w interfejsie Klucze API / Menedżer API. Nie używaj ponownie
klucza klienta czatu do automatyzacji, chyba że celowo nadano mu ten zakres.

---

## Tworzenie i unieważnianie

### Sesja JWT panelu

1. Otwórz `/login` i zaloguj się za pomocą hasła zarządzania (`INITIAL_PASSWORD` podczas pierwszego uruchomienia).
2. Plik cookie `auth_token` ma atrybut HttpOnly. Panel w przeglądarce używa go automatycznie.
3. Wyloguj się przez `/api/auth/logout`. Nie ma długoterminowego sekretu do skopiowania.

### Token identyfikatora maszyny CLI

1. Uruchom `omniroute` na **tym samym hoście** co serwer (interfejs loopback).
2. CLI inicjalizuje token identyfikatora maszyny w `~/.omniroute/` (chmod 600).
3. To **nie** działa z innej maszyny. W przypadku zdalnego CLI użyj tokenu dostępu.

### Token dostępu z zakresem (`oma_live_…`)

1. Panel: **Ustawienia → Tokeny dostępu** → utwórz token (nazwa + zakres). **Sekret jest wyświetlany tylko raz.**
2. Lub CLI: `omniroute connect <host>` (hasło → token). Zobacz [Tryb zdalny](./REMOTE-MODE.md).
3. Nagłówek: `Authorization: Bearer oma_live_…`
4. Unieważnij token na tej samej stronie Tokeny dostępu (lub usuń kontekst CLI).
5. Serwer przechowuje wyłącznie skrót. Traktuj tekst jawny jak hasło.

### Klucz API z zakresem zarządzania

1. Panel: **Menedżer API / Klucze API** → utwórz lub edytuj klucz → włącz `manage` (lub `admin`).
2. Nagłówek: `Authorization: Bearer sk-…` (rzeczywisty prefiks klucza).
3. Unieważnij klucz lub usuń zakres `manage` w tym samym interfejsie.
4. Zasada najmniejszych uprawnień dla automatyzacji niekorzystającej z CLI: preferuj token dostępu z zakresem `read` dla zadań używających wyłącznie GET; używaj zakresu `manage` w kluczu API tylko wtedy, gdy klient musi również komunikować się z `/v1` i interfejsem zarządzania.

---

## Format nagłówka

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Nie umieszczaj danych uwierzytelniających do zarządzania w ścieżce URL ani w ciągu zapytania. Uwierzytelnianie operacji zarządzania odbywa się wyłącznie za pomocą nagłówka lub pliku cookie.

---

## Przykłady do skopiowania i wklejenia

Tylko do odczytu (lista dostawców). Użyj tokenu dostępu z zakresem `read`:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Modyfikacja (utworzenie połączenia z dostawcą). Użyj tokenu dostępu z zakresem `write`/`admin` lub klucza API z zakresem `manage`:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Wnioskowanie (nie zarządzanie). Zwykły klucz API, zakres `manage` nie jest wymagany:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Bieżące błędy środowiska uruchomieniowego (nie ujawniaj sekretów)

| Sytuacja                                            | Typowy kod stanu | Komunikat (zanonimizowany)                                           |
| --------------------------------------------------- | ---------------- | -------------------------------------------------------------------- |
| Brak danych uwierzytelniających                     | 401              | `Authentication required`                                            |
| Nieprawidłowy/wygasły token `oma_live_…`            | 401              | `Invalid or expired access token`                                    |
| Prawidłowy klucz API bez zakresu `manage`/`admin`   | 403              | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Nieprawidłowy zwykły klucz API w trasie zarządzania | 403              | `Invalid management token`                                           |
| Niewystarczający zakres tokenu dostępu              | 403              | `Access token scope '<have>' is insufficient; '<need>' required.`    |

„Invalid management token” oznacza, że token bearer **nie** został zaakceptowany jako dane uwierzytelniające do zarządzania. Komunikat ten **nie** wskazuje, który rodzaj danych uwierzytelniających należy utworzyć. Skorzystaj z powyższej tabeli: klucze do wnioskowania wymagają zakresu `manage`; zdalny interfejs CLI wymaga tokenu `oma_live_…`; panel używa pliku cookie sesji.

---

## Zalecany wybór zgodny z zasadą najmniejszych uprawnień

| Wywołujący                                            | Użyj                                                                         |
| ----------------------------------------------------- | ---------------------------------------------------------------------------- |
| Przeglądarka                                          | Sesja panelu                                                                 |
| CLI na hoście serwera                                 | Token maszyny                                                                |
| CLI na laptopie komunikującym się ze zdalnym serwerem | Token `oma_live_…` z polecenia `omniroute connect`                           |
| CI / skrypty (tylko zarządzanie)                      | Token `oma_live_…` z najmniejszym wystarczającym zakresem                    |
| CI, który musi wywoływać zarówno `/v1`, jak i `/api`  | Klucz API z zakresem `manage` **lub** dwa zestawy danych uwierzytelniających |
