# 🐳 Docker Guide — OmniRoute (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Kompletny przewodnik dotyczący wdrażania za pomocą Dockera. Aby szybko rozpocząć, zobacz [sekcję README dotyczącą Dockera](../README.md#-docker).

## Spis treści

- [Szybkie uruchomienie](#quick-run)
- [Z plikiem środowiskowym](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Dostępne profile](#available-profiles)
- [Konfigurowanie narzędzi CLI hosta, gdy OmniRoute działa w Dockerze](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Kontener pomocniczy Redis](#redis-sidecar)
- [Compose dla środowiska produkcyjnego](#production-compose)
- [Etapy pliku Dockerfile](#dockerfile-stages)
- [Kluczowe zmienne środowiskowe](#critical-environment-variables)
- [Docker Compose z Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Szybki tunel Cloudflare](#cloudflare-quick-tunnel)
- [Tagi obrazów](#image-tags)
- [Dostępność: domyślna baza SQLite obsługuje jedną replikę](#availability-default-sqlite-is-single-replica)
- [Błędy regionalne Gemini wewnątrz Dockera](#gemini-regional-errors-inside-docker)
- [Ważne uwagi](#important-notes)

---

## Szybkie uruchomienie

> **Samodzielny hosting za pomocą jednego polecenia?** Zobacz
> [przewodnik samodzielnego hostingu](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (opublikowany obraz +
> Redis, dostęp wyłącznie przez interfejs pętli zwrotnej, bez wyboru profilu). Poniższa sekcja szybkiego uruchomienia opisuje
> wariant z pojedynczym kontenerem przeznaczony dla użytkowników, którzy korzystają już z Redis uruchomionego w innym miejscu.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Z plikiem środowiskowym

```bash
# Najpierw skopiuj i zmodyfikuj plik .env
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Docker Compose

```bash
# Profil podstawowy (bez narzędzi CLI)
docker compose --profile base up -d

# Profil CLI (wbudowane Claude Code, Codex i OpenClaw)
docker compose --profile cli up -d

# Profil hosta (przede wszystkim dla systemu Linux; montuje pliki binarne CLI hosta w trybie tylko do odczytu)
docker compose --profile host up -d

# Profil internetowy (Chromium/Playwright dla dostawców korzystających z sesji internetowych)
docker compose --profile web up -d

# Połącz profil CLI z kontenerem pomocniczym CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Dostępne profile

OmniRoute udostępnia profile Compose przeznaczone dla głównych wariantów wdrożenia. Wybierz profil pasujący do Twojego środowiska.

| Profil            | Usługa           | Kiedy używać                                                                                                                                                                               | Polecenie                                    |
| ----------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------- |
| `base` (domyślny) | `omniroute-base` | Serwer bez interfejsu graficznego / minimalne środowisko uruchomieniowe, bez dołączonych narzędzi CLI dostawców                                                                            | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | Przepływy pracy agentów wywołujące `omniroute providers/setup/doctor` oraz dołączone narzędzia CLI (Codex, Claude Code, Droid, OpenClaw)                                                   | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | Hosty z systemem Linux, które potrzebują dostępu do narzędzi CLI hosta podobnego do `network_mode` przez montowanie `~/.local/bin`, `~/.codex`, `~/.claude` itd. w trybie tylko do odczytu | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | Uruchamianie kontenera pomocniczego [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) na porcie `8317` w celu pośredniczenia w dostępie do nadrzędnych narzędzi CLI              | `docker compose --profile cliproxyapi up -d` |
| `web`             | `omniroute-web`  | Dostawcy korzystający z sesji internetowych, którzy wymagają przeglądarki: `gemini-web`, `claude-web`, `claude-turnstile` (buduje `runner-web`, zawiera Chromium)                          | `docker compose --profile web up -d`         |

> Można łączyć wiele profili: `docker compose --profile cli --profile cliproxyapi up -d`.

## Konfigurowanie narzędzi CLI hosta, gdy OmniRoute działa w Dockerze

`omniroute setup-codex`, `setup-claude`, `config set <tool>` oraz przycisk
**Zapisz konfigurację** w panelu zapisują pliki takie jak `~/.codex/*.config.toml`. Te ścieżki
mają znaczenie wyłącznie na maszynie, na której faktycznie działa CLI. Uruchomienie
tych poleceń wewnątrz kontenera spowoduje zapis w katalogu domowym kontenera (`/home/node` —
obraz działa jako `USER node`), z którego żadne CLI hosta nigdy nie odczyta danych i który
zostanie usunięty przy ponownym utworzeniu kontenera.

OmniRoute wykrywa taką sytuację i odmawia zapisu, wyświetlając instrukcje zamiast
zgłaszać sukces, z którego nie można skorzystać: CLI kończy działanie z kodem `2`, a API odpowiada
kodem `422` z `containerEphemeralTarget: true`.

### Zalecane: uruchom CLI na hoście, a OmniRoute w Dockerze

Kontener udostępnia API, natomiast CLI konfiguruje narzędzia hosta.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # skieruj CLI do kontenera
omniroute setup-codex                      # zapisuje właściwy katalog ~/.codex na hoście
```

To właściwy wybór, gdy Codex, Claude Code, Cursor lub podobne narzędzia działają na
laptopie — co jest typową konfiguracją.

### Alternatywa: zamontuj katalogi konfiguracji hosta jako bind mount (profil `host`)

Jeśli chcesz, aby sam kontener zapisywał konfigurację hosta, zamontuj w nim
odpowiednie katalogi i ustaw `CLI_CONFIG_HOME` na katalog główny montowania. Profil `host`
jest już skonfigurowany w ten sposób:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Bind mount sprawia, że ścieżce można zaufać: OmniRoute odczytuje
`/proc/self/mountinfo` i zezwala na zapis w zamontowanych ścieżkach (oraz w katalogach,
których podkatalogi są punktami montowania, co dokładnie odpowiada powyższej strukturze
`/host-home`), jednocześnie nadal odmawiając zapisu w niezamontowanych ścieżkach.

### Wyjście awaryjne: skonfiguruj CLI samego kontenera (używaj oszczędnie)

Gdy CLI rzeczywiście znajdują się wewnątrz kontenera (profil `cli`), zapis
jest zamierzony. Przekaż `--allow-container-write` do dowolnego polecenia `setup-*` albo ustaw
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` dla serwera. Zapis zostanie wykonany
z ostrzeżeniem, że dane nie przetrwają usunięcia kontenera.

> **Ostrzeżenie dotyczące bezpieczeństwa — profil `cli` + montowanie `docker.sock`.**
> Profil `cli` montuje `/var/run/docker.sock` jako bind mount, aby działający w kontenerze
> mechanizm automatycznej aktualizacji mógł ponownie utworzyć stos za pośrednictwem demona hosta
> (`src/lib/system/autoUpdate.ts` sprawdza obecność tego gniazda i pomija
> ścieżkę Dockera, gdy go nie ma). To gniazdo stanowi **granicę zaufania zapewniającą uprawnienia
> root na hoście**: wszystko, co może uzyskać do niego dostęp, steruje demonem Dockera hosta jako
> root — może tworzyć, sprawdzać, zatrzymywać i usuwać dowolne kontenery na hoście.
> Konsekwencje:
>
> 1. **Nigdy nie udostępniaj portu profilu `cli` w sieci.** Opublikuj
>    go na `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — profil `cli` dostępny z sieci LAN sprawia, że każde zdalne wykonanie kodu na poziomie panelu
>    prowadzi do pełnego przejęcia hosta.
> 2. **Nie montuj żadnych dodatkowych katalogów hosta w profilu `cli`.**
>    Gniazdo Dockera w połączeniu z dowolnym dodatkowym montowaniem zapewnia kontenerowi pełny
>    dostęp do odczytu i zapisu w systemie plików oraz konfiguracji hosta. Jeśli narzędzie musi
>    mieć dostęp do projektu, uruchom je lokalnie za pomocą pliku binarnego CLI — nie montuj projektu
>    w kontenerze `cli`.
>
> Jeśli nie potrzebujesz automatycznej aktualizacji wewnątrz kontenera, nie włączaj profilu `cli`
> (`COMPOSE_PROFILES=core,redis` lub krócej). Pozostałe profile nie
> montują gniazda Dockera.
>
> Zobacz `docs/security/MITM-TPROXY-DECRYPT.md` (git; plik nie jest kompilowany do `/docs`), aby poznać powiązany model zagrożeń
> dotyczący MITM, oraz `docs/security/SUPPLY_CHAIN.md`, aby uzyskać informacje o
> łańcuchu pochodzenia plików binarnych `codex`/`claude-code`/`droid`/`openclaw`.

## Kontener pomocniczy Redis

OmniRoute korzysta z Redis jako zaplecza rozproszonego ogranicznika częstotliwości żądań i współdzielonej pamięci podręcznej. Usługa `redis` jest **zawsze zdefiniowana** w pliku `docker-compose.yml` (nie jest ograniczona żadnym profilem) i uruchamia się wraz z dowolnym innym profilem.

| Szczegół                        | Wartość                                   |
| ------------------------------- | ----------------------------------------- |
| Obraz                           | `redis:7-alpine`                          |
| Nazwa kontenera                 | `omniroute-redis`                         |
| Port wewnętrzny                 | `6379`                                    |
| Port hosta (nadpisywalny)       | `REDIS_PORT` (domyślnie `6379`)           |
| Adres powiązania (nadpisywalny) | `REDIS_BIND_HOST` (domyślnie `127.0.0.1`) |
| Wolumin                         | `omniroute-redis-data` → `/data`          |
| Kontrola kondycji               | `redis-cli ping` (interwał 10 s)          |

Powiązane zmienne środowiskowe:

- `REDIS_URL` — ciąg połączenia przekazywany do aplikacji (domyślnie `redis://redis:6379`).
- `REDIS_PORT` — mapowanie portu po stronie hosta dla kontenera Redis.
- `REDIS_BIND_HOST` — interfejs hosta, na którym publikowany jest port. Domyślnie `127.0.0.1`.

> **Dlaczego domyślnie interfejs pętli zwrotnej:** kontener pomocniczy działa bez `requirepass`, a kontenery
> aplikacji łączą się z nim przez sieć compose (`redis:6379`) — opublikowany port służy
> wyłącznie narzędziom działającym po stronie hosta (`redis-cli`, lokalne `npm run dev`). Publikowanie na
> `0.0.0.0` udostępniłoby nieuwierzytelniony Redis każdemu hostowi w sieci LAN. Jeśli ustawisz
> `REDIS_BIND_HOST=0.0.0.0`, dodaj również `--requirepass` do pola `command:` usługi.

**Wyłączanie Redis** nie jest zalecane (ogranicznik częstotliwości żądań przejdzie w tryb awaryjny oparty na pamięci). Jeśli jest to konieczne, usuń lub zakomentuj blok usługi `redis:` w pliku `docker-compose.yml` albo przeskaluj ją do zera:

```bash
docker compose up -d --scale redis=0
```

## Compose dla środowiska produkcyjnego

Aby uruchomić odizolowaną migawkę produkcyjną równolegle ze środowiskiem deweloperskim, użyj pliku `docker-compose.prod.yml`.

| Szczegół             | Wartość                                                                              |
| -------------------- | ------------------------------------------------------------------------------------ |
| Plik                 | `docker-compose.prod.yml`                                                            |
| Domyślny port panelu | `PROD_DASHBOARD_PORT=20130` (mapowany na wewnętrzny `${DASHBOARD_PORT:-20128}`)      |
| Domyślny port API    | `PROD_API_PORT=20131`                                                                |
| Obraz                | `omniroute:prod` (zbudowany z celu `runner-cli`)                                     |
| Kontener Redis       | `omniroute-redis-prod` (`redis:8.6.2`, dedykowany wolumin `redis-prod-data`)         |
| Wolumin danych       | `omniroute-prod-data` (nazwany, zachowywany między przebudowami)                     |
| Kontrole kondycji    | `node healthcheck.mjs` + `redis-cli ping`, z `depends_on` zależnym od kondycji Redis |

Sposób użycia:

```bash
# Zbuduj i uruchom stos produkcyjny
docker compose -f docker-compose.prod.yml up -d --build

# Wyświetlaj logi na bieżąco
docker compose -f docker-compose.prod.yml logs -f

# Zatrzymaj stos (zachowaj woluminy)
docker compose -f docker-compose.prod.yml down
```

Stos produkcyjny działa równolegle ze środowiskiem deweloperskim compose (ma inne nazwy kontenerów, porty i woluminy), dzięki czemu możesz kontynuować lokalne prace, podczas gdy środowisko produkcyjne pozostaje uruchomione.

## Etapy Dockerfile

Repozytorium zawiera wieloetapowy Dockerfile (`Dockerfile`). Udostępnione są cztery etapy; wybierz odpowiedni `target` dla swojego przypadku użycia.

| Etap          | Obraz bazowy          | Przeznaczenie                                                                                                                                                                                                                                                                                                                |
| ------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Instaluje zależności (`npm ci --legacy-peer-deps`) i uruchamia `npm run build` (domyślnie Turbopack — zobacz sekcję Zasoby podczas kompilacji poniżej)                                                                                                                                                                       |
| `runner-base` | `node:26-trixie-slim` | Środowisko uruchomieniowe produkcji z autonomicznym wynikiem kompilacji Next.js. **Nie zawiera narzędzi CLI dostawców.**                                                                                                                                                                                                     |
| `runner-cli`  | `runner-base`         | Dodaje `git`, `docker.io`, `docker-compose` oraz globalne narzędzia CLI: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Wybierz ten etap dla przepływów pracy opartych na agentach.**                                                                                                                  |
| `runner-web`  | `runner-base`         | Dodaje Playwright oraz przeglądarkę Chromium (`--with-deps`) dla dostawców sesji internetowych: `gemini-web`, `claude-web`, `claude-turnstile`. **Wybierz ten etap, jeśli używasz tych dostawców** — bez niego zwykły obraz kończy się niepowodzeniem podczas żądania (zobacz uwagę dotyczącą `-web` w sekcji Kanały wydań). |

Ręczne zbudowanie określonego celu:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Zasoby podczas kompilacji

Trzy argumenty kompilacji kontrolują koszt etapu `builder`. Obowiązują one wyłącznie podczas kompilacji —
`OMNIROUTE_MEMORY_MB` (poniżej) jest osobnym parametrem środowiska uruchomieniowego.

| Argument kompilacji         | Domyślnie | Efekt                                                                                                    |
| --------------------------- | --------- | -------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`       | `0` kompiluje za pomocą webpacka: mniejsze szczytowe zużycie pamięci, ale wolniej. `1` włącza Turbopack. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`    | Limit sterty V8 (`--max-old-space-size`) dla uruchomionego procesu `next build`.                         |
| `OMNIROUTE_BUILD_WORKERS`   | `2`       | Ustawia `CIRCLE_NODE_TOTAL`; Next wylicza `workers = N - 1` na potrzeby zbierania danych stron.          |

`OMNIROUTE_BUILD_WORKERS` to parametr, który należy zwiększyć na wydajnej maszynie kompilującej, i ten,
który należy podejrzewać, gdy kompilacja przy ograniczonych zasobach kończy się niepowodzeniem **po** komunikacie `✓ Compiled successfully`. Każdy
proces roboczy danych stron jest osobnym procesem, podobnie jak nadrzędny proces `next build`;
odtworzenie problemu na działającym serwerze VPS (zgłoszenie #7518) wykazało, że szczytowe RSS każdego procesu wynosi
~4,5 GB niezależnie od flagi sterty `NODE_OPTIONS` (Turbopack kompiluje w
natywnej pamięci/Rust poza stertą V8). Domyślna wartość `2` (→ 1 proces roboczy, łącznie 2
procesy) jest dostosowana do hostowanych przez GitHub maszyn wykonawczych z 16 GB pamięci i 4 procesorami wirtualnymi, których
używa potok publikowania. Przy `8` (→ 7 procesów roboczych) tej maszynie wykonawczej zabrakło pamięci, a
buildkit przerwał krok z błędem `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 procesy robocze) nadal się nie mieściło, gdy RSS poszczególnych procesów zmierzono
bezpośrednio, zamiast je szacować. `tests/unit/docker-build-memory-budget.test.ts`
wykonuje obliczenia na podstawie zmierzonej wartości i kończy się niepowodzeniem, jeśli którykolwiek z parametrów
przekroczy możliwości maszyny wykonawczej.

Turbopack kompiluje w natywnej pamięci Rust, która znajduje się **poza** stertą V8, dlatego
`OMNIROUTE_BUILD_MEMORY_MB` jej nie ogranicza. Na hoście z limitem pamięci kompilacja
zostaje wtedy zakończona sygnałem SIGKILL przez mechanizm OOM bez jakiegokolwiek komunikatu o błędzie — po prostu
zatrzymuje się w trakcie `Creating an optimized production build`, co wygląda raczej jak zawieszenie
niż brak pamięci. Dlatego `Dockerfile` domyślnie używa webpacka
(`OMNIROUTE_USE_TURBOPACK=0`), w przeciwieństwie do `npm run dev` / `npm run build`, gdzie
Turbopack jest domyślnym rozwiązaniem w kodzie: zwykłe `docker build .` bez argumentów kompilacji (uruchamiane przez
Railway i inne hostingi wdrażane jednym kliknięciem) nie może kończyć się bez komunikatu na maszynie kompilującej
z ograniczoną pamięcią. Opublikowane obrazy już jawnie przekazują
`OMNIROUTE_USE_TURBOPACK=0` w `docker-publish.yml`. Na maszynie kompilującej z dużą ilością pamięci RAM włącz
Turbopack, aby przyspieszyć kompilację:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

Opcja `webpackBuildWorker` jest włączona, dlatego `next build` uruchamia proces nadrzędny **oraz** proces roboczy,
a każdy z nich osobno respektuje `OMNIROUTE_BUILD_MEMORY_MB`. Ustaw limit kontenera
na wartość większą niż mniej więcej dwukrotność tej wartości, a nie jednokrotność.

Pomiary dla tego drzewa (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Narzędzie pakujące | Limit kontenera | Wynik                                                 |
| ------------------ | --------------- | ----------------------------------------------------- |
| Turbopack          | 8 GiB / 16 GiB  | zakończone przez OOM przy obu, bez komunikatu         |
| webpack            | 8 GiB           | proces roboczy kompilacji zakończony sygnałem SIGKILL |
| webpack            | 12 GiB          | powodzenie, wartość szczytowa 11,1 GiB                |

### Domyślne ustawienia środowiska uruchomieniowego

Wartości domyślnie eksportowane przez `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Zachowanie pamięci w Dockerze:

- Obraz ustawia `OMNIROUTE_MEMORY_MB=1024` i na tej podstawie wyprowadza `NODE_OPTIONS=--max-old-space-size=1024`.
- Właściwy proces serwera jest uruchamiany przez samodzielny program uruchamiający, który odczytuje `OMNIROUTE_MEMORY_MB` i dodaje `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node używa ostatniej powtórzonej wartości `--max-old-space-size`, więc ustawienie `OMNIROUTE_MEMORY_MB` kontroluje efektywny limit sterty w Dockerze.
- Ponieważ obraz zawsze ją ustawia, własna wartość zapasowa programu uruchamiającego, kalibrowana na podstawie ilości RAM-u, nigdy nie ma zastosowania w Dockerze. Należy jawnie zwiększyć ją odpowiednio do obciążenia (tabela poniżej). `2048` to nadal zbyt mało dla `/v1/responses` agentów programistycznych.

### Pamięć RAM środowiska uruchomieniowego dla agentów programistycznych

Domyślna wartość Dockera wynosząca 1 GiB to minimum dla panelu i lekkiego czatu, a nie rozmiar produkcyjny. Długie treści żądań `POST /v1/responses` (setki wiadomości, dziesiątki narzędzi) podczas kompresji przechowują w pamięci wiele grafów. Dwa nakładające się żądania o rozmiarze ~3 MiB / ~750 tys. tokenów spowodowały przerwanie V8 przy **12 GiB** przestrzeni old-space (`FATAL ERROR: Reached heap limit`), a także błąd OOM grupy cgroup z limitem 16 GiB. Zobacz [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Ustaw **`--memory` grupy cgroup powyżej rozmiaru sterty** — bufory natywne, SQLite i dane pośrednie kompresji znajdują się poza V8.

| Obciążenie                                      | `OMNIROUTE_MEMORY_MB`            | Kontener / cgroup           | Uwagi                                                                                                                           |
| ----------------------------------------------- | -------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| Panel, jeden lekki czat                         | `1024` (domyślna wartość obrazu) | ≥2 GiB                      |                                                                                                                                 |
| Jeden agent programistyczny (Claude/Codex/Grok) | `8192`                           | ≥10 GiB                     | Typowa pojedyncza sesja `/v1/responses`                                                                                         |
| Dwa równoczesne długie `/v1/responses`          | `10240`–`12288`                  | ≥12–16 GiB                  | Zaobserwowano przerwanie V8 przy stercie ~12 GiB                                                                                |
| Co najmniej trzy równoczesne długie konteksty   | nie uruchamiać w jednym procesie | serializacja / więcej RAM-u | Domyślny limit ciężkich żądań wynosi 1 przetwarzane żądanie; zwiększenie go bez dodatkowego RAM-u ponownie spowoduje przerwanie |

`omniroute serve` na systemie bezpośrednio zainstalowanym na sprzęcie kalibruje wartość do ~35% RAM-u (ograniczoną do zakresu `[512, 4096]`), gdy `OMNIROUTE_MEMORY_MB` jest **nieustawiona**. Docker zawsze ustawia `1024`, dlatego ta kalibracja nigdy nie jest wykonywana w oficjalnym obrazie.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Krytyczne zmienne środowiskowe

Poza wartościami domyślnymi opisanymi w pliku [ENVIRONMENT.md](../reference/ENVIRONMENT.md) podczas pracy w środowisku Docker największe znaczenie mają następujące zmienne:

| Zmienna                       | Przeznaczenie                                                                                                                                                                                                                                                                                            | Wartość domyślna               |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Współdzielony sekret mostu WebSocket. **Wymagany w środowisku produkcyjnym** — ustaw silny, losowy ciąg znaków.                                                                                                                                                                                          | nieustawiona (należy ją podać) |
| `REDIS_URL`                   | Ciąg połączenia z backendem mechanizmu ograniczania liczby żądań / pamięci podręcznej                                                                                                                                                                                                                    | `redis://redis:6379`           |
| `REDIS_PORT`                  | Port hosta dla dołączonego kontenera Redis                                                                                                                                                                                                                                                               | `6379`                         |
| `REDIS_BIND_HOST`             | Interfejs hosta, na którym publikowany jest port dołączonego kontenera Redis (interfejs pętli zwrotnej, chyba że dodasz AUTH)                                                                                                                                                                            | `127.0.0.1`                    |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Ścieżka hosta montowana w profilu `cli` pod adresem `/workspace/omniroute` na potrzeby procedur samodzielnej aktualizacji                                                                                                                                                                                | `.` (bieżący katalog)          |
| `OMNIROUTE_MEMORY_MB`         | Limit sterty Node w czasie wykonywania dla autonomicznego serwera Docker; zastępuje opisaną powyżej wartość domyślną obrazu. Agenty programistyczne: `8192`+ (zobacz [pamięć RAM w czasie wykonywania](#runtime-ram-for-coding-agents)).                                                                 | `1024`                         |
| `DASHBOARD_PORT` / `API_PORT` | Zastępują udostępnione porty panelu (20128) i interfejsu API (20129)                                                                                                                                                                                                                                     | `20128` / `20129`              |
| `APP_BIND_HOST`               | Interfejs hosta, na którym docker-compose publikuje porty panelu/API/WS na żywo. Przy `REQUIRE_API_KEY=false` (wartość domyślna) ustawienie `0.0.0.0` udostępnia anonimowy serwer proxy `/v1` w sieci LAN — rozszerzaj dostęp tylko przy `REQUIRE_API_KEY=true` lub z odwrotnym serwerem proxy z przodu. | `127.0.0.1`                    |
| `CLIPROXY_BIND_HOST`          | Interfejs hosta, na którym docker-compose publikuje kontener pomocniczy `cliproxyapi` — jego wolumin danych przechowuje dane uwierzytelniające dostawców.                                                                                                                                                | `127.0.0.1`                    |
| `OMNIROUTE_PLUGINS_DIR`       | Katalog odczytywany przez skaner wtyczek w czasie wykonywania, w którym instalowane są wtyczki. Ustaw go, gdy wtyczki są montowane przez bind mount: wartość domyślna zależy od `HOME`, której obraz nie musi eksportować.                                                                               | `~/.omniroute/plugins`         |
| `OMNIROUTE_BASE_PATH`         | Podścieżka URL używana, gdy aplikacja jest publikowana za odwrotnym serwerem proxy (np. `/omniroute`)                                                                                                                                                                                                    | _(pusta = katalog główny)_     |
| `NEXT_PUBLIC_BASE_URL`        | Publiczne źródło aplikacji w przeglądarce wraz z podścieżką (np. `https://host/omniroute`)                                                                                                                                                                                                               | nieustawiona                   |
| `PROD_DASHBOARD_PORT`         | Port panelu po stronie hosta dla pliku `docker-compose.prod.yml`                                                                                                                                                                                                                                         | `20130`                        |
| `CLIPROXYAPI_PORT`            | Port po stronie hosta dla kontenera pomocniczego `cliproxyapi`                                                                                                                                                                                                                                           | `8317`                         |

## Reverse proxy w podścieżce (Traefik / nginx)

Wartość `basePath` platformy Next.js jest kompilowana w samodzielnym pakiecie. OmniRoute zapisuje
wbudowaną wartość w pliku kontrolnym w katalogu głównym aplikacji (zapisywanym podczas
`npm run build`; odczytywanym przez `scripts/docker/ensure-docker-base-path.mjs`) i porównuje ją z
`OMNIROUTE_BASE_PATH` podczas uruchamiania kontenera. Gdy wartości się różnią, a obraz został
zbudowany dla katalogu głównego domeny, punkt wejścia modyfikuje manifesty samodzielnego pakietu,
osadzone literały `basePath`/`assetPrefix` (Next 16 renderuje adresy URL zasobów SSR wyłącznie na
podstawie `assetPrefix` — narzędzie modyfikujące odzwierciedla w nim podścieżkę), wbudowane
adresy URL zasobów `/_next/static` (manifesty referencji klienta, importy multimediów, wstępnie
renderowane strony błędów) oraz atrapę `process.env` po stronie klienta, zanim zostanie uruchomiony
`node dev/run-standalone.mjs`.

### Budowanie za pomocą Compose (zalecane)

Ustaw obie zmienne w `.env`, a następnie ponownie zbuduj obraz, aby konfiguracja obrazu i środowiska uruchomieniowego była zgodna:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

Plik `docker-compose.yml` przekazuje `OMNIROUTE_BASE_PATH` jako argument budowania Dockera oraz jako
zmienną środowiskową środowiska uruchomieniowego.

### Wstępnie zbudowany obraz dla katalogu głównego + podścieżka w czasie wykonywania

Opublikowane obrazy `diegosouzapw/omniroute:*` są budowane dla katalogu głównego domeny. Nadal możesz
ustawić `OMNIROUTE_BASE_PATH` w czasie wykonywania; kontener jednokrotnie modyfikuje pakiet podczas uruchamiania.
Połącz tę wartość z odpowiadającym jej publicznym adresem bazowym:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Skonfiguruj reverse proxy tak, aby przekazywał **pełną** ścieżkę zewnętrzną (nie usuwaj
prefiksu). Traefik powinien kierować `PathPrefix(`/omniroute`)` do kontenera bez
`StripPrefix`, dzięki czemu Next.js otrzyma `/omniroute/...` i będzie udostępniać zasoby z
`/omniroute/_next/...`.

Kontrola stanu Dockera sprawdza lekki punkt końcowy cyklu życia `/healthz` poprzedzony
aktywną wartością `OMNIROUTE_BASE_PATH`. Punkt `/api/monitoring/health` pozostaje dostępny do
diagnostyki wykonywanej przez użytkowników lub pulpity; aby ponownie skierować na niego HEALTHCHECK kontenera (na przykład
w celu wymuszenia pogłębionej kontroli stanu), ustaw `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Ta ścieżka wykonuje **pogłębioną** kontrolę (baza danych + podsumowanie monitorowania) — odpowiednią dla
rzadko wykonywanego polecenia `HEALTHCHECK` Dockera, jeśli zdecydujesz się z niego ponownie korzystać, ale **nie** dla
częstotliwości `livenessProbe` w Kubernetes.

Dla orkiestratorów (Kubernetes, Nomad itp.):

| Sonda                 | Preferowane                                                             | Niezalecane                                                  |
| --------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------ |
| Żywotność             | HTTP `GET /livez` lub TCP na głównym porcie (`PORT`, domyślnie `20128`) | `/api/monitoring/health` jako sonda żywotności               |
| Gotowość              | HTTP `GET /healthz`                                                     | Krótkie limity czasu uznające zajętą pętlę zdarzeń za martwą |
| Pogłębiona / blackbox | `/api/monitoring/health`                                                | —                                                            |

`/healthz` raportuje stan cyklu życia procesu (`ok` / `starting` / `stopping`). `/livez` sprawdza
wyłącznie, czy proces działa (zwraca 200 zawsze, gdy procedura obsługi może zostać wykonana; nie czeka na
gotowość). Oba punkty nadal działają w tej samej pętli zdarzeń Node co obsługa żądań, dlatego
obciążające procesor operacje na katalogu lub kompresji mogą je opóźniać — zajęty ≠ martwy. Jeśli
sondy HTTP przekraczają limit czasu, preferuj sondę żywotności TCP. Pełne zalecenia dotyczące sond:
[Przewodnik monitorowania — zalecenia dotyczące sond Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose z Caddy (automatyczne TLS dla HTTPS)

OmniRoute można bezpiecznie udostępnić za pomocą automatycznego provisioningu certyfikatów SSL w Caddy. Upewnij się, że rekord DNS typu A Twojej domeny wskazuje adres IP serwera.

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # Publiczny adres origin widoczny dla przeglądarki, używany przez wywołania zwrotne OAuth, odnośniki panelu i generowane publiczne adresy URL.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Wewnętrzny adres URL do komunikacji między serwerami, używany przez zaplanowane zadania i zapytania do samej usługi.
      - BASE_URL=http://omniroute:20128
      - AUTH_COOKIE_SECURE=true

  caddy:
    image: caddy:latest
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    command: caddy reverse-proxy --from https://your-domain.com --to http://omniroute:20128

volumes:
  omniroute-data:
```

Caddy ustawia standardowe nagłówki przekazywania dla kontenera nadrzędnego. OmniRoute używa
`NEXT_PUBLIC_BASE_URL` jako kanonicznego publicznego adresu origin dla wywołań zwrotnych OAuth i generowanych publicznych
odnośników; uwierzytelnione operacje zapisu w panelu korzystają z żądań tego samego origin oraz ochrony CSRF
powiązanej z sesją. Włączaj `OMNIROUTE_TRUST_PROXY` wyłącznie w zaawansowanych wdrożeniach, w których celowo
chcesz, aby OmniRoute ustalał publiczny adres origin na podstawie zaufanych przekazywanych nagłówków zamiast jawnej
konfiguracji.

## Szybki tunel Cloudflare

Obsługa panelu dla wdrożeń Docker obejmuje uruchamiany jednym kliknięciem **Cloudflare Quick Tunnel** w sekcji `Dashboard → Endpoints`. Przy pierwszym włączeniu `cloudflared` jest pobierany tylko wtedy, gdy jest potrzebny, uruchamiany jest tymczasowy tunel do bieżącego punktu końcowego `/v1`, a wygenerowany adres URL `https://*.trycloudflare.com/v1` jest wyświetlany bezpośrednio pod standardowym publicznym adresem URL.

Panele tuneli punktów końcowych (Cloudflare, Tailscale, ngrok) można wyświetlać lub ukrywać w sekcji `Settings → Appearance` bez zmiany stanu aktywnego tunelu.

### Uwagi dotyczące tuneli

- Adresy URL Quick Tunnel są tymczasowe i zmieniają się po każdym ponownym uruchomieniu.
- Tunele Quick Tunnel nie są automatycznie przywracane po ponownym uruchomieniu OmniRoute lub kontenera. W razie potrzeby włącz je ponownie z poziomu panelu.
- Instalacja zarządzana obsługuje obecnie systemy Linux, macOS i Windows na architekturach `x64` / `arm64`.
- Zarządzane tunele Quick Tunnel domyślnie używają transportu HTTP/2, aby uniknąć uciążliwych ostrzeżeń dotyczących bufora UDP protokołu QUIC w środowiskach kontenerowych o ograniczonych zasobach. Ustaw `CLOUDFLARED_PROTOCOL=quic` lub `auto`, jeśli chcesz użyć innego transportu.
- Obrazy Docker zawierają systemowe główne certyfikaty CA i przekazują je do zarządzanego `cloudflared`, co zapobiega błędom zaufania TLS podczas inicjalizacji tunelu wewnątrz kontenera.
- Ustaw `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`, jeśli chcesz, aby OmniRoute używał istniejącego pliku wykonywalnego zamiast pobierania nowego.

## Tagi obrazów

| Obraz                    | Tag      | Rozmiar | Opis                                                               |
| ------------------------ | -------- | ------- | ------------------------------------------------------------------ |
| `diegosouzapw/omniroute` | `latest` | ~250MB  | Najwyższa **opublikowana** stabilna wersja SemVer (nie git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB  | Przypnij tę klasę tagu na potrzeby GitOps                          |

Manifest wieloplatformowy: natywne `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker automatycznie wybiera odpowiednią architekturę; przekaż `--platform linux/amd64`, jeśli musisz wymusić emulację AMD64 na hostach ARM.

### Kanały wydań

OmniRoute publikuje oddzielne kanały Docker dla stabilnych wydań, testowania aktywnej gałęzi wydania i kompilacji deweloperskich.

| Kanał                           | Źródło                                            | Zmienność                                | Zalecane zastosowanie                                                                                                               |
| ------------------------------- | ------------------------------------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Podpisane/wersjonowane wydanie                    | Niezmienny                               | Wdrożenia produkcyjne przypinające dokładne wydanie                                                                                 |
| `:latest` / `:latest-web`       | Najwyższa **opublikowana** stabilna wersja SemVer | Zmienny wskaźnik stabilny                | Śledzi stabilne wydania **po** zadaniu publikacji SemVer — **nie** śledzi gałęzi `main` ani nieopublikowanych commitów `release/v*` |
| `:next` / `:next-web`           | Bieżąca domyślna gałąź `release/v*`               | Zmienny wskaźnik wersji przedpremierowej | Testowanie poprawek, które trafiły do aktywnej gałęzi wydania, ale nie znalazły się jeszcze w stabilnym wydaniu                     |
| `:main` / `:main-web`           | Gałąź `main`                                      | Zmienny wskaźnik deweloperski            | Wyłącznie rozwój i testy integracyjne                                                                                               |

#### Dostawcy sesji internetowych: obrazy `-web`

Każdy z powyższych kanałów jest również dostępny jako tag `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), zbudowany z etapu `runner-web` — jest to ten sam obraz, ale dodatkowo zawiera Playwright i przeglądarkę Chromium. Zwykły obraz jest dostarczany **bez** Chromium; `gemini-web`, `claude-web` i `claude-turnstile` go wymagają.

Błąd występuje dopiero w momencie użycia, a nie podczas uruchamiania: ci dostawcy wyświetlają listę swoich modeli i są widoczni w panelu jako połączeni, a dopiero pierwsze żądanie kończy się błędem

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Jeśli korzystasz z tych dostawców, pobierz tag `-web` kanału, którego już używasz — nic więcej się nie zmienia. W przypadku instalacji npm/CLI (bez obrazu Docker) odpowiednikiem brakującego elementu jest plik wykonywalny przeglądarki: uruchom `npx playwright install chromium` na hoście.

#### Korzystanie z kanału wersji przedpremierowych

Kanał `next` jest przebudowywany przy każdym wypchnięciu zmian do bieżącej domyślnej gałęzi `release/v*` i publikowany zarówno dla AMD64, jak i ARM64. Starsze gałęzie utrzymaniowe nie mogą go nadpisać. Kanał udostępnia obraz możliwy do pobrania, zawierający poprawki scalone z aktywną gałęzią wydania przed utworzeniem kolejnego stabilnego tagu.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

W przypadku Docker Compose nadpisz tag obrazu używany przez wybrany profil, a następnie pobierz obraz i utwórz usługę ponownie:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Bezpieczeństwo i wycofywanie zmian

`next` jest zmiennym kanałem wersji przedpremierowych. Może się zmienić przy każdym wypchnięciu zmian do aktywnej gałęzi wydania i **nie jest obsługiwany w środowisku produkcyjnym**. Podczas testowania konkretnej kompilacji przypnij skrót obrazu:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Przed rozpoczęciem testów utwórz kopię zapasową woluminu danych OmniRoute lub katalogu danych zamontowanego przez powiązanie. Aby wycofać zmiany, przywróć poprzednio używaną stabilną wersję lub skrót i utwórz kontener ponownie:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Kompilacja z gałęzi wydania nigdy nie może zmienić `latest`; stabilny wskaźnik może zostać zaktualizowany wyłącznie przez kwalifikującą się stabilną wersję semantyczną. Obrazy `next` zachowują kontrolę obrazu wydania oraz blokadę dotyczącą podatności o poziomie CRITICAL.

**`latest` nie gwarantuje aktualności względem repozytorium git.** Scalonych poprawek z gałęzi `main` lub aktywnej gałęzi `release/v*` **nie ma** w `:latest`, dopóki nie zostanie opublikowany obraz ze stabilną wersją SemVer, a zadanie publikowania nie zaktualizuje `:latest` (do tego samego skrótu co dana wersja SemVer). Jeśli `latest` wydaje się nieaktualny, mimo że poprawka jest już widoczna w GitHubie, pobierz `:next`, aby przetestować gałąź wydania, albo poczekaj na tag SemVer.

| Cel                                                                                                   | Użyj                                      |
| ----------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| GitOps / środowisko produkcyjne, które nie może zmieniać wersji                                       | Przypnij `:X.Y.Z` (lub skrót obrazu)      |
| Korzystanie z publikowanych wersji stabilnych i akceptowanie ponownego utworzenia przy każdym wydaniu | `:latest`                                 |
| Testowanie niewydanych zmian z gałęzi `release/v*`                                                    | `:next` (nie do środowiska produkcyjnego) |
| Testowanie gałęzi `main`                                                                              | `:main` (nie do środowiska produkcyjnego) |

## Dostępność: domyślna konfiguracja SQLite obsługuje jedną replikę

Standardowa konfiguracja OmniRoute dla Docker / Kubernetes to **jeden proces Node + jeden proces zapisujący do SQLite**. Wysoka dostępność **nie jest obsługiwana** w tej topologii.

| Ograniczenie                                                 | Konsekwencja                                                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Jeden proces zapisujący                                      | **Nie** uruchamiaj wielu replik korzystających z tego samego pliku SQLite. Spowoduje to uszkodzenie bazy danych.                                                                                                                                                                                                                                                      |
| Ponowne utworzenie / restart / zatrzymanie przez HEALTHCHECK | **Całkowita przerwa w działaniu** trwających połączeń SSE, sesji panelu i stanu przechowywanego w pamięci. Każdy połączony klient zostaje rozłączony. Nowe żądania w czasie braku dostępnych endpointów otrzymują od reverse proxy odpowiedź **`502 Bad Gateway: Unknown error`**, a nie JSON OmniRoute — klienci nie mogą odróżnić tego od awarii dostawcy (#11015). |
| Ta sama pętla zdarzeń co `/healthz`                          | Intensywne przetwarzanie katalogu lub cykl kompresji mogą opóźnić sondy; krótki limit czasu powoduje wtedy ponowne uruchomienie **jedynej** repliki.                                                                                                                                                                                                                  |

**Macierz sond** (zobacz również [zalecenia dotyczące sond Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Sonda                   | Cel                                                                | Nie używaj                                                                 |
| ----------------------- | ------------------------------------------------------------------ | -------------------------------------------------------------------------- |
| Żywotność               | TCP na `PORT` (domyślnie `20128`) lub miękka sonda HTTP `/healthz` | `/api/monitoring/health`                                                   |
| Gotowość                | HTTP `GET /healthz`                                                | Krótkich limitów czasu, które uznają zajętą pętlę zdarzeń za niedziałającą |
| Szczegółowa / dla ludzi | `/api/monitoring/health`                                           | Automatycznej sondy żywotności kubelet                                     |

**Aktualizacje:** należy oczekiwać zerwania każdej sesji. Jeśli to możliwe, stopniowo odłącz klientów; domyślna konfiguracja SQLite nie obsługuje aktualizacji kroczących. Compose `restart: unless-stopped` w połączeniu z Docker `HEALTHCHECK` również zastąpi jedyny proces, gdy kontener uzyska stan Unhealthy — z takim samym zakresem skutków.

Fragment konfiguracji Kubernetes dla **jednej repliki** (strategia Recreate jest wymagana; nie zwiększaj `replicas` dla jednego pliku SQLite):

```yaml
spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    spec:
      terminationGracePeriodSeconds: 90
      containers:
        - name: omniroute
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sleep", "15"]
          readinessProbe:
            httpGet:
              path: /healthz
              port: 20128
            periodSeconds: 5
          livenessProbe:
            tcpSocket:
              port: 20128
            periodSeconds: 20
```

Opóźnienie `preStop` pozwala kube usunąć endpointy Service przed wysłaniem SIGTERM, dzięki czemu **nowy** ruch przestaje trafiać do wygaszanego procesu. Trwające połączenia SSE `/v1/responses` są wygaszane przez maksymalnie `SHUTDOWN_TIMEOUT_MS` (domyślnie 30 s) za pomocą ważonych dzierżaw dopuszczenia (#11015). Nowe żądania, które mimo to dotrą do procesu, otrzymają `503` + `Retry-After: 5`. Okres braku endpointów podczas strategii Recreate, trwający do momentu osiągnięcia przez zastępczą instancję stanu Ready, pozostaje całkowitą przerwą w działaniu — wynika to z topologii SQLite, a nie z błędnej konfiguracji sond.

Zewnętrzny Postgres / HA z wieloma procesami zapisującymi **nie** stanowi udokumentowanej, standardowej ścieżki. Jeśli potrzebujesz HA, zachowaj jedną replikę albo uruchom topologię, którą projekt oddzielnie przetestował i udokumentował. Prace nad Postgres/MySQL są prowadzone w ramach [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Do czasu ich ukończenia jedynym obsługiwanym sposobem zwiększania przepustowości **dużych** żądań `/v1/responses` jest uruchomienie N niezależnych procesów (następna sekcja), a nie ustawienie `replicas > 1` dla jednego woluminu.

## Skalowanie wszerz: N niezależnych procesów

Jeden proces Node to **jedna sterta V8**. Dwa nakładające się żądania agenta programistycznego `POST /v1/responses` (RTK + Caveman), każde o rozmiarze ~3 MiB / ~750 tys. tokenów, powodują przerwanie działania tej sterty przy ~12 Gi (`FATAL ERROR: Reached heap limit`) i mogą doprowadzić do OOM w cgroup z limitem 16 Gi. Zobacz [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Ten pomiar stanowi ostrzeżenie dotyczące **budżetu pamięci**, a nie twardy limit produktu wynoszący dwa równoczesne, długotrwałe żądania `/v1/responses`. Dopuszczanie obciążających żądań czatu jest kontrolowane przez automatycznie wyliczany budżet bajtów wejściowych (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), którego rozmiar wynika z tego samego limitu V8/cgroup — zwiększenie go ręcznie (lub ustawienie starszego limitu liczby żądań `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) w procesie o już dobranym rozmiarze ponownie prowadzi do przerwania działania. Małe czaty, `/healthz`, `/v1/models` i MCP **nie** podlegają temu limitowi.

### Jeden proces: więcej niż dwa długotrwałe żądania `/v1/responses`

**Zdrowy** proces (sterta poniżej `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, domyślnie `0.75`) **może** obsługiwać więcej niż dwa równoczesne, długotrwałe żądania `POST /v1/responses`, jeśli ogólnoprocesowy budżet bajtów żądań w toku (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) nadal ma wolną pojemność. Treści żądań o rozmiarze równym lub większym niż `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (domyślnie 256 KiB) zajmują tę samą dzierżawę dla dużych obciążeń co żądania o złożonej strukturze i korzystają z tego samego mechanizmu awaryjnego `tryAcquireHealthyHeadroom` z [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Dziesiątki równoczesnych, długotrwałych klientów SSE (operatorzy często potrzebują 40–50) to kwestia **budżetu pamięci** — należy dobrać rozmiar sterty, liczbę podstawowych/rezerwowych slotów oraz `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — a nie twardego limitu produktu wynoszącego „maksymalnie 2”. Przeciążona sterta nadal odrzuca żądania z kodem `503`, umożliwiającym ponowienie próby, dzięki czemu problem #7849 nie powraca.

Aby **zwielokrotnić sterty** (niezależne przestrzenie old space V8) **już dziś**:

| Rób                                                                                                                                                                                                               | Nie rób                                                                                   |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Uruchamiaj **N kontenerów/podów**, każdy z **własnym** `DATA_DIR` / woluminem                                                                                                                                     | Nie ustawiaj `replicas > 1` dla jednego pliku SQLite                                      |
| Dobieraj limit obciążających żądań w toku i rezerwę dla zdrowego procesu na podstawie sterty / budżetu bajtów żądań w toku; 1–2 to konserwatywna wartość domyślna wynikająca z #7849, a nie twardy limit produktu | Nie przydzielaj jednemu procesowi 8× więcej RAM-u i nieograniczonego limitu liczby żądań  |
| Opcjonalnie: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` dla **współdzielonych liczników limitów**                                                                                                       | Nie traktuj Redis jako współdzielonego SQLite — nim nie jest                              |
| Powiel sekrety dostawców w każdej instancji (lub zaakceptuj rozdzielone pulpity)                                                                                                                                  | Nie oczekuj jednego pulpitu / jednego dziennika wywołań dla wszystkich instancji          |
| Umieść przed instancjami dowolny system równoważenia obciążenia; przywiązanie na podstawie klucza API lub sesji jest wystarczające                                                                                | Nie wymagaj oprogramowania pośredniczącego konkretnego dostawcy, uwzględniającego rozmiar |

Sprzęt: liczba równoczesnych, długotrwałych żądań `/v1/responses` na instancję to kwestia **budżetu pamięci** (sterta + bajty żądań w toku / #10110). `N` niezależnych katalogów `DATA_DIR` nadal oznacza zwielokrotnienie stert: pamięć RAM hosta musi wystarczyć na `N × cgroup`, a nie na „jeden pod 16 Gi z N=8”. Nigdy nie ustawiaj `replicas > 1` dla jednego pliku SQLite.

Przykładowa konfiguracja Compose (dwie sterty, dwa woluminy — nie `deploy.replicas: 2`):

```yaml
services:
  omniroute-a:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-a-data:/app/data]
    ports: ["20128:20128"]
  omniroute-b:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-b-data:/app/data]
    ports: ["20138:20128"]
volumes:
  omniroute-a-data:
  omniroute-b-data:
```

Zwiększenie gęstości w ramach procesu (kompresja poza izolatem HTTP) opisano w [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Jeden logiczny klaster korzystający ze współdzielonego, trwałego stanu opisano w [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Błędy regionalne Gemini wewnątrz Dockera

Google AI Studio / Gemini API może zwrócić HTTP 400 z FAILED_PRECONDITION i komunikatem
`Lokalizacja użytkownika nie jest obsługiwana w przypadku korzystania z interfejsu API.` Pomyślne żądanie na hoście
nie dowodzi, że kontener korzysta z tej samej trasy wychodzącej. Kolejność DNS,
łączność IPv4/IPv6, routing VPN i skonfigurowane serwery proxy mogą się różnić. Sprawdź
[regiony obsługiwane przez Google](https://ai.google.dev/gemini-api/docs/available-regions),
a także rzeczywistą trasę połączenia; sam ten błąd nie wskazuje na nieprawidłowy klucz API.

### Preferuj serwer proxy przypisany do konkretnego połączenia

Użyj [konfiguracji proxy dla poszczególnych połączeń](../ops/PROXY_GUIDE.md#4-level-proxy-system)
w OmniRoute dla połączenia Gemini, którego dotyczy problem, a następnie ponownie wykonaj
**Test Connection** i małe żądanie z tym samym modelem. Dzięki temu zmiana routingu
pozostanie ograniczona do tego połączenia. Sprawdź, czy serwer proxy jest osiągalny
z kontenera i czy połączenie rzeczywiście go wybiera. Zmiana trasy nie gwarantuje
spełnienia regionalnych wymagań usługi nadrzędnej.

### Porównaj sieć hosta i kontenera

Podczas porównywania uwierzytelnionych wyników zachowaj identyczny klucz, model i żądanie;
nigdy nie wklejaj do zgłoszenia danych uwierzytelniających, haseł proxy ani pełnych
nagłówków autoryzacyjnych. Najpierw sprawdź, jakie rodziny adresów udostępnia mechanizm
rozpoznawania nazw systemu operacyjnego, używając tego samego polecenia na hoście
i wewnątrz kontenera:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Zastąp `omniroute` nazwą używanej usługi (na przykład `omniroute-web`). Te
polecenia wyświetlają rodziny adresów bez danych uwierzytelniających ani adresów IP.
Zwrócona wartość `6` wskazuje jedynie wynik DNS dla IPv6: **nie** dowodzi istnienia
działającej trasy IPv6 ani dostępu do API. Jeśli zainstalowano `curl`, porównaj
`curl -4 -I https://generativelanguage.googleapis.com` z
`curl -6 -I https://generativelanguage.googleapis.com` w obu środowiskach.
Odpowiedź HTTP potwierdza łączność dla tej próby, nawet jeśli jest to nieuwierzytelniony
błąd; dopiero uwierzytelnione żądanie do modelu sprawdza możliwość korzystania z Gemini.

### Alternatywa na poziomie hosta: działające IPv6 i zasady mechanizmu rozpoznawania nazw

Autor zgłoszenia [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) przywrócił
dostęp w swoim środowisku, włączając IPv6 kontenera i zmieniając sposób wyboru adresów
przez glibc. Traktuj to jako alternatywę specyficzną dla danego środowiska. Przed zmianą
preferencji mechanizmu rozpoznawania nazw potwierdź działanie IPv6 na hoście, ruch
wychodzący/routing kontenera oraz reguły zapory sieciowej. Sam prywatny adres ULA
nie potwierdza publicznej łączności IPv6.

W przypadku usług już podłączonych do domyślnej sieci Compose ten fragment włącza
IPv6 w tej sieci; zachowaj pozostałą konfigurację usługi, portów i woluminów:

```yaml
networks:
  default:
    enable_ipv6: true
```

W przypadku nazwanej sieci włącz tę opcję w sieci, do której usługa jest faktycznie
podłączona. Docker może przydzielić podsieć ULA; wybierz jawną, nienakładającą się
podsieć tylko wtedy, gdy wymaga tego Twoja sieć. Zobacz
[obsługę sieci IPv6 w Dockerze](https://docs.docker.com/engine/daemon/ipv6/)
oraz [opcje sieci Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

W **obrazie opartym na glibc** plik `/etc/gai.conf` może zmieniać sposób wyboru adresów.
Bieżący plik Dockerfile repozytorium używa Debiana; niestandardowe obrazy oparte na musl
nie korzystają z tego mechanizmu. Zgłoszona modyfikacja zmienia etykietę ULA z
`label fc00::/7 6` na `label fc00::/7 1`. Zacznij od pełnej tabeli zasad obrazu
i zachowaj pozostałe wpisy: dodanie wpisu `label` lub `precedence` zastępuje tę domyślną
tabelę, dlatego plik zawierający wyłącznie zmieniony wiersz jest niewystarczający.
[Dokumentacja konfiguracji glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
opisuje te zasady. Zamontuj sprawdzony plik w trybie tylko do odczytu w `/etc/gai.conf`
i utwórz usługę ponownie, aby zastosować zmianę.

Zmienia to sposób wyboru adresów przez system operacyjny dla **całego ruchu wychodzącego z tego kontenera**.
Nie wymusza jednak wyboru IPv6 przez każdą aplikację: znaczenie mają również kolejność DNS
i sposób wyboru połączenia przez Node. W szczególności `--dns-result-order=ipv4first`
preferuje IPv4 i nie rozwiązuje problemu występującego wyłącznie przy IPv4. Zobacz
[kolejność DNS w Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Po każdej zmianie na poziomie hosta ponownie przetestuj Gemini i pozostałych dostawców.
Aby wycofać zmiany, usuń niestandardowe montowanie pliku `gai.conf`, przywróć poprzednią
konfigurację sieci i ponownie utwórz usługę/sieć, której dotyczy problem, w oknie
konserwacyjnym. Ponowne utworzenie sieci może przerwać działanie innych podłączonych
do niej kontenerów; nie usuwaj woluminu z trwałymi danymi.

## Ważne uwagi

- **Tryb WAL SQLite:** Należy pozwolić poleceniu `docker stop` zakończyć działanie, aby OmniRoute mógł zapisać najnowsze zmiany z powrotem do `storage.sqlite` w ramach punktu kontrolnego. Dołączone pliki Compose mają już ustawiony 40-sekundowy okres karencji zatrzymania. Jeśli uruchamiasz obraz bezpośrednio, zachowaj opcję `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Ustaw na `true`, jeśli rutynowe kopie zapasowe i kopie wykonywane przed zapisem są zarządzane zewnętrznie. Migracje istniejącej bazy danych nadal wymagają osobnej, trwałej migawki bezpieczeństwa oraz zabezpieczenia przed migracją masową.
- **Trwałość danych:** Zawsze montuj wolumin w `/app/data`, aby zachować bazę danych, klucze i konfiguracje po ponownym uruchomieniu kontenera.
- **Konfiguracja portu:** Zmień wartość zmiennej środowiskowej `PORT`, aby zastąpić domyślny port `20128`.

## Zobacz także

- [Przewodnik wdrażania na maszynie wirtualnej](../ops/VM_DEPLOYMENT_GUIDE.md) — konfiguracja maszyny wirtualnej, nginx i Cloudflare
- [Przewodnik wdrażania na Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — wdrażanie na Fly.io
- [Konfiguracja środowiska](../reference/ENVIRONMENT.md) — kompletna dokumentacja pliku `.env`
