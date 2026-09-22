# Kiro Setup Guide (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/KIRO_SETUP.md) · 🇪🇹 [am](../../../am/docs/guides/KIRO_SETUP.md) · 🇸🇦 [ar](../../../ar/docs/guides/KIRO_SETUP.md) · 🇦🇿 [az](../../../az/docs/guides/KIRO_SETUP.md) · 🇧🇬 [bg](../../../bg/docs/guides/KIRO_SETUP.md) · 🇧🇩 [bn](../../../bn/docs/guides/KIRO_SETUP.md) · 🇨🇿 [cs](../../../cs/docs/guides/KIRO_SETUP.md) · 🇩🇰 [da](../../../da/docs/guides/KIRO_SETUP.md) · 🇬🇷 [el](../../../el/docs/guides/KIRO_SETUP.md) · 🇪🇸 [es](../../../es/docs/guides/KIRO_SETUP.md) · 🇪🇪 [et](../../../et/docs/guides/KIRO_SETUP.md) · 🇮🇷 [fa](../../../fa/docs/guides/KIRO_SETUP.md) · 🇫🇮 [fi](../../../fi/docs/guides/KIRO_SETUP.md) · 🇫🇷 [fr](../../../fr/docs/guides/KIRO_SETUP.md) · 🇮🇪 [ga](../../../ga/docs/guides/KIRO_SETUP.md) · 🇮🇳 [gu](../../../gu/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ha](../../../ha/docs/guides/KIRO_SETUP.md) · 🇮🇱 [he](../../../he/docs/guides/KIRO_SETUP.md) · 🇮🇳 [hi](../../../hi/docs/guides/KIRO_SETUP.md) · 🇭🇷 [hr](../../../hr/docs/guides/KIRO_SETUP.md) · 🇭🇺 [hu](../../../hu/docs/guides/KIRO_SETUP.md) · 🇦🇲 [hy](../../../hy/docs/guides/KIRO_SETUP.md) · 🇮🇩 [id](../../../id/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ig](../../../ig/docs/guides/KIRO_SETUP.md) · 🇮🇹 [it](../../../it/docs/guides/KIRO_SETUP.md) · 🇯🇵 [ja](../../../ja/docs/guides/KIRO_SETUP.md) · 🇬🇪 [ka](../../../ka/docs/guides/KIRO_SETUP.md) · 🇰🇭 [km](../../../km/docs/guides/KIRO_SETUP.md) · 🇮🇳 [kn](../../../kn/docs/guides/KIRO_SETUP.md) · 🇰🇷 [ko](../../../ko/docs/guides/KIRO_SETUP.md) · 🇱🇹 [lt](../../../lt/docs/guides/KIRO_SETUP.md) · 🇱🇻 [lv](../../../lv/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ml](../../../ml/docs/guides/KIRO_SETUP.md) · 🇮🇳 [mr](../../../mr/docs/guides/KIRO_SETUP.md) · 🇲🇾 [ms](../../../ms/docs/guides/KIRO_SETUP.md) · 🇲🇹 [mt](../../../mt/docs/guides/KIRO_SETUP.md) · 🇲🇲 [my](../../../my/docs/guides/KIRO_SETUP.md) · 🇳🇵 [ne](../../../ne/docs/guides/KIRO_SETUP.md) · 🇳🇱 [nl](../../../nl/docs/guides/KIRO_SETUP.md) · 🇳🇴 [no](../../../no/docs/guides/KIRO_SETUP.md) · 🇮🇳 [or](../../../or/docs/guides/KIRO_SETUP.md) · 🇮🇳 [pa](../../../pa/docs/guides/KIRO_SETUP.md) · 🇵🇭 [phi](../../../phi/docs/guides/KIRO_SETUP.md) · 🇵🇱 [pl](../../../pl/docs/guides/KIRO_SETUP.md) · 🇵🇹 [pt](../../../pt/docs/guides/KIRO_SETUP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/KIRO_SETUP.md) · 🇷🇴 [ro](../../../ro/docs/guides/KIRO_SETUP.md) · 🇷🇺 [ru](../../../ru/docs/guides/KIRO_SETUP.md) · 🇱🇰 [si](../../../si/docs/guides/KIRO_SETUP.md) · 🇸🇰 [sk](../../../sk/docs/guides/KIRO_SETUP.md) · 🇸🇮 [sl](../../../sl/docs/guides/KIRO_SETUP.md) · 🇷🇸 [sr](../../../sr/docs/guides/KIRO_SETUP.md) · 🇸🇪 [sv](../../../sv/docs/guides/KIRO_SETUP.md) · 🇰🇪 [sw](../../../sw/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ta](../../../ta/docs/guides/KIRO_SETUP.md) · 🇮🇳 [te](../../../te/docs/guides/KIRO_SETUP.md) · 🇹🇭 [th](../../../th/docs/guides/KIRO_SETUP.md) · 🇹🇷 [tr](../../../tr/docs/guides/KIRO_SETUP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/KIRO_SETUP.md) · 🇵🇰 [ur](../../../ur/docs/guides/KIRO_SETUP.md) · 🇺🇿 [uz](../../../uz/docs/guides/KIRO_SETUP.md) · 🇻🇳 [vi](../../../vi/docs/guides/KIRO_SETUP.md) · 🇳🇬 [yo](../../../yo/docs/guides/KIRO_SETUP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/KIRO_SETUP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/KIRO_SETUP.md)

