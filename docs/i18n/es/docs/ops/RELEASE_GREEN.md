# Release-Green: keeping the queue and release branch green (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_GREEN.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_GREEN.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_GREEN.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_GREEN.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_GREEN.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_GREEN.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_GREEN.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_GREEN.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_GREEN.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_GREEN.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_GREEN.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_GREEN.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_GREEN.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_GREEN.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_GREEN.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_GREEN.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_GREEN.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_GREEN.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_GREEN.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_GREEN.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_GREEN.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_GREEN.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_GREEN.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_GREEN.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_GREEN.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_GREEN.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_GREEN.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_GREEN.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_GREEN.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_GREEN.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_GREEN.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_GREEN.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_GREEN.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_GREEN.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_GREEN.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_GREEN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_GREEN.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_GREEN.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_GREEN.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_GREEN.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_GREEN.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_GREEN.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_GREEN.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_GREEN.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_GREEN.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_GREEN.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_GREEN.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_GREEN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_GREEN.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_GREEN.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_GREEN.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_GREEN.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_GREEN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_GREEN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_GREEN.md)

---

## El problema que esto resuelve

La **validación completa** (`.github/workflows/ci.yml` — particiones de pruebas unitarias, vitest, ratchets,
`package-artifact`, SonarQube, E2E) se ejecuta **únicamente en el PR de release** (PR → `main`). Los PR dirigidos a
`release/**` reciben las **validaciones rápidas** (`quality.yml`: pruebas afectadas según TIA + comprobación de tipos + lint)
y, para cambios de código, una compilación de producción **informativa**. Consecuencia: los errores que solo aparecen en el release pueden seguir
acumulándose silenciosamente en la rama de release y **explotar en capas de ~40 min** en el momento del release,
uno por uno.

La «familia release-green» existe para **anticipar** esos errores: validar el equivalente de la validación completa
**localmente / fuera del release**, en cualquier momento, para que el PR de release ya esté
en verde en su primera ejecución de CI.

> **Principio no negociable:** nada de esto bloquea al colaborador. No añadimos una comprobación obligatoria
> que haga fallar su PR. El **drift** (ratchets) corresponde al mantenedor, que debe reajustar la línea base en el release;
> nunca es responsabilidad del colaborador. Ninguna pieza **cierra** un PR (apropiación del mérito) ni
> **debilita** una prueba para que pase.

## La familia (4 piezas) y cómo se ejecuta cada una de forma independiente

| Pieza                                                                      | Qué es                                                                                     | Cuándo ejecutarla                                                                        | Alcance                               |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------- | ------------------------------------- |
| **`/green-prs`** (Solución A)                                              | Análisis bajo demanda por parte del mantenedor de la **cola de PR abiertos**               | **De forma independiente y periódica**, y especialmente **antes** de `/generate-release` | Toda la cola de PR → `release/**`     |
| **`/validate-release-green`** (Solución C — `npm run check:release-green`) | Motor de validación: reproduce la validación completa en una rama O un candidato de fusión | De forma independiente, en cualquier momento                                             | Una rama específica o un PR de fusión |
| **`/babysit <PR#>`**                                                       | Lleva la **CI en vivo** de **un** PR hasta dejarla en verde                                | De forma independiente, por PR                                                           | Un único PR                           |
| **`nightly-release-green.yml`** (Solución D)                               | Flujo de trabajo nocturno automatizado; abre un issue ante un error HARD                   | Automáticamente (cron)                                                                   | La rama de release activa             |

**Respuesta breve a «¿esto es solo para releases?»:** **no.** `/green-prs` fue diseñado para
ejecutarse **periódicamente, entre releases**. Ejecutarlo de forma independiente es el uso normal; el release es simplemente
el momento en el que ejecutarlo aporta más valor.

## Compilación de asesoramiento de PR a versión

