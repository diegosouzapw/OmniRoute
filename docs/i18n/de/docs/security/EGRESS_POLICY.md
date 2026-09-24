# Egress IP Family Policy (IPv4/IPv6) (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇧🇦 [bs](../../../bs/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇸 [es](../../../es/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **Ausgehenden Datenverkehr pro Proxy auf eine einzige IP-Familie festlegen — `auto`, `ipv4` oder `ipv6` —, damit ein reiner IPv6-Egress niemals unbemerkt auf IPv4 zurückfällt.**

> **Maßgebliche Quelle:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

Mit OmniRoute kann jeder Proxy eine **Adressfamilien-Egress-Direktive** enthalten. Standardmäßig wählt das Betriebssystem IPv4 oder IPv6 aus (Dual-Stack, „Happy Eyeballs“). Wenn Sie die Direktive auf `ipv4` oder `ipv6` setzen, legt OmniRoute jede Verbindung über diesen Proxy auf die ausgewählte Familie fest und **bricht sicher ab**, anstatt auf die andere Familie zurückzufallen.

Diese Seite dokumentiert, was die Direktive ist, warum sie existiert, wo Sie sie konfigurieren und wie sie zur Laufzeit aufgelöst wird.

---

## Inhaltsverzeichnis

- [Was sie ist](#what-it-is)
- [Warum sie existiert](#why-it-exists)
- [Die drei Werte](#the-three-values)
- [Konfiguration](#how-to-configure-it)
- [Wie `auto` aufgelöst wird](#how-auto-resolves)
- [Wie `ipv4` / `ipv6` erzwungen werden](#how-ipv4--ipv6-are-enforced)
- [SOCKS5-Kompatibilität](#socks5-compatibility)
- [Fail-Closed-Verhalten](#fail-closed-behavior)
- [Datenmodell](#data-model)
- [Weiterführende Dokumentation](#related-documentation)

---

## Was sie ist

Jeder Proxy in der Registry verfügt über ein `family`-Feld mit drei möglichen Werten, die durch ein Zod-Enum validiert werden:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

Das Feld verwendet standardmäßig `"auto"`, wodurch das bisherige Dual-Stack-Verhalten erhalten bleibt. Wird es auf `ipv4` oder `ipv6` gesetzt, wird die Verbindungsfamilie für diesen Proxy festgelegt.

Die Direktive wird überall durch eine zentrale Hilfsfunktion normalisiert, sodass jeder unbekannte Wert auf `auto` zurückfällt:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## Warum sie existiert

Eingeführt in PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777). Die zugrunde liegenden Probleme:

| Problem                                                    | Was die Direktive behebt                                                                                                                                                                                                                                                                                                                                                       |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **IPv6-only-Egress weicht auf IPv4 aus**                   | Wenn ein Proxy-Host sowohl über A- als auch AAAA-Einträge verfügt (oder das Betriebssystem IPv4 bevorzugt), kann Happy Eyeballs ausgehende Verbindungen über IPv4 herstellen, obwohl ein reiner IPv6-Pfad vorgesehen ist. Durch die Festlegung auf `ipv6` wird dieses Leck verhindert.                                                                                         |
| **Widerruf aufgrund gemeinsam genutzter Egress-Anomalien** | Anbieter mit Rotation (codex/openai) widerrufen Token, wenn viele Konten bei hohem Volumen über **dieselbe** IP-Adresse ausgehenden Datenverkehr senden. Die Steuerung der Egress-Familie trägt dazu bei, Konten auf separaten, vorhersehbaren Egress-Pfaden zu halten (siehe [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) für die zugehörige Egress-IP-Diagnose). |
| **Deterministischer Egress für Compliance/Tests**          | Wenn garantiert werden muss, dass Datenverkehr über eine bestimmte Familie das System verlässt, reicht `auto` nicht aus.                                                                                                                                                                                                                                                       |

Die Direktive gilt bewusst **pro Proxy** und nicht global — verschiedene Proxys in Ihrem Pool können unterschiedliche Richtlinien verwenden.

---

## Die drei Werte

| Wert   | UI-Bezeichnung             | Verhalten                                                                                                                                                                                                        |
| ------ | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto` | `Automatisch (Dual-Stack)` | Das Betriebssystem wählt die Familie aus. Bei einem Proxy-Host als IP-Literal ist die Familie durch das Literal vorgegeben; bei einem Hostnamen kommen beide Familien infrage. Dies ist die Standardeinstellung. |
| `ipv4` | `Nur IPv4`                 | Beschränkt die Verbindung auf IPv4. Schlägt geschlossen fehl, wenn der Proxy-Host keinen IPv4-Datensatz (A) besitzt.                                                                                             |
| `ipv6` | `Nur IPv6`                 | Beschränkt die Verbindung auf IPv6. Schlägt geschlossen fehl, wenn der Proxy-Host keinen IPv6-Datensatz (AAAA) besitzt.                                                                                          |

Die UI-Zeichenfolgen befinden sich in `src/i18n/messages/en.json` (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`).

---

## Konfiguration

### Dashboard

Das Auswahlfeld befindet sich im Proxy-Formular der Registerkarte **Proxy-Pool**:

1. Öffnen Sie **Dashboard → Einstellungen → Proxy → Proxy-Pool**
2. Fügen Sie einen Proxy hinzu oder bearbeiten Sie einen vorhandenen Proxy
3. Stellen Sie im Dropdown-Menü **IP-Familie** `Automatisch (Dual-Stack)`, `Nur IPv4` oder `Nur IPv6` ein
4. Speichern Sie

Das Steuerelement wird von `ProxyRegistryManager.tsx` gerendert (eingebunden in `proxy/ProxyPoolTab.tsx`).

### API

Das Feld `family` ist Teil der Payloads zum Erstellen und Aktualisieren der Proxy-Registry. Es wird durch `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) validiert und von `POST` / `PATCH /api/v1/management/proxies` verarbeitet:

```bash
# Einen reinen IPv6-Proxy erstellen
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# Einen vorhandenen Proxy auf ausschließlich IPv4 umstellen
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

Dasselbe Feld wird auch vom Inline-Proxy-Konfigurationsobjekt akzeptiert, das für Upstream-Proxy-Einträge verwendet wird (`upstream_proxy_config.family`, siehe [Datenmodell](#data-model)).

Informationen zur übrigen CRUD-/Zuweisungs-API für Proxys finden Sie unter [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md).

---

## Wie `auto` aufgelöst wird

Wenn `family` auf `auto` gesetzt ist, hängt OmniRoute **keine** Direktive an — die Proxy-URL wird unverändert verwendet, und die Verbindungsfamilie wird inhärent bestimmt.

Beim Erstellen der URL (`proxyConfigToUrl` / `normalizeProxyUrl` in `open-sse/utils/proxyDispatcher.ts`) ergibt ein `auto`-Proxy eine einfache URL ohne Markierung:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

Beim Dispatch (`resolveDispatcherFamily`) wird `auto` zur inhärenten Familie eines Hosts als IP-Literal oder zu `null` (das Betriebssystem entscheiden lassen) für einen Hostnamen aufgelöst:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // null bei einem Hostnamen → das Betriebssystem wählt
  // ...
}
```

Daher gilt:

- `auto` + Host als IP-Literal (`192.0.2.1` / `[2001:db8::1]`) → Familie dieses Literals.
- `auto` + Hostname → `null` → standardmäßige Dual-Stack-Auflösung durch das Betriebssystem.

---

## Wie `ipv4` / `ipv6` erzwungen werden

Eine Nicht-`auto`-Direktive wird als einzelner synthetischer Query-Marker — `?family=ipv4` oder `?family=ipv6` — übertragen und einmal an die normalisierte Proxy-URL angehängt. `normalizeProxyUrl` entfernt diesen Marker sorgfältig und hängt ihn genau einmal wieder an, sodass die Port-Analyse niemals beeinträchtigt wird.

Beim Erstellen des Dispatchers wird der Marker ausgelesen und in eine konkrete Verbindungsfamilie umgewandelt. Wenn der Host ein IP-Literal der **entgegengesetzten** Familie ist, löst OmniRoute einen Fehler aus (Widersprüche führen zu Fail-Closed):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] Proxy family directive ${directive} contradicts ${literal === 6 ? "IPv6" : "IPv4"} literal host`
  );
}
```

Die konkrete Familie wird anschließend für den Connector fest vorgegeben:

- **HTTP/HTTPS-Proxys** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — deaktiviert Happy Eyeballs, sodass ausschließlich die gewählte Familie für die Verbindung verwendet wird.
- **SOCKS5-Proxys**: Ein benutzerdefinierter Connector übergibt `socket_options: { family, autoSelectFamily: false }` an den SOCKS-Client (siehe [SOCKS5-Kompatibilität](#socks5-kompatibilität)).

---

## SOCKS5-Kompatibilität

Die feste Familienvorgabe funktioniert mit SOCKS5-Proxys, aber das standardmäßige `fetch-socks` stellt die Socket-Optionen nicht bereit, die zum Festlegen der Familie des Proxy-Hops erforderlich sind. OmniRoute enthält dafür einen eigenen Connector:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

Alle SOCKS5-Dispatches laufen unabhängig von `family` über `createSocksDispatcherWithFamily` (einschließlich `null` / `auto` bei einem Hostnamen): `buildSocksFamilySocketOptions(null)` ergibt `{}`, und derselbe Pfad über `SocksClient.createConnection` und den TLS-`buildConnector` wird mit der Festlegung über `socket_options` verwendet, sodass Happy Eyeballs bei einer ausschließlich für IPv6 vorgesehenen Egress-Richtlinie nicht IPv4 auswählen kann.

Die SOCKS5-Unterstützung selbst ist standardmäßig aktiviert (Opt-out über `ENABLE_SOCKS5_PROXY=false`); siehe [PROXY_GUIDE.md → Umgebungsvariablen](../ops/PROXY_GUIDE.md#environment-variables).

---

## Fail-Closed-Verhalten

Der eigentliche Zweck der Direktive besteht darin, eine Verbindung **abzulehnen**, statt stillschweigend auf die falsche Familie zurückzufallen. Zwei Schutzmechanismen erzwingen dies:

1. **Widerspruch bei Literalen** — Eine Direktive, die einem IP-Literal als Host widerspricht, löst beim Erstellen des Dispatchers einen Fehler aus (`resolveDispatcherFamily`, oben dargestellt).

2. **DNS-Prüfung des Hostnamens vorab** — Bei einem Proxy mit Hostnamen und fest vorgegebener Familie prüft `proxyFetch.ts` über `assertHostnameSupportsFamily`, ob der Hostname tatsächlich über einen Eintrag in der erforderlichen Familie verfügt, **bevor** ausgehender Datenverkehr stattfindet:

   ```ts
   // open-sse/utils/proxyFamilyResolve.ts
   const hasFamily = records.some((r) => r.family === family);
   if (!hasFamily) {
     throw new Error(
       `[ProxyFamily] Proxy host ${host} has no ${family === 6 ? "IPv6 (AAAA)" : "IPv4 (A)"} record; ` +
         `refusing ${family === 6 ? "IPv6" : "IPv4"}-only egress (fail-closed)`
     );
   }
   ```

   Bei einem Fehler versieht `proxyFetch.ts` den Fehler mit `code = "PROXY_FAMILY_UNAVAILABLE"` und `statusCode = 503`. Ein Fehler bei der DNS-Auflösung wird ebenfalls als Fail-Closed behandelt (der ausgehende Datenverkehr wird verweigert).

Bei IP-Literalen als Hosts ist die DNS-Vorabprüfung wirkungslos — ihre Familie ist inhärent und erfordert keine Auflösung.

---

## Datenmodell

Die Spalte `family` wurde durch die Migration `099_proxy_family.sql` zu **zwei** Tabellen hinzugefügt:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — die Proxy-spezifische Direktive für Registry-Einträge (`src/lib/db/proxies.ts`). Auflösungsabfragen wählen `family` zusammen mit den anderen Proxy-Spalten aus, und ein fehlender Wert oder ein Wert, der kein String ist, wird in `"auto"` umgewandelt.
- `upstream_proxy_config.family` — die Direktive für Upstream-Proxy-Einträge (`src/lib/db/upstreamProxy.ts`) mit demselben Standardwert `"auto"`.

Wenn ein aufgelöstes Proxy-Objekt einen von `auto` abweichenden `family`-Wert enthält, hängt `proxyConfigToUrl` die Markierung `?family=` an, sodass die Festlegung bis zum Dispatcher erhalten bleibt.

---

## Zugehörige Dokumentation

> 📖 **Zugehörige Dokumentation:**
>
> - [Proxy-Leitfaden](../ops/PROXY_GUIDE.md) — vollständiges Proxy-System: Registry-CRUD, vierstufige Auflösung, Rotation, Zustandsprüfung, API-Referenz
> - `docs/security/STEALTH_GUIDE.md` (git; nicht in `/docs` kompiliert) — TLS-Fingerabdruck- und CLI-Fingerabdruckebenen, die auf dem Proxy aufsetzen
> - [Route-Guard-Stufen](./ROUTE_GUARD_TIERS.md) — Loopback-Durchsetzung für ausschließlich lokale Routen
