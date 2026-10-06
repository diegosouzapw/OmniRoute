# Router Backends & Embedded Services — architecture contract (ADR) (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Estado:** Aceptado · **Contexto:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Contrato:** `domain/routing/routerBackends.ts`
> (registro tipado — el código se incorpora con [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

Este ADR establece cómo se relacionan entre sí `ts` (nativo), `bifrost`, `cliproxy`, `9router` y
los motores compatibles con VibeProxy, para que los colaboradores dejen de
confundir dos conceptos que son arquitectónicamente distintos. Documenta el registro
tipado introducido por el trabajo del registro de backends de enrutamiento como la única fuente de
verdad para ese modelo.

## La distinción fundamental — dos ejes ortogonales

El rol de un motor se describe mediante **dos ejes independientes**, codificados conjuntamente en la
definición `RouterBackendDefinition` del registro:

1. **Ciclo de vida** (`RouterBackendLifecycle`) — _cómo se ejecuta el motor_:
   - `in-process` — se ejecuta dentro del proceso Node de OmniRoute (el pipeline nativo de TS).
   - `supervised` — un proceso secundario local que OmniRoute instala/inicia/detiene/supervisa
     mediante `ServiceSupervisor` y que después consume como una conexión de proveedor.
   - `external` — un endpoint HTTP al que OmniRoute envía solicitudes, pero que **no** administra
     (configurado mediante una URL base de entorno).
   - `disabled` — registrado, pero no seleccionable.
2. **Eje de selección** (backend de enrutamiento del relay) — _si el relay le envía solicitudes_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` en
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

El error que debe evitarse: tratar «servicio integrado» y «backend de enrutamiento» como una única
lista. No lo son. Un motor `supervised` (9router/cliproxy) es una **conexión de
proveedor consumida por el pipeline nativo**, no un backend alternativo de envío del
relay. `bifrost` es el caso inverso: un backend de envío del relay que (históricamente)
solo era `external`.

## El registro — única fuente de verdad

El contrato `domain/routing/routerBackends.ts` (el código se incorpora con
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) declara cada motor una vez, con su
ciclo de vida, capacidades, identidad de servicio, puerto predeterminado, configuración de
estado y compatibilidad con telemetría. Los consumidores buscan motores mediante `getRouterBackend(id)`,
`listRouterBackends()` y `listRouterBackendsByCapability(cap)` en lugar de
tratar cada servicio auxiliar como un caso especial.

| Backend     | Ciclo de vida | Servicio (eje A) | Backend del relay (eje B)  | Estado        | Puerto predeterminado |
| ----------- | ------------- | ---------------- | -------------------------- | ------------- | --------------------- |
| `ts`        | `in-process`  | —                | `ts` (nativo)              | —             | —                     |
| `bifrost`   | `external`¹   | —¹               | `bifrost` / `auto`         | `/health`     | —                     |
| `cliproxy`  | `supervised`  | `cliproxy`       | — (proveedor)              | `/v1/models`  | 8317                  |
| `9router`   | `supervised`  | `9router`        | — (proveedor)              | `/api/health` | 20130                 |
| `vibeproxy` | `external`    | —                | — (adaptador de proveedor) | `/v1/models`  | —                     |

¹ El ascenso de Bifrost a servicio integrado `supervised` (instalable/iniciable
desde `/api/services/bifrost/`) se sigue en
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); hasta que se fusione,
Bifrost solo es `external` (accesible únicamente mediante `BIFROST_BASE_URL`).

Las `capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) permiten que quienes invocan el registro
filtren por lo que un motor realmente puede hacer, en lugar de codificar ramas específicas para cada id.

## Eje A — servicios integrados (lado del proceso supervisado)

- **Registro de procesos supervisados:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (actualmente: `9router`, `cliproxy`).
- **Propietario del ciclo de vida:** `src/lib/services/ServiceSupervisor.ts` — `start()` crea el
  proceso hijo, espera a que `waitForHealthy()` se cumpla y captura stdout/stderr en un búfer circular;
  `stop()` SIGTERM→SIGKILL; todo se serializa mediante un bloqueo.
- **Unión de estados** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, además de un
  `HealthState = healthy | unhealthy | unknown` ortogonal.
- **¿Por qué un proceso separado (y no un SDK en proceso)?** El aislamiento de procesos es lo que permite
  controlar de manera independiente la instalación, el inicio, la detención, el estado y los registros de cada proceso auxiliar, además de
  permitir que se aplique la protección de creación de procesos mediante loopback. Modelar un adaptador en proceso es trabajo futuro; el
  indicador de capacidad `native-hot-path` es donde se expresaría.

### Contrato de las rutas del ciclo de vida (`/api/services/<tool>/…`)

Los códigos de estado son **específicos del estado/verbo/ruta por diseño**; este es el contrato, no
una incoherencia:

| Llamada                         | Condición                               | Estado                               |
| ------------------------------- | --------------------------------------- | ------------------------------------ |
| `POST .../start`                | servicio `not_installed`                | **409** (precondición)               |
| `POST .../stop`                 | ya está detenido                        | **200** (operación nula idempotente) |
| `GET .../status`                | correcto                                | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`                | error al crear el proceso               | **503** (transitorio)                |
| `GET .../status`, `.../stop`    | error no capturado                      | **500**                              |
| `GET /api/services/<x>/logs`    | herramienta `<x>` desconocida           | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`     | falta `X-Reveal-Confirm: yes`           | **403** (solo 9router)               |
| **cualquier** `/api/services/*` | el llamador no usa loopback/LAN privada | **403 LOCAL_ONLY**                   |

Todos los cuerpos de error tienen la estructura definida por `createErrorResponse()` →
`{ error: { message, type }, requestId }`, donde `type` se deriva del estado
(`500→server_error`, `404→not_found`, `409→conflict`; de lo contrario, `invalid_request`) y es
el discriminador procesable por máquinas. Los mensajes se sanean previamente
(`sanitizeErrorMessage()`, regla estricta n.º 12).

**La protección de loopback** es la causa más común de un `403`: `/api/services/` está en
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) y
`src/server/authz/policies/management.ts` rechaza a cualquier llamador que no use loopback ni una LAN privada
**antes de la autenticación**, porque estas rutas crean procesos hijos (reglas estrictas 15
y 17). Acceder a ellas mediante un túnel público devuelve un `403` por diseño.

