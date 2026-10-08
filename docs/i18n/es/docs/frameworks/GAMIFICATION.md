# Gamification & Leaderboard System (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **Fuente de verdad:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **Última actualización:** 2026-06-28 — v3.8.40

OmniRoute incluye una capa de gamificación con enfoque local que recompensa a los usuarios por
interactuar con la plataforma: realizar solicitudes, cambiar de proveedor, crear
combinaciones, compartir tokens y contribuir a la comunidad. Todo el estado reside en
SQLite; la federación con servidores de la comunidad es opcional y se basa en envíos.

El sistema está diseñado para tener **latencia cero en la ruta crítica**: los eventos de
gamificación se despachan sin esperar respuesta desde el flujo de solicitudes y nunca bloquean
una respuesta del LLM.

---

## Descripción general

### Propósito

Aumentar la interacción y retención de los usuarios proporcionando progreso visible (XP,
niveles, insignias), prueba social (tablas de clasificación) e incentivos económicos
(compartición de tokens, recompensas por invitación).

### Alcance

| Funcionalidad              | Descripción                                                                                               |
| -------------------------- | --------------------------------------------------------------------------------------------------------- |
| XP y niveles               | Obtén XP por cada acción; sube de nivel según una curva polinómica                                        |
| Insignias                  | Más de 20 logros en 5 categorías con 4 niveles de rareza                                                  |
| Rachas                     | Seguimiento del uso activo diario con la racha actual y la más larga                                      |
| Tablas de clasificación    | Ámbitos global, semanal, mensual, de compartición de tokens y de contribuciones                           |
| Compartición de tokens     | Transfiere créditos entre usuarios mediante un libro mayor de partida doble                               |
| Invitación y canje         | Códigos de referido almacenados con hashes SHA-256                                                        |
| Servidores de la comunidad | Federación con instancias externas de OmniRoute                                                           |
| Prevención de trampas      | Puntuación del lado del servidor, limitación de frecuencia y detección de anomalías mediante puntuación z |

### Principios de diseño

1. **Enfoque local** — todo el estado se almacena en SQLite; no se requieren servicios externos.
2. **No bloqueante** — los eventos se despachan sin esperar respuesta; la ruta de respuesta del LLM
   nunca se retrasa debido a la lógica de gamificación.
3. **Servidor autoritativo** — el XP se calcula únicamente en el lado del servidor; los clientes no pueden
   inflar las puntuaciones.
4. **Respeto por la privacidad** — la participación en la tabla de clasificación es opcional; los usuarios pueden
   ocultar su perfil.
5. **Preparado para federación** — los servidores de la comunidad pueden enviar puntuaciones mediante una API firmada;
   la sincronización sobrescribe los datos, no los suma.

---

## Arquitectura

### Flujo de alto nivel

```
Solicitud del cliente
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (flujo existente) ...
      → respuesta ascendente enviada al cliente
      → setImmediate (sin esperar respuesta):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

El emisor de eventos es el único punto de integración. `chatCore.ts` llama a
`emitGamificationEvent()` después de enviar la respuesta; el módulo de eventos distribuye
el evento a los subsistemas de XP, rachas, insignias, tablas de clasificación y prevención de trampas.

### Grafo de dependencias de módulos

```
src/lib/gamification/
  events.ts          ← punto de entrada (llamado desde chatCore.ts)
    ├── xp.ts        ← cálculo de XP y resolución de niveles
    ├── streaks.ts   ← seguimiento de rachas de actividad diaria
    ├── badges.ts    ← evaluación de criterios de insignias
    ├── leaderboard.ts ← cálculo de posiciones y difusión por SSE
    ├── antiCheat.ts ← limitación de frecuencia y detección de anomalías
    ├── sharing.ts   ← libro mayor de transferencias de tokens
    ├── invites.ts   ← gestión de códigos de invitación/canje
    ├── servers.ts   ← federación de servidores de la comunidad
    └── notifications.ts ← flujo de notificaciones SSE

src/lib/db/
  gamification.ts    ← todas las operaciones CRUD (8 tablas)

src/app/api/gamification/
  leaderboard/       ← GET clasificaciones, POST actualización manual
  leaderboard/stream ← actualizaciones en tiempo real mediante SSE
  transfer/          ← GET historial, POST envío de tokens
  invite/            ← GET/POST códigos, DELETE revocación
  invite/redeem/     ← POST canje de un código
  servers/           ← GET/POST/DELETE servidores de la comunidad
  federation/score/  ← POST envío de puntuación al servidor
  federation/leaderboard/ ← GET obtención de la tabla de clasificación del servidor
  notifications/     ← notificaciones SSE de insignias/subidas de nivel
  anomalies/         ← GET informes de anomalías (administración)
  rotate/            ← POST rotación de secretos de tokens de invitación
```

---

## Capa de datos

### Tablas de la base de datos

Todas las tablas se encuentran en la base de datos SQLite principal de OmniRoute, creada mediante la migración
`060_create_gamification.sql`. El registro en diario WAL se hereda de la instancia singleton
`getDbInstance()` de `src/lib/db/core.ts`.

```
┌─────────────────────────┐     ┌──────────────────────────┐
│      leaderboard        │     │      user_levels         │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ api_key_id    TEXT PK    │
│ api_key_id    TEXT      │     │ xp            INTEGER    │
│ scope         TEXT      │     │ level         INTEGER    │
│ score         INTEGER   │     │ title         TEXT       │
│ period        TEXT      │     │ updated_at    TEXT       │
│ updated_at    TEXT      │     └──────────────────────────┘
└─────────────────────────┘
                │
                │ 1:N
                ▼
