# CLI Machine-ID Token (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇸 [es](../../../es/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## Überblick

OmniRoute-CLI-Befehle authentifizieren sich gegenüber der lokalen Verwaltungs-API mit einem
`HMAC-SHA256(machine-id, salt)`-Token, das über den Anfrage-Header
`x-omniroute-cli-token` gesendet wird.

Dadurch können CLI-Unterbefehle (`omniroute status`, `omniroute providers` usw.)
Verwaltungsendpunkte aufrufen, ohne dass der Benutzer bei jedem Aufruf ein JWT
oder Passwort angeben muss.

## Funktionsweise

1. `getMachineTokenSync()` liest die Hardware-Maschinen-ID über `node-machine-id`
   (bei einem Fehler wird auf eine leere Zeichenfolge zurückgegriffen, wodurch die CLI-Authentifizierung deaktiviert wird).
2. Die Funktion berechnet `HMAC-SHA256(machine_id, salt)` und gibt den vollständigen,
   64 Zeichen langen Hex-Digest zurück – ein deterministisches, nicht umkehrbares Token,
   das an diese Maschine gebunden ist.
3. Die CLI sendet das Token nur dann als `x-omniroute-cli-token`, wenn das aufgelöste
   Ziel eine explizite Loopback-URL ist (`localhost`, `127.0.0.0/8` oder
   Loopback-IPv6). Anfragen, die das Token enthalten, verwenden `redirect: error`,
   sodass eine lokale Weiterleitung es nicht an einen anderen Ursprung weitergeben kann.
   Remote-Kontexte verwenden stattdessen bereichsgebundene Zugriffstoken. Wenn die
   Ableitung nicht verfügbar ist, lässt die CLI den Header weg, und `omniroute doctor`
   meldet den Fehler, anstatt ein leeres Token als gültig zu behandeln.
4. Der Server (`src/server/authz/policies/management.ts`) berechnet das erwartete
   Token mit demselben Salt neu und vergleicht es mittels `timingSafeEqual`, um
   eine zeitbasierte Extraktion zu verhindern.

## Sicherheitseigenschaften

| Eigenschaft                                        | Details                                                                                                                                                                                                                                            |
| -------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Nur Loopback**                                   | Wird nur akzeptiert, wenn die vertrauenswürdige Peer-Lokalitätsmarkierung des Servers (abgeleitet von der tatsächlichen TCP-Peer-Adresse) Loopback angibt. Dem clientgesteuerten `Host`-Header wird zur Bestimmung der Lokalität niemals vertraut. |
| **Vergleich mit konstanter Zeit**                  | `crypto.timingSafeEqual` verhindert Timing-Angriffe.                                                                                                                                                                                               |
| **Nicht umkehrbar**                                | Aus der HMAC-Ausgabe kann die Maschinen-ID nicht wiederhergestellt werden.                                                                                                                                                                         |
| **Keine Umgehung von `always`-geschützten Pfaden** | `isAlwaysProtectedPath()` wird vor der Prüfung des CLI-Tokens ausgewertet. `/api/shutdown` und `/api/settings/database` erfordern immer ein JWT.                                                                                                   |
| **Nicht exportierbar**                             | Das Token wird niemals auf die Festplatte geschrieben oder protokolliert.                                                                                                                                                                          |

## Standard-Salt (zufällig pro Installation)

Wenn `OMNIROUTE_CLI_SALT` nicht gesetzt ist, ist das Salt eine zufällige,
64 Zeichen lange Hex-Zeichenfolge, die einmal generiert und unter
`<DATA_DIR>/cli-token-salt.json` (Modus `0600`) gespeichert wird – nicht das
eingecheckte Literal `omniroute-cli-auth-v1`. Sowohl `getActiveSalt()` in
`src/lib/machineToken.ts` als auch dessen Entsprechung in
`bin/cli/utils/cliToken.mjs` lesen dieselbe Datei, sodass der Server und jeder
CLI-Aufruf in dieser Installation denselben Wert verwenden. Das eingecheckte
Literal wird nur als letztmöglicher Rückfallwert genutzt, wenn noch kein
persistiertes oder über die Umgebung bereitgestelltes Salt verfügbar ist
(beispielsweise bei einer neuen reinen CLI-Installation, bevor der Server jemals
ausgeführt wurde). Dadurch wird eine Schwachstelle des alten festen
Standardliterals geschlossen: `/etc/machine-id` ist üblicherweise für alle
Benutzer lesbar, sodass andernfalls jeder lokale Benutzer dasselbe Token für
jede Installation ableiten könnte, in der `OMNIROUTE_CLI_SALT` nie gesetzt wurde.

## Salt-Rotation

Setze `OMNIROUTE_CLI_SALT`, um das abgeleitete Token ohne Codeänderungen zu rotieren — diese Variable hat stets Vorrang vor dem persistenten installationsspezifischen Salt. Nach der Rotation verwenden alle CLI-Prozesse auf diesem Rechner automatisch das neue Token. Dies ist nach einem Leak der Prozessliste nützlich, durch den der zuvor abgeleitete Wert offengelegt worden sein könnte.

```bash
# Persistente Rotation (zum Shell-Profil hinzufügen)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Überprüfen, ob das neue Token verwendet wird
omniroute status
```

## Legacy-Format (SHA-256, 32 Zeichen) — wird weiterhin akzeptiert

Vor dem oben beschriebenen HMAC-Format leitete die CLI ihr Token als
`SHA-256(machineId + salt).hex[0..32]` (ein Präfix mit 32 Zeichen) in
`bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` in `src/lib/machineToken.ts`) ab.

Aus Gründen der Abwärtskompatibilität akzeptiert der Server **beide** Formate: Der Verifizierer erstellt
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` und vergleicht den
eingehenden Header mittels `timingSafeEqual` mit jedem Token
(`src/server/authz/policies/management.ts` und `src/lib/middleware/cliTokenAuth.ts`).
Ein Token ist somit gültig, wenn es **entweder** mit dem 64 Zeichen langen HMAC-Digest oder dem 32 Zeichen langen
Legacy-SHA-256-Präfix übereinstimmt.

**Deaktivierung:** Setze `OMNIROUTE_DISABLE_CLI_TOKEN=true` (als Umgebungsvariable oder in `.env`), um den CLI-Token-Mechanismus vollständig zu deaktivieren. Jeder Zugriff erfordert dann einen expliziten API-Schlüssel. Auf Mehrbenutzersystemen wird dies empfohlen, da `machine-id` gerätebezogen (nicht benutzerbezogen) ist und ein anderer Benutzer auf demselben Host dasselbe Token berechnen könnte.

## Dateien

| Datei                                     | Zweck                                                  |
| ----------------------------------------- | ------------------------------------------------------ |
| `src/lib/machineToken.ts`                 | Token-Ableitung (`getMachineTokenSync`)                |
| `bin/cli/utils/cliToken.mjs`              | CLI-seitige Entsprechung derselben Ableitung           |
| `<DATA_DIR>/cli-token-salt.json`          | Persistentes zufälliges installationsspezifisches Salt |
| `src/server/authz/headers.ts`             | Konstante `CLI_TOKEN_HEADER`                           |
| `src/server/authz/policies/management.ts` | Serverseitige Verifizierung                            |
| `src/server/authz/routeGuard.ts`          | Loopback-Host-Prüfung (`isLoopbackHost`)               |

## Siehe auch

- `docs/security/ROUTE_GUARD_TIERS.md` — Schutzstufen für Routen
- `docs/architecture/AUTHZ_GUIDE.md` — vollständige Autorisierungs-Pipeline
