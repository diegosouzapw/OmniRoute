# Comprehensive Guide: Cloudflare Tunnel & Zero Trust (Split-Port) (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇩 [bn](../../bn/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇰 [da](../../da/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇩🇪 [de](../../de/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇪🇸 [es](../../es/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇷 [fa](../../fa/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [gu](../../gu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇱 [he](../../he/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇩 [id](../../id/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇹 [it](../../it/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [mr](../../mr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇳🇴 [no](../../no/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇰🇪 [sw](../../sw/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [ta](../../ta/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇮🇳 [te](../../te/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇭 [th](../../th/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇵🇰 [ur](../../ur/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/CLOUDFLARE_ZERO_TRUST_GUIDE.md)

---

Dieser Leitfaden dokumentiert den Goldstandard der Netzwerkinfrastruktur, um**OmniRoute**zu schützen und Ihre Anwendung sicher dem Internet zugänglich zu machen,**ohne irgendwelche Ports zu öffnen (Zero Inbound)**.## What was done on your VM?

Wir haben OmniRoute im**Split-Port**-Modus über PM2 aktiviert:

-**Port „20128“:**Führt**nur die API**„/v1“ aus. -**Port „20129“:**Führt**nur das Verwaltungs-Dashboard**aus.

Darüber hinaus erfordert der interne Dienst „REQUIRE_API_KEY=true“, was bedeutet, dass kein Agent die API-Endpunkte nutzen kann, ohne ein legitimes „Bearer-Token“ zu senden, das auf der Registerkarte „API-Schlüssel“ des Dashboards generiert wird.

Dadurch können wir zwei völlig unabhängige Netzwerkregeln erstellen. Hier kommt der**Cloudflare Tunnel (cloudflared)**ins Spiel.---

## 1. How to Create the Tunnel in Cloudflare

Das Dienstprogramm „cloudflared“ ist bereits auf Ihrem Computer installiert. Befolgen Sie diese Schritte in der Cloud:

