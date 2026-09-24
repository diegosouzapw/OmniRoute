# Egress IP Family Policy (IPv4/IPv6) (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../security/EGRESS_POLICY.md) · 🇪🇹 [am](../../../am/docs/security/EGRESS_POLICY.md) · 🇸🇦 [ar](../../../ar/docs/security/EGRESS_POLICY.md) · 🇦🇿 [az](../../../az/docs/security/EGRESS_POLICY.md) · 🇧🇬 [bg](../../../bg/docs/security/EGRESS_POLICY.md) · 🇧🇩 [bn](../../../bn/docs/security/EGRESS_POLICY.md) · 🇧🇦 [bs](../../../bs/docs/security/EGRESS_POLICY.md) · 🇨🇿 [cs](../../../cs/docs/security/EGRESS_POLICY.md) · 🇩🇰 [da](../../../da/docs/security/EGRESS_POLICY.md) · 🇩🇪 [de](../../../de/docs/security/EGRESS_POLICY.md) · 🇬🇷 [el](../../../el/docs/security/EGRESS_POLICY.md) · 🇪🇪 [et](../../../et/docs/security/EGRESS_POLICY.md) · 🇮🇷 [fa](../../../fa/docs/security/EGRESS_POLICY.md) · 🇫🇮 [fi](../../../fi/docs/security/EGRESS_POLICY.md) · 🇫🇷 [fr](../../../fr/docs/security/EGRESS_POLICY.md) · 🇮🇪 [ga](../../../ga/docs/security/EGRESS_POLICY.md) · 🇮🇳 [gu](../../../gu/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ha](../../../ha/docs/security/EGRESS_POLICY.md) · 🇮🇱 [he](../../../he/docs/security/EGRESS_POLICY.md) · 🇮🇳 [hi](../../../hi/docs/security/EGRESS_POLICY.md) · 🇭🇷 [hr](../../../hr/docs/security/EGRESS_POLICY.md) · 🇭🇺 [hu](../../../hu/docs/security/EGRESS_POLICY.md) · 🇦🇲 [hy](../../../hy/docs/security/EGRESS_POLICY.md) · 🇮🇩 [id](../../../id/docs/security/EGRESS_POLICY.md) · 🇳🇬 [ig](../../../ig/docs/security/EGRESS_POLICY.md) · 🇮🇹 [it](../../../it/docs/security/EGRESS_POLICY.md) · 🇯🇵 [ja](../../../ja/docs/security/EGRESS_POLICY.md) · 🇬🇪 [ka](../../../ka/docs/security/EGRESS_POLICY.md) · 🇰🇭 [km](../../../km/docs/security/EGRESS_POLICY.md) · 🇮🇳 [kn](../../../kn/docs/security/EGRESS_POLICY.md) · 🇰🇷 [ko](../../../ko/docs/security/EGRESS_POLICY.md) · 🇱🇹 [lt](../../../lt/docs/security/EGRESS_POLICY.md) · 🇱🇻 [lv](../../../lv/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ml](../../../ml/docs/security/EGRESS_POLICY.md) · 🇮🇳 [mr](../../../mr/docs/security/EGRESS_POLICY.md) · 🇲🇾 [ms](../../../ms/docs/security/EGRESS_POLICY.md) · 🇲🇹 [mt](../../../mt/docs/security/EGRESS_POLICY.md) · 🇲🇲 [my](../../../my/docs/security/EGRESS_POLICY.md) · 🇳🇵 [ne](../../../ne/docs/security/EGRESS_POLICY.md) · 🇳🇱 [nl](../../../nl/docs/security/EGRESS_POLICY.md) · 🇳🇴 [no](../../../no/docs/security/EGRESS_POLICY.md) · 🇮🇳 [or](../../../or/docs/security/EGRESS_POLICY.md) · 🇮🇳 [pa](../../../pa/docs/security/EGRESS_POLICY.md) · 🇵🇭 [phi](../../../phi/docs/security/EGRESS_POLICY.md) · 🇵🇱 [pl](../../../pl/docs/security/EGRESS_POLICY.md) · 🇵🇹 [pt](../../../pt/docs/security/EGRESS_POLICY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/EGRESS_POLICY.md) · 🇷🇴 [ro](../../../ro/docs/security/EGRESS_POLICY.md) · 🇷🇺 [ru](../../../ru/docs/security/EGRESS_POLICY.md) · 🇱🇰 [si](../../../si/docs/security/EGRESS_POLICY.md) · 🇸🇰 [sk](../../../sk/docs/security/EGRESS_POLICY.md) · 🇸🇮 [sl](../../../sl/docs/security/EGRESS_POLICY.md) · 🇷🇸 [sr](../../../sr/docs/security/EGRESS_POLICY.md) · 🇸🇪 [sv](../../../sv/docs/security/EGRESS_POLICY.md) · 🇰🇪 [sw](../../../sw/docs/security/EGRESS_POLICY.md) · 🇮🇳 [ta](../../../ta/docs/security/EGRESS_POLICY.md) · 🇮🇳 [te](../../../te/docs/security/EGRESS_POLICY.md) · 🇹🇭 [th](../../../th/docs/security/EGRESS_POLICY.md) · 🇹🇷 [tr](../../../tr/docs/security/EGRESS_POLICY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/EGRESS_POLICY.md) · 🇵🇰 [ur](../../../ur/docs/security/EGRESS_POLICY.md) · 🇺🇿 [uz](../../../uz/docs/security/EGRESS_POLICY.md) · 🇻🇳 [vi](../../../vi/docs/security/EGRESS_POLICY.md) · 🇳🇬 [yo](../../../yo/docs/security/EGRESS_POLICY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/EGRESS_POLICY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/EGRESS_POLICY.md)

