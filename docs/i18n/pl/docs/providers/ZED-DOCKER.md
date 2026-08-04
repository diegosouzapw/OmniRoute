---
title: "Integracja Zed IDE w środowiskach Docker"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Integracja Zed IDE w środowiskach Docker

Gdy OmniRoute działa wewnątrz Dockera, standardowy przepływ „Import from Zed Keychain” kończy się niepowodzeniem, ponieważ kontener nie ma dostępu do demona keychain systemu hosta (libsecret w Linux, Keychain w macOS, Credential Manager w Windows), a katalogi konfiguracyjne Zed na systemie plików hosta nie są domyślnie widoczne wewnątrz kontenera.

## Dlaczego import z Keychain nie działa w Dockerze

W kontenerze występują dwa blokujące problemy:

1. **Izolacja systemu plików** — `isZedInstalled()` szuka `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS) albo odpowiednika w Windows. Te ścieżki
   znajdują się na hoście i nie są dostępne, dopóki nie zostaną jawnie zamontowane jako wolumen.
2. **Izolacja IPC** — Nawet gdy katalog konfiguracyjny jest zamontowany, natywny moduł `keytar`
   komunikuje się z usługą keychain systemu operacyjnego przez gniazdo Unix lub sesję D-Bus.
   Żadne z nich nie jest domyślnie mostkowane do kontenera, więc odczyt poświadczeń zawsze się nie udaje.

OmniRoute wykrywa środowisko Docker za pomocą dwóch heurystyk:

- Obecność `/.dockerenv` (zapisywany przez demona Docker przy starcie kontenera).
- Ciąg `docker` pojawiający się w `/proc/1/cgroup` (Linux cgroup v1).

Gdy któraś z heurystyk zadziała, trasa importu zwraca HTTP 422 z
`zedDockerEnvironment: true` oraz komunikatem kierującym do zakładki Manual Token Import.

## Korzystanie z zakładki Manual Token Import

1. Otwórz **Dashboard → Providers → Zed**.
2. Panel **Manual Token Import** pojawia się poniżej karty importu z keychain. Gdy
   OmniRoute wykryje Docker, panel rozwija się automatycznie po pierwszej nieudanej
   próbie importu z keychain.
3. Wybierz dostawcę z listy rozwijanej (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter lub DeepSeek).
4. Wklej klucz API w polu hasła.
5. Kliknij **Import**.

Klucz jest zapisywany jako nowe połączenie dostawcy o nazwie
`Zed Manual Import (<provider>)`.

## Gdzie Zed przechowuje klucze API na hoście

Zed przechowuje klucze dostawców AI w keychain systemu operacyjnego pod nazwami usług takimi jak
`zed-openai`, `ai.zed.openai`, `zed-anthropic` itd. Aby je pobrać do ręcznego
importu, zajrzyj do:

**Linux**

```
~/.config/zed/settings.json
```

Sekcja `language_models` zawiera konfiguracje dostawców. Klucze zapisane w
keychain przez interfejs Zed nie są w postaci jawnego tekstu w `settings.json`; pobierz je przez
przeglądarkę keychain, np. GNOME Keyring / Seahorse, albo uruchamiając:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Wpisy Keychain można znaleźć w **Keychain Access.app**, wyszukując `zed`.

## Opcja montowania wolumenu (zaawansowane)

Opcjonalnie możesz zamontować katalog konfiguracyjny Zed w kontenerze w trybie tylko do odczytu.
To nie rozwiązuje problemu z keychain, ale może być przydatne dla przyszłych funkcji odczytujących
niesekretne wartości konfiguracji Zed (np. preferencje modeli).

```yaml
# docker-compose.yml snippet
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Linux host
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # macOS host (uncomment instead)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # Future: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Uwaga: nadpisanie zmiennej środowiskowej `ZED_CONFIG_PATH` nie jest jeszcze zaimplementowane. Ten
fragment jest podany jako odniesienie na wypadek dodania tej funkcji.

## API ręcznego importu

Endpoint ręcznego importu można też wywołać bezpośrednio:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <management-token>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "My Zed OpenAI key"   // optional
}
```

Przy sukcesie zwraca:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Rozwiązywanie problemów

| Objaw                                | Przyczyna                            | Rozwiązanie                              |
| ------------------------------------ | ------------------------------------ | ---------------------------------------- |
| 422 + `zedDockerEnvironment: true`   | Działanie wewnątrz Dockera           | Użyj zakładki Manual Token Import        |
| 404 + `zedInstalled: false`          | Zed nie jest zainstalowany na hoście | Zainstaluj Zed lub użyj ręcznego importu |
| 403 + keychain access denied         | System odmówił dostępu do keychain   | Przyznaj uprawnienie w monicie systemu   |
| 404 + keychain service not available | Brak `libsecret` w Linux             | Zainstaluj `libsecret-1-dev`             |
