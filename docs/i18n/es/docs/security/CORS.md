# CORS Configuration & Security (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇧🇦 [bs](../../../bs/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute controla qué **orígenes de navegador** pueden leer respuestas entre orígenes
mediante una única lista de permitidos centralizada. El modelo está **cerrado de forma predeterminada**:
ningún origen está permitido hasta que lo autorice explícitamente. Esta página documenta cómo se resuelve
la lista de permitidos, qué expone realmente `CORS_ALLOW_ALL=true` (y, lo que es importante, qué
**no** expone), cómo configurar de forma segura los entornos de desarrollo y producción, y la advertencia
en tiempo de ejecución que muestra el panel cuando hay activo un comodín.

**Fuente de verdad:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). La lista de permitidos se aplica una sola vez, en el
middleware (`src/server/authz/pipeline.ts`); los controladores de cada ruta no establecen
`Access-Control-Allow-Origin` por sí mismos.

## Cómo se resuelve un origen

Para cada solicitud, el middleware calcula el valor de `Access-Control-Allow-Origin`
en este orden:

1. **`CORS_ALLOW_ALL=true`** (o el valor heredado `CORS_ORIGIN=*`) → devuelve el
   `Origin` del solicitante (o `*` cuando no hay ningún encabezado `Origin`), con `Vary: Origin`
   para que las cachés sigan siendo correctas. El mismo punto de control `applyCorsHeaders()` también añade
   `Vary: Accept-Encoding` a cada respuesta 2xx con cuerpo en la superficie
   `/v1*`/`/v1beta*` autenticada mediante token (`relaxForTokenAuth`, RFC 9110 §12.5.5, incidencia #6737), para que
   las cachés compartidas o posteriores puedan distinguir correctamente entre las variantes comprimidas y sin comprimir.
2. De lo contrario, el `Origin` de la solicitud se normaliza (se convierte a minúsculas y se
   elimina la barra final) y se compara con la **lista de permitidos combinada**:
   - la variable de entorno **`CORS_ALLOWED_ORIGINS`** — lista separada por comas, y
   - la configuración **`corsOrigins`** en tiempo de ejecución (Panel → Seguridad → _Orígenes CORS
     permitidos_), inyectada mediante `setRuntimeAllowedOrigins()` desde
     `src/lib/config/runtimeSettings.ts`.
3. Sin coincidencia → **no se emite ningún encabezado `Access-Control-Allow-Origin`**. El navegador
   bloquea la lectura entre orígenes. Este es el comportamiento cerrado predeterminado previsto.

| Variable de entorno    | Significado                                                                                        |
| ---------------------- | -------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV de orígenes exactos que se deben permitir (recomendado).                                       |
| `CORS_ALLOW_ALL`       | `true`/`1` → devuelve cualquier origen (comodín). Solo para desarrollo.                            |
| `CORS_ORIGIN`          | Heredada. `*` se comporta como `CORS_ALLOW_ALL`; un único valor se añade a la lista de permitidos. |

## Modelo de amenazas — qué expone realmente `CORS_ALLOW_ALL=true`

Vale la pena tomarse en serio la advertencia genérica de OWASP («CORS con comodín = cualquier sitio puede llamar a su API»),
pero la exposición de OmniRoute es **más limitada que en el caso genérico**,
debido a un hecho concreto de la implementación:

> **El `applyCorsHeaders()` central nunca emite
> `Access-Control-Allow-Credentials`.** Un navegador no expondrá una respuesta entre orígenes
> _con credenciales_ (que incluya cookies), a menos que el servidor envíe
> `Access-Control-Allow-Credentials: true`. La ruta CORS compartida de OmniRoute nunca
> lo hace.

Esto es lo que significa para cada superficie, incluso con `CORS_ALLOW_ALL=true`:

| Superficie                          | Mecanismo de autenticación      | Efecto de CORS con comodín                                                                                                                                                                                                                         |
| ----------------------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Panel / MANAGEMENT `/api/*`         | Sesión mediante cookie          | El origen se devuelve, pero **sin `Allow-Credentials`** el navegador **bloquea** la lectura con credenciales. Un sitio malicioso de otro origen **no puede leer** las respuestas autenticadas de su panel y la cookie de sesión no queda expuesta. |
| API de cliente `/v1/*`, `/v1beta/*` | Encabezado Bearer / `x-api-key` | Ya es permisiva **por diseño** (`relaxForTokenAuth`): los navegadores nunca adjuntan automáticamente `Authorization`/`x-api-key`, por lo que la página de un atacante no puede proporcionar su clave. `CORS_ALLOW_ALL` no amplía esta exposición.  |
| Lectura pública (`/api/health`, …)  | Ninguno                         | No contiene información confidencial; el comodín es inocuo.                                                                                                                                                                                        |

Por tanto, la exposición **residual** de `CORS_ALLOW_ALL=true` se limita a: (a)
**lecturas** entre orígenes sin credenciales de datos que ya no requerían autenticación, y (b)
permitir que la **solicitud de comprobación previa** de CORS se complete en las rutas de administración, que siguen requiriendo una autenticación
que una página de otro origen no puede proporcionar. **No** constituye un vector de secuestro de sesión ni
de robo de credenciales en la ruta CORS compartida.

### Una excepción real — `/api/v1/agents/`

Las rutas de Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) establecen
sus **propios** encabezados CORS
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) y **sí** emiten
`Access-Control-Allow-Origin: <origin>|*` junto con
`Access-Control-Allow-Credentials: true`. Esta es la única superficie en la que
la devolución del origen y las credenciales coexisten, y es **independiente de
`CORS_ALLOW_ALL`**. Estas rutas están autenticadas para administración
(`requireManagementAuth`); los operadores que expongan el panel fuera del host deben
tener en cuenta que este es el único lugar donde los encabezados de respuesta permiten una lectura entre orígenes con credenciales.
La restricción de este comportamiento a una lista explícita de permitidos se gestiona
por separado de estas directrices sobre CORS.

