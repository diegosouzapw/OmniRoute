# Error Message Sanitization (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **Maßgebliche Quelle:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` und die öffentlichen Builder in `open-sse/utils/error.ts`
> **Tests:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **Zuletzt aktualisiert:** 2026-09-02 — v3.8.51
> **Zielgruppe:** Alle Entwickler, die Fehlerantworten bearbeiten (HTTP-Routen, SSE-Streams, Executors, MCP-Handler).
> **Status:** **VERPFLICHTEND** für jeden Codepfad, der eine Fehlermeldung an einen Client zurückgibt.

## Warum dies erforderlich ist

Die CodeQL-Regel `js/stack-trace-exposure` (CWE-209) kennzeichnet jeden Codepfad, bei dem eine aus einer Laufzeitausnahme stammende Fehlermeldung eine HTTP- / SSE-Antwort erreicht, ohne bereinigt worden zu sein. Stacktraces und absolute Dateipfade in Produktionsantworten liefern Angreifern:

- Interne Verzeichnisstrukturen (`/srv/app/src/lib/...`) → Auskundschaftung für weitere Angriffe.
- Aus Stack-Frames abgeleitete Bibliotheks- / Framework-Versionen → gezielte Auswahl von Exploits.
- Vertrauliche Laufzeitwerte, die möglicherweise per String-Interpolation in Fehler eingefügt wurden (DB-Abfragen, Konfigurationswerte).

Der von `open-sse/utils/error.ts` exportierte Helper `sanitizeErrorMessage` entfernt diese Arten von
Offenlegungen:

1. Physische, serialisierte und eindeutig inline enthaltene Endabschnitte von JavaScript-Stack-Frames.
2. Absolute POSIX-, Windows-, UNC- und `file://`-Dateisystempfade, wobei sichere HTTPS-URLs
   und ausdrücklich gekennzeichnete API-Routen erhalten bleiben.
3. Zuweisungen von Anmeldedaten, gängige Tokenformate von Anbietern, PEM-Blöcke privater Schlüssel und Base64-Daten-
   URLs.

Der Sanitizer begrenzt die Eingabelänge und schlägt sicher fehl, wenn ein ausgelöster Wert die String-Konvertierung verweigert.
Die rekursive Bereinigung von vorgelagertem JSON entfernt außerdem unsichere Schlüssel für Anmeldedaten/Pfade, Sitzungsaliase und
Schlüssel zur Prototypsteuerung, bevor eine Antwort serialisiert wird.

## Das verbindliche Muster

### 1. Erstellen einer Fehlerantwort (HTTP- / API-Routen)

Verwende `buildErrorBody()` — die Bereinigung ist integriert:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... Handler-Logik ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

Oder verwende die praktischen Wrapper im selben Modul:

```ts
import {
  errorResponse, // Response-Objekt für einen einzelnen Aufruf
  writeStreamError, // SSE-Writer
  createErrorResult, // Struktur { success: false, status, response, ... }
  unavailableResponse, // fügt Retry-After hinzu
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

Alle diese Funktionen wenden die kanonische öffentliche Fehlergrenze an. `errorResponse`, `writeStreamError` und
`createErrorResult` werden über `buildErrorBody` geleitet; die drei spezialisierten Retry-/Circuit-Helper
projizieren und bereinigen ihren öffentlichen Kontext direkt. **Bei Verwendung dieser Helper musst du
`sanitizeErrorMessage` niemals manuell aufrufen**.

### 2. Benutzerdefinierte Fehlerumschläge (selten)

Wenn du die oben genannten Helper nicht verwenden kannst (z. B. weil die Antwortstruktur durch ein vorgelagertes Protokoll wie Connect-RPC vorgegeben ist), importiere `sanitizeErrorMessage` direkt:

```ts
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const body = JSON.stringify({
  error: {
    message: sanitizeErrorMessage(rawMessage),
    type: "invalid_request_error",
    code: "",
  },
});
```

Dies ist die einzige zulässige Methode, um einen benutzerdefinierten Fehler-Body zusammenzustellen. Siehe `open-sse/executors/cursor.ts::buildErrorResponse` für die Referenzimplementierung.

### 3. Protokollierung vs. Antwort

Vertrauenswürdige interne Ausnahmen dürfen ihre vollständige Meldung und ihren Stack behalten, damit Betreiber Fehler diagnostizieren können. Werte,
die von Anbieter-, Validierungs-, Browsersitzungs- oder an Anmeldedaten angrenzenden Grenzen stammen, müssen
bereinigt werden, bevor sie in Konsolenausgaben, Audit-Metadaten oder persistente Aufrufprotokolle gelangen. Muster:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // nur vertrauenswürdige interne Ausnahme
  return errorResponse(500, getErrorMessage(err)); // bereinigt — wird an den Client gesendet
}
```

