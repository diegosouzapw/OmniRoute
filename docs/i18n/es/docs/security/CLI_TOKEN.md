# CLI Machine-ID Token (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CLI_TOKEN.md) · 🇪🇹 [am](../../../am/docs/security/CLI_TOKEN.md) · 🇸🇦 [ar](../../../ar/docs/security/CLI_TOKEN.md) · 🇦🇿 [az](../../../az/docs/security/CLI_TOKEN.md) · 🇧🇬 [bg](../../../bg/docs/security/CLI_TOKEN.md) · 🇧🇩 [bn](../../../bn/docs/security/CLI_TOKEN.md) · 🇨🇿 [cs](../../../cs/docs/security/CLI_TOKEN.md) · 🇩🇰 [da](../../../da/docs/security/CLI_TOKEN.md) · 🇩🇪 [de](../../../de/docs/security/CLI_TOKEN.md) · 🇬🇷 [el](../../../el/docs/security/CLI_TOKEN.md) · 🇪🇪 [et](../../../et/docs/security/CLI_TOKEN.md) · 🇮🇷 [fa](../../../fa/docs/security/CLI_TOKEN.md) · 🇫🇮 [fi](../../../fi/docs/security/CLI_TOKEN.md) · 🇫🇷 [fr](../../../fr/docs/security/CLI_TOKEN.md) · 🇮🇪 [ga](../../../ga/docs/security/CLI_TOKEN.md) · 🇮🇳 [gu](../../../gu/docs/security/CLI_TOKEN.md) · 🇳🇬 [ha](../../../ha/docs/security/CLI_TOKEN.md) · 🇮🇱 [he](../../../he/docs/security/CLI_TOKEN.md) · 🇮🇳 [hi](../../../hi/docs/security/CLI_TOKEN.md) · 🇭🇷 [hr](../../../hr/docs/security/CLI_TOKEN.md) · 🇭🇺 [hu](../../../hu/docs/security/CLI_TOKEN.md) · 🇦🇲 [hy](../../../hy/docs/security/CLI_TOKEN.md) · 🇮🇩 [id](../../../id/docs/security/CLI_TOKEN.md) · 🇳🇬 [ig](../../../ig/docs/security/CLI_TOKEN.md) · 🇮🇹 [it](../../../it/docs/security/CLI_TOKEN.md) · 🇯🇵 [ja](../../../ja/docs/security/CLI_TOKEN.md) · 🇬🇪 [ka](../../../ka/docs/security/CLI_TOKEN.md) · 🇰🇭 [km](../../../km/docs/security/CLI_TOKEN.md) · 🇮🇳 [kn](../../../kn/docs/security/CLI_TOKEN.md) · 🇰🇷 [ko](../../../ko/docs/security/CLI_TOKEN.md) · 🇱🇹 [lt](../../../lt/docs/security/CLI_TOKEN.md) · 🇱🇻 [lv](../../../lv/docs/security/CLI_TOKEN.md) · 🇮🇳 [ml](../../../ml/docs/security/CLI_TOKEN.md) · 🇮🇳 [mr](../../../mr/docs/security/CLI_TOKEN.md) · 🇲🇾 [ms](../../../ms/docs/security/CLI_TOKEN.md) · 🇲🇹 [mt](../../../mt/docs/security/CLI_TOKEN.md) · 🇲🇲 [my](../../../my/docs/security/CLI_TOKEN.md) · 🇳🇵 [ne](../../../ne/docs/security/CLI_TOKEN.md) · 🇳🇱 [nl](../../../nl/docs/security/CLI_TOKEN.md) · 🇳🇴 [no](../../../no/docs/security/CLI_TOKEN.md) · 🇮🇳 [or](../../../or/docs/security/CLI_TOKEN.md) · 🇮🇳 [pa](../../../pa/docs/security/CLI_TOKEN.md) · 🇵🇭 [phi](../../../phi/docs/security/CLI_TOKEN.md) · 🇵🇱 [pl](../../../pl/docs/security/CLI_TOKEN.md) · 🇵🇹 [pt](../../../pt/docs/security/CLI_TOKEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CLI_TOKEN.md) · 🇷🇴 [ro](../../../ro/docs/security/CLI_TOKEN.md) · 🇷🇺 [ru](../../../ru/docs/security/CLI_TOKEN.md) · 🇱🇰 [si](../../../si/docs/security/CLI_TOKEN.md) · 🇸🇰 [sk](../../../sk/docs/security/CLI_TOKEN.md) · 🇸🇮 [sl](../../../sl/docs/security/CLI_TOKEN.md) · 🇷🇸 [sr](../../../sr/docs/security/CLI_TOKEN.md) · 🇸🇪 [sv](../../../sv/docs/security/CLI_TOKEN.md) · 🇰🇪 [sw](../../../sw/docs/security/CLI_TOKEN.md) · 🇮🇳 [ta](../../../ta/docs/security/CLI_TOKEN.md) · 🇮🇳 [te](../../../te/docs/security/CLI_TOKEN.md) · 🇹🇭 [th](../../../th/docs/security/CLI_TOKEN.md) · 🇹🇷 [tr](../../../tr/docs/security/CLI_TOKEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CLI_TOKEN.md) · 🇵🇰 [ur](../../../ur/docs/security/CLI_TOKEN.md) · 🇺🇿 [uz](../../../uz/docs/security/CLI_TOKEN.md) · 🇻🇳 [vi](../../../vi/docs/security/CLI_TOKEN.md) · 🇳🇬 [yo](../../../yo/docs/security/CLI_TOKEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CLI_TOKEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CLI_TOKEN.md)