┌─────────────────────────┐     ┌──────────────────────────┐
│     user_badges         │     │    badge_definitions     │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ name          TEXT       │
│ badge_id      TEXT FK   │     │ category      TEXT       │
│ earned_at     TEXT      │     │ rarity        TEXT       │
│ notified      INTEGER   │     │ criteria_type TEXT       │
└─────────────────────────┘     │ criteria      TEXT(JSON) │
                                │ description   TEXT       │
                                │ icon          TEXT       │
                                │ hidden        INTEGER    │
                                └──────────────────────────┘

┌─────────────────────────┐     ┌──────────────────────────┐
│     xp_audit_log        │     │     token_ledger         │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ from_key_id   TEXT       │
│ action        TEXT      │     │ to_key_id     TEXT       │
│ xp_awarded    INTEGER   │     │ amount        INTEGER    │
│ metadata      TEXT(JSON)│     │ idempotency_key TEXT UQ  │
│ created_at    TEXT      │     │ created_at    TEXT       │
└─────────────────────────┘     └──────────────────────────┘

┌─────────────────────────┐     ┌──────────────────────────┐
│    invite_tokens        │     │   community_servers      │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ name          TEXT       │
│ code          TEXT UQ   │     │ url           TEXT       │
│ token_hash    TEXT      │     │ token_hash    TEXT       │
│ uses          INTEGER   │     │ status        TEXT       │
│ max_uses      INTEGER   │     │ last_sync     TEXT       │
│ created_at    TEXT      │     │ created_at    TEXT       │
│ expires_at    TEXT      │     └──────────────────────────┘
└─────────────────────────┘
```

### Módulo de dominio: `src/lib/db/gamification.ts`

Sigue el patrón estándar de OmniRoute: importa `getDbInstance()` desde
`core.ts` y exporta funciones CRUD tipadas. No se utiliza SQL sin procesar en los controladores de rutas.

Funciones principales:

| Función                    | Descripción                                                            |
| -------------------------- | ---------------------------------------------------------------------- |
| `upsertLeaderboardEntry()` | Inserta o actualiza la puntuación de (api_key_id, scope, period)       |
| `getLeaderboard()`         | Clasificación paginada para un scope/period determinado                |
| `getUserLevel()`           | Obtiene o crea el registro de nivel del usuario                        |
| `updateUserLevel()`        | Establece el XP, el nivel y el título de forma atómica                 |
| `getBadgeDefinitions()`    | Todas las definiciones de insignias (opcionalmente filtradas)          |
| `getUserBadges()`          | Insignias obtenidas por un usuario                                     |
| `awardBadge()`             | Inserta la obtención de una insignia (idempotente respecto a badge_id) |
| `logXpAction()`            | Añade una entrada a xp_audit_log                                       |
| `getXpAuditLog()`          | Historial de auditoría paginado de un usuario                          |
| `insertLedgerEntry()`      | Transferencia por partida doble (dentro de una transacción)            |
| `getBalance()`             | Suma de lo recibido menos lo enviado por un usuario                    |
| `getTransferHistory()`     | Registro paginado de transferencias                                    |
| `createInviteToken()`      | Inserta un código de invitación y un token con hash                    |
| `redeemInviteToken()`      | Busca por código, lo valida e incrementa uses                          |
| `upsertCommunityServer()`  | Registra o actualiza un servidor de federación                         |
| `getCommunityServers()`    | Enumera los servidores de un usuario                                   |
| `deleteCommunityServer()`  | Elimina el registro de un servidor                                     |

---

## Sistema de XP / niveles

**Archivo:** `src/lib/gamification/xp.ts`

### Curva de niveles

La XP necesaria para alcanzar el nivel `n` sigue una curva polinómica:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| Nivel | XP para el siguiente | XP acumulada | Título       |
| ----- | -------------------- | ------------ | ------------ |
| 1     | 100                  | 100          | Principiante |
| 5     | 1,118                | 2,415        | Principiante |
| 10    | 3,162                | 10,523       | Explorador   |
| 25    | 12,500               | 86,024       | Explorador   |
| 50    | 35,355               | 345,529      | Experto      |
| 75    | 64,952               | 948,683      | Maestro      |
| 100   | 100,000              | 2,050,000    | Leyenda      |

### Títulos

| Rango de niveles | Título       |
| ---------------- | ------------ |
| 1 – 9            | Principiante |
| 10 – 24          | Explorador   |
| 25 – 49          | Experto      |
| 50 – 74          | Maestro      |
| 75 – 100         | Leyenda      |

### Recompensas de XP

| Acción            | XP  | Descripción                                                      |
| ----------------- | --- | ---------------------------------------------------------------- |
| `request`         | 1   | Por cada solicitud de API enrutada a través de OmniRoute         |
| `provider_switch` | 5   | Cambiar a un proveedor diferente                                 |
| `model_switch`    | 3   | Cambiar a un modelo diferente                                    |
| `combo_create`    | 10  | Crear un nuevo combo                                             |
| `combo_use`       | 2   | Usar un combo para una solicitud                                 |
| `token_share`     | 1   | Por cada 1 000 tokens compartidos con otro usuario               |
| `invite_redeem`   | 50  | Canjear un código de invitación                                  |
| `daily_login`     | 5   | Uso activo diario (una vez al día)                               |
| `streak_bonus`    | 2   | Por cada día consecutivo de racha (multiplicado por su duración) |
| `badge_unlock`    | 10  | Desbloquear una insignia                                         |

### Flujo de asignación

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. Consultar `XP_REWARDS[action]` para obtener la cantidad de XP.
2. Pasar por `checkRateLimit()` (sistema antitrampas: máximo de 1000 XP/min por clave).
3. Abrir una transacción:
   - Leer la fila actual de `user_levels`.
   - Añadir XP; volver a calcular el nivel mediante `levelFromXp(totalXp)`.
   - Si el nivel ha cambiado, establecer `levelUp = true`.
   - Actualizar la fila de `user_levels`.
   - Insertar en `xp_audit_log`.
4. Devolver el resultado. El invocador gestiona las notificaciones.

### Función auxiliar: `levelFromXp(totalXp)`

Itera por los niveles 1..100, sumando `xp_for_level(n)` hasta que la XP acumulada
supere `totalXp`. Devuelve el nivel más alto cuyo umbral se haya alcanzado.
Esto es O(100), algo aceptable dado que los niveles tienen un límite de 100.

---

## Sistema de insignias

**Archivo:** `src/lib/gamification/badges.ts`

### Categorías

| Categoría      | Descripción                           | Ejemplos de insignias                         |
| -------------- | ------------------------------------- | --------------------------------------------- |
| `usage`        | Hitos basados en el volumen           | Primera solicitud, 1K solicitudes, 100K       |
| `sharing`      | Uso compartido de tokens y referidos  | Primera vez compartiendo, Generoso (10 veces) |
| `contribution` | Participación en la comunidad         | Creador de combos, Explorador de proveedores  |
| `streak`       | Constancia a lo largo del tiempo      | Guerrero semanal, Devoto mensual              |
| `rare`         | Logros difíciles de obtener u ocultos | Usuario pionero, Informador de errores        |

### Rarezas

| Rareza      | Color | Indicador de probabilidad  |
| ----------- | ----- | -------------------------- |
| `common`    | Gris  | La mayoría de los usuarios |
| `uncommon`  | Verde | Usuarios activos           |
| `rare`      | Azul  | Usuarios dedicados         |
| `legendary` | Oro   | 1 % superior               |

### Tipos de criterios

| Tipo           | Campo        | Descripción                                             |
| -------------- | ------------ | ------------------------------------------------------- |
| `action_count` | `count`      | Realizar una acción N veces (p. ej., 1000 solicitudes)  |
| `streak`       | `days`       | Mantener una racha durante N días consecutivos          |
| `unique_count` | `field`, `n` | Usar N valores únicos (p. ej., 10 modelos diferentes)   |
| `rank`         | `scope`, `n` | Alcanzar la posición N en una clasificación determinada |
| `first`        | —            | Ser el primero en realizar una acción                   |
| `hidden`       | (varía)      | Criterios que no se muestran hasta obtener la insignia  |

Las definiciones de las insignias se almacenan en `badge_definitions` como `criteria` JSON:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### Flujo de evaluación

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # todas las definiciones
    → getUserBadges(apiKeyId)         # ya obtenidas (omitir)
    → para cada insignia no obtenida:
       → matchesCriteria(badge, event, userState)
       → si coincide: awardBadge(apiKeyId, badgeId)
         → devolver la carga útil de la notificación
```

