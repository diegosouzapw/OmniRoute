# Management Authentication (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute verfügt über **vier Anmeldedatenfamilien**, die Verwaltungsrouten autorisieren können.
Sie sind nicht untereinander austauschbar. Inferenz-API-Schlüssel (`sk-…`) verwalten den
Server **nicht**, sofern ihnen nicht ausdrücklich der Geltungsbereich `manage` oder `admin` gewährt wurde.

Kanonische Implementierung: `src/lib/api/requireManagementAuth.ts`.

| Anmeldedaten                      | Typische Form                            | Wo erstellt                                                | Vorgesehene Verwendung         | Verwaltungsberechtigung                                                                                             |
| --------------------------------- | ---------------------------------------- | ---------------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| Dashboard-JWT-Sitzung             | `auth_token`-Cookie                      | Dashboard-Anmeldung                                        | Browseroberfläche              | Vollständige Dashboard-Verwaltung unter Berücksichtigung der Regeln für CSRF, Lokalität und stets geschützte Routen |
| CLI-Machine-ID-Token              | intern / lokal                           | CLI-Bootstrap (`omniroute` auf demselben Rechner)          | Lokale CLI                     | Nur lokale Verwaltung                                                                                               |
| Zugriffstoken mit Geltungsbereich | `oma_live_…`                             | **Einstellungen → Zugriffstoken** oder `omniroute connect` | Remote-CLI und Verwaltungs-API | Muss den für die Route erforderlichen Geltungsbereich `read`, `write` oder `admin` erfüllen                         |
| Inferenz-API-Schlüssel            | `sk-…` (und andere API-Schlüsselpräfixe) | **API-Manager / API-Schlüssel**                            | `/v1/*`-Inferenz               | **Keine**, sofern die Schlüsselmetadaten nicht `manage` oder `admin` enthalten                                      |

`oma_`-Anmeldedaten sind Verwaltungs-/CLI-Anmeldedaten. Sie sind **keine** Inferenz-API-Schlüssel.

Wenn die Anmeldung/API-Schlüssel-Authentifizierung für den Server deaktiviert ist, akzeptieren einige Verwaltungsrouten möglicherweise nicht authentifizierte Aufrufe. Für ausschließlich lokale und stets geschützte Routen gelten weiterhin
deren eigene Regeln. Daher ist die Angabe solcher Anmeldedaten weder universell
erforderlich, noch reicht ihr Besitz ohne den erforderlichen Geltungsbereich und die
entsprechende Routenlokalität immer aus.

Siehe auch: [Remote-Modus](./REMOTE-MODE.md) (wie `oma_live_…` für eine Remote-CLI ausgestellt wird).

---

## Geltungsbereichsmatrizen

Diese beiden Geltungsbereichsvokabulare sind **unterschiedlich**. Vermischen Sie sie nicht.

### Geltungsbereiche für Zugriffstoken (`oma_live_…`)

| Geltungsbereich | Typische Vorgänge                                                                            |
| --------------- | -------------------------------------------------------------------------------------------- |
| `read`          | Listen-/Status-GET-Anfragen, die das Token anzeigen darf                                     |
| `write`         | Änderungen (Erstellen/Aktualisieren/Löschen) unterhalb der Administratorebene                |
| `admin`         | Vollständige Remote-CLI / Verbindungstoken (Passwort-Bootstrap verwendet dies standardmäßig) |

Ein Token mit `read` kann keine `write`-Route aufrufen. Form der Laufzeitmeldung:
`Access token scope '<have>' is insufficient; '<need>' required.`

### Geltungsbereiche für die API-Schlüsselverwaltung

| Geltungsbereich | Bedeutung                                                                                  |
| --------------- | ------------------------------------------------------------------------------------------ |
| (keiner)        | Nur Inferenz. Verwaltungsrouten geben 403 zurück.                                          |
| `manage`        | Verwaltungs-API (dieselbe Prüfung wie der API-Schlüssel-Zweig von `requireManagementAuth`) |
| `admin`         | Erfüllt ebenfalls `hasManageScope` (wird als verwaltungsberechtigt behandelt)              |

Aktivieren Sie `manage` für den Schlüssel in der Benutzeroberfläche „API-Schlüssel / API-Manager“. Verwenden Sie einen
Chat-Client-Schlüssel nicht für die Automatisierung, sofern Sie ihm diesen Geltungsbereich nicht bewusst gewährt haben.

---

## Erstellen und Widerrufen

### Dashboard-JWT-Sitzung

1. Öffnen Sie `/login` und melden Sie sich mit dem Verwaltungspasswort an (`INITIAL_PASSWORD` beim ersten Start).
2. Das Cookie `auth_token` ist HttpOnly. Das Browser-Dashboard verwendet es automatisch.
3. Melden Sie sich über `/api/auth/logout` ab. Es gibt kein langlebiges Geheimnis, das kopiert werden könnte.

