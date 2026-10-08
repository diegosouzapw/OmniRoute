# Tunnels Guide (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **Fuente de referencia:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`, `src/app/api/tunnels/`
> **Última actualización:** 2026-06-28 — v3.8.40

OmniRoute puede exponer su servidor local (`http://localhost:20128`) a Internet
mediante tres servicios de túnel. Esto resulta útil para:

- Retrollamadas de OAuth de proveedores en la nube (Antigravity, Gemini, Cursor) que necesitan una
  URL de redirección accesible públicamente.
- Compartir tu instancia local con compañeros de equipo sin implementar una máquina virtual.
- Pruebas móviles, remotas o entre redes.

Los tres servicios se gestionan dentro del proceso: OmniRoute inicia y detiene el
binario o SDK subyacente desde el panel de control o la API REST. No se requiere
configurar un proxy inverso ni systemd.

## Resumen de los servicios

| Servicio                    | Persistencia                                                        | Coste                      | Configuración                                                |
| --------------------------- | ------------------------------------------------------------------- | -------------------------- | ------------------------------------------------------------ |
| **Cloudflare Quick Tunnel** | Efímero (la URL cambia con cada reinicio)                           | Gratuito                   | Ninguna: instala `cloudflared` automáticamente               |
| **ngrok**                   | Estable mientras haya configurado un plan de pago o un dominio fijo | Nivel gratuito + pago      | Requiere una cuenta de ngrok + authtoken                     |
| **Tailscale Funnel**        | Estable por nodo dentro de tu tailnet                               | Gratuito para uso personal | Requiere instalar Tailscale + iniciar sesión + ACL de Funnel |

Las implementaciones se encuentran en `src/lib/cloudflaredTunnel.ts`,
`src/lib/ngrokTunnel.ts` y `src/lib/tailscaleTunnel.ts`. Las tres devuelven un
objeto `status` con la misma estructura y los campos `phase`, `running`, `publicUrl`,
`apiUrl`, `targetUrl` y `lastError`, de modo que el panel de control pueda mostrarlas de manera uniforme.

## 1. Cloudflare Tunnel (Quick Tunnel + Named Tunnel)

`src/lib/cloudflaredTunnel.ts` ejecuta `cloudflared` como proceso secundario. Admite
dos modos, seleccionados en función de si se proporciona una configuración de túnel con nombre:

- **Túnel rápido (predeterminado).** Ejecuta `cloudflared tunnel --url
http://localhost:<apiPort>` y extrae de stdout la URL `*.trycloudflare.com`
  asignada. Las URL son efímeras y cambian con cada reinicio.
- **Túnel con nombre (opcional).** Cuando `CLOUDFLARED_CONFIG` apunta a un
  `config.yml` de cloudflared gestionado localmente, OmniRoute ejecuta `cloudflared tunnel --no-autoupdate
--config <path> run`, lo que proporciona un **nombre de host estable y con nombre**. La configuración
  proporciona el UUID del túnel, `credentials-file` y el enrutamiento `ingress`, por lo que no
  se pasa `--url` ni se requiere un token del panel de control de Zero Trust. `run` lee
  las credenciales desde la ruta absoluta de `credentials-file` especificada en la configuración; no se necesita `cert.pem`
  (solo se utiliza para gestionar el ciclo de vida del túnel).

Comportamientos principales:

- **Instalación automática.** En el primer uso, OmniRoute descarga el binario
  `cloudflared` más reciente de las versiones oficiales de GitHub (la instalación
  gestionada se almacena en `DATA_DIR/cloudflared/`). Antes de ejecutarlo, se verifica
  el SHA256 del recurso descargado comparándolo con el manifiesto de la versión.
- **Supervisión de procesos.** El PID de cloudflared y la URL resuelta se guardan en
  `quick-tunnel-state.json` para que el panel de control pueda recuperar el estado después de recargarse.

### Configuración de un túnel con nombre (nombre de host estable)

1. Crea un túnel gestionado localmente mediante la CLI de cloudflared (una sola vez):

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. Crea un archivo `~/.cloudflared/config.yml` que dirija tu nombre de host al puerto
   de la API local de OmniRoute (20128 de forma predeterminada):

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. Indica a OmniRoute la configuración y (re)inicia el túnel:

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # opcional: sustituye el nombre de host que comunica OmniRoute; de lo contrario, se lee de la
   # primera regla ingress de la configuración:
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Habilita el túnel de la misma manera que un túnel rápido (REST/panel de control/CLI
   a continuación). Un túnel con nombre no emite ninguna URL pública que se pueda extraer, por lo que la disponibilidad se detecta
   a partir de la conexión perimetral registrada de cloudflared, y `publicUrl`/`apiUrl` se
   obtienen de `CLOUDFLARED_HOSTNAME` (o del nombre de host de la primera regla ingress de la configuración).

### Habilitar/deshabilitar mediante REST

El endpoint utiliza un cuerpo `{action: "enable" | "disable"}`, no rutas
`start`/`stop` independientes. Se requiere autenticación de gestión (sesión de administrador o clave de API de administrador).

