# 🐳 Docker Guide — OmniRoute (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Kompletna dokumentacja wdrożenia za pomocą Dockera. Aby szybko rozpocząć, zobacz [sekcję dotyczącą Dockera w README](../README.md#-docker).

## Spis treści

- [Szybkie uruchomienie](#quick-run)
- [Z plikiem środowiskowym](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Dostępne profile](#available-profiles)
- [Konfigurowanie narzędzi CLI hosta, gdy OmniRoute działa w Dockerze](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Kontener pomocniczy Redis](#redis-sidecar)
- [Konfiguracja Compose dla środowiska produkcyjnego](#production-compose)
- [Etapy pliku Dockerfile](#dockerfile-stages)
- [Krytyczne zmienne środowiskowe](#critical-environment-variables)
- [Docker Compose z Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Szybki tunel Cloudflare](#cloudflare-quick-tunnel)
- [Tagi obrazów](#image-tags)
- [Dostępność: domyślna baza SQLite obsługuje jedną replikę](#availability-default-sqlite-is-single-replica)
- [Ważne uwagi](#important-notes)

---

## Szybkie uruchomienie

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

# Profil CLI (wbudowane narzędzia Claude Code, Codex i OpenClaw)
docker compose --profile cli up -d

# Profil hosta (przeznaczony głównie dla systemu Linux; montuje pliki binarne CLI hosta w trybie tylko do odczytu)
docker compose --profile host up -d

# Połącz profil CLI z kontenerem pomocniczym CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Dostępne profile

OmniRoute udostępnia cztery profile Compose. Wybierz profil pasujący do Twojego środowiska.

| Profil            | Usługa           | Kiedy używać                                                                                                                                                                             | Polecenie                                    |
| ----------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (domyślny) | `omniroute-base` | Serwer bez interfejsu graficznego / minimalne środowisko uruchomieniowe, bez dołączonych narzędzi CLI dostawców                                                                          | `docker compose --profile base up -d`        |
| `cli`             | `omniroute-cli`  | Agentowe przepływy pracy wywołujące `omniroute providers/setup/doctor` oraz dołączone narzędzia CLI (Codex, Claude Code, Droid, OpenClaw)                                                | `docker compose --profile cli up -d`         |
| `host`            | `omniroute-host` | Hosty z systemem Linux, które wymagają dostępu podobnego do `network_mode` do narzędzi CLI hosta przez montowanie `~/.local/bin`, `~/.codex`, `~/.claude` itp. w trybie tylko do odczytu | `docker compose --profile host up -d`        |
| `cliproxyapi`     | `cliproxyapi`    | Uruchom kontener pomocniczy [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) na porcie `8317`, aby pośredniczyć w ruchu do nadrzędnych narzędzi CLI                           | `docker compose --profile cliproxyapi up -d` |

> Można łączyć wiele profili: `docker compose --profile cli --profile cliproxyapi up -d`.

## Konfigurowanie narzędzi CLI hosta, gdy OmniRoute działa w Dockerze

Polecenia `omniroute setup-codex`, `setup-claude`, `config set <tool>` oraz przycisk
**Zapisz konfigurację** w panelu zapisują pliki takie jak `~/.codex/*.config.toml`. Te ścieżki
mają znaczenie tylko na maszynie, na której faktycznie działa CLI. Uruchomienie tych poleceń
wewnątrz kontenera powoduje zapis w katalogu domowym kontenera (`/home/node` —
obraz działa jako `USER node`), z którego żadne CLI hosta nigdy ich nie odczyta i który jest
usuwany w momencie ponownego utworzenia kontenera.

OmniRoute wykrywa tę sytuację i odmawia zapisu, wyświetlając instrukcje, zamiast
zgłaszać pozorny sukces, z którego nie można skorzystać: CLI kończy działanie z kodem `2`,
a API odpowiada kodem `422` z `containerEphemeralTarget: true`.

### Zalecane: uruchom CLI na hoście, a OmniRoute w Dockerze

Kontener udostępnia API, natomiast CLI konfiguruje narzędzia na hoście.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # skieruj CLI do kontenera
omniroute setup-codex                      # zapisuje właściwy katalog ~/.codex na hoście
```

To właściwy wybór, gdy Codex, Claude Code, Cursor lub podobne narzędzia działają na
Twoim laptopie — a tak wygląda typowa konfiguracja.

### Alternatywa: montowanie katalogów konfiguracji hosta za pomocą bind mount (profil `host`)

Jeśli chcesz, aby sam kontener zapisywał konfigurację na hoście, zamontuj w nim
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
`/proc/self/mountinfo` i zezwala na zapis do zamontowanych ścieżek (oraz do katalogów,
których katalogi podrzędne są punktami montowania — dokładnie jak w przypadku
`/host-home` powyżej), nadal odmawiając zapisu do ścieżek niezamontowanych.

### Wyjście awaryjne: konfigurowanie CLI wewnątrz kontenera (używaj oszczędnie)

Gdy CLI rzeczywiście znajdują się wewnątrz kontenera (profil `cli`), zapis jest
zamierzony. Przekaż `--allow-container-write` do dowolnego polecenia `setup-*` albo ustaw
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` dla serwera. Zapis zostanie wykonany
z ostrzeżeniem, że nie przetrwa ponownego utworzenia kontenera.

> **Ostrzeżenie dotyczące bezpieczeństwa — profil `cli` + montowanie `docker.sock`.**
> Profil `cli` montuje `/var/run/docker.sock` za pomocą bind mount, aby działający
> wewnątrz kontenera mechanizm automatycznych aktualizacji mógł ponownie utworzyć stos
> za pośrednictwem demona hosta (`src/lib/system/autoUpdate.ts` sprawdza obecność tego
> gniazda i pomija ścieżkę Docker, gdy jest ono nieobecne). To gniazdo stanowi
> **granicę zaufania uprawnień root hosta**: wszystko, co może uzyskać do niego dostęp,
> steruje demonem Docker hosta jako root — może tworzyć, sprawdzać, zatrzymywać
> i usuwać dowolny kontener na hoście. Konsekwencje:
>
> 1. **Nigdy nie udostępniaj portu profilu `cli` w sieci.** Publikuj
>    go na `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — profil `cli` dostępny z sieci LAN sprawia, że dowolna luka RCE na poziomie
>    panelu prowadzi do pełnego przejęcia hosta.
> 2. **Nie montuj żadnych dodatkowych katalogów hosta w profilu `cli`.**
>    Gniazdo Docker w połączeniu z dowolnym dodatkowym montowaniem zapewnia
>    kontenerowi pełny dostęp do odczytu i zapisu systemu plików oraz konfiguracji
>    hosta. Jeśli narzędzie musi mieć dostęp do projektu, uruchom je lokalnie za
>    pomocą pliku wykonywalnego CLI — nie montuj projektu w kontenerze `cli`.
>
> Jeśli nie potrzebujesz automatycznych aktualizacji wewnątrz kontenera, nie włączaj
> profilu `cli` (`COMPOSE_PROFILES=core,redis` lub krócej). Pozostałe profile nie
> montują gniazda Docker.
>
> Powiązany model zagrożeń dotyczący MITM opisano w pliku
> `docs/security/MITM-TPROXY-DECRYPT.md` (git; nie jest kompilowany do `/docs`),
> natomiast łańcuch pochodzenia plików binarnych
> `codex`/`claude-code`/`droid`/`openclaw` opisano w pliku
> `docs/security/SUPPLY_CHAIN.md`.

## Sidecar Redis

OmniRoute korzysta z Redis jako zaplecza rozproszonego ogranicznika szybkości oraz współdzielonej pamięci podręcznej. Usługa `redis` jest **zawsze zdefiniowana** w pliku `docker-compose.yml` (nie jest ograniczona żadnym profilem) i uruchamia się wraz z dowolnym innym profilem.

| Szczegół                   | Wartość                                   |
| -------------------------- | ----------------------------------------- |
| Obraz                      | `redis:7-alpine`                          |
| Nazwa kontenera            | `omniroute-redis`                         |
| Port wewnętrzny            | `6379`                                    |
| Port hosta (nadpisywalny)  | `REDIS_PORT` (domyślnie `6379`)           |
| Adres hosta (nadpisywalny) | `REDIS_BIND_HOST` (domyślnie `127.0.0.1`) |
| Wolumin                    | `omniroute-redis-data` → `/data`          |
| Kontrola stanu             | `redis-cli ping` (interwał 10 s)          |

Powiązane zmienne środowiskowe:

- `REDIS_URL` — ciąg połączenia przekazywany do aplikacji (domyślnie `redis://redis:6379`).
- `REDIS_PORT` — mapowanie portu kontenera Redis po stronie hosta.
- `REDIS_BIND_HOST` — interfejs hosta, na którym publikowany jest port. Domyślnie `127.0.0.1`.

> **Dlaczego domyślnie interfejs pętli zwrotnej:** sidecar działa bez `requirepass`, a kontenery
> aplikacji łączą się z nim przez sieć compose (`redis:6379`) — opublikowany port służy
> wyłącznie narzędziom działającym po stronie hosta (`redis-cli`, lokalne `npm run dev`). Publikowanie na
> `0.0.0.0` udostępniłoby Redis bez uwierzytelniania każdemu hostowi w sieci LAN. Jeśli ustawisz
> `REDIS_BIND_HOST=0.0.0.0`, dodaj również `--requirepass` do `command:` usługi.

**Wyłączanie Redis** nie jest zalecane (ogranicznik szybkości przełączy się na awaryjny mechanizm w pamięci). Jeśli jest to konieczne, usuń lub zakomentuj blok usługi `redis:` w pliku `docker-compose.yml` albo przeskaluj ją do zera:

```bash
docker compose up -d --scale redis=0
```

## Compose dla środowiska produkcyjnego

Aby uruchomić odizolowaną migawkę produkcyjną równolegle ze środowiskiem deweloperskim, użyj pliku `docker-compose.prod.yml`.

| Szczegół             | Wartość                                                                           |
| -------------------- | --------------------------------------------------------------------------------- |
| Plik                 | `docker-compose.prod.yml`                                                         |
| Domyślny port panelu | `PROD_DASHBOARD_PORT=20130` (mapowany na wewnętrzny `${DASHBOARD_PORT:-20128}`)   |
| Domyślny port API    | `PROD_API_PORT=20131`                                                             |
| Obraz                | `omniroute:prod` (zbudowany z elementu docelowego `runner-cli`)                   |
| Kontener Redis       | `omniroute-redis-prod` (`redis:8.6.2`, dedykowany wolumin `redis-prod-data`)      |
| Wolumin danych       | `omniroute-prod-data` (nazwany, zachowywany między przebudowami)                  |
| Kontrole stanu       | `node healthcheck.mjs` + `redis-cli ping`, z `depends_on` zależnym od stanu Redis |

Sposób użycia:

```bash
# Zbuduj i uruchom stos produkcyjny
docker compose -f docker-compose.prod.yml up -d --build

# Wyświetlaj dzienniki na bieżąco
docker compose -f docker-compose.prod.yml logs -f

# Zatrzymaj i usuń stos (zachowaj woluminy)
docker compose -f docker-compose.prod.yml down
```

Stos produkcyjny działa równolegle ze środowiskiem deweloperskim compose (używa innych nazw kontenerów, portów i woluminów), dzięki czemu możesz kontynuować lokalne prace, podczas gdy środowisko produkcyjne pozostaje uruchomione.

## Etapy Dockerfile

Repozytorium zawiera wieloetapowy plik Dockerfile (`Dockerfile`). Udostępnione są trzy etapy; wybierz odpowiedni `target` dla swojego przypadku użycia.

| Etap          | Obraz bazowy          | Przeznaczenie                                                                                                                                                                     |
| ------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `builder`     | `node:26-trixie-slim` | Instaluje zależności (`npm ci --legacy-peer-deps`) i uruchamia `npm run build` (domyślnie Turbopack — zobacz Zasoby podczas kompilacji poniżej)                                   |
| `runner-base` | `node:26-trixie-slim` | Środowisko produkcyjne z autonomicznym wynikiem kompilacji Next.js. **Nie zawiera narzędzi CLI dostawców.**                                                                       |
| `runner-cli`  | `runner-base`         | Dodaje `git`, `docker.io`, `docker-compose` oraz globalne narzędzia CLI: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Wybierz do przepływów agentowych.** |

Ręczne budowanie określonego celu:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
```

### Zasoby podczas kompilacji

Trzy argumenty kompilacji określają koszt etapu `builder`. Obowiązują one tylko podczas kompilacji —
`OMNIROUTE_MEMORY_MB` (opisany poniżej) jest osobnym ustawieniem środowiska uruchomieniowego.

| Argument kompilacji         | Domyślnie | Działanie                                                                                          |
| --------------------------- | --------- | -------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `1`       | Wartość `0` powoduje kompilowanie przy użyciu webpacka. Niższe szczytowe zużycie pamięci, wolniej. |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`    | Limit sterty V8 (`--max-old-space-size`) dla uruchomionego procesu `next build`.                   |
| `OMNIROUTE_BUILD_WORKERS`   | `2`       | Ustawia `CIRCLE_NODE_TOTAL`; Next wyznacza `workers = N - 1` do zbierania danych stron.            |

`OMNIROUTE_BUILD_WORKERS` to parametr, który należy zwiększyć na wydajnej maszynie kompilującej,
i który należy podejrzewać, gdy kompilacja w środowisku o ograniczonych zasobach kończy się niepowodzeniem **po** komunikacie `✓ Compiled successfully`. Każdy
proces roboczy danych stron jest osobnym procesem, podobnie jak sam proces nadrzędny `next build`;
odtworzenie problemu na działającym serwerze VPS (zgłoszenie #7518) wykazało szczytową wartość RSS każdego procesu na poziomie
~4.5 GB, niezależnie od flagi sterty `NODE_OPTIONS` (Turbopack kompiluje przy użyciu
natywnej pamięci/Rusta poza stertą V8). Wartość domyślna `2` (→ 1 proces roboczy, łącznie 2
procesy) jest dostosowana do hostowanych przez GitHub runnerów z 16 GB pamięci i 4 procesorami wirtualnymi,
których używa potok publikowania. Przy wartości `8` (→ 7 procesów roboczych) w runnerze zabrakło pamięci, a
buildkit przerwał krok z błędem `ResourceExhausted: ... cannot allocate memory`;
wartość `3` (→ 2 procesy robocze) nadal się nie mieściła, gdy RSS każdego procesu zmierzono
bezpośrednio zamiast je szacować. `tests/unit/docker-build-memory-budget.test.ts`
wykonuje obliczenia na podstawie zmierzonej wartości i kończy się niepowodzeniem, jeśli którykolwiek parametr
przekracza możliwości runnera.

Turbopack kompiluje przy użyciu natywnej pamięci Rusta, która znajduje się **poza** stertą V8, dlatego
`OMNIROUTE_BUILD_MEMORY_MB` jej nie ogranicza. Na hoście z limitem pamięci
proces kompilacji zostaje wtedy zakończony sygnałem SIGKILL przez mechanizm OOM bez żadnego komunikatu o błędzie — po prostu
zatrzymuje się w trakcie `Creating an optimized production build`, co wygląda raczej jak zawieszenie
niż brak pamięci. Jeśli host kompilacji ma ograniczone zasoby, zmień narzędzie pakujące:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=0 \
  -t omniroute:base .
```

Opcja `webpackBuildWorker` jest włączona, więc `next build` uruchamia proces nadrzędny **oraz** proces roboczy,
a każdy z nich osobno respektuje `OMNIROUTE_BUILD_MEMORY_MB`. Ustaw limit
kontenera powyżej mniej więcej dwukrotności tej wartości, a nie jednokrotności.

Pomiary dla tego drzewa (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Narzędzie pakujące | Limit kontenera | Wynik                                         |
| ------------------ | --------------- | --------------------------------------------- |
| Turbopack          | 8 GiB / 16 GiB  | W obu przypadkach zakończono przez OOM, cicho |
| webpack            | 8 GiB           | Proces roboczy kompilacji zakończony SIGKILL  |
| webpack            | 12 GiB          | Sukces, szczytowe zużycie 11.1 GiB            |

### Domyślne ustawienia środowiska uruchomieniowego

Wartości domyślne eksportowane przez `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Zachowanie pamięci w Dockerze:

- Obraz ustawia `OMNIROUTE_MEMORY_MB=1024` i wyprowadza z niego `NODE_OPTIONS=--max-old-space-size=1024`.
- Właściwy proces serwera jest uruchamiany przez autonomiczny program startowy, który odczytuje `OMNIROUTE_MEMORY_MB` i dodaje `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node używa ostatniej z powtarzających się wartości `--max-old-space-size`, dlatego ustawienie `OMNIROUTE_MEMORY_MB` kontroluje efektywny limit sterty w Dockerze.
- Ponieważ obraz zawsze ustawia tę wartość, własna wartość zapasowa programu startowego, kalibrowana na podstawie dostępnej pamięci RAM, nigdy nie ma zastosowania w Dockerze. Zwiększ ją jawnie odpowiednio do obciążenia (tabela poniżej). Wartość `2048` nadal jest zbyt mała dla punktu końcowego `/v1/responses` używanego przez agentów programistycznych.

### Pamięć RAM środowiska uruchomieniowego dla agentów programistycznych

Domyślna wartość Dockera wynosząca 1 GiB to minimum dla panelu i lekkiego czatu, a nie rozmiar produkcyjny. Długie treści żądań `POST /v1/responses` (setki wiadomości, dziesiątki narzędzi) przechowują podczas kompresji wiele grafów w pamięci. Dwa nakładające się żądania o rozmiarze ~3 MiB / ~750 tys. tokenów spowodowały przerwanie V8 przy **12 GiB** przestrzeni old-space (`FATAL ERROR: Reached heap limit`), a także osiągnęły limit OOM grupy cgroup wynoszący 16 GiB. Zobacz [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Ustaw **`--memory` grupy cgroup powyżej rozmiaru sterty** — natywne bufory, SQLite i pośrednie dane kompresji znajdują się poza V8.

| Obciążenie                                       | `OMNIROUTE_MEMORY_MB`            | Kontener / cgroup           | Uwagi                                                                                                                                                  |
| ------------------------------------------------ | -------------------------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Panel, jeden lekki czat                          | `1024` (domyślnie w obrazie)     | ≥2 GiB                      |                                                                                                                                                        |
| Jeden agent programistyczny (Claude/Codex/Grok)  | `8192`                           | ≥10 GiB                     | Typowa pojedyncza sesja `/v1/responses`                                                                                                                |
| Dwa równoczesne, długie `/v1/responses`          | `10240`–`12288`                  | ≥12–16 GiB                  | Zaobserwowano przerwanie działania V8 przy stercie ~12 GiB                                                                                             |
| Trzy lub więcej równoczesnych długich kontekstów | nie uruchamiać w jednym procesie | serializacja / więcej RAM-u | Domyślny limit przyjmowania ciężkich zadań wynosi 1 trwające żądanie; zwiększenie go bez dodatkowej pamięci RAM ponownie powoduje przerwanie działania |

Gdy zmienna `OMNIROUTE_MEMORY_MB` **nie jest ustawiona**, `omniroute serve` na fizycznym serwerze dostosowuje wartość do ~35% pamięci RAM (ograniczając ją do zakresu `[512, 4096]`). Docker zawsze ustawia `1024`, dlatego ta kalibracja nigdy nie jest wykonywana w oficjalnym obrazie.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Krytyczne zmienne środowiskowe

Oprócz wartości domyślnych udokumentowanych w pliku [ENVIRONMENT.md](../reference/ENVIRONMENT.md), podczas uruchamiania w środowisku Docker największe znaczenie mają następujące zmienne:

| Zmienna                       | Przeznaczenie                                                                                                                                                                                                                                                                                                   | Wartość domyślna               |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Współdzielony sekret mostu WebSocket. **Wymagany w środowisku produkcyjnym** — ustaw silny, losowy ciąg znaków.                                                                                                                                                                                                 | nieustawiona (należy ją podać) |
| `REDIS_URL`                   | Ciąg połączenia z backendem ogranicznika częstotliwości żądań / pamięci podręcznej                                                                                                                                                                                                                              | `redis://redis:6379`           |
| `REDIS_PORT`                  | Port hosta dla dołączonego kontenera Redis                                                                                                                                                                                                                                                                      | `6379`                         |
| `REDIS_BIND_HOST`             | Interfejs hosta, na którym publikowany jest port dołączonego kontenera Redis (interfejs pętli zwrotnej, chyba że dodasz AUTH)                                                                                                                                                                                   | `127.0.0.1`                    |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Ścieżka hosta montowana w profilu `cli` jako `/workspace/omniroute` na potrzeby procesów samoaktualizacji                                                                                                                                                                                                       | `.` (bieżący katalog)          |
| `OMNIROUTE_MEMORY_MB`         | Limit sterty Node w czasie wykonywania dla samodzielnego serwera Docker; zastępuje powyższą wartość domyślną obrazu. Agenci programistyczni: `8192`+ (zobacz [pamięć RAM środowiska wykonawczego](#runtime-ram-for-coding-agents)).                                                                             | `1024`                         |
| `DASHBOARD_PORT` / `API_PORT` | Zastępuje udostępnione porty panelu (20128) i API (20129)                                                                                                                                                                                                                                                       | `20128` / `20129`              |
| `APP_BIND_HOST`               | Interfejs hosta, na którym docker-compose publikuje porty panelu/API/WS na żywo. Przy `REQUIRE_API_KEY=false` (wartość domyślna) adres `0.0.0.0` udostępnia anonimowy serwer proxy `/v1` w sieci LAN — rozszerzaj dostęp tylko przy `REQUIRE_API_KEY=true` lub gdy z przodu znajduje się odwrotny serwer proxy. | `127.0.0.1`                    |
| `CLIPROXY_BIND_HOST`          | Interfejs hosta, na którym docker-compose publikuje usługę pomocniczą `cliproxyapi` — jej wolumin danych przechowuje dane uwierzytelniające dostawców.                                                                                                                                                          | `127.0.0.1`                    |
| `OMNIROUTE_PLUGINS_DIR`       | Katalog odczytywany przez skaner wtyczek środowiska wykonawczego, w którym instalowane są wtyczki. Ustaw go, gdy wtyczki są montowane przez bind mount: wartość domyślna wynika z HOME, którego obraz nie musi eksportować.                                                                                     | `~/.omniroute/plugins`         |
| `OMNIROUTE_BASE_PATH`         | Podścieżka URL używana, gdy aplikacja jest publikowana za odwrotnym serwerem proxy (np. `/omniroute`)                                                                                                                                                                                                           | _(pusta = katalog główny)_     |
| `NEXT_PUBLIC_BASE_URL`        | Publiczne źródło dla przeglądarki, uwzględniające podścieżkę (np. `https://host/omniroute`)                                                                                                                                                                                                                     | nieustawiona                   |
| `PROD_DASHBOARD_PORT`         | Port hosta panelu dla `docker-compose.prod.yml`                                                                                                                                                                                                                                                                 | `20130`                        |
| `CLIPROXYAPI_PORT`            | Port hosta dla usługi pomocniczej `cliproxyapi`                                                                                                                                                                                                                                                                 | `8317`                         |

## Reverse proxy w podścieżce (Traefik / nginx)

Wartość `basePath` platformy Next.js jest kompilowana w samodzielnym pakiecie. OmniRoute zapisuje wbudowaną
wartość w pliku kontrolnym w katalogu głównym aplikacji (zapisywanym podczas `npm run build`; odczytywanym przez
`scripts/docker/ensure-docker-base-path.mjs`) i porównuje ją z wartością
`OMNIROUTE_BASE_PATH` podczas uruchamiania kontenera. Gdy wartości się różnią, a obraz został
zbudowany dla katalogu głównego domeny, skrypt wejściowy modyfikuje manifesty pakietu samodzielnego,
osadzone literały `basePath`/`assetPrefix` (Next 16 generuje adresy URL zasobów SSR wyłącznie na podstawie
`assetPrefix` — mechanizm modyfikujący odwzorowuje w nim podścieżkę), wbudowane
adresy URL zasobów `/_next/static` (manifesty referencji klienta, importy multimediów, wstępnie renderowane
strony błędów) oraz klientowy shim `process.env`, zanim zostanie uruchomiony
`node dev/run-standalone.mjs`.

### Budowanie za pomocą Compose (zalecane)

Ustaw obie zmienne w pliku `.env`, a następnie ponownie zbuduj obraz, aby konfiguracje obrazu i środowiska uruchomieniowego były zgodne:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

Plik `docker-compose.yml` przekazuje `OMNIROUTE_BASE_PATH` jako argument kompilacji Dockera oraz jako
zmienną środowiskową środowiska uruchomieniowego.

### Wstępnie zbudowany obraz dla katalogu głównego + podścieżka w środowisku uruchomieniowym

Opublikowane obrazy `diegosouzapw/omniroute:*` są zbudowane dla katalogu głównego domeny. Nadal można
ustawić `OMNIROUTE_BASE_PATH` w środowisku uruchomieniowym; kontener jednorazowo modyfikuje pakiet podczas uruchamiania.
Należy połączyć tę wartość z odpowiadającym jej publicznym adresem bazowym:

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
`StripPrefix`, tak aby Next.js otrzymywał `/omniroute/...` i udostępniał zasoby z
`/omniroute/_next/...`.

Mechanizm kontroli kondycji Dockera sprawdza lekki punkt końcowy cyklu życia `/healthz` poprzedzony
aktywną wartością `OMNIROUTE_BASE_PATH`. Punkt `/api/monitoring/health` pozostaje dostępny na potrzeby
diagnostyki wykonywanej przez użytkownika lub panel; aby ponownie skierować na niego mechanizm HEALTHCHECK kontenera (na przykład
w celu wymuszenia szczegółowej kontroli kondycji), ustaw `OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`.
Ta ścieżka wykonuje **szczegółową** kontrolę (baza danych + podsumowanie monitoringu) — nadaje się do rzadko
wykonywanego mechanizmu `HEALTHCHECK` Dockera, jeśli zdecydujesz się go ponownie użyć, ale **nie** do krótkich interwałów
`livenessProbe` w Kubernetes.

Dla narzędzi orkiestracji (Kubernetes, Nomad itp.):

| Sonda                  | Preferowane                                                             | Unikaj                                                           |
| ---------------------- | ----------------------------------------------------------------------- | ---------------------------------------------------------------- |
| Dostępność             | HTTP `GET /livez` lub TCP na głównym porcie (`PORT`, domyślnie `20128`) | `/api/monitoring/health` jako sondy dostępności                  |
| Gotowość               | HTTP `GET /healthz`                                                     | Krótkich limitów czasu uznających zajętą pętlę zdarzeń za martwą |
| Szczegółowa / blackbox | `/api/monitoring/health`                                                | —                                                                |

Punkt `/healthz` raportuje stan cyklu życia procesu (`ok` / `starting` / `stopping`). Punkt `/livez`
sprawdza wyłącznie, czy proces działa (zwraca 200 zawsze, gdy procedura obsługi może zostać wykonana; nie czeka na
gotowość). Oba nadal działają w tej samej pętli zdarzeń Node co obsługa żądań, dlatego
obciążające procesor operacje na katalogu lub kompresji mogą je opóźnić — zajęty ≠ martwy. Jeśli sondy HTTP
przekraczają limit czasu, preferuj sondę dostępności TCP. Pełne zalecenia dotyczące sond:
[Przewodnik monitorowania — zalecenia dotyczące sond Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose z Caddy (automatyczny TLS dla HTTPS)

OmniRoute można bezpiecznie udostępnić za pomocą automatycznego dostarczania certyfikatów SSL przez Caddy. Upewnij się, że rekord DNS A Twojej domeny wskazuje na adres IP serwera.

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
      # Adres origin widoczny dla przeglądarki, używany przez wywołania zwrotne OAuth, odnośniki panelu i generowane publiczne adresy URL.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # Wewnętrzny adres URL typu serwer-serwer, używany przez zaplanowane zadania i żądania do własnej usługi.
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
odnośników; uwierzytelnione operacje zapisu w panelu używają żądań z tego samego origin oraz ochrony CSRF
powiązanej z sesją. Włączaj `OMNIROUTE_TRUST_PROXY` wyłącznie w zaawansowanych wdrożeniach, w których celowo
chcesz, aby OmniRoute ustalał publiczny adres origin na podstawie zaufanych przekazanych nagłówków zamiast jawnej
konfiguracji.

## Szybki tunel Cloudflare

Obsługa panelu dla wdrożeń Docker obejmuje uruchamiany jednym kliknięciem **szybki tunel Cloudflare** w sekcji `Panel → Punkty końcowe`. Przy pierwszym włączeniu `cloudflared` jest pobierany tylko wtedy, gdy jest potrzebny, następnie uruchamiany jest tymczasowy tunel do bieżącego punktu końcowego `/v1`, a wygenerowany adres URL `https://*.trycloudflare.com/v1` jest wyświetlany bezpośrednio pod standardowym publicznym adresem URL.

Panele tuneli punktów końcowych (Cloudflare, Tailscale, ngrok) można wyświetlać lub ukrywać w sekcji `Ustawienia → Wygląd` bez zmiany stanu aktywnego tunelu.

### Uwagi dotyczące tuneli

- Adresy URL szybkich tuneli są tymczasowe i zmieniają się po każdym ponownym uruchomieniu.
- Szybkie tunele nie są automatycznie przywracane po ponownym uruchomieniu OmniRoute lub kontenera. W razie potrzeby włącz je ponownie w panelu.
- Instalacja zarządzana obecnie obsługuje systemy Linux, macOS i Windows na architekturach `x64` / `arm64`.
- Zarządzane szybkie tunele domyślnie używają transportu HTTP/2, aby uniknąć uciążliwych ostrzeżeń o buforze UDP protokołu QUIC w środowiskach kontenerowych z ograniczonymi zasobami. Ustaw `CLOUDFLARED_PROTOCOL=quic` lub `auto`, jeśli chcesz użyć innego transportu.
- Obrazy Docker zawierają systemowe główne urzędy certyfikacji i przekazują je do zarządzanego `cloudflared`, co zapobiega błędom zaufania TLS podczas inicjowania tunelu wewnątrz kontenera.
- Ustaw `CLOUDFLARED_BIN=/absolute/path/to/cloudflared`, jeśli chcesz, aby OmniRoute używał istniejącego pliku binarnego zamiast pobierać nowy.

## Tagi obrazów

| Obraz                    | Tag      | Rozmiar | Opis                                                               |
| ------------------------ | -------- | ------- | ------------------------------------------------------------------ |
| `diegosouzapw/omniroute` | `latest` | ~250MB  | Najwyższa **opublikowana** stabilna wersja SemVer (nie git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB  | Przypnij tag tej klasy na potrzeby GitOps                          |

Manifest wieloplatformowy: natywne `linux/amd64` + `linux/arm64` (Apple Silicon, AWS Graviton, Raspberry Pi). Docker automatycznie wybiera pasującą architekturę; przekaż `--platform linux/amd64`, jeśli musisz wymusić emulację AMD64 na hostach ARM.

### Kanały wydań

OmniRoute publikuje oddzielne kanały Docker dla stabilnych wydań, testowania aktywnej gałęzi wydania oraz kompilacji deweloperskich.

| Kanał                           | Źródło                                            | Zmienność                        | Zalecane zastosowanie                                                                                                         |
| ------------------------------- | ------------------------------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Podpisane/wersjonowane wydanie                    | Niezmienny                       | Wdrożenia produkcyjne przypięte do konkretnego wydania                                                                        |
| `:latest` / `:latest-web`       | Najwyższa **opublikowana** stabilna wersja SemVer | Zmienny wskaźnik stabilny        | Podąża za stabilnymi wydaniami **po** zadaniu publikacji SemVer — **nie** śledzi `main` ani niewydanych commitów `release/v*` |
| `:next` / `:next-web`           | Bieżąca domyślna gałąź `release/v*`               | Zmienny wskaźnik wersji wstępnej | Testowanie poprawek, które trafiły do aktywnej gałęzi wydania, ale nie są jeszcze częścią stabilnego wydania                  |
| `:main` / `:main-web`           | Gałąź `main`                                      | Zmienny wskaźnik deweloperski    | Wyłącznie programowanie i testy integracyjne                                                                                  |

#### Korzystanie z kanału wersji wstępnej

Kanał `next` jest przebudowywany po każdym wypchnięciu zmian do bieżącej domyślnej gałęzi `release/v*` i publikowany zarówno dla AMD64, jak i ARM64. Starsze gałęzie utrzymaniowe nie mogą go nadpisać. Kanał udostępnia obraz możliwy do pobrania, zawierający poprawki scalone z aktywną gałęzią wydania przed utworzeniem kolejnego stabilnego tagu.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

W przypadku Docker Compose zastąp tag obrazu używany przez wybrany profil, a następnie pobierz obraz i utwórz usługę ponownie:

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

`next` jest ruchomym kanałem wersji wstępnej. Może ulec zmianie po każdym wypchnięciu zmian do aktywnej gałęzi wydania i **nie jest obsługiwany do użytku produkcyjnego**. Podczas oceniania konkretnej kompilacji przypnij skrót obrazu:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Przed rozpoczęciem testów wykonaj kopię zapasową wolumenu danych OmniRoute lub katalogu danych zamontowanego przez bind mount. Aby wycofać zmiany, przywróć wcześniej używaną stabilną wersję lub skrót obrazu i utwórz kontener ponownie:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Kompilacja z gałęzi wydania nigdy nie może przesunąć znacznika `latest`; stabilny wskaźnik może zostać zaktualizowany wyłącznie przez kwalifikującą się stabilną wersję semantyczną. Obrazy `next` nadal podlegają kontroli obrazu wydania oraz blokującej bramce wykrywającej podatności o poziomie CRITICAL.

**`latest` nie gwarantuje aktualności względem repozytorium git.** Scalonych poprawek z gałęzi `main` lub aktywnej gałęzi `release/v*` **nie ma** w `:latest`, dopóki nie zostanie opublikowany stabilny obraz SemVer, a zadanie publikowania nie zaktualizuje `:latest` (ten sam skrót co dla tej wersji SemVer). Jeśli `latest` wydaje się nieaktualny, mimo że poprawka jest już widoczna w serwisie GitHub, pobierz `:next`, aby przetestować gałąź wydania, albo poczekaj na znacznik SemVer.

| Cel                                                                                                        | Użyj                                      |
| ---------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| GitOps / środowisko produkcyjne, które nie może się samoczynnie zmieniać                                   | Przypnij `:X.Y.Z` (lub skrót obrazu)      |
| Śledzenie opublikowanych stabilnych wersji i akceptacja ponownego utworzenia kontenera przy każdym wydaniu | `:latest`                                 |
| Testowanie nieopublikowanych commitów `release/v*`                                                         | `:next` (nie do środowiska produkcyjnego) |
| Testowanie gałęzi `main`                                                                                   | `:main` (nie do środowiska produkcyjnego) |

## Dostępność: domyślna konfiguracja SQLite obsługuje jedną replikę

Standardowa konfiguracja OmniRoute dla Docker / Kubernetes to **jeden proces Node + jeden proces zapisujący do SQLite**. Wysoka dostępność **nie jest obsługiwana** w tej topologii.

| Ograniczenie                                                 | Konsekwencja                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Jeden proces zapisujący                                      | **Nie** uruchamiaj wielu replik korzystających z tego samego pliku SQLite. Prowadzi to do uszkodzenia bazy danych.                                                                                                                                                                                                                                                |
| Ponowne utworzenie / restart / zakończenie przez HEALTHCHECK | **Całkowita przerwa w działaniu** aktywnych połączeń SSE, sesji panelu i stanu przechowywanego w pamięci. Każdy połączony klient traci połączenie. Nowe żądania podczas braku dostępnych endpointów otrzymują od reverse proxy komunikat **`502 Bad Gateway: Unknown error`**, a nie JSON OmniRoute — klienci nie mogą odróżnić tego od awarii dostawcy (#11015). |
| Ta sama pętla zdarzeń co `/healthz`                          | Obciążona operacja katalogu lub kompresji może opóźnić sondy; krótki limit czasu spowoduje wówczas restart **jedynej** repliki.                                                                                                                                                                                                                                   |

**Macierz sond** (zobacz również [zalecenia dotyczące sond Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Sonda                   | Cel                                                                 | Nie używaj                                                                 |
| ----------------------- | ------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Liveness                | TCP na `PORT` (domyślnie `20128`) lub łagodna sonda HTTP `/healthz` | `/api/monitoring/health`                                                   |
| Readiness               | HTTP `GET /healthz`                                                 | Krótkich limitów czasu, które uznają zajętą pętlę zdarzeń za niedziałającą |
| Szczegółowa / dla ludzi | `/api/monitoring/health`                                            | Automatycznej sondy liveness kubeleta                                      |

**Aktualizacje:** należy oczekiwać zerwania każdej sesji. Jeśli to możliwe, stopniowo odłącz klientów; domyślna konfiguracja SQLite nie obsługuje aktualizacji kroczącej. Ustawienie Compose `restart: unless-stopped` wraz z mechanizmem Docker `HEALTHCHECK` również zastąpi jedyny proces, gdy kontener otrzyma stan Unhealthy — zakres skutków będzie taki sam.

Fragment konfiguracji Kubernetes dla **jednej repliki** (strategia Recreate jest wymagana; nie zwiększaj wartości `replicas` dla jednego pliku SQLite):

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

Opóźnienie `preStop` pozwala kube usunąć endpointy Service przed wysłaniem SIGTERM, dzięki czemu **nowy** ruch przestaje trafiać do kończącego pracę procesu. Trwające połączenia SSE `/v1/responses` są wygaszane przez czas nieprzekraczający `SHUTDOWN_TIMEOUT_MS` (domyślnie 30 s) za pomocą ciężkich dzierżaw kontroli dostępu (#11015). Nowe żądania, które mimo to dotrą do procesu, otrzymają `503` + `Retry-After: 5`. Przerwa spowodowana brakiem endpointów podczas strategii Recreate, trwająca do momentu osiągnięcia przez proces zastępczy stanu Ready, pozostaje całkowitą przerwą w działaniu — wynika to z topologii SQLite, a nie z błędnej konfiguracji sond.

Zewnętrzny Postgres / HA z wieloma procesami zapisującymi **nie jest** udokumentowaną standardową ścieżką. Jeśli potrzebujesz HA, pozostań przy jednej replice albo uruchom topologię, którą projekt przetestował i osobno udokumentował. Prace nad Postgres/MySQL są prowadzone w ramach [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Dopóki ta funkcja nie zostanie wydana, jedynym obsługiwanym sposobem zwiększenia przepustowości **dużych** żądań `/v1/responses` jest użycie N niezależnych procesów (następna sekcja), a nie `replicas > 1` na jednym woluminie.

## Skalowanie poziome: N niezależnych procesów

Jeden proces Node to **jedna sterta V8**. Dwa nakładające się żądania agenta programistycznego `POST /v1/responses` o rozmiarze ~3 MiB / ~750 tys. tokenów (RTK + Caveman) powodują przerwanie działania tej sterty przy ~12 Gi (`FATAL ERROR: Reached heap limit`) i mogą doprowadzić do OOM w cgroup o rozmiarze 16 Gi. Zobacz [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Ten pomiar jest ostrzeżeniem dotyczącym **budżetu pamięci**, a nie sztywnym ograniczeniem produktu do dwóch równoczesnych długich żądań `/v1/responses`. Dopuszczanie obciążających żądań czatu jest kontrolowane przez automatycznie wyznaczany budżet bajtów danych wejściowych (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), którego rozmiar wynika z tego samego limitu V8/cgroup — zwiększenie go ręcznie (lub ustawienie starszego limitu liczby żądań `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) w procesie, którego rozmiar został już odpowiednio dobrany, ponownie prowadzi do przerwania działania. Małe czaty, `/healthz`, `/v1/models` oraz MCP **nie** podlegają temu limitowi.

### Jeden proces: więcej niż dwa długie żądania `/v1/responses`

**Zdrowy** proces (sterta poniżej `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, domyślnie `0.75`) **może** obsługiwać więcej niż dwa równoczesne długie żądania `POST /v1/responses`, jeśli ogólnoprocesowy budżet bajtów żądań w toku (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) nadal ma wolne zasoby. Treści żądań o rozmiarze co najmniej `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (domyślnie 256 KiB) uzyskują tę samą dzierżawę dla obciążających żądań co żądania o złożonej strukturze i korzystają z tego samego mechanizmu awaryjnego `tryAcquireHealthyHeadroom` z [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Dziesiątki równoczesnych, długotrwałych klientów SSE (operatorzy często potrzebują 40–50) to kwestia **budżetu pamięci** — należy odpowiednio dobrać stertę, podstawowe/dodatkowe sloty oraz `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — a nie sztywne ograniczenie produktu do „maksymalnie 2”. Proces ze stertą pod presją nadal odrzuca żądania z ponawialnym kodem `503`, aby problem #7849 nie powrócił.

Aby **zwielokrotnić sterty** (niezależne przestrzenie old-space V8) **już dziś**:

| Zalecane                                                                                                                                                                                                        | Niezalecane                                                                            |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Uruchom **N kontenerów/podów**, każdy z **własnym** `DATA_DIR` / woluminem                                                                                                                                      | Ustawianie `replicas > 1` dla jednego pliku SQLite                                     |
| Dobierz liczbę ciężkich żądań w toku i dodatkowych zdrowych slotów na podstawie sterty / budżetu bajtów żądań w toku; 1–2 to konserwatywna wartość domyślna wynikająca z #7849, a nie sztywne maksimum produktu | Przydzielanie jednemu procesowi 8× więcej RAM-u i nieograniczonego limitu liczby żądań |
| Opcjonalnie: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` dla **współdzielonych liczników limitów**                                                                                                     | Traktowanie Redis jako współdzielonego SQLite — nim nie jest                           |
| Skopiuj sekrety dostawców do każdej instancji (lub zaakceptuj oddzielne pulpity)                                                                                                                                | Oczekiwanie jednego pulpitu / jednego dziennika wywołań dla wszystkich instancji       |
| Umieść instancje za dowolnym systemem równoważenia obciążenia; koligacja według klucza API lub sesji jest wystarczająca                                                                                         | Wymaganie middleware konkretnego dostawcy, uwzględniającego rozmiar                    |

Sprzęt: liczba równoczesnych długich żądań `/v1/responses` na instancję jest kwestią **budżetu pamięci** (sterta + bajty żądań w toku / #10110). `N` niezależnych katalogów `DATA_DIR` nadal zwielokrotnia sterty: pamięć RAM hosta musi pomieścić `N × cgroup`, a nie „jeden pod 16 Gi z N=8”. Nigdy nie ustawiaj `replicas > 1` dla jednego pliku SQLite.

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

Zwiększenie gęstości w obrębie procesu (przeniesienie kompresji poza izolat HTTP) opisano w [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). Jeden logiczny klaster korzystający ze współdzielonego trwałego stanu opisano w [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Ważne uwagi

- **Tryb WAL SQLite:** Należy pozwolić poleceniu `docker stop` na zakończenie działania, aby OmniRoute mógł zapisać najnowsze zmiany z powrotem do `storage.sqlite` w ramach punktu kontrolnego. Dołączone pliki Compose mają już ustawiony 40-sekundowy okres karencji zatrzymania. Jeśli uruchamiasz obraz bezpośrednio, zachowaj opcję `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Ustaw na `true`, jeśli rutynowe kopie zapasowe i kopie przed zapisem są zarządzane zewnętrznie. Migracje istniejących baz danych nadal wymagają własnej trwałej migawki bezpieczeństwa oraz zabezpieczenia przed masową migracją.
- **Trwałość danych:** Zawsze montuj wolumin w `/app/data`, aby zachować bazę danych, klucze i konfiguracje po ponownym uruchomieniu kontenera.
- **Konfiguracja portu:** Nadpisz zmienną środowiskową `PORT`, aby zmienić domyślny port `20128`.

## Zobacz także

- [Przewodnik wdrażania na maszynie wirtualnej](../ops/VM_DEPLOYMENT_GUIDE.md) — konfiguracja maszyny wirtualnej, nginx i Cloudflare
- [Przewodnik wdrażania na Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — wdrażanie na Fly.io
- [Konfiguracja środowiska](../reference/ENVIRONMENT.md) — kompletna dokumentacja pliku `.env`
