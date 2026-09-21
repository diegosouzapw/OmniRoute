# Termux Headless Setup (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

Az OmniRoute fej nélküli kiszolgálóként futtatható Androidon a Termuxon keresztül. Az Electron asztali alkalmazás nem támogatott Termuxban, de a webes irányítópult és az OpenAI-kompatibilis API elérhető a helyi böngészőből vagy az ugyanazon a hálózaton lévő más eszközökről.

## Előfeltételek

Telepítse a Termuxot az F-Droidból vagy a GitHub-kiadásokból, majd frissítse a csomagokat, és telepítse a natív függőségek, például a `better-sqlite3` által igényelt fordítási eszközöket.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Node.js-verzió:** Az OmniRoute a következő Node-verziókat igényli: `>=22.22.2 <23 || >=24.0.0 <27` (ez megegyezik a `package.json` fájlban lévő `engines` / `SUPPORTED_NODE_RANGE` értékével). A Termux `nodejs-lts` csomagja jellemzően a Node 20 LTS verzióját tartalmazza, amely **már nem támogatott** — ehelyett telepítse az aktuális verziót a `pkg install nodejs` paranccsal, és ellenőrizze, hogy a `node --version` kimenete 22.x/24.x+ verziót jelez-e.

Ha a natív csomag fordítása sikertelen, futtassa újra a fenti `pkg install` parancsot, majd próbálja meg ismét telepíteni az OmniRoute-ot.

## Telepítés

Futtassa közvetlenül a legújabb közzétett csomagot:

```bash
npx -y omniroute@latest
```

Globálisan is telepítheti:

```bash
npm install -g omniroute
omniroute
```

## Futtatás

Indítsa el az OmniRoute-ot fej nélküli kiszolgálói módban:

```bash
omniroute
```

vagy:

```bash
npx omniroute
```

Az irányítópult ezen a címen figyel:

```text
http://localhost:20128
```

Nyissa meg ezt az URL-t az Android böngészőjében. Ha a klienseket Termuxon belül futtatja, az OpenAI-kompatibilis alap-URL-hez ugyanazt a gazdagépet és portot használja.

## Háttérben történő futtatás

Egyszerű háttérfolyamat indításához:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

Leállításához:

```bash
pkill -f omniroute
```

Az eszköz rendszerindítása utáni automatikus indításhoz telepítse a Termux:Boot kiegészítőt, és hozzon létre egy rendszerindítási parancsfájlt:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

Az Android akkumulátor-optimalizálása leállíthatja a hosszú ideig futó háttérfolyamatokat. Ha a kiszolgálónak folyamatosan elérhetőnek kell maradnia, tiltsa le az akkumulátor-optimalizálást a Termux esetében.

## Hozzáférés más eszközökről

Keresse meg a telefon IP-címét a WiFi-hálózaton:

```bash
ip addr show wlan0
```

Ezután nyissa meg az irányítópultot egy másik eszközről:

```text
http://PHONE_IP:20128
```

Például:

```text
http://192.168.1.50:20128
```

A telefont és a klienst ugyanazon a megbízható hálózaton használja. Ha az OmniRoute-ot a telefonon kívülről is elérhetővé teszi, engedélyezze az API-kulcsokat és az irányítópult hitelesítését.

## Adatkönyvtár

Alapértelmezés szerint az OmniRoute a Termux saját könyvtárában tárolja az adatokat, a Linuxon használt kiszolgálóoldali adatelérési út viselkedését követve. Ha az adatbázist egy kifejezetten megadott helyen szeretné tárolni:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## Korlátozások

- Az Electron nem fut Termuxban.
- Nincs rendszertálca- vagy asztali integráció.
- Ez a konfiguráció kizárólag kiszolgálóként használható: használja a böngészős irányítópultot.
- A natív függőségeket esetleg helyben kell lefordítani.
- Kevés memóriával rendelkező Android-eszközökön kevesebb egyidejű kérésre lehet szükség.
- A MITM-/rendszertanúsítvány-funkciókhoz Android-szintű, Termuxon kívüli megbízhatóságitár-beállításokra lehet szükség.

## Hibaelhárítás

### Nem támogatott platform: android (minden kérés HTTP 500 választ ad)

**Tünet:** Az `omniroute` / `omniroute serve` kiírja a `✔ OmniRoute is running!` üzenetet, de minden irányítópult- vagy API-kérés egyszerű `500 Internal Server Error` választ ad. A `~/.omniroute/logs/application/app.log` üres marad, az `APP_LOG_LEVEL=debug` nem ír ki semmi hasznosat, a válasz törzse pedig egyszerű szöveg (`Internal Server Error`), JSON-részletek nélkül.

**Ok:** Egyes Termux-/Node-buildváltozatoknál a `process.platform === "android"` kifejezés igaz. A Next.js `getCacheDirectory()` nem kezeli ezt a platformot: megköveteli, hogy a `~/.cache` (vagy egy általános ideiglenes könyvtár) _már_ létezzen, ellenkező esetben a műszerezési horog betöltésekor a következő hibával leáll:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

Mivel a horog soha nem töltődik be, a naplózás sem indul el — így az 500-as hiba teljesen diagnosztizálhatatlannak tűnik. Az OmniRoute létrehozza a `~/.cache` könyvtárat (és beállítja az `XDG_CACHE_HOME` változót, ha az nincs beállítva) a CLI belépési pontjában, mielőtt a Next.js elindulna, így ez az ellenőrzés sikeres lesz Androidon/Termuxban.

**Támogatott megoldás (a csomag módosítása nélkül):**

```bash
mkdir -p ~/.cache
omniroute serve
```

Az OmniRoute jelenlegi buildjeiben a CLI ezt automatikusan elvégzi Androidon/Termuxban — egy friss `npx -y omniroute@latest` futtatás vagy globális telepítés esetén nincs szükség erre a manuális lépésre. Ha a frissítés után továbbra is látja a hibát, hozza létre egyszer a `~/.cache` könyvtárat a fentiek szerint, majd indítsa újra.

**Ne** módosítsa a `dist/server.js` fájlt úgy, hogy a `process.platform = "linux"` értéket kényszerítse ki. Az ilyen csomagmódosítás minden újratelepítéskor/frissítéskor felülíródik, és a gyorsítótárkönyvtár létrehozása után szükségtelen.

### better-sqlite3 fordítási hibák

Telepítse a Termux fordítási eszközkészletét:

```bash
pkg install nodejs python build-essential
```

Ezután futtassa újra:

```bash
npx -y omniroute@latest
```

### A port már használatban van

Ellenőrizze, hogy mi figyel az alapértelmezett porton:

```bash
ss -ltnp | grep 20128
```

Állítsa le a régi folyamatot:

```bash
pkill -f omniroute
```

### Az irányítópult nem érhető el másik eszközről

Ellenőrizze, hogy mindkét eszköz ugyanazon a WiFi-hálózaton van-e, majd tesztelje Termuxból:

```bash
curl http://localhost:20128
```

Ha a helyi hozzáférés működik, de a LAN-hozzáférés nem, ellenőrizze az Android hotspot-/WiFi-elkülönítési beállításait, valamint a telefonon lévő tűzfal- vagy VPN-profilt.