Projiziere bei vom Anbieter kontrollierten Fehlern auch den protokollierten Wert:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. Verbotene Muster

❌ **Gib niemals** rohe Ausnahmeausgaben in einem Response-Body zurück:

```ts
// SCHLECHT: Stacktrace und Dateipfade erreichen den Client
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **Implementiere niemals** einen eigenen Splitter für die erste Zeile:

```ts
// SCHLECHT: Entfernt absolute Pfade nicht und kann vom kanonischen Helper abweichen
const safe = String(err).split("\n")[0];
```

❌ **Bereinige niemals** nur in der Route und vergiss dabei den SSE-Pfad. Alles, was in einen Stream schreibt, wird über `writeStreamError` (oder das zugrunde liegende `buildErrorBody`) geleitet.

❌ **Nimm niemals** absichtlich `process.cwd()`, `__filename`, `__dirname` oder aus Umgebungsvariablen abgeleitete Pfade
in Fehlermeldungen auf. Der Sanitizer deckt absolute Pfade als mehrschichtige Schutzmaßnahme ab, aber Aufrufer dürfen
von vornherein keine Meldungen erstellen, die Informationen über die Systemtopologie enthalten.

## Abdeckung in CI

`tests/unit/error-message-sanitization.test.ts` stellt Folgendes sicher:

- Jede Route unter `/api/model-combo-mappings/*` gibt bei 4xx/5xx bereinigte Antwortkörper zurück.
- `sanitizeErrorMessage` entfernt mehrzeilige Stacktraces.
- `sanitizeErrorMessage` ersetzt absolute POSIX- und Windows-Pfade durch `<path>`.
- `sanitizeErrorMessage` verarbeitet Eingaben wie `null`/`undefined`/`Error`-Instanzen sicher.
- `buildErrorBody` legt in seinem Feld `message` niemals Stacktraces offen.

Wenn Sie eine neue Route oder einen neuen Executor hinzufügen, übernehmen Sie das Assertion-Muster aus dieser Datei. Das Coverage-Gate (`npm run test:coverage`) erzwingt ≥60 % Abdeckung bei Anweisungen/Zeilen/Funktionen/Verzweigungen — Fehlerpfade müssen abgedeckt sein.

## Zugehörige Kontrollmechanismen

- `js/stack-trace-exposure`-CodeQL-Warnungen in `.github/security` sollten immer **entweder** mithilfe dieser Hilfsfunktionen behoben **oder** mit einem Kommentar verworfen werden, der auf dieses Dokument verweist.
- Die `pino`-Redaktionskonfiguration (`src/shared/utils/logRedaction.ts`) behandelt vertrauenswürdige strukturierte Protokolle separat. Dieses Dokument behandelt öffentliche Antwortmeldungen und vom Provider kontrollierte Werte, die persistente Aufruf-/Proxy-Protokollgrenzen überschreiten.
- Die Denylist für Upstream-Header (`src/shared/constants/upstreamHeaders.ts`) deckt die Offenlegung von Headern ab — halten Sie beide Dateien aufeinander abgestimmt, wenn Sie ein neues Exfiltrationsrisiko hinzufügen.

## Durchleitung von Upstream-Details

`buildErrorBody` akzeptiert ein optionales drittes Argument `upstreamDetails` (den unverarbeiteten geparsten Antwortkörper des Upstream-Providers). Wenn es angegeben wird, wird es vor der Aufnahme in die Antwort als `upstream_details` durch `sanitizeUpstreamDetails` bereinigt.

Ein optionales viertes Argument `classification`
(`{ type?: string; code?: string; reason?: string }`) akzeptiert eine explizite öffentliche Klassifizierung.
Jedes Feld wird auf das begrenzte Vokabular öffentlicher Bezeichner projiziert. Unsichere, wie Zugangsdaten geformte, Steuerzeichen enthaltende oder überlange Werte fallen auf den vom Status abgeleiteten Typ/Code zurück; ein unsicherer optionaler Grund wird weggelassen. Dreistellige HTTP-Statusbezeichner (`100` bis `599`) bleiben für Provider-Verträge gültig, die den numerischen Upstream-Status als maschinenlesbaren Code offenlegen. Derselbe begrenzte Bereich wird in der lokal erzeugten HTTP-Status-Platzhalterform akzeptiert; beliebige Provider-Zahlen und -Namen bleiben außerhalb des Vokabulars.

Übergeben Sie jede explizite Klassifizierung in diesem vierten Argument. Überschreiben Sie niemals
`body.error.code`, `body.error.type` oder `body.error.reason`, nachdem `buildErrorBody()` zurückgegeben wurde;
eine nachträgliche Mutation umgeht die öffentliche Projektion.

Auf `upstreamDetails` angewendete Bereinigungsregeln:

1. String-Blätter: durch `sanitizeErrorMessage` verarbeiten (entfernt Stacktraces und absolute Pfade).
2. Unsichere Pfad-, Zugangsdaten-, Sitzungsalias- und Prototypsteuerungsschlüssel werden entfernt.
3. Tiefenbegrenzung: Verschachtelungen über 4 Ebenen hinaus werden durch die Zeichenfolge `"[truncated]"` ersetzt.
4. Arrays werden auf 32 Elemente begrenzt.

Nur Aufrufstellen mit einem geparsten Provider-Fehlerantwortkörper sollten `upstreamDetails` übergeben. Interne OmniRoute-Fehler (SSE-Parsingfehler, leere Inhalte, Guardrail-Blockierungen) dürfen es nicht enthalten.

Übergeben Sie KEINE unverarbeiteten Werte aus `err.stack`, `err.message` oder sonstige Zeichenfolgen aus einer Laufzeitausnahme an `upstreamDetails`. Diese müssen weiterhin ohne Upstream-Antwortkörper durch `errorResponse` / `buildErrorBody(code, msg)` verarbeitet werden.

Die selektive Durchleitung von Upstream-4xx-Antworten bewahrt die sichere JSON-Struktur und Formulierung des Providers, die für die automatische Wiederherstellung des Clients erforderlich sind. Es handelt sich jedoch nicht um eine bytegenaue Durchleitung: Die rekursive Bereinigung wird vor der Serialisierung immer ausgeführt. Zyklische, BigInt-enthaltende oder bösartige `toJSON()`-Antwortkörper werden nach dem Fail-Closed-Prinzip abgelehnt und kommen für eine Durchleitung nicht infrage. OCR und Moderation wenden dieselbe Regel an; Nicht-JSON-, leere oder falsch gekennzeichnete Upstream-Antwortkörper werden in die kanonische OmniRoute-JSON-Fehlerhülle umgewandelt.

## Bekannte CodeQL-Einschränkung: Benutzerdefinierte Sanitizer werden nicht erkannt

Die CodeQL-Abfrage [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) verwendet eine feste Positivliste von Sanitizer-Mustern (z. B. direkt eingebettetes `.split("\n")[0]`, `String#replace` mit bestimmten Regex-Formen, Zugriff auf `.message` bei `Error`). Indirekte Aufrufe über eine benutzerdefinierte Hilfsfunktion wie unsere `sanitizeErrorMessage()` werden **nicht** erkannt.

Das bedeutet, dass Aufrufstellen, die nachweislich über dieses Modul bereinigen — beispielsweise `open-sse/utils/error.ts::errorResponse` und `open-sse/executors/cursor.ts::buildErrorResponse` — weiterhin die Warnung auslösen können, obwohl der Code funktional sicher ist. Frühere Verwerfungen: `#224`, `#231` (Mai 2026), beide mit technischer Begründung als `false positive` gekennzeichnet.

**Vorgehen bei einem neuen Auftreten:**

1. Bestätigen, dass die Aufrufstelle die Nachricht tatsächlich durch `sanitizeErrorMessage` / `buildErrorBody` / einen der oben dokumentierten Wrapper leitet (die Aufrufkette vollständig nachvollziehen — nicht auf einen Kommentar vertrauen).
2. Bestätigen, dass `tests/unit/error-message-sanitization.test.ts` den Pfad abdeckt (oder die Abdeckung ergänzen).
3. Die Warnung über `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` unter Verweis auf dieses Dokument verwerfen.
4. **Nicht** „beheben“, indem `.split("\n")[0]` überall direkt eingebettet wird — die Hilfsfunktion ist die zentrale, maßgebliche Implementierung; das Duplizieren des Musters schwächt den Sanitizer (Pfadbereinigung, Längenbegrenzung und Typumwandlung gehen verloren), nur um den Anschein zu erwecken, der Scanner sei zufriedengestellt.

Die Einführung optionaler Funktionen wie der [benutzerdefinierten Sanitizer-Konfiguration `@codeql/javascript-models`](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) von CodeQL ist die langfristige Lösung; sie liegt außerhalb des Umfangs dieses Dokuments.

## Referenzen

- [CWE-209: Offenlegung von Informationen durch eine Fehlermeldung](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Spickzettel zur Fehlerbehandlung](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Commit zur Zentralisierung der Hilfsfunktion: `1a39c31f` — _fix(security): öffentliche Upstream-Zugangsdaten maskieren + Fehlerbereinigung zentralisieren_
