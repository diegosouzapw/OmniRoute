---
title: "Przewodnik wdrażania OmniRoute na Fly.io"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Przewodnik wdrażania OmniRoute na Fly.io

Ten dokument opisuje rzeczywisty proces wdrażania OmniRoute na Fly.io i obejmuje dwa scenariusze:

- Pierwsze wdrożenie bieżącego projektu na Fly.io
- Publikowanie kolejnych aktualizacji kodu
- Nowe projekty korzystające z tego samego przepływu wdrożenia

Przewodnik opiera się na zweryfikowanej, działającej konfiguracji bieżącego projektu. Nazwa aplikacji to `omniroute`.

---

## 1. Cele wdrożenia

- Platforma: Fly.io
- Metoda wdrożenia: bezpośrednia publikacja lokalnym `flyctl`
- Środowisko uruchomieniowe: istniejące w repozytorium `Dockerfile` i `fly.toml`
- Trwałość danych: Fly Volume zamontowany w `/data`
- Adres dostępu: `https://omniroute.fly.dev/`

---

## 2. Kluczowa konfiguracja bieżącego projektu

Plik `fly.toml` w bieżącym repozytorium zawiera potwierdzone następujące kluczowe elementy:

```toml
app = 'omniroute'
primary_region = 'sin'

[[mounts]]
  source = 'data'
  destination = '/data'

[processes]
  app = 'node run-standalone.mjs'

[http_service]
  internal_port = 20128

[env]
  TZ = "Asia/Shanghai"
  HOST = "0.0.0.0"
  HOSTNAME = "0.0.0.0"
  BIND = "0.0.0.0"
```

Uwagi:

- `app = 'omniroute'` określa, do której aplikacji Fly kierowane jest wdrożenie
- `destination = '/data'` określa katalog montowania trwałego wolumenu
- Ten projekt musi mieć ustawione `DATA_DIR=/data`, w przeciwnym razie baza danych i klucze trafią do tymczasowego katalogu kontenera

---

## 3. Wymagania wstępne

### 3.1 Instalacja Fly CLI

Windows PowerShell:

```powershell
pwsh -Command "iwr https://fly.io/install.ps1 -useb | iex"
```

Jeśli skrypt instalacyjny nie działa w Twoim środowisku, możesz też ręcznie pobrać binarkę `flyctl` i dodać ją do `PATH`.

### 3.2 Logowanie do konta Fly

```powershell
flyctl auth login
```

### 3.3 Weryfikacja statusu logowania

```powershell
flyctl auth whoami
flyctl version
```

---

## 4. Pierwsze wdrożenie bieżącego projektu

### 4.1 Sklonuj kod i wejdź do katalogu

```powershell
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
```

### 4.2 Potwierdź nazwę aplikacji

Otwórz `fly.toml` i sprawdź następującą linię:

```toml
app = 'omniroute'
```

Jeśli wdrażasz do własnej nowej aplikacji, możesz zmienić ją na globalnie unikalną nazwę, na przykład:

```toml
app = 'omniroute-yourname'
```

Uwaga:

- Upewnij się, że aplikacja widoczna w konsoli odpowiada wartości `app` w `fly.toml`
- Jeśli wcześniej używałeś innej nazwy, np. `oroute`, nie myl jej z `omniroute`

### 4.3 Utwórz aplikację

Jeśli aplikacja jeszcze nie istnieje:

```powershell
flyctl apps create omniroute
```

Jeśli zmieniłeś nazwę aplikacji, zastąp `omniroute` wybraną nazwą.

### 4.4 Pierwsze wdrożenie

```powershell
flyctl deploy
```

---

## 5. Wymagane parametry

Ten projekt zaleca skonfigurowanie na Fly.io co najmniej następujących parametrów.

### 5.1 Zweryfikowane parametry

Te parametry były używane w rzeczywistych wdrożeniach bieżącej aplikacji `omniroute`:

- `API_KEY_SECRET`
- `DATA_DIR`
- `JWT_SECRET`
- `MACHINE_ID_SALT`
- `NEXT_PUBLIC_BASE_URL`
- `OMNIROUTE_WS_BRIDGE_SECRET` (wymagany w produkcji — służy do uwierzytelniania mostu WebSocket)
- `STORAGE_ENCRYPTION_KEY`

### 5.2 O `INITIAL_PASSWORD`

