# Solución de problemas

🌐 **Languages:** 🇺🇸 [English](../../TROUBLESHOOTING.md) | 🇧🇷 [Português (Brasil)](../pt-BR/TROUBLESHOOTING.md) | 🇪🇸 [Español](../es/TROUBLESHOOTING.md) | 🇫🇷 [Français](../fr/TROUBLESHOOTING.md) | 🇮🇹 [Italiano](../it/TROUBLESHOOTING.md) | 🇷🇺 [Русский](../ru/TROUBLESHOOTING.md) | 🇨🇳 [中文 (简体)](../zh-CN/TROUBLESHOOTING.md) | 🇩🇪 [Deutsch](../de/TROUBLESHOOTING.md) | 🇮🇳 [हिन्दी](../in/TROUBLESHOOTING.md) | 🇹🇭 [ไทย](../th/TROUBLESHOOTING.md) | 🇺🇦 [Українська](../uk-UA/TROUBLESHOOTING.md) | 🇸🇦 [العربية](../ar/TROUBLESHOOTING.md) | 🇯🇵 [日本語](../ja/TROUBLESHOOTING.md) | 🇻🇳 [Tiếng Việt](../vi/TROUBLESHOOTING.md) | 🇧🇬 [Български](../bg/TROUBLESHOOTING.md) | 🇩🇰 [Dansk](../da/TROUBLESHOOTING.md) | 🇫🇮 [Suomi](../fi/TROUBLESHOOTING.md) | 🇮🇱 [עברית](../he/TROUBLESHOOTING.md) | 🇭🇺 [Magyar](../hu/TROUBLESHOOTING.md) | 🇮🇩 [Bahasa Indonesia](../id/TROUBLESHOOTING.md) | 🇰🇷 [한국어](../ko/TROUBLESHOOTING.md) | 🇲🇾 [Bahasa Melayu](../ms/TROUBLESHOOTING.md) | 🇳🇱 [Nederlands](../nl/TROUBLESHOOTING.md) | 🇳🇴 [Norsk](../no/TROUBLESHOOTING.md) | 🇵🇹 [Português (Portugal)](../pt/TROUBLESHOOTING.md) | 🇷🇴 [Română](../ro/TROUBLESHOOTING.md) | 🇵🇱 [Polski](../pl/TROUBLESHOOTING.md) | 🇸🇰 [Slovenčina](../sk/TROUBLESHOOTING.md) | 🇸🇪 [Svenska](../sv/TROUBLESHOOTING.md) | 🇵🇭 [Filipino](../phi/TROUBLESHOOTING.md)

Problemas comunes y soluciones para OmniRoute.

---

## Soluciones rápidas

| Problema                                   | Solución                                                                                       |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| El primer inicio de sesión no funciona     | Marque `INITIAL_PASSWORD` en `.env` (predeterminado: `123456`)                                 |
| El panel se abre en el puerto incorrecto   | Establecer `PORT=20128` y `NEXT_PUBLIC_BASE_URL=http://localhost:20128`                        |
| No hay registros de solicitudes en `logs/` | Establecer `ENABLE_REQUEST_LOGS=true`                                                          |
| EACCES: permiso denegado                   | Establezca `DATA_DIR=/path/to/writable/dir` para anular `~/.omniroute`                         |
| La estrategia de enrutamiento no se guarda | Actualización a v1.4.11+ (corrección del esquema Zod para la persistencia de la configuración) |

---

## Problemas con el proveedor

### "El modelo de idioma no proporcionó mensajes"

**Causa:** Cuota de proveedor agotada.

**Arreglo:**

1. Verifique el rastreador de cuotas del panel
2. Utilice un combo con niveles alternativos
3. Cambiar al nivel más barato/gratuito

### Limitación de velocidad

**Causa:** Cuota de suscripción agotada.

**Arreglo:**