---

## Descripción general

Los comandos de OmniRoute CLI se autentican en la API de administración local mediante un
token `HMAC-SHA256(machine-id, salt)` enviado a través del encabezado de solicitud
`x-omniroute-cli-token`.

Esto permite que los subcomandos de la CLI (`omniroute status`, `omniroute providers`, etc.)
llamen a los endpoints de administración sin exigir que el usuario proporcione un JWT o una
contraseña en cada ejecución.

## Cómo funciona

1. `getMachineTokenSync()` lee el identificador de hardware de la máquina mediante `node-machine-id`
   (si falla, utiliza una cadena vacía, lo que deshabilita la autenticación de la CLI).
2. Calcula `HMAC-SHA256(machine_id, salt)` y devuelve el resumen hexadecimal completo de 64 caracteres:
   un token determinista y no reversible vinculado a esta máquina.
3. La CLI envía el token como `x-omniroute-cli-token` únicamente cuando el destino
   resuelto es una URL de loopback explícita (`localhost`, `127.0.0.0/8` o
   IPv6 de loopback). Las solicitudes que incluyen el token utilizan `redirect: error`, por lo que una
   redirección local no puede reenviarlo a otro origen. Los contextos remotos utilizan tokens
   de acceso con ámbito limitado. Si no es posible derivarlo, la CLI omite el encabezado
   y `omniroute doctor` informa del fallo en lugar de considerar válido un token vacío.
4. El servidor (`src/server/authz/policies/management.ts`) vuelve a calcular el
   token esperado con el mismo salt y lo compara mediante `timingSafeEqual` para
   impedir su extracción mediante ataques de temporización.

## Propiedades de seguridad

| Propiedad                              | Detalle                                                                                                                                                                                                                                    |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Solo loopback**                      | Solo se acepta cuando la marca de localidad del par de confianza del servidor (derivada de la dirección real del par TCP) indica loopback. Nunca se confía en el encabezado `Host` controlado por el cliente para determinar la localidad. |
| **Comparación en tiempo constante**    | `crypto.timingSafeEqual` impide los ataques de temporización.                                                                                                                                                                              |
| **No reversible**                      | La salida de HMAC no permite recuperar el identificador de la máquina.                                                                                                                                                                     |
| **Sin elusión de protección `always`** | `isAlwaysProtectedPath()` se evalúa antes de comprobar el token de la CLI. `/api/shutdown` y `/api/settings/database` siempre requieren un JWT.                                                                                            |
| **No exportable**                      | El token nunca se escribe en el disco ni se registra.                                                                                                                                                                                      |

