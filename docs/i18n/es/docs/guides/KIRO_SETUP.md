# Kiro Setup Guide (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/KIRO_SETUP.md) · 🇪🇹 [am](../../../am/docs/guides/KIRO_SETUP.md) · 🇸🇦 [ar](../../../ar/docs/guides/KIRO_SETUP.md) · 🇦🇿 [az](../../../az/docs/guides/KIRO_SETUP.md) · 🇧🇬 [bg](../../../bg/docs/guides/KIRO_SETUP.md) · 🇧🇩 [bn](../../../bn/docs/guides/KIRO_SETUP.md) · 🇨🇿 [cs](../../../cs/docs/guides/KIRO_SETUP.md) · 🇩🇰 [da](../../../da/docs/guides/KIRO_SETUP.md) · 🇩🇪 [de](../../../de/docs/guides/KIRO_SETUP.md) · 🇬🇷 [el](../../../el/docs/guides/KIRO_SETUP.md) · 🇪🇪 [et](../../../et/docs/guides/KIRO_SETUP.md) · 🇮🇷 [fa](../../../fa/docs/guides/KIRO_SETUP.md) · 🇫🇮 [fi](../../../fi/docs/guides/KIRO_SETUP.md) · 🇫🇷 [fr](../../../fr/docs/guides/KIRO_SETUP.md) · 🇮🇪 [ga](../../../ga/docs/guides/KIRO_SETUP.md) · 🇮🇳 [gu](../../../gu/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ha](../../../ha/docs/guides/KIRO_SETUP.md) · 🇮🇱 [he](../../../he/docs/guides/KIRO_SETUP.md) · 🇮🇳 [hi](../../../hi/docs/guides/KIRO_SETUP.md) · 🇭🇷 [hr](../../../hr/docs/guides/KIRO_SETUP.md) · 🇭🇺 [hu](../../../hu/docs/guides/KIRO_SETUP.md) · 🇦🇲 [hy](../../../hy/docs/guides/KIRO_SETUP.md) · 🇮🇩 [id](../../../id/docs/guides/KIRO_SETUP.md) · 🇳🇬 [ig](../../../ig/docs/guides/KIRO_SETUP.md) · 🇮🇹 [it](../../../it/docs/guides/KIRO_SETUP.md) · 🇯🇵 [ja](../../../ja/docs/guides/KIRO_SETUP.md) · 🇬🇪 [ka](../../../ka/docs/guides/KIRO_SETUP.md) · 🇰🇭 [km](../../../km/docs/guides/KIRO_SETUP.md) · 🇮🇳 [kn](../../../kn/docs/guides/KIRO_SETUP.md) · 🇰🇷 [ko](../../../ko/docs/guides/KIRO_SETUP.md) · 🇱🇹 [lt](../../../lt/docs/guides/KIRO_SETUP.md) · 🇱🇻 [lv](../../../lv/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ml](../../../ml/docs/guides/KIRO_SETUP.md) · 🇮🇳 [mr](../../../mr/docs/guides/KIRO_SETUP.md) · 🇲🇾 [ms](../../../ms/docs/guides/KIRO_SETUP.md) · 🇲🇹 [mt](../../../mt/docs/guides/KIRO_SETUP.md) · 🇲🇲 [my](../../../my/docs/guides/KIRO_SETUP.md) · 🇳🇵 [ne](../../../ne/docs/guides/KIRO_SETUP.md) · 🇳🇱 [nl](../../../nl/docs/guides/KIRO_SETUP.md) · 🇳🇴 [no](../../../no/docs/guides/KIRO_SETUP.md) · 🇮🇳 [or](../../../or/docs/guides/KIRO_SETUP.md) · 🇮🇳 [pa](../../../pa/docs/guides/KIRO_SETUP.md) · 🇵🇭 [phi](../../../phi/docs/guides/KIRO_SETUP.md) · 🇵🇱 [pl](../../../pl/docs/guides/KIRO_SETUP.md) · 🇵🇹 [pt](../../../pt/docs/guides/KIRO_SETUP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/KIRO_SETUP.md) · 🇷🇴 [ro](../../../ro/docs/guides/KIRO_SETUP.md) · 🇷🇺 [ru](../../../ru/docs/guides/KIRO_SETUP.md) · 🇱🇰 [si](../../../si/docs/guides/KIRO_SETUP.md) · 🇸🇰 [sk](../../../sk/docs/guides/KIRO_SETUP.md) · 🇸🇮 [sl](../../../sl/docs/guides/KIRO_SETUP.md) · 🇷🇸 [sr](../../../sr/docs/guides/KIRO_SETUP.md) · 🇸🇪 [sv](../../../sv/docs/guides/KIRO_SETUP.md) · 🇰🇪 [sw](../../../sw/docs/guides/KIRO_SETUP.md) · 🇮🇳 [ta](../../../ta/docs/guides/KIRO_SETUP.md) · 🇮🇳 [te](../../../te/docs/guides/KIRO_SETUP.md) · 🇹🇭 [th](../../../th/docs/guides/KIRO_SETUP.md) · 🇹🇷 [tr](../../../tr/docs/guides/KIRO_SETUP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/KIRO_SETUP.md) · 🇵🇰 [ur](../../../ur/docs/guides/KIRO_SETUP.md) · 🇺🇿 [uz](../../../uz/docs/guides/KIRO_SETUP.md) · 🇻🇳 [vi](../../../vi/docs/guides/KIRO_SETUP.md) · 🇳🇬 [yo](../../../yo/docs/guides/KIRO_SETUP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/KIRO_SETUP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/KIRO_SETUP.md)

