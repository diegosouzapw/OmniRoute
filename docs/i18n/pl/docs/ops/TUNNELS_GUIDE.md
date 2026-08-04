---
title: "Przewodnik po tunelach"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Przewodnik po tunelach

> **Source of truth:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Last updated:** 2026-06-28 — v3.8.40

OmniRoute może udostępnić swój lokalny serwer (`http://localhost:20128`) w publicznym
internecie przez trzy backendy tuneli. Przydaje się to do:

- callbacków OAuth od dostawców chmurowych (Antigravity, Gemini, Cursor), które
  wymagają publicznie osiągalnego adresu przekierowania.
- udostępniania lokalnej instancji współpracownikom bez wdrażania VM.
- testów mobilnych, zdalnych lub między sieciami.

Wszystkie trzy backendy są zarządzane w procesie — OmniRoute uruchamia/zatrzymuje
binarkę lub SDK z dashboardu albo REST API. Nie jest wymagany reverse-proxy ani
konfiguracja systemd.

## Backendy w skrócie

| Backend                     | Trwałość                                            | Koszt             | Konfiguracja                                     |
| --------------------------- | --------------------------------------------------- | ----------------- | ------------------------------------------------ |
| **Cloudflare Quick Tunnel** | Efemeryczny (URL zmienia się przy każdym restarcie) | Free              | Zero — automatycznie instaluje `cloudflared`     |
| **ngrok**                   | Stabilny przy planie płatnym lub stałej domenie     | Free tier + paid  | Wymaga konta ngrok + authtoken                   |
| **Tailscale Funnel**        | Stabilny per węzeł w twoim tailnecie                | Free for personal | Wymaga instalacji Tailscale + login + Funnel ACL |

Implementacje znajdują się w `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` oraz `src/lib/tailscaleTunnel.ts`. Wszystkie trzy zwracają
wspólnie ukształtowany obiekt `status` z polami `phase`, `running`, `publicUrl`, `apiUrl`,
`targetUrl` i `lastError`, dzięki czemu dashboard może je renderować jednolicie.

## 1. Cloudflare Tunnel (Quick Tunnel)

`src/lib/cloudflaredTunnel.ts` uruchamia `cloudflared tunnel --url
http://localhost:<apiPort>` jako proces potomny i parsuje przypisany
URL `*.trycloudflare.com` ze stdout.

Kluczowe zachowania:

- **Auto-install.** Przy pierwszym użyciu OmniRoute pobiera najnowszą binarkę
  `cloudflared` z oficjalnych wydań GitHub (zarządzana instalacja trafia do
  `DATA_DIR/cloudflared/`). SHA256 pobranego assetu jest weryfikowany względem
  manifestu wydania przed uruchomieniem.
- **Tylko quick-tunnel.** Obecna implementacja uruchamia wyłącznie quick tunnel
  w stylu `--url`. Nazwane/trwałe tunele (`cloudflared tunnel
login` + `cloudflared tunnel route dns ...`) nie są orkiestrowane przez
  OmniRoute. URL-e są efemeryczne i zmieniają się przy każdym restarcie.
- **Nadzór procesu.** PID cloudflared oraz rozwiązany URL są zapisywane w
  `cloudflared-state.json`, dzięki czemu dashboard może wznowić status po przeładowaniu.

### Włączanie / wyłączanie przez REST

Endpoint przyjmuje body `{action: "enable" | "disable"}`, a nie osobne
ścieżki `start`/`stop`. Wymagana jest autoryzacja management (sesja admina lub
admin API key).

