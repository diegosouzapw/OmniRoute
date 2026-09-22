# Progressive Web App (PWA) Guide (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/PWA_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/PWA_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/PWA_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/PWA_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/PWA_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/PWA_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/PWA_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/PWA_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/PWA_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/PWA_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/PWA_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/PWA_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/PWA_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/PWA_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/PWA_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/PWA_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/PWA_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/PWA_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/PWA_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/PWA_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/PWA_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/PWA_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/PWA_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/PWA_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/PWA_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/PWA_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/PWA_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/PWA_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/PWA_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/PWA_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/PWA_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/PWA_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/PWA_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/PWA_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/PWA_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/PWA_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/PWA_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/PWA_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/PWA_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/PWA_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/PWA_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/PWA_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/PWA_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/PWA_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/PWA_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/PWA_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/PWA_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/PWA_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/PWA_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/PWA_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/PWA_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/PWA_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/PWA_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/PWA_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/PWA_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/PWA_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/PWA_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/PWA_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/PWA_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/PWA_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/PWA_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/PWA_GUIDE.md)

---

OmniRoute levereras som en fullständigt installerbar progressiv webbapp. När du öppnar instrumentpanelen från valfri mobilwebbläsare — Android (Chrome) eller iOS (Safari) — kan du välja ”Lägg till på startskärmen” och få en upplevelse som liknar en inbyggd app, utan att behöva använda en appbutik.

## Vad är en PWA?

En progressiv webbapp förvandlar OmniRoutes webbaserade instrumentpanel till något som ser ut och fungerar som en inbyggd mobilapp. När den har installerats:

- Startas den från startskärmen med en egen ikon
- Öppnas den i helskärmsläge — utan webbläsarens adressfält eller flikgränssnitt
- Fungerar den offline med en särskild anslutningssida
- Cachelagras statiska resurser för snabbare inläsning
- Stöds både stående och liggande orientering

## Installation

### Android (Chrome)

1. Öppna OmniRoutes instrumentpanel i Chrome: `http://YOUR_IP:20128`
2. Chrome visar automatiskt en banderoll med **”Lägg till OmniRoute på startskärmen”**, eller:
   - Tryck på menyn **⋮** (tre punkter) → **”Lägg till på startskärmen”** eller **”Installera app”**
3. Bekräfta uppmaningen
4. OmniRoute visas på startskärmen som en fristående app

### iOS (Safari)

1. Öppna OmniRoutes instrumentpanel i Safari: `http://YOUR_IP:20128`
2. Tryck på knappen **Dela** (ruta med pil)
3. Rulla ned och tryck på **”Lägg till på hemskärmen”**
4. Ange ett namn (standardvärdet är ”OmniRoute”) och tryck på **Lägg till**
5. OmniRoute visas på startskärmen med appikonen

### Dator (Chrome / Edge)

1. Öppna OmniRoutes instrumentpanel
2. Klicka på **installationsikonen** i adressfältet (eller ⋮ → ”Installera OmniRoute...”)
3. Bekräfta uppmaningen
4. OmniRoute öppnas som ett fristående fönster — utan flikar och adressfält

## Funktioner

### Helskärmsupplevelse

Manifestet är konfigurerat med `display: "fullscreen"`, vilket innebär att den installerade appen använder hela skärmen — utan webbläsargränssnitt och utan överlappning med statusfältet. Detta gör att instrumentpanelen verkligen känns som en inbyggd app.

### Offlinestöd

OmniRoute innehåller en service worker (`sw.js`) som tillhandahåller intelligent cachelagring:

| Resurstyp                                                       | Strategi                           | Beteende                                                                                                                |
| --------------------------------------------------------------- | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Appskal**                                                     | Cache först                        | `/`, `/offline`, manifestet och ikonerna förhandscachelagras vid installation                                           |
| **Statiska resurser** (CSS, JS, bilder, teckensnitt)            | Nätverk först med cache som reserv | Hämtar aktuella resurser från nätverket; använder cachen som reserv offline                                             |
| **Next.js-paket** (`/_next/`)                                   | Nätverk först med cacheuppdatering | Hämtar från nätverket och uppdaterar cachen; använder den cachelagrade versionen offline                                |
| **Navigeringsbegäranden**                                       | Kringgås (fångas aldrig upp)       | Webbläsaren hanterar återgången från HTTP/3 till HTTP/2; en inaktiv QUIC-socket får inte resultera i `Response.error()` |
| **API-/instrumentpanelsrutter** (`/api/`, `/a2a`, `/dashboard`) | Kringgås (cachelagras aldrig)      | Går alltid direkt till servern — fångas aldrig upp av service workern                                                   |

### Offlinesida

När nätverket inte är tillgängligt och en användare navigerar till en ny sida visar service workern en särskild `/offline`-sida som:

- Visar ett tydligt meddelande om **”Anslutningsproblem”**
- Visar en direktuppdaterad **online-/offlinestatusindikator**
- Tillhandahåller en knapp för att **”Försöka ansluta igen”** och läsa in sidan på nytt när anslutningen återkommer
- Länkar till **statussidan** för diagnostik

### Appikoner

OmniRoute tillhandahåller ikoner som är optimerade för varje plattform:

| Fil                    | Storlek          | Används av                               |
| ---------------------- | ---------------- | ---------------------------------------- |
| `icon-512.png`         | 512×512          | Androids installationsdialog, startskärm |
| `apple-touch-icon.png` | 180×180          | Ikon på iOS-startskärmen                 |
| `icon-192.svg`         | 192×192 (vektor) | Adaptiv Android-ikon                     |
| `apple-touch-icon.svg` | 180×180 (vektor) | Reservikon för Apple                     |
| `favicon.svg`          | Vektor           | Webbläsarflikar                          |
| `favicon.ico`          | Flera storlekar  | Äldre webbläsare                         |