Bieżący projekt nie ustawia `INITIAL_PASSWORD`, ponieważ to wdrożenie tego nie wymaga.

Jeśli nie jest ustawione:

- Log startowy wskaże, że domyślne hasło to `CHANGEME`
- Hasło logowania należy jak najszybciej zmienić w ustawieniach systemowych po wdrożeniu

Jeśli chcesz zainicjować hasło backendu bez nadzoru, możesz dodać je później:

- `INITIAL_PASSWORD`

---

## 6. Zalecane parametry

### 6.1 Konfiguracja Secrets

Następujące zmienne są zalecane jako Fly Secrets:

| Zmienna                          | Rekomendacja         | Opis                                                       |
| -------------------------------- | -------------------- | ---------------------------------------------------------- |
| `API_KEY_SECRET`                 | Wymagana             | Służy do generowania i walidacji kluczy API                |
| `JWT_SECRET`                     | Wymagana             | Służy do sesji logowania i podpisywania JWT                |
| `OMNIROUTE_WS_BRIDGE_SECRET`     | Wymagana w produkcji | Sekret uwierzytelniania mostu WebSocket                    |
| `STORAGE_ENCRYPTION_KEY`         | Silnie zalecana      | Szyfruje wrażliwe informacje o połączeniach w spoczynku    |
| `MACHINE_ID_SALT`                | Zalecana             | Generuje stabilny identyfikator maszyny                    |
| `INITIAL_PASSWORD`               | Opcjonalna           | Ustawia początkowe hasło backendu przy pierwszym wdrożeniu |
| Prywatne poświadczenia OAuth/API | W razie potrzeby     | Konfiguracja uwierzytelniania zewnętrznych platform        |

### 6.2 Zalecane wartości dla bieżącego projektu

| Zmienna                | Zalecana wartość            |
| ---------------------- | --------------------------- |
| `DATA_DIR`             | `/data`                     |
| `NEXT_PUBLIC_BASE_URL` | `https://omniroute.fly.dev` |

Uwagi:

- `DATA_DIR=/data` jest krytyczne i musi odpowiadać punktowi montowania Fly Volume
- `NEXT_PUBLIC_BASE_URL` jest używane przez scheduler, callbacki frontendu i podobne scenariusze

### 6.3 Konfiguracja URL callbacku OAuth

Jeśli chcesz włączyć dostawców opartych na OAuth (np. Antigravity, Gemini, Cursor) na wdrożeniu Fly.io, upewnij się o następujących dwóch punktach:

1. **Ustaw `NEXT_PUBLIC_BASE_URL` na publiczną domenę HTTPS**

   ```powershell
   flyctl secrets set NEXT_PUBLIC_BASE_URL=https://omniroute.fly.dev -a omniroute
   ```

   Jeśli używasz własnej domeny, zastąp ją odpowiednią domeną (np. `https://omniroute.yourdomain.com`).

2. **Skonfiguruj URL callbacku w konsoli dostawcy**

   Wszyscy dostawcy OAuth współdzielą jedną ścieżkę callbacku `/callback` — NIE ma osobnej trasy callbacku per dostawca:

   ```text
   <NEXT_PUBLIC_BASE_URL>/callback
   ```

   Na przykład, niezależnie od Gemini, Antigravity, Cursor czy GitLab Duo:
   - `https://omniroute.fly.dev/callback`

   Jeśli `NEXT_PUBLIC_BASE_URL` nie odpowiada URL callbacku zarejestrowanemu u dostawcy, przepływ OAuth zakończy się niepowodzeniem na etapie przekierowania w przeglądarce.

---

## 7. Konfiguracja sekretów jedną komendą

Poniższe polecenia generują bezpieczne losowe wartości i zapisują wszystkie wymagane parametry bieżącego projektu do Fly Secrets w jednym kroku.

Uwagi:

- Nie obejmuje `INITIAL_PASSWORD`
- Przeznaczone dla bieżącego projektu `omniroute`

```powershell
$apiKeySecret = [Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()
$jwtSecret = [Convert]::ToHexString((1..64 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()
$machineIdSalt = [Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()
$storageKey = [Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()
$wsBridgeSecret = [Convert]::ToHexString((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 })).ToLower()

flyctl secrets set `
  API_KEY_SECRET=$apiKeySecret `
  JWT_SECRET=$jwtSecret `
  MACHINE_ID_SALT=$machineIdSalt `
  STORAGE_ENCRYPTION_KEY=$storageKey `
  OMNIROUTE_WS_BRIDGE_SECRET=$wsBridgeSecret `
  DATA_DIR=/data `
  NEXT_PUBLIC_BASE_URL=https://omniroute.fly.dev `
  -a omniroute
