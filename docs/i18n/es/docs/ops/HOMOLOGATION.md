# Homologation Suite (`npm run homolog`) (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/HOMOLOGATION.md) · 🇪🇹 [am](../../../am/docs/ops/HOMOLOGATION.md) · 🇸🇦 [ar](../../../ar/docs/ops/HOMOLOGATION.md) · 🇦🇿 [az](../../../az/docs/ops/HOMOLOGATION.md) · 🇧🇬 [bg](../../../bg/docs/ops/HOMOLOGATION.md) · 🇧🇩 [bn](../../../bn/docs/ops/HOMOLOGATION.md) · 🇧🇦 [bs](../../../bs/docs/ops/HOMOLOGATION.md) · 🇨🇿 [cs](../../../cs/docs/ops/HOMOLOGATION.md) · 🇩🇰 [da](../../../da/docs/ops/HOMOLOGATION.md) · 🇩🇪 [de](../../../de/docs/ops/HOMOLOGATION.md) · 🇬🇷 [el](../../../el/docs/ops/HOMOLOGATION.md) · 🇪🇪 [et](../../../et/docs/ops/HOMOLOGATION.md) · 🇮🇷 [fa](../../../fa/docs/ops/HOMOLOGATION.md) · 🇫🇮 [fi](../../../fi/docs/ops/HOMOLOGATION.md) · 🇫🇷 [fr](../../../fr/docs/ops/HOMOLOGATION.md) · 🇮🇪 [ga](../../../ga/docs/ops/HOMOLOGATION.md) · 🇮🇳 [gu](../../../gu/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ha](../../../ha/docs/ops/HOMOLOGATION.md) · 🇮🇱 [he](../../../he/docs/ops/HOMOLOGATION.md) · 🇮🇳 [hi](../../../hi/docs/ops/HOMOLOGATION.md) · 🇭🇷 [hr](../../../hr/docs/ops/HOMOLOGATION.md) · 🇭🇺 [hu](../../../hu/docs/ops/HOMOLOGATION.md) · 🇦🇲 [hy](../../../hy/docs/ops/HOMOLOGATION.md) · 🇮🇩 [id](../../../id/docs/ops/HOMOLOGATION.md) · 🇳🇬 [ig](../../../ig/docs/ops/HOMOLOGATION.md) · 🇮🇹 [it](../../../it/docs/ops/HOMOLOGATION.md) · 🇯🇵 [ja](../../../ja/docs/ops/HOMOLOGATION.md) · 🇬🇪 [ka](../../../ka/docs/ops/HOMOLOGATION.md) · 🇰🇭 [km](../../../km/docs/ops/HOMOLOGATION.md) · 🇮🇳 [kn](../../../kn/docs/ops/HOMOLOGATION.md) · 🇰🇷 [ko](../../../ko/docs/ops/HOMOLOGATION.md) · 🇱🇹 [lt](../../../lt/docs/ops/HOMOLOGATION.md) · 🇱🇻 [lv](../../../lv/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ml](../../../ml/docs/ops/HOMOLOGATION.md) · 🇮🇳 [mr](../../../mr/docs/ops/HOMOLOGATION.md) · 🇲🇾 [ms](../../../ms/docs/ops/HOMOLOGATION.md) · 🇲🇹 [mt](../../../mt/docs/ops/HOMOLOGATION.md) · 🇲🇲 [my](../../../my/docs/ops/HOMOLOGATION.md) · 🇳🇵 [ne](../../../ne/docs/ops/HOMOLOGATION.md) · 🇳🇱 [nl](../../../nl/docs/ops/HOMOLOGATION.md) · 🇳🇴 [no](../../../no/docs/ops/HOMOLOGATION.md) · 🇮🇳 [or](../../../or/docs/ops/HOMOLOGATION.md) · 🇮🇳 [pa](../../../pa/docs/ops/HOMOLOGATION.md) · 🇵🇭 [phi](../../../phi/docs/ops/HOMOLOGATION.md) · 🇵🇱 [pl](../../../pl/docs/ops/HOMOLOGATION.md) · 🇵🇹 [pt](../../../pt/docs/ops/HOMOLOGATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/HOMOLOGATION.md) · 🇷🇴 [ro](../../../ro/docs/ops/HOMOLOGATION.md) · 🇷🇺 [ru](../../../ru/docs/ops/HOMOLOGATION.md) · 🇱🇰 [si](../../../si/docs/ops/HOMOLOGATION.md) · 🇸🇰 [sk](../../../sk/docs/ops/HOMOLOGATION.md) · 🇸🇮 [sl](../../../sl/docs/ops/HOMOLOGATION.md) · 🇷🇸 [sr](../../../sr/docs/ops/HOMOLOGATION.md) · 🇸🇪 [sv](../../../sv/docs/ops/HOMOLOGATION.md) · 🇰🇪 [sw](../../../sw/docs/ops/HOMOLOGATION.md) · 🇮🇳 [ta](../../../ta/docs/ops/HOMOLOGATION.md) · 🇮🇳 [te](../../../te/docs/ops/HOMOLOGATION.md) · 🇹🇭 [th](../../../th/docs/ops/HOMOLOGATION.md) · 🇹🇷 [tr](../../../tr/docs/ops/HOMOLOGATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/HOMOLOGATION.md) · 🇵🇰 [ur](../../../ur/docs/ops/HOMOLOGATION.md) · 🇺🇿 [uz](../../../uz/docs/ops/HOMOLOGATION.md) · 🇻🇳 [vi](../../../vi/docs/ops/HOMOLOGATION.md) · 🇳🇬 [yo](../../../yo/docs/ops/HOMOLOGATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/HOMOLOGATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/HOMOLOGATION.md)