## Eje B — backend de enrutamiento del relé (lado del despacho)

Solo la ruta del proxy de relé `/api/v1/relay/chat/completions` selecciona un backend de
despacho; la superficie principal `/api/v1/chat/completions` nunca consulta
`routingBackend.ts`.

- **Selección** (`resolveRelayRoutingBackend`): una única opción global del entorno —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Si no se establece, se usa `auto` cuando Bifrost está configurado y habilitado; de lo contrario, `ts`.
- **Comportamiento:**
  - `bifrost` (forzado): un fallo de Bifrost → `502` definitivo, sin alternativa.
  - `auto`: intenta usar Bifrost y, en caso de fallo o período de espera, recurre silenciosamente a la implementación nativa.
  - `ts` / después de recurrir a la alternativa: la canalización nativa de traducción/ejecución `open-sse`.
- **Período de espera:** período de espera tras fallos por cada `baseUrl` en `bifrostCooldown.ts`.

Actualmente, la selección es **de todo o nada en el nivel del relé**; no existe un cambio de motor
por proveedor ni por solicitud en `release/v3.8.43`. El control por solicitud se está incorporando
mediante el trabajo del manifiesto del proceso auxiliar
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869), manifiesto +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870), `shouldTryBifrostForRequest`),
lo que permite que `auto` enrute mediante Bifrost únicamente a los proveedores aptos según el manifiesto.

## Integración con el panel

El panel de servicios consulta `GET /api/services/<tool>/status` cada 5s mediante
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
y devuelve `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. No existe un proveedor compartido de contexto de disponibilidad:
cada componente invoca el hook para cada herramienta. Cuando se produce `!res.ok`, actualmente el hook muestra
únicamente `HTTP <status>`; asignar el campo `error.type` a una explicación comprensible para el usuario es una
mejora de UX registrada, no un cambio del contrato.

## Consecuencias

- Los motores nuevos se registran una sola vez en `ROUTER_BACKENDS`; los consumidores los obtienen mediante consultas
  de capacidades, sin nuevas ramas específicas para cada id.
- La pregunta «¿Es este un servicio o un backend de enrutamiento?» se responde mediante el campo `lifecycle`, no
  según la lista en la que aparezca un id.
- La supervisión de Bifrost (#5817) y la migración de la ruta crítica nativa (#5670) se basan en este
  contrato compartido, en lugar de tratar cada sidecar como un caso especial.