```bash
# Habilitar
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Estado
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# Deshabilitar
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

O mediante el panel de control: **Settings → Tunnels → Cloudflare**.

### Variables de entorno opcionales

| Variable                                             | Propósito                                                                                                                                                                                                  |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | Sobrescribe la ruta del binario. Si está definida y es válida, OmniRoute la utiliza en lugar de descargarlo.                                                                                               |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | Protocolo de transporte (valor predeterminado: `http2`; también `quic`, `auto`).                                                                                                                           |
| `CLOUDFLARED_CONFIG`                                 | Ruta a un archivo `config.yml` de cloudflared administrado localmente. Cuando se define, OmniRoute ejecuta un túnel **con nombre/persistente** (`tunnel --config <path> run`) en lugar de un túnel rápido. |
| `CLOUDFLARED_HOSTNAME`                               | Sobrescribe el nombre de host público indicado por el túnel con nombre (p. ej., `ai.example.com`). Si no se define, se lee del primer nombre de host de `ingress` en la configuración.                     |

## 2. ngrok

`src/lib/ngrokTunnel.ts` utiliza el **SDK `@ngrok/ngrok`** (en el proceso, sin
subprocesos de la CLI). El módulo nativo se importa de forma diferida en el
primer inicio para que las plataformas sin binarios precompilados no provoquen
un fallo de la aplicación durante el arranque.

### Requisitos previos

1. Regístrate en <https://ngrok.com>.
2. Copia tu authtoken desde el panel de ngrok.
3. Proporciónalo mediante una de estas opciones:
   - `.env`: `NGROK_AUTHTOKEN=<token>`, o
   - Panel: **Settings → Tunnels → ngrok**, o
   - Cuerpo REST (de un solo uso): `{"action":"enable","authToken":"<token>"}`.

Si no se configura ninguna opción, el estado devuelve `phase: "needs_auth"`.

### Activar / desactivar mediante REST

```bash
# Activar (utiliza NGROK_AUTHTOKEN del entorno)
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# Activar con un token en línea
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# Estado
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# Desactivar
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

La respuesta incluye la `publicUrl` asignada (por ejemplo,
`https://abcd-1234.ngrok-free.app`). Los dominios personalizados, las regiones
y las reglas de políticas deben configurarse en el panel de ngrok; OmniRoute
solo reenvía la URL de destino local al SDK.

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` coordina la CLI `tailscale` del sistema para exponer
el puerto de la API local mediante **Funnel** (la salida a Internet pública de
Tailscale para serve). Admite el ciclo de vida completo: instalación, inicio de
sesión, inicio del daemon, activación y desactivación.

La implementación invoca `tailscale funnel --bg <port>` (modo en segundo plano).
La URL pública tiene el formato `https://<machine>.<tailnet>.ts.net/`.

### Requisitos previos

1. Instala Tailscale (o deja que OmniRoute lo haga; consulta el endpoint
   `install` a continuación).
2. Inicia sesión (`tailscale login` o mediante el endpoint `login` de OmniRoute).
3. Activa Funnel para tu tailnet en la consola de administración de Tailscale:
   <https://login.tailscale.com/admin/settings/features>.

En Linux y macOS, el daemon (`tailscaled`) requiere `sudo` para su control. Los
endpoints POST aceptan un campo opcional `sudoPassword`, que se reenvía a la
caché de contraseñas MITM de OmniRoute (`getCachedPassword` /
`setCachedPassword`) durante la llamada. Windows utiliza la instalación de
servicio predeterminada en `C:\Program Files\Tailscale\tailscale.exe`.

### Endpoints REST

Tailscale tiene una superficie más amplia que los demás backends porque la
instalación, el inicio de sesión, el daemon y el túnel son aspectos separados.

| Endpoint                              | Método | Propósito                                                                      |
| ------------------------------------- | ------ | ------------------------------------------------------------------------------ |
| `/api/tunnels/tailscale`              | `GET`  | Estado agregado del túnel (`phase`, `tunnelUrl`, `apiUrl`, etc.)               |
| `/api/tunnels/tailscale/check`        | `GET`  | Comprobación de bajo nivel: ¿instalado? ¿sesión iniciada? ¿daemon activo?      |
| `/api/tunnels/tailscale/install`      | `POST` | Instalar Tailscale (eventos de progreso transmitidos por SSE): Linux/macOS     |
| `/api/tunnels/tailscale/start-daemon` | `POST` | Iniciar `tailscaled` en Linux/macOS                                            |
| `/api/tunnels/tailscale/login`        | `POST` | Iniciar el flujo de acceso; devuelve la `authUrl` para abrirla en un navegador |
| `/api/tunnels/tailscale/enable`       | `POST` | Iniciar Funnel para el puerto de la API                                        |
| `/api/tunnels/tailscale/disable`      | `POST` | Detener Funnel                                                                 |

Todos los endpoints de Tailscale requieren autenticación de administración
(consulta `routeUtils.ts :: requireTailscaleAuth`).

Ejemplo de activación:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

Si Funnel no está activado en la consola de administración, la respuesta
incluye `funnelNotEnabled: true` junto con una `enableUrl` para abrirla en un
navegador.

### Variables de entorno opcionales