1. Greifen Sie auf Ihr**Cloudflare Zero Trust**-Dashboard zu (one.dash.cloudflare.com).
2. Gehen Sie im linken Menü zu**Netzwerke > Tunnel**.
3. Klicken Sie auf**Tunnel hinzufügen**, wählen Sie**Cloudflared**und nennen Sie es „OmniRoute-VM“.
4. Auf dem Bildschirm wird ein Befehl mit dem Namen „Connector installieren und ausführen“ generiert.**Sie müssen nur das Token (die lange Zeichenfolge nach „--token“) kopieren**.
5. Melden Sie sich über SSH bei Ihrer virtuellen Maschine (oder Ihrem Proxmox-Terminal) an und führen Sie Folgendes aus: ```bash

   # Starts and permanently binds the tunnel to your account

   cloudflared service install YOUR_GIANT_TOKEN_HERE

   ```

   ```

---

## 2. Configuring Routing (Public Hostnames)

Gehen Sie immer noch auf dem neu erstellten Tunnel-Bildschirm zur Registerkarte**Öffentliche Hostnamen**und fügen Sie die**zwei**Routen hinzu, wobei Sie die von uns vorgenommene Trennung nutzen:### Route 1: Secure API (Limited)

-**Subdomain:**`api` -**Domain:**„yourglobal.com“ (wählen Sie Ihre echte Domain) -**Diensttyp:**„HTTP“. -**URL:**`127.0.0.1:20128` _(Interner API-Port)_### Route 2: Zero Trust Dashboard (Closed)

-**Subdomain:**`omniroute` oder `panel` -**Domain:**`yourglobal.com` -**Diensttyp:**„HTTP“. -**URL:**`127.0.0.1:20129` _(Interne App/Visual-Port)_

An diesem Punkt ist die „physische“ Konnektivität gelöst. Jetzt lasst uns es wirklich abschirmen.---

## 3. Shielding the Dashboard with Zero Trust (Access)

Kein lokales Passwort schützt Ihr Dashboard besser, als den Zugriff darauf aus dem offenen Internet vollständig zu sperren.

1. Gehen Sie im Zero Trust-Dashboard zu**Zugriff > Anwendungen > Anwendung hinzufügen**.
2. Wählen Sie**Selbst gehostet**.
3. Geben Sie unter**Anwendungsname**„OmniRoute Panel“ ein.
4. Geben Sie in**Anwendungsdomäne**„omniroute.yourglobal.com“ ein (dasselbe, das Sie in „Route 2“ verwendet haben).
5. Klicken Sie auf**Weiter**.
6. Wählen Sie unter**Regelaktion**die Option „Zulassen“. Geben Sie als Regelnamen „Nur Administrator“ ein.
7. Wählen Sie unter**Einschließen**im Dropdown-Menü „Auswahl“ „E-Mails“ aus und geben Sie Ihre E-Mail-Adresse ein, zum Beispiel „admin@spgeo.com.br“.
8. Speichern („Anwendung hinzufügen“).

> **Was das bewirkt hat:**Wenn Sie versuchen, „omniroute.yourglobal.com“ zu öffnen, landet es nicht mehr in Ihrer OmniRoute-Anwendung! Es landet auf einem eleganten Cloudflare-Bildschirm und fordert Sie auf, Ihre E-Mail-Adresse einzugeben. Nur wenn Sie (bzw. die von Ihnen eingegebene E-Mail) dort eingegeben werden, erhalten Sie in Outlook/Gmail einen temporären 6-stelligen Code, der den Tunnel zum Port „20129“ freischaltet.---

## 4. Limiting and Protecting the API with Rate Limit (WAF)

Das Zero Trust Dashboard gilt nicht für die API-Route (`api.yourglobal.com`), da es sich um einen programmatischen Zugriff über automatisierte Tools (Agenten) ohne Browser handelt. Hierzu verwenden wir die Haupt-Firewall (WAF) von Cloudflare.

1. Greifen Sie auf das**normale Cloudflare-Dashboard**(dash.cloudflare.com) zu und gehen Sie zu Ihrer Domain.
2. Gehen Sie im linken Menü zu**Sicherheit > WAF > Ratenbegrenzungsregeln**.
3. Klicken Sie auf**Regel erstellen**. 4.**Name:**„OmniRoute API Anti-Abuse“. 5.**Wenn eingehende Anfragen übereinstimmen...**
   - Wählen Sie Feld: „Hostname“.
   - Operator: „gleich“.
   - Wert: „api.yourglobal.com“.
4. Unter**Mit den gleichen Eigenschaften:**Behalten Sie „IP“ bei.
5. Zu den Grenzwerten (Limit): -**Wenn die Anfragen den Wert „50“ überschreiten -**Zeitraum:\*\*„1 Minute“.
6. Am Ende unter**Aktion**: „Blockieren“ und entscheiden Sie, ob die Blockierung 1 Minute oder 1 Stunde dauert. 9.**Bereitstellen**.

> **Was das bewirkt hat:**Niemand kann mehr als 50 Anfragen in einem Zeitraum von 60 Sekunden an Ihre API-URL senden. Da Sie mehrere Agenten ausführen und der Verbrauch dahinter bereits die Ratengrenzen erreicht und Token verfolgt, handelt es sich lediglich um eine Maßnahme auf der Internet-Edge-Schicht, die Ihre lokale Instanz vor einem Ausfall aufgrund thermischer Belastung schützt, bevor der Datenverkehr überhaupt den Tunnel passiert.---

## Finalization

1. Ihre VM**hat keine offengelegten Ports**in „/etc/ufw“.
2. OmniRoute kommuniziert nur ausgehendes HTTPS („cloudflared“) und empfängt kein direktes TCP von der Welt.
3. Ihre Anfragen an OpenAI werden verschleiert, weil wir sie global so konfiguriert haben, dass sie über einen SOCKS5-Proxy weitergeleitet werden (die Cloud kümmert sich nicht um SOCKS5, da es eingehend ist).
4. Ihr Web-Dashboard verfügt über eine 2-Faktor-Authentifizierung per E-Mail.
5. Ihre API ist am Edge durch Cloudflare ratenbegrenzt und überträgt nur Bearer-Tokens.
