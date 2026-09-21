# Termux Headless Setup (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute kan via Termux als headless server op Android worden uitgevoerd. De Electron-desktopapp wordt niet ondersteund in Termux, maar het webdashboard en de OpenAI-compatibele API werken vanuit de lokale browser of vanaf andere apparaten op hetzelfde netwerk.

## Vereisten

Installeer Termux via F-Droid of GitHub-releases, werk vervolgens de pakketten bij en installeer de buildtools die vereist zijn voor native afhankelijkheden zoals `better-sqlite3`.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Node.js-versie:** OmniRoute vereist Node `>=22.22.2 <23 || >=24.0.0 <27` (komt overeen met `engines` in `package.json` / `SUPPORTED_NODE_RANGE`). Termux' `nodejs-lts` levert doorgaans Node 20 LTS, dat **niet langer wordt ondersteund** — installeer in plaats daarvan `pkg install nodejs` (de huidige versie) en controleer of `node --version` een versie uit de 22.x/24.x+-reeks rapporteert.

Als het compileren van native pakketten mislukt, voer dan de bovenstaande opdracht `pkg install` opnieuw uit en probeer daarna OmniRoute opnieuw te installeren.

## Installatie

Voer het nieuwste gepubliceerde pakket rechtstreeks uit:

```bash
npx -y omniroute@latest
```

Je kunt het ook globaal installeren:

```bash
npm install -g omniroute
omniroute
```

## Uitvoeren

Start OmniRoute in headless-servermodus:

```bash
omniroute
```

of:

```bash
npx omniroute
```

Het dashboard luistert op:

```text
http://localhost:20128
```

Open die URL in de Android-browser. Als je clients binnen Termux uitvoert, gebruik je dezelfde host en poort als de OpenAI-compatibele basis-URL.

## Uitvoering op de achtergrond

Voor een eenvoudig achtergrondproces:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

Om het te stoppen:

```bash
pkill -f omniroute
```

Installeer voor automatisch opstarten nadat het apparaat is opgestart de Termux:Boot-add-on en maak een opstartscript:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

De batterijoptimalisatie van Android kan langdurig actieve achtergrondprocessen stoppen. Schakel batterijoptimalisatie voor Termux uit als de server online moet blijven.

## Toegang vanaf andere apparaten

Zoek het IP-adres van de telefoon op het wifi-netwerk:

```bash
ip addr show wlan0
```

Open vervolgens het dashboard vanaf een ander apparaat:

```text
http://PHONE_IP:20128
```

Bijvoorbeeld:

```text
http://192.168.1.50:20128
```

Houd de telefoon en de client op hetzelfde vertrouwde netwerk. Als je OmniRoute buiten de telefoon toegankelijk maakt, schakel dan API-sleutels en dashboardauthenticatie in.

## Gegevensmap

Standaard slaat OmniRoute gegevens op in de thuismap van Termux, volgens hetzelfde gedrag voor gegevenspaden aan de serverzijde als op Linux. Om de database op een expliciete locatie te plaatsen:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## Beperkingen

- Electron werkt niet in Termux.
- Er is geen systeemvak- of desktopintegratie.
- Deze configuratie is uitsluitend bedoeld als server: gebruik het browserdashboard.
- Native afhankelijkheden moeten mogelijk lokaal worden gecompileerd.
- Op Android-apparaten met weinig geheugen zijn mogelijk minder gelijktijdige verzoeken nodig.
- Voor MITM-/systeemcertificaatfuncties zijn mogelijk aanpassingen aan de vertrouwensopslag van Android buiten Termux vereist.

## Probleemoplossing

### Niet-ondersteund platform: android (elk verzoek retourneert HTTP 500)

**Symptoom:** `omniroute` / `omniroute serve` toont `✔ OmniRoute is running!`, maar elk dashboard- of API-verzoek retourneert uitsluitend `500 Internal Server Error`. `~/.omniroute/logs/application/app.log` blijft leeg, `APP_LOG_LEVEL=debug` toont niets bruikbaars en de antwoordtekst is platte tekst (`Internal Server Error`) zonder JSON-details.

**Oorzaak:** Sommige Termux-/Node-builds rapporteren `process.platform === "android"`. `getCacheDirectory()` van Next.js ondersteunt dat platform niet: `~/.cache` (of een algemene tijdelijke map) moet _al_ bestaan, anders mislukt het laden van de instrumentatiehook met:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

Omdat de hook nooit wordt geladen, wordt logboekregistratie nooit gestart — hierdoor lijkt de 500-fout volledig niet te diagnosticeren. OmniRoute maakt `~/.cache` aan (en stelt `XDG_CACHE_HOME` in als deze niet is ingesteld) in het CLI-toegangspunt voordat Next.js wordt gestart, zodat deze controle op Android/Termux slaagt.

**Ondersteunde oplossing (zonder het pakket te patchen):**

```bash
mkdir -p ~/.cache
omniroute serve
```

In huidige OmniRoute-builds doet de CLI dit automatisch op Android/Termux — bij een nieuwe installatie via `npx -y omniroute@latest` / een globale installatie zou de handmatige stap niet nodig moeten zijn. Als je de fout na het upgraden nog steeds ziet, maak je `~/.cache` eenmaal aan zoals hierboven beschreven en start je opnieuw.

Patch `dist/server.js` **niet** om `process.platform = "linux"` af te dwingen. Zo'n pakketpatch wordt bij elke herinstallatie/upgrade overschreven en is niet nodig zodra de cachemap bestaat.

### Buildfouten met better-sqlite3

Installeer de Termux-buildtoolchain:

```bash
pkg install nodejs python build-essential
```

Voer daarna opnieuw uit:

```bash
npx -y omniroute@latest
```

### Poort is al in gebruik

Controleer welk proces op de standaardpoort luistert:

```bash
ss -ltnp | grep 20128
```

Stop het oude proces:

```bash
pkill -f omniroute
```

### Dashboard niet bereikbaar vanaf een ander apparaat

Controleer of beide apparaten met hetzelfde wifi-netwerk zijn verbonden en test vervolgens vanuit Termux:

```bash
curl http://localhost:20128
```

Als lokale toegang werkt maar LAN-toegang niet, controleer dan de hotspot-/wifi-isolatie van Android en eventuele firewall- of VPN-profielen op de telefoon.