| Variable        | Propósito                                    |
| --------------- | -------------------------------------------- |
| `TAILSCALE_BIN` | Sobrescribir la ruta del binario `tailscale` |

## Resumen de endpoints

| Endpoint                              | Método | Cuerpo                              | Autenticación |
| ------------------------------------- | ------ | ----------------------------------- | ------------- |
| `/api/tunnels/cloudflared`            | `GET`  | —                                   | gestión       |
| `/api/tunnels/cloudflared`            | `POST` | `{action: "enable" \| "disable"}`   | gestión       |
| `/api/tunnels/ngrok`                  | `GET`  | —                                   | gestión       |
| `/api/tunnels/ngrok`                  | `POST` | `{action, authToken?}`              | gestión       |
| `/api/tunnels/tailscale`              | `GET`  | —                                   | gestión       |
| `/api/tunnels/tailscale/check`        | `GET`  | —                                   | gestión       |
| `/api/tunnels/tailscale/install`      | `POST` | `{sudoPassword?}` (SSE)             | gestión       |
| `/api/tunnels/tailscale/start-daemon` | `POST` | `{sudoPassword?}`                   | gestión       |
| `/api/tunnels/tailscale/login`        | `POST` | `{hostname?}`                       | gestión       |
| `/api/tunnels/tailscale/enable`       | `POST` | `{sudoPassword?, hostname?, port?}` | gestión       |
| `/api/tunnels/tailscale/disable`      | `POST` | `{sudoPassword?}`                   | gestión       |

No existe un endpoint central `/api/settings/tunnels`; cada backend es
independiente.

## Consideraciones sobre la devolución de llamada de OAuth

Cuando exponga OmniRoute mediante un túnel, el panel y los flujos de OAuth deben
crear las URL de devolución de llamada usando el nombre de host **público**, no
`localhost`. De lo contrario, el proveedor de OAuth redirige al usuario a una
URL a la que sus servidores no pueden acceder y el protocolo de enlace falla.

Las modificaciones del panel y el guardado de la configuración no requieren
fijar el nombre de host del túnel en `NEXT_PUBLIC_BASE_URL`. El panel autenticado
envía solicitudes no seguras al mismo origen con un token CSRF vinculado a la
sesión, por lo que los hosts efímeros de Cloudflare Quick Tunnel pueden seguir
utilizándose para la gestión normal de la interfaz tras iniciar sesión.

Establezca:

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

y reinicie OmniRoute antes de iniciar OAuth. En los Cloudflare Quick Tunnels
efímeros, la URL cambia después de cada reinicio, por lo que para el uso de OAuth
en producción es preferible usar ngrok con un dominio reservado o Tailscale
Funnel.

## Estado y monitorización

El panel muestra el estado de los túneles en **Configuración → Túneles**:

- Los backends activos y la `phase` actual (`stopped`, `starting`, `running`,
  `needs_auth`, `error`).
- La URL pública actual y la URL de la API derivada (`<publicUrl>/v1`).
- La URL del destino local al que el túnel reenvía el tráfico.
- El último mensaje de error, si lo hay.

Para la monitorización programática, consulte periódicamente los endpoints `GET`
de cada backend. Se permite ejecutar más de un backend simultáneamente;
OmniRoute realizará el seguimiento de cada uno de forma independiente.

## Solución de problemas

### «No se encontró el binario cloudflared»

OmniRoute intenta instalarlo automáticamente la primera vez que se utiliza. Si
la instalación está bloqueada (red restringida o sin acceso a GitHub), descargue
`cloudflared` manualmente desde
<https://github.com/cloudflare/cloudflared/releases> y establezca
`CLOUDFLARED_BIN=/path/to/cloudflared`.

### «ngrok: se requiere un authtoken»

`phase: "needs_auth"` significa que no se encontró ningún authtoken. Establezca
`NGROK_AUTHTOKEN` en `.env`, configúrelo desde el panel o pase `authToken` en el
cuerpo de la solicitud POST de activación.

### «tailscale: funnel no está habilitado»

Cuando la respuesta de activación incluya `funnelNotEnabled: true`, Funnel estará
deshabilitado para su tailnet. Abra la `enableUrl` devuelta (o la página de la
función en la consola de administración) y active Funnel.

### Los cambios en la URL del túnel interrumpen OAuth

Use ngrok con un dominio reservado o Tailscale Funnel (ambos son estables por
nodo). Los Cloudflare Quick Tunnels son efímeros por diseño y no se recomiendan
para devoluciones de llamada de OAuth de larga duración.

### Permiso denegado en Linux/macOS para Tailscale

`tailscaled` necesita privilegios de root. Proporcione `sudoPassword` al endpoint
POST correspondiente o ejecute usted mismo el daemon
(`sudo systemctl start tailscaled`).

## Véase también

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — proxy saliente (1proxy, SOCKS5, HTTP) para el
  tráfico de salida.
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — lista completa de variables de entorno, incluida
  `NEXT_PUBLIC_BASE_URL`.
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md),
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — alternativas a los túneles para un
  alojamiento público estable.
- Código fuente: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`,
  `src/app/api/tunnels/`.