### Automatisk registrering

Service workern registreras automatiskt via komponenten `<PwaRegister />` i rotlayouten. Ingen åtgärd krävs av användaren — appen blir installerbar så snart webbläsaren identifierar det giltiga manifestet och service workern.

## Teknisk arkitektur

### Webbappsmanifest (`manifest.webmanifest`)

Genereras av Next.js via `src/app/manifest.ts`:

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
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any maskable"
    },
    { "src": "/apple-touch-icon.png", "sizes": "180x180", "type": "image/png" }
  ]
}
```

### Service worker (`public/sw.js`)

En service worker i vanlig JavaScript (utan ramverksberoenden) med:

- **Installationsfas**: Förhandslagrar appskalet (roten, offlinesidan, manifestet och ikonerna)
- **Aktiveringsfas**: Rensar gamla cacheversioner och tar kontroll över alla klienter
- **Hämtningsfas**: Intelligent dirigering baserad på typ av begäran (navigering, statisk resurs, API)
- **Cacheversionshantering**: `omniroute-pwa-v3` — öka detta för att tvinga fram en ny cache vid uppdatering

### Layoutmetadata (`src/app/layout.tsx`)

Rotlayouten tillhandahåller alla metataggar som krävs för PWA-kompatibilitet:

- `manifest`-länk till `/manifest.webmanifest`
- `apple-web-app-capable: true` för fristående läge i iOS
- `apple-web-app-status-bar-style: black-translucent`
- `mobile-web-app-capable: yes` för Chrome på Android
- `theme-color: #0b0f1a`
- `viewport-fit: cover` för kant-till-kant-rendering

### Komponent: `PwaRegister`

Den här klientkomponenten finns i `src/shared/components/PwaRegister.tsx` och:

1. Körs vid montering (endast på klientsidan)
2. Kontrollerar om webbläsaren har stöd för `serviceWorker`
3. Registrerar `/sw.js` tyst (fel ignoreras för att undvika att appen blockeras)
4. Renderar ingenting (`return null`) — det är en komponent som endast används för sidoeffekter

## Användning med Termux (Android)

När OmniRoute körs på Android via Termux fungerar PWA:n sömlöst:

1. Starta OmniRoute i Termux: `npx omniroute`
2. Öppna Chrome på samma telefon: `http://localhost:20128`
3. Installera PWA:n via ”Lägg till på startskärmen”
4. PWA:n ansluter till den lokala Termux-servern — allt körs på enheten

Den här kombinationen innebär att din Android-telefon är både **servern** (Termux) och **klienten** (PWA) — en komplett, självständig AI-gateway.

## Användning från andra enheter

Installera PWA:n på valfri enhet vars webbläsare har åtkomst till din OmniRoute-server:

- **En annan telefon/surfplatta**: Navigera till `http://PHONE_IP:20128` och installera PWA:n
- **Bärbar dator**: Öppna Chrome/Edge och installera den som en PWA för datorn
- **Smart-tv med webbläsare**: Öppna instrumentpanelen i helskärmsläge

## Anpassning

### Instansnamn

PWA-titeln använder inställningen **Instansnamn** från `Dashboard → Settings`. Om du byter namn på instansen till ”Min AI-gateway” kommer den installerade PWA:n att visa det namnet.

### Anpassad favicon

Om du laddar upp en anpassad favicon via `Dashboard → Settings` kommer PWA-ikonen på datorn att använda den anpassade ikonen. Ikoner på mobila startskärmar använder de förgenererade filerna `icon-512.png` och `apple-touch-icon.png`.

## Begränsningar

- **Inga pushnotiser** — Service workern implementerar inte Push API. Notiser hanteras i stället av Electron-appen.
- **Ingen bakgrundssynkronisering** — Offlineåtgärder köas inte för att köras igen. PWA:n är främst avsedd som en instrumentpanelsvisare.
- **Begränsningar i iOS** — Safari på iOS stöder inte alla PWA-funktioner (t.ex. måste installation initieras manuellt och service workers i bakgrunden är begränsade).
- **Cachestorlek** — Service workern cachar endast statiska resurser. Stora svarsnyttolaster från `/api/`-rutter cachas aldrig.
- **Anpassade ikoner på mobila enheter** — Om faviconen ändras i inställningarna uppdateras inte hemskärmsikonen på mobila enheter (detta kräver att PWA-ikonerna genereras på nytt).

## Filreferens

| Fil                                     | Syfte                                                        |
| --------------------------------------- | ------------------------------------------------------------ |
| `src/app/manifest.ts`                   | Next.js-manifestrutt (genererar `manifest.webmanifest`)      |
| `public/sw.js`                          | Service worker med cachelogik                                |
| `src/shared/components/PwaRegister.tsx` | Klientkomponent som registrerar service workern              |
| `src/app/offline/page.tsx`              | Reservsida för offlineläge med statusindikator i realtid     |
| `src/app/layout.tsx`                    | Rotlayout med PWA-metadata (apple-web-app, theme-color osv.) |
| `public/icon-512.png`                   | 512×512 PNG-ikon (Android, startskärm)                       |
| `public/apple-touch-icon.png`           | 180×180 PNG-ikon (hemskärm i iOS)                            |
| `public/icon-192.svg`                   | 192×192 SVG-ikon (adaptiv Android-ikon)                      |
| `public/apple-touch-icon.svg`           | 180×180 SVG-ikon (reservikon för Apple)                      |
