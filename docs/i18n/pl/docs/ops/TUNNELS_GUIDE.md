# Tunnels Guide (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Źródło prawdy:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Ostatnia aktualizacja:** 2026-06-28 — v3.8.40

OmniRoute może udostępnić swój lokalny serwer (`http://localhost:20128`) w publicznym
internecie za pośrednictwem trzech backendów tunelowych. Jest to przydatne do:

- Obsługi wywołań zwrotnych OAuth od dostawców usług chmurowych (Antigravity, Gemini, Cursor), które wymagają
  publicznie dostępnego adresu URL przekierowania.
- Udostępniania lokalnej instancji członkom zespołu bez wdrażania maszyny wirtualnej.
- Testowania na urządzeniach mobilnych, zdalnie lub między różnymi sieciami.

Wszystkie trzy backendy są zarządzane w ramach procesu — OmniRoute uruchamia i zatrzymuje bazowy
plik binarny lub SDK z poziomu panelu albo interfejsu REST API. Nie jest wymagana
konfiguracja reverse proxy ani systemd.

## Przegląd backendów

| Backend                     | Trwałość                                                           | Koszt                          | Konfiguracja                                          |
| --------------------------- | ------------------------------------------------------------------ | ------------------------------ | ----------------------------------------------------- |
| **Cloudflare Quick Tunnel** | Tymczasowy (adres URL zmienia się po każdym ponownym uruchomieniu) | Bezpłatny                      | Brak — automatycznie instaluje `cloudflared`          |
| **ngrok**                   | Stabilny przy skonfigurowanym płatnym planie lub stałej domenie    | Plan bezpłatny + płatny        | Wymaga konta ngrok i authtokena                       |
| **Tailscale Funnel**        | Stabilny dla danego węzła w obrębie tailnetu                       | Bezpłatny do użytku osobistego | Wymaga instalacji Tailscale, zalogowania i ACL Funnel |

Implementacje znajdują się w `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` i `src/lib/tailscaleTunnel.ts`. Wszystkie trzy zwracają
obiekt `status` o wspólnej strukturze, zawierający pola `phase`, `running`, `publicUrl`,
`apiUrl`, `targetUrl` i `lastError`, dzięki czemu panel może wyświetlać je w jednolity sposób.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` uruchamia `cloudflared` jako proces potomny. Obsługuje
dwa tryby wybierane w zależności od tego, czy podano konfigurację nazwanego tunelu:

- **Quick tunnel (domyślny).** Uruchamia `cloudflared tunnel --url
http://localhost:<apiPort>` i odczytuje przydzielony adres URL `*.trycloudflare.com`
  ze standardowego wyjścia. Adresy URL są tymczasowe i zmieniają się po każdym ponownym uruchomieniu.
- **Named tunnel (opcjonalny).** Gdy `CLOUDFLARED_CONFIG` wskazuje lokalnie zarządzany
  plik `config.yml` cloudflared, OmniRoute uruchamia `cloudflared tunnel --no-autoupdate
--config <path> run`, zapewniając **stabilną, nazwaną nazwę hosta**. Konfiguracja
  określa UUID tunelu, `credentials-file` oraz routing `ingress`, dlatego nie jest
  przekazywana opcja `--url` ani wymagany token panelu Zero Trust. Polecenie `run` odczytuje
  dane uwierzytelniające z bezwzględnej ścieżki `credentials-file` w konfiguracji — plik `cert.pem`
  nie jest potrzebny (jest używany wyłącznie do zarządzania cyklem życia tunelu).

Najważniejsze zachowania:

- **Automatyczna instalacja.** Przy pierwszym użyciu OmniRoute pobiera najnowszy plik binarny
  `cloudflared` z oficjalnych wydań na GitHubie (zarządzana instalacja znajduje się w
  `DATA_DIR/cloudflared/`). Przed wykonaniem suma SHA256 pobranego zasobu jest weryfikowana
  na podstawie manifestu wydania.