---

Esta guía explica cómo añadir cuentas de Kiro (el asistente de programación con IA alojado en AWS) a OmniRoute,
con especial atención a la ejecución simultánea de varias cuentas sin conflictos de sesión.

---

## Contexto: por qué pueden producirse conflictos entre las cuentas de Kiro

El backend de Kiro utiliza registros de clientes OIDC de AWS SSO para realizar un seguimiento de las sesiones activas.
La restricción fundamental es que **cada registro de cliente OIDC solo admite una sesión
activa a la vez**. Cuando un segundo dispositivo o usuario se autentica utilizando el mismo
cliente registrado, el backend invalida el token de actualización de la primera cuenta.

Este es el mismo mecanismo que causa problemas al ejecutar `kiro-cli login` en un
equipo donde ya se ha iniciado sesión con otra cuenta de Kiro: el nuevo inicio de sesión revoca
el token de la primera cuenta.

---

## Cómo resuelve esto OmniRoute (v3.8.0+)

A partir de v3.8.0, OmniRoute llama a `registerClient()` (AWS SSO OIDC) durante cada
importación de una conexión de Kiro. Esto proporciona a cada conexión de OmniRoute su propio
registro de cliente OIDC dedicado. Como cada registro de cliente es independiente, actualizar
o volver a autenticar una cuenta no afecta al token de actualización de ninguna otra cuenta.

El aislamiento se aplica a los métodos de importación mediante token de actualización, mientras que la autenticación con clave de API evita
por completo las sesiones de actualización OIDC:

| Método de importación                                         | Estado del aislamiento                                                                                                |
| ------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Flujo de código de dispositivo de AWS Builder ID / IDC        | Aislado desde que se introdujo el flujo de código de dispositivo                                                      |
| **Importar token** (pegado manual del token de actualización) | Aislado desde v3.8.0                                                                                                  |
| **Inicio de sesión con Google / GitHub**                      | Aislado desde v3.8.0                                                                                                  |
| **Importación automática** (SQLite de kiro-cli)               | Aislado desde v3.8.0 (la ruta de SQLite ya estaba aislada; la alternativa de caché de SSO ahora también está aislada) |
| **Clave de API** (clave de CodeWhisperer de larga duración)   | Sin sesión de actualización; la clave se valida y almacena como credencial de portador                                |

---

## Nota de migración para conexiones creadas antes de v3.8.0

Las conexiones importadas antes de v3.8.0 no tienen almacenado un registro de cliente OIDC
dedicado en `providerSpecificData`. Estas conexiones siguen funcionando, pero utilizan el
endpoint compartido de actualización de autenticación social, lo que significa que dos de esas conexiones aún pueden invalidarse
entre sí.

**Para obtener aislamiento:** elimina la conexión antigua desde **Panel → Proveedores** y
vuelve a importarla mediante cualquiera de los flujos de importación compatibles. Todas las conexiones nuevas
recibirán automáticamente su propio registro de cliente.

---

## Añadir dos cuentas de Kiro en paralelo

### Requisitos previos

- OmniRoute v3.8.0 o posterior.
- Una cuenta de Kiro operativa (correo electrónico + contraseña, o inicio de sesión con Google o GitHub).
- Opcionalmente, una segunda cuenta de Kiro.

### Paso 1: importar la primera cuenta

1. Abre **Panel → Proveedores → Añadir proveedor → Kiro**.
2. Elige una de estas opciones:
   - **Importar token** — pega un token de actualización que comience por `aorAAAAAG`.
   - **Clave de API** — pega una clave de API de Kiro / CodeWhisperer de larga duración.
   - **Inicio de sesión con Google / GitHub** — completa el flujo de OAuth en el navegador.
   - **Importación automática** — haz clic en el botón; OmniRoute lee las credenciales de la
     base de datos local de kiro-cli o de `~/.aws/sso/cache`.
3. La conexión se guarda. Los flujos con token de actualización registran automáticamente un
   cliente OIDC dedicado. Los flujos con clave de API validan la clave con AWS y no almacenan ningún token de actualización.

### Paso 2: importar la segunda cuenta

Repite el paso 1 para la segunda cuenta. Como cada importación crea un registro de cliente OIDC
independiente, las dos conexiones quedan completamente aisladas.