## Salt predeterminado (aleatorio por instalación)

Cuando `OMNIROUTE_CLI_SALT` no está definido, el salt es una cadena hexadecimal aleatoria de 64 caracteres
que se genera una sola vez y se guarda en `<DATA_DIR>/cli-token-salt.json` (modo `0600`), no
el literal `omniroute-cli-auth-v1` incluido en el repositorio. Tanto `getActiveSalt()` en
`src/lib/machineToken.ts` como su equivalente en `bin/cli/utils/cliToken.mjs` leen el
mismo archivo, por lo que el servidor y cada ejecución de la CLI en esta instalación convergen en el
mismo valor; el literal incluido en el repositorio solo se utiliza como último recurso cuando aún no
se puede establecer un salt persistente o procedente del entorno (por ejemplo, en una instalación nueva
que solo incluya la CLI antes de que el servidor se haya ejecutado alguna vez). Esto corrige una debilidad
del antiguo valor literal fijo predeterminado: `/etc/machine-id` suele ser legible por cualquier usuario,
por lo que, de otro modo, cualquier usuario local podría derivar el mismo token para todas las instalaciones
que nunca hubieran definido `OMNIROUTE_CLI_SALT`.

## Rotación de la sal

Establezca `OMNIROUTE_CLI_SALT` para rotar el token derivado sin realizar cambios en el código; siempre tiene prioridad sobre la sal persistente de cada instalación. Después de la rotación, todos los procesos de la CLI en esta máquina utilizarán automáticamente el nuevo token. Resulta útil después de una filtración de la lista de procesos que pueda haber expuesto el valor derivado anterior.

```bash
# Rotación persistente (añadir al perfil del shell)
export OMNIROUTE_CLI_SALT="my-secret-salt-2026"

# Verificar que se está utilizando el nuevo token
omniroute status
```

## Formato heredado (SHA-256, 32 caracteres) — todavía aceptado

Antes del formato HMAC anterior, la CLI derivaba su token como
`SHA-256(machineId + salt).hex[0..32]` (un prefijo de 32 caracteres) en
`bin/cli/utils/cliToken.mjs` (`getLegacyCliTokenSync` en `src/lib/machineToken.ts`).

Para mantener la compatibilidad con versiones anteriores, el servidor acepta **ambos** formatos: el verificador construye
`expectedTokens = [getMachineTokenSync(), getLegacyCliTokenSync()]` y compara el
encabezado entrante con cada uno mediante `timingSafeEqual`
(`src/server/authz/policies/management.ts` y `src/lib/middleware/cliTokenAuth.ts`).
Por tanto, un token es válido si coincide con **cualquiera de los dos**: el resumen HMAC de 64 caracteres o el prefijo SHA-256 heredado de 32 caracteres.

**Desactivación:** establezca `OMNIROUTE_DISABLE_CLI_TOKEN=true` (en el entorno o en `.env`) para deshabilitar por completo el mecanismo de tokens de la CLI; en ese caso, todo acceso requiere una clave de API explícita. Esto se recomienda en hosts multiusuario, ya que `machine-id` es específico del dispositivo (no del usuario) y otro usuario del mismo host podría calcular el mismo token.

## Archivos

| Archivo                                   | Propósito                                                   |
| ----------------------------------------- | ----------------------------------------------------------- |
| `src/lib/machineToken.ts`                 | Derivación del token (`getMachineTokenSync`)                |
| `bin/cli/utils/cliToken.mjs`              | Réplica de la misma derivación del lado de la CLI           |
| `<DATA_DIR>/cli-token-salt.json`          | Sal aleatoria persistente por instalación                   |
| `src/server/authz/headers.ts`             | Constante `CLI_TOKEN_HEADER`                                |
| `src/server/authz/policies/management.ts` | Verificación del lado del servidor                          |
| `src/server/authz/routeGuard.ts`          | Comprobación del host de bucle invertido (`isLoopbackHost`) |

## Véase también

- `docs/security/ROUTE_GUARD_TIERS.md` — niveles de protección de rutas
- `docs/architecture/AUTHZ_GUIDE.md` — proceso completo de autorización
