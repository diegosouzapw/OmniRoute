---
title: "Konfiguracja headless w Termux"
version: 3.8.49
lastUpdated: 2026-07-25
---

# Konfiguracja headless w Termux

OmniRoute może działać jako serwer headless na Androidzie przez Termux. Aplikacja desktopowa Electron nie jest obsługiwana w Termux, ale webowy dashboard oraz API zgodne z OpenAI działają z lokalnej przeglądarki lub z innych urządzeń w tej samej sieci.

## Wymagania wstępne

Zainstaluj Termux z F-Droid lub z wydań na GitHub, następnie zaktualizuj pakiety i zainstaluj narzędzia kompilacji wymagane przez natywne zależności, takie jak `better-sqlite3`.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Wersja Node.js:** OmniRoute wymaga Node `>=22.22.2 <23 || >=24.0.0 <27` (zgodnie z `engines` w `package.json` / `SUPPORTED_NODE_RANGE`). Pakiet `nodejs-lts` w Termux zwykle dostarcza Node 20 LTS, który **nie jest już wspierany** — zamiast tego zainstaluj `pkg install nodejs` (current) i sprawdź, czy `node --version` zgłasza linię 22.x/24.x+.

Jeśli kompilacja natywnego pakietu się nie powiedzie, ponów powyższe polecenie `pkg install`, a następnie spróbuj ponownie zainstalować OmniRoute.

## Instalacja

Uruchom najnowszy opublikowany pakiet bezpośrednio:

```bash
npx -y omniroute@latest
```

Możesz też zainstalować go globalnie:

```bash
npm install -g omniroute
omniroute
```

## Uruchomienie

Uruchom OmniRoute w trybie serwera headless:

```bash
omniroute
```

lub:

```bash
npx omniroute
```

Dashboard nasłuchuje pod adresem:

```text
http://localhost:20128
```

Otwórz ten URL w przeglądarce Androida. Jeśli uruchamiasz klientów wewnątrz Termux, użyj tego samego hosta i portu jako bazowego URL zgodnego z OpenAI.

## Działanie w tle

Dla prostego procesu w tle:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

Aby go zatrzymać:

```bash
pkill -f omniroute
```

Dla automatycznego startu po uruchomieniu urządzenia zainstaluj dodatek Termux:Boot i utwórz skrypt startowy:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Optymalizacja baterii w Androidzie może zatrzymać długo działające procesy w tle. Wyłącz optymalizację baterii dla Termux, jeśli serwer ma pozostać online.

## Dostęp z innych urządzeń

Znajdź adres IP telefonu w sieci WiFi:

```bash
ip addr show wlan0
```

Następnie otwórz dashboard z innego urządzenia:

```text
http://PHONE_IP:20128
```

Na przykład:

```text
http://192.168.1.50:20128
```

Trzymaj telefon i klienta w tej samej zaufanej sieci. Jeśli udostępniasz OmniRoute poza telefonem, włącz klucze API oraz uwierzytelnianie dashboardu.

## Katalog danych

Domyślnie OmniRoute przechowuje dane w katalogu domowym Termux, zgodnie z tą samą ścieżką danych po stronie serwera co na Linuxie. Aby umieścić bazę w konkretnej lokalizacji:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## Ograniczenia

- Electron nie działa w Termux.
- Brak systemowego tray ani integracji z pulpitem.
- Ta konfiguracja jest wyłącznie serwerowa: korzystaj z dashboardu w przeglądarce.
- Natywne zależności mogą wymagać lokalnej kompilacji.
- Urządzenia Android z małą ilością pamięci mogą wymagać mniejszej liczby równoczesnych żądań.
- Funkcje MITM / systemowych certyfikatów mogą wymagać pracy na poziomie magazynu zaufania Androida poza Termux.

## Rozwiązywanie problemów

### Unsupported platform: android (każde żądanie zwraca HTTP 500)

**Objaw:** `omniroute` / `omniroute serve` wypisuje `✔ OmniRoute is running!`, ale każde żądanie do dashboardu lub API zwraca goły `500 Internal Server Error`. Plik `~/.omniroute/logs/application/app.log` pozostaje pusty, `APP_LOG_LEVEL=debug` nic sensownego nie wypisuje, a ciało odpowiedzi to zwykły tekst (`Internal Server Error`) bez szczegółów JSON.

**Przyczyna:** Niektóre buildy Termux/Node zgłaszają `process.platform === "android"`. Next.js `getCacheDirectory()` nie obsługuje tej platformy: wymaga, aby `~/.cache` (lub generyczny katalog tmp) _już_ istniał, w przeciwnym razie kończy się błędem podczas ładowania instrumentation hooka z komunikatem:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

Ponieważ hook się nie ładuje, logowanie nigdy się nie uruchamia — błąd 500 wygląda na całkowicie niemożliwy do zdiagnozowania. OmniRoute tworzy `~/.cache` (i ustawia `XDG_CACHE_HOME`, gdy nie jest ustawione) w punkcie wejścia CLI przed startem Next.js, aby ta sonda zakończyła się powodzeniem na Androidzie/Termux.

**Obsługiwane rozwiązanie (bez łatania pakietu):**

```bash
mkdir -p ~/.cache
omniroute serve
```

W aktualnych buildach OmniRoute CLI robi to automatycznie na Androidzie/Termux — świeża instalacja `npx -y omniroute@latest` / globalna nie powinna wymagać kroku ręcznego. Jeśli po aktualizacji nadal widzisz błąd, utwórz raz `~/.cache` jak wyżej i zrestartuj.

**Nie** łataj `dist/server.js`, aby wymusić `process.platform = "linux"`. Tego typu łatka pakietu jest nadpisywana przy każdej reinstalacji/aktualizacji i jest zbędna, gdy katalog cache już istnieje.

### Błędy kompilacji better-sqlite3

Zainstaluj toolchain kompilacji Termux:

```bash
pkg install nodejs python build-essential
```

Następnie uruchom ponownie:

```bash
npx -y omniroute@latest
```

### Port już zajęty

Sprawdź, co nasłuchuje na domyślnym porcie:

```bash
ss -ltnp | grep 20128
```

Zatrzymaj stary proces:

```bash
pkill -f omniroute
```

### Dashboard niedostępny z innego urządzenia

Upewnij się, że oba urządzenia są w tej samej sieci WiFi, a następnie przetestuj z Termux:

```bash
curl http://localhost:20128
```

Jeśli dostęp lokalny działa, a dostęp z LAN nie, sprawdź izolację hotspotu/WiFi w Androidzie oraz ewentualny profil zapory lub VPN na telefonie.