### Paso 3: comprobar que ambas conexiones estén activas

1. **Panel → Proveedores** — ambas conexiones de Kiro deberían mostrar el estado **Activo**.
2. **Panel → Estado** — ambas conexiones deberían superar la comprobación del estado de sus tokens.

### Paso 4: utilizar una combinación para enrutar entre cuentas

Crea una combinación con ambas conexiones como destinos para equilibrar la carga o conmutar por error entre ellas:

```
kiro/kiro-dev → kiro/kiro-pro
```

Consulta [FEATURES.md](./FEATURES.md) y la documentación de enrutamiento para obtener información sobre la configuración de combinaciones.

---

## Usuarios empresariales / IDC

Para las cuentas de AWS IAM Identity Center (IDC), utilice el flujo de **código de dispositivo de AWS Builder ID / IDC**
desde **Panel de control → Proveedores → Kiro → Código de dispositivo**. El flujo de código de dispositivo siempre ha
estado completamente aislado. No es necesario volver a importar estas conexiones.

Los usuarios empresariales que operan en una región de AWS distinta de la predeterminada pueden especificar la región al
importar mediante la API de importación de tokens:

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/import \
  -H "Content-Type: application/json" \
  -d '{"refreshToken": "aorAAAAAG...", "region": "eu-west-1"}'
```

El campo `region` utiliza `us-east-1` de forma predeterminada cuando se omite.

---

## Flujo de importación mediante clave de API

La autenticación mediante clave de API está destinada a credenciales de portador de larga duración de Kiro / AWS CodeWhisperer. No
utiliza la actualización de OAuth, por lo que evita la invalidación de sesiones OIDC compartidas.

### Panel de control

1. Abra **Panel de control -> Proveedores -> Kiro**.
2. Seleccione **Clave de API**.
3. Pegue la clave de API y, opcionalmente, la región de AWS (`us-east-1` de forma predeterminada).
4. OmniRoute valida la clave y guarda la conexión.

### API

```bash
curl -X POST http://localhost:20128/api/oauth/kiro/api-key \
  -H "Content-Type: application/json" \
  -d '{"apiKey": "kiro_or_codewhisperer_key", "region": "us-east-1"}'
```

### Contrato interno

La ruta de la API valida la clave llamando a `KiroService.validateApiKey()`, que
utiliza `ListAvailableProfiles` con el endpoint de CodeWhisperer/Amazon Q correspondiente
a la región y resuelve un `profileArn`.

La conexión guardada utiliza:

```json
{
  "authType": "apikey",
  "providerSpecificData": {
    "authMethod": "api_key",
    "region": "us-east-1",
    "profileArn": "arn:aws:codewhisperer:..."
  }
}
```

Durante la ejecución, `KiroExecutor.buildHeaders()` envía la clave como
`Authorization: Bearer <key>` y añade `tokentype: API_KEY`. Las llamadas de cuota/perfil
utilizan el mismo marcador para que AWS trate el token de portador como una clave de API de larga duración en lugar de
un token de acceso OIDC o social.

---

## Caducidad del cliente OIDC

Los clientes públicos de AWS SSO OIDC suelen caducar después de 90 días
(`clientSecretExpiresAt`). OmniRoute almacena esta marca de tiempo en `providerSpecificData`
para facilitar la observabilidad. Si una conexión deja de actualizarse después de aproximadamente 90 días, vuelva a importar la
conexión para obtener un nuevo registro de cliente OIDC. El registro automático de nuevo
al caducar está previsto como una mejora futura.

Las conexiones mediante clave de API no tienen caducidad de cliente OIDC porque no se actualizan
a través de AWS SSO OIDC.

---

## Solución de problemas

### La segunda cuenta sigue cerrando la sesión

- Compruebe ambas conexiones en **Panel de control → Proveedores** y confirme que cada una muestre un valor no nulo de
  `clientId` en su JSON sin procesar (visible mediante el icono de información). Si alguna de las conexiones no incluye
  `clientId`, se importó antes de v3.8.0; vuelva a importarla.

### La importación falla con "Error de validación del token"

- Asegúrese de que el token de actualización comience por `aorAAAAAG`.
- Asegúrese de que OmniRoute pueda acceder a `https://oidc.us-east-1.amazonaws.com` (o a la región
  configurada). Si se encuentra detrás de un proxy corporativo, configure un proxy a nivel del proveedor en
  **Panel de control → Configuración → Proxies**.

### La importación mediante clave de API falla

- Confirme que la clave sea una clave de API de Kiro / CodeWhisperer, no un token de actualización.
- Confirme que la región de AWS corresponda a la clave/cuenta. `us-east-1` es el valor predeterminado.
- La clave debe poder llamar a `ListAvailableProfiles`; de lo contrario, OmniRoute no podrá
  resolver el `profileArn` requerido.

Para otros problemas, consulte el archivo principal [TROUBLESHOOTING.md](./TROUBLESHOOTING.md).
