# 🐳 Docker Guide — OmniRoute (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/DOCKER_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/DOCKER_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/DOCKER_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/DOCKER_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/DOCKER_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/DOCKER_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/DOCKER_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/DOCKER_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/DOCKER_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/DOCKER_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/DOCKER_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/DOCKER_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/DOCKER_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/DOCKER_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/DOCKER_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/DOCKER_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/DOCKER_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/DOCKER_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/DOCKER_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/DOCKER_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/DOCKER_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/DOCKER_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/DOCKER_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/DOCKER_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/DOCKER_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/DOCKER_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/DOCKER_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/DOCKER_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/DOCKER_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/DOCKER_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/DOCKER_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/DOCKER_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/DOCKER_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/DOCKER_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/DOCKER_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/DOCKER_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/DOCKER_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/DOCKER_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/DOCKER_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/DOCKER_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/DOCKER_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/DOCKER_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/DOCKER_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/DOCKER_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/DOCKER_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/DOCKER_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/DOCKER_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/DOCKER_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/DOCKER_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/DOCKER_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/DOCKER_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/DOCKER_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/DOCKER_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/DOCKER_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/DOCKER_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/DOCKER_GUIDE.md)

---

> Referencia completa para el despliegue con Docker. Para comenzar rápidamente, consulta la [sección de Docker del README](../README.md#-docker).

## Tabla de contenidos

- [Ejecución rápida](#quick-run)
- [Con archivo de entorno](#with-environment-file)
- [Docker Compose](#docker-compose)
- [Perfiles disponibles](#available-profiles)
- [Configuración de las herramientas CLI del host cuando OmniRoute se ejecuta en Docker](#configuring-host-cli-tools-when-omniroute-runs-in-docker)
- [Contenedor auxiliar de Redis](#redis-sidecar)
- [Compose para producción](#production-compose)
- [Etapas del Dockerfile](#dockerfile-stages)
- [Variables de entorno críticas](#critical-environment-variables)
- [Docker Compose con Caddy (HTTPS)](#docker-compose-with-caddy-https-auto-tls)
- [Túnel rápido de Cloudflare](#cloudflare-quick-tunnel)
- [Etiquetas de imagen](#image-tags)
- [Disponibilidad: SQLite predeterminado admite una sola réplica](#availability-default-sqlite-is-single-replica)
- [Errores regionales de Gemini dentro de Docker](#gemini-regional-errors-inside-docker)
- [Notas importantes](#important-notes)

---

## Ejecución rápida

> **¿Alojamiento propio con un solo comando?** Consulta la
> [Guía de alojamiento propio](../getting-started/SELF_HOST_GUIDE.md) —
> `docker compose -f docker-compose.selfhost.yml up -d` (imagen publicada +
> Redis, solo en la interfaz de loopback, sin selección de perfil). La ejecución rápida que aparece a continuación es la
> opción de contenedor único para usuarios que ya ejecutan Redis en otro lugar.

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Con archivo de entorno

```bash
# Primero, copia y edita .env
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --stop-timeout 40 \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

## Docker Compose

```bash
# Perfil base (sin herramientas CLI)
docker compose --profile base up -d

# Perfil CLI (Claude Code, Codex y OpenClaw integrados)
docker compose --profile cli up -d

# Perfil del host (principalmente para Linux; monta los binarios CLI del host en modo de solo lectura)
docker compose --profile host up -d

# Perfil web (Chromium/Playwright para proveedores de sesiones web)
docker compose --profile web up -d

# Combinar CLI + contenedor auxiliar CLIProxyAPI
docker compose --profile cli --profile cliproxyapi up -d
```

## Perfiles disponibles

OmniRoute incluye perfiles de Compose para las principales modalidades de despliegue. Elige el que se adapte a tu entorno.

| Perfil                  | Servicio         | Cuándo usarlo                                                                                                                                                                | Comando                                      |
| ----------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| `base` (predeterminado) | `omniroute-base` | Servidor sin interfaz gráfica / entorno de ejecución mínimo, sin CLI de proveedores incluidas                                                                                | `docker compose --profile base up -d`        |
| `cli`                   | `omniroute-cli`  | Flujos de trabajo agénticos que ejecutan `omniroute providers/setup/doctor` y las CLI incluidas (Codex, Claude Code, Droid, OpenClaw)                                        | `docker compose --profile cli up -d`         |
| `host`                  | `omniroute-host` | Hosts Linux que necesitan un acceso similar a `network_mode` a las CLI del host mediante el montaje de `~/.local/bin`, `~/.codex`, `~/.claude`, etc. en modo de solo lectura | `docker compose --profile host up -d`        |
| `cliproxyapi`           | `cliproxyapi`    | Ejecuta el contenedor auxiliar [CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI) en el puerto `8317` para el proxy ascendente de las CLI                           | `docker compose --profile cliproxyapi up -d` |
| `web`                   | `omniroute-web`  | Proveedores de sesiones web que necesitan un navegador: `gemini-web`, `claude-web`, `claude-turnstile` (compila `runner-web`, incluye Chromium)                              | `docker compose --profile web up -d`         |

> Se pueden combinar varios perfiles: `docker compose --profile cli --profile cliproxyapi up -d`.

## Configuración de herramientas CLI del host cuando OmniRoute se ejecuta en Docker

`omniroute setup-codex`, `setup-claude`, `config set <tool>` y el botón
**Guardar configuración** del panel escriben archivos como `~/.codex/*.config.toml`. Esas rutas
solo tienen sentido en la máquina donde realmente se ejecuta la CLI. Si ejecuta
estos comandos dentro del contenedor, la escritura se realiza en el directorio personal del propio contenedor (`/home/node` —
la imagen se ejecuta con `USER node`), donde ninguna CLI del host llegará a leerla y donde se
descartará en cuanto se vuelva a crear el contenedor.

OmniRoute detecta esta situación y rechaza la escritura proporcionando instrucciones, en lugar de
informar de un éxito que no puede aprovechar: la CLI finaliza con `2` y la API responde con `422`
y `containerEphemeralTarget: true`.

### Recomendado: ejecute la CLI en el host y OmniRoute en Docker

El contenedor proporciona la API; la CLI configura las herramientas del host.

```bash
docker compose --profile base up -d

npm install -g omniroute
omniroute connect http://localhost:20128   # apunte la CLI al contenedor
omniroute setup-codex                      # escribe en el ~/.codex real del host
```

Esta es la opción adecuada cuando Codex, Claude Code, Cursor o herramientas similares se ejecutan en su
portátil, que es la configuración habitual.

### Alternativa: monte mediante bind los directorios de configuración del host (perfil `host`)

Si desea que el propio contenedor escriba la configuración del host, monte los
directorios y haga que `CLI_CONFIG_HOME` apunte a la raíz del montaje. El perfil `host`
ya lo hace:

```yaml
environment:
  - CLI_CONFIG_HOME=/host-home
  - CLI_ALLOW_CONFIG_WRITES=true
volumes:
  - ~/.codex:/host-home/.codex:rw
  - ~/.claude:/host-home/.claude:rw
```

Un montaje bind es lo que hace que la ruta sea fiable: OmniRoute lee
`/proc/self/mountinfo` y permite escrituras en rutas montadas (y en directorios
cuyos elementos secundarios sean montajes, que es exactamente la estructura de `/host-home` mostrada arriba), mientras
sigue rechazándolas en rutas no montadas.

### Vía de escape: configure las CLI del propio contenedor (utilícela con moderación)

Cuando las CLI se encuentran realmente dentro del contenedor (el perfil `cli`), la escritura
es intencionada. Pase `--allow-container-write` a cualquier comando `setup-*`, o establezca
`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` para el servidor. La escritura se lleva a cabo
con una advertencia de que no persistirá después de eliminar el contenedor.

> **Advertencia de seguridad: perfil `cli` + montaje de `docker.sock`.**
> El perfil `cli` monta mediante bind `/var/run/docker.sock` para que el actualizador
> automático dentro del contenedor pueda volver a crear la pila desde el daemon del host
> (`src/lib/system/autoUpdate.ts` comprueba la presencia de ese socket y omite la
> ruta de Docker cuando no está presente). Ese socket es **un límite de confianza con acceso root
> al host**: cualquier elemento que pueda acceder a él controla el daemon de Docker del host como
> root; puede crear, inspeccionar, detener y eliminar cualquier contenedor del host.
> Implicaciones:
>
> 1. **Nunca exponga a la red el puerto del perfil `cli`.** Publíquelo
>    en `127.0.0.1` (`ports: "127.0.0.1:${DASHBOARD_PORT:-20128}:..."`)
>    — un perfil `cli` accesible desde la LAN convierte cualquier RCE a nivel del panel en
>    un control total del host.
> 2. **No monte mediante bind ningún directorio adicional del host en el perfil `cli`.**
>    El socket de Docker junto con cualquier montaje adicional proporciona al contenedor acceso completo
>    de lectura y escritura al sistema de archivos y a la configuración del host. Si necesita que una herramienta
>    vea un proyecto, ejecútela localmente con el binario de la CLI; no lo monte
>    en el contenedor `cli`.
>
> Si no necesita actualizaciones automáticas dentro del contenedor, no active el perfil `cli`
> (`COMPOSE_PROFILES=core,redis` o una variante más corta). Los demás perfiles no
> montan el socket de Docker.
>
> Consulte `docs/security/MITM-TPROXY-DECRYPT.md` (git; no se compila en `/docs`) para conocer el modelo de amenazas relacionado
> con MITM, y `docs/security/SUPPLY_CHAIN.md` para conocer la cadena de procedencia de los binarios
> `codex`/`claude-code`/`droid`/`openclaw`.

## Sidecar de Redis

OmniRoute depende de Redis como soporte para el limitador de velocidad distribuido y la caché compartida. El servicio `redis` está **siempre definido** en `docker-compose.yml` (no está condicionado por ningún perfil) y se inicia junto con cualquier otro perfil.

| Detalle                        | Valor                                                 |
| ------------------------------ | ----------------------------------------------------- |
| Imagen                         | `redis:7-alpine`                                      |
| Nombre del contenedor          | `omniroute-redis`                                     |
| Puerto interno                 | `6379`                                                |
| Puerto del host (configurable) | `REDIS_PORT` (valor predeterminado: `6379`)           |
| Enlace al host (configurable)  | `REDIS_BIND_HOST` (valor predeterminado: `127.0.0.1`) |
| Volumen                        | `omniroute-redis-data` → `/data`                      |
| Comprobación de estado         | `redis-cli ping` (intervalo de 10 s)                  |

Variables de entorno relacionadas:

- `REDIS_URL` — cadena de conexión inyectada en la aplicación (`redis://redis:6379` de forma predeterminada).
- `REDIS_PORT` — asignación de puertos del lado del host para el contenedor de Redis.
- `REDIS_BIND_HOST` — interfaz del host en la que se publica el puerto. El valor predeterminado es `127.0.0.1`.

> **Por qué se usa la interfaz de bucle invertido de forma predeterminada:** el sidecar se ejecuta sin `requirepass`, y los contenedores de la aplicación
> acceden a él a través de la red de Compose (`redis:6379`); el puerto publicado
> solo está disponible para herramientas del lado del host (`redis-cli`, un `npm run dev` local). Publicarlo en
> `0.0.0.0` expondría un Redis sin autenticación a todos los hosts de su LAN. Si establece
> `REDIS_BIND_HOST=0.0.0.0`, añada también `--requirepass` al `command:` del servicio.

**No se recomienda deshabilitar Redis** (el limitador de velocidad pasará a usar una alternativa en memoria con funcionalidad reducida). Si es necesario, elimine o comente el bloque del servicio `redis:` en `docker-compose.yml`, o escálelo a cero:

```bash
docker compose up -d --scale redis=0
```

## Compose de producción

Para ejecutar una instantánea de producción aislada junto al entorno de desarrollo, use `docker-compose.prod.yml`.

| Detalle                         | Valor                                                                                       |
| ------------------------------- | ------------------------------------------------------------------------------------------- |
| Archivo                         | `docker-compose.prod.yml`                                                                   |
| Puerto predeterminado del panel | `PROD_DASHBOARD_PORT=20130` (asignado internamente a `${DASHBOARD_PORT:-20128}`)            |
| Puerto predeterminado de la API | `PROD_API_PORT=20131`                                                                       |
| Imagen                          | `omniroute:prod` (compilada a partir del objetivo `runner-cli`)                             |
| Contenedor de Redis             | `omniroute-redis-prod` (`redis:8.6.2`, volumen dedicado `redis-prod-data`)                  |
| Volumen de datos                | `omniroute-prod-data` (con nombre, persistente entre compilaciones)                         |
| Comprobaciones de estado        | `node healthcheck.mjs` + `redis-cli ping`, con `depends_on` condicionado al estado de Redis |

Cómo usarlo:

```bash
# Compilar e iniciar la pila de producción
docker compose -f docker-compose.prod.yml up -d --build

# Transmitir los registros
docker compose -f docker-compose.prod.yml logs -f

# Detener y eliminar la pila (conservar los volúmenes)
docker compose -f docker-compose.prod.yml down
```

La pila de producción se ejecuta en paralelo con el entorno de Compose de desarrollo (con nombres de contenedores, puertos y volúmenes diferentes), por lo que puede seguir realizando iteraciones localmente mientras producción permanece activa.

## Etapas del Dockerfile

El repositorio incluye un Dockerfile multietapa (`Dockerfile`). Se exponen cuatro etapas; elige el `target` adecuado para tu caso de uso.

| Etapa         | Imagen base           | Propósito                                                                                                                                                                                                                                                                                                          |
| ------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `builder`     | `node:26-trixie-slim` | Instala las dependencias (`npm ci --legacy-peer-deps`) y ejecuta `npm run build` (Turbopack de forma predeterminada; consulta Recursos de compilación más abajo)                                                                                                                                                   |
| `runner-base` | `node:26-trixie-slim` | Entorno de ejecución de producción con la salida independiente de Next.js. **No incluye las CLI de proveedores.**                                                                                                                                                                                                  |
| `runner-cli`  | `runner-base`         | Añade `git`, `docker.io`, `docker-compose` y las CLI globales: `@openai/codex`, `@anthropic-ai/claude-code`, `droid`, `openclaw`. **Elige esta opción para flujos de trabajo con agentes.**                                                                                                                        |
| `runner-web`  | `runner-base`         | Añade Playwright y un navegador Chromium (`--with-deps`) para proveedores de sesiones web: `gemini-web`, `claude-web`, `claude-turnstile`. **Elige esta opción cuando uses esos proveedores**; la imagen básica falla al recibir una solicitud sin ella (consulta la nota sobre `-web` en Canales de publicación). |

Compila manualmente un `target` específico:

```bash
docker build --target runner-base -t omniroute:base .
docker build --target runner-cli  -t omniroute:cli  .
docker build --target runner-web  -t omniroute:web  .
```

### Recursos de compilación

Tres argumentos de compilación controlan el coste de la etapa `builder`. Solo se aplican durante la compilación;
`OMNIROUTE_MEMORY_MB` (más abajo) es un parámetro independiente para el entorno de ejecución.

| Argumento de compilación    | Valor predeterminado | Efecto                                                                                                      |
| --------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_USE_TURBOPACK`   | `0`                  | `0` compila con webpack: menor pico de memoria, pero más lento. `1` activa Turbopack.                       |
| `OMNIROUTE_BUILD_MEMORY_MB` | `6144`               | Límite del heap de V8 (`--max-old-space-size`) para el proceso `next build` iniciado.                       |
| `OMNIROUTE_BUILD_WORKERS`   | `2`                  | Proporciona el valor de `CIRCLE_NODE_TOTAL`; Next deriva `workers = N - 1` para recopilar datos de páginas. |

`OMNIROUTE_BUILD_WORKERS` es el parámetro que debes aumentar en un sistema de compilación potente y el primero
que debes revisar cuando una compilación con recursos limitados falla **después de** `✓ Compiled successfully`. Cada
worker de datos de páginas es un proceso independiente, al igual que el propio proceso padre `next build`;
una reproducción en un VPS real (incidencia #7518) midió el pico de RSS de cada proceso en
~4.5 GB, independientemente del indicador de heap `NODE_OPTIONS` (Turbopack compila usando
memoria nativa/Rust fuera del heap de V8). El valor predeterminado de `2` (→ 1 worker, 2
procesos en total) está dimensionado para los runners alojados por GitHub con 16 GB/4 vCPU que
utiliza el flujo de publicación. Con `8` (→ 7 workers), ese runner se quedó sin memoria y
buildkit hizo fallar el paso con `ResourceExhausted: ... cannot allocate memory`;
`3` (→ 2 workers) tampoco cabía una vez que el RSS por proceso se midió
directamente en lugar de inferirse. `tests/unit/docker-build-memory-budget.test.ts`
realiza los cálculos con respecto al valor medido y falla si cualquiera de los dos parámetros
supera la capacidad del runner.

Turbopack compila usando memoria nativa de Rust que reside **fuera** del heap de V8, por lo que
`OMNIROUTE_BUILD_MEMORY_MB` no la limita. En un host con un límite de memoria, el
OOM killer finaliza entonces la compilación mediante SIGKILL sin mostrar ningún texto de error:
simplemente se detiene a mitad de `Creating an optimized production build`, lo que parece un bloqueo
en lugar de un agotamiento de memoria. Por eso el `Dockerfile` utiliza webpack de forma predeterminada
(`OMNIROUTE_USE_TURBOPACK=0`), a diferencia de `npm run dev` / `npm run build`, donde
Turbopack es el valor predeterminado del código: un simple `docker build .` sin argumentos de compilación (lo que
ejecutan Railway y otros hosts de instalación con un clic) no debe finalizar silenciosamente en un
sistema de compilación con memoria limitada. Las imágenes publicadas ya pasan
`OMNIROUTE_USE_TURBOPACK=0` explícitamente en `docker-publish.yml`. En un sistema de compilación con
mucha RAM, activa Turbopack para obtener una compilación más rápida:

```bash
docker build --target runner-base \
  --build-arg OMNIROUTE_USE_TURBOPACK=1 \
  -t omniroute:base .
```

`webpackBuildWorker` está habilitado, por lo que `next build` ejecuta un proceso padre **y** un proceso
worker, y cada uno respeta `OMNIROUTE_BUILD_MEMORY_MB` por separado. Configura el límite del contenedor
por encima de aproximadamente el doble de ese valor, no una sola vez.

Mediciones realizadas en este árbol (`--target runner-base`, `OMNIROUTE_BUILD_MEMORY_MB=6144`):

| Empaquetador | Límite del contenedor | Resultado                                         |
| ------------ | --------------------- | ------------------------------------------------- |
| Turbopack    | 8 GiB / 16 GiB        | finalizado por OOM en ambos casos, sin avisar     |
| webpack      | 8 GiB                 | worker de compilación finalizado mediante SIGKILL |
| webpack      | 12 GiB                | completado, con un pico de 11.1 GiB               |

### Valores predeterminados del entorno de ejecución

Valores predeterminados exportados por `runner-base`: `PORT=20128`, `HOSTNAME=0.0.0.0`, `OMNIROUTE_MEMORY_MB=1024`, `NODE_OPTIONS=--max-old-space-size=1024`, `DATA_DIR=/app/data`, `OMNIROUTE_MIGRATIONS_DIR=/app/migrations`.

Comportamiento de la memoria en Docker:

- La imagen establece `OMNIROUTE_MEMORY_MB=1024` y deriva `NODE_OPTIONS=--max-old-space-size=1024` a partir de esta variable.
- El proceso real del servidor se inicia mediante el lanzador independiente, que lee `OMNIROUTE_MEMORY_MB` y añade `--max-old-space-size=<OMNIROUTE_MEMORY_MB>`.
- Node utiliza el último valor repetido de `--max-old-space-size`, por lo que establecer `OMNIROUTE_MEMORY_MB` controla el límite efectivo del heap en Docker.
- Debido a que la imagen siempre establece esta variable, el valor de reserva del propio lanzador, calibrado según la RAM, nunca se aplica en Docker. Auméntelo explícitamente según la carga de trabajo (tabla siguiente). `2048` sigue siendo demasiado poco para `/v1/responses` de agentes de programación.

### RAM de ejecución para agentes de programación

El valor predeterminado de Docker de 1 GiB es un mínimo para el panel y chats ligeros, no un tamaño para producción. Los cuerpos extensos de `POST /v1/responses` (cientos de mensajes, decenas de herramientas) mantienen varios grafos en memoria durante la compresión. Dos solicitudes simultáneas de ~3 MiB / ~750k tokens han provocado la interrupción de V8 con un espacio antiguo de **12 GiB** (`FATAL ERROR: Reached heap limit`) y también han causado un OOM del cgroup con 16 GiB. Consulte [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849).

Dimensione la **`--memory` del cgroup por encima del heap**: los búferes nativos, SQLite y los datos intermedios de compresión residen fuera de V8.

| Carga de trabajo                                   | `OMNIROUTE_MEMORY_MB`                | Contenedor / cgroup  | Notas                                                                                                                             |
| -------------------------------------------------- | ------------------------------------ | -------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Panel, un chat ligero                              | `1024` (predeterminado de la imagen) | ≥2 GiB               |                                                                                                                                   |
| Un agente de programación (Claude/Codex/Grok)      | `8192`                               | ≥10 GiB              | Sesión individual típica de `/v1/responses`                                                                                       |
| Dos solicitudes `/v1/responses` largas simultáneas | `10240`–`12288`                      | ≥12–16 GiB           | Interrupción de V8 medida con un heap de ~12 GiB                                                                                  |
| Tres o más contextos largos simultáneos            | no usar en un solo proceso           | serializar / más RAM | La admisión predeterminada de cargas pesadas es de 1 solicitud en curso; aumentarla sin más RAM vuelve a provocar la interrupción |

`omniroute serve` en un servidor físico calibra aproximadamente el 35 % de la RAM (limitado a `[512, 4096]`) cuando `OMNIROUTE_MEMORY_MB` **no está establecida**. Docker siempre establece `1024`, por lo que esa calibración nunca se ejecuta en la imagen oficial.

```bash
docker run -d --name omniroute --restart unless-stopped --stop-timeout 40 \
  -e OMNIROUTE_MEMORY_MB=8192 --memory=10g \
  -p 127.0.0.1:20128:20128 -v omniroute-data:/app/data diegosouzapw/omniroute:latest
```

## Variables de entorno críticas

Además de los valores predeterminados documentados en [ENVIRONMENT.md](../reference/ENVIRONMENT.md), las siguientes variables son las más importantes al ejecutar bajo Docker:

| Variable                      | Propósito                                                                                                                                                                                                                                                                                                 | Valor predeterminado            |
| ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `OMNIROUTE_WS_BRIDGE_SECRET`  | Secreto compartido para el puente WebSocket. **Obligatorio en producción** — establézcalo como una cadena aleatoria robusta.                                                                                                                                                                              | sin establecer (debe indicarse) |
| `REDIS_URL`                   | Cadena de conexión para el backend del limitador de solicitudes/caché                                                                                                                                                                                                                                     | `redis://redis:6379`            |
| `REDIS_PORT`                  | Puerto del host para el contenedor de Redis incluido                                                                                                                                                                                                                                                      | `6379`                          |
| `REDIS_BIND_HOST`             | Interfaz del host en la que se publica el puerto de Redis incluido (bucle local, salvo que añada AUTH)                                                                                                                                                                                                    | `127.0.0.1`                     |
| `AUTO_UPDATE_HOST_REPO_DIR`   | Ruta del host montada en el perfil `cli` en `/workspace/omniroute` para los flujos de trabajo de actualización automática                                                                                                                                                                                 | `.` (directorio actual)         |
| `OMNIROUTE_MEMORY_MB`         | Límite del heap de Node en tiempo de ejecución para el servidor independiente de Docker; sustituye el valor predeterminado de la imagen indicado anteriormente. Agentes de programación: `8192` o más (consulte la [RAM en tiempo de ejecución](#runtime-ram-for-coding-agents)).                         | `1024`                          |
| `DASHBOARD_PORT` / `API_PORT` | Sustituyen los puertos expuestos del panel de control (20128) y de la API (20129)                                                                                                                                                                                                                         | `20128` / `20129`               |
| `APP_BIND_HOST`               | Interfaz del host en la que docker-compose publica los puertos del panel de control, la API y WebSocket en vivo. Con `REQUIRE_API_KEY=false` (valor predeterminado), `0.0.0.0` expone el proxy anónimo `/v1` a la LAN; amplíe el acceso únicamente con `REQUIRE_API_KEY=true` o un proxy inverso delante. | `127.0.0.1`                     |
| `CLIPROXY_BIND_HOST`          | Interfaz del host en la que docker-compose publica el servicio auxiliar `cliproxyapi`; su volumen de datos contiene las credenciales del proveedor.                                                                                                                                                       | `127.0.0.1`                     |
| `OMNIROUTE_PLUGINS_DIR`       | Directorio que el escáner de plugins en tiempo de ejecución lee y en el que instala. Establézcalo cuando los plugins se monten mediante bind mount: el valor predeterminado depende de `HOME`, que una imagen no tiene por qué exportar.                                                                  | `~/.omniroute/plugins`          |
| `OMNIROUTE_BASE_PATH`         | Subruta de la URL cuando la aplicación se publica detrás de un proxy inverso (p. ej., `/omniroute`)                                                                                                                                                                                                       | _(vacío = raíz)_                |
| `NEXT_PUBLIC_BASE_URL`        | Origen público del navegador, incluida la subruta (p. ej., `https://host/omniroute`)                                                                                                                                                                                                                      | sin establecer                  |
| `PROD_DASHBOARD_PORT`         | Puerto del panel de control en el host para `docker-compose.prod.yml`                                                                                                                                                                                                                                     | `20130`                         |
| `CLIPROXYAPI_PORT`            | Puerto del host para el servicio auxiliar `cliproxyapi`                                                                                                                                                                                                                                                   | `8317`                          |

## Proxy inverso en una subruta (Traefik / nginx)

El `basePath` de Next.js se compila en el paquete independiente. OmniRoute registra el
valor integrado en un archivo centinela en la raíz de la aplicación (escrito durante
`npm run build`; leído por `scripts/docker/ensure-docker-base-path.mjs`) y lo compara con
`OMNIROUTE_BASE_PATH` cuando se inicia el contenedor. Cuando son diferentes y la imagen
se creó para la raíz del dominio, el punto de entrada reescribe los manifiestos
independientes, los literales `basePath`/`assetPrefix` integrados (Next 16 genera las URL
de los recursos SSR únicamente a partir de `assetPrefix`; el parcheador replica la
subruta en él), las URL de recursos `/_next/static` integradas (manifiestos de
referencias del cliente, importaciones de medios y páginas de error pregeneradas) y el
shim de `process.env` del cliente antes de que se ejecute
`node dev/run-standalone.mjs`.

### Compilación con Compose (recomendado)

Establezca ambas variables en `.env` y, a continuación, vuelva a compilar para que la
imagen y el entorno de ejecución coincidan:

```bash
# .env
OMNIROUTE_BASE_PATH=/omniroute
NEXT_PUBLIC_BASE_URL=https://myhostname.example.com/omniroute
```

```bash
docker compose --profile base up -d --build
```

`docker-compose.yml` reenvía `OMNIROUTE_BASE_PATH` como argumento de compilación de
Docker y como variable de entorno en tiempo de ejecución.

### Imagen raíz precompilada + subruta en tiempo de ejecución

Las imágenes publicadas `diegosouzapw/omniroute:*` se compilan para la raíz del dominio.
Aun así, puede establecer `OMNIROUTE_BASE_PATH` en tiempo de ejecución; el contenedor
parchea el paquete una vez durante el inicio. Úselo junto con el origen público
correspondiente:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    environment:
      OMNIROUTE_BASE_PATH: /omniroute
      NEXT_PUBLIC_BASE_URL: https://myhostname.example.com/omniroute
```

Configure el proxy inverso para que reenvíe la ruta externa **completa** (no elimine el
prefijo). Traefik debe enrutar `PathPrefix(`/omniroute`)` al contenedor sin
`StripPrefix`, de modo que Next.js reciba `/omniroute/...` y sirva los recursos desde
`/omniroute/_next/...`.

La comprobación de estado de Docker consulta el endpoint ligero de ciclo de vida
`/healthz`, con el prefijo del `OMNIROUTE_BASE_PATH` activo.
`/api/monitoring/health` sigue estando disponible para diagnósticos humanos o mediante
paneles; para hacer que el HEALTHCHECK del contenedor vuelva a apuntar a este endpoint
(por ejemplo, para aplicar una comprobación de estado exhaustiva), establezca
`OMNIROUTE_HEALTHCHECK_PATH=/api/monitoring/health`. Esa ruta realiza una comprobación
**exhaustiva** (base de datos + resumen de monitorización), adecuada para el
`HEALTHCHECK` poco frecuente de Docker si decide volver a utilizarla, pero **no** para
los intervalos de `livenessProbe` de Kubernetes.

Para orquestadores (Kubernetes, Nomad, etc.):

| Sonda                   | Preferir                                                                         | Evitar                                                                                |
| ----------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Actividad               | HTTP `GET /livez` o TCP en el puerto principal (`PORT`, predeterminado: `20128`) | `/api/monitoring/health` como comprobación de actividad                               |
| Disponibilidad          | HTTP `GET /healthz`                                                              | Tiempos de espera estrictos que interpreten un bucle de eventos ocupado como inactivo |
| Exhaustiva / caja negra | `/api/monitoring/health`                                                         | —                                                                                     |

`/healthz` informa del ciclo de vida del proceso (`ok` / `starting` / `stopping`).
`/livez` solo indica que el proceso está activo (devuelve 200 siempre que el manejador
pueda ejecutarse; no espera a que esté disponible). Ambos siguen ejecutándose en el
mismo bucle de eventos de Node que procesa las solicitudes, por lo que el trabajo de
catálogo o compresión intensivo en CPU puede retrasarlos: ocupado ≠ inactivo. Prefiera
la comprobación de actividad mediante TCP si las sondas HTTP agotan el tiempo de espera.
Guía completa sobre sondas:
[Guía de monitorización — recomendaciones de sondas de Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations).

## Docker Compose con Caddy (HTTPS Auto-TLS)

OmniRoute puede exponerse de forma segura mediante el aprovisionamiento automático de SSL de Caddy. Asegúrate de que el registro A de DNS de tu dominio apunte a la IP de tu servidor.

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:latest
    container_name: omniroute
    restart: unless-stopped
    volumes:
      - omniroute-data:/app/data
    environment:
      - PORT=20128
      # Origen visible para el navegador utilizado en callbacks de OAuth, enlaces del panel y URL públicas generadas.
      - NEXT_PUBLIC_BASE_URL=https://your-domain.com
      # URL interna de servidor a servidor para tareas programadas / solicitudes a sí mismo.
      - BASE_URL=http://omniroute:20128
      - AUTH_COOKIE_SECURE=true

  caddy:
    image: caddy:latest
    container_name: caddy
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    command: caddy reverse-proxy --from https://your-domain.com --to http://omniroute:20128

volumes:
  omniroute-data:
```

Caddy establece las cabeceras de reenvío estándar para el contenedor ascendente. OmniRoute utiliza
`NEXT_PUBLIC_BASE_URL` como origen público canónico para los callbacks de OAuth y los enlaces
públicos generados; las escrituras autenticadas del panel utilizan solicitudes del mismo origen
junto con protección CSRF vinculada a la sesión. Habilita `OMNIROUTE_TRUST_PROXY` únicamente en
implementaciones avanzadas en las que quieras que OmniRoute derive el origen público de cabeceras
de reenvío de confianza en lugar de una configuración explícita.

## Túnel rápido de Cloudflare

La compatibilidad del panel para implementaciones con Docker incluye un **túnel rápido de Cloudflare** que se activa con un solo clic en `Panel → Endpoints`. La primera activación descarga `cloudflared` solo cuando es necesario, inicia un túnel temporal hacia tu endpoint `/v1` actual y muestra la URL `https://*.trycloudflare.com/v1` generada directamente debajo de tu URL pública habitual.

Los paneles de túneles de endpoints (Cloudflare, Tailscale, ngrok) pueden mostrarse u ocultarse desde `Configuración → Apariencia` sin cambiar el estado activo del túnel.

### Notas sobre los túneles

- Las URL de los túneles rápidos son temporales y cambian después de cada reinicio.
- Los túneles rápidos no se restauran automáticamente después de reiniciar OmniRoute o el contenedor. Vuelve a habilitarlos desde el panel cuando sea necesario.
- Actualmente, la instalación administrada es compatible con Linux, macOS y Windows en `x64` / `arm64`.
- Los túneles rápidos administrados utilizan de forma predeterminada el transporte HTTP/2 para evitar advertencias ruidosas sobre el búfer UDP de QUIC en entornos de contenedores restringidos. Establece `CLOUDFLARED_PROTOCOL=quic` o `auto` si quieres utilizar un transporte diferente.
- Las imágenes de Docker incluyen las autoridades de certificación raíz del sistema y se las proporcionan a la instancia administrada de `cloudflared`, lo que evita fallos de confianza TLS cuando el túnel se inicia dentro del contenedor.
- Establece `CLOUDFLARED_BIN=/absolute/path/to/cloudflared` si quieres que OmniRoute utilice un binario existente en lugar de descargar uno.

## Etiquetas de imagen

| Imagen                   | Etiqueta | Tamaño | Descripción                                                       |
| ------------------------ | -------- | ------ | ----------------------------------------------------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Versión SemVer estable **publicada** más reciente (no git `main`) |
| `diegosouzapw/omniroute` | `3.8.0`  | ~250MB | Fija esta clase de etiqueta para GitOps                           |

Manifiesto multiplataforma: `linux/amd64` + `linux/arm64` nativos (Apple Silicon, AWS Graviton, Raspberry Pi). Docker selecciona automáticamente la arquitectura correspondiente; proporciona `--platform linux/amd64` si necesitas forzar la emulación de AMD64 en hosts ARM.

### Canales de lanzamiento

OmniRoute publica canales de Docker independientes para versiones estables, pruebas de la rama de lanzamiento activa y compilaciones de desarrollo.

| Canal                           | Origen                                    | Mutabilidad                       | Uso recomendado                                                                                                                               |
| ------------------------------- | ----------------------------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `:<version>` / `:<version>-web` | Versión firmada/versionada                | Inmutable                         | Implementaciones de producción que fijan una versión exacta                                                                                   |
| `:latest` / `:latest-web`       | SemVer estable **publicada** más reciente | Puntero estable mutable           | Sigue las versiones estables **después** de una tarea de publicación SemVer; **no** sigue `main` ni commits de `release/v*` aún no publicados |
| `:next` / `:next-web`           | Rama `release/v*` predeterminada actual   | Puntero mutable de prelanzamiento | Pruebas de correcciones incorporadas en la rama de lanzamiento activa que aún no forman parte de una versión estable                          |
| `:main` / `:main-web`           | Rama `main`                               | Puntero de desarrollo mutable     | Solo para desarrollo y pruebas de integración                                                                                                 |

#### Proveedores de sesiones web: las imágenes `-web`

Cada canal anterior también está disponible como una etiqueta `-web` (`:latest-web`, `:<version>-web`, `:next-web`, `:main-web`), compilada desde la etapa `runner-web`: la misma imagen, más Playwright y un navegador Chromium. La imagen estándar se distribuye **sin** Chromium; `gemini-web`, `claude-web` y `claude-turnstile` lo necesitan.

El fallo se aplaza y no ocurre durante el inicio: esos proveedores enumeran sus modelos y aparecen como conectados en el panel, y solo la primera solicitud falla con

```
[500]: Failed to load external module playwright: Error: Cannot find module
'/app/node_modules/playwright/node_modules/playwright-core/browsers.json'
```

Si utilizas esos proveedores, descarga la etiqueta `-web` del canal que ya estés utilizando; no cambia nada más. En una instalación mediante npm/CLI (sin imagen de Docker), la pieza equivalente que falta es el binario del navegador: ejecuta `npx playwright install chromium` en el host.

#### Uso del canal de prelanzamiento

El canal `next` se reconstruye con cada envío a la rama predeterminada `release/v*` actual y se publica tanto para AMD64 como para ARM64. Las ramas de mantenimiento anteriores no pueden sobrescribirlo. El canal proporciona una imagen que se puede descargar con las correcciones que se hayan fusionado en la rama de versión activa antes de que se cree la siguiente etiqueta estable.

```bash
docker pull diegosouzapw/omniroute:next
docker pull diegosouzapw/omniroute:next-web
```

Para Docker Compose, sustituya la etiqueta de imagen utilizada por el perfil seleccionado y, a continuación, descargue y vuelva a crear el servicio:

```yaml
services:
  omniroute:
    image: diegosouzapw/omniroute:next
```

```bash
docker compose pull
docker compose up -d
```

#### Seguridad y reversión

`next` es un canal flotante de versión preliminar. Puede cambiar con cualquier envío a la rama de versión activa y **no es compatible con el uso en producción**. Fije el digest de la imagen mientras evalúa una compilación específica:

```bash
docker pull diegosouzapw/omniroute:next
docker image inspect diegosouzapw/omniroute:next --format '{{index .RepoDigests 0}}'
```

Antes de realizar pruebas, haga una copia de seguridad del volumen de datos de OmniRoute o del directorio de datos montado mediante enlace. Para revertir, restaure la versión estable o el digest utilizado anteriormente y vuelva a crear el contenedor:

```bash
docker pull diegosouzapw/omniroute:<stable-version>
docker compose up -d
```

Una compilación de una rama de versión nunca puede actualizar `latest`; únicamente una versión semántica estable apta puede promocionar el puntero estable. Las imágenes `next` conservan la inspección de imágenes de la versión y la comprobación bloqueante de vulnerabilidades CRITICAL.

**`latest` no garantiza la actualización respecto a git.** Las correcciones fusionadas en `main` o en la rama `release/v*` activa **no** se incluyen en `:latest` hasta que se publique una imagen SemVer estable y el trabajo de publicación promocione `:latest` (con el mismo digest que esa versión SemVer). Si `latest` parece estar congelada aunque GitHub ya muestre la corrección, descargue `:next` para probar la rama de versión o espere a la etiqueta SemVer.

| Objetivo                                                                           | Opción                                    |
| ---------------------------------------------------------------------------------- | ----------------------------------------- |
| GitOps / producción que no debe sufrir cambios inesperados                         | Fijar `:X.Y.Z` (o el digest de la imagen) |
| Seguir las versiones estables publicadas y aceptar una recreación con cada versión | `:latest`                                 |
| Probar commits no publicados de `release/v*`                                       | `:next` (no apto para producción)         |
| Probar `main`                                                                      | `:main` (no apto para producción)         |

## Disponibilidad: SQLite predeterminado admite una sola réplica

La configuración estándar de Docker/Kubernetes de OmniRoute consta de **un proceso de Node + un escritor de SQLite**. La alta disponibilidad **no es compatible** con esta topología.

| Restricción                                      | Consecuencia                                                                                                                                                                                                                                                                                                                                                                   |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Un solo escritor                                 | **No** ejecute varias réplicas contra el mismo archivo de SQLite. Esto corrompe la base de datos.                                                                                                                                                                                                                                                                              |
| Recreación/reinicio/finalización por HEALTHCHECK | **Interrupción total** de las conexiones SSE en curso, las sesiones del panel y el estado en memoria. Todos los clientes conectados se desconectan. Las solicitudes nuevas durante el intervalo sin endpoints reciben del proxy inverso un **`502 Bad Gateway: Unknown error`**, no JSON de OmniRoute; los clientes no pueden distinguirlo de un fallo del proveedor (#11015). |
| Mismo bucle de eventos que `/healthz`            | Una iteración con mucha carga del catálogo o de compresión puede retrasar las sondas; un tiempo de espera breve reinicia entonces la **única** réplica.                                                                                                                                                                                                                        |

**Matriz de sondas** (consulte también [Recomendaciones de sondas de Kubernetes](../ops/MONITORING_GUIDE.md#kubernetes-probe-recommendations)):

| Sonda                 | Objetivo                                                              | No usar                                                                               |
| --------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Supervivencia         | TCP en `PORT` (predeterminado: `20128`) o HTTP flexible en `/healthz` | `/api/monitoring/health`                                                              |
| Disponibilidad        | HTTP `GET /healthz`                                                   | Tiempos de espera estrictos que interpreten un bucle de eventos ocupado como inactivo |
| Profunda/para humanos | `/api/monitoring/health`                                              | Comprobación automatizada de supervivencia de kubelet                                 |

**Actualizaciones:** espere que todas las sesiones se desconecten. Drene los clientes si puede; no hay actualizaciones continuas con SQLite predeterminado. La combinación de `restart: unless-stopped` de Compose y `HEALTHCHECK` de Docker también sustituirá el único proceso cuando el contenedor esté en estado Unhealthy, con el mismo alcance del impacto.

Fragmento de Kubernetes para una **sola réplica** (`Recreate` es obligatorio; no aumente `replicas` para un único archivo de SQLite):

```yaml
spec:
  replicas: 1
  strategy:
    type: Recreate
  template:
    spec:
      terminationGracePeriodSeconds: 90
      containers:
        - name: omniroute
          lifecycle:
            preStop:
              exec:
                command: ["/bin/sleep", "15"]
          readinessProbe:
            httpGet:
              path: /healthz
              port: 20128
            periodSeconds: 5
          livenessProbe:
            tcpSocket:
              port: 20128
            periodSeconds: 20
```

La espera de `preStop` permite que kube elimine los endpoints del Service antes de SIGTERM, de modo que el tráfico **nuevo** deje de llegar al proceso que está finalizando. Las conexiones SSE de `/v1/responses` en curso se drenan durante un máximo de `SHUTDOWN_TIMEOUT_MS` (30 s de forma predeterminada) mediante concesiones de admisión de peso pesado (#11015). Las solicitudes nuevas que aún llegan al proceso reciben `503` + `Retry-After: 5`. El intervalo de `Recreate` sin endpoints hasta que el reemplazo esté Ready sigue siendo una interrupción total: se debe a la topología de SQLite, no a una configuración incorrecta de las sondas.

Postgres externo/la alta disponibilidad con múltiples escritores **no** es una vía estándar documentada. Si necesita alta disponibilidad, mantenga una sola réplica o ejecute una topología que el proyecto haya probado y documentado por separado. El trabajo de Postgres/MySQL se encuentra en [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075). Hasta que esté disponible, la única forma compatible de multiplicar la capacidad de solicitudes **grandes** de `/v1/responses` es usar N procesos independientes (sección siguiente), no `replicas > 1` en un único volumen.

## Escalado horizontal: N procesos independientes

Un proceso de Node equivale a **un heap de V8**. Dos solicitudes simultáneas de agente de programación `POST /v1/responses` de ~3 MiB/~750 000 tokens (RTK + Caveman) hacen que ese heap se cierre de forma abrupta al alcanzar ~12 Gi (`FATAL ERROR: Reached heap limit`) y pueden provocar un OOM en un cgroup de 16 Gi. Consulta [#7849](https://github.com/diegosouzapw/OmniRoute/issues/7849). Esa medición es una advertencia sobre el **presupuesto de memoria**, no un límite máximo estricto del producto de dos solicitudes largas simultáneas a `/v1/responses`. La admisión de chats pesados está controlada mediante un presupuesto de bytes de entrada derivado automáticamente (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`, `src/shared/middleware/admissionBudget.ts`), dimensionado a partir de ese mismo límite de V8/cgroup; aumentarlo manualmente (o establecer el límite heredado por número de solicitudes `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT`) en un proceso ya dimensionado vuelve a introducir el cierre abrupto. Los chats pequeños, `/healthz`, `/v1/models` y MCP **no** están incluidos en ese límite.

### Un proceso: más de dos solicitudes largas a `/v1/responses`

Un proceso **saludable** (con el heap por debajo de `OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO`, cuyo valor predeterminado es `0.75`) **puede** ejecutar más de dos solicitudes largas simultáneas `POST /v1/responses` cuando aún queda espacio en el presupuesto de bytes en vuelo para todo el proceso (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110). Los cuerpos con un tamaño igual o superior a `OMNIROUTE_CHAT_LARGE_BODY_BYTES` (256 KiB de forma predeterminada) adquieren la misma concesión de recursos pesados que las solicitudes con estructuras complejas y utilizan el mismo mecanismo de escape `tryAcquireHealthyHeadroom` de [#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) (`OMNIROUTE_CHAT_ADMISSION_HEALTHY_HEADROOM`). Tener decenas de clientes SSE con solicitudes largas simultáneas (los operadores suelen necesitar entre 40 y 50) es una cuestión de **presupuesto de memoria** —dimensiona el heap, las ranuras principales/de margen adicional y `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`—, no un límite estricto del producto de «2 como máximo». Un heap bajo presión continúa rechazando carga con respuestas reintentables `503` para evitar que vuelva a producirse el problema #7849.

Para **multiplicar los heaps** (espacios antiguos de V8 independientes) **actualmente**:

| Haz                                                                                                                                                                                                              | No hagas esto                                                                  |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Ejecuta **N contenedores/pods**, cada uno con su **propio** `DATA_DIR`/volumen                                                                                                                                   | Establecer `replicas > 1` sobre un único archivo SQLite                        |
| Dimensiona las solicitudes pesadas en vuelo y el margen adicional saludable según el heap/presupuesto de bytes en vuelo; 1–2 es el valor predeterminado conservador de #7849, no un máximo estricto del producto | Asignar a un proceso 8 veces más RAM y un límite de cantidad sin restricciones |
| Opcional: `QUOTA_STORE_DRIVER=redis` + `QUOTA_STORE_REDIS_URL` para disponer de **contadores de cuota compartidos**                                                                                              | Tratar Redis como SQLite compartido: no lo es                                  |
| Duplica los secretos de los proveedores en cada instancia (o acepta paneles particionados)                                                                                                                       | Esperar un único panel/un único registro de llamadas entre las instancias      |
| Coloca cualquier balanceador de carga delante; la afinidad por clave de API o sesión es suficiente                                                                                                               | Exigir un middleware específico del proveedor que tenga en cuenta el tamaño    |

Hardware: el número de solicitudes largas simultáneas a `/v1/responses` por instancia es una cuestión de **presupuesto de memoria** (heap + bytes en vuelo/#10110). Los `DATA_DIR` independientes para `N` instancias siguen multiplicando los heaps: la RAM del host debe cubrir `N × cgroup`, no «un pod de 16 Gi con N=8». Nunca uses `replicas > 1` sobre un único archivo SQLite.

Ejemplo de Compose (dos heaps, dos volúmenes; no `deploy.replicas: 2`):

```yaml
services:
  omniroute-a:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-a-data:/app/data]
    ports: ["20128:20128"]
  omniroute-b:
    image: diegosouzapw/omniroute:3.8.49
    environment:
      DATA_DIR: /app/data
      OMNIROUTE_MEMORY_MB: "12288"
      QUOTA_STORE_DRIVER: redis
      QUOTA_STORE_REDIS_URL: redis://redis:6379
    volumes: [omniroute-b-data:/app/data]
    ports: ["20138:20128"]
volumes:
  omniroute-a-data:
  omniroute-b-data:
```

La densidad dentro del proceso (compresión fuera del isolate HTTP) se aborda en [#11023](https://github.com/diegosouzapw/OmniRoute/issues/11023). La creación de un clúster lógico sobre un estado duradero compartido se aborda en [#8075](https://github.com/diegosouzapw/OmniRoute/issues/8075).

## Errores regionales de Gemini dentro de Docker

Google AI Studio / Gemini API puede devolver HTTP 400 con FAILED_PRECONDITION y
`User location is not supported for the API use.` Que una solicitud se complete correctamente en el host
no demuestra que el contenedor utilice la misma ruta de salida. El orden de DNS,
la conectividad IPv4/IPv6, el enrutamiento de la VPN y los proxies configurados pueden diferir. Consulte
[las regiones admitidas por Google](https://ai.google.dev/gemini-api/docs/available-regions),
así como la ruta de conexión real; este error por sí solo no indica que la clave de API sea incorrecta.

### Prefiera un proxy específico para la conexión

Utilice la [configuración de proxy por conexión](../ops/PROXY_GUIDE.md#4-level-proxy-system)
de OmniRoute para la conexión de Gemini afectada y, a continuación, repita **Probar conexión** y una solicitud pequeña
con el mismo modelo. Esto limita el cambio de enrutamiento a esa conexión. Verifique
que se pueda acceder al proxy desde el contenedor y que la conexión realmente lo seleccione.
Cambiar la ruta no garantiza la elegibilidad regional en el servicio de origen.

### Compare la red del host y del contenedor

Mantenga idénticos la clave, el modelo y la solicitud al comparar resultados autenticados; nunca
pegue credenciales, contraseñas de proxy ni encabezados de autorización completos en una incidencia.
Primero, compruebe qué familias de direcciones ofrece el sistema de resolución del SO, utilizando el mismo comando
en el host y dentro del contenedor:

```bash
node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
docker compose exec omniroute node -e 'require("node:dns").lookup("generativelanguage.googleapis.com", {all: true}, (error, addresses) => { if (error) { console.error(error.code); process.exitCode = 1; return; } console.log(addresses.map(({family}) => family)); })'
```

Sustituya `omniroute` por el servicio que ejecute (por ejemplo, `omniroute-web`). Estos
comandos muestran las familias de direcciones sin credenciales ni direcciones IP. Que se devuelva `6`
solo indica un resultado DNS IPv6: **no** demuestra que exista una ruta IPv6 utilizable ni acceso a la API.
Cuando `curl` esté instalado, compare `curl -4 -I https://generativelanguage.googleapis.com`
con `curl -6 -I https://generativelanguage.googleapis.com` en ambos entornos.
Una respuesta HTTP demuestra la conectividad para esa comprobación, aunque sea un error
sin autenticar; solo la solicitud autenticada al modelo comprueba la elegibilidad para Gemini.

### Alternativa en el host: IPv6 funcional y política del sistema de resolución

La persona que informó de [#12762](https://github.com/diegosouzapw/OmniRoute/issues/12762) restableció
el acceso en su entorno habilitando IPv6 para los contenedores y cambiando la selección de
direcciones de glibc. Considere esto una alternativa específica del entorno. Confirme que IPv6 funcione en el host,
así como la salida y el enrutamiento del contenedor y las reglas del firewall, antes de ajustar las preferencias del sistema de resolución.
Una dirección ULA privada por sí sola no demuestra que exista conectividad IPv6 pública.

Para los servicios que ya estén conectados a la red predeterminada de Compose, este fragmento habilita
IPv6 en dicha red; conserve el resto de la configuración del servicio, los puertos y los volúmenes:

```yaml
networks:
  default:
    enable_ipv6: true
```

Para una red con nombre, habilítelo en la red a la que realmente se conecta el servicio. Docker puede
asignar una subred ULA; seleccione una subred explícita que no se solape solo cuando su red
lo requiera. Consulte [Redes IPv6 de Docker](https://docs.docker.com/engine/daemon/ipv6/)
y [Opciones de red de Compose](https://docs.docker.com/reference/compose-file/networks/#enable_ipv6).

En una **imagen basada en glibc**, `/etc/gai.conf` puede cambiar la selección de direcciones. El Dockerfile
actual del repositorio utiliza Debian; las imágenes personalizadas basadas en musl no comparten este mecanismo.
El ajuste comunicado cambia la etiqueta ULA de `label fc00::/7 6` a
`label fc00::/7 1`. Parta de la tabla de políticas completa de la imagen y conserve sus demás
entradas: añadir una entrada `label` o `precedence` sustituye esa tabla predeterminada, por lo que un archivo
que contenga únicamente la línea modificada no es suficiente. La
[referencia de configuración de glibc](https://github.com/bminor/glibc/blob/master/posix/gai.conf)
documenta este comportamiento. Monte mediante bind el archivo revisado en modo de solo lectura en `/etc/gai.conf`
y vuelva a crear el servicio para aplicarlo.

Esto cambia la selección de direcciones del SO para **todo el tráfico saliente de ese contenedor**.
No obliga a todas las aplicaciones a elegir IPv6: el orden DNS y la selección
de conexiones de Node también son importantes. En particular, `--dns-result-order=ipv4first` da preferencia a IPv4 y
no soluciona un fallo exclusivo de IPv4. Consulte [Ordenación de DNS de Node](https://nodejs.org/api/dns.html#dnssetdefaultresultorderorder).

Vuelva a probar Gemini y sus otros proveedores después de cualquier cambio en el host. Para revertirlo,
elimine el montaje personalizado de `gai.conf`, restaure la configuración de red anterior y
vuelva a crear el servicio o la red afectados durante una ventana de mantenimiento. Volver a crear una red
puede interrumpir otros contenedores conectados a ella; no elimine el volumen de datos persistente.

## Notas importantes

- **Modo WAL de SQLite:** Se debe permitir que `docker stop` finalice para que OmniRoute pueda escribir los cambios más recientes en `storage.sqlite` mediante un checkpoint. Los archivos de Compose incluidos ya establecen un período de gracia de detención de 40 s. Si ejecuta la imagen directamente, mantenga `--stop-timeout 40`.
- **`DISABLE_SQLITE_AUTO_BACKUP`:** Establézcalo en `true` si las copias de seguridad rutinarias o previas a la escritura se gestionan externamente. Las migraciones de bases de datos existentes siguen requiriendo su propia instantánea de seguridad duradera y un mecanismo de protección para migraciones masivas.
- **Persistencia de datos:** Monte siempre un volumen en `/app/data` para conservar la base de datos, las claves y las configuraciones entre reinicios del contenedor.
- **Configuración del puerto:** Sobrescriba la variable de entorno `PORT` para cambiar el puerto predeterminado `20128`.

## Véase también

- [Guía de despliegue en máquinas virtuales](../ops/VM_DEPLOYMENT_GUIDE.md) — Configuración de máquina virtual + nginx + Cloudflare
- [Guía de despliegue en Fly.io](../ops/FLY_IO_DEPLOYMENT_GUIDE.md) — Despliegue en Fly.io
- [Configuración del entorno](../reference/ENVIRONMENT.md) — Referencia completa de `.env`
