# Chaos Mode (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CHAOS-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/CHAOS-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/CHAOS-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/CHAOS-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/CHAOS-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/CHAOS-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/CHAOS-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/CHAOS-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/CHAOS-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/CHAOS-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/CHAOS-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/CHAOS-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/CHAOS-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/CHAOS-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/CHAOS-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/CHAOS-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/CHAOS-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/CHAOS-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/CHAOS-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/CHAOS-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/CHAOS-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/CHAOS-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/CHAOS-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/CHAOS-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/CHAOS-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/CHAOS-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/CHAOS-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/CHAOS-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/CHAOS-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/CHAOS-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/CHAOS-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/CHAOS-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/CHAOS-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/CHAOS-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/CHAOS-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/CHAOS-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/CHAOS-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/CHAOS-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/CHAOS-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/CHAOS-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/CHAOS-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/CHAOS-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/CHAOS-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CHAOS-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/CHAOS-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/CHAOS-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/CHAOS-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/CHAOS-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/CHAOS-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/CHAOS-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/CHAOS-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/CHAOS-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/CHAOS-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/CHAOS-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/CHAOS-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/CHAOS-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CHAOS-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/CHAOS-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/CHAOS-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/CHAOS-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/CHAOS-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CHAOS-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CHAOS-MODE.md)

---

> **Panel de control:** **Modo Caos** (barra lateral) → `/dashboard/chaos`  
> **API:** `GET` / `PUT` `/api/chaos/config` · `POST /api/chaos/run` (sesión del panel de control) · `POST /api/skills/collect/chaos` (clave de API)  
> **Código fuente:** `src/lib/chaos/chaosExecutor.ts`, `src/lib/chaos/chaosConfig.ts`

El Modo Caos envía **una tarea a varios proveedores a la vez**: cada proveedor participante
aporta una instancia de modelo y usted obtiene todas las respuestas en paralelo (o encadenadas). Es una
superficie de ejecución multimodelo, no una estrategia de enrutamiento: su tráfico normal de `/v1/chat/completions`
nunca se ve afectado.

**Desambiguación: el producto incluye tres elementos diferentes con "chaos" en el nombre:**

| Elemento                     | Qué es                                                                                                                                               | Dónde está documentado                       |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Modo Caos**                | La página del panel de control y la API descritas aquí: distribuye una tarea entre muchos proveedores (en paralelo o de forma colaborativa).         | Esta guía                                    |
| `auto/chaos`                 | Un id de modelo Auto-Combo con ponderaciones de puntuación para inyección de fallos, destinado a pruebas de resiliencia. No hay nada que configurar. | [AUTO-COMBO.md](../routing/AUTO-COMBO.md)    |
| Configuración de combo Chaos | Un combo persistente con `config.chaos.enabled` distribuye la tarea a un panel con un modelo juez opcional (solo mediante API).                      | `open-sse/services/autoCombo/chaosEngine.ts` |

## Configuración

1. Abra **Panel de control → Modo Caos** (`/dashboard/chaos`).
2. **Actívelo**: el Modo Caos viene **desactivado de forma predeterminada** (`enabled: false` en
   `src/lib/chaos/chaosConfig.ts`). Mientras esté desactivado, `POST /api/chaos/run` responde con
   `400 — "Chaos Mode is not enabled. Enable it in Dashboard → Chaos Mode."`.
3. Elija los participantes y los valores predeterminados (se conservan por instancia mediante el almacén de configuración):

   | Campo               | Significado                                                               | Valor predeterminado / límites                    |
   | ------------------- | ------------------------------------------------------------------------- | ------------------------------------------------- |
   | `enabled`           | Interruptor principal                                                     | `false`                                           |
   | `defaultMode`       | `parallel` o `collaborative` (consulte más abajo)                         | `parallel`                                        |
   | `providerOverrides` | Participación por proveedor (`providerId`, `modelId` opcional, `enabled`) | vacío = todos los proveedores activos, máximo 200 |
   | `systemPrompt`      | Reemplazo del prompt de sistema integrado de Chaos                        | opcional, máximo de 10 000 caracteres             |
   | `timeoutMs`         | Tiempo máximo por llamada al modelo                                       | `120000` (5 000–600 000)                          |
   | `maxTokens`         | `max_tokens` por llamada al modelo                                        | `4096` (256–128 000)                              |

4. Ejecute una **prueba desde la propia página**: el panel de resultados muestra la respuesta,
   el estado y la duración de cada proveedor.

## Modos de ejecución

- **`parallel`**: todos los modelos reciben la misma tarea simultáneamente; usted recibe todas las respuestas
  de forma independiente.
- **`collaborative`**: los modelos se ejecutan **en cadena**: cada uno ve la salida del modelo anterior y
  recibe instrucciones para refinarla, ampliarla, criticarla u ofrecer una alternativa. El campo `summary` de la respuesta
  concatena las salidas correctas en el orden de la cadena (las ejecuciones en paralelo no tienen `summary`).

## API

### `POST /api/chaos/run` — sesión del panel de control

Autenticación mediante cookies (la sesión de administración; consulte
[MANAGEMENT-AUTH.md](MANAGEMENT-AUTH.md)); lo utiliza la página del panel de control.

```jsonc
// cuerpo
{
  "task": "Compare approaches to X", // obligatorio
  "providers": ["glm", "kimi"], // filtro opcional
  "mode": "parallel", // opcional — reemplaza defaultMode
  "systemPrompt": "…", // reemplazo opcional
  "maxTokens": 4096, // reemplazo opcional
}
```

### `POST /api/skills/collect/chaos` — clave de API

Variante con token Bearer para clientes externos. La clave debe tener el **permiso de Modo Caos**
(`chaosModeEnabled`), que está **desactivado de forma predeterminada**; actívelo para cada clave en
**Panel de control → Gestor de API → editar clave → permisos → Modo Caos**. Usa el mismo cuerpo que el anterior.

```bash
curl -X POST http://localhost:20128/api/skills/collect/chaos \
  -H "Authorization: Bearer $OMNIROUTE_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"task":"Compare approaches to X","mode":"parallel"}'
```

Ambos endpoints devuelven la misma estructura:

```jsonc
{
  "task": "…",
  "mode": "parallel",
  "startedAt": "2026-09-01T00:00:00.000Z",
  "totalProviders": 3,
  "totalResults": 3,
  "models": [
    {
      "providerId": "glm",
      "providerName": "GLM",
      "modelId": "glm-4.7",
      "status": "success",
      "content": "…",
      "durationMs": 3210,
    },
  ],
  "summary": "…", // solo en modo colaborativo
}
```

## Solución de problemas

- **`400 Chaos Mode is not enabled`**: consulte el paso 2 anterior; el interruptor global está desactivado.
- **La clave de API se rechaza en `/api/skills/collect/chaos`**: la clave no tiene el permiso por clave
  `chaosModeEnabled` (desactivado de forma predeterminada; se trata de una configuración, no de un error).
- **Un proveedor esperado no aparece en los resultados**: compruebe `providerOverrides` en la
  página Modo Caos (un reemplazo desactivado lo excluye) y verifique si la conexión del proveedor está
  activa.