La evaluación está **basada en eventos**: se ejecuta después de cada evento de gamificación, pero
solo comprueba las insignias cuyo `criteria.type` se corresponde con la acción del evento. Esto
mantiene una evaluación rápida (< 5 ms para la mayoría de los eventos).

### `matchesCriteria(badge, event, userState)`

| Tipo de criterio | Comprobación                                                             |
| ---------------- | ------------------------------------------------------------------------ |
| `action_count`   | `getActionCount(apiKeyId, action) >= count`                              |
| `streak`         | `getCurrentStreak(apiKeyId) >= days`                                     |
| `unique_count`   | `getUniqueCount(apiKeyId, field) >= n`                                   |
| `rank`           | `getRank(apiKeyId, scope) <= n`                                          |
| `first`          | No hay ninguna entrada previa en `xp_audit_log` para este tipo de acción |
| `hidden`         | Delega en la comprobación secundaria correspondiente                     |

### Insignias integradas (más de 20)

<details>
<summary>Lista completa de insignias</summary>

| Insignia                     | Categoría    | Rareza     | Criterios                         |
| ---------------------------- | ------------ | ---------- | --------------------------------- |
| Primeros pasos               | uso          | común      | 1 solicitud                       |
| Entrando en calor            | uso          | común      | 100 solicitudes                   |
| Usuario avanzado             | uso          | poco común | 1,000 solicitudes                 |
| Centurión                    | uso          | rara       | 10,000 solicitudes                |
| OmniPower                    | uso          | legendaria | 100,000 solicitudes               |
| Explorador de proveedores    | contribución | común      | Usar 5 proveedores diferentes     |
| Maestro de proveedores       | contribución | poco común | Usar 20 proveedores diferentes    |
| Arquitecto de combos         | contribución | poco común | Crear 5 combos                    |
| Gran maestro de combos       | contribución | rara       | Crear 25 combos                   |
| Primera transferencia        | compartir    | común      | 1 transferencia de tokens         |
| Generoso                     | compartir    | poco común | 10 transferencias de tokens       |
| Filántropo                   | compartir    | rara       | Transferir 10,000 tokens en total |
| Referidor                    | compartir    | común      | 1 referido exitoso                |
| Creador de redes             | compartir    | poco común | 10 referidos exitosos             |
| Guerrero semanal             | racha        | poco común | Racha de 7 días                   |
| Devoto mensual               | racha        | rara       | Racha de 30 días                  |
| Imparable                    | racha        | legendaria | Racha de 365 días                 |
| Adoptante temprano           | rara         | legendaria | Unirse durante el período beta    |
| Pionero de la compresión     | rara         | poco común | Usar la compresión 100 veces      |
| Coleccionista de habilidades | rara         | rara       | Usar 10 habilidades diferentes    |
| Explorador de modelos        | contribución | poco común | Usar 15 modelos diferentes        |

