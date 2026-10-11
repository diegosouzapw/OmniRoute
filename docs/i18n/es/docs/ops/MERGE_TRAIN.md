# Merge Queue & Manual Merge-Train Runbook (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Desde v3.8.49 (WS3.2/WS3.4 del plan de calidad/velocidad), la ruta de fusión predeterminada para
los PR revisados hacia `release/vX.Y.Z` es la **cola de fusión de Mergify** (`.mergify.yml`);
el **tren de fusiones manual** documentado a continuación es la ALTERNATIVA, utilizada durante incidentes,
congelaciones de versiones o si el plan Open Source de Mergify llegara a cambiar.

## Ruta predeterminada: la cola de Mergify

1. La PR es revisada/validada por las campañas y aprobada por la puerta ⭐ previa a la fusión
   del propietario (el informe + la decisión por elemento; consulta el Paso 0.75 de `/merge-prs`).
2. El propietario (o la sesión que actúa conforme a la decisión del propietario) aplica la
   etiqueta **`queue`**. La etiqueta ES la aprobación de la fusión; Mergify solo la ejecuta.
3. Mergify valida las PR en cola **en serie** (una a la vez) mediante las comprobaciones rápidas
   y las fusiona (squash). El procesamiento por lotes + la bisección automática requieren un nivel
   de pago de Mergify ("Cannot use Merge Queue batch" en el plan gratuito, #7220), por lo que
   `.mergify.yml` no establece ningún `batch_size`; el procesamiento por lotes sigue siendo tarea
   del tren de fusiones manual descrito a continuación. Una PR cuyas comprobaciones sigan pendientes
   después de `checks_timeout` (240 min = 2× el p95 medido de `quality.yml`) se retira de la cola
   en lugar de bloquearla.
4. Después de la fusión, el flujo de trabajo continuo de validación de la versión comprueba el
   nuevo extremo tras el push y abre una incidencia de atribución si la combinación ha introducido
   una regresión (nunca realiza una reversión automática).

Medidas de protección (reflejan las Reglas estrictas #21/#22 de `CLAUDE.md`):

- **Congelación de la versión activa** → NO etiquetes las PR dirigidas a la rama congelada;
  redirígelas primero a la rama `release/vX+1` activa.
- **PR en curso de otra sesión** → nunca la etiquetes; solo la sesión propietaria pone en cola
  su propio trabajo.
- Las diferencias que solo afectan a pruebas y las PR con la etiqueta `hotfix` ya ejecutan una
  CI reducida (consulta `RELEASE_CHECKLIST.md` → Vía rápida para hotfixes); las condiciones de
  la cola aceptan cualquier conjunto de comprobaciones que se haya ejecutado realmente
  (`#check-failure=0` + `#check-pending=0`).

## Alternativa: el tren de fusiones manual

Se utiliza cuando la cola no está disponible. Esto formaliza la práctica que procesó 33 PR
en un día durante el ciclo de v3.8.47:

1. **Prepara el lote** (~10–30 PR revisados y aprobados). Comprueba si hay colisiones `linked:`
   (mismos `tap.testFiles`, mismos fragmentos del CHANGELOG) y serialízalos.
2. **Valida UNA SOLA VEZ**: en un worktree aislado basado en el extremo de la rama de versión, fusiona localmente todas las
   cabeceras del lote y, después, ejecuta la suite equivalente a la de la versión
   (`npm run check:release-green`; añade `--with-build` antes de una versión).
   `scripts/release/merge-train.sh <base> <PR#>…` automatiza los pasos 1–2 (los PR con
   conflictos se expulsan y el tren continúa). El modo completo ejecuta `npm run test:unit`: el
   ejecutor ajustado para la máquina (`--test-concurrency=20`), **no** los dos shards secuenciales de CI
   de 4 núcleos, que hacían que la fase dominante utilizara aproximadamente el 25 % de una máquina de 16 núcleos (corregido
   el 2026-07-18). `--fast` (para procesar megatrenes durante el día, aprobado por el propietario el 2026-07-18)
   conserva todas las comprobaciones estáticas + vitest, pero solo ejecuta los archivos de node:test modificados por los
   PR incorporados; la suite COMPLETA debe seguir ejecutándose al menos una vez al día sobre el
   extremo acumulado (un tren sin `--fast`).
3. **Verde** → fusiona los PR en secuencia (volviendo a comprobar `state,headRefOid` antes de cada uno:
   un PR cuya cabecera haya cambiado vuelve a revisión). Demuestra que el diff neto de cada fusión corresponde al
   cambio propio del PR (sin reversiones por resolución automática: audita `git diff --stat` para detectar
   eliminaciones fuera de alcance).
4. **Rojo** → bisecciona el lote por mitades (valida cada mitad) en lugar de revalidar
   uno por uno; devuelve el PR infractor a la cola de revisión junto con las pruebas.
5. **Nunca**: fusiones durante una congelación en la rama congelada; `git stash` en ningún sitio;
   reejecuciones indiscriminadas de la CI con la esperanza de que desaparezca un rojo (regla: un rojo aporta información).

## Niveles (por qué la cola es segura solo con las comprobaciones rápidas)

- **Por PR** (comprobaciones rápidas de quality.yml): pruebas afectadas según TIA + unidad completa en 4 shards +
  vitest + conjunto de comprobaciones de lint + comprobación de tipos + integridad de documentación/CHANGELOG.
- **Por lote/extremo** (validación continua de versiones): comprobaciones OBLIGATORIAS `--quick` en cada push a
  la rama de versión; barridos completos con `--with-build --full-ci` 3 veces al día.
- **Por versión** (ci.yml en el PR de la versión): la matriz completa, incluidos E2E ×9,
  artefacto de paquete + prueba rápida de arranque del tarball, cobertura/umbrales progresivos.

No se valida nada menos que antes: la superficie pesada simplemente se ejecuta por lote/extremo
en lugar de por PR, lo que elimina los viajes de ida y vuelta O(N).

## Requisitos previos de un checkout nuevo para `merge-train.sh`

El script ejecuta una **comprobación previa** con fallo inmediato en el checkout raíz (antes de cualquier operación
con el worktree), de modo que una instalación defectuosa nunca pueda hacerse pasar por un tren en rojo:

1. Ejecuta `npm ci` y, después, el postinstall de `bun` que npm bloquea:
   `(cd node_modules/bun && node install.js)`; de lo contrario, `check:provider-consistency`
   y `check:known-symbols` (ambos `bun scripts/…`) fallan tanto en el tren COMO en la base
   sin ninguna línea de infracción.
2. No debe haber ningún `node_modules/node_modules` residual (un árbol de dependencias duplicado; React se carga dos veces
   y las suites de vitest de la interfaz fallan de inmediato).
3. `node_modules/.bin/tsc` debe estar presente y ser ejecutable (una instalación parcial no lo incluye).

El tren ejecuta el comando bloqueante `npm run check:cycles:ratchet`; `npm run check:cycles`
por sí solo es informativo (enumera los SCC y termina con un código distinto de cero incluso sobre una base correcta).
