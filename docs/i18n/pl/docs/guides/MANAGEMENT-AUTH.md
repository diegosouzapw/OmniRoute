# Management Authentication (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute posiada **cztery rodziny poświadczeń**, które mogą autoryzować trasy zarządzania.
Nie są one wzajemnie wymienne. Klucze API do wnioskowania (`sk-…`) **nie** zarządzają
serwerem, chyba że wyraźnie nadano im zakres `manage` lub `admin`.

Kanoniczna implementacja: `src/lib/api/requireManagementAuth.ts`.

| Poświadczenie             | Typowa forma                        | Utworzone gdzie                                      | Przeznaczenie                      | Możliwości zarządzania                                                                 |
| :------------------------ | :---------------------------------- | :--------------------------------------------------- | :--------------------------------- | :------------------------------------------------------------------------------------- |
| Sesja JWT panelu          | `auth_token` cookie                 | Logowanie do panelu                                  | Interfejs użytkownika przeglądarki | Pełne zarządzanie panelem, z zastrzeżeniem CSRF, lokalizacji i zawsze chronionych tras |
| Token machine-id CLI      | wewnętrzny / lokalny                | Bootstrap CLI (`omniroute` na tej samej maszynie)    | Lokalne CLI                        | Tylko lokalne zarządzanie                                                              |
| Scoped Access Token       | `oma_live_…`                        | **Settings → Access Tokens** lub `omniroute connect` | Zdalne CLI i API zarządzania       | Musi spełniać wymagany zakres `read`, `write` lub `admin` dla trasy                    |
| Klucz API do wnioskowania | `sk-…` (i inne prefiksy kluczy API) | **API Manager / API Keys**                           | `/v1/*` wnioskowanie               | **Brak**, chyba że metadane klucza zawierają `manage` lub `admin`                      |

Poświadczenia `oma_` to poświadczenia zarządzania/CLI. **Nie** są to klucze API do wnioskowania.

Jeśli logowanie/autoryzacja kluczem API jest wyłączona dla serwera, niektóre trasy zarządzania mogą
akceptować nieautoryzowane wywołania. Trasy tylko lokalne i zawsze chronione nadal stosują
własne zasady. Przedstawienie jednego z tych poświadczeń nie jest zatem uniwersalnie
obowiązkowe, a posiadanie go nie jest uniwersalnie wystarczające bez wymaganego
zakresu i lokalizacji trasy.

Powiązane: [Tryb zdalny](./REMOTE-MODE.md) (jak `oma_live_…` jest generowany dla zdalnego CLI).

---

## Matryce zakresów

Zakresy zarządzania kluczami API i zakresy tokenów dostępu to różne słowniki.
Zakresy narzędzi MCP to trzeci słownik, sprawdzany za pomocą `scopeMatches`, a nie żadnej z funkcji w poniższych tabelach. Porównanie:
[Trzy przestrzenie nazw zakresów](../frameworks/MCP-SERVER.md#three-scope-namespaces).

### Zakresy tokenów dostępu (`oma_live_…`)

| Zakres  | Typowe operacje                                                                  |
| ------- | -------------------------------------------------------------------------------- |
| `read`  | Pobieranie list/statusów (GET), które token może zobaczyć                        |
| `write` | Mutacje (tworzenie/aktualizacja/usuwanie) poniżej poziomu administratora         |
| `admin` | Pełny zdalny CLI / token połączenia (domyślne hasło startowe znajduje się tutaj) |

Token z zakresem `read` nie może wywołać trasy `write`. Kształt komunikatu środowiska wykonawczego:
`Zakres tokenu dostępu '<have>' jest niewystarczający; wymagany jest '<need>'.`

### Zakresy zarządzania kluczami API

| Zakres   | Znaczenie                                                                   |
| -------- | --------------------------------------------------------------------------- |
| (none)   | Tylko wnioskowanie. Trasy zarządzania zwracają 403.                         |
| `manage` | API zarządzania (ta sama brama co gałąź klucza API `requireManagementAuth`) |
| `admin`  | Spełnia również `hasManageScope` (traktowany jako zdolny do zarządzania)    |

Włącz `manage` dla klucza w interfejsie użytkownika API Keys / API Manager. Nie używaj ponownie klucza klienta czatu do automatyzacji, chyba że celowo nadałeś ten zakres.

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

## Aktualne błędy wykonania (nie ujawniać sekretów)

| Sytuacja                                             | Typowy status | Komunikat (oczyszczony)                                              |
| :--------------------------------------------------- | :------------ | :------------------------------------------------------------------- |
| Brak poświadczeń                                     | 401           | `Authentication required`                                            |
| Nieprawidłowy/wygasły `oma_live_…`                   | 401           | `Invalid or expired access token`                                    |
| Prawidłowy klucz API bez uprawnień `manage`/`admin`  | 403           | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Nieprawidłowy zwykły klucz API na trasie zarządzania | 403           | `Invalid management token`                                           |
| Zakres tokenu dostępu zbyt niski                     | 403           | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Nieprawidłowy token zarządzania" oznacza, że okaziciel **nie** został zaakceptowany jako poświadczenie zarządzania. **Nie** informuje, którą rodzinę należy wygenerować. Skorzystaj z powyższej tabeli: klucze wnioskowania wymagają zakresu `manage`; zdalne CLI wymaga `oma_live_…`; panel używa ciasteczka sesji.

---

## Zalecany wybór najmniejszych uprawnień

| Wywołujący                                           | Zastosowanie                                       |
| :--------------------------------------------------- | :------------------------------------------------- |
| Przeglądarka                                         | Sesja panelu sterowania                            |
| CLI na hoście serwera                                | Token maszyny                                      |
| CLI na laptopie komunikujące się ze zdalnym serwerem | `oma_live_…` z `omniroute connect`                 |
| CI / skrypty (tylko zarządzanie)                     | `oma_live_…` z najmniejszym działającym zakresem   |
| CI, które musi wywoływać zarówno `/v1`, jak i `/api` | Klucz API z `manage` **lub** dwoma poświadczeniami |