</details>

---

## Seguimiento de rachas

**Archivo:** `src/lib/gamification/streaks.ts`

### Modelo de datos

Las rachas se almacenan en la tabla `key_value` (tabla de utilidades compartida) bajo
claves con espacio de nombres:

| Clave                         | Valor                            | Descripción              |
| ----------------------------- | -------------------------------- | ------------------------ |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | Datos de la racha activa |

### Lógica

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. Leer el registro de la racha desde `key_value`.
2. Analizar `{current}`, `{longest}` y `{lastDate}` (cadena de fecha ISO).
3. Si `lastDate === today`, no realizar ningún cambio (ya se contabilizó hoy).
4. Si `lastDate === yesterday`, incrementar `current` y actualizar `longest` si es necesario.
5. Si `lastDate < yesterday`, restablecer `current = 1` (racha interrumpida).
6. Escribir el registro actualizado.
7. Comprobar los hitos: 7, 14, 30, 60, 90, 180 y 365 días. Si se alcanza uno,
   establecer `milestone = true` (el llamador otorga XP y comprueba las insignias).

### Casos límite

- **Zona horaria**: las rachas utilizan fechas UTC (`new Date().toISOString().slice(0, 10)`).
  Esto es intencionado: una única zona horaria canónica evita manipulaciones
  mediante cambios de zona horaria.
- **Usuarios nuevos**: no existe ningún registro de racha; la primera solicitud lo crea con
  `current=1, longest=1, lastDate=today`.
- **Varias solicitudes al día**: solo la primera solicitud del día UTC
  incrementa la racha.

---

## Clasificación

**Archivo:** `src/lib/gamification/leaderboard.ts`

### Ámbitos

| Ámbito          | Período | Descripción                                         |
| --------------- | ------- | --------------------------------------------------- |
| `global`        | `all`   | XP acumulado de todos los tiempos                   |
| `weekly`        | `week`  | XP obtenido en la semana UTC actual (lunes-domingo) |
| `monthly`       | `month` | XP obtenido en el mes UTC actual                    |
| `tokens_shared` | `all`   | Total de tokens transferidos a otros                |
| `contributions` | `all`   | Combos creados + proveedores usados + skills usadas |

### Cálculo de posiciones

Las posiciones se **calculan en el momento de la lectura**, no se almacenan. Esto evita datos
de posiciones obsoletos y elimina la necesidad de tareas periódicas para recalcularlas.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

Patrón de consulta:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### Rotación de períodos

Las clasificaciones semanales y mensuales rotan automáticamente:

1. **Archivar**: al finalizar el período, copiar las entradas actuales a
   `leaderboard_archive` con la etiqueta del período.
2. **Restablecer**: eliminar las entradas del período vencido.
3. **Activación**: se comprueba en cada llamada a `updateLeaderboard()`; la primera solicitud
   de un período nuevo activa la rotación.

Esto garantiza que las clasificaciones semanales se restablezcan cada lunes a las 00:00 UTC y que las mensuales
se restablezcan el primer día de cada mes.

### Actualizaciones en tiempo real mediante SSE

**Endpoint:** `GET /api/gamification/stream`

```
Cliente → GET /api/gamification/stream
  → Se establece la conexión SSE
  → El servidor envía inmediatamente una instantánea de los 10 primeros de la clasificación
  → Cada 5 segundos: envía los 10 primeros actualizados si han cambiado
  → Cada 15 segundos: comentario de latido (": heartbeat\n\n")
  → El cliente se desconecta → limpieza (eliminar el listener)
```

Formato del evento:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

El gestor de SSE realiza un seguimiento de los clientes conectados por ámbito y solo envía actualizaciones
cuando los datos de la clasificación han cambiado realmente desde el último envío.

---

## Compartición de tokens

**Archivo:** `src/lib/gamification/sharing.ts`

### Libro mayor de partida doble

Cada transferencia crea dos filas en `token_ledger`:

| Fila    | `from_key_id` | `to_key_id`  | `amount`  |
| ------- | ------------- | ------------ | --------- |
| Débito  | remitente     | destinatario | +cantidad |
| Crédito | destinatario  | remitente    | -cantidad |

Un momento: la convención es:

| Fila      | `from_key_id` | `to_key_id`  | `amount`  | Significado                       |
| --------- | ------------- | ------------ | --------- | --------------------------------- |
| Envío     | remitente     | destinatario | +cantidad | Salida de fondos del remitente    |
| Recepción | destinatario  | remitente    | +cantidad | Entrada de fondos al destinatario |

