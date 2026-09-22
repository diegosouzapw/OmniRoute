# CLI Machine-ID Token (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## Omówienie

Polecenia CLI OmniRoute uwierzytelniają się w lokalnym interfejsie API zarządzania za pomocą tokenu
`HMAC-SHA256(machine-id, salt)` wysyłanego w nagłówku żądania
`x-omniroute-cli-token`.

Pozwala to podpoleceniom CLI (`omniroute status`, `omniroute providers` itd.)
wywoływać punkty końcowe zarządzania bez konieczności podawania przez użytkownika tokenu JWT lub
hasła przy każdym uruchomieniu.

## Jak to działa

1. `getMachineTokenSync()` odczytuje sprzętowy identyfikator maszyny za pomocą `node-machine-id`
   (w przypadku niepowodzenia używa pustego ciągu, wyłączając uwierzytelnianie CLI).
2. Oblicza `HMAC-SHA256(machine_id, salt)` i zwraca pełny 64-znakowy
   skrót szesnastkowy — deterministyczny, nieodwracalny token powiązany z tą maszyną.
3. CLI wysyła token jako `x-omniroute-cli-token` tylko wtedy, gdy ustalone
   miejsce docelowe jest jawnym adresem URL interfejsu pętli zwrotnej (`localhost`, `127.0.0.0/8` lub
   IPv6 pętli zwrotnej). Żądania zawierające token używają `redirect: error`, dzięki czemu lokalne
   przekierowanie nie może przesłać go do innego źródła. Konteksty zdalne używają zamiast tego tokenów
   dostępu o ograniczonym zakresie. Jeśli wyprowadzenie tokenu nie jest możliwe, CLI pomija nagłówek,
   a `omniroute doctor` zgłasza błąd zamiast uznawać pusty token
   za prawidłowy.
4. Serwer (`src/server/authz/policies/management.ts`) ponownie oblicza
   oczekiwany token przy użyciu tej samej soli i porównuje go za pomocą `timingSafeEqual`, aby
   zapobiec jego pozyskaniu na podstawie analizy czasu wykonania.

## Właściwości bezpieczeństwa

| Właściwość                         | Szczegóły                                                                                                                                                                                                                                         |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Tylko pętla zwrotna**            | Akceptowany tylko wtedy, gdy zaufany znacznik lokalności peera serwera (ustalony na podstawie rzeczywistego adresu peera TCP) wskazuje pętlę zwrotną. Kontrolowany przez klienta nagłówek `Host` nigdy nie jest podstawą do ustalania lokalności. |
| **Porównanie w stałym czasie**     | `crypto.timingSafeEqual` zapobiega atakom czasowym.                                                                                                                                                                                               |
| **Nieodwracalność**                | Na podstawie wyniku HMAC nie można odzyskać identyfikatora maszyny.                                                                                                                                                                               |
| **Brak obejścia ochrony `always`** | `isAlwaysProtectedPath()` jest wykonywana przed sprawdzeniem tokenu CLI. `/api/shutdown` i `/api/settings/database` zawsze wymagają JWT.                                                                                                          |
| **Brak możliwości eksportu**       | Token nigdy nie jest zapisywany na dysku ani rejestrowany w dziennikach.                                                                                                                                                                          |

## Domyślna sól (losowa dla każdej instalacji)

Gdy `OMNIROUTE_CLI_SALT` nie jest ustawiona, solą jest losowy 64-znakowy ciąg szesnastkowy,
generowany jednokrotnie i zapisywany w `<DATA_DIR>/cli-token-salt.json` (tryb `0600`) —
nie jest to umieszczony w repozytorium literał `omniroute-cli-auth-v1`. Zarówno `getActiveSalt()` w
`src/lib/machineToken.ts`, jak i jego odpowiednik w `bin/cli/utils/cliToken.mjs` odczytują ten
sam plik, dzięki czemu serwer i każde wywołanie CLI w tej instalacji korzystają z tej
samej wartości; literał umieszczony w repozytorium jest używany wyłącznie jako ostateczna wartość zastępcza, gdy nie można jeszcze
ustalić utrwalonej soli ani soli ze zmiennej środowiskowej (na przykład w świeżej instalacji zawierającej tylko CLI,
zanim serwer zostanie po raz pierwszy uruchomiony). Eliminuje to słabość starej, stałej wartości domyślnej:
`/etc/machine-id` jest zwykle dostępny do odczytu dla wszystkich użytkowników, więc każdy użytkownik lokalny mógłby
w przeciwnym razie wyprowadzić ten sam token dla każdej instalacji, w której nigdy nie ustawiono
`OMNIROUTE_CLI_SALT`.

## Rotacja soli

Ustaw `OMNIROUTE_CLI_SALT`, aby zmienić token pochodny bez modyfikowania kodu — ta wartość ma zawsze pierwszeństwo przed zapisaną solą właściwą dla danej instalacji. Po rotacji wszystkie procesy CLI na tym komputerze będą automatycznie używać nowego tokenu. Jest to przydatne po wycieku listy procesów, który mógł ujawnić poprzednią wartość pochodną.

```bash
# Trwała rotacja (dodaj do profilu powłoki)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Sprawdź, czy używany jest nowy token
omniroute status
```

## Starszy format (SHA-256, 32 znaki) — nadal akceptowany

Przed wprowadzeniem powyższego formatu HMAC interfejs CLI wyprowadzał token jako
`SHA-256(machineId + salt).hex[0..32]` (32-znakowy prefiks) w
`bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` w `src/lib/machineToken.ts`).

W celu zachowania zgodności wstecznej serwer akceptuje **oba** formaty: weryfikator tworzy
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` i porównuje
przychodzący nagłówek z każdym z nich przy użyciu `timingSafeEqual`
(`src/server/authz/policies/management.ts` oraz `src/lib/middleware/cliTokenAuth.ts`).
Token jest więc prawidłowy, jeśli odpowiada **albo** 64-znakowemu skrótowi HMAC, albo 32-znakowemu
prefiksowi starszego formatu SHA-256.

**Wyłączenie:** ustaw `OMNIROUTE_DISABLE_CLI_TOKEN=true` (w środowisku lub pliku `.env`), aby całkowicie wyłączyć
mechanizm tokenu CLI; cały dostęp będzie wtedy wymagał jawnego klucza API. Jest to zalecane
na hostach używanych przez wielu użytkowników, ponieważ `machine-id` jest przypisany do urządzenia (a nie użytkownika), a inny
użytkownik tego samego hosta mógłby obliczyć identyczny token.

## Pliki

| Plik                                      | Przeznaczenie                                                   |
| ----------------------------------------- | --------------------------------------------------------------- |
| `src/lib/machineToken.ts`                 | Wyprowadzanie tokenu (`getMachineTokenSync`)                    |
| `bin/cli/utils/cliToken.mjs`              | Odpowiednik tego samego mechanizmu wyprowadzania po stronie CLI |
| `<DATA_DIR>/cli-token-salt.json`          | Zapisana losowa sól właściwa dla instalacji                     |
| `src/server/authz/headers.ts`             | Stała `CLI_TOKEN_HEADER`                                        |
| `src/server/authz/policies/management.ts` | Weryfikacja po stronie serwera                                  |
| `src/server/authz/routeGuard.ts`          | Sprawdzanie hosta pętli zwrotnej (`isLoopbackHost`)             |

## Zobacz także

- `docs/security/ROUTE_GUARD_TIERS.md` — poziomy ochrony tras
- `docs/architecture/AUTHZ_GUIDE.md` — pełny potok autoryzacji
