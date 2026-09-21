# Termux Headless Setup (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute poate rula ca server headless pe Android prin Termux. Aplicația desktop Electron nu este compatibilă cu Termux, însă panoul de control web și API-ul compatibil cu OpenAI funcționează din browserul local sau de pe alte dispozitive din aceeași rețea.

## Cerințe preliminare

Instalați Termux din F-Droid sau din versiunile publicate pe GitHub, apoi actualizați pachetele și instalați instrumentele de compilare necesare pentru dependențe native precum `better-sqlite3`.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Versiunea Node.js:** OmniRoute necesită Node `>=22.22.2 <23 || >=24.0.0 <27` (corespunde cu `engines` din `package.json` / `SUPPORTED_NODE_RANGE`). Pachetul `nodejs-lts` din Termux include de obicei Node 20 LTS, care **nu mai este compatibil** — instalați în schimb `pkg install nodejs` (versiunea curentă) și verificați dacă `node --version` indică o versiune din seria 22.x/24.x+.

Dacă nu reușește compilarea pachetelor native, rulați din nou comanda `pkg install` de mai sus, apoi reîncercați instalarea OmniRoute.

## Instalare

Rulați direct cel mai recent pachet publicat:

```bash
npx -y omniroute@latest
```

De asemenea, îl puteți instala global:

```bash
npm install -g omniroute
omniroute
```

## Rulare

Porniți OmniRoute în modul server headless:

```bash
omniroute
```

sau:

```bash
npx omniroute
```

Panoul de control este disponibil la:

```text
http://localhost:20128
```

Deschideți această adresă URL în browserul Android. Dacă rulați clienți în Termux, utilizați aceeași gazdă și același port pentru adresa URL de bază compatibilă cu OpenAI.

## Rulare în fundal

Pentru un proces simplu în fundal:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

Pentru a-l opri:

```bash
pkill -f omniroute
```

Pentru pornire automată după inițializarea dispozitivului, instalați extensia Termux:Boot și creați un script de pornire:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Optimizarea bateriei din Android poate opri procesele care rulează mult timp în fundal. Dezactivați optimizarea bateriei pentru Termux dacă serverul trebuie să rămână online.

## Acces de pe alte dispozitive

Aflați adresa IP a telefonului în rețeaua WiFi:

```bash
ip addr show wlan0
```

Apoi deschideți panoul de control de pe alt dispozitiv:

```text
http://PHONE_IP:20128
```

De exemplu:

```text
http://192.168.1.50:20128
```

Mențineți telefonul și clientul în aceeași rețea de încredere. Dacă expuneți OmniRoute în afara telefonului, activați cheile API și autentificarea pentru panoul de control.

## Directorul de date

În mod implicit, OmniRoute stochează datele în directorul personal Termux, urmând același comportament al căii de date de pe server utilizat în Linux. Pentru a amplasa baza de date într-o locație explicită:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## Limitări

- Electron nu rulează în Termux.
- Nu există pictogramă în zona de notificare a sistemului sau integrare cu mediul desktop.
- Această configurație este destinată exclusiv serverului: utilizați panoul de control din browser.
- Este posibil ca dependențele native să necesite compilare locală.
- Dispozitivele Android cu memorie redusă pot necesita mai puține solicitări simultane.
- Funcționalitățile MITM/certificate de sistem pot necesita configurarea depozitului de certificate de încredere la nivel de Android, în afara Termux.

## Depanare

### Platformă neacceptată: android (fiecare solicitare returnează HTTP 500)

**Simptom:** `omniroute` / `omniroute serve` afișează `✔ OmniRoute is running!`, dar fiecare solicitare către panoul de control sau API returnează doar `500 Internal Server Error`. Fișierul `~/.omniroute/logs/application/app.log` rămâne gol, `APP_LOG_LEVEL=debug` nu afișează nimic util, iar corpul răspunsului este text simplu (`Internal Server Error`), fără detalii JSON.

**Cauză:** Unele versiuni Termux/Node raportează `process.platform === "android"`. Funcția Next.js `getCacheDirectory()` nu gestionează această platformă: aceasta necesită ca `~/.cache` (sau un director temporar generic) să existe _deja_; în caz contrar, încărcarea hook-ului de instrumentare eșuează cu:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

Deoarece hook-ul nu se încarcă niciodată, înregistrarea în jurnale nu pornește — eroarea 500 pare complet imposibil de diagnosticat. OmniRoute creează `~/.cache` (și setează `XDG_CACHE_HOME` atunci când nu este setată) în punctul de intrare CLI înainte de pornirea Next.js, astfel încât această verificare să reușească pe Android/Termux.

**Soluție acceptată (fără modificarea pachetului):**

```bash
mkdir -p ~/.cache
omniroute serve
```

În versiunile OmniRoute actuale, CLI-ul face acest lucru automat pe Android/Termux — o instalare nouă prin `npx -y omniroute@latest` / instalare globală nu ar trebui să necesite pasul manual. Dacă eroarea persistă după actualizare, creați o singură dată `~/.cache` ca mai sus și reporniți.

**Nu** modificați `dist/server.js` pentru a forța `process.platform = "linux"`. O astfel de modificare a pachetului este suprascrisă la fiecare reinstalare/actualizare și nu mai este necesară odată ce directorul cache există.

### Erori de compilare pentru better-sqlite3

Instalați lanțul de instrumente de compilare Termux:

```bash
pkg install nodejs python build-essential
```

Apoi rulați din nou:

```bash
npx -y omniroute@latest
```

### Portul este deja utilizat

Verificați ce proces ascultă pe portul implicit:

```bash
ss -ltnp | grep 20128
```

Opriți procesul vechi:

```bash
pkill -f omniroute
```

### Panoul de control nu este accesibil de pe alt dispozitiv

Verificați dacă ambele dispozitive se află în aceeași rețea WiFi, apoi testați din Termux:

```bash
curl http://localhost:20128
```

Dacă accesul local funcționează, dar accesul prin LAN nu funcționează, verificați izolarea hotspotului/rețelei WiFi din Android și orice profil de firewall sau VPN de pe telefon.
