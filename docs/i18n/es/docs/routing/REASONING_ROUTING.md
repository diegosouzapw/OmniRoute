# Reasoning Routing (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_ROUTING.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_ROUTING.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_ROUTING.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_ROUTING.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_ROUTING.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_ROUTING.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_ROUTING.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_ROUTING.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_ROUTING.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_ROUTING.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/routing/REASONING_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_ROUTING.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_ROUTING.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_ROUTING.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_ROUTING.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_ROUTING.md)

---

Las reglas de enrutamiento de razonamiento amplían el enrutamiento existente de modelos y combos. Cuando ninguna regla activa coincide,
el comportamiento existente de razonamiento, sufijo, valor predeterminado de conexión y traducción del proveedor permanece
sin cambios.

## Administración

La administración de reglas está disponible en **Configuración → Enrutamiento global**. El editor de claves de API proporciona la
misma interfaz de administración filtrada para la clave seleccionada.

La API de administración se expone mediante estas rutas:

- `GET` y `POST` en `/api/settings/reasoning-routing-rules`
- `GET`, `PATCH` y `DELETE` en `/api/settings/reasoning-routing-rules/[id]`
- `POST` en `/api/settings/reasoning-routing-rules/simulate`

Todas las rutas usan `requireManagementAuth`. Las entradas se validan con los esquemas de
`src/shared/validation/schemas/reasoningRouting.ts`. El simulador nunca realiza una llamada ascendente.

## Resolución de reglas

La evaluación inicial selecciona exactamente una regla. Los ámbitos se comprueban en este orden:

1. `apiKey`
2. `combo`
3. `model`
4. `global`

Dentro de un ámbito, primero tiene prioridad el valor más alto de `priority`, seguido de una coincidencia exacta del modelo frente a un patrón glob
y, después, del orden estable de `createdAt` e `id`. Los `requestTags` se leen exclusivamente de `metadata.tags`
y admiten coincidencia `any` o `all`.

Una regla `connection` se evalúa únicamente cuando ninguna regla inicial resultó seleccionada y ya se ha
seleccionado una conexión concreta del proveedor. Solo puede cambiar el esfuerzo y el presupuesto.

## Esfuerzo y presupuesto

`sourceEffort` acepta `any`, `missing`, `none`, `low`, `medium`, `high`, `xhigh`, `max` y
`ultra`. `missing` significa que la solicitud no contiene ni un esfuerzo discreto ni un selector de razonamiento
ni un presupuesto de razonamiento. Por lo tanto, una señal que solo contiene presupuesto coincide únicamente con `any`.

`effortMode` tiene tres variantes:

- `inherit` conserva el esfuerzo del cliente, pero permite que el modelo o combo cambie.
- `default` establece `targetEffort` únicamente cuando no hay ninguna señal de razonamiento explícita.
- `force` reemplaza el esfuerzo discreto por `targetEffort`.

De forma independiente, `budgetAction` puede ser `preserve`, `remove` o `set`. `force` con `none` elimina
todos los campos reconocidos de esfuerzo y presupuesto. `none` junto con `set` no es válido.

Las solicitudes dirigidas a modelos conocidos como incompatibles se rechazan antes de la llamada ascendente. Para los destinos de tipo combo,
se eliminan las entradas incompatibles; si no queda ninguna, la solicitud devuelve el estado `400`.
Los datos de capacidades desconocidos generan una advertencia y mantienen activa la regla.

## Seguridad y transportes

El modelo de origen y destino, o el combo de origen y destino, siguen estando sujetos a la política existente de la clave de API.
Una regla de razonamiento nunca amplía los permisos de modelos, combos ni cuotas.

El motor está integrado en Chat Completions, Responses, Anthropic Messages y la ruta interna
de WebSocket de Codex. La ruta de WebSocket solo acepta modelos de destino de Codex; los destinos de tipo combo no se pueden
ejecutar allí. La decisión de la regla se almacena sin secretos en la traza de ruta existente.

## Persistencia

La migración `src/lib/db/migrations/126_reasoning_routing_rules.sql` crea la tabla
`reasoning_routing_rules`. Las reglas hacen referencia a claves de API, combos y conexiones de proveedores almacenados.
Las eliminaciones limpian las reglas relacionadas. La capa de acceso a la base de datos de
`src/lib/db/reasoningRoutingRules.ts` mantiene una caché invalidable para la ruta de la solicitud.

Las reglas se incluyen en las copias de seguridad de SQLite, la exportación completa de la base de datos y el paquete de sincronización de configuración.
`reconcileReasoningRulesForSync` deshabilita las reglas importadas con referencias ausentes e informa de esos
conflictos.
