# Merge Queue & Manual Merge-Train Runbook (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MERGE_TRAIN.md) · 🇪🇹 [am](../../../am/docs/ops/MERGE_TRAIN.md) · 🇸🇦 [ar](../../../ar/docs/ops/MERGE_TRAIN.md) · 🇦🇿 [az](../../../az/docs/ops/MERGE_TRAIN.md) · 🇧🇬 [bg](../../../bg/docs/ops/MERGE_TRAIN.md) · 🇧🇩 [bn](../../../bn/docs/ops/MERGE_TRAIN.md) · 🇧🇦 [bs](../../../bs/docs/ops/MERGE_TRAIN.md) · 🇨🇿 [cs](../../../cs/docs/ops/MERGE_TRAIN.md) · 🇩🇰 [da](../../../da/docs/ops/MERGE_TRAIN.md) · 🇩🇪 [de](../../../de/docs/ops/MERGE_TRAIN.md) · 🇬🇷 [el](../../../el/docs/ops/MERGE_TRAIN.md) · 🇪🇪 [et](../../../et/docs/ops/MERGE_TRAIN.md) · 🇮🇷 [fa](../../../fa/docs/ops/MERGE_TRAIN.md) · 🇫🇮 [fi](../../../fi/docs/ops/MERGE_TRAIN.md) · 🇫🇷 [fr](../../../fr/docs/ops/MERGE_TRAIN.md) · 🇮🇪 [ga](../../../ga/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [gu](../../../gu/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ha](../../../ha/docs/ops/MERGE_TRAIN.md) · 🇮🇱 [he](../../../he/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [hi](../../../hi/docs/ops/MERGE_TRAIN.md) · 🇭🇷 [hr](../../../hr/docs/ops/MERGE_TRAIN.md) · 🇭🇺 [hu](../../../hu/docs/ops/MERGE_TRAIN.md) · 🇦🇲 [hy](../../../hy/docs/ops/MERGE_TRAIN.md) · 🇮🇩 [id](../../../id/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [ig](../../../ig/docs/ops/MERGE_TRAIN.md) · 🇮🇹 [it](../../../it/docs/ops/MERGE_TRAIN.md) · 🇯🇵 [ja](../../../ja/docs/ops/MERGE_TRAIN.md) · 🇬🇪 [ka](../../../ka/docs/ops/MERGE_TRAIN.md) · 🇰🇭 [km](../../../km/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [kn](../../../kn/docs/ops/MERGE_TRAIN.md) · 🇰🇷 [ko](../../../ko/docs/ops/MERGE_TRAIN.md) · 🇱🇹 [lt](../../../lt/docs/ops/MERGE_TRAIN.md) · 🇱🇻 [lv](../../../lv/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ml](../../../ml/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [mr](../../../mr/docs/ops/MERGE_TRAIN.md) · 🇲🇾 [ms](../../../ms/docs/ops/MERGE_TRAIN.md) · 🇲🇹 [mt](../../../mt/docs/ops/MERGE_TRAIN.md) · 🇲🇲 [my](../../../my/docs/ops/MERGE_TRAIN.md) · 🇳🇵 [ne](../../../ne/docs/ops/MERGE_TRAIN.md) · 🇳🇱 [nl](../../../nl/docs/ops/MERGE_TRAIN.md) · 🇳🇴 [no](../../../no/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [or](../../../or/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [pa](../../../pa/docs/ops/MERGE_TRAIN.md) · 🇵🇭 [phi](../../../phi/docs/ops/MERGE_TRAIN.md) · 🇵🇱 [pl](../../../pl/docs/ops/MERGE_TRAIN.md) · 🇵🇹 [pt](../../../pt/docs/ops/MERGE_TRAIN.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MERGE_TRAIN.md) · 🇷🇴 [ro](../../../ro/docs/ops/MERGE_TRAIN.md) · 🇷🇺 [ru](../../../ru/docs/ops/MERGE_TRAIN.md) · 🇱🇰 [si](../../../si/docs/ops/MERGE_TRAIN.md) · 🇸🇰 [sk](../../../sk/docs/ops/MERGE_TRAIN.md) · 🇸🇮 [sl](../../../sl/docs/ops/MERGE_TRAIN.md) · 🇷🇸 [sr](../../../sr/docs/ops/MERGE_TRAIN.md) · 🇸🇪 [sv](../../../sv/docs/ops/MERGE_TRAIN.md) · 🇰🇪 [sw](../../../sw/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [ta](../../../ta/docs/ops/MERGE_TRAIN.md) · 🇮🇳 [te](../../../te/docs/ops/MERGE_TRAIN.md) · 🇹🇭 [th](../../../th/docs/ops/MERGE_TRAIN.md) · 🇹🇷 [tr](../../../tr/docs/ops/MERGE_TRAIN.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MERGE_TRAIN.md) · 🇵🇰 [ur](../../../ur/docs/ops/MERGE_TRAIN.md) · 🇺🇿 [uz](../../../uz/docs/ops/MERGE_TRAIN.md) · 🇻🇳 [vi](../../../vi/docs/ops/MERGE_TRAIN.md) · 🇳🇬 [yo](../../../yo/docs/ops/MERGE_TRAIN.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MERGE_TRAIN.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MERGE_TRAIN.md)

---