El saldo se calcula de la siguiente manera:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### Flujo de transferencia

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **Validación**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **Idempotencia**: comprobar si `idempotency_key` ya existe en el libro mayor.
   Si existe, devolver el resultado almacenado en caché.
3. **Transacción** (una única transacción de SQLite):
   a. Calcular el saldo del remitente.
   b. Si `balance < amount`, cancelar la operación (fondos insuficientes).
   c. Insertar la fila de envío (`from=sender,`.

### Limitación de frecuencia

- Máximo de 10 transferencias por minuto y por clave de API.
- Máximo de 10 000 tokens por transferencia.
- Máximo de 100 000 tokens transferidos al día por clave de API.

---

## Tokens de invitación y canje

**Archivo:** `src/lib/gamification/invites.ts`

### Formato del código

- **Código**: alfanumérico de 8 caracteres (p. ej., `A3K9-X7M2`), legible para las personas y
  mostrado al usuario.
- **Token**: token aleatorio de 32 bytes, almacenado como hash SHA-256. Se utiliza para
  el canje programático (p. ej., enlaces URL).

### Almacenamiento

| Columna      | Valor                        |
| ------------ | ---------------------------- |
| `code`       | `A3K9X7M2` (único, indexado) |
| `token_hash` | SHA-256(raw_token)           |

El token sin procesar se devuelve al usuario una sola vez durante su creación. OmniRoute
nunca vuelve a almacenarlo ni a mostrarlo; únicamente se conserva el hash.

### Prevención de autorreferencias

Cuando un usuario canjea un código, el sistema comprueba lo siguiente:

1. El código pertenece a un `api_key_id` diferente.
2. El usuario que realiza el canje no ha canjeado previamente ningún código del mismo
   referente (mediante una unión de `invite_tokens` y el registro de canjes).

Si alguna de las comprobaciones falla, el canje se rechaza con un mensaje de error claro.

### Caducidad y límites

- Valor predeterminado de `max_uses`: 10 (configurable durante la creación).
- Valor predeterminado de `expires_at`: 30 días desde la creación.
- Los códigos caducados o que hayan agotado sus usos devuelven HTTP 410 Gone.

---

## Federación de servidores comunitarios

**Archivo:** `src/lib/gamification/servers.ts`

### Conexión

Un servidor comunitario se registra mediante un token de invitación emitido por el servidor remoto. La instancia local:

1. Recibe el token de invitación (p. ej., pegado en el panel de control).
2. Llama a `POST /api/gamification/federation/leaderboard` en el servidor remoto para validar el token y obtener la clasificación actual.
3. Almacena el registro del servidor con `status: connected`.

### Modelo de sincronización

La federación utiliza **sincronización por sobrescritura**, no acumulativa:

```
Instancia local               Servidor comunitario
     │                              │
     ├── enviar puntuación ────────►│  POST /federation/score
     │   { api_key_id, score }      │  (el servidor valida el hash del token)
     │                              │
     ├── obtener clasificación ────►│  GET /federation/leaderboard
     │◄── primeras N entradas ──────┤  (sobrescribe la caché local)
     │                              │
     └── comprobación de estado ───►│  GET /federation/health
         (cada 60 s, tiempo de espera de 5 s) │
```

### Autenticación

Las solicitudes de federación incluyen:

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

El servidor remoto calcula el hash del token y busca la fila correspondiente en `community_servers`. Esto evita transmitir el hash almacenado.

### Supervisión del estado

Cada registro de servidor realiza un seguimiento de:

| Campo       | Descripción                                              |
| ----------- | -------------------------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable`                   |
| `last_sync` | Marca de tiempo ISO de la última sincronización correcta |
| `failures`  | Fallos consecutivos de comprobación de estado            |

Tras 5 fallos consecutivos, el estado cambia a `unreachable` y la sincronización se pausa hasta que una comprobación de estado manual se complete correctamente.

---

## Prevención de trampas

**Archivo:** `src/lib/gamification/antiCheat.ts`

### Cálculo de puntuación en el servidor

Todos los cálculos de XP se realizan en `src/lib/gamification/xp.ts`. Los clientes nunca envían una puntuación: envían acciones y el servidor calcula los XP. La columna `leaderboard.score` solo puede ser modificada por código del servidor.

### Limitación de frecuencia

| Límite                         | Valor   | Ámbito            |
| ------------------------------ | ------- | ----------------- |
| Máximo de XP por minuto        | 1,000   | Por clave de API  |
| Máx. transferencias/min.       | 10      | Por clave de API  |
| Importe máx. de transferencia  | 10,000  | Por transferencia |
| Máx. de transferencias diarias | 100,000 | Por clave de API  |

Los límites de frecuencia utilizan una ventana deslizante en memoria (el mismo patrón que `RateLimitManager` en `open-sse/services/`). Si el proceso se reinicia, se recurre a contadores respaldados por SQLite.

### Detección de anomalías mediante puntuación Z

Para cada clave de API, el sistema mantiene una ventana móvil de 7 días de los XP obtenidos por hora. Con cada asignación de XP:

1. Calcula la tasa actual de XP por hora del usuario.
2. Calcula la media y la desviación estándar de la población.
3. Calcula `z = (user_rate - mean) / stddev`.
4. Si `z > 3.0` (3 desviaciones estándar), lo marca como anomalía.

Las anomalías se registran en `xp_audit_log` con `action = 'anomaly_detected'` y se muestran en el panel de administración.

### Registro de auditoría

Cada asignación de XP, transferencia, obtención de insignia y detección de anomalías se registra en `xp_audit_log` con:

| Campo        | Descripción                                        |
| ------------ | -------------------------------------------------- |
| `api_key_id` | Quién                                              |
| `action`     | Qué ocurrió (xp_award, transfer, anomaly, …)       |
| `xp_awarded` | Cantidad (0 para eventos que no sean de XP)        |
| `metadata`   | JSON con el contexto (tipo de acción, objetivo, …) |
| `created_at` | Cuándo (ISO 8601)                                  |

Los administradores pueden consultar el registro de auditoría completo mediante `GET /api/gamification/anomalies`.

---

## Rutas de la API

Todas las rutas siguen el patrón estándar de OmniRoute:

```
Ruta → Preflight de CORS → Validación del cuerpo (Zod) → Autenticación (extractApiKey)
  → Controlador
```

### Endpoints

| Método | Ruta                                       | Descripción                                                     | Autenticación |
| ------ | ------------------------------------------ | --------------------------------------------------------------- | ------------- |
| GET    | `/api/gamification/leaderboard`            | Obtener la clasificación (ámbito, período, paginación)          | Opcional      |
| POST   | `/api/gamification/leaderboard`            | Forzar la actualización de la caché de clasificación            | Obligatoria   |
| GET    | `/api/gamification/stream`                 | Actualizaciones de la clasificación en tiempo real mediante SSE | Opcional      |
| GET    | `/api/gamification/transfer`               | Obtener el historial de transferencias (paginación)             | Obligatoria   |
| POST   | `/api/gamification/transfer`               | Enviar tokens a otro usuario                                    | Obligatoria   |
| GET    | `/api/gamification/invite`                 | Enumerar mis códigos de invitación                              | Obligatoria   |
| POST   | `/api/gamification/invite`                 | Generar un nuevo código de invitación                           | Obligatoria   |
| DELETE | `/api/gamification/invite`                 | Revocar un código de invitación                                 | Obligatoria   |
| POST   | `/api/gamification/invite/redeem`          | Canjear un código de invitación                                 | Obligatoria   |
| GET    | `/api/gamification/servers`                | Enumerar los servidores de la comunidad                         | Obligatoria   |
| POST   | `/api/gamification/servers`                | Conectarse a un servidor de la comunidad                        | Obligatoria   |
| DELETE | `/api/gamification/servers`                | Desconectarse de un servidor de la comunidad                    | Obligatoria   |
| POST   | `/api/gamification/federation/score`       | Enviar la puntuación a un servidor remoto                       | Federación    |
| GET    | `/api/gamification/federation/leaderboard` | Obtener la clasificación de un servidor remoto                  | Federación    |
| GET    | `/api/gamification/notifications`          | Notificaciones SSE de insignias y subidas de nivel              | Obligatoria   |
| GET    | `/api/gamification/anomalies`              | Ver informes de anomalías (administrador)                       | Administrador |
| POST   | `/api/gamification/rotate`                 | Rotar los secretos de los tokens de invitación                  | Obligatoria   |

### Ejemplos de solicitudes/respuestas

**POST /api/gamification/transfer**

```json
// Solicitud
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// Respuesta 200
{
  "success": true,
  "transfer": {
    "id": "txn-uuid",
    "from": "sender-api-key-id",
    "to": "recipient-api-key-id",
    "amount": 500,
    "createdAt": "2026-05-19T12:00:00.000Z"
  },
  "balance": 2500
}

// Respuesta 400 (fondos insuficientes)
{
  "error": "Insufficient balance",
  "balance": 200,
  "requested": 500
}
```

**GET /api/gamification/leaderboard?scope=weekly&limit=10**

```json
{
  "scope": "weekly",
  "period": "2026-W20",
  "entries": [
    {
      "rank": 1,
      "apiKeyId": "key-uuid",
      "displayName": "User***1234",
      "score": 15230,
      "level": 42,
      "title": "Expert"
    }
  ],
  "total": 847,
  "updatedAt": "2026-05-19T12:00:00.000Z"
}
```

---

## Herramientas MCP (8)

Registradas en `open-sse/mcp-server/` junto con las herramientas existentes. Limitadas al ámbito de permisos
`gamification`.

| Herramienta                | Descripción                                         | Esquema de entrada           |           |
| -------------------------- | --------------------------------------------------- | ---------------------------- | --------- |
| `gamification_leaderboard` | Obtener la clasificación de un ámbito/período       | `{ scope, period?, limit? }` |
| `gamification_rank`        | Obtener la posición del solicitante y sus vecinos   | `{ scope }`                  |
| `gamification_profile`     | Obtener resumen de XP, nivel, título y racha        | `{}`                         |
| `gamification_badges`      | Listar insignias obtenidas o todas las definiciones | `{ earned?: boolean }`       |
| `gamification_transfer`    | Enviar tokens a otro usuario                        | `{ to, amount }`             |
| `gamification_invite`      | Generar o listar códigos de invitación              | `{ action: "create"          | "list" }` |
| `gamification_servers`     | Listar o conectar servidores de la comunidad        | `{ action, token? }`         |
| `gamification_anomalies`   | Ver informes de anomalías (ámbito de administrador) | `{ limit?, since? }`         |

---

## Páginas del panel

### `/dashboard/leaderboard`

- Visualización del podio (los 3 primeros con avatares y XP).
- Selector de ámbito: Global / Semanal / Mensual / Tokens compartidos / Contribuciones.
- Tabla paginada (25 por página) con posición, nombre, puntuación, nivel y título.
- Actualizaciones en tiempo real mediante SSE: los cambios de posición se animan.
- El usuario actual aparece resaltado en la tabla con una fila fija que muestra "Tu posición".

### `/dashboard/profile`

- Barra de progreso de XP con el nivel actual y el umbral del siguiente nivel.
- La insignia del título se muestra de forma destacada.
- Galería de insignias: las insignias obtenidas incluyen la fecha de obtención y las no obtenidas aparecen atenuadas
  (las insignias ocultas muestran "???" hasta que se obtienen).
- Contador de racha con icono de llama; calendario de racha (últimos 30 días).
- Gráfico del historial de XP (XP diario durante los últimos 30 días).

### `/dashboard/tokens`

- Saldo de tokens (destacado en la parte superior de la página).
- Formulario de transferencia: destinatario, cantidad y diálogo de confirmación.
- Tabla del historial de transferencias con filtros (enviadas/recibidas/todas).
- Sección de invitaciones: códigos activos, generar uno nuevo y compartir enlace.
- Servidores de la comunidad: lista con estado de salud y opciones para conectar/desconectar.

### `/dashboard/gamification/admin`

- Lista de anomalías con gravedad, usuario, marca de tiempo y puntuación z.
- Visor del registro de auditoría con filtros (tipo de acción, usuario e intervalo de fechas).
- Estadísticas del sistema: XP total otorgado, usuarios activos y tasas de obtención de insignias.
- Vista general del estado de los servidores de federación.

---

## Integración con el pipeline

### Punto de integración

La gamificación se conecta al pipeline de solicitudes en un único punto de
`open-sse/handlers/chatCore.ts`:

```typescript
// Después de enviar la respuesta al cliente:
setImmediate(() => {
  emitGamificationEvent({
    type: "request.completed",
    apiKeyId,
    metadata: {
      provider: selectedProvider,
      model: selectedModel,
      comboId: resolvedCombo?.id,
      compressionUsed: compressionStats?.applied,
      skillUsed: skillExecution?.name,
    },
  }).catch(() => {
    // Ejecutar y olvidar: registrar, pero nunca propagar al cliente
  });
});
```

### Tipos de eventos

| Tipo de evento      | Cuándo se emite                                            |
| ------------------- | ---------------------------------------------------------- |
| `request.completed` | Se envió correctamente la respuesta del LLM                |
| `provider.switch`   | Cambió el proveedor (los fallbacks de combos cuentan)      |
| `combo.created`     | Se guardó una nueva configuración de combo                 |
| `combo.used`        | Se alcanzó correctamente el destino del combo              |
| `badge.earned`      | La evaluación de insignias encontró una coincidencia       |
| `streak.milestone`  | Se superó el umbral de la racha                            |
| `transfer.sent`     | Se completó la transferencia de tokens                     |
| `referral.redeemed` | Se canjeó correctamente el código de invitación            |
| `compression.used`  | Se aplicó la compresión del prompt                         |
| `skill.executed`    | Se completó la ejecución de la habilidad                   |
| `model.first_use`   | El modelo no se había utilizado durante los últimos 7 días |

### Garantía de no bloqueo

El patrón `setImmediate` + `.catch(() => {})` garantiza lo siguiente:

1. La respuesta se envía por completo antes de que se ejecute la gamificación.
2. Los errores de gamificación nunca llegan al cliente.
3. El procesamiento del evento se ejecuta en la siguiente microtarea, no en línea.

---

## Seguridad

### Modelo de amenazas

| Amenaza                               | Mitigación                                                                            |
| ------------------------------------- | ------------------------------------------------------------------------------------- |
| Inflación de puntuación               | Cálculo de XP solo en el servidor; los clientes envían acciones, no puntuaciones      |
| Ataques de repetición                 | Claves de idempotencia en transferencias; deduplicación del registro de auditoría     |
| Fraude en transferencias              | Libro mayor de partida doble; transacciones atómicas; límites de frecuencia           |
| Autorreferencia                       | Verificación cruzada de `api_key_id` durante el canje                                 |
| Manipulación de la clasificación      | Detección de anomalías mediante puntuación Z; panel de anomalías para administradores |
| Robo de tokens de federación          | Almacenamiento con hash SHA-256; el token sin procesar se muestra una sola vez        |
| Fuerza bruta de códigos de invitación | Límite de frecuencia en el endpoint de canje; entropía de 8 caracteres                |
| XSS en nombres para mostrar           | Nombres para mostrar saneados; entradas de la clasificación escapadas                 |
| Ataques de temporización en hashes    | `crypto.timingSafeEqual` para comparar hashes de tokens                               |

### Requisitos de autenticación

- **Público** (sin autenticación): `GET /leaderboard`, `GET /stream` (clasificaciones
  de solo lectura).
- **Clave de API obligatoria**: todas las operaciones de escritura, perfil, transferencias e invitaciones.
- **Solo administradores**: panel de anomalías y visor del registro de auditoría.
- **Federación**: ruta de autenticación independiente que utiliza el token sin procesar en el encabezado
  `Authorization`, validado mediante el hash SHA-256 almacenado.

---

## Pruebas

### Archivos de pruebas

Todas las pruebas utilizan el ejecutor de pruebas nativo de Node.js (`node --import tsx/esm --test`).

| Archivo de prueba                             | Cobertura                                                  | Pruebas |
| --------------------------------------------- | ---------------------------------------------------------- | ------- |
| `tests/unit/gamification/xp.test.ts`          | Cálculo de XP, curva de niveles, títulos                   | 8       |
| `tests/unit/gamification/badges.test.ts`      | Coincidencia de criterios e insignias otorgadas            | 10      |
| `tests/unit/gamification/streaks.test.ts`     | Lógica de rachas, hitos, casos límite                      | 7       |
| `tests/unit/gamification/leaderboard.test.ts` | Cálculo de posiciones, paginación, rotación                | 8       |
| `tests/unit/gamification/sharing.test.ts`     | Transferencias, saldo, idempotencia                        | 9       |
| `tests/unit/gamification/invites.test.ts`     | Creación, canje, caducidad, autorreferencia                | 7       |
| `tests/unit/gamification/antiCheat.test.ts`   | Límites de frecuencia, puntuación Z, registro de auditoría | 6       |
| `tests/unit/gamification/events.test.ts`      | Emisión de eventos, distribución, gestión de errores       | 5       |

### Ejecución de las pruebas

```bash
# Todas las pruebas de gamificación
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# Un solo archivo de prueba
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### Requisitos de cobertura

Según `CONTRIBUTING.md`, todos los módulos nuevos deben tener:

- Cobertura de ramas >= 80 %.
- Cada función pública probada al menos una vez.
- Rutas de error probadas (saldo insuficiente, códigos caducados, límites de frecuencia).

---

## Estructura de archivos

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # Las 8 tablas y sus índices
      gamification.ts                  # Módulo CRUD del dominio
    gamification/
      xp.ts                           # Cálculo de XP, curva de niveles y títulos
      badges.ts                       # Definiciones, criterios y evaluación de insignias
      streaks.ts                      # Seguimiento de rachas diarias
      leaderboard.ts                  # Cálculo de clasificación, SSE y rotación
      antiCheat.ts                    # Limitación de frecuencia, puntuación z y auditoría
      sharing.ts                      # Registro contable de transferencias de tokens
      invites.ts                      # Códigos de invitación/canje
      servers.ts                      # Federación de servidores comunitarios
      events.ts                       # Emisor de eventos (punto de integración)
      notifications.ts                # Flujo de notificaciones SSE
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST de la clasificación
        leaderboard/stream/route.ts   # Actualizaciones en tiempo real mediante SSE
        transfer/route.ts             # GET/POST de transferencias
        invite/route.ts               # GET/POST/DELETE de códigos de invitación
        invite/redeem/route.ts        # POST para canjear un código
        servers/route.ts              # GET/POST/DELETE de servidores
        federation/score/route.ts     # POST para enviar una puntuación
        federation/leaderboard/route.ts # GET para obtener la clasificación
        notifications/route.ts        # Notificaciones mediante SSE
        anomalies/route.ts            # GET de informes de anomalías
        rotate/route.ts               # POST para rotar secretos
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # Página de clasificación
        profile/page.tsx               # Página de XP, insignias y rachas
        tokens/page.tsx                # Página de saldo, transferencias e invitaciones
        gamification/admin/page.tsx    # Supervisión administrativa de anomalías
  shared/
    constants/
      gamification.ts                  # XP_REWARDS, TITLES, BADGE_DEFS, LIMITS

tests/
  unit/
    gamification/
      xp.test.ts
      badges.test.ts
      streaks.test.ts
      leaderboard.test.ts
      sharing.test.ts
      invites.test.ts
      antiCheat.test.ts
      events.test.ts

docs/
  frameworks/
    GAMIFICATION.md                    # Este documento
```

---

## Estrategia de migración

### Fase 1: Núcleo del backend (PR 1)

- Migración `060_create_gamification.sql` (8 tablas).
- `src/lib/db/gamification.ts` (módulo del dominio).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- Punto de integración en `chatCore.ts`.
- Pruebas unitarias para XP, rachas y eventos.

### Fase 2: Insignias y clasificación (PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- Definiciones de insignias en las constantes.
- Rutas de la API de clasificación y flujo SSE.
- Pruebas unitarias para insignias y clasificación.

### Fase 3: Uso compartido e invitaciones (PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- Rutas de la API de transferencias e invitaciones.
- Pruebas unitarias para uso compartido, invitaciones y prevención de trampas.

### Fase 4: Federación y panel de control (PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- Rutas de la API de federación.
- Páginas del panel de control (clasificación, perfil, tokens y administración).
- Registro de herramientas MCP.

---

## Consideraciones futuras

- **Eventos de temporada**: conjuntos de insignias por tiempo limitado y temporadas de clasificación.
- **Clasificaciones por equipos**: agrupar a los usuarios por organización o combo.
- **Multiplicadores de XP**: aumentar los XP durante los períodos promocionales.
- **Compartir logros**: generar tarjetas de insignias para compartir (imágenes OpenGraph).
- **Notificaciones push móviles**: notificaciones basadas en webhooks para eventos de insignias/niveles.
- **API de clasificación**: API pública para integraciones de terceros.
