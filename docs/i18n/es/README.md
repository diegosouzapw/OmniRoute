<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute Dashboard" width="800"/>
  
  # 🚀 OmniRoute — El Gateway de IA Gratuito

### Nunca dejes de programar. Enrutamiento inteligente hacia **modelos de IA GRATUITOS y económicos** con fallback automático.

_Tu proxy de API universal — un endpoint, 36+ proveedores, cero tiempo de inactividad._

**Chat Completions • Embeddings • Generación de Imágenes • Audio • Reranking • 100% TypeScript**

---

### 🆕 Novedades en v2.7.0

- **RouterStrategy enchufable** — estrategias de reglas, costo y latencia
- **Detección de intención multilingüe** — puntuación de enrutamiento en 30+ idiomas
- **Deduplicación de solicitudes** — evita llamadas duplicadas por hash de contenido
- **Nuevos proveedores:** Grok-4 Fast (xAI), GLM-5 / Z.AI, MiniMax M2.5, Kimi K2.5
- **Precios actualizados:** Grok-4 Fast $0.20/$0.50/M, GLM-5 $0.50/M, MiniMax M2.5 $0.30/M

---

### 🚀 New in v2.0.9+ — Playground, CLI Fingerprints & ACP

| Feature                                    | What It Does                                                                                                                                  |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------- |
| 🎮 **Model Playground**                    | Dashboard page to test any model directly — provider/model/endpoint selectors, Monaco Editor, streaming, abort, timing                        |
| 🔏 **CLI Fingerprint Matching**            | Per-provider header/body ordering to match native CLI signatures — toggle per provider in Settings > Security. **Your proxy IP is preserved** |
| 🤝 **ACP Support (Agent Client Protocol)** | CLI agent discovery (Codex, Claude, Goose, Gemini CLI, OpenClaw), process spawner, `/api/acp/agents` endpoint                                 |
| 🤖 **ACP Agents Dashboard**                | Debug > Agents page — grid of 14 agents with install status, version, custom agent form for any CLI tool                                      |
| 🔧 **Custom Model `apiFormat` Routing**    | Custom models with `apiFormat: "responses"` now correctly route to the Responses API translator                                               |
| 🏢 **Codex Workspace Isolation**           | Multiple Codex workspaces per email — OAuth correctly separates connections by workspace ID                                                   |
| 🔄 **Electron Auto-Update**                | Desktop app checks for updates + auto-install on restart                                                                                      |

### 🤖 Proveedor de IA Gratuito para tus agentes de programación favoritos

_Conecta cualquier IDE o herramienta CLI con IA a través de OmniRoute — gateway de API gratuito para programación ilimitada._

  <table>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/cline/cline">
          <img src="./public/providers/openclaw.png" alt="OpenClaw" width="48"/><br/>
          <b>OpenClaw</b>
        </a><br/>
        <sub>⭐ 205K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/HKUDS/nanobot">
          <img src="./public/providers/nanobot.png" alt="NanoBot" width="48"/><br/>
          <b>NanoBot</b>
        </a><br/>
        <sub>⭐ 20.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/sipeed/picoclaw">
          <img src="./public/providers/picoclaw.jpg" alt="PicoClaw" width="48"/><br/>
          <b>PicoClaw</b>
        </a><br/>
        <sub>⭐ 14.6K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/zeroclaw-labs/zeroclaw">
          <img src="./public/providers/zeroclaw.png" alt="ZeroClaw" width="48"/><br/>
          <b>ZeroClaw</b>
        </a><br/>
        <sub>⭐ 9.9K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/nearai/ironclaw">
          <img src="./public/providers/ironclaw.png" alt="IronClaw" width="48"/><br/>
          <b>IronClaw</b>
        </a><br/>
        <sub>⭐ 2.1K</sub>
      </td>
    </tr>
    <tr>
      <td align="center" width="110">
        <a href="https://github.com/anomalyco/opencode">
          <img src="./public/providers/opencode.svg" alt="OpenCode" width="48"/><br/>
          <b>OpenCode</b>
        </a><br/>
        <sub>⭐ 106K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/openai/codex">
          <img src="./public/providers/codex.png" alt="Codex CLI" width="48"/><br/>
          <b>Codex CLI</b>
        </a><br/>
        <sub>⭐ 60.8K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/anthropics/claude-code">
          <img src="./public/providers/claude.png" alt="Claude Code" width="48"/><br/>
          <b>Claude Code</b>
        </a><br/>
        <sub>⭐ 67.3K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/google-gemini/gemini-cli">
          <img src="./public/providers/gemini-cli.png" alt="Gemini CLI" width="48"/><br/>
          <b>Gemini CLI</b>
        </a><br/>
        <sub>⭐ 94.7K</sub>
      </td>
      <td align="center" width="110">
        <a href="https://github.com/Kilo-Org/kilocode">
          <img src="./public/providers/kilocode.png" alt="Kilo Code" width="48"/><br/>
          <b>Kilo Code</b>
        </a><br/>
        <sub>⭐ 15.5K</sub>
      </td>
    </tr>
  </table>

<sub>📡 Todos los agentes se conectan vía <code>http://localhost:20128/v1</code> o <code>http://cloud.omniroute.online/v1</code> — una configuración, modelos y cuota ilimitados</sub>

---

