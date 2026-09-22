# Progressive Web App (PWA) Guide (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/PWA_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/PWA_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/PWA_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/PWA_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/PWA_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/PWA_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/PWA_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/PWA_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/PWA_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/PWA_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/PWA_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/PWA_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/PWA_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/PWA_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/PWA_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/PWA_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/PWA_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/PWA_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/PWA_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/PWA_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/PWA_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/PWA_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/PWA_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/PWA_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/PWA_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/PWA_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/PWA_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/PWA_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/PWA_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/PWA_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/PWA_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/PWA_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/PWA_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/PWA_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/PWA_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/PWA_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/PWA_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/PWA_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/PWA_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/PWA_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/PWA_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/PWA_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/PWA_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/PWA_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/PWA_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/PWA_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/PWA_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/PWA_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/PWA_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/PWA_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/PWA_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/PWA_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/PWA_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/PWA_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/PWA_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/PWA_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/PWA_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/PWA_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/PWA_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/PWA_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/PWA_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/PWA_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/PWA_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/PWA_GUIDE.md)

---

OmniRoute leveres som en fuldt installerbar Progressive Web App. Når du åbner kontrolpanelet fra en mobilbrowser — Android (Chrome) eller iOS (Safari) — kan du vælge "Føj til startskærm" og få en oplevelse som i en indbygget app uden at skulle bruge en appbutik.

## Hvad er en PWA?

En Progressive Web App omdanner OmniRoutes webbaserede kontrolpanel til noget, der ser ud og fungerer som en indbygget mobilapp. Når den er installeret:

- Startes den fra din startskærm med sit eget ikon
- Åbnes den i fuldskærm — uden browserens adresselinje eller fanebrugerflade
- Fungerer den offline med en dedikeret forbindelsesside
- Cachelagrer den statiske ressourcer, så de indlæses hurtigere
- Understøtter den både stående og liggende skærmretning

## Installation

### Android (Chrome)

1. Åbn OmniRoute-kontrolpanelet i Chrome: `http://YOUR_IP:20128`
2. Chrome viser automatisk banneret **"Føj OmniRoute til startskærmen"**, eller:
   - Tryk på menuen **⋮** (tre prikker) → **"Føj til startskærm"** eller **"Installer app"**
3. Bekræft dialogboksen
4. OmniRoute vises på din startskærm som en selvstændig app

### iOS (Safari)

1. Åbn OmniRoute-kontrolpanelet i Safari: `http://YOUR_IP:20128`
2. Tryk på knappen **Del** (firkant med pil)
3. Rul ned, og tryk på **"Føj til hjemmeskærm"**
4. Giv den et navn (standarden er "OmniRoute"), og tryk på **Tilføj**
5. OmniRoute vises på din startskærm med appikonet

### Computer (Chrome / Edge)

1. Åbn OmniRoute-kontrolpanelet
2. Klik på **installationsikonet** i adresselinjen (eller ⋮ → "Installer OmniRoute...")
3. Bekræft dialogboksen
4. OmniRoute åbnes som et selvstændigt vindue — uden faner og adresselinje

## Funktioner

### Fuldskærmsoplevelse

Manifestet er konfigureret med `display: "fullscreen"`, hvilket betyder, at den installerede app bruger hele skærmen — uden browsergrænseflade og uden overlapning med statuslinjen. Det får kontrolpanelet til at føles som en ægte indbygget app.

### Offlineunderstøttelse

OmniRoute indeholder en service worker (`sw.js`), der leverer intelligent cachelagring:

| Ressourcetype                                              | Strategi                            | Funktionsmåde                                                                                               |
| ---------------------------------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Appskal**                                                | Cache først                         | `/`, `/offline`, manifestet og ikoner cachelagres på forhånd ved installation                               |
| **Statiske ressourcer** (CSS, JS, billeder, skrifttyper)   | Netværk først med cache som reserve | Henter nye versioner fra netværket; bruger cachen som reserve i offlinetilstand                             |
| **Next.js-bundter** (`/_next/`)                            | Netværk først med cacheopdatering   | Henter fra netværket og opdaterer cachen; leverer den cachelagrede version offline                          |
| **Navigationsanmodninger**                                 | Omgås (opfanges aldrig)             | Browseren håndterer HTTP/3→HTTP/2-reserveløsningen; en død QUIC-socket må ikke blive til `Response.error()` |
| **API-/kontrolpanelruter** (`/api/`, `/a2a`, `/dashboard`) | Omgås (cachelagres aldrig)          | Går altid direkte til serveren — opfanges aldrig af service workeren                                        |

### Offlineside

Når netværket ikke er tilgængeligt, og en bruger navigerer til en ny side, leverer service workeren en dedikeret `/offline`-side, som:

- Viser en tydelig meddelelse om **"Forbindelsesproblem"**
- Viser en dynamisk **online-/offlinestatusindikator**, der opdateres i realtid
- Indeholder knappen **"Prøv forbindelsen igen"**, som genindlæser siden, når forbindelsen er genoprettet
- Indeholder et link til **statussiden** til diagnosticering

### Appikoner

OmniRoute leverer ikoner, der er optimeret til hver platform:

| Fil                    | Størrelse        | Bruges af                               |
| ---------------------- | ---------------- | --------------------------------------- |
| `icon-512.png`         | 512×512          | Android-installationsdialog, startskærm |
| `apple-touch-icon.png` | 180×180          | iOS-startskærmsikon                     |
| `icon-192.svg`         | 192×192 (vektor) | Adaptivt Android-ikon                   |
| `apple-touch-icon.svg` | 180×180 (vektor) | Apple-reserveløsning                    |
| `favicon.svg`          | Vektor           | Browserfaner                            |
| `favicon.ico`          | Flere størrelser | Ældre browsere                          |