- **Nadzorowanie procesu.** PID procesu cloudflared i ustalony adres URL są zapisywane w
  `quick-tunnel-state.json`, dzięki czemu panel może odtworzyć stan po ponownym załadowaniu.

### Konfiguracja nazwanego tunelu (stabilna nazwa hosta)

1. Utwórz lokalnie zarządzany tunel za pomocą CLI cloudflared (jednorazowo):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Utwórz plik `~/.cloudflared/config.yml`, który kieruje nazwę hosta do lokalnego
   portu API OmniRoute (domyślnie 20128):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. Wskaż OmniRoute plik konfiguracyjny i (ponownie) uruchom tunel:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # opcjonalne — zastępuje nazwę hosta zgłaszaną przez OmniRoute; w przeciwnym razie zostanie odczytana z
   # pierwszej reguły ingress w konfiguracji:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Włącz tunel w taki sam sposób jak quick tunnel (przez REST, panel lub CLI
   opisane poniżej). Nazwany tunel nie udostępnia publicznego adresu URL do odczytania, dlatego gotowość jest wykrywana
   na podstawie zarejestrowanego połączenia cloudflared z siecią brzegową, a wartości `publicUrl`/`apiUrl` są
   pobierane z `CLOUDFLARED_HOSTNAME` (lub z nazwy hosta w pierwszej regule ingress konfiguracji).

### Włączanie i wyłączanie przez REST

Endpoint używa treści `{action: "enable" | "disable"}`, a nie osobnych ścieżek
`start`/`stop`. Wymagane jest uwierzytelnienie administracyjne (sesja administratora lub klucz API administratora).

```bash
# Włącz
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Stan
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Wyłącz
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Lub przez panel: **Ustawienia → Tunele → Cloudflare**.

### Opcjonalne zmienne środowiskowe

| Zmienna                                              | Przeznaczenie                                                                                                                                                                              |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `CLOUDFLARED_BIN`                                    | Zastępuje ścieżkę do pliku binarnego. Jeśli jest ustawiona i prawidłowa, OmniRoute używa jej zamiast pobierania pliku.                                                                     |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Protokół transportowy (domyślnie `http2`; dostępne są również `quic` i `auto`).                                                                                                            |
| `CLOUDFLARED_CONFIG`                                 | Ścieżka do zarządzanego lokalnie pliku `config.yml` cloudflared. Gdy jest ustawiona, OmniRoute uruchamia **nazwany/trwały** tunel (`tunnel --config <path> run`) zamiast szybkiego tunelu. |
| `CLOUDFLARED_HOSTNAME`                               | Zastępuje zgłaszaną publiczną nazwę hosta nazwanego tunelu (np. `ai.example.com`). Jeśli nie jest ustawiona, jest odczytywana z pierwszej nazwy hosta `ingress` w konfiguracji.            |

## 2. ngrok

`src/lib/ngrokTunnel.ts` używa zestawu SDK **`@ngrok/ngrok`** (wewnątrz procesu, bez podprocesu CLI). Moduł natywny jest importowany leniwie przy pierwszym uruchomieniu, dzięki czemu brak gotowych plików binarnych dla danej platformy nie powoduje błędu aplikacji podczas uruchamiania.

### Wymagania wstępne

1. Zarejestruj się na stronie <https://ngrok.com>.
2. Skopiuj swój token uwierzytelniający z panelu ngrok.
3. Przekaż go na jeden z następujących sposobów:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, lub
   - Panel: **Ustawienia → Tunele → ngrok**, lub
   - Treść żądania REST (jednorazowo): `{"action":"enable","authToken":"<token>"}`.

Jeśli nie skonfigurowano żadnej z tych opcji, stan zwraca `phase: "needs_auth"`.

### Włączanie / wyłączanie przez REST

```bash
# Włączenie (używa NGROK_AUTHTOKEN ze środowiska)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Włączenie z tokenem przekazanym bezpośrednio
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Stan
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Wyłączenie
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Odpowiedź zawiera przypisany adres `publicUrl` (np.
`https://abcd-1234.ngrok-free.app`). Domeny niestandardowe, regiony i reguły zasad
muszą zostać skonfigurowane w panelu ngrok — sam OmniRoute przekazuje jedynie
adres URL lokalnego celu do zestawu SDK.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` zarządza systemowym interfejsem CLI `tailscale`, aby udostępnić
lokalny port API przez **Funnel** (mechanizm Tailscale udostępniający usługę serve w publicznym internecie).
Obsługuje pełny cykl życia: instalację, logowanie, uruchamianie demona, włączanie i wyłączanie.

Implementacja wywołuje `tailscale funnel --bg <port>` (tryb działania w tle).
Publiczny adres URL ma postać `https://<machine>.<tailnet>.ts.net/`.

