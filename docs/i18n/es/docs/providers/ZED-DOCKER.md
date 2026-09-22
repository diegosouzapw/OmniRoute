# Zed IDE Integration in Docker Environments (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/ZED-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/ZED-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/ZED-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/ZED-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/ZED-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/ZED-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/ZED-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/ZED-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/ZED-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/ZED-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/ZED-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/ZED-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/ZED-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/ZED-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/ZED-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/ZED-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/ZED-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/ZED-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/ZED-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/ZED-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/ZED-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/ZED-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/ZED-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/ZED-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/ZED-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/ZED-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/ZED-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/ZED-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/ZED-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/ZED-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/ZED-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/ZED-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/ZED-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/ZED-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/ZED-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/ZED-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/ZED-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/ZED-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/ZED-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/ZED-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/ZED-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/ZED-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/ZED-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/ZED-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/ZED-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/ZED-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/ZED-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/ZED-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/ZED-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/ZED-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/ZED-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/ZED-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/ZED-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/ZED-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/ZED-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/ZED-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/ZED-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/ZED-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/ZED-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/ZED-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/ZED-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/ZED-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/ZED-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/ZED-DOCKER.md)

---

Cuando OmniRoute se ejecuta dentro de Docker, el flujo estándar "Importar desde el llavero de Zed" falla
porque el contenedor no puede acceder al daemon del llavero del sistema operativo anfitrión (`libsecret` en Linux,
Keychain en macOS y Credential Manager en Windows), y los directorios de configuración de Zed del
sistema de archivos anfitrión no son visibles dentro del contenedor de forma predeterminada.

## Por qué falla la importación desde el llavero en Docker

Dentro de un contenedor se producen dos problemas que impiden la importación:

1. **Aislamiento del sistema de archivos** — `isZedInstalled()` busca `~/.config/zed` (Linux),
   `~/Library/Application Support/Zed` (macOS) o la ruta equivalente de Windows. Estas rutas
   se encuentran en el sistema anfitrión y no están disponibles a menos que se monten explícitamente como volúmenes.
2. **Aislamiento de IPC** — Incluso cuando el directorio de configuración está montado, el módulo nativo
   `keytar` se comunica con el servicio de llavero del sistema operativo mediante un socket Unix o una sesión de D-Bus.
   Ninguno de ellos se conecta con el contenedor de forma predeterminada, por lo que las lecturas de credenciales siempre fallan.

OmniRoute detecta el entorno Docker mediante dos heurísticas:

- La presencia de `/.dockerenv` (escrito por el daemon de Docker al iniciar el contenedor).
- La aparición de la cadena `docker` en `/proc/1/cgroup` (cgroup v1 de Linux).

Cuando se activa cualquiera de estas heurísticas, la ruta de importación devuelve HTTP 422 con
`zedDockerEnvironment: true` y un mensaje que le dirige a la pestaña Importación manual de tokens.

## Uso de la pestaña Importación manual de tokens

1. Abra **Panel de control → Proveedores → Zed**.
2. El panel **Importación manual de tokens** aparece debajo de la tarjeta de importación desde el llavero. Cuando
   OmniRoute detecta Docker, este panel se expande automáticamente después del primer intento fallido de
   importación desde el llavero.
3. Seleccione el proveedor en el menú desplegable (OpenAI, Anthropic, Google, Mistral, xAI,
   OpenRouter o DeepSeek).
4. Pegue la clave de API en el campo de contraseña.
5. Haga clic en **Importar**.

La clave se guarda como una nueva conexión de proveedor con el nombre
`Zed Manual Import (<provider>)`.

## Dónde almacena Zed las claves de API en el sistema anfitrión

Zed almacena las claves de los proveedores de IA en el llavero del sistema operativo con nombres de servicio como
`zed-openai`, `ai.zed.openai`, `zed-anthropic`, etc. Para recuperarlas y realizar una importación
manual, consulte:

**Linux**

```
~/.config/zed/settings.json
```

La sección `language_models` contiene las configuraciones de los proveedores. Las claves guardadas en el
llavero mediante la interfaz de Zed no aparecen como texto sin formato en `settings.json`; recupérelas mediante
un visor de llaveros como GNOME Keyring / Seahorse o ejecutando:

```bash
secret-tool lookup service zed-openai account api-key
```

**macOS**

```
~/Library/Application Support/Zed/settings.json
```

Las entradas del llavero pueden encontrarse en **Keychain Access.app** buscando `zed`.

## Opción de montaje de volumen (avanzada)

Opcionalmente, puede montar el directorio de configuración de Zed en el contenedor en modo de solo lectura.
Esto no soluciona el problema del llavero, pero puede resultar útil para futuras funcionalidades que lean
valores no secretos de la configuración de Zed (p. ej., preferencias de modelos).

```yaml
# Fragmento de docker-compose.yml
services:
  omniroute:
    image: omniroute:latest
    volumes:
      # Sistema anfitrión Linux
      - "${HOME}/.config/zed:/host-zed-config:ro"
      # Sistema anfitrión macOS (descomente esta opción en su lugar)
      # - "${HOME}/Library/Application Support/Zed:/host-zed-config:ro"
    environment:
      # Futuro: ZED_CONFIG_PATH=/host-zed-config
      PORT: "20128"
```

Nota: todavía no se ha implementado la posibilidad de sobrescribir la ruta mediante la variable de entorno `ZED_CONFIG_PATH`. Este
fragmento se proporciona como referencia para cuando se añada dicha funcionalidad.

## API de importación manual

También se puede llamar directamente al endpoint de importación manual:

```
POST /api/providers/zed/manual-import
Content-Type: application/json
Authorization: Bearer <oma_live_or_manage_scoped_api_key>

{
  "provider": "openai",
  "token": "sk-...",
  "label": "Mi clave de OpenAI de Zed"   // opcional
}
```

Si la operación se realiza correctamente, devuelve:

```json
{ "success": true, "connectionId": "...", "provider": "openai" }
```

## Solución de problemas

| Síntoma                                 | Causa                                            | Solución                                          |
| --------------------------------------- | ------------------------------------------------ | ------------------------------------------------- |
| 422 + `zedDockerEnvironment: true`      | Se está ejecutando dentro de Docker              | Use la pestaña Importación manual de tokens       |
| 404 + `zedInstalled: false`             | Zed no está instalado en el sistema anfitrión    | Instale Zed o use la importación manual           |
| 403 + acceso al llavero denegado        | El sistema operativo denegó el acceso al llavero | Conceda permiso en el aviso del sistema operativo |
| 404 + servicio de llavero no disponible | Falta `libsecret` en Linux                       | Instale `libsecret-1-dev`                         |
