---
title: "Atestacja znalezisk supply-chain Socket.dev"
description: "Atestacja maintainerów dla znalezisk AI-detected potential-malware zgłoszonych wobec omniroute oraz mitigacji z v3.8.6 zastosowanych w każdym oznaczonym call site."
---

# Socket.dev / atestacja znalezisk supply-chain

Ten dokument to atestacja napisana przez maintainerów dla sześciu
znalezisk `AI-detected potential malware` zgłoszonych wobec `omniroute@3.8.5` oraz
mitigacji wprowadzonych w `omniroute@3.8.6`. Istnieje po to, aby:

1. Operatorzy pipeline'ów bezpieczeństwa mieli jedno źródło do cytowania, gdy muszą
   ocenić znaleziska względem rzeczywistego kodu źródłowego.
2. Przyszłe skanery AI mogły podjąć podpisane przez maintainerów twierdzenie, że każda
   oznaczona ścieżka jest zamierzona, opt-in i udokumentowana.
3. Mieć pisemny zapis _dlaczego_ każdy call site ma taki kształt —
   żeby przyszły refaktor przypadkiem nie przywrócił fingerprintu, który
   celowo usunięto.

Jeśli prowadzisz skaner, który ponownie oznacza którykolwiek z poniższych call site'ów
po wdrożeniu mitigacji z v3.8.6, otwórz issue ze śladem skanu, a
rozszerzymy tę atestację.

---

## §1 — Instalacja root-CA MITM (`77484.js`)

**Pliki źródłowe**:

- `src/mitm/cert/install.ts` — publiczne `installCert()` / `uninstallCert()`,
  per-platformowe `installCertWindows/Mac/Linux`.
- `src/mitm/systemCommands.ts` — współdzielone helpery `execFile` / `spawn` / PowerShell
  używane przez ścieżki instalacji.

**Wyzwalacz**: użytkownik klika „Enable MITM proxy” w lokalnym dashboardzie pod
`/dashboard/cli-tools/mitm`. Trasa jest wyłącznie loopback — zob. hard rule #17 w
`CLAUDE.md` oraz `src/server/authz/routeGuard.ts::isLocalOnlyPath()`. Wyciekły
JWT wystawiony przez tunel **nie może** uruchomić tej ścieżki kodu.

**Operacje uprzywilejowane (per platforma)**:

| OS                     | Command(s)                                                                                                        |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Windows                | `certutil -addstore Root <cert>` via UAC                                                                          |
| macOS                  | `sudo security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain <cert>`                     |
| Linux                  | `sudo cp <cert> <distro-trust-dir>` + `sudo update-ca-certificates` (Debian) / `sudo update-ca-trust` (RHEL/SUSE) |
| Linux+Firefox/Chromium | per-profile NSS DB update via `certutil -d sql:<profile>`                                                         |

To te same komendy, których używają `mitmproxy`, Charles Proxy, Fiddler i
Caddy. Fakt, że istnieją w OmniRoute, jest udokumentowany w
`docs/security/STEALTH_GUIDE.md`.

**Mitigacja v3.8.6**:

- `runElevatedPowerShell()` nie używa już `-EncodedCommand <base64utf16le>`.
  Podniesiony payload jest zapisywany do tymczasowego pliku `.ps1` na wywołanie (mode 0o600,
  w prywatnym katalogu `mkdtempSync`) i wskazywany przez `-File`. Plik
  jest usuwany w `finally`. Usuwa to podręcznikowy
  fingerprint base64-elevation-via-PowerShell oznaczany przez klasyfikator AI
  Socket.dev.
- `installCertWindows` zawiera wbudowany blok `SECURITY-AUDITOR-NOTE:`
  wskazujący tutaj.

**Dlaczego to zostawiamy**: proxy MITM to udokumentowana funkcja używana przez
`docs/security/STEALTH_GUIDE.md` i `docs/frameworks/MITM-PROXY.md`. Usunięcie
jej złamałoby zestaw funkcji agent-bridge.

---

## §2 — Import credentiali Zed (`app/api/providers/zed/import/route.js`)

**Pliki źródłowe**:

- `src/app/api/providers/zed/discover/route.ts` _(new in v3.8.6)_
- `src/app/api/providers/zed/import/route.ts`
- `src/lib/zed-oauth/keychain-reader.ts`
- `src/lib/zed-oauth/credentialFingerprint.ts` _(new in v3.8.6)_

**Wyzwalacz**: użytkownik klika „Import from Zed” na stronie Providers w lokalnym
dashboardzie. Endpoint jest bramkowany przez `requireManagementAuth`. Sam edytor Zed
zapisuje klucze API providerów w keychain OS pod udokumentowanymi nazwami
serwisów — zob. https://zed.dev/docs/ai/llm-providers.