`quality.yml` ahora incluye `Build (advisory)` para las PR de código que no sean borradores y para las ramas de cola de Mergify.
Replica la receta de compilación de producción de `ci.yml`: Node 24, `npm-ci-retry`,
`check:node-runtime` y `npm run build` con `OMNIROUTE_USE_TURBOPACK=1`. Intencionadamente,
no carga ningún artefacto de compilación porque ningún trabajo de calidad posterior consume uno en este flujo de trabajo.
Elimine `continue-on-error` después de una semana de ejecuciones estables de PR de versión para que la señal se convierta en una
puerta bloqueante de PR a versión.

## Solución C — `npm run check:release-green` (el motor)

Reproduce una validación equivalente a la de una versión sobre el árbol de trabajo actual y clasifica cada fallo:

- **HARD** (comprobación de tipos, errores de lint, pruebas unitarias, vitest, db-rules, public-creds, `package-artifact`
  opcional) → **defecto real**; `exit 1`. Se corrige en la rama de origen (TDD, Regla n.º 18).
- **DRIFT** (**advertencias** de eslint, complejidad cognitiva, tamaño de archivos) → desviación del umbral acumulada durante
  el ciclo, **no es culpa del colaborador**; solo se informa y **el responsable de mantenimiento actualiza
  su línea base durante la publicación**. La desviación **nunca** cambia el código de salida, por lo que nunca bloquea a nadie.

```bash
npm run check:release-green                 # rama actual (árbol de trabajo)
node scripts/quality/validate-release-green.mjs --json   # salida estructurada
node scripts/quality/validate-release-green.mjs --quick  # omite pruebas unitarias+vitest (solo desviación+comprobación de tipos+lint)
node scripts/quality/validate-release-green.mjs --with-build  # incluye package-artifact (lento)
```

Solo diagnostica y **notifica** (sin corrección automática). La orquestación para corregir hasta alcanzar un estado correcto reside en
`/green-prs` y `/review-prs`.

## Solución A — `/green-prs` (el análisis de la cola)

Procedimiento (resumen — consulte la capacidad `green-prs` para obtener más información):

1. **Inventariar** la cola de PR abiertas con respecto a la rama de versión activa.
2. **Clasificar** cada PR (viable / debe rechazarse / requiere intervención del autor): las que deben rechazarse o requieren al autor se
   **notifican, no se cierran** (el autor decide).
3. Para cada PR viable, en un **árbol de trabajo aislado** (Regla n.º 19), lleve la PR hasta la punta de la rama de versión y ejecute
   `npm run check:release-green`:
   - **HARD** → corregir **en la rama del colaborador** mediante coautoría (preserva el estado «Fusionada» del autor),
     volver a ejecutar hasta que se hayan resuelto todos los errores HARD.
   - **DRIFT** → dejarla; su línea base se actualizará durante la publicación.
4. **Generar** una tabla PR × (veredicto, errores HARD, ¿corregida?, DRIFT, ¿release-green ahora?).

Puede **preparar** la cola sin fusionar; solo fusiona cuando se solicita explícitamente y nunca cierra una PR.

## Cadencia recomendada

- Ejecute **`/green-prs` periódicamente** (por ejemplo, cada semana) y **siempre antes de
  `/generate-release`**.
- Mantenga **`nightly-release-green.yml`** (Solución D) como señal continua: cuando abra una
  incidencia por un error HARD, será el momento de realizar un análisis.
- Utilice **`/validate-release-green`** puntualmente para comprobar una rama o un candidato específico para fusión.
- Utilice **`/babysit <PR#>`** cuando sea necesario llevar una PR específica a un estado correcto en la CI activa.

## Relación con la publicación

- `/generate-release` invoca la validación en la **Fase 0 (comprobaciones previas)**: actualiza la línea base de DRIFT y corrige
  los errores HARD antes de abrir la PR de versión.
- `/review-prs` utiliza la puerta release-green en el paso de decisión de fusión (estado correcto antes de fusionar).

El objetivo de todas las piezas es el mismo: **una PR de versión correcta en la primera ejecución de CI**, en lugar de ir sorteando
errores en tandas de 40 minutos el día de la publicación.
