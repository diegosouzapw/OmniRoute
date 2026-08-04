---
title: "Przewodnik konfiguracji Kiro"
---

# Przewodnik konfiguracji Kiro

Ten przewodnik opisuje dodawanie kont Kiro (hostowany w AWS asystent AI do kodowania) do OmniRoute,
ze szczególnym uwzględnieniem jednoczesnej pracy wielu kont bez konfliktów sesji.

---

## Tło: dlaczego konta Kiro mogą wchodzić w konflikt

Backend Kiro używa rejestracji klientów AWS SSO OIDC do śledzenia aktywnych sesji.
Kluczowe ograniczenie: **każda rejestracja klienta OIDC obsługuje tylko jedną aktywną
sesję naraz**. Gdy drugie urządzenie lub użytkownik uwierzytelnia się przy użyciu tego
samego zarejestrowanego klienta, backend unieważnia refresh token pierwszego konta.

To ten sam mechanizm, który powoduje problemy przy uruchomieniu `kiro-cli login` na
maszynie, na której jest już zalogowane inne konto Kiro — nowe logowanie unieważnia
token pierwszego konta.

---

## Jak OmniRoute to rozwiązuje (v3.8.0+)

Od v3.8.0 OmniRoute wywołuje `registerClient()` (AWS SSO OIDC) przy każdym
imporcie połączenia Kiro. Dzięki temu każde połączenie OmniRoute ma własną, dedykowaną
rejestrację klienta OIDC. Ponieważ rejestracje klientów są od siebie niezależne,
odświeżanie lub ponowne uwierzytelnienie jednego konta nie wpływa na refresh token
żadnego innego konta.

Izolacja dotyczy metod importu opartych o refresh token, a autoryzacja kluczem API
całkowicie unika sesji odświeżania OIDC:

| Metoda importu                                    | Status izolacji                                                                                          |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| AWS Builder ID / IDC device-code flow             | Izolowana od momentu wprowadzenia flow device-code                                                       |
| **Import Token** (ręcznie wklejony refresh token) | Izolowana od v3.8.0                                                                                      |
| **Google / GitHub social login**                  | Izolowana od v3.8.0                                                                                      |
| **Auto-Import** (kiro-cli SQLite)                 | Izolowana od v3.8.0 (ścieżka SQLite była już izolowana; fallback SSO-cache jest teraz również izolowany) |
| **API Key** (długoterminowy klucz CodeWhisperer)  | Brak sesji odświeżania; klucz jest walidowany i przechowywany jako poświadczenie bearer                  |

---

## Uwaga migracyjna dla połączeń utworzonych przed v3.8.0

Połączenia zaimportowane przed v3.8.0 nie mają dedykowanej rejestracji klienta OIDC
zapisanej w `providerSpecificData`. Nadal działają, ale korzystają ze współdzielonego
endpointu odświeżania social-auth, więc dwa takie połączenia mogą nadal wzajemnie się
unieważniać.

**Aby uzyskać izolację:** usuń stare połączenie w **Dashboard → Providers** i
zaimportuj je ponownie dowolnym obsługiwanym flow importu. Wszystkie nowo utworzone
połączenia automatycznie otrzymają własną rejestrację klienta.

---

## Dodawanie dwóch kont Kiro obok siebie

### Wymagania wstępne

- OmniRoute v3.8.0 lub nowszy.
- Działające konto Kiro (e-mail + hasło, Google lub logowanie GitHub).
- Opcjonalnie drugie konto Kiro.

### Krok 1: Zaimportuj pierwsze konto

1. Otwórz **Dashboard → Providers → Add Provider → Kiro**.
2. Wybierz jedną z opcji:
   - **Import Token** — wklej refresh token zaczynający się od `aorAAAAAG`.
   - **API Key** — wklej długoterminowy klucz API Kiro / CodeWhisperer.
   - **Google / GitHub login** — dokończ flow OAuth w przeglądarce.
   - **Auto-Import** — kliknij przycisk; OmniRoute odczyta poświadczenia z
     lokalnej bazy kiro-cli lub z `~/.aws/sso/cache`.
3. Połączenie zostaje zapisane. Flow oparte o refresh token automatycznie rejestrują
   dedykowanego klienta OIDC. Flow klucza API walidują klucz w AWS i nie przechowują refresh tokena.

### Krok 2: Zaimportuj drugie konto

Powtórz krok 1 dla drugiego konta. Ponieważ każdy import tworzy osobną rejestrację
klienta OIDC, oba połączenia są w pełni izolowane.

### Krok 3: Sprawdź, czy oba połączenia są aktywne

