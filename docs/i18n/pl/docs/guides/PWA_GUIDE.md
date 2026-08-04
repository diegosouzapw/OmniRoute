---
title: "Przewodnik po Progressive Web App (PWA)"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Przewodnik po Progressive Web App (PWA)

OmniRoute jest dostarczany jako w pełni instalowalna Progressive Web App. Gdy otworzysz dashboard w dowolnej przeglądarce mobilnej — Android (Chrome) lub iOS (Safari) — możesz wybrać „Dodaj do ekranu głównego” i uzyskać doświadczenie zbliżone do natywnej aplikacji, bez sklepu z aplikacjami.

## Czym jest PWA?

Progressive Web App zamienia webowy dashboard OmniRoute w coś, co wygląda i działa jak natywna aplikacja mobilna. Po zainstalowaniu:

- Uruchamia się z ekranu głównego z własną ikoną
- Otwiera się na pełnym ekranie — bez paska adresu przeglądarki ani interfejsu kart
- Działa offline dzięki dedykowanej stronie łączności
- Buforuje zasoby statyczne w celu szybszego ładowania
- Obsługuje orientację pionową i poziomą

## Instalacja

### Android (Chrome)

1. Otwórz dashboard OmniRoute w Chrome: `http://YOUR_IP:20128`
2. Chrome automatycznie pokaże baner **"Add OmniRoute to Home screen"**, albo:
   - Stuknij menu **⋮** (trzy kropki) → **"Add to Home screen"** lub **"Install app"**
3. Potwierdź monity
4. OmniRoute pojawi się na ekranie głównym jako samodzielna aplikacja

### iOS (Safari)

1. Otwórz dashboard OmniRoute w Safari: `http://YOUR_IP:20128`
2. Stuknij przycisk **Share** (kwadrat ze strzałką)
3. Przewiń w dół i stuknij **"Add to Home Screen"**
4. Nadaj nazwę (domyślnie „OmniRoute”) i stuknij **Add**
5. OmniRoute pojawi się na ekranie głównym z ikoną aplikacji

### Desktop (Chrome / Edge)

1. Otwórz dashboard OmniRoute
2. Kliknij **ikona instalacji** na pasku adresu (lub ⋮ → "Install OmniRoute...")
3. Potwierdź monity
4. OmniRoute otworzy się jako samodzielne okno — bez kart i paska adresu

## Funkcje

### Doświadczenie pełnoekranowe

Manifest jest skonfigurowany z `display: "fullscreen"`, co oznacza, że zainstalowana aplikacja zajmuje cały ekran — bez chrome przeglądarki i bez nakładania się paska statusu. Dzięki temu dashboard sprawia wrażenie w pełni natywnego.

### Wsparcie offline

OmniRoute zawiera service worker (`sw.js`), który zapewnia inteligentne buforowanie:

| Typ zasobu                                             | Strategia                          | Zachowanie                                                                   |
| ------------------------------------------------------ | ---------------------------------- | ---------------------------------------------------------------------------- |
| **App Shell**                                          | Cache-first                        | `/`, `/offline`, manifest i ikony są wstępnie buforowane przy instalacji     |
| **Zasoby statyczne** (CSS, JS, obrazy, fonty)          | Network-first with cache fallback  | Pobiera świeże dane z sieci; w razie offline wraca do cache                  |
| **Bundle'y Next.js** (`/_next/`)                       | Network-first with cache update    | Pobiera z sieci i aktualizuje cache; offline serwuje wersję z cache          |
| **Żądania nawigacji**                                  | Network-only with offline fallback | Zawsze pobiera z sieci; przy braku sieci pokazuje stronę `/offline`          |
| **Trasy API** (`/api/`, `/a2a`, `/dashboard/endpoint`) | Bypass (never cached)              | Zawsze idzie bezpośrednio na serwer — nigdy nie jest przechwytywane przez SW |

### Strona offline

Gdy sieć jest niedostępna i użytkownik przechodzi na nową stronę, service worker serwuje dedykowaną stronę `/offline`, która:

- Wyświetla czytelny komunikat **"Connectivity Issue"**
- Pokazuje żywy **wskaźnik statusu online/offline** aktualizowany w czasie rzeczywistym
- Udostępnia przycisk **"Retry Connection"** do przeładowania po powrocie łączności
- Linkuje do **Status Page** w celach diagnostycznych

### Ikony aplikacji

OmniRoute dostarcza ikony zoptymalizowane pod każdą platformę:

| Plik                   | Rozmiar          | Używane przez                           |
| ---------------------- | ---------------- | --------------------------------------- |
| `icon-512.png`         | 512×512          | Monit instalacji Android, splash screen |
| `apple-touch-icon.png` | 180×180          | Ikona ekranu głównego iOS               |
| `icon-192.svg`         | 192×192 (wektor) | Adaptive icon Android                   |
| `apple-touch-icon.svg` | 180×180 (wektor) | Fallback Apple                          |
| `favicon.svg`          | Wektor           | Karty przeglądarki                      |
| `favicon.ico`          | Wiele rozmiarów  | Starsze przeglądarki                    |

### Automatyczna rejestracja

Service worker jest rejestrowany automatycznie przez komponent `<PwaRegister />` w root layout. Nie jest potrzebna żadna akcja użytkownika — aplikacja staje się instalowalna, gdy tylko przeglądarka wykryje poprawny manifest i service worker.

## Architektura techniczna

### Web App Manifest (`manifest.webmanifest`)

Generowany przez Next.js przez `src/app/manifest.ts`:

