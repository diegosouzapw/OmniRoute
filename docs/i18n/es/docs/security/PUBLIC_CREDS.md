# Public Credentials Handling (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇧🇦 [bs](../../../bs/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Fuente de referencia:** `open-sse/utils/publicCreds.ts`
> **Pruebas:** `tests/unit/publicCreds.test.ts`
> **Última actualización:** 2026-08-07 — v3.8.50
> **Audiencia:** Ingenieros que integran proveedores cuyas CLI públicas incluyen client_id / client_secret de OAuth / claves de API web de Firebase.
> **Estado:** **OBLIGATORIO** para todo código nuevo que incluya identificadores del proveedor original.

## Por qué existe esto

- [OAuth 2.0 para aplicaciones nativas (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — El client_id / client_secret de OAuth para aplicaciones instaladas es público; PKCE proporciona la seguridad real.
- [Claves de API de Firebase](https://firebase.google.com/docs/projects/api-keys) — Los identificadores de clientes web son públicos por diseño.

OmniRoute debe incluir estos valores para que los usuarios que no configuren `.env` sigan disponiendo de un flujo OAuth funcional desde el primer momento. Sin un valor alternativo integrado, los proveedores Gemini / Antigravity dejan de funcionar para cualquier usuario que siga el procedimiento de «simplemente clonar y ejecutar».

Sin embargo, los valores literales como `AIzaSy…`, `GOCSPX-…` y `…apps.googleusercontent.com` son detectados por **GitHub Secret Scanning**, **Semgrep** y otros escáneres de patrones similares. Cada versión se convierte en un flujo ruidoso de falsos positivos, la protección de inserciones bloquea commits legítimos y los operadores dejan de confiar en el flujo de alertas.

El asistente `open-sse/utils/publicCreds.ts` resuelve ambas restricciones a la vez:

- Incluye el identificador público como una **secuencia de bytes enmascarada mediante XOR** (sin patrones detectables por escáneres en el código fuente).
- Lo decodifica en tiempo de ejecución mediante `decodePublicCred` / `resolvePublicCred`.
- Detecta valores sin procesar que ya siguen prefijos conocidos (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) y los devuelve sin cambios, por lo que los usuarios con valores sin procesar en su `.env` existente pueden seguir utilizándolos **sin necesidad de migración**.

Esto es **ofuscación, no cifrado.** Cualquiera que lea el código fuente puede recuperar el valor, lo cual no supone ningún problema porque el valor es público por diseño. El único objetivo es evitar las coincidencias con las expresiones regulares de los escáneres.

## El patrón obligatorio

### 1. Añadir una nueva credencial pública

Cuando necesite incluir un nuevo valor proporcionado por un proveedor original que:

- proceda de una CLI pública / aplicación de escritorio / paquete para navegadores, **y**
- esté documentado (o tratado) por el proveedor original como un identificador público de cliente, **y**
- sería detectado por un escáner de patrones (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com`, etc.),

…siga esta lista de comprobación:

1. Genere la secuencia de bytes enmascarada:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Añada una nueva entrada a `EMBEDDED_DEFAULTS` en `open-sse/utils/publicCreds.ts` con un **nombre de clave neutro** (`<provider>_id`, `<provider>_alt`, `<provider>_fb`, etc.). **No** utilice nombres como `client_secret` o `api_key` en el asistente; esas palabras activan las reglas genéricas de secretos de Semgrep.

3. Añada un `keyof typeof EMBEDDED_DEFAULTS` a la unión pública de tipos (se infiere automáticamente).

4. En el código consumidor, sustituya el literal codificado por:

   ```ts
   // una sola variable de entorno de reemplazo
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // varios alias de variables de entorno (se usa el primero que no esté vacío)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // sin variable de entorno de reemplazo (siempre se usa el valor predeterminado integrado)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Elimine el literal de `.env.example` (sustitúyalo por documentación formada únicamente por comentarios que remita aquí a los lectores):

   ```dotenv
   # ── Proveedor (Google / Firebase / etc.) ──
   # Las credenciales públicas de OAuth están integradas en el código mediante
   # open-sse/utils/publicCreds.ts. Defina estas variables solo para utilizar las suyas.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. Actualice `tests/unit/publicCreds.test.ts` para añadir una aserción sobre la forma de la nueva clave (verifique el formato, no el valor literal; consulte las pruebas existentes para ver el patrón).

7. **Nunca** añada literales `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` a los archivos de pruebas. Utilice las constantes `FAKE_*` construidas a partir de fragmentos unidos con `.join("")` (consulte las pruebas existentes).

### 2. Consumidores

- **Lea únicamente mediante `resolvePublicCred()` / `resolvePublicCredMulti()`**; nunca invoque `decodePublicCredBytes()` directamente fuera del asistente.
- El asistente es intencionadamente económico (XOR lineal de bytes) y puede invocarse de forma segura durante la carga del módulo; los valores predeterminados se calculan una sola vez.
- La variable de entorno de reemplazo siempre tiene prioridad. Si un usuario define `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, el asistente devuelve directamente ese valor sin procesar.

### 3. Patrones prohibidos

❌ **Nunca** haga nada de lo siguiente en el código de producción (`src/`, `open-sse/`, `electron/`, `bin/`):

```ts
// MAL: el valor literal activa Secret Scanning y Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// MAL: base64 del literal; GitHub también lo detecta desde febrero de 2025
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// MAL: concatenación de cadenas que vuelve a ensamblar el patrón en tiempo de ejecución
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// MAL: codificación hexadecimal/ROT13; una ofuscación diferente con el mismo riesgo de detección
clientSecret: hexDecode("474f4353..."),
```

Todas estas opciones terminan activando algún escáner. Utilice `resolvePublicCred()`.

❌ **Nunca** añada credenciales literales a `.env.example`. Los usuarios que necesiten valores reales del proveedor original pueden extraerlos por sí mismos de la CLI pública o utilizar su propio registro de OAuth.

❌ **Nunca** descarte una alerta nueva de detección de secretos sin comprobar primero si la credencial debe trasladarse a este asistente.

## Controles relacionados

- `RAW_VALUE_PATTERN` en `publicCreds.ts` enumera los prefijos que activan el paso directo (retrocompatibilidad). Amplíelo únicamente para formatos de credenciales públicas documentados, nunca para secretos propietarios.
- `.env.example` está incluido en el script `check-env-doc-sync` de CI; cuando elimine una variable aquí, asegúrese de que la documentación coincida.
- Tanto la suite `npm run test:vitest` como `node --import tsx/esm --test tests/unit/publicCreds.test.ts` deben seguir pasando correctamente.

## Cuándo NO usar esta función auxiliar

Esta función auxiliar es **únicamente** para credenciales que:

1. El proveedor de origen distribuye públicamente (binario de CLI, paquete para navegador, documentación oficial).
2. Están documentadas o se da a entender claramente que no son confidenciales (protegidas mediante PKCE, clave web de Firebase o similares).

Para todo lo demás —tokens emitidos por el operador, secretos por inquilino, el `client_secret` de su propia aplicación OAuth, claves de cifrado, secretos JWT, contraseñas de bases de datos— use **únicamente variables de entorno** (`process.env.FOO`, con `||` como alternativa a un valor vacío o un error explícito). Estos datos deben almacenarse en `.env` y en el [almacén de credenciales cifradas](./COMPLIANCE.md), no en el código fuente.

## Referencias

- [Google: OAuth 2.0 para aplicaciones nativas](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: claves de API para la identificación de clientes](https://firebase.google.com/docs/projects/api-keys)
- [Secretos compatibles con el análisis de secretos de GitHub](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: detección de tokens codificados en base64 (febrero de 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Commit que introdujo esta función auxiliar: `1a39c31f` — _fix(security): enmascarar credenciales públicas de origen + centralizar la depuración de errores_
