# Release Checklist (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Última actualización:** 2026-08-28 — v3.8.51
> Flujo de lanzamiento optimizado que aprovecha las habilidades de Claude Code para la automatización.
>
> **Mantén la cola/rama en verde entre lanzamientos:** consulta [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (familia `/green-prs` + `npm run check:release-green` + `/babysit` + ejecución nocturna). Ejecutar
> esto periódicamente —y especialmente **antes** de esta lista de comprobación— hace que el PR de lanzamiento comience en verde.

## Resumen

```bash
# 1. Incrementar la versión + generar el CHANGELOG (habilidad)
/version-bump-cc patch    # o minor/major

# 2. Ejecutar el control de calidad localmente
npm run check              # lint + pruebas
npm run test:coverage      # control de cobertura completo (60/60/60/60)

# 3. Compilar y realizar una prueba de humo
npm run build
npm run test:e2e           # opcional, pero recomendado

# 4. Generar el lanzamiento (habilidad)
/generate-release-cc

# 5. Desplegar (habilidad)
/deploy-vps-both-cc        # o akamai-cc / local-cc

# 6. Capturar evidencias del lanzamiento (habilidad)
/capture-release-evidences-cc
```

## Publicación de confianza de npm (predeterminada desde v3.8.51) — por etapas bajo petición, directa como alternativa

`npm-publish.yml` publica mediante **npm Trusted Publishing (OIDC)** de forma predeterminada: el
trabajo `stage-npm` (alojado en GitHub) intercambia el id-token de GitHub por una credencial de npm
de corta duración para esa ejecución, sin ningún token de npm de larga duración en los secretos del repositorio,
sin solicitud de 2FA y con la procedencia adjunta.
Esta es la alternativa que npm permite ahora que se están retirando los tokens que omiten el 2FA;
restaura el flujo completamente automático que el proyecto tuvo hasta v3.8.48, al tiempo que mantiene la
garantía WS1.3 (un token filtrado no puede publicar por sí solo, porque no existe ningún token).

**Configuración inicial única (propietario):** npmjs.com → paquete `omniroute` → Settings → _Trusted
Publisher_ → GitHub: propietario `diegosouzapw`, repositorio `OmniRoute`, flujo de trabajo `npm-publish.yml`
(entorno: ninguno). Hasta que exista esa configuración, el paso automático falla con `ENEEDAUTH`:
vuelve a iniciarlo con `publish_mode=staged` (abajo) o `direct`.

### Publicación por etapas (bajo petición — `publish_mode=staged`)

El flujo de trabajo npm-publish ya no publica directamente: inicia el tarball empaquetado
(`check:pack-boot`) y después ejecuta `npm stage publish`; los bytes exactos quedan almacenados en
el registro, **sin posibilidad de instalación** hasta que el propietario los apruebe. La intervención
humana con 2FA se trasladó a DESPUÉS de la verificación, no antes.

**Flujo del propietario después de que el flujo de trabajo quede en verde:**

1. `npm stage list omniroute` — busca el id de la etapa (también aparece en el resumen del flujo de trabajo).
2. Verifica los bytes almacenados (recomendado): `npm stage download <id>` y, después, instala el
   tarball descargado en un prefijo temporal e inícialo (`npm run check:pack-boot` automatiza
   en CI el mismo veredicto de empaquetar→instalar→iniciar).
3. `npm stage approve <id>` — la solicitud de 2FA ES la publicación. `npm stage reject <id>` descarta la etapa.
4. Red de seguridad posterior a la publicación: el verificador posterior a la publicación (WS1.4 del plan de v3.8.49) instala la
   versión publicada desde el registro público en un contenedor limpio y la inicia.

**Alternativa de emergencia:** `workflow_dispatch` con `publish_mode=direct` restaura el
`npm publish` inmediato heredado (úsalo solo si la publicación por etapas presenta problemas; documenta el motivo).

**Refuerzo inicial único (propietario, npmjs.com):** configura Trusted Publisher para
`omniroute` en modo exclusivo por etapas, de modo que un token de larga duración filtrado no pueda ejecutar `npm publish`
directamente desde ninguna parte: CI solo puede preparar la etapa; únicamente el 2FA del propietario realiza el lanzamiento.

**Procedimiento para artefactos defectuosos (sin cambios):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
como reacción predeterminada (se completa en minutos y es reversible); usa `npm unpublish` solo dentro del plazo de 72 horas/sin dependientes
y nunca como primera medida. Docker: nunca sobrescribas una etiqueta de versión; la reversión consiste en
redirigir `latest` al último digest válido.

**`latest` de Docker Hub (obligatorio en cada publicación SemVer estable):** el
flujo de trabajo `docker-publish` debe etiquetar **tanto** `X.Y.Z` como, cuando
`should-promote-latest.sh` determine que esta es la SemVer estable más alta, `:latest`
con el **mismo digest**. Después del trabajo: el digest `latest` de Hub debe coincidir con el nuevo
digest SemVer y `last_updated` debe haberse actualizado. No dejes `:latest` apuntando a una
compilación anterior mientras las notas de la versión describen correcciones que solo existen en git. Los inicios rápidos de Compose
usan `:latest`; GitOps debe seguir fijando `X.Y.Z`. Consulta
[Canales de lanzamiento de Docker](../guides/DOCKER_GUIDE.md#release-channels) y #10317.

## Vía rápida de hotfix (etiqueta `hotfix`)

Un PR con la etiqueta `hotfix` omite la matriz pesada de CI (E2E con 9 particiones, control progresivo de cobertura,
quality-gate, quality-extended) y mantiene las comprobaciones rápidas y de alta señal: compilación,
particiones de pruebas unitarias, integración, vitest, lint/comprobación de tipos, sincronización de documentación, `check:pack-artifact`
y la prueba rápida de arranque del tarball (`check:pack-boot`). Objetivo: todo en verde en ≤15min en lugar de ~33min.

**Política de acceso — se requieren las cuatro condiciones (basada en las vías de emergencia de Chromium/VS Code/Node):**

1. **Gravedad**: producción no funciona — un artefacto publicado falla al arrancar / una
   corrección de seguridad / todos los usuarios de la versión están afectados. «Importante» no significa «no funciona».
2. **Autoridad**: solo el propietario del repositorio aplica la etiqueta `hotfix`. La etiqueta ES
   la aprobación — nunca debe aplicarse por cuenta propia en un PR de campaña.
3. **Evidencia**: el cuerpo del PR enlaza la ejecución pesada anterior completamente en verde (la suite que
   volverían a validar los trabajos omitidos), además de la prueba propia de la corrección, primero fallida y después satisfactoria.
4. **Alcance**: solo cherry-pick — la corrección mínima, sin refactorizaciones ni cambios adicionales.

La superficie de cobertura/control progresivo omitida vuelve a validarse en la siguiente ejecución completa de la
rama de versión (versión continuamente en verde): la vía omite la ESPERA, nunca la validación.
Los diffs que solo contienen pruebas (todos los archivos bajo `tests/`, ninguno bajo `tests/e2e/`) omiten la matriz
E2E automáticamente, sin ninguna etiqueta.

## Lista de verificación detallada

### Antes del lanzamiento

- [ ] Todas las PR destinadas a esta versión están fusionadas en `release/vX.Y.0`
- [ ] Todos los elementos abiertos de Linear/incidencias para esta versión están cerrados o trasladados al siguiente hito
- [ ] La CI está en verde en la rama `release/vX.Y.0`
- [ ] No hay marcadores `TODO(release)` en el código: `grep -r "TODO(release)" src/ open-sse/`
- [ ] La imagen base de Docker está actualizada (actualmente `node:24.15.0-trixie-slim`)

### Versión y registro de cambios

- [ ] Ejecutar `/version-bump-cc <patch|minor|major>` (habilidad de Claude Code)
  - Incrementa la versión en `package.json`, `electron/package.json`
  - Regenera `CHANGELOG.md` a partir de los commits de git desde la última etiqueta
  - Actualiza las insignias de README.md
- [ ] Revisar manualmente CHANGELOG.md y corregir los mensajes de commit si es necesario
- [ ] Asegurarse de que la sección semver más reciente de `CHANGELOG.md` coincida con la versión de `package.json`
- [ ] Mantener `## [Unreleased]` como la primera sección del registro de cambios para el trabajo futuro
- [ ] Actualizar `docs/openapi.yaml` → `info.version` debe coincidir con la versión de `package.json`

### Calidad del código

- [ ] `npm run lint` — 0 errores (las advertencias ya existían)
- [ ] `npm run typecheck:core` — sin errores
- [ ] `npm run typecheck:noimplicit:core` — sin errores (estricto)
- [ ] `npm run check:cycles:ratchet` — dentro del límite máximo fijado de `metrics.cycles` (`check:cycles` sin opciones finaliza con código 1 ante cualquier ciclo, #15281)
- [ ] `npm run check:any-budget:t11` — dentro del presupuesto
- [ ] `npm run check:route-validation:t06` — sin errores
- [ ] `npm run check:node-runtime` — se cumple la versión mínima del entorno de ejecución compatible (`>=22.22.2 <23`, `>=24.0.0 <27`, según `SUPPORTED_NODE_RANGE` en `src/shared/utils/nodeRuntimeSupport.ts`; alineado con `engines` de `package.json`)

### Pruebas

- [ ] `npm run test:unit` — superada
- [ ] `npm run test:vitest` — superada (servidor MCP, autoCombo, caché)
- [ ] `npm run test:coverage` — se satisface el umbral 60/60/60/60 (sentencias/líneas/funciones/ramas)
- [ ] `npm run test:integration` — superada (si los cambios afectan a la BD o a los controladores)
- [ ] `npm run test:combo:matrix` — superada (matriz de estrategias combinadas: demuestra de forma determinista las decisiones de selección de las 21 estrategias públicas de enrutamiento; ejecutar al modificar el enrutamiento combinado, la resolución de estrategias o la lógica de respaldo)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **opcional/manual** (prueba de humo restringida contra servicios ascendentes reales; obtiene una instantánea de BD de solo lectura del VPS `root@192.168.0.15`; utiliza proveedores reales y consume créditos; nunca se ejecuta en la CI; se omite correctamente sin la habilitación)
- [ ] `npm run test:combo:live:vps` — **opcional/manual** (prueba de humo en vivo de la fase 3 en el VPS: 7 escenarios HTTP contra el servidor `.15` activo mediante Node ESM sin dependencias adicionales; requiere `ssh root@192.168.0.15`; crea/elimina únicamente combinaciones `__live_test__*`; utiliza proveedores reales; nunca se ejecuta en la CI)
- [ ] `npm run test:e2e` — superada (cambios en la IU)
- [ ] `npm run test:protocols:e2e` — superada (cambios en MCP/A2A)
- [ ] `npm run test:ecosystem` — superada

### Hooks (validados por Husky)

Los hooks de Husky se encuentran en `.husky/` y se ejecutan automáticamente durante las operaciones de git.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** controles rápidos y deterministas — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (activado el 2026-06-13). Excluye intencionadamente `test:unit` (lento; cubierto por el trabajo `test-unit` de la CI).
  - Ejecutar `npm run test:unit` manualmente antes de enviar ramas de lanzamiento.

Si un hook falla: corregir el problema subyacente; no omitirlo con `--no-verify`.

### Commits convencionales

Todos los commits destinados al lanzamiento deben seguir el formato `type(scope): subject`.

**Tipos válidos:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Ámbitos válidos:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Cambios incompatibles: añadir el pie `BREAKING CHANGE:` o `!` después del ámbito (p. ej., `feat(api)!: drop /v0`).

### Documentación

- [ ] `npm run check:docs-sync` se ejecuta correctamente (ejecutado automáticamente por pre-commit)
- [ ] `npm run check:docs-all` se ejecuta correctamente (comando general: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` finaliza con código 0 — el contrato de variables de entorno entre el código ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` permanece intacto
- [ ] `npm run check:doc-links` finaliza con código 0 — no hay referencias markdown internas rotas tras la reestructuración
- [ ] Se ha revisado `docs/architecture/ARCHITECTURE.md` para detectar divergencias en el almacenamiento o el entorno de ejecución
- [ ] Se ha revisado `docs/guides/TROUBLESHOOTING.md` para detectar divergencias en las variables de entorno y el funcionamiento
- [ ] Si `.env.example` ha cambiado: se ha actualizado `docs/reference/ENVIRONMENT.md`
- [ ] Si una funcionalidad nueva tiene IU: `docs/guides/USER_GUIDE.md` la menciona
- [ ] Si una funcionalidad nueva tiene API: se han actualizado `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml`
- [ ] Si una funcionalidad nueva es un módulo: existe un archivo específico `docs/<MODULE>.md`
- [ ] Si hay un cambio incompatible: `docs/guides/TROUBLESHOOTING.md` contiene una nota de migración

### i18n

- [ ] `npm run i18n:check` finaliza con código 0 — el estado de las traducciones (`.i18n-state.json`) está sincronizado con los documentos fuente (no hay fuentes divergentes en modo estricto; el aviso del modo de advertencia es aceptable para retoques de última hora en la documentación, pero el resultado debe ser 0 antes de etiquetar)
- [ ] `npm run i18n:check-ui-coverage` finaliza con código 0 — cada configuración regional de la IU alcanza o supera el umbral mínimo de cobertura del 80 %
- [ ] `npm run i18n:sync-ui:dry` informa de 0 claves ausentes en las 66 configuraciones regionales de destino (todas excepto la fuente `en`)
- [ ] Si han cambiado los documentos fuente en inglés, ejecutar `npm run i18n:run` (requiere `OMNIROUTE_TRANSLATION_API_KEY` en `.env`) antes de etiquetar
- [ ] Las contribuciones de traducción pueden aplazarse hasta la próxima versión si son menores (registrarlas en CHANGELOG)

### Migraciones de la base de datos

- [ ] Si `src/lib/db/migrations/` contiene archivos nuevos:
  - [ ] Cada migración es idempotente (`CREATE TABLE IF NOT EXISTS`, etc.)
  - [ ] Las migraciones están envueltas en transacciones
  - [ ] Están numeradas correctamente (sin huecos en la secuencia)
- [ ] Probar en una instalación nueva: eliminar `~/.omniroute/omniroute.db` y ejecutar `npm run dev`
- [ ] Probar en una instalación existente: hacer una copia de seguridad de la BD, ejecutar la migración y verificar el esquema
- [ ] Los archivos WAL (`-wal`, `-shm`) se gestionan correctamente si la migración vuelve a escribir tablas

### Catálogo de proveedores (validado con Zod)

- [ ] El esquema Zod de `src/shared/constants/providers.ts` es válido en el momento de la carga
  - [ ] Todos los proveedores tienen los campos obligatorios (`id`, `label`, `kind`, etc.)
  - [ ] Se proporciona `freeNote` para los nuevos proveedores gratuitos
  - [ ] Los proveedores OAuth tienen `oauthConfig` registrado en `src/lib/oauth/constants/oauth.ts`
- [ ] Si se añadió un nuevo proveedor: existe el ejecutor correspondiente en `open-sse/executors/`
- [ ] Si el formato no es OpenAI: existe un traductor en `open-sse/translator/`
- [ ] Los modelos están registrados en `open-sse/config/providerRegistry.ts`
- [ ] Las pruebas unitarias de `tests/unit/` cubren la clasificación y el enrutamiento de proveedores

### Escritorio (Electron)

Si se modificó `electron/`:

- [ ] `npm run electron:smoke:packaged` se ejecuta correctamente
- [ ] Las compilaciones se probaron para al menos uno de `:win`, `:mac`, `:linux`
- [ ] Los certificados de firma de código no han caducado (si se usa firma)
- [ ] La versión de `electron/package.json` coincide con la de `package.json` en la raíz
- [ ] El puntero del canal de actualización automática está actualizado si se publica en `stable`

### Estructura de compilación

El repositorio utiliza tres directorios de salida distintos; nunca deben confundirse:

| Directorio | Propósito                                                               | ¿Rastreado?           |
| ---------- | ----------------------------------------------------------------------- | --------------------- |
| `src/`     | Código fuente de la aplicación (TypeScript / TSX)                       | Sí                    |
| `.build/`  | Archivos intermedios de compilación: salida de `next build` (`distDir`) | No (ignorado por git) |
| `dist/`    | Paquete npm distribuible, ensamblado por `assembleStandalone`           | No (ignorado por git) |

> **Nota para operadores:** el directorio de imágenes del VPS remoto sigue siendo `/usr/lib/node_modules/omniroute/app/`.
> Solo cambió la salida de compilación **dentro del repositorio** (`app/` → `dist/`). Las habilidades de despliegue sincronizan mediante rsync
> el contenido de `dist/` con el directorio remoto `app/`; no es necesario cambiar ninguna ruta del VPS.

**Flujo de compilación única:**

```
npm run build:release
  └─ rm -rf .build dist          (limpieza)
  └─ next build → .build/next/   (archivos intermedios)
  └─ assembleStandalone          (copia standalone + static + public + archivos nativos → dist/)
  └─ escribe dist/BUILD_SHA      (centinela de HEAD)
```

NO ejecute `npm run build` seguido de un `npm run build:cli` independiente para el despliegue; use
`npm run build:release`, que realiza una recompilación limpia y crea el centinela con un solo comando.

### Validación de artefactos

- [ ] `npm run build:release` se ejecuta correctamente y `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` no presenta problemas: no hay `app.__qa_backup`, `scripts/scratch`, `package-lock.json` ni otros residuos locales
- [ ] `dist/server.js` existe después de la compilación
- [ ] Prueba de humo local opcional del entorno empaquetado: `npm run dev:candidate -- validate`, después de `npm run dev:candidate -- build`, inicia el archivo tar empaquetado con un `DATA_DIR` aislado y comprueba `/api/health` + `/v1/models` (consulte [Ruta recomendada de contribución](CONTRIBUTION_GOLDEN_PATH.md#local-candidate-loop))

### Etiquetado y publicación

- [ ] Ejecute `/generate-release-cc` (habilidad de Claude Code):
  - Crea la etiqueta `vX.Y.Z`
  - Envía la etiqueta y la rama
  - Abre una publicación de GitHub con el registro de cambios en el cuerpo
  - Adjunta los instaladores de Electron (si se compilaron)
- [ ] O manualmente:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Despliegue

Las habilidades de despliegue utilizan el flujo ligero de rsync, sin `npm pack` ni `npm i -g`:

- [ ] Use la habilidad de despliegue que corresponda al destino:
  - `/deploy-vps-local-cc` — VPS local (192.168.0.15)
  - `/deploy-vps-akamai-cc` — VPS de Akamai (69.164.221.35)
  - `/deploy-vps-both-cc` — ambos
- [ ] Antes del despliegue, confirme que `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] La compilación debe ejecutarse donde `node_modules` sea real (el checkout principal o un worktree en el que se haya ejecutado `npm ci`; NO un worktree con enlaces simbólicos)
- [ ] Realice una prueba de humo de la instancia desplegada:
  - Abra `/dashboard/health` → compruebe que la cadena de versión coincide con la publicación
  - Ejecute una solicitud a `/v1/chat/completions` con un proveedor conocido
  - Verifique que `/api/monitoring/health` devuelve disyuntores `CLOSED`
  - Confirme que los transportes MCP responden (`/mcp` HTTP, `/mcp-sse` SSE)

### Después de la publicación

- [ ] Ejecute `/capture-release-evidences-cc` (habilidad de Claude Code)
  - Captura imágenes/grabaciones WebP de las nuevas funcionalidades
  - Las adjunta a las notas de la publicación o a la entrada del blog
- [ ] Actualice GitHub Discussions / Discord con el anuncio de la publicación
- [ ] Abra un hito para la siguiente versión
- [ ] Si es crítico: fije la discusión o publíquela en `news.json` para mostrar un banner dentro de la aplicación

### Puerta de lanzamiento público de Radar

El anuncio de Radar se confirma intencionadamente con `active: false`. La activación es un cambio independiente
que debe realizarse después de aportar pruebas de cada uno de los siguientes elementos:

- [ ] Todos los PR apilados de Radar están fusionados y el CI de la punta de publicación está en verde
- [ ] Despliegue y realice pruebas de humo de las rutas OSS de Radar con `RADAR_ENABLED` todavía desactivado de forma predeterminada
- [ ] Realice pruebas de humo de `GET /planos`, `/termos`, `/privacidade` y `/reembolso` en el host designado de Radar
- [ ] Registre la identidad, el contacto y la dirección del operador, así como la revisión legal aprobada por el propietario, en el servicio privado
- [ ] Pruebe Stripe Checkout y el webhook firmado únicamente en modo de prueba
- [ ] Pruebe una entrega de correo electrónico transaccional cifrado con el remitente/dominio aprobado
- [ ] Demuestre la restauración de una copia de seguridad y una ejecución de investigación supervisada y limitada por presupuesto
- [ ] Apruebe la política de revisión de BRL/PIX antes de aceptar comprobantes de donaciones
- [ ] Habilite Checkout público solo después de superar las puertas anteriores y, a continuación, active el nuevo ID de `news.json`
- [ ] Verifique que el banner de inicio utiliza texto localizado y que un ID nuevo vuelve a aparecer después de descartar uno anterior

## Prueba de humo de servicios integrados (v3.8.4+)

Antes de publicar cualquier versión que incluya cambios en los servicios integrados, verifica:

### Arranque con una base de datos nueva (detecta colisiones de migraciones — añadido después de la revisión urgente de v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — espera 10 s para que arranque
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` devuelve `"9router"` (NO 404, NO 500). Confirma que se aplicó la migración `071_services.sql` y se insertó la fila inicial.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` devuelve 3 filas.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` devuelve 2 filas (valida que se aplicó `070_webhooks_kind_metadata.sql`).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` se ejecuta correctamente — protege contra futuras colisiones.

### 9Router

- [ ] `POST /api/services/9router/install` devuelve 200 con `installedVersion` en menos de 2 min
- [ ] `POST /api/services/9router/start` devuelve 200 y `state: "running"` en menos de 30 s
- [ ] `GET /api/services/9router/status` informa de `health: "healthy"`
- [ ] `POST /v1/chat/completions` con `"model": "9router/auto/..."` devuelve 200 (enrutamiento integral a través de 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` renderiza la interfaz nativa de 9Router dentro del proxy (sin un iframe directo a `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` devuelve `{ keyRotated: true }` y el servicio se reinicia correctamente
- [ ] `POST /api/services/9router/stop` devuelve 200 y `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` devuelve un flujo SSE con un evento `snapshot` que contiene líneas recientes
- [ ] La instalación en un entorno sin `npm` en PATH devuelve 500 con un mensaje de error claro (sin traza de pila)

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` devuelve 200 en menos de 2 min
- [ ] `POST /api/services/cliproxy/start` devuelve 200 y `state: "running"` en menos de 30 s
- [ ] `GET /api/services/cliproxy/status` informa de `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` devuelve 200 y `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` devuelve un flujo SSE

### Regresión de seguridad

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` devuelve `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` devuelve `403 LOCAL_ONLY`
- [ ] Las respuestas de error de `/api/services/*` no contienen `err.stack` ni rutas de archivo absolutas

## Comprobaciones para v3.8.0+

Antes de publicar cualquier versión v3.8.x, verifica también estos elementos:

- [ ] `omniroute --tray` arranca en macOS (systray2 instalado en `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` arranca en Linux (requiere DISPLAY; muestra un error controlado si no está configurado)
- [ ] `omniroute --tray` arranca en Windows (PowerShell NotifyIcon, sin binarios adicionales)
- [ ] `omniroute config tray enable` crea una entrada de inicio automático; la desactivación la elimina
- [ ] `npm install -g omniroute@<this-version>` ejecuta postinstall sin una salida fatal
- [ ] La ruta de actualización conserva las dependencias opcionales: `omniroute update --apply` y el actualizador automático
      ejecutan `npm install -g … --include=optional` para que `optionalDependencies` (better-sqlite3,
      keytar, tls-client y la pila SLM de llmlingua: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) sobrevivan a una actualización. El nivel SLM ultra `modelPath` también necesita el
      modelo tinybert, que se descarga automáticamente en `${DATA_DIR}/models/llmlingua` al usarse por primera vez. Después, postinstall
      (`scripts/build/colocateOptionals.mjs`) coloca conjuntamente el cierre opcional de SLM en
      `dist/node_modules` para que el worker resuelva UNA SOLA instancia de `@huggingface/transformers` ^4.2.0
      — la traza independiente solo empaqueta transformers, no las dependencias opcionales importadas dinámicamente,
      por lo que, sin esto, el worker cargaría llmlingua-2 con transformers de la raíz
      y el nivel SLM pasaría silenciosamente al modo abierto ante fallos.
- [ ] `omniroute status` funciona sin `.env` (ruta del token de la CLI, solo loopback)
- [ ] `curl http://localhost:20128/api/shutdown` devuelve 401 (ruta siempre protegida)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` devuelve 401 (protección de loopback)
- [ ] El entorno de ejecución de SQLite se resuelve como `bundled` en la primera ejecución (binario incluido válido para la plataforma)
- [ ] El entorno de ejecución de SQLite recurre a `runtime` cuando se elimina `node_modules/better-sqlite3`
- [ ] El filtro MCP inteligente comprime la salida real de `playwright-mcp browser_snapshot` (reducción ≥50 %)
- [ ] Los 10 archivos `skills/omniroute*/SKILL.md` son accesibles públicamente mediante una URL raw de GitHub
- [ ] El asistente de incorporación muestra el paso del recorrido por los niveles "Cómo funciona" en una configuración nueva
- [ ] El widget de cobertura de niveles del panel de inicio muestra los recuentos configurados/activos

---

## Corte LTS 3.9.0 (ensayado en 3.8.58)

Después de v3.8.59, la siguiente versión es 3.9.0, y su punta se convierte en dos ramas de larga duración:
`stable/v3` (la línea LTS de v3, npm `latest`) y `develop` (v4, actualizada a 4.0.0, npm
`nightly`). El modelo de ramas/canales, el forward-port y las etiquetas están en
[RELEASE_STRATEGY.md](./RELEASE_STRATEGY.md); el plan está en el [ROADMAP](../../ROADMAP.md) (Fase 3). El corte se ejecuta una sola vez;
3.8.58 lo ensaya de principio a fin en un fork, y 3.8.59 finaliza con la
[lista de comprobación GO/NO-GO](./LTS_GO_NO_GO.md).

### Simulación (solo lectura, segura en cualquier momento)

```bash
npm run release:dry-run-lts-cut                       # el corte real: 3.9.0 desde HEAD, etiqueta anterior v3.8.59
npm run release:dry-run-lts-cut -- --from <3.9.0-tip> # fija el commit de origen
```

`scripts/release/dry-run-lts-cut.mjs` no ejecuta nada: lee git y `gh` e imprime la
secuencia completa: condiciones previas (el origen se resuelve, el repositorio de origen tiene el historial completo;
un clon superficial no puede enviar `stable/v3`, el lado receptor rechaza el paquete en el primer
padre injertado, por lo que primero debe realizarse el corte desde un clon completo o ejecutar `git fetch --unshallow origin`;
la etiqueta anterior existe, `package.json` tiene la versión de destino, hay una incidencia `release-freeze` abierta, no hay
ninguna incidencia `Release branch not green` abierta
en una rama de publicación existente; una rama que no existe informa `?` como desconocido, nunca
como correcto; la cola `release` de Mergify está configurada (G11: `queue_rules`, `checks_timeout`,
etiqueta `queue`), el conjunto de reglas `release/*` sigue bloqueando la eliminación y el envío forzado, y
`stable/v3` y `develop` aún no existen), los dos pasos de creación de ramas, qué activadores de flujos de trabajo
inactivos y qué condiciones `if:` pasan a ser verdaderas (y cuáles siguen bloqueadas por una variable del repositorio o
fijadas al repositorio canónico), las dist-tags esperadas (`latest` → 3.9.0, `next` y
`nightly` vacías) y la reversión. Código de salida `0` = `RESULT: READY`, `1` = una condición previa bloqueante
ha fallado (`✗`), `2` = error de uso. `--advisory <id,...>` rebaja una comprobación a advertencia (`!`)
sin ocultarla.

Ejecute la simulación del corte real mientras el bloqueo de publicación de 3.9.0 siga abierto; las ramas se
crean después de la etiqueta y antes de que la Fase 12c levante el bloqueo.

### Ensayo de 3.8.58 (solo en un fork)

```bash
# 1. Simulación en la punta actual con parámetros de ensayo
npm run release:dry-run-lts-cut -- --target-version 3.8.58 --previous-tag v3.8.57 \
  --advisory freeze,base-green

# 2. Ejecutar contra un remoto de un FORK (se rechaza origin, o cualquier remoto cuya URL
#    sea la del repositorio canónico; cada paso solicita confirmación en la terminal)
git remote add rehearsal https://github.com/<you>/OmniRoute.git
node scripts/release/dry-run-lts-cut.mjs --execute --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green

# 3. Probar los flujos de trabajo inactivos en el fork (workflow_dispatch cuando la simulación
#    informa de una fijación al repositorio canónico) y, después, revertir
node scripts/release/dry-run-lts-cut.mjs --execute --rollback --remote rehearsal \
  --target-version 3.8.58 --previous-tag v3.8.57 --advisory freeze,base-green
```

El commit de actualización de develop se construye mediante las operaciones internas de git (sin modificar el árbol de trabajo) y actualiza
los mismos cinco archivos que un commit de apertura de ciclo: `package.json`, `open-sse/package.json`,
`electron/package.json`, `package-lock.json` y `docs/openapi.yaml`. La sección `[4.0.0]` del
CHANGELOG y sus equivalentes i18n se abren posteriormente en `develop`, antes de su primer
PR. El script nunca cambia las dist-tags de npm; ensáyelas en un paquete de prueba.

### Artefacto de vista previa del PR (compilar una vez, promover exactamente los mismos bytes)

`.github/workflows/preview-artifact.yml` compila un único tarball de producción desde la cabecera de un PR y
valida exactamente esa compilación (parte (a) de #8084). Solo para PR del mismo repositorio; no se publica nada.

```bash
gh workflow run preview-artifact.yml -f pr_number=<N>   # o añada la etiqueta `preview-artifact`
gh run download <run-id> --name preview-artifact-pr<N>-<sha7> --dir preview
cd preview && sha256sum -c SHA256SUMS
gh attestation verify omniroute-*.tgz --repo diegosouzapw/OmniRoute
npm install -g ./omniroute-*.tgz                          # instalación de vista previa
```

La ejecución realiza `npm ci`, `npm run build:release`, `npm run check:pack-artifact`, empaqueta el
tarball, ejecuta `npm run check:pack-boot` (secretos falsos, directorio de datos efímero), vuelve a empaquetarlo y
falla a menos que el resumen sea idéntico; después, registra `artifact-identity.json` (SHA de la cabecera, SHA de la base,
hash del lockfile, plataforma, arquitectura, ABI de node, empaquetador, política de compilación;
`scripts/release/artifact-identity.mjs`) y certifica el tarball en un trabajo separado. Promover
una vista previa significa instalar ese tarball: nunca vuelva a compilar desde el código fuente.

### El corte (3.9.0, después de GO)

1. GO registrado en [LTS_GO_NO_GO.md](./LTS_GO_NO_GO.md).
2. `npm run release:dry-run-lts-cut -- --from v3.9.0` imprime `RESULT: READY`.
3. Cree manualmente las ramas en `origin` con los comandos que imprime la simulación; el
   script se niega a enviar a `origin`. Para reutilizar un commit de develop revisado, ejecute primero el
   ensayo con `--execute` en la punta de 3.9.0 contra su fork; este imprime ambos SHA, y
   pueden enviarse los mismos commits:

   ```bash
   git push origin <stable-sha>:refs/heads/stable/v3 <develop-sha>:refs/heads/develop
   ```

4. Protege `stable/v3` y `develop` (conjuntos de reglas + cola de fusión) antes de que llegue el primer PR.
5. Los flujos de trabajo inactivos se activan al existir las ramas: `forward-port.yml` (push a
   `stable/v3`), `validate-stable-pr.yml` (PRs dirigidos a `stable/v3`) y `nightly-v4-build.yml`
   (compila `develop`). Antes de la puesta en producción, configura el secreto del repositorio `secrets.FORWARD_PORT_TOKEN` (para que CI se ejecute en
   los PRs de forward-port); la publicación nocturna permanece desactivada hasta que el propietario establezca la variable del repositorio
   `vars.NIGHTLY_PUBLISH` en `true` y npm Trusted Publishing acepte
   `nightly-v4-build.yml`. La resolución de canales se realiza en `scripts/release/dist-tag.mjs`, el mismo
   solucionador que utiliza `npm-publish.yml`.
6. Verifica los canales: `npm view omniroute dist-tags --json` muestra `latest` = 3.9.0 y ningún
   `next` / `nightly` hasta que se publique v4.
7. Reversión, si es necesario: `git push origin --delete refs/heads/stable/v3 refs/heads/develop`
   y `npm dist-tag add omniroute@3.8.59 latest`.

---

## Reversión

Si una versión tiene un problema crítico:

1. `gh release edit vX.Y.Z --prerelease` (la marca como no más reciente)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (solo si los usuarios aún no la han adoptado)
3. O bien: corrección urgente en `release/vX.Y.0` → versión de parche `vX.Y.(Z+1)`
4. Comunicarlo inmediatamente en GitHub Discussions y Discord

## Reglas estrictas

- Nunca hacer commits directamente en `main`
- Nunca usar `git push --force` en `main` ni en ramas `release/*`
- Nunca omitir los hooks de Husky (`--no-verify`)
- Nunca hacer commits de secretos, credenciales ni archivos `.env`
- La cobertura debe mantenerse ≥60/60/60/60 (sentencias/líneas/funciones/ramas)
- Incluir o actualizar siempre las pruebas al cambiar código de producción en `src/`, `open-sse/`, `electron/` o `bin/`

## Comprobación automatizada de sincronización

Ejecutar localmente la protección de sincronización de la documentación antes de abrir una PR:

```bash
npm run check:docs-sync
```

CI también ejecuta esta comprobación en `.github/workflows/ci.yml` (tarea de lint).