### Wymagania wstępne

1. Zainstaluj Tailscale (lub pozwól zrobić to OmniRoute — zobacz poniższy endpoint `install`).
2. Zaloguj się (`tailscale login` lub za pomocą endpointu `login` OmniRoute).
3. Włącz Funnel dla swojej sieci tailnet w konsoli administracyjnej Tailscale:
   <https://login.tailscale.com/admin/settings/features>.

W systemach Linux i macOS sterowanie demonem (`tailscaled`) wymaga użycia `sudo`.
Endpointy POST przyjmują opcjonalne pole `sudoPassword`, które na czas wywołania
jest przekazywane do pamięci podręcznej haseł MITM OmniRoute (`getCachedPassword` / `setCachedPassword`).
System Windows korzysta z domyślnej instalacji usługi w lokalizacji
`C:\Program Files\Tailscale\tailscale.exe`.

### Endpointy REST

Tailscale udostępnia bogatszy interfejs niż pozostałe backendy, ponieważ instalacja,
logowanie, demon i tunel są odrębnymi elementami.

| Endpoint                              | Metoda | Przeznaczenie                                                               |
| ------------------------------------- | ------ | --------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | Zbiorczy stan tunelu (`phase`, `tunnelUrl`, `apiUrl` itd.)                  |
| `/api/tunnels/tailscale/check`        | `GET`  | Kontrola niskopoziomowa: czy zainstalowano? zalogowano? czy demon działa?   |
| `/api/tunnels/tailscale/install`      | `POST` | Instalacja Tailscale (zdarzenia postępu przesyłane przez SSE) — Linux/macOS |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Uruchomienie `tailscaled` w systemie Linux/macOS                            |
| `/api/tunnels/tailscale/login`        | `POST` | Rozpoczęcie procesu logowania; zwraca `authUrl` do otwarcia w przeglądarce  |
| `/api/tunnels/tailscale/enable`       | `POST` | Uruchomienie Funnel dla portu API                                           |
| `/api/tunnels/tailscale/disable`      | `POST` | Zatrzymanie Funnel                                                          |

Wszystkie endpointy Tailscale wymagają uwierzytelnienia zarządzającego (zobacz `routeUtils.ts ::
requireTailscaleAuth`).

Przykład włączenia:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Jeśli Funnel nie jest włączony w konsoli administracyjnej, odpowiedź zawiera
`funnelNotEnabled: true` oraz adres `enableUrl` do otwarcia w przeglądarce.

### Opcjonalne zmienne środowiskowe

| Zmienna         | Przeznaczenie                                          |
| --------------- | ------------------------------------------------------ |
| `TAILSCALE_BIN` | Zastąpienie ścieżki do pliku wykonywalnego `tailscale` |

## Podsumowanie endpointów

| Endpoint                              | Metoda | Treść                               | Uwierzytelnianie |
| ------------------------------------- | ------ | ----------------------------------- | ---------------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | zarządzanie      |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | zarządzanie      |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | zarządzanie      |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | zarządzanie      |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | zarządzanie      |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | zarządzanie      |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | zarządzanie      |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | zarządzanie      |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | zarządzanie      |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | zarządzanie      |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | zarządzanie      |

Nie ma centralnego endpointu `/api/settings/tunnels` — każdy backend działa
niezależnie.

## Uwagi dotyczące wywołań zwrotnych OAuth