```

Na Linux / macOS możesz też użyć `openssl rand -hex 32`:

```bash
flyctl secrets set OMNIROUTE_WS_BRIDGE_SECRET=$(openssl rand -hex 32) -a omniroute
```

Uwagi:

- `OMNIROUTE_WS_BRIDGE_SECRET` jest wymagany w produkcji; jego brak zepsuje handshake mostu WebSocket

Jeśli chcesz też ustawić hasło początkowe:

```powershell
flyctl secrets set INITIAL_PASSWORD=your-strong-password -a omniroute
```

---

## 8. Podgląd bieżących parametrów

```powershell
flyctl secrets list -a omniroute
```

Jeśli strona `Secrets` w konsoli nie pokazuje oczekiwanych zmiennych, sprawdź:

- Czy przeglądasz aplikację `omniroute`
- Czy wartość `app` w `fly.toml` odpowiada aplikacji w konsoli

---

## 9. Kolejne aktualizacje i wydania

Po aktualizacjach kodu proces wydania jest prosty:

```powershell
git pull
flyctl deploy
```

Jeśli chcesz zaktualizować tylko parametry bez zmiany kodu:

```powershell
flyctl secrets set KEY=value -a omniroute
```

Fly automatycznie wykona rolling update maszyn.

### 9.1 Śledzenie aktualizacji repozytorium upstream przy zachowaniu `fly.toml` forka

Jeśli bieżące repozytorium jest forkiem i chcesz synchronizować aktualizacje z upstream `https://github.com/diegosouzapw/OmniRoute`, postępuj według poniższego przepływu.

Najpierw zweryfikuj remote'y:

```powershell
git remote -v
```

Powinieneś zobaczyć co najmniej:

- `origin` wskazujący na Twój własny fork
- `upstream` wskazujący na oryginalne repozytorium

Jeśli `upstream` nie jest skonfigurowany, dodaj go:

```powershell
git remote add upstream https://github.com/diegosouzapw/OmniRoute.git
```

Przed synchronizacją z upstream pobierz najnowsze commity i tagi:

```powershell
git fetch upstream --tags
```

Sprawdź bieżącą wersję i tagi upstream:

```powershell
git describe --tags --always
git show --no-patch --oneline v3.4.7
```

> Uwaga: Bieżąca wersja projektu to `v3.8.0`. Poniższe odwołania do `v3.4.7` są zachowane wyłącznie jako historyczne przykłady. Przy rzeczywistych wydaniach używaj `:latest` lub tagu bieżącej wersji (np. `:v3.8.0`).

Jeśli chcesz scalić najnowszy upstream `main`, wymuszając zachowanie `fly.toml` swojego forka, postępuj według tego przepływu:

```powershell
git merge upstream/main
git checkout HEAD~1 -- fly.toml
git add -- fly.toml
git commit -m "chore(deploy): keep fork fly.toml"
git push origin main
```

Uwagi:

- `git merge upstream/main` synchronizuje najnowszy kod z oryginalnego repozytorium
- `git checkout HEAD~1 -- fly.toml` przywraca własny `fly.toml` forka sprzed merge
- Jeśli upstream nie modyfikował `fly.toml`, ten krok nie wprowadzi żadnych różnic
- Jeśli upstream zmodyfikował `fly.toml`, ten krok zapewnia, że nazwa aplikacji Fly, montowanie wolumenu, region i inna konfiguracja wdrożenia specyficzna dla forka nie zostaną nadpisane

Jeśli chcesz wyrównać do konkretnego tagu wydania (np. `v3.4.7`), najpierw zweryfikuj, że tag jest już zawarty w `upstream/main`:

```powershell
git merge-base --is-ancestor v3.4.7 upstream/main
```

Pomyślny wynik oznacza, że `upstream/main` już zawiera tę wersję; możesz po prostu scalić `upstream/main`.

### 9.2 Standardowa sekwencja wydania po synchronizacji upstream

Po synchronizacji z oryginalnym repozytorium zalecana kolejność wydania:

