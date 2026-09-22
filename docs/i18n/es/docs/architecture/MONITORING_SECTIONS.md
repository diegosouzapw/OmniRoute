# Monitoring & Costs — Navigation Structure (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇦 [bs](../../../bs/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇰 [da](../../../da/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇪 [de](../../../de/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇪 [et](../../../et/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇩 [id](../../../id/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇹 [it](../../../it/docs/architecture/MONITORING_SECTIONS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇴 [no](../../../no/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇭 [th](../../../th/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/MONITORING_SECTIONS.md)

---

> Implementado en el Grupo B (plan 16). Consulta `src/shared/constants/sidebarVisibility.ts`.

---

## Navegación de alto nivel

La barra lateral del panel (después del Grupo B) tiene estas secciones de nivel superior, en este orden:

```
Inicio
Proveedores
Combos
Claves de API
Configuración
Analíticas
Costes          ← NUEVO (Grupo B, plan 16)
Monitorización  ← REORGANIZADO (Grupo B, plan 16)
...
```

---

## Sección Costes (nueva, nivel 1)

Prefijo de ruta: `/dashboard/costs/`

| Elemento                | URL                                  | Descripción                                             |
| ----------------------- | ------------------------------------ | ------------------------------------------------------- |
| Resumen                 | `/dashboard/costs`                   | Panel de costes agregados (trasladado desde Analíticas) |
| Precios                 | `/dashboard/costs/pricing`           | Tabla de precios por modelo                             |
| Presupuesto             | `/dashboard/costs/budget`            | Umbrales de presupuesto + alertas                       |
| Cuota compartida        | `/dashboard/costs/quota-share`       | Grupos de cuota compartida + uso                        |
| Configuración de planes | `/dashboard/costs/quota-share/plans` | Personalizaciones de planes por proveedor               |

**Justificación**: Precios, Presupuesto y Cuota compartida estaban anteriormente en
`Monitorización > Parámetros de costes`. Trasladarlos a una sección dedicada de nivel superior
permite encontrarlos sin tener que navegar por las herramientas de observabilidad.

---

## Sección Monitorización (reorganizada)

La sección Monitorización ahora tiene **Actividad en la parte superior**, seguida de **3 subgrupos**:

```
Monitorización
├── Actividad             ← Fuente cronológica (elemento de nivel superior)
├── Grupo Registros
│   ├── Registros (todos)
│   ├── Registros del proxy
│   └── Registros de la consola
├── Grupo Auditoría
│   ├── Registro de auditoría
│   ├── Auditoría de MCP
│   └── Auditoría de A2A
└── Grupo Sistema
    ├── Estado
    └── Tiempo de ejecución
```

### Qué ha cambiado respecto a la estructura anterior

| Antes                                                                                                              | Después                                             |
| ------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------- |
| Actividad = pestaña dentro de Registros que mostraba el Registro de auditoría                                      | Actividad = fuente dedicada (`/dashboard/activity`) |
| Grupo Parámetros de costes en Monitorización                                                                       | Trasladado a la sección Costes                      |
| Lista plana: Registros, Actividad (registros), Auditoría, Estado, Tiempo de ejecución, Precios, Presupuesto, Cuota | 3 grupos estructurados + sección Costes dedicada    |

---

## Actividad frente a Registro de auditoría

Ahora son dos elementos distintos:

| Dimensión             | Actividad (`/dashboard/activity`)                                   | Registro de auditoría (`/dashboard/audit`)   |
| --------------------- | ------------------------------------------------------------------- | -------------------------------------------- |
| **Propósito**         | Fuente de eventos para el usuario ("qué ha ocurrido recientemente") | Registro de cumplimiento normativo/seguridad |
| **Fuente de datos**   | `GET /api/compliance/audit-log?level=high`                          | `GET /api/compliance/audit-log?level=all`    |
| **Formato**           | Cronología agrupada por día, verbos legibles e iconos               | Tabla densa paginada, 50/página              |
| **Filtros**           | Categoría del tipo de evento                                        | Acción, gravedad, actor, intervalo de fechas |
| **Exportación**       | No disponible                                                       | Exportación a JSON                           |
| **Filtro por actor**  | No aplicable                                                        | Se puede filtrar por actor                   |
| **Eventos mostrados** | Solo acciones de alto nivel (lista de permitidos)                   | Todos los eventos de auditoría               |

### Lista de acciones de alto nivel permitidas

Definida en `src/lib/audit/highLevelActions.ts`. Controla qué eventos aparecen en
la fuente de Actividad. La lista de permitidos incluye:

- Eventos de adición/eliminación/prueba de proveedores
- Creación/actualización/eliminación de combos
- Ciclo de vida de las claves de API (creación, revocación, rotación)
- Umbral de presupuesto alcanzado
- Inicio/cierre de sesión de autenticación
- Creación de sesiones de agentes en la nube
- Registro de herramientas MCP
- Creación/eliminación de webhooks
- Cambios en grupos/planes de cuotas (acciones `quota.*`, Grupo B)
- Eventos de la plataforma (actualización, despliegue)
- Instalación/eliminación de habilidades

Los eventos que no estén en esta lista solo aparecen en el Registro de auditoría.

### Añadir una nueva acción de alto nivel

Edita `src/lib/audit/highLevelActions.ts` y añade la cadena de la acción a
`HIGH_LEVEL_ACTIONS`. Esto requiere una PR (la lista está en el código y no se puede
configurar mediante la base de datos). El icono correspondiente se puede añadir a
`src/lib/audit/activityIcons.ts`.

---

## Redirección: `/dashboard/logs/activity`

La ruta anterior `/dashboard/logs/activity` se redirige permanentemente (HTTP 308) a
`/dashboard/activity` mediante `permanentRedirect()` en
`src/app/(dashboard)/dashboard/logs/activity/page.tsx`.

El ID heredado de la barra lateral `logs-activity` se conserva en `HIDEABLE_SIDEBAR_ITEM_IDS`
(pero se ha eliminado de `SIDEBAR_DEFINITIONS`) para evitar que dejen de funcionar las
configuraciones predefinidas de los usuarios que hacen referencia al ID anterior.

---

## i18n

Espacios de nombres añadidos por el Grupo B:

| Clave del espacio de nombres | Abarca                                                                           |
| ---------------------------- | -------------------------------------------------------------------------------- |
| `sidebar.costsSection`       | Etiqueta de la sección Costes                                                    |
| `sidebar.activity`           | Elemento Actividad de la barra lateral                                           |
| `sidebar.logsGroup`          | Etiqueta del subgrupo Registros                                                  |
| `sidebar.systemGroup`        | Etiqueta del subgrupo Sistema                                                    |
| `sidebar.costsOverview`      | Elemento de resumen de costes                                                    |
| `activity.*`                 | Todas las cadenas de la página Actividad (título, verbos, filtros, estado vacío) |

Las configuraciones regionales que actúan como fuente de referencia son `pt-BR` y `en`. Las otras 40 configuraciones regionales recurren al
inglés mediante el mecanismo de respaldo de `next-intl` (configurado en `src/i18n/config.ts`).