### Automatisk registrering

Service workeren registreres automatisk via komponenten `<PwaRegister />` i rodlayoutet. Der kræves ingen handling fra brugeren — appen kan installeres, så snart browseren registrerer det gyldige manifest og den gyldige service worker.

## Teknisk arkitektur

### Webappmanifest (`manifest.webmanifest`)

Genereret af Next.js via `src/app/manifest.ts`:

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

En almindelig service worker (uden frameworkafhængigheder) med:

- **Installationsfase**: Forhåndscacher appskallen (roden, offlinesiden, manifestet og ikonerne)
- **Aktiveringsfase**: Rydder op i gamle cacheversioner og overtager alle klienter
- **Hentningsfase**: Intelligent routing baseret på anmodningstypen (navigation, statisk ressource, API)
- **Cacheversionsstyring**: `omniroute-pwa-v3` — øg denne for at gennemtvinge en ny cache ved opdatering

### Layoutmetadata (`src/app/layout.tsx`)

Rodlayoutet indeholder alle de metatags, der kræves for PWA-kompatibilitet:

- `manifest`-link til `/manifest.webmanifest`
- `apple-web-app-capable: true` til selvstændig tilstand på iOS
- `apple-web-app-status-bar-style: black-translucent`
- `mobile-web-app-capable: yes` til Chrome på Android
- `theme-color: #0b0f1a`
- `viewport-fit: cover` til gengivelse fra kant til kant

### Komponent: `PwaRegister`

Denne klientkomponent findes i `src/shared/components/PwaRegister.tsx` og:

1. Kører ved montering (kun på klientsiden)
2. Kontrollerer, om browseren understøtter `serviceWorker`
3. Registrerer `/sw.js` lydløst (fejl ignoreres for at undgå at blokere appen)
4. Renderer intet (`return null`) — det er en komponent, der udelukkende har en sideeffekt

## Brug med Termux (Android)

Når OmniRoute kører på Android via Termux, fungerer PWA'en problemfrit:

1. Start OmniRoute i Termux: `npx omniroute`
2. Åbn Chrome på den samme telefon: `http://localhost:20128`
3. Installer PWA'en via "Føj til startskærmen"
4. PWA'en opretter forbindelse til den lokale Termux-server — alt kører på enheden

Denne kombination betyder, at din Android-telefon både er **serveren** (Termux) og **klienten** (PWA) — en komplet, selvstændig AI-gateway.

## Brug fra andre enheder

Installer PWA'en på enhver enhed, der har browseradgang til din OmniRoute-server:

- **En anden telefon/tablet**: Gå til `http://PHONE_IP:20128`, og installer PWA'en
- **Bærbar computer**: Åbn Chrome/Edge, og installer den som en desktop-PWA
- **Smart-tv med browser**: Tilgå dashboardet i fuldskærmstilstand

## Tilpasning

### Instansnavn

PWA-titlen følger indstillingen **Instansnavn** under `Dashboard → Indstillinger`. Hvis du omdøber din instans til "Min AI-gateway", viser den installerede PWA dette navn.

### Brugerdefineret favicon

Hvis du uploader et brugerdefineret favicon via `Dashboard → Indstillinger`, afspejler PWA-ikonet på desktop det brugerdefinerede ikon. Ikoner på mobilenheders startskærm bruger de forhåndsgenererede filer `icon-512.png` og `apple-touch-icon.png`.

## Begrænsninger

- **Ingen push-notifikationer** — Service workeren implementerer ikke Push API'en. Notifikationer håndteres i stedet af Electron-appen.
- **Ingen baggrundssynkronisering** — Offlinehandlinger sættes ikke i kø til senere afvikling. PWA'en er primært beregnet til visning af dashboards.
- **iOS-begrænsninger** — Safari på iOS understøtter ikke alle PWA-funktioner (f.eks. skal installation startes manuelt, og service workers i baggrunden er begrænsede).
- **Cachestørrelse** — Service workeren cacher kun statiske aktiver. Store svarpayloads fra `/api/`-ruter caches aldrig.
- **Tilpassede ikoner på mobilenheder** — Ændring af faviconet i indstillingerne opdaterer ikke ikonet på startskærmen på mobilenheder (dette kræver, at PWA-ikonerne genereres igen).

## Filoversigt

| Fil                                     | Formål                                                       |
| --------------------------------------- | ------------------------------------------------------------ |
| `src/app/manifest.ts`                   | Next.js-manifestrute (genererer `manifest.webmanifest`)      |
| `public/sw.js`                          | Service worker med cachelogik                                |
| `src/shared/components/PwaRegister.tsx` | Klientkomponent, der registrerer service workeren            |
| `src/app/offline/page.tsx`              | Offline-reserveside med live-statusindikator                 |
| `src/app/layout.tsx`                    | Rodlayout med PWA-metadata (apple-web-app, theme-color osv.) |
| `public/icon-512.png`                   | 512×512 PNG-ikon (Android, splashskærm)                      |
| `public/apple-touch-icon.png`           | 180×180 PNG-ikon (iOS-startskærm)                            |
| `public/icon-192.svg`                   | 192×192 SVG-ikon (Android, adaptivt)                         |
| `public/apple-touch-icon.svg`           | 180×180 SVG-ikon (Apple-reserveikon)                         |