```bash
# Enable
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Status
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Disable
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Lub przez dashboard: **Settings → Tunnels → Cloudflare**.

### Opcjonalne zmienne środowiskowe

| Variable                                             | Purpose                                                                                           |
| ---------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | Nadpisuje ścieżkę do binarki. Jeśli ustawiona i poprawna, OmniRoute używa jej zamiast pobierania. |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Protokół transportu (domyślnie `http2`).                                                          |

## 2. ngrok

`src/lib/ngrokTunnel.ts` używa **`@ngrok/ngrok` SDK** (w procesie, bez
podprocesu CLI). Natywny moduł jest importowany leniwie przy pierwszym starcie, więc
platformy bez prebuilt binaries nie psują aplikacji przy bootowaniu.

### Wymagania wstępne

1. Zarejestruj się na <https://ngrok.com>.
2. Skopiuj authtoken z dashboardu ngrok.
3. Podaj go przez:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, lub
   - Dashboard: **Settings → Tunnels → ngrok**, lub
   - body REST (jednorazowo): `{"action":"enable","authToken":"<token>"}`.

Jeśli nic nie jest skonfigurowane, status zwraca `phase: "needs_auth"`.

### Włączanie / wyłączanie przez REST

```bash
# Enable (uses NGROK_AUTHTOKEN from env)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Enable with inline token
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Status
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Disable
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

Odpowiedź zawiera przypisany `publicUrl` (np.
`https://abcd-1234.ngrok-free.app`). Własne domeny, regiony i reguły polityk
trzeba skonfigurować w dashboardzie ngrok — sam OmniRoute tylko przekazuje
lokalny target URL do SDK.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` orkiestruje systemowe CLI `tailscale`, aby udostępnić
lokalny port API przez **Funnel** (publiczny egress Tailscale dla serve).
Obsługuje pełny cykl życia: install, login, daemon start, enable, disable.

Implementacja wywołuje `tailscale funnel --bg <port>` (tryb tła). Publiczny
URL ma postać `https://<machine>.<tailnet>.ts.net/`.

### Wymagania wstępne

1. Zainstaluj Tailscale (albo pozwól OmniRoute to zrobić — patrz endpoint `install` poniżej).
2. Zaloguj się (`tailscale login` lub przez endpoint `login` OmniRoute).
3. Włącz Funnel dla swojego tailnetu w konsoli admina Tailscale:
   <https://login.tailscale.com/admin/settings/features>.

Na Linuxie i macOS demon (`tailscaled`) wymaga `sudo` do sterowania. Endpointy
POST przyjmują opcjonalne pole `sudoPassword`, które jest przekazywane do
cache haseł MITM OmniRoute (`getCachedPassword` / `setCachedPassword`) na
czas wywołania. Windows używa domyślnej instalacji usługi pod
`C:\Program Files\Tailscale\tailscale.exe`.

### Endpointy REST

Tailscale ma bogatszą powierzchnię niż pozostałe backendy, bo instalacja,
logowanie, demon i tunel to osobne zagadnienia.

