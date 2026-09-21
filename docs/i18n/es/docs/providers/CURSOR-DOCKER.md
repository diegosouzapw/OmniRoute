# Cursor Provider in Docker Environments (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

Cuando OmniRoute se ejecuta dentro de Docker, los flujos heredados **Importar desde Cursor IDE** /
`cursor-agent` fallan porque el contenedor no puede acceder a la instalación de Cursor
del host. Utilice en su lugar **Iniciar sesión con Cursor** (PKCE de deep-control).

## Por qué falla la importación desde el IDE / CLI en Docker

1. **Aislamiento del sistema de archivos** — La importación automática busca rutas de Linux como
   `~/.config/Cursor/User/globalStorage/state.vscdb` _dentro_ del contenedor.
   En Docker Desktop para macOS, la base de datos del IDE del host no se monta de forma predeterminada y
   el sistema operativo del contenedor es Linux incluso cuando el host es Darwin.
2. **No existe el binario `cursor-agent`** — Las imágenes oficiales de OmniRoute no incluyen
   `cursor-agent`. Anteriormente, Modelos disponibles ejecutaba
   `cursor-agent --list-models` y, si fallaba, recurría a un catálogo estático.
3. **Binario incorrecto** — **No** monte mediante bind mount un `cursor-agent` de macOS en un contenedor
   Linux. No podrá ejecutarse.

## Recomendado: Iniciar sesión con Cursor

1. Abra **Panel → Proveedores → Cursor**.
2. Elija la pestaña **Iniciar sesión con Cursor**.
3. Haga clic en **Iniciar sesión con Cursor** — OmniRoute abre
   `https://cursor.com/loginDeepControl?…` en el navegador de su **host**.
4. Apruebe el inicio de sesión en el navegador y vuelva al panel. OmniRoute
   consulta periódicamente `api2.cursor.sh/auth/poll` hasta que llegan los tokens.
5. OmniRoute almacena los tokens de **acceso + actualización** y los actualiza mediante
   `https://api2.cursor.sh/auth/exchange_user_api_key`.

Esta vía no requiere Cursor IDE ni `cursor-agent` dentro del contenedor.

## Descubrimiento de modelos

Con una conexión autenticada, **Modelos disponibles / Sincronización automática** da prioridad al
catálogo HTTP `AiService/AvailableModels` de Cursor mediante el token bearer de la conexión.
Si eso falla, OmniRoute sigue intentando usar el `cursor-agent` del host (cuando está presente) y, después,
el catálogo estático inicial.

OmniRoute siempre expone **`auto`** en el catálogo (con el nombre visible “Auto”), además de
los modos de enrutamiento al estilo OpenCodex **`auto-cost`**, **`auto-balance`** y
**`auto-intelligence`**. En la comunicación, estos se asignan al modelo `default` de Cursor
(con un `optimization` ModelParameter para las tres variantes). Es preferible usar
`cu/auto` cuando se haya agotado el uso de los modelos premium; Auto suele tener presupuesto disponible.

### El catálogo en vivo es exclusivo cuando está sincronizado

Tras una sincronización correcta de los modelos de Cursor (`cursor-agent --list-models` → catálogo
sincronizado persistente, o la obtención mediante `AvailableModels` autenticada con bearer indicada anteriormente), el
**panel**, **`/v1/models`** y **Probar todos** muestran:

1. Los modelos devueltos por la sincronización en vivo
2. Los identificadores de enrutamiento automático añadidos: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. Los modelos **personalizados** del operador (Importación / manual), que nunca se eliminan durante la sincronización

El amplio registro estático ubicado en
`open-sse/config/providers/registry/cursor/` es **únicamente una alternativa sin conexión**. Cuando
la sincronización está vacía (o falla el descubrimiento), el listado recurre a ese registro.

Los identificadores con sufijos de esfuerzo (por ejemplo, `claude-4.6-sonnet-high`) todavía pueden
**solicitarse** durante la ejecución: `resolveRequestedModel` elimina el sufijo y lo convierte en un
`ModelParameter` para la comunicación. El listado exclusivo oculta intencionadamente esas variantes estáticas
de Probar todos para que las pruebas coincidan con lo que Cursor realmente devuelve como disponible.

### Funciones auxiliares

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — combinación del panel
- `ensureCursorAutoCatalogEntry` — incorporación de auto* durante el descubrimiento y el listado
- `shouldSuppressStaticModelForExclusiveListing` — bucle estático de `/v1/models`

## Límites del proveedor (cuota)

**Uso → Límites del proveedor** para Cursor utiliza API bearer en `api2.cursor.sh`
(`GetCurrentPeriodUsage` → resumen de uso → auth/usage) después de PKCE o de la
importación de tokens. La ruta heredada del panel mediante cookies/`cursor.com` permanece como último recurso
para sesiones antiguas importadas desde el IDE.

Las ventanas suelen incluir **Total**, **Auto + Composer** y **API**. Si
los límites aparecen vacíos, vuelva a ejecutar **Iniciar sesión con Cursor** o importe de nuevo los tokens (la importación desde el IDE
por sí sola ya no es necesaria).

## Turnos vacíos / uso agotado

Cuando Cursor acepta una ejecución, pero no devuelve texto del asistente (algo habitual cuando se ha agotado
el uso premium), OmniRoute muestra un error **429** procesable (indicios de cuota) o
un **502** con indicaciones, no simplemente “El proveedor devolvió contenido vacío”. Los fallos
de streaming como `not_found: AI Model Not Found` (ventana de uso agotada) se
clasifican como **límite de velocidad / uso excedido de Cursor** y conservan ese mensaje
a través de la canalización SSE (la protección compartida contra flujos vacíos no sobrescribe un
error ya emitido). Compruebe Límites del proveedor, pruebe el modelo **`auto`** o aumente
los límites del plan de Cursor.

## Versión del cliente (sin interfaz)

Sin una instalación local de `cursor-agent`, OmniRoute determina
`x-cursor-client-version` mediante la variable de entorno `CURSOR_AGENT_CLI_VERSION`, después mediante una extracción
almacenada en caché en disco del script de instalación de Cursor y, por último, mediante un identificador de compilación fijado. Sobrescríbala con
`CURSOR_AGENT_CLI_VERSION` cuando sea necesario.

## Alternativa: Importación manual de tokens

Si no puede completar el inicio de sesión en el navegador:

1. En el host, extraiga los tokens del archivo `state.vscdb` de Cursor:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Abra **Importar token** en el cuadro de autenticación de Cursor.
3. Pegue el **Token de acceso** y, cuando esté disponible, el **Token de actualización** (necesario para
   la actualización automática). El identificador de máquina es opcional.

Las importaciones que solo contienen el token de acceso siguen funcionando, pero caducarán sin un token de actualización;
vuelva a importarlo cuando el chat devuelva errores de autenticación.

## Relacionado

- Guía de Zed para Docker: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- Referencia externa del inicio de sesión de Cursor en OpenCodex:
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
