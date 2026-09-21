# Public Credentials Handling (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Maßgebliche Quelle:** `open-sse/utils/publicCreds.ts`
> **Tests:** `tests/unit/publicCreds.test.ts`
> **Zuletzt aktualisiert:** 2026-08-07 — v3.8.50
> **Zielgruppe:** Entwickler, die Anbieter integrieren, deren öffentliche CLIs OAuth client_id / client_secret / Firebase Web API-Schlüssel enthalten.
> **Status:** **VERPFLICHTEND** für sämtlichen neuen Code, der Identifikatoren von Upstream-Anbietern einbettet.

## Warum dies existiert

- [OAuth 2.0 für native Apps (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — OAuth client_id / client_secret für installierte Apps sind öffentlich; PKCE stellt die eigentliche Sicherheit bereit.
- [Firebase-API-Schlüssel](https://firebase.google.com/docs/projects/api-keys) — Webclient-Identifikatoren sind grundsätzlich öffentlich.

OmniRoute muss diese Werte einbetten, damit Benutzer, die keine `.env` konfigurieren, dennoch standardmäßig einen funktionierenden OAuth-Ablauf erhalten. Ohne eingebetteten Fallback funktionieren die Gemini- / Antigravity-Anbieter nicht mehr für Benutzer, die nach dem Prinzip „einfach klonen und ausführen“ vorgehen.

Literale Werte wie `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` werden jedoch von **GitHub Secret Scanning**, **Semgrep** und ähnlichen Muster-Scannern erkannt. Jede Veröffentlichung führt zu einer Flut störender Fehlalarme, der Push-Schutz blockiert legitime Commits und Betreiber verlieren das Vertrauen in den Warnungs-Feed.

Der Helper `open-sse/utils/publicCreds.ts` erfüllt beide Anforderungen gleichzeitig:

- Bettet den öffentlichen Identifikator als **XOR-maskierte Bytefolge** ein (kein Scanner-Muster im Quellcode).
- Dekodiert ihn zur Laufzeit über `decodePublicCred` / `resolvePublicCred`.
- Erkennt Rohwerte, die bereits bekannten Präfixen folgen (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`), und reicht sie unverändert durch, sodass Benutzer mit Rohwerten in ihrer bestehenden `.env` **ohne jegliche Migration** weiterarbeiten können.

Dies ist **Verschleierung, keine Verschlüsselung.** Jeder, der den Quellcode liest, kann den Wert wiederherstellen — was unproblematisch ist, da der Wert grundsätzlich öffentlich ist. Das einzige Ziel besteht darin, Treffer durch Scanner-RegEx zu vermeiden.

## Das verbindliche Muster

### 1. Hinzufügen neuer öffentlicher Zugangsdaten

Wenn ein neuer, vom Upstream-Anbieter bereitgestellter Wert eingebettet werden muss, der:

- aus einer öffentlichen CLI / Desktop-App / einem Browser-Bundle stammt, **und**
- vom Upstream-Anbieter als öffentlicher Client-Identifikator dokumentiert (oder behandelt) wird, **und**
- andernfalls von einem Muster-Scanner erkannt würde (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com` usw.),

…befolgen Sie diese Checkliste:

1. Generieren Sie die maskierte Bytefolge:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Fügen Sie `EMBEDDED_DEFAULTS` in `open-sse/utils/publicCreds.ts` einen neuen Eintrag mit einem **neutralen Schlüsselnamen** (`<provider>_id`, `<provider>_alt`, `<provider>_fb` usw.) hinzu. Verwenden Sie im Helper **keine** Namen wie `client_secret` oder `api_key` — diese Begriffe lösen generische Geheimnisregeln von Semgrep aus.

3. Fügen Sie der öffentlichen Typ-Union ein `keyof typeof EMBEDDED_DEFAULTS` hinzu (es wird automatisch abgeleitet).

4. Ersetzen Sie im verwendenden Code das hartcodierte Literal durch:

   ```ts
   // einzelne Umgebungsvariablen-Überschreibung
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // mehrere Umgebungsvariablen-Aliasse (der erste nicht leere Wert gewinnt)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // keine Umgebungsvariablen-Überschreibung (immer der eingebettete Standardwert)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Entfernen Sie das Literal aus `.env.example` (ersetzen Sie es durch reine Kommentar-Dokumentation, die Leser hierher verweist):

   ```dotenv
   # ── Anbieter (Google / Firebase / usw.) ──
   # Öffentliche OAuth-Zugangsdaten sind über
   # open-sse/utils/publicCreds.ts in den Code eingebettet. Setzen Sie diese Variablen nur, um Ihre eigenen zu verwenden.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Aktualisieren Sie `tests/unit/publicCreds.test.ts`, um eine Struktur-Assertion für den neuen Schlüssel hinzuzufügen (überprüfen Sie das Format, nicht den literalen Wert — das Muster finden Sie in den vorhandenen Tests).

7. Fügen Sie **niemals** Literale der Form `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` zu Testdateien hinzu. Verwenden Sie die aus `.join("")`-Fragmenten zusammengesetzten `FAKE_*`-Konstanten (siehe vorhandene Tests).

### 2. Verwendender Code

- **Lesen Sie ausschließlich über `resolvePublicCred()` / `resolvePublicCredMulti()`** — rufen Sie `decodePublicCredBytes()` außerhalb des Helpers niemals direkt auf.
- Der Helper ist absichtlich ressourcenschonend (lineares Byte-XOR) und kann sicher beim Laden eines Moduls aufgerufen werden; Standardwerte werden einmal berechnet.
- Die Umgebungsvariablen-Überschreibung hat stets Vorrang. Wenn ein Benutzer `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown` setzt, reicht der Helper diesen Rohwert unverändert durch.

### 3. Verbotene Muster

❌ Führen Sie im Produktionscode (`src/`, `open-sse/`, `electron/`, `bin/`) **niemals** einen der folgenden Schritte aus:

```ts
// SCHLECHT: Literaler Wert löst Secret Scanning und Semgrep aus
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// SCHLECHT: Base64 des Literals — GitHub erkennt dies seit Feb/2025 ebenfalls
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// SCHLECHT: Zeichenkettenverkettung, die das Muster zur Laufzeit wieder zusammensetzt
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// SCHLECHT: Hex-/ROT13-Codierung — andere Verschleierung, gleiches Erkennungsrisiko
clientSecret: hexDecode("474f4353..."),
```

All diese Varianten lösen früher oder später einen Scanner aus. Verwenden Sie `resolvePublicCred()`.

❌ Fügen Sie `.env.example` **niemals** literale Zugangsdaten hinzu. Benutzer, die echte Upstream-Werte benötigen, können diese selbst aus der öffentlichen CLI extrahieren oder ihre eigene OAuth-Registrierung verwenden.

❌ Verwerfen Sie eine neue Secret-Scanning-Warnung **niemals**, ohne zuvor zu prüfen, ob die Zugangsdaten in diesen Helper verschoben werden sollten.

## Zugehörige Kontrollen

- `RAW_VALUE_PATTERN` in `publicCreds.ts` führt die Präfixe auf, die eine unveränderte Weitergabe auslösen (Abwärtskompatibilität). Erweitern Sie es ausschließlich für dokumentierte öffentliche Anmeldedatenformate, niemals für proprietäre Geheimnisse.
- `.env.example` wird im CI-Skript `check-env-doc-sync` berücksichtigt — wenn Sie hier eine Variable entfernen, stellen Sie sicher, dass die Dokumentation entsprechend angepasst wird.
- Sowohl die Testsuiten `npm run test:vitest` als auch `node --import tsx/esm --test tests/unit/publicCreds.test.ts` müssen weiterhin erfolgreich durchlaufen.

## Wann dieser Helper NICHT verwendet werden darf

Dieser Helper ist **ausschließlich** für Anmeldedaten vorgesehen, die:

1. Vom ursprünglichen Anbieter öffentlich bereitgestellt werden (CLI-Binärdatei, Browser-Bundle, offizielle Dokumentation).
2. Dokumentiert oder nachdrücklich als nicht vertraulich ausgewiesen sind (PKCE-geschützt, Firebase-Webschlüssel oder Ähnliches).

Verwenden Sie für alles andere — vom Betreiber ausgegebene Token, mandantenspezifische Geheimnisse, den `client_secret` Ihrer eigenen OAuth-App, Verschlüsselungsschlüssel, JWT-Geheimnisse, Datenbankpasswörter — **ausschließlich Umgebungsvariablen** (`process.env.FOO`, mit `||`-Fallback auf eine leere Zeichenfolge bzw. einen expliziten Fehler). Diese gehören in `.env` und den [verschlüsselten Anmeldedatenspeicher](./COMPLIANCE.md), nicht in den Quellcode.

## Referenzen

- [Google: OAuth 2.0 für native Apps](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: API-Schlüssel zur Client-Identifizierung](https://firebase.google.com/docs/projects/api-keys)
- [Von GitHub Secret Scanning unterstützte Geheimnisse](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: Base64-Erkennung für Token (Februar 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Commit, mit dem dieser Helper eingeführt wurde: `1a39c31f` — _fix(security): öffentliche Upstream-Anmeldedaten maskieren + Fehlerbereinigung zentralisieren_