### CLI-Machine-ID-Token

1. Führen Sie `omniroute` auf **demselben Host** wie den Server aus (Loopback).
2. Die CLI erstellt ein Machine-ID-Token unter `~/.omniroute/` (chmod 600).
3. Dies funktioniert **nicht** von einem anderen Rechner aus. Verwenden Sie für eine Remote-CLI ein Zugriffstoken.

### Zugriffstoken mit Geltungsbereich (`oma_live_…`)

1. Dashboard: **Einstellungen → Zugriffstoken** → erstellen (Name + Geltungsbereich). **Das Geheimnis wird nur einmal angezeigt.**
2. Oder per CLI: `omniroute connect <host>` (Passwort → Token). Siehe [Remote-Modus](./REMOTE-MODE.md).
3. Header: `Authorization: Bearer oma_live_…`
4. Widerrufen Sie es auf derselben Zugriffstoken-Seite (oder löschen Sie den CLI-Kontext).
5. Der Server speichert nur einen Hash. Behandeln Sie den Klartext wie ein Passwort.

### API-Schlüssel mit `manage`-Geltungsbereich

1. Dashboard: **API-Manager / API-Schlüssel** → einen Schlüssel erstellen oder bearbeiten → `manage` (oder `admin`) aktivieren.
2. Header: `Authorization: Bearer sk-…` (das tatsächliche Präfix des Schlüssels).
3. Widerrufen Sie den Schlüssel oder entfernen Sie `manage` in derselben Benutzeroberfläche.
4. Prinzip der geringsten Rechte für Automatisierungen, bei denen es sich nicht um die CLI handelt: Bevorzugen Sie ein `read`-Zugriffstoken für reine GET-Aufgaben; verwenden Sie `manage` für einen API-Schlüssel nur, wenn der Aufrufer sowohl `/v1` als auch die Verwaltung ansprechen muss.

---

## Header-Format

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

Fügen Sie Verwaltungszugangsdaten nicht in den URL-Pfad oder die Abfragezeichenfolge ein. Die Authentifizierung für die Verwaltung erfolgt ausschließlich per Header/Cookie.

---

## Beispiele zum Kopieren und Einfügen

Schreibgeschützt (Anbieter auflisten). Verwenden Sie ein `read`-Zugriffstoken:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Ändernd (eine Anbieterverbindung erstellen). Verwenden Sie ein `write`-/`admin`-Zugriffstoken oder einen API-Schlüssel mit `manage`-Berechtigungsumfang:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Inferenz (keine Verwaltung). Regulärer API-Schlüssel, kein `manage` erforderlich:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Aktuelle Laufzeitfehler (keine Geheimnisse ausgeben)

| Situation                                                     | Typischer Status | Meldung (bereinigt)                                                  |
| ------------------------------------------------------------- | ---------------- | -------------------------------------------------------------------- |
| Keine Zugangsdaten                                            | 401              | `Authentication required`                                            |
| Ungültiges/abgelaufenes `oma_live_…`                          | 401              | `Invalid or expired access token`                                    |
| Gültiger API-Schlüssel ohne `manage`/`admin`                  | 403              | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Ungültiger regulärer API-Schlüssel auf einer Verwaltungsroute | 403              | `Invalid management token`                                           |
| Berechtigungsumfang des Zugriffstokens zu niedrig             | 403              | `Access token scope '<have>' is insufficient; '<need>' required.`    |

„Invalid management token“ bedeutet, dass das Bearer-Token **nicht** als Verwaltungszugangsdaten akzeptiert wurde. Daraus geht **nicht** hervor, welche Art von Zugangsdaten erstellt werden muss. Verwenden Sie die obige Tabelle: Inferenzschlüssel benötigen den Berechtigungsumfang `manage`; die Remote-CLI benötigt `oma_live_…`; das Dashboard verwendet das Sitzungscookie.

---

## Empfohlene Auswahl nach dem Prinzip der geringsten Rechte

| Aufrufer                                                       | Verwendung                                                       |
| -------------------------------------------------------------- | ---------------------------------------------------------------- |
| Browser                                                        | Dashboard-Sitzung                                                |
| CLI auf dem Serverhost                                         | Maschinentoken                                                   |
| CLI auf einem Laptop, die mit einem Remote-Server kommuniziert | `oma_live_…` aus `omniroute connect`                             |
| CI/Skripte (nur Verwaltung)                                    | `oma_live_…` mit dem kleinsten ausreichenden Berechtigungsumfang |
| CI, die sowohl `/v1` als auch `/api` aufrufen muss             | API-Schlüssel mit `manage` **oder** zwei separate Zugangsdaten   |