---

Dieser Leitfaden beschreibt, wie Kiro-Konten (ein von AWS gehosteter KI-Programmierassistent) zu OmniRoute hinzugefügt werden,
wobei der Schwerpunkt auf dem gleichzeitigen Betrieb mehrerer Konten ohne Sitzungskonflikte liegt.

---

## Hintergrund: Warum Kiro-Konten in Konflikt geraten können

Das Backend von Kiro verwendet AWS SSO OIDC-Clientregistrierungen, um aktive Sitzungen zu verfolgen.
Die entscheidende Einschränkung: **Jede OIDC-Clientregistrierung unterstützt jeweils nur eine aktive
Sitzung**. Wenn sich ein zweites Gerät oder ein zweiter Benutzer mit demselben
registrierten Client authentifiziert, macht das Backend das Aktualisierungstoken des ersten Kontos ungültig.

Dies ist derselbe Mechanismus, der Probleme verursacht, wenn `kiro-cli login` auf einem
Computer ausgeführt wird, auf dem bereits ein anderes Kiro-Konto angemeldet ist — die neue Anmeldung widerruft das
Token des ersten Kontos.

---

## Wie OmniRoute dieses Problem löst (v3.8.0+)

Seit v3.8.0 ruft OmniRoute bei jedem
Import einer Kiro-Verbindung `registerClient()` (AWS SSO OIDC) auf. Dadurch erhält jede OmniRoute-Verbindung ihre eigene dedizierte OIDC-Clientregistrierung. Da jede Clientregistrierung unabhängig ist, wirkt sich die Aktualisierung oder
erneute Authentifizierung eines Kontos nicht auf das Aktualisierungstoken eines anderen Kontos aus.

Die Isolierung gilt für die Importmethoden mit Aktualisierungstoken, während die Authentifizierung per API-Schlüssel
OIDC-Aktualisierungssitzungen vollständig vermeidet:

| Importmethode                                                 | Isolierungsstatus                                                                                                |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| AWS Builder ID-/IDC-Gerätecode-Ablauf                         | Seit der Einführung des Gerätecode-Ablaufs isoliert                                                              |
| **Token importieren** (Aktualisierungstoken manuell einfügen) | Seit v3.8.0 isoliert                                                                                             |
| **Soziale Anmeldung über Google/GitHub**                      | Seit v3.8.0 isoliert                                                                                             |
| **Automatischer Import** (kiro-cli SQLite)                    | Seit v3.8.0 isoliert (der SQLite-Pfad war bereits isoliert; der SSO-Cache-Fallback ist jetzt ebenfalls isoliert) |
| **API-Schlüssel** (langlebiger CodeWhisperer-Schlüssel)       | Keine Aktualisierungssitzung; der Schlüssel wird validiert und als Bearer-Anmeldedaten gespeichert               |