- Agregar respaldo: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`
- Utilice GLM/MiniMax como copia de seguridad económica

### El token de OAuth ha caducado

OmniRoute actualiza automáticamente los tokens. Si los problemas persisten:

1. Panel de control → Proveedor → Reconectar
2. Eliminar y volver a agregar la conexión del proveedor.

---

## Problemas con la nube

### Errores de sincronización en la nube

1. Verifique que `BASE_URL` apunte a su instancia en ejecución (por ejemplo, `http://localhost:20128`)
2. Verifique que `CLOUD_URL` apunte a su punto final en la nube (por ejemplo, `https://omniroute.dev`).
3. Mantenga los valores `NEXT_PUBLIC_*` alineados con los valores del lado del servidor

### Nube `stream=false` Devuelve 500

**Síntoma:** `Unexpected token 'd'...` en el punto final de la nube para llamadas que no son de transmisión.

**Causa:** Upstream devuelve la carga útil SSE mientras que el cliente espera JSON.

**Solución alternativa:** Utilice `stream=true` para llamadas directas en la nube. El tiempo de ejecución local incluye el respaldo SSE → JSON.

### La nube dice Conectada pero "Clave API no válida"

1. Cree una clave nueva desde el panel local (`/api/keys`)
2. Ejecute la sincronización en la nube: Habilitar nube → Sincronizar ahora
3. Las claves antiguas o no sincronizadas aún pueden devolver `401` en la nube

---

## Problemas con Docker

### La herramienta CLI muestra no instalada

1. Verifique los campos de tiempo de ejecución: `curl http://localhost:20128/api/cli-tools/runtime/codex | jq`
2. Para el modo portátil: use el destino de imagen `runner-cli` (CLI incluidas)
3. Para el modo de montaje del host: configure `CLI_EXTRA_PATHS` y monte el directorio bin del host como de solo lectura
4. Si `installed=true` y `runnable=false`: se encontró el binario pero falló la verificación de estado

### Validación rápida del tiempo de ejecución

```bash
curl -s http://localhost:20128/api/cli-tools/codex-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/claude-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
curl -s http://localhost:20128/api/cli-tools/openclaw-settings | jq '{installed,runnable,commandPath,runtimeMode,reason}'
```

---

## Problemas de costos

### Altos costos

1. Verifique las estadísticas de uso en Panel → Uso
2. Cambie el modelo principal a GLM/MiniMax
3. Utilice el nivel gratuito (Gemini CLI, iFlow) para tareas no críticas
4. Establezca presupuestos de costos por clave API: Panel → Claves API → Presupuesto

---

## Depuración

### Habilitar registros de solicitudes

Establezca `ENABLE_REQUEST_LOGS=true` en su archivo `.env`. Los registros aparecen en el directorio `logs/`.

### Verificar el estado del proveedor

```bash
# Health dashboard
http://localhost:20128/dashboard/health

# API health check
curl http://localhost:20128/api/monitoring/health
```

### Almacenamiento en tiempo de ejecución

- Estado principal: `${DATA_DIR}/db.json` (proveedores, combos, alias, claves, configuraciones)
- Uso: `${DATA_DIR}/usage.json`, `${DATA_DIR}/log.txt`, `${DATA_DIR}/call_logs/`
- Solicitar registros: `<repo>/logs/...` (cuando `ENABLE_REQUEST_LOGS=true`)

---

## Problemas con el disyuntor

### Proveedor atascado en estado ABIERTO

Cuando el disyuntor de un proveedor está ABIERTO, las solicitudes se bloquean hasta que expire el tiempo de reutilización.

**Arreglo:**

1. Vaya a **Panel → Configuración → Resiliencia**
2. Verifique la tarjeta del disyuntor del proveedor afectado.
3. Haga clic en **Restablecer todo** para borrar todos los interruptores o espere a que expire el tiempo de reutilización.
4. Verifique que el proveedor esté realmente disponible antes de restablecer

### El proveedor sigue disparando el disyuntor

Si un proveedor ingresa repetidamente al estado ABIERTO:

1. Marque **Panel → Estado → Estado del proveedor** para ver el patrón de error.
2. Vaya a **Configuración → Resiliencia → Perfiles de proveedores** y aumente el umbral de falla.
3. Verifique si el proveedor ha cambiado los límites de API o requiere una nueva autenticación.
4. Revise la telemetría de latencia: una latencia alta puede causar fallas basadas en el tiempo de espera

