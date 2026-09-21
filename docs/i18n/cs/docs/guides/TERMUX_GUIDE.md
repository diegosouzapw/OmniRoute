# Termux Headless Setup (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute lze v Androidu prostřednictvím Termuxu provozovat jako server bez grafického rozhraní. Desktopová aplikace Electron není v Termuxu podporována, ale webový ovládací panel a API kompatibilní s OpenAI fungují v místním prohlížeči nebo na jiných zařízeních ve stejné síti.

## Předpoklady

Nainstalujte Termux z F-Droidu nebo z vydání na GitHubu, poté aktualizujte balíčky a nainstalujte sestavovací nástroje vyžadované nativními závislostmi, jako je `better-sqlite3`.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Verze Node.js:** OmniRoute vyžaduje Node `>=22.22.2 <23 || >=24.0.0 <27` (odpovídá `engines` v `package.json` / `SUPPORTED_NODE_RANGE`). Balíček `nodejs-lts` v Termuxu obvykle obsahuje Node 20 LTS, který **již není podporován** — místo něj nainstalujte aktuální verzi pomocí `pkg install nodejs` a ověřte, že `node --version` hlásí řadu 22.x/24.x nebo novější.

Pokud se kompilace nativního balíčku nezdaří, spusťte znovu výše uvedený příkaz `pkg install` a poté instalaci OmniRoute zopakujte.

## Instalace

Spusťte přímo nejnovější publikovaný balíček:

```bash
npx -y omniroute@latest
```

Můžete jej také nainstalovat globálně:

```bash
npm install -g omniroute
omniroute
```

## Spuštění

Spusťte OmniRoute v režimu serveru bez grafického rozhraní:

```bash
omniroute
```

nebo:

```bash
npx omniroute
```

Ovládací panel naslouchá na adrese:

```text
http://localhost:20128
```

Otevřete tuto adresu URL v prohlížeči Androidu. Pokud klienty spouštíte uvnitř Termuxu, použijte stejného hostitele a port jako základní adresu URL kompatibilní s OpenAI.

## Běh na pozadí

Pro jednoduchý proces na pozadí použijte:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

Chcete-li jej zastavit:

```bash
pkill -f omniroute
```

Pro automatické spuštění po zavedení systému zařízení nainstalujte doplněk Termux:Boot a vytvořte spouštěcí skript:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Optimalizace baterie v Androidu může dlouhodobě běžící procesy na pozadí ukončit. Pokud má server zůstat dostupný, zakažte pro Termux optimalizaci baterie.

## Přístup z jiných zařízení

Zjistěte IP adresu telefonu v síti WiFi:

```bash
ip addr show wlan0
```

Poté otevřete ovládací panel z jiného zařízení:

```text
http://PHONE_IP:20128
```

Například:

```text
http://192.168.1.50:20128
```

Telefon a klienta ponechte ve stejné důvěryhodné síti. Pokud OmniRoute zpřístupníte mimo telefon, povolte API klíče a ověřování pro ovládací panel.

## Datový adresář

Ve výchozím nastavení OmniRoute ukládá data do domovského adresáře Termuxu a používá stejné chování cesty k datům na straně serveru jako v Linuxu. Chcete-li databázi umístit do konkrétního umístění:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## Omezení

- Electron v Termuxu nefunguje.
- Není k dispozici systémová lišta ani integrace s desktopovým prostředím.
- Toto nastavení je určeno pouze pro server: používejte ovládací panel v prohlížeči.
- Nativní závislosti mohou vyžadovat místní kompilaci.
- Na zařízeních s Androidem a malým množstvím paměti může být nutné snížit počet souběžných požadavků.
- Funkce MITM/systémových certifikátů mohou vyžadovat úpravy úložiště důvěryhodných certifikátů na úrovni Androidu mimo Termux.

## Řešení problémů

### Nepodporovaná platforma: android (každý požadavek vrací HTTP 500)

**Příznak:** `omniroute` / `omniroute serve` vypíše `✔ OmniRoute is running!`, ale každý požadavek ovládacího panelu nebo API vrátí pouze `500 Internal Server Error`. Soubor `~/.omniroute/logs/application/app.log` zůstává prázdný, `APP_LOG_LEVEL=debug` nevypíše nic užitečného a tělo odpovědi je prostý text (`Internal Server Error`) bez podrobností ve formátu JSON.

**Příčina:** Některá sestavení Termuxu/Node hlásí `process.platform === "android"`. Funkce Next.js `getCacheDirectory()` tuto platformu nezpracovává: vyžaduje, aby adresář `~/.cache` (nebo obecný dočasný adresář) _již_ existoval, jinak při načítání instrumentačního hooku selže s následující chybou:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

Protože se hook nikdy nenačte, protokolování se vůbec nespustí — chyba 500 tak vypadá jako zcela nediagnostikovatelná. OmniRoute vytvoří `~/.cache` (a nastaví `XDG_CACHE_HOME`, pokud není nastaveno) ve vstupním bodě CLI před spuštěním Next.js, aby tato kontrola v Androidu/Termuxu uspěla.

**Podporované řešení (bez úprav balíčku):**

```bash
mkdir -p ~/.cache
omniroute serve
```

V aktuálních sestaveních OmniRoute to CLI v Androidu/Termuxu provádí automaticky — nová instalace pomocí `npx -y omniroute@latest` / globální instalace by neměla ruční krok vyžadovat. Pokud se chyba zobrazuje i po aktualizaci, vytvořte jednou adresář `~/.cache` podle výše uvedeného postupu a službu restartujte.

**Neupravujte** soubor `dist/server.js` tak, aby vynucoval `process.platform = "linux"`. Taková úprava balíčku se při každé opětovné instalaci nebo aktualizaci přepíše a po vytvoření adresáře mezipaměti není nutná.

### Chyby při sestavování better-sqlite3

Nainstalujte sestavovací nástroje Termuxu:

```bash
pkg install nodejs python build-essential
```

Poté spusťte znovu:

```bash
npx -y omniroute@latest
```

### Port se již používá

Zkontrolujte, co naslouchá na výchozím portu:

```bash
ss -ltnp | grep 20128
```

Zastavte starý proces:

```bash
pkill -f omniroute
```

### Ovládací panel není dostupný z jiného zařízení

Ověřte, že jsou obě zařízení ve stejné síti WiFi, a poté připojení otestujte z Termuxu:

```bash
curl http://localhost:20128
```

Pokud místní přístup funguje, ale přístup ze sítě LAN nikoli, zkontrolujte izolaci hotspotu/WiFi v Androidu a případné profily firewallu nebo VPN v telefonu.
