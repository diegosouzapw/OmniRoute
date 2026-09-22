# Management Authentication (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇯🇵 [ja](../../../ja/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRoute tiene **cuatro familias de credenciales** que pueden autorizar rutas de administración.
No son intercambiables. Las claves de API de inferencia (`sk-…`) **no** administran el
servidor, salvo que se les haya concedido explícitamente el ámbito `manage` o `admin`.

Implementación canónica: `src/lib/api/requireManagementAuth.ts`.

| Credencial                       | Forma habitual                             | Dónde se crea                                              | Uso previsto                       | Capacidad de administración                                                                               |
| -------------------------------- | ------------------------------------------ | ---------------------------------------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Sesión JWT del panel             | Cookie `auth_token`                        | Inicio de sesión en el panel                               | Interfaz web                       | Administración completa desde el panel, sujeta a las reglas de CSRF, localidad y rutas siempre protegidas |
| Token de ID de máquina de la CLI | interno / local                            | Inicialización de la CLI (`omniroute` en la misma máquina) | CLI local                          | Solo administración local                                                                                 |
| Token de acceso con ámbito       | `oma_live_…`                               | **Configuración → Tokens de acceso** u `omniroute connect` | CLI remota y API de administración | Debe cumplir el ámbito `read`, `write` o `admin` requerido por la ruta                                    |
| Clave de API de inferencia       | `sk-…` (y otros prefijos de claves de API) | **Administrador de API / Claves de API**                   | Inferencia en `/v1/*`              | **Ninguna**, salvo que los metadatos de la clave incluyan `manage` o `admin`                              |

Las credenciales `oma_` son credenciales de administración/CLI. **No** son claves de API de inferencia.

Si la autenticación mediante inicio de sesión/clave de API está deshabilitada para el servidor, algunas rutas de administración pueden
aceptar llamadas no autenticadas. Las rutas solo locales y las siempre protegidas siguen aplicando
sus propias reglas. Por tanto, presentar una de estas credenciales no es obligatorio de forma
universal, y poseer una tampoco es suficiente en todos los casos sin el ámbito requerido
y la localidad exigida por la ruta.

Relacionado: [Modo remoto](./REMOTE-MODE.md) (cómo se genera `oma_live_…` para una CLI remota).

---

## Matrices de ámbitos

Estos dos vocabularios de ámbitos son **diferentes**. No los mezcle.

### Ámbitos de los tokens de acceso (`oma_live_…`)

| Ámbito  | Operaciones habituales                                                                                             |
| ------- | ------------------------------------------------------------------------------------------------------------------ |
| `read`  | Solicitudes GET de listado/estado que el token puede consultar                                                     |
| `write` | Modificaciones (crear/actualizar/eliminar) por debajo del nivel de administrador                                   |
| `admin` | CLI remota completa / token de conexión (la inicialización con contraseña usa este ámbito de forma predeterminada) |

Un token con `read` no puede invocar una ruta `write`. Formato del mensaje en tiempo de ejecución:
`El ámbito del token de acceso '<have>' es insuficiente; se requiere '<need>'.`

### Ámbitos de administración de claves de API

| Ámbito    | Significado                                                                                           |
| --------- | ----------------------------------------------------------------------------------------------------- |
| (ninguno) | Solo inferencia. Las rutas de administración devuelven 403.                                           |
| `manage`  | API de administración (la misma comprobación que la rama de claves de API de `requireManagementAuth`) |
| `admin`   | También satisface `hasManageScope` (se considera con capacidad de administración)                     |

Habilite `manage` en la clave desde la interfaz de Claves de API / Administrador de API. No reutilice una
clave de cliente de chat para automatización, salvo que haya concedido deliberadamente ese ámbito.

---

## Cómo crear y revocar

### Sesión JWT del panel

1. Abra `/login` e inicie sesión con la contraseña de administración (`INITIAL_PASSWORD` en el primer arranque).
2. La cookie `auth_token` es HttpOnly. El panel web la utiliza automáticamente.
3. Cierre sesión mediante `/api/auth/logout`. No hay ningún secreto de larga duración que copiar.

### Token de ID de máquina de la CLI

1. Ejecute `omniroute` en el **mismo host** que el servidor (bucle local).
2. La CLI inicializa un token de ID de máquina en `~/.omniroute/` (chmod 600).
3. Esto **no** funciona desde otra máquina. Utilice un token de acceso para una CLI remota.

### Token de acceso con ámbito (`oma_live_…`)

1. Panel: **Configuración → Tokens de acceso** → crear (nombre + ámbito). **El secreto se muestra una sola vez.**
2. O mediante la CLI: `omniroute connect <host>` (contraseña → token). Consulte [Modo remoto](./REMOTE-MODE.md).
3. Encabezado: `Authorization: Bearer oma_live_…`
4. Revóquelo desde la misma página de Tokens de acceso (o elimine el contexto de la CLI).
5. El servidor solo almacena un hash. Trate el texto sin formato como una contraseña.

### Clave de API con ámbito de administración

1. Panel: **Administrador de API / Claves de API** → cree o edite una clave → habilite `manage` (o `admin`).
2. Encabezado: `Authorization: Bearer sk-…` (el prefijo real de la clave).
3. Revóquela o elimine `manage` desde la misma interfaz.
4. Principio de mínimo privilegio para automatizaciones que no utilicen la CLI: prefiera un token de acceso `read` para tareas que solo realicen solicitudes GET; utilice `manage` en una clave de API únicamente cuando el cliente también deba comunicarse con `/v1` y con la API de administración.

---

## Formato de la cabecera

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

No incluya credenciales de administración en la ruta de la URL ni en la cadena de consulta. La autenticación de administración solo se admite mediante cabecera/cookie.

---

## Ejemplos para copiar y pegar

Solo lectura (listar proveedores). Use un token de acceso `read`:

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

Modificación (crear una conexión con un proveedor). Use un token de acceso `write`/`admin` o una clave de API con el ámbito `manage`:

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

Inferencia (no administración). Clave de API normal; no se requiere `manage`:

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## Errores actuales en tiempo de ejecución (no revele secretos)

| Situación                                                   | Estado habitual | Mensaje (anonimizado)                                                |
| ----------------------------------------------------------- | --------------- | -------------------------------------------------------------------- |
| Sin credencial                                              | 401             | `Authentication required`                                            |
| `oma_live_…` no válido o caducado                           | 401             | `Invalid or expired access token`                                    |
| Clave de API válida sin `manage`/`admin`                    | 403             | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| Clave de API normal no válida en una ruta de administración | 403             | `Invalid management token`                                           |
| Ámbito del token de acceso demasiado bajo                   | 403             | `Access token scope '<have>' is insufficient; '<need>' required.`    |

"Invalid management token" significa que el token Bearer **no** se aceptó como credencial de administración. **No** indica qué tipo debe generar. Use la tabla anterior: las claves de inferencia necesitan el ámbito `manage`; la CLI remota necesita `oma_live_…`; el panel de control usa la cookie de sesión.

---

## Opción recomendada con privilegios mínimos

| Cliente                                                   | Usar                                             |
| --------------------------------------------------------- | ------------------------------------------------ |
| Navegador                                                 | Sesión del panel de control                      |
| CLI en el host del servidor                               | Token de máquina                                 |
| CLI en un portátil que se comunica con un servidor remoto | `oma_live_…` de `omniroute connect`              |
| CI / scripts (solo administración)                        | `oma_live_…` con el ámbito mínimo necesario      |
| CI que debe llamar tanto a `/v1` como a `/api`            | Clave de API con `manage` **o** dos credenciales |