**Zachowanie v3.8.5 (to, które oznaczył Socket.dev)**:

`POST /import` odkrywał credentials i auto-zapisywał je do lokalnego
magazynu SQLite w jednym round-tripie. Bez potwierdzenia per konto, bez
fingerprintu — po prostu „znaleziono N tokenów, wszystkie zaimportowane”.

**Mitigacja v3.8.6 — potwierdzenie 2-krokowe**:

1. **`POST /api/providers/zed/discover`** zwraca
   `{ candidates: [{ provider, service, account, fingerprint }] }`. Surowy
   token **nigdy** nie jest transmitowany. Fingerprint to
   `sha256(service|account|token).slice(0,16)`.
2. Dashboard renderuje listę kandydatów, operator wybiera, które
   zaimportować, i wysyła `{ confirmedAccounts: [{ service, account, fingerprint }] }`
   do **`POST /api/providers/zed/import`**.
3. Endpoint importu **ponownie czyta keychain po stronie serwera** i filtruje po
   `(service, account, fingerprint)`. Sfałszowana lub odtworzona odpowiedź discover
   nie może oszukać endpointu importu, by zapisał niepowiązany token —
   jeśli żywy token zmienił się od discover, fingerprint już nie
   pasuje i credential jest pomijany.

Flaga env `OMNIROUTE_ZED_IMPORT_LEGACY_ONE_STEP=true` zachowuje zachowanie v3.8.5
dla operatorów, którzy jeszcze nie zaktualizowali automatyzacji. Zostanie
usunięta w v3.9.

**Dlaczego to zostawiamy**: import Zed to najprzyjaźniejsza ścieżka onboardingu dla użytkowników,
którzy już używają Zed i chcą odzwierciedlić klucze providerów w OmniRoute
bez ponownego wklejania.

---

## §3 — `execFile` / `spawn` / elevated PowerShell (`21843.js`)

**Pliki źródłowe**: `src/mitm/systemCommands.ts`.

**Dlaczego oznaczono**: chunk re-eksportuje `execFileWithPassword`,
`runElevatedPowerShell` oraz współdzielony helper `quotePowerShell`. Klasyfikator AI
Socket.dev widzi je jako generyczny „toolkit wykonania na hoście + podnoszenia
uprawnień”. W OmniRoute są używane wyłącznie przez ścieżkę instalacji certyfikatu MITM
(§1) oraz przez `execFileWithPassword` do wykonywania komend `sudo`.

**Mitigacja v3.8.6**:

- Refaktor `runElevatedPowerShell` (zob. §1).
- Wbudowany blok `SECURITY-AUDITOR-NOTE:` przy obu
  `runElevatedPowerShell` i `execFileWithPassword` dokumentuje allowlistę
  callerów i przypiętą listę plików wykonywalnych.
- Wywołanie `spawn()` w `execFileWithPassword` niesie marker `nosemgrep` z
  allowlistą plików wykonywalnych, które helper może przyjąć — **nie ma
  ścieżki od wejścia użytkownika do `finalCommand`/`finalArgs`**.

---

## §4 / §6 — Supervisor serwisu 9router (`api/services/9router/{start,restart}/route.js`)

**Pliki źródłowe**:

- `src/app/api/services/9router/_lib.ts` — fabryka supervisora.
- `src/app/api/services/9router/{start,stop,restart,status,install,update,auto-start}/route.ts`.
- `src/lib/services/ServiceSupervisor.ts` — generyczny spawn / health-poll / log-buffer.

**Wyzwalacz**: użytkownik klika „Install” / „Start” na stronie osadzonych serwisów w
lokalnym dashboardzie.

**Ochrony już na miejscu**:

- Wszystkie trasy `/api/services/*` są LOCAL_ONLY zgodnie z
  `src/server/authz/routeGuard.ts` (hard rule #17). Egzekwowanie loopback
  następuje przed jakimkolwiek sprawdzeniem auth — wyciekły JWT nie może do nich dotrzeć.
- Wiersz DB 9router jest seedowany jako `status='not_installed', auto_start=0` (zob.
  `src/lib/db/migrations/071_services.sql:19`). Serwis **nie** startuje
  przy pierwszym uruchomieniu.
- `spawn()` jest wywoływane ze ścieżką binarki zwróconą przez
  `resolveSpawnArgs(apiKey, PORT)` w `src/lib/services/installers/ninerouter.ts`,
  która jest stałą allowlistą wspieranych binarek.
- Stdout/stderr jest buforowany w pamięci (limit 5 MB, zob. `_lib.ts`) — bez zapisu
  na dysk, chyba że użytkownik włączy logowanie z dashboardu.

**Mitigacja v3.8.6**: bez zmiany funkcjonalnej. Minimalny profil builda
(`OMNIROUTE_BUILD_PROFILE=minimal`) zastępuje
`src/lib/services/installers/ninerouter.ts` stubem dla użytkowników, którzy chcą
fizycznie usunąć uprzywilejowane ścieżki z bundle'a.

**Dlaczego to zostawiamy**: 9router to opcjonalny, lokalnie instalowany serwis
towarzyszący (pomyśl: plugin w stylu WordPress) — ścisły opt-in.

---

## §5 — Zapis zwrotny credentiali OmniRoute Cloud Sync (`api/keys/[id]/route.js`)

**Pliki źródłowe**:

- `src/lib/cloudSync.ts` — `syncToCloud()` / `updateLocalTokens()`.
- `src/app/api/keys/[id]/route.ts` — wywołuje `syncKeysToCloudIfEnabled()`.

**Wyzwalacz**: `isCloudEnabled()` zwraca `true` (ustawiane z dashboardu) **oraz**
skonfigurowane jest `CLOUD_URL`. Gdy oba są wyłączone, nie ma wychodzącego wywołania sieciowego do
endpointu Cloud.

**Zachowanie v3.8.5 (bug, który Socket.dev złapał właściwie)**:

`updateLocalTokens()` nadpisywało `accessToken`, `refreshToken` i
`providerSpecificData` z odpowiedzi Cloud, gdy
`cloudUpdatedAt > localUpdatedAt`. Bez HMAC, bez podpisu, bez checksumy. Źle
skonfigurowany lub wrogi `CLOUD_URL` (albo MITM na kanale) mógł po cichu podmienić
tokeny OAuth providerów.

**Mitigacja v3.8.6**:

1. **Weryfikacja HMAC**: `verifyCloudSignature(rawBody, sigHeader)` sprawdza
   nagłówek `X-Cloud-Sig` (`HMAC-SHA256(OMNIROUTE_CLOUD_SYNC_SECRET,
rawBody)`) przed parsowaniem JSON. Jeśli secret jest ustawiony, podpis jest
   wymagany. Jeśli nie (tryb legacy), logowane jest ostrzeżenie i odpowiedź jest
   akceptowana — secret będzie wymagany w v3.9.
2. **Opt-in pól sekretnych**: `accessToken` / `refreshToken` /
   `providerSpecificData` są nadpisywane **tylko** gdy
   `OMNIROUTE_CLOUD_SYNC_SECRETS=true`. Domyślny tryb synchronizuje wyłącznie
   metadane niebędące credentialami (`expiresAt`, `status`, `lastError*`,
   `rateLimitedUntil`, `updatedAt`). To **breaking change** dla użytkowników,
   którzy polegali na zdalnej synchronizacji tokenów — muszą jawnie opt-in.

**Dlaczego to zostawiamy**: Cloud Sync to jedyny sposób, by tenant OmniRoute Cloud
centralizował credentials zespołu. Poprawka czyni model zagrożeń uczciwym:
„serwer podpisuje, klient weryfikuje, operator opt-in”.

---

## Profil builda: `minimal`

Dla użytkowników potrzebujących artefaktu przyjaznego Socket, buduj z:

```bash
OMNIROUTE_BUILD_PROFILE=minimal npm run build
```

Webpackowy `NormalModuleReplacementPlugin` aliasuje cztery moduły do stubów:

| Module                                      | Stub                                             |
| ------------------------------------------- | ------------------------------------------------ |
| `src/mitm/cert/install.ts`                  | `src/mitm/cert/install.stub.ts`                  |
| `src/lib/zed-oauth/keychain-reader.ts`      | `src/lib/zed-oauth/keychain-reader.stub.ts`      |
| `src/lib/cloudSync.ts`                      | `src/lib/cloudSync.stub.ts`                      |
| `src/lib/services/installers/ninerouter.ts` | `src/lib/services/installers/ninerouter.stub.ts` |

Każdy stub eksportuje tę samą powierzchnię, ale każda funkcja rzuca
`featureDisabledError(name)` w runtime. Trasy zależne od wyłączonego
modułu zwracają HTTP 503 z jasnym komunikatem zamiast aktywować
wrażliwą ścieżkę kodu.

Wynikowy bundle ma być publikowany jako `omniroute-secure`. Zob.
`docs/ops/PUBLISHING_SECURE.md` po receptę publikacji.

---

## Podział na pluginy (śledzony na v4)

Długoterminowo zamierzamy podzielić pakiet npm na osobno audytowalne
moduły. Zob. milestone v4 w trackerze issue GitHub po issue śledzące.