---

> **Fija el tráfico saliente a una única familia IP — `auto`, `ipv4` o `ipv6` — por proxy, para que una salida exclusiva por IPv6 nunca vuelva silenciosamente a IPv4.**

> **Fuente de referencia:** `open-sse/utils/proxyFamily.ts`, `open-sse/utils/proxyDispatcher.ts`, `open-sse/utils/proxyFetch.ts`, `open-sse/utils/socksConnectorWithFamily.ts`, `open-sse/utils/proxyFamilyResolve.ts`, `src/shared/validation/schemas.ts`, `src/lib/db/proxies.ts`, `src/lib/db/upstreamProxy.ts`, `src/lib/db/migrations/099_proxy_family.sql`

OmniRoute permite que cada proxy tenga una **directiva de familia de direcciones para la salida**. De forma predeterminada, el sistema operativo elige IPv4 o IPv6 (pila dual, "Happy Eyeballs"). Cuando estableces la directiva en `ipv4` o `ipv6`, OmniRoute fija todas las conexiones a través de ese proxy a la familia elegida y **falla de forma cerrada** en lugar de recurrir a la otra familia.

Esta página documenta qué es la directiva, por qué existe, dónde se configura y cómo la resuelve el entorno de ejecución.

---

## Tabla de contenidos