Gdy udostępniasz OmniRoute przez tunel, panel i przepływy OAuth muszą tworzyć
adresy URL wywołań zwrotnych na podstawie **publicznej** nazwy hosta, a nie
`localhost`. W przeciwnym razie dostawca OAuth przekieruje użytkownika z powrotem
na adres URL, do którego jego serwery nie mają dostępu, i uzgadnianie zakończy się
niepowodzeniem.

Edycja w panelu i zapisywanie ustawień nie wymagają przypisywania nazwy hosta
tunelu na stałe w `NEXT_PUBLIC_BASE_URL`. Uwierzytelniony panel wysyła żądania
modyfikujące stan do tego samego źródła z tokenem CSRF powiązanym z sesją, dzięki
czemu efemeryczne hosty Cloudflare Quick Tunnel nadal mogą być używane do
standardowego zarządzania przez interfejs użytkownika po zalogowaniu.

Ustaw:

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

i uruchom ponownie OmniRoute przed rozpoczęciem przepływu OAuth. W przypadku
efemerycznych tuneli Cloudflare Quick Tunnel adres URL zmienia się po każdym
ponownym uruchomieniu, dlatego do produkcyjnego użycia OAuth preferuj ngrok
z zarezerwowaną domeną lub Tailscale Funnel.

## Kondycja i monitorowanie

Panel przedstawia stan tunelu w sekcji **Ustawienia → Tunele**:

- Aktywne backendy i ich bieżąca wartość `phase` (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- Bieżący publiczny adres URL i wyprowadzony z niego adres URL API
  (`<publicUrl>/v1`).
- Lokalny docelowy adres URL, do którego tunel przekazuje ruch.
- Ostatni komunikat o błędzie, jeśli wystąpił.

Aby monitorować programowo, odpytuj endpointy `GET` poszczególnych backendów.
Jednoczesne uruchomienie więcej niż jednego backendu jest dozwolone; OmniRoute
będzie śledzić każdy z nich niezależnie.

## Rozwiązywanie problemów

### „Nie znaleziono pliku binarnego cloudflared”

Przy pierwszym użyciu OmniRoute podejmuje próbę automatycznej instalacji. Jeśli
instalacja jest blokowana (ograniczona sieć, brak dostępu do GitHub), pobierz
`cloudflared` ręcznie z
<https://github.com/cloudflare/cloudflared/releases> i ustaw
`CLOUDFLARED_BIN=/path/to/cloudflared`.

### „ngrok: wymagany authtoken”

`phase: "needs_auth"` oznacza, że nie znaleziono tokenu uwierzytelniającego.
Ustaw `NGROK_AUTHTOKEN` w `.env`, skonfiguruj go za pośrednictwem panelu lub
przekaż `authToken` w treści żądania POST włączającego tunel.

### „tailscale: funkcja funnel nie jest włączona”

Jeśli odpowiedź na żądanie włączenia zawiera `funnelNotEnabled: true`, funkcja
Funnel jest wyłączona dla Twojej sieci tailnet. Otwórz zwrócony adres `enableUrl`
(lub stronę tej funkcji w konsoli administracyjnej) i włącz Funnel.

### Zmiany adresu URL tunelu zakłócają OAuth

Użyj ngrok z zarezerwowaną domeną lub Tailscale Funnel (oba zapewniają stabilny
adres dla danego węzła). Tunele Cloudflare Quick Tunnel są z założenia
efemeryczne i nie są zalecane do długotrwałego używania wywołań zwrotnych OAuth.

### Odmowa dostępu w systemie Linux/macOS dla Tailscale

`tailscaled` wymaga uprawnień administratora. Przekaż `sudoPassword` do
odpowiedniego endpointu POST lub uruchom demona samodzielnie
(`sudo systemctl start tailscaled`).

## Zobacz także

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — wychodzący serwer proxy (1proxy, SOCKS5, HTTP) dla
  ruchu wychodzącego.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — pełna lista zmiennych środowiskowych, w tym
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — alternatywy dla tunelowania zapewniające stabilny
  hosting publiczny.
- Źródło: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