1. `git fetch upstream --tags`
2. `git merge upstream/main`
3. Przywróć `fly.toml` forka
4. `git push origin main`
5. `flyctl deploy`
6. `flyctl status -a omniroute`
7. `flyctl logs --no-tail -a omniroute`

To jest rzeczywisty przepływ używany przy aktualizacji bieżącego projektu do `v3.4.7` (przykład odnosi się do historycznej wersji; aktualna rzeczywista wersja to `v3.8.0`).

---

## 10. Kontrole po wdrożeniu

### 10.1 Sprawdź status aplikacji

```powershell
flyctl status -a omniroute
```

### 10.2 Podgląd logów startowych

```powershell
flyctl logs --no-tail -a omniroute
```

### 10.3 Weryfikacja dostępności witryny

```powershell
try {
  (Invoke-WebRequest -Uri "https://omniroute.fly.dev" -MaximumRedirection 5 -UseBasicParsing).StatusCode
} catch {
  if ($_.Exception.Response) {
    $_.Exception.Response.StatusCode.value__
  } else {
    throw
  }
}
```

Wartość zwrotna `200` oznacza, że witryna odpowiada prawidłowo.

---

## 11. Wskaźniki sukcesu

Po udanym wdrożeniu logi powinny pokazywać treść podobną do:

```text
[bootstrap] Secrets persisted to: /data/server.env
[DB] SQLite database ready: /data/storage.sqlite
```

Te dwa punkty są krytyczne:

- `/data/server.env` potwierdza, że sekrety runtime są zapisane na trwałym wolumenie
- `/data/storage.sqlite` potwierdza, że baza danych jest zapisana na trwałym wolumenie

Jeśli zamiast tego widzisz `/app/data/...`, `DATA_DIR` jest źle skonfigurowane i należy to natychmiast poprawić.

---

## 12. Typowe problemy

### 12.1 Strona `Secrets` jest pusta

Zwykle są dwa powody:

- Nie uruchomiłeś jeszcze `flyctl secrets set`
- Przeglądasz inną aplikację (np. `oroute` zamiast `omniroute`)

### 12.2 `flyctl deploy` zgłasza `app not found`

Najpierw utwórz aplikację:

```powershell
flyctl apps create omniroute
```

### 12.3 Parsowanie `fly.toml` kończy się niepowodzeniem

Sprawdź następujące:

- Czy w komentarzach nie ma uszkodzonych znaków
- Czy cudzysłowy i wcięcia TOML są poprawne

### 12.4 Dane nie są trwałe

Zweryfikuj oba poniższe punkty:

- `fly.toml` zawiera `destination = '/data'`
- `DATA_DIR` jest ustawione na `/data`

### 12.5 Czy można działać bez `INITIAL_PASSWORD`?

Tak, można. Zostanie użyte domyślne hasło `CHANGEME`. W produkcji zaleca się jak najszybszą zmianę hasła backendu.

---

## 13. Ponowne użycie dla nowych projektów

Jeśli wdrażasz nowy projekt według tego dokumentu, wystarczy zmienić te elementy:

1. Zmień wartość `app` w `fly.toml`
2. Zmień `NEXT_PUBLIC_BASE_URL`
3. Zachowaj `DATA_DIR=/data`
4. Wygeneruj ponownie `API_KEY_SECRET`, `JWT_SECRET`, `MACHINE_ID_SALT` i `STORAGE_ENCRYPTION_KEY`
5. Po pierwszym wdrożeniu zweryfikuj, że logi wskazują zapis do `/data`

Nie używaj ponownie kluczy z poprzedniego projektu.

---

## 14. Minimalna checklista wydania dla bieżącego projektu

Najczęściej używane polecenia przy kolejnych wydaniach:

```powershell
flyctl auth whoami
flyctl status -a omniroute
flyctl secrets list -a omniroute
flyctl deploy
flyctl logs --no-tail -a omniroute
```

Przy zwykłym wydaniu kluczowa komenda to po prostu:

```powershell
flyctl deploy
```

Przy pierwszym wdrożeniu w nowym środowisku kluczowe kroki to:

1. `flyctl auth login`
2. `flyctl apps create omniroute`
3. `flyctl secrets set ... -a omniroute`
4. `flyctl deploy`
5. `flyctl logs --no-tail -a omniroute`