[![npm version](https://img.shields.io/npm/v/omniroute?color=cb3837&logo=npm)](https://www.npmjs.com/package/omniroute)
[![Docker Hub](https://img.shields.io/docker/v/diegosouzapw/omniroute?label=Docker%20Hub&logo=docker&color=2496ED)](https://hub.docker.com/r/diegosouzapw/omniroute)
[![License](https://img.shields.io/github/license/diegosouzapw/OmniRoute)](https://github.com/diegosouzapw/OmniRoute/blob/main/LICENSE)
[![Website](https://img.shields.io/badge/Website-omniroute.online-blue?logo=google-chrome&logoColor=white)](https://omniroute.online)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Community-25D366?logo=whatsapp&logoColor=white)](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)

[🌐 Website](https://omniroute.online) • [🚀 Inicio Rápido](#-inicio-rápido) • [💡 Características](#-características-principales) • [📖 Docs](#-documentación) • [💰 Precios](#-precios-resumidos)

🌐 **Disponible en:** 🇺🇸 [English](../../README.md) | 🇧🇷 [Português (Brasil)](../pt-BR/README.md) | 🇪🇸 [Español](../es/README.md) | 🇫🇷 [Français](../fr/README.md) | 🇮🇹 [Italiano](../it/README.md) | 🇷🇺 [Русский](../ru/README.md) | 🇨🇳 [中文 (简体)](../zh-CN/README.md) | 🇩🇪 [Deutsch](../de/README.md) | 🇮🇳 [हिन्दी](../in/README.md) | 🇹🇭 [ไทย](../th/README.md) | 🇺🇦 [Українська](../uk-UA/README.md) | 🇸🇦 [العربية](../ar/README.md) | 🇯🇵 [日本語](../ja/README.md) | 🇻🇳 [Tiếng Việt](../vi/README.md) | 🇧🇬 [Български](../bg/README.md) | 🇩🇰 [Dansk](../da/README.md) | 🇫🇮 [Suomi](../fi/README.md) | 🇮🇱 [עברית](../he/README.md) | 🇭🇺 [Magyar](../hu/README.md) | 🇮🇩 [Bahasa Indonesia](../id/README.md) | 🇰🇷 [한국어](../ko/README.md) | 🇲🇾 [Bahasa Melayu](../ms/README.md) | 🇳🇱 [Nederlands](../nl/README.md) | 🇳🇴 [Norsk](../no/README.md) | 🇵🇹 [Português (Portugal)](../pt/README.md) | 🇷🇴 [Română](../ro/README.md) | 🇵🇱 [Polski](../pl/README.md) | 🇸🇰 [Slovenčina](../sk/README.md) | 🇸🇪 [Svenska](../sv/README.md) | 🇵🇭 [Filipino](../phi/README.md)

</div>

---

## 🖼️

<div align="center">
  <img src="./docs/screenshots/MainOmniRoute.png" alt="OmniRoute" width="800"/>
</div>

---

## 📸

<details>
<summary><b>...</b></summary>

| #     | #                                        |
| ----- | ---------------------------------------- |
| **1** | ![1](docs/screenshots/01-providers.png)  |
| **2** | ![2](docs/screenshots/02-combos.png)     |
| **3** | ![3](docs/screenshots/03-analytics.png)  |
| **4** | ![4](docs/screenshots/04-health.png)     |
| **5** | ![5](docs/screenshots/05-translator.png) |
| **6** | ![6](docs/screenshots/06-settings.png)   |
| **7** | ![7](docs/screenshots/07-cli-tools.png)  |
| **8** | ![8](docs/screenshots/08-usage.png)      |
| **9** | ![9](docs/screenshots/09-endpoint.png)   |

</details>

---

## 🤔 ¿Por qué OmniRoute?

**Deja de desperdiciar dinero y chocar con límites:**

- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> La cuota de suscripción expira sin usar cada mes
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Los límites de tasa te detienen en medio de la programación
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> APIs caras ($20-50/mes por proveedor)
- <img src="https://img.shields.io/badge/✗-e74c3c?style=flat-square" height="16"/> Cambiar manualmente entre proveedores

**OmniRoute resuelve esto:**

- ✅ **Maximiza suscripciones** - Rastrea cuotas, usa cada bit antes del reset
- ✅ **Fallback automático** - Suscripción → API Key → Barato → Gratuito, cero tiempo de inactividad
- ✅ **Multi-cuenta** - Round-robin entre cuentas por proveedor
- ✅ **Universal** - Funciona con Claude Code, Codex, Gemini CLI, Cursor, Cline, OpenClaw, cualquier herramienta CLI

---

## 📧 Soporte

> 💬 **¡Únete a la comunidad!** [Grupo WhatsApp](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t) — Obtén ayuda, comparte consejos y mantente al día.

- **Website**: [omniroute.online](https://omniroute.online)
- **GitHub**: [github.com/diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute)
- **Issues**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **WhatsApp**: [Grupo de la Comunidad](https://chat.whatsapp.com/JI7cDQ1GyaiDHhVBpLxf8b?mode=gi_t)
- **Proyecto Original**: [9router por decolua](https://github.com/decolua/9router)

---

## 🔄 Cómo Funciona

```
┌─────────────┐
│  Tu CLI     │  (Claude Code, Codex, Gemini CLI, OpenClaw, Cursor, Cline...)
│   Tool      │
└──────┬──────┘
       │ http://localhost:20128/v1
       ↓
┌─────────────────────────────────────────┐
│        OmniRoute (Enrutador Inteligente)  │
│  • Traducción de formato (OpenAI ↔ Claude) │
│  • Rastreo de cuota + Embeddings + Imágenes │
│  • Renovación automática de tokens        │
└──────┬──────────────────────────────────┘
       │
       ├─→ [Tier 1: SUSCRIPCIÓN] Claude Code, Codex, Gemini CLI
       │   ↓ cuota agotada
       ├─→ [Tier 2: API KEY] DeepSeek, Groq, xAI, Mistral, NVIDIA NIM, etc.
       │   ↓ límite de presupuesto
       ├─→ [Tier 3: BARATO] GLM ($0.6/1M), MiniMax ($0.2/1M)
       │   ↓ límite de presupuesto
       └─→ [Tier 4: GRATUITO] iFlow, Qwen, Kiro (ilimitado)

Resultado: Nunca dejes de programar, costo mínimo
```

---

## 🎯 Lo que resuelve OmniRoute: 30 puntos débiles reales y casos de uso

> **Todos los desarrolladores que utilizan herramientas de IA se enfrentan a estos problemas a diario.** OmniRoute se creó para resolverlos todos: desde sobrecostos hasta bloqueos regionales, desde flujos rotos de OAuth hasta operaciones de protocolo y observabilidad empresarial.

<details>
<summary><b>💸 1. "Pago una suscripción costosa pero aún así me interrumpen los límites"</b></summary>

Los desarrolladores pagan entre 20 y 200 dólares al mes por Claude Pro, Codex Pro o GitHub Copilot. Incluso pagando, la cuota tiene un límite: 5 horas de uso, límites semanales o límites de tarifa por minuto. A mitad de la sesión de codificación, el proveedor deja de responder y el desarrollador pierde flujo y productividad.

**Cómo lo resuelve OmniRoute:**

- **Reserva inteligente de 4 niveles**: si se agota la cuota de suscripción, se redirige automáticamente a la clave API → Barato → Gratis sin intervención manual
- **Seguimiento de cuotas en tiempo real**: muestra el consumo de tokens en tiempo real con cuenta regresiva de reinicio (5 h, diario, semanal)
- **Soporte multicuenta**: varias cuentas por proveedor con rotación automática: cuando una se agota, cambia a la siguiente
- **Combinaciones personalizadas**: cadenas de respaldo personalizables con 6 estrategias de equilibrio (completar primero, por turnos, P2C, aleatoria, menos utilizada, de costo optimizado)
- **Cuotas comerciales de Codex**: monitoreo de cuotas del espacio de trabajo empresarial/de equipo directamente en el panel

</details>

<details>
<summary><b>🔌 2. "Necesito usar varios proveedores pero cada uno tiene una API diferente"</b></summary>

OpenAI usa un formato, Claude (Anthropic) usa otro, Gemini otro más. Si un desarrollador quiere probar modelos de diferentes proveedores o recurrir a ellos, debe reconfigurar los SDK, cambiar los puntos finales y lidiar con formatos incompatibles. Los proveedores personalizados (FriendLI, NIM) tienen puntos finales de modelo no estándar.

**Cómo lo resuelve OmniRoute:**

- **Punto final unificado**: un único `http://localhost:20128/v1` sirve como proxy para los más de 36 proveedores
- **Traducción de formato**: automática y transparente: OpenAI ↔ Claude ↔ Gemini ↔ API de respuestas
- **Desinfección de respuesta**: elimina los campos no estándar (`x_groq`, `usage_breakdown`, `service_tier`) que interrumpen OpenAI SDK v1.83+
- **Normalización de roles**: convierte `developer` → `system` para proveedores que no son OpenAI; `system` → `user` para GLM/ERNIE
- **Think Tag Extraction**: extrae bloques `<think>` de modelos como DeepSeek R1 en `reasoning_content` estandarizado.
- **Salida estructurada para Gemini** — `json_schema` → `responseMimeType`/`responseSchema` conversión automática
- **`stream` por defecto es `false`**: se alinea con las especificaciones de OpenAI, evitando SSE inesperado en los SDK de Python/Rust/Go

</details>

<details>
<summary><b>🌐 3. "Mi proveedor de IA bloquea mi región/país"</b></summary>

Proveedores como OpenAI/Codex bloquean el acceso desde ciertas regiones geográficas. Los usuarios obtienen errores como `unsupported_country_region_territory` durante las conexiones OAuth y API. Esto resulta especialmente frustrante para los desarrolladores de los países en desarrollo.

**Cómo lo resuelve OmniRoute:**

- **Configuración de proxy de 3 niveles**: Proxy configurable en 3 niveles: global (todo el tráfico), por proveedor (un solo proveedor) y por conexión/clave.
- **Insignias de proxy codificadas por colores** — Indicadores visuales: 🟢 proxy global, 🟡 proxy de proveedor, 🔵 proxy de conexión, que siempre muestra la IP
- **Intercambio de tokens de OAuth a través de proxy**: el flujo de OAuth también pasa a través del proxy, lo que resuelve `unsupported_country_region_territory`
- **Pruebas de conexión a través de proxy**: las pruebas de conexión utilizan el proxy configurado (no más derivación directa)
- **Soporte SOCKS5**: soporte completo de proxy SOCKS5 para enrutamiento saliente
- **Suplantación de huellas dactilares TLS**: huella digital TLS similar a la de un navegador a través de `wreq-js` para evitar la detección de bots.

</details>

<details>
<summary><b>🆓 4. "Quiero usar IA para codificar pero no tengo dinero"</b></summary>

No todo el mundo puede pagar entre 20 y 200 dólares al mes por suscripciones a IA. Los estudiantes, desarrolladores de países emergentes, aficionados y autónomos necesitan acceso a modelos de calidad sin costo alguno.

**Cómo lo resuelve OmniRoute:**

- **Proveedores de nivel gratuito integrados**: soporte nativo para proveedores 100% gratuitos: iFlow (8 modelos ilimitados), Qwen (3 modelos ilimitados), Kiro (Claude gratis), Gemini CLI (180K/mes gratis)
- **Ollama Cloud** — Cloud-hosted Ollama models at `api.ollama.com` with free "Light usage" tier; use `ollamacloud/<model>` prefix
- **Combos solo gratuitos**: cadena `gc/gemini-3-flash → if/kimi-k2-thinking → qw/qwen3-coder-plus` = $0/mes sin tiempo de inactividad
- **Créditos gratuitos NVIDIA NIM**: 1000 créditos gratuitos integrados
- **Estrategia de optimización de costos**: estrategia de enrutamiento que elige automáticamente el proveedor más barato disponible

</details>

<details>
<summary><b>🔒 5. "Necesito proteger mi puerta de enlace AI del acceso no autorizado"</b></summary>

Al exponer una puerta de enlace de IA a la red (LAN, VPS, Docker), cualquiera con la dirección puede consumir los tokens/cuota del desarrollador. Sin protección, las API son vulnerables al mal uso, la inyección rápida y el abuso.

**Cómo lo resuelve OmniRoute:**

- **Administración de claves API**: generación, rotación y alcance por proveedor con una página `/dashboard/api-manager` dedicada
- **Permisos a nivel de modelo**: restrinja las claves API a modelos específicos (`openai/*`, patrones comodín), con la opción Permitir todo/Restringir
- **API Endpoint Protection**: requiere una clave para `/v1/models` y bloquea proveedores específicos del listado
- **Auth Guard + Protección CSRF**: todas las rutas del panel protegidas con middleware `withAuth` + tokens CSRF
- **Limitador de velocidad**: limitación de velocidad por IP con ventanas configurables
- **Filtrado de IP**: lista permitida/lista bloqueada para control de acceso
- **Prompt injection guard**: desinfección contra patrones de avisos maliciosos
- **Cifrado AES-256-GCM**: credenciales cifradas en reposo

</details>

<details>
<summary><b>🛑 6. "Mi proveedor dejó de funcionar y perdí mi flujo de codificación"</b></summary>

Los proveedores de IA pueden volverse inestables, devolver errores 5xx o alcanzar límites de velocidad temporales. Si un desarrollador depende de un solo proveedor, se le interrumpe. Sin disyuntores, los reintentos repetidos pueden bloquear la aplicación.

**Cómo lo resuelve OmniRoute:**

- **Disyuntor por proveedor**: apertura/cierre automático con umbrales configurables y enfriamiento (cerrado/abierto/medio abierto)
- **Retroceso exponencial**: retrasos progresivos en los reintentos
- **Anti-Thundering Herd** — Mutex + protección de semáforo contra tormentas de reintentos simultáneos
- **Cadenas alternativas combinadas**: si el proveedor principal falla, automáticamente pasa por la cadena sin intervención.
- **Disyuntor combinado**: desactiva automáticamente los proveedores defectuosos dentro de una cadena combinada
- **Panel de estado**: monitoreo del tiempo de actividad, estados de disyuntores, bloqueos, estadísticas de caché, latencia p50/p95/p99

</details>

<details>
<summary><b>🔧 7. "Configurar cada herramienta de IA es tedioso y repetitivo"</b></summary>

Los desarrolladores utilizan Cursor, Claude Code, Codex CLI, OpenClaw, Gemini CLI, Kilo Code... Cada herramienta necesita una configuración diferente (punto final API, clave, modelo). Reconfigurar al cambiar de proveedor o modelo es una pérdida de tiempo.

**Cómo lo resuelve OmniRoute:**

- **Panel de herramientas CLI**: página dedicada con configuración con un solo clic para Claude Code, Codex CLI, OpenClaw, Kilo Code, Antigravity, Cline
- **Generador de configuración de GitHub Copilot**: genera `chatLanguageModels.json` para código VS con selección de modelo masivo
- **Asistente de incorporación**: configuración guiada de 4 pasos para usuarios nuevos
- **Un punto final, todos los modelos**: configure `http://localhost:20128/v1` una vez, acceda a más de 36 proveedores

</details>

<details>
<summary><b>🔑 8. "Administrar tokens OAuth de múltiples proveedores es un infierno"</b></summary>

Claude Code, Codex, Gemini CLI, Copilot: todos usan OAuth 2.0 con tokens que caducan. Los desarrolladores necesitan volver a autenticarse constantemente, lidiar con `client_secret is missing`, `redirect_uri_mismatch` y fallas en servidores remotos. OAuth en LAN/VPS es particularmente problemático.

**Cómo lo resuelve OmniRoute:**

- **Actualización automática de tokens**: los tokens de OAuth se actualizan en segundo plano antes de que caduquen
- **OAuth 2.0 (PKCE) integrado**: flujo automático para Claude Code, Codex, Gemini CLI, Copilot, Kiro, Qwen, iFlow
- **OAuth multicuenta**: varias cuentas por proveedor mediante extracción de token JWT/ID
- **OAuth LAN/Remote Fix** — Detección de IP privada para `redirect_uri` + modo URL manual para servidores remotos
- **OAuth detrás de Nginx**: utiliza `window.location.origin` para compatibilidad con proxy inverso
- **Guía remota de OAuth**: guía paso a paso para las credenciales de Google Cloud en VPS/Docker

</details>

<details>
<summary><b>📊 9. "No sé cuánto estoy gastando ni dónde"</b></summary>

Los desarrolladores utilizan múltiples proveedores pagos pero no tienen una visión unificada del gasto. Cada proveedor tiene su propio panel de facturación, pero no hay una vista consolidada. Los costos inesperados pueden acumularse.

**Cómo lo resuelve OmniRoute:**

- **Panel de análisis de costos**: seguimiento de costos por token y gestión de presupuesto por proveedor
- **Límites de presupuesto por nivel**: límite de gasto por nivel que activa el respaldo automático
- **Configuración de precios por modelo**: precios configurables por modelo
- **Estadísticas de uso por clave API**: recuento de solicitudes y marca de tiempo utilizada por última vez por clave
- **Panel de análisis**: tarjetas de estadísticas, tabla de uso de modelos, tabla de proveedores con tasas de éxito y latencia.

</details>

<details>
<summary><b>🐛 10. "No puedo diagnosticar errores y problemas en llamadas AI"</b></summary>

Cuando falla una llamada, el desarrollador no sabe si se trata de un límite de velocidad, un token caducado, un formato incorrecto o un error del proveedor. Registros fragmentados en diferentes terminales. Sin observabilidad, la depuración es de prueba y error.

**Cómo lo resuelve OmniRoute:**

- **Panel de registros unificados**: 4 pestañas: registros de solicitudes, registros de proxy, registros de auditoría y consola
- **Visor de registros de consola**: visor estilo terminal en tiempo real con niveles codificados por colores, desplazamiento automático, búsqueda y filtro
- **Registros de proxy SQLite**: registros persistentes que sobreviven a los reinicios del servidor
- **Translator Playground**: 4 modos de depuración: Playground (traducción de formato), Chat Tester (ida y vuelta), Test Bench (por lotes), Live Monitor (en tiempo real)
- **Solicitud de telemetría**: latencia p50/p95/p99 + seguimiento de X-Request-Id
- **Registro basado en archivos con rotación**: el interceptor de consola captura todo en el registro JSON con rotación basada en el tamaño.

</details>

<details>
<summary><b>🏗️ 11. "Implementar y mantener la puerta de enlace es complejo"</b></summary>

Instalar, configurar y mantener un proxy de IA en diferentes entornos (local, VPS, Docker, nube) requiere mucha mano de obra. Problemas como rutas codificadas, `EACCES` en directorios, conflictos de puertos y compilaciones multiplataforma añaden fricción.

**Cómo lo resuelve OmniRoute:**

- **instalación global de npm** — `npm install -g omniroute && omniroute` — hecho
- **Docker multiplataforma**: AMD64 + ARM64 nativo (Apple Silicon, AWS Graviton, Raspberry Pi)
- **Perfiles de Docker Compose**: `base` (sin herramientas CLI) y `cli` (con Claude Code, Codex, OpenClaw)
- **Aplicación de escritorio Electron**: aplicación nativa para Windows/macOS/Linux con bandeja del sistema, inicio automático y modo sin conexión
- **Modo de puerto dividido**: API y panel en puertos separados para escenarios avanzados (proxy inverso, redes de contenedores)
- **Cloud Sync**: sincronización de configuración entre dispositivos a través de Cloudflare Workers
- **Copias de seguridad de base de datos**: copia de seguridad, restauración, exportación e importación automáticas de todas las configuraciones

</details>

<details>
<summary><b>🌍 12. "La interfaz es solo en inglés y mi equipo no habla inglés"</b></summary>

Los equipos en países que no hablan inglés, especialmente en América Latina, Asia y Europa, tienen dificultades con las interfaces solo en inglés. Las barreras del idioma reducen la adopción y aumentan los errores de configuración.

**Cómo lo resuelve OmniRoute:**

- **Panel i18n — 30 idiomas** — Las más de 500 teclas traducidas, incluidas árabe, búlgaro, danés, alemán, español, finlandés, francés, hebreo, hindi, húngaro, indonesio, italiano, japonés, coreano, malayo, holandés, noruego, polaco, portugués (PT/BR), rumano, ruso, eslovaco, sueco, tailandés, ucraniano, vietnamita, chino, filipino, inglés.
- **Soporte RTL**: soporte de derecha a izquierda para árabe y hebreo
- **README multilingüe**: 30 traducciones de documentación completa
- **Selector de idioma**: ícono de globo en el encabezado para cambiar en tiempo real

</details>

<details>
<summary><b>🔄 13. "Necesito más que chat: necesito incrustaciones, imágenes y audio"</b></summary>

La IA no es solo completar un chat. Los desarrolladores necesitan generar imágenes, transcribir audio, crear incrustaciones para RAG, reclasificar documentos y moderar contenido. Cada API tiene un punto final y un formato diferentes.

**Cómo lo resuelve OmniRoute:**

- **Integraciones** — `/v1/embeddings` con 6 proveedores y más de 9 modelos
- **Generación de imágenes** — `/v1/images/generations` con 10 proveedores y más de 20 modelos (OpenAI, xAI, Together, Fireworks, Nebius, Hyperbolic, NanoBanana, Antigravity, SD WebUI, ComfyUI)
- **Texto a vídeo** — `/v1/videos/generations` — ComfyUI (AnimateDiff, SVD) y SD WebUI
- **Texto a música** — `/v1/music/generations` — ComfyUI (audio estable abierto, MusicGen)
- **Transcripción de audio** — `/v1/audio/transcriptions` — Whisper + Nvidia NIM, HuggingFace, Qwen3
- **Texto a voz** — `/v1/audio/speech` — ElevenLabs, Nvidia NIM, HuggingFace, Coqui, Tortoise, Qwen3, Inworld, Cartesia, PlayHT y proveedores existentes
- **Moderaciones** — `/v1/moderations` — Comprobaciones de seguridad del contenido
- **Reclasificación** — `/v1/rerank` — Reclasificación de relevancia del documento
- **API de respuestas**: compatibilidad total con `/v1/responses` para Codex

</details>

<details>
<summary><b>🧪 14. "No tengo forma de probar y comparar la calidad entre modelos"</b></summary>

Los desarrolladores quieren saber qué modelo es mejor para su caso de uso (código, traducción, razonamiento), pero comparar manualmente es lento. No existen herramientas de evaluación integradas.

**Cómo lo resuelve OmniRoute:**

- **Evaluaciones LLM**: pruebas de conjunto dorado con 10 casos precargados que cubren saludos, matemáticas, geografía, generación de código, cumplimiento de JSON, traducción, rebajas y rechazo de seguridad.
- **4 estrategias de coincidencia**: `exact`, `contains`, `regex`, `custom` (función JS)
- **Translator Playground Test Bench**: pruebas por lotes con múltiples entradas y resultados esperados, comparación entre proveedores
- **Chat Tester**: recorrido completo de ida y vuelta con representación de respuesta visual
- **Live Monitor**: flujo en tiempo real de todas las solicitudes que fluyen a través del proxy

</details>

<details>
<summary><b>📈 15. "Necesito escalar sin perder rendimiento"</b></summary>

A medida que crece el volumen de solicitudes, sin almacenar en caché las mismas preguntas generan costos duplicados. Sin idempotencia, las solicitudes duplicadas desperdician el procesamiento. Se deben respetar los límites de tarifas por proveedor.

**Cómo lo resuelve OmniRoute:**

- **Caché semántica**: la caché de dos niveles (firma + semántica) reduce el costo y la latencia
- **Solicitud de idempotencia**: ventana de deduplicación de 5 segundos para solicitudes idénticas
- **Detección de límite de velocidad**: RPM por proveedor, intervalo mínimo y seguimiento simultáneo máximo
- **Límites de velocidad editables**: valores predeterminados configurables en Configuración → Resiliencia con persistencia
- **Caché de validación de clave API**: caché de 3 niveles para rendimiento de producción
- **Panel de estado con telemetría**: latencia p50/p95/p99, estadísticas de caché, tiempo de actividad

</details>

<details>
<summary><b>🤖 16. "Quiero controlar el comportamiento del modelo globalmente"</b></summary>

Desarrolladores que quieran todas las respuestas en un idioma específico, con un tono específico o quieran limitar los tokens de razonamiento. Configurar esto en cada herramienta/solicitud no es práctico.

**Cómo lo resuelve OmniRoute:**

- **Inyección de aviso del sistema**: aviso global aplicado a todas las solicitudes
- **Thinking Budget Validation**: control de asignación de tokens de razonamiento por solicitud (transferencia, automática, personalizada, adaptativa)
- **6 estrategias de enrutamiento**: estrategias globales que determinan cómo se distribuyen las solicitudes
- **Enrutador comodín**: los patrones `provider/*` se enrutan dinámicamente a cualquier proveedor
- **Activar/desactivar combinación de alternar**: alterna combinaciones directamente desde el panel
- **Alternar proveedor**: activa/desactiva todas las conexiones de un proveedor con un solo clic
- **Proveedores bloqueados**: excluye proveedores específicos del listado `/v1/models`

</details>

<details>
<summary><b>🧰 17. "Necesito herramientas MCP como capacidades de producto de primera clase"</b></summary>

Muchas puertas de enlace de IA exponen MCP solo como un detalle de implementación oculto. Los equipos necesitan una capa operativa visible y manejable.

**Cómo lo resuelve OmniRoute:**

- MCP aparece en la pestaña de navegación del panel y protocolo de punto final
- Página de gestión de MCP dedicada con procesos, herramientas, alcances y auditoría
- Inicio rápido integrado para `omniroute --mcp` e incorporación de clientes

</details>

<details>
<summary><b>🧠 18. "Necesito orquestación A2A con rutas de tareas de sincronización + transmisión"</b></summary>

Los flujos de trabajo de los agentes necesitan respuestas directas y una ejecución continua de larga duración con control del ciclo de vida.

**Cómo lo resuelve OmniRoute:**

- Punto final A2A JSON-RPC (`POST /a2a`) con `message/send` y `message/stream`
- Transmisión SSE con propagación del estado terminal
- API de ciclo de vida de tareas para `tasks/get` y `tasks/cancel`

</details>

<details>
<summary><b>🛰️ 19. "Necesito un estado real del proceso MCP, no un estado adivinado"</b></summary>

Los equipos operativos necesitan saber si MCP está realmente activo, no solo si se puede acceder a una API.

**Cómo lo resuelve OmniRoute:**

- Archivo de latidos en tiempo de ejecución con PID, marcas de tiempo, transporte, recuento de herramientas y modo de alcance
- API de estado de MCP que combina latidos + actividad reciente
- Tarjetas de estado de la interfaz de usuario para el proceso/tiempo de actividad/actualización de latidos

</details>

<details>
<summary><b>📋 20. "Necesito ejecución de herramienta MCP auditable"</b></summary>

Cuando las herramientas modifican la configuración o desencadenan acciones de operaciones, los equipos necesitan trazabilidad forense.

**Cómo lo resuelve OmniRoute:**

- Registro de auditoría respaldado por SQLite para llamadas a herramientas MCP
- Filtros por herramienta, éxito/fracaso, clave API y paginación
- Tabla de auditoría del panel + puntos finales de estadísticas para automatización

</details>

<details>
<summary><b>🔐 21. "Necesito permisos MCP con alcance por integración"</b></summary>

Los diferentes clientes deberían tener acceso con privilegios mínimos a las categorías de herramientas.

**Cómo lo resuelve OmniRoute:**

- 9 alcances MCP granulares para acceso controlado a herramientas
- Aplicación del alcance y visibilidad en la interfaz de usuario de gestión de MCP
- Postura predeterminada segura para herramientas operativas

</details>

<details>
<summary><b>⚙️ 22. "Necesito controles operativos sin redistribuir"</b></summary>

Los equipos necesitan cambios rápidos en el tiempo de ejecución durante incidentes o eventos de costos.

**Cómo lo resuelve OmniRoute:**

- Cambie la activación combinada directamente desde el panel de MCP
- Aplicar perfiles de resiliencia de paquetes de políticas predefinidos
- Restablecer el estado del disyuntor desde el mismo panel de operaciones.

</details>

<details>
<summary><b>🔄 23. "Necesito visibilidad y cancelación del ciclo de vida de la tarea A2A en vivo"</b></summary>

Sin visibilidad del ciclo de vida, los incidentes de tareas se vuelven difíciles de clasificar.

**Cómo lo resuelve OmniRoute:**

- Listado de tareas/filtrado por estado/habilidad con paginación
- Profundización en metadatos, eventos y artefactos de tareas
- Punto final de cancelación de tarea y acción de UI con confirmación

</details>

<details>
<summary><b>🌊 24. "Necesito métricas de transmisión activas para la carga A2A"</b></summary>

Los flujos de trabajo de streaming requieren información operativa sobre la simultaneidad y las conexiones en vivo.

**Cómo lo resuelve OmniRoute:**

- Contadores de flujo activos integrados en el estado A2A
- Marca de tiempo de la última tarea y recuentos por estado
- Tarjetas de tablero A2A para monitoreo de operaciones en tiempo real

</details>

<details>
<summary><b>🪪 25. "Necesito descubrimiento de agente estándar para clientes"</b></summary>

Los clientes y orquestadores externos necesitan metadatos legibles por máquina para la incorporación.

**Cómo lo resuelve OmniRoute:**

- Tarjeta de agente expuesta en `/.well-known/agent.json`
- Capacidades y habilidades mostradas en la interfaz de usuario de gestión.
- La API de estado A2A incluye metadatos de descubrimiento para la automatización

</details>

<details>
<summary><b>🧭 26. "Necesito capacidad de descubrimiento de protocolo en la UX del producto"</b></summary>

Si los usuarios no pueden descubrir las superficies de protocolo, la calidad de la adopción y el soporte disminuye.

**Cómo lo resuelve OmniRoute:**

- Entradas de la barra lateral para MCP y A2A
- Pestaña Protocolos de la página del endpoint con inicio rápido y estado
- Enlaces desde la descripción general a paneles de gestión dedicados

</details>

<details>
<summary><b>🧪 27. "Necesito validación de protocolo de extremo a extremo con clientes reales"</b></summary>

Las pruebas simuladas no son suficientes para validar la compatibilidad del protocolo antes del lanzamiento.

**Cómo lo resuelve OmniRoute:**

- Suite E2E que inicia la aplicación y utiliza transporte de cliente MCP SDK real
- Pruebas de cliente A2A para descubrimiento, envío, transmisión, obtención y cancelación de flujos
- Verificar las afirmaciones con las API de auditoría MCP y tareas A2A.

</details>

<details>
<summary><b>📡 28. "Necesito observabilidad unificada en todas las interfaces"</b></summary>

Dividir la observabilidad por protocolo crea puntos ciegos y MTTR más largos.

**Cómo lo resuelve OmniRoute:**

- Paneles/registros/análisis unificados en un solo producto
- Salud + auditoría + solicitud de telemetría en capas OpenAI, MCP y A2A
- API operativas para estado y automatización.

</details>

<details>
<summary><b>💼 29. "Necesito un tiempo de ejecución para proxy + herramientas + orquestación de agentes"</b></summary>

La ejecución de muchos servicios separados aumenta los costos operativos y los modos de falla.

**Cómo lo resuelve OmniRoute:**

- Proxy compatible con OpenAI, servidor MCP y servidor A2A en una sola pila
- Autenticación compartida, resiliencia, almacenamiento de datos y observabilidad.
- Modelo de política consistente en todas las superficies de interacción.

</details>

<details>
<summary><b>🚀 30. "Necesito enviar flujos de trabajo agentes sin expansión de código adhesivo"</b></summary>

Los equipos pierden velocidad al unir múltiples scripts y servicios ad hoc.

**Cómo lo resuelve OmniRoute:**

- Estrategia de endpoint unificada para clientes y agentes
- UI de gestión de protocolos integradas y rutas de validación de humo
- Fundamentos listos para producción (seguridad, registro, resiliencia, respaldo)

</details>

### Guías de ejemplo (casos de uso integrados)

**Libro de estrategias A: maximizar la suscripción paga + copia de seguridad económica**

```txt
Combo: "maximize-claude"
  1. cc/claude-opus-4-6
  2. glm/glm-4.7
  3. if/kimi-k2-thinking

Monthly cost: $20 + small backup spend
Outcome: higher quality, near-zero interruption
```

**Libro de estrategias B: pila de codificación de costo cero**

```txt
Combo: "free-forever"
  1. gc/gemini-3-flash
  2. if/kimi-k2-thinking
  3. qw/qwen3-coder-plus

Monthly cost: $0
Outcome: stable free coding workflow
```

**Libro de estrategias C: cadena alternativa siempre disponible las 24 horas del día, los 7 días de la semana**

```txt
Combo: "always-on"
  1. cc/claude-opus-4-6
  2. cx/gpt-5.2-codex
  3. glm/glm-4.7
  4. minimax/MiniMax-M2.1
  5. if/kimi-k2-thinking

Outcome: deep fallback depth for deadline-critical workloads
```

**Libro de jugadas D: Operaciones del agente con MCP + A2A**

```txt
1) Start MCP transport (`omniroute --mcp`) for tool-driven operations
2) Run A2A tasks via `message/send` and `message/stream`
3) Observe via /dashboard/mcp and /dashboard/a2a
4) Control incidents with resilience profile + task cancellation
```

---

## ⚡ Inicio Rápido

**1. Instala globalmente:**

```bash
npm install -g omniroute
omniroute
```

🎉 El Dashboard se abre en `http://localhost:20128`

| Comando                 | Descripción                                    |
| ----------------------- | ---------------------------------------------- |
| `omniroute`             | Iniciar servidor (puerto predeterminado 20128) |
| `omniroute --port 3000` | Usar puerto personalizado                      |
| `omniroute --no-open`   | No abrir navegador automáticamente             |
| `omniroute --help`      | Mostrar ayuda                                  |

**2. Conecta un proveedor GRATUITO:**

Dashboard → Proveedores → Conectar **Claude Code** o **Antigravity** → Login OAuth → ¡Listo!

**3. Usa en tu herramienta CLI:**

```
Claude Code/Codex/Gemini CLI/OpenClaw/Cursor/Cline Configuración:
  Endpoint: http://localhost:20128/v1
  API Key: [copiar del dashboard]
  Model: if/kimi-k2-thinking
```

**¡Eso es todo!** Comienza a programar con modelos de IA GRATUITOS.

**Alternativa — ejecutar desde código fuente:**

```bash
cp .env.example .env
npm install
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

---

## 🐳 Docker

OmniRoute está disponible como imagen Docker pública en [Docker Hub](https://hub.docker.com/r/diegosouzapw/omniroute).

**Ejecución rápida:**

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**Con archivo de entorno:**

```bash
# Copia y edita el .env primero
cp .env.example .env

docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --env-file .env \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  diegosouzapw/omniroute:latest
```

**Usando Docker Compose:**

```bash
# Perfil base (sin herramientas CLI)
docker compose --profile base up -d

# Perfil CLI (Claude Code, Codex, OpenClaw integrados)
docker compose --profile cli up -d
```

| Imagen                   | Tag      | Tamaño | Descripción            |
| ------------------------ | -------- | ------ | ---------------------- |
| `diegosouzapw/omniroute` | `latest` | ~250MB | Última versión estable |
| `diegosouzapw/omniroute` | `1.0.6`  | ~250MB | Versión actual         |

---

---

## 🖥️

> 🆕 **¡NUEVO!** OmniRoute ahora está disponible como **aplicación de escritorio nativa** para Windows, macOS y Linux.

Ejecuta OmniRoute como una aplicación de escritorio autónoma — sin terminal, sin navegador, sin internet necesario para modelos locales. La app basada en Electron incluye:

- 🖥️ **Ventana Nativa** — Ventana dedicada con integración en la bandeja del sistema
- 🔄 **Inicio Automático** — Inicia OmniRoute al iniciar sesión
- 🔔 **Notificaciones Nativas** — Recibe alertas sobre cuota o problemas de proveedores
- ⚡ **Instalación con Un Clic** — NSIS (Windows), DMG (macOS), AppImage (Linux)
- 🌐 **Modo Sin Conexión** — Funciona completamente offline con servidor incluido

### Inicio Rápido

```bash
npm run electron:dev           # Modo desarrollo
npm run electron:build         # Plataforma actual
npm run electron:build:win     # Windows (.exe)
npm run electron:build:mac     # macOS (.dmg)
npm run electron:build:linux   # Linux (.AppImage)
```

📖 Documentación completa: [`electron/README.md`](electron/README.md)

---

## 💰 Precios Resumidos

| Tier               | Proveedor         | Costo                        | Reset de Cuota    | Mejor Para              |
| ------------------ | ----------------- | ---------------------------- | ----------------- | ----------------------- |
| **💳 SUSCRIPCIÓN** | Claude Code (Pro) | $20/mes                      | 5h + semanal      | Ya suscrito             |
|                    | Codex (Plus/Pro)  | $20-200/mes                  | 5h + semanal      | Usuarios OpenAI         |
|                    | Gemini CLI        | **GRATUITO**                 | 180K/mes + 1K/día | ¡Todos!                 |
|                    | GitHub Copilot    | $10-19/mes                   | Mensual           | Usuarios GitHub         |
| **🔑 API KEY**     | NVIDIA NIM        | **GRATUITO** (1000 créditos) | Único             | Pruebas gratuitas       |
|                    | DeepSeek          | Por uso                      | Ninguno           | Mejor precio/calidad    |
|                    | Groq              | Tier gratuito + pago         | Limitado          | Inferencia ultra-rápida |
|                    | xAI (Grok)        | Por uso                      | Ninguno           | Modelos Grok            |
|                    | Mistral           | Tier gratuito + pago         | Limitado          | IA Europea              |
|                    | OpenRouter        | Por uso                      | Ninguno           | 100+ modelos            |
| **💰 BARATO**      | GLM-4.7           | $0.6/1M                      | Diario 10h        | Respaldo económico      |
|                    | MiniMax M2.1      | $0.2/1M                      | Rotativo 5h       | Opción más barata       |
|                    | Kimi K2           | $9/mes fijo                  | 10M tokens/mes    | Costo predecible        |
| **🆓 GRATUITO**    | iFlow             | $0                           | Ilimitado         | 8 modelos gratuitos     |
|                    | Qwen              | $0                           | Ilimitado         | 3 modelos gratuitos     |
|                    | Kiro              | $0                           | Ilimitado         | Claude gratuito         |

**💡 Consejo Pro:** ¡Comienza con Gemini CLI (180K gratis/mes) + iFlow (ilimitado gratis) = $0 de costo!

---

## 💡 Características Principales

### 🧠 Enrutamiento e Inteligencia

| Característica                         | Qué Hace                                                                        |
| -------------------------------------- | ------------------------------------------------------------------------------- |
| 🎯 **Fallback Inteligente 4 Tiers**    | Auto-enrutamiento: Suscripción → API Key → Barato → Gratuito                    |
| 📊 **Rastreo de Cuota en Tiempo Real** | Conteo de tokens en vivo + countdown de reset por proveedor                     |
| 🔄 **Traducción de Formato**           | OpenAI ↔ Claude ↔ Gemini ↔ Cursor ↔ Kiro transparente                           |
| 👥 **Soporte Multi-Cuenta**            | Múltiples cuentas por proveedor con selección inteligente                       |
| 🔄 **Renovación Automática de Token**  | Tokens OAuth se renuevan automáticamente con reintentos                         |
| 🎨 **Combos Personalizados**           | 6 estrategias: fill-first, round-robin, p2c, random, least-used, cost-optimized |
| 🧩 **Modelos Personalizados**          | Agrega cualquier ID de modelo a cualquier proveedor                             |
| 🌐 **Enrutador Wildcard**              | Enruta patrones `provider/*` a cualquier proveedor dinámicamente                |
| 🧠 **Presupuesto de Razonamiento**     | Modos passthrough, auto, custom y adaptativo para modelos de razonamiento       |
| 🔀 **Model Aliases**                   | Auto-forward deprecated model IDs to current replacements (built-in + custom)   |
| ⚡ **Background Degradation**          | Auto-route background tasks (titles, summaries) to cheaper models               |
| 💬 **Inyección de System Prompt**      | System prompt global aplicado en todas las solicitudes                          |
| 📄 **API Responses**                   | Soporte completo de la API Responses de OpenAI (`/v1/responses`) para Codex     |

### 🎵 APIs Multi-Modal

| Característica                | Qué Hace                                                                                                                                                                   |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 🖼️ **Generación de Imágenes** | `/v1/images/generations` — 4 proveedores, 9+ modelos                                                                                                                       |
| 📐 **Embeddings**             | `/v1/embeddings` — 6 proveedores, 9+ modelos                                                                                                                               |
| 🎤 **Transcripción de Audio** | `/v1/audio/transcriptions` — 7 providers (Deepgram Nova 3, AssemblyAI, Groq Whisper, HuggingFace, ElevenLabs, OpenAI, Azure), auto-language detection, MP4/MP3/WAV support |
| 🔊 **Texto a Voz**            | `/v1/audio/speech` — 10 providers (ElevenLabs, OpenAI, Deepgram, Cartesia, PlayHT, HuggingFace, Nvidia NIM, Inworld, Coqui, Tortoise)                                      |
| 🛡️ **Moderaciones**           | `/v1/moderations` — Verificaciones de seguridad                                                                                                                            |
| 🔀 **Reranking**              | `/v1/rerank` — Reranking de relevancia de documentos                                                                                                                       |

### 🛡️ Resiliencia y Seguridad

| Característica                     | Qué Hace                                                                     |
| ---------------------------------- | ---------------------------------------------------------------------------- |
| 🔌 **Circuit Breaker**             | Auto-apertura/cierre por proveedor con umbrales configurables                |
| 🎯 **Endpoint-Aware Models**       | Custom models declare supported endpoints + API format                       |
| 🛡️ **Anti-Thundering Herd**        | Mutex + semáforo rate-limit para proveedores con API key                     |
| 🧠 **Caché Semántico**             | Caché de dos niveles (firma + semántico) reduce costo y latencia             |
| ⚡ **Idempotencia de Solicitud**   | Ventana de dedup de 5s para solicitudes duplicadas                           |
| 🔒 **Spoofing de Fingerprint TLS** | Bypass de detección de bot vía TLS con wreq-js                               |
| 🌐 **Filtrado de IP**              | Allowlist/blocklist para control de acceso a la API                          |
| 📊 **Rate Limits Editables**       | RPM, gap mínimo y concurrencia máxima configurables                          |
| 💾 **Rate Limit Persistence**      | Learned limits survive restarts via SQLite with 60s debounce + 24h staleness |
| 🔄 **Token Refresh Resilience**    | Per-provider circuit breaker (5 fails→30min) + 30s timeout per attempt       |

### 📊 Observabilidad y Analytics

| Característica                 | Qué Hace                                                              |
| ------------------------------ | --------------------------------------------------------------------- |
| 📝 **Logs de Solicitud**       | Modo debug con logs completos de request/response                     |
| 💾 **Logs SQLite**             | Logs de proxy persistentes sobreviven a reinicios                     |
| 📊 **Dashboard de Analytics**  | Recharts: cards de estadísticas, gráfico de uso, tabla de proveedores |
| 📈 **Rastreo de Progreso**     | Eventos de progreso SSE opt-in para streaming                         |
| 🧪 **Evaluaciones de LLM**     | Pruebas con conjunto golden y 4 estrategias de match                  |
| 🔍 **Telemetría de Solicitud** | Agregación de latencia p50/p95/p99 + rastreo X-Request-Id             |
| 📋 **Logs + Cuotas**           | Páginas dedicadas para navegación de logs y rastreo de cuotas         |
| 🏥 **Dashboard de Salud**      | Uptime, estados de circuit breaker, lockouts, stats de caché          |
| 💰 **Rastreo de Costos**       | Gestión de presupuesto + configuración de precios por modelo          |

### ☁️ Deploy y Sincronización

| Característica                    | Qué Hace                                                                        |
| --------------------------------- | ------------------------------------------------------------------------------- |
| 💾 **Cloud Sync**                 | Sincroniza configuraciones entre dispositivos vía Cloudflare Workers            |
| 🌐 **Deploy en Cualquier Lugar**  | Localhost, VPS, Docker, Cloudflare Workers                                      |
| 🔑 **Gestión de API Keys**        | Genera, rota y define alcance de API keys por proveedor                         |
| 🧙 **Asistente de Configuración** | Setup guiado en 4 pasos para nuevos usuarios                                    |
| 🔧 **Dashboard CLI Tools**        | Configuración en un clic para Claude, Codex, Cline, OpenClaw, Kilo, Antigravity |
| 🔄 **Backups de DB**              | Backup y restauración automáticos de todas las configuraciones                  |

<details>
<summary><b>📖 Detalles de Características</b></summary>

### 🎯 Fallback Inteligente 4 Tiers

Crea combos con fallback automático:

```
Combo: "my-coding-stack"
  1. cc/claude-opus-4-6        (tu suscripción)
  2. nvidia/llama-3.3-70b      (API NVIDIA gratuita)
  3. glm/glm-4.7               (respaldo barato, $0.6/1M)
  4. if/kimi-k2-thinking       (fallback gratuito)

→ Cambia automáticamente cuando la cuota se agota o ocurren errores
```

### 📊 Rastreo de Cuota en Tiempo Real

- Consumo de tokens por proveedor
- Countdown de reset (5 horas, diario, semanal)
- Estimación de costo para tiers pagos
- Reportes de gastos mensuales

### 🔄 Traducción de Formato

Traducción transparente entre formatos:

- **OpenAI** ↔ **Claude** ↔ **Gemini** ↔ **OpenAI Responses**
- Tu herramienta CLI envía formato OpenAI → OmniRoute traduce → El proveedor recibe formato nativo
- Funciona con cualquier herramienta que soporte endpoints OpenAI personalizados

### 👥 Soporte Multi-Cuenta

- Agrega múltiples cuentas por proveedor
- Round-robin automático o enrutamiento por prioridad
- Fallback a la siguiente cuenta cuando una alcanza la cuota

### 🔄 Renovación Automática de Token

- Los tokens OAuth se renuevan automáticamente antes de expirar
- Sin necesidad de re-autenticación manual
- Experiencia transparente en todos los proveedores

### 🎨 Combos Personalizados

- Crea combinaciones ilimitadas de modelos
- 6 estrategias: fill-first, round-robin, power-of-two-choices, random, least-used, cost-optimized
- Comparte combos entre dispositivos con Cloud Sync

### 🏥 Dashboard de Salud

- Estado del sistema (uptime, versión, uso de memoria)
- Estados de circuit breaker por proveedor (Closed/Open/Half-Open)
- Estado de rate limit y lockouts activos
- Estadísticas de caché de firma
- Telemetría de latencia (p50/p95/p99) + caché de prompt
- Reset de salud con un clic

### 🔧 Playground del Traductor

- Debug, prueba y visualiza traducciones de formato de API
- Envía solicitudes y ve cómo OmniRoute traduce entre formatos de proveedores
- Invaluable para troubleshooting de problemas de integración

### 💾 Cloud Sync

- Sincroniza proveedores, combos y configuraciones entre dispositivos
- Sincronización automática en segundo plano
- Almacenamiento cifrado seguro

</details>

## 🧪 Evaluaciones (Evals)

OmniRoute incluye un framework de evaluación integrado para probar la calidad de respuestas de LLM contra un conjunto golden. Accede vía **Analytics → Evals** en el dashboard.

### Conjunto Golden Integrado

El "OmniRoute Golden Set" precargado contiene 10 casos de prueba que cubren:

- Saludos, matemáticas, geografía, generación de código
- Conformidad de formato JSON, traducción, markdown
- Rechazo de seguridad (contenido dañino), conteo, lógica booleana

### Estrategias de Evaluación

| Estrategia | Descripción                                          | Ejemplo                          |
| ---------- | ---------------------------------------------------- | -------------------------------- |
| `exact`    | La salida debe coincidir exactamente                 | `"4"`                            |
| `contains` | La salida debe contener subcadena (case-insensitive) | `"Paris"`                        |
| `regex`    | La salida debe coincidir con el patrón regex         | `"1.*2.*3"`                      |
| `custom`   | Función JS personalizada retorna true/false          | `(output) => output.length > 10` |

---

## 📖 Guía de Configuración

<details>
<summary><b>💳 Proveedores por Suscripción</b></summary>

### Claude Code (Pro/Max)

```bash
Dashboard → Proveedores → Conectar Claude Code
→ Login OAuth → Renovación automática de token
→ Rastreo de cuota 5h + semanal

Modelos:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**Consejo Pro:** Usa Opus para tareas complejas, Sonnet para velocidad. ¡OmniRoute rastrea cuota por modelo!

### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Proveedores → Conectar Codex
→ Login OAuth (puerto 1455)
→ Reset 5h + semanal

Modelos:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

### Gemini CLI (¡GRATUITO 180K/mes!)

```bash
Dashboard → Proveedores → Conectar Gemini CLI
→ Google OAuth
→ 180K completions/mes + 1K/día

Modelos:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**Mejor Valor:** ¡Tier gratuito enorme! Úsalo antes de los tiers pagos.

### GitHub Copilot

```bash
Dashboard → Proveedores → Conectar GitHub
→ OAuth vía GitHub
→ Reset mensual (1ro del mes)

Modelos:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3-pro
```

</details>

<details>
<summary><b>🔑 Proveedores por API Key</b></summary>

### NVIDIA NIM (¡GRATUITO 1000 créditos!)

1. Regístrate: [build.nvidia.com](https://build.nvidia.com)
2. Obtén API key gratuita (1000 créditos de inferencia incluidos)
3. Dashboard → Agregar Proveedor → NVIDIA NIM:
   - API Key: `nvapi-your-key`

**Modelos:** `nvidia/llama-3.3-70b-instruct`, `nvidia/mistral-7b-instruct`, y 50+ más

**Consejo Pro:** ¡API compatible con OpenAI — funciona perfectamente con la traducción de formato de OmniRoute!

### DeepSeek

1. Regístrate: [platform.deepseek.com](https://platform.deepseek.com)
2. Obtén API key
3. Dashboard → Agregar Proveedor → DeepSeek

**Modelos:** `deepseek/deepseek-chat`, `deepseek/deepseek-coder`

### Groq (¡Tier Gratuito Disponible!)

1. Regístrate: [console.groq.com](https://console.groq.com)
2. Obtén API key (tier gratuito incluido)
3. Dashboard → Agregar Proveedor → Groq

**Modelos:** `groq/llama-3.3-70b`, `groq/mixtral-8x7b`

**Consejo Pro:** ¡Inferencia ultra-rápida — mejor para programación en tiempo real!

### OpenRouter (100+ Modelos)

1. Regístrate: [openrouter.ai](https://openrouter.ai)
2. Obtén API key
3. Dashboard → Agregar Proveedor → OpenRouter

**Modelos:** Accede a 100+ modelos de todos los principales proveedores a través de una única API key.

</details>

<details>
<summary><b>💰 Proveedores Baratos (Respaldo)</b></summary>

### GLM-4.7 (Reset diario, $0.6/1M)

1. Regístrate: [Zhipu AI](https://open.bigmodel.cn/)
2. Obtén API key del Plan Coding
3. Dashboard → Agregar API Key:
   - Proveedor: `glm`
   - API Key: `your-key`

**Usa:** `glm/glm-4.7`

**Consejo Pro:** ¡El Plan Coding ofrece 3× cuota a 1/7 del costo! Reset diario 10:00 AM.

### MiniMax M2.1 (Reset 5h, $0.20/1M)

1. Regístrate: [MiniMax](https://www.minimax.io/)
2. Obtén API key
3. Dashboard → Agregar API Key

**Usa:** `minimax/MiniMax-M2.1`

**Consejo Pro:** ¡Opción más barata para contexto largo (1M tokens)!

### Kimi K2 ($9/mes fijo)

1. Suscríbete: [Moonshot AI](https://platform.moonshot.ai/)
2. Obtén API key
3. Dashboard → Agregar API Key

**Usa:** `kimi/kimi-latest`

**Consejo Pro:** ¡$9/mes fijo por 10M tokens = $0.90/1M de costo efectivo!

</details>

<details>
<summary><b>🆓 Proveedores GRATUITOS (Respaldo de Emergencia)</b></summary>

### iFlow (8 modelos GRATUITOS)

```bash
Dashboard → Conectar iFlow
→ Login OAuth iFlow
→ Uso ilimitado

Modelos:
  if/kimi-k2-thinking
  if/qwen3-coder-plus
  if/glm-4.7
  if/minimax-m2
  if/deepseek-r1
```

### Qwen (3 modelos GRATUITOS)

```bash
Dashboard → Conectar Qwen
→ Autorización por código de dispositivo
→ Uso ilimitado

Modelos:
  qw/qwen3-coder-plus
  qw/qwen3-coder-flash
```

### Kiro (Claude GRATUITO)

```bash
Dashboard → Conectar Kiro
→ AWS Builder ID o Google/GitHub
→ Uso ilimitado

Modelos:
  kr/claude-sonnet-4.5
  kr/claude-haiku-4.5
```

</details>

<details>
<summary><b>🎨 Crear Combos</b></summary>

### Ejemplo 1: Maximizar Suscripción → Respaldo Barato

```
Dashboard → Combos → Crear Nuevo

Nombre: premium-coding
Modelos:
  1. cc/claude-opus-4-6 (Suscripción primaria)
  2. glm/glm-4.7 (Respaldo barato, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Fallback más barato, $0.20/1M)

Usa en CLI: premium-coding
```

### Ejemplo 2: Solo Gratuito (Costo Cero)

```
Nombre: free-combo
Modelos:
  1. gc/gemini-3-flash-preview (180K gratis/mes)
  2. if/kimi-k2-thinking (ilimitado)
  3. qw/qwen3-coder-plus (ilimitado)

Costo: ¡$0 para siempre!
```

</details>

<details>
<summary><b>🔧 Integración CLI</b></summary>

### Cursor IDE

```
Configuración → Modelos → Avanzado:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [del dashboard OmniRoute]
  Model: cc/claude-opus-4-6
```

### Claude Code

Usa la página **CLI Tools** en el dashboard para configuración en un clic, o edita `~/.claude/settings.json` manualmente.

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"

codex "your prompt"
```

### OpenClaw

**Opción 1 — Dashboard (recomendado):**

```
Dashboard → CLI Tools → OpenClaw → Seleccionar Modelo → Aplicar
```

**Opción 2 — Manual:** Edita `~/.openclaw/openclaw.json`:

```json
{
  "models": {
    "providers": {
      "omniroute": {
        "baseUrl": "http://127.0.0.1:20128/v1",
        "apiKey": "sk_omniroute",
        "api": "openai-completions"
      }
    }
  }
}
```

> **Nota:** OpenClaw solo funciona con OmniRoute local. Usa `127.0.0.1` en lugar de `localhost` para evitar problemas de resolución IPv6.

### Cline / Continue / RooCode

```
Configuración → Configuración de API:
  Proveedor: OpenAI Compatible
  Base URL: http://localhost:20128/v1
  API Key: [del dashboard OmniRoute]
  Model: if/kimi-k2-thinking
```

</details>

---

## 🐛 Solución de Problemas

<details>
<summary><b>Haz clic para expandir la guía de solución de problemas</b></summary>

**"Language model did not provide messages"**

- Cuota del proveedor agotada → Verifica el rastreador de cuota en el dashboard
- Solución: Usa combo con fallback o cambia a tier más barato

**Rate limiting**

- Cuota de suscripción agotada → Fallback a GLM/MiniMax
- Agrega combo: `cc/claude-opus-4-6 → glm/glm-4.7 → if/kimi-k2-thinking`

**Token OAuth expirado**

- Renovado automáticamente por OmniRoute
- Si persiste: Dashboard → Proveedor → Reconectar

**Costos altos**

- Verifica estadísticas de uso en Dashboard → Costos
- Cambia modelo primario a GLM/MiniMax
- Usa tier gratuito (Gemini CLI, iFlow) para tareas no críticas

**Dashboard se abre en el puerto equivocado**

- Establece `PORT=20128` y `NEXT_PUBLIC_BASE_URL=http://localhost:20128`

**Errores de cloud sync**

- Verifica que `BASE_URL` apunte a tu instancia en ejecución
- Verifica que `CLOUD_URL` apunte a tu endpoint cloud esperado
- Mantén los valores `NEXT_PUBLIC_*` alineados con los valores del servidor

**Primer login no funciona**

- Verifica `INITIAL_PASSWORD` en `.env`
- Si no está definido, la contraseña predeterminada es `123456`

**Sin logs de solicitud**

- Establece `ENABLE_REQUEST_LOGS=true` en `.env`

**Prueba de conexión muestra "Invalid" para proveedores compatibles con OpenAI**

- Muchos proveedores no exponen el endpoint `/models`
- OmniRoute v1.0.6+ incluye validación vía chat completions como fallback
- Asegúrate de que la URL base incluya el sufijo `/v1`

</details>

---

## 🛠️

- **Runtime**: Node.js 20+
- **Lenguaje**: TypeScript 5.9 — **100% TypeScript** en `src/` y `open-sse/` (v1.0.6)
- **Framework**: Next.js 16 + React 19 + Tailwind CSS 4
- **Base de Datos**: LowDB (JSON) + SQLite (estado del dominio + logs de proxy)
- **Streaming**: Server-Sent Events (SSE)
- **Auth**: OAuth 2.0 (PKCE) + JWT + API Keys
- **Testing**: Node.js test runner (368+ tests unitarios)
- **CI/CD**: GitHub Actions (publicación automática npm + Docker Hub en release)
- **Website**: [omniroute.online](https://omniroute.online)
- **Paquete**: [npmjs.com/package/omniroute](https://www.npmjs.com/package/omniroute)
- **Docker**: [hub.docker.com/r/diegosouzapw/omniroute](https://hub.docker.com/r/diegosouzapw/omniroute)
- **Resiliencia**: Circuit breaker, backoff exponencial, anti-thundering herd, spoofing TLS

---

## 📖 Documentación

| Documento                                        | Descripción                                        |
| ------------------------------------------------ | -------------------------------------------------- |
| [Guía del Usuario](docs/USER_GUIDE.md)           | Proveedores, combos, integración CLI, deploy       |
| [Referencia de API](docs/API_REFERENCE.md)       | Todos los endpoints con ejemplos                   |
| [Solución de Problemas](docs/TROUBLESHOOTING.md) | Problemas comunes y soluciones                     |
| [Arquitectura](docs/ARCHITECTURE.md)             | Arquitectura del sistema e internos                |
| [Contribuir](CONTRIBUTING.md)                    | Setup de desarrollo y directrices                  |
| [Spec OpenAPI](docs/openapi.yaml)                | Especificación OpenAPI 3.0                         |
| [Política de Seguridad](SECURITY.md)             | Reportar vulnerabilidades y prácticas de seguridad |

---

## 🗺️

## 👥 Contribuidores

[![Contributors](https://contrib.rocks/image?repo=diegosouzapw/OmniRoute&max=100&columns=20&anon=1)](https://github.com/diegosouzapw/OmniRoute/graphs/contributors)

### Cómo Contribuir

1. Haz fork del repositorio
2. Crea tu rama de funcionalidad (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add amazing feature'`)
4. Haz push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

Consulta [CONTRIBUTING.md](CONTRIBUTING.md) para directrices detalladas.

### Lanzar una Nueva Versión

```bash
# Crea un release — la publicación en npm ocurre automáticamente
gh release create v1.0.6 --title "v1.0.6" --generate-notes
```

---

## 📊 Historial de Stars

## Stargazers over time

## [![Stargazers over time](https://starchart.cc/diegosouzapw/OmniRoute.svg?variant=adaptive)](https://starchart.cc/diegosouzapw/OmniRoute)

## 🙏 Agradecimientos

Agradecimiento especial a **[9router](https://github.com/decolua/9router)** por **[decolua](https://github.com/decolua)** — el proyecto original que inspiró este fork. OmniRoute se construye sobre esa increíble base con características adicionales, APIs multi-modal y una reescritura completa en TypeScript.

Agradecimiento especial a **[CLIProxyAPI](https://github.com/router-for-me/CLIProxyAPI)** — la implementación original en Go que inspiró esta adaptación a JavaScript.

---

## 📄 Licencia

Licencia MIT - consulta [LICENSE](LICENSE) para detalles.

---

<div align="center">
  <sub>Hecho con ❤️ para desarrolladores que programan 24/7</sub>
  <br/>
  <sub><a href="https://omniroute.online">omniroute.online</a></sub>
</div>