| Endpoint                              | Method | Purpose                                                             |
| ------------------------------------- | ------ | ------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`  | Zagregowany status tunelu (`phase`, `tunnelUrl`, `apiUrl` itd.)     |
| `/api/tunnels/tailscale/check`        | `GET`  | Kontrola niższego poziomu: zainstalowany? zalogowany? demon działa? |
| `/api/tunnels/tailscale/install`      | `POST` | Instalacja Tailscale (postęp strumieniowany SSE) — Linux/macOS      |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Start `tailscaled` na Linux/macOS                                   |
| `/api/tunnels/tailscale/login`        | `POST` | Rozpoczęcie logowania; zwraca `authUrl` do otwarcia w przeglądarce  |
| `/api/tunnels/tailscale/enable`       | `POST` | Start Funnel dla portu API                                          |
| `/api/tunnels/tailscale/disable`      | `POST` | Stop Funnel                                                         |

Wszystkie endpointy Tailscale wymagają autoryzacji management (zob. `routeUtils.ts ::
requireTailscaleAuth`).

Przykład enable:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Jeśli Funnel nie jest włączony w konsoli admina, odpowiedź zawiera
`funnelNotEnabled: true` oraz `enableUrl` do otwarcia w przeglądarce.

### Opcjonalne zmienne środowiskowe

| Variable        | Purpose                                  |
| --------------- | ---------------------------------------- |
| `TAILSCALE_BIN` | Nadpisuje ścieżkę do binarki `tailscale` |

## Podsumowanie endpointów

| Endpoint                              | Method | Body                                | Auth       |
| ------------------------------------- | ------ | ----------------------------------- | ---------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | management |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | management |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | management |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | management |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | management |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | management |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | management |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | management |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | management |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | management |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | management |

Nie ma centralnego endpointu `/api/settings/tunnels` — każdy backend jest
niezależny.

## Uwagi dotyczące callbacków OAuth

Gdy udostępniasz OmniRoute przez tunel, dashboard i przepływy OAuth muszą
budować URL-e callbacków względem **publicznego** hostname, a nie `localhost`. W przeciwnym razie
dostawca OAuth przekieruje użytkownika z powrotem na URL nieosiągalny dla jego serwerów
i handshake się nie uda.

Edycje w dashboardzie i zapisy ustawień nie wymagają przypinania hostname tunelu w
`NEXT_PUBLIC_BASE_URL`. Uwierzytelniony dashboard wysyła same-origin niebezpieczne
żądania z tokenem CSRF powiązanym z sesją, więc efemeryczne hosty Cloudflare Quick Tunnel
nadal można używać do zwykłego zarządzania UI po zalogowaniu.

Ustaw:

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

i zrestartuj OmniRoute przed rozpoczęciem OAuth. Dla efemerycznych Cloudflare Quick
Tunnel URL zmienia się po każdym restarcie, więc do produkcyjnego OAuth preferuj ngrok
z zarezerwowaną domeną albo Tailscale Funnel.

## Zdrowie i monitoring

Dashboard pokazuje stan tuneli pod **Settings → Tunnels**:

- Aktywny backend (lub backendy) i bieżąca `phase` (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- Bieżący publiczny URL oraz wyprowadzony URL API (`<publicUrl>/v1`).
- Lokalny target URL, na który tunel przekazuje ruch.
- Ostatni komunikat błędu, jeśli wystąpił.

Do programowego monitoringu odpytuj endpointy `GET` per backend. Jednoczesne
uruchomienie więcej niż jednego backendu jest dozwolone; OmniRoute śledzi każdy
niezależnie.

## Rozwiązywanie problemów

### "cloudflared binary not found"

OmniRoute próbuje auto-instalacji przy pierwszym użyciu. Jeśli instalacja jest zablokowana
(ograniczona sieć, brak dostępu do GitHub), pobierz `cloudflared` ręcznie z
<https://github.com/cloudflare/cloudflared/releases> i ustaw
`CLOUDFLARED_BIN=/path/to/cloudflared`.

### "ngrok: authtoken required"

`phase: "needs_auth"` oznacza, że nie znaleziono authtokenu. Ustaw `NGROK_AUTHTOKEN` w
`.env`, skonfiguruj go w dashboardzie albo przekaż `authToken` w body enable POST.

### "tailscale: funnel not enabled"

Gdy odpowiedź enable zawiera `funnelNotEnabled: true`, Funnel jest wyłączony
dla twojego tailnetu. Otwórz zwrócony `enableUrl` (lub stronę funkcji w konsoli admina)
i włącz Funnel.

### Zmiana URL tunelu psuje OAuth

Użyj ngrok z zarezerwowaną domeną albo Tailscale Funnel (oba stabilne per węzeł).
Cloudflare Quick Tunnels są z założenia efemeryczne i nie są zalecane do
długowiecznych callbacków OAuth.

### Permission denied na Linux/macOS dla Tailscale

`tailscaled` wymaga root. Podaj `sudoPassword` do odpowiedniego endpointu POST
albo uruchom demona samodzielnie (`sudo systemctl start tailscaled`).

## Zobacz też

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — outbound proxy (1proxy, SOCKS5, HTTP) dla
  ruchu egress.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — pełna lista zmiennych środowiskowych, w tym
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — alternatywy dla tunelowania przy stabilnym
  publicznym hostingu.
- Source: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
