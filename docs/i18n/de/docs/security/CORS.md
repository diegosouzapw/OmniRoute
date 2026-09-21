# CORS Configuration & Security (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute steuert anhand einer einzigen, zentralisierten Positivliste, welche
**Browser-Ursprünge** Cross-Origin-Antworten lesen dürfen. Das Modell ist
**standardmäßig restriktiv**: Kein Ursprung ist erlaubt, bis Sie ihn ausdrücklich
freigeben. Diese Seite dokumentiert, wie die Positivliste ausgewertet wird, was
`CORS_ALLOW_ALL=true` tatsächlich offenlegt (und insbesondere, was **nicht**),
wie Entwicklungs- und Produktionsumgebungen sicher konfiguriert werden und
welche Laufzeitwarnung das Dashboard anzeigt, wenn ein Platzhalter aktiv ist.

**Verbindliche Quelle:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). Die Positivliste wird einmalig in der
Middleware (`src/server/authz/pipeline.ts`) angewendet — einzelne Route-Handler
setzen `Access-Control-Allow-Origin` nicht selbst.

## So wird ein Ursprung ausgewertet

Für jede Anfrage berechnet die Middleware den Wert von
`Access-Control-Allow-Origin` in dieser Reihenfolge:

1. **`CORS_ALLOW_ALL=true`** (oder das veraltete `CORS_ORIGIN=*`) → den
   `Origin` des Aufrufers zurückgeben (oder `*`, wenn kein `Origin`-Header
   vorhanden ist), zusammen mit `Vary: Origin`, damit Caches korrekt bleiben.
   Derselbe zentrale Kontrollpunkt `applyCorsHeaders()` fügt außerdem
   `Vary: Accept-Encoding` zu jeder 2xx-Antwort mit Inhalt auf der per Token
   authentifizierten `/v1*`-/`/v1beta*`-Oberfläche hinzu (`relaxForTokenAuth`,
   RFC 9110 §12.5.5, Issue #6737), damit nachgelagerte/gemeinsam genutzte Caches
   komprimierte und unkomprimierte Varianten korrekt unterscheiden können.
2. Andernfalls wird der `Origin` der Anfrage normalisiert (in Kleinbuchstaben
   umgewandelt, abschließender Schrägstrich entfernt) und mit der
   **zusammengeführten Positivliste** abgeglichen:
   - Umgebungsvariable **`CORS_ALLOWED_ORIGINS`** — kommagetrennte Liste, und
   - die Laufzeiteinstellung **`corsOrigins`** (Dashboard → Sicherheit → _Für
     CORS zulässige Ursprünge_), die über `setRuntimeAllowedOrigins()` aus
     `src/lib/config/runtimeSettings.ts` eingebunden wird.
3. Keine Übereinstimmung → **es wird kein `Access-Control-Allow-Origin`-Header
   ausgegeben**. Der Browser blockiert das Cross-Origin-Lesen. Dies ist das
   beabsichtigte standardmäßig restriktive Verhalten.

| Umgebungsvariable      | Bedeutung                                                                                              |
| ---------------------- | ------------------------------------------------------------------------------------------------------ |
| `CORS_ALLOWED_ORIGINS` | CSV-Liste der exakt zuzulassenden Ursprünge (empfohlen).                                               |
| `CORS_ALLOW_ALL`       | `true`/`1` → jeden Ursprung zurückgeben (Platzhalter). Nur für die Entwicklung.                        |
| `CORS_ORIGIN`          | Veraltet. `*` verhält sich wie `CORS_ALLOW_ALL`; ein einzelner Wert wird der Positivliste hinzugefügt. |

## Bedrohungsmodell — was `CORS_ALLOW_ALL=true` wirklich offenlegt

Die allgemeine OWASP-Warnung („Wildcard-CORS = jede Website kann Ihre API
aufrufen“) sollte ernst genommen werden, doch die Offenlegung durch OmniRoute
ist **begrenzter als im allgemeinen Fall**, und zwar aufgrund einer konkreten
Implementierungseigenschaft:

> **Das zentrale `applyCorsHeaders()` gibt niemals
> `Access-Control-Allow-Credentials` aus.** Ein Browser stellt eine
> _authentifizierte_ (Cookies enthaltende) Cross-Origin-Antwort nicht bereit,
> sofern der Server nicht `Access-Control-Allow-Credentials: true` sendet.
> OmniRoutes gemeinsamer CORS-Pfad tut dies niemals.

Das bedeutet für die einzelnen Oberflächen selbst bei `CORS_ALLOW_ALL=true`:

| Oberfläche                                | Authentifizierungsmechanismus | Auswirkung von Wildcard-CORS                                                                                                                                                                                                                                                 |
| ----------------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard / MANAGEMENT `/api/*`           | Cookie-Sitzung                | Der Ursprung wird zurückgegeben, aber **ohne `Allow-Credentials` blockiert** der Browser das **authentifizierte Lesen**. Eine bösartige Cross-Origin-Website **kann Ihre authentifizierten Dashboard-Antworten nicht lesen**, und das Sitzungscookie wird nicht offengelegt. |
| Client-API `/v1/*`, `/v1beta/*`           | Bearer- / `x-api-key`-Header  | Bereits **absichtlich** freizügig (`relaxForTokenAuth`): Browser hängen `Authorization`/`x-api-key` niemals automatisch an, sodass die Seite eines Angreifers Ihren Schlüssel nicht bereitstellen kann. `CORS_ALLOW_ALL` erweitert diesen Zugriff nicht.                     |
| Öffentlich, nur lesbar (`/api/health`, …) | Keine                         | Nicht sensibel; ein Platzhalter ist unbedenklich.                                                                                                                                                                                                                            |

Die **verbleibende** Offenlegung durch `CORS_ALLOW_ALL=true` beschränkt sich
somit auf: (a) nicht authentifizierte Cross-Origin-**Lesezugriffe** auf bereits
ohne Authentifizierung zugängliche Daten und (b) das Bestehen der
CORS-**Preflight-Prüfung** für Management-Routen — die weiterhin eine
Authentifizierung erfordern, welche eine Cross-Origin-Seite nicht bereitstellen
kann. Im gemeinsamen CORS-Pfad handelt es sich **nicht** um einen Angriffsvektor
für Sitzungsübernahmen oder den Diebstahl von Zugangsdaten.

### Eine echte Ausnahme — `/api/v1/agents/`

Die Cloud-Agent-Routen
(`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) setzen ihre **eigenen**
CORS-Header (`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) und geben
**tatsächlich** `Access-Control-Allow-Origin: <origin>|*` zusammen mit
`Access-Control-Allow-Credentials: true` aus. Dies ist die einzige Oberfläche,
auf der die Rückgabe des Ursprungs und die Übermittlung von Anmeldedaten
zusammentreffen, und sie ist **unabhängig von `CORS_ALLOW_ALL`**. Diese Routen
sind per Management-Authentifizierung geschützt (`requireManagementAuth`);
Betreiber, die das Dashboard außerhalb des Hosts verfügbar machen, sollten sich
bewusst sein, dass dies die einzige Stelle ist, an der die Antwort-Header einen
authentifizierten Cross-Origin-Lesezugriff zulassen. Die Einschränkung auf eine
explizite Positivliste wird unabhängig von diesen CORS-Leitlinien nachverfolgt.

## Checkliste für die Produktion

- **Setzen Sie `CORS_ALLOW_ALL=true` niemals in der Produktion.** Lassen Sie die Variable ungesetzt.
- Legen Sie eine **explizite** Liste der Ursprünge fest — entweder über die Umgebungsvariable oder das Feld auf der Registerkarte „Security“:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Wenn OmniRoute hinter einem Reverse-Proxy/Tunnel (nginx, Caddy, Cloudflare
  Tunnel, Tailscale) ausgeführt wird, ist CORS **nicht** Ihr einziger Schutzmechanismus — der Loopback-Routenschutz
  schützt weiterhin Routen, die Prozesse starten können (siehe
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Fälschen Sie nicht
  `X-Forwarded-For: 127.0.0.1`, um einen 403-Fehler zu „beheben“; dadurch wird die RCE-Schwachstellenklasse wieder geöffnet, die
  der Routenschutz verhindert.
- Überprüfen Sie den Laufzeitstatus: Das Dashboard zeigt ein **dauerhaftes gelbes Banner**
  unter Dashboard → Security → Authorization Inventory an, solange
  `CORS_ALLOW_ALL=true` aktiv ist, und `/api/settings/authz-inventory` gibt eine
  `cors: { allowAll, allowedOrigins }`-Hülle zurück, die Überwachungswerkzeuge abfragen können.

## Komfort bei der Entwicklung — bestimmte lokale Ursprünge zulassen

Selbst in der Entwicklung benötigen Sie den Platzhalter nur selten. Lassen Sie ausschließlich die verwendeten Entwicklungsserver zu:

```bash
# Vite- (5173) und Next.js-Entwicklungsserver (3000), die ein lokales OmniRoute aufrufen
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Bei Ursprüngen wird die Groß-/Kleinschreibung nicht beachtet und der abschließende Schrägstrich ignoriert, sodass
`http://localhost:3000` und `http://localhost:3000/` gleichwertig sind. Dieselbe CSV-Liste
kann zur Laufzeit unter **Dashboard → Security → CORS Allowed Origins** festgelegt werden, ohne dass ein
Neustart erforderlich ist.

## API-Schlüssel im Vergleich zu Cookie-Sitzungen

- **Bearer / `x-api-key` (die `/v1/*`-Inferenzschnittstelle):** Browser hängen
  diese niemals automatisch an. CORS stellt hier keine wirksame Barriere dar — der API-Schlüssel ist die
  Barriere. Deshalb ist diese Schnittstelle bewusst permissiv konfiguriert, damit Browser- und
  Electron-Clients Antworten lesen können, zu deren Zugriff sie bereits berechtigt sind.
- **Cookie-Sitzung (das Dashboard):** geschützt durch die standardmäßig geschlossene Konfiguration **und**
  durch das Fehlen von `Access-Control-Allow-Credentials` im gemeinsam genutzten Pfad. Nehmen Sie
  Ursprünge für Verwaltung und Dashboard nicht in eine permissive Konfiguration auf; sie müssen weiterhin strikt
  standardmäßig gesperrt bleiben.

## Beispiel: Reverse-Proxy vor OmniRoute

CORS wird von OmniRoute selbst durchgesetzt. Daher sollte der Proxy im Allgemeinen **keine**
`Access-Control-*`-Header hinzufügen oder umschreiben (doppelte Header verursachen Fehler in Browsern). Terminieren Sie TLS
und leiten Sie die Anfragen weiter — lassen Sie OmniRoute die Preflight-Anfrage beantworten:

```nginx
# nginx — an OmniRoute weiterleiten; hier KEINE Access-Control-*-Header einfügen
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # X-Forwarded-For NICHT auf 127.0.0.1 setzen — dadurch wird der Loopback-Routenschutz umgangen.
}
```

Legen Sie die zulässigen Browser-Ursprünge in OmniRoute (`CORS_ALLOWED_ORIGINS` oder auf der
Registerkarte „Security“) fest, nicht im Proxy.

## Quelldateien

| Aspekt                                                 | Datei                                                                |
| ------------------------------------------------------ | -------------------------------------------------------------------- |
| Auflösung der Zulassungsliste + `getCorsStatus()`      | `src/server/cors/origins.ts`                                         |
| Middleware-Anwendung (einzige maßgebliche Quelle)      | `src/server/authz/pipeline.ts`                                       |
| Einstellungen → Einbindung der Ursprünge zur Laufzeit  | `src/lib/config/runtimeSettings.ts`                                  |
| Laufzeitstatus für das Dashboard                       | `src/app/api/settings/authz-inventory/route.ts`                      |
| Warnbanner im Dashboard                                | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Feld „CORS Allowed Origins“                            | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Routenspezifisches CORS des Cloud-Agent (die Ausnahme) | `src/lib/cloudAgent/api.ts`                                          |

## Siehe auch

- [Stufen für Route Guards](./ROUTE_GUARD_TIERS.md) — Loopback-Erzwingung für
  spawn-fähige Routen (eine separate, ergänzende Kontrolle).
- [Autorisierungsleitfaden](../architecture/AUTHZ_GUIDE.md) — die vollständige Authentifizierungs- und Autorisierungspipeline.
