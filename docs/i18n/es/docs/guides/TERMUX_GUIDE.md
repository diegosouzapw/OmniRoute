# Termux Headless Setup (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/TERMUX_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/TERMUX_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/TERMUX_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/TERMUX_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/TERMUX_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/TERMUX_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/TERMUX_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/TERMUX_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/TERMUX_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/TERMUX_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/TERMUX_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/TERMUX_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/TERMUX_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/TERMUX_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/TERMUX_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/TERMUX_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/TERMUX_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/TERMUX_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/TERMUX_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/TERMUX_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/TERMUX_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/TERMUX_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/TERMUX_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/TERMUX_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/TERMUX_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/TERMUX_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/TERMUX_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/TERMUX_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/TERMUX_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/TERMUX_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/TERMUX_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/TERMUX_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/TERMUX_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/TERMUX_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/TERMUX_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/TERMUX_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/TERMUX_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/TERMUX_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/TERMUX_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/TERMUX_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/TERMUX_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/TERMUX_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/TERMUX_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/TERMUX_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/TERMUX_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/TERMUX_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/TERMUX_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/TERMUX_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/TERMUX_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/TERMUX_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/TERMUX_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/TERMUX_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/TERMUX_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/TERMUX_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/TERMUX_GUIDE.md)

---

OmniRoute puede ejecutarse como servidor sin interfaz gráfica en Android mediante Termux. La aplicación de escritorio Electron no es compatible con Termux, pero el panel web y la API compatible con OpenAI funcionan desde el navegador local o desde otros dispositivos de la misma red.

## Requisitos previos

Instala Termux desde F-Droid o desde las versiones publicadas en GitHub; después, actualiza los paquetes e instala las herramientas de compilación necesarias para dependencias nativas como `better-sqlite3`.

```bash
pkg update
pkg upgrade
pkg install nodejs python build-essential git
```

> **Versión de Node.js:** OmniRoute requiere Node `>=22.22.2 <23 || >=24.0.0 <27` (coincide con `engines` en `package.json` / `SUPPORTED_NODE_RANGE`). El paquete `nodejs-lts` de Termux suele incluir Node 20 LTS, que **ya no es compatible**; instala `pkg install nodejs` (versión actual) en su lugar y comprueba que `node --version` muestre una versión de la línea 22.x/24.x o posterior.

Si falla la compilación de paquetes nativos, vuelve a ejecutar el comando `pkg install` anterior y, después, reintenta la instalación de OmniRoute.

## Instalación

Ejecuta directamente el paquete publicado más reciente:

```bash
npx -y omniroute@latest
```

También puedes instalarlo globalmente:

```bash
npm install -g omniroute
omniroute
```

## Ejecución

Inicia OmniRoute en modo de servidor sin interfaz gráfica:

```bash
omniroute
```

o:

```bash
npx omniroute
```

El panel está disponible en:

```text
http://localhost:20128
```

Abre esa URL en el navegador de Android. Si ejecutas clientes dentro de Termux, utiliza el mismo host y puerto como URL base compatible con OpenAI.

## Ejecución en segundo plano

Para ejecutar un proceso sencillo en segundo plano:

```bash
nohup omniroute > omniroute.log 2>&1 &
```

Para detenerlo:

```bash
pkill -f omniroute
```

Para iniciarlo automáticamente después de arrancar el dispositivo, instala el complemento Termux:Boot y crea un script de arranque:

```bash
mkdir -p ~/.termux/boot
cat > ~/.termux/boot/omniroute.sh <<'EOF'
#!/data/data/com.termux/files/usr/bin/sh
cd "$HOME"
nohup omniroute > "$HOME/omniroute.log" 2>&1 &
EOF
chmod +x ~/.termux/boot/omniroute.sh
```

La optimización de batería de Android puede detener procesos en segundo plano de larga duración. Desactiva la optimización de batería para Termux si necesitas que el servidor permanezca en línea.

## Acceso desde otros dispositivos