Desde v3.8.49 (WS3.2/WS3.4 del plan de calidad/velocidad), la ruta de fusión predeterminada para
los PR revisados en `release/vX.Y.Z` es la **cola de fusión de Mergify** (`.mergify.yml`);
el **tren de fusiones manual** documentado a continuación es la ALTERNATIVA: se utiliza durante incidentes,
congelaciones de versiones o si el plan Open Source de Mergify cambia alguna vez.

## Ruta predeterminada: la cola de Mergify

1. El PR es revisado/validado por las campañas y aprobado por la puerta ⭐ previa a la
   fusión del propietario (el informe + la decisión por elemento; consulta el paso 0.75 de `/merge-prs`).
2. El propietario (o la sesión que actúa según la decisión del propietario) aplica la etiqueta **`queue`**.
   La etiqueta ES la aprobación de la fusión; Mergify solo la ejecuta.
3. Mergify agrupa hasta 10 PR en cola, valida el lote con las comprobaciones rápidas
   y los fusiona (squash). Un lote en rojo se **divide automáticamente**: el PR infractor
   se aísla en ~log2(N) revalidaciones y se retira de la cola; el resto continúa.
4. Después de la fusión, el flujo de trabajo continuo de validación de la versión valida el nuevo extremo al hacer push
   y abre una incidencia de atribución si la combinación ha provocado una regresión (nunca revierte automáticamente).

Medidas de protección (reflejan las reglas estrictas n.º 21/n.º 22 de `CLAUDE.md`):

- **Congelación de versión activa** → NO etiquetes PR dirigidos a la rama congelada; redirígelos primero a
  la rama `release/vX+1` activa.
- **PR en curso de otra sesión** → nunca lo etiquetes; únicamente la sesión propietaria pone en cola
  su propio trabajo.
- Los diffs exclusivamente de pruebas y los PR con la etiqueta `hotfix` ya ejecutan una CI reducida (consulta
  `RELEASE_CHECKLIST.md` → Vía rápida para hotfixes); las condiciones de la cola aceptan cualquier
  conjunto de comprobaciones que se haya ejecutado realmente (`#check-failure=0` + `#check-pending=0`).

## Alternativa: el tren de fusiones manual

Se utiliza cuando la cola no está disponible. Esto formaliza la práctica que procesó 33 PR
en un día durante el ciclo v3.8.47:

1. **Prepara el lote** (~10–30 PR revisados+aprobados). Comprueba las colisiones de `linked:`
   (mismos `tap.testFiles`, mismos fragmentos de CHANGELOG) y serialízalas.
2. **Valida UNA SOLA VEZ**: en un worktree aislado a partir del extremo de la rama de versión, fusiona localmente todas las
   cabeceras del lote y, a continuación, ejecuta la suite equivalente a la de versión
   (`npm run check:release-green`; añade `--with-build` antes de una versión).
   `scripts/release/merge-train.sh <base> <PR#>…` automatiza los pasos 1–2 (los PR
   con conflictos se expulsan y el tren continúa). El modo completo ejecuta `npm run test:unit`: el
   ejecutor ajustado para la máquina (`--test-concurrency=20`), **no** los dos shards secuenciales de CI
   de 4 núcleos, que hacían que la fase dominante utilizara solo ~25 % de una máquina de 16 núcleos (corregido el
   2026-07-18). `--fast` (procesamiento de megatrenes durante el día, aprobado por el propietario el 2026-07-18)
   mantiene todas las comprobaciones estáticas + vitest, pero ejecuta únicamente los archivos de node:test modificados por los
   PR incorporados; la suite COMPLETA debe seguir ejecutándose al menos una vez al día sobre el
   extremo acumulado (un tren sin `--fast`).
3. **Verde** → fusiona los PR en secuencia (volviendo a comprobar `state,headRefOid` antes de cada uno;
   un PR cuya cabecera haya cambiado vuelve a revisión). Demuestra que el diff neto de cada fusión es el
   cambio propio del PR (sin reversiones por resolución automática: audita `git diff --stat` para detectar
   eliminaciones fuera del alcance).
4. **Rojo** → divide el lote en mitades (valida cada mitad) en lugar de volver a validar
   uno por uno; devuelve el PR infractor a la cola de revisión junto con las pruebas.
5. **Nunca**: fusiones durante una congelación en la rama congelada; uses `git stash` en ningún lugar;
   vuelvas a ejecutar la CI de forma indiscriminada esperando que un rojo desaparezca (regla: un rojo aporta información).

## Niveles (por qué la cola es segura solo con comprobaciones rápidas)

- **Por PR** (comprobaciones rápidas de quality.yml): pruebas afectadas por TIA + unidad completa en 4 shards +
  vitest + conjunto de lint + comprobación de tipos + integridad de documentación/changelog.
- **Por lote/extremo** (validación continua de la versión): comprobaciones ESTRICTAS `--quick` en cada push a
  la rama de versión; barridos completos `--with-build --full-ci` 3 veces/día.
- **Por versión** (ci.yml en el PR de la versión): la matriz completa, incluidos E2E ×9,
  artefacto de paquete + prueba rápida de arranque del tarball, cobertura/umbrales progresivos.

Nada se valida menos que antes: la parte pesada simplemente se ejecuta por lote/extremo
en lugar de por PR, que es lo que elimina los recorridos de ida y vuelta O(N).
