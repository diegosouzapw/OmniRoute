# 🌐 OmniRoute Proxy Guide (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/PROXY_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/PROXY_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/PROXY_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/PROXY_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/PROXY_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/PROXY_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/PROXY_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/PROXY_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/PROXY_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/PROXY_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/PROXY_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/PROXY_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/PROXY_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/PROXY_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/PROXY_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/PROXY_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/PROXY_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/PROXY_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/PROXY_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/PROXY_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/PROXY_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/PROXY_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/PROXY_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/PROXY_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/PROXY_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/PROXY_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/PROXY_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/PROXY_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/PROXY_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/PROXY_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/PROXY_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/PROXY_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/PROXY_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/PROXY_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/PROXY_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/PROXY_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/PROXY_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/PROXY_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/PROXY_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/PROXY_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/PROXY_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/PROXY_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/PROXY_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/PROXY_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/PROXY_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/PROXY_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/PROXY_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/PROXY_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/PROXY_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/PROXY_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/PROXY_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/PROXY_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/PROXY_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/PROXY_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/PROXY_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/PROXY_GUIDE.md)

---

> **Evita bloqueos geográficos, protege tu identidad y enruta el tráfico de IA a través de cualquier proxy, sin ninguna complejidad de configuración.**

OmniRoute incluye un sistema completo de gestión de proxies que permite enrutar el tráfico hacia proveedores de IA externos a través de proxies HTTP, HTTPS o SOCKS5. Tanto si te encuentras en una región bloqueada como si necesitas rotación de IP o quieres ocultar tu huella digital, esta guía lo explica todo.

---

## Tabla de contenidos