---

## Migrationshinweis für vor v3.8.0 erstellte Verbindungen

Verbindungen, die vor v3.8.0 importiert wurden, verfügen über keine dedizierte OIDC-Clientregistrierung,
die in `providerSpecificData` gespeichert ist. Diese Verbindungen funktionieren weiterhin, verwenden jedoch den gemeinsam genutzten
Aktualisierungsendpunkt für die soziale Authentifizierung. Das bedeutet, dass zwei solcher Verbindungen sich weiterhin
gegenseitig ungültig machen können.

**So erreichen Sie eine Isolierung:** Löschen Sie die alte Verbindung unter **Dashboard → Anbieter** und
importieren Sie sie mit einem der unterstützten Importabläufe erneut. Alle neu erstellten Verbindungen
erhalten automatisch eine eigene Clientregistrierung.

---

## Zwei Kiro-Konten parallel hinzufügen

### Voraussetzungen

- OmniRoute v3.8.0 oder höher.
- Ein funktionsfähiges Kiro-Konto (E-Mail-Adresse + Passwort oder Anmeldung über Google oder GitHub).
- Optional ein zweites Kiro-Konto.

### Schritt 1: Das erste Konto importieren

1. Öffnen Sie **Dashboard → Anbieter → Anbieter hinzufügen → Kiro**.
2. Wählen Sie eine der folgenden Optionen:
   - **Token importieren** — fügen Sie ein Aktualisierungstoken ein, das mit `aorAAAAAG` beginnt.
   - **API-Schlüssel** — fügen Sie einen langlebigen Kiro-/CodeWhisperer-API-Schlüssel ein.
   - **Anmeldung über Google/GitHub** — schließen Sie den OAuth-Ablauf im Browser ab.
   - **Automatischer Import** — klicken Sie auf die Schaltfläche; OmniRoute liest die Anmeldedaten aus der
     lokalen kiro-cli-Datenbank oder aus `~/.aws/sso/cache`.
3. Die Verbindung wird gespeichert. Bei Abläufen mit Aktualisierungstoken wird automatisch ein dedizierter
   OIDC-Client registriert. Bei Abläufen mit API-Schlüssel wird der Schlüssel von AWS validiert und kein Aktualisierungstoken gespeichert.

### Schritt 2: Das zweite Konto importieren

Wiederholen Sie Schritt 1 für das zweite Konto. Da jeder Import eine separate OIDC-Clientregistrierung erstellt,
sind die beiden Verbindungen vollständig voneinander isoliert.

### Schritt 3: Überprüfen, ob beide Verbindungen aktiv sind

1. **Dashboard → Anbieter** — beide Kiro-Verbindungen sollten den Status **Aktiv** anzeigen.
2. **Dashboard → Zustand** — beide Verbindungen sollten ihre Token-Zustandsprüfung bestehen.

### Schritt 4: Mit einer Kombination zwischen Konten weiterleiten

Erstellen Sie eine Kombination mit beiden Verbindungen als Ziele, um die Last zwischen ihnen zu verteilen oder bei einem Ausfall auf die jeweils andere auszuweichen:

```
kiro/kiro-dev → kiro/kiro-pro
```

Informationen zur Konfiguration von Kombinationen finden Sie unter [FEATURES.md](./FEATURES.md) und in der Routing-Dokumentation.

---

## Enterprise-/IDC-Benutzer

Verwenden Sie für AWS-IAM-Identity-Center-Konten (IDC) den Ablauf mit **AWS Builder ID-/IDC-Gerätecode**
unter **Dashboard → Anbieter → Kiro → Gerätecode**. Der Gerätecode-Ablauf war
schon immer vollständig isoliert. Für diese Verbindungen ist kein erneuter Import erforderlich.

Enterprise-Benutzer, die eine andere als die standardmäßige AWS-Region verwenden, können die Region
beim Import über die Import-Token-API angeben:

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

Wenn das Feld `region` ausgelassen wird, lautet der Standardwert `us-east-1`.

---

