# Release Checklist (Español)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/RELEASE_CHECKLIST.md) · 🇪🇹 [am](../../../am/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇦 [ar](../../../ar/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇿 [az](../../../az/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇬 [bg](../../../bg/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇩 [bn](../../../bn/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇦 [bs](../../../bs/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇿 [cs](../../../cs/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇰 [da](../../../da/docs/ops/RELEASE_CHECKLIST.md) · 🇩🇪 [de](../../../de/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇷 [el](../../../el/docs/ops/RELEASE_CHECKLIST.md) · 🇪🇪 [et](../../../et/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇷 [fa](../../../fa/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇮 [fi](../../../fi/docs/ops/RELEASE_CHECKLIST.md) · 🇫🇷 [fr](../../../fr/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇪 [ga](../../../ga/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [gu](../../../gu/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ha](../../../ha/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇱 [he](../../../he/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [hi](../../../hi/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇷 [hr](../../../hr/docs/ops/RELEASE_CHECKLIST.md) · 🇭🇺 [hu](../../../hu/docs/ops/RELEASE_CHECKLIST.md) · 🇦🇲 [hy](../../../hy/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇩 [id](../../../id/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [ig](../../../ig/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇹 [it](../../../it/docs/ops/RELEASE_CHECKLIST.md) · 🇯🇵 [ja](../../../ja/docs/ops/RELEASE_CHECKLIST.md) · 🇬🇪 [ka](../../../ka/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇭 [km](../../../km/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [kn](../../../kn/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇷 [ko](../../../ko/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇹 [lt](../../../lt/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇻 [lv](../../../lv/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ml](../../../ml/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [mr](../../../mr/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇾 [ms](../../../ms/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇹 [mt](../../../mt/docs/ops/RELEASE_CHECKLIST.md) · 🇲🇲 [my](../../../my/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇵 [ne](../../../ne/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇱 [nl](../../../nl/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇴 [no](../../../no/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [or](../../../or/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [pa](../../../pa/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇭 [phi](../../../phi/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇱 [pl](../../../pl/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇹 [pt](../../../pt/docs/ops/RELEASE_CHECKLIST.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇴 [ro](../../../ro/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇺 [ru](../../../ru/docs/ops/RELEASE_CHECKLIST.md) · 🇱🇰 [si](../../../si/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇰 [sk](../../../sk/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇮 [sl](../../../sl/docs/ops/RELEASE_CHECKLIST.md) · 🇷🇸 [sr](../../../sr/docs/ops/RELEASE_CHECKLIST.md) · 🇸🇪 [sv](../../../sv/docs/ops/RELEASE_CHECKLIST.md) · 🇰🇪 [sw](../../../sw/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [ta](../../../ta/docs/ops/RELEASE_CHECKLIST.md) · 🇮🇳 [te](../../../te/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇭 [th](../../../th/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇷 [tr](../../../tr/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/RELEASE_CHECKLIST.md) · 🇵🇰 [ur](../../../ur/docs/ops/RELEASE_CHECKLIST.md) · 🇺🇿 [uz](../../../uz/docs/ops/RELEASE_CHECKLIST.md) · 🇻🇳 [vi](../../../vi/docs/ops/RELEASE_CHECKLIST.md) · 🇳🇬 [yo](../../../yo/docs/ops/RELEASE_CHECKLIST.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/RELEASE_CHECKLIST.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/RELEASE_CHECKLIST.md)

---