---

Validación E2E en un entorno real del despliegue de OmniRoute que se ejecuta en el VPS de homologación
(`HOMOLOG_BASE_URL`, p. ej., `http://192.168.0.15:20128`). Un solo comando sustituye la lista de comprobación manual
de la versión STOP #2 por una ejecución automatizada que genera evidencias.

## Qué cubre

| Capa                         | Qué comprueba                                                                                                                                                                                                                      | Implementación                                                                |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — salud/paridad           | `/api/monitoring/health` responde con `200`, `status: "healthy"` y la versión esperada                                                                                                                                             | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — clave efímera          | Inicio de sesión del administrador → `POST /api/keys` crea una clave de API con ámbito limitado para la ejecución, que se revoca (`DELETE /api/keys/:id`) en un bloque `finally`, independientemente del resultado                 | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — superficie de la API   | Catálogo `/v1/models`, una finalización de chat real sin streaming (modelo crítico para el nivel, `max_tokens: 5`), un `401` por clave no válida y el endpoint público `/api/monitoring/health`                                    | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — streaming SSE          | Finalización de chat real con streaming; verifica `text/event-stream`, al menos un delta de contenido y un terminador `[DONE]`                                                                                                     | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — proveedores reales      | Una solicitud de chat de coste mínimo por cada proveedor crítico presente en el catálogo `/v1/models` activo, generada dinámicamente mediante promptfoo                                                                            | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — autenticación de la UI | Inicia sesión una vez mediante el formulario de acceso real y reutiliza la sesión (`storageState`) en toda la capa de UI                                                                                                           | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — rutas de la UI         | Cada `page.tsx` estático en `src/app/(dashboard)/dashboard` (detectado desde el sistema de archivos; se omiten las rutas dinámicas `[param]`) carga sin errores HTTP, errores de página ni activar el límite de errores de Next.js | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — flujo crítico de la UI | Crea una clave de API mediante la UI del panel y vuelve a revocarla (no deja residuos en el VPS)                                                                                                                                   | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — informe unificado       | Combina httpYac (mediante `junit-to-ctrf`), el adaptador de promptfoo→CTRF y el reportador CTRF de Playwright en un único `homolog-ctrf.json`, además de un archivo `homolog-report/summary.md` legible para humanos               | `scripts/homolog/run.mjs`                                                     |

La propia repetición no implica ningún uso de LLM: se trata de una batería de regresión determinista,
no de una evaluación. La IA solo interviene en futuros trabajos de mantenimiento (consulte la hoja de ruta más abajo).

## Requisitos previos