## API-Schlüssel-Importablauf

Die API-Schlüssel-Authentifizierung ist für langlebige Kiro-/AWS-CodeWhisperer-Bearer-Anmeldedaten vorgesehen. Sie
verwendet keine OAuth-Aktualisierung und vermeidet dadurch die Invalidierung gemeinsam genutzter OIDC-Sitzungen.

### Dashboard

1. Öffnen Sie **Dashboard -> Anbieter -> Kiro**.
2. Wählen Sie **API-Schlüssel**.
3. Fügen Sie den API-Schlüssel und optional die AWS-Region ein (standardmäßig `us-east-1`).
4. OmniRoute validiert den Schlüssel und speichert die Verbindung.

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### Interner Vertrag

Die API-Route validiert den Schlüssel durch den Aufruf von `KiroService.validateApiKey()`. Dabei wird
`ListAvailableProfiles` für den zur Region passenden CodeWhisperer-/Amazon-Q-
Endpunkt verwendet und ein `profileArn` aufgelöst.

Die gespeicherte Verbindung verwendet:

```json
{
  "authType": "apikey",
  "providerSpecificData": {
    "authMethod": "api_key",
    "region": "us-east-1",
    "profileArn": "arn:aws:codewhisperer:..."
  }
}
```

Zur Laufzeit sendet `KiroExecutor.buildHeaders()` den Schlüssel als
`Authorization: Bearer <key>` und fügt `tokentype: API_KEY` hinzu. Kontingent-/Profilaufrufe
verwenden dieselbe Kennzeichnung, damit AWS den Bearer als langlebigen API-Schlüssel und nicht
als OIDC- oder Social-Access-Token behandelt.

---

## Ablauf des OIDC-Clients

Öffentliche AWS-SSO-OIDC-Clients laufen üblicherweise nach 90 Tagen ab
(`clientSecretExpiresAt`). OmniRoute speichert diesen Zeitstempel zur Beobachtbarkeit in `providerSpecificData`.
Wenn die Aktualisierung einer Verbindung nach etwa 90 Tagen nicht mehr funktioniert, importieren Sie die
Verbindung erneut, um eine neue OIDC-Client-Registrierung zu erhalten. Die automatische Neuregistrierung bei
Ablauf ist als zukünftige Verbesserung vorgesehen.

API-Schlüssel-Verbindungen haben kein OIDC-Client-Ablaufdatum, da sie nicht
über AWS SSO OIDC aktualisiert werden.

---

## Fehlerbehebung

### Das zweite Konto wird immer wieder abgemeldet

- Überprüfen Sie beide Verbindungen unter **Dashboard → Anbieter** und stellen Sie sicher, dass für jede in
  ihrem Roh-JSON ein `clientId` ungleich null angezeigt wird (über das Info-Symbol sichtbar). Wenn bei einer
  der Verbindungen `clientId` fehlt, wurde sie vor v3.8.0 importiert — importieren Sie sie erneut.

### Import schlägt mit „Tokenvalidierung fehlgeschlagen“ fehl

- Stellen Sie sicher, dass das Aktualisierungstoken mit `aorAAAAAG` beginnt.
- Stellen Sie sicher, dass OmniRoute `https://oidc.us-east-1.amazonaws.com` (oder die konfigurierte
  Region) erreichen kann. Wenn Sie sich hinter einem Unternehmensproxy befinden, legen Sie unter
  **Dashboard → Einstellungen → Proxys** einen Proxy auf Anbieterebene fest.

### API-Schlüssel-Import schlägt fehl

- Vergewissern Sie sich, dass der Schlüssel ein Kiro-/CodeWhisperer-API-Schlüssel und kein Aktualisierungstoken ist.
- Vergewissern Sie sich, dass die AWS-Region zum Schlüssel/Konto passt. `us-east-1` ist die Standardeinstellung.
- Der Schlüssel muss `ListAvailableProfiles` aufrufen können; andernfalls kann OmniRoute das erforderliche
  `profileArn` nicht auflösen.

Informationen zu weiteren Problemen finden Sie in der zentralen Datei [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).
