---
title: "MITM TPROXY — przezroczyste deszyfrowanie"
version: 3.8.40
lastUpdated: 2026-06-28
---

# MITM TPROXY — przezroczyste deszyfrowanie

TPROXY transparent decrypt to **5. tryb przechwytywania** OmniRoute w stosie MITM
[Traffic Inspector](../frameworks/TRAFFIC_INSPECTOR.md) / [AgentBridge](../frameworks/AGENTBRIDGE.md).
Przechwytuje i **deszyfruje** lokalny ruch HTTPS wychodzący na Linuksie
przy użyciu kernelowego TPROXY + policy routing — **bez** spoofingu `/etc/hosts` i
**bez** zmiany systemowych ustawień proxy w całym OS. Jest przyjazny dla headless
(brak edycji DNS do sprzątania), a reguły firewalla automatycznie znikają po restarcie.

W przeciwieństwie do pozostałych trybów przechwytywania TPROXY nie wymaga konfiguracji
per host: przezroczyście przechwytuje **dowolne** hosty docelowe na wybranym porcie,
kończy TLS certyfikatem leaf wystawianym w locie per hostname SNI, przechwytuje
odszyfrowaną wymianę i ponownie szyfruje żądanie do oryginalnego destination.

> **Tylko Linux, tylko root, opt-in.** Ten tryb wymaga Linuksa, natywnego addonu
> zbudowanego narzędziem C oraz capability **CAP_NET_ADMIN** (zazwyczaj root). Jest
> bramkowany przez API AgentBridge dostępne wyłącznie z loopback i domyślnie wyłączony.
> Zaufane CA MITM mogące podpisywać dowolny host to potężna zdolność — zob. [§6 Bezpieczeństwo](#6-bezpieczeństwo).

**Źródło:** `src/mitm/tproxy/`
**Trasa API:** `GET / POST / DELETE /api/tools/agent-bridge/tproxy`
**Przełącznik w dashboardzie:** Traffic Inspector → pasek capture-modes → **"TPROXY Decrypt"** ⚠
**Zobacz też:** [`docs/frameworks/TRAFFIC_INSPECTOR.md`](../frameworks/TRAFFIC_INSPECTOR.md),
[`docs/frameworks/AGENTBRIDGE.md`](../frameworks/AGENTBRIDGE.md)

---

## §1 Co to jest i kiedy używać

Każdy z pozostałych czterech trybów przechwytywania ma ograniczenie:

| Mode              | How traffic is steered                     | Limitation                             |
| ----------------- | ------------------------------------------ | -------------------------------------- |
| AgentBridge       | `/etc/hosts` DNS spoof of a fixed host set | only the registered IDE-agent hosts    |
| Custom Hosts      | `/etc/hosts` DNS spoof per host            | one entry per host; sudo to edit hosts |
| HTTP_PROXY        | `HTTP_PROXY`/`HTTPS_PROXY` env             | only apps that honor the env var       |
| System-wide proxy | OS proxy settings                          | mutates global state; needs revert     |

TPROXY transparent decrypt steruje ruchem na warstwie **kernela**. Oznacza nowe
lokalne wychodzące połączenia TCP na port docelowy (domyślnie `443`) w łańcuchu
`mangle OUTPUT`, `ip rule` przekierowuje oznaczone pakiety do local delivery,
a przy ponownym wejściu target `TPROXY` w `mangle PREROUTING` przekazuje je do
listenera **IP_TRANSPARENT** — który kończy TLS i przechwytuje plaintext.

Użyj go, gdy chcesz przechwycić i odszyfrować ruch z procesu, który:

- łączy się z hostem, którego AgentBridge nie rejestruje, oraz
- nie honoruje `HTTP_PROXY`, oraz
- nie chcesz go ruszać systemową zmianą proxy.

Ponieważ przechwycenie dzieje się w kernelu, proces źródłowy **nie wymaga żadnej
zmiany konfiguracji** — ale musi ufać dynamicznemu CA instalowanemu przez OmniRoute
(zob. [§4](#4-dynamiczne-ca-per-sni-i-instalator-trust-store)).

---

## §2 Wymagania

| Requirement        | Detail                                                                                                                                         |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| **OS**             | Linux only — **IP_TRANSPARENT** is a Linux-only socket option. The loader returns "unavailable" on every other platform.                       |
| **Privilege**      | The **CAP_NET_ADMIN** capability to create the transparent socket and apply `iptables`/`ip` rules — in practice, run as root.                  |
| **Native addon**   | A tiny N-API addon (`src/mitm/tproxy/native/transparent.c`) must be built or shipped as a prebuild. See [§3](#3-natywny-addon-ip_transparent). |
| **Kernel modules** | `iptables` with the `TPROXY`, `mangle`, and `mark` match support (validated against kernel 6.8.0).                                             |

**Graceful degradation:** jeśli brakuje któregokolwiek wymagania (nie-Linux, brak toolchaina,
addon nie zbudowany), loader addonu (`src/mitm/tproxy/transparentSocket.ts::loadTransparentAddon`)
zwraca `null` zamiast rzucać wyjątek. Status trybu przechwytywania raportuje wtedy
`available: false`, przełącznik w dashboardzie jest **disabled** z tooltipem
"TPROXY decrypt requires Linux + root + the native addon", a reszta OmniRoute
działa normalnie.

---

## §3 Natywny addon IP_TRANSPARENT

Moduł `net` w Node nie potrafi wykonać `setsockopt(IP_TRANSPARENT)` _przed_ `bind()`,
czego wymaga TPROXY (w przeciwnym razie kernel odrzuca przekierowane pakiety). Addon
(`src/mitm/tproxy/native/transparent.c`, budowany przez `binding.gyp`) to mały moduł N-API
eksponujący trzy funkcje, konsumowane przez `transparentSocket.ts`:

| Addon function                        | Socket work                                                                                    | Used for                                                                          |
| ------------------------------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `createTransparentListener(ip, port)` | `socket()` + **SO_REUSEADDR** + **IP_TRANSPARENT** + `bind()` + `listen()`, returns the raw fd | the transparent capture listener (Node adopts the fd via `server.listen({ fd })`) |
| `setSocketMark(fd, mark)`             | `setsockopt` **SO_MARK** on an existing fd                                                     | anti-loop (mark the proxy's own sockets)                                          |
| `connectMarked(ip, port, mark)`       | `socket()` + **SO_MARK** **before** a non-blocking `connect()`, returns fd                     | the re-encrypted upstream forward (the SYN carries the mark)                      |

Oryginalny destination odczytywany jest z `socket.localAddress`/`localPort` — TPROXY
go zachowuje, więc nie ma lookupu **SO_ORIGINAL_DST**/NAT.

### Budowanie addonu

```bash
npm run build:native:tproxy      # cd src/mitm/tproxy/native && node-gyp rebuild
                                 # -> native/build/Release/transparent.node
```

- Podczas `npm run build` skrypt `scripts/build/build-tproxy-native.mjs` uruchamia `node-gyp
rebuild`. Jest **Linux-only i non-fatal** — brak toolchaina po prostu zostawia
  tryb przechwytywania niedostępny.
- `assembleStandalone.mjs` kopiuje `build/Release/transparent.node` do
  standalone bundle; `transparentSocket.ts` resolvuje go zarówno module-relative, jak i
  cwd-relative (`<cwd>/src/mitm/tproxy/native/...`).
- `build/` i `prebuilds/` są git-ignored — binarka jest **budowana, nigdy
  commitowana**.

Loader sonduje, w kolejności priorytetu:
`native/build/Release/transparent.node`, potem `native/prebuilds/transparent.node`
(oba module-relative oraz pod `<cwd>/src/mitm/tproxy/`).

---

## §4 Dynamiczne CA per-SNI i instalator trust-store

> **Aktualizacja #6684:** statyczny serwer AgentBridge (`src/mitm/server.cjs`) teraz
> współdzieli ten sam wzorzec architektury CA/leaf zamiast pojedynczego statycznego
> self-signed leaf. Używa **oddzielnej** instancji CA
> (`src/mitm/cert/rootCa.ts`, persystowanej w `<DATA_DIR>/mitm/ca.key`/`ca.crt`)
> i instaluje pod istniejącym slotem trust-store `omniroute-mitm.crt`
> (zastępując stary pojedynczy leaf — bez potrzeby dual-trust cleanup),
> w pełni oddzielony od slotu TPROXY `omniroute-tproxy-ca.crt` opisanego poniżej.
> Świeże instalacje AgentBridge dostają model CA automatycznie; instalacja, która
> już ufała staremu static leaf, nadal go używa, dopóki operator nie włączy
> `MITM_ROOT_CA_ENABLED=true` (zob. `src/mitm/cert/migration.ts`) — zaufane CA MITM
> mogące podpisać leaf dla **dowolnego** hosta jest istotnie silniejsze niż stary
> fixed-SAN leaf, więc przełączenie nigdy nie jest ciche dla już zaufanej instalacji.

Historycznie statyczny cert MITM AgentBridge działał tylko dlatego, że AgentBridge
robi DNS-spoof **stałego** zbioru hostów (teraz ujednoliconego z modelem poniżej). TPROXY
przechwytuje **dowolne** hosty, więc jego listener musi przedstawić ważny leaf dla
jakiegokolwiek SNI, którego zażąda klient — ten sam wymóg ma teraz AgentBridge
dla pełnego zbioru `MITM_TOOL_HOSTS` (9 wpisów narzędzi) zamiast tylko 4
hostów antigravity.

### Dynamiczne CA (`src/mitm/tproxy/dynamicCert.ts`)

`DynamicCertStore` uruchamia lokalne CA (na zależności `selfsigned`), które:

- Generuje długowieczne CA przez `generateMitmCa()` (CN `"OmniRoute MITM CA"`,
  ważność 10 lat, `basicConstraints CA=true` + `keyUsage keyCertSign,cRLSign`,
  2048-bit RSA / SHA-256).
- Wystawia **leaf per hostname SNI na żądanie** przez `issueLeafCert()` (ważność 1 rok,
  `subjectAltName` = host SNI) i cache'uje jeden `tls.SecureContext`
  per hostname.
- Eksponuje `createSNICallback()` dla serwera kończącego TLS (zob. [§5](#5-jak-działa-deszyfrowanie-i-przechwytywanie)).
- Może być skonstruowany z `existingCa`, aby CA pozostało stabilne między restartami
  (więc trust store nie wymaga ponownej instalacji).

Klucz prywatny CA **nigdy nie opuszcza maszyny**.

### Instalator trust-store (`src/mitm/tproxy/caTrust.ts`)

Przechwycony klient musi ufać dynamicznemu CA, więc start trybu przechwytywania
instaluje cert CA w OS trust store pod **dedykowanym slotem** —
`omniroute-tproxy-ca.crt` (stała `TPROXY_CA_CERT_NAME`) — oddzielonym od
slotu statycznego certu MITM (`omniroute-mitm.crt`), żeby te dwa nigdy się nie nadpisywały.

`installTproxyCa(caPem, sudoPassword?)` wykrywa katalog anchor dystrybucji
(w kolejności: najpierw styl Debian) i uruchamia pasującą komendę odświeżenia:

| Anchor directory                            | Refresh command          |
| ------------------------------------------- | ------------------------ |
| `/usr/local/share/ca-certificates`          | `update-ca-certificates` |
| `/etc/ca-certificates/trust-source/anchors` | `update-ca-trust`        |
| `/etc/pki/ca-trust/source/anchors`          | `update-ca-trust`        |
| `/etc/pki/trust/anchors`                    | `update-ca-certificates` |

Instalacja stage'uje PEM do pliku tymczasowego, potem (z uprawnieniami) `mkdir -p` katalogu anchor,
`cp` stage'owanego pliku do niego i uruchamia komendę odświeżenia. `uninstallTproxyCa()`
usuwa tylko dedykowany slot (zostawiając statyczny cert MITM nietknięty) i
odświeża — no-op na nie-Linuksie.

Wszystkie uprzywilejowane komendy idą przez `execFileWithPassword` (`src/mitm/systemCommands.ts`)
— `spawn` z **tablicami argumentów, bez shella, bez interpolacji stringów** (Hard Rule #13).
Gdy proces jest root (np. VPS), target uruchamia się bezpośrednio i hasło
nie jest potrzebne; na desktopie non-root `sudoPassword` jest przekazywane przez `sudo -S` na stdin.

> Desktopowe `sudoPassword` podaje się w body POST, by autoryzować
> instalację trust-store; jest całkowicie ignorowane, gdy proces jest root.

---

## §5 Jak działa deszyfrowanie i przechwytywanie

Pipeline (wszystko pod `src/mitm/tproxy/`):

```
local app  ──TCP/443──▶  mangle OUTPUT marks the conn (fwmark)
                          ip rule → local route table → lo
                          mangle PREROUTING TPROXY → IP_TRANSPARENT listener (port 8443)
                              │  captureMode.ts: reads orig dest from socket.localAddress
                              ▼
                          tlsCapture.ts:
                            1. TLS-terminate the CLIENT with a per-SNI leaf (dynamicCert)
                            2. internal http.Server parses the decrypted plaintext
                            3. capture → globalTrafficBuffer.push() with source: "tproxy"
                               (sanitizeHeaders + maskSecret applied)
                            4. forward RE-encrypted to the original destination
                               over a bypass-marked socket (connectMarked, anti-loop)
                              │
                              ▼
                          original upstream (api.example.com)
```

- **Terminacja TLS** (`createTlsCaptureServer`): owija surowy przechwycony
  socket w serwerowy `tls.TLSSocket` z użyciem SNI callback dynamicznego CA,
  potem przekazuje odszyfrowany stream do wewnętrznego `http.Server` (standardowa
  sztuczka terminacji MITM). Żywotność socketów ogranicza `MITM_IDLE_TIMEOUT_MS`, żeby
  zawieszony tunel nie wyczerpał deskryptorów plików.
- **Przechwytywanie** (`handleDecryptedRequest`): pushuje `InterceptedRequest` z
  `source: "tproxy"`, status startowy `"in-flight"`, headery przez
  `sanitizeHeaders()`, body przez `maskSecret()` zanim wejdą do
  bufora. Wpis jest potem aktualizowany o response, rozmiary i latency.
- **Ponownie zaszyfrowany forward** (`createForward` / `realForward`): ponownie szyfruje do
  oryginalnego destination. `rejectUnauthorized` domyślnie **`true`** (secure by
  default) — cert upstream weryfikowany jest względem SNI/Host zażądanego przez
  klienta, więc proxy odrzuca dokładnie to, co odrzuciłby oryginalny klient.

### Anti-loop (SO_MARK)

Ponieważ reguły oznaczają nowe lokalne połączenia wychodzące, **własny**
ponownie zaszyfrowany forward proxy zostałby normalnie przechwycony ponownie — nieskończona pętla.
Ścieżka forward broni się przed tym markiem bypass socketu (**SO_MARK**):

- `realForward` otwiera socket upstream przez `connectMarked(ip, port, DEFAULT_BYPASS_MARK)`
  — `DEFAULT_BYPASS_MARK = 0x539` — co ustawia **SO_MARK** **przed** `connect()`,
  więc SYN forwardu niesie bypass mark.
- Reguła `mangle OUTPUT` wyklucza połączenia już niosące bypass mark
  (`-m mark ! --mark <bypassMark>`), więc forward proxy **nie** jest ponownie oznaczany
  i nie wraca do TPROXY.

> Nota implementacyjna: socket z bypass mark musi być zainstalowany na
> `createConnection` agenta (`https.request({ createConnection })` jest cicho ignorowane,
> gdy agent jest obecny), inaczej forward otworzyłby nieoznaczony socket i
> pętla wróciłaby. To był e2e-validated fix anti-loop.

---

## §6 Bezpieczeństwo

| Control                          | Detail                                                                                                                                                                                                                                                                                                                                                             |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Loopback-only API**            | `/api/tools/agent-bridge/tproxy` is covered by the `/api/tools/agent-bridge/` prefix in `LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`). Loopback enforcement runs **before** auth (Hard Rules #15 + #17) — a leaked JWT over a tunnel cannot start TPROXY capture, which applies `iptables` rules and installs a trust-store CA via child processes. |
| **Dedicated CA slot**            | The dynamic CA installs to `omniroute-tproxy-ca.crt`, never clobbering the static MITM cert.                                                                                                                                                                                                                                                                       |
| **CA key never leaves the host** | `DynamicCertStore` holds the CA key in memory; it is not exported.                                                                                                                                                                                                                                                                                                 |
| **Secret masking**               | `maskSecret()` on request/response bodies and `sanitizeHeaders()` on headers run **before** `globalTrafficBuffer.push()`.                                                                                                                                                                                                                                          |
| **No shell interpolation**       | All `iptables`/`ip`/trust-store commands run via `execFile`/`execFileWithPassword` with arg arrays (Hard Rule #13).                                                                                                                                                                                                                                                |
| **Upstream cert verification**   | The re-encrypted forward verifies the upstream cert by default (`rejectUnauthorized: true`).                                                                                                                                                                                                                                                                       |
| **Error sanitization**           | The route's error responses go through `sanitizeErrorMessage()` (Hard Rule #12).                                                                                                                                                                                                                                                                                   |

**CA MITM to potężna zdolność.** CA zaufane przez OS, które może podpisać dowolny
host, oznacza, że wszystko przechwycone przez OmniRoute może zostać odszyfrowane. Jest bramkowane przez
explicit, local-only tryb przechwytywania TPROXY, domyślnie wyłączony, a wpis trust-store
jest usuwany po zatrzymaniu trybu.

---

## §7 Transakcyjny apply / revert firewalla

Crash nie może zostawić reguły `mangle` ani starej trasy. Builder komend
(`src/mitm/tproxy/commands.ts`) i runner (`src/mitm/tproxy/setup.ts`) gwarantują, że
**revert jest dokładną odwrotnością apply, w odwrotnej kolejności**.

`applyTproxy(cfg)` uruchamia komendy apply po kolei; przy **dowolnym** błędzie robi
best-effort pełne `revertTproxy(cfg)` i rethrow — więc firewall jest albo
w pełni zastosowany, albo w pełni cofnięty, nigdy half-applied. `revertTproxy(cfg)` uruchamia
odwrotne komendy w odwrotnej kolejności i połyka błędy (idempotentne — bezpieczne do wywołania
bezwarunkowo, np. z cleanupu AgentBridge `repairMitm()`).

`validateTproxyConfig(cfg)` działa przed każdą komendą: porty muszą być `1–65535`,
`mark`/`routeTable`/`bypassMark` muszą być dodatnimi liczbami całkowitymi, a `bypassMark` musi
różnić się od `mark` (anti-loop).

### Komendy apply (w kolejności)

```bash
ip rule add fwmark <mark> lookup <routeTable>
ip route add local 0.0.0.0/0 dev lo table <routeTable>
iptables -t mangle -A OUTPUT -p tcp --dport <dport> -m mark ! --mark <bypassMark> -j MARK --set-mark <mark>
iptables -t mangle -A PREROUTING -p tcp --dport <dport> -m mark --mark <mark> -j TPROXY --on-port <onPort> --tproxy-mark <mark>
```

Revert usuwa je w odwrotnej kolejności: `PREROUTING -D`, `OUTPUT -D`, `ip route del`, `ip rule del`.

> Receptura jest **OUTPUT-based**, bo use case MITM to _lokalny_ ruch wychodzący
> (aplikacje na tym samym hoście), którego sam TPROXY w `PREROUTING` nie
> widzi — `PREROUTING` widzi tylko ruch forwardowany. Łańcuch `OUTPUT` oznacza nowe
> lokalne połączenia, `ip rule` przekierowuje je do local delivery (`lo`), a
> `PREROUTING` przypisuje je potem transparentnemu listenerowi.

---

## §8 Konfiguracja

Żądanie startu (`POST /api/tools/agent-bridge/tproxy`) przyjmuje następujące
pola, walidowane przez `StartTproxyBodySchema` (`tproxy/route.ts`). Wszystkie są opcjonalne
i spadają do domyślnych:

| Field            | Type               | Default  | Notes                                                                                                           |
| ---------------- | ------------------ | -------- | --------------------------------------------------------------------------------------------------------------- |
| **dport**        | int (1–65535)      | `443`    | Destination TCP port to transparently intercept                                                                 |
| **mark**         | int (≥1)           | `0x2333` | Firewall mark set on `OUTPUT`, matched by the `ip rule` + `PREROUTING`                                          |
| **onPort**       | int (1–65535)      | `8443`   | Port the transparent (**IP_TRANSPARENT**) listener binds                                                        |
| **routeTable**   | int (≥1)           | `233`    | Policy-routing table id holding the `local 0.0.0.0/0` route                                                     |
| **bypassMark**   | int (≥1, ≠ `mark`) | `0x539`  | The bypass socket mark (**SO_MARK**) the proxy sets on its own upstream conns; excluded in `OUTPUT` (anti-loop) |
| **sudoPassword** | string             | —        | Non-root desktops only: authorizes the trust-store install; ignored when root                                   |

Dla TPROXY **nie ma zmiennych środowiskowych** — cała konfiguracja idzie przez
body POST albo domyślne wartości powyżej.

---

## §9 Włączanie z Traffic Inspector

1. Otwórz **Traffic Inspector** (`/dashboard/tools/traffic-inspector`).
2. Na pasku capture-modes znajdź przycisk **"TPROXY Decrypt"** ⚠
   (`src/app/(dashboard)/dashboard/tools/traffic-inspector/components/CaptureModesToolbar.tsx`).
   - Jeśli jest **disabled** z tooltipem "TPROXY decrypt requires Linux + root +
     the native addon", natywny addon jest niedostępny na tym hoście (nie-Linux,
     brak toolchaina albo addon nie zbudowany). Zob. [§2](#2-wymagania) i [§3](#3-natywny-addon-ip_transparent).
3. Kliknij przycisk. Wywołuje `POST /api/tools/agent-bridge/tproxy` przez
   `startTproxyCaptureMode()` (`src/lib/inspector/tproxyCaptureApi.ts`), które:
   buduje dynamiczne CA, otwiera transparentny listener, stosuje reguły firewalla
   i instaluje CA w OS trust store.
4. Gdy działa, przełącznik robi się bursztynowy i pokazuje live intercept count
   (`· <interceptCount>`). Przechwycone żądania pojawiają się na liście z
   `source: "tproxy"`.
5. Kliknij ponownie, by zatrzymać — `DELETE /api/tools/agent-bridge/tproxy` przez
   `stopTproxyCaptureMode()` zamyka listener, odinstalowuje CA i cofa
   reguły firewalla.

Status trybu przechwytywania (running / available / intercept count / listener port) pochodzi
z `GET /api/tools/agent-bridge/tproxy` (`getCaptureStatus()` w
`src/mitm/tproxy/captureManager.ts`). Naraz działa tylko **jedna** sesja TPROXY —
start drugiej odrzuca z "TPROXY capture mode is already running".

---

## §10 Rozwiązywanie problemów

### Przełącznik jest disabled

Natywny addon nie ładuje się. Potwierdź: jesteś na Linuksie, zbudowałeś addon
(`npm run build:native:tproxy`), a proces potrafi załadować `transparent.node`.
`isTransparentSocketAvailable()` bramkuje przełącznik; `GET /api/tools/agent-bridge/tproxy`
zwraca `available: false`, gdy addon brakuje.

### Nic nie jest przechwytywane

- Potwierdź, że przechwytywany proces faktycznie łączy się na skonfigurowany `dport`
  (domyślnie `443`).
- Potwierdź, że proces ufa dynamicznemu CA. CA jest instalowane pod
  `omniroute-tproxy-ca.crt`; aplikacje z własnym trust store (Firefox/Chrome NSS)
  mogą wymagać dodania certu także tam.
- Uruchom self-test AgentBridge **Diagnose** (zob.
  [`AGENTBRIDGE.md`](../frameworks/AGENTBRIDGE.md)) pod kątem cert-trusted / server
  health checks.

### Stare reguły firewalla po crashu

`revertTproxy()` jest dokładną odwrotnością apply i jest idempotentne. Zatrzymanie
trybu cofa reguły; jeśli OmniRoute zostało zabite w trakcie sesji, użyj akcji AgentBridge
**Repair** (`POST /api/tools/agent-bridge/repair`), by cofnąć osierocony stan systemu
(DNS spoof, root CA, system proxy). Reguły TPROXY `mangle` i trasa również
czyszczą się automatycznie po restarcie.

### Nieskończona pętla / proxy przechwytuje własny forward

To przypadek anti-loop. Potwierdź, że `bypassMark` różni się od `mark` (walidacja
to wymusza) oraz że forward używa `connectMarked` (tak jest w `realForward`).
Zob. [§5 Anti-loop](#anti-loop-so_mark).

---

## §11 Mapa źródeł

| File                                             | Responsibility                                                                                                                                |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/mitm/tproxy/commands.ts`                    | Pure `iptables`/`ip` apply + revert command builder; `validateTproxyConfig`                                                                   |
| `src/mitm/tproxy/setup.ts`                       | Transactional `applyTproxy` / `revertTproxy` runner (rollback on failure)                                                                     |
| `src/mitm/tproxy/transparentSocket.ts`           | Native-addon loader (`loadTransparentAddon`), `createTransparentListenerFd`, `connectMarked`, `setSocketMark`, `isTransparentSocketAvailable` |
| `src/mitm/tproxy/native/transparent.c`           | N-API addon: `createTransparentListener` (IP_TRANSPARENT), `setSocketMark`, `connectMarked`                                                   |
| `src/mitm/tproxy/native/binding.gyp`             | node-gyp build manifest                                                                                                                       |
| `src/mitm/tproxy/dynamicCert.ts`                 | `DynamicCertStore` — per-SNI dynamic CA + leaf cache                                                                                          |
| `src/mitm/tproxy/caTrust.ts`                     | OS trust-store install/uninstall (`installTproxyCa` / `uninstallTproxyCa`, dedicated slot)                                                    |
| `src/mitm/tproxy/tlsCapture.ts`                  | TLS-terminating decrypt engine + re-encrypted anti-loop forward                                                                               |
| `src/mitm/tproxy/captureMode.ts`                 | Transparent-listener orchestration; reads orig dest from `socket.localAddress`                                                                |
| `src/mitm/tproxy/captureManager.ts`              | Singleton lifecycle: `startCaptureMode` / `stopCaptureMode` / `getCaptureStatus`                                                              |
| `src/app/api/tools/agent-bridge/tproxy/route.ts` | `GET` / `POST` / `DELETE` route (LOCAL_ONLY)                                                                                                  |
| `src/lib/inspector/tproxyCaptureApi.ts`          | Client fetch helpers (`fetchTproxyStatus` / `startTproxyCaptureMode` / `stopTproxyCaptureMode`)                                               |

---