Obtén la dirección IP del teléfono en la red WiFi:

```bash
ip addr show wlan0
```

Después, abre el panel desde otro dispositivo:

```text
http://PHONE_IP:20128
```

Por ejemplo:

```text
http://192.168.1.50:20128
```

Mantén el teléfono y el cliente en la misma red de confianza. Si expones OmniRoute fuera del teléfono, habilita las claves de API y la autenticación del panel.

## Directorio de datos

De forma predeterminada, OmniRoute almacena los datos en el directorio principal de Termux, siguiendo el mismo comportamiento de rutas de datos del servidor utilizado en Linux. Para ubicar la base de datos en un directorio específico:

```bash
export DATA_DIR="$HOME/.omniroute"
omniroute
```

## Limitaciones

- Electron no se ejecuta en Termux.
- No hay bandeja del sistema ni integración con el escritorio.
- Esta configuración es exclusivamente para servidor: utiliza el panel del navegador.
- Puede que las dependencias nativas deban compilarse localmente.
- Los dispositivos Android con poca memoria pueden necesitar menos solicitudes simultáneas.
- Las funciones de certificados MITM/del sistema pueden requerir cambios en el almacén de confianza de Android fuera de Termux.

## Solución de problemas

### Plataforma no compatible: android (todas las solicitudes devuelven HTTP 500)

**Síntoma:** `omniroute` / `omniroute serve` muestra `✔ OmniRoute is running!`, pero todas las solicitudes del panel o de la API devuelven un `500 Internal Server Error` sin más información. `~/.omniroute/logs/application/app.log` permanece vacío, `APP_LOG_LEVEL=debug` no muestra nada útil y el cuerpo de la respuesta es texto sin formato (`Internal Server Error`), sin detalles JSON.

**Causa:** Algunas compilaciones de Termux/Node devuelven `process.platform === "android"`. `getCacheDirectory()` de Next.js no admite esa plataforma: requiere que `~/.cache` (o un directorio temporal genérico) _ya_ exista; de lo contrario, falla al cargar el hook de instrumentación con:

```text
Error: An error occurred while loading instrumentation hook: Unsupported platform: android
```

Como el hook nunca se carga, el registro nunca se inicia y el error 500 parece completamente imposible de diagnosticar. OmniRoute crea `~/.cache` (y establece `XDG_CACHE_HOME` cuando no está definido) en el punto de entrada de la CLI antes de que se inicie Next.js, para que esta comprobación se complete correctamente en Android/Termux.

**Solución admitida (sin modificar el paquete):**

```bash
mkdir -p ~/.cache
omniroute serve
```

En las compilaciones actuales de OmniRoute, la CLI lo hace automáticamente en Android/Termux; una instalación nueva mediante `npx -y omniroute@latest` o una instalación global no debería requerir el paso manual. Si sigues viendo el error después de actualizar, crea `~/.cache` una vez como se indica arriba y reinicia.

**No** modifiques `dist/server.js` para forzar `process.platform = "linux"`. Ese tipo de modificación del paquete se sobrescribe con cada reinstalación o actualización y es innecesaria una vez que existe el directorio de caché.

### Errores de compilación de better-sqlite3

Instala la cadena de herramientas de compilación de Termux:

```bash
pkg install nodejs python build-essential
```

Después, vuelve a ejecutar:

```bash
npx -y omniroute@latest
```

### El puerto ya está en uso

Comprueba qué proceso está escuchando en el puerto predeterminado:

```bash
ss -ltnp | grep 20128
```

Detén el proceso anterior:

```bash
pkill -f omniroute
```

### No se puede acceder al panel desde otro dispositivo

Comprueba que ambos dispositivos estén en la misma red WiFi y, después, realiza una prueba desde Termux:

```bash
curl http://localhost:20128
```

Si el acceso local funciona, pero el acceso desde la LAN no, comprueba el aislamiento del punto de acceso o de la red WiFi de Android, así como cualquier perfil de firewall o VPN del teléfono.
