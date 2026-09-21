# AgentRouter Setup Guide (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇰🇷 [ko](../../../ko/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org) ist ein Anthropic-kompatibler Relay-Dienst, der
Claude und andere Modelle weiterverkauft, häufig zu niedrigeren Preisen als die direkte Anthropic-API. Er ist
als direkter Ersatz für `ANTHROPIC_BASE_URL` im offiziellen Claude-Code-Client
konzipiert und akzeptiert daher nur Datenverkehr, der dem Übertragungsformat von Claude Code entspricht
(bestimmter User-Agent, `anthropic-beta`-Flags, Stainless-SDK-Header usw.).

## Schnellstart — den nativen `agentrouter`-Provider verwenden (empfohlen)

Für die meisten Benutzer ist **keine besondere Einrichtung erforderlich**. OmniRoute enthält einen integrierten
`agentrouter`-Provider, in dem das vollständige Übertragungsformat von Claude Code bereits hinterlegt ist (siehe
`open-sse/config/providerRegistry.ts` → `agentrouter`). So verwenden Sie ihn:

1. Öffnen Sie **Dashboard → Provider → Provider hinzufügen**.
2. Wählen Sie **AgentRouter** aus der Liste aus.
3. Fügen Sie Ihren `sk-...`-API-Schlüssel ein und speichern Sie.

Das ist alles — keine Umgebungsvariablen, kein benutzerdefinierter Provider-Typ. Zu den integrierten Modellen
gehören `claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1` und
`deepseek-v3.2`.

Der Rest dieses Leitfadens behandelt den **fortgeschrittenen Weg**: die Verwendung des
Provider-Typs `anthropic-compatible-cc-*`. Verwenden Sie diesen, wenn Sie mehr Kontrolle
über das Übertragungsformat benötigen — beispielsweise beim Herstellen einer Verbindung zu anderen AgentRouter-ähnlichen
Relay-Diensten, die noch nicht in der nativen Provider-Registry enthalten sind, oder wenn Sie
die Basis-URL, den Chat-Pfad oder den Header-Satz überschreiben möchten.

---

## Fortgeschritten: Verbindung über den Claude-Code-kompatiblen Provider-Typ

OmniRoute unterstützt AgentRouter (und ähnliche Relay-Dienste) auch über den
**Claude-Code-kompatiblen** Provider-Typ (`anthropic-compatible-cc-*`), der die
Anthropic Messages API mit dem korrekten Übertragungsformat verwendet. Ein generischer
`openai-compatible-chat`-Provider, der auf `https://agentrouter.org` verweist, funktioniert
**nicht** — die vorgeschaltete WAF lehnt Anfragen ab, die nicht wie Anfragen von Claude
Code aussehen.

---

## Voraussetzungen

- Ein AgentRouter-Konto und ein API-Schlüssel. Neuanmeldungen erhalten über den Affiliate-Link
  in der Projekt-[README](../README.md) kostenloses Guthaben.
- Eine laufende OmniRoute-Instanz, bei der das Feature-Flag `ENABLE_CC_COMPATIBLE_PROVIDER` aktiviert ist
  (siehe unten).

## 1. Den CC-kompatiblen Provider-Typ aktivieren

Der Claude-Code-kompatible Provider-Typ ist durch ein Feature-Flag geschützt, da er
Datenverkehr sendet, der dem offiziellen Claude-Code-Client sehr ähnlich ist. Aktivieren Sie ihn,
indem Sie vor dem Start von OmniRoute eine Umgebungsvariable setzen:

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Docker-Beispiel:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

Nach dem Neustart zeigt das Dashboard zusätzlich zu den vorhandenen OpenAI-kompatiblen und
Anthropic-kompatiblen Abläufen die Option **Claude-Code-kompatiblen Provider hinzufügen** an.

## 2. Den Provider im Dashboard erstellen

1. Öffnen Sie **Dashboard → Provider → Provider hinzufügen**.
2. Wählen Sie **Claude-Code-kompatiblen Provider hinzufügen** (nur sichtbar, wenn das obige Flag gesetzt ist).
3. Füllen Sie die Felder aus:

| Feld      | Wert                                                                    |
| --------- | ----------------------------------------------------------------------- |
| Name      | `AgentRouter` (oder eine beliebige Bezeichnung)                         |
| Präfix    | `agentrouter` (benutzerfreundlicher Alias in Protokollen und Dashboard) |
| Basis-URL | `https://agentrouter.org`                                               |
| Chat-Pfad | `/v1/messages?beta=true` (Standard — unverändert lassen)                |

> Die kanonische Modellkennung verwendet weiterhin die vollständige Provider-Knoten-ID
> (`anthropic-compatible-cc-{uuid}/{model}`). Das **Präfix** ist lediglich ein Anzeigealias,
> der von `src/lib/usage/callLogs.ts` aufgelöst wird, um eine benutzerfreundlichere Protokollausgabe zu ermöglichen.

4. (Optional) Fügen Sie Ihren API-Schlüssel in das Feld **Validieren** ein und klicken Sie auf **Prüfen**, um
   die Verbindung vor dem Speichern zu bestätigen.
5. Klicken Sie auf **Hinzufügen**.

Öffnen Sie nach der Erstellung den Provider und fügen Sie mit Ihrem AgentRouter-API-Schlüssel
(`sk-...`) eine **Verbindung** hinzu. Der `test_status` der Verbindung sollte zu `active` wechseln.

## 3. Über eine Combo oder direkt verwenden

Referenzieren Sie das Modell, indem Sie das Präfix Ihres Providers als Namespace verwenden:

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