---

## Problemas de transcripción de audio

### Error "Modelo no compatible"

- Asegúrate de estar usando el prefijo correcto: `deepgram/nova-3` o `assemblyai/best`
- Verifique que el proveedor esté conectado en **Panel → Proveedores**

### La transcripción vuelve vacía o falla

- Verifique los formatos de audio admitidos: `mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`
- Verifique que el tamaño del archivo esté dentro de los límites del proveedor (normalmente < 25 MB)
- Verifique la validez de la clave API del proveedor en la tarjeta del proveedor

---

## Depuración del traductor

Utilice **Panel → Traductor** para depurar problemas de traducción de formato:

| Modo                       | Cuándo utilizar                                                                                               |
| -------------------------- | ------------------------------------------------------------------------------------------------------------- |
| **Parque infantil**        | Compare formatos de entrada/salida uno al lado del otro: pegue una solicitud fallida para ver cómo se traduce |
| **Probador de chat**       | Envíe mensajes en vivo e inspeccione la carga útil completa de solicitud/respuesta, incluidos los encabezados |
| **Banco de pruebas**       | Ejecute pruebas por lotes en combinaciones de formatos para encontrar qué traducciones no funcionan           |
| **Monitorización en vivo** | Observe el flujo de solicitudes en tiempo real para detectar problemas de traducción intermitentes            |

### Problemas comunes de formato

- **Las etiquetas de pensamiento no aparecen**: compruebe si el proveedor objetivo apoya el pensamiento y la configuración del presupuesto de pensamiento.
- **Caídas de llamadas a herramientas**: algunas traducciones de formatos pueden eliminar campos no admitidos; verificar en modo Patio de Juegos
- **Falta el mensaje del sistema**: Claude y Gemini manejan los mensajes del sistema de manera diferente; comprobar la salida de la traducción
- **El SDK devuelve una cadena sin formato en lugar de un objeto** — Corregido en v1.1.0: el desinfectante de respuesta ahora elimina los campos no estándar (`x_groq`, `usage_breakdown`, etc.) que causan fallas de validación de Pydantic en el SDK de OpenAI
- **GLM/ERNIE rechaza el rol `system`** — Corregido en v1.1.0: el normalizador de roles fusiona automáticamente los mensajes del sistema con mensajes de usuario para modelos incompatibles
- **`developer` rol no reconocido** — Corregido en v1.1.0: convertido automáticamente a `system` para proveedores que no son OpenAI
- **`json_schema` no funciona con Gemini** — Corregido en v1.1.0: `response_format` ahora se convierte a `responseMimeType` + `responseSchema` de Gemini

---

## Configuración de resiliencia

### El límite de velocidad automático no se activa

- El límite de velocidad automático solo se aplica a los proveedores de claves API (no a OAuth/suscripción)
- Verifique que **Configuración → Resiliencia → Perfiles de proveedores** tenga habilitado el límite de tasa automática
- Compruebe si el proveedor devuelve códigos de estado `429` o encabezados `Retry-After`

### Ajuste del retroceso exponencial

Los perfiles de proveedor admiten estas configuraciones:

- **Retraso base**: tiempo de espera inicial después del primer fallo (predeterminado: 1 s)
- **Retraso máximo**: límite máximo de tiempo de espera (predeterminado: 30 segundos)
- **Multiplicador**: cuánto aumentar el retraso por falla consecutiva (predeterminado: 2x)

### Manada anti-truenos

Cuando muchas solicitudes simultáneas llegan a un proveedor de velocidad limitada, OmniRoute utiliza mutex + limitación de velocidad automática para serializar solicitudes y evitar fallas en cascada. Esto es automático para los proveedores de claves API.

---

## ¿Sigues atascado?

- **Problemas de GitHub**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **Arquitectura**: consulte [link](ARCHITECTURE.md) para obtener detalles internos
- **Referencia de API**: consulte [link](API_REFERENCE.md) para conocer todos los puntos finales
- **Panel de estado**: marque **Panel → Salud** para ver el estado del sistema en tiempo real
- **Traductor**: use **Panel → Traductor** para depurar problemas de formato