> **Última actualización:** 2026-08-28 — v3.8.51
> Flujo de lanzamiento simplificado que aprovecha las habilidades de Claude Code para la automatización.
>
> **Mantén la cola/rama en verde entre lanzamientos:** consulta [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (familia `/green-prs` + `npm run check:release-green` + `/babysit` + ejecución nocturna). Ejecutar
> esto periódicamente —y especialmente **antes** de esta lista de verificación— hace que el PR de lanzamiento comience en verde.

## TL;DR

```bash
# 1. Incrementar la versión + generar CHANGELOG (habilidad)
/version-bump-cc patch    # o minor/major

# 2. Ejecutar el control de calidad localmente
npm run check              # lint + pruebas
npm run test:coverage      # control de cobertura completa (60/60/60/60)

# 3. Compilar y realizar pruebas de humo
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
trabajo `stage-npm` (alojado en GitHub) intercambia el id-token de GitHub por una credencial
de npm de corta duración para esa ejecución, sin ningún token de npm de larga duración en los secretos
del repositorio, sin solicitud de 2FA y con la procedencia adjunta.
Esta es la alternativa que npm admite ahora que se están retirando los tokens que omiten 2FA;
restaura el flujo completamente automático que tenía el proyecto hasta v3.8.48, a la vez que mantiene la
garantía WS1.3 (un token filtrado no puede publicar por sí solo, porque no existe ningún token).

**Configuración única (propietario):** npmjs.com → paquete `omniroute` → Settings → _Trusted
Publisher_ → GitHub: propietario `diegosouzapw`, repositorio `OmniRoute`, flujo de trabajo `npm-publish.yml`
(entorno: ninguno). Hasta que esto exista, el paso automático falla con `ENEEDAUTH`:
vuelve a ejecutarlo con `publish_mode=staged` (a continuación) o `direct`.

### Publicación por etapas (bajo petición — `publish_mode=staged`)

El flujo de trabajo npm-publish ya no publica directamente: inicia el tarball empaquetado
(`check:pack-boot`) y después ejecuta `npm stage publish`; los bytes exactos quedan almacenados en
el registro, **sin posibilidad de instalación** hasta que el propietario los apruebe. El control humano de 2FA se trasladó
a DESPUÉS de la verificación, no antes.

**Flujo del propietario después de que el flujo de trabajo quede en verde:**

1. `npm stage list omniroute` — busca el id de la etapa (también aparece en el resumen del flujo de trabajo).
2. Verifica los bytes almacenados en la etapa (recomendado): `npm stage download <id>` y después instala el
   tarball descargado en un prefijo temporal e inícialo (`npm run check:pack-boot` automatiza
   el mismo veredicto de empaquetar→instalar→iniciar en CI).
3. `npm stage approve <id>` — la solicitud de 2FA ES la publicación. `npm stage reject <id>` descarta la etapa.
4. Red de seguridad posterior a la publicación: el verificador posterior a la publicación (WS1.4 del plan de v3.8.49) instala la
   versión publicada desde el registro público en un contenedor limpio y la inicia.

**Alternativa de emergencia:** `workflow_dispatch` con `publish_mode=direct` restaura la
ejecución inmediata tradicional de `npm publish` (úsala solo si la publicación por etapas presenta problemas; documenta el motivo).

**Refuerzo único (propietario, npmjs.com):** configura Trusted Publisher para
`omniroute` en modo exclusivo por etapas, de modo que un token de larga duración filtrado no pueda ejecutar `npm publish`
directamente desde ningún lugar: CI solo puede preparar la etapa; únicamente el 2FA del propietario autoriza el lanzamiento.

**Procedimiento para artefactos defectuosos (sin cambios):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
como respuesta predeterminada (tarda minutos y es reversible); usa `npm unpublish` únicamente dentro del plazo de 72 horas/sin dependientes
y nunca como primera medida. Docker: nunca sobrescribas una etiqueta de versión; revertir consiste en
redirigir `latest` al último digest correcto.

**`latest` de Docker Hub (obligatorio en cada publicación SemVer estable):** el
flujo de trabajo `docker-publish` debe etiquetar **tanto** `X.Y.Z` como, cuando
`should-promote-latest.sh` confirme que se trata de la SemVer estable más alta, `:latest`
con el **mismo digest**. Después del trabajo: el digest de `latest` en Hub debe ser igual al nuevo
digest de SemVer y `last_updated` debe haberse actualizado. No dejes `:latest` apuntando a una
compilación anterior mientras las notas de la versión hablan de correcciones que solo existen en git. Los inicios rápidos de
Compose usan `:latest`; GitOps debe seguir fijando `X.Y.Z`. Consulta
[Canales de lanzamiento de Docker](../guides/DOCKER_GUIDE.md#release-channels) y #10317.

## Vía rápida para hotfix (etiqueta `hotfix`)

Un PR con la etiqueta `hotfix` omite la matriz pesada de CI (E2E de 9 fragmentos, ajuste progresivo de cobertura,
quality-gate, quality-extended) y conserva las verificaciones rápidas y de alta señal: compilación,
fragmentos de pruebas unitarias, integración, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
y la prueba básica de arranque del tarball (`check:pack-boot`). Objetivo: finalizar correctamente en ≤15 min en lugar de ~33 min.

**Política de acceso — se requieren las cuatro condiciones (basada en las vías de emergencia de Chromium/VS Code/Node):**

1. **Gravedad**: producción está rota — un artefacto publicado falla al arrancar / una
   corrección de seguridad / todos los usuarios de la versión están afectados. «Importante» no significa «roto».
2. **Autoridad**: solo el propietario del repositorio aplica la etiqueta `hotfix`. La etiqueta ES
   la aprobación; nunca debe aplicarse por cuenta propia en un PR de campaña.
3. **Evidencia**: el cuerpo del PR enlaza la ejecución pesada anterior que finalizó completamente en verde (la suite que
   volverían a validar los trabajos omitidos), además de la prueba propia de la corrección, primero fallando y luego pasando.
4. **Alcance**: solo cherry-pick — la corrección mínima, sin refactorizaciones ni cambios adicionales.

La superficie omitida de cobertura/ajuste progresivo vuelve a validarse en la siguiente ejecución completa sobre la
rama de publicación (publicación continuamente en verde): la vía omite la ESPERA, nunca la validación.
Los diffs que solo contienen pruebas (todos los archivos bajo `tests/`, ninguno bajo `tests/e2e/`) omiten la matriz
E2E automáticamente, sin ninguna etiqueta.

## Lista de comprobación detallada

### Antes de la publicación

- [ ] Todos los PR destinados a esta versión están fusionados en `release/vX.Y.0`
- [ ] Todos los elementos abiertos de Linear/incidencias para esta versión están cerrados o trasladados al siguiente hito
- [ ] CI en verde en la rama `release/vX.Y.0`
- [ ] No hay marcadores `TODO(release)` en el código: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Imagen base de Docker actualizada (actualmente `node:24.15.0-trixie-slim`)

### Versión y registro de cambios

- [ ] Ejecutar `/version-bump-cc <patch|minor|major>` (habilidad de Claude Code)
  - Incrementa la versión en `package.json`, `electron/package.json`
  - Regenera `CHANGELOG.md` a partir de los commits de git desde la última etiqueta
  - Actualiza las insignias de README.md
- [ ] Revisar manualmente CHANGELOG.md y depurar los mensajes de commit si es necesario
- [ ] Comprobar que la sección semver más reciente de `CHANGELOG.md` coincida con la versión de `package.json`
- [ ] Mantener `## [Unreleased]` como la primera sección del registro de cambios para el trabajo futuro
- [ ] Actualizar `docs/openapi.yaml` → `info.version` debe coincidir con la versión de `package.json`

### Calidad del código

- [ ] `npm run lint` — 0 errores (las advertencias ya existían)
- [ ] `npm run typecheck:core` — sin problemas
- [ ] `npm run typecheck:noimplicit:core` — sin problemas (estricto)
- [ ] `npm run check:cycles` — sin dependencias circulares
- [ ] `npm run check:any-budget:t11` — dentro del límite
- [ ] `npm run check:route-validation:t06` — sin problemas
- [ ] `npm run check:node-runtime` — se cumple la versión mínima compatible del entorno de ejecución (`>=22.22.2 <23`, `>=24.0.0 <27`, según `SUPPORTED_NODE_RANGE` en `src/shared/utils/nodeRuntimeSupport.ts`; alineado con `engines` de `package.json`)

### Pruebas

- [ ] `npm run test:unit` — pasa
- [ ] `npm run test:vitest` — pasa (servidor MCP, autoCombo, caché)
- [ ] `npm run test:coverage` — se cumple el umbral 60/60/60/60 (sentencias/líneas/funciones/ramas)
- [ ] `npm run test:integration` — pasa (si los cambios afectan a la base de datos o a los manejadores)
- [ ] `npm run test:combo:matrix` — pasa (matriz de estrategias combinadas: demuestra de forma determinista las decisiones de selección de las 19 estrategias públicas de enrutamiento; ejecutar al modificar el enrutamiento combinado, la resolución de estrategias o la lógica de respaldo)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **opcional/manual** (prueba básica restringida contra servicios ascendentes reales; obtiene una instantánea de solo lectura de la base de datos del VPS `root@192.168.0.15`; contacta proveedores reales y consume créditos; nunca se ejecuta en CI; se omite de forma limpia sin la habilitación)
- [ ] `npm run test:combo:live:vps` — **opcional/manual** (prueba básica en vivo de la fase 3 en el VPS: 7 escenarios HTTP contra el servidor `.15` activo mediante Node ESM sin componentes adicionales; requiere `ssh root@192.168.0.15`; crea/elimina únicamente combinaciones `__live_test__*`; contacta proveedores reales; nunca se ejecuta en CI)
- [ ] `npm run test:e2e` — pasa (cambios en la IU)
- [ ] `npm run test:protocols:e2e` — pasa (cambios en MCP/A2A)
- [ ] `npm run test:ecosystem` — pasa

### Hooks (validados por Husky)

Los hooks de Husky se encuentran en `.husky/` y se ejecutan automáticamente durante las operaciones de git.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** verificaciones deterministas rápidas — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (activadas el 2026-06-13). Excluye intencionadamente `test:unit` (lento; cubierto por el trabajo `test-unit` de CI).
  - Ejecutar `npm run test:unit` manualmente antes de enviar ramas de publicación.

Si un hook falla: corregir el problema subyacente; no omitirlo con `--no-verify`.

### Commits convencionales

Todos los commits destinados a una publicación deben seguir el formato `type(scope): subject`.

**Tipos válidos:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Ámbitos válidos:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Cambios incompatibles: añadir el pie `BREAKING CHANGE:` o `!` después del ámbito (p. ej., `feat(api)!: drop /v0`).

### Documentación

- [ ] `npm run check:docs-sync` se ejecuta correctamente (se ejecuta automáticamente mediante pre-commit)
- [ ] `npm run check:docs-all` se ejecuta correctamente (general: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` finaliza con 0 — el contrato de variables de entorno entre el código ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` está intacto
- [ ] `npm run check:doc-links` finaliza con 0 — no hay referencias markdown internas rotas tras la reestructuración
- [ ] `docs/architecture/ARCHITECTURE.md` revisado para detectar divergencias de almacenamiento/tiempo de ejecución
- [ ] `docs/guides/TROUBLESHOOTING.md` revisado para detectar divergencias en las variables de entorno y el funcionamiento
- [ ] Si `.env.example` cambió: `docs/reference/ENVIRONMENT.md` actualizado
- [ ] Si la nueva funcionalidad tiene una interfaz de usuario: `docs/guides/USER_GUIDE.md` la menciona
- [ ] Si la nueva funcionalidad tiene una API: `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml` actualizados
- [ ] Si la nueva funcionalidad es un módulo: existe un archivo específico `docs/<MODULE>.md`
- [ ] Si hay un cambio incompatible: `docs/guides/TROUBLESHOOTING.md` incluye una nota de migración

### i18n

- [ ] `npm run i18n:check` finaliza con 0 — el estado de las traducciones (`.i18n-state.json`) está sincronizado con la documentación de origen (no hay fuentes divergentes en modo estricto; el aviso del modo de advertencia es aceptable para retoques de última hora en la documentación, pero debe ser 0 antes de crear la etiqueta)
- [ ] `npm run i18n:check-ui-coverage` finaliza con 0 — cada configuración regional de la interfaz de usuario alcanza o supera el umbral mínimo de cobertura del 80 %
- [ ] `npm run i18n:sync-ui:dry` informa de 0 claves ausentes en las 42 configuraciones regionales
- [ ] Si cambió la documentación de origen en inglés, ejecutar `npm run i18n:run` (requiere `OMNIROUTE_TRANSLATION_API_KEY` en `.env`) antes de crear la etiqueta
- [ ] Las contribuciones de traducción pueden posponerse hasta la próxima versión si son menores (registrarlas en CHANGELOG)

### Migraciones de la base de datos

- [ ] Si `src/lib/db/migrations/` contiene archivos nuevos:
  - [ ] Cada migración es idempotente (`CREATE TABLE IF NOT EXISTS`, etc.)
  - [ ] Las migraciones están envueltas en transacciones
  - [ ] Están numeradas correctamente (sin huecos en la secuencia)
- [ ] Probar en una instalación nueva: eliminar `~/.omniroute/omniroute.db` y ejecutar `npm run dev`
- [ ] Probar en una instalación existente: hacer una copia de seguridad de la base de datos, ejecutar la migración y verificar el esquema
- [ ] Los archivos WAL (`-wal`, `-shm`) se gestionan correctamente si la migración reescribe tablas

### Catálogo de proveedores (validado con Zod)

- [ ] El esquema Zod de `src/shared/constants/providers.ts` es válido durante la carga
  - [ ] Todos los proveedores tienen los campos obligatorios (`id`, `label`, `kind`, etc.)
  - [ ] Se proporciona `freeNote` para los nuevos proveedores gratuitos
  - [ ] Los proveedores OAuth tienen `oauthConfig` registrado en `src/lib/oauth/constants/oauth.ts`
- [ ] Si se añade un proveedor nuevo: existe el ejecutor correspondiente en `open-sse/executors/`
- [ ] Si el formato no es de OpenAI: existe un traductor en `open-sse/translator/`
- [ ] Los modelos están registrados en `open-sse/config/providerRegistry.ts`
- [ ] Las pruebas unitarias de `tests/unit/` cubren la clasificación y el enrutamiento de proveedores

### Escritorio (Electron)

Si `electron/` cambió:

- [ ] `npm run electron:smoke:packaged` se ejecuta correctamente
- [ ] Se probaron las compilaciones para al menos uno de `:win`, `:mac`, `:linux`
- [ ] Los certificados de firma de código no han caducado (si se utiliza firma)
- [ ] La versión de `electron/package.json` coincide con la de `package.json` en la raíz
- [ ] El puntero del canal de actualización automática está actualizado si se publica en `stable`

### Estructura de compilación

El repositorio utiliza tres directorios de salida distintos — no deben confundirse:

| Directorio | Propósito                                                                | ¿Con seguimiento?     |
| ---------- | ------------------------------------------------------------------------ | --------------------- |
| `src/`     | Código fuente de la aplicación (TypeScript / TSX)                        | Sí                    |
| `.build/`  | Archivos intermedios de compilación — salida de `next build` (`distDir`) | No (ignorado por git) |
| `dist/`    | Paquete npm distribuible — ensamblado por `assembleStandalone`           | No (ignorado por git) |

> **Nota para el operador:** el directorio de la imagen del VPS remoto continúa siendo `/usr/lib/node_modules/omniroute/app/`.
> Solo cambió la salida de compilación **dentro del repositorio** (`app/` → `dist/`). Las herramientas de despliegue sincronizan
> mediante rsync el contenido de `dist/` con el directorio remoto `app/` — no es necesario cambiar las rutas del VPS.

**Flujo de compilación única:**

```
npm run build:release
  └─ rm -rf .build dist          (limpieza)
  └─ next build → .build/next/   (archivos intermedios)
  └─ assembleStandalone          (copia los archivos independientes + estáticos + públicos + nativos → dist/)
  └─ escribe dist/BUILD_SHA      (centinela de HEAD)
```

NO ejecutar `npm run build` seguido de un `npm run build:cli` independiente para desplegar — utilizar
`npm run build:release`, que realiza una recompilación limpia + crea el centinela en un solo comando.

### Validación de artefactos

- [ ] `npm run build:release` finaliza correctamente y `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` no detecta problemas — no hay `app.__qa_backup`, `scripts/scratch`, `package-lock.json` ni otros residuos locales
- [ ] `dist/server.js` existe después de la compilación

### Etiquetado y publicación

- [ ] Ejecutar `/generate-release-cc` (herramienta de Claude Code):
  - Crea la etiqueta `vX.Y.Z`
  - Envía la etiqueta y la rama
  - Abre una versión en GitHub con el registro de cambios en el cuerpo
  - Adjunta los instaladores de Electron (si se compilaron)
- [ ] O manualmente:
  ```bash
  git tag -a vX.Y.Z -m "Publicación vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Despliegue

Las herramientas de despliegue utilizan el flujo ligero de rsync — sin `npm pack` ni `npm i -g`:

- [ ] Utilizar la herramienta de despliegue que corresponda al destino:
  - `/deploy-vps-local-cc` — VPS local (192.168.0.15)
  - `/deploy-vps-akamai-cc` — VPS de Akamai (69.164.221.35)
  - `/deploy-vps-both-cc` — ambos
- [ ] Antes del despliegue, confirmar que `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] La compilación debe ejecutarse donde `node_modules` sea real (el checkout principal o un worktree en el que se haya ejecutado `npm ci` — NO un worktree con enlaces simbólicos)
- [ ] Realizar una prueba de humo de la instancia desplegada:
  - Abrir `/dashboard/health` → comprobar que la cadena de versión coincide con la publicación
  - Ejecutar una solicitud a `/v1/chat/completions` contra un proveedor conocido
  - Verificar que `/api/monitoring/health` devuelve disyuntores `CLOSED`
  - Confirmar que los transportes MCP responden (`/mcp` HTTP, `/mcp-sse` SSE)

### Después de la publicación

- [ ] Ejecutar `/capture-release-evidences-cc` (skill de Claude Code)
  - Captura imágenes/grabaciones WebP de las nuevas funcionalidades
  - Las adjunta a las notas de la versión / publicación del blog
- [ ] Actualizar GitHub Discussions / Discord con el anuncio de la versión
- [ ] Abrir un hito para la próxima versión
- [ ] Si es crítico: fijar la discusión o publicar en `news.json` para mostrar un banner dentro de la aplicación

### Criterios para el lanzamiento público de Radar

El anuncio de Radar se incluye intencionadamente con `active: false`. La activación es un cambio independiente
que se realizará una vez que haya evidencias de cada uno de los siguientes puntos:

- [ ] Todas las PR apiladas de Radar están fusionadas y la CI del release tip está en verde
- [ ] Desplegar y realizar pruebas rápidas de las rutas OSS de Radar con `RADAR_ENABLED` desactivado de forma predeterminada
- [ ] Realizar pruebas rápidas de `GET /planos`, `/termos`, `/privacidade` y `/reembolso` en el host de Radar especificado
- [ ] Registrar la identidad, el contacto y la dirección del operador, así como la revisión legal aprobada por el propietario, en el servicio privado
- [ ] Probar Stripe Checkout y el webhook firmado únicamente en modo de prueba
- [ ] Probar la entrega de un correo electrónico transaccional cifrado con el remitente/dominio aprobado
- [ ] Demostrar la restauración de una copia de seguridad y una ejecución de investigación supervisada y con presupuesto limitado
- [ ] Aprobar la política de revisión de BRL/PIX antes de aceptar evidencias de donaciones
- [ ] Habilitar Checkout público solo después de superar los criterios anteriores y, a continuación, activar el nuevo ID de `news.json`
- [ ] Verificar que el banner de Inicio utilice texto localizado y que un ID nuevo vuelva a aparecer después de descartar un ID anterior

## Pruebas rápidas de servicios integrados (v3.8.4+)

Antes de publicar cualquier versión que incluya cambios en los servicios integrados, verifique lo siguiente:

### Arranque con una BD nueva (detecta colisiones de migraciones — añadido tras la corrección urgente de v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — espere 10 s para que arranque
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` devuelve `"9router"` (NO 404, NO 500). Confirma que se aplicó la migración `071_services.sql` y que se insertó la fila inicial.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` devuelve 3 filas.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` devuelve 2 filas (valida que se aplicó `070_webhooks_kind_metadata.sql`).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` se ejecuta correctamente — protege frente a futuras colisiones.

### 9Router

- [ ] `POST /api/services/9router/install` devuelve 200 con `installedVersion` en menos de 2 min
- [ ] `POST /api/services/9router/start` devuelve 200 y `state: "running"` en menos de 30 s
- [ ] `GET /api/services/9router/status` informa de `health: "healthy"`
- [ ] `POST /v1/chat/completions` con `"model": "9router/auto/..."` devuelve 200 (enrutamiento de extremo a extremo mediante 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` muestra la interfaz nativa de 9Router dentro del proxy (sin un iframe directo a `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` devuelve `{ keyRotated: true }` y el servicio se reinicia correctamente
- [ ] `POST /api/services/9router/stop` devuelve 200 y `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` devuelve un flujo SSE con un evento `snapshot` que contiene líneas recientes
- [ ] La instalación en un entorno sin `npm` en PATH devuelve 500 con un mensaje de error claro (sin trazas de pila)

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

Antes de publicar cualquier versión v3.8.x, verifique también los siguientes elementos:

- [ ] `omniroute --tray` arranca en macOS (systray2 instalado en `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` arranca en Linux (requiere DISPLAY; muestra un error controlado si no está definido)
- [ ] `omniroute --tray` arranca en Windows (PowerShell NotifyIcon, sin binarios adicionales)
- [ ] `omniroute config tray enable` crea una entrada de inicio automático; la desactivación la elimina
- [ ] `npm install -g omniroute@<this-version>` ejecuta postinstall sin una salida por error fatal
- [ ] La ruta de actualización conserva las dependencias opcionales: `omniroute update --apply` y el actualizador automático
      ejecutan `npm install -g … --include=optional` para que `optionalDependencies` (better-sqlite3,
      keytar, tls-client y la pila SLM de llmlingua: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) sobrevivan a una actualización. El nivel SLM ultra `modelPath` también necesita el
      modelo tinybert, que se descarga automáticamente en `${DATA_DIR}/models/llmlingua` la primera vez que se usa. Después, postinstall
      (`scripts/build/colocateOptionals.mjs`) coloca conjuntamente el cierre opcional de SLM en
      `dist/node_modules` para que el worker resuelva UNA SOLA instancia de `@huggingface/transformers` ^4.2.0
      — la traza independiente solo incluye transformers, no los elementos opcionales importados dinámicamente,
      por lo que, sin esto, el worker cargaría llmlingua-2 con transformers de la raíz
      y el nivel SLM pasaría silenciosamente al modo abierto.
- [ ] `omniroute status` funciona sin `.env` (ruta de token de la CLI, solo loopback)
- [ ] `curl http://localhost:20128/api/shutdown` devuelve 401 (ruta siempre protegida)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` devuelve 401 (protección de loopback)
- [ ] El runtime de SQLite se resuelve como `bundled` en la primera ejecución (binario incluido válido para la plataforma)
- [ ] El runtime de SQLite recurre a `runtime` cuando se elimina `node_modules/better-sqlite3`
- [ ] El filtro MCP inteligente comprime la salida real de `playwright-mcp browser_snapshot` (reducción ≥50 %)
- [ ] Los 10 archivos `skills/omniroute*/SKILL.md` son accesibles públicamente mediante una URL raw de GitHub
- [ ] El asistente de incorporación muestra el paso del recorrido por niveles "Cómo funciona" en una configuración nueva
- [ ] El widget de cobertura de niveles del panel principal muestra los recuentos configurados/activos

---

## Reversión

Si la versión publicada tiene un problema crítico:

1. `gh release edit vX.Y.Z --prerelease` (la marca como no más reciente)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (solo si los usuarios aún no la han adoptado)
3. O bien: corrección urgente en `release/vX.Y.0` → versión de parche `vX.Y.(Z+1)`
4. Comunícalo inmediatamente en GitHub Discussions y Discord

## Reglas estrictas

- Nunca hagas commits directamente en `main`
- Nunca uses `git push --force` en `main` ni en las ramas `release/*`
- Nunca omitas los hooks de Husky (`--no-verify`)
- Nunca incluyas secretos, credenciales ni archivos `.env` en un commit
- La cobertura debe mantenerse en ≥60/60/60/60 (sentencias/líneas/funciones/ramas)
- Incluye o actualiza siempre las pruebas al modificar código de producción en `src/`, `open-sse/`, `electron/` o `bin/`

## Comprobación automatizada de sincronización

Ejecuta localmente la comprobación de sincronización de la documentación antes de abrir una PR:

```bash
npm run check:docs-sync
```

El CI también ejecuta esta comprobación en `.github/workflows/ci.yml` (tarea de lint).