Die kanonische Modell-ID `anthropic-compatible-cc-{uuid}/claude-opus-4-6` funktioniert ebenfalls
und wird in der Datenbank und der Combo-Konfiguration angezeigt.

Alternativ können Sie den Provider wie jeden anderen Provider zu einer Combo hinzufügen, um Routing,
Fallback und Kontingente zu verwalten.

---

## Details zum Wire Image

Als Referenz sendet die cc-kompatible Bridge bei jeder Upstream-Anfrage Folgendes
(siehe `open-sse/services/claudeCodeCompatible.ts`):

| Header                                                       | Wert                                                                                                                 |
| ------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `Authorization`                                              | `Bearer <api-key>`                                                                                                   |
| `User-Agent`                                                 | `claude-cli/2.1.258 (external, sdk-cli)`                                                                             |
| `anthropic-version`                                          | `2023-06-01`                                                                                                         |
| `anthropic-beta`                                             | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                                             |
| Verbindungsbezogener Redact-Thinking-Beta-Schalter           | Fügt für Upstreams, die ausdrücklich redigierte Thinking-Streams erfordern, `redact-thinking-2026-02-12` hinzu       |
| Verbindungsbezogener Schalter für zusammengefasstes Thinking | Fügt CC-Compatible-Thinking-Anfragen, für die noch kein Anzeigemodus festgelegt wurde, `display: "summarized"` hinzu |
| `anthropic-dangerous-direct-browser-access`                  | `true`                                                                                                               |
| `x-app`                                                      | `cli`                                                                                                                |
| `X-Stainless-*`                                              | Verschiedene Stainless-SDK-Header (Sprache, Paketversion, Betriebssystem, Architektur usw.)                          |

Dadurch können Anfragen die Upstream-WAF bzw. die Client-Whitelist passieren.

---

## Fehlerbehebung

**`{"error":{"message":"unauthorized client detected, ..."}}`** — Ihre Anfrage
entsprach nicht dem Wire Image von Claude Code. Dies geschieht, wenn der Provider
als `openai-compatible-chat` statt als `anthropic-compatible-cc` konfiguriert ist
oder wenn das Flag `ENABLE_CC_COMPATIBLE_PROVIDER=true` beim Start nicht gesetzt war.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
„Ungültiges Token“. Das Wire Image ist korrekt, aber der API-Schlüssel wird abgelehnt.
Generieren Sie im AgentRouter-Dashboard einen neuen Schlüssel und aktualisieren Sie
die Verbindung.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — Der Moderations-Hook von AgentRouter hat den Inhalt der Anfrage
abgelehnt, oder der Tarif des Schlüssels erlaubt das angeforderte Modell nicht.
Versuchen Sie es mit einem anderen Prompt oder Modell; wenden Sie sich an den
AgentRouter-Support, wenn ein unbedenklicher Prompt wiederholt blockiert wird.

**`[400]: content-blocked` nur bei bestimmten Modellen** — Die meisten
AgentRouter-Tarife erlauben nur eine Teilmenge der Modelle (z. B.
`claude-opus-4-6`). Andere Modell-IDs geben `unauthorized_client_error` zurück,
obwohl der Schlüssel gültig ist. Prüfen Sie im AgentRouter-Dashboard, welche
Modelle Ihr Tarif abdeckt.

**`Invalid JSON response from provider (reset after Ns)` in den omniroute-Logs** —
Der Upstream hat einen Nicht-JSON-Body zurückgegeben (üblicherweise eine
HTML-Fehlerseite der WAF). Dies bedeutet in der Regel, dass die Anfrage das
AgentRouter-Backend nie erreicht hat — prüfen Sie erneut, ob die Provider-ID mit
`anthropic-compatible-cc-` beginnt (beachten Sie den abschließenden Bindestrich —
siehe `CLAUDE_CODE_COMPATIBLE_PREFIX` in `open-sse/services/claudeCodeCompatible.ts`)
und ob das Feature-Flag aktiviert ist.

**`unauthorized client detected` / HTML-Fehlerseite, obwohl bereits ein
AgentRouter-Provider vorhanden ist** — wahrscheinlich verfügen Sie über **mehr als
einen** AgentRouter-Provider und Ihre Anfrage erreicht den falschen. Wenn ein
verbliebener, manuell erstellter `anthropic-compatible-*`-Provider (ohne `cc`) oder
`openai-compatible-chat-*`-Provider mit dem Präfix `agentrouter` erstellt wurde,
kann er die Modell-IDs `agentrouter/<model>` beanspruchen (und Combos können über
die Knoten-ID auf ihn verweisen), sodass der Datenverkehr an diesen Provider
geleitet wird — der einen generischen User-Agent sendet und abgelehnt wird — statt
an den integrierten `agentrouter`-Provider, der bereits das korrekte Wire Image
bereitstellt. Prüfen Sie in den omniroute-Logs, wohin das Modell tatsächlich
aufgelöst wird (das Tag `ROUTING` zeigt
`agentrouter/<model> → <providerId>/<model>`); wenn `<providerId>` nicht
`agentrouter` ist, konsolidieren Sie die Konfiguration auf den nativen Provider:
Lassen Sie Combos auf `agentrouter/<model>` (providerId `agentrouter`) verweisen und
löschen Sie die doppelten kompatiblen Provider. Der native Provider benötigt weder
eine Wire-Image-Konfiguration noch einen `customUserAgent`.

---

## Siehe auch

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Hinweise zur Integration des Claude-Web-Providers
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — Katalog der Provider
  mit kostenlosem Tarif
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — Implementierung der Bildübertragung