- [Qué es](#what-it-is)
- [Por qué existe](#why-it-exists)
- [Los tres valores](#the-three-values)
- [Cómo configurarla](#how-to-configure-it)
- [Cómo se resuelve `auto`](#how-auto-resolves)
- [Cómo se aplican `ipv4` / `ipv6`](#how-ipv4--ipv6-are-enforced)
- [Compatibilidad con SOCKS5](#socks5-compatibility)
- [Comportamiento de fallo cerrado](#fail-closed-behavior)
- [Modelo de datos](#data-model)
- [Documentación relacionada](#related-documentation)

---

## Qué es

Cada proxy del registro tiene un campo `family` con tres valores posibles, validados mediante una enumeración de Zod:

```ts
// src/shared/validation/schemas.ts
family: z.enum(["auto", "ipv4", "ipv6"]).optional().default("auto"),
```

El valor predeterminado del campo es `"auto"`, lo que conserva el comportamiento anterior de pila dual. Establecerlo en `ipv4` o `ipv6` fija la familia de conexión para ese proxy.

La directiva se normaliza en todas partes mediante una única función auxiliar, de modo que cualquier valor desconocido se convierte en `auto`:

```ts
// open-sse/utils/proxyFamily.ts
export type ProxyFamily = "auto" | "ipv4" | "ipv6";

export function parseProxyFamily(value: unknown): ProxyFamily {
  return value === "ipv4" || value === "ipv6" ? value : "auto";
}
```

---

## Por qué existe

Se introdujo en el PR [#3777](https://github.com/diegosouzapw/OmniRoute/pull/3777). Los problemas que lo motivaron fueron:

| Problema                                                    | Qué soluciona la directiva                                                                                                                                                                                                                                                                                                                                                                     |
| ----------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **La salida exclusiva por IPv6 se filtra a IPv4**           | Cuando un host proxy tiene registros A y AAAA (o el sistema operativo prefiere IPv4), Happy Eyeballs puede establecer la salida mediante IPv4 aunque se pretenda usar una ruta exclusiva por IPv6. Fijar `ipv6` elimina esa filtración.                                                                                                                                                        |
| **Revocación por anomalías de salida compartida**           | Los proveedores con rotación (codex/openai) revocan tokens cuando muchas cuentas salen a través de la **misma** IP con un volumen elevado. Controlar la familia de salida ayuda a mantener las cuentas en rutas de salida distintas y predecibles (consulta [`src/lib/proxyEgress.ts`](../../src/lib/proxyEgress.ts) para ver los diagnósticos de IP de salida que complementan esta función). |
| **Salida determinista para cumplimiento normativo/pruebas** | Cuando se debe garantizar que el tráfico salga mediante una familia específica, `auto` no es suficiente.                                                                                                                                                                                                                                                                                       |

La directiva es intencionadamente **por proxy**, no global: distintos proxies del grupo pueden tener políticas diferentes.

---

## Los tres valores

| Valor  | Etiqueta de la IU   | Comportamiento                                                                                                                                                                                 |
| ------ | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto` | `Auto (dual-stack)` | El SO elige la familia. Para un host proxy que sea un literal de IP, la familia es intrínseca al literal; para un nombre de host, ambas familias son válidas. Este es el valor predeterminado. |
| `ipv4` | `IPv4 only`         | Restringe la conexión a IPv4. Falla de forma segura si el host proxy no tiene ningún registro IPv4 (A).                                                                                        |
| `ipv6` | `IPv6 only`         | Restringe la conexión a IPv6. Falla de forma segura si el host proxy no tiene ningún registro IPv6 (AAAA).                                                                                     |

Las cadenas de la IU se encuentran en `src/i18n/messages/en.json` (`labelFamily`, `familyAuto`, `familyIpv4`, `familyIpv6`, `familyHint`).

---

## Cómo configurarlo

### Panel de control

El selector se encuentra en el formulario de proxy de la pestaña **Proxy Pool**:

1. Abra **Dashboard → Settings → Proxy → Proxy Pool**
2. Añada o edite un proxy
3. Establezca el menú desplegable **IP family** en `Auto (dual-stack)`, `IPv4 only` o `IPv6 only`
4. Guarde los cambios

El control lo renderiza `ProxyRegistryManager.tsx` (montado en `proxy/ProxyPoolTab.tsx`).

### API

El campo `family` forma parte de las cargas útiles para crear o actualizar el registro de proxies, se valida mediante `createProxyRegistrySchema` / `updateProxyRegistrySchema` (`src/shared/validation/schemas.ts`) y lo gestionan `POST` / `PATCH /api/v1/management/proxies`:

```bash
# Crear un proxy exclusivo para IPv6
curl -X POST http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "IPv6 egress",
    "type": "socks5",
    "host": "proxy.example.com",
    "port": 1080,
    "family": "ipv6"
  }'

# Cambiar un proxy existente para que use exclusivamente IPv4
curl -X PATCH http://localhost:20128/api/v1/management/proxies \
  -H "Content-Type: application/json" \
  -d '{ "id": "proxy-uuid-here", "family": "ipv4" }'
```

El objeto de configuración de proxy en línea utilizado para las entradas de proxy ascendente también acepta el mismo campo (`upstream_proxy_config.family`; consulte el [Modelo de datos](#data-model)).

Para consultar el resto de la API de CRUD y asignación de proxies, consulte [PROXY_GUIDE.md](../ops/PROXY_GUIDE.md).

---

## Cómo se resuelve `auto`

Cuando `family` es `auto`, OmniRoute **no** añade ninguna directiva: la URL del proxy se utiliza tal cual y la familia de conexión se determina de forma intrínseca.

Al crear la URL (`proxyConfigToUrl` / `normalizeProxyUrl` en `open-sse/utils/proxyDispatcher.ts`), un proxy `auto` genera una URL simple sin ningún marcador:

```ts
// open-sse/utils/proxyDispatcher.ts
const fam = parseProxyFamily(config.family);
const normalized = normalizeProxyUrl(proxyUrlStr, "context proxy", {
  allowSocks5,
});
return fam === "auto" ? normalized : `${normalized}?family=${fam}`;
```

Al realizar el envío (`resolveDispatcherFamily`), `auto` se resuelve como la familia intrínseca de un host que sea un literal de IP, o como `null` (dejar que el SO decida) en el caso de un nombre de host:

```ts
// open-sse/utils/proxyDispatcher.ts
function resolveDispatcherFamily(parsed: URL): 4 | 6 | null {
  const directive = parseProxyFamily(parsed.searchParams.get("family") ?? undefined);
  const literal = detectIpLiteralFamily(parsed.hostname);
  if (directive === "auto") return literal; // null para un nombre de host → el SO elige
  // ...
}
```

Por tanto:

- `auto` + host que sea un literal de IP (`192.0.2.1` / `[2001:db8::1]`) → familia de ese literal.
- `auto` + nombre de host → `null` → resolución estándar de doble pila del SO.

---

## Cómo se aplican `ipv4` / `ipv6`

Una directiva distinta de `auto` se transmite como un único marcador de consulta sintético —`?family=ipv4` o `?family=ipv6`— que se añade una sola vez a la URL normalizada del proxy. `normalizeProxyUrl` se asegura de eliminar y volver a añadir este marcador exactamente una vez, para que nunca corrompa el análisis del puerto.

Cuando se construye el dispatcher, el marcador se lee y se convierte en una familia de conexión concreta. Si el host es un literal de IP de la familia **opuesta**, OmniRoute lanza un error (las contradicciones se gestionan mediante cierre seguro):

```ts
// open-sse/utils/proxyDispatcher.ts
const want = directive === "ipv6" ? 6 : 4;
if (literal !== null && literal !== want) {
  throw new Error(
    `[ProxyDispatcher] La directiva de familia del proxy ${directive} contradice el host literal ${literal === 6 ? "IPv6" : "IPv4"}`
  );
}
```

A continuación, la familia concreta se fija en el conector:

- **Proxies HTTP/HTTPS** (`ProxyAgent`): `proxyTls: { family, autoSelectFamily: false }` — desactiva Happy Eyeballs para que la familia elegida sea la única con la que se intente establecer la conexión.
- **Proxies SOCKS5**: un conector personalizado pasa `socket_options: { family, autoSelectFamily: false }` al cliente SOCKS (consulte [Compatibilidad con SOCKS5](#compatibilidad-con-socks5)).

---

## Compatibilidad con SOCKS5

La fijación de familia funciona con proxies SOCKS5, pero la versión estándar de `fetch-socks` no expone las opciones de socket necesarias para fijar la familia del salto del proxy. OmniRoute incluye su propio conector para ello:

```ts
// open-sse/utils/socksConnectorWithFamily.ts
export function buildSocksFamilySocketOptions(family: 4 | 6 | null): Record<string, unknown> {
  if (family === 6) return { family: 6, autoSelectFamily: false };
  if (family === 4) return { family: 4, autoSelectFamily: false };
  return {};
}
```

Todos los envíos mediante SOCKS5 pasan por `createSocksDispatcherWithFamily`, independientemente de `family` (incluidos `null` / `auto` sobre un nombre de host): `buildSocksFamilySocketOptions(null)` produce `{}`, y se utiliza la misma ruta `SocksClient.createConnection` + TLS `buildConnector`, con la fijación mediante `socket_options`, para que Happy Eyeballs no pueda elegir IPv4 en una política de salida exclusiva para IPv6.

La compatibilidad con SOCKS5 está activada de forma predeterminada (puede desactivarse mediante `ENABLE_SOCKS5_PROXY=false`); consulte [PROXY_GUIDE.md → Variables de entorno](../ops/PROXY_GUIDE.md#environment-variables).

---

## Comportamiento de cierre seguro

El objetivo de la directiva es **rechazar** la conexión en lugar de recurrir silenciosamente a la familia incorrecta. Dos comprobaciones garantizan este comportamiento:

1. **Contradicción de literal** — una directiva que contradiga un host expresado como literal de IP provoca un error durante la construcción del dispatcher (`resolveDispatcherFamily`, mostrado anteriormente).

2. **Comprobación DNS preliminar del nombre de host** — para un proxy con nombre de host y una familia fijada, `proxyFetch.ts` verifica que el nombre de host tenga realmente un registro de la familia requerida **antes** de iniciar la salida, mediante `assertHostnameSupportsFamily`:

   ```ts
   // open-sse/utils/proxyFamilyResolve.ts
   const hasFamily = records.some((r) => r.family === family);
   if (!hasFamily) {
     throw new Error(
       `[ProxyFamily] El host del proxy ${host} no tiene ningún registro ${family === 6 ? "IPv6 (AAAA)" : "IPv4 (A)"}; ` +
         `se rechaza la salida exclusiva para ${family === 6 ? "IPv6" : "IPv4"} (cierre seguro)`
     );
   }
   ```

   En caso de error, `proxyFetch.ts` etiqueta el error con `code = "PROXY_FAMILY_UNAVAILABLE"` y `statusCode = 503`. Un error de resolución DNS también se trata mediante cierre seguro (se rechaza la salida).

La comprobación DNS preliminar no realiza ninguna operación para los hosts expresados como literales de IP: su familia es intrínseca y no requiere ninguna consulta.

---

## Modelo de datos

La columna `family` se añadió mediante la migración `099_proxy_family.sql` a **dos** tablas:

```sql
-- src/lib/db/migrations/099_proxy_family.sql
ALTER TABLE proxy_registry ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
ALTER TABLE upstream_proxy_config ADD COLUMN family TEXT NOT NULL DEFAULT 'auto';
```

- `proxy_registry.family` — la directiva por proxy para las entradas del registro (`src/lib/db/proxies.ts`). Las consultas de resolución seleccionan `family` junto con las demás columnas del proxy, y un valor ausente o que no sea una cadena se convierte en `"auto"`.
- `upstream_proxy_config.family` — la directiva para las entradas de proxy ascendente (`src/lib/db/upstreamProxy.ts`), con el mismo valor predeterminado `"auto"`.

Cuando un objeto de proxy resuelto contiene un valor de `family` distinto de `auto`, `proxyConfigToUrl` añade el marcador `?family=` para que la configuración fijada llegue intacta hasta el dispatcher.

---

## Documentación relacionada

> 📖 **Documentación relacionada:**
>
> - [Guía de proxies](../ops/PROXY_GUIDE.md) — sistema completo de proxies: CRUD del registro, resolución en 4 niveles, rotación, comprobaciones de estado y referencia de la API
> - `docs/security/STEALTH_GUIDE.md` (git; no se compila en `/docs`) — capas de huella digital TLS y de la CLI que funcionan sobre el proxy
> - [Niveles de protección de rutas](./ROUTE_GUARD_TIERS.md) — aplicación obligatoria de loopback para rutas exclusivamente locales
