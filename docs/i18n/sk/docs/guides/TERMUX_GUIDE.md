# Termux Headless Setup (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute môže bežať ako bezhlavý server v systéme Android prostredníctvom Termuxu. Desktopová aplikácia Electron nie je v Termuxe podporovaná, ale webový ovládací panel a API kompatibilné s OpenAI fungujú v lokálnom prehliadači alebo z iných zariadení v rovnakej sieti.

## Predpoklady

Nainštalujte Termux z F-Droidu alebo z vydaní na GitHube, potom aktualizujte balíky a nainštalujte nástroje na zostavenie, ktoré vyžadujú natívne závislosti, ako napríklad `better-sqlite3`.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Verzia Node.js:** OmniRoute vyžaduje Node `>=22.22.2 <23 || >=24.0.0 <27` (zodpovedá `engines` v `package.json` / `SUPPORTED_NODE_RANGE`). Balík `nodejs-lts` v Termuxe zvyčajne obsahuje Node 20 LTS, ktorý **už nie je podporovaný** — namiesto neho nainštalujte aktuálnu verziu pomocou `pkg install nodejs` a overte, že `node --version` hlási verziu z radu 22.x/24.x alebo novšiu.

Ak kompilácia natívneho balíka zlyhá, znova spustite vyššie uvedený príkaz `pkg install` a potom zopakujte inštaláciu OmniRoute.

## Inštalácia

Spustite priamo najnovší publikovaný balík:

```bash
npx -y omniroute@latest
```

Môžete ho tiež nainštalovať globálne:

```bash
npm install -g omniroute
omniroute
```

## Spustenie

Spustite OmniRoute v režime bezhlavého servera:

```bash
omniroute
```

alebo:

```bash
npx omniroute
```

Ovládací panel je dostupný na adrese:

```text
http://localhost:20128
```

Otvorte túto URL adresu v prehliadači systému Android. Ak spúšťate klientov v Termuxe, použite rovnakého hostiteľa a port ako základnú URL adresu kompatibilnú s OpenAI.

## Spustenie na pozadí

Pre jednoduchý proces na pozadí použite:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

Ak ho chcete zastaviť:

```bash
pkill -f omniroute
```

Ak chcete automatické spustenie po zavedení zariadenia, nainštalujte doplnok Termux:Boot a vytvorte zavádzací skript:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Optimalizácia batérie v systéme Android môže zastaviť dlhodobo bežiace procesy na pozadí. Ak má server zostať nepretržite dostupný, vypnite optimalizáciu batérie pre Termux.

## Prístup z iných zariadení

Zistite IP adresu telefónu v sieti WiFi:

```bash
ip addr show wlan0
```

Potom otvorte ovládací panel z iného zariadenia:

```text
http://PHONE_IP:20128
```

Napríklad:

```text
http://192.168.1.50:20128
```

Telefón aj klienta ponechajte v rovnakej dôveryhodnej sieti. Ak sprístupníte OmniRoute mimo telefónu, povoľte API kľúče a overovanie ovládacieho panela.

## Dátový adresár

OmniRoute predvolene ukladá údaje do domovského adresára Termuxu a používa rovnaké správanie cesty k údajom na strane servera ako v systéme Linux. Ak chcete databázu umiestniť do konkrétneho adresára:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## Obmedzenia

- Electron v Termuxe nefunguje.
- Nie je k dispozícii systémová lišta ani integrácia s pracovnou plochou.
- Toto nastavenie je určené iba pre server: používajte ovládací panel v prehliadači.
- Natívne závislosti môžu vyžadovať lokálnu kompiláciu.
- Zariadenia s Androidom a malým množstvom pamäte môžu vyžadovať menší počet súbežných požiadaviek.
- Funkcie MITM/systémových certifikátov môžu vyžadovať úpravy úložiska dôveryhodných certifikátov na úrovni systému Android mimo Termuxu.

## Riešenie problémov

### Nepodporovaná platforma: android (každá požiadavka vracia HTTP 500)

**Príznak:** `omniroute` / `omniroute serve` vypíše `✔ OmniRoute is running!`, ale každá požiadavka na ovládací panel alebo API vráti iba `500 Internal Server Error`. Súbor `~/.omniroute/logs/application/app.log` zostane prázdny, `APP_LOG_LEVEL=debug` nevypíše nič užitočné a telo odpovede obsahuje obyčajný text (`Internal Server Error`) bez podrobností vo formáte JSON.

**Príčina:** Niektoré zostavy Termuxu/Node hlásia `process.platform === "android"`. Funkcia `getCacheDirectory()` v Next.js túto platformu nespracúva: vyžaduje, aby adresár `~/.cache` (alebo všeobecný dočasný adresár) _už_ existoval, inak zlyhá pri načítavaní hooku inštrumentácie s chybou:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

Pretože sa hook nikdy nenačíta, zaznamenávanie protokolov sa nespustí — chyba 500 sa javí ako úplne nediagnostikovateľná. OmniRoute vytvorí `~/.cache` (a nastaví `XDG_CACHE_HOME`, ak nie je nastavená) vo vstupnom bode CLI ešte pred spustením Next.js, aby táto kontrola v systéme Android/Termux prebehla úspešne.

**Podporované riešenie (bez úpravy balíka):**

```bash
mkdir -p ~/.cache
omniroute serve
```

V aktuálnych zostavách OmniRoute to CLI vykonáva v systéme Android/Termux automaticky — nová inštalácia prostredníctvom `npx -y omniroute@latest` / globálna inštalácia by nemala vyžadovať manuálny krok. Ak sa chyba po aktualizácii naďalej zobrazuje, jednorazovo vytvorte `~/.cache` podľa vyššie uvedeného postupu a vykonajte reštart.

**Neupravujte** súbor `dist/server.js` tak, aby vynucoval `process.platform = "linux"`. Takáto úprava balíka sa pri každej opätovnej inštalácii alebo aktualizácii prepíše a po vytvorení adresára vyrovnávacej pamäte nie je potrebná.

### Chyby pri zostavovaní better-sqlite3

Nainštalujte nástroje na zostavenie pre Termux:

```bash
pkg install nodejs python build-essential
```

Potom znova spustite:

```bash
npx -y omniroute@latest
```

### Port sa už používa

Skontrolujte, čo počúva na predvolenom porte:

```bash
ss -ltnp | grep 20128
```

Zastavte starý proces:

```bash
pkill -f omniroute
```

### Ovládací panel nie je dostupný z iného zariadenia

Overte, že obe zariadenia sú pripojené k rovnakej sieti WiFi, a potom vykonajte test z Termuxu:

```bash
curl http://localhost:20128
```

Ak lokálny prístup funguje, ale prístup zo siete LAN nie, skontrolujte izoláciu hotspotu/WiFi v systéme Android a všetky profily firewallu alebo VPN v telefóne.