1. Copia `.env.homolog.example` a `.env.homolog` (ignorado por git; nunca lo confirmes en el repositorio) y completa:
   - `HOMOLOG_BASE_URL` — el despliegue de destino, p. ej., `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — la contraseña de administración del panel para ese despliegue.
   - `HOMOLOG_CRITICAL_PROVIDERS` — prefijos de proveedores separados por comas que reciben una
     solicitud real de chat de comprobación rápida (p. ej., `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — déjalo vacío en las ejecuciones normales; la suite crea y revoca su
     propia clave efímera. Establécelo únicamente para depurar una sola capa de forma aislada.
2. Ejecuta `npm install` en el repositorio (las dependencias de la suite — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — son devDependencies normales).
3. Ejecuta `npx playwright install` si los binarios del navegador aún no están presentes.

## Cómo ejecutar

```bash
npm run homolog
```

Para validar un despliegue cuya versión no coincide con el `package.json` local
(p. ej., un entorno de homologación que todavía usa una versión de parche anterior), sobrescribe
explícitamente la versión esperada:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

La ejecución termina con un código distinto de cero si falla alguna capa y siempre intenta revocar la clave
de API efímera que creó, incluso si se produce un fallo (bloque `finally` en `scripts/homolog/run.mjs`).

## Lectura del informe

Toda la salida se guarda en `homolog-report/` (ignorado por git):

- `summary.md` — la misma tabla que se imprime en stdout, con una fila por capa (✅/❌ + detalles).
- `homolog-ctrf.json` — el informe CTRF unificado (combinación de los resultados de API/SSE,
  comprobación rápida de proveedores y UI); este es el artefacto que se debe adjuntar a una lista de verificación STOP #2 de la versión.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — los
  informes sin procesar/intermedios de cada capa.
- `promptfooconfig.yaml`, `provider-misses.json` — la configuración de promptfoo generada para
  la ejecución actual y cualquier proveedor crítico que no estuviera en el catálogo activo.

Un fallo en L0 provoca la interrupción inmediata (no se crea ninguna clave efímera), ya que una discrepancia
de versión/estado implica que todas las capas posteriores estarían validando el despliegue equivocado.

## Restablecimiento de la línea base cuando la UI cambia legítimamente

L4b (comprobación rápida de rutas) y L4c (flujo de UI de claves de API) utilizan localizadores reales del DOM, no
instantáneas, por lo que la mayoría de los cambios legítimos de la UI no requieren actualizar la suite. Cuando un cambio
sí rompe un localizador (p. ej., la etiqueta de un botón renombrada o una página de configuración trasladada):

1. Vuelve a confirmar el localizador con el código fuente actual (las especificaciones ya documentan el
   archivo/línea con el que se confirmó cada localizador; sigue el mismo patrón, no hagas suposiciones).
2. Actualiza la especificación en `tests/homolog/ui/`.
3. Vuelve a ejecutar `npm run homolog` (o solo la especificación de Playwright afectada) en el VPS para
   confirmar la corrección y, después, confírmala en el repositorio.

Esta suite no tiene una línea base visual/de píxeles (F1); consulta la hoja de ruta para obtener más información.

## Hoja de ruta (F2 / F3)

El diseño y el despliegue por fases se encuentran en la especificación de planificación interna
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (sin enlace; es un artefacto
interno de `_tasks/`, no forma parte de la documentación rastreada de este repositorio). Resumen:

- **F2** — grabación del recorrido completo → los agentes de Playwright Test (`planner`/`generator`)
  la convierten en especificaciones de flujo (crear una combinación, probar un proveedor, editar la configuración, herramientas MCP) +
  una línea base de regresión visual (Lost Pixel) con máscaras sobre los datos dinámicos (métricas,
  marcas de tiempo, registros) + una rutina de mantenimiento `healer` por versión.
- **F3** — cobertura de resiliencia/contratos/integración: toxiproxy + un proveedor falso compatible con OpenAI
  en la máquina de desarrollo, una combinación `homolog-resilience` en el VPS que apunte a él
  (tiempo de espera inyectado → comprobar la conmutación por error + la apertura/cierre del disyuntor mediante
  `/api/monitoring/health`); pruebas de contrato controladas con Schemathesis en
  `docs/openapi.yaml` (`--max-examples` bajo, semillas fijas, únicamente endpoints que no sean de LLM); e
  integración de `npm run homolog` + su `summary.md` en la fase STOP #2 de `/generate-release`.