## Lista de comprobación para producción

- **Nunca establezca `CORS_ALLOW_ALL=true` en producción.** Déjelo sin definir.
- Establezca una lista de orígenes **explícita**, ya sea mediante la variable de entorno o el campo de la pestaña Seguridad:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Si OmniRoute se ejecuta detrás de un proxy inverso/túnel (nginx, Caddy, Cloudflare
  Tunnel, Tailscale), CORS **no** es su único control: la protección de rutas de
  bucle local sigue protegiendo las rutas capaces de iniciar procesos (consulte
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). No falsifique
  `X-Forwarded-For: 127.0.0.1` para «solucionar» un error 403; eso vuelve a abrir la clase de RCE que
  cierra la protección de rutas.
- Confirme el estado de ejecución: el panel muestra un **banner ámbar persistente**
  en Panel → Seguridad → Inventario de autorizaciones siempre que
  `CORS_ALLOW_ALL=true` esté activo, y `/api/settings/authz-inventory` devuelve un
  contenedor `cors: { allowAll, allowedOrigins }` que las herramientas de supervisión pueden consultar.

## Comodidad durante el desarrollo: permitir orígenes locales específicos

Rara vez se necesita el comodín, incluso durante el desarrollo. Permita únicamente los servidores de desarrollo que utilice:

```bash
# Servidores de desarrollo Vite (5173) + Next.js (3000) que llaman a un OmniRoute local
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Los orígenes se comparan sin distinguir entre mayúsculas y minúsculas e ignorando la barra final, por lo que
`http://localhost:3000` y `http://localhost:3000/` son equivalentes. El mismo CSV
puede configurarse durante la ejecución en **Panel → Seguridad → Orígenes CORS permitidos** sin
reiniciar.

## Claves de API frente a sesiones con cookies

- **Bearer/`x-api-key` (la superficie de inferencia `/v1/*`):** los navegadores nunca adjuntan
  estos datos automáticamente. CORS no constituye una barrera significativa aquí —la clave de API es la
  barrera—, razón por la que esta superficie es intencionadamente permisiva para que los clientes web y
  Electron puedan leer las respuestas a las que ya tienen derecho.
- **Sesión con cookies (el panel):** está protegida por el valor predeterminado de cierre ante fallos **y**
  por la ausencia de `Access-Control-Allow-Credentials` en la ruta compartida. Mantenga
  los orígenes de administración/del panel fuera de cualquier configuración permisiva; deben permanecer
  completamente cerrados ante fallos.

## Ejemplo: proxy inverso delante de OmniRoute

OmniRoute aplica CORS directamente, por lo que, en general, el proxy **no** debe añadir ni
reescribir encabezados `Access-Control-*` (los encabezados duplicados provocan errores en los navegadores). Termine TLS
y reenvíe la solicitud; deje que OmniRoute responda a la solicitud preliminar:

```nginx
# nginx — reenviar a OmniRoute; NO inyectar Access-Control-* aquí
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # NO establecer X-Forwarded-For en 127.0.0.1; esto anula la protección de rutas de bucle local.
}
```

Establezca los orígenes permitidos del navegador en OmniRoute (`CORS_ALLOWED_ORIGINS` o la
pestaña Seguridad), no en el proxy.

## Archivos de origen

| Aspecto                                                    | Archivo                                                              |
| ---------------------------------------------------------- | -------------------------------------------------------------------- |
| Resolución de la lista de permitidos + `getCorsStatus()`   | `src/server/cors/origins.ts`                                         |
| Aplicación del middleware (única fuente de verdad)         | `src/server/authz/pipeline.ts`                                       |
| Configuración → inyección de orígenes durante la ejecución | `src/lib/config/runtimeSettings.ts`                                  |
| Estado de ejecución para el panel                          | `src/app/api/settings/authz-inventory/route.ts`                      |
| Banner de advertencia del panel                            | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| Campo de orígenes CORS permitidos                          | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| CORS por ruta de Cloud-Agent (la excepción)                | `src/lib/cloudAgent/api.ts`                                          |

## Véase también

- [Niveles de protección de rutas](./ROUTE_GUARD_TIERS.md) — aplicación de restricciones de loopback para
  rutas con capacidad de generar procesos (un control independiente y complementario).
- [Guía de autorización](../architecture/AUTHZ_GUIDE.md) — el flujo completo de autenticación.