- [¿Por qué usar proxies?](#why-use-proxies)
- [Descripción general de la arquitectura](#architecture-overview)
- [Sistema de proxies de 4 niveles](#4-level-proxy-system)
- [Registro de proxies (CRUD)](#proxy-registry-crud)
- [Mercado gratuito de 1proxy](#1proxy-free-proxy-marketplace)
- [Rotación de proxies](#proxy-rotation)
- [Antidetección y ocultación](#anti-detection--stealth)
- [Modos de proxy ascendente](#upstream-proxy-modes)
- [Interfaz del panel](#dashboard-ui)
- [Referencia de la API](#api-reference)
- [Variables de entorno](#environment-variables)
- [Solución de problemas](#troubleshooting)

---

## ¿Por qué usar proxies?

Muchos proveedores de IA restringen el acceso según la región geográfica. Los desarrolladores de **Rusia, China, Irán, Cuba, Turquía** y otros países encuentran errores como:

```
unsupported_country_region_territory
```

Incluso fuera de las regiones bloqueadas, los proxies resultan útiles para:

| Caso de uso                | Descripción                                                                  |
| -------------------------- | ---------------------------------------------------------------------------- |
| **Evasión geográfica**     | Acceder a OpenAI, Anthropic, Codex y Copilot desde países bloqueados         |
| **Rotación de IP**         | Distribuir las solicitudes entre varias IP para evitar límites de frecuencia |
| **Privacidad**             | Ocultar tu IP real a los proveedores externos                                |
| **Cumplimiento normativo** | Enrutar el tráfico a través de jurisdicciones específicas                    |
| **Pruebas**                | Simular solicitudes desde distintas regiones                                 |

---

## Descripción general de la arquitectura

```
┌───────────────────────────────────────────────────────────────┐
│                     Servidor OmniRoute                        │
│                                                               │
│  ┌─────────────┐    ┌──────────────┐    ┌──────────────────┐  │
│  │ Registro de │    │ Distribuidor │    │ Fetch (undici)   │  │
│  │ proxies     │───▶│ de proxies   │───▶│                  │  │
│  │ (SQLite)    │    │ (en caché)   │    │                  │  │
│  └─────────────┘    └──────────────┘    └────────┬─────────┘  │
│         ▲                                        │            │
│         │                                        ▼            │
│  ┌──────┴──────┐                        ┌──────────────────┐  │
│  │ Sincroniz.  │                        │ API del          │  │
│  │ de 1proxy   │                        │ proveedor externo│  │
│  │ (pool grat.)│                        │                  │  │
│  └─────────────┘                        └──────────────────┘  │
└───────────────────────────────────────────────────────────────┘
```

### Componentes principales

| Componente                  | Archivo                                      | Función                                                                      |
| --------------------------- | -------------------------------------------- | ---------------------------------------------------------------------------- |
| **Registro de proxies**     | `src/lib/db/proxies.ts`                      | CRUD de entradas de proxy y asignaciones de ámbito                           |
| **Distribuidor de proxy**   | `open-sse/utils/proxyDispatcher.ts`          | Crea distribuidores ProxyAgent/SOCKS de `undici` con almacenamiento en caché |
| **Fetch mediante proxy**    | `open-sse/utils/proxyFetch.ts`               | Encapsula `fetch()` con la inyección del distribuidor de proxy               |
| **Ruta de configuración**   | `src/app/api/settings/proxy/route.ts`        | API heredada de configuración de proxy (GET/PUT/DELETE)                      |
| **Ruta de administración**  | `src/app/api/v1/management/proxies/route.ts` | API CRUD del registro (GET/POST/PATCH/DELETE)                                |
| **Base de datos de 1proxy** | `src/lib/db/oneproxy.ts`                     | Persistencia del mercado de proxies gratuitos                                |

---

## Sistema de proxy de 4 niveles

OmniRoute admite la configuración de proxies en **cuatro ámbitos independientes**, que se resuelven por orden de prioridad:

```
Orden de resolución de prioridad (de mayor → menor):

  1. 🔵 Proxy de cuenta/conexión  →  por clave de API/conexión OAuth
  2. 🟡 Proxy de proveedor        →  por proveedor (p. ej., todo el tráfico de OpenAI)
  3. 🟠 Proxy de combinación      →  por combinación/configuración de enrutamiento
  4. 🟢 Proxy global              →  todo el tráfico, todos los proveedores
```

### Cómo funciona la resolución

Cuando OmniRoute envía una solicitud a un proveedor ascendente, llama a `resolveProxyForConnectionFromRegistry()`, que comprueba cada nivel en orden:

1. **Nivel de cuenta** — ¿Hay un proxy asignado a este ID de conexión específico?
2. **Nivel de proveedor** — ¿Hay un proxy asignado a este proveedor (p. ej., `openai`)?
3. **Nivel global** — ¿Hay un proxy global configurado?
4. **Sin proxy** — Conexión directa con el proveedor.

La primera coincidencia prevalece. Esto significa que puede establecer un proxy global como alternativa, pero reemplazarlo para proveedores o conexiones específicos.

### Qué se enruta mediante proxy

| Tipo de tráfico             | ¿Usa proxy? | Notas                                           |
| --------------------------- | ----------- | ----------------------------------------------- |
| Finalizaciones de chat      | ✅          | Todas las solicitudes a `/v1/chat/completions`  |
| Embeddings                  | ✅          | `/v1/embeddings`                                |
| Generación de imágenes      | ✅          | `/v1/images/generations`                        |
| Audio (TTS/STT)             | ✅          | `/v1/audio/*`                                   |
| Intercambio de tokens OAuth | ✅          | Resuelve `unsupported_country_region_territory` |
| Pruebas de conexión         | ✅          | El botón "Probar conexión" usa el proxy         |
| Renovación de tokens        | ✅          | Renovación de OAuth en segundo plano            |
| Sincronización de modelos   | ✅          | Listado y detección de modelos                  |

---

## Registro de proxies (CRUD)

El registro de proxies es una tabla SQLite (`proxy_registry`) que almacena todos sus proxies. Cada proxy tiene:

| Campo      | Tipo   | Descripción                                            |
| ---------- | ------ | ------------------------------------------------------ |
| `id`       | UUID   | Identificador único                                    |
| `name`     | Cadena | Etiqueta legible para personas                         |
| `type`     | Cadena | Protocolo: `http`, `https`, `socks5`                   |
| `host`     | Cadena | Nombre de host o IP del proxy                          |
| `port`     | Entero | Número de puerto                                       |
| `username` | Cadena | Nombre de usuario de autenticación (cifrado en reposo) |
| `password` | Cadena | Contraseña de autenticación (cifrada en reposo)        |
| `region`   | Cadena | Etiqueta de región geográfica                          |
| `notes`    | Cadena | Notas de texto libre                                   |
| `status`   | Cadena | `active` o `inactive`                                  |
| `source`   | Cadena | `manual` o `oneproxy`                                  |

### Creación de un proxy

**Mediante el panel:**

1. Vaya a **Configuración → Proxy**
2. Haga clic en **Añadir proxy**
3. Complete el tipo, el host, el puerto y las credenciales de autenticación opcionales
4. Guarde los cambios

**Mediante la API:**

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "US Proxy",
    "type": "http",
    "host": "proxy.example.com",
    "port": 8080,
    "username": "user",
    "password": "pass",
    "region": "US"
  }'
```

### Actualización de un proxy

```bash
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "id": "proxy-uuid-here",
    "host": "new-proxy.example.com",
    "port": 9090
  }'
```

> **Nota:** Las credenciales se conservan a menos que envíe explícitamente valores de reemplazo que no estén vacíos. Si envía cadenas vacías para `username`/`password`, se mantendrán los valores almacenados.

### Eliminación de un proxy

```bash
# Falla si el proxy está asignado a algún ámbito
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid"

# Fuerza la eliminación (también elimina las asignaciones)
curl -X DELETE "http://localhost:20128/api/v1/management/proxies?id=proxy-uuid&force=1"
```

### Listado de proxies

```bash
curl "http://localhost:20128/api/v1/management/proxies?limit=50&offset=0"
```

### Asignación de proxies a ámbitos

```bash
# Asignar al ámbito global
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "global", "proxy": {"type":"http","host":"proxy.example.com","port":8080}}'

# Asignar a un proveedor específico
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "provider", "id": "openai", "proxy": {"type":"socks5","host":"socks.example.com","port":1080}}'

# Asignar a una conexión/clave específica
curl -X PUT http://localhost:20128/api/settings/proxy \
  -H "Content-Type: application/json" \
  -d '{"level": "key", "id": "connection-uuid", "proxy": {"type":"http","host":"key-proxy.com","port":3128}}'
```

### Resolución del proxy efectivo

Compruebe qué proxy se utilizaría para una conexión determinada:

```bash
curl "http://localhost:20128/api/settings/proxy?resolve=connection-uuid"
```

Devuelve el proxy resuelto junto con su nivel (`account`, `provider` o `global`) y su origen.

### Asignación masiva

Asigne un proxy a varios proveedores o conexiones a la vez:

```bash
curl -X POST http://localhost:20128/api/v1/management/proxies/bulk-assign \
  -H "Content-Type: application/json" \
  -d '{
    "scope": "provider",
    "scopeIds": ["openai", "anthropic", "codex"],
    "proxyId": "proxy-uuid"
  }'
```

### Importación/exportación

Los proxies se incluyen en el sistema de **Copia de seguridad/restauración**. Cuando exporta su configuración de OmniRoute:

1. Vaya a **Panel → Configuración → Copia de seguridad**
2. Haga clic en **Exportar** — se incluyen el registro de proxies y las asignaciones
3. Para restaurar, haga clic en **Importar** y cargue el archivo de copia de seguridad

El registro de proxies también admite la operación **upsert por host+puerto**: si importa un proxy que ya existe (con el mismo host y puerto), se actualiza en lugar de crear un duplicado.

### Migración heredada

Si configuraste proxies en una versión anterior (previa al registro), OmniRoute los migra automáticamente:

```
Almacén key_value heredado → proxy_registry + proxy_assignments
```

Esto ocurre una sola vez durante el primer inicio tras la actualización. Usa `migrateLegacyProxyConfigToRegistry({ force: true })` para volver a ejecutar la migración.

---

## Mercado de proxies gratuitos de 1proxy

> 🆕 **Contribución de [@oyi77](https://github.com/oyi77)** — PR [#1847](https://github.com/diegosouzapw/OmniRoute/pull/1847) (incidencia [#1788](https://github.com/diegosouzapw/OmniRoute/issues/1788))

OmniRoute se integra con la plataforma comunitaria **[1proxy](https://1proxy-api.aitradepulse.com)** para proporcionar acceso a **cientos de proxies gratuitos y validados** de todo el mundo. Esto es ideal para usuarios que no disponen de su propia infraestructura de proxies.

### Cómo funciona

```
┌─────────────┐  Sincronizar  ┌─────────────────┐    Rotar      ┌───────────┐
│ API 1proxy  │ ────────────▶ │  proxy_registry  │ ────────────▶ │ Proveedor │
│  (externa)  │ hasta 500     │  source=oneproxy │  por calidad  │    API     │
└─────────────┘   proxies     └─────────────────┘               └───────────┘
```

1. **Sincronización** — OmniRoute obtiene proxies validados desde la API de 1proxy
2. **Almacenamiento** — Los proxies se guardan en la misma tabla `proxy_registry` con `source = 'oneproxy'`
3. **Filtrado** — Filtra por protocolo, país y puntuación de calidad
4. **Rotación** — Selecciona el mejor proxy mediante estrategias de calidad, aleatoria o secuencial
5. **Degradación automática** — La puntuación de calidad de los proxies que fallen se reduce; por debajo del umbral → se marcan como inactivos

### Sincronización de proxies

**Mediante el panel de control:**

1. Ve a la pestaña **Settings → 1proxy**
2. Haz clic en **"Sync Now"**
3. Consulta las estadísticas: número total de proxies, cantidad de proxies activos, calidad media y desglose por país

**Mediante la API:**

```bash
# Iniciar la sincronización
curl -X POST http://localhost:20128/api/settings/oneproxy \
  -H "Content-Type: application/json" \
  -d '{}'

# Respuesta:
# { "success": true, "added": 127, "updated": 45, "failed": 2, "total": 172 }
```

### Filtrado de proxies

```bash
# Filtrar por protocolo
curl "http://localhost:20128/api/settings/oneproxy?protocol=socks5"

# Filtrar por país
curl "http://localhost:20128/api/settings/oneproxy?countryCode=US"

# Filtrar por puntuación mínima de calidad
curl "http://localhost:20128/api/settings/oneproxy?minQuality=80"

# Combinar filtros
curl "http://localhost:20128/api/settings/oneproxy?protocol=http&countryCode=DE&minQuality=70"
```

### Puntuaciones de calidad de los proxies

Cada proxy de 1proxy incluye metadatos:

| Campo           | Descripción                                            |
| --------------- | ------------------------------------------------------ |
| `qualityScore`  | Puntuación de 0 a 100 de la validación de 1proxy       |
| `latencyMs`     | Latencia de red medida                                 |
| `anonymity`     | `transparent`, `anonymous` o `elite`                   |
| `googleAccess`  | Indica si el proxy puede acceder a servicios de Google |
| `countryCode`   | Código de país ISO de dos letras                       |
| `lastValidated` | Marca de tiempo de la última validación                |

Las puntuaciones de calidad se ajustan dinámicamente:

- **Las solicitudes fallidas** reducen la puntuación en 10 puntos
- **La puntuación baja a ≤10** → el proxy se marca como `inactive`
- Los proxies inactivos se excluyen de la rotación

### Estrategias de rotación

```bash
# Rotar por calidad (el mejor proxy primero) — opción predeterminada
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -H "Content-Type: application/json" \
  -d '{"strategy": "quality"}'

# Rotación aleatoria
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "random"}'

# Secuencial (primero el validado hace más tiempo)
curl -X POST http://localhost:20128/api/settings/oneproxy/rotate \
  -d '{"strategy": "sequential"}'
```

### Disyuntor

La sincronización de 1proxy incorpora un disyuntor:

- Después de **5 fallos de sincronización consecutivos**, se bloquean los siguientes intentos de sincronización
- Restablécelo con `resetOneproxyCircuitBreaker()` o reinicia el servidor
- El estado de sincronización está disponible en `GET /api/settings/oneproxy?action=status`

### Eliminación de proxies de 1proxy

```bash
# Eliminar un único proxy de 1proxy
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?id=proxy-uuid"

# Eliminar TODOS los proxies de 1proxy (los proxies manuales no se modifican)
curl -X DELETE "http://localhost:20128/api/settings/oneproxy?clearAll=1"
```

---

## Antidetección y sigilo

OmniRoute no se limita a enrutar el tráfico a través de un proxy, sino que hace que el tráfico parezca legítimo:

### Suplantación de huella digital TLS

Utiliza `wreq-js` para generar huellas digitales TLS similares a las de los navegadores, eludiendo los sistemas de detección de bots que identifican los protocolos de enlace TLS que no proceden de navegadores.

### Coincidencia de huellas digitales de CLI

El **selector de huella digital de CLI** (`Configuración → Seguridad`) reordena los encabezados HTTP y los campos del cuerpo JSON para que coincidan con la firma exacta de los binarios de CLI nativos (Claude Code, Codex, etc.). Esto funciona **además del** proxy:

```
Tu IP (bloqueada) → IP del proxy (EE. UU.) → API del proveedor
                    + suplantación de TLS
                    + huella digital de CLI
```

Obtienes simultáneamente tanto **ocultación de IP** como **autenticidad de las solicitudes**.

### Conservación de la IP del proxy

Las insignias codificadas por colores del panel muestran qué nivel de proxy está activo:

| Insignia | Nivel     | Significado                                           |
| -------- | --------- | ----------------------------------------------------- |
| 🟢       | Global    | Todo el tráfico pasa por este proxy                   |
| 🟡       | Proveedor | Solo se enruta por proxy el tráfico de este proveedor |
| 🔵       | Conexión  | Esta clave/cuenta específica utiliza este proxy       |

La insignia también muestra la IP resuelta del proxy para su verificación.

---

## Modos de proxy ascendente

Para los proveedores que utilizan el patrón CLIProxyAPI, OmniRoute admite tres modos de proxy ascendente:

| Modo          | Descripción                                                                |
| ------------- | -------------------------------------------------------------------------- |
| `native`      | OmniRoute gestiona directamente el enrutamiento del proxy (predeterminado) |
| `cliproxyapi` | Delega en una instancia externa de CLIProxyAPI                             |
| `fallback`    | Primero prueba el modo nativo y, si falla, recurre a CLIProxyAPI           |

Configúralo por proveedor:

```bash
curl -X PUT "http://localhost:20128/api/upstream-proxy/openai" \
  -H "Content-Type: application/json" \
  -d '{"mode": "native", "enabled": true}'
```

---

## Interfaz del panel

### Configuración → Pestaña Proxy

- Configuración del **proxy global** (se establece una vez para todo el tráfico)
- Sustituciones de proxy **por proveedor**
- Asignaciones de proxy **por conexión**
- **Prueba de conexión** a través del proxy configurado
- **Insignias codificadas por colores** que muestran el nivel de proxy activo

### Configuración → Pestaña 1proxy

- Botón **Sincronizar ahora** para obtener proxies gratuitos
- **Tarjetas de estadísticas**: Total, Activos, Calidad media, Última sincronización
- **Filtros**: Protocolo, Código de país, Calidad mínima
- **Tabla de proxies** con host, protocolo, país, puntuación de calidad, latencia, anonimato y acceso a Google
- Panel de **estado de sincronización** con seguimiento de operaciones correctas/fallidas y recuento de fallos consecutivos
- **Borrar todo** para eliminar todas las entradas de 1proxy

---

## Referencia de la API

### API de configuración del proxy

| Método   | Endpoint                                       | Descripción                                 |
| -------- | ---------------------------------------------- | ------------------------------------------- |
| `GET`    | `/api/settings/proxy`                          | Obtener la configuración completa del proxy |
| `GET`    | `/api/settings/proxy?level=global`             | Obtener el proxy global                     |
| `GET`    | `/api/settings/proxy?level=provider&id=openai` | Obtener el proxy del proveedor              |
| `GET`    | `/api/settings/proxy?resolve=connectionId`     | Resolver el proxy efectivo                  |
| `PUT`    | `/api/settings/proxy`                          | Actualizar la configuración del proxy       |
| `DELETE` | `/api/settings/proxy?level=provider&id=openai` | Eliminar el proxy del nivel                 |

### API del registro de proxies

| Método   | Endpoint                                          | Descripción                      |
| -------- | ------------------------------------------------- | -------------------------------- |
| `GET`    | `/api/v1/management/proxies`                      | Enumerar todos los proxies       |
| `GET`    | `/api/v1/management/proxies?id=uuid`              | Obtener un proxy por ID          |
| `GET`    | `/api/v1/management/proxies?id=uuid&where_used=1` | Obtener asignaciones del proxy   |
| `POST`   | `/api/v1/management/proxies`                      | Crear un proxy                   |
| `PATCH`  | `/api/v1/management/proxies`                      | Actualizar un proxy              |
| `DELETE` | `/api/v1/management/proxies?id=uuid`              | Eliminar un proxy                |
| `DELETE` | `/api/v1/management/proxies?id=uuid&force=1`      | Forzar la eliminación            |
| `POST`   | `/api/v1/management/proxies/bulk-assign`          | Asignar de forma masiva          |
| `GET`    | `/api/v1/management/proxies/assignments`          | Enumerar las asignaciones        |
| `GET`    | `/api/v1/management/proxies/health`               | Estadísticas de estado del proxy |

### API de túneles

Para exponer tu instancia de OmniRoute a Internet (Cloudflare/ngrok/Tailscale) en lugar de enrutar el tráfico saliente a través de un proxy, consulta [TUNNELS_GUIDE.md](./TUNNELS_GUIDE.md). La API REST de túneles se encuentra en `/api/tunnels/{cloudflared,ngrok,tailscale}/*` y es independiente de la cadena de proxies salientes documentada anteriormente.

### API de 1proxy

| Método   | Endpoint                               | Descripción                                     |
| -------- | -------------------------------------- | ----------------------------------------------- |
| `GET`    | `/api/settings/oneproxy`               | Enumerar los proxies de 1proxy                  |
| `GET`    | `/api/settings/oneproxy?action=stats`  | Obtener estadísticas + estado de sincronización |
| `GET`    | `/api/settings/oneproxy?action=status` | Obtener solo el estado de sincronización        |
| `POST`   | `/api/settings/oneproxy`               | Iniciar la sincronización                       |
| `POST`   | `/api/settings/oneproxy/rotate`        | Rotar al siguiente proxy                        |
| `DELETE` | `/api/settings/oneproxy?id=uuid`       | Eliminar uno                                    |
| `DELETE` | `/api/settings/oneproxy?clearAll=1`    | Borrar todos                                    |

### API de proxy ascendente

| Método   | Endpoint                          | Descripción                                    |
| -------- | --------------------------------- | ---------------------------------------------- |
| `GET`    | `/api/upstream-proxy/:providerId` | Obtener la configuración del proxy ascendente  |
| `PUT`    | `/api/upstream-proxy/:providerId` | Establecer el modo de proxy ascendente         |
| `DELETE` | `/api/upstream-proxy/:providerId` | Eliminar la configuración del proxy ascendente |

---

## Variables de entorno

| Variable              | Valor predeterminado | Descripción                                                                                    |
| --------------------- | -------------------- | ---------------------------------------------------------------------------------------------- |
| `ENABLE_SOCKS5_PROXY` | `true`               | Habilita la compatibilidad con el proxy SOCKS5 (valor predeterminado `true` en `.env.example`) |

---

## Solución de problemas

### "El proxy SOCKS5 está deshabilitado"

Establezca `ENABLE_SOCKS5_PROXY=true` en su archivo `.env` y reinicie.

### Errores "socket hang up" a través del proxy

Esto es normal con proxies económicos que cierran las conexiones inactivas. OmniRoute ya gestiona esta situación mediante:

- La desactivación de keep-alive en las conexiones de proxy (`keepAliveTimeout: 1`)
- La desactivación del pipelining (`pipelining: 0`)
- El almacenamiento en caché de los dispatchers para evitar handshakes repetidos

Si el problema persiste, pruebe otro proxy o utilice la función de rotación de 1proxy.

### "unsupported_country_region_territory" durante OAuth

Asegúrese de que el proxy esté configurado **antes** de iniciar el flujo de OAuth. OmniRoute enruta el intercambio de tokens de OAuth a través del proxy configurado. Configure primero un proxy global o a nivel de proveedor y, después, establezca la conexión.

### El proxy no se está utilizando

Compruebe el orden de resolución:

1. Verifíquelo con `GET /api/settings/proxy?resolve=your-connection-id`
2. Compruebe que el `status` del proxy sea `active` (no `inactive`)
3. Asegúrese de que el ámbito de asignación del proxy coincida con su conexión

### Error de sincronización de 1proxy

Compruebe el estado de la sincronización:

```bash
curl "http://localhost:20128/api/settings/oneproxy?action=status"
```

Si `consecutiveFailures >= 5`, el interruptor de circuito se ha activado. Reinicie el servidor para restablecerlo o espere a que se restablezca manualmente.

---

## Esquema de la base de datos

### Tabla `proxy_registry`

```sql
CREATE TABLE proxy_registry (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'http',
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  username TEXT DEFAULT '',
  password TEXT DEFAULT '',
  region TEXT,
  notes TEXT,
  status TEXT DEFAULT 'active',
  source TEXT NOT NULL DEFAULT 'manual',    -- 'manual' o 'oneproxy'
  quality_score INTEGER,                     -- 0-100 (solo 1proxy)
  latency_ms INTEGER,                        -- milisegundos (solo 1proxy)
  anonymity TEXT,                            -- transparente/anónimo/élite
  google_access INTEGER DEFAULT 0,           -- ¿puede acceder a Google? (1proxy)
  last_validated TEXT,                       -- marca de tiempo ISO (1proxy)
  country_code TEXT,                         -- código ISO de 2 letras (1proxy)
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);
```

### Tabla `proxy_assignments`

```sql
CREATE TABLE proxy_assignments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  proxy_id TEXT NOT NULL REFERENCES proxy_registry(id),
  scope TEXT NOT NULL,        -- 'global', 'provider', 'account', 'combo'
  scope_id TEXT,              -- ID del proveedor, ID de la conexión o ID de la combinación
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  UNIQUE(scope, scope_id)
);
```

---

## Comprobación del estado del proxy (v3.8.16+)

El mecanismo de **fallo rápido del proxy** de OmniRoute (`src/lib/proxyHealth.ts`) detecta proxies inactivos en <2s mediante una comprobación rápida de conexión TCP y, a continuación, **almacena el resultado en caché** para evitar la sobrecarga en cada solicitud.

### Cómo funciona

```
Solicitud ──▶ ProxyHealthCache.get(url)
               │
               ├─ ¿Acierto de caché + vigente? ──▶ devolver estado almacenado en caché
               │
               └─ ¿Fallo de caché / obsoleto? ──▶ conexión TCP a host:port
                                                    (tiempo de espera: FAST_FAIL_TIMEOUT_MS)
                                                    ──▶ almacenar en caché durante HEALTH_CACHE_TTL_MS
                                                    ──▶ devolver resultado
```

Sin este mecanismo, un proxy inactivo bloquearía cada solicitud durante todo el valor de `PROXY_TIMEOUT_MS` (30s de forma predeterminada) antes de fallar.

### Variables de entorno configurables

| Variable                     | Valor predeterminado | Finalidad                                                         |
| ---------------------------- | -------------------- | ----------------------------------------------------------------- |
| `PROXY_FAST_FAIL_TIMEOUT_MS` | `2000`               | Tiempo de espera de la conexión TCP por comprobación de estado    |
| `PROXY_HEALTH_CACHE_TTL_MS`  | `30000`              | Tiempo durante el que se almacena en caché un resultado de estado |

**Valores recomendados:**

| Escenario                            | Tiempo de espera de fallo rápido | TTL de caché | Motivo                                                                                           |
| ------------------------------------ | -------------------------------- | ------------ | ------------------------------------------------------------------------------------------------ |
| Puerta de enlace API de alto tráfico | 1500ms                           | 60000ms      | Fallo rápido agresivo y caché más prolongada para reducir las comprobaciones                     |
| Nodos distribuidos geográficamente   | 3000ms                           | 15000ms      | Las redes más lentas necesitan más tiempo; caché más breve para una conmutación por error rápida |
| Desarrollo / pruebas                 | 1000ms                           | 10000ms      | Iteración rápida en proxies locales                                                              |
| Sigilo / ant detección               | 2500ms                           | 45000ms      | Evita sondeos rápidos que podrían activar límites de frecuencia                                  |

### Inspección del estado del proxy

```ts
import { getAllProxyHealthStatuses, invalidateProxyHealth } from "omniroute/proxyHealth";

const statuses = getAllProxyHealthStatuses();
for (const s of statuses) {
  console.log(`${s.proxyUrl} → healthy=${s.healthy}, stale=${s.stale}`);
}

// Forzar una nueva comprobación de un proxy específico
invalidateProxyHealth("http://user:pass@203.0.113.7:8080");
```

La marca `stale` es `true` cuando la entrada de caché ha superado `HEALTH_CACHE_TTL_MS` y la siguiente solicitud activará una nueva comprobación.

### Valores predeterminados según el tipo de proxy

La comprobación de estado utiliza valores predeterminados razonables según el esquema de la URL:

| Esquema                    | Puerto predeterminado |
| -------------------------- | --------------------- |
| `http://`                  | 8080                  |
| `https://`                 | 443                   |
| `socks5://` / `socks5h://` | 1080                  |

Los puertos personalizados de la URL (`http://host:9999`) siempre tienen prioridad sobre el valor predeterminado del esquema.

---

## Análisis y observabilidad de proxies

OmniRoute realiza un seguimiento del uso por proxy para ayudar a los operadores a diagnosticar patrones de enrutamiento, picos de latencia y fallos recurrentes.

### Datos registrados

Para cada solicitud realizada a través de un proxy configurado, OmniRoute registra:

| Métrica      | Descripción                                            |
| ------------ | ------------------------------------------------------ |
| `proxy_url`  | URL completa del proxy (con las credenciales ocultas)  |
| `provider`   | ID del proveedor ascendente (openai, anthropic, etc.)  |
| `latency_ms` | Tiempo total de ida y vuelta, incluido el enlace proxy |
| `connect_ms` | Solo el tiempo de conexión TCP                         |
| `status`     | Código de estado HTTP del servidor ascendente          |
| `error`      | Clase de error si la solicitud falló                   |
| `timestamp`  | ISO 8601 UTC                                           |

### Acceso a los datos

```bash
# Eventos recientes de proxies
curl -H "Authorization: Bearer $OMNIROUTE_KEY" \
  "http://localhost:20128/api/usage/proxy-logs?limit=100"
```

El endpoint real es `/api/usage/proxy-logs` (consulte `src/app/api/usage/proxy-logs/route.ts`). Este endpoint admite:

- `GET /api/usage/proxy-logs` — recuperar los registros de proxies
- `DELETE /api/usage/proxy-logs` — borrar todos los registros de proxies

Si es necesario, las estadísticas agregadas pueden consultarse directamente desde la tabla `proxy_logs` mediante SQL. La interfaz del panel puede ofrecer vistas agregadas.

### Patrones comunes

**Detectar un proxy inestable** (alterna entre éxito y fallo):

```sql
SELECT proxy_url,
       COUNT(*) AS total,
       SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) AS errors,
       ROUND(100.0 * SUM(CASE WHEN status >= 500 THEN 1 ELSE 0 END) / COUNT(*), 1) AS error_pct
FROM proxy_logs
WHERE timestamp > datetime('now', '-1 hour')
GROUP BY proxy_url
HAVING error_pct > 5
ORDER BY error_pct DESC;
```

**Encontrar proxies lentos** (latencia p95 > 2 s):

```sql
WITH ranked AS (
  SELECT proxy_url, latency_ms,
         PERCENT_RANK() OVER (PARTITION BY proxy_url ORDER BY latency_ms) AS pct
  FROM proxy_logs
  WHERE timestamp > datetime('now', '-24 hour')
)
SELECT proxy_url, latency_ms
FROM ranked
WHERE pct >= 0.95
ORDER BY latency_ms DESC;
```

---

## Árbol de decisión de la estrategia de rotación

Cuando se asignan varios proxies a un ámbito, OmniRoute utiliza una **estrategia de rotación** para elegir cuál usar en cada solicitud. La estrategia se configura en el nivel del ámbito (global, por proveedor, por cuenta o por combinación).

### Estrategias disponibles

| Estrategia                 | Cuándo usarla                              | Contrapartida                                                               |
| -------------------------- | ------------------------------------------ | --------------------------------------------------------------------------- |
| `quality` (predeterminada) | Producción con proxies de calidad variable | Favorece los proxies mejor valorados; puede relegar los peor valorados      |
| `random`                   | Distribución de carga, privacidad          | Distribución uniforme; ignora las señales de calidad                        |
| `sequential`               | Depuración, pruebas deterministas          | Recorre los proxies en orden; resulta fácil razonar sobre su comportamiento |

### Árbol de decisión

```
                    ¿Tiene puntuaciones de calidad para sus proxies?
                    │
        ┌───────────┴───────────┐
        │                       │
       SÍ                      NO
        │                       │
   ¿Tienen todos los            │
   proxies una calidad          │
   más o menos equivalente?     │
        │                       │
   ┌────┴────┐                  │
   │         │                  │
  SÍ        NO              Utilice
   │         │              `random`
   │         │              (una distribución
   │         │              uniforme genera datos
   │         │              de calidad con el tiempo)
   │         │
   │    Utilice `quality`
   │    (la mejor opción para
   │    calidad variable)
   │
Utilice `random`
(distribuya la carga
uniformemente)
```

## Exclusión automática de fallos para tus propios proxies

El pool del marketplace de 1proxy ya degrada automáticamente por sí solo los proxies que fallan (consulta
[Puntuaciones de calidad de los proxies](#proxy-quality-scores)). Para los
proxies que **tú** añadiste al registro, el programador de comprobaciones de estado en segundo plano
(`src/lib/proxyHealth/scheduler.ts`) proporciona el mismo comportamiento de «excluir automáticamente de
la cadena un miembro inactivo», sin eliminar nada:

```bash
# .env — deshabilita temporalmente un proxy después de 3 sondeos fallidos consecutivos y vuelve a habilitarlo
# automáticamente cuando empiece a responder de nuevo a los sondeos.
PROXY_AUTO_DISABLE=true
PROXY_AUTO_REMOVE_AFTER=3
```

Cómo funciona dentro de una cadena de varios proxies:

1. El programador sondea cada proxy registrado cada `PROXY_HEALTH_INTERVAL_MS`
   (valor predeterminado: 10 min; mínimo: 1 min).
2. Después de `PROXY_AUTO_REMOVE_AFTER` fallos **concluyentes** consecutivos (un fallo
   real de conexión; un tiempo de espera agotado o un error 5xx del propio destino del sondeo nunca cuentan; consulta
   [Comprobación del estado de los proxies](#proxy-health-checking-v3816)), el `status` del proxy se
   establece en `dead`.
3. `dead` es uno de los estados que excluye el filtro de estados activos utilizado por la resolución
   de pools/rotación, por lo que la rotación de un ámbito (round-robin / aleatoria / persistente /
   por latencia; consulta el [Árbol de decisión de estrategias de rotación](#rotation-strategy-decision-tree))
   deja inmediatamente de asignar ese proxy a nuevas solicitudes. Ningún otro proxy del
   pool se ve afectado, y el pool completo nunca recurre silenciosamente a una conexión
   directa; consulta el mecanismo de cierre seguro del [Sistema de proxies de 4 niveles](#4-level-proxy-system).
4. El programador continúa sondeando los proxies `dead` con el mismo intervalo. El siguiente
   sondeo correcto vuelve a cambiar el `status` a `active` y el proxy se reincorpora a la rotación,
   sin necesidad de volver a añadirlo manualmente.

Esto es deliberadamente **opcional y no destructivo**: de forma predeterminada, el programador solo
cuenta y registra los fallos (consulta la política C en `decision.ts`), y `PROXY_AUTO_DISABLE`
nunca elimina una fila; para eso existe la opción independiente y más agresiva
`PROXY_AUTO_REMOVE`. Si ambas están establecidas en `true`, `PROXY_AUTO_REMOVE`
tiene prioridad (no sirve de nada deshabilitar temporalmente un proxy que está a punto de eliminarse).
Consulta la referencia de [Configuración del entorno](../reference/ENVIRONMENT.md) para ver la lista
completa de variables.

---

> 📖 **Documentación relacionada:**
>
> - [Guía del usuario](../guides/USER_GUIDE.md) — Instalación y configuración generales
> - [Referencia de la API](../reference/API_REFERENCE.md) — Documentación completa de la API
> - [Configuración del entorno](../reference/ENVIRONMENT.md) — Todas las variables de entorno