1. **Dashboard → Providers** — oba połączenia Kiro powinny mieć status **Active**.
2. **Dashboard → Health** — oba połączenia powinny przejść sprawdzenie zdrowia tokena.

### Krok 4: Użyj combo do routingu między kontami

Utwórz combo z oboma połączeniami jako celami, aby równoważyć obciążenie lub przełączać się awaryjnie między nimi:

```
kiro/kiro-dev → kiro/kiro-pro
```

Zobacz [FEATURES.md](./FEATURES.md) oraz dokumentację routingu dotyczącą konfiguracji combo.

---

## Użytkownicy Enterprise / IDC

Dla kont AWS IAM Identity Center (IDC) użyj flow **AWS Builder ID / IDC device-code**
z **Dashboard → Providers → Kiro → Device Code**. Flow device-code był zawsze w pełni
izolowany. Ponowny import tych połączeń nie jest potrzebny.

Użytkownicy enterprise pracujący w innym niż domyślny regionie AWS mogą podać region
przy imporcie przez Import Token API:

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

Pole `region` domyślnie ma wartość `us-east-1`, gdy zostanie pominięte.

---

## Flow importu klucza API

Autoryzacja kluczem API jest przeznaczona dla długoterminowych poświadczeń bearer
Kiro / AWS CodeWhisperer. Nie używa odświeżania OAuth, więc unika unieważniania
współdzielonych sesji OIDC.

### Dashboard

1. Otwórz **Dashboard -> Providers -> Kiro**.
2. Wybierz **API Key**.
3. Wklej klucz API oraz opcjonalnie region AWS (`us-east-1` domyślnie).
4. OmniRoute waliduje klucz i zapisuje połączenie.

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### Kontrakt wewnętrzny

Trasa API waliduje klucz, wywołując `KiroService.validateApiKey()`, które
używa `ListAvailableProfiles` względem endpointu CodeWhisperer/Amazon Q
dopasowanego do regionu i rozwiązuje `profileArn`.

Zapisane połączenie używa:

```json
{
  "authType": "apikey",
  "providerSpecificData": {
    "authMethod": "api_key",
    "region": "us-east-1",
    "profileArn": "arn:aws:codewhisperer:..."
  }
}
```

W czasie działania `KiroExecutor.buildHeaders()` wysyła klucz jako
`Authorization: Bearer <key>` i dodaje `tokentype: API_KEY`. Wywołania
quota/profile używają tego samego znacznika, dzięki czemu AWS traktuje bearer
jako długoterminowy klucz API, a nie jako token dostępu OIDC lub social.

---

## Wygaśnięcie klienta OIDC

Publiczne klienty AWS SSO OIDC zwykle wygasają po 90 dniach
(`clientSecretExpiresAt`). OmniRoute przechowuje ten znacznik czasu w `providerSpecificData`
na potrzeby obserwowalności. Jeśli połączenie przestanie się odświeżać po ok. 90 dniach,
zaimportuj je ponownie, aby uzyskać świeżą rejestrację klienta OIDC. Automatyczna
ponowna rejestracja po wygaśnięciu jest planowana jako przyszłe usprawnienie.

Połączenia oparte o klucz API nie mają wygaśnięcia klienta OIDC, ponieważ nie
odświeżają się przez AWS SSO OIDC.

---

## Rozwiązywanie problemów

### Drugie konto wciąż jest wylogowywane

- Sprawdź oba połączenia w **Dashboard → Providers** i upewnij się, że każde ma
  niepuste `clientId` w surowym JSON (widoczne przez ikonę informacji). Jeśli któremukolwiek
  połączeniu brakuje `clientId`, zostało zaimportowane przed v3.8.0 — zaimportuj je ponownie.

### Import kończy się błędem "Token validation failed"

- Upewnij się, że refresh token zaczyna się od `aorAAAAAG`.
- Upewnij się, że OmniRoute może dotrzeć do `https://oidc.us-east-1.amazonaws.com` (lub
  skonfigurowanego regionu). Jeśli jesteś za proxy firmowym, ustaw proxy na poziomie
  providera w **Dashboard → Settings → Proxies**.

### Import klucza API kończy się niepowodzeniem

- Potwierdź, że klucz to klucz API Kiro / CodeWhisperer, a nie refresh token.
- Potwierdź, że region AWS odpowiada kluczowi/kontu. Domyślnie jest to `us-east-1`.
- Klucz musi móc wywołać `ListAvailableProfiles`; w przeciwnym razie OmniRoute nie może
  rozwiązać wymaganego `profileArn`.

W przypadku innych problemów zobacz główny plik [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).