```json
{
  "name": "OmniRoute",
  "short_name": "OmniRoute",
  "description": "OmniRoute is an AI gateway for multi-provider LLMs. One endpoint for all your AI providers.",
  "start_url": "/",
  "scope": "/",
  "display": "fullscreen",
  "orientation": "any",
  "background_color": "#0b0f1a",
  "theme_color": "#0b0f1a",
  "icons": [
    { "src": "/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable" },
    { "src": "/apple-touch-icon.png", "sizes": "180x180", "type": "image/png" }
  ]
}
```

### Service Worker (`public/sw.js`)

Zwykły service worker (bez zależności frameworkowych) z:

- **Faza install**: wstępnie buforuje app shell (root, strona offline, manifest, ikony)
- **Faza activate**: czyści stare wersje cache i przejmuje wszystkie klienty
- **Faza fetch**: inteligentne routowanie według typu żądania (nawigacja, zasób statyczny, API)
- **Wersjonowanie cache**: `omniroute-pwa-v2` — zwiększ tę wartość, aby wymusić świeży cache przy aktualizacji

### Metadane layoutu (`src/app/layout.tsx`)

Root layout dostarcza wszystkie meta tagi wymagane do zgodności z PWA:

- Link `manifest` do `/manifest.webmanifest`
- `apple-web-app-capable: true` dla trybu standalone na iOS
- `apple-web-app-status-bar-style: black-translucent`
- `mobile-web-app-capable: yes` dla Chrome na Androidzie
- `theme-color: #0b0f1a`
- `viewport-fit: cover` do renderowania od krawędzi do krawędzi

### Komponent: `PwaRegister`

Znajduje się w `src/shared/components/PwaRegister.tsx`. Ten komponent kliencki:

1. Uruchamia się przy montowaniu (tylko po stronie klienta)
2. Sprawdza obsługę `serviceWorker` w przeglądarce
3. Rejestruje `/sw.js` w tle (błędy są połykane, aby nie blokować aplikacji)
4. Nic nie renderuje (`return null`) — to komponent wyłącznie ze skutkami ubocznymi

## Użycie z Termux (Android)

Przy uruchamianiu OmniRoute na Androidzie przez Termux PWA działa bezproblemowo:

1. Uruchom OmniRoute w Termux: `npx omniroute`
2. Otwórz Chrome na tym samym telefonie: `http://localhost:20128`
3. Zainstaluj PWA przez "Add to Home Screen"
4. PWA łączy się z lokalnym serwerem Termux — wszystko działa na urządzeniu

Ta kombinacja oznacza, że telefon z Androidem jest jednocześnie **serwerem** (Termux) i **klientem** (PWA) — kompletna, samodzielna brama AI.

## Użycie z innych urządzeń

Zainstaluj PWA na dowolnym urządzeniu, które ma dostęp przeglądarkowy do serwera OmniRoute:

- **Inny telefon/tablet**: przejdź do `http://PHONE_IP:20128` i zainstaluj PWA
- **Laptop**: otwórz Chrome/Edge i zainstaluj jako desktopowe PWA
- **Smart TV z przeglądarką**: otwórz dashboard na pełnym ekranie

## Dostosowywanie

### Nazwa instancji

Tytuł PWA respektuje ustawienie **Instance Name** z `Dashboard → Settings`. Jeśli zmienisz nazwę instancji na „My AI Gateway”, zainstalowane PWA pokaże tę nazwę.

### Własny favicon

Jeśli wgrasz własny favicon przez `Dashboard → Settings`, ikona PWA na desktopie odzwierciedli tę ikonę. Ikony ekranu głównego na mobile używają wbudowanych plików `icon-512.png` i `apple-touch-icon.png`.

## Ograniczenia

- **Brak push notifications** — service worker nie implementuje Push API. Powiadomienia obsługuje aplikacja Electron.
- **Brak background sync** — akcje offline nie są kolejkowane do ponownego odtworzenia. PWA jest przede wszystkim przeglądarką dashboardu.
- **Ograniczenia iOS** — Safari na iOS nie obsługuje wszystkich funkcji PWA (np. monity instalacji są ręczne, a background service workers są ograniczone).
- **Rozmiar cache** — service worker buforuje wyłącznie zasoby statyczne. Duże payloady odpowiedzi z tras `/api/` nigdy nie trafiają do cache.
- **Własne ikony na mobile** — zmiana faviconu w ustawieniach nie aktualizuje ikony ekranu głównego na mobile (wymaga to regeneracji ikon PWA).

## Referencja plików

| Plik                                    | Przeznaczenie                                                  |
| --------------------------------------- | -------------------------------------------------------------- |
| `src/app/manifest.ts`                   | Trasa manifestu Next.js (generuje `manifest.webmanifest`)      |
| `public/sw.js`                          | Service worker z logiką cache                                  |
| `src/shared/components/PwaRegister.tsx` | Komponent kliencki rejestrujący service worker                 |
| `src/app/offline/page.tsx`              | Strona fallback offline z żywym wskaźnikiem statusu            |
| `src/app/layout.tsx`                    | Root layout z metadanymi PWA (apple-web-app, theme-color itd.) |
| `public/icon-512.png`                   | Ikona PNG 512×512 (Android, splash screen)                     |
| `public/apple-touch-icon.png`           | Ikona PNG 180×180 (ekran główny iOS)                           |
| `public/icon-192.svg`                   | Ikona SVG 192×192 (Android adaptive)                           |
| `public/apple-touch-icon.svg`           | Ikona SVG 180×180 (fallback Apple)                             |
