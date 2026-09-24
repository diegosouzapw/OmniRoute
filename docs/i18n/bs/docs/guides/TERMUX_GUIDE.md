# Termux Headless Setup (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

# Termux Headless podešavanje

OmniRoute može raditi kao headless server na Androidu putem Termuxa. Electron desktop aplikacija nije podržana u Termuxu, ali web kontrolna tabla i API kompatibilan sa OpenAI rade iz lokalnog pretraživača ili sa drugih uređaja na istoj mreži.

## Preduslovi

Instalirajte Termux sa F-Droida ili GitHub izdanja, zatim ažurirajte pakete i instalirajte alate za izgradnju (build tools) potrebne za izvorne (native) zavisnosti kao što je `better-sqlite3`.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Node.js verzija:** OmniRoute zahtijeva Node `>=22.22.2 <23 || >=24.0.0 <27` (odgovara `engines` u `package.json` / `SUPPORTED_NODE_RANGE`). Termuxov `nodejs-lts` obično isporučuje Node 20 LTS, koji **više nije podržan** — umjesto toga instalirajte `pkg install nodejs` (trenutna verzija) i provjerite da li `node --version` prikazuje 22.x/24.x+ liniju.

Ako kompilacija izvornih paketa ne uspije, ponovo pokrenite gornju `pkg install` komandu, a zatim pokušajte ponovo instalaciju OmniRoute-a.

## Instalacija

Pokrenite najnoviji objavljeni paket direktno:

```bash
npx -y omniroute@latest
```

Također ga možete instalirati globalno:

```bash
npm install -g omniroute
omniroute
```

## Pokretanje

Pokrenite OmniRoute u headless serverskom režimu:

```bash
omniroute
```

ili:

```bash
npx omniroute
```

Kontrolna tabla sluša na:

```text
http://localhost:20128
```

Otvorite taj URL u Android pretraživaču. Ako pokrećete klijente unutar Termuxa, koristite isti host i port kao OpenAI-kompatibilni bazni URL.

## Izvršavanje u pozadini

Za jednostavan proces u pozadini:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

Da ga zaustavite:

```bash
pkill -f omniroute
```

Za automatsko pokretanje nakon uključivanja uređaja, instalirajte Termux:Boot dodatak i kreirajte skriptu za pokretanje:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Optimizacija baterije na Androidu može zaustaviti dugotrajne procese u pozadini. Onemogućite optimizaciju baterije za Termux ako se očekuje da server ostane na mreži.

## Pristup sa drugih uređaja

Pronađite IP adresu telefona na WiFi mreži:

```bash
ip addr show wlan0
```

Zatim otvorite kontrolnu tablu sa drugog uređaja:

```text
http://PHONE_IP:20128
```

Na primjer:

```text
http://192.168.1.50:20128
```

Držite telefon i klijent na istoj pouzdanoj mreži. Ako izložite OmniRoute izvan telefona, omogućite API ključeve i autentifikaciju kontrolne table.

## Direktorijum podataka

Po podrazumijevanim postavkama, OmniRoute pohranjuje podatke u Termux početni direktorijum, prateći isto ponašanje putanje podataka na strani servera koje se koristi na Linuxu. Da biste bazu podataka smjestili na određenu lokaciju:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## Ograničenja

- Electron ne radi u Termuxu.
- Ne postoji sistemska traka (system tray) ili integracija sa radnom površinom.
- Ovo podešavanje je samo za server: koristite kontrolnu tablu u pretraživaču.
- Izvorne (native) zavisnosti mogu zahtijevati lokalnu kompilaciju.
- Android uređaji sa malo memorije mogu zahtijevati manje istovremenih zahtjeva.
- MITM/sistemske certifikatske funkcije mogu zahtijevati rad sa trust-store-om na nivou Androida izvan Termuxa.

## Rješavanje problema

### Nepodržana platforma: android (svaki zahtjev vraća HTTP 500)

**Simptom:** `omniroute` / `omniroute serve` ispisuje `✔ OmniRoute is running!`, ali svaki zahtjev prema kontrolnoj tabli ili API-ju vraća običnu `500 Internal Server Error` grešku. `~/.omniroute/logs/application/app.log` ostaje prazan, `APP_LOG_LEVEL=debug` ne ispisuje ništa korisno, a tijelo odgovora je običan tekst (`Internal Server Error`) bez JSON detalja.

**Uzrok:** Neke Termux/Node verzije prijavljuju `process.platform === "android"`. Next.js `getCacheDirectory()` ne rukuje tom platformom: zahtijeva da `~/.cache` (ili generički tmp direktorijum) _već_ postoji, u suprotnom ne uspijeva prilikom učitavanja instrumentation hook-a sa:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

Budući da se hook nikada ne učita, logovanje nikada ne počinje — greška 500 izgleda potpuno nedijagnostikovana. OmniRoute kreira `~/.cache` (i postavlja `XDG_CACHE_HOME` kada nije postavljen) u CLI ulaznoj tački prije nego što se Next.js pokrene, tako da ova provjera uspijeva na Androidu/Termuxu.

**Podržano rješenje (bez patchovanja paketa):**

```bash
mkdir -p ~/.cache
omniroute serve
```

Na trenutnim OmniRoute verzijama CLI ovo radi automatski na Androidu/Termuxu — svježa `npx -y omniroute@latest` / globalna instalacija ne bi trebala zahtijevati ručni korak. Ako i dalje vidite grešku nakon nadogradnje, kreirajte `~/.cache` jednom kao gore i ponovo pokrenite.

**Nemojte** patchovati `dist/server.js` da biste forsirali `process.platform = "linux"`. Ta vrsta patcha paketa se prepisuje pri svakoj ponovnoj instalaciji/nadogradnji i nepotrebna je kada direktorijum keša postoji.

### Greške pri izgradnji better-sqlite3

Instalirajte Termux build toolchain:

```bash
pkg install nodejs python build-essential
```

Zatim ponovo pokrenite:

```bash
npx -y omniroute@latest
```

### Port je već u upotrebi

Provjerite šta sluša na podrazumijevanom portu:

```bash
ss -ltnp | grep 20128
```

Zaustavite stari proces:

```bash
pkill -f omniroute
```

### Kontrolna tabla nije dostupna sa drugog uređaja

Provjerite da li su oba uređaja na istoj WiFi mreži, a zatim testirajte iz Termuxa:

```bash
curl http://localhost:20128
```

Ako lokalni pristup radi, ali LAN pristup ne radi, provjerite Android hotspot/WiFi izolaciju i bilo koji firewall ili VPN profil na telefonu.
