# Analiza konfliktu portów proxy

## Podsumowanie

W systemie proxy auto-select / proxyFallback / proxyEgress **nie ma konfliktu portów**.
Podsystem proxy używa **wcześniej przypisanych portów z rejestru** — nigdy nie bindowuje
się bezpośrednio do portów TCP. Prawdziwa historia EADDRINUSE leży w warstwie
**process supervisor**, gdzie główny port nasłuchu serwera może kolidować podczas
restartów w pętli awarii (crash-loop).

---

## Podsystem proxy: brak bindowania portów

| Moduł                  | Co robi                                                                                               |
| ---------------------- | ----------------------------------------------------------------------------------------------------- |
| `proxyAutoSelector.ts` | Wybiera konfigurację proxy z DB, stosując health scores i grupy rotacji                               |
| `proxyFallback.ts`     | Implementuje strategie retry/fallback, gdy wybrane proxy zawodzi (spróbuj innego proxy, potem direct) |
| `proxyEgress.ts`       | Sondowanie/propagacja informacji o egress IP do logowania — używa HTTP echo, nie bindowania portów    |
| `proxyDispatcher.ts`   | Tworzy dispatchery `undici.ProxyAgent` — to poziom HTTP (forward proxy), nie gniazda nasłuchu TCP     |
| `proxyFetch.ts`        | Spatchowany globalny fetch, który stosuje dispatchery proxy na poziomie undici                        |

Żaden z tych modułów nie wywołuje `net.createServer()`, `http.createServer()` ani `app.listen()`.
Zarządzanie portami odbywa się wyłącznie w cyklu życia żądania — undici zarządza pulą
połączeń TCP wewnętrznie.

**Przepływ fallback** (z `proxyFetch.ts` `runWithProxyContext`):

1. Spróbuj przypisanego proxy → proxy dispatcher
2. Jeśli nieosiągalne → direct fallback (bez dispatchera)
3. Jeśli nadal zawodzi → błąd propagowany w górę

W tym przepływie nie następuje alokacja ani zwalnianie portów.

---

## Prawdziwa przyczyna EADDRINUSE: wyścig restartu w crash-loop

Rzeczywisty konflikt portów był w **process supervisor** (`bin/cli/runtime/`):

| Plik                    | Rola                                                                              |
| ----------------------- | --------------------------------------------------------------------------------- |
| `processSupervisor.mjs` | `ServerSupervisor` — uruchamia proces potomny, monitoruje kod wyjścia, restartuje |
| `supervisorPolicy.mjs`  | `waitUntilPortFree()`, `isPortFree()`, stałe polityki restartu                    |

**Przyczyna główna:** Gdy proces potomny serwera ulegał awarii i był natychmiast restartowany,
OS nie zdążył jeszcze zwolnić gniazda nasłuchu (TIME_WAIT / TCP lingering). Próba restartu
bindowała ten sam port i natychmiast kończyła się `EADDRINUSE`, powodując
kolejną awarię → kolejny restart → wyczerpany budżet restartów → gateway martwy.

**Poprawka (#4425, w `supervisorPolicy.mjs`):**

1. Dodano `isPortFree(port)` — próbuje `net.createServer().listen()` na docelowym
   porcie; zwraca `false` przy EADDRINUSE.
2. Dodano `waitUntilPortFree(port, timeoutMs=10000, intervalMs=250)` — odpytuje co 250ms
   przez maks. 10s, aż port będzie wolny, dopiero potem pozwala na restart.
3. Podniesiono `RESTART_RESET_MS` z 30s → 60s — okno awarii było zbyt krótkie, co powodowało
   szybkie kaskadowe restarty w obrębie okna.
4. Podniesiono `DEFAULT_MAX_RESTARTS` z 2 → 3 — większy zapas na przejściowe awarie.

Narzędzia `writePidFile()` / `killAllSubprocesses()` / `cleanupPidFile()` w
`bin/cli/utils/pid.mjs` zapewniają czysty cykl życia pliku PID.

## Powiązane: Live-Dashboard EADDRINUSE (#6324)

Równoległa poprawka (`live-ws-eaddrinuse-6324.test.ts`) gwarantuje, że `startLiveDashboardServer()`
odrzuca z właściwym błędem `EADDRINUSE` (zamiast nieobsłużonego zdarzenia socket 'error',
które crashowałoby proces). Serwer dashboardu używa osobnego portu względem głównego
serwera API, więc gdy oba są skonfigurowane na ten sam port, drugie bindowanie kończy się
niepowodzeniem w sposób kontrolowany (gracefully).

---

## Stan obecny

| Ryzyko                                       | Status                  | Pozostało |
| -------------------------------------------- | ----------------------- | --------- |
| Supervisor restart EADDRINUSE                | **Naprawione** (#4425)  | Brak      |
| LiveWS port clash                            | **Naprawione** (#6324)  | Brak      |
| Proxy selection port clash                   | **Nigdy nie dotyczyło** | Brak      |
| Two Redis CLIENT factories bind no TCP ports | **Nigdy nie dotyczyło** | Brak      |

Nie są potrzebne dalsze działania w sprawie konfliktu portów.
